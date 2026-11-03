import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { MAPAS, avaliarMapa, DUROS, avaliarDuro, PROPOSTAS, avaliarProposta } = await import('../js/time.js');
const { grupoDoTipo, segundosDaFala, somarSemana, textoMinutos, textoGrupo } = await import('../js/semana.js');
const {
  estado, limparEstadoMemoria, definirAgora, mesclarEstado,
  registrarMapa, registrarDuro, registrarProposta
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
  ...FECHOS.map(c => c.id)
]);

const PROIBIDAS = [
  'We open a pull request',
  'Your first task',
  'We write the test before',
  'We ship from main',
  'Thank you. I will keep',
  'Could you point out',
  'Thanks for the feedback',
  'Can we review this again',
  'I appreciate the clear',
  'A written decision',
  'We went with',
  'The trade-off is',
  'trade off',
  'I would rather ship less',
  'The next step is to turn the flag off'
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

function fim(xp = 26) {
  return { xp, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] };
}

describe('mapa, feedback duro e a semana falada', () => {
  test('as três listas cabem em duas falas e não repetem o que já existe', () => {
    semTravessao('../js/time.js');
    semTravessao('../js/semana.js');
    conferir(MAPAS, ['Arquitetura', 'Fluxo'], avaliarMapa);
    conferir(DUROS, ['Ponto', 'Pedido'], avaliarDuro);
    conferir(PROPOSTAS, ['Proposta', 'Troca'], avaliarProposta);
    const acordo = MAPAS.find(c => c.id === 'acordo').rodadas[0];
    assert.equal(avaliarMapa(acordo, 'The daily lasts fifteen minutes.').ok, true);
    assert.equal(avaliarMapa(acordo, 'The daily lasts 15 minutes.').ok, true);
    const travado = DUROS.find(c => c.id === 'travado').rodadas[0];
    assert.equal(avaliarDuro(travado, 'This change has been waiting for three days.').ok, true);
    const nota = DUROS.find(c => c.id === 'faltou').rodadas[1];
    assert.equal(avaliarDuro(nota, "I'll send a written note every morning.").ok, true);
    const texto = JSON.stringify({ MAPAS, DUROS, PROPOSTAS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
  });

  test('os minutos e os grupos da semana ignoram o futuro', () => {
    assert.equal(grupoDoTipo('mapa'), 'trabalho');
    assert.equal(grupoDoTipo('perguntaDia'), 'revisao');
    assert.equal(grupoDoTipo('verbo'), 'trabalho');
    assert.equal(grupoDoTipo('dialogo'), '');
    assert.equal(segundosDaFala(2), 24);
    assert.equal(segundosDaFala(2, 600), 600);
    assert.equal(segundosDaFala(0, 0), 0);
    assert.equal(segundosDaFala(2, 0), 0);
    assert.equal(segundosDaFala(400), 1800);
    assert.equal(textoMinutos(60), '1 minuto de fala nesta semana.');
    assert.equal(textoMinutos(24), '0 minutos de fala nesta semana.');
    assert.equal(textoGrupo(0, 'Trabalho'), '0 treinos em Trabalho');
    assert.equal(textoGrupo(1, 'Trabalho'), '1 treino em Trabalho');
    const soma = somarSemana({
      '2026-10-26': { n: 1, soma: 80, segundos: 12, grupos: { trabalho: 1 } },
      '2026-11-01': { n: 5, soma: 100, segundos: 600, grupos: { revisao: 4 } }
    }, '2026-10-28');
    assert.equal(soma.segundos, 12);
    assert.equal(soma.treinos, 1);
    assert.equal(soma.minutos, 0);
    assert.equal(soma.grupos.trabalho, 1);
    assert.equal(soma.grupos.revisao, 0);
    assert.equal(soma.grupos.entrevista, 0);
  });

  test('o mapa, o ponto e a proposta contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'mapa1', valor: 0, pago: false }] };
    const mapa = registrarMapa(fim());
    assert.equal(mapa.bonusMissoes, 15);
    assert.equal(estado.stats.mapas, 1);
    assert.equal(estado.stats.chegadas, 0);
    assert.equal(estado.stats.gestores, 0);
    assert.equal(estado.stats.decisoes, 0);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('mapa'));
    assert.equal(estado.badges.includes('semana'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(estado.painel['2026-10-28'].n, 1);
    assert.equal(estado.painel['2026-10-28'].segundos, 24);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'duro1', valor: 0, pago: false }] };
    const duro = registrarDuro(fim());
    assert.equal(duro.bonusMissoes, 15);
    assert.equal(estado.stats.duros, 1);
    assert.ok(estado.badges.includes('duro'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'proposta1', valor: 0, pago: false }] };
    const proposta = registrarProposta(fim());
    assert.equal(proposta.bonusMissoes, 15);
    assert.equal(estado.stats.propostas, 1);
    assert.ok(estado.badges.includes('proposta'));
    assert.equal(estado.badges.includes('semana'), false);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(estado.painel['2026-10-28'].segundos, 72);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(BADGES.length, 97);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('dez minutos de fala fecham a conquista da semana', () => {
    registrarMapa({ ...fim(), segundos: 600 });
    assert.equal(estado.painel['2026-10-28'].segundos, 600);
    assert.equal(somarSemana(estado.painel, '2026-10-28').minutos, 10);
    assert.ok(estado.badges.includes('semana'));
    assert.ok(estado.badges.includes('mapa'));
  });

  test('o merge guarda os segundos e os grupos do aparelho', () => {
    registrarMapa(fim());
    mesclarEstado({
      painel: {
        '2026-10-28': { soma: 200, n: 2, acertos: 4, respostas: 4 }
      }
    });
    assert.equal(estado.painel['2026-10-28'].n, 2);
    assert.equal(estado.painel['2026-10-28'].soma, 200);
    assert.equal(estado.painel['2026-10-28'].segundos, 24);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);
    mesclarEstado({
      painel: {
        '2026-10-28': { soma: 200, n: 2, acertos: 4, respostas: 4, segundos: 10, grupos: { trabalho: 3 } }
      }
    });
    assert.equal(estado.painel['2026-10-28'].n, 2);
    assert.equal(estado.painel['2026-10-28'].soma, 200);
    assert.equal(estado.painel['2026-10-28'].segundos, 24);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
  });

  test('recarregar o progresso não apaga os minutos', () => {
    registrarMapa(fim());
    mesclarEstado({});
    assert.equal(estado.painel['2026-10-28'].segundos, 24);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);
  });

  test('a versão 2.23 deixa o mapa fora do passeio e mostra a semana em texto', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.equal(VERSAO_APP, '2.23');
    assert.match(data, /versao: '2\.22'/);
    assert.match(sw, /gringolingo-v50/);
    assert.match(sw, /\.\/js\/time\.js/);
    assert.match(sw, /\.\/js\/semana\.js/);
    assert.ok(app.indexOf('function pintarMapa') < app.indexOf('function textoPasseio'));
    assert.ok(app.indexOf('function pintarDuro') < app.indexOf('function textoPasseio'));
    assert.ok(app.indexOf('function pintarProposta') < app.indexOf('function textoPasseio'));
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarMapa'), false);
    assert.equal(passeio.includes('function pintarDuro'), false);
    assert.equal(passeio.includes('function pintarProposta'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const card = app.slice(app.indexOf('function cartaoSemana'), app.indexOf('function telaPainel'));
    assert.match(card, /semana-falada/);
    assert.match(card, /textoMinutos/);
    assert.equal(card.includes('VERIFICAR'), false);
    assert.match(app, /function telaMapas/);
    assert.match(app, /semana: telaPainel/);
  });
});
