// Requisitos com o cliente, métricas, um erro que virou lição
// e o passeio só áudio. A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

export const ESPERA_RESPOSTA_MS = 8000;

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const REQUISITOS = [
  {
    id: 'usuario',
    titulo: 'Quem usa',
    emoji: '🗒️',
    nivel: 'A2',
    onde: 'O cliente ainda não disse quem usa.',
    rodadas: [
      fala(
        'Pergunta',
        'Who uses this, and how often?',
        'Quem usa isso, e com que frequência?',
        'Diga que gestores usam toda segunda.',
        'Managers use it every Monday.',
        [
          'managers use it every monday',
          'the managers use it every monday',
          'managers use this every monday'
        ],
        'Managers são os gestores. Every Monday é toda segunda.'
      ),
      fala(
        'Confirma',
        'So you want a weekly report for managers.',
        'Então você quer um relatório semanal para gestores.',
        'Confirme o relatório semanal para gestores.',
        'Yes. A weekly report for managers.',
        [
          'yes a weekly report for managers',
          'a weekly report for managers',
          'yes weekly report for managers'
        ],
        'Weekly report é o relatório da semana. Confirme com yes.'
      )
    ]
  },
  {
    id: 'fora',
    titulo: 'Fora desta release',
    emoji: '🗒️',
    nivel: 'B1',
    onde: 'A release está grande demais.',
    rodadas: [
      fala(
        'Pergunta',
        'What should we leave out of this release?',
        'O que deixamos fora desta release?',
        'Diga para deixar a exportação fora desta release.',
        'Leave export out of this release.',
        [
          'leave export out of this release',
          'leave the export out of this release',
          'let us leave export out of this release'
        ],
        'Leave out é deixar de fora. Export é a exportação.'
      ),
      fala(
        'Confirma',
        'So search stays, and export waits.',
        'Então a busca fica, e a exportação espera.',
        'Confirme que a busca fica e a exportação espera.',
        'Yes. Search stays, and export waits.',
        [
          'yes search stays and export waits',
          'search stays and export waits',
          'yes search stays export waits'
        ],
        'Stays é fica. Waits é espera.'
      )
    ]
  },
  {
    id: 'sucesso',
    titulo: 'O sinal',
    emoji: '🗒️',
    nivel: 'B1',
    onde: 'O pedido ainda não tem um sinal de sucesso.',
    rodadas: [
      fala(
        'Pergunta',
        'How will we know it worked?',
        'Como vamos saber que funcionou?',
        'Diga que saberemos se o tempo da tarefa cair.',
        'We will know if the task time drops.',
        [
          'we will know if the task time drops',
          'we know if the task time drops',
          'we will know it worked if the task time drops'
        ],
        'Task time é o tempo da tarefa. Drops é cai.'
      ),
      fala(
        'Confirma',
        'So success means a shorter task time.',
        'Então sucesso quer dizer um tempo menor de tarefa.',
        'Confirme que sucesso é um tempo menor de tarefa.',
        'Yes. Success means a shorter task time.',
        [
          'yes success means a shorter task time',
          'success means a shorter task time',
          'yes a shorter task time means success'
        ],
        'Shorter é mais curto. Success é o sucesso.'
      )
    ]
  }
];

export const METRICAS = [
  {
    id: 'adesao',
    titulo: 'Os cadastros',
    emoji: '📈',
    nivel: 'B1',
    onde: 'O mês fechou e o cliente quer o número.',
    rodadas: [
      fala(
        'Número',
        'How did signups move this month?',
        'Como os cadastros andaram neste mês?',
        'Diga que os cadastros cresceram vinte por cento.',
        'Signups grew twenty percent this month.',
        [
          'signups grew twenty percent this month',
          'signups grew 20 percent this month',
          'signups grew by twenty percent this month'
        ],
        'Signups são os cadastros. Twenty percent é vinte por cento.'
      ),
      fala(
        'Leitura',
        'And how many is that?',
        'E quantos são esses?',
        'Diga que foram duzentos cadastros novos.',
        'We had two hundred new signups.',
        [
          'we had two hundred new signups',
          'we had 200 new signups',
          'there were two hundred new signups'
        ],
        'Two hundred é duzentos. New signups são cadastros novos.'
      )
    ]
  },
  {
    id: 'taxa',
    titulo: 'A taxa',
    emoji: '📈',
    nivel: 'B1',
    onde: 'A taxa de erro mudou.',
    rodadas: [
      fala(
        'Número',
        'What happened to the error rate?',
        'O que aconteceu com a taxa de erro?',
        'Diga que a taxa caiu de cinco por cento para três.',
        'The error rate fell from five percent to three.',
        [
          'the error rate fell from five percent to three',
          'the error rate fell from 5 percent to 3',
          'the error rate fell from five percent to three percent'
        ],
        'Error rate é a taxa de erro. Fell é caiu.'
      ),
      fala(
        'Leitura',
        'How do you read that change?',
        'Como você lê essa mudança?',
        'Diga que são dois pontos a menos que no mês passado.',
        'That is two points lower than last month.',
        [
          'that is two points lower than last month',
          'that is 2 points lower than last month',
          'it is two points lower than last month'
        ],
        'Two points é dois pontos. Lower than é menor que.'
      )
    ]
  },
  {
    id: 'retencao',
    titulo: 'Quem volta',
    emoji: '📈',
    nivel: 'B1',
    onde: 'A base ativa da semana cresceu.',
    rodadas: [
      fala(
        'Número',
        'How did weekly active users move?',
        'Como andaram os usuários ativos da semana?',
        'Diga que subiram quinze por cento.',
        'Weekly active users rose by fifteen percent.',
        [
          'weekly active users rose by fifteen percent',
          'weekly active users rose by 15 percent',
          'weekly active users rose fifteen percent'
        ],
        'Weekly active users são quem volta na semana. Rose é subiu.'
      ),
      fala(
        'Leitura',
        'What does that growth mean?',
        'O que esse crescimento quer dizer?',
        'Diga que mais gente volta a cada semana.',
        'More people come back each week.',
        [
          'more people come back each week',
          'more people come back every week',
          'that means more people come back each week'
        ],
        'Come back é voltar. Each week é a cada semana.'
      )
    ]
  }
];

