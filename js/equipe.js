// Acesso de quem chega, licença de ferramenta e explicação sem jargão.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const ACESSOS = [
  {
    id: 'wikihoje',
    titulo: 'O wiki',
    emoji: '🔑',
    nivel: 'A2',
    onde: 'A pessoa nova precisa achar o combinado sem uma call.',
    rodadas: [
      fala(
        'Lugar',
        'Where are the setup notes?',
        'Onde ficam as notas de setup?',
        'Diga que as notas de setup estão no wiki.',
        'The setup notes are in the wiki.',
        [
          'the setup notes are in the wiki',
          'setup notes are in the wiki',
          'the setup notes are on the wiki'
        ],
        'Setup notes são as notas de preparação. Wiki é a página do time.'
      ),
      fala(
        'Ajuda',
        'Who do I ask?',
        'Quem eu pergunto?',
        'Diga que a pessoa pode te chamar no canal do time.',
        'You can ping me in the team channel.',
        [
          'you can ping me in the team channel',
          'you can ping me on the team channel',
          'ping me in the team channel'
        ],
        'Ping me é me chamar. Team channel é o canal do time.'
      )
    ]
  },
  {
    id: 'conviterepo',
    titulo: 'O convite',
    emoji: '🔑',
    nivel: 'B1',
    onde: 'O repositório ainda não abriu para a pessoa nova.',
    rodadas: [
      fala(
        'Lugar',
        'I cannot see the repo.',
        'Eu não consigo ver o repositório.',
        'Diga que vai adicionar a pessoa ao repositório hoje.',
        'I will add you to the repo today.',
        [
          'i will add you to the repo today',
          'i will add you to the repository today',
          'i add you to the repo today'
        ],
        'Repo é o repositório. Today é hoje.'
      ),
      fala(
        'Ajuda',
        'What should I open first?',
        'O que eu abro primeiro?',
        'Diga que o primeiro arquivo é o README.',
        'The first file to open is the README.',
        [
          'the first file to open is the readme',
          'the first file is the readme',
          'open the readme first'
        ],
        'README é o arquivo de entrada. First file é o primeiro arquivo.'
      )
    ]
  },
  {
    id: 'pingbuild',
    titulo: 'Se falhar',
    emoji: '🔑',
    nivel: 'B1',
    onde: 'A pessoa nova vai rodar o projeto sozinha.',
    rodadas: [
      fala(
        'Lugar',
        'What if the build fails?',
        'E se o build falhar?',
        'Diga que a pessoa pode te chamar se o build falhar.',
        'Ping me if the build fails.',
        [
          'ping me if the build fails',
          'you can ping me if the build fails',
          'ping me if the build fails today'
        ],
        'Build é a construção do projeto. If it fails é se falhar.'
      ),
      fala(
        'Ajuda',
        'Should I wait for you?',
        'Eu espero por você?',
        'Diga que não precisa esperar, porque o log já ajuda.',
        'You do not need to wait. The log is enough.',
        [
          'you do not need to wait the log is enough',
          'you do not need to wait',
          'the log is enough'
        ],
        'Do not need to wait é não precisa esperar. The log é o registro.'
      )
    ]
  }
];

