// Recuo que dobra a espera, vigia que encerra a tarefa e ampulheta do passe.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const RECUOS = [
  {
    id: 'dobrainter',
    titulo: 'Dobra o intervalo',
    emoji: '⏬',
    nivel: 'A2',
    onde: 'Cada falha dobra a espera.',
    rodadas: [
      fala(
        'Dobra',
        'What happens after each failure?',
        'O que acontece depois de cada falha?',
        'Diga que cada falha dobra a espera.',
        'Each failure doubles the wait.',
        ['each failure doubles the wait', 'every failure doubles the wait'],
        'Doubles the wait é dobra a espera.'
      ),
      fala(
        'Espera',
        'What should we do on the next try?',
        'O que a gente faz na próxima tentativa?',
        'Peça para dobrar a próxima espera.',
        'Please double the next wait.',
        ['please double the next wait', 'double the next wait'],
        'Double the next wait é dobrar a próxima espera.'
      )
    ]
  },
  {
    id: 'recuo2',
    titulo: 'Recuo dois',
    emoji: '⏬',
    nivel: 'B1',
    onde: 'O recuo chegou a dois segundos.',
    rodadas: [
      fala(
        'Dobra',
        'How long did the backoff wait?',
        'Quanto tempo o recuo esperou?',
        'Diga que o recuo esperou dois segundos.',
        'The backoff waited two seconds.',
        [
          'the backoff waited two seconds',
          'the backoff waited 2 seconds',
          'that backoff waited two seconds'
        ],
        'Two seconds é dois segundos.'
      ),
      fala(
        'Espera',
        'Where should we cap the backoff?',
        'Onde a gente limita o recuo?',
        'Peça para limitar o recuo em dois segundos.',
        'Please cap the backoff at two seconds.',
        [
          'please cap the backoff at two seconds',
          'please cap the backoff at 2 seconds',
          'cap the backoff at two seconds'
        ],
        'Cap the backoff é limitar o recuo.'
      )
    ]
  },
  {
    id: 'recuook',
    titulo: 'Recuo no alvo',
    emoji: '⏬',
    nivel: 'B1',
    onde: 'A próxima tentativa pode esperar.',
    rodadas: [
      fala(
        'Dobra',
        'Can the next try wait?',
        'A próxima tentativa pode esperar?',
        'Diga que a próxima tentativa pode esperar.',
        'The next try can wait.',
        ['the next try can wait', 'that next try can wait'],
        'Can wait é pode esperar.'
      ),
      fala(
        'Espera',
        'Can this backoff stay short?',
        'Este recuo pode ficar curto?',
        'Diga que este recuo pode ficar curto.',
        'This backoff can stay short.',
        ['this backoff can stay short', 'that backoff can stay short'],
        'Stay short é ficar curto.'
      )
    ]
  }
];