export const APRENDIZADOS = [
  {
    id: 'deploy',
    titulo: 'Sem rollback',
    emoji: '📖',
    nivel: 'B1',
    onde: 'A correção saiu sem rede de segurança.',
    rodadas: [
      fala(
        'Erro',
        'Tell me about a release that went wrong.',
        'Me conte uma release que deu errado.',
        'Conte que publicou a correção sem plano de rollback.',
        'I shipped the fix with no rollback plan.',
        [
          'i shipped the fix with no rollback plan',
          'i shipped the fix without a rollback plan',
          'i shipped a fix with no rollback plan'
        ],
        'Shipped é publicou. Rollback plan é o plano de volta.'
      ),
      fala(
        'Efeito',
        'What happened next?',
        'O que aconteceu depois?',
        'Diga que a página inicial ficou em branco por vinte minutos.',
        'The homepage was blank for twenty minutes.',
        [
          'the homepage was blank for twenty minutes',
          'the homepage was blank for 20 minutes',
          'the home page was blank for twenty minutes'
        ],
        'Homepage é a página inicial. Blank é em branco.'
      ),
      fala(
        'Lição',
        'What did you learn?',
        'O que você aprendeu?',
        'Diga que aprendeu a escrever o rollback primeiro.',
        'I learned to write the rollback first.',
        [
          'i learned to write the rollback first',
          'i learned to write a rollback first',
          'i learned to prepare the rollback first'
        ],
        'First é primeiro. A lição vem depois do efeito.'
      )
    ]
  },
  {
    id: 'alerta',
    titulo: 'Teste vermelho',
    emoji: '📖',
    nivel: 'B1',
    onde: 'O teste vermelho passou batido.',
    rodadas: [
      fala(
        'Erro',
        'What did you merge too soon?',
        'O que você juntou cedo demais?',
        'Conte que juntou o código com um teste vermelho.',
        'I merged with a red test.',
        [
          'i merged with a red test',
          'i merged it with a red test',
          'i merged while a test was red'
        ],
        'Merged é juntou no branch. Red test é o teste que falha.'
      ),
      fala(
        'Efeito',
        'Who saw the bug?',
        'Quem viu o bug?',
        'Diga que o bug apareceu para cada usuário.',
        'The bug showed up for every user.',
        [
          'the bug showed up for every user',
          'the bug showed up for all users',
          'the bug appeared for every user'
        ],
        'Showed up é apareceu. Every user é cada usuário.'
      ),
      fala(
        'Lição',
        'What do you do now?',
        'O que você faz agora?',
        'Diga que aprendeu a ler o teste vermelho primeiro.',
        'I learned to read the red test first.',
        [
          'i learned to read the red test first',
          'i learned to check the red test first',
          'i learned to read a red test first'
        ],
        'Read the red test é olhar o teste que falhou, antes de juntar.'
      )
    ]
  },
  {
    id: 'chamada',
    titulo: 'O nome do campo',
    emoji: '📖',
    nivel: 'B2',
    onde: 'O nome do campo não dizia nada.',
    rodadas: [
      fala(
        'Erro',
        'What was unclear in the code?',
        'O que ficou pouco claro no código?',
        'Conte que chamou o campo novo de data.',
        'I called the new field data.',
        [
          'i called the new field data',
          'i named the new field data',
          'i called the field data'
        ],
        'Field é o campo. Data sozinho não diz qual dado.'
      ),
      fala(
        'Efeito',
        'What did the next reader miss?',
        'O que a próxima pessoa não entendeu?',
        'Diga que a próxima pessoa não sabia qual dado era.',
        'The next reader did not know which data.',
        [
          'the next reader did not know which data',
          'the next reader did not know which data it was',
          'the next person did not know which data'
        ],
        'Next reader é quem lê depois. Which é qual.'
      ),
      fala(
        'Lição',
        'What did the name teach you?',
        'O que o nome te ensinou?',
        'Diga que aprendeu a nomear o campo para uma coisa só.',
        'I learned to name the field for one thing.',
        [
          'i learned to name the field for one thing',
          'i learned to name a field for one thing',
          'i learned to name the field for a single thing'
        ],
        'One thing é uma coisa só. O nome precisa dizer o quê.'
      )
    ]
  }
];

