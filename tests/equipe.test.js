import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  ACESSOS, avaliarAcesso, LICENCAS, avaliarLicenca, JARGOES, avaliarJargao
} = await import('../js/equipe.js');
const { PMS, LAUDOS, RUMOS } = await import('../js/remoto.js');
const { RADARS, APLAUSOS, GRIPES } = await import('../js/radar.js');
const { BRECHAS, MUDAS, GAUCHOS } = await import('../js/brecha.js');
const { FACILS, ESCOLHAS, SABADOS } = await import('../js/facil.js');
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
  estado, limparEstadoMemoria, definirAgora,
  registrarAcesso, registrarLicenca, registrarJargao
} = await import('../js/game.js');
const { BADGES, VERSAO_APP } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { catalogoFaladas, GESTORES, FINAIS, VIAGENS, resumoDaFila } = await import('../js/turno.js');
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
  ...VISTOS.map(c => c.id),
  ...FACILS.map(c => c.id),
  ...ESCOLHAS.map(c => c.id),
  ...SABADOS.map(c => c.id),
  ...BRECHAS.map(c => c.id),
  ...MUDAS.map(c => c.id),
  ...GAUCHOS.map(c => c.id),
  ...RADARS.map(c => c.id),
  ...APLAUSOS.map(c => c.id),
  ...GRIPES.map(c => c.id),
  ...PMS.map(c => c.id),
  ...LAUDOS.map(c => c.id),
  ...RUMOS.map(c => c.id)
]);

