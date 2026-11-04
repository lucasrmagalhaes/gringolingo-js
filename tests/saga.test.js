import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SAGAS, avaliarSaga, CAIXAS, avaliarCaixa, APAGADOS, avaliarApagado
} = await import('../js/saga.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoSaldo } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSaga, registrarCaixa, registrarApagado
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'saga.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'We replayed the last two days.',
  'The same event arrived twice.',
  'One event woke four workers.',
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

describe('saga, caixa e apagado', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/saga.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SAGAS, ['Para', 'Volta'], avaliarSaga);
    conferir(CAIXAS, ['Espera', 'Solta'], avaliarCaixa);
    conferir(APAGADOS, ['Apaga', 'Some'], avaliarApagado);
    const ids = [...SAGAS, ...CAIXAS, ...APAGADOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const saga = SAGAS.find(c => c.id === 'saga3').rodadas[0];
    assert.equal(avaliarSaga(saga, 'The wait stopped at step 3.').ok, true);
    const caixa = CAIXAS.find(c => c.id === 'minuto2').rodadas[0];
    assert.equal(avaliarCaixa(caixa, 'The event stayed for 2 minutes.').ok, true);
    const apagado = APAGADOS.find(c => c.id === 'ainda1').rodadas[0];
    assert.equal(avaliarApagado(apagado, 'The hidden row is still row 1.').ok, true);
    const texto = JSON.stringify({ SAGAS, CAIXAS, APAGADOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Saga' && f.melhor === 'The third step never finished.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Caixa' && f.melhor === 'The event stayed in the outbox.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Apagado' && f.melhor === 'The row stayed in the table.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['saga', 'caixa', 'apagado']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('saga, caixa e apagado contam no próprio contador', () => {
    travarMissao('saga1');
    const saga = registrarSaga(fim());
    assert.equal(saga.bonusMissoes, 15);
    assert.equal(estado.stats.sagas, 1);
    assert.equal(estado.stats.leques, 0);
    assert.equal(estado.stats.caixas, 0);
    assert.ok(estado.badges.includes('saga'));
    for (const id of ['caixa', 'apagado', 'leque', 'replay']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('caixa1');
    const caixa = registrarCaixa(fim());
    assert.equal(caixa.bonusMissoes, 15);
    assert.equal(estado.stats.caixas, 1);
    assert.equal(estado.stats.sagas, 1);
    assert.ok(estado.badges.includes('caixa'));

    travarMissao('apagado1');
    const apagado = registrarApagado(fim());
    assert.equal(apagado.bonusMissoes, 15);
    assert.equal(estado.stats.apagados, 1);
    assert.equal(estado.stats.replays, 0);
    assert.ok(estado.badges.includes('apagado'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 241);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o saldo conta os treinos de antes desta semana', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoSaldo(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há saldo de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.saldo, 0);
    const vazio = textoDoSaldo({}, '2026-11-04');
    assert.equal(vazio.texto, 'O saldo de antes desta semana ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.saldo, 0);
    const soSemana = textoDoSaldo({ '2026-11-04': { n: 2, segundos: 90 } }, '2026-11-04');
    assert.equal(soSemana.dias, 1);
    assert.equal(soSemana.saldo, 0);
    assert.equal(soSemana.texto, 'Nada ficou antes desta semana.');
    const soSegundos = textoDoSaldo({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.saldo, 0);
    assert.equal(soSegundos.texto, 'Nada ficou antes desta semana.');
    const um = textoDoSaldo({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.saldo, 1);
    assert.equal(um.texto, 'Antes desta semana há 1 treino.');
    const saldo = textoDoSaldo({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(saldo.dias, 5);
    assert.equal(saldo.saldo, 3);
    assert.equal(saldo.texto, 'Antes desta semana há 3 treinos.');
    const futuro = textoDoSaldo({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.saldo, 2);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoSaldo({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.saldo, 0);
  });

  test('a versão 2.68 deixa a saga fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.68'/);
    assert.match(data, /versao: '2\.67'/);
    assert.match(sw, /gringolingo-v95/);
    assert.match(sw, /\.\/js\/saga\.js/);
    assert.match(turno, /saga\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSaga', 'pintarCaixa', 'pintarApagado']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaLeques'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSagas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /saga: telaSagas/);
    assert.match(mapa, /caixa: telaCaixas/);
    assert.match(mapa, /apagado: telaApagados/);
    const saldo = app.slice(app.indexOf('function cartaoSaldo'), app.indexOf('function blocoFluencia'));
    assert.match(saldo, /fala-saldo/);
    assert.match(saldo, /VER A SEMANA/);
    assert.equal(saldo.includes('function cartaoLote'), false);
    assert.equal(saldo.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-saldo {'), css.indexOf('.fala-saldo {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.dicionario-atalho {'), css.indexOf('.dicionario-atalho {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirNumero\(\)/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirClaro\(\)/);
    assert.match(app, /type: 'button', onclick: abrirPasseio \}/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoSaldo\(/g) || []).length, 1);
  });
});
