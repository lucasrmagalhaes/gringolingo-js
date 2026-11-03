import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const { CULPAS, avaliarCulpa, RAIOS, avaliarRaio, OFERTAS, avaliarOferta } = await import('../js/raio.js');
const { POKERS, LEIGOS, RECRUTAS } = await import('../js/carta.js');
const { MESAS, MIGRAS, ESTREIAS } = await import('../js/rodada.js');
const { SPRINTS, SEGUROS, MEETUPS } = await import('../js/cliente.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
const {
  estado, limparEstadoMemoria, definirAgora,
  registrarCulpa, registrarRaio, registrarOferta
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { catalogoFaladas } = await import('../js/turno.js');
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
  ...MEETUPS.map(c => c.id),
  ...MESAS.map(c => c.id),
  ...MIGRAS.map(c => c.id),
  ...ESTREIAS.map(c => c.id),
  ...POKERS.map(c => c.id),
  ...LEIGOS.map(c => c.id),
  ...RECRUTAS.map(c => c.id)
]);

const PROIBIDAS = [
  'I am sorry for the delay',
  'I am sorry this page is slow',
  'I am sorry for the noisy alert',
  'The deploy failed',
  'Hi everyone',
  'Thanks for coming',
  'Today I will show',
  'next slide',
  'error rate',
  'end of the talk',
  'I will take two questions',
  'looking at 90',
  'Health insurance',
  'home office stipend',
  'base salary',
  'equity',
  'vesting',
  'four weeks',
  'middle of the range',
  'I am from Brazil'
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

describe('desculpa, relâmpago e oferta', () => {
  test('as três listas não repetem a palestra, o salário nem o atraso', () => {
    semTravessao('../js/raio.js');
    conferir(CULPAS, ['Erro', 'Plano'], avaliarCulpa);
    conferir(RAIOS, ['Tempo', 'Projeto'], avaliarRaio);
    conferir(OFERTAS, ['Peça', 'Data'], avaliarOferta);
    const ids = [...CULPAS, ...RAIOS, ...OFERTAS].map(c => c.id);
    assert.equal(new Set(ids).size, 9);
    const cinco = RAIOS.find(c => c.id === 'onibus').rodadas[0];
    assert.equal(avaliarRaio(cinco, 'This talk is 5 minutes.').ok, true);
    const fimCinco = RAIOS.find(c => c.id === 'repositorio').rodadas[0];
    assert.equal(avaliarRaio(fimCinco, 'That was my 5 minutes.').ok, true);
    const tela = OFERTAS.find(c => c.id === 'notebook').rodadas[1];
    assert.equal(avaliarOferta(tela, 'A 2nd screen would help at home.').ok, true);
    const texto = JSON.stringify({ CULPAS, RAIOS, OFERTAS });
    for (const frase of PROIBIDAS) assert.equal(texto.includes(frase), false, frase);
    const catalogo = catalogoFaladas();
    assert.equal(catalogo.some(f => f.origem === 'Desculpa' && f.melhor === 'That mistake was mine.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Relâmpago' && f.melhor === 'This talk is five minutes.'), true);
    assert.equal(catalogo.some(f => f.origem === 'Oferta' && f.melhor === 'Could the company send a laptop?'), true);
  });

  test('desculpa, relâmpago e oferta contam no próprio contador', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'culpa1', valor: 0, pago: false }] };
    const culpa = registrarCulpa(fim());
    assert.equal(culpa.bonusMissoes, 15);
    assert.equal(estado.stats.culpas, 1);
    assert.equal(estado.stats.falhas, 0);
    assert.equal(estado.stats.relatos, 0);
    assert.equal(estado.stats.raios, 0);
    assert.equal(estado.stats.ofertas, 0);
    assert.ok(estado.badges.includes('culpa'));
    assert.equal(estado.badges.includes('raio'), false);
    assert.equal(estado.badges.includes('oferta'), false);
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 1);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'raio1', valor: 0, pago: false }] };
    const raio = registrarRaio(fim());
    assert.equal(raio.bonusMissoes, 15);
    assert.equal(estado.stats.raios, 1);
    assert.equal(estado.stats.palestras, 0);
    assert.equal(estado.stats.demos, 0);
    assert.ok(estado.badges.includes('raio'));
    assert.equal(estado.painel['2026-10-28'].grupos.trabalho, 2);

    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'oferta1', valor: 0, pago: false }] };
    const oferta = registrarOferta(fim());
    assert.equal(oferta.bonusMissoes, 15);
    assert.equal(estado.stats.ofertas, 1);
    assert.equal(estado.stats.salarios, 0);
    assert.equal(estado.stats.recrutas, 0);
    assert.ok(estado.badges.includes('oferta'));
    assert.equal(estado.painel['2026-10-28'].grupos.entrevista, 1);
    assert.ok(BADGES.length >= 115);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('a versão 2.28 deixa as telas fora do passeio e a sombra anuncia a nota', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const turno = readFileSync(join(raiz, 'js/turno.js'), 'utf8');
    assert.match(data, /versao: '2\.28'/);
    assert.match(data, /versao: '2\.27'/);
    assert.match(sw, /\.\/js\/raio\.js/);
    assert.match(turno, /raio\.js/);
    assert.equal(turno.includes('foco.js'), false);
    for (const nome of ['pintarCulpa', 'pintarRaio', 'pintarOferta']) {
      assert.ok(app.indexOf(`function ${nome}`) < app.indexOf('function textoPasseio'), nome);
      assert.ok(app.indexOf(`function ${nome}`) > app.indexOf('function pintarRecruta'), nome);
    }
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarCulpa'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const bloco = app.slice(app.indexOf('function telaFoco'), app.indexOf('function cartaoSobre'));
    assert.equal(bloco.includes('VERIFICAR'), false);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    assert.match(mapa, /culpa: telaCulpas/);
    assert.match(mapa, /raio: telaRaios/);
    assert.match(mapa, /oferta: telaOfertas/);
    assert.match(mapa, /sombra: telaSombra/);
    const abre = app.slice(app.indexOf('function abrirSombra'), app.indexOf('function pintarSombra'));
    assert.match(abre, /ordenarSombra/);
    assert.equal(abre.includes('embaralhar'), false);
    const sombra = app.slice(app.indexOf('function pintarSombra'), app.indexOf('function concluirSombra'));
    assert.match(sombra, /Ouvir a frase na voz do aparelho/);
    assert.match(sombra, /textoDaSombra/);
    assert.match(sombra, /data-foco/);
    assert.match(sombra, /Ainda não há frase para ouvir neste aparelho/);
    assert.match(sombra, /campo\.entrada\.focus/);
  });
});
