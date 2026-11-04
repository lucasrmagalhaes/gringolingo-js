// Lint do diff, origem bloqueada e link assinado.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const LINTS = [
  {
    id: 'doisarquivos',
    titulo: 'Dois arquivos',
    emoji: '🧹',
    nivel: 'A2',
    onde: 'O lint falhou em dois arquivos.',
    rodadas: [
      fala(
        'Falha',
        'What failed?',
        'O que falhou?',
        'Diga que o lint falhou em dois arquivos.',
        'The linter failed on two files.',
        [
          'the linter failed on two files',
          'the linter failed on 2 files',
          'the lint failed on two files'
        ],
        'Linter é o lint. Two files é dois arquivos.'
      ),
      fala(
        'Volta',
        'Where do I look?',
        'Onde eu olho?',
        'Diga que o aviso fica no diff.',
        'The warning sits in the diff.',
        [
          'the warning sits in the diff',
          'the warning is in the diff',
          'that warning sits in the diff'
        ],
        'Warning é o aviso. Diff é a diferença do arquivo.'
      )
    ]
  },
  {
    id: 'semaviso',
    titulo: 'Sem aviso',
    emoji: '🧹',
    nivel: 'B1',
    onde: 'O aviso de lint é de hoje.',
    rodadas: [
      fala(
        'Falha',
        'Is the warning new?',
        'O aviso é novo?',
        'Diga que este aviso é novo hoje.',
        'This warning is new today.',
        [
          'this warning is new today',
          'the warning is new today',
          'this warning is new'
        ],
        'New today é novo hoje.'
      ),
      fala(
        'Volta',
        'Can we ignore it?',
        'A gente pode ignorar?',
        'Peça para não ignorar o aviso.',
        'Please do not ignore the warning.',
        [
          'please do not ignore the warning',
          'do not ignore the warning',
          'please do not ignore this warning'
        ],
        'Do not ignore é não ignorar.'
      )
    ]
  },
  {
    id: 'rodarlint',
    titulo: 'De novo',
    emoji: '🧹',
    nivel: 'B1',
    onde: 'Alguém vai rodar o lint outra vez.',
    rodadas: [
      fala(
        'Falha',
        'What will you run?',
        'O que você vai rodar?',
        'Diga que vai rodar o lint de novo.',
        'I will run the linter again.',
        [
          'i will run the linter again',
          'i will run the lint again',
          'i run the linter again'
        ],
        'Run again é rodar de novo.'
      ),
      fala(
        'Volta',
        'When is it clean?',
        'Quando fica limpo?',
        'Diga que o lint está limpo agora.',
        'The linter is clean now.',
        [
          'the linter is clean now',
          'the lint is clean now',
          'the linter is clean'
        ],
        'Clean now é limpo agora.'
      )
    ]
  }
];

export const ORIGENS = [
  {
    id: 'outraorigem',
    titulo: 'Outra origem',
    emoji: '🌐',
    nivel: 'A2',
    onde: 'O navegador bloqueia a outra origem.',
    rodadas: [
      fala(
        'Bloqueio',
        'What does the browser do?',
        'O que o navegador faz?',
        'Diga que o navegador bloqueia a outra origem.',
        'The browser blocks the other origin.',
        [
          'the browser blocks the other origin',
          'the browser blocks that other origin',
          'this browser blocks the other origin'
        ],
        'Browser é o navegador. Origin é a origem.'
      ),
      fala(
        'Libera',
        'What should we allow?',
        'O que a gente libera?',
        'Peça para liberar aquela uma origem.',
        'Please allow that one origin.',
        [
          'please allow that one origin',
          'please allow that 1 origin',
          'allow that one origin'
        ],
        'Allow é liberar. One origin é uma origem.'
      )
    ]
  },
  {
    id: 'umasorigem',
    titulo: 'Um site',
    emoji: '🌐',
    nivel: 'B1',
    onde: 'O outro site ainda não pode chamar.',
    rodadas: [
      fala(
        'Bloqueio',
        'Which site is blocked?',
        'Qual site está bloqueado?',
        'Diga que o outro site não pode chamar.',
        'The other site cannot call us.',
        [
          'the other site cannot call us',
          'that other site cannot call us',
          'the other site cannot call our api'
        ],
        'Cannot call us é não poder chamar a gente.'
      ),
      fala(
        'Libera',
        'Who do we trust?',
        'Em quem a gente confia?',
        'Diga que a gente confia naquele um site.',
        'We trust that one site.',
        [
          'we trust that one site',
          'we trust that 1 site',
          'we trust this one site'
        ],
        'Trust é confiar. One site é um site.'
      )
    ]
  },
  {
    id: 'antespedido',
    titulo: 'Antes da chamada',
    emoji: '🌐',
    nivel: 'B1',
    onde: 'O navegador pergunta antes da chamada.',
    rodadas: [
      fala(
        'Bloqueio',
        'What happens first?',
        'O que acontece primeiro?',
        'Diga que o navegador pergunta antes da chamada.',
        'The browser asks before the call.',
        [
          'the browser asks before the call',
          'the browser asks before this call',
          'this browser asks before the call'
        ],
        'Asks before é perguntar antes.'
      ),
      fala(
        'Libera',
        'Is the answer yes?',
        'A resposta é sim?',
        'Diga que a gente responde sim para aquele site.',
        'We answer yes for that site.',
        [
          'we answer yes for that site',
          'we answer yes for this site',
          'we say yes for that site'
        ],
        'Answer yes é responder sim.'
      )
    ]
  }
];

