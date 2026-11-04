// Primário que aceita a escrita, espelho que só copia e ascensão que vira dona.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PRIMARIOS = [
  {
    id: 'escreveprimario',
    titulo: 'Escrita do primário',
    emoji: '🥇',
    nivel: 'A2',
    onde: 'Só um nó aceita a escrita nova.',
    rodadas: [
      fala(
        'Aceita',
        'What does the primary accept?',
        'O que o primário aceita?',
        'Diga que o primário aceita a escrita nova.',
        'The primary accepts the new write.',
        ['the primary accepts the new write', 'that primary accepts the new write'],
        'The new write é a escrita nova.'
      ),
      fala(
        'Espera',
        'What should we do with the new write?',
        'O que a gente faz com a escrita nova?',
        'Peça para aceitar a escrita nova.',
        'Please accept the new write.',
        ['please accept the new write', 'accept the new write'],
        'Accept the new write é aceitar a escrita nova.'
      )
    ]
  },
  {
    id: 'primario2',
    titulo: 'Primário dois',
    emoji: '🥇',
    nivel: 'B1',
    onde: 'O primário aceitou duas escritas.',
    rodadas: [
      fala(
        'Aceita',
        'How many writes did the primary accept?',
        'Quantas escritas o primário aceitou?',
        'Diga que o primário aceitou duas escritas.',
        'The primary accepted two writes.',
        [
          'the primary accepted two writes',
          'the primary accepted 2 writes',
          'that primary accepted two writes'
        ],
        'Two writes é duas escritas.'
      ),
      fala(
        'Espera',
        'Where should we cap the writes?',
        'Onde a gente limita as escritas?',
        'Peça para aceitar duas escritas.',
        'Please accept two writes.',
        [
          'please accept two writes',
          'please accept 2 writes',
          'accept two writes'
        ],
        'Accept two writes é aceitar duas escritas.'
      )
    ]
  },
  {
    id: 'primariook',
    titulo: 'Primário no alvo',
    emoji: '🥇',
    nivel: 'B1',
    onde: 'O primário pode ficar.',
    rodadas: [
      fala(
        'Aceita',
        'Can the primary stay?',
        'O primário pode ficar?',
        'Diga que o primário pode ficar.',
        'The primary can stay.',
        ['the primary can stay', 'that primary can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Espera',
        'Can this write stay open?',
        'Esta escrita pode ficar aberta?',
        'Diga que esta escrita pode ficar aberta.',
        'This write can stay open.',
        ['this write can stay open', 'that write can stay open'],
        'Stay open é ficar aberta.'
      )
    ]
  }
];

