import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SLOS, avaliarSlo, SLIS, avaliarSli, PROBES, avaliarProbe
} = await import('../js/slo.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSlo, registrarSli, registrarProbe
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'slo.js') continue;
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

describe('slo, sli e probe', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/slo.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(SLOS, ['Marca', 'Segue'], avaliarSlo);
    conferir(SLIS, ['Mede', 'Segue'], avaliarSli);
    conferir(PROBES, ['Testa', 'Segue'], avaliarProbe);
    const ids = [...SLOS, ...SLIS, ...PROBES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const slo = SLOS.find(c => c.id === 'slo2').rodadas[0];
    assert.equal(avaliarSlo(slo, 'The slo set 2 goals.').ok, true);
    const sli = SLIS.find(c => c.id === 'sli3').rodadas[0];
    assert.equal(avaliarSli(sli, 'The sli measured 3 goals.').ok, true);
    const probe = PROBES.find(c => c.id === 'probe4').rodadas[0];
    assert.equal(avaliarProbe(probe, 'The probe checked 4 ports.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Slo' && f.melhor === 'The slo sets the goal.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Sli' && f.melhor === 'The sli measures the goal.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Probe' && f.melhor === 'The probe checks the port.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 374);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 318);
    for (const id of ['slo', 'sli', 'probe']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('slo, sli e probe contam no próprio contador', () => {
    travarMissao('slo1');
    const slo = registrarSlo(fim());
    assert.equal(slo.bonusMissoes, 15);
    assert.equal(estado.stats.slos, 1);
    assert.equal(estado.stats.slis, 0);
    assert.equal(estado.stats.probes, 0);
    assert.equal(estado.stats.tails, 0);
    assert.ok(estado.badges.includes('slo'));
    for (const id of ['sli', 'probe', 'tail']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);
    travarMissao('sli1');
    const sli = registrarSli(fim());
    assert.equal(sli.bonusMissoes, 15);
    assert.equal(estado.stats.slis, 1);
    assert.ok(estado.badges.includes('sli'));
    travarMissao('probe1');
    const probe = registrarProbe(fim());
    assert.equal(probe.bonusMissoes, 15);
    assert.equal(estado.stats.probes, 1);
    assert.ok(estado.badges.includes('probe'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(BADGES.length, 397);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 3.19 liga o slo no hub', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.21'/);
    assert.match(data, /versao: '3\.19'/);
    assert.match(data, /versao: '3\.18'/);
    assert.match(sw, /gringolingo-v154/);
    assert.match(sw, /\.\/js\/slo\.js/);
    assert.match(turno, /slo\.js/);
    for (const nome of ['pintarSlo', 'pintarSli', 'pintarProbe']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarThrottle'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSlos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('\u2014'), false);
    assert.equal(novo.includes('\u2013'), false);
    assert.equal(novo.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /slo: telaSlos/);
    assert.match(mapa, /sli: telaSlis/);
    assert.match(mapa, /probe: telaProbes/);
  });
});
