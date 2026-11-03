// Decisão técnica, pair e plantão, mais o plano da semana.
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

export const DECISOES = [
  {
    id: 'postgres',
    titulo: 'Postgres',
    emoji: '🏗️',
    nivel: 'B2',
    onde: 'O time queria um banco novo. Explique a escolha e a troca.',
    rodadas: [
      fala(
        'Escolha',
        'Why Postgres and not a new database?',
        'Por que Postgres e não um banco novo?',
        'Diga que vocês ficaram com Postgres porque o time já conhece.',
        'We went with Postgres because the team already knows it.',
        [
          'we went with postgres because the team already knows it',
          'we chose postgres because the team already knows it',
          'we went with postgres because we already know it'
        ],
        'We went with abre a decisão. Because dá o motivo.'
      ),
      fala(
        'Troca',
        'What do we give up?',
        'O que a gente abre mão?',
        'Diga que a troca é começar mais devagar na consulta nova.',
        'The trade-off is a slower start on the new query.',
        [
          'the trade off is a slower start on the new query',
          'the tradeoff is a slower start on the new query',
          'the trade off is a slow start on the new query'
        ],
        'Trade-off é a troca. A slower start é um começo mais devagar.'
      )
    ]
  },
  {
    id: 'email',
    titulo: 'Fila de e-mail',
    emoji: '📨',
    nivel: 'B1',
    onde: 'O e-mail não precisa sair na hora.',
    rodadas: [
      fala(
        'Escolha',
        'Why a queue for the email?',
        'Por que uma fila para o e-mail?',
        'Diga que vocês ficaram com uma fila porque o e-mail pode esperar.',
        'We went with a queue because the email can wait.',
        [
          'we went with a queue because the email can wait',
          'we chose a queue because the email can wait',
          'we went with a queue because email can wait'
        ],
        'A queue é a fila. Can wait é pode esperar.'
      ),
      fala(
        'Troca',
        'What is the downside?',
        'Qual é o lado ruim?',
        'Diga que a troca é uma espera curta para a pessoa.',
        'The trade-off is a short delay for the user.',
        [
          'the trade off is a short delay for the user',
          'the tradeoff is a short delay for the user',
          'the trade off is a small delay for the user'
        ],
        'A short delay é uma espera curta. The user é a pessoa.'
      )
    ]
  },
  {
    id: 'memoria',
    titulo: 'Cache da lista',
    emoji: '🗂️',
    nivel: 'B2',
    onde: 'A lista é lida o tempo todo.',
    rodadas: [
      fala(
        'Escolha',
        'Why cache this list?',
        'Por que guardar esta lista em cache?',
        'Diga que vocês ficaram com cache porque a lista é lida demais.',
        'We went with a cache because the list is read a lot.',
        [
          'we went with a cache because the list is read a lot',
          'we chose a cache because the list is read a lot',
          'we went with cache because the list is read a lot'
        ],
        'A cache guarda a resposta pronta. Read a lot é lida demais.'
      ),
      fala(
        'Troca',
        'What can go stale?',
        'O que pode ficar velho?',
        'Diga que a troca é a lista poder estar um minuto atrasada.',
        'The trade-off is the list can be a minute old.',
        [
          'the trade off is the list can be a minute old',
          'the tradeoff is the list can be a minute old',
          'the trade off is that the list can be a minute old'
        ],
        'A minute old é um minuto atrasada. É o preço do cache.'
      )
    ]
  }
];

