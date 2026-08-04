import test, { describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';
import { limparArmazenamento, hojeIso, diasIso } from './ambiente.js';

const jogo = await import('../js/game.js');
const { UNIDADES, NIVEIS } = await import('../js/data.js');

const { estado, mesclarEstado, itensVencidos, nivelInfo, resetarEstado, limparEstadoMemoria, contaLocal, definirContaLocal, streakAtual } = jogo;

const licaoBase = UNIDADES[0].licoes[0];

beforeEach(() => {
  limparEstadoMemoria();
  limparArmazenamento();
});

describe('mesclarEstado: streak por ultimoDia', () => {
  test('sem dia local, adota o dia e o streak do remoto', () => {
    mesclarEstado({ ultimoDia: '2026-01-10', streak: 5 });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 5);
  });

  test('sem dia local e sem streak remoto, zera o streak', () => {
    estado.streak = 9;
    mesclarEstado({ ultimoDia: '2026-01-10' });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 0);
  });

  test('remoto mais novo e consecutivo soma um dia ao streak local', () => {
    estado.ultimoDia = '2026-01-09';
    estado.streak = 4;
    mesclarEstado({ ultimoDia: '2026-01-10', streak: 2 });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 5);
  });

  test('remoto mais novo e consecutivo ainda respeita um streak remoto maior', () => {
    estado.ultimoDia = '2026-01-09';
    estado.streak = 4;
    mesclarEstado({ ultimoDia: '2026-01-10', streak: 20 });
    assert.equal(estado.streak, 20);
  });

  test('remoto mais novo com buraco no meio descarta o streak local', () => {
    estado.ultimoDia = '2026-01-01';
    estado.streak = 9;
    mesclarEstado({ ultimoDia: '2026-01-10', streak: 3 });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 3);
  });

  test('mesmo dia nos dois lados fica com o maior streak', () => {
    estado.ultimoDia = '2026-01-10';
    estado.streak = 2;
    mesclarEstado({ ultimoDia: '2026-01-10', streak: 7 });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 7);
  });

  test('remoto mais antigo e consecutivo soma um dia ao streak remoto', () => {
    estado.ultimoDia = '2026-01-10';
    estado.streak = 1;
    mesclarEstado({ ultimoDia: '2026-01-09', streak: 6 });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 7);
  });

  test('remoto mais antigo com buraco no meio mantém o streak local', () => {
    estado.ultimoDia = '2026-01-10';
    estado.streak = 3;
    mesclarEstado({ ultimoDia: '2026-01-01', streak: 8 });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 3);
  });

  test('a virada de mês conta como dia consecutivo', () => {
    estado.ultimoDia = '2026-01-31';
    estado.streak = 2;
    mesclarEstado({ ultimoDia: '2026-02-01', streak: 0 });
    assert.equal(estado.ultimoDia, '2026-02-01');
    assert.equal(estado.streak, 3);
  });

  test('remoto sem ultimoDia não mexe no streak local', () => {
    estado.ultimoDia = '2026-01-10';
    estado.streak = 4;
    mesclarEstado({ xp: 500 });
    assert.equal(estado.ultimoDia, '2026-01-10');
    assert.equal(estado.streak, 4);
  });
});

