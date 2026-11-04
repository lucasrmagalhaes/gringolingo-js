// Corrida de escritas, índice que falta e percentil da latência.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CORRIDAS = [
  {
    id: 'corridadupla',
    titulo: 'Saldo duplo',
    emoji: '🏎️',
    nivel: 'A2',
    onde: 'Dois pedidos gravaram o mesmo saldo.',
    rodadas: [
      fala(
        'Disputa',
        'What did the two requests do?',
        'O que os dois pedidos fizeram?',
        'Diga que dois pedidos gravaram o mesmo saldo.',
        'Two requests wrote the same balance.',
        ['two requests wrote the same balance', 'the two requests wrote the same balance'],
        'Same balance é o mesmo saldo.'
      ),
      fala(
        'Separa',
        'What should we separate?',
        'O que a gente separa?',
        'Peça para separar as duas escritas.',
        'Please separate the two writes.',
        ['please separate the two writes', 'separate the two writes'],
        'Separate the writes é separar as escritas.'
      )
    ]
  },
  {
    id: 'doispedidos',
    titulo: 'Dois pedidos',
    emoji: '🏎️',
    nivel: 'B1',
    onde: 'A corrida tocou duas escritas.',
    rodadas: [
      fala(
        'Disputa',
        'How many writes did the race touch?',
        'Quantas escritas a corrida tocou?',
        'Diga que a corrida tocou duas escritas.',
        'The race touched two writes.',
        [
          'the race touched two writes',
          'the race touched 2 writes',
          'that race touched two writes'
        ],
        'Two writes é duas escritas.'
      ),
      fala(
        'Separa',
        'Where should we cap the race?',
        'Onde a gente limita a corrida?',
        'Peça para limitar a corrida em duas escritas.',
        'Please cap the race at two writes.',
        [
          'please cap the race at two writes',
          'please cap the race at 2 writes',
          'cap the race at two writes'
        ],
        'Cap the race é limitar a corrida.'
      )
    ]
  },
  {
    id: 'corridaok',
    titulo: 'Corrida quieta',
    emoji: '🏎️',
    nivel: 'B1',
    onde: 'O saldo ficou com um escritor só.',
    rodadas: [
      fala(
        'Disputa',
        'How many writers does the balance have?',
        'Quantos escritores o saldo tem?',
        'Diga que o saldo tem um escritor só agora.',
        'The balance has one writer now.',
        ['the balance has one writer now', 'that balance has one writer now'],
        'One writer é um escritor só.'
      ),
      fala(
        'Separa',
        'Do the two requests still overlap?',
        'Os dois pedidos ainda se cruzam?',
        'Diga que os dois pedidos não se cruzam mais.',
        'The two requests no longer overlap.',
        ['the two requests no longer overlap', 'those two requests no longer overlap'],
        'No longer overlap é não se cruzam mais.'
      )
    ]
  }
];

export const INDICES = [
  {
    id: 'semindice',
    titulo: 'Sem índice',
    emoji: '📇',
    nivel: 'A2',
    onde: 'A consulta leu cada linha.',
    rodadas: [
      fala(
        'Varre',
        'What did the query read?',
        'O que a consulta leu?',
        'Diga que a consulta leu cada linha.',
        'The query read every row.',
        ['the query read every row', 'that query read every row'],
        'Every row é cada linha.'
      ),
      fala(
        'Cria',
        'What should we add?',
        'O que a gente adiciona?',
        'Peça para adicionar o índice que falta.',
        'Please add the missing index.',
        ['please add the missing index', 'add the missing index'],
        'Missing index é o índice que falta.'
      )
    ]
  },
  {
    id: 'quarentamil',
    titulo: 'Quarenta mil',
    emoji: '📇',
    nivel: 'B1',
    onde: 'A varredura leu quarenta mil linhas.',
    rodadas: [
      fala(
        'Varre',
        'How many rows did the scan read?',
        'Quantas linhas a varredura leu?',
        'Diga que a varredura leu quarenta mil linhas.',
        'The scan read forty thousand rows.',
        [
          'the scan read forty thousand rows',
          'the scan read 40000 rows',
          'that scan read forty thousand rows'
        ],
        'Forty thousand rows é quarenta mil linhas.'
      ),
      fala(
        'Cria',
        'Where should we cap the scan?',
        'Onde a gente limita a varredura?',
        'Peça para limitar a varredura em quarenta mil linhas.',
        'Please cap the scan at forty thousand rows.',
        [
          'please cap the scan at forty thousand rows',
          'please cap the scan at 40000 rows',
          'cap the scan at forty thousand rows'
        ],
        'Cap the scan é limitar a varredura.'
      )
    ]
  },
  {
    id: 'indicepronto',
    titulo: 'Índice pronto',
    emoji: '📇',
    nivel: 'B1',
    onde: 'A consulta usa o índice agora.',
    rodadas: [
      fala(
        'Varre',
        'Does the query use the index now?',
        'A consulta usa o índice agora?',
        'Diga que a consulta usa o índice agora.',
        'The query uses the index now.',
        ['the query uses the index now', 'that query uses the index now'],
        'Uses the index é usa o índice.'
      ),
      fala(
        'Cria',
        'Can the scan stay small?',
        'A varredura pode ficar pequena?',
        'Diga que a varredura pode ficar pequena.',
        'The scan can stay small.',
        ['the scan can stay small', 'that scan can stay small'],
        'Stay small é ficar pequena.'
      )
    ]
  }
];