export const LICENCAS = [
  {
    id: 'ferramental',
    titulo: 'A ferramenta',
    emoji: '💳',
    nivel: 'B1',
    onde: 'O time precisa de uma licença paga. Não é um aumento.',
    rodadas: [
      fala(
        'Pedido',
        'What do you need?',
        'Do que você precisa?',
        'Diga que quer uma licença da ferramenta de desenho.',
        'I would like a license for the design tool.',
        [
          'i would like a license for the design tool',
          'i want a license for the design tool',
          'i would like a license for the drawing tool'
        ],
        'License é a licença. Design tool é a ferramenta de desenho.'
      ),
      fala(
        'Valor',
        'How much is it?',
        'Quanto custa?',
        'Diga que custa quarenta dólares por mês.',
        'It costs forty dollars a month.',
        [
          'it costs forty dollars a month',
          'it costs 40 dollars a month',
          'it costs forty dollars per month'
        ],
        'Forty dollars são quarenta dólares. A month é por mês.'
      )
    ]
  },
  {
    id: 'umlugar',
    titulo: 'Um lugar',
    emoji: '💳',
    nivel: 'B1',
    onde: 'Uma licença pode ser compartilhada.',
    rodadas: [
      fala(
        'Pedido',
        'Does everyone need a seat?',
        'Todo mundo precisa de um lugar?',
        'Diga que o time pode dividir um lugar.',
        'The team can share one seat.',
        [
          'the team can share one seat',
          'the team can share a seat',
          'we can share one seat'
        ],
        'Share é dividir. One seat é um lugar na licença.'
      ),
      fala(
        'Valor',
        'Who pays?',
        'Quem paga?',
        'Diga que o custo cabe no orçamento do time.',
        'The cost fits the team budget.',
        [
          'the cost fits the team budget',
          'this cost fits the team budget',
          'the cost fits our team budget'
        ],
        'Cost é o custo. Team budget é o orçamento do time.'
      )
    ]
  },
  {
    id: 'renovasexta',
    titulo: 'A sexta',
    emoji: '💳',
    nivel: 'A2',
    onde: 'A licença vence na sexta.',
    rodadas: [
      fala(
        'Pedido',
        'When does it end?',
        'Quando acaba?',
        'Diga que a licença vence na sexta.',
        'The license ends on Friday.',
        [
          'the license ends on friday',
          'the license ends this friday',
          'this license ends on friday'
        ],
        'Ends é vence. Friday é sexta.'
      ),
      fala(
        'Valor',
        'What should we do?',
        'O que a gente faz?',
        'Diga que vai pedir a renovação hoje.',
        'I will ask for the renewal today.',
        [
          'i will ask for the renewal today',
          'i will request the renewal today',
          'i ask for the renewal today'
        ],
        'Renewal é a renovação. Today é hoje.'
      )
    ]
  }
];

export const JARGOES = [
  {
    id: 'botaooff',
    titulo: 'O botão',
    emoji: '🧾',
    nivel: 'A2',
    onde: 'O suporte precisa avisar as pessoas, sem jargão.',
    rodadas: [
      fala(
        'Simples',
        'What do I tell customers?',
        'O que eu digo para as pessoas?',
        'Diga que vocês desligaram o botão novo.',
        'We turned the new button off.',
        [
          'we turned the new button off',
          'we turned off the new button',
          'we switched the new button off'
        ],
        'Turned off é desligaram. The new button é o botão novo.'
      ),
      fala(
        'Efeito',
        'Can they buy?',
        'Elas conseguem comprar?',
        'Diga que as pessoas conseguem comprar de novo.',
        'People can buy again.',
        [
          'people can buy again',
          'customers can buy again',
          'people can buy again now'
        ],
        'Buy again é comprar de novo. People são as pessoas.'
      )
    ]
  },
  {
    id: 'notasuporte',
    titulo: 'A nota curta',
    emoji: '🧾',
    nivel: 'B1',
    onde: 'O suporte quer um texto para colar.',
    rodadas: [
      fala(
        'Simples',
        'Can you write that down?',
        'Você escreve isso?',
        'Diga que vai escrever uma nota curta para o suporte.',
        'I will write a short note for support.',
        [
          'i will write a short note for support',
          'i will write a short note for the support team',
          'i write a short note for support'
        ],
        'A short note é uma nota curta. Support é o suporte.'
      ),
      fala(
        'Efeito',
        'What is the one line?',
        'Qual é a frase?',
        'Diga que a página carrega de novo.',
        'The page loads again.',
        [
          'the page loads again',
          'the page loads again now',
          'the page is loading again'
        ],
        'Loads again é carrega de novo. The page é a página.'
      )
    ]
  },
  {
    id: 'versaovelha',
    titulo: 'A versão antiga',
    emoji: '🧾',
    nivel: 'B1',
    onde: 'A pessoa do suporte não precisa do nome do deploy.',
    rodadas: [
      fala(
        'Simples',
        'Why did it break?',
        'Por que quebrou?',
        'Diga que uma mudança nova quebrou a página.',
        'A new change broke the page.',
        [
          'a new change broke the page',
          'the new change broke the page',
          'a new change broke this page'
        ],
        'A new change é uma mudança nova. Broke é quebrou.'
      ),
      fala(
        'Efeito',
        'Is it fixed?',
        'Já voltou?',
        'Diga que a página voltou para a versão antiga.',
        'The page is back to the old version.',
        [
          'the page is back to the old version',
          'the page is back to the old one',
          'we put the old version back'
        ],
        'Old version é a versão antiga. Is back é voltou.'
      )
    ]
  }
];

export function acessoPorId(id) {
  return ACESSOS.find(c => c.id === id) ?? null;
}

export function licencaPorId(id) {
  return LICENCAS.find(c => c.id === id) ?? null;
}

export function jargaoPorId(id) {
  return JARGOES.find(c => c.id === id) ?? null;
}

export function avaliarAcesso(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLicenca(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarJargao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
