import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  INODOS, avaliarInodo, SAIDAS, avaliarSaida, MANADAS, avaliarManada
} = await import('../js/inodo.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaUltima } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarInodo, registrarSaida, registrarManada
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'inodo.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The server started using swap.',
  'The page runs one query per row.',
  'Nothing listens on that port.',
  'The pause lasted two seconds.',
  'The config differs from the repo.',
  'The process opened too many files.'
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

describe('inodo, saída e manada', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/inodo.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(INODOS, ['Acaba', 'Volta'], avaliarInodo);
    conferir(SAIDAS, ['Recebe', 'Espera'], avaliarSaida);
    conferir(MANADAS, ['Cai', 'Segura'], avaliarManada);
    const ids = [...INODOS, ...SAIDAS, ...MANADAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const nomes = INODOS.find(c => c.id === 'zeronomes').rodadas[0];
    assert.equal(avaliarInodo(nomes, '0 names remain.').ok, true);
    const espera = SAIDAS.find(c => c.id === 'esperaaberta').rodadas[0];
    assert.equal(avaliarSaida(espera, 'The shutdown waits 30 seconds.').ok, true);
    const cem = MANADAS.find(c => c.id === 'cembuscas').rodadas[0];
    assert.equal(avaliarManada(cem, '100 requests hit the database.').ok, true);
    const texto = JSON.stringify({ INODOS, SAIDAS, MANADAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Inodo' && f.melhor === 'The disk ran out of file names.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Saída' && f.melhor === 'The service got the stop signal.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Manada' && f.melhor === 'The cache expired all at once.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['inodo', 'saida', 'manada']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('inodo, saída e manada contam no próprio contador', () => {
    travarMissao('inodo1');
    const inodo = registrarInodo(fim());
    assert.equal(inodo.bonusMissoes, 15);
    assert.equal(estado.stats.inodos, 1);
    assert.equal(estado.stats.portas, 0);
    assert.equal(estado.stats.saidas, 0);
    assert.ok(estado.badges.includes('inodo'));
    for (const id of ['saida', 'manada', 'porta', 'reserva']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('saida1');
    const saida = registrarSaida(fim());
    assert.equal(saida.bonusMissoes, 15);
    assert.equal(estado.stats.saidas, 1);
    assert.equal(estado.stats.inodos, 1);
    assert.ok(estado.badges.includes('saida'));

    travarMissao('manada1');
    const manada = registrarManada(fim());
    assert.equal(manada.bonusMissoes, 15);
    assert.equal(estado.stats.manadas, 1);
    assert.equal(estado.stats.varreduras, 0);
    assert.ok(estado.badges.includes('manada'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 202);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a última fala olha para trás do dia de hoje', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDaUltima(null, '2026-10-28');
    assert.equal(vazia.texto, 'Ainda não há fala registrada.');
    assert.equal(vazia.dias, null);
    const invalida = textoDaUltima({ '2026-10-28': { n: 1 } }, 'ontem');
    assert.equal(invalida.dias, null);
    const hoje = textoDaUltima({ '2026-10-28': { n: '1', segundos: 0 } }, '2026-10-28');
    assert.equal(hoje.dias, 0);
    assert.equal(hoje.texto, 'A última fala foi hoje.');
    const ontem = textoDaUltima({ '2026-10-27': { segundos: 12, n: 0 } }, '2026-10-28');
    assert.equal(ontem.dias, 1);
    assert.equal(ontem.texto, 'A última fala foi ontem.');
    const tres = textoDaUltima({
      '2026-10-25': { n: 2, segundos: 40 },
      '2026-10-29': { n: 9, segundos: 90 }
    }, '2026-10-28');
    assert.equal(tres.dias, 3);
    assert.equal(tres.texto, 'A última fala foi há 3 dias.');
    const zerado = textoDaUltima({ '2026-10-28': { n: 0, segundos: 0 } }, '2026-10-28');
    assert.equal(zerado.dias, null);
  });

  test('a versão 2.55 deixa o inodo fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.55'/);
    assert.match(data, /versao: '2\.54'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/inodo\.js/);
    assert.match(turno, /inodo\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarInodo', 'pintarSaida', 'pintarManada']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaPortas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaInodos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /inodo: telaInodos/);
    assert.match(mapa, /saida: telaSaidas/);
    assert.match(mapa, /manada: telaManadas/);
    const ultima = app.slice(app.indexOf('function cartaoUltima'), app.indexOf('function blocoFluencia'));
    assert.match(ultima, /fala-ultima/);
    assert.match(ultima, /VER A SEMANA/);
    assert.equal(ultima.includes('function cartaoDuracao'), false);
    assert.equal(ultima.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-ultima {'), css.indexOf('.fala-ultima {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const sobre = css.slice(css.indexOf('.sobre-botoes > .pilula'), css.indexOf('.sobre-botoes > .pilula') + 80);
    assert.match(sobre, /min-height: 44px/);
    assert.match(app, /class: 'pilula btn-perfil', type: 'button', onclick: telaPrivacidade/);
    assert.match(app, /class: 'btn btn-branco', type: 'button', onclick: telaNivel \}, 'TESTE DE NÍVEL'/);
    assert.match(app, /class: 'card dicionario-atalho', type: 'button'/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
  });
});
