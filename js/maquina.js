// Processador no pico, cópia da noite e processo sem memória.
// Os dias com fala usam o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const CPUS = [
  {
    id: 'noventacpu',
    titulo: 'Noventa por cento',
    emoji: '🧮',
    nivel: 'A2',
    onde: 'O processador fica perto de noventa por cento.',
    rodadas: [
      fala(
        'Pico',
        'How busy is the CPU?',
        'O processador está quanto?',
        'Diga que o processador fica perto de noventa por cento.',
        'The CPU stays near ninety percent.',
        [
          'the cpu stays near ninety percent',
          'the cpu stays near 90 percent',
          'the processor stays near ninety percent'
        ],
        'CPU é o processador. Ninety percent é noventa por cento.'
      ),
      fala(
        'Calma',
        'Where do I look?',
        'Onde eu olho?',
        'Peça para olhar o pico.',
        'Please look at the peak.',
        [
          'please look at the peak',
          'look at the peak',
          'please look at that peak'
        ],
        'Peak é o pico.'
      )
    ]
  },
  {
    id: 'picocpu',
    titulo: 'O pico da manhã',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'O pico do processador foi de manhã.',
    rodadas: [
      fala(
        'Pico',
        'When was the peak?',
        'Quando foi o pico?',
        'Diga que o pico foi de manhã.',
        'The peak was this morning.',
        [
          'the peak was this morning',
          'that peak was this morning',
          'the peak was in the morning'
        ],
        'This morning é de manhã.'
      ),
      fala(
        'Calma',
        'Is it still high?',
        'Ainda está alto?',
        'Diga que o processador está calmo agora.',
        'The CPU is calm now.',
        [
          'the cpu is calm now',
          'the processor is calm now',
          'the cpu is calm'
        ],
        'Calm now é calmo agora.'
      )
    ]
  },
  {
    id: 'baixacpu',
    titulo: 'Olhar de novo',
    emoji: '🧮',
    nivel: 'B1',
    onde: 'Alguém vai olhar o processador outra vez.',
    rodadas: [
      fala(
        'Pico',
        'What will you check?',
        'O que você vai olhar?',
        'Diga que vai olhar o processador de novo.',
        'I will check the CPU again.',
        [
          'i will check the cpu again',
          'i will check the processor again',
          'i check the cpu again'
        ],
        'Check again é olhar de novo.'
      ),
      fala(
        'Calma',
        'Is the peak still there?',
        'O pico ainda está lá?',
        'Diga que o pico já passou.',
        'The peak is gone now.',
        [
          'the peak is gone now',
          'that peak is gone now',
          'the peak is gone'
        ],
        'Gone now é que já passou.'
      )
    ]
  }
];

export const COPIAS = [
  {
    id: 'duasnoites',
    titulo: 'Duas da noite',
    emoji: '💾',
    nivel: 'A2',
    onde: 'A cópia da noite começa às duas.',
    rodadas: [
      fala(
        'Noite',
        'When does the backup start?',
        'Quando a cópia começa?',
        'Diga que a cópia começa às duas.',
        'The backup starts at two.',
        [
          'the backup starts at two',
          'the backup starts at 2',
          'the nightly backup starts at two'
        ],
        'Backup é a cópia. At two é às duas.'
      ),
      fala(
        'Manhã',
        'When is it ready?',
        'Quando fica pronta?',
        'Diga que fica pronta de manhã.',
        'It is ready in the morning.',
        [
          'it is ready in the morning',
          'it is ready by morning',
          'the backup is ready in the morning'
        ],
        'In the morning é de manhã.'
      )
    ]
  },
  {
    id: 'prontacopia',
    titulo: 'Já está rodando',
    emoji: '💾',
    nivel: 'B1',
    onde: 'A cópia da noite já está rodando.',
    rodadas: [
      fala(
        'Noite',
        'Is the backup running?',
        'A cópia está rodando?',
        'Diga que a cópia da noite está rodando.',
        'The nightly backup is running.',
        [
          'the nightly backup is running',
          'the night backup is running',
          'the nightly backup is running now'
        ],
        'Nightly backup é a cópia da noite.'
      ),
      fala(
        'Manhã',
        'Can I use it now?',
        'Posso usar agora?',
        'Peça para esperar até de manhã.',
        'Please wait until morning.',
        [
          'please wait until morning',
          'wait until morning',
          'please wait until the morning'
        ],
        'Wait until morning é esperar até de manhã.'
      )
    ]
  },
  {
    id: 'semcopia',
    titulo: 'Sem cópia hoje',
    emoji: '💾',
    nivel: 'B1',
    onde: 'Não há cópia nesta noite.',
    rodadas: [
      fala(
        'Noite',
        'Is there a backup tonight?',
        'Tem cópia hoje à noite?',
        'Diga que não há cópia hoje à noite.',
        'There is no backup tonight.',
        [
          'there is no backup tonight',
          'there is no nightly backup',
          'we have no backup tonight'
        ],
        'No backup tonight é sem cópia hoje à noite.'
      ),
      fala(
        'Manhã',
        'What will you do?',
        'O que você vai fazer?',
        'Diga que vai começar uma às duas.',
        'I will start one at two.',
        [
          'i will start one at two',
          'i will start one at 2',
          'i start one at two'
        ],
        'Start one at two é começar uma às duas.'
      )
    ]
  }
];

