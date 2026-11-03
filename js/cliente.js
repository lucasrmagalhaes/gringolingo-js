// Demo da sprint, decisão de segurança e papo de meetup.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SPRINTS = [
  {
    id: 'quadro',
    titulo: 'O que saiu',
    emoji: '🖥️',
    nivel: 'B1',
    onde: 'O cliente quer ver o que saiu nesta sprint.',
    rodadas: [
      fala(
        'Entrega',
        'What did the team ship?',
        'O que o time entregou?',
        'Diga que nesta sprint vocês entregaram a exportação.',
        'This sprint we shipped the export.',
        [
          'this sprint we shipped the export',
          'this sprint we shipped an export',
          'we shipped the export this sprint'
        ],
        'This sprint é esta sprint. Shipped é entregamos.'
      ),
      fala(
        'Surpresa',
        'How many people used it?',
        'Quantas pessoas usaram?',
        'Diga que ainda não tem o número e que manda depois da call.',
        'I do not have that number yet. I will send it after this call.',
        [
          'i do not have that number yet i will send it after this call',
          'i do not have the number yet i will send it after this call',
          'i do not have that number yet i will send it after the call'
        ],
        'I do not have that number yet admite a pergunta fora do roteiro.'
      )
    ]
  },
  {
    id: 'piloto',
    titulo: 'Três times',
    emoji: '🖥️',
    nivel: 'B1',
    onde: 'O cliente pergunta quem já está na tela nova.',
    rodadas: [
      fala(
        'Entrega',
        'Who is on the new screen?',
        'Quem está na tela nova?',
        'Diga que três times estão na tela nova.',
        'Three teams are on the new screen.',
        [
          'three teams are on the new screen',
          '3 teams are on the new screen',
          'three teams are using the new screen'
        ],
        'Three teams são três times. The new screen é a tela nova.'
      ),
      fala(
        'Surpresa',
        'What about the old screen?',
        'E a tela antiga?',
        'Diga que a tela antiga continua até sexta.',
        'The old screen stays up until Friday.',
        [
          'the old screen stays up until friday',
          'the old screen stays until friday',
          'the old screen stays up until this friday'
        ],
        'Stays up é continua no ar. Friday é sexta.'
      )
    ]
  },
  {
    id: 'inesperada',
    titulo: 'Fora do roteiro',
    emoji: '🖥️',
    nivel: 'B2',
    onde: 'O cliente pergunta o preço no meio da demo.',
    rodadas: [
      fala(
        'Entrega',
        'What is ready to show?',
        'O que está pronto para mostrar?',
        'Diga que vocês terminaram o fluxo de convite nesta sprint.',
        'We finished the invite flow this sprint.',
        [
          'we finished the invite flow this sprint',
          'we finished the invite flow in this sprint',
          'we completed the invite flow this sprint'
        ],
        'Invite flow é o fluxo de convite. Finished é terminamos.'
      ),
      fala(
        'Surpresa',
        'Can you tell me the price?',
        'Você me diz o preço?',
        'Diga que não estava pronto para essa pergunta e que responde por escrito hoje.',
        'I was not ready for that question. I will write back today.',
        [
          'i was not ready for that question i will write back today',
          'i was not ready for this question i will write back today',
          'i was not ready for that question i will write back later today'
        ],
        'Not ready admite a surpresa. Write back é responder por escrito.'
      )
    ]
  }
];

