// Entrevista longa, histórias no passado e escuta de números.
// A nota da fala usa o mesmo tutor das outras cenas. Tudo offline.

import { avaliarResposta } from './conversa.js';

export const ENTREVISTA = {
  id: 'remoto',
  nivel: 'B2',
  titulo: 'Entrevista longa',
  emoji: '🎤',
  onde: 'Uma vaga full stack, seis falas',
  rodadas: [
    {
      npc: { en: 'Tell me about yourself.', pt: 'Fala um pouco de você.' },
      missao: 'Diga que você é desenvolvedor full stack.',
      aceitas: ['i am a full stack developer', 'i am a fullstack developer', 'im a full stack developer'],
      melhor: 'I am a full stack developer.',
      dica: 'Full stack developer é quem mexe na tela e no servidor.'
    },
    {
      npc: { en: 'Tell me about a project you shipped.', pt: 'Conta um projeto que você entregou.' },
      missao: 'Diga que você construiu uma API em Node.',
      aceitas: ['i built an api in node', 'i built a node api', 'i have built an api in node'],
      melhor: 'I built an API in Node.',
      dica: 'Built é o passado de build. Shipped é entregou.'
    },
    {
      npc: { en: 'Tell me about a bug you fixed.', pt: 'Conta um bug que você corrigiu.' },
      missao: 'Diga que ontem você corrigiu o login.',
      aceitas: ['yesterday i fixed the login', 'i fixed the login yesterday', 'yesterday i fixed a bug in the login'],
      melhor: 'Yesterday I fixed the login.',
      dica: 'Yesterday abre o passado. Fixed the login é corrigi o login.'
    },
    {
      npc: { en: 'How do you work with a remote team?', pt: 'Como você trabalha com um time remoto?' },
      missao: 'Diga que você escreve updates curtos e pergunta quando trava.',
      aceitas: ['i write short updates and i ask when i am stuck', 'i write short updates and ask when i am stuck', 'i send short updates and i ask when i am stuck'],
      melhor: 'I write short updates and I ask when I am stuck.',
      dica: 'Short updates são recados curtos. Stuck é travado.'
    },
    {
      npc: { en: 'This function looks long. What would you do?', pt: 'Essa função está longa. O que você faria?' },
      missao: 'Sugira extrair uma função.',
      aceitas: ['i suggest we extract a function', 'we should extract a function', 'lets extract a function'],
      melhor: 'I suggest we extract a function.',
      dica: 'Suggest we é uma sugestão para o time. Extract a function é extrair uma função.'
    },
    {
      npc: { en: 'Do you have a question for me?', pt: 'Você tem uma pergunta para mim?' },
      missao: 'Pergunte como é uma semana normal.',
      aceitas: ['what does a normal week look like', 'what is a normal week like', 'how does a normal week look'],
      melhor: 'What does a normal week look like?',
      dica: 'A última fala é uma pergunta sua. What does abre a pergunta.'
    }
  ]
};

