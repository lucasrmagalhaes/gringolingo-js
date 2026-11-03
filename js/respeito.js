// Discordar de uma arquitetura, pedir tempo para a dívida e uma referência.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const RESPEITOS = [
  {
    id: 'empurra',
    titulo: 'O risco',
    emoji: '🏛️',
    nivel: 'B1',
    onde: 'O plano de arquitetura separa a fila em dois serviços.',
    rodadas: [
      fala(
        'Ponto',
        'Does this split look right to you?',
        'Essa separação parece certa para você?',
        'Respeite o plano e diga que vê um risco.',
        'I respect the plan, and I see a risk.',
        [
          'i respect the plan and i see a risk',
          'i respect this plan and i see a risk',
          'i respect the plan and i see one risk'
        ],
        'I respect abre com respeito. A risk é um risco.'
      ),
      fala(
        'Caminho',
        'What would you change?',
        'O que você mudaria?',
        'Pergunte se a fila pode ficar num serviço só.',
        'Could we keep the queue in one service?',
        [
          'could we keep the queue in one service',
          'can we keep the queue in one service',
          'could we keep the queue in 1 service'
        ],
        'Keep é manter. One service é um serviço só.'
      )
    ]
  },
  {
    id: 'sincrono',
    titulo: 'A chamada',
    emoji: '🏛️',
    nivel: 'B2',
    onde: 'Alguém quer mais um salto entre serviços.',
    rodadas: [
      fala(
        'Ponto',
        'Should this call go through another service?',
        'Essa chamada deve passar por outro serviço?',
        'Diga que prefere manter a chamada síncrona.',
        'I would rather keep this call synchronous.',
        [
          'i would rather keep this call synchronous',
          'i would rather keep the call synchronous',
          'i would prefer to keep this call synchronous'
        ],
        'Rather é preferiria. Synchronous é síncrona, na hora.'
      ),
      fala(
        'Caminho',
        'Why not add the hop?',
        'Por que não acrescentar o salto?',
        'Diga que um salto a mais deixa a falha mais difícil de ver.',
        'An extra hop makes the failure harder to see.',
        [
          'an extra hop makes the failure harder to see',
          'the extra hop makes the failure harder to see',
          'an extra hop makes a failure harder to see'
        ],
        'A hop é um salto entre serviços. Harder to see é mais difícil de ver.'
      )
    ]
  },
  {
    id: 'tipocomum',
    titulo: 'O contrato',
    emoji: '🏛️',
    nivel: 'B1',
    onde: 'Dois times querem contratos diferentes.',
    rodadas: [
      fala(
        'Ponto',
        'Can each team keep its own contract?',
        'Cada time pode ficar com o próprio contrato?',
        'Peça licença para discordar deste contrato compartilhado.',
        'May I push back on this shared contract?',
        [
          'may i push back on this shared contract',
          'may i push back on the shared contract',
          'could i push back on this shared contract'
        ],
        'Push back é discordar com respeito. Shared contract é o contrato compartilhado.'
      ),
      fala(
        'Caminho',
        'What would be simpler?',
        'O que seria mais simples?',
        'Diga que um tipo compartilhado seria mais simples para os dois times.',
        'One shared type would be simpler for both teams.',
        [
          'one shared type would be simpler for both teams',
          '1 shared type would be simpler for both teams',
          'a shared type would be simpler for both teams'
        ],
        'A shared type é um tipo compartilhado. Both teams são os dois times.'
      )
    ]
  }
];

