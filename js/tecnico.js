// Inglês de trabalho, idioms de reunião e a pergunta do dia.
// Tudo offline: a nota usa o mesmo tutor das outras cenas.

import { avaliarResposta } from './conversa.js';

export const CENAS_TECNICAS = [
  {
    id: 'standup', nivel: 'B1', titulo: 'Daily standup', emoji: '🗓️', onde: 'Reunião curta do time',
    rodadas: [
      {
        npc: { en: 'Good morning. What did you finish yesterday?', pt: 'Bom dia. O que você terminou ontem?' },
        missao: 'Diga que ontem você corrigiu o login.',
        aceitas: ['yesterday i fixed the login', 'i fixed the login yesterday', 'yesterday i fixed a bug in the login'],
        melhor: 'Yesterday I fixed the login.',
        dica: 'Yesterday abre o passado. Fixed the login é corrigi o login.'
      },
      {
        npc: { en: 'Thanks. Do you have any blockers?', pt: 'Obrigado. Tem algum bloqueio?' },
        missao: 'Diga que você espera a revisão do código.',
        aceitas: ['i am waiting for a code review', 'i am waiting for the code review', 'i am blocked on the code review'],
        melhor: 'I am waiting for a code review.',
        dica: 'Waiting for é esperando. Code review é a revisão do código.'
      }
    ]
  },
  {
    id: 'bug', nivel: 'B1', titulo: 'Explicar um bug', emoji: '🐛', onde: 'Uma conversa com o time',
    rodadas: [
      {
        npc: { en: 'What is going on with the checkout?', pt: 'O que está acontecendo no pagamento?' },
        missao: 'Diga que o botão de pagar falha quando o carrinho está vazio.',
        aceitas: ['the pay button fails when the cart is empty', 'the pay button crashes when the cart is empty', 'pay fails when the cart is empty'],
        melhor: 'The pay button fails when the cart is empty.',
        dica: 'Fails when diz quando a falha acontece. Cart é o carrinho.'
      },
      {
        npc: { en: 'Can you reproduce it?', pt: 'Você consegue reproduzir?' },
        missao: 'Diga que você consegue reproduzir no celular.',
        aceitas: ['i can reproduce it on mobile', 'i can reproduce it on my phone', 'yes i can reproduce it on mobile'],
        melhor: 'I can reproduce it on mobile.',
        dica: 'Reproduce é repetir o bug. On mobile é no celular.'
      }
    ]
  },
  {
    id: 'review', nivel: 'B2', titulo: 'Code review', emoji: '🔍', onde: 'Comentário num pull request',
    rodadas: [
      {
        npc: { en: 'I left a comment on your pull request.', pt: 'Deixei um comentário no seu pull request.' },
        missao: 'Pergunte por que a função ficou tão longa.',
        aceitas: ['why is this function so long', 'why is the function so long', 'why did this function get so long'],
        melhor: 'Why is this function so long?',
        dica: 'Why pergunta o motivo. Function é a função.'
      },
      {
        npc: { en: 'It handles three cases. What do you suggest?', pt: 'Ela trata três casos. O que você sugere?' },
        missao: 'Sugira extrair uma função.',
        aceitas: ['i suggest we extract a function', 'we should extract a function', 'lets extract a function'],
        melhor: 'I suggest we extract a function.',
        dica: 'Suggest we é uma sugestão para o time. Extract a function é extrair uma função.'
      }
    ]
  },
  {
    id: 'vaga', nivel: 'B2', titulo: 'Entrevista remota', emoji: '💻', onde: 'Uma vaga full stack',
    rodadas: [
      {
        npc: { en: 'Tell me about your last project.', pt: 'Me conta o seu último projeto.' },
        missao: 'Diga que você construiu uma API em Node.',
        aceitas: ['i built an api in node', 'i built a node api', 'i have built an api in node'],
        melhor: 'I built an API in Node.',
        dica: 'Built é o passado de build. API em Node é o exemplo de projeto.'
      },
      {
        npc: { en: 'How do you work with a remote team?', pt: 'Como você trabalha com um time remoto?' },
        missao: 'Diga que você escreve updates curtos e pergunta quando trava.',
        aceitas: ['i write short updates and i ask when i am stuck', 'i write short updates and ask when i am stuck', 'i send short updates and i ask when i am stuck'],
        melhor: 'I write short updates and I ask when I am stuck.',
        dica: 'Short updates são recados curtos. Stuck é travado, sem saber como seguir.'
      }
    ]
  },
  {
    id: 'demo', nivel: 'B2', titulo: 'Apresentar uma demo', emoji: '🖥️', onde: 'Você mostra o produto',
    rodadas: [
      {
        npc: { en: 'Ready when you are. What are we looking at?', pt: 'Pode começar. O que estamos vendo?' },
        missao: 'Diga que esta tela mostra o painel do usuário.',
        aceitas: ['this screen shows the user dashboard', 'this screen shows the dashboard', 'we are looking at the user dashboard'],
        melhor: 'This screen shows the user dashboard.',
        dica: 'This screen shows apresenta a tela. Dashboard é o painel.'
      },
      {
        npc: { en: 'What happens if I click save?', pt: 'O que acontece se eu clicar em salvar?' },
        missao: 'Diga que salvar manda os dados para a API.',
        aceitas: ['save sends the data to the api', 'it sends the data to the api', 'clicking save sends the data to the api'],
        melhor: 'Save sends the data to the API.',
        dica: 'Sends the data to diz para onde os dados vão.'
      }
    ]
  }
];

