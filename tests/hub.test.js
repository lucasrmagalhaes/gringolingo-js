import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const t0 = performance.now();
const {
  CATEGORIAS, TREINOS, filtrarTreinos, treinoRecomendado, auditarPacote,
  normalizarBusca, auditarCatalogo
} = await import('../js/hub.js');
const cargaHub = performance.now() - t0;

const { FUTUROS, avaliarFuturo } = await import('../js/futuro.js');
const {
  estado, limparEstadoMemoria, definirAgora, registrarFuturo
} = await import('../js/game.js');
const { BADGES } = await import('../js/data.js');
const { IDS_CINCO } = await import('../js/conversa.js');
const { MODELOS, FUROS, ROTINAS, PAPOS } = await import('../js/lar.js');
const { SISTEMAS, CODIGOS, COLEGAS } = await import('../js/banca.js');
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
  ...PAPOS.map(c => c.id)
]);

const TITULOS = [
  'Para leigos', 'O furo', 'Outra área', 'Palestra', 'Sem a resposta', 'Sinal ruim',
  'Por que falhou', 'Mentoria', 'Requisitos', 'Métricas', 'Um erro', 'Linha a linha',
  'Slack', 'Feedback 1:1', 'Estimativa', 'Consenso', 'Retrospectiva', 'Onboarding',
  'Conectores', 'Decisão técnica', 'Pair', 'Plantão', 'Demo de produto', 'Prazo e escopo',
  'Relatar um bug', 'Review com educação', 'Antes da reunião', 'Esclarecer', 'Opinião',
  'Inglês de trabalho', 'Idioms de reunião', 'Phrasal verbs', 'Sistema', 'Em voz alta',
  'Simulado', 'Salário', 'Portfólio', 'Pergunta final', 'Entrevista STAR', 'Entrevista longa',
  'Contar no passado', 'Falar de você', 'Daqui a cinco anos', 'Em casa', 'Conversa livre',
  'No exterior', 'Só áudio', 'Happy hour', 'Viagem a trabalho', 'Atendimento',
  'Descrever a cena', 'Você pergunta', 'Sotaques', 'Ênfase', 'Termos técnicos',
  'Fala rápida', 'Números, datas e preços', 'Desafio do dia', 'Três minutos',
  'Deslizes de fala', 'Pergunta do dia', 'Teste de nível', 'Resumo da semana', 'Pensa em inglês',
  'Esporte, filme e série', 'O aumento', 'A API',
  'Ao vivo', 'Com o produto', 'Suas perguntas', 'Mais erradas',
  'O mapa', 'O ponto difícil', 'A proposta', 'Semana falada',
  'O par narrado', 'Banco ou cache', 'O não educado',
  'Demo da sprint', 'A decisão segura', 'No meetup', 'Entrevista completa',
  'A mesa da retro', 'A migração', 'Primeiro dia', 'Entrevista por foco',
  'A carta', 'A conta da IA', 'A ligação',
  'A desculpa', 'O relâmpago', 'A oferta', 'Sombra',
  'Não entendi', 'A cobertura', 'O vídeo', 'Meu vocabulário',
  'O gráfico', 'O handoff', 'O elevador', 'A semana junta',
  'O bug raro', 'Com calma', 'A folga', 'Perguntas abertas',
  'Com respeito', 'A dívida', 'A indicação',
  'O contraste', 'O fórum', 'O visto', 'O mês',
  'O facilitador', 'A escolha', 'O sábado', 'Treino surpresa',
  'A falha', 'A mudança', 'O chimarrão',
  'O radar', 'O aplauso', 'A gripe',
  'Com o PM', 'O laudo', 'O rumo',
  'O acesso', 'A licença', 'Sem jargão',
  'A bandeira', 'O gelo', 'O limite',
  'O canário', 'A despedida', 'A repetição',
  'A carga', 'O boletim', 'Quem aprova',
  'O manual', 'O lado verde', 'O certificado',
  'O rebase', 'A consulta', 'A réplica',
  'O ensaio', 'O disco', 'A página',
  'O squash', 'O circuito', 'O job',
  'A colheita', 'A sessão', 'O tanque',
  'A sonda', 'A semente', 'O registro',
  'O rastro', 'A parada', 'O pod',
  'O lint', 'A origem', 'O link',
  'O processador', 'A cópia', 'O estouro',
  'O impasse', 'O domínio', 'A carta morta',
  'Os ponteiros', 'A eleição', 'O freio'
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

describe('hub de fluência e carreira', () => {
  test('os 64 treinos continuam no catálogo, em cinco grupos', () => {
    const hub = semTravessao('../js/hub.js');
    const futuro = semTravessao('../js/futuro.js');
    assert.equal(hub.includes('Math.random'), false);
    assert.equal(futuro.includes('Math.random'), false);
    assert.ok(cargaHub < 250, String(cargaHub));
    assert.equal(TREINOS.length, 170);
    assert.equal(new Set(TREINOS.map(t => t.id)).size, 170);
    assert.equal(new Set(TREINOS.map(t => t.titulo)).size, TREINOS.length);
    assert.equal(new Set(TREINOS.map(t => normalizarBusca(t.titulo))).size, TREINOS.length);
    const grupos = new Set(CATEGORIAS.map(c => c.id));
    assert.deepEqual([...grupos], ['trabalho', 'entrevista', 'cotidiano', 'pronuncia', 'revisao']);
    for (const t of TREINOS) assert.equal(grupos.has(t.categoria), true, t.id);
    for (const c of CATEGORIAS) assert.equal(TREINOS.some(t => t.categoria === c.id), true, c.id);
    assert.equal(TREINOS.filter(t => t.categoria === 'trabalho').length, 114);
    assert.equal(TREINOS.filter(t => t.categoria === 'entrevista').length, 21);
    assert.equal(TREINOS.filter(t => t.categoria === 'cotidiano').length, 16);
    assert.equal(TREINOS.filter(t => t.categoria === 'pronuncia').length, 5);
    assert.equal(TREINOS.filter(t => t.categoria === 'revisao').length, 14);
    assert.deepEqual(TREINOS.map(t => t.titulo), TITULOS);
    assert.equal(TREINOS.find(t => t.id === 'nivel').stat, '');
    assert.equal(TREINOS.find(t => t.id === 'resumo').stat, '');
    assert.equal(TREINOS.find(t => t.id === 'futuro').stat, 'futuros');
  });

  test('a busca e o filtro não apagam o restante', () => {
    assert.equal(filtrarTreinos(TREINOS, { categoria: 'todos', busca: '' }).length, 170);
    assert.equal(filtrarTreinos(TREINOS, {}).length, 170);
    const entrevista = filtrarTreinos(TREINOS, { categoria: 'entrevista' });
    assert.equal(entrevista.some(t => t.id === 'futuro'), true);
    assert.equal(entrevista.some(t => t.id === 'simulado'), true);
    assert.equal(entrevista.some(t => t.id === 'rotina'), false);
    const cinco = filtrarTreinos(TREINOS, { busca: 'cinco anos' });
    assert.deepEqual(cinco.map(t => t.id), ['futuro']);
    assert.equal(filtrarTreinos(TREINOS, { busca: 'zzzz' }).length, 0);
    const trabalho = filtrarTreinos(TREINOS, { busca: 'Trabalho' });
    assert.equal(trabalho.filter(t => t.categoria === 'trabalho').length, 114);
    const enfase = filtrarTreinos(TREINOS, { categoria: 'pronuncia', busca: 'enfase' });
    assert.deepEqual(enfase.map(t => t.id), ['enfase']);
  });

  test('o recomendado olha o nível, o ponto fraco e o histórico', () => {
    const semNivel = treinoRecomendado(TREINOS, {
      nivel: '', stats: { modelos: 9 }, padroes: [{ chave: 'artigo', n: 3 }], deslizes: 4
    });
    assert.equal(semNivel.treino.id, 'nivel');
    assert.equal(semNivel.porque, 'O teste deixa os treinos no seu ponto.');

    const claro = treinoRecomendado(TREINOS, {
      nivel: 'A2', stats: {}, padroes: [{ chave: 'artigo', n: 3 }], deslizes: 0
    });
    assert.equal(claro.treino.id, 'claro');
    assert.ok(claro.porque);

    const deslize = treinoRecomendado(TREINOS, {
      nivel: 'A2', stats: {}, padroes: [], deslizes: 2
    });
    assert.equal(deslize.treino.id, 'deslize');

    const novo = treinoRecomendado(TREINOS, {
      nivel: 'B1', stats: {}, padroes: [], deslizes: 0
    });
    assert.equal(novo.treino.id, 'modelo');
    assert.equal(novo.porque, 'Você ainda não fez este treino.');

    const depois = treinoRecomendado(TREINOS, {
      nivel: 'B1', stats: { modelos: 5 }, padroes: [], deslizes: 0
    });
    assert.notEqual(depois.treino.id, 'modelo');
    assert.equal(Number(depois.treino.stat ? 0 : 1), 0);
    assert.equal(depois.porque, 'Você ainda não fez este treino.');
    assert.equal(treinoRecomendado([], { nivel: 'B1' }), null);
  });

  test('a carreira cabe em duas falas', () => {
    assert.equal(FUTUROS.length, 3);
    assert.equal(new Set(FUTUROS.map(c => c.id)).size, 3);
    for (const cena of FUTUROS) {
      assert.equal(ocupados.has(cena.id), false, cena.id);
      assert.deepEqual(cena.rodadas.map(r => r.etapa), ['Meta', 'Caminho']);
      for (const rodada of cena.rodadas) {
        assert.equal(avaliarFuturo(rodada, rodada.melhor).ok, true, rodada.melhor);
        assert.equal(avaliarFuturo(rodada, 'hello').ok, false);
      }
    }
    const meta = FUTUROS[0].rodadas[0];
    assert.equal(avaliarFuturo(meta, 'In five years I want to lead a small team.').ok, true);
    assert.equal(avaliarFuturo(meta, 'In 5 years I want to lead a small team.').ok, true);
    assert.equal(avaliarFuturo(FUTUROS[0].rodadas[1], 'I will learn how to guide other people.').ok, true);
    const texto = JSON.stringify(FUTUROS);
    assert.equal(texto.includes('I am a full stack developer'), false);
    assert.equal(texto.includes('\u2014'), false);
    assert.equal(texto.includes('\u2013'), false);
  });

  test('o plano de carreira conta no próprio contador e a missão paga', () => {
    estado.missoes = { dia: '2026-10-28', progresso: [{ id: 'futuro1', valor: 0, pago: false }] };
    const fim = registrarFuturo({
      xp: 26, nota: 100, acertos: 2, respostas: 2, perfeita: false, comboMax: 0, errosFala: []
    });
    assert.equal(fim.bonusMissoes, 15);
    assert.equal(estado.stats.futuros, 1);
    assert.equal(estado.stats.dialogos, 0);
    assert.equal(estado.stats.pronuncias, 0);
    assert.ok(estado.badges.includes('futuro'));
    assert.equal(estado.badges.includes('perfeita'), false);
    assert.equal(estado.badges.includes('ator'), false);
    assert.equal(estado.badges.includes('papo'), false);
    assert.ok(BADGES.length >= 86);
    assert.equal(new Set(BADGES.map(b => b.id)).size, BADGES.length);
  });

  test('ids e títulos são únicos, e a busca usa o índice', () => {
    const aud = auditarCatalogo(TREINOS);
    assert.deepEqual(aud.idsRepetidos, []);
    assert.deepEqual(aud.titulosRepetidos, []);
    assert.deepEqual(aud.parecidos, []);
    assert.equal(TREINOS.every(t => t.chaveBusca === normalizarBusca(`${t.titulo} ${t.sub} ${t.busca || ''} ${t.categoria} ${CATEGORIAS.find(c => c.id === t.categoria).titulo}`)), true);
    const semIndice = TREINOS.map(({ chaveBusca, ...resto }) => resto);
    assert.deepEqual(
      filtrarTreinos(TREINOS, { busca: 'chimarrão' }).map(t => t.id),
      filtrarTreinos(semIndice, { busca: 'chimarrão' }).map(t => t.id)
    );
    assert.deepEqual(filtrarTreinos(TREINOS, { busca: 'dashboard' }).map(t => t.id), ['radar']);
    const copia = auditarCatalogo([
      { id: 'a', titulo: 'O radar', sub: 'Métrica, alerta e o painel do plantão.' },
      { id: 'a', titulo: 'O radar', sub: 'Outro texto longo o bastante.' },
      { id: 'b', titulo: 'Painel vivo da latência', sub: 'Métrica de latência, alerta e gráficos do plantão.' },
      { id: 'c', titulo: 'Painel vivo da latência dois', sub: 'Métrica de latência, alerta e gráficos do plantão agora.' }
    ]);
    assert.deepEqual(copia.idsRepetidos, ['a']);
    assert.ok(copia.titulosRepetidos.includes('o radar'));
    assert.ok(copia.parecidos.some(p => p.a === 'b' && p.b === 'c' && p.nota >= 0.5));
    assert.deepEqual(auditarCatalogo(null), { idsRepetidos: [], titulosRepetidos: [], parecidos: [] });
    const grande = Array.from({ length: 2000 }, (_, i) => ({
      id: `t${i}`,
      categoria: 'trabalho',
      titulo: `Item ${i}`,
      sub: `texto unico ${i}`,
      busca: '',
      chaveBusca: `trabalho item ${i} texto unico ${i}`
    }));
    const t0 = performance.now();
    let achou = [];
    for (let i = 0; i < 40; i++) achou = filtrarTreinos(grande, { busca: 'unico 1999' });
    assert.ok(performance.now() - t0 < 80, String(performance.now() - t0));
    assert.deepEqual(achou.map(t => t.id), ['t1999']);
  });

  test('a versão 2.20 cabe no pacote e passa na auditoria offline', () => {
    const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const html = readFileSync(join(raiz, 'index.html'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    assert.match(data, /versao: '2\.20'/);
    assert.match(data, /versao: '2\.19'/);
    assert.match(sw, /\.\/js\/hub\.js/);
    assert.match(sw, /\.\/js\/futuro\.js/);
    const bloco = app.slice(app.indexOf('function treinosVisiveis'), app.indexOf('function cartaoComNivel'));
    assert.match(bloco, /filtrarTreinos/);
    assert.match(bloco, /filtrarEstrelas/);
    assert.match(bloco, /ordenarTreinos/);
    assert.match(bloco, /treinoRecomendado/);
    assert.match(bloco, /Favoritos/);
    assert.match(bloco, /Menos praticados/);
    assert.match(bloco, /Continuar de onde parei/);
    assert.match(bloco, /role: 'list'/);
    assert.match(bloco, /Nenhum favorito ainda/);
    assert.match(bloco, /balanco-semana/);
    assert.match(bloco, /VER A SEMANA/);
    assert.match(bloco, /fila-fala/);
    assert.match(bloco, /REVER AGORA/);
    assert.match(bloco, /fala-hoje/);
    assert.match(bloco, /FALAR AGORA/);
    assert.match(bloco, /sem-pratica/);
    assert.match(bloco, /ESTREAR/);
    assert.match(bloco, /fala-sequencia/);
    assert.match(bloco, /FALAR HOJE/);
    assert.match(bloco, /aria-live': 'polite'/);
    assert.match(bloco, /aria-pressed/);
    assert.match(bloco, /Buscar treino/);
    assert.match(bloco, /lista-hub/);
    assert.match(app, /function telaFuturos/);
    const mapa = app.slice(app.indexOf('function telasDoHub'), app.indexOf('function subDoTreino'));
    for (const t of TREINOS) assert.match(mapa, new RegExp(`\\b${t.id}: tela`));
    const passeio = app.slice(app.indexOf('function textoPasseio'), app.indexOf('function telaSalarios'));
    assert.equal(passeio.includes('function pintarFuturo'), false);
    assert.equal(passeio.includes('VERIFICAR'), false);
    const arquivos = readdirSync(join(raiz, 'js'))
      .filter(nome => nome.endsWith('.js'))
      .map(nome => ({ nome: `js/${nome}`, bytes: statSync(join(raiz, 'js', nome)).size }));
    const aud = auditarPacote({ html, css, sw, arquivos });
    assert.deepEqual(aud.falhas, []);
    assert.ok(aud.bytes > 100000);
    assert.ok(statSync(join(raiz, 'js/hub.js')).size < 40000);
    assert.ok(statSync(join(raiz, 'js/futuro.js')).size < 40000);
  });
});