export const DEBITOS = [
  {
    id: 'juros',
    titulo: 'Os juros',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'O atalho de hoje cobra juros amanhã.',
    rodadas: [
      fala(
        'Dívida',
        'Why is this change risky?',
        'Por que essa mudança é arriscada?',
        'Diga que este atalho é dívida técnica.',
        'This shortcut is technical debt.',
        [
          'this shortcut is technical debt',
          'the shortcut is technical debt',
          'this shortcut is tech debt'
        ],
        'Shortcut é o atalho. Technical debt é a dívida técnica.'
      ),
      fala(
        'Tempo',
        'What happens if we leave it?',
        'O que acontece se a gente deixar assim?',
        'Diga que cada função nova paga juros nisso.',
        'Each new feature pays interest on it.',
        [
          'each new feature pays interest on it',
          'every new feature pays interest on it',
          'each new feature pays interest on this'
        ],
        'Pays interest é paga juros. Feature é a função nova.'
      )
    ]
  },
  {
    id: 'duasprints',
    titulo: 'Duas sprints',
    emoji: '🧱',
    nivel: 'B2',
    onde: 'Você pede tempo para refatorar.',
    rodadas: [
      fala(
        'Dívida',
        'How long does the cleanup need?',
        'Quanto tempo a limpeza precisa?',
        'Diga que precisa de duas sprints para refatorar.',
        'I need two sprints to refactor this.',
        [
          'i need two sprints to refactor this',
          'i need 2 sprints to refactor this',
          'i need two sprints to refactor it'
        ],
        'Two sprints são duas sprints. Refactor é refatorar.'
      ),
      fala(
        'Tempo',
        'What about the user work?',
        'E o trabalho da pessoa que usa?',
        'Diga que o trabalho visível pode esperar uma semana.',
        'The user facing work can wait one week.',
        [
          'the user facing work can wait one week',
          'the user facing work can wait 1 week',
          'user facing work can wait one week'
        ],
        'User facing é o que a pessoa vê. One week é uma semana.'
      )
    ]
  },
  {
    id: 'antesre',
    titulo: 'Antes de reescrever',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'A reescrita pede testes antes.',
    rodadas: [
      fala(
        'Dívida',
        'Can we rewrite it this afternoon?',
        'Dá para reescrever hoje à tarde?',
        'Diga que quer os testes no lugar antes da reescrita.',
        'I want tests in place before the rewrite.',
        [
          'i want tests in place before the rewrite',
          'i want the tests in place before the rewrite',
          'i want tests in place before we rewrite'
        ],
        'In place é no lugar. The rewrite é a reescrita.'
      ),
      fala(
        'Tempo',
        'When can you do it?',
        'Quando você consegue fazer?',
        'Peça a sexta para a refatoração.',
        'May I use Friday for the refactor?',
        [
          'may i use friday for the refactor',
          'could i use friday for the refactor',
          'may i use friday for this refactor'
        ],
        'May I pede licença. Friday é a sexta.'
      )
    ]
  }
];

export const INDICACOES = [
  {
    id: 'referencia',
    titulo: 'A referência',
    emoji: '✉️',
    nivel: 'B1',
    onde: 'Você pede a um ex-colega para ser referência.',
    rodadas: [
      fala(
        'Pedido',
        'How can I help?',
        'Como eu posso ajudar?',
        'Pergunte se a pessoa pode ser a sua referência.',
        'Would you be a reference for me?',
        [
          'would you be a reference for me',
          'could you be a reference for me',
          'would you be my reference'
        ],
        'A reference é a referência. Would you be pergunta com educação.'
      ),
      fala(
        'Contexto',
        'Where did we work together?',
        'Onde a gente trabalhou junto?',
        'Diga que trabalharam juntos no time de pagamentos.',
        'We worked together on the payments team.',
        [
          'we worked together on the payments team',
          'we worked together in the payments team',
          'we worked together on the payment team'
        ],
        'Worked together é trabalhamos juntos. Payments é pagamentos.'
      )
    ]
  },
  {
    id: 'exequipe',
    titulo: 'A lista',
    emoji: '✉️',
    nivel: 'A2',
    onde: 'O formulário pede um nome.',
    rodadas: [
      fala(
        'Pedido',
        'Do you need my name on the form?',
        'Você precisa do meu nome no formulário?',
        'Peça para colocar a pessoa como referência.',
        'May I list you as a reference?',
        [
          'may i list you as a reference',
          'could i list you as a reference',
          'may i put you as a reference'
        ],
        'List you é colocar o seu nome. As a reference é como referência.'
      ),
      fala(
        'Contexto',
        'What is the role?',
        'Qual é a vaga?',
        'Diga que a vaga é de backend.',
        'The role is a backend position.',
        [
          'the role is a backend position',
          'the role is a back end position',
          'it is a backend position'
        ],
        'The role é a vaga. Backend position é a vaga de backend.'
      )
    ]
  },
  {
    id: 'notacurta',
    titulo: 'A nota curta',
    emoji: '✉️',
    nivel: 'B1',
    onde: 'A pessoa tem pouco tempo.',
    rodadas: [
      fala(
        'Pedido',
        'Will someone contact me?',
        'Alguém vai entrar em contato?',
        'Diga que podem ligar na semana que vem.',
        'They may call you next week.',
        [
          'they may call you next week',
          'they might call you next week',
          'they may call you next week about it'
        ],
        'May é pode acontecer. Next week é a semana que vem.'
      ),
      fala(
        'Contexto',
        'How long is the note?',
        'Quão longa é a nota?',
        'Diga que uma nota curta basta.',
        'A short note is enough.',
        [
          'a short note is enough',
          'a short note is plenty',
          'one short note is enough'
        ],
        'A short note é uma nota curta. Enough é o bastante.'
      )
    ]
  }
];

export function respeitoPorId(id) {
  return RESPEITOS.find(c => c.id === id) ?? null;
}

export function debitoPorId(id) {
  return DEBITOS.find(c => c.id === id) ?? null;
}

export function indicacaoPorId(id) {
  return INDICACOES.find(c => c.id === id) ?? null;
}

export function avaliarRespeito(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDebito(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarIndicacao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
