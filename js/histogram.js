// Histogram que conta o balde, gauge que mostra o nível e backfill que enche o buraco.

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

export const HISTOGRAMS = [
  cena('histogrambase', 'Conta do histogram', '📊', 'A2', 'O histogram conta o balde.', 'Conta', [
    ['Conta', 'What does the histogram count?', 'O que o histogram conta?', 'Diga que o histogram conta o balde.', 'The histogram counts the bucket.', ['the histogram counts the bucket', 'that histogram counts the bucket'], 'The bucket é o balde.'],
    ['Segue', 'What should the histogram do with the bucket?', 'O que o histogram deve fazer com o balde?', 'Peça para contar o balde.', 'Please count the bucket.', ['please count the bucket', 'count the bucket'], 'Count the bucket é contar o balde.']
  ]),
  cena('histogram2', 'Histogram dois', '📊', 'B1', 'O histogram contou dois baldes.', 'Conta', [
    ['Conta', 'How many buckets did the histogram count?', 'Quantos baldes o histogram contou?', 'Diga que o histogram contou dois baldes.', 'The histogram counted two buckets.', ['the histogram counted two buckets', 'the histogram counted 2 buckets', 'that histogram counted two buckets'], 'Two buckets é dois baldes.'],
    ['Segue', 'Where should we cap the buckets?', 'Onde a gente limita os baldes?', 'Peça para contar dois baldes.', 'Please count two buckets.', ['please count two buckets', 'please count 2 buckets', 'count two buckets'], 'Count two buckets é contar dois baldes.']
  ]),
  cena('histogramok', 'Histogram no alvo', '📊', 'B1', 'O histogram pode ficar.', 'Conta', [
    ['Conta', 'Can the histogram stay?', 'O histogram pode ficar?', 'Diga que o histogram pode ficar.', 'The histogram can stay.', ['the histogram can stay', 'that histogram can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this histogram stay quiet?', 'Este histogram pode ficar quieto?', 'Diga que este histogram pode ficar quieto.', 'This histogram can stay quiet.', ['this histogram can stay quiet', 'that histogram can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const GAUGES = [
  cena('gaugebase', 'Mostra do gauge', '🌡️', 'A2', 'O gauge mostra o nível.', 'Mostra', [
    ['Mostra', 'What does the gauge show?', 'O que o gauge mostra?', 'Diga que o gauge mostra o nível.', 'The gauge shows the level.', ['the gauge shows the level', 'that gauge shows the level'], 'The level é o nível.'],
    ['Segue', 'What should the gauge do with the level?', 'O que o gauge deve fazer com o nível?', 'Peça para mostrar o nível.', 'Please show the level.', ['please show the level', 'show the level'], 'Show the level é mostrar o nível.']
  ]),
  cena('gauge3', 'Gauge três', '🌡️', 'B1', 'O gauge mostrou três níveis.', 'Mostra', [
    ['Mostra', 'How many levels did the gauge show?', 'Quantos níveis o gauge mostrou?', 'Diga que o gauge mostrou três níveis.', 'The gauge showed three levels.', ['the gauge showed three levels', 'the gauge showed 3 levels', 'that gauge showed three levels'], 'Three levels é três níveis.'],
    ['Segue', 'Where should we cap the levels?', 'Onde a gente limita os níveis?', 'Peça para mostrar três níveis.', 'Please show three levels.', ['please show three levels', 'please show 3 levels', 'show three levels'], 'Show three levels é mostrar três níveis.']
  ]),
  cena('gaugeok', 'Gauge no alvo', '🌡️', 'B1', 'O gauge pode ficar.', 'Mostra', [
    ['Mostra', 'Can the gauge stay?', 'O gauge pode ficar?', 'Diga que o gauge pode ficar.', 'The gauge can stay.', ['the gauge can stay', 'that gauge can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this gauge stay quiet?', 'Este gauge pode ficar quieto?', 'Diga que este gauge pode ficar quieto.', 'This gauge can stay quiet.', ['this gauge can stay quiet', 'that gauge can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const BACKFILLS = [
  cena('backfillbase', 'Enche do backfill', '🪣', 'A2', 'O backfill enche o buraco.', 'Enche', [
    ['Enche', 'What does the backfill fill?', 'O que o backfill enche?', 'Diga que o backfill enche o buraco.', 'The backfill fills the gap.', ['the backfill fills the gap', 'that backfill fills the gap'], 'The gap é o buraco.'],
    ['Segue', 'What should the backfill do with the gap?', 'O que o backfill deve fazer com o buraco?', 'Peça para encher o buraco.', 'Please fill the gap.', ['please fill the gap', 'fill the gap'], 'Fill the gap é encher o buraco.']
  ]),
  cena('backfill4', 'Backfill quatro', '🪣', 'B1', 'O backfill encheu quatro buracos.', 'Enche', [
    ['Enche', 'How many gaps did the backfill fill?', 'Quantos buracos o backfill encheu?', 'Diga que o backfill encheu quatro buracos.', 'The backfill filled four gaps.', ['the backfill filled four gaps', 'the backfill filled 4 gaps', 'that backfill filled four gaps'], 'Four gaps é quatro buracos.'],
    ['Segue', 'Where should we cap the gaps?', 'Onde a gente limita os buracos?', 'Peça para encher quatro buracos.', 'Please fill four gaps.', ['please fill four gaps', 'please fill 4 gaps', 'fill four gaps'], 'Fill four gaps é encher quatro buracos.']
  ]),
  cena('backfillok', 'Backfill no alvo', '🪣', 'B1', 'O backfill pode ficar.', 'Enche', [
    ['Enche', 'Can the backfill stay?', 'O backfill pode ficar?', 'Diga que o backfill pode ficar.', 'The backfill can stay.', ['the backfill can stay', 'that backfill can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this backfill stay quiet?', 'Este backfill pode ficar quieto?', 'Diga que este backfill pode ficar quieto.', 'This backfill can stay quiet.', ['this backfill can stay quiet', 'that backfill can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function histogramPorId(id) {
  return HISTOGRAMS.find(c => c.id === id) ?? null;
}

export function gaugePorId(id) {
  return GAUGES.find(c => c.id === id) ?? null;
}

export function backfillPorId(id) {
  return BACKFILLS.find(c => c.id === id) ?? null;
}

export function avaliarHistogram(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGauge(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBackfill(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
