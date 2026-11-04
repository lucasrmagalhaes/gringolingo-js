import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SONDAS, avaliarSonda, SEMENTES, avaliarSemente, REGISTROS, avaliarRegistro
} = await import('../js/pulso.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoPico } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSonda, registrarSemente, registrarRegistro
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'pulso.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'I will cherry pick that one commit.',
  'The session ends after eight hours.',
  'The pool is full.',
  'Please squash these three commits.',
  'The circuit opens after five errors.',
  'The job runs at three in the morning.',
  'The list shows twenty rows.',
  'Please rebase onto main.'
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

describe('sonda, semente e registro', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/pulso.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(SONDAS, ['Falha', 'Volta'], avaliarSonda);
    conferir(SEMENTES, ['Banco', 'Linha'], avaliarSemente);
    conferir(REGISTROS, ['Nível', 'Volta'], avaliarRegistro);
    const ids = [...SONDAS, ...SEMENTES, ...REGISTROS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const sonda = SONDAS.find(c => c.id === 'falhouduas').rodadas[0];
    assert.equal(avaliarSonda(sonda, 'The health check failed 2 times.').ok, true);
    const semente = SEMENTES.find(c => c.id === 'bancovazio').rodadas[1];
    assert.equal(avaliarSemente(semente, 'The tables start with 10 rows.').ok, true);
    const registro = REGISTROS.find(c => c.id === 'dezlinhas') || SEMENTES.find(c => c.id === 'dezlinhas');
    assert.equal(avaliarSemente(registro.rodadas[0], '10 rows are enough for the demo.').ok, true);
    const texto = JSON.stringify({ SONDAS, SEMENTES, REGISTROS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Sonda' && f.melhor === 'The health check failed twice.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Semente' && f.melhor === 'Please seed the empty database.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Registro' && f.melhor === 'Please raise the log level.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['sonda', 'semente', 'registro']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('sonda, semente e registro contam no próprio contador', () => {
    travarMissao('sonda1');
    const sonda = registrarSonda(fim());
    assert.equal(sonda.bonusMissoes, 15);
    assert.equal(estado.stats.sondas, 1);
    assert.equal(estado.stats.tanques, 0);
    assert.equal(estado.stats.sementes, 0);
    assert.ok(estado.badges.includes('sonda'));
    for (const id of ['semente', 'registro', 'tanque', 'colheita']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('semente1');
    const semente = registrarSemente(fim());
    assert.equal(semente.bonusMissoes, 15);
    assert.equal(estado.stats.sementes, 1);
    assert.equal(estado.stats.sondas, 1);
    assert.ok(estado.badges.includes('semente'));

    travarMissao('registro1');
    const registro = registrarRegistro(fim());
    assert.equal(registro.bonusMissoes, 15);
    assert.equal(estado.stats.registros, 1);
    assert.equal(estado.stats.jobs, 0);
    assert.ok(estado.badges.includes('registro'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 178);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o pico aponta o dia com mais fala', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoPico(null, '2026-10-28').texto, 'Ainda não há um dia mais forte nesta semana.');
    assert.equal(textoDoPico({}, '2026-10-28').minutos, 0);
    const curto = textoDoPico({ '2026-10-28': { segundos: 30 } }, '2026-10-28');
    assert.equal(curto.texto, 'Ainda não há um dia mais forte nesta semana.');
    const um = textoDoPico({ '2026-10-28': { segundos: 120 } }, '2026-10-28');
    assert.equal(um.dia, 'quarta');
    assert.equal(um.texto, 'Quarta foi o dia com mais fala. 2 minutos.');
    const umMin = textoDoPico({ '2026-10-26': { segundos: 60 } }, '2026-10-28');
    assert.equal(umMin.texto, 'Segunda foi o dia com mais fala. 1 minuto.');
    const empate = textoDoPico({
      '2026-10-26': { segundos: 300 },
      '2026-10-28': { segundos: 300 },
      '2026-11-01': { segundos: 900 }
    }, '2026-10-28');
    assert.equal(empate.empate, true);
    assert.equal(empate.dia, 'segunda');
    assert.equal(empate.texto, 'Segunda lidera, empatada com outro dia. 5 minutos.');
    const sabado = textoDoPico({
      '2026-10-31': { segundos: 120 },
      '2026-11-01': { segundos: 120 }
    }, '2026-11-01');
    assert.equal(sabado.texto, 'Sábado lidera, empatado com outro dia. 2 minutos.');
  });

  test('a versão 2.47 deixa a sonda fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.47'/);
    assert.match(data, /versao: '2\.46'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/pulso\.js/);
    assert.match(turno, /pulso\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSonda', 'pintarSemente', 'pintarRegistro']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaTanques'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSondas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /sonda: telaSondas/);
    assert.match(mapa, /semente: telaSementes/);
    assert.match(mapa, /registro: telaRegistros/);
    const pico = app.slice(app.indexOf('function cartaoPico'), app.indexOf('function blocoFluencia'));
    assert.match(pico, /fala-pico/);
    assert.match(pico, /VER OS DIAS/);
    const som = css.slice(css.indexOf('.dic-som {'), css.indexOf('.dic-som {') + 180);
    assert.match(som, /width: 44px/);
    assert.match(som, /height: 44px/);
    assert.equal(som.includes('@media'), false);
    assert.equal(som.includes('#'), false);
    const fav = css.slice(css.indexOf('.dic-fav {'), css.indexOf('.dic-fav::after'));
    assert.match(fav, /min-height: 44px/);
    assert.match(fav, /min-width: 44px/);
    assert.equal(fav.includes('@media'), false);
    assert.equal(fav.includes('#'), false);
    const regra = css.slice(css.indexOf('.fala-pico {'), css.indexOf('.fala-pico {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    assert.match(app, /class: 'btn-som dic-som',\n      type: 'button'/);
  });
});
