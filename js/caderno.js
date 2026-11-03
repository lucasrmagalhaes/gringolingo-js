// Pedido de esclarecimento, a cobertura dos testes e o vídeo curto.
// O vocabulário sai das frases que você errou. A nota usa o mesmo tutor.
// Nada sai do aparelho.

import { avaliarResposta, normalizarFala } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PEDIDOS = [
  {
    id: 'novosom',
    titulo: 'O sotaque novo',
    emoji: '🙋',
    nivel: 'A2',
    onde: 'A pessoa falou um nome de cidade que você não pegou.',
    rodadas: [
      fala(
        'Pedido',
        'Did the town name land?',
        'O nome da cidade entrou?',
        'Diga que esse sotaque é novo para você.',
        'This accent is new to me.',
        [
          'this accent is new to me',
          'this accent is new for me',
          'the accent is new to me'
        ],
        'Accent é o sotaque. New to me é novo para mim.'
      ),
      fala(
        'Eco',
        'What should they do?',
        'O que a pessoa deve fazer?',
        'Peça o nome da cidade mais uma vez.',
        'Please say the town name once more.',
        [
          'please say the town name once more',
          'please say the city name once more',
          'please say the town name one more time'
        ],
        'Town name é o nome da cidade. Once more é mais uma vez.'
      )
    ]
  },
  {
    id: 'perdida',
    titulo: 'A palavra perdida',
    emoji: '🙋',
    nivel: 'B1',
    onde: 'A última palavra da frase sumiu no áudio.',
    rodadas: [
      fala(
        'Pedido',
        'What did you miss?',
        'O que você não pegou?',
        'Diga que perdeu a última palavra.',
        'I missed the last word.',
        [
          'i missed the last word',
          'i missed the final word',
          'i lost the last word'
        ],
        'Missed é não pegou. The last word é a última palavra.'
      ),
      fala(
        'Eco',
        'How do you ask for it?',
        'Como você pede isso?',
        'Peça só essa palavra de novo.',
        'Could you give me that word again?',
        [
          'could you give me that word again',
          'can you give me that word again',
          'could you give me the word again'
        ],
        'That word é essa palavra. Again é de novo, só ela.'
      )
    ]
  },
  {
    id: 'sextafeira',
    titulo: 'A sexta',
    emoji: '🙋',
    nivel: 'B1',
    onde: 'Você quer confirmar o prazo que acabou de ouvir.',
    rodadas: [
      fala(
        'Pedido',
        'Do you want to confirm it?',
        'Você quer confirmar?',
        'Diga que vai repetir o requisito.',
        'Let me say the requirement back.',
        [
          'let me say the requirement back',
          'let me read the requirement back',
          'let me repeat the requirement back'
        ],
        'Requirement é o requisito. Say it back é devolver o que ouviu.'
      ),
      fala(
        'Eco',
        'What is the due date?',
        'Qual é a data?',
        'Diga que o relatório vence toda sexta.',
        'The report is due every Friday.',
        [
          'the report is due every friday',
          'the report is due each friday',
          'that report is due every friday'
        ],
        'Due é a data de entrega. Every Friday é toda sexta.'
      )
    ]
  }
];

