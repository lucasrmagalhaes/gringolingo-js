// Palestra, pergunta sem resposta e chamada com sinal ruim.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PALESTRAS = [
  {
    id: 'abertura',
    titulo: 'A abertura',
    emoji: '🎤',
    nivel: 'B1',
    onde: 'A sala do meetup acabou de sentar.',
    rodadas: [
      fala(
        'Abertura',
        'The room is quiet. How do you start?',
        'A sala está quieta. Como você começa?',
        'Cumprimente e agradeça a presença.',
        'Hi everyone. Thanks for coming.',
        [
          'hi everyone thanks for coming',
          'hello everyone thanks for coming',
          'hi everyone thank you for coming'
        ],
        'Hi everyone abre a sala. Thanks for coming agradece.'
      ),
      fala(
        'Tema',
        'What is this talk about?',
        'Sobre o que é esta palestra?',
        'Diga que hoje você mostra como a página ficou mais rápida.',
        'Today I will show how we made the page faster.',
        [
          'today i will show how we made the page faster',
          'today i will show how the page got faster',
          'today i am going to show how we made the page faster'
        ],
        'Today I will show promete o tema. Faster é mais rápida.'
      )
    ]
  },
  {
    id: 'slide',
    titulo: 'O próximo slide',
    emoji: '🎤',
    nivel: 'B1',
    onde: 'O gráfico ainda não está na tela.',
    rodadas: [
      fala(
        'Troca',
        'The chart is on the next slide. What do you say?',
        'O gráfico está no próximo slide. O que você diz?',
        'Avise que vai para o próximo slide.',
        'Let me go to the next slide.',
        [
          'let me go to the next slide',
          'let us go to the next slide',
          'i will go to the next slide'
        ],
        'Next slide é o próximo slide. Let me go avisa a troca.'
      ),
      fala(
        'Leitura',
        'What should the room look at?',
        'Para onde a sala deve olhar?',
        'Diga que este gráfico mostra a taxa de erro.',
        'This chart shows the error rate.',
        [
          'this chart shows the error rate',
          'this chart shows our error rate',
          'the chart shows the error rate'
        ],
        'Chart é gráfico. Error rate é a taxa de erro.'
      )
    ]
  },
  {
    id: 'plateia',
    titulo: 'As perguntas',
    emoji: '🎤',
    nivel: 'B1',
    onde: 'Os slides acabaram.',
    rodadas: [
      fala(
        'Fecho',
        'How do you close the talk?',
        'Como você fecha a palestra?',
        'Diga que a palestra acabou.',
        'That is the end of the talk.',
        [
          'that is the end of the talk',
          'this is the end of the talk',
          'that is the end of my talk'
        ],
        'The end of the talk é o fim da palestra.'
      ),
      fala(
        'Convite',
        'People want to ask something. What do you say?',
        'As pessoas querem perguntar. O que você diz?',
        'Diga que aceita duas perguntas.',
        'I will take two questions.',
        [
          'i will take two questions',
          'i will take a couple of questions',
          'i can take two questions'
        ],
        'Take questions é abrir para perguntas. Two é duas.'
      )
    ]
  }
];

export const DUVIDAS = [
  {
    id: 'gancho',
    titulo: 'Boa pergunta',
    emoji: '🙋',
    nivel: 'B1',
    onde: 'Alguém pergunta um detalhe que você não tem.',
    rodadas: [
      fala(
        'Gancho',
        'They ask for a number you do not have. What do you say first?',
        'Pedem um número que você não tem. O que você diz primeiro?',
        'Diga que é uma boa pergunta e que você volta com a resposta.',
        'Good question. Let me get back to you.',
        [
          'good question let me get back to you',
          'that is a good question let me get back to you',
          'good question i will get back to you'
        ],
        'Good question ganha um segundo. Get back to you é voltar com a resposta.'
      ),
      fala(
        'Prazo',
        'When will they hear the answer?',
        'Quando a pessoa recebe a resposta?',
        'Diga que manda a resposta hoje.',
        'I will send the answer today.',
        [
          'i will send the answer today',
          'i will send you the answer today',
          'i will send the number today'
        ],
        'Today é hoje. Send é mandar.'
      )
    ]
  },
  {
    id: 'cifra',
    titulo: 'O número',
    emoji: '🙋',
    nivel: 'B1',
    onde: 'A planilha não está nesta tela.',
    rodadas: [
      fala(
        'Gancho',
        'Where is the exact figure?',
        'Onde está o número exato?',
        'Diga que não tem esse número aqui.',
        'I do not have that number here.',
        [
          'i do not have that number here',
          'i do not have the number here',
          'i do not have that figure here'
        ],
        'I do not have admite a falta. Here é aqui.'
      ),
      fala(
        'Prazo',
        'What happens after the call?',
        'O que acontece depois da call?',
        'Diga que confere e responde depois desta call.',
        'I will check and reply after this call.',
        [
          'i will check and reply after this call',
          'i will check and answer after this call',
          'i will look it up and reply after this call'
        ],
        'Check é conferir. Reply é responder.'
      )
    ]
  },
  {
    id: 'equipe',
    titulo: 'O time',
    emoji: '🙋',
    nivel: 'B2',
    onde: 'A decisão não é só sua.',
    rodadas: [
      fala(
        'Gancho',
        'They want a yes or no right now. What do you say?',
        'Querem um sim ou não agora. O que você diz?',
        'Diga que quer confirmar com o time.',
        'I want to confirm that with the team.',
        [
          'i want to confirm that with the team',
          'i need to confirm that with the team',
          'i want to check that with the team'
        ],
        'Confirm é confirmar. Team é o time.'
      ),
      fala(
        'Prazo',
        'When do you follow up?',
        'Quando você retoma?',
        'Diga que retoma amanhã de manhã.',
        'I will follow up tomorrow morning.',
        [
          'i will follow up tomorrow morning',
          'i will follow up in the morning',
          'i will get back to you tomorrow morning'
        ],
        'Follow up é retomar. Tomorrow morning é amanhã de manhã.'
      )
    ]
  }
];

