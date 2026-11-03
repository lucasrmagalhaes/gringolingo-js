// Gráfico na reunião, handoff entre fusos e o elevador de trinta segundos.
// A semana junta vocabulário, frases vencidas e a meta de minutos.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';
import { termosDaFala, avaliarPalavra } from './caderno.js';
import { filaEspacada } from './espaco.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const GRAFICOS = [
  {
    id: 'subida',
    titulo: 'A alta',
    emoji: '📉',
    nivel: 'B1',
    onde: 'A linha do gráfico subiu e o time quer a causa.',
    rodadas: [
      fala(
        'Leitura',
        'What did the line do this week?',
        'O que a linha fez nesta semana?',
        'Diga que a linha subiu nesta semana.',
        'The line went up this week.',
        [
          'the line went up this week',
          'the line moved up this week',
          'that line went up this week'
        ],
        'The line é a linha do gráfico. Went up é subiu.'
      ),
      fala(
        'Causa',
        'Why did it move?',
        'Por que ela andou?',
        'Diga que o botão novo é o motivo da alta.',
        'The new button is why it went up.',
        [
          'the new button is why it went up',
          'the new button is the reason it went up',
          'a new button is why it went up'
        ],
        'The new button é o botão novo. Why it went up é o motivo da alta.'
      )
    ]
  },
  {
    id: 'descida',
    titulo: 'A queda',
    emoji: '📉',
    nivel: 'B1',
    onde: 'A linha caiu depois do almoço.',
    rodadas: [
      fala(
        'Leitura',
        'When did the line fall?',
        'Quando a linha caiu?',
        'Diga que a linha caiu depois do almoço.',
        'The line dropped after lunch.',
        [
          'the line dropped after lunch',
          'the line fell after lunch',
          'that line dropped after lunch'
        ],
        'Dropped é caiu. After lunch é depois do almoço.'
      ),
      fala(
        'Causa',
        'What caused the drop?',
        'O que causou a queda?',
        'Diga que um checkout lento é a causa.',
        'A slow checkout is the cause.',
        [
          'a slow checkout is the cause',
          'the slow checkout is the cause',
          'a slow checkout is the reason'
        ],
        'Checkout é a tela de pagamento. The cause é a causa.'
      )
    ]
  },
  {
    id: 'barras',
    titulo: 'As duas barras',
    emoji: '📉',
    nivel: 'B2',
    onde: 'O gráfico compara esta semana com a anterior.',
    rodadas: [
      fala(
        'Leitura',
        'What are the two bars?',
        'O que são as duas barras?',
        'Diga que o gráfico compara duas semanas.',
        'This chart compares two weeks.',
        [
          'this chart compares two weeks',
          'this chart compares 2 weeks',
          'the chart compares two weeks'
        ],
        'Chart é o gráfico. Two weeks são duas semanas.'
      ),
      fala(
        'Causa',
        'Which bar is lower?',
        'Qual barra é a mais baixa?',
        'Diga que a semana passada é a barra mais baixa.',
        'Last week is the lower bar.',
        [
          'last week is the lower bar',
          'last week is the shorter bar',
          'the last week is the lower bar'
        ],
        'Last week é a semana passada. The lower bar é a barra mais baixa.'
      )
    ]
  }
];

