// Webhook que avisa o sistema, fanout que espalha a chamada e ingest que recebe o evento.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

function cena(id, titulo, emoji, nivel, onde, etapa, pares) {
  return {
    id, titulo, emoji, nivel, onde,
    rodadas: pares.map(p => fala(p[0] || etapa, p[1], p[2], p[3], p[4], p[5], p[6]))
  };
}

export const WEBHOOKS = [
  cena('webhookbase', 'Avisa do webhook', '🪝', 'A2', 'O webhook avisa o sistema.', 'Avisa', [
    ['Avisa', 'What does the webhook warn?', 'O que o webhook avisa?', 'Diga que o webhook avisa o sistema.', 'The webhook warns the system.', ['the webhook warns the system', 'that webhook warns the system'], 'The system é o sistema.'],
    ['Fecha', 'What should the webhook do with the system?', 'O que o webhook deve fazer com o sistema?', 'Peça para avisar o sistema.', 'Please warn the system.', ['please warn the system', 'warn the system'], 'Warn the system é avisar o sistema.']
  ]),
  cena('webhook2', 'Webhook dois', '🪝', 'B1', 'O webhook avisou dois sistemas.', 'Avisa', [
    ['Avisa', 'How many systems did the webhook warn?', 'Quantos sistemas o webhook avisou?', 'Diga que o webhook avisou dois sistemas.', 'The webhook warned two systems.', ['the webhook warned two systems', 'the webhook warned 2 systems', 'that webhook warned two systems'], 'Two systems é dois sistemas.'],
    ['Fecha', 'Where should we cap the systems?', 'Onde a gente limita os sistemas?', 'Peça para avisar dois sistemas.', 'Please warn two systems.', ['please warn two systems', 'please warn 2 systems', 'warn two systems'], 'Warn two systems é avisar dois sistemas.']
  ]),
  cena('webhookok', 'Webhook no alvo', '🪝', 'B1', 'O webhook pode ficar.', 'Avisa', [
    ['Avisa', 'Can the webhook stay?', 'O webhook pode ficar?', 'Diga que o webhook pode ficar.', 'The webhook can stay.', ['the webhook can stay', 'that webhook can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this webhook stay quiet?', 'Este webhook pode ficar quieto?', 'Diga que este webhook pode ficar quieto.', 'This webhook can stay quiet.', ['this webhook can stay quiet', 'that webhook can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const FANOUTS = [
  cena('fanoutbase', 'Espalha do fanout', '🔀', 'A2', 'O fanout espalha a chamada.', 'Espalha', [
    ['Espalha', 'What does the fanout spread?', 'O que o fanout espalha?', 'Diga que o fanout espalha a chamada.', 'The fanout spreads the call.', ['the fanout spreads the call', 'that fanout spreads the call'], 'The call é a chamada.'],
    ['Fecha', 'What should the fanout do with the call?', 'O que o fanout deve fazer com a chamada?', 'Peça para espalhar a chamada.', 'Please spread the call.', ['please spread the call', 'spread the call'], 'Spread the call é espalhar a chamada.']
  ]),
  cena('fanout3', 'Fanout três', '🔀', 'B1', 'O fanout espalhou três chamadas.', 'Espalha', [
    ['Espalha', 'How many calls did the fanout spread?', 'Quantas chamadas o fanout espalhou?', 'Diga que o fanout espalhou três chamadas.', 'The fanout spread three calls.', ['the fanout spread three calls', 'the fanout spread 3 calls', 'that fanout spread three calls'], 'Three calls é três chamadas.'],
    ['Fecha', 'Where should we cap the calls?', 'Onde a gente limita as chamadas?', 'Peça para espalhar três chamadas.', 'Please spread three calls.', ['please spread three calls', 'please spread 3 calls', 'spread three calls'], 'Spread three calls é espalhar três chamadas.']
  ]),
  cena('fanoutok', 'Fanout no alvo', '🔀', 'B1', 'O fanout pode ficar.', 'Espalha', [
    ['Espalha', 'Can the fanout stay?', 'O fanout pode ficar?', 'Diga que o fanout pode ficar.', 'The fanout can stay.', ['the fanout can stay', 'that fanout can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this fanout stay quiet?', 'Este fanout pode ficar quieto?', 'Diga que este fanout pode ficar quieto.', 'This fanout can stay quiet.', ['this fanout can stay quiet', 'that fanout can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const INGESTS = [
  cena('ingestbase', 'Recebe do ingest', '📬', 'A2', 'O ingest recebe o evento.', 'Recebe', [
    ['Recebe', 'What does the ingest receive?', 'O que o ingest recebe?', 'Diga que o ingest recebe o evento.', 'The ingest receives the event.', ['the ingest receives the event', 'that ingest receives the event'], 'The event é o evento.'],
    ['Fecha', 'What should the ingest do with the event?', 'O que o ingest deve fazer com o evento?', 'Peça para receber o evento.', 'Please receive the event.', ['please receive the event', 'receive the event'], 'Receive the event é receber o evento.']
  ]),
  cena('ingest4', 'Ingest quatro', '📬', 'B1', 'O ingest recebeu quatro eventos.', 'Recebe', [
    ['Recebe', 'How many events did the ingest receive?', 'Quantos eventos o ingest recebeu?', 'Diga que o ingest recebeu quatro eventos.', 'The ingest received four events.', ['the ingest received four events', 'the ingest received 4 events', 'that ingest received four events'], 'Four events é quatro eventos.'],
    ['Fecha', 'Where should we cap the events?', 'Onde a gente limita os eventos?', 'Peça para receber quatro eventos.', 'Please receive four events.', ['please receive four events', 'please receive 4 events', 'receive four events'], 'Receive four events é receber quatro eventos.']
  ]),
  cena('ingestok', 'Ingest no alvo', '📬', 'B1', 'O ingest pode ficar.', 'Recebe', [
    ['Recebe', 'Can the ingest stay?', 'O ingest pode ficar?', 'Diga que o ingest pode ficar.', 'The ingest can stay.', ['the ingest can stay', 'that ingest can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this ingest stay quiet?', 'Este ingest pode ficar quieto?', 'Diga que este ingest pode ficar quieto.', 'This ingest can stay quiet.', ['this ingest can stay quiet', 'that ingest can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function webhookPorId(id) {
  return WEBHOOKS.find(c => c.id === id) ?? null;
}

export function fanoutPorId(id) {
  return FANOUTS.find(c => c.id === id) ?? null;
}

export function ingestPorId(id) {
  return INGESTS.find(c => c.id === id) ?? null;
}

export function avaliarWebhook(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFanout(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarIngest(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
