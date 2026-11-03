import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  PEDIDOS, avaliarPedido, COBERTURAS, avaliarCobertura, LOOMS, avaliarLoom,
  termosDaFala, avaliarPalavra, fraseDaPalavra
} = await import('../js/caderno.js');
const { CULPAS, RAIOS, OFERTAS } = await import('../js/raio.js');
const { POKERS, LEIGOS, RECRUTAS } = await import('../js/carta.js');
const { MESAS, MIGRAS, ESTREIAS } = await import('../js/rodada.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarPedido, registrarCobertura, registrarLoom, registrarCaderno
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
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
  ...OFERTAS.map(c => c.id)
]);

const PROIBIDAS = [
  'Could you rephrase that',
  'So what you are saying is the login fails',
  "So what you're saying is the login fails",
  'Could you say that more slowly',
  'Could you speak more slowly',
  'What do you mean by',
  'Let me check I understood',
  'Could you say that again',
  'Could you repeat that',
  'Did I get that right',
  'Could you spell that name',
  'Managers use it every Monday',
  'A weekly report for managers',
  'Leave export out of this release',
  'Search stays, and export waits',
  'The deploy failed',
  'The tests failed, so the deploy did not start',
  'The pipeline is red',
  'One test still expects the old copy',
  'Hi everyone',
  'Today I will show',
  'This talk is five minutes',
  'I built a small app for my bus line',
  'The code sits on my GitHub',
  'I can start on the second Monday'
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

describe('esclarecimento, cobertura e vídeo', () => {
  test('as três listas não repetem o esclarecer, o requisito nem a palestra', () => {
    const fonte = semTravessao('../js/caderno.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    conferir(PEDIDOS, ['Pedido', 'Eco'], avaliarPedido);
    conferir(COBERTURAS, ['Teste', 'Caso'], avaliarCobertura);
    conferir(LOOMS, ['Tempo', 'Link'], avaliarLoom);
    const ids = [...PEDIDOS, ...COBERTURAS, ...LOOMS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const dois = LOOMS.find(c => c.id === 'doismin').rodadas[0];
    assert.equal(avaliarLoom(dois, 'This update is 2 minutes.').ok, true);
    const texto = JSON.stringify({ PEDIDOS, COBERTURAS, LOOMS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Pedido' && f.melhor === 'This accent is new to me.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Cobertura' && f.melhor === 'The tests run on every push.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Vídeo' && f.melhor === 'This update is two minutes.'), true);
    assert.equal(catalogo.some(f => f.melhor.includes('Please keep')), false);
  });

  test('pedido, cobertura e vídeo contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'pedido1', valor: 0, pago: false }] };
    const pedido = registrarPedido(fim());
    assert.equal(pedido.bonusMissoes, 15);
    assert.equal(estado.stats.pedidos, 1);
    assert.equal(estado.stats.esclarecimentos, 0);
    assert.equal(estado.stats.requisitos, 0);
    assert.equal(estado.stats.coberturas, 0);
    assert.equal(estado.stats.looms, 0);
    assert.equal(estado.stats.cadernos, 0);
    assert.ok(estado.badges.includes('pedido'));
    assert.equal(estado.badges.includes('cobertura'), false);
    assert.equal(estado.badges.includes('loom'), false);
    assert.equal(estado.badges.includes('caderno'), false);
    assert.equal(estado.badges.includes('claro'), false);
    assert.equal(estado.badges.includes('requisito'), false);
    assert.equal(estado.badges.includes('palestra'), false);
    assert.equal(estado.badges.includes('falha'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'cobertura1', valor: 0, pago: false }] };
    const cobertura = registrarCobertura(fim());
    assert.equal(cobertura.bonusMissoes, 15);
    assert.equal(estado.stats.coberturas, 1);
    assert.equal(estado.stats.falhas, 0);
    assert.equal(estado.stats.palestras, 0);
    assert.ok(estado.badges.includes('cobertura'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'loom1', valor: 0, pago: false }] };
    const loom = registrarLoom(fim());
    assert.equal(loom.bonusMissoes, 15);
    assert.equal(estado.stats.looms, 1);
    assert.equal(estado.stats.raios, 0);
    assert.equal(estado.stats.demos, 0);
    assert.ok(estado.badges.includes('loom'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, undefined);
    assert.equal(BADGES.length, 119);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o vocabulário guarda a palavra, não a frase inteira', () => {
    assert.deepEqual(termosDaFala(null), []);
    assert.deepEqual(termosDaFala([]), []);
    const lista = termosDaFala([
      { en: 'The cache failed on the timeout', n: 2 },
      { en: 'The cache cache is slow', n: 1 },
      { en: 'A queue is slow', n: 1 },
      { en: 'zeta waits here', n: 1 },
      { en: 'beta waits here', n: 1 }
    ]);
    assert.deepEqual(lista.find(t => t.en === 'cache'), { en: 'cache', n: 3 });
    assert.deepEqual(lista.find(t => t.en === 'slow'), { en: 'slow', n: 2 });
    assert.equal(lista.some(t => t.en === 'the' || t.en === 'on' || t.en === 'is'), false);
    assert.equal(lista.filter(t => t.en === 'cache').length, 1);
    const iguais = lista.filter(t => t.n === 1).map(t => t.en);
    assert.deepEqual(iguais, ['beta', 'queue', 'zeta']);
    const muitas = termosDaFala(Array.from({ length: 30 }, (_, i) => ({
      en: `alpha${String(i).padStart(2, '0')}`,
      n: 30 - i
    })));
    assert.equal(muitas.length, 24);
    assert.equal(muitas[0].en, 'alpha00');
    assert.equal(muitas.some(t => t.en === 'alpha29'), false);
    assert.equal(avaliarPalavra('cache', 'keep cache').ok, false);
    assert.equal(avaliarPalavra('cache', 'please keep coveragex').ok, false);
    assert.equal(avaliarPalavra('cache', 'please keep cache').ok, true);
    assert.equal(avaliarPalavra('cache', fraseDaPalavra('cache')).ok, true);
    assert.equal(avaliarPalavra('cache', 'hello there friend').ok, false);
    const modelo = avaliarPalavra('cache', 'hello');
    assert.equal(modelo.ok, false);
    assert.equal(modelo.melhor, 'Please keep cache in this sentence.');

    estado.errosFala = [{ en: 'The cache failed', pt: 'o cache falhou', n: 2 }];
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'caderno1', valor: 0, pago: false }] };
    const fimCaderno = registrarCaderno({
      xp: 18, nota: 100, acertos: 1, respostas: 1, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(fimCaderno.bonusMissoes, 15);
    assert.equal(estado.stats.cadernos, 1);
    assert.equal(estado.stats.revisoesFala, 0);
    assert.equal(estado.stats.pedidos, 0);
    assert.equal(estado.errosFala.length, 1);
    assert.equal(estado.errosFala[0].n, 2);
    assert.ok(estado.badges.includes('caderno'));
    assert.equal(estado.badges.includes('pedido'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.revisao, 1);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, undefined);
  });

  test('a versão 2.29 deixa o vocabulário fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.equal(VERSAO_APP, '2.29');
    assert.match(data, /versao: '2\.28'/);
    assert.match(sw, /gringolingo-v56/);
    assert.match(sw, /\.\/js\/caderno\.js/);
    assert.match(turno, /caderno\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPedido', 'pintarCobertura', 'pintarLoom', 'pintarCaderno']) {
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function textoPasseio'), nome);
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarOferta'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function cartaoSobre'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarPedido'), false);
    assert.equal(passeio.includes('function pintarCaderno'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const caderno = app.slice(app.indexOf('function pintarCaderno'), app.indexOf('function cartaoSobre'));
    assert.match(caderno, /Ainda não há palavra neste aparelho/);
    assert.match(caderno, /Palavras que escaparam nas falas/);
    assert.match(caderno, /data-foco/);
    assert.match(caderno, /campo\.entrada\.focus/);
    assert.match(caderno, /errosFala: \[\]/);
    assert.match(caderno, /CONFERIR/);
    assert.equal(caderno.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /pedido: telaPedidos/);
    assert.match(mapa, /cobertura: telaCoberturas/);
    assert.match(mapa, /loom: telaLooms/);
    assert.match(mapa, /caderno: telaCaderno/);
    const sub = app.slice(app.indexOf('function subDoTreino'), app.indexOf('function abrirTreino'));
    assert.match(sub, /termosDaFala/);
  });
});