export const COBERTURAS = [
  {
    id: 'esteira',
    titulo: 'O push',
    emoji: '🧪',
    nivel: 'B1',
    onde: 'O time pergunta quando a suíte roda.',
    rodadas: [
      fala(
        'Teste',
        'When do the tests run?',
        'Quando os testes rodam?',
        'Diga que os testes rodam em todo push.',
        'The tests run on every push.',
        [
          'the tests run on every push',
          'the tests run on each push',
          'tests run on every push'
        ],
        'Every push é cada envio para o repositório.'
      ),
      fala(
        'Caso',
        'What if a check is red?',
        'E se uma checagem fica vermelha?',
        'Diga que a checagem vermelha trava o merge.',
        'A red check blocks the merge.',
        [
          'a red check blocks the merge',
          'a red check blocks the merge request',
          'the red check blocks the merge'
        ],
        'A red check é a checagem vermelha. Blocks the merge trava a entrada.'
      )
    ]
  },
  {
    id: 'listavazia',
    titulo: 'A lista vazia',
    emoji: '🧪',
    nivel: 'B2',
    onde: 'A cobertura mostrou um caminho que ninguém chama.',
    rodadas: [
      fala(
        'Teste',
        'What does coverage tell us?',
        'O que a cobertura conta?',
        'Diga que a cobertura mostra linhas que ninguém chama.',
        'Coverage shows lines we never call.',
        [
          'coverage shows lines we never call',
          'coverage shows lines we do not call',
          'the coverage shows lines we never call'
        ],
        'Coverage é a cobertura. Lines we never call são linhas sem uso.'
      ),
      fala(
        'Caso',
        'What will you add?',
        'O que você vai acrescentar?',
        'Diga que vai criar um caso para a lista vazia.',
        'I will add a case for the empty list.',
        [
          'i will add a case for the empty list',
          'i will add a test for the empty list',
          'i will add a case for an empty list'
        ],
        'A case é um caso de teste. The empty list é a lista vazia.'
      )
    ]
  },
  {
    id: 'relogio',
    titulo: 'O relógio',
    emoji: '🧪',
    nivel: 'B1',
    onde: 'Alguém acha que a suíte precisa de internet.',
    rodadas: [
      fala(
        'Teste',
        'Does this suite need the network?',
        'Essa suíte precisa de rede?',
        'Diga que a suíte roda sem rede.',
        'This suite runs with no network.',
        [
          'this suite runs with no network',
          'this suite runs without a network',
          'the suite runs with no network'
        ],
        'Suite é o conjunto de testes. No network é sem internet.'
      ),
      fala(
        'Caso',
        'How does the date stay still?',
        'Como a data fica parada?',
        'Diga que o relógio falso segura a data.',
        'The fake clock keeps the date still.',
        [
          'the fake clock keeps the date still',
          'the fake clock keeps the date fixed',
          'a fake clock keeps the date still'
        ],
        'Fake clock é o relógio de teste. Keeps the date still segura o dia.'
      )
    ]
  }
];

export const LOOMS = [
  {
    id: 'doismin',
    titulo: 'Dois minutos',
    emoji: '🎥',
    nivel: 'A2',
    onde: 'Você vai deixar um vídeo curto, sem marcar reunião.',
    rodadas: [
      fala(
        'Tempo',
        'How long is the update?',
        'Quanto tempo dura a atualização?',
        'Diga que a atualização tem dois minutos.',
        'This update is two minutes.',
        [
          'this update is two minutes',
          'this update is 2 minutes',
          'the update is two minutes'
        ],
        'Update é a atualização. Two minutes são dois minutos.'
      ),
      fala(
        'Link',
        'When should people watch?',
        'Quando as pessoas devem assistir?',
        'Diga para assistirem quando tiverem um vão.',
        'Watch it when you have a gap.',
        [
          'watch it when you have a gap',
          'watch it when you have time',
          'please watch it when you have a gap'
        ],
        'A gap é um vão na agenda. Watch it é assistir.'
      )
    ]
  },
  {
    id: 'loginfix',
    titulo: 'O login',
    emoji: '🎥',
    nivel: 'B1',
    onde: 'A correção do login já está na main e o vídeo explica.',
    rodadas: [
      fala(
        'Tempo',
        'Where is the login fix?',
        'Onde está a correção do login?',
        'Diga que a correção do login já está na main.',
        'The login fix is already on main.',
        [
          'the login fix is already on main',
          'the login fix is already in main',
          'that login fix is already on main'
        ],
        'The login fix é a correção do login. On main é na branch principal.'
      ),
      fala(
        'Link',
        'Where is the recording?',
        'Onde está a gravação?',
        'Diga que deixou o link na thread.',
        'I left the link in the thread.',
        [
          'i left the link in the thread',
          'i put the link in the thread',
          'i left a link in the thread'
        ],
        'Thread é o fio da conversa. The link é o endereço do vídeo.'
      )
    ]
  },
  {
    id: 'comentario',
    titulo: 'O comentário',
    emoji: '🎥',
    nivel: 'B1',
    onde: 'Você quer um comentário, não uma call.',
    rodadas: [
      fala(
        'Tempo',
        'What should they do if it looks wrong?',
        'O que eles fazem se o fluxo parecer errado?',
        'Peça um comentário se o fluxo parecer errado.',
        'Please comment if the flow looks wrong.',
        [
          'please comment if the flow looks wrong',
          'please comment if the flow is wrong',
          'comment if the flow looks wrong'
        ],
        'Comment é deixar um comentário. The flow é o fluxo da tela.'
      ),
      fala(
        'Link',
        'Do we need a meeting?',
        'Precisamos de uma reunião?',
        'Diga que não precisa de reunião para isso.',
        'No meeting is needed for this.',
        [
          'no meeting is needed for this',
          'a meeting is not needed for this',
          'no meeting is needed'
        ],
        'No meeting é sem reunião. For this é para esse assunto.'
      )
    ]
  }
];

