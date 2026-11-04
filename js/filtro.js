// Filtro de presença, mensagens fora de ordem e prova dos bytes.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const FILTROS = [
  {
    id: 'simfalso',
    titulo: 'Sim falso',
    emoji: '🧲',
    nivel: 'A2',
    onde: 'O filtro deu um sim falso.',
    rodadas: [
      fala(
        'Avisa',
        'What did the filter give?',
        'O que o filtro deu?',
        'Diga que o filtro deu um sim falso.',
        'The filter gave a false yes.',
        ['the filter gave a false yes', 'that filter gave a false yes'],
        'A false yes é um sim falso.'
      ),
      fala(
        'Confere',
        'What should we check?',
        'O que a gente confere?',
        'Peça para conferir o conjunto de verdade.',
        'Please check the real set.',
        ['please check the real set', 'check the real set'],
        'The real set é o conjunto de verdade.'
      )
    ]
  },
  {
    id: 'umcem',
    titulo: 'Um em cem',
    emoji: '🧲',
    nivel: 'B1',
    onde: 'O sim falso aparece uma vez em cem.',
    rodadas: [
      fala(
        'Avisa',
        'How often does the false yes show up?',
        'Com que frequência o sim falso aparece?',
        'Diga que o sim falso aparece uma vez em cem.',
        'The false yes shows up one time in a hundred.',
        [
          'the false yes shows up one time in a hundred',
          'the false yes shows up 1 time in 100',
          'that false yes shows up one time in a hundred'
        ],
        'One time in a hundred é uma vez em cem.'
      ),
      fala(
        'Confere',
        'Where should we cap the false yes?',
        'Onde a gente limita o sim falso?',
        'Peça para limitar o sim falso em um por cento.',
        'Please cap the false yes at one percent.',
        [
          'please cap the false yes at one percent',
          'please cap the false yes at 1 percent',
          'cap the false yes at one percent'
        ],
        'One percent é um por cento.'
      )
    ]
  },
  {
    id: 'filtroquieto',
    titulo: 'Filtro quieto',
    emoji: '🧲',
    nivel: 'B1',
    onde: 'O filtro ficou quieto.',
    rodadas: [
      fala(
        'Avisa',
        'Is the filter quiet now?',
        'O filtro está quieto agora?',
        'Diga que o filtro está quieto agora.',
        'The filter is quiet now.',
        ['the filter is quiet now', 'that filter is quiet now'],
        'Quiet now é quieto agora.'
      ),
      fala(
        'Confere',
        'Does the missing key stay out?',
        'A chave que falta fica de fora?',
        'Diga que a chave que falta fica de fora.',
        'The missing key stays out.',
        ['the missing key stays out', 'that missing key stays out'],
        'Stays out é fica de fora.'
      )
    ]
  }
];

export const ORDENS = [
  {
    id: 'quatroantes',
    titulo: 'Quatro antes',
    emoji: '🔀',
    nivel: 'A2',
    onde: 'A mensagem quatro chegou antes da três.',
    rodadas: [
      fala(
        'Chega',
        'Which message arrived first?',
        'Qual mensagem chegou primeiro?',
        'Diga que a mensagem quatro chegou antes da três.',
        'Message four arrived before message three.',
        [
          'message four arrived before message three',
          'message 4 arrived before message 3',
          'that message four arrived before message three'
        ],
        'Before é antes.'
      ),
      fala(
        'Ordena',
        'What should we wait for?',
        'O que a gente espera?',
        'Peça para esperar a mensagem três.',
        'Please wait for message three.',
        [
          'please wait for message three',
          'please wait for message 3',
          'wait for message three'
        ],
        'Wait for é esperar.'
      )
    ]
  },
  {
    id: 'msgquatro',
    titulo: 'Mensagem quatro',
    emoji: '🔀',
    nivel: 'B1',
    onde: 'A conta saiu invertida.',
    rodadas: [
      fala(
        'Chega',
        'What did the swapped messages do?',
        'O que as mensagens trocadas fizeram?',
        'Diga que as mensagens trocadas inverteram a conta.',
        'The swapped messages flipped the count.',
        ['the swapped messages flipped the count', 'those swapped messages flipped the count'],
        'Flipped the count é inverteram a conta.'
      ),
      fala(
        'Ordena',
        'What should we sort?',
        'O que a gente ordena?',
        'Peça para ordenar as mensagens pela hora.',
        'Please sort the messages by time.',
        ['please sort the messages by time', 'sort the messages by time'],
        'By time é pela hora.'
      )
    ]
  },
  {
    id: 'ordemcerta',
    titulo: 'Ordem certa',
    emoji: '🔀',
    nivel: 'B1',
    onde: 'As mensagens chegaram na ordem.',
    rodadas: [
      fala(
        'Chega',
        'Are the messages in order now?',
        'As mensagens estão na ordem agora?',
        'Diga que as mensagens estão na ordem agora.',
        'The messages are in order now.',
        ['the messages are in order now', 'those messages are in order now'],
        'In order é na ordem.'
      ),
      fala(
        'Ordena',
        'Does message three come first?',
        'A mensagem três vem primeiro?',
        'Diga que a mensagem três vem antes da quatro.',
        'Message three comes before message four.',
        [
          'message three comes before message four',
          'message 3 comes before message 4',
          'that message three comes before message four'
        ],
        'Comes before é vem antes.'
      )
    ]
  }
];

