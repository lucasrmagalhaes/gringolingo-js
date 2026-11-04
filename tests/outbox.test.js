import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  OUTBOXES, avaliarOutbox, INBOXES, avaliarInbox, RELAYS, avaliarRelay
} = await import('../js/outbox.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaVirada, textoDoTurno, textoDoMosaico, textoDaMediana } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarOutbox, registrarInbox, registrarRelay
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'outbox.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The rented lock lasts only for a short time.',
  'The lock gains time before it drops.',
  'The lock lets go when the time ends.',
  'Please keep'
];

beforeEach(() => {
  definirAgora(dia);
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

function semTravessao(caminho) {
  const arquivo = readFileSync(new URL(caminho, import.meta.url), 'utf8');
  assert.equal(arquivo.includes('\u2014'), false, caminho);
  assert.equal(arquivo.includes('\u2013'), false, caminho);
  return arquivo;
}

function conferir(lista, etapas, avaliar) {
  assert.equal(lista.length, 3);
  assert.equal(new Set(lista.map(c => c.id)).size, 3);
  for (const cena of lista) {
    assert.equal(ocupados.has(cena.id), false, cena.id);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), etapas);
    for (const rodada of cena.rodadas) {
      assert.ok(rodada.aceitas.length >= 2, cena.id);
      assert.equal(avaliar(rodada, rodada.melhor).ok, true, rodada.melhor);
      assert.equal(avaliar(rodada, 'hello').ok, false);
    }
  }
}

function fim() {
  return { xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] };
}

function travarMissao(id) {
  estado.missoes = { dia: '2026-10-28', progresso: [{ id, valor: 0, pago: false }] };
}

