// Diálogos guiados, sombra e o parceiro opcional.
// A chave da API mora só no localStorage e nunca entra no progresso.

import { diagnosticar } from './dicas.js';
import { CENAS_RAMO } from './cenas.js';

const CONTRACOES = new Map([
  ["i'm", 'i am'],
  ["i'd", 'i would'],
  ["i'll", 'i will'],
  ["it's", 'it is'],
  ["that's", 'that is'],
  ["what's", 'what is'],
  ["there's", 'there is'],
  ["let's", 'let us'],
  ["don't", 'do not'],
  ["doesn't", 'does not'],
  ["can't", 'cannot'],
  ["won't", 'will not'],
  ["i've", 'i have'],
  ["you're", 'you are'],
  ["we're", 'we are'],
  ["they're", 'they are'],
  ["he's", 'he is'],
  ["she's", 'she is']
]);

export function normalizarFala(s) {
  return String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(p => CONTRACOES.get(p) ?? p)
    .join(' ');
}

function tokens(s) {
  return normalizarFala(s).split(' ').filter(Boolean);
}

const CENARIOS_LINEARES = [
  {
    id: 'restaurante',
    titulo: 'Pedir comida',
    emoji: '🍔',
    onde: 'No balcão de um café',
    passos: [
      { quem: 'npc', en: 'Hi! What would you like to order?', pt: 'Oi! O que você gostaria de pedir?' },
      {
        quem: 'voce',
        pt: 'Peça um café, com educação.',
        aceitas: ['i would like a coffee', 'i would like a coffee please', 'a coffee please', 'can i have a coffee', 'can i have a coffee please', 'i will have a coffee'],
        melhor: 'I would like a coffee, please.',
        dica: 'Pedido educado usa I would like, e please no fim.'
      },
      { quem: 'npc', en: 'Sure. Anything else?', pt: 'Claro. Mais alguma coisa?' },
      {
        quem: 'voce',
        pt: 'Diga que é só isso.',
        aceitas: ['no thank you', 'no thanks', 'that is all', 'no thank you that is all', 'just the coffee', 'nothing else'],
        melhor: 'No, thank you. That is all.',
        dica: 'No, thank you fecha o pedido sem ser seco.'
      },
      { quem: 'npc', en: 'For here or to go?', pt: 'Para comer aqui ou para levar?' },
      {
        quem: 'voce',
        pt: 'Escolha um dos dois.',
        aceitas: ['for here', 'for here please', 'to go', 'to go please'],
        melhor: 'For here, please.',
        dica: 'For here é para comer aqui. To go é para levar.'
      },
      { quem: 'npc', en: 'That is five dollars, please.', pt: 'São cinco dólares.' },
      {
        quem: 'voce',
        pt: 'Entregue o dinheiro.',
        aceitas: ['here you are', 'here you go', 'here is five dollars'],
        melhor: 'Here you are.',
        dica: 'Here you are entrega o que a pessoa pediu. Here you go também vale.'
      }
    ]
  },
  {
    id: 'hotel',
    titulo: 'Check-in no hotel',
    emoji: '🏨',
    onde: 'Na recepção, à noite',
    passos: [
      { quem: 'npc', en: 'Good evening. Do you have a reservation?', pt: 'Boa noite. Você tem reserva?' },
      {
        quem: 'voce',
        pt: 'Confirme a reserva.',
        aceitas: ['yes i have a reservation', 'yes i do', 'i have a reservation'],
        melhor: 'Yes, I have a reservation.',
        dica: 'Reservation é a reserva. Yes, I have a reservation responde direto.'
      },
      { quem: 'npc', en: 'What name is it under?', pt: 'Em que nome está?' },
      {
        quem: 'voce',
        pt: 'Diga o seu nome.',
        aceitas: ['my name is ana', 'it is under ana', 'the name is ana'],
        melhor: 'My name is Ana.',
        dica: 'My name is. "I call myself" não é o jeito natural.'
      },
      { quem: 'npc', en: 'May I see your passport, please?', pt: 'Posso ver o seu passaporte?' },
      {
        quem: 'voce',
        pt: 'Entregue o documento.',
        aceitas: ['here is my passport', 'here you are', 'sure here it is'],
        melhor: 'Here is my passport.',
        dica: 'Passport é passaporte. Here is my passport entrega o documento.'
      },
      { quem: 'npc', en: 'You are in room 12. Here is your key.', pt: 'Você fica no quarto 12. Aqui está a chave.' },
      {
        quem: 'voce',
        pt: 'Agradeça e pergunte do elevador.',
        aceitas: ['thank you where is the elevator', 'where is the elevator', 'thanks where is the lift', 'where is the lift'],
        melhor: 'Thank you. Where is the elevator?',
        dica: 'Elevator nos Estados Unidos. Lift no Reino Unido. Where is pergunta o lugar.'
      }
    ]
  },
  {
    id: 'entrevista',
    titulo: 'Entrevista de emprego',
    emoji: '💼',
    onde: 'Uma sala pequena, com uma mesa',
    passos: [
      { quem: 'npc', en: 'Tell me about yourself.', pt: 'Fale um pouco sobre você.' },
      {
        quem: 'voce',
        pt: 'Diga o que você faz, em uma frase.',
        aceitas: ['i am a student', 'i am a student and i like to learn', 'i work with computers', 'i am a teacher'],
        melhor: 'I am a student and I like to learn.',
        dica: 'Comece com I am e uma frase curta. Não precisa contar a vida toda.'
      },
      { quem: 'npc', en: 'Why do you want this job?', pt: 'Por que você quer este trabalho?' },
      {
        quem: 'voce',
        pt: 'Diga o motivo.',
        aceitas: ['i want to learn', 'i want to help the team', 'i want to learn and help the team', 'because i like the work'],
        melhor: 'I want to learn and help the team.',
        dica: 'Why pergunta o motivo. A resposta pode começar com I want to ou because.'
      },
      { quem: 'npc', en: 'What are your strengths?', pt: 'Quais são os seus pontos fortes?' },
      {
        quem: 'voce',
        pt: 'Cite um ponto forte.',
        aceitas: ['i am organized', 'i work well with people', 'i am organized and i work well with people', 'i am a fast learner'],
        melhor: 'I am organized and I work well with people.',
        dica: 'Strength é ponto forte. Use I am com um adjetivo.'
      },
      { quem: 'npc', en: 'Do you have any questions for me?', pt: 'Você tem alguma pergunta?' },
      {
        quem: 'voce',
        pt: 'Pergunte o horário.',
        aceitas: ['what time does the day start', 'what are the hours', 'when do i start', 'what time do we start'],
        melhor: 'What time does the day start?',
        dica: 'Na pergunta, o s fica no does. O verbo seguinte vem puro: start, não starts.'
      }
    ]
  },
  {
    id: 'papo',
    titulo: 'Papo furado',
    emoji: '💬',
    onde: 'No corredor, com um vizinho',
    passos: [
      { quem: 'npc', en: 'Hey! How are you?', pt: 'Ei! Como você está?' },
      {
        quem: 'voce',
        pt: 'Responda e devolva a pergunta.',
        aceitas: ['i am fine', 'i am fine thanks', 'i am good', 'i am fine thanks and you', 'i am good and you'],
        melhor: 'I am fine, thanks. And you?',
        dica: 'How are you se responde com I am, não com I have. And you devolve a pergunta.'
      },
      { quem: 'npc', en: 'Nice weather today, right?', pt: 'Tempo bom hoje, né?' },
      {
        quem: 'voce',
        pt: 'Comente o clima.',
        aceitas: ['yes it is sunny', 'it is sunny', 'yes it is nice', 'it is a nice day'],
        melhor: 'Yes, it is sunny.',
        dica: 'O clima pede it: it is sunny. Sem o it a frase fica capenga.'
      },
      { quem: 'npc', en: 'Any plans for the weekend?', pt: 'Planos para o fim de semana?' },
      {
        quem: 'voce',
        pt: 'Diga um plano.',
        aceitas: ['i am going to the park', 'i will go to the park', 'nothing much', 'i am free'],
        melhor: 'I am going to the park.',
        dica: 'Plano já marcado usa I am going to. I will é decisão tomada agora.'
      },
      { quem: 'npc', en: 'Sounds good. See you later?', pt: 'Parece bom. Até mais?' },
      {
        quem: 'voce',
        pt: 'Despeça-se.',
        aceitas: ['see you later', 'see you', 'bye', 'sounds good see you later'],
        melhor: 'See you later.',
        dica: 'See you later é até mais. See you soon é até logo.'
      }
    ]
  },
  {
    id: 'caminho',
    titulo: 'Pedir caminho',
    emoji: '🗺️',
    onde: 'Na calçada, perto de um banco',
    passos: [
      { quem: 'npc', en: 'Hello. You look lost. Can I help you?', pt: 'Olá. Você parece perdido. Posso ajudar?' },
      {
        quem: 'voce',
        pt: 'Peça a estação.',
        aceitas: ['where is the station', 'yes please where is the station', 'where is the train station', 'excuse me where is the station'],
        melhor: 'Yes, please. Where is the station?',
        dica: 'Where is pergunta lugar. Station é estação. Excuse me antes deixa educado.'
      },
      { quem: 'npc', en: 'Go straight and turn left at the bank.', pt: 'Siga reto e vire à esquerda no banco.' },
      {
        quem: 'voce',
        pt: 'Repita a instrução para confirmar.',
        aceitas: ['turn left at the bank', 'left at the bank', 'so i turn left at the bank', 'turn left'],
        melhor: 'Turn left at the bank?',
        dica: 'Repetir a instrução confirma que você ouviu. Left é esquerda. Right é direita.'
      },
      { quem: 'npc', en: 'Yes. It is about five minutes on foot.', pt: 'Isso. Uns cinco minutos a pé.' },
      {
        quem: 'voce',
        pt: 'Pergunte se é longe.',
        aceitas: ['is it far', 'is it far from here', 'how far is it'],
        melhor: 'Is it far?',
        dica: 'Far é longe. Is it far? é a pergunta curta.'
      },
      { quem: 'npc', en: 'No, it is close. You will see a big sign.', pt: 'Não, é perto. Você vai ver uma placa grande.' },
      {
        quem: 'voce',
        pt: 'Agradeça a ajuda.',
        aceitas: ['thank you', 'thank you for your help', 'thanks for your help', 'thank you so much'],
        melhor: 'Thank you for your help.',
        dica: 'Thank you for agradece por algo. For your help fecha o favor.'
      }
    ]
  }
];

