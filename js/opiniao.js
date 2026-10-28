// Opinião, descrição de cena e resposta rápida.
// A nota usa o mesmo tutor dos diálogos. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';
import { diasDaSemana } from './fluencia.js';

function fala(npcEn, npcPt, missao, melhor, aceitas, dica) {
  return {
    npc: { en: npcEn, pt: npcPt },
    missao,
    melhor,
    aceitas,
    dica
  };
}

export const OPINIOES = [
  {
    id: 'foco',
    titulo: 'Trabalho remoto',
    emoji: '🏠',
    nivel: 'B1',
    onde: 'Dê um motivo e depois concorde com um porém.',
    rodadas: [
      fala(
        'Do you like working from home?',
        'Você gosta de trabalhar de casa?',
        'Diga que prefere o remoto e dê um motivo.',
        'I prefer remote work because I focus better.',
        [
          'i prefer remote work because i focus better',
          'i like remote work because i focus better',
          'i prefer working from home because i focus better'
        ],
        'Because liga o motivo: prefere o remoto porque foca melhor.'
      ),
      fala(
        'I miss the office, though.',
        'Eu sinto falta do escritório, porém.',
        'Concorde com educação e acrescente um porém.',
        'I agree, but I like the office too.',
        [
          'i agree but i like the office too',
          'i agree but i also like the office',
          'i agree with you but i like the office too'
        ],
        'I agree, but... concorda e acrescenta outra ideia.'
      )
    ]
  },
  {
    id: 'reunioes',
    titulo: 'Reuniões curtas',
    emoji: '🗓️',
    nivel: 'B1',
    onde: 'Defenda reuniões curtas e o que faria depois.',
    rodadas: [
      fala(
        'Should meetings be shorter?',
        'As reuniões deveriam ser mais curtas?',
        'Diga que reuniões curtas são melhores e dê o motivo.',
        'Short meetings are better because they save time.',
        [
          'short meetings are better because they save time',
          'i prefer short meetings because they save time',
          'meetings should be short because they save time'
        ],
        'Because explica por que a reunião curta é melhor.'
      ),
      fala(
        'What would you do after the meeting?',
        'O que você faria depois da reunião?',
        'Concorde e diga que mandaria as notas.',
        'I agree, and I would send notes after.',
        [
          'i agree and i would send notes after',
          'i agree and i would send the notes after',
          'i agree and then i would send notes'
        ],
        'I agree, and... concorda e soma o próximo passo.'
      )
    ]
  },
  {
    id: 'ia',
    titulo: 'IA no código',
    emoji: '🤖',
    nivel: 'B2',
    onde: 'Diga como usa IA e discorde de pular os testes.',
    rodadas: [
      fala(
        'Do you use AI to write code?',
        'Você usa IA para escrever código?',
        'Diga que usa para rascunhar, mas revisa o código.',
        'I use AI to draft, but I review the code.',
        [
          'i use ai to draft but i review the code',
          'i use ai to draft but i review the code myself',
          'i use artificial intelligence to draft but i review the code'
        ],
        'But marca o limite: a IA rascunha e você revisa.'
      ),
      fala(
        'So we can skip the tests, right?',
        'Então podemos pular os testes, certo?',
        'Discorde com educação e dê o motivo.',
        'I disagree because the tests still fail.',
        [
          'i disagree because the tests still fail',
          'i do not agree because the tests still fail',
          'i disagree with that because the tests still fail'
        ],
        'I disagree because... discorda e explica o motivo.'
      )
    ]
  },
  {
    id: 'parecer',
    titulo: 'Code review',
    emoji: '🔍',
    nivel: 'B1',
    onde: 'Opine sobre a função e proponha o próximo passo.',
    rodadas: [
      fala(
        'What do you think of this function?',
        'O que você acha desta função?',
        'Diga que está longa demais e dê o motivo.',
        'I think this function is too long because it does three things.',
        [
          'i think this function is too long because it does three things',
          'this function is too long because it does three things',
          'i think it is too long because it does three things'
        ],
        'I think... because... dá a opinião e o motivo.'
      ),
      fala(
        'Should we leave it like this?',
        'Devemos deixar assim?',
        'Concorde e diga que extrairia uma função.',
        'I agree, and I would extract a function.',
        [
          'i agree and i would extract a function',
          'i agree and i would extract the function',
          'i agree and then i would extract a function'
        ],
        'I agree, and I would... concorda e propõe o próximo passo.'
      )
    ]
  }
];

