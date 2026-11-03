// Contraste para o design, pedido de ajuda no fórum e visto com o RH.
// O mês lê o painel deste aparelho. A nota usa o mesmo tutor.

import { avaliarResposta } from './conversa.js';
import { diasDaSemana } from './fluencia.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const UXS = [
  {
    id: 'contraste',
    titulo: 'O cinza',
    emoji: '🎨',
    nivel: 'B1',
    onde: 'O texto cinza some no fundo branco.',
    rodadas: [
      fala(
        'Decisão',
        'Is this gray easy to read?',
        'Esse cinza é fácil de ler?',
        'Diga que este texto cinza falha no contraste.',
        'This gray text fails the contrast check.',
        [
          'this gray text fails the contrast check',
          'the gray text fails the contrast check',
          'this grey text fails the contrast check'
        ],
        'Gray text é o texto cinza. Contrast check é a checagem de contraste.'
      ),
      fala(
        'Motivo',
        'What should we change?',
        'O que a gente deve mudar?',
        'Peça um cinza mais escuro no branco.',
        'Please use a darker gray on white.',
        [
          'please use a darker gray on white',
          'please use a darker grey on white',
          'use a darker gray on white'
        ],
        'Darker é mais escuro. On white é em cima do branco.'
      )
    ]
  },
  {
    id: 'anel',
    titulo: 'O foco',
    emoji: '🎨',
    nivel: 'B1',
    onde: 'Quem usa teclado precisa ver onde está.',
    rodadas: [
      fala(
        'Decisão',
        'Can we hide the focus outline?',
        'Dá para esconder o contorno do foco?',
        'Diga que o foco do teclado precisa continuar visível.',
        'The keyboard focus must stay visible.',
        [
          'the keyboard focus must stay visible',
          'keyboard focus must stay visible',
          'the keyboard focus must remain visible'
        ],
        'Keyboard focus é o foco do teclado. Visible é visível.'
      ),
      fala(
        'Motivo',
        'How should the button look?',
        'Como o botão deve aparecer?',
        'Peça um anel em cada botão.',
        'A ring should stay on every button.',
        [
          'a ring should stay on every button',
          'a ring should stay on each button',
          'keep a ring on every button'
        ],
        'A ring é o anel em volta. Every button é cada botão.'
      )
    ]
  },
  {
    id: 'rotulo',
    titulo: 'O rótulo',
    emoji: '🎨',
    nivel: 'A2',
    onde: 'O ícone está sozinho, sem texto.',
    rodadas: [
      fala(
        'Decisão',
        'Is the icon enough?',
        'O ícone basta?',
        'Diga que este ícone precisa de um rótulo.',
        'This icon needs a text label.',
        [
          'this icon needs a text label',
          'this icon needs a label',
          'the icon needs a text label'
        ],
        'Icon é o ícone. Text label é o rótulo escrito.'
      ),
      fala(
        'Motivo',
        'Why add words?',
        'Por que acrescentar palavras?',
        'Diga que um leitor de tela não lê a figura sozinha.',
        'A screen reader cannot read the picture alone.',
        [
          'a screen reader cannot read the picture alone',
          'a screen reader cannot read the picture by itself',
          'the screen reader cannot read the picture alone'
        ],
        'Screen reader é o leitor de tela. Alone é sozinha.'
      )
    ]
  }
];

