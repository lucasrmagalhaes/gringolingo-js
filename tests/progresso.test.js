import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';
import { limparArmazenamento, hojeIso, diasIso } from './ambiente.js';

const jogo = await import('../js/game.js');
const {
  estado, registrarLicao, registrarRevisao, registrarRelampago, mesclarEstado,
  limparEstadoMemoria, definirAgora, missoesDeHoje, streakAtual, INTERVALOS, METAS
} = jogo;

function licaoBasica(extra = {}) {
  return {
    estrelas: 2, xp: 50, comboMax: 3, errosItens: [], perfeita: false,
    acertos: 6, respostas: 8, agendamentos: [], ...extra
  };
}

beforeEach(() => {
  limparEstadoMemoria();
  limparArmazenamento();
  definirAgora(null);
});

after(() => definirAgora(null));

describe('registrarLicao', () => {
  test('soma XP, registra o dia e acumula stats', () => {
    const evento = registrarLicao('b1', licaoBasica());
    // As missões do dia são sorteadas pela data real: o bônus entra na conta
    // para o teste não depender do sorteio de hoje.
    const esperado = 50 + evento.bonusMissoes;
    assert.equal(estado.xp, esperado);
    assert.equal(estado.historico[hojeIso()], esperado);
    assert.equal(estado.stats.licoes, 1);
    assert.equal(estado.stats.acertos, 6);
    assert.equal(estado.stats.respostas, 8);
    assert.equal(estado.licoes.b1.estrelas, 2);
    assert.equal(evento.streakNovo, 1);
  });

  test('estrelas por lição ficam com o máximo entre tentativas', () => {
    registrarLicao('b1', licaoBasica({ estrelas: 3 }));
    registrarLicao('b1', licaoBasica({ estrelas: 1 }));
    assert.equal(estado.licoes.b1.estrelas, 3);
  });

  test('agendamento de acerto sobe caixa; de erro rebaixa uma e traz para amanhã', () => {
    estado.itens.hello = { caixa: 4, proxima: diasIso(30), lapsos: 0 };
    estado.itens.bye = { caixa: 2, proxima: diasIso(5), lapsos: 0 };
    registrarLicao('b1', licaoBasica({
      agendamentos: [{ en: 'hello', acertou: false }, { en: 'bye', acertou: true }, { en: 'water', acertou: true }]
    }));
    assert.deepEqual(estado.itens.hello, { caixa: 3, proxima: diasIso(1), lapsos: 1 });
    assert.deepEqual(estado.itens.bye, { caixa: 3, proxima: diasIso(INTERVALOS[3]), lapsos: 0 });
    assert.deepEqual(estado.itens.water, { caixa: 0, proxima: diasIso(INTERVALOS[0]), lapsos: 0 });
  });

  test('dois erros seguidos zeram a caixa; acerto zera os lapsos', () => {
    estado.itens.hello = { caixa: 4, proxima: diasIso(30), lapsos: 0 };
    registrarLicao('b1', licaoBasica({ agendamentos: [{ en: 'hello', acertou: false }] }));
    registrarLicao('b1', licaoBasica({ agendamentos: [{ en: 'hello', acertou: false }] }));
    assert.equal(estado.itens.hello.caixa, 0);
    assert.equal(estado.itens.hello.lapsos, 2);
    registrarLicao('b1', licaoBasica({ agendamentos: [{ en: 'hello', acertou: true }] }));
    assert.equal(estado.itens.hello.lapsos, 0);
    assert.equal(estado.itens.hello.caixa, 1);
  });

  test('a cada 5 perfeitas ganha protetor, com teto de 2 e contador de ganhos', () => {
    estado.protetores = 0;
    estado.protetoresGanhos = 1;
    estado.protetoresGastos = 1;
    for (let i = 0; i < 5; i++) registrarLicao('b1', licaoBasica({ perfeita: true }));
    assert.equal(estado.protetores, 1);
    assert.equal(estado.protetoresGanhos, 2);
    for (let i = 0; i < 10; i++) registrarLicao('b1', licaoBasica({ perfeita: true }));
    assert.equal(estado.protetores, 2, 'teto de 2 protetores');
    assert.equal(estado.protetoresGanhos, 3, 'no teto o ganho é pulado e o contador não cresce');
  });

  test('conta a meta batida uma única vez por dia', () => {
    estado.meta = METAS[0];
    registrarLicao('b1', licaoBasica({ xp: METAS[0] }));
    registrarLicao('b2', licaoBasica({ xp: METAS[0] }));
    assert.equal(estado.stats.metasBatidas, 1);
  });
});

describe('registrarRevisao e registrarRelampago', () => {
  test('revisão limpa da lista de erros o que foi acertado', () => {
    estado.erros = [{ en: 'hello', pt: 'olá' }, { en: 'bye', pt: 'tchau' }];
    registrarRevisao({ xp: 10, comboMax: 1, perfeita: false, acertos: 1, respostas: 2, agendamentos: [], acertadosEn: ['hello'] });
    assert.deepEqual(estado.erros, [{ en: 'bye', pt: 'tchau' }]);
    assert.equal(estado.stats.revisoes, 1);
  });

  test('relâmpago só conta streak com pelo menos 3 acertos', () => {
    registrarRelampago({ acertos: 0, respostas: 0, comboMax: 0, xp: 0, agendamentos: [] });
    assert.equal(streakAtual(), 0);
    registrarRelampago({ acertos: 3, respostas: 4, comboMax: 2, xp: 6, agendamentos: [] });
    assert.equal(streakAtual(), 1);
  });

  test('relâmpago alimenta a agenda de revisão', () => {
    registrarRelampago({ acertos: 3, respostas: 3, comboMax: 3, xp: 6, agendamentos: [{ en: 'hello', acertou: true }] });
    assert.equal(estado.itens.hello.caixa, 0);
  });
});