export const LINKS = [
  {
    id: 'horaassinada',
    titulo: 'Uma hora',
    emoji: '🔗',
    nivel: 'A2',
    onde: 'O link assinado vale uma hora.',
    rodadas: [
      fala(
        'Prazo',
        'How long does the link last?',
        'Quanto tempo o link vale?',
        'Diga que o link assinado vale uma hora.',
        'The signed link lasts one hour.',
        [
          'the signed link lasts one hour',
          'the signed link lasts 1 hour',
          'this signed link lasts one hour'
        ],
        'Signed link é o link assinado. One hour é uma hora.'
      ),
      fala(
        'Troca',
        'What happens after that?',
        'O que acontece depois?',
        'Peça para mandar um link novo depois.',
        'Please send a new link after that.',
        [
          'please send a new link after that',
          'send a new link after that',
          'please send a fresh link after that'
        ],
        'Send a new link é mandar um link novo.'
      )
    ]
  },
  {
    id: 'novolink',
    titulo: 'O link velho',
    emoji: '🔗',
    nivel: 'B1',
    onde: 'O link velho expira ao meio-dia.',
    rodadas: [
      fala(
        'Prazo',
        'Is the old link still good?',
        'O link velho ainda vale?',
        'Diga que o link velho expira ao meio-dia.',
        'The old link expires at noon.',
        [
          'the old link expires at noon',
          'that old link expires at noon',
          'the old link expires at 12'
        ],
        'Expires é expirar. Noon é meio-dia.'
      ),
      fala(
        'Troca',
        'What do I send?',
        'O que eu mando?',
        'Diga que vai mandar um link novo.',
        'I will send a fresh link.',
        [
          'i will send a fresh link',
          'i will send a new link',
          'i send a fresh link'
        ],
        'Fresh link é um link novo.'
      )
    ]
  },
  {
    id: 'meioexpira',
    titulo: 'Arquivo privado',
    emoji: '🔗',
    nivel: 'B1',
    onde: 'O arquivo fica privado e abre com o link.',
    rodadas: [
      fala(
        'Prazo',
        'Can they keep the file?',
        'Eles podem guardar o arquivo?',
        'Diga que o arquivo fica privado.',
        'The file stays private.',
        [
          'the file stays private',
          'this file stays private',
          'the file stays private for now'
        ],
        'Stays private é ficar privado.'
      ),
      fala(
        'Troca',
        'How do they open it?',
        'Como eles abrem?',
        'Diga que eles abrem com o link assinado.',
        'They open it with the signed link.',
        [
          'they open it with the signed link',
          'they open it with a signed link',
          'they open the file with the signed link'
        ],
        'Open it with é abrir com.'
      )
    ]
  }
];

export function lintPorId(id) {
  return LINTS.find(c => c.id === id) ?? null;
}

export function origemPorId(id) {
  return ORIGENS.find(c => c.id === id) ?? null;
}

export function linkPorId(id) {
  return LINKS.find(c => c.id === id) ?? null;
}

export function avaliarLint(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarOrigem(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarLink(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
