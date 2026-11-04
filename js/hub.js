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
  ['futuro', 'entrevista', '🚀', 'Daqui a cinco anos', 'A meta e o caminho da carreira, em duas falas.', 'futuros', 'carreira cinco anos five years'],
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
  ['cultura', 'cotidiano', '🎬', 'Esporte, filme e série', 'Jogo, cinema e a série da semana, em duas falas.', 'culturas', 'esporte filme serie cinema jogo'],
  ['aumento', 'trabalho', '🏆', 'O aumento', 'Peça aumento, fale da promoção e de uma conquista.', 'aumentos', 'promocao conquista raise'],
  ['rota', 'trabalho', '🔌', 'A API', 'Endpoint, status e autenticação, em duas falas.', 'rotas', 'rest endpoint status autenticacao'],
  ['vivo', 'trabalho', '🔥', 'Ao vivo', 'Status na hora, pedido de ajuda e a lição do incidente.', 'vivos', 'incidente producao status postmortem'],
  ['produto', 'trabalho', '📦', 'Com o produto', 'Negocie o prazo e o que fica nesta entrega.', 'produtos', 'gerente prazo escopo'],
  ['fecho', 'entrevista', '🙋', 'Suas perguntas', 'Plantão, crescimento e por que a vaga abriu.', 'fechos', 'entrevista pergunta on call'],
  ['espaco', 'revisao', '🔂', 'Mais erradas', 'As frases que você mais errou, na data da revisão.', 'espacos', 'revisao espacada erros'],
  ['mapa', 'trabalho', '🗺️', 'O mapa', 'Arquitetura e fluxo, para quem chegou agora.', 'mapas', 'onboarding arquitetura colega'],
  ['duro', 'trabalho', '🗣️', 'O ponto difícil', 'Dar e receber um feedback duro no 1:1.', 'duros', 'feedback dificil 1:1'],
  ['proposta', 'trabalho', '📐', 'A proposta', 'Apresente uma RFC e defenda a troca.', 'propostas', 'rfc proposta troca'],
  ['semana', 'revisao', '📊', 'Semana falada', 'Minutos de fala e treinos por grupo, nesta semana.', '', 'minutos progresso semana'],
  ['narrar', 'trabalho', '🎙️', 'O par narrado', 'Pense a próxima linha em voz alta, com o par.', 'narras', 'pair narrar voz alta linha'],
  ['banco', 'entrevista', '🗄️', 'Banco ou cache', 'Explique a guarda dos dados numa entrevista.', 'bancos', 'system design banco cache redis'],
  ['recusa', 'trabalho', '🙅', 'O não educado', 'Recuse o pedido e ofereça outro caminho.', 'recusas', 'recusar pedido alternativa'],
  ['sprint', 'trabalho', '🖥️', 'Demo da sprint', 'Mostre o que saiu e responda uma pergunta fora do roteiro.', 'sprints', 'demo sprint cliente pergunta'],
  ['seguro', 'trabalho', '🔐', 'A decisão segura', 'Furo, patch e por quanto tempo um dado fica guardado.', 'seguros', 'seguranca vulnerabilidade patch lgpd gdpr'],
  ['meetup', 'cotidiano', '🎫', 'No meetup', 'Puxe assunto num evento de tecnologia.', 'meetups', 'networking meetup evento palestra'],
  ['completa', 'entrevista', '🎓', 'Entrevista completa', 'Cinco treinos em sequência e uma nota no fim.', 'completas', 'simulado entrevista cinco treinos nota'],
  ['rodada', 'trabalho', '📝', 'A mesa da retro', 'Fato, ajuste e quem fica com a ação.', 'rodadas', 'retrospectiva fila dono acao'],
  ['migra', 'trabalho', '🚚', 'A migração', 'Banco ou biblioteca, e o risco da troca.', 'migras', 'migracao banco framework risco'],
  ['estreia', 'cotidiano', '👋', 'Primeiro dia', 'Um oi informal no time novo.', 'estreias', 'primeiro dia time estrangeiro cozinha almoco'],
  ['foco', 'entrevista', '🧩', 'Entrevista por foco', 'Escolha frontend, backend ou IA e veja as notas.', 'focos', 'entrevista foco frontend backend ia historico nota'],
  ['poker', 'trabalho', '🃏', 'A carta', 'Vote a estimativa e diga o motivo.', 'pokers', 'planning poker estimativa carta'],
  ['leigo', 'trabalho', '🧮', 'A conta da IA', 'Custo, busca nos docs e o que a pessoa ainda lê.', 'leigos', 'ia llm rag prompt custo leigo'],
  ['recruta', 'entrevista', '📞', 'A ligação', 'Pretensão, fuso e quando você pode começar.', 'recrutas', 'linkedin recrutador telefone pretensao fuso'],
  ['culpa', 'trabalho', '🙏', 'A desculpa', 'Assuma o erro e diga o próximo passo.', 'culpas', 'blameless desculpa responsabilidade erro'],
  ['raio', 'trabalho', '🔦', 'O relâmpago', 'Cinco minutos sobre um projeto pessoal.', 'raios', 'palestra relampago projeto pessoal cinco minutos'],
  ['oferta', 'entrevista', '💻', 'A oferta', 'Equipamento, verba de estudo e a data de início.', 'ofertas', 'oferta equipamento notebook verba data inicio'],
  ['sombra', 'revisao', '🗣️', 'Sombra', 'Ouça a voz do aparelho, repita e compare.', 'sombra', 'shadowing ouvir repetir comparar'],
  ['pedido', 'trabalho', '🙋', 'Não entendi', 'Peça o sotaque, a palavra que escapou e leia o requisito de volta.', 'pedidos', 'esclarecer sotaque palavra requisito'],
  ['cobertura', 'trabalho', '🧪', 'A cobertura', 'Diga como os testes e a cobertura protegem o merge.', 'coberturas', 'teste cobertura suite merge linhas'],
  ['loom', 'trabalho', '🎥', 'O vídeo', 'Um check-in curto para o time assistir depois.', 'looms', 'loom video check-in assincrono'],
  ['caderno', 'revisao', '📒', 'Meu vocabulário', 'Palavras que escaparam nas falas.', 'cadernos', 'vocabulario palavras erro fala caderno'],
  ['grafico', 'trabalho', '📉', 'O gráfico', 'Alta, queda e a causa, em cima do gráfico.', 'graficos', 'grafico metrica alta queda causa'],
  ['handoff', 'trabalho', '🕒', 'O handoff', 'Peça o que ficou aberto e deixe o contexto para o outro fuso.', 'handoffs', 'handoff fuso contexto nota blocker'],
  ['elevador', 'entrevista', '🚪', 'O elevador', 'Trinta segundos para um diretor, do cargo ao pedido.', 'elevadores', 'elevador diretor trinta segundos apresentar'],
  ['junta', 'revisao', '🗂️', 'A semana junta', 'Vocabulário, frases mais erradas e a meta de minutos.', 'juntas', 'semana vocabulario mais erradas minutos meta'],
  ['pista', 'trabalho', '🏁', 'O bug raro', 'Sintoma e prova de um bug que só aparece às vezes.', 'pistas', 'bug intermitente corrida log clique'],
  ['calma', 'trabalho', '🐢', 'Com calma', 'Explique um conceito devagar, um passo de cada vez.', 'calmas', 'mentoria junior conceito paciencia'],
  ['folga', 'cotidiano', '🏖️', 'A folga', 'Férias, horário e o limite da noite.', 'folgas', 'ferias limite noite duas semanas'],
  ['abertas', 'entrevista', '💭', 'Perguntas abertas', 'Cinco perguntas abertas. Cada resposta conta palavras, tempo e preenchimento.', 'abertas', 'entrevista conversa livre palavras tempo um like basically'],
  ['respeito', 'trabalho', '🏛️', 'Com respeito', 'Discorde de uma arquitetura e ofereça outro caminho.', 'respeitos', 'arquitetura discordo respeito risco servico'],
  ['debito', 'trabalho', '🧱', 'A dívida', 'Explique a dívida técnica e peça tempo para refatorar.', 'debitos', 'divida tecnica refactor sprint juros'],
  ['indicacao', 'entrevista', '✉️', 'A indicação', 'Peça a um ex-colega para ser a sua referência.', 'indicacoes', 'referencia indicacao ex colega nota'],
  ['ux', 'trabalho', '🎨', 'O contraste', 'Explique contraste, foco e rótulo para quem desenha.', 'uxs', 'ux contraste foco rotulo acessibilidade designer'],
  ['forum', 'trabalho', '📣', 'O fórum', 'Descreva o problema e o que você já tentou.', 'foruns', 'forum ajuda publica cache navegador clique'],
  ['visto', 'entrevista', '🛂', 'O visto', 'Fale de visto, mudança de país ou remoto internacional.', 'vistos', 'visto relocation remoto brasil rh'],
  ['mes', 'revisao', '📆', 'O mês', 'Notas, minutos e preenchimentos das últimas quatro semanas.', 'meses', 'mes notas minutos preenchimento semanas'],
  ['facil', 'trabalho', '🧭', 'O facilitador', 'Abra a reunião, olhe o relógio e feche com ações.', 'facils', 'facilitador reuniao pauta tempo acao'],
  ['stack', 'trabalho', '🧰', 'A escolha', 'React ou Vue, SQL ou documento, TypeScript ou JavaScript.', 'stacks', 'react vue sql documento typescript javascript'],
  ['sabado', 'cotidiano', '🌦️', 'O sábado', 'Conte o sábado, o domingo e um plano curto.', 'sabados', 'sabado domingo filme trilha plano'],
  ['surpresa', 'revisao', '🎁', 'Treino surpresa', 'Um treino por dia, com uma sequência só deste modo.', 'surpresas', 'surpresa streak sequencia treino do dia'],
  ['brecha', 'trabalho', '🔓', 'A falha', 'Explique o furo no review e o conserto.', 'brechas', 'seguranca sql permissao segredo review'],
  ['muda', 'trabalho', '📐', 'A mudança', 'O cliente pede uma tela nova no meio do projeto.', 'mudas', 'cliente escopo tela sprint preco nota'],
  ['gaucho', 'cotidiano', '🧉', 'O chimarrão', 'Rio Grande do Sul, chimarrão e churrasco.', 'gauchos', 'rio grande sul chimarrao churrasco porto alegre'],
  ['radar', 'trabalho', '📡', 'O radar', 'Métrica, alerta e o painel do plantão.', 'radares', 'observabilidade metrica alerta dashboard plantao'],
  ['aplauso', 'trabalho', '👏', 'O aplauso', 'Agradeça o time em público, com nome.', 'aplausos', 'shout out obrigado time publico'],
  ['gripe', 'cotidiano', '🤒', 'A gripe', 'Avise que está doente ou peça o dia.', 'gripes', 'doente consulta febre daily'],
  ['pm', 'trabalho', '📎', 'Com o PM', 'Negocie a data sem pular os testes.', 'pms', 'pm prazo quinta review testes'],
  ['laudo', 'trabalho', '📄', 'O laudo', 'Linha do tempo, causa e dono no post-mortem.', 'laudos', 'postmortem causa indice retro'],
  ['rumo', 'trabalho', '🔭', 'O rumo', 'Peça feedback de carreira no 1:1.', 'rumos', 'carreira gestor feedback nivel habilidade'],
  ['acesso', 'trabalho', '🔑', 'O acesso', 'Wiki, repositório e a quem chamar se o build falhar.', 'acessos', 'acesso wiki repo build novo'],
  ['licenca', 'trabalho', '💳', 'A licença', 'Peça a ferramenta paga, com o preço do mês.', 'licencas', 'licenca ferramenta preco renovacao'],
  ['jargao', 'trabalho', '🧾', 'Sem jargão', 'Explique a volta da página para o suporte.', 'jargoes', 'suporte cliente linguagem simples pagina'],
  ['bandeira', 'trabalho', '🎚️', 'A bandeira', 'Ligue para dez por cento e saiba quem desliga.', 'bandeiras', 'feature flag porcentagem deploy padrao'],
  ['gelo', 'trabalho', '🧊', 'O gelo', 'Sem merge depois das quatro, com exceção de hotfix.', 'gelos', 'code freeze quinta hotfix release'],
  ['limite', 'trabalho', '🚥', 'O limite', 'Cem chamadas por minuto e o que o cliente faz.', 'limites', 'rate limit api 429 teto'],
  ['canario', 'trabalho', '🐤', 'O canário', 'Uma máquina recebe a versão antes do restante.', 'canarios', 'canary deploy servidor saudavel'],
  ['despedida', 'trabalho', '📭', 'A despedida', 'O caminho velho fecha em junho e o novo assume.', 'despedidas', 'deprecar endpoint junho versao'],
  ['repeticao', 'trabalho', '🪝', 'A repetição', 'O mesmo evento pode chegar duas vezes.', 'repeticoes', 'webhook retry idempotente segunda vez'],
  ['carga', 'trabalho', '🏋️', 'A carga', 'O teste de carga rodou dez minutos numa cópia.', 'cargas', 'load test carga dez minutos copia'],
  ['boletim', 'trabalho', '📰', 'O boletim', 'A nota lista três correções e aparece na segunda.', 'boletins', 'changelog nota versao correcoes segunda'],
  ['dono', 'trabalho', '🪪', 'Quem aprova', 'A pasta tem dois donos e o merge pede um deles.', 'donos', 'code owner pasta merge aprovar'],
  ['manual', 'trabalho', '📘', 'O manual', 'O manual manda ler o alerta primeiro e fica no wiki.', 'manuais', 'runbook manual wiki alerta'],
  ['verde', 'trabalho', '🟢', 'O lado verde', 'O tráfego vai para o lado verde e a volta leva um minuto.', 'verdes', 'blue green deploy lado verde trafego'],
  ['certificado', 'trabalho', '🔏', 'O certificado', 'O certificado vence na sexta e o aviso sai sete dias antes.', 'certificados', 'certificado tls sexta renovar'],
  ['rebase', 'trabalho', '🌿', 'O rebase', 'A branch está dois commits atrás e o rebase vai em cima da main.', 'rebases', 'rebase main conflito arquivo'],
  ['consulta', 'trabalho', '🐌', 'A consulta', 'A consulta leva quatro segundos e roda em cada página.', 'consultas', 'slow query quatro segundos join plano'],
  ['replica', 'trabalho', '🪞', 'A réplica', 'A réplica está dois minutos atrás e a leitura pode usar a cópia.', 'replicas', 'replica lag primario leitura dois minutos'],
  ['ensaio', 'trabalho', '🧪', 'O ensaio', 'O teste vai para o ensaio antes da produção, numa cópia de ontem.', 'ensaios', 'staging ensaio copia ontem build'],
  ['disco', 'trabalho', '💽', 'O disco', 'O disco está noventa por cento cheio e o log velho pode sair.', 'discos', 'disco noventa por cento log gigabyte'],
  ['pagina', 'trabalho', '📃', 'A página', 'A lista mostra vinte linhas e a próxima começa depois do último id.', 'paginas', 'pagina vinte linhas ultimo id'],
  ['squash', 'trabalho', '✂️', 'O squash', 'Três commits viram um só antes do merge.', 'squashes', 'squash tres commits historico merge'],
  ['circuito', 'trabalho', '🛑', 'O circuito', 'O circuito abre depois de cinco erros e a chamada falha na hora.', 'circuitos', 'circuit breaker cinco erros um minuto'],
  ['job', 'trabalho', '🌙', 'O job', 'O job roda às três da manhã e falhou quatro noites.', 'jobs', 'cron job tres manha quatro noites'],
  ['colheita', 'trabalho', '🍒', 'A colheita', 'Um commit sobe sozinho e os outros ficam para trás.', 'colheitas', 'cherry pick commit sozinho release'],
  ['sessao', 'trabalho', '⏳', 'A sessão', 'A sessão acaba depois de oito horas e pode ir até doze.', 'sessoes', 'sessao oito horas doze login'],
  ['tanque', 'trabalho', '🪣', 'O tanque', 'O tanque enche com vinte conexões e as ociosas podem fechar.', 'tanques', 'pool vinte conexoes ociosas'],
  ['sonda', 'trabalho', '🩺', 'A sonda', 'A sonda falhou duas vezes e a gente olha de novo.', 'sondas', 'health check duas vezes'],
  ['semente', 'trabalho', '🌱', 'A semente', 'A semente enche o banco vazio com dez linhas.', 'sementes', 'seed banco vazio dez linhas'],
  ['registro', 'trabalho', '📋', 'O registro', 'Suba o registro para debug quando o erro voltar.', 'registros', 'log level debug info erro'],
  ['rastro', 'trabalho', '🔎', 'O rastro', 'O id da chamada fica no cabeçalho.', 'rastros', 'request id header ticket'],
  ['parada', 'trabalho', '🕛', 'A parada', 'A parada começa à meia-noite e dura uma hora.', 'paradas', 'maintenance window midnight hour'],
  ['pod', 'trabalho', '🫛', 'O pod', 'Reinicie só um pod e deixe os outros no ar.', 'pods', 'restart one pod traffic'],
  ['lint', 'trabalho', '🧹', 'O lint', 'O lint falhou em dois arquivos e o aviso fica no diff.', 'lints', 'linter dois arquivos warning diff'],
  ['origem', 'trabalho', '🌐', 'A origem', 'O navegador bloqueia a outra origem até liberar o site.', 'origens', 'cors origin browser allow'],
  ['link', 'trabalho', '🔗', 'O link', 'O link assinado vale uma hora e depois expira.', 'links', 'signed url one hour expires'],
  ['cpu', 'trabalho', '🧮', 'O processador', 'O processador fica perto de noventa por cento e a gente olha o pico.', 'cpus', 'cpu ninety percent peak'],
  ['copia', 'trabalho', '💾', 'A cópia', 'A cópia da noite começa às duas e fica pronta de manhã.', 'copias', 'backup nightly two morning'],
  ['estouro', 'trabalho', '💥', 'O estouro', 'O processo estourou a memória e a gente sobe o limite.', 'estouros', 'out of memory limit process'],
  ['impasse', 'trabalho', '🪢', 'O impasse', 'Os dois trabalhos esperam um pelo outro e a gente solta o mais antigo.', 'impasses', 'deadlock two jobs older lock'],
  ['dominio', 'trabalho', '🏷️', 'O domínio', 'O nome do site não resolve e a gente aponta o endereço novo.', 'dominios', 'dns name resolve address'],
  ['morta', 'trabalho', '📮', 'A carta morta', 'A mensagem ruim vai para a fila ao lado e a gente lê o motivo.', 'mortas', 'dead letter side queue payload'],
  ['ponteiro', 'trabalho', '🕰️', 'Os ponteiros', 'Os relógios dos servidores diferem em dois segundos e a assinatura falha.', 'ponteiros', 'clock skew two seconds signature'],
  ['eleicao', 'trabalho', '🗳️', 'A eleição', 'O líder antigo saiu e dois de três precisam concordar.', 'eleicoes', 'quorum leader two of three votes'],
  ['freio', 'trabalho', '🛞', 'O freio', 'A fila encheu e o produtor passa a enviar mais devagar.', 'freios', 'backpressure queue producer slow'],
  ['pausa', 'trabalho', '⌛', 'A pausa', 'A coleta parou o processo por dois segundos e as chamadas esperaram.', 'pausas', 'gc pause two seconds calls waited'],
  ['deriva', 'trabalho', '📄', 'A deriva', 'A configuração publicada difere do arquivo no repositório.', 'derivas', 'config drift repo file lines'],
  ['descritor', 'trabalho', '📁', 'O descritor', 'O processo abriu arquivos demais e a próxima abertura falha.', 'descritores', 'file descriptor too many files limit'],
  ['reserva', 'trabalho', '🪫', 'A reserva', 'O servidor passou a usar a reserva de memória e as respostas atrasaram muito.', 'reservas', 'swap memory server responses slow'],
  ['varredura', 'trabalho', '🧵', 'A varredura', 'A tela dispara uma consulta nova para cada linha da lista enorme.', 'varreduras', 'n plus one query per row list'],
  ['porta', 'trabalho', '🚪', 'A porta', 'Nenhum processo escuta nessa porta de rede e o cliente recebe recusa imediata.', 'portas', 'connection refused port listener'],
  ['inodo', 'trabalho', '📛', 'O inodo', 'Os nomes livres acabaram e o arquivo novo não aparece no volume.', 'inodos', 'inode file names disk volume'],
  ['saida', 'trabalho', '🛎️', 'A saída', 'O serviço recebeu o aviso de encerrar e espera as tarefas abertas.', 'saidas', 'graceful shutdown stop signal tasks'],
  ['manada', 'trabalho', '🐑', 'A manada', 'O cache venceu de uma vez e a enxurrada caiu no armazenamento.', 'manadas', 'cache stampede expire database herd'],
  ['gotejo', 'trabalho', '💧', 'O gotejo', 'A memória cresce sem parar e nada volta para o sistema.', 'gotejos', 'memory leak grow megabytes process'],
  ['frio', 'trabalho', '🥶', 'O frio', 'A função dorme e a primeira chamada espera ela acordar.', 'frios', 'cold start function first call warm'],
  ['cadeado', 'trabalho', '🔐', 'O cadeado', 'O processo tentou ler o arquivo e a permissão recusou a leitura.', 'cadeados', 'permission denied read file access'],
  ['cota', 'trabalho', '📏', 'A cota', 'A cota do usuário fechou e o arquivo novo não grava.', 'cotas', 'disk quota gigabytes user file'],
  ['ciclo', 'trabalho', '🔁', 'O ciclo', 'O serviço cai e volta sozinho sem ficar estável.', 'ciclos', 'crash loop restart process stable'],
  ['zumbi', 'trabalho', '🧟', 'O zumbi', 'O filho terminou e o pai nunca colheu o fim.', 'zumbis', 'zombie process child parent wait'],
  ['cisao', 'trabalho', '🪞', 'A cisão', 'Dois nós acham que mandam ao mesmo tempo e a escrita divide.', 'cisoes', 'split brain two leaders nodes write'],
  ['rajada', 'trabalho', '🌊', 'A rajada', 'Os clientes tentam de novo juntos e multiplicam a carga.', 'rajadas', 'retry storm clients together load'],
  ['brasa', 'trabalho', '🔥', 'A brasa', 'Uma chave recebe quase todas as escritas do mapa.', 'brasas', 'hot key writes percent map']
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

const TETO_JS = 1540000;

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
