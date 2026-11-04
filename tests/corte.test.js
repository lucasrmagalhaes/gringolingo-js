import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SQUASHES, avaliarSquash, CIRCUITOS, avaliarCircuito, JOBS, avaliarJob
} = await import('../js/corte.js');
const { TREINOS, textoDaEstrela } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSquash, registrarCircuito, registrarJob
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'corte.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
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

describe('squash, circuito e job', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/corte.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(SQUASHES, ['Commits', 'Merge'], avaliarSquash);
    conferir(CIRCUITOS, ['Abre', 'Fecha'], avaliarCircuito);
    conferir(JOBS, ['Hora', 'Falha'], avaliarJob);
    const ids = [...SQUASHES, ...CIRCUITOS, ...JOBS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const squash = SQUASHES.find(c => c.id === 'trescommits').rodadas[0];
    assert.equal(avaliarSquash(squash, 'Please squash these 3 commits.').ok, true);
    const circuito = CIRCUITOS.find(c => c.id === 'cincoerros').rodadas[0];
    assert.equal(avaliarCircuito(circuito, 'The circuit opens after 5 errors.').ok, true);
    const job = JOBS.find(c => c.id === 'tresmanha').rodadas[1];
    assert.equal(avaliarJob(job, 'It failed 4 nights in a row.').ok, true);
    const texto = JSON.stringify({ SQUASHES, CIRCUITOS, JOBS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Squash' && f.melhor === 'Please squash these three commits.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Circuito' && f.melhor === 'The circuit opens after five errors.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Job' && f.melhor === 'The job runs at three in the morning.'), true);
  });

  test('squash, circuito e job contam no próprio contador', () => {
    travarMissao('squash1');
    const squash = registrarSquash(fim());
    assert.equal(squash.bonusMissoes, 15);
    assert.equal(estado.stats.squashes, 1);
    assert.equal(estado.stats.paginas, 0);
    assert.equal(estado.stats.circuitos, 0);
    assert.ok(estado.badges.includes('squash'));
    for (const id of ['circuito', 'job', 'pagina', 'ensaio']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('circuito1');
    const circuito = registrarCircuito(fim());
    assert.equal(circuito.bonusMissoes, 15);
    assert.equal(estado.stats.circuitos, 1);
    assert.equal(estado.stats.squashes, 1);
    assert.ok(estado.badges.includes('circuito'));

    travarMissao('job1');
    const job = registrarJob(fim());
    assert.equal(job.bonusMissoes, 15);
    assert.equal(estado.stats.jobs, 1);
    assert.equal(estado.stats.discos, 0);
    assert.ok(estado.badges.includes('job'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 172);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a estrela aponta o favorito sem prática', () => {
    semTravessao('../js/hub.js');
    assert.equal(textoDaEstrela(null, null, {}).texto, 'Nenhum favorito marcado ainda.');
    assert.equal(textoDaEstrela(TREINOS, [], {}).n, 0);
    assert.equal(textoDaEstrela(TREINOS, ['naoexiste'], {}).texto, 'Nenhum favorito marcado ainda.');
    const um = textoDaEstrela(TREINOS, ['squash'], {});
    assert.equal(um.faltam, 1);
    assert.equal(um.treino.id, 'squash');
    assert.equal(um.texto, '1 favorito ainda sem prática. O próximo é O squash.');
    const dois = textoDaEstrela(TREINOS, ['job', 'circuito'], {});
    assert.equal(dois.faltam, 2);
    assert.equal(dois.treino.id, 'job');
    assert.equal(dois.texto, '2 favoritos ainda sem prática. O próximo é O job.');
    const feito = textoDaEstrela(TREINOS, ['semana', 'squash'], { squashes: 1 });
    assert.equal(feito.n, 2);
    assert.equal(feito.faltam, 0);
    assert.equal(feito.texto, 'Todos os favoritos já tiveram prática.');
  });

  test('a versão 2.45 deixa o squash fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.45'/);
    assert.match(data, /versao: '2\.44'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/corte\.js/);
    assert.match(turno, /corte\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSquash', 'pintarCircuito', 'pintarJob']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaPaginas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSquashes'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /squash: telaSquashes/);
    assert.match(mapa, /circuito: telaCircuitos/);
    assert.match(mapa, /job: telaJobs/);
    const estrela = app.slice(app.indexOf('function cartaoEstrela'), app.indexOf('function blocoFluencia'));
    assert.match(estrela, /fala-estrela/);
    assert.match(estrela, /VER FAVORITOS/);
    assert.match(app, /aria-label': 'Voltar', onclick: \(\) => voltarTela\(\)/);
    const regra = css.slice(css.indexOf('.fala-estrela {'), css.indexOf('.fala-estrela {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const hora = css.slice(css.indexOf('.hora-input {'), css.indexOf('.hora-input {') + 160);
    assert.match(hora, /min-height: 44px/);
    assert.match(hora, /min-width: 44px/);
    assert.equal(hora.includes('@media'), false);
    assert.equal(hora.includes('#'), false);
  });
});
