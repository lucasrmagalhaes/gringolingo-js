// Nomes do disco, saída do serviço e cache que vence junto.
// A última fala usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const INODOS = [
  {
    id: 'nomeslivres',
    titulo: 'Nomes livres',
    emoji: '📛',
    nivel: 'A2',
    onde: 'O volume ficou sem nome livre.',
    rodadas: [
      fala(
        'Acaba',
        'What ran out on the disk?',
        'O que acabou no disco?',
        'Diga que o disco ficou sem nomes de arquivo.',
        'The disk ran out of file names.',
        [
          'the disk ran out of file names',
          'that disk ran out of file names',
          'the disk ran out of names'
        ],
        'File names são os nomes de arquivo.'
      ),
      fala(
        'Volta',
        'Can a new file appear?',
        'Um arquivo novo pode aparecer?',
        'Diga que o arquivo novo não aparece.',
        'The new file cannot appear.',
        [
          'the new file cannot appear',
          'that new file cannot appear',
          'the new file cannot appear now'
        ],
        'Cannot appear é não pode aparecer.'
      )
    ]
  },
  {
    id: 'zeronomes',
    titulo: 'Zero nomes',
    emoji: '📛',
    nivel: 'B1',
    onde: 'Não resta nenhum nome livre.',
    rodadas: [
      fala(
        'Acaba',
        'How many names remain?',
        'Quantos nomes restam?',
        'Diga que restam zero nomes.',
        'Zero names remain.',
        [
          'zero names remain',
          '0 names remain',
          'zero file names remain'
        ],
        'Zero names remain é restam zero nomes.'
      ),
      fala(
        'Volta',
        'What should we remove?',
        'O que a gente remove?',
        'Peça para apagar um arquivo velho.',
        'Please delete an old file.',
        [
          'please delete an old file',
          'delete an old file',
          'please delete that old file'
        ],
        'Delete an old file é apagar um arquivo velho.'
      )
    ]
  },
  {
    id: 'nomevolta',
    titulo: 'Nome de volta',
    emoji: '📛',
    nivel: 'B1',
    onde: 'O volume voltou a ter nome livre.',
    rodadas: [
      fala(
        'Acaba',
        'Does the disk have free names?',
        'O disco tem nomes livres?',
        'Diga que o disco tem nomes livres de novo.',
        'The disk has free names again.',
        [
          'the disk has free names again',
          'that disk has free names again',
          'the disk has free names'
        ],
        'Free names again é nomes livres de novo.'
      ),
      fala(
        'Volta',
        'Can the new file appear now?',
        'O arquivo novo pode aparecer agora?',
        'Diga que o arquivo novo pode aparecer.',
        'The new file can appear.',
        [
          'the new file can appear',
          'that new file can appear',
          'the new file can appear now'
        ],
        'Can appear é pode aparecer.'
      )
    ]
  }
];

export const SAIDAS = [
  {
    id: 'sinalstop',
    titulo: 'Sinal recebido',
    emoji: '🛎️',
    nivel: 'A2',
    onde: 'O serviço recebeu o aviso de parar.',
    rodadas: [
      fala(
        'Recebe',
        'What did the service get?',
        'O que o serviço recebeu?',
        'Diga que o serviço recebeu o sinal de parar.',
        'The service got the stop signal.',
        [
          'the service got the stop signal',
          'that service got the stop signal',
          'the service got a stop signal'
        ],
        'Stop signal é o sinal de parar.'
      ),
      fala(
        'Espera',
        'What happens to open tasks?',
        'O que acontece com as tarefas abertas?',
        'Diga que as tarefas abertas continuam.',
        'Open tasks keep running.',
        [
          'open tasks keep running',
          'those open tasks keep running',
          'the open tasks keep running'
        ],
        'Keep running é continuam rodando.'
      )
    ]
  },
  {
    id: 'esperaaberta',
    titulo: 'Espera aberta',
    emoji: '🛎️',
    nivel: 'B1',
    onde: 'A saída espera as tarefas abertas.',
    rodadas: [
      fala(
        'Recebe',
        'How long does the shutdown wait?',
        'Quanto tempo a saída espera?',
        'Diga que a saída espera trinta segundos.',
        'The shutdown waits thirty seconds.',
        [
          'the shutdown waits thirty seconds',
          'the shutdown waits 30 seconds',
          'that shutdown waits thirty seconds'
        ],
        'Thirty seconds é trinta segundos.'
      ),
      fala(
        'Espera',
        'Should new tasks start?',
        'Tarefas novas devem começar?',
        'Diga que tarefas novas devem esperar.',
        'New tasks should wait.',
        [
          'new tasks should wait',
          'those new tasks should wait',
          'new tasks should wait now'
        ],
        'Should wait é devem esperar.'
      )
    ]
  },
  {
    id: 'servicoquieto',
    titulo: 'Serviço quieto',
    emoji: '🛎️',
    nivel: 'B1',
    onde: 'O serviço parou sem deixar tarefa aberta.',
    rodadas: [
      fala(
        'Recebe',
        'How did the service stop?',
        'Como o serviço parou?',
        'Diga que o serviço parou de forma limpa.',
        'The service stopped cleanly.',
        [
          'the service stopped cleanly',
          'that service stopped cleanly',
          'the service stopped clean'
        ],
        'Stopped cleanly é parou de forma limpa.'
      ),
      fala(
        'Espera',
        'Is any task still open?',
        'Alguma tarefa ainda está aberta?',
        'Diga que nenhuma tarefa continua aberta.',
        'No task is still open.',
        [
          'no task is still open',
          'no task is open',
          'no task is still open now'
        ],
        'Still open é ainda aberta.'
      )
    ]
  }
];

