import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ANTEPAROS, avaliarAnteparo, DESCARTES, avaliarDescarte, CRONOMETROS, avaliarCronometro
} = await import('../js/anteparo.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoMeio } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarAnteparo, registrarDescarte, registrarCronometro
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'anteparo.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'Each new try waited a different time.',
  'The gate refused the extra call.',
  'The client returned to the same machine.',
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

describe('anteparo, descarte e cronômetro', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/anteparo.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(ANTEPAROS, ['Isola', 'Solta'], avaliarAnteparo);
    conferir(DESCARTES, ['Cheio', 'Devolve'], avaliarDescarte);
    conferir(CRONOMETROS, ['Corta', 'Segue'], avaliarCronometro);
    const ids = [...ANTEPAROS, ...DESCARTES, ...CRONOMETROS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const anteparo = ANTEPAROS.find(c => c.id === 'anteparo2').rodadas[0];
    assert.equal(avaliarAnteparo(anteparo, 'The bulkhead closed 2 compartments.').ok, true);
    const descarte = DESCARTES.find(c => c.id === 'descarte4').rodadas[0];
    assert.equal(avaliarDescarte(descarte, 'The service shed 4 extra requests.').ok, true);
    const cronometro = CRONOMETROS.find(c => c.id === 'cronometro0').rodadas[0];
    assert.equal(avaliarCronometro(cronometro, 'The call had 0 seconds left.').ok, true);
    const texto = JSON.stringify({ ANTEPAROS, DESCARTES, CRONOMETROS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Anteparo' && f.melhor === 'The failure stayed inside its own compartment.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Descarte' && f.melhor === 'The service shed the request that did not fit.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cronômetro' && f.melhor === 'The call stopped when the remaining time hit zero.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['anteparo', 'descarte', 'cronometro']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('anteparo, descarte e cronômetro contam no próprio contador', () => {
    travarMissao('anteparo1');
    const anteparo = registrarAnteparo(fim());
    assert.equal(anteparo.bonusMissoes, 15);
    assert.equal(estado.stats.anteparos, 1);
    assert.equal(estado.stats.colas, 0);
    assert.equal(estado.stats.descartes, 0);
    assert.ok(estado.badges.includes('anteparo'));
    for (const id of ['cola', 'cronometro', 'tremor', 'portaria']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('descarte1');
    const descarte = registrarDescarte(fim());
    assert.equal(descarte.bonusMissoes, 15);
    assert.equal(estado.stats.descartes, 1);
    assert.equal(estado.stats.anteparos, 1);
    assert.ok(estado.badges.includes('descarte'));

    travarMissao('cronometro1');
    const cronometro = registrarCronometro(fim());
    assert.equal(cronometro.bonusMissoes, 15);
    assert.equal(estado.stats.cronometros, 1);
    assert.equal(estado.stats.tremores, 0);
    assert.ok(estado.badges.includes('cronometro'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 256);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o meio dos dias é a mediana dos treinos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoMeio(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há meio de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.meio, 0);
    const vazio = textoDoMeio({}, '2026-11-04');
    assert.equal(vazio.texto, 'O meio dos dias ainda é 0 treinos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.meio, 0);
    const soSegundos = textoDoMeio({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.meio, 0);
    assert.equal(soSegundos.texto, 'O meio dos dias ficou abaixo de 1 treino.');
    const um = textoDoMeio({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.meio, 1);
    assert.equal(um.texto, 'O meio dos dias é de 1 treino.');
    const cinco = textoDoMeio({ '2026-10-28': { n: 5, segundos: 60 } }, '2026-11-04');
    assert.equal(cinco.dias, 1);
    assert.equal(cinco.meio, 5);
    assert.equal(cinco.texto, 'O meio dos dias é de 5 treinos.');
    const par = textoDoMeio({
      '2026-10-28': { n: 1, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.meio, 2);
    assert.equal(par.texto, 'O meio dos dias é de 2 treinos.');
    const quatro = textoDoMeio({
      '2026-10-28': { n: 5, segundos: 60 },
      '2026-11-02': { n: 4, segundos: 40 }
    }, '2026-11-04');
    assert.equal(quatro.dias, 2);
    assert.equal(quatro.meio, 4);
    assert.equal(quatro.texto, 'O meio dos dias é de 4 treinos.');
    const comZero = textoDoMeio({
      '2026-10-28': { n: 3, segundos: 60 },
      '2026-11-02': { n: 0, segundos: 40 }
    }, '2026-11-04');
    assert.equal(comZero.dias, 2);
    assert.equal(comZero.meio, 1);
    assert.equal(comZero.texto, 'O meio dos dias é de 1 treino.');
    const igual = textoDoMeio({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.meio, 1);
    assert.equal(igual.texto, 'O meio dos dias é de 1 treino.');
    const futuro = textoDoMeio({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.meio, 2);
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.texto, 'O meio dos dias é de 2 treinos.');
    const zerado = textoDoMeio({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.meio, 0);
  });

  test('a versão 2.73 deixa o anteparo fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.73'/);
    assert.match(data, /versao: '2\.72'/);
    assert.match(sw, /gringolingo-v100/);
    assert.match(sw, /\.\/js\/anteparo\.js/);
    assert.match(turno, /anteparo\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarAnteparo', 'pintarDescarte', 'pintarCronometro']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaColas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaAnteparos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /anteparo: telaAnteparos/);
    assert.match(mapa, /descarte: telaDescartes/);
    assert.match(mapa, /cronometro: telaCronometros/);
    const meio = app.slice(app.indexOf('function cartaoMeio'), app.indexOf('function blocoFluencia'));
    assert.match(meio, /fala-meio/);
    assert.match(meio, /VER A SEMANA/);
    assert.equal(meio.includes('function cartaoDiferenca'), false);
    assert.equal(meio.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-meio {'), css.indexOf('.fala-meio {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.conversa-atalho {'), css.indexOf('.conversa-atalho {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*apagarPapo\(\);/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*reducaoSessao\.ouviu = true;/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*numeroSessao\.ouviu = true;/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoMeio\(/g) || []).length, 1);
  });
});
