import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  REPLAYS, avaliarReplay, ECOS, avaliarEco, LEQUES, avaliarLeque
} = await import('../js/replay.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoLote } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarReplay, registrarEco, registrarLeque
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'replay.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The test passed on the second try.',
  'The email was already in the table.',
  'We turned one machine off on purpose.',
  'The call stack grew without end.',
  'The memory keeps growing.'
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

describe('replay, eco e leque', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/replay.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(REPLAYS, ['Corre', 'Preenche'], avaliarReplay);
    conferir(ECOS, ['Chega', 'Ignora'], avaliarEco);
    conferir(LEQUES, ['Acorda', 'Junta'], avaliarLeque);
    const ids = [...REPLAYS, ...ECOS, ...LEQUES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const replay = REPLAYS.find(c => c.id === 'replay2').rodadas[0];
    assert.equal(avaliarReplay(replay, 'The replay covered 2 days.').ok, true);
    const eco = ECOS.find(c => c.id === 'chegou2').rodadas[0];
    assert.equal(avaliarEco(eco, 'The event arrived 2 times.').ok, true);
    const leque = LEQUES.find(c => c.id === 'leque4').rodadas[0];
    assert.equal(avaliarLeque(leque, 'The fan woke 4 workers.').ok, true);
    const texto = JSON.stringify({ REPLAYS, ECOS, LEQUES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Replay' && f.melhor === 'We replayed the last two days.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Eco' && f.melhor === 'The same event arrived twice.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Leque' && f.melhor === 'One event woke four workers.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['replay', 'eco', 'leque']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('replay, eco e leque contam no próprio contador', () => {
    travarMissao('replay1');
    const replay = registrarReplay(fim());
    assert.equal(replay.bonusMissoes, 15);
    assert.equal(estado.stats.replays, 1);
    assert.equal(estado.stats.apagoes, 0);
    assert.equal(estado.stats.ecos, 0);
    assert.ok(estado.badges.includes('replay'));
    for (const id of ['eco', 'leque', 'apagao', 'instavel']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('eco1');
    const eco = registrarEco(fim());
    assert.equal(eco.bonusMissoes, 15);
    assert.equal(estado.stats.ecos, 1);
    assert.equal(estado.stats.replays, 1);
    assert.ok(estado.badges.includes('eco'));

    travarMissao('leque1');
    const leque = registrarLeque(fim());
    assert.equal(leque.bonusMissoes, 15);
    assert.equal(estado.stats.leques, 1);
    assert.equal(estado.stats.instaveis, 0);
    assert.ok(estado.badges.includes('leque'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 238);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o lote conta os treinos desta semana', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoLote(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há lote desta semana.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.lote, 0);
    const vazio = textoDoLote({}, '2026-11-04');
    assert.equal(vazio.texto, 'O lote desta semana ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.lote, 0);
    const fora = textoDoLote({ '2026-10-28': { n: 2, segundos: 90 } }, '2026-11-04');
    assert.equal(fora.dias, 1);
    assert.equal(fora.lote, 0);
    assert.equal(fora.texto, 'Nenhum treino entrou nesta semana.');
    const soSegundos = textoDoLote({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.lote, 0);
    assert.equal(soSegundos.texto, 'Nenhum treino entrou nesta semana.');
    const um = textoDoLote({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.lote, 1);
    assert.equal(um.texto, 'O lote desta semana é 1 treino.');
    const lote = textoDoLote({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(lote.dias, 5);
    assert.equal(lote.lote, 2);
    assert.equal(lote.texto, 'O lote desta semana é 2 treinos.');
    const futuro = textoDoLote({
      '2026-11-02': { n: 3, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.lote, 3);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoLote({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.lote, 0);
  });

  test('a versão 2.67 deixa o replay fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.67'/);
    assert.match(data, /versao: '2\.66'/);
    assert.match(sw, /gringolingo-v94/);
    assert.match(sw, /\.\/js\/replay\.js/);
    assert.match(turno, /replay\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarReplay', 'pintarEco', 'pintarLeque']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaApagoes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaReplays'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /replay: telaReplays/);
    assert.match(mapa, /eco: telaEcos/);
    assert.match(mapa, /leque: telaLeques/);
    const lote = app.slice(app.indexOf('function cartaoLote'), app.indexOf('function blocoFluencia'));
    assert.match(lote, /fala-lote/);
    assert.match(lote, /VER A SEMANA/);
    assert.equal(lote.includes('function cartaoTotal'), false);
    assert.equal(lote.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-lote {'), css.indexOf('.fala-lote {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const naoSei = css.slice(css.indexOf('.btn-nao-sei {'), css.indexOf('.btn-nao-sei {') + 80);
    assert.match(naoSei, /min-height: 44px/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirReducao\(\)/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirFrasal\(\)/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirIdioma\(\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoLote\(/g) || []).length, 1);
  });
});
