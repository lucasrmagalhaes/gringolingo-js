// Semáforo de duas vagas, barreira dos quatro e trinco que zera a conta.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SEMAFOROS = [
  {
    id: 'duavaga',
    titulo: 'Duas vagas',
    emoji: '🚦',
    nivel: 'A2',
    onde: 'Só duas vagas passam juntas.',
    rodadas: [
      fala(
        'Entra',
        'How many jobs can pass together?',
        'Quantos trabalhos passam juntos?',
        'Diga que só dois trabalhos passam juntos.',
        'Only two jobs can pass together.',
        ['only two jobs can pass together', 'only 2 jobs can pass together'],
        'Two jobs é dois trabalhos.'
      ),
      fala(
        'Solta',
        'What should we do with the next job?',
        'O que a gente faz com o próximo trabalho?',
        'Peça para segurar o próximo trabalho.',
        'Please hold the next job.',
        ['please hold the next job', 'hold the next job'],
        'Hold the next job é segurar o próximo trabalho.'
      )
    ]
  },
  {
    id: 'semaforo2',
    titulo: 'Semáforo dois',
    emoji: '🚦',
    nivel: 'B1',
    onde: 'O semáforo segurou duas vagas.',
    rodadas: [
      fala(
        'Entra',
        'How many permits did the semaphore hold?',
        'Quantas vagas o semáforo segurou?',
        'Diga que o semáforo segurou duas vagas.',
        'The semaphore held two permits.',
        [
          'the semaphore held two permits',
          'the semaphore held 2 permits',
          'that semaphore held two permits'
        ],
        'Two permits é duas vagas.'
      ),
      fala(
        'Solta',
        'Where should we cap the permits?',
        'Onde a gente limita as vagas?',
        'Peça para limitar as vagas em duas.',
        'Please cap the permits at two.',
        [
          'please cap the permits at two',
          'please cap the permits at 2',
          'cap the permits at two'
        ],
        'Cap the permits é limitar as vagas.'
      )
    ]
  },
  {
    id: 'semaforook',
    titulo: 'Semáforo no alvo',
    emoji: '🚦',
    nivel: 'B1',
    onde: 'A vaga livre pode entrar.',
    rodadas: [
      fala(
        'Entra',
        'Can the free permit enter?',
        'A vaga livre pode entrar?',
        'Diga que a vaga livre pode entrar.',
        'The free permit can enter.',
        ['the free permit can enter', 'that free permit can enter'],
        'Can enter é pode entrar.'
      ),
      fala(
        'Solta',
        'Can this job stay in line?',
        'Este trabalho pode ficar na fila?',
        'Diga que este trabalho pode ficar na fila.',
        'This job can stay in line.',
        ['this job can stay in line', 'that job can stay in line'],
        'Stay in line é ficar na fila.'
      )
    ]
  }
];

export const BARREIRAS = [
  {
    id: 'quatropessoa',
    titulo: 'Quatro pessoas',
    emoji: '🏁',
    nivel: 'A2',
    onde: 'Os quatro precisam chegar juntos.',
    rodadas: [
      fala(
        'Chega',
        'How many people must arrive?',
        'Quantas pessoas precisam chegar?',
        'Diga que os quatro precisam chegar juntos.',
        'All four people must arrive together.',
        ['all four people must arrive together', 'all 4 people must arrive together'],
        'Four people é quatro pessoas.'
      ),
      fala(
        'Segue',
        'What should we do until they arrive?',
        'O que a gente faz até eles chegarem?',
        'Peça para esperar os quatro chegarem.',
        'Please wait until all four arrive.',
        ['please wait until all four arrive', 'wait until all four arrive'],
        'Wait until they arrive é esperar eles chegarem.'
      )
    ]
  },
  {
    id: 'barreira4',
    titulo: 'Barreira quatro',
    emoji: '🏁',
    nivel: 'B1',
    onde: 'A barreira esperou quatro pessoas.',
    rodadas: [
      fala(
        'Chega',
        'How many people did the barrier wait for?',
        'Quantas pessoas a barreira esperou?',
        'Diga que a barreira esperou quatro pessoas.',
        'The barrier waited for four people.',
        [
          'the barrier waited for four people',
          'the barrier waited for 4 people',
          'that barrier waited for four people'
        ],
        'Four people é quatro pessoas.'
      ),
      fala(
        'Segue',
        'Where should we cap the barrier?',
        'Onde a gente limita a barreira?',
        'Peça para limitar a barreira em quatro pessoas.',
        'Please cap the barrier at four people.',
        [
          'please cap the barrier at four people',
          'please cap the barrier at 4 people',
          'cap the barrier at four people'
        ],
        'Cap the barrier é limitar a barreira.'
      )
    ]
  },
  {
    id: 'barreiraok',
    titulo: 'Barreira no alvo',
    emoji: '🏁',
    nivel: 'B1',
    onde: 'O grupo pode seguir agora.',
    rodadas: [
      fala(
        'Chega',
        'Can the group move now?',
        'O grupo pode seguir agora?',
        'Diga que o grupo pode seguir agora.',
        'The group can move now.',
        ['the group can move now', 'that group can move now'],
        'Move now é seguir agora.'
      ),
      fala(
        'Segue',
        'Can the late person stay out?',
        'A pessoa atrasada pode ficar de fora?',
        'Diga que a pessoa atrasada pode ficar de fora.',
        'The late person can stay out.',
        ['the late person can stay out', 'that late person can stay out'],
        'Stay out é ficar de fora.'
      )
    ]
  }
];

