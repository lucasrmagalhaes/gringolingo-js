// 1:1 com o gestor, pergunta no fim da entrevista, viagem a trabalho
// e a revisão de 3 minutos. A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta, normalizarFala } from './conversa.js';
import { ESTIMATIVAS, CONSENSOS, ATENDIMENTOS } from './cotidiano.js';
import { RETROS, CHEGADAS, LIGACOES } from './discurso.js';
import { DECISOES, PARES, INCIDENTES } from './plantao.js';
import { DEMOS, PRAZOS, STARS, ENFASES } from './palco.js';
import { RELATOS, CORTESIAS, AQUECIMENTOS, CLAROS } from './call.js';
import { OPINIOES, CENAS_FALA, RAPIDOS } from './opiniao.js';
import { ENTREVISTA, CONTOS } from './ensaio.js';
import { CENAS_TECNICAS, IDIOMAS, PERGUNTAS_DIA } from './tecnico.js';
import { PERGUNTAS } from './fluencia.js';
import { FRASES } from './frases.js';
import { LINHAS, SLACKS, SOCIAIS, TERMOS } from './oficina.js';
import { SALARIOS, PROJETOS, SOTAQUES, FALAS_DIA } from './vaga.js';
import { REQUISITOS, METRICAS, APRENDIZADOS, PASSEIOS } from './briefing.js';
import { FALHAS, MENTORIAS, SOCORROS } from './guia.js';
import { PALESTRAS, DUVIDAS, SINAIS } from './plateia.js';
import { SISTEMAS, CODIGOS, COLEGAS } from './banca.js';
import { MODELOS, FUROS, ROTINAS, PAPOS } from './lar.js';
import { FUTUROS } from './futuro.js';
import { CULTURAS, AUMENTOS, ROTAS } from './cultura.js';
import { VIVOS, PRODUTOS, FECHOS } from './vivo.js';
import { MAPAS, DUROS, PROPOSTAS } from './time.js';
import { NARRAS, BANCOS, RECUSAS } from './narra.js';
import { SPRINTS, SEGUROS, MEETUPS } from './cliente.js';
import { MESAS, MIGRAS, ESTREIAS } from './rodada.js';
import { POKERS, LEIGOS, RECRUTAS } from './carta.js';
import { CULPAS, RAIOS, OFERTAS } from './raio.js';
import { PEDIDOS, COBERTURAS, LOOMS } from './caderno.js';
import { GRAFICOS, HANDOFFS, ELEVADORES } from './grafico.js';
import { PISTAS, CALMAS, FOLGAS } from './pista.js';
import { RESPEITOS, DEBITOS, INDICACOES } from './respeito.js';
import { UXS, FORUNS, VISTOS } from './visto.js';
import { FACILS, ESCOLHAS, SABADOS } from './facil.js';
import { BRECHAS, MUDAS, GAUCHOS } from './brecha.js';
import { RADARS, APLAUSOS, GRIPES } from './radar.js';
import { PMS, LAUDOS, RUMOS } from './remoto.js';
import { ACESSOS, LICENCAS, JARGOES } from './equipe.js';
import { BANDEIRAS, GELOS, LIMITES } from './rollout.js';
import { CANARIOS, DESPEDIDAS, REPETICOES } from './entrega.js';
import { CARGAS, BOLETINS, DONOS } from './carga.js';
import { MANUAIS, VERDES, CERTIFICADOS } from './manual.js';
import { REBASES, CONSULTAS, REPLICAS } from './atraso.js';
import { ENSAIOS, DISCOS, PAGINAS } from './lote.js';
import { SQUASHES, CIRCUITOS, JOBS } from './corte.js';
import { COLHEITAS, SESSOES, TANQUES } from './folha.js';
import { SONDAS, SEMENTES, REGISTROS } from './pulso.js';
import { RASTROS, PARADAS, PODS } from './guarda.js';
import { LINTS, ORIGENS, LINKS } from './cerca.js';
import { CPUS, COPIAS, ESTOUROS } from './maquina.js';
import { IMPASSES, DOMINIOS, MORTAS } from './impasse.js';
import { PONTEIROS, ELEICOES, FREIOS } from './ponteiro.js';
import { PAUSAS, DERIVAS, DESCRITORES } from './pausa.js';
import { RESERVAS, VARREDURAS, PORTAS } from './reserva.js';
import { INODOS, SAIDAS, MANADAS } from './inodo.js';
import { GOTEJOS, FRIOS, CADEADOS } from './gotejo.js';
import { COTAS, CICLOS, ZUMBIS } from './cota.js';
import { SEGREDOS, FANTASMAS, INTEIROS } from './segredo.js';
import { FILTROS, ORDENS, PROVAS } from './filtro.js';
import { ORFAOS, ACENOS, GASTOS } from './orfao.js';
import { INSTAVEIS, DUPLICADOS, APAGOES } from './instavel.js';
import { REPLAYS, ECOS, LEQUES } from './replay.js';
import { SAGAS, CAIXAS, APAGADOS } from './saga.js';
import { ESPERAS, CURSORES, FILAS } from './espera.js';
import { DISJUNTORES, ALUGUEIS, PULSOS } from './disjuntor.js';
import { PISCINAS, BALDES, CERCAS } from './piscina.js';
import { TREMORES, PORTARIAS, COLAS } from './tremor.js';
import { ANTEPAROS, DESCARTES, CRONOMETROS } from './anteparo.js';
import { AMOSTRAS, NICHOS, LACRES } from './amostra.js';
import { SEMAFOROS, BARREIRAS, TRINCOS } from './semaforo.js';
import { RECUOS, VIGIAS, AMPULHETAS } from './recuo.js';
import { CARONAS, VENENOS, FAROIS } from './carona.js';
import { ANCORAS, MALHAS, FENDAS } from './ancora.js';
import { COFRES, AUDIENCIAS, REVOGACOES } from './cofre.js';
import { QUORUMS, MAIORIAS, ARBITROS } from './quorum.js';
import { LIDERES, MANDATOS, SEGUIDORES } from './lider.js';
import { ORQUESTRADORES, COREOGRAFIAS, COMPENSACOES } from './orquestra.js';
import { PRIMARIOS, ESPELHOS, ASCENSOES } from './primario.js';
import { TRAVESSIAS, RETAGUARDAS, CONTORNOS } from './travessia.js';
import { RUMORES, REPAROS, DEIXAS } from './rumor.js';
import { FLOCOS, EPOCAS, VETORES } from './floco.js';
import { SUJEIRAS, INSTANTANEOS, SERIAIS } from './sujeira.js';
import { FOMES, INVERSOES, IDADES } from './fome.js';
import { SIDECARS, EMBAIXADORES, ADAPTADORES } from './sidecar.js';
import { BIZANTINOS, PARTICOES, GENERAIS } from './bizantino.js';
import { WALS, LSNS, CHECKPOINTS } from './wal.js';
import { NONCES, HMACS, ENVELOPES } from './nonce.js';
import { LEASES, RENOVACOES, VENCIMENTOS } from './lease.js';
import { OUTBOXES, INBOXES, RELAYS } from './outbox.js';
import { OFFSETS, LAGS, ACKS } from './offset.js';
import { SNAPSHOTS, RESTORES, PROMOTES } from './snapshot.js';
import { BLOOMS, CUCOS, ESBOCOS } from './bloom.js';
import { MERKLES, RADIXES, TRIES } from './merkle.js';
import { GOSSIPS, PHIS, ACCRUALS } from './gossip.js';
import { HINTS, VACUUMS, FREEZES } from './hint.js';
import { BITMAPS, ROARINGS, HYPERS } from './bitmap.js';
import { CRDTS, LWWS, ORSETS } from './crdt.js';
import { VECTORS, DOTS, CAUSALS } from './vector.js';
import { SHARDS, REBALANCES, SPLITS } from './shard.js';
import { WATERMARKS, BARRIERS, ALIGNS } from './watermark.js';
import { WITNESSES, VOTERS, LEARNERS } from './witness.js';
import { CHECKSUMS, BULKHEADS, FALLBACKS } from './checksum.js';
import { TOMBSTONES, PURGES, RECLAIMS } from './tombstone.js';
import { JOURNALS, SEGMENTS, SPILLS } from './journal.js';
import { STRIPES, PARITIES, REBUILDS } from './stripe.js';
import { EPOCHS, BALLOTS, FENCES } from './epoch.js';
import { FLUSHES, MEMTABLES, EXTENTS } from './flush.js';
import { MANIFESTS, HEDGES, DEBOUNCES } from './manifest.js';
import { SSTABLES, LATCHES, THROTTLES } from './sstable.js';
import { ITERATORS, PAGERS, EVICTS } from './iterator.js';
import { HISTOGRAMS, GAUGES, BACKFILLS } from './histogram.js';
import { SKEWS, HOTSPOTS, TAILS } from './skew.js';
import { SLOS, SLIS, PROBES } from './slo.js';
import { TRACES, SCRAPES, ROLLUPS } from './trace.js';
import { WEBHOOKS, FANOUTS, INGESTS } from './webhook.js';
import { OTELS, SAMPLERS, EXEMPLARS } from './otel.js';
import { EGRESSES, GATEWAYS, FAILOVERS } from './egress.js';
import { CORRIDAS, INDICES, PERCENTIS } from './corrida.js';
import { COMPACTAS, DIARIOS, VAGOES } from './compacta.js';
import { PILHAS, CANOS, GIROS } from './pilha.js';
import { DATAGRAMAS, PASSES, CARIMBOS } from './datagrama.js';
import { CISOES, RAJADAS, BRASAS } from './cisao.js';

