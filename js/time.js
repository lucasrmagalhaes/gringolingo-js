// Arquitetura para quem chegou, feedback duro e a proposta técnica.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const MAPAS = [
  {
    id: 'camadas',
    titulo: 'As camadas',
    emoji: '🗺️',
    nivel: 'B1',
    onde: 'Uma pessoa nova pede o mapa do sistema.',
    rodadas: [
      fala(
        'Arquitetura',
        'How is the system shaped?',
        'Como o sistema é organizado?',
        'Diga que o navegador chama uma API.',
        'The browser calls one API.',
        [
          'the browser calls one api',
          'the browser calls a single api',
          'our browser calls one api'
        ],
        'Browser é o navegador. API é a camada do meio.'
      ),
      fala(
        'Fluxo',
        'Where does the data live?',
        'Onde os dados ficam?',
        'Diga que essa API lê de um banco só.',
        'That API reads from one database.',
        [
          'that api reads from one database',
          'the api reads from one database',
          'that api reads from a single database'
        ],
        'Reads from é lê de. One database é um banco só.'
      )
    ]
  },
  {
    id: 'ramo',
    titulo: 'O fluxo',
    emoji: '🗺️',
    nivel: 'B1',
    onde: 'Explique como uma tarefa anda, sem falar da primeira tarefa.',
    rodadas: [
      fala(
        'Arquitetura',
        'How do we start a task?',
        'Como a gente começa uma tarefa?',
        'Diga que cada tarefa começa num ramo novo.',
        'Each task starts on a new branch.',
        [
          'each task starts on a new branch',
          'every task starts on a new branch',
          'each task starts in a new branch'
        ],
        'Branch é o ramo. A task é a tarefa.'
      ),
      fala(
        'Fluxo',
        'When can it land?',
        'Quando ela pode entrar?',
        'Diga que vocês juntam depois que os testes passam.',
        'We merge after the tests pass.',
        [
          'we merge after the tests pass',
          'we merge after tests pass',
          'we merge once the tests pass'
        ],
        'Merge é juntar. After the tests pass é depois dos testes.'
      )
    ]
  },
  {
    id: 'acordo',
    titulo: 'A daily',
    emoji: '🗺️',
    nivel: 'A2',
    onde: 'A pessoa nova pergunta da reunião curta da manhã.',
    rodadas: [
      fala(
        'Arquitetura',
        'How long is the morning meeting?',
        'Quanto dura a reunião da manhã?',
        'Diga que a daily dura 15 minutos.',
        'The daily lasts 15 minutes.',
        [
          'the daily lasts 15 minutes',
          'the daily lasts fifteen minutes',
          'our daily lasts 15 minutes'
        ],
        'Daily é a reunião curta. 15 minutes é quinze minutos.'
      ),
      fala(
        'Fluxo',
        'What do people say there?',
        'O que as pessoas falam lá?',
        'Diga que a pessoa conta o que terminou e o que está travado.',
        'You say what you finished and what is blocked.',
        [
          'you say what you finished and what is blocked',
          'you say what you finished and what is blocking you',
          'we say what we finished and what is blocked'
        ],
        'Finished é o que terminou. Blocked é o que está travado.'
      )
    ]
  }
];

export const DUROS = [
  {
    id: 'faltou',
    titulo: 'A data que passou',
    emoji: '🗣️',
    nivel: 'B1',
    onde: 'Você recebe um ponto duro sobre uma data.',
    rodadas: [
      fala(
        'Ponto',
        'The date passed and nobody heard from you.',
        'A data passou e ninguém teve notícia.',
        'Diga que perdeu a data e que devia ter avisado antes.',
        'I missed the date and I should have said so sooner.',
        [
          'i missed the date and i should have said so sooner',
          'i missed the date and i should have told you sooner',
          'i missed the deadline and i should have said so sooner'
        ],
        'I missed the date assume o atraso. Sooner é mais cedo.'
      ),
      fala(
        'Pedido',
        'What will you do next time?',
        'O que você faz da próxima vez?',
        'Diga que vai mandar um recado escrito toda manhã.',
        'I will send a written note every morning.',
        [
          'i will send a written note every morning',
          'i will send a written update every morning',
          'i will write a note every morning'
        ],
        'A written note é um recado escrito. Every morning é toda manhã.'
      )
    ]
  },
  {
    id: 'travado',
    titulo: 'A review parada',
    emoji: '🗣️',
    nivel: 'B2',
    onde: 'Você precisa dizer que a review está parada.',
    rodadas: [
      fala(
        'Ponto',
        'How is the review going?',
        'Como está a review?',
        'Diga que esta mudança espera há 3 dias.',
        'This change has been waiting for 3 days.',
        [
          'this change has been waiting for 3 days',
          'this change has been waiting for three days',
          'the change has been waiting for 3 days'
        ],
        'Waiting for é esperando. 3 days são três dias.'
      ),
      fala(
        'Pedido',
        'What do you need from me?',
        'O que você precisa de mim?',
        'Peça para escolher um dia para terminar a review.',
        'Can we pick a day to finish the review?',
        [
          'can we pick a day to finish the review',
          'could we pick a day to finish the review',
          'can we choose a day to finish the review'
        ],
        'Pick a day é escolher um dia. Finish the review é terminar a revisão.'
      )
    ]
  },
  {
    id: 'clareza',
    titulo: 'O recado curto',
    emoji: '🗣️',
    nivel: 'B1',
    onde: 'O ponto duro é que o recado não dava para seguir.',
    rodadas: [
      fala(
        'Ponto',
        'I could not follow your last note.',
        'Não consegui seguir o seu último recado.',
        'Diga que entendeu que os recados estavam difíceis de seguir.',
        'I hear that my notes were hard to follow.',
        [
          'i hear that my notes were hard to follow',
          'i hear that my notes were difficult to follow',
          'i understand that my notes were hard to follow'
        ],
        'I hear that recebe o ponto. Hard to follow é difícil de seguir.'
      ),
      fala(
        'Pedido',
        'What will change in the next note?',
        'O que muda no próximo recado?',
        'Diga que vai incluir o motivo, não só o status.',
        'I will add the reason, not only the status.',
        [
          'i will add the reason not only the status',
          'i will add the reason and not only the status',
          'i will include the reason not only the status'
        ],
        'The reason é o motivo. Not only the status é não só o estado.'
      )
    ]
  }
];

