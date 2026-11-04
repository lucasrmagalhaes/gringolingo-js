import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SSTABLES, avaliarSstable, LATCHES, avaliarLatch, THROTTLES, avaliarThrottle
} = await import('../js/sstable.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaExpressao, textoDaReducao, textoDoNumero, textoDoVerbo, textoDoSom, textoDaEscuta, textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { SONS, CLIPS } = await import('../js/pronuncia.js');
const { NUMEROS } = await import('../js/ensaio.js');
const { REDUCOES, FRASAIS } = await import('../js/fluencia.js');
const { perguntaDoDia } = await import('../js/tecnico.js');
const { VERBOS, SUJEITOS } = await import('../js/data.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSstable, registrarLatch, registrarThrottle
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'sstable.js') continue;
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

describe('sstable, latch e throttle', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/sstable.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(SSTABLES, ['Ordena', 'Segue'], avaliarSstable);
    conferir(LATCHES, ['Segura', 'Segue'], avaliarLatch);
    conferir(THROTTLES, ['Limita', 'Segue'], avaliarThrottle);
    const ids = [...SSTABLES, ...LATCHES, ...THROTTLES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const sstable = SSTABLES.find(c => c.id === 'sstable2').rodadas[0];
    assert.equal(avaliarSstable(sstable, 'The sstable sorted 2 keys.').ok, true);
    const latch = LATCHES.find(c => c.id === 'latch3').rodadas[0];
    assert.equal(avaliarLatch(latch, 'The latch held 3 reads.').ok, true);
    const throttle = THROTTLES.find(c => c.id === 'throttle4').rodadas[0];
    assert.equal(avaliarThrottle(throttle, 'The throttle limited 4 calls.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Sstable' && f.melhor === 'The sstable sorts the key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Latch' && f.melhor === 'The latch holds the read.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Throttle' && f.melhor === 'The throttle limits the call.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 356);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 300);
    for (const id of ['sstable', 'latch', 'throttle']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A expressão'), false);
  });

  test('sstable, latch e throttle contam no próprio contador', () => {
    travarMissao('sstable1');
    const sstable = registrarSstable(fim());
    assert.equal(sstable.bonusMissoes, 15);
    assert.equal(estado.stats.sstables, 1);
    assert.equal(estado.stats.latches, 0);
    assert.equal(estado.stats.throttles, 0);
    assert.equal(estado.stats.debounces, 0);
    assert.ok(estado.badges.includes('sstable'));
    for (const id of ['latch', 'throttle', 'debounce']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('latch1');
    const latch = registrarLatch(fim());
    assert.equal(latch.bonusMissoes, 15);
    assert.equal(estado.stats.latches, 1);
    assert.equal(estado.stats.sstables, 1);
    assert.ok(estado.badges.includes('latch'));

    travarMissao('throttle1');
    const throttle = registrarThrottle(fim());
    assert.equal(throttle.bonusMissoes, 15);
    assert.equal(estado.stats.throttles, 1);
    assert.equal(estado.stats.debounces, 0);
    assert.ok(estado.badges.includes('throttle'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 379);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a expressão pede a frase do dia para dizer', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDaExpressao(null, '2026-11-04').texto, 'A expressão ainda não tem frase.');
    assert.equal(textoDaExpressao([], '2026-11-04').texto, 'A expressão ainda não tem frase.');
    assert.equal(textoDaExpressao([{ id: 'look-for', titulo: 'look for', pt: 'Estou procurando o portão.' }], 'ontem').texto, 'Ainda não há expressão para dizer.');
    assert.equal(textoDaExpressao([{ id: 'X', titulo: 'look for', pt: 'Estou procurando o portão.' }], '2026-11-04').texto, 'A expressão ainda não tem frase.');
    const hoje = textoDaExpressao(FRASAIS, '2026-11-04');
    const deNovo = textoDaExpressao(FRASAIS, '2026-11-04');
    assert.equal(hoje.id, deNovo.id);
    assert.equal(hoje.texto, deNovo.texto);
    assert.ok(FRASAIS.some(c => c.id === hoje.id));
    assert.match(hoje.texto, /^A expressão pede .+ Diga a frase\.$/);
    assert.equal(hoje.texto.includes(FRASAIS.find(c => c.id === hoje.id).melhor), false);
    const outro = textoDaExpressao(FRASAIS, '2026-11-05');
    assert.match(outro.texto, /^A expressão pede /);
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
    assert.equal(hoje.texto === textoDoNumero(NUMEROS, '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDaReducao(REDUCOES, '2026-11-04').texto, false);
  });

  test('a versão 3.14 deixa o sstable fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.14'/);
    assert.match(data, /versao: '3\.14'/);
    assert.match(data, /versao: '3\.13'/);
    assert.match(sw, /gringolingo-v141/);
    assert.match(sw, /\.\/js\/sstable\.js/);
    assert.match(turno, /sstable\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarSstable', 'pintarLatch', 'pintarThrottle']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarDebounce'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaSstables'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /sstable: telaSstables/);
    assert.match(mapa, /latch: telaLatches/);
    assert.match(mapa, /throttle: telaThrottles/);
    const expressao = app.slice(app.indexOf('function cartaoExpressao('), app.indexOf('function blocoFluencia'));
    assert.match(expressao, /fala-expressao/);
    assert.match(expressao, /'A expressão'/);
    assert.match(expressao, /DIZER/);
    assert.equal(expressao.includes('function cartaoReducao'), false);
    assert.equal(expressao.includes('function cartaoSom'), false);
    const regra = css.slice(css.indexOf('.fala-expressao {'), css.indexOf('.fala-expressao {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const notaInicio = css.indexOf('\n.feedback-nota {');
    const nota = css.slice(notaInicio, css.indexOf('}', notaInicio));
    assert.match(nota, /overflow-wrap: anywhere/);
    assert.match(nota, /max-width: 100%/);
    const erroInicio = css.indexOf('\n.painel-erro {');
    const erro = css.slice(erroInicio, css.indexOf('}', erroInicio));
    assert.match(erro, /overflow-wrap: anywhere/);
    assert.match(erro, /max-width: 100%/);
    assert.equal((app.match(/function cartaoExpressao\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoReducao\(/g) || []).length, 1);
    assert.equal((app.match(/'A expressão'/g) || []).length, 1);
    assert.equal((app.match(/'A redução'/g) || []).length, 1);
  });
});
