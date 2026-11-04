// Orquestrador que dispara a sequencia, coreografia do vizinho e compensacao que desfaz a etapa.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const ORQUESTRADORES = [
  {
    id: 'chamaorquestra',
    titulo: 'Chamada do orquestrador',
    emoji: '🎼',
    nivel: 'A2',
    onde: 'O coordenador dispara a sequência.',
    rodadas: [
      fala(
        'Chama',
        'What does the orchestrator fire?',
        'O que o orquestrador dispara?',
        'Diga que o orquestrador dispara a sequência.',
        'The orchestrator fires the sequence.',
        ['the orchestrator fires the sequence', 'that orchestrator fires the sequence'],
        'The sequence é a sequência.'
      ),
      fala(
        'Espera',
        'What should we do with the sequence?',
        'O que a gente faz com a sequência?',
        'Peça para disparar a sequência.',
        'Please fire the sequence.',
        ['please fire the sequence', 'fire the sequence'],
        'Fire the sequence é disparar a sequência.'
      )
    ]
  },
  {
    id: 'orquestra2',
    titulo: 'Orquestrador dois',
    emoji: '🎼',
    nivel: 'B1',
    onde: 'O orquestrador disparou dois passos.',
    rodadas: [
      fala(
        'Chama',
        'How many steps did the orchestrator fire?',
        'Quantos passos o orquestrador disparou?',
        'Diga que o orquestrador disparou dois passos.',
        'The orchestrator fired two steps.',
        [
          'the orchestrator fired two steps',
          'the orchestrator fired 2 steps',
          'that orchestrator fired two steps'
        ],
        'Two steps é dois passos.'
      ),
      fala(
        'Espera',
        'Where should we cap the sequence?',
        'Onde a gente limita a sequência?',
        'Peça para disparar dois passos.',
        'Please fire two steps.',
        [
          'please fire two steps',
          'please fire 2 steps',
          'fire two steps'
        ],
        'Fire two steps é disparar dois passos.'
      )
    ]
  },
  {
    id: 'orquestraok',
    titulo: 'Orquestrador no alvo',
    emoji: '🎼',
    nivel: 'B1',
    onde: 'O orquestrador pode ficar.',
    rodadas: [
      fala(
        'Chama',
        'Can the orchestrator stay?',
        'O orquestrador pode ficar?',
        'Diga que o orquestrador pode ficar.',
        'The orchestrator can stay.',
        ['the orchestrator can stay', 'that orchestrator can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Espera',
        'Can this sequence stay open?',
        'Esta sequência pode ficar aberta?',
        'Diga que esta sequência pode ficar aberta.',
        'This sequence can stay open.',
        ['this sequence can stay open', 'that sequence can stay open'],
        'Stay open é ficar aberta.'
      )
    ]
  }
];