export const CENARIOS = [...CENARIOS_LINEARES, ...CENAS_RAMO];

export const IDS_CINCO = CENARIOS_LINEARES.map(c => c.id);
export const IDS_CENARIOS = CENARIOS.map(c => c.id);

export function cenarioPorId(id) {
  return CENARIOS.find(c => c.id === id) ?? null;
}

export function noDaCena(cenario, id) {
  return cenario?.nos?.[id] ?? null;
}

export function rodadasDo(cenario) {
  const rodadas = [];
  let npc = [];
  for (const passo of cenario?.passos ?? []) {
    if (passo.quem === 'npc') npc.push(passo);
    else {
      rodadas.push({ npc, voce: passo });
      npc = [];
    }
  }
  return rodadas;
}

export function avaliarEscolha(opcao, texto) {
  const aval = avaliarResposta(opcao, texto);
  return { ...aval, segue: opcao?.segue || null, rotulo: opcao?.rotulo || '' };
}

export function avaliarResposta(passo, texto) {
  const dita = String(texto ?? '').trim();
  const dada = normalizarFala(dita);
  const melhor = passo?.melhor || '';
  const aceitas = [melhor, ...(passo?.aceitas ?? [])].map(normalizarFala).filter(Boolean);
  if (!dada) {
    return {
      ok: false,
      quase: false,
      nota: 0,
      melhor,
      dita,
      tutor: diagnosticar({ dada: '', certa: melhor, nota: passo?.dica || '' })
    };
  }
  if (aceitas.includes(dada)) {
    return { ok: true, quase: false, nota: 100, melhor, dita, tutor: null };
  }
  const tutor = diagnosticar({
    dada: dita,
    certa: melhor,
    alternativas: passo?.aceitas,
    nota: passo?.dica || ''
  });
  const quase = !!tutor?.aceitar;
  const sombra = pontuarSombra(melhor, dita);
  return {
    ok: quase,
    quase,
    nota: quase ? 80 : sombra.nota,
    melhor,
    dita,
    tutor
  };
}

