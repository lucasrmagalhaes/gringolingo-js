import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';
import { retornoVazio } from './ambiente.js';

const { montarExercicio } = await import('../js/exercises.js');

function buscar(el, classe) {
  if (el.classList?.contains(classe)) return el;
  for (const filho of el.children) {
    const achado = buscar(filho, classe);
    if (achado) return achado;
  }
  return null;
}

function buscarTodos(el, classe, acumulado = []) {
  if (el.classList?.contains(classe)) acumulado.push(el);
  el.children.forEach(f => buscarTodos(f, classe, acumulado));
  return acumulado;
}

function digitar(item, texto) {
  const visao = montarExercicio({ tipo: 'digitar', item }, retornoVazio());
  const entrada = buscar(visao.el, 'entrada');
  entrada.value = texto;
  return { visao, entrada, resultado: visao.corrigir() };
}

describe('digitar: normalização da resposta', () => {
  test('aceita a resposta exata', () => {
    const { resultado } = digitar({ en: 'good morning', pt: 'bom dia' }, 'good morning');
    assert.equal(resultado.correto, true);
    assert.equal(resultado.quase, false);
    assert.equal(resultado.diff, null);
    assert.equal(resultado.certa, 'good morning');
  });

  test('ignora caixa, espaços e pontuação', () => {
    const { resultado } = digitar({ en: 'what is your name?', pt: 'qual é o seu nome?' }, '  What IS   your Name!  ');
    assert.equal(resultado.correto, true);
  });

  test('aceita a contração no lugar da forma expandida', () => {
    const { resultado } = digitar({ en: 'I am fine', pt: 'eu estou bem' }, "I'm fine");
    assert.equal(resultado.correto, true);
    assert.equal(resultado.quase, false);
  });

  test('aceita a forma expandida no lugar da contração', () => {
    const { resultado } = digitar({ en: "I don't understand", pt: 'eu não entendo' }, 'I do not understand');
    assert.equal(resultado.correto, true);
  });

  test('aceita a contração escrita igual à do gabarito', () => {
    const { resultado } = digitar({ en: "I don't understand", pt: 'eu não entendo' }, "I DON'T understand");
    assert.equal(resultado.correto, true);
  });

  test('aceita as traduções alternativas do campo alt', () => {
    const item = { en: 'come back home', pt: 'voltar para casa', alt: ['go back home', 'come home'] };
    ['come back home', 'go back home', 'come home'].forEach(texto => {
      const { resultado } = digitar(item, texto);
      assert.equal(resultado.correto, true, `deveria aceitar "${texto}"`);
      assert.equal(resultado.quase, false);
    });
  });

  test('recusa o que não está no alt', () => {
    const item = { en: 'speak', pt: 'falar', alt: ['talk'] };
    assert.equal(digitar(item, 'talk').resultado.correto, true);
    assert.equal(digitar(item, 'listen').resultado.correto, false);
  });

  test('perdoa um errinho de digitação e sinaliza quase', () => {
    const { resultado } = digitar({ en: 'thank you', pt: 'obrigado' }, 'thank yo');
    assert.equal(resultado.correto, true);
    assert.equal(resultado.quase, true);
    assert.equal(resultado.diff, null);
  });

  test('não perdoa dois errinhos', () => {
    const { resultado } = digitar({ en: 'thank you', pt: 'obrigado' }, 'thnk yo');
    assert.equal(resultado.correto, false);
    assert.equal(resultado.quase, false);
    assert.ok(resultado.diff);
  });

  test('não perdoa errinho em resposta curta (menos de 5 letras)', () => {
    const { resultado } = digitar({ en: 'hi', pt: 'oi' }, 'ho');
    assert.equal(resultado.correto, false);
    assert.equal(resultado.quase, false);
  });

  test('resposta errada devolve o diff com falta e sobra', () => {
    const { resultado } = digitar({ en: 'I have a cat', pt: 'eu tenho um gato' }, 'I have a dog');
    assert.equal(resultado.correto, false);
    assert.deepEqual(resultado.diff.certa.filter(p => p.falta).map(p => p.palavra), ['cat']);
    assert.deepEqual(resultado.diff.dada.filter(p => p.sobra).map(p => p.palavra), ['dog']);
  });

  test('trava o campo e marca a classe do resultado', () => {
    const certo = digitar({ en: 'good night', pt: 'boa noite' }, 'good night');
    assert.equal(certo.entrada.disabled, true);
    assert.ok(certo.entrada.classList.contains('entrada-certa'));

    const errado = digitar({ en: 'good night', pt: 'boa noite' }, 'good evening');
    assert.equal(errado.entrada.disabled, true);
    assert.ok(errado.entrada.classList.contains('entrada-errada'));
  });
});

