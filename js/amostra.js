// Amostra de uma em dez, nicho da chave e lacre que muda no pacote.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const AMOSTRAS = [
  {
    id: 'umaemdez',
    titulo: 'Uma em dez',
    emoji: '🧫',
    nivel: 'A2',
    onde: 'Guardamos uma linha a cada dez.',
    rodadas: [
      fala(
        'Guarda',
        'How many lines did we keep?',
        'Quantas linhas a gente guardou?',
        'Diga que guardamos uma linha a cada dez.',
        'We kept one line out of every ten.',
        ['we kept one line out of every ten', 'we kept 1 line out of every ten'],
        'One line out of every ten é uma linha a cada dez.'
      ),
      fala(
        'Solta',
        'What should we store next?',
        'O que a gente guarda agora?',
        'Peça para guardar uma linha em dez.',
        'Please store one line out of ten.',
        ['please store one line out of ten', 'store one line out of ten'],
        'Store one line é guardar uma linha.'
      )
    ]
  },
  {
    id: 'amostra10',
    titulo: 'Amostra dez',
    emoji: '🧫',
    nivel: 'B1',
    onde: 'A amostra guardou dez linhas.',
    rodadas: [
      fala(
        'Guarda',
        'How many lines did the sample keep?',
        'Quantas linhas a amostra guardou?',
        'Diga que a amostra guardou dez linhas.',
        'The sample kept ten lines.',
        [
          'the sample kept ten lines',
          'the sample kept 10 lines',
          'that sample kept ten lines'
        ],
        'Ten lines é dez linhas.'
      ),
      fala(
        'Solta',
        'Where should we cap the sample?',
        'Onde a gente limita a amostra?',
        'Peça para limitar a amostra em dez linhas.',
        'Please cap the sample at ten lines.',
        [
          'please cap the sample at ten lines',
          'please cap the sample at 10 lines',
          'cap the sample at ten lines'
        ],
        'Cap the sample é limitar a amostra.'
      )
    ]
  },
  {
    id: 'amostraok',
    titulo: 'Amostra no alvo',
    emoji: '🧫',
    nivel: 'B1',
    onde: 'As outras linhas podem ficar de fora.',
    rodadas: [
      fala(
        'Guarda',
        'Can the other lines stay out?',
        'As outras linhas podem ficar de fora?',
        'Diga que as outras linhas podem ficar de fora.',
        'The other lines can stay out.',
        ['the other lines can stay out', 'those other lines can stay out'],
        'Stay out é ficar de fora.'
      ),
      fala(
        'Solta',
        'Can the sample stay small?',
        'A amostra pode ficar pequena?',
        'Diga que a amostra pode ficar pequena.',
        'The sample can stay small.',
        ['the sample can stay small', 'that sample can stay small'],
        'Stay small é ficar pequena.'
      )
    ]
  }
];

