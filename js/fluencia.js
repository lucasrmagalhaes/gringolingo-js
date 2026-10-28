// Fluência offline: nível de fala, perguntas, reduções, phrasal verbs,
// fala livre com pistas e o resumo da semana. Sem rede e sem arquivo de áudio.

import { avaliarResposta, normalizarFala } from './conversa.js';

export const NIVEIS_FALA = ['A1', 'A2', 'B1', 'B2'];

export const ROTULO_NIVEL = {
  A1: 'Primeiras frases',
  A2: 'Dia a dia',
  B1: 'Se virar na conversa',
  B2: 'Falar com detalhe'
};

export function nivelValido(valor) {
  return NIVEIS_FALA.includes(valor) ? valor : null;
}

export function rankNivel(valor) {
  const i = NIVEIS_FALA.indexOf(valor);
  return i < 0 ? -1 : i;
}

export function melhorNivel(a, b) {
  return rankNivel(a) >= rankNivel(b) ? nivelValido(a) : nivelValido(b);
}

export function preferirNivel(lista, nivel) {
  const alvo = nivelValido(nivel);
  if (!alvo) return [...(lista ?? [])];
  const rank = rankNivel(alvo);
  const iguais = [];
  const abaixo = [];
  const acima = [];
  for (const item of lista ?? []) {
    const r = rankNivel(item?.nivel);
    if (r === rank) iguais.push(item);
    else if (r >= 0 && r < rank) abaixo.push(item);
    else acima.push(item);
  }
  return [...iguais, ...abaixo, ...acima];
}

export function montarSessao(lista, nivel, qtd = 4) {
  return preferirNivel(lista, nivel).slice(0, qtd);
}

export const ITENS_NIVEL = [
  {
    id: 'a1-manha', nivel: 'A1',
    pergunta: 'Qual cumprimento serve de manhã?',
    opcoes: ['Good morning.', 'Good night.', 'See you tomorrow.'],
    certa: 0
  },
  {
    id: 'a1-thanks', nivel: 'A1',
    pergunta: 'O que significa Thank you?',
    opcoes: ['Obrigado', 'Desculpa', 'Por favor'],
    certa: 0
  },
  {
    id: 'a2-preco', nivel: 'A2',
    pergunta: 'Qual frase pergunta o preço?',
    opcoes: ['How much is it?', 'I am fine, thanks.', 'See you later.'],
    certa: 0
  },
  {
    id: 'a2-pedido', nivel: 'A2',
    pergunta: 'I would like a coffee, please. Isso é...',
    opcoes: ['Um pedido educado', 'Uma despedida', 'Uma pergunta de nome'],
    certa: 0
  },
  {
    id: 'b1-interromper', nivel: 'B1',
    pergunta: 'Qual frase interrompe com educação?',
    opcoes: ['Sorry to interrupt.', 'You are wrong.', 'Be quiet.'],
    certa: 0
  },
  {
    id: 'b1-tempo', nivel: 'B1',
    pergunta: 'I have worked here for two years. A pessoa fala de...',
    opcoes: ['Um tempo que continua até agora', 'Um plano para amanhã', 'Uma ordem para a equipe'],
    certa: 0
  },
  {
    id: 'b2-tradeoff', nivel: 'B2',
    pergunta: 'Could you walk me through the tradeoffs? A pessoa pede...',
    opcoes: ['Para explicar os prós e os contras', 'O caminho até a rua', 'A conta do jantar'],
    certa: 0
  },
  {
    id: 'b2-gonna', nivel: 'B2',
    pergunta: 'I am gonna call it. A frase cheia é...',
    opcoes: ['I am going to call it.', 'I am going to the call.', 'I called it yesterday.'],
    certa: 0
  }
];

export function corrigirIndice(item, indice) {
  return Number(indice) === item?.certa;
}

