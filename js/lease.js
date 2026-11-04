// Lease que aluga a trava, renovação que ganha tempo e vencimento que solta.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const LEASES = [
  {
    id: 'leaseuma',
    titulo: 'Uso do lease',
    emoji: '🔑',
    nivel: 'A2',
    onde: 'A trava alugada vale só por um tempo.',
    rodadas: [
      fala(
        'Entra',
        'How long is the lock rented?',
        'Por quanto tempo a trava fica alugada?',
        'Diga que a trava alugada vale só por um tempo.',
        'The rented lock lasts only for a short time.',
        [
          'the rented lock lasts only for a short time',
          'that rented lock lasts only for a short time'
        ],
        'A short time é um tempo curto.'
      ),
      fala(
        'Segue',
        'What should the lock do?',
        'O que a trava deve fazer?',
        'Peça para alugar a trava por um tempo curto.',
        'Please rent the lock for a short time.',
        ['please rent the lock for a short time', 'rent the lock for a short time'],
        'Rent the lock é alugar a trava.'
      )
    ]
  },
  {
    id: 'lease2',
    titulo: 'Lease dois',
    emoji: '🔑',
    nivel: 'B1',
    onde: 'O lease cobriu duas travas.',
    rodadas: [
      fala(
        'Entra',
        'How many locks did the lease cover?',
        'Quantas travas o lease cobriu?',
        'Diga que o lease cobriu duas travas.',
        'The lease covered two locks.',
        [
          'the lease covered two locks',
          'the lease covered 2 locks',
          'that lease covered two locks'
        ],
        'Two locks é duas travas.'
      ),
      fala(
        'Segue',
        'Where should we cap the locks?',
        'Onde a gente limita as travas?',
        'Peça para cobrir duas travas.',
        'Please cover two locks.',
        ['please cover two locks', 'please cover 2 locks', 'cover two locks'],
        'Cover two locks é cobrir duas travas.'
      )
    ]
  },
  {
    id: 'leaseok',
    titulo: 'Lease no alvo',
    emoji: '🔑',
    nivel: 'B1',
    onde: 'O lease pode ficar.',
    rodadas: [
      fala(
        'Entra',
        'Can the lease stay?',
        'O lease pode ficar?',
        'Diga que o lease pode ficar.',
        'The lease can stay.',
        ['the lease can stay', 'that lease can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this lease stay quiet?',
        'Este lease pode ficar quieto?',
        'Diga que este lease pode ficar quieto.',
        'This lease can stay quiet.',
        ['this lease can stay quiet', 'that lease can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const RENOVACOES = [
  {
    id: 'renovabase',
    titulo: 'Ganho da renovação',
    emoji: '🔄',
    nivel: 'A2',
    onde: 'A trava ganha tempo antes de cair.',
    rodadas: [
      fala(
        'Renova',
        'What does the lock gain?',
        'O que a trava ganha?',
        'Diga que a trava ganha tempo antes de cair.',
        'The lock gains time before it drops.',
        [
          'the lock gains time before it drops',
          'that lock gains time before it drops'
        ],
        'Gains time é ganha tempo.'
      ),
      fala(
        'Segue',
        'What should the lock do?',
        'O que a trava deve fazer?',
        'Peça para ganhar tempo antes de cair.',
        'Please gain time before it drops.',
        ['please gain time before it drops', 'gain time before it drops'],
        'Before it drops é antes de cair.'
      )
    ]
  },
  {
    id: 'renova3',
    titulo: 'Renovação três',
    emoji: '🔄',
    nivel: 'B1',
    onde: 'A renovação cobriu três travas.',
    rodadas: [
      fala(
        'Renova',
        'How many locks did the renewal cover?',
        'Quantas travas a renovação cobriu?',
        'Diga que a renovação cobriu três travas.',
        'The renewal covered three locks.',
        [
          'the renewal covered three locks',
          'the renewal covered 3 locks',
          'that renewal covered three locks'
        ],
        'Three locks é três travas.'
      ),
      fala(
        'Segue',
        'Where should we cap the locks?',
        'Onde a gente limita as travas?',
        'Peça para cobrir três travas.',
        'Please cover three locks.',
        ['please cover three locks', 'please cover 3 locks', 'cover three locks'],
        'Cover three locks é cobrir três travas.'
      )
    ]
  },
  {
    id: 'renovaok',
    titulo: 'Renovação no alvo',
    emoji: '🔄',
    nivel: 'B1',
    onde: 'A renovação pode ficar.',
    rodadas: [
      fala(
        'Renova',
        'Can the renewal stay?',
        'A renovação pode ficar?',
        'Diga que a renovação pode ficar.',
        'The renewal can stay.',
        ['the renewal can stay', 'that renewal can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this renewal stay quiet?',
        'Esta renovação pode ficar quieta?',
        'Diga que esta renovação pode ficar quieta.',
        'This renewal can stay quiet.',
        ['this renewal can stay quiet', 'that renewal can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const VENCIMENTOS = [
  {
    id: 'soltavence',
    titulo: 'Fim do vencimento',
    emoji: '⌛',
    nivel: 'A2',
    onde: 'A trava solta quando o tempo acaba.',
    rodadas: [
      fala(
        'Vence',
        'When does the lock let go?',
        'Quando a trava solta?',
        'Diga que a trava solta quando o tempo acaba.',
        'The lock lets go when the time ends.',
        [
          'the lock lets go when the time ends',
          'that lock lets go when the time ends'
        ],
        'Lets go é solta.'
      ),
      fala(
        'Segue',
        'What should the lock do?',
        'O que a trava deve fazer?',
        'Peça para soltar quando o tempo acabar.',
        'Please let go when the time ends.',
        ['please let go when the time ends', 'let go when the time ends'],
        'When the time ends é quando o tempo acaba.'
      )
    ]
  },
  {
    id: 'vence4',
    titulo: 'Vencimento quatro',
    emoji: '⌛',
    nivel: 'B1',
    onde: 'O vencimento fechou quatro travas.',
    rodadas: [
      fala(
        'Vence',
        'How many locks did the expiry close?',
        'Quantas travas o vencimento fechou?',
        'Diga que o vencimento fechou quatro travas.',
        'The expiry closed four locks.',
        [
          'the expiry closed four locks',
          'the expiry closed 4 locks',
          'that expiry closed four locks'
        ],
        'Four locks é quatro travas.'
      ),
      fala(
        'Segue',
        'Where should we cap the locks?',
        'Onde a gente limita as travas?',
        'Peça para fechar quatro travas.',
        'Please close four locks.',
        ['please close four locks', 'please close 4 locks', 'close four locks'],
        'Close four locks é fechar quatro travas.'
      )
    ]
  },
  {
    id: 'venceok',
    titulo: 'Vencimento no alvo',
    emoji: '⌛',
    nivel: 'B1',
    onde: 'O vencimento pode ficar.',
    rodadas: [
      fala(
        'Vence',
        'Can the expiry stay?',
        'O vencimento pode ficar?',
        'Diga que o vencimento pode ficar.',
        'The expiry can stay.',
        ['the expiry can stay', 'that expiry can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this expiry stay quiet?',
        'Este vencimento pode ficar quieto?',
        'Diga que este vencimento pode ficar quieto.',
        'This expiry can stay quiet.',
        ['this expiry can stay quiet', 'that expiry can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function leasePorId(id) {
  return LEASES.find(c => c.id === id) ?? null;
}

export function renovacaoPorId(id) {
  return RENOVACOES.find(c => c.id === id) ?? null;
}

export function vencimentoPorId(id) {
  return VENCIMENTOS.find(c => c.id === id) ?? null;
}

export function avaliarLease(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRenovacao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVencimento(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
