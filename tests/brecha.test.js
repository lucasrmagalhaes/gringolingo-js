import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { FACILS, ESCOLHAS, SABADOS } = await import('../js/facil.js');
const {
  BRECHAS, avaliarBrecha, MUDAS, avaliarMuda, GAUCHOS, avaliarGaucho
} = await import('../js/brecha.js');
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
  registrarBrecha, registrarMuda, registrarGaucho,
  alternarEstrela, estrelaLigada, marcarTreinoAberto, definirOrdemHub,
  mesclarEstado, exportarEstado, importarEstado
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
const { TREINOS, ordenarTreinos, filtrarEstrelas, treinoContinuar, textoDoContinuar } = await import('../js/hub.js');


const dia = () => new Date(2026, 9, 28, 15, 0, 0);
const FORA = ['surpresa', 'desafio', 'nivel', 'resumo', 'mes'];
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
  ...SABADOS.map(c => c.id)
]);

const PROIBIDAS = [
  'I had a quiet weekend',
  'How was your weekend',
  'How was yours',
  'I play the guitar on weekends',
  'I practice a little on Sunday',
  'I am from Brazil',
  'I miss the food',
  'I am a full stack developer',
  'I built an API in Node',
  'Could we skip the extra meeting',
  'Please keep',
  'The token was written to the log',
  'I will rotate the token',
  'This CVE is a known hole',
  'The patch closes that hole',
  'Can we keep checkout in this release',
  'We can move the reports to the next release',
  'Could we move the deadline to Friday',
  'Let us open with the goal',
  'I would start this app in React',
  'I went hiking on Saturday'
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

function travarMissao(id) {
  estado.missoes = { dia: '2026-10-28', progresso: [{ id, valor: 0, pago: false }] };
}

describe('falha, mudança, chimarrão e a descoberta', () => {
  test('as três listas não repetem o token, o corte nem o Brasil genérico', () => {
    const fonte = semTravessao('../js/brecha.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    conferir(BRECHAS, ['Falha', 'Correção'], avaliarBrecha);
    conferir(MUDAS, ['Pedido', 'Troca'], avaliarMuda);
    conferir(GAUCHOS, ['Lugar', 'Hábito'], avaliarGaucho);
    const ids = [...BRECHAS, ...MUDAS, ...GAUCHOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const semanas = MUDAS.find(c => c.id === 'duassemanas').rodadas[0];
    assert.equal(avaliarMuda(semanas, 'This change adds 2 weeks.').ok, true);
    const mate = GAUCHOS.find(c => c.id === 'chimarrao').rodadas[1];
    assert.equal(avaliarGaucho(mate, 'I drink chimarrão in the afternoon.').ok, true);
    const texto = JSON.stringify({ BRECHAS, MUDAS, GAUCHOS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Brecha' && f.melhor === 'This query glues the user text into SQL.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Mudança' && f.melhor === 'The new screen was not in the agreed scope.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Chimarrão' && f.melhor === 'I live in Rio Grande do Sul.'), true);
  });

  test('falha, mudança e chimarrão contam no próprio contador', () => {
    travarMissao('brecha1');
    const brecha = registrarBrecha(fim());
    assert.equal(brecha.bonusMissoes, 15);
    assert.equal(estado.stats.brechas, 1);
    assert.equal(estado.stats.mudas, 0);
    assert.equal(estado.stats.seguros, 0);
    assert.equal(estado.stats.furos, 0);
    assert.ok(estado.badges.includes('brecha'));
    for (const id of ['muda', 'gaucho', 'estrela', 'seguro', 'furo', 'prazo', 'produto', 'social']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('muda1');
    const muda = registrarMuda(fim());
    assert.equal(muda.bonusMissoes, 15);
    assert.equal(estado.stats.mudas, 1);
    assert.equal(estado.stats.produtos, 0);
    assert.equal(estado.stats.negociacoes, 0);
    assert.ok(estado.badges.includes('muda'));
    assert.equal(estado.badges.includes('produto'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    travarMissao('gaucho1');
    const gaucho = registrarGaucho(fim());
    assert.equal(gaucho.bonusMissoes, 15);
    assert.equal(estado.stats.gauchos, 1);
    assert.equal(estado.stats.sociais, 0);
    assert.equal(estado.stats.sabados, 0);
    assert.ok(estado.badges.includes('gaucho'));
    assert.equal(estado.badges.includes('social'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.cotidiano, 1);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 142);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a estrela, o continuar e a ordem ficam neste aparelho', () => {
    assert.equal(alternarEstrela(''), false);
    assert.equal(alternarEstrela('__proto__'), false);
    assert.equal(alternarEstrela('x'.repeat(41)), false);
    assert.equal(alternarEstrela('nao-existe'), false);
    assert.equal(alternarEstrela('brecha'), true);
    assert.equal(estrelaLigada('brecha'), true);
    assert.ok(estado.badges.includes('estrela'));
    assert.equal(estado.stats.brechas, 0);
    assert.equal(alternarEstrela('brecha'), true);
    assert.equal(estrelaLigada('brecha'), false);
    assert.ok(estado.badges.includes('estrela'));
    assert.equal(alternarEstrela('gaucho'), true);
    assert.deepEqual(estado.estrelas, ['gaucho']);

    const ids = TREINOS.map(t => t.id);
    estado.estrelas = [];
    for (const id of ids.slice(0, 80)) assert.equal(alternarEstrela(id), true, id);
    assert.equal(estado.estrelas.length, 80);
    assert.equal(alternarEstrela(ids[80]), false);
    assert.equal(estado.estrelas.length, 80);
    assert.equal(alternarEstrela(ids[0]), true);
    assert.equal(estado.estrelas.includes(ids[0]), false);
    assert.equal(alternarEstrela(ids[80]), true);
    assert.equal(estado.estrelas.length, 80);

    limparEstadoMemoria();
    assert.equal(marcarTreinoAberto(''), false);
    assert.equal(marcarTreinoAberto('nao'), false);
    assert.equal(marcarTreinoAberto('muda'), true);
    assert.equal(marcarTreinoAberto('muda'), true);
    assert.equal(estado.treinoAberto, 'muda');
    assert.equal(definirOrdemHub('menos'), 'menos');
    assert.equal(estado.ordemHub, 'menos');
    mesclarEstado({
      estrelas: ['gaucho', 'nao', '__proto__', 'gaucho'],
      treinoAberto: 'facil',
      ordemHub: 'catalogo'
    });
    assert.deepEqual(estado.estrelas, ['gaucho']);
    assert.equal(estado.treinoAberto, 'muda');
    assert.equal(estado.ordemHub, 'menos');

    limparEstadoMemoria();
    mesclarEstado({ treinoAberto: 'stack', estrelas: ['brecha'] });
    assert.equal(estado.treinoAberto, 'stack');
    assert.deepEqual(estado.estrelas, ['brecha']);
    const backup = exportarEstado('2.35');
    backup.estado.estrelas = ['brecha', 'nao', 'brecha', ...TREINOS.map(t => t.id)];
    backup.estado.treinoAberto = 'fantasma';
    backup.estado.ordemHub = 'menos';
    importarEstado(backup, 'substituir');
    assert.equal(estado.estrelas.length, 80);
    assert.equal(estado.estrelas.includes('nao'), false);
    assert.equal(new Set(estado.estrelas).size, estado.estrelas.length);
    assert.equal(estado.treinoAberto, '');
    assert.equal(estado.ordemHub, 'menos');

    const amostra = [
      { id: 'a', stat: 'facils', ordem: 2 },
      { id: 'b', stat: 'stacks', ordem: 1 },
      { id: 'c', stat: '', ordem: 0 }
    ];
    assert.deepEqual(ordenarTreinos(amostra, { modo: 'catalogo' }).map(t => t.id), ['a', 'b', 'c']);
    assert.deepEqual(ordenarTreinos(amostra, { modo: 'outro', stats: { facils: 4 } }).map(t => t.id), ['a', 'b', 'c']);
    assert.deepEqual(
      ordenarTreinos(amostra, { modo: 'menos', stats: { facils: 4, stacks: 0 } }).map(t => t.id),
      ['c', 'b', 'a']
    );
    assert.deepEqual(ordenarTreinos(null, { modo: 'menos' }), []);
    const trabalho = TREINOS.filter(t => t.categoria === 'trabalho');
    const ordenado = ordenarTreinos(trabalho, { modo: 'menos', stats: { modelos: 9 } });
    assert.equal(ordenado[0].id, 'furo');
    assert.ok(ordenado.findIndex(t => t.id === 'modelo') > 0);
    assert.equal(filtrarEstrelas(TREINOS, ['brecha'], false).length, TREINOS.length);
    assert.deepEqual(filtrarEstrelas(TREINOS, ['brecha', 'nao'], true).map(t => t.id), ['brecha']);
    assert.deepEqual(filtrarEstrelas(TREINOS, null, true), []);
    assert.equal(treinoContinuar(TREINOS, ''), null);
    assert.equal(treinoContinuar(TREINOS, 'nao'), null);
    assert.equal(treinoContinuar(TREINOS, 'brecha').titulo, 'A falha');
    assert.equal(textoDoContinuar(null), 'Nenhum treino aberto ainda.');
    assert.equal(textoDoContinuar({ titulo: 'A falha' }), 'Continuar: A falha.');
  });

  test('a versão 2.35 deixa a descoberta fora do passeio', () => {
    assert.equal(VERSAO_APP, '2.35');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.35'/);
    assert.match(data, /versao: '2\.34'/);
    assert.match(sw, /gringolingo-v62/);
    assert.match(sw, /\.\/js\/brecha\.js/);
    assert.match(turno, /brecha\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarBrecha', 'pintarMuda', 'pintarGaucho']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaSurpresa'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function cartaoSobre'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarBrecha'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const novo = app.slice(app.indexOf('function telaBrechas'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /brecha: telaBrechas/);
    assert.match(mapa, /muda: telaMudas/);
    assert.match(mapa, /gaucho: telaGauchos/);
    const hub = app.slice(app.indexOf('function treinosVisiveis'), app.indexOf('function cartaoComNivel'));
    assert.match(hub, /data-estrela/);
    assert.match(hub, /data-continuar/);
    assert.match(hub, /Favoritos/);
    assert.match(hub, /Menos praticados/);
    const regra = css.slice(css.indexOf('.estrela-treino'), css.indexOf('.estrela-treino') + 700);
    assert.match(regra, /var\(--amarelo\)/);
    assert.equal(regra.includes('#'), false);
  });
});
