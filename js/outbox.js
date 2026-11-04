// Outbox que espera fora, inbox que recebe a vez e relay que repassa.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const OUTBOXES = [
  {
    id: 'outboxuma',
    titulo: 'Uso do outbox',
    emoji: '📤',
    nivel: 'A2',
    onde: 'A mensagem espera fora antes de sair.',
    rodadas: [
      fala(
        'Entra',
        'Where does the message wait?',
        'Onde a mensagem espera?',
        'Diga que a mensagem espera fora antes de sair.',
        'The message waits outside before it leaves.',
        [
          'the message waits outside before it leaves',
          'that message waits outside before it leaves'
        ],
        'Waits outside é espera fora.'
      ),
      fala(
        'Segue',
        'What should the message do?',
        'O que a mensagem deve fazer?',
        'Peça para esperar fora antes de sair.',
        'Please wait outside before leaving.',
        ['please wait outside before leaving', 'wait outside before leaving'],
        'Before leaving é antes de sair.'
      )
    ]
  },
  {
    id: 'outbox2',
    titulo: 'Outbox dois',
    emoji: '📤',
    nivel: 'B1',
    onde: 'O outbox cobriu duas mensagens.',
    rodadas: [
      fala(
        'Entra',
        'How many messages did the outbox cover?',
        'Quantas mensagens o outbox cobriu?',
        'Diga que o outbox cobriu duas mensagens.',
        'The outbox covered two messages.',
        [
          'the outbox covered two messages',
          'the outbox covered 2 messages',
          'that outbox covered two messages'
        ],
        'Two messages é duas mensagens.'
      ),
      fala(
        'Segue',
        'Where should we cap the messages?',
        'Onde a gente limita as mensagens?',
        'Peça para cobrir duas mensagens.',
        'Please cover two messages.',
        ['please cover two messages', 'please cover 2 messages', 'cover two messages'],
        'Cover two messages é cobrir duas mensagens.'
      )
    ]
  },
  {
    id: 'outboxok',
    titulo: 'Outbox no alvo',
    emoji: '📤',
    nivel: 'B1',
    onde: 'O outbox pode ficar.',
    rodadas: [
      fala(
        'Entra',
        'Can the outbox stay?',
        'O outbox pode ficar?',
        'Diga que o outbox pode ficar.',
        'The outbox can stay.',
        ['the outbox can stay', 'that outbox can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this outbox stay quiet?',
        'Este outbox pode ficar quieto?',
        'Diga que este outbox pode ficar quieto.',
        'This outbox can stay quiet.',
        ['this outbox can stay quiet', 'that outbox can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const INBOXES = [
  {
    id: 'inboxbase',
    titulo: 'Chegada do inbox',
    emoji: '📥',
    nivel: 'A2',
    onde: 'A mensagem entra e espera a sua vez.',
    rodadas: [
      fala(
        'Recebe',
        'What does the message do when it arrives?',
        'O que a mensagem faz quando chega?',
        'Diga que a mensagem entra e espera a sua vez.',
        'The message arrives and waits for its turn.',
        [
          'the message arrives and waits for its turn',
          'that message arrives and waits for its turn'
        ],
        'Its turn é a sua vez.'
      ),
      fala(
        'Segue',
        'What should the message do?',
        'O que a mensagem deve fazer?',
        'Peça para esperar a próxima vez.',
        'Please wait for the next turn.',
        ['please wait for the next turn', 'wait for the next turn'],
        'The next turn é a próxima vez.'
      )
    ]
  },
  {
    id: 'inbox3',
    titulo: 'Inbox três',
    emoji: '📥',
    nivel: 'B1',
    onde: 'O inbox cobriu três mensagens.',
    rodadas: [
      fala(
        'Recebe',
        'How many messages did the inbox cover?',
        'Quantas mensagens o inbox cobriu?',
        'Diga que o inbox cobriu três mensagens.',
        'The inbox covered three messages.',
        [
          'the inbox covered three messages',
          'the inbox covered 3 messages',
          'that inbox covered three messages'
        ],
        'Three messages é três mensagens.'
      ),
      fala(
        'Segue',
        'Where should we cap the messages?',
        'Onde a gente limita as mensagens?',
        'Peça para cobrir três mensagens.',
        'Please cover three messages.',
        ['please cover three messages', 'please cover 3 messages', 'cover three messages'],
        'Cover three messages é cobrir três mensagens.'
      )
    ]
  },
  {
    id: 'inboxok',
    titulo: 'Inbox no alvo',
    emoji: '📥',
    nivel: 'B1',
    onde: 'O inbox pode ficar.',
    rodadas: [
      fala(
        'Recebe',
        'Can the inbox stay?',
        'O inbox pode ficar?',
        'Diga que o inbox pode ficar.',
        'The inbox can stay.',
        ['the inbox can stay', 'that inbox can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this inbox stay quiet?',
        'Este inbox pode ficar quieto?',
        'Diga que este inbox pode ficar quieto.',
        'This inbox can stay quiet.',
        ['this inbox can stay quiet', 'that inbox can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const RELAYS = [
  {
    id: 'relaybase',
    titulo: 'Posto do relay',
    emoji: '📮',
    nivel: 'A2',
    onde: 'O posto repassa a mensagem adiante.',
    rodadas: [
      fala(
        'Repassa',
        'What does the post do with the message?',
        'O que o posto faz com a mensagem?',
        'Diga que o posto repassa a mensagem adiante.',
        'The post passes the message forward.',
        [
          'the post passes the message forward',
          'that post passes the message forward'
        ],
        'Passes forward é repassa adiante.'
      ),
      fala(
        'Segue',
        'What should the post do?',
        'O que o posto deve fazer?',
        'Peça para repassar a mensagem adiante.',
        'Please pass the message forward.',
        ['please pass the message forward', 'pass the message forward'],
        'Pass forward é repassar adiante.'
      )
    ]
  },
  {
    id: 'relay4',
    titulo: 'Relay quatro',
    emoji: '📮',
    nivel: 'B1',
    onde: 'O relay encaminhou quatro mensagens.',
    rodadas: [
      fala(
        'Repassa',
        'How many messages did the relay forward?',
        'Quantas mensagens o relay encaminhou?',
        'Diga que o relay encaminhou quatro mensagens.',
        'The relay forwarded four messages.',
        [
          'the relay forwarded four messages',
          'the relay forwarded 4 messages',
          'that relay forwarded four messages'
        ],
        'Four messages é quatro mensagens.'
      ),
      fala(
        'Segue',
        'Where should we cap the messages?',
        'Onde a gente limita as mensagens?',
        'Peça para encaminhar quatro mensagens.',
        'Please forward four messages.',
        ['please forward four messages', 'please forward 4 messages', 'forward four messages'],
        'Forward four messages é encaminhar quatro mensagens.'
      )
    ]
  },
  {
    id: 'relayok',
    titulo: 'Relay no alvo',
    emoji: '📮',
    nivel: 'B1',
    onde: 'O relay pode ficar.',
    rodadas: [
      fala(
        'Repassa',
        'Can the relay stay?',
        'O relay pode ficar?',
        'Diga que o relay pode ficar.',
        'The relay can stay.',
        ['the relay can stay', 'that relay can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this relay stay quiet?',
        'Este relay pode ficar quieto?',
        'Diga que este relay pode ficar quieto.',
        'This relay can stay quiet.',
        ['this relay can stay quiet', 'that relay can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function outboxPorId(id) {
  return OUTBOXES.find(c => c.id === id) ?? null;
}

export function inboxPorId(id) {
  return INBOXES.find(c => c.id === id) ?? null;
}

export function relayPorId(id) {
  return RELAYS.find(c => c.id === id) ?? null;
}

export function avaliarOutbox(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarInbox(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRelay(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
