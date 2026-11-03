import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  RETROS, avaliarRetro,
  CHEGADAS, avaliarChegada,
  LIGACOES, avaliarLigacao
} = await import('../js/discurso.js');
const { nomeDoTreino } = await import('../js/plantao.js');
const { rotuloGravacao } = await import('../js/voz.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRetro, registrarChegada, registrarLigacao
} = await import('../js/game.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { CENAS_TECNICAS, IDIOMAS, PERGUNTAS_DIA } = await import('../js/tecnico.js');
const { ENTREVISTA, CONTOS, NUMEROS } = await import('../js/ensaio.js');
const { OPINIOES, CENAS_FALA } = await import('../js/opiniao.js');
const { RELATOS, CORTESIAS, AQUECIMENTOS, CLAROS } = await import('../js/call.js');
const { DEMOS, PRAZOS, STARS, ENFASES } = await import('../js/palco.js');
const { DECISOES, PARES, INCIDENTES } = await import('../js/plantao.js');

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
  ...INCIDENTES.map(c => c.id)
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

describe('retrospectiva, onboarding e conectores', () => {
  test('a retrospectiva tem o que foi bem, o que melhorar e a ação', () => {
    assert.equal(RETROS.length, 3);
    conferirCena(RETROS, ['Bem', 'Melhorar', 'Ação'], avaliarRetro);
    const sprint = RETROS[0];
    assert.equal(avaliarRetro(sprint.rodadas[0], 'The release went well because the rollback was ready.').ok, true);
    assert.equal(avaliarRetro(sprint.rodadas[1], 'We should write the checklist earlier.').ok, true);
    assert.equal(avaliarRetro(sprint.rodadas[2], 'The action is to add the checklist to the template.').ok, true);
  });

  test('o onboarding explica o projeto, o fluxo e o primeiro passo', () => {
    assert.equal(CHEGADAS.length, 3);
    conferirCena(CHEGADAS, ['Projeto', 'Fluxo', 'Começo'], avaliarChegada);
    const notas = CHEGADAS[0];
    assert.equal(avaliarChegada(notas.rodadas[0], 'This project stores course notes.').ok, true);
    assert.equal(avaliarChegada(notas.rodadas[1], 'We open a pull request and ask for one review.').ok, true);
    assert.equal(avaliarChegada(notas.rodadas[2], 'Your first task is to fix the empty search.').ok, true);
  });

  test('os conectores ligam o fato ao contraste', () => {
    assert.equal(LIGACOES.length, 3);
    conferirCena(LIGACOES, ['Fato', 'Ligação'], avaliarLigacao);
    const porem = LIGACOES[0];
    const outra = LIGACOES[1];
    const disse = LIGACOES[2];
    assert.equal(avaliarLigacao(porem.rodadas[1], 'However, the page is still slow.').ok, true);
    assert.equal(avaliarLigacao(outra.rodadas[1], 'On the other hand, the user waits a little.').ok, true);
    assert.equal(avaliarLigacao(disse.rodadas[1], 'That said, we can ship on Friday.').ok, true);
    const ids = [...RETROS, ...CHEGADAS, ...LIGACOES].map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test('retrospectiva, onboarding e conector não viram diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'retro1', valor: 0, pago: false }] };
    const retro = registrarRetro({
      xp: 34, nota: 80, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.retros, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.tecnicos, 0);
    assert.ok(estado.badges.includes('retro'));
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(retro.bonusMissoes, 15);
    assert.equal(estado.painel['2026-10-28'].n, 1);

    registrarChegada({ xp: 34, nota: 70, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: [] });
    assert.equal(estado.stats.chegadas, 1);
    assert.ok(estado.badges.includes('chegada'));

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'ligacao1', valor: 0, pago: false }] };
    const ligacao = registrarLigacao({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.ligacoes, 1);
    assert.ok(estado.badges.includes('ligacao'));
    assert.equal(ligacao.bonusMissoes, 15);
    assert.equal(estado.stats.dialogos, 0);
  });

  test('a gravação volta ao botão gravar e o plano tem nome único', () => {
    const parado = rotuloGravacao(false);
    const gravando = rotuloGravacao(true);
    assert.equal(parado.texto, 'GRAVAR');
    assert.equal(parado.pressionado, 'false');
    assert.match(parado.rotulo, /Gravar/);
    assert.equal(gravando.texto, 'PARAR');
    assert.equal(gravando.pressionado, 'true');
    assert.match(gravando.aviso, /8 segundos/);
    assert.equal(nomeDoTreino('Deslizes de fala'), 'Treinar Deslizes de fala');
    assert.equal(nomeDoTreino('  Ênfase  '), 'Treinar Ênfase');
    assert.equal(nomeDoTreino(''), 'Treinar');
    const app = readFileSync(new URL('../js/app.js', import.meta.url), 'utf8');
    assert.match(app, /rotuloGravacao\(false\)/);
    assert.match(app, /nomeDoTreino\(item\.titulo\)/);
    assert.match(app, /role: 'status'/);
    assert.match(app, /'data-foco': '1'/);
  });

  test('o módulo novo não usa travessão e a versão sobe', () => {
    semTravessao('../js/discurso.js');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '2\.10'/);
    assert.match(sw, /gringolingo-v37/);
    assert.match(sw, /\.\/js\/discurso\.js/);
  });
});
