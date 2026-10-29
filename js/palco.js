// Demo de um minuto, prazo, entrevista STAR e ênfase.
// A nota usa o mesmo tutor das outras cenas. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

export const SEGUNDOS_DEMO = 60;

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica, segundos) {
  const rodada = {
    etapa,
    npc: { en: npcEn, pt: npcPt },
    missao,
    melhor,
    aceitas,
    dica
  };
  if (segundos) rodada.segundos = segundos;
  return rodada;
}

export const DEMOS = [
  {
    id: 'modo',
    titulo: 'Modo offline',
    emoji: '🎬',
    nivel: 'B1',
    onde: 'Um minuto sobre o modo offline, e duas perguntas.',
    rodadas: [
      fala(
        'Um minuto',
        'You have one minute. What are we looking at?',
        'Você tem um minuto. O que estamos vendo?',
        'Apresente o modo offline.',
        'Today I will show offline mode.',
        [
          'today i will show offline mode',
          'today i am going to show offline mode',
          'i will show offline mode today'
        ],
        'Today I will show abre a demo. Offline mode é o modo sem internet.',
        SEGUNDOS_DEMO
      ),
      fala(
        'Plateia',
        'Does it work with no internet?',
        'Funciona sem internet?',
        'Diga que sim, funciona sem internet.',
        'Yes. It works with no internet.',
        [
          'yes it works with no internet',
          'yes it works offline',
          'it works with no internet'
        ],
        'Yes abre a resposta. With no internet é sem internet.'
      ),
      fala(
        'Plateia',
        'Where does the progress go?',
        'Para onde vai o progresso?',
        'Diga que o progresso fica no celular.',
        'The progress stays on the phone.',
        [
          'the progress stays on the phone',
          'it stays on the phone',
          'the progress stays on this phone'
        ],
        'Stays on the phone é fica no celular.'
      )
    ]
  },
  {
    id: 'filtro',
    titulo: 'Filtro da busca',
    emoji: '🎬',
    nivel: 'B1',
    onde: 'Um minuto sobre o filtro, e duas perguntas.',
    rodadas: [
      fala(
        'Um minuto',
        'What does this feature do?',
        'O que esta feature faz?',
        'Diga que o filtro acha a palavra enquanto a pessoa digita.',
        'This filter finds a word as you type.',
        [
          'this filter finds a word as you type',
          'the filter finds a word as you type',
          'it finds a word as you type'
        ],
        'As you type é enquanto a pessoa digita.',
        SEGUNDOS_DEMO
      ),
      fala(
        'Plateia',
        'How fast is it?',
        'É rápido?',
        'Diga que responde em menos de um segundo.',
        'It answers in under a second.',
        [
          'it answers in under a second',
          'it answers in less than a second',
          'it answers in under one second'
        ],
        'Under a second é menos de um segundo.'
      ),
      fala(
        'Plateia',
        'Can I search in Portuguese?',
        'Dá para buscar em português?',
        'Diga que sim, dá para buscar em português.',
        'Yes. You can search in Portuguese.',
        [
          'yes you can search in portuguese',
          'yes you can search in portuguese too',
          'you can search in portuguese'
        ],
        'You can search é dá para buscar. Portuguese é português.'
      )
    ]
  },
  {
    id: 'aviso',
    titulo: 'Lembrete da reunião',
    emoji: '🎬',
    nivel: 'B2',
    onde: 'Um minuto sobre o lembrete, e duas perguntas.',
    rodadas: [
      fala(
        'Um minuto',
        'Show us the reminder.',
        'Mostra o lembrete.',
        'Diga que o lembrete chama a pessoa antes da reunião.',
        'This reminder pings you before the meeting.',
        [
          'this reminder pings you before the meeting',
          'the reminder pings you before the meeting',
          'it pings you before the meeting'
        ],
        'Pings you é te chama. Before the meeting é antes da reunião.',
        SEGUNDOS_DEMO
      ),
      fala(
        'Plateia',
        'Can I turn it off?',
        'Dá para desligar?',
        'Diga que sim, dá para desligar nas configurações.',
        'Yes. You can turn it off in settings.',
        [
          'yes you can turn it off in settings',
          'yes you can turn it off in the settings',
          'you can turn it off in settings'
        ],
        'Turn it off é desligar. Settings são as configurações.'
      ),
      fala(
        'Plateia',
        'When does it ping me?',
        'Quando ele me chama?',
        'Diga que chama dez minutos antes.',
        'It pings you ten minutes before.',
        [
          'it pings you ten minutes before',
          'it pings you 10 minutes before',
          'it pings you ten minutes before the meeting'
        ],
        'Ten minutes before é dez minutos antes.'
      )
    ]
  }
];

