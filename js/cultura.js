// Esporte, filme e série, pedido de aumento e a API em voz alta.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CULTURAS = [
  {
    id: 'jogo',
    titulo: 'O jogo',
    emoji: '⚽',
    nivel: 'A2',
    onde: 'Alguém pergunta do jogo do fim de semana.',
    rodadas: [
      fala(
        'Assunto',
        'Did you watch the game?',
        'Você viu o jogo?',
        'Diga que viu o jogo com os amigos.',
        'I watched the game with my friends.',
        [
          'i watched the game with my friends',
          'i watched the game with friends',
          'i saw the game with my friends'
        ],
        'Game é o jogo. Friends são os amigos.'
      ),
      fala(
        'Detalhe',
        'When does your team play?',
        'Quando o seu time joga?',
        'Diga que o time joga no domingo.',
        'My team plays on Sunday.',
        [
          'my team plays on sunday',
          'my team plays sunday',
          'the team plays on sunday'
        ],
        'Team é o time. Sunday é domingo.'
      )
    ]
  },
  {
    id: 'cinema',
    titulo: 'O cinema',
    emoji: '🎬',
    nivel: 'B1',
    onde: 'O papo é sobre um filme, não sobre a rotina de casa.',
    rodadas: [
      fala(
        'Assunto',
        'What did you think of the movie?',
        'O que você achou do filme?',
        'Diga que o final do filme surpreendeu.',
        'The ending of the movie surprised me.',
        [
          'the ending of the movie surprised me',
          'the movie ending surprised me',
          'the end of the movie surprised me'
        ],
        'Ending é o final. Surprised é surpreendeu.'
      ),
      fala(
        'Detalhe',
        'Would you recommend it?',
        'Você indicaria?',
        'Diga que indicaria esse filme.',
        'I would recommend this movie.',
        [
          'i would recommend this movie',
          'i would recommend the movie',
          'i recommend this movie'
        ],
        'Recommend é indicar. Movie é filme.'
      )
    ]
  },
  {
    id: 'serie',
    titulo: 'A série',
    emoji: '📺',
    nivel: 'A2',
    onde: 'A série da vez cabe em duas frases.',
    rodadas: [
      fala(
        'Assunto',
        'What are you watching this month?',
        'O que você está vendo neste mês?',
        'Diga que está vendo uma série nova.',
        'I am watching a new series this month.',
        [
          'i am watching a new series this month',
          'i am watching a new show this month',
          'i watch a new series this month'
        ],
        'Series é a série. This month é neste mês.'
      ),
      fala(
        'Detalhe',
        'How long is each episode?',
        'Quanto tempo tem cada episódio?',
        'Diga que cada episódio tem uns quarenta minutos.',
        'Each episode is about forty minutes.',
        [
          'each episode is about forty minutes',
          'each episode is about 40 minutes',
          'every episode is about forty minutes'
        ],
        'Episode é o episódio. Forty minutes são quarenta minutos.'
      )
    ]
  }
];

export const AUMENTOS = [
  {
    id: 'aumento',
    titulo: 'O aumento',
    emoji: '🏆',
    nivel: 'B1',
    onde: 'A conversa é sobre aumento, não sobre a faixa da oferta.',
    rodadas: [
      fala(
        'Pedido',
        'Can we talk about your pay?',
        'Podemos falar do seu pagamento?',
        'Diga que quer falar de um aumento.',
        'I would like to talk about a raise.',
        [
          'i would like to talk about a raise',
          'i want to talk about a raise',
          'i would like to discuss a raise'
        ],
        'Raise é o aumento. Talk about é falar de.'
      ),
      fala(
        'Prova',
        'What can you show from this year?',
        'O que você pode mostrar deste ano?',
        'Diga que pode mostrar os resultados do ano.',
        'I can show the results from this year.',
        [
          'i can show the results from this year',
          'i can show the results of this year',
          'i can show results from this year'
        ],
        'Results são os resultados. This year é este ano.'
      )
    ]
  },
  {
    id: 'promocao',
    titulo: 'A promoção',
    emoji: '🏆',
    nivel: 'B1',
    onde: 'O próximo papel, com uma prova curta.',
    rodadas: [
      fala(
        'Pedido',
        'Are you ready for more responsibility?',
        'Você está pronto para mais responsabilidade?',
        'Diga que está pronto para o próximo papel.',
        'I am ready for the next role.',
        [
          'i am ready for the next role',
          'i am ready for the next position',
          'i feel ready for the next role'
        ],
        'Ready é pronto. Role é o papel.'
      ),
      fala(
        'Prova',
        'What would that look like?',
        'Como isso seria na prática?',
        'Diga que pode liderar um projeto pequeno.',
        'I can lead a small project.',
        [
          'i can lead a small project',
          'i can lead one small project',
          'i could lead a small project'
        ],
        'Lead é liderar. Project é o projeto.'
      )
    ]
  },
  {
    id: 'entrega',
    titulo: 'A conquista',
    emoji: '🏆',
    nivel: 'B2',
    onde: 'Uma entrega recente vira argumento.',
    rodadas: [
      fala(
        'Pedido',
        'What did you finish?',
        'O que você terminou?',
        'Diga que entregou a funcionalidade no prazo.',
        'I shipped the feature on time.',
        [
          'i shipped the feature on time',
          'i shipped the feature on schedule',
          'i delivered the feature on time'
        ],
        'Shipped é entregou. On time é no prazo.'
      ),
      fala(
        'Prova',
        'What changed after that?',
        'O que mudou depois disso?',
        'Diga que a taxa de erro caiu depois da correção.',
        'The error rate went down after the fix.',
        [
          'the error rate went down after the fix',
          'the error rate dropped after the fix',
          'the error rate went down after that fix'
        ],
        'Error rate é a taxa de erro. Fix é a correção.'
      )
    ]
  }
];

