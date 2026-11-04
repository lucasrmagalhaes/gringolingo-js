// Tremor no tempo, portaria que recusa e cola que gruda o cliente.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const TREMORES = [
  {
    id: 'tempodif',
    titulo: 'Tempo diferente',
    emoji: '🫨',
    nivel: 'A2',
    onde: 'Cada nova tentativa esperou um tempo diferente.',
    rodadas: [
      fala(
        'Varia',
        'What did each new try do?',
        'O que cada nova tentativa fez?',
        'Diga que cada nova tentativa esperou um tempo diferente.',
        'Each new try waited a different time.',
        ['each new try waited a different time', 'every new try waited a different time'],
        'A different time é um tempo diferente.'
      ),
      fala(
        'Acerta',
        'What should we vary?',
        'O que a gente varia?',
        'Peça para variar a próxima espera.',
        'Please vary the next wait.',
        ['please vary the next wait', 'vary the next wait'],
        'The next wait é a próxima espera.'
      )
    ]
  },
  {
    id: 'tremor2',
    titulo: 'Tremor dois',
    emoji: '🫨',
    nivel: 'B1',
    onde: 'O tremor somou dois segundos a mais.',
    rodadas: [
      fala(
        'Varia',
        'How much jitter was added?',
        'Quanto de tremor foi somado?',
        'Diga que o tremor somou dois segundos a mais.',
        'The jitter added two extra seconds.',
        [
          'the jitter added two extra seconds',
          'the jitter added 2 extra seconds',
          'that jitter added two extra seconds'
        ],
        'Two extra seconds é dois segundos a mais.'
      ),
      fala(
        'Acerta',
        'Where should we cap the jitter?',
        'Onde a gente limita o tremor?',
        'Peça para limitar o tremor em dois segundos.',
        'Please cap the jitter at two seconds.',
        [
          'please cap the jitter at two seconds',
          'please cap the jitter at 2 seconds',
          'cap the jitter at two seconds'
        ],
        'Cap the jitter é limitar o tremor.'
      )
    ]
  },
  {
    id: 'tremorok',
    titulo: 'Tremor no alvo',
    emoji: '🫨',
    nivel: 'B1',
    onde: 'A próxima tentativa pode usar a mesma espera.',
    rodadas: [
      fala(
        'Varia',
        'Can the next try use the same wait?',
        'A próxima tentativa pode usar a mesma espera?',
        'Diga que a próxima tentativa pode usar a mesma espera.',
        'The next try can use the same wait.',
        ['the next try can use the same wait', 'that next try can use the same wait'],
        'The same wait é a mesma espera.'
      ),
      fala(
        'Acerta',
        'Can the jitter stay small?',
        'O tremor pode ficar pequeno?',
        'Diga que o tremor pode ficar pequeno.',
        'The jitter can stay small.',
        ['the jitter can stay small', 'that jitter can stay small'],
        'Stay small é ficar pequeno.'
      )
    ]
  }
];

