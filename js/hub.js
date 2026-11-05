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
  ['colega', 'trabalho', '🤝', 'Outra área', 'Peça ajuda a design.', 'colegas'],
  ['palestra', 'trabalho', '🎤', 'Palestra', 'Abertura e perguntas.', 'palestras'],
  ['duvida', 'trabalho', '🙋', 'Sem a resposta', 'Ganhe tempo.', 'duvidas'],
  ['sinal', 'trabalho', '📶', 'Sinal ruim', 'A voz corta no vídeo.', 'sinais'],
  ['falha', 'trabalho', '🛠️', 'Por que falhou', 'O que quebrou.', 'falhas'],
  ['mentoria', 'trabalho', '🌱', 'Mentoria', 'Uma dica e a ideia.', 'mentorias'],
  ['requisito', 'trabalho', '🗒️', 'Requisitos', 'Uma pergunta.', 'requisitos'],
  ['metrica', 'trabalho', '📈', 'Métricas', 'Números e porcentagens.', 'metricas'],
  ['aprendizado', 'trabalho', '📖', 'Um erro', 'O erro e a lição.', 'aprendizados'],
  ['linha', 'trabalho', '💻', 'Linha a linha', 'O loop e o null.', 'linhas'],
  ['slack', 'trabalho', '💬', 'Slack', 'Peça a review.', 'slacks'],
  ['gestor', 'trabalho', '🗣️', 'Feedback 1:1', 'Um ponto do gestor.', 'gestores'],
  ['estimativa', 'trabalho', '⏳', 'Estimativa', 'O prazo.', 'estimativas'],
  ['consenso', 'trabalho', '⚖️', 'Consenso', 'Discorde com calma.', 'consensos'],
  ['retro', 'trabalho', '🔄', 'Retrospectiva', 'O que foi bem e a ação.', 'retros'],
  ['chegada', 'trabalho', '🧭', 'Onboarding', 'Explique o projeto.', 'chegadas'],
  ['ligacao', 'trabalho', '🔗', 'Conectores', 'However, besides that.', 'ligacoes'],
  ['decisao', 'trabalho', '🏗️', 'Decisão técnica', 'A troca.', 'decisoes'],
  ['par', 'trabalho', '👥', 'Pair', 'Narre o passo atual.', 'pares'],
  ['plantao', 'trabalho', '🚨', 'Plantão', 'Status e o passo.', 'incidentes'],
  ['demo', 'trabalho', '🎬', 'Demo de produto', 'Um minuto no palco.', 'demos'],
  ['prazo', 'trabalho', '📌', 'Prazo e escopo', 'Sugira um corte.', 'negociacoes'],
  ['relato', 'trabalho', '🐛', 'Relatar um bug', 'Causa e correção.', 'relatos'],
  ['cortesia', 'trabalho', '🙏', 'Review com educação', 'Um comentário.', 'cortesias'],
  ['aquecer', 'trabalho', '☕', 'Antes da reunião', 'O clima.', 'aquecimentos'],
  ['claro', 'trabalho', '🔎', 'Esclarecer', 'Peça de novo.', 'esclarecimentos'],
  ['opiniao', 'trabalho', '💬', 'Opinião', 'Dê um motivo claro.', 'opinioes'],
  ['tecnico', 'trabalho', '💻', 'Inglês de trabalho', 'O standup.', 'tecnicos'],
  ['idioma', 'trabalho', '🤝', 'Idioms de reunião', 'Touch base.', 'idiomas'],
  ['frasal', 'trabalho', '🧩', 'Phrasal verbs', 'Look for.', 'verbosFala'],
  ['sistema', 'entrevista', '🏗️', 'Sistema', 'Pedido, escala e gargalo.', 'sistemas'],
  ['codigo', 'entrevista', '💻', 'Em voz alta', 'Pense alto enquanto resolve.', 'codigos'],
  ['simulado', 'entrevista', '🎯', 'Simulado', 'Seis falas.', 'simulados'],
  ['salario', 'entrevista', '💰', 'Salário', 'Faixa, plano e ações.', 'salarios'],
  ['projeto', 'entrevista', '🧰', 'Portfólio', 'Problema e resultado.', 'projetos'],
  ['final', 'entrevista', '❓', 'Pergunta final', 'Pergunte ao time.', 'finais'],
  ['star', 'entrevista', '⭐', 'Entrevista STAR', 'Situação e tarefa.', 'stars'],
  ['remoto', 'entrevista', '🎤', 'Entrevista longa', 'Seis falas.', 'entrevistas'],
  ['conto', 'entrevista', '📖', 'Contar no passado', 'Duas falas.', 'contos'],
  ['livre', 'entrevista', '🙋', 'Falar de você', 'Um minuto sobre você.', 'livres'],
  ['futuro', 'entrevista', '🚀', 'Daqui a cinco anos', 'A carreira.', 'futuros'],
  ['rotina', 'cotidiano', '🏠', 'Em casa', 'Manhã, jantar e a rotina.', 'rotinas'],
  ['papo', 'cotidiano', '💬', 'Conversa livre', 'Três assuntos do dia.', 'papos'],
  ['socorro', 'cotidiano', '🩺', 'No exterior', 'A farmácia.', 'socorros'],
  ['passeio', 'cotidiano', '🚶', 'Só áudio', 'Pergunta lida em voz.', 'passeios'],
  ['social', 'cotidiano', '🍻', 'Happy hour', 'Um brinde e o Brasil.', 'sociais'],
  ['viagem', 'cotidiano', '🛫', 'Viagem a trabalho', 'Conexão e táxi.', 'viagens'],
  ['atendimento', 'cotidiano', '📞', 'Atendimento', 'Banco e hotel.', 'atendimentos'],
  ['cena', 'cotidiano', '👀', 'Descrever a cena', 'Diga a cena.', 'cenasFala'],
  ['pergunta', 'cotidiano', '❓', 'Você pergunta', 'Café e loja.', 'perguntas'],
  ['sotaque', 'pronuncia', '🎧', 'Sotaques', 'Americano, britânico e indiano.', 'sotaques'],
  ['enfase', 'pronuncia', '🎵', 'Ênfase', 'Marque a palavra forte.', 'enfases'],
  ['termo', 'pronuncia', '🔤', 'Termos técnicos', 'Cache e queue.', 'termos'],
  ['reducao', 'pronuncia', '⏩', 'Fala rápida', 'Gonna e wanna.', 'reduzidas'],
  ['numero', 'pronuncia', '🔢', 'Números, datas e preços', 'Ouça o valor.', 'numeros'],
  ['desafio', 'revisao', '📅', 'Desafio do dia', 'A sequência aumenta as frases.', 'desafios'],
  ['mistura', 'revisao', '⏱️', 'Três minutos', 'Frases dos treinos em 3 minutos.', 'misturas'],
  ['deslize', 'revisao', '🔁', 'Deslizes de fala', 'Voltam hoje.', 'revisoesFala'],
  ['dia', 'revisao', '☀️', 'Pergunta do dia', 'Outra pergunta.', 'diasPergunta'],
  ['nivel', 'revisao', '🎯', 'Teste de nível', 'Oito perguntas, A1 a B2.', ''],
  ['resumo', 'revisao', '📅', 'Resumo da semana', 'A nota desta semana.', ''],
  ['rapido', 'revisao', '⚡', 'Pensa em inglês', 'Quatro frases.', 'rapidos'],
  ['cultura', 'cotidiano', '🎬', 'Esporte, filme e série', 'Jogo e série.', 'culturas'],
  ['aumento', 'trabalho', '🏆', 'O aumento', 'Peça o aumento.', 'aumentos'],
  ['rota', 'trabalho', '🔌', 'A API', 'Endpoint e autenticação.', 'rotas'],
  ['vivo', 'trabalho', '🔥', 'Ao vivo', 'Status e ajuda.', 'vivos'],
  ['produto', 'trabalho', '📦', 'Com o produto', 'Negocie o prazo.', 'produtos'],
  ['fecho', 'entrevista', '🙋', 'Suas perguntas', 'Plantão e a vaga.', 'fechos'],
  ['espaco', 'revisao', '🔂', 'Mais erradas', 'As mais erradas.', 'espacos'],
  ['mapa', 'trabalho', '🗺️', 'O mapa', 'Arquitetura e fluxo.', 'mapas'],
  ['duro', 'trabalho', '🗣️', 'O ponto difícil', 'Dar e receber.', 'duros'],
  ['proposta', 'trabalho', '📐', 'A proposta', 'Apresente uma RFC.', 'propostas'],
  ['semana', 'revisao', '📊', 'Semana falada', 'Minutos por grupo.', ''],
  ['narrar', 'trabalho', '🎙️', 'O par narrado', 'A próxima linha.', 'narras'],
  ['banco', 'entrevista', '🗄️', 'Banco ou cache', 'Guarde os dados.', 'bancos'],
  ['recusa', 'trabalho', '🙅', 'O não educado', 'Recuse e ofereça.', 'recusas'],
  ['sprint', 'trabalho', '🖥️', 'Demo da sprint', 'Mostre o que saiu.', 'sprints'],
  ['seguro', 'trabalho', '🔐', 'A decisão segura', 'Furo e o tempo.', 'seguros'],
  ['meetup', 'cotidiano', '🎫', 'No meetup', 'Puxe o assunto.', 'meetups'],
  ['completa', 'entrevista', '🎓', 'Entrevista completa', 'Cinco treinos.', 'completas'],
  ['rodada', 'trabalho', '📝', 'A mesa da retro', 'Fato e a ação.', 'rodadas'],
  ['migra', 'trabalho', '🚚', 'A migração', 'Banco ou biblioteca.', 'migras'],
  ['estreia', 'cotidiano', '👋', 'Primeiro dia', 'Oi no time novo.', 'estreias'],
  ['foco', 'entrevista', '🧩', 'Entrevista por foco', 'O foco.', 'focos'],
  ['poker', 'trabalho', '🃏', 'A carta', 'Vote a estimativa.', 'pokers'],
  ['leigo', 'trabalho', '🧮', 'A conta da IA', 'Custo e busca nos docs.', 'leigos'],
  ['recruta', 'entrevista', '📞', 'A ligação', 'Pretensão e fuso.', 'recrutas'],
  ['culpa', 'trabalho', '🙏', 'A desculpa', 'Assuma o erro.', 'culpas'],
  ['raio', 'trabalho', '🔦', 'O relâmpago', 'Cinco minutos.', 'raios'],
  ['oferta', 'entrevista', '💻', 'A oferta', 'Equipamento e verba.', 'ofertas'],
  ['sombra', 'revisao', '🗣️', 'Sombra', 'Ouça a voz e repita.', 'sombra'],
  ['pedido', 'trabalho', '🙋', 'Não entendi', 'Peça o sotaque.', 'pedidos'],
  ['cobertura', 'trabalho', '🧪', 'A cobertura', 'Os testes.', 'coberturas'],
  ['loom', 'trabalho', '🎥', 'O vídeo', 'Um check-in curto.', 'looms'],
  ['caderno', 'revisao', '📒', 'Meu vocabulário', 'Palavras que escaparam.', 'cadernos'],
  ['grafico', 'trabalho', '📉', 'O gráfico', 'Alta, queda e a causa.', 'graficos'],
  ['handoff', 'trabalho', '🕒', 'O handoff', 'O que ficou aberto.', 'handoffs'],
  ['elevador', 'entrevista', '🚪', 'O elevador', 'Trinta segundos.', 'elevadores'],
  ['junta', 'revisao', '🗂️', 'A semana junta', 'Frases mais erradas.', 'juntas'],
  ['pista', 'trabalho', '🏁', 'O bug raro', 'Sintoma e a prova.', 'pistas'],
  ['calma', 'trabalho', '🐢', 'Com calma', 'Explique devagar.', 'calmas'],
  ['folga', 'cotidiano', '🏖️', 'A folga', 'Férias e o limite.', 'folgas'],
  ['abertas', 'entrevista', '💭', 'Perguntas abertas', 'Cinco perguntas.', 'abertas'],
  ['respeito', 'trabalho', '🏛️', 'Com respeito', 'A ideia.', 'respeitos'],
  ['debito', 'trabalho', '🧱', 'A dívida', 'Dívida e o prazo.', 'debitos'],
  ['indicacao', 'entrevista', '✉️', 'A indicação', 'A referência.', 'indicacoes'],
  ['ux', 'trabalho', '🎨', 'O contraste', 'Foco e o rótulo.', 'uxs'],
  ['forum', 'trabalho', '📣', 'O fórum', 'Descreva o problema.', 'foruns'],
  ['visto', 'entrevista', '🛂', 'O visto', 'Visto ou mudança.', 'vistos'],
  ['mes', 'revisao', '📆', 'O mês', 'Notas e minutos.', 'meses'],
  ['facil', 'trabalho', '🧭', 'O facilitador', 'Abra e feche.', 'facils'],
  ['stack', 'trabalho', '🧰', 'A escolha', 'React ou Vue, SQL.', 'stacks'],
  ['sabado', 'cotidiano', '🌦️', 'O sábado', 'Conte o fim de semana.', 'sabados'],
  ['surpresa', 'revisao', '🎁', 'Treino surpresa', 'Um treino.', 'surpresas'],
  ['brecha', 'trabalho', '🔓', 'A falha', 'O furo no review.', 'brechas'],
  ['muda', 'trabalho', '📐', 'A mudança', 'O cliente pede a tela.', 'mudas'],
  ['gaucho', 'cotidiano', '🧉', 'O chimarrão', 'Chimarrão e churrasco.', 'gauchos'],
  ['radar', 'trabalho', '📡', 'O radar', 'O alerta.', 'radares', 'dashboard'],
  ['aplauso', 'trabalho', '👏', 'O aplauso', 'Agradeça o time.', 'aplausos'],
  ['gripe', 'cotidiano', '🤒', 'A gripe', 'Avise que está doente.', 'gripes'],
  ['pm', 'trabalho', '📎', 'Com o PM', 'Negocie data e testes.', 'pms'],
  ['laudo', 'trabalho', '📄', 'O laudo', 'Causa e dono.', 'laudos'],
  ['rumo', 'trabalho', '🔭', 'O rumo', 'Feedback de carreira.', 'rumos'],
  ['acesso', 'trabalho', '🔑', 'O acesso', 'Wiki e o repositório.', 'acessos'],
  ['licenca', 'trabalho', '💳', 'A licença', 'A ferramenta paga.', 'licencas'],
  ['jargao', 'trabalho', '🧾', 'Sem jargão', 'Volta da página.', 'jargoes'],
  ['bandeira', 'trabalho', '🎚️', 'A bandeira', 'Ligue para dez por cento.', 'bandeiras'],
  ['gelo', 'trabalho', '🧊', 'O gelo', 'Sem merge hoje.', 'gelos'],
  ['limite', 'trabalho', '🚥', 'O limite', 'Cem chamadas por minuto.', 'limites'],
  ['canario', 'trabalho', '🐤', 'O canário', 'Uma máquina recebe.', 'canarios'],
  ['despedida', 'trabalho', '📭', 'A despedida', 'Fecha em junho.', 'despedidas'],
  ['repeticao', 'trabalho', '🪝', 'A repetição', 'Pode repetir.', 'repeticoes'],
  ['carga', 'trabalho', '🏋️', 'A carga', 'O teste de carga rodou.', 'cargas'],
  ['boletim', 'trabalho', '📰', 'O boletim', 'A nota lista correções.', 'boletins'],
  ['dono', 'trabalho', '🪪', 'Quem aprova', 'A pasta tem dois donos.', 'donos'],
  ['manual', 'trabalho', '📘', 'O manual', 'Leia o alerta.', 'manuais'],
  ['verde', 'trabalho', '🟢', 'O lado verde', 'O tráfego muda.', 'verdes'],
  ['certificado', 'trabalho', '🔏', 'O certificado', 'Vence na sexta.', 'certificados'],
  ['rebase', 'trabalho', '🌿', 'O rebase', 'A branch está atrás.', 'rebases'],
  ['consulta', 'trabalho', '🐌', 'A consulta', 'Leva segundos.', 'consultas'],
  ['replica', 'trabalho', '🪞', 'A réplica', 'Está atrás.', 'replicas'],
  ['ensaio', 'trabalho', '🧪', 'O ensaio', 'O teste vai para o ensaio.', 'ensaios'],
  ['disco', 'trabalho', '💽', 'O disco', 'O disco está cheio.', 'discos'],
  ['pagina', 'trabalho', '📃', 'A página', 'Mostra vinte linhas.', 'paginas'],
  ['squash', 'trabalho', '✂️', 'O squash', 'Três commits, um.', 'squashes'],
  ['circuito', 'trabalho', '🛑', 'O circuito', 'Abre depois.', 'circuitos'],
  ['job', 'trabalho', '🌙', 'O job', 'O job roda de madrugada.', 'jobs'],
  ['colheita', 'trabalho', '🍒', 'A colheita', 'Sobe sozinho.', 'colheitas'],
  ['sessao', 'trabalho', '⏳', 'A sessão', 'A sessão acaba depois.', 'sessoes'],
  ['tanque', 'trabalho', '🪣', 'O tanque', 'O tanque enche.', 'tanques'],
  ['sonda', 'trabalho', '🩺', 'A sonda', 'A sonda falhou de novo.', 'sondas'],
  ['semente', 'trabalho', '🌱', 'A semente', 'Enche o banco.', 'sementes'],
  ['registro', 'trabalho', '📋', 'O registro', 'Suba o registro.', 'registros'],
  ['rastro', 'trabalho', '🔎', 'O rastro', 'O id fica no cabeçalho.', 'rastros'],
  ['parada', 'trabalho', '🕛', 'A parada', 'Espera o relógio.', 'paradas'],
  ['pod', 'trabalho', '🫛', 'O pod', 'Reinicie só um pod.', 'pods'],
  ['lint', 'trabalho', '🧹', 'O lint', 'O lint falhou.', 'lints'],
  ['origem', 'trabalho', '🌐', 'A origem', 'O navegador bloqueia.', 'origens'],
  ['link', 'trabalho', '🔗', 'O link', 'O link assinado vale.', 'links'],
  ['cpu', 'trabalho', '🧮', 'O processador', 'Perto do teto.', 'cpus'],
  ['copia', 'trabalho', '💾', 'A cópia', 'A cópia da noite.', 'copias'],
  ['estouro', 'trabalho', '💥', 'O estouro', 'O processo estourou.', 'estouros'],
  ['impasse', 'trabalho', '🪢', 'O impasse', 'Dois se esperam.', 'impasses'],
  ['dominio', 'trabalho', '🏷️', 'O domínio', 'O nome não resolve.', 'dominios'],
  ['morta', 'trabalho', '📮', 'A carta morta', 'A carta morta guarda.', 'mortas'],
  ['ponteiro', 'trabalho', '🕰️', 'Os ponteiros', 'Os relógios diferem.', 'ponteiros'],
  ['eleicao', 'trabalho', '🗳️', 'A eleição', 'O líder antigo saiu.', 'eleicoes'],
  ['freio', 'trabalho', '🛞', 'O freio', 'A fila desacelera.', 'freios'],
  ['pausa', 'trabalho', '⌛', 'A pausa', 'A coleta parou.', 'pausas'],
  ['deriva', 'trabalho', '📄', 'A deriva', 'A configuração difere.', 'derivas'],
  ['descritor', 'trabalho', '📁', 'O descritor', 'Abriu demais.', 'descritores'],
  ['reserva', 'trabalho', '🪫', 'A reserva', 'Usou a reserva.', 'reservas'],
  ['varredura', 'trabalho', '🧵', 'A varredura', 'A tela dispara.', 'varreduras'],
  ['porta', 'trabalho', '🚪', 'A porta', 'Nenhum processo escuta.', 'portas'],
  ['inodo', 'trabalho', '📛', 'O inodo', 'Nomes livres acabaram.', 'inodos'],
  ['saida', 'trabalho', '🛎️', 'A saída', 'Espera as tarefas.', 'saidas'],
  ['manada', 'trabalho', '🐑', 'A manada', 'O cache venceu junto.', 'manadas'],
  ['gotejo', 'trabalho', '💧', 'O gotejo', 'A memória cresce.', 'gotejos'],
  ['frio', 'trabalho', '🥶', 'O frio', 'A função dorme.', 'frios'],
  ['cadeado', 'trabalho', '🔐', 'O cadeado', 'O processo tentou ler.', 'cadeados'],
  ['cota', 'trabalho', '📏', 'A cota', 'A cota fechou.', 'cotas'],
  ['ciclo', 'trabalho', '🔁', 'O ciclo', 'O serviço cai e volta.', 'ciclos'],
  ['zumbi', 'trabalho', '🧟', 'O zumbi', 'O filho terminou.', 'zumbis'],
  ['cisao', 'trabalho', '🪞', 'A cisão', 'Dois mandam juntos.', 'cisoes'],
  ['rajada', 'trabalho', '🌊', 'A rajada', 'Clientes tentam juntos.', 'rajadas'],
  ['brasa', 'trabalho', '🔥', 'A brasa', 'A chave recebe tudo.', 'brasas'],
  ['datagrama', 'trabalho', '📨', 'O datagrama', 'Dois sumiram.', 'datagramas'],
  ['passe', 'trabalho', '🎫', 'O passe', 'O passe curto venceu.', 'passes'],
  ['carimbo', 'trabalho', '🖊️', 'O carimbo', 'O carimbo mudou.', 'carimbos'],
  ['pilha', 'trabalho', '📚', 'A pilha', 'A pilha cresceu.', 'pilhas'],
  ['cano', 'trabalho', '🔧', 'O cano', 'A ponta fechou.', 'canos'],
  ['giro', 'trabalho', '🌀', 'O giro', 'O navegador girou.', 'giros'],
  ['compacta', 'trabalho', '🗜️', 'A compactação', 'Reescreveu.', 'compactas'],
  ['diario', 'trabalho', '✒️', 'O diário', 'Ocupou gigabytes.', 'diarios'],
  ['vagao', 'trabalho', '🚃', 'O vagão', 'O leitor ficou atrás.', 'vagoes'],
  ['corrida', 'trabalho', '🏎️', 'A corrida', 'Dois pedidos gravaram.', 'corridas'],
  ['indice', 'trabalho', '📇', 'O índice', 'A busca leu cada linha.', 'indices'],
  ['percentil', 'trabalho', '📐', 'O percentil', 'Cabe no topo.', 'percentis'],
  ['segredo', 'trabalho', '🕵️', 'O segredo', 'A chave apareceu no log.', 'segredos'],
  ['fantasma', 'trabalho', '👻', 'O fantasma', 'Viu a linha.', 'fantasmas'],
  ['inteiro', 'trabalho', '🔣', 'O inteiro', 'O contador estourou.', 'inteiros'],
  ['filtro', 'trabalho', '🧲', 'O filtro', 'O filtro deu um sim falso.', 'filtros'],
  ['ordem', 'trabalho', '🔀', 'A ordem', 'Chegou antes.', 'ordens'],
  ['prova', 'trabalho', '🧬', 'A prova', 'Os bytes não batem.', 'provas'],
  ['orfao', 'trabalho', '🪆', 'O órfão', 'A filha apontou o pai.', 'orfaos'],
  ['aceno', 'trabalho', '🫡', 'O aceno', 'Nunca confirmou.', 'acenos'],
  ['gasto', 'trabalho', '🪙', 'O gasto', 'O erro gastou o mês.', 'gastos'],
  ['instavel', 'trabalho', '🎲', 'O instável', 'Passou na segunda.', 'instaveis'],
  ['duplicado', 'trabalho', '📧', 'O duplicado', 'Já estava.', 'duplicados'],
  ['apagao', 'trabalho', '🔌', 'O apagão', 'Desligamos uma máquina.', 'apagoes'],
  ['replay', 'trabalho', '⏪', 'O replay', 'Os dois dias de novo.', 'replays'],
  ['eco', 'trabalho', '🔔', 'O eco', 'Chegou duas vezes.', 'ecos'],
  ['leque', 'trabalho', '🪭', 'O leque', 'Acordou quatro.', 'leques'],
  ['saga', 'trabalho', '🧵', 'A saga', 'O passo nunca terminou.', 'sagas'],
  ['caixa', 'trabalho', '📦', 'A caixa', 'Ficou na caixa.', 'caixas'],
  ['apagado', 'trabalho', '🗑️', 'O apagado', 'Ficou na tabela.', 'apagados'],
  ['espera', 'trabalho', '⏲️', 'A espera', 'A chamada parou depois.', 'esperas'],
  ['cursor', 'trabalho', '🔖', 'O cursor', 'Perdeu o lugar.', 'cursores'],
  ['fila', 'trabalho', '📥', 'A fila', 'Passou do limite.', 'filas'],
  ['disjuntor', 'trabalho', '🛑', 'O disjuntor', 'Falhas abriram.', 'disjuntores'],
  ['aluguel', 'trabalho', '🔑', 'O aluguel', 'A posse acabou.', 'alugueis'],
  ['pulso', 'trabalho', '💓', 'O pulso', 'O nó deixou de enviar.', 'pulsos'],
  ['piscina', 'trabalho', '🏊', 'A piscina', 'Ficou sem vaga.', 'piscinas'],
  ['balde', 'trabalho', '🪣', 'O balde', 'As fichas acabaram.', 'baldes'],
  ['cerca', 'trabalho', '🚧', 'A cerca', 'Um número invalidou.', 'cercas'],
  ['tremor', 'trabalho', '🫨', 'O tremor', 'A tentativa espera.', 'tremores'],
  ['portaria', 'trabalho', '🧱', 'A portaria', 'Recusou a entrada.', 'portarias'],
  ['cola', 'trabalho', '🧷', 'A cola', 'Voltou à máquina.', 'colas'],
  ['anteparo', 'trabalho', '🛟', 'O anteparo', 'Fica presa.', 'anteparos'],
  ['descarte', 'trabalho', '📤', 'O descarte', 'Descarta o pedido.', 'descartes'],
  ['cronometro', 'trabalho', '⏰', 'O cronômetro', 'Acaba no tempo.', 'cronometros'],
  ['amostra', 'trabalho', '🧫', 'A amostra', 'Guarda uma linha.', 'amostras'],
  ['nicho', 'trabalho', '🪺', 'O nicho', 'A chave ficou no nicho.', 'nichos'],
  ['lacre', 'trabalho', '🔒', 'O lacre', 'O lacre do pacote mudou.', 'lacres'],
  ['semaforo', 'trabalho', '🚦', 'O semáforo', 'As vagas acabaram.', 'semaforos'],
  ['barreira', 'trabalho', '🏁', 'A barreira', 'Ninguém segue ainda.', 'barreiras'],
  ['trinco', 'trabalho', '🪝', 'O trinco', 'O grupo sai na contagem.', 'trincos'],
  ['recuo', 'trabalho', '⏬', 'O recuo', 'A falha dobra a espera.', 'recuos'],
  ['vigia', 'trabalho', '🐕', 'O vigia', 'O processo encerra.', 'vigias'],
  ['ampulheta', 'trabalho', '🏺', 'A ampulheta', 'O passe vence.', 'ampulhetas'],
  ['carona', 'trabalho', '🚕', 'A carona', 'A confirmação viaja.', 'caronas'],
  ['veneno', 'trabalho', '☠️', 'O veneno', 'A mensagem ruim sai.', 'venenos'],
  ['farol', 'trabalho', '🗼', 'O farol', 'O sinal do serviço.', 'farois'],
  ['ancora', 'trabalho', '⚓', 'A âncora', 'Ponto fixo do estado.', 'ancoras'],
  ['malha', 'trabalho', '🕸️', 'A malha', 'O serviço fala perto.', 'malhas'],
  ['fenda', 'trabalho', '🪓', 'A fenda', 'O tráfego se divide.', 'fendas'],
  ['cofre', 'trabalho', '🏦', 'O cofre', 'A chave mora fora.', 'cofres'],
  ['audiencia', 'trabalho', '👂', 'A audiência', 'O passe vale.', 'audiencias'],
  ['revogacao', 'trabalho', '🚫', 'A revogação', 'Perde o passe.', 'revogacoes'],
  ['quorum', 'trabalho', '🗳️', 'O quórum', 'A escrita pede maioria.', 'quoruns'],
  ['maioria', 'trabalho', '✋', 'A maioria', 'A metade confirma.', 'maiorias'],
  ['arbitro', 'trabalho', '⚖️', 'O árbitro', 'O nó extra desempata.', 'arbitros'],
  ['lider', 'trabalho', '🧭', 'O líder', 'Conduz o mandato.', 'lideres'],
  ['mandato', 'trabalho', '📜', 'O mandato', 'Sobe o número.', 'mandatos'],
  ['seguidor', 'trabalho', '👣', 'O seguidor', 'Copia o registro.', 'seguidores'],
  ['orquestrador', 'trabalho', '🎼', 'O orquestrador', 'Dispara o passo.', 'orquestradores'],
  ['coreografia', 'trabalho', '💃', 'A coreografia', 'Escolhe o passo.', 'coreografias'],
  ['compensacao', 'trabalho', '↩️', 'A compensação', 'Desfaz a etapa.', 'compensacoes'],
  ['primario', 'trabalho', '🥇', 'O primário', 'Aceita a escrita.', 'primarios'],
  ['espelho', 'trabalho', '🪟', 'O espelho', 'A cópia segue.', 'espelhos'],
  ['ascensao', 'trabalho', '📈', 'A ascensão', 'A cópia vira dona.', 'ascensoes'],
  ['travessia', 'trabalho', '🌉', 'A travessia', 'Confirma.', 'travessias'],
  ['retaguarda', 'trabalho', '🗄️', 'A retaguarda', 'A página espera.', 'retaguardas'],
  ['contorno', 'trabalho', '➰', 'O contorno', 'A escrita segue.', 'contornos'],
  ['rumor', 'trabalho', '🗞️', 'O rumor', 'Os nós espalham o estado.', 'rumores'],
  ['reparo', 'trabalho', '🩹', 'O reparo', 'Conserta a cópia.', 'reparos'],
  ['deixa', 'trabalho', '🧳', 'A deixa', 'Guarda a escrita.', 'deixas'],
  ['floco', 'trabalho', '❄️', 'O floco', 'O id nasce do tempo.', 'flocos'],
  ['epoca', 'trabalho', '🗓️', 'A época', 'A geração sobe.', 'epocas'],
  ['vetor', 'trabalho', '🧮', 'O vetor', 'O nó anota a visão.', 'vetores'],
  ['sujeira', 'trabalho', '🫧', 'A sujeira', 'A leitura pega o valor.', 'sujeiras'],
  ['instantaneo', 'trabalho', '📸', 'O instantâneo', 'A consulta olha.', 'instantaneos'],
  ['serial', 'trabalho', '🔢', 'O serial', 'Cabe numa ordem só.', 'seriais'],
  ['fome', 'trabalho', '🍖', 'A fome', 'A tarefa espera a vez.', 'fomes'],
  ['inversao', 'trabalho', '🔃', 'A inversão', 'A tarefa segura.', 'inversoes'],
  ['idade', 'trabalho', '🧓', 'A idade', 'A espera sobe.', 'idades'],
  ['sidecar', 'trabalho', '🛵', 'O sidecar', 'Mora ao lado.', 'sidecars'],
  ['embaixador', 'trabalho', '🌐', 'O embaixador', 'Representa o nó.', 'embaixadores'],
  ['adaptador', 'trabalho', '🔌', 'O adaptador', 'A tradução liga.', 'adaptadores'],
  ['bizantino', 'trabalho', '🤥', 'O bizantino', 'Mente na rede.', 'bizantinos'],
  ['particao', 'trabalho', '🧱', 'A partição', 'A rede se divide.', 'particoes'],
  ['general', 'trabalho', '⚔️', 'O general', 'Dois exércitos.', 'generais'],
  ['wal', 'trabalho', '🪵', 'O wal', 'A escrita entra no log.', 'wals'],
  ['lsn', 'trabalho', '🧷', 'O lsn', 'O registro só avança.', 'lsns'],
  ['checkpoint', 'trabalho', '📍', 'O checkpoint', 'Grava um ponto.', 'checkpoints'],
  ['nonce', 'trabalho', '🎲', 'O nonce', 'O número entra uma vez.', 'nonces'],
  ['hmac', 'trabalho', '🏷️', 'O hmac', 'O selo confere.', 'hmacs'],
  ['envelope', 'trabalho', '✉️', 'O envelope', 'A chave viaja.', 'envelopes'],
  ['lease', 'trabalho', '🔑', 'O lease', 'A trava tem prazo.', 'leases'],
  ['renovacao', 'trabalho', '🔄', 'A renovação', 'A trava ganha tempo.', 'renovacoes'],
  ['vencimento', 'trabalho', '⌛', 'O vencimento', 'Solta no fim.', 'vencimentos'],
  ['outbox', 'trabalho', '📤', 'O outbox', 'A mensagem espera fora.', 'outboxes'],
  ['inbox', 'trabalho', '📥', 'O inbox', 'A mensagem entra.', 'inboxes'],
  ['relay', 'trabalho', '📮', 'O relay', 'O posto repassa a nota.', 'relays'],
  ['offset', 'trabalho', '📏', 'O offset', 'Marca a leitura.', 'offsets'],
  ['lag', 'trabalho', '🐢', 'O lag', 'O leitor fica atrás.', 'lags'],
  ['ack', 'trabalho', '✅', 'O ack', 'O leitor confirma.', 'acks'],
  ['snapshot', 'trabalho', '📷', 'O snapshot', 'A foto guarda.', 'snapshots'],
  ['restore', 'trabalho', '↩️', 'O restore', 'A foto devolve.', 'restores'],
  ['promote', 'trabalho', '🚀', 'O promote', 'A cópia vira o banco.', 'promotes'],
  ['bloom', 'trabalho', '🌸', 'O bloom', 'O filtro avisa a chave.', 'blooms'],
  ['cuco', 'trabalho', '🪺', 'O cuco', 'A chave muda de ninho.', 'cucos'],
  ['esboco', 'trabalho', '✏️', 'O esboço', 'Guarda a conta.', 'esbocos'],
  ['merkle', 'trabalho', '🌳', 'O merkle', 'A árvore resume.', 'merkles'],
  ['radix', 'trabalho', '✂️', 'O radix', 'A árvore corta.', 'radixes'],
  ['trie', 'trabalho', '🔤', 'O trie', 'A árvore guarda.', 'tries'],
  ['gossip', 'trabalho', '📣', 'O gossip', 'Os nós trocam.', 'gossips'],
  ['phi', 'trabalho', '📉', 'O phi', 'A suspeita sobe.', 'phis'],
  ['accrual', 'trabalho', '🧺', 'O accrual', 'A falha soma.', 'accruals'],
  ['hint', 'trabalho', '🔖', 'O hint', 'A dica aponta a linha.', 'hints'],
  ['vacuum', 'trabalho', '🧹', 'O vacuum', 'Devolve o espaço.', 'vacuums'],
  ['freeze', 'trabalho', '🧊', 'O freeze', 'A linha fica quieta.', 'freezes'],
  ['bitmap', 'trabalho', '🗺️', 'O bitmap', 'O mapa marca o bit.', 'bitmaps'],
  ['roaring', 'trabalho', '🦁', 'O roaring', 'Bits viram faixa.', 'roarings'],
  ['hyper', 'trabalho', '🧮', 'O hyper', 'Estima os itens.', 'hypers'],
  ['crdt', 'trabalho', '🔀', 'O crdt', 'As edições se juntam.', 'crdts'],
  ['lww', 'trabalho', '🕰️', 'O lww', 'A escrita nova vence.', 'lwws'],
  ['orset', 'trabalho', '📦', 'O orset', 'O item fica até sair.', 'orsets'],
  ['vector', 'trabalho', '🧭', 'O vector', 'Cada nó guarda.', 'vectors'],
  ['dot', 'trabalho', '⚫', 'O dot', 'O ponto nomeia.', 'dots'],
  ['causal', 'trabalho', '🔗', 'O causal', 'A causa chega antes.', 'causals'],
  ['shard', 'trabalho', '🧩', 'O shard', 'O pedaço guarda.', 'shards'],
  ['rebalance', 'trabalho', '⚖️', 'O rebalance', 'As partes trocam.', 'rebalances'],
  ['split', 'trabalho', '🪓', 'O split', 'A parte vira duas.', 'splits'],
  ['watermark', 'trabalho', '🪧', 'O watermark', 'A marca mostra.', 'watermarks'],
  ['barrier', 'trabalho', '🚧', 'O barrier', 'A barreira espera.', 'barriers'],
  ['align', 'trabalho', '📐', 'O align', 'As linhas ficam juntas.', 'aligns'],
  ['witness', 'trabalho', '👁️', 'O witness', 'A testemunha viu.', 'witnesses'],
  ['voter', 'trabalho', '🗳️', 'O voter', 'O voto entra.', 'voters'],
  ['learner', 'trabalho', '🎓', 'O learner', 'Quem aprende escuta.', 'learners'],
  ['checksum', 'trabalho', '🧾', 'O checksum', 'Confere o bloco.', 'checksums'],
  ['bulkhead', 'trabalho', '🛡️', 'O bulkhead', 'A parede isola.', 'bulkheads'],
  ['fallback', 'trabalho', '🛟', 'O fallback', 'O reserva entra.', 'fallbacks'],
  ['tombstone', 'trabalho', '🪦', 'O tombstone', 'Marca a chave.', 'tombstones'],
  ['purge', 'trabalho', '🗑️', 'O purge', 'A limpeza tira a chave.', 'purges'],
  ['reclaim', 'trabalho', '♻️', 'O reclaim', 'Volta à lista.', 'reclaims'],
  ['journal', 'trabalho', '📓', 'O journal', 'Anota a mudança.', 'journals'],
  ['segment', 'trabalho', '🗂️', 'O segment', 'Fecha o arquivo.', 'segments'],
  ['spill', 'trabalho', '💧', 'O spill', 'O excesso vai ao disco.', 'spills'],
  ['stripe', 'trabalho', '🧵', 'O stripe', 'Espalha o bloco.', 'stripes'],
  ['parity', 'trabalho', '🔁', 'O parity', 'O par recupera o dado.', 'parities'],
  ['rebuild', 'trabalho', '🔨', 'O rebuild', 'A cópia refaz o disco.', 'rebuilds'],
  ['epoch', 'trabalho', '🌅', 'O epoch', 'A época abre o termo.', 'epochs'],
  ['ballot', 'trabalho', '🗳️', 'O ballot', 'A cédula conta o voto.', 'ballots'],
  ['fence', 'trabalho', '🪵', 'A fence', 'Segura a escrita.', 'fences'],
  ['flush', 'trabalho', '🚰', 'O flush', 'A memória desce ao disco.', 'flushes'],
  ['memtable', 'trabalho', '📥', 'A memtable', 'A linha fica na tabela.', 'memtables'],
  ['extent', 'trabalho', '📚', 'O extent', 'O bloco junta as páginas.', 'extents'],
  ['manifest', 'trabalho', '📜', 'O manifest', 'Lista cada arquivo.', 'manifests'],
  ['hedge', 'trabalho', '🐇', 'O hedge', 'Cobre a espera.', 'hedges'],
  ['debounce', 'trabalho', '⏲️', 'O debounce', 'Segura o envio.', 'debounces'],
  ['sstable', 'trabalho', '🧱', 'O sstable', 'A tabela ordena a chave.', 'sstables'],
  ['latch', 'trabalho', '🔒', 'O latch', 'A trava curta segura a leitura.', 'latches'],
  ['throttle', 'trabalho', '🚥', 'O throttle', 'O ritmo limita a chamada.', 'throttles']
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

export function estadoDoNo(treino, atualId, stats) {
  if ((Number(stats?.[treino?.stat]) || 0) > 0) return 'feito';
  return treino?.id && treino.id === atualId ? 'atual' : 'bloqueado';
}

export function estrelaVisivelNoNo(estadoNo, favorito) {
  return estadoNo === 'atual' || estadoNo === 'feito' || !!favorito;
}

export function treinoContinuar(treinos, id) {
  if (!id) return null;
  return (Array.isArray(treinos) ? treinos : []).find(t => t.id === id) || null;
}

export function textoDoContinuar(treino) {
  if (!treino) return 'Nenhum treino aberto ainda.';
  return `Continuar: ${treino.titulo}.`;
}

const TETO_JS = 2380000;

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