export const MANADAS = [
  {
    id: 'cachejunto',
    titulo: 'Cache junto',
    emoji: '🐑',
    nivel: 'A2',
    onde: 'O cache venceu tudo de uma vez.',
    rodadas: [
      fala(
        'Cai',
        'What happened to the cache?',
        'O que houve com o cache?',
        'Diga que o cache venceu tudo de uma vez.',
        'The cache expired all at once.',
        [
          'the cache expired all at once',
          'that cache expired all at once',
          'the cache expired at once'
        ],
        'All at once é tudo de uma vez.'
      ),
      fala(
        'Segura',
        'Where did every call fall?',
        'Onde cada chamada caiu?',
        'Diga que cada chamada caiu no banco.',
        'Every call fell on the database.',
        [
          'every call fell on the database',
          'every call fell on that database',
          'each call fell on the database'
        ],
        'Fell on the database é caiu no banco.'
      )
    ]
  },
  {
    id: 'cembuscas',
    titulo: 'Cem pedidos',
    emoji: '🐑',
    nivel: 'B1',
    onde: 'Cem pedidos bateram no banco juntos.',
    rodadas: [
      fala(
        'Cai',
        'How many requests hit the database?',
        'Quantos pedidos bateram no banco?',
        'Diga que cem pedidos bateram no banco.',
        'One hundred requests hit the database.',
        [
          'one hundred requests hit the database',
          '100 requests hit the database',
          'one hundred requests hit that database'
        ],
        'One hundred é cem.'
      ),
      fala(
        'Segura',
        'What should we warm first?',
        'O que a gente aquece primeiro?',
        'Peça para aquecer o cache antes.',
        'Please warm the cache first.',
        [
          'please warm the cache first',
          'warm the cache first',
          'please warm that cache first'
        ],
        'Warm the cache é aquecer o cache.'
      )
    ]
  },
  {
    id: 'cachecalmo',
    titulo: 'Cache calmo',
    emoji: '🐑',
    nivel: 'B1',
    onde: 'O cache vence em grupos pequenos.',
    rodadas: [
      fala(
        'Cai',
        'How does the cache expire now?',
        'Como o cache vence agora?',
        'Diga que o cache vence em grupos pequenos.',
        'The cache expires in small groups.',
        [
          'the cache expires in small groups',
          'that cache expires in small groups',
          'the cache expires in groups'
        ],
        'Small groups são grupos pequenos.'
      ),
      fala(
        'Segura',
        'How is the database now?',
        'Como está o banco agora?',
        'Diga que o banco continua calmo.',
        'The database stays calm.',
        [
          'the database stays calm',
          'that database stays calm',
          'the database stays calm now'
        ],
        'Stays calm é continua calmo.'
      )
    ]
  }
];

export function inodoPorId(id) {
  return INODOS.find(c => c.id === id) ?? null;
}

export function saidaPorId(id) {
  return SAIDAS.find(c => c.id === id) ?? null;
}

export function manadaPorId(id) {
  return MANADAS.find(c => c.id === id) ?? null;
}

export function avaliarInodo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSaida(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarManada(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
