// Slo que marca a meta, sli que mede a meta e probe que testa a porta.

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

export const SLOS = [
  cena('slobase', 'Marca do slo', '🎯', 'A2', 'O slo marca a meta.', 'Marca', [
    ['Marca', 'What does the slo set?', 'O que o slo marca?', 'Diga que o slo marca a meta.', 'The slo sets the goal.', ['the slo sets the goal', 'that slo sets the goal'], 'The goal é a meta.'],
    ['Segue', 'What should the slo do with the goal?', 'O que o slo deve fazer com a meta?', 'Peça para marcar a meta.', 'Please set the goal.', ['please set the goal', 'set the goal'], 'Set the goal é marcar a meta.']
  ]),
  cena('slo2', 'Slo dois', '🎯', 'B1', 'O slo marcou duas metas.', 'Marca', [
    ['Marca', 'How many goals did the slo set?', 'Quantas metas o slo marcou?', 'Diga que o slo marcou duas metas.', 'The slo set two goals.', ['the slo set two goals', 'the slo set 2 goals', 'that slo set two goals'], 'Two goals é duas metas.'],
    ['Segue', 'Where should we cap the goals?', 'Onde a gente limita as metas?', 'Peça para marcar duas metas.', 'Please set two goals.', ['please set two goals', 'please set 2 goals', 'set two goals'], 'Set two goals é marcar duas metas.']
  ]),
  cena('slook', 'Slo no alvo', '🎯', 'B1', 'O slo pode ficar.', 'Marca', [
    ['Marca', 'Can the slo stay?', 'O slo pode ficar?', 'Diga que o slo pode ficar.', 'The slo can stay.', ['the slo can stay', 'that slo can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this slo stay quiet?', 'Este slo pode ficar quieto?', 'Diga que este slo pode ficar quieto.', 'This slo can stay quiet.', ['this slo can stay quiet', 'that slo can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const SLIS = [
  cena('slibase', 'Mede do sli', '📐', 'A2', 'O sli mede a meta.', 'Mede', [
    ['Mede', 'What does the sli measure?', 'O que o sli mede?', 'Diga que o sli mede a meta.', 'The sli measures the goal.', ['the sli measures the goal', 'that sli measures the goal'], 'The goal é a meta.'],
    ['Segue', 'What should the sli do with the goal?', 'O que o sli deve fazer com a meta?', 'Peça para medir a meta.', 'Please measure the goal.', ['please measure the goal', 'measure the goal'], 'Measure the goal é medir a meta.']
  ]),
  cena('sli3', 'Sli três', '📐', 'B1', 'O sli mediu três metas.', 'Mede', [
    ['Mede', 'How many goals did the sli measure?', 'Quantas metas o sli mediu?', 'Diga que o sli mediu três metas.', 'The sli measured three goals.', ['the sli measured three goals', 'the sli measured 3 goals', 'that sli measured three goals'], 'Three goals é três metas.'],
    ['Segue', 'Where should we cap the goals?', 'Onde a gente limita as metas?', 'Peça para medir três metas.', 'Please measure three goals.', ['please measure three goals', 'please measure 3 goals', 'measure three goals'], 'Measure three goals é medir três metas.']
  ]),
  cena('sliok', 'Sli no alvo', '📐', 'B1', 'O sli pode ficar.', 'Mede', [
    ['Mede', 'Can the sli stay?', 'O sli pode ficar?', 'Diga que o sli pode ficar.', 'The sli can stay.', ['the sli can stay', 'that sli can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this sli stay quiet?', 'Este sli pode ficar quieto?', 'Diga que este sli pode ficar quieto.', 'This sli can stay quiet.', ['this sli can stay quiet', 'that sli can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const PROBES = [
  cena('probebase', 'Testa do probe', '📡', 'A2', 'O probe testa a porta.', 'Testa', [
    ['Testa', 'What does the probe check?', 'O que o probe testa?', 'Diga que o probe testa a porta.', 'The probe checks the port.', ['the probe checks the port', 'that probe checks the port'], 'The port é a porta.'],
    ['Segue', 'What should the probe do with the port?', 'O que o probe deve fazer com a porta?', 'Peça para testar a porta.', 'Please check the port.', ['please check the port', 'check the port'], 'Check the port é testar a porta.']
  ]),
  cena('probe4', 'Probe quatro', '📡', 'B1', 'O probe testou quatro portas.', 'Testa', [
    ['Testa', 'How many ports did the probe check?', 'Quantas portas o probe testou?', 'Diga que o probe testou quatro portas.', 'The probe checked four ports.', ['the probe checked four ports', 'the probe checked 4 ports', 'that probe checked four ports'], 'Four ports é quatro portas.'],
    ['Segue', 'Where should we cap the ports?', 'Onde a gente limita as portas?', 'Peça para testar quatro portas.', 'Please check four ports.', ['please check four ports', 'please check 4 ports', 'check four ports'], 'Check four ports é testar quatro portas.']
  ]),
  cena('probeok', 'Probe no alvo', '📡', 'B1', 'O probe pode ficar.', 'Testa', [
    ['Testa', 'Can the probe stay?', 'O probe pode ficar?', 'Diga que o probe pode ficar.', 'The probe can stay.', ['the probe can stay', 'that probe can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this probe stay quiet?', 'Este probe pode ficar quieto?', 'Diga que este probe pode ficar quieto.', 'This probe can stay quiet.', ['this probe can stay quiet', 'that probe can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function sloPorId(id) {
  return SLOS.find(c => c.id === id) ?? null;
}

export function sliPorId(id) {
  return SLIS.find(c => c.id === id) ?? null;
}

export function probePorId(id) {
  return PROBES.find(c => c.id === id) ?? null;
}

export function avaliarSlo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSli(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarProbe(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
