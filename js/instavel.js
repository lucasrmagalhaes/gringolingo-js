// Teste instável, e-mail duplicado e máquina desligada de propósito.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const INSTAVEIS = [
  {
    id: 'tentadois',
    titulo: 'Segunda tentativa',
    emoji: '🎲',
    nivel: 'A2',
    onde: 'O teste só passou na segunda tentativa.',
    rodadas: [
      fala(
        'Falha',
        'When did the test pass?',
        'Quando o teste passou?',
        'Diga que o teste passou na segunda tentativa.',
        'The test passed on the second try.',
        ['the test passed on the second try', 'that test passed on the second try'],
        'The second try é a segunda tentativa.'
      ),
      fala(
        'Passa',
        'What should we run?',
        'O que a gente roda?',
        'Peça para rodar o teste de novo.',
        'Please run the test again.',
        ['please run the test again', 'run the test again'],
        'Run the test again é rodar o teste de novo.'
      )
    ]
  },
  {
    id: 'passou2',
    titulo: 'Passou dois',
    emoji: '🎲',
    nivel: 'B1',
    onde: 'O teste passou na tentativa dois.',
    rodadas: [
      fala(
        'Falha',
        'Which try passed?',
        'Qual tentativa passou?',
        'Diga que o teste passou na tentativa dois.',
        'The test passed on try two.',
        [
          'the test passed on try two',
          'the test passed on try 2',
          'that test passed on try two'
        ],
        'Try two é a tentativa dois.'
      ),
      fala(
        'Passa',
        'Where should we cap the retries?',
        'Onde a gente limita as novas tentativas?',
        'Peça para limitar as tentativas em duas.',
        'Please cap the retries at two tries.',
        [
          'please cap the retries at two tries',
          'please cap the retries at 2 tries',
          'cap the retries at two tries'
        ],
        'Two tries é duas tentativas.'
      )
    ]
  },
  {
    id: 'instavelok',
    titulo: 'Teste firme',
    emoji: '🎲',
    nivel: 'B1',
    onde: 'O teste passou de primeira.',
    rodadas: [
      fala(
        'Falha',
        'Did the test pass on the first try?',
        'O teste passou de primeira?',
        'Diga que o teste passou na primeira tentativa.',
        'The test passed on the first try.',
        ['the test passed on the first try', 'that test passed on the first try'],
        'The first try é a primeira tentativa.'
      ),
      fala(
        'Passa',
        'Can this test stay?',
        'Este teste pode ficar?',
        'Diga que o teste pode ficar.',
        'The test can stay.',
        ['the test can stay', 'that test can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const DUPLICADOS = [
  {
    id: 'emailja',
    titulo: 'E-mail já',
    emoji: '📧',
    nivel: 'A2',
    onde: 'O e-mail já estava na tabela.',
    rodadas: [
      fala(
        'Grava',
        'Where was the email?',
        'Onde o e-mail estava?',
        'Diga que o e-mail já estava na tabela.',
        'The email was already in the table.',
        ['the email was already in the table', 'that email was already in the table'],
        'Already in the table é já estava na tabela.'
      ),
      fala(
        'Recusa',
        'What should we reject?',
        'O que a gente recusa?',
        'Peça para recusar a linha nova.',
        'Please reject the new row.',
        ['please reject the new row', 'reject the new row'],
        'The new row é a linha nova.'
      )
    ]
  },
  {
    id: 'linhadois',
    titulo: 'Linha dois',
    emoji: '📧',
    nivel: 'B1',
    onde: 'A linha dois usou o mesmo e-mail.',
    rodadas: [
      fala(
        'Grava',
        'Which row used the same email?',
        'Qual linha usou o mesmo e-mail?',
        'Diga que a linha dois usou o mesmo e-mail.',
        'Row two used the same email.',
        [
          'row two used the same email',
          'row 2 used the same email',
          'that row two used the same email'
        ],
        'Row two é a linha dois.'
      ),
      fala(
        'Recusa',
        'Where should we cap the copies?',
        'Onde a gente limita as cópias?',
        'Peça para limitar as cópias em um e-mail.',
        'Please cap the copies at one email.',
        [
          'please cap the copies at one email',
          'please cap the copies at 1 email',
          'cap the copies at one email'
        ],
        'One email é um e-mail.'
      )
    ]
  },
  {
    id: 'duplicadook',
    titulo: 'Único certo',
    emoji: '📧',
    nivel: 'B1',
    onde: 'O e-mail é novo na tabela.',
    rodadas: [
      fala(
        'Grava',
        'Is the email new?',
        'O e-mail é novo?',
        'Diga que o e-mail é novo na tabela.',
        'The email is new in the table.',
        ['the email is new in the table', 'that email is new in the table'],
        'New in the table é novo na tabela.'
      ),
      fala(
        'Recusa',
        'Can the new row stay?',
        'A linha nova pode ficar?',
        'Diga que a linha nova pode ficar.',
        'The new row can stay.',
        ['the new row can stay', 'that new row can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export const APAGOES = [
  {
    id: 'maquinaum',
    titulo: 'Máquina um',
    emoji: '🔌',
    nivel: 'A2',
    onde: 'Desligamos uma máquina de propósito.',
    rodadas: [
      fala(
        'Desliga',
        'What did we turn off?',
        'O que a gente desligou?',
        'Diga que desligamos uma máquina de propósito.',
        'We turned one machine off on purpose.',
        ['we turned one machine off on purpose', 'we turned 1 machine off on purpose'],
        'On purpose é de propósito.'
      ),
      fala(
        'Mede',
        'What should we watch?',
        'O que a gente observa?',
        'Peça para observar as outras máquinas.',
        'Please watch the other machines.',
        ['please watch the other machines', 'watch the other machines'],
        'The other machines é as outras máquinas.'
      )
    ]
  },
  {
    id: 'desliga1',
    titulo: 'Desliga um',
    emoji: '🔌',
    nivel: 'B1',
    onde: 'Desligamos a máquina um.',
    rodadas: [
      fala(
        'Desliga',
        'Which machine did we turn off?',
        'Qual máquina a gente desligou?',
        'Diga que desligamos a máquina um.',
        'We turned off machine one.',
        [
          'we turned off machine one',
          'we turned off machine 1',
          'we turned machine one off'
        ],
        'Machine one é a máquina um.'
      ),
      fala(
        'Mede',
        'Where should we cap the outage?',
        'Onde a gente limita a queda?',
        'Peça para limitar a queda em uma máquina.',
        'Please cap the outage at one machine.',
        [
          'please cap the outage at one machine',
          'please cap the outage at 1 machine',
          'cap the outage at one machine'
        ],
        'One machine é uma máquina.'
      )
    ]
  },
  {
    id: 'apagaook',
    titulo: 'Queda medida',
    emoji: '🔌',
    nivel: 'B1',
    onde: 'Toda máquina ficou ligada.',
    rodadas: [
      fala(
        'Desliga',
        'Did every machine stay on?',
        'Toda máquina ficou ligada?',
        'Diga que toda máquina ficou ligada.',
        'Every machine stayed on.',
        ['every machine stayed on', 'each machine stayed on'],
        'Stayed on é ficou ligada.'
      ),
      fala(
        'Mede',
        'Can the service stay up?',
        'O serviço pode continuar no ar?',
        'Diga que o serviço pode continuar no ar.',
        'The service can stay up.',
        ['the service can stay up', 'that service can stay up'],
        'Stay up é continuar no ar.'
      )
    ]
  }
];

export function instavelPorId(id) {
  return INSTAVEIS.find(c => c.id === id) ?? null;
}

export function duplicadoPorId(id) {
  return DUPLICADOS.find(c => c.id === id) ?? null;
}

export function apagaoPorId(id) {
  return APAGOES.find(c => c.id === id) ?? null;
}

export function avaliarInstavel(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDuplicado(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarApagao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