export function contarAcertos(respostas) {
  const acertos = { A1: 0, A2: 0, B1: 0, B2: 0 };
  for (const r of respostas ?? []) {
    if (r?.ok && Object.prototype.hasOwnProperty.call(acertos, r.nivel)) acertos[r.nivel]++;
  }
  return acertos;
}

export function nivelDoTeste(acertos) {
  const n = acertos ?? {};
  if ((n.A1 ?? 0) < 2) return 'A1';
  if ((n.A2 ?? 0) < 2) return 'A2';
  if ((n.B1 ?? 0) < 2) return 'B1';
  if ((n.B2 ?? 0) < 1) return 'B1';
  return 'B2';
}

export const PERGUNTAS = [
  {
    id: 'cafe', nivel: 'A1', titulo: 'No café', emoji: '☕', onde: 'Você ainda não viu o cardápio',
    rodadas: [
      {
        npc: { en: 'Hi! Welcome in. What can I get you?', pt: 'Oi! Bem-vindo. O que vai querer?' },
        missao: 'Você não sabe o que tem. Pergunte pelo cardápio.',
        aceitas: ['can i see the menu', 'could i see the menu', 'do you have a menu', 'where is the menu'],
        melhor: 'Can I see the menu?',
        dica: 'Uma pergunta pede Can ou Do no começo. Can I see the menu?'
      },
      {
        npc: { en: 'Sure. Here it is. Coffee, tea, and cake.', pt: 'Claro. Aqui está. Café, chá e bolo.' },
        missao: 'Pergunte se eles têm chá.',
        aceitas: ['do you have tea', 'do you have any tea', 'is there tea', 'can i have tea'],
        melhor: 'Do you have tea?',
        dica: 'Do you have pergunta se existe. Tea é chá.'
      }
    ]
  },
  {
    id: 'loja', nivel: 'A2', titulo: 'Na loja', emoji: '🛍️', onde: 'Você achou uma camisa',
    rodadas: [
      {
        npc: { en: 'Hi there. Are you looking for something?', pt: 'Oi. Você está procurando alguma coisa?' },
        missao: 'Pergunte o preço da camisa.',
        aceitas: ['how much is this shirt', 'how much is the shirt', 'how much does this shirt cost', 'what is the price'],
        melhor: 'How much is this shirt?',
        dica: 'Preço pergunta com How much is. This shirt é esta camisa.'
      },
      {
        npc: { en: 'It is twenty dollars.', pt: 'São vinte dólares.' },
        missao: 'Pergunte se você pode experimentar.',
        aceitas: ['can i try it on', 'could i try it on', 'can i try this on', 'may i try it on'],
        melhor: 'Can I try it on?',
        dica: 'Try it on é experimentar roupa. A pergunta começa com Can I.'
      }
    ]
  },
  {
    id: 'portao', nivel: 'B1', titulo: 'No aeroporto', emoji: '✈️', onde: 'O embarque está perto',
    rodadas: [
      {
        npc: { en: 'Good afternoon. How can I help?', pt: 'Boa tarde. Como posso ajudar?' },
        missao: 'Pergunte onde fica o portão 8.',
        aceitas: ['where is gate 8', 'where is gate eight', 'which way is gate 8', 'where can i find gate 8'],
        melhor: 'Where is gate 8?',
        dica: 'Where is pergunta o lugar. Gate é o portão.'
      },
      {
        npc: { en: 'Gate 8 is down this hall, on the left.', pt: 'O portão 8 é neste corredor, à esquerda.' },
        missao: 'Pergunte se o voo está atrasado.',
        aceitas: ['is the flight delayed', 'is my flight delayed', 'is the flight late', 'has the flight been delayed'],
        melhor: 'Is the flight delayed?',
        dica: 'Delayed é atrasado. A pergunta de sim ou não começa com Is.'
      }
    ]
  },
  {
    id: 'reuniao', nivel: 'B2', titulo: 'Na reunião', emoji: '💻', onde: 'Você apresenta um bug',
    rodadas: [
      {
        npc: { en: 'Thanks for joining. What is the status?', pt: 'Obrigado por entrar. Qual é o status?' },
        missao: 'Pergunte qual é o prazo do conserto.',
        aceitas: ['what is the deadline', 'when is the deadline', 'what is the deadline for the fix', 'when do we need to ship the fix'],
        melhor: 'What is the deadline for the fix?',
        dica: 'Deadline é o prazo. Fix aqui é o conserto do bug.'
      },
      {
        npc: { en: 'We need it before Friday.', pt: 'Precisamos disso antes de sexta.' },
        missao: 'Pergunte quem fica com o bug.',
        aceitas: ['who owns the bug', 'who is taking the bug', 'who will fix the bug', 'who is responsible for the bug'],
        melhor: 'Who owns the bug?',
        dica: 'Who pergunta a pessoa. Own the bug é ficar responsável por ele.'
      }
    ]
  }
];

