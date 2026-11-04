// Rumor que espalha o estado, reparo que conserta na leitura e deixa que guarda a escrita.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const RUMORES = [
  {
    id: 'espalharumor',
    titulo: 'Espalho do rumor',
    emoji: '🗞️',
    nivel: 'A2',
    onde: 'Os nós espalham o estado de boca em boca.',
    rodadas: [
      fala(
        'Espalha',
        'How do the nodes share the state?',
        'Como os nós compartilham o estado?',
        'Diga que os nós espalham o estado de boca em boca.',
        'The nodes spread the state by rumor.',
        ['the nodes spread the state by rumor', 'those nodes spread the state by rumor'],
        'By rumor é de boca em boca.'
      ),
      fala(
        'Espera',
        'What should the nodes do?',
        'O que os nós devem fazer?',
        'Peça para espalhar o estado de boca em boca.',
        'Please spread the state by rumor.',
        ['please spread the state by rumor', 'spread the state by rumor'],
        'Spread the state é espalhar o estado.'
      )
    ]
  },
  {
    id: 'rumor2',
    titulo: 'Rumor dois',
    emoji: '🗞️',
    nivel: 'B1',
    onde: 'O rumor chegou a dois nós.',
    rodadas: [
      fala(
        'Espalha',
        'How many nodes did the rumor reach?',
        'A quantos nós o rumor chegou?',
        'Diga que o rumor chegou a dois nós.',
        'The rumor reached two nodes.',
        [
          'the rumor reached two nodes',
          'the rumor reached 2 nodes',
          'that rumor reached two nodes'
        ],
        'Two nodes é dois nós.'
      ),
      fala(
        'Espera',
        'Where should we cap the rumor?',
        'Onde a gente limita o rumor?',
        'Peça para alcançar dois nós.',
        'Please reach two nodes.',
        [
          'please reach two nodes',
          'please reach 2 nodes',
          'reach two nodes'
        ],
        'Reach two nodes é alcançar dois nós.'
      )
    ]
  },
  {
    id: 'rumorok',
    titulo: 'Rumor no alvo',
    emoji: '🗞️',
    nivel: 'B1',
    onde: 'O rumor pode ficar.',
    rodadas: [
      fala(
        'Espalha',
        'Can the rumor stay?',
        'O rumor pode ficar?',
        'Diga que o rumor pode ficar.',
        'The rumor can stay.',
        ['the rumor can stay', 'that rumor can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Espera',
        'Can this rumor stay open?',
        'Este rumor pode ficar aberto?',
        'Diga que este rumor pode ficar aberto.',
        'This rumor can stay open.',
        ['this rumor can stay open', 'that rumor can stay open'],
        'Stay open é ficar aberto.'
      )
    ]
  }
];

