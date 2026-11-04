// Ensaio antes da produção, disco cheio e página com poucas linhas.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const ENSAIOS = [
  {
    id: 'soensaio',
    titulo: 'No ensaio',
    emoji: '🧪',
    nivel: 'B1',
    onde: 'O teste ainda não pode ir para a produção.',
    rodadas: [
      fala(
        'Ensaio',
        'Where should we try this?',
        'Onde a gente testa isso?',
        'Diga para testar no ensaio primeiro.',
        'I will try this on staging first.',
        [
          'i will try this on staging first',
          'i will test this on staging first',
          'we will try this on staging first'
        ],
        'Staging é o ensaio. First é primeiro.'
      ),
      fala(
        'Copia',
        'What data does staging use?',
        'Que dados o ensaio usa?',
        'Diga que o ensaio usa uma cópia de ontem.',
        'Staging uses a copy of yesterday.',
        [
          'staging uses a copy of yesterday',
          'staging uses yesterdays copy',
          'the staging copy is from yesterday'
        ],
        'A copy é uma cópia. Yesterday é ontem.'
      )
    ]
  },
  {
    id: 'buildvelho',
    titulo: 'O build velho',
    emoji: '🧪',
    nivel: 'A2',
    onde: 'A produção ainda está no build antigo.',
    rodadas: [
      fala(
        'Ensaio',
        'What stays live?',
        'O que continua no ar?',
        'Diga que a produção fica no build velho.',
        'Production stays on the old build.',
        [
          'production stays on the old build',
          'production stays with the old build',
          'production keeps the old build'
        ],
        'Production é a produção. Old build é o build velho.'
      ),
      fala(
        'Copia',
        'When do we switch?',
        'Quando a gente troca?',
        'Diga que a troca espera a checagem.',
        'We switch after the check.',
        [
          'we switch after the check',
          'we will switch after the check',
          'we switch after the check passes'
        ],
        'Switch é trocar. After the check é depois da checagem.'
      )
    ]
  },
  {
    id: 'avisocanal',
    titulo: 'O aviso',
    emoji: '🧪',
    nivel: 'B1',
    onde: 'A checagem do ensaio passou.',
    rodadas: [
      fala(
        'Ensaio',
        'Did staging pass?',
        'O ensaio passou?',
        'Diga que a checagem passou no ensaio.',
        'The check passed on staging.',
        [
          'the check passed on staging',
          'the check passed in staging',
          'staging passed the check'
        ],
        'The check é a checagem. Passed é passou.'
      ),
      fala(
        'Copia',
        'How long do we keep the copy?',
        'Por quanto tempo a gente guarda a cópia?',
        'Diga que vai guardar esta cópia por um dia.',
        'I will keep this copy for one day.',
        [
          'i will keep this copy for one day',
          'i will keep this copy for 1 day',
          'i will keep the copy for one day'
        ],
        'Keep é guardar. One day é um dia.'
      )
    ]
  }
];

export const DISCOS = [
  {
    id: 'noventadisco',
    titulo: 'Noventa por cento',
    emoji: '💽',
    nivel: 'A2',
    onde: 'O disco do servidor está quase cheio.',
    rodadas: [
      fala(
        'Cheio',
        'How full is the disk?',
        'O quão cheio está o disco?',
        'Diga que o disco está noventa por cento cheio.',
        'The disk is ninety percent full.',
        [
          'the disk is ninety percent full',
          'the disk is 90 percent full',
          'the disc is ninety percent full'
        ],
        'Disk é o disco. Ninety percent é noventa por cento.'
      ),
      fala(
        'Plano',
        'When will you look?',
        'Quando você olha?',
        'Diga que vai olhar o disco hoje à noite.',
        'I will check the disk tonight.',
        [
          'i will check the disk tonight',
          'i will look at the disk tonight',
          'i will check the disc tonight'
        ],
        'Check é olhar. Tonight é hoje à noite.'
      )
    ]
  },
  {
    id: 'logvelho',
    titulo: 'O log velho',
    emoji: '💽',
    nivel: 'B1',
    onde: 'O log antigo ocupa espaço.',
    rodadas: [
      fala(
        'Cheio',
        'What can we delete?',
        'O que a gente pode apagar?',
        'Diga que logs com mais de sete dias podem sair.',
        'Logs older than seven days can go.',
        [
          'logs older than seven days can go',
          'logs older than 7 days can go',
          'logs older than seven days can be deleted'
        ],
        'Logs são os registros. Older than seven days é com mais de sete dias.'
      ),
      fala(
        'Plano',
        'What is the plan?',
        'Qual é o plano?',
        'Diga que o plano é apagar o log velho.',
        'The plan is to delete the old log.',
        [
          'the plan is to delete the old log',
          'the plan is to remove the old log',
          'the plan is deleting the old log'
        ],
        'Delete é apagar. Old log é o log velho.'
      )
    ]
  },
  {
    id: 'doisgiga',
    titulo: 'Dois gigas',
    emoji: '💽',
    nivel: 'A2',
    onde: 'Dá para liberar espaço hoje.',
    rodadas: [
      fala(
        'Cheio',
        'How much will you free?',
        'Quanto você vai liberar?',
        'Diga que vai liberar dois gigabytes hoje à noite.',
        'I will free two gigabytes tonight.',
        [
          'i will free two gigabytes tonight',
          'i will free 2 gigabytes tonight',
          'i will free two gigs tonight'
        ],
        'Free é liberar. Two gigabytes é dois gigabytes.'
      ),
      fala(
        'Plano',
        'What comes after that?',
        'O que vem depois?',
        'Diga que o plano é olhar o disco amanhã.',
        'The plan is to check the disk tomorrow.',
        [
          'the plan is to check the disk tomorrow',
          'the plan is to look at the disk tomorrow',
          'the plan is to check the disc tomorrow'
        ],
        'Tomorrow é amanhã. Check the disk é olhar o disco.'
      )
    ]
  }
];