describe('mesclarEstado: demais campos', () => {
  test('fica com o maior xp dos dois lados', () => {
    estado.xp = 100;
    mesclarEstado({ xp: 50 });
    assert.equal(estado.xp, 100);
    mesclarEstado({ xp: 300 });
    assert.equal(estado.xp, 300);
  });

  test('remoto sem xp não zera o local', () => {
    estado.xp = 80;
    mesclarEstado({});
    assert.equal(estado.xp, 80);
  });

  test('fica com o maior número de estrelas por lição e preserva as só locais', () => {
    estado.licoes = { b1: { estrelas: 3 }, b9: { estrelas: 1 } };
    mesclarEstado({ licoes: { b1: { estrelas: 1 }, b2: { estrelas: 2 } } });
    assert.deepEqual(estado.licoes, { b1: { estrelas: 3 }, b9: { estrelas: 1 }, b2: { estrelas: 2 } });
  });

  test('une as badges sem repetir', () => {
    estado.badges = ['primeira', 'combo5'];
    mesclarEstado({ badges: ['combo5', 'xp100'] });
    assert.deepEqual(estado.badges, ['primeira', 'combo5', 'xp100']);
  });

  test('une os erros por inglês, mantendo o português local', () => {
    estado.erros = [{ en: 'shower', pt: 'chuveiro' }];
    mesclarEstado({ erros: [{ en: 'shower', pt: 'outro texto' }, { en: 'bye', pt: 'tchau' }, { en: 'sem-pt' }, { pt: 'sem en' }, null] });
    assert.deepEqual(estado.erros, [
      { en: 'shower', pt: 'chuveiro' },
      { en: 'bye', pt: 'tchau' },
      { en: 'sem-pt', pt: '' }
    ]);
  });

  test('erro novo entra na fila de revisão para hoje', () => {
    mesclarEstado({ erros: [{ en: 'bye', pt: 'tchau' }] });
    assert.deepEqual(estado.itens.bye, { caixa: 0, proxima: hojeIso() });
  });

  test('fica com o maior valor de cada estatística', () => {
    estado.stats.licoes = 5;
    estado.stats.acertos = 10;
    mesclarEstado({ stats: { licoes: 2, acertos: 50, inventada: 999 } });
    assert.equal(estado.stats.licoes, 5);
    assert.equal(estado.stats.acertos, 50);
    assert.equal(estado.stats.inventada, undefined);
  });

  test('fica com o maior xp de cada dia do histórico', () => {
    estado.historico = { '2026-01-01': 10 };
    mesclarEstado({ historico: { '2026-01-01': 5, '2026-01-02': 40 } });
    assert.deepEqual(estado.historico, { '2026-01-01': 10, '2026-01-02': 40 });
  });

  test('fica com o maior número de protetores', () => {
    estado.protetores = 1;
    mesclarEstado({ protetores: 2 });
    assert.equal(estado.protetores, 2);
    mesclarEstado({ protetores: 0 });
    assert.equal(estado.protetores, 2);
  });

  test('só adota a meta remota enquanto não houver lição feita', () => {
    mesclarEstado({ meta: 80 });
    assert.equal(estado.meta, 80);
    estado.stats.licoes = 3;
    mesclarEstado({ meta: 20 });
    assert.equal(estado.meta, 80);
  });

  test('sem remoto ainda grava o estado local', () => {
    estado.xp = 42;
    mesclarEstado(null);
    assert.equal(JSON.parse(localStorage.getItem('gringolingo')).xp, 42);
  });
});

describe('mesclarEstado: agenda dos itens (merge conservador)', () => {
  test('adota item que só existe no remoto', () => {
    mesclarEstado({ itens: { hello: { caixa: 3, proxima: '2026-05-20' } } });
    assert.deepEqual(estado.itens.hello, { caixa: 3, proxima: '2026-05-20' });
  });

  test('item remoto sem caixa entra na caixa 0', () => {
    mesclarEstado({ itens: { hello: { proxima: '2026-05-20' } } });
    assert.deepEqual(estado.itens.hello, { caixa: 0, proxima: '2026-05-20' });
  });

  test('ignora item remoto sem data de revisão', () => {
    mesclarEstado({ itens: { hello: { caixa: 4 } } });
    assert.equal(estado.itens.hello, undefined);
  });

  test('mantém a menor caixa e a data mais cedo', () => {
    estado.itens = { hello: { caixa: 3, proxima: '2026-05-10' } };
    mesclarEstado({ itens: { hello: { caixa: 1, proxima: '2026-05-20' } } });
    assert.deepEqual(estado.itens.hello, { caixa: 1, proxima: '2026-05-10' });
  });

  test('a data mais cedo pode vir do remoto sem levar a caixa junto', () => {
    estado.itens = { hello: { caixa: 1, proxima: '2026-05-20' } };
    mesclarEstado({ itens: { hello: { caixa: 4, proxima: '2026-05-01' } } });
    assert.deepEqual(estado.itens.hello, { caixa: 1, proxima: '2026-05-01' });
  });

  test('não mexe em item que só existe localmente', () => {
    estado.itens = { bye: { caixa: 2, proxima: '2026-05-10' } };
    mesclarEstado({ itens: { hello: { caixa: 0, proxima: '2026-05-01' } } });
    assert.deepEqual(estado.itens.bye, { caixa: 2, proxima: '2026-05-10' });
  });
});

describe('itensVencidos', () => {
  beforeEach(() => {
    assert.ok(licaoBase.itens.length >= 4, 'a lição de referência ficou pequena demais');
    estado.licoes[licaoBase.id] = { estrelas: 3 };
  });

  test('só devolve itens de lições já feitas', () => {
    estado.licoes = {};
    assert.deepEqual(itensVencidos(), []);
  });

  test('ordena por data de revisão, joga os sem agenda para o fim e tira os futuros', () => {
    const itens = licaoBase.itens;
    estado.itens = {
      [itens[0].en]: { caixa: 2, proxima: diasIso(-1) },
      [itens[1].en]: { caixa: 0, proxima: hojeIso() },
      [itens[2].en]: { caixa: 1, proxima: diasIso(1) }
    };
    const esperado = [itens[0].en, itens[1].en, ...itens.slice(3).map(i => i.en)];
    assert.deepEqual(itensVencidos().map(i => i.en), esperado);
  });

  test('empate na data desempata pela caixa menor', () => {
    const itens = licaoBase.itens;
    estado.itens = {
      [itens[0].en]: { caixa: 5, proxima: diasIso(-2) },
      [itens[1].en]: { caixa: 1, proxima: diasIso(-2) }
    };
    const vencidos = itensVencidos().map(i => i.en);
    assert.equal(vencidos[0], itens[1].en);
    assert.equal(vencidos[1], itens[0].en);
  });

  test('item agendado para o futuro fica de fora', () => {
    const itens = licaoBase.itens;
    estado.itens = Object.fromEntries(itens.map(i => [i.en, { caixa: 3, proxima: diasIso(7) }]));
    assert.deepEqual(itensVencidos(), []);
  });
});

