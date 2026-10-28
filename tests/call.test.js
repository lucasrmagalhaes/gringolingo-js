import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RELATOS, avaliarRelato,
  CORTESIAS, avaliarCortesia,
  AQUECIMENTOS, avaliarAquecer,
  CLAROS, avaliarClaro
} = await import('../js/call.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRelato, registrarCortesia, registrarAquecer, registrarClaro
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS } = await import('../js/ensaio.js');
const { OPINIOES, CENAS_FALA } = await import('../js/opiniao.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const ocupados = new Set([
  ...IDS_CINCO,
  ...CENAS_TECNICAS.map(c => c.id),
  ENTREVISTA.id,
  ...CONTOS.map(c => c.id),
  ...OPINIOES.map(c => c.id),
  ...CENAS_FALA.map(c => c.id)
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

describe('fala na call', () => {
  test('cada relato tem reproduzir, causa e correção, fora das cenas antigas', () => {
    assert.equal(RELATOS.length, 3);
    const ids = RELATOS.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const cena of RELATOS) {
      assert.equal(ocupados.has(cena.id), false, cena.id);
      assert.deepEqual(cena.rodadas.map(r => r.etapa), ['Reproduzir', 'Causa', 'Correção']);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.equal(avaliarRelato(rodada, rodada.melhor).ok, true, rodada.melhor);
      }
    }
    const primeira = RELATOS[0].rodadas[0];
    assert.equal(avaliarRelato(primeira, 'To reproduce it, open login and wait.').ok, true);
    assert.equal(avaliarRelato(primeira, 'The weather is nice.').ok, false);
  });

  test('o review pede um comentário e uma resposta educada', () => {
    assert.equal(CORTESIAS.length, 3);
    for (const cena of CORTESIAS) {
      assert.equal(ocupados.has(cena.id), false, cena.id);
      assert.deepEqual(cena.rodadas.map(r => r.etapa), ['Dar', 'Receber']);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.equal(avaliarCortesia(rodada, rodada.melhor).ok, true, rodada.melhor);
      }
    }
    const receber = CORTESIAS[0].rodadas[1];
    assert.equal(avaliarCortesia(receber, 'Thanks for the catch. I will rename it.').ok, true);
  });

  test('o papo de antes da reunião cobre fim de semana, clima e viagem', () => {
    assert.deepEqual(AQUECIMENTOS.map(c => c.id), ['fim', 'clima', 'viagem']);
    for (const cena of AQUECIMENTOS) {
      assert.equal(cena.rodadas.length, 2, cena.id);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.equal(avaliarAquecer(rodada, rodada.melhor).ok, true, rodada.melhor);
      }
    }
    assert.equal(avaliarAquecer(AQUECIMENTOS[0].rodadas[0], 'I had a quiet weekend.').ok, true);
    assert.equal(avaliarAquecer(AQUECIMENTOS[0].rodadas[1], 'How was yours?').ok, true);
  });

  test('esclarecer esconde o modelo até a tentativa', () => {
    assert.equal(CLAROS.length, 8);
    const ids = CLAROS.map(item => item.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const item of CLAROS) {
      assert.ok(item.aceitas.length >= 2, item.id);
      assert.ok(item.pt, item.id);
      assert.equal(avaliarClaro(item, item.melhor).ok, true, item.melhor);
      const vazio = avaliarClaro(item, '');
      assert.equal(vazio.ok, false, item.id);
      assert.equal(vazio.melhor, item.melhor);
    }
    const rephrase = CLAROS.find(item => item.id === 'rephrase');
    assert.equal(avaliarClaro(rephrase, 'Could you rephrase that?').ok, true);
    const dizer = CLAROS.find(item => item.id === 'dizer');
    assert.equal(avaliarClaro(dizer, "So what you're saying is the login fails.").ok, true);
  });

  test('relato, review, papo e esclarecer não viram diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'relato1', valor: 0, pago: false }] };
    const relato = registrarRelato({
      xp: 26, nota: 80, acertos: 2, respostas: 3, perfeita: false, comboMax: 0
    });
    assert.equal(estado.stats.relatos, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.tecnicos, 0);
    assert.ok(estado.badges.includes('relato'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(relato.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarCortesia({ xp: 18, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0 });
    assert.ok(estado.badges.includes('cortesia'));
    registrarAquecer({ xp: 18, nota: 50, acertos: 1, respostas: 2, perfeita: false, comboMax: 0 });
    assert.ok(estado.badges.includes('aquecer'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'claro1', valor: 0, pago: false }] };
    const claro = registrarClaro({
      xp: 12, nota: 50, acertos: 1, respostas: 4, perfeita: false, comboMax: 0
    });
    assert.equal(estado.stats.esclarecimentos, 1);
    assert.ok(estado.badges.includes('claro'));
    assert.equal(claro.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);
  });

  test('o atalho de pular conteúdo existe e o módulo novo não usa travessão', () => {
    semTravessao('../js/call.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const html = readFileSync(join(raiz, 'index.html'), 'utf8');
    assert.match(html, /<a class="pular" href="#app">Pular para o conteúdo<\/a>/);
    assert.match(html, /<main id="app" tabindex="-1">/);
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(css, /\.pular:focus/);
    assert.equal(html.includes('Pular para o conteúdo'), true);
  });
});
