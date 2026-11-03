// Prazo com o PM, post-mortem e feedback de carreira.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const PMS = [
  {
    id: 'folego',
    titulo: 'O fôlego',
    emoji: '📎',
    nivel: 'B1',
    onde: 'O PM quer a release amanhã. A review ainda não cabe.',
    rodadas: [
      fala(
        'Data',
        'Can this ship tomorrow?',
        'Isso pode sair amanhã?',
        'Diga que a review ainda precisa de dois dias.',
        'The review still needs two days.',
        [
          'the review still needs two days',
          'the review still needs 2 days',
          'this review still needs two days'
        ],
        'Still needs é ainda precisa. Two days são dois dias.'
      ),
      fala(
        'Troca',
        'When can it ship?',
        'Quando pode sair?',
        'Diga que a release pode ficar para quinta.',
        'Can we set the release for Thursday?',
        [
          'can we set the release for thursday',
          'could we set the release for thursday',
          'can we set the release to thursday'
        ],
        'Set the release marca a data. Thursday é quinta.'
      )
    ]
  },
  {
    id: 'semteste',
    titulo: 'Sem os testes',
    emoji: '📎',
    nivel: 'B2',
    onde: 'Quarta só fecha se os testes saírem do plano.',
    rodadas: [
      fala(
        'Data',
        'Can we still hit Wednesday?',
        'Ainda dá para fechar na quarta?',
        'Diga que quarta só fecha se pularmos os testes.',
        'Wednesday only works if we skip the tests.',
        [
          'wednesday only works if we skip the tests',
          'wednesday only works if we skip tests',
          'wednesday works only if we skip the tests'
        ],
        'Only works if é só funciona se. Skip the tests é pular os testes.'
      ),
      fala(
        'Troca',
        'What do you recommend?',
        'O que você recomenda?',
        'Diga que prefere mover a data a pular os testes.',
        'I would rather move the date than skip the tests.',
        [
          'i would rather move the date than skip the tests',
          'i would rather move the date than skip tests',
          'i would rather move the date'
        ],
        'Would rather é prefere. Move the date é mudar a data.'
      )
    ]
  },
  {
    id: 'notapm',
    titulo: 'A nota ao PM',
    emoji: '📎',
    nivel: 'A2',
    onde: 'A data nova precisa chegar no PM hoje.',
    rodadas: [
      fala(
        'Data',
        'Who needs the new date?',
        'Quem precisa da data nova?',
        'Diga que vai mandar a data nova para o PM hoje.',
        'I will send the new date to the PM today.',
        [
          'i will send the new date to the pm today',
          'i will send the new date to the product manager today',
          'i send the new date to the pm today'
        ],
        'The PM é a pessoa de produto. Today é hoje.'
      ),
      fala(
        'Troca',
        'Where should they reply?',
        'Onde a pessoa responde?',
        'Diga que o PM pode confirmar na thread.',
        'The PM can confirm it in the thread.',
        [
          'the pm can confirm it in the thread',
          'the product manager can confirm it in the thread',
          'the pm can confirm this in the thread'
        ],
        'Confirm é confirmar. In the thread é na conversa escrita.'
      )
    ]
  }
];

export const LAUDOS = [
  {
    id: 'dozemin',
    titulo: 'Os doze minutos',
    emoji: '📄',
    nivel: 'B1',
    onde: 'O post-mortem começa pela linha do tempo.',
    rodadas: [
      fala(
        'Fato',
        'What did users see?',
        'O que as pessoas viram?',
        'Diga que o checkout falhou por doze minutos.',
        'Checkout failed for twelve minutes.',
        [
          'checkout failed for twelve minutes',
          'checkout failed for 12 minutes',
          'the checkout failed for twelve minutes'
        ],
        'Failed é falhou. Twelve minutes são doze minutos.'
      ),
      fala(
        'Ação',
        'When did it start?',
        'Quando começou?',
        'Diga que o deploy começou às nove.',
        'The deploy started at nine.',
        [
          'the deploy started at nine',
          'the deploy started at 9',
          'the deploy started at nine am'
        ],
        'Started at nine é começou às nove. Deploy é a publicação.'
      )
    ]
  },
  {
    id: 'indicefalta',
    titulo: 'O índice',
    emoji: '📄',
    nivel: 'B1',
    onde: 'A causa já está clara.',
    rodadas: [
      fala(
        'Fato',
        'What was the root cause?',
        'Qual foi a causa?',
        'Diga que a causa foi um índice que faltava.',
        'The root cause was a missing index.',
        [
          'the root cause was a missing index',
          'the root cause was a missing database index',
          'a missing index was the root cause'
        ],
        'Root cause é a causa. Missing index é um índice que faltava.'
      ),
      fala(
        'Ação',
        'What will we change?',
        'O que a gente muda?',
        'Diga que vão adicionar esse índice antes do próximo deploy.',
        'We will add that index before the next deploy.',
        [
          'we will add that index before the next deploy',
          'we will add the index before the next deploy',
          'we will add this index before the next deploy'
        ],
        'Add that index é criar o índice. Before the next deploy é antes da próxima publicação.'
      )
    ]
  },
  {
    id: 'donasegunda',
    titulo: 'Até segunda',
    emoji: '📄',
    nivel: 'B1',
    onde: 'Alguém precisa ficar com a ação.',
    rodadas: [
      fala(
        'Fato',
        'Who owns the fix?',
        'Quem fica com a correção?',
        'Diga que a Priya fica com o índice até segunda.',
        'Priya owns the index by Monday.',
        [
          'priya owns the index by monday',
          'priya owns the index until monday',
          'priya owns that index by monday'
        ],
        'Owns é fica responsável. By Monday é até segunda.'
      ),
      fala(
        'Ação',
        'When do we read this again?',
        'Quando a gente lê isto de novo?',
        'Diga que vão ler esta nota na próxima retro.',
        'We will read this note in the next retro.',
        [
          'we will read this note in the next retro',
          'we will read this note at the next retro',
          'we will read the note in the next retro'
        ],
        'Read this note é ler a nota. The next retro é a próxima retrospectiva.'
      )
    ]
  }
];

