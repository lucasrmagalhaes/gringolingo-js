// System design, código em voz alta, ajuda entre áreas
// e o simulado que encadeia treinos que já existem.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';
import { ENTREVISTA } from './ensaio.js';
import { REQUISITOS, METRICAS } from './briefing.js';
import { DECISOES } from './plantao.js';
import { LINHAS } from './oficina.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const SISTEMAS = [
  {
    id: 'foto',
    titulo: 'O feed',
    emoji: '🏗️',
    nivel: 'B2',
    onde: 'A vaga pede um feed de fotos.',
    rodadas: [
      fala(
        'Pedido',
        'What should this feed do?',
        'O que este feed deve fazer?',
        'Diga que a pessoa envia uma foto e vê o feed.',
        'Users upload a photo and see the feed.',
        [
          'users upload a photo and see the feed',
          'a user uploads a photo and sees the feed',
          'users can upload a photo and see the feed'
        ],
        'Upload é enviar. Feed é a lista de fotos.'
      ),
      fala(
        'Limite',
        'What can wait?',
        'O que pode esperar?',
        'Diga que a busca espera e o feed vem primeiro.',
        'Search can wait. The feed comes first.',
        [
          'search can wait the feed comes first',
          'search can wait and the feed comes first',
          'the search can wait the feed comes first'
        ],
        'Can wait é pode esperar. Comes first é vem primeiro.'
      )
    ]
  },
  {
    id: 'volume',
    titulo: 'A escala',
    emoji: '🏗️',
    nivel: 'B2',
    onde: 'Querem um número de gente.',
    rodadas: [
      fala(
        'Pedido',
        'How many people should it hold?',
        'Quantas pessoas isso deve aguentar?',
        'Diga que aguenta dez mil pessoas por dia.',
        'It should handle ten thousand users a day.',
        [
          'it should handle ten thousand users a day',
          'it should handle 10000 users a day',
          'it should handle 10 thousand users a day'
        ],
        'Handle é aguentar. Ten thousand é dez mil.'
      ),
      fala(
        'Limite',
        'What happens at the busy hour?',
        'O que acontece na hora cheia?',
        'Diga que no pico vocês somam mais um servidor.',
        'At peak we add one more server.',
        [
          'at peak we add one more server',
          'at the peak we add one more server',
          'at peak we add another server'
        ],
        'Peak é o pico. One more server é mais um servidor.'
      )
    ]
  },
  {
    id: 'espera',
    titulo: 'O gargalo',
    emoji: '🏗️',
    nivel: 'B2',
    onde: 'A tela demora para abrir.',
    rodadas: [
      fala(
        'Pedido',
        'Where does it get slow?',
        'Onde fica lento?',
        'Diga que a parte lenta é a consulta no banco.',
        'The slow part is the database query.',
        [
          'the slow part is the database query',
          'the slow part is a database query',
          'the database query is the slow part'
        ],
        'Slow part é a parte lenta. Query é a consulta.'
      ),
      fala(
        'Limite',
        'What would you change?',
        'O que você mudaria?',
        'Diga que colocaria um índice no id da pessoa.',
        'I would add an index on the user id.',
        [
          'i would add an index on the user id',
          'i would add an index on user id',
          'i would add an index to the user id'
        ],
        'Index é o índice. User id é o id da pessoa.'
      )
    ]
  }
];

