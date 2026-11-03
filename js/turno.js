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