export function escolherTentativa(passo, alternativas) {
  const lista = (alternativas ?? []).map(t => String(t ?? '').trim()).filter(Boolean);
  if (!lista.length) return avaliarResposta(passo, '');
  let melhor = avaliarResposta(passo, lista[0]);
  for (const texto of lista.slice(1)) {
    const atual = avaliarResposta(passo, texto);
    if (atual.nota > melhor.nota) melhor = atual;
  }
  return melhor;
}

export function pontuarSombra(alvo, dito) {
  const a = tokens(alvo);
  const b = tokens(dito);
  if (!a.length) return { nota: 0, partes: [], sobras: b };
  const casados = new Set();
  let cursor = 0;
  const partes = a.map(t => {
    const k = b.indexOf(t, cursor);
    if (k === -1) return { t, ok: false };
    casados.add(k);
    cursor = k + 1;
    return { t, ok: true };
  });
  const acertos = partes.filter(p => p.ok).length;
  const sobras = b.filter((_, i) => !casados.has(i));
  const penalidade = Math.min(acertos, sobras.length * 0.5);
  const nota = Math.max(0, Math.round(((acertos - penalidade) / a.length) * 100));
  return { nota, partes, sobras };
}

export const FRASES_SOMBRA = [
  { en: 'good morning', pt: 'bom dia' },
  { en: 'I would like a coffee', pt: 'eu gostaria de um café' },
  { en: 'where is the station', pt: 'onde fica a estação' },
  { en: 'my name is Ana', pt: 'meu nome é Ana' },
  { en: 'see you later', pt: 'até mais' },
  { en: 'how are you', pt: 'como você está' },
  { en: 'I am fine', pt: 'eu estou bem' },
  { en: 'thank you for your help', pt: 'obrigado pela ajuda' },
  { en: 'can you help me', pt: 'você pode me ajudar' },
  { en: 'the weather is nice', pt: 'o tempo está bom' },
  { en: 'turn left at the bank', pt: 'vire à esquerda no banco' },
  { en: 'I have a reservation', pt: 'eu tenho uma reserva' }
];

