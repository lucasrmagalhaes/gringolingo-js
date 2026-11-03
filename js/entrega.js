// Canário de deploy, despedida de um caminho e evento que chega de novo.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CANARIOS = [
  {
    id: 'umamaquina',
    titulo: 'Uma máquina',
    emoji: '🐤',
    nivel: 'B1',
    onde: 'A versão nova não vai para todo mundo de uma vez.',
    rodadas: [
      fala(
        'Alvo',
        'Who gets the new version first?',
        'Quem recebe a versão nova primeiro?',
        'Diga que uma máquina recebe a versão antes.',
        'One server gets the version first.',
        [
          'one server gets the version first',
          '1 server gets the version first',
          'a single server gets the version first'
        ],
        'One server é uma máquina. First é primeiro.'
      ),
      fala(
        'Saúde',
        'How do we know it is safe?',
        'Como a gente sabe que está seguro?',
        'Diga que o canário está saudável.',
        'The canary looks healthy.',
        [
          'the canary looks healthy',
          'the canary is healthy',
          'our canary looks healthy'
        ],
        'Canary é o canário. Healthy é saudável.'
      )
    ]
  },
  {
    id: 'saudavel',
    titulo: 'Sinal verde',
    emoji: '🐤',
    nivel: 'B1',
    onde: 'O canário já rodou e o time quer o parecer.',
    rodadas: [
      fala(
        'Alvo',
        'Did the errors grow?',
        'Os erros cresceram?',
        'Diga que os erros ficaram iguais.',
        'The errors stayed the same.',
        [
          'the errors stayed the same',
          'the error count stayed the same',
          'errors stayed the same'
        ],
        'Stayed the same é ficaram iguais. Errors são os erros.'
      ),
      fala(
        'Saúde',
        'So what do we tell the channel?',
        'O que a gente avisa no canal?',
        'Diga que o canário passou.',
        'The canary passed.',
        [
          'the canary passed',
          'our canary passed',
          'the canary passed today'
        ],
        'Passed é passou. The canary é o canário.'
      )
    ]
  },
  {
    id: 'demais',
    titulo: 'O restante',
    emoji: '🐤',
    nivel: 'A2',
    onde: 'A primeira máquina aguentou a versão.',
    rodadas: [
      fala(
        'Alvo',
        'Can the rest get it?',
        'O resto pode receber?',
        'Diga que o restante recebe a versão amanhã.',
        'The rest gets the version tomorrow.',
        [
          'the rest gets the version tomorrow',
          'the other servers get the version tomorrow',
          'the rest get the version tomorrow'
        ],
        'The rest é o restante. Tomorrow é amanhã.'
      ),
      fala(
        'Saúde',
        'Who watches after that?',
        'Quem olha depois disso?',
        'Diga que o plantão olha por uma hora.',
        'The on call person watches for one hour.',
        [
          'the on call person watches for one hour',
          'the on call person watches for 1 hour',
          'on call watches for one hour'
        ],
        'On call é o plantão. One hour é uma hora.'
      )
    ]
  }
];

export const DESPEDIDAS = [
  {
    id: 'fimjunho',
    titulo: 'Fecha em junho',
    emoji: '📭',
    nivel: 'B1',
    onde: 'Um caminho antigo da API vai sair.',
    rodadas: [
      fala(
        'Data',
        'When does the old path end?',
        'Quando o caminho velho acaba?',
        'Diga que o caminho velho fecha em junho.',
        'The old path closes in June.',
        [
          'the old path closes in june',
          'the old endpoint closes in june',
          'this old path closes in june'
        ],
        'Old path é o caminho velho. June é junho.'
      ),
      fala(
        'Troca',
        'Is June the last day?',
        'Junho é o último dia?',
        'Diga que o último dia é 30 de junho.',
        'The last day is June thirtieth.',
        [
          'the last day is june thirtieth',
          'the last day is june 30',
          'the last day is the thirtieth of june'
        ],
        'Last day é o último dia. Thirtieth é dia 30.'
      )
    ]
  },
  {
    id: 'caminhov2',
    titulo: 'Versão dois',
    emoji: '📭',
    nivel: 'B1',
    onde: 'Os clientes ainda chamam o caminho antigo.',
    rodadas: [
      fala(
        'Data',
        'What should clients call?',
        'O que os clientes devem chamar?',
        'Diga para chamar a versão dois.',
        'Please call version two.',
        [
          'please call version two',
          'please call version 2',
          'please use version two'
        ],
        'Please call é chame. Version two é a versão dois.'
      ),
      fala(
        'Troca',
        'Where is the new path written?',
        'Onde o caminho novo está escrito?',
        'Diga que o caminho novo está no guia.',
        'The new path is in the guide.',
        [
          'the new path is in the guide',
          'the new path is in our guide',
          'the new endpoint is in the guide'
        ],
        'Guide é o guia. The new path é o caminho novo.'
      )
    ]
  },
  {
    id: 'avisoantigo',
    titulo: 'Aviso no velho',
    emoji: '📭',
    nivel: 'B2',
    onde: 'Quem ainda usa o caminho velho precisa de um sinal.',
    rodadas: [
      fala(
        'Data',
        'What does the old path say?',
        'O que o caminho velho responde?',
        'Diga que o caminho velho manda um aviso.',
        'The old path sends a warning.',
        [
          'the old path sends a warning',
          'the old path returns a warning',
          'the old endpoint sends a warning'
        ],
        'Sends a warning é manda um aviso. Old path é o caminho velho.'
      ),
      fala(
        'Troca',
        'Does the call still work?',
        'A chamada ainda funciona?',
        'Diga que ainda funciona, com o aviso.',
        'It still works, with the warning.',
        [
          'it still works with the warning',
          'it still works, with the warning',
          'the call still works with the warning'
        ],
        'Still works é ainda funciona. Warning é o aviso.'
      )
    ]
  }
];