export const VIGIAS = [
  {
    id: 'prazovigia',
    titulo: 'Prazo do vigia',
    emoji: '🐕',
    nivel: 'A2',
    onde: 'O vigia encerra a tarefa atrasada.',
    rodadas: [
      fala(
        'Olha',
        'What does the watchdog do?',
        'O que o vigia faz?',
        'Diga que o vigia encerra a tarefa atrasada.',
        'The watchdog stops the late task.',
        ['the watchdog stops the late task', 'that watchdog stops the late task'],
        'The late task é a tarefa atrasada.'
      ),
      fala(
        'Encerra',
        'What should we do with the late task?',
        'O que a gente faz com a tarefa atrasada?',
        'Peça para encerrar a tarefa atrasada.',
        'Please stop the late task.',
        ['please stop the late task', 'stop the late task'],
        'Stop the late task é encerrar a tarefa atrasada.'
      )
    ]
  },
  {
    id: 'vigia8',
    titulo: 'Vigia oito',
    emoji: '🐕',
    nivel: 'B1',
    onde: 'O vigia esperou oito segundos.',
    rodadas: [
      fala(
        'Olha',
        'How many seconds did the watchdog wait?',
        'Quantos segundos o vigia esperou?',
        'Diga que o vigia esperou oito segundos.',
        'The watchdog waited eight seconds.',
        [
          'the watchdog waited eight seconds',
          'the watchdog waited 8 seconds',
          'that watchdog waited eight seconds'
        ],
        'Eight seconds é oito segundos.'
      ),
      fala(
        'Encerra',
        'Where should we cap the watchdog?',
        'Onde a gente limita o vigia?',
        'Peça para limitar o vigia em oito segundos.',
        'Please cap the watchdog at eight seconds.',
        [
          'please cap the watchdog at eight seconds',
          'please cap the watchdog at 8 seconds',
          'cap the watchdog at eight seconds'
        ],
        'Cap the watchdog é limitar o vigia.'
      )
    ]
  },
  {
    id: 'vigiaok',
    titulo: 'Vigia no alvo',
    emoji: '🐕',
    nivel: 'B1',
    onde: 'A tarefa terminada pode ficar.',
    rodadas: [
      fala(
        'Olha',
        'Can the finished task stay?',
        'A tarefa terminada pode ficar?',
        'Diga que a tarefa terminada pode ficar.',
        'The finished task can stay.',
        ['the finished task can stay', 'that finished task can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Encerra',
        'Can the watchdog stay quiet?',
        'O vigia pode ficar quieto?',
        'Diga que o vigia pode ficar quieto.',
        'The watchdog can stay quiet.',
        ['the watchdog can stay quiet', 'that watchdog can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const AMPULHETAS = [
  {
    id: 'quinzevence',
    titulo: 'Quinze minutos',
    emoji: '🏺',
    nivel: 'A2',
    onde: 'O passe vence em quinze minutos.',
    rodadas: [
      fala(
        'Vence',
        'When does the pass expire?',
        'Quando o passe vence?',
        'Diga que o passe vence em quinze minutos.',
        'The pass expires in fifteen minutes.',
        ['the pass expires in fifteen minutes', 'the pass expires in 15 minutes'],
        'Fifteen minutes é quinze minutos.'
      ),
      fala(
        'Troca',
        'What should we do with the old pass?',
        'O que a gente faz com o passe antigo?',
        'Peça para trocar o passe antigo.',
        'Please replace the old pass.',
        ['please replace the old pass', 'replace the old pass'],
        'The old pass é o passe antigo.'
      )
    ]
  },
  {
    id: 'ampulheta15',
    titulo: 'Ampulheta quinze',
    emoji: '🏺',
    nivel: 'B1',
    onde: 'O passe durou quinze minutos.',
    rodadas: [
      fala(
        'Vence',
        'How many minutes did the pass last?',
        'Quantos minutos o passe durou?',
        'Diga que o passe durou quinze minutos.',
        'The pass lasted fifteen minutes.',
        [
          'the pass lasted fifteen minutes',
          'the pass lasted 15 minutes',
          'that pass lasted fifteen minutes'
        ],
        'Fifteen minutes é quinze minutos.'
      ),
      fala(
        'Troca',
        'Where should we cap the pass?',
        'Onde a gente limita o passe?',
        'Peça para limitar o passe em quinze minutos.',
        'Please cap the pass at fifteen minutes.',
        [
          'please cap the pass at fifteen minutes',
          'please cap the pass at 15 minutes',
          'cap the pass at fifteen minutes'
        ],
        'Cap the pass é limitar o passe.'
      )
    ]
  },
  {
    id: 'ampulhetaok',
    titulo: 'Ampulheta no alvo',
    emoji: '🏺',
    nivel: 'B1',
    onde: 'O passe novo pode ficar.',
    rodadas: [
      fala(
        'Vence',
        'Can the new pass stay?',
        'O passe novo pode ficar?',
        'Diga que o passe novo pode ficar.',
        'The new pass can stay.',
        ['the new pass can stay', 'that new pass can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Troca',
        'Can the expired pass leave?',
        'O passe vencido pode sair?',
        'Diga que o passe vencido pode sair.',
        'The expired pass can leave.',
        ['the expired pass can leave', 'that expired pass can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export function recuoPorId(id) {
  return RECUOS.find(c => c.id === id) ?? null;
}

export function vigiaPorId(id) {
  return VIGIAS.find(c => c.id === id) ?? null;
}

export function ampulhetaPorId(id) {
  return AMPULHETAS.find(c => c.id === id) ?? null;
}

export function avaliarRecuo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVigia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAmpulheta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
