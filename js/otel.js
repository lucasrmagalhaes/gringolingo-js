// Otel que exporta o sinal, sampler que escolhe o rastro e exemplar que marca o pico.

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

export const OTELS = [
  cena('otelbase', 'Exporta do otel', '📤', 'A2', 'O otel exporta o sinal.', 'Exporta', [
    ['Exporta', 'What does the otel export?', 'O que o otel exporta?', 'Diga que o otel exporta o sinal.', 'The otel exports the signal.', ['the otel exports the signal', 'that otel exports the signal'], 'The signal é o sinal.'],
    ['Fecha', 'What should the otel do with the signal?', 'O que o otel deve fazer com o sinal?', 'Peça para exportar o sinal.', 'Please export the signal.', ['please export the signal', 'export the signal'], 'Export the signal é exportar o sinal.']
  ]),
  cena('otel2', 'Otel dois', '📤', 'B1', 'O otel exportou dois sinais.', 'Exporta', [
    ['Exporta', 'How many signals did the otel export?', 'Quantos sinais o otel exportou?', 'Diga que o otel exportou dois sinais.', 'The otel exported two signals.', ['the otel exported two signals', 'the otel exported 2 signals', 'that otel exported two signals'], 'Two signals é dois sinais.'],
    ['Fecha', 'Where should we cap the signals?', 'Onde a gente limita os sinais?', 'Peça para exportar dois sinais.', 'Please export two signals.', ['please export two signals', 'please export 2 signals', 'export two signals'], 'Export two signals é exportar dois sinais.']
  ]),
  cena('otelok', 'Otel no alvo', '📤', 'B1', 'O otel pode ficar.', 'Exporta', [
    ['Exporta', 'Can the otel stay?', 'O otel pode ficar?', 'Diga que o otel pode ficar.', 'The otel can stay.', ['the otel can stay', 'that otel can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this otel stay quiet?', 'Este otel pode ficar quieto?', 'Diga que este otel pode ficar quieto.', 'This otel can stay quiet.', ['this otel can stay quiet', 'that otel can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const SAMPLERS = [
  cena('samplerbase', 'Escolhe do sampler', '🎚️', 'A2', 'O sampler escolhe o rastro.', 'Escolhe', [
    ['Escolhe', 'What does the sampler choose?', 'O que o sampler escolhe?', 'Diga que o sampler escolhe o rastro.', 'The sampler chooses the trace.', ['the sampler chooses the trace', 'that sampler chooses the trace'], 'The trace é o rastro.'],
    ['Fecha', 'What should the sampler do with the trace?', 'O que o sampler deve fazer com o rastro?', 'Peça para escolher o rastro.', 'Please choose the trace.', ['please choose the trace', 'choose the trace'], 'Choose the trace é escolher o rastro.']
  ]),
  cena('sampler3', 'Sampler três', '🎚️', 'B1', 'O sampler escolheu três rastros.', 'Escolhe', [
    ['Escolhe', 'How many traces did the sampler choose?', 'Quantos rastros o sampler escolheu?', 'Diga que o sampler escolheu três rastros.', 'The sampler chose three traces.', ['the sampler chose three traces', 'the sampler chose 3 traces', 'that sampler chose three traces'], 'Three traces é três rastros.'],
    ['Fecha', 'Where should we cap the traces?', 'Onde a gente limita os rastros?', 'Peça para escolher três rastros.', 'Please choose three traces.', ['please choose three traces', 'please choose 3 traces', 'choose three traces'], 'Choose three traces é escolher três rastros.']
  ]),
  cena('samplerok', 'Sampler no alvo', '🎚️', 'B1', 'O sampler pode ficar.', 'Escolhe', [
    ['Escolhe', 'Can the sampler stay?', 'O sampler pode ficar?', 'Diga que o sampler pode ficar.', 'The sampler can stay.', ['the sampler can stay', 'that sampler can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this sampler stay quiet?', 'Este sampler pode ficar quieto?', 'Diga que este sampler pode ficar quieto.', 'This sampler can stay quiet.', ['this sampler can stay quiet', 'that sampler can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const EXEMPLARS = [
  cena('exemplarbase', 'Marca do exemplar', '📌', 'A2', 'O exemplar marca o pico.', 'Marca', [
    ['Marca', 'What does the exemplar mark?', 'O que o exemplar marca?', 'Diga que o exemplar marca o pico.', 'The exemplar marks the spike.', ['the exemplar marks the spike', 'that exemplar marks the spike'], 'The spike é o pico.'],
    ['Fecha', 'What should the exemplar do with the spike?', 'O que o exemplar deve fazer com o pico?', 'Peça para marcar o pico.', 'Please mark the spike.', ['please mark the spike', 'mark the spike'], 'Mark the spike é marcar o pico.']
  ]),
  cena('exemplar4', 'Exemplar quatro', '📌', 'B1', 'O exemplar marcou quatro picos.', 'Marca', [
    ['Marca', 'How many spikes did the exemplar mark?', 'Quantos picos o exemplar marcou?', 'Diga que o exemplar marcou quatro picos.', 'The exemplar marked four spikes.', ['the exemplar marked four spikes', 'the exemplar marked 4 spikes', 'that exemplar marked four spikes'], 'Four spikes é quatro picos.'],
    ['Fecha', 'Where should we cap the spikes?', 'Onde a gente limita os picos?', 'Peça para marcar quatro picos.', 'Please mark four spikes.', ['please mark four spikes', 'please mark 4 spikes', 'mark four spikes'], 'Mark four spikes é marcar quatro picos.']
  ]),
  cena('exemplarok', 'Exemplar no alvo', '📌', 'B1', 'O exemplar pode ficar.', 'Marca', [
    ['Marca', 'Can the exemplar stay?', 'O exemplar pode ficar?', 'Diga que o exemplar pode ficar.', 'The exemplar can stay.', ['the exemplar can stay', 'that exemplar can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this exemplar stay quiet?', 'Este exemplar pode ficar quieto?', 'Diga que este exemplar pode ficar quieto.', 'This exemplar can stay quiet.', ['this exemplar can stay quiet', 'that exemplar can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function otelPorId(id) {
  return OTELS.find(c => c.id === id) ?? null;
}

export function samplerPorId(id) {
  return SAMPLERS.find(c => c.id === id) ?? null;
}

export function exemplarPorId(id) {
  return EXEMPLARS.find(c => c.id === id) ?? null;
}

export function avaliarOtel(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSampler(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarExemplar(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
