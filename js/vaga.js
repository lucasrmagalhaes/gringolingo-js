// Salário, portfólio, sotaque e o desafio diário de fala.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

export const FRASES_INICIAIS = 2;
export const FRASES_TETO = 6;

export const LOCAIS = [
  { id: 'americano', locale: 'en-US', nome: 'Americano' },
  { id: 'britanico', locale: 'en-GB', nome: 'Britânico' },
  { id: 'indiano', locale: 'en-IN', nome: 'Indiano' }
];

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SALARIOS = [
  {
    id: 'faixa',
    titulo: 'A faixa',
    emoji: '💰',
    nivel: 'B1',
    onde: 'A vaga remota pede uma faixa anual.',
    rodadas: [
      fala(
        'Pedido',
        'What salary range should we put in the offer?',
        'Qual faixa de salário colocamos na oferta?',
        'Diga a faixa de 90 a 100 mil por ano.',
        'I am looking at 90 to 100 thousand a year.',
        [
          'i am looking at 90 to 100 thousand a year',
          'i am looking at ninety to one hundred thousand a year',
          'i am looking for 90 to 100 thousand a year'
        ],
        'Range é a faixa. A year é por ano.'
      ),
      fala(
        'Troca',
        'Does that include everything?',
        'Isso inclui tudo?',
        'Diga que a faixa é só o salário base.',
        'That range is base salary only.',
        [
          'that range is base salary only',
          'the range is base salary only',
          'that is base salary only'
        ],
        'Base salary é o salário base, sem benefício.'
      )
    ]
  },
  {
    id: 'saude',
    titulo: 'O plano',
    emoji: '💰',
    nivel: 'B1',
    onde: 'O salário já está fechado.',
    rodadas: [
      fala(
        'Pedido',
        'The salary is already set. What else matters?',
        'O salário já está fechado. O que mais importa?',
        'Diga que o plano de saúde importa.',
        'Health insurance matters to me.',
        [
          'health insurance matters to me',
          'health insurance matters',
          'the health insurance matters to me'
        ],
        'Health insurance é o plano de saúde. Matters é importa.'
      ),
      fala(
        'Troca',
        'We can add a stipend.',
        'Podemos acrescentar um valor.',
        'Diga que um valor para o escritório em casa ajuda.',
        'A home office stipend would help.',
        [
          'a home office stipend would help',
          'a stipend for the home office would help',
          'home office stipend would help'
        ],
        'Stipend é um valor fixo. Home office é o escritório em casa.'
      )
    ]
  },
  {
    id: 'acoes',
    titulo: 'As ações',
    emoji: '💰',
    nivel: 'B2',
    onde: 'A oferta inclui equity.',
    rodadas: [
      fala(
        'Pedido',
        'There is equity in this offer.',
        'Esta oferta tem ações.',
        'Peça para falar das ações.',
        'Could we talk about the equity?',
        [
          'could we talk about the equity',
          'can we talk about the equity',
          'could we discuss the equity'
        ],
        'Equity aqui são as ações. Could we pede com educação.'
      ),
      fala(
        'Troca',
        'It vests over four years.',
        'Veste em quatro anos.',
        'Peça o calendário de vesting.',
        'Please send the vesting schedule.',
        [
          'please send the vesting schedule',
          'please send me the vesting schedule',
          'could you send the vesting schedule'
        ],
        'Vesting schedule é o calendário de quando as ações liberam.'
      )
    ]
  }
];

