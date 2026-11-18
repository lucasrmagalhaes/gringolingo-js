import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ONCALLS, avaliarOncall, SEVERITIES, avaliarSeverity, INCIDENTS, avaliarIncident
} = await import('../js/oncall.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarOncall, registrarSeverity, registrarIncident
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'oncall.js') continue;
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

describe('oncall, severity e incident', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/oncall.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(ONCALLS, ['Cobre', 'Fecha'], avaliarOncall);
    conferir(SEVERITIES, ['Marca', 'Fecha'], avaliarSeverity);
    conferir(INCIDENTS, ['Abre', 'Fecha'], avaliarIncident);
    const ids = [...ONCALLS, ...SEVERITIES, ...INCIDENTS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const oncall = ONCALLS.find(c => c.id === 'oncall2').rodadas[0];
    assert.equal(avaliarOncall(oncall, 'The oncall covered 2 shifts.').ok, true);
    const severity = SEVERITIES.find(c => c.id === 'severity3').rodadas[0];
    assert.equal(avaliarSeverity(severity, 'The severity marked 3 levels.').ok, true);
    const incident = INCIDENTS.find(c => c.id === 'incident4').rodadas[0];
    assert.equal(avaliarIncident(incident, 'The incident opened 4 cases.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Oncall' && f.melhor === 'The oncall covers the shift.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Severity' && f.melhor === 'The severity marks the level.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Incident' && f.melhor === 'The incident opens the case.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 383);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 327);
    for (const id of ['oncall', 'severity', 'incident']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('oncall, severity e incident contam no próprio contador', () => {
    travarMissao('oncall1');
    const oncall = registrarOncall(fim());
    assert.equal(oncall.bonusMissoes, 15);
    assert.equal(estado.stats.oncalls, 1);
    assert.equal(estado.stats.severities, 0);
    assert.equal(estado.stats.incidents, 0);
    assert.equal(estado.stats.failovers, 0);
    assert.ok(estado.badges.includes('oncall'));
    for (const id of ['severity', 'incident', 'failover']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    travarMissao('severity1');
    const severity = registrarSeverity(fim());
    assert.equal(severity.bonusMissoes, 15);
    assert.equal(estado.stats.severities, 1);
    assert.ok(estado.badges.includes('severity'));
    travarMissao('incident1');
    const incident = registrarIncident(fim());
    assert.equal(incident.bonusMissoes, 15);
    assert.equal(estado.stats.incidents, 1);
    assert.ok(estado.badges.includes('incident'));
    assert.equal(BADGES.length, 406);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 3.24 liga o oncall no hub', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.24'/);
    assert.match(data, /versao: '3\.24'/);
    assert.match(data, /versao: '3\.23'/);
    assert.match(sw, /gringolingo-v157/);
    assert.match(sw, /\.\/js\/oncall\.js/);
    assert.match(turno, /oncall\.js/);
    for (const nome of ['pintarOncall', 'pintarSeverity', 'pintarIncident']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarFailover'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaOncalls'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('\u2014'), false);
    assert.equal(novo.includes('\u2013'), false);
    assert.equal(novo.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /oncall: telaOncalls/);
    assert.match(mapa, /severity: telaSeverities/);
    assert.match(mapa, /incident: telaIncidents/);
  });
});
