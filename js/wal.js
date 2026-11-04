// Wal que grava o log antes, lsn que só avança e checkpoint que marca um ponto seguro.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const WALS = [
  {
    id: 'logantes',
    titulo: 'Log do wal',
    emoji: '🪵',
    nivel: 'A2',
    onde: 'A escrita entra no log antes da tabela.',
    rodadas: [
      fala(
        'Grava',
        'Where does the write go first?',
        'Para onde a escrita vai primeiro?',
        'Diga que a escrita chega ao log antes da tabela.',
        'The write hits the log before the table.',
        [
          'the write hits the log before the table',
          'that write hits the log before the table'
        ],
        'Before the table é antes da tabela.'
      ),
      fala(
        'Segue',
        'What should the write do?',
        'O que a escrita deve fazer?',
        'Peça para gravar o log antes da tabela.',
        'Please write the log before the table.',
        ['please write the log before the table', 'write the log before the table'],
        'Write the log é gravar o log.'
      )
    ]
  },
  {
    id: 'wal2',
    titulo: 'Wal dois',
    emoji: '🪵',
    nivel: 'B1',
    onde: 'O log guardou duas escritas.',
    rodadas: [
      fala(
        'Grava',
        'How many writes did the log store?',
        'Quantas escritas o log guardou?',
        'Diga que o log guardou duas escritas.',
        'The log stored two writes.',
        [
          'the log stored two writes',
          'the log stored 2 writes',
          'that log stored two writes'
        ],
        'Two writes é duas escritas.'
      ),
      fala(
        'Segue',
        'Where should we cap the writes?',
        'Onde a gente limita as escritas?',
        'Peça para guardar duas escritas.',
        'Please store two writes.',
        [
          'please store two writes',
          'please store 2 writes',
          'store two writes'
        ],
        'Store two writes é guardar duas escritas.'
      )
    ]
  },
  {
    id: 'walok',
    titulo: 'Wal no alvo',
    emoji: '🪵',
    nivel: 'B1',
    onde: 'O log pode ficar.',
    rodadas: [
      fala(
        'Grava',
        'Can the log stay?',
        'O log pode ficar?',
        'Diga que o log pode ficar.',
        'The log can stay.',
        ['the log can stay', 'that log can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this log stay quiet?',
        'Este log pode ficar quieto?',
        'Diga que este log pode ficar quieto.',
        'This log can stay quiet.',
        ['this log can stay quiet', 'that log can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const LSNS = [
  {
    id: 'numerolsn',
    titulo: 'Número do lsn',
    emoji: '🧷',
    nivel: 'A2',
    onde: 'O número do registro só avança.',
    rodadas: [
      fala(
        'Numera',
        'Which way does the record number move?',
        'Para que lado o número do registro anda?',
        'Diga que o número do registro só anda para a frente.',
        'The record number only moves forward.',
        [
          'the record number only moves forward',
          'that record number only moves forward'
        ],
        'Moves forward é anda para a frente.'
      ),
      fala(
        'Segue',
        'What should the record number do?',
        'O que o número do registro deve fazer?',
        'Peça para andar o número para a frente.',
        'Please move the record number forward.',
        ['please move the record number forward', 'move the record number forward'],
        'Move forward é andar para a frente.'
      )
    ]
  },
  {
    id: 'lsn3',
    titulo: 'Lsn três',
    emoji: '🧷',
    nivel: 'B1',
    onde: 'O número subiu três passos.',
    rodadas: [
      fala(
        'Numera',
        'How many steps did the number climb?',
        'Quantos passos o número subiu?',
        'Diga que o número subiu três passos.',
        'The number climbed three steps.',
        [
          'the number climbed three steps',
          'the number climbed 3 steps',
          'that number climbed three steps'
        ],
        'Three steps é três passos.'
      ),
      fala(
        'Segue',
        'Where should we cap the steps?',
        'Onde a gente limita os passos?',
        'Peça para subir três passos.',
        'Please climb three steps.',
        [
          'please climb three steps',
          'please climb 3 steps',
          'climb three steps'
        ],
        'Climb three steps é subir três passos.'
      )
    ]
  },
  {
    id: 'lsnok',
    titulo: 'Lsn no alvo',
    emoji: '🧷',
    nivel: 'B1',
    onde: 'O número pode ficar.',
    rodadas: [
      fala(
        'Numera',
        'Can the record number stay?',
        'O número do registro pode ficar?',
        'Diga que o número do registro pode ficar.',
        'The record number can stay.',
        ['the record number can stay', 'that record number can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this record number stay quiet?',
        'Este número pode ficar quieto?',
        'Diga que este número pode ficar quieto.',
        'This record number can stay quiet.',
        ['this record number can stay quiet', 'that record number can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const CHECKPOINTS = [
  {
    id: 'pontocheck',
    titulo: 'Ponto do checkpoint',
    emoji: '📍',
    nivel: 'A2',
    onde: 'O marco grava um ponto seguro.',
    rodadas: [
      fala(
        'Marca',
        'What does the checkpoint store?',
        'O que o checkpoint grava?',
        'Diga que o checkpoint grava um ponto seguro.',
        'The checkpoint stores a safe point.',
        [
          'the checkpoint stores a safe point',
          'that checkpoint stores a safe point'
        ],
        'Safe point é ponto seguro.'
      ),
      fala(
        'Fecha',
        'What should the checkpoint do?',
        'O que o checkpoint deve fazer?',
        'Peça para gravar um ponto seguro.',
        'Please store a safe point.',
        ['please store a safe point', 'store a safe point'],
        'Store a safe point é gravar um ponto seguro.'
      )
    ]
  },
  {
    id: 'checkpoint4',
    titulo: 'Checkpoint quatro',
    emoji: '📍',
    nivel: 'B1',
    onde: 'O marco cobriu quatro registros.',
    rodadas: [
      fala(
        'Marca',
        'How many records did the checkpoint cover?',
        'Quantos registros o checkpoint cobriu?',
        'Diga que o checkpoint cobriu quatro registros.',
        'The checkpoint covered four records.',
        [
          'the checkpoint covered four records',
          'the checkpoint covered 4 records',
          'that checkpoint covered four records'
        ],
        'Four records é quatro registros.'
      ),
      fala(
        'Fecha',
        'Where should we cap the records?',
        'Onde a gente limita os registros?',
        'Peça para cobrir quatro registros.',
        'Please cover four records.',
        [
          'please cover four records',
          'please cover 4 records',
          'cover four records'
        ],
        'Cover four records é cobrir quatro registros.'
      )
    ]
  },
  {
    id: 'checkpointok',
    titulo: 'Checkpoint no alvo',
    emoji: '📍',
    nivel: 'B1',
    onde: 'O checkpoint pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the checkpoint stay?',
        'O checkpoint pode ficar?',
        'Diga que o checkpoint pode ficar.',
        'The checkpoint can stay.',
        ['the checkpoint can stay', 'that checkpoint can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this checkpoint stay quiet?',
        'Este checkpoint pode ficar quieto?',
        'Diga que este checkpoint pode ficar quieto.',
        'This checkpoint can stay quiet.',
        ['this checkpoint can stay quiet', 'that checkpoint can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function walPorId(id) {
  return WALS.find(c => c.id === id) ?? null;
}

export function lsnPorId(id) {
  return LSNS.find(c => c.id === id) ?? null;
}

export function checkpointPorId(id) {
  return CHECKPOINTS.find(c => c.id === id) ?? null;
}

export function avaliarWal(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLsn(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCheckpoint(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
