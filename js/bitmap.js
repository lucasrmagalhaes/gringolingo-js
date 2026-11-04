// Bitmap que marca o bit, roaring que junta o intervalo e hyper que estima os distintos.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const BITMAPS = [
  {
    id: 'bitmapuma',
    titulo: 'Marca do bitmap',
    emoji: '🗺️',
    nivel: 'A2',
    onde: 'O mapa marca o bit da chave.',
    rodadas: [
      fala(
        'Marca',
        'What does the bitmap mark?',
        'O que o bitmap marca?',
        'Diga que o bitmap marca o bit da chave.',
        'The bitmap marks the bit for the key.',
        [
          'the bitmap marks the bit for the key',
          'that bitmap marks the bit for the key'
        ],
        'Marks the bit é marca o bit.'
      ),
      fala(
        'Segue',
        'What should we mark?',
        'O que a gente marca?',
        'Peça para marcar o bit da chave.',
        'Please mark the bit for the key.',
        ['please mark the bit for the key', 'mark the bit for the key'],
        'Mark the bit é marcar o bit.'
      )
    ]
  },
  {
    id: 'bitmap2',
    titulo: 'Bitmap dois',
    emoji: '🗺️',
    nivel: 'B1',
    onde: 'O bitmap marcou dois bits.',
    rodadas: [
      fala(
        'Marca',
        'How many bits did the bitmap mark?',
        'Quantos bits o bitmap marcou?',
        'Diga que o bitmap marcou dois bits.',
        'The bitmap marked two bits.',
        [
          'the bitmap marked two bits',
          'the bitmap marked 2 bits',
          'that bitmap marked two bits'
        ],
        'Two bits é dois bits.'
      ),
      fala(
        'Segue',
        'Where should we cap the bits?',
        'Onde a gente limita os bits?',
        'Peça para marcar dois bits.',
        'Please mark two bits.',
        ['please mark two bits', 'please mark 2 bits', 'mark two bits'],
        'Mark two bits é marcar dois bits.'
      )
    ]
  },
  {
    id: 'bitmapok',
    titulo: 'Bitmap no alvo',
    emoji: '🗺️',
    nivel: 'B1',
    onde: 'O bitmap pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the bitmap stay?',
        'O bitmap pode ficar?',
        'Diga que o bitmap pode ficar.',
        'The bitmap can stay.',
        ['the bitmap can stay', 'that bitmap can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this bitmap stay quiet?',
        'Este bitmap pode ficar quieto?',
        'Diga que este bitmap pode ficar quieto.',
        'This bitmap can stay quiet.',
        ['this bitmap can stay quiet', 'that bitmap can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const ROARINGS = [
  {
    id: 'roaringbase',
    titulo: 'Junta do roaring',
    emoji: '🦁',
    nivel: 'A2',
    onde: 'Os bits iguais viram um intervalo.',
    rodadas: [
      fala(
        'Junta',
        'How does the roaring bitmap store equal bits?',
        'Como o roaring guarda bits iguais?',
        'Diga que o roaring guarda bits iguais como um intervalo.',
        'The roaring bitmap stores equal bits as one range.',
        [
          'the roaring bitmap stores equal bits as one range',
          'that roaring bitmap stores equal bits as one range'
        ],
        'One range é um intervalo.'
      ),
      fala(
        'Segue',
        'What should the roaring bitmap store?',
        'O que o roaring deve guardar?',
        'Peça para guardar bits iguais como um intervalo.',
        'Please store equal bits as one range.',
        [
          'please store equal bits as one range',
          'store equal bits as one range'
        ],
        'Store equal bits é guardar bits iguais.'
      )
    ]
  },
  {
    id: 'roaring3',
    titulo: 'Roaring três',
    emoji: '🦁',
    nivel: 'B1',
    onde: 'O roaring guardou três intervalos.',
    rodadas: [
      fala(
        'Junta',
        'How many ranges did the roaring bitmap store?',
        'Quantos intervalos o roaring guardou?',
        'Diga que o roaring guardou três intervalos.',
        'The roaring bitmap stored three ranges.',
        [
          'the roaring bitmap stored three ranges',
          'the roaring bitmap stored 3 ranges',
          'that roaring bitmap stored three ranges'
        ],
        'Three ranges é três intervalos.'
      ),
      fala(
        'Segue',
        'Where should we cap the ranges?',
        'Onde a gente limita os intervalos?',
        'Peça para guardar três intervalos.',
        'Please store three ranges.',
        ['please store three ranges', 'please store 3 ranges', 'store three ranges'],
        'Store three ranges é guardar três intervalos.'
      )
    ]
  },
  {
    id: 'roaringok',
    titulo: 'Roaring no alvo',
    emoji: '🦁',
    nivel: 'B1',
    onde: 'O roaring pode ficar.',
    rodadas: [
      fala(
        'Junta',
        'Can the roaring bitmap stay?',
        'O roaring pode ficar?',
        'Diga que o roaring pode ficar.',
        'The roaring bitmap can stay.',
        ['the roaring bitmap can stay', 'that roaring bitmap can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this roaring bitmap stay quiet?',
        'Este roaring pode ficar quieto?',
        'Diga que este roaring pode ficar quieto.',
        'This roaring bitmap can stay quiet.',
        ['this roaring bitmap can stay quiet', 'that roaring bitmap can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const HYPERS = [
  {
    id: 'hyperbase',
    titulo: 'Estima do hyper',
    emoji: '🧮',
    nivel: 'A2',
    onde: 'A conta estima itens distintos.',
    rodadas: [
      fala(
        'Estima',
        'What does the sketch estimate?',
        'O que a conta estima?',
        'Diga que a conta estima os itens distintos.',
        'The sketch estimates the distinct items.',
        [
          'the sketch estimates the distinct items',
          'that sketch estimates the distinct items'
        ],
        'Distinct items é itens distintos.'
      ),
      fala(
        'Segue',
        'What should the sketch estimate?',
        'O que a conta deve estimar?',
        'Peça para estimar os itens distintos.',
        'Please estimate the distinct items.',
        [
          'please estimate the distinct items',
          'estimate the distinct items'
        ],
        'Estimate the distinct items é estimar os itens distintos.'
      )
    ]
  },
  {
    id: 'hyper4',
    titulo: 'Hyper quatro',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'A conta estimou quatro conjuntos.',
    rodadas: [
      fala(
        'Estima',
        'How many sets did the sketch estimate?',
        'Quantos conjuntos a conta estimou?',
        'Diga que a conta estimou quatro conjuntos.',
        'The sketch estimated four sets.',
        [
          'the sketch estimated four sets',
          'the sketch estimated 4 sets',
          'that sketch estimated four sets'
        ],
        'Four sets é quatro conjuntos.'
      ),
      fala(
        'Segue',
        'Where should we cap the sets?',
        'Onde a gente limita os conjuntos?',
        'Peça para estimar quatro conjuntos.',
        'Please estimate four sets.',
        ['please estimate four sets', 'please estimate 4 sets', 'estimate four sets'],
        'Estimate four sets é estimar quatro conjuntos.'
      )
    ]
  },
  {
    id: 'hyperok',
    titulo: 'Hyper no alvo',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'O hyper pode ficar.',
    rodadas: [
      fala(
        'Estima',
        'Can the sketch stay?',
        'A conta pode ficar?',
        'Diga que a conta pode ficar.',
        'The sketch can stay.',
        ['the sketch can stay', 'that sketch can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this sketch stay quiet?',
        'Esta conta pode ficar quieta?',
        'Diga que esta conta pode ficar quieta.',
        'This sketch can stay quiet.',
        ['this sketch can stay quiet', 'that sketch can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function bitmapPorId(id) {
  return BITMAPS.find(c => c.id === id) ?? null;
}

export function roaringPorId(id) {
  return ROARINGS.find(c => c.id === id) ?? null;
}

export function hyperPorId(id) {
  return HYPERS.find(c => c.id === id) ?? null;
}

export function avaliarBitmap(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRoaring(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarHyper(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
