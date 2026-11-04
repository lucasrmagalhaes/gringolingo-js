// Cisão de líderes, rajada de novas tentativas e chave quente.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CISOES = [
  {
    id: 'cisaodois',
    titulo: 'Dois mandam',
    emoji: '🪞',
    nivel: 'A2',
    onde: 'O grupo ficou com dois líderes.',
    rodadas: [
      fala(
        'Divide',
        'What happened to the cluster?',
        'O que aconteceu com o grupo?',
        'Diga que o grupo ficou com dois líderes.',
        'The cluster has two leaders.',
        ['the cluster has two leaders', 'that cluster has two leaders'],
        'Two leaders é dois líderes.'
      ),
      fala(
        'Junta',
        'Can both leaders write?',
        'Os dois líderes podem escrever?',
        'Diga que os dois líderes escrevem ao mesmo tempo.',
        'Both leaders write at the same time.',
        ['both leaders write at the same time', 'the two leaders write at the same time'],
        'At the same time é ao mesmo tempo.'
      )
    ]
  },
  {
    id: 'doisnos',
    titulo: 'Dois nós',
    emoji: '🪞',
    nivel: 'B1',
    onde: 'Dois nós dizem que mandam.',
    rodadas: [
      fala(
        'Divide',
        'How many nodes claim the lead?',
        'Quantos nós dizem que mandam?',
        'Diga que dois nós dizem que mandam.',
        'Two nodes both claim the lead.',
        [
          'two nodes both claim the lead',
          '2 nodes both claim the lead',
          'two nodes claim the lead'
        ],
        'Two nodes é dois nós.'
      ),
      fala(
        'Junta',
        'What should we keep?',
        'O que a gente mantém?',
        'Peça para ficar com um líder só.',
        'Please leave one leader.',
        ['please leave one leader', 'leave one leader'],
        'One leader é um líder só.'
      )
    ]
  },
  {
    id: 'cisaocalma',
    titulo: 'Um líder',
    emoji: '🪞',
    nivel: 'B1',
    onde: 'O grupo voltou a ter um líder.',
    rodadas: [
      fala(
        'Divide',
        'Is there one leader now?',
        'Agora há um líder só?',
        'Diga que agora há um líder só.',
        'There is one leader now.',
        ['there is one leader now', 'there is a single leader now'],
        'One leader now é um líder só agora.'
      ),
      fala(
        'Junta',
        'Did the split end?',
        'A cisão acabou?',
        'Diga que a cisão acabou.',
        'The split has ended.',
        ['the split has ended', 'that split has ended'],
        'Has ended é acabou.'
      )
    ]
  }
];

export const RAJADAS = [
  {
    id: 'rajadajunta',
    titulo: 'Tentam juntos',
    emoji: '🌊',
    nivel: 'A2',
    onde: 'Os clientes tentam de novo juntos.',
    rodadas: [
      fala(
        'Tenta',
        'What are the clients doing?',
        'O que os clientes fazem?',
        'Diga que os clientes tentam de novo juntos.',
        'The clients retry together.',
        ['the clients retry together', 'those clients retry together'],
        'Retry together é tentam juntos.'
      ),
      fala(
        'Acalma',
        'What happens to the load?',
        'O que acontece com a carga?',
        'Diga que a carga se multiplica.',
        'The load multiplies.',
        ['the load multiplies', 'that load multiplies'],
        'Multiplies é se multiplica.'
      )
    ]
  },
  {
    id: 'tresrajada',
    titulo: 'Três tentativas',
    emoji: '🌊',
    nivel: 'B1',
    onde: 'Cada chamada tenta três vezes.',
    rodadas: [
      fala(
        'Tenta',
        'How many times does each call retry?',
        'Quantas vezes cada chamada tenta?',
        'Diga que cada chamada tenta três vezes.',
        'Each call retries three times.',
        [
          'each call retries three times',
          'each call retries 3 times',
          'every call retries three times'
        ],
        'Three times é três vezes.'
      ),
      fala(
        'Acalma',
        'What should we add?',
        'O que a gente acrescenta?',
        'Peça para acrescentar uma espera.',
        'Please add a wait.',
        ['please add a wait', 'add a wait'],
        'Add a wait é acrescentar uma espera.'
      )
    ]
  },
  {
    id: 'rajadacalma',
    titulo: 'Rajada calma',
    emoji: '🌊',
    nivel: 'B1',
    onde: 'Os clientes esperam antes de tentar de novo.',
    rodadas: [
      fala(
        'Tenta',
        'Do the clients wait before they retry?',
        'Os clientes esperam antes de tentar?',
        'Diga que os clientes esperam antes de tentar.',
        'The clients wait before they retry.',
        ['the clients wait before they retry', 'those clients wait before they retry'],
        'Wait before they retry é esperam antes de tentar.'
      ),
      fala(
        'Acalma',
        'Did the load settle?',
        'A carga acalmou?',
        'Diga que a carga acalmou.',
        'The load settled.',
        ['the load settled', 'that load settled'],
        'Settled é acalmou.'
      )
    ]
  }
];

