// Impasse entre dois trabalhos, nome que não resolve e carta morta.
// O ritmo da semana usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const IMPASSES = [
  {
    id: 'doisespera',
    titulo: 'Dois à espera',
    emoji: '🪢',
    nivel: 'A2',
    onde: 'Os dois trabalhos esperam um pelo outro.',
    rodadas: [
      fala(
        'Espera',
        'What are the jobs doing?',
        'O que os trabalhos estão fazendo?',
        'Diga que os dois trabalhos esperam um pelo outro.',
        'The two jobs wait on each other.',
        [
          'the two jobs wait on each other',
          'the 2 jobs wait on each other',
          'those two jobs wait on each other'
        ],
        'Wait on each other é esperar um pelo outro.'
      ),
      fala(
        'Solta',
        'Which one do we free?',
        'Qual a gente solta?',
        'Peça para soltar o trabalho mais antigo.',
        'Please release the older job.',
        [
          'please release the older job',
          'release the older job',
          'please release that older job'
        ],
        'Older job é o trabalho mais antigo.'
      )
    ]
  },
  {
    id: 'soltaantigo',
    titulo: 'O mais antigo',
    emoji: '🪢',
    nivel: 'B1',
    onde: 'O trabalho mais antigo ainda segura a trava.',
    rodadas: [
      fala(
        'Espera',
        'Who still holds the lock?',
        'Quem ainda segura a trava?',
        'Diga que o trabalho mais antigo ainda segura a trava.',
        'The older job still holds the lock.',
        [
          'the older job still holds the lock',
          'that older job still holds the lock',
          'the older job holds the lock'
        ],
        'Holds the lock é segura a trava.'
      ),
      fala(
        'Solta',
        'What will you release?',
        'O que você vai soltar?',
        'Diga que vai soltar esse trabalho.',
        'I will release that job.',
        [
          'i will release that job',
          'i will release the older job',
          'i release that job'
        ],
        'Release that job é soltar esse trabalho.'
      )
    ]
  },
  {
    id: 'semespera',
    titulo: 'Sem impasse',
    emoji: '🪢',
    nivel: 'B1',
    onde: 'O impasse já passou.',
    rodadas: [
      fala(
        'Espera',
        'Is there a deadlock now?',
        'Ainda há impasse?',
        'Diga que não há impasse agora.',
        'There is no deadlock now.',
        [
          'there is no deadlock now',
          'there is no deadlock',
          'we have no deadlock now'
        ],
        'No deadlock now é sem impasse agora.'
      ),
      fala(
        'Solta',
        'Can the jobs run?',
        'Os trabalhos podem rodar?',
        'Diga que os dois trabalhos podem rodar.',
        'The two jobs can run.',
        [
          'the two jobs can run',
          'the 2 jobs can run',
          'those two jobs can run'
        ],
        'Can run é podem rodar.'
      )
    ]
  }
];

export const DOMINIOS = [
  {
    id: 'naoresolve',
    titulo: 'Não resolve',
    emoji: '🏷️',
    nivel: 'A2',
    onde: 'O nome do site não resolve.',
    rodadas: [
      fala(
        'Falha',
        'What is wrong with the name?',
        'O que há de errado com o nome?',
        'Diga que o nome não resolve.',
        'The name does not resolve.',
        [
          'the name does not resolve',
          'this name does not resolve',
          'the site name does not resolve'
        ],
        'Does not resolve é não resolve.'
      ),
      fala(
        'Aponta',
        'Where should it point?',
        'Para onde ele aponta?',
        'Peça para apontar ao endereço novo.',
        'Please point it to the new address.',
        [
          'please point it to the new address',
          'point it to the new address',
          'please point the name to the new address'
        ],
        'New address é o endereço novo.'
      )
    ]
  },
  {
    id: 'endereconovo',
    titulo: 'Duas falhas',
    emoji: '🏷️',
    nivel: 'B1',
    onde: 'A busca do nome falhou duas vezes.',
    rodadas: [
      fala(
        'Falha',
        'How many lookups failed?',
        'Quantas buscas falharam?',
        'Diga que a busca falhou duas vezes.',
        'The lookup failed two times.',
        [
          'the lookup failed two times',
          'the lookup failed 2 times',
          'that lookup failed two times'
        ],
        'Lookup é a busca do nome. Two times é duas vezes.'
      ),
      fala(
        'Aponta',
        'What should we try?',
        'O que a gente tenta?',
        'Peça para tentar o endereço novo.',
        'Please try the new address.',
        [
          'please try the new address',
          'try the new address',
          'please try that new address'
        ],
        'Try the new address é tentar o endereço novo.'
      )
    ]
  },
  {
    id: 'voltounome',
    titulo: 'O nome voltou',
    emoji: '🏷️',
    nivel: 'B1',
    onde: 'O nome voltou a funcionar.',
    rodadas: [
      fala(
        'Falha',
        'Does the name work?',
        'O nome funciona?',
        'Diga que o nome funciona de novo.',
        'The name works again.',
        [
          'the name works again',
          'that name works again',
          'the site name works again'
        ],
        'Works again é funciona de novo.'
      ),
      fala(
        'Aponta',
        'What will you check?',
        'O que você vai conferir?',
        'Diga que vai conferir o nome mais uma vez.',
        'I will check the name once more.',
        [
          'i will check the name once more',
          'i will check the name again',
          'i check the name once more'
        ],
        'Once more é mais uma vez.'
      )
    ]
  }
];