const PARADAS = new Set([
  'the', 'a', 'an', 'to', 'of', 'and', 'or', 'for', 'in', 'on', 'at', 'is', 'it',
  'this', 'that', 'with', 'my', 'your', 'i', 'we', 'you', 'be', 'was', 'were',
  'am', 'are', 'do', 'did', 'have', 'has', 'not', 'but', 'so', 'if', 'as', 'by'
]);

export function termosDaFala(erros) {
  if (!Array.isArray(erros)) return [];
  const mapa = new Map();
  for (const item of erros) {
    if (!item || typeof item.en !== 'string') continue;
    const peso = Math.max(1, Number(item.n) || 1);
    const vistos = new Set();
    for (const token of normalizarFala(item.en).split(' ').filter(Boolean)) {
      if (token.length < 4 || PARADAS.has(token) || vistos.has(token)) continue;
      vistos.add(token);
      mapa.set(token, (mapa.get(token) || 0) + peso);
    }
  }
  return [...mapa.entries()]
    .map(([en, n]) => ({ en, n }))
    .sort((a, b) => b.n - a.n || a.en.localeCompare(b.en))
    .slice(0, 24);
}

export function textoDaPalavra(erros) {
  const topo = termosDaFala(erros)[0];
  if (!topo) return { en: '', n: 0, texto: 'Nenhuma palavra escapou nas falas ainda.' };
  const vezes = topo.n === 1 ? '1 vez' : `${topo.n} vezes`;
  return { en: topo.en, n: topo.n, texto: `A palavra que mais volta é ${topo.en}. ${vezes}.` };
}

export function fraseDaPalavra(palavra) {
  const alvo = normalizarFala(palavra);
  return `Please keep ${alvo} in this sentence.`;
}

export function avaliarPalavra(palavra, texto) {
  const alvo = normalizarFala(palavra);
  const dita = String(texto ?? '').trim();
  const toks = normalizarFala(dita).split(' ').filter(Boolean);
  const melhor = fraseDaPalavra(alvo);
  const ok = Boolean(alvo) && !alvo.includes(' ') && toks.includes(alvo) && toks.length >= 3;
  return {
    ok,
    quase: false,
    nota: ok ? 100 : 0,
    melhor,
    dita,
    tutor: ok ? null : {
      titulo: 'Ainda não',
      porque: 'A frase precisa da palavra e de pelo menos três palavras.',
      dica: 'Escreva uma frase curta em inglês com essa palavra.'
    }
  };
}

export function pedidoPorId(id) {
  return PEDIDOS.find(c => c.id === id) ?? null;
}

export function coberturaPorId(id) {
  return COBERTURAS.find(c => c.id === id) ?? null;
}

export function loomPorId(id) {
  return LOOMS.find(c => c.id === id) ?? null;
}

export function avaliarPedido(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCobertura(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLoom(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