describe('outbox, inbox e relay', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/outbox.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(OUTBOXES, ['Entra', 'Segue'], avaliarOutbox);
    conferir(INBOXES, ['Recebe', 'Segue'], avaliarInbox);
    conferir(RELAYS, ['Repassa', 'Segue'], avaliarRelay);
    const ids = [...OUTBOXES, ...INBOXES, ...RELAYS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const outbox = OUTBOXES.find(c => c.id === 'outbox2').rodadas[0];
    assert.equal(avaliarOutbox(outbox, 'The outbox covered 2 messages.').ok, true);
    const inbox = INBOXES.find(c => c.id === 'inbox3').rodadas[0];
    assert.equal(avaliarInbox(inbox, 'The inbox covered 3 messages.').ok, true);
    const relay = RELAYS.find(c => c.id === 'relay4').rodadas[0];
    assert.equal(avaliarRelay(relay, 'The relay forwarded 4 messages.').ok, true);
    const texto = JSON.stringify({ OUTBOXES, INBOXES, RELAYS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Outbox' && f.melhor === 'The message waits outside before it leaves.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Inbox' && f.melhor === 'The message arrives and waits for its turn.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Relay' && f.melhor === 'The post passes the message forward.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['outbox', 'inbox', 'relay']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A virada'), false);
  });

  test('outbox, inbox e relay contam no próprio contador', () => {
    travarMissao('outbox1');
    const outbox = registrarOutbox(fim());
    assert.equal(outbox.bonusMissoes, 15);
    assert.equal(estado.stats.outboxes, 1);
    assert.equal(estado.stats.inboxes, 0);
    assert.equal(estado.stats.relays, 0);
    assert.equal(estado.stats.leases, 0);
    assert.equal(estado.stats.vencimentos, 0);
    assert.ok(estado.badges.includes('outbox'));
    for (const id of ['inbox', 'relay', 'lease', 'vencimento']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('inbox1');
    const inbox = registrarInbox(fim());
    assert.equal(inbox.bonusMissoes, 15);
    assert.equal(estado.stats.inboxes, 1);
    assert.equal(estado.stats.outboxes, 1);
    assert.ok(estado.badges.includes('inbox'));

    travarMissao('relay1');
    const relay = registrarRelay(fim());
    assert.equal(relay.bonusMissoes, 15);
    assert.equal(estado.stats.relays, 1);
    assert.equal(estado.stats.leases, 0);
    assert.ok(estado.badges.includes('relay'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 319);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a virada conta meses com fala, sem medir segundos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaVirada(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.meses, 0);
    assert.equal(invalido.texto, 'Ainda não há virada de meses.');
    const vazio = textoDaVirada({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.meses, 0);
    assert.equal(vazio.texto, 'A virada ainda cobre 0 meses.');
    const um = textoDaVirada({ '2026-11-04': { n: 1, segundos: 40 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.meses, 1);
    assert.equal(um.texto, 'A virada cobre 1 mês.');
    assert.equal(um.texto.includes('segundos'), false);
    const semente = {
      '2026-10-31': { n: 1, segundos: 40, grupos: { trabalho: 1 } },
      '2026-11-01': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-02': { n: 1, segundos: 90, grupos: { trabalho: 1, entrevista: 1 } },
      '2026-11-03': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-04': { n: 1, segundos: 600, grupos: { trabalho: 1 } }
    };
    const cheio = textoDaVirada(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.meses, 2);
    assert.equal(cheio.texto, 'A virada cobre 2 meses.');
    assert.equal(cheio.texto.includes('segundos'), false);
    assert.equal(textoDoTurno(semente, '2026-11-04').texto, 'O turno cobre 3 dias úteis e 2 de fim de semana.');
    assert.equal(textoDoMosaico(semente, '2026-11-04').texto, 'O mosaico cobre 2 de 5 grupos.');
    assert.equal(textoDaMediana(semente, '2026-11-04').texto, 'A mediana dos dias é de 60 segundos.');
    assert.equal(cheio.texto === textoDoTurno(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDoMosaico(semente, '2026-11-04').texto, false);
    const tres = textoDaVirada({
      '2026-09-30': { n: 1, segundos: 10 },
      '2026-10-01': { n: 1, segundos: 10 },
      '2026-11-01': { n: 1, segundos: 10 }
    }, '2026-11-04');
    assert.equal(tres.meses, 3);
    assert.equal(tres.texto, 'A virada cobre 3 meses.');
    const futuro = textoDaVirada({
      '2026-11-04': { n: 1, segundos: 10 },
      '2026-12-01': { n: 1, segundos: 10 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.meses, 1);
    assert.equal(futuro.texto, 'A virada cobre 1 mês.');
    const mudo = textoDaVirada({
      '2026-10-31': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(mudo.dias, 0);
    assert.equal(mudo.meses, 0);
    const mesmo = textoDaVirada({
      '2026-11-01': { n: 1, segundos: 5 },
      '2026-11-20': { n: 1, segundos: 5 }
    }, '2026-11-20');
    assert.equal(mesmo.dias, 2);
    assert.equal(mesmo.meses, 1);
    assert.equal(mesmo.texto, 'A virada cobre 1 mês.');
  });

  test('a versão 2.94 deixa o outbox fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.94'/);
    assert.match(data, /versao: '2\.93'/);
    assert.match(sw, /gringolingo-v121/);
    assert.match(sw, /\.\/js\/outbox\.js/);
    assert.match(turno, /outbox\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarOutbox', 'pintarInbox', 'pintarRelay']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaVencimentos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaOutboxes'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /outbox: telaOutboxes/);
    assert.match(mapa, /inbox: telaInboxes/);
    assert.match(mapa, /relay: telaRelays/);
    const virada = app.slice(app.indexOf('function cartaoVirada'), app.indexOf('function blocoFluencia'));
    assert.match(virada, /fala-virada/);
    assert.match(virada, /A virada/);
    assert.match(virada, /VER A SEMANA/);
    assert.equal(virada.includes('function cartaoTurno'), false);
    assert.equal(virada.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-virada {'), css.indexOf('.fala-virada {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const limpar = css.slice(css.indexOf('\n.busca-limpar {'), css.indexOf('\n.busca-limpar {') + 140);
    assert.match(limpar, /min-height: 44px/);
    assert.match(app, /Limpar a busca/);
    assert.equal((app.match(/function cartaoTurno\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoVirada\(/g) || []).length, 1);
    assert.equal((app.match(/A virada/g) || []).length, 1);
  });
});
