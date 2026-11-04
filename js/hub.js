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
  ['modelo', 'trabalho', '🤖', 'Para leigos', 'Prompt, alucinação e RAG, em linguagem simples.', 'modelos'],
  ['furo', 'trabalho', '🛡️', 'O furo', 'CVE, patch e upgrade de dependência.', 'furos'],
  ['colega', 'trabalho', '🤝', 'Outra área', 'Peça e ofereça ajuda a design, QA e produto.', 'colegas'],
  ['palestra', 'trabalho', '🎤', 'Palestra', 'Abertura, troca de slide e perguntas no fim.', 'palestras'],
  ['duvida', 'trabalho', '🙋', 'Sem a resposta', 'Ganhe tempo quando a pergunta pega de surpresa.', 'duvidas'],
  ['sinal', 'trabalho', '📶', 'Sinal ruim', 'A voz corta, o vídeo trava, a chamada cai.', 'sinais'],
  ['falha', 'trabalho', '🛠️', 'Por que falhou', 'O que quebrou e a causa: deploy, CI e permissão.', 'falhas'],
  ['mentoria', 'trabalho', '🌱', 'Mentoria', 'Uma dica e a ideia por trás, para um júnior.', 'mentorias'],
  ['requisito', 'trabalho', '🗒️', 'Requisitos', 'Pergunta de descoberta e a confirmação do que entendeu.', 'requisitos'],
  ['metrica', 'trabalho', '📈', 'Métricas', 'Números, porcentagens e crescimento.', 'metricas'],
  ['aprendizado', 'trabalho', '📖', 'Um erro', 'O erro, o efeito e a lição.', 'aprendizados'],
  ['linha', 'trabalho', '💻', 'Linha a linha', 'Explique o loop, o callback e o null check.', 'linhas'],
  ['slack', 'trabalho', '💬', 'Slack', 'Peça review ou avise um atraso, em poucas palavras.', 'slacks'],
  ['gestor', 'trabalho', '🗣️', 'Feedback 1:1', 'Ouça um ponto do gestor e devolva um pedido.', 'gestores'],
  ['estimativa', 'trabalho', '⏳', 'Estimativa', 'Diga o prazo e o que ainda não está certo.', 'estimativas'],
  ['consenso', 'trabalho', '⚖️', 'Consenso', 'Discorde e proponha um meio-termo.', 'consensos'],
  ['retro', 'trabalho', '🔄', 'Retrospectiva', 'O que foi bem, o que melhorar e a ação.', 'retros'],
  ['chegada', 'trabalho', '🧭', 'Onboarding', 'Explique o projeto, o fluxo e a primeira tarefa.', 'chegadas'],
  ['ligacao', 'trabalho', '🔗', 'Conectores', 'However, on the other hand e that said.', 'ligacoes'],
  ['decisao', 'trabalho', '🏗️', 'Decisão técnica', 'Explique a escolha e a troca, com we went with.', 'decisoes'],
  ['par', 'trabalho', '👥', 'Pair', 'Narre o que está fazendo e peça ajuda.', 'pares'],
  ['plantao', 'trabalho', '🚨', 'Plantão', 'Status, desculpa e o próximo passo.', 'incidentes'],
  ['demo', 'trabalho', '🎬', 'Demo de produto', 'Um minuto para apresentar e duas respostas da plateia.', 'demos'],
  ['prazo', 'trabalho', '📌', 'Prazo e escopo', 'Sugira um corte e peça outra data, com educação.', 'negociacoes'],
  ['relato', 'trabalho', '🐛', 'Relatar um bug', 'Três falas: como repetir, a causa e a correção.', 'relatos'],
  ['cortesia', 'trabalho', '🙏', 'Review com educação', 'Dê um comentário e receba outro sem ser seco.', 'cortesias'],
  ['aquecer', 'trabalho', '☕', 'Antes da reunião', 'Fim de semana, clima e viagem, em duas falas.', 'aquecimentos'],
  ['claro', 'trabalho', '🔎', 'Esclarecer', 'Peça para repetir e confirme o que você entendeu.', 'esclarecimentos'],
  ['opiniao', 'trabalho', '💬', 'Opinião', 'Dê um motivo e concorde ou discorde com educação.', 'opinioes'],
  ['tecnico', 'trabalho', '💻', 'Inglês de trabalho', 'Standup, bug, code review, entrevista e demo.', 'tecnicos'],
  ['idioma', 'trabalho', '🤝', 'Idioms de reunião', 'Touch base, circle back e o papo da call.', 'idiomas'],
  ['frasal', 'trabalho', '🧩', 'Phrasal verbs', 'Look for, figure out e combinações do trabalho.', 'verbosFala'],
  ['sistema', 'entrevista', '🏗️', 'Sistema', 'Pedido, escala e gargalo, em duas falas.', 'sistemas'],
  ['codigo', 'entrevista', '💻', 'Em voz alta', 'Pense alto enquanto resolve o problema.', 'codigos'],
  ['simulado', 'entrevista', '🎯', 'Simulado', 'Seis falas de treinos que você já tem. Uma nota no fim.', 'simulados'],
  ['salario', 'entrevista', '💰', 'Salário', 'Faixa, plano de saúde e ações.', 'salarios'],
  ['projeto', 'entrevista', '🧰', 'Portfólio', 'Problema, stack e resultado.', 'projetos'],
  ['final', 'entrevista', '❓', 'Pergunta final', 'Pergunte ao entrevistador sobre o time e os 90 dias.', 'finais'],
  ['star', 'entrevista', '⭐', 'Entrevista STAR', 'Quatro falas: situação, tarefa, ação e resultado.', 'stars'],
  ['remoto', 'entrevista', '🎤', 'Entrevista longa', 'Seis falas para uma vaga remota full stack.', 'entrevistas'],
  ['conto', 'entrevista', '📖', 'Contar no passado', 'Uma história curta, em duas falas.', 'contos'],
  ['livre', 'entrevista', '🙋', 'Falar de você', 'Um minuto sobre você, um hobby ou o seu trabalho.', 'livres'],
  ['futuro', 'entrevista', '🚀', 'Daqui a cinco anos', 'A meta e o caminho da carreira, em duas falas.', 'futuros'],
  ['rotina', 'cotidiano', '🏠', 'Em casa', 'Manhã, jantar e a rotina com a família.', 'rotinas'],
  ['papo', 'cotidiano', '💬', 'Conversa livre', 'Três assuntos do dia, com pergunta de acompanhamento.', 'papos'],
  ['socorro', 'cotidiano', '🩺', 'No exterior', 'Farmácia, médico e emergência, em duas falas.', 'socorros'],
  ['passeio', 'cotidiano', '🚶', 'Só áudio', 'A pergunta é lida em voz alta. Você responde andando.', 'passeios'],
  ['social', 'cotidiano', '🍻', 'Happy hour', 'Um brinde, o violão e o Brasil.', 'sociais'],
  ['viagem', 'cotidiano', '🛫', 'Viagem a trabalho', 'Conexão, imigração e táxi.', 'viagens'],
  ['atendimento', 'cotidiano', '📞', 'Atendimento', 'Banco, entrega e hotel, no telefone.', 'atendimentos'],
  ['cena', 'cotidiano', '👀', 'Descrever a cena', 'Diga o que acontece e um detalhe.', 'cenasFala'],
  ['pergunta', 'cotidiano', '❓', 'Você pergunta', 'Café, loja, aeroporto e reunião. A fala é sua pergunta.', 'perguntas'],
  ['sotaque', 'pronuncia', '🎧', 'Sotaques', 'Americano, britânico e indiano, na voz do aparelho.', 'sotaques'],
  ['enfase', 'pronuncia', '🎵', 'Ênfase', 'Marque a palavra forte, ou se a voz sobe ou desce.', 'enfases'],
  ['termo', 'pronuncia', '🔤', 'Termos técnicos', 'O som de cache, queue, SQL, GUI, height e width.', 'termos'],
  ['reducao', 'pronuncia', '⏩', 'Fala rápida', 'Gonna, wanna e palavras que se juntam. A voz é a do aparelho.', 'reduzidas'],
  ['numero', 'pronuncia', '🔢', 'Números, datas e preços', 'Ouça e escolha o valor. A voz é a do aparelho.', 'numeros'],
  ['desafio', 'revisao', '📅', 'Desafio do dia', 'A sequência de dias aumenta as frases.', 'desafios'],
  ['mistura', 'revisao', '⏱️', 'Três minutos', 'Frases dos treinos, num relógio de 3 minutos.', 'misturas'],
  ['deslize', 'revisao', '🔁', 'Deslizes de fala', 'Frases que escaparam voltam na data.', 'revisoesFala'],
  ['dia', 'revisao', '☀️', 'Pergunta do dia', 'Uma pergunta e outra em seguida. Vale a sequência.', 'diasPergunta'],
  ['nivel', 'revisao', '🎯', 'Teste de nível', 'Oito perguntas, de A1 a B2. Nada fica trancado.', ''],
  ['resumo', 'revisao', '📅', 'Resumo da semana', 'A nota desta semana e uma sugestão para a próxima.', ''],
  ['rapido', 'revisao', '⚡', 'Pensa em inglês', 'Quatro respostas curtas. Vinte segundos cada.', 'rapidos'],
  ['cultura', 'cotidiano', '🎬', 'Esporte, filme e série', 'Jogo, cinema e a série da semana, em duas falas.', 'culturas'],
  ['aumento', 'trabalho', '🏆', 'O aumento', 'Peça aumento, fale da promoção e de uma conquista.', 'aumentos'],
  ['rota', 'trabalho', '🔌', 'A API', 'Endpoint, status e autenticação, em duas falas.', 'rotas'],
  ['vivo', 'trabalho', '🔥', 'Ao vivo', 'Status na hora, pedido de ajuda e a lição do incidente.', 'vivos'],
  ['produto', 'trabalho', '📦', 'Com o produto', 'Negocie o prazo e o que fica nesta entrega.', 'produtos'],
  ['fecho', 'entrevista', '🙋', 'Suas perguntas', 'Plantão, crescimento e por que a vaga abriu.', 'fechos'],
  ['espaco', 'revisao', '🔂', 'Mais erradas', 'As frases que você mais errou, na data da revisão.', 'espacos'],
  ['mapa', 'trabalho', '🗺️', 'O mapa', 'Arquitetura e fluxo, para quem chegou agora.', 'mapas'],
  ['duro', 'trabalho', '🗣️', 'O ponto difícil', 'Dar e receber um feedback duro no 1:1.', 'duros'],
  ['proposta', 'trabalho', '📐', 'A proposta', 'Apresente uma RFC e defenda a troca.', 'propostas'],
  ['semana', 'revisao', '📊', 'Semana falada', 'Minutos de fala e treinos por grupo, nesta semana.', ''],
  ['narrar', 'trabalho', '🎙️', 'O par narrado', 'Pense a próxima linha em voz alta, com o par.', 'narras'],
  ['banco', 'entrevista', '🗄️', 'Banco ou cache', 'Explique a guarda dos dados numa entrevista.', 'bancos'],
  ['recusa', 'trabalho', '🙅', 'O não educado', 'Recuse o pedido e ofereça outro caminho.', 'recusas'],
  ['sprint', 'trabalho', '🖥️', 'Demo da sprint', 'Mostre o que saiu e responda uma pergunta fora do roteiro.', 'sprints'],
  ['seguro', 'trabalho', '🔐', 'A decisão segura', 'Furo, patch e por quanto tempo um dado fica guardado.', 'seguros'],
  ['meetup', 'cotidiano', '🎫', 'No meetup', 'Puxe assunto num evento de tecnologia.', 'meetups'],
  ['completa', 'entrevista', '🎓', 'Entrevista completa', 'Cinco treinos em sequência e uma nota no fim.', 'completas'],
  ['rodada', 'trabalho', '📝', 'A mesa da retro', 'Fato, ajuste e quem fica com a ação.', 'rodadas'],
  ['migra', 'trabalho', '🚚', 'A migração', 'Banco ou biblioteca, e o risco da troca.', 'migras'],
  ['estreia', 'cotidiano', '👋', 'Primeiro dia', 'Um oi informal no time novo.', 'estreias'],
  ['foco', 'entrevista', '🧩', 'Entrevista por foco', 'Escolha frontend, backend ou IA e veja as notas.', 'focos'],
  ['poker', 'trabalho', '🃏', 'A carta', 'Vote a estimativa e diga o motivo.', 'pokers'],
  ['leigo', 'trabalho', '🧮', 'A conta da IA', 'Custo, busca nos docs e o que a pessoa ainda lê.', 'leigos'],
  ['recruta', 'entrevista', '📞', 'A ligação', 'Pretensão, fuso e quando você pode começar.', 'recrutas'],
  ['culpa', 'trabalho', '🙏', 'A desculpa', 'Assuma o erro e diga o próximo passo.', 'culpas'],
  ['raio', 'trabalho', '🔦', 'O relâmpago', 'Cinco minutos sobre um projeto pessoal.', 'raios'],
  ['oferta', 'entrevista', '💻', 'A oferta', 'Equipamento, verba de estudo e a data de início.', 'ofertas'],
  ['sombra', 'revisao', '🗣️', 'Sombra', 'Ouça a voz do aparelho, repita e compare.', 'sombra'],
  ['pedido', 'trabalho', '🙋', 'Não entendi', 'Peça o sotaque, a palavra que escapou e leia o requisito de volta.', 'pedidos'],
  ['cobertura', 'trabalho', '🧪', 'A cobertura', 'Diga como os testes e a cobertura protegem o merge.', 'coberturas'],
  ['loom', 'trabalho', '🎥', 'O vídeo', 'Um check-in curto para o time assistir depois.', 'looms'],
  ['caderno', 'revisao', '📒', 'Meu vocabulário', 'Palavras que escaparam nas falas.', 'cadernos'],
  ['grafico', 'trabalho', '📉', 'O gráfico', 'Alta, queda e a causa, em cima do gráfico.', 'graficos'],
  ['handoff', 'trabalho', '🕒', 'O handoff', 'Peça o que ficou aberto e deixe o contexto para o outro fuso.', 'handoffs'],
  ['elevador', 'entrevista', '🚪', 'O elevador', 'Trinta segundos para um diretor, do cargo ao pedido.', 'elevadores'],
  ['junta', 'revisao', '🗂️', 'A semana junta', 'Vocabulário, frases mais erradas e a meta de minutos.', 'juntas'],
  ['pista', 'trabalho', '🏁', 'O bug raro', 'Sintoma e prova de um bug que só aparece às vezes.', 'pistas'],
  ['calma', 'trabalho', '🐢', 'Com calma', 'Explique um conceito devagar, um passo de cada vez.', 'calmas'],
  ['folga', 'cotidiano', '🏖️', 'A folga', 'Férias, horário e o limite da noite.', 'folgas'],
  ['abertas', 'entrevista', '💭', 'Perguntas abertas', 'Cinco perguntas abertas. Cada resposta conta palavras, tempo e preenchimento.', 'abertas'],
  ['respeito', 'trabalho', '🏛️', 'Com respeito', 'Discorde de uma arquitetura e ofereça outro caminho.', 'respeitos'],
  ['debito', 'trabalho', '🧱', 'A dívida', 'Explique a dívida técnica e peça tempo para refatorar.', 'debitos'],
  ['indicacao', 'entrevista', '✉️', 'A indicação', 'Peça a um ex-colega para ser a sua referência.', 'indicacoes'],
  ['ux', 'trabalho', '🎨', 'O contraste', 'Explique contraste, foco e rótulo para quem desenha.', 'uxs'],
  ['forum', 'trabalho', '📣', 'O fórum', 'Descreva o problema e o que você já tentou.', 'foruns'],
  ['visto', 'entrevista', '🛂', 'O visto', 'Fale de visto, mudança de país ou remoto internacional.', 'vistos'],
  ['mes', 'revisao', '📆', 'O mês', 'Notas, minutos e preenchimentos das últimas quatro semanas.', 'meses'],
  ['facil', 'trabalho', '🧭', 'O facilitador', 'Abra a reunião, olhe o relógio e feche com ações.', 'facils'],
  ['stack', 'trabalho', '🧰', 'A escolha', 'React ou Vue, SQL ou documento, TypeScript ou JavaScript.', 'stacks'],
  ['sabado', 'cotidiano', '🌦️', 'O sábado', 'Conte o sábado, o domingo e um plano curto.', 'sabados'],
  ['surpresa', 'revisao', '🎁', 'Treino surpresa', 'Um treino por dia, com uma sequência só deste modo.', 'surpresas'],
  ['brecha', 'trabalho', '🔓', 'A falha', 'Explique o furo no review e o conserto.', 'brechas'],
  ['muda', 'trabalho', '📐', 'A mudança', 'O cliente pede uma tela nova no meio do projeto.', 'mudas'],
  ['gaucho', 'cotidiano', '🧉', 'O chimarrão', 'Rio Grande do Sul, chimarrão e churrasco.', 'gauchos'],
  ['radar', 'trabalho', '📡', 'O radar', 'Métrica, alerta e o painel do plantão.', 'radares', 'dashboard'],
  ['aplauso', 'trabalho', '👏', 'O aplauso', 'Agradeça o time em público, com nome.', 'aplausos'],
  ['gripe', 'cotidiano', '🤒', 'A gripe', 'Avise que está doente ou peça o dia.', 'gripes'],
  ['pm', 'trabalho', '📎', 'Com o PM', 'Negocie a data sem pular os testes.', 'pms'],
  ['laudo', 'trabalho', '📄', 'O laudo', 'Linha do tempo, causa e dono no post-mortem.', 'laudos'],
  ['rumo', 'trabalho', '🔭', 'O rumo', 'Peça feedback de carreira no 1:1.', 'rumos'],
  ['acesso', 'trabalho', '🔑', 'O acesso', 'Wiki, repositório e a quem chamar se o build falhar.', 'acessos'],
  ['licenca', 'trabalho', '💳', 'A licença', 'Peça a ferramenta paga, com o preço do mês.', 'licencas'],
  ['jargao', 'trabalho', '🧾', 'Sem jargão', 'Explique a volta da página para o suporte.', 'jargoes'],
  ['bandeira', 'trabalho', '🎚️', 'A bandeira', 'Ligue para dez por cento e saiba quem desliga.', 'bandeiras'],
  ['gelo', 'trabalho', '🧊', 'O gelo', 'Sem merge depois das quatro, com exceção de hotfix.', 'gelos'],
  ['limite', 'trabalho', '🚥', 'O limite', 'Cem chamadas por minuto e o que o cliente faz.', 'limites'],
  ['canario', 'trabalho', '🐤', 'O canário', 'Uma máquina recebe a versão antes do restante.', 'canarios'],
  ['despedida', 'trabalho', '📭', 'A despedida', 'O caminho velho fecha em junho e o novo assume.', 'despedidas'],
  ['repeticao', 'trabalho', '🪝', 'A repetição', 'O mesmo evento pode chegar duas vezes.', 'repeticoes'],
  ['carga', 'trabalho', '🏋️', 'A carga', 'O teste de carga rodou dez minutos numa cópia.', 'cargas'],
  ['boletim', 'trabalho', '📰', 'O boletim', 'A nota lista três correções e aparece na segunda.', 'boletins'],
  ['dono', 'trabalho', '🪪', 'Quem aprova', 'A pasta tem dois donos e o merge pede um deles.', 'donos'],
  ['manual', 'trabalho', '📘', 'O manual', 'O manual manda ler o alerta primeiro e fica no wiki.', 'manuais'],
  ['verde', 'trabalho', '🟢', 'O lado verde', 'O tráfego vai para o lado verde e a volta leva um minuto.', 'verdes'],
  ['certificado', 'trabalho', '🔏', 'O certificado', 'O certificado vence na sexta e o aviso sai sete dias antes.', 'certificados'],
  ['rebase', 'trabalho', '🌿', 'O rebase', 'A branch está dois commits atrás e o rebase vai em cima da main.', 'rebases'],
  ['consulta', 'trabalho', '🐌', 'A consulta', 'A consulta leva quatro segundos e roda em cada página.', 'consultas'],
  ['replica', 'trabalho', '🪞', 'A réplica', 'A réplica está dois minutos atrás e a leitura pode usar a cópia.', 'replicas'],
  ['ensaio', 'trabalho', '🧪', 'O ensaio', 'O teste vai para o ensaio antes da produção, numa cópia de ontem.', 'ensaios'],
  ['disco', 'trabalho', '💽', 'O disco', 'O disco está noventa por cento cheio e o log velho pode sair.', 'discos'],
  ['pagina', 'trabalho', '📃', 'A página', 'A lista mostra vinte linhas e a próxima começa depois do último id.', 'paginas'],
  ['squash', 'trabalho', '✂️', 'O squash', 'Três commits viram um só antes do merge.', 'squashes'],
  ['circuito', 'trabalho', '🛑', 'O circuito', 'O circuito abre depois de cinco erros e a chamada falha na hora.', 'circuitos'],
  ['job', 'trabalho', '🌙', 'O job', 'O job roda às três da manhã e falhou quatro noites.', 'jobs'],
  ['colheita', 'trabalho', '🍒', 'A colheita', 'Um commit sobe sozinho e os outros ficam para trás.', 'colheitas'],
  ['sessao', 'trabalho', '⏳', 'A sessão', 'A sessão acaba depois de oito horas e pode ir até doze.', 'sessoes'],
  ['tanque', 'trabalho', '🪣', 'O tanque', 'O tanque enche com vinte conexões e as ociosas podem fechar.', 'tanques'],
  ['sonda', 'trabalho', '🩺', 'A sonda', 'A sonda falhou duas vezes e a gente olha de novo.', 'sondas'],
  ['semente', 'trabalho', '🌱', 'A semente', 'A semente enche o banco vazio com dez linhas.', 'sementes'],
  ['registro', 'trabalho', '📋', 'O registro', 'Suba o registro para debug quando o erro voltar.', 'registros'],
  ['rastro', 'trabalho', '🔎', 'O rastro', 'O id da chamada fica no cabeçalho.', 'rastros'],
  ['parada', 'trabalho', '🕛', 'A parada', 'A parada começa à meia-noite e dura uma hora.', 'paradas'],
  ['pod', 'trabalho', '🫛', 'O pod', 'Reinicie só um pod e deixe os outros no ar.', 'pods'],
  ['lint', 'trabalho', '🧹', 'O lint', 'O lint falhou em dois arquivos e o aviso fica no diff.', 'lints'],
  ['origem', 'trabalho', '🌐', 'A origem', 'O navegador bloqueia a outra origem até liberar o site.', 'origens'],
  ['link', 'trabalho', '🔗', 'O link', 'O link assinado vale uma hora e depois expira.', 'links'],
  ['cpu', 'trabalho', '🧮', 'O processador', 'O processador fica perto de noventa por cento e a gente olha o pico.', 'cpus'],
  ['copia', 'trabalho', '💾', 'A cópia', 'A cópia da noite começa às duas e fica pronta de manhã.', 'copias'],
  ['estouro', 'trabalho', '💥', 'O estouro', 'O processo estourou a memória e a gente sobe o limite.', 'estouros'],
  ['impasse', 'trabalho', '🪢', 'O impasse', 'Os dois trabalhos esperam um pelo outro e a gente solta o mais antigo.', 'impasses'],
  ['dominio', 'trabalho', '🏷️', 'O domínio', 'O nome do site não resolve e a gente aponta o endereço novo.', 'dominios'],
  ['morta', 'trabalho', '📮', 'A carta morta', 'A mensagem ruim vai para a fila ao lado e a gente lê o motivo.', 'mortas'],
  ['ponteiro', 'trabalho', '🕰️', 'Os ponteiros', 'Os relógios dos servidores diferem em dois segundos e a assinatura falha.', 'ponteiros'],
  ['eleicao', 'trabalho', '🗳️', 'A eleição', 'O líder antigo saiu e dois de três precisam concordar.', 'eleicoes'],
  ['freio', 'trabalho', '🛞', 'O freio', 'A fila encheu e o produtor passa a enviar mais devagar.', 'freios'],
  ['pausa', 'trabalho', '⌛', 'A pausa', 'A coleta parou o processo por dois segundos e as chamadas esperaram.', 'pausas'],
  ['deriva', 'trabalho', '📄', 'A deriva', 'A configuração publicada difere do arquivo no repositório.', 'derivas'],
  ['descritor', 'trabalho', '📁', 'O descritor', 'O processo abriu arquivos demais e a próxima abertura falha.', 'descritores'],
  ['reserva', 'trabalho', '🪫', 'A reserva', 'O servidor passou a usar a reserva de memória e as respostas atrasaram muito.', 'reservas'],
  ['varredura', 'trabalho', '🧵', 'A varredura', 'A tela dispara uma consulta nova para cada linha da lista enorme.', 'varreduras'],
  ['porta', 'trabalho', '🚪', 'A porta', 'Nenhum processo escuta nessa porta de rede e o cliente recebe recusa imediata.', 'portas'],
  ['inodo', 'trabalho', '📛', 'O inodo', 'Os nomes livres acabaram e o arquivo novo não aparece no volume.', 'inodos'],
  ['saida', 'trabalho', '🛎️', 'A saída', 'O serviço recebeu o aviso de encerrar e espera as tarefas abertas.', 'saidas'],
  ['manada', 'trabalho', '🐑', 'A manada', 'O cache venceu de uma vez e a enxurrada caiu no armazenamento.', 'manadas'],
  ['gotejo', 'trabalho', '💧', 'O gotejo', 'A memória cresce sem parar e nada volta para o sistema.', 'gotejos'],
  ['frio', 'trabalho', '🥶', 'O frio', 'A função dorme e a primeira chamada espera ela acordar.', 'frios'],
  ['cadeado', 'trabalho', '🔐', 'O cadeado', 'O processo tentou ler o arquivo e a permissão recusou a leitura.', 'cadeados'],
  ['cota', 'trabalho', '📏', 'A cota', 'A cota do usuário fechou e o arquivo novo não grava.', 'cotas'],
  ['ciclo', 'trabalho', '🔁', 'O ciclo', 'O serviço cai e volta sozinho sem ficar estável.', 'ciclos'],
  ['zumbi', 'trabalho', '🧟', 'O zumbi', 'O filho terminou e o pai nunca colheu o fim.', 'zumbis'],
  ['cisao', 'trabalho', '🪞', 'A cisão', 'Dois nós acham que mandam ao mesmo tempo e a escrita divide.', 'cisoes'],
  ['rajada', 'trabalho', '🌊', 'A rajada', 'Os clientes tentam de novo juntos e multiplicam a carga.', 'rajadas'],
  ['brasa', 'trabalho', '🔥', 'A brasa', 'Uma chave recebe quase todas as escritas do mapa.', 'brasas'],
  ['datagrama', 'trabalho', '📨', 'O datagrama', 'Dois datagramas sumiram antes de chegar ao destino.', 'datagramas'],
  ['passe', 'trabalho', '🎫', 'O passe', 'O passe curto venceu e a próxima chamada pede outro.', 'passes'],
  ['carimbo', 'trabalho', '🖊️', 'O carimbo', 'O carimbo da linha mudou e a gravação foi recusada.', 'carimbos'],
  ['pilha', 'trabalho', '📚', 'A pilha', 'A pilha de chamadas cresceu sem fundo e o programa parou.', 'pilhas'],
  ['cano', 'trabalho', '🔧', 'O cano', 'A outra ponta fechou o cano no meio da resposta.', 'canos'],
  ['giro', 'trabalho', '🌀', 'O giro', 'O navegador girou entre dois endereços e desistiu.', 'giros'],
  ['compacta', 'trabalho', '🗜️', 'A compactação', 'O armazenamento reescreveu seis arquivos velhos de uma vez.', 'compactas'],
  ['diario', 'trabalho', '✒️', 'O diário', 'O diário de escrita ocupou quatro gigabytes e a nova escrita espera.', 'diarios'],
  ['vagao', 'trabalho', '🚃', 'O vagão', 'O leitor ficou mil mensagens atrás do fim publicado.', 'vagoes'],
  ['corrida', 'trabalho', '🏎️', 'A corrida', 'Dois pedidos gravaram o mesmo saldo ao mesmo tempo.', 'corridas'],
  ['indice', 'trabalho', '📇', 'O índice', 'A busca leu cada linha porque o índice da coluna faltou.', 'indices'],
  ['percentil', 'trabalho', '📐', 'O percentil', 'Noventa e nove por cento das chamadas cabem em duzentos milissegundos.', 'percentis'],
  ['segredo', 'trabalho', '🕵️', 'O segredo', 'A chave secreta apareceu no log e qualquer pessoa leu.', 'segredos'],
  ['fantasma', 'trabalho', '👻', 'O fantasma', 'A segunda leitura viu uma linha que a primeira não tinha.', 'fantasmas'],
  ['inteiro', 'trabalho', '🔣', 'O inteiro', 'O contador passou do limite e voltou para zero.', 'inteiros'],
  ['filtro', 'trabalho', '🧲', 'O filtro', 'O filtro de presença deu um sim falso e a chave não estava no conjunto.', 'filtros'],
  ['ordem', 'trabalho', '🔀', 'A ordem', 'A mensagem quatro chegou antes da três e a conta saiu invertida.', 'ordens'],
  ['prova', 'trabalho', '🧬', 'A prova', 'A prova dos bytes não bateu com o arquivo que chegou pela rede.', 'provas'],
  ['orfao', 'trabalho', '🪆', 'O órfão', 'A linha filha apontou para um pai que não existe mais.', 'orfaos'],
  ['aceno', 'trabalho', '🫡', 'O aceno', 'O segundo sítio nunca confirmou e a transação ficou pela metade.', 'acenos'],
  ['gasto', 'trabalho', '🪙', 'O gasto', 'Três dias de erro gastaram o mês inteiro permitido.', 'gastos'],
  ['instavel', 'trabalho', '🎲', 'O instável', 'O teste passou na segunda tentativa e a primeira tinha falhado.', 'instaveis'],
  ['duplicado', 'trabalho', '📧', 'O duplicado', 'O e-mail já estava na tabela e a linha nova foi recusada.', 'duplicados'],
  ['apagao', 'trabalho', '🔌', 'O apagão', 'Desligamos uma máquina de propósito para ver o que quebrava.', 'apagoes'],
  ['replay', 'trabalho', '⏪', 'O replay', 'Reexecutamos os dois últimos dias para preencher o buraco antigo.', 'replays'],
  ['eco', 'trabalho', '🔔', 'O eco', 'O mesmo evento chegou duas vezes e a conta dobrou.', 'ecos'],
  ['leque', 'trabalho', '🪭', 'O leque', 'Um evento acordou quatro trabalhadores ao mesmo tempo.', 'leques'],
  ['saga', 'trabalho', '🧵', 'A saga', 'O terceiro passo nunca terminou e a volta ficou pela metade.', 'sagas'],
  ['caixa', 'trabalho', '📦', 'A caixa', 'O evento ficou parado na caixa de saída por dois minutos.', 'caixas'],
  ['apagado', 'trabalho', '🗑️', 'O apagado', 'A linha continuou na tabela depois do apagar.', 'apagados'],
  ['espera', 'trabalho', '⏲️', 'A espera', 'A chamada parou depois de três segundos sem resposta.', 'esperas'],
  ['cursor', 'trabalho', '🔖', 'O cursor', 'A página seguinte perdeu o lugar da leitura.', 'cursores'],
  ['fila', 'trabalho', '📥', 'A fila', 'A fila de espera passou de mil mensagens paradas.', 'filas'],
  ['disjuntor', 'trabalho', '🛑', 'O disjuntor', 'Cinco falhas seguidas abriram o disjuntor da chamada.', 'disjuntores'],
  ['aluguel', 'trabalho', '🔑', 'O aluguel', 'O prazo de posse venceu e outro processo assumiu o recurso.', 'alugueis'],
  ['pulso', 'trabalho', '💓', 'O pulso', 'O nó deixou de enviar três pulsos e saiu do grupo.', 'pulsos'],
  ['piscina', 'trabalho', '🏊', 'A piscina', 'A piscina de conexões ficou sem vaga livre.', 'piscinas'],
  ['balde', 'trabalho', '🪣', 'O balde', 'O balde de fichas esvaziou antes do minuto acabar.', 'baldes'],
  ['cerca', 'trabalho', '🚧', 'A cerca', 'Um número maior invalidou a escrita do dono antigo.', 'cercas'],
  ['tremor', 'trabalho', '🫨', 'O tremor', 'Cada nova tentativa espera um tempo diferente.', 'tremores'],
  ['portaria', 'trabalho', '🧱', 'A portaria', 'A portaria recusou a entrada extra para proteger o serviço.', 'portarias'],
  ['cola', 'trabalho', '🧷', 'A cola', 'O cliente voltou sempre para a mesma máquina.', 'colas'],
  ['anteparo', 'trabalho', '🛟', 'O anteparo', 'Uma falha fica presa no próprio compartimento.', 'anteparos'],
  ['descarte', 'trabalho', '📤', 'O descarte', 'O serviço descarta o pedido que não cabe agora.', 'descartes'],
  ['cronometro', 'trabalho', '⏰', 'O cronômetro', 'A chamada acaba quando o tempo restante chega a zero.', 'cronometros'],
  ['amostra', 'trabalho', '🧫', 'A amostra', 'Fica guardada uma linha a cada dez do rastro.', 'amostras'],
  ['nicho', 'trabalho', '🪺', 'O nicho', 'A chave ficou no nicho três e os outros nichos ficaram quietos.', 'nichos'],
  ['lacre', 'trabalho', '🔒', 'O lacre', 'O lacre do pacote mudou e a cópia antiga sai.', 'lacres'],
  ['semaforo', 'trabalho', '🚦', 'O semáforo', 'As vagas simultâneas acabaram neste instante.', 'semaforos'],
  ['barreira', 'trabalho', '🏁', 'A barreira', 'Ninguém segue enquanto os quatro participantes não chegam.', 'barreiras'],
  ['trinco', 'trabalho', '🪝', 'O trinco', 'O grupo inteiro sai quando a contagem zera.', 'trincos'],
  ['recuo', 'trabalho', '⏬', 'O recuo', 'Cada falha dobra o intervalo da próxima tentativa.', 'recuos'],
  ['vigia', 'trabalho', '🐕', 'O vigia', 'Um processo de fora encerra a tarefa que passou do prazo.', 'vigias'],
  ['ampulheta', 'trabalho', '🏺', 'A ampulheta', 'O passe de acesso vence em quinze minutos.', 'ampulhetas'],
  ['carona', 'trabalho', '🚕', 'A carona', 'A confirmação viaja junto com o próximo pacote.', 'caronas'],
  ['veneno', 'trabalho', '☠️', 'O veneno', 'A mensagem ruim sai da fila e fica de lado.', 'venenos'],
  ['farol', 'trabalho', '🗼', 'O farol', 'O sinal curto mostra que o serviço ainda vive.', 'farois'],
  ['ancora', 'trabalho', '⚓', 'A âncora', 'Um ponto fixo guarda o estado antes da troca.', 'ancoras', 'anchor'],
  ['malha', 'trabalho', '🕸️', 'A malha', 'Cada serviço fala só com o vizinho da rede.', 'malhas', 'mesh'],
  ['fenda', 'trabalho', '🪓', 'A fenda', 'O tráfego se divide entre duas versões vivas.', 'fendas', 'split'],
  ['cofre', 'trabalho', '🏦', 'O cofre', 'A chave mora num serviço separado do app.', 'cofres', 'vault'],
  ['audiencia', 'trabalho', '👂', 'A audiência', 'O passe só vale para o serviço certo.', 'audiencias', 'audience'],
  ['revogacao', 'trabalho', '🚫', 'A revogação', 'O passe antigo deixa de valer na hora.', 'revogacoes', 'revoke'],
  ['quorum', 'trabalho', '🗳️', 'O quórum', 'A escrita só entra com a maioria dos nós.', 'quoruns', 'quorum'],
  ['maioria', 'trabalho', '✋', 'A maioria', 'Mais da metade dos nós precisa confirmar.', 'maiorias', 'majority'],
  ['arbitro', 'trabalho', '⚖️', 'O árbitro', 'O nó extra desempata quando a rede parte.', 'arbitros', 'tie'],
  ['lider', 'trabalho', '🧭', 'O líder', 'Um nó conduz o mandato e os outros seguem.', 'lideres', 'leader'],
  ['mandato', 'trabalho', '📜', 'O mandato', 'Cada eleição sobe o número do período.', 'mandatos', 'term'],
  ['seguidor', 'trabalho', '👣', 'O seguidor', 'O nó copia o registro e não escreve sozinho.', 'seguidores', 'follow']
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

const TETO_JS = 1870000;

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