describe('merge de missões e protetores', () => {
  test('missão paga em um aparelho não paga bônus de novo no outro', () => {
    const hoje = hojeIso();
    missoesDeHoje();
    const primeira = estado.missoes.progresso[0];
    mesclarEstado({ missoes: { dia: hoje, progresso: [{ id: primeira.id, valor: 99, pago: true }] } });
    assert.equal(estado.missoes.progresso[0].pago, true);
    const xpAntes = estado.xp;
    registrarLicao('b1', licaoBasica({ acertos: 99, respostas: 99, xp: 10, comboMax: 9, perfeita: true }));
    const bonusPago = estado.missoes.progresso.filter(p => p.id === primeira.id && p.pago).length;
    assert.equal(bonusPago, 1);
    assert.ok(estado.xp > xpAntes);
  });

  test('protetor gasto não regenera pelo merge', () => {
    estado.protetores = 1;
    estado.protetoresGanhos = 2;
    estado.protetoresGastos = 1;
    mesclarEstado({ protetores: 2, protetoresGanhos: 2, protetoresGastos: 0 });
    assert.equal(estado.protetores, 1, 'ganhos 2 - gastos 1 = 1');
  });

  test('payload antigo sem contadores entra como ganhos', () => {
    estado.protetores = 0;
    estado.protetoresGanhos = 1;
    estado.protetoresGastos = 1;
    mesclarEstado({ protetores: 2 });
    assert.equal(estado.protetores, 1);
  });
});

describe('blindagem do payload remoto', () => {
  test('xp não numérico não vira NaN', () => {
    estado.xp = 100;
    mesclarEstado({ xp: { hack: true } });
    assert.equal(estado.xp, 100);
    mesclarEstado({ xp: '250' });
    assert.equal(estado.xp, 250);
  });

  test('chave __proto__ não polui o protótipo', () => {
    mesclarEstado({
      licoes: JSON.parse('{"__proto__": {"poluido": true}}'),
      itens: JSON.parse('{"__proto__": {"caixa": 9, "proxima": "2099-01-01"}}'),
      historico: JSON.parse('{"__proto__": 999}')
    });
    assert.equal({}.poluido, undefined);
    assert.equal(Object.prototype.poluido, undefined);
  });

  test('payload de versão futura é recusado com erro claro', () => {
    assert.throws(() => mesclarEstado({ versaoDados: 99, xp: 10 }), /versão mais nova/);
  });

  test('payload da versão atual é aceito', () => {
    mesclarEstado({ versaoDados: 2, xp: 10 });
    assert.equal(estado.xp, 10);
  });
});

describe('correções da revisão adversarial', () => {
  test('streak remoto em string vira número no merge', () => {
    mesclarEstado({ ultimoDia: hojeIso(), streak: '5' });
    assert.equal(estado.streak, 5);
    assert.equal(typeof estado.streak, 'number');
  });

  test('streak remoto com lixo não vira NaN em nenhum ramo', () => {
    estado.ultimoDia = diasIso(-1);
    estado.streak = 3;
    mesclarEstado({ ultimoDia: hojeIso(), streak: 'abc' });
    assert.ok(Number.isFinite(estado.streak), 'streak precisa continuar numérico');
    assert.equal(estado.streak, 4);
  });

  test('caixa remota fora do intervalo é clampada e nunca gera proxima inválida', () => {
    mesclarEstado({ itens: { hello: { caixa: -3, proxima: '2026-01-15' } } });
    assert.equal(estado.itens.hello.caixa, 0);
    mesclarEstado({ itens: { bye: { caixa: 99, proxima: '2026-01-15' } } });
    assert.equal(estado.itens.bye.caixa, 4);
    registrarLicao('b1', licaoBasica({ agendamentos: [{ en: 'hello', acertou: true }] }));
    assert.match(estado.itens.hello.proxima, /^\d{4}-\d{2}-\d{2}$/, 'nada de NaN-NaN-NaN na agenda');
    assert.ok(estado.itens.hello.caixa >= 0 && estado.itens.hello.caixa <= 4);
  });

  test('mesclarDeOutraAba só regrava quando o merge trouxe algo novo', () => {
    const { mesclarDeOutraAba, salvar } = jogo;
    estado.xp = 100;
    salvar();
    const igual = JSON.stringify({ ...JSON.parse(localStorage.getItem('gringolingo')) });
    assert.equal(mesclarDeOutraAba(igual), false, 'conteúdo igual não pode ecoar');
    assert.equal(mesclarDeOutraAba(JSON.stringify({ xp: 250 })), true, 'ganho real regrava');
    assert.equal(estado.xp, 250);
    assert.equal(mesclarDeOutraAba('{{{lixo'), false, 'JSON inválido não quebra');
    assert.equal(mesclarDeOutraAba(JSON.stringify({ versaoDados: 99, xp: 999 })), false, 'versão futura é ignorada sem lançar');
    assert.equal(estado.xp, 250);
  });
});

describe('vocabulário extra não vaza entre contas', () => {
  test('limparEstadoMemoria zera os itens extras', () => {
    const { definirItensExtras, itensAprendidos } = jogo;
    definirItensExtras([{ en: 'able', pt: 'capaz' }]);
    assert.ok(itensAprendidos().some(i => i.en === 'able'));
    limparEstadoMemoria();
    assert.ok(!itensAprendidos().some(i => i.en === 'able'), 'reset precisa derrubar o vocabulário derivado');
  });
});