describe('escolha múltipla', () => {
  const item = { en: 'bye', pt: 'tchau' };

  function escolha(tipo, opcoes) {
    const visao = montarExercicio({ tipo, item, opcoes }, retornoVazio());
    return { visao, botoes: buscarTodos(visao.el, 'opcao') };
  }

  test('renderiza um botão por opção e exige verificação', () => {
    const { visao, botoes } = escolha('escolhaEnPt', ['tchau', 'olá', 'sim', 'não']);
    assert.equal(visao.temVerificar, true);
    assert.deepEqual(botoes.map(b => b.textContent), ['tchau', 'olá', 'sim', 'não']);
  });

  test('EnPt cobra o português e marca a certa', () => {
    const { visao, botoes } = escolha('escolhaEnPt', ['tchau', 'olá', 'sim', 'não']);
    botoes[0].click();
    const r = visao.corrigir();
    assert.equal(r.correto, true);
    assert.equal(r.certa, 'tchau');
    assert.ok(botoes[0].classList.contains('certa'));
  });

  test('PtEn cobra o inglês e marca a errada junto com a certa', () => {
    const { visao, botoes } = escolha('escolhaPtEn', ['bye', 'hello', 'yes', 'no']);
    botoes[1].click();
    const r = visao.corrigir();
    assert.equal(r.correto, false);
    assert.equal(r.certa, 'bye');
    assert.ok(botoes[1].classList.contains('errada'));
    assert.ok(botoes[0].classList.contains('certa'));
  });

  test('sem escolher nada a resposta é errada', () => {
    const { visao, botoes } = escolha('escolhaEnPt', ['tchau', 'olá', 'sim', 'não']);
    const r = visao.corrigir();
    assert.equal(r.correto, false);
    assert.ok(botoes[0].classList.contains('certa'));
  });

  test('trocar de opção mantém só a última selecionada', () => {
    const { visao, botoes } = escolha('escolhaEnPt', ['tchau', 'olá', 'sim', 'não']);
    botoes[1].click();
    botoes[0].click();
    assert.equal(botoes.filter(b => b.classList.contains('sel')).length, 1);
    assert.equal(visao.corrigir().correto, true);
  });

  test('depois de corrigir os cliques não mudam mais nada', () => {
    const { visao, botoes } = escolha('escolhaEnPt', ['tchau', 'olá', 'sim', 'não']);
    botoes[1].click();
    visao.corrigir();
    botoes[0].click();
    assert.equal(visao.corrigir().correto, false);
  });
});

describe('montar frase com peças', () => {
  const item = { en: 'good morning', pt: 'bom dia' };
  const tiles = ['morning', 'good', 'the', 'very'];

  function frase() {
    const visao = montarExercicio({ tipo: 'montar', item, tiles }, retornoVazio());
    const banco = buscar(visao.el, 'banco');
    const area = buscar(visao.el, 'resposta-area');
    const peca = texto => banco.children.find(b => b.textContent === texto);
    return { visao, banco, area, peca };
  }

  test('montando na ordem certa acerta', () => {
    const { visao, area, peca } = frase();
    peca('good').click();
    peca('morning').click();
    assert.deepEqual(area.children.map(c => c.textContent), ['good', 'morning']);
    const r = visao.corrigir();
    assert.equal(r.correto, true);
    assert.equal(r.diff, null);
    assert.ok(area.classList.contains('area-certa'));
  });

  test('ordem errada devolve diff e marca a área', () => {
    const { visao, area, peca } = frase();
    peca('morning').click();
    peca('good').click();
    const r = visao.corrigir();
    assert.equal(r.correto, false);
    assert.ok(r.diff);
    assert.ok(area.classList.contains('area-errada'));
  });

  test('peça sobrando derruba a resposta', () => {
    const { visao, peca } = frase();
    peca('good').click();
    peca('morning').click();
    peca('very').click();
    const r = visao.corrigir();
    assert.equal(r.correto, false);
    assert.deepEqual(r.diff.dada.filter(p => p.sobra).map(p => p.palavra), ['very']);
  });

  test('peça já usada não entra duas vezes e volta ao banco ao ser clicada', () => {
    const { area, banco, peca } = frase();
    const boa = peca('good');
    boa.click();
    boa.click();
    assert.equal(area.children.length, 1);
    assert.ok(boa.classList.contains('usada'));
    area.children[0].click();
    assert.equal(area.children.length, 0);
    assert.equal(banco.children.filter(b => b.classList.contains('usada')).length, 0);
  });
});

