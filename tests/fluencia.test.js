import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ITENS_NIVEL, nivelDoTeste, corrigirIndice, contarAcertos, preferirNivel, montarSessao,
  PERGUNTAS, avaliarPergunta,
  REDUCOES,
  FRASAIS, avaliarFrasal,
  TEMAS, avaliarLivre,
  diasDaSemana, resumoSemana, sugestaoSemana
} = await import('../js/fluencia.js');
const {
  estado, limparEstadoMemoria, definirAgora, registrarNivel, registrarPergunta,
  registrarLivre, mesclarEstado, importarEstado, streakAtual, errosMaisComuns
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);

beforeEach(() => {
  definirAgora(dia);
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

describe('teste de nível', () => {
  test('oito perguntas, duas por faixa, com a certa dentro das opções', () => {
    assert.equal(ITENS_NIVEL.length, 8);
    for (const faixa of ['A1', 'A2', 'B1', 'B2']) {
      assert.equal(ITENS_NIVEL.filter(i => i.nivel === faixa).length, 2, faixa);
    }
    for (const item of ITENS_NIVEL) {
      assert.ok(item.certa >= 0 && item.certa < item.opcoes.length, item.id);
      assert.equal(corrigirIndice(item, item.certa), true, item.id);
    }
  });

  test('a escada para em A1, A2, B1 ou B2', () => {
    assert.equal(nivelDoTeste({ A1: 1, A2: 2, B1: 2, B2: 2 }), 'A1');
    assert.equal(nivelDoTeste({ A1: 2, A2: 1, B1: 2, B2: 2 }), 'A2');
    assert.equal(nivelDoTeste({ A1: 2, A2: 2, B1: 1, B2: 2 }), 'B1');
    assert.equal(nivelDoTeste({ A1: 2, A2: 2, B1: 2, B2: 0 }), 'B1');
    assert.equal(nivelDoTeste({ A1: 2, A2: 2, B1: 2, B2: 1 }), 'B2');
    const todas = contarAcertos(ITENS_NIVEL.map(i => ({ nivel: i.nivel, ok: true })));
    assert.equal(nivelDoTeste(todas), 'B2');
  });

  test('o primeiro teste grava o nível e a repetição pode baixar sem novo XP', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'nivel1', valor: 0, pago: false }] };
    const ev = registrarNivel({
      nivel: 'A2', xp: 25, nota: 75, acertos: 6, respostas: 8, perfeita: false, comboMax: 0
    });
    assert.equal(estado.nivelFala, 'A2');
    assert.ok(estado.badges.includes('nivelado'));
    assert.equal(streakAtual(), 1);
    assert.equal(estado.painel['2026-10-28'].n, 1);
    assert.equal(ev.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.xp, 40);
    const xp = estado.xp;
    const deNovo = registrarNivel({
      nivel: 'A1', xp: 25, nota: 40, acertos: 2, respostas: 8, perfeita: false, comboMax: 0
    });
    assert.equal(estado.nivelFala, 'A1');
    assert.equal(estado.xp, xp);
    assert.equal(deNovo.bonusMissoes, 0);
    assert.ok(estado.badges.includes('nivelado'));
    assert.equal(estado.painel['2026-10-28'].n, 1);
  });

  test('a nuvem só sobe o nível e um valor inválido vira nulo', () => {
    estado.nivelFala = 'A1';
    mesclarEstado({ nivelFala: 'B2' });
    assert.equal(estado.nivelFala, 'B2');
    mesclarEstado({ nivelFala: 'A2' });
    assert.equal(estado.nivelFala, 'B2');
    importarEstado({ xp: 0, licoes: {}, nivelFala: 'C2' }, 'substituir');
    assert.equal(estado.nivelFala, null);
  });

  test('sem nível a ordem original fica; com nível o igual vem primeiro', () => {
    const lista = [{ id: 'a', nivel: 'A1' }, { id: 'b', nivel: 'B2' }, { id: 'c', nivel: 'A2' }];
    assert.deepEqual(preferirNivel(lista, null).map(i => i.id), ['a', 'b', 'c']);
    assert.deepEqual(preferirNivel(lista, 'A2').map(i => i.id), ['c', 'a', 'b']);
    assert.equal(montarSessao(lista, 'B2', 2).length, 2);
    assert.equal(montarSessao(lista, 'B2', 2)[0].id, 'b');
  });
});

