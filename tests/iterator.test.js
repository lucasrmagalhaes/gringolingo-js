import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ITERATORS, avaliarIterator, PAGERS, avaliarPager, EVICTS, avaliarEvict
} = await import('../js/iterator.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaExpressao, textoDaReducao, textoDoNumero, textoDoVerbo, textoDoSom, textoDaEscuta, textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado, textoDoIdioma
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { SONS, CLIPS } = await import('../js/pronuncia.js');
const { NUMEROS } = await import('../js/ensaio.js');
const { REDUCOES, FRASAIS } = await import('../js/fluencia.js');
const { perguntaDoDia, IDIOMAS } = await import('../js/tecnico.js');
const { VERBOS, SUJEITOS } = await import('../js/data.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarIterator, registrarPager, registrarEvict
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'iterator.js') continue;
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

describe('iterator, pager e evict', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/iterator.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(ITERATORS, ['Anda', 'Segue'], avaliarIterator);
    conferir(PAGERS, ['Carrega', 'Segue'], avaliarPager);
    conferir(EVICTS, ['Solta', 'Segue'], avaliarEvict);
    const ids = [...ITERATORS, ...PAGERS, ...EVICTS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const iterator = ITERATORS.find(c => c.id === 'iterator2').rodadas[0];
    assert.equal(avaliarIterator(iterator, 'The iterator walked 2 keys.').ok, true);
    const pager = PAGERS.find(c => c.id === 'pager3').rodadas[0];
    assert.equal(avaliarPager(pager, 'The pager loaded 3 pages.').ok, true);
    const evict = EVICTS.find(c => c.id === 'evict4').rodadas[0];
    assert.equal(avaliarEvict(evict, 'The evict dropped 4 cold pages.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Iterator' && f.melhor === 'The iterator walks the key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Pager' && f.melhor === 'The pager loads the page.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Evict' && f.melhor === 'The evict drops the cold page.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.length, 359);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 303);
    for (const id of ['iterator', 'pager', 'evict']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O idiom'), false);
  });

  test('iterator, pager e evict contam no próprio contador', () => {
    travarMissao('iterator1');
    const iterator = registrarIterator(fim());
    assert.equal(iterator.bonusMissoes, 15);
    assert.equal(estado.stats.iterators, 1);
    assert.equal(estado.stats.pagers, 0);
    assert.equal(estado.stats.evicts, 0);
    assert.equal(estado.stats.throttles, 0);
    assert.ok(estado.badges.includes('iterator'));
    for (const id of ['pager', 'evict', 'throttle']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('pager1');
    const pager = registrarPager(fim());
    assert.equal(pager.bonusMissoes, 15);
    assert.equal(estado.stats.pagers, 1);
    assert.equal(estado.stats.iterators, 1);
    assert.ok(estado.badges.includes('pager'));

    travarMissao('evict1');
    const evict = registrarEvict(fim());
    assert.equal(evict.bonusMissoes, 15);
    assert.equal(estado.stats.evicts, 1);
    assert.equal(estado.stats.throttles, 0);
    assert.ok(estado.badges.includes('evict'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 382);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o idiom pede a frase do dia para dizer', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoIdioma(null, '2026-11-04').texto, 'O idiom ainda não tem frase.');
    assert.equal(textoDoIdioma([], '2026-11-04').texto, 'O idiom ainda não tem frase.');
    assert.equal(textoDoIdioma([{ id: 'touch-base', titulo: 'touch base', pt: 'Vamos nos falar amanhã.' }], 'ontem').texto, 'Ainda não há idiom para dizer.');
    assert.equal(textoDoIdioma([{ id: 'X', titulo: 'touch base', pt: 'Vamos nos falar amanhã.' }], '2026-11-04').texto, 'O idiom ainda não tem frase.');
    const hoje = textoDoIdioma(IDIOMAS, '2026-11-04');
    const deNovo = textoDoIdioma(IDIOMAS, '2026-11-04');
    assert.equal(hoje.id, deNovo.id);
    assert.equal(hoje.texto, deNovo.texto);
    assert.ok(IDIOMAS.some(c => c.id === hoje.id));
    assert.match(hoje.texto, /^O idiom pede .+ Diga a frase\.$/);
    assert.equal(hoje.texto.includes(IDIOMAS.find(c => c.id === hoje.id).melhor), false);
    const outro = textoDoIdioma(IDIOMAS, '2026-11-05');
    assert.match(outro.texto, /^O idiom pede /);
    const painel = semanaTrabalho();
    const expressao = textoDaExpressao(FRASAIS, '2026-11-04');
    assert.equal(hoje.texto === expressao.texto, false);
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

  test('a versão 3.16 deixa o iterator fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.16'/);
    assert.match(data, /versao: '3\.16'/);
    assert.match(data, /versao: '3\.15'/);
    assert.match(sw, /gringolingo-v147/);
    assert.match(sw, /\.\/js\/iterator\.js/);
    assert.match(turno, /iterator\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarIterator', 'pintarPager', 'pintarEvict']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarThrottle'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaIterators'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /iterator: telaIterators/);
    assert.match(mapa, /pager: telaPagers/);
    assert.match(mapa, /evict: telaEvicts/);
    const idioma = app.slice(app.indexOf('function cartaoIdioma('), app.indexOf('function blocoFluencia'));
    assert.match(idioma, /fala-idioma/);
    assert.match(idioma, /'O idiom'/);
    assert.match(idioma, /DIZER/);
    assert.match(idioma, /aria-label': `Dizer /);
    assert.equal(idioma.includes('function cartaoExpressao'), false);
    assert.equal(idioma.includes('function cartaoReducao'), false);
    const regra = css.slice(css.indexOf('.fala-idioma {'), css.indexOf('.fala-idioma {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const nomeInicio = css.indexOf('\n.trilha-nome {');
    const nome = css.slice(nomeInicio, css.indexOf('}', nomeInicio));
    assert.match(nome, /overflow-wrap: anywhere/);
    assert.match(nome, /max-width: 100%/);
    const no = app.slice(app.indexOf('function cartaoDoTreino'), app.indexOf('function vazioDoHub'));
    assert.match(no, /aria-current': 'step'/);
    assert.equal((app.match(/function cartaoIdioma\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoExpressao\(/g) || []).length, 1);
    assert.equal((app.match(/'O idiom'/g) || []).length, 1);
    assert.equal((app.match(/'A expressão'/g) || []).length, 1);
  });
});