export const CODIGOS = [
  {
    id: 'margem',
    titulo: 'O vazio',
    emoji: '💻',
    nivel: 'B1',
    onde: 'A lista pode chegar vazia.',
    rodadas: [
      fala(
        'Voz',
        'The list might be empty. What do you say?',
        'A lista pode chegar vazia. O que você diz?',
        'Diga que começa pelo caso vazio.',
        'I will start with the empty case.',
        [
          'i will start with the empty case',
          'i will start with an empty case',
          'let me start with the empty case'
        ],
        'Empty case é o caso vazio. Start with é começar por.'
      ),
      fala(
        'Passo',
        'What does that case return?',
        'O que esse caso devolve?',
        'Diga que uma lista vazia devolve uma lista vazia.',
        'An empty list returns an empty list.',
        [
          'an empty list returns an empty list',
          'an empty list returns nothing',
          'the empty list returns an empty list'
        ],
        'Returns é devolve. Empty list é lista vazia.'
      )
    ]
  },
  {
    id: 'vozalta',
    titulo: 'Em voz alta',
    emoji: '💻',
    nivel: 'B1',
    onde: 'A pessoa da entrevista não vê o seu raciocínio.',
    rodadas: [
      fala(
        'Voz',
        'We cannot see your thinking. What do you say?',
        'A gente não vê o seu raciocínio. O que você diz?',
        'Diga que vai ler este loop em voz alta.',
        'Let me read this loop out loud.',
        [
          'let me read this loop out loud',
          'let me read the loop out loud',
          'i will read this loop out loud'
        ],
        'Out loud é em voz alta. Read é ler.'
      ),
      fala(
        'Passo',
        'What does the loop do?',
        'O que o loop faz?',
        'Diga que este loop conta os itens.',
        'This loop counts the items.',
        [
          'this loop counts the items',
          'the loop counts the items',
          'this loop counts items'
        ],
        'Counts é conta. Items são os itens.'
      )
    ]
  },
  {
    id: 'umpasso',
    titulo: 'Um a mais',
    emoji: '💻',
    nivel: 'B2',
    onde: 'A conta sai maior do que o exemplo.',
    rodadas: [
      fala(
        'Voz',
        'The count is one too high. What do you say?',
        'A conta sai um a mais. O que você diz?',
        'Diga que acha que o erro é um a mais.',
        'I think the bug is an off by one.',
        [
          'i think the bug is an off by one',
          'i think this is an off by one',
          'i think the bug is off by one'
        ],
        'Off by one é errar por um. Bug é o erro.'
      ),
      fala(
        'Passo',
        'How do you check that?',
        'Como você confere isso?',
        'Diga que roda o exemplo com dois itens.',
        'I will run the example with two items.',
        [
          'i will run the example with two items',
          'i will run an example with two items',
          'i will try the example with two items'
        ],
        'Run the example é rodar o exemplo. Two items é dois itens.'
      )
    ]
  }
];

export const COLEGAS = [
  {
    id: 'rascunho',
    titulo: 'O design',
    emoji: '🤝',
    nivel: 'B1',
    onde: 'A tela vazia está sem cara.',
    rodadas: [
      fala(
        'Pedido',
        'The empty screen looks bare. What do you ask design?',
        'A tela vazia está sem cara. O que você pede ao design?',
        'Peça uma olhada neste estado vazio.',
        'Could you review this empty state?',
        [
          'could you review this empty state',
          'could you review the empty state',
          'can you review this empty state'
        ],
        'Review é olhar com calma. Empty state é a tela vazia.'
      ),
      fala(
        'Oferta',
        'What can you do while you wait?',
        'O que você faz enquanto espera?',
        'Diga que ajusta o espaço se mandarem o desenho.',
        'I can adjust the spacing if you send the spec.',
        [
          'i can adjust the spacing if you send the spec',
          'i can adjust the spacing if you send a spec',
          'i can change the spacing if you send the spec'
        ],
        'Spacing é o espaço. Spec é o desenho combinado.'
      )
    ]
  },
  {
    id: 'regressao',
    titulo: 'O QA',
    emoji: '🤝',
    nivel: 'B1',
    onde: 'O teste do login quebrou.',
    rodadas: [
      fala(
        'Pedido',
        'QA saw the login fail. What do you ask?',
        'QA viu o login falhar. O que você pede?',
        'Peça para testar o login de novo.',
        'Could you retest the login?',
        [
          'could you retest the login',
          'could you test the login again',
          'can you retest the login'
        ],
        'Retest é testar de novo. Login é a entrada.'
      ),
      fala(
        'Oferta',
        'They need a test. What do you offer?',
        'Eles precisam de um teste. O que você oferece?',
        'Diga que pode adicionar o teste que falta.',
        'I can add the test you need.',
        [
          'i can add the test you need',
          'i can add the test that you need',
          'i can write the test you need'
        ],
        'Add the test é acrescentar o teste. You need é o que falta.'
      )
    ]
  },
  {
    id: 'paraquem',
    titulo: 'O produto',
    emoji: '🤝',
    nivel: 'B1',
    onde: 'Duas ideias estão prontas.',
    rodadas: [
      fala(
        'Pedido',
        'Two features are ready. What do you ask product?',
        'Duas ideias estão prontas. O que você pergunta ao produto?',
        'Pergunte para qual pessoa isso é.',
        'Which user is this for?',
        [
          'which user is this for',
          'which user is it for',
          'who is this feature for'
        ],
        'Which user pergunta a pessoa. This é esta ideia.'
      ),
      fala(
        'Oferta',
        'You can only ship one. What do you offer?',
        'Só dá para entregar uma. O que você oferece?',
        'Diga que pode cortar a menor.',
        'I can cut the smaller one.',
        [
          'i can cut the smaller one',
          'i can cut the smaller feature',
          'i can drop the smaller one'
        ],
        'Cut é cortar. The smaller one é a menor.'
      )
    ]
  }
];

