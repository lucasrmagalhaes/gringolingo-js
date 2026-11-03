import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  GRAFICOS, avaliarGrafico, HANDOFFS, avaliarHandoff, ELEVADORES, avaliarElevador,
  montarJunta, textoDaJunta, avaliarPassoJunta, falaDaMeta
} = await import('../js/grafico.js');
const { PEDIDOS, COBERTURAS, LOOMS } = await import('../js/caderno.js');
const { CULPAS, RAIOS, OFERTAS } = await import('../js/raio.js');
const { POKERS, LEIGOS, RECRUTAS } = await import('../js/carta.js');
const { MESAS, MIGRAS, ESTREIAS } = await import('../js/rodada.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarGrafico, registrarHandoff, registrarElevador, registrarJunta,
  marcarEspaco, revisarDeslize
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { catalogoFaladas } = await import('../js/turno.js');
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
  ...RECUSAS.map(c => c.id),
  ...SPRINTS.map(c => c.id),
  ...SEGUROS.map(c => c.id),
  ...MEETUPS.map(c => c.id),
  ...MESAS.map(c => c.id),
  ...MIGRAS.map(c => c.id),
  ...ESTREIAS.map(c => c.id),
  ...POKERS.map(c => c.id),
  ...LEIGOS.map(c => c.id),
  ...RECRUTAS.map(c => c.id),
  ...CULPAS.map(c => c.id),
  ...RAIOS.map(c => c.id),
  ...OFERTAS.map(c => c.id),
  ...PEDIDOS.map(c => c.id),
  ...COBERTURAS.map(c => c.id),
  ...LOOMS.map(c => c.id)
]);

const PROIBIDAS = [
  'error rate',
  'Signups grew',
  'two hundred new signups',
  'two points lower',
  'Weekly active users',
  'I work on Brazil time',
  'overlap with your morning',
  'the handover',
  'I am a full stack developer',
  'This talk is five minutes',
  'Today I will show',
  'Hi everyone',
  'I would cache this feed',
  'homepage was blank',
  'I built a small app for my bus line'
];

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

