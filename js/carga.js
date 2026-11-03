// Teste de carga, nota da versão e dono da pasta.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CARGAS = [
  {
    id: 'dezminutos',
    titulo: 'Dez minutos',
    emoji: '🏋️',
    nivel: 'B1',
    onde: 'O teste de carga acabou de rodar.',
    rodadas: [
      fala(
        'Tempo',
        'How long did it run?',
        'Quanto tempo rodou?',
        'Diga que o teste de carga rodou por dez minutos.',
        'The load test ran for ten minutes.',
        [
          'the load test ran for ten minutes',
          'the load test ran for 10 minutes',
          'we ran the load test for ten minutes'
        ],
        'Load test é o teste de carga. Ten minutes é dez minutos.'
      ),
      fala(
        'Lugar',
        'Where did it run?',
        'Onde rodou?',
        'Diga que rodou numa cópia, não na produção.',
        'It ran on a copy, not on production.',
        [
          'it ran on a copy not on production',
          'it ran on a copy, not on production',
          'the test ran on a copy not on production'
        ],
        'A copy é uma cópia. Production é a produção.'
      )
    ]
  },
  {
    id: 'umporcento',
    titulo: 'Um por cento',
    emoji: '🏋️',
    nivel: 'B1',
    onde: 'O time quer o resultado do teste.',
    rodadas: [
      fala(
        'Tempo',
        'How many calls failed?',
        'Quantas chamadas falharam?',
        'Diga que a taxa de erro ficou abaixo de um por cento.',
        'The error rate stayed under one percent.',
        [
          'the error rate stayed under one percent',
          'the error rate stayed under 1 percent',
          'errors stayed under one percent'
        ],
        'Error rate é a taxa de erro. One percent é um por cento.'
      ),
      fala(
        'Lugar',
        'Did anyone wait too long?',
        'Alguém esperou demais?',
        'Diga que ninguém esperou mais de um segundo.',
        'Nobody waited more than one second.',
        [
          'nobody waited more than one second',
          'nobody waited more than 1 second',
          'no one waited more than one second'
        ],
        'Nobody é ninguém. One second é um segundo.'
      )
    ]
  },
  {
    id: 'quintateste',
    titulo: 'De novo na quinta',
    emoji: '🏋️',
    nivel: 'A2',
    onde: 'O teste precisa de outra rodada.',
    rodadas: [
      fala(
        'Tempo',
        'When do we run it again?',
        'Quando rodamos de novo?',
        'Diga que o teste de carga volta na quinta.',
        'The load test returns on Thursday.',
        [
          'the load test returns on thursday',
          'the load test runs again on thursday',
          'we run the load test again on thursday'
        ],
        'Returns é volta. Thursday é quinta.'
      ),
      fala(
        'Lugar',
        'Who reads the report?',
        'Quem lê o relatório?',
        'Diga que o relatório vai para o canal.',
        'The report goes to the channel.',
        [
          'the report goes to the channel',
          'the report goes to our channel',
          'this report goes to the channel'
        ],
        'Report é o relatório. Channel é o canal.'
      )
    ]
  }
];

export const BOLETINS = [
  {
    id: 'trescorrecoes',
    titulo: 'Três correções',
    emoji: '📰',
    nivel: 'B1',
    onde: 'A nota da versão está pronta.',
    rodadas: [
      fala(
        'Lista',
        'What is in the note?',
        'O que tem na nota?',
        'Diga que a nota lista três correções.',
        'The note lists three fixes.',
        [
          'the note lists three fixes',
          'the note lists 3 fixes',
          'this note lists three fixes'
        ],
        'Note é a nota. Three fixes são três correções.'
      ),
      fala(
        'Leitura',
        'Is there a new button?',
        'Tem botão novo?',
        'Diga que a nota não traz botão novo.',
        'The note adds no new button.',
        [
          'the note adds no new button',
          'this note adds no new button',
          'the note has no new button'
        ],
        'Adds no é não traz. New button é botão novo.'
      )
    ]
  },
  {
    id: 'notasegunda',
    titulo: 'Na segunda',
    emoji: '📰',
    nivel: 'A2',
    onde: 'As pessoas ainda não viram a nota.',
    rodadas: [
      fala(
        'Lista',
        'When do people see it?',
        'Quando as pessoas veem?',
        'Diga que as pessoas veem a nota na segunda.',
        'People see the note on Monday.',
        [
          'people see the note on monday',
          'users see the note on monday',
          'people will see the note on monday'
        ],
        'People é as pessoas. Monday é segunda.'
      ),
      fala(
        'Leitura',
        'Where is the note?',
        'Onde fica a nota?',
        'Diga que a nota fica no topo da página.',
        'The note sits at the top of the page.',
        [
          'the note sits at the top of the page',
          'the note is at the top of the page',
          'this note sits at the top of the page'
        ],
        'At the top é no topo. The page é a página.'
      )
    ]
  },
  {
    id: 'semquebra',
    titulo: 'Sem quebra',
    emoji: '📰',
    nivel: 'B2',
    onde: 'Um cliente pergunta se o app velho para.',
    rodadas: [
      fala(
        'Lista',
        'Will old apps break?',
        'Os apps velhos quebram?',
        'Diga que esta nota não quebra app velho.',
        'This note breaks no old app.',
        [
          'this note breaks no old app',
          'this note does not break old apps',
          'the note breaks no old app'
        ],
        'Breaks no é não quebra. Old app é o app velho.'
      ),
      fala(
        'Leitura',
        'What should clients do?',
        'O que os clientes fazem?',
        'Diga que os clientes não precisam mudar nada.',
        'Clients do not need to change anything.',
        [
          'clients do not need to change anything',
          'clients do not have to change anything',
          'the clients do not need to change anything'
        ],
        'Do not need é não precisam. Change anything é mudar nada.'
      )
    ]
  }
];

