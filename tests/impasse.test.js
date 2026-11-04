import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  IMPASSES, avaliarImpasse, DOMINIOS, avaliarDominio, MORTAS, avaliarMorta
} = await import('../js/impasse.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoRitmo } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarImpasse, registrarDominio, registrarMorta
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'impasse.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The CPU stays near ninety percent.',
  'The backup starts at two.',
  'The process ran out of memory.',
  'The health check failed twice.',
  'The p95 latency went past two seconds.',
  'The root cause was a missing index.',
  'I will rotate the token and delete that log.'
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

describe('impasse, domínio e carta morta', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/impasse.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(IMPASSES, ['Espera', 'Solta'], avaliarImpasse);
    conferir(DOMINIOS, ['Falha', 'Aponta'], avaliarDominio);
    conferir(MORTAS, ['Desvio', 'Motivo'], avaliarMorta);
    const ids = [...IMPASSES, ...DOMINIOS, ...MORTAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const impasse = IMPASSES.find(c => c.id === 'doisespera').rodadas[0];
    assert.equal(avaliarImpasse(impasse, 'The 2 jobs wait on each other.').ok, true);
    const nome = DOMINIOS.find(c => c.id === 'endereconovo').rodadas[0];
    assert.equal(avaliarDominio(nome, 'The lookup failed 2 times.').ok, true);
    const fila = MORTAS.find(c => c.id === 'filalado').rodadas[0];
    assert.equal(avaliarMorta(fila, 'The side queue holds 3 messages.').ok, true);
    const texto = JSON.stringify({ IMPASSES, DOMINIOS, MORTAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Impasse' && f.melhor === 'The two jobs wait on each other.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Domínio' && f.melhor === 'The name does not resolve.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Carta morta' && f.melhor === 'The bad message goes to the side queue.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['impasse', 'dominio', 'morta']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('impasse, domínio e carta morta contam no próprio contador', () => {
    travarMissao('impasse1');
    const impasse = registrarImpasse(fim());
    assert.equal(impasse.bonusMissoes, 15);
    assert.equal(estado.stats.impasses, 1);
    assert.equal(estado.stats.estouros, 0);
    assert.equal(estado.stats.dominios, 0);
    assert.ok(estado.badges.includes('impasse'));
    for (const id of ['dominio', 'morta', 'estouro', 'cpu']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('dominio1');
    const dominio = registrarDominio(fim());
    assert.equal(dominio.bonusMissoes, 15);
    assert.equal(estado.stats.dominios, 1);
    assert.equal(estado.stats.impasses, 1);
    assert.ok(estado.badges.includes('dominio'));

    travarMissao('morta1');
    const morta = registrarMorta(fim());
    assert.equal(morta.bonusMissoes, 15);
    assert.equal(estado.stats.mortas, 1);
    assert.equal(estado.stats.jobs, 0);
    assert.ok(estado.badges.includes('morta'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 190);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o ritmo olha só os dias com fala desta semana', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoRitmo(null, '2026-10-28').texto, 'Ainda não há ritmo nesta semana.');
    assert.equal(textoDoRitmo({}, '2026-10-28').dias, 0);
    const vazio = textoDoRitmo({ '2026-10-28': { n: 0, segundos: 0 } }, '2026-10-28');
    assert.equal(vazio.texto, 'Ainda não há ritmo nesta semana.');
    const curto = textoDoRitmo({ '2026-10-28': { n: 1, segundos: 30 } }, '2026-10-28');
    assert.equal(curto.dias, 1);
    assert.equal(curto.ritmo, 0);
    assert.equal(curto.texto, 'Menos de 1 minuto por dia com fala.');
    const um = textoDoRitmo({ '2026-10-28': { n: '1', segundos: '90' } }, '2026-10-28');
    assert.equal(um.ritmo, 1);
    assert.equal(um.texto, '1 minuto por dia com fala.');
    const soma = textoDoRitmo({
      '2026-10-26': { n: 1, segundos: 120 },
      '2026-10-28': { n: 0, segundos: 120 },
      '2026-10-25': { n: 4, segundos: 600 },
      '2026-11-02': { n: 3, segundos: 600 }
    }, '2026-10-28');
    assert.equal(soma.dias, 2);
    assert.equal(soma.ritmo, 2);
    assert.equal(soma.texto, '2 minutos por dia com fala.');
    assert.equal(textoDoRitmo({ '2026-10-28': { n: 'x', segundos: 0 } }, '2026-10-28').texto, 'Ainda não há ritmo nesta semana.');
  });

  test('a versão 2.51 deixa o impasse fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.51'/);
    assert.match(data, /versao: '2\.50'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/impasse\.js/);
    assert.match(turno, /impasse\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarImpasse', 'pintarDominio', 'pintarMorta']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaEstouros'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaImpasses'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /impasse: telaImpasses/);
    assert.match(mapa, /dominio: telaDominios/);
    assert.match(mapa, /morta: telaMortas/);
    const ritmo = app.slice(app.indexOf('function cartaoRitmo'), app.indexOf('function blocoFluencia'));
    assert.match(ritmo, /fala-ritmo/);
    assert.match(ritmo, /VER A SEMANA/);
    const regra = css.slice(css.indexOf('.fala-ritmo {'), css.indexOf('.fala-ritmo {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const btn = css.slice(css.indexOf('.btn {'), css.indexOf('.btn:hover'));
    assert.match(btn, /min-height: 44px/);
    const cena = app.slice(app.indexOf('function pintarCenaFala'), app.indexOf('function listarCena'));
    assert.match(cena, /const verificar = h\('button', \{ class: 'btn btn-verde', type: 'button', disabled: true \}, 'VERIFICAR'\)/);
    assert.match(cena, /type: 'button',\s*onclick\(\)/);
    const card = app.slice(app.indexOf('function cartaoComNivel'), app.indexOf('function filaAdaptada'));
    assert.match(card, /type: 'button'/);
  });
});