export const PRAZOS = [
  {
    id: 'corte',
    titulo: 'Busca primeiro',
    emoji: '📌',
    nivel: 'B1',
    onde: 'A exportação não cabe nesta semana.',
    rodadas: [
      fala(
        'Sugerir',
        'Can we ship the export this week too?',
        'Dá para entregar a exportação nesta semana também?',
        'Sugira entregar a busca primeiro.',
        "I'd suggest we ship search first.",
        [
          'i would suggest we ship search first',
          'i would suggest we ship the search first',
          'i suggest we ship search first'
        ],
        'I would suggest é uma sugestão educada. Ship search first é entregar a busca primeiro.'
      ),
      fala(
        'Trocar',
        'The export is already on the roadmap.',
        'A exportação já está no plano.',
        'Peça para deixar a exportação para a semana que vem.',
        'Could we move the export to next week?',
        [
          'could we move the export to next week',
          'could we move export to next week',
          'could we leave the export for next week'
        ],
        'Could we pede sem impor. Next week é a semana que vem.'
      )
    ]
  },
  {
    id: 'adiar',
    titulo: 'Sexta, com corte',
    emoji: '📌',
    nivel: 'B2',
    onde: 'A quarta está apertada. Peça sexta e corte um pedaço.',
    rodadas: [
      fala(
        'Sugerir',
        'We need this by Wednesday.',
        'Precisamos disso até quarta.',
        'Peça para mudar o prazo para sexta.',
        'Could we move the deadline to Friday?',
        [
          'could we move the deadline to friday',
          'could we move the deadline to this friday',
          'could we push the deadline to friday'
        ],
        'Could we pede a mudança. Friday é sexta.'
      ),
      fala(
        'Trocar',
        'Friday is already busy.',
        'Sexta já está cheia.',
        'Sugira cortar o gráfico e manter sexta.',
        "I'd suggest we cut the chart and keep Friday.",
        [
          'i would suggest we cut the chart and keep friday',
          'i would suggest we cut the chart and keep this friday',
          'i suggest we cut the chart and keep friday'
        ],
        'Cut the chart tira o gráfico do escopo. Keep Friday é manter sexta.'
      )
    ]
  },
  {
    id: 'pauta',
    titulo: 'Sem reunião extra',
    emoji: '📌',
    nivel: 'B1',
    onde: 'A decisão cabe no ticket, sem mais uma call.',
    rodadas: [
      fala(
        'Sugerir',
        'Let us add another meeting.',
        'Vamos marcar outra reunião.',
        'Peça para dispensar a reunião extra.',
        'Could we skip the extra meeting?',
        [
          'could we skip the extra meeting',
          'could we skip this extra meeting',
          'could we skip another meeting'
        ],
        'Skip the extra meeting é dispensar a reunião extra.'
      ),
      fala(
        'Trocar',
        'We still need a decision.',
        'Ainda precisamos de uma decisão.',
        'Sugira decidir isso no ticket.',
        "I'd suggest we decide this in the ticket.",
        [
          'i would suggest we decide this in the ticket',
          'i would suggest we decide it in the ticket',
          'i suggest we decide this in the ticket'
        ],
        'In the ticket é no chamado, por escrito.'
      )
    ]
  }
];

