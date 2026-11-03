import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { diaDaTrilha, textoDoDia, DIAS_TRILHA } = await import('../js/trilha.js');
const {
  CULTURAS, avaliarCultura,
  AUMENTOS, avaliarAumento,
  ROTAS, avaliarRota
} = await import('../js/cultura.js');
const {
  estado, limparEstadoMemoria, definirAgora, mesclarEstado,
  registrarCultura, registrarAumento, registrarRota
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { FUTUROS } = await import('../js/futuro.js');
const { MODELOS, FUROS, ROTINAS, PAPOS } = await import('../js/lar.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const { PALESTRAS, DUVIDAS, SINAIS } = await import('../js/plateia.js');
const { FALHAS, MENTORIAS, SOCORROS } = await import('../js/guia.js');
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
  ...COLEGAS.map(c => c.id),
  ...MODELOS.map(c => c.id),
  ...FUROS.map(c => c.id),
  ...ROTINAS.map(c => c.id),
  ...PAPOS.map(c => c.id),
  ...FUTUROS.map(c => c.id)
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
  assert.equal(arquivo.includes('Math.random'), false, caminho);
  return arquivo;
}

function conferir(lista, etapas, avaliar) {
  assert.equal(lista.length, 3);
  assert.equal(new Set(lista.map(c => c.id)).size, 3);
  for (const cena of lista) {
    assert.equal(ocupados.has(cena.id), false, cena.id);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), etapas);
    for (const rodada of cena.rodadas) {
      assert.equal(avaliar(rodada, rodada.melhor).ok, true, rodada.melhor);
      assert.equal(avaliar(rodada, 'hello').ok, false);
    }
  }
}

