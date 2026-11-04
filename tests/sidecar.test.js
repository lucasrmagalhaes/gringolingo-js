import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SIDECARS, avaliarSidecar, EMBAIXADORES, avaliarEmbaixador, ADAPTADORES, avaliarAdaptador
} = await import('../js/sidecar.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoLongo } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSidecar, registrarEmbaixador, registrarAdaptador
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'sidecar.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The leader guides the term.',
  'Each election raises the term.',
  'The follower copies the log.',
  'The write waits for a majority.',
  'More than half must confirm.',
  'The arbiter breaks the tie.',
  'The key lives outside the app.',
  'The pass only works for the right service.',
  'The old pass stops working at once.',
  'The orchestrator fires the sequence.',
  'The neighbor picks the next step.',
  'The failure undoes the previous step.',
  'The primary accepts the new write.',
  'The mirror follows without writing.',
  'The copy becomes primary when the owner falls.',
  'The write reaches the disk at once.',
  'The dirty page waits in the cache.',
  'The large write skips the cache.',
  'The nodes spread the state by rumor.',
  'The read repairs the old copy.',
  'The neighbor holds the write until the owner returns.',
  'The flake builds the id from the clock.',
  'The epoch rises when the membership changes.',
  'The vector records what this node saw.',
  'The read sees a value that is not committed.',
  'The snapshot freezes the rows at the start.',
  'The result matches one serial order.',
  'The task waits and never runs.',
  'The low task holds the resource.',
  'The long wait raises the priority.'
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

describe('sidecar, embaixador e adaptador', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/sidecar.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SIDECARS, ['Acompanha', 'Segue'], avaliarSidecar);
    conferir(EMBAIXADORES, ['Representa', 'Segue'], avaliarEmbaixador);
    conferir(ADAPTADORES, ['Traduz', 'Fecha'], avaliarAdaptador);
    const ids = [...SIDECARS, ...EMBAIXADORES, ...ADAPTADORES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const sidecar = SIDECARS.find(c => c.id === 'sidecar2').rodadas[0];
    assert.equal(avaliarSidecar(sidecar, 'The sidecar carried 2 calls.').ok, true);
    const embaixador = EMBAIXADORES.find(c => c.id === 'embaixador3').rodadas[0];
    assert.equal(avaliarEmbaixador(embaixador, 'The proxy covered 3 services.').ok, true);
    const adaptador = ADAPTADORES.find(c => c.id === 'adaptador4').rodadas[0];
    assert.equal(avaliarAdaptador(adaptador, 'The adapter joined 4 clients.').ok, true);
    const texto = JSON.stringify({ SIDECARS, EMBAIXADORES, ADAPTADORES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Sidecar' && f.melhor === 'The helper sits beside the service.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Embaixador' && f.melhor === 'The proxy speaks for the outside caller.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Adaptador' && f.melhor === 'The adapter joins the old client.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['sidecar', 'embaixador', 'adaptador']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('sidecar, embaixador e adaptador contam no próprio contador', () => {
    travarMissao('sidecar1');
    const sidecar = registrarSidecar(fim());
    assert.equal(sidecar.bonusMissoes, 15);
    assert.equal(estado.stats.sidecars, 1);
    assert.equal(estado.stats.embaixadores, 0);
    assert.equal(estado.stats.adaptadores, 0);
    assert.equal(estado.stats.fomes, 0);
    assert.equal(estado.stats.idades, 0);
    assert.ok(estado.badges.includes('sidecar'));
    for (const id of ['embaixador', 'adaptador', 'fome', 'idade']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('embaixador1');
    const embaixador = registrarEmbaixador(fim());
    assert.equal(embaixador.bonusMissoes, 15);
    assert.equal(estado.stats.embaixadores, 1);
    assert.equal(estado.stats.sidecars, 1);
    assert.ok(estado.badges.includes('embaixador'));

    travarMissao('adaptador1');
    const adaptador = registrarAdaptador(fim());
    assert.equal(adaptador.bonusMissoes, 15);
    assert.equal(estado.stats.adaptadores, 1);
    assert.equal(estado.stats.idades, 0);
    assert.ok(estado.badges.includes('adaptador'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 304);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o longo mede o dia de fala com mais segundos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoLongo(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há longo de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.longo, 0);
    const vazio = textoDoLongo({}, '2026-11-04');
    assert.equal(vazio.texto, 'O longo dos dias ainda é 0 segundos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.longo, 0);
    const umSegundo = textoDoLongo({ '2026-11-04': { n: 1, segundos: 1 } }, '2026-11-04');
    assert.equal(umSegundo.dias, 1);
    assert.equal(umSegundo.longo, 1);
    assert.equal(umSegundo.texto, 'O longo dos dias é de 1 segundo.');
    const parelho = textoDoLongo({
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(parelho.dias, 2);
    assert.equal(parelho.longo, 60);
    assert.equal(parelho.texto, 'O longo dos dias é de 60 segundos.');
    const meio = textoDoLongo({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(meio.dias, 2);
    assert.equal(meio.longo, 60);
    assert.equal(meio.texto, 'O longo dos dias é de 60 segundos.');
    const igual = textoDoLongo({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.longo, 600);
    assert.equal(igual.texto, 'O longo dos dias é de 600 segundos.');
    const futuro = textoDoLongo({
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.longo, 90);
    assert.equal(futuro.texto, 'O longo dos dias é de 90 segundos.');
    const mudo = textoDoLongo({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.longo, 0);
    assert.equal(mudo.texto, 'O longo dos dias é de 0 segundos.');
    const zerado = textoDoLongo({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.longo, 0);
  });

  test('a versão 2.89 deixa o sidecar fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.89'/);
    assert.match(data, /versao: '2\.88'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/sidecar\.js/);
    assert.match(turno, /sidecar\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSidecar', 'pintarEmbaixador', 'pintarAdaptador']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaIdades'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSidecars'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /sidecar: telaSidecars/);
    assert.match(mapa, /embaixador: telaEmbaixadores/);
    assert.match(mapa, /adaptador: telaAdaptadores/);
    const longo = app.slice(app.indexOf('function cartaoLongo'), app.indexOf('function blocoFluencia'));
    assert.match(longo, /fala-longo/);
    assert.match(longo, /VER A SEMANA/);
    assert.equal(longo.includes('function cartaoCurto'), false);
    assert.equal(longo.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-longo {'), css.indexOf('.fala-longo {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const escuta = css.slice(css.indexOf('\n.escuta-atalho {'), css.indexOf('\n.escuta-atalho {') + 80);
    assert.match(escuta, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoLongo\(/g) || []).length, 1);
  });
});
