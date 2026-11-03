import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SALARIOS, avaliarSalario,
  PROJETOS, avaliarProjeto,
  SOTAQUES, avaliarSotaque,
  FALAS_DIA, avaliarDesafio,
  montarDesafio, frasesDoDesafio, textoDesafio, rotuloVoz
} = await import('../js/vaga.js');
const { escolherVoz, falarComLocale } = await import('../js/audio.js');
const {
  estado, limparEstadoMemoria, definirAgora, mesclarEstado,
  registrarSalario, registrarProjeto, registrarSotaque, registrarDesafioDia, resumoDesafio
} = await import('../js/game.js');
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
  ...TERMOS.map(c => c.id)
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

describe('salário, portfólio, sotaque e desafio', () => {
  test('o salário fala de faixa, plano e ações', () => {
    conferirCena(SALARIOS, ['Pedido', 'Troca'], avaliarSalario);
    assert.equal(SALARIOS.length, 3);
    assert.equal(avaliarSalario(SALARIOS[0].rodadas[0], 'I am looking at 90 to 100 thousand a year.').ok, true);
    assert.equal(avaliarSalario(SALARIOS[0].rodadas[1], 'That range is base salary only.').ok, true);
    assert.equal(avaliarSalario(SALARIOS[1].rodadas[0], 'Health insurance matters to me.').ok, true);
    assert.equal(avaliarSalario(SALARIOS[2].rodadas[0], 'Could we talk about the equity?').ok, true);
    assert.equal(avaliarSalario(SALARIOS[2].rodadas[1], 'Please send the vesting schedule.').ok, true);
  });

  test('o portfólio passa por problema, stack e resultado', () => {
    conferirCena(PROJETOS, ['Problema', 'Stack', 'Resultado'], avaliarProjeto);
    assert.equal(PROJETOS.length, 3);
    const lista = PROJETOS[0].rodadas;
    assert.equal(avaliarProjeto(lista[0], 'The team kept losing track of tasks.').ok, true);
    assert.equal(avaliarProjeto(lista[1], 'I used JavaScript and a small API.').ok, true);
    assert.equal(avaliarProjeto(lista[2], 'The team closed tasks a week faster.').ok, true);
    assert.equal(avaliarProjeto(PROJETOS[2].rodadas[2], 'People opened it on the phone, offline.').ok, true);
    assert.equal(JSON.stringify(PROJETOS).includes('one minute'), false);
  });

  test('os sotaques pedem en-US, en-GB e en-IN', () => {
    conferirCena(SOTAQUES, ['Ouvir', 'Outra'], avaliarSotaque);
    assert.deepEqual(SOTAQUES.map(c => c.locale), ['en-US', 'en-GB', 'en-IN']);
    assert.equal(avaliarSotaque(SOTAQUES[0].rodadas[0], 'Please take a look at the diff.').ok, true);
    assert.equal(avaliarSotaque(SOTAQUES[1].rodadas[0], 'Shall I book the call for Thursday?').ok, true);
    assert.equal(avaliarSotaque(SOTAQUES[2].rodadas[0], 'Kindly check the error logs.').ok, true);
    assert.equal(avaliarSotaque(SOTAQUES[2].rodadas[1], 'I will update the ticket by noon.').ok, true);
    const ids = [...SALARIOS, ...PROJETOS, ...SOTAQUES].map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('a voz do locale entra na fala e some quando o aparelho não tem', () => {
    const lista = [
      { voiceURI: 'us', name: 'US', lang: 'en-US' },
      { voiceURI: 'gb', name: 'UK', lang: 'en-GB' }
    ];
    assert.equal(escolherVoz(lista, 'en-GB').voiceURI, 'gb');
    assert.equal(escolherVoz(lista, 'en-IN'), null);
    const faladas = [];
    speechSynthesis.getVoices = () => lista;
    speechSynthesis.speak = u => faladas.push(u);
    const com = falarComLocale('Hello there.', 'en-GB');
    assert.equal(com.falou, true);
    assert.equal(com.voz.nome, 'UK');
    assert.equal(faladas[0].lang, 'en-GB');
    assert.equal(faladas[0].voice.voiceURI, 'gb');
    const sem = falarComLocale('Hello there.', 'en-IN');
    assert.equal(sem.falou, true);
    assert.equal(sem.voz, null);
    assert.equal(faladas[1].lang, 'en-IN');
    assert.equal(faladas[1].voice, null);
    assert.match(rotuloVoz(com, 'en-GB'), /UK/);
    assert.match(rotuloVoz(sem, 'en-IN'), /Sem voz en-IN/);
    assert.match(rotuloVoz({ falou: false }, 'en-US'), /Sem voz neste navegador/);
  });

  test('o desafio cresce com a sequência e trava em 6', () => {
    assert.equal(montarDesafio('ontem', 0), null);
    assert.equal(frasesDoDesafio(0), 2);
    assert.equal(frasesDoDesafio(1), 3);
    assert.equal(frasesDoDesafio(20), 6);
    const primeiro = montarDesafio('2026-10-28', 0);
    const deNovo = montarDesafio('2026-10-28', 0);
    assert.equal(primeiro.rodadas.length, 2);
    assert.deepEqual(primeiro.rodadas.map(r => r.melhor), deNovo.rodadas.map(r => r.melhor));
    assert.equal(montarDesafio('2026-10-29', 1).rodadas.length, 3);
    assert.equal(montarDesafio('2026-10-28', 9).rodadas.length, 6);
    for (const rodada of primeiro.rodadas) assert.equal(avaliarDesafio(rodada, rodada.melhor).ok, true);
    assert.equal(JSON.stringify(FALAS_DIA).includes('base salary'), false);
    assert.equal(textoDesafio({ feito: false, sequencia: 0, frases: 2 }), 'Hoje são 2 frases. Termine para abrir a sequência.');
    assert.equal(textoDesafio({ feito: true, sequencia: 5, frases: 6 }), 'Feito hoje. Sequência de 5 dias. Amanhã continua em 6 frases.');
  });

  test('a sequência de fala soma o dia seguinte e zera depois de um furo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'salario1', valor: 0, pago: false }] };
    const salario = registrarSalario({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.salarios, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.equal(salario.bonusMissoes, 15);
    assert.ok(estado.badges.includes('salario'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'projeto1', valor: 0, pago: false }] };
    const projeto = registrarProjeto({
      xp: 34, nota: 90, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(projeto.bonusMissoes, 15);
    assert.ok(estado.badges.includes('projeto'));

    registrarSotaque({ xp: 26, nota: 70, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.sotaques, 1);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('sotaque'));

    registrarDesafioDia({ xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.sequenciaDesafio, 1);
    assert.equal(estado.diaDesafio, '2026-10-28');
    assert.equal(estado.recordeDesafio, 1);
    assert.equal(resumoDesafio().feito, true);
    assert.equal(resumoDesafio().frases, 2);
    assert.ok(estado.badges.includes('desafio'));
    registrarDesafioDia({ xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.sequenciaDesafio, 1);
    assert.equal(estado.stats.desafios, 2);

    definirAgora(() => new Date(2026, 9, 29, 15, 0, 0));
    assert.equal(resumoDesafio().sequencia, 1);
    assert.equal(resumoDesafio().frases, 3);
    registrarDesafioDia({ xp: 26, nota: 80, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.sequenciaDesafio, 2);
    assert.equal(estado.recordeDesafio, 2);

    definirAgora(() => new Date(2026, 9, 31, 15, 0, 0));
    assert.equal(resumoDesafio().sequencia, 0);
    assert.equal(resumoDesafio().frases, 2);
    registrarDesafioDia({ xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.sequenciaDesafio, 1);
    assert.equal(estado.recordeDesafio, 2);

    limparEstadoMemoria();
    estado.diaDesafio = '2026-10-28';
    estado.sequenciaDesafio = 2;
    estado.recordeDesafio = 2;
    mesclarEstado({ diaDesafio: '2026-10-29', sequenciaDesafio: 1, recordeDesafio: 1, versaoDados: 3 });
    assert.equal(estado.diaDesafio, '2026-10-29');
    assert.equal(estado.sequenciaDesafio, 3);
    assert.equal(estado.recordeDesafio, 3);
  });

  test('a versão 2.14 alinha o ícone dos cartões', () => {
    semTravessao('../js/vaga.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.14'/);
    assert.match(data, /versao: '2\.13'/);
    assert.match(sw, /\.\/js\/vaga\.js/);
    const icone = css.slice(css.indexOf('.revisao-emoji'), css.indexOf('.revisao-textos'));
    assert.match(icone, /flex: 0 0 44px/);
    const seta = css.slice(css.indexOf('.revisao-seta'), css.indexOf('.unidade'));
    assert.match(seta, /flex: 0 0 auto/);
  });
});
