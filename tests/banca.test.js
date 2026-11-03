import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SISTEMAS, avaliarSistema,
  CODIGOS, avaliarCodigo,
  COLEGAS, avaliarColega,
  montarSimulado, notaDoSimulado, faixaDoSimulado
} = await import('../js/banca.js');
const { avaliarResposta } = await import('../js/conversa.js');
const { PALESTRAS, DUVIDAS, SINAIS } = await import('../js/plateia.js');
const { FALHAS, MENTORIAS, SOCORROS } = await import('../js/guia.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSistema, registrarCodigo, registrarColega, registrarSimulado
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
  ...SINAIS.map(c => c.id)
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

describe('sistema, código em voz alta, outra área e simulado', () => {
  test('o sistema fala o pedido, a escala e o gargalo', () => {
    semTravessao('../js/banca.js');
    conferirCena(SISTEMAS, ['Pedido', 'Limite'], avaliarSistema);
    assert.equal(SISTEMAS.length, 3);
    assert.equal(avaliarSistema(SISTEMAS[0].rodadas[0], 'Users upload a photo and see the feed.').ok, true);
    assert.equal(avaliarSistema(SISTEMAS[0].rodadas[1], 'Search can wait. The feed comes first.').ok, true);
    assert.equal(avaliarSistema(SISTEMAS[1].rodadas[0], 'It should handle ten thousand users a day.').ok, true);
    assert.equal(avaliarSistema(SISTEMAS[1].rodadas[0], 'It should handle 10000 users a day.').ok, true);
    assert.equal(avaliarSistema(SISTEMAS[1].rodadas[0], 'It should handle 10 thousand users a day.').ok, true);
    assert.equal(avaliarSistema(SISTEMAS[1].rodadas[1], 'At peak we add one more server.').ok, true);
    assert.equal(avaliarSistema(SISTEMAS[2].rodadas[0], 'The slow part is the database query.').ok, true);
    assert.equal(avaliarSistema(SISTEMAS[2].rodadas[1], 'I would add an index on the user id.').ok, true);
    const texto = JSON.stringify(SISTEMAS);
    assert.equal(texto.includes('Managers use it every Monday'), false);
    assert.equal(texto.includes('We went with Postgres'), false);
  });

  test('o código pensa em voz alta e dá o passo', () => {
    conferirCena(CODIGOS, ['Voz', 'Passo'], avaliarCodigo);
    assert.equal(CODIGOS.length, 3);
    assert.equal(avaliarCodigo(CODIGOS[0].rodadas[0], 'I will start with the empty case.').ok, true);
    assert.equal(avaliarCodigo(CODIGOS[0].rodadas[1], 'An empty list returns an empty list.').ok, true);
    assert.equal(avaliarCodigo(CODIGOS[1].rodadas[0], 'Let me read this loop out loud.').ok, true);
    assert.equal(avaliarCodigo(CODIGOS[1].rodadas[1], 'This loop counts the items.').ok, true);
    assert.equal(avaliarCodigo(CODIGOS[2].rodadas[0], 'I think the bug is an off by one.').ok, true);
    assert.equal(avaliarCodigo(CODIGOS[2].rodadas[1], 'I will run the example with two items.').ok, true);
    const texto = JSON.stringify(CODIGOS);
    assert.equal(texto.includes('This loop walks the list.'), false);
    assert.equal(texto.includes('I suggest we extract a function.'), false);
  });

  test('o colega pede e oferece ajuda a outra área', () => {
    conferirCena(COLEGAS, ['Pedido', 'Oferta'], avaliarColega);
    assert.equal(COLEGAS.length, 3);
    assert.equal(avaliarColega(COLEGAS[0].rodadas[0], 'Could you review this empty state?').ok, true);
    assert.equal(avaliarColega(COLEGAS[0].rodadas[1], 'I can adjust the spacing if you send the spec.').ok, true);
    assert.equal(avaliarColega(COLEGAS[1].rodadas[0], 'Could you retest the login?').ok, true);
    assert.equal(avaliarColega(COLEGAS[1].rodadas[1], 'I can add the test you need.').ok, true);
    assert.equal(avaliarColega(COLEGAS[2].rodadas[0], 'Which user is this for?').ok, true);
    assert.equal(avaliarColega(COLEGAS[2].rodadas[1], 'I can cut the smaller one.').ok, true);
    const texto = JSON.stringify(COLEGAS);
    assert.equal(texto.includes('Write one test that shows the bug.'), false);
  });

  test('o simulado encadeia treinos que já existem e não muda no mesmo dia', () => {
    const fonte = semTravessao('../js/banca.js');
    assert.equal(fonte.includes('Math.random'), false);
    const cena = montarSimulado('2026-10-28');
    assert.ok(cena);
    assert.equal(cena.rodadas.length, 6);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), ['Abertura', 'Requisito', 'Métrica', 'Decisão', 'Código', 'Fecho']);
    assert.equal(cena.rodadas[5].melhor, 'What does a normal week look like?');
    assert.deepEqual(montarSimulado('2026-10-28'), cena);
    assert.equal(montarSimulado('ontem'), null);
    assert.equal(montarSimulado(''), null);
    for (const rodada of cena.rodadas) {
      assert.equal(avaliarResposta(rodada, rodada.melhor).ok, true, rodada.melhor);
    }
  });

  test('a nota vira uma faixa e cada treino conta no próprio contador', () => {
    assert.equal(notaDoSimulado([100, 50, 0]), 50);
    assert.equal(notaDoSimulado([]), 0);
    assert.equal(faixaDoSimulado(100), 'Pronta para a vaga');
    assert.equal(faixaDoSimulado(70), 'Dá para a call');
    assert.equal(faixaDoSimulado(40), 'Quase na entrevista');
    assert.equal(faixaDoSimulado(0), 'Vale repetir o simulado');

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'sistema1', valor: 0, pago: false }] };
    const sistema = registrarSistema({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(sistema.bonusMissoes, 15);
    assert.equal(estado.stats.sistemas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('sistema'));
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);

    registrarCodigo({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.codigos, 1);
    assert.ok(estado.badges.includes('codigo'));

    registrarColega({
      xp: 26, nota: 90, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.colegas, 1);
    assert.ok(estado.badges.includes('colega'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'simulado1', valor: 0, pago: false }] };
    const simulado = registrarSimulado({
      xp: 58, nota: 80, acertos: 6, respostas: 6, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(simulado.bonusMissoes, 15);
    assert.equal(estado.stats.simulados, 1);
    assert.ok(estado.badges.includes('simulado'));
    assert.ok(BADGES.length >= 81);
  });

  test('a versão 2.18 guarda a faixa na mesma nota do simulado', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(data, /versao: '2\.18'/);
    assert.match(data, /versao: '2\.17'/);
    assert.match(sw, /\.\/js\/banca\.js/);
    const fim = app.slice(app.indexOf('function concluirCena'), app.indexOf('function pintarCenaFala'));
    assert.match(fim, /cfg\.sub/);
    assert.match(fim, /fecharNota/);
    const lista = app.slice(app.indexOf('function pintarCenaLista'), app.indexOf('function telaTecnicos'));
    assert.match(lista, /sub: cfg\.sub/);
    const simulado = app.slice(app.indexOf('function telaSimulado'), app.indexOf('function cartaoSobre'));
    assert.match(simulado, /function pintarSimulado/);
    assert.match(simulado, /faixaDoSimulado/);
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarSimulado'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    assert.match(app, /function telaSistemas/);
  });
});
