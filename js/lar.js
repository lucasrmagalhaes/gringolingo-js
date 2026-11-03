// Explicar IA para quem não é da área, falar de um furo de segurança,
// contar a rotina de casa e puxar uma conversa livre do dia.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const MODELOS = [
  {
    id: 'instrucao',
    titulo: 'O prompt',
    emoji: '🤖',
    nivel: 'B1',
    onde: 'Alguém de fora pergunta o que é um prompt.',
    rodadas: [
      fala(
        'Ideia',
        'What is a prompt, in plain words?',
        'O que é um prompt, em palavras simples?',
        'Diga que o prompt é o pedido que você escreve para o modelo.',
        'A prompt is the request you write for the model.',
        [
          'a prompt is the request you write for the model',
          'a prompt is the request you give the model',
          'the prompt is the request you write for the model'
        ],
        'Prompt é o pedido. Model é o modelo.'
      ),
      fala(
        'Exemplo',
        'Can you show a simple one?',
        'Pode mostrar um simples?',
        'Diga que pede uma resposta curta.',
        'I will ask it for a short answer.',
        [
          'i will ask it for a short answer',
          'i will ask for a short answer',
          'i ask it for a short answer'
        ],
        'Short answer é uma resposta curta. Ask é pedir.'
      )
    ]
  },
  {
    id: 'invento',
    titulo: 'A alucinação',
    emoji: '🤖',
    nivel: 'B1',
    onde: 'A resposta soou certa, mas não era.',
    rodadas: [
      fala(
        'Ideia',
        'Why did it sound so sure?',
        'Por que soou tão certo?',
        'Diga que ele pode inventar um fato que parece verdade.',
        'It can invent a fact that sounds true.',
        [
          'it can invent a fact that sounds true',
          'it can invent a fact that sounds real',
          'it may invent a fact that sounds true'
        ],
        'Invent é inventar. Sounds true é parece verdade.'
      ),
      fala(
        'Exemplo',
        'What do you do before you share it?',
        'O que você faz antes de passar adiante?',
        'Diga que confere a fonte antes de compartilhar.',
        'I will check the source before I share it.',
        [
          'i will check the source before i share it',
          'i will check the source before sharing it',
          'i check the source before i share it'
        ],
        'Source é a fonte. Share é compartilhar.'
      )
    ]
  },
  {
    id: 'fontes',
    titulo: 'As notas',
    emoji: '🤖',
    nivel: 'B2',
    onde: 'Querem saber como a resposta fica no material de vocês.',
    rodadas: [
      fala(
        'Ideia',
        'How do you keep the answer on our notes?',
        'Como a resposta fica nas nossas notas?',
        'Diga que vocês entregam as próprias notas antes.',
        'We hand it our own notes first.',
        [
          'we hand it our own notes first',
          'we give it our own notes first',
          'we hand it our notes first'
        ],
        'Hand it é entregar para ele. Notes são as notas.'
      ),
      fala(
        'Exemplo',
        'What changes after that?',
        'O que muda depois disso?',
        'Diga que a resposta fica perto dessas notas.',
        'Then the answer stays close to those notes.',
        [
          'then the answer stays close to those notes',
          'the answer stays close to those notes',
          'then the answer stays close to our notes'
        ],
        'Stays close é fica perto. Those notes são essas notas.'
      )
    ]
  }
];

