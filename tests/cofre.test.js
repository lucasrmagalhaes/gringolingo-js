import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  COFRES, avaliarCofre, AUDIENCIAS, avaliarAudiencia, REVOGACOES, avaliarRevogacao
} = await import('../js/cofre.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaProporcao } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCofre, registrarAudiencia, registrarRevogacao
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'cofre.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The anchor keeps the old state.',
  'Each service talks only to its neighbor.',
  'The traffic splits across two live versions.',
  'The ack rides on the next packet.',
  'The poison message left the queue.',
  'The heartbeat shows the service is alive.',
  'Each failure doubles the wait.',
  'The watchdog stops the late task.',
  'The pass expires in fifteen minutes.'
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

describe('cofre, audiencia e revogacao', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/cofre.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(COFRES, ['Guarda', 'Tira'], avaliarCofre);
    conferir(AUDIENCIAS, ['Vale', 'Recusa'], avaliarAudiencia);
    conferir(REVOGACOES, ['Corta', 'Sai'], avaliarRevogacao);
    const ids = [...COFRES, ...AUDIENCIAS, ...REVOGACOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const cofre = COFRES.find(c => c.id === 'duaschaves').rodadas[0];
    assert.equal(avaliarCofre(cofre, 'The vault kept 2 keys.').ok, true);
    const audiencia = AUDIENCIAS.find(c => c.id === 'audiencia2').rodadas[0];
    assert.equal(avaliarAudiencia(audiencia, 'The audience named 2 services.').ok, true);
    const revogacao = REVOGACOES.find(c => c.id === 'revoga2').rodadas[0];
    assert.equal(avaliarRevogacao(revogacao, 'The revocation covered 2 passes.').ok, true);
    const texto = JSON.stringify({ COFRES, AUDIENCIAS, REVOGACOES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Cofre' && f.melhor === 'The key lives outside the app.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Audiência' && f.melhor === 'The pass only works for the right service.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Revogação' && f.melhor === 'The old pass stops working at once.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['cofre', 'audiencia', 'revogacao']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('cofre, audiencia e revogacao contam no próprio contador', () => {
    travarMissao('cofre1');
    const cofre = registrarCofre(fim());
    assert.equal(cofre.bonusMissoes, 15);
    assert.equal(estado.stats.cofres, 1);
    assert.equal(estado.stats.fendas, 0);
    assert.equal(estado.stats.audiencias, 0);
    assert.equal(estado.stats.revogacoes, 0);
    assert.ok(estado.badges.includes('cofre'));
    for (const id of ['audiencia', 'revogacao', 'ancora', 'fenda']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('audiencia1');
    const audiencia = registrarAudiencia(fim());
    assert.equal(audiencia.bonusMissoes, 15);
    assert.equal(estado.stats.audiencias, 1);
    assert.equal(estado.stats.cofres, 1);
    assert.ok(estado.badges.includes('audiencia'));

    travarMissao('revogacao1');
    const revogacao = registrarRevogacao(fim());
    assert.equal(revogacao.bonusMissoes, 15);
    assert.equal(estado.stats.revogacoes, 1);
    assert.equal(estado.stats.fendas, 0);
    assert.ok(estado.badges.includes('revogacao'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 274);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a proporção conta os dias de fala dentro do vão', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaProporcao(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há proporção de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.proporcao, 0);
    const vazio = textoDaProporcao({}, '2026-11-04');
    assert.equal(vazio.texto, 'A proporção dos dias ainda é 0 em 0.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.proporcao, 0);
    const soSegundos = textoDaProporcao({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.proporcao, 1);
    assert.equal(soSegundos.texto, 'A proporção dos dias é de 1 em 1.');
    const um = textoDaProporcao({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.proporcao, 1);
    assert.equal(um.texto, 'A proporção dos dias é de 1 em 1.');
    const antes = textoDaProporcao({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(antes.dias, 1);
    assert.equal(antes.proporcao, 8);
    assert.equal(antes.texto, 'A proporção dos dias é de 1 em 8.');
    const umDia = textoDaProporcao({
      '2026-11-02': { n: 1, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(umDia.dias, 2);
    assert.equal(umDia.proporcao, 3);
    assert.equal(umDia.texto, 'A proporção dos dias é de 2 em 3.');
    const par = textoDaProporcao({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.proporcao, 10);
    assert.equal(par.texto, 'A proporção dos dias é de 2 em 10.');
    const igual = textoDaProporcao({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.proporcao, 10);
    assert.equal(igual.texto, 'A proporção dos dias é de 5 em 10.');
    const futuro = textoDaProporcao({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.proporcao, 8);
    assert.equal(futuro.texto, 'A proporção dos dias é de 1 em 8.');
    const zerado = textoDaProporcao({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.proporcao, 0);
  });

  test('a versão 2.79 deixa o cofre fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.79'/);
    assert.match(data, /versao: '2\.78'/);
    assert.match(sw, /gringolingo-v106/);
    assert.match(sw, /\.\/js\/cofre\.js/);
    assert.match(turno, /cofre\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCofre', 'pintarAudiencia', 'pintarRevogacao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaFendas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCofres'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /cofre: telaCofres/);
    assert.match(mapa, /audiencia: telaAudiencias/);
    assert.match(mapa, /revogacao: telaRevogacoes/);
    const proporcao = app.slice(app.indexOf('function cartaoProporcao'), app.indexOf('function blocoFluencia'));
    assert.match(proporcao, /fala-proporcao/);
    assert.match(proporcao, /VER A SEMANA/);
    assert.equal(proporcao.includes('function cartaoVao'), false);
    assert.equal(proporcao.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-proporcao {'), css.indexOf('.fala-proporcao {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const rotulo = css.slice(css.indexOf('.rotulo {'), css.indexOf('.rotulo {') + 80);
    assert.match(rotulo, /min-height: 44px/);
    assert.match(app, /campoResposta\('Escreva em inglês\.\.\.'\);\s*miolo\.push\(campo\.status, campo\.mic, campo\.entrada\);\s*const verificar = h\('button', \{ class: 'btn btn-verde', type: 'button', disabled: true \}, 'VERIFICAR'\)/);
    assert.match(app, /type: 'button', disabled: true \}, 'VERIFICAR'\);\s*campo\.entrada\.addEventListener\('input', \(\) => \{\s*verificar\.disabled = !campo\.entrada\.value\.trim\(\);\s*\}\);\s*const enviar = \(\) => \{\s*if \(!campo\.entrada\.value\.trim\(\) \|\| perguntaSessao\.feedback\) return;/);
    assert.match(app, /Vinte segundos\. A frase modelo só aparece depois\.'\)\);\s*miolo\.push\(barraGravar\(campo\.status\)\);\s*miolo\.push\(campo\.status, campo\.mic, campo\.entrada\);\s*const verificar = h\('button', \{ class: 'btn btn-verde', type: 'button', disabled: true \}, 'VERIFICAR'\)/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoProporcao\(/g) || []).length, 1);
  });
});
