export const UNIDADES = [
  {
    id: 'basico',
    titulo: 'Primeiros Passos',
    emoji: '👋',
    cor: '#58CC02',
    licoes: [
      {
        id: 'b1', titulo: 'Oi, mundo!', emoji: '👋',
        itens: [
          { en: 'hello', pt: 'olá' },
          { en: 'hi', pt: 'oi' },
          { en: 'good morning', pt: 'bom dia' },
          { en: 'good night', pt: 'boa noite' },
          { en: 'bye', pt: 'tchau' },
          { en: 'please', pt: 'por favor' },
          { en: 'thank you', pt: 'obrigado' },
          { en: 'yes', pt: 'sim' },
          { en: 'no', pt: 'não' }
        ]
      },
      {
        id: 'b2', titulo: 'Quem é você?', emoji: '🙋',
        dica: { titulo: 'Ser e estar viram to be', corpo: 'Em inglês não existe a dupla ser/estar: os dois viram to be. E ele muda com a pessoa — I am, you are, he/she/it is, we/they are. Por isso "eu estou bem" é I am fine.' },
        itens: [
          { en: 'what is your name?', pt: 'qual é o seu nome?', nota: 'Em pergunta o verbo vem antes do sujeito: what IS your name?' },
          { en: 'my name is Ana', pt: 'meu nome é Ana' },
          { en: 'nice to meet you', pt: 'prazer em te conhecer' },
          { en: 'how are you?', pt: 'como você está?' },
          { en: 'I am fine', pt: 'eu estou bem', nota: 'Ser e estar viram o mesmo verbo: to be (I am, you are, she is).' },
          { en: 'and you?', pt: 'e você?' },
          { en: 'see you later', pt: 'até mais tarde' }
        ]
      },
      {
        id: 'b3', titulo: 'Conta aí', emoji: '🔢',
        itens: [
          { en: 'one', pt: 'um' },
          { en: 'two', pt: 'dois' },
          { en: 'three', pt: 'três' },
          { en: 'four', pt: 'quatro' },
          { en: 'five', pt: 'cinco' },
          { en: 'six', pt: 'seis' },
          { en: 'seven', pt: 'sete' },
          { en: 'eight', pt: 'oito' },
          { en: 'nine', pt: 'nove' },
          { en: 'ten', pt: 'dez' }
        ]
      },
      {
        id: 'b4', titulo: 'Frases mágicas', emoji: '✨',
        dica: { titulo: 'Perguntas e negativas pedem do', corpo: 'Com verbos comuns, a negativa usa do not (don’t) e a pergunta começa com do/does: I do not understand, Do you speak English? Nunca "I not understand".' },
        itens: [
          { en: 'excuse me', pt: 'com licença' },
          { en: 'sorry', pt: 'desculpa' },
          { en: "I don't understand", pt: 'eu não entendo', nota: 'Negativa no presente pede o do: I do not understand — nunca "I not understand".' },
          { en: 'can you help me?', pt: 'você pode me ajudar?', nota: 'Depois de can o verbo vem puro, sem to: can you HELP (não can you to help).' },
          { en: 'speak slowly, please', pt: 'fale devagar, por favor' },
          { en: 'no problem', pt: 'sem problema' }
        ]
      }
    ]
  },
  {
    id: 'comida',
    titulo: 'Comida Boa',
    emoji: '🍔',
    cor: '#FF9600',
    licoes: [
      {
        id: 'c1', titulo: 'Fome de quê?', emoji: '🥖',
        itens: [
          { en: 'water', pt: 'água' },
          { en: 'coffee', pt: 'café' },
          { en: 'bread', pt: 'pão' },
          { en: 'cheese', pt: 'queijo' },
          { en: 'chicken', pt: 'frango' },
          { en: 'rice', pt: 'arroz' },
          { en: 'beans', pt: 'feijão' },
          { en: 'egg', pt: 'ovo' }
        ]
      },
      {
        id: 'c2', titulo: 'No restaurante', emoji: '🍽️',
        itens: [
          { en: 'menu', pt: 'cardápio' },
          { en: 'breakfast', pt: 'café da manhã' },
          { en: 'lunch', pt: 'almoço' },
          { en: 'dinner', pt: 'jantar' },
          { en: 'the bill, please', pt: 'a conta, por favor' },
          { en: 'I want a coffee', pt: 'eu quero um café', nota: 'O artigo a/an é obrigatório com contável no singular: a coffee.' },
          { en: 'it is delicious', pt: 'está delicioso', nota: 'Inglês sempre precisa de sujeito: IT is delicious (não só "is delicious").' }
        ]
      },
      {
        id: 'c3', titulo: 'Vida doce', emoji: '🍰',
        itens: [
          { en: 'cake', pt: 'bolo' },
          { en: 'ice cream', pt: 'sorvete' },
          { en: 'juice', pt: 'suco' },
          { en: 'apple', pt: 'maçã' },
          { en: 'orange', pt: 'laranja' },
          { en: 'banana', pt: 'banana' },
          { en: 'sugar', pt: 'açúcar' },
          { en: 'milk', pt: 'leite' }
        ]
      },
      {
        id: 'c4', titulo: 'Pedido perfeito', emoji: '🌶️',
        itens: [
          { en: 'I would like a pizza', pt: 'eu gostaria de uma pizza', nota: 'I would like é o jeito educado de pedir; I want soa direto demais.' },
          { en: 'without onion, please', pt: 'sem cebola, por favor' },
          { en: 'more water, please', pt: 'mais água, por favor' },
          { en: 'it is too spicy', pt: 'está muito apimentado' },
          { en: 'the food is great', pt: 'a comida está ótima' }
        ]
      }
    ]
  },
  {
    id: 'viagem',
    titulo: 'Modo Viagem',
    emoji: '✈️',
    cor: '#1CB0F6',
    licoes: [
      {
        id: 'v1', titulo: 'Bora voar', emoji: '🛫',
        itens: [
          { en: 'airport', pt: 'aeroporto' },
          { en: 'airplane', pt: 'avião' },
          { en: 'ticket', pt: 'passagem' },
          { en: 'passport', pt: 'passaporte' },
          { en: 'luggage', pt: 'bagagem' },
          { en: 'trip', pt: 'viagem' },
          { en: 'hotel', pt: 'hotel' }
        ]
      },
      {
        id: 'v2', titulo: 'Tô perdido', emoji: '🧭',
        itens: [
          { en: 'where is the bathroom?', pt: 'onde fica o banheiro?' },
          { en: 'how much is it?', pt: 'quanto custa?', nota: 'Preço se pergunta com how much + is: how much IS it?' },
          { en: 'I am lost', pt: 'eu estou perdido', nota: 'Estados de pessoa usam to be: I AM lost (não "I have lost").' },
          { en: 'turn left', pt: 'vire à esquerda' },
          { en: 'turn right', pt: 'vire à direita' },
          { en: 'it is near', pt: 'é perto' },
          { en: 'it is far', pt: 'é longe' }
        ]
      },
      {
        id: 'v3', titulo: 'Rolê na cidade', emoji: '🏙️',
        itens: [
          { en: 'beach', pt: 'praia' },
          { en: 'museum', pt: 'museu' },
          { en: 'map', pt: 'mapa' },
          { en: 'street', pt: 'rua' },
          { en: 'city', pt: 'cidade' },
          { en: 'park', pt: 'parque' },
          { en: 'store', pt: 'loja' },
          { en: 'money', pt: 'dinheiro' }
        ]
      },
      {
        id: 'v4', titulo: 'Check-in', emoji: '🏨',
        itens: [
          { en: 'I have a reservation', pt: 'eu tenho uma reserva' },
          { en: 'the key, please', pt: 'a chave, por favor' },
          { en: 'what time is it?', pt: 'que horas são?', nota: 'Horas no singular em inglês: what time IS it? (não "are").' },
          { en: 'see you tomorrow', pt: 'até amanhã' },
          { en: 'can I pay by card?', pt: 'posso pagar com cartão?' }
        ]
      }
    ]
  },
  {
    id: 'trabalho',
    titulo: 'Modo Trabalho',
    emoji: '💼',
    cor: '#CE82FF',
    licoes: [
      {
        id: 't1', titulo: 'Na firma', emoji: '🏢',
        itens: [
          { en: 'work', pt: 'trabalho' },
          { en: 'meeting', pt: 'reunião' },
          { en: 'boss', pt: 'chefe' },
          { en: 'job', pt: 'emprego' },
          { en: 'salary', pt: 'salário' },
          { en: 'deadline', pt: 'prazo' },
          { en: 'office', pt: 'escritório' }
        ]
      },
      {
        id: 't2', titulo: 'Papo de reunião', emoji: '🗣️',
        itens: [
          { en: 'I have a meeting', pt: 'eu tenho uma reunião' },
          { en: 'good idea', pt: 'boa ideia' },
          { en: 'I agree', pt: 'eu concordo' },
          { en: "let's start", pt: 'vamos começar' },
          { en: 'send me the report', pt: 'me envie o relatório' },
          { en: 'any questions?', pt: 'alguma pergunta?' }
        ]
      },
      {
        id: 't3', titulo: 'Setup gamer', emoji: '💻',
        itens: [
          { en: 'computer', pt: 'computador' },
          { en: 'email', pt: 'e-mail' },
          { en: 'file', pt: 'arquivo' },
          { en: 'password', pt: 'senha' },
          { en: 'screen', pt: 'tela' },
          { en: 'keyboard', pt: 'teclado' },
          { en: 'mouse', pt: 'mouse' },
          { en: 'printer', pt: 'impressora' }
        ]
      },
      {
        id: 't4', titulo: 'Fechando o dia', emoji: '🌇',
        itens: [
          { en: 'can we reschedule?', pt: 'podemos remarcar?' },
          { en: 'I will be late', pt: 'eu vou me atrasar', nota: 'Futuro = will + verbo puro: will BE (não "will to be").' },
          { en: 'well done!', pt: 'muito bem!' },
          { en: 'the meeting is over', pt: 'a reunião acabou' },
          { en: 'have a nice weekend', pt: 'tenha um bom fim de semana' }
        ]
      }
    ]
  },
  {
    id: 'familia',
    titulo: 'Família & Amigos',
    emoji: '👨‍👩‍👧‍👦',
    cor: '#FF5E9C',
    licoes: [
      {
        id: 'f1', titulo: 'Lá em casa', emoji: '🏡',
        itens: [
          { en: 'mother', pt: 'mãe' },
          { en: 'father', pt: 'pai' },
          { en: 'brother', pt: 'irmão' },
          { en: 'sister', pt: 'irmã' },
          { en: 'son', pt: 'filho' },
          { en: 'daughter', pt: 'filha' },
          { en: 'parents', pt: 'pais' }
        ]
      },
      {
        id: 'f2', titulo: 'Família grande', emoji: '👵',
        itens: [
          { en: 'grandmother', pt: 'avó' },
          { en: 'grandfather', pt: 'avô' },
          { en: 'uncle', pt: 'tio' },
          { en: 'aunt', pt: 'tia' },
          { en: 'cousin', pt: 'primo' },
          { en: 'baby', pt: 'bebê' }
        ]
      },
      {
        id: 'f3', titulo: 'Amores & amigos', emoji: '💛',
        itens: [
          { en: 'friend', pt: 'amigo' },
          { en: 'best friend', pt: 'melhor amigo' },
          { en: 'boyfriend', pt: 'namorado' },
          { en: 'girlfriend', pt: 'namorada' },
          { en: 'husband', pt: 'marido' },
          { en: 'wife', pt: 'esposa' }
        ]
      },
      {
        id: 'f4', titulo: 'Papo de família', emoji: '💬',
        itens: [
          { en: 'this is my mother', pt: 'esta é minha mãe' },
          { en: 'I have two brothers', pt: 'eu tenho dois irmãos' },
          { en: 'my family is big', pt: 'minha família é grande' },
          { en: 'I love my family', pt: 'eu amo minha família' },
          { en: 'we live together', pt: 'nós moramos juntos' },
          { en: 'she is my sister', pt: 'ela é minha irmã' }
        ]
      }
    ]
  },
  {
    id: 'casa',
    titulo: 'Casa Doce Casa',
    emoji: '🏠',
    cor: '#1DBFA3',
    licoes: [
      {
        id: 'h1', titulo: 'Cômodos', emoji: '🚪',
        itens: [
          { en: 'house', pt: 'casa' },
          { en: 'bedroom', pt: 'quarto' },
          { en: 'kitchen', pt: 'cozinha' },
          { en: 'bathroom', pt: 'banheiro' },
          { en: 'living room', pt: 'sala' },
          { en: 'garage', pt: 'garagem' },
          { en: 'garden', pt: 'jardim' }
        ]
      },
      {
        id: 'h2', titulo: 'Dentro de casa', emoji: '🛋️',
        itens: [
          { en: 'bed', pt: 'cama' },
          { en: 'table', pt: 'mesa' },
          { en: 'chair', pt: 'cadeira' },
          { en: 'door', pt: 'porta' },
          { en: 'window', pt: 'janela' },
          { en: 'sofa', pt: 'sofá' },
          { en: 'mirror', pt: 'espelho' }
        ]
      },
      {
        id: 'h3', titulo: 'Eletro & cia', emoji: '🔌',
        itens: [
          { en: 'refrigerator', pt: 'geladeira' },
          { en: 'stove', pt: 'fogão' },
          { en: 'shower', pt: 'chuveiro' },
          { en: 'television', pt: 'televisão' },
          { en: 'microwave', pt: 'micro-ondas' },
          { en: 'washing machine', pt: 'máquina de lavar' }
        ]
      },
      {
        id: 'h4', titulo: 'Vida doméstica', emoji: '🧹',
        dica: { titulo: 'Inglês sempre tem sujeito', corpo: 'Em português dá para dizer só "está limpa". Em inglês o sujeito é obrigatório: IT is clean, THE house is clean. Some com ele e a frase fica errada.' },
        itens: [
          { en: 'the house is clean', pt: 'a casa está limpa' },
          { en: 'I am in the kitchen', pt: 'eu estou na cozinha' },
          { en: 'close the door, please', pt: 'feche a porta, por favor' },
          { en: 'the keys are on the table', pt: 'as chaves estão na mesa' },
          { en: 'I need to clean my bedroom', pt: 'eu preciso limpar meu quarto', alt: ['I need to clean my room'] }
        ]
      }
    ]
  },
  {
    id: 'corpo',
    titulo: 'Corpo São',
    emoji: '💪',
    cor: '#FF4B4B',
    licoes: [
      {
        id: 's1', titulo: 'Da cabeça aos pés', emoji: '🦶',
        itens: [
          { en: 'head', pt: 'cabeça' },
          { en: 'hand', pt: 'mão' },
          { en: 'foot', pt: 'pé' },
          { en: 'arm', pt: 'braço' },
          { en: 'leg', pt: 'perna' },
          { en: 'eye', pt: 'olho' },
          { en: 'mouth', pt: 'boca' },
          { en: 'nose', pt: 'nariz' }
        ]
      },
      {
        id: 's2', titulo: 'Detalhes do corpo', emoji: '👂',
        itens: [
          { en: 'ear', pt: 'orelha' },
          { en: 'hair', pt: 'cabelo' },
          { en: 'finger', pt: 'dedo' },
          { en: 'tooth', pt: 'dente' },
          { en: 'back', pt: 'costas' },
          { en: 'shoulder', pt: 'ombro' },
          { en: 'knee', pt: 'joelho' }
        ]
      },
      {
        id: 's3', titulo: 'No médico', emoji: '🩺',
        itens: [
          { en: 'doctor', pt: 'médico' },
          { en: 'hospital', pt: 'hospital' },
          { en: 'medicine', pt: 'remédio' },
          { en: 'pain', pt: 'dor' },
          { en: 'fever', pt: 'febre' },
          { en: 'pharmacy', pt: 'farmácia' },
          { en: 'dentist', pt: 'dentista' }
        ]
      },
      {
        id: 's4', titulo: 'Tô passando mal', emoji: '🤒',
        itens: [
          { en: 'I have a headache', pt: 'eu estou com dor de cabeça', nota: 'Dor e sintoma usam have: I HAVE a headache (não "I am with pain").' },
          { en: 'I feel sick', pt: 'eu me sinto doente' },
          { en: 'I need a doctor', pt: 'eu preciso de um médico', nota: 'need não leva preposição: I need A doctor (não "need of").' },
          { en: 'my throat hurts', pt: 'minha garganta dói', nota: 'He/she/it ganha -s no presente: it hurtS.' },
          { en: 'I am better now', pt: 'eu estou melhor agora' },
          { en: 'get well soon', pt: 'melhoras' }
        ]
      }
    ]
  },
  {
    id: 'rotina',
    titulo: 'Rotina de Campeão',
    emoji: '🏃',
    cor: '#6C5CE7',
    licoes: [
      {
        id: 'r1', titulo: 'Verbos na veia', emoji: '⚡',
        dica: { titulo: 'O -s da terceira pessoa', corpo: 'No presente, he, she e it ganham -s no verbo: I eat, mas she eatS. Vale para todo verbo comum — he workS, it hurtS. Com I, you, we e they o verbo fica igualzinho.' },
        itens: [
          { en: 'eat', pt: 'comer' },
          { en: 'drink', pt: 'beber' },
          { en: 'sleep', pt: 'dormir' },
          { en: 'run', pt: 'correr' },
          { en: 'study', pt: 'estudar' },
          { en: 'read', pt: 'ler' },
          { en: 'write', pt: 'escrever' },
          { en: 'speak', pt: 'falar', alt: ['talk'] }
        ]
      },
      {
        id: 'r2', titulo: 'Todo santo dia', emoji: '⏰',
        itens: [
          { en: 'wake up', pt: 'acordar' },
          { en: 'take a shower', pt: 'tomar banho', alt: ['take a bath'] },
          { en: 'brush my teeth', pt: 'escovar os dentes' },
          { en: 'go to work', pt: 'ir ao trabalho' },
          { en: 'come back home', pt: 'voltar para casa', alt: ['go back home', 'come home'] },
          { en: 'watch TV', pt: 'assistir TV' }
        ]
      },
      {
        id: 'r3', titulo: 'Minha rotina', emoji: '🌞',
        itens: [
          { en: 'I wake up early', pt: 'eu acordo cedo' },
          { en: 'I drink coffee every day', pt: 'eu bebo café todos os dias', nota: 'Hábito é presente simples, sem -ing: I drink (não "I am drinking").' },
          { en: 'I study English at night', pt: 'eu estudo inglês à noite' },
          { en: 'I work from home', pt: 'eu trabalho de casa' },
          { en: 'I go to the gym', pt: 'eu vou para a academia' }
        ]
      },
      {
        id: 'r4', titulo: 'Fim de semana', emoji: '🎉',
        itens: [
          { en: 'I sleep late on Sundays', pt: 'eu durmo até tarde aos domingos' },
          { en: "let's watch a movie", pt: 'vamos assistir um filme' },
          { en: 'I like to read books', pt: 'eu gosto de ler livros', nota: 'like + to + verbo: I like TO READ (não "like read").' },
          { en: 'we play video games', pt: 'nós jogamos videogame' },
          { en: 'see you on Monday', pt: 'até segunda-feira' }
        ]
      }
    ]
  }
];

