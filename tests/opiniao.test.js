import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  OPINIOES, avaliarOpiniao,
  CENAS_FALA, avaliarCena,
  RAPIDOS, avaliarRapido, SEGUNDOS_RAPIDO,
  contarFaladas, lembreteMeta
} = await import('../js/opiniao.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarOpiniao, registrarCena, registrarRapido,
  mesclarEstado, importarEstado
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS } = await import('../js/ensaio.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const ocupados = new Set([
  ...IDS_CINCO,
  ...CENAS_TECNICAS.map(c => c.id),
  ENTREVISTA.id,
  ...CONTOS.map(c => c.id)
]);

beforeEach(() => {
  definirAgora(dia);
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

describe('opinião, cena e resposta rápida', () => {
  test('cada opinião pede um motivo e uma concordância, fora das cenas antigas', () => {
    assert.equal(OPINIOES.length, 4);
    const ids = OPINIOES.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const cena of OPINIOES) {
      assert.equal(ocupados.has(cena.id), false, cena.id);
      assert.equal(cena.rodadas.length, 2, cena.id);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.equal(avaliarOpiniao(rodada, rodada.melhor).ok, true, rodada.melhor);
      }
    }
    const foco = OPINIOES.find(c => c.id === 'foco');
    assert.equal(avaliarOpiniao(foco.rodadas[1], 'I agree, but I like the office too.').ok, true);
    assert.equal(avaliarOpiniao(foco.rodadas[0], 'The weather is nice.').ok, false);
  });

  test('cada cena descreve o que acontece e um detalhe', () => {
    assert.equal(CENAS_FALA.length, 4);
    const ids = CENAS_FALA.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const cena of CENAS_FALA) {
      assert.equal(ocupados.has(cena.id), false, cena.id);
      assert.equal(cena.rodadas.length, 2, cena.id);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.equal(avaliarCena(rodada, rodada.melhor).ok, true, rodada.melhor);
      }
    }
  });

  test('a resposta rápida esconde o modelo até a tentativa e dura vinte segundos', () => {
    assert.equal(SEGUNDOS_RAPIDO, 20);
    assert.equal(RAPIDOS.length, 8);
    const ids = RAPIDOS.map(item => item.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const item of RAPIDOS) {
      assert.ok(item.aceitas.length >= 2, item.id);
      assert.ok(item.pergunta, item.id);
      assert.equal(avaliarRapido(item, item.melhor).ok, true, item.melhor);
      assert.equal(avaliarRapido(item, '').ok, false, item.id);
      assert.equal(avaliarRapido(item, '').melhor, item.melhor);
    }
  });

  test('a contagem da semana ignora o futuro e o lembrete aperta a partir de quinta', () => {
    const painel = {
      '2026-10-26': { n: 1, soma: 80 },
      '2026-10-28': { n: 2, soma: 100 },
      '2026-10-29': { n: 9, soma: 90 }
    };
    assert.equal(contarFaladas(painel, '2026-10-28'), 3);
    assert.equal(contarFaladas(painel, '2026-10-29'), 12);
    const calma = lembreteMeta(1, 3, '2026-10-28');
    assert.match(calma, /1 de 3/);
    assert.equal(calma.includes('Ainda dá tempo'), false);
    const tarde = lembreteMeta(1, 3, '2026-10-29');
    assert.match(tarde, /Ainda dá tempo/);
    assert.match(tarde, /Faltam 2 falas/);
    assert.match(lembreteMeta(3, 3, '2026-10-28'), /batida/);
  });

  test('opinião, cena e resposta rápida não viram diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'opiniao1', valor: 0, pago: false }] };
    const opiniao = registrarOpiniao({
      xp: 18, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0
    });
    assert.equal(estado.stats.opinioes, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('opiniao'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(opiniao.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarCena({ xp: 18, nota: 50, acertos: 1, respostas: 2, perfeita: false, comboMax: 0 });
    assert.equal(estado.stats.cenasFala, 1);
    assert.ok(estado.badges.includes('olho'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'rapido1', valor: 0, pago: false }] };
    const rapido = registrarRapido({
      xp: 12, nota: 50, acertos: 1, respostas: 4, perfeita: false, comboMax: 0
    });
    assert.equal(estado.stats.rapidos, 1);
    assert.ok(estado.badges.includes('rapido'));
    assert.equal(rapido.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);
  });

  test('a meta semanal conta uma vez e sem nota não entra no painel', () => {
    estado.painel = {
      '2026-10-26': { soma: 100, n: 1, acertos: 1, respostas: 1 },
      '2026-10-27': { soma: 80, n: 1, acertos: 1, respostas: 1 }
    };
    registrarOpiniao({ xp: 10, acertos: 1, respostas: 2, perfeita: false, comboMax: 0 });
    assert.equal(estado.painel['2026-10-28'], undefined);
    assert.equal(estado.stats.metasFala, 0);

    registrarOpiniao({ xp: 10, nota: 40, acertos: 1, respostas: 2, perfeita: false, comboMax: 0 });
    assert.equal(estado.metaFalaSemana, '2026-10-26');
    assert.equal(estado.stats.metasFala, 1);
    assert.ok(estado.badges.includes('semanaFala'));
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarRapido({ xp: 8, nota: 0, acertos: 0, respostas: 4, perfeita: false, comboMax: 0 });
    assert.equal(estado.stats.metasFala, 1);
    assert.equal(estado.painel['2026-10-28'].n, 2);
  });

  test('meta inválida volta para 3 e a nuvem só adota a meta padrão ainda sem semana', () => {
    importarEstado({ xp: 0, licoes: {}, metaFala: 'oito', metaFalaSemana: 'ontem' }, 'substituir');
    assert.equal(estado.metaFala, 3);
    assert.equal(estado.metaFalaSemana, null);

    mesclarEstado({ xp: 0, metaFala: 5, stats: { metasFala: 0 } });
    assert.equal(estado.metaFala, 5);

    estado.metaFala = 5;
    mesclarEstado({ xp: 0, metaFala: 2 });
    assert.equal(estado.metaFala, 5);

    estado.metaFalaSemana = '2026-10-19';
    mesclarEstado({ xp: 0, metaFalaSemana: '2026-10-26' });
    assert.equal(estado.metaFalaSemana, '2026-10-26');
    mesclarEstado({ xp: 0, metaFalaSemana: '2026-10-12' });
    assert.equal(estado.metaFalaSemana, '2026-10-26');
  });

  test('o módulo novo não usa travessão', () => {
    const arquivo = readFileSync(new URL('../js/opiniao.js', import.meta.url), 'utf8');
    assert.equal(arquivo.includes('\u2014'), false);
    assert.equal(arquivo.includes('\u2013'), false);
  });
});
