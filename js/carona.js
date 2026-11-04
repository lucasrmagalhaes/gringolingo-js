// Carona que viaja com o pacote, veneno que sai da fila e farol que mostra vida.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CARONAS = [
  {
    id: 'pacotecarona',
    titulo: 'Pacote com carona',
    emoji: '🚕',
    nivel: 'A2',
    onde: 'A confirmação viaja no próximo pacote.',
    rodadas: [
      fala(
        'Viaja',
        'Where does the ack travel?',
        'Onde a confirmação viaja?',
        'Diga que a confirmação viaja no próximo pacote.',
        'The ack rides on the next packet.',
        ['the ack rides on the next packet', 'that ack rides on the next packet'],
        'Rides on é viaja junto.'
      ),
      fala(
        'Confirma',
        'What should we do with the ack?',
        'O que a gente faz com a confirmação?',
        'Peça para mandar a confirmação no próximo pacote.',
        'Please send the ack with the next packet.',
        ['please send the ack with the next packet', 'send the ack with the next packet'],
        'The next packet é o próximo pacote.'
      )
    ]
  },
  {
    id: 'umpacote',
    titulo: 'Carona um',
    emoji: '🚕',
    nivel: 'B1',
    onde: 'A carona levou um pacote.',
    rodadas: [
      fala(
        'Viaja',
        'How many packets did the ack ride on?',
        'Em quantos pacotes a confirmação viajou?',
        'Diga que a confirmação viajou em um pacote.',
        'The ack rode on one packet.',
        [
          'the ack rode on one packet',
          'the ack rode on 1 packet',
          'that ack rode on one packet'
        ],
        'One packet é um pacote.'
      ),
      fala(
        'Confirma',
        'Where should we put the next ack?',
        'Onde a gente coloca a próxima confirmação?',
        'Peça para colocar a confirmação em um pacote.',
        'Please put the ack on one packet.',
        [
          'please put the ack on one packet',
          'please put the ack on 1 packet',
          'put the ack on one packet'
        ],
        'Put the ack é colocar a confirmação.'
      )
    ]
  },
  {
    id: 'caronaok',
    titulo: 'Carona no alvo',
    emoji: '🚕',
    nivel: 'B1',
    onde: 'O próximo pacote pode levar a confirmação.',
    rodadas: [
      fala(
        'Viaja',
        'Can the next packet carry the ack?',
        'O próximo pacote pode levar a confirmação?',
        'Diga que o próximo pacote pode levar a confirmação.',
        'The next packet can carry the ack.',
        ['the next packet can carry the ack', 'that next packet can carry the ack'],
        'Can carry é pode levar.'
      ),
      fala(
        'Confirma',
        'Can this ack ride along?',
        'Esta confirmação pode ir de carona?',
        'Diga que esta confirmação pode ir de carona.',
        'This ack can ride along.',
        ['this ack can ride along', 'that ack can ride along'],
        'Ride along é ir de carona.'
      )
    ]
  }
];

