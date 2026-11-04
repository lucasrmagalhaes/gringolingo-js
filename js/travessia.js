// Travessia que confirma no disco, retaguarda que espera no cache e contorno que pula o cache.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const TRAVESSIAS = [
  {
    id: 'cruzadisco',
    titulo: 'Confirmação da travessia',
    emoji: '🌉',
    nivel: 'A2',
    onde: 'O cache confirma a escrita no disco na hora.',
    rodadas: [
      fala(
        'Confirma',
        'When does the write reach the disk?',
        'Quando a escrita chega ao disco?',
        'Diga que a escrita chega ao disco na hora.',
        'The write reaches the disk at once.',
        ['the write reaches the disk at once', 'that write reaches the disk at once'],
        'At once é na hora.'
      ),
      fala(
        'Espera',
        'What should we do with the write?',
        'O que a gente faz com a escrita?',
        'Peça para confirmar a escrita no disco.',
        'Please confirm the write on disk.',
        ['please confirm the write on disk', 'confirm the write on disk'],
        'Confirm the write é confirmar a escrita.'
      )
    ]
  },
  {
    id: 'travessia2',
    titulo: 'Travessia dois',
    emoji: '🌉',
    nivel: 'B1',
    onde: 'A travessia gravou duas cópias.',
    rodadas: [
      fala(
        'Confirma',
        'How many copies did the write-through save?',
        'Quantas cópias a travessia gravou?',
        'Diga que a travessia gravou duas cópias.',
        'The write-through saved two copies.',
        [
          'the write-through saved two copies',
          'the write-through saved 2 copies',
          'that write-through saved two copies'
        ],
        'Two copies é duas cópias.'
      ),
      fala(
        'Espera',
        'Where should we cap the copies?',
        'Onde a gente limita as cópias?',
        'Peça para gravar duas cópias.',
        'Please save two copies.',
        [
          'please save two copies',
          'please save 2 copies',
          'save two copies'
        ],
        'Save two copies é gravar duas cópias.'
      )
    ]
  },
  {
    id: 'travessiaok',
    titulo: 'Travessia no alvo',
    emoji: '🌉',
    nivel: 'B1',
    onde: 'A travessia pode ficar.',
    rodadas: [
      fala(
        'Confirma',
        'Can the write-through stay?',
        'A travessia pode ficar?',
        'Diga que a travessia pode ficar.',
        'The write-through can stay.',
        ['the write-through can stay', 'that write-through can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Espera',
        'Can this copy stay open?',
        'Esta cópia pode ficar aberta?',
        'Diga que esta cópia pode ficar aberta.',
        'This copy can stay open.',
        ['this copy can stay open', 'that copy can stay open'],
        'Stay open é ficar aberta.'
      )
    ]
  }
];

