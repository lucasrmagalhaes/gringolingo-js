// Iterator que anda a chave, pager que carrega a página e evict que solta a página fria.

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

export const ITERATORS = [
  cena('iteratorbase', 'Anda do iterator', '🐾', 'A2', 'O iterator anda a chave.', 'Anda', [
    ['Anda', 'What does the iterator walk?', 'O que o iterator anda?', 'Diga que o iterator anda a chave.', 'The iterator walks the key.', ['the iterator walks the key', 'that iterator walks the key'], 'The key é a chave.'],
    ['Segue', 'What should the iterator do with the key?', 'O que o iterator deve fazer com a chave?', 'Peça para andar a chave.', 'Please walk the key.', ['please walk the key', 'walk the key'], 'Walk the key é andar a chave.']
  ]),
  cena('iterator2', 'Iterator dois', '🐾', 'B1', 'O iterator andou duas chaves.', 'Anda', [
    ['Anda', 'How many keys did the iterator walk?', 'Quantas chaves o iterator andou?', 'Diga que o iterator andou duas chaves.', 'The iterator walked two keys.', ['the iterator walked two keys', 'the iterator walked 2 keys', 'that iterator walked two keys'], 'Two keys é duas chaves.'],
    ['Segue', 'Where should we cap the keys?', 'Onde a gente limita as chaves?', 'Peça para andar duas chaves.', 'Please walk two keys.', ['please walk two keys', 'please walk 2 keys', 'walk two keys'], 'Walk two keys é andar duas chaves.']
  ]),
  cena('iteratorok', 'Iterator no alvo', '🐾', 'B1', 'O iterator pode ficar.', 'Anda', [
    ['Anda', 'Can the iterator stay?', 'O iterator pode ficar?', 'Diga que o iterator pode ficar.', 'The iterator can stay.', ['the iterator can stay', 'that iterator can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this iterator stay quiet?', 'Este iterator pode ficar quieto?', 'Diga que este iterator pode ficar quieto.', 'This iterator can stay quiet.', ['this iterator can stay quiet', 'that iterator can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const PAGERS = [
  cena('pagerbase', 'Carrega do pager', '📑', 'A2', 'O pager carrega a página.', 'Carrega', [
    ['Carrega', 'What does the pager load?', 'O que o pager carrega?', 'Diga que o pager carrega a página.', 'The pager loads the page.', ['the pager loads the page', 'that pager loads the page'], 'The page é a página.'],
    ['Segue', 'What should the pager do with the page?', 'O que o pager deve fazer com a página?', 'Peça para carregar a página.', 'Please load the page.', ['please load the page', 'load the page'], 'Load the page é carregar a página.']
  ]),
  cena('pager3', 'Pager três', '📑', 'B1', 'O pager carregou três páginas.', 'Carrega', [
    ['Carrega', 'How many pages did the pager load?', 'Quantas páginas o pager carregou?', 'Diga que o pager carregou três páginas.', 'The pager loaded three pages.', ['the pager loaded three pages', 'the pager loaded 3 pages', 'that pager loaded three pages'], 'Three pages é três páginas.'],
    ['Segue', 'Where should we cap the pages?', 'Onde a gente limita as páginas?', 'Peça para carregar três páginas.', 'Please load three pages.', ['please load three pages', 'please load 3 pages', 'load three pages'], 'Load three pages é carregar três páginas.']
  ]),
  cena('pagerok', 'Pager no alvo', '📑', 'B1', 'O pager pode ficar.', 'Carrega', [
    ['Carrega', 'Can the pager stay?', 'O pager pode ficar?', 'Diga que o pager pode ficar.', 'The pager can stay.', ['the pager can stay', 'that pager can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this pager stay quiet?', 'Este pager pode ficar quieto?', 'Diga que este pager pode ficar quieto.', 'This pager can stay quiet.', ['this pager can stay quiet', 'that pager can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export const EVICTS = [
  cena('evictbase', 'Solta do evict', '💨', 'A2', 'O evict solta a página fria.', 'Solta', [
    ['Solta', 'What does the evict drop?', 'O que o evict solta?', 'Diga que o evict solta a página fria.', 'The evict drops the cold page.', ['the evict drops the cold page', 'that evict drops the cold page'], 'The cold page é a página fria.'],
    ['Segue', 'What should the evict do with the cold page?', 'O que o evict deve fazer com a página fria?', 'Peça para soltar a página fria.', 'Please drop the cold page.', ['please drop the cold page', 'drop the cold page'], 'Drop the cold page é soltar a página fria.']
  ]),
  cena('evict4', 'Evict quatro', '💨', 'B1', 'O evict soltou quatro páginas frias.', 'Solta', [
    ['Solta', 'How many cold pages did the evict drop?', 'Quantas páginas frias o evict soltou?', 'Diga que o evict soltou quatro páginas frias.', 'The evict dropped four cold pages.', ['the evict dropped four cold pages', 'the evict dropped 4 cold pages', 'that evict dropped four cold pages'], 'Four cold pages é quatro páginas frias.'],
    ['Segue', 'Where should we cap the cold pages?', 'Onde a gente limita as páginas frias?', 'Peça para soltar quatro páginas frias.', 'Please drop four cold pages.', ['please drop four cold pages', 'please drop 4 cold pages', 'drop four cold pages'], 'Drop four cold pages é soltar quatro páginas frias.']
  ]),
  cena('evictok', 'Evict no alvo', '💨', 'B1', 'O evict pode ficar.', 'Solta', [
    ['Solta', 'Can the evict stay?', 'O evict pode ficar?', 'Diga que o evict pode ficar.', 'The evict can stay.', ['the evict can stay', 'that evict can stay'], 'Can stay é pode ficar.'],
    ['Segue', 'Can this evict stay quiet?', 'Este evict pode ficar quieto?', 'Diga que este evict pode ficar quieto.', 'This evict can stay quiet.', ['this evict can stay quiet', 'that evict can stay quiet'], 'Stay quiet é ficar quieto.']
  ])
];

export function iteratorPorId(id) {
  return ITERATORS.find(c => c.id === id) ?? null;
}

export function pagerPorId(id) {
  return PAGERS.find(c => c.id === id) ?? null;
}

export function evictPorId(id) {
  return EVICTS.find(c => c.id === id) ?? null;
}

export function avaliarIterator(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPager(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEvict(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