export const PARES = [
  {
    id: 'leitura',
    titulo: 'Lendo o teste',
    emoji: '👥',
    nivel: 'B1',
    onde: 'Você narra o que está lendo e pede um olhar.',
    rodadas: [
      fala(
        'Narrar',
        'What are you doing?',
        'O que você está fazendo?',
        'Diga que você está lendo o teste do login.',
        'I am reading the login test.',
        [
          'i am reading the login test',
          'i am reading the test for the login',
          'im reading the login test'
        ],
        'I am reading narra o agora. The login test é o teste do login.'
      ),
      fala(
        'Ajuda',
        'Want a second pair of eyes?',
        'Quer um segundo olhar?',
        'Peça para a pessoa olhar este laço.',
        'Could you take a look at this loop?',
        [
          'could you take a look at this loop',
          'can you take a look at this loop',
          'could you look at this loop'
        ],
        'Take a look é dar uma olhada. This loop é este laço.'
      )
    ]
  },
  {
    id: 'checagem',
    titulo: 'Lista vazia',
    emoji: '👥',
    nivel: 'B1',
    onde: 'Você conta o que está escrevendo e passa o teclado.',
    rodadas: [
      fala(
        'Narrar',
        'Where are you in the code?',
        'Em que pé está o código?',
        'Diga que você está adicionando uma checagem de lista vazia.',
        'I am adding a check for the empty list.',
        [
          'i am adding a check for the empty list',
          'i am adding an empty list check',
          'im adding a check for the empty list'
        ],
        'I am adding narra a mudança. Empty list é a lista vazia.'
      ),
      fala(
        'Ajuda',
        'Should I take the keyboard?',
        'Eu pego o teclado?',
        'Peça para a pessoa digitar por um minuto.',
        'Can you drive for a minute?',
        [
          'can you drive for a minute',
          'could you drive for a minute',
          'can you drive for one minute'
        ],
        'Drive aqui é quem digita. A outra pessoa olha.'
      )
    ]
  },
  {
    id: 'assertiva',
    titulo: 'Travei na asserção',
    emoji: '👥',
    nivel: 'B2',
    onde: 'Você diz onde travou e pede o caminho.',
    rodadas: [
      fala(
        'Narrar',
        'What is blocking you?',
        'O que está te travando?',
        'Diga que você travou nesta asserção.',
        'I am stuck on this assertion.',
        [
          'i am stuck on this assertion',
          'i am stuck on the assertion',
          'im stuck on this assertion'
        ],
        'Stuck on é travado em. Assertion é a checagem do teste.'
      ),
      fala(
        'Ajuda',
        'How can I help?',
        'Como eu ajudo?',
        'Peça para a pessoa te guiar pela preparação do teste.',
        'Could you walk me through the fixture?',
        [
          'could you walk me through the fixture',
          'can you walk me through the fixture',
          'could you walk me through this fixture'
        ],
        'Walk me through é me guiar. Fixture é a preparação do teste.'
      )
    ]
  }
];

export const INCIDENTES = [
  {
    id: 'queda',
    titulo: 'Login fora',
    emoji: '🚨',
    nivel: 'B1',
    onde: 'O login caiu para parte das pessoas.',
    rodadas: [
      fala(
        'Status',
        'What is the status?',
        'Qual é o status?',
        'Diga que o login está fora para algumas pessoas.',
        'The login is down for some users.',
        [
          'the login is down for some users',
          'login is down for some users',
          'the login is down for a few users'
        ],
        'Is down é está fora. Some users são algumas pessoas.'
      ),
      fala(
        'Desculpa',
        'The channel is asking for an update.',
        'O canal está pedindo um recado.',
        'Peça desculpas pelo atraso.',
        'I am sorry for the delay.',
        [
          'i am sorry for the delay',
          'sorry for the delay',
          'i am sorry about the delay'
        ],
        'I am sorry for é desculpa por. The delay é o atraso.'
      ),
      fala(
        'Próximo',
        'What is next?',
        'Qual é o próximo passo?',
        'Diga que o próximo passo é voltar a versão.',
        'The next step is to roll back.',
        [
          'the next step is to roll back',
          'next step is to roll back',
          'the next step is a rollback'
        ],
        'The next step is abre o plano. Roll back é voltar a versão.'
      )
    ]
  },
  {
    id: 'lento',
    titulo: 'Página lenta',
    emoji: '🚨',
    nivel: 'B1',
    onde: 'A fila travou e a página ficou lenta.',
    rodadas: [
      fala(
        'Status',
        'What is happening?',
        'O que está acontecendo?',
        'Diga que a fila travou.',
        'The queue is stuck.',
        [
          'the queue is stuck',
          'our queue is stuck',
          'the queue is stuck right now'
        ],
        'The queue é a fila. Stuck é travada.'
      ),
      fala(
        'Desculpa',
        'People are waiting on the page.',
        'As pessoas estão esperando a página.',
        'Peça desculpas porque a página está lenta.',
        'I am sorry this page is slow.',
        [
          'i am sorry this page is slow',
          'sorry this page is slow',
          'i am sorry the page is slow'
        ],
        'This page is slow é esta página está lenta.'
      ),
      fala(
        'Próximo',
        'What will you do now?',
        'O que você faz agora?',
        'Diga que o próximo passo é reiniciar o worker.',
        'The next step is to restart the worker.',
        [
          'the next step is to restart the worker',
          'next step is to restart the worker',
          'the next step is to restart the workers'
        ],
        'Restart the worker é reiniciar o processo da fila.'
      )
    ]
  },
  {
    id: 'bandeira',
    titulo: 'Flag barulhenta',
    emoji: '🚨',
    nivel: 'B2',
    onde: 'O deploy falhou e o alerta não para.',
    rodadas: [
      fala(
        'Status',
        'Did the deploy finish?',
        'O deploy terminou?',
        'Diga que o deploy falhou no último passo.',
        'The deploy failed on the last step.',
        [
          'the deploy failed on the last step',
          'the deploy failed at the last step',
          'deploy failed on the last step'
        ],
        'Failed é falhou. The last step é o último passo.'
      ),
      fala(
        'Desculpa',
        'The alert is still firing.',
        'O alerta ainda está disparando.',
        'Peça desculpas pelo alerta barulhento.',
        'I am sorry for the noisy alert.',
        [
          'i am sorry for the noisy alert',
          'sorry for the noisy alert',
          'i am sorry about the noisy alert'
        ],
        'Noisy alert é o alerta barulhento.'
      ),
      fala(
        'Próximo',
        'How do we quiet it?',
        'Como a gente faz parar?',
        'Diga que o próximo passo é desligar a flag.',
        'The next step is to turn the flag off.',
        [
          'the next step is to turn the flag off',
          'next step is to turn the flag off',
          'the next step is to turn off the flag'
        ],
        'Turn the flag off é desligar a chave. Não é apagar o código.'
      )
    ]
  }
];