export const FORUNS = [
  {
    id: 'listaforum',
    titulo: 'A lista vazia',
    emoji: '📣',
    nivel: 'B1',
    onde: 'A lista continua vazia depois de salvar.',
    rodadas: [
      fala(
        'Problema',
        'What is going wrong?',
        'O que está dando errado?',
        'Diga que a lista continua vazia depois que você salva.',
        'The list stays empty after I save.',
        [
          'the list stays empty after i save',
          'the list stays empty after i save it',
          'this list stays empty after i save'
        ],
        'The list é a lista. After I save é depois que eu salvo.'
      ),
      fala(
        'Tentativa',
        'What did you try?',
        'O que você já tentou?',
        'Diga que já tentou um refresh forçado.',
        'I already tried a hard refresh.',
        [
          'i already tried a hard refresh',
          'i already tried a hard refresh of the page',
          'i have already tried a hard refresh'
        ],
        'Already tried é já tentei. Hard refresh é recarregar sem o cache da página.'
      )
    ]
  },
  {
    id: 'cachevelho',
    titulo: 'A página antiga',
    emoji: '📣',
    nivel: 'B1',
    onde: 'A página antiga volta depois da publicação.',
    rodadas: [
      fala(
        'Problema',
        'What do you see after the deploy?',
        'O que você vê depois da publicação?',
        'Diga que a página antiga volta depois de uma publicação.',
        'The old page comes back after a deploy.',
        [
          'the old page comes back after a deploy',
          'the old page comes back after deploy',
          'the old page returns after a deploy'
        ],
        'The old page é a página antiga. Comes back é volta.'
      ),
      fala(
        'Tentativa',
        'Did you change anything locally?',
        'Você mudou alguma coisa aí?',
        'Diga que já limpou o cache do navegador.',
        'I already cleared the browser cache.',
        [
          'i already cleared the browser cache',
          'i have already cleared the browser cache',
          'i already cleared the cache'
        ],
        'Cleared é limpei. Browser cache é o cache do navegador.'
      )
    ]
  },
  {
    id: 'outronav',
    titulo: 'O segundo clique',
    emoji: '📣',
    nivel: 'B2',
    onde: 'O botão não faz nada na segunda vez.',
    rodadas: [
      fala(
        'Problema',
        'When does the button fail?',
        'Quando o botão falha?',
        'Diga que o botão não faz nada no segundo clique.',
        'The button does nothing on the second click.',
        [
          'the button does nothing on the second click',
          'the button does nothing on the 2nd click',
          'this button does nothing on the second click'
        ],
        'Does nothing é não faz nada. Second click é o segundo clique.'
      ),
      fala(
        'Tentativa',
        'Did you try another machine?',
        'Você tentou outra máquina?',
        'Diga que já tentou outro navegador.',
        'I already tried another browser.',
        [
          'i already tried another browser',
          'i have already tried another browser',
          'i already tried a different browser'
        ],
        'Another browser é outro navegador. Already tried é já tentei.'
      )
    ]
  }
];

export const VISTOS = [
  {
    id: 'pedidovisto',
    titulo: 'O pedido',
    emoji: '🛂',
    nivel: 'B1',
    onde: 'A vaga pede visto de trabalho.',
    rodadas: [
      fala(
        'Pedido',
        'What do you need from us?',
        'O que você precisa da gente?',
        'Diga que precisa de um visto de trabalho para esta vaga.',
        'I need a work visa for this role.',
        [
          'i need a work visa for this role',
          'i need a work visa for the role',
          'i need a visa for this role'
        ],
        'Work visa é o visto de trabalho. This role é esta vaga.'
      ),
      fala(
        'Detalhe',
        'When can you start?',
        'Quando você pode começar?',
        'Diga que a data de início depende do visto.',
        'The start date depends on the visa.',
        [
          'the start date depends on the visa',
          'the start date depends on my visa',
          'my start date depends on the visa'
        ],
        'Start date é a data de início. Depends on é depende de.'
      )
    ]
  },
  {
    id: 'tresmeses',
    titulo: 'Três meses',
    emoji: '🛂',
    nivel: 'B2',
    onde: 'A mudança de país pede tempo.',
    rodadas: [
      fala(
        'Pedido',
        'Could you move for this role?',
        'Você mudaria por esta vaga?',
        'Diga que pode se mudar em três meses.',
        'I can relocate in three months.',
        [
          'i can relocate in three months',
          'i can relocate in 3 months',
          'i could relocate in three months'
        ],
        'Relocate é mudar de país. Three months são três meses.'
      ),
      fala(
        'Detalhe',
        'How often could you visit?',
        'Com que frequência você poderia visitar?',
        'Diga que pode visitar o escritório uma vez por trimestre.',
        'I can visit the office once a quarter.',
        [
          'i can visit the office once a quarter',
          'i can visit the office once each quarter',
          'i could visit the office once a quarter'
        ],
        'Once a quarter é uma vez por trimestre. The office é o escritório.'
      )
    ]
  },
  {
    id: 'brasilremoto',
    titulo: 'A partir do Brasil',
    emoji: '🛂',
    nivel: 'B1',
    onde: 'O trabalho pode ficar remoto.',
    rodadas: [
      fala(
        'Pedido',
        'Where would you work from?',
        'De onde você trabalharia?',
        'Diga que trabalharia remoto a partir do Brasil.',
        'I would work remotely from Brazil.',
        [
          'i would work remotely from brazil',
          'i can work remotely from brazil',
          'i would work remote from brazil'
        ],
        'Remotely é de longe. From Brazil é a partir do Brasil.'
      ),
      fala(
        'Detalhe',
        'How much overlap can you offer?',
        'Quanta sobreposição você pode oferecer?',
        'Diga que pode sobrepor quatro horas com o time.',
        'I can overlap four hours with your team.',
        [
          'i can overlap four hours with your team',
          'i can overlap 4 hours with your team',
          'i can overlap four hours with the team'
        ],
        'Overlap é a sobreposição de horário. Four hours são quatro horas.'
      )
    ]
  }
];