export const REPETICOES = [
  {
    id: 'duasvezes',
    titulo: 'Duas vezes',
    emoji: '🪝',
    nivel: 'B1',
    onde: 'Um aviso de fora pode chegar de novo.',
    rodadas: [
      fala(
        'Chegada',
        'Can this event arrive again?',
        'Este evento pode chegar de novo?',
        'Diga que o mesmo evento pode chegar duas vezes.',
        'The same event can arrive twice.',
        [
          'the same event can arrive twice',
          'this event can arrive twice',
          'the same event may arrive twice'
        ],
        'Event é o evento. Twice é duas vezes.'
      ),
      fala(
        'Segunda',
        'Should we fear the second one?',
        'A segunda assusta?',
        'Diga que a segunda vez é esperada.',
        'The second time is expected.',
        [
          'the second time is expected',
          'a second time is expected',
          'the second arrival is expected'
        ],
        'Expected é esperada. The second time é a segunda vez.'
      )
    ]
  },
  {
    id: 'segundavez',
    titulo: 'Não muda',
    emoji: '🪝',
    nivel: 'B1',
    onde: 'O mesmo evento chegou outra vez.',
    rodadas: [
      fala(
        'Chegada',
        'What happens the second time?',
        'O que acontece na segunda vez?',
        'Diga que a segunda vez não muda nada.',
        'The second time changes nothing.',
        [
          'the second time changes nothing',
          'the second time does not change anything',
          'a second time changes nothing'
        ],
        'Changes nothing é não muda nada. Second time é a segunda vez.'
      ),
      fala(
        'Segunda',
        'Do we save it again?',
        'A gente grava de novo?',
        'Diga que a gravação fica como está.',
        'The saved row stays as it is.',
        [
          'the saved row stays as it is',
          'the saved row stays the same',
          'the row stays as it is'
        ],
        'Saved row é a linha gravada. Stays as it is é fica como está.'
      )
    ]
  },
  {
    id: 'horaextra',
    titulo: 'Mais uma hora',
    emoji: '🪝',
    nivel: 'A2',
    onde: 'A primeira entrega do evento falhou.',
    rodadas: [
      fala(
        'Chegada',
        'How long do we try again?',
        'Por quanto tempo tentamos de novo?',
        'Diga que a nova tentativa dura uma hora.',
        'We retry for one hour.',
        [
          'we retry for one hour',
          'we retry for 1 hour',
          'we will retry for one hour'
        ],
        'Retry é tentar de novo. One hour é uma hora.'
      ),
      fala(
        'Segunda',
        'What if the hour ends?',
        'E se a hora acabar?',
        'Diga que o evento vai para a fila de falha.',
        'The event goes to the failed queue.',
        [
          'the event goes to the failed queue',
          'the event goes to the failure queue',
          'this event goes to the failed queue'
        ],
        'Failed queue é a fila de falha. Goes to é vai para.'
      )
    ]
  }
];

export function canarioPorId(id) {
  return CANARIOS.find(c => c.id === id) ?? null;
}

export function despedidaPorId(id) {
  return DESPEDIDAS.find(c => c.id === id) ?? null;
}

export function repeticaoPorId(id) {
  return REPETICOES.find(c => c.id === id) ?? null;
}

export function avaliarCanario(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDespedida(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRepeticao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
