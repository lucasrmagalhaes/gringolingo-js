import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { PALESTRAS, avaliarPalestra, DUVIDAS, avaliarDuvida, SINAIS, avaliarSinal } = await import('../js/plateia.js');
const { FALHAS, MENTORIAS, SOCORROS } = await import('../js/guia.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPalestra, registrarDuvida, registrarSinal,
  palavrasDoPadrao
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS, IDIOMAS, PERGUNTAS_DIA } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS, NUMEROS } = await import('../js/ensaio.js');
const { OPINIOES, CENAS_FALA } = await import('../js/opiniao.js');
const { RELATOS, CORTESIAS, AQUECIMENTOS, CLAROS } = await import('../js/call.js');
const { DEMOS, PRAZOS, STARS, ENFASES } = await import('../js/palco.js');
const { DECISOES, PARES, INCIDENTES } = await import('../js/plantao.js');
const { RETROS, CHEGADAS, LIGACOES } = await import('../js/discurso.js');
const { ESTIMATIVAS, CONSENSOS, ATENDIMENTOS } = await import('../js/cotidiano.js');
const { GESTORES, FINAIS, VIAGENS } = await import('../js/turno.js');
const { LINHAS, SLACKS, SOCIAIS, TERMOS } = await import('../js/oficina.js');
const { SALARIOS, PROJETOS, SOTAQUES } = await import('../js/vaga.js');
const { REQUISITOS, METRICAS, APRENDIZADOS, PASSEIOS } = await import('../js/briefing.js');

const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const ocupados = new Set([
  ...IDS_CINCO,
  ...CENAS_TECNICAS.map(c => c.id),
  ...IDIOMAS.map(c => c.id),
  ...PERGUNTAS_DIA.map(c => c.id),
  ENTREVISTA.id,
  ...CONTOS.map(c => c.id),
  ...NUMEROS.map(c => c.id),
  ...OPINIOES.map(c => c.id),
  ...CENAS_FALA.map(c => c.id),
  ...RELATOS.map(c => c.id),
  ...CORTESIAS.map(c => c.id),
  ...AQUECIMENTOS.map(c => c.id),
  ...CLAROS.map(c => c.id),
  ...DEMOS.map(c => c.id),
  ...PRAZOS.map(c => c.id),
  ...STARS.map(c => c.id),
  ...ENFASES.map(c => c.id),
  ...DECISOES.map(c => c.id),
  ...PARES.map(c => c.id),
  ...INCIDENTES.map(c => c.id),
  ...RETROS.map(c => c.id),
  ...CHEGADAS.map(c => c.id),
  ...LIGACOES.map(c => c.id),
  ...ESTIMATIVAS.map(c => c.id),
  ...CONSENSOS.map(c => c.id),
  ...ATENDIMENTOS.map(c => c.id),
  ...GESTORES.map(c => c.id),
  ...FINAIS.map(c => c.id),
  ...VIAGENS.map(c => c.id),
  ...LINHAS.map(c => c.id),
  ...SLACKS.map(c => c.id),
  ...SOCIAIS.map(c => c.id),
  ...TERMOS.map(c => c.id),
  ...SALARIOS.map(c => c.id),
  ...PROJETOS.map(c => c.id),
  ...SOTAQUES.map(c => c.id),
  ...REQUISITOS.map(c => c.id),
  ...METRICAS.map(c => c.id),
  ...APRENDIZADOS.map(c => c.id),
  ...PASSEIOS.map(c => c.id),
  ...FALHAS.map(c => c.id),
  ...MENTORIAS.map(c => c.id),
  ...SOCORROS.map(c => c.id)
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

function conferirCena(lista, etapas, avaliar) {
  assert.equal(new Set(lista.map(c => c.id)).size, lista.length);
  for (const cena of lista) {
    assert.equal(ocupados.has(cena.id), false, cena.id);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), etapas);
    for (const rodada of cena.rodadas) {
      assert.ok(rodada.aceitas.length >= 2, cena.id);
      assert.equal(avaliar(rodada, rodada.melhor).ok, true, rodada.melhor);
      assert.equal(avaliar(rodada, 'The weather is nice.').ok, false);
    }
  }
}

