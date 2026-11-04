// Pausa da coleta, configuração que deriva e descritor de arquivo.
// A meta da semana usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PAUSAS = [
  {
    id: 'doispausa',
    titulo: 'Dois segundos parados',
    emoji: '⌛',
    nivel: 'A2',
    onde: 'A pausa durou dois segundos.',
    rodadas: [
      fala(
        'Para',
        'How long was the pause?',
        'Quanto tempo durou a pausa?',
        'Diga que a pausa durou dois segundos.',
        'The pause lasted two seconds.',
        [
          'the pause lasted two seconds',
          'the pause lasted 2 seconds',
          'that pause lasted two seconds'
        ],
        'Lasted two seconds é durou dois segundos.'
      ),
      fala(
        'Segue',
        'What happened to the calls?',
        'O que houve com as chamadas?',
        'Diga que as chamadas esperaram.',
        'The calls waited.',
        [
          'the calls waited',
          'those calls waited',
          'the calls did wait'
        ],
        'Waited é esperaram.'
      )
    ]
  },
  {
    id: 'esperapausa',
    titulo: 'Chamadas à espera',
    emoji: '⌛',
    nivel: 'B1',
    onde: 'As chamadas esperaram durante a pausa.',
    rodadas: [
      fala(
        'Para',
        'Why did the calls wait?',
        'Por que as chamadas esperaram?',
        'Diga que as chamadas esperaram durante a pausa.',
        'The calls waited during the pause.',
        [
          'the calls waited during the pause',
          'those calls waited during the pause',
          'the calls waited in the pause'
        ],
        'During the pause é durante a pausa.'
      ),
      fala(
        'Segue',
        'What will you check?',
        'O que você vai olhar?',
        'Diga que vai olhar a pausa.',
        'I will look at the pause.',
        [
          'i will look at the pause',
          'i will look at that pause',
          'i look at the pause'
        ],
        'Look at the pause é olhar a pausa.'
      )
    ]
  },
  {
    id: 'pausafoi',
    titulo: 'Pausa acabou',
    emoji: '⌛',
    nivel: 'B1',
    onde: 'A pausa já acabou.',
    rodadas: [
      fala(
        'Para',
        'Is the pause over?',
        'A pausa acabou?',
        'Diga que a pausa já acabou.',
        'The pause is over now.',
        [
          'the pause is over now',
          'the pause is over',
          'that pause is over now'
        ],
        'Is over now é já acabou.'
      ),
      fala(
        'Segue',
        'Can the calls continue?',
        'As chamadas podem seguir?',
        'Diga que as chamadas podem seguir.',
        'The calls can continue.',
        [
          'the calls can continue',
          'those calls can continue',
          'the calls can go on'
        ],
        'Can continue é podem seguir.'
      )
    ]
  }
];

export const DERIVAS = [
  {
    id: 'configdifere',
    titulo: 'Configuração diferente',
    emoji: '📄',
    nivel: 'A2',
    onde: 'A configuração difere do repositório.',
    rodadas: [
      fala(
        'Compara',
        'What is wrong with the config?',
        'O que há de errado com a configuração?',
        'Diga que a configuração difere do repositório.',
        'The config differs from the repo.',
        [
          'the config differs from the repo',
          'that config differs from the repo',
          'the config differs from that repo'
        ],
        'Differs from the repo é difere do repositório.'
      ),
      fala(
        'Iguala',
        'What should we do?',
        'O que a gente faz?',
        'Peça para igualar ao repositório.',
        'Please match the repo.',
        [
          'please match the repo',
          'match the repo',
          'please match that repo'
        ],
        'Match the repo é igualar ao repositório.'
      )
    ]
  },
  {
    id: 'duaslinhas',
    titulo: 'Duas linhas',
    emoji: '📄',
    nivel: 'B1',
    onde: 'Duas linhas diferem.',
    rodadas: [
      fala(
        'Compara',
        'How many lines differ?',
        'Quantas linhas diferem?',
        'Diga que duas linhas diferem.',
        'Two lines differ.',
        [
          'two lines differ',
          '2 lines differ',
          'those two lines differ'
        ],
        'Two lines é duas linhas.'
      ),
      fala(
        'Iguala',
        'What will you change?',
        'O que você vai mudar?',
        'Diga que vai igualar o arquivo.',
        'I will match the file.',
        [
          'i will match the file',
          'i will match that file',
          'i match the file'
        ],
        'Match the file é igualar o arquivo.'
      )
    ]
  },
  {
    id: 'configok',
    titulo: 'Configuração certa',
    emoji: '📄',
    nivel: 'B1',
    onde: 'A configuração já bate.',
    rodadas: [
      fala(
        'Compara',
        'Does the config match now?',
        'A configuração bate agora?',
        'Diga que a configuração bate agora.',
        'The config matches now.',
        [
          'the config matches now',
          'the config matches',
          'that config matches now'
        ],
        'Matches now é bate agora.'
      ),
      fala(
        'Iguala',
        'Can the deploy continue?',
        'A publicação pode seguir?',
        'Diga que a publicação pode seguir.',
        'The deploy can continue.',
        [
          'the deploy can continue',
          'that deploy can continue',
          'the deploy can go on'
        ],
        'Can continue é pode seguir.'
      )
    ]
  }
];

