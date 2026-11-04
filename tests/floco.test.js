import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  FLOCOS, avaliarFloco, EPOCAS, avaliarEpoca, VETORES, avaliarVetor
} = await import('../js/floco.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoResto } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarFloco, registrarEpoca, registrarVetor
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'floco.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The leader guides the term.',
  'Each election raises the term.',
  'The follower copies the log.',
  'The write waits for a majority.',
  'More than half must confirm.',
  'The arbiter breaks the tie.',
  'The key lives outside the app.',
  'The pass only works for the right service.',
  'The old pass stops working at once.',
  'The orchestrator fires the sequence.',
  'The neighbor picks the next step.',
  'The failure undoes the previous step.',
  'The primary accepts the new write.',
  'The mirror follows without writing.',
  'The copy becomes primary when the owner falls.',
  'The write reaches the disk at once.',
  'The dirty page waits in the cache.',
  'The large write skips the cache.',
  'The nodes spread the state by rumor.',
  'The read repairs the old copy.',
  'The neighbor holds the write until the owner returns.'
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

describe('floco, época e vetor', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/floco.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(FLOCOS, ['Nasce', 'Espera'], avaliarFloco);
    conferir(EPOCAS, ['Sobe', 'Segue'], avaliarEpoca);
    conferir(VETORES, ['Anota', 'Fecha'], avaliarVetor);
    const ids = [...FLOCOS, ...EPOCAS, ...VETORES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const floco = FLOCOS.find(c => c.id === 'floco2').rodadas[0];
    assert.equal(avaliarFloco(floco, 'The flake minted 2 ids.').ok, true);
    const epoca = EPOCAS.find(c => c.id === 'epoca3').rodadas[0];
    assert.equal(avaliarEpoca(epoca, 'The epoch covered 3 joins.').ok, true);
    const vetor = VETORES.find(c => c.id === 'vetor4').rodadas[0];
    assert.equal(avaliarVetor(vetor, 'The vector stored 4 events.').ok, true);
    const texto = JSON.stringify({ FLOCOS, EPOCAS, VETORES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Floco' && f.melhor === 'The flake builds the id from the clock.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Época' && f.melhor === 'The epoch rises when the membership changes.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Vetor' && f.melhor === 'The vector records what this node saw.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['floco', 'epoca', 'vetor']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('floco, época e vetor contam no próprio contador', () => {
    travarMissao('floco1');
    const floco = registrarFloco(fim());
    assert.equal(floco.bonusMissoes, 15);
    assert.equal(estado.stats.flocos, 1);
    assert.equal(estado.stats.epocas, 0);
    assert.equal(estado.stats.vetores, 0);
    assert.equal(estado.stats.rumores, 0);
    assert.equal(estado.stats.deixas, 0);
    assert.ok(estado.badges.includes('floco'));
    for (const id of ['epoca', 'vetor', 'rumor', 'deixa']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('epoca1');
    const epoca = registrarEpoca(fim());
    assert.equal(epoca.bonusMissoes, 15);
    assert.equal(estado.stats.epocas, 1);
    assert.equal(estado.stats.flocos, 1);
    assert.ok(estado.badges.includes('epoca'));

    travarMissao('vetor1');
    const vetor = registrarVetor(fim());
    assert.equal(vetor.bonusMissoes, 15);
    assert.equal(estado.stats.vetores, 1);
    assert.equal(estado.stats.deixas, 0);
    assert.ok(estado.badges.includes('vetor'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 295);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o resto mede os segundos que não fecham um minuto', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoResto(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há resto de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.resto, 0);
    const vazio = textoDoResto({}, '2026-11-04');
    assert.equal(vazio.texto, 'O resto dos dias ainda é 0 segundos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.resto, 0);
    const umSegundo = textoDoResto({ '2026-11-04': { n: 1, segundos: 1 } }, '2026-11-04');
    assert.equal(umSegundo.dias, 1);
    assert.equal(umSegundo.resto, 1);
    assert.equal(umSegundo.texto, 'O resto dos dias é de 1 segundo.');
    const cheio = textoDoResto({
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(cheio.dias, 2);
    assert.equal(cheio.resto, 0);
    assert.equal(cheio.texto, 'O resto dos dias é de 0 segundos.');
    const quarenta = textoDoResto({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(quarenta.dias, 2);
    assert.equal(quarenta.resto, 40);
    assert.equal(quarenta.texto, 'O resto dos dias é de 40 segundos.');
    const igual = textoDoResto({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.resto, 10);
    assert.equal(igual.texto, 'O resto dos dias é de 10 segundos.');
    const futuro = textoDoResto({
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.resto, 30);
    assert.equal(futuro.texto, 'O resto dos dias é de 30 segundos.');
    const mudo = textoDoResto({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.resto, 0);
    assert.equal(mudo.texto, 'O resto dos dias é de 0 segundos.');
    const zerado = textoDoResto({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.resto, 0);
  });

  test('a versão 2.86 deixa o floco fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.86'/);
    assert.match(data, /versao: '2\.85'/);
    assert.match(sw, /gringolingo-v113/);
    assert.match(sw, /\.\/js\/floco\.js/);
    assert.match(turno, /floco\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarFloco', 'pintarEpoca', 'pintarVetor']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaDeixas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaFlocos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /floco: telaFlocos/);
    assert.match(mapa, /epoca: telaEpocas/);
    assert.match(mapa, /vetor: telaVetores/);
    const resto = app.slice(app.indexOf('function cartaoResto'), app.indexOf('function blocoFluencia'));
    assert.match(resto, /fala-resto/);
    assert.match(resto, /VER A SEMANA/);
    assert.equal(resto.includes('function cartaoSobra'), false);
    assert.equal(resto.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-resto {'), css.indexOf('.fala-resto {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const item = css.slice(css.indexOf('.hub-item {'), css.indexOf('.hub-item {') + 80);
    assert.match(item, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoResto\(/g) || []).length, 1);
  });
});
