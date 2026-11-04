import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CORRIDAS, avaliarCorrida, INDICES, avaliarIndice, PERCENTIS, avaliarPercentil
} = await import('../js/corrida.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaSoma } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCorrida, registrarIndice, registrarPercentil
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'corrida.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The store rewrote six old files.',
  'The write log filled up.',
  'The reader sits a thousand messages behind.',
  'The call stack grew without end.',
  'The memory keeps growing.'
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

describe('corrida, índice e percentil', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/corrida.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(CORRIDAS, ['Disputa', 'Separa'], avaliarCorrida);
    conferir(INDICES, ['Varre', 'Cria'], avaliarIndice);
    conferir(PERCENTIS, ['Mede', 'Limita'], avaliarPercentil);
    const ids = [...CORRIDAS, ...INDICES, ...PERCENTIS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const dois = CORRIDAS.find(c => c.id === 'doispedidos').rodadas[0];
    assert.equal(avaliarCorrida(dois, 'The race touched 2 writes.').ok, true);
    const mil = INDICES.find(c => c.id === 'quarentamil').rodadas[0];
    assert.equal(avaliarIndice(mil, 'The scan read 40000 rows.').ok, true);
    const ms = PERCENTIS.find(c => c.id === 'duzentosms').rodadas[0];
    assert.equal(avaliarPercentil(ms, 'The calls fit in 200 milliseconds.').ok, true);
    const noventa = PERCENTIS.find(c => c.id === 'percentil99').rodadas[0];
    assert.equal(avaliarPercentil(noventa, '99 percent of the calls fit.').ok, true);
    const texto = JSON.stringify({ CORRIDAS, INDICES, PERCENTIS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Corrida' && f.melhor === 'Two requests wrote the same balance.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Índice' && f.melhor === 'The query read every row.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Percentil' && f.melhor === 'Ninety nine percent of the calls fit.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['corrida', 'indice', 'percentil']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('corrida, índice e percentil contam no próprio contador', () => {
    travarMissao('corrida1');
    const corrida = registrarCorrida(fim());
    assert.equal(corrida.bonusMissoes, 15);
    assert.equal(estado.stats.corridas, 1);
    assert.equal(estado.stats.vagoes, 0);
    assert.equal(estado.stats.indices, 0);
    assert.ok(estado.badges.includes('corrida'));
    for (const id of ['indice', 'percentil', 'vagao', 'compacta']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('indice1');
    const indice = registrarIndice(fim());
    assert.equal(indice.bonusMissoes, 15);
    assert.equal(estado.stats.indices, 1);
    assert.equal(estado.stats.corridas, 1);
    assert.ok(estado.badges.includes('indice'));

    travarMissao('percentil1');
    const percentil = registrarPercentil(fim());
    assert.equal(percentil.bonusMissoes, 15);
    assert.equal(estado.stats.percentis, 1);
    assert.equal(estado.stats.giros, 0);
    assert.ok(estado.badges.includes('percentil'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 223);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a soma junta os minutos de todos os dias', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDaSoma(null, '2026-11-04');
    assert.equal(vazia.texto, 'A soma de fala ainda é 0 minutos.');
    assert.equal(vazia.dias, 0);
    assert.equal(vazia.minutos, 0);
    const invalida = textoDaSoma({ '2026-11-04': { n: 1, segundos: 60 } }, 'ontem');
    assert.equal(invalida.dias, null);
    assert.equal(invalida.texto, 'Ainda não há soma de fala.');
    const curto = textoDaSoma({ '2026-11-04': { n: 1, segundos: 20 } }, '2026-11-04');
    assert.equal(curto.dias, 1);
    assert.equal(curto.minutos, 0);
    assert.equal(curto.texto, 'A soma de fala é de menos de 1 minuto.');
    const um = textoDaSoma({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(um.minutos, 1);
    assert.equal(um.texto, 'A soma de fala é de 1 minuto.');
    const soma = textoDaSoma({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(soma.dias, 5);
    assert.equal(soma.minutos, 14);
    assert.equal(soma.texto, 'A soma de fala é de 14 minutos.');
    const futuro = textoDaSoma({
      '2026-11-04': { n: 1, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.minutos, 1);
    assert.equal(futuro.dias, 1);
    const zerado = textoDaSoma({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
  });

  test('a versão 2.62 deixa a corrida fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.62'/);
    assert.match(data, /versao: '2\.61'/);
    assert.match(sw, /gringolingo-v89/);
    assert.match(sw, /\.\/js\/corrida\.js/);
    assert.match(turno, /corrida\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCorrida', 'pintarIndice', 'pintarPercentil']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaVagoes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCorridas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /corrida: telaCorridas/);
    assert.match(mapa, /indice: telaIndices/);
    assert.match(mapa, /percentil: telaPercentis/);
    const soma = app.slice(app.indexOf('function cartaoSoma'), app.indexOf('function blocoFluencia'));
    assert.match(soma, /fala-soma/);
    assert.match(soma, /VER A SEMANA/);
    assert.equal(soma.includes('function cartaoSete'), false);
    assert.equal(soma.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-soma {'), css.indexOf('.fala-soma {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const mic = css.slice(css.indexOf('.btn-mic {'), css.indexOf('.btn-mic {') + 160);
    assert.match(mic, /min-height: 44px/);
    assert.match(app, /onclick\(\) \{\n        if \(dialogo\.i \+ 1 >= dialogo\.rodadas\.length\) concluirDialogo\(\)/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        if \(dialogo\.i \+ 1 >= dialogo\.rodadas\.length\) concluirDialogo\(\)/);
    assert.match(app, /rodada\.voce\.pt\)\);\n    miolo\.push\(campo\.status, campo\.mic, campo\.entrada\);\n    const verificar = h\('button', \{ class: 'btn btn-verde', type: 'button', disabled: true \}, 'VERIFICAR'\)/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        if \(sombraSessao\.i \+ 1 >= sombraSessao\.frases\.length\) concluirSombra\(\)/);
    assert.match(app, /const verificar = h\('button', \{ class: 'btn btn-verde', type: 'button', disabled: true \}, 'COMPARAR'\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoSoma\(/g) || []).length, 1);
  });
});
