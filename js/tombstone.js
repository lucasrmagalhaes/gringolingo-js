// Tombstone que marca a chave apagada, purge que tira a chave morta e reclaim que devolve o espaço.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const TOMBSTONES = [
  {
    id: 'tombstonebase',
    titulo: 'Marca do tombstone',
    emoji: '🪦',
    nivel: 'A2',
    onde: 'A lápide marca a chave apagada.',
    rodadas: [
      fala(
        'Marca',
        'What does the tombstone mark?',
        'O que a lápide marca?',
        'Diga que a lápide marca a chave apagada.',
        'The tombstone marks the deleted key.',
        [
          'the tombstone marks the deleted key',
          'that tombstone marks the deleted key'
        ],
        'The deleted key é a chave apagada.'
      ),
      fala(
        'Segue',
        'What should the tombstone do with the key?',
        'O que a lápide deve fazer com a chave?',
        'Peça para marcar a chave apagada.',
        'Please mark the deleted key.',
        [
          'please mark the deleted key',
          'mark the deleted key'
        ],
        'Mark the deleted key é marcar a chave apagada.'
      )
    ]
  },
  {
    id: 'tombstone2',
    titulo: 'Tombstone dois',
    emoji: '🪦',
    nivel: 'B1',
    onde: 'A lápide marcou duas chaves.',
    rodadas: [
      fala(
        'Marca',
        'How many keys did the tombstone mark?',
        'Quantas chaves a lápide marcou?',
        'Diga que a lápide marcou duas chaves.',
        'The tombstone marked two keys.',
        [
          'the tombstone marked two keys',
          'the tombstone marked 2 keys',
          'that tombstone marked two keys'
        ],
        'Two keys é duas chaves.'
      ),
      fala(
        'Segue',
        'Where should we cap the keys?',
        'Onde a gente limita as chaves?',
        'Peça para marcar duas chaves.',
        'Please mark two keys.',
        ['please mark two keys', 'please mark 2 keys', 'mark two keys'],
        'Mark two keys é marcar duas chaves.'
      )
    ]
  },
  {
    id: 'tombstoneok',
    titulo: 'Tombstone no alvo',
    emoji: '🪦',
    nivel: 'B1',
    onde: 'A lápide pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the tombstone stay?',
        'A lápide pode ficar?',
        'Diga que a lápide pode ficar.',
        'The tombstone can stay.',
        ['the tombstone can stay', 'that tombstone can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this tombstone stay quiet?',
        'Esta lápide pode ficar quieta?',
        'Diga que esta lápide pode ficar quieta.',
        'This tombstone can stay quiet.',
        ['this tombstone can stay quiet', 'that tombstone can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const PURGES = [
  {
    id: 'purgebase',
    titulo: 'Limpeza do purge',
    emoji: '🗑️',
    nivel: 'A2',
    onde: 'A limpeza tira a chave morta.',
    rodadas: [
      fala(
        'Tira',
        'What does the purge remove?',
        'O que a limpeza tira?',
        'Diga que a limpeza tira a chave morta.',
        'The purge removes the dead key.',
        [
          'the purge removes the dead key',
          'that purge removes the dead key'
        ],
        'The dead key é a chave morta.'
      ),
      fala(
        'Segue',
        'What should the purge do with the key?',
        'O que a limpeza deve fazer com a chave?',
        'Peça para tirar a chave morta.',
        'Please remove the dead key.',
        [
          'please remove the dead key',
          'remove the dead key'
        ],
        'Remove the dead key é tirar a chave morta.'
      )
    ]
  },
  {
    id: 'purge3',
    titulo: 'Purge três',
    emoji: '🗑️',
    nivel: 'B1',
    onde: 'A limpeza tirou três chaves.',
    rodadas: [
      fala(
        'Tira',
        'How many keys did the purge remove?',
        'Quantas chaves a limpeza tirou?',
        'Diga que a limpeza tirou três chaves.',
        'The purge removed three keys.',
        [
          'the purge removed three keys',
          'the purge removed 3 keys',
          'that purge removed three keys'
        ],
        'Three keys é três chaves.'
      ),
      fala(
        'Segue',
        'Where should we cap the keys?',
        'Onde a gente limita as chaves?',
        'Peça para tirar três chaves.',
        'Please remove three keys.',
        ['please remove three keys', 'please remove 3 keys', 'remove three keys'],
        'Remove three keys é tirar três chaves.'
      )
    ]
  },
  {
    id: 'purgeok',
    titulo: 'Purge no alvo',
    emoji: '🗑️',
    nivel: 'B1',
    onde: 'A limpeza pode ficar.',
    rodadas: [
      fala(
        'Tira',
        'Can the purge stay?',
        'A limpeza pode ficar?',
        'Diga que a limpeza pode ficar.',
        'The purge can stay.',
        ['the purge can stay', 'that purge can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this purge stay quiet?',
        'Esta limpeza pode ficar quieta?',
        'Diga que esta limpeza pode ficar quieta.',
        'This purge can stay quiet.',
        ['this purge can stay quiet', 'that purge can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const RECLAIMS = [
  {
    id: 'reclaimbase',
    titulo: 'Volta do reclaim',
    emoji: '♻️',
    nivel: 'A2',
    onde: 'O espaço volta para a lista livre.',
    rodadas: [
      fala(
        'Volta',
        'What does the reclaim return?',
        'O que o espaço devolve?',
        'Diga que o espaço volta para a lista livre.',
        'The reclaim returns space to the free list.',
        [
          'the reclaim returns space to the free list',
          'that reclaim returns space to the free list'
        ],
        'The free list é a lista livre.'
      ),
      fala(
        'Segue',
        'What should the reclaim do with the space?',
        'O que o espaço deve fazer?',
        'Peça para devolver o espaço à lista livre.',
        'Please return space to the free list.',
        [
          'please return space to the free list',
          'return space to the free list'
        ],
        'Return space to the free list é devolver o espaço à lista livre.'
      )
    ]
  },
  {
    id: 'reclaim4',
    titulo: 'Reclaim quatro',
    emoji: '♻️',
    nivel: 'B1',
    onde: 'O espaço voltou quatro vezes.',
    rodadas: [
      fala(
        'Volta',
        'How many lists did the reclaim return?',
        'Quantas listas o espaço devolveu?',
        'Diga que o espaço voltou quatro vezes.',
        'The reclaim returned four lists.',
        [
          'the reclaim returned four lists',
          'the reclaim returned 4 lists',
          'that reclaim returned four lists'
        ],
        'Four lists é quatro listas.'
      ),
      fala(
        'Segue',
        'Where should we cap the lists?',
        'Onde a gente limita as listas?',
        'Peça para devolver quatro listas.',
        'Please return four lists.',
        ['please return four lists', 'please return 4 lists', 'return four lists'],
        'Return four lists é devolver quatro listas.'
      )
    ]
  },
  {
    id: 'reclaimok',
    titulo: 'Reclaim no alvo',
    emoji: '♻️',
    nivel: 'B1',
    onde: 'O espaço pode ficar.',
    rodadas: [
      fala(
        'Volta',
        'Can the reclaim stay?',
        'O espaço pode ficar?',
        'Diga que o espaço pode ficar.',
        'The reclaim can stay.',
        ['the reclaim can stay', 'that reclaim can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this reclaim stay quiet?',
        'Este espaço pode ficar quieto?',
        'Diga que este espaço pode ficar quieto.',
        'This reclaim can stay quiet.',
        ['this reclaim can stay quiet', 'that reclaim can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function tombstonePorId(id) {
  return TOMBSTONES.find(c => c.id === id) ?? null;
}

export function purgePorId(id) {
  return PURGES.find(c => c.id === id) ?? null;
}

export function reclaimPorId(id) {
  return RECLAIMS.find(c => c.id === id) ?? null;
}

export function avaliarTombstone(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPurge(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarReclaim(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
