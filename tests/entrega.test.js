import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CANARIOS, avaliarCanario, DESPEDIDAS, avaliarDespedida, REPETICOES, avaliarRepeticao
} = await import('../js/entrega.js');
const { BANDEIRAS, GELOS, LIMITES } = await import('../js/rollout.js');
const { textoDaEstreia, TREINOS } = await import('../js/hub.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCanario, registrarDespedida, registrarRepeticao
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'entrega.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The next step is to turn the flag off.',
  'We can switch the flag off without a new deploy.',
  'The limit is one hundred calls a minute.',
  'We turned the new button off.'
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

describe('canário, despedida e repetição', () => {
  test('as três listas não repetem o catálogo nem a bandeira', () => {
    const fonte = semTravessao('../js/entrega.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(CANARIOS, ['Alvo', 'Saúde'], avaliarCanario);
    conferir(DESPEDIDAS, ['Data', 'Troca'], avaliarDespedida);
    conferir(REPETICOES, ['Chegada', 'Segunda'], avaliarRepeticao);
    const ids = [...CANARIOS, ...DESPEDIDAS, ...REPETICOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    for (const antigo of [...BANDEIRAS, ...GELOS, ...LIMITES]) {
      assert.equal(ids.includes(antigo.id), false, antigo.id);
    }
    const maquina = CANARIOS.find(c => c.id === 'umamaquina').rodadas[0];
    assert.equal(avaliarCanario(maquina, '1 server gets the version first.').ok, true);
    const junho = DESPEDIDAS.find(c => c.id === 'fimjunho').rodadas[1];
    assert.equal(avaliarDespedida(junho, 'The last day is June 30.').ok, true);
    const versao = DESPEDIDAS.find(c => c.id === 'caminhov2').rodadas[0];
    assert.equal(avaliarDespedida(versao, 'Please call version 2.').ok, true);
    const hora = REPETICOES.find(c => c.id === 'horaextra').rodadas[0];
    assert.equal(avaliarRepeticao(hora, 'We retry for 1 hour.').ok, true);
    const texto = JSON.stringify({ CANARIOS, DESPEDIDAS, REPETICOES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Canário' && f.melhor === 'One server gets the version first.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Despedida' && f.melhor === 'The old path closes in June.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Repetição' && f.melhor === 'The same event can arrive twice.'), true);
  });

  test('canário, despedida e repetição contam no próprio contador', () => {
    travarMissao('canario1');
    const canario = registrarCanario(fim());
    assert.equal(canario.bonusMissoes, 15);
    assert.equal(estado.stats.canarios, 1);
    assert.equal(estado.stats.bandeiras, 0);
    assert.equal(estado.stats.despedidas, 0);
    assert.ok(estado.badges.includes('canario'));
    for (const id of ['despedida', 'repeticao', 'limite', 'gelo']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('despedida1');
    const despedida = registrarDespedida(fim());
    assert.equal(despedida.bonusMissoes, 15);
    assert.equal(estado.stats.despedidas, 1);
    assert.equal(estado.stats.rotas, 0);
    assert.ok(estado.badges.includes('despedida'));

    travarMissao('repeticao1');
    const repeticao = registrarRepeticao(fim());
    assert.equal(repeticao.bonusMissoes, 15);
    assert.equal(estado.stats.repeticoes, 1);
    assert.equal(estado.stats.limites, 0);
    assert.ok(estado.badges.includes('repeticao'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 157);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o cartão sem prática aponta o próximo treino intocado', () => {
    const com = TREINOS.filter(t => t.stat);
    const vazio = textoDaEstreia(TREINOS, {});
    assert.equal(vazio.faltam, com.length);
    assert.equal(vazio.treino.id, com[0].id);
    assert.match(vazio.texto, new RegExp(`O próximo é ${com[0].titulo}`));
    const feito = { [com[0].stat]: 1 };
    const depois = textoDaEstreia(TREINOS, feito);
    assert.equal(depois.faltam, com.length - com.filter(t => t.stat === com[0].stat).length);
    assert.notEqual(depois.treino.stat, com[0].stat);
    const um = textoDaEstreia([{ id: 'solo', stat: 'solo', titulo: 'Solo', ordem: 0 }], {});
    assert.equal(um.faltam, 1);
    assert.equal(um.texto, '1 treino ainda sem prática. O próximo é Solo.');
    const cheio = Object.fromEntries(com.map(t => [t.stat, 1]));
    const fimCatalogo = textoDaEstreia(TREINOS, cheio);
    assert.equal(fimCatalogo.faltam, 0);
    assert.equal(fimCatalogo.treino, null);
    assert.equal(fimCatalogo.texto, 'Todos os treinos com contagem já tiveram prática.');
  });

  test('a versão 2.40 deixa o canário fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.40'/);
    assert.match(data, /versao: '2\.39'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/entrega\.js/);
    assert.match(turno, /entrega\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCanario', 'pintarDespedida', 'pintarRepeticao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaLimites'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCanarios'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /canario: telaCanarios/);
    assert.match(mapa, /despedida: telaDespedidas/);
    assert.match(mapa, /repeticao: telaRepeticoes/);
    const estreia = app.slice(app.indexOf('function cartaoEstreia'), app.indexOf('function blocoFluencia'));
    assert.match(estreia, /sem-pratica/);
    assert.match(estreia, /ESTREAR/);
    const minutos = app.slice(app.indexOf('function cartaoSemana'), app.indexOf('function cartaoSemana') + 2500);
    assert.match(minutos, /aria-label': `\$\{m\} minutos`/);
    const regra = css.slice(css.indexOf('.sem-pratica {'), css.indexOf('.sem-pratica {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const card = css.slice(css.indexOf('.hub-item > .card'), css.indexOf('.hub-item > .card') + 120);
    assert.match(card, /width: auto/);
    assert.equal(card.includes('#'), false);
  });
});
