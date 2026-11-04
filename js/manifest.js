// Manifest que lista o arquivo, hedge que cobre a espera e debounce que espera a pausa.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const MANIFESTS = [
  {
    id: 'manifestbase',
    titulo: 'Lista do manifest',
    emoji: '📜',
    nivel: 'A2',
    onde: 'O manifesto lista o arquivo.',
    rodadas: [
      fala(
        'Lista',
        'What does the manifest list?',
        'O que o manifesto lista?',
        'Diga que o manifesto lista o arquivo.',
        'The manifest lists the file.',
        [
          'the manifest lists the file',
          'that manifest lists the file'
        ],
        'The file é o arquivo.'
      ),
      fala(
        'Segue',
        'What should the manifest do with the file?',
        'O que o manifesto deve fazer com o arquivo?',
        'Peça para listar o arquivo.',
        'Please list the file.',
        [
          'please list the file',
          'list the file'
        ],
        'List the file é listar o arquivo.'
      )
    ]
  },
  {
    id: 'manifest2',
    titulo: 'Manifest dois',
    emoji: '📜',
    nivel: 'B1',
    onde: 'O manifesto listou dois arquivos.',
    rodadas: [
      fala(
        'Lista',
        'How many files did the manifest list?',
        'Quantos arquivos o manifesto listou?',
        'Diga que o manifesto listou dois arquivos.',
        'The manifest listed two files.',
        [
          'the manifest listed two files',
          'the manifest listed 2 files',
          'that manifest listed two files'
        ],
        'Two files é dois arquivos.'
      ),
      fala(
        'Segue',
        'Where should we cap the files?',
        'Onde a gente limita os arquivos?',
        'Peça para listar dois arquivos.',
        'Please list two files.',
        ['please list two files', 'please list 2 files', 'list two files'],
        'List two files é listar dois arquivos.'
      )
    ]
  },
  {
    id: 'manifestok',
    titulo: 'Manifest no alvo',
    emoji: '📜',
    nivel: 'B1',
    onde: 'O manifesto pode ficar.',
    rodadas: [
      fala(
        'Lista',
        'Can the manifest stay?',
        'O manifesto pode ficar?',
        'Diga que o manifesto pode ficar.',
        'The manifest can stay.',
        ['the manifest can stay', 'that manifest can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this manifest stay quiet?',
        'Este manifesto pode ficar quieto?',
        'Diga que este manifesto pode ficar quieto.',
        'This manifest can stay quiet.',
        ['this manifest can stay quiet', 'that manifest can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const HEDGES = [
  {
    id: 'hedgebase',
    titulo: 'Cobre do hedge',
    emoji: '🐇',
    nivel: 'A2',
    onde: 'O hedge cobre a espera.',
    rodadas: [
      fala(
        'Cobre',
        'What does the hedge cover?',
        'O que o hedge cobre?',
        'Diga que o hedge cobre a espera.',
        'The hedge covers the delay.',
        [
          'the hedge covers the delay',
          'that hedge covers the delay'
        ],
        'The delay é a espera.'
      ),
      fala(
        'Segue',
        'What should the hedge do with the delay?',
        'O que o hedge deve fazer com a espera?',
        'Peça para cobrir a espera.',
        'Please cover the delay.',
        [
          'please cover the delay',
          'cover the delay'
        ],
        'Cover the delay é cobrir a espera.'
      )
    ]
  },
  {
    id: 'hedge3',
    titulo: 'Hedge três',
    emoji: '🐇',
    nivel: 'B1',
    onde: 'O hedge cobriu três chamadas.',
    rodadas: [
      fala(
        'Cobre',
        'How many calls did the hedge cover?',
        'Quantas chamadas o hedge cobriu?',
        'Diga que o hedge cobriu três chamadas.',
        'The hedge covered three calls.',
        [
          'the hedge covered three calls',
          'the hedge covered 3 calls',
          'that hedge covered three calls'
        ],
        'Three calls é três chamadas.'
      ),
      fala(
        'Segue',
        'Where should we cap the calls?',
        'Onde a gente limita as chamadas?',
        'Peça para cobrir três chamadas.',
        'Please cover three calls.',
        ['please cover three calls', 'please cover 3 calls', 'cover three calls'],
        'Cover three calls é cobrir três chamadas.'
      )
    ]
  },
  {
    id: 'hedgeok',
    titulo: 'Hedge no alvo',
    emoji: '🐇',
    nivel: 'B1',
    onde: 'O hedge pode ficar.',
    rodadas: [
      fala(
        'Cobre',
        'Can the hedge stay?',
        'O hedge pode ficar?',
        'Diga que o hedge pode ficar.',
        'The hedge can stay.',
        ['the hedge can stay', 'that hedge can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this hedge stay quiet?',
        'Este hedge pode ficar quieto?',
        'Diga que este hedge pode ficar quieto.',
        'This hedge can stay quiet.',
        ['this hedge can stay quiet', 'that hedge can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const DEBOUNCES = [
  {
    id: 'debouncebase',
    titulo: 'Espera do debounce',
    emoji: '⏲️',
    nivel: 'A2',
    onde: 'O debounce espera a pausa.',
    rodadas: [
      fala(
        'Espera',
        'What does the debounce wait for?',
        'O que o debounce espera?',
        'Diga que o debounce espera a pausa.',
        'The debounce waits for the pause.',
        [
          'the debounce waits for the pause',
          'that debounce waits for the pause'
        ],
        'The pause é a pausa.'
      ),
      fala(
        'Segue',
        'What should the debounce do with the pause?',
        'O que o debounce deve fazer com a pausa?',
        'Peça para esperar a pausa.',
        'Please wait for the pause.',
        [
          'please wait for the pause',
          'wait for the pause'
        ],
        'Wait for the pause é esperar a pausa.'
      )
    ]
  },
  {
    id: 'debounce4',
    titulo: 'Debounce quatro',
    emoji: '⏲️',
    nivel: 'B1',
    onde: 'O debounce esperou quatro segundos.',
    rodadas: [
      fala(
        'Espera',
        'How many seconds did the debounce wait?',
        'Quantos segundos o debounce esperou?',
        'Diga que o debounce esperou quatro segundos.',
        'The debounce waited four seconds.',
        [
          'the debounce waited four seconds',
          'the debounce waited 4 seconds',
          'that debounce waited four seconds'
        ],
        'Four seconds é quatro segundos.'
      ),
      fala(
        'Segue',
        'Where should we cap the seconds?',
        'Onde a gente limita os segundos?',
        'Peça para esperar quatro segundos.',
        'Please wait four seconds.',
        ['please wait four seconds', 'please wait 4 seconds', 'wait four seconds'],
        'Wait four seconds é esperar quatro segundos.'
      )
    ]
  },
  {
    id: 'debounceok',
    titulo: 'Debounce no alvo',
    emoji: '⏲️',
    nivel: 'B1',
    onde: 'O debounce pode ficar.',
    rodadas: [
      fala(
        'Espera',
        'Can the debounce stay?',
        'O debounce pode ficar?',
        'Diga que o debounce pode ficar.',
        'The debounce can stay.',
        ['the debounce can stay', 'that debounce can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this debounce stay quiet?',
        'Este debounce pode ficar quieto?',
        'Diga que este debounce pode ficar quieto.',
        'This debounce can stay quiet.',
        ['this debounce can stay quiet', 'that debounce can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function manifestPorId(id) {
  return MANIFESTS.find(c => c.id === id) ?? null;
}

export function hedgePorId(id) {
  return HEDGES.find(c => c.id === id) ?? null;
}

export function debouncePorId(id) {
  return DEBOUNCES.find(c => c.id === id) ?? null;
}

export function avaliarManifest(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarHedge(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDebounce(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
