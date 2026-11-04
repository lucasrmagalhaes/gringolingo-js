// Journal que anota a mudança, segment que fecha o arquivo e spill que manda o excesso ao disco.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const JOURNALS = [
  {
    id: 'journalbase',
    titulo: 'Anota do journal',
    emoji: '📓',
    nivel: 'A2',
    onde: 'O journal anota a mudança.',
    rodadas: [
      fala(
        'Anota',
        'What does the journal record?',
        'O que o journal anota?',
        'Diga que o journal anota a mudança.',
        'The journal records the change.',
        [
          'the journal records the change',
          'that journal records the change'
        ],
        'The change é a mudança.'
      ),
      fala(
        'Segue',
        'What should the journal do with the change?',
        'O que o journal deve fazer com a mudança?',
        'Peça para anotar a mudança.',
        'Please record the change.',
        [
          'please record the change',
          'record the change'
        ],
        'Record the change é anotar a mudança.'
      )
    ]
  },
  {
    id: 'journal2',
    titulo: 'Journal dois',
    emoji: '📓',
    nivel: 'B1',
    onde: 'O journal anotou duas mudanças.',
    rodadas: [
      fala(
        'Anota',
        'How many changes did the journal record?',
        'Quantas mudanças o journal anotou?',
        'Diga que o journal anotou duas mudanças.',
        'The journal recorded two changes.',
        [
          'the journal recorded two changes',
          'the journal recorded 2 changes',
          'that journal recorded two changes'
        ],
        'Two changes é duas mudanças.'
      ),
      fala(
        'Segue',
        'Where should we cap the changes?',
        'Onde a gente limita as mudanças?',
        'Peça para anotar duas mudanças.',
        'Please record two changes.',
        ['please record two changes', 'please record 2 changes', 'record two changes'],
        'Record two changes é anotar duas mudanças.'
      )
    ]
  },
  {
    id: 'journalok',
    titulo: 'Journal no alvo',
    emoji: '📓',
    nivel: 'B1',
    onde: 'O journal pode ficar.',
    rodadas: [
      fala(
        'Anota',
        'Can the journal stay?',
        'O journal pode ficar?',
        'Diga que o journal pode ficar.',
        'The journal can stay.',
        ['the journal can stay', 'that journal can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this journal stay quiet?',
        'Este journal pode ficar quieto?',
        'Diga que este journal pode ficar quieto.',
        'This journal can stay quiet.',
        ['this journal can stay quiet', 'that journal can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const SEGMENTS = [
  {
    id: 'segmentbase',
    titulo: 'Fecha do segment',
    emoji: '🗂️',
    nivel: 'A2',
    onde: 'O segment fecha o arquivo.',
    rodadas: [
      fala(
        'Fecha',
        'What does the segment close?',
        'O que o segment fecha?',
        'Diga que o segment fecha o arquivo.',
        'The segment closes the file.',
        [
          'the segment closes the file',
          'that segment closes the file'
        ],
        'The file é o arquivo.'
      ),
      fala(
        'Segue',
        'What should the segment do with the file?',
        'O que o segment deve fazer com o arquivo?',
        'Peça para fechar o arquivo.',
        'Please close the file.',
        [
          'please close the file',
          'close the file'
        ],
        'Close the file é fechar o arquivo.'
      )
    ]
  },
  {
    id: 'segment3',
    titulo: 'Segment três',
    emoji: '🗂️',
    nivel: 'B1',
    onde: 'O segment fechou três arquivos.',
    rodadas: [
      fala(
        'Fecha',
        'How many files did the segment close?',
        'Quantos arquivos o segment fechou?',
        'Diga que o segment fechou três arquivos.',
        'The segment closed three files.',
        [
          'the segment closed three files',
          'the segment closed 3 files',
          'that segment closed three files'
        ],
        'Three files é três arquivos.'
      ),
      fala(
        'Segue',
        'Where should we cap the files?',
        'Onde a gente limita os arquivos?',
        'Peça para fechar três arquivos.',
        'Please close three files.',
        ['please close three files', 'please close 3 files', 'close three files'],
        'Close three files é fechar três arquivos.'
      )
    ]
  },
  {
    id: 'segmentok',
    titulo: 'Segment no alvo',
    emoji: '🗂️',
    nivel: 'B1',
    onde: 'O segment pode ficar.',
    rodadas: [
      fala(
        'Fecha',
        'Can the segment stay?',
        'O segment pode ficar?',
        'Diga que o segment pode ficar.',
        'The segment can stay.',
        ['the segment can stay', 'that segment can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this segment stay quiet?',
        'Este segment pode ficar quieto?',
        'Diga que este segment pode ficar quieto.',
        'This segment can stay quiet.',
        ['this segment can stay quiet', 'that segment can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const SPILLS = [
  {
    id: 'spillbase',
    titulo: 'Solta do spill',
    emoji: '💧',
    nivel: 'A2',
    onde: 'O spill manda o excesso ao disco.',
    rodadas: [
      fala(
        'Solta',
        'Where does the spill send the extra?',
        'Para onde o spill manda o excesso?',
        'Diga que o spill manda o excesso ao disco.',
        'The spill sends the extra to disk.',
        [
          'the spill sends the extra to disk',
          'that spill sends the extra to disk'
        ],
        'To disk é ao disco.'
      ),
      fala(
        'Segue',
        'What should the spill do with the extra?',
        'O que o spill deve fazer com o excesso?',
        'Peça para mandar o excesso ao disco.',
        'Please send the extra to disk.',
        [
          'please send the extra to disk',
          'send the extra to disk'
        ],
        'Send the extra to disk é mandar o excesso ao disco.'
      )
    ]
  },
  {
    id: 'spill4',
    titulo: 'Spill quatro',
    emoji: '💧',
    nivel: 'B1',
    onde: 'O spill mandou quatro excessos.',
    rodadas: [
      fala(
        'Solta',
        'How many extras did the spill send?',
        'Quantos excessos o spill mandou?',
        'Diga que o spill mandou quatro excessos.',
        'The spill sent four extras.',
        [
          'the spill sent four extras',
          'the spill sent 4 extras',
          'that spill sent four extras'
        ],
        'Four extras é quatro excessos.'
      ),
      fala(
        'Segue',
        'Where should we cap the extras?',
        'Onde a gente limita os excessos?',
        'Peça para mandar quatro excessos.',
        'Please send four extras.',
        ['please send four extras', 'please send 4 extras', 'send four extras'],
        'Send four extras é mandar quatro excessos.'
      )
    ]
  },
  {
    id: 'spillok',
    titulo: 'Spill no alvo',
    emoji: '💧',
    nivel: 'B1',
    onde: 'O spill pode ficar.',
    rodadas: [
      fala(
        'Solta',
        'Can the spill stay?',
        'O spill pode ficar?',
        'Diga que o spill pode ficar.',
        'The spill can stay.',
        ['the spill can stay', 'that spill can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this spill stay quiet?',
        'Este spill pode ficar quieto?',
        'Diga que este spill pode ficar quieto.',
        'This spill can stay quiet.',
        ['this spill can stay quiet', 'that spill can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function journalPorId(id) {
  return JOURNALS.find(c => c.id === id) ?? null;
}

export function segmentPorId(id) {
  return SEGMENTS.find(c => c.id === id) ?? null;
}

export function spillPorId(id) {
  return SPILLS.find(c => c.id === id) ?? null;
}

export function avaliarJournal(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSegment(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSpill(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
