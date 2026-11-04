// Pilha sem fundo, cano fechado e giro de endereços.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PILHAS = [
  {
    id: 'pilhasemfim',
    titulo: 'Pilha sem fim',
    emoji: '📚',
    nivel: 'A2',
    onde: 'A pilha de chamadas cresceu sem fundo.',
    rodadas: [
      fala(
        'Sobe',
        'What happened to the call stack?',
        'O que aconteceu com a pilha de chamadas?',
        'Diga que a pilha de chamadas cresceu sem fundo.',
        'The call stack grew without end.',
        ['the call stack grew without end', 'that call stack grew without end'],
        'Without end é sem fundo.'
      ),
      fala(
        'Corta',
        'What should we do with the stack?',
        'O que a gente faz com a pilha?',
        'Peça para parar a pilha que cresce.',
        'Please stop the growing stack.',
        ['please stop the growing stack', 'stop the growing stack'],
        'Stop the stack é parar a pilha.'
      )
    ]
  },
  {
    id: 'oitomilpilha',
    titulo: 'Oito mil',
    emoji: '📚',
    nivel: 'B1',
    onde: 'A pilha passou de oito mil quadros.',
    rodadas: [
      fala(
        'Sobe',
        'How many frames did the stack pass?',
        'Quantos quadros a pilha passou?',
        'Diga que a pilha passou de oito mil quadros.',
        'The stack passed eight thousand frames.',
        [
          'the stack passed eight thousand frames',
          'the stack passed 8000 frames',
          'that stack passed eight thousand frames'
        ],
        'Eight thousand frames é oito mil quadros.'
      ),
      fala(
        'Corta',
        'Where should we cap the stack?',
        'Onde a gente limita a pilha?',
        'Peça para limitar a pilha em oito mil quadros.',
        'Please cap the stack at eight thousand frames.',
        [
          'please cap the stack at eight thousand frames',
          'please cap the stack at 8000 frames',
          'cap the stack at eight thousand frames'
        ],
        'Cap the stack é limitar a pilha.'
      )
    ]
  },
  {
    id: 'pilhaok',
    titulo: 'Pilha quieta',
    emoji: '📚',
    nivel: 'B1',
    onde: 'A pilha de chamadas ficou curta.',
    rodadas: [
      fala(
        'Sobe',
        'Is the call stack short now?',
        'A pilha de chamadas está curta agora?',
        'Diga que a pilha de chamadas está curta agora.',
        'The call stack is short now.',
        ['the call stack is short now', 'that call stack is short now'],
        'Short now é curta agora.'
      ),
      fala(
        'Corta',
        'Can the program continue?',
        'O programa pode seguir?',
        'Diga que o programa pode seguir.',
        'The program can continue.',
        ['the program can continue', 'that program can continue'],
        'Can continue é pode seguir.'
      )
    ]
  }
];

export const CANOS = [
  {
    id: 'canofechou',
    titulo: 'Cano fechado',
    emoji: '🔧',
    nivel: 'A2',
    onde: 'A outra ponta fechou o cano.',
    rodadas: [
      fala(
        'Fecha',
        'What happened to the pipe?',
        'O que aconteceu com o cano?',
        'Diga que a outra ponta fechou o cano.',
        'The other side closed the pipe.',
        ['the other side closed the pipe', 'that other side closed the pipe'],
        'Closed the pipe é fechou o cano.'
      ),
      fala(
        'Abre',
        'What should we open again?',
        'O que a gente abre de novo?',
        'Peça para abrir o cano de novo.',
        'Please open the pipe again.',
        ['please open the pipe again', 'open the pipe again'],
        'Open again é abrir de novo.'
      )
    ]
  },
  {
    id: 'doisescritos',
    titulo: 'Duas escritas',
    emoji: '🔧',
    nivel: 'B1',
    onde: 'A queda veio depois de duas escritas.',
    rodadas: [
      fala(
        'Fecha',
        'When did the reset come?',
        'Quando veio a queda?',
        'Diga que a queda veio depois de duas escritas.',
        'The reset came after two writes.',
        ['the reset came after two writes', 'the reset came after 2 writes', 'that reset came after two writes'],
        'Two writes é duas escritas.'
      ),
      fala(
        'Abre',
        'What should we retry?',
        'O que a gente tenta de novo?',
        'Peça para tentar as duas escritas de novo.',
        'Please retry the two writes.',
        ['please retry the two writes', 'retry the two writes'],
        'Retry é tentar de novo.'
      )
    ]
  },
  {
    id: 'canolivre',
    titulo: 'Cano livre',
    emoji: '🔧',
    nivel: 'B1',
    onde: 'O cano ficou aberto.',
    rodadas: [
      fala(
        'Fecha',
        'Does the pipe stay open?',
        'O cano fica aberto?',
        'Diga que o cano fica aberto.',
        'The pipe stays open.',
        ['the pipe stays open', 'that pipe stays open'],
        'Stays open é fica aberto.'
      ),
      fala(
        'Abre',
        'Can the response finish?',
        'A resposta pode terminar?',
        'Diga que a resposta pode terminar.',
        'The response can finish.',
        ['the response can finish', 'that response can finish'],
        'Can finish é pode terminar.'
      )
    ]
  }
];

