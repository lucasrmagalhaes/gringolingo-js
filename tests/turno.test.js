import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  GESTORES, avaliarGestor,
  FINAIS, avaliarFinal,
  VIAGENS, avaliarViagem,
  coletarFaladas, montarRevisao, catalogoFaladas,
  avaliarRevisao, SEGUNDOS_REVISAO
} = await import('../js/turno.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarGestor, registrarFinal, registrarViagem, registrarMistura
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS, IDIOMAS, PERGUNTAS_DIA } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS, NUMEROS } = await import('../js/ensaio.js');
const { OPINIOES, CENAS_FALA } = await import('../js/opiniao.js');
const { RELATOS, CORTESIAS, AQUECIMENTOS, CLAROS } = await import('../js/call.js');
const { DEMOS, PRAZOS, STARS, ENFASES } = await import('../js/palco.js');
const { DECISOES, PARES, INCIDENTES } = await import('../js/plantao.js');
const { RETROS, CHEGADAS, LIGACOES } = await import('../js/discurso.js');
const { ESTIMATIVAS, CONSENSOS, ATENDIMENTOS } = await import('../js/cotidiano.js');

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
  ...ATENDIMENTOS.map(c => c.id)
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
}

function conferirCena(lista, etapas, avaliar) {
  assert.equal(new Set(lista.map(c => c.id)).size, lista.length);
  for (const cena of lista) {
    assert.equal(ocupados.has(cena.id), false, cena.id);
    assert.deepEqual(cena.rodadas.map(r => r.etapa), etapas);
    for (const rodada of cena.rodadas) {
      assert.ok(rodada.aceitas.length >= 2, cena.id);
      assert.equal(avaliar(rodada, rodada.melhor).ok, true, rodada.melhor);
      assert.equal(avaliar(rodada, 'The weather is nice.').ok, false);
    }
  }
}