export const PASSEIOS = [
  {
    id: 'suporte',
    titulo: 'O time',
    emoji: '🚶',
    nivel: 'A2',
    onde: 'Uma frase, andando.',
    rodadas: [
      fala(
        'Passeio',
        'Who is this for?',
        'Para quem é isso?',
        'Diga que é para o time de suporte.',
        'It is for the support team.',
        [
          'it is for the support team',
          'this is for the support team',
          'it is for support'
        ],
        'Support team é o time de suporte.'
      )
    ]
  },
  {
    id: 'quemusa',
    titulo: 'Quem usa',
    emoji: '🚶',
    nivel: 'A2',
    onde: 'Uma pergunta curta.',
    rodadas: [
      fala(
        'Passeio',
        'Ask who uses it.',
        'Pergunte quem usa.',
        'Pergunte quem usa esta função.',
        'Who uses this feature?',
        [
          'who uses this feature',
          'who uses the feature',
          'who uses this'
        ],
        'Feature é a função. A pergunta começa com who.'
      )
    ]
  },
  {
    id: 'subiu',
    titulo: 'Quinze por cento',
    emoji: '🚶',
    nivel: 'B1',
    onde: 'Um número, andando.',
    rodadas: [
      fala(
        'Passeio',
        'How much did it grow?',
        'Quanto cresceu?',
        'Diga que subiu quinze por cento.',
        'It rose fifteen percent.',
        [
          'it rose fifteen percent',
          'it rose 15 percent',
          'it rose by fifteen percent'
        ],
        'Rose é subiu. Fifteen percent é quinze por cento.'
      )
    ]
  },
  {
    id: 'cairam',
    titulo: 'Os erros',
    emoji: '🚶',
    nivel: 'A2',
    onde: 'O movimento da taxa.',
    rodadas: [
      fala(
        'Passeio',
        'What happened to the errors?',
        'O que aconteceu com os erros?',
        'Diga que os erros caíram.',
        'The errors went down.',
        [
          'the errors went down',
          'errors went down',
          'the error count went down'
        ],
        'Went down é caíram.'
      )
    ]
  },
  {
    id: 'pulou',
    titulo: 'A revisão',
    emoji: '🚶',
    nivel: 'B1',
    onde: 'Um erro curto.',
    rodadas: [
      fala(
        'Passeio',
        'What did you skip?',
        'O que você pulou?',
        'Diga que pulou a revisão.',
        'I skipped the review.',
        [
          'i skipped the review',
          'i skipped review',
          'i skipped the code review'
        ],
        'Skipped é pulou. Review é a revisão.'
      )
    ]
  },
  {
    id: 'antes',
    titulo: 'Antes de construir',
    emoji: '🚶',
    nivel: 'B1',
    onde: 'A lição, em uma frase.',
    rodadas: [
      fala(
        'Passeio',
        'What do you do before you build?',
        'O que você faz antes de construir?',
        'Diga que agora pergunta antes de construir.',
        'Now I ask before I build.',
        [
          'now i ask before i build',
          'i ask before i build',
          'now i ask before building'
        ],
        'Ask é perguntar. Before é antes.'
      )
    ]
  }
];

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

export function requisitoPorId(id) {
  return REQUISITOS.find(c => c.id === id) ?? null;
}

export function metricaPorId(id) {
  return METRICAS.find(c => c.id === id) ?? null;
}

export function aprendizadoPorId(id) {
  return APRENDIZADOS.find(c => c.id === id) ?? null;
}

export function montarPasseio(dia) {
  if (typeof dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return null;
  const escolhidas = embaralharCom(rngDoDia('passeio:' + dia), PASSEIOS).slice(0, 4);
  return {
    id: 'passeiodia',
    titulo: 'Só áudio',
    emoji: '🚶',
    nivel: 'misto',
    onde: 'Quatro frases',
    rodadas: escolhidas.map(item => ({ ...item.rodadas[0], id: item.id }))
  };
}

export function decidirPasseio(texto, rodada) {
  const dito = String(texto ?? '');
  if (!dito.trim()) {
    return { seguiu: false, aval: null, falar: 'Sem resposta. Próxima.', lang: 'pt-BR' };
  }
  const aval = avaliarResposta(rodada, dito);
  if (aval.ok && !aval.quase) return { seguiu: true, aval, falar: 'Nice.', lang: 'en-US' };
  return { seguiu: true, aval, falar: aval.melhor, lang: 'en-US' };
}

export function falasDaPergunta(rodada) {
  return [
    { texto: rodada?.npc?.en || '', lang: 'en-US' },
    { texto: rodada?.missao || '', lang: 'pt-BR' }
  ];
}

export function avaliarRequisito(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMetrica(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAprendizado(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPasseio(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
