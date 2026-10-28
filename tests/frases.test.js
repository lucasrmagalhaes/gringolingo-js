import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CATEGORIAS, FRASES, avaliarFrase, escolherSombra, montarDesafioFala, falaConta, xpDaFala, NOTA_FRASE
} = await import('../js/frases.js');
const { FRASES_SOMBRA } = await import('../js/conversa.js');
const {
  estado, limparEstadoMemoria, definirAgora, agendarFrase, frasesVencidas, itensVencidos,
  registrarFala, mesclarEstado, importarEstado, streakAtual, resetarEstado
} = await import('../js/game.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);

beforeEach(() => {
  definirAgora(dia);
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

describe('baralho de frases', () => {
  test('cobre repetir, sentido, tempo, concordar, discordar e interromper', () => {
    assert.deepEqual(CATEGORIAS.map(c => c.id), ['repetir', 'sentido', 'tempo', 'concordar', 'discordar', 'interromper']);
    const ids = new Set();
    const ditas = new Set();
    for (const c of CATEGORIAS) {
      const lista = FRASES.filter(f => f.cat === c.id);
      assert.ok(lista.length >= 4, c.id);
      assert.match(c.exemplo, /[A-Za-z]/);
      for (const f of lista) {
        assert.ok(f.en.includes(' '), f.id);
        assert.ok(f.pt && f.uso, f.id);
        assert.ok(!ids.has(f.id), f.id);
        ids.add(f.id);
        const chave = f.en.toLowerCase();
        assert.ok(!ditas.has(chave), f.en);
        ditas.add(chave);
      }
    }
    assert.ok(FRASES.some(f => f.en === 'Could you repeat that?'));
    assert.ok(FRASES.some(f => f.en === 'What do you mean by that?'));
    assert.ok(FRASES.some(f => f.en === 'Sorry to interrupt.'));
  });

  test('o texto novo não usa travessão', () => {
    const arquivo = readFileSync(new URL('../js/frases.js', import.meta.url), 'utf8');
    assert.equal(arquivo.includes('\u2014'), false);
    assert.equal(arquivo.includes('\u2013'), false);
  });

  test('aceita a frase, a contração e uma alternativa curta', () => {
    const insegura = FRASES.find(f => f.id === 'sentido-3');
    assert.equal(avaliarFrase(insegura, 'I am not sure I understand.').ok, true);
    assert.equal(avaliarFrase(insegura, "I'm not sure I understand").nota, 100);
    const sentido = FRASES.find(f => f.id === 'sentido-1');
    assert.equal(avaliarFrase(sentido, 'What do you mean by this?').ok, true);
    const exata = FRASES.find(f => f.id === 'concordar-3');
    assert.equal(avaliarFrase(exata, 'Exactly').ok, true);
  });

  test('frase errada fica abaixo do corte e devolve o modelo', () => {
    const repetir = FRASES.find(f => f.id === 'repetir-1');
    const ruim = avaliarFrase(repetir, 'hello there');
    assert.equal(ruim.ok, false);
    assert.ok(ruim.nota < NOTA_FRASE);
    assert.equal(ruim.melhor, repetir.en);
    assert.ok(ruim.partes.some(p => !p.ok));
  });
});

describe('sombra com o baralho', () => {
  test('reserva vaga para frase vencida e completa com o banco', () => {
    const vencida = { en: 'Could you repeat that?', pt: 'Você pode repetir isso?' };
    const fila = escolherSombra({
      aprendidas: [{ en: 'hello', pt: 'oi' }, { en: 'where is the station', pt: 'onde fica a estação' }],
      vencidas: [vencida],
      qtd: 5
    });
    assert.equal(fila.length, 5);
    assert.equal(fila[0].en, vencida.en);
    assert.equal(fila.filter(f => f.en === 'hello').length, 0);
    assert.ok(fila.some(f => FRASES_SOMBRA.some(b => b.en === f.en) || f.en === 'where is the station' || FRASES.some(p => p.en === f.en)));
    assert.equal(new Set(fila.map(f => f.en)).size, fila.length);
  });

  test('o baralho sozinho não puxa o banco genérico', () => {
    const fila = escolherSombra({ soBaralho: true, qtd: 4 });
    assert.equal(fila.length, 4);
    assert.ok(fila.every(f => FRASES.some(p => p.en === f.en)));
    assert.equal(fila.some(f => f.en === 'good morning'), false);
  });
});

describe('desafio de 5 minutos', () => {
  test('o mesmo dia mistura diálogo, sombra e frase, sempre igual', () => {
    const a = montarDesafioFala('2026-10-28');
    const b = montarDesafioFala('2026-10-28');
    assert.equal(a.minutos, 5);
    assert.equal(a.duracaoMs, 5 * 60 * 1000);
    assert.deepEqual(a.passos.map(p => p.tipo), b.passos.map(p => p.tipo));
    assert.deepEqual(a.passos.map(p => p.en || p.cenarioId), b.passos.map(p => p.en || p.cenarioId));
    assert.equal(a.passos.filter(p => p.tipo === 'dialogo').length, 1);
    assert.equal(a.passos.filter(p => p.tipo === 'sombra').length, 2);
    assert.equal(a.passos.filter(p => p.tipo === 'frase').length, 2);
    const dialogo = a.passos.find(p => p.tipo === 'dialogo');
    assert.ok(dialogo.npc.en && dialogo.voce.melhor && dialogo.voce.pt);
    const outro = montarDesafioFala('2026-01-02');
    const mesmaOrdem = JSON.stringify(a.passos.map(p => p.en || p.cenarioId)) === JSON.stringify(outro.passos.map(p => p.en || p.cenarioId));
    assert.equal(mesmaOrdem, false);
  });

  test('conta ao terminar, ou no estouro se o mix já saiu', () => {
    const mix = [{ tipo: 'dialogo', ok: true }, { tipo: 'sombra', ok: false }, { tipo: 'frase', ok: true }];
    assert.equal(falaConta([], 5, true), false);
    assert.equal(falaConta(mix, 5, false), false);
    assert.equal(falaConta(mix, 5, true), true);
    assert.equal(falaConta(mix, 3, false), true);
    assert.equal(xpDaFala(mix, true), 3 * 4 + 2 * 6 + 12);
    assert.equal(xpDaFala(mix, false), 3 * 4 + 2 * 6);
  });
});

describe('agenda e progresso da fala', () => {
  test('praticar entra na Leitner e a vencida aparece na revisão', () => {
    assert.equal(agendarFrase('não existe', true), null);
    const frase = FRASES[0];
    const agenda = agendarFrase(frase.en, true);
    assert.equal(agenda.caixa, 0);
    assert.equal(agenda.proxima, '2026-10-29');
    assert.equal(frasesVencidas().length, 0);
    assert.equal(itensVencidos().some(i => i.en === frase.en), false);
    estado.itens[frase.en].proxima = '2026-10-28';
    assert.equal(frasesVencidas()[0].en, frase.en);
    assert.equal(frasesVencidas()[0].pt, frase.pt);
    assert.equal(itensVencidos().some(i => i.en === frase.en), true);
    const subiu = agendarFrase(frase.en, true);
    assert.equal(subiu.caixa, 1);
    assert.equal(subiu.proxima, '2026-10-31');
  });

  test('desafio completo dá XP, sequência e conquista sem contar como diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'fala1', valor: 0, pago: false }] };
    const frase = FRASES[1];
    const ev = registrarFala({
      completo: true,
      xp: 40,
      acertos: 4,
      respostas: 5,
      perfeita: false,
      comboMax: 9,
      agendamentos: [{ en: frase.en, acertou: true }]
    });
    assert.equal(estado.stats.falas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.sombra, 0);
    assert.equal(estado.stats.comboMax, 0);
    assert.equal(estado.falaDia, '2026-10-28');
    assert.equal(streakAtual(), 1);
    assert.ok(estado.badges.includes('cinco'));
    assert.equal(estado.itens[frase.en].caixa, 0);
    assert.equal(ev.bonusMissoes, 15);
    assert.equal(estado.xp, 55);
    assert.equal(registrarFala({ completo: false, xp: 99, acertos: 1, respostas: 1 }), null);
    assert.equal(estado.stats.falas, 1);
    assert.equal(estado.xp, 55);
  });

  test('o merge fica com a data mais nova e o maior total', () => {
    estado.falaDia = '2026-10-01';
    estado.stats.falas = 2;
    mesclarEstado({ falaDia: '2026-10-20', stats: { falas: 1 } });
    assert.equal(estado.falaDia, '2026-10-20');
    assert.equal(estado.stats.falas, 2);
    mesclarEstado({ falaDia: '2026-09-01', stats: { falas: 5 } });
    assert.equal(estado.falaDia, '2026-10-20');
    assert.equal(estado.stats.falas, 5);
    mesclarEstado({ falaDia: 'amanha' });
    assert.equal(estado.falaDia, '2026-10-20');
  });

  test('data inválida não sobrevive ao importar, e zerar limpa o dia', () => {
    importarEstado({ xp: 0, licoes: {}, falaDia: 'nao-e-data', stats: { falas: 3 } }, 'substituir');
    assert.equal(estado.falaDia, null);
    assert.equal(estado.stats.falas, 3);
    estado.falaDia = '2026-10-28';
    resetarEstado();
    assert.equal(estado.falaDia, null);
    assert.equal(estado.stats.falas, 0);
  });
});
