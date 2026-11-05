import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  WEBHOOKS, avaliarWebhook, FANOUTS, avaliarFanout, INGESTS, avaliarIngest
} = await import('../js/webhook.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarWebhook, registrarFanout, registrarIngest
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'webhook.js') continue;
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

describe('webhook, fanout e ingest', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/webhook.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(WEBHOOKS, ['Avisa', 'Fecha'], avaliarWebhook);
    conferir(FANOUTS, ['Espalha', 'Fecha'], avaliarFanout);
    conferir(INGESTS, ['Recebe', 'Fecha'], avaliarIngest);
    const ids = [...WEBHOOKS, ...FANOUTS, ...INGESTS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const webhook = WEBHOOKS.find(c => c.id === 'webhook2').rodadas[0];
    assert.equal(avaliarWebhook(webhook, 'The webhook warned 2 systems.').ok, true);
    const fanout = FANOUTS.find(c => c.id === 'fanout3').rodadas[0];
    assert.equal(avaliarFanout(fanout, 'The fanout spread 3 calls.').ok, true);
    const ingest = INGESTS.find(c => c.id === 'ingest4').rodadas[0];
    assert.equal(avaliarIngest(ingest, 'The ingest received 4 events.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Webhook' && f.melhor === 'The webhook warns the system.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Fanout' && f.melhor === 'The fanout spreads the call.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Ingest' && f.melhor === 'The ingest receives the event.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 380);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 324);
    for (const id of ['webhook', 'fanout', 'ingest']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('webhook, fanout e ingest contam no próprio contador', () => {
    travarMissao('webhook1');
    const webhook = registrarWebhook(fim());
    assert.equal(webhook.bonusMissoes, 15);
    assert.equal(estado.stats.webhooks, 1);
    assert.equal(estado.stats.fanouts, 0);
    assert.equal(estado.stats.ingests, 0);
    assert.equal(estado.stats.rollups, 0);
    assert.ok(estado.badges.includes('webhook'));
    for (const id of ['fanout', 'ingest', 'rollup']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    travarMissao('fanout1');
    const fanout = registrarFanout(fim());
    assert.equal(fanout.bonusMissoes, 15);
    assert.equal(estado.stats.fanouts, 1);
    assert.ok(estado.badges.includes('fanout'));
    travarMissao('ingest1');
    const ingest = registrarIngest(fim());
    assert.equal(ingest.bonusMissoes, 15);
    assert.equal(estado.stats.ingests, 1);
    assert.ok(estado.badges.includes('ingest'));
    assert.equal(BADGES.length, 403);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 3.21 liga o webhook no hub', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.23'/);
    assert.match(data, /versao: '3\.21'/);
    assert.match(data, /versao: '3\.20'/);
    assert.match(sw, /gringolingo-v156/);
    assert.match(sw, /\.\/js\/webhook\.js/);
    assert.match(turno, /webhook\.js/);
    for (const nome of ['pintarWebhook', 'pintarFanout', 'pintarIngest']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarRollup'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaWebhooks'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('\u2014'), false);
    assert.equal(novo.includes('\u2013'), false);
    assert.equal(novo.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /webhook: telaWebhooks/);
    assert.match(mapa, /fanout: telaFanouts/);
    assert.match(mapa, /ingest: telaIngests/);
  });
});
