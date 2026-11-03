// Mesa da retro, migração e o primeiro dia num time novo.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const MESAS = [
  {
    id: 'teto',
    titulo: 'O teto da fila',
    emoji: '📝',
    nivel: 'B1',
    onde: 'A fila de review passou de dois dias.',
    rodadas: [
      fala(
        'Fato',
        'What did we notice?',
        'O que a gente notou?',
        'Diga que as reviews ficaram dois dias paradas.',
        'The reviews sat for two days.',
        [
          'the reviews sat for two days',
          'the reviews sat for 2 days',
          'reviews sat for two days'
        ],
        'Sat for é ficou parado. Two days são dois dias.'
      ),
      fala(
        'Ajuste',
        'What should change?',
        'O que muda?',
        'Diga que vocês vão limitar a fila em cinco.',
        'We will cap the queue at five.',
        [
          'we will cap the queue at five',
          'we will cap the queue at 5',
          'we will limit the queue to five'
        ],
        'Cap the queue é limitar a fila. Five é cinco.'
      ),
      fala(
        'Dono',
        'Who will watch it?',
        'Quem fica de olho?',
        'Diga que você olha a fila nesta semana.',
        'I will watch the queue this week.',
        [
          'i will watch the queue this week',
          'i will watch the review queue this week',
          'i can watch the queue this week'
        ],
        'Watch the queue é olhar a fila. This week é esta semana.'
      )
    ]
  },
  {
    id: 'quinta',
    titulo: 'Sem sexta',
    emoji: '📝',
    nivel: 'B2',
    onde: 'O time parou de entregar na sexta.',
    rodadas: [
      fala(
        'Fato',
        'What changed about Friday?',
        'O que mudou na sexta?',
        'Diga que vocês pararam o deploy de sexta.',
        'We stopped the Friday deploy.',
        [
          'we stopped the friday deploy',
          'we stopped friday deploys',
          'we stopped the friday release'
        ],
        'Stopped é paramos. Friday deploy é a entrega de sexta.'
      ),
      fala(
        'Ajuste',
        'When do we ship instead?',
        'Quando a gente entrega no lugar?',
        'Diga que vocês entregam na quinta.',
        'We will ship on Thursday instead.',
        [
          'we will ship on thursday instead',
          'we will ship on thursday',
          'we will release on thursday instead'
        ],
        'Thursday é quinta. Instead é no lugar disso.'
      ),
      fala(
        'Dono',
        'Who writes the rule?',
        'Quem escreve a regra?',
        'Diga que você escreve a regra no documento do time.',
        'I will write that rule in the team doc.',
        [
          'i will write that rule in the team doc',
          'i will write the rule in the team doc',
          'i will add that rule to the team doc'
        ],
        'Team doc é o documento do time. Rule é a regra.'
      )
    ]
  },
  {
    id: 'noturno',
    titulo: 'O job da noite',
    emoji: '📝',
    nivel: 'B1',
    onde: 'Ninguém cuidava do job que roda de noite.',
    rodadas: [
      fala(
        'Fato',
        'What was missing?',
        'O que faltava?',
        'Diga que ninguém era dono do job da noite.',
        'Nobody owned the nightly job.',
        [
          'nobody owned the nightly job',
          'no one owned the nightly job',
          'nobody owned the night job'
        ],
        'Owned é era dono. Nightly job é o trabalho da noite.'
      ),
      fala(
        'Ajuste',
        'How do we fix the ownership?',
        'Como a gente resolve o dono?',
        'Diga que cada job passa a ter um dono.',
        'We will name one owner per job.',
        [
          'we will name one owner per job',
          'we will name one owner for each job',
          'we will pick one owner per job'
        ],
        'One owner é um dono. Per job é por trabalho.'
      ),
      fala(
        'Dono',
        'Who takes this one?',
        'Quem fica com este?',
        'Diga que você fica com o job da noite.',
        'I will take the nightly job.',
        [
          'i will take the nightly job',
          'i will own the nightly job',
          'i can take the nightly job'
        ],
        'Take é ficar com. The nightly job é o da noite.'
      )
    ]
  }
];

