// Replay de dias, evento repetido e leque de trabalhadores.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const REPLAYS = [
  {
    id: 'diasdois',
    titulo: 'Dois dias',
    emoji: '⏪',
    nivel: 'A2',
    onde: 'Reexecutamos os dois últimos dias.',
    rodadas: [
      fala(
        'Corre',
        'What did we replay?',
        'O que a gente reexecutou?',
        'Diga que reexecutamos os dois últimos dias.',
        'We replayed the last two days.',
        ['we replayed the last two days', 'we replayed those last two days'],
        'The last two days é os dois últimos dias.'
      ),
      fala(
        'Preenche',
        'What should we fill?',
        'O que a gente preenche?',
        'Peça para preencher o buraco antigo.',
        'Please fill the old gap.',
        ['please fill the old gap', 'fill the old gap'],
        'The old gap é o buraco antigo.'
      )
    ]
  },
  {
    id: 'replay2',
    titulo: 'Replay dois',
    emoji: '⏪',
    nivel: 'B1',
    onde: 'O replay cobriu dois dias.',
    rodadas: [
      fala(
        'Corre',
        'How many days did the replay cover?',
        'Quantos dias o replay cobriu?',
        'Diga que o replay cobriu dois dias.',
        'The replay covered two days.',
        [
          'the replay covered two days',
          'the replay covered 2 days',
          'that replay covered two days'
        ],
        'Two days é dois dias.'
      ),
      fala(
        'Preenche',
        'Where should we cap the replay?',
        'Onde a gente limita o replay?',
        'Peça para limitar o replay em dois dias.',
        'Please cap the replay at two days.',
        [
          'please cap the replay at two days',
          'please cap the replay at 2 days',
          'cap the replay at two days'
        ],
        'Cap the replay é limitar o replay.'
      )
    ]
  },
  {
    id: 'replayok',
    titulo: 'Replay quieto',
    emoji: '⏪',
    nivel: 'B1',
    onde: 'O buraco já está cheio.',
    rodadas: [
      fala(
        'Corre',
        'Is the gap full?',
        'O buraco está cheio?',
        'Diga que o buraco já está cheio.',
        'The gap is already full.',
        ['the gap is already full', 'that gap is already full'],
        'Already full é já está cheio.'
      ),
      fala(
        'Preenche',
        'Can the replay stop?',
        'O replay pode parar?',
        'Diga que o replay pode parar.',
        'The replay can stop.',
        ['the replay can stop', 'that replay can stop'],
        'Can stop é pode parar.'
      )
    ]
  }
];

