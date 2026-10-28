// Fala de call: relato de bug, review educado, papo curto e esclarecimento.
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

export const RELATOS = [
  {
    id: 'timeout',
    titulo: 'Login que não acaba',
    emoji: '🐛',
    nivel: 'B1',
    onde: 'Três falas: como repetir, a causa e a correção.',
    rodadas: [
      fala(
        'Reproduzir',
        'Can you walk me through it?',
        'Você consegue me guiar?',
        'Diga como repetir: abra o login e espere.',
        'To reproduce it, open login and wait.',
        [
          'to reproduce it open login and wait',
          'to reproduce it open the login and wait',
          'open login and wait to reproduce it'
        ],
        'To reproduce it abre o passo. Open login and wait é abrir o login e esperar.'
      ),
      fala(
        'Causa',
        'What is the cause?',
        'Qual é a causa?',
        'Diga que o pedido não tem tempo limite.',
        'The cause is a request with no timeout.',
        [
          'the cause is a request with no timeout',
          'the cause is a request without a timeout',
          'it is a request with no timeout'
        ],
        'The cause is apresenta a causa. Timeout é o tempo limite.'
      ),
      fala(
        'Correção',
        'What is the fix?',
        'Qual é a correção?',
        'Diga que a correção é um tempo limite de dez segundos.',
        'The fix is to add a ten second timeout.',
        [
          'the fix is to add a ten second timeout',
          'the fix is to add a timeout of ten seconds',
          'i will add a ten second timeout'
        ],
        'The fix is apresenta a correção. Ten second timeout é um limite de dez segundos.'
      )
    ]
  },
  {
    id: 'lista',
    titulo: 'Lista vazia',
    emoji: '📭',
    nivel: 'B1',
    onde: 'A lista vazia quebra a tela. Conte o bug em três falas.',
    rodadas: [
      fala(
        'Reproduzir',
        'How do I see the bug?',
        'Como eu vejo o bug?',
        'Diga para abrir uma lista vazia.',
        'To reproduce it, open an empty list.',
        [
          'to reproduce it open an empty list',
          'to reproduce it open the empty list',
          'open an empty list to reproduce it'
        ],
        'Open an empty list é o passo para repetir o bug.'
      ),
      fala(
        'Causa',
        'Why does it crash?',
        'Por que quebra?',
        'Diga que falta a checagem de lista vazia.',
        'The cause is a missing empty check.',
        [
          'the cause is a missing empty check',
          'the cause is no empty check',
          'it is a missing empty check'
        ],
        'Missing empty check é a checagem que faltou.'
      ),
      fala(
        'Correção',
        'What should we change?',
        'O que a gente muda?',
        'Diga que a correção é mostrar um aviso de lista vazia.',
        'The fix is to show an empty message.',
        [
          'the fix is to show an empty message',
          'the fix is to show a message when the list is empty',
          'i will show an empty message'
        ],
        'Show an empty message avisa que a lista está vazia, em vez de quebrar.'
      )
    ]
  },
  {
    id: 'busca',
    titulo: 'Busca lenta',
    emoji: '🔎',
    nivel: 'B2',
    onde: 'A busca dispara a cada tecla. Conte o bug em três falas.',
    rodadas: [
      fala(
        'Reproduzir',
        'When does the search get slow?',
        'Quando a busca fica lenta?',
        'Diga para buscar com uma letra só.',
        'To reproduce it, search with one letter.',
        [
          'to reproduce it search with one letter',
          'to reproduce it search with a single letter',
          'search with one letter to reproduce it'
        ],
        'Search with one letter é o passo curto para repetir a lentidão.'
      ),
      fala(
        'Causa',
        'What makes it slow?',
        'O que deixa lento?',
        'Diga que cada tecla dispara uma consulta.',
        'The cause is a query on every key.',
        [
          'the cause is a query on every key',
          'the cause is a query on every keystroke',
          'it is a query on every key'
        ],
        'On every key diz que a consulta sai a cada tecla.'
      ),
      fala(
        'Correção',
        'How would you fix it?',
        'Como você corrigiria?',
        'Diga que a correção é esperar a pessoa parar de digitar.',
        'The fix is to wait until the typing stops.',
        [
          'the fix is to wait until the typing stops',
          'the fix is to wait until typing stops',
          'i will wait until the typing stops'
        ],
        'Wait until the typing stops segura a consulta até a pausa.'
      )
    ]
  }
];