export const POOL_TILES = ['the', 'a', 'is', 'are', 'to', 'and', 'you', 'we', 'it', 'do', 'not', 'have', 'like', 'want', 'my', 'your', 'very', 'good', 'in', 'on'];

export const NIVEIS = [
  { xp: 0, titulo: 'Turista Perdido', emoji: '🧳' },
  { xp: 60, titulo: 'Hello Hello', emoji: '👋' },
  { xp: 150, titulo: 'Decodificador de Cardápio', emoji: '🍔' },
  { xp: 280, titulo: 'Small Talker', emoji: '💬' },
  { xp: 450, titulo: 'Netflix Sem Legenda', emoji: '🍿' },
  { xp: 700, titulo: 'Quase Gringo', emoji: '🛫' },
  { xp: 1000, titulo: 'Gringo Honorário', emoji: '🦅' },
  { xp: 1500, titulo: 'Lenda do Inglês', emoji: '👑' },
  { xp: 2200, titulo: 'Dicionário Ambulante', emoji: '📖' },
  { xp: 3200, titulo: 'Rei da Gringa', emoji: '🌎' }
];

export const VERSAO_APP = '1.5';

export const NOVIDADES = [
  {
    versao: '1.5',
    titulo: 'Diálogos, Relâmpago e o Louro de verdade',
    itens: [
      '💬 Diálogos do Louro: converse em inglês no fim de cada unidade',
      '⚡ Relâmpago: 60 segundos de respostas rápidas, com recorde',
      '🔤 Oficina de Verbos: treine o -s da terceira pessoa',
      '🦜 O Louro virou personagem desenhado, com poses',
      '🔒 Tela de privacidade explicando o que fica no aparelho'
    ]
  },
  {
    versao: '1.4',
    titulo: 'Minha Lista, Chefão e mais',
    itens: [
      '⭐ Favorite palavras no dicionário e treine elas na sua lista',
      '👑 Chefão de unidade: prova final com 3 vidas e sem múltipla escolha',
      '📈 Sua jornada: gráfico de 30 dias e saúde da memória',
      '💾 Backup: exporte e importe seu progresso em arquivo',
      '🔇 Botão de mute e transições suaves entre telas'
    ]
  },
  {
    versao: '1.3',
    titulo: 'Dicionário e voz',
    itens: [
      '📖 Dicionário com ~3.100 palavras, busca em português ou inglês',
      '🔊 Escolha do sotaque, da voz e da velocidade da pronúncia'
    ]
  },
  {
    versao: '1.2',
    titulo: 'Memória e hábito',
    itens: [
      '🧠 Revisão espaçada de verdade (caixas de Leitner)',
      '🎯 Meta diária, missões e protetor de streak',
      '📱 App instalável que funciona offline'
    ]
  }
];

