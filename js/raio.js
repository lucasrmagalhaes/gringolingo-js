// Desculpa sem culpar alguém, palestra de cinco minutos e a oferta final.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CULPAS = [
  {
    id: 'minha',
    titulo: 'O erro meu',
    emoji: '🙏',
    nivel: 'B1',
    onde: 'O bug saiu no seu pull request.',
    rodadas: [
      fala(
        'Erro',
        'Whose change broke the page?',
        'A mudança de quem quebrou a página?',
        'Diga que o erro foi seu.',
        'That mistake was mine.',
        [
          'that mistake was mine',
          'the mistake was mine',
          'that error was mine'
        ],
        'Mistake é o erro. Mine é meu, sem apontar outra pessoa.'
      ),
      fala(
        'Plano',
        'What happens next?',
        'O que acontece agora?',
        'Diga que manda a correção antes do almoço.',
        'I will send the fix before lunch.',
        [
          'i will send the fix before lunch',
          'i will send the fix before noon',
          'i will ship the fix before lunch'
        ],
        'The fix é a correção. Before lunch é antes do almoço.'
      )
    ]
  },
  {
    id: 'reversao',
    titulo: 'A reversão',
    emoji: '🙏',
    nivel: 'B2',
    onde: 'Entrou a mudança errada na main.',
    rodadas: [
      fala(
        'Erro',
        'What landed on main?',
        'O que entrou na main?',
        'Diga que você mergeou a mudança errada.',
        'I merged the wrong change.',
        [
          'i merged the wrong change',
          'i merged the wrong commit',
          'i merged a wrong change'
        ],
        'Merged é entrou na main. The wrong change é a mudança errada.'
      ),
      fala(
        'Plano',
        'How do you close it?',
        'Como você fecha isso?',
        'Diga que reverte e avisa o canal.',
        'I will revert it and tell the channel.',
        [
          'i will revert it and tell the channel',
          'i will revert it and post in the channel',
          'i will undo it and tell the channel'
        ],
        'Revert é desfazer o merge. Channel é o canal do time.'
      )
    ]
  },
  {
    id: 'passo',
    titulo: 'O passo antigo',
    emoji: '🙏',
    nivel: 'A2',
    onde: 'O documento ainda ensina o caminho velho.',
    rodadas: [
      fala(
        'Erro',
        'What is wrong in the doc?',
        'O que está errado no documento?',
        'Diga que deixou o passo antigo no documento.',
        'I left the old step in the doc.',
        [
          'i left the old step in the doc',
          'i left the old step in the document',
          'i left an old step in the doc'
        ],
        'Old step é o passo antigo. Doc é o documento.'
      ),
      fala(
        'Plano',
        'When will the doc be right?',
        'Quando o documento fica certo?',
        'Diga que atualiza o documento hoje.',
        'I will update the doc today.',
        [
          'i will update the doc today',
          'i will update the document today',
          'i will fix the doc today'
        ],
        'Update é atualizar. Today é hoje.'
      )
    ]
  }
];

export const RAIOS = [
  {
    id: 'onibus',
    titulo: 'Cinco minutos',
    emoji: '🔦',
    nivel: 'B1',
    onde: 'A fila do relâmpago chamou o seu nome.',
    rodadas: [
      fala(
        'Tempo',
        'How long is your talk?',
        'Quanto tempo dura a sua fala?',
        'Diga que a palestra tem cinco minutos.',
        'This talk is five minutes.',
        [
          'this talk is five minutes',
          'this talk is 5 minutes',
          'my talk is five minutes'
        ],
        'Five minutes são cinco minutos. Talk é a palestra curta.'
      ),
      fala(
        'Projeto',
        'What did you build?',
        'O que você construiu?',
        'Diga que fez um aplicativo pequeno para a sua linha de ônibus.',
        'I built a small app for my bus line.',
        [
          'i built a small app for my bus line',
          'i built a small app for the bus line',
          'i made a small app for my bus line'
        ],
        'A small app é um aplicativo pequeno. Bus line é a linha de ônibus.'
      )
    ]
  },
  {
    id: 'parada',
    titulo: 'O próximo ônibus',
    emoji: '🔦',
    nivel: 'A2',
    onde: 'Você mostra uma tela só.',
    rodadas: [
      fala(
        'Tempo',
        'What does the app show?',
        'O que o aplicativo mostra?',
        'Diga que o aplicativo mostra o próximo ônibus.',
        'The app shows the next bus.',
        [
          'the app shows the next bus',
          'my app shows the next bus',
          'the app shows the next bus stop'
        ],
        'The next bus é o próximo ônibus.'
      ),
      fala(
        'Projeto',
        'How long is this part?',
        'Quanto tempo esta parte leva?',
        'Diga que esta parte fica em menos de um minuto.',
        'This part stays under one minute.',
        [
          'this part stays under one minute',
          'this part stays under 1 minute',
          'this part is under one minute'
        ],
        'Under one minute é menos de um minuto.'
      )
    ]
  },
  {
    id: 'repositorio',
    titulo: 'O código',
    emoji: '🔦',
    nivel: 'B2',
    onde: 'O tempo acabou.',
    rodadas: [
      fala(
        'Tempo',
        'Are you done?',
        'Você terminou?',
        'Diga que aqueles foram os seus cinco minutos.',
        'That was my five minutes.',
        [
          'that was my five minutes',
          'that was my 5 minutes',
          'those were my five minutes'
        ],
        'That was marca o fim. Five minutes são os cinco minutos.'
      ),
      fala(
        'Projeto',
        'Where can we read the code?',
        'Onde a gente lê o código?',
        'Diga que o código está no seu GitHub.',
        'The code sits on my GitHub.',
        [
          'the code sits on my github',
          'the code is on my github',
          'my code sits on github'
        ],
        'Sits on é fica em. GitHub é o lugar do código.'
      )
    ]
  }
];

