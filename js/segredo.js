// Segredo no log, leitura fantasma e contador que volta a zero.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SEGREDOS = [
  {
    id: 'segredolog',
    titulo: 'Chave no log',
    emoji: '🕵️',
    nivel: 'A2',
    onde: 'A chave secreta apareceu no log.',
    rodadas: [
      fala(
        'Vaza',
        'Where did the secret key show up?',
        'Onde a chave secreta apareceu?',
        'Diga que a chave secreta apareceu no log.',
        'The secret key showed up in the log.',
        ['the secret key showed up in the log', 'that secret key showed up in the log'],
        'Showed up é apareceu.'
      ),
      fala(
        'Apaga',
        'What should we remove?',
        'O que a gente remove?',
        'Peça para tirar o segredo do log.',
        'Please remove the secret from the log.',
        ['please remove the secret from the log', 'remove the secret from the log'],
        'Remove the secret é tirar o segredo.'
      )
    ]
  },
  {
    id: 'doischave',
    titulo: 'Dois dias',
    emoji: '🕵️',
    nivel: 'B1',
    onde: 'O log guardou a chave por dois dias.',
    rodadas: [
      fala(
        'Vaza',
        'How long did the log keep the key?',
        'Por quanto tempo o log guardou a chave?',
        'Diga que o log guardou a chave por dois dias.',
        'The log kept the key for two days.',
        [
          'the log kept the key for two days',
          'the log kept the key for 2 days',
          'that log kept the key for two days'
        ],
        'Two days é dois dias.'
      ),
      fala(
        'Apaga',
        'Where should we cap the leak?',
        'Onde a gente limita o vazamento?',
        'Peça para limitar o vazamento em dois dias.',
        'Please cap the leak at two days.',
        [
          'please cap the leak at two days',
          'please cap the leak at 2 days',
          'cap the leak at two days'
        ],
        'Cap the leak é limitar o vazamento.'
      )
    ]
  },
  {
    id: 'segredook',
    titulo: 'Segredo quieto',
    emoji: '🕵️',
    nivel: 'B1',
    onde: 'O log ficou limpo.',
    rodadas: [
      fala(
        'Vaza',
        'Is the log clean now?',
        'O log está limpo agora?',
        'Diga que o log está limpo agora.',
        'The log is clean now.',
        ['the log is clean now', 'that log is clean now'],
        'Clean now é limpo agora.'
      ),
      fala(
        'Apaga',
        'Where does the secret stay?',
        'Onde o segredo fica?',
        'Diga que o segredo fica fora do log.',
        'The secret stays out of the log.',
        ['the secret stays out of the log', 'that secret stays out of the log'],
        'Out of the log é fora do log.'
      )
    ]
  }
];

export const FANTASMAS = [
  {
    id: 'fantasmalinha',
    titulo: 'Linha extra',
    emoji: '👻',
    nivel: 'A2',
    onde: 'A segunda leitura viu uma linha nova.',
    rodadas: [
      fala(
        'Lê',
        'What did the second read see?',
        'O que a segunda leitura viu?',
        'Diga que a segunda leitura viu uma linha nova.',
        'The second read saw a new row.',
        ['the second read saw a new row', 'that second read saw a new row'],
        'A new row é uma linha nova.'
      ),
      fala(
        'Isola',
        'What should we isolate?',
        'O que a gente isola?',
        'Peça para isolar a segunda leitura.',
        'Please isolate the second read.',
        ['please isolate the second read', 'isolate the second read'],
        'Isolate the read é isolar a leitura.'
      )
    ]
  },
  {
    id: 'leituradois',
    titulo: 'Segunda leitura',
    emoji: '👻',
    nivel: 'B1',
    onde: 'O fantasma apareceu na segunda leitura.',
    rodadas: [
      fala(
        'Lê',
        'On which read did the phantom show up?',
        'Em qual leitura o fantasma apareceu?',
        'Diga que o fantasma apareceu na segunda leitura.',
        'The phantom showed up on the second read.',
        [
          'the phantom showed up on the second read',
          'the phantom showed up on read 2',
          'that phantom showed up on the second read'
        ],
        'The second read é a segunda leitura.'
      ),
      fala(
        'Isola',
        'Where should we cap the reads?',
        'Onde a gente limita as leituras?',
        'Peça para limitar as leituras em duas.',
        'Please cap the reads at two.',
        [
          'please cap the reads at two',
          'please cap the reads at 2',
          'cap the reads at two'
        ],
        'Cap the reads é limitar as leituras.'
      )
    ]
  },
  {
    id: 'fantasmaok',
    titulo: 'Leitura estável',
    emoji: '👻',
    nivel: 'B1',
    onde: 'A segunda leitura bate com a primeira.',
    rodadas: [
      fala(
        'Lê',
        'Does the second read match the first?',
        'A segunda leitura bate com a primeira?',
        'Diga que a segunda leitura bate com a primeira.',
        'The second read matches the first.',
        ['the second read matches the first', 'that second read matches the first'],
        'Matches the first é bate com a primeira.'
      ),
      fala(
        'Isola',
        'Does a new row appear now?',
        'Uma linha nova aparece agora?',
        'Diga que nenhuma linha nova aparece agora.',
        'No new row appears now.',
        ['no new row appears now', 'no new rows appear now'],
        'No new row é nenhuma linha nova.'
      )
    ]
  }
];

