import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  EGRESSES, avaliarEgress, GATEWAYS, avaliarGateway, FAILOVERS, avaliarFailover
} = await import('../js/egress.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarEgress, registrarGateway, registrarFailover
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'egress.js') continue;
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

describe('egress, gateway e failover', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/egress.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(EGRESSES, ['Solta', 'Fecha'], avaliarEgress);
    conferir(GATEWAYS, ['Abre', 'Fecha'], avaliarGateway);
    conferir(FAILOVERS, ['Troca', 'Fecha'], avaliarFailover);
    const ids = [...EGRESSES, ...GATEWAYS, ...FAILOVERS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const egress = EGRESSES.find(c => c.id === 'egress2').rodadas[0];
    assert.equal(avaliarEgress(egress, 'The egress released 2 packets.').ok, true);
    const gateway = GATEWAYS.find(c => c.id === 'gateway3').rodadas[0];
    assert.equal(avaliarGateway(gateway, 'The gateway opened 3 routes.').ok, true);
    const failover = FAILOVERS.find(c => c.id === 'failover4').rodadas[0];
    assert.equal(avaliarFailover(failover, 'The failover switched 4 nodes.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Egress' && f.melhor === 'The egress releases the packet.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Gateway' && f.melhor === 'The gateway opens the route.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Failover' && f.melhor === 'The failover switches the node.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 383);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 327);
    for (const id of ['egress', 'gateway', 'failover']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('egress, gateway e failover contam no próprio contador', () => {
    travarMissao('egress1');
    const egress = registrarEgress(fim());
    assert.equal(egress.bonusMissoes, 15);
    assert.equal(estado.stats.egresses, 1);
    assert.equal(estado.stats.gateways, 0);
    assert.equal(estado.stats.failovers, 0);
    assert.equal(estado.stats.exemplars, 0);
    assert.ok(estado.badges.includes('egress'));
    for (const id of ['gateway', 'failover', 'exemplar']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    travarMissao('gateway1');
    const gateway = registrarGateway(fim());
    assert.equal(gateway.bonusMissoes, 15);
    assert.equal(estado.stats.gateways, 1);
    assert.ok(estado.badges.includes('gateway'));
    travarMissao('failover1');
    const failover = registrarFailover(fim());
    assert.equal(failover.bonusMissoes, 15);
    assert.equal(estado.stats.failovers, 1);
    assert.ok(estado.badges.includes('failover'));
    assert.equal(BADGES.length, 406);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 3.23 liga o egress no hub', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.24'/);
    assert.match(data, /versao: '3\.23'/);
    assert.match(data, /versao: '3\.22'/);
    assert.match(sw, /gringolingo-v157/);
    assert.match(sw, /\.\/js\/egress\.js/);
    assert.match(turno, /egress\.js/);
    for (const nome of ['pintarEgress', 'pintarGateway', 'pintarFailover']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarExemplar'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaEgresses'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('\u2014'), false);
    assert.equal(novo.includes('\u2013'), false);
    assert.equal(novo.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /egress: telaEgresses/);
    assert.match(mapa, /gateway: telaGateways/);
    assert.match(mapa, /failover: telaFailovers/);
  });
});
