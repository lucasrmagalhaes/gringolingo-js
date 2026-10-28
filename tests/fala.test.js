import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { CENAS_RAMO } = await import('../js/cenas.js');
const {
  cenarioPorId, avaliarEscolha, noDaCena, rodadasDo, IDS_CINCO
} = await import('../js/conversa.js');
const {
  SONS, CLIPS, montarItem, corrigirClip, serieFala, resumoFala
} = await import('../js/pronuncia.js');
const {
  estado, limparEstadoMemoria, definirAgora, registrarDialogo, registrarPronuncia,
  registrarOuvido, errosMaisComuns, mesclarEstado, importarEstado, streakAtual
} = await import('../js/game.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);

beforeEach(() => {
  definirAgora(dia);
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

function andar(cena, indice) {
  let id = cena.inicio;
  const visitados = [];
  for (let passo = 0; passo < 8; passo++) {
    const no = cena.nos[id];
    assert.ok(no, `${cena.id}/${id}`);
    visitados.push(id);
    const op = no.opcoes[Math.min(indice, no.opcoes.length - 1)];
    assert.ok(op.melhor && op.dica && op.rotulo, op.id);
    assert.ok(op.aceitas.length >= 2, op.id);
    if (op.segue == null) return visitados;
    assert.ok(cena.nos[op.segue], `${cena.id} segue ${op.segue}`);
    id = op.segue;
  }
  assert.fail(`${cena.id} não fechou em 8 turnos`);
}

describe('cenas com caminhos', () => {
  test('cinco cenas novas bifurcam e fecham nos dois lados', () => {
    assert.deepEqual(CENAS_RAMO.map(c => c.id), ['medico', 'aeroporto', 'compras', 'telefone', 'reuniao']);
    for (const cena of CENAS_RAMO) {
      assert.equal(cena.ramo, true);
      assert.ok(cena.nos[cena.inicio], cena.id);
      assert.equal(cena.nos[cena.inicio].opcoes.length, 2, cena.id);
      assert.equal(rodadasDo(cena).length, 0, cena.id);
      for (const no of Object.values(cena.nos)) {
        for (const op of no.opcoes) {
          assert.ok(op.segue == null || cena.nos[op.segue], `${cena.id}/${op.id}`);
        }
      }
      const esquerda = andar(cena, 0);
      const direita = andar(cena, 1);
      assert.ok(esquerda.length >= 3, cena.id);
      assert.ok(direita.length >= 3, cena.id);
    }
  });

  test('a escolha certa segue o ramo e a errada também', () => {
    const chega = noDaCena(cenarioPorId('medico'), 'chega');
    const dor = chega.opcoes.find(o => o.id === 'dor');
    const certo = avaliarEscolha(dor, 'I have a headache.');
    assert.equal(certo.ok, true);
    assert.equal(certo.segue, 'tempo');
    const errado = avaliarEscolha(dor, 'hello');
    assert.equal(errado.ok, false);
    assert.equal(errado.segue, 'tempo');
    assert.equal(errado.melhor, 'I have a headache.');
  });

  test('o texto novo não usa travessão', () => {
    for (const nome of ['cenas.js', 'pronuncia.js']) {
      const arquivo = readFileSync(new URL(`../js/${nome}`, import.meta.url), 'utf8');
      assert.equal(arquivo.includes('\u2014'), false, nome);
      assert.equal(arquivo.includes('\u2013'), false, nome);
    }
  });
});

describe('pronúncia e escuta', () => {
  test('quatro sons, cada um com pares que a voz consegue separar', () => {
    assert.deepEqual(SONS.map(s => s.id), ['th', 'ed', 'vogal', 'acento']);
    for (const som of SONS) {
      assert.ok(som.dica, som.id);
      assert.ok(som.pares.length >= 4, som.id);
      for (const par of som.pares) {
        assert.notEqual(par.falaA, par.falaB);
        assert.ok(par.dica, par.a);
        assert.equal(montarItem(par, 'a').certo, 'a');
        assert.equal(montarItem(par, 'a').fala, par.falaA);
        assert.equal(montarItem(par, 'b').certo, 'b');
        assert.equal(montarItem(par, 'b').fala, par.falaB);
      }
    }
  });

  test('cada clipe tem uma resposta e a velocidade é só um número', () => {
    assert.ok(CLIPS.length >= 6);
    for (const clip of CLIPS) {
      assert.ok(clip.linhas.length >= 1, clip.id);
      assert.equal(clip.opcoes.length, 3, clip.id);
      assert.ok(clip.certa >= 0 && clip.certa < clip.opcoes.length, clip.id);
      assert.equal(corrigirClip(clip, clip.certa), true);
      assert.equal(corrigirClip(clip, clip.certa === 0 ? 1 : 0), false);
      assert.match(clip.pergunta, /[áàâãéêíóôõúç?]/i);
    }
  });

  test('a semana de fala ignora dia vazio e tira a média', () => {
    const serie = serieFala({
      '2026-10-27': { soma: 50, n: 1, acertos: 1, respostas: 2 },
      '2026-10-28': { soma: 160, n: 2, acertos: 3, respostas: 4 },
      'lixo': { soma: 100, n: 1, acertos: 1, respostas: 1 }
    }, '2026-10-28');
    assert.equal(serie.length, 7);
    assert.equal(serie[6].data, '2026-10-28');
    assert.equal(serie[6].media, 80);
    assert.equal(serie[0].media, null);
    const resumo = resumoFala(serie);
    assert.equal(resumo.dias, 2);
    assert.equal(resumo.treinos, 3);
    assert.equal(resumo.media, 70);
    assert.equal(resumo.precisao, 67);
    assert.equal(resumo.acertos, 4);
    assert.equal(resumo.respostas, 6);
  });
});

describe('painel da fala no progresso', () => {
  test('pronúncia e escuta contam streak, painel e conquista sem virar diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'pronuncia1', valor: 0, pago: false }] };
    const ev = registrarPronuncia({
      xp: 20,
      acertos: 3,
      respostas: 4,
      nota: 75,
      perfeita: false,
      comboMax: 0,
      errosFala: [{ en: 'think', pt: 'TH' }]
    });
    assert.equal(estado.stats.pronuncias, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.escutas, 0);
    assert.equal(estado.stats.ouvidos, 0);
    assert.equal(streakAtual(), 1);
    assert.ok(estado.badges.includes('pares'));
    assert.equal(estado.painel['2026-10-28'].n, 1);
    assert.equal(estado.painel['2026-10-28'].soma, 75);
    assert.equal(errosMaisComuns(5)[0].en, 'think');
    assert.equal(ev.bonusMissoes, 15);
    assert.equal(estado.xp, 35);
    registrarPronuncia({ xp: 1, acertos: 0, respostas: 1, perfeita: false, comboMax: 0 });
    assert.equal(estado.painel['2026-10-28'].n, 1);
    registrarOuvido({ xp: 8, acertos: 1, respostas: 1, nota: 100, perfeita: false, comboMax: 0 });
    assert.equal(estado.stats.ouvidos, 1);
    assert.equal(estado.stats.pronuncias, 2);
    assert.equal(estado.painel['2026-10-28'].n, 2);
    assert.equal(estado.painel['2026-10-28'].soma, 175);
  });

  test('cena com caminho não libera as cinco cenas originais', () => {
    const ev = registrarDialogo({
      id: 'medico',
      ramo: true,
      nota: 80,
      acertos: 2,
      respostas: 3,
      xp: 20,
      perfeita: false,
      comboMax: 0,
      errosFala: [{ en: 'I have a headache.', pt: 'dor' }]
    });
    assert.equal(estado.stats.ramos, 1);
    assert.equal(estado.stats.dialogos, 1);
    assert.ok(estado.badges.includes('caminhos'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.errosFala[0].n, 1);
    registrarDialogo({
      id: 'medico',
      ramo: true,
      nota: 40,
      acertos: 1,
      respostas: 3,
      xp: 10,
      errosFala: [{ en: 'I have a headache.', pt: 'dor' }]
    });
    assert.equal(estado.errosFala.find(e => e.en === 'I have a headache.').n, 2);
    assert.equal(ev.badges.some(b => b.id === 'ator'), false);
    limparEstadoMemoria();
    for (const id of IDS_CINCO) {
      registrarDialogo({ id, nota: 90, acertos: 2, respostas: 2, xp: 5, perfeita: false, comboMax: 0 });
    }
    assert.ok(estado.badges.includes('ator'));
    assert.equal(estado.stats.ramos, 0);
  });

  test('o merge fica com o dia mais cheio e com o erro de maior contagem', () => {
    registrarPronuncia({ xp: 5, acertos: 1, respostas: 1, nota: 60, perfeita: false, comboMax: 0, errosFala: [{ en: 'think', pt: 'TH' }] });
    registrarPronuncia({ xp: 5, acertos: 1, respostas: 1, nota: 60, perfeita: false, comboMax: 0, errosFala: [{ en: 'think', pt: 'TH' }] });
    assert.equal(estado.painel['2026-10-28'].n, 2);
    mesclarEstado({
      xp: 0,
      licoes: {},
      painel: { '2026-10-28': { soma: 300, n: 4, acertos: 4, respostas: 4 }, 'ontem': { soma: 1, n: 9 } },
      errosFala: [{ en: 'think', pt: 'TH', n: 5 }, { en: 'ship', pt: 'vogal', n: 1 }]
    });
    assert.equal(estado.painel['2026-10-28'].n, 4);
    assert.equal(estado.painel['2026-10-28'].soma, 300);
    assert.equal(estado.painel.ontem, undefined);
    assert.equal(estado.errosFala.find(e => e.en === 'think').n, 5);
    assert.equal(estado.errosFala.find(e => e.en === 'ship').n, 1);
    importarEstado({
      xp: 0,
      licoes: {},
      painel: { 'nao-e-data': { soma: 10, n: 1, acertos: 1, respostas: 1 } },
      errosFala: [{ en: '__proto__', pt: 'x', n: 4 }]
    }, 'substituir');
    assert.deepEqual(estado.painel, {});
    assert.deepEqual(estado.errosFala, []);
  });
});
