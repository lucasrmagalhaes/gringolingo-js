// Estimativa, consenso e atendimento, mais o histórico da fala.
// A nota usa o mesmo tutor das outras cenas. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return {
    etapa,
    npc: { en: npcEn, pt: npcPt },
    missao,
    melhor,
    aceitas,
    dica
  };
}

function chaveDoDia(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

export const ESTIMATIVAS = [
  {
    id: 'doisdias',
    titulo: 'Dois dias',
    emoji: '⏳',
    nivel: 'B1',
    onde: 'O prazo parece curto. Diga a estimativa e a dúvida.',
    rodadas: [
      fala(
        'Prazo',
        'How long will the fix take?',
        'Quanto tempo a correção leva?',
        'Diga que deve levar cerca de dois dias.',
        'It should take about two days.',
        [
          'it should take about two days',
          'it should take around two days',
          'this should take about two days'
        ],
        'It should take about abre a estimativa. About é cerca de.'
      ),
      fala(
        'Dúvida',
        'Are you sure?',
        'Você tem certeza?',
        'Diga que ainda não tem certeza, mas pode conferir amanhã.',
        'I am not sure yet, but I can check tomorrow.',
        [
          'i am not sure yet but i can check tomorrow',
          "i'm not sure yet but i can check tomorrow",
          'i am not sure yet but i will check tomorrow'
        ],
        'I am not sure yet segura a dúvida. But abre o próximo passo.'
      )
    ]
  },
  {
    id: 'umahora',
    titulo: 'Uma hora',
    emoji: '⏳',
    nivel: 'A2',
    onde: 'A correção parece pequena.',
    rodadas: [
      fala(
        'Prazo',
        'When can you look at this?',
        'Quando você olha isto?',
        'Diga que deve levar cerca de uma hora.',
        'It should take about one hour.',
        [
          'it should take about one hour',
          'it should take around one hour',
          'it should take about an hour'
        ],
        'One hour é uma hora. About deixa a folga.'
      ),
      fala(
        'Dúvida',
        'Do you already know the cause?',
        'Você já sabe a causa?',
        'Diga que ainda não tem certeza, mas a correção parece pequena.',
        'I am not sure yet, but the fix looks small.',
        [
          'i am not sure yet but the fix looks small',
          "i'm not sure yet but the fix looks small",
          'i am not sure yet but the fix looks small so far'
        ],
        'Looks small é parece pequena. A dúvida fica na frente.'
      )
    ]
  },
  {
    id: 'semana',
    titulo: 'Uma semana',
    emoji: '⏳',
    nivel: 'B2',
    onde: 'A mudança mexe em mais de uma tela.',
    rodadas: [
      fala(
        'Prazo',
        'How long is this change?',
        'Quanto tempo esta mudança leva?',
        'Diga que deve levar cerca de uma semana.',
        'It should take about a week.',
        [
          'it should take about a week',
          'it should take around a week',
          'this should take about a week'
        ],
        'A week é uma semana. Should take é a estimativa, não a promessa.'
      ),
      fala(
        'Dúvida',
        'Can you commit to Friday?',
        'Você fecha na sexta?',
        'Diga que ainda não tem certeza, mas vai saber na segunda.',
        'I am not sure yet, but I will know on Monday.',
        [
          'i am not sure yet but i will know on monday',
          "i'm not sure yet but i will know on monday",
          'i am not sure yet but i will know by monday'
        ],
        'Will know on Monday é vou saber na segunda. Ainda não é um sim.'
      )
    ]
  }
];

export const CONSENSOS = [
  {
    id: 'segunda',
    titulo: 'Sexta está cedo',
    emoji: '⚖️',
    nivel: 'B1',
    onde: 'O time quer sexta. Você pede segunda.',
    rodadas: [
      fala(
        'Discorda',
        'Can we ship on Friday?',
        'Dá para publicar na sexta?',
        'Diga que vê diferente porque sexta está cedo demais.',
        'I see it differently because Friday is too soon.',
        [
          'i see it differently because friday is too soon',
          'i see it differently because friday is too early',
          'i see this differently because friday is too soon'
        ],
        'I see it differently discorda sem cortar a pessoa. Too soon é cedo demais.'
      ),
      fala(
        'Meio',
        'What would work for you?',
        'O que funcionaria para você?',
        'Peça um meio-termo e publique na segunda.',
        'Can we meet in the middle and ship on Monday?',
        [
          'can we meet in the middle and ship on monday',
          'could we meet in the middle and ship on monday',
          'can we meet in the middle and ship monday'
        ],
        'Meet in the middle é o meio-termo. Monday é a segunda.'
      )
    ]
  },
  {
    id: 'recorte',
    titulo: 'A tela extra',
    emoji: '⚖️',
    nivel: 'B2',
    onde: 'Alguém quer a tela nova agora.',
    rodadas: [
      fala(
        'Discorda',
        'Let us build the extra screen now.',
        'Vamos fazer a tela extra agora.',
        'Discorde porque a tela extra pode esperar.',
        'I disagree because the extra screen can wait.',
        [
          'i disagree because the extra screen can wait',
          'i do not agree because the extra screen can wait',
          'i disagree because the extra screen can wait for now'
        ],
        'Can wait é pode esperar. O motivo vem depois de because.'
      ),
      fala(
        'Meio',
        'So what do we ship?',
        'Então o que a gente publica?',
        'Proponha publicar a lista e deixar o gráfico para depois.',
        'Can we ship the list and leave the chart for later?',
        [
          'can we ship the list and leave the chart for later',
          'could we ship the list and leave the chart for later',
          'can we ship the list and leave the chart until later'
        ],
        'Leave for later é deixar para depois. A lista sai agora.'
      )
    ]
  },
  {
    id: 'quinze',
    titulo: 'Call de 15 minutos',
    emoji: '⚖️',
    nivel: 'B1',
    onde: 'A reunião já está longa.',
    rodadas: [
      fala(
        'Discorda',
        'Should we add another topic?',
        'A gente acrescenta outro assunto?',
        'Diga que não está convencido porque a call já está longa.',
        'I am not convinced because the call is already long.',
        [
          'i am not convinced because the call is already long',
          "i'm not convinced because the call is already long",
          'i am not convinced because this call is already long'
        ],
        'Not convinced é não convencido. Already long é já está longa.'
      ),
      fala(
        'Meio',
        'How do we close this?',
        'Como a gente fecha isto?',
        'Peça um combinado de uma checagem de 15 minutos.',
        'Can we agree on a 15 minute check?',
        [
          'can we agree on a 15 minute check',
          'can we agree on a fifteen minute check',
          'could we agree on a 15 minute check'
        ],
        'Agree on é o consenso. A 15 minute check é uma checagem curta.'
      )
    ]
  }
];

export const ATENDIMENTOS = [
  {
    id: 'cartao',
    titulo: 'Cartão do banco',
    emoji: '📞',
    nivel: 'B1',
    onde: 'O cartão foi cobrado duas vezes.',
    rodadas: [
      fala(
        'Problema',
        'Bank support. How can I help?',
        'Suporte do banco. Como posso ajudar?',
        'Diga que o cartão foi cobrado duas vezes.',
        'My card was charged twice.',
        [
          'my card was charged twice',
          'my card was charged two times',
          'the card was charged twice'
        ],
        'Charged twice é cobrado duas vezes. My card é o cartão.'
      ),
      fala(
        'Detalhe',
        'When did this happen?',
        'Quando isso aconteceu?',
        'Diga que a cobrança foi ontem.',
        'The charge was yesterday.',
        [
          'the charge was yesterday',
          'the charge happened yesterday',
          'it was yesterday'
        ],
        'The charge é a cobrança. Yesterday é ontem.'
      ),
      fala(
        'Pedido',
        'What would you like us to do?',
        'O que você quer que a gente faça?',
        'Peça o estorno da cobrança extra.',
        'Can you refund the extra charge?',
        [
          'can you refund the extra charge',
          'could you refund the extra charge',
          'can you refund the extra charge please'
        ],
        'Refund é estornar. The extra charge é a cobrança a mais.'
      )
    ]
  },
  {
    id: 'atrasou',
    titulo: 'Entrega atrasada',
    emoji: '📞',
    nivel: 'A2',
    onde: 'O pedido devia chegar hoje.',
    rodadas: [
      fala(
        'Problema',
        'Delivery support. What is going on?',
        'Suporte da entrega. O que está acontecendo?',
        'Diga que o pedido está atrasado.',
        'My order is late.',
        [
          'my order is late',
          'my order is late today',
          'the order is late'
        ],
        'Order é o pedido. Late é atrasado.'
      ),
      fala(
        'Detalhe',
        'When was it supposed to arrive?',
        'Quando era para chegar?',
        'Diga que era para chegar hoje.',
        'It was supposed to arrive today.',
        [
          'it was supposed to arrive today',
          'it was supposed to arrive today morning',
          'it should have arrived today'
        ],
        'Supposed to arrive é era para chegar. Today é hoje.'
      ),
      fala(
        'Pedido',
        'How can I help?',
        'Como eu ajudo?',
        'Peça para a pessoa conferir a entrega.',
        'Can you check the delivery?',
        [
          'can you check the delivery',
          'could you check the delivery',
          'can you check on the delivery'
        ],
        'Check the delivery é conferir a entrega.'
      )
    ]
  },
  {
    id: 'reserva',
    titulo: 'Reserva do hotel',
    emoji: '📞',
    nivel: 'B1',
    onde: 'Você chega antes e a reserva está no seu nome.',
    rodadas: [
      fala(
        'Problema',
        'Front desk. Do you have a booking?',
        'Recepção. Você tem uma reserva?',
        'Diga que tem uma reserva para hoje à noite.',
        'I have a reservation for tonight.',
        [
          'i have a reservation for tonight',
          'i have a booking for tonight',
          'i have a reservation tonight'
        ],
        'Reservation é a reserva. Tonight é hoje à noite.'
      ),
      fala(
        'Detalhe',
        'What name is it under?',
        'Em que nome está?',
        'Diga que o nome está na reserva.',
        'The name is on the booking.',
        [
          'the name is on the booking',
          'the name is on the reservation',
          'my name is on the booking'
        ],
        'On the booking é na reserva. O nome já está lá.'
      ),
      fala(
        'Pedido',
        'The room is not ready yet.',
        'O quarto ainda não está pronto.',
        'Pergunte se dá para fazer o check-in um pouco mais cedo.',
        'Can I check in a little early?',
        [
          'can i check in a little early',
          'could i check in a little early',
          'can i check in a bit early'
        ],
        'Check in é entrar no hotel. A little early é um pouco mais cedo.'
      )
    ]
  }
];

export function historicoFala(painel, diaIso, quantidade = 14) {
  if (typeof diaIso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(diaIso)) return [];
  const base = new Date(`${diaIso}T12:00:00`);
  if (Number.isNaN(base.getTime())) return [];
  const pedido = Number(quantidade);
  const n = Number.isFinite(pedido) ? Math.max(1, Math.min(Math.floor(pedido), 30)) : 14;
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const dias = [];
  for (let i = n - 1; i >= 0; i--) {
    const data = new Date(base);
    data.setDate(base.getDate() - i);
    const chave = chaveDoDia(data);
    const row = fonte[chave];
    const treinos = Math.max(0, Number(row?.n) || 0);
    const respostas = Math.max(0, Number(row?.respostas) || 0);
    const acertos = Math.max(0, Number(row?.acertos) || 0);
    const bruto = respostas ? Math.round(acertos / respostas * 100) : null;
    dias.push({
      data: chave,
      treinos,
      precisao: bruto == null ? null : Math.max(0, Math.min(100, bruto))
    });
  }
  return dias;
}

export function rotuloHistorico(dias) {
  const lista = Array.isArray(dias) ? dias : [];
  const com = lista.filter(d => d && d.treinos > 0);
  if (!com.length) return 'Sem treino nestes dias.';
  const ultimo = com[com.length - 1];
  const acerto = ultimo.precisao == null ? 'sem acerto registrado' : `acerto ${ultimo.precisao}%`;
  const diasTxt = `${com.length} dia${com.length > 1 ? 's' : ''} com treino`;
  const treinosTxt = `${ultimo.treinos} treino${ultimo.treinos > 1 ? 's' : ''}`;
  return `${diasTxt}. No último, ${treinosTxt} e ${acerto}.`;
}

export function estimativaPorId(id) {
  return ESTIMATIVAS.find(c => c.id === id) ?? null;
}

export function consensoPorId(id) {
  return CONSENSOS.find(c => c.id === id) ?? null;
}

export function atendimentoPorId(id) {
  return ATENDIMENTOS.find(c => c.id === id) ?? null;
}

export function avaliarEstimativa(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarConsenso(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarAtendimento(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
