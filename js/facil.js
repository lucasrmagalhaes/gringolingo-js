// Facilitar uma reunião, escolher a stack e falar do fim de semana.
// O treino surpresa sorteia um treino por dia com uma semente fixa. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const FACILS = [
  {
    id: 'abremeta',
    titulo: 'A meta',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'Você abre a reunião e diz a meta.',
    rodadas: [
      fala(
        'Abertura',
        'Shall we begin?',
        'Vamos começar?',
        'Diga para abrir pela meta.',
        'Let us open with the goal.',
        [
          'let us open with the goal',
          'let us open with the goal of this meeting',
          'let us open with our goal'
        ],
        'Open with the goal é abrir pela meta. Let us convida o grupo.'
      ),
      fala(
        'Fecho',
        'What is on the list?',
        'O que está na lista?',
        'Diga que hoje são três tópicos.',
        'We have three topics today.',
        [
          'we have three topics today',
          'we have 3 topics today',
          'we have three topics for today'
        ],
        'Topics são os tópicos. Three marca a quantidade.'
      )
    ]
  },
  {
    id: 'relogio5',
    titulo: 'O relógio',
    emoji: '🧭',
    nivel: 'B1',
    onde: 'O tempo da reunião está acabando.',
    rodadas: [
      fala(
        'Abertura',
        'How is the time?',
        'Como está o tempo?',
        'Diga que restam cinco minutos.',
        'We have five minutes left.',
        [
          'we have five minutes left',
          'we have 5 minutes left',
          'we have five minutes left today'
        ],
        'Five minutes left são cinco minutos restantes.'
      ),
      fala(
        'Fecho',
        'This topic is growing.',
        'Este tópico está crescendo.',
        'Diga para estacionar este e seguir.',
        'Let us park this and move on.',
        [
          'let us park this and move on',
          'let us park this topic and move on',
          'let us park it and move on'
        ],
        'Park this é deixar para depois. Move on é seguir em frente.'
      )
    ]
  },
  {
    id: 'donosexta',
    titulo: 'As ações',
    emoji: '🧭',
    nivel: 'B2',
    onde: 'A reunião fecha com donos.',
    rodadas: [
      fala(
        'Abertura',
        'Before we wrap up?',
        'Antes de encerrar?',
        'Diga que vai ler as ações antes de sair.',
        'I will read the actions before we leave.',
        [
          'i will read the actions before we leave',
          'i will read the actions before we go',
          'i will read the action items before we leave'
        ],
        'Actions são as ações. Before we leave é antes de sair.'
      ),
      fala(
        'Fecho',
        'Who takes the note?',
        'Quem fica com a nota?',
        'Diga que a Ana fica com a nota até sexta.',
        'Ana owns the note by Friday.',
        [
          'ana owns the note by friday',
          'ana owns the note by this friday',
          'ana owns this note by friday'
        ],
        'Owns é fica responsável. By Friday é até sexta.'
      )
    ]
  }
];

export const ESCOLHAS = [
  {
    id: 'reactvue',
    titulo: 'React ou Vue',
    emoji: '🧰',
    nivel: 'B1',
    onde: 'O projeto novo pede uma tela.',
    rodadas: [
      fala(
        'Escolha',
        'Which library should we use?',
        'Qual biblioteca a gente usa?',
        'Diga que começaria este app em React.',
        'I would start this app in React.',
        [
          'i would start this app in react',
          'i would start the app in react',
          'i would start this app with react'
        ],
        'Start this app é começar este app. React é a biblioteca.'
      ),
      fala(
        'Troca',
        'Why not the other one?',
        'Por que não a outra?',
        'Diga que Vue seria mais leve para este time.',
        'Vue would be lighter for this team.',
        [
          'vue would be lighter for this team',
          'vue would be lighter for the team',
          'vue would be lighter for our team'
        ],
        'Lighter é mais leve. This team é este time.'
      )
    ]
  },
  {
    id: 'sqldoc',
    titulo: 'SQL ou documento',
    emoji: '🧰',
    nivel: 'B2',
    onde: 'Os dados do projeto ainda não têm casa.',
    rodadas: [
      fala(
        'Escolha',
        'Where should this data live?',
        'Onde estes dados devem morar?',
        'Diga que SQL cabe nas relações destes dados.',
        'SQL fits the relations in this data.',
        [
          'sql fits the relations in this data',
          'sql fits the relations in the data',
          'sql fits these relations'
        ],
        'Fits é cabe. Relations são as relações entre os dados.'
      ),
      fala(
        'Troca',
        'What about a document store?',
        'E um banco de documentos?',
        'Diga que um banco de documentos cabe melhor neste formato.',
        'A document store fits this shape better.',
        [
          'a document store fits this shape better',
          'a document store fits the shape better',
          'the document store fits this shape better'
        ],
        'Document store é o banco de documentos. Shape é o formato.'
      )
    ]
  },
  {
    id: 'tipoforte',
    titulo: 'O tipo',
    emoji: '🧰',
    nivel: 'B1',
    onde: 'O projeto novo pede uma linguagem.',
    rodadas: [
      fala(
        'Escolha',
        'Will this project use types?',
        'Este projeto vai usar tipos?',
        'Diga que usaria TypeScript neste projeto.',
        'I would use TypeScript on this project.',
        [
          'i would use typescript on this project',
          'i would use typescript for this project',
          'i would use typescript on the project'
        ],
        'TypeScript é a linguagem com tipos. On this project é neste projeto.'
      ),
      fala(
        'Troca',
        'Is that too much for a script?',
        'Isso é demais para um script?',
        'Diga que JavaScript puro basta para este script.',
        'Plain JavaScript is enough for this script.',
        [
          'plain javascript is enough for this script',
          'plain javascript is enough for the script',
          'javascript is enough for this script'
        ],
        'Plain JavaScript é JavaScript puro. Enough é o bastante.'
      )
    ]
  }
];

