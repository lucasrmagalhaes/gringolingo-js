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
  ['mes', 'revisao', '📆', 'O mês', 'Notas, minutos e preenchimentos das últimas quatro semanas.', 'meses', 'mes notas minutos preenchimento semanas']
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

export function filtrarTreinos(treinos, { categoria, busca } = {}) {
  const q = normalizarBusca(busca);
  const tituloDe = id => CATEGORIAS.find(c => c.id === id)?.titulo || '';
  return (Array.isArray(treinos) ? treinos : []).filter(t => {
    if (categoria && categoria !== 'todos' && t.categoria !== categoria) return false;
    if (!q) return true;
    const texto = normalizarBusca(`${t.titulo} ${t.sub} ${t.busca || ''} ${t.categoria} ${tituloDe(t.categoria)}`);
    return texto.includes(q);
  });
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

const TETO_JS = 1500000;

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