export const MINUTOS_REVISAO = 3;
export const SEGUNDOS_REVISAO = MINUTOS_REVISAO * 60;

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const GESTORES = [
  {
    id: 'elogio',
    titulo: 'O elogio',
    emoji: '🌱',
    nivel: 'B1',
    onde: 'O gestor notou os updates curtos.',
    rodadas: [
      fala(
        'Ouvir',
        'Your updates have been clear this month.',
        'Seus updates estiveram claros neste mês.',
        'Agradeça e diga que vai manter os updates curtos.',
        'Thank you. I will keep the updates short.',
        [
          'thank you i will keep the updates short',
          'thanks i will keep the updates short',
          'thank you i will keep my updates short'
        ],
        'Thank you recebe o elogio. I will keep assume o hábito.'
      ),
      fala(
        'Falar',
        'What would help you next month?',
        'O que te ajudaria no próximo mês?',
        'Peça um exemplo do que funcionou.',
        'Could you point out one thing that worked?',
        [
          'could you point out one thing that worked',
          'can you point out one thing that worked',
          'could you show me one thing that worked'
        ],
        'Point out pede um exemplo. One thing that worked é o que deu certo.'
      )
    ]
  },
  {
    id: 'proximo',
    titulo: 'O ponto a melhorar',
    emoji: '📈',
    nivel: 'B1',
    onde: 'Os testes têm chegado depois da review.',
    rodadas: [
      fala(
        'Ouvir',
        'The tests often land after the review.',
        'Os testes costumam chegar depois da review.',
        'Agradeça e diga que vai escrever os testes antes.',
        'Thanks for the feedback. I will write the tests earlier.',
        [
          'thanks for the feedback i will write the tests earlier',
          'thank you for the feedback i will write the tests earlier',
          'thanks for the feedback i will write tests earlier'
        ],
        'Thanks for the feedback recebe o ponto. Earlier é mais cedo.'
      ),
      fala(
        'Falar',
        'Does that plan sound fair?',
        'Esse plano parece justo?',
        'Peça para rever este ponto no próximo mês.',
        'Can we review this again next month?',
        [
          'can we review this again next month',
          'could we review this again next month',
          'can we check this again next month'
        ],
        'Review this again marca a próxima conversa. Next month é o próximo mês.'
      )
    ]
  },
  {
    id: 'prioridade',
    titulo: 'A sua vez',
    emoji: '🗣️',
    nivel: 'B2',
    onde: 'O gestor pede um feedback seu.',
    rodadas: [
      fala(
        'Ouvir',
        'How am I doing as your manager?',
        'Como eu estou indo como gestor?',
        'Agradeça as prioridades claras.',
        'I appreciate the clear priorities.',
        [
          'i appreciate the clear priorities',
          'i appreciate your clear priorities',
          'thanks for the clear priorities'
        ],
        'I appreciate recebe e devolve. Clear priorities são prioridades claras.'
      ),
      fala(
        'Falar',
        'What would help next?',
        'O que ajudaria em seguida?',
        'Diga que uma decisão por escrito ajudaria.',
        'A written decision would help me.',
        [
          'a written decision would help me',
          'a written decision would help',
          'having the decision in writing would help me'
        ],
        'A written decision é a decisão por escrito. Would help me pede sem cobrar.'
      )
    ]
  }
];

