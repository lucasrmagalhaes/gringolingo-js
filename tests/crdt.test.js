import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CRDTS, avaliarCrdt, LWWS, avaliarLww, ORSETS, avaliarOrset
} = await import('../js/crdt.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoRecado, textoDaPratica, textoDoReforco, textoDaAusencia
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCrdt, registrarLww, registrarOrset
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'crdt.js') continue;
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

describe('crdt, lww e orset', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/crdt.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(CRDTS, ['Junta', 'Segue'], avaliarCrdt);
    conferir(LWWS, ['Vence', 'Segue'], avaliarLww);
    conferir(ORSETS, ['Guarda', 'Segue'], avaliarOrset);
    const ids = [...CRDTS, ...LWWS, ...ORSETS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const crdt = CRDTS.find(c => c.id === 'crdt2').rodadas[0];
    assert.equal(avaliarCrdt(crdt, 'The crdt merged 2 edits.').ok, true);
    const lww = LWWS.find(c => c.id === 'lww3').rodadas[0];
    assert.equal(avaliarLww(lww, 'The last write won 3 fields.').ok, true);
    const orset = ORSETS.find(c => c.id === 'orset4').rodadas[0];
    assert.equal(avaliarOrset(orset, 'The set held 4 items.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Crdt' && f.melhor === 'The crdt merges the edits without a lock.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Lww' && f.melhor === 'The last write wins the field.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Orset' && f.melhor === 'The set holds the item until the removal shows up.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['crdt', 'lww', 'orset']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O recado'), false);
  });

  test('crdt, lww e orset contam no próprio contador', () => {
    travarMissao('crdt1');
    const crdt = registrarCrdt(fim());
    assert.equal(crdt.bonusMissoes, 15);
    assert.equal(estado.stats.crdts, 1);
    assert.equal(estado.stats.lwws, 0);
    assert.equal(estado.stats.orsets, 0);
    assert.equal(estado.stats.hypers, 0);
    assert.ok(estado.badges.includes('crdt'));
    for (const id of ['lww', 'orset', 'hyper']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('lww1');
    const lww = registrarLww(fim());
    assert.equal(lww.bonusMissoes, 15);
    assert.equal(estado.stats.lwws, 1);
    assert.equal(estado.stats.crdts, 1);
    assert.ok(estado.badges.includes('lww'));

    travarMissao('orset1');
    const orset = registrarOrset(fim());
    assert.equal(orset.bonusMissoes, 15);
    assert.equal(estado.stats.orsets, 1);
    assert.equal(estado.stats.hypers, 0);
    assert.ok(estado.badges.includes('orset'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 343);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o recado pede o treino do último grupo ainda sem fala', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoRecado(null, 'ontem', TREINOS, {});
    assert.equal(invalido.dias, null);
    assert.equal(invalido.id, '');
    assert.equal(invalido.texto, 'Ainda não há recado de fala.');
    const vazio = textoDoRecado({}, '2026-11-04', TREINOS, {});
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.id, '');
    assert.equal(vazio.texto, 'O recado ainda não tem fala.');
    const semente = {
      '2026-10-31': diaFala({ trabalho: 1 }),
      '2026-11-01': diaFala({ trabalho: 1 }),
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-03': diaFala({ trabalho: 1 }),
      '2026-11-04': diaFala({ trabalho: 1 })
    };
    const desafio = textoDoRecado(semente, '2026-11-04', TREINOS, {});
    assert.equal(desafio.dias, 5);
    assert.equal(desafio.id, 'desafio');
    assert.equal(desafio.titulo, 'Desafio do dia');
    assert.equal(desafio.texto, 'O recado pede Desafio do dia. A sequência aumenta as frases.');
    assert.equal(/\d/.test(desafio.texto), false);
    assert.equal(desafio.texto.includes('segundos'), false);
    assert.equal(desafio.texto === textoDaPratica(semente, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(desafio.texto === textoDoReforco(semente, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(desafio.texto === textoDaAusencia(semente, '2026-11-04').texto, false);
    const mistura = textoDoRecado(semente, '2026-11-04', TREINOS, { desafios: 1 });
    assert.equal(mistura.id, 'mistura');
    assert.equal(mistura.titulo, 'Três minutos');
    assert.equal(mistura.texto, 'O recado pede Três minutos. Frases dos treinos em 3 minutos.');
    const statsRevisao = {};
    for (const treino of TREINOS) {
      if (treino.categoria === 'revisao') statsRevisao[treino.stat] = 1;
    }
    const sotaque = textoDoRecado(semente, '2026-11-04', TREINOS, statsRevisao);
    assert.equal(sotaque.id, 'sotaque');
    assert.equal(sotaque.texto, 'O recado pede Sotaques. Americano, britânico e indiano.');
    const statsFaltam = {};
    for (const treino of TREINOS) {
      if (treino.categoria !== 'trabalho') statsFaltam[treino.stat] = 1;
    }
    const passou = textoDoRecado(semente, '2026-11-04', TREINOS, statsFaltam);
    assert.equal(passou.id, '');
    assert.equal(passou.texto, 'O recado já passou pelos grupos.');
    const todos = textoDoRecado({
      '2026-11-04': diaFala({ trabalho: 1, entrevista: 1, cotidiano: 1, pronuncia: 1, revisao: 1 })
    }, '2026-11-04', TREINOS, {});
    assert.equal(todos.id, '');
    assert.equal(todos.texto, 'O recado já passou pelos grupos.');
    const futuro = textoDoRecado({
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-08': diaFala({ revisao: 1 })
    }, '2026-11-04', TREINOS, {});
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.id, 'desafio');
    const mudo = textoDoRecado({
      '2026-11-04': { n: 0, segundos: 0, grupos: { revisao: 4 } },
      '2026-11-01': diaFala({ trabalho: 1 })
    }, '2026-11-04', TREINOS, {});
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.id, 'desafio');
    const semGrupo = textoDoRecado({
      '2026-11-04': { n: 1, segundos: 8 }
    }, '2026-11-04', TREINOS, {});
    assert.equal(semGrupo.id, 'desafio');
    assert.equal(semGrupo.texto, 'O recado pede Desafio do dia. A sequência aumenta as frases.');
  });

  test('a versão 3.02 deixa o crdt fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '3\.02'/);
    assert.match(data, /versao: '3\.01'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/crdt\.js/);
    assert.match(turno, /crdt\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCrdt', 'pintarLww', 'pintarOrset']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaHypers'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCrdts'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /crdt: telaCrdts/);
    assert.match(mapa, /lww: telaLwws/);
    assert.match(mapa, /orset: telaOrsets/);
    const recado = app.slice(app.indexOf('function cartaoRecado'), app.indexOf('function blocoFluencia'));
    assert.match(recado, /fala-recado/);
    assert.match(recado, /O recado/);
    assert.match(recado, /COMEÇAR/);
    assert.equal(recado.includes('function cartaoReforco'), false);
    assert.equal(recado.includes('function cartaoPratica'), false);
    const regra = css.slice(css.indexOf('.fala-recado {'), css.indexOf('.fala-recado {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    assert.match(css, /\.topo \{[^}]*flex-wrap: wrap/);
    const topo = css.slice(css.indexOf('.topo > button.pilula {'), css.indexOf('.topo > button.pilula {') + 140);
    assert.match(topo, /min-height: 44px/);
    assert.match(topo, /max-width: 100%/);
    assert.equal((app.match(/function cartaoRecado\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoReforco\(/g) || []).length, 1);
    assert.equal((app.match(/O recado/g) || []).length, 1);
    assert.equal((app.match(/O reforço/g) || []).length, 1);
  });
});
