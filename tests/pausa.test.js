import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PAUSAS, avaliarPausa, DERIVAS, avaliarDeriva, DESCRITORES, avaliarDescritor
} = await import('../js/pausa.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaMeta } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPausa, registrarDeriva, registrarDescritor
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'pausa.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The clocks differ by two seconds.',
  'Two of three must agree.',
  'The queue is full.',
  'The two jobs wait on each other.',
  'The name does not resolve.',
  'The bad message goes to the side queue.',
  'The CPU stays near ninety percent.',
  'The backup starts at two.',
  'The process ran out of memory.'
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

describe('pausa, deriva e descritor', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/pausa.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(PAUSAS, ['Para', 'Segue'], avaliarPausa);
    conferir(DERIVAS, ['Compara', 'Iguala'], avaliarDeriva);
    conferir(DESCRITORES, ['Abre', 'Fecha'], avaliarDescritor);
    const ids = [...PAUSAS, ...DERIVAS, ...DESCRITORES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const pausa = PAUSAS.find(c => c.id === 'doispausa').rodadas[0];
    assert.equal(avaliarPausa(pausa, 'The pause lasted 2 seconds.').ok, true);
    const linhas = DERIVAS.find(c => c.id === 'duaslinhas').rodadas[0];
    assert.equal(avaliarDeriva(linhas, '2 lines differ.').ok, true);
    const limite = DESCRITORES.find(c => c.id === 'milfiles').rodadas[0];
    assert.equal(avaliarDescritor(limite, 'The limit is 1000 files.').ok, true);
    const texto = JSON.stringify({ PAUSAS, DERIVAS, DESCRITORES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Pausa' && f.melhor === 'The pause lasted two seconds.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Deriva' && f.melhor === 'The config differs from the repo.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Descritor' && f.melhor === 'The process opened too many files.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['pausa', 'deriva', 'descritor']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('pausa, deriva e descritor contam no próprio contador', () => {
    travarMissao('pausa1');
    const pausa = registrarPausa(fim());
    assert.equal(pausa.bonusMissoes, 15);
    assert.equal(estado.stats.pausas, 1);
    assert.equal(estado.stats.freios, 0);
    assert.equal(estado.stats.derivas, 0);
    assert.ok(estado.badges.includes('pausa'));
    for (const id of ['deriva', 'descritor', 'freio', 'ponteiro']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('deriva1');
    const deriva = registrarDeriva(fim());
    assert.equal(deriva.bonusMissoes, 15);
    assert.equal(estado.stats.derivas, 1);
    assert.equal(estado.stats.pausas, 1);
    assert.ok(estado.badges.includes('deriva'));

    travarMissao('descritor1');
    const descritor = registrarDescritor(fim());
    assert.equal(descritor.bonusMissoes, 15);
    assert.equal(estado.stats.descritores, 1);
    assert.equal(estado.stats.estouros, 0);
    assert.ok(estado.badges.includes('descritor'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 196);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a meta conta os minutos que ainda faltam nesta semana', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDaMeta(null, '2026-10-28', 10);
    assert.equal(vazia.texto, 'Faltam 10 minutos para a meta desta semana.');
    assert.equal(vazia.falta, 10);
    assert.equal(vazia.minutos, 0);
    const um = textoDaMeta({}, '2026-10-28', 1);
    assert.equal(um.texto, 'Falta 1 minuto para a meta desta semana.');
    assert.equal(um.falta, 1);
    const quase = textoDaMeta({ '2026-10-28': { segundos: 90 } }, '2026-10-28', 10);
    assert.equal(quase.minutos, 1);
    assert.equal(quase.falta, 9);
    assert.equal(quase.texto, 'Faltam 9 minutos para a meta desta semana.');
    const pronta = textoDaMeta({ '2026-10-26': { segundos: 600 } }, '2026-10-28', 10);
    assert.equal(pronta.falta, 0);
    assert.equal(pronta.texto, 'A meta desta semana já foi cumprida.');
    const fora = textoDaMeta({
      '2026-10-25': { segundos: 600 },
      '2026-10-29': { segundos: 600 }
    }, '2026-10-28', 10);
    assert.equal(fora.minutos, 0);
    assert.equal(fora.texto, 'Faltam 10 minutos para a meta desta semana.');
    const semMeta = textoDaMeta({ '2026-10-28': { segundos: 120 } }, '2026-10-28', 0);
    assert.equal(semMeta.texto, 'A meta de minutos ainda não foi escolhida.');
    assert.equal(semMeta.falta, 0);
    assert.equal(semMeta.meta, 0);
    assert.equal(textoDaMeta(null, '2026-10-28', 'x').meta, 0);
  });

  test('a versão 2.53 deixa a pausa fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.53'/);
    assert.match(data, /versao: '2\.52'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/pausa\.js/);
    assert.match(turno, /pausa\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPausa', 'pintarDeriva', 'pintarDescritor']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaFreios'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaPausas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /pausa: telaPausas/);
    assert.match(mapa, /deriva: telaDerivas/);
    assert.match(mapa, /descritor: telaDescritores/);
    const meta = app.slice(app.indexOf('function cartaoFalta'), app.indexOf('function blocoFluencia'));
    assert.match(meta, /fala-meta/);
    assert.match(meta, /VER A SEMANA/);
    assert.equal(meta.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-meta {'), css.indexOf('.fala-meta {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const diaSemana = css.slice(css.indexOf('.semana-dia {'), css.indexOf('.semana-dia.feito'));
    assert.match(diaSemana, /min-height: 44px/);
    assert.match(app, /'ENTENDI, BORA!'/);
    assert.match(app, /type: 'button', onclick: \(\) => comecarLicao/);
    assert.match(app, /const btnContinuar = h\('button', \{ class: 'btn ' \+ \(res\.correto \? 'btn-verde' : 'btn-vermelho'\), type: 'button'/);
    assert.match(app, /type: 'button', onclick: \(\) => voltarTela\(\) \}, 'JOGAR SEM CONTA'/);
  });
});