describe('trilha, cultura, aumento e API', () => {
  test('o dia da trilha acompanha o calendário', () => {
    semTravessao('../js/trilha.js');
    assert.equal(DIAS_TRILHA, 30);
    const hoje = diaDaTrilha('2026-11-03', '2026-11-03');
    assert.equal(hoje.dia, 1);
    assert.equal(hoje.concluida, false);
    assert.equal(textoDoDia(hoje), 'Dia 1 de 30.');
    const quarto = diaDaTrilha('2026-10-31', '2026-11-03');
    assert.equal(quarto.dia, 4);
    assert.equal(quarto.concluida, false);
    const ultimo = diaDaTrilha('2026-10-05', '2026-11-03');
    assert.equal(ultimo.dia, 30);
    assert.equal(ultimo.concluida, false);
    const fim = diaDaTrilha('2026-10-04', '2026-11-03');
    assert.equal(fim.dia, 30);
    assert.equal(fim.concluida, true);
    assert.match(textoDoDia(fim), /Trilha completa/);
    assert.equal(diaDaTrilha('2026-11-05', '2026-11-03').dia, 1);
    assert.equal(diaDaTrilha('2026-02-31', '2026-11-03').dia, 1);
    assert.equal(diaDaTrilha('', '').dia, 1);
  });

  test('esporte, filme e série não repetem a rotina de casa', () => {
    semTravessao('../js/cultura.js');
    conferir(CULTURAS, ['Assunto', 'Detalhe'], avaliarCultura);
    assert.equal(avaliarCultura(CULTURAS[0].rodadas[0], 'I watched the game with my friends.').ok, true);
    assert.equal(avaliarCultura(CULTURAS[1].rodadas[0], 'The ending of the movie surprised me.').ok, true);
    assert.equal(avaliarCultura(CULTURAS[2].rodadas[1], 'Each episode is about 40 minutes.').ok, true);
    const texto = JSON.stringify(CULTURAS);
    assert.equal(texto.includes('We watched a movie after dinner'), false);
    assert.equal(texto.includes('I play the guitar'), false);
  });

  test('o aumento fala da promoção e da conquista', () => {
    conferir(AUMENTOS, ['Pedido', 'Prova'], avaliarAumento);
    assert.equal(avaliarAumento(AUMENTOS[0].rodadas[0], 'I would like to talk about a raise.').ok, true);
    assert.equal(avaliarAumento(AUMENTOS[1].rodadas[0], 'I am ready for the next role.').ok, true);
    assert.equal(avaliarAumento(AUMENTOS[2].rodadas[0], 'I shipped the feature on time.').ok, true);
    const texto = JSON.stringify(AUMENTOS);
    assert.equal(texto.includes('90 to 100 thousand'), false);
    assert.equal(texto.includes('In five years I want to lead a small team'), false);
    assert.equal(texto.includes('Health insurance'), false);
  });

  test('a API explica rota, status e token', () => {
    conferir(ROTAS, ['Rota', 'Detalhe'], avaliarRota);
    assert.equal(avaliarRota(ROTAS[0].rodadas[0], 'This endpoint returns the list of users.').ok, true);
    assert.equal(avaliarRota(ROTAS[0].rodadas[1], 'The path is /users.').ok, true);
    assert.equal(avaliarRota(ROTAS[1].rodadas[0], 'A 404 means the resource was not found.').ok, true);
    assert.equal(avaliarRota(ROTAS[1].rodadas[1], 'A 201 means the resource was created.').ok, true);
    assert.equal(avaliarRota(ROTAS[2].rodadas[0], 'The token goes in the Authorization header.').ok, true);
    assert.equal(avaliarRota(ROTAS[2].rodadas[1], 'Without a token the request returns 401.').ok, true);
    const texto = JSON.stringify(ROTAS);
    assert.equal(texto.includes('I am a full stack developer'), false);
  });

  test('cada treino conta no próprio contador e a trilha mescla pela data mais antiga', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'cultura1', valor: 0, pago: false }] };
    const cultura = registrarCultura({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(cultura.bonusMissoes, 15);
    assert.equal(estado.stats.culturas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('cultura'));
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'aumento1', valor: 0, pago: false }] };
    const aumento = registrarAumento({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(aumento.bonusMissoes, 15);
    assert.equal(estado.stats.aumentos, 1);
    assert.ok(estado.badges.includes('aumento'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'rota1', valor: 0, pago: false }] };
    const rota = registrarRota({
      xp: 26, nota: 90, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(rota.bonusMissoes, 15);
    assert.equal(estado.stats.rotas, 1);
    assert.ok(estado.badges.includes('rota'));
    assert.ok(BADGES.length >= 89);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);

    estado.trilhaInicio = '2026-11-01';
    mesclarEstado({ trilhaInicio: '2026-10-01' });
    assert.equal(estado.trilhaInicio, '2026-10-01');
    mesclarEstado({ trilhaInicio: '2026-12-01' });
    assert.equal(estado.trilhaInicio, '2026-10-01');
    mesclarEstado({ trilhaInicio: 'ontem' });
    assert.equal(estado.trilhaInicio, '2026-10-01');
  });

  test('a versão 2.21 mostra o dia da trilha fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(data, /versao: '2\.21'/);
    assert.match(data, /versao: '2\.20'/);
    assert.match(sw, /\.\/js\/trilha\.js/);
    assert.match(sw, /\.\/js\/cultura\.js/);
    const bloco = app.slice(app.indexOf('function cartaoTrilha'), app.indexOf('function cartaoComNivel'));
    assert.match(bloco, /trilha-dia/);
    assert.match(bloco, /textoDoDia/);
    assert.match(bloco, /aria-controls/);
    assert.match(bloco, /treinoRecomendado/);
    const pintar = app.slice(app.indexOf('function pintarListaHub'), app.indexOf('function garantirTrilha'));
    assert.match(pintar, /replaceChildren/);
    assert.equal(pintar.includes('telaConversa'), false);
    assert.equal(pintar.includes('innerHTML'), false);
    assert.match(app, /function telaCulturas/);
    assert.match(app, /function telaAumentos/);
    assert.match(app, /function telaRotas/);
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarCultura'), false);
    assert.equal(passeio.includes('function pintarRota'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
  });
});
