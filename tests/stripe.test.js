import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  STRIPES, avaliarStripe, PARITIES, avaliarParity, REBUILDS, avaliarRebuild
} = await import('../js/stripe.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoSom, textoDaEscuta, textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { SONS, CLIPS } = await import('../js/pronuncia.js');
const { perguntaDoDia } = await import('../js/tecnico.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarStripe, registrarParity, registrarRebuild
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'stripe.js') continue;
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

describe('stripe, parity e rebuild', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/stripe.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(STRIPES, ['Espalha', 'Segue'], avaliarStripe);
    conferir(PARITIES, ['Recupera', 'Segue'], avaliarParity);
    conferir(REBUILDS, ['Refaz', 'Segue'], avaliarRebuild);
    const ids = [...STRIPES, ...PARITIES, ...REBUILDS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const stripe = STRIPES.find(c => c.id === 'stripe2').rodadas[0];
    assert.equal(avaliarStripe(stripe, 'The stripe spread 2 blocks.').ok, true);
    const parity = PARITIES.find(c => c.id === 'parity3').rodadas[0];
    assert.equal(avaliarParity(parity, 'The parity recovered 3 copies.').ok, true);
    const rebuild = REBUILDS.find(c => c.id === 'rebuild4').rodadas[0];
    assert.equal(avaliarRebuild(rebuild, 'The rebuild restored 4 disks.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Stripe' && f.melhor === 'The stripe spreads the block.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Parity' && f.melhor === 'The parity recovers the data.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Rebuild' && f.melhor === 'The rebuild rewrites the disk.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.ok(TREINOS.length >= 344);
    assert.ok(TREINOS.filter(t => t.categoria === 'trabalho').length >= 288);
    for (const id of ['stripe', 'parity', 'rebuild']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O som'), false);
  });

  test('stripe, parity e rebuild contam no próprio contador', () => {
    travarMissao('stripe1');
    const stripe = registrarStripe(fim());
    assert.equal(stripe.bonusMissoes, 15);
    assert.equal(estado.stats.stripes, 1);
    assert.equal(estado.stats.parities, 0);
    assert.equal(estado.stats.rebuilds, 0);
    assert.equal(estado.stats.spills, 0);
    assert.ok(estado.badges.includes('stripe'));
    for (const id of ['parity', 'rebuild', 'spill']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('parity1');
    const parity = registrarParity(fim());
    assert.equal(parity.bonusMissoes, 15);
    assert.equal(estado.stats.parities, 1);
    assert.equal(estado.stats.stripes, 1);
    assert.ok(estado.badges.includes('parity'));

    travarMissao('rebuild1');
    const rebuild = registrarRebuild(fim());
    assert.equal(rebuild.bonusMissoes, 15);
    assert.equal(estado.stats.rebuilds, 1);
    assert.equal(estado.stats.spills, 0);
    assert.ok(estado.badges.includes('rebuild'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 367);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o som pede o par do dia para treinar', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoSom(null, '2026-11-04').texto, 'O som ainda não tem par.');
    assert.equal(textoDoSom([], '2026-11-04').texto, 'O som ainda não tem par.');
    assert.equal(textoDoSom([{ id: 'th', titulo: 'TH', pares: [{ a: 'think', b: 'sink' }] }], 'ontem').texto, 'Ainda não há som para ouvir.');
    assert.equal(textoDoSom([{ id: 'X', titulo: 'TH', pares: [{ a: 'think', b: 'sink' }] }], '2026-11-04').texto, 'O som ainda não tem par.');
    const hoje = textoDoSom(SONS, '2026-11-04');
    const deNovo = textoDoSom(SONS, '2026-11-04');
    assert.equal(hoje.id, deNovo.id);
    assert.equal(hoje.texto, deNovo.texto);
    assert.ok(SONS.some(c => c.id === hoje.id));
    assert.match(hoje.texto, /^O som pede .+ e .+\. Ouça .+\.$/);
    const outro = textoDoSom(SONS, '2026-11-05');
    assert.match(outro.texto, /^O som pede /);
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
    assert.equal(hoje.texto === textoDaPergunta(perguntaDoDia('2026-11-04')).texto, false);
    assert.equal(hoje.texto === textoDaEscuta(CLIPS, '2026-11-04').texto, false);
  });

  test('a versão 3.10 deixa o stripe fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.\d\d'/);
    assert.match(data, /versao: '3\.10'/);
    assert.match(data, /versao: '3\.09'/);
    assert.match(sw, /gringolingo-v13\d/);
    assert.match(sw, /\.\/js\/stripe\.js/);
    assert.match(turno, /stripe\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarStripe', 'pintarParity', 'pintarRebuild']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarSpill'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaStripes'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /stripe: telaStripes/);
    assert.match(mapa, /parity: telaParities/);
    assert.match(mapa, /rebuild: telaRebuilds/);
    const som = app.slice(app.indexOf('function cartaoSom('), app.indexOf('function blocoFluencia'));
    assert.match(som, /fala-som/);
    assert.match(som, /'O som'/);
    assert.match(som, /TREINAR/);
    assert.equal(som.includes('function cartaoEscuta'), false);
    assert.equal(som.includes('function cartaoPergunta'), false);
    const regra = css.slice(css.indexOf('.fala-som {'), css.indexOf('.fala-som {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const tileInicio = css.indexOf('\n.tile {');
    const tile = css.slice(tileInicio, css.indexOf('}', tileInicio));
    assert.match(tile, /overflow-wrap: anywhere/);
    assert.match(tile, /max-width: 100%/);
    const paresInicio = css.indexOf('\n.pares {');
    const pares = css.slice(paresInicio, css.indexOf('}', paresInicio));
    assert.match(pares, /minmax/);
    assert.match(pares, /max-width: 100%/);
    assert.equal((app.match(/function cartaoSom\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoEscuta\(/g) || []).length, 1);
    assert.equal((app.match(/'O som'/g) || []).length, 1);
    assert.equal((app.match(/'A escuta'/g) || []).length, 1);
    assert.equal((app.match(/'A pergunta'/g) || []).length, 1);
  });
});
