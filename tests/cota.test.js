import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  COTAS, avaliarCota, CICLOS, avaliarCiclo, ZUMBIS, avaliarZumbi
} = await import('../js/cota.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoHiato } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCota, registrarCiclo, registrarZumbi
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'cota.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The memory keeps growing.',
  'The function woke from a cold start.',
  'The process cannot read that file.',
  'The disk ran out of file names.',
  'The service got the stop signal.',
  'The cache expired all at once.'
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

describe('cota, ciclo e zumbi', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/cota.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(COTAS, ['Fecha', 'Abre'], avaliarCota);
    conferir(CICLOS, ['Cai', 'Fica'], avaliarCiclo);
    conferir(ZUMBIS, ['Termina', 'Espera'], avaliarZumbi);
    const ids = [...COTAS, ...CICLOS, ...ZUMBIS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const giga = COTAS.find(c => c.id === 'cincogiga').rodadas[0];
    assert.equal(avaliarCota(giga, 'The quota is 5 gigabytes.').ok, true);
    const volta = CICLOS.find(c => c.id === 'ciclocinco').rodadas[0];
    assert.equal(avaliarCiclo(volta, 'The process restarted 5 times.').ok, true);
    const quatro = ZUMBIS.find(c => c.id === 'quatrozumbi').rodadas[0];
    assert.equal(avaliarZumbi(quatro, '4 zombie processes remain.').ok, true);
    const texto = JSON.stringify({ COTAS, CICLOS, ZUMBIS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Cota' && f.melhor === 'The user passed the disk quota.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Ciclo' && f.melhor === 'The process keeps restarting.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Zumbi' && f.melhor === 'The child exited and the parent never waited.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['cota', 'ciclo', 'zumbi']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('cota, ciclo e zumbi contam no próprio contador', () => {
    travarMissao('cota1');
    const cota = registrarCota(fim());
    assert.equal(cota.bonusMissoes, 15);
    assert.equal(estado.stats.cotas, 1);
    assert.equal(estado.stats.cadeados, 0);
    assert.equal(estado.stats.ciclos, 0);
    assert.ok(estado.badges.includes('cota'));
    for (const id of ['ciclo', 'zumbi', 'cadeado', 'gotejo']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('ciclo1');
    const ciclo = registrarCiclo(fim());
    assert.equal(ciclo.bonusMissoes, 15);
    assert.equal(estado.stats.ciclos, 1);
    assert.equal(estado.stats.cotas, 1);
    assert.ok(estado.badges.includes('ciclo'));

    travarMissao('zumbi1');
    const zumbi = registrarZumbi(fim());
    assert.equal(zumbi.bonusMissoes, 15);
    assert.equal(estado.stats.zumbis, 1);
    assert.equal(estado.stats.gotejos, 0);
    assert.ok(estado.badges.includes('zumbi'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 208);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o hiato mede o maior vão entre dias com fala', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDoHiato(null, '2026-10-28');
    assert.equal(vazia.texto, 'Ainda não há hiato entre falas.');
    assert.equal(vazia.dias, null);
    const invalida = textoDoHiato({ '2026-10-28': { n: 1 } }, 'ontem');
    assert.equal(invalida.dias, null);
    const um = textoDoHiato({ '2026-10-28': { n: 1, segundos: 20 } }, '2026-10-28');
    assert.equal(um.dias, null);
    const junto = textoDoHiato({
      '2026-10-27': { n: 1, segundos: 10 },
      '2026-10-28': { segundos: 12, n: 0 }
    }, '2026-10-28');
    assert.equal(junto.dias, 0);
    assert.equal(junto.texto, 'As falas seguem sem dia no meio.');
    const umDia = textoDoHiato({
      '2026-10-26': { n: 1 },
      '2026-10-28': { n: 1 }
    }, '2026-10-28');
    assert.equal(umDia.dias, 1);
    assert.equal(umDia.texto, 'O maior hiato foi de 1 dia.');
    const maior = textoDoHiato({
      '2026-10-20': { n: 1, segundos: 10 },
      '2026-10-22': { n: 1, segundos: 10 },
      '2026-10-28': { n: 1, segundos: 10 },
      '2026-10-29': { n: 4, segundos: 40 },
      'ruim': { n: 9 }
    }, '2026-10-28');
    assert.equal(maior.dias, 5);
    assert.equal(maior.texto, 'O maior hiato foi de 5 dias.');
    const zerado = textoDoHiato({
      '2026-10-20': { n: 0, segundos: 0 },
      '2026-10-28': { n: 1 }
    }, '2026-10-28');
    assert.equal(zerado.dias, null);
  });

  test('a versão 2.57 deixa a cota fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.57'/);
    assert.match(data, /versao: '2\.56'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/cota\.js/);
    assert.match(turno, /cota\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCota', 'pintarCiclo', 'pintarZumbi']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCadeados'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCotas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /cota: telaCotas/);
    assert.match(mapa, /ciclo: telaCiclos/);
    assert.match(mapa, /zumbi: telaZumbis/);
    const hiato = app.slice(app.indexOf('function cartaoHiato'), app.indexOf('function blocoFluencia'));
    assert.match(hiato, /fala-hiato/);
    assert.match(hiato, /VER A SEMANA/);
    assert.equal(hiato.includes('function cartaoPrimeira'), false);
    assert.equal(hiato.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-hiato {'), css.indexOf('.fala-hiato {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const instalar = css.slice(css.indexOf('.instalar-botoes > .btn'), css.indexOf('.instalar-botoes > .btn') + 120);
    assert.match(instalar, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-verde',\n          type: 'button'/);
    assert.match(app, /class: 'card revisao' \+ \(vencidas \? ' revisao-vencida' : ''\), type: 'button'/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoHiato\(/g) || []).length, 1);
  });
});
