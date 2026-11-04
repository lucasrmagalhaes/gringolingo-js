import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SHARDS, avaliarShard, REBALANCES, avaliarRebalance, SPLITS, avaliarSplit
} = await import('../js/shard.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarShard, registrarRebalance, registrarSplit
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'shard.js') continue;
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

function semanaTrabalho() {
  return { '2026-11-04': { n: 1, segundos: 20, grupos: { trabalho: 1 } } };
}

describe('shard, rebalance e split', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/shard.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SHARDS, ['Guarda', 'Segue'], avaliarShard);
    conferir(REBALANCES, ['Troca', 'Segue'], avaliarRebalance);
    conferir(SPLITS, ['Divide', 'Segue'], avaliarSplit);
    const ids = [...SHARDS, ...REBALANCES, ...SPLITS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const shard = SHARDS.find(c => c.id === 'shard2').rodadas[0];
    assert.equal(avaliarShard(shard, 'The shard stored 2 parts.').ok, true);
    const rebalance = REBALANCES.find(c => c.id === 'rebalance3').rodadas[0];
    assert.equal(avaliarRebalance(rebalance, 'The rebalance moved 3 parts.').ok, true);
    const split = SPLITS.find(c => c.id === 'split4').rodadas[0];
    assert.equal(avaliarSplit(split, 'The split divided 4 parts.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Shard' && f.melhor === 'The shard stores one part of the key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Rebalance' && f.melhor === 'The rebalance moves the load.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Split' && f.melhor === 'The split divides the full part.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['shard', 'rebalance', 'split']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O retorno'), false);
  });

  test('shard, rebalance e split contam no próprio contador', () => {
    travarMissao('shard1');
    const shard = registrarShard(fim());
    assert.equal(shard.bonusMissoes, 15);
    assert.equal(estado.stats.shards, 1);
    assert.equal(estado.stats.rebalances, 0);
    assert.equal(estado.stats.splits, 0);
    assert.equal(estado.stats.causals, 0);
    assert.ok(estado.badges.includes('shard'));
    for (const id of ['rebalance', 'split', 'causal']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('rebalance1');
    const rebalance = registrarRebalance(fim());
    assert.equal(rebalance.bonusMissoes, 15);
    assert.equal(estado.stats.rebalances, 1);
    assert.equal(estado.stats.shards, 1);
    assert.ok(estado.badges.includes('rebalance'));

    travarMissao('split1');
    const split = registrarSplit(fim());
    assert.equal(split.bonusMissoes, 15);
    assert.equal(estado.stats.splits, 1);
    assert.equal(estado.stats.causals, 0);
    assert.ok(estado.badges.includes('split'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 349);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o retorno pede a frase de fala que já venceu', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoRetorno({}, 'ontem', []);
    assert.equal(invalido.id, '');
    assert.equal(invalido.texto, 'Ainda não há retorno de fala.');
    const vazio = textoDoRetorno({}, '2026-11-04', []);
    assert.equal(vazio.id, '');
    assert.equal(vazio.texto, 'O retorno ainda não tem frase.');
    assert.equal(textoDoRetorno(null, '2026-11-04', []).texto, 'O retorno ainda não tem frase.');
    const curto = textoDoRetorno({ Hi: { proxima: '2026-11-04', caixa: 0, pt: '' } }, '2026-11-04', []);
    assert.equal(curto.texto, 'O retorno ainda não tem frase.');
    const futuro = textoDoRetorno({
      'I am fine': { proxima: '2026-11-08', caixa: 0, pt: 'eu estou bem' }
    }, '2026-11-04', [{ en: 'I am fine', n: 2 }]);
    assert.equal(futuro.id, '');
    assert.equal(futuro.texto, 'O retorno espera a próxima frase.');
    const agenda = {
      'I am fine': { proxima: '2026-11-04', caixa: 0, pt: 'eu estou bem' },
      'See you soon': { proxima: '2026-11-03', caixa: 0, pt: 'até logo' }
    };
    const fino = textoDoRetorno(agenda, '2026-11-04', [
      { en: 'I am fine', n: 3 },
      { en: 'See you soon', n: 1 }
    ]);
    assert.equal(fino.id, 'deslize');
    assert.equal(fino.en, 'I am fine');
    assert.equal(fino.texto, 'O retorno pede I am fine.');
    assert.equal(/\d/.test(fino.texto), false);
    const painel = semanaTrabalho();
    assert.equal(fino.texto === textoDaPratica(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(fino.texto === textoDoReforco(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(fino.texto === textoDoRecado(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(fino.texto === textoDaVez(TREINOS, ['sotaque'], {}).texto, false);
    const empate = textoDoRetorno(agenda, '2026-11-04', []);
    assert.equal(empate.en, 'See you soon');
    assert.equal(empate.texto, 'O retorno pede See you soon.');
  });

  test('a versão 3.04 deixa o shard fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '3\.04'/);
    assert.match(data, /versao: '3\.03'/);
    assert.match(sw, /gringolingo-v131/);
    assert.match(sw, /\.\/js\/shard\.js/);
    assert.match(turno, /shard\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarShard', 'pintarRebalance', 'pintarSplit']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCausals'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaShards'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /shard: telaShards/);
    assert.match(mapa, /rebalance: telaRebalances/);
    assert.match(mapa, /split: telaSplits/);
    const retorno = app.slice(app.indexOf('function cartaoRetorno'), app.indexOf('function blocoFluencia'));
    assert.match(retorno, /fala-retorno/);
    assert.match(retorno, /O retorno/);
    assert.match(retorno, /COMEÇAR/);
    assert.equal(retorno.includes('function cartaoVez'), false);
    assert.equal(retorno.includes('function cartaoRecado'), false);
    const regra = css.slice(css.indexOf('.fala-retorno {'), css.indexOf('.fala-retorno {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const metasInicio = css.indexOf('\n.metas {');
    const metas = css.slice(metasInicio, css.indexOf('}', metasInicio));
    assert.match(metas, /flex-wrap: wrap/);
    assert.match(metas, /max-width: 100%/);
    const opcaoInicio = css.indexOf('\n.meta-opcao {');
    const opcao = css.slice(opcaoInicio, css.indexOf('}', opcaoInicio));
    assert.match(opcao, /min-height: 44px/);
    assert.match(opcao, /max-width: 100%/);
    assert.equal((app.match(/function cartaoRetorno\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoVez\(/g) || []).length, 1);
    assert.equal((app.match(/O retorno/g) || []).length, 1);
    assert.equal((app.match(/A vez/g) || []).length, 1);
  });
});
