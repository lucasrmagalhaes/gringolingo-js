import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  VECTORS, avaliarVector, DOTS, avaliarDot, CAUSALS, avaliarCausal
} = await import('../js/vector.js');
const { TREINOS, auditarCatalogo, textoDaEstrela } = await import('../js/hub.js');
const {
  textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarVector, registrarDot, registrarCausal
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'vector.js') continue;
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

describe('vector, dot e causal', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/vector.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(VECTORS, ['Marca', 'Segue'], avaliarVector);
    conferir(DOTS, ['Nomeia', 'Segue'], avaliarDot);
    conferir(CAUSALS, ['Chega', 'Segue'], avaliarCausal);
    const ids = [...VECTORS, ...DOTS, ...CAUSALS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const vector = VECTORS.find(c => c.id === 'vector2').rodadas[0];
    assert.equal(avaliarVector(vector, 'The vector clock ordered 2 facts.').ok, true);
    const dot = DOTS.find(c => c.id === 'dot3').rodadas[0];
    assert.equal(avaliarDot(dot, 'The dot named 3 writes.').ok, true);
    const causal = CAUSALS.find(c => c.id === 'causal4').rodadas[0];
    assert.equal(avaliarCausal(causal, 'The cause arrived before 4 effects.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Vector' && f.melhor === 'The vector clock orders the facts.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Dot' && f.melhor === 'The dot names one write.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Causal' && f.melhor === 'The cause arrives before the effect.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['vector', 'dot', 'causal']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A vez'), false);
  });

  test('vector, dot e causal contam no próprio contador', () => {
    travarMissao('vector1');
    const vector = registrarVector(fim());
    assert.equal(vector.bonusMissoes, 15);
    assert.equal(estado.stats.vectors, 1);
    assert.equal(estado.stats.dots, 0);
    assert.equal(estado.stats.causals, 0);
    assert.equal(estado.stats.orsets, 0);
    assert.ok(estado.badges.includes('vector'));
    for (const id of ['dot', 'causal', 'orset']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('dot1');
    const dot = registrarDot(fim());
    assert.equal(dot.bonusMissoes, 15);
    assert.equal(estado.stats.dots, 1);
    assert.equal(estado.stats.vectors, 1);
    assert.ok(estado.badges.includes('dot'));

    travarMissao('causal1');
    const causal = registrarCausal(fim());
    assert.equal(causal.bonusMissoes, 15);
    assert.equal(estado.stats.causals, 1);
    assert.equal(estado.stats.orsets, 0);
    assert.ok(estado.badges.includes('causal'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 346);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a vez abre o favorito que ainda não teve fala', () => {
    semTravessao('../js/semana.js');
    const vazio = textoDaVez(TREINOS, [], {});
    assert.equal(vazio.id, '');
    assert.equal(vazio.texto, 'A vez ainda não tem favorito.');
    assert.equal(textoDaVez(TREINOS, null, {}).texto, 'A vez ainda não tem favorito.');
    assert.equal(textoDaVez(null, ['sotaque'], {}).texto, 'A vez ainda não tem favorito.');
    const sotaque = textoDaVez(TREINOS, ['sotaque'], {});
    assert.equal(sotaque.id, 'sotaque');
    assert.equal(sotaque.titulo, 'Sotaques');
    assert.equal(sotaque.texto, 'A vez pede Sotaques. Americano, britânico e indiano.');
    assert.equal(/\d/.test(sotaque.texto), false);
    assert.equal(sotaque.texto === textoDaPratica({ '2026-11-04': { n: 1, segundos: 20, grupos: { trabalho: 1 } } }, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(sotaque.texto === textoDoReforco({ '2026-11-04': { n: 1, segundos: 20, grupos: { trabalho: 1 } } }, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(sotaque.texto === textoDoRecado({ '2026-11-04': { n: 1, segundos: 20, grupos: { trabalho: 1 } } }, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(sotaque.texto === textoDaEstrela(TREINOS, ['sotaque'], {}).texto, false);
    const modelo = TREINOS.find(t => t.id === 'modelo');
    const primeiro = textoDaVez(TREINOS, ['modelo', 'sotaque'], {});
    assert.equal(primeiro.id, 'modelo');
    const pulado = textoDaVez(TREINOS, ['modelo', 'sotaque', 'naoexiste'], { [modelo.stat]: 1 });
    assert.equal(pulado.id, 'sotaque');
    const feito = textoDaVez(TREINOS, ['sotaque'], { sotaques: 1 });
    assert.equal(feito.id, '');
    assert.equal(feito.texto, 'A vez já passou pelos favoritos.');
  });

  test('a versão 3.03 deixa o vector fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '3\.03'/);
    assert.match(data, /versao: '3\.02'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/vector\.js/);
    assert.match(turno, /vector\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarVector', 'pintarDot', 'pintarCausal']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaOrsets'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaVectors'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /vector: telaVectors/);
    assert.match(mapa, /dot: telaDots/);
    assert.match(mapa, /causal: telaCausals/);
    const vez = app.slice(app.indexOf('function cartaoVez'), app.indexOf('function blocoFluencia'));
    assert.match(vez, /fala-vez/);
    assert.match(vez, /A vez/);
    assert.match(vez, /COMEÇAR/);
    assert.equal(vez.includes('function cartaoRecado'), false);
    assert.equal(vez.includes('function cartaoReforco'), false);
    const regra = css.slice(css.indexOf('.fala-vez {'), css.indexOf('.fala-vez {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    assert.match(css, /\.hub-busca-linha \{[^}]*flex-wrap: wrap/);
    const campo = css.slice(css.indexOf('.hub-busca-linha .entrada {'), css.indexOf('.hub-busca-linha .entrada {') + 160);
    assert.match(campo, /min-width:/);
    assert.match(campo, /max-width: 100%/);
    const limpar = css.slice(css.indexOf('\n.busca-limpar {'), css.indexOf('\n.busca-limpar {') + 180);
    assert.match(limpar, /min-height: 44px/);
    assert.match(limpar, /max-width: 100%/);
    assert.equal((app.match(/function cartaoVez\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoRecado\(/g) || []).length, 1);
    assert.equal((app.match(/A vez/g) || []).length, 1);
    assert.equal((app.match(/O recado/g) || []).length, 1);
  });
});