export const FUROS = [
  {
    id: 'ficha',
    titulo: 'O CVE',
    emoji: '🛡️',
    nivel: 'B1',
    onde: 'Apareceu um aviso na biblioteca.',
    rodadas: [
      fala(
        'Aviso',
        'What is this CVE?',
        'O que é este CVE?',
        'Diga que este CVE é um furo conhecido na biblioteca.',
        'This CVE is a known hole in the library.',
        [
          'this cve is a known hole in the library',
          'this cve is a known hole in a library',
          'the cve is a known hole in the library'
        ],
        'CVE é o aviso do furo. Hole é o furo. Library é a biblioteca.'
      ),
      fala(
        'Plano',
        'What will you do first?',
        'O que você faz primeiro?',
        'Diga que lê a nota antes de atualizar.',
        'I will read the note before I upgrade.',
        [
          'i will read the note before i upgrade',
          'i will read the note before the upgrade',
          'i read the note before i upgrade'
        ],
        'Read the note é ler a nota. Upgrade é atualizar.'
      )
    ]
  },
  {
    id: 'remendo',
    titulo: 'O patch',
    emoji: '🛡️',
    nivel: 'B1',
    onde: 'O time pergunta se o patch resolve.',
    rodadas: [
      fala(
        'Aviso',
        'Does the patch fix it?',
        'O patch resolve?',
        'Diga que o patch fecha esse furo.',
        'The patch closes that hole.',
        [
          'the patch closes that hole',
          'the patch closes the hole',
          'this patch closes that hole'
        ],
        'Patch é o remendo. Closes é fecha.'
      ),
      fala(
        'Plano',
        'When do you apply it?',
        'Quando você aplica?',
        'Diga que aplica o patch hoje.',
        'I will apply the patch today.',
        [
          'i will apply the patch today',
          'i will apply this patch today',
          'i apply the patch today'
        ],
        'Apply é aplicar. Today é hoje.'
      )
    ]
  },
  {
    id: 'pacote',
    titulo: 'A dependência',
    emoji: '🛡️',
    nivel: 'B2',
    onde: 'A biblioteca está velha.',
    rodadas: [
      fala(
        'Aviso',
        'The library is old. What is the plan?',
        'A biblioteca está velha. Qual é o plano?',
        'Diga que atualiza esta dependência nesta semana.',
        'I will upgrade this dependency this week.',
        [
          'i will upgrade this dependency this week',
          'i will upgrade the dependency this week',
          'i will update this dependency this week'
        ],
        'Dependency é a dependência. This week é nesta semana.'
      ),
      fala(
        'Plano',
        'How do you know it is safe?',
        'Como você sabe que é seguro?',
        'Diga que os testes ainda passam depois da atualização.',
        'The tests still pass after the upgrade.',
        [
          'the tests still pass after the upgrade',
          'the tests still pass after the update',
          'tests still pass after the upgrade'
        ],
        'Still pass é ainda passam. After the upgrade é depois de atualizar.'
      )
    ]
  }
];

export const ROTINAS = [
  {
    id: 'torrada',
    titulo: 'A manhã',
    emoji: '🏠',
    nivel: 'A2',
    onde: 'Alguém pergunta da manhã em casa.',
    rodadas: [
      fala(
        'Casa',
        'What does your morning at home look like?',
        'Como é a sua manhã em casa?',
        'Diga que faz café antes de as crianças acordarem.',
        'I make coffee before the kids wake up.',
        [
          'i make coffee before the kids wake up',
          'i make coffee before the children wake up',
          'i make the coffee before the kids wake up'
        ],
        'Make coffee é fazer café. Wake up é acordar.'
      ),
      fala(
        'Família',
        'And after that?',
        'E depois?',
        'Diga que depois vocês tomam café juntos.',
        'Then we have breakfast together.',
        [
          'then we have breakfast together',
          'we have breakfast together',
          'then we eat breakfast together'
        ],
        'Breakfast é o café da manhã. Together é juntos.'
      )
    ]
  },
  {
    id: 'jantar',
    titulo: 'O jantar',
    emoji: '🏠',
    nivel: 'A2',
    onde: 'Querem saber da mesa em família.',
    rodadas: [
      fala(
        'Casa',
        'When does the family eat?',
        'Quando a família come?',
        'Diga que vocês jantam juntos às sete.',
        'We have dinner together at seven.',
        [
          'we have dinner together at seven',
          'we have dinner together at 7',
          'we eat dinner together at seven'
        ],
        'Dinner é o jantar. At seven é às sete.'
      ),
      fala(
        'Família',
        'What happens at the table?',
        'O que acontece na mesa?',
        'Diga que a irmã conta uma história da escola.',
        'My sister tells a story from school.',
        [
          'my sister tells a story from school',
          'my sister tells a story about school',
          'my sister tells stories from school'
        ],
        'Tells a story é conta uma história. From school é da escola.'
      )
    ]
  },
  {
    id: 'pratos',
    titulo: 'A noite',
    emoji: '🏠',
    nivel: 'A2',
    onde: 'A casa ainda está acordada depois do jantar.',
    rodadas: [
      fala(
        'Casa',
        'Who cleans up?',
        'Quem arruma?',
        'Diga que lava a louça depois do jantar.',
        'I do the dishes after dinner.',
        [
          'i do the dishes after dinner',
          'i wash the dishes after dinner',
          'i do the dishes after we eat'
        ],
        'Do the dishes é lavar a louça. After dinner é depois do jantar.'
      ),
      fala(
        'Família',
        'How do the kids end the day?',
        'Como as crianças fecham o dia?',
        'Diga que as crianças leem antes de dormir.',
        'The kids read before bed.',
        [
          'the kids read before bed',
          'the children read before bed',
          'the kids read a book before bed'
        ],
        'Before bed é antes de dormir. Read é ler.'
      )
    ]
  }
];

