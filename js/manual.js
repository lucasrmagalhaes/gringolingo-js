// Manual de plantão, troca entre lados e certificado do site.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const MANUAIS = [
  {
    id: 'leialerta',
    titulo: 'O alerta',
    emoji: '📘',
    nivel: 'A2',
    onde: 'O alerta disparou e o manual está aberto.',
    rodadas: [
      fala(
        'Passo',
        'How do we start?',
        'Como a gente começa?',
        'Diga que o manual manda ler o alerta primeiro.',
        'The runbook says to read the alert first.',
        [
          'the runbook says to read the alert first',
          'the runbook says read the alert first',
          'our runbook says to read the alert first'
        ],
        'Runbook é o manual. Read the alert first é ler o alerta primeiro.'
      ),
      fala(
        'Checagem',
        'Did you open it?',
        'Você abriu?',
        'Diga que você já abriu o wiki.',
        'I already opened the wiki.',
        [
          'i already opened the wiki',
          'i already opened our wiki',
          'i opened the wiki already'
        ],
        'Already é já. The wiki é o wiki do time.'
      )
    ]
  },
  {
    id: 'manualwiki',
    titulo: 'No wiki',
    emoji: '📘',
    nivel: 'A2',
    onde: 'Quem chegou agora pergunta onde está o manual.',
    rodadas: [
      fala(
        'Passo',
        'Where is the runbook?',
        'Onde está o manual?',
        'Diga que o manual fica no wiki do time.',
        'The runbook lives in the team wiki.',
        [
          'the runbook lives in the team wiki',
          'the runbook is in the team wiki',
          'our runbook lives in the team wiki'
        ],
        'Lives in é fica em. Team wiki é o wiki do time.'
      ),
      fala(
        'Checagem',
        'Where do people click?',
        'Onde as pessoas clicam?',
        'Diga que o link fica no topo do canal.',
        'The link sits at the top of the channel.',
        [
          'the link sits at the top of the channel',
          'the link is at the top of the channel',
          'the link sits at the top of our channel'
        ],
        'The link é o link. At the top é no topo.'
      )
    ]
  },
  {
    id: 'manualnovo',
    titulo: 'Em dia',
    emoji: '📘',
    nivel: 'B1',
    onde: 'Alguém pergunta se o manual ainda vale.',
    rodadas: [
      fala(
        'Passo',
        'Is the runbook current?',
        'O manual está em dia?',
        'Diga que este manual está em dia.',
        'This runbook is up to date.',
        [
          'this runbook is up to date',
          'the runbook is up to date',
          'this runbook is current'
        ],
        'Up to date é em dia. This runbook é este manual.'
      ),
      fala(
        'Checagem',
        'So what will you do?',
        'E o que você vai fazer?',
        'Diga que vai seguir do começo.',
        'I will follow it from the top.',
        [
          'i will follow it from the top',
          'i will follow the runbook from the top',
          'i will start from the top'
        ],
        'Follow it é seguir. From the top é do começo.'
      )
    ]
  }
];

export const VERDES = [
  {
    id: 'ladogreen',
    titulo: 'O lado verde',
    emoji: '🟢',
    nivel: 'B1',
    onde: 'A versão nova está no lado verde.',
    rodadas: [
      fala(
        'Tráfego',
        'Where does traffic go?',
        'Para onde vai o tráfego?',
        'Diga que o tráfego vai para o lado verde.',
        'Traffic moves to the green side.',
        [
          'traffic moves to the green side',
          'the traffic moves to the green side',
          'we move traffic to the green side'
        ],
        'Traffic é o tráfego. Green side é o lado verde.'
      ),
      fala(
        'Volta',
        'What about the old side?',
        'E o lado antigo?',
        'Diga que o lado azul continua pronto.',
        'The blue side stays ready.',
        [
          'the blue side stays ready',
          'our blue side stays ready',
          'the blue side is still ready'
        ],
        'Blue side é o lado azul. Stays ready é continua pronto.'
      )
    ]
  },
  {
    id: 'voltaminuto',
    titulo: 'Um minuto',
    emoji: '🟢',
    nivel: 'A2',
    onde: 'O time quer saber se dá para voltar.',
    rodadas: [
      fala(
        'Tráfego',
        'How fast can we go back?',
        'Em quanto tempo a gente volta?',
        'Diga que dá para voltar em um minuto.',
        'We can switch back in one minute.',
        [
          'we can switch back in one minute',
          'we can switch back in 1 minute',
          'we can switch back in a minute'
        ],
        'Switch back é voltar. One minute é um minuto.'
      ),
      fala(
        'Volta',
        'Will users notice?',
        'As pessoas vão notar?',
        'Diga que as pessoas não veem uma falha na troca.',
        'Users do not see a gap.',
        [
          'users do not see a gap',
          'users do not see any gap',
          'the users do not see a gap'
        ],
        'Users são as pessoas. A gap é uma falha na troca.'
      )
    ]
  },
  {
    id: 'verdepronto',
    titulo: 'Ao meio-dia',
    emoji: '🟢',
    nivel: 'A2',
    onde: 'A troca ainda não aconteceu.',
    rodadas: [
      fala(
        'Tráfego',
        'Is the new side ready?',
        'O lado novo está pronto?',
        'Diga que o lado verde está pronto.',
        'The green side is ready.',
        [
          'the green side is ready',
          'our green side is ready',
          'the green side is ready now'
        ],
        'Ready é pronto. Green side é o lado verde.'
      ),
      fala(
        'Volta',
        'When do we move?',
        'Quando a gente muda?',
        'Diga que o tráfego muda ao meio-dia.',
        'We move traffic at noon.',
        [
          'we move traffic at noon',
          'we will move traffic at noon',
          'traffic moves at noon'
        ],
        'At noon é ao meio-dia. Move traffic é mudar o tráfego.'
      )
    ]
  }
];

