import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  WATERMARKS, avaliarWatermark, BARRIERS, avaliarBarrier, ALIGNS, avaliarAlign
} = await import('../js/watermark.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarWatermark, registrarBarrier, registrarAlign
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'watermark.js') continue;
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

describe('watermark, barrier e align', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/watermark.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(WATERMARKS, ['Marca', 'Segue'], avaliarWatermark);
    conferir(BARRIERS, ['Espera', 'Segue'], avaliarBarrier);
    conferir(ALIGNS, ['Alinha', 'Segue'], avaliarAlign);
    const ids = [...WATERMARKS, ...BARRIERS, ...ALIGNS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const watermark = WATERMARKS.find(c => c.id === 'watermark2').rodadas[0];
    assert.equal(avaliarWatermark(watermark, 'The watermark marked 2 rows.').ok, true);
    const barrier = BARRIERS.find(c => c.id === 'barrier3').rodadas[0];
    assert.equal(avaliarBarrier(barrier, 'The barrier waited for 3 parts.').ok, true);
    const align = ALIGNS.find(c => c.id === 'align4').rodadas[0];
    assert.equal(avaliarAlign(align, 'The align lined up 4 rows.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Watermark' && f.melhor === 'The watermark shows how far the read got.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Barrier' && f.melhor === 'The barrier waits for the whole batch.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Align' && f.melhor === 'The align keeps the rows at one height.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['watermark', 'barrier', 'align']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A ficha'), false);
  });

  test('watermark, barrier e align contam no próprio contador', () => {
    travarMissao('watermark1');
    const watermark = registrarWatermark(fim());
    assert.equal(watermark.bonusMissoes, 15);
    assert.equal(estado.stats.watermarks, 1);
    assert.equal(estado.stats.barriers, 0);
    assert.equal(estado.stats.aligns, 0);
    assert.equal(estado.stats.splits, 0);
    assert.ok(estado.badges.includes('watermark'));
    for (const id of ['barrier', 'align', 'split']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('barrier1');
    const barrier = registrarBarrier(fim());
    assert.equal(barrier.bonusMissoes, 15);
    assert.equal(estado.stats.barriers, 1);
    assert.equal(estado.stats.watermarks, 1);
    assert.ok(estado.badges.includes('barrier'));

    travarMissao('align1');
    const align = registrarAlign(fim());
    assert.equal(align.bonusMissoes, 15);
    assert.equal(estado.stats.aligns, 1);
    assert.equal(estado.stats.splits, 0);
    assert.ok(estado.badges.includes('align'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 352);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a ficha pede a palavra de vocabulário que já venceu', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaFicha([], 'ontem');
    assert.equal(invalido.en, '');
    assert.equal(invalido.texto, 'Ainda não há ficha de palavra.');
    const vazio = textoDaFicha([], '2026-11-04');
    assert.equal(vazio.en, '');
    assert.equal(vazio.texto, 'A ficha ainda não tem palavra.');
    assert.equal(textoDaFicha(null, '2026-11-04').texto, 'A ficha ainda não tem palavra.');
    const curto = textoDaFicha([{ en: 'H', pt: 'olá', proxima: '2026-11-04' }], '2026-11-04');
    assert.equal(curto.texto, 'A ficha ainda não tem palavra.');
    const proibido = textoDaFicha([{ en: '__proto__', pt: 'olá', proxima: '2026-11-04' }], '2026-11-04');
    assert.equal(proibido.texto, 'A ficha ainda não tem palavra.');
    const futuro = textoDaFicha([
      { en: 'hello', pt: 'olá', proxima: '2026-11-08', caixa: 0 }
    ], '2026-11-04');
    assert.equal(futuro.en, '');
    assert.equal(futuro.texto, 'A ficha espera a próxima palavra.');
    const lista = [
      { en: 'hello', pt: 'olá.', proxima: '2026-11-04', caixa: 1 },
      { en: 'please', pt: 'por favor', proxima: '2026-11-03', caixa: 2 },
      { en: 'yes', pt: 'sim', proxima: '', caixa: 0 }
    ];
    const fino = textoDaFicha(lista, '2026-11-04');
    assert.equal(fino.en, 'please');
    assert.equal(fino.pt, 'por favor');
    assert.equal(fino.texto, 'A ficha pede por favor. Diga please.');
    const painel = semanaTrabalho();
    assert.equal(fino.texto === textoDaPratica(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(fino.texto === textoDoReforco(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(fino.texto === textoDoRecado(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(fino.texto === textoDaVez(TREINOS, ['sotaque'], {}).texto, false);
    assert.equal(fino.texto === textoDoRetorno({
      'I am fine': { proxima: '2026-11-04', caixa: 0, pt: 'eu estou bem' }
    }, '2026-11-04', []).texto, false);
    const caixa = textoDaFicha([
      { en: 'hello', pt: 'olá', proxima: '2026-11-04', caixa: 2 },
      { en: 'yes', pt: 'sim', proxima: '2026-11-04', caixa: 0 }
    ], '2026-11-04');
    assert.equal(caixa.en, 'yes');
    assert.equal(caixa.texto, 'A ficha pede sim. Diga yes.');
  });

  test('a versão 3.05 deixa o watermark fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '3\.05'/);
    assert.match(data, /versao: '3\.04'/);
    assert.match(sw, /gringolingo-v132/);
    assert.match(sw, /\.\/js\/watermark\.js/);
    assert.match(turno, /watermark\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarWatermark', 'pintarBarrier', 'pintarAlign']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaSplits'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaWatermarks'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /watermark: telaWatermarks/);
    assert.match(mapa, /barrier: telaBarriers/);
    assert.match(mapa, /align: telaAligns/);
    const ficha = app.slice(app.indexOf('function cartaoFicha'), app.indexOf('function blocoFluencia'));
    assert.match(ficha, /fala-ficha/);
    assert.match(ficha, /A ficha/);
    assert.match(ficha, /COMEÇAR/);
    assert.equal(ficha.includes('function cartaoRetorno'), false);
    assert.equal(ficha.includes('function cartaoVez'), false);
    const regra = css.slice(css.indexOf('.fala-ficha {'), css.indexOf('.fala-ficha {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const cabInicio = css.indexOf('\n.unidade-cab {');
    const cab = css.slice(cabInicio, css.indexOf('}', cabInicio));
    assert.match(cab, /flex-wrap: wrap/);
    assert.match(cab, /max-width: 100%/);
    assert.match(cab, /min-height: 44px/);
    const tituloInicio = css.indexOf('\n.unidade-titulo {');
    const titulo = css.slice(tituloInicio, css.indexOf('}', tituloInicio));
    assert.match(titulo, /max-width: 100%/);
    assert.equal((app.match(/function cartaoFicha\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoRetorno\(/g) || []).length, 1);
    assert.equal((app.match(/A ficha/g) || []).length, 1);
    assert.equal((app.match(/O retorno/g) || []).length, 1);
  });
});
