// Memória que cresce, função que dorme e leitura recusada.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const GOTEJOS = [
  {
    id: 'memoriacresce',
    titulo: 'Memória sobe',
    emoji: '💧',
    nivel: 'A2',
    onde: 'A memória cresce sem parar.',
    rodadas: [
      fala(
        'Sobe',
        'What is happening to the memory?',
        'O que acontece com a memória?',
        'Diga que a memória continua crescendo.',
        'The memory keeps growing.',
        ['the memory keeps growing', 'that memory keeps growing'],
        'Keeps growing é continua crescendo.'
      ),
      fala(
        'Devolve',
        'Does anything return?',
        'Algo volta?',
        'Diga que nada volta para o sistema.',
        'Nothing returns to the system.',
        ['nothing returns to the system', 'nothing returns to that system'],
        'Returns é volta.'
      )
    ]
  },
  {
    id: 'quarentamega',
    titulo: 'Quarenta megas',
    emoji: '💧',
    nivel: 'B1',
    onde: 'O processo cresceu quarenta megabytes.',
    rodadas: [
      fala(
        'Sobe',
        'How much did the process grow?',
        'Quanto o processo cresceu?',
        'Diga que o processo cresceu quarenta megabytes.',
        'The process grew forty megabytes.',
        [
          'the process grew forty megabytes',
          'the process grew 40 megabytes',
          'that process grew forty megabytes'
        ],
        'Forty megabytes é quarenta megabytes.'
      ),
      fala(
        'Devolve',
        'What should we find?',
        'O que a gente procura?',
        'Peça para achar o que segura a memória.',
        'Please find what holds the memory.',
        ['please find what holds the memory', 'find what holds the memory'],
        'Holds the memory é segura a memória.'
      )
    ]
  },
  {
    id: 'memoriaquieta',
    titulo: 'Memória quieta',
    emoji: '💧',
    nivel: 'B1',
    onde: 'A memória parou de crescer.',
    rodadas: [
      fala(
        'Sobe',
        'Did the memory stop growing?',
        'A memória parou de crescer?',
        'Diga que a memória parou de crescer.',
        'The memory stopped growing.',
        ['the memory stopped growing', 'that memory stopped growing'],
        'Stopped growing é parou de crescer.'
      ),
      fala(
        'Devolve',
        'Did the process return the memory?',
        'O processo devolveu a memória?',
        'Diga que o processo devolveu a memória.',
        'The process returned the memory.',
        ['the process returned the memory', 'that process returned the memory'],
        'Returned the memory é devolveu a memória.'
      )
    ]
  }
];

export const FRIOS = [
  {
    id: 'acordafria',
    titulo: 'Partida fria',
    emoji: '🥶',
    nivel: 'A2',
    onde: 'A função acordou de uma partida fria.',
    rodadas: [
      fala(
        'Dorme',
        'How did the function wake?',
        'Como a função acordou?',
        'Diga que a função acordou de uma partida fria.',
        'The function woke from a cold start.',
        ['the function woke from a cold start', 'that function woke from a cold start'],
        'Cold start é partida fria.'
      ),
      fala(
        'Acorda',
        'What did the first call do?',
        'O que a primeira chamada fez?',
        'Diga que a primeira chamada teve que esperar.',
        'The first call had to wait.',
        ['the first call had to wait', 'that first call had to wait'],
        'Had to wait é teve que esperar.'
      )
    ]
  },
  {
    id: 'quatrofrio',
    titulo: 'Quatro de espera',
    emoji: '🥶',
    nivel: 'B1',
    onde: 'A primeira chamada esperou quatro segundos.',
    rodadas: [
      fala(
        'Dorme',
        'How long did the first call wait?',
        'Quanto a primeira chamada esperou?',
        'Diga que a primeira chamada esperou quatro segundos.',
        'The first call waited four seconds.',
        [
          'the first call waited four seconds',
          'the first call waited 4 seconds',
          'that first call waited four seconds'
        ],
        'Four seconds é quatro segundos.'
      ),
      fala(
        'Acorda',
        'How do we leave the function?',
        'Como a função fica?',
        'Peça para deixar a função quente.',
        'Please leave the function warm.',
        ['please leave the function warm', 'leave the function warm'],
        'Leave warm é deixar quente.'
      )
    ]
  },
  {
    id: 'funcaoquente',
    titulo: 'Função quente',
    emoji: '🥶',
    nivel: 'B1',
    onde: 'A função já estava quente.',
    rodadas: [
      fala(
        'Dorme',
        'Was the function already warm?',
        'A função já estava quente?',
        'Diga que a função já estava quente.',
        'The function was already warm.',
        ['the function was already warm', 'that function was already warm'],
        'Already warm é já estava quente.'
      ),
      fala(
        'Acorda',
        'Did the first call wait?',
        'A primeira chamada esperou?',
        'Diga que a primeira chamada não esperou.',
        'The first call did not wait.',
        ['the first call did not wait', 'that first call did not wait'],
        'Did not wait é não esperou.'
      )
    ]
  }
];

