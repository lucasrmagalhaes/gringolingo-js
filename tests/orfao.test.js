import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ORFAOS, avaliarOrfao, ACENOS, avaliarAceno, GASTOS, avaliarGasto
} = await import('../js/orfao.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoFora } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarOrfao, registrarAceno, registrarGasto
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'orfao.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The filter gave a false yes.',
  'Message four arrived before message three.',
  'The byte check did not match the file.',
  'The call stack grew without end.',
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

describe('órfão, aceno e gasto', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/orfao.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(ORFAOS, ['Aponta', 'Liga'], avaliarOrfao);
    conferir(ACENOS, ['Espera', 'Confirma'], avaliarAceno);
    conferir(GASTOS, ['Gasta', 'Corta'], avaliarGasto);
    const ids = [...ORFAOS, ...ACENOS, ...GASTOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const pai = ORFAOS.find(c => c.id === 'paioito').rodadas[0];
    assert.equal(avaliarOrfao(pai, 'The child pointed at parent 8.').ok, true);
    const sitio = ACENOS.find(c => c.id === 'espera2').rodadas[0];
    assert.equal(avaliarAceno(sitio, 'The wait stopped at site 2.').ok, true);
    const tres = GASTOS.find(c => c.id === 'gastotres').rodadas[0];
    assert.equal(avaliarGasto(tres, 'The burn took 3 days.').ok, true);
    const texto = JSON.stringify({ ORFAOS, ACENOS, GASTOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Órfão' && f.melhor === 'The child row pointed at a missing parent.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Aceno' && f.melhor === 'The second site never confirmed.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Gasto' && f.melhor === 'Three days of errors spent the whole month.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['orfao', 'aceno', 'gasto']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('órfão, aceno e gasto contam no próprio contador', () => {
    travarMissao('orfao1');
    const orfao = registrarOrfao(fim());
    assert.equal(orfao.bonusMissoes, 15);
    assert.equal(estado.stats.orfaos, 1);
    assert.equal(estado.stats.provas, 0);
    assert.equal(estado.stats.acenos, 0);
    assert.ok(estado.badges.includes('orfao'));
    for (const id of ['aceno', 'gasto', 'prova', 'filtro']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('aceno1');
    const aceno = registrarAceno(fim());
    assert.equal(aceno.bonusMissoes, 15);
    assert.equal(estado.stats.acenos, 1);
    assert.equal(estado.stats.orfaos, 1);
    assert.ok(estado.badges.includes('aceno'));

    travarMissao('gasto1');
    const gasto = registrarGasto(fim());
    assert.equal(gasto.bonusMissoes, 15);
    assert.equal(estado.stats.gastos, 1);
    assert.equal(estado.stats.filtros, 0);
    assert.ok(estado.badges.includes('gasto'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 232);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o fora separa os minutos de antes desta semana', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDoFora(null, '2026-11-04');
    assert.equal(vazia.texto, 'Fora desta semana ainda há 0 minutos.');
    assert.equal(vazia.dias, 0);
    assert.equal(vazia.minutos, 0);
    const invalida = textoDoFora({ '2026-11-04': { n: 1, segundos: 60 } }, 'ontem');
    assert.equal(invalida.dias, null);
    assert.equal(invalida.texto, 'Ainda não há conta fora desta semana.');
    const soSemana = textoDoFora({ '2026-11-04': { n: 1, segundos: 600 } }, '2026-11-04');
    assert.equal(soSemana.dias, 1);
    assert.equal(soSemana.minutos, 0);
    assert.equal(soSemana.texto, 'Nada ficou fora desta semana.');
    const curto = textoDoFora({ '2026-10-28': { n: 1, segundos: 20 } }, '2026-11-04');
    assert.equal(curto.dias, 1);
    assert.equal(curto.minutos, 0);
    assert.equal(curto.texto, 'Fora desta semana há menos de 1 minuto.');
    const um = textoDoFora({ '2026-10-28': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(um.minutos, 1);
    assert.equal(um.texto, 'Fora desta semana há 1 minuto.');
    const fora = textoDoFora({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(fora.dias, 5);
    assert.equal(fora.minutos, 3);
    assert.equal(fora.texto, 'Fora desta semana há 3 minutos.');
    const futuro = textoDoFora({
      '2026-10-28': { n: 1, segundos: 60 },
      '2026-11-05': { n: 4, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.minutos, 1);
    assert.equal(futuro.dias, 1);
    const zerado = textoDoFora({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
  });

  test('a versão 2.65 deixa o órfão fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.65'/);
    assert.match(data, /versao: '2\.64'/);
    assert.match(sw, /gringolingo-v92/);
    assert.match(sw, /\.\/js\/orfao\.js/);
    assert.match(turno, /orfao\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarOrfao', 'pintarAceno', 'pintarGasto']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaProvas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaOrfaos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /orfao: telaOrfaos/);
    assert.match(mapa, /aceno: telaAcenos/);
    assert.match(mapa, /gasto: telaGastos/);
    const fora = app.slice(app.indexOf('function cartaoFora'), app.indexOf('function blocoFluencia'));
    assert.match(fora, /fala-fora/);
    assert.match(fora, /VER A SEMANA/);
    assert.equal(fora.includes('function cartaoParte'), false);
    assert.equal(fora.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-fora {'), css.indexOf('.fala-fora {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const lento = css.slice(css.indexOf('.btn-lento {'), css.indexOf('.btn-lento {') + 80);
    assert.match(lento, /min-height: 44px/);
    assert.match(app, /class: 'btn btn-verde', type: 'button', onclick: voltar \}, 'VOLTAR AO BARALHO'/);
    assert.match(app, /class: 'btn btn-verde', type: 'button', onclick: telaDeslizes \}/);
    assert.match(app, /class: 'btn btn-branco', type: 'button', onclick: telaResumo \}, 'RESUMO DA SEMANA'\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoFora\(/g) || []).length, 1);
  });
});
