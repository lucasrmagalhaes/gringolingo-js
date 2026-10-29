import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { buscar, carregarBanco, statusDoItem } = await import('../js/dicionario.js');
const { estado, limparEstadoMemoria, definirAgora } = await import('../js/game.js');

beforeEach(() => {
  limparEstadoMemoria();
  limparArmazenamento();
  definirAgora(null);
});

after(() => definirAgora(null));

describe('dicionário', () => {
  test('vence hoje usa o dia local, não o dia UTC', () => {
    process.env.TZ = 'America/Sao_Paulo';
    const relogio = new Date(2026, 9, 28, 22, 30, 0);
    definirAgora(() => relogio);
    assert.equal(relogio.toISOString().slice(0, 10), '2026-10-29');
    estado.itens.prazo = { caixa: 1, proxima: '2026-10-29', erros: 0 };
    assert.equal(statusDoItem('prazo').id, 'agendada');
    estado.itens.prazo.proxima = '2026-10-28';
    assert.equal(statusDoItem('prazo').id, 'vencida');
    estado.itens.prazo.caixa = 3;
    assert.equal(statusDoItem('prazo').id, 'memoria');
  });

  test('a busca vazia devolve só o curso, em ordem, sem o banco inteiro', async () => {
    await carregarBanco();
    const lista = buscar('');
    assert.equal(lista.length, 60);
    assert.ok(lista.every(v => v.doCurso));
    const nomes = lista.map(v => v.en);
    assert.deepEqual(nomes, [...nomes].sort((a, b) => a.localeCompare(b)));
    const deNovo = buscar('');
    assert.deepEqual(deNovo.map(v => v.en), nomes);
  });

  test('pão e negotiate encontram a palavra certa', async () => {
    await carregarBanco();
    assert.equal(buscar('pão')[0].en, 'bread');
    assert.equal(buscar('pao')[0].en, 'bread');
    const nego = buscar('negotiate');
    assert.equal(nego[0].en, 'negotiate');
    assert.equal(nego[0].doCurso, false);
    assert.equal(buscar('zzzznotaword').length, 0);
  });
});