export function filaSombra(aprendidas = []) {
  const saida = [];
  const vistas = new Set();
  const add = (en, pt) => {
    if (typeof en !== 'string' || !en.includes(' ')) return;
    const chave = normalizarFala(en);
    if (!chave || vistas.has(chave)) return;
    vistas.add(chave);
    saida.push({ en, pt: typeof pt === 'string' ? pt : '' });
  };
  for (const item of aprendidas) {
    const pt = Array.isArray(item?.pt) ? item.pt[0] : item?.pt;
    add(item?.en, pt);
  }
  for (const item of FRASES_SOMBRA) add(item.en, item.pt);
  return saida;
}

export function montarRodada(fila, qtd = 5) {
  return (fila ?? []).slice(0, qtd);
}

export const MODELO_PADRAO = 'gemini-2.5-flash';
const CHAVE_IA = 'gringolingo:ia';
const CHAVE_PAPO = 'gringolingo:papo';

function iaVazia() {
  return { ligada: false, chave: '', modelo: MODELO_PADRAO };
}

export function lerIa() {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE_IA) || 'null');
    if (!bruto || typeof bruto !== 'object') return iaVazia();
    return {
      ligada: bruto.ligada === true,
      chave: typeof bruto.chave === 'string' ? bruto.chave : '',
      modelo: typeof bruto.modelo === 'string' && bruto.modelo.trim() ? bruto.modelo.trim() : MODELO_PADRAO
    };
  } catch {
    return iaVazia();
  }
}

export function salvarIa(parcial = {}) {
  const atual = lerIa();
  const prox = {
    ligada: parcial.ligada != null ? !!parcial.ligada : atual.ligada,
    chave: parcial.chave != null ? String(parcial.chave).trim() : atual.chave,
    modelo: parcial.modelo != null ? (String(parcial.modelo).trim() || MODELO_PADRAO) : atual.modelo
  };
  if (prox.ligada && prox.chave.length < 20) prox.ligada = false;
  localStorage.setItem(CHAVE_IA, JSON.stringify(prox));
  return prox;
}

