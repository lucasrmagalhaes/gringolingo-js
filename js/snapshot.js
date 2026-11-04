// Snapshot que guarda o instante, restore que devolve e promote que eleva a cópia.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SNAPSHOTS = [
  {
    id: 'snapshotuma',
    titulo: 'Uso do snapshot',
    emoji: '📷',
    nivel: 'A2',
    onde: 'A foto guarda o banco naquele instante.',
    rodadas: [
      fala(
        'Guarda',
        'Where does the photo keep the bank?',
        'Onde a foto guarda o banco?',
        'Diga que a foto guarda o banco naquele instante.',
        'The photo keeps the bank at that moment.',
        [
          'the photo keeps the bank at that moment',
          'that photo keeps the bank at that moment'
        ],
        'At that moment é naquele instante.'
      ),
      fala(
        'Segue',
        'What should the photo do?',
        'O que a foto deve fazer?',
        'Peça para guardar o banco naquele instante.',
        'Please save the bank at that moment.',
        ['please save the bank at that moment', 'save the bank at that moment'],
        'Save the bank é guardar o banco.'
      )
    ]
  },
  {
    id: 'snapshot2',
    titulo: 'Snapshot dois',
    emoji: '📷',
    nivel: 'B1',
    onde: 'O snapshot cobriu dois bancos.',
    rodadas: [
      fala(
        'Guarda',
        'How many banks did the snapshot cover?',
        'Quantos bancos o snapshot cobriu?',
        'Diga que o snapshot cobriu dois bancos.',
        'The snapshot covered two banks.',
        [
          'the snapshot covered two banks',
          'the snapshot covered 2 banks',
          'that snapshot covered two banks'
        ],
        'Two banks é dois bancos.'
      ),
      fala(
        'Segue',
        'Where should we cap the banks?',
        'Onde a gente limita os bancos?',
        'Peça para cobrir dois bancos.',
        'Please cover two banks.',
        ['please cover two banks', 'please cover 2 banks', 'cover two banks'],
        'Cover two banks é cobrir dois bancos.'
      )
    ]
  },
  {
    id: 'snapshotok',
    titulo: 'Snapshot no alvo',
    emoji: '📷',
    nivel: 'B1',
    onde: 'O snapshot pode ficar.',
    rodadas: [
      fala(
        'Guarda',
        'Can the snapshot stay?',
        'O snapshot pode ficar?',
        'Diga que o snapshot pode ficar.',
        'The snapshot can stay.',
        ['the snapshot can stay', 'that snapshot can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this snapshot stay quiet?',
        'Este snapshot pode ficar quieto?',
        'Diga que este snapshot pode ficar quieto.',
        'This snapshot can stay quiet.',
        ['this snapshot can stay quiet', 'that snapshot can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const RESTORES = [
  {
    id: 'restorebase',
    titulo: 'Volta do restore',
    emoji: '↩️',
    nivel: 'A2',
    onde: 'A foto devolve o banco ao instante salvo.',
    rodadas: [
      fala(
        'Devolve',
        'What does the photo give back?',
        'O que a foto devolve?',
        'Diga que a foto devolve o banco ao instante salvo.',
        'The photo returns the bank to the saved moment.',
        [
          'the photo returns the bank to the saved moment',
          'that photo returns the bank to the saved moment'
        ],
        'Saved moment é instante salvo.'
      ),
      fala(
        'Segue',
        'What should the photo do?',
        'O que a foto deve fazer?',
        'Peça para devolver o banco ao instante salvo.',
        'Please return the bank to the saved moment.',
        ['please return the bank to the saved moment', 'return the bank to the saved moment'],
        'Return the bank é devolver o banco.'
      )
    ]
  },
  {
    id: 'restore3',
    titulo: 'Restore três',
    emoji: '↩️',
    nivel: 'B1',
    onde: 'O restore devolveu três bancos.',
    rodadas: [
      fala(
        'Devolve',
        'How many banks did the restore return?',
        'Quantos bancos o restore devolveu?',
        'Diga que o restore devolveu três bancos.',
        'The restore returned three banks.',
        [
          'the restore returned three banks',
          'the restore returned 3 banks',
          'that restore returned three banks'
        ],
        'Three banks é três bancos.'
      ),
      fala(
        'Segue',
        'Where should we cap the banks?',
        'Onde a gente limita os bancos?',
        'Peça para devolver três bancos.',
        'Please return three banks.',
        ['please return three banks', 'please return 3 banks', 'return three banks'],
        'Return three banks é devolver três bancos.'
      )
    ]
  },
  {
    id: 'restoreok',
    titulo: 'Restore no alvo',
    emoji: '↩️',
    nivel: 'B1',
    onde: 'O restore pode ficar.',
    rodadas: [
      fala(
        'Devolve',
        'Can the restore stay?',
        'O restore pode ficar?',
        'Diga que o restore pode ficar.',
        'The restore can stay.',
        ['the restore can stay', 'that restore can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this restore stay quiet?',
        'Este restore pode ficar quieto?',
        'Diga que este restore pode ficar quieto.',
        'This restore can stay quiet.',
        ['this restore can stay quiet', 'that restore can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const PROMOTES = [
  {
    id: 'promotebase',
    titulo: 'Troca do promote',
    emoji: '🚀',
    nivel: 'A2',
    onde: 'A cópia vira o banco principal.',
    rodadas: [
      fala(
        'Eleva',
        'What does the copy become?',
        'O que a cópia vira?',
        'Diga que a cópia vira o banco principal.',
        'The copy becomes the main bank.',
        [
          'the copy becomes the main bank',
          'that copy becomes the main bank'
        ],
        'Main bank é banco principal.'
      ),
      fala(
        'Segue',
        'What should the copy do?',
        'O que a cópia deve fazer?',
        'Peça para virar o banco principal.',
        'Please become the main bank.',
        ['please become the main bank', 'become the main bank'],
        'Become the main bank é virar o banco principal.'
      )
    ]
  },
  {
    id: 'promote4',
    titulo: 'Promote quatro',
    emoji: '🚀',
    nivel: 'B1',
    onde: 'O promote elevou quatro cópias.',
    rodadas: [
      fala(
        'Eleva',
        'How many copies did the promote raise?',
        'Quantas cópias o promote elevou?',
        'Diga que o promote elevou quatro cópias.',
        'The promote raised four copies.',
        [
          'the promote raised four copies',
          'the promote raised 4 copies',
          'that promote raised four copies'
        ],
        'Four copies é quatro cópias.'
      ),
      fala(
        'Segue',
        'Where should we cap the copies?',
        'Onde a gente limita as cópias?',
        'Peça para elevar quatro cópias.',
        'Please raise four copies.',
        ['please raise four copies', 'please raise 4 copies', 'raise four copies'],
        'Raise four copies é elevar quatro cópias.'
      )
    ]
  },
  {
    id: 'promoteok',
    titulo: 'Promote no alvo',
    emoji: '🚀',
    nivel: 'B1',
    onde: 'O promote pode ficar.',
    rodadas: [
      fala(
        'Eleva',
        'Can the promote stay?',
        'O promote pode ficar?',
        'Diga que o promote pode ficar.',
        'The promote can stay.',
        ['the promote can stay', 'that promote can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this promote stay quiet?',
        'Este promote pode ficar quieto?',
        'Diga que este promote pode ficar quieto.',
        'This promote can stay quiet.',
        ['this promote can stay quiet', 'that promote can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function snapshotPorId(id) {
  return SNAPSHOTS.find(c => c.id === id) ?? null;
}

export function restorePorId(id) {
  return RESTORES.find(c => c.id === id) ?? null;
}

export function promotePorId(id) {
  return PROMOTES.find(c => c.id === id) ?? null;
}

export function avaliarSnapshot(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRestore(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPromote(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