export function cenaTecnicaPorId(id) {
  return CENAS_TECNICAS.find(c => c.id === id) ?? null;
}

export function avaliarTecnico(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export const IDIOMAS = [
  {
    id: 'touch-base', nivel: 'A2', titulo: 'touch base', emoji: '👋',
    pt: 'Vamos nos falar amanhã.',
    uso: 'Touch base é um contato curto, não uma reunião longa.',
    aceitas: ['lets touch base tomorrow', 'let us touch base tomorrow', 'can we touch base tomorrow'],
    melhor: "Let's touch base tomorrow.",
    dica: 'Tomorrow é amanhã. Touch base não pede sala nem pauta.'
  },
  {
    id: 'heads-up', nivel: 'B1', titulo: 'heads up', emoji: '📢',
    pt: 'Só um aviso: o deploy é hoje.',
    uso: 'Heads up avisa antes, sem cobrar uma resposta longa.',
    aceitas: ['just a heads up the deploy is today', 'heads up the deploy is today', 'a heads up the deploy is today'],
    melhor: 'Just a heads up, the deploy is today.',
    dica: 'Deploy é a publicação. Heads up é o aviso.'
  },
  {
    id: 'circle-back', nivel: 'B1', titulo: 'circle back', emoji: '🔁',
    pt: 'Voltamos nisso depois do almoço.',
    uso: 'Circle back é retomar o assunto mais tarde.',
    aceitas: ['lets circle back after lunch', 'let us circle back after lunch', 'we can circle back after lunch'],
    melhor: "Let's circle back after lunch.",
    dica: 'After lunch é depois do almoço. Circle back não é voltar para a cadeira.'
  },
  {
    id: 'offline', nivel: 'B1', titulo: 'take this offline', emoji: '🔕',
    pt: 'Vamos tirar esse assunto da reunião.',
    uso: 'Take this offline tira um tema longo da call.',
    aceitas: ['lets take this offline', 'let us take this offline', 'can we take this offline'],
    melhor: "Let's take this offline.",
    dica: 'Offline aqui é fora da reunião, não sem internet.'
  },
  {
    id: 'loop-in', nivel: 'B1', titulo: 'loop in', emoji: '👥',
    pt: 'Você pode incluir a designer?',
    uso: 'Loop in é trazer uma pessoa para a conversa.',
    aceitas: ['can you loop in the designer', 'could you loop in the designer', 'please loop in the designer'],
    melhor: 'Can you loop in the designer?',
    dica: 'The designer é a pessoa. Loop in não é um laço de código.'
  },
  {
    id: 'ping', nivel: 'B1', titulo: 'ping me', emoji: '📨',
    pt: 'Me chama quando o build passar.',
    uso: 'Ping me pede um toque curto quando algo terminar.',
    aceitas: ['ping me when the build is green', 'ping me when the build passes', 'ping me when the build is passing'],
    melhor: 'Ping me when the build is green.',
    dica: 'Green é o build passando. Ping é chamar, não o comando de rede.'
  },
  {
    id: 'ballpark', nivel: 'B2', titulo: 'ballpark', emoji: '🎯',
    pt: 'Você tem uma estimativa aproximada?',
    uso: 'Ballpark é uma estimativa grosseira, não o número final.',
    aceitas: ['can you give me a ballpark', 'could you give me a ballpark', 'what is the ballpark'],
    melhor: 'Can you give me a ballpark?',
    dica: 'Give me a ballpark pede a ordem de grandeza.'
  },
  {
    id: 'bandwidth', nivel: 'B2', titulo: 'bandwidth', emoji: '⏳',
    pt: 'Hoje eu não tenho folga para isso.',
    uso: 'Bandwidth aqui é tempo livre, não a velocidade da rede.',
    aceitas: ['i do not have the bandwidth today', 'i dont have the bandwidth today', 'i do not have bandwidth today'],
    melhor: 'I do not have the bandwidth today.',
    dica: 'Do not have the bandwidth é não ter folga hoje.'
  },
  {
    id: 'async', nivel: 'B2', titulo: 'do this async', emoji: '💬',
    pt: 'Vamos resolver isso por mensagem, sem reunião.',
    uso: 'Async numa call significa seguir por escrito.',
    aceitas: ['lets do this async', 'let us do this async', 'we can do this async'],
    melhor: "Let's do this async.",
    dica: 'Async aqui não é a palavra do código. É sem uma reunião.'
  },
  {
    id: 'fruit', nivel: 'B2', titulo: 'low-hanging fruit', emoji: '🍎',
    pt: 'Vamos começar pelo que é fácil.',
    uso: 'Low-hanging fruit é o trabalho fácil e útil.',
    aceitas: ['lets start with the low hanging fruit', 'let us start with the low hanging fruit', 'we should start with the low hanging fruit'],
    melhor: "Let's start with the low-hanging fruit.",
    dica: 'Start with marca por onde começar. A fruta baixa é a tarefa fácil.'
  }
];

export function idiomaPorId(id) {
  return IDIOMAS.find(item => item.id === id) ?? null;
}

export function avaliarIdioma(item, texto) {
  return avaliarResposta(item, texto);
}

export const PERGUNTAS_DIA = [
  {
    id: 'ontem', nivel: 'B1', titulo: 'O que você entregou', emoji: '📦',
    rodadas: [
      {
        npc: { en: 'What did you ship yesterday?', pt: 'O que você entregou ontem?' },
        missao: 'Diga que ontem você entregou a correção.',
        aceitas: ['yesterday i shipped the fix', 'i shipped the fix yesterday', 'yesterday i shipped a fix'],
        melhor: 'Yesterday I shipped the fix.',
        dica: 'Shipped é entregou. The fix é a correção.'
      },
      {
        npc: { en: 'Nice. What is left for today?', pt: 'Legal. O que ficou para hoje?' },
        missao: 'Diga que hoje você abre o pull request.',
        aceitas: ['today i will open the pull request', 'today i am going to open the pull request', 'i will open the pull request today'],
        melhor: 'Today I will open the pull request.',
        dica: 'A pergunta seguinte pede o que vem agora. Will open é o plano.'
      }
    ]
  },
  {
    id: 'login', nivel: 'B1', titulo: 'O bug de hoje', emoji: '🐛',
    rodadas: [
      {
        npc: { en: 'Where is the bug?', pt: 'Onde está o bug?' },
        missao: 'Diga que o bug está no login.',
        aceitas: ['the bug is in the login', 'it is in the login', 'the bug is on the login page'],
        melhor: 'The bug is in the login.',
        dica: 'In the login marca o lugar. Bug é o erro.'
      },
      {
        npc: { en: 'What will you do next?', pt: 'O que você faz em seguida?' },
        missao: 'Diga que hoje você adiciona um teste.',
        aceitas: ['today i will add a test', 'i will add a test today', 'next i will add a test'],
        melhor: 'Today I will add a test.',
        dica: 'Add a test é acrescentar um teste.'
      }
    ]
  },
  {
    id: 'casa', nivel: 'A2', titulo: 'Trabalho remoto', emoji: '🏠',
    rodadas: [
      {
        npc: { en: 'Where are you working today?', pt: 'De onde você trabalha hoje?' },
        missao: 'Diga que você trabalha de casa.',
        aceitas: ['i work from home', 'i am working from home', 'today i work from home'],
        melhor: 'I work from home.',
        dica: 'From home é de casa.'
      },
      {
        npc: { en: 'How do you stay in touch?', pt: 'Como você mantém contato?' },
        missao: 'Diga que você fala com o time toda manhã.',
        aceitas: ['i talk to my team every morning', 'i speak to my team every morning', 'i talk with my team every morning'],
        melhor: 'I talk to my team every morning.',
        dica: 'Every morning é toda manhã. Team é o time.'
      }
    ]
  },
  {
    id: 'pr', nivel: 'B2', titulo: 'Revisão', emoji: '🔍',
    rodadas: [
      {
        npc: { en: 'What are you doing this morning?', pt: 'O que você está fazendo nesta manhã?' },
        missao: 'Diga que você está revisando um pull request.',
        aceitas: ['i am reviewing a pull request', 'i am reviewing the pull request', 'im reviewing a pull request'],
        melhor: 'I am reviewing a pull request.',
        dica: 'Reviewing é revisando. Pull request é o pedido de mudança.'
      },
      {
        npc: { en: 'What will you ask the author?', pt: 'O que você vai perguntar a quem escreveu?' },
        missao: 'Diga que você vai perguntar por que a função é tão longa.',
        aceitas: ['i will ask why the function is so long', 'i am going to ask why the function is so long', 'i will ask why this function is so long'],
        melhor: 'I will ask why the function is so long.',
        dica: 'Ask why junta a pergunta com o motivo.'
      }
    ]
  },
  {
    id: 'painel', nivel: 'B1', titulo: 'A demo', emoji: '🖥️',
    rodadas: [
      {
        npc: { en: 'What does this screen do?', pt: 'O que esta tela faz?' },
        missao: 'Diga que esta tela mostra o painel.',
        aceitas: ['this screen shows the dashboard', 'this screen shows the user dashboard', 'it shows the dashboard'],
        melhor: 'This screen shows the dashboard.',
        dica: 'Shows the dashboard é mostra o painel.'
      },
      {
        npc: { en: 'What comes next?', pt: 'O que vem depois?' },
        missao: 'Diga que em seguida você mostra o botão de salvar.',
        aceitas: ['next i will show the save button', 'then i will show the save button', 'i will show the save button next'],
        melhor: 'Next I will show the save button.',
        dica: 'Next marca o passo seguinte. Save button é o botão de salvar.'
      }
    ]
  },
  {
    id: 'stack', nivel: 'B2', titulo: 'Quem é você', emoji: '💻',
    rodadas: [
      {
        npc: { en: 'What do you do?', pt: 'No que você trabalha?' },
        missao: 'Diga que você é desenvolvedor full stack.',
        aceitas: ['i am a full stack developer', 'i am a fullstack developer', 'im a full stack developer'],
        melhor: 'I am a full stack developer.',
        dica: 'Full stack developer é quem mexe na tela e no servidor.'
      },
      {
        npc: { en: 'Tell me about one project.', pt: 'Conta um projeto.' },
        missao: 'Diga que você construiu uma API em Node.',
        aceitas: ['i built an api in node', 'i built a node api', 'i have built an api in node'],
        melhor: 'I built an API in Node.',
        dica: 'Built é o passado. Node é a plataforma do exemplo.'
      }
    ]
  },
  {
    id: 'trava', nivel: 'B1', titulo: 'Um bloqueio', emoji: '⛔',
    rodadas: [
      {
        npc: { en: 'Are you blocked?', pt: 'Você está travado?' },
        missao: 'Diga que você está travado na API.',
        aceitas: ['i am blocked on the api', 'i am blocked by the api', 'im blocked on the api'],
        melhor: 'I am blocked on the API.',
        dica: 'Blocked on é travado por causa de algo.'
      },
      {
        npc: { en: 'Who can help?', pt: 'Quem pode ajudar?' },
        missao: 'Diga que você vai chamar o time de backend.',
        aceitas: ['i will ping the backend team', 'i am going to ping the backend team', 'i will ask the backend team'],
        melhor: 'I will ping the backend team.',
        dica: 'Ping é chamar. Backend team é o time do servidor.'
      }
    ]
  },
  {
    id: 'oi', nivel: 'A2', titulo: 'Começo da call', emoji: '👋',
    rodadas: [
      {
        npc: { en: 'Hey. How are you?', pt: 'Oi. Como você está?' },
        missao: 'Diga que você está bem e agradeça.',
        aceitas: ['i am doing well thanks', 'i am good thanks', 'i am fine thank you'],
        melhor: 'I am doing well, thanks.',
        dica: 'Doing well é estar bem. Thanks agradece a pergunta.'
      },
      {
        npc: { en: 'Glad to hear it.', pt: 'Que bom.' },
        missao: 'Pergunte como a outra pessoa está.',
        aceitas: ['how about you', 'and you', 'how are you'],
        melhor: 'How about you?',
        dica: 'How about you devolve a pergunta.'
      }
    ]
  }
];

export function indiceDoDia(diaIso, total) {
  const texto = String(diaIso || '');
  let h = 0;
  for (let i = 0; i < texto.length; i++) h = (h * 33 + texto.charCodeAt(i)) >>> 0;
  if (!total) return 0;
  return h % total;
}

export function perguntaDoDia(diaIso) {
  return PERGUNTAS_DIA[indiceDoDia(diaIso, PERGUNTAS_DIA.length)];
}

export function avaliarDia(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
