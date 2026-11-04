// Epoch que abre o termo, ballot que conta o voto e fence que segura a escrita.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const EPOCHS = [
  {
    id: 'epochbase',
    titulo: 'Abre do epoch',
    emoji: '🌅',
    nivel: 'A2',
    onde: 'O epoch abre o termo.',
    rodadas: [
      fala(
        'Abre',
        'What does the epoch start?',
        'O que o epoch abre?',
        'Diga que o epoch abre o termo.',
        'The epoch starts the term.',
        [
          'the epoch starts the term',
          'that epoch starts the term'
        ],
        'The term é o termo.'
      ),
      fala(
        'Segue',
        'What should the epoch do with the term?',
        'O que o epoch deve fazer com o termo?',
        'Peça para abrir o termo.',
        'Please start the term.',
        [
          'please start the term',
          'start the term'
        ],
        'Start the term é abrir o termo.'
      )
    ]
  },
  {
    id: 'epoch2',
    titulo: 'Epoch dois',
    emoji: '🌅',
    nivel: 'B1',
    onde: 'O epoch abriu dois termos.',
    rodadas: [
      fala(
        'Abre',
        'How many terms did the epoch start?',
        'Quantos termos o epoch abriu?',
        'Diga que o epoch abriu dois termos.',
        'The epoch started two terms.',
        [
          'the epoch started two terms',
          'the epoch started 2 terms',
          'that epoch started two terms'
        ],
        'Two terms é dois termos.'
      ),
      fala(
        'Segue',
        'Where should we cap the terms?',
        'Onde a gente limita os termos?',
        'Peça para abrir dois termos.',
        'Please start two terms.',
        ['please start two terms', 'please start 2 terms', 'start two terms'],
        'Start two terms é abrir dois termos.'
      )
    ]
  },
  {
    id: 'epochok',
    titulo: 'Epoch no alvo',
    emoji: '🌅',
    nivel: 'B1',
    onde: 'O epoch pode ficar.',
    rodadas: [
      fala(
        'Abre',
        'Can the epoch stay?',
        'O epoch pode ficar?',
        'Diga que o epoch pode ficar.',
        'The epoch can stay.',
        ['the epoch can stay', 'that epoch can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this epoch stay quiet?',
        'Este epoch pode ficar quieto?',
        'Diga que este epoch pode ficar quieto.',
        'This epoch can stay quiet.',
        ['this epoch can stay quiet', 'that epoch can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const BALLOTS = [
  {
    id: 'ballotbase',
    titulo: 'Conta do ballot',
    emoji: '🗳️',
    nivel: 'A2',
    onde: 'O ballot conta o voto.',
    rodadas: [
      fala(
        'Conta',
        'What does the ballot count?',
        'O que o ballot conta?',
        'Diga que o ballot conta o voto.',
        'The ballot counts the vote.',
        [
          'the ballot counts the vote',
          'that ballot counts the vote'
        ],
        'The vote é o voto.'
      ),
      fala(
        'Segue',
        'What should the ballot do with the vote?',
        'O que o ballot deve fazer com o voto?',
        'Peça para contar o voto.',
        'Please count the vote.',
        [
          'please count the vote',
          'count the vote'
        ],
        'Count the vote é contar o voto.'
      )
    ]
  },
  {
    id: 'ballot3',
    titulo: 'Ballot três',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'O ballot contou três votos.',
    rodadas: [
      fala(
        'Conta',
        'How many votes did the ballot count?',
        'Quantos votos o ballot contou?',
        'Diga que o ballot contou três votos.',
        'The ballot counted three votes.',
        [
          'the ballot counted three votes',
          'the ballot counted 3 votes',
          'that ballot counted three votes'
        ],
        'Three votes é três votos.'
      ),
      fala(
        'Segue',
        'Where should we cap the votes?',
        'Onde a gente limita os votos?',
        'Peça para contar três votos.',
        'Please count three votes.',
        ['please count three votes', 'please count 3 votes', 'count three votes'],
        'Count three votes é contar três votos.'
      )
    ]
  },
  {
    id: 'ballotok',
    titulo: 'Ballot no alvo',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'O ballot pode ficar.',
    rodadas: [
      fala(
        'Conta',
        'Can the ballot stay?',
        'O ballot pode ficar?',
        'Diga que o ballot pode ficar.',
        'The ballot can stay.',
        ['the ballot can stay', 'that ballot can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this ballot stay quiet?',
        'Este ballot pode ficar quieto?',
        'Diga que este ballot pode ficar quieto.',
        'This ballot can stay quiet.',
        ['this ballot can stay quiet', 'that ballot can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const FENCES = [
  {
    id: 'fencebase',
    titulo: 'Segura da fence',
    emoji: '🪵',
    nivel: 'A2',
    onde: 'A fence segura a escrita.',
    rodadas: [
      fala(
        'Segura',
        'What does the fence block?',
        'O que a fence segura?',
        'Diga que a fence segura a escrita.',
        'The fence blocks the write.',
        [
          'the fence blocks the write',
          'that fence blocks the write'
        ],
        'The write é a escrita.'
      ),
      fala(
        'Segue',
        'What should the fence do with the write?',
        'O que a fence deve fazer com a escrita?',
        'Peça para segurar a escrita.',
        'Please block the write.',
        [
          'please block the write',
          'block the write'
        ],
        'Block the write é segurar a escrita.'
      )
    ]
  },
  {
    id: 'fence4',
    titulo: 'Fence quatro',
    emoji: '🪵',
    nivel: 'B1',
    onde: 'A fence segurou quatro escritas.',
    rodadas: [
      fala(
        'Segura',
        'How many writes did the fence block?',
        'Quantas escritas a fence segurou?',
        'Diga que a fence segurou quatro escritas.',
        'The fence blocked four writes.',
        [
          'the fence blocked four writes',
          'the fence blocked 4 writes',
          'that fence blocked four writes'
        ],
        'Four writes é quatro escritas.'
      ),
      fala(
        'Segue',
        'Where should we cap the writes?',
        'Onde a gente limita as escritas?',
        'Peça para segurar quatro escritas.',
        'Please block four writes.',
        ['please block four writes', 'please block 4 writes', 'block four writes'],
        'Block four writes é segurar quatro escritas.'
      )
    ]
  },
  {
    id: 'fenceok',
    titulo: 'Fence no alvo',
    emoji: '🪵',
    nivel: 'B1',
    onde: 'A fence pode ficar.',
    rodadas: [
      fala(
        'Segura',
        'Can the fence stay?',
        'A fence pode ficar?',
        'Diga que a fence pode ficar.',
        'The fence can stay.',
        ['the fence can stay', 'that fence can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this fence stay quiet?',
        'Esta fence pode ficar quieta?',
        'Diga que esta fence pode ficar quieta.',
        'This fence can stay quiet.',
        ['this fence can stay quiet', 'that fence can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function epochPorId(id) {
  return EPOCHS.find(c => c.id === id) ?? null;
}

export function ballotPorId(id) {
  return BALLOTS.find(c => c.id === id) ?? null;
}

export function fencePorId(id) {
  return FENCES.find(c => c.id === id) ?? null;
}

export function avaliarEpoch(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBallot(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFence(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
