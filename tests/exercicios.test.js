import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';

const { diffPalavras, gerarExercicios, exercicioFacil } = await import('../js/exercises.js');
const { UNIDADES } = await import('../js/data.js');

const TIPOS_CONHECIDOS = ['escolhaEnPt', 'escolhaPtEn', 'ouvir', 'ouvirPt', 'lacuna', 'digitar', 'falar', 'montar', 'ditado', 'pares'];

const todosItens = UNIDADES.flatMap(u => u.licoes.flatMap(l => l.itens));
const primeiraLicao = UNIDADES[0].licoes[0];
const poolPrimeiraUnidade = UNIDADES[0].licoes.flatMap(l => l.itens);
const palavras = primeiraLicao.itens.filter(i => !i.en.includes(' '));

const faltantes = r => r.certa.filter(p => p.falta).map(p => p.palavra);
const sobrando = r => r.dada.filter(p => p.sobra).map(p => p.palavra);

function comAleatorio(valor, fn) {
  const original = Math.random;
  Math.random = () => valor;
  try {
    return fn();
  } finally {
    Math.random = original;
  }
}

describe('diffPalavras', () => {
  test('resposta igual não marca nada', () => {
    const r = diffPalavras('I have a cat', 'I have a cat');
    assert.deepEqual(faltantes(r), []);
    assert.deepEqual(sobrando(r), []);
    assert.equal(r.certa.length, 4);
    assert.equal(r.dada.length, 4);
  });

  test('faltou uma palavra', () => {
    const r = diffPalavras('I have cat', 'I have a cat');
    assert.deepEqual(faltantes(r), ['a']);
    assert.deepEqual(sobrando(r), []);
  });

  test('sobrou uma palavra', () => {
    const r = diffPalavras('I have a big cat', 'I have a cat');
    assert.deepEqual(faltantes(r), []);
    assert.deepEqual(sobrando(r), ['big']);
  });

  test('trocou uma palavra marca falta e sobra', () => {
    const r = diffPalavras('I have a dog', 'I have a cat');
    assert.deepEqual(faltantes(r), ['cat']);
    assert.deepEqual(sobrando(r), ['dog']);
  });

  test('tudo diferente marca todas as palavras', () => {
    const r = diffPalavras('banana split', 'hello world');
    assert.deepEqual(faltantes(r), ['hello', 'world']);
    assert.deepEqual(sobrando(r), ['banana', 'split']);
  });

  test('resposta vazia deixa toda a certa faltando', () => {
    const r = diffPalavras('   ', 'good morning');
    assert.deepEqual(r.dada, []);
    assert.deepEqual(faltantes(r), ['good', 'morning']);
  });

  test('ignora pontuação e caixa mas devolve o texto original', () => {
    const r = diffPalavras('Hello,  WORLD!', 'hello world');
    assert.deepEqual(faltantes(r), []);
    assert.deepEqual(sobrando(r), []);
    assert.deepEqual(r.dada.map(p => p.palavra), ['Hello,', 'WORLD!']);
  });

  test('ordem trocada casa só o que dá para alinhar', () => {
    const r = diffPalavras('cat the', 'the cat');
    assert.deepEqual(faltantes(r), ['cat']);
    assert.deepEqual(sobrando(r), ['cat']);
  });

  test('não expande contrações (a comparação é palavra a palavra)', () => {
    const r = diffPalavras("I'm fine", 'I am fine');
    assert.deepEqual(faltantes(r), ['I', 'am']);
    assert.deepEqual(sobrando(r), ["I'm"]);
  });
});