export const ECOS = [
  {
    id: 'eventoduplo',
    titulo: 'Evento duplo',
    emoji: '🔔',
    nivel: 'A2',
    onde: 'O mesmo evento chegou duas vezes.',
    rodadas: [
      fala(
        'Chega',
        'How did the event arrive?',
        'Como o evento chegou?',
        'Diga que o mesmo evento chegou duas vezes.',
        'The same event arrived twice.',
        ['the same event arrived twice', 'that same event arrived twice'],
        'Arrived twice é chegou duas vezes.'
      ),
      fala(
        'Ignora',
        'What should we ignore?',
        'O que a gente ignora?',
        'Peça para ignorar o segundo evento.',
        'Please ignore the second event.',
        ['please ignore the second event', 'ignore the second event'],
        'The second event é o segundo evento.'
      )
    ]
  },
  {
    id: 'chegou2',
    titulo: 'Chegou dois',
    emoji: '🔔',
    nivel: 'B1',
    onde: 'O evento chegou duas vezes.',
    rodadas: [
      fala(
        'Chega',
        'How many times did the event arrive?',
        'Quantas vezes o evento chegou?',
        'Diga que o evento chegou duas vezes.',
        'The event arrived two times.',
        [
          'the event arrived two times',
          'the event arrived 2 times',
          'that event arrived two times'
        ],
        'Two times é duas vezes.'
      ),
      fala(
        'Ignora',
        'Where should we cap the count?',
        'Onde a gente limita a conta?',
        'Peça para limitar a conta em um evento.',
        'Please cap the count at one event.',
        [
          'please cap the count at one event',
          'please cap the count at 1 event',
          'cap the count at one event'
        ],
        'One event é um evento.'
      )
    ]
  },
  {
    id: 'ecook',
    titulo: 'Eco quieto',
    emoji: '🔔',
    nivel: 'B1',
    onde: 'O evento chegou uma vez.',
    rodadas: [
      fala(
        'Chega',
        'Did the event arrive once?',
        'O evento chegou uma vez?',
        'Diga que o evento chegou uma vez.',
        'The event arrived one time.',
        ['the event arrived one time', 'that event arrived one time'],
        'One time é uma vez.'
      ),
      fala(
        'Ignora',
        'Can the count stay?',
        'A conta pode ficar?',
        'Diga que a conta pode ficar.',
        'The count can stay.',
        ['the count can stay', 'that count can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const LEQUES = [
  {
    id: 'quatrotrab',
    titulo: 'Quatro trabalhadores',
    emoji: '🪭',
    nivel: 'A2',
    onde: 'Um evento acordou quatro trabalhadores.',
    rodadas: [
      fala(
        'Acorda',
        'What did one event do?',
        'O que um evento fez?',
        'Diga que um evento acordou quatro trabalhadores.',
        'One event woke four workers.',
        ['one event woke four workers', 'that one event woke four workers'],
        'Four workers é quatro trabalhadores.'
      ),
      fala(
        'Junta',
        'What should we join?',
        'O que a gente junta?',
        'Peça para juntar o resultado dos trabalhadores.',
        'Please join the worker results.',
        ['please join the worker results', 'join the worker results'],
        'The worker results é o resultado dos trabalhadores.'
      )
    ]
  },
  {
    id: 'leque4',
    titulo: 'Leque quatro',
    emoji: '🪭',
    nivel: 'B1',
    onde: 'O leque acordou quatro trabalhadores.',
    rodadas: [
      fala(
        'Acorda',
        'How many workers did the fan wake?',
        'Quantos trabalhadores o leque acordou?',
        'Diga que o leque acordou quatro trabalhadores.',
        'The fan woke four workers.',
        [
          'the fan woke four workers',
          'the fan woke 4 workers',
          'that fan woke four workers'
        ],
        'Four workers é quatro trabalhadores.'
      ),
      fala(
        'Junta',
        'Where should we cap the fan?',
        'Onde a gente limita o leque?',
        'Peça para limitar o leque em quatro trabalhadores.',
        'Please cap the fan at four workers.',
        [
          'please cap the fan at four workers',
          'please cap the fan at 4 workers',
          'cap the fan at four workers'
        ],
        'Cap the fan é limitar o leque.'
      )
    ]
  },
  {
    id: 'lequeok',
    titulo: 'Leque certo',
    emoji: '🪭',
    nivel: 'B1',
    onde: 'Um evento acordou um trabalhador.',
    rodadas: [
      fala(
        'Acorda',
        'Did one event wake one worker?',
        'Um evento acordou um trabalhador?',
        'Diga que um evento acordou um trabalhador.',
        'One event woke one worker.',
        ['one event woke one worker', 'that one event woke one worker'],
        'One worker é um trabalhador.'
      ),
      fala(
        'Junta',
        'Can the workers finish?',
        'Os trabalhadores podem terminar?',
        'Diga que os trabalhadores podem terminar.',
        'The workers can finish.',
        ['the workers can finish', 'those workers can finish'],
        'Can finish é podem terminar.'
      )
    ]
  }
];

export function replayPorId(id) {
  return REPLAYS.find(c => c.id === id) ?? null;
}

export function ecoPorId(id) {
  return ECOS.find(c => c.id === id) ?? null;
}

export function lequePorId(id) {
  return LEQUES.find(c => c.id === id) ?? null;
}

export function avaliarReplay(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEco(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLeque(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
