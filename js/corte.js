// Squash antes do merge, circuito que abre e job da madrugada.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SQUASHES = [
  {
    id: 'trescommits',
    titulo: 'Três commits',
    emoji: '✂️',
    nivel: 'B1',
    onde: 'A branch tem commits demais para o review.',
    rodadas: [
      fala(
        'Commits',
        'How many commits should we keep?',
        'Quantos commits a gente deixa?',
        'Diga para juntar estes três commits.',
        'Please squash these three commits.',
        [
          'please squash these three commits',
          'please squash these 3 commits',
          'squash these three commits'
        ],
        'Squash é juntar commits. Three commits é três commits.'
      ),
      fala(
        'Merge',
        'When do we squash?',
        'Quando a gente junta?',
        'Diga que vai juntar antes do merge.',
        'I will squash before the merge.',
        [
          'i will squash before the merge',
          'i will squash before we merge',
          'i squash before the merge'
        ],
        'Before the merge é antes do merge.'
      )
    ]
  },
  {
    id: 'umso',
    titulo: 'Um só',
    emoji: '✂️',
    nivel: 'A2',
    onde: 'O histórico precisa ficar curto.',
    rodadas: [
      fala(
        'Commits',
        'What does the history look like?',
        'Como fica o histórico?',
        'Diga que o histórico fica em um commit.',
        'The history stays as one commit.',
        [
          'the history stays as one commit',
          'the history stays as 1 commit',
          'history stays as one commit'
        ],
        'History é o histórico. One commit é um commit.'
      ),
      fala(
        'Merge',
        'What does the reviewer read?',
        'O que a revisão lê?',
        'Diga que a revisão lê uma mensagem.',
        'The review reads one message.',
        [
          'the review reads one message',
          'the review reads 1 message',
          'the reviewer reads one message'
        ],
        'Review é a revisão. One message é uma mensagem.'
      )
    ]
  },
  {
    id: 'msgfix',
    titulo: 'A mensagem',
    emoji: '✂️',
    nivel: 'B1',
    onde: 'A mensagem do commit precisa citar o conserto.',
    rodadas: [
      fala(
        'Commits',
        'What does the message say?',
        'O que a mensagem diz?',
        'Diga que a mensagem cita o conserto do bug.',
        'The message names the bug fix.',
        [
          'the message names the bug fix',
          'the message names the bugfix',
          'this message names the bug fix'
        ],
        'Message é a mensagem. Bug fix é o conserto.'
      ),
      fala(
        'Merge',
        'When do you push?',
        'Quando você envia?',
        'Diga que vai enviar depois do squash.',
        'I will push after the squash.',
        [
          'i will push after the squash',
          'i will push after this squash',
          'i push after the squash'
        ],
        'Push é enviar. After the squash é depois de juntar.'
      )
    ]
  }
];

export const CIRCUITOS = [
  {
    id: 'cincoerros',
    titulo: 'Cinco erros',
    emoji: '🛑',
    nivel: 'A2',
    onde: 'O serviço começou a falhar seguido.',
    rodadas: [
      fala(
        'Abre',
        'When does the circuit open?',
        'Quando o circuito abre?',
        'Diga que o circuito abre depois de cinco erros.',
        'The circuit opens after five errors.',
        [
          'the circuit opens after five errors',
          'the circuit opens after 5 errors',
          'this circuit opens after five errors'
        ],
        'Circuit é o circuito. Five errors é cinco erros.'
      ),
      fala(
        'Fecha',
        'What happens to new calls?',
        'O que acontece com chamadas novas?',
        'Diga que chamadas novas falham na hora por um minuto.',
        'New calls fail fast for one minute.',
        [
          'new calls fail fast for one minute',
          'new calls fail fast for 1 minute',
          'new calls fail fast for a minute'
        ],
        'Fail fast é falhar na hora. One minute é um minuto.'
      )
    ]
  },
  {
    id: 'abertocirc',
    titulo: 'Ainda aberto',
    emoji: '🛑',
    nivel: 'B1',
    onde: 'O circuito continua aberto.',
    rodadas: [
      fala(
        'Abre',
        'How long does it stay open?',
        'Por quanto tempo ele fica aberto?',
        'Diga que o circuito fica aberto por um minuto.',
        'The circuit stays open for one minute.',
        [
          'the circuit stays open for one minute',
          'the circuit stays open for 1 minute',
          'this circuit stays open for one minute'
        ],
        'Stays open é fica aberto. One minute é um minuto.'
      ),
      fala(
        'Fecha',
        'What closes it?',
        'O que fecha?',
        'Diga que o circuito fecha depois de uma chamada boa.',
        'The circuit closes after a good call.',
        [
          'the circuit closes after a good call',
          'the circuit closes after one good call',
          'this circuit closes after a good call'
        ],
        'Closes é fecha. A good call é uma chamada boa.'
      )
    ]
  },
  {
    id: 'avisocirc',
    titulo: 'O aviso',
    emoji: '🛑',
    nivel: 'A2',
    onde: 'O time precisa saber que o circuito abriu.',
    rodadas: [
      fala(
        'Abre',
        'Who should know?',
        'Quem precisa saber?',
        'Diga que o circuito aberto avisa o time.',
        'The open circuit warns the team.',
        [
          'the open circuit warns the team',
          'an open circuit warns the team',
          'the open circuit warns our team'
        ],
        'Open circuit é o circuito aberto. Warns é avisa.'
      ),
      fala(
        'Fecha',
        'When will you look?',
        'Quando você olha?',
        'Diga que vai olhar o circuito de manhã.',
        'I will check the circuit in the morning.',
        [
          'i will check the circuit in the morning',
          'i will check the circuit tomorrow morning',
          'i will look at the circuit in the morning'
        ],
        'Check é olhar. In the morning é de manhã.'
      )
    ]
  }
];