export const REPAROS = [
  {
    id: 'consertaleitura',
    titulo: 'Conserto do reparo',
    emoji: '🩹',
    nivel: 'A2',
    onde: 'A leitura conserta a cópia que ficou atrás.',
    rodadas: [
      fala(
        'Conserta',
        'What does the read fix?',
        'O que a leitura conserta?',
        'Diga que a leitura conserta a cópia antiga.',
        'The read repairs the old copy.',
        ['the read repairs the old copy', 'that read repairs the old copy'],
        'The old copy é a cópia antiga.'
      ),
      fala(
        'Segue',
        'What should the read do?',
        'O que a leitura deve fazer?',
        'Peça para consertar a cópia antiga.',
        'Please repair the old copy.',
        ['please repair the old copy', 'repair the old copy'],
        'Repair the old copy é consertar a cópia antiga.'
      )
    ]
  },
  {
    id: 'reparo3',
    titulo: 'Reparo três',
    emoji: '🩹',
    nivel: 'B1',
    onde: 'O reparo consertou três cópias.',
    rodadas: [
      fala(
        'Conserta',
        'How many copies did the repair fix?',
        'Quantas cópias o reparo consertou?',
        'Diga que o reparo consertou três cópias.',
        'The repair fixed three copies.',
        [
          'the repair fixed three copies',
          'the repair fixed 3 copies',
          'that repair fixed three copies'
        ],
        'Three copies é três cópias.'
      ),
      fala(
        'Segue',
        'Where should we cap the repair?',
        'Onde a gente limita o reparo?',
        'Peça para consertar três cópias.',
        'Please fix three copies.',
        [
          'please fix three copies',
          'please fix 3 copies',
          'fix three copies'
        ],
        'Fix three copies é consertar três cópias.'
      )
    ]
  },
  {
    id: 'reparook',
    titulo: 'Reparo no alvo',
    emoji: '🩹',
    nivel: 'B1',
    onde: 'O reparo pode ficar.',
    rodadas: [
      fala(
        'Conserta',
        'Can the repair stay?',
        'O reparo pode ficar?',
        'Diga que o reparo pode ficar.',
        'The repair can stay.',
        ['the repair can stay', 'that repair can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this repair stay quiet?',
        'Este reparo pode ficar quieto?',
        'Diga que este reparo pode ficar quieto.',
        'This repair can stay quiet.',
        ['this repair can stay quiet', 'that repair can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const DEIXAS = [
  {
    id: 'guardadeixa',
    titulo: 'Guarda da deixa',
    emoji: '🧳',
    nivel: 'A2',
    onde: 'O vizinho guarda a escrita até o dono voltar.',
    rodadas: [
      fala(
        'Guarda',
        'Who holds the write until the owner returns?',
        'Quem guarda a escrita até o dono voltar?',
        'Diga que o vizinho guarda a escrita até o dono voltar.',
        'The neighbor holds the write until the owner returns.',
        [
          'the neighbor holds the write until the owner returns',
          'that neighbor holds the write until the owner returns'
        ],
        'The neighbor é o vizinho.'
      ),
      fala(
        'Fecha',
        'What should the neighbor do?',
        'O que o vizinho deve fazer?',
        'Peça para guardar a escrita.',
        'Please hold the write.',
        ['please hold the write', 'hold the write'],
        'Hold the write é guardar a escrita.'
      )
    ]
  },
  {
    id: 'deixa4',
    titulo: 'Deixa quatro',
    emoji: '🧳',
    nivel: 'B1',
    onde: 'A deixa segurou quatro escritas.',
    rodadas: [
      fala(
        'Guarda',
        'How many writes did the hint hold?',
        'Quantas escritas a deixa segurou?',
        'Diga que a deixa segurou quatro escritas.',
        'The hint held four writes.',
        [
          'the hint held four writes',
          'the hint held 4 writes',
          'that hint held four writes'
        ],
        'Four writes é quatro escritas.'
      ),
      fala(
        'Fecha',
        'Where should we cap the hint?',
        'Onde a gente limita a deixa?',
        'Peça para segurar quatro escritas.',
        'Please hold four writes.',
        [
          'please hold four writes',
          'please hold 4 writes',
          'hold four writes'
        ],
        'Hold four writes é segurar quatro escritas.'
      )
    ]
  },
  {
    id: 'deixaok',
    titulo: 'Deixa no alvo',
    emoji: '🧳',
    nivel: 'B1',
    onde: 'A deixa pode ficar.',
    rodadas: [
      fala(
        'Guarda',
        'Can the hint stay?',
        'A deixa pode ficar?',
        'Diga que a deixa pode ficar.',
        'The hint can stay.',
        ['the hint can stay', 'that hint can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Fecha',
        'Can this hint stay closed?',
        'Esta deixa pode ficar fechada?',
        'Diga que esta deixa pode ficar fechada.',
        'This hint can stay closed.',
        ['this hint can stay closed', 'that hint can stay closed'],
        'Stay closed é ficar fechada.'
      )
    ]
  }
];

export function rumorPorId(id) {
  return RUMORES.find(c => c.id === id) ?? null;
}

export function reparoPorId(id) {
  return REPAROS.find(c => c.id === id) ?? null;
}

export function deixaPorId(id) {
  return DEIXAS.find(c => c.id === id) ?? null;
}

export function avaliarRumor(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarReparo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDeixa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
