// Incidente ao vivo, prazo com o produto e perguntas no fim da entrevista.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const VIVOS = [
  {
    id: 'sirene',
    titulo: 'O status',
    emoji: '🔥',
    nivel: 'B1',
    onde: 'O canal pede um recado enquanto o checkout falha.',
    rodadas: [
      fala(
        'Status',
        'What should I tell the channel?',
        'O que eu digo no canal?',
        'Diga que o checkout está falhando para pedidos novos.',
        'Checkout is failing for new orders.',
        [
          'checkout is failing for new orders',
          'the checkout is failing for new orders',
          'checkout is failing for new orders right now'
        ],
        'Checkout é o pagamento. New orders são pedidos novos.'
      ),
      fala(
        'Quando',
        'Since when?',
        'Desde quando?',
        'Diga que começou há cerca de 20 minutos.',
        'It started about 20 minutes ago.',
        [
          'it started about 20 minutes ago',
          'it started about twenty minutes ago',
          'this started about 20 minutes ago'
        ],
        'About 20 minutes ago é há cerca de 20 minutos.'
      )
    ]
  },
  {
    id: 'reforco',
    titulo: 'A ajuda',
    emoji: '🔥',
    nivel: 'B1',
    onde: 'Você precisa de outra pessoa olhando com você.',
    rodadas: [
      fala(
        'Pedido',
        'Do you want a hand?',
        'Quer uma mão?',
        'Peça para olhar os logs de erro com você.',
        'Can you look at the error logs with me?',
        [
          'can you look at the error logs with me',
          'could you look at the error logs with me',
          'can you check the error logs with me'
        ],
        'Error logs são os registros de erro. With me é junto comigo.'
      ),
      fala(
        'Quem',
        'Who else should we call?',
        'Quem mais a gente chama?',
        'Diga que precisa de alguém do banco de dados.',
        'I need someone from the database team.',
        [
          'i need someone from the database team',
          'i need someone on the database team',
          'we need someone from the database team'
        ],
        'Database team é o time do banco de dados.'
      )
    ]
  },
  {
    id: 'ata',
    titulo: 'A lição',
    emoji: '🔥',
    nivel: 'B2',
    onde: 'O incidente passou. Falta a lição, não a desculpa.',
    rodadas: [
      fala(
        'Lição',
        'What fixed it?',
        'O que resolveu?',
        'Diga que a correção foi aumentar o tempo limite.',
        'The fix was to raise the timeout.',
        [
          'the fix was to raise the timeout',
          'the fix was raising the timeout',
          'we fixed it by raising the timeout'
        ],
        'Timeout é o tempo limite. Raise é aumentar.'
      ),
      fala(
        'Ação',
        'What will we change after this?',
        'O que muda depois disso?',
        'Diga que vão criar um alerta para esse tempo limite.',
        'We will add an alert for this timeout.',
        [
          'we will add an alert for this timeout',
          'we will add an alert for the timeout',
          'we are going to add an alert for this timeout'
        ],
        'Add an alert é criar um aviso. This timeout é esse tempo limite.'
      )
    ]
  }
];

export const PRODUTOS = [
  {
    id: 'fatia',
    titulo: 'Nesta entrega',
    emoji: '📦',
    nivel: 'B1',
    onde: 'O produto quer checkout e relatórios juntos.',
    rodadas: [
      fala(
        'Prazo',
        'Can both land in this release?',
        'Os dois cabem nesta entrega?',
        'Peça para manter o checkout nesta entrega.',
        'Can we keep checkout in this release?',
        [
          'can we keep checkout in this release',
          'could we keep checkout in this release',
          'can we keep the checkout in this release'
        ],
        'This release é esta entrega. Keep é manter.'
      ),
      fala(
        'Corte',
        'What about the reports?',
        'E os relatórios?',
        'Diga que os relatórios podem ir para a próxima entrega.',
        'We can move the reports to the next release.',
        [
          'we can move the reports to the next release',
          'we can move reports to the next release',
          'the reports can move to the next release'
        ],
        'The next release é a próxima entrega. Reports são os relatórios.'
      )
    ]
  },
  {
    id: 'solta',
    titulo: 'O que espera',
    emoji: '📦',
    nivel: 'B1',
    onde: 'A data só fecha se um pedaço sair.',
    rodadas: [
      fala(
        'Prazo',
        'The date is next Friday.',
        'A data é a próxima sexta.',
        'Diga que a data só funciona se cortar os filtros extras.',
        'This date only works if we cut the extra filters.',
        [
          'this date only works if we cut the extra filters',
          'this date only works if we cut extra filters',
          'the date only works if we cut the extra filters'
        ],
        'Only works if é só funciona se. Extra filters são filtros a mais.'
      ),
      fala(
        'Corte',
        'Do we lose the filters forever?',
        'A gente perde os filtros para sempre?',
        'Diga que os filtros podem esperar até o mês que vem.',
        'The filters can wait until next month.',
        [
          'the filters can wait until next month',
          'the filters can wait until the next month',
          'filters can wait until next month'
        ],
        'Wait until é esperar até. Next month é o mês que vem.'
      )
    ]
  },
  {
    id: 'risco',
    titulo: 'O risco da data',
    emoji: '📦',
    nivel: 'B2',
    onde: 'Manter os dois pedaços empurra a data.',
    rodadas: [
      fala(
        'Prazo',
        'Can we keep both and the date?',
        'Dá para manter os dois e a data?',
        'Diga que, se manter os dois, a data escorrega.',
        'If we keep both, the date will slip.',
        [
          'if we keep both the date will slip',
          'if we keep both the date slips',
          'if we keep both then the date will slip'
        ],
        'Slip é escorregar. Both são os dois pedaços.'
      ),
      fala(
        'Corte',
        'Which trade do you prefer?',
        'Qual troca você prefere?',
        'Diga que prefere entregar menos e manter a data.',
        'I would rather ship less and keep the date.',
        [
          'i would rather ship less and keep the date',
          'i would rather ship less and keep this date',
          'i would rather deliver less and keep the date'
        ],
        'I would rather é eu prefiro. Ship less é entregar menos.'
      )
    ]
  }
];

