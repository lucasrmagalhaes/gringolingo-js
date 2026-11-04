import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RECUOS, avaliarRecuo, VIGIAS, avaliarVigia, AMPULHETAS, avaliarAmpulheta
} = await import('../js/recuo.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaRepeticao } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRecuo, registrarVigia, registrarAmpulheta
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'recuo.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'Only two jobs can pass together.',
  'All four people must arrive together.',
  'The latch opens when the count hits zero.',
  'We kept one line out of every ten.',
  'The key landed in its niche.',
  'The seal on the package changed.',
  'The failure stayed inside its own compartment.',
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

describe('recuo, vigia e ampulheta', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/recuo.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(RECUOS, ['Dobra', 'Espera'], avaliarRecuo);
    conferir(VIGIAS, ['Olha', 'Encerra'], avaliarVigia);
    conferir(AMPULHETAS, ['Vence', 'Troca'], avaliarAmpulheta);
    const ids = [...RECUOS, ...VIGIAS, ...AMPULHETAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const recuo = RECUOS.find(c => c.id === 'recuo2').rodadas[0];
    assert.equal(avaliarRecuo(recuo, 'The backoff waited 2 seconds.').ok, true);
    const vigia = VIGIAS.find(c => c.id === 'vigia8').rodadas[0];
    assert.equal(avaliarVigia(vigia, 'The watchdog waited 8 seconds.').ok, true);
    const ampulheta = AMPULHETAS.find(c => c.id === 'ampulheta15').rodadas[0];
    assert.equal(avaliarAmpulheta(ampulheta, 'The pass lasted 15 minutes.').ok, true);
    const texto = JSON.stringify({ RECUOS, VIGIAS, AMPULHETAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Recuo' && f.melhor === 'Each failure doubles the wait.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Vigia' && f.melhor === 'The watchdog stops the late task.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Ampulheta' && f.melhor === 'The pass expires in fifteen minutes.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['recuo', 'vigia', 'ampulheta']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('recuo, vigia e ampulheta contam no próprio contador', () => {
    travarMissao('recuo1');
    const recuo = registrarRecuo(fim());
    assert.equal(recuo.bonusMissoes, 15);
    assert.equal(estado.stats.recuos, 1);
    assert.equal(estado.stats.trincos, 0);
    assert.equal(estado.stats.vigias, 0);
    assert.equal(estado.stats.ampulhetas, 0);
    assert.ok(estado.badges.includes('recuo'));
    for (const id of ['trinco', 'ampulheta', 'semaforo', 'barreira']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('vigia1');
    const vigia = registrarVigia(fim());
    assert.equal(vigia.bonusMissoes, 15);
    assert.equal(estado.stats.vigias, 1);
    assert.equal(estado.stats.recuos, 1);
    assert.ok(estado.badges.includes('vigia'));

    travarMissao('ampulheta1');
    const ampulheta = registrarAmpulheta(fim());
    assert.equal(ampulheta.bonusMissoes, 15);
    assert.equal(estado.stats.ampulhetas, 1);
    assert.equal(estado.stats.semaforos, 0);
    assert.ok(estado.badges.includes('ampulheta'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 265);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a repetição conta os dias do valor mais comum', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaRepeticao(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há repetição de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.repeticao, 0);
    const vazio = textoDaRepeticao({}, '2026-11-04');
    assert.equal(vazio.texto, 'A repetição dos dias ainda é 0 dias.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.repeticao, 0);
    const soSegundos = textoDaRepeticao({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.repeticao, 1);
    assert.equal(soSegundos.texto, 'A repetição dos dias é de 1 dia.');
    const um = textoDaRepeticao({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.repeticao, 1);
    assert.equal(um.texto, 'A repetição dos dias é de 1 dia.');
    const par = textoDaRepeticao({
      '2026-10-28': { n: 1, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.repeticao, 1);
    assert.equal(par.texto, 'A repetição dos dias é de 1 dia.');
    const quatro = textoDaRepeticao({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-10-27': { n: 4, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 }
    }, '2026-11-04');
    assert.equal(quatro.dias, 3);
    assert.equal(quatro.repeticao, 2);
    assert.equal(quatro.texto, 'A repetição dos dias é de 2 dias.');
    const comZero = textoDaRepeticao({
      '2026-10-28': { n: 3, segundos: 60 },
      '2026-11-02': { n: 0, segundos: 40 }
    }, '2026-11-04');
    assert.equal(comZero.dias, 2);
    assert.equal(comZero.repeticao, 1);
    assert.equal(comZero.texto, 'A repetição dos dias é de 1 dia.');
    const igual = textoDaRepeticao({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.repeticao, 5);
    assert.equal(igual.texto, 'A repetição dos dias é de 5 dias.');
    const futuro = textoDaRepeticao({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.repeticao, 1);
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.texto, 'A repetição dos dias é de 1 dia.');
    const zerado = textoDaRepeticao({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.repeticao, 0);
  });

  test('a versão 2.76 deixa o recuo fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.76'/);
    assert.match(data, /versao: '2\.75'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/recuo\.js/);
    assert.match(turno, /recuo\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarRecuo', 'pintarVigia', 'pintarAmpulheta']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaTrincos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaRecuos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /recuo: telaRecuos/);
    assert.match(mapa, /vigia: telaVigias/);
    assert.match(mapa, /ampulheta: telaAmpulhetas/);
    const repeticao = app.slice(app.indexOf('function cartaoRepeticao'), app.indexOf('function blocoFluencia'));
    assert.match(repeticao, /fala-repeticao/);
    assert.match(repeticao, /VER A SEMANA/);
    assert.equal(repeticao.includes('function cartaoModa'), false);
    assert.equal(repeticao.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-repeticao {'), css.indexOf('.fala-repeticao {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.historia-no {'), css.indexOf('.historia-no {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(frasalSessao\.i \+ 1 >= frasalSessao\.fila\.length\) concluirFrasal\(\);/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(idiomaSessao\.i \+ 1 >= idiomaSessao\.fila\.length\) concluirIdioma\(\);/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(deslizeSessao\.i \+ 1 >= deslizeSessao\.fila\.length\) concluirDeslize\(\);/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoRepeticao\(/g) || []).length, 1);
  });
});
