// Relógio desalinhado, eleição de líder e freio da fila.
// A lacuna da semana usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PONTEIROS = [
  {
    id: 'doisseg',
    titulo: 'Dois segundos',
    emoji: '🕰️',
    nivel: 'A2',
    onde: 'Os relógios diferem em dois segundos.',
    rodadas: [
      fala(
        'Difere',
        'What is wrong with the clocks?',
        'O que há de errado com os relógios?',
        'Diga que os relógios diferem em dois segundos.',
        'The clocks differ by two seconds.',
        [
          'the clocks differ by two seconds',
          'the clocks differ by 2 seconds',
          'those clocks differ by two seconds'
        ],
        'Differ by two seconds é diferem em dois segundos.'
      ),
      fala(
        'Alinha',
        'What should we do?',
        'O que a gente faz?',
        'Peça para alinhar os relógios.',
        'Please align the clocks.',
        [
          'please align the clocks',
          'align the clocks',
          'please align those clocks'
        ],
        'Align the clocks é alinhar os relógios.'
      )
    ]
  },
  {
    id: 'falhaassina',
    titulo: 'Assinatura falha',
    emoji: '🕰️',
    nivel: 'B1',
    onde: 'A assinatura falhou por causa do relógio.',
    rodadas: [
      fala(
        'Difere',
        'Why did the signature fail?',
        'Por que a assinatura falhou?',
        'Diga que a assinatura falhou por causa do relógio.',
        'The signature failed because of the clock.',
        [
          'the signature failed because of the clock',
          'the signature failed because of that clock',
          'that signature failed because of the clock'
        ],
        'Because of the clock é por causa do relógio.'
      ),
      fala(
        'Alinha',
        'What will you fix?',
        'O que você vai corrigir?',
        'Diga que vai alinhar os relógios.',
        'I will align the clocks.',
        [
          'i will align the clocks',
          'i will align those clocks',
          'i align the clocks'
        ],
        'Align the clocks é alinhar os relógios.'
      )
    ]
  },
  {
    id: 'relogiook',
    titulo: 'Relógios alinhados',
    emoji: '🕰️',
    nivel: 'B1',
    onde: 'Os relógios já batem.',
    rodadas: [
      fala(
        'Difere',
        'Do the clocks match now?',
        'Os relógios batem agora?',
        'Diga que os relógios batem agora.',
        'The clocks match now.',
        [
          'the clocks match now',
          'the clocks match',
          'those clocks match now'
        ],
        'Match now é batem agora.'
      ),
      fala(
        'Alinha',
        'Can the call continue?',
        'A chamada pode seguir?',
        'Diga que a chamada pode seguir.',
        'The call can continue.',
        [
          'the call can continue',
          'that call can continue',
          'the call can go on'
        ],
        'Can continue é pode seguir.'
      )
    ]
  }
];

export const ELEICOES = [
  {
    id: 'doistres',
    titulo: 'Dois de três',
    emoji: '🗳️',
    nivel: 'A2',
    onde: 'Dois de três precisam concordar.',
    rodadas: [
      fala(
        'Voto',
        'How many votes do we need?',
        'Quantos votos a gente precisa?',
        'Diga que dois de três precisam concordar.',
        'Two of three must agree.',
        [
          'two of three must agree',
          '2 of 3 must agree',
          'two of 3 must agree'
        ],
        'Two of three é dois de três.'
      ),
      fala(
        'Líder',
        'Who left?',
        'Quem saiu?',
        'Diga que o líder antigo saiu.',
        'The old leader left.',
        [
          'the old leader left',
          'that old leader left',
          'the old leader has left'
        ],
        'Old leader é o líder antigo.'
      )
    ]
  },
  {
    id: 'lidersaiu',
    titulo: 'Sem líder',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'Não há líder agora.',
    rodadas: [
      fala(
        'Voto',
        'Is there a leader now?',
        'Há líder agora?',
        'Diga que não há líder agora.',
        'There is no leader now.',
        [
          'there is no leader now',
          'there is no leader',
          'we have no leader now'
        ],
        'No leader now é sem líder agora.'
      ),
      fala(
        'Líder',
        'What do we need?',
        'O que a gente precisa?',
        'Diga que a gente precisa de dois votos.',
        'We need two votes.',
        [
          'we need two votes',
          'we need 2 votes',
          'we need those two votes'
        ],
        'Two votes é dois votos.'
      )
    ]
  },
  {
    id: 'novolider',
    titulo: 'Líder novo',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'O líder novo já assumiu.',
    rodadas: [
      fala(
        'Voto',
        'Who is the leader now?',
        'Quem é o líder agora?',
        'Diga que o líder novo já assumiu.',
        'The new leader has taken over.',
        [
          'the new leader has taken over',
          'that new leader has taken over',
          'the new leader took over'
        ],
        'Taken over é assumiu.'
      ),
      fala(
        'Líder',
        'Can the cluster serve now?',
        'O grupo pode atender agora?',
        'Diga que o grupo pode atender.',
        'The cluster can serve now.',
        [
          'the cluster can serve now',
          'that cluster can serve now',
          'the cluster can serve'
        ],
        'Can serve now é pode atender agora.'
      )
    ]
  }
];

