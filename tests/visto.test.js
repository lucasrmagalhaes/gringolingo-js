import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  UXS, avaliarUx, FORUNS, avaliarForum, VISTOS, avaliarVisto,
  montarMes, textoDoMes, textoDaSemana, rotuloSemana
} = await import('../js/visto.js');
const { RESPEITOS, DEBITOS, INDICACOES } = await import('../js/respeito.js');
const { PISTAS, CALMAS, FOLGAS, avaliarAberta } = await import('../js/pista.js');
const { GRAFICOS, HANDOFFS, ELEVADORES } = await import('../js/grafico.js');
const { PEDIDOS, COBERTURAS, LOOMS } = await import('../js/caderno.js');
const { CULPAS, RAIOS, OFERTAS } = await import('../js/raio.js');
const { POKERS, LEIGOS, RECRUTAS } = await import('../js/carta.js');
const { MESAS, MIGRAS, ESTREIAS } = await import('../js/rodada.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarUx, registrarForum, registrarVisto, registrarMes, registrarAberta,
  mesclarEstado, exportarEstado, importarEstado
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
  ...INDICACOES.map(c => c.id)
]);

const PROIBIDAS = [
  'Could you review this empty state',
  'Could you review this PR',
  'No rush. The tests passed',
  'I work on Brazil time',
  'I can overlap with your morning',
  'I can start in four weeks',
  'The deploy failed',
  'I respect the plan, and I see a risk',
  'This shortcut is technical debt',
  'Would you be a reference for me'
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

describe('contraste, fórum, visto e o mês', () => {
  test('as três listas não repetem o review, o fuso nem a referência', () => {
    const fonte = semTravessao('../js/visto.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    conferir(UXS, ['Decisão', 'Motivo'], avaliarUx);
    conferir(FORUNS, ['Problema', 'Tentativa'], avaliarForum);
    conferir(VISTOS, ['Pedido', 'Detalhe'], avaliarVisto);
    const ids = [...UXS, ...FORUNS, ...VISTOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const meses = VISTOS.find(c => c.id === 'tresmeses').rodadas[0];
    assert.equal(avaliarVisto(meses, 'I can relocate in 3 months.').ok, true);
    const horas = VISTOS.find(c => c.id === 'brasilremoto').rodadas[1];
    assert.equal(avaliarVisto(horas, 'I can overlap 4 hours with your team.').ok, true);
    const clique = FORUNS.find(c => c.id === 'outronav').rodadas[0];
    assert.equal(avaliarForum(clique, 'The button does nothing on the 2nd click.').ok, true);
    const texto = JSON.stringify({ UXS, FORUNS, VISTOS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Contraste' && f.melhor === 'This gray text fails the contrast check.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Fórum' && f.melhor === 'The list stays empty after I save.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Visto' && f.melhor === 'I need a work visa for this role.'), true);
    const gosto = avaliarAberta('I like the plan because it is clear and so we can ship it.', 4);
    assert.equal(gosto.preenchimentos.includes('like'), false);
  });

  test('contraste, fórum, visto e mês contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'ux1', valor: 0, pago: false }] };
    const ux = registrarUx(fim());
    assert.equal(ux.bonusMissoes, 15);
    assert.equal(estado.stats.uxs, 1);
    assert.equal(estado.stats.foruns, 0);
    assert.equal(estado.stats.colegas, 0);
    assert.ok(estado.badges.includes('ux'));
    assert.equal(estado.badges.includes('colega'), false);
    assert.equal(estado.badges.includes('forum'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'forum1', valor: 0, pago: false }] };
    const forum = registrarForum(fim());
    assert.equal(forum.bonusMissoes, 15);
    assert.equal(estado.stats.foruns, 1);
    assert.equal(estado.stats.slacks, 0);
    assert.ok(estado.badges.includes('forum'));
    assert.equal(estado.badges.includes('slack'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'visto1', valor: 0, pago: false }] };
    const visto = registrarVisto(fim());
    assert.equal(visto.bonusMissoes, 15);
    assert.equal(estado.stats.vistos, 1);
    assert.equal(estado.stats.recrutas, 0);
    assert.equal(estado.stats.ofertas, 0);
    assert.ok(estado.badges.includes('visto'));
    assert.equal(estado.badges.includes('recruta'), false);
    assert.equal(estado.badges.includes('oferta'), false);
    assert.equal(estado.badges.includes('respeito'), false);
    assert.equal(estado.badges.includes('debito'), false);
    assert.equal(estado.badges.includes('indicacao'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
    assert.equal(estado.painel['2026-10-28'].n, 3);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'mes1', valor: 0, pago: false }] };
    const mes = registrarMes({ xp: 10, nota: null, acertos: 0, respostas: 0, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(mes.bonusMissoes, 15);
    assert.equal(estado.stats.meses, 1);
    assert.ok(estado.badges.includes('mes'));
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(estado.painel['2026-10-28'].grupos.revisao, undefined);
    assert.ok(BADGES.length >= 134);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o mês soma quatro semanas e guarda o preenchimento', () => {
    const painel = {
      '2026-10-28': { soma: 80, n: 1, segundos: 120, muletas: 3 },
      '2026-10-29': { soma: 100, n: 1, segundos: 600, muletas: 9 },
      '2026-10-12': { soma: 50, n: 2, segundos: 60, muletas: 1 }
    };
    const plano = montarMes(painel, '2026-10-28');
    assert.deepEqual(plano.map(s => s.inicio), ['2026-10-05', '2026-10-12', '2026-10-19', '2026-10-26']);
    assert.equal(plano[3].nota, 80);
    assert.equal(plano[3].minutos, 2);
    assert.equal(plano[3].muletas, 3);
    assert.equal(plano[3].treinos, 1);
    assert.equal(plano[1].nota, 25);
    assert.equal(plano[1].minutos, 1);
    assert.equal(plano[1].muletas, 1);
    assert.equal(plano[0].nota, null);
    assert.equal(textoDoMes(plano), 'A semana atual está na nota 80. 2 minutos e 3 preenchimentos.');
    assert.equal(textoDaSemana(plano[3]), 'Nota 80. 2 minutos, 3 preenchimentos.');
    assert.equal(textoDaSemana(plano[0]), 'Sem nota nesta semana. 0 minutos, 0 preenchimentos.');
    assert.equal(textoDaSemana({ nota: 70, minutos: 1, muletas: 1 }), 'Nota 70. 1 minuto, 1 preenchimento.');
    assert.equal(rotuloSemana('2026-10-26'), 'Semana de 26 de out');
    assert.equal(rotuloSemana('2026-10-05'), 'Semana de 5 de out');
    const outro = montarMes({}, '2026-01-02');
    assert.deepEqual(outro.map(s => s.inicio), ['2025-12-08', '2025-12-15', '2025-12-22', '2025-12-29']);
    assert.equal(textoDoMes(outro), 'Ainda não há nota neste mês. 0 minutos, 0 preenchimentos.');
    const vazio = montarMes({}, 'nao-e-data');
    assert.equal(vazio.length, 4);
    assert.equal(vazio[0].inicio, '');
    assert.equal(textoDoMes(vazio), 'Ainda não há nota neste mês. 0 minutos, 0 preenchimentos.');
    assert.equal(rotuloSemana(''), 'Semana sem data');

    registrarAberta({ xp: 10, nota: 80, acertos: 1, respostas: 1, perfeita: false, comboMax: 0, errosFala: [], muletas: 3 });
    assert.equal(estado.painel['2026-10-28'].muletas, 3);
    registrarAberta({ xp: 10, nota: 90, acertos: 1, respostas: 1, perfeita: false, comboMax: 0, errosFala: [], muletas: 2 });
    assert.equal(estado.painel['2026-10-28'].muletas, 5);
    registrarUx(fim());
    assert.equal(estado.painel['2026-10-28'].muletas, 5);
    mesclarEstado({ painel: { '2026-10-28': { soma: 10, n: 1, acertos: 1, respostas: 1, muletas: 9, segundos: 10 } } });
    assert.equal(estado.painel['2026-10-28'].muletas, 9);
    const backup = exportarEstado('2.33');
    importarEstado(backup, 'substituir');
    assert.equal(estado.painel['2026-10-28'].muletas, 9);

    limparEstadoMemoria();
    registrarAberta({ xp: 10, nota: 40, acertos: 0, respostas: 1, perfeita: false, comboMax: 0, errosFala: [], muletas: 0 });
    assert.equal(estado.painel['2026-10-28'].muletas, undefined);
    registrarAberta({ xp: 10, nota: 40, acertos: 0, respostas: 1, perfeita: false, comboMax: 0, errosFala: [], muletas: 200001 });
    assert.equal(estado.painel['2026-10-28'].muletas, 200000);
  });

  test('a versão 2.33 deixa o mês fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const game = readFileSync(join(raiz, 'js/game.js'), 'utf8');
    assert.match(data, /versao: '2\.33'/);
    assert.match(data, /versao: '2\.32'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/visto\.js/);
    assert.match(turno, /visto\.js/);
    assert.equal(turno.includes('foco.js'), false);
    assert.match(game, /muletas: d\.muletas/);
    const fecha = app.slice(app.indexOf('function abrirAberta'), app.indexOf('function pintarAberta'));
    assert.match(fecha, /muletas: abertaSessao\.muletas/);
    for (const nome of ['pintarUx', 'pintarForum', 'pintarVisto', 'pintarMes']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarIndicacao'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function cartaoSobre'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarUx'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const novo = app.slice(app.indexOf('function telaUx'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.match(novo, /data-foco/);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /ux: telaUx/);
    assert.match(mapa, /forum: telaForum/);
    assert.match(mapa, /visto: telaVisto/);
    assert.match(mapa, /mes: telaMes/);
  });
});

