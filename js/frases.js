// Baralho de frases de sobrevivência e o desafio diário de fala.
// Tudo offline: a agenda Leitner mora no progresso, sem rede e sem chave.

import { CENARIOS, rodadasDo, FRASES_SOMBRA, normalizarFala, pontuarSombra, filaSombra } from './conversa.js';

export const CATEGORIAS = [
  { id: 'repetir', titulo: 'Pedir para repetir', emoji: '🔁', exemplo: 'Could you repeat that?' },
  { id: 'sentido', titulo: 'Pedir o sentido', emoji: '❓', exemplo: 'What do you mean by...?' },
  { id: 'tempo', titulo: 'Ganhar tempo', emoji: '⏳', exemplo: 'Let me think.' },
  { id: 'concordar', titulo: 'Concordar', emoji: '👍', exemplo: 'I agree.' },
  { id: 'discordar', titulo: 'Discordar', emoji: '👎', exemplo: 'I see it differently.' },
  { id: 'interromper', titulo: 'Interromper com educação', emoji: '🙋', exemplo: 'Sorry to interrupt.' }
];

export const FRASES = [
  {
    id: 'repetir-1', cat: 'repetir',
    en: 'Could you repeat that?',
    pt: 'Você pode repetir isso?',
    uso: 'Quando a frase passou e você não ouviu.',
    alt: ['Could you repeat that, please?']
  },
  {
    id: 'repetir-2', cat: 'repetir',
    en: 'Sorry, I did not catch that.',
    pt: 'Desculpe, eu não peguei isso.',
    uso: 'Peça para repetir sem culpar a outra pessoa.',
    alt: ["Sorry, I didn't catch that."]
  },
  {
    id: 'repetir-3', cat: 'repetir',
    en: 'Could you say that again, please?',
    pt: 'Você pode dizer isso de novo, por favor?',
    uso: 'Mais educado quando o lugar é formal.',
    alt: ['Can you say that again, please?']
  },
  {
    id: 'repetir-4', cat: 'repetir',
    en: 'One more time, please.',
    pt: 'Mais uma vez, por favor.',
    uso: 'Curta, quando você já pediu uma vez.',
    alt: ['One more time please.']
  },
  {
    id: 'sentido-1', cat: 'sentido',
    en: 'What do you mean by that?',
    pt: 'O que você quer dizer com isso?',
    uso: 'O clássico What do you mean by...? quando a ideia não ficou clara.',
    alt: ['What do you mean by this?']
  },
  {
    id: 'sentido-2', cat: 'sentido',
    en: 'Could you explain that?',
    pt: 'Você pode explicar isso?',
    uso: 'Peça a explicação inteira, não só uma palavra.',
    alt: ['Can you explain that?']
  },
  {
    id: 'sentido-3', cat: 'sentido',
    en: 'I am not sure I understand.',
    pt: 'Não tenho certeza se entendi.',
    uso: 'Avise que ainda não entrou, e a pessoa reformula.',
    alt: ["I'm not sure I understand."]
  },
  {
    id: 'sentido-4', cat: 'sentido',
    en: 'What does that mean?',
    pt: 'O que isso significa?',
    uso: 'Para uma palavra ou expressão solta.',
    alt: ['What does this mean?']
  },
  {
    id: 'tempo-1', cat: 'tempo',
    en: 'Let me think.',
    pt: 'Deixa eu pensar.',
    uso: 'Ganha um segundo sem ficar em silêncio.',
    alt: ['Let me think about it.']
  },
  {
    id: 'tempo-2', cat: 'tempo',
    en: 'That is a good question.',
    pt: 'Essa é uma boa pergunta.',
    uso: 'Enche o espaço enquanto a resposta chega.',
    alt: ["That's a good question."]
  },
  {
    id: 'tempo-3', cat: 'tempo',
    en: 'How can I put this?',
    pt: 'Como posso dizer isso?',
    uso: 'Quando a frase existe na sua cabeça, mas não em inglês.',
    alt: ['How should I put this?']
  },
  {
    id: 'tempo-4', cat: 'tempo',
    en: 'Just a second.',
    pt: 'Só um segundo.',
    uso: 'Pausa curta: achar a palavra, o papel, o nome.',
    alt: ['Just a moment.']
  },
  {
    id: 'concordar-1', cat: 'concordar',
    en: 'I agree.',
    pt: 'Eu concordo.',
    uso: 'Concordância direta, sem enfeite.',
    alt: ['I agree with you.']
  },
  {
    id: 'concordar-2', cat: 'concordar',
    en: 'That is a good point.',
    pt: 'Esse é um bom ponto.',
    uso: 'Mostra que você ouviu o argumento.',
    alt: ["That's a good point."]
  },
  {
    id: 'concordar-3', cat: 'concordar',
    en: 'Yes, exactly.',
    pt: 'Isso, exatamente.',
    uso: 'Quando a pessoa disse o que você também pensava.',
    alt: ['Exactly.']
  },
  {
    id: 'concordar-4', cat: 'concordar',
    en: 'You are right.',
    pt: 'Você tem razão.',
    uso: 'Cede o ponto com educação.',
    alt: ["You're right."]
  },
  {
    id: 'discordar-1', cat: 'discordar',
    en: 'I see it differently.',
    pt: 'Eu vejo de outro jeito.',
    uso: 'Discorda sem atacar a pessoa.',
    alt: ['I see this differently.']
  },
  {
    id: 'discordar-2', cat: 'discordar',
    en: 'I am not sure about that.',
    pt: 'Não tenho certeza disso.',
    uso: 'Discordância leve, abre espaço para explicar.',
    alt: ["I'm not sure about that."]
  },
  {
    id: 'discordar-3', cat: 'discordar',
    en: 'I do not quite agree.',
    pt: 'Não concordo muito.',
    uso: 'Quase um não, ainda educado.',
    alt: ["I don't quite agree."]
  },
  {
    id: 'discordar-4', cat: 'discordar',
    en: 'That is not how I see it.',
    pt: 'Não é assim que eu vejo.',
    uso: 'Devolve a sua visão sem dizer que o outro está errado.',
    alt: ["That's not how I see it."]
  },
  {
    id: 'interromper-1', cat: 'interromper',
    en: 'Sorry to interrupt.',
    pt: 'Desculpe interromper.',
    uso: 'Abre a interrupção. A frase útil vem em seguida.',
    alt: ['Sorry to interrupt you.']
  },
  {
    id: 'interromper-2', cat: 'interromper',
    en: 'Can I jump in?',
    pt: 'Posso entrar na conversa?',
    uso: 'Em grupo, antes de falar por cima.',
    alt: ['Could I jump in?']
  },
  {
    id: 'interromper-3', cat: 'interromper',
    en: 'Excuse me, may I add something?',
    pt: 'Com licença, posso acrescentar algo?',
    uso: 'A forma mais formal do baralho.',
    alt: ['Excuse me, can I add something?']
  },
  {
    id: 'interromper-4', cat: 'interromper',
    en: 'Before we move on.',
    pt: 'Antes de a gente seguir.',
    uso: 'Segura o assunto que ia passar batido.',
    alt: ['Before we move on, one thing.']
  }
];

