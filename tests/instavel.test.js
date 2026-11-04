import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  INSTAVEIS, avaliarInstavel, DUPLICADOS, avaliarDuplicado, APAGOES, avaliarApagao
} = await import('../js/instavel.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoTotal } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarInstavel, registrarDuplicado, registrarApagao
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'instavel.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The child row pointed at a missing parent.',
  'The second site never confirmed.',
  'Three days of errors spent the whole month.',
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

describe('instável, duplicado e apagão', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/instavel.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(INSTAVEIS, ['Falha', 'Passa'], avaliarInstavel);
    conferir(DUPLICADOS, ['Grava', 'Recusa'], avaliarDuplicado);
    conferir(APAGOES, ['Desliga', 'Mede'], avaliarApagao);
    const ids = [...INSTAVEIS, ...DUPLICADOS, ...APAGOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const tentativa = INSTAVEIS.find(c => c.id === 'passou2').rodadas[0];
    assert.equal(avaliarInstavel(tentativa, 'The test passed on try 2.').ok, true);
    const linha = DUPLICADOS.find(c => c.id === 'linhadois').rodadas[0];
    assert.equal(avaliarDuplicado(linha, 'Row 2 used the same email.').ok, true);
    const maquina = APAGOES.find(c => c.id === 'desliga1').rodadas[0];
    assert.equal(avaliarApagao(maquina, 'We turned off machine 1.').ok, true);
    const texto = JSON.stringify({ INSTAVEIS, DUPLICADOS, APAGOES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Instável' && f.melhor === 'The test passed on the second try.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Duplicado' && f.melhor === 'The email was already in the table.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Apagão' && f.melhor === 'We turned one machine off on purpose.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['instavel', 'duplicado', 'apagao']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('instável, duplicado e apagão contam no próprio contador', () => {
    travarMissao('instavel1');
    const instavel = registrarInstavel(fim());
    assert.equal(instavel.bonusMissoes, 15);
    assert.equal(estado.stats.instaveis, 1);
    assert.equal(estado.stats.gastos, 0);
    assert.equal(estado.stats.duplicados, 0);
    assert.ok(estado.badges.includes('instavel'));
    for (const id of ['duplicado', 'apagao', 'gasto', 'orfao']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('duplicado1');
    const duplicado = registrarDuplicado(fim());
    assert.equal(duplicado.bonusMissoes, 15);
    assert.equal(estado.stats.duplicados, 1);
    assert.equal(estado.stats.instaveis, 1);
    assert.ok(estado.badges.includes('duplicado'));

    travarMissao('apagao1');
    const apagao = registrarApagao(fim());
    assert.equal(apagao.bonusMissoes, 15);
    assert.equal(estado.stats.apagoes, 1);
    assert.equal(estado.stats.orfaos, 0);
    assert.ok(estado.badges.includes('apagao'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 235);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o total soma os treinos já registrados', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoTotal(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há total de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.total, 0);
    const vazio = textoDoTotal({}, '2026-11-04');
    assert.equal(vazio.texto, 'O total de treinos ainda é 0.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.total, 0);
    const soSegundos = textoDoTotal({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.total, 0);
    assert.equal(soSegundos.texto, 'O total de treinos ainda é 0.');
    const um = textoDoTotal({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.total, 1);
    assert.equal(um.texto, 'O total de treinos é 1.');
    const total = textoDoTotal({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(total.dias, 5);
    assert.equal(total.total, 5);
    assert.equal(total.texto, 'O total de treinos é 5.');
    const futuro = textoDoTotal({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.total, 2);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoTotal({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.total, 0);
  });

  test('a versão 2.66 deixa o instável fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.66'/);
    assert.match(data, /versao: '2\.65'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/instavel\.js/);
    assert.match(turno, /instavel\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarInstavel', 'pintarDuplicado', 'pintarApagao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaGastos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaInstaveis'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /instavel: telaInstaveis/);
    assert.match(mapa, /duplicado: telaDuplicados/);
    assert.match(mapa, /apagao: telaApagoes/);
    const total = app.slice(app.indexOf('function cartaoTotal'), app.indexOf('function blocoFluencia'));
    assert.match(total, /fala-total/);
    assert.match(total, /VER A SEMANA/);
    assert.equal(total.includes('function cartaoFora'), false);
    assert.equal(total.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-total {'), css.indexOf('.fala-total {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const fechar = css.slice(css.indexOf('.banner-fechar {'), css.indexOf('.banner-fechar {') + 80);
    assert.match(fechar, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-verde', type: 'button', onclick: abrirNivel \}/);
    assert.match(app, /class: 'btn btn-verde', type: 'button', onclick: abrirDeslizes \}/);
    assert.match(app, /class: 'btn btn-verde', type: 'button', onclick: abrirRemoto \}/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoTotal\(/g) || []).length, 1);
  });
});