export const INTEIROS = [
  {
    id: 'inteirozero',
    titulo: 'Volta a zero',
    emoji: '🔣',
    nivel: 'A2',
    onde: 'O contador voltou para zero.',
    rodadas: [
      fala(
        'Estoura',
        'What happened to the counter?',
        'O que aconteceu com o contador?',
        'Diga que o contador voltou para zero.',
        'The counter wrapped back to zero.',
        ['the counter wrapped back to zero', 'that counter wrapped back to zero'],
        'Wrapped back é voltou.'
      ),
      fala(
        'Limita',
        'What should we stop?',
        'O que a gente para?',
        'Peça para parar o contador no limite.',
        'Please stop the counter at the limit.',
        ['please stop the counter at the limit', 'stop the counter at the limit'],
        'At the limit é no limite.'
      )
    ]
  },
  {
    id: 'milinteiro',
    titulo: 'Mil a mais',
    emoji: '🔣',
    nivel: 'B1',
    onde: 'O contador passou de mil.',
    rodadas: [
      fala(
        'Estoura',
        'What number did the counter pass?',
        'Qual número o contador passou?',
        'Diga que o contador passou de mil.',
        'The counter passed one thousand.',
        [
          'the counter passed one thousand',
          'the counter passed 1000',
          'that counter passed one thousand'
        ],
        'One thousand é mil.'
      ),
      fala(
        'Limita',
        'Where should we cap the counter?',
        'Onde a gente limita o contador?',
        'Peça para limitar o contador em mil.',
        'Please cap the counter at one thousand.',
        [
          'please cap the counter at one thousand',
          'please cap the counter at 1000',
          'cap the counter at one thousand'
        ],
        'Cap the counter é limitar o contador.'
      )
    ]
  },
  {
    id: 'inteirook',
    titulo: 'Contador firme',
    emoji: '🔣',
    nivel: 'B1',
    onde: 'O contador ficou dentro do limite.',
    rodadas: [
      fala(
        'Estoura',
        'Does the counter stay inside the limit?',
        'O contador fica dentro do limite?',
        'Diga que o contador fica dentro do limite.',
        'The counter stays inside the limit.',
        ['the counter stays inside the limit', 'that counter stays inside the limit'],
        'Inside the limit é dentro do limite.'
      ),
      fala(
        'Limita',
        'Does the value still wrap?',
        'O valor ainda volta?',
        'Diga que o valor não volta mais.',
        'The value no longer wraps.',
        ['the value no longer wraps', 'that value no longer wraps'],
        'No longer wraps é não volta mais.'
      )
    ]
  }
];

export function segredoPorId(id) {
  return SEGREDOS.find(c => c.id === id) ?? null;
}

export function fantasmaPorId(id) {
  return FANTASMAS.find(c => c.id === id) ?? null;
}

export function inteiroPorId(id) {
  return INTEIROS.find(c => c.id === id) ?? null;
}

export function avaliarSegredo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFantasma(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarInteiro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
