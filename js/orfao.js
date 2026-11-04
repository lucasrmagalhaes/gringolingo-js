// Linha órfã, aceno pela metade e gasto do mês de erro.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const ORFAOS = [
  {
    id: 'filhasolta',
    titulo: 'Filha solta',
    emoji: '🪆',
    nivel: 'A2',
    onde: 'A linha filha apontou para um pai que não existe.',
    rodadas: [
      fala(
        'Aponta',
        'Where did the child row point?',
        'Para onde a linha filha apontou?',
        'Diga que a linha filha apontou para um pai que não existe.',
        'The child row pointed at a missing parent.',
        ['the child row pointed at a missing parent', 'that child row pointed at a missing parent'],
        'A missing parent é um pai que não existe.'
      ),
      fala(
        'Liga',
        'What should we add?',
        'O que a gente adiciona?',
        'Peça para adicionar o pai que falta.',
        'Please add the missing parent.',
        ['please add the missing parent', 'add the missing parent'],
        'Add the parent é adicionar o pai.'
      )
    ]
  },
  {
    id: 'paioito',
    titulo: 'Pai oito',
    emoji: '🪆',
    nivel: 'B1',
    onde: 'A filha apontou para o pai oito.',
    rodadas: [
      fala(
        'Aponta',
        'Which parent is missing?',
        'Qual pai está faltando?',
        'Diga que a filha apontou para o pai oito.',
        'The child pointed at parent eight.',
        [
          'the child pointed at parent eight',
          'the child pointed at parent 8',
          'that child pointed at parent eight'
        ],
        'Parent eight é o pai oito.'
      ),
      fala(
        'Liga',
        'Where should we stop the child?',
        'Onde a gente para a filha?',
        'Peça para parar a filha no pai oito.',
        'Please stop the child at parent eight.',
        [
          'please stop the child at parent eight',
          'please stop the child at parent 8',
          'stop the child at parent eight'
        ],
        'Stop the child é parar a filha.'
      )
    ]
  },
  {
    id: 'orfaoquieto',
    titulo: 'Órfão quieto',
    emoji: '🪆',
    nivel: 'B1',
    onde: 'Toda filha tem um pai.',
    rodadas: [
      fala(
        'Aponta',
        'Does every child have a parent?',
        'Toda filha tem um pai?',
        'Diga que toda linha filha tem um pai.',
        'Every child row has a parent.',
        ['every child row has a parent', 'each child row has a parent'],
        'Has a parent é tem um pai.'
      ),
      fala(
        'Liga',
        'Can the child row stay?',
        'A linha filha pode ficar?',
        'Diga que a linha filha pode ficar.',
        'The child row can stay.',
        ['the child row can stay', 'that child row can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const ACENOS = [
  {
    id: 'sitiodois',
    titulo: 'Sítio dois',
    emoji: '🫡',
    nivel: 'A2',
    onde: 'O segundo sítio nunca confirmou.',
    rodadas: [
      fala(
        'Espera',
        'What did the second site do?',
        'O que o segundo sítio fez?',
        'Diga que o segundo sítio nunca confirmou.',
        'The second site never confirmed.',
        ['the second site never confirmed', 'that second site never confirmed'],
        'Never confirmed é nunca confirmou.'
      ),
      fala(
        'Confirma',
        'What should we cancel?',
        'O que a gente cancela?',
        'Peça para cancelar a transação pela metade.',
        'Please cancel the half transaction.',
        ['please cancel the half transaction', 'cancel the half transaction'],
        'The half transaction é a transação pela metade.'
      )
    ]
  },
  {
    id: 'espera2',
    titulo: 'Espera dois',
    emoji: '🫡',
    nivel: 'B1',
    onde: 'A espera parou no sítio dois.',
    rodadas: [
      fala(
        'Espera',
        'Where did the wait stop?',
        'Onde a espera parou?',
        'Diga que a espera parou no sítio dois.',
        'The wait stopped at site two.',
        [
          'the wait stopped at site two',
          'the wait stopped at site 2',
          'that wait stopped at site two'
        ],
        'Site two é o sítio dois.'
      ),
      fala(
        'Confirma',
        'Where should we cap the wait?',
        'Onde a gente limita a espera?',
        'Peça para limitar a espera em dois sítios.',
        'Please cap the wait at two sites.',
        [
          'please cap the wait at two sites',
          'please cap the wait at 2 sites',
          'cap the wait at two sites'
        ],
        'Two sites é dois sítios.'
      )
    ]
  },
  {
    id: 'acenook',
    titulo: 'Aceno certo',
    emoji: '🫡',
    nivel: 'B1',
    onde: 'Os dois sítios confirmaram.',
    rodadas: [
      fala(
        'Espera',
        'Did both sites confirm?',
        'Os dois sítios confirmaram?',
        'Diga que os dois sítios confirmaram a escrita.',
        'Both sites confirmed the write.',
        ['both sites confirmed the write', 'the two sites confirmed the write'],
        'Both sites é os dois sítios.'
      ),
      fala(
        'Confirma',
        'Can the transaction finish?',
        'A transação pode terminar?',
        'Diga que a transação pode terminar.',
        'The transaction can finish.',
        ['the transaction can finish', 'that transaction can finish'],
        'Can finish é pode terminar.'
      )
    ]
  }
];

export const GASTOS = [
  {
    id: 'tresdias',
    titulo: 'Três dias',
    emoji: '🪙',
    nivel: 'A2',
    onde: 'Três dias de erro gastaram o mês.',
    rodadas: [
      fala(
        'Gasta',
        'What did three days of errors do?',
        'O que três dias de erro fizeram?',
        'Diga que três dias de erro gastaram o mês inteiro.',
        'Three days of errors spent the whole month.',
        ['three days of errors spent the whole month', 'those three days of errors spent the whole month'],
        'The whole month é o mês inteiro.'
      ),
      fala(
        'Corta',
        'What should we stop?',
        'O que a gente para?',
        'Peça para parar a entrega nova.',
        'Please stop the new release.',
        ['please stop the new release', 'stop the new release'],
        'The new release é a entrega nova.'
      )
    ]
  },
  {
    id: 'gastotres',
    titulo: 'Gasto três',
    emoji: '🪙',
    nivel: 'B1',
    onde: 'O gasto levou três dias.',
    rodadas: [
      fala(
        'Gasta',
        'How long did the burn take?',
        'Quanto tempo o gasto levou?',
        'Diga que o gasto levou três dias.',
        'The burn took three days.',
        [
          'the burn took three days',
          'the burn took 3 days',
          'that burn took three days'
        ],
        'Three days é três dias.'
      ),
      fala(
        'Corta',
        'Where should we cap the burn?',
        'Onde a gente limita o gasto?',
        'Peça para limitar o gasto em três dias.',
        'Please cap the burn at three days.',
        [
          'please cap the burn at three days',
          'please cap the burn at 3 days',
          'cap the burn at three days'
        ],
        'Cap the burn é limitar o gasto.'
      )
    ]
  },
  {
    id: 'gastook',
    titulo: 'Gasto no alvo',
    emoji: '🪙',
    nivel: 'B1',
    onde: 'O mês ainda tem folga de erro.',
    rodadas: [
      fala(
        'Gasta',
        'Does the month still have room?',
        'O mês ainda tem folga?',
        'Diga que o mês ainda tem folga de erro.',
        'The month still has error room.',
        ['the month still has error room', 'that month still has error room'],
        'Error room é folga de erro.'
      ),
      fala(
        'Corta',
        'Can the release go out?',
        'A entrega pode sair?',
        'Diga que a entrega pode sair.',
        'The release can go out.',
        ['the release can go out', 'that release can go out'],
        'Go out é sair.'
      )
    ]
  }
];

export function orfaoPorId(id) {
  return ORFAOS.find(c => c.id === id) ?? null;
}

export function acenoPorId(id) {
  return ACENOS.find(c => c.id === id) ?? null;
}

export function gastoPorId(id) {
  return GASTOS.find(c => c.id === id) ?? null;
}

export function avaliarOrfao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAceno(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGasto(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