export const COREOGRAFIAS = [
  {
    id: 'decidepasso',
    titulo: 'Decisão da coreografia',
    emoji: '💃',
    nivel: 'A2',
    onde: 'O vizinho escolhe a etapa seguinte.',
    rodadas: [
      fala(
        'Decide',
        'What does the neighbor pick?',
        'O que o vizinho escolhe?',
        'Diga que o vizinho escolhe a etapa seguinte.',
        'The neighbor picks the next step.',
        ['the neighbor picks the next step', 'that neighbor picks the next step'],
        'The next step é a etapa seguinte.'
      ),
      fala(
        'Segue',
        'What should the neighbor do?',
        'O que o vizinho deve fazer?',
        'Peça para escolher a etapa seguinte.',
        'Please pick the next step.',
        ['please pick the next step', 'pick the next step'],
        'Pick the next step é escolher a etapa seguinte.'
      )
    ]
  },
  {
    id: 'coreografia3',
    titulo: 'Coreografia três',
    emoji: '💃',
    nivel: 'B1',
    onde: 'Três vizinhos escolheram a etapa.',
    rodadas: [
      fala(
        'Decide',
        'How many neighbors picked the next step?',
        'Quantos vizinhos escolheram a etapa seguinte?',
        'Diga que três vizinhos escolheram a etapa.',
        'Three neighbors picked the next step.',
        [
          'three neighbors picked the next step',
          '3 neighbors picked the next step',
          'those neighbors picked the next step'
        ],
        'Three neighbors é três vizinhos.'
      ),
      fala(
        'Segue',
        'Where should we cap the choice?',
        'Onde a gente limita a escolha?',
        'Peça para três vizinhos escolherem a etapa.',
        'Please let three neighbors pick.',
        [
          'please let three neighbors pick',
          'please let 3 neighbors pick',
          'let three neighbors pick'
        ],
        'Let three neighbors pick é deixar três vizinhos escolherem.'
      )
    ]
  },
  {
    id: 'coreografiaok',
    titulo: 'Coreografia no alvo',
    emoji: '💃',
    nivel: 'B1',
    onde: 'A etapa seguinte pode ficar.',
    rodadas: [
      fala(
        'Decide',
        'Can the next step stay?',
        'A etapa seguinte pode ficar?',
        'Diga que a etapa seguinte pode ficar.',
        'The next step can stay.',
        ['the next step can stay', 'that next step can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can the neighbor stay quiet?',
        'O vizinho pode ficar quieto?',
        'Diga que o vizinho pode ficar quieto.',
        'The neighbor can stay quiet.',
        ['the neighbor can stay quiet', 'that neighbor can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const COMPENSACOES = [
  {
    id: 'desfazpasso',
    titulo: 'Desfaz da compensação',
    emoji: '↩️',
    nivel: 'A2',
    onde: 'A falha desfaz a etapa anterior.',
    rodadas: [
      fala(
        'Desfaz',
        'What does the failure undo?',
        'O que a falha desfaz?',
        'Diga que a falha desfaz a etapa anterior.',
        'The failure undoes the previous step.',
        ['the failure undoes the previous step', 'that failure undoes the previous step'],
        'The previous step é a etapa anterior.'
      ),
      fala(
        'Fecha',
        'What should we do with the failure?',
        'O que a gente faz com a falha?',
        'Peça para desfazer a etapa anterior.',
        'Please undo the previous step.',
        ['please undo the previous step', 'undo the previous step'],
        'Undo the previous step é desfazer a etapa anterior.'
      )
    ]
  },
  {
    id: 'compensa4',
    titulo: 'Compensação quatro',
    emoji: '↩️',
    nivel: 'B1',
    onde: 'A falha desfez quatro etapas.',
    rodadas: [
      fala(
        'Desfaz',
        'How many steps did the failure undo?',
        'Quantas etapas a falha desfez?',
        'Diga que a falha desfez quatro etapas.',
        'The failure undid four steps.',
        [
          'the failure undid four steps',
          'the failure undid 4 steps',
          'that failure undid four steps'
        ],
        'Four steps é quatro etapas.'
      ),
      fala(
        'Fecha',
        'Where should we cap the undo?',
        'Onde a gente limita o desfazer?',
        'Peça para desfazer quatro etapas.',
        'Please undo four steps.',
        [
          'please undo four steps',
          'please undo 4 steps',
          'undo four steps'
        ],
        'Undo four steps é desfazer quatro etapas.'
      )
    ]
  },
  {
    id: 'compensaok',
    titulo: 'Compensação no alvo',
    emoji: '↩️',
    nivel: 'B1',
    onde: 'A etapa anterior pode ficar desfeita.',
    rodadas: [
      fala(
        'Desfaz',
        'Can the previous step stay undone?',
        'A etapa anterior pode ficar desfeita?',
        'Diga que a etapa anterior pode ficar desfeita.',
        'The previous step can stay undone.',
        ['the previous step can stay undone', 'that previous step can stay undone'],
        'Stay undone é ficar desfeita.'
      ),
      fala(
        'Fecha',
        'Can the failure stay closed?',
        'A falha pode ficar fechada?',
        'Diga que a falha pode ficar fechada.',
        'The failure can stay closed.',
        ['the failure can stay closed', 'that failure can stay closed'],
        'Stay closed é ficar fechada.'
      )
    ]
  }
];

export function orquestradorPorId(id) {
  return ORQUESTRADORES.find(c => c.id === id) ?? null;
}

export function coreografiaPorId(id) {
  return COREOGRAFIAS.find(c => c.id === id) ?? null;
}

export function compensacaoPorId(id) {
  return COMPENSACOES.find(c => c.id === id) ?? null;
}

export function avaliarOrquestrador(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCoreografia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCompensacao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
