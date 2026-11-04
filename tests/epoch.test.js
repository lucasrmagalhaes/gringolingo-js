import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  EPOCHS, avaliarEpoch, BALLOTS, avaliarBallot, FENCES, avaliarFence
} = await import('../js/epoch.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDoVerbo, textoDoSom, textoDaEscuta, textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { SONS, CLIPS } = await import('../js/pronuncia.js');
const { perguntaDoDia } = await import('../js/tecnico.js');
const { VERBOS, SUJEITOS } = await import('../js/data.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarEpoch, registrarBallot, registrarFence
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'epoch.js') continue;
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

describe('epoch, ballot e fence', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/epoch.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(EPOCHS, ['Abre', 'Segue'], avaliarEpoch);
    conferir(BALLOTS, ['Conta', 'Segue'], avaliarBallot);
    conferir(FENCES, ['Segura', 'Segue'], avaliarFence);
    const ids = [...EPOCHS, ...BALLOTS, ...FENCES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const epoch = EPOCHS.find(c => c.id === 'epoch2').rodadas[0];
    assert.equal(avaliarEpoch(epoch, 'The epoch started 2 terms.').ok, true);
    const ballot = BALLOTS.find(c => c.id === 'ballot3').rodadas[0];
    assert.equal(avaliarBallot(ballot, 'The ballot counted 3 votes.').ok, true);
    const fence = FENCES.find(c => c.id === 'fence4').rodadas[0];
    assert.equal(avaliarFence(fence, 'The fence blocked 4 writes.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Epoch' && f.melhor === 'The epoch starts the term.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Ballot' && f.melhor === 'The ballot counts the vote.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Fence' && f.melhor === 'The fence blocks the write.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.ok(TREINOS.length >= 347);
    assert.ok(TREINOS.filter(t => t.categoria === 'trabalho').length >= 291);
    for (const id of ['epoch', 'ballot', 'fence']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'O verbo'), false);
  });

  test('epoch, ballot e fence contam no próprio contador', () => {
    travarMissao('epoch1');
    const epoch = registrarEpoch(fim());
    assert.equal(epoch.bonusMissoes, 15);
    assert.equal(estado.stats.epochs, 1);
    assert.equal(estado.stats.ballots, 0);
    assert.equal(estado.stats.fences, 0);
    assert.equal(estado.stats.rebuilds, 0);
    assert.ok(estado.badges.includes('epoch'));
    for (const id of ['ballot', 'fence', 'rebuild']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('ballot1');
    const ballot = registrarBallot(fim());
    assert.equal(ballot.bonusMissoes, 15);
    assert.equal(estado.stats.ballots, 1);
    assert.equal(estado.stats.epochs, 1);
    assert.ok(estado.badges.includes('ballot'));

    travarMissao('fence1');
    const fence = registrarFence(fim());
    assert.equal(fence.bonusMissoes, 15);
    assert.equal(estado.stats.fences, 1);
    assert.equal(estado.stats.rebuilds, 0);
    assert.ok(estado.badges.includes('fence'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 370);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o verbo pede a frase do dia para conjugar', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDoVerbo(null, SUJEITOS, '2026-11-04').texto, 'O verbo ainda não tem frase.');
    assert.equal(textoDoVerbo([], [], '2026-11-04').texto, 'O verbo ainda não tem frase.');
    assert.equal(textoDoVerbo(VERBOS, SUJEITOS, 'ontem').texto, 'Ainda não há verbo para dizer.');
    assert.equal(textoDoVerbo([{ en: 'X', en3: 'goes', pt: 'ir', pt3: 'vai' }], SUJEITOS, '2026-11-04').texto, 'O verbo ainda não tem frase.');
    const hoje = textoDoVerbo(VERBOS, SUJEITOS, '2026-11-04');
    const deNovo = textoDoVerbo(VERBOS, SUJEITOS, '2026-11-04');
    assert.equal(hoje.en, deNovo.en);
    assert.equal(hoje.texto, deNovo.texto);
    assert.match(hoje.texto, /^O verbo pede .+\. Diga .+\.$/);
    assert.ok(hoje.en.includes(' '));
    const outro = textoDoVerbo(VERBOS, SUJEITOS, '2026-11-05');
    assert.match(outro.texto, /^O verbo pede /);
    const painel = semanaTrabalho();
    assert.equal(hoje.texto === textoDaPratica(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(hoje.texto === textoDoReforco(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(hoje.texto === textoDoRecado(painel, '2026-11-04', TREINOS, {}).texto, false);
    assert.equal(hoje.texto === textoDaVez(TREINOS, ['sotaque'], {}).texto, false);
    assert.equal(hoje.texto === textoDoRetorno({
      'I am fine': { proxima: '2026-11-04', caixa: 0, pt: 'eu estou bem' }
    }, '2026-11-04', []).texto, false);
    assert.equal(hoje.texto === textoDaFicha([
      { en: 'hello', pt: 'olá', proxima: '2026-11-04', caixa: 0 }
    ], '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDoBaralho([
      { en: 'Could you repeat that?', pt: 'Você pode repetir isso?' }
    ], {}, '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDaSombraDia(FRASES_SOMBRA, '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDaPergunta(perguntaDoDia('2026-11-04')).texto, false);
    assert.equal(hoje.texto === textoDaEscuta(CLIPS, '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDoSom(SONS, '2026-11-04').texto, false);
  });

  test('a versão 3.11 deixa o epoch fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.\d\d'/);
    assert.match(data, /versao: '3\.11'/);
    assert.match(data, /versao: '3\.10'/);
    assert.match(sw, /gringolingo-v1\d\d/);
    assert.match(sw, /\.\/js\/epoch\.js/);
    assert.match(turno, /epoch\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarEpoch', 'pintarBallot', 'pintarFence']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarRebuild'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaEpochs'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /epoch: telaEpochs/);
    assert.match(mapa, /ballot: telaBallots/);
    assert.match(mapa, /fence: telaFences/);
    const verbo = app.slice(app.indexOf('function cartaoVerbo('), app.indexOf('function blocoFluencia'));
    assert.match(verbo, /fala-verbo/);
    assert.match(verbo, /'O verbo'/);
    assert.match(verbo, /CONJUGAR/);
    assert.equal(verbo.includes('function cartaoSom'), false);
    assert.equal(verbo.includes('function cartaoEscuta'), false);
    const regra = css.slice(css.indexOf('.fala-verbo {'), css.indexOf('.fala-verbo {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const ptInicio = css.indexOf('\n.fala-pt {');
    const pt = css.slice(ptInicio, css.indexOf('}', ptInicio));
    assert.match(pt, /overflow-wrap: anywhere/);
    assert.match(pt, /max-width: 100%/);
    const bolhaInicio = css.indexOf('\n.bolha-en {');
    const bolha = css.slice(bolhaInicio, css.indexOf('}', bolhaInicio));
    assert.match(bolha, /overflow-wrap: anywhere/);
    assert.match(bolha, /max-width: 100%/);
    const corpoInicio = css.indexOf('\n.bolha-corpo {');
    const corpo = css.slice(corpoInicio, css.indexOf('}', corpoInicio));
    assert.match(corpo, /min-width: 0/);
    assert.match(corpo, /overflow-wrap: anywhere/);
    assert.equal((app.match(/function cartaoVerbo\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoSom\(/g) || []).length, 1);
    assert.equal((app.match(/'O verbo'/g) || []).length, 1);
    assert.equal((app.match(/'O som'/g) || []).length, 1);
  });
});
