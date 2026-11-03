import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RADARS, avaliarRadar, APLAUSOS, avaliarAplauso, GRIPES, avaliarGripe
} = await import('../js/radar.js');
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
  registrarRadar, registrarAplauso, registrarGripe
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
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
  ...GAUCHOS.map(c => c.id)
]);

const PROIBIDAS = [
  'This screen shows the dashboard',
  'This screen shows the user dashboard',
  'Signups grew twenty percent',
  'The error rate fell from five',
  'I will be out the first week',
  'I need the full two weeks off',
  'I have a headache',
  'I have had a fever since yesterday',
  'We will add an alert for this timeout',
  'He shipped the fix',
  'Yesterday I shipped the fix',
  'I shipped the fix with no rollback',
  'Please keep',
  'This query glues the user text into SQL',
  'I live in Rio Grande do Sul'
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

describe('radar, aplauso e gripe', () => {
  test('as três listas não repetem o painel, a folga nem o agradecimento genérico', () => {
    const fonte = semTravessao('../js/radar.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(RADARS, ['Sinal', 'Leitura'], avaliarRadar);
    conferir(APLAUSOS, ['Elogio', 'Nome'], avaliarAplauso);
    conferir(GRIPES, ['Aviso', 'Plano'], avaliarGripe);
    const ids = [...RADARS, ...APLAUSOS, ...GRIPES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const atraso = RADARS.find(c => c.id === 'latenciap95').rodadas[0];
    assert.equal(avaliarRadar(atraso, 'The p95 latency went past 2 seconds.').ok, true);
    const quadros = RADARS.find(c => c.id === 'quadroschart').rodadas[0];
    assert.equal(avaliarRadar(quadros, 'The on call board has 3 charts.').ok, true);
    const consulta = GRIPES.find(c => c.id === 'consultadez').rodadas[0];
    assert.equal(avaliarGripe(consulta, 'My doctor visit is at 10.').ok, true);
    const aplauso = APLAUSOS.find(c => c.id === 'timeapoio').rodadas[0];
    assert.equal(avaliarAplauso(aplauso, "Let's clap for the support team.").ok, true);
    const texto = JSON.stringify({ RADARS, APLAUSOS, GRIPES });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Radar' && f.melhor === 'The p95 latency went past two seconds.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Aplauso' && f.melhor === 'I want to thank the team in public.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Gripe' && f.melhor === 'I am sick today, so I will stay home.'), true);
  });

  test('radar, aplauso e gripe contam no próprio contador', () => {
    travarMissao('radar1');
    const radar = registrarRadar(fim());
    assert.equal(radar.bonusMissoes, 15);
    assert.equal(estado.stats.radares, 1);
    assert.equal(estado.stats.metricas, 0);
    assert.equal(estado.stats.incidentes, 0);
    assert.equal(estado.stats.aplausos, 0);
    assert.ok(estado.badges.includes('radar'));
    for (const id of ['aplauso', 'gripe', 'metrica', 'plantao', 'folga', 'grafico']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('aplauso1');
    const aplauso = registrarAplauso(fim());
    assert.equal(aplauso.bonusMissoes, 15);
    assert.equal(estado.stats.aplausos, 1);
    assert.equal(estado.stats.sociais, 0);
    assert.ok(estado.badges.includes('aplauso'));
    assert.equal(estado.badges.includes('social'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    travarMissao('gripe1');
    const gripe = registrarGripe(fim());
    assert.equal(gripe.bonusMissoes, 15);
    assert.equal(estado.stats.gripes, 1);
    assert.equal(estado.stats.folgas, 0);
    assert.equal(estado.stats.socorros, 0);
    assert.ok(estado.badges.includes('gripe'));
    assert.equal(estado.badges.includes('folga'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.cotidiano, 1);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 145);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 2.36 deixa o radar fora do passeio', () => {
    assert.equal(VERSAO_APP, '2.36');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.36'/);
    assert.match(data, /versao: '2\.35'/);
    assert.match(sw, /gringolingo-v63/);
    assert.match(sw, /\.\/js\/radar\.js/);
    assert.match(turno, /radar\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarRadar', 'pintarAplauso', 'pintarGripe']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaGauchos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaRadares'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /radar: telaRadares/);
    assert.match(mapa, /aplauso: telaAplausos/);
    assert.match(mapa, /gripe: telaGripes/);
    const regra = css.slice(css.indexOf('.hub-item {'), css.indexOf('.hub-item >'));
    assert.match(regra, /content-visibility:\s*auto/);
    assert.match(regra, /contain-intrinsic-size/);
    assert.equal(regra.includes('#'), false);
    const estrela = css.slice(css.indexOf('.estrela-treino {'), css.indexOf('.estrela-treino[aria-pressed'));
    assert.match(estrela, /min-height:\s*44px/);
    assert.equal(estrela.includes('#'), false);
  });
});
