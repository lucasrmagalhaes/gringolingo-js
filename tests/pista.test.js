import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PISTAS, avaliarPista, CALMAS, avaliarCalma, FOLGAS, avaliarFolga,
  PERGUNTAS_ABERTAS, LIMITE_ABERTAS, MINIMO_PALAVRAS,
  montarAbertas, avaliarAberta, textoDaAberta, contarPalavras
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
  registrarPista, registrarCalma, registrarFolga, registrarAberta
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
  ...ELEVADORES.map(c => c.id)
]);

const PROIBIDAS = [
  'The deploy failed',
  'The pipeline is red',
  'To reproduce it, open login',
  'Write one test that shows the bug',
  'Name the function for the one job',
  'Change one file, then run the tests',
  'This null check stops a crash',
  'An empty list is an edge case',
  'Let me say that more slowly',
  'I will be offline after six',
  'I can start in four weeks',
  'I am a full stack developer',
  'The pay button fails'
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

describe('bug raro, calma e folga', () => {
  test('as três listas não repetem a falha, a mentoria nem o relato', () => {
    const fonte = semTravessao('../js/pista.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    conferir(PISTAS, ['Sintoma', 'Prova'], avaliarPista);
    conferir(CALMAS, ['Passo', 'Ideia'], avaliarCalma);
    conferir(FOLGAS, ['Plano', 'Limite'], avaliarFolga);
    const ids = [...PISTAS, ...CALMAS, ...FOLGAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const vezes = PISTAS.find(c => c.id === 'asvezes').rodadas[1];
    assert.equal(avaliarPista(vezes, 'I saw it 2 times this morning.').ok, true);
    const clique = PISTAS.find(c => c.id === 'doiscliques').rodadas[0];
    assert.equal(avaliarPista(clique, '2 clicks at once cause the race.').ok, true);
    const passo = CALMAS.find(c => c.id === 'comcalma').rodadas[0];
    assert.equal(avaliarCalma(passo, "Let's walk through it one step at a time.").ok, true);
    const sete = FOLGAS.find(c => c.id === 'depois7').rodadas[0];
    assert.equal(avaliarFolga(sete, 'I do not answer messages after 7.').ok, true);
    const semanas = FOLGAS.find(c => c.id === 'duasemanas').rodadas[0];
    assert.equal(avaliarFolga(semanas, 'I need the full 2 weeks off.').ok, true);
    const texto = JSON.stringify({ PISTAS, CALMAS, FOLGAS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Pista' && f.melhor === 'It fails only sometimes.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Calma' && f.melhor === 'A promise is a value that arrives later.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Folga' && f.melhor === 'I will be out the first week of December.'), true);
    assert.equal(catalogo.some(f => f.melhor === 'Tell me about a bug you chased for more than a day.'), false);
  });

  test('pista, calma e folga contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'pista1', valor: 0, pago: false }] };
    const pista = registrarPista(fim());
    assert.equal(pista.bonusMissoes, 15);
    assert.equal(estado.stats.pistas, 1);
    assert.equal(estado.stats.falhas, 0);
    assert.equal(estado.stats.calmas, 0);
    assert.equal(estado.stats.folgas, 0);
    assert.equal(estado.stats.abertas, 0);
    assert.ok(estado.badges.includes('pista'));
    assert.equal(estado.badges.includes('falha'), false);
    assert.equal(estado.badges.includes('mentoria'), false);
    assert.equal(estado.badges.includes('livre'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'calma1', valor: 0, pago: false }] };
    const calma = registrarCalma(fim());
    assert.equal(calma.bonusMissoes, 15);
    assert.equal(estado.stats.calmas, 1);
    assert.equal(estado.stats.mentorias, 0);
    assert.ok(estado.badges.includes('calma'));
    assert.equal(estado.badges.includes('mentoria'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'folga1', valor: 0, pago: false }] };
    const folga = registrarFolga(fim());
    assert.equal(folga.bonusMissoes, 15);
    assert.equal(estado.stats.folgas, 1);
    assert.equal(estado.stats.socorros, 0);
    assert.equal(estado.stats.livres, 0);
    assert.ok(estado.badges.includes('folga'));
    assert.equal(estado.badges.includes('socorro'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.cotidiano, 1);
    assert.ok(BADGES.length >= 127);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('as perguntas abertas do dia contam palavras e tempo', () => {
    assert.equal(PERGUNTAS_ABERTAS.length >= 8, true);
    assert.equal(new Set(PERGUNTAS_ABERTAS.map(p => p.id)).size, PERGUNTAS_ABERTAS.length);
    assert.equal(LIMITE_ABERTAS, 5);
    assert.equal(MINIMO_PALAVRAS, 8);
    const hoje = montarAbertas('2026-10-28');
    const outro = montarAbertas('2026-01-02');
    assert.equal(hoje.length, 5);
    assert.equal(new Set(hoje.map(p => p.id)).size, 5);
    assert.equal(hoje.every(p => PERGUNTAS_ABERTAS.some(q => q.id === p.id)), true);
    assert.equal(hoje.map(p => p.id).join(','), montarAbertas('2026-10-28').map(p => p.id).join(','));
    assert.notEqual(hoje.map(p => p.id).join(','), outro.map(p => p.id).join(','));
    const longo = 'I chased a bug for two full days last week.';
    const aval = avaliarAberta(longo, 12);
    assert.equal(contarPalavras(longo), 10);
    assert.equal(aval.ok, true);
    assert.equal(aval.palavras, 10);
    assert.equal(aval.segundos, 12);
    assert.equal(aval.nota, 100);
    assert.equal(textoDaAberta(aval), '10 palavras em 12 segundos.');
    assert.equal(textoDaAberta({ palavras: 1, segundos: 1, ok: false }), '1 palavra em 1 segundo. O mínimo é 8 palavras.');
    const curto = avaliarAberta('too short', 3);
    assert.equal(curto.ok, false);
    assert.equal(curto.nota, 0);
    assert.match(textoDaAberta(curto), /2 palavras em 3 segundos/);
    assert.match(textoDaAberta(curto), /O mínimo é 8 palavras/);
    assert.equal(avaliarAberta('', 4).ok, false);
    assert.equal(avaliarAberta('I chased a bug for two full days last week.', Number.NaN).segundos, 0);
    const texto = JSON.stringify(PERGUNTAS_ABERTAS);
    assert.equal(texto.includes('\u2014'), false);
    assert.equal(texto.includes('\u2013'), false);

    estado.errosFala = [{ en: 'The cache failed on the timeout', pt: 'o cache falhou', n: 2 }];
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'abertas1', valor: 0, pago: false }] };
    const fechou = registrarAberta({
      xp: 42, nota: 80, acertos: 4, respostas: 5, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(fechou.bonusMissoes, 15);
    assert.equal(estado.stats.abertas, 1);
    assert.equal(estado.stats.papos, 0);
    assert.equal(estado.stats.livres, 0);
    assert.equal(estado.errosFala.length, 1);
    assert.equal(estado.errosFala[0].n, 2);
    assert.ok(estado.badges.includes('abertas'));
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(estado.badges.includes('livre'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
  });

  test('a versão 2.31 deixa as perguntas abertas fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /versao: '2\.31'/);
    assert.match(data, /versao: '2\.30'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/pista\.js/);
    assert.match(turno, /pista\.js/);
    assert.equal(turno.includes('PERGUNTAS_ABERTAS'), false);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPista', 'pintarCalma', 'pintarFolga', 'pintarAberta']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarJunta'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function cartaoSobre'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function textoPasseio'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarAberta'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const aberta = app.slice(app.indexOf('function pintarAberta'), app.indexOf('function cartaoSobre'));
    assert.match(aberta, /textoDaAberta/);
    assert.match(aberta, /CONTAR/);
    assert.match(aberta, /data-cronometro-aberta/);
    assert.match(aberta, /data-foco/);
    assert.match(aberta, /campo\.focus/);
    assert.equal(aberta.includes('Melhor jeito'), false);
    assert.equal(aberta.includes('barraModelo'), false);
    assert.equal(aberta.includes('VERIFICAR'), false);
    const fecha = app.slice(app.indexOf('function concluirAberta'), app.indexOf('function pintarAberta'));
    assert.match(fecha, /errosFala: \[\]/);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /pista: telaPistas/);
    assert.match(mapa, /calma: telaCalmas/);
    assert.match(mapa, /folga: telaFolgas/);
    assert.match(mapa, /abertas: telaAbertas/);
    const sub = app.slice(app.indexOf('function subDoTreino'), app.indexOf('function abrirTreino'));
    assert.match(sub, /textoDasAbertas/);
  });
});
