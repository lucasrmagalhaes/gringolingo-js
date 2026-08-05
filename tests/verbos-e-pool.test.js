import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';
import { retornoVazio } from './ambiente.js';

const { gerarVerbos, exercicioFacil, gerarExercicios, montarExercicio } = await import('../js/exercises.js');
const { VERBOS, SUJEITOS } = await import('../js/data.js');

describe('gerarVerbos', () => {
  test('toda geração tem a forma correta entre as opções — inclusive sujeitos de duas palavras', () => {
    for (let rodada = 0; rodada < 50; rodada++) {
      for (const ex of gerarVerbos(VERBOS, SUJEITOS, 10)) {
        assert.ok(ex.opcoes.includes(ex.item.forma), `"${ex.item.en}": forma "${ex.item.forma}" fora de ${JSON.stringify(ex.opcoes)}`);
        assert.equal(ex.opcoes.length, 2, 'sempre as duas formas do verbo');
        assert.equal(ex.item.en, `${ex.item.sujeito} ${ex.item.forma}`, 'sujeito e forma reconstroem a frase');
      }
    }
  });

  test('sujeito de duas palavras aparece inteiro no enunciado', () => {
    const duplos = SUJEITOS.filter(s => s.en.includes(' '));
    assert.ok(duplos.length >= 2, 'o conteúdo tem sujeitos de duas palavras');
    for (let i = 0; i < 200; i++) {
      const ex = gerarVerbos(VERBOS, duplos, 1)[0];
      const visao = montarExercicio(ex, retornoVazio());
      assert.ok(visao.el.textContent.includes(ex.item.sujeito), `enunciado deveria mostrar "${ex.item.sujeito}"`);
    }
  });

  test('marcar a forma certa acerta; a errada erra', () => {
    const ex = gerarVerbos(VERBOS, SUJEITOS, 1)[0];
    const visao = montarExercicio(ex, retornoVazio());
    const botoes = [];
    (function coletar(el) {
      if (el.classList?.contains('opcao')) botoes.push(el);
      el.children.forEach(coletar);
    })(visao.el);
    const certa = botoes.find(b => b.textContent === ex.item.forma);
    certa.click();
    assert.equal(visao.corrigir().correto, true);
  });
});

describe('exercicioFacil com pool pequeno', () => {
  const item = { en: 'hello', pt: 'olá' };

  test('pool vazio cai para digitar em vez de botão único', () => {
    for (let i = 0; i < 20; i++) {
      const ex = exercicioFacil(item, []);
      assert.equal(ex.tipo, 'digitar', 'sem distratores suficientes vira digitar');
    }
  });

  test('pool de um item só também cai para digitar', () => {
    for (let i = 0; i < 20; i++) {
      const ex = exercicioFacil(item, [item, { en: 'water', pt: 'água' }]);
      assert.equal(ex.tipo, 'digitar');
    }
  });

  test('pool grande mantém a múltipla escolha com 4 opções', () => {
    const pool = [item, { en: 'water', pt: 'água' }, { en: 'bread', pt: 'pão' }, { en: 'cheese', pt: 'queijo' }, { en: 'rice', pt: 'arroz' }];
    for (let i = 0; i < 20; i++) {
      const ex = exercicioFacil(item, pool);
      assert.ok(ex.tipo === 'escolhaEnPt' || ex.tipo === 'escolhaPtEn');
      assert.equal(ex.opcoes.length, 4);
    }
  });
});

describe('distratores respeitam sinônimos declarados (evitar)', () => {
  test('hi nunca aparece como alternativa errada de hello', () => {
    const hello = { en: 'hello', pt: 'olá', evitar: ['hi'] };
    const pool = [hello, { en: 'hi', pt: 'oi', evitar: ['hello'] }, { en: 'water', pt: 'água' }, { en: 'bread', pt: 'pão' }, { en: 'cheese', pt: 'queijo' }, { en: 'rice', pt: 'arroz' }];
    for (let i = 0; i < 300; i++) {
      const ex = exercicioFacil(hello, pool);
      assert.ok(!ex.opcoes.includes('hi') && !ex.opcoes.includes('oi'), `hi/oi apareceu em ${JSON.stringify(ex.opcoes)}`);
    }
  });
});

describe('gerarExercicios insere os pares sem engolir exercício', () => {
  test('a fila tem exatamente a quantidade pedida, com pares dentro', () => {
    const itens = [
      { en: 'water', pt: 'água' }, { en: 'bread', pt: 'pão' }, { en: 'cheese', pt: 'queijo' },
      { en: 'rice', pt: 'arroz' }, { en: 'egg', pt: 'ovo' }
    ];
    for (let i = 0; i < 30; i++) {
      const fila = gerarExercicios(itens, itens, 8);
      assert.equal(fila.length, 8);
      assert.equal(fila.filter(e => e.tipo === 'pares').length, 1);
    }
  });

  test('fila dimensionada cobre lições grandes', () => {
    const itens = Array.from({ length: 10 }, (_, i) => ({ en: 'word' + i, pt: 'palavra' + i }));
    const qtd = Math.max(8, Math.ceil(itens.length * 1.2));
    const fila = gerarExercicios(itens, itens, qtd);
    assert.equal(fila.length, qtd);
  });
});
