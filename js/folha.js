// Cherry-pick, fim de sessão e tanque de conexões.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const COLHEITAS = [
  {
    id: 'cherryum',
    titulo: 'Um commit',
    emoji: '🍒',
    nivel: 'B1',
    onde: 'Só um commit deve subir para o release.',
    rodadas: [
      fala(
        'Commit',
        'Which commit do you want?',
        'Qual commit você quer?',
        'Diga que vai escolher aquele um commit.',
        'I will cherry pick that one commit.',
        [
          'i will cherry pick that one commit',
          'i will cherry pick that 1 commit',
          'i cherry pick that one commit'
        ],
        'Cherry pick é escolher um commit. One commit é um commit.'
      ),
      fala(
        'Resto',
        'What about the other commits?',
        'E os outros commits?',
        'Diga que os outros commits ficam para trás.',
        'I will leave the other commits behind.',
        [
          'i will leave the other commits behind',
          'i leave the other commits behind',
          'i will leave those commits behind'
        ],
        'Leave behind é deixar para trás.'
      )
    ]
  },
  {
    id: 'deixafora',
    titulo: 'O release',
    emoji: '🍒',
    nivel: 'B1',
    onde: 'O release leva um commit e o resto fica na branch.',
    rodadas: [
      fala(
        'Commit',
        'Where does this commit go?',
        'Para onde vai este commit?',
        'Diga que este commit vai para o release.',
        'This commit goes to the release branch.',
        [
          'this commit goes to the release branch',
          'this commit goes onto the release branch',
          'the commit goes to the release branch'
        ],
        'Release branch é o ramo de release.'
      ),
      fala(
        'Resto',
        'Where do the others stay?',
        'Onde os outros ficam?',
        'Diga que os outros commits ficam nesta branch.',
        'The other commits stay on this branch.',
        [
          'the other commits stay on this branch',
          'the other commits stay in this branch',
          'other commits stay on this branch'
        ],
        'Stay on this branch é ficar nesta branch.'
      )
    ]
  },
  {
    id: 'msgoriginal',
    titulo: 'A mensagem',
    emoji: '🍒',
    nivel: 'A2',
    onde: 'A mensagem original do commit deve continuar.',
    rodadas: [
      fala(
        'Commit',
        'Will you change the message?',
        'Você muda a mensagem?',
        'Diga que vai manter a mensagem original.',
        'I will keep the original message.',
        [
          'i will keep the original message',
          'i keep the original message',
          'i will keep that original message'
        ],
        'Keep é manter. Original message é a mensagem original.'
      ),
      fala(
        'Resto',
        'Can we rewrite it?',
        'Dá para reescrever?',
        'Diga para não reescrever a mensagem.',
        'Please do not rewrite the message.',
        [
          'please do not rewrite the message',
          'do not rewrite the message',
          'please do not rewrite this message'
        ],
        'Do not rewrite é não reescrever.'
      )
    ]
  }
];

export const SESSOES = [
  {
    id: 'oitofala',
    titulo: 'Oito horas',
    emoji: '⏳',
    nivel: 'A2',
    onde: 'A sessão do painel fecha sozinha.',
    rodadas: [
      fala(
        'Fim',
        'How long does the session last?',
        'Quanto tempo a sessão dura?',
        'Diga que a sessão acaba depois de oito horas.',
        'The session ends after eight hours.',
        [
          'the session ends after eight hours',
          'the session ends after 8 hours',
          'this session ends after eight hours'
        ],
        'Session é a sessão. Eight hours é oito horas.'
      ),
      fala(
        'Prazo',
        'What should I do now?',
        'O que eu faço agora?',
        'Diga para entrar de novo.',
        'Please sign in again.',
        [
          'please sign in again',
          'please sign in once more',
          'sign in again'
        ],
        'Sign in again é entrar de novo.'
      )
    ]
  },
  {
    id: 'pedeentrar',
    titulo: 'Entrar de novo',
    emoji: '⏳',
    nivel: 'A2',
    onde: 'A sessão antiga já fechou.',
    rodadas: [
      fala(
        'Fim',
        'Why am I logged out?',
        'Por que eu saí?',
        'Diga que a sessão antiga fechou.',
        'The old session is closed.',
        [
          'the old session is closed',
          'that old session is closed',
          'the old session closed'
        ],
        'Old session é a sessão antiga. Closed é fechada.'
      ),
      fala(
        'Prazo',
        'What do I need?',
        'O que eu preciso?',
        'Diga que precisa de uma sessão nova.',
        'You need a new session.',
        [
          'you need a new session',
          'you need one new session',
          'we need a new session'
        ],
        'A new session é uma sessão nova.'
      )
    ]
  },
  {
    id: 'estendedoze',
    titulo: 'Doze horas',
    emoji: '⏳',
    nivel: 'B1',
    onde: 'O plantão pede mais tempo logado.',
    rodadas: [
      fala(
        'Fim',
        'Can the session last longer?',
        'A sessão pode durar mais?',
        'Diga que pode estender a sessão.',
        'I can extend the session.',
        [
          'i can extend the session',
          'i can extend this session',
          'we can extend the session'
        ],
        'Extend é estender. Session é a sessão.'
      ),
      fala(
        'Prazo',
        'Until when?',
        'Até quando?',
        'Diga para estender até doze horas.',
        'Please extend it to twelve hours.',
        [
          'please extend it to twelve hours',
          'please extend it to 12 hours',
          'extend it to twelve hours'
        ],
        'Twelve hours é doze horas.'
      )
    ]
  }
];