export const VENENOS = [
  {
    id: 'filaveneno',
    titulo: 'Fila do veneno',
    emoji: '☠️',
    nivel: 'A2',
    onde: 'A mensagem ruim sai da fila.',
    rodadas: [
      fala(
        'Sai',
        'What happened to the poison message?',
        'O que aconteceu com a mensagem ruim?',
        'Diga que a mensagem ruim saiu da fila.',
        'The poison message left the queue.',
        ['the poison message left the queue', 'that poison message left the queue'],
        'Left the queue é saiu da fila.'
      ),
      fala(
        'Isola',
        'What should we do with the bad message?',
        'O que a gente faz com a mensagem ruim?',
        'Peça para deixar a mensagem ruim de lado.',
        'Please move the bad message aside.',
        ['please move the bad message aside', 'move the bad message aside'],
        'Aside é de lado.'
      )
    ]
  },
  {
    id: 'minutoveneno',
    titulo: 'Veneno um',
    emoji: '☠️',
    nivel: 'B1',
    onde: 'A mensagem ruim ficou de lado por um minuto.',
    rodadas: [
      fala(
        'Sai',
        'How long did the poison message sit aside?',
        'Por quanto tempo a mensagem ruim ficou de lado?',
        'Diga que a mensagem ruim ficou de lado por um minuto.',
        'The poison message sat aside for one minute.',
        [
          'the poison message sat aside for one minute',
          'the poison message sat aside for 1 minute',
          'that poison message sat aside for one minute'
        ],
        'One minute é um minuto.'
      ),
      fala(
        'Isola',
        'Where should we hold the bad message?',
        'Onde a gente segura a mensagem ruim?',
        'Peça para segurar a mensagem ruim por um minuto.',
        'Please hold the bad message for one minute.',
        [
          'please hold the bad message for one minute',
          'please hold the bad message for 1 minute',
          'hold the bad message for one minute'
        ],
        'Hold é segurar.'
      )
    ]
  },
  {
    id: 'venenook',
    titulo: 'Veneno no alvo',
    emoji: '☠️',
    nivel: 'B1',
    onde: 'As mensagens boas podem ficar.',
    rodadas: [
      fala(
        'Sai',
        'Can the good messages stay?',
        'As mensagens boas podem ficar?',
        'Diga que as mensagens boas podem ficar.',
        'The good messages can stay.',
        ['the good messages can stay', 'those good messages can stay'],
        'Can stay é podem ficar.'
      ),
      fala(
        'Isola',
        'Can the poison message leave?',
        'A mensagem ruim pode sair?',
        'Diga que a mensagem ruim pode sair.',
        'The poison message can leave.',
        ['the poison message can leave', 'that poison message can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export const FAROIS = [
  {
    id: 'pulsofarol',
    titulo: 'Pulso do farol',
    emoji: '🗼',
    nivel: 'A2',
    onde: 'O farol mostra que o serviço vive.',
    rodadas: [
      fala(
        'Pisca',
        'What does the heartbeat show?',
        'O que o farol mostra?',
        'Diga que o farol mostra que o serviço vive.',
        'The heartbeat shows the service is alive.',
        ['the heartbeat shows the service is alive', 'that heartbeat shows the service is alive'],
        'Is alive é está vivo.'
      ),
      fala(
        'Vive',
        'What should we send next?',
        'O que a gente manda agora?',
        'Peça para mandar um farol curto.',
        'Please send a short heartbeat.',
        ['please send a short heartbeat', 'send a short heartbeat'],
        'A short heartbeat é um farol curto.'
      )
    ]
  },
  {
    id: 'farol5',
    titulo: 'Farol cinco',
    emoji: '🗼',
    nivel: 'B1',
    onde: 'O farol esperou cinco segundos.',
    rodadas: [
      fala(
        'Pisca',
        'How long did the heartbeat wait?',
        'Quanto tempo o farol esperou?',
        'Diga que o farol esperou cinco segundos.',
        'The heartbeat waited five seconds.',
        [
          'the heartbeat waited five seconds',
          'the heartbeat waited 5 seconds',
          'that heartbeat waited five seconds'
        ],
        'Five seconds é cinco segundos.'
      ),
      fala(
        'Vive',
        'Where should we cap the heartbeat?',
        'Onde a gente limita o farol?',
        'Peça para limitar o farol em cinco segundos.',
        'Please cap the heartbeat at five seconds.',
        [
          'please cap the heartbeat at five seconds',
          'please cap the heartbeat at 5 seconds',
          'cap the heartbeat at five seconds'
        ],
        'Cap the heartbeat é limitar o farol.'
      )
    ]
  },
  {
    id: 'farolok',
    titulo: 'Farol no alvo',
    emoji: '🗼',
    nivel: 'B1',
    onde: 'O serviço vivo pode ficar.',
    rodadas: [
      fala(
        'Pisca',
        'Can the live service stay?',
        'O serviço vivo pode ficar?',
        'Diga que o serviço vivo pode ficar.',
        'The live service can stay.',
        ['the live service can stay', 'that live service can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Vive',
        'Can the quiet heartbeat leave?',
        'O farol quieto pode sair?',
        'Diga que o farol quieto pode sair.',
        'The quiet heartbeat can leave.',
        ['the quiet heartbeat can leave', 'that quiet heartbeat can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export function caronaPorId(id) {
  return CARONAS.find(c => c.id === id) ?? null;
}

export function venenoPorId(id) {
  return VENENOS.find(c => c.id === id) ?? null;
}

export function farolPorId(id) {
  return FAROIS.find(c => c.id === id) ?? null;
}

export function avaliarCarona(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVeneno(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFarol(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
