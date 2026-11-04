import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  FILTROS, avaliarFiltro, ORDENS, avaliarOrdem, PROVAS, avaliarProva
} = await import('../js/filtro.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaParte } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarFiltro, registrarOrdem, registrarProva
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'filtro.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The secret key showed up in the log.',
  'The second read saw a new row.',
  'The counter wrapped back to zero.',
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

describe('filtro, ordem e prova', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/filtro.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(FILTROS, ['Avisa', 'Confere'], avaliarFiltro);
    conferir(ORDENS, ['Chega', 'Ordena'], avaliarOrdem);
    conferir(PROVAS, ['Mede', 'Recusa'], avaliarProva);
    const ids = [...FILTROS, ...ORDENS, ...PROVAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const cem = FILTROS.find(c => c.id === 'umcem').rodadas[0];
    assert.equal(avaliarFiltro(cem, 'The false yes shows up 1 time in 100.').ok, true);
    const quatro = ORDENS.find(c => c.id === 'quatroantes').rodadas[0];
    assert.equal(avaliarOrdem(quatro, 'Message 4 arrived before message 3.').ok, true);
    const byte = PROVAS.find(c => c.id === 'bytequatro').rodadas[0];
    assert.equal(avaliarProva(byte, 'The check failed at byte 400.').ok, true);
    const texto = JSON.stringify({ FILTROS, ORDENS, PROVAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Filtro' && f.melhor === 'The filter gave a false yes.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Ordem' && f.melhor === 'Message four arrived before message three.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Prova' && f.melhor === 'The byte check did not match the file.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['filtro', 'ordem', 'prova']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('filtro, ordem e prova contam no próprio contador', () => {
    travarMissao('filtro1');
    const filtro = registrarFiltro(fim());
    assert.equal(filtro.bonusMissoes, 15);
    assert.equal(estado.stats.filtros, 1);
    assert.equal(estado.stats.inteiros, 0);
    assert.equal(estado.stats.ordens, 0);
    assert.ok(estado.badges.includes('filtro'));
    for (const id of ['ordem', 'prova', 'inteiro', 'segredo']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('ordem1');
    const ordem = registrarOrdem(fim());
    assert.equal(ordem.bonusMissoes, 15);
    assert.equal(estado.stats.ordens, 1);
    assert.equal(estado.stats.filtros, 1);
    assert.ok(estado.badges.includes('ordem'));

    travarMissao('prova1');
    const prova = registrarProva(fim());
    assert.equal(prova.bonusMissoes, 15);
    assert.equal(estado.stats.provas, 1);
    assert.equal(estado.stats.segredos, 0);
    assert.ok(estado.badges.includes('prova'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 229);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a parte desta semana separa os minutos da soma', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDaParte(null, '2026-11-04');
    assert.equal(vazia.texto, 'A parte desta semana ainda é 0 minutos.');
    assert.equal(vazia.dias, 0);
    assert.equal(vazia.minutos, 0);
    const invalida = textoDaParte({ '2026-11-04': { n: 1, segundos: 60 } }, 'ontem');
    assert.equal(invalida.dias, null);
    assert.equal(invalida.texto, 'Ainda não há parte desta semana.');
    const fora = textoDaParte({ '2026-10-28': { n: 1, segundos: 90 } }, '2026-11-04');
    assert.equal(fora.dias, 1);
    assert.equal(fora.minutos, 0);
    assert.equal(fora.texto, 'Nenhum minuto desta semana entra na soma.');
    const inteiro = textoDaParte({ '2026-11-04': { n: 1, segundos: 90 } }, '2026-11-04');
    assert.equal(inteiro.minutos, 1);
    assert.equal(inteiro.parte, 1);
    assert.equal(inteiro.texto, 'A parte desta semana é o minuto inteiro.');
    const parte = textoDaParte({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(parte.dias, 5);
    assert.equal(parte.minutos, 11);
    assert.equal(parte.parte, 14);
    assert.equal(parte.texto, 'Esta semana tem 11 dos 14 minutos.');
    const um = textoDaParte({
      '2026-10-28': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(um.texto, 'Esta semana tem 1 dos 2 minutos.');
    const futuro = textoDaParte({
      '2026-11-04': { n: 1, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.minutos, 1);
    assert.equal(futuro.dias, 1);
    const zerado = textoDaParte({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
  });

  test('a versão 2.64 deixa o filtro fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.64'/);
    assert.match(data, /versao: '2\.63'/);
    assert.match(sw, /gringolingo-v91/);
    assert.match(sw, /\.\/js\/filtro\.js/);
    assert.match(turno, /filtro\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarFiltro', 'pintarOrdem', 'pintarProva']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaInteiros'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaFiltros'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /filtro: telaFiltros/);
    assert.match(mapa, /ordem: telaOrdens/);
    assert.match(mapa, /prova: telaProvas/);
    const parte = app.slice(app.indexOf('function cartaoParte'), app.indexOf('function blocoFluencia'));
    assert.match(parte, /fala-parte/);
    assert.match(parte, /VER A SEMANA/);
    assert.equal(parte.includes('function cartaoPorDia'), false);
    assert.equal(parte.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-parte {'), css.indexOf('.fala-parte {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const perfil = css.slice(css.indexOf('.btn-perfil {'), css.indexOf('.btn-perfil {') + 80);
    assert.match(perfil, /min-height: 44px/);
    assert.match(app, /fim\.resumo \? h\('button', \{ class: 'btn btn-branco', type: 'button', onclick: telaResumo \}, 'RESUMO DA SEMANA'\)/);
    assert.match(app, /fim\.painel \? h\('button', \{ class: 'btn btn-branco', type: 'button', onclick: telaPainel \}, 'PAINEL DA FALA'\)/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        voltarTela\(fim\.destino \|\| telaConversa\);/);
    assert.match(app, /class: 'btn btn-verde', type: 'button', onclick: estudarNovas \}, 'ESTUDAR NOVAS'/);
    assert.match(app, /class: 'btn btn-verde', type: 'button', onclick: \(\) => abrirOuvido\(\) \}, 'TREINAR 4 CENAS'/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoParte\(/g) || []).length, 1);
  });
});
