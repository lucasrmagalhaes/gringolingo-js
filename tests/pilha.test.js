import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PILHAS, avaliarPilha, CANOS, avaliarCano, GIROS, avaliarGiro
} = await import('../js/pilha.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoAuge } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPilha, registrarCano, registrarGiro
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'pilha.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The network dropped two packets.',
  'The short pass expired.',
  'The row stamp changed.',
  'Two nodes both think they lead.',
  'The memory keeps growing.'
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

describe('pilha, cano e giro', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/pilha.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(PILHAS, ['Sobe', 'Corta'], avaliarPilha);
    conferir(CANOS, ['Fecha', 'Abre'], avaliarCano);
    conferir(GIROS, ['Gira', 'Para'], avaliarGiro);
    const ids = [...PILHAS, ...CANOS, ...GIROS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const oito = PILHAS.find(c => c.id === 'oitomilpilha').rodadas[0];
    assert.equal(avaliarPilha(oito, 'The stack passed 8000 frames.').ok, true);
    const dois = CANOS.find(c => c.id === 'doisescritos').rodadas[0];
    assert.equal(avaliarCano(dois, 'The reset came after 2 writes.').ok, true);
    const seis = GIROS.find(c => c.id === 'seisvoltas').rodadas[0];
    assert.equal(avaliarGiro(seis, 'The loop stopped after 6 hops.').ok, true);
    const texto = JSON.stringify({ PILHAS, CANOS, GIROS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Pilha' && f.melhor === 'The call stack grew without end.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cano' && f.melhor === 'The other side closed the pipe.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Giro' && f.melhor === 'The browser spun between two addresses.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['pilha', 'cano', 'giro']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('pilha, cano e giro contam no próprio contador', () => {
    travarMissao('pilha1');
    const pilha = registrarPilha(fim());
    assert.equal(pilha.bonusMissoes, 15);
    assert.equal(estado.stats.pilhas, 1);
    assert.equal(estado.stats.carimbos, 0);
    assert.equal(estado.stats.canos, 0);
    assert.ok(estado.badges.includes('pilha'));
    for (const id of ['cano', 'giro', 'carimbo', 'datagrama']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('cano1');
    const cano = registrarCano(fim());
    assert.equal(cano.bonusMissoes, 15);
    assert.equal(estado.stats.canos, 1);
    assert.equal(estado.stats.pilhas, 1);
    assert.ok(estado.badges.includes('cano'));

    travarMissao('giro1');
    const giro = registrarGiro(fim());
    assert.equal(giro.bonusMissoes, 15);
    assert.equal(estado.stats.giros, 1);
    assert.equal(estado.stats.cotas, 0);
    assert.ok(estado.badges.includes('giro'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 217);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o auge aponta o dia com mais segundos', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDoAuge(null, '2026-10-28');
    assert.equal(vazia.texto, 'Ainda não há auge de fala.');
    assert.equal(vazia.dias, null);
    const invalida = textoDoAuge({ '2026-10-28': { n: 1 } }, 'ontem');
    assert.equal(invalida.dias, null);
    const curto = textoDoAuge({ '2026-10-28': { n: 1, segundos: 20 } }, '2026-10-28');
    assert.equal(curto.dias, 0);
    assert.equal(curto.minutos, 0);
    assert.equal(curto.texto, 'O auge foi hoje, com menos de 1 minuto.');
    const um = textoDoAuge({ '2026-10-28': { segundos: 90, n: 0 } }, '2026-10-28');
    assert.equal(um.minutos, 1);
    assert.equal(um.texto, 'O auge foi hoje, com 1 minuto.');
    const ontem = textoDoAuge({
      '2026-10-27': { n: 1, segundos: 120 },
      '2026-10-28': { n: 1, segundos: 30 }
    }, '2026-10-28');
    assert.equal(ontem.dias, 1);
    assert.equal(ontem.minutos, 2);
    assert.equal(ontem.texto, 'O auge foi ontem, com 2 minutos.');
    const longe = textoDoAuge({
      '2026-10-26': { n: 1, segundos: 600 },
      '2026-11-04': { n: 1, segundos: 90 }
    }, '2026-11-04');
    assert.equal(longe.dias, 9);
    assert.equal(longe.minutos, 10);
    assert.equal(longe.texto, 'O auge foi há 9 dias, com 10 minutos.');
    const empate = textoDoAuge({
      '2026-10-26': { n: 1, segundos: 100 },
      '2026-10-28': { n: 1, segundos: 100 }
    }, '2026-10-28');
    assert.equal(empate.dias, 0);
    assert.equal(empate.texto, 'O auge foi hoje, com 1 minuto.');
    const futuro = textoDoAuge({
      '2026-10-28': { n: 1, segundos: 40 },
      '2026-10-29': { n: 4, segundos: 900 }
    }, '2026-10-28');
    assert.equal(futuro.dias, 0);
    assert.equal(futuro.minutos, 0);
    const zerado = textoDoAuge({
      '2026-10-26': { n: 0, segundos: 0 },
      '2026-10-28': { n: 0, segundos: 0 }
    }, '2026-10-28');
    assert.equal(zerado.dias, null);
  });

  test('a versão 2.60 deixa a pilha fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.60'/);
    assert.match(data, /versao: '2\.59'/);
    assert.match(sw, /gringolingo-v87/);
    assert.match(sw, /\.\/js\/pilha\.js/);
    assert.match(turno, /pilha\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPilha', 'pintarCano', 'pintarGiro']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCarimbos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaPilhas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /pilha: telaPilhas/);
    assert.match(mapa, /cano: telaCanos/);
    assert.match(mapa, /giro: telaGiros/);
    const auge = app.slice(app.indexOf('function cartaoAuge'), app.indexOf('function blocoFluencia'));
    assert.match(auge, /fala-auge/);
    assert.match(auge, /VER A SEMANA/);
    assert.equal(auge.includes('function cartaoMarca'), false);
    assert.equal(auge.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-auge {'), css.indexOf('.fala-auge {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const lento = css.slice(css.indexOf('.btn-som.btn-lento {'), css.indexOf('.btn-som.btn-lento {') + 70);
    assert.match(lento, /min-height: 44px/);
    assert.match(lento, /min-width: 44px/);
    assert.match(app, /class: 'card revisao', type: 'button', onclick: \(\) => abrirDialogo/);
    assert.match(app, /class: 'card revisao', type: 'button', onclick: telaFrases/);
    assert.match(app, /class: 'btn btn-verde',\n      type: 'button',\n      onclick\(\) \{\n        livreSessao\.concluido = true/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoAuge\(/g) || []).length, 1);
  });
});