export const HISTORIAS = [
  {
    unidade: 'basico', titulo: 'O primeiro oi', cenario: 'Na fila do café ☕', emoji: '👋',
    falas: [
      { de: 'louro', en: 'Hi! Good morning!', pt: 'Oi! Bom dia!' },
      { de: 'voce', en: 'good morning', pt: 'bom dia' },
      { de: 'louro', en: 'What is your name?', pt: 'Qual é o seu nome?' },
      { de: 'voce', en: 'my name is Ana', pt: 'meu nome é Ana' },
      { de: 'louro', en: 'Nice to meet you, Ana!', pt: 'Prazer em te conhecer, Ana!' },
      { de: 'voce', en: 'thank you', pt: 'obrigado' }
    ]
  },
  {
    unidade: 'comida', titulo: 'Pedindo no balcão', cenario: 'Na lanchonete 🍔', emoji: '🍽️',
    falas: [
      { de: 'louro', en: 'Here is the menu.', pt: 'Aqui está o cardápio.' },
      { de: 'voce', en: 'I want a coffee', pt: 'eu quero um café' },
      { de: 'louro', en: 'Something to eat?', pt: 'Algo para comer?' },
      { de: 'voce', en: 'I would like a pizza', pt: 'eu gostaria de uma pizza' },
      { de: 'louro', en: 'Perfect. Anything else?', pt: 'Perfeito. Mais alguma coisa?' },
      { de: 'voce', en: 'the bill, please', pt: 'a conta, por favor' }
    ]
  },
  {
    unidade: 'viagem', titulo: 'Perdido na cidade', cenario: 'Na rua, com o mapa 🗺️', emoji: '🧭',
    falas: [
      { de: 'louro', en: 'Do you need help?', pt: 'Você precisa de ajuda?' },
      { de: 'voce', en: 'I am lost', pt: 'eu estou perdido' },
      { de: 'louro', en: 'Where do you want to go?', pt: 'Onde você quer ir?' },
      { de: 'voce', en: 'where is the bathroom?', pt: 'onde fica o banheiro?' },
      { de: 'louro', en: 'Turn left. It is near.', pt: 'Vire à esquerda. É perto.' },
      { de: 'voce', en: 'thank you', pt: 'obrigado' }
    ]
  },
  {
    unidade: 'trabalho', titulo: 'Antes da reunião', cenario: 'No escritório 💼', emoji: '🗣️',
    falas: [
      { de: 'louro', en: 'Good morning! Busy day?', pt: 'Bom dia! Dia cheio?' },
      { de: 'voce', en: 'I have a meeting', pt: 'eu tenho uma reunião' },
      { de: 'louro', en: 'Can you send the report?', pt: 'Você pode enviar o relatório?' },
      { de: 'voce', en: 'no problem', pt: 'sem problema' },
      { de: 'louro', en: 'Great. Any questions?', pt: 'Ótimo. Alguma pergunta?' },
      { de: 'voce', en: 'I agree', pt: 'eu concordo' }
    ]
  },
  {
    unidade: 'familia', titulo: 'Mostrando a família', cenario: 'Olhando fotos 📷', emoji: '👨‍👩‍👧',
    falas: [
      { de: 'louro', en: 'Who is she?', pt: 'Quem é ela?' },
      { de: 'voce', en: 'this is my mother', pt: 'esta é minha mãe' },
      { de: 'louro', en: 'And these two?', pt: 'E esses dois?' },
      { de: 'voce', en: 'I have two brothers', pt: 'eu tenho dois irmãos' },
      { de: 'louro', en: 'What a big family!', pt: 'Que família grande!' },
      { de: 'voce', en: 'I love my family', pt: 'eu amo minha família' }
    ]
  },
  {
    unidade: 'casa', titulo: 'Visitando a casa', cenario: 'Tour pela casa 🏠', emoji: '🚪',
    falas: [
      { de: 'louro', en: 'Welcome! Come in.', pt: 'Bem-vindo! Entre.' },
      { de: 'voce', en: 'the house is clean', pt: 'a casa está limpa' },
      { de: 'louro', en: 'Thanks! Where are you?', pt: 'Obrigado! Onde você está?' },
      { de: 'voce', en: 'I am in the kitchen', pt: 'eu estou na cozinha' },
      { de: 'louro', en: 'The keys are there.', pt: 'As chaves estão lá.' },
      { de: 'voce', en: 'close the door, please', pt: 'feche a porta, por favor' }
    ]
  },
  {
    unidade: 'corpo', titulo: 'Na farmácia', cenario: 'Balcão da farmácia 💊', emoji: '🩺',
    falas: [
      { de: 'louro', en: 'How can I help?', pt: 'Como posso ajudar?' },
      { de: 'voce', en: 'I feel sick', pt: 'eu me sinto doente' },
      { de: 'louro', en: 'What is wrong?', pt: 'O que está errado?' },
      { de: 'voce', en: 'I have a headache', pt: 'eu estou com dor de cabeça' },
      { de: 'louro', en: 'Take this medicine.', pt: 'Tome este remédio.' },
      { de: 'voce', en: 'get well soon', pt: 'melhoras' }
    ]
  },
  {
    unidade: 'rotina', titulo: 'Papo de segunda', cenario: 'Café da manhã ☀️', emoji: '⏰',
    falas: [
      { de: 'louro', en: 'You are early today!', pt: 'Você está cedo hoje!' },
      { de: 'voce', en: 'I wake up early', pt: 'eu acordo cedo' },
      { de: 'louro', en: 'And what about English?', pt: 'E o inglês?' },
      { de: 'voce', en: 'I study English at night', pt: 'eu estudo inglês à noite' },
      { de: 'louro', en: 'Nice! And on weekends?', pt: 'Legal! E nos fins de semana?' },
      { de: 'voce', en: 'I like to read books', pt: 'eu gosto de ler livros' }
    ]
  }
];