export const NOTA_FRASE = 85;
export const MINUTOS_FALA = 5;
export const DURACAO_FALA_MS = MINUTOS_FALA * 60 * 1000;

export function itemDaFrase(f) {
  return {
    en: f.en,
    pt: f.pt,
    alt: f.alt ?? [],
    nota: f.uso
  };
}

export function frasesDaCategoria(id) {
  return FRASES.filter(f => f.cat === id);
}

export function frasePorId(id) {
  return FRASES.find(f => f.id === id) ?? null;
}

export function avaliarFrase(frase, texto) {
  const alvos = [frase?.en, ...(frase?.alt ?? [])].filter(Boolean);
  let melhor = null;
  for (const alvo of alvos) {
    const sombra = pontuarSombra(alvo, texto);
    if (!melhor || sombra.nota > melhor.nota) melhor = sombra;
  }
  if (!melhor) melhor = { nota: 0, partes: [], sobras: [] };
  return {
    ok: melhor.nota >= NOTA_FRASE,
    nota: melhor.nota,
    partes: melhor.partes,
    sobras: melhor.sobras,
    melhor: frase?.en ?? ''
  };
}

function adicionarFrase(saida, vistas, en, pt) {
  if (typeof en !== 'string' || !en.includes(' ')) return false;
  const chave = normalizarFala(en);
  if (!chave || vistas.has(chave)) return false;
  vistas.add(chave);
  saida.push({ en, pt: typeof pt === 'string' ? pt : '' });
  return true;
}