describe('ligar os pares', () => {
  const pares = [
    { en: 'hello', pt: 'olá' },
    { en: 'bye', pt: 'tchau' }
  ];

  function ligar() {
    let auto = null;
    const cb = { ...retornoVazio(), aoAuto: r => (auto = r) };
    const visao = montarExercicio({ tipo: 'pares', pares }, cb);
    const botoes = buscarTodos(visao.el, 'par-btn');
    const ingles = en => botoes.find(b => b.dataset.en === en && b.textContent === en);
    const portugues = par => botoes.find(b => b.dataset.en === par.en && b.textContent === par.pt);
    return { visao, botoes, ingles, portugues, obterAuto: () => auto };
  }

  test('não tem botão de verificar e começa correto', () => {
    const { visao, botoes } = ligar();
    assert.equal(visao.temVerificar, false);
    assert.equal(botoes.length, 4);
    assert.deepEqual(visao.corrigir(), { correto: true, certa: null, paresErrados: [] });
  });

  test('acertar todos os pares dispara o encerramento automático', () => {
    const { ingles, portugues, obterAuto } = ligar();
    pares.forEach(p => {
      ingles(p.en).click();
      portugues(p).click();
    });
    assert.deepEqual(obterAuto(), { correto: true, certa: null, paresErrados: [] });
    assert.ok(ingles('hello').classList.contains('ok'));
    assert.ok(portugues(pares[0]).classList.contains('ok'));
  });

  test('errar um par derruba a correção', () => {
    const { visao, ingles, portugues } = ligar();
    ingles('hello').click();
    portugues(pares[1]).click();
    assert.equal(visao.corrigir().correto, false);
    assert.ok(ingles('hello').classList.contains('tremendo'));
  });
});

describe('nao sei: corrigir sem resposta nunca aceita nem quebra', () => {
  test('digitar vazio vira erro com a resposta certa exposta', () => {
    const { resultado } = digitar({ en: 'excuse me', pt: 'com licença' }, '');
    assert.equal(resultado.correto, false);
    assert.equal(resultado.quase, false);
    assert.equal(resultado.certa, 'excuse me');
    assert.ok(resultado.diff, 'deve devolver diff sem lançar erro');
    assert.ok(resultado.diff.dada.every(p => !p.sobra), 'entrada vazia não pode gerar sobras');
  });

  test('digitar vazio não vira quase-acerto por typo-tolerância', () => {
    const { resultado } = digitar({ en: 'water', pt: 'água' }, '');
    assert.equal(resultado.correto, false);
    assert.equal(resultado.quase, false);
  });

  test('escolha sem seleção vira erro e revela a certa', () => {
    const visao = montarExercicio({ tipo: 'escolhaPtEn', item: { en: 'six', pt: 'seis' }, opcoes: ['six', 'one', 'good night', 'can you help me?'] }, retornoVazio());
    const resultado = visao.corrigir();
    assert.equal(resultado.correto, false);
    assert.equal(resultado.certa, 'six');
    const certas = buscarTodos(visao.el, 'certa');
    assert.equal(certas.length, 1);
    assert.equal(certas[0].textContent, 'six');
  });

  test('montar frase sem peças vira erro sem lançar', () => {
    const visao = montarExercicio({ tipo: 'montar', item: { en: 'good morning', pt: 'bom dia' }, tiles: ['good', 'morning', 'night'] }, retornoVazio());
    const resultado = visao.corrigir();
    assert.equal(resultado.correto, false);
    assert.equal(resultado.certa, 'good morning');
    assert.ok(resultado.diff);
  });
});

describe('digitar: typo que forma outra palavra real não é perdoado', () => {
  test('house não vale como mouse (é palavra do curso)', () => {
    const { resultado } = digitar({ en: 'mouse', pt: 'mouse' }, 'house');
    assert.equal(resultado.correto, false);
    assert.equal(resultado.quase, false);
  });

  test('mouse não vale como house (vale nas duas direções)', () => {
    const { resultado } = digitar({ en: 'house', pt: 'casa' }, 'mouse');
    assert.equal(resultado.correto, false);
    assert.equal(resultado.quase, false);
  });

  test('typo que não é palavra continua perdoado', () => {
    const { resultado } = digitar({ en: 'mouse', pt: 'mouse' }, 'mousr');
    assert.equal(resultado.correto, true);
    assert.equal(resultado.quase, true);
  });

  test('typo em tradução alternativa (alt) também é perdoado', () => {
    const { resultado } = digitar({ en: 'come back home', pt: 'voltar para casa', alt: ['go back home'] }, 'go back hom');
    assert.equal(resultado.correto, true);
    assert.equal(resultado.quase, true);
  });

  test('frases continuam com a tolerância de um errinho', () => {
    const { resultado } = digitar({ en: 'good morning', pt: 'bom dia' }, 'good mornin');
    assert.equal(resultado.correto, true);
    assert.equal(resultado.quase, true);
  });
});