export const SINAIS = [
  {
    id: 'ruido',
    titulo: 'A voz corta',
    emoji: '📶',
    nivel: 'A2',
    onde: 'A chamada de vídeo picota.',
    rodadas: [
      fala(
        'Aviso',
        'The audio jumps. What do you say?',
        'O áudio pula. O que você diz?',
        'Diga que a voz da outra pessoa está cortando.',
        'You are breaking up.',
        [
          'you are breaking up',
          'you are breaking up a bit',
          'you are breaking up right now'
        ],
        'Breaking up é a voz que corta. You are fala da outra pessoa.'
      ),
      fala(
        'Pedido',
        'You fixed your side. How do you check?',
        'Você ajeitou o seu lado. Como você confere?',
        'Pergunte se a pessoa escuta agora.',
        'Can you hear me now?',
        [
          'can you hear me now',
          'can you hear me',
          'do you hear me now'
        ],
        'Hear me é me escutar. Now é agora.'
      )
    ]
  },
  {
    id: 'mudo',
    titulo: 'O vídeo',
    emoji: '📶',
    nivel: 'A2',
    onde: 'Sua imagem parou.',
    rodadas: [
      fala(
        'Aviso',
        'Your face is frozen on their screen. What do you say?',
        'Seu rosto travou na tela deles. O que você diz?',
        'Diga que o vídeo acabou de travar.',
        'My video just froze.',
        [
          'my video just froze',
          'my video froze',
          'the video just froze'
        ],
        'Froze é travou. Video é a imagem da chamada.'
      ),
      fala(
        'Pedido',
        'The picture will not come back. What do you do?',
        'A imagem não volta. O que você faz?',
        'Diga que vai desligar a câmera.',
        'I will turn my camera off.',
        [
          'i will turn my camera off',
          'i will turn the camera off',
          'i am going to turn my camera off'
        ],
        'Turn off é desligar. Camera é a câmera.'
      )
    ]
  },
  {
    id: 'ligar',
    titulo: 'A chamada caiu',
    emoji: '📶',
    nivel: 'A2',
    onde: 'A sala de vídeo fechou sozinha.',
    rodadas: [
      fala(
        'Aviso',
        'The meeting ended by itself. What do you say in the chat?',
        'A reunião fechou sozinha. O que você escreve no chat?',
        'Diga que a chamada caiu.',
        'The call dropped.',
        [
          'the call dropped',
          'the call just dropped',
          'our call dropped'
        ],
        'Dropped é caiu. Call é a chamada.'
      ),
      fala(
        'Pedido',
        'How do you continue?',
        'Como você continua?',
        'Diga que liga de volta pelo telefone.',
        'I will call you back on the phone.',
        [
          'i will call you back on the phone',
          'i will call you back by phone',
          'i will phone you back'
        ],
        'Call you back é ligar de volta. On the phone é pelo telefone.'
      )
    ]
  }
];

export function palestraPorId(id) {
  return PALESTRAS.find(c => c.id === id) ?? null;
}

export function duvidaPorId(id) {
  return DUVIDAS.find(c => c.id === id) ?? null;
}

export function sinalPorId(id) {
  return SINAIS.find(c => c.id === id) ?? null;
}

export function avaliarPalestra(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDuvida(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSinal(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
