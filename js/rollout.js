// Bandeira de lançamento, gelo de release e limite da API.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const BANDEIRAS = [
  {
    id: 'dezporcento',
    titulo: 'Dez por cento',
    emoji: '🎚️',
    nivel: 'B1',
    onde: 'A função nova sai para pouca gente primeiro.',
    rodadas: [
      fala(
        'Plano',
        'Who sees it first?',
        'Quem vê primeiro?',
        'Diga que dez por cento das pessoas veem o botão.',
        'Ten percent of people see the button.',
        [
          'ten percent of people see the button',
          '10 percent of people see the button',
          'ten percent of people see the new button'
        ],
        'Ten percent é dez por cento. The button é o botão.'
      ),
      fala(
        'Saída',
        'How do we stop it?',
        'Como a gente para?',
        'Diga que dá para desligar a bandeira sem publicar de novo.',
        'We can switch the flag off without a new deploy.',
        [
          'we can switch the flag off without a new deploy',
          'we can switch the flag off without a deploy',
          'we can switch off the flag without a new deploy'
        ],
        'Switch off é desligar. Without a new deploy é sem publicar de novo.'
      )
    ]
  },
  {
    id: 'virapadrao',
    titulo: 'Vira padrão',
    emoji: '🎚️',
    nivel: 'B1',
    onde: 'A bandeira já pode virar o comportamento normal.',
    rodadas: [
      fala(
        'Plano',
        'Is the flag still temporary?',
        'A bandeira ainda é temporária?',
        'Diga que o botão vira o padrão na segunda.',
        'The button becomes the default on Monday.',
        [
          'the button becomes the default on monday',
          'the button becomes the default this monday',
          'this button becomes the default on monday'
        ],
        'Becomes the default é vira o padrão. Monday é segunda.'
      ),
      fala(
        'Saída',
        'What happens to the flag?',
        'O que acontece com a bandeira?',
        'Diga que a bandeira sai do código na outra semana.',
        'The flag leaves the code next week.',
        [
          'the flag leaves the code next week',
          'the flag leaves the code the next week',
          'we remove the flag from the code next week'
        ],
        'Leaves the code é sai do código. Next week é a outra semana.'
      )
    ]
  },
  {
    id: 'quemliga',
    titulo: 'Quem liga',
    emoji: '🎚️',
    nivel: 'A2',
    onde: 'Alguém precisa poder mudar a bandeira à noite.',
    rodadas: [
      fala(
        'Plano',
        'Who can change it?',
        'Quem pode mudar?',
        'Diga que só a pessoa de plantão pode ligar a bandeira.',
        'Only the on call person can turn this flag on.',
        [
          'only the on call person can turn this flag on',
          'only the on call person can turn the flag on',
          'only on call can turn this flag on'
        ],
        'On call é o plantão. Turn this flag on é ligar esta bandeira.'
      ),
      fala(
        'Saída',
        'Where is the switch?',
        'Onde fica o interruptor?',
        'Diga que o interruptor está no painel interno.',
        'The switch is on the internal panel.',
        [
          'the switch is on the internal panel',
          'the switch is in the internal panel',
          'the switch is on our internal panel'
        ],
        'Switch é o interruptor. Internal panel é o painel interno.'
      )
    ]
  }
];

export const GELOS = [
  {
    id: 'depoisquatro',
    titulo: 'Depois das quatro',
    emoji: '🧊',
    nivel: 'B1',
    onde: 'A release pede silêncio no repositório.',
    rodadas: [
      fala(
        'Regra',
        'Can I merge this tonight?',
        'Posso fazer merge hoje à noite?',
        'Diga que não entra merge depois das quatro.',
        'No merge after four.',
        [
          'no merge after four',
          'no merges after four',
          'there is no merge after four'
        ],
        'No merge é sem merge. After four é depois das quatro.'
      ),
      fala(
        'Exceção',
        'What if production is down?',
        'E se a produção cair?',
        'Diga que um hotfix ainda pode entrar.',
        'A hotfix can still go in.',
        [
          'a hotfix can still go in',
          'a hot fix can still go in',
          'a hotfix can still go in tonight'
        ],
        'Hotfix é a correção urgente. Can still go in é ainda pode entrar.'
      )
    ]
  },
  {
    id: 'gelquinta',
    titulo: 'Na quinta',
    emoji: '🧊',
    nivel: 'A2',
    onde: 'O time precisa saber antes do gelo.',
    rodadas: [
      fala(
        'Regra',
        'Did everyone hear?',
        'Todo mundo ficou sabendo?',
        'Diga que o gelo começa na quinta.',
        'The freeze starts on Thursday.',
        [
          'the freeze starts on thursday',
          'the code freeze starts on thursday',
          'the freeze starts this thursday'
        ],
        'Freeze é o gelo. Thursday é quinta.'
      ),
      fala(
        'Exceção',
        'How long does it last?',
        'Quanto tempo dura?',
        'Diga que o gelo acaba na sexta de manhã.',
        'The freeze ends Friday morning.',
        [
          'the freeze ends friday morning',
          'the freeze ends on friday morning',
          'the code freeze ends friday morning'
        ],
        'Ends é acaba. Friday morning é sexta de manhã.'
      )
    ]
  },
  {
    id: 'filagelo',
    titulo: 'Fica para sexta',
    emoji: '🧊',
    nivel: 'B2',
    onde: 'Uma mudança importante ficou de fora.',
    rodadas: [
      fala(
        'Regra',
        'Can this wait?',
        'Isso pode esperar?',
        'Diga que essa mudança espera o gelo acabar.',
        'This change waits until the freeze ends.',
        [
          'this change waits until the freeze ends',
          'this change waits until the freeze is over',
          'this change can wait until the freeze ends'
        ],
        'Waits until é espera até. The freeze ends é o gelo acabar.'
      ),
      fala(
        'Exceção',
        'Where do I track it?',
        'Onde eu anoto?',
        'Diga que a mudança fica no ticket de sexta.',
        'The change stays on the Friday ticket.',
        [
          'the change stays on the friday ticket',
          'this change stays on the friday ticket',
          'the change stays in the friday ticket'
        ],
        'Stays on é fica em. Friday ticket é o ticket de sexta.'
      )
    ]
  }
];