export const SEGUROS = [
  {
    id: 'vazamento',
    titulo: 'O token no log',
    emoji: '🔐',
    nivel: 'B1',
    onde: 'Um token apareceu no log. Explique a decisão.',
    rodadas: [
      fala(
        'Risco',
        'What went wrong?',
        'O que deu errado?',
        'Diga que o token foi escrito no log.',
        'The token was written to the log.',
        [
          'the token was written to the log',
          'a token was written to the log',
          'the token was written in the log'
        ],
        'Token é a chave. The log é o registro.'
      ),
      fala(
        'Plano',
        'What will you do?',
        'O que você vai fazer?',
        'Diga que vai trocar o token e apagar esse log.',
        'I will rotate the token and delete that log.',
        [
          'i will rotate the token and delete that log',
          'i will rotate the token and delete the log',
          'i will rotate this token and delete that log'
        ],
        'Rotate é trocar. Delete é apagar.'
      )
    ]
  },
  {
    id: 'janela',
    titulo: 'Antes da entrega',
    emoji: '🔐',
    nivel: 'B2',
    onde: 'O conserto precisa sair antes da release.',
    rodadas: [
      fala(
        'Risco',
        'When does the fix ship?',
        'Quando o conserto sai?',
        'Diga que vai soltar o conserto antes da release.',
        'I will ship the fix before the release.',
        [
          'i will ship the fix before the release',
          'i will ship the fix before we release',
          'i will ship this fix before the release'
        ],
        'The fix é o conserto. Before the release é antes da entrega.'
      ),
      fala(
        'Plano',
        'What do people use until then?',
        'O que as pessoas usam até lá?',
        'Diga que as pessoas ficam na versão atual até o conserto estar no ar.',
        'People keep the current build until the fix is live.',
        [
          'people keep the current build until the fix is live',
          'people stay on the current build until the fix is live',
          'people keep the current build until the fix is out'
        ],
        'Current build é a versão atual. Live é no ar.'
      )
    ]
  },
  {
    id: 'lgpd',
    titulo: 'O e-mail',
    emoji: '🔐',
    nivel: 'B1',
    onde: 'Alguém pergunta por quanto tempo o e-mail fica guardado.',
    rodadas: [
      fala(
        'Risco',
        'How long do you keep the email?',
        'Por quanto tempo vocês guardam o e-mail?',
        'Diga que vocês guardam o e-mail só enquanto a conta está aberta.',
        'We keep the email only while the account is open.',
        [
          'we keep the email only while the account is open',
          'we keep the email only while the account exists',
          'we store the email only while the account is open'
        ],
        'Only while é só enquanto. The account é a conta.'
      ),
      fala(
        'Plano',
        'Can a person remove it?',
        'A pessoa pode tirar isso?',
        'Diga que a pessoa pode pedir para apagar o e-mail.',
        'The person can ask us to delete the email.',
        [
          'the person can ask us to delete the email',
          'a person can ask us to delete the email',
          'the person can ask us to delete their email'
        ],
        'Ask us to delete é pedir para apagar. Vale para LGPD e GDPR.'
      )
    ]
  }
];

export const MEETUPS = [
  {
    id: 'cracha',
    titulo: 'O crachá',
    emoji: '🎫',
    nivel: 'A2',
    onde: 'Alguém lê o seu crachá no meetup.',
    rodadas: [
      fala(
        'Oi',
        'What do you work on?',
        'No que você trabalha?',
        'Diga que constrói o app web num time pequeno.',
        'I build the web app on a small team.',
        [
          'i build the web app on a small team',
          'i build a web app on a small team',
          'i work on the web app on a small team'
        ],
        'Web app é o aplicativo. A small team é um time pequeno.'
      ),
      fala(
        'Assunto',
        'Why did you come tonight?',
        'Por que você veio hoje?',
        'Diga que veio ouvir a palestra sobre testes.',
        'I came to hear the talk on testing.',
        [
          'i came to hear the talk on testing',
          'i came to hear the talk about testing',
          'i came to hear a talk on testing'
        ],
        'Talk é a palestra. Testing é testes.'
      )
    ]
  },
  {
    id: 'contato',
    titulo: 'Depois da palestra',
    emoji: '🎫',
    nivel: 'B1',
    onde: 'Você quer continuar a conversa sem segurar a pessoa.',
    rodadas: [
      fala(
        'Oi',
        'Can we stay in touch?',
        'A gente se fala depois?',
        'Peça para mandar um recado depois desta palestra.',
        'May I send you a note after this talk?',
        [
          'may i send you a note after this talk',
          'may i send you a note after the talk',
          'can i send you a note after this talk'
        ],
        'May I pede licença. A note é um recado.'
      ),
      fala(
        'Assunto',
        'When will you write?',
        'Quando você escreve?',
        'Diga que escreve amanhã com o link.',
        'I will write tomorrow with the link.',
        [
          'i will write tomorrow with the link',
          'i will write tomorrow with a link',
          'i will email tomorrow with the link'
        ],
        'Tomorrow é amanhã. The link é o link.'
      )
    ]
  },
  {
    id: 'intervalo',
    titulo: 'A fila do café',
    emoji: '🎫',
    nivel: 'A2',
    onde: 'A fila do café do evento está longa.',
    rodadas: [
      fala(
        'Oi',
        'This coffee line is long.',
        'Essa fila do café está longa.',
        'Diga que espera junto.',
        'I will wait with you.',
        [
          'i will wait with you',
          'i can wait with you',
          'i will wait here with you'
        ],
        'Wait with you é esperar junto.'
      ),
      fala(
        'Assunto',
        'Which talk is next for you?',
        'Qual palestra você fica para ver?',
        'Diga que vai ficar para a palestra de banco de dados.',
        'I am staying for the database talk.',
        [
          'i am staying for the database talk',
          'i am staying for the talk on databases',
          'i will stay for the database talk'
        ],
        'Staying for é ficar para ver. Database talk é a palestra de banco.'
      )
    ]
  }
];

export function sprintPorId(id) {
  return SPRINTS.find(c => c.id === id) ?? null;
}

export function seguroPorId(id) {
  return SEGUROS.find(c => c.id === id) ?? null;
}

export function meetupPorId(id) {
  return MEETUPS.find(c => c.id === id) ?? null;
}

export function avaliarSprint(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSeguro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMeetup(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
