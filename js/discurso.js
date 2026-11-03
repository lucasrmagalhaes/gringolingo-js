// Retrospectiva, onboarding e conectores.
// A nota usa o mesmo tutor das outras cenas. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return {
    etapa,
    npc: { en: npcEn, pt: npcPt },
    missao,
    melhor,
    aceitas,
    dica
  };
}

export const RETROS = [
  {
    id: 'checklist',
    titulo: 'Checklist da entrega',
    emoji: '🔄',
    nivel: 'B1',
    onde: 'A entrega foi bem. Falta escrever o checklist antes.',
    rodadas: [
      fala(
        'Bem',
        'What went well this sprint?',
        'O que foi bem nesta sprint?',
        'Diga que a entrega foi bem porque o rollback estava pronto.',
        'The release went well because the rollback was ready.',
        [
          'the release went well because the rollback was ready',
          'the release went well because rollback was ready',
          'the release was good because the rollback was ready'
        ],
        'Went well é foi bem. Rollback é voltar a versão.'
      ),
      fala(
        'Melhorar',
        'What should we improve?',
        'O que a gente melhora?',
        'Diga que o time devia escrever o checklist mais cedo.',
        'We should write the checklist earlier.',
        [
          'we should write the checklist earlier',
          'we should write the checklist sooner',
          'we should write a checklist earlier'
        ],
        'Should é o que vale a pena fazer. Earlier é mais cedo.'
      ),
      fala(
        'Ação',
        'What is the action?',
        'Qual é a ação?',
        'Diga que a ação é colocar o checklist no modelo.',
        'The action is to add the checklist to the template.',
        [
          'the action is to add the checklist to the template',
          'the action is to add a checklist to the template',
          'our action is to add the checklist to the template'
        ],
        'The action is abre o combinado. Template é o modelo.'
      )
    ]
  },
  {
    id: 'instavel',
    titulo: 'Teste instável',
    emoji: '🔄',
    nivel: 'B2',
    onde: 'O teste instável saiu. O caso ainda precisa de nota.',
    rodadas: [
      fala(
        'Bem',
        'What went well?',
        'O que foi bem?',
        'Diga que a correção foi bem porque o teste instável sumiu.',
        'The fix went well because the flaky test is gone.',
        [
          'the fix went well because the flaky test is gone',
          'the fix went well because the flaky test is gone now',
          'the fix was good because the flaky test is gone'
        ],
        'Flaky test é o teste que passa e falha sem motivo claro.'
      ),
      fala(
        'Melhorar',
        'What can we do better?',
        'O que dá para fazer melhor?',
        'Diga que o time devia guardar uma nota daquele caso.',
        'We should keep a note of that case.',
        [
          'we should keep a note of that case',
          'we should keep a note of this case',
          'we should write a note of that case'
        ],
        'Keep a note é guardar um recado. That case é aquele caso.'
      ),
      fala(
        'Ação',
        'So what will we do?',
        'Então o que a gente faz?',
        'Diga que a ação é colocar esse caso na suíte.',
        'The action is to add that case to the suite.',
        [
          'the action is to add that case to the suite',
          'the action is to add this case to the suite',
          'our action is to add that case to the suite'
        ],
        'Suite é o conjunto de testes. Add that case é incluir o caso.'
      )
    ]
  },
  {
    id: 'modelo',
    titulo: 'Demo curta',
    emoji: '🔄',
    nivel: 'B1',
    onde: 'A demo coube no tempo. Faltou espaço para pergunta.',
    rodadas: [
      fala(
        'Bem',
        'How was the demo?',
        'Como foi a demo?',
        'Diga que a demo foi bem porque o roteiro era curto.',
        'The demo went well because the script was short.',
        [
          'the demo went well because the script was short',
          'the demo went well because the script was short and clear',
          'the demo was good because the script was short'
        ],
        'Script aqui é o roteiro. Short é curto.'
      ),
      fala(
        'Melhorar',
        'What was missing?',
        'O que faltou?',
        'Diga que o time devia deixar tempo para perguntas.',
        'We should leave time for questions.',
        [
          'we should leave time for questions',
          'we should leave time for the questions',
          'we should save time for questions'
        ],
        'Leave time for é reservar tempo. Questions são as perguntas.'
      ),
      fala(
        'Ação',
        'What do we change next time?',
        'O que muda na próxima?',
        'Diga que a ação é colocar duas perguntas no roteiro.',
        'The action is to add two questions to the script.',
        [
          'the action is to add two questions to the script',
          'the action is to add 2 questions to the script',
          'our action is to add two questions to the script'
        ],
        'Two questions são duas perguntas. O roteiro passa a ter espaço.'
      )
    ]
  }
];

