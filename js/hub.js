// Catálogo do hub de fluência: grupos, busca e o próximo treino.
// A escolha é determinística. Nada sai do aparelho.

import { planoDaSemana } from './plantao.js';

export const CATEGORIAS = [
  { id: 'trabalho', titulo: 'Trabalho' },
  { id: 'entrevista', titulo: 'Entrevista' },
  { id: 'cotidiano', titulo: 'Dia a dia' },
  { id: 'pronuncia', titulo: 'Pronúncia' },
  { id: 'revisao', titulo: 'Revisão' }
];

const TITULO_POR_CATEGORIA = new Map(CATEGORIAS.map(c => [c.id, c.titulo]));

const BRUTOS = [
  ['modelo', 'trabalho', '🤖', 'Para leigos', 'Prompt, alucinação e RAG.', 'modelos'],
  ['furo', 'trabalho', '🛡️', 'O furo', 'CVE, patch e upgrade de dependência.', 'furos'],
  ['colega', 'trabalho', '🤝', 'Outra área', 'Peça e ofereça ajuda a design.', 'colegas'],
  ['palestra', 'trabalho', '🎤', 'Palestra', 'Abertura, slide e perguntas.', 'palestras'],
  ['duvida', 'trabalho', '🙋', 'Sem a resposta', 'Ganhe tempo na pergunta.', 'duvidas'],
  ['sinal', 'trabalho', '📶', 'Sinal ruim', 'A voz corta e o vídeo trava.', 'sinais'],
  ['falha', 'trabalho', '🛠️', 'Por que falhou', 'O que quebrou.', 'falhas'],
  ['mentoria', 'trabalho', '🌱', 'Mentoria', 'Uma dica e a ideia por trás.', 'mentorias'],
  ['requisito', 'trabalho', '🗒️', 'Requisitos', 'Pergunta de descoberta.', 'requisitos'],
  ['metrica', 'trabalho', '📈', 'Métricas', 'Números, porcentagens e crescimento.', 'metricas'],
  ['aprendizado', 'trabalho', '📖', 'Um erro', 'O erro, o efeito e a lição.', 'aprendizados'],
  ['linha', 'trabalho', '💻', 'Linha a linha', 'Explique o loop e o null.', 'linhas'],
  ['slack', 'trabalho', '💬', 'Slack', 'Peça review ou avise um atraso.', 'slacks'],
  ['gestor', 'trabalho', '🗣️', 'Feedback 1:1', 'Ouça um ponto do gestor.', 'gestores'],
  ['estimativa', 'trabalho', '⏳', 'Estimativa', 'Diga o prazo e a incerteza.', 'estimativas'],
  ['consenso', 'trabalho', '⚖️', 'Consenso', 'Discorde e proponha um meio-termo.', 'consensos'],
  ['retro', 'trabalho', '🔄', 'Retrospectiva', 'O que foi bem e a ação.', 'retros'],
  ['chegada', 'trabalho', '🧭', 'Onboarding', 'Explique o projeto.', 'chegadas'],
  ['ligacao', 'trabalho', '🔗', 'Conectores', 'However e on the other hand.', 'ligacoes'],
  ['decisao', 'trabalho', '🏗️', 'Decisão técnica', 'Explique a escolha e a troca.', 'decisoes'],
  ['par', 'trabalho', '👥', 'Pair', 'Narre o que está fazendo.', 'pares'],
  ['plantao', 'trabalho', '🚨', 'Plantão', 'Status, desculpa e o passo.', 'incidentes'],
  ['demo', 'trabalho', '🎬', 'Demo de produto', 'Um minuto para apresentar.', 'demos'],
  ['prazo', 'trabalho', '📌', 'Prazo e escopo', 'Sugira um corte.', 'negociacoes'],
  ['relato', 'trabalho', '🐛', 'Relatar um bug', 'Três falas: causa e correção.', 'relatos'],
  ['cortesia', 'trabalho', '🙏', 'Review com educação', 'Dê um comentário e receba outro.', 'cortesias'],
  ['aquecer', 'trabalho', '☕', 'Antes da reunião', 'Fim de semana, clima e viagem.', 'aquecimentos'],
  ['claro', 'trabalho', '🔎', 'Esclarecer', 'Peça para repetir e confirme.', 'esclarecimentos'],
  ['opiniao', 'trabalho', '💬', 'Opinião', 'Dê um motivo com educação.', 'opinioes'],
  ['tecnico', 'trabalho', '💻', 'Inglês de trabalho', 'Standup, bug e code review.', 'tecnicos'],
  ['idioma', 'trabalho', '🤝', 'Idioms de reunião', 'Touch base e circle back.', 'idiomas'],
  ['frasal', 'trabalho', '🧩', 'Phrasal verbs', 'Look for e figure out.', 'verbosFala'],
  ['sistema', 'entrevista', '🏗️', 'Sistema', 'Pedido, escala e gargalo.', 'sistemas'],
  ['codigo', 'entrevista', '💻', 'Em voz alta', 'Pense alto enquanto resolve.', 'codigos'],
  ['simulado', 'entrevista', '🎯', 'Simulado', 'Seis falas de treinos.', 'simulados'],
  ['salario', 'entrevista', '💰', 'Salário', 'Faixa, plano de saúde e ações.', 'salarios'],
  ['projeto', 'entrevista', '🧰', 'Portfólio', 'Problema, stack e resultado.', 'projetos'],
  ['final', 'entrevista', '❓', 'Pergunta final', 'Pergunte ao entrevistador.', 'finais'],
  ['star', 'entrevista', '⭐', 'Entrevista STAR', 'Situação, tarefa e ação.', 'stars'],
  ['remoto', 'entrevista', '🎤', 'Entrevista longa', 'Seis falas para a vaga.', 'entrevistas'],
  ['conto', 'entrevista', '📖', 'Contar no passado', 'Uma história curta, em duas falas.', 'contos'],
  ['livre', 'entrevista', '🙋', 'Falar de você', 'Um minuto sobre você.', 'livres'],
  ['futuro', 'entrevista', '🚀', 'Daqui a cinco anos', 'A meta e o caminho da carreira.', 'futuros'],
  ['rotina', 'cotidiano', '🏠', 'Em casa', 'Manhã, jantar e a rotina.', 'rotinas'],
  ['papo', 'cotidiano', '💬', 'Conversa livre', 'Três assuntos do dia.', 'papos'],
  ['socorro', 'cotidiano', '🩺', 'No exterior', 'Farmácia, médico e emergência.', 'socorros'],
  ['passeio', 'cotidiano', '🚶', 'Só áudio', 'A pergunta é lida em voz alta.', 'passeios'],
  ['social', 'cotidiano', '🍻', 'Happy hour', 'Um brinde, o violão e o Brasil.', 'sociais'],
  ['viagem', 'cotidiano', '🛫', 'Viagem a trabalho', 'Conexão, imigração e táxi.', 'viagens'],
  ['atendimento', 'cotidiano', '📞', 'Atendimento', 'Banco, entrega e hotel.', 'atendimentos'],
  ['cena', 'cotidiano', '👀', 'Descrever a cena', 'Diga o que acontece e um detalhe.', 'cenasFala'],
  ['pergunta', 'cotidiano', '❓', 'Você pergunta', 'Café, loja, aeroporto e reunião.', 'perguntas'],
  ['sotaque', 'pronuncia', '🎧', 'Sotaques', 'Americano, britânico e indiano.', 'sotaques'],
  ['enfase', 'pronuncia', '🎵', 'Ênfase', 'Marque a palavra forte.', 'enfases'],
  ['termo', 'pronuncia', '🔤', 'Termos técnicos', 'O som de cache e queue.', 'termos'],
  ['reducao', 'pronuncia', '⏩', 'Fala rápida', 'Gonna, wanna e palavras.', 'reduzidas'],
  ['numero', 'pronuncia', '🔢', 'Números, datas e preços', 'Ouça e escolha o valor.', 'numeros'],
  ['desafio', 'revisao', '📅', 'Desafio do dia', 'A sequência aumenta as frases.', 'desafios'],
  ['mistura', 'revisao', '⏱️', 'Três minutos', 'Frases dos treinos em 3 minutos.', 'misturas'],
  ['deslize', 'revisao', '🔁', 'Deslizes de fala', 'Frases que escaparam voltam.', 'revisoesFala'],
  ['dia', 'revisao', '☀️', 'Pergunta do dia', 'Uma pergunta e outra em seguida.', 'diasPergunta'],
  ['nivel', 'revisao', '🎯', 'Teste de nível', 'Oito perguntas, de A1 a B2.', ''],
  ['resumo', 'revisao', '📅', 'Resumo da semana', 'A nota desta semana.', ''],
  ['rapido', 'revisao', '⚡', 'Pensa em inglês', 'Quatro respostas curtas.', 'rapidos'],
  ['cultura', 'cotidiano', '🎬', 'Esporte, filme e série', 'Jogo, cinema e a série da semana.', 'culturas'],
  ['aumento', 'trabalho', '🏆', 'O aumento', 'Peça aumento e fale da promoção.', 'aumentos'],
  ['rota', 'trabalho', '🔌', 'A API', 'Endpoint, status e autenticação.', 'rotas'],
  ['vivo', 'trabalho', '🔥', 'Ao vivo', 'Status na hora e pedido de ajuda.', 'vivos'],
  ['produto', 'trabalho', '📦', 'Com o produto', 'Negocie o prazo da entrega.', 'produtos'],
  ['fecho', 'entrevista', '🙋', 'Suas perguntas', 'Plantão, crescimento e a vaga.', 'fechos'],
  ['espaco', 'revisao', '🔂', 'Mais erradas', 'As frases que você mais errou.', 'espacos'],
  ['mapa', 'trabalho', '🗺️', 'O mapa', 'Arquitetura e fluxo.', 'mapas'],
  ['duro', 'trabalho', '🗣️', 'O ponto difícil', 'Dar e receber um feedback.', 'duros'],
  ['proposta', 'trabalho', '📐', 'A proposta', 'Apresente uma RFC.', 'propostas'],
  ['semana', 'revisao', '📊', 'Semana falada', 'Minutos de fala e treinos por grupo.', ''],
  ['narrar', 'trabalho', '🎙️', 'O par narrado', 'Pense a próxima linha.', 'narras'],
  ['banco', 'entrevista', '🗄️', 'Banco ou cache', 'Explique a guarda dos dados.', 'bancos'],
  ['recusa', 'trabalho', '🙅', 'O não educado', 'Recuse o pedido e ofereça outro.', 'recusas'],
  ['sprint', 'trabalho', '🖥️', 'Demo da sprint', 'Mostre o que saiu.', 'sprints'],
  ['seguro', 'trabalho', '🔐', 'A decisão segura', 'Furo, patch e o tempo de guarda.', 'seguros'],
  ['meetup', 'cotidiano', '🎫', 'No meetup', 'Puxe assunto num evento.', 'meetups'],
  ['completa', 'entrevista', '🎓', 'Entrevista completa', 'Cinco treinos em sequência.', 'completas'],
  ['rodada', 'trabalho', '📝', 'A mesa da retro', 'Fato, ajuste e a ação.', 'rodadas'],
  ['migra', 'trabalho', '🚚', 'A migração', 'Banco ou biblioteca, e o risco.', 'migras'],
  ['estreia', 'cotidiano', '👋', 'Primeiro dia', 'Um oi informal no time novo.', 'estreias'],
  ['foco', 'entrevista', '🧩', 'Entrevista por foco', 'Escolha frontend ou backend.', 'focos'],
  ['poker', 'trabalho', '🃏', 'A carta', 'Vote a estimativa.', 'pokers'],
  ['leigo', 'trabalho', '🧮', 'A conta da IA', 'Custo e busca nos docs.', 'leigos'],
  ['recruta', 'entrevista', '📞', 'A ligação', 'Pretensão, fuso e o começo.', 'recrutas'],
  ['culpa', 'trabalho', '🙏', 'A desculpa', 'Assuma o erro e o passo.', 'culpas'],
  ['raio', 'trabalho', '🔦', 'O relâmpago', 'Cinco minutos sobre um projeto.', 'raios'],
  ['oferta', 'entrevista', '💻', 'A oferta', 'Equipamento e verba de estudo.', 'ofertas'],
  ['sombra', 'revisao', '🗣️', 'Sombra', 'Ouça a voz e repita.', 'sombra'],
  ['pedido', 'trabalho', '🙋', 'Não entendi', 'Peça o sotaque e a palavra.', 'pedidos'],
  ['cobertura', 'trabalho', '🧪', 'A cobertura', 'Diga como os testes protegem.', 'coberturas'],
  ['loom', 'trabalho', '🎥', 'O vídeo', 'Um check-in curto para o time.', 'looms'],
  ['caderno', 'revisao', '📒', 'Meu vocabulário', 'Palavras que escaparam nas falas.', 'cadernos'],
  ['grafico', 'trabalho', '📉', 'O gráfico', 'Alta, queda e a causa.', 'graficos'],
  ['handoff', 'trabalho', '🕒', 'O handoff', 'Peça o que ficou aberto.', 'handoffs'],
  ['elevador', 'entrevista', '🚪', 'O elevador', 'Trinta segundos para um diretor.', 'elevadores'],
  ['junta', 'revisao', '🗂️', 'A semana junta', 'Vocabulário e frases mais erradas.', 'juntas'],
  ['pista', 'trabalho', '🏁', 'O bug raro', 'Sintoma e prova de um bug.', 'pistas'],
  ['calma', 'trabalho', '🐢', 'Com calma', 'Explique um conceito devagar.', 'calmas'],
  ['folga', 'cotidiano', '🏖️', 'A folga', 'Férias, horário e o limite.', 'folgas'],
  ['abertas', 'entrevista', '💭', 'Perguntas abertas', 'Cinco perguntas abertas.', 'abertas'],
  ['respeito', 'trabalho', '🏛️', 'Com respeito', 'Discorde de uma arquitetura.', 'respeitos'],
  ['debito', 'trabalho', '🧱', 'A dívida', 'Explique a dívida técnica.', 'debitos'],
  ['indicacao', 'entrevista', '✉️', 'A indicação', 'Peça a um ex-colega a referência.', 'indicacoes'],
  ['ux', 'trabalho', '🎨', 'O contraste', 'Explique contraste, foco e rótulo.', 'uxs'],
  ['forum', 'trabalho', '📣', 'O fórum', 'Descreva o problema.', 'foruns'],
  ['visto', 'entrevista', '🛂', 'O visto', 'Fale de visto ou mudança de país.', 'vistos'],
  ['mes', 'revisao', '📆', 'O mês', 'Notas, minutos e preenchimentos.', 'meses'],
  ['facil', 'trabalho', '🧭', 'O facilitador', 'Abra a reunião e feche.', 'facils'],
  ['stack', 'trabalho', '🧰', 'A escolha', 'React ou Vue, SQL ou documento.', 'stacks'],
  ['sabado', 'cotidiano', '🌦️', 'O sábado', 'Conte o sábado e o domingo.', 'sabados'],
  ['surpresa', 'revisao', '🎁', 'Treino surpresa', 'Um treino por dia.', 'surpresas'],
  ['brecha', 'trabalho', '🔓', 'A falha', 'Explique o furo no review.', 'brechas'],
  ['muda', 'trabalho', '📐', 'A mudança', 'O cliente pede uma tela nova.', 'mudas'],
  ['gaucho', 'cotidiano', '🧉', 'O chimarrão', 'Chimarrão e churrasco.', 'gauchos'],
  ['radar', 'trabalho', '📡', 'O radar', 'Métrica, alerta e o painel.', 'radares', 'dashboard'],
  ['aplauso', 'trabalho', '👏', 'O aplauso', 'Agradeça o time em público.', 'aplausos'],
  ['gripe', 'cotidiano', '🤒', 'A gripe', 'Avise que está doente.', 'gripes'],
  ['pm', 'trabalho', '📎', 'Com o PM', 'Negocie a data sem pular os testes.', 'pms'],
  ['laudo', 'trabalho', '📄', 'O laudo', 'Linha do tempo, causa e dono.', 'laudos'],
  ['rumo', 'trabalho', '🔭', 'O rumo', 'Peça feedback de carreira no 1:1.', 'rumos'],
  ['acesso', 'trabalho', '🔑', 'O acesso', 'Wiki e o repositório.', 'acessos'],
  ['licenca', 'trabalho', '💳', 'A licença', 'Peça a ferramenta paga.', 'licencas'],
  ['jargao', 'trabalho', '🧾', 'Sem jargão', 'Explique a volta da página.', 'jargoes'],
  ['bandeira', 'trabalho', '🎚️', 'A bandeira', 'Ligue para dez por cento.', 'bandeiras'],
  ['gelo', 'trabalho', '🧊', 'O gelo', 'Sem merge depois das quatro.', 'gelos'],
  ['limite', 'trabalho', '🚥', 'O limite', 'Cem chamadas por minuto.', 'limites'],
  ['canario', 'trabalho', '🐤', 'O canário', 'Uma máquina recebe a versão.', 'canarios'],
  ['despedida', 'trabalho', '📭', 'A despedida', 'O caminho velho fecha em junho.', 'despedidas'],
  ['repeticao', 'trabalho', '🪝', 'A repetição', 'O mesmo evento pode chegar duas vezes.', 'repeticoes'],
  ['carga', 'trabalho', '🏋️', 'A carga', 'O teste de carga rodou.', 'cargas'],
  ['boletim', 'trabalho', '📰', 'O boletim', 'A nota lista correções.', 'boletins'],
  ['dono', 'trabalho', '🪪', 'Quem aprova', 'A pasta tem dois donos.', 'donos'],
  ['manual', 'trabalho', '📘', 'O manual', 'O manual manda ler o alerta.', 'manuais'],
  ['verde', 'trabalho', '🟢', 'O lado verde', 'O tráfego vai para o lado verde.', 'verdes'],
  ['certificado', 'trabalho', '🔏', 'O certificado', 'O certificado vence na sexta.', 'certificados'],
  ['rebase', 'trabalho', '🌿', 'O rebase', 'A branch está atrás da main.', 'rebases'],
  ['consulta', 'trabalho', '🐌', 'A consulta', 'A consulta leva quatro segundos.', 'consultas'],
  ['replica', 'trabalho', '🪞', 'A réplica', 'A réplica está atrás.', 'replicas'],
  ['ensaio', 'trabalho', '🧪', 'O ensaio', 'O teste vai para o ensaio.', 'ensaios'],
  ['disco', 'trabalho', '💽', 'O disco', 'O disco está noventa por cento.', 'discos'],
  ['pagina', 'trabalho', '📃', 'A página', 'A lista mostra vinte linhas.', 'paginas'],
  ['squash', 'trabalho', '✂️', 'O squash', 'Três commits viram um só.', 'squashes'],
  ['circuito', 'trabalho', '🛑', 'O circuito', 'O circuito abre depois.', 'circuitos'],
  ['job', 'trabalho', '🌙', 'O job', 'O job roda às três da manhã.', 'jobs'],
  ['colheita', 'trabalho', '🍒', 'A colheita', 'Um commit sobe sozinho.', 'colheitas'],
  ['sessao', 'trabalho', '⏳', 'A sessão', 'A sessão acaba depois.', 'sessoes'],
  ['tanque', 'trabalho', '🪣', 'O tanque', 'O tanque enche.', 'tanques'],
  ['sonda', 'trabalho', '🩺', 'A sonda', 'A sonda falhou de novo.', 'sondas'],
  ['semente', 'trabalho', '🌱', 'A semente', 'A semente enche o banco vazio.', 'sementes'],
  ['registro', 'trabalho', '📋', 'O registro', 'Suba o registro para debug.', 'registros'],
  ['rastro', 'trabalho', '🔎', 'O rastro', 'O id fica no cabeçalho.', 'rastros'],
  ['parada', 'trabalho', '🕛', 'A parada', 'A parada começa à meia-noite.', 'paradas'],
  ['pod', 'trabalho', '🫛', 'O pod', 'Reinicie só um pod.', 'pods'],
  ['lint', 'trabalho', '🧹', 'O lint', 'O lint falhou em dois arquivos.', 'lints'],
  ['origem', 'trabalho', '🌐', 'A origem', 'O navegador bloqueia a origem.', 'origens'],
  ['link', 'trabalho', '🔗', 'O link', 'O link assinado vale uma hora.', 'links'],
  ['cpu', 'trabalho', '🧮', 'O processador', 'O processador fica perto do teto.', 'cpus'],
  ['copia', 'trabalho', '💾', 'A cópia', 'A cópia da noite começa às duas.', 'copias'],
  ['estouro', 'trabalho', '💥', 'O estouro', 'O processo estourou a memória.', 'estouros'],
  ['impasse', 'trabalho', '🪢', 'O impasse', 'Dois trabalhos se esperam.', 'impasses'],
  ['dominio', 'trabalho', '🏷️', 'O domínio', 'O nome do site não resolve.', 'dominios'],
  ['morta', 'trabalho', '📮', 'A carta morta', 'A carta morta guarda o motivo.', 'mortas'],
  ['ponteiro', 'trabalho', '🕰️', 'Os ponteiros', 'Os relógios diferem.', 'ponteiros'],
  ['eleicao', 'trabalho', '🗳️', 'A eleição', 'O líder antigo saiu.', 'eleicoes'],
  ['freio', 'trabalho', '🛞', 'O freio', 'A fila encheu e desacelera.', 'freios'],
  ['pausa', 'trabalho', '⌛', 'A pausa', 'A coleta parou o processo.', 'pausas'],
  ['deriva', 'trabalho', '📄', 'A deriva', 'A configuração difere do arquivo.', 'derivas'],
  ['descritor', 'trabalho', '📁', 'O descritor', 'O processo abriu arquivos demais.', 'descritores'],
  ['reserva', 'trabalho', '🪫', 'A reserva', 'O servidor usou a reserva.', 'reservas'],
  ['varredura', 'trabalho', '🧵', 'A varredura', 'A tela dispara uma consulta.', 'varreduras'],
  ['porta', 'trabalho', '🚪', 'A porta', 'Nenhum processo escuta.', 'portas'],
  ['inodo', 'trabalho', '📛', 'O inodo', 'Os nomes livres acabaram.', 'inodos'],
  ['saida', 'trabalho', '🛎️', 'A saída', 'O serviço espera as tarefas.', 'saidas'],
  ['manada', 'trabalho', '🐑', 'A manada', 'O cache venceu de uma vez.', 'manadas'],
  ['gotejo', 'trabalho', '💧', 'O gotejo', 'A memória cresce sem parar.', 'gotejos'],
  ['frio', 'trabalho', '🥶', 'O frio', 'A função dorme primeiro.', 'frios'],
  ['cadeado', 'trabalho', '🔐', 'O cadeado', 'O processo tentou ler.', 'cadeados'],
  ['cota', 'trabalho', '📏', 'A cota', 'A cota do usuário fechou.', 'cotas'],
  ['ciclo', 'trabalho', '🔁', 'O ciclo', 'O serviço cai e volta sozinho.', 'ciclos'],
  ['zumbi', 'trabalho', '🧟', 'O zumbi', 'O filho terminou sem colheita.', 'zumbis'],
  ['cisao', 'trabalho', '🪞', 'A cisão', 'Dois nós mandam juntos.', 'cisoes'],
  ['rajada', 'trabalho', '🌊', 'A rajada', 'Os clientes tentam juntos.', 'rajadas'],
  ['brasa', 'trabalho', '🔥', 'A brasa', 'Uma chave recebe as escritas.', 'brasas'],
  ['datagrama', 'trabalho', '📨', 'O datagrama', 'Dois datagramas sumiram.', 'datagramas'],
  ['passe', 'trabalho', '🎫', 'O passe', 'O passe curto venceu.', 'passes'],
  ['carimbo', 'trabalho', '🖊️', 'O carimbo', 'O carimbo da linha mudou.', 'carimbos'],
  ['pilha', 'trabalho', '📚', 'A pilha', 'A pilha cresceu sem fundo.', 'pilhas'],
  ['cano', 'trabalho', '🔧', 'O cano', 'A outra ponta fechou o cano.', 'canos'],
  ['giro', 'trabalho', '🌀', 'O giro', 'O navegador girou de endereço.', 'giros'],
  ['compacta', 'trabalho', '🗜️', 'A compactação', 'O armazenamento reescreveu.', 'compactas'],
  ['diario', 'trabalho', '✒️', 'O diário', 'O diário ocupou quatro gigabytes.', 'diarios'],
  ['vagao', 'trabalho', '🚃', 'O vagão', 'O leitor ficou atrás.', 'vagoes'],
  ['corrida', 'trabalho', '🏎️', 'A corrida', 'Dois pedidos gravaram o saldo.', 'corridas'],
  ['indice', 'trabalho', '📇', 'O índice', 'A busca leu cada linha.', 'indices'],
  ['percentil', 'trabalho', '📐', 'O percentil', 'Noventa e nove cabe no prazo.', 'percentis'],
  ['segredo', 'trabalho', '🕵️', 'O segredo', 'A chave secreta apareceu no log.', 'segredos'],
  ['fantasma', 'trabalho', '👻', 'O fantasma', 'A leitura viu uma linha nova.', 'fantasmas'],
  ['inteiro', 'trabalho', '🔣', 'O inteiro', 'O contador passou do limite.', 'inteiros'],
  ['filtro', 'trabalho', '🧲', 'O filtro', 'O filtro deu um sim falso.', 'filtros'],
  ['ordem', 'trabalho', '🔀', 'A ordem', 'A mensagem quatro chegou antes.', 'ordens'],
  ['prova', 'trabalho', '🧬', 'A prova', 'A prova dos bytes não bateu.', 'provas'],
  ['orfao', 'trabalho', '🪆', 'O órfão', 'A linha filha apontou um pai.', 'orfaos'],
  ['aceno', 'trabalho', '🫡', 'O aceno', 'O segundo sítio nunca confirmou.', 'acenos'],
  ['gasto', 'trabalho', '🪙', 'O gasto', 'Três dias de erro gastaram o mês.', 'gastos'],
  ['instavel', 'trabalho', '🎲', 'O instável', 'O teste passou só na segunda.', 'instaveis'],
  ['duplicado', 'trabalho', '📧', 'O duplicado', 'O e-mail já estava na tabela.', 'duplicados'],
  ['apagao', 'trabalho', '🔌', 'O apagão', 'Desligamos uma máquina.', 'apagoes'],
  ['replay', 'trabalho', '⏪', 'O replay', 'Reexecutamos os dois dias.', 'replays'],
  ['eco', 'trabalho', '🔔', 'O eco', 'O mesmo evento chegou duas vezes e a conta dobrou.', 'ecos'],
  ['leque', 'trabalho', '🪭', 'O leque', 'Um evento acordou quatro.', 'leques'],
  ['saga', 'trabalho', '🧵', 'A saga', 'O terceiro passo nunca terminou.', 'sagas'],
  ['caixa', 'trabalho', '📦', 'A caixa', 'O evento ficou na caixa.', 'caixas'],
  ['apagado', 'trabalho', '🗑️', 'O apagado', 'A linha ficou na tabela.', 'apagados'],
  ['espera', 'trabalho', '⏲️', 'A espera', 'A chamada parou depois.', 'esperas'],
  ['cursor', 'trabalho', '🔖', 'O cursor', 'A página seguinte perdeu o lugar.', 'cursores'],
  ['fila', 'trabalho', '📥', 'A fila', 'A fila passou de mil mensagens.', 'filas'],
  ['disjuntor', 'trabalho', '🛑', 'O disjuntor', 'Cinco falhas abriram o disjuntor.', 'disjuntores'],
  ['aluguel', 'trabalho', '🔑', 'O aluguel', 'O prazo de posse acabou.', 'alugueis'],
  ['pulso', 'trabalho', '💓', 'O pulso', 'O nó deixou de enviar.', 'pulsos'],
  ['piscina', 'trabalho', '🏊', 'A piscina', 'A piscina ficou sem vaga.', 'piscinas'],
  ['balde', 'trabalho', '🪣', 'O balde', 'O balde de fichas esvaziou.', 'baldes'],
  ['cerca', 'trabalho', '🚧', 'A cerca', 'Um número invalidou a escrita.', 'cercas'],
  ['tremor', 'trabalho', '🫨', 'O tremor', 'Cada nova tentativa espera.', 'tremores'],
  ['portaria', 'trabalho', '🧱', 'A portaria', 'A portaria recusou a entrada.', 'portarias'],
  ['cola', 'trabalho', '🧷', 'A cola', 'O cliente voltou à máquina.', 'colas'],
  ['anteparo', 'trabalho', '🛟', 'O anteparo', 'Uma falha fica presa.', 'anteparos'],
  ['descarte', 'trabalho', '📤', 'O descarte', 'O serviço descarta o pedido.', 'descartes'],
  ['cronometro', 'trabalho', '⏰', 'O cronômetro', 'A chamada acaba no tempo.', 'cronometros'],
  ['amostra', 'trabalho', '🧫', 'A amostra', 'Fica guardada uma linha.', 'amostras'],
  ['nicho', 'trabalho', '🪺', 'O nicho', 'A chave ficou no nicho três.', 'nichos'],
  ['lacre', 'trabalho', '🔒', 'O lacre', 'O lacre do pacote mudou.', 'lacres'],
  ['semaforo', 'trabalho', '🚦', 'O semáforo', 'As vagas simultâneas acabaram.', 'semaforos'],
  ['barreira', 'trabalho', '🏁', 'A barreira', 'Ninguém segue enquanto faltam.', 'barreiras'],
  ['trinco', 'trabalho', '🪝', 'O trinco', 'O grupo sai na contagem zero.', 'trincos'],
  ['recuo', 'trabalho', '⏬', 'O recuo', 'Cada falha dobra o intervalo.', 'recuos'],
  ['vigia', 'trabalho', '🐕', 'O vigia', 'Um processo encerra a tarefa.', 'vigias'],
  ['ampulheta', 'trabalho', '🏺', 'A ampulheta', 'O passe de acesso vence.', 'ampulhetas'],
  ['carona', 'trabalho', '🚕', 'A carona', 'A confirmação viaja com o pacote.', 'caronas'],
  ['veneno', 'trabalho', '☠️', 'O veneno', 'A mensagem ruim sai da fila.', 'venenos'],
  ['farol', 'trabalho', '🗼', 'O farol', 'O sinal curto mostra o serviço.', 'farois'],
  ['ancora', 'trabalho', '⚓', 'A âncora', 'Um ponto fixo guarda o estado.', 'ancoras'],
  ['malha', 'trabalho', '🕸️', 'A malha', 'Cada serviço fala com o vizinho.', 'malhas'],
  ['fenda', 'trabalho', '🪓', 'A fenda', 'O tráfego se divide.', 'fendas'],
  ['cofre', 'trabalho', '🏦', 'O cofre', 'A chave mora fora do app.', 'cofres'],
  ['audiencia', 'trabalho', '👂', 'A audiência', 'O passe vale para o serviço.', 'audiencias'],
  ['revogacao', 'trabalho', '🚫', 'A revogação', 'O passe antigo deixa de valer.', 'revogacoes'],
  ['quorum', 'trabalho', '🗳️', 'O quórum', 'A escrita entra com a maioria.', 'quoruns'],
  ['maioria', 'trabalho', '✋', 'A maioria', 'Mais da metade confirma.', 'maiorias'],
  ['arbitro', 'trabalho', '⚖️', 'O árbitro', 'O nó extra desempata.', 'arbitros'],
  ['lider', 'trabalho', '🧭', 'O líder', 'Um nó conduz o mandato.', 'lideres'],
  ['mandato', 'trabalho', '📜', 'O mandato', 'Cada eleição sobe o número.', 'mandatos'],
  ['seguidor', 'trabalho', '👣', 'O seguidor', 'O nó copia o registro.', 'seguidores'],
  ['orquestrador', 'trabalho', '🎼', 'O orquestrador', 'O coordenador dispara.', 'orquestradores'],
  ['coreografia', 'trabalho', '💃', 'A coreografia', 'O vizinho escolhe a etapa.', 'coreografias'],
  ['compensacao', 'trabalho', '↩️', 'A compensação', 'A falha desfaz a etapa anterior.', 'compensacoes'],
  ['primario', 'trabalho', '🥇', 'O primário', 'Só um nó aceita a escrita nova.', 'primarios'],
  ['espelho', 'trabalho', '🪟', 'O espelho', 'A cópia acompanha a escrita.', 'espelhos'],
  ['ascensao', 'trabalho', '📈', 'A ascensão', 'A cópia vira dona.', 'ascensoes'],
  ['travessia', 'trabalho', '🌉', 'A travessia', 'O cache confirma a escrita.', 'travessias'],
  ['retaguarda', 'trabalho', '🗄️', 'A retaguarda', 'A página suja espera no cache.', 'retaguardas'],
  ['contorno', 'trabalho', '➰', 'O contorno', 'A escrita grande segue direto.', 'contornos'],
  ['rumor', 'trabalho', '🗞️', 'O rumor', 'Os nós espalham o estado.', 'rumores'],
  ['reparo', 'trabalho', '🩹', 'O reparo', 'A leitura conserta a cópia.', 'reparos'],
  ['deixa', 'trabalho', '🧳', 'A deixa', 'O vizinho guarda a escrita.', 'deixas'],
  ['floco', 'trabalho', '❄️', 'O floco', 'O id nasce do tempo do nó.', 'flocos'],
  ['epoca', 'trabalho', '🗓️', 'A época', 'A geração sobe na formação.', 'epocas'],
  ['vetor', 'trabalho', '🧮', 'O vetor', 'O nó anota a própria visão.', 'vetores'],
  ['sujeira', 'trabalho', '🫧', 'A sujeira', 'A leitura pega um valor aberto.', 'sujeiras'],
  ['instantaneo', 'trabalho', '📸', 'O instantâneo', 'A consulta olha o banco.', 'instantaneos'],
  ['serial', 'trabalho', '🔢', 'O serial', 'O resultado cabe numa ordem só.', 'seriais'],
  ['fome', 'trabalho', '🍖', 'A fome', 'A tarefa espera a vez.', 'fomes'],
  ['inversao', 'trabalho', '🔃', 'A inversão', 'A tarefa baixa segura o recurso.', 'inversoes'],
  ['idade', 'trabalho', '🧓', 'A idade', 'A espera longa sobe a prioridade.', 'idades'],
  ['sidecar', 'trabalho', '🛵', 'O sidecar', 'O ajudante mora ao lado.', 'sidecars'],
  ['embaixador', 'trabalho', '🌐', 'O embaixador', 'O proxy representa quem chama.', 'embaixadores'],
  ['adaptador', 'trabalho', '🔌', 'O adaptador', 'A tradução liga o cliente antigo.', 'adaptadores'],
  ['bizantino', 'trabalho', '🤥', 'O bizantino', 'Um nó mente na rede.', 'bizantinos'],
  ['particao', 'trabalho', '🧱', 'A partição', 'A rede se divide em lados.', 'particoes'],
  ['general', 'trabalho', '⚔️', 'O general', 'Dois exércitos avançam juntos.', 'generais'],
  ['wal', 'trabalho', '🪵', 'O wal', 'A escrita entra no log antes.', 'wals'],
  ['lsn', 'trabalho', '🧷', 'O lsn', 'O número do registro só avança.', 'lsns'],
  ['checkpoint', 'trabalho', '📍', 'O checkpoint', 'O marco grava um ponto seguro.', 'checkpoints'],
  ['nonce', 'trabalho', '🎲', 'O nonce', 'O número entra uma vez só.', 'nonces'],
  ['hmac', 'trabalho', '🏷️', 'O hmac', 'O selo confere a mensagem.', 'hmacs'],
  ['envelope', 'trabalho', '✉️', 'O envelope', 'A chave viaja dentro de outra.', 'envelopes'],
  ['lease', 'trabalho', '🔑', 'O lease', 'A trava alugada vale um tempo.', 'leases'],
  ['renovacao', 'trabalho', '🔄', 'A renovação', 'A trava ganha tempo antes de cair.', 'renovacoes'],
  ['vencimento', 'trabalho', '⌛', 'O vencimento', 'A trava solta quando o tempo acaba.', 'vencimentos'],
  ['outbox', 'trabalho', '📤', 'O outbox', 'A mensagem espera fora.', 'outboxes'],
  ['inbox', 'trabalho', '📥', 'O inbox', 'A mensagem entra e espera a sua vez.', 'inboxes'],
  ['relay', 'trabalho', '📮', 'O relay', 'O posto repassa a mensagem adiante.', 'relays'],
  ['offset', 'trabalho', '📏', 'O offset', 'O leitor marca até onde já leu.', 'offsets'],
  ['lag', 'trabalho', '🐢', 'O lag', 'O leitor fica atrás do escritor.', 'lags'],
  ['ack', 'trabalho', '✅', 'O ack', 'O leitor confirma o trecho lido.', 'acks'],
  ['snapshot', 'trabalho', '📷', 'O snapshot', 'A foto guarda aquele instante.', 'snapshots'],
  ['restore', 'trabalho', '↩️', 'O restore', 'A foto devolve o instante.', 'restores'],
  ['promote', 'trabalho', '🚀', 'O promote', 'A cópia vira o banco principal.', 'promotes'],
  ['bloom', 'trabalho', '🌸', 'O bloom', 'O filtro diz que a chave está.', 'blooms'],
  ['cuco', 'trabalho', '🪺', 'O cuco', 'A chave muda de ninho.', 'cucos'],
  ['esboco', 'trabalho', '✏️', 'O esboço', 'O desenho guarda a conta.', 'esbocos'],
  ['merkle', 'trabalho', '🌳', 'O merkle', 'A árvore resume as folhas.', 'merkles'],
  ['radix', 'trabalho', '✂️', 'O radix', 'A árvore corta o prefixo comum.', 'radixes'],
  ['trie', 'trabalho', '🔤', 'O trie', 'A árvore guarda a palavra.', 'tries'],
  ['gossip', 'trabalho', '📣', 'O gossip', 'Os nós trocam o estado entre si.', 'gossips'],
  ['phi', 'trabalho', '📉', 'O phi', 'A suspeita sobe com a pausa.', 'phis'],
  ['accrual', 'trabalho', '🧺', 'O accrual', 'A falha soma aos poucos.', 'accruals'],
  ['hint', 'trabalho', '🔖', 'O hint', 'A dica aponta a linha.', 'hints'],
  ['vacuum', 'trabalho', '🧹', 'O vacuum', 'A limpeza devolve o espaço.', 'vacuums'],
  ['freeze', 'trabalho', '🧊', 'O freeze', 'A linha antiga fica para leitura.', 'freezes'],
  ['bitmap', 'trabalho', '🗺️', 'O bitmap', 'O mapa marca o bit da chave.', 'bitmaps'],
  ['roaring', 'trabalho', '🦁', 'O roaring', 'Os bits iguais viram um intervalo.', 'roarings'],
  ['hyper', 'trabalho', '🧮', 'O hyper', 'A conta estima itens distintos.', 'hypers']
];