export const CERTIFICADOS = [
  {
    id: 'vencesexta',
    titulo: 'Na sexta',
    emoji: '🔏',
    nivel: 'A2',
    onde: 'O certificado do site está perto do fim.',
    rodadas: [
      fala(
        'Prazo',
        'When does it expire?',
        'Quando ele vence?',
        'Diga que o certificado vence na sexta.',
        'The certificate expires on Friday.',
        [
          'the certificate expires on friday',
          'our certificate expires on friday',
          'the certificate expires this friday'
        ],
        'Certificate é o certificado. Expires on Friday é vence na sexta.'
      ),
      fala(
        'Aviso',
        'What will you do?',
        'O que você vai fazer?',
        'Diga que vai renovar hoje.',
        'I will renew it today.',
        [
          'i will renew it today',
          'i will renew the certificate today',
          'i renew it today'
        ],
        'Renew é renovar. Today é hoje.'
      )
    ]
  },
  {
    id: 'setedias',
    titulo: 'Sete dias',
    emoji: '🔏',
    nivel: 'B1',
    onde: 'O aviso aparece antes do vencimento.',
    rodadas: [
      fala(
        'Prazo',
        'When does the warning show?',
        'Quando o aviso aparece?',
        'Diga que o aviso aparece sete dias antes.',
        'The warning shows seven days before.',
        [
          'the warning shows seven days before',
          'the warning shows 7 days before',
          'the warning appears seven days before'
        ],
        'Warning é o aviso. Seven days before é sete dias antes.'
      ),
      fala(
        'Aviso',
        'And the old one?',
        'E o antigo?',
        'Diga que o certificado velho para na sexta.',
        'The old certificate stops on Friday.',
        [
          'the old certificate stops on friday',
          'the old certificate stops this friday',
          'our old certificate stops on friday'
        ],
        'Old certificate é o certificado velho. Stops é para.'
      )
    ]
  },
  {
    id: 'certsegunda',
    titulo: 'Na segunda',
    emoji: '🔏',
    nivel: 'A2',
    onde: 'A troca do certificado já tem data.',
    rodadas: [
      fala(
        'Prazo',
        'When does the new one start?',
        'Quando o novo começa?',
        'Diga que o certificado novo começa na segunda.',
        'The new certificate starts on Monday.',
        [
          'the new certificate starts on monday',
          'our new certificate starts on monday',
          'the new certificate starts this monday'
        ],
        'New certificate é o certificado novo. Monday é segunda.'
      ),
      fala(
        'Aviso',
        'Will the site go down?',
        'O site vai cair?',
        'Diga que o site continua no ar o tempo todo.',
        'The site stays up the whole time.',
        [
          'the site stays up the whole time',
          'the site stays up the entire time',
          'our site stays up the whole time'
        ],
        'Stays up é continua no ar. The whole time é o tempo todo.'
      )
    ]
  }
];

export function manualPorId(id) {
  return MANUAIS.find(c => c.id === id) ?? null;
}

export function verdePorId(id) {
  return VERDES.find(c => c.id === id) ?? null;
}

export function certificadoPorId(id) {
  return CERTIFICADOS.find(c => c.id === id) ?? null;
}

export function avaliarManual(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVerde(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCertificado(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