describe('1:1, entrevista, viagem e revisão de 3 minutos', () => {
  test('o 1:1 recebe um ponto e devolve um pedido', () => {
    conferirCena(GESTORES, ['Ouvir', 'Falar'], avaliarGestor);
    assert.equal(GESTORES.length, 3);
    const elogio = GESTORES[0].rodadas;
    assert.equal(avaliarGestor(elogio[0], 'Thanks. I will keep the updates short.').ok, true);
    assert.equal(avaliarGestor(elogio[1], 'Could you point out one thing that worked?').ok, true);
    const ponto = GESTORES[1].rodadas[0];
    assert.equal(avaliarGestor(ponto, 'Thanks for the feedback. I will write the tests earlier.').ok, true);
  });

  test('a pergunta final não repete a semana normal da entrevista longa', () => {
    conferirCena(FINAIS, ['Pergunta', 'Detalhe'], avaliarFinal);
    assert.equal(FINAIS.length, 3);
    const texto = JSON.stringify(FINAIS);
    assert.equal(texto.includes('normal week'), false);
    const time = FINAIS[0].rodadas;
    assert.equal(avaliarFinal(time[0], 'What does the team use for code review?').ok, true);
    assert.equal(avaliarFinal(time[1], 'How many reviewers do you usually need?').ok, true);
    assert.equal(avaliarFinal(FINAIS[1].rodadas[0], 'What does success look like in the first ninety days?').ok, true);
  });

  test('a viagem cobre conexão, imigração e táxi sem repetir o portão', () => {
    conferirCena(VIAGENS, ['Situação', 'Pedido'], avaliarViagem);
    assert.equal(VIAGENS.length, 3);
    const texto = VIAGENS.flatMap(c => c.rodadas.map(r => r.melhor)).join(' ');
    assert.equal(texto.includes('gate 8'), false);
    assert.equal(texto.includes('boarding pass'), false);
    assert.equal(texto.includes('reservation'), false);
    const imigracao = VIAGENS[1].rodadas;
    assert.equal(avaliarViagem(imigracao[0], "I'm here for a business trip.").ok, true);
    assert.equal(avaliarViagem(imigracao[1], 'I will stay for three days.').ok, true);
    assert.equal(avaliarViagem(VIAGENS[2].rodadas[1], 'How long will this ride take?').ok, true);
    const ids = [...GESTORES, ...FINAIS, ...VIAGENS].map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('a revisão mistura origens e cabe em 3 minutos', () => {
    assert.equal(SEGUNDOS_REVISAO, 180);
    const mix = montarRevisao([
      { origem: 'A', melhor: 'One cat.', aceitas: ['one cat'], missao: 'um' },
      { origem: 'A', melhor: 'Two cats.', aceitas: ['two cats'], missao: 'dois' },
      { origem: 'B', melhor: 'One dog.', aceitas: ['one dog'], missao: 'cao' }
    ], '2026-11-03', 3);
    assert.equal(mix.length, 3);
    assert.notEqual(mix[0].origem, mix[1].origem);
    assert.deepEqual(montarRevisao(mix, '2026-11-03', 2), montarRevisao(mix, '2026-11-03', 2));
    assert.equal(montarRevisao(mix, 'ontem', 4).length, 0);
    assert.equal(montarRevisao([], '2026-11-03', 4).length, 0);
    assert.equal(montarRevisao(mix, '2026-11-03', 0).length, 1);
    assert.equal(montarRevisao(mix, '2026-11-03', 40).length, 3);

    const faladas = coletarFaladas([
      { origem: 'Um', itens: [{ id: 'a', rodadas: [{ melhor: 'One cat sits.', aceitas: ['one cat sits'], missao: 'gato' }] }] },
      { origem: 'Um', itens: [{ melhor: 'One cat sits.', aceitas: ['one cat sits'], pt: 'de novo' }] },
      { origem: 'Dois', itens: [{ melhor: 'One dog runs.', aceitas: ['one dog runs'], pergunta: 'O cachorro?' }] }
    ]);
    assert.equal(faladas.length, 2);
    assert.equal(faladas[1].missao, 'O cachorro?');
    assert.equal(avaliarRevisao(faladas[1], 'One dog runs.').ok, true);

    const catalogo = catalogoFaladas();
    assert.ok(catalogo.length >= 40);
    assert.ok(new Set(catalogo.map(item => item.origem)).size >= 8);
    assert.equal(catalogoFaladas(), catalogo);
    const doDia = montarRevisao(catalogo, '2026-11-03', 8);
    assert.equal(doDia.length, 8);
    assert.ok(new Set(doDia.map(item => item.origem)).size >= 2);
  });

  test('as conquistas novas não contam como diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'gestor1', valor: 0, pago: false }] };
    const gestor = registrarGestor({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.gestores, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.tecnicos, 0);
    assert.ok(estado.badges.includes('gestor'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(gestor.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarFinal({ xp: 26, nota: 90, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.finais, 1);
    assert.ok(estado.badges.includes('final'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'viagem1', valor: 0, pago: false }] };
    const viagem = registrarViagem({
      xp: 26, nota: 70, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.viagens, 1);
    assert.ok(estado.badges.includes('mala'));
    assert.equal(viagem.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);

    registrarMistura({ xp: 14, nota: 50, acertos: 2, respostas: 4, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.misturas, 1);
    assert.ok(estado.badges.includes('mistura'));
    assert.equal(estado.stats.falas, 0);
  });

  test('a versão 2.12 guarda o módulo e o relógio não envia sozinho', () => {
    semTravessao('../js/turno.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(data, /versao: '2\.12'/);
    assert.match(sw, /\.\/js\/turno\.js/);
    assert.equal(app.includes('PRÓXIMA PERGUNTA'), false);
    assert.match(app, /clearInterval\(intervaloRevisao\)/);
    assert.match(app, /data-cronometro-revisao/);
    const marca = "botao.textContent = 'TEM CERTEZA?'";
    const certeza = app.slice(app.indexOf(marca), app.indexOf(marca) + 500);
    assert.match(certeza, /timerDeTela/);
    assert.equal(certeza.includes('setTimeout'), false);
  });
});
