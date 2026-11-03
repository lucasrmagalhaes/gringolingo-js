import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ESTIMATIVAS, avaliarEstimativa,
  CONSENSOS, avaliarConsenso,
  ATENDIMENTOS, avaliarAtendimento,
  historicoFala, rotuloHistorico
} = await import('../js/cotidiano.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarEstimativa, registrarConsenso, registrarAtendimento
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS, IDIOMAS, PERGUNTAS_DIA } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS, NUMEROS } = await import('../js/ensaio.js');
const { OPINIOES, CENAS_FALA } = await import('../js/opiniao.js');
const { RELATOS, CORTESIAS, AQUECIMENTOS, CLAROS } = await import('../js/call.js');
const { DEMOS, PRAZOS, STARS, ENFASES } = await import('../js/palco.js');
const { DECISOES, PARES, INCIDENTES } = await import('../js/plantao.js');
const { RETROS, CHEGADAS, LIGACOES } = await import('../js/discurso.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const ocupados = new Set([
  ...IDS_CINCO,
  ...CENAS_TECNICAS.map(c => c.id),
  ...IDIOMAS.map(c => c.id),
  ...PERGUNTAS_DIA.map(c => c.id),
  ENTREVISTA.id,
  ...CONTOS.map(c => c.id),
  ...NUMEROS.map(c => c.id),
  ...OPINIOES.map(c => c.id),
  ...CENAS_FALA.map(c => c.id),
  ...RELATOS.map(c => c.id),
  ...CORTESIAS.map(c => c.id),
  ...AQUECIMENTOS.map(c => c.id),
  ...CLAROS.map(c => c.id),
  ...DEMOS.map(c => c.id),
  ...PRAZOS.map(c => c.id),
  ...STARS.map(c => c.id),
  ...ENFASES.map(c => c.id),
  ...DECISOES.map(c => c.id),
  ...PARES.map(c => c.id),
  ...INCIDENTES.map(c => c.id),
  ...RETROS.map(c => c.id),
  ...CHEGADAS.map(c => c.id),
  ...LIGACOES.map(c => c.id)
]);

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
}

function conferirCena(lista, etapas, avaliar) {
  assert.equal(new Set(lista.map(c => c.id)).size, lista.length);
  for (const cena of lista) {
    assert.equal(ocupados.has(cena.id), false, cena.id);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), etapas);
    for (const rodada of cena.rodadas) {
      assert.ok(rodada.aceitas.length >= 2, cena.id);
      assert.equal(avaliar(rodada, rodada.melhor).ok, true, rodada.melhor);
      assert.equal(avaliar(rodada, 'The weather is nice.').ok, false);
    }
  }
}

describe('estimativa, consenso e atendimento', () => {
  test('a estimativa traz o prazo e a dúvida', () => {
    assert.equal(ESTIMATIVAS.length, 3);
    conferirCena(ESTIMATIVAS, ['Prazo', 'Dúvida'], avaliarEstimativa);
    const prazo = ESTIMATIVAS[0];
    assert.equal(avaliarEstimativa(prazo.rodadas[0], 'It should take about two days.').ok, true);
    assert.equal(avaliarEstimativa(prazo.rodadas[1], "I'm not sure yet, but I can check tomorrow.").ok, true);
  });

  test('o consenso discorda e pede um meio-termo', () => {
    assert.equal(CONSENSOS.length, 3);
    conferirCena(CONSENSOS, ['Discorda', 'Meio'], avaliarConsenso);
    const sexta = CONSENSOS[0];
    assert.equal(avaliarConsenso(sexta.rodadas[0], 'I see it differently because Friday is too soon.').ok, true);
    assert.equal(avaliarConsenso(sexta.rodadas[1], 'Can we meet in the middle and ship on Monday?').ok, true);
  });

  test('o atendimento liga para banco, entrega e hotel', () => {
    assert.equal(ATENDIMENTOS.length, 3);
    conferirCena(ATENDIMENTOS, ['Problema', 'Detalhe', 'Pedido'], avaliarAtendimento);
    const banco = ATENDIMENTOS[0];
    assert.equal(avaliarAtendimento(banco.rodadas[0], 'My card was charged twice.').ok, true);
    assert.equal(avaliarAtendimento(banco.rodadas[1], 'The charge was yesterday.').ok, true);
    assert.equal(avaliarAtendimento(banco.rodadas[2], 'Can you refund the extra charge?').ok, true);
    const ids = [...ESTIMATIVAS, ...CONSENSOS, ...ATENDIMENTOS].map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('o histórico conta treinos e acerto por dia', () => {
    const vazio = historicoFala({}, '2026-10-28', 3);
    assert.equal(vazio.length, 3);
    assert.deepEqual(vazio.map(d => d.treinos), [0, 0, 0]);
    assert.equal(vazio[0].data, '2026-10-26');
    assert.equal(vazio[2].data, '2026-10-28');
    assert.equal(vazio[2].precisao, null);
    assert.match(rotuloHistorico(vazio), /Sem treino/);

    const cheio = historicoFala({
      '2026-10-27': { n: 1, acertos: 1, respostas: 2 },
      '2026-10-28': { n: 2, acertos: 3, respostas: 4 }
    }, '2026-10-28', 3);
    assert.equal(cheio[1].treinos, 1);
    assert.equal(cheio[1].precisao, 50);
    assert.equal(cheio[2].treinos, 2);
    assert.equal(cheio[2].precisao, 75);
    assert.match(rotuloHistorico(cheio), /2 dias com treino/);
    assert.match(rotuloHistorico(cheio), /2 treinos/);
    assert.match(rotuloHistorico(cheio), /75%/);

    const estoura = historicoFala({ '2026-10-28': { n: 1, acertos: 9, respostas: 4 } }, '2026-10-28', 1);
    assert.equal(estoura[0].precisao, 100);
    assert.equal(historicoFala({}, '2026-10-28', 0).length, 1);
    assert.equal(historicoFala({}, '2026-10-28', 40).length, 30);
    assert.deepEqual(historicoFala({}, 'ontem'), []);
    assert.equal(historicoFala(null, '2026-10-28').length, 14);
  });

  test('estimativa, consenso e atendimento não viram diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'estimativa1', valor: 0, pago: false }] };
    const estimativa = registrarEstimativa({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.estimativas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.tecnicos, 0);
    assert.ok(estado.badges.includes('estimativa'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estimativa.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarConsenso({ xp: 26, nota: 70, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.consensos, 1);
    assert.ok(estado.badges.includes('consenso'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'atendimento1', valor: 0, pago: false }] };
    const atendimento = registrarAtendimento({
      xp: 34, nota: 90, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.atendimentos, 1);
    assert.ok(estado.badges.includes('atendimento'));
    assert.equal(atendimento.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);
  });

  test('o módulo novo não usa travessão e a voz não fica órfã', () => {
    semTravessao('../js/cotidiano.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(data, /versao: '2\.11'/);
    assert.match(sw, /\.\/js\/cotidiano\.js/);
    assert.equal(app.includes('setTimeout(ouvir, 280)'), false);
    assert.match(app, /historicoFala\(estado\.painel/);
  });
});
