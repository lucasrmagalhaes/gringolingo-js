// Skew que entorta a chave, hotspot que esquenta a chave e tail que atrasa a chamada.

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

export const SKEWS = [
  cena('skewbase', 'Entorta do skew', '📏', 'A2', 'O skew entorta a chave.', 'Entorta', [
    ['Entorta', 'What does the skew tilt?', 'O que o skew entorta?', 'Diga que o skew entorta a chave.', 'The skew tilts the key.', ['the skew tilts the key', 'that skew tilts the key'], 'The key é a chave.'],
    ['Segue', 'What should the skew do with the key?', 'O que o skew deve fazer com a chave?', 'Peça para entortar a chave.', 'Please tilt the key.', ['please tilt the key', 'tilt the key'], 'Tilt the key é entortar a chave.']
  ]),
  cena('skew2', 'Skew dois', '📏', 'B1', 'O skew entortou duas chaves.', 'Entorta', [
    ['Entorta', 'How many keys did the skew tilt?', 'Quantas chaves o skew entortou?', 'Diga que o skew entortou duas chaves.', 'The skew tilted two keys.', ['the skew tilted two keys', 'the skew tilted 2 keys', 'that skew tilted two keys'], 'Two keys é duas chaves.'],
    ['Segue', 'Where should we cap the keys?', 'Onde a gente limita as chaves?', 'Peça para entortar duas chaves.', 'Please tilt two keys.', ['please tilt two keys', 'please tilt 2 keys', 'tilt two keys'], 'Tilt two keys é entortar duas chaves.']
  ]),
  cena('skewok', 'Skew no alvo', '📏', 'B1', 'O skew pode ficar.', 'Entorta', [
    ['Entorta', 'Can the skew stay?', 'O skew pode ficar?', 'Diga que o skew pode ficar.', 'The skew can stay.', ['the skew can stay', 'that skew can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this skew stay quiet?', 'Este skew pode ficar quieto?', 'Diga que este skew pode ficar quieto.', 'This skew can stay quiet.', ['this skew can stay quiet', 'that skew can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const HOTSPOTS = [
  cena('hotspotbase', 'Esquenta do hotspot', '🌶️', 'A2', 'O hotspot esquenta a chave.', 'Esquenta', [
    ['Esquenta', 'What does the hotspot heat?', 'O que o hotspot esquenta?', 'Diga que o hotspot esquenta a chave.', 'The hotspot heats the key.', ['the hotspot heats the key', 'that hotspot heats the key'], 'The key é a chave.'],
    ['Segue', 'What should the hotspot do with the key?', 'O que o hotspot deve fazer com a chave?', 'Peça para esquentar a chave.', 'Please heat the key.', ['please heat the key', 'heat the key'], 'Heat the key é esquentar a chave.']
  ]),
  cena('hotspot3', 'Hotspot três', '🌶️', 'B1', 'O hotspot esquentou três chaves.', 'Esquenta', [
    ['Esquenta', 'How many keys did the hotspot heat?', 'Quantas chaves o hotspot esquentou?', 'Diga que o hotspot esquentou três chaves.', 'The hotspot heated three keys.', ['the hotspot heated three keys', 'the hotspot heated 3 keys', 'that hotspot heated three keys'], 'Three keys é três chaves.'],
    ['Segue', 'Where should we cap the keys?', 'Onde a gente limita as chaves?', 'Peça para esquentar três chaves.', 'Please heat three keys.', ['please heat three keys', 'please heat 3 keys', 'heat three keys'], 'Heat three keys é esquentar três chaves.']
  ]),
  cena('hotspotok', 'Hotspot no alvo', '🌶️', 'B1', 'O hotspot pode ficar.', 'Esquenta', [
    ['Esquenta', 'Can the hotspot stay?', 'O hotspot pode ficar?', 'Diga que o hotspot pode ficar.', 'The hotspot can stay.', ['the hotspot can stay', 'that hotspot can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this hotspot stay quiet?', 'Este hotspot pode ficar quieto?', 'Diga que este hotspot pode ficar quieto.', 'This hotspot can stay quiet.', ['this hotspot can stay quiet', 'that hotspot can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const TAILS = [
  cena('tailbase', 'Atrasa do tail', '🐌', 'A2', 'O tail atrasa a chamada.', 'Atrasa', [
    ['Atrasa', 'What does the tail slow?', 'O que o tail atrasa?', 'Diga que o tail atrasa a chamada.', 'The tail slows the call.', ['the tail slows the call', 'that tail slows the call'], 'The call é a chamada.'],
    ['Segue', 'What should the tail do with the call?', 'O que o tail deve fazer com a chamada?', 'Peça para atrasar a chamada.', 'Please slow the call.', ['please slow the call', 'slow the call'], 'Slow the call é atrasar a chamada.']
  ]),
  cena('tail4', 'Tail quatro', '🐌', 'B1', 'O tail atrasou quatro chamadas.', 'Atrasa', [
    ['Atrasa', 'How many calls did the tail slow?', 'Quantas chamadas o tail atrasou?', 'Diga que o tail atrasou quatro chamadas.', 'The tail slowed four calls.', ['the tail slowed four calls', 'the tail slowed 4 calls', 'that tail slowed four calls'], 'Four calls é quatro chamadas.'],
    ['Segue', 'Where should we cap the calls?', 'Onde a gente limita as chamadas?', 'Peça para atrasar quatro chamadas.', 'Please slow four calls.', ['please slow four calls', 'please slow 4 calls', 'slow four calls'], 'Slow four calls é atrasar quatro chamadas.']
  ]),
  cena('tailok', 'Tail no alvo', '🐌', 'B1', 'O tail pode ficar.', 'Atrasa', [
    ['Atrasa', 'Can the tail stay?', 'O tail pode ficar?', 'Diga que o tail pode ficar.', 'The tail can stay.', ['the tail can stay', 'that tail can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this tail stay quiet?', 'Este tail pode ficar quieto?', 'Diga que este tail pode ficar quieto.', 'This tail can stay quiet.', ['this tail can stay quiet', 'that tail can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function skewPorId(id) {
  return SKEWS.find(c => c.id === id) ?? null;
}

export function hotspotPorId(id) {
  return HOTSPOTS.find(c => c.id === id) ?? null;
}

export function tailPorId(id) {
  return TAILS.find(c => c.id === id) ?? null;
}

export function avaliarSkew(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarHotspot(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarTail(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
