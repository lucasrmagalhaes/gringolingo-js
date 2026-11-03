import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { NARRAS, avaliarNarra, BANCOS, avaliarBanco, RECUSAS, avaliarRecusa } = await import('../js/narra.js');
const { MAPAS, DUROS, PROPOSTAS } = await import('../js/time.js');
const { lembreteMinutos, METAS_MINUTOS } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora, mesclarEstado, importarEstado,
  registrarNarrar, registrarBanco, registrarRecusa, definirMetaMinutos
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { VIVOS, PRODUTOS, FECHOS } = await import('../js/vivo.js');
const { CULTURAS, AUMENTOS, ROTAS } = await import('../js/cultura.js');
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
  ...FUTUROS.map(c => c.id),
  ...CULTURAS.map(c => c.id),
  ...AUMENTOS.map(c => c.id),
  ...ROTAS.map(c => c.id),
  ...VIVOS.map(c => c.id),
  ...PRODUTOS.map(c => c.id),
  ...FECHOS.map(c => c.id),
  ...MAPAS.map(c => c.id),
  ...DUROS.map(c => c.id),
  ...PROPOSTAS.map(c => c.id)
]);

const PROIBIDAS = [
  'I am reading the login test',
  'Could you take a look at this loop',
  'I am adding a check for the empty list',
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
  'The slow part is the database query',
  'I would add an index',
  'I would rather ship less',
  'Could we move the deadline',
  'Could we skip the extra meeting'
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

function fim(extra = {}) {
  return { xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [], ...extra };
}

describe('par narrado, banco e meta de minutos', () => {
  test('as três listas cabem em duas falas e não repetem o que já existe', () => {
    semTravessao('../js/narra.js');
    conferir(NARRAS, ['Pensar', 'Linha'], avaliarNarra);
    conferir(BANCOS, ['Guarda', 'Fonte'], avaliarBanco);
    conferir(RECUSAS, ['Não', 'Caminho'], avaliarRecusa);
    const trinta = BANCOS.find(c => c.id === 'trinta').rodadas[0];
    assert.equal(avaliarBanco(trinta, 'I would cache this feed for thirty seconds.').ok, true);
    assert.equal(avaliarBanco(trinta, 'I would cache this feed for 30 seconds.').ok, true);
    const hoje = RECUSAS.find(c => c.id === 'agora').rodadas[0];
    assert.equal(avaliarRecusa(hoje, 'I cannot take this on today.').ok, true);
    const texto = JSON.stringify({ NARRAS, BANCOS, RECUSAS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
  });

  test('o lembrete de minutos fica no aparelho e muda no fim da semana', () => {
    assert.deepEqual(METAS_MINUTOS, [10, 20, 30, 45]);
    assert.equal(estado.metaMinutos, 10);
    assert.equal(lembreteMinutos(0, 10, '2026-10-28'), '0 de 10 minutos nesta semana.');
    assert.equal(lembreteMinutos(9, 10, '2026-10-29'), 'Ainda dá tempo. Falta 1 minuto.');
    assert.equal(lembreteMinutos(0, 10, '2026-10-29'), 'Ainda dá tempo. Faltam 10 minutos.');
    assert.equal(lembreteMinutos(12, 10, '2026-10-28'), 'Meta de minutos batida: 12 de 10.');
    definirMetaMinutos(99);
    assert.equal(estado.metaMinutos, 10);
    definirMetaMinutos(20);
    assert.equal(estado.metaMinutos, 20);
    importarEstado({ xp: 0, licoes: {}, metaMinutos: 'oito' }, 'substituir');
    assert.equal(estado.metaMinutos, 10);
  });

  test('narrar, banco e recusa contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'narrar1', valor: 0, pago: false }] };
    const narrar = registrarNarrar(fim());
    assert.equal(narrar.bonusMissoes, 15);
    assert.equal(estado.stats.narras, 1);
    assert.equal(estado.stats.pares, 0);
    assert.equal(estado.stats.sistemas, 0);
    assert.equal(estado.stats.negociacoes, 0);
    assert.equal(estado.stats.decisoes, 0);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('narrar'));
    assert.equal(estado.badges.includes('minutos'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'banco1', valor: 0, pago: false }] };
    const banco = registrarBanco(fim());
    assert.equal(banco.bonusMissoes, 15);
    assert.equal(estado.stats.bancos, 1);
    assert.ok(estado.badges.includes('banco'));
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'recusa1', valor: 0, pago: false }] };
    const recusa = registrarRecusa(fim());
    assert.equal(recusa.bonusMissoes, 15);
    assert.equal(estado.stats.recusas, 1);
    assert.ok(estado.badges.includes('recusa'));
    assert.equal(estado.badges.includes('minutos'), false);
    assert.equal(estado.badges.includes('semana'), false);
    assert.equal(BADGES.length, 101);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a meta configurável é quem libera a conquista de minutos', () => {
    definirMetaMinutos(45);
    registrarNarrar(fim({ segundos: 600 }));
    assert.ok(estado.badges.includes('semana'));
    assert.equal(estado.badges.includes('minutos'), false);
    definirMetaMinutos(10);
    assert.ok(estado.badges.includes('minutos'));
  });

  test('o merge só copia a meta de minutos quando a local ainda é a padrão', () => {
    assert.equal(estado.metaMinutos, 10);
    mesclarEstado({ metaMinutos: 30 });
    assert.equal(estado.metaMinutos, 30);
    definirMetaMinutos(20);
    mesclarEstado({ metaMinutos: 45 });
    assert.equal(estado.metaMinutos, 20);
    mesclarEstado({});
    assert.equal(estado.metaMinutos, 20);
  });

  test('a versão 2.24 deixa as cenas fora do passeio e a meta na semana', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.equal(VERSAO_APP, '2.24');
    assert.match(data, /versao: '2\.23'/);
    assert.match(sw, /gringolingo-v51/);
    assert.match(sw, /\.\/js\/narra\.js/);
    assert.ok(app.indexOf('function pintarNarra') < app.indexOf('function textoPasseio'));
    assert.ok(app.indexOf('function pintarBanco') < app.indexOf('function textoPasseio'));
    assert.ok(app.indexOf('function pintarRecusa') < app.indexOf('function textoPasseio'));
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarNarra'), false);
    assert.equal(passeio.includes('function pintarBanco'), false);
    assert.equal(passeio.includes('function pintarRecusa'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const card = app.slice(app.indexOf('function cartaoSemana'), app.indexOf('function telaPainel'));
    assert.match(card, /semana-lembrete/);
    assert.match(card, /aria-pressed/);
    assert.match(card, /lembreteMinutos/);
    assert.match(card, /não pede aviso do celular/);
    assert.equal(card.includes('VERIFICAR'), false);
    const home = app.slice(app.indexOf('function cartaoMinutos'), app.indexOf('function faixaSemana'));
    assert.match(home, /lembrete-minutos/);
    assert.match(home, /não pede aviso do celular/);
    assert.match(app, /function telaNarras/);
  });
});
