// Cofre que guarda a chave, audiencia do passe e revogacao que corta o passe antigo.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const COFRES = [
  {
    id: 'chavecofre',
    titulo: 'Chave do cofre',
    emoji: '🏦',
    nivel: 'A2',
    onde: 'A chave mora fora do app.',
    rodadas: [
      fala(
        'Guarda',
        'Where does the key live?',
        'Onde a chave mora?',
        'Diga que a chave mora fora do app.',
        'The key lives outside the app.',
        ['the key lives outside the app', 'that key lives outside the app'],
        'Outside the app é fora do app.'
      ),
      fala(
        'Tira',
        'What should we do with the key?',
        'O que a gente faz com a chave?',
        'Peça para guardar a chave fora do app.',
        'Please store the key outside the app.',
        ['please store the key outside the app', 'store the key outside the app'],
        'Store the key é guardar a chave.'
      )
    ]
  },
  {
    id: 'duaschaves',
    titulo: 'Cofre duas',
    emoji: '🏦',
    nivel: 'B1',
    onde: 'O cofre guardou duas chaves.',
    rodadas: [
      fala(
        'Guarda',
        'How many keys did the vault keep?',
        'Quantas chaves o cofre guardou?',
        'Diga que o cofre guardou duas chaves.',
        'The vault kept two keys.',
        [
          'the vault kept two keys',
          'the vault kept 2 keys',
          'that vault kept two keys'
        ],
        'Two keys é duas chaves.'
      ),
      fala(
        'Tira',
        'Where should we store the keys?',
        'Onde a gente guarda as chaves?',
        'Peça para guardar duas chaves no cofre.',
        'Please store two keys in the vault.',
        [
          'please store two keys in the vault',
          'please store 2 keys in the vault',
          'store two keys in the vault'
        ],
        'In the vault é no cofre.'
      )
    ]
  },
  {
    id: 'cofreok',
    titulo: 'Cofre no alvo',
    emoji: '🏦',
    nivel: 'B1',
    onde: 'A chave antiga pode ficar.',
    rodadas: [
      fala(
        'Guarda',
        'Can the old key stay?',
        'A chave antiga pode ficar?',
        'Diga que a chave antiga pode ficar.',
        'The old key can stay.',
        ['the old key can stay', 'that old key can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Tira',
        'Can this vault stay closed?',
        'Este cofre pode ficar fechado?',
        'Diga que este cofre pode ficar fechado.',
        'This vault can stay closed.',
        ['this vault can stay closed', 'that vault can stay closed'],
        'Stay closed é ficar fechado.'
      )
    ]
  }
];

