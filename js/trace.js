// Trace que segue a chamada, scrape que lê a métrica e rollup que soma a hora.

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

export const TRACES = [
  cena('tracebase', 'Segue do trace', '🧵', 'A2', 'O trace segue a chamada.', 'Segue', [
    ['Segue', 'What does the trace follow?', 'O que o trace segue?', 'Diga que o trace segue a chamada.', 'The trace follows the call.', ['the trace follows the call', 'that trace follows the call'], 'The call é a chamada.'],
    ['Fecha', 'What should the trace do with the call?', 'O que o trace deve fazer com a chamada?', 'Peça para seguir a chamada.', 'Please follow the call.', ['please follow the call', 'follow the call'], 'Follow the call é seguir a chamada.']
  ]),
  cena('trace2', 'Trace dois', '🧵', 'B1', 'O trace seguiu duas chamadas.', 'Segue', [
    ['Segue', 'How many calls did the trace follow?', 'Quantas chamadas o trace seguiu?', 'Diga que o trace seguiu duas chamadas.', 'The trace followed two calls.', ['the trace followed two calls', 'the trace followed 2 calls', 'that trace followed two calls'], 'Two calls é duas chamadas.'],
    ['Fecha', 'Where should we cap the calls?', 'Onde a gente limita as chamadas?', 'Peça para seguir duas chamadas.', 'Please follow two calls.', ['please follow two calls', 'please follow 2 calls', 'follow two calls'], 'Follow two calls é seguir duas chamadas.']
  ]),
  cena('traceok', 'Trace no alvo', '🧵', 'B1', 'O trace pode ficar.', 'Segue', [
    ['Segue', 'Can the trace stay?', 'O trace pode ficar?', 'Diga que o trace pode ficar.', 'The trace can stay.', ['the trace can stay', 'that trace can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this trace stay quiet?', 'Este trace pode ficar quieto?', 'Diga que este trace pode ficar quieto.', 'This trace can stay quiet.', ['this trace can stay quiet', 'that trace can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const SCRAPES = [
  cena('scrapebase', 'Lê do scrape', '🧹', 'A2', 'O scrape lê a métrica.', 'Lê', [
    ['Lê', 'What does the scrape read?', 'O que o scrape lê?', 'Diga que o scrape lê a métrica.', 'The scrape reads the metric.', ['the scrape reads the metric', 'that scrape reads the metric'], 'The metric é a métrica.'],
    ['Fecha', 'What should the scrape do with the metric?', 'O que o scrape deve fazer com a métrica?', 'Peça para ler a métrica.', 'Please read the metric.', ['please read the metric', 'read the metric'], 'Read the metric é ler a métrica.']
  ]),
  cena('scrape3', 'Scrape três', '🧹', 'B1', 'O scrape leu três métricas.', 'Lê', [
    ['Lê', 'How many metrics did the scrape read?', 'Quantas métricas o scrape leu?', 'Diga que o scrape leu três métricas.', 'The scrape read three metrics.', ['the scrape read three metrics', 'the scrape read 3 metrics', 'that scrape read three metrics'], 'Three metrics é três métricas.'],
    ['Fecha', 'Where should we cap the metrics?', 'Onde a gente limita as métricas?', 'Peça para ler três métricas.', 'Please read three metrics.', ['please read three metrics', 'please read 3 metrics', 'read three metrics'], 'Read three metrics é ler três métricas.']
  ]),
  cena('scrapeok', 'Scrape no alvo', '🧹', 'B1', 'O scrape pode ficar.', 'Lê', [
    ['Lê', 'Can the scrape stay?', 'O scrape pode ficar?', 'Diga que o scrape pode ficar.', 'The scrape can stay.', ['the scrape can stay', 'that scrape can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this scrape stay quiet?', 'Este scrape pode ficar quieto?', 'Diga que este scrape pode ficar quieto.', 'This scrape can stay quiet.', ['this scrape can stay quiet', 'that scrape can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const ROLLUPS = [
  cena('rollupbase', 'Soma do rollup', '🧮', 'A2', 'O rollup soma a hora.', 'Soma', [
    ['Soma', 'What does the rollup sum?', 'O que o rollup soma?', 'Diga que o rollup soma a hora.', 'The rollup sums the hour.', ['the rollup sums the hour', 'that rollup sums the hour'], 'The hour é a hora.'],
    ['Fecha', 'What should the rollup do with the hour?', 'O que o rollup deve fazer com a hora?', 'Peça para somar a hora.', 'Please sum the hour.', ['please sum the hour', 'sum the hour'], 'Sum the hour é somar a hora.']
  ]),
  cena('rollup4', 'Rollup quatro', '🧮', 'B1', 'O rollup somou quatro horas.', 'Soma', [
    ['Soma', 'How many hours did the rollup sum?', 'Quantas horas o rollup somou?', 'Diga que o rollup somou quatro horas.', 'The rollup summed four hours.', ['the rollup summed four hours', 'the rollup summed 4 hours', 'that rollup summed four hours'], 'Four hours é quatro horas.'],
    ['Fecha', 'Where should we cap the hours?', 'Onde a gente limita as horas?', 'Peça para somar quatro horas.', 'Please sum four hours.', ['please sum four hours', 'please sum 4 hours', 'sum four hours'], 'Sum four hours é somar quatro horas.']
  ]),
  cena('rollupok', 'Rollup no alvo', '🧮', 'B1', 'O rollup pode ficar.', 'Soma', [
    ['Soma', 'Can the rollup stay?', 'O rollup pode ficar?', 'Diga que o rollup pode ficar.', 'The rollup can stay.', ['the rollup can stay', 'that rollup can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this rollup stay quiet?', 'Este rollup pode ficar quieto?', 'Diga que este rollup pode ficar quieto.', 'This rollup can stay quiet.', ['this rollup can stay quiet', 'that rollup can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function tracePorId(id) {
  return TRACES.find(c => c.id === id) ?? null;
}

export function scrapePorId(id) {
  return SCRAPES.find(c => c.id === id) ?? null;
}

export function rollupPorId(id) {
  return ROLLUPS.find(c => c.id === id) ?? null;
}

export function avaliarTrace(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarScrape(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRollup(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