export const FREIOS = [
  {
    id: 'filaencheu',
    titulo: 'Fila cheia',
    emoji: '🛞',
    nivel: 'A2',
    onde: 'A fila encheu.',
    rodadas: [
      fala(
        'Enche',
        'What happened to the queue?',
        'O que houve com a fila?',
        'Diga que a fila encheu.',
        'The queue is full.',
        [
          'the queue is full',
          'that queue is full',
          'the queue got full'
        ],
        'Is full é encheu.'
      ),
      fala(
        'Freia',
        'What does the producer do?',
        'O que o produtor faz?',
        'Diga que o produtor envia mais devagar.',
        'The producer sends more slowly.',
        [
          'the producer sends more slowly',
          'that producer sends more slowly',
          'the producer sends slower'
        ],
        'More slowly é mais devagar.'
      )
    ]
  },
  {
    id: 'enviadevagar',
    titulo: 'Cinquenta mensagens',
    emoji: '🛞',
    nivel: 'B1',
    onde: 'Cinquenta mensagens esperam.',
    rodadas: [
      fala(
        'Enche',
        'How many messages are waiting?',
        'Quantas mensagens esperam?',
        'Diga que cinquenta mensagens esperam.',
        'Fifty messages are waiting.',
        [
          'fifty messages are waiting',
          '50 messages are waiting',
          'fifty messages wait'
        ],
        'Fifty messages é cinquenta mensagens.'
      ),
      fala(
        'Freia',
        'What should the producer do?',
        'O que o produtor deve fazer?',
        'Peça para o produtor esperar.',
        'Please wait before sending more.',
        [
          'please wait before sending more',
          'wait before sending more',
          'please wait before you send more'
        ],
        'Wait before sending more é esperar antes de enviar mais.'
      )
    ]
  },
  {
    id: 'filavazia',
    titulo: 'Fila livre',
    emoji: '🛞',
    nivel: 'B1',
    onde: 'A fila não está cheia agora.',
    rodadas: [
      fala(
        'Enche',
        'Is the queue full now?',
        'A fila está cheia agora?',
        'Diga que a fila não está cheia agora.',
        'The queue is not full now.',
        [
          'the queue is not full now',
          'the queue is not full',
          'that queue is not full now'
        ],
        'Not full now é não está cheia agora.'
      ),
      fala(
        'Freia',
        'Can the producer speed up?',
        'O produtor pode acelerar?',
        'Diga que o produtor pode acelerar.',
        'The producer can speed up.',
        [
          'the producer can speed up',
          'that producer can speed up',
          'the producer can go faster'
        ],
        'Speed up é acelerar.'
      )
    ]
  }
];

export function ponteiroPorId(id) {
  return PONTEIROS.find(c => c.id === id) ?? null;
}

export function eleicaoPorId(id) {
  return ELEICOES.find(c => c.id === id) ?? null;
}

export function freioPorId(id) {
  return FREIOS.find(c => c.id === id) ?? null;
}

export function avaliarPonteiro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEleicao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFreio(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
