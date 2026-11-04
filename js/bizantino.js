// Bizantino que mente, partição que divide a rede e general que avança com a mesma ordem.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const BIZANTINOS = [
  {
    id: 'mentebizantino',
    titulo: 'Mentira do bizantino',
    emoji: '🤥',
    nivel: 'A2',
    onde: 'Um nó mente e os outros ainda concordam.',
    rodadas: [
      fala(
        'Mente',
        'What happens when one node lies?',
        'O que acontece quando um nó mente?',
        'Diga que um nó mentiroso ainda deixa os outros concordarem.',
        'A lying node still lets the others agree.',
        [
          'a lying node still lets the others agree',
          'that lying node still lets the others agree'
        ],
        'Still agree é ainda concordar.'
      ),
      fala(
        'Segue',
        'What should the honest nodes do?',
        'O que os nós honestos devem fazer?',
        'Peça para ignorar o nó mentiroso.',
        'Please ignore the lying node.',
        ['please ignore the lying node', 'ignore the lying node'],
        'Ignore the lying node é ignore o nó mentiroso.'
      )
    ]
  },
  {
    id: 'bizantino2',
    titulo: 'Bizantino dois',
    emoji: '🤥',
    nivel: 'B1',
    onde: 'A mentira chegou a dois nós.',
    rodadas: [
      fala(
        'Mente',
        'How many nodes did the lie reach?',
        'A quantos nós a mentira chegou?',
        'Diga que a mentira chegou a dois nós.',
        'The lie reached two nodes.',
        [
          'the lie reached two nodes',
          'the lie reached 2 nodes',
          'that lie reached two nodes'
        ],
        'Two nodes é dois nós.'
      ),
      fala(
        'Segue',
        'Where should we cap the lie?',
        'Onde a gente limita a mentira?',
        'Peça para limitar a mentira a dois nós.',
        'Please cap the lie at two nodes.',
        [
          'please cap the lie at two nodes',
          'please cap the lie at 2 nodes',
          'cap the lie at two nodes'
        ],
        'Cap the lie é limitar a mentira.'
      )
    ]
  },
  {
    id: 'bizantinook',
    titulo: 'Bizantino no alvo',
    emoji: '🤥',
    nivel: 'B1',
    onde: 'Os nós honestos podem concordar.',
    rodadas: [
      fala(
        'Mente',
        'Can the honest nodes agree?',
        'Os nós honestos podem concordar?',
        'Diga que os nós honestos podem concordar.',
        'The honest nodes can agree.',
        ['the honest nodes can agree', 'those honest nodes can agree'],
        'Can agree é podem concordar.'
      ),
      fala(
        'Segue',
        'Can this honest set agree quietly?',
        'Este conjunto honesto pode concordar quieto?',
        'Diga que este conjunto honesto pode concordar quieto.',
        'This honest set can agree quietly.',
        ['this honest set can agree quietly', 'that honest set can agree quietly'],
        'Agree quietly é concordar quieto.'
      )
    ]
  }
];

