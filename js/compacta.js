// Compactação de arquivos, diário de escrita e leitor atrasado.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const COMPACTAS = [
  {
    id: 'compactajunta',
    titulo: 'Arquivos juntos',
    emoji: '🗜️',
    nivel: 'A2',
    onde: 'O armazenamento reescreveu seis arquivos velhos.',
    rodadas: [
      fala(
        'Reescreve',
        'What did the store do with the old files?',
        'O que o armazenamento fez com os arquivos velhos?',
        'Diga que o armazenamento reescreveu seis arquivos velhos.',
        'The store rewrote six old files.',
        ['the store rewrote six old files', 'that store rewrote six old files'],
        'Rewrote é reescreveu.'
      ),
      fala(
        'Solta',
        'What should we leave as it is?',
        'O que a gente deixa como está?',
        'Peça para deixar os arquivos reescritos.',
        'Please leave the rewritten files.',
        ['please leave the rewritten files', 'leave the rewritten files'],
        'Leave the files é deixar os arquivos.'
      )
    ]
  },
  {
    id: 'seisarquivos',
    titulo: 'Seis arquivos',
    emoji: '🗜️',
    nivel: 'B1',
    onde: 'A compactação reescreveu seis arquivos.',
    rodadas: [
      fala(
        'Reescreve',
        'How many files did compaction rewrite?',
        'Quantos arquivos a compactação reescreveu?',
        'Diga que a compactação reescreveu seis arquivos.',
        'Compaction rewrote six files.',
        [
          'compaction rewrote six files',
          'compaction rewrote 6 files',
          'that compaction rewrote six files'
        ],
        'Six files é seis arquivos.'
      ),
      fala(
        'Solta',
        'Where should we cap the rewrite?',
        'Onde a gente limita a reescrita?',
        'Peça para limitar a reescrita em seis arquivos.',
        'Please cap the rewrite at six files.',
        [
          'please cap the rewrite at six files',
          'please cap the rewrite at 6 files',
          'cap the rewrite at six files'
        ],
        'Cap the rewrite é limitar a reescrita.'
      )
    ]
  },
  {
    id: 'compactaok',
    titulo: 'Compactação quieta',
    emoji: '🗜️',
    nivel: 'B1',
    onde: 'A compactação ficou quieta.',
    rodadas: [
      fala(
        'Reescreve',
        'Is the store quiet now?',
        'O armazenamento está quieto agora?',
        'Diga que o armazenamento está quieto agora.',
        'The store is quiet now.',
        ['the store is quiet now', 'that store is quiet now'],
        'Quiet now é quieto agora.'
      ),
      fala(
        'Solta',
        'Can the old files stay?',
        'Os arquivos velhos podem ficar?',
        'Diga que os arquivos velhos podem ficar.',
        'The old files can stay.',
        ['the old files can stay', 'those old files can stay'],
        'Can stay é podem ficar.'
      )
    ]
  }
];

export const DIARIOS = [
  {
    id: 'diariocheio',
    titulo: 'Diário cheio',
    emoji: '✒️',
    nivel: 'A2',
    onde: 'O diário de escrita encheu.',
    rodadas: [
      fala(
        'Ocupa',
        'What happened to the write log?',
        'O que aconteceu com o diário de escrita?',
        'Diga que o diário de escrita encheu.',
        'The write log filled up.',
        ['the write log filled up', 'that write log filled up'],
        'Filled up é encheu.'
      ),
      fala(
        'Segue',
        'What should we free?',
        'O que a gente libera?',
        'Peça para liberar o diário de escrita.',
        'Please free the write log.',
        ['please free the write log', 'free the write log'],
        'Free the log é liberar o diário.'
      )
    ]
  },
  {
    id: 'quatrogiga',
    titulo: 'Quatro gigas',
    emoji: '✒️',
    nivel: 'B1',
    onde: 'O diário guarda quatro gigabytes.',
    rodadas: [
      fala(
        'Ocupa',
        'How much does the log hold?',
        'Quanto o diário guarda?',
        'Diga que o diário guarda quatro gigabytes.',
        'The log holds four gigabytes.',
        [
          'the log holds four gigabytes',
          'the log holds 4 gigabytes',
          'that log holds four gigabytes'
        ],
        'Four gigabytes é quatro gigabytes.'
      ),
      fala(
        'Segue',
        'Where should we cap the log?',
        'Onde a gente limita o diário?',
        'Peça para limitar o diário em quatro gigabytes.',
        'Please cap the log at four gigabytes.',
        [
          'please cap the log at four gigabytes',
          'please cap the log at 4 gigabytes',
          'cap the log at four gigabytes'
        ],
        'Cap the log é limitar o diário.'
      )
    ]
  },
  {
    id: 'diariolivre',
    titulo: 'Diário livre',
    emoji: '✒️',
    nivel: 'B1',
    onde: 'O diário de escrita ficou livre.',
    rodadas: [
      fala(
        'Ocupa',
        'Is the write log free now?',
        'O diário de escrita está livre agora?',
        'Diga que o diário de escrita está livre agora.',
        'The write log is free now.',
        ['the write log is free now', 'that write log is free now'],
        'Free now é livre agora.'
      ),
      fala(
        'Segue',
        'Can new writes continue?',
        'As escritas novas podem seguir?',
        'Diga que as escritas novas podem seguir.',
        'New writes can continue.',
        ['new writes can continue', 'the new writes can continue'],
        'Can continue é podem seguir.'
      )
    ]
  }
];