export const CENAS_FALA = [
  {
    id: 'fila',
    titulo: 'Na fila',
    emoji: '☕',
    nivel: 'A2',
    onde: 'Fila de um café. Diga o que vê.',
    rodadas: [
      fala(
        'What is happening here?',
        'Olhe a cena e diga o que acontece.',
        'Diga o que a pessoa está fazendo.',
        'A person is waiting in line.',
        [
          'a person is waiting in line',
          'someone is waiting in line',
          'a person is standing in line'
        ],
        'Waiting in line é esperar na fila.'
      ),
      fala(
        'What else do you see?',
        'Agora um detalhe da mesma cena.',
        'Diga onde está o cardápio.',
        'The menu is on the wall.',
        [
          'the menu is on the wall',
          'there is a menu on the wall',
          'the menu is on the wall above'
        ],
        'On the wall diz que o cardápio está na parede.'
      )
    ]
  },
  {
    id: 'erro',
    titulo: 'Erro na tela',
    emoji: '💻',
    nivel: 'B1',
    onde: 'Uma tela com problema. Diga o que vê.',
    rodadas: [
      fala(
        'What is happening here?',
        'Olhe a tela e diga o que aparece.',
        'Diga o que a tela mostra.',
        'The screen shows an error.',
        [
          'the screen shows an error',
          'there is an error on the screen',
          'the screen shows an error message'
        ],
        'The screen shows... descreve o que aparece na tela.'
      ),
      fala(
        'What else do you see?',
        'Agora um detalhe da mesma tela.',
        'Diga a cor do botão.',
        'The button is red.',
        [
          'the button is red',
          'a red button is on the screen',
          'the button on the screen is red'
        ],
        'Is red diz a cor. O botão está vermelho.'
      )
    ]
  },
  {
    id: 'banco',
    titulo: 'No banco',
    emoji: '🌳',
    nivel: 'A2',
    onde: 'Um banco no parque. Diga o que vê.',
    rodadas: [
      fala(
        'What is happening here?',
        'Olhe a cena e diga o que acontece.',
        'Diga onde as duas pessoas estão.',
        'Two people are sitting on a bench.',
        [
          'two people are sitting on a bench',
          'two people sit on a bench',
          'there are two people on a bench'
        ],
        'Sitting on a bench é sentar no banco.'
      ),
      fala(
        'What else do you see?',
        'Agora um detalhe da mesma cena.',
        'Diga o que uma pessoa está lendo.',
        'One person is reading a book.',
        [
          'one person is reading a book',
          'a person is reading a book',
          'one of them is reading a book'
        ],
        'Reading a book é ler um livro.'
      )
    ]
  },
  {
    id: 'mesa',
    titulo: 'Na mesa',
    emoji: '📚',
    nivel: 'A2',
    onde: 'Uma mesa de trabalho. Diga o que vê.',
    rodadas: [
      fala(
        'What is happening here?',
        'Olhe a mesa e diga o que tem nela.',
        'Diga o que está sobre a mesa.',
        'There is a laptop on the desk.',
        [
          'there is a laptop on the desk',
          'a laptop is on the desk',
          'there is a computer on the desk'
        ],
        'There is... on the desk apresenta o que está na mesa.'
      ),
      fala(
        'What else do you see?',
        'Agora um detalhe da mesma mesa.',
        'Diga onde está o caderno.',
        'The notebook is next to the laptop.',
        [
          'the notebook is next to the laptop',
          'a notebook is next to the laptop',
          'the notebook is beside the laptop'
        ],
        'Next to diz que o caderno está ao lado do laptop.'
      )
    ]
  }
];