describe('gerarExercicios', () => {
  test('devolve exatamente a quantidade pedida', () => {
    [1, 2, 3, 4, 8, 12, 20].forEach(qtd => {
      for (let i = 0; i < 20; i++) {
        assert.equal(gerarExercicios(palavras, poolPrimeiraUnidade, qtd).length, qtd, `qtd ${qtd}`);
      }
    });
  });

  test('usa 8 como quantidade padrão', () => {
    assert.equal(gerarExercicios(palavras, poolPrimeiraUnidade).length, 8);
  });

  test('repete os itens quando pedem mais exercícios do que itens', () => {
    const exs = gerarExercicios(palavras.slice(0, 2), poolPrimeiraUnidade, 3);
    assert.equal(exs.length, 3);
    exs.forEach(ex => assert.ok(palavras.slice(0, 2).includes(ex.item)));
  });

  test('só gera tipos conhecidos e sempre com um item da lição', () => {
    for (let i = 0; i < 40; i++) {
      gerarExercicios(palavras, poolPrimeiraUnidade, 12).forEach(ex => {
        assert.ok(TIPOS_CONHECIDOS.includes(ex.tipo), `tipo inesperado: ${ex.tipo}`);
        if (ex.tipo !== 'pares') assert.ok(palavras.includes(ex.item));
      });
    }
  });

  test('inclui um exercício de pares na posição 4 quando há itens suficientes', () => {
    const exs = gerarExercicios(palavras, poolPrimeiraUnidade, 8);
    const pares = exs.filter(ex => ex.tipo === 'pares');
    assert.equal(pares.length, 1);
    assert.equal(exs[3].tipo, 'pares');
    assert.equal(exs[3].pares.length, 4);
    assert.equal(new Set(exs[3].pares.map(p => p.en)).size, 4);
    exs[3].pares.forEach(p => assert.ok(palavras.includes(p)));
  });

  test('não inclui pares com menos de 4 itens', () => {
    const exs = gerarExercicios(palavras.slice(0, 3), poolPrimeiraUnidade, 6);
    assert.equal(exs.length, 6);
    assert.equal(exs.filter(ex => ex.tipo === 'pares').length, 0);
  });

  test('não inclui pares quando a quantidade pedida é menor que 4', () => {
    for (let i = 0; i < 20; i++) {
      const exs = gerarExercicios(palavras, poolPrimeiraUnidade, 3);
      assert.equal(exs.filter(ex => ex.tipo === 'pares').length, 0);
    }
  });

  test('lição com frases também respeita a quantidade e os tipos', () => {
    for (let i = 0; i < 50; i++) {
      const exs = gerarExercicios(primeiraLicao.itens, poolPrimeiraUnidade, 12);
      assert.equal(exs.length, 12);
      exs.forEach(ex => {
        assert.ok(TIPOS_CONHECIDOS.includes(ex.tipo), `tipo inesperado: ${ex.tipo}`);
        if (ex.tipo !== 'pares') assert.ok(primeiraLicao.itens.includes(ex.item));
      });
    }
  });

  test('exercício de lacuna esconde uma palavra da própria frase e a oferece entre as opções', () => {
    const frases = todosItens.filter(i => i.en.includes(' '));
    const lacunas = [];
    for (let i = 0; i < 60; i++) {
      gerarExercicios(frases.slice(0, 8), frases, 12)
        .filter(ex => ex.tipo === 'lacuna')
        .forEach(ex => lacunas.push(ex));
    }
    assert.ok(lacunas.length > 0, 'nenhum exercício de lacuna foi gerado');
    lacunas.forEach(ex => {
      assert.ok(ex.palavras.includes(ex.alvo));
      assert.ok(ex.opcoes.includes(ex.alvo));
      assert.ok(ex.opcoes.length <= 4);
      assert.equal(new Set(ex.opcoes).size, ex.opcoes.length);
    });
  });

  test('exercício de montar frase traz as palavras da frase mais 3 distratores', () => {
    const frase = todosItens.find(i => i.en === 'I need to clean my bedroom');
    const exs = comAleatorio(0, () => gerarExercicios([frase], todosItens, 3));
    assert.equal(exs.length, 3);
    exs.forEach(ex => {
      assert.equal(ex.tipo, 'montar');
      const esperadas = frase.en.split(' ');
      esperadas.forEach(p => assert.ok(ex.tiles.includes(p), `faltou a peça ${p}`));
      assert.equal(ex.tiles.length, esperadas.length + 3);
    });
  });
});

describe('distratores', () => {
  test('a resposta certa sempre está entre as opções, sem repetir', () => {
    for (let i = 0; i < 200; i++) {
      const item = todosItens[i % todosItens.length];
      const ex = exercicioFacil(item, todosItens);
      const certa = ex.tipo === 'escolhaEnPt' ? item.pt : item.en;
      assert.ok(ex.opcoes.includes(certa));
      assert.ok(ex.opcoes.length <= 4);
      assert.equal(new Set(ex.opcoes).size, ex.opcoes.length);
    }
  });

  test("'take a shower' nunca recebe 'shower' (nem o pt dele) como opção", () => {
    const item = todosItens.find(i => i.en === 'take a shower');
    assert.ok(item, 'item de referência sumiu do data.js');
    assert.ok(todosItens.some(i => i.en === 'shower'), 'o item substring sumiu do data.js');
    for (let i = 0; i < 300; i++) {
      const ex = exercicioFacil(item, todosItens);
      assert.ok(!ex.opcoes.includes('shower'), 'vazou a substring em inglês');
      assert.ok(!ex.opcoes.includes('chuveiro'), 'vazou o par da substring em português');
    }
  });

  test('nenhuma opção é substring da resposta certa (nem o contrário)', () => {
    const pool = [
      { en: 'take a shower', pt: 'tomar banho' },
      { en: 'shower', pt: 'chuveiro' },
      { en: 'take', pt: 'pegar' },
      { en: 'a shower', pt: 'um banho' },
      { en: 'read a book', pt: 'ler um livro' },
      { en: 'drive a car', pt: 'dirigir um carro' },
      { en: 'watch tv', pt: 'assistir tv' },
      { en: 'go to work', pt: 'ir trabalhar' }
    ];
    const item = pool[0];
    for (let i = 0; i < 300; i++) {
      const ex = exercicioFacil(item, pool);
      const campo = ex.tipo === 'escolhaEnPt' ? 'pt' : 'en';
      const alvo = item[campo];
      ex.opcoes
        .filter(op => op !== alvo)
        .forEach(op => {
          assert.ok(!alvo.includes(op), `opção "${op}" é substring de "${alvo}"`);
          assert.ok(!op.includes(alvo), `"${alvo}" é substring da opção "${op}"`);
          const outro = pool.find(p => p[campo] === op);
          assert.ok(!item.en.includes(outro.en) && !outro.en.includes(item.en), `o inglês de "${op}" colide com "${item.en}"`);
        });
    }
  });

  test('a contração conta como a forma expandida na hora de excluir', () => {
    const pool = [
      { en: "I don't understand", pt: 'eu não entendo' },
      { en: 'do not understand', pt: 'não entendo' },
      { en: 'good morning', pt: 'bom dia' },
      { en: 'see you later', pt: 'até mais tarde' },
      { en: 'no problem', pt: 'sem problema' }
    ];
    for (let i = 0; i < 200; i++) {
      const ex = exercicioFacil(pool[0], pool);
      assert.ok(!ex.opcoes.includes('do not understand'), 'a forma expandida vazou como distrator');
    }
  });
});
