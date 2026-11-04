// Fome que espera sem ganhar a vez, inversão que segura o recurso e idade que sobe a prioridade.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const FOMES = [
  {
    id: 'medefome',
    titulo: 'Espera da fome',
    emoji: '🍖',
    nivel: 'A2',
    onde: 'A tarefa espera e nunca ganha a vez.',
    rodadas: [
      fala(
        'Espera',
        'What happens to the starved task?',
        'O que acontece com a tarefa faminta?',
        'Diga que a tarefa espera e não roda.',
        'The task waits and never runs.',
        [
          'the task waits and never runs',
          'that task waits and never runs'
        ],
        'Never runs é que não roda.'
      ),
      fala(
        'Segue',
        'What should the task do?',
        'O que a tarefa deve fazer?',
        'Peça para esperar a próxima vez.',
        'Please wait for the next turn.',
        ['please wait for the next turn', 'wait for the next turn'],
        'The next turn é a próxima vez.'
      )
    ]
  },
  {
    id: 'fome2',
    titulo: 'Fome dois',
    emoji: '🍖',
    nivel: 'B1',
    onde: 'A tarefa faminta esperou duas vezes.',
    rodadas: [
      fala(
        'Espera',
        'How many turns did the starved task wait?',
        'Quantas vezes a tarefa faminta esperou?',
        'Diga que a tarefa faminta esperou duas vezes.',
        'The starved task waited two turns.',
        [
          'the starved task waited two turns',
          'the starved task waited 2 turns',
          'that starved task waited two turns'
        ],
        'Two turns é duas vezes.'
      ),
      fala(
        'Segue',
        'Where should we cap the turns?',
        'Onde a gente limita as vezes?',
        'Peça para esperar duas vezes.',
        'Please wait two turns.',
        [
          'please wait two turns',
          'please wait 2 turns',
          'wait two turns'
        ],
        'Wait two turns é esperar duas vezes.'
      )
    ]
  },
  {
    id: 'fomeok',
    titulo: 'Fome no alvo',
    emoji: '🍖',
    nivel: 'B1',
    onde: 'A tarefa faminta pode ficar.',
    rodadas: [
      fala(
        'Espera',
        'Can the starved task stay?',
        'A tarefa faminta pode ficar?',
        'Diga que a tarefa faminta pode ficar.',
        'The starved task can stay.',
        ['the starved task can stay', 'that starved task can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this starved task stay quiet?',
        'Esta tarefa faminta pode ficar quieta?',
        'Diga que esta tarefa faminta pode ficar quieta.',
        'This starved task can stay quiet.',
        ['this starved task can stay quiet', 'that starved task can stay quiet'],
        'Stay quiet é ficar quieta.'
      )
    ]
  }
];