describe('nivelInfo', () => {
  test('começa no primeiro nível', () => {
    estado.xp = 0;
    const info = nivelInfo();
    assert.equal(info.numero, 1);
    assert.equal(info.titulo, NIVEIS[0].titulo);
    assert.equal(info.emoji, NIVEIS[0].emoji);
    assert.deepEqual(info.prox, NIVEIS[1]);
    assert.equal(info.progresso, 0);
  });

  test('um xp abaixo do próximo nível ainda é o nível anterior', () => {
    estado.xp = NIVEIS[1].xp - 1;
    assert.equal(nivelInfo().numero, 1);
  });

  test('sobe de nível exatamente no xp do nível', () => {
    estado.xp = NIVEIS[1].xp;
    const info = nivelInfo();
    assert.equal(info.numero, 2);
    assert.equal(info.titulo, NIVEIS[1].titulo);
    assert.equal(info.progresso, 0);
  });

  test('progresso é a fração até o próximo nível', () => {
    const faixa = NIVEIS[2].xp - NIVEIS[1].xp;
    estado.xp = NIVEIS[1].xp + Math.floor(faixa / 2);
    const info = nivelInfo();
    assert.equal(info.numero, 2);
    assert.ok(Math.abs(info.progresso - 0.5) < 0.02, `progresso ${info.progresso}`);
  });

  test('no último nível não há próximo e o progresso é cheio', () => {
    estado.xp = NIVEIS.at(-1).xp + 5000;
    const info = nivelInfo();
    assert.equal(info.numero, NIVEIS.length);
    assert.equal(info.prox, null);
    assert.equal(info.progresso, 1);
  });
});

describe('streakAtual', () => {
  test('vale o streak salvo quando o último dia é hoje', () => {
    estado.ultimoDia = hojeIso();
    estado.streak = 6;
    assert.equal(streakAtual(), 6);
  });

  test('vale o streak salvo quando o último dia é ontem', () => {
    estado.ultimoDia = diasIso(-1);
    estado.streak = 6;
    assert.equal(streakAtual(), 6);
  });

  test('zera quando o último dia é mais antigo', () => {
    estado.ultimoDia = diasIso(-2);
    estado.streak = 6;
    assert.equal(streakAtual(), 0);
  });
});

describe('limpeza de estado', () => {
  test('limparEstadoMemoria volta ao padrão sem apagar o que já foi salvo', () => {
    estado.xp = 250;
    estado.badges = ['primeira'];
    estado.itens = { hello: { caixa: 2, proxima: '2026-05-10' } };
    mesclarEstado(null);

    limparEstadoMemoria();

    assert.equal(estado.xp, 0);
    assert.equal(estado.streak, 0);
    assert.equal(estado.ultimoDia, null);
    assert.deepEqual(estado.badges, []);
    assert.deepEqual(estado.itens, {});
    assert.deepEqual(estado.erros, []);
    assert.deepEqual(estado.licoes, {});
    assert.equal(estado.meta, 30);
    assert.equal(estado.protetores, 1);
    assert.deepEqual(estado.stats, { licoes: 0, acertos: 0, respostas: 0, comboMax: 0, revisoes: 0, perfeitas: 0 });
    assert.equal(JSON.parse(localStorage.getItem('gringolingo')).xp, 250);
  });

  test('resetarEstado apaga o progresso salvo e a conta local', () => {
    estado.xp = 250;
    mesclarEstado(null);
    definirContaLocal('conta-123');
    assert.equal(contaLocal(), 'conta-123');
    assert.ok(localStorage.getItem('gringolingo'));

    resetarEstado();

    assert.equal(localStorage.getItem('gringolingo'), null);
    assert.equal(contaLocal(), null);
    assert.equal(estado.xp, 0);
    assert.deepEqual(estado.licoes, {});
  });

  test('definirContaLocal sem id remove a conta', () => {
    definirContaLocal('conta-123');
    definirContaLocal(null);
    assert.equal(contaLocal(), null);
  });

  test('estado limpo continua sendo o mesmo objeto exportado', () => {
    const antes = estado;
    estado.xp = 10;
    limparEstadoMemoria();
    assert.equal(antes, estado);
    assert.equal(estado.xp, 0);
  });
});
