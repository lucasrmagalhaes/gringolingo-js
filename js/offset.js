// Offset que marca a leitura, lag que fica atrás e ack que confirma o trecho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const OFFSETS = [
  {
    id: 'offsetuma',
    titulo: 'Uso do offset',
    emoji: '📏',
    nivel: 'A2',
    onde: 'O leitor marca até onde já leu.',
    rodadas: [
      fala(
        'Marca',
        'Where does the reader mark the place?',
        'Onde o leitor marca o lugar?',
        'Diga que o leitor marca até onde já leu.',
        'The reader marks how far it has read.',
        [
          'the reader marks how far it has read',
          'that reader marks how far it has read'
        ],
        'Marks how far é marca até onde já leu.'
      ),
      fala(
        'Segue',
        'What should the reader do?',
        'O que o leitor deve fazer?',
        'Peça para marcar até onde já leu.',
        'Please mark how far you have read.',
        ['please mark how far you have read', 'mark how far you have read'],
        'Mark how far é marcar até onde já leu.'
      )
    ]
  },
  {
    id: 'offset2',
    titulo: 'Offset dois',
    emoji: '📏',
    nivel: 'B1',
    onde: 'O offset marcou duas páginas.',
    rodadas: [
      fala(
        'Marca',
        'How many pages did the offset mark?',
        'Quantas páginas o offset marcou?',
        'Diga que o offset marcou duas páginas.',
        'The offset marked two pages.',
        [
          'the offset marked two pages',
          'the offset marked 2 pages',
          'that offset marked two pages'
        ],
        'Two pages é duas páginas.'
      ),
      fala(
        'Segue',
        'Where should we cap the pages?',
        'Onde a gente limita as páginas?',
        'Peça para marcar duas páginas.',
        'Please mark two pages.',
        ['please mark two pages', 'please mark 2 pages', 'mark two pages'],
        'Mark two pages é marcar duas páginas.'
      )
    ]
  },
  {
    id: 'offsetok',
    titulo: 'Offset no alvo',
    emoji: '📏',
    nivel: 'B1',
    onde: 'O offset pode ficar.',
    rodadas: [
      fala(
        'Marca',
        'Can the offset stay?',
        'O offset pode ficar?',
        'Diga que o offset pode ficar.',
        'The offset can stay.',
        ['the offset can stay', 'that offset can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this offset stay quiet?',
        'Este offset pode ficar quieto?',
        'Diga que este offset pode ficar quieto.',
        'This offset can stay quiet.',
        ['this offset can stay quiet', 'that offset can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const LAGS = [
  {
    id: 'lagbase',
    titulo: 'Atraso do lag',
    emoji: '🐢',
    nivel: 'A2',
    onde: 'O leitor fica atrás do escritor.',
    rodadas: [
      fala(
        'Atrasa',
        'Why is the reader late?',
        'Por que o leitor está atrasado?',
        'Diga que o leitor fica atrás do escritor.',
        'The reader stays behind the writer.',
        [
          'the reader stays behind the writer',
          'that reader stays behind the writer'
        ],
        'Stays behind é fica atrás.'
      ),
      fala(
        'Segue',
        'What should the reader do?',
        'O que o leitor deve fazer?',
        'Peça para ficar atrás do escritor.',
        'Please stay behind the writer.',
        ['please stay behind the writer', 'stay behind the writer'],
        'Stay behind é ficar atrás.'
      )
    ]
  },
  {
    id: 'lag3',
    titulo: 'Lag três',
    emoji: '🐢',
    nivel: 'B1',
    onde: 'O lag ficou três páginas atrás.',
    rodadas: [
      fala(
        'Atrasa',
        'How many pages is the lag behind?',
        'Quantas páginas o lag ficou atrás?',
        'Diga que o lag ficou três páginas atrás.',
        'The lag stayed three pages behind.',
        [
          'the lag stayed three pages behind',
          'the lag stayed 3 pages behind',
          'that lag stayed three pages behind'
        ],
        'Three pages é três páginas.'
      ),
      fala(
        'Segue',
        'Where should we cap the pages?',
        'Onde a gente limita as páginas?',
        'Peça para ficar três páginas atrás.',
        'Please stay three pages behind.',
        ['please stay three pages behind', 'please stay 3 pages behind', 'stay three pages behind'],
        'Stay three pages behind é ficar três páginas atrás.'
      )
    ]
  },
  {
    id: 'lagok',
    titulo: 'Lag no alvo',
    emoji: '🐢',
    nivel: 'B1',
    onde: 'O lag pode ficar.',
    rodadas: [
      fala(
        'Atrasa',
        'Can the lag stay?',
        'O lag pode ficar?',
        'Diga que o lag pode ficar.',
        'The lag can stay.',
        ['the lag can stay', 'that lag can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this lag stay quiet?',
        'Este lag pode ficar quieto?',
        'Diga que este lag pode ficar quieto.',
        'This lag can stay quiet.',
        ['this lag can stay quiet', 'that lag can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export const ACKS = [
  {
    id: 'ackbase',
    titulo: 'Confirmação do ack',
    emoji: '✅',
    nivel: 'A2',
    onde: 'O leitor confirma o trecho lido.',
    rodadas: [
      fala(
        'Confirma',
        'What does the reader confirm?',
        'O que o leitor confirma?',
        'Diga que o leitor confirma o trecho lido.',
        'The reader confirms the part it read.',
        [
          'the reader confirms the part it read',
          'that reader confirms the part it read'
        ],
        'Confirms the part é confirma o trecho.'
      ),
      fala(
        'Segue',
        'What should the reader do?',
        'O que o leitor deve fazer?',
        'Peça para confirmar o trecho lido.',
        'Please confirm the part you read.',
        ['please confirm the part you read', 'confirm the part you read'],
        'Confirm the part é confirmar o trecho.'
      )
    ]
  },
  {
    id: 'ack4',
    titulo: 'Ack quatro',
    emoji: '✅',
    nivel: 'B1',
    onde: 'O ack confirmou quatro trechos.',
    rodadas: [
      fala(
        'Confirma',
        'How many parts did the ack confirm?',
        'Quantos trechos o ack confirmou?',
        'Diga que o ack confirmou quatro trechos.',
        'The ack confirmed four parts.',
        [
          'the ack confirmed four parts',
          'the ack confirmed 4 parts',
          'that ack confirmed four parts'
        ],
        'Four parts é quatro trechos.'
      ),
      fala(
        'Segue',
        'Where should we cap the parts?',
        'Onde a gente limita os trechos?',
        'Peça para confirmar quatro trechos.',
        'Please confirm four parts.',
        ['please confirm four parts', 'please confirm 4 parts', 'confirm four parts'],
        'Confirm four parts é confirmar quatro trechos.'
      )
    ]
  },
  {
    id: 'ackok',
    titulo: 'Ack no alvo',
    emoji: '✅',
    nivel: 'B1',
    onde: 'O ack pode ficar.',
    rodadas: [
      fala(
        'Confirma',
        'Can the ack stay?',
        'O ack pode ficar?',
        'Diga que o ack pode ficar.',
        'The ack can stay.',
        ['the ack can stay', 'that ack can stay'],
        'Can stay é pode ficar.'
      ),
      fala(
        'Segue',
        'Can this ack stay quiet?',
        'Este ack pode ficar quieto?',
        'Diga que este ack pode ficar quieto.',
        'This ack can stay quiet.',
        ['this ack can stay quiet', 'that ack can stay quiet'],
        'Stay quiet é ficar quieto.'
      )
    ]
  }
];

export function offsetPorId(id) {
  return OFFSETS.find(c => c.id === id) ?? null;
}

export function lagPorId(id) {
  return LAGS.find(c => c.id === id) ?? null;
}

export function ackPorId(id) {
  return ACKS.find(c => c.id === id) ?? null;
}

export function avaliarOffset(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLag(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAck(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