export function perguntaPorId(id) {
  return PERGUNTAS.find(c => c.id === id) ?? null;
}

export function avaliarPergunta(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export const REDUCOES = [
  {
    id: 'gonna', nivel: 'A2', titulo: 'Gonna', emoji: '⏩',
    fala: 'I am gonna call you later.',
    pergunta: 'Qual é a frase cheia?',
    opcoes: ['I am going to call you later.', 'I am going to the call later.', 'I called you later.'],
    certa: 0,
    dica: 'Gonna junta going to. Não é um lugar.',
    pt: 'Eu vou te ligar mais tarde.'
  },
  {
    id: 'wanna', nivel: 'A2', titulo: 'Wanna', emoji: '🥪',
    fala: 'Do you wanna grab lunch?',
    pergunta: 'Qual é a frase cheia?',
    opcoes: ['Do you want to grab lunch?', 'Do you want a lunch?', 'Did you grab lunch?'],
    certa: 0,
    dica: 'Wanna junta want to. Grab lunch é almoçar fora, rapidinho.',
    pt: 'Você quer almoçar?'
  },
  {
    id: 'gotta', nivel: 'A2', titulo: 'Gotta', emoji: '🏃',
    fala: 'I gotta go now.',
    pergunta: 'Qual é a frase cheia?',
    opcoes: ['I have got to go now.', 'I got a go now.', 'I go now.'],
    certa: 0,
    dica: 'Gotta é have got to, uma obrigação. Não é got a.',
    pt: 'Eu tenho que ir agora.'
  },
  {
    id: 'kinda', nivel: 'A2', titulo: 'Kinda', emoji: '🌤️',
    fala: 'It is kinda cold today.',
    pergunta: 'Qual é a frase cheia?',
    opcoes: ['It is kind of cold today.', 'It is a kind cold today.', 'It was cold today.'],
    certa: 0,
    dica: 'Kinda é kind of, um meio termo. Meio frio, não um tipo de frio.',
    pt: 'Está meio frio hoje.'
  },
  {
    id: 'lemme', nivel: 'B1', titulo: 'Lemme', emoji: '🤔',
    fala: 'Lemme think about it.',
    pergunta: 'Qual é a frase cheia?',
    opcoes: ['Let me think about it.', 'Leave me to think.', 'I thought about it.'],
    certa: 0,
    dica: 'Lemme junta let me. É um pedido de um segundo.',
    pt: 'Deixa eu pensar.'
  },
  {
    id: 'didja', nivel: 'B1', titulo: 'Didja', emoji: '📧',
    fala: 'Didja see the email?',
    pergunta: 'Qual é a frase cheia?',
    opcoes: ['Did you see the email?', 'Did your see the email?', 'Do you see the email?'],
    certa: 0,
    dica: 'Didja junta did you. A pergunta é no passado.',
    pt: 'Você viu o e-mail?'
  },
  {
    id: 'cuppa', nivel: 'B1', titulo: 'Cup of', emoji: '☕',
    fala: 'I need a cuppa coffee.',
    pergunta: 'Quais palavras se juntaram?',
    opcoes: ['cup of coffee', 'cup a coffee', 'couple of coffee'],
    certa: 0,
    dica: 'Cup of cola numa sílaba só: cuppa. Of quase some entre as palavras.',
    pt: 'Eu preciso de uma xícara de café.'
  },
  {
    id: 'gimme', nivel: 'B1', titulo: 'Gimme', emoji: '⏱️',
    fala: 'Gimme a minute.',
    pergunta: 'Qual é a frase cheia?',
    opcoes: ['Give me a minute.', 'Give a minute.', 'Got a minute.'],
    certa: 0,
    dica: 'Gimme junta give me. O me não pode cair.',
    pt: 'Me dá um minuto.'
  }
];

export function reducaoPorId(id) {
  return REDUCOES.find(r => r.id === id) ?? null;
}

export const FRASAIS = [
  {
    id: 'look-for', nivel: 'A2', tipo: 'phrasal',
    titulo: 'look for',
    pt: 'Estou procurando o portão.',
    uso: 'Look for é procurar. A preposição for não cai.',
    aceitas: ['i am looking for the gate', 'i am looking for my gate', 'im looking for the gate'],
    melhor: 'I am looking for the gate.',
    dica: 'Look sozinho é olhar. Look for é procurar.'
  },
  {
    id: 'turn-on', nivel: 'A2', tipo: 'phrasal',
    titulo: 'turn on',
    pt: 'Pode ligar a luz?',
    uso: 'Turn on é ligar um aparelho. Turn off é desligar.',
    aceitas: ['can you turn on the light', 'could you turn on the light', 'can you turn the light on'],
    melhor: 'Can you turn on the light?',
    dica: 'On fica grudado na ideia de ligar. A luz é the light.'
  },
  {
    id: 'pick-up', nivel: 'A2', tipo: 'phrasal',
    titulo: 'pick up',
    pt: 'Eu vou buscar as chaves.',
    uso: 'Pick up pode ser buscar alguém ou alguma coisa.',
    aceitas: ['i will pick up the keys', 'i am going to pick up the keys', 'ill pick up the keys'],
    melhor: 'I will pick up the keys.',
    dica: 'Pick up the keys é buscar as chaves, não pick the keys.'
  },
  {
    id: 'come-back', nivel: 'A2', tipo: 'phrasal',
    titulo: 'come back',
    pt: 'Eu volto amanhã.',
    uso: 'Come back é voltar ao lugar.',
    aceitas: ['i will come back tomorrow', 'i am coming back tomorrow', 'ill come back tomorrow'],
    melhor: 'I will come back tomorrow.',
    dica: 'Tomorrow é amanhã. Come back precisa dos dois pedaços.'
  },
  {
    id: 'figure-out', nivel: 'B1', tipo: 'phrasal',
    titulo: 'figure out',
    pt: 'Vamos descobrir isso juntos.',
    uso: 'Figure out é entender ou resolver depois de pensar.',
    aceitas: ['lets figure this out', 'let us figure this out', 'lets figure it out'],
    melhor: 'Let us figure this out.',
    dica: 'Figure out não é desenhar. É chegar numa resposta.'
  },
  {
    id: 'give-up', nivel: 'B1', tipo: 'phrasal',
    titulo: 'give up',
    pt: 'Não desista.',
    uso: 'Give up é parar de tentar.',
    aceitas: ['do not give up', 'dont give up', 'never give up'],
    melhor: 'Do not give up.',
    dica: 'Give up é desistir. Give sozinho é dar.'
  },
  {
    id: 'look-forward', nivel: 'B1', tipo: 'phrasal',
    titulo: 'look forward to',
    pt: 'Estou ansioso pela reunião.',
    uso: 'Look forward to espera algo bom. O to fica.',
    aceitas: ['i look forward to the meeting', 'i am looking forward to the meeting', 'im looking forward to the meeting'],
    melhor: 'I look forward to the meeting.',
    dica: 'To não vira for. Look forward to the meeting.'
  },
  {
    id: 'run-out', nivel: 'B1', tipo: 'phrasal',
    titulo: 'run out of',
    pt: 'O tempo acabou.',
    uso: 'Run out of é ficar sem alguma coisa.',
    aceitas: ['we ran out of time', 'we have run out of time', 'weve run out of time'],
    melhor: 'We ran out of time.',
    dica: 'Of marca o que acabou. Time é o tempo.'
  },
  {
    id: 'deadline', nivel: 'B2', tipo: 'colocacao',
    titulo: 'meet the deadline',
    pt: 'Precisamos cumprir o prazo.',
    uso: 'Meet a deadline é chegar a tempo. Não é meet the time.',
    aceitas: ['we need to meet the deadline', 'we have to meet the deadline', 'we must meet the deadline'],
    melhor: 'We need to meet the deadline.',
    dica: 'Deadline é o prazo. O verbo que combina é meet.'
  },
  {
    id: 'bug', nivel: 'B2', tipo: 'colocacao',
    titulo: 'fix a bug',
    pt: 'Eu vou corrigir o bug.',
    uso: 'No trabalho de software, fix a bug é consertar o erro.',
    aceitas: ['i will fix the bug', 'i am going to fix the bug', 'ill fix the bug'],
    melhor: 'I will fix the bug.',
    dica: 'Fix é o verbo. Bug é o erro no código.'
  },
  {
    id: 'page', nivel: 'B2', tipo: 'colocacao',
    titulo: 'on the same page',
    pt: 'Vamos alinhar antes de seguir.',
    uso: 'On the same page é estar de acordo, não numa folha.',
    aceitas: ['lets get on the same page', 'let us get on the same page', 'we should get on the same page'],
    melhor: 'Let us get on the same page.',
    dica: 'A expressão inteira significa alinhar. Page aqui não é a página do livro.'
  },
  {
    id: 'look', nivel: 'B2', tipo: 'colocacao',
    titulo: 'take a look',
    pt: 'Você pode dar uma olhada?',
    uso: 'Take a look é olhar com atenção, um pedido comum no trabalho.',
    aceitas: ['can you take a look', 'could you take a look', 'can you take a look at this'],
    melhor: 'Can you take a look?',
    dica: 'Take a look pede uma olhada. Look sozinho fica seco demais.'
  }
];

export function frasalPorId(id) {
  return FRASAIS.find(f => f.id === id) ?? null;
}

export function avaliarFrasal(item, texto) {
  return avaliarResposta(item, texto);
}

export const TEMAS = [
  {
    id: 'eu', nivel: 'A1', titulo: 'Fale de você', emoji: '🙋', segundos: 60,
    pedido: 'Fale de você por um minuto: o seu nome, a cidade e uma coisa que você gosta.',
    pistas: ['my name is', 'i live', 'i like'],
    dica: 'Comece com My name is. Uma frase curta já vale.'
  },
  {
    id: 'hobby', nivel: 'A2', titulo: 'Um hobby', emoji: '🎸', segundos: 60,
    pedido: 'Conte um hobby: o que é, quando você faz e por quê.',
    pistas: ['i like', 'because', 'every'],
    dica: 'Use because para dizer o motivo.'
  },
  {
    id: 'trabalho', nivel: 'B1', titulo: 'O seu trabalho', emoji: '💻', segundos: 90,
    pedido: 'Fale do seu trabalho: o que você faz, com quem, e um problema recente.',
    pistas: ['i work', 'because', 'last'],
    dica: 'Um problema recente pede o passado: last week I fixed.'
  },
  {
    id: 'projeto', nivel: 'B2', titulo: 'Um projeto', emoji: '🛠️', segundos: 90,
    pedido: 'Explique um projeto: o objetivo, uma decisão difícil e o que você faria diferente.',
    pistas: ['the goal', 'because', 'would'],
    dica: 'A decisão pede because. O que faria diferente pede would.'
  }
];

export function temaPorId(id) {
  return TEMAS.find(t => t.id === id) ?? null;
}

export function avaliarLivre(tema, texto) {
  const norm = normalizarFala(texto);
  const palavras = norm ? norm.split(' ').filter(Boolean) : [];
  const pistas = (tema?.pistas ?? []).filter(p => norm.includes(normalizarFala(p)));
  const conectores = ['and', 'but', 'because', 'so', 'then'].filter(c => palavras.includes(c));
  const perguntas = (String(texto ?? '').match(/\?/g) || []).length;
  let nota = 0;
  if (palavras.length >= 8) nota += 25;
  if (palavras.length >= 20) nota += 15;
  if (palavras.length >= 35) nota += 10;
  nota += Math.min(30, pistas.length * 10);
  nota += Math.min(15, conectores.length * 5);
  if (perguntas > 0) nota += 5;
  nota = Math.min(100, nota);
  const faltas = [];
  if (palavras.length < 12) faltas.push('Faltou volume. Tente pelo menos umas doze palavras.');
  if (!pistas.length) faltas.push('Nenhuma pista entrou. Use uma delas: ' + (tema?.pistas ?? []).join(', ') + '.');
  if (!conectores.length && tema?.nivel && tema.nivel !== 'A1') {
    faltas.push('Ligue as ideias com and, but, because ou so.');
  }
  return {
    nota,
    palavras: palavras.length,
    pistas,
    conectores,
    perguntas,
    faltas,
    ok: nota >= 60
  };
}

function isoLocal(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

export function diasDaSemana(diaIso) {
  const base = new Date(`${diaIso}T12:00:00`);
  if (Number.isNaN(base.getTime())) return [];
  const offset = (base.getDay() + 6) % 7;
  const dias = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() - offset + i);
    dias.push(isoLocal(d));
  }
  return dias;
}

