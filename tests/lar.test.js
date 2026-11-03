import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  MODELOS, avaliarModelo,
  FUROS, avaliarFuro,
  ROTINAS, avaliarRotina,
  PAPOS, montarPapo
} = await import('../js/lar.js');
const { avaliarResposta } = await import('../js/conversa.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const { PALESTRAS, DUVIDAS, SINAIS } = await import('../js/plateia.js');
const { FALHAS, MENTORIAS, SOCORROS } = await import('../js/guia.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarModelo, registrarFuro, registrarRotina, registrarPapo
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
  ...SOCORROS.map(c => c.id),
  ...PALESTRAS.map(c => c.id),
  ...DUVIDAS.map(c => c.id),
  ...SINAIS.map(c => c.id),
  ...SISTEMAS.map(c => c.id),
  ...CODIGOS.map(c => c.id),
  ...COLEGAS.map(c => c.id)
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
  return arquivo;
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

describe('IA simples, furo, casa e conversa livre', () => {
  test('a IA cabe numa frase simples', () => {
    semTravessao('../js/lar.js');
    conferirCena(MODELOS, ['Ideia', 'Exemplo'], avaliarModelo);
    assert.equal(MODELOS.length, 3);
    assert.equal(avaliarModelo(MODELOS[0].rodadas[0], 'A prompt is the request you write for the model.').ok, true);
    assert.equal(avaliarModelo(MODELOS[0].rodadas[1], 'I will ask it for a short answer.').ok, true);
    assert.equal(avaliarModelo(MODELOS[1].rodadas[0], 'It can invent a fact that sounds true.').ok, true);
    assert.equal(avaliarModelo(MODELOS[1].rodadas[1], 'I will check the source before I share it.').ok, true);
    assert.equal(avaliarModelo(MODELOS[2].rodadas[0], 'We hand it our own notes first.').ok, true);
    assert.equal(avaliarModelo(MODELOS[2].rodadas[1], 'Then the answer stays close to those notes.').ok, true);
    const texto = JSON.stringify(MODELOS);
    assert.equal(texto.includes('I use AI to draft'), false);
  });

  test('o furo fala de CVE, patch e dependência', () => {
    conferirCena(FUROS, ['Aviso', 'Plano'], avaliarFuro);
    assert.equal(FUROS.length, 3);
    assert.equal(avaliarFuro(FUROS[0].rodadas[0], 'This CVE is a known hole in the library.').ok, true);
    assert.equal(avaliarFuro(FUROS[0].rodadas[1], 'I will read the note before I upgrade.').ok, true);
    assert.equal(avaliarFuro(FUROS[1].rodadas[0], 'The patch closes that hole.').ok, true);
    assert.equal(avaliarFuro(FUROS[1].rodadas[1], 'I will apply the patch today.').ok, true);
    assert.equal(avaliarFuro(FUROS[2].rodadas[0], 'I will upgrade this dependency this week.').ok, true);
    assert.equal(avaliarFuro(FUROS[2].rodadas[1], 'The tests still pass after the upgrade.').ok, true);
    const texto = JSON.stringify(FUROS);
    assert.equal(texto.includes('The deploy failed on the test step.'), false);
  });

  test('a rotina conta a casa e a família', () => {
    conferirCena(ROTINAS, ['Casa', 'Família'], avaliarRotina);
    assert.equal(ROTINAS.length, 3);
    assert.equal(avaliarRotina(ROTINAS[0].rodadas[0], 'I make coffee before the kids wake up.').ok, true);
    assert.equal(avaliarRotina(ROTINAS[0].rodadas[1], 'Then we have breakfast together.').ok, true);
    assert.equal(avaliarRotina(ROTINAS[1].rodadas[0], 'We have dinner together at seven.').ok, true);
    assert.equal(avaliarRotina(ROTINAS[1].rodadas[0], 'We have dinner together at 7.').ok, true);
    assert.equal(avaliarRotina(ROTINAS[1].rodadas[1], 'My sister tells a story from school.').ok, true);
    assert.equal(avaliarRotina(ROTINAS[2].rodadas[0], 'I do the dishes after dinner.').ok, true);
    assert.equal(avaliarRotina(ROTINAS[2].rodadas[1], 'The kids read before bed.').ok, true);
    const texto = JSON.stringify(ROTINAS);
    assert.equal(texto.includes('I work from home'), false);
    assert.equal(texto.includes('I love my family'), false);
    assert.equal(texto.includes('I play the guitar'), false);
  });

  test('a conversa livre repete os mesmos assuntos no mesmo dia', () => {
    const fonte = semTravessao('../js/lar.js');
    assert.equal(fonte.includes('Math.random'), false);
    assert.equal(PAPOS.length, 6);
    for (const cena of PAPOS) assert.equal(ocupados.has(cena.id), false, cena.id);
    const cena = montarPapo('2026-10-28');
    assert.ok(cena);
    assert.equal(cena.rodadas.length, 6);
    assert.equal(cena.assuntos.length, 3);
    assert.equal(new Set(cena.assuntos).size, 3);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), ['Tema', 'Acompanha', 'Tema', 'Acompanha', 'Tema', 'Acompanha']);
    assert.deepEqual(montarPapo('2026-10-28'), cena);
    assert.equal(montarPapo('ontem'), null);
    assert.equal(montarPapo(''), null);
    const titulos = new Set(PAPOS.map(c => c.titulo));
    for (const assunto of cena.assuntos) assert.equal(titulos.has(assunto), true);
    for (const rodada of cena.rodadas) {
      assert.equal(avaliarResposta(rodada, rodada.melhor).ok, true, rodada.melhor);
    }
    const outro = montarPapo('2026-11-03');
    assert.equal(outro.rodadas.length, 6);
  });

  test('cada treino conta no próprio contador e a missão paga', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'modelo1', valor: 0, pago: false }] };
    const modelo = registrarModelo({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(modelo.bonusMissoes, 15);
    assert.equal(estado.stats.modelos, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('modelo'));
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);

    registrarFuro({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.furos, 1);
    assert.ok(estado.badges.includes('furo'));

    registrarRotina({
      xp: 26, nota: 90, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.rotinas, 1);
    assert.ok(estado.badges.includes('rotina'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'papo1', valor: 0, pago: false }] };
    const papo = registrarPapo({
      xp: 58, nota: 80, acertos: 6, respostas: 6, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(papo.bonusMissoes, 15);
    assert.equal(estado.stats.papos, 1);
    assert.ok(estado.badges.includes('assunto'));
    assert.equal(BADGES.length, 85);
  });

  test('a versão 2.19 abre a conversa livre fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '2\.19'/);
    assert.match(data, /versao: '2\.18'/);
    assert.match(sw, /gringolingo-v46/);
    assert.match(sw, /\.\/js\/lar\.js/);
    assert.match(app, /function telaModelos/);
    assert.match(app, /function telaFuros/);
    assert.match(app, /function telaRotinas/);
    const papo = app.slice(app.indexOf('function telaPapo'), app.indexOf('function telaSimulado'));
    assert.match(papo, /function pintarPapo/);
    assert.match(papo, /montarPapo/);
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarPapo'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
  });
});