export const PORTARIAS = [
  {
    id: 'extraent',
    titulo: 'Entrada extra',
    emoji: '🧱',
    nivel: 'A2',
    onde: 'A portaria recusou a chamada extra.',
    rodadas: [
      fala(
        'Recusa',
        'What did the gate refuse?',
        'O que a portaria recusou?',
        'Diga que a portaria recusou a chamada extra.',
        'The gate refused the extra call.',
        ['the gate refused the extra call', 'that gate refused the extra call'],
        'The extra call é a chamada extra.'
      ),
      fala(
        'Abre',
        'What should we open?',
        'O que a gente abre?',
        'Peça para abrir a portaria para uma chamada.',
        'Please open the gate for one call.',
        ['please open the gate for one call', 'open the gate for one call'],
        'One call é uma chamada.'
      )
    ]
  },
  {
    id: 'portaria3',
    titulo: 'Portaria três',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'A portaria recusou três chamadas extras.',
    rodadas: [
      fala(
        'Recusa',
        'How many extra calls did the gate refuse?',
        'Quantas chamadas extras a portaria recusou?',
        'Diga que a portaria recusou três chamadas extras.',
        'The gate refused three extra calls.',
        [
          'the gate refused three extra calls',
          'the gate refused 3 extra calls',
          'that gate refused three extra calls'
        ],
        'Three extra calls é três chamadas extras.'
      ),
      fala(
        'Abre',
        'Where should we cap the gate?',
        'Onde a gente limita a portaria?',
        'Peça para limitar a portaria em três chamadas.',
        'Please cap the gate at three calls.',
        [
          'please cap the gate at three calls',
          'please cap the gate at 3 calls',
          'cap the gate at three calls'
        ],
        'Three calls é três chamadas.'
      )
    ]
  },
  {
    id: 'portariaok',
    titulo: 'Portaria aberta',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'A portaria está aberta para a próxima chamada.',
    rodadas: [
      fala(
        'Recusa',
        'Is the gate open for the next call?',
        'A portaria está aberta para a próxima chamada?',
        'Diga que a portaria está aberta para a próxima chamada.',
        'The gate is open for the next call.',
        ['the gate is open for the next call', 'that gate is open for the next call'],
        'The next call é a próxima chamada.'
      ),
      fala(
        'Abre',
        'Can the next call enter?',
        'A próxima chamada pode entrar?',
        'Diga que a próxima chamada pode entrar.',
        'The next call can enter.',
        ['the next call can enter', 'that next call can enter'],
        'Can enter é pode entrar.'
      )
    ]
  }
];

export const COLAS = [
  {
    id: 'mesmamaq',
    titulo: 'Mesma máquina',
    emoji: '🧷',
    nivel: 'A2',
    onde: 'O cliente voltou para a mesma máquina.',
    rodadas: [
      fala(
        'Gruda',
        'Where did the client return?',
        'Para onde o cliente voltou?',
        'Diga que o cliente voltou para a mesma máquina.',
        'The client returned to the same machine.',
        ['the client returned to the same machine', 'that client returned to the same machine'],
        'The same machine é a mesma máquina.'
      ),
      fala(
        'Segue',
        'Where should we stick the client?',
        'Onde a gente gruda o cliente?',
        'Peça para grudar o cliente em uma máquina.',
        'Please stick the client to one machine.',
        ['please stick the client to one machine', 'stick the client to one machine'],
        'One machine é uma máquina.'
      )
    ]
  },
  {
    id: 'cola2',
    titulo: 'Cola dois',
    emoji: '🧷',
    nivel: 'B1',
    onde: 'O cliente ficou na máquina dois.',
    rodadas: [
      fala(
        'Gruda',
        'Which machine did the client stay on?',
        'Em qual máquina o cliente ficou?',
        'Diga que o cliente ficou na máquina dois.',
        'The client stayed on machine two.',
        [
          'the client stayed on machine two',
          'the client stayed on machine 2',
          'that client stayed on machine two'
        ],
        'Machine two é a máquina dois.'
      ),
      fala(
        'Segue',
        'Where should we cap the route?',
        'Onde a gente limita o caminho?',
        'Peça para limitar o caminho em duas máquinas.',
        'Please cap the route at two machines.',
        [
          'please cap the route at two machines',
          'please cap the route at 2 machines',
          'cap the route at two machines'
        ],
        'Two machines é duas máquinas.'
      )
    ]
  },
  {
    id: 'colaok',
    titulo: 'Cola firme',
    emoji: '🧷',
    nivel: 'B1',
    onde: 'O cliente achou a máquina dele.',
    rodadas: [
      fala(
        'Gruda',
        'Did the client find its machine?',
        'O cliente achou a máquina dele?',
        'Diga que o cliente achou a máquina dele.',
        'The client found its machine.',
        ['the client found its machine', 'that client found its machine'],
        'Its machine é a máquina dele.'
      ),
      fala(
        'Segue',
        'Can the sticky route stay?',
        'O caminho grudado pode ficar?',
        'Diga que o caminho grudado pode ficar.',
        'The sticky route can stay.',
        ['the sticky route can stay', 'that sticky route can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function tremorPorId(id) {
  return TREMORES.find(c => c.id === id) ?? null;
}

export function portariaPorId(id) {
  return PORTARIAS.find(c => c.id === id) ?? null;
}

export function colaPorId(id) {
  return COLAS.find(c => c.id === id) ?? null;
}

export function avaliarTremor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPortaria(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCola(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