export const OFERTAS = [
  {
    id: 'notebook',
    titulo: 'O notebook',
    emoji: '💻',
    nivel: 'B1',
    onde: 'A carta oferta chegou. O salário já foi falado.',
    rodadas: [
      fala(
        'Peça',
        'What equipment do you need?',
        'De que equipamento você precisa?',
        'Diga que a empresa pode enviar um notebook.',
        'Could the company send a laptop?',
        [
          'could the company send a laptop',
          'can the company send a laptop',
          'could the company send me a laptop'
        ],
        'Laptop é o notebook. Send é enviar.'
      ),
      fala(
        'Data',
        'Anything else for the desk?',
        'Mais alguma coisa para a mesa?',
        'Diga que uma segunda tela ajuda em casa.',
        'A second screen would help at home.',
        [
          'a second screen would help at home',
          'a second monitor would help at home',
          'a 2nd screen would help at home'
        ],
        'A second screen é uma segunda tela. At home é em casa.'
      )
    ]
  },
  {
    id: 'estudo',
    titulo: 'A verba',
    emoji: '💻',
    nivel: 'B2',
    onde: 'Você quer estudar sem tirar do salário.',
    rodadas: [
      fala(
        'Peça',
        'Do you want to ask about learning?',
        'Você quer perguntar do estudo?',
        'Diga que pergunta se existe uma verba anual de estudo.',
        'Is there a yearly learning budget?',
        [
          'is there a yearly learning budget',
          'is there an annual learning budget',
          'do you have a yearly learning budget'
        ],
        'Yearly é anual. Learning budget é a verba de estudo.'
      ),
      fala(
        'Data',
        'How would you use it?',
        'Como você usaria isso?',
        'Diga que usaria em um congresso.',
        'I would use it for one conference.',
        [
          'i would use it for one conference',
          'i would use it for a conference',
          'i would use it for 1 conference'
        ],
        'Conference é o congresso. One é um.'
      )
    ]
  },
  {
    id: 'passagem',
    titulo: 'A passagem',
    emoji: '💻',
    nivel: 'B1',
    onde: 'Falta combinar o dia em que você entra.',
    rodadas: [
      fala(
        'Peça',
        'When can you join us?',
        'Quando você pode entrar?',
        'Diga que pode começar na segunda segunda-feira.',
        'I can start on the second Monday.',
        [
          'i can start on the second monday',
          'i can start on the 2nd monday',
          'i could start on the second monday'
        ],
        'The second Monday é a segunda segunda-feira do mês.'
      ),
      fala(
        'Data',
        'Why not sooner?',
        'Por que não antes?',
        'Diga que a primeira semana é para a passagem do trabalho atual.',
        'The first week is for the handover.',
        [
          'the first week is for the handover',
          'the first week is for handover',
          'my first week is for the handover'
        ],
        'Handover é a passagem do trabalho. The first week é a primeira semana.'
      )
    ]
  }
];

export function culpaPorId(id) {
  return CULPAS.find(c => c.id === id) ?? null;
}

export function raioPorId(id) {
  return RAIOS.find(c => c.id === id) ?? null;
}

export function ofertaPorId(id) {
  return OFERTAS.find(c => c.id === id) ?? null;
}

export function avaliarCulpa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRaio(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarOferta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
