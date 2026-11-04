import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  DATAGRAMAS, avaliarDatagrama, PASSES, avaliarPasse, CARIMBOS, avaliarCarimbo
} = await import('../js/datagrama.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaMarca } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarDatagrama, registrarPasse, registrarCarimbo
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'datagrama.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'Two nodes both think they lead.',
  'The clients all retry together.',
  'One key gets most of the writes.',
  'The user passed the disk quota.',
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

describe('datagrama, passe e carimbo', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/datagrama.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(DATAGRAMAS, ['Perde', 'Chega'], avaliarDatagrama);
    conferir(PASSES, ['Vence', 'Renova'], avaliarPasse);
    conferir(CARIMBOS, ['Muda', 'Grava'], avaliarCarimbo);
    const ids = [...DATAGRAMAS, ...PASSES, ...CARIMBOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const dois = DATAGRAMAS.find(c => c.id === 'doissumiu').rodadas[0];
    assert.equal(avaliarDatagrama(dois, '2 packets never arrived.').ok, true);
    const quinze = PASSES.find(c => c.id === 'quinzepasse').rodadas[0];
    assert.equal(avaliarPasse(quinze, 'The pass lived 15 minutes.').ok, true);
    const quatro = CARIMBOS.find(c => c.id === 'quartoversao').rodadas[0];
    assert.equal(avaliarCarimbo(quatro, 'The row is now version 4.').ok, true);
    const texto = JSON.stringify({ DATAGRAMAS, PASSES, CARIMBOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Datagrama' && f.melhor === 'The network dropped two packets.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Passe' && f.melhor === 'The short pass expired.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Carimbo' && f.melhor === 'The row stamp changed.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['datagrama', 'passe', 'carimbo']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('datagrama, passe e carimbo contam no próprio contador', () => {
    travarMissao('datagrama1');
    const datagrama = registrarDatagrama(fim());
    assert.equal(datagrama.bonusMissoes, 15);
    assert.equal(estado.stats.datagramas, 1);
    assert.equal(estado.stats.brasas, 0);
    assert.equal(estado.stats.passes, 0);
    assert.ok(estado.badges.includes('datagrama'));
    for (const id of ['passe', 'carimbo', 'brasa', 'cisao']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('passe1');
    const passe = registrarPasse(fim());
    assert.equal(passe.bonusMissoes, 15);
    assert.equal(estado.stats.passes, 1);
    assert.equal(estado.stats.datagramas, 1);
    assert.ok(estado.badges.includes('passe'));

    travarMissao('carimbo1');
    const carimbo = registrarCarimbo(fim());
    assert.equal(carimbo.bonusMissoes, 15);
    assert.equal(estado.stats.carimbos, 1);
    assert.equal(estado.stats.cotas, 0);
    assert.ok(estado.badges.includes('carimbo'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 214);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a marca mede a maior sequência seguida', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDaMarca(null, '2026-10-28');
    assert.equal(vazia.texto, 'Ainda não há marca de fala.');
    assert.equal(vazia.dias, null);
    const invalida = textoDaMarca({ '2026-10-28': { n: 1 } }, 'ontem');
    assert.equal(invalida.dias, null);
    const um = textoDaMarca({ '2026-10-28': { n: 1, segundos: 20 } }, '2026-10-28');
    assert.equal(um.dias, 1);
    assert.equal(um.texto, 'A maior marca foi de 1 dia.');
    const tres = textoDaMarca({
      '2026-10-26': { n: 1, segundos: 10 },
      '2026-10-27': { segundos: 12, n: 0 },
      '2026-10-28': { n: 1 }
    }, '2026-10-28');
    assert.equal(tres.dias, 3);
    assert.equal(tres.texto, 'A maior marca foi de 3 dias.');
    const corta = textoDaMarca({
      '2026-10-26': { n: 1 },
      '2026-10-27': { n: 1 },
      '2026-10-28': { n: 1 },
      '2026-11-04': { n: 1 }
    }, '2026-11-04');
    assert.equal(corta.dias, 3);
    assert.equal(corta.texto, 'A maior marca foi de 3 dias.');
    const futuro = textoDaMarca({
      '2026-10-28': { n: 1 },
      '2026-10-29': { n: 4 }
    }, '2026-10-28');
    assert.equal(futuro.dias, 1);
    const zerado = textoDaMarca({
      '2026-10-26': { n: 0, segundos: 0 },
      '2026-10-27': { n: 1 },
      '2026-10-28': { n: 1 }
    }, '2026-10-28');
    assert.equal(zerado.dias, 2);
    assert.equal(zerado.texto, 'A maior marca foi de 2 dias.');
  });

  test('a versão 2.59 deixa o datagrama fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.59'/);
    assert.match(data, /versao: '2\.58'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/datagrama\.js/);
    assert.match(turno, /datagrama\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarDatagrama', 'pintarPasse', 'pintarCarimbo']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaBrasas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaDatagramas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /datagrama: telaDatagramas/);
    assert.match(mapa, /passe: telaPasses/);
    assert.match(mapa, /carimbo: telaCarimbos/);
    const marca = app.slice(app.indexOf('function cartaoMarca'), app.indexOf('function blocoFluencia'));
    assert.match(marca, /fala-marca/);
    assert.match(marca, /VER A SEMANA/);
    assert.equal(marca.includes('function cartaoCostume'), false);
    assert.equal(marca.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-marca {'), css.indexOf('.fala-marca {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const botoes = css.slice(css.indexOf('.backup-botoes > .btn'), css.indexOf('.backup-botoes > .btn') + 80);
    assert.match(botoes, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-verde',\n          type: 'button',\n          onclick: \(\) => iniciarLicaoVocab/);
    assert.match(app, /class: 'btn btn-branco perigo', type: 'button'/);
    assert.match(app, /type: 'button',\n        onclick\(\) \{\n          const nome = nomeArquivoBackup/);
    assert.match(app, /type: 'button' \}, ativo \? 'DESLIGAR'/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoMarca\(/g) || []).length, 1);
  });
});