export const TRINCOS = [
  {
    id: 'contazera',
    titulo: 'Conta zera',
    emoji: '🪝',
    nivel: 'A2',
    onde: 'O trinco abre quando a conta zera.',
    rodadas: [
      fala(
        'Desce',
        'When does the latch open?',
        'Quando o trinco abre?',
        'Diga que o trinco abre quando a conta zera.',
        'The latch opens when the count hits zero.',
        ['the latch opens when the count hits zero', 'the latch opens when the count hits 0'],
        'Hits zero é chega a zero.'
      ),
      fala(
        'Abre',
        'What should we do with the count?',
        'O que a gente faz com a conta?',
        'Peça para baixar a conta até zero.',
        'Please drop the count to zero.',
        ['please drop the count to zero', 'please drop the count to 0', 'drop the count to zero'],
        'Drop the count é baixar a conta.'
      )
    ]
  },
  {
    id: 'trinco0',
    titulo: 'Trinco zero',
    emoji: '🪝',
    nivel: 'B1',
    onde: 'O trinco chegou na conta zero.',
    rodadas: [
      fala(
        'Desce',
        'What count did the latch reach?',
        'Em qual conta o trinco chegou?',
        'Diga que o trinco chegou na conta zero.',
        'The latch reached count zero.',
        [
          'the latch reached count zero',
          'the latch reached count 0',
          'that latch reached count zero'
        ],
        'Count zero é a conta zero.'
      ),
      fala(
        'Abre',
        'Where should we stop the latch?',
        'Onde a gente para o trinco?',
        'Peça para parar o trinco no zero.',
        'Please stop the latch at zero.',
        [
          'please stop the latch at zero',
          'please stop the latch at 0',
          'stop the latch at zero'
        ],
        'Stop the latch é parar o trinco.'
      )
    ]
  },
  {
    id: 'trincook',
    titulo: 'Trinco no alvo',
    emoji: '🪝',
    nivel: 'B1',
    onde: 'O grupo inteiro pode sair.',
    rodadas: [
      fala(
        'Desce',
        'Can the whole group leave?',
        'O grupo inteiro pode sair?',
        'Diga que o grupo inteiro pode sair.',
        'The whole group can leave.',
        ['the whole group can leave', 'that whole group can leave'],
        'Can leave é pode sair.'
      ),
      fala(
        'Abre',
        'Can the open latch stay?',
        'O trinco aberto pode ficar?',
        'Diga que o trinco aberto pode ficar.',
        'The open latch can stay.',
        ['the open latch can stay', 'that open latch can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function semaforoPorId(id) {
  return SEMAFOROS.find(c => c.id === id) ?? null;
}

export function barreiraPorId(id) {
  return BARREIRAS.find(c => c.id === id) ?? null;
}

export function trincoPorId(id) {
  return TRINCOS.find(c => c.id === id) ?? null;
}

export function avaliarSemaforo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBarreira(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarTrinco(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
