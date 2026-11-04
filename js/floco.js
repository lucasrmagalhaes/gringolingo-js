// Floco que nasce do tempo, época que sobe com a formação e vetor que anota a visão.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const FLOCOS = [
  {
    id: 'soltafloco',
    titulo: 'Nascimento do floco',
    emoji: '❄️',
    nivel: 'A2',
    onde: 'O id nasce do tempo do nó e de um contador.',
    rodadas: [
      fala(
        'Nasce',
        'How does the flake build the id?',
        'Como o floco monta o id?',
        'Diga que o floco monta o id com o relógio.',
        'The flake builds the id from the clock.',
        ['the flake builds the id from the clock', 'that flake builds the id from the clock'],
        'The flake é o floco.'
      ),
      fala(
        'Espera',
        'What should the flake do?',
        'O que o floco deve fazer?',
        'Peça para montar o id com o relógio.',
        'Please build the id from the clock.',
        ['please build the id from the clock', 'build the id from the clock'],
        'Build the id é montar o id.'
      )
    ]
  },
  {
    id: 'floco2',
    titulo: 'Floco dois',
    emoji: '❄️',
    nivel: 'B1',
    onde: 'O floco cunhou dois ids.',
    rodadas: [
      fala(
        'Nasce',
        'How many ids did the flake mint?',
        'Quantos ids o floco cunhou?',
        'Diga que o floco cunhou dois ids.',
        'The flake minted two ids.',
        [
          'the flake minted two ids',
          'the flake minted 2 ids',
          'that flake minted two ids'
        ],
        'Two ids é dois ids.'
      ),
      fala(
        'Espera',
        'Where should we cap the ids?',
        'Onde a gente limita os ids?',
        'Peça para cunhar dois ids.',
        'Please mint two ids.',
        [
          'please mint two ids',
          'please mint 2 ids',
          'mint two ids'
        ],
        'Mint two ids é cunhar dois ids.'
      )
    ]
  },
  {
    id: 'flocook',
    titulo: 'Floco no alvo',
    emoji: '❄️',
    nivel: 'B1',
    onde: 'O floco pode ficar.',
    rodadas: [
      fala(
        'Nasce',
        'Can the flake stay?',
        'O floco pode ficar?',
        'Diga que o floco pode ficar.',
        'The flake can stay.',
        ['the flake can stay', 'that flake can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Espera',
        'Can this flake stay open?',
        'Este floco pode ficar aberto?',
        'Diga que este floco pode ficar aberto.',
        'This flake can stay open.',
        ['this flake can stay open', 'that flake can stay open'],
        'Stay open é ficar aberto.'
      )
    ]
  }
];

