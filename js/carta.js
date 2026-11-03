// Planning poker, IA para quem não é da área e a ligação com o recrutador.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const POKERS = [
  {
    id: 'pontos5',
    titulo: 'Cinco pontos',
    emoji: '🃏',
    nivel: 'B1',
    onde: 'A API ainda é desconhecida. Mostre a carta.',
    rodadas: [
      fala(
        'Carta',
        'What is your card?',
        'Qual é a sua carta?',
        'Diga que vota cinco.',
        'I vote five.',
        [
          'i vote five',
          'i vote 5',
          'my card is five'
        ],
        'Vote é votar. Five é cinco.'
      ),
      fala(
        'Motivo',
        'Why five?',
        'Por que cinco?',
        'Diga que a API desconhecida é o motivo do cinco.',
        'The unknown API is why I voted five.',
        [
          'the unknown api is why i voted five',
          'the unknown api is why i voted 5',
          'an unknown api is why i voted five'
        ],
        'Unknown é desconhecida. Why abre o motivo.'
      )
    ]
  },
  {
    id: 'pontos3',
    titulo: 'Três pontos',
    emoji: '🃏',
    nivel: 'A2',
    onde: 'A tela já existe. A carta pode ser baixa.',
    rodadas: [
      fala(
        'Carta',
        'Show your card.',
        'Mostre a sua carta.',
        'Diga que vota três.',
        'I vote three.',
        [
          'i vote three',
          'i vote 3',
          'my card is three'
        ],
        'Three é três. Card é a carta.'
      ),
      fala(
        'Motivo',
        'Why so low?',
        'Por que tão baixo?',
        'Diga que a tela já existe, então três bastam.',
        'The screen already exists, so three is enough.',
        [
          'the screen already exists so three is enough',
          'the screen already exists so 3 is enough',
          'the screen already exists so three is fine'
        ],
        'Already exists é já existe. Enough é o bastante.'
      )
    ]
  },
  {
    id: 'pontos8',
    titulo: 'Oito pontos',
    emoji: '🃏',
    nivel: 'B2',
    onde: 'Dois times precisam concordar.',
    rodadas: [
      fala(
        'Carta',
        'Your card, please.',
        'A sua carta, por favor.',
        'Diga que vota oito.',
        'I vote eight.',
        [
          'i vote eight',
          'i vote 8',
          'my card is eight'
        ],
        'Eight é oito.'
      ),
      fala(
        'Motivo',
        'What makes it an eight?',
        'O que faz virar oito?',
        'Diga que dois times precisam concordar, por isso votou oito.',
        'Two teams have to agree, so I voted eight.',
        [
          'two teams have to agree so i voted eight',
          'two teams have to agree so i voted 8',
          'two teams must agree so i voted eight'
        ],
        'Have to agree é precisam concordar. Voted é votei.'
      )
    ]
  }
];

export const LEIGOS = [
  {
    id: 'centavo',
    titulo: 'O custo',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'Alguém de fora pergunta se a resposta é de graça.',
    rodadas: [
      fala(
        'Conta',
        'Is each answer free?',
        'Cada resposta é de graça?',
        'Diga que cada resposta tem um custo pequeno.',
        'Each answer has a small cost.',
        [
          'each answer has a small cost',
          'every answer has a small cost',
          'each answer has a small price'
        ],
        'Each answer é cada resposta. Cost é o custo.'
      ),
      fala(
        'Limite',
        'How do we keep the bill down?',
        'Como a conta não sobe?',
        'Diga que vocês limitam as perguntas a vinte por dia.',
        'We will cap questions at twenty a day.',
        [
          'we will cap questions at twenty a day',
          'we will cap questions at 20 a day',
          'we will limit questions to twenty a day'
        ],
        'Cap é limitar. Twenty a day é vinte por dia.'
      )
    ]
  },
  {
    id: 'documentos',
    titulo: 'Os documentos',
    emoji: '🧮',
    nivel: 'B2',
    onde: 'Querem saber de onde a resposta sai.',
    rodadas: [
      fala(
        'Conta',
        'Where does the answer come from?',
        'De onde a resposta vem?',
        'Diga que ele busca os documentos de vocês antes de responder.',
        'It searches our docs before it answers.',
        [
          'it searches our docs before it answers',
          'it searches our documents before it answers',
          'it looks through our docs before it answers'
        ],
        'Searches é busca. Docs são os documentos.'
      ),
      fala(
        'Limite',
        'What if the doc is not there?',
        'E se o documento não estiver lá?',
        'Diga que, se o documento falta, ele deve dizer que não sabe.',
        'If the doc is missing, it should say it does not know.',
        [
          'if the doc is missing it should say it does not know',
          'if the document is missing it should say it does not know',
          'if the doc is missing it should say it does not know the answer'
        ],
        'Missing é falta. Does not know é não sabe.'
      )
    ]
  },
  {
    id: 'molde',
    titulo: 'O molde',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'O suporte quer um jeito estável de pedir a resposta.',
    rodadas: [
      fala(
        'Conta',
        'How do you ask it the same way each time?',
        'Como vocês pedem do mesmo jeito toda vez?',
        'Diga que vocês guardam um molde para as respostas do suporte.',
        'We keep one template for support answers.',
        [
          'we keep one template for support answers',
          'we keep a template for support answers',
          'we keep one template for the support answers'
        ],
        'Template é o molde. Support é o suporte.'
      ),
      fala(
        'Limite',
        'Can we send it straight to the customer?',
        'Dá para mandar direto para o cliente?',
        'Diga que a pessoa ainda lê a resposta antes de enviar.',
        'The person still reads the answer before sending it.',
        [
          'the person still reads the answer before sending it',
          'a person still reads the answer before sending it',
          'the person still reads the answer before they send it'
        ],
        'Still reads é ainda lê. Before sending é antes de enviar.'
      )
    ]
  }
];

