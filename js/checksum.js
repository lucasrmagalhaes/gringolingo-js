// Checksum que confere o bloco, bulkhead que isola o excesso e fallback que entra no lugar.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CHECKSUMS = [
  {
    id: 'checksumbase',
    titulo: 'Soma do checksum',
    emoji: '🧾',
    nivel: 'A2',
    onde: 'A soma confere o bloco inteiro.',
    rodadas: [
      fala(
        'Confere',
        'What does the checksum cover?',
        'O que a soma confere?',
        'Diga que a soma confere o bloco inteiro.',
        'The checksum covers the whole block.',
        [
          'the checksum covers the whole block',
          'that checksum covers the whole block'
        ],
        'The whole block é o bloco inteiro.'
      ),
      fala(
        'Segue',
        'What should the checksum do with the block?',
        'O que a soma deve fazer com o bloco?',
        'Peça para conferir o bloco inteiro.',
        'Please cover the whole block.',
        [
          'please cover the whole block',
          'cover the whole block'
        ],
        'Cover the whole block é conferir o bloco inteiro.'
      )
    ]
  },
  {
    id: 'checksum2',
    titulo: 'Checksum dois',
    emoji: '🧾',
    nivel: 'B1',
    onde: 'A soma conferiu dois blocos.',
    rodadas: [
      fala(
        'Confere',
        'How many blocks did the checksum cover?',
        'Quantos blocos a soma conferiu?',
        'Diga que a soma conferiu dois blocos.',
        'The checksum covered two blocks.',
        [
          'the checksum covered two blocks',
          'the checksum covered 2 blocks',
          'that checksum covered two blocks'
        ],
        'Two blocks é dois blocos.'
      ),
      fala(
        'Segue',
        'Where should we cap the blocks?',
        'Onde a gente limita os blocos?',
        'Peça para conferir dois blocos.',
        'Please cover two blocks.',
        ['please cover two blocks', 'please cover 2 blocks', 'cover two blocks'],
        'Cover two blocks é conferir dois blocos.'
      )
    ]
  },
  {
    id: 'checksumok',
    titulo: 'Checksum no alvo',
    emoji: '🧾',
    nivel: 'B1',
    onde: 'A soma pode ficar.',
    rodadas: [
      fala(
        'Confere',
        'Can the checksum stay?',
        'A soma pode ficar?',
        'Diga que a soma pode ficar.',
        'The checksum can stay.',
        ['the checksum can stay', 'that checksum can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this checksum stay quiet?',
        'Esta soma pode ficar quieta?',
        'Diga que esta soma pode ficar quieta.',
        'This checksum can stay quiet.',
        ['this checksum can stay quiet', 'that checksum can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const BULKHEADS = [
  {
    id: 'bulkheadbase',
    titulo: 'Parede do bulkhead',
    emoji: '🛡️',
    nivel: 'A2',
    onde: 'A parede isola o excesso.',
    rodadas: [
      fala(
        'Isola',
        'What does the bulkhead isolate?',
        'O que a parede isola?',
        'Diga que a parede isola o excesso.',
        'The bulkhead isolates the extra load.',
        [
          'the bulkhead isolates the extra load',
          'that bulkhead isolates the extra load'
        ],
        'The extra load é o excesso.'
      ),
      fala(
        'Segue',
        'What should the bulkhead do with the load?',
        'O que a parede deve fazer com o excesso?',
        'Peça para isolar o excesso.',
        'Please isolate the extra load.',
        [
          'please isolate the extra load',
          'isolate the extra load'
        ],
        'Isolate the extra load é isolar o excesso.'
      )
    ]
  },
  {
    id: 'bulkhead3',
    titulo: 'Bulkhead três',
    emoji: '🛡️',
    nivel: 'B1',
    onde: 'A parede isolou três excessos.',
    rodadas: [
      fala(
        'Isola',
        'How many loads did the bulkhead isolate?',
        'Quantos excessos a parede isolou?',
        'Diga que a parede isolou três excessos.',
        'The bulkhead isolated three loads.',
        [
          'the bulkhead isolated three loads',
          'the bulkhead isolated 3 loads',
          'that bulkhead isolated three loads'
        ],
        'Three loads é três excessos.'
      ),
      fala(
        'Segue',
        'Where should we cap the loads?',
        'Onde a gente limita os excessos?',
        'Peça para isolar três excessos.',
        'Please isolate three loads.',
        ['please isolate three loads', 'please isolate 3 loads', 'isolate three loads'],
        'Isolate three loads é isolar três excessos.'
      )
    ]
  },
  {
    id: 'bulkheadok',
    titulo: 'Bulkhead no alvo',
    emoji: '🛡️',
    nivel: 'B1',
    onde: 'A parede pode ficar.',
    rodadas: [
      fala(
        'Isola',
        'Can the bulkhead stay?',
        'A parede pode ficar?',
        'Diga que a parede pode ficar.',
        'The bulkhead can stay.',
        ['the bulkhead can stay', 'that bulkhead can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this bulkhead stay quiet?',
        'Esta parede pode ficar quieta?',
        'Diga que esta parede pode ficar quieta.',
        'This bulkhead can stay quiet.',
        ['this bulkhead can stay quiet', 'that bulkhead can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const FALLBACKS = [
  {
    id: 'fallbackbase',
    titulo: 'Plano do fallback',
    emoji: '🛟',
    nivel: 'A2',
    onde: 'O plano reserva entra no lugar.',
    rodadas: [
      fala(
        'Entra',
        'What does the fallback take?',
        'O que o plano reserva assume?',
        'Diga que o plano reserva entra no lugar.',
        'The fallback takes the reserved plan.',
        [
          'the fallback takes the reserved plan',
          'that fallback takes the reserved plan'
        ],
        'The reserved plan é o plano reserva.'
      ),
      fala(
        'Segue',
        'What should the fallback do with the plan?',
        'O que o plano reserva deve fazer?',
        'Peça para entrar no lugar.',
        'Please take the reserved plan.',
        [
          'please take the reserved plan',
          'take the reserved plan'
        ],
        'Take the reserved plan é entrar no lugar.'
      )
    ]
  },
  {
    id: 'fallback4',
    titulo: 'Fallback quatro',
    emoji: '🛟',
    nivel: 'B1',
    onde: 'O plano reserva entrou quatro vezes.',
    rodadas: [
      fala(
        'Entra',
        'How many plans did the fallback take?',
        'Quantos planos o reserva assumiu?',
        'Diga que o plano reserva entrou quatro vezes.',
        'The fallback took four plans.',
        [
          'the fallback took four plans',
          'the fallback took 4 plans',
          'that fallback took four plans'
        ],
        'Four plans é quatro planos.'
      ),
      fala(
        'Segue',
        'Where should we cap the plans?',
        'Onde a gente limita os planos?',
        'Peça para assumir quatro planos.',
        'Please take four plans.',
        ['please take four plans', 'please take 4 plans', 'take four plans'],
        'Take four plans é assumir quatro planos.'
      )
    ]
  },
  {
    id: 'fallbackok',
    titulo: 'Fallback no alvo',
    emoji: '🛟',
    nivel: 'B1',
    onde: 'O plano reserva pode ficar.',
    rodadas: [
      fala(
        'Entra',
        'Can the fallback stay?',
        'O plano reserva pode ficar?',
        'Diga que o plano reserva pode ficar.',
        'The fallback can stay.',
        ['the fallback can stay', 'that fallback can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this fallback stay quiet?',
        'Este plano reserva pode ficar quieto?',
        'Diga que este plano reserva pode ficar quieto.',
        'This fallback can stay quiet.',
        ['this fallback can stay quiet', 'that fallback can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function checksumPorId(id) {
  return CHECKSUMS.find(c => c.id === id) ?? null;
}

export function bulkheadPorId(id) {
  return BULKHEADS.find(c => c.id === id) ?? null;
}

export function fallbackPorId(id) {
  return FALLBACKS.find(c => c.id === id) ?? null;
}

export function avaliarChecksum(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBulkhead(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFallback(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
