// Merkle que sela as folhas, radix que corta o prefixo e trie que guarda a palavra.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const MERKLES = [
  {
    id: 'merkleuma',
    titulo: 'Uso do merkle',
    emoji: '🌳',
    nivel: 'A2',
    onde: 'A árvore resume as folhas num selo.',
    rodadas: [
      fala(
        'Sela',
        'What does the tree do with the leaves?',
        'O que a árvore faz com as folhas?',
        'Diga que a árvore resume as folhas num selo.',
        'The tree seals the leaves in one stamp.',
        [
          'the tree seals the leaves in one stamp',
          'that tree seals the leaves in one stamp'
        ],
        'One stamp é um selo.'
      ),
      fala(
        'Segue',
        'What should the tree do?',
        'O que a árvore deve fazer?',
        'Peça para resumir as folhas num selo.',
        'Please seal the leaves in one stamp.',
        ['please seal the leaves in one stamp', 'seal the leaves in one stamp'],
        'Seal the leaves é resumir as folhas.'
      )
    ]
  },
  {
    id: 'merkle2',
    titulo: 'Merkle dois',
    emoji: '🌳',
    nivel: 'B1',
    onde: 'O merkle selou duas folhas.',
    rodadas: [
      fala(
        'Sela',
        'How many leaves did the merkle seal?',
        'Quantas folhas o merkle selou?',
        'Diga que o merkle selou duas folhas.',
        'The merkle sealed two leaves.',
        [
          'the merkle sealed two leaves',
          'the merkle sealed 2 leaves',
          'that merkle sealed two leaves'
        ],
        'Two leaves é duas folhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the leaves?',
        'Onde a gente limita as folhas?',
        'Peça para selar duas folhas.',
        'Please seal two leaves.',
        ['please seal two leaves', 'please seal 2 leaves', 'seal two leaves'],
        'Seal two leaves é selar duas folhas.'
      )
    ]
  },
  {
    id: 'merkleok',
    titulo: 'Merkle no alvo',
    emoji: '🌳',
    nivel: 'B1',
    onde: 'O merkle pode ficar.',
    rodadas: [
      fala(
        'Sela',
        'Can the merkle stay?',
        'O merkle pode ficar?',
        'Diga que o merkle pode ficar.',
        'The merkle can stay.',
        ['the merkle can stay', 'that merkle can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this merkle stay quiet?',
        'Este merkle pode ficar quieto?',
        'Diga que este merkle pode ficar quieto.',
        'This merkle can stay quiet.',
        ['this merkle can stay quiet', 'that merkle can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const RADIXES = [
  {
    id: 'radixbase',
    titulo: 'Corte do radix',
    emoji: '✂️',
    nivel: 'A2',
    onde: 'A árvore corta o prefixo comum.',
    rodadas: [
      fala(
        'Corta',
        'What does the tree cut?',
        'O que a árvore corta?',
        'Diga que a árvore corta o prefixo comum.',
        'The tree cuts the shared prefix.',
        [
          'the tree cuts the shared prefix',
          'that tree cuts the shared prefix'
        ],
        'Shared prefix é prefixo comum.'
      ),
      fala(
        'Segue',
        'What should the tree do?',
        'O que a árvore deve fazer?',
        'Peça para cortar o prefixo comum.',
        'Please cut the shared prefix.',
        ['please cut the shared prefix', 'cut the shared prefix'],
        'Cut the shared prefix é cortar o prefixo comum.'
      )
    ]
  },
  {
    id: 'radix3',
    titulo: 'Radix três',
    emoji: '✂️',
    nivel: 'B1',
    onde: 'O radix cortou três prefixos.',
    rodadas: [
      fala(
        'Corta',
        'How many prefixes did the radix cut?',
        'Quantos prefixos o radix cortou?',
        'Diga que o radix cortou três prefixos.',
        'The radix cut three prefixes.',
        [
          'the radix cut three prefixes',
          'the radix cut 3 prefixes',
          'that radix cut three prefixes'
        ],
        'Three prefixes é três prefixos.'
      ),
      fala(
        'Segue',
        'Where should we cap the prefixes?',
        'Onde a gente limita os prefixos?',
        'Peça para cortar três prefixos.',
        'Please cut three prefixes.',
        ['please cut three prefixes', 'please cut 3 prefixes', 'cut three prefixes'],
        'Cut three prefixes é cortar três prefixos.'
      )
    ]
  },
  {
    id: 'radixok',
    titulo: 'Radix no alvo',
    emoji: '✂️',
    nivel: 'B1',
    onde: 'O radix pode ficar.',
    rodadas: [
      fala(
        'Corta',
        'Can the radix stay?',
        'O radix pode ficar?',
        'Diga que o radix pode ficar.',
        'The radix can stay.',
        ['the radix can stay', 'that radix can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this radix stay quiet?',
        'Este radix pode ficar quieto?',
        'Diga que este radix pode ficar quieto.',
        'This radix can stay quiet.',
        ['this radix can stay quiet', 'that radix can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const TRIES = [
  {
    id: 'triebase',
    titulo: 'Guarda do trie',
    emoji: '🔤',
    nivel: 'A2',
    onde: 'A árvore guarda a palavra letra a letra.',
    rodadas: [
      fala(
        'Guarda',
        'How does the tree store the word?',
        'Como a árvore guarda a palavra?',
        'Diga que a árvore guarda a palavra letra a letra.',
        'The tree stores the word letter by letter.',
        [
          'the tree stores the word letter by letter',
          'that tree stores the word letter by letter'
        ],
        'Letter by letter é letra a letra.'
      ),
      fala(
        'Segue',
        'What should the tree do?',
        'O que a árvore deve fazer?',
        'Peça para guardar a palavra letra a letra.',
        'Please store the word letter by letter.',
        ['please store the word letter by letter', 'store the word letter by letter'],
        'Store the word é guardar a palavra.'
      )
    ]
  },
  {
    id: 'trie4',
    titulo: 'Trie quatro',
    emoji: '🔤',
    nivel: 'B1',
    onde: 'O trie guardou quatro palavras.',
    rodadas: [
      fala(
        'Guarda',
        'How many words did the trie store?',
        'Quantas palavras o trie guardou?',
        'Diga que o trie guardou quatro palavras.',
        'The trie stored four words.',
        [
          'the trie stored four words',
          'the trie stored 4 words',
          'that trie stored four words'
        ],
        'Four words é quatro palavras.'
      ),
      fala(
        'Segue',
        'Where should we cap the words?',
        'Onde a gente limita as palavras?',
        'Peça para guardar quatro palavras.',
        'Please store four words.',
        ['please store four words', 'please store 4 words', 'store four words'],
        'Store four words é guardar quatro palavras.'
      )
    ]
  },
  {
    id: 'trieok',
    titulo: 'Trie no alvo',
    emoji: '🔤',
    nivel: 'B1',
    onde: 'O trie pode ficar.',
    rodadas: [
      fala(
        'Guarda',
        'Can the trie stay?',
        'O trie pode ficar?',
        'Diga que o trie pode ficar.',
        'The trie can stay.',
        ['the trie can stay', 'that trie can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this trie stay quiet?',
        'Este trie pode ficar quieto?',
        'Diga que este trie pode ficar quieto.',
        'This trie can stay quiet.',
        ['this trie can stay quiet', 'that trie can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function merklePorId(id) {
  return MERKLES.find(c => c.id === id) ?? null;
}

export function radixPorId(id) {
  return RADIXES.find(c => c.id === id) ?? null;
}

export function triePorId(id) {
  return TRIES.find(c => c.id === id) ?? null;
}

export function avaliarMerkle(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRadix(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarTrie(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
