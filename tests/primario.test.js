import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PRIMARIOS, avaliarPrimario, ESPELHOS, avaliarEspelho, ASCENSOES, avaliarAscensao
} = await import('../js/primario.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaDensidade } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPrimario, registrarEspelho, registrarAscensao
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'primario.js') continue;
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
  'The failure undoes the previous step.'
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

describe('primário, espelho e ascensão', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/primario.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(PRIMARIOS, ['Aceita', 'Espera'], avaliarPrimario);
    conferir(ESPELHOS, ['Copia', 'Segue'], avaliarEspelho);
    conferir(ASCENSOES, ['Sobe', 'Fecha'], avaliarAscensao);
    const ids = [...PRIMARIOS, ...ESPELHOS, ...ASCENSOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const primario = PRIMARIOS.find(c => c.id === 'primario2').rodadas[0];
    assert.equal(avaliarPrimario(primario, 'The primary accepted 2 writes.').ok, true);
    const espelho = ESPELHOS.find(c => c.id === 'espelho3').rodadas[0];
    assert.equal(avaliarEspelho(espelho, 'The mirror copied 3 entries.').ok, true);
    const ascensao = ASCENSOES.find(c => c.id === 'ascensao4').rodadas[0];
    assert.equal(avaliarAscensao(ascensao, 'The promotion covered 4 nodes.').ok, true);
    const texto = JSON.stringify({ PRIMARIOS, ESPELHOS, ASCENSOES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Primário' && f.melhor === 'The primary accepts the new write.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Espelho' && f.melhor === 'The mirror follows without writing.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Ascensão' && f.melhor === 'The copy becomes primary when the owner falls.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['primario', 'espelho', 'ascensao']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('primário, espelho e ascensão contam no próprio contador', () => {
    travarMissao('primario1');
    const primario = registrarPrimario(fim());
    assert.equal(primario.bonusMissoes, 15);
    assert.equal(estado.stats.primarios, 1);
    assert.equal(estado.stats.espelhos, 0);
    assert.equal(estado.stats.ascensoes, 0);
    assert.equal(estado.stats.orquestradores, 0);
    assert.equal(estado.stats.compensacoes, 0);
    assert.ok(estado.badges.includes('primario'));
    for (const id of ['espelho', 'ascensao', 'orquestrador', 'compensacao']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('espelho1');
    const espelho = registrarEspelho(fim());
    assert.equal(espelho.bonusMissoes, 15);
    assert.equal(estado.stats.espelhos, 1);
    assert.equal(estado.stats.primarios, 1);
    assert.ok(estado.badges.includes('espelho'));

    travarMissao('ascensao1');
    const ascensao = registrarAscensao(fim());
    assert.equal(ascensao.bonusMissoes, 15);
    assert.equal(estado.stats.ascensoes, 1);
    assert.equal(estado.stats.compensacoes, 0);
    assert.ok(estado.badges.includes('ascensao'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 286);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a densidade mede os minutos de fala por semana do intervalo', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaDensidade(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há densidade de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.densidade, 0);
    const vazio = textoDaDensidade({}, '2026-11-04');
    assert.equal(vazio.texto, 'A densidade dos dias ainda é 0 minutos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.densidade, 0);
    const soSegundos = textoDaDensidade({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.densidade, 7);
    assert.equal(soSegundos.texto, 'A densidade dos dias é de 7 minutos por semana.');
    const um = textoDaDensidade({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.densidade, 7);
    assert.equal(um.texto, 'A densidade dos dias é de 7 minutos por semana.');
    const longe = textoDaDensidade({ '2026-10-01': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(longe.dias, 1);
    assert.equal(longe.densidade, 0);
    assert.equal(longe.texto, 'A densidade dos dias é de 0 minutos por semana.');
    const par = textoDaDensidade({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.densidade, 1);
    assert.equal(par.texto, 'A densidade dos dias é de 1 minuto por semana.');
    const seguido = textoDaDensidade({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(seguido.dias, 2);
    assert.equal(seguido.densidade, 4);
    assert.equal(seguido.texto, 'A densidade dos dias é de 4 minutos por semana.');
    const aberto = textoDaDensidade({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(aberto.dias, 2);
    assert.equal(aberto.densidade, 1);
    assert.equal(aberto.texto, 'A densidade dos dias é de 1 minuto por semana.');
    const igual = textoDaDensidade({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.densidade, 10);
    assert.equal(igual.texto, 'A densidade dos dias é de 10 minutos por semana.');
    const futuro = textoDaDensidade({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.densidade, 1);
    assert.equal(futuro.texto, 'A densidade dos dias é de 1 minuto por semana.');
    const zerado = textoDaDensidade({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.densidade, 0);
  });

  test('a versão 2.83 deixa o primário fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.83'/);
    assert.match(data, /versao: '2\.82'/);
    assert.match(sw, /gringolingo-v110/);
    assert.match(sw, /\.\/js\/primario\.js/);
    assert.match(turno, /primario\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPrimario', 'pintarEspelho', 'pintarAscensao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCompensacoes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaPrimarios'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /primario: telaPrimarios/);
    assert.match(mapa, /espelho: telaEspelhos/);
    assert.match(mapa, /ascensao: telaAscensoes/);
    const densidade = app.slice(app.indexOf('function cartaoDensidade'), app.indexOf('function blocoFluencia'));
    assert.match(densidade, /fala-densidade/);
    assert.match(densidade, /VER A SEMANA/);
    assert.equal(densidade.includes('function cartaoCadencia'), false);
    assert.equal(densidade.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-densidade {'), css.indexOf('.fala-densidade {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const meta = css.slice(css.indexOf('.meta-card {'), css.indexOf('.meta-card {') + 80);
    assert.match(meta, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoDensidade\(/g) || []).length, 1);
  });
});