describe('gráfico, handoff e elevador', () => {
  test('as três listas não repetem a métrica, o fuso nem a palestra', () => {
    const fonte = semTravessao('../js/grafico.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    conferir(GRAFICOS, ['Leitura', 'Causa'], avaliarGrafico);
    conferir(HANDOFFS, ['Pedido', 'Nota'], avaliarHandoff);
    conferir(ELEVADORES, ['Quem', 'Agora'], avaliarElevador);
    const ids = [...GRAFICOS, ...HANDOFFS, ...ELEVADORES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const barras = GRAFICOS.find(c => c.id === 'barras').rodadas[0];
    assert.equal(avaliarGrafico(barras, 'This chart compares 2 weeks.').ok, true);
    const seis = HANDOFFS.find(c => c.id === 'seis').rodadas[1];
    assert.equal(avaliarHandoff(seis, 'I will be offline after 6.').ok, true);
    const tela = ELEVADORES.find(c => c.id === 'umsegundo').rodadas[1];
    assert.equal(avaliarElevador(tela, 'The home screen opens in 1 second.').ok, true);
    const folha = ELEVADORES.find(c => c.id === 'folha').rodadas[1];
    assert.equal(avaliarElevador(folha, 'It takes 30 seconds to read.').ok, true);
    const texto = JSON.stringify({ GRAFICOS, HANDOFFS, ELEVADORES, a: falaDaMeta(4, 10), b: falaDaMeta(10, 10) });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Gráfico' && f.melhor === 'The line went up this week.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Handoff' && f.melhor === 'Your morning is my evening.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Elevador' && f.melhor === 'I lead the mobile team.'), true);
    assert.equal(catalogo.some(f => f.melhor === 'I still owe minutes this week.'), false);
  });

  test('gráfico, handoff e elevador contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'grafico1', valor: 0, pago: false }] };
    const grafico = registrarGrafico(fim());
    assert.equal(grafico.bonusMissoes, 15);
    assert.equal(estado.stats.graficos, 1);
    assert.equal(estado.stats.metricas, 0);
    assert.equal(estado.stats.handoffs, 0);
    assert.equal(estado.stats.elevadores, 0);
    assert.equal(estado.stats.juntas, 0);
    assert.ok(estado.badges.includes('grafico'));
    assert.equal(estado.badges.includes('metrica'), false);
    assert.equal(estado.badges.includes('handoff'), false);
    assert.equal(estado.badges.includes('elevador'), false);
    assert.equal(estado.badges.includes('junta'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'handoff1', valor: 0, pago: false }] };
    const handoff = registrarHandoff(fim());
    assert.equal(handoff.bonusMissoes, 15);
    assert.equal(estado.stats.handoffs, 1);
    assert.equal(estado.stats.recrutas, 0);
    assert.ok(estado.badges.includes('handoff'));
    assert.equal(estado.badges.includes('recruta'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'elevador1', valor: 0, pago: false }] };
    const elevador = registrarElevador(fim());
    assert.equal(elevador.bonusMissoes, 15);
    assert.equal(estado.stats.elevadores, 1);
    assert.equal(estado.stats.raios, 0);
    assert.ok(estado.badges.includes('elevador'));
    assert.equal(estado.badges.includes('raio'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
    assert.ok(BADGES.length >= 123);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a semana junta vocabulário, frases vencidas e a meta', () => {
    const vazio = montarJunta({ erros: [], agenda: {}, hoje: '2026-10-28', minutos: 0, meta: 10 });
    assert.equal(vazio.passos.length, 1);
    assert.equal(vazio.passos[0].tipo, 'meta');
    assert.equal(vazio.passos[0].melhor, 'I still owe minutes this week.');
    assert.match(textoDaJunta(vazio), /Ainda não há palavra nem frase vencida/);
    assert.equal(falaDaMeta(10, 10).melhor, 'I met the minute goal this week.');
    assert.equal(avaliarPassoJunta(falaDaMeta(10, 10), 'I met the minute goal this week.').ok, true);
    assert.equal(avaliarPassoJunta({ tipo: 'palavra', en: 'cache' }, 'keep cache').ok, false);
    assert.equal(avaliarPassoJunta({ tipo: 'palavra', en: 'cache' }, 'please keep cache').ok, true);

    const cheio = montarJunta({
      erros: [
        { en: 'The cache failed on the timeout', pt: 'o cache falhou', n: 2 },
        { en: 'alphaone', n: 1 },
        { en: 'alphatwo', n: 1 },
        { en: 'alphathree', n: 1 },
        { en: 'alphafour', n: 1 }
      ],
      agenda: {},
      hoje: '2026-10-28',
      minutos: 4,
      meta: 10
    });
    assert.equal(cheio.palavras, 3);
    assert.equal(cheio.frases, 1);
    assert.equal(cheio.passos.at(-1).tipo, 'meta');
    assert.equal(cheio.passos.filter(p => p.tipo === 'frase').length, 1);
    assert.equal(cheio.passos.some(p => p.tipo === 'palavra' && p.en === 'alphafour'), false);
    const frase = cheio.passos.find(p => p.tipo === 'frase');
    assert.equal(avaliarPassoJunta(frase, frase.en).ok, true);
    assert.equal(frase.en.includes('cache'), true);
    marcarEspaco(frase.en, frase.pt);
    revisarDeslize(frase.en, true);
    assert.ok(estado.agendaFala[frase.en].proxima > '2026-10-28');

    estado.errosFala = [{ en: frase.en, pt: frase.pt, n: 2 }];
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'junta1', valor: 0, pago: false }] };
    const fechou = registrarJunta({
      xp: 18, nota: 100, acertos: 1, respostas: cheio.passos.length, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(fechou.bonusMissoes, 15);
    assert.equal(estado.stats.juntas, 1);
    assert.equal(estado.stats.cadernos, 0);
    assert.equal(estado.stats.espacos, 0);
    assert.equal(estado.errosFala.length, 1);
    assert.equal(estado.errosFala[0].n, 2);
    assert.ok(estado.badges.includes('junta'));
    assert.equal(estado.painel['2026-10-28'].grupos.revisao, 1);
  });

  test('a versão 2.30 deixa a semana junta fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /versao: '2\.30'/);
    assert.match(data, /versao: '2\.29'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/grafico\.js/);
    assert.match(turno, /grafico\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarGrafico', 'pintarHandoff', 'pintarElevador', 'pintarJunta']) {
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function textoPasseio'), nome);
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarCaderno'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function cartaoSobre'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarJunta'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const junta = app.slice(app.indexOf('function pintarJunta'), app.indexOf('function cartaoSobre'));
    assert.match(junta, /Ainda não há palavra nem frase vencida|textoDaJunta/);
    assert.match(junta, /COMEÇAR/);
    assert.match(junta, /CONFERIR/);
    assert.match(junta, /data-foco/);
    assert.match(junta, /campo\.entrada\.focus/);
    const fecha = app.slice(app.indexOf('function concluirJunta'), app.indexOf('function pintarJunta'));
    assert.match(fecha, /errosFala: \[\]/);
    assert.match(junta, /revisarDeslize/);
    assert.match(app.slice(app.indexOf('function abrirJunta'), app.indexOf('function concluirJunta')), /marcarEspaco/);
    assert.equal(junta.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /grafico: telaGraficos/);
    assert.match(mapa, /handoff: telaHandoffs/);
    assert.match(mapa, /elevador: telaElevadores/);
    assert.match(mapa, /junta: telaJunta/);
    const sub = app.slice(app.indexOf('function subDoTreino'), app.indexOf('function abrirTreino'));
    assert.match(sub, /textoDaJunta/);
  });
});