export const MIGRAS = [
  {
    id: 'contas',
    titulo: 'As contas',
    emoji: '🚚',
    nivel: 'B1',
    onde: 'As contas vão para outro banco.',
    rodadas: [
      fala(
        'Mudança',
        'What is moving?',
        'O que está mudando de lugar?',
        'Diga que vocês vão mover as contas para o banco novo.',
        'We will move the accounts to the new database.',
        [
          'we will move the accounts to the new database',
          'we will move the accounts to a new database',
          'we will move accounts to the new database'
        ],
        'Move é mudar de lugar. Database é o banco.'
      ),
      fala(
        'Risco',
        'What is the risk?',
        'Qual é o risco?',
        'Diga que o risco é um tempo curto com duas cópias.',
        'The risk is a short time with two copies.',
        [
          'the risk is a short time with two copies',
          'the risk is a short time with 2 copies',
          'the risk is a brief time with two copies'
        ],
        'Risk é o risco. Two copies são duas cópias.'
      )
    ]
  },
  {
    id: 'biblioteca',
    titulo: 'A biblioteca',
    emoji: '🚚',
    nivel: 'B2',
    onde: 'O time vai sair da biblioteca antiga.',
    rodadas: [
      fala(
        'Mudança',
        'What are you leaving behind?',
        'O que vocês estão deixando?',
        'Diga que vocês saem da biblioteca antiga neste trimestre.',
        'We will leave the old library this quarter.',
        [
          'we will leave the old library this quarter',
          'we are leaving the old library this quarter',
          'we will drop the old library this quarter'
        ],
        'Library é a biblioteca. This quarter é este trimestre.'
      ),
      fala(
        'Risco',
        'What could look wrong?',
        'O que pode parecer errado?',
        'Diga que o risco é uma tela que fica diferente.',
        'The risk is a screen that looks different.',
        [
          'the risk is a screen that looks different',
          'the risk is a page that looks different',
          'the risk is a screen that looks different from today'
        ],
        'Looks different é fica diferente. Screen é a tela.'
      )
    ]
  },
  {
    id: 'coluna',
    titulo: 'A coluna',
    emoji: '🚚',
    nivel: 'B1',
    onde: 'A coluna de data muda no domingo.',
    rodadas: [
      fala(
        'Mudança',
        'When does the column change?',
        'Quando a coluna muda?',
        'Diga que vocês mudam a coluna de data no domingo.',
        'We will change the date column on Sunday.',
        [
          'we will change the date column on sunday',
          'we will change the date column this sunday',
          'we will update the date column on sunday'
        ],
        'Date column é a coluna de data. Sunday é domingo.'
      ),
      fala(
        'Risco',
        'What might break?',
        'O que pode quebrar?',
        'Diga que o risco é um relatório que lê o formato antigo.',
        'The risk is a report that reads the old shape.',
        [
          'the risk is a report that reads the old shape',
          'the risk is a report that reads the old format',
          'the risk is a report that still reads the old shape'
        ],
        'Report é o relatório. Old shape é o formato antigo.'
      )
    ]
  }
];

export const ESTREIAS = [
  {
    id: 'cozinha',
    titulo: 'A cozinha',
    emoji: '👋',
    nivel: 'A2',
    onde: 'Primeiro dia. Você ainda não achou a cozinha.',
    rodadas: [
      fala(
        'Oi',
        'Are you new here?',
        'Você é novo aqui?',
        'Diga que você entrou no time hoje.',
        'I just joined the team today.',
        [
          'i just joined the team today',
          'i joined the team today',
          'i just joined this team today'
        ],
        'Joined é entrou. Today é hoje.'
      ),
      fala(
        'Pedido',
        'Do you need anything?',
        'Você precisa de alguma coisa?',
        'Peça para a pessoa mostrar a cozinha.',
        'Could you show me the kitchen?',
        [
          'could you show me the kitchen',
          'can you show me the kitchen',
          'could you show me where the kitchen is'
        ],
        'Show me é me mostra. Kitchen é a cozinha.'
      )
    ]
  },
  {
    id: 'lanche',
    titulo: 'O almoço',
    emoji: '👋',
    nivel: 'A2',
    onde: 'A mesa do almoço ainda tem um lugar.',
    rodadas: [
      fala(
        'Oi',
        'Looking for a seat?',
        'Procurando um lugar?',
        'Pergunte se o lugar está livre.',
        'Is this seat free?',
        [
          'is this seat free',
          'is this seat open',
          'is that seat free'
        ],
        'Seat é o lugar. Free é livre.'
      ),
      fala(
        'Pedido',
        'You can sit here.',
        'Pode sentar aqui.',
        'Peça para almoçar junto.',
        'May I have lunch with you?',
        [
          'may i have lunch with you',
          'can i have lunch with you',
          'may i eat lunch with you'
        ],
        'May I pede licença. Lunch é o almoço.'
      )
    ]
  },
  {
    id: 'nomes',
    titulo: 'Os nomes',
    emoji: '👋',
    nivel: 'B1',
    onde: 'Você ainda está aprendendo os nomes do time.',
    rodadas: [
      fala(
        'Oi',
        'How is the first day?',
        'Como está o primeiro dia?',
        'Diga que ainda está aprendendo os nomes.',
        'I am still learning the names.',
        [
          'i am still learning the names',
          'i am still learning names',
          'i am still learning everyones names'
        ],
        'Still é ainda. Names são os nomes.'
      ),
      fala(
        'Pedido',
        'Nice to meet you.',
        'Prazer em te conhecer.',
        'Peça para a pessoa repetir o nome.',
        'Could you remind me of your name?',
        [
          'could you remind me of your name',
          'can you remind me of your name',
          'could you tell me your name again'
        ],
        'Remind me é me lembra. Your name é o seu nome.'
      )
    ]
  }
];

export function mesaPorId(id) {
  return MESAS.find(c => c.id === id) ?? null;
}

export function migraPorId(id) {
  return MIGRAS.find(c => c.id === id) ?? null;
}

export function estreiaPorId(id) {
  return ESTREIAS.find(c => c.id === id) ?? null;
}

export function avaliarMesa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMigra(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEstreia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
