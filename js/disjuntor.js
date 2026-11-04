// Disjuntor que abre, aluguel que vence e pulso que some.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const DISJUNTORES = [
  {
    id: 'cincovez',
    titulo: 'Cinco falhas',
    emoji: '🛑',
    nivel: 'A2',
    onde: 'Cinco falhas seguidas abriram o disjuntor.',
    rodadas: [
      fala(
        'Abre',
        'What did five failures do?',
        'O que cinco falhas fizeram?',
        'Diga que o disjuntor abriu depois de cinco falhas.',
        'The circuit opened after five failures.',
        ['the circuit opened after five failures', 'that circuit opened after five failures'],
        'Five failures é cinco falhas.'
      ),
      fala(
        'Fecha',
        'What should we close?',
        'O que a gente fecha?',
        'Peça para fechar o disjuntor aberto.',
        'Please close the open circuit.',
        ['please close the open circuit', 'close the open circuit'],
        'The open circuit é o disjuntor aberto.'
      )
    ]
  },
  {
    id: 'disjuntor5',
    titulo: 'Disjuntor cinco',
    emoji: '🛑',
    nivel: 'B1',
    onde: 'O disjuntor abriu depois de cinco falhas.',
    rodadas: [
      fala(
        'Abre',
        'When did the breaker open?',
        'Quando o disjuntor abriu?',
        'Diga que o disjuntor abriu depois de cinco falhas.',
        'The breaker opened after five failures.',
        [
          'the breaker opened after five failures',
          'the breaker opened after 5 failures',
          'that breaker opened after five failures'
        ],
        'Five failures é cinco falhas.'
      ),
      fala(
        'Fecha',
        'Where should we cap the failures?',
        'Onde a gente limita as falhas?',
        'Peça para limitar as falhas em cinco.',
        'Please cap the failures at five.',
        [
          'please cap the failures at five',
          'please cap the failures at 5',
          'cap the failures at five'
        ],
        'Cap the failures é limitar as falhas.'
      )
    ]
  },
  {
    id: 'disjuntorok',
    titulo: 'Disjuntor fechado',
    emoji: '🛑',
    nivel: 'B1',
    onde: 'O disjuntor fechou de novo.',
    rodadas: [
      fala(
        'Abre',
        'Is the circuit closed again?',
        'O disjuntor fechou de novo?',
        'Diga que o disjuntor fechou de novo.',
        'The circuit is closed again.',
        ['the circuit is closed again', 'that circuit is closed again'],
        'Closed again é fechou de novo.'
      ),
      fala(
        'Fecha',
        'Can the calls pass?',
        'As chamadas podem passar?',
        'Diga que as chamadas podem passar.',
        'The calls can pass.',
        ['the calls can pass', 'those calls can pass'],
        'Can pass é podem passar.'
      )
    ]
  }
];

