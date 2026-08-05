// O dia do app é o dia LOCAL do aparelho. Este arquivo fixa o fuso de São
// Paulo (UTC-3) porque era exatamente nele que o bug morava: com o dia em UTC,
// streak, missões e histórico viravam às 21h.
process.env.TZ = 'America/Sao_Paulo';

import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const jogo = await import('../js/game.js');
const { estado, registrarLicao, limparEstadoMemoria, definirAgora, missoesDeHoje, streakAtual, semanaAtual } = jogo;

const licao = extra => ({
  estrelas: 2, xp: 30, comboMax: 2, errosItens: [], perfeita: false,
  acertos: 5, respostas: 8, agendamentos: [], ...extra
});

// Datas construídas por componentes LOCAIS: 21h de São Paulo é 0h UTC do dia
// seguinte — o cenário que fazia o app virar o dia mais cedo.
const local = (ano, mes, dia, hora, min) => new Date(ano, mes - 1, dia, hora, min);

beforeEach(() => {
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

describe('virada do dia no fuso local', () => {
  test('20h59 e 21h01 do mesmo dia local são o MESMO dia (não +1 de streak)', () => {
    definirAgora(() => local(2026, 3, 10, 20, 59));
    registrarLicao('b1', licao());
    definirAgora(() => local(2026, 3, 10, 21, 1));
    registrarLicao('b2', licao());
    assert.equal(estado.streak, 1);
    assert.equal(estado.ultimoDia, '2026-03-10');
    assert.deepEqual(Object.keys(estado.historico), ['2026-03-10']);
    assert.equal(estado.historico['2026-03-10'], 60);
  });

  test('23h59 e 00h01 são dias diferentes e somam streak', () => {
    definirAgora(() => local(2026, 3, 10, 23, 59));
    registrarLicao('b1', licao());
    definirAgora(() => local(2026, 3, 11, 0, 1));
    registrarLicao('b2', licao());
    assert.equal(estado.streak, 2);
    assert.equal(estado.ultimoDia, '2026-03-11');
  });

  test('missões do dia não rotacionam às 21h', () => {
    definirAgora(() => local(2026, 3, 10, 20, 50));
    missoesDeHoje();
    estado.missoes.progresso[0].valor = 14;
    definirAgora(() => local(2026, 3, 10, 21, 10));
    missoesDeHoje();
    assert.equal(estado.missoes.dia, '2026-03-10');
    assert.equal(estado.missoes.progresso[0].valor, 14, 'o progresso do dia não pode sumir às 21h');
  });

  test('pular um dia com protetor mantém o streak e gasta o protetor', () => {
    definirAgora(() => local(2026, 3, 10, 12, 0));
    registrarLicao('b1', licao());
    assert.equal(estado.streak, 1);
    estado.protetores = 1;
    estado.protetoresGastos = 0;
    definirAgora(() => local(2026, 3, 12, 12, 0));
    const evento = registrarLicao('b2', licao());
    assert.equal(estado.streak, 2);
    assert.equal(evento.usouProtetor, true);
    assert.equal(estado.protetores, 0);
    assert.equal(estado.protetoresGastos, 1);
  });

  test('relógio que volta no tempo não zera o streak', () => {
    definirAgora(() => local(2026, 3, 10, 12, 0));
    registrarLicao('b1', licao());
    definirAgora(() => local(2026, 3, 9, 12, 0));
    registrarLicao('b2', licao());
    assert.equal(estado.streak, 1);
    assert.equal(estado.ultimoDia, '2026-03-10');
  });

  test('streakAtual respeita o dia local', () => {
    definirAgora(() => local(2026, 3, 10, 23, 50));
    registrarLicao('b1', licao());
    definirAgora(() => local(2026, 3, 11, 21, 30));
    assert.equal(streakAtual(), 1, 'ontem local ainda vale');
    definirAgora(() => local(2026, 3, 12, 21, 30));
    assert.equal(streakAtual(), 0, 'dois dias depois o streak exibido zera');
  });

  test('semanaAtual começa na segunda-feira local', () => {
    definirAgora(() => local(2026, 3, 11, 21, 30)); // quarta-feira à noite
    const semana = semanaAtual();
    assert.equal(semana.length, 7);
    assert.equal(semana[0].data, '2026-03-09', 'segunda-feira');
    assert.equal(semana[2].data, '2026-03-11');
    assert.equal(semana[2].hoje, true, 'às 21h30 ainda é hoje');
  });
});