export const INVERSOES = [
  {
    id: 'seguraalta',
    titulo: 'Trava da inversão',
    emoji: '🔃',
    nivel: 'A2',
    onde: 'A tarefa baixa segura o recurso da alta.',
    rodadas: [
      fala(
        'Segura',
        'What does the low task hold?',
        'O que a tarefa baixa segura?',
        'Diga que a tarefa baixa segura o recurso.',
        'The low task holds the resource.',
        [
          'the low task holds the resource',
          'that low task holds the resource'
        ],
        'Holds the resource é segura o recurso.'
      ),
      fala(
        'Solta',
        'What should the low task do?',
        'O que a tarefa baixa deve fazer?',
        'Peça para soltar o recurso.',
        'Please free the resource.',
        ['please free the resource', 'free the resource'],
        'Free the resource é soltar o recurso.'
      )
    ]
  },
  {
    id: 'inversao3',
    titulo: 'Inversão três',
    emoji: '🔃',
    nivel: 'B1',
    onde: 'A inversão bloqueou três tarefas.',
    rodadas: [
      fala(
        'Segura',
        'How many tasks did the inversion block?',
        'Quantas tarefas a inversão bloqueou?',
        'Diga que a inversão bloqueou três tarefas.',
        'The inversion blocked three tasks.',
        [
          'the inversion blocked three tasks',
          'the inversion blocked 3 tasks',
          'that inversion blocked three tasks'
        ],
        'Three tasks é três tarefas.'
      ),
      fala(
        'Solta',
        'Where should we cap the tasks?',
        'Onde a gente limita as tarefas?',
        'Peça para cobrir três tarefas.',
        'Please cover three tasks.',
        [
          'please cover three tasks',
          'please cover 3 tasks',
          'cover three tasks'
        ],
        'Cover three tasks é cobrir três tarefas.'
      )
    ]
  },
  {
    id: 'inversaook',
    titulo: 'Inversão no alvo',
    emoji: '🔃',
    nivel: 'B1',
    onde: 'A inversão pode ficar.',
    rodadas: [
      fala(
        'Segura',
        'Can the inversion stay?',
        'A inversão pode ficar?',
        'Diga que a inversão pode ficar.',
        'The inversion can stay.',
        ['the inversion can stay', 'that inversion can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Solta',
        'Can this inversion stay blocked?',
        'Esta inversão pode ficar bloqueada?',
        'Diga que esta inversão pode ficar bloqueada.',
        'This inversion can stay blocked.',
        ['this inversion can stay blocked', 'that inversion can stay blocked'],
        'Stay blocked é ficar bloqueada.'
      )
    ]
  }
];

export const IDADES = [
  {
    id: 'sobeprioridade',
    titulo: 'Subida da idade',
    emoji: '🧓',
    nivel: 'A2',
    onde: 'A espera longa sobe a prioridade.',
    rodadas: [
      fala(
        'Sobe',
        'What does the long wait raise?',
        'O que a espera longa sobe?',
        'Diga que a espera longa sobe a prioridade.',
        'The long wait raises the priority.',
        [
          'the long wait raises the priority',
          'that long wait raises the priority'
        ],
        'Raises the priority é sobe a prioridade.'
      ),
      fala(
        'Fecha',
        'What should the wait do?',
        'O que a espera deve fazer?',
        'Peça para subir a prioridade.',
        'Please raise the priority.',
        ['please raise the priority', 'raise the priority'],
        'Raise the priority é subir a prioridade.'
      )
    ]
  },
  {
    id: 'idade4',
    titulo: 'Idade quatro',
    emoji: '🧓',
    nivel: 'B1',
    onde: 'A idade levantou quatro tarefas.',
    rodadas: [
      fala(
        'Sobe',
        'How many tasks did the aging lift?',
        'Quantas tarefas a idade levantou?',
        'Diga que a idade levantou quatro tarefas.',
        'The aging lifted four tasks.',
        [
          'the aging lifted four tasks',
          'the aging lifted 4 tasks',
          'that aging lifted four tasks'
        ],
        'Four tasks é quatro tarefas.'
      ),
      fala(
        'Fecha',
        'Where should we cap the tasks?',
        'Onde a gente limita as tarefas?',
        'Peça para levantar quatro tarefas.',
        'Please lift four tasks.',
        [
          'please lift four tasks',
          'please lift 4 tasks',
          'lift four tasks'
        ],
        'Lift four tasks é levantar quatro tarefas.'
      )
    ]
  },
  {
    id: 'idadeok',
    titulo: 'Idade no alvo',
    emoji: '🧓',
    nivel: 'B1',
    onde: 'A idade pode ficar.',
    rodadas: [
      fala(
        'Sobe',
        'Can the aging stay?',
        'A idade pode ficar?',
        'Diga que a idade pode ficar.',
        'The aging can stay.',
        ['the aging can stay', 'that aging can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this aging stay raised?',
        'Esta idade pode ficar alta?',
        'Diga que esta idade pode ficar alta.',
        'This aging can stay raised.',
        ['this aging can stay raised', 'that aging can stay raised'],
        'Stay raised é ficar alta.'
      )
    ]
  }
];

export function fomePorId(id) {
  return FOMES.find(c => c.id === id) ?? null;
}

export function inversaoPorId(id) {
  return INVERSOES.find(c => c.id === id) ?? null;
}

export function idadePorId(id) {
  return IDADES.find(c => c.id === id) ?? null;
}

export function avaliarFome(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarInversao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarIdade(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
