import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  FLUSHES, avaliarFlush, MEMTABLES, avaliarMemtable, EXTENTS, avaliarExtent
} = await import('../js/flush.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoNumero, textoDoVerbo, textoDoSom, textoDaEscuta, textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { SONS, CLIPS } = await import('../js/pronuncia.js');
const { NUMEROS } = await import('../js/ensaio.js');
const { perguntaDoDia } = await import('../js/tecnico.js');
const { VERBOS, SUJEITOS } = await import('../js/data.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarFlush, registrarMemtable, registrarExtent
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'flush.js') continue;
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

describe('flush, memtable e extent', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/flush.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(FLUSHES, ['Desce', 'Segue'], avaliarFlush);
    conferir(MEMTABLES, ['Guarda', 'Segue'], avaliarMemtable);
    conferir(EXTENTS, ['Junta', 'Segue'], avaliarExtent);
    const ids = [...FLUSHES, ...MEMTABLES, ...EXTENTS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const flush = FLUSHES.find(c => c.id === 'flush2').rodadas[0];
    assert.equal(avaliarFlush(flush, 'The flush wrote 2 rows.').ok, true);
    const memtable = MEMTABLES.find(c => c.id === 'memtable3').rodadas[0];
    assert.equal(avaliarMemtable(memtable, 'The memtable held 3 rows.').ok, true);
    const extent = EXTENTS.find(c => c.id === 'extent4').rodadas[0];
    assert.equal(avaliarExtent(extent, 'The extent stored 4 pages.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Flush' && f.melhor === 'The flush writes the memory.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Memtable' && f.melhor === 'The memtable holds the row.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Extent' && f.melhor === 'The extent stores the page.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.ok(TREINOS.length >= 350);
    assert.ok(TREINOS.filter(t => t.categoria === 'trabalho').length >= 294);
    for (const id of ['flush', 'memtable', 'extent']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O número'), false);
  });

  test('flush, memtable e extent contam no próprio contador', () => {
    travarMissao('flush1');
    const flush = registrarFlush(fim());
    assert.equal(flush.bonusMissoes, 15);
    assert.equal(estado.stats.flushes, 1);
    assert.equal(estado.stats.memtables, 0);
    assert.equal(estado.stats.extents, 0);
    assert.equal(estado.stats.fences, 0);
    assert.ok(estado.badges.includes('flush'));
    for (const id of ['memtable', 'extent', 'fence']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('memtable1');
    const memtable = registrarMemtable(fim());
    assert.equal(memtable.bonusMissoes, 15);
    assert.equal(estado.stats.memtables, 1);
    assert.equal(estado.stats.flushes, 1);
    assert.ok(estado.badges.includes('memtable'));

    travarMissao('extent1');
    const extent = registrarExtent(fim());
    assert.equal(extent.bonusMissoes, 15);
    assert.equal(estado.stats.extents, 1);
    assert.equal(estado.stats.fences, 0);
    assert.ok(estado.badges.includes('extent'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 373);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o número pede o valor do dia para ouvir', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoNumero(null, '2026-11-04').texto, 'O número ainda não tem valor.');
    assert.equal(textoDoNumero([], '2026-11-04').texto, 'O número ainda não tem valor.');
    assert.equal(textoDoNumero([{ id: 'cafe', titulo: 'Café', pergunta: 'Quanto?' }], 'ontem').texto, 'Ainda não há número para ouvir.');
    assert.equal(textoDoNumero([{ id: 'X', titulo: 'Café', pergunta: 'Quanto?' }], '2026-11-04').texto, 'O número ainda não tem valor.');
    const hoje = textoDoNumero(NUMEROS, '2026-11-04');
    const deNovo = textoDoNumero(NUMEROS, '2026-11-04');
    assert.equal(hoje.id, deNovo.id);
    assert.equal(hoje.texto, deNovo.texto);
    assert.ok(NUMEROS.some(c => c.id === hoje.id));
    assert.match(hoje.texto, /^O número pede .+ Ouça .+\.$/);
    const outro = textoDoNumero(NUMEROS, '2026-11-05');
    assert.match(outro.texto, /^O número pede /);
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
    assert.equal(hoje.texto === textoDoSom(SONS, '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDoVerbo(VERBOS, SUJEITOS, '2026-11-04').texto, false);
  });

  test('a versão 3.12 deixa o flush fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.\d\d'/);
    assert.match(data, /versao: '3\.12'/);
    assert.match(data, /versao: '3\.11'/);
    assert.match(sw, /gringolingo-v1\d\d/);
    assert.match(sw, /\.\/js\/flush\.js/);
    assert.match(turno, /flush\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarFlush', 'pintarMemtable', 'pintarExtent']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarFence'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaFlushes'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /flush: telaFlushes/);
    assert.match(mapa, /memtable: telaMemtables/);
    assert.match(mapa, /extent: telaExtents/);
    const numero = app.slice(app.indexOf('function cartaoNumero('), app.indexOf('function blocoFluencia'));
    assert.match(numero, /fala-numero/);
    assert.match(numero, /'O número'/);
    assert.match(numero, /ESCOLHER/);
    assert.equal(numero.includes('function cartaoVerbo'), false);
    assert.equal(numero.includes('function cartaoSom'), false);
    const regra = css.slice(css.indexOf('.fala-numero {'), css.indexOf('.fala-numero {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const enInicio = css.indexOf('\n.enunciado {');
    const enun = css.slice(enInicio, css.indexOf('}', enInicio));
    assert.match(enun, /overflow-wrap: anywhere/);
    assert.match(enun, /max-width: 100%/);
    const promptInicio = css.indexOf('\n.prompt-card {');
    const prompt = css.slice(promptInicio, css.indexOf('}', promptInicio));
    assert.match(prompt, /flex-wrap: wrap/);
    assert.match(prompt, /max-width: 100%/);
    assert.equal((app.match(/function cartaoNumero\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoVerbo\(/g) || []).length, 1);
    assert.equal((app.match(/'O número'/g) || []).length, 1);
    assert.equal((app.match(/'O verbo'/g) || []).length, 1);
  });
});
