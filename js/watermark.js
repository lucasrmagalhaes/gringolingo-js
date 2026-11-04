// Watermark que marca a leitura, barrier que espera o lote e align que alinha as linhas.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const WATERMARKS = [
  {
    id: 'watermarkuma',
    titulo: 'Marca do watermark',
    emoji: '🪧',
    nivel: 'A2',
    onde: 'A marca mostra até onde a leitura chegou.',
    rodadas: [
      fala(
        'Marca',
        'What does the watermark show?',
        'O que a marca mostra?',
        'Diga que a marca mostra até onde a leitura chegou.',
        'The watermark shows how far the read got.',
        [
          'the watermark shows how far the read got',
          'that watermark shows how far the read got'
        ],
        'How far the read got é até onde a leitura chegou.'
      ),
      fala(
        'Segue',
        'What should the watermark do with the read?',
        'O que a marca deve fazer com a leitura?',
        'Peça para mostrar até onde a leitura chegou.',
        'Please show how far the read got.',
        [
          'please show how far the read got',
          'show how far the read got'
        ],
        'Show how far é mostrar até onde.'
      )
    ]
  },
  {
    id: 'watermark2',
    titulo: 'Watermark dois',
    emoji: '🪧',
    nivel: 'B1',
    onde: 'A marca anotou duas linhas.',
    rodadas: [
      fala(
        'Marca',
        'How many rows did the watermark mark?',
        'Quantas linhas a marca anotou?',
        'Diga que a marca anotou duas linhas.',
        'The watermark marked two rows.',
        [
          'the watermark marked two rows',
          'the watermark marked 2 rows',
          'that watermark marked two rows'
        ],
        'Two rows é duas linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para marcar duas linhas.',
        'Please mark two rows.',
        ['please mark two rows', 'please mark 2 rows', 'mark two rows'],
        'Mark two rows é marcar duas linhas.'
      )
    ]
  },
  {
    id: 'watermarkok',
    titulo: 'Watermark no alvo',
    emoji: '🪧',
    nivel: 'B1',
    onde: 'A marca pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the watermark stay?',
        'A marca pode ficar?',
        'Diga que a marca pode ficar.',
        'The watermark can stay.',
        ['the watermark can stay', 'that watermark can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this watermark stay quiet?',
        'Esta marca pode ficar quieta?',
        'Diga que esta marca pode ficar quieta.',
        'This watermark can stay quiet.',
        ['this watermark can stay quiet', 'that watermark can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const BARRIERS = [
  {
    id: 'barrierbase',
    titulo: 'Espera do barrier',
    emoji: '🚧',
    nivel: 'A2',
    onde: 'A barreira espera o lote inteiro.',
    rodadas: [
      fala(
        'Espera',
        'What does the barrier wait for?',
        'O que a barreira espera?',
        'Diga que a barreira espera o lote inteiro.',
        'The barrier waits for the whole batch.',
        [
          'the barrier waits for the whole batch',
          'that barrier waits for the whole batch'
        ],
        'The whole batch é o lote inteiro.'
      ),
      fala(
        'Segue',
        'What should the barrier do with the batch?',
        'O que a barreira deve fazer com o lote?',
        'Peça para esperar o lote inteiro.',
        'Please wait for the whole batch.',
        [
          'please wait for the whole batch',
          'wait for the whole batch'
        ],
        'Wait for the whole batch é esperar o lote inteiro.'
      )
    ]
  },
  {
    id: 'barrier3',
    titulo: 'Barrier três',
    emoji: '🚧',
    nivel: 'B1',
    onde: 'A barreira esperou três partes.',
    rodadas: [
      fala(
        'Espera',
        'How many parts did the barrier wait for?',
        'Quantas partes a barreira esperou?',
        'Diga que a barreira esperou três partes.',
        'The barrier waited for three parts.',
        [
          'the barrier waited for three parts',
          'the barrier waited for 3 parts',
          'that barrier waited for three parts'
        ],
        'Three parts é três partes.'
      ),
      fala(
        'Segue',
        'Where should we cap the wait?',
        'Onde a gente limita a espera?',
        'Peça para esperar três partes.',
        'Please wait for three parts.',
        ['please wait for three parts', 'please wait for 3 parts', 'wait for three parts'],
        'Wait for three parts é esperar três partes.'
      )
    ]
  },
  {
    id: 'barrierok',
    titulo: 'Barrier no alvo',
    emoji: '🚧',
    nivel: 'B1',
    onde: 'A barreira pode ficar.',
    rodadas: [
      fala(
        'Espera',
        'Can the barrier stay?',
        'A barreira pode ficar?',
        'Diga que a barreira pode ficar.',
        'The barrier can stay.',
        ['the barrier can stay', 'that barrier can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this barrier stay quiet?',
        'Esta barreira pode ficar quieta?',
        'Diga que esta barreira pode ficar quieta.',
        'This barrier can stay quiet.',
        ['this barrier can stay quiet', 'that barrier can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const ALIGNS = [
  {
    id: 'alignbase',
    titulo: 'Linha do align',
    emoji: '📐',
    nivel: 'A2',
    onde: 'As linhas ficam na mesma altura.',
    rodadas: [
      fala(
        'Alinha',
        'What does the align do with the rows?',
        'O que o align faz com as linhas?',
        'Diga que as linhas ficam na mesma altura.',
        'The align keeps the rows at one height.',
        [
          'the align keeps the rows at one height',
          'that align keeps the rows at one height'
        ],
        'One height é a mesma altura.'
      ),
      fala(
        'Segue',
        'What should the align do next?',
        'O que o align deve fazer agora?',
        'Peça para alinhar as linhas.',
        'Please line the rows up.',
        [
          'please line the rows up',
          'line the rows up'
        ],
        'Line the rows up é alinhar as linhas.'
      )
    ]
  },
  {
    id: 'align4',
    titulo: 'Align quatro',
    emoji: '📐',
    nivel: 'B1',
    onde: 'O align alinhou quatro linhas.',
    rodadas: [
      fala(
        'Alinha',
        'How many rows did the align line up?',
        'Quantas linhas o align alinhou?',
        'Diga que o align alinhou quatro linhas.',
        'The align lined up four rows.',
        [
          'the align lined up four rows',
          'the align lined up 4 rows',
          'that align lined up four rows'
        ],
        'Four rows é quatro linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para alinhar quatro linhas.',
        'Please line up four rows.',
        ['please line up four rows', 'please line up 4 rows', 'line up four rows'],
        'Line up four rows é alinhar quatro linhas.'
      )
    ]
  },
  {
    id: 'alignok',
    titulo: 'Align no alvo',
    emoji: '📐',
    nivel: 'B1',
    onde: 'O align pode ficar.',
    rodadas: [
      fala(
        'Alinha',
        'Can the align stay?',
        'O align pode ficar?',
        'Diga que o align pode ficar.',
        'The align can stay.',
        ['the align can stay', 'that align can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this align stay quiet?',
        'Este align pode ficar quieto?',
        'Diga que este align pode ficar quieto.',
        'This align can stay quiet.',
        ['this align can stay quiet', 'that align can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function watermarkPorId(id) {
  return WATERMARKS.find(c => c.id === id) ?? null;
}

export function barrierPorId(id) {
  return BARRIERS.find(c => c.id === id) ?? null;
}

export function alignPorId(id) {
  return ALIGNS.find(c => c.id === id) ?? null;
}

export function avaliarWatermark(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBarrier(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAlign(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
