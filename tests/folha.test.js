import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  COLHEITAS, avaliarColheita, SESSOES, avaliarSessao, TANQUES, avaliarTanque
} = await import('../js/folha.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoAcerto } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarColheita, registrarSessao, registrarTanque
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'folha.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'Please squash these three commits.',
  'The circuit opens after five errors.',
  'The job runs at three in the morning.',
  'The history stays as one commit.',
  'I will try this on staging first.',
  'The disk is ninety percent full.',
  'The list shows twenty rows.',
  'Please rebase onto main.',
  'The replica is two minutes behind.',
  'Change one file, then run the tests.'
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

describe('colheita, sessão e tanque', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/folha.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(COLHEITAS, ['Commit', 'Resto'], avaliarColheita);
    conferir(SESSOES, ['Fim', 'Prazo'], avaliarSessao);
    conferir(TANQUES, ['Cheio', 'Folga'], avaliarTanque);
    const ids = [...COLHEITAS, ...SESSOES, ...TANQUES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const colheita = COLHEITAS.find(c => c.id === 'cherryum').rodadas[0];
    assert.equal(avaliarColheita(colheita, 'I will cherry pick that 1 commit.').ok, true);
    const sessao = SESSOES.find(c => c.id === 'oitofala').rodadas[0];
    assert.equal(avaliarSessao(sessao, 'The session ends after 8 hours.').ok, true);
    const tanque = TANQUES.find(c => c.id === 'limitevinte').rodadas[0];
    assert.equal(avaliarTanque(tanque, 'We allow 20 connections.').ok, true);
    const texto = JSON.stringify({ COLHEITAS, SESSOES, TANQUES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Colheita' && f.melhor === 'I will cherry pick that one commit.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Sessão' && f.melhor === 'The session ends after eight hours.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Tanque' && f.melhor === 'The pool is full.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['colheita', 'sessao', 'tanque']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('colheita, sessão e tanque contam no próprio contador', () => {
    travarMissao('colheita1');
    const colheita = registrarColheita(fim());
    assert.equal(colheita.bonusMissoes, 15);
    assert.equal(estado.stats.colheitas, 1);
    assert.equal(estado.stats.jobs, 0);
    assert.equal(estado.stats.sessoes, 0);
    assert.ok(estado.badges.includes('colheita'));
    for (const id of ['sessao', 'tanque', 'job', 'squash']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('sessao1');
    const sessao = registrarSessao(fim());
    assert.equal(sessao.bonusMissoes, 15);
    assert.equal(estado.stats.sessoes, 1);
    assert.equal(estado.stats.colheitas, 1);
    assert.ok(estado.badges.includes('sessao'));

    travarMissao('tanque1');
    const tanque = registrarTanque(fim());
    assert.equal(tanque.bonusMissoes, 15);
    assert.equal(estado.stats.tanques, 1);
    assert.equal(estado.stats.discos, 0);
    assert.ok(estado.badges.includes('tanque'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 175);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o acerto da semana usa as respostas já dadas', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoAcerto(null, '2026-10-28').texto, 'Ainda não há respostas nesta semana.');
    assert.equal(textoDoAcerto({}, '2026-10-28').respostas, 0);
    const um = textoDoAcerto({ '2026-10-28': { acertos: 8, respostas: 10 } }, '2026-10-28');
    assert.equal(um.pct, 80);
    assert.equal(um.texto, '80% de acerto nesta semana. 8 de 10.');
    const soma = textoDoAcerto({
      '2026-10-26': { acertos: 1, respostas: 1 },
      '2026-10-27': { acertos: 0, respostas: 1 },
      '2026-10-25': { acertos: 9, respostas: 9 },
      '2026-10-29': { acertos: 9, respostas: 9 }
    }, '2026-10-28');
    assert.equal(soma.acertos, 1);
    assert.equal(soma.respostas, 2);
    assert.equal(soma.texto, '50% de acerto nesta semana. 1 de 2.');
    const estoura = textoDoAcerto({ '2026-10-28': { acertos: 12, respostas: 4 } }, '2026-10-28');
    assert.equal(estoura.pct, 100);
    assert.equal(estoura.texto, '100% de acerto nesta semana. 4 de 4.');
    assert.equal(textoDoAcerto({ '2026-10-28': { acertos: 'x', respostas: 0 } }, '2026-10-28').texto, 'Ainda não há respostas nesta semana.');
  });

  test('a versão 2.46 deixa a colheita fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.46'/);
    assert.match(data, /versao: '2\.45'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/folha\.js/);
    assert.match(turno, /folha\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarColheita', 'pintarSessao', 'pintarTanque']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaJobs'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaColheitas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /colheita: telaColheitas/);
    assert.match(mapa, /sessao: telaSessoes/);
    assert.match(mapa, /tanque: telaTanques/);
    const acerto = app.slice(app.indexOf('function cartaoAcerto'), app.indexOf('function blocoFluencia'));
    assert.match(acerto, /fala-acerto/);
    assert.match(acerto, /VER O HISTÓRICO/);
    const conta = app.slice(app.indexOf('function pilulasDeConta'), app.indexOf('function bannerStreak'));
    assert.match(conta, /aria-label': 'Entrar'/);
    assert.equal(conta.split("type: 'button'").length - 1, 2);
    const regra = css.slice(css.indexOf('.fala-acerto {'), css.indexOf('.fala-acerto {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const meta = css.slice(css.indexOf('.meta-opcao {'), css.indexOf('.meta-opcao::after'));
    assert.match(meta, /min-height: 44px/);
    assert.match(meta, /min-width: 44px/);
    assert.equal(meta.includes('@media'), false);
    assert.equal(meta.includes('#'), false);
    const voz = css.slice(css.indexOf('.voz-chip {'), css.indexOf('.voz-chip::after'));
    assert.match(voz, /min-height: 44px/);
    assert.match(voz, /min-width: 44px/);
    assert.equal(voz.includes('@media'), false);
    assert.equal(voz.includes('#'), false);
  });
});
