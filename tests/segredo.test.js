import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SEGREDOS, avaliarSegredo, FANTASMAS, avaliarFantasma, INTEIROS, avaliarInteiro
} = await import('../js/segredo.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoPorDia } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSegredo, registrarFantasma, registrarInteiro
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'segredo.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'Two requests wrote the same balance.',
  'The query read every row.',
  'Ninety nine percent of the calls fit.',
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

describe('segredo, fantasma e inteiro', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/segredo.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SEGREDOS, ['Vaza', 'Apaga'], avaliarSegredo);
    conferir(FANTASMAS, ['Lê', 'Isola'], avaliarFantasma);
    conferir(INTEIROS, ['Estoura', 'Limita'], avaliarInteiro);
    const ids = [...SEGREDOS, ...FANTASMAS, ...INTEIROS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const chave = SEGREDOS.find(c => c.id === 'doischave').rodadas[0];
    assert.equal(avaliarSegredo(chave, 'The log kept the key for 2 days.').ok, true);
    const leitura = FANTASMAS.find(c => c.id === 'leituradois').rodadas[0];
    assert.equal(avaliarFantasma(leitura, 'The phantom showed up on read 2.').ok, true);
    const mil = INTEIROS.find(c => c.id === 'milinteiro').rodadas[0];
    assert.equal(avaliarInteiro(mil, 'The counter passed 1000.').ok, true);
    const texto = JSON.stringify({ SEGREDOS, FANTASMAS, INTEIROS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Segredo' && f.melhor === 'The secret key showed up in the log.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Fantasma' && f.melhor === 'The second read saw a new row.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Inteiro' && f.melhor === 'The counter wrapped back to zero.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['segredo', 'fantasma', 'inteiro']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('segredo, fantasma e inteiro contam no próprio contador', () => {
    travarMissao('segredo1');
    const segredo = registrarSegredo(fim());
    assert.equal(segredo.bonusMissoes, 15);
    assert.equal(estado.stats.segredos, 1);
    assert.equal(estado.stats.percentis, 0);
    assert.equal(estado.stats.fantasmas, 0);
    assert.ok(estado.badges.includes('segredo'));
    for (const id of ['fantasma', 'inteiro', 'percentil', 'corrida']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('fantasma1');
    const fantasma = registrarFantasma(fim());
    assert.equal(fantasma.bonusMissoes, 15);
    assert.equal(estado.stats.fantasmas, 1);
    assert.equal(estado.stats.segredos, 1);
    assert.ok(estado.badges.includes('fantasma'));

    travarMissao('inteiro1');
    const inteiro = registrarInteiro(fim());
    assert.equal(inteiro.bonusMissoes, 15);
    assert.equal(estado.stats.inteiros, 1);
    assert.equal(estado.stats.indices, 0);
    assert.ok(estado.badges.includes('inteiro'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 226);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a média por dia divide os minutos pelos dias com fala', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDoPorDia(null, '2026-11-04');
    assert.equal(vazia.texto, 'A média por dia ainda é 0 minutos.');
    assert.equal(vazia.dias, 0);
    assert.equal(vazia.minutos, 0);
    const invalida = textoDoPorDia({ '2026-11-04': { n: 1, segundos: 60 } }, 'ontem');
    assert.equal(invalida.dias, null);
    assert.equal(invalida.texto, 'Ainda não há média por dia.');
    const curto = textoDoPorDia({ '2026-11-04': { n: 1, segundos: 20 } }, '2026-11-04');
    assert.equal(curto.dias, 1);
    assert.equal(curto.minutos, 0);
    assert.equal(curto.texto, 'A média por dia é de menos de 1 minuto.');
    const um = textoDoPorDia({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(um.minutos, 1);
    assert.equal(um.texto, 'A média por dia é de 1 minuto.');
    const media = textoDoPorDia({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(media.dias, 5);
    assert.equal(media.minutos, 2);
    assert.equal(media.texto, 'A média por dia é de 2 minutos.');
    const futuro = textoDoPorDia({
      '2026-11-04': { n: 1, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.minutos, 1);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoPorDia({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
  });

  test('a versão 2.63 deixa o segredo fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.63'/);
    assert.match(data, /versao: '2\.62'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/segredo\.js/);
    assert.match(turno, /segredo\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSegredo', 'pintarFantasma', 'pintarInteiro']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaPercentis'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSegredos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /segredo: telaSegredos/);
    assert.match(mapa, /fantasma: telaFantasmas/);
    assert.match(mapa, /inteiro: telaInteiros/);
    const media = app.slice(app.indexOf('function cartaoPorDia'), app.indexOf('function blocoFluencia'));
    assert.match(media, /fala-pordia/);
    assert.match(media, /VER A SEMANA/);
    assert.equal(media.includes('function cartaoSoma'), false);
    assert.equal(media.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-pordia {'), css.indexOf('.fala-pordia {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const som = css.slice(css.indexOf('.btn-som {'), css.indexOf('.btn-som {') + 80);
    assert.match(som, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        if \(pronunciaSessao\.i \+ 1 >= pronunciaSessao\.fila\.length\) concluirPronuncia\(\)/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        ouvidoSessao\.ouviu = true;/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        if \(ouvidoSessao\.i \+ 1 >= ouvidoSessao\.fila\.length\) concluirOuvido\(\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoPorDia\(/g) || []).length, 1);
  });
});