export const PROPOSTAS = [
  {
    id: 'jobs',
    titulo: 'A fila da proposta',
    emoji: '📐',
    nivel: 'B1',
    onde: 'Você apresenta a RFC. Ainda não é a decisão tomada.',
    rodadas: [
      fala(
        'Proposta',
        'What are you proposing?',
        'O que você está propondo?',
        'Proponha gravar cada job numa fila.',
        'I propose we write each job to a queue.',
        [
          'i propose we write each job to a queue',
          'i propose we put each job on a queue',
          'i suggest we write each job to a queue'
        ],
        'I propose abre a proposta. A queue é a fila.'
      ),
      fala(
        'Troca',
        'What does this cost us?',
        'Quanto isso custa?',
        'Diga que o preço é uma espera curta antes do e-mail sair.',
        'The price is a short wait before the mail goes out.',
        [
          'the price is a short wait before the mail goes out',
          'the price is a short wait before the email goes out',
          'the cost is a short wait before the mail goes out'
        ],
        'The price is é o preço. A short wait é uma espera curta.'
      )
    ]
  },
  {
    id: 'defesa',
    titulo: 'A defesa',
    emoji: '📐',
    nivel: 'B2',
    onde: 'Alguém pergunta por que não o outro caminho.',
    rodadas: [
      fala(
        'Proposta',
        'Why not send the mail right away?',
        'Por que não mandar o e-mail na hora?',
        'Diga que ainda prefere a fila porque um job que falha pode tentar de novo.',
        'I still prefer the queue because a failed job can retry.',
        [
          'i still prefer the queue because a failed job can retry',
          'i still prefer the queue because a failed job can try again',
          'i prefer the queue because a failed job can retry'
        ],
        'I still prefer defende a escolha. Retry é tentar de novo.'
      ),
      fala(
        'Troca',
        'What does the other option need?',
        'O que a outra opção precisa?',
        'Diga que a outra opção precisa de uma pessoa para reenviar o e-mail.',
        'The other option needs a person to resend the mail.',
        [
          'the other option needs a person to resend the mail',
          'the other option needs a person to resend the email',
          'the other option needs someone to resend the mail'
        ],
        'The other option é o outro caminho. Resend é reenviar.'
      )
    ]
  },
  {
    id: 'simples',
    titulo: 'Atrás da flag',
    emoji: '📐',
    nivel: 'B1',
    onde: 'A primeira versão da proposta fica atrás de uma chave.',
    rodadas: [
      fala(
        'Proposta',
        'How do we release the first version?',
        'Como a gente solta a primeira versão?',
        'Proponha soltar a primeira versão atrás de uma flag.',
        'I propose we ship the first version behind a flag.',
        [
          'i propose we ship the first version behind a flag',
          'i propose we release the first version behind a flag',
          'i suggest we ship the first version behind a flag'
        ],
        'Behind a flag é atrás de uma chave. First version é a primeira versão.'
      ),
      fala(
        'Troca',
        'What do we live with until then?',
        'Com o que a gente convive até lá?',
        'Diga que o preço são dois caminhos até tirar a flag.',
        'The price is two paths until we remove the flag.',
        [
          'the price is two paths until we remove the flag',
          'the price is two paths until we delete the flag',
          'the cost is two paths until we remove the flag'
        ],
        'Two paths são dois caminhos. Remove the flag é tirar a chave.'
      )
    ]
  }
];

export function mapaPorId(id) {
  return MAPAS.find(c => c.id === id) ?? null;
}

export function duroPorId(id) {
  return DUROS.find(c => c.id === id) ?? null;
}

export function propostaPorId(id) {
  return PROPOSTAS.find(c => c.id === id) ?? null;
}

export function avaliarMapa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDuro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarProposta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