export function apagarIa() {
  localStorage.removeItem(CHAVE_IA);
}

export function iaPronta() {
  const c = lerIa();
  return c.ligada === true && c.chave.length >= 20;
}

export function lerPapo() {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE_PAPO) || '[]');
    if (!Array.isArray(lista)) return [];
    return lista
      .filter(m => m && (m.papel === 'voce' || m.papel === 'louro') && typeof m.texto === 'string')
      .slice(-20)
      .map(m => ({
        papel: m.papel,
        texto: m.texto.slice(0, 800),
        correcao: typeof m.correcao === 'string' ? m.correcao.slice(0, 400) : '',
        melhor: typeof m.melhor === 'string' ? m.melhor.slice(0, 400) : ''
      }));
  } catch {
    return [];
  }
}

export function salvarPapo(lista) {
  localStorage.setItem(CHAVE_PAPO, JSON.stringify((lista ?? []).slice(-20)));
}

export function apagarPapo() {
  localStorage.removeItem(CHAVE_PAPO);
}

export function limparTraco(s) {
  return String(s ?? '').replace(/\u2014/g, ', ').replace(/\u2013/g, '-');
}

export function separarResposta(texto) {
  const linhas = limparTraco(texto).split('\n').map(l => l.trim()).filter(Boolean);
  const correcao = (linhas.find(l => /^correcao\s*:/i.test(l)) || '').replace(/^correcao\s*:/i, '').trim();
  const melhor = (linhas.find(l => /^melhor\s*:/i.test(l)) || '').replace(/^melhor\s*:/i, '').trim();
  const fala = linhas.filter(l => !/^correcao\s*:/i.test(l) && !/^melhor\s*:/i.test(l)).join(' ').trim();
  return { fala, correcao, melhor };
}

export function urlDoModelo(modelo) {
  const nome = String(modelo || MODELO_PADRAO).replace(/[^a-zA-Z0-9._-]/g, '') || MODELO_PADRAO;
  return 'https://generativelanguage.googleapis.com/v1beta/models/' + nome + ':generateContent';
}

export function montarCorpoIa({ nivel, titulo, historico, mensagem }) {
  const sistema = [
    'You are Louro, a friendly English conversation partner in a learning app.',
    `The learner is level ${nivel} (${titulo}). Keep the English at that level.`,
    'Reply with a short spoken line in English, two sentences at most.',
    'Then add exactly two lines:',
    'CORRECAO: one short note in Brazilian Portuguese about their last message. If it was fine, say that it was fine.',
    'MELHOR: a natural English version of what they meant.',
    'Never use an em dash.'
  ].join(' ');
  const contents = [];
  for (const m of historico ?? []) {
    if (!m?.texto) continue;
    contents.push({
      role: m.papel === 'voce' ? 'user' : 'model',
      parts: [{ text: m.texto }]
    });
  }
  contents.push({ role: 'user', parts: [{ text: String(mensagem ?? '') }] });
  return {
    systemInstruction: { parts: [{ text: sistema }] },
    contents,
    generationConfig: { temperature: 0.6, maxOutputTokens: 400 }
  };
}

export function mensagemDeErroIa(status) {
  if (status === 400 || status === 401 || status === 403) {
    return 'A chave não foi aceita. Confira a chave e o nome do modelo no Google AI Studio.';
  }
  if (status === 429) return 'Muitos pedidos agora. Espera um pouco e tenta de novo.';
  return 'Não consegui falar com o parceiro. Sem rede, os diálogos e a sombra continuam aqui.';
}

export async function pedirParceiro({ chave, modelo, nivel, titulo, historico, mensagem, fetchImpl }) {
  const fetchFn = fetchImpl || fetch;
  const resp = await fetchFn(urlDoModelo(modelo), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': chave
    },
    body: JSON.stringify(montarCorpoIa({ nivel, titulo, historico, mensagem }))
  });
  if (!resp.ok) {
    const erro = new Error('falha ' + resp.status);
    erro.status = resp.status;
    throw erro;
  }
  const json = await resp.json();
  const texto = json?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') || '';
  return separarResposta(texto);
}