export const ALUGUEIS = [
  {
    id: 'trintaseg',
    titulo: 'Trinta segundos',
    emoji: '🔑',
    nivel: 'A2',
    onde: 'O aluguel venceu depois de trinta segundos.',
    rodadas: [
      fala(
        'Vence',
        'When did the lease expire?',
        'Quando o aluguel venceu?',
        'Diga que o aluguel venceu depois de trinta segundos.',
        'The lease expired after thirty seconds.',
        ['the lease expired after thirty seconds', 'that lease expired after thirty seconds'],
        'Thirty seconds é trinta segundos.'
      ),
      fala(
        'Renova',
        'What should we renew?',
        'O que a gente renova?',
        'Peça para renovar o aluguel agora.',
        'Please renew the lease now.',
        ['please renew the lease now', 'renew the lease now'],
        'Renew the lease é renovar o aluguel.'
      )
    ]
  },
  {
    id: 'aluguel30',
    titulo: 'Aluguel trinta',
    emoji: '🔑',
    nivel: 'B1',
    onde: 'O aluguel venceu depois de trinta segundos.',
    rodadas: [
      fala(
        'Vence',
        'When did the lease expire?',
        'Quando o aluguel venceu?',
        'Diga que o aluguel venceu depois de trinta segundos.',
        'The lease expired after thirty seconds.',
        [
          'the lease expired after thirty seconds',
          'the lease expired after 30 seconds',
          'that lease expired after thirty seconds'
        ],
        'Thirty seconds é trinta segundos.'
      ),
      fala(
        'Renova',
        'Where should we cap the lease?',
        'Onde a gente limita o aluguel?',
        'Peça para limitar o aluguel em trinta segundos.',
        'Please cap the lease at thirty seconds.',
        [
          'please cap the lease at thirty seconds',
          'please cap the lease at 30 seconds',
          'cap the lease at thirty seconds'
        ],
        'Cap the lease é limitar o aluguel.'
      )
    ]
  },
  {
    id: 'aluguelok',
    titulo: 'Aluguel renovado',
    emoji: '🔑',
    nivel: 'B1',
    onde: 'O aluguel foi renovado a tempo.',
    rodadas: [
      fala(
        'Vence',
        'Was the lease renewed in time?',
        'O aluguel foi renovado a tempo?',
        'Diga que o aluguel foi renovado a tempo.',
        'The lease was renewed in time.',
        ['the lease was renewed in time', 'that lease was renewed in time'],
        'In time é a tempo.'
      ),
      fala(
        'Renova',
        'Can the holder stay?',
        'Quem segura pode ficar?',
        'Diga que quem segura pode ficar.',
        'The holder can stay.',
        ['the holder can stay', 'that holder can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const PULSOS = [
  {
    id: 'tresbat',
    titulo: 'Três pulsos',
    emoji: '💓',
    nivel: 'A2',
    onde: 'O nó perdeu três pulsos.',
    rodadas: [
      fala(
        'Perde',
        'What did the node miss?',
        'O que o nó perdeu?',
        'Diga que o nó perdeu três pulsos.',
        'The node missed three heartbeats.',
        ['the node missed three heartbeats', 'that node missed three heartbeats'],
        'Three heartbeats é três pulsos.'
      ),
      fala(
        'Retoma',
        'What should we count?',
        'O que a gente conta?',
        'Peça para contar os pulsos perdidos.',
        'Please count the missed beats.',
        ['please count the missed beats', 'count the missed beats'],
        'Missed beats é pulsos perdidos.'
      )
    ]
  },
  {
    id: 'pulso3',
    titulo: 'Pulso três',
    emoji: '💓',
    nivel: 'B1',
    onde: 'O nó perdeu três pulsos.',
    rodadas: [
      fala(
        'Perde',
        'How many heartbeats did the node miss?',
        'Quantos pulsos o nó perdeu?',
        'Diga que o nó perdeu três pulsos.',
        'The node missed three heartbeats.',
        [
          'the node missed three heartbeats',
          'the node missed 3 heartbeats',
          'that node missed three heartbeats'
        ],
        'Three heartbeats é três pulsos.'
      ),
      fala(
        'Retoma',
        'Where should we cap the misses?',
        'Onde a gente limita as perdas?',
        'Peça para limitar as perdas em três pulsos.',
        'Please cap the misses at three beats.',
        [
          'please cap the misses at three beats',
          'please cap the misses at 3 beats',
          'cap the misses at three beats'
        ],
        'Three beats é três pulsos.'
      )
    ]
  },
  {
    id: 'pulsook',
    titulo: 'Pulso no alvo',
    emoji: '💓',
    nivel: 'B1',
    onde: 'Os pulsos voltaram no tempo certo.',
    rodadas: [
      fala(
        'Perde',
        'Are the heartbeats on time?',
        'Os pulsos estão no tempo certo?',
        'Diga que os pulsos estão no tempo certo.',
        'The heartbeats are on time.',
        ['the heartbeats are on time', 'those heartbeats are on time'],
        'On time é no tempo certo.'
      ),
      fala(
        'Retoma',
        'Can the node stay?',
        'O nó pode ficar?',
        'Diga que o nó pode ficar.',
        'The node can stay.',
        ['the node can stay', 'that node can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function disjuntorPorId(id) {
  return DISJUNTORES.find(c => c.id === id) ?? null;
}

export function aluguelPorId(id) {
  return ALUGUEIS.find(c => c.id === id) ?? null;
}

export function pulsoPorId(id) {
  return PULSOS.find(c => c.id === id) ?? null;
}

export function avaliarDisjuntor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAluguel(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPulso(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