export const RETAGUARDAS = [
  {
    id: 'sujache',
    titulo: 'Espera da retaguarda',
    emoji: '🗄️',
    nivel: 'A2',
    onde: 'A página suja espera no cache.',
    rodadas: [
      fala(
        'Segura',
        'Where does the dirty page wait?',
        'Onde a página suja espera?',
        'Diga que a página suja espera no cache.',
        'The dirty page waits in the cache.',
        ['the dirty page waits in the cache', 'that dirty page waits in the cache'],
        'The dirty page é a página suja.'
      ),
      fala(
        'Segue',
        'What should the dirty page do?',
        'O que a página suja deve fazer?',
        'Peça para a página suja esperar no cache.',
        'Please wait in the cache.',
        ['please wait in the cache', 'wait in the cache'],
        'Wait in the cache é esperar no cache.'
      )
    ]
  },
  {
    id: 'retaguarda3',
    titulo: 'Retaguarda três',
    emoji: '🗄️',
    nivel: 'B1',
    onde: 'O cache segurou três páginas sujas.',
    rodadas: [
      fala(
        'Segura',
        'How many dirty pages did the cache hold?',
        'Quantas páginas sujas o cache segurou?',
        'Diga que o cache segurou três páginas sujas.',
        'The cache held three dirty pages.',
        [
          'the cache held three dirty pages',
          'the cache held 3 dirty pages',
          'that cache held three dirty pages'
        ],
        'Three dirty pages é três páginas sujas.'
      ),
      fala(
        'Segue',
        'Where should we cap the dirty pages?',
        'Onde a gente limita as páginas sujas?',
        'Peça para segurar três páginas sujas.',
        'Please hold three dirty pages.',
        [
          'please hold three dirty pages',
          'please hold 3 dirty pages',
          'hold three dirty pages'
        ],
        'Hold three dirty pages é segurar três páginas sujas.'
      )
    ]
  },
  {
    id: 'retaguardaok',
    titulo: 'Retaguarda no alvo',
    emoji: '🗄️',
    nivel: 'B1',
    onde: 'A página suja pode ficar.',
    rodadas: [
      fala(
        'Segura',
        'Can the dirty page stay?',
        'A página suja pode ficar?',
        'Diga que a página suja pode ficar.',
        'The dirty page can stay.',
        ['the dirty page can stay', 'that dirty page can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this cache stay quiet?',
        'Este cache pode ficar quieto?',
        'Diga que este cache pode ficar quieto.',
        'This cache can stay quiet.',
        ['this cache can stay quiet', 'that cache can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const CONTORNOS = [
  {
    id: 'pulacache',
    titulo: 'Pulo do contorno',
    emoji: '➰',
    nivel: 'A2',
    onde: 'A escrita grande pula o cache.',
    rodadas: [
      fala(
        'Pula',
        'What does the large write skip?',
        'O que a escrita grande pula?',
        'Diga que a escrita grande pula o cache.',
        'The large write skips the cache.',
        ['the large write skips the cache', 'that large write skips the cache'],
        'Skips the cache é pula o cache.'
      ),
      fala(
        'Fecha',
        'What should the large write do?',
        'O que a escrita grande deve fazer?',
        'Peça para a escrita grande pular o cache.',
        'Please skip the cache.',
        ['please skip the cache', 'skip the cache'],
        'Skip the cache é pular o cache.'
      )
    ]
  },
  {
    id: 'contorno4',
    titulo: 'Contorno quatro',
    emoji: '➰',
    nivel: 'B1',
    onde: 'O contorno cobriu quatro escritas.',
    rodadas: [
      fala(
        'Pula',
        'How many writes did the bypass cover?',
        'Quantas escritas o contorno cobriu?',
        'Diga que o contorno cobriu quatro escritas.',
        'The bypass covered four writes.',
        [
          'the bypass covered four writes',
          'the bypass covered 4 writes',
          'that bypass covered four writes'
        ],
        'Four writes é quatro escritas.'
      ),
      fala(
        'Fecha',
        'Where should we cap the bypass?',
        'Onde a gente limita o contorno?',
        'Peça para cobrir quatro escritas.',
        'Please cover four writes.',
        [
          'please cover four writes',
          'please cover 4 writes',
          'cover four writes'
        ],
        'Cover four writes é cobrir quatro escritas.'
      )
    ]
  },
  {
    id: 'contornook',
    titulo: 'Contorno no alvo',
    emoji: '➰',
    nivel: 'B1',
    onde: 'O contorno pode ficar.',
    rodadas: [
      fala(
        'Pula',
        'Can the bypass stay?',
        'O contorno pode ficar?',
        'Diga que o contorno pode ficar.',
        'The bypass can stay.',
        ['the bypass can stay', 'that bypass can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this large write stay closed?',
        'Esta escrita grande pode ficar fechada?',
        'Diga que esta escrita grande pode ficar fechada.',
        'This large write can stay closed.',
        ['this large write can stay closed', 'that large write can stay closed'],
        'Stay closed é ficar fechada.'
      )
    ]
  }
];

export function travessiaPorId(id) {
  return TRAVESSIAS.find(c => c.id === id) ?? null;
}

export function retaguardaPorId(id) {
  return RETAGUARDAS.find(c => c.id === id) ?? null;
}

export function contornoPorId(id) {
  return CONTORNOS.find(c => c.id === id) ?? null;
}

export function avaliarTravessia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRetaguarda(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarContorno(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
