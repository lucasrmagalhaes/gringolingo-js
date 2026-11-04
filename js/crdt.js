// Crdt que junta as edições, lww que deixa a escrita nova vencer e orset que segura o item.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CRDTS = [
  {
    id: 'crdtuma',
    titulo: 'Junta do crdt',
    emoji: '🔀',
    nivel: 'A2',
    onde: 'As edições se juntam sem trava.',
    rodadas: [
      fala(
        'Junta',
        'How does the crdt merge the edits?',
        'Como o crdt junta as edições?',
        'Diga que o crdt junta as edições sem trava.',
        'The crdt merges the edits without a lock.',
        [
          'the crdt merges the edits without a lock',
          'that crdt merges the edits without a lock'
        ],
        'Without a lock é sem trava.'
      ),
      fala(
        'Segue',
        'What should the crdt do with the edits?',
        'O que o crdt deve fazer com as edições?',
        'Peça para juntar as edições sem trava.',
        'Please merge the edits without a lock.',
        [
          'please merge the edits without a lock',
          'merge the edits without a lock'
        ],
        'Merge the edits é juntar as edições.'
      )
    ]
  },
  {
    id: 'crdt2',
    titulo: 'Crdt dois',
    emoji: '🔀',
    nivel: 'B1',
    onde: 'O crdt juntou duas edições.',
    rodadas: [
      fala(
        'Junta',
        'How many edits did the crdt merge?',
        'Quantas edições o crdt juntou?',
        'Diga que o crdt juntou duas edições.',
        'The crdt merged two edits.',
        [
          'the crdt merged two edits',
          'the crdt merged 2 edits',
          'that crdt merged two edits'
        ],
        'Two edits é duas edições.'
      ),
      fala(
        'Segue',
        'Where should we cap the edits?',
        'Onde a gente limita as edições?',
        'Peça para juntar duas edições.',
        'Please merge two edits.',
        ['please merge two edits', 'please merge 2 edits', 'merge two edits'],
        'Merge two edits é juntar duas edições.'
      )
    ]
  },
  {
    id: 'crdtok',
    titulo: 'Crdt no alvo',
    emoji: '🔀',
    nivel: 'B1',
    onde: 'O crdt pode ficar.',
    rodadas: [
      fala(
        'Junta',
        'Can the crdt stay?',
        'O crdt pode ficar?',
        'Diga que o crdt pode ficar.',
        'The crdt can stay.',
        ['the crdt can stay', 'that crdt can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this crdt stay quiet?',
        'Este crdt pode ficar quieto?',
        'Diga que este crdt pode ficar quieto.',
        'This crdt can stay quiet.',
        ['this crdt can stay quiet', 'that crdt can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const LWWS = [
  {
    id: 'lwwbase',
    titulo: 'Vence do lww',
    emoji: '🕰️',
    nivel: 'A2',
    onde: 'A escrita mais nova vence o campo.',
    rodadas: [
      fala(
        'Vence',
        'Which write wins the field?',
        'Qual escrita vence o campo?',
        'Diga que a escrita mais nova vence o campo.',
        'The last write wins the field.',
        [
          'the last write wins the field',
          'that last write wins the field'
        ],
        'Last write é a escrita mais nova.'
      ),
      fala(
        'Segue',
        'What should win the field?',
        'O que deve vencer o campo?',
        'Peça para a escrita mais nova vencer o campo.',
        'Please let the last write win the field.',
        [
          'please let the last write win the field',
          'let the last write win the field'
        ],
        'Win the field é vencer o campo.'
      )
    ]
  },
  {
    id: 'lww3',
    titulo: 'Lww três',
    emoji: '🕰️',
    nivel: 'B1',
    onde: 'A escrita mais nova venceu três campos.',
    rodadas: [
      fala(
        'Vence',
        'How many fields did the last write win?',
        'Quantos campos a escrita mais nova venceu?',
        'Diga que a escrita mais nova venceu três campos.',
        'The last write won three fields.',
        [
          'the last write won three fields',
          'the last write won 3 fields',
          'that last write won three fields'
        ],
        'Three fields é três campos.'
      ),
      fala(
        'Segue',
        'Where should we cap the fields?',
        'Onde a gente limita os campos?',
        'Peça para a escrita mais nova vencer três campos.',
        'Please let the last write win three fields.',
        [
          'please let the last write win three fields',
          'please let the last write win 3 fields',
          'let the last write win three fields'
        ],
        'Win three fields é vencer três campos.'
      )
    ]
  },
  {
    id: 'lwwok',
    titulo: 'Lww no alvo',
    emoji: '🕰️',
    nivel: 'B1',
    onde: 'O lww pode ficar.',
    rodadas: [
      fala(
        'Vence',
        'Can the last write stay?',
        'A escrita mais nova pode ficar?',
        'Diga que a escrita mais nova pode ficar.',
        'The last write can stay.',
        ['the last write can stay', 'that last write can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this last write stay quiet?',
        'Esta escrita mais nova pode ficar quieta?',
        'Diga que esta escrita mais nova pode ficar quieta.',
        'This last write can stay quiet.',
        ['this last write can stay quiet', 'that last write can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const ORSETS = [
  {
    id: 'orsetbase',
    titulo: 'Guarda do orset',
    emoji: '📦',
    nivel: 'A2',
    onde: 'O item fica até a remoção aparecer.',
    rodadas: [
      fala(
        'Guarda',
        'How long does the set hold the item?',
        'Até quando o conjunto segura o item?',
        'Diga que o conjunto segura o item até a remoção aparecer.',
        'The set holds the item until the removal shows up.',
        [
          'the set holds the item until the removal shows up',
          'that set holds the item until the removal shows up'
        ],
        'Shows up é aparecer.'
      ),
      fala(
        'Segue',
        'What should the set do with the item?',
        'O que o conjunto deve fazer com o item?',
        'Peça para segurar o item até a remoção aparecer.',
        'Please hold the item until the removal shows up.',
        [
          'please hold the item until the removal shows up',
          'hold the item until the removal shows up'
        ],
        'Hold the item é segurar o item.'
      )
    ]
  },
  {
    id: 'orset4',
    titulo: 'Orset quatro',
    emoji: '📦',
    nivel: 'B1',
    onde: 'O conjunto segurou quatro itens.',
    rodadas: [
      fala(
        'Guarda',
        'How many items did the set hold?',
        'Quantos itens o conjunto segurou?',
        'Diga que o conjunto segurou quatro itens.',
        'The set held four items.',
        [
          'the set held four items',
          'the set held 4 items',
          'that set held four items'
        ],
        'Four items é quatro itens.'
      ),
      fala(
        'Segue',
        'Where should we cap the items?',
        'Onde a gente limita os itens?',
        'Peça para segurar quatro itens.',
        'Please hold four items.',
        ['please hold four items', 'please hold 4 items', 'hold four items'],
        'Hold four items é segurar quatro itens.'
      )
    ]
  },
  {
    id: 'orsetok',
    titulo: 'Orset no alvo',
    emoji: '📦',
    nivel: 'B1',
    onde: 'O orset pode ficar.',
    rodadas: [
      fala(
        'Guarda',
        'Can the set stay?',
        'O conjunto pode ficar?',
        'Diga que o conjunto pode ficar.',
        'The set can stay.',
        ['the set can stay', 'that set can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this set stay quiet?',
        'Este conjunto pode ficar quieto?',
        'Diga que este conjunto pode ficar quieto.',
        'This set can stay quiet.',
        ['this set can stay quiet', 'that set can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function crdtPorId(id) {
  return CRDTS.find(c => c.id === id) ?? null;
}

export function lwwPorId(id) {
  return LWWS.find(c => c.id === id) ?? null;
}

export function orsetPorId(id) {
  return ORSETS.find(c => c.id === id) ?? null;
}

export function avaliarCrdt(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLww(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarOrset(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
