import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  COMPACTAS, avaliarCompacta, DIARIOS, avaliarDiario, VAGOES, avaliarVagao
} = await import('../js/compacta.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoSete } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCompacta, registrarDiario, registrarVagao
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'compacta.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The call stack grew without end.',
  'The other side closed the pipe.',
  'The browser spun between two addresses.',
  'The network dropped two packets.',
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

describe('compactação, diário e vagão', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/compacta.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(COMPACTAS, ['Reescreve', 'Solta'], avaliarCompacta);
    conferir(DIARIOS, ['Ocupa', 'Segue'], avaliarDiario);
    conferir(VAGOES, ['Atrasa', 'Alcança'], avaliarVagao);
    const ids = [...COMPACTAS, ...DIARIOS, ...VAGOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const seis = COMPACTAS.find(c => c.id === 'seisarquivos').rodadas[0];
    assert.equal(avaliarCompacta(seis, 'Compaction rewrote 6 files.').ok, true);
    const quatro = DIARIOS.find(c => c.id === 'quatrogiga').rodadas[0];
    assert.equal(avaliarDiario(quatro, 'The log holds 4 gigabytes.').ok, true);
    const mil = VAGOES.find(c => c.id === 'milvagoes').rodadas[0];
    assert.equal(avaliarVagao(mil, 'The lag is 1000 messages.').ok, true);
    const texto = JSON.stringify({ COMPACTAS, DIARIOS, VAGOES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Compactação' && f.melhor === 'The store rewrote six old files.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Diário' && f.melhor === 'The write log filled up.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Vagão' && f.melhor === 'The reader sits a thousand messages behind.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['compacta', 'diario', 'vagao']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('compactação, diário e vagão contam no próprio contador', () => {
    travarMissao('compacta1');
    const compacta = registrarCompacta(fim());
    assert.equal(compacta.bonusMissoes, 15);
    assert.equal(estado.stats.compactas, 1);
    assert.equal(estado.stats.giros, 0);
    assert.equal(estado.stats.diarios, 0);
    assert.ok(estado.badges.includes('compacta'));
    for (const id of ['diario', 'vagao', 'giro', 'pilha']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('diario1');
    const diario = registrarDiario(fim());
    assert.equal(diario.bonusMissoes, 15);
    assert.equal(estado.stats.diarios, 1);
    assert.equal(estado.stats.compactas, 1);
    assert.ok(estado.badges.includes('diario'));

    travarMissao('vagao1');
    const vagao = registrarVagao(fim());
    assert.equal(vagao.bonusMissoes, 15);
    assert.equal(estado.stats.vagoes, 1);
    assert.equal(estado.stats.canos, 0);
    assert.ok(estado.badges.includes('vagao'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 220);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o sete conta os últimos 7 dias com fala', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDoSete(null, '2026-11-04');
    assert.equal(vazia.texto, 'Nenhum dos últimos 7 dias teve fala.');
    assert.equal(vazia.dias, 0);
    const invalida = textoDoSete({ '2026-11-04': { n: 1 } }, 'ontem');
    assert.equal(invalida.dias, null);
    assert.equal(invalida.texto, 'Ainda não há conta dos últimos 7 dias.');
    const um = textoDoSete({ '2026-11-04': { n: 1, segundos: 20 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.texto, '1 dos últimos 7 dias teve fala.');
    const soSegundos = textoDoSete({ '2026-11-02': { n: 0, segundos: 40 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    const dois = textoDoSete({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(dois.dias, 2);
    assert.equal(dois.texto, '2 dos últimos 7 dias tiveram fala.');
    const futuro = textoDoSete({
      '2026-11-04': { n: 1, segundos: 10 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    const zerado = textoDoSete({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
  });

  test('a versão 2.61 deixa a compactação fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.61'/);
    assert.match(data, /versao: '2\.60'/);
    assert.match(sw, /gringolingo-v88/);
    assert.match(sw, /\.\/js\/compacta\.js/);
    assert.match(turno, /compacta\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCompacta', 'pintarDiario', 'pintarVagao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaGiros'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCompactas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /compacta: telaCompactas/);
    assert.match(mapa, /diario: telaDiarios/);
    assert.match(mapa, /vagao: telaVagoes/);
    const sete = app.slice(app.indexOf('function cartaoSete'), app.indexOf('function blocoFluencia'));
    assert.match(sete, /fala-sete/);
    assert.match(sete, /VER A SEMANA/);
    assert.equal(sete.includes('function cartaoAuge'), false);
    assert.equal(sete.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-sete {'), css.indexOf('.fala-sete {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const cron = css.slice(css.indexOf('.cronometro-rapido,'), css.indexOf('.cronometro-rapido,') + 220);
    assert.match(cron, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick: \(\) => avancarPasseio\(geracao\)/);
    assert.match(app, /const enviar = h\('button', \{ class: 'btn btn-verde', type: 'button', disabled: true \}, 'ENVIAR'\)/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        if \(pratica\.i \+ 1 >= pratica\.fila\.length\)/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        if \(sessao\.i \+ 1 >= cena\.rodadas\.length\) \{\n          concluirCena\(sessao, registrarSotaque/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoSete\(/g) || []).length, 1);
  });
});
