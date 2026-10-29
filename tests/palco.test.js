import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  SEGUNDOS_DEMO,
  DEMOS, avaliarDemo,
  PRAZOS, avaliarPrazo,
  STARS, avaliarStar,
  ENFASES, avaliarEnfase, avaliarToque
} = await import('../js/palco.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarDemo, registrarPrazo, registrarStar, registrarEnfase
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS, IDIOMAS, PERGUNTAS_DIA } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS, NUMEROS } = await import('../js/ensaio.js');
const { OPINIOES, CENAS_FALA } = await import('../js/opiniao.js');
const { RELATOS, CORTESIAS, AQUECIMENTOS, CLAROS } = await import('../js/call.js');

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
  ...CLAROS.map(c => c.id)
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

describe('fala no palco', () => {
  test('a demo tem um minuto e duas respostas da plateia', () => {
    assert.equal(SEGUNDOS_DEMO, 60);
    assert.equal(DEMOS.length, 3);
    conferirCena(DEMOS, ['Um minuto', 'Plateia', 'Plateia'], avaliarDemo);
    for (const cena of DEMOS) {
      assert.equal(cena.rodadas[0].segundos, 60, cena.id);
      assert.equal(cena.rodadas[1].segundos, undefined);
      assert.equal(cena.rodadas[2].segundos, undefined);
    }
    const abertura = DEMOS[0].rodadas[0];
    assert.equal(avaliarDemo(abertura, 'Today I will show offline mode.').ok, true);
  });

  test('o prazo usa sugestão e pedido educado', () => {
    assert.equal(PRAZOS.length, 3);
    conferirCena(PRAZOS, ['Sugerir', 'Trocar'], avaliarPrazo);
    const sugerir = PRAZOS[0].rodadas[0];
    const sexta = PRAZOS[1].rodadas[0];
    assert.equal(avaliarPrazo(sugerir, "I'd suggest we ship search first.").ok, true);
    assert.equal(avaliarPrazo(sexta, 'Could we move the deadline to Friday?').ok, true);
  });

  test('a entrevista STAR tem situação, tarefa, ação e resultado', () => {
    assert.equal(STARS.length, 3);
    conferirCena(STARS, ['Situação', 'Tarefa', 'Ação', 'Resultado'], avaliarStar);
    const situacao = STARS[0].rodadas[0];
    assert.equal(avaliarStar(situacao, 'Last month the designer and I wanted different labels.').ok, true);
  });

  test('a ênfase separa a palavra forte da curva da pergunta', () => {
    assert.equal(ENFASES.length, 8);
    const ids = ENFASES.map(item => item.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const item of ENFASES) {
      assert.equal(ocupados.has(item.id), false, item.id);
      assert.ok(item.pt);
      assert.ok(item.aceitas.length >= 2, item.id);
      assert.equal(avaliarEnfase(item, item.melhor).ok, true, item.melhor);
      const vazio = avaliarEnfase(item, '');
      assert.equal(vazio.ok, false);
      assert.equal(vazio.melhor, item.melhor);
      if (item.tipo === 'curva') {
        assert.ok(item.curva === 'sobe' || item.curva === 'desce', item.id);
        assert.equal(avaliarToque(item, item.curva).ok, true);
        assert.equal(avaliarToque(item, item.curva === 'sobe' ? 'desce' : 'sobe').ok, false);
      } else {
        assert.ok(item.palavras.map(p => p.toLowerCase()).includes(item.foco.toLowerCase()), item.id);
        assert.equal(avaliarToque(item, item.foco).ok, true);
        assert.equal(avaliarToque(item, 'send').ok, item.foco.toLowerCase() === 'send');
      }
    }
    const voce = ENFASES.find(item => item.id === 'voce');
    assert.equal(avaliarToque(voce, 'YOU').ok, true);
    assert.equal(avaliarToque(voce, 'file').ok, false);
    assert.equal(avaliarEnfase(voce, 'Did you send the file?').ok, true);
    const sim = ENFASES.find(item => item.id === 'sim');
    assert.equal(avaliarToque(sim, 'sobe').ok, true);
    assert.equal(avaliarEnfase(sim, 'Do you want coffee?').ok, true);
  });

  test('demo, prazo, STAR e ênfase não viram diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'demo1', valor: 0, pago: false }] };
    const demo = registrarDemo({
      xp: 34, nota: 80, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.demos, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.tecnicos, 0);
    assert.equal(estado.stats.entrevistas, 0);
    assert.ok(estado.badges.includes('demo'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(demo.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarPrazo({ xp: 18, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.negociacoes, 1);
    assert.ok(estado.badges.includes('prazo'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'star1', valor: 0, pago: false }] };
    const star = registrarStar({
      xp: 42, nota: 75, acertos: 4, respostas: 4, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.stars, 1);
    assert.ok(estado.badges.includes('star'));
    assert.equal(star.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);

    registrarEnfase({ xp: 16, nota: 50, acertos: 2, respostas: 4, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.enfases, 1);
    assert.ok(estado.badges.includes('enfase'));
    assert.equal(estado.stats.dialogos, 0);
  });

  test('o módulo novo não usa travessão e a versão sobe', () => {
    semTravessao('../js/palco.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '2\.8'/);
    assert.match(sw, /gringolingo-v35/);
    assert.match(sw, /\.\/js\/palco\.js/);
  });
});