export const TANQUES = [
  {
    id: 'poolcheio',
    titulo: 'Tanque cheio',
    emoji: '🪣',
    nivel: 'B1',
    onde: 'Não cabe mais conexão nova.',
    rodadas: [
      fala(
        'Cheio',
        'Why did the call fail?',
        'Por que a chamada falhou?',
        'Diga que o tanque está cheio.',
        'The pool is full.',
        [
          'the pool is full',
          'our pool is full',
          'the connection pool is full'
        ],
        'Pool é o tanque de conexões. Full é cheio.'
      ),
      fala(
        'Folga',
        'What should we close?',
        'O que a gente fecha?',
        'Diga para fechar as conexões ociosas.',
        'Please close the idle ones.',
        [
          'please close the idle ones',
          'please close the idle connections',
          'close the idle ones'
        ],
        'Idle é ociosa. Close é fechar.'
      )
    ]
  },
  {
    id: 'limitevinte',
    titulo: 'Vinte conexões',
    emoji: '🪣',
    nivel: 'A2',
    onde: 'O teto do tanque é vinte.',
    rodadas: [
      fala(
        'Cheio',
        'How many connections can we open?',
        'Quantas conexões a gente abre?',
        'Diga que o teto é vinte conexões.',
        'We allow twenty connections.',
        [
          'we allow twenty connections',
          'we allow 20 connections',
          'we allow twenty open connections'
        ],
        'Allow é permitir. Twenty connections é vinte conexões.'
      ),
      fala(
        'Folga',
        'What happens to a new call?',
        'O que acontece com uma chamada nova?',
        'Diga que a chamada nova espera uma livre.',
        'New calls wait for a free one.',
        [
          'new calls wait for a free one',
          'a new call waits for a free one',
          'new calls wait for one free connection'
        ],
        'Wait é esperar. A free one é uma livre.'
      )
    ]
  },
  {
    id: 'fechaociosa',
    titulo: 'As ociosas',
    emoji: '🪣',
    nivel: 'B1',
    onde: 'Conexões paradas ocupam o tanque.',
    rodadas: [
      fala(
        'Cheio',
        'What are the idle connections doing?',
        'O que as conexões ociosas fazem?',
        'Diga que as ociosas continuam abertas.',
        'Idle connections stay open.',
        [
          'idle connections stay open',
          'the idle connections stay open',
          'idle connections stay open too'
        ],
        'Stay open é continuar aberta.'
      ),
      fala(
        'Folga',
        'Which ones do you close first?',
        'Quais você fecha primeiro?',
        'Diga que fecha as ociosas primeiro.',
        'I will close the idle ones first.',
        [
          'i will close the idle ones first',
          'i close the idle ones first',
          'i will close idle ones first'
        ],
        'First é primeiro. Idle ones são as ociosas.'
      )
    ]
  }
];

export function colheitaPorId(id) {
  return COLHEITAS.find(c => c.id === id) ?? null;
}

export function sessaoPorId(id) {
  return SESSOES.find(c => c.id === id) ?? null;
}

export function tanquePorId(id) {
  return TANQUES.find(c => c.id === id) ?? null;
}

export function avaliarColheita(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSessao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarTanque(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