export const FINAIS = [
  {
    id: 'revisores',
    titulo: 'O time',
    emoji: '❓',
    nivel: 'B1',
    onde: 'O fim da entrevista. A pergunta é sua.',
    rodadas: [
      fala(
        'Pergunta',
        'Do you have a question for us?',
        'Você tem uma pergunta para a gente?',
        'Pergunte o que o time usa na code review.',
        'What does the team use for code review?',
        [
          'what does the team use for code review',
          'what do you use for code review',
          'what does the team use for reviews'
        ],
        'What does abre a pergunta. Code review é a revisão do código.'
      ),
      fala(
        'Detalhe',
        'We use pull requests.',
        'A gente usa pull requests.',
        'Pergunte quantas pessoas costumam revisar.',
        'How many reviewers do you usually need?',
        [
          'how many reviewers do you usually need',
          'how many reviewers do you need',
          'how many people usually review'
        ],
        'How many pergunta o número. Reviewers são quem revisa.'
      )
    ]
  },
  {
    id: 'noventa',
    titulo: 'Os 90 dias',
    emoji: '❓',
    nivel: 'B2',
    onde: 'Você quer saber o que é sucesso no começo.',
    rodadas: [
      fala(
        'Pergunta',
        'Any question before we wrap up?',
        'Alguma pergunta antes de fechar?',
        'Pergunte como é o sucesso nos primeiros 90 dias.',
        'What does success look like in the first 90 days?',
        [
          'what does success look like in the first 90 days',
          'what does success look like in the first ninety days',
          'what does success look like in 90 days'
        ],
        'Success é o sucesso. The first 90 days é o começo.'
      ),
      fala(
        'Detalhe',
        'Shipping a small project with the team.',
        'Entregar um projeto pequeno com o time.',
        'Pergunte com quem você trabalharia no primeiro mês.',
        'Who would I work with in the first month?',
        [
          'who would i work with in the first month',
          'who would i work with in month one',
          'who will i work with in the first month'
        ],
        'Who pergunta a pessoa. The first month é o primeiro mês.'
      )
    ]
  },
  {
    id: 'aperto',
    titulo: 'O difícil',
    emoji: '❓',
    nivel: 'B1',
    onde: 'Você quer o desafio real da vaga.',
    rodadas: [
      fala(
        'Pergunta',
        'What else can I tell you?',
        'O que mais eu posso te contar?',
        'Pergunte qual é a parte mais difícil da vaga.',
        'What is the hardest part of this role?',
        [
          'what is the hardest part of this role',
          'what is the hardest part of the role',
          'what is the most difficult part of this role'
        ],
        'The hardest part é a parte mais difícil. Role é a vaga.'
      ),
      fala(
        'Detalhe',
        'Deadlines move a lot.',
        'Os prazos mudam bastante.',
        'Pergunte como o time lida com um prazo apertado.',
        'How does the team handle a tight deadline?',
        [
          'how does the team handle a tight deadline',
          'how do you handle a tight deadline',
          'how does the team deal with a tight deadline'
        ],
        'Handle é lidar. A tight deadline é um prazo apertado.'
      )
    ]
  }
];

