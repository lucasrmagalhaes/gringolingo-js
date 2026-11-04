// Lider que conduz o mandato, mandato que sobe na eleicao e seguidor que copia o registro.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const LIDERES = [
  {
    id: 'conduzlider',
    titulo: 'Condução do líder',
    emoji: '🧭',
    nivel: 'A2',
    onde: 'O líder conduz o mandato.',
    rodadas: [
      fala(
        'Conduz',
        'What does the leader guide?',
        'O que o líder conduz?',
        'Diga que o líder conduz o mandato.',
        'The leader guides the term.',
        ['the leader guides the term', 'that leader guides the term'],
        'The term é o mandato.'
      ),
      fala(
        'Segue',
        'What should we do with the leader?',
        'O que a gente faz com o líder?',
        'Peça para seguir o líder.',
        'Please follow the leader.',
        ['please follow the leader', 'follow the leader'],
        'Follow the leader é seguir o líder.'
      )
    ]
  },
  {
    id: 'lider3',
    titulo: 'Líder três',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'O líder conduziu três nós.',
    rodadas: [
      fala(
        'Conduz',
        'How many nodes did the leader guide?',
        'Quantos nós o líder conduziu?',
        'Diga que o líder conduziu três nós.',
        'The leader guided three nodes.',
        [
          'the leader guided three nodes',
          'the leader guided 3 nodes',
          'that leader guided three nodes'
        ],
        'Three nodes é três nós.'
      ),
      fala(
        'Segue',
        'Where should we cap the term?',
        'Onde a gente limita o mandato?',
        'Peça para conduzir três nós.',
        'Please guide three nodes.',
        [
          'please guide three nodes',
          'please guide 3 nodes',
          'guide three nodes'
        ],
        'Guide three nodes é conduzir três nós.'
      )
    ]
  },
  {
    id: 'liderok',
    titulo: 'Líder no alvo',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'O líder pode ficar.',
    rodadas: [
      fala(
        'Conduz',
        'Can the leader stay?',
        'O líder pode ficar?',
        'Diga que o líder pode ficar.',
        'The leader can stay.',
        ['the leader can stay', 'that leader can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this term stay open?',
        'Este mandato pode ficar aberto?',
        'Diga que este mandato pode ficar aberto.',
        'This term can stay open.',
        ['this term can stay open', 'that term can stay open'],
        'Stay open é ficar aberto.'
      )
    ]
  }
];

export const MANDATOS = [
  {
    id: 'numeromandato',
    titulo: 'Número do mandato',
    emoji: '📜',
    nivel: 'A2',
    onde: 'Cada eleição sobe o número.',
    rodadas: [
      fala(
        'Sobe',
        'What does each election do?',
        'O que cada eleição faz?',
        'Diga que cada eleição sobe o mandato.',
        'Each election raises the term.',
        ['each election raises the term', 'every election raises the term'],
        'Raises the term é sobe o mandato.'
      ),
      fala(
        'Fecha',
        'What should we do with the number?',
        'O que a gente faz com o número?',
        'Peça para subir o número do mandato.',
        'Please raise the term number.',
        ['please raise the term number', 'raise the term number'],
        'The term number é o número do mandato.'
      )
    ]
  },
  {
    id: 'mandato2',
    titulo: 'Mandato dois',
    emoji: '📜',
    nivel: 'B1',
    onde: 'O mandato subiu dois.',
    rodadas: [
      fala(
        'Sobe',
        'By how much did the term rise?',
        'Quanto o mandato subiu?',
        'Diga que o mandato subiu dois.',
        'The term rose by two.',
        [
          'the term rose by two',
          'the term rose by 2',
          'that term rose by two'
        ],
        'By two é dois.'
      ),
      fala(
        'Fecha',
        'Where should we cap the rise?',
        'Onde a gente limita a subida?',
        'Peça para subir o mandato em dois.',
        'Please raise the term by two.',
        [
          'please raise the term by two',
          'please raise the term by 2',
          'raise the term by two'
        ],
        'Raise the term é subir o mandato.'
      )
    ]
  },
  {
    id: 'mandatok',
    titulo: 'Mandato no alvo',
    emoji: '📜',
    nivel: 'B1',
    onde: 'O mandato novo pode ficar.',
    rodadas: [
      fala(
        'Sobe',
        'Can the new term stay?',
        'O mandato novo pode ficar?',
        'Diga que o mandato novo pode ficar.',
        'The new term can stay.',
        ['the new term can stay', 'that new term can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can the old term leave?',
        'O mandato antigo pode sair?',
        'Diga que o mandato antigo pode sair.',
        'The old term can leave.',
        ['the old term can leave', 'that old term can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export const SEGUIDORES = [
  {
    id: 'copiaseguidor',
    titulo: 'Cópia do seguidor',
    emoji: '👣',
    nivel: 'A2',
    onde: 'O seguidor copia o registro.',
    rodadas: [
      fala(
        'Copia',
        'What does the follower copy?',
        'O que o seguidor copia?',
        'Diga que o seguidor copia o registro.',
        'The follower copies the log.',
        ['the follower copies the log', 'that follower copies the log'],
        'The log é o registro.'
      ),
      fala(
        'Espera',
        'What should the follower do?',
        'O que o seguidor deve fazer?',
        'Peça para copiar o registro.',
        'Please copy the log.',
        ['please copy the log', 'copy the log'],
        'Copy the log é copiar o registro.'
      )
    ]
  },
  {
    id: 'seguidor4',
    titulo: 'Seguidor quatro',
    emoji: '👣',
    nivel: 'B1',
    onde: 'O seguidor copiou quatro linhas.',
    rodadas: [
      fala(
        'Copia',
        'How many lines did the follower copy?',
        'Quantas linhas o seguidor copiou?',
        'Diga que o seguidor copiou quatro linhas.',
        'The follower copied four lines.',
        [
          'the follower copied four lines',
          'the follower copied 4 lines',
          'that follower copied four lines'
        ],
        'Four lines é quatro linhas.'
      ),
      fala(
        'Espera',
        'Where should we cap the copy?',
        'Onde a gente limita a cópia?',
        'Peça para copiar quatro linhas.',
        'Please copy four lines.',
        [
          'please copy four lines',
          'please copy 4 lines',
          'copy four lines'
        ],
        'Copy four lines é copiar quatro linhas.'
      )
    ]
  },
  {
    id: 'seguidorok',
    titulo: 'Seguidor no alvo',
    emoji: '👣',
    nivel: 'B1',
    onde: 'A cópia pode ficar.',
    rodadas: [
      fala(
        'Copia',
        'Can the copy stay?',
        'A cópia pode ficar?',
        'Diga que a cópia pode ficar.',
        'The copy can stay.',
        ['the copy can stay', 'that copy can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Espera',
        'Can the follower stay quiet?',
        'O seguidor pode ficar quieto?',
        'Diga que o seguidor pode ficar quieto.',
        'The follower can stay quiet.',
        ['the follower can stay quiet', 'that follower can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function liderPorId(id) {
  return LIDERES.find(c => c.id === id) ?? null;
}

export function mandatoPorId(id) {
  return MANDATOS.find(c => c.id === id) ?? null;
}

export function seguidorPorId(id) {
  return SEGUIDORES.find(c => c.id === id) ?? null;
}

export function avaliarLider(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMandato(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSeguidor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
