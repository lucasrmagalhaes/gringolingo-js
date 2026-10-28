// Treino de ouvido e de sons difíceis para quem fala português.
// A voz é a do aparelho: velocidade normal e devagar, sem arquivo de áudio.

export const TAXA_NORMAL = 1;
export const TAXA_DEVAGAR = 0.75;

export const SONS = [
  {
    id: 'th',
    titulo: 'O som do TH',
    emoji: '👅',
    dica: 'A língua sai um pouco entre os dentes. Não é S, nem T, nem F. Think não é sink.',
    pares: [
      { a: 'think', b: 'sink', falaA: 'think', falaB: 'sink', dica: 'Think começa com a língua para fora. Sink é pia, com S.' },
      { a: 'three', b: 'tree', falaA: 'three', falaB: 'tree', dica: 'Three é três, com TH. Tree é árvore, com T.' },
      { a: 'thanks', b: 'tanks', falaA: 'thanks', falaB: 'tanks', dica: 'Thanks agradece. Tanks são tanques, com T.' },
      { a: 'mouth', b: 'mouse', falaA: 'mouth', falaB: 'mouse', dica: 'Mouth é boca, com TH no fim. Mouse é rato.' }
    ]
  },
  {
    id: 'ed',
    titulo: 'O -ED no final',
    emoji: '🔚',
    dica: 'O -ed muda de som. Depois de T ou D, vira uma sílaba extra: wan-tid. Depois de som surdo, é T: watcht. No resto, é D: playd.',
    pares: [
      { a: 'wanted', b: 'watched', falaA: 'wanted', falaB: 'watched', dica: 'Wanted tem sílaba a mais, id. Watched é curto, som de T.' },
      { a: 'needed', b: 'played', falaA: 'needed', falaB: 'played', dica: 'Needed termina em id. Played é um D só, sem vogal nova.' },
      { a: 'decided', b: 'asked', falaA: 'decided', falaB: 'asked', dica: 'Decided leva id porque decide termina em D. Asked é som de T.' },
      { a: 'started', b: 'closed', falaA: 'started', falaB: 'closed', dica: 'Started é star-tid. Closed é um D no fim, close-d.' }
    ]
  },
  {
    id: 'vogal',
    titulo: 'Vogal curta e longa',
    emoji: '🔤',
    dica: 'O português quase não separa esses pares. A vogal longa dura mais e a boca abre diferente. Ship é curto. Sheep é longo.',
    pares: [
      { a: 'ship', b: 'sheep', falaA: 'ship', falaB: 'sheep', dica: 'Ship é navio, I curto. Sheep é ovelha, I longo.' },
      { a: 'bit', b: 'beat', falaA: 'bit', falaB: 'beat', dica: 'Bit é um pouco, I curto. Beat é bater, I longo.' },
      { a: 'pull', b: 'pool', falaA: 'pull', falaB: 'pool', dica: 'Pull é puxar, U curto. Pool é piscina, U longo.' },
      { a: 'not', b: 'note', falaA: 'not', falaB: 'note', dica: 'Not é não, O curto. Note é bilhete, O longo.' }
    ]
  },
  {
    id: 'acento',
    titulo: 'Acento da palavra',
    emoji: '🎯',
    dica: 'A sílaba forte muda o sentido. PERmit é o documento. perMIT é o verbo permitir. Ouça a frase inteira, não só a palavra.',
    pares: [
      {
        a: 'PERmit, o documento',
        b: 'perMIT, permitir',
        falaA: 'I need a permit.',
        falaB: 'They permit you to stay.',
        dica: 'No documento, a força está no PER. No verbo, a força vai para o MIT.'
      },
      {
        a: 'REcord, o disco',
        b: 'reCORD, gravar',
        falaA: 'This is a record.',
        falaB: 'Please record the meeting.',
        dica: 'A record é o substantivo, força no RE. To record é o verbo, força no CORD.'
      },
      {
        a: 'PREsent, o presente',
        b: 'preSENT, apresentar',
        falaA: 'This is a present for you.',
        falaB: 'I will present the report.',
        dica: 'Present de presente pesa no PRE. Present de apresentar pesa no SENT.'
      },
      {
        a: 'INsight, a ideia',
        b: 'inCITE, provocar',
        falaA: 'That was a good insight.',
        falaB: 'Do not incite a fight.',
        dica: 'Insight pesa no IN. Incite pesa no CITE e significa provocar.'
      }
    ]
  }
];

