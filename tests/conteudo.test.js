import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';

const { UNIDADES, NIVEIS, BADGES, MISSOES, HISTORIAS, VERBOS, SUJEITOS } = await import('../js/data.js');

const todosItens = UNIDADES.flatMap(u => u.licoes.flatMap(l => l.itens));

describe('integridade do conteúdo', () => {
  test('NIVEIS têm XP estritamente crescente (a barra de nível divide pela diferença)', () => {
    for (let i = 1; i < NIVEIS.length; i++) {
      assert.ok(NIVEIS[i].xp > NIVEIS[i - 1].xp, `nível ${i} (${NIVEIS[i].xp}) não cresce sobre ${NIVEIS[i - 1].xp}`);
    }
  });

  test('nenhum en duplicado entre os itens do curso', () => {
    const vistos = new Set();
    for (const item of todosItens) {
      assert.ok(!vistos.has(item.en), `en duplicado: ${item.en}`);
      vistos.add(item.en);
    }
  });

  test('ids de badges e missões são únicos', () => {
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
    assert.equal(new Set(MISSOES.map(m => m.id)).size, MISSOES.length);
    MISSOES.forEach(m => assert.equal(typeof m.medir, 'function'));
  });

  test('toda fala do jogador nas histórias existe na unidade da história ou numa anterior', () => {
    HISTORIAS.forEach(historia => {
      const idx = UNIDADES.findIndex(u => u.id === historia.unidade);
      assert.ok(idx >= 0, `história aponta para unidade inexistente: ${historia.unidade}`);
      const disponiveis = new Set(UNIDADES.slice(0, idx + 1).flatMap(u => u.licoes.flatMap(l => l.itens.map(i => i.en))));
      historia.falas.filter(f => f.de === 'voce').forEach(f => {
        assert.ok(disponiveis.has(f.en), `fala "${f.en}" (${historia.titulo}) não existe até a unidade ${historia.unidade}`);
      });
    });
  });

  test('verbos têm as quatro formas e sujeitos têm a marca de terceira pessoa', () => {
    VERBOS.forEach(v => {
      assert.ok(v.en && v.en3 && v.pt && v.pt3, `verbo incompleto: ${JSON.stringify(v)}`);
    });
    SUJEITOS.forEach(s => {
      assert.equal(typeof s.terceira, 'boolean', `sujeito sem terceira: ${s.en}`);
    });
  });

  test('alt e evitar apontam para coisas válidas', () => {
    for (const item of todosItens) {
      (item.alt ?? []).forEach(a => {
        assert.ok(typeof a === 'string' && a.length > 0 && a !== item.en, `alt inválido em ${item.en}`);
      });
      (item.evitar ?? []).forEach(e => {
        assert.ok(todosItens.some(o => o.en === e), `evitar de ${item.en} aponta para en inexistente: ${e}`);
      });
    }
  });

  test('dicas de lição têm título e corpo', () => {
    UNIDADES.forEach(u => u.licoes.forEach(l => {
      if (!l.dica) return;
      assert.ok(l.dica.titulo?.length > 0 && l.dica.corpo?.length > 10, `dica rasa em ${l.id}`);
    }));
  });
});
