import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  LINTS, avaliarLint, ORIGENS, avaliarOrigem, LINKS, avaliarLink
} = await import('../js/cerca.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaNota } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarLint, registrarOrigem, registrarLink
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'cerca.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The request id sits in the header.',
  'The window starts at midnight.',
  'Please restart that one pod.',
  'The health check failed twice.',
  'Please seed the empty database.',
  'Please raise the log level.'
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

describe('lint, origem e link', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/cerca.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(LINTS, ['Falha', 'Volta'], avaliarLint);
    conferir(ORIGENS, ['Bloqueio', 'Libera'], avaliarOrigem);
    conferir(LINKS, ['Prazo', 'Troca'], avaliarLink);
    const ids = [...LINTS, ...ORIGENS, ...LINKS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const lint = LINTS.find(c => c.id === 'doisarquivos').rodadas[0];
    assert.equal(avaliarLint(lint, 'The linter failed on 2 files.').ok, true);
    const origem = ORIGENS.find(c => c.id === 'outraorigem').rodadas[1];
    assert.equal(avaliarOrigem(origem, 'Please allow that 1 origin.').ok, true);
    const link = LINKS.find(c => c.id === 'horaassinada').rodadas[0];
    assert.equal(avaliarLink(link, 'The signed link lasts 1 hour.').ok, true);
    const velho = LINKS.find(c => c.id === 'novolink').rodadas[0];
    assert.equal(avaliarLink(velho, 'The old link expires at 12.').ok, true);
    const texto = JSON.stringify({ LINTS, ORIGENS, LINKS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Lint' && f.melhor === 'The linter failed on two files.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Origem' && f.melhor === 'The browser blocks the other origin.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Link' && f.melhor === 'The signed link lasts one hour.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['lint', 'origem', 'link']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('lint, origem e link contam no próprio contador', () => {
    travarMissao('lint1');
    const lint = registrarLint(fim());
    assert.equal(lint.bonusMissoes, 15);
    assert.equal(estado.stats.lints, 1);
    assert.equal(estado.stats.pods, 0);
    assert.equal(estado.stats.origens, 0);
    assert.ok(estado.badges.includes('lint'));
    for (const id of ['origem', 'link', 'pod', 'rastro']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('origem1');
    const origem = registrarOrigem(fim());
    assert.equal(origem.bonusMissoes, 15);
    assert.equal(estado.stats.origens, 1);
    assert.equal(estado.stats.lints, 1);
    assert.ok(estado.badges.includes('origem'));

    travarMissao('link1');
    const link = registrarLink(fim());
    assert.equal(link.bonusMissoes, 15);
    assert.equal(estado.stats.links, 1);
    assert.equal(estado.stats.jobs, 0);
    assert.ok(estado.badges.includes('link'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 184);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a nota média olha só esta semana', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDaNota(null, '2026-10-28').texto, 'Ainda não há nota nesta semana.');
    assert.equal(textoDaNota({}, '2026-10-28').n, 0);
    const curto = textoDaNota({ '2026-10-28': { soma: 0, n: 0 } }, '2026-10-28');
    assert.equal(curto.texto, 'Ainda não há nota nesta semana.');
    const um = textoDaNota({ '2026-10-28': { soma: 80, n: 1 } }, '2026-10-28');
    assert.equal(um.nota, 80);
    assert.equal(um.texto, 'A nota desta semana é 80.');
    const soma = textoDaNota({
      '2026-10-26': { soma: 80, n: 1 },
      '2026-10-28': { soma: '40', n: '1' },
      '2026-10-25': { soma: 100, n: 1 },
      '2026-11-02': { soma: 100, n: 1 }
    }, '2026-10-28');
    assert.equal(soma.n, 2);
    assert.equal(soma.nota, 60);
    assert.equal(soma.texto, 'A nota desta semana é 60.');
    const teto = textoDaNota({ '2026-10-28': { soma: 500, n: 1 } }, '2026-10-28');
    assert.equal(teto.nota, 100);
    assert.equal(textoDaNota({ '2026-10-28': { soma: 'x', n: 0 } }, '2026-10-28').texto, 'Ainda não há nota nesta semana.');
  });

  test('a versão 2.49 deixa o lint fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.49'/);
    assert.match(data, /versao: '2\.48'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/cerca\.js/);
    assert.match(turno, /cerca\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarLint', 'pintarOrigem', 'pintarLink']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaPods'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaLints'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /lint: telaLints/);
    assert.match(mapa, /origem: telaOrigens/);
    assert.match(mapa, /link: telaLinks/);
    const nota = app.slice(app.indexOf('function cartaoNota'), app.indexOf('function blocoFluencia'));
    assert.match(nota, /fala-nota/);
    assert.match(nota, /VER O MÊS/);
    const regra = css.slice(css.indexOf('.fala-nota {'), css.indexOf('.fala-nota {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const compacto = css.slice(css.indexOf('.btn-compacto {'), css.indexOf('.btn-compacto {') + 120);
    assert.match(compacto, /min-height: 44px/);
    assert.equal(compacto.includes('@media'), false);
    assert.equal(compacto.includes('#'), false);
    const pular = css.slice(css.indexOf('.pular:focus {'), css.indexOf('.pular:focus {') + 420);
    assert.match(pular, /min-height: 44px/);
    assert.equal(pular.includes('#'), false);
    const tema = app.slice(app.indexOf('function botaoTema'), app.indexOf('function checarGoogle'));
    assert.match(tema, /type: 'button'/);
    assert.match(app, /Esse link de confirmação expirou\. Cria a conta de novo/);
    assert.equal(app.includes('expirou \u2014 cria'), false);
  });
});
