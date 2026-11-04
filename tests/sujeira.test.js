import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SUJEIRAS, avaliarSujeira, INSTANTANEOS, avaliarInstantaneo, SERIAIS, avaliarSerial
} = await import('../js/sujeira.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoGrao } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSujeira, registrarInstantaneo, registrarSerial
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'sujeira.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The leader guides the term.',
  'Each election raises the term.',
  'The follower copies the log.',
  'The write waits for a majority.',
  'More than half must confirm.',
  'The arbiter breaks the tie.',
  'The key lives outside the app.',
  'The pass only works for the right service.',
  'The old pass stops working at once.',
  'The orchestrator fires the sequence.',
  'The neighbor picks the next step.',
  'The failure undoes the previous step.',
  'The primary accepts the new write.',
  'The mirror follows without writing.',
  'The copy becomes primary when the owner falls.',
  'The write reaches the disk at once.',
  'The dirty page waits in the cache.',
  'The large write skips the cache.',
  'The nodes spread the state by rumor.',
  'The read repairs the old copy.',
  'The neighbor holds the write until the owner returns.',
  'The flake builds the id from the clock.',
  'The epoch rises when the membership changes.',
  'The vector records what this node saw.'
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

describe('sujeira, instantâneo e serial', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/sujeira.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SUJEIRAS, ['Pega', 'Espera'], avaliarSujeira);
    conferir(INSTANTANEOS, ['Congela', 'Segue'], avaliarInstantaneo);
    conferir(SERIAIS, ['Ordena', 'Fecha'], avaliarSerial);
    const ids = [...SUJEIRAS, ...INSTANTANEOS, ...SERIAIS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const sujeira = SUJEIRAS.find(c => c.id === 'sujeira2').rodadas[0];
    assert.equal(avaliarSujeira(sujeira, 'The dirty read saw 2 values.').ok, true);
    const instantaneo = INSTANTANEOS.find(c => c.id === 'instantaneo3').rodadas[0];
    assert.equal(avaliarInstantaneo(instantaneo, 'The snapshot froze 3 rows.').ok, true);
    const serial = SERIAIS.find(c => c.id === 'serial4').rodadas[0];
    assert.equal(avaliarSerial(serial, 'The order covered 4 transactions.').ok, true);
    const texto = JSON.stringify({ SUJEIRAS, INSTANTANEOS, SERIAIS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Sujeira' && f.melhor === 'The read sees a value that is not committed.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Instantâneo' && f.melhor === 'The snapshot freezes the rows at the start.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Serial' && f.melhor === 'The result matches one serial order.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['sujeira', 'instantaneo', 'serial']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('sujeira, instantâneo e serial contam no próprio contador', () => {
    travarMissao('sujeira1');
    const sujeira = registrarSujeira(fim());
    assert.equal(sujeira.bonusMissoes, 15);
    assert.equal(estado.stats.sujeiras, 1);
    assert.equal(estado.stats.instantaneos, 0);
    assert.equal(estado.stats.seriais, 0);
    assert.equal(estado.stats.flocos, 0);
    assert.equal(estado.stats.vetores, 0);
    assert.ok(estado.badges.includes('sujeira'));
    for (const id of ['instantaneo', 'serial', 'floco', 'vetor']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('instantaneo1');
    const instantaneo = registrarInstantaneo(fim());
    assert.equal(instantaneo.bonusMissoes, 15);
    assert.equal(estado.stats.instantaneos, 1);
    assert.equal(estado.stats.sujeiras, 1);
    assert.ok(estado.badges.includes('instantaneo'));

    travarMissao('serial1');
    const serial = registrarSerial(fim());
    assert.equal(serial.bonusMissoes, 15);
    assert.equal(estado.stats.seriais, 1);
    assert.equal(estado.stats.vetores, 0);
    assert.ok(estado.badges.includes('serial'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 298);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o grão mede os segundos médios de cada dia com fala', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoGrao(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há grão de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.grao, 0);
    const vazio = textoDoGrao({}, '2026-11-04');
    assert.equal(vazio.texto, 'O grão dos dias ainda é 0 segundos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.grao, 0);
    const umSegundo = textoDoGrao({ '2026-11-04': { n: 1, segundos: 1 } }, '2026-11-04');
    assert.equal(umSegundo.dias, 1);
    assert.equal(umSegundo.grao, 1);
    assert.equal(umSegundo.texto, 'O grão dos dias é de 1 segundo.');
    const parelho = textoDoGrao({
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(parelho.dias, 2);
    assert.equal(parelho.grao, 60);
    assert.equal(parelho.texto, 'O grão dos dias é de 60 segundos.');
    const meio = textoDoGrao({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(meio.dias, 2);
    assert.equal(meio.grao, 50);
    assert.equal(meio.texto, 'O grão dos dias é de 50 segundos.');
    const igual = textoDoGrao({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.grao, 170);
    assert.equal(igual.texto, 'O grão dos dias é de 170 segundos.');
    const futuro = textoDoGrao({
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.grao, 90);
    assert.equal(futuro.texto, 'O grão dos dias é de 90 segundos.');
    const mudo = textoDoGrao({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.grao, 0);
    assert.equal(mudo.texto, 'O grão dos dias é de 0 segundos.');
    const zerado = textoDoGrao({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.grao, 0);
  });

  test('a versão 2.87 deixa a sujeira fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.87'/);
    assert.match(data, /versao: '2\.86'/);
    assert.match(sw, /gringolingo-v114/);
    assert.match(sw, /\.\/js\/sujeira\.js/);
    assert.match(turno, /sujeira\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSujeira', 'pintarInstantaneo', 'pintarSerial']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaVetores'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSujeiras'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /sujeira: telaSujeiras/);
    assert.match(mapa, /instantaneo: telaInstantaneos/);
    assert.match(mapa, /serial: telaSeriais/);
    const grao = app.slice(app.indexOf('function cartaoGrao'), app.indexOf('function blocoFluencia'));
    assert.match(grao, /fala-grao/);
    assert.match(grao, /VER A SEMANA/);
    assert.equal(grao.includes('function cartaoResto'), false);
    assert.equal(grao.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-grao {'), css.indexOf('.fala-grao {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const card = css.slice(css.indexOf('\n.card {'), css.indexOf('\n.card {') + 80);
    assert.match(card, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoGrao\(/g) || []).length, 1);
  });
});
