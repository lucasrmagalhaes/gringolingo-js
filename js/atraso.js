// Rebase da branch, consulta lenta e réplica atrasada.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const REBASES = [
  {
    id: 'emcima',
    titulo: 'Dois atrás',
    emoji: '🌿',
    nivel: 'B1',
    onde: 'A branch ficou para trás da main.',
    rodadas: [
      fala(
        'Base',
        'How far behind are we?',
        'Quanto a gente ficou para trás?',
        'Diga que a branch está dois commits atrás.',
        'The branch is two commits behind.',
        [
          'the branch is two commits behind',
          'the branch is 2 commits behind',
          'our branch is two commits behind'
        ],
        'Branch é o ramo. Two commits behind é dois commits atrás.'
      ),
      fala(
        'Arquivo',
        'What should we do?',
        'O que a gente faz?',
        'Diga para rebasear em cima da main.',
        'Please rebase onto main.',
        [
          'please rebase onto main',
          'please rebase on main',
          'rebase onto main'
        ],
        'Rebase é repor a base. Onto main é em cima da main.'
      )
    ]
  },
  {
    id: 'umarquivo',
    titulo: 'Um arquivo',
    emoji: '🌿',
    nivel: 'A2',
    onde: 'O rebase parou num conflito.',
    rodadas: [
      fala(
        'Base',
        'Where is the conflict?',
        'Onde está o conflito?',
        'Diga que o conflito está em um arquivo.',
        'The conflict is in one file.',
        [
          'the conflict is in one file',
          'the conflict is in 1 file',
          'there is a conflict in one file'
        ],
        'Conflict é o conflito. One file é um arquivo.'
      ),
      fala(
        'Arquivo',
        'When will you fix it?',
        'Quando você arruma?',
        'Diga que vai arrumar esse arquivo hoje.',
        'I will fix that file today.',
        [
          'i will fix that file today',
          'i will fix this file today',
          'i will fix the file today'
        ],
        'Fix that file é arrumar esse arquivo. Today é hoje.'
      )
    ]
  },
  {
    id: 'depoisrebase',
    titulo: 'A linha',
    emoji: '🌿',
    nivel: 'B1',
    onde: 'O rebase acabou.',
    rodadas: [
      fala(
        'Base',
        'Will you push again?',
        'Você envia de novo?',
        'Diga que vai enviar de novo depois do rebase.',
        'I will push again after the rebase.',
        [
          'i will push again after the rebase',
          'i will push again after rebase',
          'i will push it again after the rebase'
        ],
        'Push again é enviar de novo. After the rebase é depois do rebase.'
      ),
      fala(
        'Arquivo',
        'How does the history look?',
        'Como fica o histórico?',
        'Diga que o histórico fica em linha reta.',
        'The history stays in a straight line.',
        [
          'the history stays in a straight line',
          'history stays in a straight line',
          'the history is a straight line'
        ],
        'History é o histórico. A straight line é uma linha reta.'
      )
    ]
  }
];

export const CONSULTAS = [
  {
    id: 'quatroseg',
    titulo: 'Quatro segundos',
    emoji: '🐌',
    nivel: 'A2',
    onde: 'A busca da página está lenta.',
    rodadas: [
      fala(
        'Tempo',
        'How long does the query take?',
        'Quanto tempo a consulta leva?',
        'Diga que esta consulta leva quatro segundos.',
        'This query takes four seconds.',
        [
          'this query takes four seconds',
          'this query takes 4 seconds',
          'the query takes four seconds'
        ],
        'Query é a consulta. Four seconds é quatro segundos.'
      ),
      fala(
        'Plano',
        'Where do people wait?',
        'Onde as pessoas esperam?',
        'Diga que as pessoas esperam na página de busca.',
        'Users wait on the search page.',
        [
          'users wait on the search page',
          'the users wait on the search page',
          'users wait on our search page'
        ],
        'Search page é a página de busca. Wait é esperar.'
      )
    ]
  },
  {
    id: 'cadacarga',
    titulo: 'Cada página',
    emoji: '🐌',
    nivel: 'B1',
    onde: 'A consulta roda demais.',
    rodadas: [
      fala(
        'Tempo',
        'When does it run?',
        'Quando ela roda?',
        'Diga que ela roda em cada carga de página.',
        'It runs on every page load.',
        [
          'it runs on every page load',
          'it runs on each page load',
          'the query runs on every page load'
        ],
        'Every page load é cada carga de página. Runs é roda.'
      ),
      fala(
        'Plano',
        'Why does the page feel slow?',
        'Por que a página fica lenta?',
        'Diga que a página fica lenta por causa dela.',
        'The page feels slow because of it.',
        [
          'the page feels slow because of it',
          'the page feels slow because of the query',
          'this page feels slow because of it'
        ],
        'Feels slow é fica lenta. Because of it é por causa dela.'
      )
    ]
  },
  {
    id: 'olhaplano',
    titulo: 'O plano',
    emoji: '🐌',
    nivel: 'B1',
    onde: 'O time quer o próximo passo.',
    rodadas: [
      fala(
        'Tempo',
        'What will we do tonight?',
        'O que a gente faz hoje à noite?',
        'Diga que vamos ler o plano hoje à noite.',
        'We will read the plan tonight.',
        [
          'we will read the plan tonight',
          'we will look at the plan tonight',
          'we will read the query plan tonight'
        ],
        'The plan é o plano da consulta. Tonight é hoje à noite.'
      ),
      fala(
        'Plano',
        'What is the slow part?',
        'Qual é a parte lenta?',
        'Diga que a parte lenta é um join.',
        'The slow part is one join.',
        [
          'the slow part is one join',
          'the slow part is 1 join',
          'the slow part is a join'
        ],
        'Slow part é a parte lenta. One join é um join.'
      )
    ]
  }
];

