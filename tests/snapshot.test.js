import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SNAPSHOTS, avaliarSnapshot, RESTORES, avaliarRestore, PROMOTES, avaliarPromote
} = await import('../js/snapshot.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaAbertura, textoDaFaixa, textoDaVirada, textoDoCostume } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSnapshot, registrarRestore, registrarPromote
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'snapshot.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The reader marks how far it has read.',
  'The reader stays behind the writer.',
  'The reader confirms the part it read.',
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

describe('snapshot, restore e promote', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/snapshot.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SNAPSHOTS, ['Guarda', 'Segue'], avaliarSnapshot);
    conferir(RESTORES, ['Devolve', 'Segue'], avaliarRestore);
    conferir(PROMOTES, ['Eleva', 'Segue'], avaliarPromote);
    const ids = [...SNAPSHOTS, ...RESTORES, ...PROMOTES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const snapshot = SNAPSHOTS.find(c => c.id === 'snapshot2').rodadas[0];
    assert.equal(avaliarSnapshot(snapshot, 'The snapshot covered 2 banks.').ok, true);
    const restore = RESTORES.find(c => c.id === 'restore3').rodadas[0];
    assert.equal(avaliarRestore(restore, 'The restore returned 3 banks.').ok, true);
    const promote = PROMOTES.find(c => c.id === 'promote4').rodadas[0];
    assert.equal(avaliarPromote(promote, 'The promote raised 4 copies.').ok, true);
    const texto = JSON.stringify({ SNAPSHOTS, RESTORES, PROMOTES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Snapshot' && f.melhor === 'The photo keeps the bank at that moment.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Restore' && f.melhor === 'The photo returns the bank to the saved moment.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Promote' && f.melhor === 'The copy becomes the main bank.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['snapshot', 'restore', 'promote']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A abertura'), false);
  });

  test('snapshot, restore e promote contam no próprio contador', () => {
    travarMissao('snapshot1');
    const snapshot = registrarSnapshot(fim());
    assert.equal(snapshot.bonusMissoes, 15);
    assert.equal(estado.stats.snapshots, 1);
    assert.equal(estado.stats.restores, 0);
    assert.equal(estado.stats.promotes, 0);
    assert.equal(estado.stats.acks, 0);
    assert.equal(estado.stats.offsets, 0);
    assert.ok(estado.badges.includes('snapshot'));
    for (const id of ['restore', 'promote', 'ack', 'offset']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('restore1');
    const restore = registrarRestore(fim());
    assert.equal(restore.bonusMissoes, 15);
    assert.equal(estado.stats.restores, 1);
    assert.equal(estado.stats.snapshots, 1);
    assert.ok(estado.badges.includes('restore'));

    travarMissao('promote1');
    const promote = registrarPromote(fim());
    assert.equal(promote.bonusMissoes, 15);
    assert.equal(estado.stats.promotes, 1);
    assert.equal(estado.stats.acks, 0);
    assert.ok(estado.badges.includes('promote'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 325);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a abertura nomeia o dia da primeira fala, sem contar', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaAbertura(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.dia, null);
    assert.equal(invalido.texto, 'Ainda não há abertura de fala.');
    const vazio = textoDaAbertura({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.dia, null);
    assert.equal(vazio.texto, 'A abertura ainda não tem dia.');
    const um = textoDaAbertura({ '2026-11-04': { n: 1, segundos: 40 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.dia, 'quarta');
    assert.equal(um.texto, 'A abertura cai numa quarta.');
    assert.equal(um.texto.includes('segundos'), false);
    assert.equal(/\d/.test(um.texto), false);
    const semente = {
      '2026-10-31': { n: 1, segundos: 40, grupos: { trabalho: 1 } },
      '2026-11-01': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-02': { n: 1, segundos: 90, grupos: { trabalho: 1, entrevista: 1 } },
      '2026-11-03': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-04': { n: 1, segundos: 600, grupos: { trabalho: 1 } }
    };
    const cheio = textoDaAbertura(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.dia, 'sábado');
    assert.equal(cheio.texto, 'A abertura cai num sábado.');
    assert.equal(cheio.texto.includes('segundos'), false);
    assert.equal(/\d/.test(cheio.texto), false);
    assert.equal(textoDaFaixa(semente, '2026-11-04').texto, 'A faixa cobre 2 semanas.');
    assert.equal(textoDaVirada(semente, '2026-11-04').texto, 'A virada cobre 2 meses.');
    assert.equal(cheio.texto === textoDaFaixa(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDoCostume(semente, '2026-11-04').texto, false);
    const domingo = textoDaAbertura({ '2026-11-01': { n: 1, segundos: 5 } }, '2026-11-04');
    assert.equal(domingo.dia, 'domingo');
    assert.equal(domingo.texto, 'A abertura cai num domingo.');
    const segunda = textoDaAbertura({ '2026-11-02': { n: 1, segundos: 5 } }, '2026-11-04');
    assert.equal(segunda.texto, 'A abertura cai numa segunda.');
    const futuro = textoDaAbertura({
      '2026-11-04': { n: 1, segundos: 10 },
      '2026-11-08': { n: 1, segundos: 10 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.dia, 'quarta');
    const mudo = textoDaAbertura({
      '2026-10-31': { n: 0, segundos: 0 },
      '2026-11-02': { n: 1, segundos: 5 }
    }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.dia, 'segunda');
    assert.equal(mudo.texto, 'A abertura cai numa segunda.');
  });

  test('a versão 2.96 deixa o snapshot fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.96'/);
    assert.match(data, /versao: '2\.95'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/snapshot\.js/);
    assert.match(turno, /snapshot\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSnapshot', 'pintarRestore', 'pintarPromote']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaAcks'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSnapshots'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /snapshot: telaSnapshots/);
    assert.match(mapa, /restore: telaRestores/);
    assert.match(mapa, /promote: telaPromotes/);
    const abertura = app.slice(app.indexOf('function cartaoAbertura'), app.indexOf('function blocoFluencia'));
    assert.match(abertura, /fala-abertura/);
    assert.match(abertura, /A abertura/);
    assert.match(abertura, /VER A SEMANA/);
    assert.equal(abertura.includes('function cartaoFaixa'), false);
    assert.equal(abertura.includes('function cartaoVirada'), false);
    const regra = css.slice(css.indexOf('.fala-abertura {'), css.indexOf('.fala-abertura {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const filtros = css.slice(css.indexOf('\n.dic-filtros {'), css.indexOf('\n.dic-filtros {') + 120);
    assert.match(filtros, /flex-wrap: wrap/);
    assert.match(filtros, /max-width: 100%/);
    assert.equal((app.match(/function cartaoFaixa\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoAbertura\(/g) || []).length, 1);
    assert.equal((app.match(/A abertura/g) || []).length, 1);
  });
});
