import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  GOSSIPS, avaliarGossip, PHIS, avaliarPhi, ACCRUALS, avaliarAccrual
} = await import('../js/gossip.js');
const { TREINOS, auditarCatalogo, textoDoGrupo } = await import('../js/hub.js');
const {
  textoDaAusencia, textoDoFecho, textoDaEstacao, textoDoMosaico
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarGossip, registrarPhi, registrarAccrual
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'gossip.js') continue;
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

describe('gossip, phi e accrual', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/gossip.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(GOSSIPS, ['Troca', 'Segue'], avaliarGossip);
    conferir(PHIS, ['Sobe', 'Segue'], avaliarPhi);
    conferir(ACCRUALS, ['Soma', 'Segue'], avaliarAccrual);
    const ids = [...GOSSIPS, ...PHIS, ...ACCRUALS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const gossip = GOSSIPS.find(c => c.id === 'gossip2').rodadas[0];
    assert.equal(avaliarGossip(gossip, 'The gossip shared 2 states.').ok, true);
    const phi = PHIS.find(c => c.id === 'phi3').rodadas[0];
    assert.equal(avaliarPhi(phi, 'The phi raised 3 suspicions.').ok, true);
    const accrual = ACCRUALS.find(c => c.id === 'accrual4').rodadas[0];
    assert.equal(avaliarAccrual(accrual, 'The accrual added 4 failures.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Gossip' && f.melhor === 'The nodes share state with each other.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Phi' && f.melhor === 'The suspicion rises when the node pauses.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Accrual' && f.melhor === 'The failure adds up little by little.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['gossip', 'phi', 'accrual']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A ausência'), false);
  });

  test('gossip, phi e accrual contam no próprio contador', () => {
    travarMissao('gossip1');
    const gossip = registrarGossip(fim());
    assert.equal(gossip.bonusMissoes, 15);
    assert.equal(estado.stats.gossips, 1);
    assert.equal(estado.stats.phis, 0);
    assert.equal(estado.stats.accruals, 0);
    assert.equal(estado.stats.tries, 0);
    assert.ok(estado.badges.includes('gossip'));
    for (const id of ['phi', 'accrual', 'trie']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('phi1');
    const phi = registrarPhi(fim());
    assert.equal(phi.bonusMissoes, 15);
    assert.equal(estado.stats.phis, 1);
    assert.equal(estado.stats.gossips, 1);
    assert.ok(estado.badges.includes('phi'));

    travarMissao('accrual1');
    const accrual = registrarAccrual(fim());
    assert.equal(accrual.bonusMissoes, 15);
    assert.equal(estado.stats.accruals, 1);
    assert.equal(estado.stats.tries, 0);
    assert.ok(estado.badges.includes('accrual'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 334);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a ausência nomeia o grupo que a fala ainda não tocou', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaAusencia(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.id, '');
    assert.equal(invalido.texto, 'Ainda não há ausência de fala.');
    const vazio = textoDaAusencia({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.id, '');
    assert.equal(vazio.texto, 'A ausência ainda não tem fala.');
    const soTrabalho = textoDaAusencia({
      '2026-11-04': diaFala({ trabalho: 2 })
    }, '2026-11-04');
    assert.equal(soTrabalho.dias, 1);
    assert.equal(soTrabalho.id, 'entrevista');
    assert.equal(soTrabalho.titulo, 'Entrevista');
    assert.equal(soTrabalho.texto, 'A ausência ficou na entrevista.');
    assert.equal(/\d/.test(soTrabalho.texto), false);
    assert.equal(soTrabalho.texto.includes('segundos'), false);
    assert.equal(soTrabalho.texto.includes('treino'), false);
    const semente = {
      '2026-10-31': diaFala({ trabalho: 1 }),
      '2026-11-01': diaFala({ trabalho: 1 }),
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-03': diaFala({ trabalho: 1 }),
      '2026-11-04': diaFala({ trabalho: 1 })
    };
    const cheio = textoDaAusencia(semente, '2026-11-04');
    assert.equal(cheio.texto, 'A ausência ficou na entrevista.');
    assert.equal(cheio.texto === textoDoFecho(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDaEstacao(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDoMosaico(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDoGrupo(TREINOS, {}).texto, false);
    const diaADia = textoDaAusencia({
      '2026-11-04': diaFala({ trabalho: 1, entrevista: 1 })
    }, '2026-11-04');
    assert.equal(diaADia.id, 'cotidiano');
    assert.equal(diaADia.texto, 'A ausência ficou no dia a dia.');
    const pronuncia = textoDaAusencia({
      '2026-11-04': diaFala({ trabalho: 1, entrevista: 1, cotidiano: 1 })
    }, '2026-11-04');
    assert.equal(pronuncia.texto, 'A ausência ficou na pronúncia.');
    const revisao = textoDaAusencia({
      '2026-11-04': diaFala({ trabalho: 1, entrevista: 1, cotidiano: 1, pronuncia: 1 })
    }, '2026-11-04');
    assert.equal(revisao.texto, 'A ausência ficou na revisão.');
    const todos = textoDaAusencia({
      '2026-11-04': diaFala({ trabalho: 1, entrevista: 1, cotidiano: 1, pronuncia: 1, revisao: 1 })
    }, '2026-11-04');
    assert.equal(todos.id, '');
    assert.equal(todos.texto, 'A ausência não sobrou em grupo nenhum.');
    const futuro = textoDaAusencia({
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-08': diaFala({ entrevista: 1, cotidiano: 1, pronuncia: 1, revisao: 1 })
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.id, 'entrevista');
    const mudo = textoDaAusencia({
      '2026-11-04': { n: 0, segundos: 0, grupos: { entrevista: 4 } },
      '2026-11-01': diaFala({ trabalho: 1 })
    }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.texto, 'A ausência ficou na entrevista.');
    const semGrupo = textoDaAusencia({
      '2026-11-04': { n: 1, segundos: 8 }
    }, '2026-11-04');
    assert.equal(semGrupo.texto, 'A ausência ficou no trabalho.');
  });

  test('a versão 2.99 deixa o gossip fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.99'/);
    assert.match(data, /versao: '2\.98'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/gossip\.js/);
    assert.match(turno, /gossip\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarGossip', 'pintarPhi', 'pintarAccrual']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaTries'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaGossips'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /gossip: telaGossips/);
    assert.match(mapa, /phi: telaPhis/);
    assert.match(mapa, /accrual: telaAccruals/);
    const ausencia = app.slice(app.indexOf('function cartaoAusencia'), app.indexOf('function blocoFluencia'));
    assert.match(ausencia, /fala-ausencia/);
    assert.match(ausencia, /A ausência/);
    assert.match(ausencia, /VER O GRUPO/);
    assert.equal(ausencia.includes('function cartaoFecho'), false);
    assert.equal(ausencia.includes('function cartaoEstacao'), false);
    const regra = css.slice(css.indexOf('.fala-ausencia {'), css.indexOf('.fala-ausencia {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const rodape = css.slice(css.indexOf('.rodape-conteudo > .btn {'), css.indexOf('.rodape-conteudo > .btn {') + 120);
    assert.match(rodape, /max-width: 100%/);
    assert.match(rodape, /min-height: 44px/);
    assert.match(css, /\.rodape-conteudo \{[^}]*flex-wrap: wrap/);
    assert.equal((app.match(/function cartaoFecho\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoAusencia\(/g) || []).length, 1);
    assert.equal((app.match(/A ausência/g) || []).length, 1);
    assert.equal((app.match(/O fecho/g) || []).length, 1);
  });
});
