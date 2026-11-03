// Pair narrado, escolha de banco na entrevista e um não educado.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const NARRAS = [
  {
    id: 'renome',
    titulo: 'O nome',
    emoji: '🎙️',
    nivel: 'B1',
    onde: 'Você narra a linha antes de mudar a chamada.',
    rodadas: [
      fala(
        'Pensar',
        'What are you about to change?',
        'O que você está prestes a mudar?',
        'Diga que vai renomear a função antes de mexer na chamada.',
        'I will rename this function before I touch the call.',
        [
          'i will rename this function before i touch the call',
          'i will rename the function before i touch the call',
          'i will rename this function before i change the call'
        ],
        'Rename é renomear. The call é a chamada.'
      ),
      fala(
        'Linha',
        'Why that name?',
        'Por que esse nome?',
        'Diga que o nome novo diz o que a função devolve.',
        'The new name says what the function returns.',
        [
          'the new name says what the function returns',
          'the new name says what this function returns',
          'this new name says what the function returns'
        ],
        'Returns é devolve. The new name é o nome novo.'
      )
    ]
  },
  {
    id: 'cedo',
    titulo: 'A saída cedo',
    emoji: '🎙️',
    nivel: 'B1',
    onde: 'Você fala a saída antes de escrever o resto.',
    rodadas: [
      fala(
        'Pensar',
        'What comes first in this function?',
        'O que vem primeiro nesta função?',
        'Diga que vai sair cedo quando o id não vier.',
        'I will return early when the id is missing.',
        [
          'i will return early when the id is missing',
          'i will return early if the id is missing',
          'i will return early when id is missing'
        ],
        'Return early é sair cedo. Missing é quando não veio.'
      ),
      fala(
        'Linha',
        'What does that buy you?',
        'O que isso te dá?',
        'Diga que o resto da função fica pequeno.',
        'That keeps the rest of the function small.',
        [
          'that keeps the rest of the function small',
          'this keeps the rest of the function small',
          'that keeps the rest of this function small'
        ],
        'The rest é o resto. Small é pequeno.'
      )
    ]
  },
  {
    id: 'rastro',
    titulo: 'O rastro',
    emoji: '🎙️',
    nivel: 'A2',
    onde: 'Você avisa o par da linha de log antes de gravar.',
    rodadas: [
      fala(
        'Pensar',
        'What will you write next?',
        'O que você vai escrever agora?',
        'Diga que vai registrar o id antes do pedido.',
        'I will log the id before the request.',
        [
          'i will log the id before the request',
          'i will log this id before the request',
          'i will log the id before this request'
        ],
        'Log é registrar. The request é o pedido.'
      ),
      fala(
        'Linha',
        'Why log it there?',
        'Por que registrar ali?',
        'Diga que assim dá para ver qual chamada falhou.',
        'Then we can see which call failed.',
        [
          'then we can see which call failed',
          'then we can see which request failed',
          'so we can see which call failed'
        ],
        'Which call é qual chamada. Failed é falhou.'
      )
    ]
  }
];

export const BANCOS = [
  {
    id: 'sessoes',
    titulo: 'As sessões',
    emoji: '🗄️',
    nivel: 'B1',
    onde: 'A entrevista pede onde ficam as sessões.',
    rodadas: [
      fala(
        'Guarda',
        'Where do the sessions live?',
        'Onde as sessões ficam?',
        'Diga que guardaria as sessões no Redis.',
        'I would keep the sessions in Redis.',
        [
          'i would keep the sessions in redis',
          'i would store the sessions in redis',
          'i would keep sessions in redis'
        ],
        'Keep é guardar. Redis é o cache rápido.'
      ),
      fala(
        'Fonte',
        'What if Redis is empty?',
        'E se o Redis estiver vazio?',
        'Diga que o Postgres continua sendo a fonte da verdade.',
        'Postgres stays the source of truth.',
        [
          'postgres stays the source of truth',
          'postgres remains the source of truth',
          'postgres is still the source of truth'
        ],
        'Source of truth é a fonte da verdade. Stays é continua.'
      )
    ]
  },
  {
    id: 'trinta',
    titulo: 'Trinta segundos',
    emoji: '🗄️',
    nivel: 'B2',
    onde: 'A entrevista pede um cache curto para o feed.',
    rodadas: [
      fala(
        'Guarda',
        'How fresh should the feed be?',
        'Quão fresco o feed precisa estar?',
        'Diga que guardaria este feed por 30 segundos.',
        'I would cache this feed for 30 seconds.',
        [
          'i would cache this feed for 30 seconds',
          'i would cache this feed for thirty seconds',
          'i would cache the feed for 30 seconds'
        ],
        'Cache guarda a resposta pronta. 30 seconds são trinta segundos.'
      ),
      fala(
        'Fonte',
        'What happens on a miss?',
        'O que acontece quando não está no cache?',
        'Diga que uma falta lê a linha no Postgres.',
        'A miss reads the row from Postgres.',
        [
          'a miss reads the row from postgres',
          'a cache miss reads the row from postgres',
          'on a miss we read the row from postgres'
        ],
        'A miss é quando o cache não tem. Row é a linha.'
      )
    ]
  },
  {
    id: 'pedidos',
    titulo: 'A busca',
    emoji: '🗄️',
    nivel: 'B1',
    onde: 'A entrevista separa busca e pedidos.',
    rodadas: [
      fala(
        'Guarda',
        'Where does search live?',
        'Onde a busca fica?',
        'Diga que colocaria a busca num armazenamento próprio.',
        'I would put search in its own store.',
        [
          'i would put search in its own store',
          'i would put the search in its own store',
          'i would keep search in its own store'
        ],
        'Its own store é um armazenamento só da busca.'
      ),
      fala(
        'Fonte',
        'Where do the orders stay?',
        'Onde os pedidos continuam?',
        'Diga que os pedidos ficam no banco principal.',
        'Orders stay in the main database.',
        [
          'orders stay in the main database',
          'the orders stay in the main database',
          'orders remain in the main database'
        ],
        'Orders são os pedidos. Main database é o banco principal.'
      )
    ]
  }
];

