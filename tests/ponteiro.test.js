import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PONTEIROS, avaliarPonteiro, ELEICOES, avaliarEleicao, FREIOS, avaliarFreio
} = await import('../js/ponteiro.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaLacuna } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPonteiro, registrarEleicao, registrarFreio
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'ponteiro.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The two jobs wait on each other.',
  'The name does not resolve.',
  'The bad message goes to the side queue.',
  'The CPU stays near ninety percent.',
  'The backup starts at two.',
  'The process ran out of memory.'
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

describe('ponteiros, eleição e freio', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/ponteiro.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(PONTEIROS, ['Difere', 'Alinha'], avaliarPonteiro);
    conferir(ELEICOES, ['Voto', 'Líder'], avaliarEleicao);
    conferir(FREIOS, ['Enche', 'Freia'], avaliarFreio);
    const ids = [...PONTEIROS, ...ELEICOES, ...FREIOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const relogio = PONTEIROS.find(c => c.id === 'doisseg').rodadas[0];
    assert.equal(avaliarPonteiro(relogio, 'The clocks differ by 2 seconds.').ok, true);
    const votos = ELEICOES.find(c => c.id === 'doistres').rodadas[0];
    assert.equal(avaliarEleicao(votos, '2 of 3 must agree.').ok, true);
    const fila = FREIOS.find(c => c.id === 'enviadevagar').rodadas[0];
    assert.equal(avaliarFreio(fila, '50 messages are waiting.').ok, true);
    const texto = JSON.stringify({ PONTEIROS, ELEICOES, FREIOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Ponteiros' && f.melhor === 'The clocks differ by two seconds.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Eleição' && f.melhor === 'Two of three must agree.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Freio' && f.melhor === 'The queue is full.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['ponteiro', 'eleicao', 'freio']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('ponteiros, eleição e freio contam no próprio contador', () => {
    travarMissao('ponteiro1');
    const ponteiro = registrarPonteiro(fim());
    assert.equal(ponteiro.bonusMissoes, 15);
    assert.equal(estado.stats.ponteiros, 1);
    assert.equal(estado.stats.mortas, 0);
    assert.equal(estado.stats.eleicoes, 0);
    assert.ok(estado.badges.includes('ponteiro'));
    for (const id of ['eleicao', 'freio', 'morta', 'impasse']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('eleicao1');
    const eleicao = registrarEleicao(fim());
    assert.equal(eleicao.bonusMissoes, 15);
    assert.equal(estado.stats.eleicoes, 1);
    assert.equal(estado.stats.ponteiros, 1);
    assert.ok(estado.badges.includes('eleicao'));

    travarMissao('freio1');
    const freio = registrarFreio(fim());
    assert.equal(freio.bonusMissoes, 15);
    assert.equal(estado.stats.freios, 1);
    assert.equal(estado.stats.jobs, 0);
    assert.ok(estado.badges.includes('freio'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 193);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a lacuna conta os dias desta semana ainda sem fala', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDaLacuna(null, '2026-10-28').texto, '3 dias em branco nesta semana.');
    assert.equal(textoDaLacuna({}, '2026-10-28').n, 3);
    assert.equal(textoDaLacuna(null, 'sem-data').texto, 'Nenhum dia em branco nesta semana.');
    const cheia = textoDaLacuna({
      '2026-10-26': { n: 1, segundos: 0 },
      '2026-10-27': { n: 0, segundos: 30 },
      '2026-10-28': { n: '1', segundos: '0' }
    }, '2026-10-28');
    assert.equal(cheia.n, 0);
    assert.equal(cheia.texto, 'Nenhum dia em branco nesta semana.');
    const um = textoDaLacuna({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-28': { n: 0, segundos: 20 },
      '2026-10-25': { n: 4, segundos: 0 },
      '2026-10-29': { n: 0, segundos: 0 }
    }, '2026-10-28');
    assert.equal(um.n, 1);
    assert.equal(um.texto, '1 dia em branco nesta semana.');
    const dois = textoDaLacuna({ '2026-10-28': { n: 'x', segundos: 0 } }, '2026-10-28');
    assert.equal(dois.n, 3);
    assert.equal(dois.texto, '3 dias em branco nesta semana.');
  });

  test('a versão 2.52 deixa os ponteiros fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    const exercicios = readFileSync(join(raiz, 'js/exercises.js'), 'utf8');
    assert.match(data, /versao: '2\.52'/);
    assert.match(data, /versao: '2\.51'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/ponteiro\.js/);
    assert.match(turno, /ponteiro\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPonteiro', 'pintarEleicao', 'pintarFreio']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaMortas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaPonteiros'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /ponteiro: telaPonteiros/);
    assert.match(mapa, /eleicao: telaEleicoes/);
    assert.match(mapa, /freio: telaFreios/);
    const lacuna = app.slice(app.indexOf('function cartaoLacuna'), app.indexOf('function blocoFluencia'));
    assert.match(lacuna, /fala-lacuna/);
    assert.match(lacuna, /VER A SEMANA/);
    const regra = css.slice(css.indexOf('.fala-lacuna {'), css.indexOf('.fala-lacuna {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const opcao = css.slice(css.indexOf('.opcao {'), css.indexOf('.opcao:hover'));
    assert.match(opcao, /min-height: 44px/);
    const peca = css.slice(css.indexOf('.tile {'), css.indexOf('.tile:hover'));
    assert.match(peca, /min-height: 44px/);
    assert.match(exercicios, /class: 'opcao', type: 'button'/);
    assert.match(exercicios, /class: 'tile', type: 'button'/);
    assert.match(exercicios, /class: 'opcao par-btn', type: 'button'/);
  });
});
