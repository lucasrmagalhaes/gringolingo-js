import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { FALHAS, avaliarFalha, MENTORIAS, avaliarMentoria, SOCORROS, avaliarSocorro } = await import('../js/guia.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarFalha, registrarMentoria, registrarSocorro,
  exportarEstado, importarEstado, resumoBackup, textoResumoBackup, nomeArquivoBackup, LIMITE_BACKUP
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
  ...PASSEIOS.map(c => c.id)
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

describe('falha, mentoria, socorro e backup', () => {
  test('a falha explica deploy, CI e permissão', () => {
    semTravessao('../js/guia.js');
    conferirCena(FALHAS, ['Sintoma', 'Causa'], avaliarFalha);
    assert.equal(FALHAS.length, 3);
    assert.equal(avaliarFalha(FALHAS[0].rodadas[0], 'The deploy failed on the test step.').ok, true);
    assert.equal(avaliarFalha(FALHAS[0].rodadas[1], 'The tests failed, so the deploy did not start.').ok, true);
    assert.equal(avaliarFalha(FALHAS[1].rodadas[1], 'One test still expects the old copy.').ok, true);
    assert.equal(avaliarFalha(FALHAS[2].rodadas[0], 'The upload failed with permission denied.').ok, true);
    assert.equal(avaliarFalha(FALHAS[2].rodadas[1], 'This token can read, but it cannot write.').ok, true);
    const texto = JSON.stringify(FALHAS);
    assert.equal(texto.includes('I shipped the fix with no rollback plan'), false);
    assert.equal(texto.includes('the release went well because the rollback was ready'), false);
  });

  test('a mentoria dá a dica e a ideia', () => {
    conferirCena(MENTORIAS, ['Dica', 'Ideia'], avaliarMentoria);
    assert.equal(MENTORIAS.length, 3);
    assert.equal(avaliarMentoria(MENTORIAS[0].rodadas[0], 'Name the function for the one job it does.').ok, true);
    assert.equal(avaliarMentoria(MENTORIAS[1].rodadas[0], 'Write one test that shows the bug.').ok, true);
    assert.equal(avaliarMentoria(MENTORIAS[1].rodadas[1], 'The test tells you when the bug is gone.').ok, true);
    assert.equal(avaliarMentoria(MENTORIAS[2].rodadas[0], 'Change one file, then run the tests.').ok, true);
    assert.equal(avaliarMentoria(MENTORIAS[2].rodadas[1], 'A small change is easier to undo.').ok, true);
  });

  test('o socorro pede farmácia, médico e emergência sem repetir a clínica', () => {
    conferirCena(SOCORROS, ['Pedido', 'Detalhe'], avaliarSocorro);
    assert.equal(SOCORROS.length, 3);
    assert.equal(avaliarSocorro(SOCORROS[0].rodadas[0], 'I need something for a sore throat.').ok, true);
    assert.equal(avaliarSocorro(SOCORROS[0].rodadas[1], 'I am allergic to penicillin.').ok, true);
    assert.equal(avaliarSocorro(SOCORROS[1].rodadas[0], 'I have had a fever since yesterday.').ok, true);
    assert.equal(avaliarSocorro(SOCORROS[2].rodadas[0], 'Please call an ambulance.').ok, true);
    assert.equal(avaliarSocorro(SOCORROS[2].rodadas[1], 'My friend cannot breathe.').ok, true);
    const texto = JSON.stringify(SOCORROS);
    assert.equal(texto.includes('I have a headache'), false);
    assert.equal(texto.includes('I have an appointment'), false);
    assert.equal(texto.includes('Take one pill after breakfast'), false);
  });

  test('falha e socorro contam no progresso sem virar diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'falha1', valor: 0, pago: false }] };
    const falha = registrarFalha({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(falha.bonusMissoes, 15);
    assert.equal(estado.stats.falhas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.equal(estado.painel['2026-10-28'].n, 1);
    assert.ok(estado.badges.includes('falha'));
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);

    registrarMentoria({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.mentorias, 1);
    assert.ok(estado.badges.includes('mentoria'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'socorro1', valor: 0, pago: false }] };
    const socorro = registrarSocorro({
      xp: 26, nota: 90, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(socorro.bonusMissoes, 15);
    assert.equal(estado.stats.socorros, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('socorro'));
    assert.ok(BADGES.length >= 74);
  });

  test('o backup resume o arquivo e recusa lista no lugar das lições', () => {
    estado.xp = 40;
    estado.streak = 3;
    estado.licoes = { a: { estrelas: 1 }, b: { estrelas: 2 } };
    const arquivo = exportarEstado('2.16');
    assert.equal(arquivo.app, 'gringolingo');
    assert.equal(arquivo.versaoApp, '2.16');
    assert.equal(arquivo.estado.xp, 40);
    const resumo = resumoBackup(arquivo);
    assert.equal(resumo.xp, 40);
    assert.equal(resumo.licoes, 2);
    assert.equal(resumo.streak, 3);
    assert.equal(resumo.versaoApp, '2.16');
    assert.match(textoResumoBackup(resumo), /40 XP, 2 lições, sequência 3/);
    assert.equal(nomeArquivoBackup('2026-11-03T15:00:00.000Z', '2.16'), 'gringolingo-2.16-2026-11-03.json');
    assert.equal(nomeArquivoBackup('ontem', ''), 'gringolingo-app-sem-data.json');
    assert.equal(resumoBackup({ xp: 1, licoes: [] }), null);
    assert.equal(resumoBackup(null), null);
    assert.equal(textoResumoBackup(null), 'Arquivo não parece um backup do GringoLingo');
    assert.throws(() => importarEstado({ xp: 1, licoes: [] }), /backup do GringoLingo/);
    const antigo = resumoBackup({ xp: 4, licoes: {} });
    assert.equal(antigo.xp, 4);
    assert.equal(antigo.quando, null);
    assert.equal(LIMITE_BACKUP, 1000000);
    importarEstado({ xp: 9, licoes: { c: { estrelas: 1 } }, streak: 1 }, 'substituir');
    assert.equal(estado.xp, 9);
  });

  test('a versão 2.16 divide o treino de fala e antecipa a fonte', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const html = readFileSync(join(raiz, 'index.html'), 'utf8');
    assert.match(data, /versao: '2\.16'/);
    assert.match(data, /versao: '2\.15'/);
    assert.match(sw, /\.\/js\/guia\.js/);
    assert.match(app, /function listarCena/);
    assert.match(app, /function abrirCenaLista/);
    assert.match(app, /function pintarCenaLista/);
    assert.match(app, /nomeArquivoBackup/);
    assert.match(app, /textoResumoBackup/);
    assert.match(html, /rel="preload" href="css\/fontes\/nunito-latin\.woff2" as="font"/);
    const ajuda = app.slice(app.indexOf('function abrirCenaLista'), app.indexOf('function pintarCenaLista'));
    assert.match(ajuda, /novaCena/);
    const pintura = app.slice(app.indexOf('function pintarCenaLista'), app.indexOf('function telaTecnicos'));
    assert.match(pintura, /tituloFim/);
    assert.match(pintura, /xpBase/);
  });
});
