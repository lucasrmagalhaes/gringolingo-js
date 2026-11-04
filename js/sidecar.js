// Sidecar que mora ao lado, embaixador que representa quem está fora e adaptador que liga o cliente antigo.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SIDECARS = [
  {
    id: 'aolado',
    titulo: 'Lado do sidecar',
    emoji: '🛵',
    nivel: 'A2',
    onde: 'O ajudante mora ao lado e entrega a chamada.',
    rodadas: [
      fala(
        'Acompanha',
        'Where does the helper sit?',
        'Onde o ajudante fica?',
        'Diga que o ajudante fica ao lado do serviço.',
        'The helper sits beside the service.',
        [
          'the helper sits beside the service',
          'that helper sits beside the service'
        ],
        'Beside the service é ao lado do serviço.'
      ),
      fala(
        'Segue',
        'What should the helper do?',
        'O que o ajudante deve fazer?',
        'Peça para ficar ao lado do serviço.',
        'Please sit beside the service.',
        ['please sit beside the service', 'sit beside the service'],
        'Sit beside é ficar ao lado.'
      )
    ]
  },
  {
    id: 'sidecar2',
    titulo: 'Sidecar dois',
    emoji: '🛵',
    nivel: 'B1',
    onde: 'O sidecar levou duas chamadas.',
    rodadas: [
      fala(
        'Acompanha',
        'How many calls did the sidecar carry?',
        'Quantas chamadas o sidecar levou?',
        'Diga que o sidecar levou duas chamadas.',
        'The sidecar carried two calls.',
        [
          'the sidecar carried two calls',
          'the sidecar carried 2 calls',
          'that sidecar carried two calls'
        ],
        'Two calls é duas chamadas.'
      ),
      fala(
        'Segue',
        'Where should we cap the calls?',
        'Onde a gente limita as chamadas?',
        'Peça para levar duas chamadas.',
        'Please carry two calls.',
        [
          'please carry two calls',
          'please carry 2 calls',
          'carry two calls'
        ],
        'Carry two calls é levar duas chamadas.'
      )
    ]
  },
  {
    id: 'sidecarok',
    titulo: 'Sidecar no alvo',
    emoji: '🛵',
    nivel: 'B1',
    onde: 'O sidecar pode ficar.',
    rodadas: [
      fala(
        'Acompanha',
        'Can the helper stay?',
        'O ajudante pode ficar?',
        'Diga que o ajudante pode ficar.',
        'The helper can stay.',
        ['the helper can stay', 'that helper can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this helper stay quiet?',
        'Este ajudante pode ficar quieto?',
        'Diga que este ajudante pode ficar quieto.',
        'This helper can stay quiet.',
        ['this helper can stay quiet', 'that helper can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const EMBAIXADORES = [
  {
    id: 'proxyunico',
    titulo: 'Voz do embaixador',
    emoji: '🌐',
    nivel: 'A2',
    onde: 'Um proxy único representa quem chama de fora.',
    rodadas: [
      fala(
        'Representa',
        'Who does the proxy speak for?',
        'Por quem o proxy fala?',
        'Diga que o proxy fala por quem chama de fora.',
        'The proxy speaks for the outside caller.',
        [
          'the proxy speaks for the outside caller',
          'that proxy speaks for the outside caller'
        ],
        'Outside caller é quem chama de fora.'
      ),
      fala(
        'Segue',
        'What should the proxy do?',
        'O que o proxy deve fazer?',
        'Peça para falar por quem chama.',
        'Please speak for the caller.',
        ['please speak for the caller', 'speak for the caller'],
        'Speak for the caller é falar por quem chama.'
      )
    ]
  },
  {
    id: 'embaixador3',
    titulo: 'Embaixador três',
    emoji: '🌐',
    nivel: 'B1',
    onde: 'O proxy cobriu três serviços.',
    rodadas: [
      fala(
        'Representa',
        'How many services did the proxy cover?',
        'Quantos serviços o proxy cobriu?',
        'Diga que o proxy cobriu três serviços.',
        'The proxy covered three services.',
        [
          'the proxy covered three services',
          'the proxy covered 3 services',
          'that proxy covered three services'
        ],
        'Three services é três serviços.'
      ),
      fala(
        'Segue',
        'Where should we cap the services?',
        'Onde a gente limita os serviços?',
        'Peça para cobrir três serviços.',
        'Please cover three services.',
        [
          'please cover three services',
          'please cover 3 services',
          'cover three services'
        ],
        'Cover three services é cobrir três serviços.'
      )
    ]
  },
  {
    id: 'embaixadorok',
    titulo: 'Embaixador no alvo',
    emoji: '🌐',
    nivel: 'B1',
    onde: 'O embaixador pode ficar.',
    rodadas: [
      fala(
        'Representa',
        'Can the proxy stay?',
        'O proxy pode ficar?',
        'Diga que o proxy pode ficar.',
        'The proxy can stay.',
        ['the proxy can stay', 'that proxy can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this proxy stay outside?',
        'Este proxy pode ficar de fora?',
        'Diga que este proxy pode ficar de fora.',
        'This proxy can stay outside.',
        ['this proxy can stay outside', 'that proxy can stay outside'],
        'Stay outside é ficar de fora.'
      )
    ]
  }
];

export const ADAPTADORES = [
  {
    id: 'ligacliente',
    titulo: 'Ponte do adaptador',
    emoji: '🔌',
    nivel: 'A2',
    onde: 'A tradução liga o cliente antigo à API nova.',
    rodadas: [
      fala(
        'Traduz',
        'What does the adapter join?',
        'O que o adaptador liga?',
        'Diga que o adaptador liga o cliente antigo.',
        'The adapter joins the old client.',
        [
          'the adapter joins the old client',
          'that adapter joins the old client'
        ],
        'Joins the old client é liga o cliente antigo.'
      ),
      fala(
        'Fecha',
        'What should the adapter do?',
        'O que o adaptador deve fazer?',
        'Peça para ligar o cliente antigo.',
        'Please join the old client.',
        ['please join the old client', 'join the old client'],
        'Join the old client é ligar o cliente antigo.'
      )
    ]
  },
  {
    id: 'adaptador4',
    titulo: 'Adaptador quatro',
    emoji: '🔌',
    nivel: 'B1',
    onde: 'O adaptador ligou quatro clientes.',
    rodadas: [
      fala(
        'Traduz',
        'How many clients did the adapter join?',
        'Quantos clientes o adaptador ligou?',
        'Diga que o adaptador ligou quatro clientes.',
        'The adapter joined four clients.',
        [
          'the adapter joined four clients',
          'the adapter joined 4 clients',
          'that adapter joined four clients'
        ],
        'Four clients é quatro clientes.'
      ),
      fala(
        'Fecha',
        'Where should we cap the clients?',
        'Onde a gente limita os clientes?',
        'Peça para ligar quatro clientes.',
        'Please join four clients.',
        [
          'please join four clients',
          'please join 4 clients',
          'join four clients'
        ],
        'Join four clients é ligar quatro clientes.'
      )
    ]
  },
  {
    id: 'adaptadorok',
    titulo: 'Adaptador no alvo',
    emoji: '🔌',
    nivel: 'B1',
    onde: 'O adaptador pode ficar.',
    rodadas: [
      fala(
        'Traduz',
        'Can the adapter stay?',
        'O adaptador pode ficar?',
        'Diga que o adaptador pode ficar.',
        'The adapter can stay.',
        ['the adapter can stay', 'that adapter can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this adapter stay joined?',
        'Este adaptador pode ficar ligado?',
        'Diga que este adaptador pode ficar ligado.',
        'This adapter can stay joined.',
        ['this adapter can stay joined', 'that adapter can stay joined'],
        'Stay joined é ficar ligado.'
      )
    ]
  }
];

export function sidecarPorId(id) {
  return SIDECARS.find(c => c.id === id) ?? null;
}

export function embaixadorPorId(id) {
  return EMBAIXADORES.find(c => c.id === id) ?? null;
}

export function adaptadorPorId(id) {
  return ADAPTADORES.find(c => c.id === id) ?? null;
}

export function avaliarSidecar(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEmbaixador(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAdaptador(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