export const VERBOS = [
  { en: 'eat', en3: 'eats', pt: 'comer', pt3: 'come' },
  { en: 'drink', en3: 'drinks', pt: 'beber', pt3: 'bebe' },
  { en: 'sleep', en3: 'sleeps', pt: 'dormir', pt3: 'dorme' },
  { en: 'run', en3: 'runs', pt: 'correr', pt3: 'corre' },
  { en: 'study', en3: 'studies', pt: 'estudar', pt3: 'estuda' },
  { en: 'read', en3: 'reads', pt: 'ler', pt3: 'lê' },
  { en: 'write', en3: 'writes', pt: 'escrever', pt3: 'escreve' },
  { en: 'speak', en3: 'speaks', pt: 'falar', pt3: 'fala' },
  { en: 'work', en3: 'works', pt: 'trabalhar', pt3: 'trabalha' },
  { en: 'live', en3: 'lives', pt: 'morar', pt3: 'mora' },
  { en: 'watch', en3: 'watches', pt: 'assistir', pt3: 'assiste' },
  { en: 'go', en3: 'goes', pt: 'ir', pt3: 'vai' },
  { en: 'do', en3: 'does', pt: 'fazer', pt3: 'faz' },
  { en: 'have', en3: 'has', pt: 'ter', pt3: 'tem' },
  { en: 'want', en3: 'wants', pt: 'querer', pt3: 'quer' },
  { en: 'need', en3: 'needs', pt: 'precisar', pt3: 'precisa' },
  { en: 'like', en3: 'likes', pt: 'gostar', pt3: 'gosta' },
  { en: 'know', en3: 'knows', pt: 'saber', pt3: 'sabe' },
  { en: 'learn', en3: 'learns', pt: 'aprender', pt3: 'aprende' },
  { en: 'teach', en3: 'teaches', pt: 'ensinar', pt3: 'ensina' },
  { en: 'buy', en3: 'buys', pt: 'comprar', pt3: 'compra' },
  { en: 'pay', en3: 'pays', pt: 'pagar', pt3: 'paga' },
  { en: 'help', en3: 'helps', pt: 'ajudar', pt3: 'ajuda' },
  { en: 'open', en3: 'opens', pt: 'abrir', pt3: 'abre' },
  { en: 'close', en3: 'closes', pt: 'fechar', pt3: 'fecha' },
  { en: 'travel', en3: 'travels', pt: 'viajar', pt3: 'viaja' },
  { en: 'cook', en3: 'cooks', pt: 'cozinhar', pt3: 'cozinha' },
  { en: 'drive', en3: 'drives', pt: 'dirigir', pt3: 'dirige' },
  { en: 'wake up', en3: 'wakes up', pt: 'acordar', pt3: 'acorda' },
  { en: 'listen', en3: 'listens', pt: 'ouvir', pt3: 'ouve' }
];

