import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  WITNESSES, avaliarWitness, VOTERS, avaliarVoter, LEARNERS, avaliarLearner
} = await import('../js/witness.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarWitness, registrarVoter, registrarLearner
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'witness.js') continue;
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

function semanaTrabalho() {
  return { '2026-11-04': { n: 1, segundos: 20, grupos: { trabalho: 1 } } };
}

describe('witness, voter e learner', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/witness.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(WITNESSES, ['Viu', 'Segue'], avaliarWitness);
    conferir(VOTERS, ['Vota', 'Segue'], avaliarVoter);
    conferir(LEARNERS, ['Ouve', 'Segue'], avaliarLearner);
    const ids = [...WITNESSES, ...VOTERS, ...LEARNERS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const witness = WITNESSES.find(c => c.id === 'witness2').rodadas[0];
    assert.equal(avaliarWitness(witness, 'The witness saw 2 agreements.').ok, true);
    const voter = VOTERS.find(c => c.id === 'voter3').rodadas[0];
    assert.equal(avaliarVoter(voter, 'The voter cast 3 counts.').ok, true);
    const learner = LEARNERS.find(c => c.id === 'learner4').rodadas[0];
    assert.equal(avaliarLearner(learner, 'The learner heard 4 notes.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Witness' && f.melhor === 'The witness saw the closed agreement.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Voter' && f.melhor === 'The voter casts the final count.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Learner' && f.melhor === 'The learner only hears the group.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['witness', 'voter', 'learner']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O baralho'), false);
  });

  test('witness, voter e learner contam no próprio contador', () => {
    travarMissao('witness1');
    const witness = registrarWitness(fim());
    assert.equal(witness.bonusMissoes, 15);
    assert.equal(estado.stats.witnesses, 1);
    assert.equal(estado.stats.voters, 0);
    assert.equal(estado.stats.learners, 0);
    assert.equal(estado.stats.aligns, 0);
    assert.ok(estado.badges.includes('witness'));
    for (const id of ['voter', 'learner', 'align']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('voter1');
    const voter = registrarVoter(fim());
    assert.equal(voter.bonusMissoes, 15);
    assert.equal(estado.stats.voters, 1);
    assert.equal(estado.stats.witnesses, 1);
    assert.ok(estado.badges.includes('voter'));

    travarMissao('learner1');
    const learner = registrarLearner(fim());
    assert.equal(learner.bonusMissoes, 15);
    assert.equal(estado.stats.learners, 1);
    assert.equal(estado.stats.aligns, 0);
    assert.ok(estado.badges.includes('learner'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length >= 355, true);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o baralho pede a frase de sobrevivência que ainda não entrou', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoBaralho([], {}, 'ontem');
    assert.equal(invalido.en, '');
    assert.equal(invalido.texto, 'Ainda não há baralho de fala.');
    const vazio = textoDoBaralho([], {}, '2026-11-04');
    assert.equal(vazio.en, '');
    assert.equal(vazio.texto, 'O baralho ainda não tem frase.');
    assert.equal(textoDoBaralho(null, {}, '2026-11-04').texto, 'O baralho ainda não tem frase.');
    const curto = textoDoBaralho([{ en: 'Hi', pt: 'oi' }], {}, '2026-11-04');
    assert.equal(curto.texto, 'O baralho ainda não tem frase.');
    const frases = [
      { en: 'Could you repeat that?', pt: 'Você pode repetir isso?' },
      { en: 'Let me think', pt: 'Deixe eu pensar' }
    ];
    const nova = textoDoBaralho(frases, {}, '2026-11-04');
    assert.equal(nova.en, 'Could you repeat that?');
    assert.equal(nova.texto, 'O baralho pede Você pode repetir isso? Diga Could you repeat that?');
    const futuro = textoDoBaralho(frases, {
      'Could you repeat that?': { proxima: '2026-11-08', caixa: 1 },
      'Let me think': { proxima: '2026-11-09', caixa: 1 }
    }, '2026-11-04');
    assert.equal(futuro.en, '');
    assert.equal(futuro.texto, 'O baralho espera a próxima frase.');
    const devido = textoDoBaralho(frases, {
      'Could you repeat that?': { proxima: '2026-11-04', caixa: 1 },
      'Let me think': { proxima: '2026-11-03', caixa: 0 }
    }, '2026-11-04');
    assert.equal(devido.en, 'Let me think');
    assert.equal(devido.texto, 'O baralho pede Deixe eu pensar. Diga Let me think.');
    const painel = semanaTrabalho();
    assert.equal(nova.texto === textoDaPratica(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(nova.texto === textoDoReforco(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(nova.texto === textoDoRecado(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(nova.texto === textoDaVez(TREINOS, ['sotaque'], {}).texto, false);
    assert.equal(nova.texto === textoDoRetorno({
      'I am fine': { proxima: '2026-11-04', caixa: 0, pt: 'eu estou bem' }
    }, '2026-11-04', []).texto, false);
    assert.equal(nova.texto === textoDaFicha([
      { en: 'hello', pt: 'olá', proxima: '2026-11-04', caixa: 0 }
    ], '2026-11-04').texto, false);
  });

  test('a versão 3.06 deixa o witness fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '3\.06'/);
    assert.match(data, /versao: '3\.05'/);
    assert.match(sw, /gringolingo-v1\d\d/);
    assert.match(sw, /\.\/js\/witness\.js/);
    assert.match(turno, /witness\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarWitness', 'pintarVoter', 'pintarLearner']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaAligns'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaWitnesses'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /witness: telaWitnesses/);
    assert.match(mapa, /voter: telaVoters/);
    assert.match(mapa, /learner: telaLearners/);
    const baralho = app.slice(app.indexOf('function cartaoBaralho'), app.indexOf('function blocoFluencia'));
    assert.match(baralho, /fala-baralho/);
    assert.match(baralho, /O baralho/);
    assert.match(baralho, /COMEÇAR/);
    assert.equal(baralho.includes('function cartaoFicha'), false);
    assert.equal(baralho.includes('function cartaoRetorno'), false);
    const regra = css.slice(css.indexOf('.fala-baralho {'), css.indexOf('.fala-baralho {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const cardInicio = css.indexOf('\n.nivel-card {');
    const card = css.slice(cardInicio, css.indexOf('}', cardInicio));
    assert.match(card, /flex-wrap: wrap/);
    assert.match(card, /max-width: 100%/);
    assert.match(card, /min-height: 44px/);
    const infoInicio = css.indexOf('\n.nivel-info {');
    const info = css.slice(infoInicio, css.indexOf('}', infoInicio));
    assert.match(info, /min-width: 0/);
    assert.match(info, /max-width: 100%/);
    assert.equal((app.match(/function cartaoBaralho\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoFicha\(/g) || []).length, 1);
    assert.equal((app.match(/O baralho/g) || []).length, 1);
    assert.equal((app.match(/A ficha/g) || []).length, 1);
  });
});
