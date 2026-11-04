// Piscina sem vaga, balde de fichas vazio e cerca que invalida o dono antigo.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PISCINAS = [
  {
    id: 'semvaga',
    titulo: 'Sem vaga',
    emoji: '🏊',
    nivel: 'A2',
    onde: 'A piscina de conexões ficou sem vaga.',
    rodadas: [
      fala(
        'Lotou',
        'What did the pool run out of?',
        'Do que a piscina ficou sem?',
        'Diga que a piscina ficou sem vagas livres.',
        'The pool ran out of free slots.',
        ['the pool ran out of free slots', 'that pool ran out of free slots'],
        'Free slots é vagas livres.'
      ),
      fala(
        'Abre',
        'What should we free?',
        'O que a gente libera?',
        'Peça para liberar uma conexão.',
        'Please free one connection.',
        ['please free one connection', 'free one connection'],
        'One connection é uma conexão.'
      )
    ]
  },
  {
    id: 'piscina0',
    titulo: 'Piscina zero',
    emoji: '🏊',
    nivel: 'B1',
    onde: 'A piscina segurou zero vagas livres.',
    rodadas: [
      fala(
        'Lotou',
        'How many free slots did the pool hold?',
        'Quantas vagas livres a piscina segurou?',
        'Diga que a piscina segurou zero vagas livres.',
        'The pool held zero free slots.',
        [
          'the pool held zero free slots',
          'the pool held 0 free slots',
          'that pool held zero free slots'
        ],
        'Zero free slots é zero vagas livres.'
      ),
      fala(
        'Abre',
        'Where should we cap the pool?',
        'Onde a gente limita a piscina?',
        'Peça para limitar a piscina em dez conexões.',
        'Please cap the pool at ten connections.',
        [
          'please cap the pool at ten connections',
          'please cap the pool at 10 connections',
          'cap the pool at ten connections'
        ],
        'Ten connections é dez conexões.'
      )
    ]
  },
  {
    id: 'piscinaok',
    titulo: 'Piscina com vaga',
    emoji: '🏊',
    nivel: 'B1',
    onde: 'A piscina tem uma vaga livre.',
    rodadas: [
      fala(
        'Lotou',
        'Does the pool have a free slot?',
        'A piscina tem uma vaga livre?',
        'Diga que a piscina tem uma vaga livre.',
        'The pool has a free slot.',
        ['the pool has a free slot', 'that pool has a free slot'],
        'A free slot é uma vaga livre.'
      ),
      fala(
        'Abre',
        'Can the next call connect?',
        'A próxima chamada pode conectar?',
        'Diga que a próxima chamada pode conectar.',
        'The next call can connect.',
        ['the next call can connect', 'that next call can connect'],
        'Can connect é pode conectar.'
      )
    ]
  }
];

export const BALDES = [
  {
    id: 'fichavazia',
    titulo: 'Ficha vazia',
    emoji: '🪣',
    nivel: 'A2',
    onde: 'O balde de fichas esvaziou.',
    rodadas: [
      fala(
        'Gasta',
        'What did the bucket run out of?',
        'Do que o balde ficou sem?',
        'Diga que o balde ficou sem fichas.',
        'The bucket ran out of tokens.',
        ['the bucket ran out of tokens', 'that bucket ran out of tokens'],
        'Tokens é fichas.'
      ),
      fala(
        'Repõe',
        'What should we refill?',
        'O que a gente repõe?',
        'Peça para repor o balde de fichas.',
        'Please refill the token bucket.',
        ['please refill the token bucket', 'refill the token bucket'],
        'Refill é repor.'
      )
    ]
  },
  {
    id: 'balde0',
    titulo: 'Balde zero',
    emoji: '🪣',
    nivel: 'B1',
    onde: 'O balde segurou zero fichas.',
    rodadas: [
      fala(
        'Gasta',
        'How many tokens did the bucket hold?',
        'Quantas fichas o balde segurou?',
        'Diga que o balde segurou zero fichas.',
        'The bucket held zero tokens.',
        [
          'the bucket held zero tokens',
          'the bucket held 0 tokens',
          'that bucket held zero tokens'
        ],
        'Zero tokens é zero fichas.'
      ),
      fala(
        'Repõe',
        'Where should we cap the bucket?',
        'Onde a gente limita o balde?',
        'Peça para limitar o balde em dez fichas.',
        'Please cap the bucket at ten tokens.',
        [
          'please cap the bucket at ten tokens',
          'please cap the bucket at 10 tokens',
          'cap the bucket at ten tokens'
        ],
        'Ten tokens é dez fichas.'
      )
    ]
  },
  {
    id: 'baldeok',
    titulo: 'Balde cheio',
    emoji: '🪣',
    nivel: 'B1',
    onde: 'O balde encheu de novo.',
    rodadas: [
      fala(
        'Gasta',
        'Is the bucket full again?',
        'O balde encheu de novo?',
        'Diga que o balde encheu de novo.',
        'The bucket is full again.',
        ['the bucket is full again', 'that bucket is full again'],
        'Full again é encheu de novo.'
      ),
      fala(
        'Repõe',
        'Can the client try again?',
        'O cliente pode tentar de novo?',
        'Diga que o cliente pode tentar de novo.',
        'The client can try again.',
        ['the client can try again', 'that client can try again'],
        'Try again é tentar de novo.'
      )
    ]
  }
];

