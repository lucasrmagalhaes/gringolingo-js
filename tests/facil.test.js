import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  FACILS, avaliarFacil, ESCOLHAS, avaliarEscolhaStack, SABADOS, avaliarSabado,
  poolSurpresa, treinoDoDia, textoDaSurpresa, textoDoRecorde
} = await import('../js/facil.js');
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
  estado, limparEstadoMemoria, definirAgora, streakAtual,
  registrarFacil, registrarEscolhaStack, registrarSabado, registrarTreino,
  armarSurpresa, resumoSurpresa, mesclarEstado, exportarEstado, importarEstado
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
const { TREINOS } = await import('../js/hub.js');

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
  ...VISTOS.map(c => c.id)
]);

const PROIBIDAS = [
  'I had a quiet weekend',
  'How was your weekend',
  'How was yours',
  'I play the guitar on weekends',
  'I practice a little on Sunday',
  'My team plays on Sunday',
  'I am a full stack developer',
  'I built an API in Node',
  'Could we skip the extra meeting',
  'Please keep',
  'This gray text fails the contrast check',
  'The list stays empty after I save',
  'I need a work visa for this role',
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

function travarMissao(id) {
  estado.missoes = { dia: '2026-10-28', progresso: [{ id, valor: 0, pago: false }] };
}

function outroTreino(hojeId) {
  return ['facil', 'stack', 'sabado'].find(id => id !== hojeId);
}

function registrarOutro(id, d) {
  if (id === 'facil') return registrarFacil(d);
  if (id === 'stack') return registrarEscolhaStack(d);
  return registrarSabado(d);
}

function completarSurpresa(iso, data) {
  definirAgora(() => new Date(data.getTime()));
  const treino = treinoDoDia(TREINOS, iso);
  assert.ok(treino, iso);
  assert.equal(armarSurpresa(treino.id), true);
  return registrarTreino(treino.id, fim());
}

describe('facilitador, escolha, sábado e a surpresa', () => {
  test('as três listas não repetem o fim de semana, a stack pronta nem o pulo da reunião', () => {
    const fonte = semTravessao('../js/facil.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    conferir(FACILS, ['Abertura', 'Fecho'], avaliarFacil);
    conferir(ESCOLHAS, ['Escolha', 'Troca'], avaliarEscolhaStack);
    conferir(SABADOS, ['Feito', 'Plano'], avaliarSabado);
    const ids = [...FACILS, ...ESCOLHAS, ...SABADOS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const topicos = FACILS.find(c => c.id === 'abremeta').rodadas[1];
    assert.equal(avaliarFacil(topicos, 'We have 3 topics today.').ok, true);
    assert.equal(avaliarFacil(FACILS[0].rodadas[0], "Let's open with the goal.").ok, true);
    const minutos = FACILS.find(c => c.id === 'relogio5').rodadas[0];
    assert.equal(avaliarFacil(minutos, 'We have 5 minutes left.').ok, true);
    const texto = JSON.stringify({ FACILS, ESCOLHAS, SABADOS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Facilitador' && f.melhor === 'Let us open with the goal.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Escolha' && f.melhor === 'I would start this app in React.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Sábado' && f.melhor === 'I went hiking on Saturday.'), true);
  });

  test('facilitador, escolha e sábado contam no próprio contador', () => {
    travarMissao('facil1');
    const facil = registrarFacil(fim());
    assert.equal(facil.bonusMissoes, 15);
    assert.equal(estado.stats.facils, 1);
    assert.equal(estado.stats.stacks, 0);
    assert.equal(estado.stats.surpresas, 0);
    assert.equal(estado.surpresaStreak, 0);
    assert.ok(estado.badges.includes('facil'));
    for (const id of ['stack', 'sabado', 'surpresa', 'ux', 'aquecer', 'idioma', 'retro', 'social', 'desafio']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('stack1');
    const stack = registrarEscolhaStack(fim());
    assert.equal(stack.bonusMissoes, 15);
    assert.equal(estado.stats.stacks, 1);
    assert.equal(estado.stats.sabados, 0);
    assert.ok(estado.badges.includes('stack'));
    assert.equal(estado.badges.includes('sabado'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    travarMissao('sabado1');
    const sabado = registrarSabado(fim());
    assert.equal(sabado.bonusMissoes, 15);
    assert.equal(estado.stats.sabados, 1);
    assert.equal(estado.stats.surpresas, 0);
    assert.ok(estado.badges.includes('sabado'));
    assert.equal(estado.badges.includes('surpresa'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.cotidiano, 1);
    assert.equal(estado.painel['2026-10-28'].grupos.revisao, undefined);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(estado.sequenciaDesafio, 0);
    assert.ok(BADGES.length >= 138);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a surpresa só conta se o treino do dia foi armado', () => {
    const pool = poolSurpresa(TREINOS);
    for (const id of FORA) assert.equal(pool.some(t => t.id === id), false, id);
    assert.ok(pool.some(t => t.id === 'facil'));
    assert.equal(treinoDoDia([], '2026-10-28'), null);
    assert.equal(treinoDoDia(TREINOS, 'nao-e-data'), null);
    assert.equal(treinoDoDia(TREINOS, '2026-10-28T15:00:00'), null);
    const hojeTreino = treinoDoDia(TREINOS, '2026-10-28');
    const deNovo = treinoDoDia(TREINOS, '2026-10-28');
    assert.equal(hojeTreino.id, deNovo.id);
    assert.equal(hojeTreino.stat ? true : false, true);
    assert.equal(FORA.includes(hojeTreino.id), false);
    const janeiro = treinoDoDia(TREINOS, '2026-01-02');
    assert.notEqual(hojeTreino.id, janeiro.id);

    const falso = { titulo: 'A meta' };
    assert.equal(textoDaSurpresa(null, { sequencia: 0 }), 'Não há treino surpresa nesta data. Sequência surpresa: 0 dias.');
    assert.equal(textoDaSurpresa(falso, { sequencia: 2 }), 'O treino de hoje é A meta. Sequência surpresa: 2 dias.');
    assert.equal(textoDaSurpresa(falso, { feito: true, sequencia: 1 }), 'Você já fez o treino de hoje: A meta. Sequência surpresa: 1 dia.');
    assert.equal(textoDoRecorde(0), 'Recorde da surpresa: 0 dias.');
    assert.equal(textoDoRecorde(1), 'Recorde da surpresa: 1 dia.');
    assert.equal(textoDoRecorde(4), 'Recorde da surpresa: 4 dias.');

    assert.equal(armarSurpresa(''), false);
    assert.equal(armarSurpresa('x'.repeat(41)), false);
    assert.equal(armarSurpresa('__proto__'), false);
    assert.equal(armarSurpresa(hojeTreino.id), true);
    const outro = outroTreino(hojeTreino.id);
    assert.equal(armarSurpresa(outro), false);
    assert.equal(estado.surpresaArmada, hojeTreino.id);
    travarMissao('perfeita1');
    registrarOutro(outro, fim());
    assert.equal(estado.surpresaStreak, 0);
    assert.equal(estado.stats.surpresas, 0);
    assert.equal(estado.surpresaArmada, hojeTreino.id);
    assert.equal(estado.xp, 26);

    travarMissao('surpresa1');
    const feito = registrarTreino(hojeTreino.id, fim());
    assert.equal(feito.bonusMissoes, 15);
    assert.equal(estado.surpresaStreak, 1);
    assert.equal(estado.stats.surpresas, 1);
    assert.equal(estado.surpresaDia, '2026-10-28');
    assert.equal(estado.sequenciaDesafio, 0);
    assert.equal(estado.surpresaArmada, '');
    assert.equal(estado.recordeSurpresa, 1);
    assert.equal(estado.xp, 26 + 26 + 15 + 10);
    assert.ok(estado.badges.includes('surpresa'));
    assert.equal(resumoSurpresa().feito, true);
    assert.equal(resumoSurpresa().sequencia, 1);

    assert.equal(armarSurpresa(hojeTreino.id), true);
    const repetido = registrarTreino(hojeTreino.id, fim());
    assert.equal(repetido.bonusMissoes, 0);
    assert.equal(estado.surpresaStreak, 1);
    assert.equal(estado.stats.surpresas, 1);
    assert.equal(estado.surpresaArmada, '');
    assert.equal(estado.xp, 26 + 26 + 15 + 10 + 26);
    assert.equal(estado.sequenciaDesafio, 0);
  });

  test('a sequência da surpresa não usa o protetor e não segue o desafio', () => {
    travarMissao('perfeita1');
    completarSurpresa('2026-10-26', new Date(2026, 9, 26, 15, 0, 0));
    assert.equal(estado.surpresaStreak, 1);
    assert.equal(estado.surpresaDia, '2026-10-26');
    definirAgora(dia);
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'perfeita1', valor: 0, pago: false }] };
    const noIntervalo = resumoSurpresa();
    assert.equal(noIntervalo.sequencia, 0);
    assert.equal(noIntervalo.feito, false);
    assert.equal(estado.surpresaStreak, 1);
    completarSurpresa('2026-10-28', new Date(2026, 9, 28, 15, 0, 0));
    assert.equal(estado.surpresaStreak, 1);
    assert.equal(estado.recordeSurpresa, 1);
    assert.equal(estado.sequenciaDesafio, 0);

    limparEstadoMemoria();
    travarMissao('perfeita1');
    completarSurpresa('2026-10-27', new Date(2026, 9, 27, 15, 0, 0));
    definirAgora(dia);
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'perfeita1', valor: 0, pago: false }] };
    assert.equal(resumoSurpresa().sequencia, 1);
    completarSurpresa('2026-10-28', new Date(2026, 9, 28, 15, 0, 0));
    assert.equal(estado.surpresaStreak, 2);
    assert.equal(estado.recordeSurpresa, 2);
    assert.equal(estado.surpresaDia, '2026-10-28');
    assert.equal(estado.sequenciaDesafio, 0);

    limparEstadoMemoria();
    estado.ultimoDia = '2026-10-26';
    estado.streak = 4;
    estado.protetores = 1;
    estado.protetoresGastos = 0;
    estado.surpresaDia = '2026-10-26';
    estado.surpresaStreak = 4;
    estado.recordeSurpresa = 4;
    definirAgora(dia);
    assert.equal(resumoSurpresa().sequencia, 0);
    assert.equal(estado.surpresaStreak, 4);
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'perfeita1', valor: 0, pago: false }] };
    const ponte = completarSurpresa('2026-10-28', new Date(2026, 9, 28, 15, 0, 0));
    assert.equal(ponte.usouProtetor, true);
    assert.equal(estado.streak, 5);
    assert.equal(streakAtual(), 5);
    assert.equal(estado.protetores, 0);
    assert.equal(estado.surpresaStreak, 1);
    assert.equal(estado.recordeSurpresa, 4);
    assert.equal(estado.sequenciaDesafio, 0);
  });

  test('o merge guarda a sequência e deixa o braço só neste aparelho', () => {
    const hojeTreino = treinoDoDia(TREINOS, '2026-10-28');
    assert.equal(armarSurpresa(hojeTreino.id), true);
    mesclarEstado({
      surpresaDia: '2026-10-27',
      surpresaStreak: 4,
      recordeSurpresa: 6,
      surpresaArmada: 'facil',
      surpresaArmadaDia: '2026-10-28'
    });
    assert.equal(estado.surpresaDia, '2026-10-27');
    assert.equal(estado.surpresaStreak, 4);
    assert.equal(estado.recordeSurpresa, 6);
    assert.equal(estado.surpresaArmada, hojeTreino.id);
    assert.equal(estado.surpresaArmadaDia, '2026-10-28');
    const backup = exportarEstado('2.34');
    importarEstado(backup, 'substituir');
    assert.equal(estado.surpresaDia, '2026-10-27');
    assert.equal(estado.surpresaStreak, 4);
    assert.equal(estado.recordeSurpresa, 6);
    assert.equal(estado.surpresaArmada, hojeTreino.id);

    limparEstadoMemoria();
    mesclarEstado({ surpresaDia: '2026-10-01', surpresaStreak: 50000, recordeSurpresa: 80000 });
    assert.equal(estado.surpresaStreak, 9999);
    assert.equal(estado.recordeSurpresa, 9999);
    const bruto = exportarEstado('2.34');
    bruto.estado.surpresaStreak = 99999;
    bruto.estado.recordeSurpresa = 99999;
    bruto.estado.surpresaDia = '2026-10-28';
    importarEstado(bruto, 'substituir');
    assert.equal(estado.surpresaStreak, 9999);
    assert.equal(estado.recordeSurpresa, 9999);
  });

  test('a versão 2.34 deixa a surpresa fora do passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const game = readFileSync(join(raiz, 'js/game.js'), 'utf8');
    assert.match(data, /versao: '2\.34'/);
    assert.match(data, /versao: '2\.33'/);
    assert.match(sw, /gringolingo-v/);
    assert.match(sw, /\.\/js\/facil\.js/);
    assert.match(turno, /facil\.js/);
    assert.equal(turno.includes('foco.js'), false);
    const marca = game.slice(game.indexOf('function marcarSurpresa'), game.indexOf('export function armarSurpresa'));
    assert.equal(marca.includes('protetores'), false);
    assert.match(game, /surpresa: surpresaPronta\(tipo, diaSessao\)/);
    for (const nome of ['pintarFacil', 'pintarStack', 'pintarSabado', 'telaSurpresa']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarMes'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function cartaoSobre'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarFacil'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const novo = app.slice(app.indexOf('function telaFacils'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.match(novo, /data-foco/);
    assert.equal(novo.includes('Melhor jeito'), false);
    const surpresa = app.slice(app.indexOf('function telaSurpresa'), app.indexOf('function telaAbertas'));
    assert.match(surpresa, /data-foco/);
    assert.equal(surpresa.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /facil: telaFacils/);
    assert.match(mapa, /stack: telaStacks/);
    assert.match(mapa, /sabado: telaSabados/);
    assert.match(mapa, /surpresa: telaSurpresa/);
  });
});
