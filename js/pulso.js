// Sonda de saúde, semente do banco e nível do registro.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SONDAS = [
  {
    id: 'falhouduas',
    titulo: 'Duas falhas',
    emoji: '🩺',
    nivel: 'A2',
    onde: 'A sonda do serviço falhou de manhã.',
    rodadas: [
      fala(
        'Falha',
        'What did the check do?',
        'O que a sonda fez?',
        'Diga que a sonda falhou duas vezes.',
        'The health check failed twice.',
        [
          'the health check failed twice',
          'the health check failed 2 times',
          'this health check failed twice'
        ],
        'Health check é a sonda. Twice é duas vezes.'
      ),
      fala(
        'Volta',
        'What should we do?',
        'O que a gente faz?',
        'Diga para rodar a sonda de novo.',
        'Please run the check again.',
        [
          'please run the check again',
          'please run this check again',
          'run the check again'
        ],
        'Run the check again é rodar a sonda de novo.'
      )
    ]
  },
  {
    id: 'servicook',
    titulo: 'O serviço',
    emoji: '🩺',
    nivel: 'B1',
    onde: 'A sonda pergunta se o serviço responde.',
    rodadas: [
      fala(
        'Falha',
        'What does the check look at?',
        'O que a sonda olha?',
        'Diga que a sonda olha o serviço.',
        'The check looks at the service.',
        [
          'the check looks at the service',
          'this check looks at the service',
          'the check looks at our service'
        ],
        'Looks at é olha. Service é o serviço.'
      ),
      fala(
        'Volta',
        'Did the service answer?',
        'O serviço respondeu?',
        'Diga que o serviço responde a sonda.',
        'The service answers the check.',
        [
          'the service answers the check',
          'the service answers this check',
          'our service answers the check'
        ],
        'Answers the check é responder a sonda.'
      )
    ]
  },
  {
    id: 'olhanovamente',
    titulo: 'A próxima',
    emoji: '🩺',
    nivel: 'B1',
    onde: 'Alguém precisa olhar a próxima sonda.',
    rodadas: [
      fala(
        'Falha',
        'Who watches the next one?',
        'Quem olha a próxima?',
        'Diga que vai olhar a próxima sonda.',
        'I will watch the next check.',
        [
          'i will watch the next check',
          'i will watch the next health check',
          'i watch the next check'
        ],
        'Watch é olhar. The next check é a próxima sonda.'
      ),
      fala(
        'Volta',
        'When do you call me?',
        'Quando você me chama?',
        'Diga para te chamar se falhar de novo.',
        'Call me if it fails again.',
        [
          'call me if it fails again',
          'please call me if it fails again',
          'call me if the check fails again'
        ],
        'Fails again é falhar de novo.'
      )
    ]
  }
];

export const SEMENTES = [
  {
    id: 'bancovazio',
    titulo: 'Banco vazio',
    emoji: '🌱',
    nivel: 'B1',
    onde: 'O banco novo não tem linha nenhuma.',
    rodadas: [
      fala(
        'Banco',
        'What does the empty database need?',
        'O que o banco vazio precisa?',
        'Diga para semear o banco vazio.',
        'Please seed the empty database.',
        [
          'please seed the empty database',
          'please seed this empty database',
          'seed the empty database'
        ],
        'Seed é semear. Empty database é o banco vazio.'
      ),
      fala(
        'Linha',
        'How many rows do we add?',
        'Quantas linhas a gente põe?',
        'Diga que as tabelas começam com dez linhas.',
        'The tables start with ten rows.',
        [
          'the tables start with ten rows',
          'the tables start with 10 rows',
          'tables start with ten rows'
        ],
        'Tables são as tabelas. Ten rows é dez linhas.'
      )
    ]
  },
  {
    id: 'dezlinhas',
    titulo: 'Dez linhas',
    emoji: '🌱',
    nivel: 'A2',
    onde: 'A demo só precisa de um punhado de linhas.',
    rodadas: [
      fala(
        'Banco',
        'Is ten enough?',
        'Dez chegam?',
        'Diga que dez linhas bastam para a demo.',
        'Ten rows are enough for the demo.',
        [
          'ten rows are enough for the demo',
          '10 rows are enough for the demo',
          'ten rows are enough for this demo'
        ],
        'Enough é bastante. Demo é a demonstração.'
      ),
      fala(
        'Linha',
        'Should we add more?',
        'A gente põe mais?',
        'Diga para não pôr mais linhas.',
        'Please do not add more rows.',
        [
          'please do not add more rows',
          'do not add more rows',
          'please do not add any more rows'
        ],
        'Do not add é não pôr. More rows são mais linhas.'
      )
    ]
  },
  {
    id: 'naoprod',
    titulo: 'Fora de produção',
    emoji: '🌱',
    nivel: 'B1',
    onde: 'A semente não pode cair em produção.',
    rodadas: [
      fala(
        'Banco',
        'Can we seed production?',
        'Dá para semear produção?',
        'Diga para não semear produção.',
        'Do not seed production.',
        [
          'do not seed production',
          'please do not seed production',
          'do not seed the production database'
        ],
        'Production é produção. Do not seed é não semear.'
      ),
      fala(
        'Linha',
        'Where can we seed?',
        'Onde a gente semeia?',
        'Diga para semear só a cópia vazia.',
        'Seed only the empty copy.',
        [
          'seed only the empty copy',
          'please seed only the empty copy',
          'seed only that empty copy'
        ],
        'Only é só. Empty copy é a cópia vazia.'
      )
    ]
  }
];