export const SABADOS = [
  {
    id: 'trilhafds',
    titulo: 'A trilha',
    emoji: '🌦️',
    nivel: 'A2',
    onde: 'Alguém pergunta o que você fez no sábado.',
    rodadas: [
      fala(
        'Feito',
        'What did you do on Saturday?',
        'O que você fez no sábado?',
        'Diga que foi fazer trilha no sábado.',
        'I went hiking on Saturday.',
        [
          'i went hiking on saturday',
          'i went for a hike on saturday',
          'i went hiking this saturday'
        ],
        'Hiking é trilha. On Saturday é no sábado.'
      ),
      fala(
        'Plano',
        'How was the path?',
        'Como foi o caminho?',
        'Diga que a trilha estava quieta.',
        'The trail was quiet.',
        [
          'the trail was quiet',
          'the trail was calm',
          'it was a quiet trail'
        ],
        'Trail é a trilha. Quiet é quieta, com pouca gente.'
      )
    ]
  },
  {
    id: 'domingolento',
    titulo: 'O domingo',
    emoji: '🌦️',
    nivel: 'A2',
    onde: 'O domingo ainda está aberto.',
    rodadas: [
      fala(
        'Feito',
        'Any plan for Sunday?',
        'Tem plano para o domingo?',
        'Diga que planeja cozinhar no domingo.',
        'I plan to cook on Sunday.',
        [
          'i plan to cook on sunday',
          'i plan to cook this sunday',
          'i will cook on sunday'
        ],
        'Plan to cook é planejar cozinhar. On Sunday é no domingo.'
      ),
      fala(
        'Plano',
        'Will it be a busy day?',
        'Vai ser um dia cheio?',
        'Diga que quer uma manhã lenta.',
        'I want a slow morning.',
        [
          'i want a slow morning',
          'i want a slow morning on sunday',
          'i would like a slow morning'
        ],
        'A slow morning é uma manhã sem pressa.'
      )
    ]
  },
  {
    id: 'cineminha',
    titulo: 'O filme',
    emoji: '🌦️',
    nivel: 'A2',
    onde: 'A noite ainda não tem compromisso.',
    rodadas: [
      fala(
        'Feito',
        'What about tonight?',
        'E hoje à noite?',
        'Diga que talvez veja um filme hoje à noite.',
        'I might see a film tonight.',
        [
          'i might see a film tonight',
          'i might see a movie tonight',
          'i may see a film tonight'
        ],
        'Might é talvez. A film tonight é um filme hoje à noite.'
      ),
      fala(
        'Plano',
        'Is the weekend packed?',
        'O fim de semana está lotado?',
        'Diga que ainda não tem planos grandes.',
        'I have no big plans yet.',
        [
          'i have no big plans yet',
          'i do not have big plans yet',
          'i have no big plans'
        ],
        'No big plans é sem planos grandes. Yet é por enquanto.'
      )
    ]
  }
];

export function facilPorId(id) {
  return FACILS.find(c => c.id === id) ?? null;
}

export function escolhaPorId(id) {
  return ESCOLHAS.find(c => c.id === id) ?? null;
}

export function sabadoPorId(id) {
  return SABADOS.find(c => c.id === id) ?? null;
}

export function avaliarFacil(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEscolhaStack(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarSabado(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

const FORA_SURPRESA = new Set(['surpresa', 'desafio', 'nivel', 'resumo', 'mes']);

export function poolSurpresa(treinos) {
  return (Array.isArray(treinos) ? treinos : []).filter(t => t && t.id && t.stat && !FORA_SURPRESA.has(t.id));
}

export function treinoDoDia(treinos, diaIso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(diaIso || ''))) return null;
  const pool = poolSurpresa(treinos);
  if (!pool.length) return null;
  let h = 2166136261;
  const s = `surpresa:${diaIso}`;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return pool[(h >>> 0) % pool.length];
}

export function textoDaSurpresa(treino, info = {}) {
  const seq = Number(info.sequencia) || 0;
  const dias = `${seq} ${seq === 1 ? 'dia' : 'dias'}`;
  if (!treino) return `Não há treino surpresa nesta data. Sequência surpresa: ${dias}.`;
  if (info.feito) return `Você já fez o treino de hoje: ${treino.titulo}. Sequência surpresa: ${dias}.`;
  return `O treino de hoje é ${treino.titulo}. Sequência surpresa: ${dias}.`;
}

export function textoDoRecorde(n) {
  const v = Number(n) || 0;
  return `Recorde da surpresa: ${v} ${v === 1 ? 'dia' : 'dias'}.`;
}
