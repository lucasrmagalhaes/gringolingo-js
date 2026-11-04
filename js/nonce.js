// Nonce que entra uma vez, hmac que sela a mensagem e envelope que leva a chave.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const NONCES = [
  {
    id: 'nonceuma',
    titulo: 'Uso do nonce',
    emoji: '🎲',
    nivel: 'A2',
    onde: 'O número entra uma vez e não volta.',
    rodadas: [
      fala(
        'Entra',
        'How is the number used?',
        'Como o número é usado?',
        'Diga que o número entra uma vez e não volta.',
        'The number is used once and does not return.',
        [
          'the number is used once and does not return',
          'that number is used once and does not return'
        ],
        'Used once é usado uma vez.'
      ),
      fala(
        'Segue',
        'What should the number do?',
        'O que o número deve fazer?',
        'Peça para usar o número uma vez.',
        'Please use the number once.',
        ['please use the number once', 'use the number once'],
        'Use once é usar uma vez.'
      )
    ]
  },
  {
    id: 'nonce2',
    titulo: 'Nonce dois',
    emoji: '🎲',
    nivel: 'B1',
    onde: 'O nonce cobriu duas chamadas.',
    rodadas: [
      fala(
        'Entra',
        'How many calls did the nonce cover?',
        'Quantas chamadas o nonce cobriu?',
        'Diga que o nonce cobriu duas chamadas.',
        'The nonce covered two calls.',
        [
          'the nonce covered two calls',
          'the nonce covered 2 calls',
          'that nonce covered two calls'
        ],
        'Two calls é duas chamadas.'
      ),
      fala(
        'Segue',
        'Where should we cap the calls?',
        'Onde a gente limita as chamadas?',
        'Peça para cobrir duas chamadas.',
        'Please cover two calls.',
        [
          'please cover two calls',
          'please cover 2 calls',
          'cover two calls'
        ],
        'Cover two calls é cobrir duas chamadas.'
      )
    ]
  },
  {
    id: 'nonceok',
    titulo: 'Nonce no alvo',
    emoji: '🎲',
    nivel: 'B1',
    onde: 'O nonce pode ficar.',
    rodadas: [
      fala(
        'Entra',
        'Can the nonce stay?',
        'O nonce pode ficar?',
        'Diga que o nonce pode ficar.',
        'The nonce can stay.',
        ['the nonce can stay', 'that nonce can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this nonce stay quiet?',
        'Este nonce pode ficar quieto?',
        'Diga que este nonce pode ficar quieto.',
        'This nonce can stay quiet.',
        ['this nonce can stay quiet', 'that nonce can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const HMACS = [
  {
    id: 'selohmac',
    titulo: 'Selo do hmac',
    emoji: '🏷️',
    nivel: 'A2',
    onde: 'O selo confere a mensagem e a chave.',
    rodadas: [
      fala(
        'Sela',
        'What does the seal check?',
        'O que o selo confere?',
        'Diga que o selo confere a mensagem e a chave.',
        'The seal matches the message and the key.',
        [
          'the seal matches the message and the key',
          'that seal matches the message and the key'
        ],
        'Matches the key é confere a chave.'
      ),
      fala(
        'Segue',
        'What should the seal do?',
        'O que o selo deve fazer?',
        'Peça para conferir a mensagem e a chave.',
        'Please match the message and the key.',
        ['please match the message and the key', 'match the message and the key'],
        'Match the key é conferir a chave.'
      )
    ]
  },
  {
    id: 'hmac3',
    titulo: 'Hmac três',
    emoji: '🏷️',
    nivel: 'B1',
    onde: 'O selo cobriu três mensagens.',
    rodadas: [
      fala(
        'Sela',
        'How many messages did the seal cover?',
        'Quantas mensagens o selo cobriu?',
        'Diga que o selo cobriu três mensagens.',
        'The seal covered three messages.',
        [
          'the seal covered three messages',
          'the seal covered 3 messages',
          'that seal covered three messages'
        ],
        'Three messages é três mensagens.'
      ),
      fala(
        'Segue',
        'Where should we cap the messages?',
        'Onde a gente limita as mensagens?',
        'Peça para cobrir três mensagens.',
        'Please cover three messages.',
        [
          'please cover three messages',
          'please cover 3 messages',
          'cover three messages'
        ],
        'Cover three messages é cobrir três mensagens.'
      )
    ]
  },
  {
    id: 'hmacok',
    titulo: 'Hmac no alvo',
    emoji: '🏷️',
    nivel: 'B1',
    onde: 'O selo pode ficar.',
    rodadas: [
      fala(
        'Sela',
        'Can the seal stay?',
        'O selo pode ficar?',
        'Diga que o selo pode ficar.',
        'The seal can stay.',
        ['the seal can stay', 'that seal can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this seal stay quiet?',
        'Este selo pode ficar quieto?',
        'Diga que este selo pode ficar quieto.',
        'This seal can stay quiet.',
        ['this seal can stay quiet', 'that seal can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const ENVELOPES = [
  {
    id: 'chaveenvelope',
    titulo: 'Chave do envelope',
    emoji: '✉️',
    nivel: 'A2',
    onde: 'A chave viaja dentro de outra chave.',
    rodadas: [
      fala(
        'Embala',
        'Where does the key travel?',
        'Onde a chave viaja?',
        'Diga que a chave viaja dentro de outra chave.',
        'The key travels inside another key.',
        [
          'the key travels inside another key',
          'that key travels inside another key'
        ],
        'Inside another key é dentro de outra chave.'
      ),
      fala(
        'Fecha',
        'What should the key do?',
        'O que a chave deve fazer?',
        'Peça para viajar dentro de outra chave.',
        'Please travel inside another key.',
        ['please travel inside another key', 'travel inside another key'],
        'Travel inside é viajar dentro.'
      )
    ]
  },
  {
    id: 'envelope4',
    titulo: 'Envelope quatro',
    emoji: '✉️',
    nivel: 'B1',
    onde: 'O envelope levou quatro chaves.',
    rodadas: [
      fala(
        'Embala',
        'How many keys did the envelope carry?',
        'Quantas chaves o envelope levou?',
        'Diga que o envelope levou quatro chaves.',
        'The envelope carried four keys.',
        [
          'the envelope carried four keys',
          'the envelope carried 4 keys',
          'that envelope carried four keys'
        ],
        'Four keys é quatro chaves.'
      ),
      fala(
        'Fecha',
        'Where should we cap the keys?',
        'Onde a gente limita as chaves?',
        'Peça para levar quatro chaves.',
        'Please carry four keys.',
        [
          'please carry four keys',
          'please carry 4 keys',
          'carry four keys'
        ],
        'Carry four keys é levar quatro chaves.'
      )
    ]
  },
  {
    id: 'envelopeok',
    titulo: 'Envelope no alvo',
    emoji: '✉️',
    nivel: 'B1',
    onde: 'O envelope pode ficar.',
    rodadas: [
      fala(
        'Embala',
        'Can the envelope stay?',
        'O envelope pode ficar?',
        'Diga que o envelope pode ficar.',
        'The envelope can stay.',
        ['the envelope can stay', 'that envelope can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this envelope stay quiet?',
        'Este envelope pode ficar quieto?',
        'Diga que este envelope pode ficar quieto.',
        'This envelope can stay quiet.',
        ['this envelope can stay quiet', 'that envelope can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function noncePorId(id) {
  return NONCES.find(c => c.id === id) ?? null;
}

export function hmacPorId(id) {
  return HMACS.find(c => c.id === id) ?? null;
}

export function envelopePorId(id) {
  return ENVELOPES.find(c => c.id === id) ?? null;
}

export function avaliarNonce(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarHmac(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEnvelope(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
