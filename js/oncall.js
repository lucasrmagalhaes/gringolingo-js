// Oncall que cobre o plantão, severity que marca o grau e incident que abre o caso.

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

export const ONCALLS = [
  cena('oncallbase', 'Cobre do oncall', '📟', 'A2', 'O oncall cobre o plantão.', 'Cobre', [
    ['Cobre', 'What does the oncall cover?', 'O que o oncall cobre?', 'Diga que o oncall cobre o plantão.', 'The oncall covers the shift.', ['the oncall covers the shift', 'that oncall covers the shift'], 'The shift é o plantão.'],
    ['Fecha', 'What should the oncall do with the shift?', 'O que o oncall deve fazer com o plantão?', 'Peça para cobrir o plantão.', 'Please cover the shift.', ['please cover the shift', 'cover the shift'], 'Cover the shift é cobrir o plantão.']
  ]),
  cena('oncall2', 'Oncall dois', '📟', 'B1', 'O oncall cobriu dois plantões.', 'Cobre', [
    ['Cobre', 'How many shifts did the oncall cover?', 'Quantos plantões o oncall cobriu?', 'Diga que o oncall cobriu dois plantões.', 'The oncall covered two shifts.', ['the oncall covered two shifts', 'the oncall covered 2 shifts', 'that oncall covered two shifts'], 'Two shifts é dois plantões.'],
    ['Fecha', 'Where should we cap the shifts?', 'Onde a gente limita os plantões?', 'Peça para cobrir dois plantões.', 'Please cover two shifts.', ['please cover two shifts', 'please cover 2 shifts', 'cover two shifts'], 'Cover two shifts é cobrir dois plantões.']
  ]),
  cena('oncallok', 'Oncall no alvo', '📟', 'B1', 'O oncall pode ficar.', 'Cobre', [
    ['Cobre', 'Can the oncall stay?', 'O oncall pode ficar?', 'Diga que o oncall pode ficar.', 'The oncall can stay.', ['the oncall can stay', 'that oncall can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this oncall stay quiet?', 'Este oncall pode ficar quieto?', 'Diga que este oncall pode ficar quieto.', 'This oncall can stay quiet.', ['this oncall can stay quiet', 'that oncall can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const SEVERITIES = [
  cena('severitybase', 'Marca da severity', '🚨', 'A2', 'O severity marca o grau.', 'Marca', [
    ['Marca', 'What does the severity mark?', 'O que o severity marca?', 'Diga que o severity marca o grau.', 'The severity marks the level.', ['the severity marks the level', 'that severity marks the level'], 'The level é o grau.'],
    ['Fecha', 'What should the severity do with the level?', 'O que o severity deve fazer com o grau?', 'Peça para marcar o grau.', 'Please mark the level.', ['please mark the level', 'mark the level'], 'Mark the level é marcar o grau.']
  ]),
  cena('severity3', 'Severity três', '🚨', 'B1', 'O severity marcou três graus.', 'Marca', [
    ['Marca', 'How many levels did the severity mark?', 'Quantos graus o severity marcou?', 'Diga que o severity marcou três graus.', 'The severity marked three levels.', ['the severity marked three levels', 'the severity marked 3 levels', 'that severity marked three levels'], 'Three levels é três graus.'],
    ['Fecha', 'Where should we cap the levels?', 'Onde a gente limita os graus?', 'Peça para marcar três graus.', 'Please mark three levels.', ['please mark three levels', 'please mark 3 levels', 'mark three levels'], 'Mark three levels é marcar três graus.']
  ]),
  cena('severityok', 'Severity no alvo', '🚨', 'B1', 'O severity pode ficar.', 'Marca', [
    ['Marca', 'Can the severity stay?', 'O severity pode ficar?', 'Diga que o severity pode ficar.', 'The severity can stay.', ['the severity can stay', 'that severity can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this severity stay quiet?', 'Este severity pode ficar quieto?', 'Diga que este severity pode ficar quieto.', 'This severity can stay quiet.', ['this severity can stay quiet', 'that severity can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const INCIDENTS = [
  cena('incidentbase', 'Abre do incident', '🧯', 'A2', 'O incident abre o caso.', 'Abre', [
    ['Abre', 'What does the incident open?', 'O que o incident abre?', 'Diga que o incident abre o caso.', 'The incident opens the case.', ['the incident opens the case', 'that incident opens the case'], 'The case é o caso.'],
    ['Fecha', 'What should the incident do with the case?', 'O que o incident deve fazer com o caso?', 'Peça para abrir o caso.', 'Please open the case.', ['please open the case', 'open the case'], 'Open the case é abrir o caso.']
  ]),
  cena('incident4', 'Incident quatro', '🧯', 'B1', 'O incident abriu quatro casos.', 'Abre', [
    ['Abre', 'How many cases did the incident open?', 'Quantos casos o incident abriu?', 'Diga que o incident abriu quatro casos.', 'The incident opened four cases.', ['the incident opened four cases', 'the incident opened 4 cases', 'that incident opened four cases'], 'Four cases é quatro casos.'],
    ['Fecha', 'Where should we cap the cases?', 'Onde a gente limita os casos?', 'Peça para abrir quatro casos.', 'Please open four cases.', ['please open four cases', 'please open 4 cases', 'open four cases'], 'Open four cases é abrir quatro casos.']
  ]),
  cena('incidentok', 'Incident no alvo', '🧯', 'B1', 'O incident pode ficar.', 'Abre', [
    ['Abre', 'Can the incident stay?', 'O incident pode ficar?', 'Diga que o incident pode ficar.', 'The incident can stay.', ['the incident can stay', 'that incident can stay'], 'Can stay é pode ficar.'],
    ['Fecha', 'Can this incident stay quiet?', 'Este incident pode ficar quieto?', 'Diga que este incident pode ficar quieto.', 'This incident can stay quiet.', ['this incident can stay quiet', 'that incident can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function oncallPorId(id) {
  return ONCALLS.find(c => c.id === id) ?? null;
}

export function severityPorId(id) {
  return SEVERITIES.find(c => c.id === id) ?? null;
}

export function incidentPorId(id) {
  return INCIDENTS.find(c => c.id === id) ?? null;
}

export function avaliarOncall(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSeverity(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarIncident(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