export const PERCENTIS = [
  {
    id: 'percentil99',
    titulo: 'Noventa e nove',
    emoji: '📐',
    nivel: 'A2',
    onde: 'Noventa e nove por cento das chamadas cabem.',
    rodadas: [
      fala(
        'Mede',
        'What percent of the calls fit?',
        'Qual porcentagem das chamadas cabe?',
        'Diga que noventa e nove por cento das chamadas cabem.',
        'Ninety nine percent of the calls fit.',
        [
          'ninety nine percent of the calls fit',
          '99 percent of the calls fit',
          'ninety nine percent of those calls fit'
        ],
        'Ninety nine percent é noventa e nove por cento.'
      ),
      fala(
        'Limita',
        'What should we watch?',
        'O que a gente observa?',
        'Peça para observar o percentil alto.',
        'Please watch the high percentile.',
        ['please watch the high percentile', 'watch the high percentile'],
        'High percentile é o percentil alto.'
      )
    ]
  },
  {
    id: 'duzentosms',
    titulo: 'Duzentos',
    emoji: '📐',
    nivel: 'B1',
    onde: 'As chamadas cabem em duzentos milissegundos.',
    rodadas: [
      fala(
        'Mede',
        'How fast do the calls fit?',
        'Em quanto tempo as chamadas cabem?',
        'Diga que as chamadas cabem em duzentos milissegundos.',
        'The calls fit in two hundred milliseconds.',
        [
          'the calls fit in two hundred milliseconds',
          'the calls fit in 200 milliseconds',
          'those calls fit in two hundred milliseconds'
        ],
        'Two hundred milliseconds é duzentos milissegundos.'
      ),
      fala(
        'Limita',
        'Where should we cap the calls?',
        'Onde a gente limita as chamadas?',
        'Peça para limitar as chamadas em duzentos milissegundos.',
        'Please cap the calls at two hundred milliseconds.',
        [
          'please cap the calls at two hundred milliseconds',
          'please cap the calls at 200 milliseconds',
          'cap the calls at two hundred milliseconds'
        ],
        'Cap the calls é limitar as chamadas.'
      )
    ]
  },
  {
    id: 'percentilok',
    titulo: 'Percentil no alvo',
    emoji: '📐',
    nivel: 'B1',
    onde: 'As chamadas lentas ficaram raras.',
    rodadas: [
      fala(
        'Mede',
        'Are the slow calls rare now?',
        'As chamadas lentas estão raras agora?',
        'Diga que as chamadas lentas estão raras agora.',
        'The slow calls are rare now.',
        ['the slow calls are rare now', 'those slow calls are rare now'],
        'Rare now é raras agora.'
      ),
      fala(
        'Limita',
        'Where can the limit stay?',
        'Onde o limite pode ficar?',
        'Diga que o limite pode ficar em duzentos milissegundos.',
        'The limit can stay at two hundred milliseconds.',
        ['the limit can stay at two hundred milliseconds', 'that limit can stay at two hundred milliseconds'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function corridaPorId(id) {
  return CORRIDAS.find(c => c.id === id) ?? null;
}

export function indicePorId(id) {
  return INDICES.find(c => c.id === id) ?? null;
}

export function percentilPorId(id) {
  return PERCENTIS.find(c => c.id === id) ?? null;
}

export function avaliarCorrida(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarIndice(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPercentil(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