export const CORTESIAS = [
  {
    id: 'nome',
    titulo: 'Nome da variável',
    emoji: '🏷️',
    nivel: 'B1',
    onde: 'Peça a mudança e depois agradeça o comentário.',
    rodadas: [
      fala(
        'Dar',
        'What do you think of this name?',
        'O que você acha deste nome?',
        'Peça, com educação, para renomear a variável.',
        'Could we rename this variable?',
        [
          'could we rename this variable',
          'could we rename the variable',
          'can we rename this variable'
        ],
        'Could we pede uma mudança sem mandar.'
      ),
      fala(
        'Receber',
        'I left a comment on the name.',
        'Deixei um comentário no nome.',
        'Agradeça e diga que vai renomear.',
        'Thanks for the catch. I will rename it.',
        [
          'thanks for the catch i will rename it',
          'thank you for the catch i will rename it',
          'thanks for the catch i will rename the variable'
        ],
        'Thanks for the catch agradece. I will rename it diz o próximo passo.'
      )
    ]
  },
  {
    id: 'vazio',
    titulo: 'Faltou um teste',
    emoji: '🧪',
    nivel: 'B1',
    onde: 'Peça um teste e aceite o comentário.',
    rodadas: [
      fala(
        'Dar',
        'Anything missing in this pull request?',
        'Falta alguma coisa neste pull request?',
        'Peça um teste para o carrinho vazio.',
        'Could we add a test for the empty cart?',
        [
          'could we add a test for the empty cart',
          'could we add a test for an empty cart',
          'can we add a test for the empty cart'
        ],
        'Could we add a test pede cobertura sem acusar a pessoa.'
      ),
      fala(
        'Receber',
        'I think this path needs a test.',
        'Acho que este caminho precisa de um teste.',
        'Concorde e diga que vai adicionar o teste.',
        'Good point. I will add that test.',
        [
          'good point i will add that test',
          'good point i will add the test',
          'thanks i will add that test'
        ],
        'Good point aceita o comentário. I will add that test assume o próximo passo.'
      )
    ]
  },
  {
    id: 'tom',
    titulo: 'Comentário claro',
    emoji: '💬',
    nivel: 'B2',
    onde: 'Diga a dúvida com cuidado e receba o ajuste.',
    rodadas: [
      fala(
        'Dar',
        'How does this name feel to you?',
        'Como este nome soa para você?',
        'Diga que não tem certeza se o nome está claro.',
        'I am not sure this name is clear.',
        [
          'i am not sure this name is clear',
          'i am not sure the name is clear',
          'i am not sure this name is clear enough'
        ],
        'I am not sure... aponta a dúvida sem chamar o código de ruim.'
      ),
      fala(
        'Receber',
        'A reviewer said the name is confusing.',
        'Quem revisou disse que o nome confunde.',
        'Concorde e diga que vai escolher um nome mais claro.',
        'That makes sense. I will pick a clearer name.',
        [
          'that makes sense i will pick a clearer name',
          'that makes sense i will choose a clearer name',
          'good point i will pick a clearer name'
        ],
        'That makes sense concorda. A clearer name é um nome mais claro.'
      )
    ]
  }
];

export const AQUECIMENTOS = [
  {
    id: 'fim',
    titulo: 'Fim de semana',
    emoji: '🌤️',
    nivel: 'A2',
    onde: 'Um papo curto antes de entrar na pauta.',
    rodadas: [
      fala(
        'Papo',
        'How was your weekend?',
        'Como foi o seu fim de semana?',
        'Diga que foi um fim de semana tranquilo.',
        'I had a quiet weekend.',
        [
          'i had a quiet weekend',
          'i had a calm weekend',
          'it was a quiet weekend'
        ],
        'A quiet weekend é um fim de semana tranquilo.'
      ),
      fala(
        'Papo',
        'Nice. Any plans for this one?',
        'Que bom. Tem plano para este?',
        'Pergunte como foi o fim de semana da outra pessoa.',
        'How was yours?',
        [
          'how was yours',
          'how was your weekend',
          'and how was yours'
        ],
        'How was yours devolve a pergunta.'
      )
    ]
  },
  {
    id: 'clima',
    titulo: 'Clima',
    emoji: '🌧️',
    nivel: 'A2',
    onde: 'Fale do tempo aí e pergunte do outro lado.',
    rodadas: [
      fala(
        'Papo',
        'We have a minute. How is your day starting?',
        'Temos um minuto. Como o seu dia começa?',
        'Diga que aí está chovendo hoje.',
        'It is rainy here today.',
        [
          'it is rainy here today',
          'it is raining here today',
          'it is rainy today'
        ],
        'Rainy here today fala do tempo sem alongar.'
      ),
      fala(
        'Papo',
        'Same time next week, then. Anything else first?',
        'Mesmo horário semana que vem. Algo antes?',
        'Pergunte como está o tempo aí.',
        'How is the weather there?',
        [
          'how is the weather there',
          'how is the weather over there',
          'what is the weather there'
        ],
        'How is the weather there puxa o outro lado da call.'
      )
    ]
  },
  {
    id: 'viagem',
    titulo: 'Viagem curta',
    emoji: '✈️',
    nivel: 'B1',
    onde: 'Você voltou de uma viagem e ainda entra na reunião.',
    rodadas: [
      fala(
        'Papo',
        'Good to see you. Were you away?',
        'Que bom te ver. Você estava fora?',
        'Diga que voltou de uma viagem curta.',
        'I got back from a short trip.',
        [
          'i got back from a short trip',
          'i just got back from a short trip',
          'i got back from a short trip yesterday'
        ],
        'Got back from é voltou de. A short trip é uma viagem curta.'
      ),
      fala(
        'Papo',
        'Welcome back. Are you ready to start?',
        'Bem-vindo de volta. Pronto para começar?',
        'Diga que está um pouco cansado, mas pronto.',
        'I am a bit tired, but ready.',
        [
          'i am a bit tired but ready',
          'i am a little tired but ready',
          'i am a bit tired but i am ready'
        ],
        'A bit tired, but ready admite o cansaço e segue a reunião.'
      )
    ]
  }
];