export const AUDIENCIAS = [
  {
    id: 'servicoaudiencia',
    titulo: 'Serviço da audiência',
    emoji: '👂',
    nivel: 'A2',
    onde: 'O passe só vale para o serviço certo.',
    rodadas: [
      fala(
        'Vale',
        'Which service can use the pass?',
        'Qual serviço pode usar o passe?',
        'Diga que o passe só vale para o serviço certo.',
        'The pass only works for the right service.',
        ['the pass only works for the right service', 'that pass only works for the right service'],
        'The right service é o serviço certo.'
      ),
      fala(
        'Recusa',
        'What should we name on the pass?',
        'O que a gente escreve no passe?',
        'Peça para nomear o serviço certo.',
        'Please name the right service.',
        ['please name the right service', 'name the right service'],
        'Name the service é nomear o serviço.'
      )
    ]
  },
  {
    id: 'audiencia2',
    titulo: 'Audiência duas',
    emoji: '👂',
    nivel: 'B1',
    onde: 'A audiência nomeou dois serviços.',
    rodadas: [
      fala(
        'Vale',
        'How many services did the audience name?',
        'Quantos serviços a audiência nomeou?',
        'Diga que a audiência nomeou dois serviços.',
        'The audience named two services.',
        [
          'the audience named two services',
          'the audience named 2 services',
          'that audience named two services'
        ],
        'Two services é dois serviços.'
      ),
      fala(
        'Recusa',
        'Where should we cap the audience?',
        'Onde a gente limita a audiência?',
        'Peça para limitar a audiência a dois serviços.',
        'Please cap the audience at two services.',
        [
          'please cap the audience at two services',
          'please cap the audience at 2 services',
          'cap the audience at two services'
        ],
        'Cap the audience é limitar a audiência.'
      )
    ]
  },
  {
    id: 'audienciaok',
    titulo: 'Audiência no alvo',
    emoji: '👂',
    nivel: 'B1',
    onde: 'O serviço certo pode ficar.',
    rodadas: [
      fala(
        'Vale',
        'Can the right service stay?',
        'O serviço certo pode ficar?',
        'Diga que o serviço certo pode ficar.',
        'The right service can stay.',
        ['the right service can stay', 'that right service can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Recusa',
        'Can the wrong service leave?',
        'O serviço errado pode sair?',
        'Diga que o serviço errado pode sair.',
        'The wrong service can leave.',
        ['the wrong service can leave', 'that wrong service can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export const REVOGACOES = [
  {
    id: 'passevelho',
    titulo: 'Passe velho',
    emoji: '🚫',
    nivel: 'A2',
    onde: 'O passe antigo deixa de valer na hora.',
    rodadas: [
      fala(
        'Corta',
        'When does the old pass stop?',
        'Quando o passe antigo para?',
        'Diga que o passe antigo deixa de valer na hora.',
        'The old pass stops working at once.',
        ['the old pass stops working at once', 'that old pass stops working at once'],
        'At once é na hora.'
      ),
      fala(
        'Sai',
        'What should we do with the old pass?',
        'O que a gente faz com o passe antigo?',
        'Peça para cortar o passe antigo agora.',
        'Please cut the old pass now.',
        ['please cut the old pass now', 'cut the old pass now'],
        'Cut the old pass é cortar o passe antigo.'
      )
    ]
  },
  {
    id: 'revoga2',
    titulo: 'Revogação duas',
    emoji: '🚫',
    nivel: 'B1',
    onde: 'A revogação cobriu dois passes.',
    rodadas: [
      fala(
        'Corta',
        'How many passes did the revocation cover?',
        'Quantos passes a revogação cobriu?',
        'Diga que a revogação cobriu dois passes.',
        'The revocation covered two passes.',
        [
          'the revocation covered two passes',
          'the revocation covered 2 passes',
          'that revocation covered two passes'
        ],
        'Two passes é dois passes.'
      ),
      fala(
        'Sai',
        'Where should we cap the revocation?',
        'Onde a gente limita a revogação?',
        'Peça para limitar a revogação a dois passes.',
        'Please cap the revocation at two passes.',
        [
          'please cap the revocation at two passes',
          'please cap the revocation at 2 passes',
          'cap the revocation at two passes'
        ],
        'Cap the revocation é limitar a revogação.'
      )
    ]
  },
  {
    id: 'revogaok',
    titulo: 'Revogação no alvo',
    emoji: '🚫',
    nivel: 'B1',
    onde: 'O passe novo pode ficar.',
    rodadas: [
      fala(
        'Corta',
        'Can the new pass stay?',
        'O passe novo pode ficar?',
        'Diga que o passe novo pode ficar.',
        'The new pass can stay.',
        ['the new pass can stay', 'that new pass can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Sai',
        'Can the old pass leave?',
        'O passe antigo pode sair?',
        'Diga que o passe antigo pode sair.',
        'The old pass can leave.',
        ['the old pass can leave', 'that old pass can leave'],
        'Can leave é pode sair.'
      )
    ]
  }
];

export function cofrePorId(id) {
  return COFRES.find(c => c.id === id) ?? null;
}

export function audienciaPorId(id) {
  return AUDIENCIAS.find(c => c.id === id) ?? null;
}

export function revogacaoPorId(id) {
  return REVOGACOES.find(c => c.id === id) ?? null;
}

export function avaliarCofre(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAudiencia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRevogacao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