export function resumoSemana(painel, diaIso) {
  const datas = diasDaSemana(diaIso);
  const dias = datas.map(data => {
    const row = painel?.[data];
    const n = Number(row?.n) || 0;
    const soma = Number(row?.soma) || 0;
    const futuro = data > diaIso;
    return {
      data,
      n: futuro ? 0 : n,
      media: !futuro && n ? Math.round(soma / n) : null,
      acertos: futuro ? 0 : (Number(row?.acertos) || 0),
      respostas: futuro ? 0 : (Number(row?.respostas) || 0),
      futuro
    };
  });
  const feitos = dias.filter(d => d.n > 0);
  const treinos = feitos.reduce((s, d) => s + d.n, 0);
  const soma = feitos.reduce((s, d) => s + (d.media ?? 0) * d.n, 0);
  const respostas = feitos.reduce((s, d) => s + d.respostas, 0);
  const acertos = feitos.reduce((s, d) => s + d.acertos, 0);
  return {
    dias,
    treinos,
    media: treinos ? Math.round(soma / treinos) : null,
    precisao: respostas ? Math.round(acertos / respostas * 100) : null,
    acertos,
    respostas
  };
}

export function sugestaoSemana({ nivel, perguntas, reduzidas, verbos, livres, media }) {
  if (!nivelValido(nivel)) return 'Faça o teste de nível para a semana ficar no seu ponto.';
  if (!perguntas) return 'Nesta semana, tente uma cena em que você faz a pergunta.';
  if (!reduzidas) return 'Ouça uma fala rápida: gonna, wanna e as palavras que se juntam.';
  if (!livres) return 'Fale um minuto sobre você. O tutor olha o texto neste aparelho.';
  if (media != null && media < 70) return 'A média da semana ficou baixa. Vale repetir uma cena curta.';
  if (!verbos) return 'Inclua um phrasal verb: look for, figure out ou meet the deadline.';
  return 'Semana cheia. Escolha um tema um pouco acima do seu nível e fale de novo.';
}