export const CLAROS = [
  {
    id: 'rephrase',
    nivel: 'B1',
    emoji: '🔁',
    titulo: 'De outro jeito',
    pt: 'Peça para a pessoa dizer de outro jeito.',
    uso: 'Rephrase pede a mesma ideia com outras palavras.',
    melhor: 'Could you rephrase that?',
    aceitas: ['could you rephrase that', 'can you rephrase that', 'could you rephrase that please'],
    dica: 'Could you rephrase that pede outra forma, sem dizer que a pessoa falou mal.'
  },
  {
    id: 'dizer',
    nivel: 'B1',
    emoji: '🪞',
    titulo: 'O que você quis dizer',
    pt: 'Confirme: a pessoa disse que o login falha.',
    uso: 'So what you are saying is... devolve a ideia com as suas palavras.',
    melhor: "So what you're saying is the login fails.",
    aceitas: [
      'so what you are saying is the login fails',
      'so you are saying the login fails',
      'so what you are saying is that the login fails'
    ],
    dica: 'So what you are saying is confirma o sentido antes de seguir.'
  },
  {
    id: 'devagar',
    nivel: 'A2',
    emoji: '🐢',
    titulo: 'Mais devagar',
    pt: 'Peça para falar mais devagar.',
    uso: 'More slowly pede o ritmo, não uma explicação nova.',
    melhor: 'Could you say that more slowly?',
    aceitas: ['could you say that more slowly', 'can you say that more slowly', 'could you speak more slowly'],
    dica: 'More slowly é mais devagar. Say that aponta a frase que acabou de sair.'
  },
  {
    id: 'sentido',
    nivel: 'B1',
    emoji: '❓',
    titulo: 'O que significa',
    pt: 'Pergunte o que a pessoa quer dizer com timeout.',
    uso: 'What do you mean by... pede o sentido de uma palavra.',
    melhor: 'What do you mean by timeout?',
    aceitas: ['what do you mean by timeout', 'what does timeout mean', 'what do you mean by a timeout'],
    dica: 'What do you mean by pede o sentido de uma palavra da call.'
  },
  {
    id: 'conferir',
    nivel: 'B1',
    emoji: '✅',
    titulo: 'Deixa eu conferir',
    pt: 'Diga que vai conferir se entendeu.',
    uso: 'Let me check I understood avisa que você vai repetir a ideia.',
    melhor: 'Let me check I understood.',
    aceitas: ['let me check i understood', 'let me check that i understood', 'let me check i understood you'],
    dica: 'Let me check I understood ganha um segundo antes de parafrasear.'
  },
  {
    id: 'denovo',
    nivel: 'A2',
    emoji: '🔂',
    titulo: 'Outra vez',
    pt: 'Peça para repetir.',
    uso: 'Say that again pede a mesma frase, não uma nova.',
    melhor: 'Could you say that again?',
    aceitas: ['could you say that again', 'can you say that again', 'could you repeat that'],
    dica: 'Say that again pede a repetição da última frase.'
  },
  {
    id: 'certo',
    nivel: 'B1',
    emoji: '🤞',
    titulo: 'Entendi certo?',
    pt: 'Pergunte se você entendeu certo.',
    uso: 'Did I get that right fecha a paráfrase com uma checagem.',
    melhor: 'Did I get that right?',
    aceitas: ['did i get that right', 'did i understand that right', 'did i get that correctly'],
    dica: 'Did I get that right pergunta se a sua versão bateu.'
  },
  {
    id: 'soletrar',
    nivel: 'A2',
    emoji: '🔤',
    titulo: 'Soletrar',
    pt: 'Peça para soletrar o nome.',
    uso: 'Spell that name serve para nome de pessoa, time ou serviço.',
    melhor: 'Could you spell that name?',
    aceitas: ['could you spell that name', 'can you spell that name', 'could you spell the name'],
    dica: 'Spell that name pede as letras, útil quando o áudio corta.'
  }
];

export function relatoPorId(id) {
  return RELATOS.find(item => item.id === id) || null;
}

export function cortesiaPorId(id) {
  return CORTESIAS.find(item => item.id === id) || null;
}

export function aquecerPorId(id) {
  return AQUECIMENTOS.find(item => item.id === id) || null;
}

export function claroPorId(id) {
  return CLAROS.find(item => item.id === id) || null;
}

export function avaliarRelato(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCortesia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAquecer(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarClaro(item, texto) {
  return avaliarResposta(item, texto);
}