export const PROJETOS = [
  {
    id: 'tarefas',
    titulo: 'A lista',
    emoji: '🧰',
    nivel: 'B1',
    onde: 'Um app pessoal de tarefas.',
    rodadas: [
      fala(
        'Problema',
        'What problem did the app solve?',
        'Que problema o app resolvia?',
        'Diga que o time perdia as tarefas.',
        'The team kept losing track of tasks.',
        [
          'the team kept losing track of tasks',
          'the team was losing track of tasks',
          'the team lost track of tasks'
        ],
        'Lose track of é perder o fio. Tasks são tarefas.'
      ),
      fala(
        'Stack',
        'What did you build it with?',
        'Com o que você construiu?',
        'Diga que usou JavaScript e uma API pequena.',
        'I used JavaScript and a small API.',
        [
          'i used javascript and a small api',
          'i built it with javascript and a small api',
          'i used javascript and a small api for it'
        ],
        'Stack é a pilha de ferramentas. A small API é uma API pequena.'
      ),
      fala(
        'Resultado',
        'What changed after launch?',
        'O que mudou depois do lançamento?',
        'Diga que o time fechou as tarefas uma semana mais rápido.',
        'The team closed tasks a week faster.',
        [
          'the team closed tasks a week faster',
          'the team finished tasks a week faster',
          'the team closed the tasks a week faster'
        ],
        'Closed tasks é fechou as tarefas. A week faster é uma semana mais rápido.'
      )
    ]
  },
  {
    id: 'indice',
    titulo: 'A busca',
    emoji: '🧰',
    nivel: 'B1',
    onde: 'A busca do projeto pessoal.',
    rodadas: [
      fala(
        'Problema',
        'What was slow?',
        'O que estava lento?',
        'Diga que a busca levava dois segundos.',
        'Search took two seconds.',
        [
          'search took two seconds',
          'the search took two seconds',
          'search took 2 seconds'
        ],
        'Search é a busca. Took two seconds é levava dois segundos.'
      ),
      fala(
        'Stack',
        'What did you change?',
        'O que você mudou?',
        'Diga que usou Postgres e um índice simples.',
        'I used Postgres and a simple index.',
        [
          'i used postgres and a simple index',
          'i added postgres and a simple index',
          'i used postgres with a simple index'
        ],
        'Index é o índice. Simple é simples.'
      ),
      fala(
        'Resultado',
        'How fast is it now?',
        'Quão rápida está agora?',
        'Diga que a busca ficou abaixo de um segundo.',
        'Search now takes under a second.',
        [
          'search now takes under a second',
          'search takes under a second now',
          'the search now takes under a second'
        ],
        'Under a second é abaixo de um segundo.'
      )
    ]
  },
  {
    id: 'caderno',
    titulo: 'O caderno',
    emoji: '🧰',
    nivel: 'A2',
    onde: 'Notas que saíram da planilha.',
    rodadas: [
      fala(
        'Problema',
        'Why did you build it?',
        'Por que você construiu?',
        'Diga que as notas estavam numa planilha.',
        'The notes lived in a spreadsheet.',
        [
          'the notes lived in a spreadsheet',
          'the notes were in a spreadsheet',
          'notes lived in a spreadsheet'
        ],
        'Spreadsheet é planilha. Notes são notas.'
      ),
      fala(
        'Stack',
        'What did you use?',
        'O que você usou?',
        'Diga que foi JavaScript puro, sem etapa de build.',
        'I used plain JavaScript, with no build step.',
        [
          'i used plain javascript with no build step',
          'i used plain javascript and no build step',
          'plain javascript with no build step'
        ],
        'Plain JavaScript é JavaScript puro. Build step é a etapa de build.'
      ),
      fala(
        'Resultado',
        'Did people use it?',
        'As pessoas usaram?',
        'Diga que abriam no celular, sem rede.',
        'People opened it on the phone, offline.',
        [
          'people opened it on the phone offline',
          'people opened it on their phone offline',
          'people used it on the phone offline'
        ],
        'Offline é sem rede. On the phone é no celular.'
      )
    ]
  }
];

export const SOTAQUES = [
  {
    id: 'americano',
    titulo: 'Americano',
    emoji: '🎧',
    nivel: 'B1',
    locale: 'en-US',
    onde: 'Voz en-US, se o aparelho tiver.',
    rodadas: [
      fala(
        'Ouvir',
        'Listen to the American teammate.',
        'Ouça a pessoa dos Estados Unidos.',
        'Ouça e escreva o pedido para olhar o diff.',
        'Please take a look at the diff.',
        [
          'please take a look at the diff',
          'please look at the diff',
          'take a look at the diff'
        ],
        'Diff é a diferença do código. Take a look é dar uma olhada.'
      ),
      fala(
        'Outra',
        'One more line from the same voice.',
        'Mais uma frase da mesma voz.',
        'Ouça e escreva que o build passou na máquina dela.',
        'The build passed on my machine.',
        [
          'the build passed on my machine',
          'the build passed on my computer',
          'build passed on my machine'
        ],
        'Build é a construção. On my machine é na minha máquina.'
      )
    ]
  },
  {
    id: 'britanico',
    titulo: 'Britânico',
    emoji: '🎧',
    nivel: 'B1',
    locale: 'en-GB',
    onde: 'Voz en-GB, se o aparelho tiver.',
    rodadas: [
      fala(
        'Ouvir',
        'Listen to the British teammate.',
        'Ouça a pessoa do Reino Unido.',
        'Ouça e escreva a oferta de marcar a call na quinta.',
        'Shall I book the call for Thursday?',
        [
          'shall i book the call for thursday',
          'shall i book the call on thursday',
          'should i book the call for thursday'
        ],
        'Shall I é um convite. Book the call é marcar a call.'
      ),
      fala(
        'Outra',
        'One more line from the same voice.',
        'Mais uma frase da mesma voz.',
        'Ouça e escreva que os comentários ficaram no doc.',
        'I have left comments on the doc.',
        [
          'i have left comments on the doc',
          'i left comments on the doc',
          'i have left comments on the document'
        ],
        'I have left é o presente perfeito. Doc é o documento.'
      )
    ]
  },
  {
    id: 'indiano',
    titulo: 'Indiano',
    emoji: '🎧',
    nivel: 'B1',
    locale: 'en-IN',
    onde: 'Voz en-IN, se o aparelho tiver.',
    rodadas: [
      fala(
        'Ouvir',
        'Listen to the Indian teammate.',
        'Ouça a pessoa da Índia.',
        'Ouça e escreva o pedido para ver os logs.',
        'Kindly check the error logs.',
        [
          'kindly check the error logs',
          'please check the error logs',
          'kindly check the logs'
        ],
        'Kindly é um por favor comum nesse sotaque. Logs são os registros.'
      ),
      fala(
        'Outra',
        'One more line from the same voice.',
        'Mais uma frase da mesma voz.',
        'Ouça e escreva que o ticket será atualizado até o meio-dia.',
        'I will update the ticket by noon.',
        [
          'i will update the ticket by noon',
          'i will update the ticket before noon',
          'i will update the ticket by midday'
        ],
        'By noon é até o meio-dia. Ticket é o chamado.'
      )
    ]
  }
];