const PROIBIDAS = [
  'I would like to talk about a raise',
  'I can show the results from this year',
  'I am ready for the next role',
  'This shortcut is technical debt',
  'I need two sprints to refactor this',
  'Your first task is to fix the empty search',
  'We open a pull request and ask for one review',
  'This project stores course notes',
  'Is there a yearly learning budget',
  'The company can send a laptop',
  'Each new feature pays interest',
  'Please keep'
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

describe('acesso, licença e linguagem simples', () => {
  test('as três listas não repetem o aumento, a dívida nem o primeiro dia', () => {
    const fonte = semTravessao('../js/equipe.js');
    assert.equal(fonte.includes('turno.js'), false);
    assert.equal(fonte.includes('foco.js'), false);
    assert.equal(fonte.includes('game.js'), false);
    assert.equal(fonte.includes('hub.js'), false);
    assert.equal(fonte.includes('Math.random'), false);
    conferir(ACESSOS, ['Lugar', 'Ajuda'], avaliarAcesso);
    conferir(LICENCAS, ['Pedido', 'Valor'], avaliarLicenca);
    conferir(JARGOES, ['Simples', 'Efeito'], avaliarJargao);
    const ids = [...ACESSOS, ...LICENCAS, ...JARGOES].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const wiki = ACESSOS.find(c => c.id === 'wikihoje').rodadas[1];
    assert.equal(avaliarAcesso(wiki, 'Ping me in the team channel.').ok, true);
    const preco = LICENCAS.find(c => c.id === 'ferramental').rodadas[1];
    assert.equal(avaliarLicenca(preco, 'It costs 40 dollars a month.').ok, true);
    const licenca = LICENCAS.find(c => c.id === 'ferramental').rodadas[0];
    assert.equal(avaliarLicenca(licenca, "I'd like a license for the design tool.").ok, true);
    const texto = JSON.stringify({ ACESSOS, LICENCAS, JARGOES });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Acesso' && f.melhor === 'The setup notes are in the wiki.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Licença' && f.melhor === 'It costs forty dollars a month.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Jargão' && f.melhor === 'We turned the new button off.'), true);
  });

  test('acesso, licença e jargão contam no próprio contador', () => {
    travarMissao('acesso1');
    const acesso = registrarAcesso(fim());
    assert.equal(acesso.bonusMissoes, 15);
    assert.equal(estado.stats.acessos, 1);
    assert.equal(estado.stats.chegadas, 0);
    assert.equal(estado.stats.estreias, 0);
    assert.equal(estado.stats.licencas, 0);
    assert.ok(estado.badges.includes('acesso'));
    for (const id of ['licenca', 'jargao', 'chegada', 'aumento', 'debito']) {
      assert.equal(estado.badges.includes(id), false, id);
    }
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    travarMissao('licenca1');
    const licenca = registrarLicenca(fim());
    assert.equal(licenca.bonusMissoes, 15);
    assert.equal(estado.stats.licencas, 1);
    assert.equal(estado.stats.aumentos, 0);
    assert.equal(estado.stats.ofertas, 0);
    assert.ok(estado.badges.includes('licenca'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    travarMissao('jargao1');
    const jargao = registrarJargao(fim());
    assert.equal(jargao.bonusMissoes, 15);
    assert.equal(estado.stats.jargoes, 1);
    assert.equal(estado.stats.debitos, 0);
    assert.equal(estado.stats.modelos, 0);
    assert.ok(estado.badges.includes('jargao'));
    assert.equal(estado.badges.includes('debito'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 3);
    assert.equal(estado.painel['2026-10-28'].n, 3);
    assert.equal(BADGES.length, 151);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a fila diz a frase que vence e esconde a resposta em inglês', () => {
    assert.deepEqual(resumoDaFila(null, '2026-10-28'), {
      n: 0,
      texto: 'Nenhuma frase escapou ainda.',
      dica: ''
    });
    assert.deepEqual(resumoDaFila([], '2026-10-28'), {
      n: 0,
      texto: 'Nenhuma frase escapou ainda.',
      dica: ''
    });
    const uma = resumoDaFila({
      'The setup notes are in the wiki.': { proxima: '2026-10-28', pt: 'Diga que as notas estão no wiki.' }
    }, '2026-10-28');
    assert.equal(uma.n, 1);
    assert.equal(uma.texto, '1 frase para rever hoje.');
    assert.equal(uma.dica, 'Diga que as notas estão no wiki.');
    assert.equal(uma.texto.includes('wiki.'), false);
    const duas = resumoDaFila({
      'Zebra phrase is here now.': { proxima: '2026-10-28', pt: 'segunda' },
      'Alpha phrase is here now.': { proxima: '2026-10-28', pt: 'primeira' },
      'Later phrase is here now.': { proxima: '2026-11-02', pt: 'futura' }
    }, '2026-10-28');
    assert.equal(duas.n, 2);
    assert.equal(duas.texto, '2 frases para rever hoje.');
    assert.equal(duas.dica, 'primeira');
    const futura = resumoDaFila({
      'Later phrase is here now.': { proxima: '2026-11-02', pt: 'futura' }
    }, '2026-10-28');
    assert.equal(futura.n, 0);
    assert.equal(futura.texto, 'Nada vence hoje. A próxima volta em 02/11/2026.');
    assert.equal(futura.dica, '');
    const estranha = resumoDaFila({
      'Later phrase is here now.': { proxima: 'soon', pt: 'futura' }
    }, '2026-10-28');
    assert.equal(estranha.texto, 'Nada vence hoje.');
  });

  test('a versão 2.38 deixa o acesso fora do passeio', () => {
    assert.equal(VERSAO_APP, '2.38');
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.38'/);
    assert.match(data, /versao: '2\.37'/);
    assert.match(sw, /gringolingo-v65/);
    assert.match(sw, /\.\/js\/equipe\.js/);
    assert.match(turno, /equipe\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarAcesso', 'pintarLicenca', 'pintarJargao']) {
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function telaRumos'), nome);
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function telaAbertas'), nome);
    }
    const novo = app.slice(app.indexOf('function telaAcessos'), app.indexOf('function telaAbertas'));
    assert.equal(novo.includes('VERIFICAR'), false);
    assert.equal(novo.includes('Melhor jeito'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /acesso: telaAcessos/);
    assert.match(mapa, /licenca: telaLicencas/);
    assert.match(mapa, /jargao: telaJargoes/);
    const fila = app.slice(app.indexOf('function cartaoFila'), app.indexOf('function blocoFluencia'));
    assert.match(fila, /fila-fala/);
    assert.match(fila, /REVER AGORA/);
    assert.equal(fila.includes('lang: \'en\''), false);
    const regra = css.slice(css.indexOf('.fila-fala {'), css.indexOf('.fila-fala {') + 80);
    assert.match(regra, /margin:/);
    assert.equal(regra.includes('#'), false);
  });
});