export const RECUSAS = [
  {
    id: 'agora',
    titulo: 'Hoje não',
    emoji: '🙅',
    nivel: 'A2',
    onde: 'Alguém pede para você pegar isso hoje.',
    rodadas: [
      fala(
        'Não',
        'Can you take this today?',
        'Você pega isso hoje?',
        'Diga que não consegue pegar isso hoje.',
        "I can't take this on today.",
        [
          'i cannot take this on today',
          'i cannot take this today',
          'i cannot do this today'
        ],
        "I can't recusa com educação. Today é hoje."
      ),
      fala(
        'Caminho',
        'When could you start?',
        'Quando você consegue começar?',
        'Diga que consegue começar amanhã de manhã.',
        'I can start it tomorrow morning.',
        [
          'i can start it tomorrow morning',
          'i can start this tomorrow morning',
          'i can begin it tomorrow morning'
        ],
        'Tomorrow morning é amanhã de manhã. É o outro caminho.'
      )
    ]
  },
  {
    id: 'depois',
    titulo: 'Na próxima',
    emoji: '🙅',
    nivel: 'B1',
    onde: 'O pedido não cabe nesta entrega.',
    rodadas: [
      fala(
        'Não',
        'Can we add this to the release?',
        'Dá para colocar isso nesta entrega?',
        'Diga que não consegue acrescentar isso nesta entrega.',
        "I can't add that to this release.",
        [
          'i cannot add that to this release',
          'i cannot add this to this release',
          'i cannot add that to the release'
        ],
        'This release é esta entrega. Add é acrescentar.'
      ),
      fala(
        'Caminho',
        'Where can it go instead?',
        'Para onde isso pode ir?',
        'Diga que consegue agendar para a próxima.',
        'I can schedule it for the next one.',
        [
          'i can schedule it for the next one',
          'i can schedule this for the next one',
          'i can put it in the next one'
        ],
        'Schedule é agendar. The next one é a próxima entrega.'
      )
    ]
  },
  {
    id: 'escrito',
    titulo: 'Por escrito',
    emoji: '🙅',
    nivel: 'B1',
    onde: 'A reunião não cabe na sua tarde.',
    rodadas: [
      fala(
        'Não',
        'Can you join the meeting?',
        'Você entra na reunião?',
        'Diga que não consegue entrar nessa reunião.',
        "I can't join that meeting.",
        [
          'i cannot join that meeting',
          'i cannot join this meeting',
          'i cannot attend that meeting'
        ],
        'Join é entrar. That meeting é essa reunião.'
      ),
      fala(
        'Caminho',
        'How will you follow along?',
        'Como você acompanha?',
        'Diga que consegue mandar um recado depois que eles se reunirem.',
        'I can send notes after you meet.',
        [
          'i can send notes after you meet',
          'i can send a note after you meet',
          'i can send notes after the meeting'
        ],
        'Notes é um recado escrito. After you meet é depois da reunião.'
      )
    ]
  }
];

export function narraPorId(id) {
  return NARRAS.find(c => c.id === id) ?? null;
}

export function bancoPorId(id) {
  return BANCOS.find(c => c.id === id) ?? null;
}

export function recusaPorId(id) {
  return RECUSAS.find(c => c.id === id) ?? null;
}

export function avaliarNarra(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBanco(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRecusa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
