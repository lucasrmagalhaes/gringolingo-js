import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  DISJUNTORES, avaliarDisjuntor, ALUGUEIS, avaliarAluguel, PULSOS, avaliarPulso
} = await import('../js/disjuntor.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoMaior } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarDisjuntor, registrarAluguel, registrarPulso
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'disjuntor.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The call stopped after three seconds.',
  'The next page lost its place.',
  'The queue passed one thousand messages.',
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

describe('disjuntor, aluguel e pulso', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/disjuntor.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(DISJUNTORES, ['Abre', 'Fecha'], avaliarDisjuntor);
    conferir(ALUGUEIS, ['Vence', 'Renova'], avaliarAluguel);
    conferir(PULSOS, ['Perde', 'Retoma'], avaliarPulso);
    const ids = [...DISJUNTORES, ...ALUGUEIS, ...PULSOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const disjuntor = DISJUNTORES.find(c => c.id === 'disjuntor5').rodadas[0];
    assert.equal(avaliarDisjuntor(disjuntor, 'The breaker opened after 5 failures.').ok, true);
    const aluguel = ALUGUEIS.find(c => c.id === 'aluguel30').rodadas[0];
    assert.equal(avaliarAluguel(aluguel, 'The lease expired after 30 seconds.').ok, true);
    const pulso = PULSOS.find(c => c.id === 'pulso3').rodadas[0];
    assert.equal(avaliarPulso(pulso, 'The node missed 3 heartbeats.').ok, true);
    const texto = JSON.stringify({ DISJUNTORES, ALUGUEIS, PULSOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Disjuntor' && f.melhor === 'The circuit opened after five failures.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Aluguel' && f.melhor === 'The lease expired after thirty seconds.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Pulso' && f.melhor === 'The node missed three heartbeats.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['disjuntor', 'aluguel', 'pulso']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('disjuntor, aluguel e pulso contam no próprio contador', () => {
    travarMissao('disjuntor1');
    const disjuntor = registrarDisjuntor(fim());
    assert.equal(disjuntor.bonusMissoes, 15);
    assert.equal(estado.stats.disjuntores, 1);
    assert.equal(estado.stats.filas, 0);
    assert.equal(estado.stats.alugueis, 0);
    assert.ok(estado.badges.includes('disjuntor'));
    for (const id of ['fila', 'pulso', 'espera', 'aluguel']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('aluguel1');
    const aluguel = registrarAluguel(fim());
    assert.equal(aluguel.bonusMissoes, 15);
    assert.equal(estado.stats.alugueis, 1);
    assert.equal(estado.stats.disjuntores, 1);
    assert.ok(estado.badges.includes('aluguel'));

    travarMissao('pulso1');
    const pulso = registrarPulso(fim());
    assert.equal(pulso.bonusMissoes, 15);
    assert.equal(estado.stats.pulsos, 1);
    assert.equal(estado.stats.esperas, 0);
    assert.ok(estado.badges.includes('pulso'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 247);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o maior dia conta o pico de treinos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoMaior(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há maior dia de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.maior, 0);
    const vazio = textoDoMaior({}, '2026-11-04');
    assert.equal(vazio.texto, 'O maior dia ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.maior, 0);
    const soSegundos = textoDoMaior({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.passo, undefined);
    assert.equal(soSegundos.maior, 0);
    assert.equal(soSegundos.texto, 'O maior dia ficou abaixo de 1 treino.');
    const um = textoDoMaior({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.maior, 1);
    assert.equal(um.texto, 'O maior dia teve 1 treino.');
    const cinco = textoDoMaior({ '2026-10-28': { n: 5, segundos: 60 } }, '2026-11-04');
    assert.equal(cinco.dias, 1);
    assert.equal(cinco.maior, 5);
    assert.equal(cinco.texto, 'O maior dia teve 5 treinos.');
    const maior = textoDoMaior({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(maior.dias, 5);
    assert.equal(maior.maior, 1);
    assert.equal(maior.texto, 'O maior dia teve 1 treino.');
    const futuro = textoDoMaior({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.maior, 2);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoMaior({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.maior, 0);
  });

  test('a versão 2.70 deixa o disjuntor fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.70'/);
    assert.match(data, /versao: '2\.69'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/disjuntor\.js/);
    assert.match(turno, /disjuntor\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarDisjuntor', 'pintarAluguel', 'pintarPulso']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaFilas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaDisjuntores'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /disjuntor: telaDisjuntores/);
    assert.match(mapa, /aluguel: telaAlugueis/);
    assert.match(mapa, /pulso: telaPulsos/);
    const maior = app.slice(app.indexOf('function cartaoMaior'), app.indexOf('function blocoFluencia'));
    assert.match(maior, /fala-maior/);
    assert.match(maior, /VER A SEMANA/);
    assert.equal(maior.includes('function cartaoPasso'), false);
    assert.equal(maior.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-maior {'), css.indexOf('.fala-maior {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.tropeco-btn {'), css.indexOf('.tropeco-btn {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button', onclick: abrirFala/);
    assert.match(app, /type: 'button', onclick: telaPerguntaDia/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirRapido\(\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoMaior\(/g) || []).length, 1);
  });
});