describe('perguntas e fala livre', () => {
  test('quatro cenas pedem uma pergunta de verdade', () => {
    assert.equal(PERGUNTAS.length, 4);
    assert.ok(PERGUNTAS.every(c => !IDS_CINCO.includes(c.id)));
    for (const cena of PERGUNTAS) {
      assert.equal(cena.rodadas.length, 2, cena.id);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.ok(rodada.melhor.endsWith('?'), rodada.melhor);
        assert.ok(rodada.missao, cena.id);
      }
    }
    const cafe = PERGUNTAS[0].rodadas[0];
    assert.equal(avaliarPergunta(cafe, 'Can I see the menu?').ok, true);
    assert.equal(avaliarPergunta(cafe, 'I want a coffee').ok, false);
  });

  test('uma cena de pergunta não conta como diálogo', () => {
    const ev = registrarPergunta({
      xp: 18,
      nota: 50,
      acertos: 1,
      respostas: 2,
      perfeita: false,
      comboMax: 0,
      errosFala: [{ en: 'Can I see the menu?', pt: 'Pergunte pelo cardápio.' }]
    });
    assert.equal(estado.stats.perguntas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.ramos, 0);
    assert.ok(estado.badges.includes('pergunta'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(errosMaisComuns(1)[0].en, 'Can I see the menu?');
    assert.equal(ev.perfeita, undefined);
  });

  test('a fala livre olha tamanho, pista e ligação', () => {
    const tema = TEMAS.find(t => t.id === 'eu');
    const vazio = avaliarLivre(tema, '');
    assert.ok(vazio.nota < 60);
    assert.equal(vazio.ok, false);
    const ana = avaliarLivre(tema, 'My name is Ana and I live in Sao Paulo. I like music.');
    assert.ok(ana.nota >= 60);
    assert.equal(ana.ok, true);
    assert.ok(ana.pistas.includes('my name is'));
    const semPista = avaliarLivre(tema, 'Hello there friend today and tomorrow.');
    assert.ok(semPista.faltas.some(f => f.includes('pista')));
  });

  test('sem nota o painel não ganha um zero inventado', () => {
    registrarLivre({ xp: 8, acertos: 0, respostas: 1, perfeita: false, comboMax: 0 });
    assert.equal(estado.stats.livres, 1);
    assert.equal(estado.painel['2026-10-28'], undefined);
    registrarLivre({ xp: 8, nota: 0, acertos: 0, respostas: 1, perfeita: false, comboMax: 0 });
    assert.equal(estado.painel['2026-10-28'].n, 1);
    assert.equal(estado.painel['2026-10-28'].soma, 0);
  });
});

describe('reduções, phrasal verbs e resumo', () => {
  test('gonna esconde a frase cheia na primeira opção', () => {
    assert.ok(REDUCOES.length >= 6);
    const gonna = REDUCOES.find(r => r.id === 'gonna');
    assert.match(gonna.opcoes[0], /going to/);
    assert.equal(corrigirIndice(gonna, 0), true);
    assert.equal(corrigirIndice(gonna, 1), false);
    assert.ok(REDUCOES.some(r => r.id === 'cuppa'));
  });

  test('phrasal e colocação aceitam o exemplo', () => {
    assert.ok(FRASAIS.length >= 8);
    const look = FRASAIS.find(f => f.id === 'look-for');
    assert.equal(avaliarFrasal(look, 'I am looking for the gate.').ok, true);
    const prazo = FRASAIS.find(f => f.nivel === 'B2' && f.tipo === 'colocacao');
    assert.ok(prazo);
    assert.equal(avaliarFrasal(prazo, prazo.melhor).ok, true);
  });

  test('a semana começa na segunda e ignora o dia futuro', () => {
    assert.deepEqual(diasDaSemana('2026-10-28'), [
      '2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31', '2026-11-01'
    ]);
    const resumo = resumoSemana({
      '2026-10-28': { soma: 80, n: 1, acertos: 1, respostas: 2 },
      '2026-10-29': { soma: 500, n: 5, acertos: 5, respostas: 5 }
    }, '2026-10-28');
    assert.equal(resumo.dias.length, 7);
    assert.equal(resumo.dias[2].media, 80);
    assert.equal(resumo.dias[3].n, 0);
    assert.equal(resumo.dias[3].media, null);
    assert.equal(resumo.treinos, 1);
    assert.equal(resumo.media, 80);
  });

  test('a sugestão segue a ordem do que ainda falta', () => {
    assert.match(sugestaoSemana({}), /teste de nível/);
    assert.match(sugestaoSemana({ nivel: 'A2' }), /pergunta/);
    assert.match(sugestaoSemana({ nivel: 'A2', perguntas: 1 }), /gonna/);
    assert.match(sugestaoSemana({ nivel: 'A2', perguntas: 1, reduzidas: 1 }), /minuto/);
    assert.match(sugestaoSemana({ nivel: 'A2', perguntas: 1, reduzidas: 1, livres: 1, media: 40 }), /cena curta/);
    assert.match(sugestaoSemana({ nivel: 'A2', perguntas: 1, reduzidas: 1, livres: 1, media: 80 }), /phrasal/);
    assert.match(sugestaoSemana({
      nivel: 'B1', perguntas: 1, reduzidas: 1, livres: 1, verbos: 1, media: 90
    }), /acima/);
  });

  test('o módulo novo não usa travessão', () => {
    const arquivo = readFileSync(new URL('../js/fluencia.js', import.meta.url), 'utf8');
    assert.equal(arquivo.includes('\u2014'), false);
    assert.equal(arquivo.includes('\u2013'), false);
  });
});
