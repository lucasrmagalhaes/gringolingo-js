// Sujeira que lê o valor aberto, instantâneo que congela o banco e serial que cabe numa ordem.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SUJEIRAS = [
  {
    id: 'pegavalor',
    titulo: 'Leitura da sujeira',
    emoji: '🫧',
    nivel: 'A2',
    onde: 'A leitura pega um valor que ainda não fechou.',
    rodadas: [
      fala(
        'Pega',
        'What does the dirty read see?',
        'O que a leitura suja vê?',
        'Diga que a leitura vê um valor que não fechou.',
        'The read sees a value that is not committed.',
        [
          'the read sees a value that is not committed',
          'that read sees a value that is not committed'
        ],
        'Not committed é que não fechou.'
      ),
      fala(
        'Espera',
        'What should the read do?',
        'O que a leitura deve fazer?',
        'Peça para ler o valor aberto.',
        'Please read the open value.',
        ['please read the open value', 'read the open value'],
        'The open value é o valor aberto.'
      )
    ]
  },
  {
    id: 'sujeira2',
    titulo: 'Sujeira dois',
    emoji: '🫧',
    nivel: 'B1',
    onde: 'A leitura suja viu dois valores.',
    rodadas: [
      fala(
        'Pega',
        'How many values did the dirty read see?',
        'Quantos valores a leitura suja viu?',
        'Diga que a leitura suja viu dois valores.',
        'The dirty read saw two values.',
        [
          'the dirty read saw two values',
          'the dirty read saw 2 values',
          'that dirty read saw two values'
        ],
        'Two values é dois valores.'
      ),
      fala(
        'Espera',
        'Where should we cap the values?',
        'Onde a gente limita os valores?',
        'Peça para ver dois valores.',
        'Please see two values.',
        [
          'please see two values',
          'please see 2 values',
          'see two values'
        ],
        'See two values é ver dois valores.'
      )
    ]
  },
  {
    id: 'sujeiraok',
    titulo: 'Sujeira no alvo',
    emoji: '🫧',
    nivel: 'B1',
    onde: 'A leitura suja pode ficar.',
    rodadas: [
      fala(
        'Pega',
        'Can the dirty read stay?',
        'A leitura suja pode ficar?',
        'Diga que a leitura suja pode ficar.',
        'The dirty read can stay.',
        ['the dirty read can stay', 'that dirty read can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Espera',
        'Can this dirty read stay open?',
        'Esta leitura suja pode ficar aberta?',
        'Diga que esta leitura suja pode ficar aberta.',
        'This dirty read can stay open.',
        ['this dirty read can stay open', 'that dirty read can stay open'],
        'Stay open é ficar aberta.'
      )
    ]
  }
];

