import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PISCINAS, avaliarPiscina, BALDES, avaliarBalde, CERCAS, avaliarCerca
} = await import('../js/piscina.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoMenor } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPiscina, registrarBalde, registrarCerca
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'piscina.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The circuit opened after five failures.',
  'The lease expired after thirty seconds.',
  'The node missed three heartbeats.',
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

describe('piscina, balde e cerca', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/piscina.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(PISCINAS, ['Lotou', 'Abre'], avaliarPiscina);
    conferir(BALDES, ['Gasta', 'Repõe'], avaliarBalde);
    conferir(CERCAS, ['Invalida', 'Troca'], avaliarCerca);
    const ids = [...PISCINAS, ...BALDES, ...CERCAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const piscina = PISCINAS.find(c => c.id === 'piscina0').rodadas[0];
    assert.equal(avaliarPiscina(piscina, 'The pool held 0 free slots.').ok, true);
    const balde = BALDES.find(c => c.id === 'balde0').rodadas[0];
    assert.equal(avaliarBalde(balde, 'The bucket held 0 tokens.').ok, true);
    const cerca = CERCAS.find(c => c.id === 'cerca9').rodadas[0];
    assert.equal(avaliarCerca(cerca, 'The fence stopped at number 9.').ok, true);
    const texto = JSON.stringify({ PISCINAS, BALDES, CERCAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Piscina' && f.melhor === 'The pool ran out of free slots.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Balde' && f.melhor === 'The bucket ran out of tokens.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cerca' && f.melhor === 'A higher number blocked the old owner.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['piscina', 'balde', 'cerca']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('piscina, balde e cerca contam no próprio contador', () => {
    travarMissao('piscina1');
    const piscina = registrarPiscina(fim());
    assert.equal(piscina.bonusMissoes, 15);
    assert.equal(estado.stats.piscinas, 1);
    assert.equal(estado.stats.pulsos, 0);
    assert.equal(estado.stats.baldes, 0);
    assert.ok(estado.badges.includes('piscina'));
    for (const id of ['pulso', 'cerca', 'balde', 'disjuntor']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('balde1');
    const balde = registrarBalde(fim());
    assert.equal(balde.bonusMissoes, 15);
    assert.equal(estado.stats.baldes, 1);
    assert.equal(estado.stats.piscinas, 1);
    assert.ok(estado.badges.includes('balde'));

    travarMissao('cerca1');
    const cerca = registrarCerca(fim());
    assert.equal(cerca.bonusMissoes, 15);
    assert.equal(estado.stats.cercas, 1);
    assert.equal(estado.stats.disjuntores, 0);
    assert.ok(estado.badges.includes('cerca'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 250);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o menor dia conta o piso de treinos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoMenor(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há menor dia de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.menor, 0);
    const vazio = textoDoMenor({}, '2026-11-04');
    assert.equal(vazio.texto, 'O menor dia ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.menor, 0);
    const soSegundos = textoDoMenor({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.menor, 0);
    assert.equal(soSegundos.texto, 'O menor dia ficou abaixo de 1 treino.');
    const um = textoDoMenor({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.menor, 1);
    assert.equal(um.texto, 'O menor dia teve 1 treino.');
    const cinco = textoDoMenor({ '2026-10-28': { n: 5, segundos: 60 } }, '2026-11-04');
    assert.equal(cinco.dias, 1);
    assert.equal(cinco.menor, 5);
    assert.equal(cinco.texto, 'O menor dia teve 5 treinos.');
    const misto = textoDoMenor({
      '2026-10-28': { n: 4, segundos: 60 },
      '2026-11-02': { n: 1, segundos: 40 }
    }, '2026-11-04');
    assert.equal(misto.dias, 2);
    assert.equal(misto.menor, 1);
    assert.equal(misto.texto, 'O menor dia teve 1 treino.');
    const comZero = textoDoMenor({
      '2026-10-28': { n: 3, segundos: 60 },
      '2026-11-02': { n: 0, segundos: 40 }
    }, '2026-11-04');
    assert.equal(comZero.dias, 2);
    assert.equal(comZero.menor, 0);
    assert.equal(comZero.texto, 'O menor dia ficou abaixo de 1 treino.');
    const menor = textoDoMenor({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(menor.dias, 5);
    assert.equal(menor.menor, 1);
    assert.equal(menor.texto, 'O menor dia teve 1 treino.');
    const futuro = textoDoMenor({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.menor, 2);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoMenor({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.menor, 0);
  });

  test('a versão 2.71 deixa a piscina fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.71'/);
    assert.match(data, /versao: '2\.70'/);
    assert.match(sw, /gringolingo-v98/);
    assert.match(sw, /\.\/js\/piscina\.js/);
    assert.match(turno, /piscina\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPiscina', 'pintarBalde', 'pintarCerca']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaPulsos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaPiscinas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /piscina: telaPiscinas/);
    assert.match(mapa, /balde: telaBaldes/);
    assert.match(mapa, /cerca: telaCercas/);
    const menor = app.slice(app.indexOf('function cartaoMenor'), app.indexOf('function blocoFluencia'));
    assert.match(menor, /fala-menor/);
    assert.match(menor, /VER A SEMANA/);
    assert.equal(menor.includes('function cartaoMaior'), false);
    assert.equal(menor.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-menor {'), css.indexOf('.fala-menor {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.nivel-atalho {'), css.indexOf('.nivel-atalho {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /class: 'card revisao nivel-atalho', type: 'button', onclick: telaNivel/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirPronuncia\(s\.id\)/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirOuvido\(\[c\.id\]\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoMenor\(/g) || []).length, 1);
  });
});