export const CHEGADAS = [
  {
    id: 'notas',
    titulo: 'Notas do curso',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'Uma pessoa nova chega no projeto de notas.',
    rodadas: [
      fala(
        'Projeto',
        'What does this project do?',
        'O que este projeto faz?',
        'Diga que este projeto guarda notas de curso.',
        'This project stores course notes.',
        [
          'this project stores course notes',
          'this project saves course notes',
          'the project stores course notes'
        ],
        'Stores é guarda. Course notes são notas de curso.'
      ),
      fala(
        'Fluxo',
        'How does the team work?',
        'Como o time trabalha?',
        'Diga que vocês abrem um pull request e pedem uma revisão.',
        'We open a pull request and ask for one review.',
        [
          'we open a pull request and ask for one review',
          'we open a pull request and ask for a review',
          'we open a pr and ask for one review'
        ],
        'Pull request é o pedido de mudança. One review é uma revisão.'
      ),
      fala(
        'Começo',
        'What should I do first?',
        'O que eu faço primeiro?',
        'Diga que a primeira tarefa é corrigir a busca vazia.',
        'Your first task is to fix the empty search.',
        [
          'your first task is to fix the empty search',
          'your first task is to fix empty search',
          'the first task is to fix the empty search'
        ],
        'First task é a primeira tarefa. Empty search é a busca vazia.'
      )
    ]
  },
  {
    id: 'ritual',
    titulo: 'O jeito do time',
    emoji: '🧭',
    nivel: 'B2',
    onde: 'Explique a loja pequena e o teste antes da correção.',
    rodadas: [
      fala(
        'Projeto',
        'Can you describe the project?',
        'Você descreve o projeto?',
        'Diga que este projeto é uma loja pequena de notas.',
        'This project is a small store for notes.',
        [
          'this project is a small store for notes',
          'this project is a small notes store',
          'the project is a small store for notes'
        ],
        'A small store é uma loja pequena. Notes são as notas.'
      ),
      fala(
        'Fluxo',
        'What is the working agreement?',
        'Qual é o combinado de trabalho?',
        'Diga que vocês escrevem o teste antes da correção.',
        'We write the test before the fix.',
        [
          'we write the test before the fix',
          'we write a test before the fix',
          'we write the test before we fix it'
        ],
        'Before the fix é antes da correção. O teste vem primeiro.'
      ),
      fala(
        'Começo',
        'Where do I start?',
        'Por onde eu começo?',
        'Diga que a primeira tarefa é ler o bug aberto.',
        'Your first task is to read the open bug.',
        [
          'your first task is to read the open bug',
          'your first task is to read the open issue',
          'the first task is to read the open bug'
        ],
        'Open bug é o bug que ainda está aberto. Read é ler.'
      )
    ]
  },
  {
    id: 'primeiro',
    titulo: 'Primeiro dia',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'As notas funcionam offline. O começo é a suíte.',
    rodadas: [
      fala(
        'Projeto',
        'What are we building?',
        'O que a gente está construindo?',
        'Diga que este projeto deixa as pessoas salvarem notas offline.',
        'This project lets people save notes offline.',
        [
          'this project lets people save notes offline',
          'this project lets people save notes off line',
          'the project lets people save notes offline'
        ],
        'Lets people é deixa as pessoas. Offline é sem rede.'
      ),
      fala(
        'Fluxo',
        'When does a change reach main?',
        'Quando uma mudança chega na main?',
        'Diga que vocês publicam a partir da main depois de uma revisão.',
        'We ship from main after one review.',
        [
          'we ship from main after one review',
          'we ship from main after a review',
          'we ship to main after one review'
        ],
        'Ship é publicar. After one review é depois de uma revisão.'
      ),
      fala(
        'Começo',
        'What is a good first step?',
        'Qual é um bom primeiro passo?',
        'Diga que a primeira tarefa é rodar a suíte de testes.',
        'Your first task is to run the test suite.',
        [
          'your first task is to run the test suite',
          'your first task is to run the tests',
          'the first task is to run the test suite'
        ],
        'Run the test suite é rodar os testes. É o primeiro passo seguro.'
      )
    ]
  }
];