const PLANO_POR_CHAVE = {
  tempo: { id: 'conto', titulo: 'Contar no passado', porque: n => `A forma do verbo voltou ${n} vezes.` },
  ordem: { id: 'enfase', titulo: 'Ênfase', porque: n => `A ordem das palavras voltou ${n} vezes.` },
  plural: { id: 'claro', titulo: 'Esclarecer', porque: n => `O plural voltou ${n} vezes. Confirme a frase inteira.` },
  artigo: { id: 'claro', titulo: 'Esclarecer', porque: n => `O artigo voltou ${n} vezes. Confirme a frase inteira.` },
  falta: { id: 'claro', titulo: 'Esclarecer', porque: n => `Uma palavra faltou ${n} vezes. Peça para repetir.` },
  sobra: { id: 'claro', titulo: 'Esclarecer', porque: n => `Sobrou palavra ${n} vezes. Peça para repetir.` },
  troca: { id: 'claro', titulo: 'Esclarecer', porque: n => `Uma palavra trocada voltou ${n} vezes. Peça para repetir.` },
  typo: { id: 'claro', titulo: 'Esclarecer', porque: n => `Um errinho de letra voltou ${n} vezes. Confirme a frase.` },
  cognato: { id: 'claro', titulo: 'Esclarecer', porque: n => `Um falso amigo voltou ${n} vezes. Confirme o sentido.` },
  escolha: { id: 'rapido', titulo: 'Pensa em inglês', porque: n => `A opção errada voltou ${n} vezes.` },
  vazio: { id: 'rapido', titulo: 'Pensa em inglês', porque: n => `A resposta em branco voltou ${n} vezes.` }
};

const ORDEM_PLANO = ['conto', 'enfase', 'claro', 'rapido'];

export function planoDaSemana({ deslizes = 0, padroes = [] } = {}) {
  const itens = [];
  const por = (id, titulo, porque) => {
    if (itens.length >= 3) return;
    itens.push({ id, titulo, porque });
  };
  const nDeslizes = Math.max(0, Number(deslizes) || 0);
  if (nDeslizes === 1) por('deslize', 'Deslizes de fala', 'Uma frase que escapou já venceu.');
  else if (nDeslizes > 1) por('deslize', 'Deslizes de fala', `${nDeslizes} frases que escaparam já venceram.`);

  const melhor = new Map();
  for (const p of (Array.isArray(padroes) ? padroes : [])) {
    if (!p || Number(p.n) < 2 || typeof p.chave !== 'string') continue;
    const mapa = PLANO_POR_CHAVE[p.chave.split(':')[0]];
    if (!mapa) continue;
    const n = Number(p.n);
    const atual = melhor.get(mapa.id);
    if (!atual || n > atual.n || (n === atual.n && String(p.chave) < atual.chave)) {
      melhor.set(mapa.id, { n, chave: String(p.chave), titulo: mapa.titulo, porque: mapa.porque(n) });
    }
  }
  for (const id of ORDEM_PLANO) {
    const item = melhor.get(id);
    if (item) por(id, item.titulo, item.porque);
  }
  if (!itens.length) {
    por('livre', 'Falar de você', 'Ainda não há deslize registrado. Uma fala curta começa o plano.');
  }
  return itens;
}

export function decisaoPorId(id) {
  return DECISOES.find(c => c.id === id) ?? null;
}

export function parPorId(id) {
  return PARES.find(c => c.id === id) ?? null;
}

export function incidentePorId(id) {
  return INCIDENTES.find(c => c.id === id) ?? null;
}

export function avaliarDecisao(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPar(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarIncidente(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function nomeDoTreino(titulo) {
  const nome = String(titulo || '').replace(/\s+/g, ' ').trim();
  return nome ? `Treinar ${nome}` : 'Treinar';
}
