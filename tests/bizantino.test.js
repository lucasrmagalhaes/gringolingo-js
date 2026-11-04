import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  BIZANTINOS, avaliarBizantino, PARTICOES, avaliarParticao, GENERAIS, avaliarGeneral
} = await import('../js/bizantino.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoSalto, textoDoLongo, textoDoCurto } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarBizantino, registrarParticao, registrarGeneral
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'bizantino.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The helper sits beside the service.',
  'The sidecar carried two calls.',
  'The proxy speaks for the outside caller.',
  'The proxy covered three services.',
  'The adapter joins the old client.',
  'The adapter joined four clients.',
  'The task waits and never runs.',
  'The low task holds the resource.',
  'The long wait raises the priority.',
  'Please keep'
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

describe('bizantino, partição e general', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/bizantino.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(BIZANTINOS, ['Mente', 'Segue'], avaliarBizantino);
    conferir(PARTICOES, ['Divide', 'Segue'], avaliarParticao);
    conferir(GENERAIS, ['Avança', 'Fecha'], avaliarGeneral);
    const ids = [...BIZANTINOS, ...PARTICOES, ...GENERAIS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const bizantino = BIZANTINOS.find(c => c.id === 'bizantino2').rodadas[0];
    assert.equal(avaliarBizantino(bizantino, 'The lie reached 2 nodes.').ok, true);
    const particao = PARTICOES.find(c => c.id === 'particao3').rodadas[0];
    assert.equal(avaliarParticao(particao, 'The split isolated 3 nodes.').ok, true);
    const general = GENERAIS.find(c => c.id === 'general4').rodadas[0];
    assert.equal(avaliarGeneral(general, 'The order reached 4 armies.').ok, true);
    const texto = JSON.stringify({ BIZANTINOS, PARTICOES, GENERAIS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Bizantino' && f.melhor === 'A lying node still lets the others agree.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Partição' && f.melhor === 'The split keeps the two sides apart.'), true);
    assert.equal(catalogo.some(f => f.origem === 'General' && f.melhor === 'Both armies advance on the same order.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['bizantino', 'particao', 'general']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('bizantino, partição e general contam no próprio contador', () => {
    travarMissao('bizantino1');
    const bizantino = registrarBizantino(fim());
    assert.equal(bizantino.bonusMissoes, 15);
    assert.equal(estado.stats.bizantinos, 1);
    assert.equal(estado.stats.particoes, 0);
    assert.equal(estado.stats.generais, 0);
    assert.equal(estado.stats.sidecars, 0);
    assert.equal(estado.stats.adaptadores, 0);
    assert.ok(estado.badges.includes('bizantino'));
    for (const id of ['particao', 'general', 'sidecar', 'adaptador']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('particao1');
    const particao = registrarParticao(fim());
    assert.equal(particao.bonusMissoes, 15);
    assert.equal(estado.stats.particoes, 1);
    assert.equal(estado.stats.bizantinos, 1);
    assert.ok(estado.badges.includes('particao'));

    travarMissao('general1');
    const general = registrarGeneral(fim());
    assert.equal(general.bonusMissoes, 15);
    assert.equal(estado.stats.generais, 1);
    assert.equal(estado.stats.sidecars, 0);
    assert.ok(estado.badges.includes('general'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 307);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o salto mede a diferença entre o dia mais longo e o mais curto', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoSalto(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.salto, 0);
    assert.equal(invalido.texto, 'Ainda não há salto de treinos.');
    const vazio = textoDoSalto({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.salto, 0);
    assert.equal(vazio.texto, 'O salto dos dias ainda é 0 segundos.');
    const umSegundo = textoDoSalto({ '2026-11-04': { n: 1, segundos: 1 } }, '2026-11-04');
    assert.equal(umSegundo.dias, 1);
    assert.equal(umSegundo.salto, 0);
    assert.equal(umSegundo.texto, 'O salto dos dias é de 0 segundos.');
    const umDeDiferenca = textoDoSalto({
      '2026-11-03': { n: 1, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 41 }
    }, '2026-11-04');
    assert.equal(umDeDiferenca.dias, 2);
    assert.equal(umDeDiferenca.salto, 1);
    assert.equal(umDeDiferenca.texto, 'O salto dos dias é de 1 segundo.');
    const semente = {
      '2026-10-31': { n: 1, segundos: 40 },
      '2026-11-01': { n: 1, segundos: 60 },
      '2026-11-02': { n: 1, segundos: 90 },
      '2026-11-03': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    };
    const cheio = textoDoSalto(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.salto, 560);
    assert.equal(cheio.texto, 'O salto dos dias é de 560 segundos.');
    assert.equal(textoDoLongo(semente, '2026-11-04').texto, 'O longo dos dias é de 600 segundos.');
    assert.equal(textoDoCurto(semente, '2026-11-04').texto, 'O curto dos dias é de 40 segundos.');
    const igual = textoDoSalto({
      '2026-11-03': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(igual.salto, 0);
    assert.equal(igual.texto, 'O salto dos dias é de 0 segundos.');
    const futuro = textoDoSalto({
      '2026-11-04': { n: 1, segundos: 90 },
      '2026-11-05': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.salto, 0);
    assert.equal(futuro.texto, 'O salto dos dias é de 0 segundos.');
    const mudo = textoDoSalto({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.salto, 0);
    assert.equal(mudo.texto, 'O salto dos dias é de 0 segundos.');
    const zerado = textoDoSalto({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.salto, 0);
  });

  test('a versão 2.90 deixa o bizantino fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.90'/);
    assert.match(data, /versao: '2\.89'/);
    assert.match(sw, /gringolingo-v117/);
    assert.match(sw, /\.\/js\/bizantino\.js/);
    assert.match(turno, /bizantino\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarBizantino', 'pintarParticao', 'pintarGeneral']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaAdaptadores'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaBizantinos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /bizantino: telaBizantinos/);
    assert.match(mapa, /particao: telaParticoes/);
    assert.match(mapa, /general: telaGenerais/);
    const salto = app.slice(app.indexOf('function cartaoSalto'), app.indexOf('function blocoFluencia'));
    assert.match(salto, /fala-salto/);
    assert.match(salto, /VER A SEMANA/);
    assert.equal(salto.includes('function cartaoLongo'), false);
    assert.equal(salto.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-salto {'), css.indexOf('.fala-salto {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const relampago = css.slice(css.indexOf('\n.relampago-atalho {'), css.indexOf('\n.relampago-atalho {') + 90);
    assert.match(relampago, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoSalto\(/g) || []).length, 1);
  });
});
