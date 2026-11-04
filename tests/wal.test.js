import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  WALS, avaliarWal, LSNS, avaliarLsn, CHECKPOINTS, avaliarCheckpoint
} = await import('../js/wal.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaMediana, textoDoSalto, textoDoLongo, textoDoCurto, textoDoMeio } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarWal, registrarLsn, registrarCheckpoint
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'wal.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'A lying node still lets the others agree.',
  'The lie reached two nodes.',
  'The split keeps the two sides apart.',
  'The split isolated three nodes.',
  'Both armies advance on the same order.',
  'The order reached four armies.',
  'The helper sits beside the service.',
  'Please keep'
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
      assert.ok(rodada.aceitas.length >= 2, cena.id);
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

describe('wal, lsn e checkpoint', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/wal.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(WALS, ['Grava', 'Segue'], avaliarWal);
    conferir(LSNS, ['Numera', 'Segue'], avaliarLsn);
    conferir(CHECKPOINTS, ['Marca', 'Fecha'], avaliarCheckpoint);
    const ids = [...WALS, ...LSNS, ...CHECKPOINTS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const wal = WALS.find(c => c.id === 'wal2').rodadas[0];
    assert.equal(avaliarWal(wal, 'The log stored 2 writes.').ok, true);
    const lsn = LSNS.find(c => c.id === 'lsn3').rodadas[0];
    assert.equal(avaliarLsn(lsn, 'The number climbed 3 steps.').ok, true);
    const checkpoint = CHECKPOINTS.find(c => c.id === 'checkpoint4').rodadas[0];
    assert.equal(avaliarCheckpoint(checkpoint, 'The checkpoint covered 4 records.').ok, true);
    const texto = JSON.stringify({ WALS, LSNS, CHECKPOINTS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Wal' && f.melhor === 'The write hits the log before the table.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Lsn' && f.melhor === 'The record number only moves forward.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Checkpoint' && f.melhor === 'The checkpoint stores a safe point.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['wal', 'lsn', 'checkpoint']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A mediana'), false);
  });

  test('wal, lsn e checkpoint contam no próprio contador', () => {
    travarMissao('wal1');
    const wal = registrarWal(fim());
    assert.equal(wal.bonusMissoes, 15);
    assert.equal(estado.stats.wals, 1);
    assert.equal(estado.stats.lsns, 0);
    assert.equal(estado.stats.checkpoints, 0);
    assert.equal(estado.stats.bizantinos, 0);
    assert.equal(estado.stats.generais, 0);
    assert.ok(estado.badges.includes('wal'));
    for (const id of ['lsn', 'checkpoint', 'bizantino', 'general']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('lsn1');
    const lsn = registrarLsn(fim());
    assert.equal(lsn.bonusMissoes, 15);
    assert.equal(estado.stats.lsns, 1);
    assert.equal(estado.stats.wals, 1);
    assert.ok(estado.badges.includes('lsn'));

    travarMissao('checkpoint1');
    const checkpoint = registrarCheckpoint(fim());
    assert.equal(checkpoint.bonusMissoes, 15);
    assert.equal(estado.stats.checkpoints, 1);
    assert.equal(estado.stats.bizantinos, 0);
    assert.ok(estado.badges.includes('checkpoint'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 310);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a mediana mede o segundo do meio, não a contagem de treinos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaMediana(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.mediana, 0);
    assert.equal(invalido.texto, 'Ainda não há mediana de treinos.');
    const vazio = textoDaMediana({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.mediana, 0);
    assert.equal(vazio.texto, 'A mediana dos dias ainda é 0 segundos.');
    const umSegundo = textoDaMediana({ '2026-11-04': { n: 1, segundos: 1 } }, '2026-11-04');
    assert.equal(umSegundo.dias, 1);
    assert.equal(umSegundo.mediana, 1);
    assert.equal(umSegundo.texto, 'A mediana dos dias é de 1 segundo.');
    const par = textoDaMediana({
      '2026-11-03': { n: 1, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.mediana, 50);
    assert.equal(par.texto, 'A mediana dos dias é de 50 segundos.');
    const semente = {
      '2026-10-31': { n: 1, segundos: 40 },
      '2026-11-01': { n: 1, segundos: 60 },
      '2026-11-02': { n: 1, segundos: 90 },
      '2026-11-03': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    };
    const cheio = textoDaMediana(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.mediana, 60);
    assert.equal(cheio.texto, 'A mediana dos dias é de 60 segundos.');
    assert.equal(textoDoSalto(semente, '2026-11-04').texto, 'O salto dos dias é de 560 segundos.');
    assert.equal(textoDoLongo(semente, '2026-11-04').texto, 'O longo dos dias é de 600 segundos.');
    assert.equal(textoDoCurto(semente, '2026-11-04').texto, 'O curto dos dias é de 40 segundos.');
    assert.equal(textoDoMeio(semente, '2026-11-04').texto, 'O meio dos dias é de 1 treino.');
    assert.equal(cheio.texto === textoDoMeio(semente, '2026-11-04').texto, false);
    const igual = textoDaMediana({
      '2026-11-03': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(igual.mediana, 60);
    assert.equal(igual.texto, 'A mediana dos dias é de 60 segundos.');
    const futuro = textoDaMediana({
      '2026-11-04': { n: 1, segundos: 90 },
      '2026-11-05': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.mediana, 90);
    assert.equal(futuro.texto, 'A mediana dos dias é de 90 segundos.');
    const mudo = textoDaMediana({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.mediana, 0);
    assert.equal(mudo.texto, 'A mediana dos dias é de 0 segundos.');
    const zerado = textoDaMediana({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.mediana, 0);
  });

  test('a versão 2.91 deixa o wal fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.91'/);
    assert.match(data, /versao: '2\.90'/);
    assert.match(sw, /gringolingo-v118/);
    assert.match(sw, /\.\/js\/wal\.js/);
    assert.match(turno, /wal\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarWal', 'pintarLsn', 'pintarCheckpoint']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaGenerais'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaWals'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /wal: telaWals/);
    assert.match(mapa, /lsn: telaLsns/);
    assert.match(mapa, /checkpoint: telaCheckpoints/);
    const mediana = app.slice(app.indexOf('function cartaoMediana'), app.indexOf('function blocoFluencia'));
    assert.match(mediana, /fala-mediana/);
    assert.match(mediana, /A mediana/);
    assert.match(mediana, /VER A SEMANA/);
    assert.equal(mediana.includes('function cartaoSalto'), false);
    assert.equal(mediana.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-mediana {'), css.indexOf('.fala-mediana {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const verbos = css.slice(css.indexOf('\n.verbos-atalho {'), css.indexOf('\n.verbos-atalho {') + 90);
    assert.match(verbos, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoMediana\(/g) || []).length, 1);
    assert.equal((app.match(/A mediana/g) || []).length, 1);
  });
});
