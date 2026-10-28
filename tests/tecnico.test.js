import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CENAS_TECNICAS, avaliarTecnico,
  IDIOMAS, avaliarIdioma,
  PERGUNTAS_DIA, indiceDoDia, perguntaDoDia, avaliarDia
} = await import('../js/tecnico.js');
const { podeGravar, urlDaGravacao, soltarUrl, LIMITE_GRAVACAO_MS } = await import('../js/voz.js');
const {
  estado, limparEstadoMemoria, definirAgora, registrarTecnico, registrarIdioma,
  registrarPerguntaDia, mesclarEstado, importarEstado, errosMaisComuns
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);

beforeEach(() => {
  definirAgora(dia);
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => definirAgora(null));

describe('inglês de trabalho', () => {
  test('cinco cenas novas, duas falas cada, fora das cinco originais', () => {
    assert.equal(CENAS_TECNICAS.length, 5);
    const ids = CENAS_TECNICAS.map(c => c.id);
    assert.deepEqual(ids, ['standup', 'bug', 'review', 'vaga', 'demo']);
    assert.ok(ids.every(id => !IDS_CINCO.includes(id)));
    for (const cena of CENAS_TECNICAS) {
      assert.equal(cena.rodadas.length, 2, cena.id);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.ok(rodada.melhor, cena.id);
        assert.ok(rodada.missao, cena.id);
        assert.ok(rodada.npc.en && rodada.npc.pt, cena.id);
      }
    }
  });

  test('o standup aceita o login e recusa uma frase qualquer', () => {
    const rodada = CENAS_TECNICAS[0].rodadas[0];
    assert.equal(avaliarTecnico(rodada, 'Yesterday I fixed the login.').ok, true);
    assert.equal(avaliarTecnico(rodada, 'I fixed the login yesterday.').ok, true);
    assert.equal(avaliarTecnico(rodada, 'The weather is nice today.').ok, false);
  });

  test('a cena de trabalho não conta como diálogo e paga a missão', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'tecnico1', valor: 0, pago: false }] };
    const ev = registrarTecnico({
      xp: 18,
      nota: 50,
      acertos: 1,
      respostas: 2,
      perfeita: false,
      comboMax: 0,
      errosFala: [{ en: 'Yesterday I fixed the login.', pt: 'Diga que ontem você corrigiu o login.' }]
    });
    assert.equal(estado.stats.tecnicos, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.ramos, 0);
    assert.ok(estado.badges.includes('standup'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(errosMaisComuns(1)[0].en, 'Yesterday I fixed the login.');
    assert.equal(ev.bonusMissoes, 15);
    assert.equal(estado.xp, 33);
    assert.equal(estado.painel['2026-10-28'].n, 1);
  });
});

describe('idioms e pergunta do dia', () => {
  test('o baralho cobre a call e aceita a fruta baixa', () => {
    assert.ok(IDIOMAS.length >= 8);
    assert.ok(IDIOMAS.some(item => item.id === 'touch-base'));
    assert.ok(IDIOMAS.some(item => item.nivel === 'B2'));
    const toque = IDIOMAS.find(item => item.id === 'touch-base');
    assert.equal(avaliarIdioma(toque, "Let's touch base tomorrow.").ok, true);
    const fruta = IDIOMAS.find(item => item.id === 'fruit');
    assert.equal(avaliarIdioma(fruta, fruta.melhor).ok, true);
    assert.equal(avaliarIdioma(fruta, 'The meeting is cancelled.').ok, false);
  });

  test('um idiom não vira diálogo e abre a conquista da call', () => {
    const ev = registrarIdioma({
      xp: 14,
      nota: 100,
      acertos: 1,
      respostas: 1,
      perfeita: false,
      comboMax: 0
    });
    assert.equal(estado.stats.idiomas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('reuniao'));
    assert.equal(ev.bonusMissoes, 0);
  });

  test('a pergunta do dia é estável e tem uma segunda rodada', () => {
    assert.equal(PERGUNTAS_DIA.length, 8);
    assert.equal(indiceDoDia('', 0), 0);
    const a = perguntaDoDia('2026-10-28');
    const b = perguntaDoDia('2026-10-28');
    assert.equal(a, b);
    assert.equal(a.rodadas.length, 2);
    assert.ok(a.rodadas[1].missao);
    assert.equal(avaliarDia(a.rodadas[0], a.rodadas[0].melhor).ok, true);
    assert.notEqual(indiceDoDia('2026-10-28', 8), indiceDoDia('2026-10-01', 8));
  });

  test('a data da pergunta só anda para frente e um texto inválido some', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'dia1', valor: 0, pago: false }] };
    const ev = registrarPerguntaDia({
      xp: 18, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0
    });
    assert.equal(estado.perguntaDia, '2026-10-28');
    assert.equal(estado.stats.diasPergunta, 1);
    assert.ok(estado.badges.includes('doDia'));
    assert.equal(ev.bonusMissoes, 15);
    registrarPerguntaDia({
      xp: 10, nota: 0, acertos: 0, respostas: 2, perfeita: false, comboMax: 0
    });
    assert.equal(estado.perguntaDia, '2026-10-28');
    assert.equal(estado.stats.diasPergunta, 2);
    mesclarEstado({ perguntaDia: '2026-10-27' });
    assert.equal(estado.perguntaDia, '2026-10-28');
    mesclarEstado({ perguntaDia: '2026-11-02' });
    assert.equal(estado.perguntaDia, '2026-11-02');
    importarEstado({ xp: 0, licoes: {}, perguntaDia: 'ontem' }, 'substituir');
    assert.equal(estado.perguntaDia, null);
  });
});

describe('voz local', () => {
  test('sem microfone no Node e a URL da gravação pode ser solta', () => {
    assert.equal(LIMITE_GRAVACAO_MS, 8000);
    assert.equal(podeGravar(), false);
    const criadas = [];
    const soltas = [];
    const escopo = {
      MediaRecorder: function MediaRecorder() {},
      navigator: { mediaDevices: { getUserMedia() {} } },
      URL: {
        createObjectURL(blob) {
          criadas.push(blob);
          return 'blob:voz';
        },
        revokeObjectURL(url) { soltas.push(url); }
      }
    };
    assert.equal(podeGravar(escopo), true);
    assert.equal(urlDaGravacao(null, escopo), null);
    assert.equal(urlDaGravacao({ size: 4 }, escopo), 'blob:voz');
    assert.equal(soltarUrl('blob:voz', escopo), null);
    assert.deepEqual(soltas, ['blob:voz']);
    assert.equal(criadas.length, 1);
  });

  test('os módulos novos não usam travessão', () => {
    for (const nome of ['../js/tecnico.js', '../js/voz.js']) {
      const arquivo = readFileSync(new URL(nome, import.meta.url), 'utf8');
      assert.equal(arquivo.includes('\u2014'), false, nome);
      assert.equal(arquivo.includes('\u2013'), false, nome);
    }
  });
});
