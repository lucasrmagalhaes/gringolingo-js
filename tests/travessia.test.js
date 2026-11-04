import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  TRAVESSIAS, avaliarTravessia, RETAGUARDAS, avaliarRetaguarda, CONTORNOS, avaliarContorno
} = await import('../js/travessia.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoPeso } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarTravessia, registrarRetaguarda, registrarContorno
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'travessia.js') continue;
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
  'The copy becomes primary when the owner falls.'
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

describe('travessia, retaguarda e contorno', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/travessia.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(TRAVESSIAS, ['Confirma', 'Espera'], avaliarTravessia);
    conferir(RETAGUARDAS, ['Segura', 'Segue'], avaliarRetaguarda);
    conferir(CONTORNOS, ['Pula', 'Fecha'], avaliarContorno);
    const ids = [...TRAVESSIAS, ...RETAGUARDAS, ...CONTORNOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const travessia = TRAVESSIAS.find(c => c.id === 'travessia2').rodadas[0];
    assert.equal(avaliarTravessia(travessia, 'The write-through saved 2 copies.').ok, true);
    const retaguarda = RETAGUARDAS.find(c => c.id === 'retaguarda3').rodadas[0];
    assert.equal(avaliarRetaguarda(retaguarda, 'The cache held 3 dirty pages.').ok, true);
    const contorno = CONTORNOS.find(c => c.id === 'contorno4').rodadas[0];
    assert.equal(avaliarContorno(contorno, 'The bypass covered 4 writes.').ok, true);
    const texto = JSON.stringify({ TRAVESSIAS, RETAGUARDAS, CONTORNOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Travessia' && f.melhor === 'The write reaches the disk at once.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Retaguarda' && f.melhor === 'The dirty page waits in the cache.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Contorno' && f.melhor === 'The large write skips the cache.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['travessia', 'retaguarda', 'contorno']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('travessia, retaguarda e contorno contam no próprio contador', () => {
    travarMissao('travessia1');
    const travessia = registrarTravessia(fim());
    assert.equal(travessia.bonusMissoes, 15);
    assert.equal(estado.stats.travessias, 1);
    assert.equal(estado.stats.retaguardas, 0);
    assert.equal(estado.stats.contornos, 0);
    assert.equal(estado.stats.primarios, 0);
    assert.equal(estado.stats.ascensoes, 0);
    assert.ok(estado.badges.includes('travessia'));
    for (const id of ['retaguarda', 'contorno', 'primario', 'ascensao']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('retaguarda1');
    const retaguarda = registrarRetaguarda(fim());
    assert.equal(retaguarda.bonusMissoes, 15);
    assert.equal(estado.stats.retaguardas, 1);
    assert.equal(estado.stats.travessias, 1);
    assert.ok(estado.badges.includes('retaguarda'));

    travarMissao('contorno1');
    const contorno = registrarContorno(fim());
    assert.equal(contorno.bonusMissoes, 15);
    assert.equal(estado.stats.contornos, 1);
    assert.equal(estado.stats.ascensoes, 0);
    assert.ok(estado.badges.includes('contorno'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 289);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o peso mede a parte do dia mais longo no total de fala', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoPeso(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há peso de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.peso, 0);
    const vazio = textoDoPeso({}, '2026-11-04');
    assert.equal(vazio.texto, 'O peso dos dias ainda é 0 por cento.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.peso, 0);
    const soSegundos = textoDoPeso({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.peso, 100);
    assert.equal(soSegundos.texto, 'O peso dos dias é de 100 por cento.');
    const um = textoDoPeso({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.peso, 100);
    assert.equal(um.texto, 'O peso dos dias é de 100 por cento.');
    const metade = textoDoPeso({
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(metade.dias, 2);
    assert.equal(metade.peso, 50);
    assert.equal(metade.texto, 'O peso dos dias é de 50 por cento.');
    const miudo = {};
    for (let i = 0; i < 100; i++) {
      const data = new Date(2026, 10, 4);
      data.setDate(data.getDate() - i);
      const iso = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
      miudo[iso] = { n: 1, segundos: 1 };
    }
    const umPorCento = textoDoPeso(miudo, '2026-11-04');
    assert.equal(umPorCento.dias, 100);
    assert.equal(umPorCento.peso, 1);
    assert.equal(umPorCento.texto, 'O peso dos dias é de 1 por cento.');
    const igual = textoDoPeso({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.peso, 71);
    assert.equal(igual.texto, 'O peso dos dias é de 71 por cento.');
    const futuro = textoDoPeso({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.peso, 100);
    assert.equal(futuro.texto, 'O peso dos dias é de 100 por cento.');
    const mudo = textoDoPeso({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.peso, 0);
    assert.equal(mudo.texto, 'O peso dos dias é de 0 por cento.');
    const zerado = textoDoPeso({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.peso, 0);
  });

  test('a versão 2.84 deixa a travessia fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.84'/);
    assert.match(data, /versao: '2\.83'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/travessia\.js/);
    assert.match(turno, /travessia\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarTravessia', 'pintarRetaguarda', 'pintarContorno']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaAscensoes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaTravessias'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /travessia: telaTravessias/);
    assert.match(mapa, /retaguarda: telaRetaguardas/);
    assert.match(mapa, /contorno: telaContornos/);
    const peso = app.slice(app.indexOf('function cartaoPeso'), app.indexOf('function blocoFluencia'));
    assert.match(peso, /fala-peso/);
    assert.match(peso, /VER A SEMANA/);
    assert.equal(peso.includes('function cartaoDensidade'), false);
    assert.equal(peso.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-peso {'), css.indexOf('.fala-peso {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const missao = css.slice(css.indexOf('.missao {'), css.indexOf('.missao {') + 80);
    assert.match(missao, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoPeso\(/g) || []).length, 1);
  });
});
