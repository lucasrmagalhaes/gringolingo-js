// Métrica do plantão, aplauso em público e o dia doente.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const RADARS = [
  {
    id: 'latenciap95',
    titulo: 'A latência',
    emoji: '📡',
    nivel: 'B1',
    onde: 'O plantão abriu porque um número passou do limite.',
    rodadas: [
      fala(
        'Sinal',
        'What number woke the on call?',
        'Qual número acordou o plantão?',
        'Diga que a latência p95 passou de dois segundos.',
        'The p95 latency went past two seconds.',
        [
          'the p95 latency went past two seconds',
          'the p95 latency went past 2 seconds',
          'p95 latency went past two seconds'
        ],
        'p95 é o atraso da maior parte dos pedidos. Went past é passou de.'
      ),
      fala(
        'Leitura',
        'Why does that number page us?',
        'Por que esse número chama a gente?',
        'Diga que essa métrica é a que chama o plantão.',
        'That metric is what pages the on call.',
        [
          'that metric is what pages the on call',
          'this metric is what pages the on call',
          'that metric is what pages us on call'
        ],
        'Pages é chama a pessoa de plantão. On call é o plantão.'
      )
    ]
  },
  {
    id: 'orcamentoerro',
    titulo: 'O orçamento',
    emoji: '📡',
    nivel: 'B2',
    onde: 'O alerta novo precisa de uma regra clara.',
    rodadas: [
      fala(
        'Sinal',
        'When should this alert fire?',
        'Quando este alerta deve disparar?',
        'Diga que o alerta dispara quando o orçamento de erro acaba.',
        'This alert fires when the error budget is gone.',
        [
          'this alert fires when the error budget is gone',
          'the alert fires when the error budget is gone',
          'this alert fires when our error budget is gone'
        ],
        'Error budget é o orçamento de erro. Fires é dispara.'
      ),
      fala(
        'Leitura',
        'Should we mute it now?',
        'A gente silencia agora?',
        'Diga que só silencia depois que o gráfico fica calmo.',
        'Mute it only after the chart is calm.',
        [
          'mute it only after the chart is calm',
          'mute it only after the chart looks calm',
          'only mute it after the chart is calm'
        ],
        'Mute é silenciar. Chart é o gráfico.'
      )
    ]
  },
  {
    id: 'quadroschart',
    titulo: 'Os quadros',
    emoji: '📡',
    nivel: 'B1',
    onde: 'A reunião de plantão começa pelo painel.',
    rodadas: [
      fala(
        'Sinal',
        'What does the board show?',
        'O que o painel mostra?',
        'Diga que o painel do plantão tem três gráficos.',
        'The on call board has three charts.',
        [
          'the on call board has three charts',
          'the on call board has 3 charts',
          'our on call board has three charts'
        ],
        'Board é o painel. Three charts são três gráficos.'
      ),
      fala(
        'Leitura',
        'What do you open first?',
        'O que você abre primeiro?',
        'Diga para abrir o painel antes de mexer no alerta.',
        'Open the board before you touch the alert.',
        [
          'open the board before you touch the alert',
          'open the board before you change the alert',
          'open the board before touching the alert'
        ],
        'Before you touch é antes de mexer. The alert é o alerta.'
      )
    ]
  }
];

export const APLAUSOS = [
  {
    id: 'elogiopublico',
    titulo: 'Em público',
    emoji: '👏',
    nivel: 'A2',
    onde: 'A entrega saiu e o canal do time está aberto.',
    rodadas: [
      fala(
        'Elogio',
        'How should we mark this launch?',
        'Como a gente marca este lançamento?',
        'Diga que quer agradecer o time em público.',
        'I want to thank the team in public.',
        [
          'i want to thank the team in public',
          'i want to thank the team publicly',
          'i would like to thank the team in public'
        ],
        'In public é em público. Thank the team é agradecer o time.'
      ),
      fala(
        'Nome',
        'Who should we name?',
        'Quem a gente cita?',
        'Diga que a Ana publicou a correção do checkout.',
        'Ana shipped the checkout fix.',
        [
          'ana shipped the checkout fix',
          'ana shipped the checkout',
          'ana shipped that checkout fix'
        ],
        'Shipped é publicou. Checkout fix é a correção do pagamento.'
      )
    ]
  },
  {
    id: 'reviewamavel',
    titulo: 'A revisão gentil',
    emoji: '👏',
    nivel: 'B1',
    onde: 'Um comentário no pull request virou assunto.',
    rodadas: [
      fala(
        'Elogio',
        'What did Maya do for you?',
        'O que a Maya fez por você?',
        'Diga que a Maya deixou uma revisão gentil no seu pull request.',
        'Maya left a kind review on my pull request.',
        [
          'maya left a kind review on my pull request',
          'maya left a kind review on my pr',
          'maya left a kind review on the pull request'
        ],
        'A kind review é uma revisão gentil. Pull request é o pedido de junção.'
      ),
      fala(
        'Nome',
        'What did that change for you?',
        'O que isso mudou para você?',
        'Diga que essa revisão poupou uma hora.',
        'That review saved me an hour.',
        [
          'that review saved me an hour',
          'the review saved me an hour',
          'that review saved me one hour'
        ],
        'Saved me an hour é poupou uma hora.'
      )
    ]
  },
  {
    id: 'timeapoio',
    titulo: 'O suporte',
    emoji: '👏',
    nivel: 'A2',
    onde: 'O chat ficou calmo a semana toda.',
    rodadas: [
      fala(
        'Elogio',
        'Who else should hear this?',
        'Quem mais precisa ouvir isso?',
        'Diga para aplaudir o time de suporte.',
        'Let us clap for the support team.',
        [
          'let us clap for the support team',
          'lets clap for the support team',
          'let us clap for support'
        ],
        'Clap for é aplaudir. The support team é o time de suporte.'
      ),
      fala(
        'Nome',
        'What did they do?',
        'O que eles fizeram?',
        'Diga que eles mantiveram o chat calmo a semana toda.',
        'They kept the chat calm all week.',
        [
          'they kept the chat calm all week',
          'they kept the chat calm the whole week',
          'they kept our chat calm all week'
        ],
        'Kept the chat calm é manteve o chat calmo. All week é a semana toda.'
      )
    ]
  }
];