export const PARTICOES = [
  {
    id: 'dividerede',
    titulo: 'Divisão da rede',
    emoji: '🧱',
    nivel: 'A2',
    onde: 'A rede se divide e os lados não se veem.',
    rodadas: [
      fala(
        'Divide',
        'What does the split do?',
        'O que a divisão faz?',
        'Diga que a divisão mantém os dois lados separados.',
        'The split keeps the two sides apart.',
        [
          'the split keeps the two sides apart',
          'that split keeps the two sides apart'
        ],
        'Keeps apart é mantém separados.'
      ),
      fala(
        'Segue',
        'What should the sides do?',
        'O que os lados devem fazer?',
        'Peça para manter os dois lados separados.',
        'Please hold the two sides apart.',
        ['please hold the two sides apart', 'hold the two sides apart'],
        'Hold apart é manter separados.'
      )
    ]
  },
  {
    id: 'particao3',
    titulo: 'Partição três',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'A divisão isolou três nós.',
    rodadas: [
      fala(
        'Divide',
        'How many nodes did the split isolate?',
        'Quantos nós a divisão isolou?',
        'Diga que a divisão isolou três nós.',
        'The split isolated three nodes.',
        [
          'the split isolated three nodes',
          'the split isolated 3 nodes',
          'that split isolated three nodes'
        ],
        'Three nodes é três nós.'
      ),
      fala(
        'Segue',
        'Where should we cap the split?',
        'Onde a gente limita a divisão?',
        'Peça para isolar três nós.',
        'Please isolate three nodes.',
        [
          'please isolate three nodes',
          'please isolate 3 nodes',
          'isolate three nodes'
        ],
        'Isolate three nodes é isolar três nós.'
      )
    ]
  },
  {
    id: 'particaook',
    titulo: 'Partição no alvo',
    emoji: '🧱',
    nivel: 'B1',
    onde: 'A partição pode ficar.',
    rodadas: [
      fala(
        'Divide',
        'Can the sides stay split?',
        'Os lados podem ficar divididos?',
        'Diga que os lados podem ficar divididos.',
        'The sides can stay split.',
        ['the sides can stay split', 'those sides can stay split'],
        'Stay split é ficar dividido.'
      ),
      fala(
        'Segue',
        'Can this split stay quiet?',
        'Esta divisão pode ficar quieta?',
        'Diga que esta divisão pode ficar quieta.',
        'This split can stay quiet.',
        ['this split can stay quiet', 'that split can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const GENERAIS = [
  {
    id: 'avancageral',
    titulo: 'Ordem do general',
    emoji: '⚔️',
    nivel: 'A2',
    onde: 'Dois exércitos só avançam com a mesma ordem.',
    rodadas: [
      fala(
        'Avança',
        'When do the armies advance?',
        'Quando os exércitos avançam?',
        'Diga que os dois exércitos avançam com a mesma ordem.',
        'Both armies advance on the same order.',
        [
          'both armies advance on the same order',
          'the armies advance on the same order'
        ],
        'Same order é a mesma ordem.'
      ),
      fala(
        'Fecha',
        'What should the armies do?',
        'O que os exércitos devem fazer?',
        'Peça para avançar com a mesma ordem.',
        'Please advance on the same order.',
        ['please advance on the same order', 'advance on the same order'],
        'Advance on the same order é avançar com a mesma ordem.'
      )
    ]
  },
  {
    id: 'general4',
    titulo: 'General quatro',
    emoji: '⚔️',
    nivel: 'B1',
    onde: 'A ordem chegou a quatro exércitos.',
    rodadas: [
      fala(
        'Avança',
        'How many armies did the order reach?',
        'A quantos exércitos a ordem chegou?',
        'Diga que a ordem chegou a quatro exércitos.',
        'The order reached four armies.',
        [
          'the order reached four armies',
          'the order reached 4 armies',
          'that order reached four armies'
        ],
        'Four armies é quatro exércitos.'
      ),
      fala(
        'Fecha',
        'Where should we send the order?',
        'Para onde a gente manda a ordem?',
        'Peça para mandar a ordem a quatro exércitos.',
        'Please send the order to four armies.',
        [
          'please send the order to four armies',
          'please send the order to 4 armies',
          'send the order to four armies'
        ],
        'Send the order é mandar a ordem.'
      )
    ]
  },
  {
    id: 'generalok',
    titulo: 'General no alvo',
    emoji: '⚔️',
    nivel: 'B1',
    onde: 'Os exércitos podem avançar.',
    rodadas: [
      fala(
        'Avança',
        'Can the armies advance?',
        'Os exércitos podem avançar?',
        'Diga que os exércitos podem avançar.',
        'The armies can advance.',
        ['the armies can advance', 'those armies can advance'],
        'Can advance é podem avançar.'
      ),
      fala(
        'Fecha',
        'Can this army advance quietly?',
        'Este exército pode avançar quieto?',
        'Diga que este exército pode avançar quieto.',
        'This army can advance quietly.',
        ['this army can advance quietly', 'that army can advance quietly'],
        'Advance quietly é avançar quieto.'
      )
    ]
  }
];

export function bizantinoPorId(id) {
  return BIZANTINOS.find(c => c.id === id) ?? null;
}

export function particaoPorId(id) {
  return PARTICOES.find(c => c.id === id) ?? null;
}

export function generalPorId(id) {
  return GENERAIS.find(c => c.id === id) ?? null;
}

export function avaliarBizantino(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarParticao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGeneral(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