export const EPOCAS = [
  {
    id: 'sobeepoca',
    titulo: 'Subida da época',
    emoji: '🗓️',
    nivel: 'A2',
    onde: 'A geração sobe quando a formação muda.',
    rodadas: [
      fala(
        'Sobe',
        'When does the epoch rise?',
        'Quando a época sobe?',
        'Diga que a época sobe quando a formação muda.',
        'The epoch rises when the membership changes.',
        [
          'the epoch rises when the membership changes',
          'that epoch rises when the membership changes'
        ],
        'The epoch é a época.'
      ),
      fala(
        'Segue',
        'What should the epoch do?',
        'O que a época deve fazer?',
        'Peça para subir a época.',
        'Please raise the epoch.',
        ['please raise the epoch', 'raise the epoch'],
        'Raise the epoch é subir a época.'
      )
    ]
  },
  {
    id: 'epoca3',
    titulo: 'Época três',
    emoji: '🗓️',
    nivel: 'B1',
    onde: 'A época cobriu três entradas.',
    rodadas: [
      fala(
        'Sobe',
        'How many joins did the epoch cover?',
        'Quantas entradas a época cobriu?',
        'Diga que a época cobriu três entradas.',
        'The epoch covered three joins.',
        [
          'the epoch covered three joins',
          'the epoch covered 3 joins',
          'that epoch covered three joins'
        ],
        'Three joins é três entradas.'
      ),
      fala(
        'Segue',
        'Where should we cap the joins?',
        'Onde a gente limita as entradas?',
        'Peça para cobrir três entradas.',
        'Please cover three joins.',
        [
          'please cover three joins',
          'please cover 3 joins',
          'cover three joins'
        ],
        'Cover three joins é cobrir três entradas.'
      )
    ]
  },
  {
    id: 'epocaok',
    titulo: 'Época no alvo',
    emoji: '🗓️',
    nivel: 'B1',
    onde: 'A época pode ficar.',
    rodadas: [
      fala(
        'Sobe',
        'Can the epoch stay?',
        'A época pode ficar?',
        'Diga que a época pode ficar.',
        'The epoch can stay.',
        ['the epoch can stay', 'that epoch can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this epoch stay quiet?',
        'Esta época pode ficar quieta?',
        'Diga que esta época pode ficar quieta.',
        'This epoch can stay quiet.',
        ['this epoch can stay quiet', 'that epoch can stay quiet'],
        'Stay quiet é ficar quieta.'
      )
    ]
  }
];

export const VETORES = [
  {
    id: 'anotavetor',
    titulo: 'Nota do vetor',
    emoji: '🧮',
    nivel: 'A2',
    onde: 'O nó anota a própria visão dos eventos.',
    rodadas: [
      fala(
        'Anota',
        'What does the vector record?',
        'O que o vetor anota?',
        'Diga que o vetor anota o que este nó viu.',
        'The vector records what this node saw.',
        ['the vector records what this node saw', 'that vector records what this node saw'],
        'The vector é o vetor.'
      ),
      fala(
        'Fecha',
        'What should the vector do?',
        'O que o vetor deve fazer?',
        'Peça para anotar a visão local.',
        'Please record the local view.',
        ['please record the local view', 'record the local view'],
        'Record the local view é anotar a visão local.'
      )
    ]
  },
  {
    id: 'vetor4',
    titulo: 'Vetor quatro',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'O vetor guardou quatro eventos.',
    rodadas: [
      fala(
        'Anota',
        'How many events did the vector store?',
        'Quantos eventos o vetor guardou?',
        'Diga que o vetor guardou quatro eventos.',
        'The vector stored four events.',
        [
          'the vector stored four events',
          'the vector stored 4 events',
          'that vector stored four events'
        ],
        'Four events é quatro eventos.'
      ),
      fala(
        'Fecha',
        'Where should we cap the events?',
        'Onde a gente limita os eventos?',
        'Peça para guardar quatro eventos.',
        'Please store four events.',
        [
          'please store four events',
          'please store 4 events',
          'store four events'
        ],
        'Store four events é guardar quatro eventos.'
      )
    ]
  },
  {
    id: 'vetorok',
    titulo: 'Vetor no alvo',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'O vetor pode ficar.',
    rodadas: [
      fala(
        'Anota',
        'Can the vector stay?',
        'O vetor pode ficar?',
        'Diga que o vetor pode ficar.',
        'The vector can stay.',
        ['the vector can stay', 'that vector can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this vector stay closed?',
        'Este vetor pode ficar fechado?',
        'Diga que este vetor pode ficar fechado.',
        'This vector can stay closed.',
        ['this vector can stay closed', 'that vector can stay closed'],
        'Stay closed é ficar fechado.'
      )
    ]
  }
];

export function flocoPorId(id) {
  return FLOCOS.find(c => c.id === id) ?? null;
}

export function epocaPorId(id) {
  return EPOCAS.find(c => c.id === id) ?? null;
}

export function vetorPorId(id) {
  return VETORES.find(c => c.id === id) ?? null;
}

export function avaliarFloco(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEpoca(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVetor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
