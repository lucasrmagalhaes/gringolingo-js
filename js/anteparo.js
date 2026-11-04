// Anteparo que isola, descarte do pedido extra e cronômetro que chega a zero.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const ANTEPAROS = [
  {
    id: 'compfech',
    titulo: 'Compartimento fechado',
    emoji: '🛟',
    nivel: 'A2',
    onde: 'A falha ficou presa no próprio compartimento.',
    rodadas: [
      fala(
        'Isola',
        'Where did the failure stay?',
        'Onde a falha ficou?',
        'Diga que a falha ficou presa no próprio compartimento.',
        'The failure stayed inside its own compartment.',
        ['the failure stayed inside its own compartment', 'that failure stayed inside its own compartment'],
        'Its own compartment é o próprio compartimento.'
      ),
      fala(
        'Solta',
        'What should we close next?',
        'O que a gente fecha agora?',
        'Peça para fechar o próximo compartimento.',
        'Please close the next compartment.',
        ['please close the next compartment', 'close the next compartment'],
        'The next compartment é o próximo compartimento.'
      )
    ]
  },
  {
    id: 'anteparo2',
    titulo: 'Anteparo dois',
    emoji: '🛟',
    nivel: 'B1',
    onde: 'O anteparo fechou dois compartimentos.',
    rodadas: [
      fala(
        'Isola',
        'How many compartments did the bulkhead close?',
        'Quantos compartimentos o anteparo fechou?',
        'Diga que o anteparo fechou dois compartimentos.',
        'The bulkhead closed two compartments.',
        [
          'the bulkhead closed two compartments',
          'the bulkhead closed 2 compartments',
          'that bulkhead closed two compartments'
        ],
        'Two compartments é dois compartimentos.'
      ),
      fala(
        'Solta',
        'Where should we cap the bulkhead?',
        'Onde a gente limita o anteparo?',
        'Peça para limitar o anteparo em dois compartimentos.',
        'Please cap the bulkhead at two compartments.',
        [
          'please cap the bulkhead at two compartments',
          'please cap the bulkhead at 2 compartments',
          'cap the bulkhead at two compartments'
        ],
        'Cap the bulkhead é limitar o anteparo.'
      )
    ]
  },
  {
    id: 'anteparook',
    titulo: 'Anteparo no alvo',
    emoji: '🛟',
    nivel: 'B1',
    onde: 'O resto do serviço continua no ar.',
    rodadas: [
      fala(
        'Isola',
        'Did the rest of the service stay up?',
        'O resto do serviço continua no ar?',
        'Diga que o resto do serviço continua no ar.',
        'The rest of the service stayed up.',
        ['the rest of the service stayed up', 'that rest of the service stayed up'],
        'Stayed up é continua no ar.'
      ),
      fala(
        'Solta',
        'Can the other compartments stay open?',
        'Os outros compartimentos podem ficar abertos?',
        'Diga que os outros compartimentos podem ficar abertos.',
        'The other compartments can stay open.',
        ['the other compartments can stay open', 'those other compartments can stay open'],
        'Stay open é ficar aberto.'
      )
    ]
  }
];

