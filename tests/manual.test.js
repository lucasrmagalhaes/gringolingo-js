import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  MANUAIS, avaliarManual, VERDES, avaliarVerde, CERTIFICADOS, avaliarCertificado
} = await import('../js/manual.js');
const { textoDaComparacao } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarManual, registrarVerde, registrarCertificado
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'manual.js') continue;
    const texto = readFileSync(join(raiz, 'js', nome), 'utf8');
    for (const achado of texto.matchAll(/\bid:\s*'([a-z0-9]+)'/g)) ids.add(achado[1]);
  }
  return ids;
}

const ocupados = idsJaUsados();

const FRASES_PROIBIDAS = [
  'The p95 latency went past two seconds.',
  'It should handle ten thousand users a day.',
  'One server gets the version first.',
  'The old path closes in June.',
  'The same event can arrive twice.',
  'The next step is to restart the worker.',
  'The load test ran for ten minutes.',
  'The line dropped after lunch.'
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

describe('manual, lado verde e certificado', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/manual.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(MANUAIS, ['Passo', 'Checagem'], avaliarManual);
    conferir(VERDES, ['Tráfego', 'Volta'], avaliarVerde);
    conferir(CERTIFICADOS, ['Prazo', 'Aviso'], avaliarCertificado);
    const ids = [...MANUAIS, ...VERDES, ...CERTIFICADOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const volta = VERDES.find(c => c.id === 'voltaminuto').rodadas[0];
    assert.equal(avaliarVerde(volta, 'We can switch back in 1 minute.').ok, true);
    const aviso = CERTIFICADOS.find(c => c.id === 'setedias').rodadas[0];
    assert.equal(avaliarCertificado(aviso, 'The warning shows 7 days before.').ok, true);
    const texto = JSON.stringify({ MANUAIS, VERDES, CERTIFICADOS });
    for (const frase of FRASES_PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Manual' && f.melhor === 'The runbook says to read the alert first.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Lado verde' && f.melhor === 'Traffic moves to the green side.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Certificado' && f.melhor === 'The certificate expires on Friday.'), true);
  });

  test('manual, lado verde e certificado contam no próprio contador', () => {
    travarMissao('manual1');
    const manual = registrarManual(fim());
    assert.equal(manual.bonusMissoes, 15);
    assert.equal(estado.stats.manuais, 1);
    assert.equal(estado.stats.donos, 0);
    assert.equal(estado.stats.verdes, 0);
    assert.ok(estado.badges.includes('manual'));
    for (const id of ['verde', 'certificado', 'dono', 'carga']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('verde1');
    const verde = registrarVerde(fim());
    assert.equal(verde.bonusMissoes, 15);
    assert.equal(estado.stats.verdes, 1);
    assert.equal(estado.stats.cargas, 0);
    assert.ok(estado.badges.includes('verde'));

    travarMissao('certificado1');
    const certificado = registrarCertificado(fim());
    assert.equal(certificado.bonusMissoes, 15);
    assert.equal(estado.stats.certificados, 1);
    assert.equal(estado.stats.boletins, 0);
    assert.ok(estado.badges.includes('certificado'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 163);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a comparação usa o mesmo ponto da semana anterior', () => {
    assert.equal(textoDaComparacao(null, '2026-10-28').texto, 'Ainda não há minutos para comparar com a semana anterior.');
    assert.equal(textoDaComparacao({}, 'dia-invalido').texto, 'Ainda não há minutos para comparar.');
    const pouco = textoDaComparacao({
      '2026-10-28': { segundos: 50 },
      '2026-10-21': { segundos: 10 }
    }, '2026-10-28');
    assert.equal(pouco.atras, false);
    assert.equal(pouco.texto, 'Ainda não há minutos para comparar com a semana anterior.');
    const aMais = textoDaComparacao({
      '2026-10-26': { segundos: 60 },
      '2026-10-28': { segundos: 60 },
      '2026-10-29': { segundos: 600 },
      '2026-10-19': { segundos: 60 }
    }, '2026-10-28');
    assert.equal(aMais.minutos, 2);
    assert.equal(aMais.anterior, 1);
    assert.equal(aMais.atras, false);
    assert.equal(aMais.texto, '2 minutos até aqui. É 1 a mais que a semana anterior.');
    const igual = textoDaComparacao({
      '2026-10-28': { segundos: 60 },
      '2026-10-21': { segundos: 60 }
    }, '2026-10-28');
    assert.equal(igual.delta, 0);
    assert.equal(igual.texto, '1 minuto até aqui, o mesmo da semana anterior.');
    const atras = textoDaComparacao({
      '2026-10-21': { segundos: 120 },
      '2026-10-22': { segundos: 600 }
    }, '2026-10-28');
    assert.equal(atras.anterior, 2);
    assert.equal(atras.atras, true);
    assert.equal(atras.texto, '0 minutos até aqui. São 2 a menos que a semana anterior.');
    const virada = textoDaComparacao({
      '2026-11-02': { segundos: 180 },
      '2026-10-26': { segundos: 60 }
    }, '2026-11-02');
    assert.equal(virada.minutos, 3);
    assert.equal(virada.anterior, 1);
    assert.equal(virada.texto, '3 minutos até aqui. São 2 a mais que a semana anterior.');
  });

  test('a versão 2.42 deixa o manual fora do passeio', () => {
    assert.equal(VERSAO_APP, '2.42');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    const semana = semTravessao('../js/semana.js');
    assert.match(data, /versao: '2\.42'/);
    assert.match(data, /versao: '2\.41'/);
    assert.match(sw, /gringolingo-v69/);
    assert.match(sw, /\.\/js\/manual\.js/);
    assert.match(turno, /manual\.js/);
    assert.equal(turno.includes('foco.js'), false);
    assert.match(semana, /function textoDaComparacao/);
    for (const nome of ['pintarManual', 'pintarVerde', 'pintarCertificado']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaDonos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaManuais'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /manual: telaManuais/);
    assert.match(mapa, /verde: telaVerdes/);
    assert.match(mapa, /certificado: telaCertificados/);
    const comparacao = app.slice(app.indexOf('function cartaoComparacao'), app.indexOf('function blocoFluencia'));
    assert.match(comparacao, /fala-comparacao/);
    assert.match(comparacao, /FALAR MAIS/);
    const ouvir = app.slice(app.indexOf('function bolha'), app.indexOf('function avancarHistoria'));
    assert.match(ouvir, /Ouvir: \$\{fala\.en\}/);
    assert.match(ouvir, /type: 'button'/);
    const regra = css.slice(css.indexOf('.fala-comparacao {'), css.indexOf('.fala-comparacao {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    const som = css.slice(css.indexOf('.bolha-som {'), css.indexOf('.bolha-som {') + 140);
    assert.match(som, /width: 44px/);
    assert.match(som, /height: 44px/);
    assert.equal(som.includes('#'), false);
  });
});
