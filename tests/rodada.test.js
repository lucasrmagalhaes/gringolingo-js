import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { MESAS, avaliarMesa, MIGRAS, avaliarMigra, ESTREIAS, avaliarEstreia } = await import('../js/rodada.js');
const { FOCOS, montarFoco, notaDoFoco, faixaDoFoco } = await import('../js/foco.js');
const { notaDoSimulado, faixaDoSimulado, SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const {
  estado, limparEstadoMemoria, definirAgora, mesclarEstado, importarEstado, limparNotasFoco,
  registrarRodada, registrarMigra, registrarEstreia, registrarFoco
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
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
  ...MEETUPS.map(c => c.id)
]);

const PROIBIDAS = [
  'went well',
  'The action is',
  'checklist',
  'flaky',
  'rollback',
  'leave time for questions',
  'I would keep the sessions in Redis',
  'source of truth',
  'known hole',
  'The token was written',
  'Today I will show',
  'I am from Brazil',
  'I can stay for one drink',
  'I play the guitar',
  'Your first task',
  'This project stores',
  'May I send you a note',
  'We went with',
  'The trade-off is',
  'trade off',
  'I propose',
  'The price is'
];

const ETAPAS_COMPLETA = ['Portfólio', 'Sistema', 'Salário', 'STAR', 'Pergunta'];

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