export const FECHOS = [
  {
    id: 'sobreaviso',
    titulo: 'O plantão',
    emoji: '🙋',
    nivel: 'B1',
    onde: 'O fim da entrevista. Você pergunta do sobreaviso.',
    rodadas: [
      fala(
        'Pergunta',
        'Do you have any questions for me?',
        'Você tem alguma pergunta para mim?',
        'Pergunte com que frequência o time fica de plantão.',
        'How often is this team on call?',
        [
          'how often is this team on call',
          'how often is the team on call',
          'how often are you on call'
        ],
        'How often pergunta a frequência. On call é o plantão.'
      ),
      fala(
        'Detalhe',
        'One week a month.',
        'Uma semana por mês.',
        'Pergunte como é uma semana típica de plantão.',
        'What does a typical on call week look like?',
        [
          'what does a typical on call week look like',
          'what does a typical on call week look like for you',
          'what is a typical on call week like'
        ],
        'A typical week é uma semana comum. Look like pede a descrição.'
      )
    ]
  },
  {
    id: 'crescimento',
    titulo: 'O crescimento',
    emoji: '🙋',
    nivel: 'B1',
    onde: 'Você quer saber como as pessoas evoluem no time.',
    rodadas: [
      fala(
        'Pergunta',
        'Anything else you want to know?',
        'Mais alguma coisa que você quer saber?',
        'Pergunte como as pessoas crescem neste time.',
        'How do people grow on this team?',
        [
          'how do people grow on this team',
          'how do people grow in this team',
          'how does someone grow on this team'
        ],
        'Grow é crescer. On this team é neste time.'
      ),
      fala(
        'Detalhe',
        'People take on a bigger project.',
        'As pessoas assumem um projeto maior.',
        'Pergunte o que a última pessoa nesta vaga aprendeu.',
        'What did the last person in this role learn?',
        [
          'what did the last person in this role learn',
          'what did the last person in the role learn',
          'what did the person before me learn in this role'
        ],
        'The last person é a pessoa anterior. Role é a vaga.'
      )
    ]
  },
  {
    id: 'aberta',
    titulo: 'A vaga aberta',
    emoji: '🙋',
    nivel: 'B2',
    onde: 'Você quer o motivo da vaga, sem falar dos 90 dias.',
    rodadas: [
      fala(
        'Pergunta',
        'We have a few minutes left.',
        'Ainda temos alguns minutos.',
        'Pergunte por que esta vaga está aberta.',
        'Why is this role open?',
        [
          'why is this role open',
          'why is the role open',
          'why did this role open'
        ],
        'Why pergunta o motivo. Open é aberta.'
      ),
      fala(
        'Detalhe',
        'The team is growing.',
        'O time está crescendo.',
        'Pergunte o que eles querem que você aprenda primeiro.',
        'What would you want me to learn first?',
        [
          'what would you want me to learn first',
          'what do you want me to learn first',
          'what would you like me to learn first'
        ],
        'Learn first é aprender primeiro. You want me pede a expectativa deles.'
      )
    ]
  }
];

export function vivoPorId(id) {
  return VIVOS.find(c => c.id === id) ?? null;
}

export function produtoPorId(id) {
  return PRODUTOS.find(c => c.id === id) ?? null;
}

export function fechoPorId(id) {
  return FECHOS.find(c => c.id === id) ?? null;
}

export function avaliarVivo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarProduto(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFecho(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
