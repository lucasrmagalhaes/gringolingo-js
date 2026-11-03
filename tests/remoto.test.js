import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PMS, avaliarPm, LAUDOS, avaliarLaudo, RUMOS, avaliarRumo
} = await import('../js/remoto.js');
const { RADARS, APLAUSOS, GRIPES } = await import('../js/radar.js');
const { balancoDaSemana, textoDoBalanco } = await import('../js/semana.js');
const { BRECHAS, MUDAS, GAUCHOS } = await import('../js/brecha.js');
const { FACILS, ESCOLHAS, SABADOS } = await import('../js/facil.js');
const { UXS, FORUNS, VISTOS } = await import('../js/visto.js');
const { RESPEITOS, DEBITOS, INDICACOES } = await import('../js/respeito.js');
const { PISTAS, CALMAS, FOLGAS } = await import('../js/pista.js');
const { GRAFICOS, HANDOFFS, ELEVADORES } = await import('../js/grafico.js');
const { PEDIDOS, COBERTURAS, LOOMS } = await import('../js/caderno.js');
const { CULPAS, RAIOS, OFERTAS } = await import('../js/raio.js');
const { POKERS, LEIGOS, RECRUTAS } = await import('../js/carta.js');
const { MESAS, MIGRAS, ESTREIAS } = await import('../js/rodada.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPm, registrarLaudo, registrarRumo
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { catalogoFaladas, GESTORES, FINAIS, VIAGENS } = await import('../js/turno.js');
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
  ...LOOMS.map(c => c.id),
  ...GRAFICOS.map(c => c.id),
  ...HANDOFFS.map(c => c.id),
  ...ELEVADORES.map(c => c.id),
  ...PISTAS.map(c => c.id),
  ...CALMAS.map(c => c.id),
  ...FOLGAS.map(c => c.id),
  ...RESPEITOS.map(c => c.id),
  ...DEBITOS.map(c => c.id),
  ...INDICACOES.map(c => c.id),
  ...UXS.map(c => c.id),
  ...FORUNS.map(c => c.id),
  ...VISTOS.map(c => c.id),
  ...FACILS.map(c => c.id),
  ...ESCOLHAS.map(c => c.id),
  ...SABADOS.map(c => c.id),
  ...BRECHAS.map(c => c.id),
  ...MUDAS.map(c => c.id),
  ...GAUCHOS.map(c => c.id),
  ...RADARS.map(c => c.id),
  ...APLAUSOS.map(c => c.id),
  ...GRIPES.map(c => c.id)
]);

