import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ANCORAS, avaliarAncora, MALHAS, avaliarMalha, FENDAS, avaliarFenda
} = await import('../js/ancora.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoVao } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarAncora, registrarMalha, registrarFenda
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'ancora.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The ack rides on the next packet.',
  'The poison message left the queue.',
  'The heartbeat shows the service is alive.',
  'Each failure doubles the wait.',
  'The watchdog stops the late task.',
  'The pass expires in fifteen minutes.',
  'Only two jobs can pass together.',
  'All four people must arrive together.',
  'The latch opens when the count hits zero.'
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

describe('ancora, malha e fenda', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/ancora.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(ANCORAS, ['Marca', 'Volta'], avaliarAncora);
    conferir(MALHAS, ['Liga', 'Passa'], avaliarMalha);
    conferir(FENDAS, ['Divide', 'Mede'], avaliarFenda);
    const ids = [...ANCORAS, ...MALHAS, ...FENDAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const ancora = ANCORAS.find(c => c.id === 'ancora2').rodadas[0];
    assert.equal(avaliarAncora(ancora, 'The anchor kept 2 copies.').ok, true);
    const malha = MALHAS.find(c => c.id === 'malha4').rodadas[0];
    assert.equal(avaliarMalha(malha, 'The mesh linked 4 services.').ok, true);
    const fenda = FENDAS.find(c => c.id === 'fenda50').rodadas[0];
    assert.equal(avaliarFenda(fenda, 'The split sent 50 percent aside.').ok, true);
    const texto = JSON.stringify({ ANCORAS, MALHAS, FENDAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Âncora' && f.melhor === 'The anchor keeps the old state.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Malha' && f.melhor === 'Each service talks only to its neighbor.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Fenda' && f.melhor === 'The traffic splits across two live versions.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['ancora', 'malha', 'fenda']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('ancora, malha e fenda contam no próprio contador', () => {
    travarMissao('ancora1');
    const ancora = registrarAncora(fim());
    assert.equal(ancora.bonusMissoes, 15);
    assert.equal(estado.stats.ancoras, 1);
    assert.equal(estado.stats.farois, 0);
    assert.equal(estado.stats.malhas, 0);
    assert.equal(estado.stats.fendas, 0);
    assert.ok(estado.badges.includes('ancora'));
    for (const id of ['malha', 'fenda', 'carona', 'farol']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('malha1');
    const malha = registrarMalha(fim());
    assert.equal(malha.bonusMissoes, 15);
    assert.equal(estado.stats.malhas, 1);
    assert.equal(estado.stats.ancoras, 1);
    assert.ok(estado.badges.includes('malha'));

    travarMissao('fenda1');
    const fenda = registrarFenda(fim());
    assert.equal(fenda.bonusMissoes, 15);
    assert.equal(estado.stats.fendas, 1);
    assert.equal(estado.stats.farois, 0);
    assert.ok(estado.badges.includes('fenda'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 271);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o vão conta os dias vazios desde a primeira fala', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoVao(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há vão de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.vao, 0);
    const vazio = textoDoVao({}, '2026-11-04');
    assert.equal(vazio.texto, 'O vão dos dias ainda é 0 dias.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.vao, 0);
    const soSegundos = textoDoVao({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.vao, 0);
    assert.equal(soSegundos.texto, 'O vão dos dias é de 0 dias.');
    const um = textoDoVao({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.vao, 0);
    assert.equal(um.texto, 'O vão dos dias é de 0 dias.');
    const antes = textoDoVao({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(antes.dias, 1);
    assert.equal(antes.vao, 7);
    assert.equal(antes.texto, 'O vão dos dias é de 7 dias.');
    const umDia = textoDoVao({
      '2026-11-02': { n: 1, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(umDia.dias, 2);
    assert.equal(umDia.vao, 1);
    assert.equal(umDia.texto, 'O vão dos dias é de 1 dia.');
    const par = textoDoVao({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.vao, 8);
    assert.equal(par.texto, 'O vão dos dias é de 8 dias.');
    const igual = textoDoVao({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.vao, 5);
    assert.equal(igual.texto, 'O vão dos dias é de 5 dias.');
    const futuro = textoDoVao({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.vao, 7);
    assert.equal(futuro.texto, 'O vão dos dias é de 7 dias.');
    const zerado = textoDoVao({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.vao, 0);
  });

  test('a versão 2.78 deixa a âncora fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.78'/);
    assert.match(data, /versao: '2\.77'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/ancora\.js/);
    assert.match(turno, /ancora\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarAncora', 'pintarMalha', 'pintarFenda']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaFarois'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaAncoras'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /ancora: telaAncoras/);
    assert.match(mapa, /malha: telaMalhas/);
    assert.match(mapa, /fenda: telaFendas/);
    const vao = app.slice(app.indexOf('function cartaoVao'), app.indexOf('function blocoFluencia'));
    assert.match(vao, /fala-vao/);
    assert.match(vao, /VER A SEMANA/);
    assert.equal(vao.includes('function cartaoExtensao'), false);
    assert.equal(vao.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-vao {'), css.indexOf('.fala-vao {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.unidade-cab {'), css.indexOf('.unidade-cab {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(rapidoSessao\.i \+ 1 >= rapidoSessao\.fila\.length\) concluirRapido\(\);/);
    assert.match(app, /type: 'button', disabled: true \}, 'ENVIAR'/);
    assert.match(app, /type: 'button', disabled: !entrada\.value\.trim\(\) \}, 'ENVIAR'/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoVao\(/g) || []).length, 1);
  });
});
