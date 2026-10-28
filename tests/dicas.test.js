import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { diagnosticar, dicaDoDia, dicaContextual, rotuloChave, textoDoPadrao } from '../js/dicas.js';

const real = token => ['house', 'mouse', 'launch', 'lunch'].includes(token);

describe('diagnosticar: por que a resposta errou', () => {
  test('vazio explica sem aceitar', () => {
    const d = diagnosticar({ dada: '   ', certa: 'excuse me' });
    assert.equal(d.tipo, 'vazio');
    assert.equal(d.aceitar, false);
    assert.match(d.porque, /excuse me/);
    assert.ok(d.dica);
  });

  test('artigo faltando não é quase-acerto', () => {
    const d = diagnosticar({ dada: 'I want coffee', certa: 'I want a coffee' });
    assert.equal(d.tipo, 'artigo');
    assert.equal(d.chave, 'artigo:a');
    assert.equal(d.aceitar, false);
    assert.ok(d.palavras.certa.some(p => p.t === 'a' && p.marca === 'falta'));
    assert.match(d.porque, /artigo/i);
  });

  test('a e an trocados ganham dica de som', () => {
    const d = diagnosticar({ dada: 'I want an coffee', certa: 'I want a coffee' });
    assert.equal(d.tipo, 'artigo');
    assert.equal(d.chave, 'artigo:an');
    assert.equal(d.aceitar, false);
    assert.match(d.dica, /som de vogal/);
  });

  test('ordem trocada não marca como palavra faltando', () => {
    const d = diagnosticar({ dada: 'morning good', certa: 'good morning' });
    assert.equal(d.tipo, 'ordem');
    assert.equal(d.aceitar, false);
    assert.ok(d.palavras.dada.some(p => p.marca === 'fora'));
    assert.match(d.porque, /ordem/);
  });

  test('ordem com contração mostra o que foi escrito, sem expandir', () => {
    const d = diagnosticar({ dada: "don't understand I", certa: "I don't understand" });
    assert.equal(d.tipo, 'ordem');
    assert.equal(d.palavras.dada.map(p => p.t).join(' '), "don't understand I");
    assert.equal(d.palavras.certa.map(p => p.t).join(' '), "I don't understand");
    assert.match(d.porque, /don't understand I/);
  });

  test('plural regular', () => {
    const d = diagnosticar({ dada: 'I have two brother', certa: 'I have two brothers' });
    assert.equal(d.tipo, 'plural');
    assert.equal(d.aceitar, false);
    assert.match(d.porque, /brother/);
  });

  test('plural irregular feet', () => {
    const d = diagnosticar({ dada: 'two foots', certa: 'two feet' });
    assert.equal(d.tipo, 'plural');
    assert.match(d.dica, /foot\/feet|irregular/i);
  });

  test('terceira pessoa é tempo, não plural', () => {
    const d = diagnosticar({ dada: 'she work', certa: 'she works' });
    assert.equal(d.tipo, 'tempo');
    assert.equal(d.chave, 'tempo:s');
    assert.match(d.dica, /-s/);
  });

  test('to be trocado', () => {
    const d = diagnosticar({ dada: 'I is fine', certa: 'I am fine' });
    assert.equal(d.tipo, 'tempo');
    assert.equal(d.chave, 'tempo:be');
  });

  test('negativa sem do', () => {
    const d = diagnosticar({ dada: 'I not understand', certa: "I don't understand" });
    assert.equal(d.tipo, 'tempo');
    assert.equal(d.chave, 'tempo:do');
    assert.match(d.porque, /do/);
  });

  test('to sobrando depois de can', () => {
    const d = diagnosticar({ dada: 'can you to help', certa: 'can you help' });
    assert.equal(d.tipo, 'tempo');
    assert.equal(d.chave, 'tempo:to');
    assert.equal(d.aceitar, false);
  });

  test('falso amigo push/pull', () => {
    const d = diagnosticar({ dada: 'I push the door', certa: 'I pull the door' });
    assert.equal(d.tipo, 'cognato');
    assert.equal(d.chave, 'cognato:push');
    assert.match(d.dica, /empurrar/);
    assert.equal(d.aceitar, false);
  });

  test('falso amigo parents', () => {
    const d = diagnosticar({ dada: 'my parents', certa: 'my relatives', palavraReal: real });
    assert.equal(d.tipo, 'cognato');
    assert.match(d.dica, /pai e mãe/);
  });

  test('errinho de uma letra é aceito e destaca as letras', () => {
    const d = diagnosticar({ dada: 'good mornign', certa: 'good morning', palavraReal: real });
    assert.equal(d.tipo, 'typo');
    assert.equal(d.aceitar, true);
    assert.ok(d.letras.dada.some(p => p.marca !== 'ok'));
    assert.ok(d.letras.certa.some(p => p.marca !== 'ok'));
  });

  test('espaço faltando é quase, com aviso de espaço', () => {
    const d = diagnosticar({ dada: 'excuseme', certa: 'excuse me', palavraReal: real });
    assert.equal(d.aceitar, true);
    assert.equal(d.titulo, 'Quase! Faltou um espaço');
    assert.match(d.porque, /espaço/);
    assert.match(d.dica, /espaço/);
  });

  test('dois errinhos não são aceitos', () => {
    const d = diagnosticar({ dada: 'thnk yo', certa: 'thank you' });
    assert.equal(d.aceitar, false);
    assert.equal(d.tipo, 'typo');
  });

  test('typo que forma palavra real não é aceito', () => {
    const d = diagnosticar({ dada: 'house', certa: 'mouse', palavraReal: real });
    assert.equal(d.aceitar, false);
    assert.equal(d.tipo, 'troca');
    assert.match(d.porque, /outra palavra/);
  });

  test('lunch/launch é falso amigo mesmo com uma letra de diferença', () => {
    const d = diagnosticar({ dada: 'launch', certa: 'lunch', palavraReal: real });
    assert.equal(d.tipo, 'cognato');
    assert.equal(d.aceitar, false);
  });

  test('escolha errada explica a opção marcada', () => {
    const d = diagnosticar({ dada: 'hello', certa: 'bye', opcao: true });
    assert.equal(d.tipo, 'escolha');
    assert.equal(d.aceitar, false);
    assert.match(d.porque, /hello/);
    assert.match(d.porque, /bye/);
  });

  test('nota do item entra quando o erro não tem regra mais específica', () => {
    const d = diagnosticar({
      dada: 'good evening',
      certa: 'good night',
      nota: 'Good night é só de despedida.'
    });
    assert.equal(d.dica, 'Good night é só de despedida.');
  });

  test('alternativa mais próxima decide o quase', () => {
    const d = diagnosticar({
      dada: 'go back hom',
      certa: 'come back home',
      alternativas: ['go back home']
    });
    assert.equal(d.aceitar, true);
    assert.equal(d.tipo, 'typo');
  });
});

describe('dicas de contexto', () => {
  test('dica do dia é estável para a mesma data', () => {
    const a = dicaDoDia('2026-10-28');
    const b = dicaDoDia('2026-10-28');
    assert.deepEqual(a, b);
    assert.ok(a.titulo && a.corpo.length > 20);
    assert.notEqual(dicaDoDia('2026-10-28').titulo, dicaDoDia('2026-01-01').titulo);
  });

  test('dica da lição junta o card da lição e a nota do item', () => {
    const blocos = dicaContextual(
      { en: 'I am fine', pt: 'eu estou bem', nota: 'Ser e estar viram to be.' },
      { dica: { titulo: 'Ser e estar', corpo: 'Os dois viram to be, e ele muda com a pessoa.' } }
    );
    assert.equal(blocos[0].titulo, 'Ser e estar');
    assert.ok(blocos.some(b => b.corpo === 'Ser e estar viram to be.'));
  });

  test('sem item, ainda há uma dica genérica', () => {
    const blocos = dicaContextual(null, null);
    assert.equal(blocos.length, 1);
    assert.equal(blocos[0].titulo, 'Ordem da frase');
    assert.match(blocos[0].corpo, /sujeito/i);
  });

  test('rótulo e texto do padrão recorrente', () => {
    assert.equal(rotuloChave('cognato:push', 'cognato'), 'falso amigo (push)');
    assert.match(textoDoPadrao('tempo:s', 'tempo'), /-s/);
    assert.match(textoDoPadrao('cognato:push', 'cognato'), /empurrar/);
  });
});
