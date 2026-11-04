import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ESPERAS, avaliarEspera, CURSORES, avaliarCursor, FILAS, avaliarFila
} = await import('../js/espera.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoPasso } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarEspera, registrarCursor, registrarFila
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'espera.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The third step never finished.',
  'The event stayed in the outbox.',
  'The row stayed in the table.',
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

describe('espera, cursor e fila', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/espera.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(ESPERAS, ['Para', 'Corta'], avaliarEspera);
    conferir(CURSORES, ['Lê', 'Marca'], avaliarCursor);
    conferir(FILAS, ['Enche', 'Esvazia'], avaliarFila);
    const ids = [...ESPERAS, ...CURSORES, ...FILAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const espera = ESPERAS.find(c => c.id === 'espera3').rodadas[0];
    assert.equal(avaliarEspera(espera, 'The timeout fired after 3 seconds.').ok, true);
    const cursor = CURSORES.find(c => c.id === 'cursor2').rodadas[0];
    assert.equal(avaliarCursor(cursor, 'The page stopped at row 2.').ok, true);
    const fila = FILAS.find(c => c.id === 'fila1000').rodadas[0];
    assert.equal(avaliarFila(fila, 'The queue held 1000 messages.').ok, true);
    const texto = JSON.stringify({ ESPERAS, CURSORES, FILAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Espera' && f.melhor === 'The call stopped after three seconds.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cursor' && f.melhor === 'The next page lost its place.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Fila' && f.melhor === 'The queue passed one thousand messages.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['espera', 'cursor', 'fila']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('espera, cursor e fila contam no próprio contador', () => {
    travarMissao('espera1');
    const espera = registrarEspera(fim());
    assert.equal(espera.bonusMissoes, 15);
    assert.equal(estado.stats.esperas, 1);
    assert.equal(estado.stats.apagados, 0);
    assert.equal(estado.stats.cursores, 0);
    assert.ok(estado.badges.includes('espera'));
    for (const id of ['caixa', 'apagado', 'fila', 'saga']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('cursor1');
    const cursor = registrarCursor(fim());
    assert.equal(cursor.bonusMissoes, 15);
    assert.equal(estado.stats.cursores, 1);
    assert.equal(estado.stats.esperas, 1);
    assert.ok(estado.badges.includes('cursor'));

    travarMissao('fila1');
    const fila = registrarFila(fim());
    assert.equal(fila.bonusMissoes, 15);
    assert.equal(estado.stats.filas, 1);
    assert.equal(estado.stats.sagas, 0);
    assert.ok(estado.badges.includes('fila'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 244);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o passo conta a média de treinos por dia de fala', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoPasso(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há passo de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.passo, 0);
    const vazio = textoDoPasso({}, '2026-11-04');
    assert.equal(vazio.texto, 'O passo por dia ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.passo, 0);
    const soSegundos = textoDoPasso({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.passo, 0);
    assert.equal(soSegundos.texto, 'O passo por dia é de menos de 1 treino.');
    const um = textoDoPasso({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.passo, 1);
    assert.equal(um.texto, 'O passo por dia é de 1 treino.');
    const cinco = textoDoPasso({ '2026-10-28': { n: 5, segundos: 60 } }, '2026-11-04');
    assert.equal(cinco.dias, 1);
    assert.equal(cinco.passo, 5);
    assert.equal(cinco.texto, 'O passo por dia é de 5 treinos.');
    const passo = textoDoPasso({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(passo.dias, 5);
    assert.equal(passo.passo, 1);
    assert.equal(passo.texto, 'O passo por dia é de 1 treino.');
    const futuro = textoDoPasso({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.passo, 2);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoPasso({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.passo, 0);
  });

  test('a versão 2.69 deixa a espera fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.69'/);
    assert.match(data, /versao: '2\.68'/);
    assert.match(sw, /gringolingo-v96/);
    assert.match(sw, /\.\/js\/espera\.js/);
    assert.match(turno, /espera\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarEspera', 'pintarCursor', 'pintarFila']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaApagados'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaEsperas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /espera: telaEsperas/);
    assert.match(mapa, /cursor: telaCursores/);
    assert.match(mapa, /fila: telaFilas/);
    const passo = app.slice(app.indexOf('function cartaoPasso'), app.indexOf('function blocoFluencia'));
    assert.match(passo, /fala-passo/);
    assert.match(passo, /VER A SEMANA/);
    assert.equal(passo.includes('function cartaoSaldo'), false);
    assert.equal(passo.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-passo {'), css.indexOf('.fala-passo {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const acao = css.slice(css.indexOf('.meta-fala-acao {'), css.indexOf('.meta-fala-acao {') + 80);
    assert.match(acao, /min-height: 44px/);
    assert.match(app, /type: 'button', onclick: abrirDesafio/);
    assert.match(app, /type: 'button', onclick: abrirMistura/);
    assert.match(app, /type: 'button', onclick: \(\) => abrirEnfase\(\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoPasso\(/g) || []).length, 1);
  });
});
