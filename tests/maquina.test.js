import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CPUS, avaliarCpu, COPIAS, avaliarCopia, ESTOUROS, avaliarEstouro
} = await import('../js/maquina.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDosDias } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCpu, registrarCopia, registrarEstouro
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'maquina.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The linter failed on two files.',
  'The browser blocks the other origin.',
  'The signed link lasts one hour.',
  'The disk is ninety percent full.',
  'The job runs at three in the morning.',
  'I will free two gigabytes tonight.'
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

describe('processador, cópia e estouro', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/maquina.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(CPUS, ['Pico', 'Calma'], avaliarCpu);
    conferir(COPIAS, ['Noite', 'Manhã'], avaliarCopia);
    conferir(ESTOUROS, ['Estouro', 'Teto'], avaliarEstouro);
    const ids = [...CPUS, ...COPIAS, ...ESTOUROS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const cpu = CPUS.find(c => c.id === 'noventacpu').rodadas[0];
    assert.equal(avaliarCpu(cpu, 'The CPU stays near 90 percent.').ok, true);
    const copia = COPIAS.find(c => c.id === 'duasnoites').rodadas[0];
    assert.equal(avaliarCopia(copia, 'The backup starts at 2.').ok, true);
    const outra = COPIAS.find(c => c.id === 'semcopia').rodadas[1];
    assert.equal(avaliarCopia(outra, 'I will start one at 2.').ok, true);
    const texto = JSON.stringify({ CPUS, COPIAS, ESTOUROS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Processador' && f.melhor === 'The CPU stays near ninety percent.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cópia' && f.melhor === 'The backup starts at two.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Estouro' && f.melhor === 'The process ran out of memory.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['cpu', 'copia', 'estouro']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('processador, cópia e estouro contam no próprio contador', () => {
    travarMissao('cpu1');
    const cpu = registrarCpu(fim());
    assert.equal(cpu.bonusMissoes, 15);
    assert.equal(estado.stats.cpus, 1);
    assert.equal(estado.stats.links, 0);
    assert.equal(estado.stats.copias, 0);
    assert.ok(estado.badges.includes('cpu'));
    for (const id of ['copia', 'estouro', 'link', 'lint']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('copia1');
    const copia = registrarCopia(fim());
    assert.equal(copia.bonusMissoes, 15);
    assert.equal(estado.stats.copias, 1);
    assert.equal(estado.stats.cpus, 1);
    assert.ok(estado.badges.includes('copia'));

    travarMissao('estouro1');
    const estouro = registrarEstouro(fim());
    assert.equal(estouro.bonusMissoes, 15);
    assert.equal(estado.stats.estouros, 1);
    assert.equal(estado.stats.jobs, 0);
    assert.ok(estado.badges.includes('estouro'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 187);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('os dias com fala olham só esta semana', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDosDias(null, '2026-10-28').texto, 'Nenhum dia com fala nesta semana.');
    assert.equal(textoDosDias({}, '2026-10-28').n, 0);
    const vazio = textoDosDias({ '2026-10-28': { n: 0, segundos: 0 } }, '2026-10-28');
    assert.equal(vazio.texto, 'Nenhum dia com fala nesta semana.');
    const um = textoDosDias({ '2026-10-28': { n: 1, segundos: 0 } }, '2026-10-28');
    assert.equal(um.n, 1);
    assert.equal(um.texto, '1 dia com fala nesta semana.');
    const segundos = textoDosDias({ '2026-10-27': { n: 0, segundos: 30 } }, '2026-10-28');
    assert.equal(segundos.n, 1);
    const soma = textoDosDias({
      '2026-10-26': { n: '1', segundos: 0 },
      '2026-10-28': { n: 2, segundos: 40 },
      '2026-10-25': { n: 4, segundos: 80 },
      '2026-11-02': { n: 3, segundos: 90 }
    }, '2026-10-28');
    assert.equal(soma.n, 2);
    assert.equal(soma.texto, '2 dias com fala nesta semana.');
    assert.equal(textoDosDias({ '2026-10-28': { n: 'x', segundos: 0 } }, '2026-10-28').texto, 'Nenhum dia com fala nesta semana.');
  });

  test('a versão 2.50 deixa o processador fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    const html = readFileSync(join(raiz, 'index.html'), 'utf8');
    const manifesto = readFileSync(join(raiz, 'manifest.webmanifest'), 'utf8');
    assert.equal(data.includes('\u2014'), false);
    assert.equal(data.includes('\u2013'), false);
    assert.equal(html.includes('\u2014'), false);
    assert.equal(manifesto.includes('\u2014'), false);
    assert.match(data, /versao: '2\.50'/);
    assert.match(data, /versao: '2\.49'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/maquina\.js/);
    assert.match(turno, /maquina\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCpu', 'pintarCopia', 'pintarEstouro']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaLinks'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCpus'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /cpu: telaCpus/);
    assert.match(mapa, /copia: telaCopias/);
    assert.match(mapa, /estouro: telaEstouros/);
    const dias = app.slice(app.indexOf('function cartaoDias'), app.indexOf('function blocoFluencia'));
    assert.match(dias, /fala-dias/);
    assert.match(dias, /VER OS DIAS/);
    const regra = css.slice(css.indexOf('.fala-dias {'), css.indexOf('.fala-dias {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const licao = css.slice(css.indexOf('.licao {'), css.indexOf('.licao:hover'));
    assert.match(licao, /min-height: 44px/);
    assert.equal(licao.includes('#'), false);
    const unidade = app.slice(app.indexOf('function cartaoUnidade'), app.indexOf('function nodoHistoria'));
    assert.match(unidade, /type: 'button'/);
    const chefao = app.slice(app.indexOf('function nodoChefao'), app.indexOf('function nodoChefao') + 700);
    assert.match(chefao, /type: 'button'/);
    const verificar = app.slice(app.indexOf('const btnVerificar'), app.indexOf('const rodape'));
    assert.equal(verificar.split("type: 'button'").length - 1, 3);
    const responder = app.slice(app.indexOf('function avancarHistoria'), app.indexOf('function nodoChefao'));
    assert.match(responder, /'RESPONDER'/);
    assert.match(responder, /type: 'button'/);
    assert.equal(app.includes('separou \u2014 bora'), false);
    assert.match(app, /separou\. Bora treinar/);
  });
});