export function sistemaPorId(id) {
  return SISTEMAS.find(c => c.id === id) ?? null;
}

export function codigoPorId(id) {
  return CODIGOS.find(c => c.id === id) ?? null;
}

export function colegaPorId(id) {
  return COLEGAS.find(c => c.id === id) ?? null;
}

export function avaliarSistema(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCodigo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarColega(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

function indiceDoDia(dia, origem, n) {
  let x = 2166136261;
  const texto = `${dia}:${origem}`;
  for (let i = 0; i < texto.length; i++) {
    x ^= texto.charCodeAt(i);
    x = Math.imul(x, 16777619);
  }
  return (x >>> 0) % n;
}

function falasDe(itens) {
  const saida = [];
  for (const item of itens || []) {
    const rodadas = Array.isArray(item?.rodadas) ? item.rodadas : [];
    for (const rodada of rodadas) {
      if (!rodada || typeof rodada.melhor !== 'string' || !rodada.melhor.includes(' ')) continue;
      if (!Array.isArray(rodada.aceitas) || !rodada.aceitas.length) continue;
      if (!rodada.npc?.en) continue;
      saida.push(rodada);
    }
  }
  return saida;
}

export function montarSimulado(dia) {
  if (typeof dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return null;
  const entrevista = falasDe([ENTREVISTA]);
  if (entrevista.length < 2) return null;
  const grupos = [
    { etapa: 'Abertura', lista: entrevista.slice(0, -1) },
    { etapa: 'Requisito', lista: falasDe(REQUISITOS) },
    { etapa: 'Métrica', lista: falasDe(METRICAS) },
    { etapa: 'Decisão', lista: falasDe(DECISOES) },
    { etapa: 'Código', lista: falasDe(LINHAS) },
    { etapa: 'Fecho', lista: [entrevista[entrevista.length - 1]] }
  ];
  const rodadas = [];
  for (const grupo of grupos) {
    if (!grupo.lista.length) return null;
    const item = grupo.lista[indiceDoDia(dia, grupo.etapa, grupo.lista.length)];
    rodadas.push({ ...item, etapa: grupo.etapa });
  }
  return {
    id: 'simulado',
    titulo: 'Simulado remoto',
    emoji: '🎯',
    nivel: 'B2',
    onde: 'Seis falas de treinos que já existem.',
    rodadas
  };
}

export function notaDoSimulado(notas) {
  const lista = (Array.isArray(notas) ? notas : []).filter(n => Number.isFinite(n));
  if (!lista.length) return 0;
  return Math.round(lista.reduce((s, n) => s + n, 0) / lista.length);
}

export function faixaDoSimulado(nota) {
  const n = Number.isFinite(nota) ? nota : 0;
  if (n >= 90) return 'Pronta para a vaga';
  if (n >= 70) return 'Dá para a call';
  if (n >= 40) return 'Quase na entrevista';
  return 'Vale repetir o simulado';
}