export const PAPOS = [
  {
    id: 'livro',
    titulo: 'O livro',
    emoji: '💬',
    nivel: 'A2',
    onde: 'Um assunto leve para continuar a conversa.',
    rodadas: [
      fala(
        'Tema',
        'Read anything good lately?',
        'Leu algo bom esses dias?',
        'Diga que está lendo um livro curto.',
        'I am reading a short book.',
        [
          'i am reading a short book',
          'i am reading a short novel',
          'i have been reading a short book'
        ],
        'Reading é lendo. A short book é um livro curto.'
      ),
      fala(
        'Acompanha',
        'What is it about?',
        'Sobre o que é?',
        'Diga que a história é sobre uma cidade pequena.',
        'The story is about a small town.',
        [
          'the story is about a small town',
          'it is about a small town',
          'the story is about a little town'
        ],
        'Story é a história. Small town é uma cidade pequena.'
      )
    ]
  },
  {
    id: 'arroz',
    titulo: 'O arroz',
    emoji: '💬',
    nivel: 'A2',
    onde: 'Ontem teve panela em casa.',
    rodadas: [
      fala(
        'Tema',
        'Did you cook last night?',
        'Você cozinhou ontem à noite?',
        'Diga que cozinhou arroz e feijão.',
        'I cooked rice and beans last night.',
        [
          'i cooked rice and beans last night',
          'i cooked rice and beans yesterday night',
          'last night i cooked rice and beans'
        ],
        'Cooked é cozinhou. Rice and beans é arroz e feijão.'
      ),
      fala(
        'Acompanha',
        'Did they like it?',
        'Eles gostaram?',
        'Diga que era simples, mas a família gostou.',
        'It was simple, but the family liked it.',
        [
          'it was simple but the family liked it',
          'it was simple but my family liked it',
          'it was simple and the family liked it'
        ],
        'Simple é simples. Liked it é gostou.'
      )
    ]
  },
  {
    id: 'vizinho',
    titulo: 'O vizinho',
    emoji: '💬',
    nivel: 'A2',
    onde: 'A conversa vai para a porta ao lado.',
    rodadas: [
      fala(
        'Tema',
        'Who lives next door?',
        'Quem mora ao lado?',
        'Diga que o vizinho tem um cachorro pequeno.',
        'My neighbor has a small dog.',
        [
          'my neighbor has a small dog',
          'my neighbour has a small dog',
          'my neighbor has a little dog'
        ],
        'Neighbor é o vizinho. A small dog é um cachorro pequeno.'
      ),
      fala(
        'Acompanha',
        'Do you talk?',
        'Vocês conversam?',
        'Diga que vocês se cumprimentam de manhã.',
        'We say hello in the morning.',
        [
          'we say hello in the morning',
          'we say hi in the morning',
          'we say hello every morning'
        ],
        'Say hello é cumprimentar. In the morning é de manhã.'
      )
    ]
  },
  {
    id: 'planta',
    titulo: 'A planta',
    emoji: '💬',
    nivel: 'A2',
    onde: 'Tem um vaso na janela.',
    rodadas: [
      fala(
        'Tema',
        'What is by the window?',
        'O que tem na janela?',
        'Diga que rega a planta da janela.',
        'I water the plant by the window.',
        [
          'i water the plant by the window',
          'i water the plant near the window',
          'i water a plant by the window'
        ],
        'Water é regar. By the window é na janela.'
      ),
      fala(
        'Acompanha',
        'Does it get light?',
        'Ela pega luz?',
        'Diga que ela pega o sol da manhã.',
        'It gets the morning sun.',
        [
          'it gets the morning sun',
          'it gets the morning light',
          'it gets sun in the morning'
        ],
        'Gets é recebe. Morning sun é o sol da manhã.'
      )
    ]
  },
  {
    id: 'filme',
    titulo: 'O filme',
    emoji: '💬',
    nivel: 'A2',
    onde: 'A noite em casa rendeu uma tela.',
    rodadas: [
      fala(
        'Tema',
        'What did you do after dinner?',
        'O que você fez depois do jantar?',
        'Diga que vocês viram um filme depois do jantar.',
        'We watched a movie after dinner.',
        [
          'we watched a movie after dinner',
          'we watched a film after dinner',
          'we saw a movie after dinner'
        ],
        'Watched a movie é viu um filme. After dinner é depois do jantar.'
      ),
      fala(
        'Acompanha',
        'Was it any good?',
        'Era bom?',
        'Diga que era engraçado, então vocês ficaram acordados.',
        'It was funny, so we stayed up.',
        [
          'it was funny so we stayed up',
          'it was funny so we stayed awake',
          'it was funny and we stayed up'
        ],
        'Funny é engraçado. Stayed up é ficaram acordados.'
      )
    ]
  },
  {
    id: 'caminhada',
    titulo: 'A caminhada',
    emoji: '💬',
    nivel: 'A2',
    onde: 'Sair de casa também entra no papo.',
    rodadas: [
      fala(
        'Tema',
        'Do you get outside?',
        'Você sai de casa?',
        'Diga que caminha depois do almoço.',
        'I take a walk after lunch.',
        [
          'i take a walk after lunch',
          'i go for a walk after lunch',
          'i take a walk after i eat lunch'
        ],
        'Take a walk é caminhar. After lunch é depois do almoço.'
      ),
      fala(
        'Acompanha',
        'Is it far?',
        'É longe?',
        'Diga que o parque fica a dez minutos.',
        'The park is ten minutes away.',
        [
          'the park is ten minutes away',
          'the park is 10 minutes away',
          'it is ten minutes away'
        ],
        'Ten minutes away é a dez minutos. Park é o parque.'
      )
    ]
  }
];