describe('retro, migração e entrevista por foco', () => {
  test('as três listas não repetem a retro, o banco nem o primeiro dia antigo', () => {
    semTravessao('../js/rodada.js');
    conferir(MESAS, ['Fato', 'Ajuste', 'Dono'], avaliarMesa);
    conferir(MIGRAS, ['Mudança', 'Risco'], avaliarMigra);
    conferir(ESTREIAS, ['Oi', 'Pedido'], avaliarEstreia);
    const ids = [...MESAS, ...MIGRAS, ...ESTREIAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    assert.equal(ocupados.has('porFoco'), false);
    const teto = MESAS.find(c => c.id === 'teto').rodadas[1];
    assert.equal(avaliarMesa(teto, 'We will cap the queue at five.').ok, true);
    assert.equal(avaliarMesa(teto, 'We will cap the queue at 5.').ok, true);
    const lanche = ESTREIAS.find(c => c.id === 'lanche').rodadas[1];
    assert.equal(avaliarEstreia(lanche, 'May I have lunch with you?').ok, true);
    const texto = JSON.stringify({ MESAS, MIGRAS, ESTREIAS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    for (const etapa of ['Bem', 'Melhorar', 'Ação']) {
      assert.equal(MESAS.some(c => c.rodadas.some(r => r.etapa === etapa)), false, etapa);
    }
  });

  test('cada foco encadeia cinco treinos diferentes e reusa a nota', () => {
    semTravessao('../js/foco.js');
    assert.equal(montarFoco('nope', 'frontend'), null);
    assert.equal(montarFoco(null, 'frontend'), null);
    assert.equal(montarFoco('2026-10-28', 'design'), null);
    assert.deepEqual(FOCOS.map(f => f.id), ['frontend', 'backend', 'ia']);
    const esperadas = {
      frontend: ['Tela', 'Termo', 'Prazo', 'Plateia', 'Fecho'],
      backend: ['Guarda', 'Falha', 'Requisito', 'Estima', 'Fecho'],
      ia: ['Modelo', 'Métrica', 'Proposta', 'Risco', 'Fecho']
    };
    for (const foco of FOCOS) {
      const cena = montarFoco('2026-10-28', foco.id);
      assert.equal(cena.rodadas.length, 5);
      assert.equal(cena.id, 'porFoco');
      assert.deepEqual(cena.rodadas.map(r => r.etapa), esperadas[foco.id]);
      assert.deepEqual(cena, montarFoco('2026-10-28', foco.id));
      assert.notDeepEqual(cena.rodadas.map(r => r.etapa), ETAPAS_COMPLETA);
      for (let i = 0; i < foco.passos.length; i++) {
        const melhores = foco.passos[i].lista.map(c => c.rodadas[0].melhor);
        assert.equal(melhores.includes(cena.rodadas[i].melhor), true, foco.id);
      }
    }
    const frente = montarFoco('2026-10-28', 'frontend').rodadas.map(r => r.melhor);
    const servidor = montarFoco('2026-10-28', 'backend').rodadas.map(r => r.melhor);
    assert.notDeepEqual(frente, servidor);
    assert.equal(notaDoFoco([100, 50]), 75);
    assert.equal(notaDoFoco([100, 50]), notaDoSimulado([100, 50]));
    assert.equal(faixaDoFoco(90), 'Pronta para a vaga');
    assert.equal(faixaDoFoco(90), faixaDoSimulado(90));
    assert.equal(faixaDoFoco(70), 'Dá para a call');
    assert.equal(faixaDoFoco(40), 'Quase na entrevista');
    assert.equal(faixaDoFoco(0), 'Vale repetir o simulado');
  });

  test('o histórico guarda a melhor nota do dia e cabe em oito', () => {
    assert.deepEqual(limparNotasFoco('oi'), []);
    assert.deepEqual(limparNotasFoco([
      { dia: 'nope', foco: 'frontend', nota: 10 },
      { dia: '2026-10-28', foco: 'design', nota: 10 },
      { dia: '2026-10-28', foco: 'frontend', nota: 140 },
      { dia: '2026-10-28', foco: 'frontend', nota: 80 }
    ]), [{ dia: '2026-10-28', foco: 'frontend', nota: 80 }]);
    const muitas = [];
    for (let i = 1; i <= 9; i++) muitas.push({ dia: `2026-10-${String(i).padStart(2, '0')}`, foco: 'frontend', nota: i });
    const limpas = limparNotasFoco(muitas);
    assert.equal(limpas.length, 8);
    assert.equal(limpas[0].dia, '2026-10-09');
    assert.equal(limpas.at(-1).dia, '2026-10-02');

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'foco1', valor: 0, pago: false }] };
    const foco = registrarFoco(fim({ foco: 'frontend' }));
    assert.equal(foco.bonusMissoes, 15);
    assert.equal(estado.stats.focos, 1);
    assert.equal(estado.stats.completas, 0);
    assert.equal(estado.stats.simulados, 0);
    assert.ok(estado.badges.includes('foco'));
    assert.equal(estado.badges.includes('completa'), false);
    assert.deepEqual(estado.notasFoco, [{ dia: '2026-10-28', foco: 'frontend', nota: 80 }]);
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
    registrarFoco(fim({ foco: 'frontend', nota: 60 }));
    assert.equal(estado.notasFoco[0].nota, 80);
    registrarFoco(fim({ foco: 'backend', nota: 70 }));
    assert.deepEqual(estado.notasFoco.map(n => n.foco), ['backend', 'frontend']);
    registrarFoco(fim({ nota: 90 }));
    assert.equal(estado.notasFoco.some(n => n.nota === 90), false);

    mesclarEstado({
      notasFoco: [
        { dia: '2026-10-28', foco: 'frontend', nota: 90 },
        { dia: '2026-10-27', foco: 'ia', nota: 40 },
        { dia: 'nope', foco: 'frontend', nota: 10 },
        { dia: '2026-10-27', foco: 'design', nota: 10 }
      ]
    });
    assert.deepEqual(estado.notasFoco, [
      { dia: '2026-10-28', foco: 'backend', nota: 70 },
      { dia: '2026-10-28', foco: 'frontend', nota: 90 },
      { dia: '2026-10-27', foco: 'ia', nota: 40 }
    ]);
    importarEstado({ xp: 0, licoes: {}, notasFoco: 'oi' }, 'substituir');
    assert.deepEqual(estado.notasFoco, []);
  });

  test('mesa, migração e estreia contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'rodada1', valor: 0, pago: false }] };
    const mesa = registrarRodada(fim());
    assert.equal(mesa.bonusMissoes, 15);
    assert.equal(estado.stats.rodadas, 1);
    assert.equal(estado.stats.retros, 0);
    assert.ok(estado.badges.includes('rodada'));
    assert.equal(estado.badges.includes('migra'), false);
    assert.equal(estado.badges.includes('estreia'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'migra1', valor: 0, pago: false }] };
    const migra = registrarMigra(fim());
    assert.equal(migra.bonusMissoes, 15);
    assert.equal(estado.stats.migras, 1);
    assert.equal(estado.stats.bancos, 0);
    assert.equal(estado.stats.furos, 0);
    assert.ok(estado.badges.includes('migra'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'estreia1', valor: 0, pago: false }] };
    const estreia = registrarEstreia(fim());
    assert.equal(estreia.bonusMissoes, 15);
    assert.equal(estado.stats.estreias, 1);
    assert.equal(estado.stats.chegadas, 0);
    assert.equal(estado.stats.sociais, 0);
    assert.equal(estado.stats.meetups, 0);
    assert.ok(estado.badges.includes('estreia'));
    assert.equal(estado.painel['2026-10-28'].grupos.cotidiano, 1);
    assert.ok(BADGES.length >= 109);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 2.26 deixa o foco fora do passeio e o histórico na tela', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /versao: '2\.26'/);
    assert.match(data, /versao: '2\.25'/);
    assert.match(sw, /\.\/js\/rodada\.js/);
    assert.match(sw, /\.\/js\/foco\.js/);
    assert.match(turno, /rodada\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarRodada', 'pintarMigra', 'pintarEstreia', 'pintarFoco']) {
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function textoPasseio'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarRodada'), false);
    assert.equal(passeio.includes('function pintarFoco'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const papo = app.slice(app.indexOf('function telaPapo'), app.indexOf('function telaSimulado'));
    assert.match(papo, /function pintarPapo/);
    assert.match(papo, /montarPapo/);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.match(bloco, /foco-passos/);
    assert.match(bloco, /foco-notas/);
    assert.match(bloco, /aria-pressed/);
    assert.match(bloco, /Ainda não há nota neste aparelho/);
    assert.match(bloco, /faixaDoFoco/);
    assert.equal(bloco.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /rodada: telaRodadas/);
    assert.match(mapa, /migra: telaMigras/);
    assert.match(mapa, /estreia: telaEstreias/);
    assert.match(mapa, /foco: telaFoco/);
  });
});