export const MORTAS = [
  {
    id: 'msgmorta',
    titulo: 'Mensagem ruim',
    emoji: '📮',
    nivel: 'A2',
    onde: 'A mensagem ruim vai para a fila ao lado.',
    rodadas: [
      fala(
        'Desvio',
        'Where does the bad message go?',
        'Para onde vai a mensagem ruim?',
        'Diga que a mensagem ruim vai para a fila ao lado.',
        'The bad message goes to the side queue.',
        [
          'the bad message goes to the side queue',
          'that bad message goes to the side queue',
          'the bad message goes to a side queue'
        ],
        'Side queue é a fila ao lado.'
      ),
      fala(
        'Motivo',
        'What should I read?',
        'O que eu leio?',
        'Peça para ler o motivo.',
        'Please read the reason.',
        [
          'please read the reason',
          'read the reason',
          'please read that reason'
        ],
        'Reason é o motivo.'
      )
    ]
  },
  {
    id: 'filalado',
    titulo: 'Três mensagens',
    emoji: '📮',
    nivel: 'B1',
    onde: 'A fila ao lado tem três mensagens.',
    rodadas: [
      fala(
        'Desvio',
        'How many messages are waiting?',
        'Quantas mensagens estão esperando?',
        'Diga que a fila ao lado tem três mensagens.',
        'The side queue holds three messages.',
        [
          'the side queue holds three messages',
          'the side queue holds 3 messages',
          'that side queue holds three messages'
        ],
        'Holds three messages é tem três mensagens.'
      ),
      fala(
        'Motivo',
        'When will you read them?',
        'Quando você vai ler?',
        'Diga que vai ler hoje.',
        'I will read them today.',
        [
          'i will read them today',
          'i will read the messages today',
          'i read them today'
        ],
        'Read them today é ler hoje.'
      )
    ]
  },
  {
    id: 'motivomsg',
    titulo: 'O motivo',
    emoji: '📮',
    nivel: 'B1',
    onde: 'O motivo é um conteúdo ruim.',
    rodadas: [
      fala(
        'Desvio',
        'Is this message good?',
        'Esta mensagem está boa?',
        'Diga que esta mensagem é ruim.',
        'This message is bad.',
        [
          'this message is bad',
          'that message is bad',
          'this message is a bad one'
        ],
        'This message is bad é esta mensagem é ruim.'
      ),
      fala(
        'Motivo',
        'What is the reason?',
        'Qual é o motivo?',
        'Diga que o motivo é um conteúdo ruim.',
        'The reason is a bad payload.',
        [
          'the reason is a bad payload',
          'the reason is the bad payload',
          'that reason is a bad payload'
        ],
        'Bad payload é um conteúdo ruim.'
      )
    ]
  }
];

export function impassePorId(id) {
  return IMPASSES.find(c => c.id === id) ?? null;
}

export function dominioPorId(id) {
  return DOMINIOS.find(c => c.id === id) ?? null;
}

export function mortaPorId(id) {
  return MORTAS.find(c => c.id === id) ?? null;
}

export function avaliarImpasse(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDominio(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMorta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
