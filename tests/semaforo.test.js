import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SEMAFOROS, avaliarSemaforo, BARREIRAS, avaliarBarreira, TRINCOS, avaliarTrinco
} = await import('../js/semaforo.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaModa } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSemaforo, registrarBarreira, registrarTrinco
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'semaforo.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'We kept one line out of every ten.',
  'The key landed in its niche.',
  'The seal on the package changed.',
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

describe('semáforo, barreira e trinco', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/semaforo.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SEMAFOROS, ['Entra', 'Solta'], avaliarSemaforo);
    conferir(BARREIRAS, ['Chega', 'Segue'], avaliarBarreira);
    conferir(TRINCOS, ['Desce', 'Abre'], avaliarTrinco);
    const ids = [...SEMAFOROS, ...BARREIRAS, ...TRINCOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const semaforo = SEMAFOROS.find(c => c.id === 'semaforo2').rodadas[0];
    assert.equal(avaliarSemaforo(semaforo, 'The semaphore held 2 permits.').ok, true);
    const barreira = BARREIRAS.find(c => c.id === 'barreira4').rodadas[0];
    assert.equal(avaliarBarreira(barreira, 'The barrier waited for 4 people.').ok, true);
    const trinco = TRINCOS.find(c => c.id === 'trinco0').rodadas[0];
    assert.equal(avaliarTrinco(trinco, 'The latch reached count 0.').ok, true);
    const texto = JSON.stringify({ SEMAFOROS, BARREIRAS, TRINCOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Semáforo' && f.melhor === 'Only two jobs can pass together.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Barreira' && f.melhor === 'All four people must arrive together.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Trinco' && f.melhor === 'The latch opens when the count hits zero.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['semaforo', 'barreira', 'trinco']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('semáforo, barreira e trinco contam no próprio contador', () => {
    travarMissao('semaforo1');
    const semaforo = registrarSemaforo(fim());
    assert.equal(semaforo.bonusMissoes, 15);
    assert.equal(estado.stats.semaforos, 1);
    assert.equal(estado.stats.lacres, 0);
    assert.equal(estado.stats.barreiras, 0);
    assert.equal(estado.stats.trincos, 0);
    assert.ok(estado.badges.includes('semaforo'));
    for (const id of ['lacre', 'trinco', 'amostra', 'nicho']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('barreira1');
    const barreira = registrarBarreira(fim());
    assert.equal(barreira.bonusMissoes, 15);
    assert.equal(estado.stats.barreiras, 1);
    assert.equal(estado.stats.semaforos, 1);
    assert.ok(estado.badges.includes('barreira'));

    travarMissao('trinco1');
    const trinco = registrarTrinco(fim());
    assert.equal(trinco.bonusMissoes, 15);
    assert.equal(estado.stats.trincos, 1);
    assert.equal(estado.stats.amostras, 0);
    assert.ok(estado.badges.includes('trinco'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 262);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a moda escolhe o valor de treino mais repetido', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaModa(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há moda de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.moda, 0);
    const vazio = textoDaModa({}, '2026-11-04');
    assert.equal(vazio.texto, 'A moda dos dias ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.moda, 0);
    const soSegundos = textoDaModa({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.moda, 0);
    assert.equal(soSegundos.texto, 'A moda dos dias ficou abaixo de 1 treino.');
    const um = textoDaModa({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.moda, 1);
    assert.equal(um.texto, 'A moda dos dias é de 1 treino.');
    const par = textoDaModa({
      '2026-10-28': { n: 1, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.moda, 1);
    assert.equal(par.texto, 'A moda dos dias é de 1 treino.');
    const quatro = textoDaModa({
      '2026-10-28': { n: 5, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(quatro.dias, 2);
    assert.equal(quatro.moda, 4);
    assert.equal(quatro.texto, 'A moda dos dias é de 4 treinos.');
    const repetido = textoDaModa({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-10-27': { n: 4, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 }
    }, '2026-11-04');
    assert.equal(repetido.dias, 3);
    assert.equal(repetido.moda, 4);
    assert.equal(repetido.texto, 'A moda dos dias é de 4 treinos.');
    const comZero = textoDaModa({
      '2026-10-28': { n: 3, segundos: 60 },
      '2026-11-02': { n: 0, segundos: 40 }
    }, '2026-11-04');
    assert.equal(comZero.dias, 2);
    assert.equal(comZero.moda, 0);
    assert.equal(comZero.texto, 'A moda dos dias ficou abaixo de 1 treino.');
    const igual = textoDaModa({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.moda, 1);
    assert.equal(igual.texto, 'A moda dos dias é de 1 treino.');
    const futuro = textoDaModa({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.moda, 2);
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.texto, 'A moda dos dias é de 2 treinos.');
    const zerado = textoDaModa({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.moda, 0);
  });

  test('a versão 2.75 deixa o semáforo fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.75'/);
    assert.match(data, /versao: '2\.74'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/semaforo\.js/);
    assert.match(turno, /semaforo\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSemaforo', 'pintarBarreira', 'pintarTrinco']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaLacres'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSemaforos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /semaforo: telaSemaforos/);
    assert.match(mapa, /barreira: telaBarreiras/);
    assert.match(mapa, /trinco: telaTrincos/);
    const moda = app.slice(app.indexOf('function cartaoModa'), app.indexOf('function blocoFluencia'));
    assert.match(moda, /fala-moda/);
    assert.match(moda, /VER A SEMANA/);
    assert.equal(moda.includes('function cartaoVariedade'), false);
    assert.equal(moda.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-moda {'), css.indexOf('.fala-moda {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.dia-atalho {'), css.indexOf('.dia-atalho {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(podeSeguir\) \{\s*dialogo\.noId = segue;/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(perguntaSessao\.i \+ 1 >= cena\.rodadas\.length\) concluirPergunta\(\);/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(reducaoSessao\.i \+ 1 >= reducaoSessao\.fila\.length\) concluirReducao\(\);/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoModa\(/g) || []).length, 1);
  });
});
