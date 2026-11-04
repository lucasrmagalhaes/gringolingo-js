import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  LIDERES, avaliarLider, MANDATOS, avaliarMandato, SEGUIDORES, avaliarSeguidor
} = await import('../js/lider.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDoIntervalo } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarLider, registrarMandato, registrarSeguidor
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'lider.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The write waits for a majority.',
  'More than half must confirm.',
  'The arbiter breaks the tie.',
  'The key lives outside the app.',
  'The pass only works for the right service.',
  'The old pass stops working at once.',
  'The anchor keeps the old state.',
  'Each service talks only to its neighbor.',
  'The traffic splits across two live versions.'
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

describe('lider, mandato e seguidor', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/lider.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(LIDERES, ['Conduz', 'Segue'], avaliarLider);
    conferir(MANDATOS, ['Sobe', 'Fecha'], avaliarMandato);
    conferir(SEGUIDORES, ['Copia', 'Espera'], avaliarSeguidor);
    const ids = [...LIDERES, ...MANDATOS, ...SEGUIDORES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const lider = LIDERES.find(c => c.id === 'lider3').rodadas[0];
    assert.equal(avaliarLider(lider, 'The leader guided 3 nodes.').ok, true);
    const mandato = MANDATOS.find(c => c.id === 'mandato2').rodadas[0];
    assert.equal(avaliarMandato(mandato, 'The term rose by 2.').ok, true);
    const seguidor = SEGUIDORES.find(c => c.id === 'seguidor4').rodadas[0];
    assert.equal(avaliarSeguidor(seguidor, 'The follower copied 4 lines.').ok, true);
    const texto = JSON.stringify({ LIDERES, MANDATOS, SEGUIDORES });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Líder' && f.melhor === 'The leader guides the term.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Mandato' && f.melhor === 'Each election raises the term.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Seguidor' && f.melhor === 'The follower copies the log.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['lider', 'mandato', 'seguidor']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('lider, mandato e seguidor contam no próprio contador', () => {
    travarMissao('lider1');
    const lider = registrarLider(fim());
    assert.equal(lider.bonusMissoes, 15);
    assert.equal(estado.stats.lideres, 1);
    assert.equal(estado.stats.arbitros, 0);
    assert.equal(estado.stats.mandatos, 0);
    assert.equal(estado.stats.seguidores, 0);
    assert.ok(estado.badges.includes('lider'));
    for (const id of ['mandato', 'seguidor', 'quorum', 'arbitro']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('mandato1');
    const mandato = registrarMandato(fim());
    assert.equal(mandato.bonusMissoes, 15);
    assert.equal(estado.stats.mandatos, 1);
    assert.equal(estado.stats.lideres, 1);
    assert.ok(estado.badges.includes('mandato'));

    travarMissao('seguidor1');
    const seguidor = registrarSeguidor(fim());
    assert.equal(seguidor.bonusMissoes, 15);
    assert.equal(estado.stats.seguidores, 1);
    assert.equal(estado.stats.arbitros, 0);
    assert.ok(estado.badges.includes('seguidor'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 280);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o intervalo mede o vão médio entre os dias de fala', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDoIntervalo(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há intervalo de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.intervalo, 0);
    const vazio = textoDoIntervalo({}, '2026-11-04');
    assert.equal(vazio.texto, 'O intervalo dos dias ainda é 0 dias.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.intervalo, 0);
    const soSegundos = textoDoIntervalo({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.intervalo, 0);
    assert.equal(soSegundos.texto, 'O intervalo dos dias é de 0 dias.');
    const um = textoDoIntervalo({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.intervalo, 0);
    assert.equal(um.texto, 'O intervalo dos dias é de 0 dias.');
    const antes = textoDoIntervalo({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(antes.dias, 1);
    assert.equal(antes.intervalo, 0);
    assert.equal(antes.texto, 'O intervalo dos dias é de 0 dias.');
    const umDia = textoDoIntervalo({
      '2026-11-02': { n: 1, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(umDia.dias, 2);
    assert.equal(umDia.intervalo, 2);
    assert.equal(umDia.texto, 'O intervalo dos dias é de 2 dias.');
    const par = textoDoIntervalo({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.intervalo, 9);
    assert.equal(par.texto, 'O intervalo dos dias é de 9 dias.');
    const seguido = textoDoIntervalo({
      '2026-10-27': { n: 1, segundos: 40 },
      '2026-10-28': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(seguido.dias, 2);
    assert.equal(seguido.intervalo, 1);
    assert.equal(seguido.texto, 'O intervalo dos dias é de 1 dia.');
    const igual = textoDoIntervalo({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.intervalo, 2);
    assert.equal(igual.texto, 'O intervalo dos dias é de 2 dias.');
    const futuro = textoDoIntervalo({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.intervalo, 0);
    assert.equal(futuro.texto, 'O intervalo dos dias é de 0 dias.');
    const zerado = textoDoIntervalo({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.intervalo, 0);
  });

  test('a versão 2.81 deixa o líder fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.81'/);
    assert.match(data, /versao: '2\.80'/);
    assert.match(sw, /gringolingo-v108/);
    assert.match(sw, /\.\/js\/lider\.js/);
    assert.match(turno, /lider\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarLider', 'pintarMandato', 'pintarSeguidor']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaArbitros'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaLideres'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /lider: telaLideres/);
    assert.match(mapa, /mandato: telaMandatos/);
    assert.match(mapa, /seguidor: telaSeguidores/);
    const intervalo = app.slice(app.indexOf('function cartaoIntervalo'), app.indexOf('function blocoFluencia'));
    assert.match(intervalo, /fala-intervalo/);
    assert.match(intervalo, /VER A SEMANA/);
    assert.equal(intervalo.includes('function cartaoCobertura'), false);
    assert.equal(intervalo.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-intervalo {'), css.indexOf('.fala-intervalo {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const pilula = css.slice(css.indexOf('.pilula {'), css.indexOf('.pilula {') + 80);
    assert.match(pilula, /min-height: 44px/);
    assert.match(app, /type: 'button', disabled: true \}, 'VERIFICAR'\);\s*campo\.entrada\.addEventListener\('input', \(\) => \{\s*verificar\.disabled = !campo\.entrada\.value\.trim\(\);\s*\}\);\s*const enviar = async \(\) => \{\s*if \(!campo\.entrada\.value\.trim\(\) \|\| deslizeSessao\.feedback\) return;/);
    assert.match(app, /type: 'button', disabled: true \}, 'VERIFICAR'\);\s*campo\.entrada\.addEventListener\('input', \(\) => \{\s*verificar\.disabled = !campo\.entrada\.value\.trim\(\);\s*\}\);\s*const enviar = async \(\) => \{\s*if \(!campo\.entrada\.value\.trim\(\) \|\| claroSessao\.feedback\) return;/);
    assert.match(app, /type: 'button', disabled: true \}, 'VERIFICAR'\);\s*campo\.entrada\.addEventListener\('input', \(\) => \{\s*verificar\.disabled = !campo\.entrada\.value\.trim\(\);\s*\}\);\s*const enviar = async \(\) => \{\s*if \(!campo\.entrada\.value\.trim\(\) \|\| enfaseSessao\.feedback\) return;/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoIntervalo\(/g) || []).length, 1);
  });
});