export const NICHOS = [
  {
    id: 'caionicho',
    titulo: 'Caiu no nicho',
    emoji: '🪺',
    nivel: 'A2',
    onde: 'A chave caiu no nicho dela.',
    rodadas: [
      fala(
        'Cai',
        'Where did the key land?',
        'Onde a chave caiu?',
        'Diga que a chave caiu no nicho dela.',
        'The key landed in its niche.',
        ['the key landed in its niche', 'that key landed in its niche'],
        'Its niche é o nicho dela.'
      ),
      fala(
        'Quieto',
        'What should the other niches do?',
        'O que os outros nichos fazem?',
        'Peça para deixar os outros nichos quietos.',
        'Please leave the other niches quiet.',
        ['please leave the other niches quiet', 'leave the other niches quiet'],
        'Leave quiet é deixar quieto.'
      )
    ]
  },
  {
    id: 'nicho3',
    titulo: 'Nicho três',
    emoji: '🪺',
    nivel: 'B1',
    onde: 'A chave caiu no nicho três.',
    rodadas: [
      fala(
        'Cai',
        'Which niche did the key land in?',
        'Em qual nicho a chave caiu?',
        'Diga que a chave caiu no nicho três.',
        'The key landed in niche three.',
        [
          'the key landed in niche three',
          'the key landed in niche 3',
          'that key landed in niche three'
        ],
        'Niche three é o nicho três.'
      ),
      fala(
        'Quieto',
        'Where should we cap the map?',
        'Onde a gente limita o mapa?',
        'Peça para limitar o mapa em três nichos.',
        'Please cap the map at three niches.',
        [
          'please cap the map at three niches',
          'please cap the map at 3 niches',
          'cap the map at three niches'
        ],
        'Three niches é três nichos.'
      )
    ]
  },
  {
    id: 'nichook',
    titulo: 'Nicho no alvo',
    emoji: '🪺',
    nivel: 'B1',
    onde: 'Os nichos quietos podem ficar.',
    rodadas: [
      fala(
        'Cai',
        'Can the quiet niches stay?',
        'Os nichos quietos podem ficar?',
        'Diga que os nichos quietos podem ficar.',
        'The quiet niches can stay.',
        ['the quiet niches can stay', 'those quiet niches can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Quieto',
        'Can this route stay on this niche?',
        'Este caminho pode ficar neste nicho?',
        'Diga que este caminho pode ficar neste nicho.',
        'This route can stay on this niche.',
        ['this route can stay on this niche', 'that route can stay on this niche'],
        'This niche é este nicho.'
      )
    ]
  }
];

export const LACRES = [
  {
    id: 'lacremudou',
    titulo: 'Lacre mudou',
    emoji: '🔒',
    nivel: 'A2',
    onde: 'O lacre do pacote mudou.',
    rodadas: [
      fala(
        'Muda',
        'What changed on the package?',
        'O que mudou no pacote?',
        'Diga que o lacre do pacote mudou.',
        'The seal on the package changed.',
        ['the seal on the package changed', 'that seal on the package changed'],
        'The seal é o lacre.'
      ),
      fala(
        'Sai',
        'What should we drop?',
        'O que a gente solta?',
        'Peça para soltar a cópia antiga.',
        'Please drop the old copy.',
        ['please drop the old copy', 'drop the old copy'],
        'The old copy é a cópia antiga.'
      )
    ]
  },
  {
    id: 'lacre2',
    titulo: 'Lacre dois',
    emoji: '🔒',
    nivel: 'B1',
    onde: 'O lacre mudou em dois pacotes.',
    rodadas: [
      fala(
        'Muda',
        'How many packages changed their seal?',
        'Quantos pacotes mudaram o lacre?',
        'Diga que o lacre mudou em dois pacotes.',
        'The seal changed on two packages.',
        [
          'the seal changed on two packages',
          'the seal changed on 2 packages',
          'that seal changed on two packages'
        ],
        'Two packages é dois pacotes.'
      ),
      fala(
        'Sai',
        'Where should we cap the seals?',
        'Onde a gente limita os lacres?',
        'Peça para limitar os lacres em dois pacotes.',
        'Please cap the seals at two packages.',
        [
          'please cap the seals at two packages',
          'please cap the seals at 2 packages',
          'cap the seals at two packages'
        ],
        'Cap the seals é limitar os lacres.'
      )
    ]
  },
  {
    id: 'lacreok',
    titulo: 'Lacre no alvo',
    emoji: '🔒',
    nivel: 'B1',
    onde: 'A cópia antiga saiu do cache.',
    rodadas: [
      fala(
        'Muda',
        'Did the old copy leave the cache?',
        'A cópia antiga saiu do cache?',
        'Diga que a cópia antiga saiu do cache.',
        'The old copy left the cache.',
        ['the old copy left the cache', 'that old copy left the cache'],
        'Left the cache é saiu do cache.'
      ),
      fala(
        'Sai',
        'Can the new seal stay?',
        'O lacre novo pode ficar?',
        'Diga que o lacre novo pode ficar.',
        'The new seal can stay.',
        ['the new seal can stay', 'that new seal can stay'],
        'Can stay é pode ficar.'
      )
    ]
  }
];

export function amostraPorId(id) {
  return AMOSTRAS.find(c => c.id === id) ?? null;
}

export function nichoPorId(id) {
  return NICHOS.find(c => c.id === id) ?? null;
}

export function lacrePorId(id) {
  return LACRES.find(c => c.id === id) ?? null;
}

export function avaliarAmostra(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarNicho(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLacre(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