// A sombra do dia a dia reserva as primeiras vagas para frases do baralho
// (as que vencem hoje na frente). O botão do baralho usa só o baralho.
export function escolherSombra({ aprendidas = [], frases = FRASES, vencidas = [], qtd = 5, soBaralho = false } = {}) {
  const saida = [];
  const vistas = new Set();
  const teto = Math.max(0, qtd);
  const reserva = soBaralho ? teto : Math.min(2, teto);
  for (const f of vencidas) {
    if (saida.length >= reserva) break;
    adicionarFrase(saida, vistas, f.en, f.pt);
  }
  for (const f of frases) {
    if (saida.length >= (soBaralho ? teto : reserva)) break;
    adicionarFrase(saida, vistas, f.en, f.pt);
  }
  if (!soBaralho) {
    for (const item of filaSombra(aprendidas)) {
      if (saida.length >= teto) break;
      adicionarFrase(saida, vistas, item.en, item.pt);
    }
  }
  return saida.slice(0, teto);
}

function rngDoDia(dia) {
  let x = 2166136261;
  const texto = String(dia);
  for (let i = 0; i < texto.length; i++) {
    x ^= texto.charCodeAt(i);
    x = Math.imul(x, 16777619);
  }
  x >>>= 0;
  if (!x) x = 1;
  return () => {
    x = (Math.imul(1664525, x) + 1013904223) >>> 0;
    return x / 4294967296;
  };
}

function embaralharCom(rng, lista) {
  const arr = [...lista];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export function montarDesafioFala(dia) {
  const rng = rngDoDia(dia);
  const rodadas = CENARIOS.flatMap(c => rodadasDo(c).map(r => ({
    cenarioId: c.id,
    titulo: c.titulo,
    emoji: c.emoji,
    onde: c.onde,
    npc: { en: r.npc[r.npc.length - 1].en, pt: r.npc[r.npc.length - 1].pt },
    voce: r.voce
  })));
  const dialogo = embaralharCom(rng, rodadas)[0];
  const frases = embaralharCom(rng, FRASES);
  const banco = embaralharCom(rng, FRASES_SOMBRA);
  const frasePasso = f => ({ tipo: 'frase', id: f.id, en: f.en, pt: f.pt, uso: f.uso, alt: f.alt ?? [] });
  const passos = [
    {
      tipo: 'dialogo',
      cenarioId: dialogo.cenarioId,
      titulo: dialogo.titulo,
      emoji: dialogo.emoji,
      onde: dialogo.onde,
      npc: dialogo.npc,
      voce: dialogo.voce
    },
    { tipo: 'sombra', en: frases[0].en, pt: frases[0].pt },
    frasePasso(frases[1]),
    { tipo: 'sombra', en: banco[0].en, pt: banco[0].pt },
    frasePasso(frases[2])
  ];
  return { minutos: MINUTOS_FALA, duracaoMs: DURACAO_FALA_MS, passos };
}

// Completar os passos conta. Se o relógio estourar, ainda conta quando
// o mix (diálogo, sombra e frase) já aconteceu.
export function falaConta(respostas, total, estourou) {
  if (!Array.isArray(respostas) || !respostas.length) return false;
  if (total > 0 && respostas.length >= total) return true;
  if (!estourou) return false;
  const tipos = new Set(respostas.map(r => r?.tipo));
  return tipos.has('dialogo') && tipos.has('sombra') && tipos.has('frase');
}

export function xpDaFala(respostas, conta) {
  const lista = Array.isArray(respostas) ? respostas : [];
  const acertos = lista.filter(r => r?.ok).length;
  return lista.length * 4 + acertos * 6 + (conta ? 12 : 0);
}
