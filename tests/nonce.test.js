import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  NONCES, avaliarNonce, HMACS, avaliarHmac, ENVELOPES, avaliarEnvelope
} = await import('../js/nonce.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoMosaico, textoDaMediana } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarNonce, registrarHmac, registrarEnvelope
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'nonce.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The write hits the log before the table.',
  'The log stored two writes.',
  'The record number only moves forward.',
  'The number climbed three steps.',
  'The checkpoint stores a safe point.',
  'The checkpoint covered four records.',
  'A lying node still lets the others agree.',
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

describe('nonce, hmac e envelope', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/nonce.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(NONCES, ['Entra', 'Segue'], avaliarNonce);
    conferir(HMACS, ['Sela', 'Segue'], avaliarHmac);
    conferir(ENVELOPES, ['Embala', 'Fecha'], avaliarEnvelope);
    const ids = [...NONCES, ...HMACS, ...ENVELOPES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const nonce = NONCES.find(c => c.id === 'nonce2').rodadas[0];
    assert.equal(avaliarNonce(nonce, 'The nonce covered 2 calls.').ok, true);
    const hmac = HMACS.find(c => c.id === 'hmac3').rodadas[0];
    assert.equal(avaliarHmac(hmac, 'The seal covered 3 messages.').ok, true);
    const envelope = ENVELOPES.find(c => c.id === 'envelope4').rodadas[0];
    assert.equal(avaliarEnvelope(envelope, 'The envelope carried 4 keys.').ok, true);
    const texto = JSON.stringify({ NONCES, HMACS, ENVELOPES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Nonce' && f.melhor === 'The number is used once and does not return.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Hmac' && f.melhor === 'The seal matches the message and the key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Envelope' && f.melhor === 'The key travels inside another key.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['nonce', 'hmac', 'envelope']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O mosaico'), false);
  });

  test('nonce, hmac e envelope contam no próprio contador', () => {
    travarMissao('nonce1');
    const nonce = registrarNonce(fim());
    assert.equal(nonce.bonusMissoes, 15);
    assert.equal(estado.stats.nonces, 1);
    assert.equal(estado.stats.hmacs, 0);
    assert.equal(estado.stats.envelopes, 0);
    assert.equal(estado.stats.wals, 0);
    assert.equal(estado.stats.checkpoints, 0);
    assert.ok(estado.badges.includes('nonce'));
    for (const id of ['hmac', 'envelope', 'wal', 'checkpoint']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('hmac1');
    const hmac = registrarHmac(fim());
    assert.equal(hmac.bonusMissoes, 15);
    assert.equal(estado.stats.hmacs, 1);
    assert.equal(estado.stats.nonces, 1);
    assert.ok(estado.badges.includes('hmac'));

    travarMissao('envelope1');
    const envelope = registrarEnvelope(fim());
    assert.equal(envelope.bonusMissoes, 15);
    assert.equal(estado.stats.envelopes, 1);
    assert.equal(estado.stats.wals, 0);
    assert.ok(estado.badges.includes('envelope'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 313);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o mosaico conta grupos praticados, sem medir segundos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoMosaico(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.grupos, 0);
    assert.equal(invalido.total, 5);
    assert.equal(invalido.texto, 'Ainda não há mosaico de grupos.');
    const vazio = textoDoMosaico({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.grupos, 0);
    assert.equal(vazio.texto, 'O mosaico ainda cobre 0 de 5 grupos.');
    const semGrupo = textoDoMosaico({ '2026-11-04': { n: 1, segundos: 40 } }, '2026-11-04');
    assert.equal(semGrupo.dias, 1);
    assert.equal(semGrupo.grupos, 0);
    assert.equal(semGrupo.texto, 'O mosaico cobre 0 de 5 grupos.');
    assert.equal(semGrupo.texto.includes('segundos'), false);
    const um = textoDoMosaico({
      '2026-11-04': { n: 1, segundos: 40, grupos: { trabalho: 1 } }
    }, '2026-11-04');
    assert.equal(um.grupos, 1);
    assert.equal(um.texto, 'O mosaico cobre 1 de 5 grupos.');
    const semente = {
      '2026-10-31': { n: 1, segundos: 40, grupos: { trabalho: 1 } },
      '2026-11-01': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-02': { n: 1, segundos: 90, grupos: { trabalho: 1, entrevista: 1 } },
      '2026-11-03': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-04': { n: 1, segundos: 600, grupos: { trabalho: 1 } }
    };
    const cheio = textoDoMosaico(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.grupos, 2);
    assert.equal(cheio.texto, 'O mosaico cobre 2 de 5 grupos.');
    assert.equal(cheio.texto.includes('segundos'), false);
    assert.equal(textoDaMediana(semente, '2026-11-04').texto, 'A mediana dos dias é de 60 segundos.');
    assert.equal(cheio.texto === textoDaMediana(semente, '2026-11-04').texto, false);
    const todos = textoDoMosaico({
      '2026-11-04': {
        n: 5,
        segundos: 10,
        grupos: { trabalho: 1, entrevista: 1, cotidiano: 1, pronuncia: 1, revisao: 1 }
      }
    }, '2026-11-04');
    assert.equal(todos.grupos, 5);
    assert.equal(todos.texto, 'O mosaico cobre os 5 grupos.');
    const futuro = textoDoMosaico({
      '2026-11-04': { n: 1, segundos: 10, grupos: { trabalho: 1 } },
      '2026-11-05': { n: 1, segundos: 10, grupos: { entrevista: 1 } }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.grupos, 1);
    assert.equal(futuro.texto, 'O mosaico cobre 1 de 5 grupos.');
    const mudo = textoDoMosaico({
      '2026-11-03': { n: 0, segundos: 0, grupos: { trabalho: 4 } },
      '2026-11-04': { n: 0, segundos: 0, grupos: { entrevista: 2 } }
    }, '2026-11-04');
    assert.equal(mudo.dias, 0);
    assert.equal(mudo.grupos, 0);
  });

  test('a versão 2.92 deixa o nonce fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.92'/);
    assert.match(data, /versao: '2\.91'/);
    assert.match(sw, /gringolingo-v119/);
    assert.match(sw, /\.\/js\/nonce\.js/);
    assert.match(turno, /nonce\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarNonce', 'pintarHmac', 'pintarEnvelope']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCheckpoints'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaNonces'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /nonce: telaNonces/);
    assert.match(mapa, /hmac: telaHmacs/);
    assert.match(mapa, /envelope: telaEnvelopes/);
    const mosaico = app.slice(app.indexOf('function cartaoMosaico'), app.indexOf('function blocoFluencia'));
    assert.match(mosaico, /fala-mosaico/);
    assert.match(mosaico, /O mosaico/);
    assert.match(mosaico, /VER A SEMANA/);
    assert.equal(mosaico.includes('function cartaoMediana'), false);
    assert.equal(mosaico.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-mosaico {'), css.indexOf('.fala-mosaico {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const busca = css.slice(css.indexOf('\n#busca-hub::-webkit-search-cancel-button {'), css.indexOf('\n#busca-hub::-webkit-search-cancel-button {') + 140);
    assert.match(busca, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoMosaico\(/g) || []).length, 1);
    assert.equal((app.match(/O mosaico/g) || []).length, 1);
  });
});
