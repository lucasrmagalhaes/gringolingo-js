import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  TREMORES, avaliarTremor, PORTARIAS, avaliarPortaria, COLAS, avaliarCola
} = await import('../js/tremor.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaDiferenca } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarTremor, registrarPortaria, registrarCola
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'tremor.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The pool ran out of free slots.',
  'The bucket ran out of tokens.',
  'A higher number blocked the old owner.',
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

describe('tremor, portaria e cola', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/tremor.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(TREMORES, ['Varia', 'Acerta'], avaliarTremor);
    conferir(PORTARIAS, ['Recusa', 'Abre'], avaliarPortaria);
    conferir(COLAS, ['Gruda', 'Segue'], avaliarCola);
    const ids = [...TREMORES, ...PORTARIAS, ...COLAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const tremor = TREMORES.find(c => c.id === 'tremor2').rodadas[0];
    assert.equal(avaliarTremor(tremor, 'The jitter added 2 extra seconds.').ok, true);
    const portaria = PORTARIAS.find(c => c.id === 'portaria3').rodadas[0];
    assert.equal(avaliarPortaria(portaria, 'The gate refused 3 extra calls.').ok, true);
    const cola = COLAS.find(c => c.id === 'cola2').rodadas[0];
    assert.equal(avaliarCola(cola, 'The client stayed on machine 2.').ok, true);
    const texto = JSON.stringify({ TREMORES, PORTARIAS, COLAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Tremor' && f.melhor === 'Each new try waited a different time.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Portaria' && f.melhor === 'The gate refused the extra call.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cola' && f.melhor === 'The client returned to the same machine.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['tremor', 'portaria', 'cola']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('tremor, portaria e cola contam no próprio contador', () => {
    travarMissao('tremor1');
    const tremor = registrarTremor(fim());
    assert.equal(tremor.bonusMissoes, 15);
    assert.equal(estado.stats.tremores, 1);
    assert.equal(estado.stats.cercas, 0);
    assert.equal(estado.stats.portarias, 0);
    assert.ok(estado.badges.includes('tremor'));
    for (const id of ['cerca', 'cola', 'piscina', 'balde']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('portaria1');
    const portaria = registrarPortaria(fim());
    assert.equal(portaria.bonusMissoes, 15);
    assert.equal(estado.stats.portarias, 1);
    assert.equal(estado.stats.tremores, 1);
    assert.ok(estado.badges.includes('portaria'));

    travarMissao('cola1');
    const cola = registrarCola(fim());
    assert.equal(cola.bonusMissoes, 15);
    assert.equal(estado.stats.colas, 1);
    assert.equal(estado.stats.piscinas, 0);
    assert.ok(estado.badges.includes('cola'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 253);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a diferença conta o vão entre o menor e o maior dia', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaDiferenca(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há diferença de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.diferenca, 0);
    const vazio = textoDaDiferenca({}, '2026-11-04');
    assert.equal(vazio.texto, 'A diferença entre os dias ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.diferenca, 0);
    const soSegundos = textoDaDiferenca({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.diferenca, 0);
    assert.equal(soSegundos.texto, 'Com um dia só, a diferença é 0 treinos.');
    const um = textoDaDiferenca({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.diferenca, 0);
    assert.equal(um.texto, 'Com um dia só, a diferença é 0 treinos.');
    const cinco = textoDaDiferenca({ '2026-10-28': { n: 5, segundos: 60 } }, '2026-11-04');
    assert.equal(cinco.dias, 1);
    assert.equal(cinco.diferenca, 0);
    assert.equal(cinco.texto, 'Com um dia só, a diferença é 0 treinos.');
    const espalhado = textoDaDiferenca({
      '2026-10-28': { n: 1, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(espalhado.dias, 2);
    assert.equal(espalhado.diferenca, 3);
    assert.equal(espalhado.texto, 'A diferença entre os dias é de 3 treinos.');
    const umTreino = textoDaDiferenca({
      '2026-10-28': { n: 5, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(umTreino.dias, 2);
    assert.equal(umTreino.diferenca, 1);
    assert.equal(umTreino.texto, 'A diferença entre os dias é de 1 treino.');
    const comZero = textoDaDiferenca({
      '2026-10-28': { n: 3, segundos: 60 },
      '2026-11-02': { n: 0, segundos: 40 }
    }, '2026-11-04');
    assert.equal(comZero.dias, 2);
    assert.equal(comZero.diferenca, 3);
    assert.equal(comZero.texto, 'A diferença entre os dias é de 3 treinos.');
    const igual = textoDaDiferenca({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.diferenca, 0);
    assert.equal(igual.texto, 'A diferença entre os dias é de 0 treinos.');
    const futuro = textoDaDiferenca({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.diferenca, 0);
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.texto, 'Com um dia só, a diferença é 0 treinos.');
    const zerado = textoDaDiferenca({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.diferenca, 0);
  });

  test('a versão 2.72 deixa o tremor fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.72'/);
    assert.match(data, /versao: '2\.71'/);
    assert.match(sw, /gringolingo-v99/);
    assert.match(sw, /\.\/js\/tremor\.js/);
    assert.match(turno, /tremor\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarTremor', 'pintarPortaria', 'pintarCola']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCercas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaTremores'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /tremor: telaTremores/);
    assert.match(mapa, /portaria: telaPortarias/);
    assert.match(mapa, /cola: telaColas/);
    const diferenca = app.slice(app.indexOf('function cartaoDiferenca'), app.indexOf('function blocoFluencia'));
    assert.match(diferenca, /fala-diferenca/);
    assert.match(diferenca, /VER A SEMANA/);
    assert.equal(diferenca.includes('function cartaoMenor'), false);
    assert.equal(diferenca.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-diferenca {'), css.indexOf('.fala-diferenca {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.pronuncia-atalho {'), css.indexOf('.pronuncia-atalho {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button', onclick: \(\) => telaCategoria\(c\.id\)/);
    assert.match(app, /type: 'button',\s*onclick: seguirFala/);
    assert.match(app, /class: 'card revisao', type: 'button', onclick: telaDeslizes/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoDiferenca\(/g) || []).length, 1);
  });
});
