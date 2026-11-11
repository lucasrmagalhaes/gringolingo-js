import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ORQUESTRADORES, avaliarOrquestrador, COREOGRAFIAS, avaliarCoreografia, COMPENSACOES, avaliarCompensacao
} = await import('../js/orquestra.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaCadencia } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarOrquestrador, registrarCoreografia, registrarCompensacao
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'orquestra.js') continue;
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
  'The old pass stops working at once.'
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

describe('orquestrador, coreografia e compensação', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/orquestra.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(ORQUESTRADORES, ['Chama', 'Espera'], avaliarOrquestrador);
    conferir(COREOGRAFIAS, ['Decide', 'Segue'], avaliarCoreografia);
    conferir(COMPENSACOES, ['Desfaz', 'Fecha'], avaliarCompensacao);
    const ids = [...ORQUESTRADORES, ...COREOGRAFIAS, ...COMPENSACOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const orquestra = ORQUESTRADORES.find(c => c.id === 'orquestra2').rodadas[0];
    assert.equal(avaliarOrquestrador(orquestra, 'The orchestrator fired 2 steps.').ok, true);
    const coreografia = COREOGRAFIAS.find(c => c.id === 'coreografia3').rodadas[0];
    assert.equal(avaliarCoreografia(coreografia, '3 neighbors picked the next step.').ok, true);
    const compensacao = COMPENSACOES.find(c => c.id === 'compensa4').rodadas[0];
    assert.equal(avaliarCompensacao(compensacao, 'The failure undid 4 steps.').ok, true);
    const texto = JSON.stringify({ ORQUESTRADORES, COREOGRAFIAS, COMPENSACOES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Orquestrador' && f.melhor === 'The orchestrator fires the sequence.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Coreografia' && f.melhor === 'The neighbor picks the next step.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Compensação' && f.melhor === 'The failure undoes the previous step.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['orquestrador', 'coreografia', 'compensacao']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('orquestrador, coreografia e compensação contam no próprio contador', () => {
    travarMissao('orquestrador1');
    const orquestra = registrarOrquestrador(fim());
    assert.equal(orquestra.bonusMissoes, 15);
    assert.equal(estado.stats.orquestradores, 1);
    assert.equal(estado.stats.seguidores, 0);
    assert.equal(estado.stats.coreografias, 0);
    assert.equal(estado.stats.compensacoes, 0);
    assert.ok(estado.badges.includes('orquestrador'));
    for (const id of ['coreografia', 'compensacao', 'lider', 'seguidor']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('coreografia1');
    const coreografia = registrarCoreografia(fim());
    assert.equal(coreografia.bonusMissoes, 15);
    assert.equal(estado.stats.coreografias, 1);
    assert.equal(estado.stats.orquestradores, 1);
    assert.ok(estado.badges.includes('coreografia'));

    travarMissao('compensacao1');
    const compensacao = registrarCompensacao(fim());
    assert.equal(compensacao.bonusMissoes, 15);
    assert.equal(estado.stats.compensacoes, 1);
    assert.equal(estado.stats.seguidores, 0);
    assert.ok(estado.badges.includes('compensacao'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 283);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a cadência mede os dias de fala por semana do intervalo', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaCadencia(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há cadência de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.cadencia, 0);
    const vazio = textoDaCadencia({}, '2026-11-04');
    assert.equal(vazio.texto, 'A cadência dos dias ainda é 0.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.cadencia, 0);
    const soSegundos = textoDaCadencia({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.cadencia, 7);
    assert.equal(soSegundos.texto, 'A cadência dos dias é de 7 por semana.');
    const um = textoDaCadencia({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.cadencia, 7);
    assert.equal(um.texto, 'A cadência dos dias é de 7 por semana.');
    const longe = textoDaCadencia({ '2026-10-01': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(longe.dias, 1);
    assert.equal(longe.cadencia, 0);
    assert.equal(longe.texto, 'A cadência dos dias é de 0 por semana.');
    const par = textoDaCadencia({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.cadencia, 1);
    assert.equal(par.texto, 'A cadência dos dias é de 1 por semana.');
    const seguido = textoDaCadencia({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(seguido.dias, 2);
    assert.equal(seguido.cadencia, 7);
    assert.equal(seguido.texto, 'A cadência dos dias é de 7 por semana.');
    const aberto = textoDaCadencia({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(aberto.dias, 2);
    assert.equal(aberto.cadencia, 2);
    assert.equal(aberto.texto, 'A cadência dos dias é de 2 por semana.');
    const igual = textoDaCadencia({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.cadencia, 4);
    assert.equal(igual.texto, 'A cadência dos dias é de 4 por semana.');
    const futuro = textoDaCadencia({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.cadencia, 1);
    assert.equal(futuro.texto, 'A cadência dos dias é de 1 por semana.');
    const zerado = textoDaCadencia({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.cadencia, 0);
  });

  test('a versão 2.82 deixa o orquestrador fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.82'/);
    assert.match(data, /versao: '2\.81'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/orquestra\.js/);
    assert.match(turno, /orquestra\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarOrquestrador', 'pintarCoreografia', 'pintarCompensacao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaSeguidores'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaOrquestradores'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /orquestrador: telaOrquestradores/);
    assert.match(mapa, /coreografia: telaCoreografias/);
    assert.match(mapa, /compensacao: telaCompensacoes/);
    const cadencia = app.slice(app.indexOf('function cartaoCadencia'), app.indexOf('function blocoFluencia'));
    assert.match(cadencia, /fala-cadencia/);
    assert.match(cadencia, /VER A SEMANA/);
    assert.equal(cadencia.includes('function cartaoIntervalo'), false);
    assert.equal(cadencia.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-cadencia {'), css.indexOf('.fala-cadencia {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const nivel = css.slice(css.indexOf('.nivel-card {'), css.indexOf('.nivel-card {') + 80);
    assert.match(nivel, /min-height: 44px/);
    assert.match(app, /const verificar = h\('button', \{ class: 'btn btn-verde', type: 'button', disabled: true \}, 'VERIFICAR'\);\s*campo\.entrada\.addEventListener\('input', \(\) => \{\s*verificar\.disabled = !campo\.entrada\.value\.trim\(\);\s*\}\);\s*const enviar = async \(\) => \{\s*if \(!campo\.entrada\.value\.trim\(\) \|\| sessao\.feedback\) return;\s*await finalizarGravacao\(\);\s*const aval = T\.avaliarSotaque\(rodada, campo\.entrada\.value\);/);
    assert.match(app, /aria-label': 'Código fonte\. Abre em outra aba\.'/);
    const nome = css.slice(css.indexOf('.logo-marca .logo-nome {'), css.indexOf('.logo-marca .logo-nome {') + 220);
    assert.match(nome, /clip: rect/);
    assert.equal(nome.includes('display: none'), false);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoCadencia\(/g) || []).length, 1);
  });
});
