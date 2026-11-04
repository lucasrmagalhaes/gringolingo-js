// Quorum que exige a maioria, maioria que confirma a escrita e arbitro que desempata a rede.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const QUORUMS = [
  {
    id: 'escrevequorum',
    titulo: 'Espera do quórum',
    emoji: '🗳️',
    nivel: 'A2',
    onde: 'A escrita espera a maioria.',
    rodadas: [
      fala(
        'Espera',
        'What does the write wait for?',
        'A escrita espera o quê?',
        'Diga que a escrita espera a maioria.',
        'The write waits for a majority.',
        ['the write waits for a majority', 'that write waits for a majority'],
        'A majority é a maioria.'
      ),
      fala(
        'Grava',
        'What should we do before the write?',
        'O que a gente faz antes da escrita?',
        'Peça para esperar a maioria.',
        'Please wait for a majority.',
        ['please wait for a majority', 'wait for a majority'],
        'Wait for a majority é esperar a maioria.'
      )
    ]
  },
  {
    id: 'quorum3',
    titulo: 'Quórum três',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'O quórum esperou três nós.',
    rodadas: [
      fala(
        'Espera',
        'How many nodes did the quorum wait for?',
        'Quantos nós o quórum esperou?',
        'Diga que o quórum esperou três nós.',
        'The quorum waited for three nodes.',
        [
          'the quorum waited for three nodes',
          'the quorum waited for 3 nodes',
          'that quorum waited for three nodes'
        ],
        'Three nodes é três nós.'
      ),
      fala(
        'Grava',
        'Where should we cap the quorum?',
        'Onde a gente limita o quórum?',
        'Peça para esperar três nós.',
        'Please wait for three nodes.',
        [
          'please wait for three nodes',
          'please wait for 3 nodes',
          'wait for three nodes'
        ],
        'Wait for three nodes é esperar três nós.'
      )
    ]
  },
  {
    id: 'quorumok',
    titulo: 'Quórum no alvo',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'A escrita pode ficar.',
    rodadas: [
      fala(
        'Espera',
        'Can the write stay?',
        'A escrita pode ficar?',
        'Diga que a escrita pode ficar.',
        'The write can stay.',
        ['the write can stay', 'that write can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Grava',
        'Can this quorum stay closed?',
        'Este quórum pode ficar fechado?',
        'Diga que este quórum pode ficar fechado.',
        'This quorum can stay closed.',
        ['this quorum can stay closed', 'that quorum can stay closed'],
        'Stay closed é ficar fechado.'
      )
    ]
  }
];

export const MAIORIAS = [
  {
    id: 'metademaioria',
    titulo: 'Metade da maioria',
    emoji: '✋',
    nivel: 'A2',
    onde: 'Mais da metade precisa confirmar.',
    rodadas: [
      fala(
        'Confirma',
        'How many nodes must confirm?',
        'Quantos nós precisam confirmar?',
        'Diga que mais da metade precisa confirmar.',
        'More than half must confirm.',
        ['more than half must confirm', 'that more than half must confirm'],
        'More than half é mais da metade.'
      ),
      fala(
        'Recusa',
        'What should we do with the votes?',
        'O que a gente faz com os votos?',
        'Peça para esperar mais da metade.',
        'Please wait for more than half.',
        ['please wait for more than half', 'wait for more than half'],
        'More than half é mais da metade.'
      )
    ]
  },
  {
    id: 'maioria5',
    titulo: 'Maioria cinco',
    emoji: '✋',
    nivel: 'B1',
    onde: 'A maioria contou cinco votos.',
    rodadas: [
      fala(
        'Confirma',
        'How many votes did the majority count?',
        'Quantos votos a maioria contou?',
        'Diga que a maioria contou cinco votos.',
        'The majority counted five votes.',
        [
          'the majority counted five votes',
          'the majority counted 5 votes',
          'that majority counted five votes'
        ],
        'Five votes é cinco votos.'
      ),
      fala(
        'Recusa',
        'Where should we cap the count?',
        'Onde a gente limita a conta?',
        'Peça para contar cinco votos.',
        'Please count five votes.',
        [
          'please count five votes',
          'please count 5 votes',
          'count five votes'
        ],
        'Count five votes é contar cinco votos.'
      )
    ]
  },
  {
    id: 'maioriaok',
    titulo: 'Maioria no alvo',
    emoji: '✋',
    nivel: 'B1',
    onde: 'O voto extra pode ficar.',
    rodadas: [
      fala(
        'Confirma',
        'Can the extra vote stay?',
        'O voto extra pode ficar?',
        'Diga que o voto extra pode ficar.',
        'The extra vote can stay.',
        ['the extra vote can stay', 'that extra vote can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Recusa',
        'Can the weak side leave?',
        'O lado fraco pode sair?',
        'Diga que o lado fraco pode sair.',
        'The weak side can leave.',
        ['the weak side can leave', 'that weak side can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export const ARBITROS = [
  {
    id: 'redearbitro',
    titulo: 'Rede do árbitro',
    emoji: '⚖️',
    nivel: 'A2',
    onde: 'O árbitro desempata a rede.',
    rodadas: [
      fala(
        'Desempata',
        'What does the arbiter do?',
        'O que o árbitro faz?',
        'Diga que o árbitro desempata.',
        'The arbiter breaks the tie.',
        ['the arbiter breaks the tie', 'that arbiter breaks the tie'],
        'Breaks the tie é desempata.'
      ),
      fala(
        'Escolhe',
        'What should we do with the tie?',
        'O que a gente faz com o empate?',
        'Peça para desempatar agora.',
        'Please break the tie now.',
        ['please break the tie now', 'break the tie now'],
        'Break the tie é desempatar.'
      )
    ]
  },
  {
    id: 'umvoto',
    titulo: 'Árbitro um',
    emoji: '⚖️',
    nivel: 'B1',
    onde: 'O árbitro deu um voto.',
    rodadas: [
      fala(
        'Desempata',
        'How many votes did the arbiter cast?',
        'Quantos votos o árbitro deu?',
        'Diga que o árbitro deu um voto.',
        'The arbiter cast one vote.',
        [
          'the arbiter cast one vote',
          'the arbiter cast 1 vote',
          'that arbiter cast one vote'
        ],
        'One vote é um voto.'
      ),
      fala(
        'Escolhe',
        'What should the arbiter cast?',
        'O que o árbitro deve dar?',
        'Peça para dar um voto.',
        'Please cast one vote.',
        [
          'please cast one vote',
          'please cast 1 vote',
          'cast one vote'
        ],
        'Cast one vote é dar um voto.'
      )
    ]
  },
  {
    id: 'arbitrook',
    titulo: 'Árbitro no alvo',
    emoji: '⚖️',
    nivel: 'B1',
    onde: 'O lado escolhido pode ficar.',
    rodadas: [
      fala(
        'Desempata',
        'Can the chosen side stay?',
        'O lado escolhido pode ficar?',
        'Diga que o lado escolhido pode ficar.',
        'The chosen side can stay.',
        ['the chosen side can stay', 'that chosen side can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Escolhe',
        'Can the other side leave?',
        'O outro lado pode sair?',
        'Diga que o outro lado pode sair.',
        'The other side can leave.',
        ['the other side can leave', 'that other side can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export function quorumPorId(id) {
  return QUORUMS.find(c => c.id === id) ?? null;
}

export function maioriaPorId(id) {
  return MAIORIAS.find(c => c.id === id) ?? null;
}

export function arbitroPorId(id) {
  return ARBITROS.find(c => c.id === id) ?? null;
}

export function avaliarQuorum(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMaioria(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarArbitro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
