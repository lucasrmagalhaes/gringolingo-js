// Bloom que marca a chave, cuco que muda de ninho e esboço que guarda a conta.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const BLOOMS = [
  {
    id: 'bloomuma',
    titulo: 'Uso do bloom',
    emoji: '🌸',
    nivel: 'A2',
    onde: 'O filtro pode dizer que a chave está lá.',
    rodadas: [
      fala(
        'Marca',
        'What can the filter say about the key?',
        'O que o filtro pode dizer sobre a chave?',
        'Diga que o filtro pode dizer que a chave está lá.',
        'The filter may say the key is there.',
        [
          'the filter may say the key is there',
          'that filter may say the key is there'
        ],
        'May say é pode dizer.'
      ),
      fala(
        'Segue',
        'What should the filter do?',
        'O que o filtro deve fazer?',
        'Peça para dizer que a chave está lá.',
        'Please say the key is there.',
        ['please say the key is there', 'say the key is there'],
        'Say the key is there é dizer que a chave está lá.'
      )
    ]
  },
  {
    id: 'bloom2',
    titulo: 'Bloom dois',
    emoji: '🌸',
    nivel: 'B1',
    onde: 'O bloom marcou duas chaves.',
    rodadas: [
      fala(
        'Marca',
        'How many keys did the bloom mark?',
        'Quantas chaves o bloom marcou?',
        'Diga que o bloom marcou duas chaves.',
        'The bloom marked two keys.',
        [
          'the bloom marked two keys',
          'the bloom marked 2 keys',
          'that bloom marked two keys'
        ],
        'Two keys é duas chaves.'
      ),
      fala(
        'Segue',
        'Where should we cap the keys?',
        'Onde a gente limita as chaves?',
        'Peça para marcar duas chaves.',
        'Please mark two keys.',
        ['please mark two keys', 'please mark 2 keys', 'mark two keys'],
        'Mark two keys é marcar duas chaves.'
      )
    ]
  },
  {
    id: 'bloomok',
    titulo: 'Bloom no alvo',
    emoji: '🌸',
    nivel: 'B1',
    onde: 'O bloom pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the bloom stay?',
        'O bloom pode ficar?',
        'Diga que o bloom pode ficar.',
        'The bloom can stay.',
        ['the bloom can stay', 'that bloom can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this bloom stay quiet?',
        'Este bloom pode ficar quieto?',
        'Diga que este bloom pode ficar quieto.',
        'This bloom can stay quiet.',
        ['this bloom can stay quiet', 'that bloom can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const CUCOS = [
  {
    id: 'cucobase',
    titulo: 'Ninho do cuco',
    emoji: '🪺',
    nivel: 'A2',
    onde: 'A chave muda de ninho quando o lugar enche.',
    rodadas: [
      fala(
        'Move',
        'Where does the key move?',
        'Para onde a chave muda?',
        'Diga que a chave muda para o outro ninho.',
        'The key moves to the other nest.',
        [
          'the key moves to the other nest',
          'that key moves to the other nest'
        ],
        'Other nest é outro ninho.'
      ),
      fala(
        'Segue',
        'What should the key do?',
        'O que a chave deve fazer?',
        'Peça para mudar a chave para o outro ninho.',
        'Please move the key to the other nest.',
        ['please move the key to the other nest', 'move the key to the other nest'],
        'Move the key é mudar a chave.'
      )
    ]
  },
  {
    id: 'cuco3',
    titulo: 'Cuco três',
    emoji: '🪺',
    nivel: 'B1',
    onde: 'O cuco mudou três chaves.',
    rodadas: [
      fala(
        'Move',
        'How many keys did the cuckoo move?',
        'Quantas chaves o cuco mudou?',
        'Diga que o cuco mudou três chaves.',
        'The cuckoo moved three keys.',
        [
          'the cuckoo moved three keys',
          'the cuckoo moved 3 keys',
          'that cuckoo moved three keys'
        ],
        'Three keys é três chaves.'
      ),
      fala(
        'Segue',
        'Where should we cap the keys?',
        'Onde a gente limita as chaves?',
        'Peça para mudar três chaves.',
        'Please move three keys.',
        ['please move three keys', 'please move 3 keys', 'move three keys'],
        'Move three keys é mudar três chaves.'
      )
    ]
  },
  {
    id: 'cucook',
    titulo: 'Cuco no alvo',
    emoji: '🪺',
    nivel: 'B1',
    onde: 'O cuco pode ficar.',
    rodadas: [
      fala(
        'Move',
        'Can the cuckoo stay?',
        'O cuco pode ficar?',
        'Diga que o cuco pode ficar.',
        'The cuckoo can stay.',
        ['the cuckoo can stay', 'that cuckoo can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this cuckoo stay quiet?',
        'Este cuco pode ficar quieto?',
        'Diga que este cuco pode ficar quieto.',
        'This cuckoo can stay quiet.',
        ['this cuckoo can stay quiet', 'that cuckoo can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const ESBOCOS = [
  {
    id: 'esbocobase',
    titulo: 'Conta do esboço',
    emoji: '✏️',
    nivel: 'A2',
    onde: 'O desenho guarda uma conta pequena.',
    rodadas: [
      fala(
        'Conta',
        'What does the sketch keep?',
        'O que o desenho guarda?',
        'Diga que o desenho guarda uma conta pequena.',
        'The sketch keeps a small count.',
        [
          'the sketch keeps a small count',
          'that sketch keeps a small count'
        ],
        'Small count é conta pequena.'
      ),
      fala(
        'Segue',
        'What should the sketch do?',
        'O que o desenho deve fazer?',
        'Peça para guardar uma conta pequena.',
        'Please store a small count.',
        ['please store a small count', 'store a small count'],
        'Store a small count é guardar uma conta pequena.'
      )
    ]
  },
  {
    id: 'esboco4',
    titulo: 'Esboço quatro',
    emoji: '✏️',
    nivel: 'B1',
    onde: 'O esboço contou quatro linhas.',
    rodadas: [
      fala(
        'Conta',
        'How many rows did the sketch count?',
        'Quantas linhas o esboço contou?',
        'Diga que o esboço contou quatro linhas.',
        'The sketch counted four rows.',
        [
          'the sketch counted four rows',
          'the sketch counted 4 rows',
          'that sketch counted four rows'
        ],
        'Four rows é quatro linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para contar quatro linhas.',
        'Please count four rows.',
        ['please count four rows', 'please count 4 rows', 'count four rows'],
        'Count four rows é contar quatro linhas.'
      )
    ]
  },
  {
    id: 'esbocook',
    titulo: 'Esboço no alvo',
    emoji: '✏️',
    nivel: 'B1',
    onde: 'O esboço pode ficar.',
    rodadas: [
      fala(
        'Conta',
        'Can the sketch stay?',
        'O esboço pode ficar?',
        'Diga que o esboço pode ficar.',
        'The sketch can stay.',
        ['the sketch can stay', 'that sketch can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this sketch stay quiet?',
        'Este esboço pode ficar quieto?',
        'Diga que este esboço pode ficar quieto.',
        'This sketch can stay quiet.',
        ['this sketch can stay quiet', 'that sketch can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function bloomPorId(id) {
  return BLOOMS.find(c => c.id === id) ?? null;
}

export function cucoPorId(id) {
  return CUCOS.find(c => c.id === id) ?? null;
}

export function esbocoPorId(id) {
  return ESBOCOS.find(c => c.id === id) ?? null;
}

export function avaliarBloom(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCuco(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEsboco(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
