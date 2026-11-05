import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  HISTOGRAMS, avaliarHistogram, GAUGES, avaliarGauge, BACKFILLS, avaliarBackfill
} = await import('../js/histogram.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarHistogram, registrarGauge, registrarBackfill
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'histogram.js') continue;
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

describe('histogram, gauge e backfill', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/histogram.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(HISTOGRAMS, ['Conta', 'Segue'], avaliarHistogram);
    conferir(GAUGES, ['Mostra', 'Segue'], avaliarGauge);
    conferir(BACKFILLS, ['Enche', 'Segue'], avaliarBackfill);
    const ids = [...HISTOGRAMS, ...GAUGES, ...BACKFILLS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const histogram = HISTOGRAMS.find(c => c.id === 'histogram2').rodadas[0];
    assert.equal(avaliarHistogram(histogram, 'The histogram counted 2 buckets.').ok, true);
    const gauge = GAUGES.find(c => c.id === 'gauge3').rodadas[0];
    assert.equal(avaliarGauge(gauge, 'The gauge showed 3 levels.').ok, true);
    const backfill = BACKFILLS.find(c => c.id === 'backfill4').rodadas[0];
    assert.equal(avaliarBackfill(backfill, 'The backfill filled 4 gaps.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Histogram' && f.melhor === 'The histogram counts the bucket.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Gauge' && f.melhor === 'The gauge shows the level.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Backfill' && f.melhor === 'The backfill fills the gap.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 374);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 318);
    for (const id of ['histogram', 'gauge', 'backfill']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('histogram, gauge e backfill contam no próprio contador', () => {
    travarMissao('histogram1');
    const histogram = registrarHistogram(fim());
    assert.equal(histogram.bonusMissoes, 15);
    assert.equal(estado.stats.histograms, 1);
    assert.equal(estado.stats.gauges, 0);
    assert.equal(estado.stats.backfills, 0);
    assert.equal(estado.stats.evicts, 0);
    assert.ok(estado.badges.includes('histogram'));
    for (const id of ['gauge', 'backfill', 'evict']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('gauge1');
    const gauge = registrarGauge(fim());
    assert.equal(gauge.bonusMissoes, 15);
    assert.equal(estado.stats.gauges, 1);
    assert.ok(estado.badges.includes('gauge'));

    travarMissao('backfill1');
    const backfill = registrarBackfill(fim());
    assert.equal(backfill.bonusMissoes, 15);
    assert.equal(estado.stats.backfills, 1);
    assert.equal(estado.stats.histograms, 1);
    assert.ok(estado.badges.includes('backfill'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(BADGES.length, 397);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 3.17 mostra o trilho da unidade', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = semTravessao('../css/style.css');
    assert.match(data, /VERSAO_APP = '3\.21'/);
    assert.match(data, /versao: '3\.17'/);
    assert.match(data, /versao: '3\.16'/);
    assert.match(sw, /gringolingo-v154/);
    assert.match(sw, /\.\/js\/histogram\.js/);
    assert.match(turno, /histogram\.js/);
    for (const nome of ['pintarHistogram', 'pintarGauge', 'pintarBackfill']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarThrottle'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaHistograms'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('\u2014'), false);
    assert.equal(novo.includes('\u2013'), false);
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /histogram: telaHistograms/);
    assert.match(mapa, /gauge: telaGauges/);
    assert.match(mapa, /backfill: telaBackfills/);
    const banner = app.slice(app.indexOf('function bannerUnidade'), app.indexOf('function blocoFluencia'));
    assert.equal(banner.includes('\u2014'), false);
    assert.equal(banner.includes('\u2013'), false);
    assert.match(banner, /banner-trilho/);
    assert.match(banner, /role: 'progressbar'/);
    assert.match(banner, /aria-label': 'Feitos na unidade '/);
    assert.match(banner, / de /);
    const regra = css.slice(css.indexOf('.banner-trilho {'), css.indexOf('.banner-trilho {') + 220);
    assert.match(regra, /height: 10px/);
    assert.match(regra, /rgba\(255, 255, 255, 0\.28\)/);
    assert.equal(regra.includes('backdrop-filter'), false);
    assert.equal(regra.includes('blur'), false);
  });
});
