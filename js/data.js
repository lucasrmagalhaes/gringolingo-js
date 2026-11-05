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
          { en: 'hello', pt: 'olá', evitar: ['hi'] },
          { en: 'hi', pt: 'oi', evitar: ['hello'] },
          { en: 'good morning', pt: 'bom dia' },
          { en: 'good night', pt: 'boa noite', nota: 'Good night é só de despedida ou na hora de dormir; para cumprimentar alguém à noite, diga good evening.' },
          { en: 'bye', pt: 'tchau', alt: ['goodbye'] },
          { en: 'please', pt: 'por favor' },
          { en: 'thank you', pt: 'obrigado' },
          { en: 'yes', pt: 'sim' },
          { en: 'no', pt: 'não' }
        ]
      },
      {
        id: 'b2', titulo: 'Quem é você?', emoji: '🙋',
        dica: { titulo: 'Ser e estar viram to be', corpo: 'Em inglês não existe a dupla ser/estar: os dois viram to be. E ele muda com a pessoa. I am, you are, he/she/it is, we/they are. Por isso "eu estou bem" é I am fine.' },
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
          { en: 'excuse me', pt: 'com licença', nota: 'Excuse me vem ANTES: para chamar atenção ou pedir passagem; desculpa por um erro é sorry.' },
          { en: 'sorry', pt: 'desculpa', nota: 'Sorry vem DEPOIS do erro, para se desculpar; para interromper ou pedir passagem, use excuse me.' },
          { en: "I don't understand", pt: 'eu não entendo', nota: 'Negativa no presente pede o do: I do not understand. Nunca "I not understand".' },
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
          { en: 'bread', pt: 'pão', nota: 'Pão é incontável em inglês: some bread. Nunca "a bread" nem "breads".' },
          { en: 'cheese', pt: 'queijo' },
          { en: 'chicken', pt: 'frango', nota: 'Cuidado com a troca: chicken é o frango, kitchen é a cozinha.' },
          { en: 'rice', pt: 'arroz' },
          { en: 'beans', pt: 'feijão' },
          { en: 'egg', pt: 'ovo' }
        ]
      },
      {
        id: 'c2', titulo: 'No restaurante', emoji: '🍽️',
        dica: { titulo: 'Contável pede a ou an', corpo: 'Coisa contável no singular sempre leva a ou an: I want A coffee, I would like A pizza. Antes de som de vogal vira an: an egg, an apple. Falando da comida em geral, sem contar, o artigo some: I like coffee.' },
        itens: [
          { en: 'menu', pt: 'cardápio' },
          { en: 'breakfast', pt: 'café da manhã' },
          { en: 'lunch', pt: 'almoço', nota: 'Lunch é o almoço; launch (com a) é lançamento. Cuidado ao digitar.' },
          { en: 'dinner', pt: 'jantar' },
          { en: 'the bill, please', pt: 'a conta, por favor', alt: ['the check, please'] },
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
          { en: 'airplane', pt: 'avião', alt: ['plane'] },
          { en: 'ticket', pt: 'passagem' },
          { en: 'passport', pt: 'passaporte' },
          { en: 'luggage', pt: 'bagagem', alt: ['baggage'], nota: 'Luggage é incontável: nada de "luggages". Para contar, diga two bags.' },
          { en: 'trip', pt: 'viagem', nota: 'A viagem que você faz é a trip; travel é mais o verbo viajar.' },
          { en: 'hotel', pt: 'hotel' }
        ]
      },
      {
        id: 'v2', titulo: 'Tô perdido', emoji: '🧭',
        itens: [
          { en: 'where is the bathroom?', pt: 'onde fica o banheiro?', alt: ['where is the restroom?', 'where is the toilet?'] },
          { en: 'how much is it?', pt: 'quanto custa?', nota: 'Preço se pergunta com how much + is: how much IS it?' },
          { en: 'I am lost', pt: 'eu estou perdido', nota: 'Estados de pessoa usam to be: I AM lost (não "I have lost").' },
          { en: 'turn left', pt: 'vire à esquerda', nota: 'Vire à esquerda é só turn left. O "à" não vira to.' },
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
          { en: 'store', pt: 'loja', alt: ['shop'] },
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
          { en: 'can I pay by card?', pt: 'posso pagar com cartão?', nota: 'Com cartão = BY card, sem artigo: pay by card.' }
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
          { en: 'job', pt: 'emprego', nota: 'Job é contável: a job, two jobs; work (trabalho em geral) fica sem o a.' },
          { en: 'salary', pt: 'salário' },
          { en: 'deadline', pt: 'prazo' },
          { en: 'office', pt: 'escritório', nota: 'Falso amigo: office é escritório. Oficina de carro é garage.' }
        ]
      },
      {
        id: 't2', titulo: 'Papo de reunião', emoji: '🗣️',
        dica: { titulo: 'O imperativo vem sem sujeito', corpo: "Pedido em inglês vai com o verbo direto, sem sujeito: send me the report, close the door. Para chamar todo mundo junto, use let's + verbo: let's start. E um please no fim deixa qualquer pedido mais educado." },
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
          { en: 'mother', pt: 'mãe', alt: ['mom', 'mum'] },
          { en: 'father', pt: 'pai', alt: ['dad'] },
          { en: 'brother', pt: 'irmão' },
          { en: 'sister', pt: 'irmã' },
          { en: 'son', pt: 'filho' },
          { en: 'daughter', pt: 'filha' },
          { en: 'parents', pt: 'pais', nota: 'Falso amigo: parents são só pai e mãe. Parentes em geral é relatives.' }
        ]
      },
      {
        id: 'f2', titulo: 'Família grande', emoji: '👵',
        itens: [
          { en: 'grandmother', pt: 'avó', alt: ['grandma'] },
          { en: 'grandfather', pt: 'avô', alt: ['grandpa'] },
          { en: 'uncle', pt: 'tio' },
          { en: 'aunt', pt: 'tia' },
          { en: 'cousin', pt: 'primo', nota: 'Cousin vale para primo e prima. O inglês não marca o gênero aqui.' },
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
        dica: { titulo: 'My dispensa o artigo', corpo: 'Meu e minha viram uma palavra só: my. My mother, my family. E o artigo some: she is my sister, nunca "the my sister". Para ele use his, para ela use her.' },
        itens: [
          { en: 'this is my mother', pt: 'esta é minha mãe' },
          { en: 'I have two brothers', pt: 'eu tenho dois irmãos', nota: 'Não engula o s do plural: two brotherS.' },
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
          { en: 'bedroom', pt: 'quarto', alt: ['room'] },
          { en: 'kitchen', pt: 'cozinha', nota: 'Não confunda: kitchen é a cozinha, chicken é o frango.' },
          { en: 'bathroom', pt: 'banheiro', alt: ['restroom', 'toilet'] },
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
          { en: 'sofa', pt: 'sofá', alt: ['couch'] },
          { en: 'mirror', pt: 'espelho' }
        ]
      },
      {
        id: 'h3', titulo: 'Eletro & cia', emoji: '🔌',
        itens: [
          { en: 'refrigerator', pt: 'geladeira', alt: ['fridge'] },
          { en: 'stove', pt: 'fogão' },
          { en: 'shower', pt: 'chuveiro' },
          { en: 'television', pt: 'televisão', alt: ['TV'] },
          { en: 'microwave', pt: 'micro-ondas' },
          { en: 'washing machine', pt: 'máquina de lavar' }
        ]
      },
      {
        id: 'h4', titulo: 'Vida doméstica', emoji: '🧹',
        dica: { titulo: 'Inglês sempre tem sujeito', corpo: 'Em português dá para dizer só "está limpa". Em inglês o sujeito é obrigatório: IT is clean, THE house is clean. Some com ele e a frase fica errada.' },
        itens: [
          { en: 'the house is clean', pt: 'a casa está limpa' },
          { en: 'I am in the kitchen', pt: 'eu estou na cozinha', nota: 'Dentro de um cômodo é IN: in the kitchen (não "on").' },
          { en: 'close the door, please', pt: 'feche a porta, por favor' },
          { en: 'the keys are on the table', pt: 'as chaves estão na mesa', nota: 'Em cima de superfície é ON: on the table; in é dentro.' },
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
          { en: 'foot', pt: 'pé', nota: 'Plural irregular: one foot, two FEET. Nada de foots.' },
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
          { en: 'hair', pt: 'cabelo', nota: 'Hair é singular em inglês: my hair IS (não "my hairs are").' },
          { en: 'finger', pt: 'dedo' },
          { en: 'tooth', pt: 'dente', nota: 'Plural irregular: one tooth, two TEETH. Por isso é brush my teeth.' },
          { en: 'back', pt: 'costas', nota: 'Costas é plural no português, mas em inglês é singular: my back hurts.' },
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
          { en: 'pharmacy', pt: 'farmácia', alt: ['drugstore'] },
          { en: 'dentist', pt: 'dentista' }
        ]
      },
      {
        id: 's4', titulo: 'Tô passando mal', emoji: '🤒',
        dica: { titulo: 'Sintoma usa have, estado usa be', corpo: 'Dor, febre e sintoma se TÊM: I have a headache, I have a fever. Já como você está vai com to be: I am better, I am sick. E o "estou com" do português não vira "I am with". Cai todo mundo nessa.' },
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
        dica: { titulo: 'O -s da terceira pessoa', corpo: 'No presente, he, she e it ganham -s no verbo: I eat, mas she eatS. Vale para todo verbo comum. He workS, it hurtS. Com I, you, we e they o verbo fica igualzinho.' },
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
          { en: 'brush my teeth', pt: 'escovar os dentes', nota: 'Teeth é o plural irregular de tooth: um dente, vários teeth.' },
          { en: 'go to work', pt: 'ir ao trabalho' },
          { en: 'come back home', pt: 'voltar para casa', alt: ['go back home', 'come home'] },
          { en: 'watch TV', pt: 'assistir TV', alt: ['watch television'] }
        ]
      },
      {
        id: 'r3', titulo: 'Minha rotina', emoji: '🌞',
        dica: { titulo: 'Hábito usa presente simples', corpo: 'Rotina e hábito vão no presente simples, sem -ing: I drink coffee every day, I wake up early. O -ing (I am drinking) é só para o que está acontecendo agora. Um complemento de tempo marca bem o hábito: every day, at night.' },
        itens: [
          { en: 'I wake up early', pt: 'eu acordo cedo' },
          { en: 'I drink coffee every day', pt: 'eu bebo café todos os dias', nota: 'Hábito é presente simples, sem -ing: I drink (não "I am drinking").' },
          { en: 'I study English at night', pt: 'eu estudo inglês à noite', nota: 'À noite é AT night; de manhã e de tarde é in the morning, in the afternoon.' },
          { en: 'I work from home', pt: 'eu trabalho de casa' },
          { en: 'I go to the gym', pt: 'eu vou para a academia' }
        ]
      },
      {
        id: 'r4', titulo: 'Fim de semana', emoji: '🎉',
        itens: [
          { en: 'I sleep late on Sundays', pt: 'eu durmo até tarde aos domingos', nota: 'Dia da semana pede ON: on Sundays, on Monday.' },
          { en: "let's watch a movie", pt: 'vamos assistir um filme', alt: ["let's watch a film"] },
          { en: 'I like to read books', pt: 'eu gosto de ler livros', nota: 'like + to + verbo: I like TO READ (não "like read").' },
          { en: 'we play video games', pt: 'nós jogamos videogame' },
          { en: 'see you on Monday', pt: 'até segunda-feira' }
        ]
      }
    ]
  },
  {
    id: 'lazer',
    titulo: 'Tempo Livre',
    emoji: '🌤️',
    cor: '#3D5AFE',
    licoes: [
      {
        id: 'z1', titulo: 'O tempo lá fora', emoji: '⛅',
        dica: { titulo: 'O clima pede it', corpo: 'Em inglês o tempo sempre tem sujeito: it is hot, it is raining. "Está quente" sozinho não existe. It is raining é o que acontece agora. It rains é o hábito do lugar.' },
        itens: [
          { en: 'sunny', pt: 'ensolarado' },
          { en: 'rainy', pt: 'chuvoso' },
          { en: 'cloudy', pt: 'nublado' },
          { en: 'windy', pt: 'ventoso' },
          { en: 'it is hot', pt: 'está quente', nota: 'O clima pede it: it is hot. Sem o it a frase fica capenga.' },
          { en: 'it is cold', pt: 'está frio' },
          { en: 'the weather is nice', pt: 'o tempo está bom' },
          { en: 'it is raining', pt: 'está chovendo', nota: 'Neste momento é it is raining. O hábito do lugar é it rains.' }
        ]
      },
      {
        id: 'z2', titulo: 'Como você está?', emoji: '😊',
        dica: { titulo: 'Fome é am, não have', corpo: 'Estado e humor vão com to be: I am hungry, I am tired, I am bored. Have fica para sintoma: I have a headache. E bored é quem sente tédio. Boring é a coisa que entedia.' },
        itens: [
          { en: 'happy', pt: 'feliz' },
          { en: 'sad', pt: 'triste' },
          { en: 'tired', pt: 'cansado' },
          { en: 'angry', pt: 'bravo', nota: 'Angry é bravo. Com fome é hungry. As duas se confundem fácil.' },
          { en: 'I am hungry', pt: 'eu estou com fome', nota: 'Com fome é I am hungry. "I have hungry" é o português vazando.' },
          { en: 'I am bored', pt: 'eu estou entediado', nota: 'Bored é quem está entediado. Boring é o que causa tédio: a boring movie.' },
          { en: 'I feel great', pt: 'eu me sinto ótimo' },
          { en: 'are you ok?', pt: 'você está bem?' }
        ]
      },
      {
        id: 'z3', titulo: 'Bora sair?', emoji: '🎟️',
        dica: { titulo: 'Agora pede -ing', corpo: 'O que está acontecendo neste momento usa be + verbo com -ing: what are you doing, I am free. Plano e convite continuam no presente simples: do you want to come?' },
        itens: [
          { en: 'tonight', pt: 'hoje à noite' },
          { en: 'tomorrow', pt: 'amanhã' },
          { en: 'next week', pt: 'semana que vem' },
          { en: 'I am free', pt: 'eu estou livre' },
          { en: 'I am busy', pt: 'eu estou ocupado' },
          { en: "let's go out", pt: 'vamos sair' },
          { en: 'what are you doing?', pt: 'o que você está fazendo?', nota: 'Agora pede are + -ing: what are you doing? O hábito seria what do you do?' },
          { en: 'do you want to come?', pt: 'você quer vir?' }
        ]
      },
      {
        id: 'z4', titulo: 'Combinado', emoji: '🤝',
        dica: { titulo: 'Hora pede at', corpo: 'Hora e noite usam at: at seven, at night. Dia da semana usa on. Can na negativa é cannot ou can\'t, sem do, e o verbo seguinte vem puro.' },
        itens: [
          { en: 'sounds good', pt: 'parece bom' },
          { en: 'maybe later', pt: 'talvez mais tarde' },
          { en: "I can't tonight", pt: 'eu não posso hoje à noite', nota: 'A negativa de can é cannot, sem do: I can\'t tonight. Nada de "I don\'t can".' },
          { en: 'see you tonight', pt: 'até hoje à noite' },
          { en: 'that sounds fun', pt: 'isso parece divertido' },
          { en: 'I would love to', pt: 'eu adoraria' },
          { en: 'another time', pt: 'outra hora' },
          { en: "let's meet at seven", pt: 'vamos nos encontrar às sete', nota: 'Hora pede at: at seven. Às sete da noite também pode ser at 7 p.m.' }
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

export const VERSAO_APP = '3.19';

export const NOVIDADES = [
  {
    versao: '3.19',
    titulo: 'O slo',
    itens: [
      '🎯 Diga que o slo marca a meta',
      '📐 Avise que o sli mede a meta',
      '📡 Diga que o probe testa a porta'
    ]
  },
  {
    versao: '3.18',
    titulo: 'O skew',
    itens: [
      '📏 Diga que o skew entorta a chave',
      '🌶️ Avise que o hotspot esquenta a chave',
      '🐌 Diga que o tail atrasa a chamada',
      '📊 A barra da unidade usa trilho claro e fill verde'
    ]
  },
  {
    versao: '3.17',
    titulo: 'O histogram',
    itens: [
      '📊 Diga que o histogram conta o balde',
      '🌡️ Avise que o gauge mostra o nível',
      '🪣 Diga que o backfill enche o buraco',
      '📏 O banner da unidade mostra quantos nós já foram feitos'
    ]
  },
  {
    versao: '3.16',
    titulo: 'O iterator',
    itens: [
      '🐾 Diga que o iterator anda a chave',
      '📑 Avise que o pager carrega a página',
      '💨 Diga que o evict solta a página fria',
      '💬 Diga no hub o idiom do dia'
    ]
  },
  {
    versao: '3.15',
    titulo: 'Visual novo',
    itens: [
      '🎨 Paleta chapada, Nunito 700 a 900 e botão que afunda',
      '🌙 Modo escuro com a mesma cara, sem vidro',
      '🛤️ Hub em trilha: Agora, nós e favorito no card',
      '🎭 Lição em palco, com o Louro e a folha de feedback',
      '🏆 Perfil em vitrine: nível, três números e conquistas'
    ]
  },
  {
    versao: '3.14',
    titulo: 'O sstable',
    itens: [
      '🧱 Diga que o sstable ordena a chave',
      '🔒 Avise que o latch segura a leitura',
      '🚥 Diga que o throttle limita a chamada',
      '🧩 Diga no hub a expressão do dia'
    ]
  },
  {
    versao: '3.13',
    titulo: 'O manifest',
    itens: [
      '📜 Diga que o manifesto lista o arquivo',
      '🐇 Avise que o hedge cobre a espera',
      '⏲️ Diga que o debounce espera a pausa',
      '⏩ Ouça no hub a redução do dia'
    ]
  },
  {
    versao: '3.12',
    titulo: 'O flush',
    itens: [
      '🚰 Diga que o flush desce a memória',
      '📥 Avise que a memtable guarda a linha',
      '📚 Diga que o extent junta as páginas',
      '🔢 Ouça no hub o número do dia'
    ]
  },
  {
    versao: '3.11',
    titulo: 'O epoch',
    itens: [
      '🌅 Diga que o epoch abre o termo',
      '🗳️ Avise que o ballot conta o voto',
      '🪵 Diga que a fence segura a escrita',
      '🔤 Diga no hub o verbo do dia'
    ]
  },
  {
    versao: '3.10',
    titulo: 'O stripe',
    itens: [
      '🧵 Diga que o stripe espalha o bloco',
      '🔁 Avise que o parity recupera o dado',
      '🔨 Diga que o rebuild refaz o disco',
      '👅 Ouça no hub o par de som do dia'
    ]
  },
  {
    versao: '3.09',
    titulo: 'O journal',
    itens: [
      '📓 Diga que o journal anota a mudança',
      '🗂️ Avise que o segment fecha o arquivo',
      '💧 Diga que o spill manda o excesso ao disco',
      '👂 Ouça no hub a cena do dia e responda'
    ]
  },
  {
    versao: '3.08',
    titulo: 'O tombstone',
    itens: [
      '🪦 Diga que a lápide marca a chave apagada',
      '🗑️ Avise que a limpeza tira a chave morta',
      '♻️ Diga que o espaço volta para a lista livre',
      '❓ Diga no hub a pergunta de trabalho do dia'
    ]
  },
  {
    versao: '3.07',
    titulo: 'O checksum',
    itens: [
      '🧾 Diga que a soma confere o bloco inteiro',
      '🛡️ Avise que a parede isola o excesso',
      '🛟 Diga que o plano reserva entra no lugar',
      '🗣️ Ouça no hub a frase curta do dia e repita'
    ]
  },
  {
    versao: '3.06',
    titulo: 'O witness',
    itens: [
      '👁️ Diga que a testemunha viu o acordo fechado',
      '🗳️ Avise que o voto entra na contagem final',
      '🎓 Diga que quem aprende só escuta o grupo',
      '📝 Diga no hub a frase de sobrevivência que ainda não entrou'
    ]
  },
  {
    versao: '3.05',
    titulo: 'O watermark',
    itens: [
      '🪧 Diga que a marca mostra até onde a leitura chegou',
      '🚧 Avise que a barreira espera o lote inteiro',
      '📐 Diga que as linhas ficam na mesma altura',
      '📝 Diga no hub a palavra de vocabulário que já venceu'
    ]
  },
  {
    versao: '3.04',
    titulo: 'O shard',
    itens: [
      '🧩 Diga que o pedaço guarda uma parte da chave',
      '⚖️ Avise que as partes trocam de lugar',
      '🪓 Diga que a parte grande vira duas',
      '📝 Diga de novo no hub a frase de fala que já venceu'
    ]
  },
  {
    versao: '3.03',
    titulo: 'O vector',
    itens: [
      '🧭 Diga que cada nó guarda o próprio relógio',
      '⚫ Avise que o ponto nomeia uma escrita',
      '🔗 Diga que a causa chega antes do efeito',
      '📝 Comece no hub o favorito que ainda não teve fala'
    ]
  },
  {
    versao: '3.02',
    titulo: 'O crdt',
    itens: [
      '🔀 Diga que as edições se juntam sem trava',
      '🕰️ Avise que a escrita mais nova vence o campo',
      '📦 Diga que o item fica até a remoção aparecer',
      '📝 Veja no hub o treino do último grupo que a fala ainda não tocou'
    ]
  },
  {
    versao: '3.01',
    titulo: 'O bitmap',
    itens: [
      '🗺️ Diga que o mapa marca o bit da chave',
      '🦁 Avise que os bits iguais viram um intervalo',
      '🧮 Diga que a conta estima itens distintos',
      '📝 Veja no hub o treino para reforçar o grupo que você já falou'
    ]
  },
  {
    versao: '3.00',
    titulo: 'O hint',
    itens: [
      '🔖 Diga que a dica aponta a linha',
      '🧹 Avise que a limpeza devolve o espaço',
      '🧊 Diga que a linha antiga fica para leitura',
      '📝 Veja no hub o próximo treino para praticar'
    ]
  },
  {
    versao: '2.99',
    titulo: 'O gossip',
    itens: [
      '📣 Diga que os nós trocam o estado entre si',
      '📉 Avise que a suspeita sobe com a pausa',
      '🧺 Diga que a falha soma aos poucos',
      '📝 Veja no hub o grupo que a fala ainda não tocou'
    ]
  },
  {
    versao: '2.98',
    titulo: 'O merkle',
    itens: [
      '🌳 Diga que a árvore resume as folhas num selo',
      '✂️ Avise que a árvore corta o prefixo comum',
      '🔤 Diga que a árvore guarda a palavra letra a letra',
      '📝 Veja no hub o dia da semana em que a fala fechou'
    ]
  },
  {
    versao: '2.97',
    titulo: 'O bloom',
    itens: [
      '🌸 Diga que o filtro pode dizer que a chave está lá',
      '🪺 Avise que a chave muda de ninho quando o lugar enche',
      '✏️ Diga que o desenho guarda uma conta pequena',
      '📝 Veja no hub a estação em que a fala abriu'
    ]
  },
  {
    versao: '2.96',
    titulo: 'O snapshot',
    itens: [
      '📷 Diga que a foto guarda o banco naquele instante',
      '↩️ Avise que a foto devolve o banco ao instante salvo',
      '🚀 Diga que a cópia vira o banco principal',
      '📝 Veja no hub o dia da semana em que a fala abriu'
    ]
  },
  {
    versao: '2.95',
    titulo: 'O offset',
    itens: [
      '📏 Diga que o leitor marca até onde já leu',
      '🐢 Avise que o leitor fica atrás do escritor',
      '✅ Diga que o leitor confirma o trecho lido',
      '📝 Veja no hub a faixa das semanas com fala'
    ]
  },
  {
    versao: '2.94',
    titulo: 'O outbox',
    itens: [
      '📤 Diga que a mensagem espera fora antes de sair',
      '📥 Avise que a mensagem entra e espera a vez',
      '📮 Diga que o posto repassa a mensagem adiante',
      '📝 Veja no hub a virada dos meses com fala'
    ]
  },
  {
    versao: '2.93',
    titulo: 'O lease',
    itens: [
      '🔑 Diga que a trava alugada vale por um tempo',
      '🔄 Avise que a trava ganha tempo antes de cair',
      '⌛ Diga que a trava solta quando o tempo acaba',
      '📝 Veja no hub o turno dos dias úteis'
    ]
  },
  {
    versao: '2.92',
    titulo: 'O nonce',
    itens: [
      '🎲 Diga que o número entra uma vez e não volta',
      '🏷️ Avise que o selo confere a mensagem e a chave',
      '✉️ Diga que a chave viaja dentro de outra chave',
      '📝 Veja no hub o mosaico dos grupos praticados'
    ]
  },
  {
    versao: '2.91',
    titulo: 'O wal',
    itens: [
      '🪵 Diga que a escrita entra no log antes da tabela',
      '🧷 Avise que o número do registro só avança',
      '📍 Diga que o marco grava um ponto seguro',
      '📝 Veja no hub a mediana dos segundos de fala'
    ]
  },
  {
    versao: '2.90',
    titulo: 'O bizantino',
    itens: [
      '🤥 Diga que um nó mente e os outros concordam',
      '🧱 Avise que a rede se divide e os lados não se veem',
      '⚔️ Diga que os dois exércitos avançam com a mesma ordem',
      '📝 Veja no hub o salto entre o dia mais longo e o mais curto'
    ]
  },
  {
    versao: '2.89',
    titulo: 'O sidecar',
    itens: [
      '🛵 Diga que o ajudante mora ao lado',
      '🌐 Avise que o proxy fala por quem está fora',
      '🔌 Diga que a tradução liga o cliente antigo',
      '📝 Veja no hub o longo dos segundos de fala'
    ]
  },
  {
    versao: '2.88',
    titulo: 'A fome',
    itens: [
      '🍖 Diga que a tarefa espera e não roda',
      '🔃 Avise que a baixa segura o recurso',
      '🧓 Diga que a espera sobe a prioridade',
      '📝 Veja no hub o curto dos segundos de fala'
    ]
  },
  {
    versao: '2.87',
    titulo: 'A sujeira',
    itens: [
      '🫧 Diga que a leitura pega o valor aberto',
      '📸 Avise que a foto congela as linhas',
      '🔢 Diga que o resultado cabe numa ordem',
      '📝 Veja no hub o grão dos segundos de fala'
    ]
  },
  {
    versao: '2.86',
    titulo: 'O floco',
    itens: [
      '❄️ Diga que o id nasce do tempo do nó',
      '🗓️ Avise que a geração sobe com a formação',
      '🧮 Diga que o nó anota a própria visão',
      '📝 Veja no hub o resto dos segundos de fala'
    ]
  },
  {
    versao: '2.85',
    titulo: 'O rumor',
    itens: [
      '🗞️ Diga que os nós espalham o estado',
      '🩹 Avise que a leitura conserta a cópia',
      '🧳 Diga que o vizinho guarda a escrita',
      '📝 Veja no hub a sobra fora do dia mais longo'
    ]
  },
  {
    versao: '2.84',
    titulo: 'A travessia',
    itens: [
      '🌉 Diga que a escrita chega ao disco na hora',
      '🗄️ Avise que a página suja espera no cache',
      '➰ Diga que a escrita grande pula o cache',
      '📝 Veja no hub o peso do dia mais longo'
    ]
  },
  {
    versao: '2.83',
    titulo: 'O primário',
    itens: [
      '🥇 Diga que só um nó aceita a escrita',
      '🪟 Avise que a cópia não aceita escrita',
      '📈 Diga que a cópia vira dona',
      '📝 Veja no hub a densidade dos minutos de fala'
    ]
  },
  {
    versao: '2.82',
    titulo: 'O orquestrador',
    itens: [
      '🎼 Diga que o coordenador dispara a sequência',
      '💃 Avise que o vizinho escolhe a etapa',
      '↩️ Diga que a falha desfaz a etapa anterior',
      '📝 Veja no hub a cadência dos dias de treino'
    ]
  },
  {
    versao: '2.81',
    titulo: 'O líder',
    itens: [
      '🧭 Diga que o líder conduz o mandato',
      '📜 Avise que cada eleição sobe o número',
      '👣 Diga que o seguidor copia o registro',
      '📝 Veja no hub o intervalo entre os dias de treino'
    ]
  },
  {
    versao: '2.80',
    titulo: 'O quórum',
    itens: [
      '🗳️ Diga que a escrita espera a maioria',
      '✋ Avise que mais da metade precisa confirmar',
      '⚖️ Diga que o árbitro desempata a rede',
      '📝 Veja no hub a cobertura dos dias de treino'
    ]
  },
  {
    versao: '2.79',
    titulo: 'O cofre',
    itens: [
      '🏦 Diga que a chave mora fora do app',
      '👂 Avise que o passe só vale para o serviço certo',
      '🚫 Diga que o passe antigo deixa de valer',
      '📝 Veja no hub a proporção dos dias de treino'
    ]
  },
  {
    versao: '2.78',
    titulo: 'A âncora',
    itens: [
      '⚓ Diga que a âncora guarda o estado antigo',
      '🕸️ Avise que cada serviço fala só com o vizinho',
      '🪓 Diga que o tráfego se divide em duas versões',
      '📝 Veja no hub o vão dos dias de treino'
    ]
  },
  {
    versao: '2.77',
    titulo: 'A carona',
    itens: [
      '🚕 Diga que a confirmação viaja no próximo pacote',
      '☠️ Avise que a mensagem ruim sai da fila',
      '🗼 Diga que o farol mostra o serviço vivo',
      '📝 Veja no hub a extensão dos dias de treino'
    ]
  },
  {
    versao: '2.76',
    titulo: 'O recuo',
    itens: [
      '⏬ Diga que cada falha dobra a espera',
      '🐕 Avise que o vigia encerra a tarefa atrasada',
      '🏺 Diga que o passe vence em quinze minutos',
      '📝 Veja no hub a repetição dos dias de treino'
    ]
  },
  {
    versao: '2.75',
    titulo: 'O semáforo',
    itens: [
      '🚦 Diga que só dois trabalhos passam juntos',
      '🏁 Avise que os quatro precisam chegar juntos',
      '🪝 Diga que o trinco abre quando a conta zera',
      '📝 Veja no hub a moda dos dias de treino'
    ]
  },
  {
    versao: '2.74',
    titulo: 'A amostra',
    itens: [
      '🧫 Diga que guardamos uma linha a cada dez',
      '🪺 Avise que a chave caiu no nicho dela',
      '🔒 Diga que o lacre do pacote mudou',
      '📝 Veja no hub a variedade dos dias de treino'
    ]
  },
  {
    versao: '2.73',
    titulo: 'O anteparo',
    itens: [
      '🛟 Diga que a falha ficou presa no próprio compartimento',
      '📤 Avise que o serviço devolveu o pedido que não cabe',
      '⏰ Diga que a chamada parou quando o tempo chegou a zero',
      '📝 Veja no hub o meio dos dias de treino'
    ]
  },
  {
    versao: '2.72',
    titulo: 'O tremor',
    itens: [
      '🫨 Diga que cada nova tentativa esperou um tempo diferente',
      '🧱 Avise que a portaria recusou a chamada extra',
      '🧷 Diga que o cliente voltou para a mesma máquina',
      '📝 Veja no hub a diferença de treinos entre os dias'
    ]
  },
  {
    versao: '2.71',
    titulo: 'A piscina',
    itens: [
      '🏊 Diga que a piscina ficou sem vagas livres',
      '🪣 Avise que o balde ficou sem fichas',
      '🚧 Diga que um número maior barrou o dono antigo',
      '📝 Veja no hub o menor dia de treinos'
    ]
  },
  {
    versao: '2.70',
    titulo: 'O disjuntor',
    itens: [
      '🛑 Diga que o disjuntor abriu depois de cinco falhas',
      '🔑 Avise que o aluguel venceu depois de trinta segundos',
      '💓 Diga que o nó perdeu três pulsos',
      '📝 Veja no hub o maior dia de treinos'
    ]
  },
  {
    versao: '2.69',
    titulo: 'A espera',
    itens: [
      '⏲️ Diga que a chamada parou depois de três segundos',
      '🔖 Avise que a página seguinte perdeu o lugar',
      '📥 Diga que a fila passou de mil mensagens',
      '📝 Veja no hub o passo de treinos por dia de fala'
    ]
  },
  {
    versao: '2.68',
    titulo: 'A saga',
    itens: [
      '🧵 Diga que o terceiro passo nunca terminou',
      '📦 Avise que o evento ficou na caixa de saída',
      '🗑️ Diga que a linha ficou na tabela depois do apagar',
      '📝 Veja no hub os treinos de antes desta semana'
    ]
  },
  {
    versao: '2.67',
    titulo: 'O replay',
    itens: [
      '⏪ Diga que reexecutamos os dois últimos dias',
      '🔔 Avise que o mesmo evento chegou duas vezes',
      '🪭 Diga que um evento acordou quatro trabalhadores',
      '📝 Veja no hub quantos treinos entraram nesta semana'
    ]
  },
  {
    versao: '2.66',
    titulo: 'O instável',
    itens: [
      '🎲 Diga que o teste passou na segunda tentativa',
      '📧 Avise que o e-mail já estava na tabela',
      '🔌 Diga que desligamos uma máquina de propósito',
      '📝 Veja no hub o total de treinos já registrados'
    ]
  },
  {
    versao: '2.65',
    titulo: 'O órfão',
    itens: [
      '🪆 Diga que a linha filha apontou para um pai que não existe',
      '🫡 Avise que o segundo sítio nunca confirmou',
      '🪙 Diga que três dias de erro gastaram o mês inteiro',
      '📝 Veja no hub os minutos de fala que ficaram fora desta semana'
    ]
  },
  {
    versao: '2.64',
    titulo: 'O filtro',
    itens: [
      '🧲 Diga que o filtro deu um sim falso',
      '🔀 Avise que a mensagem quatro chegou antes da três',
      '🧬 Diga que a prova dos bytes não bateu com o arquivo',
      '📝 Veja no hub quantos minutos desta semana entram na soma'
    ]
  },
  {
    versao: '2.63',
    titulo: 'O segredo',
    itens: [
      '🕵️ Diga que a chave secreta apareceu no log',
      '👻 Avise que a segunda leitura viu uma linha nova',
      '🔣 Diga que o contador voltou para zero',
      '📝 Veja no hub a média de minutos por dia com fala'
    ]
  },
  {
    versao: '2.62',
    titulo: 'A corrida',
    itens: [
      '🏎️ Diga que dois pedidos gravaram o mesmo saldo',
      '📇 Avise que a busca leu cada linha sem índice',
      '📐 Diga que noventa e nove por cento das chamadas cabem',
      '📝 Veja no hub a soma de minutos de fala'
    ]
  },
  {
    versao: '2.61',
    titulo: 'A compactação',
    itens: [
      '🗜️ Diga que o armazenamento reescreveu seis arquivos velhos',
      '✒️ Avise que o diário de escrita ocupou quatro gigabytes',
      '🚃 Diga que o leitor ficou mil mensagens atrás',
      '📝 Veja no hub quantos dos últimos 7 dias tiveram fala'
    ]
  },
  {
    versao: '2.60',
    titulo: 'A pilha',
    itens: [
      '📚 Diga que a pilha de chamadas cresceu sem fundo',
      '🔧 Avise que a outra ponta fechou o cano',
      '🌀 Diga que o navegador girou entre dois endereços',
      '📝 Veja no hub o auge de segundos de fala'
    ]
  },
  {
    versao: '2.59',
    titulo: 'O datagrama',
    itens: [
      '📨 Diga que a rede deixou cair dois pacotes',
      '🎫 Avise que o passe curto venceu',
      '🖊️ Diga que o carimbo da linha mudou',
      '📝 Veja no hub a maior marca seguida de fala'
    ]
  },
  {
    versao: '2.58',
    titulo: 'A cisão',
    itens: [
      '🪞 Diga que o grupo ficou com dois líderes',
      '🌊 Avise que os clientes tentam de novo juntos',
      '🔥 Diga que uma chave recebe a maior parte das escritas',
      '📝 Veja no hub o dia da semana em que você mais fala'
    ]
  },
  {
    versao: '2.57',
    titulo: 'A cota',
    itens: [
      '📏 Diga que o usuário passou da cota do disco',
      '🔁 Avise que o processo continua reiniciando',
      '🧟 Diga que o filho terminou e o pai não esperou',
      '📝 Veja no hub o maior hiato entre falas'
    ]
  },
  {
    versao: '2.56',
    titulo: 'O gotejo',
    itens: [
      '💧 Diga que a memória continua crescendo',
      '🥶 Avise que a função acordou de uma partida fria',
      '🔐 Diga que a permissão recusou a leitura',
      '📝 Veja no hub quando foi a primeira fala'
    ]
  },
  {
    versao: '2.55',
    titulo: 'O inodo',
    itens: [
      '📛 Diga que o disco ficou sem nomes de arquivo',
      '🛎️ Avise que o serviço recebeu o sinal de parar',
      '🐑 Diga que o cache venceu tudo de uma vez',
      '📝 Veja no hub quando foi a última fala'
    ]
  },
  {
    versao: '2.54',
    titulo: 'A reserva',
    itens: [
      '🪫 Diga que o servidor passou a usar a reserva',
      '🧵 Avise que a tela roda uma consulta por linha',
      '🚪 Diga que nada escuta nessa porta',
      '📝 Veja no hub quanto dura cada treino da semana'
    ]
  },
  {
    versao: '2.53',
    titulo: 'A pausa',
    itens: [
      '⌛ Diga que a pausa durou dois segundos',
      '📄 Iguale a configuração ao arquivo do repositório',
      '📁 Avise que o processo abriu arquivos demais',
      '📝 Veja no hub quantos minutos faltam para a meta'
    ]
  },
  {
    versao: '2.52',
    titulo: 'Os ponteiros',
    itens: [
      '🕰️ Diga que os relógios diferem em dois segundos',
      '🗳️ Peça dois votos de três para eleger o líder',
      '🛞 Avise que a fila encheu e o produtor vai devagar',
      '📝 Veja no hub os dias em branco desta semana'
    ]
  },
  {
    versao: '2.51',
    titulo: 'O impasse',
    itens: [
      '🪢 Diga que os dois trabalhos esperam um pelo outro',
      '🏷️ Aponte o nome do site para o endereço novo',
      '📮 Mande a mensagem ruim para a fila ao lado',
      '📝 Veja no hub o ritmo de minutos por dia com fala'
    ]
  },
  {
    versao: '2.50',
    titulo: 'O processador',
    itens: [
      '🧮 Diga que o processador fica perto de noventa por cento',
      '💾 A cópia da noite começa às duas e fica pronta de manhã',
      '💥 O processo ficou sem memória e o limite sobe',
      '📝 Veja no hub quantos dias desta semana tiveram fala'
    ]
  },
  {
    versao: '2.49',
    titulo: 'O lint',
    itens: [
      '🧹 Diga que o lint falhou em dois arquivos',
      '🌐 Libere a outra origem que o navegador bloqueia',
      '🔗 Mande um link assinado que vale uma hora',
      '📝 Veja no hub a nota média desta semana'
    ]
  },
  {
    versao: '2.48',
    titulo: 'O rastro',
    itens: [
      '🔎 Copie o id da chamada para o ticket',
      '🕛 Marque a parada da meia-noite, por uma hora',
      '🫛 Reinicie um pod e deixe os outros no ar',
      '📝 Veja no hub quantos preenchimentos a semana teve'
    ]
  },
  {
    versao: '2.47',
    titulo: 'A sonda',
    itens: [
      '🩺 Diga que a sonda falhou duas vezes',
      '🌱 Semeie o banco vazio com dez linhas',
      '📋 Suba o registro até debug e volte para info',
      '📈 Veja no hub o dia da semana com mais fala'
    ]
  },
  {
    versao: '2.46',
    titulo: 'A colheita',
    itens: [
      '🍒 Suba um commit sozinho e deixe os outros para trás',
      '⏳ Diga que a sessão acaba depois de oito horas',
      '🪣 Avise que o tanque de conexões está cheio',
      '🎯 Veja no hub o acerto desta semana'
    ]
  },
  {
    versao: '2.45',
    titulo: 'O squash',
    itens: [
      '✂️ Junte três commits em um só antes do merge',
      '🛑 Diga que o circuito abre depois de cinco erros',
      '🌙 Conte que o job roda às três da manhã',
      '⭐ Veja no hub o favorito que ainda não teve prática'
    ]
  },
  {
    versao: '2.44',
    titulo: 'O ensaio',
    itens: [
      '🧪 Teste no ensaio antes da produção, numa cópia de ontem',
      '💽 Diga que o disco está noventa por cento cheio',
      '📃 Mostre vinte linhas e a próxima página depois do último id',
      '📊 Veja no hub o grupo com menos prática'
    ]
  },
  {
    versao: '2.43',
    titulo: 'O rebase',
    itens: [
      '🌿 Rebaseie em cima da main e diga o arquivo do conflito',
      '🐌 Conte os quatro segundos da consulta lenta',
      '🪞 Diga que a réplica está dois minutos atrás',
      '📒 Veja no hub a palavra que mais volta nas falas'
    ]
  },
  {
    versao: '2.42',
    titulo: 'O manual',
    itens: [
      '📘 Siga o manual: leia o alerta e ache o wiki',
      '🟢 Mande o tráfego para o lado verde e saiba voltar em um minuto',
      '🔏 Diga que o certificado vence na sexta',
      '📊 Compare os minutos com o mesmo ponto da semana anterior'
    ]
  },
  {
    versao: '2.41',
    titulo: 'A carga',
    itens: [
      '🏋️ Conte os dez minutos do teste de carga e onde ele rodou',
      '📰 Leia a nota: três correções, no topo, na segunda',
      '🪪 Diga quem aprova a pasta antes do merge',
      '🔥 Veja no hub se a sequência de fala ainda vale'
    ]
  },
  {
    versao: '2.40',
    titulo: 'O canário',
    itens: [
      '🐤 Mande a versão para uma máquina e diga se o canário passou',
      '📭 Avise que o caminho velho fecha em junho',
      '🪝 Diga que o mesmo evento pode chegar duas vezes',
      '🌱 Veja no hub o próximo treino que ainda não teve prática'
    ]
  },
  {
    versao: '2.39',
    titulo: 'A bandeira',
    itens: [
      '🎚️ Ligue a função para dez por cento e diga quem desliga',
      '🧊 Marque o gelo: sem merge depois das quatro',
      '🚥 Explique o limite da API e o que o cliente faz',
      '🗣️ Veja no hub se já houve fala hoje'
    ]
  },
  {
    versao: '2.38',
    titulo: 'O acesso',
    itens: [
      '🔑 Mostre o wiki, o repositório e a quem chamar',
      '💳 Peça a licença da ferramenta, com o preço do mês',
      '🧾 Explique a volta da página sem jargão',
      '🔁 Veja no hub a frase que vence hoje'
    ]
  },
  {
    versao: '2.37',
    titulo: 'Com o PM',
    itens: [
      '📎 Negocie a data com o PM sem pular os testes',
      '📄 Conte o post-mortem: o que falhou, a causa e quem fica com a ação',
      '🔭 Peça feedback de carreira no 1:1',
      '📊 Veja os minutos e o grupo com menos prática no hub'
    ]
  },
  {
    versao: '2.36',
    titulo: 'No radar',
    itens: [
      '📡 Explique métrica, alerta e o painel numa reunião de plantão',
      '👏 Agradeça o time em público, com o nome de quem fez',
      '🤒 Avise que está doente ou peça o dia',
      '🔎 O catálogo recusa id e título repetidos, e a lista do hub pinta menos fora da tela'
    ]
  },
  {
    versao: '2.35',
    titulo: 'Na falha',
    itens: [
      '🔓 Explique um furo de segurança no review e o conserto',
      '📐 Negocie uma tela nova no meio do projeto',
      '🧉 Fale do Rio Grande do Sul, do chimarrão e do churrasco',
      '⭐ Favorite um treino, continue de onde parou e ordene pelos menos praticados'
    ]
  },
  {
    versao: '2.34',
    titulo: 'No facilitador',
    itens: [
      '🧭 Abra a reunião, olhe o relógio e feche com ações',
      '🧰 Escolha React ou Vue, SQL ou documento, TypeScript ou JavaScript',
      '🌦️ Conte o sábado, o domingo e um plano curto',
      '🎁 Um treino surpresa por dia, com uma sequência só deste modo'
    ]
  },
  {
    versao: '2.33',
    titulo: 'No contraste',
    itens: [
      '🎨 Explique contraste, foco e rótulo para quem desenha a tela',
      '📣 Peça ajuda num fórum e diga o que já tentou',
      '🛂 Fale de visto, mudança de país ou remoto com o RH',
      '📆 Veja notas, minutos e preenchimentos das últimas quatro semanas'
    ]
  },
  {
    versao: '2.32',
    titulo: 'No respeito',
    itens: [
      '🏛️ Discorde de uma arquitetura e ofereça outro caminho',
      '🧱 Explique a dívida e peça tempo para refatorar',
      '✉️ Peça uma referência a um ex-colega',
      '💭 As perguntas abertas marcam um, like e basically e sugerem conectores'
    ]
  },
  {
    versao: '2.31',
    titulo: 'No bug raro',
    itens: [
      '🏁 Conte um bug que só falha às vezes, com o log na mão',
      '🐢 Explique um conceito devagar para um júnior',
      '🏖️ Fale de férias, da noite e de duas semanas fora',
      '💭 Cinco perguntas abertas, com palavras e tempo de cada resposta'
    ]
  },
  {
    versao: '2.30',
    titulo: 'No gráfico',
    itens: [
      '📉 Leia a alta, a queda e a causa em cima do gráfico',
      '🕒 Peça o que ficou aberto e deixe a nota para o outro fuso',
      '🚪 Apresente-se em trinta segundos para um diretor',
      '🗂️ A semana junta vocabulário, frases mais erradas e a meta de minutos'
    ]
  },
  {
    versao: '2.29',
    titulo: 'No esclarecimento',
    itens: [
      '🙋 Peça o sotaque, a palavra que escapou e leia o requisito de volta',
      '🧪 Explique os testes, a cobertura e o relógio falso',
      '🎥 Deixe um vídeo curto para o time assistir depois',
      '📒 As palavras que escaparam nas falas ficam no seu vocabulário'
    ]
  },
  {
    versao: '2.28',
    titulo: 'Na desculpa',
    itens: [
      '🙏 Assuma um erro seu e diga o próximo passo',
      '🔦 Conte um projeto pessoal em cinco minutos',
      '💻 Peça notebook, verba de estudo e a data de início',
      '🗣️ A sombra do dia repete a mesma ordem e anuncia a nota'
    ]
  },
  {
    versao: '2.27',
    titulo: 'Na carta',
    itens: [
      '🃏 Vote a estimativa e diga o motivo da carta',
      '🧮 Explique custo, busca nos docs e o molde da resposta',
      '📞 Fale de pretensão, fuso e quando pode começar',
      '💾 O backup usa a data deste aparelho, não a de Londres'
    ]
  },
  {
    versao: '2.26',
    titulo: 'Na mesa',
    itens: [
      '📝 Fato, ajuste e dono numa retro facilitada',
      '🚚 Explique uma migração de banco ou de biblioteca e o risco',
      '👋 Puxe um oi no primeiro dia de um time novo',
      '🧩 Escolha frontend, backend ou IA e guarde a nota'
    ]
  },
  {
    versao: '2.25',
    titulo: 'Na sprint',
    itens: [
      '🖥️ Mostre a sprint e responda uma pergunta fora do roteiro',
      '🔐 Explique um furo, um patch ou o tempo de um dado',
      '🎫 Puxe assunto num meetup de tecnologia',
      '🎓 Faça cinco treinos de entrevista e veja uma nota no fim'
    ]
  },
  {
    versao: '2.24',
    titulo: 'No par',
    itens: [
      '🎙️ Narre a próxima linha enquanto programa com um par',
      '🗄️ Explique banco ou cache numa entrevista de sistema',
      '🙅 Recuse um pedido e ofereça outro caminho',
      '📊 Escolha a meta de minutos e veja o lembrete na semana'
    ]
  },
  {
    versao: '2.23',
    titulo: 'No mapa',
    itens: [
      '🗺️ Explique a arquitetura e o fluxo para quem chegou agora',
      '🗣️ Dê e receba um feedback duro no 1:1',
      '📐 Apresente uma proposta e defenda a troca',
      '📊 A semana mostra os minutos de fala e os treinos por grupo'
    ]
  },
  {
    versao: '2.22',
    titulo: 'No ar',
    itens: [
      '🔥 Dê o status, peça ajuda e feche a lição de um incidente',
      '📦 Negocie prazo e escopo com quem cuida do produto',
      '🙋 Pergunte do plantão, do crescimento e da vaga aberta',
      '🔂 Revise as frases que você mais errou, na data certa'
    ]
  },
  {
    versao: '2.21',
    titulo: 'Na trilha',
    itens: [
      '📅 Uma trilha de 30 dias mostra o dia e usa o treino recomendado',
      '🎬 Fale de esporte, filme e série',
      '🏆 Peça um aumento e conte uma conquista',
      '🔌 Explique endpoint, status e autenticação'
    ]
  },
  {
    versao: '2.20',
    titulo: 'No hub',
    itens: [
      '🗂️ Os treinos de fluência ficam em grupos, com busca',
      '✨ O treino recomendado olha o histórico e os pontos fracos',
      '🚀 Fale a meta e o caminho da carreira',
      '📏 Uma auditoria offline confere idioma, foco e o tamanho do JS'
    ]
  },
  {
    versao: '2.19',
    titulo: 'Em casa',
    itens: [
      '🤖 Explique prompt, alucinação e RAG em linguagem simples',
      '🛡️ Fale de CVE, patch e upgrade de dependência',
      '🏠 Conte a manhã, o jantar e a noite em família',
      '💬 Uma conversa livre puxa três assuntos do dia'
    ]
  },
  {
    versao: '2.18',
    titulo: 'Na banca',
    itens: [
      '🏗️ Desenhe um sistema: pedido, escala e gargalo',
      '💻 Pense em voz alta enquanto resolve o problema',
      '🤝 Peça e ofereça ajuda a design, QA e produto',
      '🎯 Um simulado remoto junta treinos que você já tem'
    ]
  },
  {
    versao: '2.17',
    titulo: 'Na plateia',
    itens: [
      '🎤 Abra, troque de slide e feche com perguntas',
      '🙋 Ganhe tempo quando não souber a resposta',
      '📶 Diga que a voz cortou ou que o vídeo travou',
      '🧭 Cada padrão de erro ganha um botão de treino'
    ]
  },
  {
    versao: '2.16',
    titulo: 'Na causa',
    itens: [
      '🛠️ Explique por que o deploy, o CI ou a permissão falhou',
      '🌱 Dê uma dica e a ideia por trás, para um júnior',
      '🩺 Peça ajuda na farmácia, no médico ou na emergência',
      '💾 O backup mostra XP e lições antes de mesclar'
    ]
  },
  {
    versao: '2.15',
    titulo: 'No cliente',
    itens: [
      '🗒️ Pergunte quem usa e confirme o que entendeu',
      '📈 Diga números, porcentagens e crescimento',
      '📖 Conte um erro e a lição',
      '🚶 Modo só áudio: a pergunta é lida e a resposta espera'
    ]
  },
  {
    versao: '2.14',
    titulo: 'Na mesa',
    itens: [
      '💰 Negocie faixa, plano de saúde e ações',
      '🧰 Conte um projeto: problema, stack e resultado',
      '🎧 Ouça sotaque americano, britânico e indiano na voz do aparelho',
      '📅 Desafio do dia: a sequência aumenta as frases, até 6'
    ]
  },
  {
    versao: '2.13',
    titulo: 'Na linha',
    itens: [
      '💻 Explique um loop, um callback, um null check e um edge case',
      '💬 Escreva ou fale um recado curto de Slack',
      '🍻 Happy hour, hobby e Brasil, em duas falas',
      '🔤 O som de cache, queue, SQL, GUI, height e width'
    ]
  },
  {
    versao: '2.12',
    titulo: 'No 1:1',
    itens: [
      '🗣️ Receba um ponto e devolva um feedback no 1:1',
      '❓ Pergunte ao entrevistador sobre o time e os 90 dias',
      '🛫 Conexão, imigração e táxi, em fala curta',
      '⏱️ Três minutos misturando frases dos treinos. O relógio não envia sozinho'
    ]
  },
  {
    versao: '2.11',
    titulo: 'Com calma',
    itens: [
      '⏳ Diga um prazo e o que ainda não está certo',
      '⚖️ Discorde e proponha um meio-termo',
      '📞 Ligue para o banco, a entrega ou o hotel',
      '📊 Os últimos 14 dias mostram treinos e acerto, neste aparelho'
    ]
  },
  {
    versao: '2.10',
    titulo: 'No sprint',
    itens: [
      '🔄 Diga o que foi bem, o que melhorar e a ação da sprint',
      '🧭 Explique o projeto, o fluxo e a primeira tarefa',
      '🔗 Ligue duas ideias com however, on the other hand ou that said',
      '🎙️ O botão de gravar volta sozinho quando os 8 segundos acabam'
    ]
  },
  {
    versao: '2.9',
    titulo: 'No turno',
    itens: [
      '🏗️ Explique a escolha e a troca, com we went with',
      '👥 Narre o que está fazendo e peça ajuda no pair',
      '🚨 Dê status, peça desculpas e o próximo passo',
      '📅 O plano da semana sugere treinos a partir dos deslizes'
    ]
  },
  {
    versao: '2.8',
    titulo: 'No palco',
    itens: [
      '🎬 Apresente uma feature em um minuto e responda a plateia',
      '📌 Sugira um corte de escopo e peça outra data',
      '⭐ Conte um caso no formato STAR, em quatro falas',
      '🎵 Marque a palavra forte ou se a pergunta sobe ou desce'
    ]
  },
  {
    versao: '2.7',
    titulo: 'Falar na call',
    itens: [
      '🐛 Relate um bug em três falas: como repetir, a causa e a correção',
      '🙏 Dê um comentário de review e receba outro com educação',
      '☕ Papo curto antes da reunião: fim de semana, clima e viagem',
      '🔎 Peça para repetir e confirme o que você entendeu'
    ]
  },
  {
    versao: '2.6',
    titulo: 'Opinião e meta',
    itens: [
      '💬 Dê uma opinião com um motivo e concorde ou discorde com educação',
      '👀 Descreva uma cena: o que acontece e um detalhe',
      '⚡ Pensa em inglês: quatro respostas curtas, vinte segundos cada',
      '🗣️ Meta de falas da semana, com o lembrete na própria tela'
    ]
  },
  {
    versao: '2.5',
    titulo: 'Falar de novo',
    itens: [
      '🔁 Frases que escaparam voltam na data, de qualquer modo de fala',
      '🎤 Entrevista remota de seis falas, para uma vaga full stack',
      '📖 Contar no passado, e números, datas e preços de ouvido',
      '🐣 Começo com três caminhos: lição, teste de nível ou pergunta do dia'
    ]
  },
  {
    versao: '2.4',
    titulo: 'Inglês de trabalho',
    itens: [
      '💻 Cenas de standup, bug, code review, entrevista remota e demo',
      '🎙️ Grave a sua voz e ouça ao lado do modelo. O áudio fica só na tela',
      '☀️ Pergunta do dia com uma segunda pergunta, e idioms de reunião',
      '🔤 Texto maior, teclas 1 a 3 nas escolhas e listas mais leves no celular'
    ]
  },
  {
    versao: '2.3',
    titulo: 'Fluência no seu nível',
    itens: [
      '🎯 Teste de nível de A1 a B2. O treino se ordena no seu ponto e nada fica trancado',
      '❓ Cenas em que você faz a pergunta: café, loja, aeroporto e reunião',
      '⏩ Fala rápida: gonna, wanna e palavras que se juntam, na voz do aparelho',
      '📅 Resumo da semana, phrasal verbs e um minuto falando de você'
    ]
  },
  {
    versao: '2.2',
    titulo: 'Falar de verdade',
    itens: [
      '🩺 Cenas novas com dois caminhos: médico, aeroporto, loja, telefone e reunião',
      '👂 Ouvir uma cena na velocidade normal ou devagar, e responder o que foi dito',
      '👅 Sons difíceis: TH, -ed, vogal curta e longa, acento da palavra',
      '📊 Painel da fala: a nota da semana e os erros que mais voltam'
    ]
  },
  {
    versao: '2.1',
    titulo: 'Frases e desafio de 5 minutos',
    itens: [
      '💬 Baralho de sobrevivência: repetir, pedir o sentido, ganhar tempo, concordar, discordar e interromper',
      '🧠 A frase praticada entra na revisão Leitner e também pode ir para a sombra',
      '⏱️ Desafio de 5 minutos na home: um diálogo, sombra e frases. Conta sequência e XP'
    ]
  },
  {
    versao: '2.0',
    titulo: 'Conversar, sombra e parceiro',
    itens: [
      '💬 Diálogos guiados: café, hotel, entrevista, papo e caminho. O tutor corrige cada resposta',
      '🗣️ Sombra: ouça, repita e veja a nota com as palavras que faltaram',
      '🤖 Parceiro de conversa opcional. Desligado por padrão. A chave fica só neste aparelho',
      '📥 Sem chave e sem rede, os diálogos e a sombra continuam offline'
    ]
  },
  {
    versao: '1.9',
    titulo: 'Escuta, caixas e Tempo Livre',
    itens: [
      '👂 Modo Escuta: ouça a frase e escreva. Se o navegador tiver microfone, dá para repetir falando',
      '🧠 Toque numa caixa da memória para treinar só aquelas palavras',
      '🌤️ Unidade Tempo Livre: clima, humor e convite',
      '📥 Aviso para instalar o app, e uma faixa quando a internet cai',
      '⌨️ Tecla S ouve a frase de novo durante a lição'
    ]
  },
  {
    versao: '1.8',
    titulo: 'O tutor explica o erro',
    itens: [
      '🧭 Errou ou quase acertou? O app diz o porquê: letra, ordem, artigo, plural, tempo verbal ou falso amigo',
      '✍️ Errinho de uma letra vale, com aviso. Se a letra formar outra palavra de verdade, não vale',
      '💡 Botão Dica na lição (tecla D) e a dica do dia na tela inicial',
      '🔁 Pontos fracos: a revisão cobra de novo o padrão que você mais erra'
    ]
  },
  {
    versao: '1.7',
    titulo: 'Expansão de Vocabulário e o Louro festeiro',
    itens: [
      '🚀 Expansão de Vocabulário: as 2.700+ palavras mais usadas do inglês em lições de 7, organizadas em quatro trilhas',
      '✨ Palavra nova é apresentada antes de ser cobrada: grafia, pronúncia, classe e traduções',
      '🧠 As palavras da Expansão entram na mesma agenda de revisão espaçada do curso',
      '🦜 O Louro comemora com você na tela de resultado. De coroa quando você gabarita'
    ]
  },
  {
    versao: '1.6',
    titulo: 'Correção mais justa e app mais firme',
    itens: [
      '◀️ O botão Voltar do celular agora funciona dentro do app, tela por tela',
      '🚪 Sair no meio da lição agora pede confirmação. Nada de perder progresso sem querer',
      '⚖️ Correção mais justa: typo que forma outra palavra de verdade não passa, e o NÃO SEI não zera mais a memória da palavra',
      '🔤 Oficina de Verbos consertada',
      '🕛 Streak e missões não viram mais às 21h. O dia agora acaba à meia-noite',
      '🔁 Sincronização entre aparelhos sem perder progresso',
      '🎨 Botões com contraste melhor e inglês lido direito pelos leitores de tela'
    ]
  },
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
  },
  {
    unidade: 'lazer', titulo: 'Combinado no parque', cenario: 'Mensagem de sábado 🌳', emoji: '🌤️',
    falas: [
      { de: 'louro', en: 'Are you free tonight?', pt: 'Você está livre hoje à noite?' },
      { de: 'voce', en: 'I am free', pt: 'eu estou livre' },
      { de: 'louro', en: 'The weather is nice. Let\'s go out!', pt: 'O tempo está bom. Vamos sair!' },
      { de: 'voce', en: 'sounds good', pt: 'parece bom' },
      { de: 'louro', en: 'See you at seven?', pt: 'Até as sete?' },
      { de: 'voce', en: 'see you tonight', pt: 'até hoje à noite' }
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
  { id: 'escuta1', emoji: '👂', titulo: 'Faça 1 Escuta', alvo: 1, xp: 15, medir: s => (s.tipo === 'escuta' ? 1 : 0) },
  { id: 'dialogo1', emoji: '💬', titulo: 'Termine 1 diálogo', alvo: 1, xp: 15, medir: s => (s.tipo === 'dialogo' ? 1 : 0) },
  { id: 'fala1', emoji: '⏱️', titulo: 'Faça o desafio de 5 minutos', alvo: 1, xp: 15, medir: s => (s.tipo === 'fala' ? 1 : 0) },
  { id: 'pronuncia1', emoji: '👅', titulo: 'Faça 1 treino de pronúncia', alvo: 1, xp: 15, medir: s => (s.tipo === 'pronuncia' ? 1 : 0) },
  { id: 'nivel1', emoji: '🎯', titulo: 'Faça o teste de nível', alvo: 1, xp: 15, medir: s => (s.tipo === 'nivel' ? 1 : 0) },
  { id: 'livre1', emoji: '🗣️', titulo: 'Fale de um tema por um minuto', alvo: 1, xp: 15, medir: s => (s.tipo === 'livre' ? 1 : 0) },
  { id: 'tecnico1', emoji: '💻', titulo: 'Faça 1 cena de trabalho', alvo: 1, xp: 15, medir: s => (s.tipo === 'tecnico' ? 1 : 0) },
  { id: 'dia1', emoji: '☀️', titulo: 'Responda a pergunta do dia', alvo: 1, xp: 15, medir: s => (s.tipo === 'perguntaDia' ? 1 : 0) },
  { id: 'deslize1', emoji: '🔁', titulo: 'Revise 1 deslize de fala', alvo: 1, xp: 15, medir: s => (s.tipo === 'deslize' ? 1 : 0) },
  { id: 'remoto1', emoji: '💻', titulo: 'Faça a entrevista longa', alvo: 1, xp: 15, medir: s => (s.tipo === 'remoto' ? 1 : 0) },
  { id: 'opiniao1', emoji: '💬', titulo: 'Dê uma opinião com motivo', alvo: 1, xp: 15, medir: s => (s.tipo === 'opiniao' ? 1 : 0) },
  { id: 'rapido1', emoji: '⚡', titulo: 'Responda no tempo', alvo: 1, xp: 15, medir: s => (s.tipo === 'rapido' ? 1 : 0) },
  { id: 'relato1', emoji: '🐛', titulo: 'Relate um bug em três falas', alvo: 1, xp: 15, medir: s => (s.tipo === 'relato' ? 1 : 0) },
  { id: 'claro1', emoji: '🔎', titulo: 'Peça para repetir ou parafraseie', alvo: 1, xp: 15, medir: s => (s.tipo === 'claro' ? 1 : 0) },
  { id: 'demo1', emoji: '🎬', titulo: 'Apresente uma feature em um minuto', alvo: 1, xp: 15, medir: s => (s.tipo === 'demo' ? 1 : 0) },
  { id: 'star1', emoji: '⭐', titulo: 'Conte um caso no formato STAR', alvo: 1, xp: 15, medir: s => (s.tipo === 'star' ? 1 : 0) },
  { id: 'decisao1', emoji: '🏗️', titulo: 'Explique uma decisão e a troca', alvo: 1, xp: 15, medir: s => (s.tipo === 'decisao' ? 1 : 0) },
  { id: 'plantao1', emoji: '🚨', titulo: 'Dê status, desculpa e o próximo passo', alvo: 1, xp: 15, medir: s => (s.tipo === 'plantao' ? 1 : 0) },
  { id: 'retro1', emoji: '🔄', titulo: 'Feche uma retrospectiva em três falas', alvo: 1, xp: 15, medir: s => (s.tipo === 'retro' ? 1 : 0) },
  { id: 'ligacao1', emoji: '🔗', titulo: 'Ligue duas ideias com um conector', alvo: 1, xp: 15, medir: s => (s.tipo === 'ligacao' ? 1 : 0) },
  { id: 'estimativa1', emoji: '⏳', titulo: 'Dê uma estimativa e uma dúvida', alvo: 1, xp: 15, medir: s => (s.tipo === 'estimativa' ? 1 : 0) },
  { id: 'atendimento1', emoji: '📞', titulo: 'Ligue para o suporte e peça o próximo passo', alvo: 1, xp: 15, medir: s => (s.tipo === 'atendimento' ? 1 : 0) },
  { id: 'gestor1', emoji: '🗣️', titulo: 'Faça um 1:1 com o gestor', alvo: 1, xp: 15, medir: s => (s.tipo === 'gestor' ? 1 : 0) },
  { id: 'viagem1', emoji: '🛫', titulo: 'Fale no aeroporto, na imigração ou no táxi', alvo: 1, xp: 15, medir: s => (s.tipo === 'viagem' ? 1 : 0) },
  { id: 'linha1', emoji: '💻', titulo: 'Explique uma linha de código em voz alta', alvo: 1, xp: 15, medir: s => (s.tipo === 'linha' ? 1 : 0) },
  { id: 'slack1', emoji: '💬', titulo: 'Mande um recado curto de Slack', alvo: 1, xp: 15, medir: s => (s.tipo === 'slack' ? 1 : 0) },
  { id: 'salario1', emoji: '💰', titulo: 'Negocie salário ou benefício', alvo: 1, xp: 15, medir: s => (s.tipo === 'salario' ? 1 : 0) },
  { id: 'projeto1', emoji: '🧰', titulo: 'Conte um projeto do portfólio', alvo: 1, xp: 15, medir: s => (s.tipo === 'projeto' ? 1 : 0) },
  { id: 'requisito1', emoji: '🗒️', titulo: 'Confirme um requisito com o cliente', alvo: 1, xp: 15, medir: s => (s.tipo === 'requisito' ? 1 : 0) },
  { id: 'metrica1', emoji: '📈', titulo: 'Apresente um número ou uma porcentagem', alvo: 1, xp: 15, medir: s => (s.tipo === 'metrica' ? 1 : 0) },
  { id: 'falha1', emoji: '🛠️', titulo: 'Explique por que um deploy ou um teste falhou', alvo: 1, xp: 15, medir: s => (s.tipo === 'falha' ? 1 : 0) },
  { id: 'socorro1', emoji: '🩺', titulo: 'Peça ajuda na farmácia ou no médico', alvo: 1, xp: 15, medir: s => (s.tipo === 'socorro' ? 1 : 0) },
  { id: 'palestra1', emoji: '🎤', titulo: 'Abra uma palestra ou troque de slide', alvo: 1, xp: 15, medir: s => (s.tipo === 'palestra' ? 1 : 0) },
  { id: 'sinal1', emoji: '📶', titulo: 'Diga que a chamada falhou', alvo: 1, xp: 15, medir: s => (s.tipo === 'sinal' ? 1 : 0) },
  { id: 'sistema1', emoji: '🏗️', titulo: 'Desenhe um sistema em voz alta', alvo: 1, xp: 15, medir: s => (s.tipo === 'sistema' ? 1 : 0) },
  { id: 'simulado1', emoji: '🎯', titulo: 'Faça o simulado remoto', alvo: 1, xp: 15, medir: s => (s.tipo === 'simulado' ? 1 : 0) },
  { id: 'modelo1', emoji: '🤖', titulo: 'Explique a IA em linguagem simples', alvo: 1, xp: 15, medir: s => (s.tipo === 'modelo' ? 1 : 0) },
  { id: 'papo1', emoji: '💬', titulo: 'Faça a conversa livre do dia', alvo: 1, xp: 15, medir: s => (s.tipo === 'papo' ? 1 : 0) },
  { id: 'futuro1', emoji: '🚀', titulo: 'Fale do plano daqui a cinco anos', alvo: 1, xp: 15, medir: s => (s.tipo === 'futuro' ? 1 : 0) },
  { id: 'cultura1', emoji: '🎬', titulo: 'Fale de um jogo, um filme ou uma série', alvo: 1, xp: 15, medir: s => (s.tipo === 'cultura' ? 1 : 0) },
  { id: 'aumento1', emoji: '🏆', titulo: 'Peça um aumento ou conte uma conquista', alvo: 1, xp: 15, medir: s => (s.tipo === 'aumento' ? 1 : 0) },
  { id: 'rota1', emoji: '🔌', titulo: 'Explique um endpoint, um status ou o token', alvo: 1, xp: 15, medir: s => (s.tipo === 'rota' ? 1 : 0) },
  { id: 'vivo1', emoji: '🔥', titulo: 'Dê status, peça ajuda ou feche a lição', alvo: 1, xp: 15, medir: s => (s.tipo === 'vivo' ? 1 : 0) },
  { id: 'produto1', emoji: '📦', titulo: 'Negocie prazo ou escopo com o produto', alvo: 1, xp: 15, medir: s => (s.tipo === 'produto' ? 1 : 0) },
  { id: 'fecho1', emoji: '🙋', titulo: 'Faça uma pergunta no fim da entrevista', alvo: 1, xp: 15, medir: s => (s.tipo === 'fecho' ? 1 : 0) },
  { id: 'espaco1', emoji: '🔂', titulo: 'Revise uma frase que você errou mais de uma vez', alvo: 1, xp: 15, medir: s => (s.tipo === 'espaco' ? 1 : 0) },
  { id: 'mapa1', emoji: '🗺️', titulo: 'Explique a arquitetura ou o fluxo do time', alvo: 1, xp: 15, medir: s => (s.tipo === 'mapa' ? 1 : 0) },
  { id: 'duro1', emoji: '🗣️', titulo: 'Dê ou receba um feedback duro', alvo: 1, xp: 15, medir: s => (s.tipo === 'duro' ? 1 : 0) },
  { id: 'proposta1', emoji: '📐', titulo: 'Apresente uma proposta e a troca', alvo: 1, xp: 15, medir: s => (s.tipo === 'proposta' ? 1 : 0) },
  { id: 'narrar1', emoji: '🎙️', titulo: 'Narre a próxima linha com o par', alvo: 1, xp: 15, medir: s => (s.tipo === 'narrar' ? 1 : 0) },
  { id: 'banco1', emoji: '🗄️', titulo: 'Explique banco ou cache na entrevista', alvo: 1, xp: 15, medir: s => (s.tipo === 'banco' ? 1 : 0) },
  { id: 'recusa1', emoji: '🙅', titulo: 'Recuse um pedido e ofereça outro caminho', alvo: 1, xp: 15, medir: s => (s.tipo === 'recusa' ? 1 : 0) },
  { id: 'sprint1', emoji: '🖥️', titulo: 'Mostre a sprint e responda a surpresa', alvo: 1, xp: 15, medir: s => (s.tipo === 'sprint' ? 1 : 0) },
  { id: 'seguro1', emoji: '🔐', titulo: 'Explique uma decisão de segurança', alvo: 1, xp: 15, medir: s => (s.tipo === 'seguro' ? 1 : 0) },
  { id: 'meetup1', emoji: '🎫', titulo: 'Puxe assunto num meetup', alvo: 1, xp: 15, medir: s => (s.tipo === 'meetup' ? 1 : 0) },
  { id: 'completa1', emoji: '🎓', titulo: 'Termine a entrevista de cinco treinos', alvo: 1, xp: 15, medir: s => (s.tipo === 'completa' ? 1 : 0) },
  { id: 'rodada1', emoji: '📝', titulo: 'Feche a mesa da retro com um dono', alvo: 1, xp: 15, medir: s => (s.tipo === 'rodada' ? 1 : 0) },
  { id: 'migra1', emoji: '🚚', titulo: 'Explique uma migração e o risco', alvo: 1, xp: 15, medir: s => (s.tipo === 'migra' ? 1 : 0) },
  { id: 'estreia1', emoji: '👋', titulo: 'Puxe um oi no primeiro dia', alvo: 1, xp: 15, medir: s => (s.tipo === 'estreia' ? 1 : 0) },
  { id: 'foco1', emoji: '🧩', titulo: 'Termine a entrevista do foco escolhido', alvo: 1, xp: 15, medir: s => (s.tipo === 'foco' ? 1 : 0) },
  { id: 'poker1', emoji: '🃏', titulo: 'Vote a carta e diga o motivo', alvo: 1, xp: 15, medir: s => (s.tipo === 'poker' ? 1 : 0) },
  { id: 'leigo1', emoji: '🧮', titulo: 'Explique o custo, a busca ou o molde', alvo: 1, xp: 15, medir: s => (s.tipo === 'leigo' ? 1 : 0) },
  { id: 'recruta1', emoji: '📞', titulo: 'Fale da pretensão, do fuso ou de quando começa', alvo: 1, xp: 15, medir: s => (s.tipo === 'recruta' ? 1 : 0) },
  { id: 'culpa1', emoji: '🙏', titulo: 'Assuma um erro e diga o próximo passo', alvo: 1, xp: 15, medir: s => (s.tipo === 'culpa' ? 1 : 0) },
  { id: 'raio1', emoji: '🔦', titulo: 'Fale cinco minutos de um projeto pessoal', alvo: 1, xp: 15, medir: s => (s.tipo === 'raio' ? 1 : 0) },
  { id: 'oferta1', emoji: '💻', titulo: 'Negocie equipamento, verba ou a data', alvo: 1, xp: 15, medir: s => (s.tipo === 'oferta' ? 1 : 0) },
  { id: 'pedido1', emoji: '🙋', titulo: 'Peça o sotaque, a palavra ou leia o requisito', alvo: 1, xp: 15, medir: s => (s.tipo === 'pedido' ? 1 : 0) },
  { id: 'cobertura1', emoji: '🧪', titulo: 'Explique os testes ou a cobertura', alvo: 1, xp: 15, medir: s => (s.tipo === 'cobertura' ? 1 : 0) },
  { id: 'loom1', emoji: '🎥', titulo: 'Deixe um check-in de dois minutos', alvo: 1, xp: 15, medir: s => (s.tipo === 'loom' ? 1 : 0) },
  { id: 'caderno1', emoji: '📒', titulo: 'Use uma palavra sua numa frase', alvo: 1, xp: 15, medir: s => (s.tipo === 'caderno' ? 1 : 0) },
  { id: 'grafico1', emoji: '📉', titulo: 'Explique a alta, a queda ou a causa', alvo: 1, xp: 15, medir: s => (s.tipo === 'grafico' ? 1 : 0) },
  { id: 'handoff1', emoji: '🕒', titulo: 'Passe o contexto para o outro fuso', alvo: 1, xp: 15, medir: s => (s.tipo === 'handoff' ? 1 : 0) },
  { id: 'elevador1', emoji: '🚪', titulo: 'Apresente-se em trinta segundos', alvo: 1, xp: 15, medir: s => (s.tipo === 'elevador' ? 1 : 0) },
  { id: 'junta1', emoji: '🗂️', titulo: 'Feche a semana junta', alvo: 1, xp: 15, medir: s => (s.tipo === 'junta' ? 1 : 0) },
  { id: 'pista1', emoji: '🏁', titulo: 'Conte o bug que só falha às vezes', alvo: 1, xp: 15, medir: s => (s.tipo === 'pista' ? 1 : 0) },
  { id: 'calma1', emoji: '🐢', titulo: 'Explique um conceito com calma', alvo: 1, xp: 15, medir: s => (s.tipo === 'calma' ? 1 : 0) },
  { id: 'folga1', emoji: '🏖️', titulo: 'Fale de férias ou do limite da noite', alvo: 1, xp: 15, medir: s => (s.tipo === 'folga' ? 1 : 0) },
  { id: 'abertas1', emoji: '💭', titulo: 'Responda as perguntas abertas', alvo: 1, xp: 15, medir: s => (s.tipo === 'abertas' ? 1 : 0) },
  { id: 'respeito1', emoji: '🏛️', titulo: 'Discorde de uma arquitetura com respeito', alvo: 1, xp: 15, medir: s => (s.tipo === 'respeito' ? 1 : 0) },
  { id: 'debito1', emoji: '🧱', titulo: 'Peça tempo para a dívida técnica', alvo: 1, xp: 15, medir: s => (s.tipo === 'debito' ? 1 : 0) },
  { id: 'indicacao1', emoji: '✉️', titulo: 'Peça uma referência a um ex-colega', alvo: 1, xp: 15, medir: s => (s.tipo === 'indicacao' ? 1 : 0) },
  { id: 'ux1', emoji: '🎨', titulo: 'Explique contraste, foco ou rótulo', alvo: 1, xp: 15, medir: s => (s.tipo === 'ux' ? 1 : 0) },
  { id: 'forum1', emoji: '📣', titulo: 'Peça ajuda e diga o que já tentou', alvo: 1, xp: 15, medir: s => (s.tipo === 'forum' ? 1 : 0) },
  { id: 'visto1', emoji: '🛂', titulo: 'Fale de visto, mudança ou remoto', alvo: 1, xp: 15, medir: s => (s.tipo === 'visto' ? 1 : 0) },
  { id: 'mes1', emoji: '📆', titulo: 'Abra o relatório do mês', alvo: 1, xp: 15, medir: s => (s.tipo === 'mes' ? 1 : 0) },
  { id: 'facil1', emoji: '🧭', titulo: 'Abra, cronometre ou feche uma reunião', alvo: 1, xp: 15, medir: s => (s.tipo === 'facil' ? 1 : 0) },
  { id: 'stack1', emoji: '🧰', titulo: 'Explique uma escolha de stack', alvo: 1, xp: 15, medir: s => (s.tipo === 'stack' ? 1 : 0) },
  { id: 'sabado1', emoji: '🌦️', titulo: 'Fale do fim de semana e de um plano', alvo: 1, xp: 15, medir: s => (s.tipo === 'sabado' ? 1 : 0) },
  { id: 'surpresa1', emoji: '🎁', titulo: 'Faça o treino surpresa de hoje', alvo: 1, xp: 15, medir: s => (s.surpresa ? 1 : 0) },
  { id: 'brecha1', emoji: '🔓', titulo: 'Explique um furo e o conserto', alvo: 1, xp: 15, medir: s => (s.tipo === 'brecha' ? 1 : 0) },
  { id: 'muda1', emoji: '📐', titulo: 'Negocie uma mudança de escopo', alvo: 1, xp: 15, medir: s => (s.tipo === 'muda' ? 1 : 0) },
  { id: 'gaucho1', emoji: '🧉', titulo: 'Fale do Sul, do chimarrão ou do churrasco', alvo: 1, xp: 15, medir: s => (s.tipo === 'gaucho' ? 1 : 0) },
  { id: 'radar1', emoji: '📡', titulo: 'Explique métrica, alerta ou o painel', alvo: 1, xp: 15, medir: s => (s.tipo === 'radar' ? 1 : 0) },
  { id: 'aplauso1', emoji: '👏', titulo: 'Agradeça alguém do time em público', alvo: 1, xp: 15, medir: s => (s.tipo === 'aplauso' ? 1 : 0) },
  { id: 'gripe1', emoji: '🤒', titulo: 'Avise que está doente ou peça o dia', alvo: 1, xp: 15, medir: s => (s.tipo === 'gripe' ? 1 : 0) },
  { id: 'pm1', emoji: '📎', titulo: 'Negocie a data com o PM', alvo: 1, xp: 15, medir: s => (s.tipo === 'pm' ? 1 : 0) },
  { id: 'laudo1', emoji: '📄', titulo: 'Conte um post-mortem', alvo: 1, xp: 15, medir: s => (s.tipo === 'laudo' ? 1 : 0) },
  { id: 'rumo1', emoji: '🔭', titulo: 'Peça feedback de carreira', alvo: 1, xp: 15, medir: s => (s.tipo === 'rumo' ? 1 : 0) },
  { id: 'acesso1', emoji: '🔑', titulo: 'Mostre o wiki ou o repositório', alvo: 1, xp: 15, medir: s => (s.tipo === 'acesso' ? 1 : 0) },
  { id: 'licenca1', emoji: '💳', titulo: 'Peça a licença de uma ferramenta', alvo: 1, xp: 15, medir: s => (s.tipo === 'licenca' ? 1 : 0) },
  { id: 'jargao1', emoji: '🧾', titulo: 'Explique uma falha sem jargão', alvo: 1, xp: 15, medir: s => (s.tipo === 'jargao' ? 1 : 0) },
  { id: 'bandeira1', emoji: '🎚️', titulo: 'Ligue uma bandeira ou diga quem desliga', alvo: 1, xp: 15, medir: s => (s.tipo === 'bandeira' ? 1 : 0) },
  { id: 'gelo1', emoji: '🧊', titulo: 'Marque o gelo da release', alvo: 1, xp: 15, medir: s => (s.tipo === 'gelo' ? 1 : 0) },
  { id: 'limite1', emoji: '🚥', titulo: 'Explique o limite da API', alvo: 1, xp: 15, medir: s => (s.tipo === 'limite' ? 1 : 0) },
  { id: 'canario1', emoji: '🐤', titulo: 'Fale do canário ou da primeira máquina', alvo: 1, xp: 15, medir: s => (s.tipo === 'canario' ? 1 : 0) },
  { id: 'despedida1', emoji: '📭', titulo: 'Avise a despedida de um caminho', alvo: 1, xp: 15, medir: s => (s.tipo === 'despedida' ? 1 : 0) },
  { id: 'repeticao1', emoji: '🪝', titulo: 'Explique um evento que chega duas vezes', alvo: 1, xp: 15, medir: s => (s.tipo === 'repeticao' ? 1 : 0) },
  { id: 'carga1', emoji: '🏋️', titulo: 'Fale do teste de carga', alvo: 1, xp: 15, medir: s => (s.tipo === 'carga' ? 1 : 0) },
  { id: 'boletim1', emoji: '📰', titulo: 'Leia a nota da versão', alvo: 1, xp: 15, medir: s => (s.tipo === 'boletim' ? 1 : 0) },
  { id: 'dono1', emoji: '🪪', titulo: 'Diga quem aprova a pasta', alvo: 1, xp: 15, medir: s => (s.tipo === 'dono' ? 1 : 0) },
  { id: 'manual1', emoji: '📘', titulo: 'Siga o manual do plantão', alvo: 1, xp: 15, medir: s => (s.tipo === 'manual' ? 1 : 0) },
  { id: 'verde1', emoji: '🟢', titulo: 'Mude o tráfego para o lado verde', alvo: 1, xp: 15, medir: s => (s.tipo === 'verde' ? 1 : 0) },
  { id: 'certificado1', emoji: '🔏', titulo: 'Fale do certificado que vence', alvo: 1, xp: 15, medir: s => (s.tipo === 'certificado' ? 1 : 0) },
  { id: 'rebase1', emoji: '🌿', titulo: 'Rebaseie a branch em cima da main', alvo: 1, xp: 15, medir: s => (s.tipo === 'rebase' ? 1 : 0) },
  { id: 'consulta1', emoji: '🐌', titulo: 'Explique a consulta lenta', alvo: 1, xp: 15, medir: s => (s.tipo === 'consulta' ? 1 : 0) },
  { id: 'replica1', emoji: '🪞', titulo: 'Diga o atraso da réplica', alvo: 1, xp: 15, medir: s => (s.tipo === 'replica' ? 1 : 0) },
  { id: 'ensaio1', emoji: '🧪', titulo: 'Teste no ensaio antes da produção', alvo: 1, xp: 15, medir: s => (s.tipo === 'ensaio' ? 1 : 0) },
  { id: 'disco1', emoji: '💽', titulo: 'Fale do disco cheio', alvo: 1, xp: 15, medir: s => (s.tipo === 'disco' ? 1 : 0) },
  { id: 'pagina1', emoji: '📃', titulo: 'Explique a página com poucas linhas', alvo: 1, xp: 15, medir: s => (s.tipo === 'pagina' ? 1 : 0) },
  { id: 'squash1', emoji: '✂️', titulo: 'Junte os commits antes do merge', alvo: 1, xp: 15, medir: s => (s.tipo === 'squash' ? 1 : 0) },
  { id: 'circuito1', emoji: '🛑', titulo: 'Explique o circuito que abre', alvo: 1, xp: 15, medir: s => (s.tipo === 'circuito' ? 1 : 0) },
  { id: 'job1', emoji: '🌙', titulo: 'Fale do job da madrugada', alvo: 1, xp: 15, medir: s => (s.tipo === 'job' ? 1 : 0) },
  { id: 'colheita1', emoji: '🍒', titulo: 'Suba um commit sozinho', alvo: 1, xp: 15, medir: s => (s.tipo === 'colheita' ? 1 : 0) },
  { id: 'sessao1', emoji: '⏳', titulo: 'Fale do fim da sessão', alvo: 1, xp: 15, medir: s => (s.tipo === 'sessao' ? 1 : 0) },
  { id: 'tanque1', emoji: '🪣', titulo: 'Avise que o tanque está cheio', alvo: 1, xp: 15, medir: s => (s.tipo === 'tanque' ? 1 : 0) },
  { id: 'sonda1', emoji: '🩺', titulo: 'Fale da sonda que falhou', alvo: 1, xp: 15, medir: s => (s.tipo === 'sonda' ? 1 : 0) },
  { id: 'semente1', emoji: '🌱', titulo: 'Semeie o banco vazio', alvo: 1, xp: 15, medir: s => (s.tipo === 'semente' ? 1 : 0) },
  { id: 'registro1', emoji: '📋', titulo: 'Suba o nível do registro', alvo: 1, xp: 15, medir: s => (s.tipo === 'registro' ? 1 : 0) },
  { id: 'rastro1', emoji: '🔎', titulo: 'Copie o id da chamada', alvo: 1, xp: 15, medir: s => (s.tipo === 'rastro' ? 1 : 0) },
  { id: 'parada1', emoji: '🕛', titulo: 'Marque a janela da parada', alvo: 1, xp: 15, medir: s => (s.tipo === 'parada' ? 1 : 0) },
  { id: 'pod1', emoji: '🫛', titulo: 'Reinicie um pod', alvo: 1, xp: 15, medir: s => (s.tipo === 'pod' ? 1 : 0) },
  { id: 'lint1', emoji: '🧹', titulo: 'Fale do lint que falhou', alvo: 1, xp: 15, medir: s => (s.tipo === 'lint' ? 1 : 0) },
  { id: 'origem1', emoji: '🌐', titulo: 'Libere a outra origem', alvo: 1, xp: 15, medir: s => (s.tipo === 'origem' ? 1 : 0) },
  { id: 'link1', emoji: '🔗', titulo: 'Mande um link assinado', alvo: 1, xp: 15, medir: s => (s.tipo === 'link' ? 1 : 0) },
  { id: 'cpu1', emoji: '🧮', titulo: 'Fale do processador no pico', alvo: 1, xp: 15, medir: s => (s.tipo === 'cpu' ? 1 : 0) },
  { id: 'copia1', emoji: '💾', titulo: 'Marque a cópia da noite', alvo: 1, xp: 15, medir: s => (s.tipo === 'copia' ? 1 : 0) },
  { id: 'estouro1', emoji: '💥', titulo: 'Suba o limite de memória', alvo: 1, xp: 15, medir: s => (s.tipo === 'estouro' ? 1 : 0) },
  { id: 'impasse1', emoji: '🪢', titulo: 'Solte o trabalho mais antigo', alvo: 1, xp: 15, medir: s => (s.tipo === 'impasse' ? 1 : 0) },
  { id: 'dominio1', emoji: '🏷️', titulo: 'Aponte o nome que não resolve', alvo: 1, xp: 15, medir: s => (s.tipo === 'dominio' ? 1 : 0) },
  { id: 'morta1', emoji: '📮', titulo: 'Leia a mensagem da fila ao lado', alvo: 1, xp: 15, medir: s => (s.tipo === 'morta' ? 1 : 0) },
  { id: 'ponteiro1', emoji: '🕰️', titulo: 'Alinhe os relógios dos servidores', alvo: 1, xp: 15, medir: s => (s.tipo === 'ponteiro' ? 1 : 0) },
  { id: 'eleicao1', emoji: '🗳️', titulo: 'Eleja o líder com dois votos', alvo: 1, xp: 15, medir: s => (s.tipo === 'eleicao' ? 1 : 0) },
  { id: 'freio1', emoji: '🛞', titulo: 'Freie o produtor da fila cheia', alvo: 1, xp: 15, medir: s => (s.tipo === 'freio' ? 1 : 0) },
  { id: 'pausa1', emoji: '⌛', titulo: 'Fale da pausa de dois segundos', alvo: 1, xp: 15, medir: s => (s.tipo === 'pausa' ? 1 : 0) },
  { id: 'deriva1', emoji: '📄', titulo: 'Iguale a configuração ao repositório', alvo: 1, xp: 15, medir: s => (s.tipo === 'deriva' ? 1 : 0) },
  { id: 'descritor1', emoji: '📁', titulo: 'Feche os arquivos que sobraram', alvo: 1, xp: 15, medir: s => (s.tipo === 'descritor' ? 1 : 0) },
  { id: 'reserva1', emoji: '🪫', titulo: 'Fale da reserva de memória', alvo: 1, xp: 15, medir: s => (s.tipo === 'reserva' ? 1 : 0) },
  { id: 'varredura1', emoji: '🧵', titulo: 'Junte a consulta de cada linha', alvo: 1, xp: 15, medir: s => (s.tipo === 'varredura' ? 1 : 0) },
  { id: 'porta1', emoji: '🚪', titulo: 'Abra a porta que recusou', alvo: 1, xp: 15, medir: s => (s.tipo === 'porta' ? 1 : 0) },
  { id: 'inodo1', emoji: '📛', titulo: 'Fale dos nomes que acabaram', alvo: 1, xp: 15, medir: s => (s.tipo === 'inodo' ? 1 : 0) },
  { id: 'saida1', emoji: '🛎️', titulo: 'Encerre o serviço com calma', alvo: 1, xp: 15, medir: s => (s.tipo === 'saida' ? 1 : 0) },
  { id: 'manada1', emoji: '🐑', titulo: 'Segure o cache que venceu junto', alvo: 1, xp: 15, medir: s => (s.tipo === 'manada' ? 1 : 0) },
  { id: 'gotejo1', emoji: '💧', titulo: 'Fale da memória que não devolve', alvo: 1, xp: 15, medir: s => (s.tipo === 'gotejo' ? 1 : 0) },
  { id: 'frio1', emoji: '🥶', titulo: 'Aqueça a função que dormiu', alvo: 1, xp: 15, medir: s => (s.tipo === 'frio' ? 1 : 0) },
  { id: 'cadeado1', emoji: '🔐', titulo: 'Libere a leitura do arquivo', alvo: 1, xp: 15, medir: s => (s.tipo === 'cadeado' ? 1 : 0) },
  { id: 'cota1', emoji: '📏', titulo: 'Abra a cota que fechou', alvo: 1, xp: 15, medir: s => (s.tipo === 'cota' ? 1 : 0) },
  { id: 'ciclo1', emoji: '🔁', titulo: 'Pare o ciclo de queda', alvo: 1, xp: 15, medir: s => (s.tipo === 'ciclo' ? 1 : 0) },
  { id: 'zumbi1', emoji: '🧟', titulo: 'Espere o processo zumbi', alvo: 1, xp: 15, medir: s => (s.tipo === 'zumbi' ? 1 : 0) },
  { id: 'cisao1', emoji: '🪞', titulo: 'Junte os dois líderes', alvo: 1, xp: 15, medir: s => (s.tipo === 'cisao' ? 1 : 0) },
  { id: 'rajada1', emoji: '🌊', titulo: 'Acalme as tentativas juntas', alvo: 1, xp: 15, medir: s => (s.tipo === 'rajada' ? 1 : 0) },
  { id: 'brasa1', emoji: '🔥', titulo: 'Espalhe a chave quente', alvo: 1, xp: 15, medir: s => (s.tipo === 'brasa' ? 1 : 0) },
  { id: 'datagrama1', emoji: '📨', titulo: 'Recupere os pacotes perdidos', alvo: 1, xp: 15, medir: s => (s.tipo === 'datagrama' ? 1 : 0) },
  { id: 'passe1', emoji: '🎫', titulo: 'Renove o passe curto', alvo: 1, xp: 15, medir: s => (s.tipo === 'passe' ? 1 : 0) },
  { id: 'carimbo1', emoji: '🖊️', titulo: 'Grave com o carimbo novo', alvo: 1, xp: 15, medir: s => (s.tipo === 'carimbo' ? 1 : 0) },
  { id: 'pilha1', emoji: '📚', titulo: 'Pare a pilha sem fundo', alvo: 1, xp: 15, medir: s => (s.tipo === 'pilha' ? 1 : 0) },
  { id: 'cano1', emoji: '🔧', titulo: 'Abra o cano que fechou', alvo: 1, xp: 15, medir: s => (s.tipo === 'cano' ? 1 : 0) },
  { id: 'giro1', emoji: '🌀', titulo: 'Pare o giro de endereços', alvo: 1, xp: 15, medir: s => (s.tipo === 'giro' ? 1 : 0) },
  { id: 'compacta1', emoji: '🗜️', titulo: 'Solte a compactação dos arquivos', alvo: 1, xp: 15, medir: s => (s.tipo === 'compacta' ? 1 : 0) },
  { id: 'diario1', emoji: '✒️', titulo: 'Libere o diário de escrita', alvo: 1, xp: 15, medir: s => (s.tipo === 'diario' ? 1 : 0) },
  { id: 'vagao1', emoji: '🚃', titulo: 'Alcance o fim das mensagens', alvo: 1, xp: 15, medir: s => (s.tipo === 'vagao' ? 1 : 0) },
  { id: 'corrida1', emoji: '🏎️', titulo: 'Separe as duas escritas do saldo', alvo: 1, xp: 15, medir: s => (s.tipo === 'corrida' ? 1 : 0) },
  { id: 'indice1', emoji: '📇', titulo: 'Crie o índice que faltou', alvo: 1, xp: 15, medir: s => (s.tipo === 'indice' ? 1 : 0) },
  { id: 'percentil1', emoji: '📐', titulo: 'Meça o percentil das chamadas', alvo: 1, xp: 15, medir: s => (s.tipo === 'percentil' ? 1 : 0) },
  { id: 'segredo1', emoji: '🕵️', titulo: 'Tire o segredo do log', alvo: 1, xp: 15, medir: s => (s.tipo === 'segredo' ? 1 : 0) },
  { id: 'fantasma1', emoji: '👻', titulo: 'Isole a leitura fantasma', alvo: 1, xp: 15, medir: s => (s.tipo === 'fantasma' ? 1 : 0) },
  { id: 'inteiro1', emoji: '🔣', titulo: 'Segure o contador no limite', alvo: 1, xp: 15, medir: s => (s.tipo === 'inteiro' ? 1 : 0) },
  { id: 'filtro1', emoji: '🧲', titulo: 'Confira o sim falso do filtro', alvo: 1, xp: 15, medir: s => (s.tipo === 'filtro' ? 1 : 0) },
  { id: 'ordem1', emoji: '🔀', titulo: 'Coloque as mensagens na ordem', alvo: 1, xp: 15, medir: s => (s.tipo === 'ordem' ? 1 : 0) },
  { id: 'prova1', emoji: '🧬', titulo: 'Confira a prova dos bytes', alvo: 1, xp: 15, medir: s => (s.tipo === 'prova' ? 1 : 0) },
  { id: 'orfao1', emoji: '🪆', titulo: 'Ligue a filha ao pai', alvo: 1, xp: 15, medir: s => (s.tipo === 'orfao' ? 1 : 0) },
  { id: 'aceno1', emoji: '🫡', titulo: 'Feche o aceno dos dois sítios', alvo: 1, xp: 15, medir: s => (s.tipo === 'aceno' ? 1 : 0) },
  { id: 'gasto1', emoji: '🪙', titulo: 'Segure o gasto do mês', alvo: 1, xp: 15, medir: s => (s.tipo === 'gasto' ? 1 : 0) },
  { id: 'instavel1', emoji: '🎲', titulo: 'Rode o teste de novo', alvo: 1, xp: 15, medir: s => (s.tipo === 'instavel' ? 1 : 0) },
  { id: 'duplicado1', emoji: '📧', titulo: 'Recuse o e-mail repetido', alvo: 1, xp: 15, medir: s => (s.tipo === 'duplicado' ? 1 : 0) },
  { id: 'apagao1', emoji: '🔌', titulo: 'Meça a máquina desligada', alvo: 1, xp: 15, medir: s => (s.tipo === 'apagao' ? 1 : 0) },
  { id: 'replay1', emoji: '⏪', titulo: 'Preencha o buraco antigo', alvo: 1, xp: 15, medir: s => (s.tipo === 'replay' ? 1 : 0) },
  { id: 'eco1', emoji: '🔔', titulo: 'Ignore o evento repetido', alvo: 1, xp: 15, medir: s => (s.tipo === 'eco' ? 1 : 0) },
  { id: 'leque1', emoji: '🪭', titulo: 'Junte o leque de trabalhadores', alvo: 1, xp: 15, medir: s => (s.tipo === 'leque' ? 1 : 0) },
  { id: 'saga1', emoji: '🧵', titulo: 'Feche a saga pela metade', alvo: 1, xp: 15, medir: s => (s.tipo === 'saga' ? 1 : 0) },
  { id: 'caixa1', emoji: '📦', titulo: 'Solte o evento da caixa', alvo: 1, xp: 15, medir: s => (s.tipo === 'caixa' ? 1 : 0) },
  { id: 'apagado1', emoji: '🗑️', titulo: 'Esconda a linha apagada', alvo: 1, xp: 15, medir: s => (s.tipo === 'apagado' ? 1 : 0) },
  { id: 'espera1', emoji: '⏲️', titulo: 'Corte a espera longa', alvo: 1, xp: 15, medir: s => (s.tipo === 'espera' ? 1 : 0) },
  { id: 'cursor1', emoji: '🔖', titulo: 'Marque o lugar da página', alvo: 1, xp: 15, medir: s => (s.tipo === 'cursor' ? 1 : 0) },
  { id: 'fila1', emoji: '📥', titulo: 'Esvazie a fila parada', alvo: 1, xp: 15, medir: s => (s.tipo === 'fila' ? 1 : 0) },
  { id: 'disjuntor1', emoji: '🛑', titulo: 'Feche o disjuntor aberto', alvo: 1, xp: 15, medir: s => (s.tipo === 'disjuntor' ? 1 : 0) },
  { id: 'aluguel1', emoji: '🔑', titulo: 'Renove o aluguel vencido', alvo: 1, xp: 15, medir: s => (s.tipo === 'aluguel' ? 1 : 0) },
  { id: 'pulso1', emoji: '💓', titulo: 'Conte os pulsos perdidos', alvo: 1, xp: 15, medir: s => (s.tipo === 'pulso' ? 1 : 0) },
  { id: 'piscina1', emoji: '🏊', titulo: 'Abra uma vaga na piscina', alvo: 1, xp: 15, medir: s => (s.tipo === 'piscina' ? 1 : 0) },
  { id: 'balde1', emoji: '🪣', titulo: 'Reponha as fichas do balde', alvo: 1, xp: 15, medir: s => (s.tipo === 'balde' ? 1 : 0) },
  { id: 'cerca1', emoji: '🚧', titulo: 'Aumente o número da cerca', alvo: 1, xp: 15, medir: s => (s.tipo === 'cerca' ? 1 : 0) },
  { id: 'tremor1', emoji: '🫨', titulo: 'Varie o tempo da tentativa', alvo: 1, xp: 15, medir: s => (s.tipo === 'tremor' ? 1 : 0) },
  { id: 'portaria1', emoji: '🧱', titulo: 'Recuse a entrada extra', alvo: 1, xp: 15, medir: s => (s.tipo === 'portaria' ? 1 : 0) },
  { id: 'cola1', emoji: '🧷', titulo: 'Grude o cliente na máquina', alvo: 1, xp: 15, medir: s => (s.tipo === 'cola' ? 1 : 0) },
  { id: 'anteparo1', emoji: '🛟', titulo: 'Feche o compartimento da falha', alvo: 1, xp: 15, medir: s => (s.tipo === 'anteparo' ? 1 : 0) },
  { id: 'descarte1', emoji: '📤', titulo: 'Devolva o pedido que não cabe', alvo: 1, xp: 15, medir: s => (s.tipo === 'descarte' ? 1 : 0) },
  { id: 'cronometro1', emoji: '⏰', titulo: 'Corte a chamada no zero', alvo: 1, xp: 15, medir: s => (s.tipo === 'cronometro' ? 1 : 0) },
  { id: 'amostra1', emoji: '🧫', titulo: 'Guarde uma linha em dez', alvo: 1, xp: 15, medir: s => (s.tipo === 'amostra' ? 1 : 0) },
  { id: 'nicho1', emoji: '🪺', titulo: 'Mande a chave para o nicho', alvo: 1, xp: 15, medir: s => (s.tipo === 'nicho' ? 1 : 0) },
  { id: 'lacre1', emoji: '🔒', titulo: 'Troque o lacre do pacote', alvo: 1, xp: 15, medir: s => (s.tipo === 'lacre' ? 1 : 0) },
  { id: 'semaforo1', emoji: '🚦', titulo: 'Solte uma vaga do semáforo', alvo: 1, xp: 15, medir: s => (s.tipo === 'semaforo' ? 1 : 0) },
  { id: 'barreira1', emoji: '🏁', titulo: 'Espere os quatro na barreira', alvo: 1, xp: 15, medir: s => (s.tipo === 'barreira' ? 1 : 0) },
  { id: 'trinco1', emoji: '🪝', titulo: 'Zere a contagem do trinco', alvo: 1, xp: 15, medir: s => (s.tipo === 'trinco' ? 1 : 0) },
  { id: 'recuo1', emoji: '⏬', titulo: 'Dobre o intervalo da tentativa', alvo: 1, xp: 15, medir: s => (s.tipo === 'recuo' ? 1 : 0) },
  { id: 'vigia1', emoji: '🐕', titulo: 'Encerre a tarefa atrasada', alvo: 1, xp: 15, medir: s => (s.tipo === 'vigia' ? 1 : 0) },
  { id: 'ampulheta1', emoji: '🏺', titulo: 'Troque o passe vencido', alvo: 1, xp: 15, medir: s => (s.tipo === 'ampulheta' ? 1 : 0) },
  { id: 'carona1', emoji: '🚕', titulo: 'Mande a confirmação no próximo pacote', alvo: 1, xp: 15, medir: s => (s.tipo === 'carona' ? 1 : 0) },
  { id: 'veneno1', emoji: '☠️', titulo: 'Tire a mensagem ruim da fila', alvo: 1, xp: 15, medir: s => (s.tipo === 'veneno' ? 1 : 0) },
  { id: 'farol1', emoji: '🗼', titulo: 'Mostre que o serviço ainda vive', alvo: 1, xp: 15, medir: s => (s.tipo === 'farol' ? 1 : 0) },
  { id: 'ancora1', emoji: '⚓', titulo: 'Marque o estado antes da troca', alvo: 1, xp: 15, medir: s => (s.tipo === 'ancora' ? 1 : 0) },
  { id: 'malha1', emoji: '🕸️', titulo: 'Fale só com o vizinho da rede', alvo: 1, xp: 15, medir: s => (s.tipo === 'malha' ? 1 : 0) },
  { id: 'fenda1', emoji: '🪓', titulo: 'Divida o tráfego entre duas versões', alvo: 1, xp: 15, medir: s => (s.tipo === 'fenda' ? 1 : 0) },
  { id: 'cofre1', emoji: '🏦', titulo: 'Guarde a chave fora do app', alvo: 1, xp: 15, medir: s => (s.tipo === 'cofre' ? 1 : 0) },
  { id: 'audiencia1', emoji: '👂', titulo: 'Mostre o serviço certo do passe', alvo: 1, xp: 15, medir: s => (s.tipo === 'audiencia' ? 1 : 0) },
  { id: 'revogacao1', emoji: '🚫', titulo: 'Corte o passe que já venceu', alvo: 1, xp: 15, medir: s => (s.tipo === 'revogacao' ? 1 : 0) },
  { id: 'quorum1', emoji: '🗳️', titulo: 'Espere a maioria antes de gravar', alvo: 1, xp: 15, medir: s => (s.tipo === 'quorum' ? 1 : 0) },
  { id: 'maioria1', emoji: '✋', titulo: 'Confirme com mais da metade', alvo: 1, xp: 15, medir: s => (s.tipo === 'maioria' ? 1 : 0) },
  { id: 'arbitro1', emoji: '⚖️', titulo: 'Desempate quando a rede parte', alvo: 1, xp: 15, medir: s => (s.tipo === 'arbitro' ? 1 : 0) },
  { id: 'lider1', emoji: '🧭', titulo: 'Conduza o mandato com os outros nós', alvo: 1, xp: 15, medir: s => (s.tipo === 'lider' ? 1 : 0) },
  { id: 'mandato1', emoji: '📜', titulo: 'Suba o número a cada eleição', alvo: 1, xp: 15, medir: s => (s.tipo === 'mandato' ? 1 : 0) },
  { id: 'seguidor1', emoji: '👣', titulo: 'Copie o registro sem escrever sozinho', alvo: 1, xp: 15, medir: s => (s.tipo === 'seguidor' ? 1 : 0) },
  { id: 'orquestrador1', emoji: '🎼', titulo: 'Dispare a sequência pelo coordenador', alvo: 1, xp: 15, medir: s => (s.tipo === 'orquestrador' ? 1 : 0) },
  { id: 'coreografia1', emoji: '💃', titulo: 'Deixe o vizinho escolher a etapa', alvo: 1, xp: 15, medir: s => (s.tipo === 'coreografia' ? 1 : 0) },
  { id: 'compensacao1', emoji: '↩️', titulo: 'Desfaça a etapa que falhou', alvo: 1, xp: 15, medir: s => (s.tipo === 'compensacao' ? 1 : 0) },
  { id: 'primario1', emoji: '🥇', titulo: 'Deixe só um nó aceitar a escrita', alvo: 1, xp: 15, medir: s => (s.tipo === 'primario' ? 1 : 0) },
  { id: 'espelho1', emoji: '🪟', titulo: 'Acompanhe sem aceitar escrita', alvo: 1, xp: 15, medir: s => (s.tipo === 'espelho' ? 1 : 0) },
  { id: 'ascensao1', emoji: '📈', titulo: 'Vire dono quando o primário cai', alvo: 1, xp: 15, medir: s => (s.tipo === 'ascensao' ? 1 : 0) },
  { id: 'travessia1', emoji: '🌉', titulo: 'Confirme a escrita no disco na hora', alvo: 1, xp: 15, medir: s => (s.tipo === 'travessia' ? 1 : 0) },
  { id: 'retaguarda1', emoji: '🗄️', titulo: 'Deixe a página suja esperar no cache', alvo: 1, xp: 15, medir: s => (s.tipo === 'retaguarda' ? 1 : 0) },
  { id: 'contorno1', emoji: '➰', titulo: 'Mande a escrita grande direto ao disco', alvo: 1, xp: 15, medir: s => (s.tipo === 'contorno' ? 1 : 0) },
  { id: 'rumor1', emoji: '🗞️', titulo: 'Espalhe o estado de boca em boca', alvo: 1, xp: 15, medir: s => (s.tipo === 'rumor' ? 1 : 0) },
  { id: 'reparo1', emoji: '🩹', titulo: 'Conserte a cópia na leitura', alvo: 1, xp: 15, medir: s => (s.tipo === 'reparo' ? 1 : 0) },
  { id: 'deixa1', emoji: '🧳', titulo: 'Guarde a escrita até o dono voltar', alvo: 1, xp: 15, medir: s => (s.tipo === 'deixa' ? 1 : 0) },
  { id: 'floco1', emoji: '❄️', titulo: 'Monte o id com o tempo do nó', alvo: 1, xp: 15, medir: s => (s.tipo === 'floco' ? 1 : 0) },
  { id: 'epoca1', emoji: '🗓️', titulo: 'Suba a geração quando a formação muda', alvo: 1, xp: 15, medir: s => (s.tipo === 'epoca' ? 1 : 0) },
  { id: 'vetor1', emoji: '🧮', titulo: 'Anote a visão deste nó', alvo: 1, xp: 15, medir: s => (s.tipo === 'vetor' ? 1 : 0) },
  { id: 'sujeira1', emoji: '🫧', titulo: 'Veja o valor que ainda não fechou', alvo: 1, xp: 15, medir: s => (s.tipo === 'sujeira' ? 1 : 0) },
  { id: 'instantaneo1', emoji: '📸', titulo: 'Olhe o banco parado na abertura', alvo: 1, xp: 15, medir: s => (s.tipo === 'instantaneo' ? 1 : 0) },
  { id: 'serial1', emoji: '🔢', titulo: 'Encaixe o resultado numa ordem só', alvo: 1, xp: 15, medir: s => (s.tipo === 'serial' ? 1 : 0) },
  { id: 'fome1', emoji: '🍖', titulo: 'Veja a tarefa que nunca ganha a vez', alvo: 1, xp: 15, medir: s => (s.tipo === 'fome' ? 1 : 0) },
  { id: 'inversao1', emoji: '🔃', titulo: 'Note a baixa que segura a alta', alvo: 1, xp: 15, medir: s => (s.tipo === 'inversao' ? 1 : 0) },
  { id: 'idade1', emoji: '🧓', titulo: 'Suba a prioridade da espera longa', alvo: 1, xp: 15, medir: s => (s.tipo === 'idade' ? 1 : 0) },
  { id: 'sidecar1', emoji: '🛵', titulo: 'Deixe o ajudante morar ao lado', alvo: 1, xp: 15, medir: s => (s.tipo === 'sidecar' ? 1 : 0) },
  { id: 'embaixador1', emoji: '🌐', titulo: 'Deixe o proxy falar por quem está fora', alvo: 1, xp: 15, medir: s => (s.tipo === 'embaixador' ? 1 : 0) },
  { id: 'adaptador1', emoji: '🔌', titulo: 'Ligue o cliente antigo à API nova', alvo: 1, xp: 15, medir: s => (s.tipo === 'adaptador' ? 1 : 0) },
  { id: 'bizantino1', emoji: '🤥', titulo: 'Deixe um nó mentir e os outros concordarem', alvo: 1, xp: 15, medir: s => (s.tipo === 'bizantino' ? 1 : 0) },
  { id: 'particao1', emoji: '🧱', titulo: 'Divida a rede e separe os lados', alvo: 1, xp: 15, medir: s => (s.tipo === 'particao' ? 1 : 0) },
  { id: 'general1', emoji: '⚔️', titulo: 'Avance só com a mesma ordem', alvo: 1, xp: 15, medir: s => (s.tipo === 'general' ? 1 : 0) },
  { id: 'wal1', emoji: '🪵', titulo: 'Grave a escrita no log antes da tabela', alvo: 1, xp: 15, medir: s => (s.tipo === 'wal' ? 1 : 0) },
  { id: 'lsn1', emoji: '🧷', titulo: 'Deixe o número do registro só avançar', alvo: 1, xp: 15, medir: s => (s.tipo === 'lsn' ? 1 : 0) },
  { id: 'checkpoint1', emoji: '📍', titulo: 'Grave um ponto seguro no marco', alvo: 1, xp: 15, medir: s => (s.tipo === 'checkpoint' ? 1 : 0) },
  { id: 'nonce1', emoji: '🎲', titulo: 'Use o número uma vez e não deixe voltar', alvo: 1, xp: 15, medir: s => (s.tipo === 'nonce' ? 1 : 0) },
  { id: 'hmac1', emoji: '🏷️', titulo: 'Confira a mensagem com o selo e a chave', alvo: 1, xp: 15, medir: s => (s.tipo === 'hmac' ? 1 : 0) },
  { id: 'envelope1', emoji: '✉️', titulo: 'Leve a chave dentro de outra chave', alvo: 1, xp: 15, medir: s => (s.tipo === 'envelope' ? 1 : 0) },
  { id: 'lease1', emoji: '🔑', titulo: 'Alugue a trava por um tempo curto', alvo: 1, xp: 15, medir: s => (s.tipo === 'lease' ? 1 : 0) },
  { id: 'renova1', emoji: '🔄', titulo: 'Ganhe tempo na trava antes de cair', alvo: 1, xp: 15, medir: s => (s.tipo === 'renovacao' ? 1 : 0) },
  { id: 'vence1', emoji: '⌛', titulo: 'Solte a trava quando o tempo acaba', alvo: 1, xp: 15, medir: s => (s.tipo === 'vencimento' ? 1 : 0) },
  { id: 'outbox1', emoji: '📤', titulo: 'Deixe a mensagem esperar fora antes de sair', alvo: 1, xp: 15, medir: s => (s.tipo === 'outbox' ? 1 : 0) },
  { id: 'inbox1', emoji: '📥', titulo: 'Deixe a mensagem entrar e esperar a vez', alvo: 1, xp: 15, medir: s => (s.tipo === 'inbox' ? 1 : 0) },
  { id: 'relay1', emoji: '📮', titulo: 'Repasse a mensagem no posto', alvo: 1, xp: 15, medir: s => (s.tipo === 'relay' ? 1 : 0) },
  { id: 'offset1', emoji: '📏', titulo: 'Marque até onde o leitor já leu', alvo: 1, xp: 15, medir: s => (s.tipo === 'offset' ? 1 : 0) },
  { id: 'lag1', emoji: '🐢', titulo: 'Deixe o leitor atrás do escritor', alvo: 1, xp: 15, medir: s => (s.tipo === 'lag' ? 1 : 0) },
  { id: 'ack1', emoji: '✅', titulo: 'Confirme o trecho que o leitor leu', alvo: 1, xp: 15, medir: s => (s.tipo === 'ack' ? 1 : 0) },
  { id: 'snapshot1', emoji: '📷', titulo: 'Guarde o banco naquele instante', alvo: 1, xp: 15, medir: s => (s.tipo === 'snapshot' ? 1 : 0) },
  { id: 'restore1', emoji: '↩️', titulo: 'Devolva o banco ao instante salvo', alvo: 1, xp: 15, medir: s => (s.tipo === 'restore' ? 1 : 0) },
  { id: 'promote1', emoji: '🚀', titulo: 'Eleve a cópia a banco principal', alvo: 1, xp: 15, medir: s => (s.tipo === 'promote' ? 1 : 0) },
  { id: 'bloom1', emoji: '🌸', titulo: 'Marque a chave no filtro', alvo: 1, xp: 15, medir: s => (s.tipo === 'bloom' ? 1 : 0) },
  { id: 'cuco1', emoji: '🪺', titulo: 'Mude a chave para o outro ninho', alvo: 1, xp: 15, medir: s => (s.tipo === 'cuco' ? 1 : 0) },
  { id: 'esboco1', emoji: '✏️', titulo: 'Guarde uma conta pequena no desenho', alvo: 1, xp: 15, medir: s => (s.tipo === 'esboco' ? 1 : 0) },
  { id: 'merkle1', emoji: '🌳', titulo: 'Resuma as folhas num selo', alvo: 1, xp: 15, medir: s => (s.tipo === 'merkle' ? 1 : 0) },
  { id: 'radix1', emoji: '✂️', titulo: 'Corte o prefixo comum da árvore', alvo: 1, xp: 15, medir: s => (s.tipo === 'radix' ? 1 : 0) },
  { id: 'trie1', emoji: '🔤', titulo: 'Guarde a palavra letra a letra', alvo: 1, xp: 15, medir: s => (s.tipo === 'trie' ? 1 : 0) },
  { id: 'gossip1', emoji: '📣', titulo: 'Troque o estado entre os nós', alvo: 1, xp: 15, medir: s => (s.tipo === 'gossip' ? 1 : 0) },
  { id: 'phi1', emoji: '📉', titulo: 'Suba a suspeita com a pausa', alvo: 1, xp: 15, medir: s => (s.tipo === 'phi' ? 1 : 0) },
  { id: 'accrual1', emoji: '🧺', titulo: 'Some a falha aos poucos', alvo: 1, xp: 15, medir: s => (s.tipo === 'accrual' ? 1 : 0) },
  { id: 'hint1', emoji: '🔖', titulo: 'Aponte a linha que pode sair', alvo: 1, xp: 15, medir: s => (s.tipo === 'hint' ? 1 : 0) },
  { id: 'vacuum1', emoji: '🧹', titulo: 'Devolva o espaço morto', alvo: 1, xp: 15, medir: s => (s.tipo === 'vacuum' ? 1 : 0) },
  { id: 'freeze1', emoji: '🧊', titulo: 'Deixe a linha antiga só para leitura', alvo: 1, xp: 15, medir: s => (s.tipo === 'freeze' ? 1 : 0) },
  { id: 'bitmap1', emoji: '🗺️', titulo: 'Marque o bit da chave', alvo: 1, xp: 15, medir: s => (s.tipo === 'bitmap' ? 1 : 0) },
  { id: 'roaring1', emoji: '🦁', titulo: 'Junte os bits iguais num intervalo', alvo: 1, xp: 15, medir: s => (s.tipo === 'roaring' ? 1 : 0) },
  { id: 'hyper1', emoji: '🧮', titulo: 'Estime os itens distintos', alvo: 1, xp: 15, medir: s => (s.tipo === 'hyper' ? 1 : 0) },
  { id: 'crdt1', emoji: '🔀', titulo: 'Junte as edições sem trava', alvo: 1, xp: 15, medir: s => (s.tipo === 'crdt' ? 1 : 0) },
  { id: 'lww1', emoji: '🕰️', titulo: 'Deixe a escrita mais nova vencer o campo', alvo: 1, xp: 15, medir: s => (s.tipo === 'lww' ? 1 : 0) },
  { id: 'orset1', emoji: '📦', titulo: 'Segure o item até a remoção aparecer', alvo: 1, xp: 15, medir: s => (s.tipo === 'orset' ? 1 : 0) },
  { id: 'vector1', emoji: '🧭', titulo: 'Marque os fatos no relógio do vector', alvo: 1, xp: 15, medir: s => (s.tipo === 'vector' ? 1 : 0) },
  { id: 'dot1', emoji: '⚫', titulo: 'Nomeie a escrita com um ponto', alvo: 1, xp: 15, medir: s => (s.tipo === 'dot' ? 1 : 0) },
  { id: 'causal1', emoji: '🔗', titulo: 'Deixe a causa chegar antes do efeito', alvo: 1, xp: 15, medir: s => (s.tipo === 'causal' ? 1 : 0) },
  { id: 'shard1', emoji: '🧩', titulo: 'Guarde uma parte da chave no pedaço', alvo: 1, xp: 15, medir: s => (s.tipo === 'shard' ? 1 : 0) },
  { id: 'rebalance1', emoji: '⚖️', titulo: 'Mova a carga para outra parte', alvo: 1, xp: 15, medir: s => (s.tipo === 'rebalance' ? 1 : 0) },
  { id: 'split1', emoji: '🪓', titulo: 'Divida a parte cheia em duas', alvo: 1, xp: 15, medir: s => (s.tipo === 'split' ? 1 : 0) },
  { id: 'watermark1', emoji: '🪧', titulo: 'Marque até onde a leitura chegou', alvo: 1, xp: 15, medir: s => (s.tipo === 'watermark' ? 1 : 0) },
  { id: 'barrier1', emoji: '🚧', titulo: 'Espere o lote inteiro na barreira', alvo: 1, xp: 15, medir: s => (s.tipo === 'barrier' ? 1 : 0) },
  { id: 'align1', emoji: '📐', titulo: 'Deixe as linhas na mesma altura', alvo: 1, xp: 15, medir: s => (s.tipo === 'align' ? 1 : 0) },
  { id: 'witness1', emoji: '👁️', titulo: 'Diga que a testemunha viu o acordo', alvo: 1, xp: 15, medir: s => (s.tipo === 'witness' ? 1 : 0) },
  { id: 'voter1', emoji: '🗳️', titulo: 'Lance o voto na contagem final', alvo: 1, xp: 15, medir: s => (s.tipo === 'voter' ? 1 : 0) },
  { id: 'learner1', emoji: '🎓', titulo: 'Escute só o grupo que aprende', alvo: 1, xp: 15, medir: s => (s.tipo === 'learner' ? 1 : 0) },
  { id: 'checksum1', emoji: '🧾', titulo: 'Confira o bloco inteiro na soma', alvo: 1, xp: 15, medir: s => (s.tipo === 'checksum' ? 1 : 0) },
  { id: 'bulkhead1', emoji: '🛡️', titulo: 'Isole o excesso com a parede', alvo: 1, xp: 15, medir: s => (s.tipo === 'bulkhead' ? 1 : 0) },
  { id: 'fallback1', emoji: '🛟', titulo: 'Deixe o plano reserva entrar no lugar', alvo: 1, xp: 15, medir: s => (s.tipo === 'fallback' ? 1 : 0) },
  { id: 'tombstone1', emoji: '🪦', titulo: 'Marque a chave apagada na lápide', alvo: 1, xp: 15, medir: s => (s.tipo === 'tombstone' ? 1 : 0) },
  { id: 'purge1', emoji: '🗑️', titulo: 'Tire a chave morta na limpeza', alvo: 1, xp: 15, medir: s => (s.tipo === 'purge' ? 1 : 0) },
  { id: 'reclaim1', emoji: '♻️', titulo: 'Devolva o espaço para a lista livre', alvo: 1, xp: 15, medir: s => (s.tipo === 'reclaim' ? 1 : 0) },
  { id: 'journal1', emoji: '📓', titulo: 'Anote a mudança no journal', alvo: 1, xp: 15, medir: s => (s.tipo === 'journal' ? 1 : 0) },
  { id: 'segment1', emoji: '🗂️', titulo: 'Feche o arquivo no segment', alvo: 1, xp: 15, medir: s => (s.tipo === 'segment' ? 1 : 0) },
  { id: 'spill1', emoji: '💧', titulo: 'Mande o excesso ao disco no spill', alvo: 1, xp: 15, medir: s => (s.tipo === 'spill' ? 1 : 0) },
  { id: 'stripe1', emoji: '🧵', titulo: 'Espalhe o bloco no stripe', alvo: 1, xp: 15, medir: s => (s.tipo === 'stripe' ? 1 : 0) },
  { id: 'parity1', emoji: '🔁', titulo: 'Recupere o dado no parity', alvo: 1, xp: 15, medir: s => (s.tipo === 'parity' ? 1 : 0) },
  { id: 'rebuild1', emoji: '🔨', titulo: 'Refaça o disco no rebuild', alvo: 1, xp: 15, medir: s => (s.tipo === 'rebuild' ? 1 : 0) },
  { id: 'epoch1', emoji: '🌅', titulo: 'Abra o termo no epoch', alvo: 1, xp: 15, medir: s => (s.tipo === 'epoch' ? 1 : 0) },
  { id: 'ballot1', emoji: '🗳️', titulo: 'Conte o voto no ballot', alvo: 1, xp: 15, medir: s => (s.tipo === 'ballot' ? 1 : 0) },
  { id: 'fence1', emoji: '🪵', titulo: 'Segure a escrita na fence', alvo: 1, xp: 15, medir: s => (s.tipo === 'fence' ? 1 : 0) },
  { id: 'flush1', emoji: '🚰', titulo: 'Desça a memória no flush', alvo: 1, xp: 15, medir: s => (s.tipo === 'flush' ? 1 : 0) },
  { id: 'memtable1', emoji: '📥', titulo: 'Guarde a linha na memtable', alvo: 1, xp: 15, medir: s => (s.tipo === 'memtable' ? 1 : 0) },
  { id: 'extent1', emoji: '📚', titulo: 'Junte a página no extent', alvo: 1, xp: 15, medir: s => (s.tipo === 'extent' ? 1 : 0) },
  { id: 'manifest1', emoji: '📜', titulo: 'Liste o arquivo no manifest', alvo: 1, xp: 15, medir: s => (s.tipo === 'manifest' ? 1 : 0) },
  { id: 'hedge1', emoji: '🐇', titulo: 'Cubra a espera no hedge', alvo: 1, xp: 15, medir: s => (s.tipo === 'hedge' ? 1 : 0) },
  { id: 'debounce1', emoji: '⏲️', titulo: 'Espere a pausa no debounce', alvo: 1, xp: 15, medir: s => (s.tipo === 'debounce' ? 1 : 0) },
  { id: 'sstable1', emoji: '🧱', titulo: 'Ordene a chave no sstable', alvo: 1, xp: 15, medir: s => (s.tipo === 'sstable' ? 1 : 0) },
  { id: 'latch1', emoji: '🔒', titulo: 'Segure a leitura no latch', alvo: 1, xp: 15, medir: s => (s.tipo === 'latch' ? 1 : 0) },
  { id: 'throttle1', emoji: '🚥', titulo: 'Limite a chamada no throttle', alvo: 1, xp: 15, medir: s => (s.tipo === 'throttle' ? 1 : 0) },
  { id: 'iterator1', emoji: '🐾', titulo: 'Ande a chave no iterator', alvo: 1, xp: 15, medir: s => (s.tipo === 'iterator' ? 1 : 0) },
  { id: 'pager1', emoji: '📑', titulo: 'Carregue a página no pager', alvo: 1, xp: 15, medir: s => (s.tipo === 'pager' ? 1 : 0) },
  { id: 'evict1', emoji: '💨', titulo: 'Solte a página fria no evict', alvo: 1, xp: 15, medir: s => (s.tipo === 'evict' ? 1 : 0) },
  { id: 'histogram1', emoji: '📊', titulo: 'Conte o balde no histogram', alvo: 1, xp: 15, medir: s => (s.tipo === 'histogram' ? 1 : 0) },
  { id: 'gauge1', emoji: '🌡️', titulo: 'Mostre o nível no gauge', alvo: 1, xp: 15, medir: s => (s.tipo === 'gauge' ? 1 : 0) },
  { id: 'backfill1', emoji: '🪣', titulo: 'Encha o buraco no backfill', alvo: 1, xp: 15, medir: s => (s.tipo === 'backfill' ? 1 : 0) },
  { id: 'skew1', emoji: '📏', titulo: 'Entorte a chave no skew', alvo: 1, xp: 15, medir: s => (s.tipo === 'skew' ? 1 : 0) },
  { id: 'hotspot1', emoji: '🌶️', titulo: 'Esquente a chave no hotspot', alvo: 1, xp: 15, medir: s => (s.tipo === 'hotspot' ? 1 : 0) },
  { id: 'tail1', emoji: '🐌', titulo: 'Atrase a chamada no tail', alvo: 1, xp: 15, medir: s => (s.tipo === 'tail' ? 1 : 0) },
  { id: 'slo1', emoji: '🎯', titulo: 'Marque a meta no slo', alvo: 1, xp: 15, medir: s => (s.tipo === 'slo' ? 1 : 0) },
  { id: 'sli1', emoji: '📐', titulo: 'Meça a meta no sli', alvo: 1, xp: 15, medir: s => (s.tipo === 'sli' ? 1 : 0) },
  { id: 'probe1', emoji: '📡', titulo: 'Teste a porta no probe', alvo: 1, xp: 15, medir: s => (s.tipo === 'probe' ? 1 : 0) },
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
  { id: 'ouvido', emoji: '👂', nome: 'Ouvido Afiado', desc: 'Complete uma sessão de Escuta' },
  { id: 'papo', emoji: '💬', nome: 'Conversador', desc: 'Complete um diálogo guiado' },
  { id: 'sombra', emoji: '🗣️', nome: 'Eco', desc: 'Complete uma sessão de sombra' },
  { id: 'ator', emoji: '🎭', nome: 'Cinco Cenas', desc: 'Complete os cinco diálogos' },
  { id: 'cinco', emoji: '⏱️', nome: 'Cinco Minutos', desc: 'Complete o desafio de fala do dia' },
  { id: 'caminhos', emoji: '🔀', nome: 'Dois Caminhos', desc: 'Termine um diálogo em que a cena muda' },
  { id: 'pares', emoji: '👅', nome: 'Par Mínimo', desc: 'Complete um treino de pronúncia' },
  { id: 'nivelado', emoji: '🎯', nome: 'Sei meu nível', desc: 'Faça o teste de nível' },
  { id: 'pergunta', emoji: '❓', nome: 'Quem Pergunta', desc: 'Termine uma cena em que você faz a pergunta' },
  { id: 'standup', emoji: '💻', nome: 'Daily', desc: 'Termine uma cena de inglês de trabalho' },
  { id: 'reuniao', emoji: '🤝', nome: 'Na call', desc: 'Pratique um idiom de reunião' },
  { id: 'doDia', emoji: '☀️', nome: 'Do dia', desc: 'Responda a pergunta do dia' },
  { id: 'volta', emoji: '🔁', nome: 'De novo', desc: 'Revise uma frase que já escapou' },
  { id: 'remoto', emoji: '🎤', nome: 'Remoto', desc: 'Termine a entrevista de seis falas' },
  { id: 'conto', emoji: '📖', nome: 'Era uma vez', desc: 'Conte uma história no passado' },
  { id: 'preco', emoji: '🔢', nome: 'Quanto é', desc: 'Acerte números, datas ou preços de ouvido' },
  { id: 'opiniao', emoji: '💬', nome: 'Com jeito', desc: 'Dê uma opinião com um motivo' },
  { id: 'olho', emoji: '👀', nome: 'Olho clínico', desc: 'Descreva uma cena' },
  { id: 'rapido', emoji: '⚡', nome: 'Na hora', desc: 'Responda no tempo' },
  { id: 'semanaFala', emoji: '🗣️', nome: 'Semana de fala', desc: 'Bata a meta de falas da semana' },
  { id: 'relato', emoji: '🐛', nome: 'Relato', desc: 'Conte um bug em três falas' },
  { id: 'cortesia', emoji: '🙏', nome: 'Com educação', desc: 'Dê e receba um comentário de review' },
  { id: 'aquecer', emoji: '☕', nome: 'Antes da call', desc: 'Puxe um papo curto antes da reunião' },
  { id: 'claro', emoji: '🔎', nome: 'Deixa eu ver', desc: 'Peça para repetir ou parafraseie' },
  { id: 'demo', emoji: '🎬', nome: 'No palco', desc: 'Apresente uma feature e responda a plateia' },
  { id: 'prazo', emoji: '📌', nome: 'No prazo', desc: 'Negocie prazo ou escopo com educação' },
  { id: 'star', emoji: '⭐', nome: 'STAR', desc: 'Conte um caso em quatro falas' },
  { id: 'enfase', emoji: '🎵', nome: 'A ênfase', desc: 'Marque a palavra forte ou a curva da pergunta' },
  { id: 'decisao', emoji: '🏗️', nome: 'A escolha', desc: 'Explique uma decisão e a troca' },
  { id: 'par', emoji: '👥', nome: 'Na dupla', desc: 'Narre o que faz e peça ajuda' },
  { id: 'plantao', emoji: '🚨', nome: 'No plantão', desc: 'Dê status, desculpa e o próximo passo' },
  { id: 'retro', emoji: '🔄', nome: 'Na retro', desc: 'Diga o que foi bem, o que melhorar e a ação' },
  { id: 'chegada', emoji: '🧭', nome: 'Boas-vindas', desc: 'Explique o projeto, o fluxo e a primeira tarefa' },
  { id: 'ligacao', emoji: '🔗', nome: 'No entanto', desc: 'Ligue duas ideias com however, on the other hand ou that said' },
  { id: 'estimativa', emoji: '⏳', nome: 'Mais ou menos', desc: 'Dê um prazo e diga o que ainda não está certo' },
  { id: 'consenso', emoji: '⚖️', nome: 'No meio', desc: 'Discorde e proponha um meio-termo' },
  { id: 'atendimento', emoji: '📞', nome: 'No telefone', desc: 'Ligue para o banco, a entrega ou o hotel' },
  { id: 'gestor', emoji: '🗣️', nome: 'No 1:1', desc: 'Receba um ponto e devolva um feedback' },
  { id: 'final', emoji: '❓', nome: 'Sua pergunta', desc: 'Pergunte ao entrevistador no fim da conversa' },
  { id: 'mala', emoji: '🛫', nome: 'De mala', desc: 'Fale na conexão, na imigração ou no táxi' },
  { id: 'mistura', emoji: '⏱️', nome: 'Três minutos', desc: 'Misture frases dos treinos por três minutos' },
  { id: 'linha', emoji: '💻', nome: 'Na linha', desc: 'Explique um loop, um callback ou um null check' },
  { id: 'slack', emoji: '💬', nome: 'No Slack', desc: 'Peça uma review ou avise um atraso' },
  { id: 'social', emoji: '🍻', nome: 'Depois do trabalho', desc: 'Fale de happy hour, hobby ou do Brasil' },
  { id: 'termo', emoji: '🔤', nome: 'O som certo', desc: 'Diga cache, queue, SQL, GUI, height ou width' },
  { id: 'salario', emoji: '💰', nome: 'Na mesa', desc: 'Negocie faixa, plano de saúde ou ações' },
  { id: 'projeto', emoji: '🧰', nome: 'No portfólio', desc: 'Conte o problema, a stack e o resultado' },
  { id: 'sotaque', emoji: '🎧', nome: 'Outro sotaque', desc: 'Ouça uma voz americana, britânica ou indiana' },
  { id: 'desafio', emoji: '📅', nome: 'Dia de fala', desc: 'Termine o desafio diário de fala' },
  { id: 'requisito', emoji: '🗒️', nome: 'Na descoberta', desc: 'Pergunte quem usa e confirme o que entendeu' },
  { id: 'metrica', emoji: '📈', nome: 'O número', desc: 'Diga uma porcentagem ou um crescimento' },
  { id: 'aprendizado', emoji: '📖', nome: 'A lição', desc: 'Conte um erro e o que você aprendeu' },
  { id: 'passeio', emoji: '🚶', nome: 'Mãos livres', desc: 'Treine no modo só áudio' },
  { id: 'falha', emoji: '🛠️', nome: 'A causa', desc: 'Diga por que o deploy, o CI ou a permissão falhou' },
  { id: 'mentoria', emoji: '🌱', nome: 'A dica', desc: 'Explique um conceito simples para um júnior' },
  { id: 'socorro', emoji: '🩺', nome: 'No exterior', desc: 'Peça ajuda na farmácia, no médico ou na emergência' },
  { id: 'palestra', emoji: '🎤', nome: 'Na plateia', desc: 'Abra uma palestra, troque de slide ou chame as perguntas' },
  { id: 'duvida', emoji: '🙋', nome: 'Boa pergunta', desc: 'Ganhe tempo quando não souber a resposta' },
  { id: 'sinal', emoji: '📶', nome: 'O sinal', desc: 'Avise quando a voz corta, o vídeo trava ou a chamada cai' },
  { id: 'sistema', emoji: '🏗️', nome: 'O desenho', desc: 'Fale o pedido, a escala e o gargalo' },
  { id: 'codigo', emoji: '💻', nome: 'Em voz alta', desc: 'Pense em voz alta enquanto resolve o problema' },
  { id: 'colega', emoji: '🤝', nome: 'Outra área', desc: 'Peça ou ofereça ajuda a design, QA ou produto' },
  { id: 'simulado', emoji: '🎯', nome: 'A banca', desc: 'Termine o simulado remoto e veja a nota' },
  { id: 'modelo', emoji: '🤖', nome: 'Em palavras simples', desc: 'Explique prompt, alucinação ou RAG' },
  { id: 'furo', emoji: '🛡️', nome: 'O furo', desc: 'Fale de CVE, patch ou upgrade' },
  { id: 'rotina', emoji: '🏠', nome: 'Em casa', desc: 'Conte a manhã, o jantar ou a noite em família' },
  { id: 'assunto', emoji: '💬', nome: 'Assunto do dia', desc: 'Faça a conversa livre com acompanhamento' },
  { id: 'futuro', emoji: '🚀', nome: 'Daqui a cinco anos', desc: 'Diga a meta e o caminho da carreira' },
  { id: 'cultura', emoji: '🎬', nome: 'No intervalo', desc: 'Fale de um jogo, um filme ou uma série' },
  { id: 'aumento', emoji: '🏆', nome: 'A conquista', desc: 'Peça um aumento, uma promoção ou conte uma entrega' },
  { id: 'rota', emoji: '🔌', nome: 'A rota', desc: 'Explique endpoint, status ou autenticação' },
  { id: 'vivo', emoji: '🔥', nome: 'No ar', desc: 'Dê o status, peça ajuda ou feche a lição do incidente' },
  { id: 'produto', emoji: '📦', nome: 'O corte', desc: 'Negocie prazo ou escopo com o produto' },
  { id: 'fecho', emoji: '🙋', nome: 'A sua vez', desc: 'Pergunte do plantão, do crescimento ou da vaga aberta' },
  { id: 'espaco', emoji: '🔂', nome: 'Outra vez', desc: 'Revise uma frase que você errou mais de uma vez' },
  { id: 'mapa', emoji: '🗺️', nome: 'O mapa', desc: 'Explique a arquitetura ou o fluxo para quem chegou' },
  { id: 'duro', emoji: '🗣️', nome: 'O ponto difícil', desc: 'Dê ou receba um feedback duro no 1:1' },
  { id: 'proposta', emoji: '📐', nome: 'A proposta', desc: 'Apresente uma RFC e o preço da escolha' },
  { id: 'semana', emoji: '📊', nome: 'Dez minutos', desc: 'Some 10 minutos de fala nesta semana' },
  { id: 'narrar', emoji: '🎙️', nome: 'O par narrado', desc: 'Diga a próxima linha antes de escrever' },
  { id: 'banco', emoji: '🗄️', nome: 'A guarda', desc: 'Explique sessões, cache ou busca numa entrevista' },
  { id: 'recusa', emoji: '🙅', nome: 'O não educado', desc: 'Recuse um pedido e ofereça outro caminho' },
  { id: 'minutos', emoji: '⏱️', nome: 'Sua meta', desc: 'Bata a meta de minutos que você escolheu' },
  { id: 'sprint', emoji: '🖥️', nome: 'A sprint', desc: 'Mostre o que saiu e responda uma pergunta fora do roteiro' },
  { id: 'seguro', emoji: '🔐', nome: 'A decisão segura', desc: 'Fale de um furo, de um patch ou de apagar um dado' },
  { id: 'meetup', emoji: '🎫', nome: 'No meetup', desc: 'Puxe assunto num evento de tecnologia' },
  { id: 'completa', emoji: '🎓', nome: 'A entrevista', desc: 'Termine os cinco treinos e veja a nota' },
  { id: 'rodada', emoji: '📝', nome: 'A mesa', desc: 'Diga o fato, o ajuste e quem fica com a ação' },
  { id: 'migra', emoji: '🚚', nome: 'A migração', desc: 'Fale da troca de banco ou de biblioteca e do risco' },
  { id: 'estreia', emoji: '👋', nome: 'O primeiro dia', desc: 'Puxe um oi informal no time novo' },
  { id: 'foco', emoji: '🧩', nome: 'O foco', desc: 'Escolha frontend, backend ou IA e termine os cinco treinos' },
  { id: 'poker', emoji: '🃏', nome: 'A carta', desc: 'Vote a estimativa e diga o motivo' },
  { id: 'leigo', emoji: '🧮', nome: 'A conta da IA', desc: 'Fale do custo, da busca nos docs ou do molde' },
  { id: 'recruta', emoji: '📞', nome: 'A ligação', desc: 'Fale da pretensão, do fuso ou de quando começa' },
  { id: 'culpa', emoji: '🙏', nome: 'A desculpa', desc: 'Assuma o erro e diga o próximo passo' },
  { id: 'raio', emoji: '🔦', nome: 'O relâmpago', desc: 'Conte um projeto pessoal em cinco minutos' },
  { id: 'oferta', emoji: '💻', nome: 'A oferta', desc: 'Fale do notebook, da verba de estudo ou da data' },
  { id: 'pedido', emoji: '🙋', nome: 'Não entendi', desc: 'Peça o sotaque, a palavra ou leia o requisito de volta' },
  { id: 'cobertura', emoji: '🧪', nome: 'A cobertura', desc: 'Explique os testes, a cobertura ou o relógio falso' },
  { id: 'loom', emoji: '🎥', nome: 'O vídeo', desc: 'Deixe um check-in curto para o time assistir depois' },
  { id: 'caderno', emoji: '📒', nome: 'Meu vocabulário', desc: 'Use numa frase uma palavra que escapou nas falas' },
  { id: 'grafico', emoji: '📉', nome: 'O gráfico', desc: 'Fale da alta, da queda ou da causa' },
  { id: 'handoff', emoji: '🕒', nome: 'O handoff', desc: 'Peça o contexto e deixe a nota para o outro fuso' },
  { id: 'elevador', emoji: '🚪', nome: 'O elevador', desc: 'Apresente-se em trinta segundos para um diretor' },
  { id: 'junta', emoji: '🗂️', nome: 'A semana junta', desc: 'Revise vocabulário, frases mais erradas e a meta de minutos' },
  { id: 'pista', emoji: '🏁', nome: 'O bug raro', desc: 'Conte o sintoma e a prova de um bug intermitente' },
  { id: 'calma', emoji: '🐢', nome: 'Com calma', desc: 'Explique um conceito devagar para um júnior' },
  { id: 'folga', emoji: '🏖️', nome: 'A folga', desc: 'Fale de férias, do horário ou de duas semanas fora' },
  { id: 'abertas', emoji: '💭', nome: 'Perguntas abertas', desc: 'Responda cinco perguntas e veja palavras, tempo e preenchimento' },
  { id: 'respeito', emoji: '🏛️', nome: 'Com respeito', desc: 'Discorde de uma arquitetura e ofereça outro caminho' },
  { id: 'debito', emoji: '🧱', nome: 'A dívida', desc: 'Explique a dívida técnica e peça tempo para refatorar' },
  { id: 'indicacao', emoji: '✉️', nome: 'A indicação', desc: 'Peça a um ex-colega para ser a sua referência' },
  { id: 'ux', emoji: '🎨', nome: 'O contraste', desc: 'Explique contraste, foco do teclado ou o rótulo de um ícone' },
  { id: 'forum', emoji: '📣', nome: 'O fórum', desc: 'Descreva o problema e o que você já tentou' },
  { id: 'visto', emoji: '🛂', nome: 'O visto', desc: 'Fale de visto, mudança de país ou remoto' },
  { id: 'mes', emoji: '📆', nome: 'O mês', desc: 'Veja notas, minutos e preenchimentos das últimas quatro semanas' },
  { id: 'facil', emoji: '🧭', nome: 'O facilitador', desc: 'Abra a reunião, controle o tempo e feche com ações' },
  { id: 'stack', emoji: '🧰', nome: 'A escolha', desc: 'Explique React ou Vue, SQL ou documento, TypeScript ou JavaScript' },
  { id: 'sabado', emoji: '🌦️', nome: 'O sábado', desc: 'Fale da trilha, do domingo e de um plano curto' },
  { id: 'surpresa', emoji: '🎁', nome: 'Treino surpresa', desc: 'Faça o treino do dia e mantenha a sequência deste modo' },
  { id: 'brecha', emoji: '🔓', nome: 'A falha', desc: 'Explique um furo de segurança no review e o conserto' },
  { id: 'muda', emoji: '📐', nome: 'A mudança', desc: 'Negocie uma tela nova no meio do projeto' },
  { id: 'gaucho', emoji: '🧉', nome: 'O chimarrão', desc: 'Fale do Rio Grande do Sul, do chimarrão e do churrasco' },
  { id: 'radar', emoji: '📡', nome: 'O radar', desc: 'Explique a métrica, o alerta ou o painel do plantão' },
  { id: 'aplauso', emoji: '👏', nome: 'O aplauso', desc: 'Agradeça o time em público' },
  { id: 'gripe', emoji: '🤒', nome: 'A gripe', desc: 'Avise que está doente ou peça o dia' },
  { id: 'pm', emoji: '📎', nome: 'Com o PM', desc: 'Negocie a data sem pular os testes' },
  { id: 'laudo', emoji: '📄', nome: 'O laudo', desc: 'Conte a linha do tempo, a causa e o dono' },
  { id: 'rumo', emoji: '🔭', nome: 'O rumo', desc: 'Peça feedback de carreira no 1:1' },
  { id: 'acesso', emoji: '🔑', nome: 'O acesso', desc: 'Mostre o wiki, o repositório e a quem chamar' },
  { id: 'licenca', emoji: '💳', nome: 'A licença', desc: 'Peça a ferramenta paga, com o preço do mês' },
  { id: 'jargao', emoji: '🧾', nome: 'Sem jargão', desc: 'Explique a volta da página para o suporte' },
  { id: 'bandeira', emoji: '🎚️', nome: 'A bandeira', desc: 'Ligue para dez por cento e diga quem desliga' },
  { id: 'gelo', emoji: '🧊', nome: 'O gelo', desc: 'Marque o gelo e a exceção de hotfix' },
  { id: 'limite', emoji: '🚥', nome: 'O limite', desc: 'Diga o teto da API e o que o cliente faz' },
  { id: 'canario', emoji: '🐤', nome: 'O canário', desc: 'Mande a versão para uma máquina e diga se passou' },
  { id: 'despedida', emoji: '📭', nome: 'A despedida', desc: 'Avise que o caminho velho fecha em junho' },
  { id: 'repeticao', emoji: '🪝', nome: 'A repetição', desc: 'Diga que o mesmo evento pode chegar duas vezes' },
  { id: 'carga', emoji: '🏋️', nome: 'A carga', desc: 'Conte o teste de carga e onde ele rodou' },
  { id: 'boletim', emoji: '📰', nome: 'O boletim', desc: 'Leia a nota da versão, com as correções e o dia' },
  { id: 'dono', emoji: '🪪', nome: 'Quem aprova', desc: 'Diga os donos da pasta e peça um antes do merge' },
  { id: 'manual', emoji: '📘', nome: 'O manual', desc: 'Leia o alerta primeiro e ache o manual no wiki' },
  { id: 'verde', emoji: '🟢', nome: 'O lado verde', desc: 'Mande o tráfego para o lado verde e saiba voltar' },
  { id: 'certificado', emoji: '🔏', nome: 'O certificado', desc: 'Diga quando o certificado vence e quando o aviso sai' },
  { id: 'rebase', emoji: '🌿', nome: 'O rebase', desc: 'Diga que a branch está atrás e rebaseie em cima da main' },
  { id: 'consulta', emoji: '🐌', nome: 'A consulta', desc: 'Conte os quatro segundos e onde a consulta roda' },
  { id: 'replica', emoji: '🪞', nome: 'A réplica', desc: 'Diga o atraso da cópia e para onde vai a escrita' },
  { id: 'ensaio', emoji: '🧪', nome: 'O ensaio', desc: 'Teste no ensaio e diga de quando é a cópia' },
  { id: 'disco', emoji: '💽', nome: 'O disco', desc: 'Diga que o disco está cheio e o que pode sair' },
  { id: 'pagina', emoji: '📃', nome: 'A página', desc: 'Mostre poucas linhas e onde a próxima começa' },
  { id: 'squash', emoji: '✂️', nome: 'O squash', desc: 'Junte os commits e diga como fica o histórico' },
  { id: 'circuito', emoji: '🛑', nome: 'O circuito', desc: 'Diga quando o circuito abre e quando fecha' },
  { id: 'job', emoji: '🌙', nome: 'O job', desc: 'Diga o horário do job e quantas noites ele falhou' },
  { id: 'colheita', emoji: '🍒', nome: 'A colheita', desc: 'Suba um commit sozinho e deixe os outros para trás' },
  { id: 'sessao', emoji: '⏳', nome: 'A sessão', desc: 'Diga quando a sessão acaba e até quando ela estende' },
  { id: 'tanque', emoji: '🪣', nome: 'O tanque', desc: 'Avise que o tanque está cheio e feche as ociosas' },
  { id: 'sonda', emoji: '🩺', nome: 'A sonda', desc: 'Diga que a sonda falhou e rode de novo' },
  { id: 'semente', emoji: '🌱', nome: 'A semente', desc: 'Semeie o banco vazio e deixe produção quieta' },
  { id: 'registro', emoji: '📋', nome: 'O registro', desc: 'Suba o nível até debug e volte para info' },
  { id: 'rastro', emoji: '🔎', nome: 'O rastro', desc: 'Copie o id da chamada para o ticket' },
  { id: 'parada', emoji: '🕛', nome: 'A parada', desc: 'Marque a janela da meia-noite e a hora de volta' },
  { id: 'pod', emoji: '🫛', nome: 'O pod', desc: 'Reinicie um pod e deixe os outros no ar' },
  { id: 'lint', emoji: '🧹', nome: 'O lint', desc: 'Diga que o lint falhou e olhe o aviso no diff' },
  { id: 'origem', emoji: '🌐', nome: 'A origem', desc: 'Diga que o navegador bloqueia e libere o site' },
  { id: 'link', emoji: '🔗', nome: 'O link', desc: 'Mande um link assinado que vale uma hora' },
  { id: 'cpu', emoji: '🧮', nome: 'O processador', desc: 'Diga que o processador fica perto de noventa por cento' },
  { id: 'copia', emoji: '💾', nome: 'A cópia', desc: 'A cópia da noite começa às duas e fica pronta de manhã' },
  { id: 'estouro', emoji: '💥', nome: 'O estouro', desc: 'O processo ficou sem memória e o limite sobe' },
  { id: 'impasse', emoji: '🪢', nome: 'O impasse', desc: 'Solte o trabalho mais antigo que ainda espera' },
  { id: 'dominio', emoji: '🏷️', nome: 'O domínio', desc: 'Aponte o nome do site para o endereço novo' },
  { id: 'morta', emoji: '📮', nome: 'A carta morta', desc: 'Mande a mensagem ruim para a fila ao lado' },
  { id: 'ponteiro', emoji: '🕰️', nome: 'Os ponteiros', desc: 'Alinhe os relógios que diferem em dois segundos' },
  { id: 'eleicao', emoji: '🗳️', nome: 'A eleição', desc: 'Peça dois votos de três para o líder novo' },
  { id: 'freio', emoji: '🛞', nome: 'O freio', desc: 'Diminua o ritmo quando a fila encher' },
  { id: 'pausa', emoji: '⌛', nome: 'A pausa', desc: 'Diga que a coleta parou o processo por dois segundos' },
  { id: 'deriva', emoji: '📄', nome: 'A deriva', desc: 'Iguale a configuração publicada ao repositório' },
  { id: 'descritor', emoji: '📁', nome: 'O descritor', desc: 'Feche arquivos quando a próxima abertura falhar' },
  { id: 'reserva', emoji: '🪫', nome: 'A reserva', desc: 'Diga que o servidor passou a usar a memória de troca' },
  { id: 'varredura', emoji: '🧵', nome: 'A varredura', desc: 'Junte as consultas quando a tela dispara uma por linha' },
  { id: 'porta', emoji: '🚪', nome: 'A porta', desc: 'Avise que nada escuta e a conexão é recusada' },
  { id: 'inodo', emoji: '📛', nome: 'O inodo', desc: 'Diga que os nomes livres acabaram no volume' },
  { id: 'saida', emoji: '🛎️', nome: 'A saída', desc: 'Avise que o serviço recebeu o sinal de parar' },
  { id: 'manada', emoji: '🐑', nome: 'A manada', desc: 'Diga que o cache venceu e a enxurrada caiu' },
  { id: 'gotejo', emoji: '💧', nome: 'O gotejo', desc: 'Diga que a memória cresce e nada volta' },
  { id: 'frio', emoji: '🥶', nome: 'O frio', desc: 'Avise que a função acordou de uma partida fria' },
  { id: 'cadeado', emoji: '🔐', nome: 'O cadeado', desc: 'Diga que a permissão recusou a leitura' },
  { id: 'cota', emoji: '📏', nome: 'A cota', desc: 'Diga que o usuário passou da cota do disco' },
  { id: 'ciclo', emoji: '🔁', nome: 'O ciclo', desc: 'Avise que o processo continua reiniciando' },
  { id: 'zumbi', emoji: '🧟', nome: 'O zumbi', desc: 'Diga que o filho terminou e o pai não esperou' },
  { id: 'cisao', emoji: '🪞', nome: 'A cisão', desc: 'Diga que o grupo ficou com dois líderes' },
  { id: 'rajada', emoji: '🌊', nome: 'A rajada', desc: 'Avise que os clientes tentam de novo juntos' },
  { id: 'brasa', emoji: '🔥', nome: 'A brasa', desc: 'Diga que uma chave recebe a maior parte das escritas' },
  { id: 'datagrama', emoji: '📨', nome: 'O datagrama', desc: 'Diga que a rede deixou cair dois pacotes' },
  { id: 'passe', emoji: '🎫', nome: 'O passe', desc: 'Avise que o passe curto venceu' },
  { id: 'carimbo', emoji: '🖊️', nome: 'O carimbo', desc: 'Diga que o carimbo da linha mudou' },
  { id: 'pilha', emoji: '📚', nome: 'A pilha', desc: 'Diga que a pilha de chamadas cresceu sem fundo' },
  { id: 'cano', emoji: '🔧', nome: 'O cano', desc: 'Avise que a outra ponta fechou o cano' },
  { id: 'giro', emoji: '🌀', nome: 'O giro', desc: 'Diga que o navegador girou entre dois endereços' },
  { id: 'compacta', emoji: '🗜️', nome: 'A compactação', desc: 'Diga que o armazenamento reescreveu seis arquivos velhos' },
  { id: 'diario', emoji: '✒️', nome: 'O diário', desc: 'Avise que o diário de escrita ocupou quatro gigabytes' },
  { id: 'vagao', emoji: '🚃', nome: 'O vagão', desc: 'Diga que o leitor ficou mil mensagens atrás' },
  { id: 'corrida', emoji: '🏎️', nome: 'A corrida', desc: 'Diga que dois pedidos gravaram o mesmo saldo' },
  { id: 'indice', emoji: '📇', nome: 'O índice', desc: 'Avise que a busca leu cada linha sem índice' },
  { id: 'percentil', emoji: '📐', nome: 'O percentil', desc: 'Diga que noventa e nove por cento das chamadas cabem' },
  { id: 'segredo', emoji: '🕵️', nome: 'O segredo', desc: 'Diga que a chave secreta apareceu no log' },
  { id: 'fantasma', emoji: '👻', nome: 'O fantasma', desc: 'Avise que a segunda leitura viu uma linha nova' },
  { id: 'inteiro', emoji: '🔣', nome: 'O inteiro', desc: 'Diga que o contador voltou para zero' },
  { id: 'filtro', emoji: '🧲', nome: 'O filtro', desc: 'Diga que o filtro deu um sim falso' },
  { id: 'ordem', emoji: '🔀', nome: 'A ordem', desc: 'Avise que a mensagem quatro chegou antes da três' },
  { id: 'prova', emoji: '🧬', nome: 'A prova', desc: 'Diga que a prova dos bytes não bateu com o arquivo' },
  { id: 'orfao', emoji: '🪆', nome: 'O órfão', desc: 'Diga que a linha filha apontou para um pai que não existe' },
  { id: 'aceno', emoji: '🫡', nome: 'O aceno', desc: 'Avise que o segundo sítio nunca confirmou' },
  { id: 'gasto', emoji: '🪙', nome: 'O gasto', desc: 'Diga que três dias de erro gastaram o mês inteiro' },
  { id: 'instavel', emoji: '🎲', nome: 'O instável', desc: 'Diga que o teste passou na segunda tentativa' },
  { id: 'duplicado', emoji: '📧', nome: 'O duplicado', desc: 'Avise que o e-mail já estava na tabela' },
  { id: 'apagao', emoji: '🔌', nome: 'O apagão', desc: 'Diga que desligamos uma máquina de propósito' },
  { id: 'replay', emoji: '⏪', nome: 'O replay', desc: 'Diga que reexecutamos os dois últimos dias' },
  { id: 'eco', emoji: '🔔', nome: 'O eco', desc: 'Avise que o mesmo evento chegou duas vezes' },
  { id: 'leque', emoji: '🪭', nome: 'O leque', desc: 'Diga que um evento acordou quatro trabalhadores' },
  { id: 'saga', emoji: '🧵', nome: 'A saga', desc: 'Diga que o terceiro passo nunca terminou' },
  { id: 'caixa', emoji: '📦', nome: 'A caixa', desc: 'Avise que o evento ficou na caixa de saída' },
  { id: 'apagado', emoji: '🗑️', nome: 'O apagado', desc: 'Diga que a linha ficou na tabela depois do apagar' },
  { id: 'espera', emoji: '⏲️', nome: 'A espera', desc: 'Diga que a chamada parou depois de três segundos' },
  { id: 'cursor', emoji: '🔖', nome: 'O cursor', desc: 'Avise que a página seguinte perdeu o lugar' },
  { id: 'fila', emoji: '📥', nome: 'A fila', desc: 'Diga que a fila passou de mil mensagens' },
  { id: 'disjuntor', emoji: '🛑', nome: 'O disjuntor', desc: 'Diga que o disjuntor abriu depois de cinco falhas' },
  { id: 'aluguel', emoji: '🔑', nome: 'O aluguel', desc: 'Avise que o aluguel venceu depois de trinta segundos' },
  { id: 'pulso', emoji: '💓', nome: 'O pulso', desc: 'Diga que o nó perdeu três pulsos' },
  { id: 'piscina', emoji: '🏊', nome: 'A piscina', desc: 'Diga que a piscina ficou sem vagas livres' },
  { id: 'balde', emoji: '🪣', nome: 'O balde', desc: 'Avise que o balde ficou sem fichas' },
  { id: 'cerca', emoji: '🚧', nome: 'A cerca', desc: 'Diga que um número maior barrou o dono antigo' },
  { id: 'tremor', emoji: '🫨', nome: 'O tremor', desc: 'Diga que cada nova tentativa esperou um tempo diferente' },
  { id: 'portaria', emoji: '🧱', nome: 'A portaria', desc: 'Avise que a portaria recusou a chamada extra' },
  { id: 'cola', emoji: '🧷', nome: 'A cola', desc: 'Diga que o cliente voltou para a mesma máquina' },
  { id: 'anteparo', emoji: '🛟', nome: 'O anteparo', desc: 'Diga que a falha ficou presa no próprio compartimento' },
  { id: 'descarte', emoji: '📤', nome: 'O descarte', desc: 'Avise que o serviço devolveu o pedido que não cabe' },
  { id: 'cronometro', emoji: '⏰', nome: 'O cronômetro', desc: 'Diga que a chamada parou quando o tempo chegou a zero' },
  { id: 'amostra', emoji: '🧫', nome: 'A amostra', desc: 'Diga que guardamos uma linha a cada dez' },
  { id: 'nicho', emoji: '🪺', nome: 'O nicho', desc: 'Avise que a chave caiu no nicho dela' },
  { id: 'lacre', emoji: '🔒', nome: 'O lacre', desc: 'Diga que o lacre do pacote mudou' },
  { id: 'semaforo', emoji: '🚦', nome: 'O semáforo', desc: 'Diga que só dois trabalhos passam juntos' },
  { id: 'barreira', emoji: '🏁', nome: 'A barreira', desc: 'Avise que os quatro precisam chegar juntos' },
  { id: 'trinco', emoji: '🪝', nome: 'O trinco', desc: 'Diga que o trinco abre quando a conta zera' },
  { id: 'recuo', emoji: '⏬', nome: 'O recuo', desc: 'Diga que cada falha dobra a espera' },
  { id: 'vigia', emoji: '🐕', nome: 'O vigia', desc: 'Avise que o vigia encerra a tarefa atrasada' },
  { id: 'ampulheta', emoji: '🏺', nome: 'A ampulheta', desc: 'Diga que o passe vence em quinze minutos' },
  { id: 'carona', emoji: '🚕', nome: 'A carona', desc: 'Diga que a confirmação viaja no próximo pacote' },
  { id: 'veneno', emoji: '☠️', nome: 'O veneno', desc: 'Avise que a mensagem ruim sai da fila' },
  { id: 'farol', emoji: '🗼', nome: 'O farol', desc: 'Diga que o farol mostra o serviço vivo' },
  { id: 'ancora', emoji: '⚓', nome: 'A âncora', desc: 'Diga que a âncora guarda o estado antigo' },
  { id: 'malha', emoji: '🕸️', nome: 'A malha', desc: 'Avise que cada serviço fala só com o vizinho' },
  { id: 'fenda', emoji: '🪓', nome: 'A fenda', desc: 'Diga que o tráfego se divide em duas versões' },
  { id: 'cofre', emoji: '🏦', nome: 'O cofre', desc: 'Diga que a chave mora fora do app' },
  { id: 'audiencia', emoji: '👂', nome: 'A audiência', desc: 'Avise que o passe só vale para o serviço certo' },
  { id: 'revogacao', emoji: '🚫', nome: 'A revogação', desc: 'Diga que o passe antigo deixa de valer' },
  { id: 'quorum', emoji: '🗳️', nome: 'O quórum', desc: 'Diga que a escrita espera a maioria' },
  { id: 'maioria', emoji: '✋', nome: 'A maioria', desc: 'Avise que mais da metade precisa confirmar' },
  { id: 'arbitro', emoji: '⚖️', nome: 'O árbitro', desc: 'Diga que o árbitro desempata a rede' },
  { id: 'lider', emoji: '🧭', nome: 'O líder', desc: 'Diga que o líder conduz o mandato' },
  { id: 'mandato', emoji: '📜', nome: 'O mandato', desc: 'Avise que cada eleição sobe o número' },
  { id: 'seguidor', emoji: '👣', nome: 'O seguidor', desc: 'Diga que o seguidor copia o registro' },
  { id: 'orquestrador', emoji: '🎼', nome: 'O orquestrador', desc: 'Diga que o coordenador dispara a sequência' },
  { id: 'coreografia', emoji: '💃', nome: 'A coreografia', desc: 'Diga que o vizinho escolhe a etapa' },
  { id: 'compensacao', emoji: '↩️', nome: 'A compensação', desc: 'Diga que a falha desfaz a etapa anterior' },
  { id: 'primario', emoji: '🥇', nome: 'O primário', desc: 'Diga que só um nó aceita a escrita' },
  { id: 'espelho', emoji: '🪟', nome: 'O espelho', desc: 'Diga que a cópia não aceita escrita' },
  { id: 'ascensao', emoji: '📈', nome: 'A ascensão', desc: 'Diga que a cópia vira dona' },
  { id: 'travessia', emoji: '🌉', nome: 'A travessia', desc: 'Diga que a escrita chega ao disco na hora' },
  { id: 'retaguarda', emoji: '🗄️', nome: 'A retaguarda', desc: 'Diga que a página suja espera no cache' },
  { id: 'contorno', emoji: '➰', nome: 'O contorno', desc: 'Diga que a escrita grande pula o cache' },
  { id: 'rumor', emoji: '🗞️', nome: 'O rumor', desc: 'Diga que os nós espalham o estado' },
  { id: 'reparo', emoji: '🩹', nome: 'O reparo', desc: 'Diga que a leitura conserta a cópia' },
  { id: 'deixa', emoji: '🧳', nome: 'A deixa', desc: 'Diga que o vizinho guarda a escrita' },
  { id: 'floco', emoji: '❄️', nome: 'O floco', desc: 'Diga que o floco nasce do tempo' },
  { id: 'epoca', emoji: '🗓️', nome: 'A época', desc: 'Diga que a época sobe com a formação' },
  { id: 'vetor', emoji: '🧮', nome: 'O vetor', desc: 'Diga que o vetor anota a visão' },
  { id: 'sujeira', emoji: '🫧', nome: 'A sujeira', desc: 'Diga que a leitura pega o valor aberto' },
  { id: 'instantaneo', emoji: '📸', nome: 'O instantâneo', desc: 'Diga que a foto congela as linhas' },
  { id: 'serial', emoji: '🔢', nome: 'O serial', desc: 'Diga que o resultado cabe numa ordem' },
  { id: 'fome', emoji: '🍖', nome: 'A fome', desc: 'Diga que a tarefa espera e não roda' },
  { id: 'inversao', emoji: '🔃', nome: 'A inversão', desc: 'Diga que a baixa segura o recurso' },
  { id: 'idade', emoji: '🧓', nome: 'A idade', desc: 'Diga que a espera sobe a prioridade' },
  { id: 'sidecar', emoji: '🛵', nome: 'O sidecar', desc: 'Diga que o ajudante mora ao lado' },
  { id: 'embaixador', emoji: '🌐', nome: 'O embaixador', desc: 'Diga que o proxy fala por quem está fora' },
  { id: 'adaptador', emoji: '🔌', nome: 'O adaptador', desc: 'Diga que a tradução liga o cliente antigo' },
  { id: 'bizantino', emoji: '🤥', nome: 'O bizantino', desc: 'Diga que um nó mente e os outros concordam' },
  { id: 'particao', emoji: '🧱', nome: 'A partição', desc: 'Diga que a rede se divide e os lados não se veem' },
  { id: 'general', emoji: '⚔️', nome: 'O general', desc: 'Diga que os exércitos avançam com a mesma ordem' },
  { id: 'wal', emoji: '🪵', nome: 'O wal', desc: 'Diga que a escrita entra no log antes da tabela' },
  { id: 'lsn', emoji: '🧷', nome: 'O lsn', desc: 'Diga que o número do registro só avança' },
  { id: 'checkpoint', emoji: '📍', nome: 'O checkpoint', desc: 'Diga que o marco grava um ponto seguro' },
  { id: 'nonce', emoji: '🎲', nome: 'O nonce', desc: 'Diga que o número entra uma vez e não volta' },
  { id: 'hmac', emoji: '🏷️', nome: 'O hmac', desc: 'Diga que o selo confere a mensagem e a chave' },
  { id: 'envelope', emoji: '✉️', nome: 'O envelope', desc: 'Diga que a chave viaja dentro de outra chave' },
  { id: 'lease', emoji: '🔑', nome: 'O lease', desc: 'Diga que a trava alugada vale por um tempo' },
  { id: 'renovacao', emoji: '🔄', nome: 'A renovação', desc: 'Diga que a trava ganha tempo antes de cair' },
  { id: 'vencimento', emoji: '⌛', nome: 'O vencimento', desc: 'Diga que a trava solta quando o tempo acaba' },
  { id: 'outbox', emoji: '📤', nome: 'O outbox', desc: 'Diga que a mensagem espera fora antes de sair' },
  { id: 'inbox', emoji: '📥', nome: 'O inbox', desc: 'Diga que a mensagem entra e espera a vez' },
  { id: 'relay', emoji: '📮', nome: 'O relay', desc: 'Diga que o posto repassa a mensagem adiante' },
  { id: 'offset', emoji: '📏', nome: 'O offset', desc: 'Diga que o leitor marca até onde já leu' },
  { id: 'lag', emoji: '🐢', nome: 'O lag', desc: 'Diga que o leitor fica atrás do escritor' },
  { id: 'ack', emoji: '✅', nome: 'O ack', desc: 'Diga que o leitor confirma o trecho lido' },
  { id: 'snapshot', emoji: '📷', nome: 'O snapshot', desc: 'Diga que a foto guarda o banco naquele instante' },
  { id: 'restore', emoji: '↩️', nome: 'O restore', desc: 'Diga que a foto devolve o banco ao instante salvo' },
  { id: 'promote', emoji: '🚀', nome: 'O promote', desc: 'Diga que a cópia vira o banco principal' },
  { id: 'bloom', emoji: '🌸', nome: 'O bloom', desc: 'Diga que o filtro pode dizer que a chave está lá' },
  { id: 'cuco', emoji: '🪺', nome: 'O cuco', desc: 'Diga que a chave muda de ninho quando o lugar enche' },
  { id: 'esboco', emoji: '✏️', nome: 'O esboço', desc: 'Diga que o desenho guarda uma conta pequena' },
  { id: 'merkle', emoji: '🌳', nome: 'O merkle', desc: 'Diga que a árvore resume as folhas num selo' },
  { id: 'radix', emoji: '✂️', nome: 'O radix', desc: 'Diga que a árvore corta o prefixo comum' },
  { id: 'trie', emoji: '🔤', nome: 'O trie', desc: 'Diga que a árvore guarda a palavra letra a letra' },
  { id: 'gossip', emoji: '📣', nome: 'O gossip', desc: 'Diga que os nós trocam o estado entre si' },
  { id: 'phi', emoji: '📉', nome: 'O phi', desc: 'Diga que a suspeita sobe com a pausa' },
  { id: 'accrual', emoji: '🧺', nome: 'O accrual', desc: 'Diga que a falha soma aos poucos' },
  { id: 'hint', emoji: '🔖', nome: 'O hint', desc: 'Diga que a dica aponta a linha' },
  { id: 'vacuum', emoji: '🧹', nome: 'O vacuum', desc: 'Diga que a limpeza devolve o espaço' },
  { id: 'freeze', emoji: '🧊', nome: 'O freeze', desc: 'Diga que a linha antiga fica para leitura' },
  { id: 'bitmap', emoji: '🗺️', nome: 'O bitmap', desc: 'Diga que o mapa marca o bit da chave' },
  { id: 'roaring', emoji: '🦁', nome: 'O roaring', desc: 'Diga que os bits iguais viram um intervalo' },
  { id: 'hyper', emoji: '🧮', nome: 'O hyper', desc: 'Diga que a conta estima itens distintos' },
  { id: 'crdt', emoji: '🔀', nome: 'O crdt', desc: 'Diga que as edições se juntam sem trava' },
  { id: 'lww', emoji: '🕰️', nome: 'O lww', desc: 'Diga que a escrita mais nova vence o campo' },
  { id: 'orset', emoji: '📦', nome: 'O orset', desc: 'Diga que o item fica até a remoção aparecer' },
  { id: 'vector', emoji: '🧭', nome: 'O vector', desc: 'Diga que cada nó guarda o próprio relógio' },
  { id: 'dot', emoji: '⚫', nome: 'O dot', desc: 'Diga que o ponto nomeia uma escrita' },
  { id: 'causal', emoji: '🔗', nome: 'O causal', desc: 'Diga que a causa chega antes do efeito' },
  { id: 'shard', emoji: '🧩', nome: 'O shard', desc: 'Diga que o pedaço guarda uma parte da chave' },
  { id: 'rebalance', emoji: '⚖️', nome: 'O rebalance', desc: 'Diga que as partes trocam de lugar' },
  { id: 'split', emoji: '🪓', nome: 'O split', desc: 'Diga que a parte grande vira duas' },
  { id: 'watermark', emoji: '🪧', nome: 'O watermark', desc: 'Diga que a marca mostra até onde a leitura chegou' },
  { id: 'barrier', emoji: '🚧', nome: 'O barrier', desc: 'Diga que a barreira espera o lote inteiro' },
  { id: 'align', emoji: '📐', nome: 'O align', desc: 'Diga que as linhas ficam na mesma altura' },
  { id: 'witness', emoji: '👁️', nome: 'O witness', desc: 'Diga que a testemunha viu o acordo fechado' },
  { id: 'voter', emoji: '🗳️', nome: 'O voter', desc: 'Diga que o voto entra na contagem final' },
  { id: 'learner', emoji: '🎓', nome: 'O learner', desc: 'Diga que quem aprende só escuta o grupo' },
  { id: 'checksum', emoji: '🧾', nome: 'O checksum', desc: 'Diga que a soma confere o bloco inteiro' },
  { id: 'bulkhead', emoji: '🛡️', nome: 'O bulkhead', desc: 'Diga que a parede isola o excesso' },
  { id: 'fallback', emoji: '🛟', nome: 'O fallback', desc: 'Diga que o plano reserva entra no lugar' },
  { id: 'tombstone', emoji: '🪦', nome: 'O tombstone', desc: 'Diga que a lápide marca a chave apagada' },
  { id: 'purge', emoji: '🗑️', nome: 'O purge', desc: 'Diga que a limpeza tira a chave morta' },
  { id: 'reclaim', emoji: '♻️', nome: 'O reclaim', desc: 'Diga que o espaço volta para a lista livre' },
  { id: 'journal', emoji: '📓', nome: 'O journal', desc: 'Diga que o journal anota a mudança' },
  { id: 'segment', emoji: '🗂️', nome: 'O segment', desc: 'Diga que o segment fecha o arquivo' },
  { id: 'spill', emoji: '💧', nome: 'O spill', desc: 'Diga que o spill manda o excesso ao disco' },
  { id: 'stripe', emoji: '🧵', nome: 'O stripe', desc: 'Diga que o stripe espalha o bloco' },
  { id: 'parity', emoji: '🔁', nome: 'O parity', desc: 'Diga que o parity recupera o dado' },
  { id: 'rebuild', emoji: '🔨', nome: 'O rebuild', desc: 'Diga que o rebuild refaz o disco' },
  { id: 'epoch', emoji: '🌅', nome: 'O epoch', desc: 'Diga que o epoch abre o termo' },
  { id: 'ballot', emoji: '🗳️', nome: 'O ballot', desc: 'Diga que o ballot conta o voto' },
  { id: 'fence', emoji: '🪵', nome: 'A fence', desc: 'Diga que a fence segura a escrita' },
  { id: 'flush', emoji: '🚰', nome: 'O flush', desc: 'Diga que o flush desce a memória' },
  { id: 'memtable', emoji: '📥', nome: 'A memtable', desc: 'Diga que a memtable guarda a linha' },
  { id: 'extent', emoji: '📚', nome: 'O extent', desc: 'Diga que o extent junta as páginas' },
  { id: 'manifest', emoji: '📜', nome: 'O manifest', desc: 'Diga que o manifesto lista o arquivo' },
  { id: 'hedge', emoji: '🐇', nome: 'O hedge', desc: 'Diga que o hedge cobre a espera' },
  { id: 'debounce', emoji: '⏲️', nome: 'O debounce', desc: 'Diga que o debounce espera a pausa' },
  { id: 'sstable', emoji: '🧱', nome: 'O sstable', desc: 'Diga que o sstable ordena a chave' },
  { id: 'latch', emoji: '🔒', nome: 'O latch', desc: 'Diga que o latch segura a leitura' },
  { id: 'throttle', emoji: '🚥', nome: 'O throttle', desc: 'Diga que o throttle limita a chamada' },
  { id: 'iterator', emoji: '🐾', nome: 'O iterator', desc: 'Diga que o iterator anda a chave' },
  { id: 'pager', emoji: '📑', nome: 'O pager', desc: 'Diga que o pager carrega a página' },
  { id: 'evict', emoji: '💨', nome: 'O evict', desc: 'Diga que o evict solta a página fria' },
  { id: 'histogram', emoji: '📊', nome: 'O histogram', desc: 'Diga que o histogram conta o balde' },
  { id: 'gauge', emoji: '🌡️', nome: 'O gauge', desc: 'Diga que o gauge mostra o nível' },
  { id: 'backfill', emoji: '🪣', nome: 'O backfill', desc: 'Diga que o backfill enche o buraco' },
  { id: 'skew', emoji: '📏', nome: 'O skew', desc: 'Diga que o skew entorta a chave' },
  { id: 'hotspot', emoji: '🌶️', nome: 'O hotspot', desc: 'Diga que o hotspot esquenta a chave' },
  { id: 'tail', emoji: '🐌', nome: 'O tail', desc: 'Diga que o tail atrasa a chamada' },
  { id: 'slo', emoji: '🎯', nome: 'O slo', desc: 'Diga que o slo marca a meta' },
  { id: 'sli', emoji: '📐', nome: 'O sli', desc: 'Diga que o sli mede a meta' },
  { id: 'probe', emoji: '📡', nome: 'O probe', desc: 'Diga que o probe testa a porta' },
  { id: 'estrela', emoji: '⭐', nome: 'A estrela', desc: 'Marque um treino como favorito' },
  { id: 'tudo', emoji: '🦜', nome: 'Louro Aprova', desc: 'Complete todas as lições' }
];

export const MASCOTE = {
  quase: [
    'Quase! A letrinha escapou ✍️',
    'Valeu, mas olha a grafia 👀',
    'Por um triz. Fica o aviso 🦜'
  ],
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
    'Não foi dessa. Bora de novo 💪',
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
