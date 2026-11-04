import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RESERVAS, avaliarReserva, VARREDURAS, avaliarVarredura, PORTAS, avaliarPorta
} = await import('../js/reserva.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const { textoDaDuracao } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarReserva, registrarVarredura, registrarPorta
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'reserva.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The pause lasted two seconds.',
  'The config differs from the repo.',
  'The process opened too many files.',
  'The clocks differ by two seconds.',
  'Two of three must agree.',
  'The queue is full.',
  'The two jobs wait on each other.',
  'The name does not resolve.',
  'The bad message goes to the side queue.'
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

describe('reserva, varredura e porta', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/reserva.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(RESERVAS, ['Usa', 'Solta'], avaliarReserva);
    conferir(VARREDURAS, ['Conta', 'Junta'], avaliarVarredura);
    conferir(PORTAS, ['Bate', 'Ouve'], avaliarPorta);
    const ids = [...RESERVAS, ...VARREDURAS, ...PORTAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const reserva = RESERVAS.find(c => c.id === 'reservaqarenta').rodadas[0];
    assert.equal(avaliarReserva(reserva, 'Swap use reached 40 percent.').ok, true);
    const linhas = VARREDURAS.find(c => c.id === 'quarentabusca').rodadas[0];
    assert.equal(avaliarVarredura(linhas, 'The page runs 40 queries.').ok, true);
    const porta = PORTAS.find(c => c.id === 'portaoito').rodadas[0];
    assert.equal(avaliarPorta(porta, 'Nothing listens on port 8000.').ok, true);
    const texto = JSON.stringify({ RESERVAS, VARREDURAS, PORTAS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Reserva' && f.melhor === 'The server started using swap.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Varredura' && f.melhor === 'The page runs one query per row.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Porta' && f.melhor === 'Nothing listens on that port.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['reserva', 'varredura', 'porta']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
  });

  test('reserva, varredura e porta contam no próprio contador', () => {
    travarMissao('reserva1');
    const reserva = registrarReserva(fim());
    assert.equal(reserva.bonusMissoes, 15);
    assert.equal(estado.stats.reservas, 1);
    assert.equal(estado.stats.descritores, 0);
    assert.equal(estado.stats.varreduras, 0);
    assert.ok(estado.badges.includes('reserva'));
    for (const id of ['varredura', 'porta', 'descritor', 'pausa']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('varredura1');
    const varredura = registrarVarredura(fim());
    assert.equal(varredura.bonusMissoes, 15);
    assert.equal(estado.stats.varreduras, 1);
    assert.equal(estado.stats.reservas, 1);
    assert.ok(estado.badges.includes('varredura'));

    travarMissao('porta1');
    const porta = registrarPorta(fim());
    assert.equal(porta.bonusMissoes, 15);
    assert.equal(estado.stats.portas, 1);
    assert.equal(estado.stats.tanques, 0);
    assert.ok(estado.badges.includes('porta'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 199);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a duração mede os segundos de cada treino desta semana', () => {
    semTravessao('../js/semana.js');
    const vazia = textoDaDuracao(null, '2026-10-28');
    assert.equal(vazia.texto, 'Ainda não há duração nesta semana.');
    assert.equal(vazia.n, 0);
    assert.equal(vazia.media, 0);
    const curta = textoDaDuracao({ '2026-10-28': { segundos: 30, n: 1 } }, '2026-10-28');
    assert.equal(curta.media, 30);
    assert.equal(curta.texto, 'Cada treino desta semana durou menos de 1 minuto.');
    const um = textoDaDuracao({ '2026-10-28': { segundos: 60, n: 1 } }, '2026-10-28');
    assert.equal(um.texto, 'Cada treino desta semana durou 1 minuto.');
    const dois = textoDaDuracao({
      '2026-10-26': { segundos: 120, n: 1 },
      '2026-10-28': { segundos: 120, n: '1' }
    }, '2026-10-28');
    assert.equal(dois.n, 2);
    assert.equal(dois.media, 120);
    assert.equal(dois.texto, 'Cada treino desta semana durou 2 minutos.');
    const fora = textoDaDuracao({
      '2026-10-25': { segundos: 600, n: 1 },
      '2026-10-29': { segundos: 600, n: 1 }
    }, '2026-10-28');
    assert.equal(fora.texto, 'Ainda não há duração nesta semana.');
    const semTreino = textoDaDuracao({ '2026-10-28': { segundos: 0, n: 3 } }, '2026-10-28');
    assert.equal(semTreino.n, 0);
    assert.equal(semTreino.texto, 'Ainda não há duração nesta semana.');
  });

  test('a versão 2.54 deixa a reserva fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.54'/);
    assert.match(data, /versao: '2\.53'/);
    assert.match(sw, /gringolingo-v81/);
    assert.match(sw, /\.\/js\/reserva\.js/);
    assert.match(turno, /reserva\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarReserva', 'pintarVarredura', 'pintarPorta']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaDescritores'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaReservas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /reserva: telaReservas/);
    assert.match(mapa, /varredura: telaVarreduras/);
    assert.match(mapa, /porta: telaPortas/);
    const duracao = app.slice(app.indexOf('function cartaoDuracao'), app.indexOf('function blocoFluencia'));
    assert.match(duracao, /fala-duracao/);
    assert.match(duracao, /VER A SEMANA/);
    assert.equal(duracao.includes('function cartaoFalta'), false);
    const regra = css.slice(css.indexOf('.fala-duracao {'), css.indexOf('.fala-duracao {') + 90);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const aviso = css.slice(css.indexOf('.aviso-versao {'), css.indexOf('.aviso-versao:active'));
    assert.match(aviso, /min-height: 44px/);
    const entrada = css.slice(css.indexOf('.entrada {'), css.indexOf('textarea.entrada'));
    assert.match(entrada, /min-height: 44px/);
    const limpar = css.slice(css.indexOf('.busca-dic::-webkit-search-cancel-button'), css.indexOf('.dic-filtros'));
    assert.match(limpar, /width: 44px/);
    assert.match(limpar, /height: 44px/);
    assert.match(app, /class: 'aviso-versao',\s*type: 'button'/);
    assert.match(app, /class: 'aviso-versao aviso-metricas',\s*type: 'button'/);
    assert.match(app, /type: 'button', onclick: \(\) => \{ limparLog\(\); telaDebug\(\); \}/);
    assert.match(app, /type: 'button', onclick: fechar \}, 'BORA!'/);
    assert.match(app, /type: 'button' \}, '🎯 DESAFIAR'/);
    assert.match(app, /type: 'button', onclick: \(\) => iniciarChefao/);
  });
});
