import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  HINTS, avaliarHint, VACUUMS, avaliarVacuum, FREEZES, avaliarFreeze
} = await import('../js/hint.js');
const { TREINOS, auditarCatalogo } = await import('../js/hub.js');
const {
  textoDaPratica, textoDaAusencia, textoDoFecho, textoDaEstacao
} = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarHint, registrarVacuum, registrarFreeze
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { catalogoFaladas } = await import('../js/turno.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function idsJaUsados() {
  const ids = new Set();
  for (const nome of readdirSync(join(raiz, 'js'))) {
    if (!nome.endsWith('.js') || nome === 'hint.js') continue;
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

function diaFala(grupos) {
  return { n: 1, segundos: 20, grupos };
}

describe('hint, vacuum e freeze', () => {
  test('as três listas não repetem o catálogo', () => {
    const fonte = semTravessao('../js/hint.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(fonte.includes('Please keep'), false);
    conferir(HINTS, ['Aponta', 'Segue'], avaliarHint);
    conferir(VACUUMS, ['Limpa', 'Segue'], avaliarVacuum);
    conferir(FREEZES, ['Trava', 'Segue'], avaliarFreeze);
    const ids = [...HINTS, ...VACUUMS, ...FREEZES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const hint = HINTS.find(c => c.id === 'hint2').rodadas[0];
    assert.equal(avaliarHint(hint, 'The hint pointed 2 rows.').ok, true);
    const vacuum = VACUUMS.find(c => c.id === 'vacuum3').rodadas[0];
    assert.equal(avaliarVacuum(vacuum, 'The vacuum returned 3 spaces.').ok, true);
    const freeze = FREEZES.find(c => c.id === 'freeze4').rodadas[0];
    assert.equal(avaliarFreeze(freeze, 'The freeze left 4 rows read only.').ok, true);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Hint' && f.melhor === 'The hint points to the row that can leave.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Vacuum' && f.melhor === 'The cleanup returns the dead space.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Freeze' && f.melhor === 'The old row stays read only.'), true);
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    for (const id of ['hint', 'vacuum', 'freeze']) {
      const treino = TREINOS.find(t => t.id === id);
      assert.equal(treino.categoria, 'trabalho');
      assert.ok(treino.stat);
    }
    assert.equal(TREINOS.some(t => t.titulo === 'A prática'), false);
  });

  test('hint, vacuum e freeze contam no próprio contador', () => {
    travarMissao('hint1');
    const hint = registrarHint(fim());
    assert.equal(hint.bonusMissoes, 15);
    assert.equal(estado.stats.hints, 1);
    assert.equal(estado.stats.vacuums, 0);
    assert.equal(estado.stats.freezes, 0);
    assert.equal(estado.stats.accruals, 0);
    assert.ok(estado.badges.includes('hint'));
    for (const id of ['vacuum', 'freeze', 'accrual']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('vacuum1');
    const vacuum = registrarVacuum(fim());
    assert.equal(vacuum.bonusMissoes, 15);
    assert.equal(estado.stats.vacuums, 1);
    assert.equal(estado.stats.hints, 1);
    assert.ok(estado.badges.includes('vacuum'));

    travarMissao('freeze1');
    const freeze = registrarFreeze(fim());
    assert.equal(freeze.bonusMissoes, 15);
    assert.equal(estado.stats.freezes, 1);
    assert.equal(estado.stats.accruals, 0);
    assert.ok(estado.badges.includes('freeze'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 337);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a prática aponta o próximo treino ainda não feito', () => {
    semTravessao('../js/semana.js');
    const invalido = textoDaPratica(null, 'ontem', TREINOS, {});
    assert.equal(invalido.dias, null);
    assert.equal(invalido.id, '');
    assert.equal(invalido.texto, 'Ainda não há prática de fala.');
    const vazio = textoDaPratica({}, '2026-11-04', TREINOS, {});
    assert.equal(vazio.id, 'modelo');
    assert.equal(vazio.titulo, 'Para leigos');
    assert.equal(vazio.texto, 'Pratique Para leigos. Prompt, alucinação e RAG.');
    const semente = {
      '2026-10-31': diaFala({ trabalho: 1 }),
      '2026-11-01': diaFala({ trabalho: 1 }),
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-03': diaFala({ trabalho: 1 }),
      '2026-11-04': diaFala({ trabalho: 1 })
    };
    const sistema = textoDaPratica(semente, '2026-11-04', TREINOS, {});
    assert.equal(sistema.dias, 5);
    assert.equal(sistema.id, 'sistema');
    assert.equal(sistema.titulo, 'Sistema');
    assert.equal(sistema.texto, 'Pratique Sistema. Pedido, escala e gargalo.');
    assert.equal(/\d/.test(sistema.texto), false);
    assert.equal(sistema.texto.includes('segundos'), false);
    assert.equal(sistema.texto === textoDaAusencia(semente, '2026-11-04').texto, false);
    assert.equal(sistema.texto === textoDoFecho(semente, '2026-11-04').texto, false);
    assert.equal(sistema.texto === textoDaEstacao(semente, '2026-11-04').texto, false);
    const voz = textoDaPratica(semente, '2026-11-04', TREINOS, { sistemas: 1 });
    assert.equal(voz.id, 'codigo');
    assert.equal(voz.titulo, 'Em voz alta');
    assert.equal(voz.texto, 'Pratique Em voz alta. Pense alto enquanto resolve.');
    const statsEntrevista = {};
    for (const treino of TREINOS) {
      if (treino.categoria === 'entrevista') statsEntrevista[treino.stat] = 1;
    }
    const casa = textoDaPratica(semente, '2026-11-04', TREINOS, statsEntrevista);
    assert.equal(casa.id, 'rotina');
    assert.equal(casa.titulo, 'Em casa');
    assert.equal(casa.texto, 'Pratique Em casa. Manhã, jantar e a rotina.');
    const tudo = {};
    for (const treino of TREINOS) tudo[treino.stat] = 1;
    const passou = textoDaPratica(semente, '2026-11-04', TREINOS, tudo);
    assert.equal(passou.id, '');
    assert.equal(passou.texto, 'A prática já passou pelos treinos.');
    const futuro = textoDaPratica({
      '2026-11-02': diaFala({ trabalho: 1 }),
      '2026-11-08': diaFala({ entrevista: 1, cotidiano: 1, pronuncia: 1, revisao: 1 })
    }, '2026-11-04', TREINOS, {});
    assert.equal(futuro.dias, 1);
    assert.equal(futuro.id, 'sistema');
    const mudo = textoDaPratica({
      '2026-11-04': { n: 0, segundos: 0, grupos: { entrevista: 4 } },
      '2026-11-01': diaFala({ trabalho: 1 })
    }, '2026-11-04', TREINOS, {});
    assert.equal(mudo.dias, 1);
    assert.equal(mudo.id, 'sistema');
  });

  test('a versão 3.00 deixa o hint fora do passeio', () => {
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '3\.00'/);
    assert.match(data, /versao: '2\.99'/);
    assert.match(sw, /gringolingo-v127/);
    assert.match(sw, /\.\/js\/hint\.js/);
    assert.match(turno, /hint\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarHint', 'pintarVacuum', 'pintarFreeze']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaAccruals'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaHints'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /hint: telaHints/);
    assert.match(mapa, /vacuum: telaVacuums/);
    assert.match(mapa, /freeze: telaFreezes/);
    const pratica = app.slice(app.indexOf('function cartaoPratica'), app.indexOf('function blocoFluencia'));
    assert.match(pratica, /fala-pratica/);
    assert.match(pratica, /A prática/);
    assert.match(pratica, /COMEÇAR/);
    assert.equal(pratica.includes('function cartaoAusencia'), false);
    assert.equal(pratica.includes('function cartaoFecho'), false);
    const regra = css.slice(css.indexOf('.fala-pratica {'), css.indexOf('.fala-pratica {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
    assert.match(css, /\.feedback-conteudo \{[^}]*flex-wrap: wrap/);
    const fb = css.slice(css.indexOf('.feedback-conteudo > .btn {'), css.indexOf('.feedback-conteudo > .btn {') + 160);
    assert.match(fb, /min-height: 44px/);
    assert.match(fb, /max-width: 100%/);
    assert.match(css, /\.feedback-textos \{[^}]*min-width: min\(100%, 180px\)/);
    assert.equal((app.match(/function cartaoPratica\(/g) || []).length, 1);
    assert.equal((app.match(/function cartaoAusencia\(/g) || []).length, 1);
    assert.equal((app.match(/A prática/g) || []).length, 1);
    assert.equal((app.match(/A ausência/g) || []).length, 1);
  });
});
