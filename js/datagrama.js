// Datagrama perdido, passe curto e carimbo da linha.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const DATAGRAMAS = [
  {
    id: 'datagramadois',
    titulo: 'Dois sumiram',
    emoji: '📨',
    nivel: 'A2',
    onde: 'Dois datagramas sumiram no caminho.',
    rodadas: [
      fala(
        'Perde',
        'What happened on the path?',
        'O que aconteceu no caminho?',
        'Diga que a rede deixou cair dois pacotes.',
        'The network dropped two packets.',
        ['the network dropped two packets', 'that network dropped two packets'],
        'Dropped two packets é deixou cair dois pacotes.'
      ),
      fala(
        'Chega',
        'What should we send again?',
        'O que a gente manda de novo?',
        'Peça para mandar os dois pacotes de novo.',
        'Please send the two packets again.',
        ['please send the two packets again', 'send the two packets again'],
        'Send again é mandar de novo.'
      )
    ]
  },
  {
    id: 'doissumiu',
    titulo: 'Dois perdidos',
    emoji: '📨',
    nivel: 'B1',
    onde: 'Dois pacotes não chegaram.',
    rodadas: [
      fala(
        'Perde',
        'How many packets never arrived?',
        'Quantos pacotes não chegaram?',
        'Diga que dois pacotes não chegaram.',
        'Two packets never arrived.',
        ['two packets never arrived', '2 packets never arrived', 'two packets did not arrive'],
        'Never arrived é não chegaram.'
      ),
      fala(
        'Chega',
        'What should we resend?',
        'O que a gente reenvia?',
        'Peça para reenviar esses dois pacotes.',
        'Please resend those two packets.',
        ['please resend those two packets', 'resend those two packets'],
        'Resend é reenviar.'
      )
    ]
  },
  {
    id: 'datagramachega',
    titulo: 'Tudo chegou',
    emoji: '📨',
    nivel: 'B1',
    onde: 'Todos os pacotes chegaram.',
    rodadas: [
      fala(
        'Perde',
        'Did every packet arrive?',
        'Todos os pacotes chegaram?',
        'Diga que todos os pacotes chegaram.',
        'Every packet arrived.',
        ['every packet arrived', 'all packets arrived'],
        'Every packet é todos os pacotes.'
      ),
      fala(
        'Chega',
        'Is the path clear now?',
        'O caminho está livre agora?',
        'Diga que o caminho está livre agora.',
        'The path is clear now.',
        ['the path is clear now', 'that path is clear now'],
        'Clear now é livre agora.'
      )
    ]
  }
];

export const PASSES = [
  {
    id: 'passecuro',
    titulo: 'Passe vencido',
    emoji: '🎫',
    nivel: 'A2',
    onde: 'O passe curto venceu.',
    rodadas: [
      fala(
        'Vence',
        'What happened to the pass?',
        'O que aconteceu com o passe?',
        'Diga que o passe curto venceu.',
        'The short pass expired.',
        ['the short pass expired', 'that short pass expired'],
        'Expired é venceu.'
      ),
      fala(
        'Renova',
        'What should we issue?',
        'O que a gente emite?',
        'Peça um passe novo.',
        'Please issue a fresh pass.',
        ['please issue a fresh pass', 'issue a fresh pass'],
        'A fresh pass é um passe novo.'
      )
    ]
  },
  {
    id: 'quinzepasse',
    titulo: 'Quinze minutos',
    emoji: '🎫',
    nivel: 'B1',
    onde: 'O passe durou quinze minutos.',
    rodadas: [
      fala(
        'Vence',
        'How long did the pass live?',
        'Quanto tempo o passe durou?',
        'Diga que o passe durou quinze minutos.',
        'The pass lived fifteen minutes.',
        ['the pass lived fifteen minutes', 'the pass lived 15 minutes', 'that pass lived fifteen minutes'],
        'Fifteen minutes é quinze minutos.'
      ),
      fala(
        'Renova',
        'How long should the next pass live?',
        'Quanto tempo o próximo passe deve durar?',
        'Peça um passe de quinze minutos.',
        'Please issue a pass for fifteen minutes.',
        ['please issue a pass for fifteen minutes', 'please issue a pass for 15 minutes', 'issue a pass for fifteen minutes'],
        'For fifteen minutes é por quinze minutos.'
      )
    ]
  },
  {
    id: 'passeok',
    titulo: 'Passe novo',
    emoji: '🎫',
    nivel: 'B1',
    onde: 'O passe novo funciona.',
    rodadas: [
      fala(
        'Vence',
        'Does the fresh pass work?',
        'O passe novo funciona?',
        'Diga que o passe novo funciona.',
        'The fresh pass works.',
        ['the fresh pass works', 'that fresh pass works'],
        'Works é funciona.'
      ),
      fala(
        'Renova',
        'Should we keep this pass?',
        'A gente mantém este passe?',
        'Peça para deixar este passe no lugar.',
        'Please leave this pass in place.',
        ['please leave this pass in place', 'leave this pass in place'],
        'In place é no lugar.'
      )
    ]
  }
];

