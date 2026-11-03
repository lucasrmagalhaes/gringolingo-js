import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { POKERS, avaliarPoker, LEIGOS, avaliarLeigo, RECRUTAS, avaliarRecruta } = await import('../js/carta.js');
const { MESAS, MIGRAS, ESTREIAS } = await import('../js/rodada.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora, exportarEstado, importarEstado, nomeArquivoBackup,
  registrarPoker, registrarLeigo, registrarRecruta
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
  ...ESTREIAS.map(c => c.id)
]);

const PROIBIDAS = [
  'It should take',
  'I am not sure yet',
  'A prompt is the request',
  'own notes',
  'stays close',
  'invent a fact',
  'looking at 90',
  'base salary',
  'health insurance',
  'equity',
  'vesting',
  'I am from Brazil',
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

describe('carta, conta da IA e ligação', () => {
  test('as três listas não repetem a estimativa, o modelo nem o salário', () => {
    semTravessao('../js/carta.js');
    conferir(POKERS, ['Carta', 'Motivo'], avaliarPoker);
    conferir(LEIGOS, ['Conta', 'Limite'], avaliarLeigo);
    conferir(RECRUTAS, ['Fala', 'Janela'], avaliarRecruta);
    const ids = [...POKERS, ...LEIGOS, ...RECRUTAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const cinco = POKERS.find(c => c.id === 'pontos5').rodadas[0];
    const tres = POKERS.find(c => c.id === 'pontos3').rodadas[0];
    const oito = POKERS.find(c => c.id === 'pontos8').rodadas[0];
    assert.equal(avaliarPoker(cinco, 'I vote 5.').ok, true);
    assert.equal(avaliarPoker(tres, 'I vote 3.').ok, true);
    assert.equal(avaliarPoker(oito, 'I vote 8.').ok, true);
    const limite = LEIGOS.find(c => c.id === 'centavo').rodadas[1];
    assert.equal(avaliarLeigo(limite, 'We will cap questions at twenty a day.').ok, true);
    assert.equal(avaliarLeigo(limite, 'We will cap questions at 20 a day.').ok, true);
    const comeco = RECRUTAS.find(c => c.id === 'quatro').rodadas[0];
    assert.equal(avaliarRecruta(comeco, 'I can start in four weeks.').ok, true);
    assert.equal(avaliarRecruta(comeco, 'I can start in 4 weeks.').ok, true);
    const texto = JSON.stringify({ POKERS, LEIGOS, RECRUTAS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Carta' && f.melhor === 'I vote five.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Conta' && f.melhor === 'Each answer has a small cost.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Ligação' && f.melhor === 'I work on Brazil time.'), true);
  });

  test('carta, conta e ligação contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'poker1', valor: 0, pago: false }] };
    const carta = registrarPoker(fim());
    assert.equal(carta.bonusMissoes, 15);
    assert.equal(estado.stats.pokers, 1);
    assert.equal(estado.stats.estimativas, 0);
    assert.equal(estado.stats.leigos, 0);
    assert.equal(estado.stats.recrutas, 0);
    assert.ok(estado.badges.includes('poker'));
    assert.equal(estado.badges.includes('leigo'), false);
    assert.equal(estado.badges.includes('recruta'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'leigo1', valor: 0, pago: false }] };
    const conta = registrarLeigo(fim());
    assert.equal(conta.bonusMissoes, 15);
    assert.equal(estado.stats.leigos, 1);
    assert.equal(estado.stats.modelos, 0);
    assert.equal(estado.stats.futuros, 0);
    assert.ok(estado.badges.includes('leigo'));
    assert.equal(estado.badges.includes('recruta'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'recruta1', valor: 0, pago: false }] };
    const liga = registrarRecruta(fim());
    assert.equal(liga.bonusMissoes, 15);
    assert.equal(estado.stats.recrutas, 1);
    assert.equal(estado.stats.salarios, 0);
    assert.ok(estado.badges.includes('recruta'));
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
    assert.equal(BADGES.length, 112);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('o backup grava a data local e a troca pede confirmação', () => {
    definirAgora(() => new Date(2026, 9, 28, 23, 40, 5));
    estado.xp = 40;
    localStorage.setItem('gringolingo:ia', 'chave-secreta-carta');
    const arquivo = exportarEstado('2.27');
    assert.equal(arquivo.quando, '2026-10-28T23:40:05');
    assert.equal(arquivo.versao, 1);
    assert.equal(nomeArquivoBackup(arquivo.quando, '2.27'), 'gringolingo-2.27-2026-10-28.json');
    assert.equal(JSON.stringify(arquivo).includes('chave-secreta-carta'), false);
    const salvo = JSON.parse(JSON.stringify(arquivo));
    estado.xp = 3;
    importarEstado(salvo, 'substituir');
    assert.equal(estado.xp, 40);

    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const backup = app.slice(app.indexOf('function cartaoBackup'), app.indexOf('function cartaoLembrete'));
    assert.equal(backup.includes('toISOString'), false);
    assert.match(backup, /diaLocalAgora/);
    assert.match(backup, /backup-arquivo/);
    assert.match(backup, /Arquivo JSON de backup/);
    assert.match(backup, /Toque de novo para substituir/);
    assert.match(backup, /baixado neste aparelho/);
  });

  test('a versão 2.27 deixa as telas fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.equal(VERSAO_APP, '2.27');
    assert.match(data, /versao: '2\.26'/);
    assert.match(sw, /gringolingo-v54/);
    assert.match(sw, /\.\/js\/carta\.js/);
    assert.match(turno, /carta\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarPoker', 'pintarLeigo', 'pintarRecruta']) {
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function textoPasseio'), nome);
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarFoco'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarPoker'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /poker: telaPokers/);
    assert.match(mapa, /leigo: telaLeigos/);
    assert.match(mapa, /recruta: telaRecrutas/);
  });
});