export function avaliarEntrevista(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export const CONTOS = [
  {
    id: 'trem', nivel: 'A2', titulo: 'O trem', emoji: '🚆',
    rodadas: [
      {
        npc: { en: 'What happened yesterday morning?', pt: 'O que aconteceu ontem de manhã?' },
        missao: 'Diga que ontem você perdeu o trem.',
        aceitas: ['yesterday i missed the train', 'i missed the train yesterday', 'yesterday i missed my train'],
        melhor: 'Yesterday I missed the train.',
        dica: 'Missed é perdeu. The train é o trem.'
      },
      {
        npc: { en: 'And then?', pt: 'E depois?' },
        missao: 'Diga que você pegou o próximo.',
        aceitas: ['i took the next one', 'then i took the next train', 'i caught the next one'],
        melhor: 'I took the next one.',
        dica: 'Took é o passado de take. The next one é o próximo.'
      }
    ]
  },
  {
    id: 'almoco', nivel: 'A2', titulo: 'O almoço', emoji: '🥪',
    rodadas: [
      {
        npc: { en: 'What did you do at noon?', pt: 'O que você fez ao meio-dia?' },
        missao: 'Diga que você ligou para um amigo.',
        aceitas: ['i called a friend', 'i called my friend', 'yesterday i called a friend'],
        melhor: 'I called a friend.',
        dica: 'Called é ligou. A friend é um amigo.'
      },
      {
        npc: { en: 'Nice. What happened next?', pt: 'Legal. O que veio depois?' },
        missao: 'Diga que vocês almoçaram juntos.',
        aceitas: ['we had lunch together', 'we ate lunch together', 'then we had lunch together'],
        melhor: 'We had lunch together.',
        dica: 'Had lunch é almoçou. Together é juntos.'
      }
    ]
  },
  {
    id: 'noite', nivel: 'B1', titulo: 'O bug de noite', emoji: '🌙',
    rodadas: [
      {
        npc: { en: 'What did you do last night?', pt: 'O que você fez ontem à noite?' },
        missao: 'Diga que ontem à noite você corrigiu um bug.',
        aceitas: ['last night i fixed a bug', 'i fixed a bug last night', 'yesterday night i fixed a bug'],
        melhor: 'Last night I fixed a bug.',
        dica: 'Last night é ontem à noite. Fixed a bug é corrigi um bug.'
      },
      {
        npc: { en: 'Did you send it?', pt: 'Você enviou?' },
        missao: 'Diga que de manhã você enviou a correção.',
        aceitas: ['this morning i pushed the fix', 'i pushed the fix this morning', 'in the morning i pushed the fix'],
        melhor: 'This morning I pushed the fix.',
        dica: 'Pushed the fix é enviou a correção. This morning é de manhã.'
      }
    ]
  },
  {
    id: 'mercado', nivel: 'A2', titulo: 'O mercado', emoji: '🛒',
    rodadas: [
      {
        npc: { en: 'Where did you go?', pt: 'Aonde você foi?' },
        missao: 'Diga que você foi ao mercado.',
        aceitas: ['i went to the market', 'yesterday i went to the market', 'i went to the store'],
        melhor: 'I went to the market.',
        dica: 'Went é o passado de go. The market é o mercado.'
      },
      {
        npc: { en: 'What did you buy?', pt: 'O que você comprou?' },
        missao: 'Diga que você comprou pão e café.',
        aceitas: ['i bought bread and coffee', 'i bought some bread and coffee', 'then i bought bread and coffee'],
        melhor: 'I bought bread and coffee.',
        dica: 'Bought é comprou. Bread é pão.'
      }
    ]
  }
];

export function contoPorId(id) {
  return CONTOS.find(c => c.id === id) ?? null;
}

export function avaliarConto(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarDeslize(item, texto) {
  return avaliarResposta({
    melhor: item?.en || '',
    aceitas: [],
    dica: 'Esta frase já escapou. Diga de novo, do começo ao fim.',
    missao: item?.pt || ''
  }, texto);
}

export const NUMEROS = [
  {
    id: 'cafe', nivel: 'A1', titulo: 'O preço do café', emoji: '☕',
    pergunta: 'Quanto custa o café?',
    fala: 'The coffee is fifteen dollars.',
    opcoes: ['fifty dollars', 'fifteen dollars', 'sixteen dollars'],
    certa: 1,
    dica: 'Fifteen é 15. Fifty é 50.'
  },
  {
    id: 'camisa', nivel: 'A2', titulo: 'A camisa', emoji: '👕',
    pergunta: 'Quanto custa a camisa?',
    fala: 'The shirt is forty nine dollars.',
    opcoes: ['forty nine dollars', 'forty five dollars', 'ninety four dollars'],
    certa: 0,
    dica: 'Forty nine é 49. Ninety four é 94.'
  },
  {
    id: 'marco', nivel: 'B1', titulo: 'A data da reunião', emoji: '📅',
    pergunta: 'Quando é a reunião?',
    fala: 'The meeting is on March third.',
    opcoes: ['May third', 'March thirteenth', 'March third'],
    certa: 2,
    dica: 'March é março. Third é dia 3. Thirteenth é dia 13.'
  },
  {
    id: 'sexta', nivel: 'A2', titulo: 'A hora da call', emoji: '🕑',
    pergunta: 'Quando vocês se falam?',
    fala: 'Let us meet on Friday at two.',
    opcoes: ['Thursday at two', 'Friday at two', 'Friday at ten'],
    certa: 1,
    dica: 'Friday é sexta. Two é duas. Ten é dez.'
  },
  {
    id: 'ingressos', nivel: 'A1', titulo: 'Os ingressos', emoji: '🎟️',
    pergunta: 'Quantos ingressos?',
    fala: 'I need three tickets.',
    opcoes: ['three tickets', 'thirteen tickets', 'two tickets'],
    certa: 0,
    dica: 'Three é 3. Thirteen é 13.'
  },
  {
    id: 'porcento', nivel: 'B1', titulo: 'O porcentual', emoji: '📊',
    pergunta: 'Em quantos casos o bug acontece?',
    fala: 'The bug happens in about twenty percent of cases.',
    opcoes: ['twelve percent', 'two percent', 'twenty percent'],
    certa: 2,
    dica: 'Twenty é 20. Twelve é 12.'
  },
  {
    id: 'hora', nivel: 'A2', titulo: 'O standup', emoji: '🕘',
    pergunta: 'A que horas é o standup?',
    fala: 'The standup is at nine thirty.',
    opcoes: ['ten thirty', 'nine thirty', 'nine thirteen'],
    certa: 1,
    dica: 'Nine thirty é 9 e 30. Nine thirteen é 9 e 13.'
  },
  {
    id: 'ano', nivel: 'B2', titulo: 'O ano', emoji: '📆',
    pergunta: 'Em que ano você começou?',
    fala: 'I started this job in twenty twenty four.',
    opcoes: ['twenty twenty four', 'twenty twenty', 'twenty fourteen'],
    certa: 0,
    dica: 'Twenty twenty four é 2024. Twenty fourteen é 2014.'
  }
];

export function numeroPorId(id) {
  return NUMEROS.find(item => item.id === id) ?? null;
}
