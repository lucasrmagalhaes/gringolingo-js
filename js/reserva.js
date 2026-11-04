// Reserva de memória, consulta por linha e porta que recusa.
// A duração de cada treino usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const RESERVAS = [
  {
    id: 'reservauso',
    titulo: 'Reserva em uso',
    emoji: '🪫',
    nivel: 'A2',
    onde: 'O servidor passou a usar a reserva.',
    rodadas: [
      fala(
        'Usa',
        'What did the server start doing?',
        'O que o servidor passou a fazer?',
        'Diga que o servidor passou a usar a reserva.',
        'The server started using swap.',
        [
          'the server started using swap',
          'that server started using swap',
          'the server is using swap'
        ],
        'Using swap é usar a reserva de memória.'
      ),
      fala(
        'Solta',
        'What happened to the responses?',
        'O que houve com as respostas?',
        'Diga que as respostas ficaram lentas.',
        'The responses got slow.',
        [
          'the responses got slow',
          'those responses got slow',
          'the responses are slow'
        ],
        'Got slow é ficaram lentas.'
      )
    ]
  },
  {
    id: 'reservaqarenta',
    titulo: 'Quarenta por cento',
    emoji: '🪫',
    nivel: 'B1',
    onde: 'A reserva chegou a quarenta por cento.',
    rodadas: [
      fala(
        'Usa',
        'How full is the swap?',
        'Quão cheia está a reserva?',
        'Diga que a reserva chegou a quarenta por cento.',
        'Swap use reached forty percent.',
        [
          'swap use reached forty percent',
          'swap use reached 40 percent',
          'the swap use reached forty percent'
        ],
        'Forty percent é quarenta por cento.'
      ),
      fala(
        'Solta',
        'What should we free?',
        'O que a gente libera?',
        'Peça para liberar memória.',
        'Please free some memory.',
        [
          'please free some memory',
          'free some memory',
          'please free that memory'
        ],
        'Free some memory é liberar memória.'
      )
    ]
  },
  {
    id: 'reservalivre',
    titulo: 'Reserva livre',
    emoji: '🪫',
    nivel: 'B1',
    onde: 'O servidor parou de usar a reserva.',
    rodadas: [
      fala(
        'Usa',
        'Is the server still using swap?',
        'O servidor ainda usa a reserva?',
        'Diga que o servidor parou de usar a reserva.',
        'The server stopped using swap.',
        [
          'the server stopped using swap',
          'that server stopped using swap',
          'the server is not using swap'
        ],
        'Stopped using swap é parou de usar a reserva.'
      ),
      fala(
        'Solta',
        'How are the responses now?',
        'Como estão as respostas agora?',
        'Diga que as respostas estão rápidas agora.',
        'The responses are quick now.',
        [
          'the responses are quick now',
          'those responses are quick now',
          'the responses are quick'
        ],
        'Are quick now é estão rápidas agora.'
      )
    ]
  }
];

export const VARREDURAS = [
  {
    id: 'linhasolta',
    titulo: 'Uma por linha',
    emoji: '🧵',
    nivel: 'A2',
    onde: 'A tela roda uma consulta por linha.',
    rodadas: [
      fala(
        'Conta',
        'What does the page run?',
        'O que a tela roda?',
        'Diga que a tela roda uma consulta por linha.',
        'The page runs one query per row.',
        [
          'the page runs one query per row',
          'that page runs one query per row',
          'the page runs a query per row'
        ],
        'One query per row é uma consulta por linha.'
      ),
      fala(
        'Junta',
        'What should we do with the queries?',
        'O que a gente faz com as consultas?',
        'Peça para juntar as consultas.',
        'Please join the queries.',
        [
          'please join the queries',
          'join the queries',
          'please join those queries'
        ],
        'Join the queries é juntar as consultas.'
      )
    ]
  },
  {
    id: 'quarentabusca',
    titulo: 'Quarenta consultas',
    emoji: '🧵',
    nivel: 'B1',
    onde: 'A tela roda quarenta consultas.',
    rodadas: [
      fala(
        'Conta',
        'How many queries does the page run?',
        'Quantas consultas a tela roda?',
        'Diga que a tela roda quarenta consultas.',
        'The page runs forty queries.',
        [
          'the page runs forty queries',
          'the page runs 40 queries',
          'that page runs forty queries'
        ],
        'Forty queries é quarenta consultas.'
      ),
      fala(
        'Junta',
        'What will you join?',
        'O que você vai juntar?',
        'Diga que vai juntar a consulta da lista.',
        'I will join the list query.',
        [
          'i will join the list query',
          'i will join that list query',
          'i join the list query'
        ],
        'Join the list query é juntar a consulta da lista.'
      )
    ]
  },
  {
    id: 'listaunica',
    titulo: 'Lista em uma',
    emoji: '🧵',
    nivel: 'B1',
    onde: 'A lista usa uma consulta só.',
    rodadas: [
      fala(
        'Conta',
        'How many queries does the list use now?',
        'Quantas consultas a lista usa agora?',
        'Diga que a lista usa uma consulta agora.',
        'The list uses one query now.',
        [
          'the list uses one query now',
          'that list uses one query now',
          'the list uses one query'
        ],
        'One query now é uma consulta agora.'
      ),
      fala(
        'Junta',
        'Can the page load?',
        'A tela consegue carregar?',
        'Diga que a tela consegue carregar agora.',
        'The page can load now.',
        [
          'the page can load now',
          'that page can load now',
          'the page can load'
        ],
        'Can load now é consegue carregar agora.'
      )
    ]
  }
];