export const INSTANTANEOS = [
  {
    id: 'congela',
    titulo: 'Foto do instantâneo',
    emoji: '📸',
    nivel: 'A2',
    onde: 'A consulta olha o banco parado na abertura.',
    rodadas: [
      fala(
        'Congela',
        'What does the snapshot freeze?',
        'O que o instantâneo congela?',
        'Diga que o instantâneo congela as linhas no começo.',
        'The snapshot freezes the rows at the start.',
        [
          'the snapshot freezes the rows at the start',
          'that snapshot freezes the rows at the start'
        ],
        'The snapshot é o instantâneo.'
      ),
      fala(
        'Segue',
        'What should the snapshot do?',
        'O que o instantâneo deve fazer?',
        'Peça para congelar as linhas.',
        'Please freeze the rows.',
        ['please freeze the rows', 'freeze the rows'],
        'Freeze the rows é congelar as linhas.'
      )
    ]
  },
  {
    id: 'instantaneo3',
    titulo: 'Instantâneo três',
    emoji: '📸',
    nivel: 'B1',
    onde: 'O instantâneo congelou três linhas.',
    rodadas: [
      fala(
        'Congela',
        'How many rows did the snapshot freeze?',
        'Quantas linhas o instantâneo congelou?',
        'Diga que o instantâneo congelou três linhas.',
        'The snapshot froze three rows.',
        [
          'the snapshot froze three rows',
          'the snapshot froze 3 rows',
          'that snapshot froze three rows'
        ],
        'Three rows é três linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para congelar três linhas.',
        'Please freeze three rows.',
        [
          'please freeze three rows',
          'please freeze 3 rows',
          'freeze three rows'
        ],
        'Freeze three rows é congelar três linhas.'
      )
    ]
  },
  {
    id: 'instantaneook',
    titulo: 'Instantâneo no alvo',
    emoji: '📸',
    nivel: 'B1',
    onde: 'O instantâneo pode ficar.',
    rodadas: [
      fala(
        'Congela',
        'Can the snapshot stay?',
        'O instantâneo pode ficar?',
        'Diga que o instantâneo pode ficar.',
        'The snapshot can stay.',
        ['the snapshot can stay', 'that snapshot can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this snapshot stay quiet?',
        'Este instantâneo pode ficar quieto?',
        'Diga que este instantâneo pode ficar quieto.',
        'This snapshot can stay quiet.',
        ['this snapshot can stay quiet', 'that snapshot can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const SERIAIS = [
  {
    id: 'ordemserial',
    titulo: 'Ordem do serial',
    emoji: '🔢',
    nivel: 'A2',
    onde: 'O resultado cabe numa ordem só de transações.',
    rodadas: [
      fala(
        'Ordena',
        'What does the result match?',
        'Com o que o resultado combina?',
        'Diga que o resultado combina com uma ordem serial.',
        'The result matches one serial order.',
        ['the result matches one serial order', 'that result matches one serial order'],
        'One serial order é uma ordem serial.'
      ),
      fala(
        'Fecha',
        'What should the result do?',
        'O que o resultado deve fazer?',
        'Peça para combinar com uma ordem.',
        'Please match one order.',
        ['please match one order', 'match one order'],
        'Match one order é combinar com uma ordem.'
      )
    ]
  },
  {
    id: 'serial4',
    titulo: 'Serial quatro',
    emoji: '🔢',
    nivel: 'B1',
    onde: 'A ordem cobriu quatro transações.',
    rodadas: [
      fala(
        'Ordena',
        'How many transactions did the order cover?',
        'Quantas transações a ordem cobriu?',
        'Diga que a ordem cobriu quatro transações.',
        'The order covered four transactions.',
        [
          'the order covered four transactions',
          'the order covered 4 transactions',
          'that order covered four transactions'
        ],
        'Four transactions é quatro transações.'
      ),
      fala(
        'Fecha',
        'Where should we cap the transactions?',
        'Onde a gente limita as transações?',
        'Peça para cobrir quatro transações.',
        'Please cover four transactions.',
        [
          'please cover four transactions',
          'please cover 4 transactions',
          'cover four transactions'
        ],
        'Cover four transactions é cobrir quatro transações.'
      )
    ]
  },
  {
    id: 'serialok',
    titulo: 'Serial no alvo',
    emoji: '🔢',
    nivel: 'B1',
    onde: 'A ordem serial pode ficar.',
    rodadas: [
      fala(
        'Ordena',
        'Can the serial order stay?',
        'A ordem serial pode ficar?',
        'Diga que a ordem serial pode ficar.',
        'The serial order can stay.',
        ['the serial order can stay', 'that serial order can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this serial order stay closed?',
        'Esta ordem serial pode ficar fechada?',
        'Diga que esta ordem serial pode ficar fechada.',
        'This serial order can stay closed.',
        ['this serial order can stay closed', 'that serial order can stay closed'],
        'Stay closed é ficar fechada.'
      )
    ]
  }
];

export function sujeiraPorId(id) {
  return SUJEIRAS.find(c => c.id === id) ?? null;
}

export function instantaneoPorId(id) {
  return INSTANTANEOS.find(c => c.id === id) ?? null;
}

export function serialPorId(id) {
  return SERIAIS.find(c => c.id === id) ?? null;
}

export function avaliarSujeira(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarInstantaneo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSerial(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