export const FALAS_DIA = [
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que pode começar em duas semanas.', 'I can start in two weeks.', ['i can start in two weeks', 'i can begin in two weeks'], 'In two weeks é em duas semanas.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que a oferta parece justa.', 'The offer looks fair.', ['the offer looks fair', 'this offer looks fair'], 'Fair é justa.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que construiu a primeira versão sozinho.', 'I built the first version alone.', ['i built the first version alone', 'i built the first version by myself'], 'Alone é sozinho.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que vai compartilhar a tela.', 'Let me share my screen.', ['let me share my screen', 'i will share my screen'], 'Share my screen é compartilhar a tela.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que manda o deck hoje.', 'I will send the deck today.', ['i will send the deck today', 'i will send the deck later today'], 'Deck é a apresentação.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que as pessoas pediram busca.', 'The users asked for search.', ['the users asked for search', 'users asked for search'], 'Asked for é pediram.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que testou no celular.', 'I tested it on my phone.', ['i tested it on my phone', 'i tested it on the phone'], 'On my phone é no meu celular.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que escreveu os testes primeiro.', 'I wrote the tests first.', ['i wrote the tests first', 'i wrote tests first'], 'Tests first é os testes primeiro.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que topa conversar sobre a faixa.', 'I am open to discussing the range.', ['i am open to discussing the range', 'i am open to talking about the range'], 'Open to é topar. Range é a faixa.'),
  fala('Fala', 'Your turn.', 'Sua vez.', 'Diga que a API devolve JSON.', 'The API returns JSON.', ['the api returns json', 'this api returns json'], 'Returns é devolve.')
].map((rodada, i) => ({ ...rodada, id: 'dia' + (i + 1), titulo: 'Desafio do dia', etapa: 'Dia' }));

function rngDoDia(dia) {
  let x = 2166136261;
  const texto = String(dia);
  for (let i = 0; i < texto.length; i++) {
    x ^= texto.charCodeAt(i);
    x = Math.imul(x, 16777619);
  }
  x >>>= 0;
  if (!x) x = 1;
  return () => {
    x = (Math.imul(1664525, x) + 1013904223) >>> 0;
    return x / 4294967296;
  };
}

function embaralharCom(rng, lista) {
  const arr = [...lista];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export function frasesDoDesafio(sequencia) {
  const n = Number.isFinite(Number(sequencia)) ? Math.max(0, Math.floor(Number(sequencia))) : 0;
  return Math.min(FRASES_TETO, FRASES_INICIAIS + n);
}

export function montarDesafio(dia, sequencia) {
  if (typeof dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return null;
  const n = frasesDoDesafio(sequencia);
  const escolhidas = embaralharCom(rngDoDia('desafio:' + dia), FALAS_DIA).slice(0, n);
  return {
    id: 'desafiodia',
    titulo: 'Desafio do dia',
    emoji: '📅',
    nivel: 'misto',
    onde: `${n} frases`,
    rodadas: escolhidas.map(item => ({ ...item }))
  };
}

export function textoDesafio({ feito, sequencia, frases }) {
  const n = `${frases} frase${frases > 1 ? 's' : ''}`;
  const dias = `${sequencia} dia${sequencia > 1 ? 's' : ''}`;
  if (feito) {
    const amanha = frases >= FRASES_TETO ? 'Amanhã continua em 6 frases.' : 'Amanhã entra mais uma frase.';
    return `Feito hoje. Sequência de ${dias}. ${amanha}`;
  }
  if (sequencia > 0) return `Sequência de ${dias}. Hoje são ${n}.`;
  return `Hoje são ${n}. Termine para abrir a sequência.`;
}

export function rotuloVoz(resultado, locale) {
  if (!resultado?.falou) return 'Sem voz neste navegador. A missão em português basta para responder.';
  if (resultado.voz?.nome) return `Voz do aparelho: ${resultado.voz.nome} (${resultado.voz.lang}).`;
  return `Sem voz ${locale} neste aparelho. A frase toca na voz padrão, com o idioma pedido.`;
}

export function salarioPorId(id) {
  return SALARIOS.find(c => c.id === id) ?? null;
}

export function projetoPorId(id) {
  return PROJETOS.find(c => c.id === id) ?? null;
}

export function sotaquePorId(id) {
  return SOTAQUES.find(c => c.id === id) ?? null;
}

export function avaliarSalario(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarProjeto(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSotaque(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDesafio(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