export const LIMITES = [
  {
    id: 'cemminuto',
    titulo: 'Cem por minuto',
    emoji: '🚥',
    nivel: 'B1',
    onde: 'Um cliente bate no limite da API.',
    rodadas: [
      fala(
        'Número',
        'How many calls can they make?',
        'Quantas chamadas cabem?',
        'Diga que o limite é cem chamadas por minuto.',
        'The limit is one hundred calls a minute.',
        [
          'the limit is one hundred calls a minute',
          'the limit is 100 calls a minute',
          'the limit is one hundred calls per minute'
        ],
        'One hundred é cem. A minute é por minuto.'
      ),
      fala(
        'Resposta',
        'What should the client do?',
        'O que o cliente faz?',
        'Diga que o cliente espera e tenta de novo.',
        'The client waits and tries again.',
        [
          'the client waits and tries again',
          'the client should wait and try again',
          'the client waits and tries once more'
        ],
        'Waits é espera. Tries again é tenta de novo.'
      )
    ]
  },
  {
    id: 'status429',
    titulo: 'O 429',
    emoji: '🚥',
    nivel: 'B1',
    onde: 'A resposta precisa dizer que é limite, não falha.',
    rodadas: [
      fala(
        'Número',
        'What does the client see?',
        'O que o cliente vê?',
        'Diga que a API responde 429.',
        'The API answers with 429.',
        [
          'the api answers with 429',
          'the api answers with a 429',
          'the api returns 429'
        ],
        '429 é o código de limite. Answers with é responde com.'
      ),
      fala(
        'Resposta',
        'Is the data lost?',
        'O dado se perde?',
        'Diga que nada se perde. É só esperar.',
        'Nothing is lost. It only needs a wait.',
        [
          'nothing is lost it only needs a wait',
          'nothing is lost',
          'it only needs a wait'
        ],
        'Nothing is lost é nada se perde. A wait é uma espera.'
      )
    ]
  },
  {
    id: 'subirlimite',
    titulo: 'Subir o teto',
    emoji: '🚥',
    nivel: 'B2',
    onde: 'O cliente pede um limite maior.',
    rodadas: [
      fala(
        'Número',
        'Can we raise it?',
        'Dá para aumentar?',
        'Diga que pode subir o teto para duzentos.',
        'We can raise the cap to two hundred.',
        [
          'we can raise the cap to two hundred',
          'we can raise the cap to 200',
          'we can raise the limit to two hundred'
        ],
        'Cap é o teto. Two hundred é duzentos.'
      ),
      fala(
        'Resposta',
        'When does it start?',
        'Quando começa?',
        'Diga que o teto novo vale amanhã.',
        'The new cap starts tomorrow.',
        [
          'the new cap starts tomorrow',
          'the new cap starts tomorrow morning',
          'the new limit starts tomorrow'
        ],
        'Starts tomorrow é vale amanhã. The new cap é o teto novo.'
      )
    ]
  }
];

export function bandeiraPorId(id) {
  return BANDEIRAS.find(c => c.id === id) ?? null;
}

export function geloPorId(id) {
  return GELOS.find(c => c.id === id) ?? null;
}

export function limitePorId(id) {
  return LIMITES.find(c => c.id === id) ?? null;
}

export function avaliarBandeira(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGelo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLimite(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
