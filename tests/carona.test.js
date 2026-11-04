import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CARONAS, avaliarCarona, VENENOS, avaliarVeneno, FAROIS, avaliarFarol
} = await import('../js/carona.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaExtensao } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCarona, registrarVeneno, registrarFarol
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'carona.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'Each failure doubles the wait.',
  'The watchdog stops the late task.',
  'The pass expires in fifteen minutes.',
  'Only two jobs can pass together.',
  'All four people must arrive together.',
  'The latch opens when the count hits zero.',
  'We kept one line out of every ten.',
  'The key landed in its niche.',
  'The seal on the package changed.'
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

describe('carona, veneno e farol', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/carona.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(CARONAS, ['Viaja', 'Confirma'], avaliarCarona);
    conferir(VENENOS, ['Sai', 'Isola'], avaliarVeneno);
    conferir(FAROIS, ['Pisca', 'Vive'], avaliarFarol);
    const ids = [...CARONAS, ...VENENOS, ...FAROIS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const carona = CARONAS.find(c => c.id === 'umpacote').rodadas[0];
    assert.equal(avaliarCarona(carona, 'The ack rode on 1 packet.').ok, true);
    const veneno = VENENOS.find(c => c.id === 'minutoveneno').rodadas[0];
    assert.equal(avaliarVeneno(veneno, 'The poison message sat aside for 1 minute.').ok, true);
    const farol = FAROIS.find(c => c.id === 'farol5').rodadas[0];
    assert.equal(avaliarFarol(farol, 'The heartbeat waited 5 seconds.').ok, true);
    const texto = JSON.stringify({ CARONAS, VENENOS, FAROIS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Carona' && f.melhor === 'The ack rides on the next packet.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Veneno' && f.melhor === 'The poison message left the queue.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Farol' && f.melhor === 'The heartbeat shows the service is alive.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['carona', 'veneno', 'farol']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('carona, veneno e farol contam no próprio contador', () => {
    travarMissao('carona1');
    const carona = registrarCarona(fim());
    assert.equal(carona.bonusMissoes, 15);
    assert.equal(estado.stats.caronas, 1);
    assert.equal(estado.stats.ampulhetas, 0);
    assert.equal(estado.stats.venenos, 0);
    assert.equal(estado.stats.farois, 0);
    assert.ok(estado.badges.includes('carona'));
    for (const id of ['veneno', 'farol', 'recuo', 'vigia']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('veneno1');
    const veneno = registrarVeneno(fim());
    assert.equal(veneno.bonusMissoes, 15);
    assert.equal(estado.stats.venenos, 1);
    assert.equal(estado.stats.caronas, 1);
    assert.ok(estado.badges.includes('veneno'));

    travarMissao('farol1');
    const farol = registrarFarol(fim());
    assert.equal(farol.bonusMissoes, 15);
    assert.equal(estado.stats.farois, 1);
    assert.equal(estado.stats.ampulhetas, 0);
    assert.ok(estado.badges.includes('farol'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 268);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a extensão mede os dias do primeiro treino até hoje', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaExtensao(null, 'ontem');
    assert.equal(invalido.texto, 'Ainda não há extensão de treinos.');
    assert.equal(invalido.dias, null);
    assert.equal(invalido.extensao, 0);
    const vazio = textoDaExtensao({}, '2026-11-04');
    assert.equal(vazio.texto, 'A extensão dos dias ainda é 0 dias.');
    assert.equal(vazio.dias, 0);
    assert.equal(vazio.extensao, 0);
    const soSegundos = textoDaExtensao({ '2026-11-04': { n: 0, segundos: 90 } }, '2026-11-04');
    assert.equal(soSegundos.dias, 1);
    assert.equal(soSegundos.extensao, 1);
    assert.equal(soSegundos.texto, 'A extensão dos dias é de 1 dia.');
    const um = textoDaExtensao({ '2026-11-04': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(um.dias, 1);
    assert.equal(um.extensao, 1);
    assert.equal(um.texto, 'A extensão dos dias é de 1 dia.');
    const antes = textoDaExtensao({ '2026-10-28': { n: 1, segundos: 60 } }, '2026-11-04');
    assert.equal(antes.dias, 1);
    assert.equal(antes.extensao, 8);
    assert.equal(antes.texto, 'A extensão dos dias é de 8 dias.');
    const par = textoDaExtensao({
      '2026-10-26': { n: 4, segundos: 40 },
      '2026-11-04': { n: 1, segundos: 60 }
    }, '2026-11-04');
    assert.equal(par.dias, 2);
    assert.equal(par.extensao, 10);
    assert.equal(par.texto, 'A extensão dos dias é de 10 dias.');
    const igual = textoDaExtensao({
      '2026-10-26': { n: 1, segundos: 40 },
      '2026-10-27': { n: 1, segundos: 60 },
      '2026-10-28': { n: 1, segundos: 90 },
      '2026-11-02': { n: 1, segundos: 60 },
      '2026-11-04': { n: 1, segundos: 600 }
    }, '2026-11-04');
    assert.equal(igual.dias, 5);
    assert.equal(igual.extensao, 10);
    assert.equal(igual.texto, 'A extensão dos dias é de 10 dias.');
    const futuro = textoDaExtensao({
      '2026-10-28': { n: 2, segundos: 60 },
      '2026-11-05': { n: 1, segundos: 900 }
    }, '2026-11-04');
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.extensao, 8);
    assert.equal(futuro.texto, 'A extensão dos dias é de 8 dias.');
    const zerado = textoDaExtensao({
      '2026-11-03': { n: 0, segundos: 0 },
      '2026-11-04': { n: 0, segundos: 0 }
    }, '2026-11-04');
    assert.equal(zerado.dias, 0);
    assert.equal(zerado.extensao, 0);
  });

  test('a versão 2.77 deixa a carona fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.77'/);
    assert.match(data, /versao: '2\.76'/);
    assert.match(sw, /gringolingo-v104/);
    assert.match(sw, /\.\/js\/carona\.js/);
    assert.match(turno, /carona\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCarona', 'pintarVeneno', 'pintarFarol']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaAmpulhetas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaCaronas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /carona: telaCaronas/);
    assert.match(mapa, /veneno: telaVenenos/);
    assert.match(mapa, /farol: telaFarois/);
    const extensao = app.slice(app.indexOf('function cartaoExtensao'), app.indexOf('function blocoFluencia'));
    assert.match(extensao, /fala-extensao/);
    assert.match(extensao, /VER A SEMANA/);
    assert.equal(extensao.includes('function cartaoRepeticao'), false);
    assert.equal(extensao.includes('function cartaoMeta'), false);
    const regra = css.slice(css.indexOf('.fala-extensao {'), css.indexOf('.fala-extensao {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const atalho = css.slice(css.indexOf('.licao.chefao {'), css.indexOf('.licao.chefao {') + 80);
    assert.match(atalho, /min-height: 44px/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(numeroSessao\.i \+ 1 >= numeroSessao\.fila\.length\) concluirNumero\(\);/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(claroSessao\.i \+ 1 >= claroSessao\.fila\.length\) concluirClaro\(\);/);
    assert.match(app, /type: 'button',\s*onclick\(\) \{\s*if \(enfaseSessao\.i \+ 1 >= enfaseSessao\.fila\.length\) concluirEnfase\(\);/);
    assert.equal((app.match(/function cartaoMeta\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoExtensao\(/g) || []).length, 1);
  });
});