describe('palestra, dúvida, sinal e pontos fracos', () => {
  test('a palestra abre, troca de slide e chama perguntas', () => {
    semTravessao('../js/plateia.js');
    assert.equal(PALESTRAS.length, 3);
    assert.deepEqual(PALESTRAS[0].rodadas.map(r => r.etapa), ['Abertura', 'Tema']);
    assert.deepEqual(PALESTRAS[1].rodadas.map(r => r.etapa), ['Troca', 'Leitura']);
    assert.deepEqual(PALESTRAS[2].rodadas.map(r => r.etapa), ['Fecho', 'Convite']);
    for (const cena of PALESTRAS) {
      assert.equal(ocupados.has(cena.id), false, cena.id);
      for (const rodada of cena.rodadas) {
        assert.ok(rodada.aceitas.length >= 2, cena.id);
        assert.equal(avaliarPalestra(rodada, rodada.melhor).ok, true, rodada.melhor);
        assert.equal(avaliarPalestra(rodada, 'The weather is nice.').ok, false);
      }
    }
    assert.equal(avaliarPalestra(PALESTRAS[0].rodadas[0], 'Hi everyone. Thanks for coming.').ok, true);
    assert.equal(avaliarPalestra(PALESTRAS[1].rodadas[0], 'Let me go to the next slide.').ok, true);
    assert.equal(avaliarPalestra(PALESTRAS[2].rodadas[1], 'I will take two questions.').ok, true);
    const texto = JSON.stringify(PALESTRAS);
    assert.equal(texto.includes('I shipped the fix with no rollback plan'), false);
    assert.equal(texto.includes('Could you rephrase that?'), false);
  });

  test('a dúvida ganha tempo sem inventar a resposta', () => {
    conferirCena(DUVIDAS, ['Gancho', 'Prazo'], avaliarDuvida);
    assert.equal(DUVIDAS.length, 3);
    assert.equal(avaliarDuvida(DUVIDAS[0].rodadas[0], 'Good question. Let me get back to you.').ok, true);
    assert.equal(avaliarDuvida(DUVIDAS[0].rodadas[1], 'I will send the answer today.').ok, true);
    assert.equal(avaliarDuvida(DUVIDAS[1].rodadas[0], 'I do not have that number here.').ok, true);
    assert.equal(avaliarDuvida(DUVIDAS[2].rodadas[1], 'I will follow up tomorrow morning.').ok, true);
    const texto = JSON.stringify(DUVIDAS);
    assert.equal(texto.includes('Let me check I understood'), false);
    assert.equal(texto.includes('Could you say that again?'), false);
  });

  test('o sinal avisa que a chamada falhou', () => {
    conferirCena(SINAIS, ['Aviso', 'Pedido'], avaliarSinal);
    assert.equal(SINAIS.length, 3);
    assert.equal(avaliarSinal(SINAIS[0].rodadas[0], "You're breaking up.").ok, true);
    assert.equal(avaliarSinal(SINAIS[0].rodadas[1], 'Can you hear me now?').ok, true);
    assert.equal(avaliarSinal(SINAIS[1].rodadas[0], 'My video just froze.').ok, true);
    assert.equal(avaliarSinal(SINAIS[2].rodadas[1], 'I will call you back on the phone.').ok, true);
    const texto = JSON.stringify(SINAIS);
    assert.equal(texto.includes('Could you say that more slowly?'), false);
    assert.equal(texto.includes('I have a headache'), false);
  });

  test('cada treino conta no próprio contador e a missão paga', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'palestra1', valor: 0, pago: false }] };
    const palestra = registrarPalestra({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(palestra.bonusMissoes, 15);
    assert.equal(estado.stats.palestras, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('palestra'));
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);

    registrarDuvida({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.duvidas, 1);
    assert.ok(estado.badges.includes('duvida'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'sinal1', valor: 0, pago: false }] };
    const sinal = registrarSinal({
      xp: 26, nota: 90, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(sinal.bonusMissoes, 15);
    assert.equal(estado.stats.sinais, 1);
    assert.ok(estado.badges.includes('sinal'));
    assert.ok(BADGES.length >= 77);
  });

  test('cada padrão devolve só as palavras abertas daquele erro', () => {
    estado.deslizes = [
      { en: 'hello', pt: 'olá', chave: 'artigo', tipo: 'artigo', erros: 4, acertos: 1 },
      { en: 'please', pt: 'por favor', chave: 'ordem', tipo: 'ordem', erros: 3, acertos: 0 },
      { en: 'yes', pt: 'sim', chave: 'typo', tipo: 'typo', erros: 2, acertos: 2 }
    ];
    const itens = [
      { en: 'hello', pt: 'olá' },
      { en: 'please', pt: 'por favor' },
      { en: 'yes', pt: 'sim' }
    ];
    const artigo = palavrasDoPadrao('artigo', itens);
    assert.equal(artigo.length, 1);
    assert.equal(artigo[0].item.en, 'hello');
    assert.equal(artigo[0].saldo, 3);
    assert.equal(palavrasDoPadrao('ordem', itens)[0].item.en, 'please');
    assert.equal(palavrasDoPadrao('typo', itens).length, 0);
    assert.deepEqual(palavrasDoPadrao('', itens), []);
    assert.deepEqual(palavrasDoPadrao('artigo', null), []);
  });

  test('a versão 2.17 tira o atalho dos cartões e abre o treino do padrão', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.17'/);
    assert.match(data, /versao: '2\.16'/);
    assert.match(sw, /\.\/js\/plateia\.js/);
    const tela = app.slice(app.indexOf('function telaPontosFracos'), app.indexOf('function treinarPadrao'));
    assert.match(tela, /Treinar o padrão/);
    assert.match(tela, /palavrasDoPadrao/);
    assert.match(tela, /SEM PALAVRA/);
    assert.match(app, /function treinarPadrao/);
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function telaPontosFracos'), false);
    const mobile = css.slice(css.indexOf('@media (max-width: 430px)'), css.indexOf('@media (prefers-reduced-motion: reduce)'));
    assert.equal(mobile.includes('.card.revisao'), false);
    assert.match(mobile, /\.badge-card \{[^}]*content-visibility: auto/);
  });
});