export const VIAGENS = [
  {
    id: 'conexao',
    titulo: 'A conexão',
    emoji: '🛫',
    nivel: 'A2',
    onde: 'O próximo voo está perto.',
    rodadas: [
      fala(
        'Situação',
        'You look like you are in a hurry.',
        'Você parece estar com pressa.',
        'Diga que a conexão é em 40 minutos.',
        'My connection is in 40 minutes.',
        [
          'my connection is in 40 minutes',
          'my connection is in forty minutes',
          'the connection is in 40 minutes'
        ],
        'Connection é a conexão. In 40 minutes é daqui a 40 minutos.'
      ),
      fala(
        'Pedido',
        'Where is the next flight?',
        'Onde é o próximo voo?',
        'Pergunte para onde ir para o voo de conexão.',
        'Where do I go for the connecting flight?',
        [
          'where do i go for the connecting flight',
          'where do i go for my connecting flight',
          'where should i go for the connecting flight'
        ],
        'Where do I go pergunta o caminho. Connecting flight é o voo de conexão.'
      )
    ]
  },
  {
    id: 'negocios',
    titulo: 'Na imigração',
    emoji: '🛂',
    nivel: 'B1',
    onde: 'A visita é a trabalho e dura três dias.',
    rodadas: [
      fala(
        'Situação',
        'What is the purpose of your visit?',
        'Qual é o motivo da visita?',
        'Diga que você está aqui a trabalho.',
        'I am here for a business trip.',
        [
          'i am here for a business trip',
          "i'm here for a business trip",
          'i am here on a business trip'
        ],
        'A business trip é viagem a trabalho. I am here é estou aqui.'
      ),
      fala(
        'Pedido',
        'How long will you stay?',
        'Por quanto tempo você fica?',
        'Diga que vai ficar três dias.',
        'I will stay for three days.',
        [
          'i will stay for three days',
          'i will stay for 3 days',
          "i'll stay for three days"
        ],
        'I will stay é vou ficar. Three days são três dias.'
      )
    ]
  },
  {
    id: 'corrida',
    titulo: 'O táxi',
    emoji: '🚕',
    nivel: 'A2',
    onde: 'Você sai do aeroporto com o endereço na mão.',
    rodadas: [
      fala(
        'Situação',
        'Where would you like to go?',
        'Para onde você quer ir?',
        'Peça para ir até este endereço.',
        'Can you take me to this address?',
        [
          'can you take me to this address',
          'could you take me to this address',
          'can you take me to this address please'
        ],
        'Take me to pede o destino. This address é este endereço.'
      ),
      fala(
        'Pedido',
        'Traffic is heavy right now.',
        'O trânsito está pesado agora.',
        'Pergunte quanto tempo esta corrida leva.',
        'How long will this ride take?',
        [
          'how long will this ride take',
          'how long will the ride take',
          'how long is this ride'
        ],
        'How long pergunta a duração. This ride é esta corrida.'
      )
    ]
  }
];

function rngDoDia(dia) {
  let x = 2166136261;
  const texto = String(dia);
  for (let i = 0; i < texto.length; i++) {
    x ^= texto.charCodeAt(i);
    x = Math.imul(x, 16777619);
  }
  x >>>= 0;
  if (!x) x = 1;
  return () => {
    x = (Math.imul(1664525, x) + 1013904223) >>> 0;
    return x / 4294967296;
  };
}