export const PORTAS = [
  {
    id: 'portafechada',
    titulo: 'Porta fechada',
    emoji: '🚪',
    nivel: 'A2',
    onde: 'Nada escuta nessa porta.',
    rodadas: [
      fala(
        'Bate',
        'What listens on that port?',
        'O que escuta nessa porta?',
        'Diga que nada escuta nessa porta.',
        'Nothing listens on that port.',
        [
          'nothing listens on that port',
          'nothing listens on the port',
          'nothing is listening on that port'
        ],
        'Nothing listens é nada escuta.'
      ),
      fala(
        'Ouve',
        'What did the client get?',
        'O que o cliente recebeu?',
        'Diga que o cliente recebeu uma recusa.',
        'The client got a refusal.',
        [
          'the client got a refusal',
          'that client got a refusal',
          'the client got refused'
        ],
        'Got a refusal é recebeu uma recusa.'
      )
    ]
  },
  {
    id: 'portaoito',
    titulo: 'Porta oito mil',
    emoji: '🚪',
    nivel: 'B1',
    onde: 'Nada escuta na porta oito mil.',
    rodadas: [
      fala(
        'Bate',
        'Which port is quiet?',
        'Qual porta está quieta?',
        'Diga que nada escuta na porta oito mil.',
        'Nothing listens on port eight thousand.',
        [
          'nothing listens on port eight thousand',
          'nothing listens on port 8000',
          'nothing listens on port eight'
        ],
        'Eight thousand é oito mil.'
      ),
      fala(
        'Ouve',
        'What should we start?',
        'O que a gente inicia?',
        'Peça para iniciar quem escuta.',
        'Please start the listener.',
        [
          'please start the listener',
          'start the listener',
          'please start that listener'
        ],
        'Start the listener é iniciar quem escuta.'
      )
    ]
  },
  {
    id: 'portaaberta',
    titulo: 'Porta aberta',
    emoji: '🚪',
    nivel: 'B1',
    onde: 'A porta aceita conexões.',
    rodadas: [
      fala(
        'Bate',
        'Does the port accept connections?',
        'A porta aceita conexões?',
        'Diga que a porta aceita conexões agora.',
        'The port accepts connections now.',
        [
          'the port accepts connections now',
          'that port accepts connections now',
          'the port accepts connections'
        ],
        'Accepts connections now é aceita conexões agora.'
      ),
      fala(
        'Ouve',
        'Can the client connect?',
        'O cliente consegue conectar?',
        'Diga que o cliente consegue conectar.',
        'The client can connect.',
        [
          'the client can connect',
          'that client can connect',
          'the client can connect now'
        ],
        'Can connect é consegue conectar.'
      )
    ]
  }
];

export function reservaPorId(id) {
  return RESERVAS.find(c => c.id === id) ?? null;
}

export function varreduraPorId(id) {
  return VARREDURAS.find(c => c.id === id) ?? null;
}

export function portaPorId(id) {
  return PORTAS.find(c => c.id === id) ?? null;
}

export function avaliarReserva(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVarredura(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPorta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
