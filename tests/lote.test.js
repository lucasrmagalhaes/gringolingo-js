import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ENSAIOS, avaliarEnsaio, DISCOS, avaliarDisco, PAGINAS, avaliarPagina
} = await import('../js/lote.js');
const { TREINOS, textoDoGrupo } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarEnsaio, registrarDisco, registrarPagina
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'lote.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'Please rebase onto main.',
  'This query takes four seconds.',
  'The replica is two minutes behind.',
  'The runbook says to read the alert first.',
  'Traffic moves to the green side.',
  'Change one file, then run the tests.'
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

describe('ensaio, disco e página', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/lote.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(ENSAIOS, ['Ensaio', 'Copia'], avaliarEnsaio);
    conferir(DISCOS, ['Cheio', 'Plano'], avaliarDisco);
    conferir(PAGINAS, ['Lista', 'Proxima'], avaliarPagina);
    const ids = [...ENSAIOS, ...DISCOS, ...PAGINAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const ensaio = ENSAIOS.find(c => c.id === 'avisocanal').rodadas[1];
    assert.equal(avaliarEnsaio(ensaio, 'I will keep this copy for 1 day.').ok, true);
    const disco = DISCOS.find(c => c.id === 'noventadisco').rodadas[0];
    assert.equal(avaliarDisco(disco, 'The disk is 90 percent full.').ok, true);
    const pagina = PAGINAS.find(c => c.id === 'vintelinhas').rodadas[0];
    assert.equal(avaliarPagina(pagina, 'The list shows 20 rows.').ok, true);
    const texto = JSON.stringify({ ENSAIOS, DISCOS, PAGINAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Ensaio' && f.melhor === 'I will try this on staging first.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Disco' && f.melhor === 'The disk is ninety percent full.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Página' && f.melhor === 'The list shows twenty rows.'), true);
  });

  test('ensaio, disco e página contam no próprio contador', () => {
    travarMissao('ensaio1');
    const ensaio = registrarEnsaio(fim());
    assert.equal(ensaio.bonusMissoes, 15);
    assert.equal(estado.stats.ensaios, 1);
    assert.equal(estado.stats.replicas, 0);
    assert.equal(estado.stats.discos, 0);
    assert.ok(estado.badges.includes('ensaio'));
    for (const id of ['disco', 'pagina', 'replica', 'rebase']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('disco1');
    const disco = registrarDisco(fim());
    assert.equal(disco.bonusMissoes, 15);
    assert.equal(estado.stats.discos, 1);
    assert.equal(estado.stats.ensaios, 1);
    assert.ok(estado.badges.includes('disco'));

    travarMissao('pagina1');
    const pagina = registrarPagina(fim());
    assert.equal(pagina.bonusMissoes, 15);
    assert.equal(estado.stats.paginas, 1);
    assert.equal(estado.stats.consultas, 0);
    assert.ok(estado.badges.includes('pagina'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 169);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o grupo com menos prática aponta o filtro', () => {
    semTravessao('../js/hub.js');
    assert.equal(textoDoGrupo(null, {}).texto, 'Nenhum grupo com treino contado.');
    assert.equal(textoDoGrupo(TREINOS, {}).texto, 'Nenhum grupo tem prática ainda.');
    assert.equal(textoDoGrupo(TREINOS, {}).id, '');
    const um = textoDoGrupo(TREINOS, { modelos: 1 });
    const parados = TREINOS.filter(t => t.categoria === 'cotidiano' && t.stat).length;
    assert.equal(um.id, 'cotidiano');
    assert.equal(um.feitos, 0);
    assert.equal(um.n, parados);
    assert.equal(um.texto, `Dia a dia é o grupo com menos prática. ${parados} treinos parados.`);
    const stats = {};
    for (const t of TREINOS) if (t.stat) stats[t.stat] = 1;
    const pron = TREINOS.find(t => t.categoria === 'pronuncia' && t.stat);
    stats[pron.stat] = 0;
    const fraco = textoDoGrupo(TREINOS, stats);
    assert.equal(fraco.id, 'pronuncia');
    assert.equal(fraco.texto, 'Pronúncia é o grupo com menos prática. 1 treino parado.');
    const cheio = textoDoGrupo(TREINOS, Object.fromEntries(TREINOS.filter(t => t.stat).map(t => [t.stat, 1])));
    assert.equal(cheio.id, '');
    assert.equal(cheio.texto, 'Todos os grupos já tiveram prática em cada treino.');
  });

  test('a versão 2.44 deixa o ensaio fora do passeio', () => {
    assert.equal(VERSAO_APP, '2.44');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.44'/);
    assert.match(data, /versao: '2\.43'/);
    assert.match(sw, /gringolingo-v71/);
    assert.match(sw, /\.\/js\/lote\.js/);
    assert.match(turno, /lote\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarEnsaio', 'pintarDisco', 'pintarPagina']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaReplicas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaEnsaios'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /ensaio: telaEnsaios/);
    assert.match(mapa, /disco: telaDiscos/);
    assert.match(mapa, /pagina: telaPaginas/);
    const grupo = app.slice(app.indexOf('function cartaoGrupo'), app.indexOf('function blocoFluencia'));
    assert.match(grupo, /fala-grupo/);
    assert.match(grupo, /VER O GRUPO/);
    const fechar = css.slice(css.indexOf('.fechar {'), css.indexOf('.fechar {') + 280);
    assert.match(fechar, /min-height: 44px/);
    assert.match(fechar, /min-width: 44px/);
    assert.equal(fechar.includes('@media'), false);
    assert.equal(fechar.includes('#'), false);
    const regra = css.slice(css.indexOf('.fala-grupo {'), css.indexOf('.fala-grupo {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    assert.match(app, /class: 'fechar', type: 'button', 'aria-label': 'Sair'/);
  });
});