export const LIGACOES = [
  {
    id: 'porem',
    titulo: 'However',
    emoji: '🔗',
    nivel: 'B1',
    onde: 'Os testes passaram, e a página continua lenta.',
    rodadas: [
      fala(
        'Fato',
        'Start with the good news.',
        'Comece pela notícia boa.',
        'Diga que os testes passaram.',
        'The tests passed.',
        [
          'the tests passed',
          'the tests have passed',
          'our tests passed'
        ],
        'Passed é passaram. É o lado bom, ainda sem o contraste.'
      ),
      fala(
        'Ligação',
        'Now add the contrast with however.',
        'Agora traga o contraste com however.',
        'Diga que, however, a página continua lenta.',
        'However, the page is still slow.',
        [
          'however the page is still slow',
          'however the page is still slow today',
          'however the page remains slow'
        ],
        'However muda o lado. Still slow é continua lenta.'
      )
    ]
  },
  {
    id: 'outra',
    titulo: 'On the other hand',
    emoji: '🔗',
    nivel: 'B2',
    onde: 'A fila deixa o e-mail mais seguro, e a pessoa espera.',
    rodadas: [
      fala(
        'Fato',
        'What does the queue give us?',
        'O que a fila nos dá?',
        'Diga que uma fila deixa o e-mail mais seguro.',
        'A queue makes the email safer.',
        [
          'a queue makes the email safer',
          'a queue makes email safer',
          'the queue makes the email safer'
        ],
        'Safer é mais seguro. A queue é a fila.'
      ),
      fala(
        'Ligação',
        'Add the other side with on the other hand.',
        'Traga o outro lado com on the other hand.',
        'Diga que, on the other hand, a pessoa espera um pouco.',
        'On the other hand, the user waits a little.',
        [
          'on the other hand the user waits a little',
          'on the other hand the user waits a bit',
          'on the other hand the user has to wait a little'
        ],
        'On the other hand abre o outro lado. A little é um pouco.'
      )
    ]
  },
  {
    id: 'disse',
    titulo: 'That said',
    emoji: '🔗',
    nivel: 'B2',
    onde: 'O bug é real, e ainda dá para publicar na sexta.',
    rodadas: [
      fala(
        'Fato',
        'Is the bug real?',
        'O bug é real?',
        'Diga que o bug é real.',
        'The bug is real.',
        [
          'the bug is real',
          'this bug is real',
          'yes the bug is real'
        ],
        'Real é de verdade. Ainda não é a hora do combinado.'
      ),
      fala(
        'Ligação',
        'Soften the plan with that said.',
        'Afrouxe o plano com that said.',
        'Diga que, that said, dá para publicar na sexta.',
        'That said, we can ship on Friday.',
        [
          'that said we can ship on friday',
          'that said we can ship this friday',
          'that said we can still ship on friday'
        ],
        'That said segura a ideia e abre o plano. Friday é sexta.'
      )
    ]
  }
];

export function retroPorId(id) {
  return RETROS.find(c => c.id === id) ?? null;
}

export function chegadaPorId(id) {
  return CHEGADAS.find(c => c.id === id) ?? null;
}

export function ligacaoPorId(id) {
  return LIGACOES.find(c => c.id === id) ?? null;
}

export function avaliarRetro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarChegada(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLigacao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
