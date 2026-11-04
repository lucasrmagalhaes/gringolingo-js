import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  FOMES, avaliarFome, INVERSOES, avaliarInversao, IDADES, avaliarIdade
} = await import('../js/fome.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoCurto } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarFome, registrarInversao, registrarIdade
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'fome.js') continue;
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
  'The copy becomes primary when the owner falls.',
  'The write reaches the disk at once.',
  'The dirty page waits in the cache.',
  'The large write skips the cache.',
  'The nodes spread the state by rumor.',
  'The read repairs the old copy.',
  'The neighbor holds the write until the owner returns.',
  'The flake builds the id from the clock.',
  'The epoch rises when the membership changes.',
  'The vector records what this node saw.',
  'The read sees a value that is not committed.',
  'The snapshot freezes the rows at the start.',
  'The result matches one serial order.'
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

describe('fome, inversão e idade', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/fome.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(FOMES, ['Espera', 'Segue'], avaliarFome);
    conferir(INVERSOES, ['Segura', 'Solta'], avaliarInversao);
    conferir(IDADES, ['Sobe', 'Fecha'], avaliarIdade);
    const ids = [...FOMES, ...INVERSOES, ...IDADES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const fome = FOMES.find(c => c.id === 'fome2').rodadas[0];
    assert.equal(avaliarFome(fome, 'The starved task waited 2 turns.').ok, true);
    const inversao = INVERSOES.find(c => c.id === 'inversao3').rodadas[0];
    assert.equal(avaliarInversao(inversao, 'The inversion blocked 3 tasks.').ok, true);
    const idade = IDADES.find(c => c.id === 'idade4').rodadas[0];
    assert.equal(avaliarIdade(idade, 'The aging lifted 4 tasks.').ok, true);
    const texto = JSON.stringify({ FOMES, INVERSOES, IDADES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Fome' && f.melhor === 'The task waits and never runs.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Inversão' && f.melhor === 'The low task holds the resource.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Idade' && f.melhor === 'The long wait raises the priority.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['fome', 'inversao', 'idade']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('fome, inversão e idade contam no próprio contador', () => {
    travarMissao('fome1');
    const fome = registrarFome(fim());
    assert.equal(fome.bonusMissoes, 15);
    assert.equal(estado.stats.fomes, 1);
    assert.equal(estado.stats.inversoes, 0);
    assert.equal(estado.stats.idades, 0);
    assert.equal(estado.stats.sujeiras, 0);
    assert.equal(estado.stats.seriais, 0);
    assert.ok(estado.badges.includes('fome'));
    for (const id of ['inversao', 'idade', 'sujeira', 'serial']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('inversao1');
    const inversao = registrarInversao(fim());
    assert.equal(inversao.bonusMissoes, 15);
    assert.equal(estado.stats.inversoes, 1);
    assert.equal(estado.stats.fomes, 1);
    assert.ok(estado.badges.includes('inversao'));

    travarMissao('idade1');
    const idade = registrarIdade(fim());
    assert.equal(idade.bonusMissoes, 15);
    assert.equal(estado.stats.idades, 1);
    assert.equal(estado.stats.seriais, 0);
    assert.ok(estado.badges.includes('idade'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 301);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o curto mede o dia de fala com menos segundos', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoCurto(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há curto de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.curto, 0);
    const vazio = textoDoCurto({}, '2026-11-04');
    assert.equal(vazio.texto, 'O curto dos dias ainda é 0 segundos.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.curto, 0);
    const umSegundo = textoDoCurto({ '2026-11-04': { n: 1, segundos: 1 } }, '2026-11-04');
    assert.equal(umSegundo.dias, 1);
    assert.equal(umSegundo.curto, 1);
    assert.equal(umSegundo.texto, 'O curto dos dias é de 1 segundo.');
    const parelho = textoDoCurto({
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-10-28');
    assert.equal(parelho.dias, 2);
    assert.equal(parelho.curto, 60);
    assert.equal(parelho.texto, 'O curto dos dias é de 60 segundos.');
    const meio = textoDoCurto({
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 40 }
    }, '2026-10-28');
    assert.equal(meio.dias, 2);
    assert.equal(meio.curto, 40);
    assert.equal(meio.texto, 'O curto dos dias é de 40 segundos.');
    const igual = textoDoCurto({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.curto, 40);
    assert.equal(igual.texto, 'O curto dos dias é de 40 segundos.');
    const futuro = textoDoCurto({
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.curto, 90);
    assert.equal(futuro.texto, 'O curto dos dias é de 90 segundos.');
    const mudo = textoDoCurto({ '2026-11-04': { n: 1, segundos: 0 } }, '2026-11-04');
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.curto, 0);
    assert.equal(mudo.texto, 'O curto dos dias é de 0 segundos.');
    const zerado = textoDoCurto({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.curto, 0);
  });

  test('a versão 2.88 deixa a fome fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.88'/);
    assert.match(data, /versao: '2\.87'/);
    assert.match(sw, /gringolingo-v115/);
    assert.match(sw, /\.\/js\/fome\.js/);
    assert.match(turno, /fome\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarFome', 'pintarInversao', 'pintarIdade']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaSeriais'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaFomes'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /fome: telaFomes/);
    assert.match(mapa, /inversao: telaInversoes/);
    assert.match(mapa, /idade: telaIdades/);
    const curto = app.slice(app.indexOf('function cartaoCurto'), app.indexOf('function blocoFluencia'));
    assert.match(curto, /fala-curto/);
    assert.match(curto, /VER A SEMANA/);
    assert.equal(curto.includes('function cartaoGrao'), false);
    assert.equal(curto.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-curto {'), css.indexOf('.fala-curto {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const faixa = css.slice(css.indexOf('\n.faixa-offline {'), css.indexOf('\n.faixa-offline {') + 80);
    assert.match(faixa, /min-height: 44px/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoCurto\(/g) || []).length, 1);
  });
});