export const REGISTROS = [
  {
    id: 'subirdebug',
    titulo: 'Subir o nível',
    emoji: '📋',
    nivel: 'B1',
    onde: 'O erro sumiu e o registro está quieto.',
    rodadas: [
      fala(
        'Nível',
        'What should we change?',
        'O que a gente muda?',
        'Diga para subir o nível do registro.',
        'Please raise the log level.',
        [
          'please raise the log level',
          'please raise this log level',
          'raise the log level'
        ],
        'Log level é o nível do registro. Raise é subir.'
      ),
      fala(
        'Volta',
        'How high?',
        'Até onde?',
        'Diga para subir até debug.',
        'Raise it to debug.',
        [
          'raise it to debug',
          'please raise it to debug',
          'raise the level to debug'
        ],
        'Debug é o nível mais detalhado.'
      )
    ]
  },
  {
    id: 'nivelerro',
    titulo: 'Só o erro',
    emoji: '📋',
    nivel: 'A2',
    onde: 'O registro de produção precisa ficar curto.',
    rodadas: [
      fala(
        'Nível',
        'Which lines do we keep?',
        'Quais linhas a gente guarda?',
        'Diga que os erros ficam no nível de erro.',
        'Errors stay at the error level.',
        [
          'errors stay at the error level',
          'the errors stay at the error level',
          'errors stay on the error level'
        ],
        'Error level é o nível de erro. Stay é ficar.'
      ),
      fala(
        'Volta',
        'What about warnings?',
        'E os avisos?',
        'Diga que os avisos podem ficar quietos.',
        'Warnings can stay quiet.',
        [
          'warnings can stay quiet',
          'the warnings can stay quiet',
          'warnings may stay quiet'
        ],
        'Warnings são os avisos. Quiet é quieto.'
      )
    ]
  },
  {
    id: 'voltarinfo',
    titulo: 'Voltar ao info',
    emoji: '📋',
    nivel: 'B1',
    onde: 'O debug já cumpriu o papel.',
    rodadas: [
      fala(
        'Nível',
        'Where do we leave the level?',
        'Onde a gente deixa o nível?',
        'Diga que vai voltar o nível para info.',
        'I will set the level back to info.',
        [
          'i will set the level back to info',
          'i will set the log level back to info',
          'i set the level back to info'
        ],
        'Set back é voltar. Info é o nível comum.'
      ),
      fala(
        'Volta',
        'Is that enough today?',
        'Isso basta hoje?',
        'Diga que info basta para o dia.',
        'Info is enough for the day.',
        [
          'info is enough for the day',
          'info is enough for today',
          'info level is enough for the day'
        ],
        'Enough for the day é bastante para o dia.'
      )
    ]
  }
];

export function sondaPorId(id) {
  return SONDAS.find(c => c.id === id) ?? null;
}

export function sementePorId(id) {
  return SEMENTES.find(c => c.id === id) ?? null;
}

export function registroPorId(id) {
  return REGISTROS.find(c => c.id === id) ?? null;
}

export function avaliarSonda(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSemente(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRegistro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