export const STARS = [
  {
    id: 'discordar',
    titulo: 'Rótulos diferentes',
    emoji: '⭐',
    nivel: 'B1',
    onde: 'Você e a designer queriam textos diferentes no botão.',
    rodadas: [
      fala(
        'Situação',
        'Tell me about a time you disagreed.',
        'Conta uma vez em que você discordou.',
        'Diga que no mês passado você e a designer queriam rótulos diferentes.',
        'Last month the designer and I wanted different labels.',
        [
          'last month the designer and i wanted different labels',
          'last month the designer and i wanted different button labels',
          'the designer and i wanted different labels last month'
        ],
        'Last month é no mês passado. Labels são os textos do botão.'
      ),
      fala(
        'Tarefa',
        'What was your job in that story?',
        'Qual era a sua parte nessa história?',
        'Diga que o seu papel era escolher um rótulo claro.',
        'My job was to choose a clear label.',
        [
          'my job was to choose a clear label',
          'my task was to choose a clear label',
          'my job was to pick a clear label'
        ],
        'My job was abre a tarefa. A clear label é um rótulo claro.'
      ),
      fala(
        'Ação',
        'What did you do?',
        'O que você fez?',
        'Diga que mostrou os dois rótulos para duas pessoas.',
        'I showed both labels to two users.',
        [
          'i showed both labels to two users',
          'i showed the two labels to two users',
          'i showed both labels to two people'
        ],
        'Showed é mostrei. Two users são duas pessoas.'
      ),
      fala(
        'Resultado',
        'What was the result?',
        'Qual foi o resultado?',
        'Diga que vocês entregaram o rótulo mais curto.',
        'We shipped the shorter label.',
        [
          'we shipped the shorter label',
          'we shipped the short label',
          'we shipped the shorter one'
        ],
        'Shipped é entregamos. The shorter label é o rótulo mais curto.'
      )
    ]
  },
  {
    id: 'atraso',
    titulo: 'Aviso cedo',
    emoji: '⭐',
    nivel: 'B2',
    onde: 'A API ainda estava quebrada na quinta.',
    rodadas: [
      fala(
        'Situação',
        'Tell me about a time a date slipped.',
        'Conta uma vez em que a data escorregou.',
        'Diga que a API ainda estava quebrada na quinta.',
        'The API was still broken on Thursday.',
        [
          'the api was still broken on thursday',
          'the api was still broken on that thursday',
          'on thursday the api was still broken'
        ],
        'Still broken é ainda quebrada. Thursday é quinta.'
      ),
      fala(
        'Tarefa',
        'What did you need to do?',
        'O que você precisava fazer?',
        'Diga que precisava avisar o time cedo.',
        'I had to warn the team early.',
        [
          'i had to warn the team early',
          'i needed to warn the team early',
          'i had to tell the team early'
        ],
        'Warn the team é avisar o time. Early é cedo.'
      ),
      fala(
        'Ação',
        'What did you do next?',
        'O que você fez em seguida?',
        'Diga que mandou um recado curto e cortou o gráfico.',
        'I sent a short update and cut the chart.',
        [
          'i sent a short update and cut the chart',
          'i sent a short update and i cut the chart',
          'i wrote a short update and cut the chart'
        ],
        'A short update é um recado curto. Cut the chart é cortar o gráfico.'
      ),
      fala(
        'Resultado',
        'How did it end?',
        'Como terminou?',
        'Diga que vocês entregaram a busca na sexta.',
        'We shipped search on Friday.',
        [
          'we shipped search on friday',
          'we shipped the search on friday',
          'on friday we shipped search'
        ],
        'Shipped search é entregamos a busca. Friday é sexta.'
      )
    ]
  },
  {
    id: 'par',
    titulo: 'Teste travado',
    emoji: '⭐',
    nivel: 'B1',
    onde: 'Alguém do time travou nos testes.',
    rodadas: [
      fala(
        'Situação',
        'Tell me about a time you helped someone.',
        'Conta uma vez em que você ajudou alguém.',
        'Diga que uma pessoa do time travou nos testes.',
        'A teammate was stuck on the tests.',
        [
          'a teammate was stuck on the tests',
          'a teammate was stuck on the test',
          'one teammate was stuck on the tests'
        ],
        'A teammate é uma pessoa do time. Stuck é travada.'
      ),
      fala(
        'Tarefa',
        'What did you need to do?',
        'O que você precisava fazer?',
        'Diga que precisava destravar a revisão.',
        'I needed to unblock the review.',
        [
          'i needed to unblock the review',
          'i had to unblock the review',
          'i needed to unblock the code review'
        ],
        'Unblock the review é destravar a revisão.'
      ),
      fala(
        'Ação',
        'What did you do?',
        'O que você fez?',
        'Diga que programou junto por trinta minutos.',
        'I paired with them for thirty minutes.',
        [
          'i paired with them for thirty minutes',
          'i paired with them for 30 minutes',
          'i paired with them for half an hour'
        ],
        'Paired é programou junto. Thirty minutes é trinta minutos.'
      ),
      fala(
        'Resultado',
        'What was the result?',
        'Qual foi o resultado?',
        'Diga que o pull request entrou no mesmo dia.',
        'The pull request was merged that day.',
        [
          'the pull request was merged that day',
          'the pull request was merged the same day',
          'we merged the pull request that day'
        ],
        'Merged é entrou no código. That day é no mesmo dia.'
      )
    ]
  }
];