export const PROVAS = [
  {
    id: 'provafalha',
    titulo: 'Prova falhou',
    emoji: '🧬',
    nivel: 'A2',
    onde: 'A prova dos bytes não bateu.',
    rodadas: [
      fala(
        'Mede',
        'What happened to the file?',
        'O que aconteceu com o arquivo?',
        'Diga que a prova dos bytes não bateu com o arquivo.',
        'The byte check did not match the file.',
        ['the byte check did not match the file', 'that byte check did not match the file'],
        'Did not match é não bateu.'
      ),
      fala(
        'Recusa',
        'What should we drop?',
        'O que a gente descarta?',
        'Peça para descartar o arquivo quebrado.',
        'Please drop the broken file.',
        ['please drop the broken file', 'drop the broken file'],
        'The broken file é o arquivo quebrado.'
      )
    ]
  },
  {
    id: 'bytequatro',
    titulo: 'Byte quatrocentos',
    emoji: '🧬',
    nivel: 'B1',
    onde: 'A prova falhou no byte quatrocentos.',
    rodadas: [
      fala(
        'Mede',
        'Where did the check fail?',
        'Onde a prova falhou?',
        'Diga que a prova falhou no byte quatrocentos.',
        'The check failed at byte four hundred.',
        [
          'the check failed at byte four hundred',
          'the check failed at byte 400',
          'that check failed at byte four hundred'
        ],
        'Four hundred é quatrocentos.'
      ),
      fala(
        'Recusa',
        'Where should we stop the read?',
        'Onde a gente para a leitura?',
        'Peça para parar a leitura no byte quatrocentos.',
        'Please stop the read at byte four hundred.',
        [
          'please stop the read at byte four hundred',
          'please stop the read at byte 400',
          'stop the read at byte four hundred'
        ],
        'Stop the read é parar a leitura.'
      )
    ]
  },
  {
    id: 'provaok',
    titulo: 'Arquivo íntegro',
    emoji: '🧬',
    nivel: 'B1',
    onde: 'O arquivo bate com a prova.',
    rodadas: [
      fala(
        'Mede',
        'Does the file match now?',
        'O arquivo bate agora?',
        'Diga que o arquivo bate com a prova dos bytes.',
        'The file matches the byte check.',
        ['the file matches the byte check', 'that file matches the byte check'],
        'Matches the check é bate com a prova.'
      ),
      fala(
        'Recusa',
        'Can the file stay?',
        'O arquivo pode ficar?',
        'Diga que o arquivo pode ficar.',
        'The file can stay.',
        ['the file can stay', 'that file can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function filtroPorId(id) {
  return FILTROS.find(c => c.id === id) ?? null;
}

export function ordemPorId(id) {
  return ORDENS.find(c => c.id === id) ?? null;
}

export function provaPorId(id) {
  return PROVAS.find(c => c.id === id) ?? null;
}

export function avaliarFiltro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarOrdem(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarProva(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