function embaralharCom(rng, lista) {
  const arr = [...lista];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function rodadasDe(item) {
  if (Array.isArray(item?.rodadas) && item.rodadas.length) return item.rodadas;
  if (typeof item?.melhor === 'string') return [item];
  return [];
}

export function coletarFaladas(grupos) {
  const saida = [];
  const vistas = new Set();
  for (const grupo of grupos || []) {
    const origem = typeof grupo?.origem === 'string' && grupo.origem ? grupo.origem : 'Fala';
    const itens = Array.isArray(grupo?.itens) ? grupo.itens : [];
    for (const item of itens) {
      rodadasDe(item).forEach(rodada => {
        if (!rodada || typeof rodada.melhor !== 'string' || !rodada.melhor.includes(' ')) return;
        if (!Array.isArray(rodada.aceitas) || !rodada.aceitas.length) return;
        const chave = normalizarFala(rodada.melhor);
        if (!chave || vistas.has(chave)) return;
        vistas.add(chave);
        const npc = rodada.npc?.en
          ? rodada.npc
          : { en: 'Your turn.', pt: 'Sua vez.' };
        saida.push({
          etapa: rodada.etapa || origem,
          npc,
          missao: rodada.missao || rodada.pt || rodada.pergunta || rodada.uso || 'Diga a frase em inglês.',
          melhor: rodada.melhor,
          aceitas: rodada.aceitas,
          dica: rodada.dica || '',
          origem,
          titulo: item.titulo || origem
        });
      });
    }
  }
  return saida;
}

export function montarRevisao(faladas, dia, quantidade = 8) {
  if (typeof dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return [];
  const lista = Array.isArray(faladas) ? faladas.filter(item => item && typeof item.melhor === 'string') : [];
  if (!lista.length) return [];
  const pedido = Number(quantidade);
  const n = Number.isFinite(pedido) ? Math.max(1, Math.min(Math.floor(pedido), 12)) : 8;
  const rng = rngDoDia('revisao:' + dia);
  const porOrigem = new Map();
  for (const item of lista) {
    const origem = item.origem || 'Fala';
    if (!porOrigem.has(origem)) porOrigem.set(origem, []);
    porOrigem.get(origem).push(item);
  }
  const filas = embaralharCom(rng, [...porOrigem.keys()]).map(chave => embaralharCom(rng, porOrigem.get(chave)));
  const saida = [];
  while (saida.length < n && filas.some(fila => fila.length)) {
    for (const fila of filas) {
      if (saida.length >= n) break;
      const item = fila.shift();
      if (item) saida.push(item);
    }
  }
  return saida;
}

function frasesComoItens(frases) {
  return (frases || []).map(f => ({
    id: f.id,
    titulo: f.pt || f.en,
    melhor: f.en,
    aceitas: [f.en, ...(f.alt || [])],
    missao: f.pt || 'Diga a frase em inglês.',
    dica: f.uso || '',
    npc: { en: 'Your turn.', pt: 'Sua vez.' }
  }));
}

let cacheFaladas = null;

export function catalogoFaladas() {
  if (cacheFaladas) return cacheFaladas;
  cacheFaladas = coletarFaladas([
    { origem: 'Corrida', itens: CORRIDAS },
    { origem: 'Índice', itens: INDICES },
    { origem: 'Segredo', itens: SEGREDOS },
    { origem: 'Fantasma', itens: FANTASMAS },
    { origem: 'Inteiro', itens: INTEIROS },
    { origem: 'Filtro', itens: FILTROS },
    { origem: 'Ordem', itens: ORDENS },
    { origem: 'Prova', itens: PROVAS },
    { origem: 'Órfão', itens: ORFAOS },
    { origem: 'Aceno', itens: ACENOS },
    { origem: 'Gasto', itens: GASTOS },
    { origem: 'Instável', itens: INSTAVEIS },
    { origem: 'Duplicado', itens: DUPLICADOS },
    { origem: 'Apagão', itens: APAGOES },
    { origem: 'Replay', itens: REPLAYS },
    { origem: 'Eco', itens: ECOS },
    { origem: 'Leque', itens: LEQUES },
    { origem: 'Saga', itens: SAGAS },
    { origem: 'Caixa', itens: CAIXAS },
    { origem: 'Apagado', itens: APAGADOS },
    { origem: 'Espera', itens: ESPERAS },
    { origem: 'Cursor', itens: CURSORES },
    { origem: 'Fila', itens: FILAS },
    { origem: 'Disjuntor', itens: DISJUNTORES },
    { origem: 'Aluguel', itens: ALUGUEIS },
    { origem: 'Pulso', itens: PULSOS },
    { origem: 'Piscina', itens: PISCINAS },
    { origem: 'Balde', itens: BALDES },
    { origem: 'Cerca', itens: CERCAS },
    { origem: 'Tremor', itens: TREMORES },
    { origem: 'Portaria', itens: PORTARIAS },
    { origem: 'Cola', itens: COLAS },
    { origem: 'Anteparo', itens: ANTEPAROS },
    { origem: 'Descarte', itens: DESCARTES },
    { origem: 'Cronômetro', itens: CRONOMETROS },
    { origem: 'Amostra', itens: AMOSTRAS },
    { origem: 'Nicho', itens: NICHOS },
    { origem: 'Lacre', itens: LACRES },
    { origem: 'Semáforo', itens: SEMAFOROS },
    { origem: 'Barreira', itens: BARREIRAS },
    { origem: 'Trinco', itens: TRINCOS },
    { origem: 'Recuo', itens: RECUOS },
    { origem: 'Vigia', itens: VIGIAS },
    { origem: 'Ampulheta', itens: AMPULHETAS },
    { origem: 'Carona', itens: CARONAS },
    { origem: 'Veneno', itens: VENENOS },
    { origem: 'Farol', itens: FAROIS },
    { origem: 'Âncora', itens: ANCORAS },
    { origem: 'Malha', itens: MALHAS },
    { origem: 'Fenda', itens: FENDAS },
    { origem: 'Cofre', itens: COFRES },
    { origem: 'Audiência', itens: AUDIENCIAS },
    { origem: 'Revogação', itens: REVOGACOES },
    { origem: 'Quórum', itens: QUORUMS },
    { origem: 'Maioria', itens: MAIORIAS },
    { origem: 'Árbitro', itens: ARBITROS },
    { origem: 'Líder', itens: LIDERES },
    { origem: 'Mandato', itens: MANDATOS },
    { origem: 'Seguidor', itens: SEGUIDORES },
    { origem: 'Orquestrador', itens: ORQUESTRADORES },
    { origem: 'Coreografia', itens: COREOGRAFIAS },
    { origem: 'Compensação', itens: COMPENSACOES },
    { origem: 'Primário', itens: PRIMARIOS },
    { origem: 'Espelho', itens: ESPELHOS },
    { origem: 'Ascensão', itens: ASCENSOES },
    { origem: 'Travessia', itens: TRAVESSIAS },
    { origem: 'Retaguarda', itens: RETAGUARDAS },
    { origem: 'Contorno', itens: CONTORNOS },
    { origem: 'Rumor', itens: RUMORES },
    { origem: 'Reparo', itens: REPAROS },
    { origem: 'Deixa', itens: DEIXAS },
    { origem: 'Floco', itens: FLOCOS },
    { origem: 'Época', itens: EPOCAS },
    { origem: 'Vetor', itens: VETORES },
    { origem: 'Sujeira', itens: SUJEIRAS },
    { origem: 'Instantâneo', itens: INSTANTANEOS },
    { origem: 'Serial', itens: SERIAIS },
    { origem: 'Fome', itens: FOMES },
    { origem: 'Inversão', itens: INVERSOES },
    { origem: 'Idade', itens: IDADES },
    { origem: 'Sidecar', itens: SIDECARS },
    { origem: 'Embaixador', itens: EMBAIXADORES },
    { origem: 'Adaptador', itens: ADAPTADORES },
    { origem: 'Bizantino', itens: BIZANTINOS },
    { origem: 'Partição', itens: PARTICOES },
    { origem: 'General', itens: GENERAIS },
    { origem: 'Wal', itens: WALS },
    { origem: 'Lsn', itens: LSNS },
    { origem: 'Checkpoint', itens: CHECKPOINTS },
    { origem: 'Nonce', itens: NONCES },
    { origem: 'Hmac', itens: HMACS },
    { origem: 'Envelope', itens: ENVELOPES },
    { origem: 'Lease', itens: LEASES },
    { origem: 'Renovação', itens: RENOVACOES },
    { origem: 'Vencimento', itens: VENCIMENTOS },
    { origem: 'Outbox', itens: OUTBOXES },
    { origem: 'Inbox', itens: INBOXES },
    { origem: 'Relay', itens: RELAYS },
    { origem: 'Offset', itens: OFFSETS },
    { origem: 'Lag', itens: LAGS },
    { origem: 'Ack', itens: ACKS },
    { origem: 'Snapshot', itens: SNAPSHOTS },
    { origem: 'Restore', itens: RESTORES },
    { origem: 'Promote', itens: PROMOTES },
    { origem: 'Bloom', itens: BLOOMS },
    { origem: 'Cuco', itens: CUCOS },
    { origem: 'Esboço', itens: ESBOCOS },
    { origem: 'Merkle', itens: MERKLES },
    { origem: 'Radix', itens: RADIXES },
    { origem: 'Trie', itens: TRIES },
    { origem: 'Gossip', itens: GOSSIPS },
    { origem: 'Phi', itens: PHIS },
    { origem: 'Accrual', itens: ACCRUALS },
    { origem: 'Hint', itens: HINTS },
    { origem: 'Vacuum', itens: VACUUMS },
    { origem: 'Freeze', itens: FREEZES },
    { origem: 'Bitmap', itens: BITMAPS },
    { origem: 'Roaring', itens: ROARINGS },
    { origem: 'Hyper', itens: HYPERS },
    { origem: 'Crdt', itens: CRDTS },
    { origem: 'Lww', itens: LWWS },
    { origem: 'Orset', itens: ORSETS },
    { origem: 'Vector', itens: VECTORS },
    { origem: 'Dot', itens: DOTS },
    { origem: 'Causal', itens: CAUSALS },
    { origem: 'Shard', itens: SHARDS },
    { origem: 'Rebalance', itens: REBALANCES },
    { origem: 'Split', itens: SPLITS },
    { origem: 'Watermark', itens: WATERMARKS },
    { origem: 'Barrier', itens: BARRIERS },
    { origem: 'Align', itens: ALIGNS },
    { origem: 'Witness', itens: WITNESSES },
    { origem: 'Voter', itens: VOTERS },
    { origem: 'Learner', itens: LEARNERS },
    { origem: 'Checksum', itens: CHECKSUMS },
    { origem: 'Bulkhead', itens: BULKHEADS },
    { origem: 'Fallback', itens: FALLBACKS },
    { origem: 'Tombstone', itens: TOMBSTONES },
    { origem: 'Purge', itens: PURGES },
    { origem: 'Reclaim', itens: RECLAIMS },
    { origem: 'Journal', itens: JOURNALS },
    { origem: 'Segment', itens: SEGMENTS },
    { origem: 'Spill', itens: SPILLS },
    { origem: 'Stripe', itens: STRIPES },
    { origem: 'Parity', itens: PARITIES },
    { origem: 'Rebuild', itens: REBUILDS },
    { origem: 'Epoch', itens: EPOCHS },
    { origem: 'Ballot', itens: BALLOTS },
    { origem: 'Fence', itens: FENCES },
    { origem: 'Flush', itens: FLUSHES },
    { origem: 'Memtable', itens: MEMTABLES },
    { origem: 'Extent', itens: EXTENTS },
    { origem: 'Manifest', itens: MANIFESTS },
    { origem: 'Hedge', itens: HEDGES },
    { origem: 'Debounce', itens: DEBOUNCES },
    { origem: 'Sstable', itens: SSTABLES },
    { origem: 'Latch', itens: LATCHES },
    { origem: 'Throttle', itens: THROTTLES },
    { origem: 'Iterator', itens: ITERATORS },
    { origem: 'Pager', itens: PAGERS },
    { origem: 'Evict', itens: EVICTS },
    { origem: 'Histogram', itens: HISTOGRAMS },
    { origem: 'Gauge', itens: GAUGES },
    { origem: 'Backfill', itens: BACKFILLS },
    { origem: 'Skew', itens: SKEWS },
    { origem: 'Hotspot', itens: HOTSPOTS },
    { origem: 'Tail', itens: TAILS },
    { origem: 'Slo', itens: SLOS },
    { origem: 'Sli', itens: SLIS },
    { origem: 'Probe', itens: PROBES },
    { origem: 'Trace', itens: TRACES },
    { origem: 'Scrape', itens: SCRAPES },
    { origem: 'Rollup', itens: ROLLUPS },
    { origem: 'Webhook', itens: WEBHOOKS },
    { origem: 'Fanout', itens: FANOUTS },
    { origem: 'Ingest', itens: INGESTS },
    { origem: 'Otel', itens: OTELS },
    { origem: 'Sampler', itens: SAMPLERS },
    { origem: 'Exemplar', itens: EXEMPLARS },
    { origem: 'Egress', itens: EGRESSES },
    { origem: 'Gateway', itens: GATEWAYS },
    { origem: 'Failover', itens: FAILOVERS },
    { origem: 'Percentil', itens: PERCENTIS },
    { origem: 'Compactação', itens: COMPACTAS },
    { origem: 'Diário', itens: DIARIOS },
    { origem: 'Vagão', itens: VAGOES },
    { origem: 'Pilha', itens: PILHAS },
    { origem: 'Cano', itens: CANOS },
    { origem: 'Giro', itens: GIROS },
    { origem: 'Datagrama', itens: DATAGRAMAS },
    { origem: 'Passe', itens: PASSES },
    { origem: 'Carimbo', itens: CARIMBOS },
    { origem: 'Cisão', itens: CISOES },
    { origem: 'Rajada', itens: RAJADAS },
    { origem: 'Brasa', itens: BRASAS },
    { origem: 'Cota', itens: COTAS },
    { origem: 'Ciclo', itens: CICLOS },
    { origem: 'Zumbi', itens: ZUMBIS },
    { origem: 'Gotejo', itens: GOTEJOS },
    { origem: 'Frio', itens: FRIOS },
    { origem: 'Cadeado', itens: CADEADOS },
    { origem: 'Inodo', itens: INODOS },
    { origem: 'Saída', itens: SAIDAS },
    { origem: 'Manada', itens: MANADAS },
    { origem: 'Reserva', itens: RESERVAS },
    { origem: 'Varredura', itens: VARREDURAS },
    { origem: 'Porta', itens: PORTAS },
    { origem: 'Pausa', itens: PAUSAS },
    { origem: 'Deriva', itens: DERIVAS },
    { origem: 'Descritor', itens: DESCRITORES },
    { origem: 'Ponteiros', itens: PONTEIROS },
    { origem: 'Eleição', itens: ELEICOES },
    { origem: 'Freio', itens: FREIOS },
    { origem: 'Impasse', itens: IMPASSES },
    { origem: 'Domínio', itens: DOMINIOS },
    { origem: 'Carta morta', itens: MORTAS },
    { origem: 'Processador', itens: CPUS },
    { origem: 'Cópia', itens: COPIAS },
    { origem: 'Estouro', itens: ESTOUROS },
    { origem: 'Lint', itens: LINTS },
    { origem: 'Origem', itens: ORIGENS },
    { origem: 'Link', itens: LINKS },
    { origem: 'Rastro', itens: RASTROS },
    { origem: 'Parada', itens: PARADAS },
    { origem: 'Pod', itens: PODS },
    { origem: 'Sonda', itens: SONDAS },
    { origem: 'Semente', itens: SEMENTES },
    { origem: 'Registro', itens: REGISTROS },
    { origem: 'Colheita', itens: COLHEITAS },
    { origem: 'Sessão', itens: SESSOES },
    { origem: 'Tanque', itens: TANQUES },
    { origem: 'Squash', itens: SQUASHES },
    { origem: 'Circuito', itens: CIRCUITOS },
    { origem: 'Job', itens: JOBS },
    { origem: 'Ensaio', itens: ENSAIOS },
    { origem: 'Disco', itens: DISCOS },
    { origem: 'Página', itens: PAGINAS },
    { origem: 'Rebase', itens: REBASES },
    { origem: 'Consulta', itens: CONSULTAS },
    { origem: 'Réplica', itens: REPLICAS },
    { origem: 'Manual', itens: MANUAIS },
    { origem: 'Lado verde', itens: VERDES },
    { origem: 'Certificado', itens: CERTIFICADOS },
    { origem: 'Carga', itens: CARGAS },
    { origem: 'Boletim', itens: BOLETINS },
    { origem: 'Dono', itens: DONOS },
    { origem: 'Canário', itens: CANARIOS },
    { origem: 'Despedida', itens: DESPEDIDAS },
    { origem: 'Repetição', itens: REPETICOES },
    { origem: 'Bandeira', itens: BANDEIRAS },
    { origem: 'Gelo', itens: GELOS },
    { origem: 'Limite', itens: LIMITES },
    { origem: 'Acesso', itens: ACESSOS },
    { origem: 'Licença', itens: LICENCAS },
    { origem: 'Jargão', itens: JARGOES },
    { origem: 'PM', itens: PMS },
    { origem: 'Laudo', itens: LAUDOS },
    { origem: 'Rumo', itens: RUMOS },
    { origem: 'Radar', itens: RADARS },
    { origem: 'Aplauso', itens: APLAUSOS },
    { origem: 'Gripe', itens: GRIPES },
    { origem: 'Brecha', itens: BRECHAS },
    { origem: 'Mudança', itens: MUDAS },
    { origem: 'Chimarrão', itens: GAUCHOS },
    { origem: 'Facilitador', itens: FACILS },
    { origem: 'Escolha', itens: ESCOLHAS },
    { origem: 'Sábado', itens: SABADOS },
    { origem: 'Contraste', itens: UXS },
    { origem: 'Fórum', itens: FORUNS },
    { origem: 'Visto', itens: VISTOS },
    { origem: 'Respeito', itens: RESPEITOS },
    { origem: 'Dívida', itens: DEBITOS },
    { origem: 'Indicação', itens: INDICACOES },
    { origem: 'Pista', itens: PISTAS },
    { origem: 'Calma', itens: CALMAS },
    { origem: 'Folga', itens: FOLGAS },
    { origem: 'Gráfico', itens: GRAFICOS },
    { origem: 'Handoff', itens: HANDOFFS },
    { origem: 'Elevador', itens: ELEVADORES },
    { origem: 'Pedido', itens: PEDIDOS },
    { origem: 'Cobertura', itens: COBERTURAS },
    { origem: 'Vídeo', itens: LOOMS },
    { origem: 'Desculpa', itens: CULPAS },
    { origem: 'Relâmpago', itens: RAIOS },
    { origem: 'Oferta', itens: OFERTAS },
    { origem: 'Carta', itens: POKERS },
    { origem: 'Conta', itens: LEIGOS },
    { origem: 'Ligação', itens: RECRUTAS },
    { origem: 'Mesa', itens: MESAS },
    { origem: 'Migra', itens: MIGRAS },
    { origem: 'Estreia', itens: ESTREIAS },
    { origem: 'Sprint', itens: SPRINTS },
    { origem: 'Seguro', itens: SEGUROS },
    { origem: 'Meetup', itens: MEETUPS },
    { origem: 'Narrar', itens: NARRAS },
    { origem: 'Banco', itens: BANCOS },
    { origem: 'Recusa', itens: RECUSAS },
    { origem: 'Mapa', itens: MAPAS },
    { origem: 'Duro', itens: DUROS },
    { origem: 'Proposta', itens: PROPOSTAS },
    { origem: 'Vivo', itens: VIVOS },
    { origem: 'Produto', itens: PRODUTOS },
    { origem: 'Fecho', itens: FECHOS },
    { origem: 'Cultura', itens: CULTURAS },
    { origem: 'Aumento', itens: AUMENTOS },
    { origem: 'Rota', itens: ROTAS },
    { origem: 'Futuro', itens: FUTUROS },
    { origem: 'Modelo', itens: MODELOS },
    { origem: 'Furo', itens: FUROS },
    { origem: 'Rotina', itens: ROTINAS },
    { origem: 'Papo', itens: PAPOS },
    { origem: 'Sistema', itens: SISTEMAS },
    { origem: 'Código', itens: CODIGOS },
    { origem: 'Colega', itens: COLEGAS },
    { origem: 'Palestra', itens: PALESTRAS },
    { origem: 'Dúvida', itens: DUVIDAS },
    { origem: 'Sinal', itens: SINAIS },
    { origem: 'Falha', itens: FALHAS },
    { origem: 'Mentoria', itens: MENTORIAS },
    { origem: 'Socorro', itens: SOCORROS },
    { origem: 'Requisito', itens: REQUISITOS },
    { origem: 'Métrica', itens: METRICAS },
    { origem: 'Aprendizado', itens: APRENDIZADOS },
    { origem: 'Passeio', itens: PASSEIOS },
    { origem: 'Salário', itens: SALARIOS },
    { origem: 'Portfólio', itens: PROJETOS },
    { origem: 'Sotaque', itens: SOTAQUES },
    { origem: 'Desafio', itens: FALAS_DIA },
    { origem: 'Linha', itens: LINHAS },
    { origem: 'Slack', itens: SLACKS },
    { origem: 'Social', itens: SOCIAIS },
    { origem: 'Termo', itens: TERMOS },
    { origem: 'Estimativa', itens: ESTIMATIVAS },
    { origem: 'Consenso', itens: CONSENSOS },
    { origem: 'Atendimento', itens: ATENDIMENTOS },
    { origem: '1:1', itens: GESTORES },
    { origem: 'Entrevista', itens: FINAIS },
    { origem: 'Viagem', itens: VIAGENS },
    { origem: 'Retro', itens: RETROS },
    { origem: 'Onboarding', itens: CHEGADAS },
    { origem: 'Conector', itens: LIGACOES },
    { origem: 'Decisão', itens: DECISOES },
    { origem: 'Pair', itens: PARES },
    { origem: 'Plantão', itens: INCIDENTES },
    { origem: 'Demo', itens: DEMOS },
    { origem: 'Prazo', itens: PRAZOS },
    { origem: 'STAR', itens: STARS },
    { origem: 'Ênfase', itens: ENFASES },
    { origem: 'Bug', itens: RELATOS },
    { origem: 'Review', itens: CORTESIAS },
    { origem: 'Papo', itens: AQUECIMENTOS },
    { origem: 'Esclarecer', itens: CLAROS },
    { origem: 'Opinião', itens: OPINIOES },
    { origem: 'Cena', itens: CENAS_FALA },
    { origem: 'Rápido', itens: RAPIDOS },
    { origem: 'Entrevista longa', itens: [ENTREVISTA] },
    { origem: 'História', itens: CONTOS },
    { origem: 'Trabalho', itens: CENAS_TECNICAS },
    { origem: 'Idiom', itens: IDIOMAS },
    { origem: 'Pergunta do dia', itens: PERGUNTAS_DIA },
    { origem: 'Você pergunta', itens: PERGUNTAS },
    { origem: 'Frase', itens: frasesComoItens(FRASES) }
  ]);
  return cacheFaladas;
}

export function gestorPorId(id) {
  return GESTORES.find(c => c.id === id) ?? null;
}

export function finalPorId(id) {
  return FINAIS.find(c => c.id === id) ?? null;
}

export function viagemPorId(id) {
  return VIAGENS.find(c => c.id === id) ?? null;
}

export function avaliarGestor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFinal(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarViagem(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRevisao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export { resumoDaFila } from './espaco.js';

