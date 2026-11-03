// Linha a linha, recado de Slack, papo social e o som de termos técnicos.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const LINHAS = [
  {
    id: 'laco',
    titulo: 'O loop',
    emoji: '💻',
    nivel: 'B1',
    onde: 'Um for que percorre a lista.',
    rodadas: [
      fala(
        'Linha',
        'What does this for do?',
        'O que este for faz?',
        'Diga que este loop percorre a lista.',
        'This loop walks the list.',
        [
          'this loop walks the list',
          'this loop goes through the list',
          'the loop walks the list'
        ],
        'Loop é o laço. Walks the list é percorre a lista.'
      ),
      fala(
        'Nome',
        'And the function at the end?',
        'E a função no fim?',
        'Diga que o callback roda quando o loop termina.',
        'This callback runs when the loop ends.',
        [
          'this callback runs when the loop ends',
          'the callback runs when the loop ends',
          'this callback runs after the loop ends'
        ],
        'Callback é a função que você entrega. Runs when é roda quando.'
      )
    ]
  },
  {
    id: 'retorno',
    titulo: 'O callback',
    emoji: '💻',
    nivel: 'B1',
    onde: 'Uma função passada para outra.',
    rodadas: [
      fala(
        'Linha',
        'Why do you pass this function?',
        'Por que você passa esta função?',
        'Diga que callback é uma função que você passa.',
        'A callback is a function you pass in.',
        [
          'a callback is a function you pass in',
          'a callback is a function you pass',
          'callback is a function you pass in'
        ],
        'Pass in é passar para dentro. A function é a função.'
      ),
      fala(
        'Nome',
        'When does it run?',
        'Quando ela roda?',
        'Diga que ela roda quando o arquivo carrega.',
        'It runs when the file loads.',
        [
          'it runs when the file loads',
          'it runs when the file is loaded',
          'this runs when the file loads'
        ],
        'Loads é carrega. When marca o momento.'
      )
    ]
  },
  {
    id: 'nulo',
    titulo: 'O null check',
    emoji: '💻',
    nivel: 'B2',
    onde: 'Um if que segura o null, e a lista vazia.',
    rodadas: [
      fala(
        'Linha',
        'Why this if?',
        'Por que este if?',
        'Diga que este null check evita uma quebra.',
        'This null check stops a crash.',
        [
          'this null check stops a crash',
          'the null check stops a crash',
          'this null check prevents a crash'
        ],
        'Null check é a checagem de nulo. Crash é a quebra.'
      ),
      fala(
        'Nome',
        'What about an empty list?',
        'E uma lista vazia?',
        'Diga que uma lista vazia é um edge case.',
        'An empty list is an edge case.',
        [
          'an empty list is an edge case',
          'the empty list is an edge case',
          'empty list is an edge case'
        ],
        'Edge case é o caso na borda. Empty list é lista vazia.'
      )
    ]
  }
];

export const SLACKS = [
  {
    id: 'olhar',
    titulo: 'Pedir review',
    emoji: '💬',
    nivel: 'B1',
    onde: 'Um recado curto no canal. Sem pressa.',
    rodadas: [
      fala(
        'Pedido',
        'The channel is quiet. What do you post?',
        'O canal está quieto. O que você posta?',
        'Peça a review deste PR, em uma frase curta.',
        'Could you review this PR?',
        [
          'could you review this pr',
          'can you review this pr',
          'could you review this pull request'
        ],
        'Could you pede sem cobrar. PR é o pull request.'
      ),
      fala(
        'Detalhe',
        'Anything else in the same message?',
        'Mais alguma coisa na mesma mensagem?',
        'Diga que não tem pressa e os testes passaram.',
        'No rush. The tests passed.',
        [
          'no rush the tests passed',
          'no rush tests passed',
          'no hurry the tests passed'
        ],
        'No rush tira a pressa. The tests passed é os testes passaram.'
      )
    ]
  },
  {
    id: 'demora',
    titulo: 'Avisar atraso',
    emoji: '💬',
    nivel: 'B1',
    onde: 'A correção não sai hoje.',
    rodadas: [
      fala(
        'Pedido',
        'The channel is waiting. What do you post?',
        'O canal está esperando. O que você posta?',
        'Avise que a correção vai para amanhã.',
        'The fix will slip to tomorrow.',
        [
          'the fix will slip to tomorrow',
          'the fix slips to tomorrow',
          'this fix will slip to tomorrow'
        ],
        'Slip to tomorrow é escorregar para amanhã. Fix é a correção.'
      ),
      fala(
        'Detalhe',
        'When will they hear from you?',
        'Quando eles têm notícia sua?',
        'Diga que manda um update às quatro.',
        'I will send an update at four.',
        [
          'i will send an update at four',
          'i will post an update at four',
          'i will send an update at 4'
        ],
        'An update é um recado novo. At four é às quatro.'
      )
    ]
  },
  {
    id: 'canal',
    titulo: 'A branch',
    emoji: '💬',
    nivel: 'A2',
    onde: 'Você já subiu a branch.',
    rodadas: [
      fala(
        'Pedido',
        'What is the short update?',
        'Qual é o recado curto?',
        'Diga que você subiu a branch.',
        'I pushed the branch.',
        [
          'i pushed the branch',
          'i pushed the branch already',
          'i have pushed the branch'
        ],
        'Pushed é subiu. The branch é a branch.'
      ),
      fala(
        'Detalhe',
        'What should the team do?',
        'O que o time faz?',
        'Peça para puxar quando der.',
        'Please pull when you can.',
        [
          'please pull when you can',
          'pull when you can',
          'please pull when you have a minute'
        ],
        'Pull é puxar a branch. When you can é quando der.'
      )
    ]
  }
];