export const DONOS = [
  {
    id: 'doispasta',
    titulo: 'Dois donos',
    emoji: '🪪',
    nivel: 'B1',
    onde: 'A pasta do código tem gente marcada.',
    rodadas: [
      fala(
        'Pasta',
        'Who can approve this folder?',
        'Quem pode aprovar esta pasta?',
        'Diga que esta pasta tem dois donos.',
        'This folder has two owners.',
        [
          'this folder has two owners',
          'this folder has 2 owners',
          'the folder has two owners'
        ],
        'Folder é a pasta. Two owners são dois donos.'
      ),
      fala(
        'Merge',
        'Are you one of them?',
        'Você é um deles?',
        'Diga que você é um dos donos.',
        'I am one of the owners.',
        [
          'i am one of the owners',
          'i am one of the two owners',
          'i am one of the owners of this folder'
        ],
        'One of the owners é um dos donos.'
      )
    ]
  },
  {
    id: 'pedeum',
    titulo: 'Antes do merge',
    emoji: '🪪',
    nivel: 'B1',
    onde: 'Alguém quer publicar sem chamar o dono.',
    rodadas: [
      fala(
        'Pasta',
        'Can I merge now?',
        'Posso fazer merge agora?',
        'Diga para pedir a um dono antes do merge.',
        'Please ask an owner before the merge.',
        [
          'please ask an owner before the merge',
          'please ask one owner before the merge',
          'ask an owner before the merge'
        ],
        'Ask an owner é pedir a um dono. Before the merge é antes do merge.'
      ),
      fala(
        'Merge',
        'What if both are out?',
        'E se os dois estão fora?',
        'Diga que o merge espera a volta deles.',
        'The merge waits for their return.',
        [
          'the merge waits for their return',
          'the merge waits until they return',
          'this merge waits for their return'
        ],
        'Waits for é espera. Their return é a volta deles.'
      )
    ]
  },
  {
    id: 'euaprovo',
    titulo: 'Eu aprovo',
    emoji: '🪪',
    nivel: 'A2',
    onde: 'A mudança está na sua pasta.',
    rodadas: [
      fala(
        'Pasta',
        'Will you look at this change?',
        'Você olha esta mudança?',
        'Diga que pode aprovar esta pasta.',
        'I can approve this folder.',
        [
          'i can approve this folder',
          'i can approve this change',
          'i will approve this folder'
        ],
        'Approve é aprovar. This folder é esta pasta.'
      ),
      fala(
        'Merge',
        'When does the approval go out?',
        'Quando a aprovação sai?',
        'Diga que a aprovação sai hoje.',
        'The approval goes out today.',
        [
          'the approval goes out today',
          'my approval goes out today',
          'the approval will go out today'
        ],
        'Goes out today é sai hoje. Approval é a aprovação.'
      )
    ]
  }
];

export function cargaPorId(id) {
  return CARGAS.find(c => c.id === id) ?? null;
}

export function boletimPorId(id) {
  return BOLETINS.find(c => c.id === id) ?? null;
}

export function donoPorId(id) {
  return DONOS.find(c => c.id === id) ?? null;
}

export function avaliarCarga(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarBoletim(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDono(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