export const CADEADOS = [
  {
    id: 'leiturarecusa',
    titulo: 'Leitura recusada',
    emoji: '🔐',
    nivel: 'A2',
    onde: 'O processo não conseguiu ler o arquivo.',
    rodadas: [
      fala(
        'Tenta',
        'Can the process read the file?',
        'O processo consegue ler o arquivo?',
        'Diga que o processo não consegue ler aquele arquivo.',
        'The process cannot read that file.',
        ['the process cannot read that file', 'that process cannot read that file'],
        'Cannot read é não consegue ler.'
      ),
      fala(
        'Libera',
        'What did the permission do?',
        'O que a permissão fez?',
        'Diga que a permissão recusou a leitura.',
        'The permission refused the read.',
        ['the permission refused the read', 'that permission refused the read'],
        'Refused the read é recusou a leitura.'
      )
    ]
  },
  {
    id: 'tresarquivos',
    titulo: 'Três arquivos',
    emoji: '🔐',
    nivel: 'B1',
    onde: 'Três arquivos recusaram a leitura.',
    rodadas: [
      fala(
        'Tenta',
        'How many files refused the read?',
        'Quantos arquivos recusaram a leitura?',
        'Diga que três arquivos recusaram a leitura.',
        'Three files refused the read.',
        [
          'three files refused the read',
          '3 files refused the read',
          'three files refused that read'
        ],
        'Three files é três arquivos.'
      ),
      fala(
        'Libera',
        'What should we open?',
        'O que a gente abre?',
        'Peça para abrir a permissão.',
        'Please open the permission.',
        ['please open the permission', 'open the permission'],
        'Open the permission é abrir a permissão.'
      )
    ]
  },
  {
    id: 'leitualivre',
    titulo: 'Leitura livre',
    emoji: '🔐',
    nivel: 'B1',
    onde: 'O processo consegue ler o arquivo.',
    rodadas: [
      fala(
        'Tenta',
        'Can the process read the file now?',
        'O processo consegue ler agora?',
        'Diga que o processo consegue ler o arquivo.',
        'The process can read the file.',
        ['the process can read the file', 'that process can read the file'],
        'Can read é consegue ler.'
      ),
      fala(
        'Libera',
        'Does the permission allow the read?',
        'A permissão permite a leitura?',
        'Diga que a permissão permite a leitura.',
        'The permission allows the read.',
        ['the permission allows the read', 'that permission allows the read'],
        'Allows the read é permite a leitura.'
      )
    ]
  }
];

export function gotejoPorId(id) {
  return GOTEJOS.find(c => c.id === id) ?? null;
}

export function frioPorId(id) {
  return FRIOS.find(c => c.id === id) ?? null;
}

export function cadeadoPorId(id) {
  return CADEADOS.find(c => c.id === id) ?? null;
}

export function avaliarGotejo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFrio(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCadeado(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
