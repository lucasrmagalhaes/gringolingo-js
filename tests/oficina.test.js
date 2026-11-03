import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  LINHAS, avaliarLinha,
  SLACKS, avaliarSlack,
  SOCIAIS, avaliarSocial,
  TERMOS, avaliarTermo
} = await import('../js/oficina.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarLinha, registrarSlack, registrarSocial, registrarTermo
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
const { GESTORES, FINAIS, VIAGENS } = await import('../js/turno.js');

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
  ...VIAGENS.map(c => c.id)
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

describe('linha, slack, social e termos', () => {
  test('a linha nomeia loop, callback, null check e edge case', () => {
    conferirCena(LINHAS, ['Linha', 'Nome'], avaliarLinha);
    assert.equal(LINHAS.length, 3);
    assert.equal(avaliarLinha(LINHAS[0].rodadas[0], 'This loop walks the list.').ok, true);
    assert.equal(avaliarLinha(LINHAS[0].rodadas[1], 'This callback runs when the loop ends.').ok, true);
    assert.equal(avaliarLinha(LINHAS[1].rodadas[0], 'A callback is a function you pass in.').ok, true);
    assert.equal(avaliarLinha(LINHAS[2].rodadas[0], 'This null check stops a crash.').ok, true);
    assert.equal(avaliarLinha(LINHAS[2].rodadas[1], 'An empty list is an edge case.').ok, true);
  });

  test('o Slack pede review e avisa atraso em frase curta', () => {
    conferirCena(SLACKS, ['Pedido', 'Detalhe'], avaliarSlack);
    assert.equal(SLACKS.length, 3);
    const olhar = SLACKS[0].rodadas;
    assert.equal(avaliarSlack(olhar[0], 'Could you review this PR?').ok, true);
    assert.equal(avaliarSlack(olhar[1], 'No rush. The tests passed.').ok, true);
    assert.equal(avaliarSlack(SLACKS[1].rodadas[0], 'The fix will slip to tomorrow.').ok, true);
    for (const cena of SLACKS) {
      for (const rodada of cena.rodadas) assert.ok(rodada.melhor.split(' ').length <= 8, rodada.melhor);
    }
  });

  test('o papo cobre happy hour, hobby e Brasil', () => {
    conferirCena(SOCIAIS, ['Papo', 'Detalhe'], avaliarSocial);
    assert.equal(SOCIAIS.length, 3);
    assert.equal(avaliarSocial(SOCIAIS[0].rodadas[0], 'I can stay for one drink.').ok, true);
    assert.equal(avaliarSocial(SOCIAIS[1].rodadas[0], 'I play the guitar on weekends.').ok, true);
    assert.equal(avaliarSocial(SOCIAIS[2].rodadas[0], "I'm from Brazil.").ok, true);
    assert.equal(avaliarSocial(SOCIAIS[2].rodadas[1], 'I miss the food.').ok, true);
    const texto = JSON.stringify(SOCIAIS);
    assert.equal(texto.includes('one minute'), false);
  });

  test('os termos técnicos trazem o som que o brasileiro troca', () => {
    conferirCena(TERMOS, ['Som', 'Frase'], avaliarTermo);
    assert.equal(TERMOS.length, 6);
    const sons = TERMOS.map(c => c.rodadas[0].melhor);
    assert.deepEqual(sons, [
      'Cache sounds like cash.',
      'Queue sounds like cue.',
      'SQL sounds like sequel.',
      'GUI sounds like gooey.',
      'Height sounds like hite.',
      'Width rhymes with with.'
    ]);
    assert.equal(avaliarTermo(TERMOS[0].rodadas[1], 'The cache is empty.').ok, true);
    assert.equal(avaliarTermo(TERMOS[2].rodadas[0], 'SQL is pronounced sequel.').ok, true);
    assert.equal(avaliarTermo(TERMOS[4].rodadas[1], 'The height is forty pixels.').ok, true);
    const ids = [...LINHAS, ...SLACKS, ...SOCIAIS, ...TERMOS].map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('as conquistas novas não contam como diálogo nem como pronúncia antiga', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'linha1', valor: 0, pago: false }] };
    const linha = registrarLinha({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.linhas, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('linha'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(linha.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'slack1', valor: 0, pago: false }] };
    const slack = registrarSlack({
      xp: 26, nota: 90, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.slacks, 1);
    assert.ok(estado.badges.includes('slack'));
    assert.equal(slack.bonusMissoes, 15);

    registrarSocial({ xp: 26, nota: 70, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.sociais, 1);
    assert.ok(estado.badges.includes('social'));

    registrarTermo({ xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.termos, 1);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('termo'));
  });

  test('a versão 2.13 nomeia o tema e o relógio da revisão acorda a cada segundo', () => {
    semTravessao('../js/oficina.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(data, /versao: '2\.13'/);
    assert.match(data, /versao: '2\.12'/);
    assert.match(sw, /\.\/js\/oficina\.js/);
    const tema = app.slice(app.indexOf('function botaoTema'), app.indexOf('function checarGoogle'));
    assert.match(tema, /Mudar para o tema claro/);
    assert.match(tema, /aria-pressed/);
    const relogio = app.slice(app.indexOf('function ligarCronometroRevisao'), app.indexOf('function pintarMistura'));
    assert.match(relogio, /1000\)/);
    assert.equal(relogio.includes('250'), false);
    const pintura = app.slice(app.indexOf('function pintarMistura'), app.indexOf('function telaRetros'));
    assert.match(pintura, /aria-live': 'off'/);
  });
});
