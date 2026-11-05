import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  TRACES, avaliarTrace, SCRAPES, avaliarScrape, ROLLUPS, avaliarRollup
} = await import('../js/trace.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarTrace, registrarScrape, registrarRollup
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'trace.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

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

describe('trace, scrape e rollup', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/trace.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(TRACES, ['Segue', 'Fecha'], avaliarTrace);
    conferir(SCRAPES, ['Lê', 'Fecha'], avaliarScrape);
    conferir(ROLLUPS, ['Soma', 'Fecha'], avaliarRollup);
    const ids = [...TRACES, ...SCRAPES, ...ROLLUPS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const trace = TRACES.find(c => c.id === 'trace2').rodadas[0];
    assert.equal(avaliarTrace(trace, 'The trace followed 2 calls.').ok, true);
    const scrape = SCRAPES.find(c => c.id === 'scrape3').rodadas[0];
    assert.equal(avaliarScrape(scrape, 'The scrape read 3 metrics.').ok, true);
    const rollup = ROLLUPS.find(c => c.id === 'rollup4').rodadas[0];
    assert.equal(avaliarRollup(rollup, 'The rollup summed 4 hours.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Trace' && f.melhor === 'The trace follows the call.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Scrape' && f.melhor === 'The scrape reads the metric.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Rollup' && f.melhor === 'The rollup sums the hour.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 383);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 327);
    for (const id of ['trace', 'scrape', 'rollup']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('trace, scrape e rollup contam no próprio contador', () => {
    travarMissao('trace1');
    const trace = registrarTrace(fim());
    assert.equal(trace.bonusMissoes, 15);
    assert.equal(estado.stats.traces, 1);
    assert.equal(estado.stats.scrapes, 0);
    assert.equal(estado.stats.rollups, 0);
    assert.equal(estado.stats.probes, 0);
    assert.ok(estado.badges.includes('trace'));
    for (const id of ['scrape', 'rollup', 'probe']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    travarMissao('scrape1');
    const scrape = registrarScrape(fim());
    assert.equal(scrape.bonusMissoes, 15);
    assert.equal(estado.stats.scrapes, 1);
    assert.ok(estado.badges.includes('scrape'));
    travarMissao('rollup1');
    const rollup = registrarRollup(fim());
    assert.equal(rollup.bonusMissoes, 15);
    assert.equal(estado.stats.rollups, 1);
    assert.ok(estado.badges.includes('rollup'));
    assert.equal(BADGES.length, 406);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 3.20 liga o trace no hub', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.24'/);
    assert.match(data, /versao: '3\.20'/);
    assert.match(data, /versao: '3\.19'/);
    assert.match(sw, /gringolingo-v157/);
    assert.match(sw, /\.\/js\/trace\.js/);
    assert.match(turno, /trace\.js/);
    for (const nome of ['pintarTrace', 'pintarScrape', 'pintarRollup']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarThrottle'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaTraces'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('\u2014'), false);
    assert.equal(novo.includes('\u2013'), false);
    assert.equal(novo.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /trace: telaTraces/);
    assert.match(mapa, /scrape: telaScrapes/);
    assert.match(mapa, /rollup: telaRollups/);
  });
});
