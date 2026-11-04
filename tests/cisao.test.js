import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CISOES, avaliarCisao, RAJADAS, avaliarRajada, BRASAS, avaliarBrasa
} = await import('../js/cisao.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoCostume } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCisao, registrarRajada, registrarBrasa
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'cisao.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The user passed the disk quota.',
  'The process keeps restarting.',
  'The child exited and the parent never waited.',
  'The memory keeps growing.',
  'The function woke from a cold start.',
  'The process cannot read that file.'
];

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

describe('cisão, rajada e brasa', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/cisao.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(CISOES, ['Divide', 'Junta'], avaliarCisao);
    conferir(RAJADAS, ['Tenta', 'Acalma'], avaliarRajada);
    conferir(BRASAS, ['Concentra', 'Espalha'], avaliarBrasa);
    const ids = [...CISOES, ...RAJADAS, ...BRASAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const nos = CISOES.find(c => c.id === 'doisnos').rodadas[0];
    assert.equal(avaliarCisao(nos, '2 nodes both claim the lead.').ok, true);
    const tres = RAJADAS.find(c => c.id === 'tresrajada').rodadas[0];
    assert.equal(avaliarRajada(tres, 'Each call retries 3 times.').ok, true);
    const quarenta = BRASAS.find(c => c.id === 'quarentabrisa').rodadas[0];
    assert.equal(avaliarBrasa(quarenta, 'One key takes 40 percent of the writes.').ok, true);
    const texto = JSON.stringify({ CISOES, RAJADAS, BRASAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Cisão' && f.melhor === 'The cluster has two leaders.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Rajada' && f.melhor === 'The clients retry together.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Brasa' && f.melhor === 'One key takes most of the writes.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['cisao', 'rajada', 'brasa']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('cisão, rajada e brasa contam no próprio contador', () => {
    travarMissao('cisao1');
    const cisao = registrarCisao(fim());
    assert.equal(cisao.bonusMissoes, 15);
    assert.equal(estado.stats.cisoes, 1);
    assert.equal(estado.stats.zumbis, 0);
    assert.equal(estado.stats.rajadas, 0);
    assert.ok(estado.badges.includes('cisao'));
    for (const id of ['rajada', 'brasa', 'zumbi', 'cota']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('rajada1');
    const rajada = registrarRajada(fim());
    assert.equal(rajada.bonusMissoes, 15);
    assert.equal(estado.stats.rajadas, 1);
    assert.equal(estado.stats.cisoes, 1);
    assert.ok(estado.badges.includes('rajada'));

    travarMissao('brasa1');
    const brasa = registrarBrasa(fim());
    assert.equal(brasa.bonusMissoes, 15);
    assert.equal(estado.stats.brasas, 1);
    assert.equal(estado.stats.cotas, 0);
    assert.ok(estado.badges.includes('brasa'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 211);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o costume aponta o dia da semana com mais falas', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDoCostume(null, '2026-10-28');
    assert.equal(vazia.texto, 'Ainda não há costume de fala.');
    assert.equal(vazia.dias, null);
    const invalida = textoDoCostume({ '2026-10-28': { n: 1 } }, 'ontem');
    assert.equal(invalida.dias, null);
    const um = textoDoCostume({ '2026-10-28': { n: 1, segundos: 20 } }, '2026-10-28');
    assert.equal(um.dias, null);
    const quarta = textoDoCostume({
      '2026-10-21': { n: 1, segundos: 10 },
      '2026-10-28': { segundos: 12, n: 0 }
    }, '2026-10-28');
    assert.equal(quarta.dias, 2);
    assert.equal(quarta.dia, 'quarta');
    assert.equal(quarta.texto, 'Você fala mais na quarta.');
    const empate = textoDoCostume({
      '2026-10-26': { n: 1 },
      '2026-10-28': { n: 1 }
    }, '2026-10-28');
    assert.equal(empate.dia, 'segunda');
    assert.equal(empate.texto, 'Você fala mais na segunda.');
    const domingo = textoDoCostume({
      '2026-10-25': { n: 1 },
      '2026-10-26': { n: 1 },
      '2026-11-01': { n: 1 },
      '2026-11-02': { n: 4 }
    }, '2026-11-01');
    assert.equal(domingo.dias, 2);
    assert.equal(domingo.texto, 'Você fala mais no domingo.');
    const zerado = textoDoCostume({
      '2026-10-21': { n: 0, segundos: 0 },
      '2026-10-28': { n: 1 },
      '2026-10-29': { n: 3 }
    }, '2026-10-28');
    assert.equal(zerado.dias, null);
  });

  test('a versão 2.58 deixa a cisão fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.58'/);
    assert.match(data, /versao: '2\.57'/);
    assert.match(sw, /gringolingo-v85/);
    assert.match(sw, /\.\/js\/cisao\.js/);
    assert.match(turno, /cisao\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCisao', 'pintarRajada', 'pintarBrasa']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaZumbis'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCisoes'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /cisao: telaCisoes/);
    assert.match(mapa, /rajada: telaRajadas/);
    assert.match(mapa, /brasa: telaBrasas/);
    const costume = app.slice(app.indexOf('function cartaoCostume'), app.indexOf('function blocoFluencia'));
    assert.match(costume, /fala-costume/);
    assert.match(costume, /VER A SEMANA/);
    assert.equal(costume.includes('function cartaoHiato'), false);
    assert.equal(costume.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-costume {'), css.indexOf('.fala-costume {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const resultado = css.slice(css.indexOf('.resultado-botoes > .btn'), css.indexOf('.resultado-botoes > .btn') + 90);
    assert.match(resultado, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-branco', type: 'button', onclick: iniciarRelampago/);
    assert.match(app, /'APAGAR CHAVE'/);
    assert.match(app, /type: 'button',\n        onclick\(\) \{\n          apagarIa\(\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoCostume\(/g) || []).length, 1);
  });
});