export const HANDOFFS = [
  {
    id: 'bloqueio',
    titulo: 'O que ficou',
    emoji: '🕒',
    nivel: 'B1',
    onde: 'O outro fuso entra e você ainda está na sua tarde.',
    rodadas: [
      fala(
        'Pedido',
        'How do you ask for the open work?',
        'Como você pede o que ficou aberto?',
        'Pergunte o que ainda está aberto do lado deles.',
        'What is still open on your side?',
        [
          'what is still open on your side',
          'what is still open on your end',
          'what remains open on your side'
        ],
        'Still open é ainda aberto. Your side é o lado da outra pessoa.'
      ),
      fala(
        'Nota',
        'Where should they write it?',
        'Onde eles escrevem isso?',
        'Peça para deixar o bloqueio na nota.',
        'Please leave the blocker in the note.',
        [
          'please leave the blocker in the note',
          'please put the blocker in the note',
          'leave the blocker in the note'
        ],
        'Blocker é o bloqueio. The note é a nota do handoff.'
      )
    ]
  },
  {
    id: 'seis',
    titulo: 'Depois das seis',
    emoji: '🕒',
    nivel: 'A2',
    onde: 'Você passa o contexto antes de sair.',
    rodadas: [
      fala(
        'Pedido',
        'What should they know?',
        'O que eles precisam saber?',
        'Diga que o bug do pagamento ainda está aberto.',
        'The payment bug is still open.',
        [
          'the payment bug is still open',
          'the payment bug is still open now',
          'that payment bug is still open'
        ],
        'Payment bug é o bug do pagamento. Still open é ainda aberto.'
      ),
      fala(
        'Nota',
        'Until when are you around?',
        'Até quando você fica?',
        'Diga que fica offline depois das seis.',
        'I will be offline after six.',
        [
          'i will be offline after six',
          'i will be offline after 6',
          'i am offline after six'
        ],
        'Offline é fora do expediente. After six é depois das seis.'
      )
    ]
  },
  {
    id: 'cruzada',
    titulo: 'A janela cruzada',
    emoji: '🕒',
    nivel: 'B1',
    onde: 'A manhã deles é a sua noite.',
    rodadas: [
      fala(
        'Pedido',
        'How do the hours meet?',
        'Como os horários se encontram?',
        'Diga que a manhã deles é a sua noite.',
        'Your morning is my evening.',
        [
          'your morning is my evening',
          'your morning is my night',
          'your mornings are my evening'
        ],
        'Your morning é a manhã deles. My evening é a minha noite.'
      ),
      fala(
        'Nota',
        'When will you read it?',
        'Quando você lê a nota?',
        'Diga que lê a nota antes do standup deles.',
        'I can read the note before your standup.',
        [
          'i can read the note before your standup',
          'i will read the note before your standup',
          'i can read the note before your stand up'
        ],
        'Standup é a reunião curta da manhã. Before é antes.'
      )
    ]
  }
];

export const ELEVADORES = [
  {
    id: 'mobile',
    titulo: 'O time',
    emoji: '🚪',
    nivel: 'A2',
    onde: 'O diretor entra no elevador e pergunta quem você é.',
    rodadas: [
      fala(
        'Quem',
        'What do you lead?',
        'O que você lidera?',
        'Diga que lidera o time de mobile.',
        'I lead the mobile team.',
        [
          'i lead the mobile team',
          'i lead our mobile team',
          'i lead the mobile app team'
        ],
        'I lead é eu lidero. The mobile team é o time do aplicativo.'
      ),
      fala(
        'Agora',
        'Who uses what you build?',
        'Quem usa o que vocês fazem?',
        'Diga que as pessoas abrem o aplicativo no ônibus.',
        'People open our app on the bus.',
        [
          'people open our app on the bus',
          'people open the app on the bus',
          'users open our app on the bus'
        ],
        'On the bus é no ônibus. Our app é o nosso aplicativo.'
      )
    ]
  },
  {
    id: 'umsegundo',
    titulo: 'A espera',
    emoji: '🚪',
    nivel: 'B1',
    onde: 'Ele pergunta no que você está agora.',
    rodadas: [
      fala(
        'Quem',
        'What is this quarter about?',
        'Sobre o que é este trimestre?',
        'Diga que neste trimestre você corta a espera.',
        'This quarter I am cutting the wait.',
        [
          'this quarter i am cutting the wait',
          'this quarter i am cutting the waiting',
          'this quarter i am reducing the wait'
        ],
        'This quarter é este trimestre. The wait é a espera.'
      ),
      fala(
        'Agora',
        'How fast is the home screen?',
        'Quão rápida é a tela inicial?',
        'Diga que a tela inicial abre em um segundo.',
        'The home screen opens in one second.',
        [
          'the home screen opens in one second',
          'the home screen opens in 1 second',
          'our home screen opens in one second'
        ],
        'Home screen é a tela inicial. One second é um segundo.'
      )
    ]
  },
  {
    id: 'folha',
    titulo: 'Uma folha',
    emoji: '🚪',
    nivel: 'B1',
    onde: 'A porta vai abrir e você quer continuar a conversa.',
    rodadas: [
      fala(
        'Quem',
        'How do you offer a follow up?',
        'Como você oferece a continuação?',
        'Peça para enviar uma nota de uma folha.',
        'May I send you a one page note?',
        [
          'may i send you a one page note',
          'may i send you a 1 page note',
          'can i send you a one page note'
        ],
        'One page note é uma nota de uma folha. May I é um pedido educado.'
      ),
      fala(
        'Agora',
        'How long is that note?',
        'Quanto tempo leva essa nota?',
        'Diga que leva trinta segundos para ler.',
        'It takes thirty seconds to read.',
        [
          'it takes thirty seconds to read',
          'it takes 30 seconds to read',
          'the note takes thirty seconds to read'
        ],
        'Thirty seconds são trinta segundos. To read é para ler.'
      )
    ]
  }
];

