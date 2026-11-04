import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  REBASES, avaliarRebase, CONSULTAS, avaliarConsulta, REPLICAS, avaliarReplica
} = await import('../js/atraso.js');
const { textoDaPalavra } = await import('../js/caderno.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRebase, registrarConsulta, registrarReplica
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'atraso.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The runbook says to read the alert first.',
  'Traffic moves to the green side.',
  'The certificate expires on Friday.',
  'Change one file, then run the tests.',
  'The next step is to restart the worker.',
  'The load test ran for ten minutes.'
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

describe('rebase, consulta e réplica', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/atraso.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(REBASES, ['Base', 'Arquivo'], avaliarRebase);
    conferir(CONSULTAS, ['Tempo', 'Plano'], avaliarConsulta);
    conferir(REPLICAS, ['Atraso', 'Leitura'], avaliarReplica);
    const ids = [...REBASES, ...CONSULTAS, ...REPLICAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const atras = REBASES.find(c => c.id === 'emcima').rodadas[0];
    assert.equal(avaliarRebase(atras, 'The branch is 2 commits behind.').ok, true);
    const lenta = CONSULTAS.find(c => c.id === 'quatroseg').rodadas[0];
    assert.equal(avaliarConsulta(lenta, 'This query takes 4 seconds.').ok, true);
    const copia = REPLICAS.find(c => c.id === 'doisminutos').rodadas[0];
    assert.equal(avaliarReplica(copia, 'The replica is 2 minutes behind.').ok, true);
    const texto = JSON.stringify({ REBASES, CONSULTAS, REPLICAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Rebase' && f.melhor === 'Please rebase onto main.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Consulta' && f.melhor === 'This query takes four seconds.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Réplica' && f.melhor === 'The replica is two minutes behind.'), true);
  });

  test('rebase, consulta e réplica contam no próprio contador', () => {
    travarMissao('rebase1');
    const rebase = registrarRebase(fim());
    assert.equal(rebase.bonusMissoes, 15);
    assert.equal(estado.stats.rebases, 1);
    assert.equal(estado.stats.certificados, 0);
    assert.equal(estado.stats.consultas, 0);
    assert.ok(estado.badges.includes('rebase'));
    for (const id of ['consulta', 'replica', 'certificado', 'manual']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('consulta1');
    const consulta = registrarConsulta(fim());
    assert.equal(consulta.bonusMissoes, 15);
    assert.equal(estado.stats.consultas, 1);
    assert.equal(estado.stats.manuais, 0);
    assert.ok(estado.badges.includes('consulta'));

    travarMissao('replica1');
    const replica = registrarReplica(fim());
    assert.equal(replica.bonusMissoes, 15);
    assert.equal(estado.stats.replicas, 1);
    assert.equal(estado.stats.verdes, 0);
    assert.ok(estado.badges.includes('replica'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 166);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a palavra que mais volta ignora as palavras curtas', () => {
    assert.equal(textoDaPalavra(null).texto, 'Nenhuma palavra escapou nas falas ainda.');
    assert.equal(textoDaPalavra([]).n, 0);
    const uma = textoDaPalavra([{ en: 'The runbook says to read the alert first.', n: 1 }]);
    assert.equal(uma.en, 'alert');
    assert.equal(uma.n, 1);
    assert.equal(uma.texto, 'A palavra que mais volta é alert. 1 vez.');
    const duas = textoDaPalavra([
      { en: 'Please rebase onto main.', n: 1 },
      { en: 'I will push again after the rebase.', n: 1 }
    ]);
    assert.equal(duas.en, 'rebase');
    assert.equal(duas.n, 2);
    assert.equal(duas.texto, 'A palavra que mais volta é rebase. 2 vezes.');
    const empate = textoDaPalavra([
      { en: 'replica lag', n: 1 },
      { en: 'query plan', n: 1 }
    ]);
    assert.equal(empate.en, 'plan');
  });

  test('a versão 2.43 deixa o rebase fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    const caderno = semTravessao('../js/caderno.js');
    assert.match(data, /versao: '2\.43'/);
    assert.match(data, /versao: '2\.42'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/atraso\.js/);
    assert.match(turno, /atraso\.js/);
    assert.equal(turno.includes('foco.js'), false);
    assert.match(caderno, /function textoDaPalavra/);
    for (const nome of ['pintarRebase', 'pintarConsulta', 'pintarReplica']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaCertificados'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaRebases'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /rebase: telaRebases/);
    assert.match(mapa, /consulta: telaConsultas/);
    assert.match(mapa, /replica: telaReplicas/);
    const palavra = app.slice(app.indexOf('function cartaoPalavra'), app.indexOf('function blocoFluencia'));
    assert.match(palavra, /fala-palavra/);
    assert.match(palavra, /REPETIR/);
    const voltar = app.slice(app.indexOf('function topoVoltar'), app.indexOf('function telaConversa'));
    assert.match(voltar, /aria-label': 'Voltar'/);
    assert.match(voltar, /type: 'button'/);
    const regra = css.slice(css.indexOf('.fala-palavra {'), css.indexOf('.fala-palavra {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const topo = css.slice(css.indexOf('.topo > button.pilula'), css.indexOf('.topo > button.pilula') + 90);
    assert.match(topo, /min-height: 44px/);
    assert.match(topo, /min-width: 44px/);
    assert.equal(topo.includes('#'), false);
  });
});