export const CERCAS = [
  {
    id: 'donoantigo',
    titulo: 'Dono antigo',
    emoji: '🚧',
    nivel: 'A2',
    onde: 'Um número maior barrou o dono antigo.',
    rodadas: [
      fala(
        'Invalida',
        'What did a higher number do?',
        'O que um número maior fez?',
        'Diga que um número maior barrou o dono antigo.',
        'A higher number blocked the old owner.',
        ['a higher number blocked the old owner', 'the higher number blocked the old owner'],
        'The old owner é o dono antigo.'
      ),
      fala(
        'Troca',
        'What should we raise?',
        'O que a gente aumenta?',
        'Peça para aumentar o número da cerca.',
        'Please raise the fence number.',
        ['please raise the fence number', 'raise the fence number'],
        'The fence number é o número da cerca.'
      )
    ]
  },
  {
    id: 'cerca9',
    titulo: 'Cerca nove',
    emoji: '🚧',
    nivel: 'B1',
    onde: 'A cerca parou no número nove.',
    rodadas: [
      fala(
        'Invalida',
        'Where did the fence stop?',
        'Onde a cerca parou?',
        'Diga que a cerca parou no número nove.',
        'The fence stopped at number nine.',
        [
          'the fence stopped at number nine',
          'the fence stopped at number 9',
          'that fence stopped at number nine'
        ],
        'Number nine é o número nove.'
      ),
      fala(
        'Troca',
        'Where should we cap the fence?',
        'Onde a gente limita a cerca?',
        'Peça para limitar a cerca em nove.',
        'Please cap the fence at nine.',
        [
          'please cap the fence at nine',
          'please cap the fence at 9',
          'cap the fence at nine'
        ],
        'Cap the fence é limitar a cerca.'
      )
    ]
  },
  {
    id: 'cercaok',
    titulo: 'Cerca firme',
    emoji: '🚧',
    nivel: 'B1',
    onde: 'O dono novo segura a cerca.',
    rodadas: [
      fala(
        'Invalida',
        'Who holds the fence?',
        'Quem segura a cerca?',
        'Diga que o dono novo segura a cerca.',
        'The new owner holds the fence.',
        ['the new owner holds the fence', 'that new owner holds the fence'],
        'Holds the fence é segura a cerca.'
      ),
      fala(
        'Troca',
        'Can the old write stay out?',
        'A escrita antiga pode ficar de fora?',
        'Diga que a escrita antiga pode ficar de fora.',
        'The old write can stay out.',
        ['the old write can stay out', 'that old write can stay out'],
        'Stay out é ficar de fora.'
      )
    ]
  }
];

export function piscinaPorId(id) {
  return PISCINAS.find(c => c.id === id) ?? null;
}

export function baldePorId(id) {
  return BALDES.find(c => c.id === id) ?? null;
}

export function cercaPorId(id) {
  return CERCAS.find(c => c.id === id) ?? null;
}

export function avaliarPiscina(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBalde(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCerca(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