export const RUMOS = [
  {
    id: 'pedirumo',
    titulo: 'O pedido',
    emoji: '🔭',
    nivel: 'B1',
    onde: 'O 1:1 é sobre a carreira, não sobre o sprint.',
    rodadas: [
      fala(
        'Pedido',
        'What do you want from this one on one?',
        'O que você quer deste 1:1?',
        'Diga que quer um feedback sobre o seu crescimento.',
        'I would like feedback on my growth.',
        [
          'i would like feedback on my growth',
          'i want feedback on my growth',
          'i would like some feedback on my growth'
        ],
        'Feedback on my growth é um retorno sobre o crescimento.'
      ),
      fala(
        'Passo',
        'Where should we start?',
        'Por onde a gente começa?',
        'Pergunte qual habilidade praticar em seguida.',
        'Which skill should I practice next?',
        [
          'which skill should i practice next',
          'what skill should i practice next',
          'which skill should i practice'
        ],
        'Which skill pergunta a habilidade. Next é em seguida.'
      )
    ]
  },
  {
    id: 'areamaior',
    titulo: 'A área maior',
    emoji: '🔭',
    nivel: 'B2',
    onde: 'Você quer um pedaço maior do produto.',
    rodadas: [
      fala(
        'Pedido',
        'What kind of work do you want?',
        'Que tipo de trabalho você quer?',
        'Diga que quer ser dono de uma área maior.',
        'I want to own a larger area.',
        [
          'i want to own a larger area',
          'i want to own a bigger area',
          'i would like to own a larger area'
        ],
        'Own é ser responsável. A larger area é uma área maior.'
      ),
      fala(
        'Passo',
        'How do we try that?',
        'Como a gente experimenta isso?',
        'Peça para nomear um projeto para isso.',
        'Could we name one project for that?',
        [
          'could we name one project for that',
          'can we name one project for that',
          'could we pick one project for that'
        ],
        'Name one project é escolher um projeto. For that é para isso.'
      )
    ]
  },
  {
    id: 'proximonivel',
    titulo: 'O próximo nível',
    emoji: '🔭',
    nivel: 'B1',
    onde: 'Você quer ver o que muda no próximo nível.',
    rodadas: [
      fala(
        'Pedido',
        'What are you hoping to hear?',
        'O que você espera ouvir?',
        'Pergunte como é o próximo nível.',
        'What would the next level look like?',
        [
          'what would the next level look like',
          'what does the next level look like',
          'what would the next level look like here'
        ],
        'The next level é o próximo nível. Look like é parecer.'
      ),
      fala(
        'Passo',
        'What will you do with the answer?',
        'O que você faz com a resposta?',
        'Diga que vai escrever esse plano neste mês.',
        'I will write that plan this month.',
        [
          'i will write that plan this month',
          'i will write this plan this month',
          'i will write the plan this month'
        ],
        'That plan é esse plano. This month é neste mês.'
      )
    ]
  }
];

export function pmPorId(id) {
  return PMS.find(c => c.id === id) ?? null;
}

export function laudoPorId(id) {
  return LAUDOS.find(c => c.id === id) ?? null;
}

export function rumoPorId(id) {
  return RUMOS.find(c => c.id === id) ?? null;
}

export function avaliarPm(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLaudo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRumo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
