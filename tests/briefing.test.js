import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  REQUISITOS, avaliarRequisito,
  METRICAS, avaliarMetrica,
  APRENDIZADOS, avaliarAprendizado,
  PASSEIOS, avaliarPasseio,
  montarPasseio, decidirPasseio, falasDaPergunta, ESPERA_RESPOSTA_MS
} = await import('../js/briefing.js');
const { falarTrechos } = await import('../js/audio.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarRequisito, registrarMetrica, registrarAprendizado, registrarPasseio
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
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
const { LINHAS, SLACKS, SOCIAIS, TERMOS } = await import('../js/oficina.js');
const { SALARIOS, PROJETOS, SOTAQUES } = await import('../js/vaga.js');

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
  ...SOTAQUES.map(c => c.id)
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

describe('requisito, métrica, lição e passeio', () => {
  test('o requisito pergunta e depois confirma', () => {
    semTravessao('../js/briefing.js');
    conferirCena(REQUISITOS, ['Pergunta', 'Confirma'], avaliarRequisito);
    assert.equal(REQUISITOS.length, 3);
    const quem = REQUISITOS[0].rodadas;
    assert.equal(avaliarRequisito(quem[0], 'Managers use it every Monday.').ok, true);
    assert.equal(avaliarRequisito(quem[1], 'Yes. A weekly report for managers.').ok, true);
    assert.equal(avaliarRequisito(REQUISITOS[1].rodadas[0], 'Leave export out of this release.').ok, true);
    assert.equal(avaliarRequisito(REQUISITOS[1].rodadas[1], 'Yes. Search stays, and export waits.').ok, true);
    assert.equal(avaliarRequisito(REQUISITOS[2].rodadas[0], 'We will know if the task time drops.').ok, true);
    assert.equal(JSON.stringify(REQUISITOS).includes('so what you are saying'), false);
  });

  test('a métrica aceita o número por extenso e por dígito', () => {
    conferirCena(METRICAS, ['Número', 'Leitura'], avaliarMetrica);
    assert.equal(METRICAS.length, 3);
    const adesao = METRICAS[0].rodadas[0];
    assert.equal(avaliarMetrica(adesao, 'Signups grew twenty percent this month.').ok, true);
    assert.equal(avaliarMetrica(adesao, 'Signups grew 20 percent this month.').ok, true);
    assert.equal(avaliarMetrica(METRICAS[0].rodadas[1], 'We had 200 new signups.').ok, true);
    assert.equal(avaliarMetrica(METRICAS[1].rodadas[0], 'The error rate fell from 5 percent to 3.').ok, true);
    assert.equal(avaliarMetrica(METRICAS[2].rodadas[0], 'Weekly active users rose by 15 percent.').ok, true);
    assert.equal(JSON.stringify(METRICAS).includes('twenty percent of cases'), false);
  });

  test('a lição passa por erro, efeito e o que ficou', () => {
    conferirCena(APRENDIZADOS, ['Erro', 'Efeito', 'Lição'], avaliarAprendizado);
    assert.equal(APRENDIZADOS.length, 3);
    const deploy = APRENDIZADOS[0].rodadas;
    assert.equal(avaliarAprendizado(deploy[0], 'I shipped the fix with no rollback plan.').ok, true);
    assert.equal(avaliarAprendizado(deploy[1], 'The homepage was blank for 20 minutes.').ok, true);
    assert.equal(avaliarAprendizado(deploy[2], 'I learned to write the rollback first.').ok, true);
    assert.equal(avaliarAprendizado(APRENDIZADOS[1].rodadas[0], 'I merged with a red test.').ok, true);
    assert.equal(avaliarAprendizado(APRENDIZADOS[2].rodadas[2], 'I learned to name the field for one thing.').ok, true);
    const texto = JSON.stringify(APRENDIZADOS);
    assert.equal(texto.includes('the release went well because the rollback was ready'), false);
    assert.equal(texto.includes('the next step is a rollback'), false);
  });

  test('o passeio sorteia quatro frases estáveis e decide a fala', () => {
    assert.equal(ESPERA_RESPOSTA_MS, 8000);
    assert.equal(PASSEIOS.length, 6);
    const ids = PASSEIOS.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const id of ids) assert.equal(ocupados.has(id), false, id);
    const cenas = [...REQUISITOS, ...METRICAS, ...APRENDIZADOS].map(c => c.id);
    for (const id of ids) assert.equal(cenas.includes(id), false, id);
    for (const item of PASSEIOS) {
      assert.equal(avaliarPasseio(item.rodadas[0], item.rodadas[0].melhor).ok, true);
    }
    assert.equal(avaliarPasseio(PASSEIOS[2].rodadas[0], 'It rose 15 percent.').ok, true);
    assert.equal(montarPasseio('ontem'), null);
    assert.equal(montarPasseio(''), null);
    const primeiro = montarPasseio('2026-10-28');
    const deNovo = montarPasseio('2026-10-28');
    assert.equal(primeiro.rodadas.length, 4);
    assert.deepEqual(primeiro.rodadas.map(r => r.id), deNovo.rodadas.map(r => r.id));
    assert.equal(new Set(primeiro.rodadas.map(r => r.id)).size, 4);
    const rodada = primeiro.rodadas[0];
    assert.deepEqual(falasDaPergunta(rodada).map(f => f.lang), ['en-US', 'pt-BR']);
    assert.equal(falasDaPergunta(rodada)[0].texto, rodada.npc.en);
    assert.equal(falasDaPergunta(rodada)[1].texto, rodada.missao);
    assert.equal(decidirPasseio('   ', rodada).seguiu, false);
    assert.equal(decidirPasseio('', rodada).falar, 'Sem resposta. Próxima.');
    assert.equal(decidirPasseio('', rodada).lang, 'pt-BR');
    const certa = decidirPasseio(rodada.melhor, rodada);
    assert.equal(certa.seguiu, true);
    assert.equal(certa.falar, 'Nice.');
    assert.equal(certa.lang, 'en-US');
    assert.equal(certa.aval.ok, true);
    const errada = decidirPasseio('hello', rodada);
    assert.equal(errada.seguiu, true);
    assert.equal(errada.falar, rodada.melhor);
    assert.equal(errada.aval.ok, false);
    assert.equal(JSON.stringify(PASSEIOS).includes('Managers use it every Monday'), false);
  });

  test('a leitura em trechos usa a voz do idioma e não troca a voz salva', () => {
    localStorage.setItem('gringolingo:voz', 'salva');
    const faladas = [];
    const antes = speechSynthesis.getVoices;
    speechSynthesis.getVoices = () => [
      { voiceURI: 'us', name: 'US', lang: 'en-US' },
      { voiceURI: 'pt', name: 'PT', lang: 'pt-BR' }
    ];
    speechSynthesis.cancel = () => {};
    speechSynthesis.speak = u => faladas.push(u);
    let fim = 0;
    const ok = falarTrechos([
      { texto: 'Who uses this?', lang: 'en-US' },
      { texto: 'Diga quem usa.', lang: 'pt-BR' }
    ], () => { fim += 1; });
    assert.equal(ok, true);
    assert.equal(fim, 0);
    assert.equal(faladas[0].voice.voiceURI, 'us');
    assert.equal(faladas[1].lang, 'pt-BR');
    assert.equal(faladas[1].voice.voiceURI, 'pt');
    faladas[1].onend();
    assert.equal(fim, 1);
    assert.equal(localStorage.getItem('gringolingo:voz'), 'salva');
    speechSynthesis.getVoices = () => [];
    assert.equal(falarTrechos([], () => { fim += 1; }), false);
    assert.equal(fim, 2);
    speechSynthesis.getVoices = antes;
  });

  test('requisito e métrica contam no progresso sem virar diálogo', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'requisito1', valor: 0, pago: false }] };
    const requisito = registrarRequisito({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(requisito.bonusMissoes, 15);
    assert.equal(estado.stats.requisitos, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.equal(estado.painel['2026-10-28'].n, 1);
    assert.ok(estado.badges.includes('requisito'));
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'metrica1', valor: 0, pago: false }] };
    const metrica = registrarMetrica({
      xp: 26, nota: 80, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(metrica.bonusMissoes, 15);
    assert.equal(estado.stats.metricas, 1);
    assert.ok(estado.badges.includes('metrica'));

    registrarAprendizado({
      xp: 34, nota: 90, acertos: 3, respostas: 3, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.aprendizados, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.ok(estado.badges.includes('aprendizado'));

    registrarPasseio({
      xp: 18, nota: 50, acertos: 1, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(estado.stats.passeios, 1);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('passeio'));
    assert.ok(BADGES.length >= 71);
  });

  test('a versão 2.15 fecha o microfone ao sair e lê o passeio', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.15'/);
    assert.match(data, /versao: '2\.14'/);
    assert.match(sw, /\.\/js\/briefing\.js/);
    const limpa = app.slice(app.indexOf('function limparTela'), app.indexOf('function registrarRota'));
    assert.match(limpa, /pararReconhecimento\(\)/);
    const ouvir = app.slice(app.indexOf('function reconhecerFala'), app.indexOf('function formularioIa'));
    assert.match(ouvir, /pararReconhecimento\(\)/);
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.match(passeio, /ENVIAR/);
    assert.equal(passeio.includes('VERIFICAR'), false);
    assert.match(passeio, /ESPERA_RESPOSTA_MS/);
    assert.match(passeio, /falarTrechos/);
    assert.match(passeio, /Lendo a pergunta/);
    assert.match(passeio, /Sua vez\. Pode falar/);
    assert.match(passeio, /Boa\./);
    const status = css.slice(css.indexOf('.passeio-status'), css.indexOf('.unidade'));
    assert.match(status, /font-size:\s*var\(--fonte-xl\)/);
    assert.match(status, /font-weight:\s*900/);
    assert.match(status, /text-align:\s*center/);
  });
});
