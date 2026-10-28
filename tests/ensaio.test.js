import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ENTREVISTA, avaliarEntrevista,
  CONTOS, avaliarConto,
  NUMEROS,
  avaliarDeslize
} = await import('../js/ensaio.js');
const {
  estado, limparEstadoMemoria, definirAgora, registrarTecnico, registrarDeslize,
  registrarEntrevista, registrarConto, registrarNumero, deslizesVencidos, revisarDeslize,
  mesclarEstado, importarEstado
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);

beforeEach(() => {
  definirAgora(dia);
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

describe('entrevista, história e números', () => {
  test('a entrevista longa tem seis falas e não é uma das cinco cenas', () => {
    assert.equal(ENTREVISTA.rodadas.length, 6);
    assert.equal(IDS_CINCO.includes(ENTREVISTA.id), false);
    assert.notEqual(ENTREVISTA.id, 'entrevista');
    assert.notEqual(ENTREVISTA.id, 'vaga');
    const primeira = ENTREVISTA.rodadas[0];
    assert.equal(avaliarEntrevista(primeira, 'I am a full stack developer.').ok, true);
    assert.equal(avaliarEntrevista(primeira, 'The weather is nice.').ok, false);
    const pergunta = ENTREVISTA.rodadas[5];
    assert.equal(pergunta.melhor.endsWith('?'), true);
    assert.equal(avaliarEntrevista(pergunta, 'What does a normal week look like?').ok, true);
  });

  test('cada história pede o passado em duas falas', () => {
    assert.equal(CONTOS.length, 4);
    const ids = new Set(CONTOS.map(c => c.id));
    assert.equal(ids.size, CONTOS.length);
    for (const conto of CONTOS) {
      assert.equal(conto.rodadas.length, 2, conto.id);
      for (const rodada of conto.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, conto.id);
        assert.equal(avaliarConto(rodada, rodada.melhor).ok, true, rodada.melhor);
      }
    }
    const trem = CONTOS[0].rodadas[0];
    assert.equal(avaliarConto(trem, 'I will miss the train tomorrow.').ok, false);
  });

  test('números, datas e preços escondem a frase nas opções', () => {
    assert.equal(NUMEROS.length, 8);
    for (const item of NUMEROS) {
      assert.ok(item.certa >= 0 && item.certa < item.opcoes.length, item.id);
      assert.equal(item.opcoes.includes(item.fala), false, item.id);
      assert.ok(item.pergunta, item.id);
      assert.ok(item.dica, item.id);
    }
    const certas = new Set(NUMEROS.map(item => item.certa));
    assert.ok(certas.size > 1);
  });
});

describe('agenda dos deslizes', () => {
  test('um erro de qualquer modo entra hoje e uma palavra só não entra', () => {
    registrarTecnico({
      xp: 10,
      nota: 0,
      acertos: 0,
      respostas: 1,
      perfeita: false,
      comboMax: 0,
      errosFala: [{ en: 'Yesterday I fixed the login.', pt: 'Diga que ontem você corrigiu o login.' }]
    });
    registrarTecnico({
      xp: 0,
      nota: 0,
      acertos: 0,
      respostas: 1,
      perfeita: false,
      comboMax: 0,
      errosFala: [{ en: 'Login', pt: 'uma palavra' }]
    });
    const fila = deslizesVencidos();
    assert.equal(fila.length, 1);
    assert.equal(fila[0].en, 'Yesterday I fixed the login.');
    assert.equal(fila[0].proxima, '2026-10-28');
    assert.equal(fila[0].n, 1);
    assert.equal(avaliarDeslize(fila[0], 'Yesterday I fixed the login.').ok, true);
    assert.equal(avaliarDeslize(fila[0], '').ok, false);
  });

  test('acertar empurra a data e errar de novo traz para hoje', () => {
    registrarTecnico({
      xp: 10, nota: 0, acertos: 0, respostas: 1, perfeita: false, comboMax: 0,
      errosFala: [{ en: 'Yesterday I fixed the login.', pt: 'Diga que ontem você corrigiu o login.' }]
    });
    const foi = revisarDeslize('Yesterday I fixed the login.', true);
    assert.equal(foi.caixa, 1);
    assert.equal(foi.proxima, '2026-10-29');
    assert.equal(deslizesVencidos().length, 0);
    const deNovo = revisarDeslize('Yesterday I fixed the login.', true);
    assert.equal(deNovo.caixa, 2);
    assert.equal(deNovo.proxima, '2026-10-31');
    registrarTecnico({
      xp: 10, nota: 0, acertos: 0, respostas: 1, perfeita: false, comboMax: 0,
      errosFala: [{ en: 'Yesterday I fixed the login.', pt: 'Diga que ontem você corrigiu o login.' }]
    });
    const volta = estado.agendaFala['Yesterday I fixed the login.'];
    assert.equal(volta.proxima, '2026-10-28');
    assert.equal(volta.caixa, 1);
    const errou = revisarDeslize('Yesterday I fixed the login.', false);
    assert.equal(errou.proxima, '2026-10-29');
    assert.equal(errou.caixa, 0);
  });

  test('a revisão não conta como diálogo e a nuvem fica com a data mais cedo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'deslize1', valor: 0, pago: false }] };
    registrarTecnico({
      xp: 10, nota: 0, acertos: 0, respostas: 1, perfeita: false, comboMax: 0,
      errosFala: [{ en: 'Yesterday I fixed the login.', pt: 'A missão.' }]
    });
    revisarDeslize('Yesterday I fixed the login.', false);
    const ev = registrarDeslize({
      xp: 8, nota: 0, acertos: 0, respostas: 1, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.revisoesFala, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('volta'));
    assert.equal(ev.bonusMissoes, 15);
    assert.equal(estado.agendaFala['Yesterday I fixed the login.'].proxima, '2026-10-29');
    mesclarEstado({
      agendaFala: {
        'Yesterday I fixed the login.': { caixa: 3, proxima: '2026-10-28', pt: '' }
      }
    });
    assert.equal(estado.agendaFala['Yesterday I fixed the login.'].proxima, '2026-10-28');
    assert.equal(estado.agendaFala['Yesterday I fixed the login.'].caixa, 0);
    importarEstado({ xp: 0, licoes: {}, agendaFala: { Login: { caixa: 9, proxima: 'nunca' } } }, 'substituir');
    assert.deepEqual(estado.agendaFala, {});
  });

  test('entrevista, história e números não viram diálogo', () => {
    const entrevista = registrarEntrevista({
      xp: 16, nota: 50, acertos: 1, respostas: 6, perfeita: false, comboMax: 0
    });
    assert.equal(estado.stats.entrevistas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('remoto'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(entrevista.bonusMissoes, 0);
    registrarConto({ xp: 18, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0 });
    assert.ok(estado.badges.includes('conto'));
    registrarNumero({
      xp: 14, nota: 50, acertos: 1, respostas: 4, perfeita: false, comboMax: 0,
      errosFala: [{ en: 'The coffee is fifteen dollars.', pt: 'Quanto custa o café?' }]
    });
    assert.ok(estado.badges.includes('preco'));
    assert.equal(deslizesVencidos()[0].pt, 'Quanto custa o café?');
    assert.equal(estado.stats.dialogos, 0);
  });

  test('o módulo novo não usa travessão', () => {
    const arquivo = readFileSync(new URL('../js/ensaio.js', import.meta.url), 'utf8');
    assert.equal(arquivo.includes('\u2014'), false);
    assert.equal(arquivo.includes('\u2013'), false);
  });
});
