// Bug que só aparece às vezes, mentoria com calma e o limite da folga.
// As perguntas abertas do dia contam palavras e tempo. Nada sai do aparelho.

import { avaliarResposta, normalizarFala } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PISTAS = [
  {
    id: 'asvezes',
    titulo: 'Às vezes',
    emoji: '🏁',
    nivel: 'B1',
    onde: 'O bug não aparece em toda tentativa.',
    rodadas: [
      fala(
        'Sintoma',
        'Does it fail every time?',
        'Ele falha toda vez?',
        'Diga que só falha às vezes.',
        'It fails only sometimes.',
        [
          'it fails only sometimes',
          'it only fails sometimes',
          'the bug fails only sometimes'
        ],
        'Only sometimes é só às vezes. Fails é falha.'
      ),
      fala(
        'Prova',
        'How often did you see it?',
        'Quantas vezes você viu?',
        'Diga que viu duas vezes hoje de manhã.',
        'I saw it twice this morning.',
        [
          'i saw it twice this morning',
          'i saw it two times this morning',
          'i saw it 2 times this morning'
        ],
        'Twice é duas vezes. This morning é hoje de manhã.'
      )
    ]
  },
  {
    id: 'doiscliques',
    titulo: 'Dois cliques',
    emoji: '🏁',
    nivel: 'B1',
    onde: 'Dois cliques juntos disparam a corrida.',
    rodadas: [
      fala(
        'Sintoma',
        'What starts the race?',
        'O que começa a corrida?',
        'Diga que dois cliques ao mesmo tempo causam a corrida.',
        'Two clicks at once cause the race.',
        [
          'two clicks at once cause the race',
          '2 clicks at once cause the race',
          'two clicks at the same time cause the race'
        ],
        'At once é ao mesmo tempo. The race é a corrida entre as duas chamadas.'
      ),
      fala(
        'Prova',
        'What do the two clicks do?',
        'O que os dois cliques fazem?',
        'Diga que o segundo clique começa antes do primeiro terminar.',
        'The second click starts before the first ends.',
        [
          'the second click starts before the first ends',
          'the second click starts before the first one ends',
          'the 2nd click starts before the first ends'
        ],
        'Before the first ends é antes do primeiro terminar.'
      )
    ]
  },
  {
    id: 'ganhou',
    titulo: 'O log',
    emoji: '🏁',
    nivel: 'B2',
    onde: 'O log mostra qual chamada chegou na frente.',
    rodadas: [
      fala(
        'Sintoma',
        'What does the log show?',
        'O que o log mostra?',
        'Diga que o log mostra que a segunda chamada ganhou.',
        'The log shows the second call won.',
        [
          'the log shows the second call won',
          'the log shows that the second call won',
          'the log shows the 2nd call won'
        ],
        'The log é o registro. Won é ganhou.'
      ),
      fala(
        'Prova',
        'Do you still have the log?',
        'Você ainda tem o log?',
        'Diga que guardou o log da execução que falhou.',
        'I saved the log from the failed run.',
        [
          'i saved the log from the failed run',
          'i kept the log from the failed run',
          'i saved the log of the failed run'
        ],
        'Saved é guardei. Failed run é a execução que falhou.'
      )
    ]
  }
];

