// Por que a ferramenta falhou, mentoria de um júnior e saúde no exterior.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const FALHAS = [
  {
    id: 'build',
    titulo: 'O deploy',
    emoji: '🛠️',
    nivel: 'B1',
    onde: 'O deploy não saiu.',
    rodadas: [
      fala(
        'Sintoma',
        'What happened to the deploy?',
        'O que aconteceu com o deploy?',
        'Diga que o deploy falhou no passo dos testes.',
        'The deploy failed on the test step.',
        [
          'the deploy failed on the test step',
          'the deploy failed at the test step',
          'the deploy failed during the tests'
        ],
        'Deploy é a publicação. Test step é o passo dos testes.'
      ),
      fala(
        'Causa',
        'Why did the deploy stop?',
        'Por que o deploy parou?',
        'Diga que os testes falharam, então o deploy não começou.',
        'The tests failed, so the deploy did not start.',
        [
          'the tests failed so the deploy did not start',
          'the tests failed so the deploy never started',
          'tests failed so the deploy did not start'
        ],
        'Did not start é não começou. A causa vem depois do so.'
      )
    ]
  },
  {
    id: 'pipeline',
    titulo: 'O CI',
    emoji: '🛠️',
    nivel: 'B1',
    onde: 'O check da main está vermelho.',
    rodadas: [
      fala(
        'Sintoma',
        'What does the pipeline show?',
        'O que o pipeline mostra?',
        'Diga que o pipeline está vermelho na main.',
        'The pipeline is red on the main branch.',
        [
          'the pipeline is red on the main branch',
          'the pipeline is red on main',
          'the ci is red on the main branch'
        ],
        'Pipeline é a esteira. Red é vermelho, o check que falhou.'
      ),
      fala(
        'Causa',
        'Why is that check red?',
        'Por que esse check está vermelho?',
        'Diga que um teste ainda espera o texto antigo.',
        'One test still expects the old copy.',
        [
          'one test still expects the old copy',
          'a test still expects the old copy',
          'one test still expects the old text'
        ],
        'Expects é espera. Old copy é o texto antigo.'
      )
    ]
  },
  {
    id: 'token',
    titulo: 'A permissão',
    emoji: '🛠️',
    nivel: 'B1',
    onde: 'O envio foi recusado.',
    rodadas: [
      fala(
        'Sintoma',
        'What did the upload return?',
        'O que o envio devolveu?',
        'Diga que o envio falhou por falta de permissão.',
        'The upload failed with permission denied.',
        [
          'the upload failed with permission denied',
          'the upload failed because permission was denied',
          'upload failed with permission denied'
        ],
        'Upload é o envio. Permission denied é permissão negada.'
      ),
      fala(
        'Causa',
        'Why was the upload denied?',
        'Por que o envio foi negado?',
        'Diga que o token lê, mas não escreve.',
        'This token can read, but it cannot write.',
        [
          'this token can read but it cannot write',
          'the token can read but it cannot write',
          'this token can read but cannot write'
        ],
        'Token é a chave de acesso. Write é escrever.'
      )
    ]
  }
];

export const MENTORIAS = [
  {
    id: 'nomear',
    titulo: 'O nome',
    emoji: '🌱',
    nivel: 'A2',
    onde: 'A função se chama doStuff.',
    rodadas: [
      fala(
        'Dica',
        'What would you tell the junior about this name?',
        'O que você diria ao júnior sobre este nome?',
        'Diga para nomear a função pelo trabalho que ela faz.',
        'Name the function for the one job it does.',
        [
          'name the function for the one job it does',
          'name the function for the job it does',
          'name it for the one job it does'
        ],
        'Name é dê o nome. Job é o trabalho.'
      ),
      fala(
        'Ideia',
        'Why does the name matter?',
        'Por que o nome importa?',
        'Diga que um nome claro conta o trabalho para quem lê depois.',
        'A clear name tells the next reader the job.',
        [
          'a clear name tells the next reader the job',
          'a clear name tells the next reader what the job is',
          'the clear name tells the next reader the job'
        ],
        'Next reader é quem lê depois. Clear é claro.'
      )
    ]
  },
  {
    id: 'mostra',
    titulo: 'O teste',
    emoji: '🌱',
    nivel: 'B1',
    onde: 'O júnior não acha o bug.',
    rodadas: [
      fala(
        'Dica',
        'The junior cannot find the bug. What now?',
        'O júnior não acha o bug. E agora?',
        'Diga para escrever um teste que mostra o bug.',
        'Write one test that shows the bug.',
        [
          'write one test that shows the bug',
          'write a test that shows the bug',
          'write one test to show the bug'
        ],
        'Shows é mostra. One test é um teste só.'
      ),
      fala(
        'Ideia',
        'Why start with a test?',
        'Por que começar por um teste?',
        'Diga que o teste avisa quando o bug sumiu.',
        'The test tells you when the bug is gone.',
        [
          'the test tells you when the bug is gone',
          'the test tells you when the bug is fixed',
          'a test tells you when the bug is gone'
        ],
        'Gone é sumiu. O teste fica verde quando a correção funciona.'
      )
    ]
  },
  {
    id: 'pedaco',
    titulo: 'Um passo',
    emoji: '🌱',
    nivel: 'A2',
    onde: 'O júnior quer mudar cinco arquivos.',
    rodadas: [
      fala(
        'Dica',
        'The change touches five files. What do you suggest?',
        'A mudança mexe em cinco arquivos. O que você sugere?',
        'Diga para mudar um arquivo e rodar os testes.',
        'Change one file, then run the tests.',
        [
          'change one file then run the tests',
          'change one file and then run the tests',
          'change one file then run tests'
        ],
        'One file é um arquivo. Then é depois.'
      ),
      fala(
        'Ideia',
        'Why keep the change small?',
        'Por que deixar a mudança pequena?',
        'Diga que uma mudança pequena é mais fácil de desfazer.',
        'A small change is easier to undo.',
        [
          'a small change is easier to undo',
          'a small change is easier to revert',
          'small changes are easier to undo'
        ],
        'Undo é desfazer. Easier é mais fácil.'
      )
    ]
  }
];