export const JOBS = [
  {
    id: 'tresmanha',
    titulo: 'Três da manhã',
    emoji: '🌙',
    nivel: 'A2',
    onde: 'O job roda quando o time dorme.',
    rodadas: [
      fala(
        'Hora',
        'When does the job run?',
        'Quando o job roda?',
        'Diga que o job roda às três da manhã.',
        'The job runs at three in the morning.',
        [
          'the job runs at three in the morning',
          'the job runs at 3 in the morning',
          'this job runs at three in the morning'
        ],
        'Job é a tarefa agendada. Three in the morning é três da manhã.'
      ),
      fala(
        'Falha',
        'Did it work?',
        'Funcionou?',
        'Diga que falhou quatro noites seguidas.',
        'It failed four nights in a row.',
        [
          'it failed four nights in a row',
          'it failed 4 nights in a row',
          'this job failed four nights in a row'
        ],
        'Failed é falhou. Four nights in a row é quatro noites seguidas.'
      )
    ]
  },
  {
    id: 'cincohoras',
    titulo: 'Às cinco',
    emoji: '🌙',
    nivel: 'B1',
    onde: 'Três da manhã é cedo demais.',
    rodadas: [
      fala(
        'Hora',
        'Can we move it?',
        'Dá para mover?',
        'Diga que vai mover o job para as cinco.',
        'I will move the job to five.',
        [
          'i will move the job to five',
          'i will move the job to 5',
          'i will move this job to five'
        ],
        'Move é mover. Five é cinco.'
      ),
      fala(
        'Falha',
        'Why five?',
        'Por que cinco?',
        'Diga que cinco é depois da cópia da noite.',
        'Five is after the night copy.',
        [
          'five is after the night copy',
          '5 is after the night copy',
          'five comes after the night copy'
        ],
        'After é depois. Night copy é a cópia da noite.'
      )
    ]
  },
  {
    id: 'notafalha',
    titulo: 'A nota',
    emoji: '🌙',
    nivel: 'B1',
    onde: 'O job precisa avisar quando quebra.',
    rodadas: [
      fala(
        'Hora',
        'How do we hear about a failure?',
        'Como a gente fica sabendo da falha?',
        'Diga que o job manda uma nota quando falha.',
        'The job sends a note when it fails.',
        [
          'the job sends a note when it fails',
          'this job sends a note when it fails',
          'the job sends a note if it fails'
        ],
        'Sends a note é manda uma nota. When it fails é quando falha.'
      ),
      fala(
        'Falha',
        'When will you read it?',
        'Quando você lê?',
        'Diga que vai ler a nota de manhã.',
        'I will read that note in the morning.',
        [
          'i will read that note in the morning',
          'i will read the note in the morning',
          'i will read that note tomorrow morning'
        ],
        'Read é ler. In the morning é de manhã.'
      )
    ]
  }
];

export function squashPorId(id) {
  return SQUASHES.find(c => c.id === id) ?? null;
}

export function circuitoPorId(id) {
  return CIRCUITOS.find(c => c.id === id) ?? null;
}

export function jobPorId(id) {
  return JOBS.find(c => c.id === id) ?? null;
}

export function avaliarSquash(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCircuito(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarJob(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
