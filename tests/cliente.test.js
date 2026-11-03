import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { SPRINTS, avaliarSprint, SEGUROS, avaliarSeguro, MEETUPS, avaliarMeetup } = await import('../js/cliente.js');
const { PASSOS, montarCompleta, notaDaCompleta, faixaDaCompleta } = await import('../js/completa.js');
const { notaDoSimulado, faixaDoSimulado, SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarSprint, registrarSeguro, registrarMeetup, registrarCompleta
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { NARRAS, BANCOS, RECUSAS } = await import('../js/narra.js');
const { MAPAS, DUROS, PROPOSTAS } = await import('../js/time.js');
const { VIVOS, PRODUTOS, FECHOS } = await import('../js/vivo.js');
const { CULTURAS, AUMENTOS, ROTAS } = await import('../js/cultura.js');
const { FUTUROS } = await import('../js/futuro.js');
const { MODELOS, FUROS, ROTINAS, PAPOS } = await import('../js/lar.js');
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
  ...FUTUROS.map(c => c.id),
  ...CULTURAS.map(c => c.id),
  ...AUMENTOS.map(c => c.id),
  ...ROTAS.map(c => c.id),
  ...VIVOS.map(c => c.id),
  ...PRODUTOS.map(c => c.id),
  ...FECHOS.map(c => c.id),
  ...MAPAS.map(c => c.id),
  ...DUROS.map(c => c.id),
  ...PROPOSTAS.map(c => c.id),
  ...NARRAS.map(c => c.id),
  ...BANCOS.map(c => c.id),
  ...RECUSAS.map(c => c.id)
]);

const PROIBIDAS = [
  'Today I will show',
  'It works with no internet',
  'The progress stays on the phone',
  'This filter finds a word as you type',
  'It answers in under a second',
  'You can search in Portuguese',
  'known hole',
  'I will read the note before I upgrade',
  'The patch closes that hole',
  'I will apply the patch today',
  'I will upgrade this dependency',
  'The tests still pass after the upgrade',
  'I can stay for one drink',
  'I will have a soda',
  'I play the guitar on weekends',
  'I am from Brazil',
  'I miss the food',
  'I am reading the login test',
  'Could you take a look at this loop',
  'Can you drive for a minute',
  'I am stuck on this assertion',
  'Could you walk me through the fixture',
  'I will start with the empty case',
  'Let me read this loop out loud',
  'This loop counts the items',
  'off by one',
  'We went with',
  'The trade-off is',
  'trade off',
  'I propose',
  'The price is',
  'I would rather ship less'
];

const ETAPAS_SIMULADO = ['Abertura', 'Requisito', 'Métrica', 'Decisão', 'Código', 'Fecho'];

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

function fim() {
  return { xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] };
}

