import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RUMORES, avaliarRumor, REPAROS, avaliarReparo, DEIXAS, avaliarDeixa
} = await import('../js/rumor.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaSobra } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRumor, registrarReparo, registrarDeixa
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'rumor.js') continue;
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
  'The large write skips the cache.'
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

describe('rumor, reparo e deixa', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/rumor.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(RUMORES, ['Espalha', 'Espera'], avaliarRumor);
    conferir(REPAROS, ['Conserta', 'Segue'], avaliarReparo);
    conferir(DEIXAS, ['Guarda', 'Fecha'], avaliarDeixa);
    const ids = [...RUMORES, ...REPAROS, ...DEIXAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const rumor = RUMORES.find(c => c.id === 'rumor2').rodadas[0];
    assert.equal(avaliarRumor(rumor, 'The rumor reached 2 nodes.').ok, true);
    const reparo = REPAROS.find(c => c.id === 'reparo3').rodadas[0];
    assert.equal(avaliarReparo(reparo, 'The repair fixed 3 copies.').ok, true);
    const deixa = DEIXAS.find(c => c.id === 'deixa4').rodadas[0];
    assert.equal(avaliarDeixa(deixa, 'The hint held 4 writes.').ok, true);
    const texto = JSON.stringify({ RUMORES, REPAROS, DEIXAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Rumor' && f.melhor === 'The nodes spread the state by rumor.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Reparo' && f.melhor === 'The read repairs the old copy.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Deixa' && f.melhor === 'The neighbor holds the write until the owner returns.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['rumor', 'reparo', 'deixa']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('rumor, reparo e deixa contam no próprio contador', () => {
    travarMissao('rumor1');
    const rumor = registrarRumor(fim());
    assert.equal(rumor.bonusMissoes, 15);
    assert.equal(estado.stats.rumores, 1);
    assert.equal(estado.stats.reparos, 0);
    assert.equal(estado.stats.deixas, 0);
    assert.equal(estado.stats.travessias, 0);
    assert.equal(estado.stats.contornos, 0);
    assert.ok(estado.badges.includes('rumor'));
    for (const id of ['reparo', 'deixa', 'travessia', 'contorno']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('reparo1');
    const reparo = registrarReparo(fim());
    assert.equal(reparo.bonusMissoes, 15);
    assert.equal(estado.stats.reparos, 1);
    assert.equal(estado.stats.rumores, 1);
    assert.ok(estado.badges.includes('reparo'));

    travarMissao('deixa1');
    const deixa = registrarDeixa(fim());
    assert.equal(deixa.bonusMissoes, 15);
    assert.equal(estado.stats.deixas, 1);
    assert.equal(estado.stats.contornos, 0);
    assert.ok(estado.badges.includes('deixa'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 292);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a sobra mede os minutos de fala fora do dia mais longo', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaSobra(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há sobra de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.sobra, 0);
    const vazio = textoDaSobra({}, '2026-11-04');
    assert.equal(vazio.texto, 'A sobra dos dias ainda é 0 minutos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.sobra, 0);
    const umDia = textoDaSobra({ '2026-11-04': { n: 1, segundos: 600 } }, '2026-11-04');
    assert.equal(umDia.dias, 1);
    assert.equal(umDia.sobra, 0);
    assert.equal(umDia.texto, 'A sobra dos dias é de 0 minutos.');
    const umMinuto = textoDaSobra({
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(umMinuto.dias, 2);
    assert.equal(umMinuto.sobra, 1);
    assert.equal(umMinuto.texto, 'A sobra dos dias é de 1 minuto.');
    const curto = textoDaSobra({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(curto.dias, 2);
    assert.equal(curto.sobra, 0);
    assert.equal(curto.texto, 'A sobra dos dias é de 0 minutos.');
    const igual = textoDaSobra({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.sobra, 4);
    assert.equal(igual.texto, 'A sobra dos dias é de 4 minutos.');
    const futuro = textoDaSobra({
      '2026-10-28': { n: 1, segundos: 120 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.sobra, 0);
    assert.equal(futuro.texto, 'A sobra dos dias é de 0 minutos.');
    const mudo = textoDaSobra({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.sobra, 0);
    assert.equal(mudo.texto, 'A sobra dos dias é de 0 minutos.');
    const zerado = textoDaSobra({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.sobra, 0);
  });

  test('a versão 2.85 deixa o rumor fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.85'/);
    assert.match(data, /versao: '2\.84'/);
    assert.match(sw, /gringolingo-v112/);
    assert.match(sw, /\.\/js\/rumor\.js/);
    assert.match(turno, /rumor\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarRumor', 'pintarReparo', 'pintarDeixa']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaContornos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaRumores'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /rumor: telaRumores/);
    assert.match(mapa, /reparo: telaReparos/);
    assert.match(mapa, /deixa: telaDeixas/);
    const sobra = app.slice(app.indexOf('function cartaoSobra'), app.indexOf('function blocoFluencia'));
    assert.match(sobra, /fala-sobra/);
    assert.match(sobra, /VER A SEMANA/);
    assert.equal(sobra.includes('function cartaoPeso'), false);
    assert.equal(sobra.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-sobra {'), css.indexOf('.fala-sobra {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const boas = css.slice(css.indexOf('.boas-vindas {'), css.indexOf('.boas-vindas {') + 80);
    assert.match(boas, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoSobra\(/g) || []).length, 1);
  });
});
