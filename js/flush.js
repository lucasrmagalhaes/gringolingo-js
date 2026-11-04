// Flush que desce a memória, memtable que guarda a linha e extent que junta as páginas.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const FLUSHES = [
  {
    id: 'flushbase',
    titulo: 'Desce do flush',
    emoji: '🚰',
    nivel: 'A2',
    onde: 'O flush desce a memória.',
    rodadas: [
      fala(
        'Desce',
        'What does the flush write?',
        'O que o flush desce?',
        'Diga que o flush desce a memória.',
        'The flush writes the memory.',
        [
          'the flush writes the memory',
          'that flush writes the memory'
        ],
        'The memory é a memória.'
      ),
      fala(
        'Segue',
        'What should the flush do with the memory?',
        'O que o flush deve fazer com a memória?',
        'Peça para descer a memória.',
        'Please write the memory.',
        [
          'please write the memory',
          'write the memory'
        ],
        'Write the memory é descer a memória.'
      )
    ]
  },
  {
    id: 'flush2',
    titulo: 'Flush dois',
    emoji: '🚰',
    nivel: 'B1',
    onde: 'O flush desceu duas linhas.',
    rodadas: [
      fala(
        'Desce',
        'How many rows did the flush write?',
        'Quantas linhas o flush desceu?',
        'Diga que o flush desceu duas linhas.',
        'The flush wrote two rows.',
        [
          'the flush wrote two rows',
          'the flush wrote 2 rows',
          'that flush wrote two rows'
        ],
        'Two rows é duas linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para descer duas linhas.',
        'Please write two rows.',
        ['please write two rows', 'please write 2 rows', 'write two rows'],
        'Write two rows é descer duas linhas.'
      )
    ]
  },
  {
    id: 'flushok',
    titulo: 'Flush no alvo',
    emoji: '🚰',
    nivel: 'B1',
    onde: 'O flush pode ficar.',
    rodadas: [
      fala(
        'Desce',
        'Can the flush stay?',
        'O flush pode ficar?',
        'Diga que o flush pode ficar.',
        'The flush can stay.',
        ['the flush can stay', 'that flush can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this flush stay quiet?',
        'Este flush pode ficar quieto?',
        'Diga que este flush pode ficar quieto.',
        'This flush can stay quiet.',
        ['this flush can stay quiet', 'that flush can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const MEMTABLES = [
  {
    id: 'memtablebase',
    titulo: 'Guarda da memtable',
    emoji: '📥',
    nivel: 'A2',
    onde: 'A memtable guarda a linha.',
    rodadas: [
      fala(
        'Guarda',
        'What does the memtable hold?',
        'O que a memtable guarda?',
        'Diga que a memtable guarda a linha.',
        'The memtable holds the row.',
        [
          'the memtable holds the row',
          'that memtable holds the row'
        ],
        'The row é a linha.'
      ),
      fala(
        'Segue',
        'What should the memtable do with the row?',
        'O que a memtable deve fazer com a linha?',
        'Peça para guardar a linha.',
        'Please hold the row.',
        [
          'please hold the row',
          'hold the row'
        ],
        'Hold the row é guardar a linha.'
      )
    ]
  },
  {
    id: 'memtable3',
    titulo: 'Memtable três',
    emoji: '📥',
    nivel: 'B1',
    onde: 'A memtable guardou três linhas.',
    rodadas: [
      fala(
        'Guarda',
        'How many rows did the memtable hold?',
        'Quantas linhas a memtable guardou?',
        'Diga que a memtable guardou três linhas.',
        'The memtable held three rows.',
        [
          'the memtable held three rows',
          'the memtable held 3 rows',
          'that memtable held three rows'
        ],
        'Three rows é três linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para guardar três linhas.',
        'Please hold three rows.',
        ['please hold three rows', 'please hold 3 rows', 'hold three rows'],
        'Hold three rows é guardar três linhas.'
      )
    ]
  },
  {
    id: 'memtableok',
    titulo: 'Memtable no alvo',
    emoji: '📥',
    nivel: 'B1',
    onde: 'A memtable pode ficar.',
    rodadas: [
      fala(
        'Guarda',
        'Can the memtable stay?',
        'A memtable pode ficar?',
        'Diga que a memtable pode ficar.',
        'The memtable can stay.',
        ['the memtable can stay', 'that memtable can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this memtable stay quiet?',
        'Esta memtable pode ficar quieta?',
        'Diga que esta memtable pode ficar quieta.',
        'This memtable can stay quiet.',
        ['this memtable can stay quiet', 'that memtable can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const EXTENTS = [
  {
    id: 'extentbase',
    titulo: 'Junta do extent',
    emoji: '📚',
    nivel: 'A2',
    onde: 'O extent junta as páginas.',
    rodadas: [
      fala(
        'Junta',
        'What does the extent store?',
        'O que o extent junta?',
        'Diga que o extent junta as páginas.',
        'The extent stores the page.',
        [
          'the extent stores the page',
          'that extent stores the page'
        ],
        'The page é a página.'
      ),
      fala(
        'Segue',
        'What should the extent do with the page?',
        'O que o extent deve fazer com a página?',
        'Peça para juntar a página.',
        'Please store the page.',
        [
          'please store the page',
          'store the page'
        ],
        'Store the page é juntar a página.'
      )
    ]
  },
  {
    id: 'extent4',
    titulo: 'Extent quatro',
    emoji: '📚',
    nivel: 'B1',
    onde: 'O extent juntou quatro páginas.',
    rodadas: [
      fala(
        'Junta',
        'How many pages did the extent store?',
        'Quantas páginas o extent juntou?',
        'Diga que o extent juntou quatro páginas.',
        'The extent stored four pages.',
        [
          'the extent stored four pages',
          'the extent stored 4 pages',
          'that extent stored four pages'
        ],
        'Four pages é quatro páginas.'
      ),
      fala(
        'Segue',
        'Where should we cap the pages?',
        'Onde a gente limita as páginas?',
        'Peça para juntar quatro páginas.',
        'Please store four pages.',
        ['please store four pages', 'please store 4 pages', 'store four pages'],
        'Store four pages é juntar quatro páginas.'
      )
    ]
  },
  {
    id: 'extentok',
    titulo: 'Extent no alvo',
    emoji: '📚',
    nivel: 'B1',
    onde: 'O extent pode ficar.',
    rodadas: [
      fala(
        'Junta',
        'Can the extent stay?',
        'O extent pode ficar?',
        'Diga que o extent pode ficar.',
        'The extent can stay.',
        ['the extent can stay', 'that extent can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this extent stay quiet?',
        'Este extent pode ficar quieto?',
        'Diga que este extent pode ficar quieto.',
        'This extent can stay quiet.',
        ['this extent can stay quiet', 'that extent can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function flushPorId(id) {
  return FLUSHES.find(c => c.id === id) ?? null;
}

export function memtablePorId(id) {
  return MEMTABLES.find(c => c.id === id) ?? null;
}

export function extentPorId(id) {
  return EXTENTS.find(c => c.id === id) ?? null;
}

export function avaliarFlush(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMemtable(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarExtent(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