export const ESTOUROS = [
  {
    id: 'semmemoria',
    titulo: 'Sem memória',
    emoji: '💥',
    nivel: 'A2',
    onde: 'O processo ficou sem memória.',
    rodadas: [
      fala(
        'Estouro',
        'What happened to the process?',
        'O que houve com o processo?',
        'Diga que o processo ficou sem memória.',
        'The process ran out of memory.',
        [
          'the process ran out of memory',
          'that process ran out of memory',
          'the process ran out of ram'
        ],
        'Ran out of memory é ficou sem memória.'
      ),
      fala(
        'Teto',
        'What should we change?',
        'O que a gente muda?',
        'Peça para subir o limite de memória.',
        'Please raise the memory limit.',
        [
          'please raise the memory limit',
          'raise the memory limit',
          'please raise that memory limit'
        ],
        'Memory limit é o limite de memória.'
      )
    ]
  },
  {
    id: 'sobelimite',
    titulo: 'Limite baixo',
    emoji: '💥',
    nivel: 'B1',
    onde: 'O limite de memória está baixo demais.',
    rodadas: [
      fala(
        'Estouro',
        'Why did it stop?',
        'Por que parou?',
        'Diga que o limite de memória está baixo demais.',
        'The memory limit is too low.',
        [
          'the memory limit is too low',
          'that memory limit is too low',
          'the memory limit is low'
        ],
        'Too low é baixo demais.'
      ),
      fala(
        'Teto',
        'What will you raise?',
        'O que você vai subir?',
        'Diga que vai subir esse limite.',
        'I will raise that limit.',
        [
          'i will raise that limit',
          'i will raise the memory limit',
          'i raise that limit'
        ],
        'Raise that limit é subir esse limite.'
      )
    ]
  },
  {
    id: 'voltoumem',
    titulo: 'Voltou',
    emoji: '💥',
    nivel: 'B1',
    onde: 'O processo voltou e a memória está livre.',
    rodadas: [
      fala(
        'Estouro',
        'Is the process back?',
        'O processo voltou?',
        'Diga que o processo voltou.',
        'The process is up again.',
        [
          'the process is up again',
          'that process is up again',
          'the process is back up'
        ],
        'Up again é voltou.'
      ),
      fala(
        'Teto',
        'How is the memory?',
        'Como está a memória?',
        'Diga que a memória está livre agora.',
        'Memory is free now.',
        [
          'memory is free now',
          'the memory is free now',
          'memory is free'
        ],
        'Free now é livre agora.'
      )
    ]
  }
];

export function cpuPorId(id) {
  return CPUS.find(c => c.id === id) ?? null;
}

export function copiaPorId(id) {
  return COPIAS.find(c => c.id === id) ?? null;
}

export function estouroPorId(id) {
  return ESTOUROS.find(c => c.id === id) ?? null;
}

export function avaliarCpu(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCopia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEstouro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
