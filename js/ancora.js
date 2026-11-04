// Ancora que guarda o estado, malha que liga vizinhos e fenda que divide o trafego.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const ANCORAS = [
  {
    id: 'pontoancora',
    titulo: 'Ponto da âncora',
    emoji: '⚓',
    nivel: 'A2',
    onde: 'A âncora guarda o estado antigo.',
    rodadas: [
      fala(
        'Marca',
        'What does the anchor keep?',
        'O que a âncora guarda?',
        'Diga que a âncora guarda o estado antigo.',
        'The anchor keeps the old state.',
        ['the anchor keeps the old state', 'that anchor keeps the old state'],
        'The old state é o estado antigo.'
      ),
      fala(
        'Volta',
        'What should we do before the change?',
        'O que a gente faz antes da troca?',
        'Peça para marcar o estado antes da troca.',
        'Please mark the state before the change.',
        ['please mark the state before the change', 'mark the state before the change'],
        'Before the change é antes da troca.'
      )
    ]
  },
  {
    id: 'ancora2',
    titulo: 'Âncora duas',
    emoji: '⚓',
    nivel: 'B1',
    onde: 'A âncora guardou duas cópias.',
    rodadas: [
      fala(
        'Marca',
        'How many copies did the anchor keep?',
        'Quantas cópias a âncora guardou?',
        'Diga que a âncora guardou duas cópias.',
        'The anchor kept two copies.',
        [
          'the anchor kept two copies',
          'the anchor kept 2 copies',
          'that anchor kept two copies'
        ],
        'Two copies é duas cópias.'
      ),
      fala(
        'Volta',
        'Where should we store the copies?',
        'Onde a gente guarda as cópias?',
        'Peça para guardar duas cópias na âncora.',
        'Please store two copies on the anchor.',
        [
          'please store two copies on the anchor',
          'please store 2 copies on the anchor',
          'store two copies on the anchor'
        ],
        'Store the copies é guardar as cópias.'
      )
    ]
  },
  {
    id: 'ancoraok',
    titulo: 'Âncora no alvo',
    emoji: '⚓',
    nivel: 'B1',
    onde: 'O estado antigo pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the old state stay?',
        'O estado antigo pode ficar?',
        'Diga que o estado antigo pode ficar.',
        'The old state can stay.',
        ['the old state can stay', 'that old state can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Volta',
        'Can this anchor stay put?',
        'Esta âncora pode ficar no lugar?',
        'Diga que esta âncora pode ficar no lugar.',
        'This anchor can stay put.',
        ['this anchor can stay put', 'that anchor can stay put'],
        'Stay put é ficar no lugar.'
      )
    ]
  }
];

export const MALHAS = [
  {
    id: 'vizinhomalha',
    titulo: 'Vizinho da malha',
    emoji: '🕸️',
    nivel: 'A2',
    onde: 'Cada serviço fala só com o vizinho.',
    rodadas: [
      fala(
        'Liga',
        'Who does each service talk to?',
        'Com quem cada serviço fala?',
        'Diga que cada serviço fala só com o vizinho.',
        'Each service talks only to its neighbor.',
        ['each service talks only to its neighbor', 'every service talks only to its neighbor'],
        'Its neighbor é o vizinho dele.'
      ),
      fala(
        'Passa',
        'Where should we send the call?',
        'Para onde a gente manda a chamada?',
        'Peça para mandar a chamada ao vizinho.',
        'Please send the call to the neighbor.',
        ['please send the call to the neighbor', 'send the call to the neighbor'],
        'The neighbor é o vizinho.'
      )
    ]
  },
  {
    id: 'malha4',
    titulo: 'Malha quatro',
    emoji: '🕸️',
    nivel: 'B1',
    onde: 'A malha ligou quatro serviços.',
    rodadas: [
      fala(
        'Liga',
        'How many services did the mesh link?',
        'Quantos serviços a malha ligou?',
        'Diga que a malha ligou quatro serviços.',
        'The mesh linked four services.',
        [
          'the mesh linked four services',
          'the mesh linked 4 services',
          'that mesh linked four services'
        ],
        'Four services é quatro serviços.'
      ),
      fala(
        'Passa',
        'Where should we cap the mesh?',
        'Onde a gente limita a malha?',
        'Peça para limitar a malha em quatro serviços.',
        'Please cap the mesh at four services.',
        [
          'please cap the mesh at four services',
          'please cap the mesh at 4 services',
          'cap the mesh at four services'
        ],
        'Cap the mesh é limitar a malha.'
      )
    ]
  },
  {
    id: 'malhaok',
    titulo: 'Malha no alvo',
    emoji: '🕸️',
    nivel: 'B1',
    onde: 'O vizinho pode atender a chamada.',
    rodadas: [
      fala(
        'Liga',
        'Can the neighbor take the call?',
        'O vizinho pode atender a chamada?',
        'Diga que o vizinho pode atender a chamada.',
        'The neighbor can take the call.',
        ['the neighbor can take the call', 'that neighbor can take the call'],
        'Take the call é atender a chamada.'
      ),
      fala(
        'Passa',
        'Can this mesh stay quiet?',
        'Esta malha pode ficar quieta?',
        'Diga que esta malha pode ficar quieta.',
        'This mesh can stay quiet.',
        ['this mesh can stay quiet', 'that mesh can stay quiet'],
        'Stay quiet é ficar quieta.'
      )
    ]
  }
];

