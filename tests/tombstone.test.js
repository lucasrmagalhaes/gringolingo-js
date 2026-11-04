import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  TOMBSTONES, avaliarTombstone, PURGES, avaliarPurge, RECLAIMS, avaliarReclaim
} = await import('../js/tombstone.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { perguntaDoDia } = await import('../js/tecnico.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarTombstone, registrarPurge, registrarReclaim
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'tombstone.js') continue;
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

describe('tombstone, purge e reclaim', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/tombstone.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(TOMBSTONES, ['Marca', 'Segue'], avaliarTombstone);
    conferir(PURGES, ['Tira', 'Segue'], avaliarPurge);
    conferir(RECLAIMS, ['Volta', 'Segue'], avaliarReclaim);
    const ids = [...TOMBSTONES, ...PURGES, ...RECLAIMS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const tombstone = TOMBSTONES.find(c => c.id === 'tombstone2').rodadas[0];
    assert.equal(avaliarTombstone(tombstone, 'The tombstone marked 2 keys.').ok, true);
    const purge = PURGES.find(c => c.id === 'purge3').rodadas[0];
    assert.equal(avaliarPurge(purge, 'The purge removed 3 keys.').ok, true);
    const reclaim = RECLAIMS.find(c => c.id === 'reclaim4').rodadas[0];
    assert.equal(avaliarReclaim(reclaim, 'The reclaim returned 4 lists.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Tombstone' && f.melhor === 'The tombstone marks the deleted key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Purge' && f.melhor === 'The purge removes the dead key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Reclaim' && f.melhor === 'The reclaim returns space to the free list.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length >= 338, true);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length >= 282, true);
    for (const id of ['tombstone', 'purge', 'reclaim']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A pergunta'), false);
  });

  test('tombstone, purge e reclaim contam no próprio contador', () => {
    travarMissao('tombstone1');
    const tombstone = registrarTombstone(fim());
    assert.equal(tombstone.bonusMissoes, 15);
    assert.equal(estado.stats.tombstones, 1);
    assert.equal(estado.stats.purges, 0);
    assert.equal(estado.stats.reclaims, 0);
    assert.equal(estado.stats.fallbacks, 0);
    assert.ok(estado.badges.includes('tombstone'));
    for (const id of ['purge', 'reclaim', 'fallback']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('purge1');
    const purge = registrarPurge(fim());
    assert.equal(purge.bonusMissoes, 15);
    assert.equal(estado.stats.purges, 1);
    assert.equal(estado.stats.tombstones, 1);
    assert.ok(estado.badges.includes('purge'));

    travarMissao('reclaim1');
    const reclaim = registrarReclaim(fim());
    assert.equal(reclaim.bonusMissoes, 15);
    assert.equal(estado.stats.reclaims, 1);
    assert.equal(estado.stats.fallbacks, 0);
    assert.ok(estado.badges.includes('reclaim'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length >= 361, true);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a pergunta pede a fala de trabalho do dia', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDaPergunta(null).texto, 'Ainda não há pergunta para dizer.');
    assert.equal(textoDaPergunta({}).texto, 'Ainda não há pergunta para dizer.');
    assert.equal(textoDaPergunta({ rodadas: [] }).texto, 'Ainda não há pergunta para dizer.');
    assert.equal(textoDaPergunta({ rodadas: [{ npc: { pt: 'oi' }, melhor: 'Hi' }] }).texto, 'Ainda não há pergunta para dizer.');
    const hoje = textoDaPergunta(perguntaDoDia('2026-11-04'));
    const deNovo = textoDaPergunta(perguntaDoDia('2026-11-04'));
    assert.equal(hoje.en, deNovo.en);
    assert.equal(hoje.pt, deNovo.pt);
    assert.ok(hoje.en.length >= 8);
    assert.match(hoje.texto, /^A pergunta pede .+ Diga .+\.$/);
    const outro = textoDaPergunta(perguntaDoDia('2026-11-05'));
    assert.match(outro.texto, /^A pergunta pede /);
    const painel = semanaTrabalho();
    assert.equal(hoje.texto === textoDaPratica(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(hoje.texto === textoDoReforco(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(hoje.texto === textoDoRecado(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(hoje.texto === textoDaVez(TREINOS, ['sotaque'], {}).texto, false);
    assert.equal(hoje.texto === textoDoRetorno({
      'I am fine': { proxima: '2026-11-04', caixa: 0, pt: 'eu estou bem' }
    }, '2026-11-04', []).texto, false);
    assert.equal(hoje.texto === textoDaFicha([
      { en: 'hello', pt: 'olá', proxima: '2026-11-04', caixa: 0 }
    ], '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDoBaralho([
      { en: 'Could you repeat that?', pt: 'Você pode repetir isso?' }
    ], {}, '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDaSombraDia(FRASES_SOMBRA, '2026-11-04').texto, false);
  });

  test('a versão 3.08 deixa o tombstone fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.0\d'/);
    assert.match(data, /versao: '3\.08'/);
    assert.match(data, /versao: '3\.07'/);
    assert.match(sw, /gringolingo-v13\d/);
    assert.match(sw, /\.\/js\/tombstone\.js/);
    assert.match(turno, /tombstone\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarTombstone', 'pintarPurge', 'pintarReclaim']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarFallback'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaTombstones'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /tombstone: telaTombstones/);
    assert.match(mapa, /purge: telaPurges/);
    assert.match(mapa, /reclaim: telaReclaims/);
    const pergunta = app.slice(app.indexOf('function cartaoPergunta'), app.indexOf('function blocoFluencia'));
    assert.match(pergunta, /fala-pergunta/);
    assert.match(pergunta, /'A pergunta'/);
    assert.match(pergunta, /RESPONDER/);
    assert.equal(pergunta.includes('function cartaoSombra'), false);
    assert.equal(pergunta.includes('function cartaoBaralho'), false);
    const regra = css.slice(css.indexOf('.fala-pergunta {'), css.indexOf('.fala-pergunta {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const itemInicio = css.indexOf('\n.dic-item {');
    const item = css.slice(itemInicio, css.indexOf('}', itemInicio));
    assert.match(item, /flex-wrap: wrap/);
    assert.match(item, /max-width: 100%/);
    const enInicio = css.indexOf('\n.dic-en {');
    const en = css.slice(enInicio, css.indexOf('}', enInicio));
    assert.match(en, /overflow-wrap: anywhere/);
    const opcaoInicio = css.indexOf('\n.opcao {');
    const opcao = css.slice(opcaoInicio, css.indexOf('}', opcaoInicio));
    assert.match(opcao, /overflow-wrap: anywhere/);
    assert.match(opcao, /max-width: 100%/);
    assert.match(opcao, /min-height: 44px/);
    const fraseInicio = css.indexOf('\n.sombra-frase {');
    const frase = css.slice(fraseInicio, css.indexOf('}', fraseInicio));
    assert.match(frase, /overflow-wrap: anywhere/);
    assert.match(frase, /max-width: 100%/);
    assert.equal((app.match(/function cartaoPergunta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoSombra\(/g) || []).length, 1);
    assert.equal((app.match(/'A pergunta'/g) || []).length, 1);
    assert.equal((app.match(/'A sombra'/g) || []).length, 1);
  });
});
