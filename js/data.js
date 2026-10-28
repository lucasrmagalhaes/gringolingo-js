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
          { en: 'excuse me', pt: 'com licença', nota: 'Excuse me vem ANTES: para chamar atenção ou pedir passagem; desculpa por um erro é sorry.' },
          { en: 'sorry', pt: 'desculpa', nota: 'Sorry vem DEPOIS do erro, para se desculpar; para interromper ou pedir passagem, use excuse me.' },
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
          { en: 'bread', pt: 'pão', nota: 'Pão é incontável em inglês: some bread — nunca "a bread" nem "breads".' },
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
          { en: 'lunch', pt: 'almoço', nota: 'Lunch é o almoço; launch (com a) é lançamento — cuidado ao digitar.' },
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
          { en: 'luggage', pt: 'bagagem', alt: ['baggage'], nota: 'Luggage é incontável: nada de "luggages" — para contar, diga two bags.' },
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
          { en: 'turn left', pt: 'vire à esquerda', nota: 'Vire à esquerda é só turn left — o "à" não vira to.' },
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
          { en: 'office', pt: 'escritório', nota: 'Falso amigo: office é escritório — oficina de carro é garage.' }
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
          { en: 'parents', pt: 'pais', nota: 'Falso amigo: parents são só pai e mãe — parentes em geral é relatives.' }
        ]
      },
      {
        id: 'f2', titulo: 'Família grande', emoji: '👵',
        itens: [
          { en: 'grandmother', pt: 'avó', alt: ['grandma'] },
          { en: 'grandfather', pt: 'avô', alt: ['grandpa'] },
          { en: 'uncle', pt: 'tio' },
          { en: 'aunt', pt: 'tia' },
          { en: 'cousin', pt: 'primo', nota: 'Cousin vale para primo e prima — o inglês não marca o gênero aqui.' },
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
        dica: { titulo: 'My dispensa o artigo', corpo: 'Meu e minha viram uma palavra só: my — my mother, my family. E o artigo some: she is my sister, nunca "the my sister". Para ele use his, para ela use her.' },
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
          { en: 'foot', pt: 'pé', nota: 'Plural irregular: one foot, two FEET — nada de foots.' },
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
          { en: 'tooth', pt: 'dente', nota: 'Plural irregular: one tooth, two TEETH — por isso é brush my teeth.' },
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
        dica: { titulo: 'Sintoma usa have, estado usa be', corpo: 'Dor, febre e sintoma se TÊM: I have a headache, I have a fever. Já como você está vai com to be: I am better, I am sick. E o "estou com" do português não vira "I am with" — cai todo mundo nessa.' },
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

export const VERSAO_APP = '2.3';

export const NOVIDADES = [
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
      '🦜 O Louro comemora com você na tela de resultado — de coroa quando você gabarita'
    ]
  },
  {
    versao: '1.6',
    titulo: 'Correção mais justa e app mais firme',
    itens: [
      '◀️ O botão Voltar do celular agora funciona dentro do app, tela por tela',
      '🚪 Sair no meio da lição agora pede confirmação — nada de perder progresso sem querer',
      '⚖️ Correção mais justa: typo que forma outra palavra de verdade não passa, e o NÃO SEI não zera mais a memória da palavra',
      '🔤 Oficina de Verbos consertada',
      '🕛 Streak e missões não viram mais às 21h — o dia agora acaba à meia-noite',
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