export const SUJEITOS = [
  { en: 'I', pt: 'eu', terceira: false },
  { en: 'you', pt: 'você', terceira: false },
  { en: 'we', pt: 'nós', terceira: false },
  { en: 'they', pt: 'eles', terceira: false },
  { en: 'he', pt: 'ele', terceira: true },
  { en: 'she', pt: 'ela', terceira: true },
  { en: 'my brother', pt: 'meu irmão', terceira: true },
  { en: 'my mother', pt: 'minha mãe', terceira: true }
];

export const MISSOES = [
  { id: 'acertos15', emoji: '🎯', titulo: 'Acerte 15 respostas', alvo: 15, xp: 15, medir: s => s.acertos },
  { id: 'licao1', emoji: '📚', titulo: 'Complete 1 lição', alvo: 1, xp: 10, medir: s => (s.tipo === 'licao' ? 1 : 0) },
  { id: 'combo4', emoji: '⚡', titulo: 'Faça um combo x4', alvo: 1, xp: 10, medir: s => (s.comboMax >= 4 ? 1 : 0) },
  { id: 'revisao1', emoji: '🧠', titulo: 'Faça 1 Revisão Turbo', alvo: 1, xp: 15, medir: s => (s.tipo === 'revisao' ? 1 : 0) },
  { id: 'perfeita1', emoji: '💯', titulo: 'Termine uma lição sem errar', alvo: 1, xp: 20, medir: s => (s.perfeita ? 1 : 0) },
  { id: 'xp80', emoji: '⭐', titulo: 'Ganhe 80 XP hoje', alvo: 80, xp: 15, medir: s => s.xp },
  { id: 'respostas25', emoji: '🔥', titulo: 'Responda 25 exercícios', alvo: 25, xp: 15, medir: s => s.respostas }
];