export const SOCIAIS = [
  {
    id: 'brinde',
    titulo: 'Happy hour',
    emoji: '🍻',
    nivel: 'A2',
    onde: 'O time vai sair depois do trabalho.',
    rodadas: [
      fala(
        'Papo',
        'We are heading out after work. You in?',
        'A gente sai depois do trabalho. Você vem?',
        'Diga que pode ficar para um drink.',
        'I can stay for one drink.',
        [
          'i can stay for one drink',
          'i can stay for a drink',
          'i can stay for one drink tonight'
        ],
        'Stay for é ficar para. One drink é um drink só.'
      ),
      fala(
        'Detalhe',
        'What are you having?',
        'O que você vai pedir?',
        'Diga que vai pedir um refrigerante.',
        'I will have a soda.',
        [
          'i will have a soda',
          'i will get a soda',
          'i am having a soda'
        ],
        'A soda é um refrigerante. I will have é o pedido.'
      )
    ]
  },
  {
    id: 'violao',
    titulo: 'O hobby',
    emoji: '🎸',
    nivel: 'A2',
    onde: 'Alguém pergunta do fim de semana.',
    rodadas: [
      fala(
        'Papo',
        'What do you do on weekends?',
        'O que você faz no fim de semana?',
        'Diga que toca violão no fim de semana.',
        'I play the guitar on weekends.',
        [
          'i play the guitar on weekends',
          'i play guitar on weekends',
          'on weekends i play the guitar'
        ],
        'Play the guitar é tocar violão. On weekends é no fim de semana.'
      ),
      fala(
        'Detalhe',
        'How often do you practice?',
        'Com que frequência você pratica?',
        'Diga que pratica um pouco no domingo.',
        'I practice a little on Sunday.',
        [
          'i practice a little on sunday',
          'i practice a bit on sunday',
          'i practice a little every sunday'
        ],
        'A little é um pouco. On Sunday é no domingo.'
      )
    ]
  },
  {
    id: 'brasil',
    titulo: 'O Brasil',
    emoji: '🇧🇷',
    nivel: 'A2',
    onde: 'Alguém pergunta de onde você é.',
    rodadas: [
      fala(
        'Papo',
        'Where are you from?',
        'De onde você é?',
        'Diga que você é do Brasil.',
        'I am from Brazil.',
        [
          'i am from brazil',
          "i'm from brazil",
          'i come from brazil'
        ],
        'I am from diz a origem. Brazil é o Brasil.'
      ),
      fala(
        'Detalhe',
        'What do you miss from home?',
        'O que você sente falta de casa?',
        'Diga que sente falta da comida.',
        'I miss the food.',
        [
          'i miss the food',
          'i miss the food from home',
          'i miss brazilian food'
        ],
        'I miss é sinto falta. The food é a comida.'
      )
    ]
  }
];

