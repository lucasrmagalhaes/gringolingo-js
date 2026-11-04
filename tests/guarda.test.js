import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RASTROS, avaliarRastro, PARADAS, avaliarParada, PODS, avaliarPod
} = await import('../js/guarda.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoApoio } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRastro, registrarParada, registrarPod
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'guarda.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The health check failed twice.',
  'Please seed the empty database.',
  'Please raise the log level.',
  'I will cherry pick that one commit.',
  'The session ends after eight hours.',
  'The pool is full.',
  'Please squash these three commits.',
  'The circuit opens after five errors.'
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

describe('rastro, parada e pod', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/guarda.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(RASTROS, ['Pedido', 'Copia'], avaliarRastro);
    conferir(PARADAS, ['Início', 'Fim'], avaliarParada);
    conferir(PODS, ['Queda', 'Ar'], avaliarPod);
    const ids = [...RASTROS, ...PARADAS, ...PODS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const rastro = RASTROS.find(c => c.id === 'umpedido').rodadas[0];
    assert.equal(avaliarRastro(rastro, 'This id belongs to 1 request.').ok, true);
    const parada = PARADAS.find(c => c.id === 'meianoite').rodadas[1];
    assert.equal(avaliarParada(parada, 'It lasts 1 hour.').ok, true);
    const pod = PODS.find(c => c.id === 'umpod').rodadas[0];
    assert.equal(avaliarPod(pod, 'Please restart that 1 pod.').ok, true);
    const texto = JSON.stringify({ RASTROS, PARADAS, PODS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Rastro' && f.melhor === 'The request id sits in the header.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Parada' && f.melhor === 'The window starts at midnight.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Pod' && f.melhor === 'Please restart that one pod.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['rastro', 'parada', 'pod']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('rastro, parada e pod contam no próprio contador', () => {
    travarMissao('rastro1');
    const rastro = registrarRastro(fim());
    assert.equal(rastro.bonusMissoes, 15);
    assert.equal(estado.stats.rastros, 1);
    assert.equal(estado.stats.registros, 0);
    assert.equal(estado.stats.paradas, 0);
    assert.ok(estado.badges.includes('rastro'));
    for (const id of ['parada', 'pod', 'registro', 'sonda']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('parada1');
    const parada = registrarParada(fim());
    assert.equal(parada.bonusMissoes, 15);
    assert.equal(estado.stats.paradas, 1);
    assert.equal(estado.stats.rastros, 1);
    assert.ok(estado.badges.includes('parada'));

    travarMissao('pod1');
    const pod = registrarPod(fim());
    assert.equal(pod.bonusMissoes, 15);
    assert.equal(estado.stats.pods, 1);
    assert.equal(estado.stats.jobs, 0);
    assert.ok(estado.badges.includes('pod'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 181);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o apoio soma os preenchimentos da semana', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoApoio(null, '2026-10-28').texto, 'Nenhum preenchimento nesta semana.');
    assert.equal(textoDoApoio({}, '2026-10-28').n, 0);
    const curto = textoDoApoio({ '2026-10-28': { muletas: 0 } }, '2026-10-28');
    assert.equal(curto.texto, 'Nenhum preenchimento nesta semana.');
    const um = textoDoApoio({ '2026-10-28': { muletas: 1 } }, '2026-10-28');
    assert.equal(um.n, 1);
    assert.equal(um.texto, '1 preenchimento nesta semana.');
    const soma = textoDoApoio({
      '2026-10-26': { muletas: 2 },
      '2026-10-28': { muletas: '3' },
      '2026-10-25': { muletas: 9 },
      '2026-11-02': { muletas: 9 }
    }, '2026-10-28');
    assert.equal(soma.n, 5);
    assert.equal(soma.texto, '5 preenchimentos nesta semana.');
    assert.equal(textoDoApoio({ '2026-10-28': { muletas: 'x' } }, '2026-10-28').texto, 'Nenhum preenchimento nesta semana.');
  });

  test('a versão 2.48 deixa o rastro fora do passeio', () => {
    assert.equal(VERSAO_APP, '2.48');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    const exercises = readFileSync(join(raiz, 'js/exercises.js'), 'utf8');
    assert.match(data, /versao: '2\.48'/);
    assert.match(data, /versao: '2\.47'/);
    assert.match(sw, /gringolingo-v75/);
    assert.match(sw, /\.\/js\/guarda\.js/);
    assert.match(turno, /guarda\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarRastro', 'pintarParada', 'pintarPod']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaRegistros'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaRastros'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /rastro: telaRastros/);
    assert.match(mapa, /parada: telaParadas/);
    assert.match(mapa, /pod: telaPods/);
    const apoio = app.slice(app.indexOf('function cartaoApoio'), app.indexOf('function blocoFluencia'));
    assert.match(apoio, /fala-apoio/);
    assert.match(apoio, /VER O MÊS/);
    const caixa = css.slice(css.indexOf('button.caixa-treinavel {'), css.indexOf('button.caixa-treinavel:hover'));
    assert.match(caixa, /min-height: 44px/);
    assert.equal(caixa.includes('@media'), false);
    assert.equal(caixa.includes('#'), false);
    const regra = css.slice(css.indexOf('.fala-apoio {'), css.indexOf('.fala-apoio {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    assert.match(exercises, /class: 'btn-som' \+ \(extra \? ' ' \+ extra : ''\),\n    type: 'button'/);
    assert.match(exercises, /class: 'btn-som btn-lento',\n    type: 'button'/);
    assert.match(exercises, /class: 'btn-mic', type: 'button'/);
    assert.match(exercises, /class: 'btn btn-branco', type: 'button', onclick: \(\) => cb\.aoPular\(\)/);
    assert.match(exercises, /apresentacao-continuar', type: 'button'/);
  });
});
