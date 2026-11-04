import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  JOURNALS, avaliarJournal, SEGMENTS, avaliarSegment, SPILLS, avaliarSpill
} = await import('../js/journal.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaEscuta, textoDaPergunta, textoDaSombraDia, textoDoBaralho, textoDaFicha, textoDoRetorno, textoDaVez, textoDaPratica, textoDoReforco, textoDoRecado
} = await import('../js/semana.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const { CLIPS } = await import('../js/pronuncia.js');
const { perguntaDoDia } = await import('../js/tecnico.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarJournal, registrarSegment, registrarSpill
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'journal.js') continue;
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

describe('journal, segment e spill', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/journal.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(JOURNALS, ['Anota', 'Segue'], avaliarJournal);
    conferir(SEGMENTS, ['Fecha', 'Segue'], avaliarSegment);
    conferir(SPILLS, ['Solta', 'Segue'], avaliarSpill);
    const ids = [...JOURNALS, ...SEGMENTS, ...SPILLS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const journal = JOURNALS.find(c => c.id === 'journal2').rodadas[0];
    assert.equal(avaliarJournal(journal, 'The journal recorded 2 changes.').ok, true);
    const segment = SEGMENTS.find(c => c.id === 'segment3').rodadas[0];
    assert.equal(avaliarSegment(segment, 'The segment closed 3 files.').ok, true);
    const spill = SPILLS.find(c => c.id === 'spill4').rodadas[0];
    assert.equal(avaliarSpill(spill, 'The spill sent 4 extras.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Journal' && f.melhor === 'The journal records the change.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Segment' && f.melhor === 'The segment closes the file.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Spill' && f.melhor === 'The spill sends the extra to disk.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.ok(TREINOS.length >= 341);
    assert.ok(TREINOS.filter(t => t.categoria === 'trabalho').length >= 285);
    for (const id of ['journal', 'segment', 'spill']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A escuta'), false);
  });

  test('journal, segment e spill contam no próprio contador', () => {
    travarMissao('journal1');
    const journal = registrarJournal(fim());
    assert.equal(journal.bonusMissoes, 15);
    assert.equal(estado.stats.journals, 1);
    assert.equal(estado.stats.segments, 0);
    assert.equal(estado.stats.spills, 0);
    assert.equal(estado.stats.reclaims, 0);
    assert.ok(estado.badges.includes('journal'));
    for (const id of ['segment', 'spill', 'reclaim']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('segment1');
    const segment = registrarSegment(fim());
    assert.equal(segment.bonusMissoes, 15);
    assert.equal(estado.stats.segments, 1);
    assert.equal(estado.stats.journals, 1);
    assert.ok(estado.badges.includes('segment'));

    travarMissao('spill1');
    const spill = registrarSpill(fim());
    assert.equal(spill.bonusMissoes, 15);
    assert.equal(estado.stats.spills, 1);
    assert.equal(estado.stats.reclaims, 0);
    assert.ok(estado.badges.includes('spill'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 364);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a escuta pede a cena do dia para ouvir', () => {
    semTravessao('../js/semana.js');
    assert.equal(textoDaEscuta(null, '2026-11-04').texto, 'A escuta ainda não tem cena.');
    assert.equal(textoDaEscuta([], '2026-11-04').texto, 'A escuta ainda não tem cena.');
    assert.equal(textoDaEscuta([{ id: 'x', titulo: 'Oi', pergunta: 'Onde?' }], 'ontem').texto, 'Ainda não há escuta para ouvir.');
    assert.equal(textoDaEscuta([{ id: 'X', titulo: 'Oi', pergunta: 'Onde?' }], '2026-11-04').texto, 'A escuta ainda não tem cena.');
    const hoje = textoDaEscuta(CLIPS, '2026-11-04');
    const deNovo = textoDaEscuta(CLIPS, '2026-11-04');
    assert.equal(hoje.id, deNovo.id);
    assert.equal(hoje.texto, deNovo.texto);
    assert.ok(CLIPS.some(c => c.id === hoje.id));
    assert.match(hoje.texto, /^A escuta pede .+ Ouça .+\.$/);
    const outro = textoDaEscuta(CLIPS, '2026-11-05');
    assert.match(outro.texto, /^A escuta pede /);
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
  });

  test('a versão 3.09 deixa o journal fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.\d\d'/);
    assert.match(data, /versao: '3\.09'/);
    assert.match(data, /versao: '3\.08'/);
    assert.match(sw, /gringolingo-v13\d/);
    assert.match(sw, /\.\/js\/journal\.js/);
    assert.match(turno, /journal\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarJournal', 'pintarSegment', 'pintarSpill']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarReclaim'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaJournals'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /journal: telaJournals/);
    assert.match(mapa, /segment: telaSegments/);
    assert.match(mapa, /spill: telaSpills/);
    const escuta = app.slice(app.indexOf('function cartaoEscuta'), app.indexOf('function blocoFluencia'));
    assert.match(escuta, /fala-escuta/);
    assert.match(escuta, /'A escuta'/);
    assert.match(escuta, /OUVIR/);
    assert.equal(escuta.includes('function cartaoPergunta'), false);
    assert.equal(escuta.includes('function cartaoSombra'), false);
    const regra = css.slice(css.indexOf('.fala-escuta {'), css.indexOf('.fala-escuta {') + 140);
    assert.match(regra, /margin:/);
    assert.match(regra, /max-width: 100%/);
    assert.equal(regra.includes('#'), false);
    const tituloInicio = css.indexOf('\n.revisao-titulo {');
    const titulo = css.slice(tituloInicio, css.indexOf('}', tituloInicio));
    assert.match(titulo, /overflow-wrap: anywhere/);
    assert.match(titulo, /max-width: 100%/);
    const avisoInicio = css.indexOf('\n.ia-aviso {');
    const aviso = css.slice(avisoInicio, css.indexOf('}', avisoInicio));
    assert.match(aviso, /overflow-wrap: anywhere/);
    assert.match(aviso, /max-width: 100%/);
    const revisaoInicio = css.indexOf('\n.revisao {');
    const revisao = css.slice(revisaoInicio, css.indexOf('}', revisaoInicio));
    assert.match(revisao, /flex-wrap: wrap/);
    assert.match(revisao, /max-width: 100%/);
    assert.equal((app.match(/function cartaoEscuta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoPergunta\(/g) || []).length, 1);
    assert.equal((app.match(/'A escuta'/g) || []).length, 1);
    assert.equal((app.match(/'A pergunta'/g) || []).length, 1);
  });
});