export const ESPELHOS = [
  {
    id: 'copiaespelho',
    titulo: 'Cópia do espelho',
    emoji: '🪟',
    nivel: 'A2',
    onde: 'A cópia acompanha sem aceitar escrita.',
    rodadas: [
      fala(
        'Copia',
        'What does the mirror follow?',
        'O que o espelho acompanha?',
        'Diga que o espelho acompanha sem escrever.',
        'The mirror follows without writing.',
        ['the mirror follows without writing', 'that mirror follows without writing'],
        'Without writing é sem escrever.'
      ),
      fala(
        'Segue',
        'What should the mirror do?',
        'O que o espelho deve fazer?',
        'Peça para acompanhar sem escrever.',
        'Please follow without writing.',
        ['please follow without writing', 'follow without writing'],
        'Follow without writing é acompanhar sem escrever.'
      )
    ]
  },
  {
    id: 'espelho3',
    titulo: 'Espelho três',
    emoji: '🪟',
    nivel: 'B1',
    onde: 'O espelho copiou três entradas.',
    rodadas: [
      fala(
        'Copia',
        'How many entries did the mirror copy?',
        'Quantas entradas o espelho copiou?',
        'Diga que o espelho copiou três entradas.',
        'The mirror copied three entries.',
        [
          'the mirror copied three entries',
          'the mirror copied 3 entries',
          'that mirror copied three entries'
        ],
        'Three entries é três entradas.'
      ),
      fala(
        'Segue',
        'Where should we cap the copy?',
        'Onde a gente limita a cópia?',
        'Peça para copiar três entradas.',
        'Please copy three entries.',
        [
          'please copy three entries',
          'please copy 3 entries',
          'copy three entries'
        ],
        'Copy three entries é copiar três entradas.'
      )
    ]
  },
  {
    id: 'espelhook',
    titulo: 'Espelho no alvo',
    emoji: '🪟',
    nivel: 'B1',
    onde: 'O espelho pode ficar.',
    rodadas: [
      fala(
        'Copia',
        'Can the mirror stay?',
        'O espelho pode ficar?',
        'Diga que o espelho pode ficar.',
        'The mirror can stay.',
        ['the mirror can stay', 'that mirror can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this copy stay quiet?',
        'Esta cópia pode ficar quieta?',
        'Diga que esta cópia pode ficar quieta.',
        'This copy can stay quiet.',
        ['this copy can stay quiet', 'that copy can stay quiet'],
        'Stay quiet é ficar quieta.'
      )
    ]
  }
];

export const ASCENSOES = [
  {
    id: 'viraascensao',
    titulo: 'Troca da ascensão',
    emoji: '📈',
    nivel: 'A2',
    onde: 'A cópia vira dona quando o primário cai.',
    rodadas: [
      fala(
        'Sobe',
        'When does the copy become primary?',
        'Quando a cópia vira primário?',
        'Diga que a cópia vira primário quando o dono cai.',
        'The copy becomes primary when the owner falls.',
        ['the copy becomes primary when the owner falls', 'that copy becomes primary when the owner falls'],
        'The owner falls é o dono cai.'
      ),
      fala(
        'Fecha',
        'What should the copy do?',
        'O que a cópia deve fazer?',
        'Peça para virar primário quando o dono cai.',
        'Please become primary when the owner falls.',
        ['please become primary when the owner falls', 'become primary when the owner falls'],
        'Become primary é virar primário.'
      )
    ]
  },
  {
    id: 'ascensao4',
    titulo: 'Ascensão quatro',
    emoji: '📈',
    nivel: 'B1',
    onde: 'A promoção cobriu quatro nós.',
    rodadas: [
      fala(
        'Sobe',
        'How many nodes did the promotion cover?',
        'Quantos nós a promoção cobriu?',
        'Diga que a promoção cobriu quatro nós.',
        'The promotion covered four nodes.',
        [
          'the promotion covered four nodes',
          'the promotion covered 4 nodes',
          'that promotion covered four nodes'
        ],
        'Four nodes é quatro nós.'
      ),
      fala(
        'Fecha',
        'Where should we cap the promotion?',
        'Onde a gente limita a promoção?',
        'Peça para cobrir quatro nós.',
        'Please cover four nodes.',
        [
          'please cover four nodes',
          'please cover 4 nodes',
          'cover four nodes'
        ],
        'Cover four nodes é cobrir quatro nós.'
      )
    ]
  },
  {
    id: 'ascensaook',
    titulo: 'Ascensão no alvo',
    emoji: '📈',
    nivel: 'B1',
    onde: 'O primário novo pode ficar.',
    rodadas: [
      fala(
        'Sobe',
        'Can the new primary stay?',
        'O primário novo pode ficar?',
        'Diga que o primário novo pode ficar.',
        'The new primary can stay.',
        ['the new primary can stay', 'that new primary can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this promotion stay closed?',
        'Esta promoção pode ficar fechada?',
        'Diga que esta promoção pode ficar fechada.',
        'This promotion can stay closed.',
        ['this promotion can stay closed', 'that promotion can stay closed'],
        'Stay closed é ficar fechada.'
      )
    ]
  }
];

export function primarioPorId(id) {
  return PRIMARIOS.find(c => c.id === id) ?? null;
}

export function espelhoPorId(id) {
  return ESPELHOS.find(c => c.id === id) ?? null;
}

export function ascensaoPorId(id) {
  return ASCENSOES.find(c => c.id === id) ?? null;
}

export function avaliarPrimario(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEspelho(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAscensao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
