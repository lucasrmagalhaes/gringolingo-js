import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SKEWS, avaliarSkew, HOTSPOTS, avaliarHotspot, TAILS, avaliarTail
} = await import('../js/skew.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSkew, registrarHotspot, registrarTail
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'skew.js') continue;
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

describe('skew, hotspot e tail', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/skew.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(SKEWS, ['Entorta', 'Segue'], avaliarSkew);
    conferir(HOTSPOTS, ['Esquenta', 'Segue'], avaliarHotspot);
    conferir(TAILS, ['Atrasa', 'Segue'], avaliarTail);
    const ids = [...SKEWS, ...HOTSPOTS, ...TAILS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const skew = SKEWS.find(c => c.id === 'skew2').rodadas[0];
    assert.equal(avaliarSkew(skew, 'The skew tilted 2 keys.').ok, true);
    const hotspot = HOTSPOTS.find(c => c.id === 'hotspot3').rodadas[0];
    assert.equal(avaliarHotspot(hotspot, 'The hotspot heated 3 keys.').ok, true);
    const tail = TAILS.find(c => c.id === 'tail4').rodadas[0];
    assert.equal(avaliarTail(tail, 'The tail slowed 4 calls.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Skew' && f.melhor === 'The skew tilts the key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Hotspot' && f.melhor === 'The hotspot heats the key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Tail' && f.melhor === 'The tail slows the call.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 374);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 318);
    for (const id of ['skew', 'hotspot', 'tail']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('skew, hotspot e tail contam no próprio contador', () => {
    travarMissao('skew1');
    const skew = registrarSkew(fim());
    assert.equal(skew.bonusMissoes, 15);
    assert.equal(estado.stats.skews, 1);
    assert.equal(estado.stats.hotspots, 0);
    assert.equal(estado.stats.tails, 0);
    assert.equal(estado.stats.backfills, 0);
    assert.ok(estado.badges.includes('skew'));
    for (const id of ['hotspot', 'tail', 'backfill']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('hotspot1');
    const hotspot = registrarHotspot(fim());
    assert.equal(hotspot.bonusMissoes, 15);
    assert.equal(estado.stats.hotspots, 1);
    assert.ok(estado.badges.includes('hotspot'));

    travarMissao('tail1');
    const tail = registrarTail(fim());
    assert.equal(tail.bonusMissoes, 15);
    assert.equal(estado.stats.tails, 1);
    assert.equal(estado.stats.skews, 1);
    assert.ok(estado.badges.includes('tail'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(BADGES.length, 397);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 3.18 pinta a barra da unidade', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const css = semTravessao('../css/style.css');
    assert.match(data, /VERSAO_APP = '3\.21'/);
    assert.match(data, /versao: '3\.18'/);
    assert.match(data, /versao: '3\.17'/);
    assert.match(sw, /gringolingo-v154/);
    assert.match(sw, /\.\/js\/skew\.js/);
    for (const nome of ['pintarSkew', 'pintarHotspot', 'pintarTail']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarThrottle'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSkews'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('\u2014'), false);
    assert.equal(novo.includes('\u2013'), false);
    assert.equal(novo.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /skew: telaSkews/);
    assert.match(mapa, /hotspot: telaHotspots/);
    assert.match(mapa, /tail: telaTails/);
    const conta = css.slice(css.indexOf('.banner-conta {'), css.indexOf('}', css.indexOf('.banner-conta {')));
    assert.match(conta, /font-weight: 800/);
    assert.match(conta, /color: #1A1F2E/);
    const claro = css.slice(css.indexOf(':root:not([data-tema="escuro"]) .banner-trilho {'), css.indexOf(':root:not([data-tema="escuro"]) .banner-trilho {') + 120);
    assert.match(claro, /#E8E0D4/);
    const fill = css.slice(css.indexOf('.banner-trilho > div {'), css.indexOf('.banner-trilho > div {') + 240);
    assert.match(fill, /background-color: #58CC02/);
    assert.match(fill, /rgba\(255, 255, 255, 0\.28\)/);
    assert.equal(fill.includes('backdrop-filter'), false);
    assert.equal(fill.includes('blur'), false);
  });
});