export const CALMAS = [
  {
    id: 'comcalma',
    titulo: 'Um passo',
    emoji: '🐢',
    nivel: 'A2',
    onde: 'O júnior quer a resposta inteira de uma vez.',
    rodadas: [
      fala(
        'Passo',
        'This feels like a lot. Can you slow down?',
        'Está muita coisa. Você pode ir mais devagar?',
        'Diga que vocês vão passo a passo.',
        'Let us walk through it one step at a time.',
        [
          'let us walk through it one step at a time',
          'lets walk through it one step at a time',
          'let us go through it one step at a time'
        ],
        'One step at a time é um passo de cada vez. Walk through é percorrer juntos.'
      ),
      fala(
        'Ideia',
        'Where should I look first?',
        'Onde eu olho primeiro?',
        'Peça para dizer qual linha leu primeiro.',
        'Tell me which line you read first.',
        [
          'tell me which line you read first',
          'tell me the first line you read',
          'tell me which line you read'
        ],
        'Which line é qual linha. First é primeiro.'
      )
    ]
  },
  {
    id: 'promessa',
    titulo: 'A promessa',
    emoji: '🐢',
    nivel: 'B1',
    onde: 'O júnior acha que o valor já está pronto.',
    rodadas: [
      fala(
        'Passo',
        'Is the value already here?',
        'O valor já está aqui?',
        'Diga que uma promessa é um valor que chega depois.',
        'A promise is a value that arrives later.',
        [
          'a promise is a value that arrives later',
          'a promise is a value that comes later',
          'promise is a value that arrives later'
        ],
        'A promise é a promessa. Arrives later é chega depois.'
      ),
      fala(
        'Ideia',
        'So what do I do with it?',
        'E o que eu faço com ela?',
        'Diga para esperar e só então ler o resultado.',
        'You wait for it, then you read the result.',
        [
          'you wait for it then you read the result',
          'you wait for it and then you read the result',
          'wait for it then you read the result'
        ],
        'Wait for it é esperar. The result é o resultado.'
      )
    ]
  },
  {
    id: 'caixa',
    titulo: 'A caixa vazia',
    emoji: '🐢',
    nivel: 'A2',
    onde: 'O primeiro teste do júnior pode ser a caixa vazia.',
    rodadas: [
      fala(
        'Passo',
        'What should I try first?',
        'O que eu tento primeiro?',
        'Peça para tentar a caixa vazia e contar o que vê.',
        'Try the empty box and tell me what you see.',
        [
          'try the empty box and tell me what you see',
          'open the empty box and tell me what you see',
          'try the empty box and tell me what you find'
        ],
        'Empty box é a caixa vazia. Tell me what you see é me conte o que você vê.'
      ),
      fala(
        'Ideia',
        'Is that too small a test?',
        'Esse teste é pequeno demais?',
        'Diga que a caixa vazia é um bom primeiro teste.',
        'An empty box is a fine first try.',
        [
          'an empty box is a fine first try',
          'the empty box is a fine first try',
          'an empty box is a good first try'
        ],
        'A fine first try é um bom primeiro teste.'
      )
    ]
  }
];

export const FOLGAS = [
  {
    id: 'dezembro',
    titulo: 'Dezembro',
    emoji: '🏖️',
    nivel: 'B1',
    onde: 'Você avisa a semana em que vai ficar fora.',
    rodadas: [
      fala(
        'Plano',
        'Will you be here next month?',
        'Você vai estar aqui no mês que vem?',
        'Diga que fica fora na primeira semana de dezembro.',
        'I will be out the first week of December.',
        [
          'i will be out the first week of december',
          'i am out the first week of december',
          'i will be away the first week of december'
        ],
        'Out é fora. The first week of December é a primeira semana de dezembro.'
      ),
      fala(
        'Limite',
        'What should we do before that?',
        'O que a gente faz antes disso?',
        'Peça para planejar a publicação antes de você sair.',
        'Please plan the release before I leave.',
        [
          'please plan the release before i leave',
          'please plan the release before i go',
          'plan the release before i leave'
        ],
        'The release é a publicação. Before I leave é antes de eu sair.'
      )
    ]
  },
  {
    id: 'depois7',
    titulo: 'Depois das sete',
    emoji: '🏖️',
    nivel: 'A2',
    onde: 'A noite é sua. O chat espera até de manhã.',
    rodadas: [
      fala(
        'Plano',
        'Can I message you tonight?',
        'Posso te mandar mensagem hoje à noite?',
        'Diga que não responde mensagens depois das sete.',
        'I do not answer messages after seven.',
        [
          'i do not answer messages after seven',
          'i do not answer messages after 7',
          'i do not reply to messages after seven'
        ],
        'After seven é depois das sete. Messages são as mensagens.'
      ),
      fala(
        'Limite',
        'When will you see them?',
        'Quando você vê as mensagens?',
        'Diga que lê na manhã seguinte.',
        'I will read them the next morning.',
        [
          'i will read them the next morning',
          'i read them the next morning',
          'i will read the messages the next morning'
        ],
        'The next morning é a manhã seguinte.'
      )
    ]
  },
  {
    id: 'duasemanas',
    titulo: 'Duas semanas',
    emoji: '🏖️',
    nivel: 'B1',
    onde: 'As férias são duas semanas inteiras.',
    rodadas: [
      fala(
        'Plano',
        'How long will you be away?',
        'Por quanto tempo você fica fora?',
        'Diga que precisa das duas semanas inteiras.',
        'I need the full two weeks off.',
        [
          'i need the full two weeks off',
          'i need the full 2 weeks off',
          'i need two full weeks off'
        ],
        'The full two weeks é as duas semanas inteiras. Off é de folga.'
      ),
      fala(
        'Limite',
        'Who covers your tasks?',
        'Quem cobre as suas tarefas?',
        'Diga que um colega cobre as suas tarefas.',
        'A teammate will cover my tasks.',
        [
          'a teammate will cover my tasks',
          'a teammate covers my tasks',
          'one teammate will cover my tasks'
        ],
        'A teammate é um colega. Cover é cobrir.'
      )
    ]
  }
];

