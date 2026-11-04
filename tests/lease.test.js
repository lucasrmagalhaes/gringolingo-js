import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  LEASES, avaliarLease, RENOVACOES, avaliarRenovacao, VENCIMENTOS, avaliarVencimento
} = await import('../js/lease.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoTurno, textoDoMosaico, textoDaMediana } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarLease, registrarRenovacao, registrarVencimento
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'lease.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The number is used once and does not return.',
  'The nonce covered two calls.',
  'The seal matches the message and the key.',
  'The key travels inside another key.',
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

describe('lease, renovação e vencimento', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/lease.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(LEASES, ['Entra', 'Segue'], avaliarLease);
    conferir(RENOVACOES, ['Renova', 'Segue'], avaliarRenovacao);
    conferir(VENCIMENTOS, ['Vence', 'Segue'], avaliarVencimento);
    const ids = [...LEASES, ...RENOVACOES, ...VENCIMENTOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const lease = LEASES.find(c => c.id === 'lease2').rodadas[0];
    assert.equal(avaliarLease(lease, 'The lease covered 2 locks.').ok, true);
    const renovacao = RENOVACOES.find(c => c.id === 'renova3').rodadas[0];
    assert.equal(avaliarRenovacao(renovacao, 'The renewal covered 3 locks.').ok, true);
    const vencimento = VENCIMENTOS.find(c => c.id === 'vence4').rodadas[0];
    assert.equal(avaliarVencimento(vencimento, 'The expiry closed 4 locks.').ok, true);
    const texto = JSON.stringify({ LEASES, RENOVACOES, VENCIMENTOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Lease' && f.melhor === 'The rented lock lasts only for a short time.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Renovação' && f.melhor === 'The lock gains time before it drops.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Vencimento' && f.melhor === 'The lock lets go when the time ends.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['lease', 'renovacao', 'vencimento']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O turno'), false);
  });

  test('lease, renovação e vencimento contam no próprio contador', () => {
    travarMissao('lease1');
    const lease = registrarLease(fim());
    assert.equal(lease.bonusMissoes, 15);
    assert.equal(estado.stats.leases, 1);
    assert.equal(estado.stats.renovacoes, 0);
    assert.equal(estado.stats.vencimentos, 0);
    assert.equal(estado.stats.nonces, 0);
    assert.equal(estado.stats.envelopes, 0);
    assert.ok(estado.badges.includes('lease'));
    for (const id of ['renovacao', 'vencimento', 'nonce', 'envelope']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('renova1');
    const renovacao = registrarRenovacao(fim());
    assert.equal(renovacao.bonusMissoes, 15);
    assert.equal(estado.stats.renovacoes, 1);
    assert.equal(estado.stats.leases, 1);
    assert.ok(estado.badges.includes('renovacao'));

    travarMissao('vence1');
    const vencimento = registrarVencimento(fim());
    assert.equal(vencimento.bonusMissoes, 15);
    assert.equal(estado.stats.vencimentos, 1);
    assert.equal(estado.stats.nonces, 0);
    assert.ok(estado.badges.includes('vencimento'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 316);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o turno separa dias úteis e fim de semana, sem medir segundos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoTurno(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.uteis, 0);
    assert.equal(invalido.folgas, 0);
    assert.equal(invalido.texto, 'Ainda não há turno de dias.');
    const vazio = textoDoTurno({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.uteis, 0);
    assert.equal(vazio.texto, 'O turno ainda cobre 0 dias úteis.');
    const soUtil = textoDoTurno({ '2026-11-04': { n: 1, segundos: 40 } }, '2026-11-04');
    assert.equal(soUtil.dias, 1);
    assert.equal(soUtil.uteis, 1);
    assert.equal(soUtil.folgas, 0);
    assert.equal(soUtil.texto, 'O turno cobre 1 dia útil.');
    assert.equal(soUtil.texto.includes('segundos'), false);
    const soFolga = textoDoTurno({ '2026-11-01': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(soFolga.folgas, 1);
    assert.equal(soFolga.uteis, 0);
    assert.equal(soFolga.texto, 'O turno cobre 1 dia de fim de semana.');
    const duasFolgas = textoDoTurno({
      '2026-10-31': { n: 1, segundos: 40 },
      '2026-11-01': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(duasFolgas.texto, 'O turno cobre 2 dias de fim de semana.');
    const semente = {
      '2026-10-31': { n: 1, segundos: 40, grupos: { trabalho: 1 } },
      '2026-11-01': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-02': { n: 1, segundos: 90, grupos: { trabalho: 1, entrevista: 1 } },
      '2026-11-03': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-04': { n: 1, segundos: 600, grupos: { trabalho: 1 } }
    };
    const cheio = textoDoTurno(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.uteis, 3);
    assert.equal(cheio.folgas, 2);
    assert.equal(cheio.texto, 'O turno cobre 3 dias úteis e 2 de fim de semana.');
    assert.equal(cheio.texto.includes('segundos'), false);
    assert.equal(textoDoMosaico(semente, '2026-11-04').texto, 'O mosaico cobre 2 de 5 grupos.');
    assert.equal(textoDaMediana(semente, '2026-11-04').texto, 'A mediana dos dias é de 60 segundos.');
    assert.equal(cheio.texto === textoDoMosaico(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDaMediana(semente, '2026-11-04').texto, false);
    const futuro = textoDoTurno({
      '2026-11-04': { n: 1, segundos: 10 },
      '2026-11-07': { n: 1, segundos: 10 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.uteis, 1);
    assert.equal(futuro.texto, 'O turno cobre 1 dia útil.');
    const mudo = textoDoTurno({
      '2026-11-01': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(mudo.dias, 0);
    assert.equal(mudo.uteis, 0);
    assert.equal(mudo.folgas, 0);
    const umEum = textoDoTurno({
      '2026-11-01': { n: 1, segundos: 5 },
      '2026-11-02': { n: 1, segundos: 5 }
    }, '2026-11-04');
    assert.equal(umEum.texto, 'O turno cobre 1 dia útil e 1 de fim de semana.');
  });

  test('a versão 2.93 deixa o lease fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.93'/);
    assert.match(data, /versao: '2\.92'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/lease\.js/);
    assert.match(turno, /lease\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarLease', 'pintarRenovacao', 'pintarVencimento']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaEnvelopes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaLeases'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /lease: telaLeases/);
    assert.match(mapa, /renovacao: telaRenovacoes/);
    assert.match(mapa, /vencimento: telaVencimentos/);
    const turnoCard = app.slice(app.indexOf('function cartaoTurno'), app.indexOf('function blocoFluencia'));
    assert.match(turnoCard, /fala-turno/);
    assert.match(turnoCard, /O turno/);
    assert.match(turnoCard, /VER A SEMANA/);
    assert.equal(turnoCard.includes('function cartaoMosaico'), false);
    assert.equal(turnoCard.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-turno {'), css.indexOf('.fala-turno {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const busca = css.slice(css.indexOf('\ninput.busca-dic::-webkit-search-cancel-button {'), css.indexOf('\ninput.busca-dic::-webkit-search-cancel-button {') + 140);
    assert.match(busca, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMosaico\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoTurno\(/g) || []).length, 1);
    assert.equal((app.match(/O turno/g) || []).length, 1);
  });
});