export const REPLICAS = [
  {
    id: 'doisminutos',
    titulo: 'Dois minutos',
    emoji: '🪞',
    nivel: 'A2',
    onde: 'O relatório não bate com o banco principal.',
    rodadas: [
      fala(
        'Atraso',
        'How far behind is the copy?',
        'Quanto a cópia está atrás?',
        'Diga que a réplica está dois minutos atrás.',
        'The replica is two minutes behind.',
        [
          'the replica is two minutes behind',
          'the replica is 2 minutes behind',
          'our replica is two minutes behind'
        ],
        'Replica é a réplica. Two minutes behind é dois minutos atrás.'
      ),
      fala(
        'Leitura',
        'Where do writes go?',
        'Para onde vão as escritas?',
        'Diga que as escritas ainda vão para o principal.',
        'Writes still go to the primary.',
        [
          'writes still go to the primary',
          'writes still go to the primary database',
          'the writes still go to the primary'
        ],
        'Writes são as escritas. Primary é o banco principal.'
      )
    ]
  },
  {
    id: 'leituracopia',
    titulo: 'A leitura',
    emoji: '🪞',
    nivel: 'B1',
    onde: 'Alguém pergunta se pode ler da cópia.',
    rodadas: [
      fala(
        'Atraso',
        'Can the report read from the copy?',
        'O relatório pode ler da cópia?',
        'Diga que as leituras podem usar a réplica.',
        'Reads can use the replica.',
        [
          'reads can use the replica',
          'reads can use our replica',
          'the reads can use the replica'
        ],
        'Reads são as leituras. Can use é podem usar.'
      ),
      fala(
        'Leitura',
        'Does the report need the latest row?',
        'O relatório precisa da linha mais nova?',
        'Diga que o relatório pode esperar.',
        'The report can wait.',
        [
          'the report can wait',
          'our report can wait',
          'the report can wait a bit'
        ],
        'Report é o relatório. Can wait é pode esperar.'
      )
    ]
  },
  {
    id: 'voltacopia',
    titulo: 'De noite',
    emoji: '🪞',
    nivel: 'A2',
    onde: 'A réplica se acerta sozinha.',
    rodadas: [
      fala(
        'Atraso',
        'When does the copy catch up?',
        'Quando a cópia se acerta?',
        'Diga que a réplica se acerta de noite.',
        'The replica catches up at night.',
        [
          'the replica catches up at night',
          'our replica catches up at night',
          'the replica catches up during the night'
        ],
        'Catches up é se acerta. At night é de noite.'
      ),
      fala(
        'Leitura',
        'When will you check?',
        'Quando você confere?',
        'Diga que vai olhar o atraso de manhã.',
        'I will check the lag in the morning.',
        [
          'i will check the lag in the morning',
          'i will check the lag tomorrow morning',
          'i will look at the lag in the morning'
        ],
        'Lag é o atraso. In the morning é de manhã.'
      )
    ]
  }
];

export function rebasePorId(id) {
  return REBASES.find(c => c.id === id) ?? null;
}

export function consultaPorId(id) {
  return CONSULTAS.find(c => c.id === id) ?? null;
}

export function replicaPorId(id) {
  return REPLICAS.find(c => c.id === id) ?? null;
}

export function avaliarRebase(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarConsulta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarReplica(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
