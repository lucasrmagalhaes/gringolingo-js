// Shard que guarda um pedaço, rebalance que muda a carga e split que divide a parte cheia.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SHARDS = [
  {
    id: 'sharduma',
    titulo: 'Guarda do shard',
    emoji: '🧩',
    nivel: 'A2',
    onde: 'O pedaço guarda uma parte da chave.',
    rodadas: [
      fala(
        'Guarda',
        'What does the shard store?',
        'O que o pedaço guarda?',
        'Diga que o pedaço guarda uma parte da chave.',
        'The shard stores one part of the key.',
        [
          'the shard stores one part of the key',
          'that shard stores one part of the key'
        ],
        'One part of the key é uma parte da chave.'
      ),
      fala(
        'Segue',
        'What should the shard do with the key?',
        'O que o pedaço deve fazer com a chave?',
        'Peça para guardar uma parte da chave.',
        'Please store one part of the key.',
        [
          'please store one part of the key',
          'store one part of the key'
        ],
        'Store one part é guardar uma parte.'
      )
    ]
  },
  {
    id: 'shard2',
    titulo: 'Shard dois',
    emoji: '🧩',
    nivel: 'B1',
    onde: 'O pedaço guardou duas partes.',
    rodadas: [
      fala(
        'Guarda',
        'How many parts did the shard store?',
        'Quantas partes o pedaço guardou?',
        'Diga que o pedaço guardou duas partes.',
        'The shard stored two parts.',
        [
          'the shard stored two parts',
          'the shard stored 2 parts',
          'that shard stored two parts'
        ],
        'Two parts é duas partes.'
      ),
      fala(
        'Segue',
        'Where should we cap the parts?',
        'Onde a gente limita as partes?',
        'Peça para guardar duas partes.',
        'Please store two parts.',
        ['please store two parts', 'please store 2 parts', 'store two parts'],
        'Store two parts é guardar duas partes.'
      )
    ]
  },
  {
    id: 'shardok',
    titulo: 'Shard no alvo',
    emoji: '🧩',
    nivel: 'B1',
    onde: 'O pedaço pode ficar.',
    rodadas: [
      fala(
        'Guarda',
        'Can the shard stay?',
        'O pedaço pode ficar?',
        'Diga que o pedaço pode ficar.',
        'The shard can stay.',
        ['the shard can stay', 'that shard can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this shard stay quiet?',
        'Este pedaço pode ficar quieto?',
        'Diga que este pedaço pode ficar quieto.',
        'This shard can stay quiet.',
        ['this shard can stay quiet', 'that shard can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const REBALANCES = [
  {
    id: 'rebalancebase',
    titulo: 'Troca do rebalance',
    emoji: '⚖️',
    nivel: 'A2',
    onde: 'As partes trocam de lugar.',
    rodadas: [
      fala(
        'Troca',
        'What does the rebalance move?',
        'O que o rebalance move?',
        'Diga que o rebalance move a carga.',
        'The rebalance moves the load.',
        [
          'the rebalance moves the load',
          'that rebalance moves the load'
        ],
        'Moves the load é move a carga.'
      ),
      fala(
        'Segue',
        'What should the rebalance do with the load?',
        'O que o rebalance deve fazer com a carga?',
        'Peça para mover a carga para outra parte.',
        'Please move the load to another part.',
        [
          'please move the load to another part',
          'move the load to another part'
        ],
        'Another part é outra parte.'
      )
    ]
  },
  {
    id: 'rebalance3',
    titulo: 'Rebalance três',
    emoji: '⚖️',
    nivel: 'B1',
    onde: 'O rebalance moveu três partes.',
    rodadas: [
      fala(
        'Troca',
        'How many parts did the rebalance move?',
        'Quantas partes o rebalance moveu?',
        'Diga que o rebalance moveu três partes.',
        'The rebalance moved three parts.',
        [
          'the rebalance moved three parts',
          'the rebalance moved 3 parts',
          'that rebalance moved three parts'
        ],
        'Three parts é três partes.'
      ),
      fala(
        'Segue',
        'Where should we cap the move?',
        'Onde a gente limita a troca?',
        'Peça para mover três partes.',
        'Please move three parts.',
        ['please move three parts', 'please move 3 parts', 'move three parts'],
        'Move three parts é mover três partes.'
      )
    ]
  },
  {
    id: 'rebalanceok',
    titulo: 'Rebalance no alvo',
    emoji: '⚖️',
    nivel: 'B1',
    onde: 'O rebalance pode ficar.',
    rodadas: [
      fala(
        'Troca',
        'Can the rebalance stay?',
        'O rebalance pode ficar?',
        'Diga que o rebalance pode ficar.',
        'The rebalance can stay.',
        ['the rebalance can stay', 'that rebalance can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this rebalance stay quiet?',
        'Este rebalance pode ficar quieto?',
        'Diga que este rebalance pode ficar quieto.',
        'This rebalance can stay quiet.',
        ['this rebalance can stay quiet', 'that rebalance can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const SPLITS = [
  {
    id: 'splitbase',
    titulo: 'Divide do split',
    emoji: '🪓',
    nivel: 'A2',
    onde: 'A parte grande vira duas.',
    rodadas: [
      fala(
        'Divide',
        'What does the split do?',
        'O que o split faz?',
        'Diga que o split divide a parte cheia.',
        'The split divides the full part.',
        [
          'the split divides the full part',
          'that split divides the full part'
        ],
        'The full part é a parte cheia.'
      ),
      fala(
        'Segue',
        'What should the split do with the part?',
        'O que o split deve fazer com a parte?',
        'Peça para dividir a parte cheia.',
        'Please divide the full part.',
        [
          'please divide the full part',
          'divide the full part'
        ],
        'Divide the full part é dividir a parte cheia.'
      )
    ]
  },
  {
    id: 'split4',
    titulo: 'Split quatro',
    emoji: '🪓',
    nivel: 'B1',
    onde: 'O split dividiu quatro partes.',
    rodadas: [
      fala(
        'Divide',
        'How many parts did the split divide?',
        'Quantas partes o split dividiu?',
        'Diga que o split dividiu quatro partes.',
        'The split divided four parts.',
        [
          'the split divided four parts',
          'the split divided 4 parts',
          'that split divided four parts'
        ],
        'Four parts é quatro partes.'
      ),
      fala(
        'Segue',
        'Where should we cap the split?',
        'Onde a gente limita a divisão?',
        'Peça para dividir quatro partes.',
        'Please divide four parts.',
        ['please divide four parts', 'please divide 4 parts', 'divide four parts'],
        'Divide four parts é dividir quatro partes.'
      )
    ]
  },
  {
    id: 'splitok',
    titulo: 'Split no alvo',
    emoji: '🪓',
    nivel: 'B1',
    onde: 'O split pode ficar.',
    rodadas: [
      fala(
        'Divide',
        'Can the split stay?',
        'O split pode ficar?',
        'Diga que o split pode ficar.',
        'The split can stay.',
        ['the split can stay', 'that split can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this split stay quiet?',
        'Este split pode ficar quieto?',
        'Diga que este split pode ficar quieto.',
        'This split can stay quiet.',
        ['this split can stay quiet', 'that split can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function shardPorId(id) {
  return SHARDS.find(c => c.id === id) ?? null;
}

export function rebalancePorId(id) {
  return REBALANCES.find(c => c.id === id) ?? null;
}

export function splitPorId(id) {
  return SPLITS.find(c => c.id === id) ?? null;
}

export function avaliarShard(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRebalance(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSplit(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
