import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  GOTEJOS, avaliarGotejo, FRIOS, avaliarFrio, CADEADOS, avaliarCadeado
} = await import('../js/gotejo.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaPrimeira } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarGotejo, registrarFrio, registrarCadeado
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'gotejo.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The disk ran out of file names.',
  'The service got the stop signal.',
  'The cache expired all at once.',
  'The server started using swap.',
  'The page runs one query per row.',
  'Nothing listens on that port.'
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

describe('gotejo, frio e cadeado', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/gotejo.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(GOTEJOS, ['Sobe', 'Devolve'], avaliarGotejo);
    conferir(FRIOS, ['Dorme', 'Acorda'], avaliarFrio);
    conferir(CADEADOS, ['Tenta', 'Libera'], avaliarCadeado);
    const ids = [...GOTEJOS, ...FRIOS, ...CADEADOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const mega = GOTEJOS.find(c => c.id === 'quarentamega').rodadas[0];
    assert.equal(avaliarGotejo(mega, 'The process grew 40 megabytes.').ok, true);
    const espera = FRIOS.find(c => c.id === 'quatrofrio').rodadas[0];
    assert.equal(avaliarFrio(espera, 'The first call waited 4 seconds.').ok, true);
    const tres = CADEADOS.find(c => c.id === 'tresarquivos').rodadas[0];
    assert.equal(avaliarCadeado(tres, '3 files refused the read.').ok, true);
    const texto = JSON.stringify({ GOTEJOS, FRIOS, CADEADOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Gotejo' && f.melhor === 'The memory keeps growing.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Frio' && f.melhor === 'The function woke from a cold start.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cadeado' && f.melhor === 'The process cannot read that file.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['gotejo', 'frio', 'cadeado']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('gotejo, frio e cadeado contam no próprio contador', () => {
    travarMissao('gotejo1');
    const gotejo = registrarGotejo(fim());
    assert.equal(gotejo.bonusMissoes, 15);
    assert.equal(estado.stats.gotejos, 1);
    assert.equal(estado.stats.manadas, 0);
    assert.equal(estado.stats.frios, 0);
    assert.ok(estado.badges.includes('gotejo'));
    for (const id of ['frio', 'cadeado', 'manada', 'inodo']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('frio1');
    const frio = registrarFrio(fim());
    assert.equal(frio.bonusMissoes, 15);
    assert.equal(estado.stats.frios, 1);
    assert.equal(estado.stats.gotejos, 1);
    assert.ok(estado.badges.includes('frio'));

    travarMissao('cadeado1');
    const cadeado = registrarCadeado(fim());
    assert.equal(cadeado.bonusMissoes, 15);
    assert.equal(estado.stats.cadeados, 1);
    assert.equal(estado.stats.saidas, 0);
    assert.ok(estado.badges.includes('cadeado'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 205);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a primeira fala é o dia mais antigo com registro', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDaPrimeira(null, '2026-10-28');
    assert.equal(vazia.texto, 'Ainda não há primeira fala.');
    assert.equal(vazia.dias, null);
    const invalida = textoDaPrimeira({ '2026-10-28': { n: 1 } }, 'ontem');
    assert.equal(invalida.dias, null);
    const hoje = textoDaPrimeira({ '2026-10-28': { n: '1', segundos: 0 } }, '2026-10-28');
    assert.equal(hoje.dias, 0);
    assert.equal(hoje.texto, 'A primeira fala foi hoje.');
    const ontem = textoDaPrimeira({ '2026-10-27': { segundos: 12, n: 0 } }, '2026-10-28');
    assert.equal(ontem.dias, 1);
    assert.equal(ontem.texto, 'A primeira fala foi ontem.');
    const tres = textoDaPrimeira({
      '2026-10-25': { n: 2, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 20 },
      '2026-10-29': { n: 9, segundos: 90 }
    }, '2026-10-28');
    assert.equal(tres.dias, 3);
    assert.equal(tres.texto, 'A primeira fala foi há 3 dias.');
    const zerado = textoDaPrimeira({ '2026-10-28': { n: 0, segundos: 0 } }, '2026-10-28');
    assert.equal(zerado.dias, null);
  });

  test('a versão 2.56 deixa o gotejo fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.56'/);
    assert.match(data, /versao: '2\.55'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/gotejo\.js/);
    assert.match(turno, /gotejo\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarGotejo', 'pintarFrio', 'pintarCadeado']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaManadas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaGotejos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /gotejo: telaGotejos/);
    assert.match(mapa, /frio: telaFrios/);
    assert.match(mapa, /cadeado: telaCadeados/);
    const primeira = app.slice(app.indexOf('function cartaoPrimeira'), app.indexOf('function blocoFluencia'));
    assert.match(primeira, /fala-primeira/);
    assert.match(primeira, /VER A SEMANA/);
    assert.equal(primeira.includes('function cartaoUltima'), false);
    assert.equal(primeira.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-primeira {'), css.indexOf('.fala-primeira {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('button.revisao,'), css.indexOf('button.revisao,') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /class: 'card revisao conversa-atalho', type: 'button'/);
    assert.match(app, /class: 'card conta-card conta-entrar', type: 'button'/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoPrimeira\(/g) || []).length, 1);
  });
});
