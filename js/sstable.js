// Sstable que ordena a chave, latch que segura a leitura e throttle que limita a chamada.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SSTABLES = [
  {
    id: 'sstablebase',
    titulo: 'Ordena do sstable',
    emoji: '🧱',
    nivel: 'A2',
    onde: 'O sstable ordena a chave.',
    rodadas: [
      fala(
        'Ordena',
        'What does the sstable sort?',
        'O que o sstable ordena?',
        'Diga que o sstable ordena a chave.',
        'The sstable sorts the key.',
        [
          'the sstable sorts the key',
          'that sstable sorts the key'
        ],
        'The key é a chave.'
      ),
      fala(
        'Segue',
        'What should the sstable do with the key?',
        'O que o sstable deve fazer com a chave?',
        'Peça para ordenar a chave.',
        'Please sort the key.',
        [
          'please sort the key',
          'sort the key'
        ],
        'Sort the key é ordenar a chave.'
      )
    ]
  },
  {
    id: 'sstable2',
    titulo: 'Sstable dois',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'O sstable ordenou duas chaves.',
    rodadas: [
      fala(
        'Ordena',
        'How many keys did the sstable sort?',
        'Quantas chaves o sstable ordenou?',
        'Diga que o sstable ordenou duas chaves.',
        'The sstable sorted two keys.',
        [
          'the sstable sorted two keys',
          'the sstable sorted 2 keys',
          'that sstable sorted two keys'
        ],
        'Two keys é duas chaves.'
      ),
      fala(
        'Segue',
        'Where should we cap the keys?',
        'Onde a gente limita as chaves?',
        'Peça para ordenar duas chaves.',
        'Please sort two keys.',
        ['please sort two keys', 'please sort 2 keys', 'sort two keys'],
        'Sort two keys é ordenar duas chaves.'
      )
    ]
  },
  {
    id: 'sstableok',
    titulo: 'Sstable no alvo',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'O sstable pode ficar.',
    rodadas: [
      fala(
        'Ordena',
        'Can the sstable stay?',
        'O sstable pode ficar?',
        'Diga que o sstable pode ficar.',
        'The sstable can stay.',
        ['the sstable can stay', 'that sstable can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this sstable stay quiet?',
        'Este sstable pode ficar quieto?',
        'Diga que este sstable pode ficar quieto.',
        'This sstable can stay quiet.',
        ['this sstable can stay quiet', 'that sstable can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const LATCHES = [
  {
    id: 'latchbase',
    titulo: 'Segura do latch',
    emoji: '🔒',
    nivel: 'A2',
    onde: 'O latch segura a leitura.',
    rodadas: [
      fala(
        'Segura',
        'What does the latch hold?',
        'O que o latch segura?',
        'Diga que o latch segura a leitura.',
        'The latch holds the read.',
        [
          'the latch holds the read',
          'that latch holds the read'
        ],
        'The read é a leitura.'
      ),
      fala(
        'Segue',
        'What should the latch do with the read?',
        'O que o latch deve fazer com a leitura?',
        'Peça para segurar a leitura.',
        'Please hold the read.',
        [
          'please hold the read',
          'hold the read'
        ],
        'Hold the read é segurar a leitura.'
      )
    ]
  },
  {
    id: 'latch3',
    titulo: 'Latch três',
    emoji: '🔒',
    nivel: 'B1',
    onde: 'O latch segurou três leituras.',
    rodadas: [
      fala(
        'Segura',
        'How many reads did the latch hold?',
        'Quantas leituras o latch segurou?',
        'Diga que o latch segurou três leituras.',
        'The latch held three reads.',
        [
          'the latch held three reads',
          'the latch held 3 reads',
          'that latch held three reads'
        ],
        'Three reads é três leituras.'
      ),
      fala(
        'Segue',
        'Where should we cap the reads?',
        'Onde a gente limita as leituras?',
        'Peça para segurar três leituras.',
        'Please hold three reads.',
        ['please hold three reads', 'please hold 3 reads', 'hold three reads'],
        'Hold three reads é segurar três leituras.'
      )
    ]
  },
  {
    id: 'latchok',
    titulo: 'Latch no alvo',
    emoji: '🔒',
    nivel: 'B1',
    onde: 'O latch pode ficar.',
    rodadas: [
      fala(
        'Segura',
        'Can the latch stay?',
        'O latch pode ficar?',
        'Diga que o latch pode ficar.',
        'The latch can stay.',
        ['the latch can stay', 'that latch can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this latch stay quiet?',
        'Este latch pode ficar quieto?',
        'Diga que este latch pode ficar quieto.',
        'This latch can stay quiet.',
        ['this latch can stay quiet', 'that latch can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const THROTTLES = [
  {
    id: 'throttlebase',
    titulo: 'Limita do throttle',
    emoji: '🚥',
    nivel: 'A2',
    onde: 'O throttle limita a chamada.',
    rodadas: [
      fala(
        'Limita',
        'What does the throttle limit?',
        'O que o throttle limita?',
        'Diga que o throttle limita a chamada.',
        'The throttle limits the call.',
        [
          'the throttle limits the call',
          'that throttle limits the call'
        ],
        'The call é a chamada.'
      ),
      fala(
        'Segue',
        'What should the throttle do with the call?',
        'O que o throttle deve fazer com a chamada?',
        'Peça para limitar a chamada.',
        'Please limit the call.',
        [
          'please limit the call',
          'limit the call'
        ],
        'Limit the call é limitar a chamada.'
      )
    ]
  },
  {
    id: 'throttle4',
    titulo: 'Throttle quatro',
    emoji: '🚥',
    nivel: 'B1',
    onde: 'O throttle limitou quatro chamadas.',
    rodadas: [
      fala(
        'Limita',
        'How many calls did the throttle limit?',
        'Quantas chamadas o throttle limitou?',
        'Diga que o throttle limitou quatro chamadas.',
        'The throttle limited four calls.',
        [
          'the throttle limited four calls',
          'the throttle limited 4 calls',
          'that throttle limited four calls'
        ],
        'Four calls é quatro chamadas.'
      ),
      fala(
        'Segue',
        'Where should we cap the calls?',
        'Onde a gente limita as chamadas?',
        'Peça para limitar quatro chamadas.',
        'Please limit four calls.',
        ['please limit four calls', 'please limit 4 calls', 'limit four calls'],
        'Limit four calls é limitar quatro chamadas.'
      )
    ]
  },
  {
    id: 'throttleok',
    titulo: 'Throttle no alvo',
    emoji: '🚥',
    nivel: 'B1',
    onde: 'O throttle pode ficar.',
    rodadas: [
      fala(
        'Limita',
        'Can the throttle stay?',
        'O throttle pode ficar?',
        'Diga que o throttle pode ficar.',
        'The throttle can stay.',
        ['the throttle can stay', 'that throttle can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this throttle stay quiet?',
        'Este throttle pode ficar quieto?',
        'Diga que este throttle pode ficar quieto.',
        'This throttle can stay quiet.',
        ['this throttle can stay quiet', 'that throttle can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function sstablePorId(id) {
  return SSTABLES.find(c => c.id === id) ?? null;
}

export function latchPorId(id) {
  return LATCHES.find(c => c.id === id) ?? null;
}

export function throttlePorId(id) {
  return THROTTLES.find(c => c.id === id) ?? null;
}

export function avaliarSstable(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLatch(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarThrottle(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
