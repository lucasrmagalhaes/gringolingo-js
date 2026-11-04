import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  AMOSTRAS, avaliarAmostra, NICHOS, avaliarNicho, LACRES, avaliarLacre
} = await import('../js/amostra.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaVariedade } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarAmostra, registrarNicho, registrarLacre
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'amostra.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The failure stayed inside its own compartment.',
  'The service shed the request that did not fit.',
  'The call stopped when the remaining time hit zero.',
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

describe('amostra, nicho e lacre', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/amostra.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(AMOSTRAS, ['Guarda', 'Solta'], avaliarAmostra);
    conferir(NICHOS, ['Cai', 'Quieto'], avaliarNicho);
    conferir(LACRES, ['Muda', 'Sai'], avaliarLacre);
    const ids = [...AMOSTRAS, ...NICHOS, ...LACRES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const amostra = AMOSTRAS.find(c => c.id === 'amostra10').rodadas[0];
    assert.equal(avaliarAmostra(amostra, 'The sample kept 10 lines.').ok, true);
    const nicho = NICHOS.find(c => c.id === 'nicho3').rodadas[0];
    assert.equal(avaliarNicho(nicho, 'The key landed in niche 3.').ok, true);
    const lacre = LACRES.find(c => c.id === 'lacre2').rodadas[0];
    assert.equal(avaliarLacre(lacre, 'The seal changed on 2 packages.').ok, true);
    const texto = JSON.stringify({ AMOSTRAS, NICHOS, LACRES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Amostra' && f.melhor === 'We kept one line out of every ten.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Nicho' && f.melhor === 'The key landed in its niche.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Lacre' && f.melhor === 'The seal on the package changed.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['amostra', 'nicho', 'lacre']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('amostra, nicho e lacre contam no próprio contador', () => {
    travarMissao('amostra1');
    const amostra = registrarAmostra(fim());
    assert.equal(amostra.bonusMissoes, 15);
    assert.equal(estado.stats.amostras, 1);
    assert.equal(estado.stats.cronometros, 0);
    assert.equal(estado.stats.nichos, 0);
    assert.ok(estado.badges.includes('amostra'));
    for (const id of ['cronometro', 'lacre', 'anteparo', 'descarte']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('nicho1');
    const nicho = registrarNicho(fim());
    assert.equal(nicho.bonusMissoes, 15);
    assert.equal(estado.stats.nichos, 1);
    assert.equal(estado.stats.amostras, 1);
    assert.ok(estado.badges.includes('nicho'));

    travarMissao('lacre1');
    const lacre = registrarLacre(fim());
    assert.equal(lacre.bonusMissoes, 15);
    assert.equal(estado.stats.lacres, 1);
    assert.equal(estado.stats.anteparos, 0);
    assert.ok(estado.badges.includes('lacre'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 259);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a variedade conta os valores diferentes de treino', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaVariedade(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há variedade de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.variedade, 0);
    const vazio = textoDaVariedade({}, '2026-11-04');
    assert.equal(vazio.texto, 'A variedade dos dias ainda é 0 valores.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.variedade, 0);
    const soSegundos = textoDaVariedade({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.variedade, 1);
    assert.equal(soSegundos.texto, 'A variedade dos dias é de 1 valor.');
    const um = textoDaVariedade({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.variedade, 1);
    assert.equal(um.texto, 'A variedade dos dias é de 1 valor.');
    const cinco = textoDaVariedade({ '2026-10-28': { n: 5, segundos: 60 } }, '2026-11-04');
    assert.equal(cinco.dias, 1);
    assert.equal(cinco.variedade, 1);
    assert.equal(cinco.texto, 'A variedade dos dias é de 1 valor.');
    const par = textoDaVariedade({
      '2026-10-28': { n: 1, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.variedade, 2);
    assert.equal(par.texto, 'A variedade dos dias é de 2 valores.');
    const quatro = textoDaVariedade({
      '2026-10-28': { n: 5, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(quatro.dias, 2);
    assert.equal(quatro.variedade, 2);
    assert.equal(quatro.texto, 'A variedade dos dias é de 2 valores.');
    const comZero = textoDaVariedade({
      '2026-10-28': { n: 3, segundos: 60 },
      '2026-11-02': { n: 0, segundos: 40 }
    }, '2026-11-04');
    assert.equal(comZero.dias, 2);
    assert.equal(comZero.variedade, 2);
    assert.equal(comZero.texto, 'A variedade dos dias é de 2 valores.');
    const igual = textoDaVariedade({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.variedade, 1);
    assert.equal(igual.texto, 'A variedade dos dias é de 1 valor.');
    const futuro = textoDaVariedade({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.variedade, 1);
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.texto, 'A variedade dos dias é de 1 valor.');
    const zerado = textoDaVariedade({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.variedade, 0);
  });

  test('a versão 2.74 deixa a amostra fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.74'/);
    assert.match(data, /versao: '2\.73'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/amostra\.js/);
    assert.match(turno, /amostra\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarAmostra', 'pintarNicho', 'pintarLacre']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCronometros'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaAmostras'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /amostra: telaAmostras/);
    assert.match(mapa, /nicho: telaNichos/);
    assert.match(mapa, /lacre: telaLacres/);
    const variedade = app.slice(app.indexOf('function cartaoVariedade'), app.indexOf('function blocoFluencia'));
    assert.match(variedade, /fala-variedade/);
    assert.match(variedade, /VER A SEMANA/);
    assert.equal(variedade.includes('function cartaoMeio'), false);
    assert.equal(variedade.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-variedade {'), css.indexOf('.fala-variedade {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.fala-atalho {'), css.indexOf('.fala-atalho {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-verde', type: 'button' \}, 'ENTRAR'/);
    assert.match(app, /class: 'btn btn-azul', type: 'button' \}, 'CRIAR CONTA'/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(nivelSessao\.i \+ 1 >= ITENS_NIVEL\.length\) concluirNivel\(\);/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoVariedade\(/g) || []).length, 1);
  });
});