export const GIROS = [
  {
    id: 'girodois',
    titulo: 'Dois endereços',
    emoji: '🌀',
    nivel: 'A2',
    onde: 'O navegador girou entre dois endereços.',
    rodadas: [
      fala(
        'Gira',
        'What did the browser do?',
        'O que o navegador fez?',
        'Diga que o navegador girou entre dois endereços.',
        'The browser spun between two addresses.',
        ['the browser spun between two addresses', 'that browser spun between two addresses'],
        'Spun between é girou entre.'
      ),
      fala(
        'Para',
        'What should we stop?',
        'O que a gente para?',
        'Peça para parar o giro de redirecionamento.',
        'Please stop the redirect loop.',
        ['please stop the redirect loop', 'stop the redirect loop'],
        'Redirect loop é o giro de redirecionamento.'
      )
    ]
  },
  {
    id: 'seisvoltas',
    titulo: 'Seis voltas',
    emoji: '🌀',
    nivel: 'B1',
    onde: 'O giro parou depois de seis saltos.',
    rodadas: [
      fala(
        'Gira',
        'After how many hops did the loop stop?',
        'Depois de quantos saltos o giro parou?',
        'Diga que o giro parou depois de seis saltos.',
        'The loop stopped after six hops.',
        ['the loop stopped after six hops', 'the loop stopped after 6 hops', 'that loop stopped after six hops'],
        'Six hops é seis saltos.'
      ),
      fala(
        'Para',
        'Where should we cap the loop?',
        'Onde a gente limita o giro?',
        'Peça para limitar o giro em seis saltos.',
        'Please cap the loop at six hops.',
        ['please cap the loop at six hops', 'please cap the loop at 6 hops', 'cap the loop at six hops'],
        'Cap the loop é limitar o giro.'
      )
    ]
  },
  {
    id: 'giroquieto',
    titulo: 'Giro parado',
    emoji: '🌀',
    nivel: 'B1',
    onde: 'O giro de redirecionamento acabou.',
    rodadas: [
      fala(
        'Gira',
        'Has the redirect loop ended?',
        'O giro de redirecionamento acabou?',
        'Diga que o giro de redirecionamento acabou.',
        'The redirect loop has ended.',
        ['the redirect loop has ended', 'that redirect loop has ended'],
        'Has ended é acabou.'
      ),
      fala(
        'Para',
        'Where does the browser stay?',
        'Onde o navegador fica?',
        'Diga que o navegador fica num endereço só.',
        'The browser stays on one address.',
        ['the browser stays on one address', 'that browser stays on one address'],
        'One address é um endereço só.'
      )
    ]
  }
];

export function pilhaPorId(id) {
  return PILHAS.find(c => c.id === id) ?? null;
}

export function canoPorId(id) {
  return CANOS.find(c => c.id === id) ?? null;
}

export function giroPorId(id) {
  return GIROS.find(c => c.id === id) ?? null;
}

export function avaliarPilha(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCano(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGiro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