export const CLIPS = [
  {
    id: 'portao',
    titulo: 'Portão do avião',
    emoji: '✈️',
    linhas: ['Flight 42 to Lisbon is now boarding at gate 8.'],
    pergunta: 'Onde é o embarque?',
    opcoes: ['No portão 8', 'No portão 42', 'No portão 2'],
    certa: 0,
    pt: 'O voo 42 para Lisboa está embarcando no portão 8.'
  },
  {
    id: 'consulta',
    titulo: 'Recepção da clínica',
    emoji: '🩺',
    linhas: ['The doctor can see you at three.', 'Please fill out this form.'],
    pergunta: 'Que horas o médico atende?',
    opcoes: ['Às três', 'Às duas', 'De manhã'],
    certa: 0,
    pt: 'O médico pode ver você às três. Preencha este formulário.'
  },
  {
    id: 'loja',
    titulo: 'Na loja',
    emoji: '🛍️',
    linhas: ['The blue shirt is twenty dollars.', 'The red one is on sale for fifteen.'],
    pergunta: 'Qual camisa está em promoção?',
    opcoes: ['A vermelha', 'A azul', 'As duas'],
    certa: 0,
    pt: 'A camisa azul custa vinte dólares. A vermelha está em promoção por quinze.'
  },
  {
    id: 'ligacao',
    titulo: 'Recado no telefone',
    emoji: '📞',
    linhas: ['Hi, this is Mark.', 'Please call me back at five.'],
    pergunta: 'O que o Mark pede?',
    opcoes: ['Que você retorne às cinco', 'Que você ligue ao meio-dia', 'Que você mande um e-mail'],
    certa: 0,
    pt: 'Oi, aqui é o Mark. Por favor me retorne às cinco.'
  },
  {
    id: 'reuniao',
    titulo: 'Na reunião',
    emoji: '🗓️',
    linhas: ['The deadline moved to Friday.', 'Please send the report before noon.'],
    pergunta: 'Até quando o relatório precisa chegar?',
    opcoes: ['Antes do meio-dia de sexta', 'Na segunda de manhã', 'No fim do mês'],
    certa: 0,
    pt: 'O prazo foi para sexta. Envie o relatório antes do meio-dia.'
  },
  {
    id: 'farmacia',
    titulo: 'Na farmácia',
    emoji: '💊',
    linhas: ['Take one pill after breakfast.', 'Do not take it on an empty stomach.'],
    pergunta: 'Quando tomar o remédio?',
    opcoes: ['Depois do café da manhã', 'Em jejum', 'Antes de dormir'],
    certa: 0,
    pt: 'Tome um comprimido depois do café. Não tome de estômago vazio.'
  },
  {
    id: 'cafe',
    titulo: 'No café',
    emoji: '☕',
    linhas: ['Your latte is ready at the counter.', 'The muffin will take two minutes.'],
    pergunta: 'O que já está pronto?',
    opcoes: ['O latte', 'O muffin', 'Os dois'],
    certa: 0,
    pt: 'O latte está pronto no balcão. O muffin leva dois minutos.'
  },
  {
    id: 'hotel',
    titulo: 'No hotel',
    emoji: '🏨',
    linhas: ['Breakfast is from seven to ten.', 'The pool closes at eight.'],
    pergunta: 'Até que horas é o café da manhã?',
    opcoes: ['Até as dez', 'Até as oito', 'Até as sete'],
    certa: 0,
    pt: 'O café da manhã é das sete às dez. A piscina fecha às oito.'
  }
];

export function somPorId(id) {
  return SONS.find(s => s.id === id) ?? null;
}

export function clipPorId(id) {
  return CLIPS.find(c => c.id === id) ?? null;
}

export function montarItem(par, lado) {
  const foco = lado === 'b' ? 'b' : 'a';
  return {
    fala: foco === 'b' ? par.falaB : par.falaA,
    rotuloA: par.a,
    rotuloB: par.b,
    certo: foco,
    dica: par.dica
  };
}

export function corrigirClip(clip, indice) {
  return Number(indice) === clip?.certa;
}

export function serieFala(painel, diaIso) {
  const base = new Date(`${diaIso}T12:00:00`);
  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const row = painel?.[chave];
    const n = Number(row?.n) || 0;
    const soma = Number(row?.soma) || 0;
    dias.push({
      data: chave,
      n,
      media: n ? Math.round(soma / n) : null,
      acertos: Number(row?.acertos) || 0,
      respostas: Number(row?.respostas) || 0
    });
  }
  return dias;
}

export function resumoFala(serie) {
  const com = (serie ?? []).filter(d => d.n > 0);
  const n = com.reduce((s, d) => s + d.n, 0);
  const soma = com.reduce((s, d) => s + (d.media ?? 0) * d.n, 0);
  const respostas = com.reduce((s, d) => s + d.respostas, 0);
  const acertos = com.reduce((s, d) => s + d.acertos, 0);
  return {
    dias: com.length,
    treinos: n,
    media: n ? Math.round(soma / n) : null,
    precisao: respostas ? Math.round(acertos / respostas * 100) : null,
    acertos,
    respostas
  };
}