export const TREINOS = BRUTOS.map((t, ordem) => ({
  id: t[0],
  categoria: t[1],
  emoji: t[2],
  titulo: t[3],
  sub: t[4],
  stat: t[5] || '',
  busca: t[6] || '',
  ordem
}));

export function normalizarBusca(s) {
  return String(s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

export function montarChaveBusca(treino) {
  const tituloCat = TITULO_POR_CATEGORIA.get(treino?.categoria) || '';
  return normalizarBusca(`${treino?.titulo || ''} ${treino?.sub || ''} ${treino?.busca || ''} ${treino?.categoria || ''} ${tituloCat}`);
}

for (const treino of TREINOS) treino.chaveBusca = montarChaveBusca(treino);

export function filtrarTreinos(treinos, { categoria, busca } = {}) {
  const q = normalizarBusca(busca);
  const lista = Array.isArray(treinos) ? treinos : [];
  if (!q && (!categoria || categoria === 'todos')) return lista.slice();
  const tituloDe = id => TITULO_POR_CATEGORIA.get(id) || '';
  return lista.filter(t => {
    if (categoria && categoria !== 'todos' && t.categoria !== categoria) return false;
    if (!q) return true;
    const texto = typeof t.chaveBusca === 'string'
      ? t.chaveBusca
      : normalizarBusca(`${t.titulo} ${t.sub} ${t.busca || ''} ${t.categoria} ${tituloDe(t.categoria)}`);
    return texto.includes(q);
  });
}

const PARADAS_CATALOGO = new Set([
  'com', 'para', 'que', 'uma', 'uns', 'dos', 'das', 'por', 'the', 'and',
  'de', 'do', 'da', 'em', 'no', 'na', 'ou', 'ao', 'seu', 'sua', 'voce',
  'sem', 'num', 'numa', 'mais', 'menos'
]);
export const LIMIAR_PARECIDOS = 0.5;

export function tokensDoTreino(treino) {
  return normalizarBusca(`${treino?.titulo || ''} ${treino?.sub || ''}`)
    .split(/[^a-z0-9]+/)
    .filter(p => p.length >= 4 && !PARADAS_CATALOGO.has(p));
}

export function auditarCatalogo(treinos, limiar = LIMIAR_PARECIDOS) {
  const lista = Array.isArray(treinos) ? treinos.filter(t => t && typeof t === 'object') : [];
  const ids = new Map();
  const titulos = new Map();
  for (const t of lista) {
    const id = String(t.id ?? '');
    ids.set(id, (ids.get(id) || 0) + 1);
    const titulo = normalizarBusca(t.titulo);
    titulos.set(titulo, (titulos.get(titulo) || 0) + 1);
  }
  const idsRepetidos = [...ids].filter(([, n]) => n > 1).map(([id]) => id);
  const titulosRepetidos = [...titulos].filter(([, n]) => n > 1).map(([titulo]) => titulo);
  const corte = Number(limiar);
  const minimo = Number.isFinite(corte) ? corte : LIMIAR_PARECIDOS;
  const bolsas = lista.map(t => {
    const toks = tokensDoTreino(t);
    return { id: String(t.id ?? ''), set: new Set(toks), n: toks.length };
  });
  const parecidos = [];
  for (let i = 0; i < bolsas.length; i++) {
    if (bolsas[i].n < 3) continue;
    for (let j = i + 1; j < bolsas.length; j++) {
      if (bolsas[j].n < 3) continue;
      let comum = 0;
      for (const tok of bolsas[j].set) if (bolsas[i].set.has(tok)) comum++;
      const uniao = bolsas[i].set.size + bolsas[j].set.size - comum;
      if (!uniao) continue;
      const nota = comum / uniao;
      if (nota >= minimo) {
        parecidos.push({
          a: bolsas[i].id,
          b: bolsas[j].id,
          nota: Math.round(nota * 100) / 100
        });
      }
    }
  }
  return { idsRepetidos, titulosRepetidos, parecidos };
}

export function textoDaEstreia(treinos, stats) {
  const lista = (Array.isArray(treinos) ? treinos : []).filter(t => t && t.stat);
  const faltam = lista.filter(t => (Number(stats?.[t.stat]) || 0) <= 0);
  const proximo = faltam[0] || null;
  if (!faltam.length) {
    return { faltam: 0, treino: null, texto: 'Todos os treinos com contagem já tiveram prática.' };
  }
  const conta = faltam.length === 1 ? '1 treino ainda sem prática.' : `${faltam.length} treinos ainda sem prática.`;
  const nome = proximo ? ` O próximo é ${proximo.titulo}.` : '';
  return { faltam: faltam.length, treino: proximo, texto: conta + nome };
}

export function textoDoGrupo(treinos, stats) {
  const lista = (Array.isArray(treinos) ? treinos : []).filter(t => t && t.stat && t.categoria);
  const por = new Map();
  for (const t of lista) {
    const atual = por.get(t.categoria) || { n: 0, feitos: 0 };
    atual.n += 1;
    if ((Number(stats?.[t.stat]) || 0) > 0) atual.feitos += 1;
    por.set(t.categoria, atual);
  }
  const grupos = CATEGORIAS
    .map(c => ({ id: c.id, titulo: c.titulo, ...(por.get(c.id) || { n: 0, feitos: 0 }) }))
    .filter(g => g.n > 0);
  if (!grupos.length) {
    return { id: '', titulo: '', feitos: 0, n: 0, texto: 'Nenhum grupo com treino contado.' };
  }
  const feitos = grupos.reduce((s, g) => s + g.feitos, 0);
  if (!feitos) {
    return { id: '', titulo: '', feitos: 0, n: 0, texto: 'Nenhum grupo tem prática ainda.' };
  }
  const ordenados = [...grupos].sort((a, b) => {
    const ra = a.feitos / a.n;
    const rb = b.feitos / b.n;
    if (ra !== rb) return ra - rb;
    return a.titulo.localeCompare(b.titulo, 'pt');
  });
  const pior = ordenados[0];
  const igual = grupos.every(g => g.feitos * pior.n === pior.feitos * g.n);
  if (igual) {
    const texto = pior.feitos === pior.n
      ? 'Todos os grupos já tiveram prática em cada treino.'
      : 'Os grupos estão no mesmo ritmo.';
    return { id: '', titulo: '', feitos: pior.feitos, n: pior.n, texto };
  }
  const parados = pior.n - pior.feitos;
  const conta = parados === 1 ? '1 treino parado' : `${parados} treinos parados`;
  return {
    id: pior.id,
    titulo: pior.titulo,
    feitos: pior.feitos,
    n: pior.n,
    texto: `${pior.titulo} é o grupo com menos prática. ${conta}.`
  };
}

export function textoDaEstrela(treinos, estrelas, stats) {
  const ids = (Array.isArray(estrelas) ? estrelas : []).filter(id => typeof id === 'string');
  const porId = new Map((Array.isArray(treinos) ? treinos : []).filter(t => t && t.id).map(t => [t.id, t]));
  const lista = ids.map(id => porId.get(id)).filter(Boolean);
  if (!lista.length) {
    return { n: 0, faltam: 0, treino: null, texto: 'Nenhum favorito marcado ainda.' };
  }
  const parados = lista.filter(t => t.stat && (Number(stats?.[t.stat]) || 0) <= 0);
  if (!parados.length) {
    return { n: lista.length, faltam: 0, treino: null, texto: 'Todos os favoritos já tiveram prática.' };
  }
  const conta = parados.length === 1
    ? '1 favorito ainda sem prática.'
    : `${parados.length} favoritos ainda sem prática.`;
  return {
    n: lista.length,
    faltam: parados.length,
    treino: parados[0],
    texto: `${conta} O próximo é ${parados[0].titulo}.`
  };
}

export function treinoRecomendado(treinos, { nivel, stats, padroes, deslizes } = {}) {
  const lista = Array.isArray(treinos) ? treinos : [];
  const achar = id => lista.find(t => t.id === id) || null;
  if (!nivel && achar('nivel')) {
    return { treino: achar('nivel'), porque: 'O teste deixa os treinos no seu ponto.' };
  }
  const sinais = Array.isArray(padroes) ? padroes : [];
  const fraco = Number(deslizes) > 0 || sinais.some(p => Number(p?.n) >= 2);
  if (fraco) {
    const plano = planoDaSemana({ deslizes, padroes: sinais });
    for (const item of plano) {
      if (!item || item.id === 'livre') continue;
      const treino = achar(item.id);
      if (treino) return { treino, porque: item.porque };
    }
  }
  const comStat = lista.filter(t => t.stat);
  if (comStat.length) {
    const ordenados = [...comStat].sort((a, b) => {
      const na = Number(stats?.[a.stat]) || 0;
      const nb = Number(stats?.[b.stat]) || 0;
      if (na !== nb) return na - nb;
      return a.ordem - b.ordem;
    });
    const treino = ordenados[0];
    const n = Number(stats?.[treino.stat]) || 0;
    return {
      treino,
      porque: n === 0 ? 'Você ainda não fez este treino.' : 'É o treino com menos prática no histórico.'
    };
  }
  if (!lista.length) return null;
  return { treino: lista[0], porque: 'Um treino curto para continuar.' };
}

export function ordenarTreinos(treinos, { modo, stats } = {}) {
  const lista = Array.isArray(treinos) ? [...treinos] : [];
  if (modo !== 'menos') return lista;
  const pratica = t => (t && t.stat ? (Number(stats?.[t.stat]) || 0) : 0);
  return lista.sort((a, b) => {
    const na = pratica(a);
    const nb = pratica(b);
    if (na !== nb) return na - nb;
    return (a.ordem ?? 0) - (b.ordem ?? 0);
  });
}

export function filtrarEstrelas(treinos, estrelas, ativo) {
  const lista = Array.isArray(treinos) ? treinos : [];
  if (!ativo) return lista;
  const marcas = new Set(Array.isArray(estrelas) ? estrelas : []);
  return lista.filter(t => t && marcas.has(t.id));
}

export function treinoContinuar(treinos, id) {
  if (!id) return null;
  return (Array.isArray(treinos) ? treinos : []).find(t => t.id === id) || null;
}

export function textoDoContinuar(treino) {
  if (!treino) return 'Nenhum treino aberto ainda.';
  return `Continuar: ${treino.titulo}.`;
}

const TETO_JS = 2170000;

export function auditarPacote({ html, css, sw, arquivos } = {}) {
  const falhas = [];
  const pagina = String(html || '');
  if (!pagina.includes('lang="pt-BR"')) falhas.push('lang');
  if (!pagina.includes('name="viewport"')) falhas.push('viewport');
  if (!pagina.includes('rel="manifest"')) falhas.push('manifest');
  if (!pagina.includes('type="module"')) falhas.push('module');
  if (pagina.includes('document.write')) falhas.push('document.write');
  for (const img of pagina.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=/.test(img[0])) falhas.push('img sem alt');
  }
  if (!String(css || '').includes(':focus-visible')) falhas.push('focus-visible');
  if (!String(sw || '').includes('gringolingo-v')) falhas.push('cache');
  let bytes = 0;
  for (const arq of (Array.isArray(arquivos) ? arquivos : [])) {
    const nome = String(arq?.nome || '');
    if (nome.includes('/vendor/') || nome.endsWith('dicionario-dados.js')) continue;
    bytes += Number(arq?.bytes) || 0;
  }
  if (bytes <= 100000) falhas.push('medicao');
  if (bytes > TETO_JS) falhas.push('tamanho');
  return { falhas, bytes };
}