const PROIBIDAS = [
  'Could we move the deadline to Friday',
  'Could we move the export to next week',
  'I would suggest we ship search first',
  'I would suggest we cut the chart',
  'This change adds two weeks',
  'The new screen was not in the agreed scope',
  'Checkout is failing for new orders',
  'It started about 20 minutes ago',
  'The homepage was blank for twenty minutes',
  'I shipped the fix with no rollback',
  'Thanks for the feedback',
  'I will write the tests earlier',
  'What does success look like in the first 90 days',
  'Ana owns the note by Friday',
  'We will add an alert for this timeout',
  'Please keep',
  'Let us open with the goal'
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

function travarMissao(id) {
  estado.missoes = { dia: '2026-10-28', progresso: [{ id, valor: 0, pago: false }] };
}

describe('prazo com o PM, laudo e rumo', () => {
  test('as três listas não repetem o corte de sexta nem o post ao vivo', () => {
    const fonte = semTravessao('../js/remoto.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(PMS, ['Data', 'Troca'], avaliarPm);
    conferir(LAUDOS, ['Fato', 'Ação'], avaliarLaudo);
    conferir(RUMOS, ['Pedido', 'Passo'], avaliarRumo);
    const ids = [...PMS, ...LAUDOS, ...RUMOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const folego = PMS.find(c => c.id === 'folego').rodadas[0];
    assert.equal(avaliarPm(folego, 'The review still needs 2 days.').ok, true);
    const troca = PMS.find(c => c.id === 'semteste').rodadas[1];
    assert.equal(avaliarPm(troca, "I'd rather move the date than skip the tests.").ok, true);
    const doze = LAUDOS.find(c => c.id === 'dozemin').rodadas[0];
    assert.equal(avaliarLaudo(doze, 'Checkout failed for 12 minutes.').ok, true);
    const nove = LAUDOS.find(c => c.id === 'dozemin').rodadas[1];
    assert.equal(avaliarLaudo(nove, 'The deploy started at 9.').ok, true);
    const texto = JSON.stringify({ PMS, LAUDOS, RUMOS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'PM' && f.melhor === 'The review still needs two days.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Laudo' && f.melhor === 'The root cause was a missing index.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Rumo' && f.melhor === 'I would like feedback on my growth.'), true);
  });

  test('prazo, laudo e rumo contam no próprio contador', () => {
    travarMissao('pm1');
    const pm = registrarPm(fim());
    assert.equal(pm.bonusMissoes, 15);
    assert.equal(estado.stats.pms, 1);
    assert.equal(estado.stats.negociacoes, 0);
    assert.equal(estado.stats.produtos, 0);
    assert.equal(estado.stats.laudos, 0);
    assert.ok(estado.badges.includes('pm'));
    for (const id of ['laudo', 'rumo', 'prazo', 'produto', 'vivo', 'gestor']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('laudo1');
    const laudo = registrarLaudo(fim());
    assert.equal(laudo.bonusMissoes, 15);
    assert.equal(estado.stats.laudos, 1);
    assert.equal(estado.stats.vivos, 0);
    assert.equal(estado.stats.culpas, 0);
    assert.ok(estado.badges.includes('laudo'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    travarMissao('rumo1');
    const rumo = registrarRumo(fim());
    assert.equal(rumo.bonusMissoes, 15);
    assert.equal(estado.stats.rumos, 1);
    assert.equal(estado.stats.gestores, 0);
    assert.equal(estado.stats.futuros, 0);
    assert.ok(estado.badges.includes('rumo'));
    assert.equal(estado.badges.includes('gestor'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.ok(BADGES.length >= 148);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o balanço da semana aponta o grupo com menos prática', () => {
    assert.equal(textoDoBalanco({ minutos: 0, meta: 10, treinos: 0, menorTitulo: 'Trabalho' }), '0 de 10 minutos. 0 treinos nesta semana. Menos prática em Trabalho.');
    assert.equal(textoDoBalanco({ minutos: 1, meta: 10, treinos: 1, menorTitulo: 'Pronúncia' }), '1 de 10 minutos. 1 treino nesta semana. Menos prática em Pronúncia.');
    assert.equal(textoDoBalanco({ minutos: 3, meta: 0, treinos: 2, menorTitulo: '' }), '3 minutos. 2 treinos nesta semana.');
    const vazio = balancoDaSemana(null, '2026-10-28', 10);
    assert.equal(vazio.minutos, 0);
    assert.equal(vazio.treinos, 0);
    assert.equal(vazio.menor.id, 'trabalho');
    assert.equal(vazio.pct, 0);
    const cheio = balancoDaSemana({
      '2026-10-26': { segundos: 120, n: 2, grupos: { trabalho: 2 } },
      '2026-10-28': { segundos: 60, n: 1, grupos: { entrevista: 1 } },
      '2026-11-02': { segundos: 600, n: 9, grupos: { trabalho: 9 } }
    }, '2026-10-28', 10);
    assert.equal(cheio.minutos, 3);
    assert.equal(cheio.treinos, 3);
    assert.equal(cheio.menor.id, 'cotidiano');
    assert.equal(cheio.pct, 30);
    assert.equal(cheio.texto, '3 de 10 minutos. 3 treinos nesta semana. Menos prática em Dia a dia.');
  });

  test('a versão 2.37 deixa o PM fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.37'/);
    assert.match(data, /versao: '2\.36'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/remoto\.js/);
    assert.match(turno, /remoto\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPm', 'pintarLaudo', 'pintarRumo']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaGripes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaPms'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /pm: telaPms/);
    assert.match(mapa, /laudo: telaLaudos/);
    assert.match(mapa, /rumo: telaRumos/);
    const semana = app.slice(app.indexOf('function cartaoSemana'), app.indexOf('function telaPainel'));
    assert.match(semana, /role: 'meter'/);
    const painel = app.slice(app.indexOf('function telaPainel'), app.indexOf('function telaPainel') + 1800);
    assert.match(painel, /Notas dos últimos 7 dias/);
    const regra = css.slice(css.indexOf('.balanco {'), css.indexOf('.balanco .btn'));
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
  });
});

