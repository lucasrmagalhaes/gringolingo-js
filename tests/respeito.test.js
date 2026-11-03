import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RESPEITOS, avaliarRespeito, DEBITOS, avaliarDebito, INDICACOES, avaliarIndicacao
} = await import('../js/respeito.js');
const {
  PISTAS, CALMAS, FOLGAS, avaliarAberta, textoDaAberta, textoDoPreenchimento, textoDosConectores
} = await import('../js/pista.js');
const { GRAFICOS, HANDOFFS, ELEVADORES } = await import('../js/grafico.js');
const { PEDIDOS, COBERTURAS, LOOMS } = await import('../js/caderno.js');
const { CULPAS, RAIOS, OFERTAS } = await import('../js/raio.js');
const { POKERS, LEIGOS, RECRUTAS } = await import('../js/carta.js');
const { MESAS, MIGRAS, ESTREIAS } = await import('../js/rodada.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRespeito, registrarDebito, registrarIndicacao
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
  ...FOLGAS.map(c => c.id)
]);

const PROIBIDAS = [
  'I disagree because the tests still fail',
  'I disagree because the extra screen can wait',
  'I see it differently because Friday',
  'I propose we write each job to a queue',
  'I still prefer the queue',
  'however the page is still slow',
  'I am a full stack developer',
  'I can start in four weeks',
  'I will be offline after six'
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

describe('respeito, dívida e indicação', () => {
  test('as três listas não repetem o consenso, a proposta nem o conector', () => {
    const fonte = semTravessao('../js/respeito.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    conferir(RESPEITOS, ['Ponto', 'Caminho'], avaliarRespeito);
    conferir(DEBITOS, ['Dívida', 'Tempo'], avaliarDebito);
    conferir(INDICACOES, ['Pedido', 'Contexto'], avaliarIndicacao);
    const ids = [...RESPEITOS, ...DEBITOS, ...INDICACOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const tipo = RESPEITOS.find(c => c.id === 'tipocomum').rodadas[1];
    assert.equal(avaliarRespeito(tipo, '1 shared type would be simpler for both teams.').ok, true);
    const fila = RESPEITOS.find(c => c.id === 'empurra').rodadas[1];
    assert.equal(avaliarRespeito(fila, 'Could we keep the queue in 1 service?').ok, true);
    const sprints = DEBITOS.find(c => c.id === 'duasprints').rodadas[0];
    assert.equal(avaliarDebito(sprints, 'I need 2 sprints to refactor this.').ok, true);
    const semana = DEBITOS.find(c => c.id === 'duasprints').rodadas[1];
    assert.equal(avaliarDebito(semana, 'The user facing work can wait 1 week.').ok, true);
    const texto = JSON.stringify({ RESPEITOS, DEBITOS, INDICACOES });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Respeito' && f.melhor === 'I respect the plan, and I see a risk.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Dívida' && f.melhor === 'This shortcut is technical debt.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Indicação' && f.melhor === 'Would you be a reference for me?'), true);
  });

  test('respeito, dívida e indicação contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'respeito1', valor: 0, pago: false }] };
    const respeito = registrarRespeito(fim());
    assert.equal(respeito.bonusMissoes, 15);
    assert.equal(estado.stats.respeitos, 1);
    assert.equal(estado.stats.consensos, 0);
    assert.equal(estado.stats.debitos, 0);
    assert.equal(estado.stats.indicacoes, 0);
    assert.ok(estado.badges.includes('respeito'));
    assert.equal(estado.badges.includes('consenso'), false);
    assert.equal(estado.badges.includes('decisao'), false);
    assert.equal(estado.badges.includes('proposta'), false);
    assert.equal(estado.badges.includes('ligacao'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'debito1', valor: 0, pago: false }] };
    const debito = registrarDebito(fim());
    assert.equal(debito.bonusMissoes, 15);
    assert.equal(estado.stats.debitos, 1);
    assert.equal(estado.stats.propostas, 0);
    assert.ok(estado.badges.includes('debito'));
    assert.equal(estado.badges.includes('mapa'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'indicacao1', valor: 0, pago: false }] };
    const indicacao = registrarIndicacao(fim());
    assert.equal(indicacao.bonusMissoes, 15);
    assert.equal(estado.stats.indicacoes, 1);
    assert.equal(estado.stats.recrutas, 0);
    assert.ok(estado.badges.includes('indicacao'));
    assert.equal(estado.badges.includes('recruta'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
    assert.equal(BADGES.length, 130);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('as perguntas abertas marcam preenchimento e sugerem conectores', () => {
    const cheio = 'Um, like, basically the service was slow and I waited.';
    const aval = avaliarAberta(cheio, 9);
    assert.equal(aval.ok, true);
    assert.equal(aval.nota, 100);
    assert.equal(aval.segundos, 9);
    assert.deepEqual(aval.preenchimentos, ['um', 'like', 'basically']);
    assert.equal(aval.partes.filter(p => p.preenchimento).length, 3);
    assert.equal(textoDoPreenchimento(aval), 'Preenchimento: um, like, basically.');
    assert.deepEqual(aval.conectores, ['because', 'so']);
    assert.equal(textoDosConectores(aval), 'Conectores que cabem: because, so.');
    assert.equal(textoDaAberta(aval).startsWith(`${aval.palavras} palavras em 9 segundos.`), true);

    const verbo = avaliarAberta('I like the plan because it is clear and so we can ship it.', 4);
    assert.equal(verbo.preenchimentos.includes('like'), false);
    assert.equal(verbo.conectores.includes('because'), false);
    assert.equal(verbo.conectores.includes('so'), false);
    assert.deepEqual(verbo.conectores, ['for example', 'first']);
    assert.equal(textoDoPreenchimento(verbo), 'Nenhum preenchimento.');

    const pronto = avaliarAberta('I started first because the bug was clear so for example I wrote a note today.', 6);
    assert.deepEqual(pronto.conectores, []);
    assert.equal(textoDosConectores(pronto), 'Os conectores já entraram.');
    assert.equal(avaliarAberta('I saw something slow today and then I waited more.', 2).conectores[1], 'so');
  });

  test('a versão 2.32 deixa o respeito fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.equal(VERSAO_APP, '2.32');
    assert.match(data, /versao: '2\.31'/);
    assert.match(sw, /gringolingo-v59/);
    assert.match(sw, /\.\/js\/respeito\.js/);
    assert.match(turno, /respeito\.js/);
    assert.equal(turno.includes('foco.js'), false);
    const regra = css.slice(css.indexOf('.preenchimento'), css.indexOf('.preenchimento') + 220);
    assert.match(regra, /var\(--amarelo\)/);
    assert.equal(regra.includes('#'), false);
    for (const nome of ['pintarRespeito', 'pintarDebito', 'pintarIndicacao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarFolga'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function cartaoSobre'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarRespeito'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const novo = app.slice(app.indexOf('function telaRespeitos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    const aberta = app.slice(app.indexOf('function pintarAberta'), app.indexOf('function cartaoSobre'));
    assert.match(aberta, /textoDoPreenchimento/);
    assert.match(aberta, /textoDosConectores/);
    assert.match(aberta, /class: 'preenchimento'/);
    assert.match(aberta, /data-foco/);
    assert.equal(aberta.includes('Melhor jeito'), false);
    assert.equal(aberta.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /respeito: telaRespeitos/);
    assert.match(mapa, /debito: telaDebitos/);
    assert.match(mapa, /indicacao: telaIndicacoes/);
  });
});