export const SOCORROS = [
  {
    id: 'balcao',
    titulo: 'Na farmácia',
    emoji: '🩺',
    nivel: 'A2',
    onde: 'Você está no balcão, fora do Brasil.',
    rodadas: [
      fala(
        'Pedido',
        'Can I help you?',
        'Posso ajudar?',
        'Diga que precisa de algo para dor de garganta.',
        'I need something for a sore throat.',
        [
          'i need something for a sore throat',
          'i need something for my sore throat',
          'i need medicine for a sore throat'
        ],
        'Sore throat é dor de garganta. Something for é algo para.'
      ),
      fala(
        'Detalhe',
        'Do you have any allergies?',
        'Você tem alguma alergia?',
        'Diga que é alérgico a penicilina.',
        'I am allergic to penicillin.',
        [
          'i am allergic to penicillin',
          'yes i am allergic to penicillin',
          'i am allergic to penicillin medicine'
        ],
        'Allergic to é alérgico a. Penicillin é penicilina.'
      )
    ]
  },
  {
    id: 'febre',
    titulo: 'No consultório',
    emoji: '🩺',
    nivel: 'A2',
    onde: 'O médico pergunta como você está.',
    rodadas: [
      fala(
        'Pedido',
        'How long have you felt like this?',
        'Há quanto tempo você se sente assim?',
        'Diga que está com febre desde ontem.',
        'I have had a fever since yesterday.',
        [
          'i have had a fever since yesterday',
          'i have had a fever since last night',
          'i have had a fever from yesterday'
        ],
        'Fever é febre. Since yesterday é desde ontem.'
      ),
      fala(
        'Detalhe',
        'What else should I know?',
        'O que mais eu preciso saber?',
        'Diga que a garganta dói e você está cansado.',
        'My throat hurts and I feel tired.',
        [
          'my throat hurts and i feel tired',
          'my throat hurts and i am tired',
          'my throat hurts i feel tired'
        ],
        'Throat hurts é a garganta dói. Tired é cansado.'
      )
    ]
  },
  {
    id: 'urgente',
    titulo: 'A emergência',
    emoji: '🩺',
    nivel: 'B1',
    onde: 'Alguém precisa de ajuda agora.',
    rodadas: [
      fala(
        'Pedido',
        'What do you need?',
        'Do que você precisa?',
        'Peça para chamar uma ambulância.',
        'Please call an ambulance.',
        [
          'please call an ambulance',
          'please call the ambulance',
          'call an ambulance please'
        ],
        'Ambulance é ambulância. Please deixa o pedido educado.'
      ),
      fala(
        'Detalhe',
        'Tell me what you see.',
        'Me diga o que você vê.',
        'Diga que o seu amigo não consegue respirar.',
        'My friend cannot breathe.',
        [
          'my friend cannot breathe',
          'my friend can not breathe',
          'my friend cannot breathe well'
        ],
        'Cannot breathe é não consegue respirar.'
      )
    ]
  }
];

export function falhaPorId(id) {
  return FALHAS.find(c => c.id === id) ?? null;
}

export function mentoriaPorId(id) {
  return MENTORIAS.find(c => c.id === id) ?? null;
}

export function socorroPorId(id) {
  return SOCORROS.find(c => c.id === id) ?? null;
}

export function avaliarFalha(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMentoria(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSocorro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