export const BRASAS = [
  {
    id: 'brasachave',
    titulo: 'Chave quente',
    emoji: '🔥',
    nivel: 'A2',
    onde: 'Uma chave recebe a maior parte das escritas.',
    rodadas: [
      fala(
        'Concentra',
        'Where do the writes go?',
        'Para onde vão as escritas?',
        'Diga que uma chave recebe a maior parte das escritas.',
        'One key takes most of the writes.',
        ['one key takes most of the writes', 'a key takes most of the writes'],
        'Most of the writes é a maior parte das escritas.'
      ),
      fala(
        'Espalha',
        'What happens to that key?',
        'O que acontece com essa chave?',
        'Diga que essa chave fica quente.',
        'That key gets hot.',
        ['that key gets hot', 'this key gets hot'],
        'Gets hot é fica quente.'
      )
    ]
  },
  {
    id: 'quarentabrisa',
    titulo: 'Quarenta da chave',
    emoji: '🔥',
    nivel: 'B1',
    onde: 'Uma chave leva quarenta por cento das escritas.',
    rodadas: [
      fala(
        'Concentra',
        'How much of the writes does one key take?',
        'Quanto das escritas uma chave leva?',
        'Diga que uma chave leva quarenta por cento das escritas.',
        'One key takes forty percent of the writes.',
        [
          'one key takes forty percent of the writes',
          'one key takes 40 percent of the writes',
          'a key takes forty percent of the writes'
        ],
        'Forty percent é quarenta por cento.'
      ),
      fala(
        'Espalha',
        'What should we do with the key?',
        'O que a gente faz com a chave?',
        'Peça para dividir a chave.',
        'Please split the key.',
        ['please split the key', 'split the key'],
        'Split the key é dividir a chave.'
      )
    ]
  },
  {
    id: 'brasaquieta',
    titulo: 'Chave espalhada',
    emoji: '🔥',
    nivel: 'B1',
    onde: 'As escritas se espalharam.',
    rodadas: [
      fala(
        'Concentra',
        'Did the writes spread out?',
        'As escritas se espalharam?',
        'Diga que as escritas se espalharam.',
        'The writes spread out.',
        ['the writes spread out', 'those writes spread out'],
        'Spread out é se espalharam.'
      ),
      fala(
        'Espalha',
        'Is the key cool now?',
        'A chave esfriou?',
        'Diga que a chave esfriou.',
        'The key is cool now.',
        ['the key is cool now', 'that key is cool now'],
        'Cool now é esfriou.'
      )
    ]
  }
];

export function cisaoPorId(id) {
  return CISOES.find(c => c.id === id) ?? null;
}

export function rajadaPorId(id) {
  return RAJADAS.find(c => c.id === id) ?? null;
}

export function brasaPorId(id) {
  return BRASAS.find(c => c.id === id) ?? null;
}

export function avaliarCisao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRajada(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBrasa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