export const TERMOS = [
  {
    id: 'cash',
    titulo: 'cache',
    emoji: '🔤',
    nivel: 'B1',
    onde: 'Soa como cash, não como catch.',
    rodadas: [
      fala(
        'Som',
        'How do you say cache?',
        'Como se diz cache?',
        'Diga que cache soa como cash.',
        'Cache sounds like cash.',
        [
          'cache sounds like cash',
          'the word cache sounds like cash',
          'cache is pronounced cash'
        ],
        'Cash é o som. Catch seria outra palavra.'
      ),
      fala(
        'Frase',
        'Use it in a short sentence.',
        'Use numa frase curta.',
        'Diga que o cache está vazio.',
        'The cache is empty.',
        [
          'the cache is empty',
          'this cache is empty',
          'the cache is empty now'
        ],
        'Empty é vazio. The cache é o cache.'
      )
    ]
  },
  {
    id: 'cue',
    titulo: 'queue',
    emoji: '🔤',
    nivel: 'B1',
    onde: 'Soa como cue, a letra Q.',
    rodadas: [
      fala(
        'Som',
        'How do you say queue?',
        'Como se diz queue?',
        'Diga que queue soa como cue.',
        'Queue sounds like cue.',
        [
          'queue sounds like cue',
          'the word queue sounds like cue',
          'queue is pronounced cue'
        ],
        'Cue é o som da letra Q. Não é kway.'
      ),
      fala(
        'Frase',
        'Use it in a short sentence.',
        'Use numa frase curta.',
        'Diga que a fila está vazia.',
        'The queue is empty.',
        [
          'the queue is empty',
          'this queue is empty',
          'our queue is empty'
        ],
        'The queue é a fila. Empty é vazia.'
      )
    ]
  },
  {
    id: 'sequel',
    titulo: 'SQL',
    emoji: '🔤',
    nivel: 'B1',
    onde: 'Soa como sequel, não letra por letra.',
    rodadas: [
      fala(
        'Som',
        'How do you say SQL?',
        'Como se diz SQL?',
        'Diga que SQL soa como sequel.',
        'SQL sounds like sequel.',
        [
          'sql sounds like sequel',
          'the word sql sounds like sequel',
          'sql is pronounced sequel'
        ],
        'Sequel é o som. Não é S, Q, L separado.'
      ),
      fala(
        'Frase',
        'Use it in a short sentence.',
        'Use numa frase curta.',
        'Diga que a query de SQL está lenta.',
        'The SQL query is slow.',
        [
          'the sql query is slow',
          'this sql query is slow',
          'the sql query is slow today'
        ],
        'Query é a consulta. Slow é lenta.'
      )
    ]
  },
  {
    id: 'gooey',
    titulo: 'GUI',
    emoji: '🔤',
    nivel: 'B1',
    onde: 'Soa como gooey.',
    rodadas: [
      fala(
        'Som',
        'How do you say GUI?',
        'Como se diz GUI?',
        'Diga que GUI soa como gooey.',
        'GUI sounds like gooey.',
        [
          'gui sounds like gooey',
          'the word gui sounds like gooey',
          'gui is pronounced gooey'
        ],
        'Gooey é o som. Não é G, U, I separado.'
      ),
      fala(
        'Frase',
        'Use it in a short sentence.',
        'Use numa frase curta.',
        'Diga que a GUI tem um botão.',
        'The GUI has one button.',
        [
          'the gui has one button',
          'this gui has one button',
          'the gui has a button'
        ],
        'The GUI é a tela. One button é um botão.'
      )
    ]
  },
  {
    id: 'hite',
    titulo: 'height',
    emoji: '🔤',
    nivel: 'A2',
    onde: 'O GH não soa. Rima com hite.',
    rodadas: [
      fala(
        'Som',
        'How do you say height?',
        'Como se diz height?',
        'Diga que height soa como hite.',
        'Height sounds like hite.',
        [
          'height sounds like hite',
          'the word height sounds like hite',
          'height rhymes with hite'
        ],
        'O GH fica mudo. Hite é o som.'
      ),
      fala(
        'Frase',
        'Use it in a short sentence.',
        'Use numa frase curta.',
        'Diga que a altura é 40 pixels.',
        'The height is 40 pixels.',
        [
          'the height is 40 pixels',
          'the height is forty pixels',
          'this height is 40 pixels'
        ],
        'Height é a altura. Pixels são os pontos da tela.'
      )
    ]
  },
  {
    id: 'wid',
    titulo: 'width',
    emoji: '🔤',
    nivel: 'A2',
    onde: 'O I é curto. Rima com with.',
    rodadas: [
      fala(
        'Som',
        'How do you say width?',
        'Como se diz width?',
        'Diga que width rima com with.',
        'Width rhymes with with.',
        [
          'width rhymes with with',
          'the word width rhymes with with',
          'width sounds like with'
        ],
        'With é o som próximo. O I de width é curto.'
      ),
      fala(
        'Frase',
        'Use it in a short sentence.',
        'Use numa frase curta.',
        'Diga que a largura é 200 pixels.',
        'The width is 200 pixels.',
        [
          'the width is 200 pixels',
          'the width is two hundred pixels',
          'this width is 200 pixels'
        ],
        'Width é a largura. 200 pixels é a medida.'
      )
    ]
  }
];

export function linhaPorId(id) {
  return LINHAS.find(c => c.id === id) ?? null;
}

export function slackPorId(id) {
  return SLACKS.find(c => c.id === id) ?? null;
}

export function socialPorId(id) {
  return SOCIAIS.find(c => c.id === id) ?? null;
}

export function termoPorId(id) {
  return TERMOS.find(c => c.id === id) ?? null;
}

export function avaliarLinha(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSlack(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSocial(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarTermo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