export function modeloPorId(id) {
  return MODELOS.find(c => c.id === id) ?? null;
}

export function furoPorId(id) {
  return FUROS.find(c => c.id === id) ?? null;
}

export function rotinaPorId(id) {
  return ROTINAS.find(c => c.id === id) ?? null;
}

export function avaliarModelo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarFuro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRotina(rodada, texto) {
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

function ordemDoDia(dia, n) {
  const itens = [];
  for (let i = 0; i < n; i++) itens.push(i);
  for (let i = n - 1; i > 0; i--) {
    const j = indiceDoDia(dia, 'ordem' + i, i + 1);
    const atual = itens[i];
    itens[i] = itens[j];
    itens[j] = atual;
  }
  return itens;
}

export function montarPapo(dia) {
  if (typeof dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return null;
  const validos = PAPOS.filter(c => falasDe([c]).length >= 2);
  if (validos.length < 3) return null;
  const escolhidos = ordemDoDia(dia, validos.length).slice(0, 3).map(i => validos[i]);
  const assuntos = [];
  const rodadas = [];
  for (const cena of escolhidos) {
    assuntos.push(cena.titulo);
    const falas = falasDe([cena]).slice(0, 2);
    rodadas.push({ ...falas[0], etapa: 'Tema' });
    rodadas.push({ ...falas[1], etapa: 'Acompanha' });
  }
  return {
    id: 'assuntos',
    titulo: 'Conversa livre',
    emoji: '💬',
    nivel: 'B1',
    onde: 'Três assuntos do dia, cada um com uma pergunta de acompanhamento.',
    assuntos,
    rodadas
  };
}
