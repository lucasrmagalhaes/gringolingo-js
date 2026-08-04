import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';

const { traduzirErro, SENHA_MINIMA } = await import('../js/nuvem.js');

describe('traduzirErro', () => {
  test('le o tamanho minimo da propria resposta do servidor', () => {
    assert.equal(
      traduzirErro('Password should be at least 8 characters.'),
      'A senha precisa ter pelo menos 8 caracteres'
    );
    assert.equal(
      traduzirErro('Password should be at least 12 characters.'),
      'A senha precisa ter pelo menos 12 caracteres'
    );
  });

  test('nao cristaliza um numero na mensagem', () => {
    const traduzida = traduzirErro('Password should be at least 8 characters.');
    assert.ok(!traduzida.includes('6'), 'a mensagem nao pode citar um minimo diferente do que o servidor exigiu');
  });

  test('SENHA_MINIMA espelha o painel do Supabase', () => {
    assert.equal(typeof SENHA_MINIMA, 'number');
    assert.ok(SENHA_MINIMA >= 8, 'o minimo do app nunca deve ficar abaixo do configurado no Supabase');
  });

  test('descreve em pt-BR quais tipos de caractere faltam', () => {
    const msg = 'Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789.';
    const traduzida = traduzirErro(msg);
    assert.ok(traduzida.includes('uma letra minúscula'));
    assert.ok(traduzida.includes('uma letra maiúscula'));
    assert.ok(traduzida.includes('um número'));
    assert.ok(!traduzida.includes('um símbolo'), 'nao pode exigir simbolo quando o servidor nao pediu');
    assert.ok(!traduzida.includes('abcdefg'), 'nao pode vazar o alfabeto cru do servidor');
  });

  test('inclui simbolo quando o servidor exige', () => {
    const msg = 'Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, 0123456789, !@#$%^&*()-_=+.';
    const traduzida = traduzirErro(msg);
    assert.ok(traduzida.includes('um símbolo'));
    assert.ok(traduzida.includes('e '), 'deve listar os requisitos numa frase legivel');
  });

  test('traduz senha vazada mesmo sem o recurso ativo hoje', () => {
    assert.ok(traduzirErro('This password has been pwned in a data breach.').includes('vazamentos'));
  });

  test('mantem as traducoes de login que ja existiam', () => {
    assert.equal(traduzirErro('Invalid login credentials'), 'E-mail ou senha incorretos 🙈');
    assert.equal(traduzirErro('User already registered'), 'Esse e-mail já tem conta — tenta entrar!');
    assert.equal(traduzirErro('Failed to fetch'), 'Sem conexão com a nuvem 📡');
  });

  test('erro desconhecido nao vira mensagem vazia', () => {
    assert.ok(traduzirErro('Something exploded').includes('Something exploded'));
    assert.ok(traduzirErro(undefined).length > 0);
    assert.ok(traduzirErro('').length > 0);
  });
});
