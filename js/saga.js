// Saga pela metade, evento na caixa de saída e linha apagada que ficou.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SAGAS = [
  {
    id: 'passotres',
    titulo: 'Passo três',
    emoji: '🧵',
    nivel: 'A2',
    onde: 'O terceiro passo nunca terminou.',
    rodadas: [
      fala(
        'Para',
        'What happened to the third step?',
        'O que aconteceu com o terceiro passo?',
        'Diga que o terceiro passo nunca terminou.',
        'The third step never finished.',
        ['the third step never finished', 'that third step never finished'],
        'Never finished é nunca terminou.'
      ),
      fala(
        'Volta',
        'What should we undo?',
        'O que a gente desfaz?',
        'Peça para desfazer os passos já feitos.',
        'Please undo the finished steps.',
        ['please undo the finished steps', 'undo the finished steps'],
        'Undo the steps é desfazer os passos.'
      )
    ]
  },
  {
    id: 'saga3',
    titulo: 'Saga três',
    emoji: '🧵',
    nivel: 'B1',
    onde: 'A espera parou no passo três.',
    rodadas: [
      fala(
        'Para',
        'Where did the wait stop?',
        'Onde a espera parou?',
        'Diga que a espera parou no passo três.',
        'The wait stopped at step three.',
        [
          'the wait stopped at step three',
          'the wait stopped at step 3',
          'that wait stopped at step three'
        ],
        'Step three é o passo três.'
      ),
      fala(
        'Volta',
        'Where should we cap the saga?',
        'Onde a gente limita a saga?',
        'Peça para limitar a saga em três passos.',
        'Please cap the saga at three steps.',
        [
          'please cap the saga at three steps',
          'please cap the saga at 3 steps',
          'cap the saga at three steps'
        ],
        'Three steps é três passos.'
      )
    ]
  },
  {
    id: 'sagaok',
    titulo: 'Saga fechada',
    emoji: '🧵',
    nivel: 'B1',
    onde: 'Todos os passos terminaram.',
    rodadas: [
      fala(
        'Para',
        'Did every step finish?',
        'Todos os passos terminaram?',
        'Diga que todos os passos terminaram.',
        'Every step finished.',
        ['every step finished', 'each step finished'],
        'Every step é todos os passos.'
      ),
      fala(
        'Volta',
        'Can the saga stay?',
        'A saga pode ficar?',
        'Diga que a saga pode ficar.',
        'The saga can stay.',
        ['the saga can stay', 'that saga can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const CAIXAS = [
  {
    id: 'eventocaixa',
    titulo: 'Evento na caixa',
    emoji: '📦',
    nivel: 'A2',
    onde: 'O evento ficou na caixa de saída.',
    rodadas: [
      fala(
        'Espera',
        'Where did the event stay?',
        'Onde o evento ficou?',
        'Diga que o evento ficou na caixa de saída.',
        'The event stayed in the outbox.',
        ['the event stayed in the outbox', 'that event stayed in the outbox'],
        'The outbox é a caixa de saída.'
      ),
      fala(
        'Solta',
        'What should we send?',
        'O que a gente envia?',
        'Peça para enviar o evento que espera.',
        'Please send the waiting event.',
        ['please send the waiting event', 'send the waiting event'],
        'The waiting event é o evento que espera.'
      )
    ]
  },
  {
    id: 'minuto2',
    titulo: 'Minuto dois',
    emoji: '📦',
    nivel: 'B1',
    onde: 'O evento ficou dois minutos.',
    rodadas: [
      fala(
        'Espera',
        'How long did the event stay?',
        'Quanto tempo o evento ficou?',
        'Diga que o evento ficou dois minutos.',
        'The event stayed for two minutes.',
        [
          'the event stayed for two minutes',
          'the event stayed for 2 minutes',
          'that event stayed for two minutes'
        ],
        'Two minutes é dois minutos.'
      ),
      fala(
        'Solta',
        'Where should we cap the wait?',
        'Onde a gente limita a espera?',
        'Peça para limitar a espera em dois minutos.',
        'Please cap the wait at two minutes.',
        [
          'please cap the wait at two minutes',
          'please cap the wait at 2 minutes',
          'cap the wait at two minutes'
        ],
        'Two minutes é dois minutos.'
      )
    ]
  },
  {
    id: 'caixaok',
    titulo: 'Caixa vazia',
    emoji: '📦',
    nivel: 'B1',
    onde: 'A caixa de saída está vazia.',
    rodadas: [
      fala(
        'Espera',
        'Is the outbox empty?',
        'A caixa de saída está vazia?',
        'Diga que a caixa de saída está vazia.',
        'The outbox is empty.',
        ['the outbox is empty', 'that outbox is empty'],
        'Is empty é está vazia.'
      ),
      fala(
        'Solta',
        'Can the event go out?',
        'O evento pode sair?',
        'Diga que o evento pode sair.',
        'The event can go out.',
        ['the event can go out', 'that event can go out'],
        'Go out é sair.'
      )
    ]
  }
];

export const APAGADOS = [
  {
    id: 'ficoulinha',
    titulo: 'Linha ficou',
    emoji: '🗑️',
    nivel: 'A2',
    onde: 'A linha ficou na tabela.',
    rodadas: [
      fala(
        'Apaga',
        'Where did the row stay?',
        'Onde a linha ficou?',
        'Diga que a linha ficou na tabela.',
        'The row stayed in the table.',
        ['the row stayed in the table', 'that row stayed in the table'],
        'Stayed in the table é ficou na tabela.'
      ),
      fala(
        'Some',
        'What should we hide?',
        'O que a gente esconde?',
        'Peça para esconder a linha apagada.',
        'Please hide the deleted row.',
        ['please hide the deleted row', 'hide the deleted row'],
        'The deleted row é a linha apagada.'
      )
    ]
  },
  {
    id: 'ainda1',
    titulo: 'Ainda um',
    emoji: '🗑️',
    nivel: 'B1',
    onde: 'A linha escondida ainda é a um.',
    rodadas: [
      fala(
        'Apaga',
        'Which hidden row is still there?',
        'Qual linha escondida ainda está lá?',
        'Diga que a linha escondida ainda é a um.',
        'The hidden row is still row one.',
        [
          'the hidden row is still row one',
          'the hidden row is still row 1',
          'that hidden row is still row one'
        ],
        'Row one é a linha um.'
      ),
      fala(
        'Some',
        'Where should we cap the hidden rows?',
        'Onde a gente limita as linhas escondidas?',
        'Peça para limitar as linhas escondidas em uma.',
        'Please cap the hidden rows at one row.',
        [
          'please cap the hidden rows at one row',
          'please cap the hidden rows at 1 row',
          'cap the hidden rows at one row'
        ],
        'One row é uma linha.'
      )
    ]
  },
  {
    id: 'apagadook',
    titulo: 'Sumiu certo',
    emoji: '🗑️',
    nivel: 'B1',
    onde: 'A linha apagada sumiu.',
    rodadas: [
      fala(
        'Apaga',
        'Is the deleted row gone?',
        'A linha apagada sumiu?',
        'Diga que a linha apagada sumiu.',
        'The deleted row is gone.',
        ['the deleted row is gone', 'that deleted row is gone'],
        'Is gone é sumiu.'
      ),
      fala(
        'Some',
        'Can the table stay?',
        'A tabela pode ficar?',
        'Diga que a tabela pode ficar.',
        'The table can stay.',
        ['the table can stay', 'that table can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function sagaPorId(id) {
  return SAGAS.find(c => c.id === id) ?? null;
}

export function caixaPorId(id) {
  return CAIXAS.find(c => c.id === id) ?? null;
}

export function apagadoPorId(id) {
  return APAGADOS.find(c => c.id === id) ?? null;
}

export function avaliarSaga(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCaixa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarApagado(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
