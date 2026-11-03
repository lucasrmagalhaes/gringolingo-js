import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { VIVOS, avaliarVivo, PRODUTOS, avaliarProduto, FECHOS, avaliarFecho } = await import('../js/vivo.js');
const { filaEspacada, diasAoAcertar, textoVolta, MINIMO_ERROS } = await import('../js/espaco.js');
const {
  estado, limparEstadoMemoria, definirAgora, marcarEspaco,
  registrarVivo, registrarProduto, registrarFecho, registrarEspaco, INTERVALOS
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
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
  ...ROTAS.map(c => c.id)
]);

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

describe('incidente, produto, perguntas e revisão espaçada', () => {
  test('o incidente ao vivo não repete o plantão nem a causa do deploy', () => {
    semTravessao('../js/vivo.js');
    assert.equal(VIVOS.length, 3);
    assert.deepEqual(VIVOS.map(c => c.rodadas.map(r => r.etapa)), [
      ['Status', 'Quando'],
      ['Pedido', 'Quem'],
      ['Lição', 'Ação']
    ]);
    for (const cena of VIVOS) {
      assert.equal(ocupados.has(cena.id), false, cena.id);
      for (const rodada of cena.rodadas) {
        assert.equal(avaliarVivo(rodada, rodada.melhor).ok, true, rodada.melhor);
        assert.equal(avaliarVivo(rodada, 'hello').ok, false);
      }
    }
    const quando = VIVOS[0].rodadas[1];
    assert.equal(avaliarVivo(quando, 'It started about 20 minutes ago.').ok, true);
    assert.equal(avaliarVivo(quando, 'It started about twenty minutes ago.').ok, true);
    const texto = JSON.stringify(VIVOS);
    for (const proibida of [
      'The login is down',
      'I am sorry for the delay',
      'roll back',
      'The queue is stuck',
      'The deploy failed',
      'noisy alert'
    ]) assert.equal(texto.includes(proibida), false, proibida);
  });

  test('o prazo com o produto não repete o corte da busca nem a sexta', () => {
    conferir(PRODUTOS, ['Prazo', 'Corte'], avaliarProduto);
    const troca = PRODUTOS[2].rodadas[1];
    assert.equal(avaliarProduto(troca, 'I would rather ship less and keep the date.').ok, true);
    assert.equal(avaliarProduto(troca, "I'd rather ship less and keep the date.").ok, true);
    const texto = JSON.stringify(PRODUTOS);
    for (const proibida of [
      'ship search first',
      'move the deadline to Friday',
      'move the export',
      'cut the chart',
      'skip the extra meeting'
    ]) assert.equal(texto.includes(proibida), false, proibida);
  });

  test('as perguntas do fim não repetem o time, os 90 dias nem a parte difícil', () => {
    conferir(FECHOS, ['Pergunta', 'Detalhe'], avaliarFecho);
    const plantao = FECHOS[0].rodadas[0];
    assert.equal(avaliarFecho(plantao, 'How often is this team on call?').ok, true);
    const texto = JSON.stringify(FECHOS);
    for (const proibida of [
      'code review',
      '90 days',
      'first month',
      'hardest part',
      'tight deadline'
    ]) assert.equal(texto.includes(proibida), false, proibida);
  });

  test('a fila espaçada fica com as frases mais erradas que já venceram', () => {
    semTravessao('../js/espaco.js');
    assert.equal(MINIMO_ERROS, 2);
    const erros = [
      { en: 'I watched the game with my friends.', pt: 'o jogo', n: 4 },
      { en: 'The ending of the movie surprised me.', pt: 'o filme', n: 2 },
      { en: 'Hello there friend.', pt: 'oi', n: 1 },
      { en: 'My team plays on Sunday.', pt: 'o domingo', n: 5 }
    ];
    const agenda = {
      'My team plays on Sunday.': { caixa: 1, proxima: '2026-11-10', pt: 'o domingo' },
      'I watched the game with my friends.': { caixa: 0, proxima: '2026-11-03', pt: 'o jogo' },
      'The ending of the movie surprised me.': { caixa: 2, proxima: '2026-11-01', pt: '' }
    };
    const info = filaEspacada({ erros, agenda, hoje: '2026-11-03' });
    assert.deepEqual(info.fila.map(f => f.en), [
      'I watched the game with my friends.',
      'The ending of the movie surprised me.'
    ]);
    assert.equal(info.fila[0].n, 4);
    assert.equal(info.fila[0].caixa, 0);
    assert.equal(info.fila[1].pt, 'o filme');
    assert.equal(info.esperando, 1);
    assert.equal(info.total, 3);
    assert.equal(filaEspacada({ erros, agenda, hoje: '2026-11-03', limite: 1 }).fila.length, 1);
    assert.deepEqual(filaEspacada({ erros: null, agenda: null, hoje: '' }), { fila: [], esperando: 0, total: 0 });
    assert.equal(diasAoAcertar(0, INTERVALOS), 1);
    assert.equal(diasAoAcertar(1, INTERVALOS), 3);
    assert.equal(diasAoAcertar(4, INTERVALOS), 35);
    assert.equal(diasAoAcertar(99, INTERVALOS), 35);
    assert.equal(textoVolta(1), 'Volta amanhã.');
    assert.equal(textoVolta(7), 'Volta em 7 dias.');
  });

  test('marcar a agenda não encurta uma data que já está na frente', () => {
    const frase = 'Checkout is failing for new orders.';
    assert.equal(marcarEspaco('oi', 'oi'), null);
    const criado = marcarEspaco(frase, 'o checkout');
    assert.equal(criado.proxima, '2026-10-28');
    assert.equal(criado.caixa, 0);
    estado.agendaFala[frase].proxima = '2026-12-01';
    estado.agendaFala[frase].caixa = 3;
    const deNovo = marcarEspaco(frase, 'outro texto');
    assert.equal(deNovo.proxima, '2026-12-01');
    assert.equal(deNovo.caixa, 3);
    assert.equal(deNovo.pt, 'o checkout');
  });

  test('cada fala nova conta no próprio contador e a missão paga', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'vivo1', valor: 0, pago: false }] };
    const vivo = registrarVivo({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(vivo.bonusMissoes, 15);
    assert.equal(estado.stats.vivos, 1);
    assert.equal(estado.stats.incidentes, 0);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('vivo'));
    assert.equal(estado.badges.includes('plantao'), false);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'produto1', valor: 0, pago: false }] };
    const produto = registrarProduto({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(produto.bonusMissoes, 15);
    assert.equal(estado.stats.produtos, 1);
    assert.equal(estado.stats.negociacoes, 0);
    assert.ok(estado.badges.includes('produto'));
    assert.equal(estado.badges.includes('prazo'), false);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'fecho1', valor: 0, pago: false }] };
    const fecho = registrarFecho({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(fecho.bonusMissoes, 15);
    assert.equal(estado.stats.fechos, 1);
    assert.equal(estado.stats.finais, 0);
    assert.ok(estado.badges.includes('fecho'));
    assert.equal(estado.badges.includes('final'), false);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'espaco1', valor: 0, pago: false }] };
    const espaco = registrarEspaco({
      xp: 14, nota: 70, acertos: 1, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(espaco.bonusMissoes, 15);
    assert.equal(estado.stats.espacos, 1);
    assert.equal(estado.stats.revisoesFala, 0);
    assert.ok(estado.badges.includes('espaco'));
    assert.equal(estado.badges.includes('volta'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(BADGES.length, 93);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 2.22 deixa a revisão fora do passeio e o hub anuncia o filtro inteiro', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '2\.22'/);
    assert.match(data, /versao: '2\.21'/);
    assert.match(sw, /gringolingo-v49/);
    assert.match(sw, /\.\/js\/vivo\.js/);
    assert.match(sw, /\.\/js\/espaco\.js/);
    assert.ok(app.indexOf('function pintarEspaco') < app.indexOf('function textoPasseio'));
    assert.ok(app.indexOf('function telaVivos') < app.indexOf('function textoPasseio'));
    const bloco = app.slice(app.indexOf('function blocoFluencia'), app.indexOf('function cartaoComNivel'));
    assert.match(bloco, /aria-atomic/);
    assert.match(bloco, /aria-labelledby/);
    assert.match(bloco, /ArrowRight/);
    const pintar = app.slice(app.indexOf('function pintarListaHub'), app.indexOf('function garantirTrilha'));
    assert.match(pintar, /dataset\.chave/);
    assert.match(pintar, /replaceChildren/);
    assert.equal(pintar.includes('innerHTML'), false);
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarVivo'), false);
    assert.equal(passeio.includes('function pintarProduto'), false);
    assert.equal(passeio.includes('function pintarFecho'), false);
    assert.equal(passeio.includes('function pintarEspaco'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    assert.match(app, /function telaEspacos/);
  });
});