export const LIMITE_JUNTA = 3;

export function falaDaMeta(minutos, meta) {
  const feito = Math.max(0, Math.floor(Number(minutos) || 0));
  const alvo = Math.max(0, Number(meta) || 0);
  if (alvo > 0 && feito >= alvo) {
    return {
      tipo: 'meta',
      missao: 'Diga que a meta de minutos desta semana está batida.',
      melhor: 'I met the minute goal this week.',
      aceitas: [
        'i met the minute goal this week',
        'i hit the minute goal this week',
        'i met my minute goal this week'
      ],
      dica: 'Met the goal é bateu a meta. This week é nesta semana.'
    };
  }
  return {
    tipo: 'meta',
    missao: 'Diga que ainda deve minutos nesta semana.',
    melhor: 'I still owe minutes this week.',
    aceitas: [
      'i still owe minutes this week',
      'i still owe some minutes this week',
      'i still owe minutes for this week'
    ],
    dica: 'Owe é ainda deve. Minutes é o tempo de fala.'
  };
}

export function montarJunta({ erros, agenda, hoje, minutos, meta } = {}) {
  const palavras = termosDaFala(erros).slice(0, LIMITE_JUNTA).map(item => ({
    tipo: 'palavra',
    en: item.en,
    n: item.n,
    missao: 'Use a palavra numa frase de pelo menos três palavras.'
  }));
  const frases = filaEspacada({ erros, agenda, hoje, limite: LIMITE_JUNTA }).fila.map(item => ({
    tipo: 'frase',
    en: item.en,
    pt: item.pt || '',
    n: item.n,
    caixa: item.caixa,
    missao: item.pt || 'Diga a frase de novo.',
    melhor: item.en,
    aceitas: [item.en],
    dica: 'Esta frase já escapou. Diga de novo, do começo ao fim.'
  }));
  const feito = Math.max(0, Math.floor(Number(minutos) || 0));
  const alvo = Math.max(0, Number(meta) || 0);
  return {
    passos: [...palavras, ...frases, falaDaMeta(feito, alvo)],
    palavras: palavras.length,
    frases: frases.length,
    minutos: feito,
    meta: alvo
  };
}

export function textoDaJunta(plano) {
  const p = Math.max(0, Number(plano?.palavras) || 0);
  const f = Math.max(0, Number(plano?.frases) || 0);
  const minutos = Math.max(0, Number(plano?.minutos) || 0);
  const meta = Math.max(0, Number(plano?.meta) || 0);
  const palavras = p === 1 ? '1 palavra' : `${p} palavras`;
  const frases = f === 1 ? '1 frase' : `${f} frases`;
  const base = `${palavras}, ${frases}, ${minutos} de ${meta} minutos.`;
  if (!p && !f) return `Ainda não há palavra nem frase vencida. ${base}`;
  return base;
}

export function avaliarPassoJunta(passo, texto) {
  if (passo?.tipo === 'palavra') return avaliarPalavra(passo.en, texto);
  return avaliarResposta(passo, texto);
}

export function graficoPorId(id) {
  return GRAFICOS.find(c => c.id === id) ?? null;
}

export function handoffPorId(id) {
  return HANDOFFS.find(c => c.id === id) ?? null;
}

export function elevadorPorId(id) {
  return ELEVADORES.find(c => c.id === id) ?? null;
}

export function avaliarGrafico(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarHandoff(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarElevador(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