export const FENDAS = [
  {
    id: 'trafegofenda',
    titulo: 'Tráfego da fenda',
    emoji: '🪓',
    nivel: 'A2',
    onde: 'O tráfego se divide em duas versões vivas.',
    rodadas: [
      fala(
        'Divide',
        'Where does the traffic go?',
        'Para onde o tráfego vai?',
        'Diga que o tráfego se divide em duas versões vivas.',
        'The traffic splits across two live versions.',
        ['the traffic splits across two live versions', 'that traffic splits across two live versions'],
        'Two live versions é duas versões vivas.'
      ),
      fala(
        'Mede',
        'What should we do with the traffic?',
        'O que a gente faz com o tráfego?',
        'Peça para dividir o tráfego ao meio.',
        'Please split the traffic in half.',
        ['please split the traffic in half', 'split the traffic in half'],
        'In half é ao meio.'
      )
    ]
  },
  {
    id: 'fenda50',
    titulo: 'Fenda cinquenta',
    emoji: '🪓',
    nivel: 'B1',
    onde: 'A fenda mandou cinquenta por cento para o lado.',
    rodadas: [
      fala(
        'Divide',
        'How much did the split send aside?',
        'Quanto a fenda mandou para o lado?',
        'Diga que a fenda mandou cinquenta por cento para o lado.',
        'The split sent fifty percent aside.',
        [
          'the split sent fifty percent aside',
          'the split sent 50 percent aside',
          'that split sent fifty percent aside'
        ],
        'Fifty percent é cinquenta por cento.'
      ),
      fala(
        'Mede',
        'Where should we cap the split?',
        'Onde a gente limita a fenda?',
        'Peça para limitar a fenda em cinquenta por cento.',
        'Please cap the split at fifty percent.',
        [
          'please cap the split at fifty percent',
          'please cap the split at 50 percent',
          'cap the split at fifty percent'
        ],
        'Cap the split é limitar a fenda.'
      )
    ]
  },
  {
    id: 'fendaok',
    titulo: 'Fenda no alvo',
    emoji: '🪓',
    nivel: 'B1',
    onde: 'A versão nova pode ficar com a metade.',
    rodadas: [
      fala(
        'Divide',
        'Can the new version take half?',
        'A versão nova pode ficar com a metade?',
        'Diga que a versão nova pode ficar com a metade.',
        'The new version can take half.',
        ['the new version can take half', 'that new version can take half'],
        'Take half é ficar com a metade.'
      ),
      fala(
        'Mede',
        'Can the old version stay?',
        'A versão antiga pode ficar?',
        'Diga que a versão antiga pode ficar.',
        'The old version can stay.',
        ['the old version can stay', 'that old version can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function ancoraPorId(id) {
  return ANCORAS.find(c => c.id === id) ?? null;
}

export function malhaPorId(id) {
  return MALHAS.find(c => c.id === id) ?? null;
}

export function fendaPorId(id) {
  return FENDAS.find(c => c.id === id) ?? null;
}

export function avaliarAncora(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMalha(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFenda(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