export const DESCRITORES = [
  {
    id: 'arquivodemais',
    titulo: 'Arquivos demais',
    emoji: '📁',
    nivel: 'A2',
    onde: 'O processo abriu arquivos demais.',
    rodadas: [
      fala(
        'Abre',
        'What did the process do?',
        'O que o processo fez?',
        'Diga que o processo abriu arquivos demais.',
        'The process opened too many files.',
        [
          'the process opened too many files',
          'that process opened too many files',
          'the process opened too many file handles'
        ],
        'Too many files é arquivos demais.'
      ),
      fala(
        'Fecha',
        'What failed?',
        'O que falhou?',
        'Diga que a próxima abertura falhou.',
        'The next open failed.',
        [
          'the next open failed',
          'that next open failed',
          'the next file open failed'
        ],
        'The next open failed é a próxima abertura falhou.'
      )
    ]
  },
  {
    id: 'milfiles',
    titulo: 'Mil arquivos',
    emoji: '📁',
    nivel: 'B1',
    onde: 'O limite é mil arquivos.',
    rodadas: [
      fala(
        'Abre',
        'What is the limit?',
        'Qual é o limite?',
        'Diga que o limite é mil arquivos.',
        'The limit is one thousand files.',
        [
          'the limit is one thousand files',
          'the limit is 1000 files',
          'that limit is one thousand files'
        ],
        'One thousand files é mil arquivos.'
      ),
      fala(
        'Fecha',
        'What should we close?',
        'O que a gente fecha?',
        'Peça para fechar os arquivos ociosos.',
        'Please close the idle files.',
        [
          'please close the idle files',
          'close the idle files',
          'please close those idle files'
        ],
        'Idle files é arquivos ociosos.'
      )
    ]
  },
  {
    id: 'abriuok',
    titulo: 'Abertura livre',
    emoji: '📁',
    nivel: 'B1',
    onde: 'Arquivos novos já podem abrir.',
    rodadas: [
      fala(
        'Abre',
        'Can we open files now?',
        'Dá para abrir arquivos agora?',
        'Diga que arquivos novos podem abrir.',
        'New files can open now.',
        [
          'new files can open now',
          'new files can open',
          'those new files can open now'
        ],
        'Can open now é podem abrir agora.'
      ),
      fala(
        'Fecha',
        'Is the limit fine?',
        'O limite está bom?',
        'Diga que o limite está bom agora.',
        'The limit is fine now.',
        [
          'the limit is fine now',
          'that limit is fine now',
          'the limit is fine'
        ],
        'Is fine now é está bom agora.'
      )
    ]
  }
];

export function pausaPorId(id) {
  return PAUSAS.find(c => c.id === id) ?? null;
}

export function derivaPorId(id) {
  return DERIVAS.find(c => c.id === id) ?? null;
}

export function descritorPorId(id) {
  return DESCRITORES.find(c => c.id === id) ?? null;
}

export function avaliarPausa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDeriva(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDescritor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
