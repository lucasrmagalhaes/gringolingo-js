// Espera que estoura, página que perde o lugar e fila que passa de mil.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const ESPERAS = [
  {
    id: 'tresseg',
    titulo: 'Três segundos',
    emoji: '⏲️',
    nivel: 'A2',
    onde: 'A chamada parou depois de três segundos.',
    rodadas: [
      fala(
        'Para',
        'When did the call stop?',
        'Quando a chamada parou?',
        'Diga que a chamada parou depois de três segundos.',
        'The call stopped after three seconds.',
        ['the call stopped after three seconds', 'that call stopped after three seconds'],
        'Three seconds é três segundos.'
      ),
      fala(
        'Corta',
        'What should we cut?',
        'O que a gente corta?',
        'Peça para cortar a espera longa.',
        'Please cut the long wait.',
        ['please cut the long wait', 'cut the long wait'],
        'The long wait é a espera longa.'
      )
    ]
  },
  {
    id: 'espera3',
    titulo: 'Espera três',
    emoji: '⏲️',
    nivel: 'B1',
    onde: 'O limite disparou depois de três segundos.',
    rodadas: [
      fala(
        'Para',
        'When did the timeout fire?',
        'Quando o limite disparou?',
        'Diga que o limite disparou depois de três segundos.',
        'The timeout fired after three seconds.',
        [
          'the timeout fired after three seconds',
          'the timeout fired after 3 seconds',
          'that timeout fired after three seconds'
        ],
        'Three seconds é três segundos.'
      ),
      fala(
        'Corta',
        'Where should we cap the wait?',
        'Onde a gente limita a espera?',
        'Peça para limitar a espera em três segundos.',
        'Please cap the wait at three seconds.',
        [
          'please cap the wait at three seconds',
          'please cap the wait at 3 seconds',
          'cap the wait at three seconds'
        ],
        'Cap the wait é limitar a espera.'
      )
    ]
  },
  {
    id: 'esperaok',
    titulo: 'Espera no alvo',
    emoji: '⏲️',
    nivel: 'B1',
    onde: 'A chamada respondeu a tempo.',
    rodadas: [
      fala(
        'Para',
        'Did the call answer in time?',
        'A chamada respondeu a tempo?',
        'Diga que a chamada respondeu a tempo.',
        'The call answered in time.',
        ['the call answered in time', 'that call answered in time'],
        'In time é a tempo.'
      ),
      fala(
        'Corta',
        'Can the wait stay?',
        'A espera pode ficar?',
        'Diga que a espera pode ficar.',
        'The wait can stay.',
        ['the wait can stay', 'that wait can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const CURSORES = [
  {
    id: 'paginaseg',
    titulo: 'Página seguinte',
    emoji: '🔖',
    nivel: 'A2',
    onde: 'A página seguinte perdeu o lugar.',
    rodadas: [
      fala(
        'Lê',
        'What did the next page do?',
        'O que a página seguinte fez?',
        'Diga que a página seguinte perdeu o lugar.',
        'The next page lost its place.',
        ['the next page lost its place', 'that next page lost its place'],
        'Lost its place é perdeu o lugar.'
      ),
      fala(
        'Marca',
        'What should we mark?',
        'O que a gente marca?',
        'Peça para marcar o lugar da leitura.',
        'Please mark the reading place.',
        ['please mark the reading place', 'mark the reading place'],
        'The reading place é o lugar da leitura.'
      )
    ]
  },
  {
    id: 'cursor2',
    titulo: 'Cursor dois',
    emoji: '🔖',
    nivel: 'B1',
    onde: 'A página parou na linha dois.',
    rodadas: [
      fala(
        'Lê',
        'Where did the page stop?',
        'Onde a página parou?',
        'Diga que a página parou na linha dois.',
        'The page stopped at row two.',
        [
          'the page stopped at row two',
          'the page stopped at row 2',
          'that page stopped at row two'
        ],
        'Row two é a linha dois.'
      ),
      fala(
        'Marca',
        'Where should we cap the page?',
        'Onde a gente limita a página?',
        'Peça para limitar a página em duas linhas.',
        'Please cap the page at two rows.',
        [
          'please cap the page at two rows',
          'please cap the page at 2 rows',
          'cap the page at two rows'
        ],
        'Two rows é duas linhas.'
      )
    ]
  },
  {
    id: 'cursorok',
    titulo: 'Lugar firme',
    emoji: '🔖',
    nivel: 'B1',
    onde: 'A página seguinte achou o lugar.',
    rodadas: [
      fala(
        'Lê',
        'Did the next page find its place?',
        'A página seguinte achou o lugar?',
        'Diga que a página seguinte achou o lugar.',
        'The next page found its place.',
        ['the next page found its place', 'that next page found its place'],
        'Found its place é achou o lugar.'
      ),
      fala(
        'Marca',
        'Can the cursor stay?',
        'O cursor pode ficar?',
        'Diga que o cursor pode ficar.',
        'The cursor can stay.',
        ['the cursor can stay', 'that cursor can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const FILAS = [
  {
    id: 'milmsg',
    titulo: 'Mil mensagens',
    emoji: '📥',
    nivel: 'A2',
    onde: 'A fila passou de mil mensagens.',
    rodadas: [
      fala(
        'Enche',
        'What did the queue pass?',
        'Do que a fila passou?',
        'Diga que a fila passou de mil mensagens.',
        'The queue passed one thousand messages.',
        ['the queue passed one thousand messages', 'that queue passed one thousand messages'],
        'One thousand messages é mil mensagens.'
      ),
      fala(
        'Esvazia',
        'What should we drain?',
        'O que a gente esvazia?',
        'Peça para esvaziar a fila parada.',
        'Please drain the stuck queue.',
        ['please drain the stuck queue', 'drain the stuck queue'],
        'The stuck queue é a fila parada.'
      )
    ]
  },
  {
    id: 'fila1000',
    titulo: 'Fila mil',
    emoji: '📥',
    nivel: 'B1',
    onde: 'A fila segurou mil mensagens.',
    rodadas: [
      fala(
        'Enche',
        'How many messages did the queue hold?',
        'Quantas mensagens a fila segurou?',
        'Diga que a fila segurou mil mensagens.',
        'The queue held one thousand messages.',
        [
          'the queue held one thousand messages',
          'the queue held 1000 messages',
          'that queue held one thousand messages'
        ],
        'One thousand é mil.'
      ),
      fala(
        'Esvazia',
        'Where should we cap the queue?',
        'Onde a gente limita a fila?',
        'Peça para limitar a fila em mil mensagens.',
        'Please cap the queue at one thousand messages.',
        [
          'please cap the queue at one thousand messages',
          'please cap the queue at 1000 messages',
          'cap the queue at one thousand messages'
        ],
        'Cap the queue é limitar a fila.'
      )
    ]
  },
  {
    id: 'filaok',
    titulo: 'Fila no alvo',
    emoji: '📥',
    nivel: 'B1',
    onde: 'A fila voltou ao tamanho certo.',
    rodadas: [
      fala(
        'Enche',
        'Is the queue back on target?',
        'A fila voltou ao tamanho certo?',
        'Diga que a fila voltou ao tamanho certo.',
        'The queue is back on target.',
        ['the queue is back on target', 'that queue is back on target'],
        'On target é no tamanho certo.'
      ),
      fala(
        'Esvazia',
        'Can the readers catch up?',
        'Os leitores podem alcançar?',
        'Diga que os leitores podem alcançar.',
        'The readers can catch up.',
        ['the readers can catch up', 'those readers can catch up'],
        'Catch up é alcançar.'
      )
    ]
  }
];

export function esperaPorId(id) {
  return ESPERAS.find(c => c.id === id) ?? null;
}

export function cursorPorId(id) {
  return CURSORES.find(c => c.id === id) ?? null;
}

export function filaPorId(id) {
  return FILAS.find(c => c.id === id) ?? null;
}

export function avaliarEspera(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCursor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFila(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