export const CARIMBOS = [
  {
    id: 'carimbovelho',
    titulo: 'Carimbo velho',
    emoji: '🖊️',
    nivel: 'A2',
    onde: 'O carimbo da linha mudou.',
    rodadas: [
      fala(
        'Muda',
        'What happened to the row?',
        'O que aconteceu com a linha?',
        'Diga que o carimbo da linha mudou.',
        'The row stamp changed.',
        ['the row stamp changed', 'that row stamp changed'],
        'Stamp changed é o carimbo mudou.'
      ),
      fala(
        'Grava',
        'What should we read again?',
        'O que a gente lê de novo?',
        'Peça para ler a linha de novo.',
        'Please read the row again.',
        ['please read the row again', 'read the row again'],
        'Read again é ler de novo.'
      )
    ]
  },
  {
    id: 'quartoversao',
    titulo: 'Versão quatro',
    emoji: '🖊️',
    nivel: 'B1',
    onde: 'A linha está na versão quatro.',
    rodadas: [
      fala(
        'Muda',
        'Which version is the row now?',
        'Em qual versão a linha está agora?',
        'Diga que a linha está na versão quatro.',
        'The row is now version four.',
        ['the row is now version four', 'the row is now version 4', 'that row is now version four'],
        'Version four é versão quatro.'
      ),
      fala(
        'Grava',
        'Which version should we save?',
        'Qual versão a gente grava?',
        'Peça para gravar a versão quatro.',
        'Please save version four.',
        ['please save version four', 'please save version 4', 'save version four'],
        'Save version four é gravar a versão quatro.'
      )
    ]
  },
  {
    id: 'carimbonovo',
    titulo: 'Carimbo novo',
    emoji: '🖊️',
    nivel: 'B1',
    onde: 'O carimbo novo gravou.',
    rodadas: [
      fala(
        'Muda',
        'Did the new stamp save?',
        'O carimbo novo gravou?',
        'Diga que o carimbo novo gravou.',
        'The new stamp saved.',
        ['the new stamp saved', 'that new stamp saved'],
        'Saved é gravou.'
      ),
      fala(
        'Grava',
        'Does the row match the stamp?',
        'A linha combina com o carimbo?',
        'Diga que a linha combina com o carimbo.',
        'The row matches the stamp.',
        ['the row matches the stamp', 'that row matches the stamp'],
        'Matches the stamp é combina com o carimbo.'
      )
    ]
  }
];

export function datagramaPorId(id) {
  return DATAGRAMAS.find(c => c.id === id) ?? null;
}

export function passePorId(id) {
  return PASSES.find(c => c.id === id) ?? null;
}

export function carimboPorId(id) {
  return CARIMBOS.find(c => c.id === id) ?? null;
}

export function avaliarDatagrama(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPasse(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCarimbo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
