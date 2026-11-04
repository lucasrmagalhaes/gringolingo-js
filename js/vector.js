// Vector que ordena os fatos, dot que nomeia a escrita e causal que deixa a causa chegar antes.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const VECTORS = [
  {
    id: 'vectoruma',
    titulo: 'Marca do vector',
    emoji: '🧭',
    nivel: 'A2',
    onde: 'Cada nó guarda o próprio relógio.',
    rodadas: [
      fala(
        'Marca',
        'How does the vector clock order the facts?',
        'Como o relógio do vector ordena os fatos?',
        'Diga que o relógio do vector ordena os fatos.',
        'The vector clock orders the facts.',
        [
          'the vector clock orders the facts',
          'that vector clock orders the facts'
        ],
        'Orders the facts é ordena os fatos.'
      ),
      fala(
        'Segue',
        'What should the vector clock do with the facts?',
        'O que o relógio do vector deve fazer com os fatos?',
        'Peça para ordenar os fatos com o relógio do vector.',
        'Please order the facts with the vector clock.',
        [
          'please order the facts with the vector clock',
          'order the facts with the vector clock'
        ],
        'Order the facts é ordenar os fatos.'
      )
    ]
  },
  {
    id: 'vector2',
    titulo: 'Vector dois',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'O vector ordenou dois fatos.',
    rodadas: [
      fala(
        'Marca',
        'How many facts did the vector clock order?',
        'Quantos fatos o relógio do vector ordenou?',
        'Diga que o relógio do vector ordenou dois fatos.',
        'The vector clock ordered two facts.',
        [
          'the vector clock ordered two facts',
          'the vector clock ordered 2 facts',
          'that vector clock ordered two facts'
        ],
        'Two facts é dois fatos.'
      ),
      fala(
        'Segue',
        'Where should we cap the facts?',
        'Onde a gente limita os fatos?',
        'Peça para ordenar dois fatos.',
        'Please order two facts.',
        ['please order two facts', 'please order 2 facts', 'order two facts'],
        'Order two facts é ordenar dois fatos.'
      )
    ]
  },
  {
    id: 'vectorok',
    titulo: 'Vector no alvo',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'O relógio do vector pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the vector clock stay?',
        'O relógio do vector pode ficar?',
        'Diga que o relógio do vector pode ficar.',
        'The vector clock can stay.',
        ['the vector clock can stay', 'that vector clock can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this vector clock stay quiet?',
        'Este relógio do vector pode ficar quieto?',
        'Diga que este relógio do vector pode ficar quieto.',
        'This vector clock can stay quiet.',
        ['this vector clock can stay quiet', 'that vector clock can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const DOTS = [
  {
    id: 'dotbase',
    titulo: 'Nomeia do dot',
    emoji: '⚫',
    nivel: 'A2',
    onde: 'O ponto nomeia uma escrita.',
    rodadas: [
      fala(
        'Nomeia',
        'What does the dot name?',
        'O que o ponto nomeia?',
        'Diga que o ponto nomeia uma escrita.',
        'The dot names one write.',
        [
          'the dot names one write',
          'that dot names one write'
        ],
        'One write é uma escrita.'
      ),
      fala(
        'Segue',
        'What should we do with the write?',
        'O que a gente deve fazer com a escrita?',
        'Peça para nomear a escrita com um ponto.',
        'Please name the write with a dot.',
        [
          'please name the write with a dot',
          'name the write with a dot'
        ],
        'Name the write é nomear a escrita.'
      )
    ]
  },
  {
    id: 'dot3',
    titulo: 'Dot três',
    emoji: '⚫',
    nivel: 'B1',
    onde: 'O ponto nomeou três escritas.',
    rodadas: [
      fala(
        'Nomeia',
        'How many writes did the dot name?',
        'Quantas escritas o ponto nomeou?',
        'Diga que o ponto nomeou três escritas.',
        'The dot named three writes.',
        [
          'the dot named three writes',
          'the dot named 3 writes',
          'that dot named three writes'
        ],
        'Three writes é três escritas.'
      ),
      fala(
        'Segue',
        'Where should we cap the writes?',
        'Onde a gente limita as escritas?',
        'Peça para nomear três escritas.',
        'Please name three writes.',
        ['please name three writes', 'please name 3 writes', 'name three writes'],
        'Name three writes é nomear três escritas.'
      )
    ]
  },
  {
    id: 'dotok',
    titulo: 'Dot no alvo',
    emoji: '⚫',
    nivel: 'B1',
    onde: 'O ponto pode ficar.',
    rodadas: [
      fala(
        'Nomeia',
        'Can the dot stay?',
        'O ponto pode ficar?',
        'Diga que o ponto pode ficar.',
        'The dot can stay.',
        ['the dot can stay', 'that dot can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this dot stay quiet?',
        'Este ponto pode ficar quieto?',
        'Diga que este ponto pode ficar quieto.',
        'This dot can stay quiet.',
        ['this dot can stay quiet', 'that dot can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const CAUSALS = [
  {
    id: 'causalbase',
    titulo: 'Chega do causal',
    emoji: '🔗',
    nivel: 'A2',
    onde: 'A causa chega antes do efeito.',
    rodadas: [
      fala(
        'Chega',
        'When does the cause arrive?',
        'Quando a causa chega?',
        'Diga que a causa chega antes do efeito.',
        'The cause arrives before the effect.',
        [
          'the cause arrives before the effect',
          'that cause arrives before the effect'
        ],
        'Before the effect é antes do efeito.'
      ),
      fala(
        'Segue',
        'What should the cause do?',
        'O que a causa deve fazer?',
        'Peça para a causa chegar antes do efeito.',
        'Please let the cause arrive before the effect.',
        [
          'please let the cause arrive before the effect',
          'let the cause arrive before the effect'
        ],
        'Arrive before é chegar antes.'
      )
    ]
  },
  {
    id: 'causal4',
    titulo: 'Causal quatro',
    emoji: '🔗',
    nivel: 'B1',
    onde: 'A causa chegou antes de quatro efeitos.',
    rodadas: [
      fala(
        'Chega',
        'How many effects did the cause beat?',
        'De quantos efeitos a causa chegou na frente?',
        'Diga que a causa chegou antes de quatro efeitos.',
        'The cause arrived before four effects.',
        [
          'the cause arrived before four effects',
          'the cause arrived before 4 effects',
          'that cause arrived before four effects'
        ],
        'Four effects é quatro efeitos.'
      ),
      fala(
        'Segue',
        'Where should we cap the effects?',
        'Onde a gente limita os efeitos?',
        'Peça para a causa chegar antes de quatro efeitos.',
        'Please let the cause arrive before four effects.',
        [
          'please let the cause arrive before four effects',
          'please let the cause arrive before 4 effects',
          'let the cause arrive before four effects'
        ],
        'Before four effects é antes de quatro efeitos.'
      )
    ]
  },
  {
    id: 'causalok',
    titulo: 'Causal no alvo',
    emoji: '🔗',
    nivel: 'B1',
    onde: 'A ordem causal pode ficar.',
    rodadas: [
      fala(
        'Chega',
        'Can the causal order stay?',
        'A ordem causal pode ficar?',
        'Diga que a ordem causal pode ficar.',
        'The causal order can stay.',
        ['the causal order can stay', 'that causal order can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this causal order stay quiet?',
        'Esta ordem causal pode ficar quieta?',
        'Diga que esta ordem causal pode ficar quieta.',
        'This causal order can stay quiet.',
        ['this causal order can stay quiet', 'that causal order can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function vectorPorId(id) {
  return VECTORS.find(c => c.id === id) ?? null;
}

export function dotPorId(id) {
  return DOTS.find(c => c.id === id) ?? null;
}

export function causalPorId(id) {
  return CAUSALS.find(c => c.id === id) ?? null;
}

export function avaliarVector(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDot(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCausal(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
