// Furo num review, mudança de escopo e o chimarrão do Sul.
// A descoberta dos treinos mora no hub. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const BRECHAS = [
  {
    id: 'colasql',
    titulo: 'A cola',
    emoji: '🔓',
    nivel: 'B1',
    onde: 'O review achou uma consulta montada com texto do usuário.',
    rodadas: [
      fala(
        'Falha',
        'What did you find in the review?',
        'O que você achou no review?',
        'Diga que a consulta cola o texto do usuário no SQL.',
        'This query glues the user text into SQL.',
        [
          'this query glues the user text into sql',
          'this query glues user text into sql',
          'the query glues the user text into sql'
        ],
        'Glues é cola. User text é o texto que a pessoa digitou.'
      ),
      fala(
        'Correção',
        'How do we fix it?',
        'Como a gente conserta?',
        'Diga que um parâmetro deixa o texto fora do SQL.',
        'A parameter keeps the text out of the SQL.',
        [
          'a parameter keeps the text out of the sql',
          'a parameter keeps the text out of sql',
          'the parameter keeps the text out of the sql'
        ],
        'A parameter é o parâmetro. Out of the SQL é fora da consulta.'
      )
    ]
  },
  {
    id: 'semchecagem',
    titulo: 'A permissão',
    emoji: '🔓',
    nivel: 'B2',
    onde: 'Uma escrita passa sem olhar quem pediu.',
    rodadas: [
      fala(
        'Falha',
        'Why is this route unsafe?',
        'Por que esta rota é insegura?',
        'Diga que esta escrita pula a checagem de permissão.',
        'This write skips the permission check.',
        [
          'this write skips the permission check',
          'this write skips a permission check',
          'the write skips the permission check'
        ],
        'Skips é pula. Permission check é a checagem de permissão.'
      ),
      fala(
        'Correção',
        'What should we add?',
        'O que a gente adiciona?',
        'Diga para checar o papel antes da escrita.',
        'Check the role before the write.',
        [
          'check the role before the write',
          'check the role before this write',
          'check a role before the write'
        ],
        'Role é o papel da pessoa. Before the write é antes de gravar.'
      )
    ]
  },
  {
    id: 'segredopagina',
    titulo: 'O segredo',
    emoji: '🔓',
    nivel: 'B1',
    onde: 'A chave da API está no código da página.',
    rodadas: [
      fala(
        'Falha',
        'Where is the secret?',
        'Onde está o segredo?',
        'Diga que o segredo da API está gravado na página.',
        'The API secret is baked into the page.',
        [
          'the api secret is baked into the page',
          'the api secret is baked into this page',
          'an api secret is baked into the page'
        ],
        'Baked into é gravado dentro. The page é a página que o navegador recebe.'
      ),
      fala(
        'Correção',
        'Where should it live?',
        'Onde ele deve morar?',
        'Diga para mover esse segredo para o servidor.',
        'Move that secret to the server.',
        [
          'move that secret to the server',
          'move the secret to the server',
          'move this secret to the server'
        ],
        'Move é mover. The server é o servidor, longe do navegador.'
      )
    ]
  }
];

export const MUDAS = [
  {
    id: 'telanova',
    titulo: 'A tela nova',
    emoji: '📐',
    nivel: 'B1',
    onde: 'O cliente pede uma tela que não estava combinada.',
    rodadas: [
      fala(
        'Pedido',
        'Can you add this screen now?',
        'Dá para adicionar esta tela agora?',
        'Diga que a tela nova não estava no escopo combinado.',
        'The new screen was not in the agreed scope.',
        [
          'the new screen was not in the agreed scope',
          'this new screen was not in the agreed scope',
          'the new screen was not in our agreed scope'
        ],
        'Agreed scope é o escopo combinado. Was not in é não estava dentro.'
      ),
      fala(
        'Troca',
        'When can it land?',
        'Quando ela pode entrar?',
        'Diga que pode adicionar essa tela na próxima sprint.',
        'I can add that screen in the next sprint.',
        [
          'i can add that screen in the next sprint',
          'i can add the screen in the next sprint',
          'i can add this screen in the next sprint'
        ],
        'The next sprint é a próxima sprint. Add é adicionar.'
      )
    ]
  },
  {
    id: 'duassemanas',
    titulo: 'As duas semanas',
    emoji: '📐',
    nivel: 'B2',
    onde: 'A mudança empurra o calendário.',
    rodadas: [
      fala(
        'Pedido',
        'Does the date still hold?',
        'A data ainda vale?',
        'Diga que esta mudança adiciona duas semanas.',
        'This change adds two weeks.',
        [
          'this change adds two weeks',
          'this change adds 2 weeks',
          'the change adds two weeks'
        ],
        'Adds é adiciona. Two weeks são duas semanas.'
      ),
      fala(
        'Troca',
        'What stays in this release?',
        'O que fica nesta entrega?',
        'Diga que a entrega atual continua como foi planejada.',
        'The current release stays as we planned.',
        [
          'the current release stays as we planned',
          'this current release stays as we planned',
          'the current release stays as planned'
        ],
        'Current release é a entrega atual. As we planned é como combinamos.'
      )
    ]
  },
  {
    id: 'notacliente',
    titulo: 'A nota',
    emoji: '📐',
    nivel: 'B1',
    onde: 'A mudança precisa ficar por escrito.',
    rodadas: [
      fala(
        'Pedido',
        'How do we record this?',
        'Como a gente registra isto?',
        'Pergunte se pode mandar uma nota escrita da mudança.',
        'May I send a written change note?',
        [
          'may i send a written change note',
          'may i send a written note of the change',
          'can i send a written change note'
        ],
        'May I pede licença. A written note é uma nota por escrito.'
      ),
      fala(
        'Troca',
        'Does the price stay the same?',
        'O preço fica igual?',
        'Diga que o preço muda com a tela extra.',
        'The price moves with the extra screen.',
        [
          'the price moves with the extra screen',
          'the price moves with this extra screen',
          'the price changes with the extra screen'
        ],
        'Moves with é muda junto. Extra screen é a tela a mais.'
      )
    ]
  }
];

