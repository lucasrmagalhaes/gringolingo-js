// Hint que aponta a linha, vacuum que devolve o espaço e freeze que deixa a linha antiga para leitura.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const HINTS = [
  {
    id: 'hintuma',
    titulo: 'Aponta do hint',
    emoji: '🔖',
    nivel: 'A2',
    onde: 'A dica aponta a linha que pode sair.',
    rodadas: [
      fala(
        'Aponta',
        'What does the hint point to?',
        'Para onde a dica aponta?',
        'Diga que a dica aponta a linha que pode sair.',
        'The hint points to the row that can leave.',
        [
          'the hint points to the row that can leave',
          'that hint points to the row that can leave'
        ],
        'Points to the row é aponta a linha.'
      ),
      fala(
        'Segue',
        'What should we point to?',
        'Para onde a gente aponta?',
        'Peça para apontar a linha que pode sair.',
        'Please point to the row that can leave.',
        [
          'please point to the row that can leave',
          'point to the row that can leave'
        ],
        'Point to the row é apontar a linha.'
      )
    ]
  },
  {
    id: 'hint2',
    titulo: 'Hint dois',
    emoji: '🔖',
    nivel: 'B1',
    onde: 'O hint apontou duas linhas.',
    rodadas: [
      fala(
        'Aponta',
        'How many rows did the hint point to?',
        'Quantas linhas o hint apontou?',
        'Diga que o hint apontou duas linhas.',
        'The hint pointed two rows.',
        [
          'the hint pointed two rows',
          'the hint pointed 2 rows',
          'that hint pointed two rows'
        ],
        'Two rows é duas linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para apontar duas linhas.',
        'Please point to two rows.',
        ['please point to two rows', 'please point to 2 rows', 'point to two rows'],
        'Point to two rows é apontar duas linhas.'
      )
    ]
  },
  {
    id: 'hintok',
    titulo: 'Hint no alvo',
    emoji: '🔖',
    nivel: 'B1',
    onde: 'O hint pode ficar.',
    rodadas: [
      fala(
        'Aponta',
        'Can the hint stay?',
        'O hint pode ficar?',
        'Diga que o hint pode ficar.',
        'The hint can stay.',
        ['the hint can stay', 'that hint can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this hint stay quiet?',
        'Este hint pode ficar quieto?',
        'Diga que este hint pode ficar quieto.',
        'This hint can stay quiet.',
        ['this hint can stay quiet', 'that hint can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const VACUUMS = [
  {
    id: 'vacuumbase',
    titulo: 'Limpa do vacuum',
    emoji: '🧹',
    nivel: 'A2',
    onde: 'A limpeza devolve o espaço morto.',
    rodadas: [
      fala(
        'Limpa',
        'What does the cleanup return?',
        'O que a limpeza devolve?',
        'Diga que a limpeza devolve o espaço morto.',
        'The cleanup returns the dead space.',
        [
          'the cleanup returns the dead space',
          'that cleanup returns the dead space'
        ],
        'Dead space é espaço morto.'
      ),
      fala(
        'Segue',
        'What should the cleanup do?',
        'O que a limpeza deve fazer?',
        'Peça para devolver o espaço morto.',
        'Please return the dead space.',
        ['please return the dead space', 'return the dead space'],
        'Return the dead space é devolver o espaço morto.'
      )
    ]
  },
  {
    id: 'vacuum3',
    titulo: 'Vacuum três',
    emoji: '🧹',
    nivel: 'B1',
    onde: 'O vacuum devolveu três espaços.',
    rodadas: [
      fala(
        'Limpa',
        'How many spaces did the vacuum return?',
        'Quantos espaços o vacuum devolveu?',
        'Diga que o vacuum devolveu três espaços.',
        'The vacuum returned three spaces.',
        [
          'the vacuum returned three spaces',
          'the vacuum returned 3 spaces',
          'that vacuum returned three spaces'
        ],
        'Three spaces é três espaços.'
      ),
      fala(
        'Segue',
        'Where should we cap the spaces?',
        'Onde a gente limita os espaços?',
        'Peça para devolver três espaços.',
        'Please return three spaces.',
        ['please return three spaces', 'please return 3 spaces', 'return three spaces'],
        'Return three spaces é devolver três espaços.'
      )
    ]
  },
  {
    id: 'vacuumok',
    titulo: 'Vacuum no alvo',
    emoji: '🧹',
    nivel: 'B1',
    onde: 'O vacuum pode ficar.',
    rodadas: [
      fala(
        'Limpa',
        'Can the vacuum stay?',
        'O vacuum pode ficar?',
        'Diga que o vacuum pode ficar.',
        'The vacuum can stay.',
        ['the vacuum can stay', 'that vacuum can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this vacuum stay quiet?',
        'Este vacuum pode ficar quieto?',
        'Diga que este vacuum pode ficar quieto.',
        'This vacuum can stay quiet.',
        ['this vacuum can stay quiet', 'that vacuum can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const FREEZES = [
  {
    id: 'freezebase',
    titulo: 'Trava do freeze',
    emoji: '🧊',
    nivel: 'A2',
    onde: 'A linha antiga fica só para leitura.',
    rodadas: [
      fala(
        'Trava',
        'What happens to the old row?',
        'O que acontece com a linha antiga?',
        'Diga que a linha antiga fica só para leitura.',
        'The old row stays read only.',
        [
          'the old row stays read only',
          'that old row stays read only'
        ],
        'Read only é só para leitura.'
      ),
      fala(
        'Segue',
        'What should we do with the old row?',
        'O que a gente faz com a linha antiga?',
        'Peça para deixar a linha antiga só para leitura.',
        'Please leave the old row read only.',
        [
          'please leave the old row read only',
          'leave the old row read only'
        ],
        'Leave the old row é deixar a linha antiga.'
      )
    ]
  },
  {
    id: 'freeze4',
    titulo: 'Freeze quatro',
    emoji: '🧊',
    nivel: 'B1',
    onde: 'O freeze deixou quatro linhas só para leitura.',
    rodadas: [
      fala(
        'Trava',
        'How many rows did the freeze leave read only?',
        'Quantas linhas o freeze deixou só para leitura?',
        'Diga que o freeze deixou quatro linhas só para leitura.',
        'The freeze left four rows read only.',
        [
          'the freeze left four rows read only',
          'the freeze left 4 rows read only',
          'that freeze left four rows read only'
        ],
        'Four rows é quatro linhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the rows?',
        'Onde a gente limita as linhas?',
        'Peça para deixar quatro linhas só para leitura.',
        'Please leave four rows read only.',
        [
          'please leave four rows read only',
          'please leave 4 rows read only',
          'leave four rows read only'
        ],
        'Leave four rows é deixar quatro linhas.'
      )
    ]
  },
  {
    id: 'freezeok',
    titulo: 'Freeze no alvo',
    emoji: '🧊',
    nivel: 'B1',
    onde: 'O freeze pode ficar.',
    rodadas: [
      fala(
        'Trava',
        'Can the freeze stay?',
        'O freeze pode ficar?',
        'Diga que o freeze pode ficar.',
        'The freeze can stay.',
        ['the freeze can stay', 'that freeze can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this freeze stay quiet?',
        'Este freeze pode ficar quieto?',
        'Diga que este freeze pode ficar quieto.',
        'This freeze can stay quiet.',
        ['this freeze can stay quiet', 'that freeze can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function hintPorId(id) {
  return HINTS.find(c => c.id === id) ?? null;
}

export function vacuumPorId(id) {
  return VACUUMS.find(c => c.id === id) ?? null;
}

export function freezePorId(id) {
  return FREEZES.find(c => c.id === id) ?? null;
}

export function avaliarHint(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVacuum(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFreeze(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
