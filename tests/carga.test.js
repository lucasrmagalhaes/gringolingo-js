import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CARGAS, avaliarCarga, BOLETINS, avaliarBoletim, DONOS, avaliarDono
} = await import('../js/carga.js');
const { textoDaSequencia } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCarga, registrarBoletim, registrarDono
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'carga.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The p95 latency went past two seconds.',
  'It should handle ten thousand users a day.',
  'One server gets the version first.',
  'The old path closes in June.',
  'The same event can arrive twice.'
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

describe('carga, boletim e quem aprova', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/carga.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(CARGAS, ['Tempo', 'Lugar'], avaliarCarga);
    conferir(BOLETINS, ['Lista', 'Leitura'], avaliarBoletim);
    conferir(DONOS, ['Pasta', 'Merge'], avaliarDono);
    const ids = [...CARGAS, ...BOLETINS, ...DONOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const minutos = CARGAS.find(c => c.id === 'dezminutos').rodadas[0];
    assert.equal(avaliarCarga(minutos, 'The load test ran for 10 minutes.').ok, true);
    const taxa = CARGAS.find(c => c.id === 'umporcento').rodadas[0];
    assert.equal(avaliarCarga(taxa, 'The error rate stayed under 1 percent.').ok, true);
    const nota = BOLETINS.find(c => c.id === 'trescorrecoes').rodadas[0];
    assert.equal(avaliarBoletim(nota, 'The note lists 3 fixes.').ok, true);
    const pasta = DONOS.find(c => c.id === 'doispasta').rodadas[0];
    assert.equal(avaliarDono(pasta, 'This folder has 2 owners.').ok, true);
    const texto = JSON.stringify({ CARGAS, BOLETINS, DONOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Carga' && f.melhor === 'The load test ran for ten minutes.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Boletim' && f.melhor === 'The note lists three fixes.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Dono' && f.melhor === 'This folder has two owners.'), true);
  });

  test('carga, boletim e dono contam no próprio contador', () => {
    travarMissao('carga1');
    const carga = registrarCarga(fim());
    assert.equal(carga.bonusMissoes, 15);
    assert.equal(estado.stats.cargas, 1);
    assert.equal(estado.stats.canarios, 0);
    assert.equal(estado.stats.boletins, 0);
    assert.ok(estado.badges.includes('carga'));
    for (const id of ['boletim', 'dono', 'repeticao', 'canario']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('boletim1');
    const boletim = registrarBoletim(fim());
    assert.equal(boletim.bonusMissoes, 15);
    assert.equal(estado.stats.boletins, 1);
    assert.equal(estado.stats.despedidas, 0);
    assert.ok(estado.badges.includes('boletim'));

    travarMissao('dono1');
    const dono = registrarDono(fim());
    assert.equal(dono.bonusMissoes, 15);
    assert.equal(estado.stats.donos, 1);
    assert.equal(estado.stats.repeticoes, 0);
    assert.ok(estado.badges.includes('dono'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 160);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a sequência de fala olha hoje e ontem', () => {
    assert.deepEqual(textoDaSequencia(null, '2026-10-28'), {
      dias: 0,
      emRisco: false,
      texto: 'A sequência de fala ainda não começou.'
    });
    assert.equal(textoDaSequencia({ '2026-10-28': { n: 1 } }, '2026-10-28').texto, '1 dia seguido de fala.');
    const dois = textoDaSequencia({
      '2026-10-28': { n: 2 },
      '2026-10-27': { n: 1 }
    }, '2026-10-28');
    assert.equal(dois.dias, 2);
    assert.equal(dois.emRisco, false);
    assert.equal(dois.texto, '2 dias seguidos de fala.');
    const risco = textoDaSequencia({ '2026-10-27': { n: 1 } }, '2026-10-28');
    assert.equal(risco.emRisco, true);
    assert.equal(risco.texto, 'A sequência de ontem ainda vale. Fale hoje para continuar.');
    const buraco = textoDaSequencia({ '2026-10-26': { n: 4 } }, '2026-10-28');
    assert.equal(buraco.emRisco, false);
    assert.equal(buraco.texto, 'A sequência de fala ainda não começou.');
    const virada = textoDaSequencia({
      '2026-11-01': { n: 1 },
      '2026-10-31': { n: 1 },
      '2026-10-30': { n: 1 }
    }, '2026-11-01');
    assert.equal(virada.dias, 3);
    assert.equal(virada.texto, '3 dias seguidos de fala.');
  });

  test('a versão 2.41 deixa a carga fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.41'/);
    assert.match(data, /versao: '2\.40'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/carga\.js/);
    assert.match(turno, /carga\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCarga', 'pintarBoletim', 'pintarDono']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaRepeticoes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCargas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /carga: telaCargas/);
    assert.match(mapa, /boletim: telaBoletins/);
    assert.match(mapa, /dono: telaDonos/);
    const sequencia = app.slice(app.indexOf('function cartaoSequencia'), app.indexOf('function blocoFluencia'));
    assert.match(sequencia, /fala-sequencia/);
    assert.match(sequencia, /FALAR HOJE/);
    const regra = css.slice(css.indexOf('.fala-sequencia {'), css.indexOf('.fala-sequencia {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const pilula = css.slice(css.indexOf('.fila-botoes > .pilula'), css.indexOf('.fila-botoes > .pilula') + 80);
    assert.match(pilula, /min-height: 44px/);
    assert.equal(pilula.includes('#'), false);
  });
});
