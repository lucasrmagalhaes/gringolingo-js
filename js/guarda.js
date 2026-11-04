// Id da chamada, janela da meia-noite e reinício de um pod.
// A nota usa o mesmo tutor. Nada sai do aparelho.

import { avaliarResposta } from './conversa.js';

function fala(etapa, npcEn, npcPt, missao, melhor, aceitas, dica) {
  return { etapa, npc: { en: npcEn, pt: npcPt }, missao, melhor, aceitas, dica };
}

export const RASTROS = [
  {
    id: 'idcabeca',
    titulo: 'No cabeçalho',
    emoji: '🔎',
    nivel: 'A2',
    onde: 'O id da chamada está no cabeçalho.',
    rodadas: [
      fala(
        'Pedido',
        'Where is the request id?',
        'Onde está o id da chamada?',
        'Diga que o id da chamada fica no cabeçalho.',
        'The request id sits in the header.',
        [
          'the request id sits in the header',
          'the request id is in the header',
          'that request id sits in the header'
        ],
        'Request id é o id da chamada. Header é o cabeçalho.'
      ),
      fala(
        'Copia',
        'What should I do with it?',
        'O que eu faço com ele?',
        'Peça para copiar esse id no ticket.',
        'Please copy that id into the ticket.',
        [
          'please copy that id into the ticket',
          'please copy the id into the ticket',
          'copy that id into the ticket'
        ],
        'Copy into the ticket é copiar no ticket.'
      )
    ]
  },
  {
    id: 'umpedido',
    titulo: 'Uma chamada',
    emoji: '🔎',
    nivel: 'B1',
    onde: 'Esse id vale para uma chamada só.',
    rodadas: [
      fala(
        'Pedido',
        'Which call is this?',
        'Qual chamada é essa?',
        'Diga que esse id é de uma chamada.',
        'This id belongs to one request.',
        [
          'this id belongs to one request',
          'this id belongs to 1 request',
          'the id belongs to one request'
        ],
        'Belongs to é pertence. One request é uma chamada.'
      ),
      fala(
        'Copia',
        'Should I paste the whole log?',
        'Eu colo o log inteiro?',
        'Peça para colar só o id da chamada.',
        'Please paste only the request id.',
        [
          'please paste only the request id',
          'paste only the request id',
          'please paste only that request id'
        ],
        'Paste only é colar só. Request id é o id da chamada.'
      )
    ]
  },
  {
    id: 'semid',
    titulo: 'Sem id',
    emoji: '🔎',
    nivel: 'B1',
    onde: 'O log chegou sem id.',
    rodadas: [
      fala(
        'Pedido',
        'The log has no id.',
        'O log não tem id.',
        'Diga que esta chamada não tem id.',
        'This request has no id.',
        [
          'this request has no id',
          'the request has no id',
          'this call has no request id'
        ],
        'Has no id é não ter id.'
      ),
      fala(
        'Copia',
        'What do we do then?',
        'O que a gente faz então?',
        'Peça o id para quem chamou.',
        'Please ask the caller for the id.',
        [
          'please ask the caller for the id',
          'ask the caller for the id',
          'please ask them for the request id'
        ],
        'Caller é quem chamou. Ask for é pedir.'
      )
    ]
  }
];