export const ROTAS = [
  {
    id: 'endpoint',
    titulo: 'O endpoint',
    emoji: '🔌',
    nivel: 'B1',
    onde: 'Alguém de fora pede a rota em voz alta.',
    rodadas: [
      fala(
        'Rota',
        'What does this route do?',
        'O que esta rota faz?',
        'Diga que este endpoint devolve a lista de usuários.',
        'This endpoint returns the list of users.',
        [
          'this endpoint returns the list of users',
          'this endpoint returns the user list',
          'the endpoint returns the list of users'
        ],
        'Endpoint é a rota. Users são os usuários.'
      ),
      fala(
        'Detalhe',
        'Where do I call it?',
        'Onde eu chamo?',
        'Diga que o caminho é /users.',
        'The path is /users.',
        [
          'the path is /users',
          'the path is users',
          'it is at /users'
        ],
        'Path é o caminho. /users é a lista de usuários.'
      )
    ]
  },
  {
    id: 'http',
    titulo: 'O status',
    emoji: '🔌',
    nivel: 'B1',
    onde: 'O código de resposta precisa de uma frase.',
    rodadas: [
      fala(
        'Rota',
        'What does 404 mean?',
        'O que 404 quer dizer?',
        'Diga que 404 significa que o recurso não foi encontrado.',
        'A 404 means the resource was not found.',
        [
          'a 404 means the resource was not found',
          '404 means the resource was not found',
          'a 404 means the resource is not found'
        ],
        '404 é não encontrado. Resource é o recurso.'
      ),
      fala(
        'Detalhe',
        'And when the create works?',
        'E quando a criação funciona?',
        'Diga que 201 significa que o recurso foi criado.',
        'A 201 means the resource was created.',
        [
          'a 201 means the resource was created',
          '201 means the resource was created',
          'a 201 means we created the resource'
        ],
        '201 é criado. Created é criado.'
      )
    ]
  },
  {
    id: 'bearer',
    titulo: 'A autenticação',
    emoji: '🔌',
    nivel: 'B2',
    onde: 'A chamada precisa do token.',
    rodadas: [
      fala(
        'Rota',
        'Where does the token go?',
        'Onde o token entra?',
        'Diga que o token vai no header Authorization.',
        'The token goes in the Authorization header.',
        [
          'the token goes in the authorization header',
          'the token goes in the authorization',
          'the token is in the authorization header'
        ],
        'Header é o cabeçalho. Authorization é a autenticação.'
      ),
      fala(
        'Detalhe',
        'What if the token is missing?',
        'E se o token não vier?',
        'Diga que sem token a resposta é 401.',
        'Without a token the request returns 401.',
        [
          'without a token the request returns 401',
          'without a token the response is 401',
          'no token and the request returns 401'
        ],
        '401 é não autorizado. Token é a chave da chamada.'
      )
    ]
  }
];

export function culturaPorId(id) {
  return CULTURAS.find(c => c.id === id) ?? null;
}

export function aumentoPorId(id) {
  return AUMENTOS.find(c => c.id === id) ?? null;
}

export function rotaPorId(id) {
  return ROTAS.find(c => c.id === id) ?? null;
}

export function avaliarCultura(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAumento(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRota(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
