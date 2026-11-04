// Cota do disco, ciclo de queda e processo zumbi.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const COTAS = [
  {
    id: 'cotafecha',
    titulo: 'Cota fechada',
    emoji: '📏',
    nivel: 'A2',
    onde: 'O usuário passou da cota do disco.',
    rodadas: [
      fala(
        'Fecha',
        'What happened to the quota?',
        'O que aconteceu com a cota?',
        'Diga que o usuário passou da cota do disco.',
        'The user passed the disk quota.',
        ['the user passed the disk quota', 'that user passed the disk quota'],
        'Disk quota é a cota do disco.'
      ),
      fala(
        'Abre',
        'Can we save a new file?',
        'Dá para gravar um arquivo novo?',
        'Diga que o arquivo novo não grava.',
        'The new file does not save.',
        ['the new file does not save', 'that new file does not save'],
        'Does not save é não grava.'
      )
    ]
  },
  {
    id: 'cincogiga',
    titulo: 'Cinco gigas',
    emoji: '📏',
    nivel: 'B1',
    onde: 'A cota é de cinco gigabytes.',
    rodadas: [
      fala(
        'Fecha',
        'How big is the quota?',
        'Qual é o tamanho da cota?',
        'Diga que a cota é de cinco gigabytes.',
        'The quota is five gigabytes.',
        [
          'the quota is five gigabytes',
          'the quota is 5 gigabytes',
          'that quota is five gigabytes'
        ],
        'Five gigabytes é cinco gigabytes.'
      ),
      fala(
        'Abre',
        'What should we do with the quota?',
        'O que a gente faz com a cota?',
        'Peça para aumentar a cota.',
        'Please raise the quota.',
        ['please raise the quota', 'raise the quota'],
        'Raise the quota é aumentar a cota.'
      )
    ]
  },
  {
    id: 'cotalivre',
    titulo: 'Cota livre',
    emoji: '📏',
    nivel: 'B1',
    onde: 'A cota voltou a aceitar arquivo.',
    rodadas: [
      fala(
        'Fecha',
        'Is the quota open again?',
        'A cota abriu de novo?',
        'Diga que a cota está aberta de novo.',
        'The quota is open again.',
        ['the quota is open again', 'that quota is open again'],
        'Open again é aberta de novo.'
      ),
      fala(
        'Abre',
        'Can the new file save now?',
        'O arquivo novo grava agora?',
        'Diga que o arquivo novo grava agora.',
        'The new file saves now.',
        ['the new file saves now', 'that new file saves now'],
        'Saves now é grava agora.'
      )
    ]
  }
];

export const CICLOS = [
  {
    id: 'ciclocai',
    titulo: 'Ciclo cai',
    emoji: '🔁',
    nivel: 'A2',
    onde: 'O processo continua reiniciando.',
    rodadas: [
      fala(
        'Cai',
        'What does the process keep doing?',
        'O que o processo continua fazendo?',
        'Diga que o processo continua reiniciando.',
        'The process keeps restarting.',
        ['the process keeps restarting', 'that process keeps restarting'],
        'Keeps restarting é continua reiniciando.'
      ),
      fala(
        'Fica',
        'Does the service stay up?',
        'O serviço permanece no ar?',
        'Diga que o serviço não fica estável.',
        'The service does not stay stable.',
        ['the service does not stay stable', 'that service does not stay stable'],
        'Stay stable é ficar estável.'
      )
    ]
  },
  {
    id: 'ciclocinco',
    titulo: 'Cinco voltas',
    emoji: '🔁',
    nivel: 'B1',
    onde: 'O processo reiniciou cinco vezes.',
    rodadas: [
      fala(
        'Cai',
        'How many times did the process restart?',
        'Quantas vezes o processo reiniciou?',
        'Diga que o processo reiniciou cinco vezes.',
        'The process restarted five times.',
        [
          'the process restarted five times',
          'the process restarted 5 times',
          'that process restarted five times'
        ],
        'Five times é cinco vezes.'
      ),
      fala(
        'Fica',
        'What should we stop?',
        'O que a gente para?',
        'Peça para parar o ciclo de queda.',
        'Please stop the crash loop.',
        ['please stop the crash loop', 'stop the crash loop'],
        'Crash loop é o ciclo de queda.'
      )
    ]
  },
  {
    id: 'ciclofirme',
    titulo: 'Ciclo firme',
    emoji: '🔁',
    nivel: 'B1',
    onde: 'O processo ficou no ar.',
    rodadas: [
      fala(
        'Cai',
        'Did the process stay up?',
        'O processo ficou no ar?',
        'Diga que o processo ficou no ar.',
        'The process stayed up.',
        ['the process stayed up', 'that process stayed up'],
        'Stayed up é ficou no ar.'
      ),
      fala(
        'Fica',
        'Did the crash loop stop?',
        'O ciclo de queda parou?',
        'Diga que o ciclo de queda parou.',
        'The crash loop stopped.',
        ['the crash loop stopped', 'that crash loop stopped'],
        'Stopped é parou.'
      )
    ]
  }
];

