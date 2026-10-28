// Cenas em que a conversa muda conforme o que a pessoa escolhe dizer.
// Os textos aceitos já estão perto da forma normalizada da fala.

export const CENAS_RAMO = [
  {
    id: 'medico',
    titulo: 'No médico',
    emoji: '🩺',
    onde: 'Na recepção da clínica',
    ramo: true,
    inicio: 'chega',
    nos: {
      chega: {
        npc: [{ en: 'Good morning. What brings you in today?', pt: 'Bom dia. O que traz você aqui hoje?' }],
        pt: 'Diga por que você veio.',
        opcoes: [
          {
            id: 'dor',
            rotulo: 'Estou com dor de cabeça',
            aceitas: ['i have a headache', 'i have a bad headache', 'my head hurts'],
            melhor: 'I have a headache.',
            dica: 'Headache é dor de cabeça. I have, não I am with.',
            segue: 'tempo'
          },
          {
            id: 'consulta',
            rotulo: 'Vim para uma consulta marcada',
            aceitas: ['i have an appointment', 'i am here for an appointment', 'i have a checkup'],
            melhor: 'I have an appointment.',
            dica: 'Appointment é a consulta marcada. Checkup é a revisão.',
            segue: 'hora'
          }
        ]
      },
      tempo: {
        npc: [{ en: 'I am sorry. How long have you had it?', pt: 'Sinto muito. Há quanto tempo?' }],
        pt: 'Diga desde quando.',
        opcoes: [
          {
            id: 'ontem',
            rotulo: 'Desde ontem',
            aceitas: ['since yesterday', 'it started yesterday'],
            melhor: 'Since yesterday.',
            dica: 'Since marca o começo. Since yesterday é desde ontem.',
            segue: 'assento'
          },
          {
            id: 'dias',
            rotulo: 'Há alguns dias',
            aceitas: ['for a few days', 'for three days'],
            melhor: 'For a few days.',
            dica: 'For fala a duração. For a few days é há alguns dias.',
            segue: 'assento'
          }
        ]
      },
      hora: {
        npc: [{ en: 'Of course. What time is your appointment?', pt: 'Claro. Que horas é a sua consulta?' }],
        pt: 'Diga o horário.',
        opcoes: [
          {
            id: 'tres',
            rotulo: 'Às três',
            aceitas: ['at three', 'it is at three', 'my appointment is at three'],
            melhor: 'It is at three.',
            dica: 'Horário marcado usa at. At three é às três.',
            segue: 'assento'
          },
          {
            id: 'manha',
            rotulo: 'De manhã',
            aceitas: ['in the morning', 'this morning', 'it is in the morning'],
            melhor: 'It is in the morning.',
            dica: 'Partes do dia usam in the. In the morning é de manhã.',
            segue: 'assento'
          }
        ]
      },
      assento: {
        npc: [{ en: 'Please have a seat. The doctor will see you soon.', pt: 'Pode sentar. O médico já chama.' }],
        pt: 'Agradeça.',
        opcoes: [
          {
            id: 'obrigado',
            rotulo: 'Agradecer',
            aceitas: ['thank you', 'thanks', 'thank you very much'],
            melhor: 'Thank you.',
            dica: 'Thank you fecha o atendimento com educação.',
            segue: null
          }
        ]
      }
    }
  },
  {
    id: 'aeroporto',
    titulo: 'No aeroporto',
    emoji: '✈️',
    onde: 'No balcão do portão',
    ramo: true,
    inicio: 'balcao',
    nos: {
      balcao: {
        npc: [{ en: 'Hello. May I see your passport and boarding pass?', pt: 'Olá. Posso ver o passaporte e o cartão de embarque?' }],
        pt: 'Entregue os documentos, ou diga que falta um.',
        opcoes: [
          {
            id: 'aqui',
            rotulo: 'Aqui estão',
            aceitas: ['here you are', 'here is my passport', 'here are my documents'],
            melhor: 'Here you are.',
            dica: 'Here you are entrega o que a pessoa pediu.',
            segue: 'portao'
          },
          {
            id: 'perdi',
            rotulo: 'Não acho o cartão de embarque',
            aceitas: ['i cannot find my boarding pass', 'i lost my boarding pass', 'i do not have my boarding pass'],
            melhor: 'I cannot find my boarding pass.',
            dica: 'Boarding pass é o cartão de embarque. Cannot find é não consigo achar.',
            segue: 'segunda'
          }
        ]
      },
      portao: {
        npc: [{ en: 'Thank you. Your flight is on time. Gate 8.', pt: 'Obrigado. O voo está no horário. Portão 8.' }],
        pt: 'Pergunte do portão ou se o voo atrasou.',
        opcoes: [
          {
            id: 'onde',
            rotulo: 'Onde fica o portão 8?',
            aceitas: ['where is gate 8', 'where is gate eight', 'which way is gate 8'],
            melhor: 'Where is gate 8?',
            dica: 'Gate é o portão. Where is pergunta o lugar.',
            segue: 'obrigado'
          },
          {
            id: 'atraso',
            rotulo: 'O voo está no horário?',
            aceitas: ['is the flight on time', 'is it on time', 'is there a delay'],
            melhor: 'Is the flight on time?',
            dica: 'On time é no horário. Delay é atraso.',
            segue: 'obrigado'
          }
        ]
      },
      segunda: {
        npc: [{ en: 'No problem. I can print another one. What is your name?', pt: 'Sem problema. Eu imprimo outro. Qual é o seu nome?' }],
        pt: 'Diga o nome, ou peça para olhar a bolsa.',
        opcoes: [
          {
            id: 'nome',
            rotulo: 'Meu nome é Ana',
            aceitas: ['my name is ana', 'it is ana', 'ana'],
            melhor: 'My name is Ana.',
            dica: 'My name is. Não use I call myself.',
            segue: 'obrigado'
          },
          {
            id: 'bolsa',
            rotulo: 'Acho que está na bolsa',
            aceitas: ['i think it is in my bag', 'it might be in my bag', 'let me check my bag'],
            melhor: 'I think it is in my bag.',
            dica: 'I think deixa a frase menos dura. Bag é bolsa ou mala de mão.',
            segue: 'obrigado'
          }
        ]
      },
      obrigado: {
        npc: [{ en: 'You are all set. Have a good flight.', pt: 'Está tudo certo. Boa viagem.' }],
        pt: 'Agradeça.',
        opcoes: [
          {
            id: 'valeu',
            rotulo: 'Agradecer a viagem',
            aceitas: ['thank you', 'thanks', 'thank you have a good day'],
            melhor: 'Thank you.',
            dica: 'Thank you basta. Have a good flight é boa viagem, e quem fala isso é o agente.',
            segue: null
          }
        ]
      }
    }
  },
  {
    id: 'compras',
    titulo: 'Na loja',
    emoji: '🛍️',
    onde: 'Numa loja de roupa',
    ramo: true,
    inicio: 'oi',
    nos: {
      oi: {
        npc: [{ en: 'Hi there. Can I help you find something?', pt: 'Oi. Posso ajudar você a achar alguma coisa?' }],
        pt: 'Diga se está só olhando ou o que procura.',
        opcoes: [
          {
            id: 'olhando',
            rotulo: 'Só estou olhando',
            aceitas: ['i am just looking', 'just looking', 'no thanks i am just looking'],
            melhor: 'I am just looking, thanks.',
            dica: 'Just looking é só olhando. Thanks no fim deixa educado.',
            segue: 'preco'
          },
          {
            id: 'camisa',
            rotulo: 'Procuro uma camisa',
            aceitas: ['i am looking for a shirt', 'i need a shirt', 'where are the shirts'],
            melhor: 'I am looking for a shirt.',
            dica: 'Look for é procurar. Shirt é camisa.',
            segue: 'tamanho'
          }
        ]
      },
      preco: {
        npc: [{ en: 'Of course. Let me know if you need a size.', pt: 'Claro. Me chama se precisar de um tamanho.' }],
        pt: 'Pergunte o preço ou se pode provar.',
        opcoes: [
          {
            id: 'quanto',
            rotulo: 'Quanto custa esta?',
            aceitas: ['how much is this', 'how much does this cost', 'what is the price'],
            melhor: 'How much is this?',
            dica: 'How much is this pergunta o preço do que está na mão.',
            segue: 'levo'
          },
          {
            id: 'provar',
            rotulo: 'Posso experimentar?',
            aceitas: ['can i try it on', 'may i try it on', 'where is the fitting room'],
            melhor: 'Can I try it on?',
            dica: 'Try on é experimentar roupa. Fitting room é o provador.',
            segue: 'levo'
          }
        ]
      },
      tamanho: {
        npc: [{ en: 'The shirts are on the left. What size do you wear?', pt: 'As camisas ficam à esquerda. Qual tamanho você usa?' }],
        pt: 'Diga o tamanho.',
        opcoes: [
          {
            id: 'medio',
            rotulo: 'Médio',
            aceitas: ['medium', 'i wear a medium', 'a medium please'],
            melhor: 'I wear a medium.',
            dica: 'Medium é M. Small é P. Large é G.',
            segue: 'levo'
          },
          {
            id: 'azul',
            rotulo: 'Tem em azul?',
            aceitas: ['do you have it in blue', 'do you have this in blue', 'in blue'],
            melhor: 'Do you have it in blue?',
            dica: 'In blue é na cor azul. Do you have pergunta se tem.',
            segue: 'levo'
          }
        ]
      },
      levo: {
        npc: [{ en: 'Sure. Would you like to take it?', pt: 'Claro. Você leva?' }],
        pt: 'Leve ou agradeça e saia.',
        opcoes: [
          {
            id: 'levo',
            rotulo: 'Eu levo',
            aceitas: ['i will take it', 'yes i will take it', 'i would like this one'],
            melhor: 'I will take it.',
            dica: 'I will take it é eu levo, decidido agora.',
            segue: null
          },
          {
            id: 'nao',
            rotulo: 'Agora não',
            aceitas: ['no thank you', 'not today', 'i will think about it'],
            melhor: 'No, thank you.',
            dica: 'No, thank you recusa sem ser seco.',
            segue: null
          }
        ]
      }
    }
  },
  {
    id: 'telefone',
    titulo: 'No telefone',
    emoji: '📞',
    onde: 'Uma ligação para a empresa',
    ramo: true,
    inicio: 'alo',
    nos: {
      alo: {
        npc: [{ en: 'Good afternoon, North Clinic. How can I help you?', pt: 'Boa tarde, Clínica Norte. Como posso ajudar?' }],
        pt: 'Diga o motivo da ligação.',
        opcoes: [
          {
            id: 'conta',
            rotulo: 'É sobre uma conta',
            aceitas: ['i am calling about a bill', 'it is about a bill', 'i have a question about a bill'],
            melhor: 'I am calling about a bill.',
            dica: 'I am calling about diz o motivo. Bill é a conta a pagar.',
            segue: 'valor'
          },
          {
            id: 'marcar',
            rotulo: 'Quero marcar uma consulta',
            aceitas: ['i would like to make an appointment', 'i want to schedule an appointment', 'can i book an appointment'],
            melhor: 'I would like to make an appointment.',
            dica: 'Make an appointment ou schedule an appointment é marcar.',
            segue: 'dia'
          }
        ]
      },
      valor: {
        npc: [{ en: 'I can check that. What seems wrong?', pt: 'Posso conferir. O que parece errado?' }],
        pt: 'Explique o problema.',
        opcoes: [
          {
            id: 'errado',
            rotulo: 'O valor está errado',
            aceitas: ['the amount is wrong', 'the total is wrong', 'this amount is not right'],
            melhor: 'The amount is wrong.',
            dica: 'Amount é o valor. Wrong é errado.',
            segue: 'tchau'
          },
          {
            id: 'pago',
            rotulo: 'Eu já paguei',
            aceitas: ['i already paid', 'i paid it last week', 'i have already paid'],
            melhor: 'I already paid.',
            dica: 'Already paid é já paguei. O passado de pay é paid.',
            segue: 'tchau'
          }
        ]
      },
      dia: {
        npc: [{ en: 'We have Tuesday morning or Friday afternoon.', pt: 'Temos terça de manhã ou sexta à tarde.' }],
        pt: 'Escolha um horário.',
        opcoes: [
          {
            id: 'terca',
            rotulo: 'Terça de manhã',
            aceitas: ['tuesday morning', 'tuesday morning please', 'i can do tuesday morning'],
            melhor: 'Tuesday morning, please.',
            dica: 'Os dias da semana não levam artigo. Tuesday morning, não the Tuesday.',
            segue: 'tchau'
          },
          {
            id: 'sexta',
            rotulo: 'Sexta à tarde',
            aceitas: ['friday afternoon', 'friday afternoon please', 'i prefer friday afternoon'],
            melhor: 'Friday afternoon, please.',
            dica: 'Afternoon é à tarde. Friday afternoon é sexta à tarde.',
            segue: 'tchau'
          }
        ]
      },
      tchau: {
        npc: [{ en: 'All noted. Is there anything else?', pt: 'Anotado. Mais alguma coisa?' }],
        pt: 'Encerre a ligação.',
        opcoes: [
          {
            id: 'tchau',
            rotulo: 'É só isso, obrigado',
            aceitas: ['no that is all thank you', 'that is all thank you', 'no thank you goodbye'],
            melhor: 'No, that is all. Thank you.',
            dica: 'That is all encerra. Goodbye é tchau, no fim da ligação.',
            segue: null
          }
        ]
      }
    }
  },
  {
    id: 'reuniao',
    titulo: 'Na reunião',
    emoji: '🗓️',
    onde: 'Uma sala de trabalho',
    ramo: true,
    inicio: 'inicio',
    nos: {
      inicio: {
        npc: [{ en: 'Let us start. Any updates on the report?', pt: 'Vamos começar. Novidades do relatório?' }],
        pt: 'Diga como está o relatório.',
        opcoes: [
          {
            id: 'pronto',
            rotulo: 'O relatório está pronto',
            aceitas: ['the report is ready', 'it is ready', 'i finished the report'],
            melhor: 'The report is ready.',
            dica: 'Report é relatório. Ready é pronto.',
            segue: 'mostrar'
          },
          {
            id: 'tempo',
            rotulo: 'Preciso de mais tempo',
            aceitas: ['i need more time', 'i need another day', 'it is not ready yet'],
            melhor: 'I need more time.',
            dica: 'I need more time pede prazo sem drama. Yet no fim de not ready é ainda.',
            segue: 'prazo'
          }
        ]
      },
      mostrar: {
        npc: [{ en: 'Great. Can you walk us through it?', pt: 'Ótimo. Você pode explicar para o grupo?' }],
        pt: 'Mostre, ou diga que já enviou.',
        opcoes: [
          {
            id: 'tela',
            rotulo: 'Posso compartilhar a tela',
            aceitas: ['i can share my screen', 'let me share my screen', 'i will share my screen'],
            melhor: 'I can share my screen.',
            dica: 'Share my screen é compartilhar a tela.',
            segue: 'fecho'
          },
          {
            id: 'enviei',
            rotulo: 'Eu enviei ontem',
            aceitas: ['i sent it yesterday', 'i emailed it yesterday', 'i sent the report yesterday'],
            melhor: 'I sent it yesterday.',
            dica: 'Sent é o passado de send. Yesterday é ontem.',
            segue: 'fecho'
          }
        ]
      },
      prazo: {
        npc: [{ en: 'Okay. When can you finish it?', pt: 'Certo. Quando você termina?' }],
        pt: 'Dê um prazo, ou peça para mudar a data.',
        opcoes: [
          {
            id: 'amanha',
            rotulo: 'Amanhã',
            aceitas: ['i will finish tomorrow', 'tomorrow', 'i can finish it tomorrow'],
            melhor: 'I will finish tomorrow.',
            dica: 'I will é promessa feita agora. Tomorrow é amanhã.',
            segue: 'fecho'
          },
          {
            id: 'data',
            rotulo: 'Dá para mudar o prazo?',
            aceitas: ['can we move the deadline', 'can we change the deadline', 'could we move the deadline'],
            melhor: 'Can we move the deadline?',
            dica: 'Deadline é o prazo. Move the deadline é empurrar a data.',
            segue: 'fecho'
          }
        ]
      },
      fecho: {
        npc: [{ en: 'Sounds good. Let us meet again on Friday.', pt: 'Parece bom. Nos vemos de novo na sexta.' }],
        pt: 'Concorde.',
        opcoes: [
          {
            id: 'ok',
            rotulo: 'Combinado',
            aceitas: ['sounds good', 'okay see you friday', 'that works for me'],
            melhor: 'Sounds good.',
            dica: 'Sounds good concorda com o plano. That works for me é para mim funciona.',
            segue: null
          }
        ]
      }
    }
  }
];