export const GRIPES = [
  {
    id: 'casahoje',
    titulo: 'Hoje não',
    emoji: '🤒',
    nivel: 'A2',
    onde: 'Você acorda mal e a daily é daqui a pouco.',
    rodadas: [
      fala(
        'Aviso',
        'Will you join the standup?',
        'Você entra na daily?',
        'Diga que está doente hoje e fica em casa.',
        'I am sick today, so I will stay home.',
        [
          'i am sick today so i will stay home',
          'i am sick today and i will stay home',
          'i am ill today so i will stay home'
        ],
        'Sick é doente. Stay home é ficar em casa.'
      ),
      fala(
        'Plano',
        'What should we do with the standup?',
        'O que a gente faz com a daily?',
        'Diga para fazer a daily sem você.',
        'Please run the standup without me.',
        [
          'please run the standup without me',
          'please do the standup without me',
          'run the standup without me'
        ],
        'Standup é a daily. Without me é sem você.'
      )
    ]
  },
  {
    id: 'voltacurta',
    titulo: 'A volta',
    emoji: '🤒',
    nivel: 'A2',
    onde: 'O time quer saber do dia seguinte.',
    rodadas: [
      fala(
        'Aviso',
        'When will you be back?',
        'Quando você volta?',
        'Diga que deve voltar amanhã se a febre cair.',
        'I should be back tomorrow if the fever drops.',
        [
          'i should be back tomorrow if the fever drops',
          'i should be back tomorrow if my fever drops',
          'i will be back tomorrow if the fever drops'
        ],
        'Fever é febre. Drops é cair.'
      ),
      fala(
        'Plano',
        'How will we know?',
        'Como a gente fica sabendo?',
        'Diga que manda uma nota se ainda estiver mal.',
        'I will send a note if I still feel ill.',
        [
          'i will send a note if i still feel ill',
          'i will send a note if i still feel sick',
          'i send a note if i still feel ill'
        ],
        'A note é um recado. Feel ill é estar mal.'
      )
    ]
  },
  {
    id: 'consultadez',
    titulo: 'A consulta',
    emoji: '🤒',
    nivel: 'A2',
    onde: 'A consulta médica é no meio da manhã.',
    rodadas: [
      fala(
        'Aviso',
        'Why are you offline at ten?',
        'Por que você fica offline às dez?',
        'Diga que a consulta médica é às dez.',
        'My doctor visit is at ten.',
        [
          'my doctor visit is at ten',
          'my doctor visit is at 10',
          'the doctor visit is at ten'
        ],
        'Doctor visit é a consulta. At ten é às dez.'
      ),
      fala(
        'Plano',
        'Can you still answer chat?',
        'Você ainda responde no chat?',
        'Diga que responde no chat depois da consulta.',
        'I can reply in chat after the visit.',
        [
          'i can reply in chat after the visit',
          'i can reply in the chat after the visit',
          'i can answer in chat after the visit'
        ],
        'Reply é responder. After the visit é depois da consulta.'
      )
    ]
  }
];

export function radarPorId(id) {
  return RADARS.find(c => c.id === id) ?? null;
}

export function aplausoPorId(id) {
  return APLAUSOS.find(c => c.id === id) ?? null;
}

export function gripePorId(id) {
  return GRIPES.find(c => c.id === id) ?? null;
}

export function avaliarRadar(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAplauso(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGripe(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
