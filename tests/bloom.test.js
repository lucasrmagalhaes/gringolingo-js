import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  BLOOMS, avaliarBloom, CUCOS, avaliarCuco, ESBOCOS, avaliarEsboco
} = await import('../js/bloom.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaEstacao, textoDaAbertura, textoDaFaixa, textoDaVirada, textoDoCostume
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarBloom, registrarCuco, registrarEsboco
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'bloom.js') continue;
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

describe('bloom, cuco e esboço', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/bloom.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(BLOOMS, ['Marca', 'Segue'], avaliarBloom);
    conferir(CUCOS, ['Move', 'Segue'], avaliarCuco);
    conferir(ESBOCOS, ['Conta', 'Segue'], avaliarEsboco);
    const ids = [...BLOOMS, ...CUCOS, ...ESBOCOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const bloom = BLOOMS.find(c => c.id === 'bloom2').rodadas[0];
    assert.equal(avaliarBloom(bloom, 'The bloom marked 2 keys.').ok, true);
    const cuco = CUCOS.find(c => c.id === 'cuco3').rodadas[0];
    assert.equal(avaliarCuco(cuco, 'The cuckoo moved 3 keys.').ok, true);
    const esboco = ESBOCOS.find(c => c.id === 'esboco4').rodadas[0];
    assert.equal(avaliarEsboco(esboco, 'The sketch counted 4 rows.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Bloom' && f.melhor === 'The filter may say the key is there.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cuco' && f.melhor === 'The key moves to the other nest.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Esboço' && f.melhor === 'The sketch keeps a small count.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['bloom', 'cuco', 'esboco']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A estação'), false);
  });

  test('bloom, cuco e esboço contam no próprio contador', () => {
    travarMissao('bloom1');
    const bloom = registrarBloom(fim());
    assert.equal(bloom.bonusMissoes, 15);
    assert.equal(estado.stats.blooms, 1);
    assert.equal(estado.stats.cucos, 0);
    assert.equal(estado.stats.esbocos, 0);
    assert.equal(estado.stats.promotes, 0);
    assert.equal(estado.stats.snapshots, 0);
    assert.ok(estado.badges.includes('bloom'));
    for (const id of ['cuco', 'esboco', 'promote', 'snapshot']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('cuco1');
    const cuco = registrarCuco(fim());
    assert.equal(cuco.bonusMissoes, 15);
    assert.equal(estado.stats.cucos, 1);
    assert.equal(estado.stats.blooms, 1);
    assert.ok(estado.badges.includes('cuco'));

    travarMissao('esboco1');
    const esboco = registrarEsboco(fim());
    assert.equal(esboco.bonusMissoes, 15);
    assert.equal(estado.stats.esbocos, 1);
    assert.equal(estado.stats.promotes, 0);
    assert.ok(estado.badges.includes('esboco'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 328);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a estação nomeia a época da primeira fala, sem contar', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaEstacao(null, 'ontem');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.estacao, null);
    assert.equal(invalido.texto, 'Ainda não há estação de fala.');
    const vazio = textoDaEstacao({}, '2026-11-04');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.estacao, null);
    assert.equal(vazio.texto, 'A estação ainda não tem dia.');
    const um = textoDaEstacao({ '2026-11-04': { n: 1, segundos: 40 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.estacao, 'primavera');
    assert.equal(um.texto, 'A fala abriu na primavera.');
    assert.equal(um.texto.includes('segundos'), false);
    assert.equal(/\d/.test(um.texto), false);
    const semente = {
      '2026-10-31': { n: 1, segundos: 40, grupos: { trabalho: 1 } },
      '2026-11-01': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-02': { n: 1, segundos: 90, grupos: { trabalho: 1, entrevista: 1 } },
      '2026-11-03': { n: 1, segundos: 60, grupos: { trabalho: 1 } },
      '2026-11-04': { n: 1, segundos: 600, grupos: { trabalho: 1 } }
    };
    const cheio = textoDaEstacao(semente, '2026-11-04');
    assert.equal(cheio.dias, 5);
    assert.equal(cheio.estacao, 'primavera');
    assert.equal(cheio.texto, 'A fala abriu na primavera.');
    assert.equal(cheio.texto.includes('segundos'), false);
    assert.equal(/\d/.test(cheio.texto), false);
    assert.equal(cheio.texto === textoDaAbertura(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDaFaixa(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDaVirada(semente, '2026-11-04').texto, false);
    assert.equal(cheio.texto === textoDoCostume(semente, '2026-11-04').texto, false);
    const inverno = textoDaEstacao({ '2026-06-15': { n: 1, segundos: 5 } }, '2026-11-04');
    assert.equal(inverno.estacao, 'inverno');
    assert.equal(inverno.texto, 'A fala abriu no inverno.');
    const outono = textoDaEstacao({ '2026-03-01': { n: 1, segundos: 5 } }, '2026-11-04');
    assert.equal(outono.texto, 'A fala abriu no outono.');
    const verao = textoDaEstacao({ '2026-01-15': { n: 1, segundos: 5 } }, '2026-11-04');
    assert.equal(verao.texto, 'A fala abriu no verão.');
    const dezembro = textoDaEstacao({ '2026-12-01': { n: 1, segundos: 5 } }, '2026-12-01');
    assert.equal(dezembro.texto, 'A fala abriu no verão.');
    const primeira = textoDaEstacao({
      '2026-06-15': { n: 1, segundos: 5 },
      '2026-11-04': { n: 1, segundos: 5 }
    }, '2026-11-04');
    assert.equal(primeira.estacao, 'inverno');
    assert.equal(primeira.texto, 'A fala abriu no inverno.');
    const futuro = textoDaEstacao({
      '2026-11-04': { n: 1, segundos: 10 },
      '2026-12-20': { n: 1, segundos: 10 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.estacao, 'primavera');
    const mudo = textoDaEstacao({
      '2026-06-15': { n: 0, segundos: 0 },
      '2026-09-01': { n: 1, segundos: 5 }
    }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.estacao, 'primavera');
    assert.equal(mudo.texto, 'A fala abriu na primavera.');
  });

  test('a versão 2.97 deixa o bloom fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.97'/);
    assert.match(data, /versao: '2\.96'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/bloom\.js/);
    assert.match(turno, /bloom\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarBloom', 'pintarCuco', 'pintarEsboco']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaPromotes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaBlooms'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /bloom: telaBlooms/);
    assert.match(mapa, /cuco: telaCucos/);
    assert.match(mapa, /esboco: telaEsbocos/);
    const estacao = app.slice(app.indexOf('function cartaoEstacao'), app.indexOf('function blocoFluencia'));
    assert.match(estacao, /fala-estacao/);
    assert.match(estacao, /A estação/);
    assert.match(estacao, /VER A SEMANA/);
    assert.equal(estacao.includes('function cartaoAbertura'), false);
    assert.equal(estacao.includes('function cartaoFaixa'), false);
    const regra = css.slice(css.indexOf('.fala-estacao {'), css.indexOf('.fala-estacao {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const semana = css.slice(css.indexOf('\n.semana {'), css.indexOf('\n.semana {') + 160);
    assert.match(semana, /flex-wrap: wrap/);
    const diaSemana = css.slice(css.indexOf('.semana-dia {'), css.indexOf('.semana-dia.feito'));
    assert.match(diaSemana, /min-width: 44px/);
    assert.match(diaSemana, /min-height: 44px/);
    assert.equal((app.match(/function cartaoAbertura\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoEstacao\(/g) || []).length, 1);
    assert.equal((app.match(/A estação/g) || []).length, 1);
  });
});
