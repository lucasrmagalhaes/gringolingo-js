// Gossip que troca o estado, phi que sobe a suspeita e accrual que soma a falha.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const GOSSIPS = [
  {
    id: 'gossipuma',
    titulo: 'Troca do gossip',
    emoji: '📣',
    nivel: 'A2',
    onde: 'Os nós trocam o estado entre si.',
    rodadas: [
      fala(
        'Troca',
        'What do the nodes do with the state?',
        'O que os nós fazem com o estado?',
        'Diga que os nós trocam o estado entre si.',
        'The nodes share state with each other.',
        [
          'the nodes share state with each other',
          'those nodes share state with each other'
        ],
        'Share state é trocar o estado.'
      ),
      fala(
        'Segue',
        'What should the nodes do?',
        'O que os nós devem fazer?',
        'Peça para trocar o estado entre si.',
        'Please share state with each other.',
        ['please share state with each other', 'share state with each other'],
        'Share state é trocar o estado.'
      )
    ]
  },
  {
    id: 'gossip2',
    titulo: 'Gossip dois',
    emoji: '📣',
    nivel: 'B1',
    onde: 'O gossip trocou dois estados.',
    rodadas: [
      fala(
        'Troca',
        'How many states did the gossip share?',
        'Quantos estados o gossip trocou?',
        'Diga que o gossip trocou dois estados.',
        'The gossip shared two states.',
        [
          'the gossip shared two states',
          'the gossip shared 2 states',
          'that gossip shared two states'
        ],
        'Two states é dois estados.'
      ),
      fala(
        'Segue',
        'Where should we cap the states?',
        'Onde a gente limita os estados?',
        'Peça para trocar dois estados.',
        'Please share two states.',
        ['please share two states', 'please share 2 states', 'share two states'],
        'Share two states é trocar dois estados.'
      )
    ]
  },
  {
    id: 'gossipok',
    titulo: 'Gossip no alvo',
    emoji: '📣',
    nivel: 'B1',
    onde: 'O gossip pode ficar.',
    rodadas: [
      fala(
        'Troca',
        'Can the gossip stay?',
        'O gossip pode ficar?',
        'Diga que o gossip pode ficar.',
        'The gossip can stay.',
        ['the gossip can stay', 'that gossip can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this gossip stay quiet?',
        'Este gossip pode ficar quieto?',
        'Diga que este gossip pode ficar quieto.',
        'This gossip can stay quiet.',
        ['this gossip can stay quiet', 'that gossip can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const PHIS = [
  {
    id: 'phibase',
    titulo: 'Subida do phi',
    emoji: '📉',
    nivel: 'A2',
    onde: 'A suspeita sobe com a pausa.',
    rodadas: [
      fala(
        'Sobe',
        'What rises when the node pauses?',
        'O que sobe quando o nó pausa?',
        'Diga que a suspeita sobe com a pausa.',
        'The suspicion rises when the node pauses.',
        [
          'the suspicion rises when the node pauses',
          'that suspicion rises when the node pauses'
        ],
        'Rises é sobe. Pause é pausa.'
      ),
      fala(
        'Segue',
        'What should the suspicion do?',
        'O que a suspeita deve fazer?',
        'Peça para a suspeita subir com a pausa.',
        'Please raise the suspicion when the node pauses.',
        [
          'please raise the suspicion when the node pauses',
          'raise the suspicion when the node pauses'
        ],
        'Raise the suspicion é subir a suspeita.'
      )
    ]
  },
  {
    id: 'phi3',
    titulo: 'Phi três',
    emoji: '📉',
    nivel: 'B1',
    onde: 'O phi subiu três suspeitas.',
    rodadas: [
      fala(
        'Sobe',
        'How many suspicions did the phi raise?',
        'Quantas suspeitas o phi subiu?',
        'Diga que o phi subiu três suspeitas.',
        'The phi raised three suspicions.',
        [
          'the phi raised three suspicions',
          'the phi raised 3 suspicions',
          'that phi raised three suspicions'
        ],
        'Three suspicions é três suspeitas.'
      ),
      fala(
        'Segue',
        'Where should we cap the suspicions?',
        'Onde a gente limita as suspeitas?',
        'Peça para subir três suspeitas.',
        'Please raise three suspicions.',
        ['please raise three suspicions', 'please raise 3 suspicions', 'raise three suspicions'],
        'Raise three suspicions é subir três suspeitas.'
      )
    ]
  },
  {
    id: 'phiok',
    titulo: 'Phi no alvo',
    emoji: '📉',
    nivel: 'B1',
    onde: 'O phi pode ficar.',
    rodadas: [
      fala(
        'Sobe',
        'Can the phi stay?',
        'O phi pode ficar?',
        'Diga que o phi pode ficar.',
        'The phi can stay.',
        ['the phi can stay', 'that phi can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this phi stay quiet?',
        'Este phi pode ficar quieto?',
        'Diga que este phi pode ficar quieto.',
        'This phi can stay quiet.',
        ['this phi can stay quiet', 'that phi can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const ACCRUALS = [
  {
    id: 'accrualbase',
    titulo: 'Soma do accrual',
    emoji: '🧺',
    nivel: 'A2',
    onde: 'A falha soma aos poucos.',
    rodadas: [
      fala(
        'Soma',
        'How does the failure add up?',
        'Como a falha soma?',
        'Diga que a falha soma aos poucos.',
        'The failure adds up little by little.',
        [
          'the failure adds up little by little',
          'that failure adds up little by little'
        ],
        'Little by little é aos poucos.'
      ),
      fala(
        'Segue',
        'What should the failure do?',
        'O que a falha deve fazer?',
        'Peça para a falha somar aos poucos.',
        'Please add the failure little by little.',
        [
          'please add the failure little by little',
          'add the failure little by little'
        ],
        'Add the failure é somar a falha.'
      )
    ]
  },
  {
    id: 'accrual4',
    titulo: 'Accrual quatro',
    emoji: '🧺',
    nivel: 'B1',
    onde: 'O accrual somou quatro falhas.',
    rodadas: [
      fala(
        'Soma',
        'How many failures did the accrual add?',
        'Quantas falhas o accrual somou?',
        'Diga que o accrual somou quatro falhas.',
        'The accrual added four failures.',
        [
          'the accrual added four failures',
          'the accrual added 4 failures',
          'that accrual added four failures'
        ],
        'Four failures é quatro falhas.'
      ),
      fala(
        'Segue',
        'Where should we cap the failures?',
        'Onde a gente limita as falhas?',
        'Peça para somar quatro falhas.',
        'Please add four failures.',
        ['please add four failures', 'please add 4 failures', 'add four failures'],
        'Add four failures é somar quatro falhas.'
      )
    ]
  },
  {
    id: 'accrualok',
    titulo: 'Accrual no alvo',
    emoji: '🧺',
    nivel: 'B1',
    onde: 'O accrual pode ficar.',
    rodadas: [
      fala(
        'Soma',
        'Can the accrual stay?',
        'O accrual pode ficar?',
        'Diga que o accrual pode ficar.',
        'The accrual can stay.',
        ['the accrual can stay', 'that accrual can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this accrual stay quiet?',
        'Este accrual pode ficar quieto?',
        'Diga que este accrual pode ficar quieto.',
        'This accrual can stay quiet.',
        ['this accrual can stay quiet', 'that accrual can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function gossipPorId(id) {
  return GOSSIPS.find(c => c.id === id) ?? null;
}

export function phiPorId(id) {
  return PHIS.find(c => c.id === id) ?? null;
}

export function accrualPorId(id) {
  return ACCRUALS.find(c => c.id === id) ?? null;
}

export function avaliarGossip(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPhi(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAccrual(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
