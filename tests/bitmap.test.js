import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  BITMAPS, avaliarBitmap, ROARINGS, avaliarRoaring, HYPERS, avaliarHyper
} = await import('../js/bitmap.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoReforco, textoDaPratica, textoDaAusencia, textoDoFecho
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarBitmap, registrarRoaring, registrarHyper
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'bitmap.js') continue;
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

function diaFala(grupos) {
  return { n: 1, segundos: 20, grupos };
}

describe('bitmap, roaring e hyper', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/bitmap.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(BITMAPS, ['Marca', 'Segue'], avaliarBitmap);
    conferir(ROARINGS, ['Junta', 'Segue'], avaliarRoaring);
    conferir(HYPERS, ['Estima', 'Segue'], avaliarHyper);
    const ids = [...BITMAPS, ...ROARINGS, ...HYPERS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const bitmap = BITMAPS.find(c => c.id === 'bitmap2').rodadas[0];
    assert.equal(avaliarBitmap(bitmap, 'The bitmap marked 2 bits.').ok, true);
    const roaring = ROARINGS.find(c => c.id === 'roaring3').rodadas[0];
    assert.equal(avaliarRoaring(roaring, 'The roaring bitmap stored 3 ranges.').ok, true);
    const hyper = HYPERS.find(c => c.id === 'hyper4').rodadas[0];
    assert.equal(avaliarHyper(hyper, 'The sketch estimated 4 sets.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Bitmap' && f.melhor === 'The bitmap marks the bit for the key.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Roaring' && f.melhor === 'The roaring bitmap stores equal bits as one range.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Hyper' && f.melhor === 'The sketch estimates the distinct items.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['bitmap', 'roaring', 'hyper']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O reforço'), false);
  });

  test('bitmap, roaring e hyper contam no próprio contador', () => {
    travarMissao('bitmap1');
    const bitmap = registrarBitmap(fim());
    assert.equal(bitmap.bonusMissoes, 15);
    assert.equal(estado.stats.bitmaps, 1);
    assert.equal(estado.stats.roarings, 0);
    assert.equal(estado.stats.hypers, 0);
    assert.equal(estado.stats.freezes, 0);
    assert.ok(estado.badges.includes('bitmap'));
    for (const id of ['roaring', 'hyper', 'freeze']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('roaring1');
    const roaring = registrarRoaring(fim());
    assert.equal(roaring.bonusMissoes, 15);
    assert.equal(estado.stats.roarings, 1);
    assert.equal(estado.stats.bitmaps, 1);
    assert.ok(estado.badges.includes('roaring'));

    travarMissao('hyper1');
    const hyper = registrarHyper(fim());
    assert.equal(hyper.bonusMissoes, 15);
    assert.equal(estado.stats.hypers, 1);
    assert.equal(estado.stats.freezes, 0);
    assert.ok(estado.badges.includes('hyper'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 340);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o reforço aponta o próximo treino do grupo já falado', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoReforco(null, 'ontem', TREINOS, {});
    assert.equal(invalido.dias, null);
    assert.equal(invalido.id, '');
    assert.equal(invalido.texto, 'Ainda não há reforço de fala.');
    const vazio = textoDoReforco({}, '2026-11-04', TREINOS, {});
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.id, '');
    assert.equal(vazio.texto, 'O reforço ainda não tem fala.');
    const semente = {
      '2026-10-31': diaFala({ trabalho: 1 }),
      '2026-11-01': diaFala({ trabalho: 1 }),
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-03': diaFala({ trabalho: 1 }),
      '2026-11-04': diaFala({ trabalho: 1 })
    };
    const leigos = textoDoReforco(semente, '2026-11-04', TREINOS, {});
    assert.equal(leigos.dias, 5);
    assert.equal(leigos.id, 'modelo');
    assert.equal(leigos.titulo, 'Para leigos');
    assert.equal(leigos.texto, 'Reforce no trabalho com Para leigos. Prompt, alucinação e RAG.');
    assert.equal(/\d/.test(leigos.texto), false);
    assert.equal(leigos.texto.includes('segundos'), false);
    assert.equal(leigos.texto === textoDaPratica(semente, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(leigos.texto === textoDaAusencia(semente, '2026-11-04').texto, false);
    assert.equal(leigos.texto === textoDoFecho(semente, '2026-11-04').texto, false);
    const furo = textoDoReforco(semente, '2026-11-04', TREINOS, { modelos: 1 });
    assert.equal(furo.id, 'furo');
    assert.equal(furo.titulo, 'O furo');
    assert.equal(furo.texto, 'Reforce no trabalho com O furo. CVE, patch e upgrade de dependência.');
    const statsTrabalho = {};
    for (const treino of TREINOS) {
      if (treino.categoria === 'trabalho') statsTrabalho[treino.stat] = 1;
    }
    const cobriu = textoDoReforco(semente, '2026-11-04', TREINOS, statsTrabalho);
    assert.equal(cobriu.id, '');
    assert.equal(cobriu.texto, 'O reforço já cobriu os grupos da fala.');
    const entrevista = textoDoReforco({
      '2026-11-04': diaFala({ trabalho: 1, entrevista: 1 })
    }, '2026-11-04', TREINOS, statsTrabalho);
    assert.equal(entrevista.id, 'sistema');
    assert.equal(entrevista.texto, 'Reforce na entrevista com Sistema. Pedido, escala e gargalo.');
    const futuro = textoDoReforco({
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-08': diaFala({ entrevista: 1, cotidiano: 1, pronuncia: 1, revisao: 1 })
    }, '2026-11-04', TREINOS, {});
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.id, 'modelo');
    const mudo = textoDoReforco({
      '2026-11-04': { n: 0, segundos: 0, grupos: { entrevista: 4 } },
      '2026-11-01': diaFala({ trabalho: 1 })
    }, '2026-11-04', TREINOS, {});
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.id, 'modelo');
    const semGrupo = textoDoReforco({
      '2026-11-04': { n: 1, segundos: 8 }
    }, '2026-11-04', TREINOS, {});
    assert.equal(semGrupo.texto, 'O reforço ainda não tem grupo.');
  });

  test('a versão 3.01 deixa o bitmap fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '3\.01'/);
    assert.match(data, /versao: '3\.00'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/bitmap\.js/);
    assert.match(turno, /bitmap\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarBitmap', 'pintarRoaring', 'pintarHyper']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaFreezes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaBitmaps'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /bitmap: telaBitmaps/);
    assert.match(mapa, /roaring: telaRoarings/);
    assert.match(mapa, /hyper: telaHypers/);
    const reforco = app.slice(app.indexOf('function cartaoReforco'), app.indexOf('function blocoFluencia'));
    assert.match(reforco, /fala-reforco/);
    assert.match(reforco, /O reforço/);
    assert.match(reforco, /COMEÇAR/);
    assert.equal(reforco.includes('function cartaoPratica'), false);
    assert.equal(reforco.includes('function cartaoAusencia'), false);
    const regra = css.slice(css.indexOf('.fala-reforco {'), css.indexOf('.fala-reforco {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    assert.match(css, /\.sobre-botoes \{[^}]*flex-wrap: wrap/);
    const botoes = css.slice(css.indexOf('.sobre-botoes > .pilula {'), css.indexOf('.sobre-botoes > .pilula {') + 140);
    assert.match(botoes, /min-height: 44px/);
    assert.match(botoes, /max-width: 100%/);
    assert.equal((app.match(/function cartaoReforco\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoPratica\(/g) || []).length, 1);
    assert.equal((app.match(/O reforço/g) || []).length, 1);
    assert.equal((app.match(/A prática/g) || []).length, 1);
  });
});
