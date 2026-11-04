import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  MERKLES, avaliarMerkle, RADIXES, avaliarRadix, TRIES, avaliarTrie
} = await import('../js/merkle.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoFecho, textoDaAbertura, textoDaEstacao, textoDaFaixa, textoDoCostume
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarMerkle, registrarRadix, registrarTrie
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'merkle.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

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

describe('merkle, radix e trie', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/merkle.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(MERKLES, ['Sela', 'Segue'], avaliarMerkle);
    conferir(RADIXES, ['Corta', 'Segue'], avaliarRadix);
    conferir(TRIES, ['Guarda', 'Segue'], avaliarTrie);
    const ids = [...MERKLES, ...RADIXES, ...TRIES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const merkle = MERKLES.find(c => c.id === 'merkle2').rodadas[0];
    assert.equal(avaliarMerkle(merkle, 'The merkle sealed 2 leaves.').ok, true);
    const radix = RADIXES.find(c => c.id === 'radix3').rodadas[0];
    assert.equal(avaliarRadix(radix, 'The radix cut 3 prefixes.').ok, true);
    const trie = TRIES.find(c => c.id === 'trie4').rodadas[0];
    assert.equal(avaliarTrie(trie, 'The trie stored 4 words.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Merkle' && f.melhor === 'The tree seals the leaves in one stamp.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Radix' && f.melhor === 'The tree cuts the shared prefix.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Trie' && f.melhor === 'The tree stores the word letter by letter.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['merkle', 'radix', 'trie']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O fecho'), false);
  });

  test('merkle, radix e trie contam no próprio contador', () => {
    travarMissao('merkle1');
    const merkle = registrarMerkle(fim());
    assert.equal(merkle.bonusMissoes, 15);
    assert.equal(estado.stats.merkles, 1);
    assert.equal(estado.stats.radixes, 0);
    assert.equal(estado.stats.tries, 0);
    assert.equal(estado.stats.esbocos, 0);
    assert.equal(estado.stats.blooms, 0);
    assert.ok(estado.badges.includes('merkle'));
    for (const id of ['radix', 'trie', 'esboco', 'bloom']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('radix1');
    const radix = registrarRadix(fim());
    assert.equal(radix.bonusMissoes, 15);
    assert.equal(estado.stats.radixes, 1);
    assert.equal(estado.stats.merkles, 1);
    assert.ok(estado.badges.includes('radix'));

    travarMissao('trie1');
    const trie = registrarTrie(fim());
    assert.equal(trie.bonusMissoes, 15);
    assert.equal(estado.stats.tries, 1);
    assert.equal(estado.stats.esbocos, 0);
    assert.ok(estado.badges.includes('trie'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 331);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o fecho nomeia o dia da última fala, sem contar', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoFecho(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.dia, null);
    assert.equal(invalido.texto, 'Ainda não há fecho de fala.');
    const vazio = textoDoFecho({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.dia, null);
    assert.equal(vazio.texto, 'O fecho ainda não tem dia.');
    const um = textoDoFecho({ '2026-11-04': { n: 1, segundos: 40 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.dia, 'quarta');
    assert.equal(um.texto, 'O fecho cai numa quarta.');
    assert.equal(um.texto.includes('segundos'), false);
    assert.equal(/\d/.test(um.texto), false);
    const semente = {
      '2026-10-31': { n: 1, segundos: 40, grupos: { trabalho: 1 } },
      '2026-11-01': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-02': { n: 1, segundos: 90, grupos: { trabalho: 1, entrevista: 1 } },
      '2026-11-03': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-04': { n: 1, segundos: 600, grupos: { trabalho: 1 } }
    };
    const cheio = textoDoFecho(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.dia, 'quarta');
    assert.equal(cheio.texto, 'O fecho cai numa quarta.');
    assert.equal(cheio.texto.includes('segundos'), false);
    assert.equal(/\d/.test(cheio.texto), false);
    assert.equal(cheio.texto === textoDaAbertura(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDaEstacao(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDaFaixa(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDoCostume(semente, '2026-11-04').texto, false);
    const domingo = textoDoFecho({ '2026-11-01': { n: 1, segundos: 5 } }, '2026-11-04');
    assert.equal(domingo.dia, 'domingo');
    assert.equal(domingo.texto, 'O fecho cai num domingo.');
    const segunda = textoDoFecho({ '2026-11-02': { n: 1, segundos: 5 } }, '2026-11-04');
    assert.equal(segunda.texto, 'O fecho cai numa segunda.');
    const ultima = textoDoFecho({
      '2026-10-31': { n: 1, segundos: 5 },
      '2026-11-04': { n: 1, segundos: 5 }
    }, '2026-11-04');
    assert.equal(ultima.dia, 'quarta');
    assert.equal(textoDaAbertura(semente, '2026-11-04').dia, 'sábado');
    const futuro = textoDoFecho({
      '2026-11-02': { n: 1, segundos: 10 },
      '2026-11-08': { n: 1, segundos: 10 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.dia, 'segunda');
    const mudo = textoDoFecho({
      '2026-11-04': { n: 0, segundos: 0 },
      '2026-11-01': { n: 1, segundos: 5 }
    }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.dia, 'domingo');
    assert.equal(mudo.texto, 'O fecho cai num domingo.');
  });

  test('a versão 2.98 deixa o merkle fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.98'/);
    assert.match(data, /versao: '2\.97'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/merkle\.js/);
    assert.match(turno, /merkle\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarMerkle', 'pintarRadix', 'pintarTrie']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaEsbocos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaMerkles'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /merkle: telaMerkles/);
    assert.match(mapa, /radix: telaRadixes/);
    assert.match(mapa, /trie: telaTries/);
    const fecho = app.slice(app.indexOf('function cartaoFecho'), app.indexOf('function blocoFluencia'));
    assert.match(fecho, /fala-fecho/);
    assert.match(fecho, /O fecho/);
    assert.match(fecho, /VER A SEMANA/);
    assert.equal(fecho.includes('function cartaoEstacao'), false);
    assert.equal(fecho.includes('function cartaoAbertura'), false);
    const regra = css.slice(css.indexOf('.fala-fecho {'), css.indexOf('.fala-fecho {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const voz = css.slice(css.indexOf('.voz-linha > .metas {'), css.indexOf('.voz-linha > .metas {') + 120);
    assert.match(voz, /flex-wrap: wrap/);
    assert.match(voz, /max-width: 100%/);
    assert.equal((app.match(/function cartaoEstacao\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoFecho\(/g) || []).length, 1);
    assert.equal((app.match(/O fecho/g) || []).length, 1);
  });
});
