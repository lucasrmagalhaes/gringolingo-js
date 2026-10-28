import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';

const { gerarEscuta, temFala } = await import('../js/exercises.js');

describe('gerarEscuta', () => {
  test('sem microfone, toda rodada é ouvir e escrever', () => {
    assert.equal(temFala, false);
    const itens = [
      { en: 'hello', pt: 'olá' },
      { en: 'good morning', pt: 'bom dia' }
    ];
    const fila = gerarEscuta(itens, 4);
    assert.equal(fila.length, 4);
    fila.forEach(ex => {
      assert.equal(ex.tipo, 'digitar');
      assert.equal(ex.soAudio, true);
      assert.ok(itens.some(i => i.en === ex.item.en));
    });
  });

  test('lista vazia não gera rodada', () => {
    assert.deepEqual(gerarEscuta([], 6), []);
  });
});
