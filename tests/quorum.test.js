import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  QUORUMS, avaliarQuorum, MAIORIAS, avaliarMaioria, ARBITROS, avaliarArbitro
} = await import('../js/quorum.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaCobertura } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarQuorum, registrarMaioria, registrarArbitro
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'quorum.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The key lives outside the app.',
  'The pass only works for the right service.',
  'The old pass stops working at once.',
  'The anchor keeps the old state.',
  'Each service talks only to its neighbor.',
  'The traffic splits across two live versions.',
  'The ack rides on the next packet.',
  'The poison message left the queue.',
  'The heartbeat shows the service is alive.'
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

describe('quorum, maioria e arbitro', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/quorum.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(QUORUMS, ['Espera', 'Grava'], avaliarQuorum);
    conferir(MAIORIAS, ['Confirma', 'Recusa'], avaliarMaioria);
    conferir(ARBITROS, ['Desempata', 'Escolhe'], avaliarArbitro);
    const ids = [...QUORUMS, ...MAIORIAS, ...ARBITROS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const quorum = QUORUMS.find(c => c.id === 'quorum3').rodadas[0];
    assert.equal(avaliarQuorum(quorum, 'The quorum waited for 3 nodes.').ok, true);
    const maioria = MAIORIAS.find(c => c.id === 'maioria5').rodadas[0];
    assert.equal(avaliarMaioria(maioria, 'The majority counted 5 votes.').ok, true);
    const arbitro = ARBITROS.find(c => c.id === 'umvoto').rodadas[0];
    assert.equal(avaliarArbitro(arbitro, 'The arbiter cast 1 vote.').ok, true);
    const texto = JSON.stringify({ QUORUMS, MAIORIAS, ARBITROS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Quórum' && f.melhor === 'The write waits for a majority.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Maioria' && f.melhor === 'More than half must confirm.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Árbitro' && f.melhor === 'The arbiter breaks the tie.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['quorum', 'maioria', 'arbitro']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('quorum, maioria e arbitro contam no próprio contador', () => {
    travarMissao('quorum1');
    const quorum = registrarQuorum(fim());
    assert.equal(quorum.bonusMissoes, 15);
    assert.equal(estado.stats.quoruns, 1);
    assert.equal(estado.stats.revogacoes, 0);
    assert.equal(estado.stats.maiorias, 0);
    assert.equal(estado.stats.arbitros, 0);
    assert.ok(estado.badges.includes('quorum'));
    for (const id of ['maioria', 'arbitro', 'cofre', 'revogacao']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('maioria1');
    const maioria = registrarMaioria(fim());
    assert.equal(maioria.bonusMissoes, 15);
    assert.equal(estado.stats.maiorias, 1);
    assert.equal(estado.stats.quoruns, 1);
    assert.ok(estado.badges.includes('maioria'));

    travarMissao('arbitro1');
    const arbitro = registrarArbitro(fim());
    assert.equal(arbitro.bonusMissoes, 15);
    assert.equal(estado.stats.arbitros, 1);
    assert.equal(estado.stats.revogacoes, 0);
    assert.ok(estado.badges.includes('arbitro'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 277);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a cobertura conta a fatia dos dias com fala', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaCobertura(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há cobertura de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.cobertura, 0);
    const vazio = textoDaCobertura({}, '2026-11-04');
    assert.equal(vazio.texto, 'A cobertura dos dias ainda é 0 por cento.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.cobertura, 0);
    const soSegundos = textoDaCobertura({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.cobertura, 100);
    assert.equal(soSegundos.texto, 'A cobertura dos dias é de 100 por cento.');
    const um = textoDaCobertura({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.cobertura, 100);
    assert.equal(um.texto, 'A cobertura dos dias é de 100 por cento.');
    const antes = textoDaCobertura({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(antes.dias, 1);
    assert.equal(antes.cobertura, 13);
    assert.equal(antes.texto, 'A cobertura dos dias é de 13 por cento.');
    const umDia = textoDaCobertura({
      '2026-11-02': { n: 1, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(umDia.dias, 2);
    assert.equal(umDia.cobertura, 67);
    assert.equal(umDia.texto, 'A cobertura dos dias é de 67 por cento.');
    const par = textoDaCobertura({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.cobertura, 20);
    assert.equal(par.texto, 'A cobertura dos dias é de 20 por cento.');
    const igual = textoDaCobertura({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.cobertura, 50);
    assert.equal(igual.texto, 'A cobertura dos dias é de 50 por cento.');
    const futuro = textoDaCobertura({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.cobertura, 13);
    assert.equal(futuro.texto, 'A cobertura dos dias é de 13 por cento.');
    const zerado = textoDaCobertura({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.cobertura, 0);
  });

  test('a versão 2.80 deixa o quórum fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.80'/);
    assert.match(data, /versao: '2\.79'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/quorum\.js/);
    assert.match(turno, /quorum\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarQuorum', 'pintarMaioria', 'pintarArbitro']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaRevogacoes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaQuoruns'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /quorum: telaQuoruns/);
    assert.match(mapa, /maioria: telaMaiorias/);
    assert.match(mapa, /arbitro: telaArbitros/);
    const cobertura = app.slice(app.indexOf('function cartaoCobertura'), app.indexOf('function blocoFluencia'));
    assert.match(cobertura, /fala-cobertura/);
    assert.match(cobertura, /VER A SEMANA/);
    assert.equal(cobertura.includes('function cartaoProporcao'), false);
    assert.equal(cobertura.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-cobertura {'), css.indexOf('.fala-cobertura {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const marca = css.slice(css.indexOf('.logo-marca {'), css.indexOf('.logo-marca {') + 80);
    assert.match(marca, /min-height: 44px/);
    assert.match(app, /type: 'button', disabled: true \}, passo\.tipo === 'sombra' \? 'COMPARAR' : 'VERIFICAR'/);
    assert.match(app, /type: 'button', disabled: true \}, 'VERIFICAR'\);\s*campo\.entrada\.addEventListener\('input', \(\) => \{\s*verificar\.disabled = !campo\.entrada\.value\.trim\(\);\s*\}\);\s*const enviar = \(\) => \{\s*if \(!campo\.entrada\.value\.trim\(\) \|\| frasalSessao\.feedback\) return;/);
    assert.match(app, /type: 'button', disabled: true \}, 'VERIFICAR'\);\s*campo\.entrada\.addEventListener\('input', \(\) => \{\s*verificar\.disabled = !campo\.entrada\.value\.trim\(\);\s*\}\);\s*const enviar = async \(\) => \{\s*if \(!campo\.entrada\.value\.trim\(\) \|\| idiomaSessao\.feedback\) return;/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoCobertura\(/g) || []).length, 1);
  });
});
