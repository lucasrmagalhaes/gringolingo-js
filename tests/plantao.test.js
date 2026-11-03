import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  DECISOES, avaliarDecisao,
  PARES, avaliarPar,
  INCIDENTES, avaliarIncidente,
  planoDaSemana
} = await import('../js/plantao.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarDecisao, registrarPar, registrarPlantao
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS, IDIOMAS, PERGUNTAS_DIA } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS, NUMEROS } = await import('../js/ensaio.js');
const { OPINIOES, CENAS_FALA } = await import('../js/opiniao.js');
const { RELATOS, CORTESIAS, AQUECIMENTOS, CLAROS } = await import('../js/call.js');
const { DEMOS, PRAZOS, STARS, ENFASES } = await import('../js/palco.js');

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
  ...ENFASES.map(c => c.id)
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

describe('decisão, pair e plantão', () => {
  test('a decisão explica a escolha e a troca', () => {
    assert.equal(DECISOES.length, 3);
    conferirCena(DECISOES, ['Escolha', 'Troca'], avaliarDecisao);
    const escolha = DECISOES[0].rodadas[0];
    const troca = DECISOES[0].rodadas[1];
    assert.equal(avaliarDecisao(escolha, 'We went with Postgres because the team already knows it.').ok, true);
    assert.equal(avaliarDecisao(troca, 'The trade-off is a slower start on the new query.').ok, true);
  });

  test('o pair narra o agora e pede ajuda', () => {
    assert.equal(PARES.length, 3);
    conferirCena(PARES, ['Narrar', 'Ajuda'], avaliarPar);
    const narrar = PARES[0].rodadas[0];
    const ajuda = PARES[0].rodadas[1];
    assert.equal(avaliarPar(narrar, 'I am reading the login test.').ok, true);
    assert.equal(avaliarPar(ajuda, 'Could you take a look at this loop?').ok, true);
  });

  test('o plantão tem status, desculpa e próximo passo', () => {
    assert.equal(INCIDENTES.length, 3);
    conferirCena(INCIDENTES, ['Status', 'Desculpa', 'Próximo'], avaliarIncidente);
    const queda = INCIDENTES[0];
    assert.equal(avaliarIncidente(queda.rodadas[0], 'The login is down for some users.').ok, true);
    assert.equal(avaliarIncidente(queda.rodadas[1], 'I am sorry for the delay.').ok, true);
    assert.equal(avaliarIncidente(queda.rodadas[2], 'The next step is to roll back.').ok, true);
    const ids = [...DECISOES, ...PARES, ...INCIDENTES].map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('o plano da semana sai dos deslizes e dos padrões', () => {
    const vazio = planoDaSemana();
    assert.deepEqual(vazio.map(item => item.id), ['livre']);
    assert.match(vazio[0].porque, /não há deslize/);

    const um = planoDaSemana({ deslizes: 1 });
    assert.equal(um[0].id, 'deslize');
    assert.match(um[0].porque, /Uma frase/);

    const cheio = planoDaSemana({
      deslizes: 3,
      padroes: [
        { chave: 'tempo', n: 4 },
        { chave: 'ordem', n: 3 },
        { chave: 'troca', n: 9 }
      ]
    });
    assert.deepEqual(cheio.map(item => item.id), ['deslize', 'conto', 'enfase']);
    assert.match(cheio[0].porque, /3 frases/);
    assert.match(cheio[1].porque, /4 vezes/);

    const palavra = planoDaSemana({
      padroes: [
        { chave: 'troca', n: 5 },
        { chave: 'typo', n: 2 },
        { chave: 'cognato:office', n: 2 }
      ]
    });
    assert.deepEqual(palavra.map(item => item.id), ['claro']);
    assert.match(palavra[0].porque, /trocada/);

    const branco = planoDaSemana({ padroes: [{ chave: 'vazio', n: 2 }] });
    assert.equal(branco[0].id, 'rapido');
    assert.equal(planoDaSemana({ padroes: [{ chave: 'outra', n: 8 }] }).map(item => item.id).join(','), 'livre');
  });

  test('decisão, pair e plantão não viram diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'decisao1', valor: 0, pago: false }] };
    const decisao = registrarDecisao({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.decisoes, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.tecnicos, 0);
    assert.ok(estado.badges.includes('decisao'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(decisao.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarPar({ xp: 18, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.pares, 1);
    assert.ok(estado.badges.includes('par'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'plantao1', valor: 0, pago: false }] };
    const plantao = registrarPlantao({
      xp: 34, nota: 70, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.incidentes, 1);
    assert.ok(estado.badges.includes('plantao'));
    assert.equal(plantao.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);
  });

  test('o módulo novo não usa travessão e o topo respeita a área segura', () => {
    semTravessao('../js/plantao.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /VERSAO_APP = '2\.9'/);
    assert.match(sw, /gringolingo-v36/);
    assert.match(sw, /\.\/js\/plantao\.js/);
    assert.match(css, /padding: env\(safe-area-inset-top\)/);
    assert.match(css, /\.topo \{[\s\S]*top: env\(safe-area-inset-top\)/);
    assert.match(css, /\.logo-tela/);
  });
});
