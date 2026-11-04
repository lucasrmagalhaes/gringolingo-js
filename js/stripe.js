// Stripe que espalha o bloco, parity que recupera o dado e rebuild que refaz o disco.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const STRIPES = [
  {
    id: 'stripebase',
    titulo: 'Espalha do stripe',
    emoji: '🧵',
    nivel: 'A2',
    onde: 'O stripe espalha o bloco.',
    rodadas: [
      fala(
        'Espalha',
        'What does the stripe spread?',
        'O que o stripe espalha?',
        'Diga que o stripe espalha o bloco.',
        'The stripe spreads the block.',
        [
          'the stripe spreads the block',
          'that stripe spreads the block'
        ],
        'The block é o bloco.'
      ),
      fala(
        'Segue',
        'What should the stripe do with the block?',
        'O que o stripe deve fazer com o bloco?',
        'Peça para espalhar o bloco.',
        'Please spread the block.',
        [
          'please spread the block',
          'spread the block'
        ],
        'Spread the block é espalhar o bloco.'
      )
    ]
  },
  {
    id: 'stripe2',
    titulo: 'Stripe dois',
    emoji: '🧵',
    nivel: 'B1',
    onde: 'O stripe espalhou dois blocos.',
    rodadas: [
      fala(
        'Espalha',
        'How many blocks did the stripe spread?',
        'Quantos blocos o stripe espalhou?',
        'Diga que o stripe espalhou dois blocos.',
        'The stripe spread two blocks.',
        [
          'the stripe spread two blocks',
          'the stripe spread 2 blocks',
          'that stripe spread two blocks'
        ],
        'Two blocks é dois blocos.'
      ),
      fala(
        'Segue',
        'Where should we cap the blocks?',
        'Onde a gente limita os blocos?',
        'Peça para espalhar dois blocos.',
        'Please spread two blocks.',
        ['please spread two blocks', 'please spread 2 blocks', 'spread two blocks'],
        'Spread two blocks é espalhar dois blocos.'
      )
    ]
  },
  {
    id: 'stripeok',
    titulo: 'Stripe no alvo',
    emoji: '🧵',
    nivel: 'B1',
    onde: 'O stripe pode ficar.',
    rodadas: [
      fala(
        'Espalha',
        'Can the stripe stay?',
        'O stripe pode ficar?',
        'Diga que o stripe pode ficar.',
        'The stripe can stay.',
        ['the stripe can stay', 'that stripe can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this stripe stay quiet?',
        'Este stripe pode ficar quieto?',
        'Diga que este stripe pode ficar quieto.',
        'This stripe can stay quiet.',
        ['this stripe can stay quiet', 'that stripe can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const PARITIES = [
  {
    id: 'paritybase',
    titulo: 'Recupera do parity',
    emoji: '🔁',
    nivel: 'A2',
    onde: 'O parity recupera o dado.',
    rodadas: [
      fala(
        'Recupera',
        'What does the parity recover?',
        'O que o parity recupera?',
        'Diga que o parity recupera o dado.',
        'The parity recovers the data.',
        [
          'the parity recovers the data',
          'that parity recovers the data'
        ],
        'The data é o dado.'
      ),
      fala(
        'Segue',
        'What should the parity do with the data?',
        'O que o parity deve fazer com o dado?',
        'Peça para recuperar o dado.',
        'Please recover the data.',
        [
          'please recover the data',
          'recover the data'
        ],
        'Recover the data é recuperar o dado.'
      )
    ]
  },
  {
    id: 'parity3',
    titulo: 'Parity três',
    emoji: '🔁',
    nivel: 'B1',
    onde: 'O parity recuperou três cópias.',
    rodadas: [
      fala(
        'Recupera',
        'How many copies did the parity recover?',
        'Quantas cópias o parity recuperou?',
        'Diga que o parity recuperou três cópias.',
        'The parity recovered three copies.',
        [
          'the parity recovered three copies',
          'the parity recovered 3 copies',
          'that parity recovered three copies'
        ],
        'Three copies é três cópias.'
      ),
      fala(
        'Segue',
        'Where should we cap the copies?',
        'Onde a gente limita as cópias?',
        'Peça para recuperar três cópias.',
        'Please recover three copies.',
        ['please recover three copies', 'please recover 3 copies', 'recover three copies'],
        'Recover three copies é recuperar três cópias.'
      )
    ]
  },
  {
    id: 'parityok',
    titulo: 'Parity no alvo',
    emoji: '🔁',
    nivel: 'B1',
    onde: 'O parity pode ficar.',
    rodadas: [
      fala(
        'Recupera',
        'Can the parity stay?',
        'O parity pode ficar?',
        'Diga que o parity pode ficar.',
        'The parity can stay.',
        ['the parity can stay', 'that parity can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this parity stay quiet?',
        'Este parity pode ficar quieto?',
        'Diga que este parity pode ficar quieto.',
        'This parity can stay quiet.',
        ['this parity can stay quiet', 'that parity can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const REBUILDS = [
  {
    id: 'rebuildbase',
    titulo: 'Refaz do rebuild',
    emoji: '🔨',
    nivel: 'A2',
    onde: 'O rebuild refaz o disco.',
    rodadas: [
      fala(
        'Refaz',
        'What does the rebuild rewrite?',
        'O que o rebuild refaz?',
        'Diga que o rebuild refaz o disco.',
        'The rebuild rewrites the disk.',
        [
          'the rebuild rewrites the disk',
          'that rebuild rewrites the disk'
        ],
        'The disk é o disco.'
      ),
      fala(
        'Segue',
        'What should the rebuild do with the disk?',
        'O que o rebuild deve fazer com o disco?',
        'Peça para refazer o disco.',
        'Please rewrite the disk.',
        [
          'please rewrite the disk',
          'rewrite the disk'
        ],
        'Rewrite the disk é refazer o disco.'
      )
    ]
  },
  {
    id: 'rebuild4',
    titulo: 'Rebuild quatro',
    emoji: '🔨',
    nivel: 'B1',
    onde: 'O rebuild restaurou quatro discos.',
    rodadas: [
      fala(
        'Refaz',
        'How many disks did the rebuild restore?',
        'Quantos discos o rebuild restaurou?',
        'Diga que o rebuild restaurou quatro discos.',
        'The rebuild restored four disks.',
        [
          'the rebuild restored four disks',
          'the rebuild restored 4 disks',
          'that rebuild restored four disks'
        ],
        'Four disks é quatro discos.'
      ),
      fala(
        'Segue',
        'Where should we cap the disks?',
        'Onde a gente limita os discos?',
        'Peça para restaurar quatro discos.',
        'Please restore four disks.',
        ['please restore four disks', 'please restore 4 disks', 'restore four disks'],
        'Restore four disks é restaurar quatro discos.'
      )
    ]
  },
  {
    id: 'rebuildok',
    titulo: 'Rebuild no alvo',
    emoji: '🔨',
    nivel: 'B1',
    onde: 'O rebuild pode ficar.',
    rodadas: [
      fala(
        'Refaz',
        'Can the rebuild stay?',
        'O rebuild pode ficar?',
        'Diga que o rebuild pode ficar.',
        'The rebuild can stay.',
        ['the rebuild can stay', 'that rebuild can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this rebuild stay quiet?',
        'Este rebuild pode ficar quieto?',
        'Diga que este rebuild pode ficar quieto.',
        'This rebuild can stay quiet.',
        ['this rebuild can stay quiet', 'that rebuild can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function stripePorId(id) {
  return STRIPES.find(c => c.id === id) ?? null;
}

export function parityPorId(id) {
  return PARITIES.find(c => c.id === id) ?? null;
}

export function rebuildPorId(id) {
  return REBUILDS.find(c => c.id === id) ?? null;
}

export function avaliarStripe(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarParity(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRebuild(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
