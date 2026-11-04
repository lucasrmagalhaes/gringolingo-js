import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  MANIFESTS, avaliarManifest, HEDGES, avaliarHedge, DEBOUNCES, avaliarDebounce
} = await import('../js/manifest.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaReducao, textoDoNumero, textoDoVerbo, textoDoSom, textoDaEscuta, textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { SONS, CLIPS } = await import('../js/pronuncia.js');
const { NUMEROS } = await import('../js/ensaio.js');
const { REDUCOES } = await import('../js/fluencia.js');
const { perguntaDoDia } = await import('../js/tecnico.js');
const { VERBOS, SUJEITOS } = await import('../js/data.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarManifest, registrarHedge, registrarDebounce
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'manifest.js') continue;
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

describe('manifest, hedge e debounce', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/manifest.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(MANIFESTS, ['Lista', 'Segue'], avaliarManifest);
    conferir(HEDGES, ['Cobre', 'Segue'], avaliarHedge);
    conferir(DEBOUNCES, ['Espera', 'Segue'], avaliarDebounce);
    const ids = [...MANIFESTS, ...HEDGES, ...DEBOUNCES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const manifest = MANIFESTS.find(c => c.id === 'manifest2').rodadas[0];
    assert.equal(avaliarManifest(manifest, 'The manifest listed 2 files.').ok, true);
    const hedge = HEDGES.find(c => c.id === 'hedge3').rodadas[0];
    assert.equal(avaliarHedge(hedge, 'The hedge covered 3 calls.').ok, true);
    const debounce = DEBOUNCES.find(c => c.id === 'debounce4').rodadas[0];
    assert.equal(avaliarDebounce(debounce, 'The debounce waited 4 seconds.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Manifest' && f.melhor === 'The manifest lists the file.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Hedge' && f.melhor === 'The hedge covers the delay.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Debounce' && f.melhor === 'The debounce waits for the pause.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.ok(TREINOS.length >= 353);
    assert.ok(TREINOS.filter(t => t.categoria === 'trabalho').length >= 297);
    for (const id of ['manifest', 'hedge', 'debounce']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A redução'), false);
  });

  test('manifest, hedge e debounce contam no próprio contador', () => {
    travarMissao('manifest1');
    const manifest = registrarManifest(fim());
    assert.equal(manifest.bonusMissoes, 15);
    assert.equal(estado.stats.manifests, 1);
    assert.equal(estado.stats.hedges, 0);
    assert.equal(estado.stats.debounces, 0);
    assert.equal(estado.stats.extents, 0);
    assert.ok(estado.badges.includes('manifest'));
    for (const id of ['hedge', 'debounce', 'extent']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('hedge1');
    const hedge = registrarHedge(fim());
    assert.equal(hedge.bonusMissoes, 15);
    assert.equal(estado.stats.hedges, 1);
    assert.equal(estado.stats.manifests, 1);
    assert.ok(estado.badges.includes('hedge'));

    travarMissao('debounce1');
    const debounce = registrarDebounce(fim());
    assert.equal(debounce.bonusMissoes, 15);
    assert.equal(estado.stats.debounces, 1);
    assert.equal(estado.stats.extents, 0);
    assert.ok(estado.badges.includes('debounce'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 376);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a redução pede a frase curta do dia para ouvir', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDaReducao(null, '2026-11-04').texto, 'A redução ainda não tem frase.');
    assert.equal(textoDaReducao([], '2026-11-04').texto, 'A redução ainda não tem frase.');
    assert.equal(textoDaReducao([{ id: 'gonna', titulo: 'Gonna' }], 'ontem').texto, 'Ainda não há redução para ouvir.');
    assert.equal(textoDaReducao([{ id: 'X', titulo: 'Gonna' }], '2026-11-04').texto, 'A redução ainda não tem frase.');
    const hoje = textoDaReducao(REDUCOES, '2026-11-04');
    const deNovo = textoDaReducao(REDUCOES, '2026-11-04');
    assert.equal(hoje.id, deNovo.id);
    assert.equal(hoje.texto, deNovo.texto);
    assert.ok(REDUCOES.some(c => c.id === hoje.id));
    assert.match(hoje.texto, /^A redução pede .+ Ouça a frase curta\.$/);
    const outro = textoDaReducao(REDUCOES, '2026-11-05');
    assert.match(outro.texto, /^A redução pede /);
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
    assert.equal(hoje.texto === textoDoVerbo(VERBOS, SUJEITOS, '2026-11-04').texto, false);
    assert.equal(hoje.texto === textoDoNumero(NUMEROS, '2026-11-04').texto, false);
  });

  test('a versão 3.13 deixa o manifest fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.\d\d'/);
    assert.match(data, /versao: '3\.13'/);
    assert.match(data, /versao: '3\.12'/);
    assert.match(sw, /gringolingo-v1\d\d/);
    assert.match(sw, /\.\/js\/manifest\.js/);
    assert.match(turno, /manifest\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarManifest', 'pintarHedge', 'pintarDebounce']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarExtent'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaManifests'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /manifest: telaManifests/);
    assert.match(mapa, /hedge: telaHedges/);
    assert.match(mapa, /debounce: telaDebounces/);
    const reducao = app.slice(app.indexOf('function cartaoReducao('), app.indexOf('function blocoFluencia'));
    assert.match(reducao, /fala-reducao/);
    assert.match(reducao, /'A redução'/);
    assert.match(reducao, /EXPANDIR/);
    assert.equal(reducao.includes('function cartaoNumero'), false);
    assert.equal(reducao.includes('function cartaoSom'), false);
    const regra = css.slice(css.indexOf('.fala-reducao {'), css.indexOf('.fala-reducao {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const topoInicio = css.indexOf('\n.licao-topo {');
    const topo = css.slice(topoInicio, css.indexOf('}', topoInicio));
    assert.match(topo, /flex-wrap: wrap/);
    const barraInicio = css.indexOf('\n.barra-licao {');
    const barra = css.slice(barraInicio, css.indexOf('}', barraInicio));
    assert.match(barra, /min-width: 0/);
    assert.match(barra, /max-width: 100%/);
    const cardInicio = css.indexOf('\n.card {');
    const card = css.slice(cardInicio, css.indexOf('}', cardInicio));
    assert.match(card, /overflow-wrap: anywhere/);
    assert.match(card, /max-width: 100%/);
    const sairInicio = css.indexOf('\n.fechar-confirmando {');
    const sair = css.slice(sairInicio, css.indexOf('}', sairInicio));
    assert.match(sair, /white-space: normal/);
    assert.match(sair, /max-width: 100%/);
    assert.equal((app.match(/function cartaoReducao\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoNumero\(/g) || []).length, 1);
    assert.equal((app.match(/'A redução'/g) || []).length, 1);
    assert.equal((app.match(/'O número'/g) || []).length, 1);
  });
});
