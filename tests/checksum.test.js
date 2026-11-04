import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CHECKSUMS, avaliarChecksum, BULKHEADS, avaliarBulkhead, FALLBACKS, avaliarFallback
} = await import('../js/checksum.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarChecksum, registrarBulkhead, registrarFallback
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'checksum.js') continue;
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

describe('checksum, bulkhead e fallback', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/checksum.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(CHECKSUMS, ['Confere', 'Segue'], avaliarChecksum);
    conferir(BULKHEADS, ['Isola', 'Segue'], avaliarBulkhead);
    conferir(FALLBACKS, ['Entra', 'Segue'], avaliarFallback);
    const ids = [...CHECKSUMS, ...BULKHEADS, ...FALLBACKS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const checksum = CHECKSUMS.find(c => c.id === 'checksum2').rodadas[0];
    assert.equal(avaliarChecksum(checksum, 'The checksum covered 2 blocks.').ok, true);
    const bulkhead = BULKHEADS.find(c => c.id === 'bulkhead3').rodadas[0];
    assert.equal(avaliarBulkhead(bulkhead, 'The bulkhead isolated 3 loads.').ok, true);
    const fallback = FALLBACKS.find(c => c.id === 'fallback4').rodadas[0];
    assert.equal(avaliarFallback(fallback, 'The fallback took 4 plans.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Checksum' && f.melhor === 'The checksum covers the whole block.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Bulkhead' && f.melhor === 'The bulkhead isolates the extra load.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Fallback' && f.melhor === 'The fallback takes the reserved plan.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length >= 335, true);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length >= 279, true);
    for (const id of ['checksum', 'bulkhead', 'fallback']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A sombra'), false);
  });

  test('checksum, bulkhead e fallback contam no próprio contador', () => {
    travarMissao('checksum1');
    const checksum = registrarChecksum(fim());
    assert.equal(checksum.bonusMissoes, 15);
    assert.equal(estado.stats.checksums, 1);
    assert.equal(estado.stats.bulkheads, 0);
    assert.equal(estado.stats.fallbacks, 0);
    assert.equal(estado.stats.learners, 0);
    assert.ok(estado.badges.includes('checksum'));
    for (const id of ['bulkhead', 'fallback', 'learner']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('bulkhead1');
    const bulkhead = registrarBulkhead(fim());
    assert.equal(bulkhead.bonusMissoes, 15);
    assert.equal(estado.stats.bulkheads, 1);
    assert.equal(estado.stats.checksums, 1);
    assert.ok(estado.badges.includes('bulkhead'));

    travarMissao('fallback1');
    const fallback = registrarFallback(fim());
    assert.equal(fallback.bonusMissoes, 15);
    assert.equal(estado.stats.fallbacks, 1);
    assert.equal(estado.stats.learners, 0);
    assert.ok(estado.badges.includes('fallback'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length >= 358, true);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a sombra pede a frase curta do dia para ouvir', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaSombraDia(FRASES_SOMBRA, 'ontem');
    assert.equal(invalido.en, '');
    assert.equal(invalido.texto, 'Ainda não há sombra para ouvir.');
    const vazio = textoDaSombraDia([], '2026-11-04');
    assert.equal(vazio.en, '');
    assert.equal(vazio.texto, 'A sombra ainda não tem frase.');
    assert.equal(textoDaSombraDia(null, '2026-11-04').texto, 'A sombra ainda não tem frase.');
    const curto = textoDaSombraDia([{ en: 'Hi', pt: 'oi' }], '2026-11-04');
    assert.equal(curto.texto, 'A sombra ainda não tem frase.');
    const hoje = textoDaSombraDia(FRASES_SOMBRA, '2026-11-04');
    const deNovo = textoDaSombraDia(FRASES_SOMBRA, '2026-11-04');
    assert.equal(hoje.en, deNovo.en);
    assert.equal(hoje.pt, deNovo.pt);
    assert.ok(FRASES_SOMBRA.some(f => f.en === hoje.en && f.pt === hoje.pt));
    assert.match(hoje.texto, /^A sombra pede .+ Ouça e diga .+\.$/);
    const outro = textoDaSombraDia(FRASES_SOMBRA, '2026-11-05');
    assert.ok(FRASES_SOMBRA.some(f => f.en === outro.en));
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
  });

  test('a versão 3.07 deixa o checksum fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.\d\d'/);
    assert.match(data, /versao: '3\.07'/);
    assert.match(data, /versao: '3\.06'/);
    assert.match(sw, /gringolingo-v1\d\d/);
    assert.match(sw, /\.\/js\/checksum\.js/);
    assert.match(turno, /checksum\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarChecksum', 'pintarBulkhead', 'pintarFallback']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarLearner'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaChecksums'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /checksum: telaChecksums/);
    assert.match(mapa, /bulkhead: telaBulkheads/);
    assert.match(mapa, /fallback: telaFallbacks/);
    const sombra = app.slice(app.indexOf('function cartaoSombra'), app.indexOf('function blocoFluencia'));
    assert.match(sombra, /fala-sombra/);
    assert.match(sombra, /A sombra/);
    assert.match(sombra, /OUVIR/);
    assert.equal(sombra.includes('function cartaoBaralho'), false);
    assert.equal(sombra.includes('function cartaoFicha'), false);
    const regra = css.slice(css.indexOf('.fala-sombra {'), css.indexOf('.fala-sombra {') + 120);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const missaoInicio = css.indexOf('\n.missao {');
    const missao = css.slice(missaoInicio, css.indexOf('}', missaoInicio));
    assert.match(missao, /flex-wrap: wrap/);
    assert.match(missao, /max-width: 100%/);
    assert.match(missao, /min-height: 44px/);
    const corpoInicio = css.indexOf('\n.missao-corpo {');
    const corpo = css.slice(corpoInicio, css.indexOf('}', corpoInicio));
    assert.match(corpo, /min-width: 0/);
    assert.match(corpo, /max-width: 100%/);
    const nomeInicio = css.indexOf('\n.missao-nome {');
    const nome = css.slice(nomeInicio, css.indexOf('}', nomeInicio));
    assert.match(nome, /overflow-wrap: anywhere/);
    assert.equal((app.match(/function cartaoSombra\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoBaralho\(/g) || []).length, 1);
    assert.equal((app.match(/'A sombra'/g) || []).length, 1);
    assert.equal((app.match(/O baralho/g) || []).length, 1);
  });
});