export function uxPorId(id) {
  return UXS.find(c => c.id === id) ?? null;
}

export function forumPorId(id) {
  return FORUNS.find(c => c.id === id) ?? null;
}

export function vistoPorId(id) {
  return VISTOS.find(c => c.id === id) ?? null;
}

export function avaliarUx(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarForum(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarVisto(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function isoDe(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

function deslocarIso(iso, dias) {
  const base = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(base.getTime())) return '';
  base.setDate(base.getDate() + dias);
  return isoDe(base);
}

function semanaVazia(inicio) {
  return { inicio, nota: null, minutos: 0, muletas: 0, treinos: 0 };
}

function somarSemanaAte(painel, inicio, ate) {
  const dias = diasDaSemana(inicio);
  let soma = 0;
  let n = 0;
  let segundos = 0;
  let muletas = 0;
  for (const dia of dias) {
    if (ate && dia > ate) continue;
    const row = painel?.[dia];
    if (!row) continue;
    soma += Number(row.soma) || 0;
    n += Number(row.n) || 0;
    segundos += Number(row.segundos) || 0;
    muletas += Number(row.muletas) || 0;
  }
  return {
    inicio,
    nota: n ? Math.round(soma / n) : null,
    minutos: Math.floor(segundos / 60),
    muletas,
    treinos: n
  };
}

export function montarMes(painel, diaIso) {
  const segunda = diasDaSemana(diaIso)[0] || '';
  if (!segunda) return [semanaVazia(''), semanaVazia(''), semanaVazia(''), semanaVazia('')];
  const semanas = [];
  for (let i = 3; i >= 0; i--) semanas.push(somarSemanaAte(painel, deslocarIso(segunda, -7 * i), diaIso));
  return semanas;
}

export function rotuloSemana(iso) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!partes) return 'Semana sem data';
  const mes = MESES[Number(partes[2]) - 1] || '';
  return `Semana de ${Number(partes[3])} de ${mes}`;
}

function textoConta(n, um, varios) {
  return `${n} ${n === 1 ? um : varios}`;
}

export function textoDaSemana(semana) {
  const nota = semana?.nota == null ? 'Sem nota nesta semana.' : `Nota ${semana.nota}.`;
  const minutos = textoConta(Number(semana?.minutos) || 0, 'minuto', 'minutos');
  const muletas = textoConta(Number(semana?.muletas) || 0, 'preenchimento', 'preenchimentos');
  return `${nota} ${minutos}, ${muletas}.`;
}

export function textoDoMes(plano) {
  const lista = Array.isArray(plano) ? plano : [];
  const atual = lista[lista.length - 1];
  const tem = lista.some(s => s && (s.treinos || s.minutos || s.muletas));
  if (!tem || !atual) return 'Ainda não há nota neste mês. 0 minutos, 0 preenchimentos.';
  const nota = atual.nota == null ? 'A semana atual ainda não tem nota.' : `A semana atual está na nota ${atual.nota}.`;
  const minutos = textoConta(atual.minutos || 0, 'minuto', 'minutos');
  const muletas = textoConta(atual.muletas || 0, 'preenchimento', 'preenchimentos');
  return `${nota} ${minutos} e ${muletas}.`;
}