export const PAGINAS = [
  {
    id: 'vintelinhas',
    titulo: 'Vinte linhas',
    emoji: '📃',
    nivel: 'A2',
    onde: 'A lista da busca está grande demais.',
    rodadas: [
      fala(
        'Lista',
        'How many rows do we show?',
        'Quantas linhas a gente mostra?',
        'Diga que a lista mostra vinte linhas.',
        'The list shows twenty rows.',
        [
          'the list shows twenty rows',
          'the list shows 20 rows',
          'this list shows twenty rows'
        ],
        'Rows são linhas. Twenty é vinte.'
      ),
      fala(
        'Proxima',
        'How does the next page start?',
        'Como a próxima página começa?',
        'Diga que a próxima página começa depois do último id.',
        'The next page starts after the last id.',
        [
          'the next page starts after the last id',
          'the next page starts after the last identifier',
          'next page starts after the last id'
        ],
        'Next page é a próxima página. Last id é o último id.'
      )
    ]
  },
  {
    id: 'todaslinhas',
    titulo: 'Todas as linhas',
    emoji: '📃',
    nivel: 'B1',
    onde: 'Alguém quer trazer a lista inteira.',
    rodadas: [
      fala(
        'Lista',
        'Can we load every row?',
        'Dá para carregar todas as linhas?',
        'Diga para não carregar todas as linhas.',
        'Please do not load every row.',
        [
          'please do not load every row',
          'please dont load every row',
          'do not load every row'
        ],
        'Do not é não faça. Every row é cada linha.'
      ),
      fala(
        'Proxima',
        'What stays small?',
        'O que continua pequeno?',
        'Diga que a próxima página continua pequena.',
        'The next page stays small.',
        [
          'the next page stays small',
          'the next page stays little',
          'next page stays small'
        ],
        'Stays small é continua pequena. Next page é a próxima página.'
      )
    ]
  },
  {
    id: 'ultimoidpag',
    titulo: 'O último id',
    emoji: '📃',
    nivel: 'B1',
    onde: 'A página inteira deixa a busca lenta.',
    rodadas: [
      fala(
        'Lista',
        'Why is the search slow?',
        'Por que a busca está lenta?',
        'Diga que a lista inteira deixa a página lenta.',
        'The full list makes the page slow.',
        [
          'the full list makes the page slow',
          'the full list makes this page slow',
          'the whole list makes the page slow'
        ],
        'Full list é a lista inteira. Slow é lenta.'
      ),
      fala(
        'Proxima',
        'What should the client send?',
        'O que o cliente deve mandar?',
        'Diga que o cliente manda o último id.',
        'The client sends the last id.',
        [
          'the client sends the last id',
          'the client sends the last identifier',
          'the client should send the last id'
        ],
        'Client é o cliente. Last id é o último id.'
      )
    ]
  }
];

export function ensaioPorId(id) {
  return ENSAIOS.find(c => c.id === id) ?? null;
}

export function discoPorId(id) {
  return DISCOS.find(c => c.id === id) ?? null;
}

export function paginaPorId(id) {
  return PAGINAS.find(c => c.id === id) ?? null;
}

export function avaliarEnsaio(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDisco(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPagina(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
