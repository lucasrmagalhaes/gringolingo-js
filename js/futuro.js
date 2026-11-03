// Falar do futuro e dos planos de carreira.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const FUTUROS = [
  {
    id: 'cincoanos',
    titulo: 'Daqui a cinco anos',
    emoji: '🚀',
    nivel: 'B1',
    onde: 'A entrevista pergunta onde você se vê.',
    rodadas: [
      fala(
        'Meta',
        'Where do you see yourself in five years?',
        'Onde você se vê daqui a cinco anos?',
        'Diga que em cinco anos quer liderar um time pequeno.',
        'In five years I want to lead a small team.',
        [
          'in five years i want to lead a small team',
          'in 5 years i want to lead a small team',
          'in five years i want to lead a team'
        ],
        'In five years é daqui a cinco anos. Lead a team é liderar um time.'
      ),
      fala(
        'Caminho',
        'How will you get there?',
        'Como você chega lá?',
        'Diga que vai aprender a orientar outras pessoas.',
        'I will learn how to guide other people.',
        [
          'i will learn how to guide other people',
          'i will learn to guide other people',
          'i want to learn how to guide other people'
        ],
        'Guide é orientar. Other people são outras pessoas.'
      )
    ]
  },
  {
    id: 'anoquevem',
    titulo: 'O próximo ano',
    emoji: '🚀',
    nivel: 'B1',
    onde: 'O plano do ano que vem cabe numa frase.',
    rodadas: [
      fala(
        'Meta',
        'What do you want to learn next year?',
        'O que você quer aprender no próximo ano?',
        'Diga que no próximo ano quer aprender system design.',
        'Next year I want to learn system design.',
        [
          'next year i want to learn system design',
          'next year i want to study system design',
          'i want to learn system design next year'
        ],
        'Next year é o próximo ano. System design é o desenho do sistema.'
      ),
      fala(
        'Caminho',
        'How often will you practice?',
        'Com que frequência você vai praticar?',
        'Diga que vai praticar uma pergunta de desenho por semana.',
        'I will practice one design question a week.',
        [
          'i will practice one design question a week',
          'i will practice one design question each week',
          'i practice one design question a week'
        ],
        'A week é por semana. Design question é uma pergunta de desenho.'
      )
    ]
  },
  {
    id: 'motivo',
    titulo: 'O motivo',
    emoji: '🚀',
    nivel: 'B2',
    onde: 'O motivo do plano fica claro.',
    rodadas: [
      fala(
        'Meta',
        'Why does that plan matter to you?',
        'Por que esse plano importa para você?',
        'Diga que quer ficar perto de quem usa o produto.',
        'I want to stay close to the users.',
        [
          'i want to stay close to the users',
          'i want to stay close to users',
          'i will stay close to the users'
        ],
        'Stay close é ficar perto. Users são quem usa.'
      ),
      fala(
        'Caminho',
        'What keeps you going?',
        'O que faz você continuar?',
        'Diga que é por isso que continua aprendendo.',
        'That is why I keep learning.',
        [
          'that is why i keep learning',
          'that is why i keep studying',
          'this is why i keep learning'
        ],
        'That is why é por isso. Keep learning é continuar aprendendo.'
      )
    ]
  }
];

export function futuroPorId(id) {
  return FUTUROS.find(c => c.id === id) ?? null;
}

export function avaliarFuturo(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