export const BADGES = [
  { id: 'primeira', emoji: '🐣', nome: 'Primeiro Passo', desc: 'Complete sua primeira lição' },
  { id: 'perfeita', emoji: '💯', nome: 'Perfeccionista', desc: 'Termine uma lição sem errar' },
  { id: 'combo5', emoji: '⚡', nome: 'Eletrizante', desc: 'Faça um combo x5' },
  { id: 'xp100', emoji: '💪', nome: 'Centurião', desc: 'Alcance 100 XP' },
  { id: 'xp500', emoji: '🏆', nome: 'Meio Gringo', desc: 'Alcance 500 XP' },
  { id: 'streak3', emoji: '🔥', nome: 'Pegando Fogo', desc: '3 dias seguidos de estudo' },
  { id: 'streak7', emoji: '🚀', nome: 'Imparável', desc: '7 dias seguidos de estudo' },
  { id: 'revisor', emoji: '🧠', nome: 'Memória de Elefante', desc: 'Complete uma Revisão Turbo' },
  { id: 'unidade', emoji: '🎓', nome: 'Formando', desc: 'Complete uma unidade inteira' },
  { id: 'streak14', emoji: '🌟', nome: 'Duas Semanas', desc: '14 dias seguidos de estudo' },
  { id: 'streak30', emoji: '💎', nome: 'Mês Cravado', desc: '30 dias seguidos de estudo' },
  { id: 'xp1000', emoji: '🏅', nome: 'Milionário de XP', desc: 'Alcance 1000 XP' },
  { id: 'xp2000', emoji: '👑', nome: 'Dois Mil', desc: 'Alcance 2000 XP' },
  { id: 'licoes25', emoji: '📚', nome: 'Maratonista', desc: 'Conclua 25 lições' },
  { id: 'perfeitas10', emoji: '🎖️', nome: 'Impecável', desc: 'Termine 10 lições sem errar' },
  { id: 'memoria50', emoji: '🌳', nome: 'Raiz Firme', desc: '50 palavras na memória longa' },
  { id: 'metas7', emoji: '🎯', nome: 'Meta em Dia', desc: 'Bata a meta diária 7 vezes' },
  { id: 'tudo', emoji: '🦜', nome: 'Louro Aprova', desc: 'Complete todas as lições' }
];

export const MASCOTE = {
  acerto: [
    'Aí sim! 🎉',
    'Mandou bem, gringo!',
    'Craque demais! ⚽',
    'English level: subindo! 📈',
    'O Louro aprovou! 🦜',
    'Shakespeare tá orgulhoso 🎭',
    'Isso aí! 🔥',
    'Nailed it! 💅'
  ],
  erro: [
    'Quase! Bora de novo 💪',
    'Relaxa, até o Louro erra 🦜',
    'Errar faz parte do gringo 🌱',
    'Anota essa que cai na prova 📝',
    'Ops! Mas você tá evoluindo 🚀',
    'Foco no foco! 🎯'
  ],
  resultado: {
    3: ['PERFEITO DEMAIS! O Louro tá sem palavras 🤯', 'Você tá pronto pra Disney! 🎢', 'Isso foi coisa de gringo raiz! 🦅'],
    2: ['Muito bom! Quase gabaritou 👏', 'Tá voando baixo! ✈️', 'O Louro bateu palmas com as asas 🦜'],
    1: ['Terminou! E terminar já é vitória 💪', 'Foi na raça! Bora revisar depois 🔁', 'O importante é não desistir 🌱']
  }
};