export const ENFASES = [
  {
    id: 'voce',
    tipo: 'palavra',
    nivel: 'A2',
    titulo: 'Foi você',
    emoji: '👉',
    pt: 'A surpresa é que foi você quem enviou o arquivo.',
    uso: 'Toque na palavra que carrega a surpresa. Depois diga a frase.',
    palavras: ['Did', 'you', 'send', 'the', 'file'],
    foco: 'you',
    melhor: 'Did you send the file?',
    aceitas: ['did you send the file', 'did you send that file'],
    dica: 'You é a palavra forte. A voz sobe um pouco nela.',
    porque: 'A ênfase cai em you. O resto fica mais baixo.'
  },
  {
    id: 'arquivo',
    tipo: 'palavra',
    nivel: 'A2',
    titulo: 'O arquivo',
    emoji: '📄',
    pt: 'A dúvida é o que foi enviado: o arquivo.',
    uso: 'Toque na palavra que responde a dúvida. Depois diga a frase.',
    palavras: ['Did', 'you', 'send', 'the', 'file'],
    foco: 'file',
    melhor: 'Did you send the file?',
    aceitas: ['did you send the file', 'did you send that file'],
    dica: 'File é a palavra forte. É ela que responde a dúvida.',
    porque: 'A ênfase cai em file. É a palavra nova da pergunta.'
  },
  {
    id: 'ele',
    tipo: 'palavra',
    nivel: 'B1',
    titulo: 'Foi ele',
    emoji: '👉',
    pt: 'Quem enviou a correção foi ele, não você.',
    uso: 'Toque em quem praticou a ação. Depois diga a frase.',
    palavras: ['He', 'shipped', 'the', 'fix'],
    foco: 'He',
    melhor: 'He shipped the fix.',
    aceitas: ['he shipped the fix', 'he shipped the fix yesterday'],
    dica: 'He é a palavra forte. A surpresa é a pessoa.',
    porque: 'A ênfase cai em he. A pessoa é a novidade.'
  },
  {
    id: 'fez',
    tipo: 'palavra',
    nivel: 'B1',
    titulo: 'Ele enviou',
    emoji: '📦',
    pt: 'O fato novo é que ele enviou a correção.',
    uso: 'Toque no verbo, a palavra do fato novo. Depois diga a frase.',
    palavras: ['He', 'shipped', 'the', 'fix'],
    foco: 'shipped',
    melhor: 'He shipped the fix.',
    aceitas: ['he shipped the fix', 'he shipped the fix yesterday'],
    dica: 'Shipped é a palavra forte. O verbo carrega o fato.',
    porque: 'A ênfase cai em shipped. O verbo é a novidade.'
  },
  {
    id: 'sim',
    tipo: 'curva',
    nivel: 'A2',
    titulo: 'Sim ou não',
    emoji: '📈',
    pt: 'Pergunte se a pessoa quer café.',
    uso: 'Pergunta de sim ou não termina com a voz subindo.',
    curva: 'sobe',
    melhor: 'Do you want coffee?',
    aceitas: ['do you want coffee', 'do you want a coffee'],
    dica: 'Do you abre a pergunta. A voz sobe no fim.',
    porque: 'Pergunta de sim ou não: a voz sobe no fim.'
  },
  {
    id: 'lugar',
    tipo: 'curva',
    nivel: 'A2',
    titulo: 'Onde',
    emoji: '📉',
    pt: 'Pergunte onde é a reunião.',
    uso: 'Pergunta com where desce no fim.',
    curva: 'desce',
    melhor: 'Where is the meeting?',
    aceitas: ['where is the meeting', 'where is the meeting today'],
    dica: 'Where abre a pergunta. A voz desce no fim.',
    porque: 'Pergunta com where: a voz desce no fim.'
  },
  {
    id: 'pronto',
    tipo: 'curva',
    nivel: 'A2',
    titulo: 'Está pronto?',
    emoji: '📈',
    pt: 'Pergunte se a pessoa está pronta.',
    uso: 'Pergunta curta de sim ou não. A voz sobe no fim.',
    curva: 'sobe',
    melhor: 'Are you ready?',
    aceitas: ['are you ready', 'are you ready now'],
    dica: 'Are you abre a pergunta. A voz sobe em ready.',
    porque: 'Pergunta de sim ou não: a voz sobe no fim.'
  },
  {
    id: 'inicio',
    tipo: 'curva',
    nivel: 'B1',
    titulo: 'Quando começa',
    emoji: '📉',
    pt: 'Pergunte quando a demo começa.',
    uso: 'Pergunta com when desce no fim.',
    curva: 'desce',
    melhor: 'When does the demo start?',
    aceitas: ['when does the demo start', 'when does the demo start today'],
    dica: 'When does abre a pergunta. A voz desce no fim.',
    porque: 'Pergunta com when: a voz desce no fim.'
  }
];

export function demoPorId(id) {
  return DEMOS.find(c => c.id === id) ?? null;
}

export function prazoPorId(id) {
  return PRAZOS.find(c => c.id === id) ?? null;
}

export function starPorId(id) {
  return STARS.find(c => c.id === id) ?? null;
}

export function enfasePorId(id) {
  return ENFASES.find(item => item.id === id) ?? null;
}

export function avaliarDemo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPrazo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarStar(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarEnfase(item, texto) {
  return avaliarResposta(item, texto);
}

export function avaliarToque(item, escolha) {
  if (!item) return { ok: false, foco: null, curva: null };
  if (item.tipo === 'curva') {
    return { ok: escolha === item.curva, foco: null, curva: item.curva };
  }
  const foco = String(item.foco || '').toLowerCase();
  return { ok: String(escolha || '').toLowerCase() === foco, foco: item.foco, curva: null };
}