export const PARADAS = [
  {
    id: 'meianoite',
    titulo: 'Meia-noite',
    emoji: '🕛',
    nivel: 'A2',
    onde: 'A parada começa à meia-noite.',
    rodadas: [
      fala(
        'Início',
        'When does the window start?',
        'Quando a janela começa?',
        'Diga que a janela começa à meia-noite.',
        'The window starts at midnight.',
        [
          'the window starts at midnight',
          'the maintenance window starts at midnight',
          'our window starts at midnight'
        ],
        'Window é a janela da parada. Midnight é meia-noite.'
      ),
      fala(
        'Fim',
        'How long does it last?',
        'Quanto tempo ela dura?',
        'Diga que ela dura uma hora.',
        'It lasts one hour.',
        [
          'it lasts one hour',
          'it lasts 1 hour',
          'the window lasts one hour'
        ],
        'Lasts é dura. One hour é uma hora.'
      )
    ]
  },
  {
    id: 'aviseantes',
    titulo: 'O aviso',
    emoji: '🕛',
    nivel: 'B1',
    onde: 'O time soube da parada ontem.',
    rodadas: [
      fala(
        'Início',
        'Did anyone know?',
        'Alguém sabia?',
        'Diga que o time soube ontem.',
        'We told the team yesterday.',
        [
          'we told the team yesterday',
          'we told the team the day before',
          'i told the team yesterday'
        ],
        'Told the team é avisar o time. Yesterday é ontem.'
      ),
      fala(
        'Fim',
        'What is closed?',
        'O que fica fechado?',
        'Diga que a escrita fica desligada na janela.',
        'Writes stay off during the window.',
        [
          'writes stay off during the window',
          'writes stay off in the window',
          'all writes stay off during the window'
        ],
        'Writes são as escritas. Stay off é ficar desligado.'
      )
    ]
  },
  {
    id: 'semescrita',
    titulo: 'Sem escrita',
    emoji: '🕛',
    nivel: 'B1',
    onde: 'Ninguém publica enquanto a janela está aberta.',
    rodadas: [
      fala(
        'Início',
        'Can I deploy?',
        'Posso publicar?',
        'Peça para esperar o fim da janela.',
        'Please wait until the window ends.',
        [
          'please wait until the window ends',
          'wait until the window ends',
          'please wait until this window ends'
        ],
        'Wait until é esperar até. The window ends é o fim da janela.'
      ),
      fala(
        'Fim',
        'When can we write again?',
        'Quando a escrita volta?',
        'Diga que a escrita volta à uma.',
        'Writes come back at one.',
        [
          'writes come back at one',
          'writes come back at 1',
          'the writes come back at one'
        ],
        'Come back é voltar. At one é à uma.'
      )
    ]
  }
];

export const PODS = [
  {
    id: 'umpod',
    titulo: 'Um pod',
    emoji: '🫛',
    nivel: 'A2',
    onde: 'Só um pod precisa reiniciar.',
    rodadas: [
      fala(
        'Queda',
        'How many pods?',
        'Quantos pods?',
        'Peça para reiniciar aquele um pod.',
        'Please restart that one pod.',
        [
          'please restart that one pod',
          'please restart that 1 pod',
          'restart that one pod'
        ],
        'Restart é reiniciar. One pod é um pod.'
      ),
      fala(
        'Ar',
        'What about the rest?',
        'E o resto?',
        'Diga que os outros pods continuam no ar.',
        'The other pods stay up.',
        [
          'the other pods stay up',
          'the other pods stay online',
          'other pods stay up'
        ],
        'The other pods são os outros. Stay up é continuar no ar.'
      )
    ]
  },
  {
    id: 'semtrafego',
    titulo: 'Sem tráfego',
    emoji: '🫛',
    nivel: 'B1',
    onde: 'O pod sai do tráfego antes de cair.',
    rodadas: [
      fala(
        'Queda',
        'Is traffic still on it?',
        'O tráfego ainda está nele?',
        'Peça para tirar esse pod do tráfego.',
        'Take that pod out of traffic.',
        [
          'take that pod out of traffic',
          'please take that pod out of traffic',
          'take this pod out of traffic'
        ],
        'Out of traffic é fora do tráfego.'
      ),
      fala(
        'Ar',
        'When do we restart?',
        'Quando a gente reinicia?',
        'Diga para reiniciar depois de esvaziar.',
        'Restart it after the drain.',
        [
          'restart it after the drain',
          'please restart it after the drain',
          'restart the pod after the drain'
        ],
        'After the drain é depois de esvaziar o tráfego.'
      )
    ]
  },
  {
    id: 'voltoupod',
    titulo: 'De volta',
    emoji: '🫛',
    nivel: 'B1',
    onde: 'O pod já voltou e pode receber chamada.',
    rodadas: [
      fala(
        'Queda',
        'Did it come back?',
        'Ele voltou?',
        'Diga que o pod voltou.',
        'The pod is back.',
        [
          'the pod is back',
          'that pod is back',
          'the pod is back up'
        ],
        'Is back é voltou.'
      ),
      fala(
        'Ar',
        'Can it take calls?',
        'Ele pode receber chamada?',
        'Diga que ele está pronto para o tráfego.',
        'It is ready for traffic.',
        [
          'it is ready for traffic',
          'the pod is ready for traffic',
          'it is ready for traffic now'
        ],
        'Ready for traffic é pronto para o tráfego.'
      )
    ]
  }
];

export function rastroPorId(id) {
  return RASTROS.find(c => c.id === id) ?? null;
}

export function paradaPorId(id) {
  return PARADAS.find(c => c.id === id) ?? null;
}

export function podPorId(id) {
  return PODS.find(c => c.id === id) ?? null;
}

export function avaliarRastro(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarParada(rodada, texto) {
  return avaliarResposta(rodada, texto);
}

export function avaliarPod(rodada, texto) {
  return avaliarResposta(rodada, texto);
}