export const DESCARTES = [
  {
    id: 'naocabe',
    titulo: 'Não cabe',
    emoji: '📤',
    nivel: 'A2',
    onde: 'O serviço devolveu o pedido que não cabe.',
    rodadas: [
      fala(
        'Cheio',
        'What did the service shed?',
        'O que o serviço devolveu?',
        'Diga que o serviço devolveu o pedido que não cabe.',
        'The service shed the request that did not fit.',
        ['the service shed the request that did not fit', 'that service shed the request that did not fit'],
        'Did not fit é não cabe.'
      ),
      fala(
        'Devolve',
        'What should we shed next?',
        'O que a gente devolve agora?',
        'Peça para devolver o próximo pedido extra.',
        'Please shed the next extra request.',
        ['please shed the next extra request', 'shed the next extra request'],
        'The next extra request é o próximo pedido extra.'
      )
    ]
  },
  {
    id: 'descarte4',
    titulo: 'Descarte quatro',
    emoji: '📤',
    nivel: 'B1',
    onde: 'O serviço devolveu quatro pedidos extras.',
    rodadas: [
      fala(
        'Cheio',
        'How many extra requests did the service shed?',
        'Quantos pedidos extras o serviço devolveu?',
        'Diga que o serviço devolveu quatro pedidos extras.',
        'The service shed four extra requests.',
        [
          'the service shed four extra requests',
          'the service shed 4 extra requests',
          'that service shed four extra requests'
        ],
        'Four extra requests é quatro pedidos extras.'
      ),
      fala(
        'Devolve',
        'Where should we cap the shed?',
        'Onde a gente limita o descarte?',
        'Peça para limitar o descarte em quatro pedidos.',
        'Please cap the shed at four requests.',
        [
          'please cap the shed at four requests',
          'please cap the shed at 4 requests',
          'cap the shed at four requests'
        ],
        'Four requests é quatro pedidos.'
      )
    ]
  },
  {
    id: 'descarteok',
    titulo: 'Descarte no alvo',
    emoji: '📤',
    nivel: 'B1',
    onde: 'O próximo pedido pode entrar.',
    rodadas: [
      fala(
        'Cheio',
        'Can the next request enter?',
        'O próximo pedido pode entrar?',
        'Diga que o próximo pedido pode entrar.',
        'The next request can enter.',
        ['the next request can enter', 'that next request can enter'],
        'Can enter é pode entrar.'
      ),
      fala(
        'Devolve',
        'Can the shed stay closed?',
        'O descarte pode ficar fechado?',
        'Diga que o descarte pode ficar fechado.',
        'The shed can stay closed.',
        ['the shed can stay closed', 'that shed can stay closed'],
        'Stay closed é ficar fechado.'
      )
    ]
  }
];

export const CRONOMETROS = [
  {
    id: 'tempzero',
    titulo: 'Tempo zero',
    emoji: '⏰',
    nivel: 'A2',
    onde: 'A chamada parou quando o tempo restante chegou a zero.',
    rodadas: [
      fala(
        'Corta',
        'When did the call stop?',
        'Quando a chamada parou?',
        'Diga que a chamada parou quando o tempo restante chegou a zero.',
        'The call stopped when the remaining time hit zero.',
        ['the call stopped when the remaining time hit zero', 'that call stopped when the remaining time hit zero'],
        'Hit zero é chegou a zero.'
      ),
      fala(
        'Segue',
        'Where should we stop the call?',
        'Onde a gente corta a chamada?',
        'Peça para cortar a chamada no zero.',
        'Please stop the call at zero.',
        ['please stop the call at zero', 'stop the call at zero'],
        'At zero é no zero.'
      )
    ]
  },
  {
    id: 'cronometro0',
    titulo: 'Cronômetro zero',
    emoji: '⏰',
    nivel: 'B1',
    onde: 'A chamada ficou com zero segundos.',
    rodadas: [
      fala(
        'Corta',
        'How many seconds did the call have left?',
        'Quantos segundos a chamada ainda tinha?',
        'Diga que a chamada ficou com zero segundos.',
        'The call had zero seconds left.',
        [
          'the call had zero seconds left',
          'the call had 0 seconds left',
          'that call had zero seconds left'
        ],
        'Zero seconds é zero segundos.'
      ),
      fala(
        'Segue',
        'When should we stop?',
        'Quando a gente para?',
        'Peça para parar quando restarem zero segundos.',
        'Please stop when zero seconds remain.',
        [
          'please stop when zero seconds remain',
          'please stop when 0 seconds remain',
          'stop when zero seconds remain'
        ],
        'Zero seconds remain é restam zero segundos.'
      )
    ]
  },
  {
    id: 'cronometrook',
    titulo: 'Cronômetro no alvo',
    emoji: '⏰',
    nivel: 'B1',
    onde: 'A chamada terminou dentro do prazo.',
    rodadas: [
      fala(
        'Corta',
        'Did the call finish inside the deadline?',
        'A chamada terminou dentro do prazo?',
        'Diga que a chamada terminou dentro do prazo.',
        'The call finished inside the deadline.',
        ['the call finished inside the deadline', 'that call finished inside the deadline'],
        'Inside the deadline é dentro do prazo.'
      ),
      fala(
        'Segue',
        'Can the remaining time stay?',
        'O tempo restante pode ficar?',
        'Diga que o tempo restante pode ficar.',
        'The remaining time can stay.',
        ['the remaining time can stay', 'that remaining time can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function anteparoPorId(id) {
  return ANTEPAROS.find(c => c.id === id) ?? null;
}

export function descartePorId(id) {
  return DESCARTES.find(c => c.id === id) ?? null;
}

export function cronometroPorId(id) {
  return CRONOMETROS.find(c => c.id === id) ?? null;
}

export function avaliarAnteparo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDescarte(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCronometro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