export const GAUCHOS = [
  {
    id: 'chimarrao',
    titulo: 'O chimarrão',
    emoji: '🧉',
    nivel: 'A2',
    onde: 'Um colega de fora pergunta onde você mora.',
    rodadas: [
      fala(
        'Lugar',
        'Where in Brazil do you live?',
        'Onde no Brasil você mora?',
        'Diga que mora no Rio Grande do Sul.',
        'I live in Rio Grande do Sul.',
        [
          'i live in rio grande do sul',
          'i live in the south of brazil',
          'i live in rio grande do sul brazil'
        ],
        'I live in é moro em. Rio Grande do Sul é o estado.'
      ),
      fala(
        'Hábito',
        'What do you drink at home?',
        'O que você bebe em casa?',
        'Diga que bebe chimarrão de tarde.',
        'I drink chimarrao in the afternoon.',
        [
          'i drink chimarrao in the afternoon',
          'i drink chimarrão in the afternoon',
          'i drink mate in the afternoon'
        ],
        'Chimarrão é o mate quente. In the afternoon é de tarde.'
      )
    ]
  },
  {
    id: 'churrasco',
    titulo: 'O churrasco',
    emoji: '🧉',
    nivel: 'A2',
    onde: 'O domingo em casa vira assunto.',
    rodadas: [
      fala(
        'Lugar',
        'What do you cook with your family?',
        'O que você cozinha com a família?',
        'Diga que vocês assam carne no domingo em casa.',
        'We grill meat on Sunday at home.',
        [
          'we grill meat on sunday at home',
          'we grill meat at home on sunday',
          'we grill meat on sundays at home'
        ],
        'Grill é assar na brasa. At home é em casa.'
      ),
      fala(
        'Hábito',
        'Is it a quick meal?',
        'É uma refeição rápida?',
        'Diga que churrasco é um almoço lento com amigos.',
        'Churrasco is a slow lunch with friends.',
        [
          'churrasco is a slow lunch with friends',
          'a churrasco is a slow lunch with friends',
          'churrasco is a long lunch with friends'
        ],
        'A slow lunch é um almoço sem pressa. With friends é com amigos.'
      )
    ]
  },
  {
    id: 'portoalegre',
    titulo: 'Porto Alegre',
    emoji: '🧉',
    nivel: 'A2',
    onde: 'Alguém pergunta da cidade.',
    rodadas: [
      fala(
        'Lugar',
        'Which city did you grow up in?',
        'Em que cidade você cresceu?',
        'Diga que cresceu em Porto Alegre.',
        'I grew up in Porto Alegre.',
        [
          'i grew up in porto alegre',
          'i grew up in porto alegre brazil',
          'i was raised in porto alegre'
        ],
        'Grew up é cresceu. Porto Alegre é a capital do estado.'
      ),
      fala(
        'Hábito',
        'Do you still go back?',
        'Você ainda volta?',
        'Diga que ainda visita os pais lá.',
        'I still visit my parents there.',
        [
          'i still visit my parents there',
          'i still visit my parents in porto alegre',
          'i still go see my parents there'
        ],
        'Still é ainda. Visit my parents é visitar os pais.'
      )
    ]
  }
];

export function brechaPorId(id) {
  return BRECHAS.find(c => c.id === id) ?? null;
}

export function mudaPorId(id) {
  return MUDAS.find(c => c.id === id) ?? null;
}

export function gauchoPorId(id) {
  return GAUCHOS.find(c => c.id === id) ?? null;
}

export function avaliarBrecha(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarMuda(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarGaucho(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
