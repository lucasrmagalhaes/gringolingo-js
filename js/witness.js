// Witness que viu o acordo, voter que lança o voto e learner que só escuta o grupo.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const WITNESSES = [
  {
    id: 'witnessuma',
    titulo: 'Vista do witness',
    emoji: '👁️',
    nivel: 'A2',
    onde: 'A testemunha viu o acordo fechado.',
    rodadas: [
      fala(
        'Viu',
        'What did the witness see?',
        'O que a testemunha viu?',
        'Diga que a testemunha viu o acordo fechado.',
        'The witness saw the closed agreement.',
        [
          'the witness saw the closed agreement',
          'that witness saw the closed agreement'
        ],
        'The closed agreement é o acordo fechado.'
      ),
      fala(
        'Segue',
        'What should the witness say about the agreement?',
        'O que a testemunha deve dizer sobre o acordo?',
        'Peça para dizer que a testemunha viu o acordo.',
        'Please say the witness saw the agreement.',
        [
          'please say the witness saw the agreement',
          'say the witness saw the agreement'
        ],
        'Saw the agreement é viu o acordo.'
      )
    ]
  },
  {
    id: 'witness2',
    titulo: 'Witness dois',
    emoji: '👁️',
    nivel: 'B1',
    onde: 'A testemunha viu dois acordos.',
    rodadas: [
      fala(
        'Viu',
        'How many agreements did the witness see?',
        'Quantos acordos a testemunha viu?',
        'Diga que a testemunha viu dois acordos.',
        'The witness saw two agreements.',
        [
          'the witness saw two agreements',
          'the witness saw 2 agreements',
          'that witness saw two agreements'
        ],
        'Two agreements é dois acordos.'
      ),
      fala(
        'Segue',
        'Where should we cap the agreements?',
        'Onde a gente limita os acordos?',
        'Peça para ver dois acordos.',
        'Please see two agreements.',
        ['please see two agreements', 'please see 2 agreements', 'see two agreements'],
        'See two agreements é ver dois acordos.'
      )
    ]
  },
  {
    id: 'witnessok',
    titulo: 'Witness no alvo',
    emoji: '👁️',
    nivel: 'B1',
    onde: 'A testemunha pode ficar.',
    rodadas: [
      fala(
        'Viu',
        'Can the witness stay?',
        'A testemunha pode ficar?',
        'Diga que a testemunha pode ficar.',
        'The witness can stay.',
        ['the witness can stay', 'that witness can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this witness stay quiet?',
        'Esta testemunha pode ficar quieta?',
        'Diga que esta testemunha pode ficar quieta.',
        'This witness can stay quiet.',
        ['this witness can stay quiet', 'that witness can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const VOTERS = [
  {
    id: 'voterbase',
    titulo: 'Voto do voter',
    emoji: '🗳️',
    nivel: 'A2',
    onde: 'O voto entra na contagem final.',
    rodadas: [
      fala(
        'Vota',
        'What does the voter cast?',
        'O que o voto lança?',
        'Diga que o voto entra na contagem final.',
        'The voter casts the final count.',
        [
          'the voter casts the final count',
          'that voter casts the final count'
        ],
        'The final count é a contagem final.'
      ),
      fala(
        'Segue',
        'What should the voter do with the count?',
        'O que o voto deve fazer com a contagem?',
        'Peça para lançar a contagem final.',
        'Please cast the final count.',
        [
          'please cast the final count',
          'cast the final count'
        ],
        'Cast the final count é lançar a contagem final.'
      )
    ]
  },
  {
    id: 'voter3',
    titulo: 'Voter três',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'O voto lançou três contagens.',
    rodadas: [
      fala(
        'Vota',
        'How many counts did the voter cast?',
        'Quantas contagens o voto lançou?',
        'Diga que o voto lançou três contagens.',
        'The voter cast three counts.',
        [
          'the voter cast three counts',
          'the voter cast 3 counts',
          'that voter cast three counts'
        ],
        'Three counts é três contagens.'
      ),
      fala(
        'Segue',
        'Where should we cap the counts?',
        'Onde a gente limita as contagens?',
        'Peça para lançar três contagens.',
        'Please cast three counts.',
        ['please cast three counts', 'please cast 3 counts', 'cast three counts'],
        'Cast three counts é lançar três contagens.'
      )
    ]
  },
  {
    id: 'voterok',
    titulo: 'Voter no alvo',
    emoji: '🗳️',
    nivel: 'B1',
    onde: 'O voto pode ficar.',
    rodadas: [
      fala(
        'Vota',
        'Can the voter stay?',
        'O voto pode ficar?',
        'Diga que o voto pode ficar.',
        'The voter can stay.',
        ['the voter can stay', 'that voter can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this voter stay quiet?',
        'Este voto pode ficar quieto?',
        'Diga que este voto pode ficar quieto.',
        'This voter can stay quiet.',
        ['this voter can stay quiet', 'that voter can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const LEARNERS = [
  {
    id: 'learnerbase',
    titulo: 'Escuta do learner',
    emoji: '🎓',
    nivel: 'A2',
    onde: 'Quem aprende só escuta o grupo.',
    rodadas: [
      fala(
        'Ouve',
        'What does the learner hear?',
        'O que quem aprende escuta?',
        'Diga que quem aprende só escuta o grupo.',
        'The learner only hears the group.',
        [
          'the learner only hears the group',
          'that learner only hears the group'
        ],
        'Only hears the group é só escuta o grupo.'
      ),
      fala(
        'Segue',
        'What should the learner do with the group?',
        'O que quem aprende deve fazer com o grupo?',
        'Peça para escutar só o grupo.',
        'Please hear only the group.',
        [
          'please hear only the group',
          'hear only the group'
        ],
        'Hear only the group é escutar só o grupo.'
      )
    ]
  },
  {
    id: 'learner4',
    titulo: 'Learner quatro',
    emoji: '🎓',
    nivel: 'B1',
    onde: 'Quem aprende ouviu quatro notas.',
    rodadas: [
      fala(
        'Ouve',
        'How many notes did the learner hear?',
        'Quantas notas quem aprende ouviu?',
        'Diga que quem aprende ouviu quatro notas.',
        'The learner heard four notes.',
        [
          'the learner heard four notes',
          'the learner heard 4 notes',
          'that learner heard four notes'
        ],
        'Four notes é quatro notas.'
      ),
      fala(
        'Segue',
        'Where should we cap the notes?',
        'Onde a gente limita as notas?',
        'Peça para ouvir quatro notas.',
        'Please hear four notes.',
        ['please hear four notes', 'please hear 4 notes', 'hear four notes'],
        'Hear four notes é ouvir quatro notas.'
      )
    ]
  },
  {
    id: 'learnerok',
    titulo: 'Learner no alvo',
    emoji: '🎓',
    nivel: 'B1',
    onde: 'Quem aprende pode ficar.',
    rodadas: [
      fala(
        'Ouve',
        'Can the learner stay?',
        'Quem aprende pode ficar?',
        'Diga que quem aprende pode ficar.',
        'The learner can stay.',
        ['the learner can stay', 'that learner can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this learner stay quiet?',
        'Este aprendiz pode ficar quieto?',
        'Diga que este aprendiz pode ficar quieto.',
        'This learner can stay quiet.',
        ['this learner can stay quiet', 'that learner can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function witnessPorId(id) {
  return WITNESSES.find(c => c.id === id) ?? null;
}

export function voterPorId(id) {
  return VOTERS.find(c => c.id === id) ?? null;
}

export function learnerPorId(id) {
  return LEARNERS.find(c => c.id === id) ?? null;
}

export function avaliarWitness(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVoter(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLearner(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