export const RECRUTAS = [
  {
    id: 'meio',
    titulo: 'A pretensão',
    emoji: '📞',
    nivel: 'B1',
    onde: 'O recrutador liga e pede um número.',
    rodadas: [
      fala(
        'Fala',
        'What are you aiming for?',
        'Qual é a sua pretensão?',
        'Diga que mira o meio da faixa.',
        'I am aiming for the middle of the range.',
        [
          'i am aiming for the middle of the range',
          'i am aiming for the mid range',
          'i aim for the middle of the range'
        ],
        'Aiming for é mirar. The middle of the range é o meio da faixa.'
      ),
      fala(
        'Janela',
        'Can you give a number now?',
        'Você dá um número agora?',
        'Diga que passa o número depois de ouvir o escopo.',
        'I can share a number after I hear the scope.',
        [
          'i can share a number after i hear the scope',
          'i will share a number after i hear the scope',
          'i can share a number after hearing the scope'
        ],
        'Share a number é passar o número. Scope é o escopo.'
      )
    ]
  },
  {
    id: 'fuso',
    titulo: 'O fuso',
    emoji: '📞',
    nivel: 'A2',
    onde: 'A vaga é remota e o time está em outro horário.',
    rodadas: [
      fala(
        'Fala',
        'What time zone are you in?',
        'Em que fuso você está?',
        'Diga que trabalha no horário do Brasil.',
        'I work on Brazil time.',
        [
          'i work on brazil time',
          'i work in brazil time',
          'i am on brazil time'
        ],
        'Time zone é o fuso. Brazil time é o horário do Brasil.'
      ),
      fala(
        'Janela',
        'Can our mornings work?',
        'As manhãs daqui funcionam?',
        'Diga que consegue cruzar com a manhã deles.',
        'I can overlap with your morning.',
        [
          'i can overlap with your morning',
          'i can overlap your morning',
          'i can overlap with your mornings'
        ],
        'Overlap é cruzar os horários. Morning é a manhã.'
      )
    ]
  },
  {
    id: 'quatro',
    titulo: 'Quatro semanas',
    emoji: '📞',
    nivel: 'B1',
    onde: 'Eles perguntam quando você começa e quando fala de novo.',
    rodadas: [
      fala(
        'Fala',
        'When could you start?',
        'Quando você poderia começar?',
        'Diga que pode começar em quatro semanas.',
        'I can start in four weeks.',
        [
          'i can start in four weeks',
          'i can start in 4 weeks',
          'i could start in four weeks'
        ],
        'Start é começar. Four weeks são quatro semanas.'
      ),
      fala(
        'Janela',
        'When can we talk again?',
        'Quando a gente fala de novo?',
        'Diga que está livre para uma call na quinta.',
        'I am free for a call on Thursday.',
        [
          'i am free for a call on thursday',
          'i am free for a call this thursday',
          'i can do a call on thursday'
        ],
        'Free for a call é livre para uma ligação. Thursday é quinta.'
      )
    ]
  }
];

export function pokerPorId(id) {
  return POKERS.find(c => c.id === id) ?? null;
}

export function leigoPorId(id) {
  return LEIGOS.find(c => c.id === id) ?? null;
}

export function recrutaPorId(id) {
  return RECRUTAS.find(c => c.id === id) ?? null;
}

export function avaliarPoker(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLeigo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRecruta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