export const SEGUNDOS_RAPIDO = 20;

export const RAPIDOS = [
  {
    id: 'ontem',
    nivel: 'A2',
    pergunta: 'O que você fez ontem?',
    melhor: 'Yesterday I worked.',
    aceitas: ['yesterday i worked', 'i worked yesterday', 'yesterday i worked from home'],
    dica: 'Yesterday abre a frase no passado: Yesterday I worked.'
  },
  {
    id: 'cafe',
    nivel: 'A1',
    pergunta: 'O que você gosta de beber?',
    melhor: 'I like coffee.',
    aceitas: ['i like coffee', 'i love coffee', 'i like coffee a lot'],
    dica: 'I like... diz do que você gosta.'
  },
  {
    id: 'casa',
    nivel: 'A2',
    pergunta: 'Onde você trabalha?',
    melhor: 'I work from home.',
    aceitas: ['i work from home', 'i work at home', 'i am working from home'],
    dica: 'From home é de casa. I work from home.'
  },
  {
    id: 'porque',
    nivel: 'B1',
    pergunta: 'Por que você gosta disso?',
    melhor: 'I like it because it is quiet.',
    aceitas: ['i like it because it is quiet', 'i like it because it is calm', 'because it is quiet'],
    dica: 'Because entrega o motivo na mesma frase.'
  },
  {
    id: 'concordar',
    nivel: 'B1',
    pergunta: 'Como você concorda com alguém?',
    melhor: 'I agree with you.',
    aceitas: ['i agree with you', 'i agree', 'yes i agree with you'],
    dica: 'I agree with you concorda sem ser seco.'
  },
  {
    id: 'stack',
    nivel: 'B2',
    pergunta: 'O que você faz no trabalho?',
    melhor: 'I am a full stack developer.',
    aceitas: ['i am a full stack developer', 'i am a fullstack developer', 'i am a full stack engineer'],
    dica: 'I am a... apresenta o cargo.'
  },
  {
    id: 'hora',
    nivel: 'A2',
    pergunta: 'Que horas é a reunião?',
    melhor: 'The meeting is at nine.',
    aceitas: ['the meeting is at nine', 'the meeting is at 9', 'it is at nine'],
    dica: 'At nine marca a hora. The meeting is at nine.'
  },
  {
    id: 'plano',
    nivel: 'B1',
    pergunta: 'O que você vai fazer amanhã?',
    melhor: 'Tomorrow I will open a pull request.',
    aceitas: ['tomorrow i will open a pull request', 'i will open a pull request tomorrow', 'tomorrow i am going to open a pull request'],
    dica: 'Tomorrow I will... fala do plano de amanhã.'
  }
];

export function opiniaoPorId(id) {
  return OPINIOES.find(item => item.id === id) || null;
}

export function cenaPorId(id) {
  return CENAS_FALA.find(item => item.id === id) || null;
}

export function rapidoPorId(id) {
  return RAPIDOS.find(item => item.id === id) || null;
}

export function avaliarOpiniao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarCena(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarRapido(item, texto) {
  return avaliarResposta(item, texto);
}

export function contarFaladas(painel, diaIso) {
  const datas = diasDaSemana(diaIso);
  let n = 0;
  for (const data of datas) {
    if (data > diaIso) continue;
    n += Number(painel?.[data]?.n) || 0;
  }
  return n;
}

export function lembreteMeta(contagem, meta, diaIso) {
  const feito = Number(contagem) || 0;
  const alvo = Number(meta) || 0;
  if (alvo > 0 && feito >= alvo) return `Meta da semana batida: ${feito} de ${alvo} falas.`;
  const base = new Date(`${diaIso}T12:00:00`);
  const tarde = !Number.isNaN(base.getTime()) && ((base.getDay() + 6) % 7) >= 3;
  const falta = Math.max(0, alvo - feito);
  if (tarde) return `Ainda dá tempo. Faltam ${falta} fala${falta === 1 ? '' : 's'}.`;
  return `${feito} de ${alvo} falas nesta semana.`;
}