export const PERGUNTAS_ABERTAS = [
  { id: 'qbug', en: 'Tell me about a bug you chased for more than a day.', pt: 'Conte um bug que você perseguiu por mais de um dia.' },
  { id: 'qjunior', en: 'How do you help a junior who is stuck?', pt: 'Como você ajuda um júnior que travou?' },
  { id: 'qnoite', en: 'What do you do when work spills into the evening?', pt: 'O que você faz quando o trabalho invade a noite?' },
  { id: 'qajuda', en: 'Tell me about a time you asked for help.', pt: 'Conte uma vez em que você pediu ajuda.' },
  { id: 'qideia', en: 'How do you explain a hard idea to someone new?', pt: 'Como você explica uma ideia difícil para alguém novo?' },
  { id: 'qdia', en: 'What does a good day off look like for you?', pt: 'Como é um bom dia de folga para você?' },
  { id: 'qjunto', en: 'Tell me about a change you shipped with a teammate.', pt: 'Conte uma mudança que você publicou com um colega.' },
  { id: 'qordem', en: 'How do you decide what to finish first?', pt: 'Como você decide o que terminar primeiro?' },
  { id: 'qreview', en: 'What did you learn from a review comment?', pt: 'O que você aprendeu com um comentário de review?' },
  { id: 'qsemana', en: 'How do you keep a long task from taking the weekend?', pt: 'Como você impede que uma tarefa longa tome o fim de semana?' }
];

export const LIMITE_ABERTAS = 5;
export const MINIMO_PALAVRAS = 8;

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

export function montarAbertas(dia) {
  return embaralharCom(rngDoDia(String(dia || '')), PERGUNTAS_ABERTAS).slice(0, LIMITE_ABERTAS);
}

export function contarPalavras(texto) {
  const norma = normalizarFala(texto);
  if (!norma) return 0;
  return norma.split(' ').filter(Boolean).length;
}

export function avaliarAberta(texto, segundos) {
  const palavras = contarPalavras(texto);
  const tempo = Number.isFinite(Number(segundos)) ? Math.max(0, Math.round(Number(segundos))) : 0;
  const ok = palavras >= MINIMO_PALAVRAS;
  return { ok, palavras, segundos: tempo, nota: ok ? 100 : 0 };
}

export function textoDaAberta(aval) {
  const palavras = Number(aval?.palavras) || 0;
  const segundos = Number(aval?.segundos) || 0;
  const rotuloPalavras = palavras === 1 ? '1 palavra' : `${palavras} palavras`;
  const rotuloTempo = segundos === 1 ? '1 segundo' : `${segundos} segundos`;
  const base = `${rotuloPalavras} em ${rotuloTempo}.`;
  if (aval?.ok) return base;
  return `${base} O mínimo é ${MINIMO_PALAVRAS} palavras.`;
}

export function textoDasAbertas(lista) {
  const n = Array.isArray(lista) ? lista.length : 0;
  return `${n} perguntas de hoje. Cada resposta conta palavras e tempo.`;
}

export function pistaPorId(id) {
  return PISTAS.find(c => c.id === id) ?? null;
}

export function calmaPorId(id) {
  return CALMAS.find(c => c.id === id) ?? null;
}

export function folgaPorId(id) {
  return FOLGAS.find(c => c.id === id) ?? null;
}

export function avaliarPista(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCalma(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFolga(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