export const ZUMBIS = [
  {
    id: 'filhozumbi',
    titulo: 'Filho zumbi',
    emoji: '🧟',
    nivel: 'A2',
    onde: 'O filho terminou e o pai não esperou.',
    rodadas: [
      fala(
        'Termina',
        'What did the child do?',
        'O que o filho fez?',
        'Diga que o filho terminou e o pai nunca esperou.',
        'The child exited and the parent never waited.',
        [
          'the child exited and the parent never waited',
          'that child exited and the parent never waited'
        ],
        'Never waited é nunca esperou.'
      ),
      fala(
        'Espera',
        'Is the child still listed?',
        'O filho ainda aparece na lista?',
        'Diga que o filho ainda aparece na lista.',
        'The child is still listed.',
        ['the child is still listed', 'that child is still listed'],
        'Still listed é ainda aparece na lista.'
      )
    ]
  },
  {
    id: 'quatrozumbi',
    titulo: 'Quatro zumbis',
    emoji: '🧟',
    nivel: 'B1',
    onde: 'Quatro processos zumbi restam.',
    rodadas: [
      fala(
        'Termina',
        'How many zombie processes remain?',
        'Quantos processos zumbi restam?',
        'Diga que restam quatro processos zumbi.',
        'Four zombie processes remain.',
        [
          'four zombie processes remain',
          '4 zombie processes remain',
          'four zombie processes still remain'
        ],
        'Four zombie processes é quatro processos zumbi.'
      ),
      fala(
        'Espera',
        'What should the parent do?',
        'O que o pai deve fazer?',
        'Peça para o pai esperar o filho.',
        'Please wait for the child.',
        ['please wait for the child', 'wait for the child'],
        'Wait for the child é esperar o filho.'
      )
    ]
  },
  {
    id: 'zumbisaiu',
    titulo: 'Zumbi saiu',
    emoji: '🧟',
    nivel: 'B1',
    onde: 'O pai esperou e o zumbi saiu.',
    rodadas: [
      fala(
        'Termina',
        'Did the parent wait?',
        'O pai esperou?',
        'Diga que o pai esperou o filho.',
        'The parent waited for the child.',
        ['the parent waited for the child', 'that parent waited for the child'],
        'Waited for the child é esperou o filho.'
      ),
      fala(
        'Espera',
        'Did the zombie leave the list?',
        'O zumbi saiu da lista?',
        'Diga que o zumbi saiu da lista.',
        'The zombie left the list.',
        ['the zombie left the list', 'that zombie left the list'],
        'Left the list é saiu da lista.'
      )
    ]
  }
];

export function cotaPorId(id) {
  return COTAS.find(c => c.id === id) ?? null;
}

export function cicloPorId(id) {
  return CICLOS.find(c => c.id === id) ?? null;
}

export function zumbiPorId(id) {
  return ZUMBIS.find(c => c.id === id) ?? null;
}

export function avaliarCota(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCiclo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarZumbi(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