export const VAGOES = [
  {
    id: 'vagaomil',
    titulo: 'Mil atrás',
    emoji: '🚃',
    nivel: 'A2',
    onde: 'O leitor ficou mil mensagens atrás.',
    rodadas: [
      fala(
        'Atrasa',
        'Where does the reader sit?',
        'Onde o leitor está?',
        'Diga que o leitor ficou mil mensagens atrás.',
        'The reader sits a thousand messages behind.',
        ['the reader sits a thousand messages behind', 'that reader sits a thousand messages behind'],
        'A thousand messages behind é mil mensagens atrás.'
      ),
      fala(
        'Alcança',
        'What should we do with the reader?',
        'O que a gente faz com o leitor?',
        'Peça para alcançar o leitor.',
        'Please catch the reader up.',
        ['please catch the reader up', 'catch the reader up'],
        'Catch up é alcançar.'
      )
    ]
  },
  {
    id: 'milvagoes',
    titulo: 'Mil mensagens',
    emoji: '🚃',
    nivel: 'B1',
    onde: 'O atraso é de mil mensagens.',
    rodadas: [
      fala(
        'Atrasa',
        'How big is the lag?',
        'Qual é o tamanho do atraso?',
        'Diga que o atraso é de mil mensagens.',
        'The lag is one thousand messages.',
        [
          'the lag is one thousand messages',
          'the lag is 1000 messages',
          'that lag is one thousand messages'
        ],
        'One thousand messages é mil mensagens.'
      ),
      fala(
        'Alcança',
        'Where should we cap the lag?',
        'Onde a gente limita o atraso?',
        'Peça para limitar o atraso em mil mensagens.',
        'Please cap the lag at one thousand messages.',
        [
          'please cap the lag at one thousand messages',
          'please cap the lag at 1000 messages',
          'cap the lag at one thousand messages'
        ],
        'Cap the lag é limitar o atraso.'
      )
    ]
  },
  {
    id: 'vagaojunto',
    titulo: 'Leitor junto',
    emoji: '🚃',
    nivel: 'B1',
    onde: 'O leitor chegou no fim publicado.',
    rodadas: [
      fala(
        'Atrasa',
        'Is the reader caught up?',
        'O leitor alcançou o fim?',
        'Diga que o leitor alcançou o fim.',
        'The reader is caught up.',
        ['the reader is caught up', 'that reader is caught up'],
        'Caught up é alcançou o fim.'
      ),
      fala(
        'Alcança',
        'Where does the reader stay?',
        'Onde o leitor fica?',
        'Diga que o leitor fica no fim publicado.',
        'The reader stays with the published end.',
        ['the reader stays with the published end', 'that reader stays with the published end'],
        'Published end é o fim publicado.'
      )
    ]
  }
];

export function compactaPorId(id) {
  return COMPACTAS.find(c => c.id === id) ?? null;
}

export function diarioPorId(id) {
  return DIARIOS.find(c => c.id === id) ?? null;
}

export function vagaoPorId(id) {
  return VAGOES.find(c => c.id === id) ?? null;
}

export function avaliarCompacta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDiario(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVagao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