describe('sprint, segurança e entrevista completa', () => {
  test('as três listas cabem em duas falas e não repetem o que já existe', () => {
    semTravessao('../js/cliente.js');
    conferir(SPRINTS, ['Entrega', 'Surpresa'], avaliarSprint);
    conferir(SEGUROS, ['Risco', 'Plano'], avaliarSeguro);
    conferir(MEETUPS, ['Oi', 'Assunto'], avaliarMeetup);
    const ids = [...SPRINTS, ...SEGUROS, ...MEETUPS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    assert.equal(ocupados.has('completa'), false);
    const piloto = SPRINTS.find(c => c.id === 'piloto').rodadas[0];
    assert.equal(avaliarSprint(piloto, 'Three teams are on the new screen.').ok, true);
    assert.equal(avaliarSprint(piloto, '3 teams are on the new screen.').ok, true);
    const contato = MEETUPS.find(c => c.id === 'contato').rodadas[0];
    assert.equal(avaliarMeetup(contato, 'May I send you a note after this talk?').ok, true);
    assert.equal(avaliarMeetup(contato, 'I will write tomorrow with the link.').ok, false);
    const texto = JSON.stringify({ SPRINTS, SEGUROS, MEETUPS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
  });

  test('a entrevista encadeia cinco treinos e reusa a nota do simulado', () => {
    semTravessao('../js/completa.js');
    assert.equal(montarCompleta('nope'), null);
    assert.equal(montarCompleta(null), null);
    const cena = montarCompleta('2026-10-28');
    assert.equal(cena.rodadas.length, 5);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), ['Portfólio', 'Sistema', 'Salário', 'STAR', 'Pergunta']);
    assert.deepEqual(cena, montarCompleta('2026-10-28'));
    assert.equal(PASSOS.length, 5);
    for (let i = 0; i < PASSOS.length; i++) {
      const melhores = PASSOS[i].lista.map(c => c.rodadas[0].melhor);
      assert.equal(melhores.includes(cena.rodadas[i].melhor), true, PASSOS[i].id);
      assert.equal(cena.rodadas[i].treino, PASSOS[i].nome);
      assert.equal(ETAPAS_SIMULADO.includes(cena.rodadas[i].etapa), false);
    }
    assert.equal(notaDaCompleta([100, 50]), 75);
    assert.equal(notaDaCompleta([100, 50]), notaDoSimulado([100, 50]));
    assert.equal(notaDaCompleta([]), 0);
    assert.equal(faixaDaCompleta(90), 'Pronta para a vaga');
    assert.equal(faixaDaCompleta(90), faixaDoSimulado(90));
    assert.equal(faixaDaCompleta(70), 'Dá para a call');
    assert.equal(faixaDaCompleta(40), 'Quase na entrevista');
    assert.equal(faixaDaCompleta(0), 'Vale repetir o simulado');
  });

  test('sprint, decisão, meetup e entrevista contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'sprint1', valor: 0, pago: false }] };
    const sprint = registrarSprint(fim());
    assert.equal(sprint.bonusMissoes, 15);
    assert.equal(estado.stats.sprints, 1);
    assert.equal(estado.stats.demos, 0);
    assert.equal(estado.stats.furos, 0);
    assert.equal(estado.stats.sociais, 0);
    assert.equal(estado.stats.simulados, 0);
    assert.equal(estado.stats.pares, 0);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('sprint'));
    assert.equal(estado.badges.includes('seguro'), false);
    assert.equal(estado.badges.includes('meetup'), false);
    assert.equal(estado.badges.includes('completa'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'seguro1', valor: 0, pago: false }] };
    const seguro = registrarSeguro(fim());
    assert.equal(seguro.bonusMissoes, 15);
    assert.equal(estado.stats.seguros, 1);
    assert.equal(estado.stats.furos, 0);
    assert.ok(estado.badges.includes('seguro'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'meetup1', valor: 0, pago: false }] };
    const meetup = registrarMeetup(fim());
    assert.equal(meetup.bonusMissoes, 15);
    assert.equal(estado.stats.meetups, 1);
    assert.equal(estado.stats.sociais, 0);
    assert.ok(estado.badges.includes('meetup'));
    assert.equal(estado.painel['2026-10-28'].grupos.cotidiano, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'completa1', valor: 0, pago: false }] };
    const completa = registrarCompleta(fim());
    assert.equal(completa.bonusMissoes, 15);
    assert.equal(estado.stats.completas, 1);
    assert.equal(estado.stats.simulados, 0);
    assert.ok(estado.badges.includes('completa'));
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
    assert.equal(BADGES.length, 105);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 2.25 deixa as cenas fora do passeio e nomeia os cinco treinos', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.equal(VERSAO_APP, '2.25');
    assert.match(data, /versao: '2\.24'/);
    assert.match(sw, /gringolingo-v52/);
    assert.match(sw, /\.\/js\/cliente\.js/);
    assert.match(sw, /\.\/js\/completa\.js/);
    assert.equal(turno.includes('completa.js'), false);
    assert.equal(turno.includes('montarCompleta'), false);
    for (const nome of ['pintarSprint', 'pintarSeguro', 'pintarMeetup', 'pintarCompleta']) {
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function textoPasseio'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarSprint'), false);
    assert.equal(passeio.includes('function pintarSeguro'), false);
    assert.equal(passeio.includes('function pintarMeetup'), false);
    assert.equal(passeio.includes('function pintarCompleta'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const papo = app.slice(app.indexOf('function telaPapo'), app.indexOf('function telaSimulado'));
    assert.match(papo, /function pintarPapo/);
    assert.match(papo, /montarPapo/);
    assert.equal(papo.includes('function pintarSprint'), false);
    const bloco = app.slice(app.indexOf('function telaCompleta'), app.indexOf('function cartaoSobre'));
    assert.match(bloco, /completa-passos/);
    assert.match(bloco, /Cinco treinos/);
    assert.match(bloco, /Treino /);
    assert.match(bloco, /faixaDaCompleta/);
    assert.equal(bloco.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /sprint: telaSprints/);
    assert.match(mapa, /seguro: telaSeguros/);
    assert.match(mapa, /meetup: telaMeetups/);
    assert.match(mapa, /completa: telaCompleta/);
    assert.match(app, /aria-live.: .polite/);
  });
});
