import { UNIDADES, MASCOTE, BADGES, NOVIDADES, VERSAO_APP, VERBOS, SUJEITOS, HISTORIAS } from './data.js';
import { mascote } from './mascote.js';
import { registrarEvento, registrarAberturaDoDia, metricasLigadas, definirMetricas } from './metricas.js';
import { estado, streakAtual, streakEmRisco, nivelInfo, itensAprendidos, itensVencidos, registrarLicao, registrarRevisao, registrarRelampago, registrarEscuta, registrarDialogo, registrarSombra, registrarFala, registrarPronuncia, registrarOuvido, registrarNivel, registrarPergunta, registrarReducao, registrarVerbo, registrarLivre, registrarTecnico, registrarIdioma, registrarPerguntaDia, registrarDeslize, registrarEntrevista, registrarConto, registrarNumero, registrarOpiniao, registrarCena, registrarRapido, registrarRelato, registrarCortesia, registrarAquecer, registrarClaro, registrarDemo, registrarPrazo, registrarStar, registrarEnfase, registrarDecisao, registrarPar, registrarPlantao, registrarRetro, registrarChegada, registrarLigacao, registrarEstimativa, registrarConsenso, registrarAtendimento, registrarGestor, registrarFinal, registrarViagem, registrarMistura, registrarLinha, registrarSlack, registrarSocial, registrarTermo, registrarSalario, registrarProjeto, registrarSotaque, registrarDesafioDia, registrarRequisito, registrarMetrica, registrarAprendizado, registrarPasseio, registrarFalha, registrarMentoria, registrarSocorro, registrarPalestra, registrarDuvida, registrarSinal, registrarSistema, registrarCodigo, registrarColega, registrarSimulado, registrarModelo, registrarFuro, registrarRotina, registrarPapo, registrarFuturo, registrarCultura, registrarAumento, registrarRota as registrarFalaRota, registrarVivo, registrarProduto, registrarFecho, registrarEspaco, registrarMapa, registrarDuro, registrarProposta, registrarNarrar, registrarBanco, registrarRecusa, registrarSprint, registrarSeguro, registrarMeetup, registrarCompleta, registrarRodada, registrarMigra, registrarEstreia, registrarFoco, registrarPoker, registrarLeigo, registrarRecruta, registrarCulpa, registrarRaio, registrarOferta, registrarPedido, registrarCobertura, registrarLoom, registrarCaderno, registrarGrafico, registrarHandoff, registrarElevador, registrarJunta, registrarPista, registrarCalma, registrarFolga, registrarAberta, registrarRespeito, registrarDebito, registrarIndicacao, registrarUx, registrarForum, registrarVisto, registrarMes, registrarFacil, registrarEscolhaStack, registrarSabado, armarSurpresa, resumoSurpresa, registrarBrecha, registrarMuda, registrarGaucho, registrarRadar, registrarAplauso, registrarGripe, registrarPm, registrarLaudo, registrarRumo, registrarAcesso, registrarLicenca, registrarJargao, registrarBandeira, registrarGelo, registrarLimite, registrarCanario, registrarDespedida, registrarRepeticao, registrarCarga, registrarBoletim, registrarDono, registrarManual, registrarVerde, registrarCertificado, registrarRebase, registrarConsulta, registrarReplica, registrarEnsaio, registrarDisco, registrarPagina, registrarSquash, registrarCircuito, registrarJob, registrarColheita, registrarSessao, registrarTanque, registrarSonda, registrarSemente, registrarRegistro, registrarRastro, registrarParada, registrarPod, registrarLint, registrarOrigem, registrarLink, registrarCpu, registrarCopia, registrarEstouro, registrarImpasse, registrarDominio, registrarMorta, registrarPonteiro, registrarEleicao, registrarFreio, registrarPausa, registrarDeriva, registrarDescritor, registrarReserva, registrarVarredura, registrarPorta, registrarInodo, registrarSaida, registrarManada, registrarGotejo, registrarFrio, registrarCadeado, alternarEstrela, estrelaLigada, marcarTreinoAberto, definirOrdemHub, marcarEspaco, resumoDesafio, definirMetaFala, definirMetaMinutos, deslizesVencidos, revisarDeslize, errosMaisComuns, agendarFrase, frasesVencidas, ativarSync, mesclarEstado, mesclarDeOutraAba, resetarEstado, limparEstadoMemoria, contaLocal, definirContaLocal, enviarAgora, xpDoDia, metaBatida, definirMeta, semanaAtual, missoesDeHoje, memorizadas, salvar, tentarReenviar, observarPendencia, temPendencia, motivoPendencia, exportarEstado, importarEstado, resumoBackup, textoResumoBackup, nomeArquivoBackup, LIMITE_BACKUP, distribuicaoDeCaixas, itensNaCaixa, historicoRecente, licoesConcluidas, definirItensExtras, palavrasFracas, palavrasDoPadrao, resumoPadroes, METAS, METAS_FALA, INTERVALOS } from './game.js';
import { sons, falar, falarSequencia, temTts, destravarAudio, vozesDisponiveis, vozAtual, definirVoz, aoCarregarVozes, velocidadeAtual, definirVelocidade, mudo, definirMudo, VELOCIDADES, falarComLocale, falarTrechos } from './audio.js';
import { gerarExercicios, gerarDificeis, gerarEscuta, gerarVerbos, exercicioFacil, montarExercicio, temFala } from './exercises.js';
import { CENARIOS, cenarioPorId, rodadasDo, avaliarResposta, avaliarEscolha, noDaCena, pontuarSombra, montarRodada, lerIa, salvarIa, apagarIa, iaPronta, lerPapo, salvarPapo, apagarPapo, pedirParceiro, mensagemDeErroIa } from './conversa.js';
import { SONS, CLIPS, somPorId, clipPorId, montarItem, corrigirClip, serieFala, resumoFala, TAXA_NORMAL, TAXA_DEVAGAR } from './pronuncia.js';
import { ITENS_NIVEL, ROTULO_NIVEL, corrigirIndice, contarAcertos, nivelDoTeste, PERGUNTAS, perguntaPorId, avaliarPergunta, REDUCOES, reducaoPorId, FRASAIS, frasalPorId, avaliarFrasal, TEMAS, temaPorId, avaliarLivre, preferirNivel, montarSessao, resumoSemana, sugestaoSemana } from './fluencia.js';
import { CENAS_TECNICAS, cenaTecnicaPorId, avaliarTecnico, IDIOMAS, idiomaPorId, avaliarIdioma, perguntaDoDia, avaliarDia } from './tecnico.js';
import { ENTREVISTA, avaliarEntrevista, CONTOS, contoPorId, avaliarConto, avaliarDeslize, NUMEROS, numeroPorId } from './ensaio.js';
import { OPINIOES, opiniaoPorId, avaliarOpiniao, CENAS_FALA, cenaPorId, avaliarCena, RAPIDOS, rapidoPorId, avaliarRapido, SEGUNDOS_RAPIDO, contarFaladas, lembreteMeta } from './opiniao.js';
import { RELATOS, relatoPorId, avaliarRelato, CORTESIAS, cortesiaPorId, avaliarCortesia, AQUECIMENTOS, aquecerPorId, avaliarAquecer, CLAROS, claroPorId, avaliarClaro } from './call.js';
import { DEMOS, demoPorId, avaliarDemo, PRAZOS, prazoPorId, avaliarPrazo, STARS, starPorId, avaliarStar, ENFASES, enfasePorId, avaliarEnfase, avaliarToque } from './palco.js';
import { DECISOES, decisaoPorId, avaliarDecisao, PARES, parPorId, avaliarPar, INCIDENTES, incidentePorId, avaliarIncidente, planoDaSemana, nomeDoTreino } from './plantao.js';
import { RETROS, retroPorId, avaliarRetro, CHEGADAS, chegadaPorId, avaliarChegada, LIGACOES, ligacaoPorId, avaliarLigacao } from './discurso.js';
import { ESTIMATIVAS, estimativaPorId, avaliarEstimativa, CONSENSOS, consensoPorId, avaliarConsenso, ATENDIMENTOS, atendimentoPorId, avaliarAtendimento, historicoFala, rotuloHistorico } from './cotidiano.js';
import { GESTORES, gestorPorId, avaliarGestor, FINAIS, finalPorId, avaliarFinal, VIAGENS, viagemPorId, avaliarViagem, catalogoFaladas, montarRevisao, avaliarRevisao, resumoDaFila, SEGUNDOS_REVISAO } from './turno.js';
import { LINHAS, linhaPorId, avaliarLinha, SLACKS, slackPorId, avaliarSlack, SOCIAIS, socialPorId, avaliarSocial, TERMOS, termoPorId, avaliarTermo } from './oficina.js';
import { SALARIOS, salarioPorId, avaliarSalario, PROJETOS, projetoPorId, avaliarProjeto, SOTAQUES as CENAS_SOTAQUE, sotaquePorId, avaliarSotaque, avaliarDesafio, montarDesafio, textoDesafio, rotuloVoz } from './vaga.js';
import { REQUISITOS, requisitoPorId, avaliarRequisito, METRICAS, metricaPorId, avaliarMetrica, APRENDIZADOS, aprendizadoPorId, avaliarAprendizado, montarPasseio, decidirPasseio, falasDaPergunta, ESPERA_RESPOSTA_MS } from './briefing.js';
import { FALHAS, falhaPorId, avaliarFalha, MENTORIAS, mentoriaPorId, avaliarMentoria, SOCORROS, socorroPorId, avaliarSocorro } from './guia.js';
import { PALESTRAS, palestraPorId, avaliarPalestra, DUVIDAS, duvidaPorId, avaliarDuvida, SINAIS, sinalPorId, avaliarSinal } from './plateia.js';
import { SISTEMAS, sistemaPorId, avaliarSistema, CODIGOS, codigoPorId, avaliarCodigo, COLEGAS, colegaPorId, avaliarColega, montarSimulado, faixaDoSimulado } from './banca.js';
import { MODELOS, modeloPorId, avaliarModelo, FUROS, furoPorId, avaliarFuro, ROTINAS, rotinaPorId, avaliarRotina, montarPapo } from './lar.js';
import { FUTUROS, futuroPorId, avaliarFuturo } from './futuro.js';
import { CULTURAS, culturaPorId, avaliarCultura, AUMENTOS, aumentoPorId, avaliarAumento, ROTAS, rotaPorId, avaliarRota } from './cultura.js';
import { diaDaTrilha, textoDoDia } from './trilha.js';
import { VIVOS, vivoPorId, avaliarVivo, PRODUTOS, produtoPorId, avaliarProduto, FECHOS, fechoPorId, avaliarFecho } from './vivo.js';
import { MAPAS, mapaPorId, avaliarMapa, DUROS, duroPorId, avaliarDuro, PROPOSTAS, propostaPorId, avaliarProposta } from './time.js';
import { NARRAS, narraPorId, avaliarNarra, BANCOS, bancoPorId, avaliarBanco, RECUSAS, recusaPorId, avaliarRecusa } from './narra.js';
import { SPRINTS, sprintPorId, avaliarSprint, SEGUROS, seguroPorId, avaliarSeguro, MEETUPS, meetupPorId, avaliarMeetup } from './cliente.js';
import { montarCompleta, faixaDaCompleta } from './completa.js';
import { MESAS, mesaPorId, avaliarMesa, MIGRAS, migraPorId, avaliarMigra, ESTREIAS, estreiaPorId, avaliarEstreia } from './rodada.js';
import { FOCOS, montarFoco, faixaDoFoco } from './foco.js';
import { POKERS, pokerPorId, avaliarPoker, LEIGOS, leigoPorId, avaliarLeigo, RECRUTAS, recrutaPorId, avaliarRecruta } from './carta.js';
import { CULPAS, culpaPorId, avaliarCulpa, RAIOS, raioPorId, avaliarRaio, OFERTAS, ofertaPorId, avaliarOferta } from './raio.js';
import { PEDIDOS, pedidoPorId, avaliarPedido, COBERTURAS, coberturaPorId, avaliarCobertura, LOOMS, loomPorId, avaliarLoom, termosDaFala, textoDaPalavra, avaliarPalavra } from './caderno.js';
import { GRAFICOS, graficoPorId, avaliarGrafico, HANDOFFS, handoffPorId, avaliarHandoff, ELEVADORES, elevadorPorId, avaliarElevador, montarJunta, textoDaJunta, avaliarPassoJunta } from './grafico.js';
import { PISTAS, pistaPorId, avaliarPista, CALMAS, calmaPorId, avaliarCalma, FOLGAS, folgaPorId, avaliarFolga, montarAbertas, avaliarAberta, textoDaAberta, textoDasAbertas, textoDoPreenchimento, textoDosConectores } from './pista.js';
import { RESPEITOS, respeitoPorId, avaliarRespeito, DEBITOS, debitoPorId, avaliarDebito, INDICACOES, indicacaoPorId, avaliarIndicacao } from './respeito.js';
import { UXS, uxPorId, avaliarUx, FORUNS, forumPorId, avaliarForum, VISTOS, vistoPorId, avaliarVisto, montarMes, textoDoMes, textoDaSemana, rotuloSemana } from './visto.js';
import { FACILS, facilPorId, avaliarFacil, ESCOLHAS, escolhaPorId, avaliarEscolhaStack, SABADOS, sabadoPorId, avaliarSabado, textoDaSurpresa, textoDoRecorde } from './facil.js';
import { BRECHAS, brechaPorId, avaliarBrecha, MUDAS, mudaPorId, avaliarMuda, GAUCHOS, gauchoPorId, avaliarGaucho } from './brecha.js';
import { RADARS, radarPorId, avaliarRadar, APLAUSOS, aplausoPorId, avaliarAplauso, GRIPES, gripePorId, avaliarGripe } from './radar.js';
import { PMS, pmPorId, avaliarPm, LAUDOS, laudoPorId, avaliarLaudo, RUMOS, rumoPorId, avaliarRumo } from './remoto.js';
import { ACESSOS, acessoPorId, avaliarAcesso, LICENCAS, licencaPorId, avaliarLicenca, JARGOES, jargaoPorId, avaliarJargao } from './equipe.js';
import { BANDEIRAS, bandeiraPorId, avaliarBandeira, GELOS, geloPorId, avaliarGelo, LIMITES, limitePorId, avaliarLimite } from './rollout.js';
import { CANARIOS, canarioPorId, avaliarCanario, DESPEDIDAS, despedidaPorId, avaliarDespedida, REPETICOES, repeticaoPorId, avaliarRepeticao } from './entrega.js';
import { CARGAS, cargaPorId, avaliarCarga, BOLETINS, boletimPorId, avaliarBoletim, DONOS, donoPorId, avaliarDono } from './carga.js';
import { MANUAIS, manualPorId, avaliarManual, VERDES, verdePorId, avaliarVerde, CERTIFICADOS, certificadoPorId, avaliarCertificado } from './manual.js';
import { REBASES, rebasePorId, avaliarRebase, CONSULTAS, consultaPorId, avaliarConsulta, REPLICAS, replicaPorId, avaliarReplica } from './atraso.js';
import { ENSAIOS, ensaioPorId, avaliarEnsaio, DISCOS, discoPorId, avaliarDisco, PAGINAS, paginaPorId, avaliarPagina } from './lote.js';
import { SQUASHES, squashPorId, avaliarSquash, CIRCUITOS, circuitoPorId, avaliarCircuito, JOBS, jobPorId, avaliarJob } from './corte.js';
import { COLHEITAS, colheitaPorId, avaliarColheita, SESSOES, sessaoPorId, avaliarSessao, TANQUES, tanquePorId, avaliarTanque } from './folha.js';
import { SONDAS, sondaPorId, avaliarSonda, SEMENTES, sementePorId, avaliarSemente, REGISTROS, registroPorId, avaliarRegistro } from './pulso.js';
import { RASTROS, rastroPorId, avaliarRastro, PARADAS, paradaPorId, avaliarParada, PODS, podPorId, avaliarPod } from './guarda.js';
import { LINTS, lintPorId, avaliarLint, ORIGENS, origemPorId, avaliarOrigem, LINKS, linkPorId, avaliarLink } from './cerca.js';
import { CPUS, cpuPorId, avaliarCpu, COPIAS, copiaPorId, avaliarCopia, ESTOUROS, estouroPorId, avaliarEstouro } from './maquina.js';
import { IMPASSES, impassePorId, avaliarImpasse, DOMINIOS, dominioPorId, avaliarDominio, MORTAS, mortaPorId, avaliarMorta } from './impasse.js';
import { PONTEIROS, ponteiroPorId, avaliarPonteiro, ELEICOES, eleicaoPorId, avaliarEleicao, FREIOS, freioPorId, avaliarFreio } from './ponteiro.js';
import { PAUSAS, pausaPorId, avaliarPausa, DERIVAS, derivaPorId, avaliarDeriva, DESCRITORES, descritorPorId, avaliarDescritor } from './pausa.js';
import { RESERVAS, reservaPorId, avaliarReserva, VARREDURAS, varreduraPorId, avaliarVarredura, PORTAS, portaPorId, avaliarPorta } from './reserva.js';
import { INODOS, inodoPorId, avaliarInodo, SAIDAS, saidaPorId, avaliarSaida, MANADAS, manadaPorId, avaliarManada } from './inodo.js';
import { GOTEJOS, gotejoPorId, avaliarGotejo, FRIOS, frioPorId, avaliarFrio, CADEADOS, cadeadoPorId, avaliarCadeado } from './gotejo.js';
import { somarSemana, textoMinutos, textoGrupo, lembreteMinutos, balancoDaSemana, textoDeHoje, textoDaSequencia, textoDaComparacao, textoDoAcerto, textoDoPico, textoDoApoio, textoDaNota, textoDosDias, textoDoRitmo, textoDaLacuna, textoDaMeta, textoDaDuracao, textoDaUltima, textoDaPrimeira, METAS_MINUTOS } from './semana.js';
import { filaEspacada, diasAoAcertar, textoVolta } from './espaco.js';
import { CATEGORIAS as GRUPOS_HUB, TREINOS, filtrarTreinos, treinoRecomendado, ordenarTreinos, filtrarEstrelas, treinoContinuar, textoDoContinuar, textoDaEstreia, textoDoGrupo, textoDaEstrela } from './hub.js';
import { podeGravar, urlDaGravacao, soltarUrl, LIMITE_GRAVACAO_MS, rotuloGravacao } from './voz.js';
import { CATEGORIAS, FRASES, frasesDaCategoria, itemDaFrase, avaliarFrase, escolherSombra, montarDesafioFala, falaConta, xpDaFala, ordenarSombra, textoDaSombra } from './frases.js';
import { dicaDoDia, dicaContextual, rotuloChave, textoDoPadrao, ROTULOS } from './dicas.js';
import { h, aleatorio, amostra, embaralhar } from './util.js';
import { trilhasVocab, progressoTrilha, palavrasVocabAprendidas, temLicaoVocab } from './vocabulario.js';
import { nuvemConfigurada, sessaoAtual, entrar, criarConta, sair, baixarProgresso, aoMudarAuth, googleAtivo, entrarComGoogle, vincularGoogle, desvincularGoogle, provedoresDaConta, traduzirErro, apagarConta, SENHA_MINIMA } from './nuvem.js';
import { registrar, logSalvo, limparLog, modoDebug, contextoDoLog } from './erros.js';
import { buscar, carregarBanco, bancoCarregado, statusDoItem, totalDoCurso } from './dicionario.js';
import { ehFavorita, alternarFavorita, itensFavoritos } from './game.js';
import { compartilharCard } from './compartilhar.js';

const app = document.getElementById('app');
let sessao = null;
let usuarioEmail = null;
let telaAtiva = 'inicial';
let syncPendente = false;
let semRede = typeof navigator !== 'undefined' && navigator.onLine === false;
let pedidoInstalar = null;
let authCarregando = false;
let geracaoAuth = 0;
let temGoogle = false;
let provedores = [];
let atalhosAtivos = null;
let timerLembrete = null;
let avisoPendente = null;
let avisoPerfil = null;
let desafioAtivo = null;
let timersDeTela = [];
let intervaloRelampago = null;
let intervaloFala = null;
let intervaloLivre = null;
let intervaloRapido = null;
let intervaloDemo = null;
let intervaloRevisao = null;
let saidaPedidaEm = 0;
let saindoDaLicao = false;
let voltandoTela = false;
let profundidade = 0;
let suprimirPop = false;

const CHAVE_DESAFIO = 'gringolingo:desafio';

// Timer que morre junto com a tela: coreografias e redirects agendados nunca
// disparam por cima de outra tela.
function timerDeTela(fn, ms) {
  const id = setTimeout(fn, ms);
  timersDeTela.push(id);
  return id;
}

let recAtivo = null;

function pararReconhecimento() {
  const rec = recAtivo;
  recAtivo = null;
  if (!rec) return;
  rec.onresult = null;
  rec.onerror = null;
  rec.onend = null;
  try {
    rec.abort();
  } catch {
    try { rec.stop(); } catch {}
  }
}

// Chamada no topo de toda função tela*: remove o listener de atalhos e mata
// timers da tela anterior. Sem isso o Enter/Escape órfão clicava em nós
// desconectados e o cronômetro do Relâmpago sobrevivia à saída.
function limparTela() {
  pararReconhecimento();
  if (atalhosAtivos) {
    document.removeEventListener('keydown', atalhosAtivos);
    atalhosAtivos = null;
  }
  timersDeTela.forEach(clearTimeout);
  timersDeTela = [];
  clearInterval(intervaloRelampago);
  intervaloRelampago = null;
  clearInterval(intervaloFala);
  intervaloFala = null;
  clearInterval(intervaloLivre);
  intervaloLivre = null;
  clearInterval(intervaloRapido);
  intervaloRapido = null;
  clearInterval(intervaloDemo);
  intervaloDemo = null;
  clearInterval(intervaloRevisao);
  intervaloRevisao = null;
  saidaPedidaEm = 0;
  saindoDaLicao = false;
  voltandoTela = false;
  avancando = false;
}

// Histórico raso: a home é o estado base e cada tela interna empilha uma
// entrada. O Voltar físico do Android deixa de fechar o app.
const TELAS_POR_NOME = {};

function registrarRota(nome) {
  const atual = history.state?.tela;
  if (atual === nome) return;
  if (atual === 'licao' || atual === 'resultado') {
    history.replaceState({ tela: nome, prof: profundidade }, '');
  } else {
    profundidade++;
    history.pushState({ tela: nome, prof: profundidade }, '');
  }
}

function normalizarHistorico() {
  if (profundidade > 0) {
    suprimirPop = true;
    const voltar = profundidade;
    profundidade = 0;
    history.go(-voltar);
  } else {
    history.replaceState({ tela: 'inicial', prof: 0 }, '');
  }
}

function voltarTela(fallback) {
  // Guarda de reentrância: toque duplo rápido no Voltar não pode disparar
  // dois history.back() e pular uma tela a mais.
  if (voltandoTela) return;
  if (profundidade > 0) {
    voltandoTela = true;
    history.back();
  } else {
    (fallback ?? telaInicial)();
  }
}

function sessaoTemProgresso() {
  return !!sessao && (sessao.respostas > 0 || sessao.idxFala > 0);
}

// Sair de uma lição em andamento pede um segundo toque (✖, Escape ou o Voltar
// físico): um toque acidental não descarta mais a sessão inteira.
function pedirSaidaDaLicao(sair) {
  if (saindoDaLicao) return;
  if (!sessaoTemProgresso() || Date.now() - saidaPedidaEm < 4000) {
    saindoDaLicao = true;
    if (temTts) speechSynthesis.cancel();
    sair();
    return;
  }
  saidaPedidaEm = Date.now();
  const btn = document.querySelector('.fechar');
  if (btn) {
    const original = btn.textContent;
    btn.textContent = 'SAIR?';
    btn.classList.add('fechar-confirmando');
    timerDeTela(() => {
      saidaPedidaEm = 0;
      btn.textContent = original;
      btn.classList.remove('fechar-confirmando');
    }, 4000);
  }
}

function aoVoltarDoNavegador(e) {
  voltandoTela = false;
  if (suprimirPop) {
    suprimirPop = false;
    return;
  }
  profundidade = e.state?.prof ?? 0;
  if (telaAtiva === 'licao' && sessaoTemProgresso() && !saindoDaLicao && Date.now() - saidaPedidaEm >= 4000) {
    profundidade++;
    history.pushState({ tela: 'licao', prof: profundidade }, '');
    pedirSaidaDaLicao(() => voltarTela());
    return;
  }
  if (telaAtiva === 'licao' && temTts) speechSynthesis.cancel();
  const render = TELAS_POR_NOME[e.state?.tela] ?? telaInicial;
  render();
}

const SVG_GOOGLE = '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

function iconeGoogle() {
  const s = h('span', { class: 'icone-google' });
  s.innerHTML = SVG_GOOGLE;
  return s;
}

document.addEventListener('pointerdown', destravarAudio, { once: true });

function licaoFeita(l) {
  return !!estado.licoes[l.id];
}

function unidadeDesbloqueada(u) {
  const i = UNIDADES.indexOf(u);
  return i === 0 || UNIDADES[i - 1].licoes.every(licaoFeita);
}

function licaoDesbloqueada(u, idx) {
  return idx === 0 || licaoFeita(u.licoes[idx - 1]);
}

function telaInicial() {
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'inicial';
  avisoPerfil = null;
  sessao = null;
  normalizarHistorico();
  const nv = nivelInfo();
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('div', { class: 'logo logo-marca', role: 'heading', 'aria-level': '1' },
        h('span', { 'aria-hidden': 'true' }, '🦜'),
        h('span', { class: 'logo-nome' }, 'GringoLingo')
      ),
      h('div', { class: 'espaco' }),
      h('div', {
        class: 'pilula' + (streakAtual() > 0 ? ' pilula-fogo' : ''),
        role: 'img',
        'aria-label': `${streakAtual()} dia${streakAtual() === 1 ? '' : 's'} seguidos de estudo`,
        title: 'Dias seguidos'
      }, '🔥 ' + streakAtual()),
      h('div', {
        class: 'pilula',
        role: 'img',
        'aria-label': `${estado.xp} XP acumulados`,
        title: 'XP total acumulado'
      },
        '⭐ ' + estado.xp,
        h('span', { class: 'pilula-unidade' }, 'XP')
      ),
      botaoTema(),
      ...pilulasDeConta()
    ),
    h('div', { class: 'card nivel-card' },
      h('span', { class: 'nivel-emoji' }, nv.emoji),
      h('div', { class: 'nivel-info' },
        h('div', { class: 'nivel-titulo' }, `Nível ${nv.numero} · ${nv.titulo}`),
        h('div', {
          class: 'progresso nivel-prog',
          role: 'progressbar',
          'aria-valuemin': '0',
          'aria-valuemax': '100',
          'aria-valuenow': String(Math.round(nv.progresso * 100)),
          'aria-label': 'Progresso do nível'
        }, h('div', { style: `width:${Math.round(nv.progresso * 100)}%` })),
        h('div', { class: 'nivel-xp' }, nv.prox ? `${estado.xp} / ${nv.prox.xp} XP` : 'Nível máximo! 👑')
      )
    ),
    bannerDesafio(),
    bannerStreak(),
    faixaOffline(),
    cartaoBoasVindas(),
    h('div', { class: 'rotulo', role: 'heading', 'aria-level': '2' }, 'HOJE'),
    cartaoMeta(),
    cartaoFala(),
    cartaoPerguntaDia(),
    cartaoDeslizes(),
    cartaoNivel(),
    faixaSemana(),
    cartaoMetaFala(),
    cartaoMinutos(),
    cartaoMissoes(),
    cartaoDicaDoDia(),
    botaoPontosFracos(),
    botaoEscuta(),
    botaoConversa(),
    cartaoPronuncia(),
    cartaoInstalar(),
    botaoRevisao(),
    botaoMinhaLista(),
    botaoRelampago(),
    botaoVerbos(),
    botaoVocabulario(),
    botaoDicionario(),
    h('div', { class: 'rotulo', role: 'heading', 'aria-level': '2' }, 'TRILHA'),
    ...UNIDADES.map(cartaoUnidade)
  );
  focarTela();
}

function botaoPerfil() {
  return h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Seu perfil', title: 'Seu perfil', onclick: telaPerfil }, '👤');
}

function pilulasDeConta() {
  if (!nuvemConfigurada) return [botaoPerfil()];
  if (authCarregando) return [h('div', { class: 'pilula', title: 'Conectando na nuvem…' }, '☁️ …'), botaoPerfil()];
  if (!usuarioEmail) {
    return [
      h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Entrar', onclick: () => telaLogin() }, '🔑 Entrar'),
      botaoPerfil()
    ];
  }
  const apelido = usuarioEmail.split('@')[0];
  return [h('button', {
    class: 'pilula btn-perfil pilula-conta' + (syncPendente ? ' pendente' : ''),
    type: 'button',
    'aria-label': `Perfil de ${usuarioEmail}${syncPendente ? '. Progresso ainda não sincronizado' : ''}`,
    title: syncPendente ? 'Progresso ainda não sincronizado. Abra o perfil' : usuarioEmail,
    onclick: telaPerfil
  },
    h('span', { 'aria-hidden': 'true' }, syncPendente ? '⚠️' : '☁️'),
    h('span', { class: 'pilula-nome' }, apelido)
  )];
}

function bannerStreak() {
  if (!streakEmRisco()) return '';
  return h('div', { class: 'banner-streak' },
    h('span', {}, '🔥'),
    h('span', {}, `Sua sequência de ${streakAtual()} dia${streakAtual() > 1 ? 's' : ''} vence hoje! Uma lição salva ela.`)
  );
}

function cartaoMeta() {
  const feito = xpDoDia();
  const pct = Math.min(100, Math.round(feito / estado.meta * 100));
  const pronto = metaBatida();
  const card = h('div', { class: 'card meta-card' + (pronto ? ' meta-pronta' : '') },
    h('span', { class: 'meta-emoji' }, pronto ? '🎉' : '🎯'),
    h('div', { class: 'meta-info' },
      h('div', { class: 'meta-titulo' }, pronto ? 'Meta do dia batida!' : 'Meta do dia'),
      h('div', {
        class: 'progresso meta-prog',
        role: 'progressbar',
        'aria-valuemin': '0',
        'aria-valuemax': String(estado.meta),
        'aria-valuenow': String(Math.min(feito, estado.meta)),
        'aria-label': 'XP de hoje'
      }, h('div', { style: `width:${pct}%` })),
      h('div', { class: 'meta-xp' }, `${feito} / ${estado.meta} XP de hoje`)
    ),
    h('div', { class: 'metas', role: 'group', 'aria-label': 'Escolher meta diária de XP' },
      METAS.map(m => h('button', {
        class: 'meta-opcao' + (m === estado.meta ? ' ativa' : ''),
        type: 'button',
        'aria-pressed': m === estado.meta ? 'true' : 'false',
        title: `Meta de ${m} XP por dia`,
        onclick() {
          definirMeta(m);
          card.replaceWith(cartaoMeta());
        }
      }, String(m)))
    )
  );
  return card;
}

function cartaoMetaFala() {
  const hojeIso = diaLocalAgora();
  const n = contarFaladas(estado.painel, hojeIso);
  const meta = estado.metaFala || 3;
  const pronto = n >= meta;
  const card = h('div', { class: 'card meta-card meta-fala' + (pronto ? ' meta-pronta' : '') },
    h('span', { class: 'meta-emoji' }, pronto ? '🎉' : '🗣️'),
    h('div', { class: 'meta-info' },
      h('div', { class: 'meta-titulo' }, pronto ? 'Meta de fala da semana' : 'Falas desta semana'),
      h('div', { class: 'meta-xp' }, lembreteMeta(n, meta, hojeIso)),
      h('p', { class: 'ia-aviso' }, 'O lembrete fica nesta tela. O app não pede aviso do celular.'),
      h('button', { class: 'btn btn-verde meta-fala-acao', type: 'button', onclick: telaRapidos }, 'PENSAR EM INGLÊS')
    ),
    h('div', { class: 'metas', role: 'group', 'aria-label': 'Escolher meta semanal de falas' },
      METAS_FALA.map(m => h('button', {
        class: 'meta-opcao' + (m === meta ? ' ativa' : ''),
        type: 'button',
        'aria-pressed': m === meta ? 'true' : 'false',
        title: `Meta de ${m} falas na semana`,
        onclick() {
          definirMetaFala(m);
          card.replaceWith(cartaoMetaFala());
        }
      }, String(m)))
    )
  );
  return card;
}

function cartaoMinutos() {
  const hojeIso = diaLocalAgora();
  const soma = somarSemana(estado.painel, hojeIso);
  const aviso = lembreteMinutos(soma.minutos, estado.metaMinutos, hojeIso);
  return h('div', { class: 'card meta-card', id: 'lembrete-minutos' },
    h('span', { class: 'meta-emoji' }, '📊'),
    h('div', { class: 'meta-info' },
      h('div', { class: 'meta-titulo' }, 'Minutos desta semana'),
      h('div', { class: 'meta-xp' }, aviso),
      h('p', { class: 'ia-aviso' }, 'O lembrete fica nesta tela. O app não pede aviso do celular.'),
      h('button', { class: 'btn btn-verde', type: 'button', onclick: telaPainel }, 'ABRIR A SEMANA')
    )
  );
}

function faixaSemana() {
  if (!estado.stats.licoes) return '';
  const dias = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const nomes = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];
  return h('div', { class: 'semana', role: 'list', 'aria-label': 'XP desta semana' },
    semanaAtual().map((d, i) => h('div', {
      class: 'semana-dia' + (d.xp ? ' feito' : '') + (d.hoje ? ' hoje' : '') + (d.futuro ? ' futuro' : ''),
      role: 'listitem',
      'aria-label': `${nomes[i]}${d.hoje ? ' (hoje)' : ''}: ${d.xp} XP`,
      title: `${d.data}: ${d.xp} XP`
    },
      h('span', { class: 'semana-letra', 'aria-hidden': 'true' }, dias[i]),
      h('span', { class: 'semana-bolinha', 'aria-hidden': 'true' }, d.xp ? '🔥' : '·')
    ))
  );
}

function diaLocalAgora() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function cartaoDicaDoDia() {
  const dia = diaLocalAgora();
  if (localStorage.getItem('gringolingo:dica-dia') === dia) return '';
  const dica = dicaDoDia(dia);
  const card = h('div', { class: 'card dica-dia' },
    h('div', { class: 'dica-dia-topo' },
      h('div', { class: 'nivel-titulo' }, '💡 Dica do dia'),
      h('button', {
        class: 'fechar',
        type: 'button',
        'aria-label': 'Esconder a dica de hoje',
        onclick() {
          localStorage.setItem('gringolingo:dica-dia', dia);
          card.remove();
        }
      }, '✖')
    ),
    h('div', { class: 'dica-dia-titulo' }, dica.titulo),
    h('p', { class: 'dica-dia-corpo' }, dica.corpo)
  );
  return card;
}

function botaoPontosFracos() {
  const fracos = palavrasFracas(itensAprendidos());
  const padroes = resumoPadroes(1);
  if (!fracos.length && !padroes.length) return '';
  const topo = fracos[0];
  const sub = topo
    ? `${fracos.length} palavra${fracos.length > 1 ? 's' : ''} para reforçar. A que mais volta: ${topo.item.en}.`
    : 'Padrões de erro que mais voltam, cada um com um treino.';
  return h('button', { class: 'card revisao pontos-fracos', type: 'button', onclick: telaPontosFracos },
    h('span', { class: 'revisao-emoji' }, '🧭'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Pontos fracos'),
      h('div', { class: 'revisao-sub' }, sub)
    ),
    h('span', { class: 'revisao-seta' }, '›')
  );
}

function iniciarPontosFracos() {
  const aprendidos = itensAprendidos();
  const fracos = palavrasFracas(aprendidos);
  const itens = fracos.slice(0, 8).map(f => f.item);
  if (!itens.length) return;
  const fila = gerarExercicios(itens, aprendidos, Math.min(8, Math.max(4, itens.length * 2)));
  sessao = {
    tipo: 'revisao', pool: aprendidos, fila, itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map(), deslizes: []
  };
  telaExercicio();
}

function cartaoMissoes() {
  if (!estado.stats.licoes) return '';
  const missoes = missoesDeHoje();
  return h('div', { class: 'card missoes-card' },
    h('div', { class: 'missoes-titulo' }, '🎯 Missões de hoje'),
    ...missoes.map(m => h('div', { class: 'missao' + (m.concluida ? ' concluida' : '') },
      h('span', { class: 'missao-emoji' }, m.concluida ? '✅' : m.emoji),
      h('div', { class: 'missao-corpo' },
        h('div', { class: 'missao-nome' }, m.titulo),
        h('div', { class: 'progresso missao-prog' }, h('div', { style: `width:${Math.round(m.valor / m.alvo * 100)}%` }))
      ),
      h('span', { class: 'missao-xp' }, '+' + m.xp)
    ))
  );
}

function cartaoBoasVindas() {
  if (estado.xp > 0 || estado.stats.licoes || estado.nivelFala) return '';
  return h('div', { class: 'card boas-vindas' },
    h('div', { class: 'boas-emoji' }, mascote('feliz', 64)),
    h('div', { class: 'boas-texto' },
      h('div', { class: 'boas-titulo' }, 'Por onde começar'),
      h('div', { class: 'boas-sub' }, 'Uma lição curta, um teste de nível ou a pergunta do dia. Dá para trocar depois. Tudo fica neste aparelho.')
    ),
    h('div', { class: 'boas-acoes' },
      h('button', { class: 'btn btn-verde', type: 'button', onclick: () => iniciarLicao(UNIDADES[0], UNIDADES[0].licoes[0]) }, 'PRIMEIRA LIÇÃO'),
      h('button', { class: 'btn btn-branco', type: 'button', onclick: telaNivel }, 'TESTE DE NÍVEL'),
      h('button', { class: 'btn btn-branco', type: 'button', onclick: telaPerguntaDia }, 'PERGUNTA DO DIA')
    )
  );
}

function botaoMinhaLista() {
  const favoritas = itensFavoritos();
  if (!favoritas.length) return '';
  return h('button', { class: 'card revisao minha-lista', type: 'button', onclick: iniciarMinhaLista },
    h('span', { class: 'revisao-emoji' }, '⭐'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Minha Lista'),
      h('div', { class: 'revisao-sub' }, `${favoritas.length} palavra${favoritas.length > 1 ? 's' : ''} que você separou. Bora treinar?`)
    ),
    h('span', { class: 'revisao-seta' }, '⚡')
  );
}

function iniciarMinhaLista() {
  const favoritas = itensFavoritos();
  if (!favoritas.length) return;
  const pool = [...favoritas, ...itensAprendidos()];
  const alvo = favoritas.slice().sort((a, b) => {
    const ax = estado.itens[a.en]?.proxima ?? '';
    const bx = estado.itens[b.en]?.proxima ?? '';
    return ax < bx ? -1 : ax > bx ? 1 : 0;
  }).slice(0, 8);
  const fila = gerarExercicios(alvo, pool, Math.min(8, alvo.length * 2), palavrasNovas(alvo));
  sessao = {
    tipo: 'revisao', pool, fila, itens: alvo,
    idx: 0, planejados: semApresentacoes(fila), acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function jaInstalado() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function pareceIOS() {
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function faixaOffline() {
  if (!semRede) return '';
  return h('div', { class: 'faixa-offline', role: 'status' }, 'Sem internet agora. As lições e o seu progresso continuam neste aparelho.');
}

function cartaoInstalar() {
  if (jaInstalado() || localStorage.getItem('gringolingo:ocultar-instalar') === '1') return '';
  if (pedidoInstalar) {
    return h('div', { class: 'card instalar-card' },
      h('div', { class: 'revisao-titulo' }, '📥 Instalar o app'),
      h('p', { class: 'dica-dia-corpo' }, 'Fica no celular e abre em tela cheia. As lições continuam offline.'),
      h('div', { class: 'instalar-botoes' },
        h('button', {
          class: 'btn btn-verde',
          onclick: async () => {
            pedidoInstalar.prompt();
            try { await pedidoInstalar.userChoice; } catch {}
            pedidoInstalar = null;
            if (telaAtiva === 'inicial') telaInicial();
          }
        }, 'INSTALAR'),
        h('button', {
          class: 'btn btn-branco',
          onclick() {
            localStorage.setItem('gringolingo:ocultar-instalar', '1');
            if (telaAtiva === 'inicial') telaInicial();
          }
        }, 'AGORA NÃO')
      )
    );
  }
  if (!pareceIOS()) return '';
  return h('div', { class: 'card instalar-card' },
    h('div', { class: 'revisao-titulo' }, '📥 Instalar no iPhone'),
    h('p', { class: 'dica-dia-corpo' }, 'Toque em Compartilhar e depois em Adicionar à Tela de Início. O app abre sozinho e segue offline.'),
    h('button', {
      class: 'btn btn-branco',
      onclick() {
        localStorage.setItem('gringolingo:ocultar-instalar', '1');
        if (telaAtiva === 'inicial') telaInicial();
      }
    }, 'ENTENDI')
  );
}

function botaoEscuta() {
  if (itensAprendidos().length < 4) return '';
  if (!temTts) {
    return h('div', { class: 'card revisao escuta-off' },
      h('span', { class: 'revisao-emoji' }, '👂'),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, 'Escuta'),
        h('div', { class: 'revisao-sub' }, 'Este aparelho não tem voz em inglês. A escuta volta quando a voz existir.')
      )
    );
  }
  const recorde = estado.stats.recordeEscuta ?? 0;
  const sub = temFala
    ? 'Ouça a frase e escreva, ou repita no microfone.'
    : 'Ouça a frase e escreva. Sem microfone neste navegador.';
  return h('button', { class: 'card revisao escuta-atalho', type: 'button', onclick: iniciarEscuta },
    h('span', { class: 'revisao-emoji' }, '👂'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Escuta'),
      h('div', { class: 'revisao-sub' }, recorde ? `${sub} Recorde: ${recorde} acertos.` : sub)
    ),
    h('span', { class: 'revisao-seta' }, '🔊')
  );
}

function iniciarEscuta() {
  if (!temTts) return;
  const aprendidos = itensAprendidos();
  if (aprendidos.length < 4) return;
  const saldo = new Map(palavrasFracas(aprendidos).map(f => [f.item.en, f.saldo]));
  const vencidos = new Set(itensVencidos().map(i => i.en));
  const ordenados = [...aprendidos].sort((a, b) => {
    const vence = (vencidos.has(b.en) ? 1 : 0) - (vencidos.has(a.en) ? 1 : 0);
    if (vence) return vence;
    return (saldo.get(b.en) ?? 0) - (saldo.get(a.en) ?? 0);
  });
  const itens = ordenados.slice(0, 6);
  const fila = gerarEscuta(itens, Math.min(6, Math.max(4, itens.length)));
  sessao = {
    tipo: 'escuta', pool: aprendidos, fila, itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map(), deslizes: []
  };
  telaExercicio();
}

function iniciarCaixa(indice) {
  const itens = itensNaCaixa(indice).slice(0, 8);
  if (!itens.length) return;
  const pool = itensAprendidos();
  const fila = gerarExercicios(itens, pool, Math.min(8, Math.max(4, itens.length)));
  sessao = {
    tipo: 'revisao', pool, fila, itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map(), deslizes: []
  };
  telaExercicio();
}

function botaoRelampago() {
  if (itensAprendidos().length < 8) return '';
  const recorde = estado.stats.recordeRelampago ?? 0;
  return h('button', { class: 'card revisao relampago-atalho', type: 'button', onclick: iniciarRelampago },
    h('span', { class: 'revisao-emoji' }, '⚡'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Relâmpago'),
      h('div', { class: 'revisao-sub' }, recorde
        ? `60 segundos de respostas rápidas. Seu recorde é ${recorde}`
        : '60 segundos de respostas rápidas. Quantas você acerta?')
    ),
    h('span', { class: 'revisao-seta' }, '⏱️')
  );
}

function botaoVerbos() {
  if (!estado.licoes.b1) return '';
  return h('button', { class: 'card revisao verbos-atalho', type: 'button', onclick: iniciarVerbos },
    h('span', { class: 'revisao-emoji' }, '🔤'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Oficina de Verbos'),
      h('div', { class: 'revisao-sub' }, 'Treine o -s da terceira pessoa: he works, she studies…')
    ),
    h('span', { class: 'revisao-seta' }, '⚡')
  );
}

function iniciarVerbos() {
  const fila = gerarVerbos(VERBOS, SUJEITOS, 10);
  sessao = {
    tipo: 'revisao', verbos: true, pool: fila.map(f => f.item), fila, itens: [],
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function iniciarRelampago() {
  const aprendidos = itensAprendidos();
  sessao = {
    tipo: 'relampago', pool: aprendidos, itens: aprendidos,
    fila: [], idx: 0, planejados: 0, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map(),
    fim: Date.now() + 60000
  };
  telaRelampago();
}

function telaRelampago() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'licao';
  registrarRota('licao');
  const s = sessao;
  const item = aleatorio(s.pool);
  const ex = exercicioFacil(item, s.pool);
  const barra = h('div', { class: 'progresso barra-licao barra-tempo' }, h('div', { style: 'width:100%' }));
  const placar = h('div', { class: 'combo' }, '⚡ ' + s.acertos);
  const areaEx = h('div', { class: 'area-exercicio' });
  app.innerHTML = '';
  app.append(
    h('div', { class: 'licao-topo' },
      h('button', {
        class: 'fechar', type: 'button', 'aria-label': 'Sair',
        onclick: () => pedirSaidaDaLicao(() => voltarTela())
      }, '✖'),
      barra,
      placar
    ),
    areaEx
  );
  const ctrl = montarExercicio(ex, {
    aoMudar() {},
    aoAuto() {},
    aoEnter() {}
  });
  areaEx.append(ctrl.el);
  const responder = (botao) => {
    if (s.encerrado) return;
    const res = ctrl.corrigir();
    s.respostas++;
    const anterior = s.resultados.get(item.en);
    s.resultados.set(item.en, { en: item.en, acertou: (anterior ? anterior.acertou : true) && res.correto });
    if (res.correto) {
      s.acertos++;
      s.combo++;
      s.comboMax = Math.max(s.comboMax, s.combo);
      if (s.combo % 5 === 0) s.fim += 5000;
      sons.acerto();
    } else {
      s.combo = 0;
      sons.erro();
    }
    anotarDeslize(s, item, res);
    if (res.tutor && (!res.correto || res.quase)) {
      areaEx.append(h('div', { class: 'feedback-nota relampago-dica', role: 'status' },
        h('strong', {}, res.tutor.titulo + '. '),
        res.tutor.porque
      ));
    }
    const pausa = res.correto && !res.quase ? 260 : 1800;
    timerDeTela(() => {
      if (!s.encerrado) telaRelampago();
    }, pausa);
  };
  areaEx.querySelectorAll('.opcao').forEach(botao => {
    botao.addEventListener('click', () => responder(botao), { once: true });
  });
  // Exercício de digitar (repescagem de pool pequeno): corrige no Enter.
  const entrada = areaEx.querySelector('.entrada');
  if (entrada) {
    entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter' && entrada.value.trim() && !entrada.disabled) responder();
    });
  }
  intervaloRelampago = setInterval(() => {
    const restante = Math.max(0, s.fim - Date.now());
    barra.firstElementChild.style.width = Math.min(100, restante / 60000 * 100) + '%';
    if (restante <= 0) {
      clearInterval(intervaloRelampago);
      intervaloRelampago = null;
      s.encerrado = true;
      finalizarRelampago();
    }
  }, 100);
}

function finalizarRelampago() {
  const s = sessao;
  limparTela();
  telaAtiva = 'resultado';
  registrarRota('resultado');
  const recordeAntes = estado.stats.recordeRelampago ?? 0;
  const novoRecorde = s.acertos > recordeAntes;
  s.xp = Math.min(25, s.acertos * 2);
  const evento = registrarRelampago({
    acertos: s.acertos, respostas: s.respostas, comboMax: s.comboMax, xp: s.xp,
    agendamentos: [...s.resultados.values()],
    deslizes: s.deslizes ?? []
  });
  app.innerHTML = '';
  app.append(
    h('div', { class: 'resultado' },
      h('div', { class: 'emojao mascote-festa' }, mascote(novoRecorde ? 'coroa' : 'feliz', 132)),
      h('h1', {}, novoRecorde ? 'Novo recorde!' : 'Tempo esgotado!'),
      h('div', { class: 'resultado-frase' }, novoRecorde
        ? `Você bateu seu recorde anterior de ${recordeAntes} acertos`
        : `Seu recorde continua sendo ${Math.max(recordeAntes, s.acertos)}`),
      h('div', { class: 'pilulas-stats' },
        h('div', { class: 'pilula' }, `⚡ ${s.acertos} acertos`),
        h('div', { class: 'pilula' }, `🎯 ${s.respostas ? Math.round(s.acertos / s.respostas * 100) : 0}%`),
        h('div', { class: 'pilula' }, `⭐ +${s.xp} XP`),
        evento.streakNovo ? h('div', { class: 'pilula pop destaque' }, `🔥 ${evento.streakNovo} dias seguidos!`) : '',
        evento.bateuMeta ? h('div', { class: 'pilula pop destaque' }, '🎯 Meta do dia batida!') : ''
      ),
      evento.badges?.length ? h('div', { class: 'novas-badges' },
        h('div', { class: 'secao-titulo' }, '🏅 Conquista nova!'),
        h('div', { class: 'badges-grid centrada' }, evento.badges.map(b => h('div', { class: 'badge-card nova' },
          h('div', { class: 'badge-emoji' }, b.emoji),
          h('div', { class: 'badge-nome' }, b.nome)
        )))
      ) : '',
      h('div', { class: 'resultado-botoes' },
        h('button', { class: 'btn btn-branco', onclick: iniciarRelampago }, 'DE NOVO'),
        h('button', { class: 'btn btn-verde', onclick: () => telaInicial() }, 'CONTINUAR')
      )
    )
  );
  if (novoRecorde) confete();
  sons.fanfarra();
  if (evento.subiuNivel) timerDeTela(() => overlayNivel(evento.subiuNivel), 900);
  focarTela();
}

function botaoVocabulario() {
  if (!estado.stats.licoes) return '';
  const feitas = Object.keys(estado.licoes).filter(k => k.startsWith('vocab:')).length;
  return h('button', { class: 'card revisao vocab-atalho', type: 'button', onclick: () => telaVocabulario() },
    h('span', { class: 'revisao-emoji' }, '🚀'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Expansão de Vocabulário'),
      h('div', { class: 'revisao-sub' }, feitas
        ? `${feitas} liç${feitas === 1 ? 'ão' : 'ões'} de vocabulário feitas. Bora buscar mais?`
        : 'As 2.700+ palavras mais usadas do inglês, em lições de 7')
    ),
    h('span', { class: 'revisao-seta' }, '📚')
  );
}

async function telaVocabulario() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'vocabulario';
  registrarRota('vocabulario');
  app.innerHTML = '';
  const area = h('div', {});
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Voltar', onclick: () => voltarTela() }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo', role: 'heading', 'aria-level': '1' }, '🚀 Expansão')
    ),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, 'Todo o vocabulário que importa'),
      h('div', { class: 'revisao-sub' }, 'As palavras mais frequentes do inglês além do curso, em quatro trilhas. Cada palavra nova é apresentada antes de ser cobrada, e depois entra na sua agenda de revisão como qualquer outra.')
    ),
    area
  );
  area.append(...Array.from({ length: 4 }, () => esqueleto()));
  const banco = await carregarBanco();
  if (telaAtiva !== 'vocabulario') return;
  area.innerHTML = '';
  if (!banco.length) {
    area.append(h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, '📡 O banco de palavras não carregou'),
      h('div', { class: 'revisao-sub' }, 'Sem conexão? As trilhas precisam do banco do dicionário na primeira vez.'),
      h('div', { class: 'vocab-botoes' }, h('button', { class: 'btn btn-azul', onclick: () => telaVocabulario() }, 'TENTAR DE NOVO'))
    ));
    return;
  }
  trilhasVocab(banco).forEach(t => {
    const p = progressoTrilha(t, estado.licoes);
    const pct = p.total ? Math.round(p.feitas / p.total * 100) : 0;
    area.append(h('div', { class: 'card vocab-trilha', style: `--cor-unidade:${t.cor}` },
      h('div', { class: 'vocab-cab' },
        h('span', { class: 'revisao-emoji' }, t.emoji),
        h('div', { class: 'revisao-textos' },
          h('div', { class: 'revisao-titulo' }, t.titulo),
          h('div', { class: 'revisao-sub' }, t.sub)
        )
      ),
      h('div', { class: 'progresso vocab-prog' }, h('div', { style: `width:${pct}%` })),
      h('div', { class: 'vocab-resumo' },
        h('span', {}, `${p.palavras} de ${t.palavras.length} palavras`),
        h('span', {}, `${p.feitas}/${p.total} lições`)
      ),
      h('div', { class: 'vocab-botoes' },
        p.proxima ? h('button', {
          class: 'btn btn-verde',
          onclick: () => iniciarLicaoVocab(p.proxima, t.palavras)
        }, p.feitas ? 'CONTINUAR' : 'COMEÇAR') : h('span', { class: 'dic-tag' }, '🏆 Trilha completa!'),
        p.ultimaFeita ? h('button', {
          class: 'btn btn-branco',
          onclick: () => iniciarLicaoVocab(p.ultimaFeita, t.palavras)
        }, 'REVER') : '',
        p.proxima ? h('span', { class: 'vocab-proxima', lang: 'en' }, p.proxima.titulo) : ''
      )
    ));
  });
}

function iniciarLicaoVocab(licao, poolTrilha) {
  const pool = [...licao.itens, ...amostra(poolTrilha, 30)];
  const fila = gerarExercicios(licao.itens, pool, Math.max(8, Math.ceil(licao.itens.length * 1.2)), palavrasNovas(licao.itens));
  sessao = {
    tipo: 'licao', vocabLicao: licao, vocabPool: poolTrilha, licao, pool, fila, itens: licao.itens,
    idx: 0, planejados: semApresentacoes(fila), acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function atualizarItensExtras() {
  if (!temLicaoVocab(estado.licoes)) {
    definirItensExtras([]);
    return;
  }
  carregarBanco().then(banco => definirItensExtras(palavrasVocabAprendidas(banco, estado.licoes)));
}

function botaoDicionario() {
  const extra = bancoCarregado()?.length;
  return h('button', { class: 'card dicionario-atalho', type: 'button', onclick: () => telaDicionario() },
    h('span', { class: 'revisao-emoji' }, '📖'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Dicionário'),
      h('div', { class: 'revisao-sub' }, extra
        ? `Busque em inglês ou português entre ${totalDoCurso() + extra} palavras`
        : 'Busque qualquer palavra em inglês ou português')
    ),
    h('span', { class: 'revisao-seta' }, '🔎')
  );
}

function telaDicionario() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'dicionario';
  registrarRota('dicionario');
  app.innerHTML = '';
  const busca = h('input', {
    class: 'entrada busca-dic',
    type: 'search',
    placeholder: 'Buscar em inglês ou português…',
    autocomplete: 'off',
    autocapitalize: 'off',
    spellcheck: 'false',
    'aria-label': 'Buscar palavra'
  });
  const lista = h('div', { class: 'dic-lista', role: 'list' });
  const contador = h('div', { class: 'dic-contador', role: 'status', 'aria-live': 'polite' });
  const filtros = ['todas', 'curso', 'aprendidas', 'revisar'];
  const nomes = { todas: 'Todas', curso: 'Do curso', aprendidas: 'Aprendidas', revisar: 'Revisar' };
  let filtro = 'todas';
  const chips = h('div', { class: 'metas dic-filtros', role: 'group', 'aria-label': 'Filtrar palavras' },
    filtros.map(f => {
      const b = h('button', {
        class: 'meta-opcao' + (f === filtro ? ' ativa' : ''),
        type: 'button',
        'aria-pressed': f === filtro ? 'true' : 'false',
        onclick() {
          filtro = f;
          [...chips.children].forEach(c => {
            const ativo = c.textContent === nomes[f];
            c.classList.toggle('ativa', ativo);
            c.setAttribute('aria-pressed', ativo ? 'true' : 'false');
          });
          desenhar();
        }
      }, nomes[f]);
      return b;
    })
  );
  function desenhar() {
    const achados = buscar(busca.value, filtro);
    lista.innerHTML = '';
    contador.textContent = achados.length
      ? `${achados.length}${achados.length === 60 ? '+' : ''} resultado${achados.length > 1 ? 's' : ''}`
      : '';
    if (!achados.length) {
      lista.append(vazio(busca.value, filtro, () => {
        busca.value = '';
        desenhar();
        busca.focus();
      }));
      return;
    }
    achados.forEach((v, i) => {
      const el = verbete(v);
      if (i < 10 && !reduzirMovimento()) el.style.animationDelay = i * 0.03 + 's';
      lista.append(el);
    });
  }
  let timerBusca = null;
  busca.addEventListener('input', () => {
    clearTimeout(timerBusca);
    timerBusca = timerDeTela(desenhar, 120);
  });
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Voltar', onclick: () => voltarTela() }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo', role: 'heading', 'aria-level': '1' }, '📖 Dicionário')
    ),
    h('div', { class: 'campo-busca' },
      h('span', { class: 'campo-busca-icone', 'aria-hidden': 'true' }, '🔎'),
      busca
    ),
    chips,
    contador,
    lista
  );
  if (!bancoCarregado()) {
    contador.textContent = 'Carregando o banco de palavras…';
    lista.append(...Array.from({ length: 6 }, () => esqueleto()));
    carregarBanco().then(() => {
      if (telaAtiva === 'dicionario') desenhar();
    });
  } else {
    desenhar();
  }
  busca.focus({ preventScroll: true });
}

function esqueleto() {
  return h('div', { class: 'dic-item esqueleto', 'aria-hidden': 'true' },
    h('div', { class: 'esq-bloco esq-som' }),
    h('div', { class: 'dic-corpo' },
      h('div', { class: 'esq-bloco esq-linha1' }),
      h('div', { class: 'esq-bloco esq-linha2' })
    ),
    h('div', { class: 'esq-bloco esq-tag' })
  );
}

const VAZIOS = {
  aprendidas: { emoji: '🌱', titulo: 'Nenhuma palavra aprendida ainda', sub: 'Complete uma lição e elas aparecem aqui com o status da sua memória.' },
  revisar: { emoji: '🎉', titulo: 'Nada para revisar!', sub: 'Sua memória está em dia. Volte amanhã ou avance na trilha.' },
  curso: { emoji: '🔎', titulo: 'Nada no curso com esse termo', sub: 'Tente o filtro "Todas" para procurar no dicionário completo.' },
  todas: { emoji: '🤔', titulo: 'Nada encontrado', sub: 'Confira a grafia ou tente outra palavra. A busca aceita português e inglês.' }
};

function vazio(termo, filtro, aoLimpar) {
  const conf = termo ? (filtro === 'curso' ? VAZIOS.curso : VAZIOS.todas) : VAZIOS[filtro] ?? VAZIOS.todas;
  return h('div', { class: 'estado-vazio' },
    h('div', { class: 'vazio-emoji' }, mascote(termo ? 'pensando' : 'dormindo', 84)),
    h('div', { class: 'vazio-emoji-pequeno' }, conf.emoji),
    h('div', { class: 'vazio-titulo' }, conf.titulo),
    h('div', { class: 'vazio-sub' }, conf.sub),
    termo ? h('button', { class: 'btn btn-branco', type: 'button', onclick: aoLimpar }, 'LIMPAR BUSCA') : ''
  );
}

const CLASSES = { verbo: 'verbo', subst: 'substantivo', adj: 'adjetivo', adv: 'advérbio', prep: 'preposição', pron: 'pronome', conj: 'conjunção', num: 'número', interj: 'interjeição' };

function verbete(v) {
  const st = v.doCurso || estado.itens[v.en] ? statusDoItem(v.en) : null;
  const fav = h('button', {
    class: 'dic-fav' + (ehFavorita(v.en) ? ' ativa' : ''),
    type: 'button',
    'aria-label': (ehFavorita(v.en) ? 'Tirar' : 'Adicionar') + ' ' + v.en + ' da Minha Lista',
    'aria-pressed': ehFavorita(v.en) ? 'true' : 'false',
    title: 'Minha Lista',
    onclick(e) {
      e.stopPropagation();
      const agora = alternarFavorita({ en: v.en, pt: v.pt, classe: v.classe });
      fav.classList.toggle('ativa', agora);
      fav.setAttribute('aria-pressed', agora ? 'true' : 'false');
      sons.toque();
    }
  }, '⭐');
  return h('div', { class: 'dic-item', role: 'listitem' },
    h('button', {
      class: 'btn-som dic-som',
      type: 'button',
      'aria-label': 'Ouvir ' + v.en,
      onclick: () => falar(v.en)
    }, '🔊'),
    h('div', { class: 'dic-corpo' },
      h('div', { class: 'dic-en', lang: 'en' }, v.en),
      h('div', { class: 'dic-pt' }, v.pt.join(' · ')),
      v.nota ? h('div', { class: 'dic-nota' }, '💡 ' + v.nota) : ''
    ),
    h('div', { class: 'dic-tags' },
      v.classe ? h('span', { class: 'dic-tag' }, CLASSES[v.classe] ?? v.classe) : '',
      v.doCurso ? h('span', { class: 'dic-tag dic-unidade', style: `--cor-unidade:${v.cor}` }, v.unidadeEmoji + ' ' + v.unidade) : '',
      st ? h('span', { class: 'dic-tag dic-status ' + st.id, title: st.texto }, st.emoji + ' ' + st.texto) : ''
    ),
    fav
  );
}

function botaoRevisao() {
  if (itensAprendidos().length === 0) return '';
  const vencidas = itensVencidos().length;
  return h('button', { class: 'card revisao' + (vencidas ? ' revisao-vencida' : ''), onclick: iniciarRevisao },
    h('span', { class: 'revisao-emoji' }, '🧠'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Revisão Turbo'),
      h('div', { class: 'revisao-sub' }, vencidas
        ? `${vencidas} palavra${vencidas > 1 ? 's' : ''} vencendo hoje. Hora de fixar 📅`
        : 'Tudo em dia! Treino surpresa com o que você já sabe ✅')
    ),
    h('span', { class: 'revisao-seta' }, vencidas ? '⚡' : '✨')
  );
}

function cartaoUnidade(u) {
  const aberta = unidadeDesbloqueada(u);
  const feitas = u.licoes.filter(licaoFeita).length;
  return h('div', { class: 'unidade', style: `--cor-unidade:${u.cor}` },
    h('div', { class: 'unidade-cab', style: `background-color:${u.cor}` },
      h('span', { class: 'unidade-emoji' }, u.emoji),
      h('div', {},
        h('div', { class: 'unidade-titulo' }, u.titulo),
        h('div', { class: 'unidade-sub' }, `${feitas}/${u.licoes.length} lições`)
      ),
      aberta ? '' : h('span', { class: 'cadeado' }, '🔒')
    ),
    h('div', { class: 'licoes' },
      u.licoes.map((l, idx) => {
        const liberada = aberta && licaoDesbloqueada(u, idx);
        const prog = estado.licoes[l.id];
        const estrelas = prog?.estrelas ?? 0;
        const b = h('button', {
          class: 'licao' + (liberada ? '' : ' bloqueada') + (estrelas ? ' feita' : ''),
          type: 'button',
          'aria-label': `${l.titulo}${/[.!?]$/.test(l.titulo) ? '' : '.'} ${liberada ? estrelas + ' de 3 estrelas' : 'bloqueada'}`
        },
          h('div', { class: 'licao-emoji', 'aria-hidden': 'true' }, liberada ? l.emoji : '🔒'),
          h('div', { class: 'licao-titulo' }, l.titulo),
          h('div', { class: 'estrelas', 'aria-hidden': 'true' }, [1, 2, 3].map(n => h('span', { class: estrelas >= n ? 'ganha' : '' }, '★')))
        );
        if (liberada) b.addEventListener('click', () => iniciarLicao(u, l));
        else b.disabled = true;
        return b;
      }),
      nodoChefao(u, aberta),
      nodoHistoria(u, aberta)
    )
  );
}

function nodoHistoria(u, aberta) {
  const historia = HISTORIAS.find(h2 => h2.unidade === u.id);
  if (!historia) return '';
  const completa = u.licoes.every(licaoFeita);
  const feita = !!estado.licoes['historia:' + u.id];
  const liberado = aberta && completa;
  const b = h('button', {
    class: 'licao historia-no' + (liberado ? '' : ' bloqueada') + (feita ? ' feita' : ''),
    type: 'button',
    'aria-label': `Diálogo "${historia.titulo}"${/[.!?]$/.test(historia.titulo) ? '' : '.'} ${feita ? 'concluído' : liberado ? 'liberado' : 'complete as 4 lições para liberar'}`
  },
    h('div', { class: 'licao-emoji', 'aria-hidden': 'true' }, liberado || feita ? historia.emoji : '🔒'),
    h('div', { class: 'licao-titulo' }, 'Diálogo'),
    h('div', { class: 'estrelas', 'aria-hidden': 'true' }, h('span', { class: feita ? 'ganha' : '' }, '★'))
  );
  if (liberado) b.addEventListener('click', () => iniciarHistoria(u, historia));
  else b.disabled = true;
  return b;
}

function iniciarHistoria(u, historia) {
  const falasDoJogador = historia.falas.filter(f => f.de === 'voce');
  // O pool inclui as unidades anteriores: histórias reaproveitam falas já
  // aprendidas ("thank you" na viagem) sem cair no item improvisado.
  const pool = UNIDADES.slice(0, UNIDADES.indexOf(u) + 1).flatMap(x => x.licoes.flatMap(l => l.itens));
  sessao = {
    tipo: 'licao', historia, unidade: u,
    licao: { id: 'historia:' + u.id, titulo: historia.titulo },
    pool, itens: falasDoJogador, fila: [], idxFala: 0,
    idx: 0, planejados: falasDoJogador.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaHistoria();
}

function telaHistoria() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'licao';
  registrarRota('licao');
  const s = sessao;
  const historia = s.historia;
  app.innerHTML = '';
  const chat = h('div', { class: 'chat' });
  const area = h('div', { class: 'chat-resposta' });
  app.append(
    h('div', { class: 'licao-topo' },
      h('button', {
        class: 'fechar', type: 'button', 'aria-label': 'Sair',
        onclick: () => pedirSaidaDaLicao(() => voltarTela())
      }, '✖'),
      h('div', { class: 'chat-cenario' }, historia.cenario),
      h('div', { class: 'combo' }, '')
    ),
    chat,
    area
  );
  historia.falas.slice(0, s.idxFala).forEach(f => chat.append(bolha(f, true)));
  avancarHistoria(chat, area);
}

function bolha(fala, revelada) {
  const doLouro = fala.de === 'louro';
  const caixa = h('div', { class: 'bolha' + (doLouro ? ' do-louro' : ' do-voce') });
  if (doLouro) caixa.append(h('div', { class: 'bolha-avatar' }, mascote('neutro', 40)));
  caixa.append(h('div', { class: 'bolha-corpo' },
    h('div', { class: 'bolha-en', lang: 'en' }, revelada ? fala.en : '···'),
    revelada ? h('div', { class: 'bolha-pt' }, fala.pt) : ''
  ));
  if (doLouro && revelada) {
    caixa.append(h('button', {
      class: 'btn-som bolha-som',
      type: 'button',
      'aria-label': `Ouvir: ${fala.en}`,
      onclick: () => falar(fala.en)
    }, '🔊'));
  }
  return caixa;
}

function avancarHistoria(chat, area) {
  const s = sessao;
  area.innerHTML = '';
  while (s.idxFala < s.historia.falas.length && s.historia.falas[s.idxFala].de === 'louro') {
    const fala = s.historia.falas[s.idxFala];
    chat.append(bolha(fala, true));
    falar(fala.en);
    s.idxFala++;
  }
  chat.scrollTop = chat.scrollHeight;
  if (s.idxFala >= s.historia.falas.length) {
    finalizar();
    return;
  }
  const fala = s.historia.falas[s.idxFala];
  const item = s.pool.find(i => i.en === fala.en) ?? { en: fala.en, pt: fala.pt };
  const ex = gerarDificeis([item], s.pool, 1)[0];
  const btn = h('button', { class: 'btn btn-verde', type: 'button' }, 'RESPONDER');
  btn.disabled = true;
  const ctrl = montarExercicio(ex, {
    aoMudar: v => { btn.disabled = !v; },
    aoAuto() {},
    aoEnter: () => { if (!btn.disabled) btn.click(); },
    aoPular() {}
  });
  const feedback = h('div', { class: 'chat-feedback', role: 'status', 'aria-live': 'polite' });
  btn.addEventListener('click', () => {
    const res = ctrl.corrigir();
    s.respostas++;
    const anterior = s.resultados.get(item.en);
    s.resultados.set(item.en, { en: item.en, acertou: (anterior ? anterior.acertou : true) && res.correto });
    if (res.correto) {
      s.acertos++;
      s.combo++;
      s.comboMax = Math.max(s.comboMax, s.combo);
      s.xp += 12;
      sons.acerto();
    } else {
      s.combo = 0;
      s.erros.push(item);
      sons.erro();
    }
    feedback.className = 'chat-feedback ' + (res.correto ? 'certo' : 'errado');
    feedback.textContent = res.correto ? aleatorio(MASCOTE.acerto) : 'A fala certa era: ' + fala.en;
    btn.textContent = 'CONTINUAR';
    btn.disabled = false;
    const novo = btn.cloneNode(true);
    btn.replaceWith(novo);
    novo.addEventListener('click', () => {
      chat.append(bolha(fala, true));
      s.idxFala++;
      avancarHistoria(chat, area);
    });
    novo.focus({ preventScroll: true });
  });
  area.append(ctrl.el, feedback, h('div', { class: 'chat-acao' }, btn));
}

function nodoChefao(u, aberta) {
  const completa = u.licoes.every(licaoFeita);
  const vencido = !!estado.licoes['chefao:' + u.id];
  const liberado = aberta && completa;
  const b = h('button', {
    class: 'licao chefao' + (liberado ? '' : ' bloqueada') + (vencido ? ' feita' : ''),
    type: 'button',
    'aria-label': `Chefão de ${u.titulo}${/[.!?]$/.test(u.titulo) ? '' : '.'} ${vencido ? 'conquistado' : liberado ? 'liberado' : 'complete as 4 lições para liberar'}`
  },
    h('div', { class: 'licao-emoji', 'aria-hidden': 'true' }, liberado || vencido ? '👑' : '🔒'),
    h('div', { class: 'licao-titulo' }, 'Chefão'),
    h('div', { class: 'estrelas', 'aria-hidden': 'true' }, vencido ? h('span', { class: 'ganha' }, '★') : h('span', {}, '★'))
  );
  if (liberado) b.addEventListener('click', () => iniciarChefao(u));
  else b.disabled = true;
  return b;
}

function iniciarChefao(u) {
  const itens = u.licoes.flatMap(l => l.itens);
  const fila = gerarDificeis(itens, itens, 12);
  sessao = {
    tipo: 'licao', chefao: true, unidade: u, licao: { id: 'chefao:' + u.id, titulo: 'Chefão ' + u.titulo },
    pool: itens, fila, itens, vidas: 3,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}


function iniciarLicao(u, l) {
  if (l.dica && !estado.licoes[l.id]) {
    telaDica(u, l);
    return;
  }
  comecarLicao(u, l);
}

function telaDica(u, l) {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'dica';
  registrarRota('licao');
  app.innerHTML = '';
  const botao = h('button', { class: 'btn btn-verde', type: 'button', onclick: () => comecarLicao(u, l) }, 'ENTENDI, BORA!');
  app.append(
    h('div', { class: 'dica-tela' },
      h('div', { class: 'dica-emoji' }, '💡'),
      h('h1', {}, l.dica.titulo),
      h('div', { class: 'card dica-corpo' }, l.dica.corpo),
      botao
    )
  );
  botao.focus({ preventScroll: true });
}

// Palavras que a pessoa nunca praticou ganham um cartão de apresentação
// antes de serem cobradas. Vale para o curso, a Minha Lista e a Expansão.
function palavrasNovas(itens) {
  return new Set(itens.filter(i => !estado.itens[i.en]).map(i => i.en));
}

function semApresentacoes(fila) {
  return fila.filter(e => e.tipo !== 'apresentacao').length;
}

function comecarLicao(u, l) {
  const pool = u.licoes.flatMap(x => x.itens);
  // Fila proporcional ao tamanho da lição: 8 exercícios fixos deixavam ~2
  // itens das lições grandes sem nenhuma aparição.
  const fila = gerarExercicios(l.itens, pool, Math.max(8, Math.ceil(l.itens.length * 1.2)), palavrasNovas(l.itens));
  sessao = {
    tipo: 'licao', unidade: u, licao: l, pool, fila, itens: l.itens,
    idx: 0, planejados: semApresentacoes(fila), acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function iniciarRevisao() {
  const aprendidos = itensAprendidos();
  const saldo = new Map(palavrasFracas(aprendidos).map(f => [f.item.en, f.saldo]));
  const porSaldo = (a, b) => (saldo.get(b.en) ?? 0) - (saldo.get(a.en) ?? 0);
  const itens = itensVencidos().sort(porSaldo).slice(0, 8);
  palavrasFracas(aprendidos).forEach(f => {
    if (itens.length >= 8) return;
    if (!itens.some(x => x.en === f.item.en)) itens.push(f.item);
  });
  let tentativas = 0;
  while (itens.length < 8 && tentativas < 60) {
    tentativas++;
    const c = aleatorio(aprendidos);
    if (!itens.some(x => x.en === c.en)) itens.push(c);
  }
  const fila = gerarExercicios(itens, aprendidos, Math.min(8, itens.length * 2));
  sessao = {
    tipo: 'revisao', pool: aprendidos, fila, itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function telaExercicio() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'licao';
  registrarRota('licao');
  const ex = sessao.fila[sessao.idx];
  const pct = Math.round(sessao.idx / sessao.fila.length * 100);
  const barra = h('div', {
    class: 'progresso barra-licao',
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    'aria-valuenow': String(pct),
    'aria-label': 'Progresso da lição'
  }, h('div', { style: `width:${pct}%` }));
  const comboEl = sessao.chefao
    ? h('div', { class: 'combo vidas', title: 'Vidas restantes' }, '❤️'.repeat(Math.max(sessao.vidas, 0)))
    : h('div', { class: 'combo' + (sessao.combo >= 2 ? ' pop' : '') }, sessao.combo >= 2 ? `⚡x${sessao.combo}` : '');
  const btnVerificar = h('button', { class: 'btn btn-verde', type: 'button' }, 'VERIFICAR');
  btnVerificar.disabled = true;
  const btnNaoSei = h('button', { class: 'btn btn-branco btn-nao-sei', type: 'button', title: 'Ver a resposta. Conta como erro e volta depois' }, 'NÃO SEI');
  const btnDica = h('button', {
    class: 'btn-dica',
    type: 'button',
    'aria-label': 'Dica da questão',
    'aria-expanded': 'false',
    'aria-keyshortcuts': 'D',
    title: 'Dica (tecla D)'
  }, '💡');
  const rodape = h('div', { class: 'rodape' }, h('div', { class: 'rodape-conteudo' }, btnNaoSei, btnVerificar));
  const feedback = h('div', { class: 'feedback', role: 'status', 'aria-live': 'polite' });
  const areaEx = h('div', { class: 'area-exercicio' });
  app.innerHTML = '';
  app.append(
    h('div', { class: 'licao-topo' },
      h('button', {
        class: 'fechar', type: 'button', 'aria-label': 'Sair',
        onclick: () => pedirSaidaDaLicao(() => voltarTela())
      }, '✖'),
      barra,
      comboEl,
      btnDica
    ),
    areaEx, rodape, feedback
  );
  const alternarDica = () => {
    const aberto = areaEx.querySelector('.dica-painel');
    if (aberto) {
      aberto.remove();
      btnDica.setAttribute('aria-expanded', 'false');
      return;
    }
    const blocos = dicaContextual(ex.item, sessao.licao);
    const painel = h('div', { class: 'card dica-painel', role: 'region', 'aria-label': 'Dica' },
      h('div', { class: 'dica-dia-topo' },
        h('div', { class: 'nivel-titulo' }, '💡 Dica'),
        h('button', {
          class: 'fechar',
          type: 'button',
          'aria-label': 'Fechar dica',
          onclick() {
            painel.remove();
            btnDica.setAttribute('aria-expanded', 'false');
          }
        }, '✖')
      ),
      ...blocos.map(b => h('div', { class: 'dica-bloco' },
        h('div', { class: 'dica-painel-titulo' }, b.titulo),
        h('p', {}, b.corpo)
      )),
      h('div', { class: 'revisao-sub' }, 'Tecla D abre e fecha.')
    );
    btnDica.setAttribute('aria-expanded', 'true');
    areaEx.prepend(painel);
    painel.querySelector('.fechar').focus();
  };
  btnDica.addEventListener('click', alternarDica);
  const ctrl = montarExercicio(ex, {
    aoMudar: v => { btnVerificar.disabled = !v; },
    aoAuto: res => processar(ex, res, feedback, btnVerificar),
    aoEnter: () => { if (!btnVerificar.disabled) btnVerificar.click(); },
    aoContinuar: () => continuar(),
    aoPular: () => {
      sessao.fila.splice(sessao.idx, 1);
      sessao.planejados = Math.max(1, sessao.planejados - 1);
      if (sessao.idx >= sessao.fila.length) finalizar();
      else telaExercicio();
    }
  });
  if (sessao.tipo === 'escuta' && !temFala) {
    areaEx.append(h('p', { class: 'aviso-fala' }, 'Sem microfone neste navegador. Ouça e escreva a frase.'));
  }
  areaEx.append(ctrl.el);
  if (!ctrl.temVerificar) rodape.style.display = 'none';
  if (ex.tipo === 'falar') btnNaoSei.style.display = 'none';
  ligarAtalhos(areaEx, btnVerificar, feedback, alternarDica, () => {
    if (ex.item?.en) falar(ex.item.en);
  });
  if (ctrl.focoInicial) ctrl.focoInicial.focus({ preventScroll: true });
  else focarTela();
  let corrigido = false;
  btnVerificar.addEventListener('click', () => {
    if (btnVerificar.disabled || corrigido) return;
    corrigido = true;
    btnNaoSei.disabled = true;
    const res = ctrl.corrigir();
    processar(ex, res, feedback, btnVerificar);
  });
  btnNaoSei.addEventListener('click', () => {
    if (corrigido) return;
    corrigido = true;
    btnNaoSei.disabled = true;
    const res = ctrl.corrigir();
    processar(ex, { ...res, correto: false, quase: false, naoSei: true }, feedback, btnVerificar);
  });
}

function ligarAtalhos(areaEx, btnVerificar, feedback, aoDica, aoOuvir) {
  if (atalhosAtivos) document.removeEventListener('keydown', atalhosAtivos);
  atalhosAtivos = e => {
    if (telaAtiva !== 'licao') return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
    const digitando = document.activeElement?.classList.contains('entrada');
    const btnFeedback = feedback.querySelector('.btn');
    if ((e.key === 's' || e.key === 'S') && !digitando && !btnFeedback) {
      e.preventDefault();
      aoOuvir?.();
      return;
    }
    if ((e.key === 'd' || e.key === 'D' || e.key === '?') && !digitando && !btnFeedback) {
      e.preventDefault();
      aoDica?.();
      return;
    }
    if (e.key === 'Enter') {
      if (btnFeedback) {
        e.preventDefault();
        btnFeedback.click();
      } else if (!digitando && !btnVerificar.disabled) {
        e.preventDefault();
        btnVerificar.click();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      pedirSaidaDaLicao(() => voltarTela());
      return;
    }
    if (digitando || btnFeedback) return;
    const n = Number(e.key);
    if (n >= 1 && n <= 4) {
      const opcoes = areaEx.querySelectorAll('.opcoes .opcao');
      if (opcoes[n - 1]) {
        e.preventDefault();
        opcoes[n - 1].click();
      }
    }
  };
  document.addEventListener('keydown', atalhosAtivos);
}

function anotarDeslize(alvoSessao, item, res) {
  if (!item || res.naoSei || !res.tutor) return;
  if (res.correto && !res.quase) return;
  if (!alvoSessao.deslizes) alvoSessao.deslizes = [];
  alvoSessao.deslizes.push({
    tipo: res.tutor.tipo,
    chave: res.tutor.chave,
    en: item.en,
    pt: item.pt ?? ''
  });
}

function marcasDoTutor(lista, letras) {
  return lista.map(p => {
    const classe = p.marca === 'ok' ? ''
      : p.marca === 'sobra' ? 'diff-sobra'
        : p.marca === 'fora' ? 'diff-fora'
          : 'diff-falta';
    const texto = p.t === ' ' ? ' ' : letras ? p.t : p.t + ' ';
    return h('span', { class: classe }, texto);
  });
}

function blocoTutor(tutor) {
  const partes = [];
  if (tutor.letras) {
    partes.push(h('div', { class: 'feedback-diff', 'aria-hidden': 'true' },
      h('div', { class: 'feedback-frase' },
        h('span', { class: 'diff-rotulo' }, 'Você: '),
        h('span', { lang: 'en', class: 'diff-letras' }, marcasDoTutor(tutor.letras.dada, true))
      ),
      h('div', { class: 'feedback-frase' },
        h('span', { class: 'diff-rotulo' }, 'Certo: '),
        h('span', { lang: 'en', class: 'diff-letras' }, marcasDoTutor(tutor.letras.certa, true))
      )
    ));
  } else if (tutor.palavras) {
    partes.push(h('div', { class: 'feedback-diff', 'aria-hidden': 'true' },
      h('div', { class: 'feedback-frase' },
        h('span', { class: 'diff-rotulo' }, 'Você: '),
        h('span', { lang: 'en' }, marcasDoTutor(tutor.palavras.dada, false))
      ),
      h('div', { class: 'feedback-frase' },
        h('span', { class: 'diff-rotulo' }, 'Certo: '),
        h('span', { lang: 'en' }, marcasDoTutor(tutor.palavras.certa, false))
      )
    ));
  }
  if (tutor.porque) partes.push(h('div', { class: 'feedback-frase' }, tutor.porque));
  if (tutor.dica) partes.push(h('div', { class: 'feedback-nota' }, '💡 ' + tutor.dica));
  return partes;
}

function processar(ex, res, feedback, btnVerificar) {
  btnVerificar.disabled = true;
  sessao.respostas++;
  const alvos = ex.tipo === 'pares' ? ex.pares : ex.item ? [ex.item] : [];
  // Nos pares o erro é por par: um clique errado não rebaixa os 4 itens.
  const paresErrados = ex.tipo === 'pares' ? new Set(res.paresErrados ?? []) : null;
  alvos.forEach(it => {
    const acertouEste = paresErrados ? !paresErrados.has(it.en) : res.correto;
    const anterior = sessao.resultados.get(it.en);
    sessao.resultados.set(it.en, { en: it.en, acertou: (anterior ? anterior.acertou : true) && acertouEste });
    if (paresErrados && !acertouEste) sessao.erros.push(it);
  });
  if (res.correto) {
    if (ex.repescagem) {
      // Acertar a repescagem do item recém-errado vale +5 XP, mas não conta
      // combo. Senão errar viraria atalho para o badge de combo.
      sessao.xp += 5;
      sons.acerto();
    } else {
      sessao.combo++;
      sessao.comboMax = Math.max(sessao.comboMax, sessao.combo);
      sessao.acertos++;
      sessao.xp += 10 + Math.min(sessao.combo - 1, 5) * 2;
      if (sessao.combo >= 3) sons.combo(sessao.combo);
      else sons.acerto();
    }
  } else {
    sessao.combo = 0;
    if (res.naoSei) sons.toque();
    else sons.erro();
    if (sessao.chefao) sessao.vidas--;
    if (ex.item) {
      sessao.erros.push(ex.item);
      if (!ex.repescagem && !sessao.chefao) {
        const rep = exercicioFacil(ex.item, sessao.pool);
        rep.repescagem = true;
        sessao.fila.push(rep);
      }
    }
  }
  if (ex.item) anotarDeslize(sessao, ex.item, res);
  if (ex.item && ['escolhaPtEn', 'digitar', 'montar', 'ditado', 'lacuna', 'ouvirPt'].includes(ex.tipo)) falar(ex.item.en);
  const frase = res.naoSei ? 'Agora você sabe. Ela volta já já pra você acertar 💪' : aleatorio(res.correto ? (res.quase ? MASCOTE.quase : MASCOTE.acerto) : MASCOTE.erro);
  const linhas = [];
  if (res.naoSei) {
    if (res.certa) linhas.push(h('div', { class: 'feedback-frase' }, 'Resposta certa: ', h('span', { lang: 'en' }, res.certa)));
    const dica = res.tutor?.dica || res.nota || ex.item?.nota;
    if (dica) linhas.push(h('div', { class: 'feedback-nota' }, '💡 ' + dica));
  } else if (res.tutor && (!res.correto || res.quase)) {
    linhas.push(...blocoTutor(res.tutor));
  } else if (!res.correto && res.diff) {
    linhas.push(linhaDiff(res.diff));
  } else if (!res.correto && res.certa) {
    linhas.push(h('div', { class: 'feedback-frase' }, 'Resposta certa: ', h('span', { lang: 'en' }, res.certa)));
  }
  if (!res.naoSei && !res.tutor && !res.correto && (res.nota || ex.item?.nota)) {
    linhas.push(h('div', { class: 'feedback-nota' }, '💡 ' + (res.nota ?? ex.item.nota)));
  }
  linhas.push(h('div', { class: 'feedback-frase suave' }, frase));
  const tom = res.correto ? (res.quase ? 'quase' : 'certo') : 'errado';
  feedback.className = 'feedback ' + tom;
  feedback.innerHTML = '';
  const btnContinuar = h('button', { class: 'btn ' + (res.correto ? 'btn-verde' : 'btn-vermelho'), type: 'button', onclick: continuar }, 'CONTINUAR');
  const titulo = res.naoSei
    ? 'Fica a dica! 📝'
    : res.correto
      ? (res.quase ? (res.tutor?.titulo ?? 'Quase! Só uma letrinha') : 'Muito bem!')
      : (res.tutor?.titulo ?? 'Ops!');
  feedback.append(
    h('div', { class: 'feedback-conteudo' },
      h('div', { class: 'feedback-textos' },
        h('div', { class: 'feedback-titulo' }, titulo),
        linhas
      ),
      btnContinuar
    )
  );
  requestAnimationFrame(() => feedback.classList.add('aberta'));
  btnContinuar.focus({ preventScroll: true });
}

function linhaDiff(diff) {
  const temSobra = diff.dada.some(p => p.sobra);
  return h('div', { class: 'feedback-diff' },
    h('div', { class: 'feedback-frase' },
      h('span', { class: 'diff-rotulo' }, 'Certo: '),
      h('span', { lang: 'en' }, diff.certa.map(p => h('span', { class: p.falta ? 'diff-falta' : '' }, p.palavra + ' ')))
    ),
    temSobra ? h('div', { class: 'feedback-frase suave' },
      h('span', { class: 'diff-rotulo' }, 'Você: '),
      h('span', { lang: 'en' }, diff.dada.map(p => h('span', { class: p.sobra ? 'diff-sobra' : '' }, p.palavra + ' ')))
    ) : ''
  );
}

let avancando = false;

function continuar() {
  // Enter segurado (auto-repeat) disparava o avanço duas vezes na janela do
  // view transition, pulando um exercício; limparTela() rearma a guarda.
  if (avancando) return;
  avancando = true;
  sessao.idx++;
  if (sessao.chefao && sessao.vidas <= 0) {
    finalizar(true);
    return;
  }
  if (sessao.idx >= sessao.fila.length) finalizar();
  else transicao(telaExercicio, 'avancar');
}

function finalizar(derrotado) {
  const s = sessao;
  if (s.chefao && derrotado) {
    telaChefaoPerdido(s);
    return;
  }
  const precisao = s.planejados ? Math.round(s.acertos / s.planejados * 100) : 100;
  const perfeita = s.acertos === s.planejados;
  // Estrelas por erros absolutos: com fila de 8, o degrau de 90% tornava
  // 3 estrelas idêntico à perfeição (7/8 = 87,5%).
  const falhas = Math.max(0, s.planejados - s.acertos);
  const estrelas = falhas === 0 ? 3 : falhas <= 2 ? 2 : 1;
  s.xp += 20 + (perfeita ? 15 : 0);
  if (s.chefao) s.xp += 60;
  // Verbos sintéticos ("he eats") não entram na agenda de revisão.
  const agendamentos = s.verbos ? [] : [...s.resultados.values()];
  if (s.tipo === 'licao' && !s.chefao && !s.historia) {
    // Item da lição que não caiu no sorteio entra na caixa 0: a home não pode
    // cobrar revisão de palavra que o aluno nunca viu como "vencendo hoje".
    s.itens.forEach(i => {
      if (!s.resultados.has(i.en) && !estado.itens[i.en]) agendamentos.push({ en: i.en, acertou: true });
    });
  }
  let evento;
  if (s.tipo === 'escuta') {
    const errosEn = new Set(s.erros.map(e => e.en));
    evento = registrarEscuta({
      xp: s.xp, comboMax: s.comboMax, perfeita,
      acertos: s.acertos, respostas: s.planejados, agendamentos,
      acertadosEn: s.itens.filter(i => !errosEn.has(i.en)).map(i => i.en),
      deslizes: s.deslizes ?? []
    });
  } else if (s.tipo === 'licao') {
    evento = registrarLicao(s.licao.id, {
      estrelas, xp: s.xp, comboMax: s.comboMax, errosItens: s.erros,
      perfeita, acertos: s.acertos, respostas: s.planejados, agendamentos,
      deslizes: s.deslizes ?? []
    });
  } else {
    const errosEn = new Set(s.erros.map(e => e.en));
    evento = registrarRevisao({
      xp: s.xp, comboMax: s.comboMax, perfeita,
      acertos: s.acertos, respostas: s.planejados, agendamentos,
      acertadosEn: s.itens.filter(i => !errosEn.has(i.en)).map(i => i.en),
      deslizes: s.deslizes ?? []
    });
  }
  s.xp += evento.bonusMissoes;
  if (s.vocabLicao) atualizarItensExtras();
  registrarEvento('licao');
  telaResultado(estrelas, precisao, evento);
}

function telaResultado(estrelas, precisao, evento) {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'resultado';
  registrarRota('resultado');
  const s = sessao;
  const novasBadges = evento.badges;
  app.innerHTML = '';
  const pilulaXp = h('div', { class: 'pilula' }, `⭐ +0 XP`);
  contarAte(pilulaXp, s.xp, valor => `⭐ +${valor} XP`);
  const stars = h('div', { class: 'estrelas-grandes' }, [1, 2, 3].map(n => {
    const sp = h('span', { class: 'anima' + (n <= estrelas ? ' ganha' : ''), style: `animation-delay:${0.3 + n * 0.25}s` }, '★');
    return sp;
  }));
  app.append(
    h('div', { class: 'resultado' },
      h('div', { class: 'emojao mascote-festa' }, mascote(estrelas === 3 ? 'coroa' : 'feliz', 132)),
      h('h1', {}, s.tipo === 'escuta' ? 'Escuta concluída!' : s.tipo === 'revisao' ? 'Revisão concluída!' : 'Lição concluída!'),
      h('div', { class: 'resultado-frase' }, aleatorio(MASCOTE.resultado[estrelas])),
      stars,
      h('div', { class: 'pilulas-stats' },
        pilulaXp,
        h('div', { class: 'pilula' }, `🎯 ${precisao}% de precisão`),
        h('div', { class: 'pilula' }, `⚡ combo x${s.comboMax}`),
        evento.streakNovo ? h('div', { class: 'pilula pop destaque' }, `🔥 ${evento.streakNovo} dias seguidos!`) : '',
        evento.bateuMeta ? h('div', { class: 'pilula pop destaque' }, '🎯 Meta do dia batida!') : '',
        evento.usouProtetor ? h('div', { class: 'pilula destaque' }, '🧊 Protetor salvou seu fogo!') : ''
      ),
      evento.missoes?.length ? h('div', { class: 'missoes-cumpridas' },
        h('div', { class: 'secao-titulo' }, '🎯 Missão cumprida!'),
        ...evento.missoes.map(m => h('div', { class: 'pilula' }, `${m.emoji} ${m.titulo} +${m.xp} XP`))
      ) : '',
      novasBadges.length ? h('div', { class: 'novas-badges' },
        h('div', { class: 'secao-titulo' }, '🏅 Conquista nova!'),
        h('div', { class: 'badges-grid centrada' },
          novasBadges.map(b => h('div', { class: 'badge-card nova' },
            h('div', { class: 'badge-emoji' }, b.emoji),
            h('div', { class: 'badge-nome' }, b.nome),
            h('div', { class: 'badge-desc' }, b.desc)
          ))
        )
      ) : '',
      cartaoPadroesSessao(s.deslizes),
      h('div', { class: 'resultado-botoes' },
        s.tipo === 'licao' && !s.chefao && !s.vocabLicao ? botaoDesafiar(s, estrelas) : '',
        estrelas < 3 && s.tipo === 'licao'
          ? h('button', {
            class: 'btn btn-branco',
            type: 'button',
            onclick: () => (s.vocabLicao ? iniciarLicaoVocab(s.vocabLicao, s.vocabPool) : iniciarLicao(s.unidade, s.licao))
          }, 'TENTAR DE NOVO')
          : '',
        h('button', { class: 'btn btn-verde', type: 'button', onclick: telaInicial }, 'CONTINUAR')
      )
    )
  );
  coreografiaResultado(estrelas, evento);
}

function coreografiaResultado(estrelas, evento) {
  if (reduzirMovimento()) {
    sons.fanfarra();
    if (estrelas >= 2 || evento.subiuNivel) confete();
    if (evento.subiuNivel) overlayNivel(evento.subiuNivel);
    return;
  }
  const passos = [];
  for (let n = 1; n <= estrelas; n++) passos.push({ ms: 300 + n * 260, fn: () => sons.estrela(n) });
  passos.push({ ms: 300 + estrelas * 260 + 120, fn: () => { sons.fanfarra(); if (estrelas >= 2 || evento.subiuNivel) confete(); } });
  if (evento.subiuNivel) passos.push({ ms: 300 + estrelas * 260 + 900, fn: () => overlayNivel(evento.subiuNivel) });
  passos.forEach(p => timerDeTela(p.fn, p.ms));
}

function cartaoPadroesSessao(deslizes) {
  const erros = (deslizes ?? []).filter(d => d && !d.ok);
  if (!erros.length) return '';
  const cont = new Map();
  erros.forEach(d => {
    const atual = cont.get(d.tipo) ?? { tipo: d.tipo, n: 0 };
    atual.n += 1;
    cont.set(d.tipo, atual);
  });
  const top = [...cont.values()].sort((a, b) => b.n - a.n)[0];
  const nome = ROTULOS[top.tipo] ?? 'esse padrão';
  return h('div', { class: 'card resultado-dica' },
    h('div', { class: 'nivel-titulo' }, '🧭 Onde você tropeçou'),
    h('p', { class: 'dica-dia-corpo' }, `O padrão mais comum nesta rodada foi ${nome} (${top.n}). A revisão vai cobrar isso de novo.`)
  );
}

function botaoDesafiar(s, estrelas) {
  const botao = h('button', { class: 'btn btn-branco', type: 'button' }, '🎯 DESAFIAR');
  const avisar = texto => {
    botao.textContent = texto;
    timerDeTela(() => {
      botao.textContent = '🎯 DESAFIAR';
    }, 2500);
  };
  botao.addEventListener('click', async () => {
    const url = linkDoDesafio(s, estrelas);
    const texto = `Acertei ${s.acertos} de ${s.planejados} em "${s.licao.titulo}" no GringoLingo 🦜 Consegue bater?`;
    try {
      if (navigator.share) await navigator.share({ text: texto, url });
      else {
        await navigator.clipboard.writeText(texto + ' ' + url);
        avisar('✅ LINK COPIADO');
      }
    } catch (e) {
      if (e?.name !== 'AbortError') avisar('❌ NÃO ROLOU. TENTA DE NOVO');
    }
  });
  return botao;
}

function telaChefaoPerdido(s) {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'resultado';
  registrarRota('resultado');
  app.innerHTML = '';
  sons.erro();
  app.append(
    h('div', { class: 'resultado' },
      h('div', { class: 'emojao' }, '💥'),
      h('h1', {}, 'O Chefão venceu dessa vez'),
      h('div', { class: 'resultado-frase' }, 'Suas 3 vidas acabaram, mas nada foi perdido. Revise e volta pra revanche! 👑'),
      h('div', { class: 'pilulas-stats' },
        h('div', { class: 'pilula' }, `🎯 ${s.acertos} acerto${s.acertos === 1 ? '' : 's'}`),
        h('div', { class: 'pilula' }, `💔 ${s.erros.length} erro${s.erros.length === 1 ? '' : 's'}`)
      ),
      h('div', { class: 'resultado-botoes' },
        h('button', { class: 'btn btn-branco', type: 'button', onclick: () => iniciarChefao(s.unidade) }, 'TENTAR DE NOVO'),
        h('button', { class: 'btn btn-verde', type: 'button', onclick: () => telaInicial() }, 'VOLTAR')
      )
    )
  );
}

function contarAte(el, alvo, formato) {
  if (reduzirMovimento() || alvo <= 0) {
    el.textContent = formato(alvo);
    return;
  }
  const inicio = performance.now();
  const passo = agora => {
    const t = Math.min(1, (agora - inicio) / 700);
    el.textContent = formato(Math.round(alvo * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

function overlayNivel(nv) {
  const focoAnterior = document.activeElement;
  const fechar = () => {
    caixa.remove();
    app.removeAttribute('inert');
    document.removeEventListener('keydown', aoTeclar);
    focoAnterior?.focus?.({ preventScroll: true });
  };
  const aoTeclar = e => {
    if (e.key === 'Escape' || e.key === 'Enter') fechar();
    // O modal é o único conteúdo interativo fora do #app (que fica inert);
    // segurar o Tab nele evita o foco passear pela tela de trás.
    if (e.key === 'Tab') {
      e.preventDefault();
      botao.focus();
    }
  };
  const botao = h('button', { class: 'btn btn-verde', type: 'button', onclick: fechar }, 'BORA!');
  const caixa = h('div', { class: 'overlay-nivel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'overlay-nivel-titulo' },
    h('div', { class: 'overlay-caixa' },
      h('div', { class: 'overlay-emoji' }, nv.emoji),
      h('div', { class: 'overlay-titulo', id: 'overlay-nivel-titulo' }, 'Nível ' + nv.numero),
      h('div', { class: 'overlay-nome' }, 'Você virou ' + nv.titulo + '!'),
      botao
    )
  );
  document.addEventListener('keydown', aoTeclar);
  app.setAttribute('inert', '');
  document.body.append(caixa);
  botao.focus();
  sons.nivel();
}

function telaLogin(aviso) {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'login';
  registrarRota('login');
  avisoPerfil = null;
  checarGoogle();
  app.innerHTML = '';
  const email = h('input', { class: 'entrada', type: 'email', name: 'email', placeholder: 'seu@email.com', autocomplete: 'email' });
  const senha = h('input', { class: 'entrada', type: 'password', name: 'senha', placeholder: `senha (mín. ${SENHA_MINIMA} caracteres)`, autocomplete: 'current-password' });
  const msg = h('div', { class: 'login-msg', role: 'alert' });
  const btnEntrar = h('button', { class: 'btn btn-verde' }, 'ENTRAR');
  const btnCriar = h('button', { class: 'btn btn-azul' }, 'CRIAR CONTA');
  async function agir(criar) {
    msg.textContent = '';
    msg.className = 'login-msg';
    if (!email.value.trim() || !senha.value) {
      msg.textContent = 'Preenche e-mail e senha, gringo 😅';
      msg.classList.add('erro');
      return;
    }
    if (criar && senha.value.length < SENHA_MINIMA) {
      msg.textContent = `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres`;
      msg.classList.add('erro');
      senha.focus();
      return;
    }
    btnEntrar.disabled = btnCriar.disabled = true;
    try {
      if (criar) {
        const nova = await criarConta(email.value.trim(), senha.value);
        if (!nova) {
          msg.textContent = 'Conta criada! Confirma teu e-mail e depois entra 📬';
          msg.classList.add('ok');
          return;
        }
      } else {
        await entrar(email.value.trim(), senha.value);
      }
      await aposLogin(true);
    } catch (e) {
      msg.textContent = e.message;
      msg.classList.add('erro');
    } finally {
      btnEntrar.disabled = btnCriar.disabled = false;
    }
  }
  btnEntrar.type = 'submit';
  btnCriar.type = 'button';
  btnCriar.addEventListener('click', () => agir(true));
  // O slot do Google é preenchido no lugar quando a checagem assíncrona
  // termina. Repintar a tela inteira roubava o foco de quem já digitava.
  const slotGoogle = h('div', { class: 'login-slot-google' });
  if (temGoogle) slotGoogle.append(...montarBotaoGoogle(msg));
  const form = h('form', {
    class: 'login-form',
    onsubmit(e) {
      e.preventDefault();
      agir(false);
    }
  },
    email, senha, msg,
    h('div', { class: 'login-botoes' }, btnEntrar, btnCriar)
  );
  app.append(
    h('div', { class: 'login' },
      h('div', { class: 'login-logo' }, mascote('feliz', 92)),
      h('h1', {}, 'Entrar no GringoLingo'),
      h('div', { class: 'login-sub' }, 'Sua evolução sincronizada em qualquer dispositivo ☁️'),
      slotGoogle,
      form,
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => voltarTela() }, 'JOGAR SEM CONTA')
    )
  );
  if (aviso) {
    msg.textContent = aviso;
    msg.classList.add('erro');
  }
}

function montarBotaoGoogle(msg) {
  const btnGoogle = h('button', { class: 'btn btn-google', type: 'button' }, iconeGoogle(), h('span', {}, 'ENTRAR COM GOOGLE'));
  btnGoogle.addEventListener('click', async () => {
    btnGoogle.disabled = true;
    msg.textContent = '';
    msg.className = 'login-msg';
    try {
      await entrarComGoogle();
    } catch (e) {
      msg.textContent = e.message;
      msg.classList.add('erro');
      btnGoogle.disabled = false;
    }
  });
  return [btnGoogle, h('div', { class: 'login-ou' }, h('span', {}, 'ou com e-mail'))];
}

function decodificarDesafio(d) {
  const unidade = UNIDADES.find(u => u.id === d?.u);
  const licao = unidade?.licoes.find(l => l.id === d?.l);
  if (!licao || typeof d.a !== 'number' || typeof d.t !== 'number') return null;
  return { unidade, licao, acertos: Math.max(0, Math.min(d.a, 99)), total: Math.max(1, Math.min(d.t, 99)) };
}

// O desafio sobrevive a reload: a URL é limpa na hora, mas o convite fica
// guardado até ser aceito ou dispensado.
function lerDesafio() {
  const p = new URLSearchParams(location.search);
  const bruto = p.get('desafio');
  try {
    if (bruto) {
      history.replaceState(null, '', location.pathname);
      const json = decodeURIComponent(escape(atob(bruto.replace(/-/g, '+').replace(/_/g, '/'))));
      const d = decodificarDesafio(JSON.parse(json));
      if (d) localStorage.setItem(CHAVE_DESAFIO, JSON.stringify({ u: d.unidade.id, l: d.licao.id, a: d.acertos, t: d.total }));
      return d;
    }
    const salvo = localStorage.getItem(CHAVE_DESAFIO);
    return salvo ? decodificarDesafio(JSON.parse(salvo)) : null;
  } catch {
    return null;
  }
}

function esquecerDesafio() {
  desafioAtivo = null;
  localStorage.removeItem(CHAVE_DESAFIO);
}

function linkDoDesafio(s, estrelas) {
  const dados = { u: s.unidade.id, l: s.licao.id, a: s.acertos, t: s.planejados };
  const json = JSON.stringify(dados);
  const b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${location.origin}${location.pathname}?desafio=${b64}`;
}

function bannerDesafio() {
  if (!desafioAtivo) return '';
  const d = desafioAtivo;
  const banner = h('div', { class: 'card banner-desafio' },
    h('span', { class: 'revisao-emoji' }, '🎯'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Você foi desafiado!'),
      h('div', { class: 'revisao-sub' }, `Alguém acertou ${d.acertos} de ${d.total} em "${d.licao.titulo}". Consegue bater?`)
    ),
    h('button', {
      class: 'btn btn-verde',
      onclick() {
        const alvo = d;
        esquecerDesafio();
        iniciarLicao(alvo.unidade, alvo.licao);
      }
    }, 'ACEITAR'),
    h('button', {
      class: 'fechar banner-fechar',
      type: 'button',
      'aria-label': 'Dispensar o desafio',
      onclick() {
        esquecerDesafio();
        banner.remove();
      }
    }, '✖')
  );
  return banner;
}

function erroNaUrl() {
  const hash = location.hash.slice(1);
  if (!hash.includes('error')) return null;
  const p = new URLSearchParams(hash);
  const codigo = p.get('error_code') || '';
  const descricao = (p.get('error_description') || codigo || p.get('error') || '').replace(/\+/g, ' ');
  history.replaceState(null, '', location.pathname + location.search);
  if (codigo.includes('expired')) return 'Esse link de confirmação expirou. Cria a conta de novo ou pede outro e-mail 📬';
  if (codigo.includes('identity') || /identit/i.test(descricao)) return 'Não deu pra vincular: ' + traduzirErro(descricao);
  if (p.get('error') === 'access_denied' && !codigo) return 'Entrada com Google cancelada. Tenta de novo quando quiser 🙂';
  return 'Não deu pra entrar: ' + traduzirErro(descricao);
}

function reduzirMovimento() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function transicao(render, direcao = 'padrao') {
  if (reduzirMovimento() || !document.startViewTransition) {
    render();
    return;
  }
  document.documentElement.dataset.transicao = direcao;
  try {
    const vt = document.startViewTransition(render);
    vt.ready?.catch(() => {});
    vt.finished
      .catch(() => {})
      .finally(() => delete document.documentElement.dataset.transicao);
  } catch {
    delete document.documentElement.dataset.transicao;
    render();
  }
}

function pintarBarraDoSistema() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  meta.setAttribute('content', temaAtual() === 'escuro' ? '#131F24' : '#58CC02');
}

function focarTela() {
  const alvo = app.querySelector('[data-foco]') || app.querySelector('h1, .enunciado, .logo, .nivel-titulo');
  if (!alvo) return;
  alvo.setAttribute('tabindex', '-1');
  alvo.focus({ preventScroll: true });
}

function temaAtual() {
  return document.documentElement.dataset.tema === 'escuro' ? 'escuro' : 'claro';
}

function alternarTema() {
  const novo = temaAtual() === 'escuro' ? 'claro' : 'escuro';
  const trocar = () => {
    localStorage.setItem('gringolingo:tema', novo);
    document.documentElement.dataset.tema = novo;
    pintarBarraDoSistema();
    repintarTelaAtual();
  };
  transicao(trocar, 'tema');
}

function botaoTema() {
  const escuro = temaAtual() === 'escuro';
  return h('button', {
    class: 'pilula btn-perfil',
    type: 'button',
    'aria-label': escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro',
    'aria-pressed': escuro ? 'true' : 'false',
    title: escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro',
    onclick: alternarTema
  }, escuro ? '☀️' : '🌙');
}

function checarGoogle() {
  if (!nuvemConfigurada || temGoogle) return;
  googleAtivo().then(ativo => {
    if (!ativo || temGoogle) return;
    temGoogle = true;
    if (telaAtiva === 'login') {
      const slot = document.querySelector('.login-slot-google');
      const msg = document.querySelector('.login-msg');
      if (slot && msg && !slot.children.length) slot.append(...montarBotaoGoogle(msg));
    } else if (telaAtiva === 'perfil') {
      telaPerfil();
    }
  });
}

async function aposLogin(interativo) {
  const g = ++geracaoAuth;
  authCarregando = !interativo;
  let s = null;
  try {
    s = await sessaoAtual();
  } catch {}
  if (g !== geracaoAuth) return;
  authCarregando = false;
  usuarioEmail = s?.user?.email ?? null;
  if (!usuarioEmail) {
    ativarSync(false);
    syncPendente = false;
    provedores = [];
    finalizarAuth(interativo);
    return;
  }
  provedores = (s.user.identities ?? []).map(i => i.provider);
  try {
    const remoto = await baixarProgresso();
    if (g !== geracaoAuth) return;
    if (contaLocal() && contaLocal() !== s.user.id) resetarEstado();
    definirContaLocal(s.user.id);
    ativarSync(true);
    syncPendente = false;
    mesclarEstado(remoto);
    atualizarItensExtras();
  } catch {
    if (g !== geracaoAuth) return;
    ativarSync(false);
    syncPendente = true;
  }
  finalizarAuth(interativo);
}

function finalizarAuth(interativo) {
  if (avisoPendente) {
    const a = avisoPendente;
    avisoPendente = null;
    if (usuarioEmail) {
      avisoPerfil = a;
      telaPerfil();
    } else {
      telaLogin(a);
    }
    return;
  }
  if (interativo) telaInicial();
  else repintarTelaAtual();
}

function repintarTelaAtual() {
  if (telaAtiva === 'inicial') telaInicial();
  else if (telaAtiva === 'perfil') telaPerfil();
  else if (telaAtiva === 'login' && usuarioEmail && !document.querySelector('.login .entrada')?.value) telaInicial();
}

function telaPerfil() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'perfil';
  registrarRota('perfil');
  checarGoogle();
  if (temGoogle && usuarioEmail) {
    provedoresDaConta().then(p => {
      if (telaAtiva !== 'perfil') return;
      if (JSON.stringify(p) !== JSON.stringify(provedores)) {
        provedores = p;
        telaPerfil();
      }
    });
  }
  const nv = nivelInfo();
  const palavras = new Set(itensAprendidos().map(i => i.en)).size;
  const precisao = estado.stats.respostas ? Math.round(estado.stats.acertos / estado.stats.respostas * 100) : 0;
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Voltar', onclick: () => voltarTela() }, '← Voltar'),
      h('div', { class: 'espaco' }),
      botaoTema(),
      h('div', { class: 'logo', role: 'heading', 'aria-level': '1' }, '👤 Seu perfil')
    ),
    h('div', { class: 'card nivel-card' },
      h('span', { class: 'nivel-emoji' }, nv.emoji),
      h('div', { class: 'nivel-info' },
        h('div', { class: 'nivel-titulo' }, `Nível ${nv.numero} · ${nv.titulo}`),
        h('div', {
          class: 'progresso nivel-prog',
          role: 'progressbar',
          'aria-valuemin': '0',
          'aria-valuemax': '100',
          'aria-valuenow': String(Math.round(nv.progresso * 100)),
          'aria-label': 'Progresso do nível'
        }, h('div', { style: `width:${Math.round(nv.progresso * 100)}%` })),
        h('div', { class: 'nivel-xp' }, nv.prox ? `${estado.xp} / ${nv.prox.xp} XP` : 'Nível máximo! 👑')
      )
    ),
    h('div', { class: 'stats-grid' },
      statPilula('🔥', streakAtual(), 'dias seguidos'),
      statPilula('📚', licoesConcluidas(), 'lições concluídas'),
      statPilula('🗣️', palavras, 'palavras aprendidas'),
      statPilula('🎯', precisao + '%', 'precisão média'),
      statPilula('⚡', 'x' + estado.stats.comboMax, 'combo máximo'),
      statPilula('🧠', estado.stats.revisoes, 'revisões turbo'),
      statPilula('🌱', memorizadas(), 'na memória longa'),
      statPilula('📅', itensVencidos().length, 'vencendo hoje'),
      statPilula('🧊', estado.protetores, 'protetores de streak')
    ),
    cartaoJornada(),
    cartaoTropecos(),
    cartaoVoz(),
    cartaoFonte(),
    cartaoIa(),
    cartaoLembrete(),
    cartaoBackup(),
    cartaoCompartilhar(),
    h('div', { class: 'secao-titulo' }, '🏅 Conquistas'),
    h('div', { class: 'badges-grid' },
      BADGES.map(b => {
        const tem = estado.badges.includes(b.id);
        return h('div', { class: 'badge-card' + (tem ? '' : ' trancada') },
          h('div', { class: 'badge-emoji' }, b.emoji),
          h('div', { class: 'badge-nome' }, b.nome),
          h('div', { class: 'badge-desc' }, b.desc)
        );
      })
    ),
    cartaoConta(),
    cartaoSobre()
  );
  focarTela();
}

function cartaoTropecos() {
  const padroes = resumoPadroes(3);
  const fracos = palavrasFracas(itensAprendidos()).slice(0, 5);
  if (!padroes.length && !fracos.length) {
    if (!estado.stats.respostas) return '';
    return h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, '🧭 Pontos fracos'),
      h('p', { class: 'dica-dia-corpo' }, 'Quando um erro se repetir, ele aparece aqui. A revisão passa a cobrar essa palavra primeiro.')
    );
  }
  return h('div', { class: 'card' },
    h('div', { class: 'nivel-titulo' }, '🧭 Pontos fracos'),
    h('p', { class: 'dica-dia-corpo' }, 'A revisão turbo prioriza estas palavras. O padrão diz o porquê.'),
    ...padroes.map(p => h('div', { class: 'tropeco' },
      h('div', { class: 'tropeco-nome' }, `${rotuloChave(p.chave, p.tipo)} · ${p.n}`),
      h('p', { class: 'tropeco-dica' }, textoDoPadrao(p.chave, p.tipo))
    )),
    fracos.length ? h('div', { class: 'tropeco-lista' },
      fracos.map(f => h('div', { class: 'tropeco-palavra' },
        h('span', { lang: 'en' }, f.item.en),
        h('span', { class: 'tropeco-saldo' }, `${f.saldo}×`)
      ))
    ) : '',
    h('div', { class: 'backup-botoes' },
      h('button', { class: 'btn btn-branco tropeco-btn', type: 'button', onclick: telaPontosFracos }, 'VER PADRÕES'),
      fracos.length ? h('button', { class: 'btn btn-verde tropeco-btn', type: 'button', onclick: iniciarPontosFracos }, 'TREINAR AGORA') : ''
    )
  );
}

function telaPontosFracos() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'fracos';
  registrarRota('fracos');
  const aprendidos = itensAprendidos();
  const padroes = resumoPadroes(8);
  const fracos = palavrasFracas(aprendidos);
  app.innerHTML = '';
  const linhas = padroes.map(p => {
    const rotulo = rotuloChave(p.chave, p.tipo);
    const itens = palavrasDoPadrao(p.chave, aprendidos);
    const attrs = {
      class: 'btn ' + (itens.length ? 'btn-verde' : 'btn-branco') + ' tropeco-btn',
      type: 'button',
      'aria-label': itens.length
        ? `Treinar o padrão ${rotulo}, ${p.n} vezes`
        : `Padrão ${rotulo} sem palavra aberta agora`
    };
    if (itens.length) attrs.onclick = () => treinarPadrao(p.chave);
    else attrs.disabled = '';
    return h('div', { class: 'tropeco' },
      h('div', { class: 'tropeco-nome' }, `${rotulo} · ${p.n}`),
      h('p', { class: 'tropeco-dica' }, textoDoPadrao(p.chave, p.tipo)),
      itens.length
        ? h('p', { class: 'tropeco-dica' }, itens.slice(0, 4).map(f => f.item.en).join(', '))
        : h('p', { class: 'tropeco-dica' }, 'Nenhuma palavra aberta com esse padrão agora.'),
      h('button', attrs, itens.length ? 'TREINAR' : 'SEM PALAVRA')
    );
  });
  app.append(
    topoVoltar('🧭 Meus pontos fracos', () => voltarTela()),
    h('p', { class: 'ia-aviso' }, 'O padrão que mais volta fica no topo. Cada um tem o próprio treino.'),
    h('div', { class: 'card', 'data-foco': '1' },
      h('div', { class: 'nivel-titulo' }, padroes.length ? 'Padrões que mais voltam' : 'Nenhum padrão repetido ainda'),
      h('p', { class: 'dica-dia-corpo' }, padroes.length
        ? 'Dois erros do mesmo tipo entram na lista. O botão treina só as palavras daquele padrão.'
        : 'Quando um erro se repetir, ele aparece aqui, com um botão para treinar só ele.')
    ),
    ...linhas.map(linha => h('div', { class: 'card' }, linha)),
    fracos.length
      ? h('button', { class: 'btn btn-verde', type: 'button', onclick: iniciarPontosFracos }, 'TREINAR TODAS AS PALAVRAS')
      : ''
  );
  focarTela();
}

function treinarPadrao(chave) {
  const aprendidos = itensAprendidos();
  const fracos = palavrasDoPadrao(chave, aprendidos);
  const itens = fracos.slice(0, 8).map(f => f.item);
  if (!itens.length) return;
  const fila = gerarExercicios(itens, aprendidos, Math.min(8, Math.max(4, itens.length * 2)));
  if (!fila.length) return;
  sessao = {
    tipo: 'revisao', pool: aprendidos, fila, itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map(), deslizes: []
  };
  telaExercicio();
}

function telaPapo() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'papo';
  registrarRota('papo');
  papoSessao = null;
  const cena = montarPapo(diaLocalAgora());
  app.innerHTML = '';
  app.append(
    topoVoltar('💬 Conversa livre', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, cena
      ? `Três assuntos de hoje: ${cena.assuntos.join(', ')}. Cada um tem uma pergunta de acompanhamento. A frase modelo só aparece depois.`
      : 'A conversa precisa de uma data válida.'),
    cena ? h('button', { class: 'btn btn-verde', type: 'button', onclick: abrirPapo }, 'COMEÇAR') : ''
  );
  focarTela();
}

function abrirPapo() {
  const cena = montarPapo(diaLocalAgora());
  if (!cena) return telaPapo();
  descartarVoz();
  papoSessao = novaCena(cena);
  pintarPapo();
}

function pintarPapo() {
  pintarCenaLista(papoSessao, {
    rota: 'papo',
    aoLista: telaPapo,
    repintar: pintarPapo,
    avaliar: avaliarResposta,
    registrar: registrarPapo,
    tituloFim: 'Papo feito!'
  });
}

function telaSimulado() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'simulado';
  registrarRota('simulado');
  simuladoSessao = null;
  const cena = montarSimulado(diaLocalAgora());
  app.innerHTML = '';
  app.append(
    topoVoltar('🎯 Simulado remoto', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, cena
      ? `Seis falas de treinos que você já fez: ${cena.rodadas.map(r => r.etapa).join(', ')}. A nota sai no fim. A frase modelo só aparece depois.`
      : 'O simulado precisa de uma data válida.'),
    cena ? h('button', { class: 'btn btn-verde', type: 'button', onclick: abrirSimulado }, 'COMEÇAR') : ''
  );
  focarTela();
}

function abrirSimulado() {
  const cena = montarSimulado(diaLocalAgora());
  if (!cena) return telaSimulado();
  descartarVoz();
  simuladoSessao = novaCena(cena);
  pintarSimulado();
}

function pintarSimulado() {
  pintarCenaLista(simuladoSessao, {
    rota: 'simulado',
    aoLista: telaSimulado,
    repintar: pintarSimulado,
    avaliar: avaliarResposta,
    registrar: registrarSimulado,
    tituloFim: 'Simulado feito!',
    sub: nota => faixaDoSimulado(nota)
  });
}

function telaSprints() {
  listarCena(
    'sprint',
    '🖥️ Demo da sprint',
    'Duas falas: o que saiu e a pergunta que você não esperava. A frase modelo só aparece depois.',
    SPRINTS,
    abrirSprint,
    valor => { sprintSessao = valor; }
  );
}

function abrirSprint(id) {
  abrirCenaLista(id, sprintPorId, cena => { sprintSessao = cena; }, pintarSprint, telaSprints);
}

function pintarSprint() {
  pintarCenaLista(sprintSessao, {
    rota: 'sprint',
    aoLista: telaSprints,
    repintar: pintarSprint,
    avaliar: avaliarSprint,
    registrar: registrarSprint,
    tituloFim: 'Sprint dita!'
  });
}

function telaSeguros() {
  listarCena(
    'seguro',
    '🔐 A decisão segura',
    'Duas falas: o risco e o plano. A frase modelo só aparece depois.',
    SEGUROS,
    abrirSeguro,
    valor => { seguroSessao = valor; }
  );
}

function abrirSeguro(id) {
  abrirCenaLista(id, seguroPorId, cena => { seguroSessao = cena; }, pintarSeguro, telaSeguros);
}

function pintarSeguro() {
  pintarCenaLista(seguroSessao, {
    rota: 'seguro',
    aoLista: telaSeguros,
    repintar: pintarSeguro,
    avaliar: avaliarSeguro,
    registrar: registrarSeguro,
    tituloFim: 'Decisão dita!'
  });
}

function telaMeetups() {
  listarCena(
    'meetup',
    '🎫 No meetup',
    'Duas falas: o oi e o assunto. A frase modelo só aparece depois.',
    MEETUPS,
    abrirMeetup,
    valor => { meetupSessao = valor; }
  );
}

function abrirMeetup(id) {
  abrirCenaLista(id, meetupPorId, cena => { meetupSessao = cena; }, pintarMeetup, telaMeetups);
}

function pintarMeetup() {
  pintarCenaLista(meetupSessao, {
    rota: 'meetup',
    aoLista: telaMeetups,
    repintar: pintarMeetup,
    avaliar: avaliarMeetup,
    registrar: registrarMeetup,
    tituloFim: 'Contato feito!'
  });
}

function telaCompleta() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'completa';
  registrarRota('completa');
  completaSessao = null;
  const cena = montarCompleta(diaLocalAgora());
  app.innerHTML = '';
  app.append(
    topoVoltar('🎓 Entrevista completa', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, cena
      ? 'Cinco treinos em sequência: Portfólio, Sistema, Salário, STAR, Pergunta. A nota sai no fim. A frase modelo só aparece depois.'
      : 'A entrevista precisa de uma data válida.'),
    cena ? h('ol', { id: 'completa-passos', 'aria-label': 'Cinco treinos da entrevista' },
      cena.rodadas.map(r => h('li', {}, r.etapa))
    ) : '',
    cena ? h('button', { class: 'btn btn-verde', type: 'button', onclick: abrirCompleta }, 'COMEÇAR') : ''
  );
  focarTela();
}

function abrirCompleta() {
  const cena = montarCompleta(diaLocalAgora());
  if (!cena) return telaCompleta();
  descartarVoz();
  completaSessao = novaCena(cena);
  pintarCompleta();
}

function pintarCompleta() {
  pintarCenaLista(completaSessao, {
    rota: 'completa',
    aoLista: telaCompleta,
    repintar: pintarCompleta,
    avaliar: avaliarResposta,
    registrar: registrarCompleta,
    tituloFim: 'Entrevista feita!',
    sub: nota => faixaDaCompleta(nota),
    rotulo: s => `Treino ${s.i + 1} de ${s.cena.rodadas.length} · ${s.cena.rodadas[s.i].etapa}`
  });
}

function telaRodadas() {
  listarCena(
    'rodada',
    '📝 A mesa da retro',
    'Três falas: o fato, o ajuste e o dono. A frase modelo só aparece depois.',
    MESAS,
    abrirRodada,
    valor => { rodadaSessao = valor; }
  );
}

function abrirRodada(id) {
  abrirCenaLista(id, mesaPorId, cena => { rodadaSessao = cena; }, pintarRodada, telaRodadas);
}

function pintarRodada() {
  pintarCenaLista(rodadaSessao, {
    rota: 'rodada',
    aoLista: telaRodadas,
    repintar: pintarRodada,
    avaliar: avaliarMesa,
    registrar: registrarRodada,
    tituloFim: 'Mesa feita!'
  });
}

function telaMigras() {
  listarCena(
    'migra',
    '🚚 A migração',
    'Duas falas: a mudança e o risco. A frase modelo só aparece depois.',
    MIGRAS,
    abrirMigra,
    valor => { migraSessao = valor; }
  );
}

function abrirMigra(id) {
  abrirCenaLista(id, migraPorId, cena => { migraSessao = cena; }, pintarMigra, telaMigras);
}

function pintarMigra() {
  pintarCenaLista(migraSessao, {
    rota: 'migra',
    aoLista: telaMigras,
    repintar: pintarMigra,
    avaliar: avaliarMigra,
    registrar: registrarMigra,
    tituloFim: 'Risco dito!'
  });
}

function telaEstreias() {
  listarCena(
    'estreia',
    '👋 Primeiro dia',
    'Duas falas: o oi e o pedido. A frase modelo só aparece depois.',
    ESTREIAS,
    abrirEstreia,
    valor => { estreiaSessao = valor; }
  );
}

function abrirEstreia(id) {
  abrirCenaLista(id, estreiaPorId, cena => { estreiaSessao = cena; }, pintarEstreia, telaEstreias);
}

function pintarEstreia() {
  pintarCenaLista(estreiaSessao, {
    rota: 'estreia',
    aoLista: telaEstreias,
    repintar: pintarEstreia,
    avaliar: avaliarEstreia,
    registrar: registrarEstreia,
    tituloFim: 'Oi feito!'
  });
}

function textoNotaFoco(nota) {
  const nome = FOCOS.find(f => f.id === nota.foco)?.nome || nota.foco;
  return `${nota.dia} · ${nome} · ${nota.nota} · ${faixaDoFoco(nota.nota)}`;
}

function telaFoco() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'foco';
  registrarRota('foco');
  focoSessao = null;
  const foco = FOCOS.find(f => f.id === focoEscolhido) || FOCOS[0];
  focoEscolhido = foco.id;
  const cena = montarFoco(diaLocalAgora(), foco.id);
  const notas = Array.isArray(estado.notasFoco) ? estado.notasFoco : [];
  app.innerHTML = '';
  app.append(
    topoVoltar('🧩 Entrevista por foco', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, cena
      ? 'Cinco treinos do foco escolhido. A nota sai no fim e fica neste aparelho. A frase modelo só aparece depois.'
      : 'A entrevista precisa de uma data válida.'),
    h('div', { id: 'foco-escolha', class: 'fila-botoes', role: 'group', 'aria-label': 'Foco da entrevista' },
      FOCOS.map(item => h('button', {
        class: 'pilula',
        type: 'button',
        'aria-pressed': item.id === foco.id ? 'true' : 'false',
        onclick() {
          focoEscolhido = item.id;
          telaFoco();
        }
      }, item.nome))
    ),
    cena ? h('ol', { id: 'foco-passos', 'aria-label': 'Cinco treinos deste foco' },
      cena.rodadas.map(r => h('li', {}, r.etapa))
    ) : '',
    h('div', { class: 'card', id: 'foco-notas' },
      h('div', { class: 'nivel-titulo' }, 'Notas neste aparelho'),
      notas.length
        ? h('ol', { 'aria-label': 'Histórico de notas' }, notas.map(n => h('li', {}, textoNotaFoco(n))))
        : h('p', { class: 'revisao-sub' }, 'Ainda não há nota neste aparelho.')
    ),
    cena ? h('button', { class: 'btn btn-verde', type: 'button', onclick: abrirFoco }, 'COMEÇAR') : ''
  );
  focarTela();
}

function abrirFoco() {
  const cena = montarFoco(diaLocalAgora(), focoEscolhido);
  if (!cena) return telaFoco();
  descartarVoz();
  focoSessao = novaCena(cena);
  pintarFoco();
}

function pintarFoco() {
  pintarCenaLista(focoSessao, {
    rota: 'foco',
    aoLista: telaFoco,
    repintar: pintarFoco,
    avaliar: avaliarResposta,
    registrar: d => registrarFoco({ ...d, foco: focoEscolhido }),
    tituloFim: 'Foco feito!',
    sub: nota => faixaDoFoco(nota),
    rotulo: s => `Treino ${s.i + 1} de ${s.cena.rodadas.length} · ${s.cena.rodadas[s.i].etapa}`
  });
}

function telaPokers() {
  listarCena(
    'poker',
    '🃏 A carta',
    'Duas falas: a carta e o motivo. A frase modelo só aparece depois.',
    POKERS,
    abrirPoker,
    valor => { pokerSessao = valor; }
  );
}

function abrirPoker(id) {
  abrirCenaLista(id, pokerPorId, cena => { pokerSessao = cena; }, pintarPoker, telaPokers);
}

function pintarPoker() {
  pintarCenaLista(pokerSessao, {
    rota: 'poker',
    aoLista: telaPokers,
    repintar: pintarPoker,
    avaliar: avaliarPoker,
    registrar: registrarPoker,
    tituloFim: 'Carta dita!'
  });
}

function telaLeigos() {
  listarCena(
    'leigo',
    '🧮 A conta da IA',
    'Duas falas: a conta e o limite. A frase modelo só aparece depois.',
    LEIGOS,
    abrirLeigo,
    valor => { leigoSessao = valor; }
  );
}

function abrirLeigo(id) {
  abrirCenaLista(id, leigoPorId, cena => { leigoSessao = cena; }, pintarLeigo, telaLeigos);
}

function pintarLeigo() {
  pintarCenaLista(leigoSessao, {
    rota: 'leigo',
    aoLista: telaLeigos,
    repintar: pintarLeigo,
    avaliar: avaliarLeigo,
    registrar: registrarLeigo,
    tituloFim: 'Conta dita!'
  });
}

function telaRecrutas() {
  listarCena(
    'recruta',
    '📞 A ligação',
    'Duas falas: a pretensão e a janela. A frase modelo só aparece depois.',
    RECRUTAS,
    abrirRecruta,
    valor => { recrutaSessao = valor; }
  );
}

function abrirRecruta(id) {
  abrirCenaLista(id, recrutaPorId, cena => { recrutaSessao = cena; }, pintarRecruta, telaRecrutas);
}

function pintarRecruta() {
  pintarCenaLista(recrutaSessao, {
    rota: 'recruta',
    aoLista: telaRecrutas,
    repintar: pintarRecruta,
    avaliar: avaliarRecruta,
    registrar: registrarRecruta,
    tituloFim: 'Ligação feita!'
  });
}

function telaCulpas() {
  listarCena(
    'culpa',
    '🙏 A desculpa',
    'Duas falas: o erro e o plano. A frase modelo só aparece depois.',
    CULPAS,
    abrirCulpa,
    valor => { culpaSessao = valor; }
  );
}

function abrirCulpa(id) {
  abrirCenaLista(id, culpaPorId, cena => { culpaSessao = cena; }, pintarCulpa, telaCulpas);
}

function pintarCulpa() {
  pintarCenaLista(culpaSessao, {
    rota: 'culpa',
    aoLista: telaCulpas,
    repintar: pintarCulpa,
    avaliar: avaliarCulpa,
    registrar: registrarCulpa,
    tituloFim: 'Erro assumido!'
  });
}

function telaRaios() {
  listarCena(
    'raio',
    '🔦 O relâmpago',
    'Duas falas: o tempo e o projeto. A frase modelo só aparece depois.',
    RAIOS,
    abrirRaio,
    valor => { raioSessao = valor; }
  );
}

function abrirRaio(id) {
  abrirCenaLista(id, raioPorId, cena => { raioSessao = cena; }, pintarRaio, telaRaios);
}

function pintarRaio() {
  pintarCenaLista(raioSessao, {
    rota: 'raio',
    aoLista: telaRaios,
    repintar: pintarRaio,
    avaliar: avaliarRaio,
    registrar: registrarRaio,
    tituloFim: 'Relâmpago feito!'
  });
}

function telaOfertas() {
  listarCena(
    'oferta',
    '💻 A oferta',
    'Duas falas: o pedido e a data. A frase modelo só aparece depois.',
    OFERTAS,
    abrirOferta,
    valor => { ofertaSessao = valor; }
  );
}

function abrirOferta(id) {
  abrirCenaLista(id, ofertaPorId, cena => { ofertaSessao = cena; }, pintarOferta, telaOfertas);
}

function pintarOferta() {
  pintarCenaLista(ofertaSessao, {
    rota: 'oferta',
    aoLista: telaOfertas,
    repintar: pintarOferta,
    avaliar: avaliarOferta,
    registrar: registrarOferta,
    tituloFim: 'Oferta falada!'
  });
}

function telaSombra() {
  abrirSombra();
}

function telaPedidos() {
  listarCena(
    'pedido',
    '🙋 Não entendi',
    'Duas falas: o pedido e o eco. A frase modelo só aparece depois.',
    PEDIDOS,
    abrirPedido,
    valor => { pedidoSessao = valor; }
  );
}

function abrirPedido(id) {
  abrirCenaLista(id, pedidoPorId, cena => { pedidoSessao = cena; }, pintarPedido, telaPedidos);
}

function pintarPedido() {
  pintarCenaLista(pedidoSessao, {
    rota: 'pedido',
    aoLista: telaPedidos,
    repintar: pintarPedido,
    avaliar: avaliarPedido,
    registrar: registrarPedido,
    tituloFim: 'Esclareceu!'
  });
}

function telaCoberturas() {
  listarCena(
    'cobertura',
    '🧪 A cobertura',
    'Duas falas: o teste e o caso. A frase modelo só aparece depois.',
    COBERTURAS,
    abrirCobertura,
    valor => { coberturaSessao = valor; }
  );
}

function abrirCobertura(id) {
  abrirCenaLista(id, coberturaPorId, cena => { coberturaSessao = cena; }, pintarCobertura, telaCoberturas);
}

function pintarCobertura() {
  pintarCenaLista(coberturaSessao, {
    rota: 'cobertura',
    aoLista: telaCoberturas,
    repintar: pintarCobertura,
    avaliar: avaliarCobertura,
    registrar: registrarCobertura,
    tituloFim: 'Cobertura falada!'
  });
}

function telaLooms() {
  listarCena(
    'loom',
    '🎥 O vídeo',
    'Duas falas: o tempo e o link. A frase modelo só aparece depois.',
    LOOMS,
    abrirLoom,
    valor => { loomSessao = valor; }
  );
}

function abrirLoom(id) {
  abrirCenaLista(id, loomPorId, cena => { loomSessao = cena; }, pintarLoom, telaLooms);
}

function pintarLoom() {
  pintarCenaLista(loomSessao, {
    rota: 'loom',
    aoLista: telaLooms,
    repintar: pintarLoom,
    avaliar: avaliarLoom,
    registrar: registrarLoom,
    tituloFim: 'Vídeo deixado!'
  });
}

function telaCaderno() {
  cadernoPalavra = '';
  cadernoFeedback = null;
  pintarCaderno();
}

function abrirPalavra(en) {
  if (!termosDaFala(estado.errosFala).some(item => item.en === en)) return telaCaderno();
  cadernoPalavra = en;
  cadernoFeedback = null;
  pintarCaderno();
}

function pintarCaderno() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'caderno';
  registrarRota('caderno');
  const lista = termosDaFala(estado.errosFala);
  app.innerHTML = '';
  if (!cadernoPalavra) {
    app.append(
      topoVoltar('📒 Meu vocabulário', () => voltarTela(telaConversa)),
      h('p', { class: 'ia-aviso' }, 'Palavras que escaparam nas falas deste aparelho. Use cada uma numa frase curta.'),
      lista.length
        ? h('div', { role: 'list', 'aria-label': 'Palavras que escaparam nas falas' },
          ...lista.map(item => h('button', {
            class: 'card revisao',
            type: 'button',
            role: 'listitem',
            onclick: () => abrirPalavra(item.en)
          },
            h('div', { class: 'revisao-textos' },
              h('div', { class: 'revisao-titulo', lang: 'en' }, item.en),
              h('div', { class: 'revisao-sub' }, `${item.n} vez${item.n > 1 ? 'es' : ''} nas falas`)
            )
          ))
        )
        : h('p', { class: 'ia-aviso', role: 'status', 'data-foco': '1' }, 'Ainda não há palavra neste aparelho.')
    );
    focarTela();
    return;
  }
  const palavra = cadernoPalavra;
  const campo = campoResposta('Escreva uma frase em inglês...');
  const miolo = [
    topoVoltar('📒 Meu vocabulário', () => telaCaderno()),
    h('div', { class: 'revisao-sub', role: 'status', 'aria-live': 'polite' }, 'Uma frase com a palavra'),
    h('p', { class: 'sombra-frase', lang: 'en' }, palavra),
    h('p', { class: 'ia-aviso' }, 'Use a palavra numa frase de pelo menos três palavras.')
  ];
  if (cadernoFeedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(cadernoFeedback));
    miolo.push(barraModelo(cadernoFeedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      type: 'button',
      onclick() {
        const aval = cadernoFeedback;
        const evento = registrarCaderno({
          xp: 10 + (aval.ok ? 8 : 0),
          acertos: aval.ok ? 1 : 0,
          respostas: 1,
          nota: aval.nota,
          errosFala: [],
          perfeita: false,
          comboMax: 0
        });
        cadernoPalavra = '';
        cadernoFeedback = null;
        pintarFim({
          titulo: aval.ok ? 'Palavra usada!' : 'Palavra revista',
          sub: palavra,
          nota: aval.nota,
          xp: 10 + (aval.ok ? 8 : 0) + (evento.bonusMissoes ?? 0),
          evento,
          destino: telaCaderno,
          painel: true,
          resumo: true
        });
      }
    }, 'CONCLUIR'));
  } else {
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const conferir = h('button', { class: 'btn btn-verde', type: 'button', disabled: true }, 'CONFERIR');
    campo.entrada.addEventListener('input', () => {
      conferir.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || cadernoFeedback) return;
      await finalizarGravacao();
      cadernoFeedback = avaliarPalavra(palavra, campo.entrada.value);
      if (cadernoFeedback.ok) sons.acerto();
      else sons.erro();
      pintarCaderno();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    conferir.addEventListener('click', () => { enviar(); });
    miolo.push(conferir);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!cadernoFeedback) campo.entrada.focus();
}

function telaGraficos() {
  listarCena(
    'grafico',
    '📉 O gráfico',
    'Duas falas: a leitura e a causa. A frase modelo só aparece depois.',
    GRAFICOS,
    abrirGrafico,
    valor => { graficoSessao = valor; }
  );
}

function abrirGrafico(id) {
  abrirCenaLista(id, graficoPorId, cena => { graficoSessao = cena; }, pintarGrafico, telaGraficos);
}

function pintarGrafico() {
  pintarCenaLista(graficoSessao, {
    rota: 'grafico',
    aoLista: telaGraficos,
    repintar: pintarGrafico,
    avaliar: avaliarGrafico,
    registrar: registrarGrafico,
    tituloFim: 'Gráfico falado!'
  });
}

function telaHandoffs() {
  listarCena(
    'handoff',
    '🕒 O handoff',
    'Duas falas: o pedido e a nota. A frase modelo só aparece depois.',
    HANDOFFS,
    abrirHandoff,
    valor => { handoffSessao = valor; }
  );
}

function abrirHandoff(id) {
  abrirCenaLista(id, handoffPorId, cena => { handoffSessao = cena; }, pintarHandoff, telaHandoffs);
}

function pintarHandoff() {
  pintarCenaLista(handoffSessao, {
    rota: 'handoff',
    aoLista: telaHandoffs,
    repintar: pintarHandoff,
    avaliar: avaliarHandoff,
    registrar: registrarHandoff,
    tituloFim: 'Handoff passado!'
  });
}

function telaElevadores() {
  listarCena(
    'elevador',
    '🚪 O elevador',
    'Duas falas: quem você é e o que faz agora. A frase modelo só aparece depois.',
    ELEVADORES,
    abrirElevador,
    valor => { elevadorSessao = valor; }
  );
}

function abrirElevador(id) {
  abrirCenaLista(id, elevadorPorId, cena => { elevadorSessao = cena; }, pintarElevador, telaElevadores);
}

function pintarElevador() {
  pintarCenaLista(elevadorSessao, {
    rota: 'elevador',
    aoLista: telaElevadores,
    repintar: pintarElevador,
    avaliar: avaliarElevador,
    registrar: registrarElevador,
    tituloFim: 'Elevador feito!'
  });
}

function planoDaJunta() {
  const soma = somarSemana(estado.painel, diaLocalAgora());
  return montarJunta({
    erros: estado.errosFala,
    agenda: estado.agendaFala,
    hoje: diaLocalAgora(),
    minutos: soma.minutos,
    meta: estado.metaMinutos
  });
}

function telaJunta() {
  juntaSessao = null;
  pintarJunta();
}

function abrirJunta() {
  const plano = planoDaJunta();
  for (const passo of plano.passos) {
    if (passo.tipo === 'frase') marcarEspaco(passo.en, passo.pt);
  }
  descartarVoz();
  juntaSessao = {
    plano,
    i: 0,
    acertos: 0,
    notas: [],
    feedback: null,
    quando: '',
    concluido: false
  };
  pintarJunta();
}

function concluirJunta() {
  if (!juntaSessao || juntaSessao.concluido) return;
  const nota = fecharNota(juntaSessao.notas);
  const xp = 10 + juntaSessao.acertos * 8;
  const evento = registrarJunta({
    xp,
    acertos: juntaSessao.acertos,
    respostas: juntaSessao.plano.passos.length,
    nota,
    errosFala: [],
    perfeita: false,
    comboMax: 0
  });
  juntaSessao.concluido = true;
  pintarFim({
    titulo: 'Semana junta!',
    sub: textoDaJunta(juntaSessao.plano),
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaJunta,
    painel: true,
    resumo: true
  });
}

function pintarJunta() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'junta';
  registrarRota('junta');
  if (!juntaSessao || juntaSessao.concluido) {
    const plano = planoDaJunta();
    app.innerHTML = '';
    app.append(
      topoVoltar('🗂️ A semana junta', () => voltarTela(telaConversa)),
      h('p', { class: 'ia-aviso' }, 'Vocabulário, frases mais erradas e a meta de minutos, neste aparelho.'),
      h('p', { class: 'ia-aviso', role: 'status', 'data-foco': '1' }, textoDaJunta(plano)),
      h('button', { class: 'btn btn-verde', type: 'button', onclick: abrirJunta }, 'COMEÇAR')
    );
    focarTela();
    return;
  }
  const passos = juntaSessao.plano.passos;
  const passo = passos[juntaSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  const rotulo = passo.tipo === 'palavra' ? 'Palavra' : passo.tipo === 'frase' ? 'Frase' : 'Minutos';
  app.innerHTML = '';
  const miolo = [
    topoVoltar('🗂️ A semana junta', () => telaJunta()),
    h('div', { class: 'revisao-sub', role: 'status', 'aria-live': 'polite' }, `Passo ${juntaSessao.i + 1} de ${passos.length} · ${rotulo}`)
  ];
  if (passo.tipo === 'palavra') {
    miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, passo.en));
    miolo.push(h('p', { class: 'ia-aviso' }, passo.missao));
  } else {
    miolo.push(h('p', { class: 'sombra-frase' }, passo.missao));
  }
  if (juntaSessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(juntaSessao.feedback));
    if (juntaSessao.quando) miolo.push(h('p', { class: 'revisao-sub' }, juntaSessao.quando));
    miolo.push(barraModelo(juntaSessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      type: 'button',
      onclick() {
        if (juntaSessao.i + 1 >= passos.length) concluirJunta();
        else {
          descartarVoz();
          juntaSessao.i++;
          juntaSessao.feedback = null;
          juntaSessao.quando = '';
          pintarJunta();
        }
      }
    }, juntaSessao.i + 1 >= passos.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const conferir = h('button', { class: 'btn btn-verde', type: 'button', disabled: true }, 'CONFERIR');
    campo.entrada.addEventListener('input', () => {
      conferir.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || juntaSessao.feedback) return;
      await finalizarGravacao();
      const aval = avaliarPassoJunta(passo, campo.entrada.value);
      if (passo.tipo === 'frase') {
        const dias = aval.ok ? diasAoAcertar(passo.caixa, INTERVALOS) : 1;
        revisarDeslize(passo.en, aval.ok);
        juntaSessao.quando = textoVolta(dias);
      }
      juntaSessao.notas.push(aval.nota);
      if (aval.ok) {
        juntaSessao.acertos++;
        sons.acerto();
      } else sons.erro();
      juntaSessao.feedback = aval;
      pintarJunta();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    conferir.addEventListener('click', () => { enviar(); });
    miolo.push(conferir);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!juntaSessao.feedback) campo.entrada.focus();
}

function telaPistas() {
  listarCena(
    'pista',
    '🏁 O bug raro',
    'Duas falas: o sintoma e a prova. A frase modelo só aparece depois.',
    PISTAS,
    abrirPista,
    valor => { pistaSessao = valor; }
  );
}

function abrirPista(id) {
  abrirCenaLista(id, pistaPorId, cena => { pistaSessao = cena; }, pintarPista, telaPistas);
}

function pintarPista() {
  pintarCenaLista(pistaSessao, {
    rota: 'pista',
    aoLista: telaPistas,
    repintar: pintarPista,
    avaliar: avaliarPista,
    registrar: registrarPista,
    tituloFim: 'Bug contado!'
  });
}

function telaCalmas() {
  listarCena(
    'calma',
    '🐢 Com calma',
    'Duas falas: o passo e a ideia. A frase modelo só aparece depois.',
    CALMAS,
    abrirCalma,
    valor => { calmaSessao = valor; }
  );
}

function abrirCalma(id) {
  abrirCenaLista(id, calmaPorId, cena => { calmaSessao = cena; }, pintarCalma, telaCalmas);
}

function pintarCalma() {
  pintarCenaLista(calmaSessao, {
    rota: 'calma',
    aoLista: telaCalmas,
    repintar: pintarCalma,
    avaliar: avaliarCalma,
    registrar: registrarCalma,
    tituloFim: 'Conceito explicado!'
  });
}

function telaFolgas() {
  listarCena(
    'folga',
    '🏖️ A folga',
    'Duas falas: o plano e o limite. A frase modelo só aparece depois.',
    FOLGAS,
    abrirFolga,
    valor => { folgaSessao = valor; }
  );
}

function abrirFolga(id) {
  abrirCenaLista(id, folgaPorId, cena => { folgaSessao = cena; }, pintarFolga, telaFolgas);
}

function pintarFolga() {
  pintarCenaLista(folgaSessao, {
    rota: 'folga',
    aoLista: telaFolgas,
    repintar: pintarFolga,
    avaliar: avaliarFolga,
    registrar: registrarFolga,
    tituloFim: 'Limite dito!'
  });
}

function telaRespeitos() {
  listarCena(
    'respeito',
    '🏛️ Com respeito',
    'Duas falas: o ponto e o outro caminho. A frase modelo só aparece depois.',
    RESPEITOS,
    abrirRespeito,
    valor => { respeitoSessao = valor; }
  );
}

function abrirRespeito(id) {
  abrirCenaLista(id, respeitoPorId, cena => { respeitoSessao = cena; }, pintarRespeito, telaRespeitos);
}

function pintarRespeito() {
  pintarCenaLista(respeitoSessao, {
    rota: 'respeito',
    aoLista: telaRespeitos,
    repintar: pintarRespeito,
    avaliar: avaliarRespeito,
    registrar: registrarRespeito,
    tituloFim: 'Ponto dito!'
  });
}

function telaDebitos() {
  listarCena(
    'debito',
    '🧱 A dívida',
    'Duas falas: a dívida e o tempo. A frase modelo só aparece depois.',
    DEBITOS,
    abrirDebito,
    valor => { debitoSessao = valor; }
  );
}

function abrirDebito(id) {
  abrirCenaLista(id, debitoPorId, cena => { debitoSessao = cena; }, pintarDebito, telaDebitos);
}

function pintarDebito() {
  pintarCenaLista(debitoSessao, {
    rota: 'debito',
    aoLista: telaDebitos,
    repintar: pintarDebito,
    avaliar: avaliarDebito,
    registrar: registrarDebito,
    tituloFim: 'Tempo pedido!'
  });
}

function telaIndicacoes() {
  listarCena(
    'indicacao',
    '✉️ A indicação',
    'Duas falas: o pedido e o contexto. A frase modelo só aparece depois.',
    INDICACOES,
    abrirIndicacao,
    valor => { indicacaoSessao = valor; }
  );
}

function abrirIndicacao(id) {
  abrirCenaLista(id, indicacaoPorId, cena => { indicacaoSessao = cena; }, pintarIndicacao, telaIndicacoes);
}

function pintarIndicacao() {
  pintarCenaLista(indicacaoSessao, {
    rota: 'indicacao',
    aoLista: telaIndicacoes,
    repintar: pintarIndicacao,
    avaliar: avaliarIndicacao,
    registrar: registrarIndicacao,
    tituloFim: 'Referência pedida!'
  });
}

function telaUx() {
  listarCena(
    'ux',
    '🎨 O contraste',
    'Duas falas: a decisão e o motivo. A frase modelo só aparece depois.',
    UXS,
    abrirUx,
    valor => { uxSessao = valor; }
  );
}

function abrirUx(id) {
  abrirCenaLista(id, uxPorId, cena => { uxSessao = cena; }, pintarUx, telaUx);
}

function pintarUx() {
  pintarCenaLista(uxSessao, {
    rota: 'ux',
    aoLista: telaUx,
    repintar: pintarUx,
    avaliar: avaliarUx,
    registrar: registrarUx,
    tituloFim: 'Decisão dita!'
  });
}

function telaForum() {
  listarCena(
    'forum',
    '📣 O fórum',
    'Duas falas: o problema e o que você já tentou. A frase modelo só aparece depois.',
    FORUNS,
    abrirForum,
    valor => { forumSessao = valor; }
  );
}

function abrirForum(id) {
  abrirCenaLista(id, forumPorId, cena => { forumSessao = cena; }, pintarForum, telaForum);
}

function pintarForum() {
  pintarCenaLista(forumSessao, {
    rota: 'forum',
    aoLista: telaForum,
    repintar: pintarForum,
    avaliar: avaliarForum,
    registrar: registrarForum,
    tituloFim: 'Ajuda pedida!'
  });
}

function telaVisto() {
  listarCena(
    'visto',
    '🛂 O visto',
    'Duas falas: o pedido e o detalhe. A frase modelo só aparece depois.',
    VISTOS,
    abrirVisto,
    valor => { vistoSessao = valor; }
  );
}

function abrirVisto(id) {
  abrirCenaLista(id, vistoPorId, cena => { vistoSessao = cena; }, pintarVisto, telaVisto);
}

function pintarVisto() {
  pintarCenaLista(vistoSessao, {
    rota: 'visto',
    aoLista: telaVisto,
    repintar: pintarVisto,
    avaliar: avaliarVisto,
    registrar: registrarVisto,
    tituloFim: 'Conversa feita!'
  });
}

function telaMes() {
  if (!estado.stats.meses) {
    registrarMes({
      xp: 10,
      nota: null,
      acertos: 0,
      respostas: 0,
      perfeita: false,
      comboMax: 0,
      errosFala: []
    });
  }
  pintarMes();
}

function pintarMes() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'mes';
  registrarRota('mes');
  const plano = montarMes(estado.painel, diaLocalAgora());
  app.innerHTML = '';
  app.append(
    topoVoltar('📆 O mês', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Notas, minutos e preenchimentos das últimas quatro semanas, neste aparelho.'),
    h('p', { class: 'ia-aviso', role: 'status', 'data-foco': '1' }, textoDoMes(plano)),
    ...plano.map(semana => h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, rotuloSemana(semana.inicio)),
      h('p', {}, textoDaSemana(semana))
    ))
  );
  focarTela();
}

function telaFacils() {
  listarCena(
    'facil',
    '🧭 O facilitador',
    'Duas falas: a abertura e o fecho. A frase modelo só aparece depois.',
    FACILS,
    abrirFacil,
    valor => { facilSessao = valor; }
  );
}

function abrirFacil(id) {
  abrirCenaLista(id, facilPorId, cena => { facilSessao = cena; }, pintarFacil, telaFacils);
}

function pintarFacil() {
  pintarCenaLista(facilSessao, {
    rota: 'facil',
    aoLista: telaFacils,
    repintar: pintarFacil,
    avaliar: avaliarFacil,
    registrar: registrarFacil,
    tituloFim: 'Reunião conduzida!'
  });
}

function telaStacks() {
  listarCena(
    'stack',
    '🧰 A escolha',
    'Duas falas: a escolha e a troca. A frase modelo só aparece depois.',
    ESCOLHAS,
    abrirStack,
    valor => { stackSessao = valor; }
  );
}

function abrirStack(id) {
  abrirCenaLista(id, escolhaPorId, cena => { stackSessao = cena; }, pintarStack, telaStacks);
}

function pintarStack() {
  pintarCenaLista(stackSessao, {
    rota: 'stack',
    aoLista: telaStacks,
    repintar: pintarStack,
    avaliar: avaliarEscolhaStack,
    registrar: registrarEscolhaStack,
    tituloFim: 'Escolha dita!'
  });
}

function telaSabados() {
  listarCena(
    'sabado',
    '🌦️ O sábado',
    'Duas falas: o que já fez e o plano. A frase modelo só aparece depois.',
    SABADOS,
    abrirSabado,
    valor => { sabadoSessao = valor; }
  );
}

function abrirSabado(id) {
  abrirCenaLista(id, sabadoPorId, cena => { sabadoSessao = cena; }, pintarSabado, telaSabados);
}

function pintarSabado() {
  pintarCenaLista(sabadoSessao, {
    rota: 'sabado',
    aoLista: telaSabados,
    repintar: pintarSabado,
    avaliar: avaliarSabado,
    registrar: registrarSabado,
    tituloFim: 'Plano contado!'
  });
}

function telaSurpresa() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'surpresa';
  registrarRota('surpresa');
  const info = resumoSurpresa(diaLocalAgora());
  const treino = info.treino;
  app.innerHTML = '';
  const miolo = [
    topoVoltar('🎁 Treino surpresa', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Um treino por dia, neste aparelho. A sequência é só deste modo.'),
    h('p', { class: 'ia-aviso', role: 'status', 'data-foco': '1' }, `${textoDaSurpresa(treino, info)} ${textoDoRecorde(info.recorde)}`)
  ];
  if (treino) {
    miolo.push(h('button', {
      class: 'btn btn-verde',
      type: 'button',
      onclick() {
        armarSurpresa(treino.id);
        abrirTreino(treino.id);
      }
    }, info.feito ? 'REPETIR' : 'COMEÇAR'));
  }
  app.append(h('div', {}, miolo));
  focarTela();
}

function telaBrechas() {
  listarCena(
    'brecha',
    '🔓 A falha',
    'Duas falas: o furo e o conserto. A frase modelo só aparece depois.',
    BRECHAS,
    abrirBrecha,
    valor => { brechaSessao = valor; }
  );
}

function abrirBrecha(id) {
  abrirCenaLista(id, brechaPorId, cena => { brechaSessao = cena; }, pintarBrecha, telaBrechas);
}

function pintarBrecha() {
  pintarCenaLista(brechaSessao, {
    rota: 'brecha',
    aoLista: telaBrechas,
    repintar: pintarBrecha,
    avaliar: avaliarBrecha,
    registrar: registrarBrecha,
    tituloFim: 'Falha explicada!'
  });
}

function telaMudas() {
  listarCena(
    'muda',
    '📐 A mudança',
    'Duas falas: o pedido e a troca. A frase modelo só aparece depois.',
    MUDAS,
    abrirMuda,
    valor => { mudaSessao = valor; }
  );
}

function abrirMuda(id) {
  abrirCenaLista(id, mudaPorId, cena => { mudaSessao = cena; }, pintarMuda, telaMudas);
}

function pintarMuda() {
  pintarCenaLista(mudaSessao, {
    rota: 'muda',
    aoLista: telaMudas,
    repintar: pintarMuda,
    avaliar: avaliarMuda,
    registrar: registrarMuda,
    tituloFim: 'Mudança negociada!'
  });
}

function telaGauchos() {
  listarCena(
    'gaucho',
    '🧉 O chimarrão',
    'Duas falas: o lugar e o hábito. A frase modelo só aparece depois.',
    GAUCHOS,
    abrirGaucho,
    valor => { gauchoSessao = valor; }
  );
}

function abrirGaucho(id) {
  abrirCenaLista(id, gauchoPorId, cena => { gauchoSessao = cena; }, pintarGaucho, telaGauchos);
}

function pintarGaucho() {
  pintarCenaLista(gauchoSessao, {
    rota: 'gaucho',
    aoLista: telaGauchos,
    repintar: pintarGaucho,
    avaliar: avaliarGaucho,
    registrar: registrarGaucho,
    tituloFim: 'Sul contado!'
  });
}

function telaRadares() {
  listarCena(
    'radar',
    '📡 O radar',
    'Duas falas: o sinal e a leitura. A frase modelo só aparece depois.',
    RADARS,
    abrirRadar,
    valor => { radarSessao = valor; }
  );
}

function abrirRadar(id) {
  abrirCenaLista(id, radarPorId, cena => { radarSessao = cena; }, pintarRadar, telaRadares);
}

function pintarRadar() {
  pintarCenaLista(radarSessao, {
    rota: 'radar',
    aoLista: telaRadares,
    repintar: pintarRadar,
    avaliar: avaliarRadar,
    registrar: registrarRadar,
    tituloFim: 'Radar lido!'
  });
}

function telaAplausos() {
  listarCena(
    'aplauso',
    '👏 O aplauso',
    'Duas falas: o elogio e o nome. A frase modelo só aparece depois.',
    APLAUSOS,
    abrirAplauso,
    valor => { aplausoSessao = valor; }
  );
}

function abrirAplauso(id) {
  abrirCenaLista(id, aplausoPorId, cena => { aplausoSessao = cena; }, pintarAplauso, telaAplausos);
}

function pintarAplauso() {
  pintarCenaLista(aplausoSessao, {
    rota: 'aplauso',
    aoLista: telaAplausos,
    repintar: pintarAplauso,
    avaliar: avaliarAplauso,
    registrar: registrarAplauso,
    tituloFim: 'Time agradecido!'
  });
}

function telaGripes() {
  listarCena(
    'gripe',
    '🤒 A gripe',
    'Duas falas: o aviso e o plano. A frase modelo só aparece depois.',
    GRIPES,
    abrirGripe,
    valor => { gripeSessao = valor; }
  );
}

function abrirGripe(id) {
  abrirCenaLista(id, gripePorId, cena => { gripeSessao = cena; }, pintarGripe, telaGripes);
}

function pintarGripe() {
  pintarCenaLista(gripeSessao, {
    rota: 'gripe',
    aoLista: telaGripes,
    repintar: pintarGripe,
    avaliar: avaliarGripe,
    registrar: registrarGripe,
    tituloFim: 'Folga avisada!'
  });
}

function telaPms() {
  listarCena(
    'pm',
    '📎 Com o PM',
    'Duas falas: a data e a troca. A frase modelo só aparece depois.',
    PMS,
    abrirPm,
    valor => { pmSessao = valor; }
  );
}

function abrirPm(id) {
  abrirCenaLista(id, pmPorId, cena => { pmSessao = cena; }, pintarPm, telaPms);
}

function pintarPm() {
  pintarCenaLista(pmSessao, {
    rota: 'pm',
    aoLista: telaPms,
    repintar: pintarPm,
    avaliar: avaliarPm,
    registrar: registrarPm,
    tituloFim: 'Data combinada!'
  });
}

function telaLaudos() {
  listarCena(
    'laudo',
    '📄 O laudo',
    'Duas falas: o fato e a ação. A frase modelo só aparece depois.',
    LAUDOS,
    abrirLaudo,
    valor => { laudoSessao = valor; }
  );
}

function abrirLaudo(id) {
  abrirCenaLista(id, laudoPorId, cena => { laudoSessao = cena; }, pintarLaudo, telaLaudos);
}

function pintarLaudo() {
  pintarCenaLista(laudoSessao, {
    rota: 'laudo',
    aoLista: telaLaudos,
    repintar: pintarLaudo,
    avaliar: avaliarLaudo,
    registrar: registrarLaudo,
    tituloFim: 'Laudo fechado!'
  });
}

function telaRumos() {
  listarCena(
    'rumo',
    '🔭 O rumo',
    'Duas falas: o pedido e o passo. A frase modelo só aparece depois.',
    RUMOS,
    abrirRumo,
    valor => { rumoSessao = valor; }
  );
}

function abrirRumo(id) {
  abrirCenaLista(id, rumoPorId, cena => { rumoSessao = cena; }, pintarRumo, telaRumos);
}

function pintarRumo() {
  pintarCenaLista(rumoSessao, {
    rota: 'rumo',
    aoLista: telaRumos,
    repintar: pintarRumo,
    avaliar: avaliarRumo,
    registrar: registrarRumo,
    tituloFim: 'Rumo pedido!'
  });
}

function telaAcessos() {
  listarCena(
    'acesso',
    '🔑 O acesso',
    'Duas falas: o lugar e a ajuda. A frase modelo só aparece depois.',
    ACESSOS,
    abrirAcesso,
    valor => { acessoSessao = valor; }
  );
}

function abrirAcesso(id) {
  abrirCenaLista(id, acessoPorId, cena => { acessoSessao = cena; }, pintarAcesso, telaAcessos);
}

function pintarAcesso() {
  pintarCenaLista(acessoSessao, {
    rota: 'acesso',
    aoLista: telaAcessos,
    repintar: pintarAcesso,
    avaliar: avaliarAcesso,
    registrar: registrarAcesso,
    tituloFim: 'Acesso combinado!'
  });
}

function telaLicencas() {
  listarCena(
    'licenca',
    '💳 A licença',
    'Duas falas: o pedido e o valor. A frase modelo só aparece depois.',
    LICENCAS,
    abrirLicenca,
    valor => { licencaSessao = valor; }
  );
}

function abrirLicenca(id) {
  abrirCenaLista(id, licencaPorId, cena => { licencaSessao = cena; }, pintarLicenca, telaLicencas);
}

function pintarLicenca() {
  pintarCenaLista(licencaSessao, {
    rota: 'licenca',
    aoLista: telaLicencas,
    repintar: pintarLicenca,
    avaliar: avaliarLicenca,
    registrar: registrarLicenca,
    tituloFim: 'Licença pedida!'
  });
}

function telaJargoes() {
  listarCena(
    'jargao',
    '🧾 Sem jargão',
    'Duas falas: o simples e o efeito. A frase modelo só aparece depois.',
    JARGOES,
    abrirJargao,
    valor => { jargaoSessao = valor; }
  );
}

function abrirJargao(id) {
  abrirCenaLista(id, jargaoPorId, cena => { jargaoSessao = cena; }, pintarJargao, telaJargoes);
}

function pintarJargao() {
  pintarCenaLista(jargaoSessao, {
    rota: 'jargao',
    aoLista: telaJargoes,
    repintar: pintarJargao,
    avaliar: avaliarJargao,
    registrar: registrarJargao,
    tituloFim: 'Nota simples!'
  });
}

function telaBandeiras() {
  listarCena(
    'bandeira',
    '🎚️ A bandeira',
    'Duas falas: o plano e a saída. A frase modelo só aparece depois.',
    BANDEIRAS,
    abrirBandeira,
    valor => { bandeiraSessao = valor; }
  );
}

function abrirBandeira(id) {
  abrirCenaLista(id, bandeiraPorId, cena => { bandeiraSessao = cena; }, pintarBandeira, telaBandeiras);
}

function pintarBandeira() {
  pintarCenaLista(bandeiraSessao, {
    rota: 'bandeira',
    aoLista: telaBandeiras,
    repintar: pintarBandeira,
    avaliar: avaliarBandeira,
    registrar: registrarBandeira,
    tituloFim: 'Bandeira combinada!'
  });
}

function telaGelos() {
  listarCena(
    'gelo',
    '🧊 O gelo',
    'Duas falas: a regra e a exceção. A frase modelo só aparece depois.',
    GELOS,
    abrirGelo,
    valor => { geloSessao = valor; }
  );
}

function abrirGelo(id) {
  abrirCenaLista(id, geloPorId, cena => { geloSessao = cena; }, pintarGelo, telaGelos);
}

function pintarGelo() {
  pintarCenaLista(geloSessao, {
    rota: 'gelo',
    aoLista: telaGelos,
    repintar: pintarGelo,
    avaliar: avaliarGelo,
    registrar: registrarGelo,
    tituloFim: 'Gelo marcado!'
  });
}

function telaLimites() {
  listarCena(
    'limite',
    '🚥 O limite',
    'Duas falas: o número e a resposta. A frase modelo só aparece depois.',
    LIMITES,
    abrirLimite,
    valor => { limiteSessao = valor; }
  );
}

function abrirLimite(id) {
  abrirCenaLista(id, limitePorId, cena => { limiteSessao = cena; }, pintarLimite, telaLimites);
}

function pintarLimite() {
  pintarCenaLista(limiteSessao, {
    rota: 'limite',
    aoLista: telaLimites,
    repintar: pintarLimite,
    avaliar: avaliarLimite,
    registrar: registrarLimite,
    tituloFim: 'Limite dito!'
  });
}

function telaCanarios() {
  listarCena(
    'canario',
    '🐤 O canário',
    'Duas falas: o alvo e a saúde. A frase modelo só aparece depois.',
    CANARIOS,
    abrirCanario,
    valor => { canarioSessao = valor; }
  );
}

function abrirCanario(id) {
  abrirCenaLista(id, canarioPorId, cena => { canarioSessao = cena; }, pintarCanario, telaCanarios);
}

function pintarCanario() {
  pintarCenaLista(canarioSessao, {
    rota: 'canario',
    aoLista: telaCanarios,
    repintar: pintarCanario,
    avaliar: avaliarCanario,
    registrar: registrarCanario,
    tituloFim: 'Canário observado!'
  });
}

function telaDespedidas() {
  listarCena(
    'despedida',
    '📭 A despedida',
    'Duas falas: a data e a troca. A frase modelo só aparece depois.',
    DESPEDIDAS,
    abrirDespedida,
    valor => { despedidaSessao = valor; }
  );
}

function abrirDespedida(id) {
  abrirCenaLista(id, despedidaPorId, cena => { despedidaSessao = cena; }, pintarDespedida, telaDespedidas);
}

function pintarDespedida() {
  pintarCenaLista(despedidaSessao, {
    rota: 'despedida',
    aoLista: telaDespedidas,
    repintar: pintarDespedida,
    avaliar: avaliarDespedida,
    registrar: registrarDespedida,
    tituloFim: 'Despedida dita!'
  });
}

function telaRepeticoes() {
  listarCena(
    'repeticao',
    '🪝 A repetição',
    'Duas falas: a chegada e a segunda vez. A frase modelo só aparece depois.',
    REPETICOES,
    abrirRepeticao,
    valor => { repeticaoSessao = valor; }
  );
}

function abrirRepeticao(id) {
  abrirCenaLista(id, repeticaoPorId, cena => { repeticaoSessao = cena; }, pintarRepeticao, telaRepeticoes);
}

function pintarRepeticao() {
  pintarCenaLista(repeticaoSessao, {
    rota: 'repeticao',
    aoLista: telaRepeticoes,
    repintar: pintarRepeticao,
    avaliar: avaliarRepeticao,
    registrar: registrarRepeticao,
    tituloFim: 'Repetição explicada!'
  });
}

function telaCargas() {
  listarCena(
    'carga',
    '🏋️ A carga',
    'Duas falas: o tempo e o lugar. A frase modelo só aparece depois.',
    CARGAS,
    abrirCarga,
    valor => { cargaSessao = valor; }
  );
}

function abrirCarga(id) {
  abrirCenaLista(id, cargaPorId, cena => { cargaSessao = cena; }, pintarCarga, telaCargas);
}

function pintarCarga() {
  pintarCenaLista(cargaSessao, {
    rota: 'carga',
    aoLista: telaCargas,
    repintar: pintarCarga,
    avaliar: avaliarCarga,
    registrar: registrarCarga,
    tituloFim: 'Carga contada!'
  });
}

function telaBoletins() {
  listarCena(
    'boletim',
    '📰 O boletim',
    'Duas falas: a lista e a leitura. A frase modelo só aparece depois.',
    BOLETINS,
    abrirBoletim,
    valor => { boletimSessao = valor; }
  );
}

function abrirBoletim(id) {
  abrirCenaLista(id, boletimPorId, cena => { boletimSessao = cena; }, pintarBoletim, telaBoletins);
}

function pintarBoletim() {
  pintarCenaLista(boletimSessao, {
    rota: 'boletim',
    aoLista: telaBoletins,
    repintar: pintarBoletim,
    avaliar: avaliarBoletim,
    registrar: registrarBoletim,
    tituloFim: 'Boletim lido!'
  });
}

function telaDonos() {
  listarCena(
    'dono',
    '🪪 Quem aprova',
    'Duas falas: a pasta e o merge. A frase modelo só aparece depois.',
    DONOS,
    abrirDono,
    valor => { donoSessao = valor; }
  );
}

function abrirDono(id) {
  abrirCenaLista(id, donoPorId, cena => { donoSessao = cena; }, pintarDono, telaDonos);
}

function pintarDono() {
  pintarCenaLista(donoSessao, {
    rota: 'dono',
    aoLista: telaDonos,
    repintar: pintarDono,
    avaliar: avaliarDono,
    registrar: registrarDono,
    tituloFim: 'Dono combinado!'
  });
}

function telaManuais() {
  listarCena(
    'manual',
    '📘 O manual',
    'Duas falas: o passo e a checagem. A frase modelo só aparece depois.',
    MANUAIS,
    abrirManual,
    valor => { manualSessao = valor; }
  );
}

function abrirManual(id) {
  abrirCenaLista(id, manualPorId, cena => { manualSessao = cena; }, pintarManual, telaManuais);
}

function pintarManual() {
  pintarCenaLista(manualSessao, {
    rota: 'manual',
    aoLista: telaManuais,
    repintar: pintarManual,
    avaliar: avaliarManual,
    registrar: registrarManual,
    tituloFim: 'Manual seguido!'
  });
}

function telaVerdes() {
  listarCena(
    'verde',
    '🟢 O lado verde',
    'Duas falas: o tráfego e a volta. A frase modelo só aparece depois.',
    VERDES,
    abrirVerde,
    valor => { verdeSessao = valor; }
  );
}

function abrirVerde(id) {
  abrirCenaLista(id, verdePorId, cena => { verdeSessao = cena; }, pintarVerde, telaVerdes);
}

function pintarVerde() {
  pintarCenaLista(verdeSessao, {
    rota: 'verde',
    aoLista: telaVerdes,
    repintar: pintarVerde,
    avaliar: avaliarVerde,
    registrar: registrarVerde,
    tituloFim: 'Lado trocado!'
  });
}

function telaCertificados() {
  listarCena(
    'certificado',
    '🔏 O certificado',
    'Duas falas: o prazo e o aviso. A frase modelo só aparece depois.',
    CERTIFICADOS,
    abrirCertificado,
    valor => { certificadoSessao = valor; }
  );
}

function abrirCertificado(id) {
  abrirCenaLista(id, certificadoPorId, cena => { certificadoSessao = cena; }, pintarCertificado, telaCertificados);
}

function pintarCertificado() {
  pintarCenaLista(certificadoSessao, {
    rota: 'certificado',
    aoLista: telaCertificados,
    repintar: pintarCertificado,
    avaliar: avaliarCertificado,
    registrar: registrarCertificado,
    tituloFim: 'Certificado combinado!'
  });
}

function telaRebases() {
  listarCena(
    'rebase',
    '🌿 O rebase',
    'Duas falas: a base e o arquivo. A frase modelo só aparece depois.',
    REBASES,
    abrirRebase,
    valor => { rebaseSessao = valor; }
  );
}

function abrirRebase(id) {
  abrirCenaLista(id, rebasePorId, cena => { rebaseSessao = cena; }, pintarRebase, telaRebases);
}

function pintarRebase() {
  pintarCenaLista(rebaseSessao, {
    rota: 'rebase',
    aoLista: telaRebases,
    repintar: pintarRebase,
    avaliar: avaliarRebase,
    registrar: registrarRebase,
    tituloFim: 'Rebase combinado!'
  });
}

function telaConsultas() {
  listarCena(
    'consulta',
    '🐌 A consulta',
    'Duas falas: o tempo e o plano. A frase modelo só aparece depois.',
    CONSULTAS,
    abrirConsulta,
    valor => { consultaSessao = valor; }
  );
}

function abrirConsulta(id) {
  abrirCenaLista(id, consultaPorId, cena => { consultaSessao = cena; }, pintarConsulta, telaConsultas);
}

function pintarConsulta() {
  pintarCenaLista(consultaSessao, {
    rota: 'consulta',
    aoLista: telaConsultas,
    repintar: pintarConsulta,
    avaliar: avaliarConsulta,
    registrar: registrarConsulta,
    tituloFim: 'Consulta lida!'
  });
}

function telaReplicas() {
  listarCena(
    'replica',
    '🪞 A réplica',
    'Duas falas: o atraso e a leitura. A frase modelo só aparece depois.',
    REPLICAS,
    abrirReplica,
    valor => { replicaSessao = valor; }
  );
}

function abrirReplica(id) {
  abrirCenaLista(id, replicaPorId, cena => { replicaSessao = cena; }, pintarReplica, telaReplicas);
}

function pintarReplica() {
  pintarCenaLista(replicaSessao, {
    rota: 'replica',
    aoLista: telaReplicas,
    repintar: pintarReplica,
    avaliar: avaliarReplica,
    registrar: registrarReplica,
    tituloFim: 'Réplica explicada!'
  });
}

function telaEnsaios() {
  listarCena(
    'ensaio',
    '🧪 O ensaio',
    'Duas falas: o ensaio e a cópia. A frase modelo só aparece depois.',
    ENSAIOS,
    abrirEnsaio,
    valor => { ensaioSessao = valor; }
  );
}

function abrirEnsaio(id) {
  abrirCenaLista(id, ensaioPorId, cena => { ensaioSessao = cena; }, pintarEnsaio, telaEnsaios);
}

function pintarEnsaio() {
  pintarCenaLista(ensaioSessao, {
    rota: 'ensaio',
    aoLista: telaEnsaios,
    repintar: pintarEnsaio,
    avaliar: avaliarEnsaio,
    registrar: registrarEnsaio,
    tituloFim: 'Ensaio combinado!'
  });
}

function telaDiscos() {
  listarCena(
    'disco',
    '💽 O disco',
    'Duas falas: o disco cheio e o plano. A frase modelo só aparece depois.',
    DISCOS,
    abrirDisco,
    valor => { discoSessao = valor; }
  );
}

function abrirDisco(id) {
  abrirCenaLista(id, discoPorId, cena => { discoSessao = cena; }, pintarDisco, telaDiscos);
}

function pintarDisco() {
  pintarCenaLista(discoSessao, {
    rota: 'disco',
    aoLista: telaDiscos,
    repintar: pintarDisco,
    avaliar: avaliarDisco,
    registrar: registrarDisco,
    tituloFim: 'Disco explicado!'
  });
}

function telaPaginas() {
  listarCena(
    'pagina',
    '📃 A página',
    'Duas falas: a lista e a próxima página. A frase modelo só aparece depois.',
    PAGINAS,
    abrirPagina,
    valor => { paginaSessao = valor; }
  );
}

function abrirPagina(id) {
  abrirCenaLista(id, paginaPorId, cena => { paginaSessao = cena; }, pintarPagina, telaPaginas);
}

function pintarPagina() {
  pintarCenaLista(paginaSessao, {
    rota: 'pagina',
    aoLista: telaPaginas,
    repintar: pintarPagina,
    avaliar: avaliarPagina,
    registrar: registrarPagina,
    tituloFim: 'Página explicada!'
  });
}

function telaSquashes() {
  listarCena(
    'squash',
    '✂️ O squash',
    'Duas falas: os commits e o merge. A frase modelo só aparece depois.',
    SQUASHES,
    abrirSquash,
    valor => { squashSessao = valor; }
  );
}

function abrirSquash(id) {
  abrirCenaLista(id, squashPorId, cena => { squashSessao = cena; }, pintarSquash, telaSquashes);
}

function pintarSquash() {
  pintarCenaLista(squashSessao, {
    rota: 'squash',
    aoLista: telaSquashes,
    repintar: pintarSquash,
    avaliar: avaliarSquash,
    registrar: registrarSquash,
    tituloFim: 'Squash combinado!'
  });
}

function telaCircuitos() {
  listarCena(
    'circuito',
    '🛑 O circuito',
    'Duas falas: quando abre e quando fecha. A frase modelo só aparece depois.',
    CIRCUITOS,
    abrirCircuito,
    valor => { circuitoSessao = valor; }
  );
}

function abrirCircuito(id) {
  abrirCenaLista(id, circuitoPorId, cena => { circuitoSessao = cena; }, pintarCircuito, telaCircuitos);
}

function pintarCircuito() {
  pintarCenaLista(circuitoSessao, {
    rota: 'circuito',
    aoLista: telaCircuitos,
    repintar: pintarCircuito,
    avaliar: avaliarCircuito,
    registrar: registrarCircuito,
    tituloFim: 'Circuito explicado!'
  });
}

function telaJobs() {
  listarCena(
    'job',
    '🌙 O job',
    'Duas falas: o horário e a falha. A frase modelo só aparece depois.',
    JOBS,
    abrirJob,
    valor => { jobSessao = valor; }
  );
}

function abrirJob(id) {
  abrirCenaLista(id, jobPorId, cena => { jobSessao = cena; }, pintarJob, telaJobs);
}

function pintarJob() {
  pintarCenaLista(jobSessao, {
    rota: 'job',
    aoLista: telaJobs,
    repintar: pintarJob,
    avaliar: avaliarJob,
    registrar: registrarJob,
    tituloFim: 'Job explicado!'
  });
}

function telaColheitas() {
  listarCena(
    'colheita',
    '🍒 A colheita',
    'Duas falas: o commit e o que fica. A frase modelo só aparece depois.',
    COLHEITAS,
    abrirColheita,
    valor => { colheitaSessao = valor; }
  );
}

function abrirColheita(id) {
  abrirCenaLista(id, colheitaPorId, cena => { colheitaSessao = cena; }, pintarColheita, telaColheitas);
}

function pintarColheita() {
  pintarCenaLista(colheitaSessao, {
    rota: 'colheita',
    aoLista: telaColheitas,
    repintar: pintarColheita,
    avaliar: avaliarColheita,
    registrar: registrarColheita,
    tituloFim: 'Colheita feita!'
  });
}

function telaSessoes() {
  listarCena(
    'sessao',
    '⏳ A sessão',
    'Duas falas: o fim e o prazo. A frase modelo só aparece depois.',
    SESSOES,
    abrirSessao,
    valor => { sessaoFala = valor; }
  );
}

function abrirSessao(id) {
  abrirCenaLista(id, sessaoPorId, cena => { sessaoFala = cena; }, pintarSessao, telaSessoes);
}

function pintarSessao() {
  pintarCenaLista(sessaoFala, {
    rota: 'sessao',
    aoLista: telaSessoes,
    repintar: pintarSessao,
    avaliar: avaliarSessao,
    registrar: registrarSessao,
    tituloFim: 'Sessão explicada!'
  });
}

function telaTanques() {
  listarCena(
    'tanque',
    '🪣 O tanque',
    'Duas falas: o tanque cheio e as conexões ociosas. A frase modelo só aparece depois.',
    TANQUES,
    abrirTanque,
    valor => { tanqueSessao = valor; }
  );
}

function abrirTanque(id) {
  abrirCenaLista(id, tanquePorId, cena => { tanqueSessao = cena; }, pintarTanque, telaTanques);
}

function pintarTanque() {
  pintarCenaLista(tanqueSessao, {
    rota: 'tanque',
    aoLista: telaTanques,
    repintar: pintarTanque,
    avaliar: avaliarTanque,
    registrar: registrarTanque,
    tituloFim: 'Tanque explicado!'
  });
}

function telaSondas() {
  listarCena(
    'sonda',
    '🩺 A sonda',
    'Duas falas: a falha e a volta. A frase modelo só aparece depois.',
    SONDAS,
    abrirSonda,
    valor => { sondaSessao = valor; }
  );
}

function abrirSonda(id) {
  abrirCenaLista(id, sondaPorId, cena => { sondaSessao = cena; }, pintarSonda, telaSondas);
}

function pintarSonda() {
  pintarCenaLista(sondaSessao, {
    rota: 'sonda',
    aoLista: telaSondas,
    repintar: pintarSonda,
    avaliar: avaliarSonda,
    registrar: registrarSonda,
    tituloFim: 'Sonda explicada!'
  });
}

function telaSementes() {
  listarCena(
    'semente',
    '🌱 A semente',
    'Duas falas: o banco e as linhas. A frase modelo só aparece depois.',
    SEMENTES,
    abrirSemente,
    valor => { sementeSessao = valor; }
  );
}

function abrirSemente(id) {
  abrirCenaLista(id, sementePorId, cena => { sementeSessao = cena; }, pintarSemente, telaSementes);
}

function pintarSemente() {
  pintarCenaLista(sementeSessao, {
    rota: 'semente',
    aoLista: telaSementes,
    repintar: pintarSemente,
    avaliar: avaliarSemente,
    registrar: registrarSemente,
    tituloFim: 'Semente plantada!'
  });
}

function telaRegistros() {
  listarCena(
    'registro',
    '📋 O registro',
    'Duas falas: o nível e a volta. A frase modelo só aparece depois.',
    REGISTROS,
    abrirRegistro,
    valor => { registroSessao = valor; }
  );
}

function abrirRegistro(id) {
  abrirCenaLista(id, registroPorId, cena => { registroSessao = cena; }, pintarRegistro, telaRegistros);
}

function pintarRegistro() {
  pintarCenaLista(registroSessao, {
    rota: 'registro',
    aoLista: telaRegistros,
    repintar: pintarRegistro,
    avaliar: avaliarRegistro,
    registrar: registrarRegistro,
    tituloFim: 'Registro ajustado!'
  });
}

function telaRastros() {
  listarCena(
    'rastro',
    '🔎 O rastro',
    'Duas falas: o pedido e a cópia. A frase modelo só aparece depois.',
    RASTROS,
    abrirRastro,
    valor => { rastroSessao = valor; }
  );
}

function abrirRastro(id) {
  abrirCenaLista(id, rastroPorId, cena => { rastroSessao = cena; }, pintarRastro, telaRastros);
}

function pintarRastro() {
  pintarCenaLista(rastroSessao, {
    rota: 'rastro',
    aoLista: telaRastros,
    repintar: pintarRastro,
    avaliar: avaliarRastro,
    registrar: registrarRastro,
    tituloFim: 'Rastro copiado!'
  });
}

function telaParadas() {
  listarCena(
    'parada',
    '🕛 A parada',
    'Duas falas: o início e o fim. A frase modelo só aparece depois.',
    PARADAS,
    abrirParada,
    valor => { paradaSessao = valor; }
  );
}

function abrirParada(id) {
  abrirCenaLista(id, paradaPorId, cena => { paradaSessao = cena; }, pintarParada, telaParadas);
}

function pintarParada() {
  pintarCenaLista(paradaSessao, {
    rota: 'parada',
    aoLista: telaParadas,
    repintar: pintarParada,
    avaliar: avaliarParada,
    registrar: registrarParada,
    tituloFim: 'Parada marcada!'
  });
}

function telaPods() {
  listarCena(
    'pod',
    '🫛 O pod',
    'Duas falas: a queda e o ar. A frase modelo só aparece depois.',
    PODS,
    abrirPod,
    valor => { podSessao = valor; }
  );
}

function abrirPod(id) {
  abrirCenaLista(id, podPorId, cena => { podSessao = cena; }, pintarPod, telaPods);
}

function pintarPod() {
  pintarCenaLista(podSessao, {
    rota: 'pod',
    aoLista: telaPods,
    repintar: pintarPod,
    avaliar: avaliarPod,
    registrar: registrarPod,
    tituloFim: 'Pod no ar!'
  });
}

function telaLints() {
  listarCena(
    'lint',
    '🧹 O lint',
    'Duas falas: a falha e a volta. A frase modelo só aparece depois.',
    LINTS,
    abrirLint,
    valor => { lintSessao = valor; }
  );
}

function abrirLint(id) {
  abrirCenaLista(id, lintPorId, cena => { lintSessao = cena; }, pintarLint, telaLints);
}

function pintarLint() {
  pintarCenaLista(lintSessao, {
    rota: 'lint',
    aoLista: telaLints,
    repintar: pintarLint,
    avaliar: avaliarLint,
    registrar: registrarLint,
    tituloFim: 'Lint limpo!'
  });
}

function telaOrigens() {
  listarCena(
    'origem',
    '🌐 A origem',
    'Duas falas: o bloqueio e a liberação. A frase modelo só aparece depois.',
    ORIGENS,
    abrirOrigem,
    valor => { origemSessao = valor; }
  );
}

function abrirOrigem(id) {
  abrirCenaLista(id, origemPorId, cena => { origemSessao = cena; }, pintarOrigem, telaOrigens);
}

function pintarOrigem() {
  pintarCenaLista(origemSessao, {
    rota: 'origem',
    aoLista: telaOrigens,
    repintar: pintarOrigem,
    avaliar: avaliarOrigem,
    registrar: registrarOrigem,
    tituloFim: 'Origem liberada!'
  });
}

function telaLinks() {
  listarCena(
    'link',
    '🔗 O link',
    'Duas falas: o prazo e a troca. A frase modelo só aparece depois.',
    LINKS,
    abrirLink,
    valor => { linkSessao = valor; }
  );
}

function abrirLink(id) {
  abrirCenaLista(id, linkPorId, cena => { linkSessao = cena; }, pintarLink, telaLinks);
}

function pintarLink() {
  pintarCenaLista(linkSessao, {
    rota: 'link',
    aoLista: telaLinks,
    repintar: pintarLink,
    avaliar: avaliarLink,
    registrar: registrarLink,
    tituloFim: 'Link enviado!'
  });
}

function telaCpus() {
  listarCena(
    'cpu',
    '🧮 O processador',
    'Duas falas: o pico e a calma. A frase modelo só aparece depois.',
    CPUS,
    abrirCpu,
    valor => { cpuSessao = valor; }
  );
}

function abrirCpu(id) {
  abrirCenaLista(id, cpuPorId, cena => { cpuSessao = cena; }, pintarCpu, telaCpus);
}

function pintarCpu() {
  pintarCenaLista(cpuSessao, {
    rota: 'cpu',
    aoLista: telaCpus,
    repintar: pintarCpu,
    avaliar: avaliarCpu,
    registrar: registrarCpu,
    tituloFim: 'Processador calmo!'
  });
}

function telaCopias() {
  listarCena(
    'copia',
    '💾 A cópia',
    'Duas falas: a noite e a manhã. A frase modelo só aparece depois.',
    COPIAS,
    abrirCopia,
    valor => { copiaSessao = valor; }
  );
}

function abrirCopia(id) {
  abrirCenaLista(id, copiaPorId, cena => { copiaSessao = cena; }, pintarCopia, telaCopias);
}

function pintarCopia() {
  pintarCenaLista(copiaSessao, {
    rota: 'copia',
    aoLista: telaCopias,
    repintar: pintarCopia,
    avaliar: avaliarCopia,
    registrar: registrarCopia,
    tituloFim: 'Cópia pronta!'
  });
}

function telaEstouros() {
  listarCena(
    'estouro',
    '💥 O estouro',
    'Duas falas: o estouro e o teto. A frase modelo só aparece depois.',
    ESTOUROS,
    abrirEstouro,
    valor => { estouroSessao = valor; }
  );
}

function abrirEstouro(id) {
  abrirCenaLista(id, estouroPorId, cena => { estouroSessao = cena; }, pintarEstouro, telaEstouros);
}

function pintarEstouro() {
  pintarCenaLista(estouroSessao, {
    rota: 'estouro',
    aoLista: telaEstouros,
    repintar: pintarEstouro,
    avaliar: avaliarEstouro,
    registrar: registrarEstouro,
    tituloFim: 'Memória livre!'
  });
}

function telaImpasses() {
  listarCena(
    'impasse',
    '🪢 O impasse',
    'Duas falas: a espera e a soltura. A frase modelo só aparece depois.',
    IMPASSES,
    abrirImpasse,
    valor => { impasseSessao = valor; }
  );
}

function abrirImpasse(id) {
  abrirCenaLista(id, impassePorId, cena => { impasseSessao = cena; }, pintarImpasse, telaImpasses);
}

function pintarImpasse() {
  pintarCenaLista(impasseSessao, {
    rota: 'impasse',
    aoLista: telaImpasses,
    repintar: pintarImpasse,
    avaliar: avaliarImpasse,
    registrar: registrarImpasse,
    tituloFim: 'Impasse solto!'
  });
}

function telaDominios() {
  listarCena(
    'dominio',
    '🏷️ O domínio',
    'Duas falas: a falha e o endereço. A frase modelo só aparece depois.',
    DOMINIOS,
    abrirDominio,
    valor => { dominioSessao = valor; }
  );
}

function abrirDominio(id) {
  abrirCenaLista(id, dominioPorId, cena => { dominioSessao = cena; }, pintarDominio, telaDominios);
}

function pintarDominio() {
  pintarCenaLista(dominioSessao, {
    rota: 'dominio',
    aoLista: telaDominios,
    repintar: pintarDominio,
    avaliar: avaliarDominio,
    registrar: registrarDominio,
    tituloFim: 'Nome no ar!'
  });
}

function telaMortas() {
  listarCena(
    'morta',
    '📮 A carta morta',
    'Duas falas: o desvio e o motivo. A frase modelo só aparece depois.',
    MORTAS,
    abrirMorta,
    valor => { mortaSessao = valor; }
  );
}

function abrirMorta(id) {
  abrirCenaLista(id, mortaPorId, cena => { mortaSessao = cena; }, pintarMorta, telaMortas);
}

function pintarMorta() {
  pintarCenaLista(mortaSessao, {
    rota: 'morta',
    aoLista: telaMortas,
    repintar: pintarMorta,
    avaliar: avaliarMorta,
    registrar: registrarMorta,
    tituloFim: 'Motivo lido!'
  });
}

function telaPonteiros() {
  listarCena(
    'ponteiro',
    '🕰️ Os ponteiros',
    'Duas falas: a diferença e o alinhamento. A frase modelo só aparece depois.',
    PONTEIROS,
    abrirPonteiro,
    valor => { ponteiroSessao = valor; }
  );
}

function abrirPonteiro(id) {
  abrirCenaLista(id, ponteiroPorId, cena => { ponteiroSessao = cena; }, pintarPonteiro, telaPonteiros);
}

function pintarPonteiro() {
  pintarCenaLista(ponteiroSessao, {
    rota: 'ponteiro',
    aoLista: telaPonteiros,
    repintar: pintarPonteiro,
    avaliar: avaliarPonteiro,
    registrar: registrarPonteiro,
    tituloFim: 'Relógios alinhados!'
  });
}

function telaEleicoes() {
  listarCena(
    'eleicao',
    '🗳️ A eleição',
    'Duas falas: o voto e o líder. A frase modelo só aparece depois.',
    ELEICOES,
    abrirEleicao,
    valor => { eleicaoSessao = valor; }
  );
}

function abrirEleicao(id) {
  abrirCenaLista(id, eleicaoPorId, cena => { eleicaoSessao = cena; }, pintarEleicao, telaEleicoes);
}

function pintarEleicao() {
  pintarCenaLista(eleicaoSessao, {
    rota: 'eleicao',
    aoLista: telaEleicoes,
    repintar: pintarEleicao,
    avaliar: avaliarEleicao,
    registrar: registrarEleicao,
    tituloFim: 'Líder eleito!'
  });
}

function telaFreios() {
  listarCena(
    'freio',
    '🛞 O freio',
    'Duas falas: a fila e o ritmo. A frase modelo só aparece depois.',
    FREIOS,
    abrirFreio,
    valor => { freioSessao = valor; }
  );
}

function abrirFreio(id) {
  abrirCenaLista(id, freioPorId, cena => { freioSessao = cena; }, pintarFreio, telaFreios);
}

function pintarFreio() {
  pintarCenaLista(freioSessao, {
    rota: 'freio',
    aoLista: telaFreios,
    repintar: pintarFreio,
    avaliar: avaliarFreio,
    registrar: registrarFreio,
    tituloFim: 'Ritmo menor!'
  });
}

function telaPausas() {
  listarCena(
    'pausa',
    '⌛ A pausa',
    'Duas falas: a parada e a continuação. A frase modelo só aparece depois.',
    PAUSAS,
    abrirPausa,
    valor => { pausaSessao = valor; }
  );
}

function abrirPausa(id) {
  abrirCenaLista(id, pausaPorId, cena => { pausaSessao = cena; }, pintarPausa, telaPausas);
}

function pintarPausa() {
  pintarCenaLista(pausaSessao, {
    rota: 'pausa',
    aoLista: telaPausas,
    repintar: pintarPausa,
    avaliar: avaliarPausa,
    registrar: registrarPausa,
    tituloFim: 'Pausa vista!'
  });
}

function telaDerivas() {
  listarCena(
    'deriva',
    '📄 A deriva',
    'Duas falas: a diferença e o arquivo. A frase modelo só aparece depois.',
    DERIVAS,
    abrirDeriva,
    valor => { derivaSessao = valor; }
  );
}

function abrirDeriva(id) {
  abrirCenaLista(id, derivaPorId, cena => { derivaSessao = cena; }, pintarDeriva, telaDerivas);
}

function pintarDeriva() {
  pintarCenaLista(derivaSessao, {
    rota: 'deriva',
    aoLista: telaDerivas,
    repintar: pintarDeriva,
    avaliar: avaliarDeriva,
    registrar: registrarDeriva,
    tituloFim: 'Configuração igual!'
  });
}

function telaDescritores() {
  listarCena(
    'descritor',
    '📁 O descritor',
    'Duas falas: a abertura e o fechamento. A frase modelo só aparece depois.',
    DESCRITORES,
    abrirDescritor,
    valor => { descritorSessao = valor; }
  );
}

function abrirDescritor(id) {
  abrirCenaLista(id, descritorPorId, cena => { descritorSessao = cena; }, pintarDescritor, telaDescritores);
}

function pintarDescritor() {
  pintarCenaLista(descritorSessao, {
    rota: 'descritor',
    aoLista: telaDescritores,
    repintar: pintarDescritor,
    avaliar: avaliarDescritor,
    registrar: registrarDescritor,
    tituloFim: 'Arquivo livre!'
  });
}

function telaReservas() {
  listarCena(
    'reserva',
    '🪫 A reserva',
    'Duas falas: o uso e a folga. A frase modelo só aparece depois.',
    RESERVAS,
    abrirReserva,
    valor => { reservaSessao = valor; }
  );
}

function abrirReserva(id) {
  abrirCenaLista(id, reservaPorId, cena => { reservaSessao = cena; }, pintarReserva, telaReservas);
}

function pintarReserva() {
  pintarCenaLista(reservaSessao, {
    rota: 'reserva',
    aoLista: telaReservas,
    repintar: pintarReserva,
    avaliar: avaliarReserva,
    registrar: registrarReserva,
    tituloFim: 'Reserva livre!'
  });
}

function telaVarreduras() {
  listarCena(
    'varredura',
    '🧵 A varredura',
    'Duas falas: a contagem e a junção. A frase modelo só aparece depois.',
    VARREDURAS,
    abrirVarredura,
    valor => { varreduraSessao = valor; }
  );
}

function abrirVarredura(id) {
  abrirCenaLista(id, varreduraPorId, cena => { varreduraSessao = cena; }, pintarVarredura, telaVarreduras);
}

function pintarVarredura() {
  pintarCenaLista(varreduraSessao, {
    rota: 'varredura',
    aoLista: telaVarreduras,
    repintar: pintarVarredura,
    avaliar: avaliarVarredura,
    registrar: registrarVarredura,
    tituloFim: 'Consulta junta!'
  });
}

function telaPortas() {
  listarCena(
    'porta',
    '🚪 A porta',
    'Duas falas: a batida e a escuta. A frase modelo só aparece depois.',
    PORTAS,
    abrirPorta,
    valor => { portaSessao = valor; }
  );
}

function abrirPorta(id) {
  abrirCenaLista(id, portaPorId, cena => { portaSessao = cena; }, pintarPorta, telaPortas);
}

function pintarPorta() {
  pintarCenaLista(portaSessao, {
    rota: 'porta',
    aoLista: telaPortas,
    repintar: pintarPorta,
    avaliar: avaliarPorta,
    registrar: registrarPorta,
    tituloFim: 'Porta aberta!'
  });
}

function telaInodos() {
  listarCena(
    'inodo',
    '📛 O inodo',
    'Duas falas: acaba e volta. A frase modelo só aparece depois.',
    INODOS,
    abrirInodo,
    valor => { inodoSessao = valor; }
  );
}

function abrirInodo(id) {
  abrirCenaLista(id, inodoPorId, cena => { inodoSessao = cena; }, pintarInodo, telaInodos);
}

function pintarInodo() {
  pintarCenaLista(inodoSessao, {
    rota: 'inodo',
    aoLista: telaInodos,
    repintar: pintarInodo,
    avaliar: avaliarInodo,
    registrar: registrarInodo,
    tituloFim: 'Nome livre!'
  });
}

function telaSaidas() {
  listarCena(
    'saida',
    '🛎️ A saída',
    'Duas falas: recebe e espera. A frase modelo só aparece depois.',
    SAIDAS,
    abrirSaida,
    valor => { saidaSessao = valor; }
  );
}

function abrirSaida(id) {
  abrirCenaLista(id, saidaPorId, cena => { saidaSessao = cena; }, pintarSaida, telaSaidas);
}

function pintarSaida() {
  pintarCenaLista(saidaSessao, {
    rota: 'saida',
    aoLista: telaSaidas,
    repintar: pintarSaida,
    avaliar: avaliarSaida,
    registrar: registrarSaida,
    tituloFim: 'Serviço quieto!'
  });
}

function telaManadas() {
  listarCena(
    'manada',
    '🐑 A manada',
    'Duas falas: cai e segura. A frase modelo só aparece depois.',
    MANADAS,
    abrirManada,
    valor => { manadaSessao = valor; }
  );
}

function abrirManada(id) {
  abrirCenaLista(id, manadaPorId, cena => { manadaSessao = cena; }, pintarManada, telaManadas);
}

function pintarManada() {
  pintarCenaLista(manadaSessao, {
    rota: 'manada',
    aoLista: telaManadas,
    repintar: pintarManada,
    avaliar: avaliarManada,
    registrar: registrarManada,
    tituloFim: 'Cache calmo!'
  });
}

function telaGotejos() {
  listarCena(
    'gotejo',
    '💧 O gotejo',
    'Duas falas: sobe e devolve. A frase modelo só aparece depois.',
    GOTEJOS,
    abrirGotejo,
    valor => { gotejoSessao = valor; }
  );
}

function abrirGotejo(id) {
  abrirCenaLista(id, gotejoPorId, cena => { gotejoSessao = cena; }, pintarGotejo, telaGotejos);
}

function pintarGotejo() {
  pintarCenaLista(gotejoSessao, {
    rota: 'gotejo',
    aoLista: telaGotejos,
    repintar: pintarGotejo,
    avaliar: avaliarGotejo,
    registrar: registrarGotejo,
    tituloFim: 'Memória quieta!'
  });
}

function telaFrios() {
  listarCena(
    'frio',
    '🥶 O frio',
    'Duas falas: dorme e acorda. A frase modelo só aparece depois.',
    FRIOS,
    abrirFrio,
    valor => { frioSessao = valor; }
  );
}

function abrirFrio(id) {
  abrirCenaLista(id, frioPorId, cena => { frioSessao = cena; }, pintarFrio, telaFrios);
}

function pintarFrio() {
  pintarCenaLista(frioSessao, {
    rota: 'frio',
    aoLista: telaFrios,
    repintar: pintarFrio,
    avaliar: avaliarFrio,
    registrar: registrarFrio,
    tituloFim: 'Função quente!'
  });
}

function telaCadeados() {
  listarCena(
    'cadeado',
    '🔐 O cadeado',
    'Duas falas: tenta e libera. A frase modelo só aparece depois.',
    CADEADOS,
    abrirCadeado,
    valor => { cadeadoSessao = valor; }
  );
}

function abrirCadeado(id) {
  abrirCenaLista(id, cadeadoPorId, cena => { cadeadoSessao = cena; }, pintarCadeado, telaCadeados);
}

function pintarCadeado() {
  pintarCenaLista(cadeadoSessao, {
    rota: 'cadeado',
    aoLista: telaCadeados,
    repintar: pintarCadeado,
    avaliar: avaliarCadeado,
    registrar: registrarCadeado,
    tituloFim: 'Leitura livre!'
  });
}

function telaAbertas() {
  abertaSessao = null;
  pintarAberta();
}

function abrirAberta() {
  const perguntas = montarAbertas(diaLocalAgora());
  descartarVoz();
  abertaSessao = {
    perguntas,
    i: 0,
    acertos: 0,
    notas: [],
    feedback: null,
    inicio: Date.now(),
    muletas: 0,
    concluido: false
  };
  pintarAberta();
}

function concluirAberta() {
  if (!abertaSessao || abertaSessao.concluido) return;
  const nota = fecharNota(abertaSessao.notas);
  const xp = 10 + abertaSessao.acertos * 8;
  const evento = registrarAberta({
    xp,
    acertos: abertaSessao.acertos,
    respostas: abertaSessao.perguntas.length,
    nota,
    errosFala: [],
    perfeita: false,
    comboMax: 0,
    muletas: abertaSessao.muletas
  });
  abertaSessao.concluido = true;
  pintarFim({
    titulo: 'Perguntas respondidas!',
    sub: textoDasAbertas(abertaSessao.perguntas),
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaAbertas,
    painel: true,
    resumo: true
  });
}

function pulsarAberta() {
  if (!abertaSessao || abertaSessao.feedback || abertaSessao.concluido) return;
  const el = document.querySelector('[data-cronometro-aberta]');
  if (el) el.textContent = relogioLivre(Math.max(0, Math.round((Date.now() - abertaSessao.inicio) / 1000)));
  timerDeTela(pulsarAberta, 1000);
}

function pintarAberta() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'abertas';
  registrarRota('abertas');
  const perguntas = abertaSessao?.perguntas || montarAbertas(diaLocalAgora());
  if (!abertaSessao || abertaSessao.concluido) {
    app.innerHTML = '';
    app.append(
      topoVoltar('💭 Perguntas abertas', () => voltarTela(telaConversa)),
      h('p', { class: 'ia-aviso' }, 'Cinco perguntas de entrevista, neste aparelho. Não há frase modelo. Um, like e basically ficam marcados.'),
      h('p', { class: 'ia-aviso', role: 'status', 'data-foco': '1' }, textoDasAbertas(perguntas)),
      ...perguntas.map((p, i) => h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, `${i + 1}. ${p.pt}`),
        h('p', { class: 'fala-en', lang: 'en' }, p.en)
      )),
      h('button', { class: 'btn btn-verde', type: 'button', onclick: abrirAberta }, 'COMEÇAR')
    );
    focarTela();
    return;
  }
  const pergunta = perguntas[abertaSessao.i];
  app.innerHTML = '';
  const miolo = [
    topoVoltar('💭 Perguntas abertas', () => telaAbertas()),
    h('div', { class: 'revisao-sub', role: 'status', 'aria-live': 'polite' }, `Pergunta ${abertaSessao.i + 1} de ${perguntas.length}`),
    h('p', { class: 'sombra-frase', lang: 'en' }, pergunta.en),
    h('p', { class: 'ia-aviso' }, pergunta.pt),
    h('div', {
      class: 'nota-grande',
      'data-cronometro-aberta': '1',
      role: 'timer',
      'aria-label': 'Tempo desta resposta'
    }, relogioLivre(Math.max(0, Math.round((Date.now() - abertaSessao.inicio) / 1000))))
  ];
  if (abertaSessao.feedback) {
    const aval = abertaSessao.feedback;
    miolo.push(h('p', { class: 'ia-aviso', role: 'status', 'data-foco': '1' }, `${textoDaAberta(aval)} ${textoDoPreenchimento(aval)} ${textoDosConectores(aval)}`));
    if (aval.partes?.length) {
      miolo.push(h('p', { class: 'fala-en', lang: 'en' }, aval.partes.map((p, i) => [
        p.preenchimento ? h('span', { class: 'preenchimento' }, p.t) : p.t,
        i + 1 < aval.partes.length ? ' ' : ''
      ])));
    }
    miolo.push(h('button', {
      class: 'btn btn-verde',
      type: 'button',
      onclick() {
        if (abertaSessao.i + 1 >= perguntas.length) concluirAberta();
        else {
          descartarVoz();
          abertaSessao.i++;
          abertaSessao.feedback = null;
          abertaSessao.inicio = Date.now();
          pintarAberta();
        }
      }
    }, abertaSessao.i + 1 >= perguntas.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    const entrada = h('textarea', {
      class: 'entrada',
      lang: 'en',
      autocomplete: 'off',
      autocapitalize: 'off',
      spellcheck: 'false',
      placeholder: 'Fale ou escreva em inglês',
      'aria-label': 'Sua resposta em inglês'
    });
    const status = h('div', { class: 'ia-aviso', role: 'status' }, temFala
      ? 'Toque em Falar ou escreva. O relógio conta o tempo desta resposta.'
      : 'Sem microfone neste navegador. Escreva a resposta.');
    const mic = temFala
      ? h('button', { class: 'btn btn-branco', type: 'button', onclick: () => reconhecerFala(status, entrada) }, 'FALAR')
      : '';
    const contar = h('button', { class: 'btn btn-verde', type: 'button', disabled: true }, 'CONTAR');
    entrada.addEventListener('input', () => {
      contar.disabled = !entrada.value.trim();
    });
    const enviar = async () => {
      if (!entrada.value.trim() || abertaSessao.feedback) return;
      await finalizarGravacao();
      const segundos = Math.max(0, Math.round((Date.now() - abertaSessao.inicio) / 1000));
      const aval = avaliarAberta(entrada.value, segundos);
      abertaSessao.notas.push(aval.nota);
      abertaSessao.muletas += aval.preenchimentos?.length || 0;
      if (aval.ok) {
        abertaSessao.acertos++;
        sons.acerto();
      } else sons.erro();
      abertaSessao.feedback = aval;
      pintarAberta();
    };
    entrada.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') enviar();
    });
    contar.addEventListener('click', () => { enviar(); });
    miolo.push(status, mic, entrada, contar);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!abertaSessao.feedback) {
    const campo = app.querySelector('textarea');
    if (campo) campo.focus();
    pulsarAberta();
  }
}

function cartaoSobre() {
  const novo = localStorage.getItem('gringolingo:versao-vista') !== VERSAO_APP;
  return h('div', { class: 'card sobre-card' },
    h('div', { class: 'sobre-textos' },
      h('div', { class: 'nivel-titulo' }, '🦜 Sobre o GringoLingo'),
      h('div', { class: 'revisao-sub' }, 'Feito em JavaScript puro, sem frameworks: funciona offline, sincroniza na nuvem e é de graça.')
    ),
    h('div', { class: 'sobre-botoes' },
      h('button', {
        class: 'pilula btn-perfil' + (novo ? ' pilula-fogo' : ''),
        type: 'button',
        onclick: telaNovidades
      }, (novo ? '✨ ' : '') + 'v' + VERSAO_APP),
      h('button', { class: 'pilula btn-perfil', type: 'button', onclick: telaPrivacidade }, '🔒 Privacidade'),
      h('a', { class: 'pilula btn-perfil sobre-link', href: 'https://github.com/lucasrmagalhaes/gringolingo-js', target: '_blank', rel: 'noopener noreferrer' }, '🐙 Código')
    )
  );
}

function cartaoMetricas() {
  const ligadas = metricasLigadas();
  const botao = h('button', { class: 'btn ' + (ligadas ? 'btn-branco' : 'btn-azul'), type: 'button' }, ligadas ? 'DESLIGAR' : 'LIGAR');
  botao.addEventListener('click', () => {
    definirMetricas(!ligadas);
    telaPrivacidade();
  });
  return h('div', { class: 'card metricas-card' },
    h('div', { class: 'metricas-textos' },
      h('div', { class: 'nivel-titulo' }, '📊 Contagem anônima de uso'),
      h('div', { class: 'privacidade-linha' }, 'Para saber se o app está sendo usado, ele registra apenas duas coisas: que alguém abriu o app hoje e que alguém concluiu uma lição.'),
      h('div', { class: 'privacidade-linha' }, 'Não vai junto nenhum identificador. Sem conta, sem cookie, sem localização, sem nada que ligue o registro a você. Nem eu consigo saber que foi você.'),
      h('div', { class: 'privacidade-linha' }, ligadas ? 'Está ligada. Pode desligar quando quiser.' : 'Está desligada. Nada é enviado.')
    ),
    botao
  );
}

function telaPrivacidade() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'privacidade';
  registrarRota('privacidade');
  app.innerHTML = '';
  const bloco = (titulo, ...linhas) => h('div', { class: 'card' },
    h('div', { class: 'nivel-titulo' }, titulo),
    ...linhas.map(l => h('div', { class: 'privacidade-linha' }, l))
  );
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Voltar', onclick: () => voltarTela(telaPerfil) }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo', role: 'heading', 'aria-level': '1' }, '🔒 Privacidade')
    ),
    bloco('📱 O que fica no seu aparelho',
      'Todo o seu progresso (XP, streak, estrelas, conquistas, agenda de revisão e os padrões de erro do tutor) mora no armazenamento local do navegador.',
      'Também ficam aqui a sua escolha de tema, de voz e de velocidade da fala, e o registro de erros do diagnóstico (?debug).',
      'O registro de erros nunca sai do aparelho: não é enviado para lugar nenhum, e some quando você sai da conta.'
    ),
    bloco('☁️ O que vai para a nuvem (só se você criar conta)',
      'Sem conta, nada sai do seu aparelho. O app funciona 100% offline.',
      'Com conta, sobem apenas dois dados: o seu e-mail (para o login) e o mesmo pacote de progresso, guardado no Supabase.',
      'A senha nunca é vista pelo app: quem cuida dela é o Supabase Auth. Se você entra com Google, nem senha existe.',
      'Cada pessoa só enxerga a própria linha. Isso é garantido no banco, não só no aplicativo.'
    ),
    bloco('🙋 O que você controla',
      'Exportar: baixe todo o seu progresso em um arquivo JSON, no cartão de Backup do perfil.',
      'Apagar: o botão "Apagar minha conta" remove a conta e o progresso da nuvem de uma vez, sem passar por ninguém.',
      'Sair: ao sair da conta, o aparelho é limpo (quando o progresso já está salvo na nuvem).'
    ),
    cartaoMetricas(),
    bloco('🚫 O que o app não faz',
      'Não usa cookies, nem rastreadores, nem publicidade.',
      'Não coleta localização, contatos, microfone gravado ou qualquer dado além do descrito acima.',
      'O reconhecimento de voz do exercício de falar é processado pelo próprio navegador; o app só recebe o texto.',
      'Não vende nem compartilha seus dados. Como em qualquer site, os servidores que entregam o app (GitHub Pages, a fonte do Google e, com conta, o Supabase) veem o IP da requisição; nenhum deles recebe seu progresso além do descrito acima. O código é aberto. Dá para conferir cada linha.'
    )
  );
  focarTela();
}

function telaNovidades() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'novidades';
  registrarRota('novidades');
  localStorage.setItem('gringolingo:versao-vista', VERSAO_APP);
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Voltar', onclick: () => voltarTela(telaPerfil) }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo', role: 'heading', 'aria-level': '1' }, '✨ Novidades')
    ),
    ...NOVIDADES.map(n => h('div', { class: 'card' },
      h('div', { class: 'novidade-cab' },
        h('span', { class: 'nivel-titulo' }, n.titulo),
        h('span', { class: 'dic-tag' }, 'v' + n.versao)
      ),
      h('ul', { class: 'novidade-lista' }, n.itens.map(i => h('li', {}, i)))
    ))
  );
  focarTela();
}

const SOTAQUES = {
  'en-US': 'EUA',
  'en-GB': 'Reino Unido',
  'en-AU': 'Austrália',
  'en-CA': 'Canadá',
  'en-IE': 'Irlanda',
  'en-IN': 'Índia',
  'en-NZ': 'Nova Zelândia',
  'en-ZA': 'África do Sul',
  'en-SG': 'Singapura',
  'en-PH': 'Filipinas',
  'en-NG': 'Nigéria',
  'en-KE': 'Quênia'
};

function rotuloSotaque(lang) {
  return SOTAQUES[lang] ?? '🌎 ' + lang.toUpperCase();
}

function nomeCurto(nome) {
  return nome
    .replace(/^(Microsoft|Google|Apple)\s+/i, '')
    .replace(/\s*[-–]\s*English.*$/i, '')
    .replace(/\s*\(English[^)]*\)/i, '')
    .replace(/\s*Online\s*/i, ' ')
    .replace(/\s+/g, ' ')
    .trim() || nome;
}

// Ajustar voz/velocidade/som troca só este cartão, no lugar. Repintar o
// perfil inteiro jogava o usuário de volta ao topo da tela.
function repintarCartaoVoz() {
  document.querySelector('.voz-card')?.replaceWith(cartaoVoz());
}

function cartaoVoz() {
  if (!temTts) return '';
  const lista = vozesDisponiveis();
  const velocidade = velocidadeAtual();
  const chipsVelocidade = h('div', { class: 'metas', role: 'group', 'aria-label': 'Velocidade da fala' },
    VELOCIDADES.map(v => h('button', {
      class: 'meta-opcao' + (v.id === velocidade.id ? ' ativa' : ''),
      type: 'button',
      'aria-pressed': v.id === velocidade.id ? 'true' : 'false',
      onclick() {
        definirVelocidade(v.id);
        falar('Hello! Let us practice English.');
        repintarCartaoVoz();
      }
    }, v.rotulo))
  );
  if (!lista.length) {
    return h('div', { class: 'card voz-card' },
      h('div', { class: 'nivel-titulo' }, '🔊 Voz do app'),
      h('div', { class: 'revisao-sub' }, 'Nenhuma voz em inglês instalada neste aparelho. A pronúncia usa a voz padrão do sistema.'),
      h('div', { class: 'voz-linha' }, h('span', { class: 'voz-rotulo' }, 'Velocidade'), chipsVelocidade),
      linhaSom()
    );
  }
  const atual = lista.find(v => v.uri === vozAtual()) ?? lista[0];
  const langs = [...new Set(lista.map(v => v.lang))].sort();
  const doSotaque = lista.filter(v => v.lang === atual.lang);
  return h('div', { class: 'card voz-card' },
    h('div', { class: 'voz-cab' },
      h('div', {},
        h('div', { class: 'nivel-titulo' }, '🔊 Voz do app'),
        h('div', { class: 'revisao-sub' }, `${rotuloSotaque(atual.lang)} · ${nomeCurto(atual.nome)}`)
      ),
      h('button', {
        class: 'btn btn-azul',
        type: 'button',
        onclick: () => falar('Hello! Let us practice English together.')
      }, '▶ TESTAR')
    ),
    langs.length > 1 ? h('div', { class: 'voz-linha' },
      h('span', { class: 'voz-rotulo' }, 'Sotaque'),
      h('div', { class: 'voz-chips' }, langs.map(lang => h('button', {
        class: 'voz-chip' + (lang === atual.lang ? ' ativa' : ''),
        type: 'button',
        'aria-pressed': lang === atual.lang ? 'true' : 'false',
        onclick() {
          const primeira = lista.find(v => v.lang === lang);
          definirVoz(primeira.uri);
          falar('Hello! Let us practice English.');
          repintarCartaoVoz();
        }
      }, rotuloSotaque(lang))))
    ) : '',
    doSotaque.length > 1 ? h('div', { class: 'voz-linha' },
      h('span', { class: 'voz-rotulo' }, 'Voz'),
      h('div', { class: 'voz-chips' }, doSotaque.map(v => h('button', {
        class: 'voz-chip' + (v.uri === atual.uri ? ' ativa' : ''),
        type: 'button',
        'aria-pressed': v.uri === atual.uri ? 'true' : 'false',
        title: v.nome,
        onclick() {
          definirVoz(v.uri);
          falar('Hello! Let us practice English.');
          repintarCartaoVoz();
        }
      }, nomeCurto(v.nome))))
    ) : '',
    h('div', { class: 'voz-linha' }, h('span', { class: 'voz-rotulo' }, 'Velocidade'), chipsVelocidade),
    linhaSom()
  );
}

function linhaSom() {
  const botao = h('button', { class: 'voz-chip' + (mudo() ? '' : ' ativa'), type: 'button', 'aria-pressed': mudo() ? 'false' : 'true' }, mudo() ? '🔇 Sons desligados' : '🔊 Sons ligados');
  botao.addEventListener('click', () => {
    definirMudo(!mudo());
    if (!mudo()) sons.acerto();
    repintarCartaoVoz();
  });
  return h('div', { class: 'voz-linha' },
    h('span', { class: 'voz-rotulo' }, 'Efeitos'),
    h('div', { class: 'voz-chips' }, botao)
  );
}

function cartaoCompartilhar() {
  if (!estado.stats.licoes) return '';
  const msg = h('div', { class: 'revisao-sub', role: 'status' }, 'Gere um card com seu nível, XP e sequência');
  const botao = h('button', { class: 'btn btn-azul', type: 'button' }, '📤 COMPARTILHAR');
  botao.addEventListener('click', async () => {
    botao.disabled = true;
    const nv = nivelInfo();
    const ultima = BADGES.filter(b => estado.badges.includes(b.id)).at(-1);
    try {
      const r = await compartilharCard({
        nivel: nv.numero,
        titulo: nv.titulo,
        emoji: nv.emoji,
        xp: estado.xp,
        streak: streakAtual(),
        palavras: new Set(itensAprendidos().map(i => i.en)).size,
        badge: ultima
      });
      msg.textContent = r === 'baixado' ? 'Imagem baixada! É só postar 🎉' : 'Mandado! 🎉';
    } catch (e) {
      if (e?.name !== 'AbortError') msg.textContent = 'Não rolou compartilhar: ' + e.message;
    }
    botao.disabled = false;
  });
  return h('div', { class: 'card backup-card' },
    h('div', { class: 'backup-textos' },
      h('div', { class: 'nivel-titulo' }, '📤 Mostrar seu progresso'),
      msg
    ),
    botao
  );
}

function cartaoJornada() {
  if (!estado.stats.licoes) return '';
  const dias = historicoRecente(30);
  const maximo = Math.max(...dias.map(d => d.xp), estado.meta);
  const total = dias.reduce((s, d) => s + d.xp, 0);
  const ativos = dias.filter(d => d.xp > 0).length;
  const caixas = distribuicaoDeCaixas();
  const totalItens = caixas.reduce((a, b) => a + b, 0);
  // Rótulos derivados dos intervalos reais: a caixa 0 já é de 1 dia.
  const rotulos = INTERVALOS.map(n => `${n} dia${n > 1 ? 's' : ''}`);
  return h('div', { class: 'card jornada-card' },
    h('div', { class: 'nivel-titulo' }, '📈 Sua jornada'),
    h('div', { class: 'jornada-grafico', role: 'img', 'aria-label': `XP dos últimos 30 dias, total ${total}` },
      dias.map(d => h('div', {
        class: 'jornada-barra' + (d.xp >= estado.meta ? ' bateu' : ''),
        title: `${d.data.split('-').reverse().slice(0, 2).join('/')}: ${d.xp} XP`
      }, h('div', { style: `height:${maximo ? Math.max(d.xp / maximo * 100, d.xp ? 6 : 2) : 2}%` })))
    ),
    h('div', { class: 'jornada-resumo' },
      h('span', {}, `${total} XP em 30 dias`),
      h('span', {}, `${ativos} dia${ativos === 1 ? '' : 's'} ativo${ativos === 1 ? '' : 's'}`),
      h('span', {}, `média ${Math.round(total / 30)} XP/dia`)
    ),
    totalItens ? h('div', { class: 'caixas' },
      h('div', { class: 'caixas-titulo' }, '🧠 Saúde da memória'),
      h('p', { class: 'aviso-fala' }, 'Toque numa faixa com palavras para treinar só ela.'),
      caixas.map((n, i) => {
        const miolo = [
          h('span', { class: 'caixa-rotulo' }, rotulos[i]),
          h('div', { class: 'progresso caixa-prog' }, h('div', { style: `width:${totalItens ? n / totalItens * 100 : 0}%` })),
          h('span', { class: 'caixa-num' }, String(n))
        ];
        if (!n) return h('div', { class: 'caixa-linha' }, miolo);
        return h('button', {
          class: 'caixa-linha caixa-treinavel',
          type: 'button',
          'aria-label': `Treinar ${n} palavra${n > 1 ? 's' : ''} da caixa de ${rotulos[i]}`,
          onclick: () => iniciarCaixa(i)
        }, miolo);
      })
    ) : ''
  );
}

function cartaoBackup() {
  const msg = h('div', { class: 'revisao-sub', role: 'status' }, 'Baixe uma cópia do seu progresso ou traga de outro aparelho');
  const escolha = h('div', { class: 'backup-botoes' });
  const entrada = h('input', {
    type: 'file',
    accept: 'application/json,.json',
    class: 'arquivo-escondido',
    id: 'backup-arquivo',
    'aria-label': 'Arquivo JSON de backup'
  });
  const aplicar = (dados, modo) => {
    escolha.innerHTML = '';
    try {
      const r = importarEstado(dados, modo);
      atualizarItensExtras();
      msg.textContent = modo === 'substituir'
        ? `Backup restaurado! XP: ${r.antes} → ${r.depois}`
        : `Mesclado! XP: ${r.antes} → ${r.depois}`;
      msg.className = 'login-msg ok';
      timerDeTela(() => {
        if (telaAtiva === 'perfil') telaPerfil();
      }, 1400);
    } catch (e) {
      msg.textContent = e.message;
      msg.className = 'login-msg erro';
    }
  };
  entrada.addEventListener('change', async () => {
    const arquivo = entrada.files?.[0];
    if (!arquivo) return;
    escolha.innerHTML = '';
    if (arquivo.size > LIMITE_BACKUP) {
      msg.textContent = 'Arquivo grande demais para ser um backup do GringoLingo';
      msg.className = 'login-msg erro';
      return;
    }
    try {
      const dados = JSON.parse(await arquivo.text());
      const resumo = resumoBackup(dados);
      if (!resumo) throw new Error('Arquivo não parece um backup do GringoLingo');
      msg.textContent = textoResumoBackup(resumo) + ' Mesclar junta os dois. Substituir troca o progresso deste aparelho.';
      msg.className = 'login-msg';
      let confirmando = false;
      const btnSubstituir = h('button', { class: 'btn btn-branco perigo' }, 'SUBSTITUIR TUDO');
      btnSubstituir.addEventListener('click', () => {
        if (!confirmando) {
          confirmando = true;
          btnSubstituir.textContent = 'TEM CERTEZA? TOQUE DE NOVO';
          btnSubstituir.classList.add('btn-vermelho');
          msg.textContent = 'Toque de novo para substituir o progresso deste aparelho.';
          return;
        }
        aplicar(dados, 'substituir');
      });
      escolha.append(
        h('button', { class: 'btn btn-azul', onclick: () => aplicar(dados, 'mesclar') }, 'MESCLAR'),
        btnSubstituir
      );
    } catch {
      msg.textContent = 'Arquivo não parece um backup do GringoLingo';
      msg.className = 'login-msg erro';
    } finally {
      entrada.value = '';
    }
  });
  return h('div', { class: 'card backup-card' },
    h('div', { class: 'backup-textos' },
      h('div', { class: 'nivel-titulo' }, '💾 Backup e dados'),
      msg,
      escolha
    ),
    h('div', { class: 'backup-botoes' },
      h('button', {
        class: 'btn btn-branco',
        onclick() {
          const nome = nomeArquivoBackup(diaLocalAgora(), VERSAO_APP);
          const blob = new Blob([JSON.stringify(exportarEstado(VERSAO_APP), null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = h('a', { href: url, download: nome });
          document.body.append(a);
          a.click();
          a.remove();
          msg.textContent = `Arquivo ${nome} baixado neste aparelho.`;
          msg.className = 'revisao-sub';
          timerDeTela(() => URL.revokeObjectURL(url), 1000);
        }
      }, 'EXPORTAR'),
      h('button', { class: 'btn btn-branco', 'aria-controls': 'backup-arquivo', onclick: () => entrada.click() }, 'IMPORTAR'),
      entrada
    )
  );
}

function cartaoLembrete() {
  if (!('Notification' in window)) return '';
  const ativo = !!estado.lembrete;
  const trocarNoLugar = () => document.querySelector('.lembrete-card')?.replaceWith(cartaoLembrete());
  const msg = h('div', { class: 'revisao-sub', role: 'status' }, ativo
    ? `Aviso diário às ${estado.lembrete} enquanto o app estiver aberto`
    : 'Receba um lembrete no horário que você escolher');
  const hora = h('input', { class: 'entrada hora-input', type: 'time', value: estado.lembrete ?? '20:00', 'aria-label': 'Horário do lembrete' });
  const botao = h('button', { class: 'btn ' + (ativo ? 'btn-branco' : 'btn-azul') }, ativo ? 'DESLIGAR' : 'ATIVAR');
  botao.addEventListener('click', async () => {
    if (ativo) {
      estado.lembrete = null;
      salvar();
      trocarNoLugar();
      return;
    }
    botao.disabled = true;
    const permissao = await Notification.requestPermission();
    if (permissao !== 'granted') {
      msg.textContent = 'Permissão negada. Libere as notificações do site para usar 🔕';
      botao.disabled = false;
      return;
    }
    estado.lembrete = hora.value;
    salvar();
    agendarLembrete();
    trocarNoLugar();
  });
  return h('div', { class: 'card lembrete-card' },
    h('div', { class: 'lembrete-textos' },
      h('div', { class: 'nivel-titulo' }, '🔔 Lembrete diário'),
      msg
    ),
    ativo ? '' : hora,
    botao
  );
}

function agendarLembrete() {
  clearTimeout(timerLembrete);
  if (!estado.lembrete || !('Notification' in window) || Notification.permission !== 'granted') return;
  const [hh, mm] = estado.lembrete.split(':').map(Number);
  const agora = new Date();
  const alvo = new Date();
  alvo.setHours(hh, mm, 0, 0);
  if (alvo <= agora) alvo.setDate(alvo.getDate() + 1);
  timerLembrete = setTimeout(() => {
    try {
      new Notification('GringoLingo 🦜', {
        body: streakEmRisco() ? 'Seu streak vence hoje! Bora salvar 🔥' : 'Hora do inglês! 5 minutinhos 💪',
        icon: 'icones/icone-192.png'
      });
    } catch {}
    agendarLembrete();
  }, alvo - agora);
}

function cartaoConta() {
  if (!nuvemConfigurada) return '';
  if (!usuarioEmail) {
    return h('button', { class: 'card conta-card conta-entrar', type: 'button', onclick: () => telaLogin() },
      h('span', {}, '🔑 Entrar para sincronizar seu progresso'),
      h('span', { class: 'revisao-seta' }, '☁️')
    );
  }
  const btnSair = h('button', { class: 'btn btn-branco btn-compacto', type: 'button' }, 'SAIR');
  btnSair.addEventListener('click', async () => {
    btnSair.disabled = true;
    let naNuvem = !syncPendente;
    if (syncPendente) {
      try {
        await enviarAgora();
        naNuvem = true;
      } catch {}
    }
    geracaoAuth++;
    try {
      await sair();
    } catch {}
    ativarSync(false);
    usuarioEmail = null;
    syncPendente = false;
    authCarregando = false;
    limparLog();
    if (naNuvem) resetarEstado();
    telaInicial();
  });
  const avisosPendencia = {
    grande: '⚠️ O progresso passou do limite da nuvem. Ele continua salvo aqui no aparelho. Reduzir a Minha Lista pode resolver.',
    versao: '⚠️ Este progresso na nuvem veio de uma versão mais nova do app. Atualize o app para voltar a sincronizar.'
  };
  return h('div', { class: 'card conta-card' },
    h('div', { class: 'conta-item' },
      h('div', { class: 'conta-texto' },
        h('div', { class: 'conta-titulo conta-email' }, usuarioEmail),
        syncPendente
          ? h('div', { class: 'conta-sub conta-alerta', role: 'status' }, avisosPendencia[motivoPendencia()] ?? '⚠️ Progresso ainda não sincronizado. Ele fica salvo aqui no aparelho')
          : h('div', { class: 'conta-sub' }, '☁️ Progresso sincronizado na nuvem')
      ),
      h('div', { class: 'conta-acoes' },
        syncPendente ? h('button', { class: 'btn btn-azul btn-compacto', type: 'button', onclick: () => aposLogin(true) }, 'TENTAR AGORA') : '',
        btnSair
      )
    ),
    avisoPerfil ? h('div', { class: 'login-msg erro' }, avisoPerfil) : '',
    temGoogle ? linhaGoogle() : '',
    linhaApagarConta()
  );
}

function linhaApagarConta() {
  const msg = h('div', { class: 'login-msg', role: 'alert' });
  const botao = h('button', { class: 'btn btn-branco btn-compacto perigo', type: 'button' }, 'APAGAR');
  let confirmando = false;
  botao.addEventListener('click', async () => {
    if (!confirmando) {
      confirmando = true;
      botao.textContent = 'TEM CERTEZA?';
      botao.classList.add('btn-vermelho');
      msg.textContent = 'Toque de novo para apagar tudo. Exporte um backup antes se quiser guardar.';
      msg.className = 'login-msg erro';
      timerDeTela(() => {
        if (!confirmando) return;
        confirmando = false;
        botao.textContent = 'APAGAR';
        botao.classList.remove('btn-vermelho');
        msg.textContent = '';
      }, 6000);
      return;
    }
    botao.disabled = true;
    botao.textContent = 'APAGANDO…';
    try {
      await apagarConta();
      geracaoAuth++;
      ativarSync(false);
      usuarioEmail = null;
      syncPendente = false;
      resetarEstado();
      limparLog();
      telaInicial();
    } catch (e) {
      msg.textContent = e.message;
      botao.disabled = false;
      botao.textContent = 'APAGAR';
    }
  });
  return h('div', { class: 'conta-item conta-apagar' },
    h('div', { class: 'conta-texto' },
      h('div', { class: 'conta-titulo' }, 'Apagar minha conta'),
      h('div', { class: 'conta-sub' }, 'Remove a conta e o progresso da nuvem, sem volta'),
      msg
    ),
    botao
  );
}

function linhaGoogle() {
  const vinculado = provedores.includes('google');
  const msg = h('div', { class: 'login-msg', role: 'alert' });
  const btn = h('button', { class: 'btn btn-compacto ' + (vinculado ? 'btn-branco' : 'btn-google'), type: 'button' },
    iconeGoogle(),
    h('span', {}, vinculado ? 'DESVINCULAR' : 'VINCULAR')
  );
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    msg.textContent = '';
    msg.className = 'login-msg';
    try {
      if (vinculado) {
        await desvincularGoogle();
        provedores = await provedoresDaConta();
        telaPerfil();
        return;
      }
      await vincularGoogle();
    } catch (e) {
      msg.textContent = e.message;
      msg.classList.add('erro');
      btn.disabled = false;
    }
  });
  return h('div', { class: 'conta-item' },
    h('div', { class: 'conta-texto' },
      h('div', { class: 'conta-titulo' }, vinculado ? 'Google vinculado ✅' : 'Vincular com o Google'),
      h('div', { class: 'conta-sub' }, vinculado
        ? 'Você pode entrar com um clique, sem digitar senha'
        : 'Depois de vincular, dá pra entrar com um clique na mesma conta'),
      msg
    ),
    btn
  );
}

function statPilula(emoji, valor, rotulo) {
  return h('div', { class: 'stat' },
    h('div', { class: 'stat-emoji' }, emoji),
    h('div', {},
      h('div', { class: 'stat-valor' }, String(valor)),
      h('div', { class: 'stat-rotulo' }, rotulo)
    )
  );
}

function confete() {
  if (reduzirMovimento()) return;
  const cv = document.getElementById('confetti');
  const cx = cv.getContext('2d');
  cv.width = innerWidth;
  cv.height = innerHeight;
  const cores = ['#58CC02', '#1CB0F6', '#FF9600', '#CE82FF', '#FF4B4B', '#FFC800'];
  const parts = Array.from({ length: 140 }, () => ({
    x: Math.random() * cv.width,
    y: -20 - Math.random() * cv.height * 0.5,
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    r: 4 + Math.random() * 5,
    cor: cores[Math.floor(Math.random() * cores.length)],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3
  }));
  const t0 = performance.now();
  function tick(t) {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.rot);
      cx.fillStyle = p.cor;
      cx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      cx.restore();
    });
    if (t - t0 < 3200) requestAnimationFrame(tick);
    else cx.clearRect(0, 0, cv.width, cv.height);
  }
  requestAnimationFrame(tick);
}

function avisarAtualizacao(registro) {
  if (document.querySelector('.aviso-versao')) return;
  const btn = h('button', {
    class: 'aviso-versao',
    type: 'button',
    onclick() {
      btn.disabled = true;
      btn.textContent = 'Atualizando…';
      // O SW novo fica em waiting até este toque; o skipWaiting dele dispara o
      // controllerchange abaixo, que recarrega já na versão nova.
      if (registro.waiting) registro.waiting.postMessage('atualizar');
      else location.reload();
    }
  }, '✨ Nova versão disponível. Tocar para atualizar');
  document.body.append(btn);
}

function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  let recarregou = false;
  // Na PRIMEIRA instalação o clients.claim() também dispara controllerchange;
  // só recarrega quando já havia um controlador (ou seja, troca de versão).
  let tinhaControlador = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!tinhaControlador) {
      tinhaControlador = true;
      return;
    }
    if (recarregou) return;
    recarregou = true;
    location.reload();
  });
  navigator.serviceWorker.register('./sw.js').then(registro => {
    if (registro.waiting && navigator.serviceWorker.controller) avisarAtualizacao(registro);
    registro.addEventListener('updatefound', () => {
      const novo = registro.installing;
      if (!novo) return;
      novo.addEventListener('statechange', () => {
        if (novo.state === 'installed' && navigator.serviceWorker.controller) avisarAtualizacao(registro);
      });
    });
  }).catch(() => {});
}

function telaDebug() {
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'debug';
  registrarRota('debug');
  const log = logSalvo();
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Voltar', onclick: () => voltarTela() }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo', role: 'heading', 'aria-level': '1' }, '🐛 Diagnóstico')
    ),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, `${log.length} erro${log.length === 1 ? '' : 's'} registrado${log.length === 1 ? '' : 's'}`),
      h('div', { class: 'revisao-sub' }, 'Compartilhe esta tela se algo quebrar. Nada é enviado automaticamente.')
    ),
    ...log.slice().reverse().map(e => h('div', { class: 'card debug-item' },
      h('div', { class: 'debug-quando' }, e.quando + ' · ' + e.origem + ' · tela ' + e.tela),
      h('div', { class: 'debug-msg' }, e.mensagem),
      h('div', { class: 'debug-pilha' }, e.pilha)
    )),
    h('div', { class: 'resultado-botoes' },
      h('button', { class: 'btn btn-vermelho', type: 'button', onclick: () => { limparLog(); telaDebug(); } }, 'LIMPAR LOG')
    )
  );
}

function avisarMetricas() {
  if (!metricasLigadas() || localStorage.getItem('gringolingo:aviso-metricas')) return;
  try {
    localStorage.setItem('gringolingo:aviso-metricas', '1');
  } catch {}
  const btn = h('button', {
    class: 'aviso-versao aviso-metricas',
    type: 'button',
    'aria-live': 'polite',
    onclick() {
      btn.remove();
      document.body.classList.remove('com-aviso-metricas');
      telaPrivacidade();
    }
  }, '📊 Contamos aberturas de forma anônima. Toque para entender e desligar');
  document.body.classList.add('com-aviso-metricas');
  document.body.append(btn);
  setTimeout(() => {
    btn.remove();
    document.body.classList.remove('com-aviso-metricas');
  }, 12000);
}

let dialogo = null;
let sombraSessao = null;

function calar() {
  if (temTts) speechSynthesis.cancel();
}

function botaoConversa() {
  const feitas = CENARIOS.filter(c => (estado.conversas?.[c.id]?.vezes ?? 0) > 0).length;
  const nivel = estado.nivelFala ? ` Nível de fala ${estado.nivelFala}.` : '';
  const sub = feitas
    ? `${feitas} de ${CENARIOS.length} diálogos feitos.${nivel}`
    : (estado.nivelFala
      ? `Nível de fala ${estado.nivelFala}. Cenas, perguntas e o resumo da semana.`
      : 'Cenas com caminhos, pronúncia, escuta e um painel da sua fala.');
  return h('button', { class: 'card revisao conversa-atalho', type: 'button', onclick: telaConversa },
    h('span', { class: 'revisao-emoji' }, '💬'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Conversar'),
      h('div', { class: 'revisao-sub' }, sub)
    ),
    h('span', { class: 'revisao-seta' }, '🗣️')
  );
}

function cartaoPronuncia() {
  const feitas = estado.stats.pronuncias ?? 0;
  return h('button', { class: 'card revisao pronuncia-atalho', type: 'button', onclick: telaPronuncia },
    h('span', { class: 'revisao-emoji' }, '👅'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Pronúncia'),
      h('div', { class: 'revisao-sub' }, feitas
        ? `${feitas} treino${feitas > 1 ? 's' : ''}. TH, -ed, vogais e acento.`
        : 'Sons difíceis para quem fala português. Ouça o par e escolha.')
    ),
    h('span', { class: 'revisao-seta' }, '🎯')
  );
}

function reconhecerFala(status, entrada) {
  const Reconhecedor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Reconhecedor) {
    status.textContent = 'Este navegador não escuta o microfone. Escreva a frase.';
    entrada.focus();
    return;
  }
  pararReconhecimento();
  let rec;
  try {
    rec = new Reconhecedor();
  } catch {
    status.textContent = 'O microfone não abriu. Escreva a frase no lugar.';
    entrada.focus();
    return;
  }
  recAtivo = rec;
  rec.lang = 'en-US';
  rec.maxAlternatives = 3;
  rec.interimResults = false;
  status.textContent = 'Ouvindo… fale agora.';
  rec.onresult = ev => {
    const alts = [...ev.results[0]].map(r => r.transcript).filter(Boolean);
    const ouvido = alts[0] || '';
    entrada.value = entrada.dataset.acrescentar && entrada.value.trim()
      ? `${entrada.value.trim()} ${ouvido}`.trim()
      : ouvido;
    entrada.dispatchEvent(new Event('input', { bubbles: true }));
    status.textContent = alts.length > 1 ? 'Peguei. Se não ficou certo, edite e verifique.' : 'Peguei. Confira e verifique.';
    entrada.focus();
  };
  rec.onerror = () => {
    status.textContent = 'Não consegui ouvir. Escreva a frase no lugar.';
    entrada.focus();
  };
  rec.onend = () => {
    if (recAtivo === rec) recAtivo = null;
  };
  try {
    rec.start();
  } catch {
    if (recAtivo === rec) recAtivo = null;
    status.textContent = 'O microfone não abriu. Escreva a frase no lugar.';
    entrada.focus();
  }
}

function formularioIa(aoSalvar) {
  const atual = lerIa();
  const status = h('div', { class: 'ia-aviso', role: 'status' }, atual.ligada
    ? 'Parceiro ligado neste aparelho.'
    : 'Parceiro desligado. Diálogos e sombra não precisam dele.');
  const chave = h('input', {
    type: 'password',
    class: 'entrada',
    autocomplete: 'off',
    spellcheck: 'false',
    placeholder: atual.chave ? 'Chave já salva. Digite outra só para trocar.' : 'Cole a chave do Google AI Studio',
    'aria-label': 'Chave da API, só neste aparelho'
  });
  const modelo = h('input', {
    class: 'entrada',
    value: atual.modelo,
    autocomplete: 'off',
    spellcheck: 'false',
    'aria-label': 'Nome do modelo'
  });
  const salvarCampos = ligada => salvarIa({
    ligada,
    chave: chave.value.trim() ? chave.value : undefined,
    modelo: modelo.value
  });
  return h('div', {},
    h('p', { class: 'ia-aviso' }, 'A chave não entra no backup nem na nuvem. O app segue inteiro sem ela.'),
    chave,
    h('div', { class: 'revisao-sub' }, 'Modelo'),
    modelo,
    status,
    h('div', { class: 'fila-botoes' },
      h('button', {
        class: 'btn ' + (atual.ligada ? 'btn-branco' : 'btn-verde'),
        onclick() {
          const salva = salvarCampos(!atual.ligada);
          if (!atual.ligada && !salva.ligada) {
            status.textContent = 'Cole uma chave com pelo menos 20 caracteres para ligar.';
            return;
          }
          aoSalvar();
        }
      }, atual.ligada ? 'DESLIGAR' : 'LIGAR'),
      h('button', {
        class: 'btn btn-branco',
        onclick() {
          salvarCampos(atual.ligada);
          status.textContent = 'Salvo neste aparelho.';
          aoSalvar();
        }
      }, 'SALVAR'),
      h('button', {
        class: 'btn btn-branco',
        onclick() {
          apagarIa();
          aoSalvar();
        }
      }, 'APAGAR CHAVE')
    )
  );
}

function cartaoIa() {
  return h('div', { class: 'card' },
    h('div', { class: 'nivel-titulo' }, '🤖 Parceiro de conversa'),
    formularioIa(() => {
      if (telaAtiva === 'perfil') telaPerfil();
      else if (telaAtiva === 'parceiro') telaParceiro();
    })
  );
}

function topoVoltar(titulo, aoVoltar) {
  return h('div', { class: 'topo' },
    h('button', { class: 'pilula btn-perfil', type: 'button', 'aria-label': 'Voltar', onclick: aoVoltar }, '← Voltar'),
    h('div', { class: 'espaco' }),
    h('div', { class: 'logo logo-tela', role: 'heading', 'aria-level': '1' }, titulo)
  );
}

function telaConversa() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'conversa';
  registrarRota('conversa');
  const recorde = estado.stats.recordeSombra ?? 0;
  app.innerHTML = '';
  app.append(
    topoVoltar('💬 Conversar', () => voltarTela()),
    h('p', { class: 'ia-aviso' }, 'A trilha marca o dia. O recomendado escolhe o treino. A busca continua abaixo.'),
    ...blocoFluencia(),
    h('div', { class: 'rotulo', role: 'heading', 'aria-level': '2' }, 'DIÁLOGOS'),
    ...CENARIOS.map(c => {
      const prog = estado.conversas?.[c.id];
      const sub = prog?.vezes
        ? `${prog.vezes} vez${prog.vezes > 1 ? 'es' : ''} · melhor ${prog.melhor}`
        : (c.ramo ? `Dois caminhos. ${c.onde}` : c.onde);
      return h('button', { class: 'card revisao', onclick: () => abrirDialogo(c.id) },
        h('span', { class: 'revisao-emoji' }, c.emoji),
        h('div', { class: 'revisao-textos' },
          h('div', { class: 'revisao-titulo' }, c.titulo),
          h('div', { class: 'revisao-sub' }, sub)
        ),
        h('span', { class: 'revisao-seta' }, '›')
      );
    }),
    h('div', { class: 'rotulo', role: 'heading', 'aria-level': '2' }, 'TREINO'),
    h('button', { class: 'card revisao', onclick: telaFrases },
      h('span', { class: 'revisao-emoji' }, '💬'),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, 'Frases de sobrevivência'),
        h('div', { class: 'revisao-sub' }, 'Repetir, ganhar tempo, concordar e interromper. Praticou, entra na revisão.')
      ),
      h('span', { class: 'revisao-seta' }, '›')
    ),
    h('button', { class: 'card revisao', onclick: () => abrirSombra() },
      h('span', { class: 'revisao-emoji' }, '🗣️'),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, 'Sombra'),
        h('div', { class: 'revisao-sub' }, recorde ? `Ouça, repita e veja a nota. Recorde: ${recorde}.` : 'Ouça, repita e veja quais palavras faltaram.')
      ),
      h('span', { class: 'revisao-seta' }, '›')
    ),
    h('button', { class: 'card revisao', onclick: telaParceiro },
      h('span', { class: 'revisao-emoji' }, '🤖'),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, 'Parceiro'),
        h('div', { class: 'revisao-sub' }, iaPronta()
          ? 'Conversa livre no seu nível. A chave está só neste aparelho.'
          : 'Desligado. Sem chave, nada sai do aparelho.')
      ),
      h('span', { class: 'revisao-seta' }, '›')
    ),
    h('button', { class: 'card revisao', onclick: telaPronuncia },
      h('span', { class: 'revisao-emoji' }, '👅'),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, 'Pronúncia'),
        h('div', { class: 'revisao-sub' }, 'TH, -ed, vogal curta e longa, acento da palavra.')
      ),
      h('span', { class: 'revisao-seta' }, '›')
    ),
    h('button', { class: 'card revisao', onclick: telaOuvido },
      h('span', { class: 'revisao-emoji' }, '👂'),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, 'Ouvir uma cena'),
        h('div', { class: 'revisao-sub' }, 'A voz do aparelho, normal ou devagar. Depois, o que foi dito.')
      ),
      h('span', { class: 'revisao-seta' }, '›')
    ),
    h('button', { class: 'card revisao', onclick: telaPainel },
      h('span', { class: 'revisao-emoji' }, '📊'),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, 'Painel da fala'),
        h('div', { class: 'revisao-sub' }, 'A nota da semana e os erros que mais voltam.')
      ),
      h('span', { class: 'revisao-seta' }, '›')
    )
  );
  pintarListaHub();
  focarTela();
}

function campoResposta(placeholder) {
  const entrada = h('input', {
    class: 'entrada',
    type: 'text',
    lang: 'en',
    autocomplete: 'off',
    autocapitalize: 'off',
    spellcheck: 'false',
    placeholder,
    'aria-label': placeholder
  });
  const status = h('div', { class: 'ia-aviso', role: 'status' }, temFala
    ? 'Toque em Falar ou escreva a resposta.'
    : 'Sem microfone neste navegador. Escreva a resposta.');
  const mic = temFala
    ? h('button', { class: 'btn btn-branco', type: 'button', onclick: () => reconhecerFala(status, entrada) }, 'FALAR')
    : '';
  return { entrada, status, mic };
}

function cartaoTutor(aval) {
  const partes = [];
  if (aval.ok && !aval.quase) {
    partes.push(h('div', { class: 'nivel-titulo' }, 'Muito bem!'));
  } else if (aval.quase) {
    partes.push(h('div', { class: 'nivel-titulo' }, 'Quase. Vale, com um aviso.'));
  } else {
    partes.push(h('div', { class: 'nivel-titulo' }, aval.tutor?.titulo || 'Ainda não'));
  }
  if (aval.tutor?.porque) partes.push(h('p', {}, aval.tutor.porque));
  if (aval.tutor?.dica) partes.push(h('div', { class: 'feedback-nota' }, '💡 ' + aval.tutor.dica));
  if (!aval.ok || aval.quase) {
    partes.push(h('p', {}, 'Melhor jeito: ', h('strong', { lang: 'en' }, aval.melhor)));
  }
  return h('div', { class: 'card', role: 'status', 'data-foco': '1' }, partes);
}

function abrirDialogo(id) {
  const cenario = cenarioPorId(id);
  if (!cenario) return telaConversa();
  if (cenario.ramo) {
    dialogo = {
      cenario,
      ramo: true,
      noId: cenario.inicio,
      escolha: null,
      acertos: 0,
      respostas: 0,
      notas: [],
      erros: [],
      feedback: null,
      concluido: false,
      fim: null
    };
    pintarRamo();
    return;
  }
  dialogo = {
    cenario,
    rodadas: rodadasDo(cenario),
    i: 0,
    acertos: 0,
    respostas: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarDialogo();
}

function pintarDialogo() {
  if (!dialogo) return telaConversa();
  if (dialogo.ramo) return pintarRamo();
  if (dialogo.concluido) return pintarFim(dialogo.fim);
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'dialogo';
  registrarRota('dialogo');
  const rodada = dialogo.rodadas[dialogo.i];
  const npc = rodada.npc[rodada.npc.length - 1];
  const campo = campoResposta('Escreva em inglês...');
  const ouvir = () => falar(npc.en);
  app.innerHTML = '';
  const miolo = [
    topoVoltar(dialogo.cenario.emoji + ' ' + dialogo.cenario.titulo, () => voltarTela()),
    h('div', { class: 'revisao-sub' }, `Rodada ${dialogo.i + 1} de ${dialogo.rodadas.length} · ${dialogo.cenario.onde}`),
    h('div', { class: 'fala fala-npc' },
      h('div', { class: 'fala-en', lang: 'en' }, npc.en),
      h('div', { class: 'fala-pt' }, npc.pt)
    ),
    h('button', { class: 'btn btn-branco', type: 'button', onclick: ouvir }, 'OUVIR DE NOVO')
  ];
  if (dialogo.feedback) {
    miolo.push(cartaoTutor(dialogo.feedback));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (dialogo.i + 1 >= dialogo.rodadas.length) concluirDialogo();
        else {
          dialogo.i++;
          dialogo.feedback = null;
          pintarDialogo();
        }
      }
    }, dialogo.i + 1 >= dialogo.rodadas.length ? 'CONCLUIR' : 'CONTINUAR'));
  } else {
    miolo.push(h('p', { class: 'ia-aviso' }, rodada.voce.pt));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = () => {
      if (!campo.entrada.value.trim() || dialogo.feedback) return;
      const aval = avaliarResposta(rodada.voce, campo.entrada.value);
      dialogo.respostas++;
      dialogo.notas.push(aval.nota);
      if (aval.ok) {
        dialogo.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        dialogo.erros.push({ en: aval.melhor, pt: rodada.voce.pt });
      }
      dialogo.feedback = aval;
      pintarDialogo();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', enviar);
    miolo.push(verificar);
    timerDeTela(ouvir, 280);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!dialogo.feedback) campo.entrada.focus();
}

function concluirDialogo() {
  if (!dialogo || dialogo.concluido) return pintarFim(dialogo?.fim);
  const total = dialogo.ramo ? dialogo.notas.length : dialogo.rodadas.length;
  const nota = total ? Math.round(dialogo.notas.reduce((s, n) => s + n, 0) / total) : 0;
  const perfeita = dialogo.acertos === total && total > 0;
  const xp = 10 + dialogo.acertos * 8 + (perfeita ? 15 : 0);
  const evento = registrarDialogo({
    id: dialogo.cenario.id,
    ramo: !!dialogo.ramo,
    xp,
    acertos: dialogo.acertos,
    respostas: dialogo.respostas,
    nota,
    perfeita,
    comboMax: 0,
    errosFala: dialogo.erros || []
  });
  dialogo.concluido = true;
  dialogo.fim = {
    titulo: 'Diálogo concluído!',
    sub: dialogo.cenario.titulo,
    nota,
    xp: xp + evento.bonusMissoes,
    evento,
    painel: true
  };
  pintarFim(dialogo.fim);
}

function pintarRamo() {
  if (!dialogo?.ramo) return dialogo ? pintarDialogo() : telaConversa();
  if (dialogo.concluido) return pintarFim(dialogo.fim);
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'dialogo';
  registrarRota('dialogo');
  const no = noDaCena(dialogo.cenario, dialogo.noId);
  if (!no) return concluirDialogo();
  const npc = no.npc[no.npc.length - 1];
  const opcoes = no.opcoes || [];
  if (!dialogo.escolha && opcoes.length === 1) dialogo.escolha = opcoes[0];
  const turno = dialogo.notas.length + (dialogo.feedback ? 0 : 1);
  const ouvir = () => falar(npc.en);
  app.innerHTML = '';
  const miolo = [
    topoVoltar(dialogo.cenario.emoji + ' ' + dialogo.cenario.titulo, () => voltarTela()),
    h('div', { class: 'revisao-sub' }, `Turno ${turno} · ${dialogo.cenario.onde}`),
    h('div', { class: 'fala fala-npc' },
      h('div', { class: 'fala-en', lang: 'en' }, npc.en),
      h('div', { class: 'fala-pt' }, npc.pt)
    ),
    h('button', { class: 'btn btn-branco', type: 'button', onclick: ouvir }, 'OUVIR DE NOVO')
  ];
  if (dialogo.feedback) {
    const segue = dialogo.feedback.segue;
    const podeSeguir = !!(segue && dialogo.respostas < 8 && noDaCena(dialogo.cenario, segue));
    miolo.push(cartaoTutor(dialogo.feedback));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (podeSeguir) {
          dialogo.noId = segue;
          dialogo.escolha = null;
          dialogo.feedback = null;
          pintarRamo();
        } else concluirDialogo();
      }
    }, podeSeguir ? 'CONTINUAR' : 'CONCLUIR'));
  } else if (!dialogo.escolha) {
    miolo.push(h('p', { class: 'ia-aviso' }, no.pt || 'Escolha o que você quer dizer.'));
    miolo.push(h('div', { class: 'opcoes' }, opcoes.map(op => h('button', {
      class: 'opcao',
      type: 'button',
      onclick() {
        dialogo.escolha = op;
        pintarRamo();
      }
    }, op.rotulo))));
    timerDeTela(ouvir, 280);
  } else {
    const opcao = dialogo.escolha;
    const campo = campoResposta('Escreva em inglês...');
    miolo.push(h('p', { class: 'ia-aviso' }, opcao.rotulo));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = () => {
      if (!campo.entrada.value.trim() || dialogo.feedback) return;
      const aval = avaliarEscolha(opcao, campo.entrada.value);
      dialogo.respostas++;
      dialogo.notas.push(aval.nota);
      if (aval.ok) {
        dialogo.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        dialogo.erros.push({ en: opcao.melhor, pt: opcao.rotulo });
      }
      dialogo.feedback = aval;
      pintarRamo();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', enviar);
    miolo.push(verificar);
    timerDeTela(ouvir, 280);
    app.append(h('div', {}, miolo));
    focarTela();
    campo.entrada.focus();
    return;
  }
  app.append(h('div', {}, miolo));
  focarTela();
}

function abrirSombra(origem) {
  const base = origem === 'baralho'
    ? escolherSombra({ soBaralho: true, vencidas: frasesVencidas(), qtd: 8 })
    : escolherSombra({ aprendidas: itensAprendidos(), vencidas: frasesVencidas(), qtd: 8 });
  const frases = ordenarSombra(base, diaLocalAgora());
  sombraSessao = { frases, i: 0, notas: [], erros: [], feedback: null, revelado: false, concluido: false, fim: null, origem: origem || '' };
  pintarSombra();
}

function pintarSombra() {
  if (!sombraSessao) return telaConversa();
  if (sombraSessao.concluido) return pintarFim(sombraSessao.fim);
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'sombra';
  registrarRota('sombra');
  const frase = sombraSessao.frases[sombraSessao.i];
  if (!frase) {
    app.innerHTML = '';
    app.append(
      topoVoltar('🗣️ Sombra', () => voltarTela()),
      h('p', { class: 'ia-aviso', role: 'status' }, 'Ainda não há frase para ouvir neste aparelho.')
    );
    focarTela();
    return;
  }
  const campo = campoResposta('Repita em inglês...');
  const ouvir = () => falar(frase.en);
  app.innerHTML = '';
  const miolo = [
    topoVoltar('🗣️ Sombra', () => voltarTela()),
    h('div', { class: 'revisao-sub' }, `Frase ${sombraSessao.i + 1} de ${sombraSessao.frases.length}`),
    h('button', {
      class: 'btn btn-branco',
      type: 'button',
      'aria-label': 'Ouvir a frase na voz do aparelho',
      onclick: ouvir
    }, 'OUVIR')
  ];
  if (sombraSessao.feedback) {
    const aval = sombraSessao.feedback;
    miolo.push(h('div', { class: 'card', role: 'status', 'data-foco': '1' },
      h('div', { class: 'nota-grande' }, String(aval.nota)),
      h('p', {}, textoDaSombra(aval)),
      h('p', { class: 'sombra-frase', lang: 'en' }, aval.partes.map(p => h('span', { class: p.ok ? 'sombra-ok' : 'sombra-falta' }, p.t + ' ')))
    ));
    if (aval.sobras?.length) miolo.push(h('p', { class: 'ia-aviso' }, 'Sobrou: ' + aval.sobras.join(', ')));
    if (frase.pt) miolo.push(h('p', { class: 'fala-pt' }, frase.pt));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (sombraSessao.i + 1 >= sombraSessao.frases.length) concluirSombra();
        else {
          sombraSessao.i++;
          sombraSessao.feedback = null;
          sombraSessao.revelado = false;
          pintarSombra();
        }
      }
    }, sombraSessao.i + 1 >= sombraSessao.frases.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    if (sombraSessao.revelado) {
      miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, frase.en));
    } else {
      miolo.push(h('p', { class: 'ia-aviso' }, 'Ouça e repita. Se o aparelho não falar, mostre a frase.'));
      miolo.push(h('button', {
        class: 'btn btn-branco',
        type: 'button',
        onclick() {
          sombraSessao.revelado = true;
          pintarSombra();
        }
      }, 'MOSTRAR A FRASE'));
    }
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'COMPARAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = () => {
      if (!campo.entrada.value.trim() || sombraSessao.feedback) return;
      const aval = pontuarSombra(frase.en, campo.entrada.value);
      sombraSessao.notas.push(aval.nota);
      sombraSessao.feedback = aval;
      if (aval.nota >= 80) sons.acerto();
      else {
        sons.erro();
        sombraSessao.erros.push({ en: frase.en, pt: frase.pt || '' });
      }
      pintarSombra();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', enviar);
    miolo.push(verificar);
    timerDeTela(ouvir, 280);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!sombraSessao.feedback) campo.entrada.focus();
}

function concluirSombra() {
  if (!sombraSessao || sombraSessao.concluido) return pintarFim(sombraSessao?.fim);
  const notas = sombraSessao.notas;
  const nota = notas.length ? Math.round(notas.reduce((s, n) => s + n, 0) / notas.length) : 0;
  const acertos = notas.filter(n => n >= 80).length;
  if (sombraSessao.origem === 'baralho') {
    sombraSessao.frases.forEach((f, i) => {
      if (FRASES.some(p => p.en === f.en)) agendarFrase(f.en, (notas[i] ?? 0) >= 80);
    });
  }
  const xp = 5 + notas.reduce((s, n) => s + Math.round(n / 10), 0);
  const evento = registrarSombra({
    xp,
    acertos,
    respostas: notas.length,
    nota,
    perfeita: acertos === notas.length && notas.length > 0,
    comboMax: 0,
    errosFala: sombraSessao.erros || []
  });
  sombraSessao.concluido = true;
  sombraSessao.fim = {
    titulo: 'Sombra concluída!',
    sub: 'Nota média da rodada',
    nota,
    xp: xp + evento.bonusMissoes,
    evento,
    painel: true
  };
  pintarFim(sombraSessao.fim);
}

function pintarFim(fim) {
  if (!fim) return telaConversa();
  resultadoAtual = fim;
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'resultado';
  history.replaceState({ tela: 'resultado', prof: profundidade }, '');
  const badges = fim.evento?.badges ?? [];
  const missoes = fim.evento?.missoes ?? [];
  app.innerHTML = '';
  app.append(h('div', { class: 'resultado' },
    h('h1', {}, fim.titulo),
    h('p', {}, fim.sub),
    h('div', { class: 'nota-grande' }, String(fim.nota)),
    h('div', { class: 'pilula' }, `⭐ +${fim.xp} XP`),
    fim.evento?.subiuNivel ? h('p', {}, `Você virou ${fim.evento.subiuNivel.titulo}!`) : '',
    missoes.length ? h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, 'Missão cumprida!'),
      ...missoes.map(m => h('div', {}, `${m.emoji} ${m.titulo}`))
    ) : '',
    badges.length ? h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, 'Conquista nova!'),
      ...badges.map(b => h('div', {}, `${b.emoji} ${b.nome}`))
    ) : '',
    fim.extra || '',
    fim.resumo ? h('button', { class: 'btn btn-branco', onclick: telaResumo }, 'RESUMO DA SEMANA') : '',
    fim.painel ? h('button', { class: 'btn btn-branco', onclick: telaPainel }, 'PAINEL DA FALA') : '',
    h('button', {
      class: 'btn btn-verde',
      onclick() {
        voltarTela(fim.destino || telaConversa);
      }
    }, 'CONTINUAR')
  ));
  focarTela();
}

function telaParceiro() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'parceiro';
  registrarRota('parceiro');
  if (!iaPronta()) {
    app.innerHTML = '';
    app.append(
      topoVoltar('🤖 Parceiro', () => voltarTela()),
      h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, 'Desligado'),
        h('p', {}, 'O parceiro só fala se você ligar e colar uma chave. Sem isso, nenhuma frase sua sai do aparelho. Diálogos e sombra continuam offline.')
      ),
      cartaoIa()
    );
    focarTela();
    return;
  }
  const mensagens = lerPapo();
  const lista = h('div', {});
  const desenhar = () => {
    lista.innerHTML = '';
    if (!mensagens.length) {
      lista.append(h('p', { class: 'ia-aviso' }, 'Manda uma frase em inglês. O Louro responde no seu nível e corrige em seguida.'));
    }
    mensagens.forEach(m => {
      lista.append(h('div', { class: 'fala ' + (m.papel === 'voce' ? 'fala-voce' : 'fala-npc') },
        h('div', { class: 'fala-en', lang: 'en' }, m.texto),
        m.correcao ? h('p', {}, m.correcao) : '',
        m.melhor ? h('p', {}, 'Melhor jeito: ', h('strong', { lang: 'en' }, m.melhor)) : ''
      ));
    });
  };
  desenhar();
  const campo = campoResposta('Escreva em inglês...');
  const enviarBtn = h('button', { class: 'btn btn-verde', disabled: true }, 'ENVIAR');
  campo.entrada.addEventListener('input', () => {
    enviarBtn.disabled = !campo.entrada.value.trim() || papoEsperando;
  });
  const enviar = async () => {
    const texto = campo.entrada.value.trim();
    if (!texto || papoEsperando) return;
    papoEsperando = true;
    enviarBtn.disabled = true;
    campo.entrada.value = '';
    mensagens.push({ papel: 'voce', texto, correcao: '', melhor: '' });
    salvarPapo(mensagens);
    campo.status.textContent = 'O Louro está pensando...';
    desenhar();
    const cfg = lerIa();
    const nv = nivelInfo();
    try {
      const resp = await pedirParceiro({
        chave: cfg.chave,
        modelo: cfg.modelo,
        nivel: nv.numero,
        titulo: nv.titulo,
        historico: mensagens.slice(0, -1),
        mensagem: texto
      });
      mensagens.push({
        papel: 'louro',
        texto: resp.fala || '...',
        correcao: resp.correcao,
        melhor: resp.melhor
      });
      salvarPapo(mensagens);
      if (resp.fala) falar(resp.fala);
      campo.status.textContent = 'Toque em Falar ou escreva a resposta.';
    } catch (e) {
      campo.status.textContent = mensagemDeErroIa(e?.status);
    }
    papoEsperando = false;
    enviarBtn.disabled = !campo.entrada.value.trim();
    desenhar();
  };
  campo.entrada.addEventListener('keydown', e => {
    if (e.key === 'Enter') enviar();
  });
  enviarBtn.addEventListener('click', () => { enviar(); });
  app.innerHTML = '';
  app.append(
    topoVoltar('🤖 Parceiro', () => voltarTela()),
    h('p', { class: 'ia-aviso' }, `Nível ${nivelInfo().numero} · ${nivelInfo().titulo}. A conversa fica só neste aparelho.`),
    lista,
    campo.status,
    ...(campo.mic ? [campo.mic] : []),
    campo.entrada,
    h('div', { class: 'fila-botoes' },
      enviarBtn,
      h('button', {
        class: 'btn btn-branco',
        onclick() {
          apagarPapo();
          telaParceiro();
        }
      }, 'LIMPAR')
    )
  );
  focarTela();
}

let resultadoAtual = null;
let categoriaAtual = null;
let pratica = null;
let falaSessao = null;

function cartaoFala() {
  const feito = estado.falaDia === diaLocalAgora();
  return h('button', { class: 'card revisao fala-atalho', onclick: abrirFala },
    h('span', { class: 'revisao-emoji' }, '⏱️'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, feito ? 'Desafio de 5 minutos feito' : 'Desafio de 5 minutos'),
      h('div', { class: 'revisao-sub' }, feito
        ? 'Feito hoje. Repetir soma mais XP.'
        : 'Um diálogo, sombra e frases para se virar. Vale a sequência e XP.')
    ),
    h('span', { class: 'revisao-seta' }, feito ? '✓' : '🗣️')
  );
}

function rotuloAgenda(en) {
  const agenda = estado.itens[en];
  if (!agenda) return 'Nova';
  if (typeof agenda.proxima === 'string' && agenda.proxima <= diaLocalAgora()) return 'Vence hoje';
  const dias = INTERVALOS[Math.max(0, Math.min(agenda.caixa ?? 0, INTERVALOS.length - 1))] ?? 1;
  return `Caixa de ${dias} dia${dias > 1 ? 's' : ''}`;
}

function telaFrases() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'frases';
  registrarRota('frases');
  const novas = FRASES.filter(f => !estado.itens[f.en]).length;
  const vencidas = frasesVencidas().length;
  app.innerHTML = '';
  app.append(
    topoVoltar('💬 Frases', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Frases curtas para não travar. Pratique uma e ela entra na caixa de 1 dia. Quando vencer, a Revisão Turbo cobra de novo. A sombra também usa este baralho.'),
    h('div', { class: 'fila-botoes' },
      novas
        ? h('button', { class: 'btn btn-verde', onclick: estudarNovas }, 'ESTUDAR NOVAS')
        : '',
      vencidas
        ? h('button', { class: 'btn btn-verde', onclick: iniciarRevisaoFrases }, `REVISAR ${vencidas}`)
        : '',
      h('button', { class: 'btn btn-branco', onclick: () => abrirSombra('baralho') }, 'SOMBREAR')
    ),
    h('div', { class: 'rotulo', role: 'heading', 'aria-level': '2' }, 'BARALHO'),
    ...CATEGORIAS.map(c => {
      const lista = frasesDaCategoria(c.id);
      const naAgenda = lista.filter(f => estado.itens[f.en]).length;
      return h('button', { class: 'card revisao', onclick: () => telaCategoria(c.id) },
        h('span', { class: 'revisao-emoji' }, c.emoji),
        h('div', { class: 'revisao-textos' },
          h('div', { class: 'revisao-titulo' }, c.titulo),
          h('div', { class: 'revisao-sub' }, naAgenda
            ? `${naAgenda} de ${lista.length} na revisão. Ex.: ${c.exemplo}`
            : c.exemplo)
        ),
        h('span', { class: 'revisao-seta' }, '›')
      );
    })
  );
  focarTela();
}

function telaCategoria(id) {
  const cat = CATEGORIAS.find(c => c.id === id);
  if (!cat) return telaFrases();
  categoriaAtual = id;
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'categoria';
  registrarRota('categoria');
  app.innerHTML = '';
  app.append(
    topoVoltar(cat.emoji + ' ' + cat.titulo, () => voltarTela(telaFrases)),
    ...frasesDaCategoria(id).map(f => h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo', lang: 'en' }, f.en),
      h('div', { class: 'fala-pt' }, f.pt),
      h('p', { class: 'ia-aviso' }, f.uso),
      h('span', { class: 'pilula' }, rotuloAgenda(f.en)),
      h('div', { class: 'fila-botoes' },
        h('button', { class: 'btn btn-branco', type: 'button', onclick: () => falar(f.en) }, 'OUVIR'),
        h('button', { class: 'btn btn-verde', type: 'button', onclick: () => abrirPratica([f], 'categoria') }, 'PRATICAR')
      )
    ))
  );
  focarTela();
}

function estudarNovas() {
  const novas = embaralhar(FRASES.filter(f => !estado.itens[f.en])).slice(0, 5);
  if (!novas.length) return telaFrases();
  abrirPratica(novas, 'frases');
}

function iniciarRevisaoFrases() {
  const itens = frasesVencidas().slice(0, 8);
  if (!itens.length) return telaFrases();
  const pool = FRASES.map(itemDaFrase);
  const fila = gerarExercicios(itens, pool, Math.min(8, Math.max(4, itens.length * 2)));
  sessao = {
    tipo: 'revisao', pool, fila, itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map(), deslizes: []
  };
  telaExercicio();
}

function abrirPratica(fila, voltar) {
  pratica = { fila, i: 0, feedback: null, concluido: false, voltar: voltar || 'frases' };
  pintarPratica();
}

function pintarPratica() {
  if (!pratica) return telaFrases();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'pratica';
  registrarRota('pratica');
  const voltar = () => voltarTela(pratica?.voltar === 'categoria' && categoriaAtual
    ? () => telaCategoria(categoriaAtual)
    : telaFrases);
  app.innerHTML = '';
  if (pratica.concluido) {
    app.append(
      topoVoltar('💬 Frases', voltar),
      h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, 'Na agenda'),
        h('p', {}, 'A frase entra na revisão. Acertar sobe a caixa. Errar traz ela de volta amanhã. A Revisão Turbo e a sombra passam a incluir essas frases.')
      ),
      h('button', { class: 'btn btn-verde', onclick: voltar }, 'VOLTAR AO BARALHO')
    );
    focarTela();
    return;
  }
  const frase = pratica.fila[pratica.i];
  const miolo = [
    topoVoltar('💬 ' + (frase.cat ? (CATEGORIAS.find(c => c.id === frase.cat)?.titulo || 'Frase') : 'Frase'), voltar),
    h('div', { class: 'revisao-sub' }, `Frase ${pratica.i + 1} de ${pratica.fila.length}`)
  ];
  if (pratica.feedback) {
    const aval = pratica.feedback;
    miolo.push(h('div', { class: 'nota-grande' }, String(aval.nota)));
    if (aval.partes?.length) {
      miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, aval.partes.map(p =>
        h('span', { class: p.ok ? 'sombra-ok' : 'sombra-falta' }, p.t + ' ')
      )));
    }
    if (!aval.ok) miolo.push(h('p', {}, 'Melhor jeito: ', h('strong', { lang: 'en' }, aval.melhor)));
    miolo.push(h('p', { class: 'ia-aviso' }, frase.uso));
    const agenda = estado.itens[frase.en];
    const dias = INTERVALOS[Math.max(0, Math.min(agenda?.caixa ?? 0, INTERVALOS.length - 1))] ?? 1;
    miolo.push(h('p', {}, `Caixa de ${dias} dia${dias > 1 ? 's' : ''}.`));
    miolo.push(h('button', { class: 'btn btn-branco', type: 'button', onclick: () => falar(frase.en) }, 'OUVIR'));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (pratica.i + 1 >= pratica.fila.length) {
          pratica.concluido = true;
          pintarPratica();
        } else {
          pratica.i++;
          pratica.feedback = null;
          pintarPratica();
        }
      }
    }, pratica.i + 1 >= pratica.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(h('p', { class: 'ia-aviso' }, 'Como se diz, em inglês:'));
    miolo.push(h('p', { class: 'sombra-frase' }, frase.pt));
    const campo = campoResposta('Escreva em inglês...');
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = () => {
      if (!campo.entrada.value.trim() || pratica.feedback) return;
      const aval = avaliarFrase(frase, campo.entrada.value);
      agendarFrase(frase.en, aval.ok);
      pratica.feedback = aval;
      if (aval.ok) sons.acerto();
      else sons.erro();
      pintarPratica();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', enviar);
    miolo.push(verificar);
    app.append(h('div', {}, miolo));
    focarTela();
    campo.entrada.focus();
    return;
  }
  app.append(h('div', {}, miolo));
  focarTela();
}

function abrirFala() {
  const plano = montarDesafioFala(diaLocalAgora());
  falaSessao = {
    passos: plano.passos,
    duracaoMs: plano.duracaoMs,
    inicio: Date.now(),
    i: 0,
    respostas: [],
    erros: [],
    feedback: null,
    revelado: false,
    concluido: false,
    fim: null
  };
  pintarFala();
}

function ligarRelogio(el) {
  const tick = () => {
    if (!falaSessao || falaSessao.concluido) return;
    const resta = falaSessao.duracaoMs - (Date.now() - falaSessao.inicio);
    const segundos = Math.max(0, Math.ceil(resta / 1000));
    el.textContent = `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`;
    if (resta <= 0) finalizarFala(true);
  };
  tick();
  intervaloFala = setInterval(tick, 250);
}

function seguirFala() {
  if (!falaSessao || falaSessao.concluido) return;
  if (falaSessao.i + 1 >= falaSessao.passos.length) finalizarFala(false);
  else {
    falaSessao.i++;
    falaSessao.feedback = null;
    falaSessao.revelado = false;
    pintarFala();
  }
}

function anotarFala(ok, nota, aval) {
  if (!falaSessao || falaSessao.feedback || falaSessao.concluido) return;
  const passo = falaSessao.passos[falaSessao.i];
  falaSessao.respostas.push({ tipo: passo.tipo, ok, nota, en: passo.en || '' });
  if (!ok) {
    const en = aval?.melhor || passo.en || '';
    const pt = passo.voce?.pt || passo.pt || '';
    if (en) falaSessao.erros.push({ en, pt });
  }
  falaSessao.feedback = aval;
  if (ok) sons.acerto();
  else sons.erro();
  pintarFala();
}

function finalizarFala(estourou) {
  if (!falaSessao || falaSessao.concluido) return;
  falaSessao.concluido = true;
  const respostas = falaSessao.respostas;
  const conta = falaConta(respostas, falaSessao.passos.length, estourou);
  const acertos = respostas.filter(r => r.ok).length;
  const nota = respostas.length ? Math.round(acertos / respostas.length * 100) : 0;
  let evento = null;
  let xp = 0;
  if (conta) {
    xp = xpDaFala(respostas, true);
    evento = registrarFala({
      completo: true,
      xp,
      acertos,
      respostas: respostas.length,
      nota,
      perfeita: false,
      comboMax: 0,
      errosFala: falaSessao.erros || [],
      agendamentos: respostas
        .filter(r => r.en && (r.tipo === 'frase' || r.tipo === 'sombra') && FRASES.some(f => f.en === r.en))
        .map(r => ({ en: r.en, acertou: !!r.ok }))
    });
    xp += evento?.bonusMissoes ?? 0;
  }
  falaSessao.fim = {
    titulo: conta ? 'Desafio concluído!' : 'Tempo esgotado',
    sub: conta
      ? 'Diálogo, sombra e frases no mesmo treino.'
      : 'O mix ficou incompleto, então a sequência de hoje não mudou.',
    nota,
    xp,
    evento,
    destino: telaInicial,
    painel: true
  };
  pintarFim(falaSessao.fim);
}

function pintarFala() {
  if (!falaSessao || falaSessao.concluido) return falaSessao?.fim ? pintarFim(falaSessao.fim) : telaInicial();
  calar();
  limparTela();
  app.innerHTML = '';
  window.scrollTo(0, 0);
  telaAtiva = 'fala';
  registrarRota('fala');
  const passo = falaSessao.passos[falaSessao.i];
  const rotulo = passo.tipo === 'dialogo' ? 'Diálogo' : passo.tipo === 'sombra' ? 'Sombra' : 'Frase';
  const timer = h('span', { class: 'pilula fala-timer', role: 'timer', 'aria-label': 'Tempo restante' }, '5:00');
  const miolo = [
    topoVoltar('⏱️ 5 minutos', () => voltarTela(telaInicial)),
    h('div', { class: 'fila-botoes' },
      h('span', { class: 'revisao-sub' }, `${rotulo} · passo ${falaSessao.i + 1} de ${falaSessao.passos.length}`),
      timer
    )
  ];
  if (passo.tipo === 'dialogo') {
    miolo.push(h('div', { class: 'revisao-sub' }, `${passo.emoji} ${passo.titulo} · ${passo.onde}`));
    miolo.push(h('div', { class: 'fala fala-npc' },
      h('div', { class: 'fala-en', lang: 'en' }, passo.npc.en),
      h('div', { class: 'fala-pt' }, passo.npc.pt)
    ));
    miolo.push(h('button', { class: 'btn btn-branco', type: 'button', onclick: () => falar(passo.npc.en) }, 'OUVIR DE NOVO'));
  }
  if (falaSessao.feedback) {
    if (passo.tipo === 'dialogo') miolo.push(cartaoTutor(falaSessao.feedback));
    else {
      const aval = falaSessao.feedback;
      miolo.push(h('div', { class: 'nota-grande' }, String(aval.nota)));
      if (aval.partes?.length) {
        miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, aval.partes.map(p =>
          h('span', { class: p.ok ? 'sombra-ok' : 'sombra-falta' }, p.t + ' ')
        )));
      }
      if (aval.sobras?.length) miolo.push(h('p', { class: 'ia-aviso' }, 'Sobrou: ' + aval.sobras.join(', ')));
      if (passo.pt) miolo.push(h('p', { class: 'fala-pt' }, passo.pt));
      if (passo.tipo === 'frase' && !aval.ok) {
        miolo.push(h('p', {}, 'Melhor jeito: ', h('strong', { lang: 'en' }, aval.melhor || passo.en)));
      }
    }
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick: seguirFala
    }, falaSessao.i + 1 >= falaSessao.passos.length ? 'CONCLUIR' : 'CONTINUAR'));
    app.append(h('div', {}, miolo));
    ligarRelogio(timer);
    focarTela();
    return;
  }
  if (passo.tipo === 'sombra') {
    miolo.push(h('button', { class: 'btn btn-branco', type: 'button', onclick: () => falar(passo.en) }, 'OUVIR'));
    if (falaSessao.revelado) miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, passo.en));
    else {
      miolo.push(h('p', { class: 'ia-aviso' }, 'Ouça e repita. Se o aparelho não falar, mostre a frase.'));
      miolo.push(h('button', {
        class: 'btn btn-branco',
        type: 'button',
        onclick() {
          falaSessao.revelado = true;
          pintarFala();
        }
      }, 'MOSTRAR A FRASE'));
    }
    timerDeTela(() => falar(passo.en), 280);
  } else if (passo.tipo === 'frase') {
    miolo.push(h('p', { class: 'ia-aviso' }, 'Como se diz, em inglês:'));
    miolo.push(h('p', { class: 'sombra-frase' }, passo.pt));
    if (passo.uso) miolo.push(h('p', { class: 'fala-pt' }, passo.uso));
  } else {
    miolo.push(h('p', { class: 'ia-aviso' }, passo.voce.pt));
    timerDeTela(() => falar(passo.npc.en), 280);
  }
  const campo = campoResposta(passo.tipo === 'sombra' ? 'Repita em inglês...' : 'Escreva em inglês...');
  miolo.push(campo.status, campo.mic, campo.entrada);
  const verificar = h('button', { class: 'btn btn-verde', disabled: true }, passo.tipo === 'sombra' ? 'COMPARAR' : 'VERIFICAR');
  campo.entrada.addEventListener('input', () => {
    verificar.disabled = !campo.entrada.value.trim();
  });
  const enviar = () => {
    const texto = campo.entrada.value.trim();
    if (!texto || falaSessao.feedback) return;
    if (passo.tipo === 'dialogo') {
      const aval = avaliarResposta(passo.voce, texto);
      anotarFala(aval.ok, aval.nota, aval);
    } else if (passo.tipo === 'sombra') {
      const aval = pontuarSombra(passo.en, texto);
      anotarFala(aval.nota >= 80, aval.nota, aval);
    } else {
      const aval = avaliarFrase(passo, texto);
      anotarFala(aval.ok, aval.nota, aval);
    }
  };
  campo.entrada.addEventListener('keydown', e => {
    if (e.key === 'Enter') enviar();
  });
  verificar.addEventListener('click', enviar);
  miolo.push(verificar);
  app.append(h('div', {}, miolo));
  ligarRelogio(timer);
  focarTela();
  campo.entrada.focus();
}

let papoEsperando = false;
let pronunciaSessao = null;
let ouvidoSessao = null;

const LETRAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const NOMES_SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

function diaDaSemana(iso) {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return new Date(ano, mes - 1, dia).getDay();
}

function telaPronuncia() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'pronuncia';
  registrarRota('pronuncia');
  pronunciaSessao = null;
  app.innerHTML = '';
  app.append(
    topoVoltar('👅 Pronúncia', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, temTts
      ? 'A voz é a do aparelho. Ouça e toque no que você ouviu. Devagar repete mais lento.'
      : 'Este aparelho não tem voz. A frase aparece escrita para você comparar.'),
    ...SONS.map(s => h('button', { class: 'card revisao', onclick: () => abrirPronuncia(s.id) },
      h('span', { class: 'revisao-emoji' }, s.emoji),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, s.titulo),
        h('div', { class: 'revisao-sub' }, s.dica)
      ),
      h('span', { class: 'revisao-seta' }, '›')
    )),
    h('button', { class: 'btn btn-branco', onclick: telaPainel }, 'VER O PAINEL DA FALA')
  );
  focarTela();
}

function abrirPronuncia(id) {
  const som = somPorId(id);
  if (!som) return telaPronuncia();
  const fila = embaralhar(som.pares).map(par => montarItem(par, Math.random() < 0.5 ? 'b' : 'a'));
  pronunciaSessao = {
    som,
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarPronuncia();
}

function pintarPronuncia() {
  if (!pronunciaSessao) return telaPronuncia();
  if (pronunciaSessao.concluido) return pintarFim(pronunciaSessao.fim);
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'pronuncia';
  registrarRota('pronuncia');
  const item = pronunciaSessao.fila[pronunciaSessao.i];
  const ouvir = taxa => falar(item.fala, taxa);
  app.innerHTML = '';
  const miolo = [
    topoVoltar(pronunciaSessao.som.emoji + ' ' + pronunciaSessao.som.titulo, () => telaPronuncia()),
    h('div', { class: 'revisao-sub' }, `Par ${pronunciaSessao.i + 1} de ${pronunciaSessao.fila.length}`),
    h('p', { class: 'ia-aviso' }, pronunciaSessao.som.dica)
  ];
  if (!temTts) {
    miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, item.fala));
    miolo.push(h('p', { class: 'ia-aviso' }, 'Sem voz neste aparelho. Leia e escolha.'));
  } else {
    miolo.push(h('div', { class: 'fila-botoes' },
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_NORMAL) }, 'OUVIR'),
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_DEVAGAR) }, 'DEVAGAR')
    ));
  }
  if (pronunciaSessao.feedback) {
    miolo.push(h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, pronunciaSessao.feedback.ok ? 'Isso.' : 'Era o outro.'),
      h('p', {}, item.dica),
      h('p', { lang: 'en' }, 'Você ouviu: ', h('strong', {}, item.fala))
    ));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (pronunciaSessao.i + 1 >= pronunciaSessao.fila.length) concluirPronuncia();
        else {
          pronunciaSessao.i++;
          pronunciaSessao.feedback = null;
          pintarPronuncia();
        }
      }
    }, pronunciaSessao.i + 1 >= pronunciaSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMO'));
  } else {
    const escolher = lado => {
      if (pronunciaSessao.feedback) return;
      const ok = lado === item.certo;
      pronunciaSessao.notas.push(ok ? 100 : 0);
      if (ok) {
        pronunciaSessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        const rotulo = item.certo === 'b' ? item.rotuloB : item.rotuloA;
        pronunciaSessao.erros.push({ en: item.fala, pt: rotulo });
      }
      pronunciaSessao.feedback = { ok };
      pintarPronuncia();
    };
    miolo.push(h('p', { class: 'ia-aviso' }, 'Qual você ouviu?'));
    miolo.push(h('div', { class: 'opcoes' },
      h('button', { class: 'opcao', type: 'button', lang: 'en', onclick: () => escolher('a') }, item.rotuloA),
      h('button', { class: 'opcao', type: 'button', lang: 'en', onclick: () => escolher('b') }, item.rotuloB)
    ));
    if (temTts) timerDeTela(() => ouvir(TAXA_NORMAL), 280);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
}

function concluirPronuncia() {
  if (!pronunciaSessao || pronunciaSessao.concluido) return pintarFim(pronunciaSessao?.fim);
  const total = pronunciaSessao.fila.length;
  const nota = total ? Math.round(pronunciaSessao.notas.reduce((s, n) => s + n, 0) / total) : 0;
  const xp = 8 + pronunciaSessao.acertos * 6;
  const evento = registrarPronuncia({
    xp,
    acertos: pronunciaSessao.acertos,
    respostas: total,
    nota,
    errosFala: pronunciaSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  pronunciaSessao.concluido = true;
  pronunciaSessao.fim = {
    titulo: 'Pronúncia concluída!',
    sub: pronunciaSessao.som.titulo,
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaPronuncia,
    painel: true
  };
  pintarFim(pronunciaSessao.fim);
}

function telaOuvido() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'ouvido';
  registrarRota('ouvido');
  ouvidoSessao = null;
  app.innerHTML = '';
  app.append(
    topoVoltar('👂 Ouvir', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, temTts
      ? 'A voz é a do aparelho, na velocidade natural. Devagar deixa mais lento. Sem arquivo de áudio.'
      : 'Sem voz neste aparelho. O texto em inglês aparece para você ler e responder.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirOuvido() }, 'TREINAR 4 CENAS'),
    h('div', { class: 'rotulo', role: 'heading', 'aria-level': '2' }, 'CENAS'),
    ...CLIPS.map(c => h('button', { class: 'card revisao', onclick: () => abrirOuvido([c.id]) },
      h('span', { class: 'revisao-emoji' }, c.emoji),
      h('div', { class: 'revisao-textos' },
        h('div', { class: 'revisao-titulo' }, c.titulo),
        h('div', { class: 'revisao-sub' }, c.pergunta)
      ),
      h('span', { class: 'revisao-seta' }, '›')
    ))
  );
  focarTela();
}

function abrirOuvido(ids) {
  const escolhidos = (ids ?? []).map(clipPorId).filter(Boolean);
  const resto = embaralhar(CLIPS.filter(c => !escolhidos.includes(c)));
  const fila = [...escolhidos, ...resto].slice(0, 4);
  if (!fila.length) return telaOuvido();
  ouvidoSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    ouviu: !temTts,
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarOuvido();
}

function pintarOuvido() {
  if (!ouvidoSessao) return telaOuvido();
  if (ouvidoSessao.concluido) return pintarFim(ouvidoSessao.fim);
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'ouvido';
  registrarRota('ouvido');
  const clip = ouvidoSessao.fila[ouvidoSessao.i];
  const ouvir = taxa => falarSequencia(clip.linhas, taxa);
  app.innerHTML = '';
  const miolo = [
    topoVoltar(clip.emoji + ' ' + clip.titulo, () => telaOuvido()),
    h('div', { class: 'revisao-sub' }, `Cena ${ouvidoSessao.i + 1} de ${ouvidoSessao.fila.length}`)
  ];
  const controles = temTts
    ? h('div', { class: 'fila-botoes' },
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_NORMAL) }, 'NORMAL'),
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_DEVAGAR) }, 'DEVAGAR')
    )
    : '';
  if (!ouvidoSessao.ouviu && !ouvidoSessao.feedback) {
    miolo.push(h('p', { class: 'ia-aviso' }, 'A voz é a do aparelho. Normal é a velocidade natural. Devagar fica mais lento. A pergunta só aparece depois.'));
    miolo.push(controles);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        ouvidoSessao.ouviu = true;
        pintarOuvido();
      }
    }, 'JÁ OUVI'));
    timerDeTela(() => ouvir(TAXA_NORMAL), 280);
  } else if (!ouvidoSessao.feedback) {
    if (!temTts) {
      miolo.push(h('div', { class: 'fala fala-npc' },
        clip.linhas.map(linha => h('div', { class: 'fala-en', lang: 'en' }, linha))
      ));
      miolo.push(h('p', { class: 'ia-aviso' }, 'Sem voz neste aparelho. Leia e responda.'));
    } else {
      miolo.push(controles);
    }
    miolo.push(h('p', { class: 'sombra-frase' }, clip.pergunta));
    miolo.push(h('div', { class: 'opcoes' }, clip.opcoes.map((texto, indice) => h('button', {
      class: 'opcao',
      type: 'button',
      onclick() {
        if (ouvidoSessao.feedback) return;
        const ok = corrigirClip(clip, indice);
        ouvidoSessao.notas.push(ok ? 100 : 0);
        if (ok) {
          ouvidoSessao.acertos++;
          sons.acerto();
        } else {
          sons.erro();
          ouvidoSessao.erros.push({ en: clip.linhas.join(' '), pt: clip.opcoes[clip.certa] });
        }
        ouvidoSessao.feedback = { ok };
        pintarOuvido();
      }
    }, texto))));
  } else {
    miolo.push(h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, ouvidoSessao.feedback.ok ? 'Isso.' : 'Quase. Olha o que foi dito.'),
      h('p', {}, clip.pt),
      ...clip.linhas.map(linha => h('p', { lang: 'en' }, linha))
    ));
    if (temTts) miolo.push(controles);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (ouvidoSessao.i + 1 >= ouvidoSessao.fila.length) concluirOuvido();
        else {
          ouvidoSessao.i++;
          ouvidoSessao.ouviu = !temTts;
          ouvidoSessao.feedback = null;
          pintarOuvido();
        }
      }
    }, ouvidoSessao.i + 1 >= ouvidoSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
}

function concluirOuvido() {
  if (!ouvidoSessao || ouvidoSessao.concluido) return pintarFim(ouvidoSessao?.fim);
  const total = ouvidoSessao.fila.length;
  const nota = total ? Math.round(ouvidoSessao.notas.reduce((s, n) => s + n, 0) / total) : 0;
  const xp = 8 + ouvidoSessao.acertos * 6;
  const evento = registrarOuvido({
    xp,
    acertos: ouvidoSessao.acertos,
    respostas: total,
    nota,
    errosFala: ouvidoSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  ouvidoSessao.concluido = true;
  ouvidoSessao.fim = {
    titulo: 'Escuta concluída!',
    sub: 'O que você entendeu das cenas',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaOuvido,
    painel: true
  };
  pintarFim(ouvidoSessao.fim);
}

function cartaoSemana() {
  const hojeIso = diaLocalAgora();
  const soma = somarSemana(estado.painel, hojeIso);
  const frase = textoMinutos(soma.segundos);
  const aviso = lembreteMinutos(soma.minutos, estado.metaMinutos, hojeIso);
  const teto = Number(estado.metaMinutos) || 0;
  const pct = teto ? Math.min(100, Math.round((soma.minutos / teto) * 100)) : 0;
  const card = h('div', { class: 'card', id: 'semana-falada', role: 'region', 'aria-label': `${frase} ${aviso}` },
    h('div', { class: 'nivel-titulo' }, 'Semana falada'),
    h('p', {}, frase),
    h('p', { class: 'revisao-sub' }, 'Cada resposta soma cerca de 12 segundos. Os grupos são os treinos da fluência.'),
    h('ul', { class: 'semana-grupos', 'aria-label': 'Treinos por grupo' },
      ...GRUPOS_HUB.map(c => h('li', {}, textoGrupo(soma.grupos[c.id] || 0, c.titulo)))
    ),
    h('p', { id: 'semana-lembrete' }, aviso),
    h('p', { class: 'ia-aviso' }, 'O lembrete fica nesta tela. O app não pede aviso do celular.'),
    h('div', {
      class: 'progresso',
      role: 'meter',
      'aria-valuemin': '0',
      'aria-valuemax': String(teto),
      'aria-valuenow': String(Math.min(soma.minutos, teto)),
      'aria-label': aviso,
      'aria-valuetext': aviso
    }, h('div', { style: `width:${pct}%` })),
    h('div', { class: 'metas', role: 'group', 'aria-label': 'Escolher meta semanal de minutos' },
      METAS_MINUTOS.map(m => h('button', {
        class: 'meta-opcao' + (m === estado.metaMinutos ? ' ativa' : ''),
        type: 'button',
        'aria-pressed': m === estado.metaMinutos ? 'true' : 'false',
        'aria-label': `${m} minutos`,
        onclick() {
          definirMetaMinutos(m);
          card.replaceWith(cartaoSemana());
          const barras = document.querySelector('.semana-fala');
          if (!barras) return;
          const agora = somarSemana(estado.painel, diaLocalAgora());
          const fraseNova = textoMinutos(agora.segundos);
          const avisoNovo = lembreteMinutos(agora.minutos, estado.metaMinutos, diaLocalAgora());
          barras.setAttribute('aria-label', `Nota média dos últimos 7 dias. ${fraseNova} ${avisoNovo}`);
        }
      }, String(m)))
    )
  );
  return card;
}

function telaPainel() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'painel';
  registrarRota('painel');
  const serie = serieFala(estado.painel, diaLocalAgora());
  const resumo = resumoFala(serie);
  const historia = historicoFala(estado.painel, diaLocalAgora(), 14);
  const erros = errosMaisComuns(5);
  const fraseSemana = textoMinutos(somarSemana(estado.painel, diaLocalAgora()).segundos);
  const avisoSemana = lembreteMinutos(somarSemana(estado.painel, diaLocalAgora()).minutos, estado.metaMinutos, diaLocalAgora());
  app.innerHTML = '';
  const diasTexto = serie.map(d => {
    const indice = diaDaSemana(d.data);
    return d.media == null ? `${NOMES_SEMANA[indice]}: sem treino` : `${NOMES_SEMANA[indice]}: nota ${d.media}`;
  }).join('. ');
  const barras = h('div', { class: 'semana-fala', role: 'img', 'aria-label': `Notas dos últimos 7 dias. ${diasTexto}. ${fraseSemana} ${avisoSemana}` },
    serie.map(d => {
      const indice = diaDaSemana(d.data);
      const altura = d.media == null ? 6 : Math.max(8, Math.round(d.media * 0.88));
      return h('div', { class: 'semana-fala-col' },
        h('div', {
          class: 'col' + (d.media == null ? ' col-vazia' : ''),
          style: `height:${altura}px`,
          title: d.media == null ? `${NOMES_SEMANA[indice]}: sem treino` : `${NOMES_SEMANA[indice]}: ${d.media}`
        }),
        h('div', { class: 'semana-fala-dia' }, LETRAS_SEMANA[indice])
      );
    })
  );
  app.append(
    topoVoltar('📊 Painel da fala', () => voltarTela(telaConversa)),
    resumo.treinos
      ? h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, resumo.media == null ? 'Sem nota ainda' : `Média da semana: ${resumo.media}`),
        h('p', {}, resumo.precisao == null
          ? `${resumo.treinos} treino${resumo.treinos > 1 ? 's' : ''} em ${resumo.dias} dia${resumo.dias > 1 ? 's' : ''}.`
          : `Precisão ${resumo.precisao}% · ${resumo.acertos} de ${resumo.respostas} respostas certas.`),
        barras
      )
      : h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, 'Ainda sem treino'),
        h('p', {}, 'Termine um diálogo, uma sombra ou o desafio para ver o painel.'),
        barras
      ),
    cartaoSemana(),
    erros.length
      ? h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, 'Erros que mais voltam'),
        ...erros.map(e => h('div', { class: 'painel-erro' },
          h('div', { class: 'fala-en', lang: 'en' }, e.en),
          e.pt ? h('div', { class: 'fala-pt' }, e.pt) : '',
          h('span', { class: 'pilula' }, `${e.n} vez${e.n > 1 ? 'es' : ''}`)
        ))
      )
      : h('p', { class: 'ia-aviso' }, 'Quando uma frase escapar, ela aparece aqui.'),
    cartaoHistorico(historia),
    h('button', { class: 'btn btn-verde', onclick: telaDeslizes }, deslizesVencidos().length ? `REVISAR ${deslizesVencidos().length}` : 'DESLIZES DE FALA'),
    h('button', { class: 'btn btn-branco', onclick: telaResumo }, 'RESUMO DA SEMANA')
  );
  focarTela();
}


let nivelSessao = null;
let perguntaSessao = null;
let reducaoSessao = null;
let frasalSessao = null;
let livreSessao = null;
let tecnicoSessao = null;
let idiomaSessao = null;
let diaSessao = null;
let deslizeSessao = null;
let remotoSessao = null;
let contoSessao = null;
let numeroSessao = null;
let opiniaoSessao = null;
let descreverSessao = null;
let rapidoSessao = null;
let relatoSessao = null;
let cortesiaSessao = null;
let aquecerSessao = null;
let claroSessao = null;
let demoSessao = null;
let prazoSessao = null;
let starSessao = null;
let enfaseSessao = null;
let decisaoSessao = null;
let parSessao = null;
let plantaoSessao = null;
let retroSessao = null;
let chegadaSessao = null;
let ligacaoSessao = null;
let estimativaSessao = null;
let consensoSessao = null;
let atendimentoSessao = null;
let gestorSessao = null;
let finalSessao = null;
let viagemSessao = null;
let misturaSessao = null;
let linhaSessao = null;
let slackSessao = null;
let socialSessao = null;
let termoSessao = null;
let salarioSessao = null;
let projetoSessao = null;
let sotaqueSessao = null;
let desafioSessao = null;
let requisitoSessao = null;
let metricaSessao = null;
let aprendizadoSessao = null;
let passeioSessao = null;
let passeioGeracao = 0;
let falhaSessao = null;
let mentoriaSessao = null;
let socorroSessao = null;
let palestraSessao = null;
let duvidaSessao = null;
let sinalSessao = null;
let sistemaSessao = null;
let codigoSessao = null;
let colegaSessao = null;
let simuladoSessao = null;
let modeloSessao = null;
let furoSessao = null;
let rotinaSessao = null;
let papoSessao = null;
let futuroSessao = null;
let culturaSessao = null;
let aumentoSessao = null;
let rotaSessao = null;
let vivoSessao = null;
let produtoSessao = null;
let fechoSessao = null;
let espacoSessao = null;
let mapaSessao = null;
let duroSessao = null;
let propostaSessao = null;
let narraSessao = null;
let bancoSessao = null;
let recusaSessao = null;
let sprintSessao = null;
let seguroSessao = null;
let meetupSessao = null;
let completaSessao = null;
let rodadaSessao = null;
let migraSessao = null;
let estreiaSessao = null;
let focoSessao = null;
let focoEscolhido = 'frontend';
let pokerSessao = null;
let leigoSessao = null;
let recrutaSessao = null;
let culpaSessao = null;
let raioSessao = null;
let ofertaSessao = null;
let pedidoSessao = null;
let coberturaSessao = null;
let loomSessao = null;
let cadernoPalavra = '';
let cadernoFeedback = null;
let graficoSessao = null;
let handoffSessao = null;
let elevadorSessao = null;
let juntaSessao = null;
let pistaSessao = null;
let calmaSessao = null;
let folgaSessao = null;
let abertaSessao = null;
let respeitoSessao = null;
let debitoSessao = null;
let indicacaoSessao = null;
let uxSessao = null;
let forumSessao = null;
let vistoSessao = null;
let facilSessao = null;
let stackSessao = null;
let sabadoSessao = null;
let brechaSessao = null;
let mudaSessao = null;
let gauchoSessao = null;
let radarSessao = null;
let aplausoSessao = null;
let gripeSessao = null;
let pmSessao = null;
let laudoSessao = null;
let rumoSessao = null;
let acessoSessao = null;
let licencaSessao = null;
let jargaoSessao = null;
let bandeiraSessao = null;
let geloSessao = null;
let limiteSessao = null;
let canarioSessao = null;
let despedidaSessao = null;
let repeticaoSessao = null;
let cargaSessao = null;
let boletimSessao = null;
let donoSessao = null;
let manualSessao = null;
let verdeSessao = null;
let certificadoSessao = null;
let rebaseSessao = null;
let consultaSessao = null;
let replicaSessao = null;
let ensaioSessao = null;
let discoSessao = null;
let paginaSessao = null;
let squashSessao = null;
let circuitoSessao = null;
let jobSessao = null;
let colheitaSessao = null;
let sessaoFala = null;
let tanqueSessao = null;
let sondaSessao = null;
let sementeSessao = null;
let registroSessao = null;
let rastroSessao = null;
let paradaSessao = null;
let podSessao = null;
let lintSessao = null;
let origemSessao = null;
let linkSessao = null;
let cpuSessao = null;
let copiaSessao = null;
let estouroSessao = null;
let impasseSessao = null;
let dominioSessao = null;
let mortaSessao = null;
let ponteiroSessao = null;
let eleicaoSessao = null;
let freioSessao = null;
let pausaSessao = null;
let derivaSessao = null;
let descritorSessao = null;
let reservaSessao = null;
let varreduraSessao = null;
let portaSessao = null;
let inodoSessao = null;
let saidaSessao = null;
let manadaSessao = null;
let gotejoSessao = null;
let frioSessao = null;
let cadeadoSessao = null;
let filtroHub = { categoria: 'todos', busca: '', estrela: false };
let revisaoPrazo = 0;
let gravacaoUrl = null;
let gravadorAtivo = null;
let vozTimer = null;
let vozGeracao = 0;

function cartaoNivel() {
  if (estado.nivelFala) return '';
  return h('button', { class: 'card revisao nivel-atalho', onclick: telaNivel },
    h('span', { class: 'revisao-emoji' }, '🎯'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Teste de nível'),
      h('div', { class: 'revisao-sub' }, 'Oito perguntas. O app passa a sugerir o seu ponto, de A1 a B2.')
    ),
    h('span', { class: 'revisao-seta' }, '›')
  );
}

function botaoFluencia(emoji, titulo, sub, onclick) {
  return h('button', { class: 'card revisao', type: 'button', onclick },
    h('span', { class: 'revisao-emoji' }, emoji),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, titulo),
      h('div', { class: 'revisao-sub' }, sub)
    ),
    h('span', { class: 'revisao-seta' }, '›')
  );
}

function textoContagem(n, categoria) {
  if (!n) return 'Nenhum treino com esse filtro.';
  const nome = n === 1 ? '1 treino' : `${n} treinos`;
  if (!categoria || categoria === 'todos') return nome;
  const titulo = GRUPOS_HUB.find(c => c.id === categoria)?.titulo;
  return titulo ? `${nome} em ${titulo}` : nome;
}

function moverCategoriaHub(atual, tecla) {
  if (tecla !== 'ArrowRight' && tecla !== 'ArrowLeft') return;
  const ordem = ['todos', ...GRUPOS_HUB.map(c => c.id)];
  const i = Math.max(0, ordem.indexOf(atual));
  const passo = tecla === 'ArrowRight' ? 1 : -1;
  const prox = ordem[(i + passo + ordem.length) % ordem.length];
  filtroHub = { ...filtroHub, categoria: prox };
  pintarListaHub();
  const alvo = document.querySelector(`[data-categoria-hub="${prox}"]`);
  if (alvo) alvo.focus();
}

function telasDoHub() {
  return {
    modelo: telaModelos,
    furo: telaFuros,
    colega: telaColegas,
    palestra: telaPalestras,
    duvida: telaDuvidas,
    sinal: telaSinais,
    falha: telaFalhas,
    mentoria: telaMentorias,
    requisito: telaRequisitos,
    metrica: telaMetricas,
    aprendizado: telaAprendizados,
    linha: telaLinhas,
    slack: telaSlacks,
    gestor: telaGestores,
    estimativa: telaEstimativas,
    consenso: telaConsensos,
    retro: telaRetros,
    chegada: telaChegadas,
    ligacao: telaLigacoes,
    decisao: telaDecisoes,
    par: telaPares,
    plantao: telaPlantoes,
    demo: telaDemos,
    prazo: telaPrazos,
    relato: telaRelatos,
    cortesia: telaCortesias,
    aquecer: telaAquecer,
    claro: telaClaros,
    opiniao: telaOpinioes,
    tecnico: telaTecnicos,
    idioma: telaIdiomas,
    frasal: telaFrasais,
    sistema: telaSistemas,
    codigo: telaCodigos,
    simulado: telaSimulado,
    salario: telaSalarios,
    projeto: telaProjetos,
    final: telaFinais,
    star: telaStars,
    remoto: telaRemoto,
    conto: telaContos,
    livre: telaLivres,
    futuro: telaFuturos,
    rotina: telaRotinas,
    papo: telaPapo,
    socorro: telaSocorros,
    passeio: telaPasseio,
    social: telaSociais,
    viagem: telaViagens,
    atendimento: telaAtendimentos,
    cena: telaDescricoes,
    pergunta: telaPerguntas,
    sotaque: telaSotaques,
    enfase: telaEnfases,
    termo: telaTermos,
    reducao: telaReducoes,
    numero: telaNumeros,
    desafio: telaDesafio,
    mistura: telaMisturas,
    deslize: telaDeslizes,
    dia: telaPerguntaDia,
    nivel: telaNivel,
    resumo: telaResumo,
    rapido: telaRapidos,
    cultura: telaCulturas,
    aumento: telaAumentos,
    rota: telaRotas,
    vivo: telaVivos,
    produto: telaProdutos,
    fecho: telaFechos,
    espaco: telaEspacos,
    mapa: telaMapas,
    duro: telaDuros,
    proposta: telaPropostas,
    semana: telaPainel,
    narrar: telaNarras,
    banco: telaBancos,
    recusa: telaRecusas,
    sprint: telaSprints,
    seguro: telaSeguros,
    meetup: telaMeetups,
    completa: telaCompleta,
    rodada: telaRodadas,
    migra: telaMigras,
    estreia: telaEstreias,
    foco: telaFoco,
    poker: telaPokers,
    leigo: telaLeigos,
    recruta: telaRecrutas,
    culpa: telaCulpas,
    raio: telaRaios,
    oferta: telaOfertas,
    sombra: telaSombra,
    pedido: telaPedidos,
    cobertura: telaCoberturas,
    loom: telaLooms,
    caderno: telaCaderno,
    grafico: telaGraficos,
    handoff: telaHandoffs,
    elevador: telaElevadores,
    junta: telaJunta,
    pista: telaPistas,
    calma: telaCalmas,
    folga: telaFolgas,
    abertas: telaAbertas,
    respeito: telaRespeitos,
    debito: telaDebitos,
    indicacao: telaIndicacoes,
    ux: telaUx,
    forum: telaForum,
    visto: telaVisto,
    mes: telaMes,
    facil: telaFacils,
    stack: telaStacks,
    sabado: telaSabados,
    surpresa: telaSurpresa,
    brecha: telaBrechas,
    muda: telaMudas,
    gaucho: telaGauchos,
    radar: telaRadares,
    aplauso: telaAplausos,
    gripe: telaGripes,
    pm: telaPms,
    laudo: telaLaudos,
    rumo: telaRumos,
    acesso: telaAcessos,
    licenca: telaLicencas,
    jargao: telaJargoes,
    bandeira: telaBandeiras,
    gelo: telaGelos,
    limite: telaLimites,
    canario: telaCanarios,
    despedida: telaDespedidas,
    repeticao: telaRepeticoes,
    carga: telaCargas,
    boletim: telaBoletins,
    dono: telaDonos,
    manual: telaManuais,
    verde: telaVerdes,
    certificado: telaCertificados,
    rebase: telaRebases,
    consulta: telaConsultas,
    replica: telaReplicas,
    ensaio: telaEnsaios,
    disco: telaDiscos,
    pagina: telaPaginas,
    squash: telaSquashes,
    circuito: telaCircuitos,
    job: telaJobs,
    colheita: telaColheitas,
    sessao: telaSessoes,
    tanque: telaTanques,
    sonda: telaSondas,
    semente: telaSementes,
    registro: telaRegistros,
    rastro: telaRastros,
    parada: telaParadas,
    pod: telaPods,
    lint: telaLints,
    origem: telaOrigens,
    link: telaLinks,
    cpu: telaCpus,
    copia: telaCopias,
    estouro: telaEstouros,
    impasse: telaImpasses,
    dominio: telaDominios,
    morta: telaMortas,
    ponteiro: telaPonteiros,
    eleicao: telaEleicoes,
    freio: telaFreios,
    pausa: telaPausas,
    deriva: telaDerivas,
    descritor: telaDescritores,
    reserva: telaReservas,
    varredura: telaVarreduras,
    porta: telaPortas,
    inodo: telaInodos,
    saida: telaSaidas,
    manada: telaManadas,
    gotejo: telaGotejos,
    frio: telaFrios,
    cadeado: telaCadeados
  };
}

function subDoTreino(treino) {
  if (treino.id === 'deslize') {
    const n = deslizesVencidos().length;
    if (n) return `${n} frase${n > 1 ? 's' : ''} para repetir hoje.`;
  }
  if (treino.id === 'caderno') {
    const n = termosDaFala(estado.errosFala).length;
    if (n) return `${n} palavra${n > 1 ? 's' : ''} das falas que você errou.`;
  }
  if (treino.id === 'junta') return textoDaJunta(planoDaJunta());
  if (treino.id === 'abertas') return textoDasAbertas(montarAbertas(diaLocalAgora()));
  if (treino.id === 'mes') return textoDoMes(montarMes(estado.painel, diaLocalAgora()));
  if (treino.id === 'surpresa') {
    const info = resumoSurpresa(diaLocalAgora());
    return textoDaSurpresa(info.treino, info);
  }
  if (treino.id === 'espaco') {
    const info = filaEspacada({
      erros: estado.errosFala,
      agenda: estado.agendaFala,
      hoje: diaLocalAgora()
    });
    if (info.fila.length) {
      const n = info.fila.length;
      return `${n} frase${n > 1 ? 's' : ''} que você mais errou, para hoje.`;
    }
    if (info.esperando) {
      const n = info.esperando;
      return `${n} frase${n > 1 ? 's' : ''} com vários erros esperam outro dia.`;
    }
  }
  if (treino.id === 'dia' && estado.perguntaDia === diaLocalAgora()) {
    return 'Feita hoje. Amanhã vem outra, com uma segunda pergunta.';
  }
  if (treino.id === 'semana') {
    const soma = somarSemana(estado.painel, diaLocalAgora());
    return lembreteMinutos(soma.minutos, estado.metaMinutos, diaLocalAgora());
  }
  if (treino.id === 'nivel' && estado.nivelFala) {
    return `Seu nível de fala: ${estado.nivelFala}. ${ROTULO_NIVEL[estado.nivelFala] || ''}`;
  }
  return treino.sub;
}

function abrirTreino(id) {
  marcarTreinoAberto(id);
  const fn = telasDoHub()[id];
  if (typeof fn === 'function') fn();
}

function treinosVisiveis() {
  return filtrarEstrelas(filtrarTreinos(TREINOS, filtroHub), estado.estrelas, filtroHub.estrela);
}

function cartaoDoTreino(treino) {
  const ligado = estrelaLigada(treino.id);
  return h('div', { class: 'hub-item', role: 'listitem' },
    botaoFluencia(treino.emoji, treino.titulo, subDoTreino(treino), () => abrirTreino(treino.id)),
    h('button', {
      type: 'button',
      class: 'estrela-treino',
      'data-estrela': treino.id,
      'aria-pressed': ligado ? 'true' : 'false',
      'aria-label': ligado ? `Tirar ${treino.titulo} dos favoritos` : `Favoritar ${treino.titulo}`,
      onclick() {
        alternarEstrela(treino.id);
        pintarListaHub(treino.id);
      }
    }, h('span', { 'aria-hidden': 'true' }, ligado ? '★' : '☆'))
  );
}

function pintarListaHub(focoId) {
  const lista = document.getElementById('lista-hub');
  const status = document.getElementById('hub-status');
  const visiveis = treinosVisiveis();
  const vazio = filtroHub.estrela
    ? 'Nenhum favorito ainda. A estrela marca o treino.'
    : 'Nenhum treino com esse filtro.';
  if (status) status.textContent = visiveis.length ? textoContagem(visiveis.length, filtroHub.categoria) : vazio;
  document.querySelectorAll('[data-categoria-hub]').forEach(chip => {
    chip.setAttribute('aria-pressed', chip.getAttribute('data-categoria-hub') === filtroHub.categoria ? 'true' : 'false');
  });
  document.querySelectorAll('[data-ordem-hub]').forEach(chip => {
    chip.setAttribute('aria-pressed', estado.ordemHub === 'menos' ? 'true' : 'false');
  });
  document.querySelectorAll('[data-filtro-estrela]').forEach(chip => {
    chip.setAttribute('aria-pressed', filtroHub.estrela ? 'true' : 'false');
  });
  if (!lista) return;
  const chave = [
    filtroHub.categoria,
    filtroHub.busca,
    filtroHub.estrela ? '1' : '0',
    estado.ordemHub,
    (estado.estrelas || []).join(','),
    visiveis.map(t => t.id).join(',')
  ].join('|');
  if (!focoId && lista.dataset.chave === chave && lista.childElementCount > 0) return;
  lista.dataset.chave = chave;
  const nos = [];
  if (!visiveis.length) {
    nos.push(h('p', { class: 'revisao-sub' }, vazio));
  } else {
    const cats = filtroHub.categoria === 'todos'
      ? GRUPOS_HUB
      : GRUPOS_HUB.filter(c => c.id === filtroHub.categoria);
    for (const cat of cats) {
      const grupo = ordenarTreinos(visiveis.filter(t => t.categoria === cat.id), {
        modo: estado.ordemHub,
        stats: estado.stats
      });
      if (!grupo.length) continue;
      nos.push(h('section', { 'aria-labelledby': `hub-cat-${cat.id}` },
        h('div', {
          id: `hub-cat-${cat.id}`,
          class: 'rotulo',
          role: 'heading',
          'aria-level': '3'
        }, cat.titulo),
        h('div', { role: 'list' }, ...grupo.map(cartaoDoTreino))
      ));
    }
  }
  lista.replaceChildren(...nos);
  if (!focoId) return;
  const alvo = lista.querySelector(`[data-estrela="${CSS.escape(focoId)}"]`);
  if (alvo) alvo.focus();
  else if (status) status.focus();
}

function garantirTrilha() {
  const hoje = diaLocalAgora();
  if (!estado.trilhaInicio) {
    estado.trilhaInicio = hoje;
    salvar();
  }
  return diaDaTrilha(estado.trilhaInicio, hoje);
}

function recomecarTrilha() {
  estado.trilhaInicio = diaLocalAgora();
  salvar();
  telaConversa();
}

function cartaoTrilha(info) {
  const frase = `${textoDoDia(info)} O treino de hoje é o recomendado.`;
  return h('div', {
    id: 'trilha-dia',
    class: 'card trilha-topo',
    role: 'region',
    'aria-label': `Trilha de 30 dias. ${frase}`
  },
    h('div', { class: 'nivel-titulo' }, 'Trilha de 30 dias'),
    h('p', { class: 'revisao-sub' }, frase),
    info.concluida
      ? h('button', { class: 'btn btn-branco', type: 'button', onclick: recomecarTrilha }, 'RECOMEÇAR')
      : ''
  );
}

function cartaoBalanco() {
  const b = balancoDaSemana(estado.painel, diaLocalAgora(), estado.metaMinutos);
  return h('div', {
    id: 'balanco-semana',
    class: 'card balanco',
    role: 'region',
    'aria-label': b.texto
  },
    h('div', { class: 'nivel-titulo' }, 'Esta semana'),
    h('p', {}, b.texto),
    h('div', {
      class: 'progresso',
      role: 'meter',
      'aria-valuemin': '0',
      'aria-valuemax': String(b.meta),
      'aria-valuenow': String(Math.min(b.minutos, b.meta)),
      'aria-valuetext': b.texto,
      'aria-label': b.texto
    }, h('div', { style: `width:${b.pct}%` })),
    h('button', { class: 'btn btn-branco', type: 'button', onclick: () => abrirTreino('semana') }, 'VER A SEMANA')
  );
}

function cartaoFila() {
  const fila = resumoDaFila(estado.agendaFala, diaLocalAgora());
  const rotulo = fila.dica ? `${fila.texto} ${fila.dica}` : fila.texto;
  const miolo = [
    h('div', { class: 'nivel-titulo' }, 'Para rever'),
    h('p', {}, fila.texto)
  ];
  if (fila.dica) miolo.push(h('p', { class: 'revisao-sub' }, fila.dica));
  if (fila.n > 0) {
    miolo.push(h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('deslize')
    }, 'REVER AGORA'));
  }
  return h('div', {
    id: 'fila-fala',
    class: 'card fila-fala',
    role: 'region',
    'aria-label': rotulo
  }, ...miolo);
}

function cartaoHoje() {
  const hoje = textoDeHoje(estado.painel, diaLocalAgora());
  const vazio = hoje.treinos === 0 && hoje.minutos === 0;
  return h('div', {
    id: 'fala-hoje',
    class: 'card fala-hoje',
    role: 'region',
    'aria-label': hoje.texto
  },
    h('div', { class: 'nivel-titulo' }, 'Hoje'),
    h('p', {}, hoje.texto),
    vazio ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick() {
        const rec = treinoRecomendado(TREINOS, {
          nivel: estado.nivelFala,
          stats: estado.stats,
          padroes: resumoPadroes(8),
          deslizes: deslizesVencidos().length
        });
        if (rec?.treino) abrirTreino(rec.treino.id);
      }
    }, 'FALAR AGORA') : ''
  );
}

function cartaoEstreia() {
  const info = textoDaEstreia(TREINOS, estado.stats);
  return h('div', {
    id: 'sem-pratica',
    class: 'card sem-pratica',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'Sem prática'),
    h('p', {}, info.texto),
    info.treino ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino(info.treino.id)
    }, 'ESTREAR') : ''
  );
}

function cartaoSequencia() {
  const info = textoDaSequencia(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-sequencia',
    class: 'card fala-sequencia',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'Sequência'),
    h('p', {}, info.texto),
    info.emRisco ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick() {
        const rec = treinoRecomendado(TREINOS, {
          nivel: estado.nivelFala,
          stats: estado.stats,
          padroes: resumoPadroes(8),
          deslizes: deslizesVencidos().length
        });
        if (rec?.treino) abrirTreino(rec.treino.id);
      }
    }, 'FALAR HOJE') : ''
  );
}

function cartaoComparacao() {
  const info = textoDaComparacao(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-comparacao',
    class: 'card fala-comparacao',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'Semana anterior'),
    h('p', {}, info.texto),
    info.atras ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick() {
        const rec = treinoRecomendado(TREINOS, {
          nivel: estado.nivelFala,
          stats: estado.stats,
          padroes: resumoPadroes(8),
          deslizes: deslizesVencidos().length
        });
        if (rec?.treino) abrirTreino(rec.treino.id);
      }
    }, 'FALAR MAIS') : ''
  );
}

function cartaoPalavra() {
  const info = textoDaPalavra(estado.errosFala);
  return h('div', {
    id: 'fala-palavra',
    class: 'card fala-palavra',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A palavra'),
    h('p', {}, info.texto),
    info.n > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('caderno')
    }, 'REPETIR') : ''
  );
}

function cartaoGrupo() {
  const info = textoDoGrupo(TREINOS, estado.stats);
  return h('div', {
    id: 'fala-grupo',
    class: 'card fala-grupo',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'O grupo'),
    h('p', {}, info.texto),
    info.id ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick() {
        filtroHub = { ...filtroHub, categoria: info.id, busca: '', estrela: false };
        pintarListaHub();
        document.getElementById('lista-hub')?.scrollIntoView({ block: 'start' });
      }
    }, 'VER O GRUPO') : ''
  );
}

function cartaoEstrela() {
  const info = textoDaEstrela(TREINOS, estado.estrelas, estado.stats);
  return h('div', {
    id: 'fala-estrela',
    class: 'card fala-estrela',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A estrela'),
    h('p', {}, info.texto),
    info.n > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick() {
        filtroHub = { ...filtroHub, categoria: 'todos', busca: '', estrela: true };
        pintarListaHub();
        document.getElementById('lista-hub')?.scrollIntoView({ block: 'start' });
      }
    }, 'VER FAVORITOS') : ''
  );
}

function cartaoAcerto() {
  const info = textoDoAcerto(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-acerto',
    class: 'card fala-acerto',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'O acerto'),
    h('p', {}, info.texto),
    info.respostas > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER O HISTÓRICO') : ''
  );
}

function cartaoPico() {
  const info = textoDoPico(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-pico',
    class: 'card fala-pico',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'O pico'),
    h('p', {}, info.texto),
    info.minutos > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER OS DIAS') : ''
  );
}

function cartaoApoio() {
  const info = textoDoApoio(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-apoio',
    class: 'card fala-apoio',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'O apoio'),
    h('p', {}, info.texto),
    info.n > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('mes')
    }, 'VER O MÊS') : ''
  );
}

function cartaoNota() {
  const info = textoDaNota(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-nota',
    class: 'card fala-nota',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A nota'),
    h('p', {}, info.texto),
    info.n > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('mes')
    }, 'VER O MÊS') : ''
  );
}

function cartaoDias() {
  const info = textoDosDias(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-dias',
    class: 'card fala-dias',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'Os dias'),
    h('p', {}, info.texto),
    info.n > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER OS DIAS') : ''
  );
}

function cartaoRitmo() {
  const info = textoDoRitmo(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-ritmo',
    class: 'card fala-ritmo',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'O ritmo'),
    h('p', {}, info.texto),
    info.dias > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER A SEMANA') : ''
  );
}

function cartaoLacuna() {
  const info = textoDaLacuna(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-lacuna',
    class: 'card fala-lacuna',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A lacuna'),
    h('p', {}, info.texto),
    info.n > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER A SEMANA') : ''
  );
}

function cartaoFalta() {
  const info = textoDaMeta(estado.painel, diaLocalAgora(), estado.metaMinutos);
  return h('div', {
    id: 'fala-meta',
    class: 'card fala-meta',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A meta'),
    h('p', {}, info.texto),
    info.falta > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER A SEMANA') : ''
  );
}

function cartaoDuracao() {
  const info = textoDaDuracao(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-duracao',
    class: 'card fala-duracao',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A duração'),
    h('p', {}, info.texto),
    info.segundos > 0 ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER A SEMANA') : ''
  );
}

function cartaoUltima() {
  const info = textoDaUltima(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-ultima',
    class: 'card fala-ultima',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A última'),
    h('p', {}, info.texto),
    typeof info.dias === 'number' ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER A SEMANA') : ''
  );
}

function cartaoPrimeira() {
  const info = textoDaPrimeira(estado.painel, diaLocalAgora());
  return h('div', {
    id: 'fala-primeira',
    class: 'card fala-primeira',
    role: 'region',
    'aria-label': info.texto
  },
    h('div', { class: 'nivel-titulo' }, 'A primeira'),
    h('p', {}, info.texto),
    typeof info.dias === 'number' ? h('button', {
      class: 'btn btn-branco',
      type: 'button',
      onclick: () => abrirTreino('semana')
    }, 'VER A SEMANA') : ''
  );
}

function blocoFluencia() {
  const trilha = garantirTrilha();
  const rec = treinoRecomendado(TREINOS, {
    nivel: estado.nivelFala,
    stats: estado.stats,
    padroes: resumoPadroes(8),
    deslizes: deslizesVencidos().length
  });
  const total = treinosVisiveis().length;
  const aberto = treinoContinuar(TREINOS, estado.treinoAberto);
  const continuar = aberto ? h('button', {
    class: 'card revisao',
    type: 'button',
    'data-continuar': '1',
    'aria-label': textoDoContinuar(aberto),
    onclick: () => abrirTreino(aberto.id)
  },
    h('span', { class: 'revisao-emoji' }, aberto.emoji),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Continuar de onde parei'),
      h('div', { class: 'revisao-sub' }, aberto.titulo)
    ),
    h('span', { class: 'revisao-seta' }, '›')
  ) : '';
  const chips = [{ id: 'todos', titulo: 'Todos' }, ...GRUPOS_HUB].map(cat => h('button', {
    type: 'button',
    class: 'pilula',
    'data-categoria-hub': cat.id,
    'aria-pressed': filtroHub.categoria === cat.id ? 'true' : 'false',
    'aria-controls': 'lista-hub',
    onclick: () => {
      filtroHub = { ...filtroHub, categoria: cat.id };
      pintarListaHub();
    },
    onkeydown: ev => {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      moverCategoriaHub(cat.id, ev.key);
    }
  }, cat.titulo));
  const recomendado = rec ? h('button', {
    class: 'card revisao',
    type: 'button',
    'aria-label': `${textoDoDia(trilha)} Treino recomendado: ${rec.treino.titulo}. ${rec.porque}`,
    onclick: () => abrirTreino(rec.treino.id)
  },
    h('span', { class: 'revisao-emoji' }, rec.treino.emoji),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Treino recomendado'),
      h('div', { class: 'revisao-sub' }, `${rec.treino.titulo}. ${rec.porque}`)
    ),
    h('span', { class: 'revisao-seta' }, '›')
  ) : '';
  return [
    h('div', { class: 'rotulo', role: 'heading', 'aria-level': '2' }, 'FLUÊNCIA'),
    cartaoTrilha(trilha),
    cartaoBalanco(),
    cartaoFila(),
    cartaoHoje(),
    cartaoEstreia(),
    cartaoSequencia(),
    cartaoComparacao(),
    cartaoPalavra(),
    cartaoGrupo(),
    cartaoEstrela(),
    cartaoAcerto(),
    cartaoPico(),
    cartaoApoio(),
    cartaoNota(),
    cartaoDias(),
    cartaoRitmo(),
    cartaoLacuna(),
    cartaoFalta(),
    cartaoDuracao(),
    cartaoUltima(),
    cartaoPrimeira(),
    recomendado,
    continuar,
    h('div', { class: 'hub-busca' },
      h('label', { class: 'revisao-sub', for: 'busca-hub' }, 'Buscar treino'),
      h('input', {
        id: 'busca-hub',
        class: 'entrada',
        type: 'search',
        autocomplete: 'off',
        placeholder: 'Nome ou assunto',
        'aria-label': 'Buscar treino',
        'aria-controls': 'lista-hub',
        value: filtroHub.busca,
        oninput: ev => {
          filtroHub = { ...filtroHub, busca: ev.target.value };
          pintarListaHub();
        }
      })
    ),
    h('div', { class: 'fila-botoes', role: 'group', 'aria-label': 'Categorias dos treinos' }, ...chips),
    h('div', { class: 'fila-botoes', role: 'group', 'aria-label': 'Descoberta dos treinos' },
      h('button', {
        type: 'button',
        class: 'pilula',
        'data-filtro-estrela': '1',
        'aria-pressed': filtroHub.estrela ? 'true' : 'false',
        'aria-controls': 'lista-hub',
        onclick: () => {
          filtroHub = { ...filtroHub, estrela: !filtroHub.estrela };
          pintarListaHub();
        }
      }, 'Favoritos'),
      h('button', {
        type: 'button',
        class: 'pilula',
        'data-ordem-hub': 'menos',
        'aria-pressed': estado.ordemHub === 'menos' ? 'true' : 'false',
        'aria-controls': 'lista-hub',
        onclick: () => {
          definirOrdemHub(estado.ordemHub === 'menos' ? 'catalogo' : 'menos');
          pintarListaHub();
        }
      }, 'Menos praticados')
    ),
    h('p', { id: 'hub-status', class: 'revisao-sub', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true', tabindex: '-1' }, textoContagem(total, filtroHub.categoria)),
    h('div', { id: 'lista-hub', 'aria-labelledby': 'hub-status' })
  ];
}

function cartaoComNivel(item, sub, onclick) {
  return h('button', { class: 'card revisao', type: 'button', onclick },
    h('span', { class: 'revisao-emoji' }, item.emoji || '💬'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, item.titulo),
      h('div', { class: 'revisao-sub' }, sub)
    ),
    h('span', { class: 'pilula' }, item.nivel)
  );
}

function filaAdaptada(lista, id, porId) {
  const ordenada = montarSessao(lista, estado.nivelFala, lista.length);
  if (!id) return ordenada.slice(0, 4);
  const escolhido = porId(id);
  if (!escolhido) return ordenada.slice(0, 4);
  return [escolhido, ...ordenada.filter(item => item.id !== escolhido.id)].slice(0, 4);
}

function fecharNota(notas) {
  return notas.length ? Math.round(notas.reduce((s, n) => s + n, 0) / notas.length) : 0;
}

function telaNivel() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'nivel';
  registrarRota('nivel');
  nivelSessao = null;
  const nivel = estado.nivelFala;
  app.innerHTML = '';
  app.append(
    topoVoltar('🎯 Teste de nível', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Oito perguntas, duas de cada faixa, de A1 a B2. O resultado ordena o treino. Nada fica trancado.'),
    nivel
      ? h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, `Seu nível de fala: ${nivel}`),
        h('p', {}, ROTULO_NIVEL[nivel] || ''),
        h('p', {}, 'Refazer troca o nível neste aparelho. A nuvem fica com o mais alto.')
      )
      : h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, 'Ainda sem nível'),
        h('p', {}, 'O teste leva poucos minutos e não precisa de microfone.')
      ),
    h('button', { class: 'btn btn-verde', onclick: abrirNivel }, nivel ? 'REFAZER O TESTE' : 'COMEÇAR')
  );
  focarTela();
}

function abrirNivel() {
  nivelSessao = { i: 0, respostas: [], feedback: null, concluido: false, fim: null };
  pintarNivel();
}

function pintarNivel() {
  if (!nivelSessao || nivelSessao.concluido) return telaNivel();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'nivel';
  registrarRota('nivel');
  const item = ITENS_NIVEL[nivelSessao.i];
  app.innerHTML = '';
  const miolo = [
    topoVoltar('🎯 Teste de nível', () => telaNivel()),
    h('div', { class: 'revisao-sub' }, `Pergunta ${nivelSessao.i + 1} de ${ITENS_NIVEL.length} · ${item.nivel}`),
    h('p', { class: 'sombra-frase' }, item.pergunta)
  ];
  if (nivelSessao.feedback) {
    miolo.push(h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, nivelSessao.feedback.ok ? 'Isso.' : 'A certa era outra.'),
      h('p', { lang: 'en' }, item.opcoes[item.certa])
    ));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (nivelSessao.i + 1 >= ITENS_NIVEL.length) concluirNivel();
        else {
          nivelSessao.i++;
          nivelSessao.feedback = null;
          pintarNivel();
        }
      }
    }, nivelSessao.i + 1 >= ITENS_NIVEL.length ? 'VER MEU NÍVEL' : 'PRÓXIMA'));
  } else {
    miolo.push(h('p', { class: 'ia-aviso' }, 'Teclas 1, 2 e 3 escolhem a opção.'));
    miolo.push(h('div', { class: 'opcoes' }, item.opcoes.map((texto, indice) => h('button', {
      class: 'opcao',
      type: 'button',
      lang: 'en',
      onclick() {
        if (nivelSessao.feedback) return;
        const ok = corrigirIndice(item, indice);
        nivelSessao.respostas.push({ nivel: item.nivel, ok });
        if (ok) sons.acerto();
        else sons.erro();
        nivelSessao.feedback = { ok };
        pintarNivel();
      }
    }, texto))));
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
}

function concluirNivel() {
  if (!nivelSessao || nivelSessao.concluido) return pintarFim(nivelSessao?.fim);
  const acertos = contarAcertos(nivelSessao.respostas);
  const nivel = nivelDoTeste(acertos);
  const certos = nivelSessao.respostas.filter(r => r.ok).length;
  const total = nivelSessao.respostas.length;
  const nota = total ? Math.round(certos / total * 100) : 0;
  const primeiro = !estado.nivelFala;
  const xp = primeiro ? 25 : 0;
  const evento = registrarNivel({
    nivel,
    xp,
    acertos: certos,
    respostas: total,
    nota,
    perfeita: false,
    comboMax: 0
  });
  nivelSessao.concluido = true;
  nivelSessao.fim = {
    titulo: `Nível de fala: ${nivel}`,
    sub: ROTULO_NIVEL[nivel] || '',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaConversa,
    painel: true,
    resumo: true
  };
  pintarFim(nivelSessao.fim);
}

function telaPerguntas() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'pergunta';
  registrarRota('pergunta');
  perguntaSessao = null;
  const lista = preferirNivel(PERGUNTAS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('❓ Você pergunta', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Desta vez a outra pessoa espera. A sua fala precisa ser uma pergunta. O melhor jeito só aparece depois da tentativa.'),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrirPergunta(c.id)))
  );
  focarTela();
}

function abrirPergunta(id) {
  const cena = perguntaPorId(id);
  if (!cena) return telaPerguntas();
  perguntaSessao = {
    cena,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarPergunta();
}

function pintarPergunta() {
  if (!perguntaSessao || perguntaSessao.concluido) return telaPerguntas();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'pergunta';
  registrarRota('pergunta');
  const cena = perguntaSessao.cena;
  const rodada = cena.rodadas[perguntaSessao.i];
  const campo = campoResposta('Escreva a sua pergunta...');
  const ouvir = () => falar(rodada.npc.en);
  app.innerHTML = '';
  const miolo = [
    topoVoltar(cena.emoji + ' ' + cena.titulo, () => telaPerguntas()),
    h('div', { class: 'revisao-sub' }, `Pergunta ${perguntaSessao.i + 1} de ${cena.rodadas.length} · ${cena.nivel}`),
    h('div', { class: 'fala fala-npc' },
      h('div', { class: 'fala-en', lang: 'en' }, rodada.npc.en),
      h('div', { class: 'fala-pt' }, rodada.npc.pt)
    )
  ];
  if (perguntaSessao.feedback) {
    miolo.push(cartaoTutor(perguntaSessao.feedback));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (perguntaSessao.i + 1 >= cena.rodadas.length) concluirPergunta();
        else {
          perguntaSessao.i++;
          perguntaSessao.feedback = null;
          pintarPergunta();
        }
      }
    }, perguntaSessao.i + 1 >= cena.rodadas.length ? 'CONCLUIR' : 'CONTINUAR'));
  } else {
    miolo.push(h('p', { class: 'sombra-frase' }, rodada.missao));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = () => {
      if (!campo.entrada.value.trim() || perguntaSessao.feedback) return;
      const aval = avaliarPergunta(rodada, campo.entrada.value);
      perguntaSessao.notas.push(aval.nota);
      if (aval.ok) {
        perguntaSessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        perguntaSessao.erros.push({ en: aval.melhor, pt: rodada.missao });
      }
      perguntaSessao.feedback = aval;
      pintarPergunta();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', enviar);
    miolo.push(verificar);
    timerDeTela(ouvir, 280);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!perguntaSessao.feedback) campo.entrada.focus();
}

function concluirPergunta() {
  if (!perguntaSessao || perguntaSessao.concluido) return pintarFim(perguntaSessao?.fim);
  const total = perguntaSessao.cena.rodadas.length;
  const nota = fecharNota(perguntaSessao.notas);
  const xp = 10 + perguntaSessao.acertos * 8;
  const evento = registrarPergunta({
    xp,
    acertos: perguntaSessao.acertos,
    respostas: total,
    nota,
    errosFala: perguntaSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  perguntaSessao.concluido = true;
  perguntaSessao.fim = {
    titulo: 'Você perguntou!',
    sub: perguntaSessao.cena.titulo,
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaPerguntas,
    painel: true,
    resumo: true
  };
  pintarFim(perguntaSessao.fim);
}

function telaReducoes() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'reducao';
  registrarRota('reducao');
  reducaoSessao = null;
  const lista = preferirNivel(REDUCOES, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('⏩ Fala rápida', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, temTts
      ? 'A voz é a do aparelho. Normal e devagar falam a frase curta. A frase cheia só aparece depois da resposta. Sem arquivo de áudio.'
      : 'Sem voz neste aparelho. A frase curta aparece escrita para você ler e escolher.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirReducao() }, 'TREINAR 4'),
    ...lista.map(item => cartaoComNivel(item, item.pt, () => abrirReducao(item.id)))
  );
  focarTela();
}

function abrirReducao(id) {
  const fila = filaAdaptada(REDUCOES, id, reducaoPorId);
  if (!fila.length) return telaReducoes();
  reducaoSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    ouviu: !temTts,
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarReducao();
}

function pintarReducao() {
  if (!reducaoSessao || reducaoSessao.concluido) return telaReducoes();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'reducao';
  registrarRota('reducao');
  const item = reducaoSessao.fila[reducaoSessao.i];
  const ouvir = taxa => falar(item.fala, taxa);
  const controles = temTts
    ? h('div', { class: 'fila-botoes' },
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_NORMAL) }, 'NORMAL'),
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_DEVAGAR) }, 'DEVAGAR')
    )
    : '';
  app.innerHTML = '';
  const miolo = [
    topoVoltar(item.emoji + ' ' + item.titulo, () => telaReducoes()),
    h('div', { class: 'revisao-sub' }, `Fala ${reducaoSessao.i + 1} de ${reducaoSessao.fila.length} · ${item.nivel}`)
  ];
  if (!reducaoSessao.ouviu && !reducaoSessao.feedback) {
    miolo.push(h('p', { class: 'ia-aviso' }, 'A voz é a do aparelho. Normal é a velocidade natural. Devagar fica mais lento. A frase escrita só aparece depois.'));
    miolo.push(controles);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        reducaoSessao.ouviu = true;
        pintarReducao();
      }
    }, 'JÁ OUVI'));
    timerDeTela(() => ouvir(TAXA_NORMAL), 280);
  } else if (!reducaoSessao.feedback) {
    if (!temTts) {
      miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, item.fala));
      miolo.push(h('p', { class: 'ia-aviso' }, 'Sem voz neste aparelho. Leia e escolha.'));
    } else {
      miolo.push(controles);
    }
    miolo.push(h('p', { class: 'sombra-frase' }, item.pergunta));
    miolo.push(h('div', { class: 'opcoes' }, item.opcoes.map((texto, indice) => h('button', {
      class: 'opcao',
      type: 'button',
      lang: 'en',
      onclick() {
        if (reducaoSessao.feedback) return;
        const ok = corrigirIndice(item, indice);
        reducaoSessao.notas.push(ok ? 100 : 0);
        if (ok) {
          reducaoSessao.acertos++;
          sons.acerto();
        } else {
          sons.erro();
          reducaoSessao.erros.push({ en: item.fala, pt: item.opcoes[item.certa] });
        }
        reducaoSessao.feedback = { ok };
        pintarReducao();
      }
    }, texto))));
  } else {
    miolo.push(h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, reducaoSessao.feedback.ok ? 'Isso.' : 'Olha a frase cheia.'),
      h('p', {}, item.dica),
      h('p', {}, item.pt),
      h('p', { lang: 'en' }, 'Você ouviu: ', h('strong', {}, item.fala)),
      h('p', { lang: 'en' }, 'Frase cheia: ', h('strong', {}, item.opcoes[item.certa]))
    ));
    if (temTts) miolo.push(controles);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (reducaoSessao.i + 1 >= reducaoSessao.fila.length) concluirReducao();
        else {
          reducaoSessao.i++;
          reducaoSessao.ouviu = !temTts;
          reducaoSessao.feedback = null;
          pintarReducao();
        }
      }
    }, reducaoSessao.i + 1 >= reducaoSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
}

function concluirReducao() {
  if (!reducaoSessao || reducaoSessao.concluido) return pintarFim(reducaoSessao?.fim);
  const total = reducaoSessao.fila.length;
  const nota = fecharNota(reducaoSessao.notas);
  const xp = 8 + reducaoSessao.acertos * 6;
  const evento = registrarReducao({
    xp,
    acertos: reducaoSessao.acertos,
    respostas: total,
    nota,
    errosFala: reducaoSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  reducaoSessao.concluido = true;
  reducaoSessao.fim = {
    titulo: 'Fala rápida concluída!',
    sub: 'O que a frase curta queria dizer',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaReducoes,
    painel: true,
    resumo: true
  };
  pintarFim(reducaoSessao.fim);
}

function telaFrasais() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'verbo';
  registrarRota('verbo');
  frasalSessao = null;
  const lista = preferirNivel(FRASAIS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🧩 Phrasal verbs', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Diga a frase em inglês. O jeito melhor só aparece depois da tentativa. Este treino não entra na Revisão Turbo.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirFrasal() }, 'TREINAR 4'),
    ...lista.map(item => cartaoComNivel(item, item.pt, () => abrirFrasal(item.id)))
  );
  focarTela();
}

function abrirFrasal(id) {
  const fila = filaAdaptada(FRASAIS, id, frasalPorId);
  if (!fila.length) return telaFrasais();
  frasalSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarFrasal();
}

function pintarFrasal() {
  if (!frasalSessao || frasalSessao.concluido) return telaFrasais();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'verbo';
  registrarRota('verbo');
  const item = frasalSessao.fila[frasalSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  app.innerHTML = '';
  const miolo = [
    topoVoltar('🧩 ' + item.titulo, () => telaFrasais()),
    h('div', { class: 'revisao-sub' }, `Frase ${frasalSessao.i + 1} de ${frasalSessao.fila.length} · ${item.nivel}`),
    h('p', { class: 'sombra-frase' }, item.pt),
    h('p', { class: 'ia-aviso' }, item.uso)
  ];
  if (frasalSessao.feedback) {
    miolo.push(cartaoTutor(frasalSessao.feedback));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (frasalSessao.i + 1 >= frasalSessao.fila.length) concluirFrasal();
        else {
          frasalSessao.i++;
          frasalSessao.feedback = null;
          pintarFrasal();
        }
      }
    }, frasalSessao.i + 1 >= frasalSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = () => {
      if (!campo.entrada.value.trim() || frasalSessao.feedback) return;
      const aval = avaliarFrasal(item, campo.entrada.value);
      frasalSessao.notas.push(aval.nota);
      if (aval.ok) {
        frasalSessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        frasalSessao.erros.push({ en: aval.melhor, pt: item.pt });
      }
      frasalSessao.feedback = aval;
      pintarFrasal();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', enviar);
    miolo.push(verificar);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!frasalSessao.feedback) campo.entrada.focus();
}

function concluirFrasal() {
  if (!frasalSessao || frasalSessao.concluido) return pintarFim(frasalSessao?.fim);
  const total = frasalSessao.fila.length;
  const nota = fecharNota(frasalSessao.notas);
  const xp = 8 + frasalSessao.acertos * 6;
  const evento = registrarVerbo({
    xp,
    acertos: frasalSessao.acertos,
    respostas: total,
    nota,
    errosFala: frasalSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  frasalSessao.concluido = true;
  frasalSessao.fim = {
    titulo: 'Phrasal verbs concluídos!',
    sub: 'Frases para a conversa',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaFrasais,
    painel: true,
    resumo: true
  };
  pintarFim(frasalSessao.fim);
}

function telaLivres() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'livre';
  registrarRota('livre');
  livreSessao = null;
  const lista = preferirNivel(TEMAS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🙋 Falar de você', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'O relógio corre neste aparelho. O tutor olha o tamanho, as pistas e as ligações. Nada sai daqui.'),
    ...lista.map(tema => cartaoComNivel(tema, `${tema.segundos} segundos`, () => abrirLivre(tema.id)))
  );
  focarTela();
}

function abrirLivre(id) {
  const tema = temaPorId(id);
  if (!tema) return telaLivres();
  livreSessao = {
    tema,
    restante: tema.segundos,
    texto: '',
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarLivre();
}

function relogioLivre(segundos) {
  const s = Math.max(0, Number(segundos) || 0);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function ligarCronometroLivre() {
  clearInterval(intervaloLivre);
  intervaloLivre = setInterval(() => {
    if (!livreSessao || livreSessao.feedback) {
      clearInterval(intervaloLivre);
      intervaloLivre = null;
      return;
    }
    livreSessao.restante = Math.max(0, livreSessao.restante - 1);
    const el = document.querySelector('[data-cronometro-livre]');
    if (el) el.textContent = relogioLivre(livreSessao.restante);
    if (livreSessao.restante <= 0) {
      clearInterval(intervaloLivre);
      intervaloLivre = null;
      enviarLivre();
    }
  }, 1000);
}

function enviarLivre() {
  if (!livreSessao || livreSessao.feedback) return;
  clearInterval(intervaloLivre);
  intervaloLivre = null;
  const aval = avaliarLivre(livreSessao.tema, livreSessao.texto);
  livreSessao.feedback = aval;
  if (aval.ok) sons.acerto();
  else sons.erro();
  const xp = 8 + Math.round(aval.nota / 10);
  const evento = registrarLivre({
    xp,
    acertos: aval.ok ? 1 : 0,
    respostas: 1,
    nota: aval.nota,
    errosFala: aval.ok ? [] : [{ en: livreSessao.tema.titulo, pt: aval.faltas[0] || livreSessao.tema.pedido }],
    perfeita: false,
    comboMax: 0
  });
  livreSessao.fim = {
    titulo: aval.ok ? 'Você falou!' : 'Fala registrada',
    sub: livreSessao.tema.titulo,
    nota: aval.nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaLivres,
    painel: true,
    resumo: true,
    extra: h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, `${aval.palavras} palavras`),
      h('p', {}, aval.pistas.length ? `Pistas usadas: ${aval.pistas.join(', ')}` : 'Nenhuma pista entrou.'),
      ...aval.faltas.map(f => h('p', {}, f))
    )
  };
  pintarLivre();
}

function pintarLivre() {
  if (!livreSessao) return telaLivres();
  if (livreSessao.concluido) return pintarFim(livreSessao.fim);
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'livre';
  registrarRota('livre');
  const tema = livreSessao.tema;
  app.innerHTML = '';
  const miolo = [
    topoVoltar(tema.emoji + ' ' + tema.titulo, () => telaLivres()),
    h('div', { class: 'revisao-sub' }, `${tema.nivel} · ${tema.segundos} segundos`),
    h('div', { class: 'nota-grande', 'data-cronometro-livre': '1', role: 'timer' }, relogioLivre(livreSessao.restante)),
    h('p', { class: 'sombra-frase' }, tema.pedido),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, 'Pistas'),
      ...tema.pistas.map(p => h('div', { class: 'fala-en', lang: 'en' }, p)),
      h('p', { class: 'ia-aviso' }, tema.dica)
    )
  ];
  if (livreSessao.feedback) {
    const aval = livreSessao.feedback;
    miolo.push(h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, aval.ok ? `Nota ${aval.nota}` : `Nota ${aval.nota}. Dá para alongar.`),
      h('p', {}, `${aval.palavras} palavras.`),
      h('p', {}, aval.pistas.length ? `Pistas: ${aval.pistas.join(', ')}` : 'Nenhuma pista entrou.'),
      ...aval.faltas.map(f => h('p', {}, f))
    ));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        livreSessao.concluido = true;
        pintarFim(livreSessao.fim);
      }
    }, 'CONCLUIR'));
  } else {
    const entrada = h('textarea', {
      class: 'entrada',
      lang: 'en',
      autocomplete: 'off',
      autocapitalize: 'off',
      spellcheck: 'false',
      placeholder: 'Fale ou escreva em inglês',
      'aria-label': 'Sua fala em inglês'
    });
    entrada.dataset.acrescentar = '1';
    entrada.value = livreSessao.texto;
    const status = h('div', { class: 'ia-aviso', role: 'status' }, temFala
      ? 'Toque em Falar ou escreva. O microfone acrescenta no texto.'
      : 'Sem microfone neste navegador. Escreva a fala.');
    const mic = temFala
      ? h('button', { class: 'btn btn-branco', type: 'button', onclick: () => reconhecerFala(status, entrada) }, 'FALAR')
      : '';
    const enviarBtn = h('button', { class: 'btn btn-verde', disabled: !entrada.value.trim() }, 'ENVIAR');
    entrada.addEventListener('input', () => {
      livreSessao.texto = entrada.value;
      enviarBtn.disabled = !entrada.value.trim();
    });
    enviarBtn.addEventListener('click', () => {
      if (!entrada.value.trim()) return;
      livreSessao.texto = entrada.value;
      enviarLivre();
    });
    miolo.push(status, mic, entrada, enviarBtn);
  }
  app.append(h('div', {}, miolo));
  focarTela();
  if (!livreSessao.feedback) ligarCronometroLivre();
}

function barrasDaSemana(dias) {
  return h('div', { class: 'semana-fala', role: 'img', 'aria-label': 'Nota média desta semana, de segunda a domingo' },
    dias.map(d => {
      const indice = diaDaSemana(d.data);
      const vazio = d.media == null;
      const altura = vazio ? 6 : Math.max(8, Math.round(d.media * 0.88));
      return h('div', { class: 'semana-fala-col' },
        h('div', {
          class: 'col' + (vazio ? ' col-vazia' : ''),
          style: `height:${altura}px`,
          title: vazio ? `${NOMES_SEMANA[indice]}: sem treino` : `${NOMES_SEMANA[indice]}: ${d.media}`
        }),
        h('div', { class: 'semana-fala-dia' }, LETRAS_SEMANA[indice])
      );
    })
  );
}

function telaResumo() {
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'resumo';
  registrarRota('resumo');
  const hojeIso = diaLocalAgora();
  const resumo = resumoSemana(estado.painel, hojeIso);
  const sugestao = sugestaoSemana({
    nivel: estado.nivelFala,
    perguntas: estado.stats.perguntas,
    reduzidas: estado.stats.reduzidas,
    verbos: estado.stats.verbosFala,
    livres: estado.stats.livres,
    media: resumo.media
  });
  const erros = errosMaisComuns(3);
  app.innerHTML = '';
  app.append(
    topoVoltar('📅 Resumo da semana', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'O gráfico é desta semana, de segunda a domingo. Os contadores de perguntas, fala rápida, phrasal verbs e fala livre são do tempo todo, não só destes sete dias.'),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, resumo.media == null ? 'Sem nota nesta semana' : `Média da semana: ${resumo.media}`),
      h('p', {}, resumo.treinos
        ? `${resumo.treinos} treino${resumo.treinos > 1 ? 's' : ''}${resumo.precisao == null ? '.' : `. Precisão ${resumo.precisao}%.`}`
        : 'Termine um teste, uma pergunta ou uma fala para pintar a barra.'),
      barrasDaSemana(resumo.dias)
    ),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, 'Sugestão'),
      h('p', {}, sugestao)
    ),
    cartaoPlano(),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, estado.nivelFala ? `Nível de fala ${estado.nivelFala}` : 'Nível de fala ainda aberto'),
      h('p', {}, `Perguntas ${estado.stats.perguntas} · fala rápida ${estado.stats.reduzidas} · phrasal verbs ${estado.stats.verbosFala} · fala livre ${estado.stats.livres}.`),
      h('p', {}, `Trabalho ${estado.stats.tecnicos} · idioms ${estado.stats.idiomas} · pergunta do dia ${estado.stats.diasPergunta}.`),
      h('p', {}, `Deslizes ${estado.stats.revisoesFala} · entrevista ${estado.stats.entrevistas} · histórias ${estado.stats.contos} · números ${estado.stats.numeros}.`),
      h('p', {}, `Opiniões ${estado.stats.opinioes} · cenas ${estado.stats.cenasFala} · respostas rápidas ${estado.stats.rapidos}.`),
      h('p', {}, `Relatos ${estado.stats.relatos} · reviews ${estado.stats.cortesias} · papo de call ${estado.stats.aquecimentos} · esclarecer ${estado.stats.esclarecimentos}.`),
      h('p', {}, `Demos ${estado.stats.demos} · prazos ${estado.stats.negociacoes} · STAR ${estado.stats.stars} · ênfase ${estado.stats.enfases}.`),
      h('p', {}, `Decisões ${estado.stats.decisoes} · pair ${estado.stats.pares} · plantões ${estado.stats.incidentes}.`),
      h('p', {}, `Retros ${estado.stats.retros} · onboardings ${estado.stats.chegadas} · conectores ${estado.stats.ligacoes}.`),
      h('p', {}, `Estimativas ${estado.stats.estimativas} · consensos ${estado.stats.consensos} · atendimentos ${estado.stats.atendimentos}.`),
      h('p', {}, `1:1 ${estado.stats.gestores} · perguntas finais ${estado.stats.finais} · viagens ${estado.stats.viagens} · revisões de 3 min ${estado.stats.misturas}.`),
      h('p', {}, `Linhas ${estado.stats.linhas} · slacks ${estado.stats.slacks} · sociais ${estado.stats.sociais} · termos ${estado.stats.termos}.`),
      h('p', {}, `Salários ${estado.stats.salarios} · projetos ${estado.stats.projetos} · sotaques ${estado.stats.sotaques} · desafios ${estado.stats.desafios}.`),
      h('p', {}, `Requisitos ${estado.stats.requisitos} · métricas ${estado.stats.metricas} · lições ${estado.stats.aprendizados} · passeios ${estado.stats.passeios}.`),
      h('p', {}, `Falhas ${estado.stats.falhas} · mentorias ${estado.stats.mentorias} · socorros ${estado.stats.socorros}.`),
      h('p', {}, `Palestras ${estado.stats.palestras} · dúvidas ${estado.stats.duvidas} · sinais ${estado.stats.sinais}.`),
      h('p', {}, `Sistemas ${estado.stats.sistemas} · códigos ${estado.stats.codigos} · colegas ${estado.stats.colegas} · simulados ${estado.stats.simulados}.`),
      h('p', {}, `Modelos ${estado.stats.modelos} · furos ${estado.stats.furos} · rotinas ${estado.stats.rotinas} · papos ${estado.stats.papos} · futuros ${estado.stats.futuros}.`),
      h('p', {}, `Culturas ${estado.stats.culturas} · aumentos ${estado.stats.aumentos} · rotas ${estado.stats.rotas}.`),
      h('p', {}, `Ao vivo ${estado.stats.vivos} · produto ${estado.stats.produtos} · perguntas ${estado.stats.fechos} · revisões ${estado.stats.espacos}.`),
      h('p', {}, `Mapas ${estado.stats.mapas} · pontos difíceis ${estado.stats.duros} · propostas ${estado.stats.propostas}.`),
      h('p', {}, `Narrados ${estado.stats.narras} · bancos ${estado.stats.bancos} · recusas ${estado.stats.recusas}.`),
      h('p', {}, `Sprints ${estado.stats.sprints} · decisões seguras ${estado.stats.seguros} · meetups ${estado.stats.meetups} · entrevistas completas ${estado.stats.completas}.`),
      h('p', {}, `Mesas ${estado.stats.rodadas} · migrações ${estado.stats.migras} · estreias ${estado.stats.estreias} · focos ${estado.stats.focos}.`),
      h('p', {}, `Cartas ${estado.stats.pokers} · contas de IA ${estado.stats.leigos} · ligações ${estado.stats.recrutas}.`),
      h('p', {}, `Desculpas ${estado.stats.culpas} · relâmpagos ${estado.stats.raios} · ofertas ${estado.stats.ofertas}.`),
      h('p', {}, `Esclarecimentos ${estado.stats.pedidos} · coberturas ${estado.stats.coberturas} · vídeos ${estado.stats.looms} · vocabulário ${estado.stats.cadernos}.`),
      h('p', {}, `Gráficos ${estado.stats.graficos} · handoffs ${estado.stats.handoffs} · elevadores ${estado.stats.elevadores} · semanas ${estado.stats.juntas}.`),
      h('p', {}, `Bugs raros ${estado.stats.pistas} · calmas ${estado.stats.calmas} · folgas ${estado.stats.folgas} · abertas ${estado.stats.abertas}.`),
      h('p', {}, `Respeito ${estado.stats.respeitos} · dívidas ${estado.stats.debitos} · indicações ${estado.stats.indicacoes}.`),
      h('p', {}, `Contrastes ${estado.stats.uxs} · fóruns ${estado.stats.foruns} · vistos ${estado.stats.vistos} · meses ${estado.stats.meses}.`),
      h('p', {}, `Facilitadores ${estado.stats.facils} · escolhas ${estado.stats.stacks} · sábados ${estado.stats.sabados} · surpresas ${estado.stats.surpresas}.`),
      h('p', {}, `Falhas ${estado.stats.brechas} · mudanças ${estado.stats.mudas} · chimarrões ${estado.stats.gauchos}.`),
      h('p', {}, `Radares ${estado.stats.radares} · aplausos ${estado.stats.aplausos} · gripes ${estado.stats.gripes}.`),
      h('p', {}, `Prazos com o PM ${estado.stats.pms} · laudos ${estado.stats.laudos} · rumos ${estado.stats.rumos}.`),
      h('p', {}, `Acessos ${estado.stats.acessos} · licenças ${estado.stats.licencas} · notas simples ${estado.stats.jargoes}.`),
      h('p', {}, `Bandeiras ${estado.stats.bandeiras} · gelos ${estado.stats.gelos} · limites ${estado.stats.limites}.`),
      h('p', {}, `Canários ${estado.stats.canarios} · despedidas ${estado.stats.despedidas} · repetições ${estado.stats.repeticoes}.`),
      h('p', {}, `Cargas ${estado.stats.cargas} · boletins ${estado.stats.boletins} · donos ${estado.stats.donos}.`),
      h('p', {}, `Manuais ${estado.stats.manuais} · lados verdes ${estado.stats.verdes} · certificados ${estado.stats.certificados}.`),
      h('p', {}, `Rebases ${estado.stats.rebases} · consultas ${estado.stats.consultas} · réplicas ${estado.stats.replicas}.`),
      h('p', {}, `Ensaios ${estado.stats.ensaios} · discos ${estado.stats.discos} · páginas ${estado.stats.paginas}.`),
      h('p', {}, `Squash ${estado.stats.squashes} · circuitos ${estado.stats.circuitos} · jobs ${estado.stats.jobs}.`),
      h('p', {}, `Colheitas ${estado.stats.colheitas} · sessões ${estado.stats.sessoes} · tanques ${estado.stats.tanques}.`),
      h('p', {}, `Sondas ${estado.stats.sondas} · sementes ${estado.stats.sementes} · registros ${estado.stats.registros}.`),
      h('p', {}, `Rastros ${estado.stats.rastros} · paradas ${estado.stats.paradas} · pods ${estado.stats.pods}.`),
      h('p', {}, `Lints ${estado.stats.lints} · origens ${estado.stats.origens} · links ${estado.stats.links}.`),
      h('p', {}, `Processadores ${estado.stats.cpus} · cópias ${estado.stats.copias} · estouros ${estado.stats.estouros}.`),
      h('p', {}, `Impasses ${estado.stats.impasses} · domínios ${estado.stats.dominios} · cartas mortas ${estado.stats.mortas}.`),
      h('p', {}, `Ponteiros ${estado.stats.ponteiros} · eleições ${estado.stats.eleicoes} · freios ${estado.stats.freios}.`),
      h('p', {}, `Pausas ${estado.stats.pausas} · derivas ${estado.stats.derivas} · descritores ${estado.stats.descritores}.`),
      h('p', {}, `Reservas ${estado.stats.reservas} · varreduras ${estado.stats.varreduras} · portas ${estado.stats.portas}.`),
      h('p', {}, `Inodos ${estado.stats.inodos} · saídas ${estado.stats.saidas} · manadas ${estado.stats.manadas}.`),
      h('p', {}, `Gotejos ${estado.stats.gotejos} · frios ${estado.stats.frios} · cadeados ${estado.stats.cadeados}.`),
      h('p', {}, lembreteMeta(contarFaladas(estado.painel, hojeIso), estado.metaFala, hojeIso))
    ),
    erros.length
      ? h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, 'Erros que mais voltam'),
        ...erros.map(e => h('div', { class: 'painel-erro' },
          h('div', { class: 'fala-en', lang: 'en' }, e.en),
          e.pt ? h('div', { class: 'fala-pt' }, e.pt) : ''
        ))
      )
      : '',
    h('button', { class: 'btn btn-branco', type: 'button', onclick: telaNivel }, 'TESTE DE NÍVEL')
  );
  focarTela();
}

function aplicarFonte(valor) {
  const grande = valor === 'grande';
  if (grande) document.documentElement.dataset.fonte = 'grande';
  else delete document.documentElement.dataset.fonte;
  try {
    if (grande) localStorage.setItem('gringolingo:fonte', 'grande');
    else localStorage.removeItem('gringolingo:fonte');
  } catch {}
}

function cartaoFonte() {
  const grande = document.documentElement.dataset.fonte === 'grande';
  return h('div', { class: 'card' },
    h('div', { class: 'nivel-titulo' }, '🔤 Tamanho do texto'),
    h('p', {}, 'O maior ajuda a ler no celular. O tema escuro continua valendo.'),
    h('div', { class: 'fila-botoes' },
      h('button', {
        class: 'btn ' + (grande ? 'btn-branco' : 'btn-verde'),
        type: 'button',
        onclick() {
          aplicarFonte('normal');
          telaPerfil();
        }
      }, 'NORMAL'),
      h('button', {
        class: 'btn ' + (grande ? 'btn-verde' : 'btn-branco'),
        type: 'button',
        onclick() {
          aplicarFonte('grande');
          telaPerfil();
        }
      }, 'MAIOR')
    ),
    h('p', { class: 'ia-aviso' }, 'Nas escolhas, as teclas 1, 2 e 3 marcam a opção. Enter segue em frente.')
  );
}

function ligarTeclasDaFala() {
  if (atalhosAtivos) document.removeEventListener('keydown', atalhosAtivos);
  atalhosAtivos = e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
    const tag = document.activeElement?.tagName;
    const digitando = tag === 'INPUT' || tag === 'TEXTAREA';
    if (e.key === 'Escape') {
      const voltar = document.querySelector('.topo button');
      if (voltar) {
        e.preventDefault();
        voltar.click();
      }
      return;
    }
    if (e.key === 'Enter' && !digitando) {
      const seguir = document.querySelector('#app .btn-verde:not(:disabled)');
      if (seguir) {
        e.preventDefault();
        seguir.click();
      }
      return;
    }
    if (digitando) return;
    const n = Number(e.key);
    if (n >= 1 && n <= 9) {
      const opcao = document.querySelectorAll('#app .opcoes .opcao')[n - 1];
      if (opcao) {
        e.preventDefault();
        opcao.click();
      }
    }
  };
  document.addEventListener('keydown', atalhosAtivos);
}

function descartarVoz() {
  vozGeracao++;
  if (vozTimer) {
    clearTimeout(vozTimer);
    vozTimer = null;
  }
  const rec = gravadorAtivo;
  gravadorAtivo = null;
  if (rec) {
    try { rec.stream?.getTracks().forEach(trilha => trilha.stop()); } catch {}
    try { if (rec.state !== 'inactive') rec.stop(); } catch {}
  }
  gravacaoUrl = soltarUrl(gravacaoUrl);
}

function finalizarGravacao() {
  const rec = gravadorAtivo;
  if (!rec || rec.state === 'inactive') return Promise.resolve();
  return new Promise(resolve => {
    rec.addEventListener('stop', () => resolve(), { once: true });
    try { rec.stop(); } catch { resolve(); }
  });
}

function tocarGravacao(status) {
  if (!gravacaoUrl) {
    status.textContent = 'Grave uma tentativa para ouvir a sua voz.';
    return;
  }
  const audio = new Audio(gravacaoUrl);
  audio.play().catch(() => {
    status.textContent = 'Não consegui tocar a gravação.';
  });
}

function pintarBotaoGravacao(botao, gravando) {
  const rotulo = gravando ? rotuloGravacao(true) : rotuloGravacao(false);
  botao.textContent = rotulo.texto;
  botao.setAttribute('aria-pressed', rotulo.pressionado);
  botao.setAttribute('aria-label', rotulo.rotulo);
  return rotulo;
}

async function comecarGravacao(botao, status) {
  if (gravadorAtivo && gravadorAtivo.state === 'recording') {
    await finalizarGravacao();
    return;
  }
  if (!podeGravar()) {
    status.textContent = 'Este navegador não grava áudio. Dá para escrever e ouvir o modelo.';
    return;
  }
  const geracao = vozGeracao;
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    if (geracao !== vozGeracao) return;
    status.textContent = 'O microfone não abriu. Dá para escrever e ouvir o modelo.';
    return;
  }
  if (geracao !== vozGeracao) {
    stream.getTracks().forEach(trilha => trilha.stop());
    return;
  }
  let rec;
  try {
    const mime = typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : '';
    rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
  } catch {
    stream.getTracks().forEach(trilha => trilha.stop());
    status.textContent = 'Não deu para gravar neste aparelho.';
    return;
  }
  const pedacos = [];
  rec.ondataavailable = ev => { if (ev.data?.size) pedacos.push(ev.data); };
  rec.onstop = () => {
    stream.getTracks().forEach(trilha => trilha.stop());
    if (geracao !== vozGeracao) return;
    gravadorAtivo = null;
    if (vozTimer) {
      clearTimeout(vozTimer);
      vozTimer = null;
    }
    const blob = new Blob(pedacos, { type: rec.mimeType || 'audio/webm' });
    const parado = rotuloGravacao(false);
    pintarBotaoGravacao(botao, false);
    if (!blob.size) {
      status.textContent = 'Não deu para gravar.';
      return;
    }
    gravacaoUrl = soltarUrl(gravacaoUrl);
    gravacaoUrl = urlDaGravacao(blob);
    status.textContent = parado.aviso;
  };
  gravadorAtivo = rec;
  rec.start();
  const gravando = rotuloGravacao(true);
  pintarBotaoGravacao(botao, true);
  status.textContent = gravando.aviso;
  vozTimer = setTimeout(() => {
    if (gravadorAtivo === rec && rec.state === 'recording') rec.stop();
  }, LIMITE_GRAVACAO_MS);
}

function barraGravar(status) {
  if (!podeGravar()) {
    return h('p', { class: 'ia-aviso' }, 'Este navegador não grava áudio. Dá para escrever e ouvir o modelo depois.');
  }
  const botao = h('button', {
    class: 'btn btn-branco',
    type: 'button',
    'aria-pressed': rotuloGravacao(false).pressionado,
    'aria-label': rotuloGravacao(false).rotulo
  }, rotuloGravacao(false).texto);
  botao.addEventListener('click', () => { comecarGravacao(botao, status); });
  return h('div', {},
    h('p', { class: 'ia-aviso' }, 'Grave a tentativa para comparar com o modelo. O áudio fica só nesta tela.'),
    botao
  );
}

function barraModelo(frase, status) {
  return h('div', { class: 'fila-botoes' },
    h('button', {
      class: 'btn btn-branco',
      type: 'button',
      disabled: !gravacaoUrl,
      onclick: () => tocarGravacao(status)
    }, 'MINHA VOZ'),
    h('button', { class: 'btn btn-branco', type: 'button', onclick: () => falar(frase) }, 'MODELO')
  );
}

function novaCena(cena) {
  return {
    cena,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
}

function concluirCena(sessao, registrar, cfg) {
  if (!sessao || sessao.concluido) return pintarFim(sessao?.fim);
  const total = sessao.cena.rodadas.length;
  const nota = fecharNota(sessao.notas);
  const xp = cfg.xpBase + sessao.acertos * cfg.xpAcerto;
  const evento = registrar({
    xp,
    acertos: sessao.acertos,
    respostas: total,
    nota,
    errosFala: sessao.erros,
    perfeita: false,
    comboMax: 0
  });
  sessao.concluido = true;
  sessao.fim = {
    titulo: cfg.titulo,
    sub: typeof cfg.sub === 'function' ? cfg.sub(nota) : sessao.cena.titulo,
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: cfg.destino,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(sessao.fim);
}

function pintarCenaFala(sessao, cfg) {
  if (!sessao || sessao.concluido) return cfg.aoLista();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = cfg.rota;
  registrarRota(cfg.rota);
  const cena = sessao.cena;
  const rodada = cena.rodadas[sessao.i];
  const campo = campoResposta('Escreva em inglês...');
  const ouvirNpc = () => falar(rodada.npc.en);
  app.innerHTML = '';
  const miolo = [
    topoVoltar(cena.emoji + ' ' + cena.titulo, cfg.aoLista),
    h('div', { class: 'revisao-sub', role: 'status', 'aria-live': 'polite' }, cfg.rotulo(sessao)),
    h('div', { class: 'fala fala-npc' },
      h('div', { class: 'fala-en', lang: 'en' }, rodada.npc.en),
      h('div', { class: 'fala-pt' }, rodada.npc.pt)
    )
  ];
  if (sessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(sessao.feedback));
    miolo.push(barraModelo(sessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      type: 'button',
      onclick() {
        if (sessao.i + 1 >= cena.rodadas.length) cfg.aoConcluir();
        else {
          descartarVoz();
          sessao.i++;
          sessao.feedback = null;
          cfg.repintar();
        }
      }
    }, sessao.i + 1 >= cena.rodadas.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    if (rodada.segundos) {
      miolo.push(h('div', {
        class: 'cronometro-demo',
        'data-cronometro-demo': '1',
        role: 'timer',
        'aria-label': 'Tempo da fala'
      }, formatarMinuto(rodada.segundos)));
      miolo.push(h('p', { class: 'ia-aviso' }, 'Um minuto para apresentar. Quando zerar, ainda dá para enviar.'));
    }
    miolo.push(h('p', { class: 'sombra-frase' }, rodada.missao));
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', type: 'button', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || sessao.feedback) return;
      await finalizarGravacao();
      const aval = cfg.avaliar(rodada, campo.entrada.value);
      sessao.notas.push(aval.nota);
      if (aval.ok) {
        sessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        sessao.erros.push({ en: aval.melhor, pt: rodada.missao });
      }
      sessao.feedback = aval;
      cfg.repintar();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', () => { enviar(); });
    miolo.push(verificar);
    timerDeTela(ouvirNpc, 280);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (!sessao.feedback) campo.entrada.focus();
  if (!sessao.feedback && rodada.segundos) ligarCronometroDemo(rodada.segundos);
}

function listarCena(rota, titulo, aviso, lista, abrir, zerar) {
  zerar(null);
  telaListaFala(rota, titulo, aviso, preferirNivel(lista, estado.nivelFala), abrir);
}

function abrirCenaLista(id, porId, guardar, pintar, aoLista) {
  const cena = porId(id);
  if (!cena) return aoLista();
  descartarVoz();
  guardar(novaCena(cena));
  pintar();
}

function pintarCenaLista(sessao, cfg) {
  pintarCenaFala(sessao, {
    rota: cfg.rota,
    aoLista: cfg.aoLista,
    repintar: cfg.repintar,
    avaliar: cfg.avaliar,
    rotulo: cfg.rotulo || rotuloCall,
    aoConcluir: () => concluirCena(sessao, cfg.registrar, {
      xpBase: cfg.xpBase ?? 10,
      xpAcerto: cfg.xpAcerto ?? 8,
      titulo: cfg.tituloFim,
      destino: cfg.aoLista,
      sub: cfg.sub
    })
  });
}

function telaTecnicos() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'tecnico';
  registrarRota('tecnico');
  tecnicoSessao = null;
  const lista = preferirNivel(CENAS_TECNICAS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('💻 Inglês de trabalho', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Standup, bug, review, entrevista e demo. Grave a sua voz e compare com o modelo depois da tentativa. Nada é enviado.'),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrirTecnico(c.id)))
  );
  focarTela();
}

function abrirTecnico(id) {
  const cena = cenaTecnicaPorId(id);
  if (!cena) return telaTecnicos();
  descartarVoz();
  tecnicoSessao = novaCena(cena);
  pintarTecnico();
}

function pintarTecnico() {
  pintarCenaFala(tecnicoSessao, {
    rota: 'tecnico',
    aoLista: telaTecnicos,
    repintar: pintarTecnico,
    avaliar: avaliarTecnico,
    rotulo: s => `Turno ${s.i + 1} de ${s.cena.rodadas.length} · ${s.cena.nivel}`,
    aoConcluir: () => concluirCena(tecnicoSessao, registrarTecnico, {
      xpBase: 10,
      xpAcerto: 8,
      titulo: 'Cena de trabalho feita!',
      destino: telaTecnicos
    })
  });
}

function telaIdiomas() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'idioma';
  registrarRota('idioma');
  idiomaSessao = null;
  const lista = preferirNivel(IDIOMAS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🤝 Idioms de reunião', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Frases curtas de call remota. O jeito melhor só aparece depois da tentativa.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirIdioma() }, 'TREINAR 4'),
    ...lista.map(item => cartaoComNivel(item, item.pt, () => abrirIdioma(item.id)))
  );
  focarTela();
}

function abrirIdioma(id) {
  const fila = filaAdaptada(IDIOMAS, id, idiomaPorId);
  if (!fila.length) return telaIdiomas();
  descartarVoz();
  idiomaSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarIdioma();
}

function pintarIdioma() {
  if (!idiomaSessao || idiomaSessao.concluido) return telaIdiomas();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'idioma';
  registrarRota('idioma');
  const item = idiomaSessao.fila[idiomaSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  app.innerHTML = '';
  const miolo = [
    topoVoltar(item.emoji + ' ' + item.titulo, () => telaIdiomas()),
    h('div', { class: 'revisao-sub' }, `Frase ${idiomaSessao.i + 1} de ${idiomaSessao.fila.length} · ${item.nivel}`),
    h('p', { class: 'sombra-frase' }, item.pt),
    h('p', { class: 'ia-aviso' }, item.uso)
  ];
  if (idiomaSessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(idiomaSessao.feedback));
    miolo.push(barraModelo(idiomaSessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (idiomaSessao.i + 1 >= idiomaSessao.fila.length) concluirIdioma();
        else {
          descartarVoz();
          idiomaSessao.i++;
          idiomaSessao.feedback = null;
          pintarIdioma();
        }
      }
    }, idiomaSessao.i + 1 >= idiomaSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || idiomaSessao.feedback) return;
      await finalizarGravacao();
      const aval = avaliarIdioma(item, campo.entrada.value);
      idiomaSessao.notas.push(aval.nota);
      if (aval.ok) {
        idiomaSessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        idiomaSessao.erros.push({ en: aval.melhor, pt: item.pt });
      }
      idiomaSessao.feedback = aval;
      pintarIdioma();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', () => { enviar(); });
    miolo.push(verificar);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (!idiomaSessao.feedback) campo.entrada.focus();
}

function concluirIdioma() {
  if (!idiomaSessao || idiomaSessao.concluido) return pintarFim(idiomaSessao?.fim);
  const total = idiomaSessao.fila.length;
  const nota = fecharNota(idiomaSessao.notas);
  const xp = 8 + idiomaSessao.acertos * 6;
  const evento = registrarIdioma({
    xp,
    acertos: idiomaSessao.acertos,
    respostas: total,
    nota,
    errosFala: idiomaSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  idiomaSessao.concluido = true;
  idiomaSessao.fim = {
    titulo: 'Idioms da call!',
    sub: 'Frases curtas de reunião',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaIdiomas,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(idiomaSessao.fim);
}

function cartaoPerguntaDia() {
  const feito = estado.perguntaDia === diaLocalAgora();
  return h('button', { class: 'card revisao dia-atalho', onclick: telaPerguntaDia },
    h('span', { class: 'revisao-emoji' }, '☀️'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, feito ? 'Pergunta do dia feita' : 'Pergunta do dia'),
      h('div', { class: 'revisao-sub' }, feito
        ? 'Feita hoje. Amanhã vem outra, com uma segunda pergunta.'
        : 'Uma pergunta de trabalho e outra em seguida.')
    ),
    h('span', { class: 'revisao-seta' }, feito ? '✓' : '›')
  );
}

function telaPerguntaDia() {
  descartarVoz();
  diaSessao = novaCena(perguntaDoDia(diaLocalAgora()));
  pintarPerguntaDia();
}

function pintarPerguntaDia() {
  pintarCenaFala(diaSessao, {
    rota: 'dia',
    aoLista: () => {
      descartarVoz();
      voltarTela(telaInicial);
    },
    repintar: pintarPerguntaDia,
    avaliar: avaliarDia,
    rotulo: s => (s.i === 0 ? `Pergunta do dia · ${s.cena.nivel}` : `Pergunta seguinte · ${s.cena.nivel}`),
    aoConcluir: () => concluirCena(diaSessao, registrarPerguntaDia, {
      xpBase: 10,
      xpAcerto: 8,
      titulo: 'Pergunta do dia feita!',
      destino: telaInicial
    })
  });
}

function cartaoDeslizes() {
  const n = deslizesVencidos().length;
  if (!n) return '';
  return h('button', { class: 'card revisao', onclick: telaDeslizes },
    h('span', { class: 'revisao-emoji' }, '🔁'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Deslizes de fala'),
      h('div', { class: 'revisao-sub' }, `${n} frase${n > 1 ? 's' : ''} para repetir hoje.`)
    ),
    h('span', { class: 'revisao-seta' }, '›')
  );
}

function telaDeslizes() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'deslize';
  registrarRota('deslize');
  deslizeSessao = null;
  const fila = deslizesVencidos();
  const agenda = estado.agendaFala && typeof estado.agendaFala === 'object' ? estado.agendaFala : {};
  const esperando = Math.max(0, Object.keys(agenda).length - fila.length);
  app.innerHTML = '';
  app.append(
    topoVoltar('🔁 Deslizes de fala', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Quando uma frase escapa, ela volta aqui. Acertar empurra a data. Errar traz para amanhã. Vale diálogo, sombra, trabalho, história e o resto.'),
    fila.length
      ? h('button', { class: 'btn btn-verde', onclick: abrirDeslizes }, `REVISAR ${fila.length}`)
      : h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, 'Nada vencendo hoje'),
        h('p', {}, esperando
          ? `${esperando} frase${esperando > 1 ? 's' : ''} já ficou para outro dia.`
          : 'Erre uma frase numa cena e ela aparece aqui.')
      ),
    ...fila.map(item => h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, item.pt || 'Frase para repetir'),
      h('span', { class: 'pilula' }, `${item.n} vez${item.n > 1 ? 'es' : ''}`)
    ))
  );
  focarTela();
}

function abrirDeslizes() {
  const fila = deslizesVencidos().slice(0, 6);
  if (!fila.length) return telaDeslizes();
  descartarVoz();
  deslizeSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarDeslize();
}

function pintarDeslize() {
  if (!deslizeSessao || deslizeSessao.concluido) return telaDeslizes();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'deslize';
  registrarRota('deslize');
  const item = deslizeSessao.fila[deslizeSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  app.innerHTML = '';
  const miolo = [
    topoVoltar('🔁 Deslizes de fala', () => telaDeslizes()),
    h('div', { class: 'revisao-sub' }, `Frase ${deslizeSessao.i + 1} de ${deslizeSessao.fila.length}`),
    h('p', { class: 'sombra-frase' }, item.pt || 'Diga a frase de novo.')
  ];
  if (deslizeSessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(deslizeSessao.feedback));
    miolo.push(barraModelo(deslizeSessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (deslizeSessao.i + 1 >= deslizeSessao.fila.length) concluirDeslize();
        else {
          descartarVoz();
          deslizeSessao.i++;
          deslizeSessao.feedback = null;
          pintarDeslize();
        }
      }
    }, deslizeSessao.i + 1 >= deslizeSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || deslizeSessao.feedback) return;
      await finalizarGravacao();
      const aval = avaliarDeslize(item, campo.entrada.value);
      revisarDeslize(item.en, aval.ok);
      deslizeSessao.notas.push(aval.nota);
      if (aval.ok) {
        deslizeSessao.acertos++;
        sons.acerto();
      } else sons.erro();
      deslizeSessao.feedback = aval;
      pintarDeslize();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', () => { enviar(); });
    miolo.push(verificar);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (!deslizeSessao.feedback) campo.entrada.focus();
}

function concluirDeslize() {
  if (!deslizeSessao || deslizeSessao.concluido) return pintarFim(deslizeSessao?.fim);
  const total = deslizeSessao.fila.length;
  const nota = fecharNota(deslizeSessao.notas);
  const xp = 8 + deslizeSessao.acertos * 6;
  const evento = registrarDeslize({
    xp,
    acertos: deslizeSessao.acertos,
    respostas: total,
    nota,
    errosFala: [],
    perfeita: false,
    comboMax: 0
  });
  deslizeSessao.concluido = true;
  deslizeSessao.fim = {
    titulo: 'Deslizes revisados!',
    sub: 'As certas foram para outro dia',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaDeslizes,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(deslizeSessao.fim);
}

function infoEspaco() {
  return filaEspacada({
    erros: estado.errosFala,
    agenda: estado.agendaFala,
    hoje: diaLocalAgora()
  });
}

function telaEspacos() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'espaco';
  registrarRota('espaco');
  espacoSessao = null;
  const info = infoEspaco();
  const fila = info.fila;
  app.innerHTML = '';
  app.append(
    topoVoltar('🔂 Mais erradas', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Entram as frases que você errou duas vezes ou mais. Acertar empurra a data. Errar traz para amanhã. A frase modelo só aparece depois de um erro.'),
    fila.length
      ? h('button', { class: 'btn btn-verde', type: 'button', onclick: abrirEspaco }, `REVISAR ${fila.length}`)
      : h('div', { class: 'card' },
        h('div', { class: 'nivel-titulo' }, info.esperando ? 'Nada vencendo hoje' : 'Nenhuma frase repetida'),
        h('p', {}, info.esperando
          ? `${info.esperando} frase${info.esperando > 1 ? 's' : ''} com vários erros esperam outro dia.`
          : 'Erre a mesma frase duas vezes numa fala e ela entra aqui.')
      ),
    ...fila.map((item, i) => h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, item.pt || 'Frase para repetir'),
      h('span', { class: 'pilula' }, `${i + 1}ª · ${item.n} erro${item.n > 1 ? 's' : ''}`)
    ))
  );
  focarTela();
}

function abrirEspaco() {
  const fila = infoEspaco().fila.slice(0, 6);
  if (!fila.length) return telaEspacos();
  for (const item of fila) marcarEspaco(item.en, item.pt);
  descartarVoz();
  espacoSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    quando: '',
    concluido: false,
    fim: null
  };
  pintarEspaco();
}

function pintarEspaco() {
  if (!espacoSessao || espacoSessao.concluido) return telaEspacos();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'espaco';
  registrarRota('espaco');
  const item = espacoSessao.fila[espacoSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  app.innerHTML = '';
  const miolo = [
    topoVoltar('🔂 Mais erradas', () => telaEspacos()),
    h('div', { class: 'revisao-sub' }, `Frase ${espacoSessao.i + 1} de ${espacoSessao.fila.length} · ${item.n} erros`),
    h('p', { class: 'sombra-frase' }, item.pt || 'Diga a frase de novo.')
  ];
  if (espacoSessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(espacoSessao.feedback));
    if (espacoSessao.quando) miolo.push(h('p', { class: 'revisao-sub' }, espacoSessao.quando));
    miolo.push(barraModelo(espacoSessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      type: 'button',
      onclick() {
        if (espacoSessao.i + 1 >= espacoSessao.fila.length) concluirEspaco();
        else {
          descartarVoz();
          espacoSessao.i++;
          espacoSessao.feedback = null;
          espacoSessao.quando = '';
          pintarEspaco();
        }
      }
    }, espacoSessao.i + 1 >= espacoSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', type: 'button', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || espacoSessao.feedback) return;
      await finalizarGravacao();
      const aval = avaliarDeslize(item, campo.entrada.value);
      const dias = aval.ok ? diasAoAcertar(item.caixa, INTERVALOS) : 1;
      revisarDeslize(item.en, aval.ok);
      espacoSessao.notas.push(aval.nota);
      espacoSessao.quando = textoVolta(dias);
      if (aval.ok) {
        espacoSessao.acertos++;
        sons.acerto();
      } else sons.erro();
      espacoSessao.feedback = aval;
      pintarEspaco();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', () => { enviar(); });
    miolo.push(verificar);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (!espacoSessao.feedback) campo.entrada.focus();
}

function concluirEspaco() {
  if (!espacoSessao || espacoSessao.concluido) return pintarFim(espacoSessao?.fim);
  const total = espacoSessao.fila.length;
  const nota = fecharNota(espacoSessao.notas);
  const xp = 8 + espacoSessao.acertos * 6;
  const evento = registrarEspaco({
    xp,
    acertos: espacoSessao.acertos,
    respostas: total,
    nota,
    errosFala: [],
    perfeita: false,
    comboMax: 0
  });
  espacoSessao.concluido = true;
  espacoSessao.fim = {
    titulo: 'Revisão feita!',
    sub: 'As certas foram para outro dia',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaEspacos,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(espacoSessao.fim);
}

function telaRemoto() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'remoto';
  registrarRota('remoto');
  remotoSessao = null;
  app.innerHTML = '';
  app.append(
    topoVoltar('🎤 Entrevista longa', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Seis falas seguidas, para uma vaga full stack e remota. A frase modelo só aparece depois da tentativa.'),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, ENTREVISTA.onde),
      h('p', {}, 'Você se apresenta, conta um projeto, um bug, o trabalho remoto, sugere uma mudança e faz uma pergunta.')
    ),
    h('button', { class: 'btn btn-verde', onclick: abrirRemoto }, 'COMEÇAR')
  );
  focarTela();
}

function abrirRemoto() {
  descartarVoz();
  remotoSessao = novaCena(ENTREVISTA);
  pintarRemoto();
}

function pintarRemoto() {
  pintarCenaFala(remotoSessao, {
    rota: 'remoto',
    aoLista: telaRemoto,
    repintar: pintarRemoto,
    avaliar: avaliarEntrevista,
    rotulo: s => `Fala ${s.i + 1} de ${s.cena.rodadas.length}`,
    aoConcluir: () => concluirCena(remotoSessao, registrarEntrevista, {
      xpBase: 10,
      xpAcerto: 6,
      titulo: 'Entrevista feita!',
      destino: telaRemoto
    })
  });
}

function telaContos() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'conto';
  registrarRota('conto');
  contoSessao = null;
  const lista = preferirNivel(CONTOS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('📖 Contar no passado', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Duas falas por história. O passado fica na sua resposta. A frase modelo só aparece depois.'),
    ...lista.map(c => cartaoComNivel(c, c.rodadas[0].missao, () => abrirConto(c.id)))
  );
  focarTela();
}

function abrirConto(id) {
  const cena = contoPorId(id);
  if (!cena) return telaContos();
  descartarVoz();
  contoSessao = novaCena(cena);
  pintarConto();
}

function pintarConto() {
  pintarCenaFala(contoSessao, {
    rota: 'conto',
    aoLista: telaContos,
    repintar: pintarConto,
    avaliar: avaliarConto,
    rotulo: s => `Fala ${s.i + 1} de ${s.cena.rodadas.length} · ${s.cena.nivel}`,
    aoConcluir: () => concluirCena(contoSessao, registrarConto, {
      xpBase: 10,
      xpAcerto: 8,
      titulo: 'História contada!',
      destino: telaContos
    })
  });
}

function telaNumeros() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'numero';
  registrarRota('numero');
  numeroSessao = null;
  const lista = preferirNivel(NUMEROS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🔢 Números, datas e preços', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'A voz é a do aparelho. O valor escrito só aparece depois da escolha.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirNumero() }, 'TREINAR 4'),
    ...lista.map(item => cartaoComNivel(item, item.pergunta, () => abrirNumero(item.id)))
  );
  focarTela();
}

function abrirNumero(id) {
  const fila = filaAdaptada(NUMEROS, id, numeroPorId);
  if (!fila.length) return telaNumeros();
  numeroSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    ouviu: !temTts,
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarNumero();
}

function pintarNumero() {
  if (!numeroSessao || numeroSessao.concluido) return telaNumeros();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'numero';
  registrarRota('numero');
  const item = numeroSessao.fila[numeroSessao.i];
  const ouvir = taxa => falar(item.fala, taxa);
  const controles = temTts
    ? h('div', { class: 'fila-botoes' },
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_NORMAL) }, 'OUVIR'),
      h('button', { class: 'btn btn-branco', type: 'button', onclick: () => ouvir(TAXA_DEVAGAR) }, 'DEVAGAR')
    )
    : '';
  app.innerHTML = '';
  const miolo = [
    topoVoltar(item.emoji + ' ' + item.titulo, () => telaNumeros()),
    h('div', { class: 'revisao-sub' }, `Item ${numeroSessao.i + 1} de ${numeroSessao.fila.length} · ${item.nivel}`)
  ];
  if (!numeroSessao.ouviu && !numeroSessao.feedback) {
    miolo.push(h('p', { class: 'ia-aviso' }, 'Ouça primeiro. A frase escrita fica para depois.'));
    miolo.push(controles);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        numeroSessao.ouviu = true;
        pintarNumero();
      }
    }, 'JÁ OUVI'));
    timerDeTela(() => ouvir(TAXA_NORMAL), 280);
  } else if (!numeroSessao.feedback) {
    if (!temTts) {
      miolo.push(h('p', { class: 'sombra-frase', lang: 'en' }, item.fala));
      miolo.push(h('p', { class: 'ia-aviso' }, 'Sem voz neste aparelho. Leia e escolha.'));
    } else miolo.push(controles);
    miolo.push(h('p', { class: 'sombra-frase' }, item.pergunta));
    miolo.push(h('p', { class: 'ia-aviso' }, 'Teclas 1, 2 e 3 escolhem a opção.'));
    miolo.push(h('div', { class: 'opcoes' }, item.opcoes.map((texto, indice) => h('button', {
      class: 'opcao',
      type: 'button',
      lang: 'en',
      onclick() {
        if (numeroSessao.feedback) return;
        const ok = corrigirIndice(item, indice);
        numeroSessao.notas.push(ok ? 100 : 0);
        if (ok) {
          numeroSessao.acertos++;
          sons.acerto();
        } else {
          sons.erro();
          numeroSessao.erros.push({ en: item.fala, pt: item.pergunta });
        }
        numeroSessao.feedback = { ok };
        pintarNumero();
      }
    }, texto))));
  } else {
    miolo.push(h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, numeroSessao.feedback.ok ? 'Isso.' : 'Era outro valor.'),
      h('p', {}, item.dica),
      h('p', { lang: 'en' }, 'Você ouviu: ', h('strong', {}, item.fala))
    ));
    if (temTts) miolo.push(controles);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (numeroSessao.i + 1 >= numeroSessao.fila.length) concluirNumero();
        else {
          numeroSessao.i++;
          numeroSessao.ouviu = !temTts;
          numeroSessao.feedback = null;
          pintarNumero();
        }
      }
    }, numeroSessao.i + 1 >= numeroSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMO'));
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
}

function concluirNumero() {
  if (!numeroSessao || numeroSessao.concluido) return pintarFim(numeroSessao?.fim);
  const total = numeroSessao.fila.length;
  const nota = fecharNota(numeroSessao.notas);
  const xp = 8 + numeroSessao.acertos * 6;
  const evento = registrarNumero({
    xp,
    acertos: numeroSessao.acertos,
    respostas: total,
    nota,
    errosFala: numeroSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  numeroSessao.concluido = true;
  numeroSessao.fim = {
    titulo: 'Ouvido afiado!',
    sub: 'Números, datas e preços',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaNumeros,
    painel: true,
    resumo: true
  };
  pintarFim(numeroSessao.fim);
}

function rotuloCall(s) {
  const etapa = s.cena.rodadas[s.i].etapa;
  const fala = `Fala ${s.i + 1} de ${s.cena.rodadas.length}`;
  return etapa ? `${etapa} · ${fala} · ${s.cena.nivel}` : `${fala} · ${s.cena.nivel}`;
}

function telaRelatos() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'relato';
  registrarRota('relato');
  relatoSessao = null;
  const lista = preferirNivel(RELATOS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🐛 Relatar um bug', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Três falas, nesta ordem: como repetir, a causa e a correção. A frase modelo só aparece depois.'),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrirRelato(c.id)))
  );
  focarTela();
}

function abrirRelato(id) {
  abrirCenaLista(id, relatoPorId, cena => { relatoSessao = cena; }, pintarRelato, telaRelatos);
}

function pintarRelato() {
  pintarCenaLista(relatoSessao, {
    rota: 'relato',
    aoLista: telaRelatos,
    repintar: pintarRelato,
    avaliar: avaliarRelato,
    registrar: registrarRelato,
    tituloFim: 'Bug relatado!'
  });
}

function telaCortesias() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'cortesia';
  registrarRota('cortesia');
  cortesiaSessao = null;
  const lista = preferirNivel(CORTESIAS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🙏 Review com educação', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Primeiro você comenta. Depois agradece um comentário. A frase modelo só aparece depois.'),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrirCortesia(c.id)))
  );
  focarTela();
}

function abrirCortesia(id) {
  abrirCenaLista(id, cortesiaPorId, cena => { cortesiaSessao = cena; }, pintarCortesia, telaCortesias);
}

function pintarCortesia() {
  pintarCenaLista(cortesiaSessao, {
    rota: 'cortesia',
    aoLista: telaCortesias,
    repintar: pintarCortesia,
    avaliar: avaliarCortesia,
    registrar: registrarCortesia,
    tituloFim: 'Review educado!'
  });
}

function telaAquecer() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'aquecer';
  registrarRota('aquecer');
  aquecerSessao = null;
  const lista = preferirNivel(AQUECIMENTOS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('☕ Antes da reunião', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Um papo curto de fim de semana, clima ou viagem. Duas falas, e a frase modelo só aparece depois.'),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrirAquecer(c.id)))
  );
  focarTela();
}

function abrirAquecer(id) {
  abrirCenaLista(id, aquecerPorId, cena => { aquecerSessao = cena; }, pintarAquecer, telaAquecer);
}

function pintarAquecer() {
  pintarCenaLista(aquecerSessao, {
    rota: 'aquecer',
    aoLista: telaAquecer,
    repintar: pintarAquecer,
    avaliar: avaliarAquecer,
    registrar: registrarAquecer,
    tituloFim: 'Papo feito!'
  });
}

function telaClaros() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'claro';
  registrarRota('claro');
  claroSessao = null;
  const lista = preferirNivel(CLAROS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🔎 Esclarecer', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Peça para repetir, fale mais devagar ou confirme o que você entendeu. A frase em inglês só aparece depois.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirClaro() }, 'TREINAR 4'),
    ...lista.map(item => cartaoComNivel(item, item.pt, () => abrirClaro(item.id)))
  );
  focarTela();
}

function abrirClaro(id) {
  const fila = filaAdaptada(CLAROS, id, claroPorId);
  if (!fila.length) return telaClaros();
  descartarVoz();
  claroSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarClaro();
}

function pintarClaro() {
  if (!claroSessao || claroSessao.concluido) return telaClaros();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'claro';
  registrarRota('claro');
  const item = claroSessao.fila[claroSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  app.innerHTML = '';
  const miolo = [
    topoVoltar(item.emoji + ' ' + item.titulo, () => telaClaros()),
    h('div', { class: 'revisao-sub' }, `Frase ${claroSessao.i + 1} de ${claroSessao.fila.length} · ${item.nivel}`),
    h('p', { class: 'sombra-frase' }, item.pt),
    h('p', { class: 'ia-aviso' }, item.uso)
  ];
  if (claroSessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(claroSessao.feedback));
    miolo.push(h('p', { class: 'fala-en', lang: 'en' }, claroSessao.feedback.melhor));
    miolo.push(barraModelo(claroSessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (claroSessao.i + 1 >= claroSessao.fila.length) concluirClaro();
        else {
          descartarVoz();
          claroSessao.i++;
          claroSessao.feedback = null;
          pintarClaro();
        }
      }
    }, claroSessao.i + 1 >= claroSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || claroSessao.feedback) return;
      await finalizarGravacao();
      const aval = avaliarClaro(item, campo.entrada.value);
      claroSessao.notas.push(aval.nota);
      if (aval.ok) {
        claroSessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        if (aval.melhor) claroSessao.erros.push({ en: aval.melhor, pt: item.pt });
      }
      claroSessao.feedback = aval;
      pintarClaro();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', () => { enviar(); });
    miolo.push(verificar);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (!claroSessao.feedback) campo.entrada.focus();
}

function concluirClaro() {
  if (!claroSessao || claroSessao.concluido) return pintarFim(claroSessao?.fim);
  const total = claroSessao.fila.length;
  const nota = fecharNota(claroSessao.notas);
  const xp = 8 + claroSessao.acertos * 4;
  const evento = registrarClaro({
    xp,
    acertos: claroSessao.acertos,
    respostas: total,
    nota,
    errosFala: claroSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  claroSessao.concluido = true;
  claroSessao.fim = {
    titulo: 'Pedido feito!',
    sub: 'Esclarecer',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaClaros,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(claroSessao.fim);
}

function fraseComFoco(item) {
  const foco = String(item.foco || '').toLowerCase();
  return h('p', { class: 'sombra-frase', lang: 'en' }, String(item.melhor || '').split(/(\s+)/).map(p => {
    const limpo = p.toLowerCase().replace(/[^a-z]/g, '');
    return limpo && limpo === foco ? h('strong', {}, p) : p;
  }));
}

function telaListaFala(rota, titulo, aviso, lista, abrir) {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = rota;
  registrarRota(rota);
  app.innerHTML = '';
  app.append(
    topoVoltar(titulo, () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, aviso),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrir(c.id)))
  );
  focarTela();
}

function cartaoPlano() {
  const plano = planoDaSemana({
    deslizes: deslizesVencidos().length,
    padroes: estado.padroes
  });
  return h('div', { class: 'card' },
    h('div', { class: 'nivel-titulo' }, 'Plano da semana'),
    h('p', {}, 'Treinos a partir do que já escapou na fala.'),
    ...plano.map(item => h('div', { class: 'plano-item' },
      h('div', { class: 'revisao-titulo' }, item.titulo),
      h('p', {}, item.porque),
      h('button', {
        class: 'btn btn-branco',
        type: 'button',
        'aria-label': nomeDoTreino(item.titulo),
        onclick: () => abrirPlano(item.id)
      }, 'TREINAR')
    ))
  );
}

function abrirPlano(id) {
  const destinos = {
    deslize: telaDeslizes,
    conto: telaContos,
    enfase: telaEnfases,
    claro: telaClaros,
    rapido: telaRapidos,
    livre: telaLivres
  };
  (destinos[id] || telaConversa)();
}

function telaDecisoes() {
  listarCena(
    'decisao',
    '🏗️ Decisão técnica',
    'Duas falas: a escolha e a troca. We went with e the trade-off. A frase modelo só aparece depois.',
    DECISOES,
    abrirDecisao,
    valor => { decisaoSessao = valor; }
  );
}

function abrirDecisao(id) {
  abrirCenaLista(id, decisaoPorId, cena => { decisaoSessao = cena; }, pintarDecisao, telaDecisoes);
}

function pintarDecisao() {
  pintarCenaLista(decisaoSessao, {
    rota: 'decisao',
    aoLista: telaDecisoes,
    repintar: pintarDecisao,
    avaliar: avaliarDecisao,
    registrar: registrarDecisao,
    tituloFim: 'Decisão explicada!'
  });
}

function telaPares() {
  listarCena(
    'par',
    '👥 Pair',
    'Narre o que você está fazendo e peça ajuda. A frase modelo só aparece depois.',
    PARES,
    abrirPar,
    valor => { parSessao = valor; }
  );
}

function abrirPar(id) {
  abrirCenaLista(id, parPorId, cena => { parSessao = cena; }, pintarPar, telaPares);
}

function pintarPar() {
  pintarCenaLista(parSessao, {
    rota: 'par',
    aoLista: telaPares,
    repintar: pintarPar,
    avaliar: avaliarPar,
    registrar: registrarPar,
    tituloFim: 'Ajuda pedida!'
  });
}

function telaPlantoes() {
  listarCena(
    'plantao',
    '🚨 Plantão',
    'Três falas: status, desculpa e o próximo passo. A frase modelo só aparece depois.',
    INCIDENTES,
    abrirPlantao,
    valor => { plantaoSessao = valor; }
  );
}

function abrirPlantao(id) {
  abrirCenaLista(id, incidentePorId, cena => { plantaoSessao = cena; }, pintarPlantao, telaPlantoes);
}

function pintarPlantao() {
  pintarCenaLista(plantaoSessao, {
    rota: 'plantao',
    aoLista: telaPlantoes,
    repintar: pintarPlantao,
    avaliar: avaliarIncidente,
    registrar: registrarPlantao,
    tituloFim: 'Plantão encerrado!'
  });
}

function cartaoHistorico(dias) {
  const maxTreinos = Math.max(1, ...dias.map(d => d.treinos));
  return h('div', { class: 'card' },
    h('div', { class: 'nivel-titulo' }, 'Últimos 14 dias'),
    h('p', {}, rotuloHistorico(dias)),
    h('div', { class: 'historico-fala', 'aria-hidden': 'true' },
      dias.map(d => h('div', { class: 'historico-col' },
        h('div', {
          class: 'historico-acerto' + (d.precisao == null ? ' historico-vazio' : ''),
          style: `height:${d.precisao == null ? 6 : Math.max(8, Math.round(d.precisao * 0.64))}px`
        }),
        h('div', {
          class: 'historico-treino' + (d.treinos ? '' : ' historico-vazio'),
          style: `height:${d.treinos ? Math.max(8, Math.round(d.treinos / maxTreinos * 48)) : 6}px`
        }),
        h('div', { class: 'historico-dia' }, d.data.slice(8))
      ))
    ),
    h('div', { class: 'historico-legenda' },
      h('span', {}, 'Verde: treinos'),
      h('span', {}, 'Azul: acerto')
    )
  );
}

function telaEstimativas() {
  listarCena(
    'estimativa',
    '⏳ Estimativa',
    'Duas falas: o prazo e a dúvida. It should take about e I am not sure yet. A frase modelo só aparece depois.',
    ESTIMATIVAS,
    abrirEstimativa,
    valor => { estimativaSessao = valor; }
  );
}

function abrirEstimativa(id) {
  abrirCenaLista(id, estimativaPorId, cena => { estimativaSessao = cena; }, pintarEstimativa, telaEstimativas);
}

function pintarEstimativa() {
  pintarCenaLista(estimativaSessao, {
    rota: 'estimativa',
    aoLista: telaEstimativas,
    repintar: pintarEstimativa,
    avaliar: avaliarEstimativa,
    registrar: registrarEstimativa,
    tituloFim: 'Prazo dito!'
  });
}

function telaConsensos() {
  listarCena(
    'consenso',
    '⚖️ Consenso',
    'Duas falas: discorde e proponha um meio-termo. A frase modelo só aparece depois.',
    CONSENSOS,
    abrirConsenso,
    valor => { consensoSessao = valor; }
  );
}

function abrirConsenso(id) {
  abrirCenaLista(id, consensoPorId, cena => { consensoSessao = cena; }, pintarConsenso, telaConsensos);
}

function pintarConsenso() {
  pintarCenaLista(consensoSessao, {
    rota: 'consenso',
    aoLista: telaConsensos,
    repintar: pintarConsenso,
    avaliar: avaliarConsenso,
    registrar: registrarConsenso,
    tituloFim: 'Meio-termo feito!'
  });
}

function telaAtendimentos() {
  listarCena(
    'atendimento',
    '📞 Atendimento',
    'Três falas no telefone: o problema, o detalhe e o pedido. A frase modelo só aparece depois.',
    ATENDIMENTOS,
    abrirAtendimento,
    valor => { atendimentoSessao = valor; }
  );
}

function abrirAtendimento(id) {
  abrirCenaLista(id, atendimentoPorId, cena => { atendimentoSessao = cena; }, pintarAtendimento, telaAtendimentos);
}

function pintarAtendimento() {
  pintarCenaLista(atendimentoSessao, {
    rota: 'atendimento',
    aoLista: telaAtendimentos,
    repintar: pintarAtendimento,
    avaliar: avaliarAtendimento,
    registrar: registrarAtendimento,
    tituloFim: 'Ligação feita!'
  });
}

function telaRequisitos() {
  listarCena(
    'requisito',
    '🗒️ Requisitos',
    'Pergunta de descoberta e depois a confirmação. A frase modelo só aparece depois.',
    REQUISITOS,
    abrirRequisito,
    valor => { requisitoSessao = valor; }
  );
}

function abrirRequisito(id) {
  abrirCenaLista(id, requisitoPorId, cena => { requisitoSessao = cena; }, pintarRequisito, telaRequisitos);
}

function pintarRequisito() {
  pintarCenaLista(requisitoSessao, {
    rota: 'requisito',
    aoLista: telaRequisitos,
    repintar: pintarRequisito,
    avaliar: avaliarRequisito,
    registrar: registrarRequisito,
    tituloFim: 'Requisito dito!'
  });
}

function telaMetricas() {
  listarCena(
    'metrica',
    '📈 Métricas',
    'Números, porcentagens e crescimento. A frase modelo só aparece depois.',
    METRICAS,
    abrirMetrica,
    valor => { metricaSessao = valor; }
  );
}

function abrirMetrica(id) {
  abrirCenaLista(id, metricaPorId, cena => { metricaSessao = cena; }, pintarMetrica, telaMetricas);
}

function pintarMetrica() {
  pintarCenaLista(metricaSessao, {
    rota: 'metrica',
    aoLista: telaMetricas,
    repintar: pintarMetrica,
    avaliar: avaliarMetrica,
    registrar: registrarMetrica,
    tituloFim: 'Métrica dita!'
  });
}

function telaAprendizados() {
  listarCena(
    'aprendizado',
    '📖 Um erro',
    'O erro, o efeito e a lição. A frase modelo só aparece depois.',
    APRENDIZADOS,
    abrirAprendizado,
    valor => { aprendizadoSessao = valor; }
  );
}

function abrirAprendizado(id) {
  abrirCenaLista(id, aprendizadoPorId, cena => { aprendizadoSessao = cena; }, pintarAprendizado, telaAprendizados);
}

function pintarAprendizado() {
  pintarCenaLista(aprendizadoSessao, {
    rota: 'aprendizado',
    aoLista: telaAprendizados,
    repintar: pintarAprendizado,
    avaliar: avaliarAprendizado,
    registrar: registrarAprendizado,
    tituloFim: 'Lição contada!'
  });
}

function telaPasseio() {
  passeioSessao = null;
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'passeio';
  registrarRota('passeio');
  const cena = montarPasseio(diaLocalAgora());
  app.innerHTML = '';
  app.append(
    topoVoltar('🚶 Só áudio', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'O modo só áudio lê a pergunta e espera a resposta. Dá para treinar andando. Se o microfone falhar, escreva e toque em enviar.'),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, cena ? 'Quatro frases' : 'Sem passeio'),
      h('p', {}, cena
        ? 'A pergunta sai em voz alta. O app espera oito segundos. A frase modelo só aparece se a resposta escapar.'
        : 'A data deste aparelho não abriu o passeio.')
    ),
    cena ? h('button', { class: 'btn btn-verde', onclick: abrirPasseio }, 'COMEÇAR') : ''
  );
  focarTela();
}

function abrirPasseio() {
  const cena = montarPasseio(diaLocalAgora());
  if (!cena) return telaPasseio();
  descartarVoz();
  passeioSessao = {
    cena,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    pulou: false,
    falaRetorno: '',
    falaLang: 'en-US',
    fase: 'lendo',
    concluido: false,
    fim: null
  };
  pintarPasseio();
}

function telaCulturas() {
  listarCena(
    'cultura',
    '🎬 Esporte, filme e série',
    'Duas falas: o assunto e um detalhe. A frase modelo só aparece depois.',
    CULTURAS,
    abrirCultura,
    valor => { culturaSessao = valor; }
  );
}

function abrirCultura(id) {
  abrirCenaLista(id, culturaPorId, cena => { culturaSessao = cena; }, pintarCultura, telaCulturas);
}

function pintarCultura() {
  pintarCenaLista(culturaSessao, {
    rota: 'cultura',
    aoLista: telaCulturas,
    repintar: pintarCultura,
    avaliar: avaliarCultura,
    registrar: registrarCultura,
    tituloFim: 'Papo feito!'
  });
}

function telaAumentos() {
  listarCena(
    'aumento',
    '🏆 O aumento',
    'Duas falas: o pedido e a prova. A frase modelo só aparece depois.',
    AUMENTOS,
    abrirAumento,
    valor => { aumentoSessao = valor; }
  );
}

function abrirAumento(id) {
  abrirCenaLista(id, aumentoPorId, cena => { aumentoSessao = cena; }, pintarAumento, telaAumentos);
}

function pintarAumento() {
  pintarCenaLista(aumentoSessao, {
    rota: 'aumento',
    aoLista: telaAumentos,
    repintar: pintarAumento,
    avaliar: avaliarAumento,
    registrar: registrarAumento,
    tituloFim: 'Pedido feito!'
  });
}

function telaRotas() {
  listarCena(
    'rota',
    '🔌 A API',
    'Duas falas: a rota e um detalhe. A frase modelo só aparece depois.',
    ROTAS,
    abrirRota,
    valor => { rotaSessao = valor; }
  );
}

function abrirRota(id) {
  abrirCenaLista(id, rotaPorId, cena => { rotaSessao = cena; }, pintarRota, telaRotas);
}

function pintarRota() {
  pintarCenaLista(rotaSessao, {
    rota: 'rota',
    aoLista: telaRotas,
    repintar: pintarRota,
    avaliar: avaliarRota,
    registrar: registrarFalaRota,
    tituloFim: 'Rota explicada!'
  });
}

function telaVivos() {
  listarCena(
    'vivo',
    '🔥 Ao vivo',
    'Duas falas: o status e um pedido. A frase modelo só aparece depois.',
    VIVOS,
    abrirVivo,
    valor => { vivoSessao = valor; }
  );
}

function abrirVivo(id) {
  abrirCenaLista(id, vivoPorId, cena => { vivoSessao = cena; }, pintarVivo, telaVivos);
}

function pintarVivo() {
  pintarCenaLista(vivoSessao, {
    rota: 'vivo',
    aoLista: telaVivos,
    repintar: pintarVivo,
    avaliar: avaliarVivo,
    registrar: registrarVivo,
    tituloFim: 'Status dado!'
  });
}

function telaProdutos() {
  listarCena(
    'produto',
    '📦 Com o produto',
    'Duas falas: o prazo e o corte. A frase modelo só aparece depois.',
    PRODUTOS,
    abrirProduto,
    valor => { produtoSessao = valor; }
  );
}

function abrirProduto(id) {
  abrirCenaLista(id, produtoPorId, cena => { produtoSessao = cena; }, pintarProduto, telaProdutos);
}

function pintarProduto() {
  pintarCenaLista(produtoSessao, {
    rota: 'produto',
    aoLista: telaProdutos,
    repintar: pintarProduto,
    avaliar: avaliarProduto,
    registrar: registrarProduto,
    tituloFim: 'Combinado!'
  });
}

function telaFechos() {
  listarCena(
    'fecho',
    '🙋 Suas perguntas',
    'Duas falas: a pergunta e um detalhe. A frase modelo só aparece depois.',
    FECHOS,
    abrirFecho,
    valor => { fechoSessao = valor; }
  );
}

function abrirFecho(id) {
  abrirCenaLista(id, fechoPorId, cena => { fechoSessao = cena; }, pintarFecho, telaFechos);
}

function pintarFecho() {
  pintarCenaLista(fechoSessao, {
    rota: 'fecho',
    aoLista: telaFechos,
    repintar: pintarFecho,
    avaliar: avaliarFecho,
    registrar: registrarFecho,
    tituloFim: 'Pergunta feita!'
  });
}

function telaNarras() {
  listarCena(
    'narrar',
    '🎙️ O par narrado',
    'Duas falas: o pensamento e a linha. A frase modelo só aparece depois.',
    NARRAS,
    abrirNarra,
    valor => { narraSessao = valor; }
  );
}

function abrirNarra(id) {
  abrirCenaLista(id, narraPorId, cena => { narraSessao = cena; }, pintarNarra, telaNarras);
}

function pintarNarra() {
  pintarCenaLista(narraSessao, {
    rota: 'narrar',
    aoLista: telaNarras,
    repintar: pintarNarra,
    avaliar: avaliarNarra,
    registrar: registrarNarrar,
    tituloFim: 'Linha dita!'
  });
}

function telaBancos() {
  listarCena(
    'banco',
    '🗄️ Banco ou cache',
    'Duas falas: onde guarda e a fonte. A frase modelo só aparece depois.',
    BANCOS,
    abrirBanco,
    valor => { bancoSessao = valor; }
  );
}

function abrirBanco(id) {
  abrirCenaLista(id, bancoPorId, cena => { bancoSessao = cena; }, pintarBanco, telaBancos);
}

function pintarBanco() {
  pintarCenaLista(bancoSessao, {
    rota: 'banco',
    aoLista: telaBancos,
    repintar: pintarBanco,
    avaliar: avaliarBanco,
    registrar: registrarBanco,
    tituloFim: 'Escolha dita!'
  });
}

function telaRecusas() {
  listarCena(
    'recusa',
    '🙅 O não educado',
    'Duas falas: o não e o outro caminho. A frase modelo só aparece depois.',
    RECUSAS,
    abrirRecusa,
    valor => { recusaSessao = valor; }
  );
}

function abrirRecusa(id) {
  abrirCenaLista(id, recusaPorId, cena => { recusaSessao = cena; }, pintarRecusa, telaRecusas);
}

function pintarRecusa() {
  pintarCenaLista(recusaSessao, {
    rota: 'recusa',
    aoLista: telaRecusas,
    repintar: pintarRecusa,
    avaliar: avaliarRecusa,
    registrar: registrarRecusa,
    tituloFim: 'Caminho dito!'
  });
}

function telaMapas() {
  listarCena(
    'mapa',
    '🗺️ O mapa',
    'Duas falas: a arquitetura e o fluxo. A frase modelo só aparece depois.',
    MAPAS,
    abrirMapa,
    valor => { mapaSessao = valor; }
  );
}

function abrirMapa(id) {
  abrirCenaLista(id, mapaPorId, cena => { mapaSessao = cena; }, pintarMapa, telaMapas);
}

function pintarMapa() {
  pintarCenaLista(mapaSessao, {
    rota: 'mapa',
    aoLista: telaMapas,
    repintar: pintarMapa,
    avaliar: avaliarMapa,
    registrar: registrarMapa,
    tituloFim: 'Mapa dito!'
  });
}

function telaDuros() {
  listarCena(
    'duro',
    '🗣️ O ponto difícil',
    'Duas falas: o ponto e o pedido. A frase modelo só aparece depois.',
    DUROS,
    abrirDuro,
    valor => { duroSessao = valor; }
  );
}

function abrirDuro(id) {
  abrirCenaLista(id, duroPorId, cena => { duroSessao = cena; }, pintarDuro, telaDuros);
}

function pintarDuro() {
  pintarCenaLista(duroSessao, {
    rota: 'duro',
    aoLista: telaDuros,
    repintar: pintarDuro,
    avaliar: avaliarDuro,
    registrar: registrarDuro,
    tituloFim: 'Ponto dito!'
  });
}

function telaPropostas() {
  listarCena(
    'proposta',
    '📐 A proposta',
    'Duas falas: a proposta e a troca. A frase modelo só aparece depois.',
    PROPOSTAS,
    abrirProposta,
    valor => { propostaSessao = valor; }
  );
}

function abrirProposta(id) {
  abrirCenaLista(id, propostaPorId, cena => { propostaSessao = cena; }, pintarProposta, telaPropostas);
}

function pintarProposta() {
  pintarCenaLista(propostaSessao, {
    rota: 'proposta',
    aoLista: telaPropostas,
    repintar: pintarProposta,
    avaliar: avaliarProposta,
    registrar: registrarProposta,
    tituloFim: 'Proposta dita!'
  });
}

function telaFuturos() {
  listarCena(
    'futuro',
    '🚀 Daqui a cinco anos',
    'Duas falas: a meta e o caminho. A frase modelo só aparece depois.',
    FUTUROS,
    abrirFuturo,
    valor => { futuroSessao = valor; }
  );
}

function abrirFuturo(id) {
  abrirCenaLista(id, futuroPorId, cena => { futuroSessao = cena; }, pintarFuturo, telaFuturos);
}

function pintarFuturo() {
  pintarCenaLista(futuroSessao, {
    rota: 'futuro',
    aoLista: telaFuturos,
    repintar: pintarFuturo,
    avaliar: avaliarFuturo,
    registrar: registrarFuturo,
    tituloFim: 'Plano dito!'
  });
}

function textoPasseio(sessao) {
  if (sessao.fase === 'lendo') return 'Lendo a pergunta.';
  if (sessao.fase === 'esperando') return 'Sua vez. Pode falar.';
  if (sessao.pulou) return 'Sem resposta. Próxima.';
  if (sessao.feedback?.ok && !sessao.feedback.quase) return 'Boa.';
  return 'Ouça de novo.';
}

function sairPasseio() {
  passeioGeracao += 1;
  passeioSessao = null;
  calar();
  pararReconhecimento();
  voltarTela(telaConversa);
}

function entregarPasseio(geracao, texto) {
  if (geracao !== passeioGeracao || telaAtiva !== 'passeio') return;
  const sessao = passeioSessao;
  if (!sessao || sessao.fase === 'feedback' || sessao.concluido) return;
  const rodada = sessao.cena.rodadas[sessao.i];
  const decidir = decidirPasseio(texto, rodada);
  if (decidir.seguiu && decidir.aval) {
    sessao.notas.push(decidir.aval.nota);
    if (decidir.aval.ok) sessao.acertos += 1;
    else sessao.erros.push({ en: decidir.aval.melhor, pt: rodada.missao });
    if (decidir.aval.ok) sons.acerto();
    else sons.erro();
  }
  sessao.feedback = decidir.aval;
  sessao.pulou = !decidir.seguiu;
  sessao.falaRetorno = decidir.falar;
  sessao.falaLang = decidir.lang;
  sessao.fase = 'feedback';
  pintarPasseio();
}

function avancarPasseio(geracao) {
  if (geracao !== passeioGeracao || telaAtiva !== 'passeio') return;
  const sessao = passeioSessao;
  if (!sessao || sessao.fase !== 'feedback' || sessao.concluido) return;
  if (sessao.i + 1 >= sessao.cena.rodadas.length) {
    fecharPasseio();
    return;
  }
  sessao.i += 1;
  sessao.fase = 'lendo';
  sessao.feedback = null;
  sessao.pulou = false;
  pintarPasseio();
}

function fecharPasseio() {
  if (!passeioSessao || passeioSessao.concluido) return;
  const respostas = passeioSessao.notas.length;
  const acertos = passeioSessao.acertos;
  if (!respostas) {
    passeioSessao.concluido = true;
    passeioSessao.fim = {
      titulo: 'Passeio parado',
      sub: 'Nenhuma frase enviada.',
      nota: 0,
      xp: 0,
      evento: { badges: [], bonusMissoes: 0 },
      destino: telaPasseio,
      painel: false,
      resumo: false
    };
    descartarVoz();
    pintarFim(passeioSessao.fim);
    return;
  }
  const nota = fecharNota(passeioSessao.notas);
  const xp = 10 + acertos * 8;
  const evento = registrarPasseio({
    xp,
    acertos,
    respostas,
    nota,
    errosFala: passeioSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  passeioSessao.concluido = true;
  passeioSessao.fim = {
    titulo: 'Passeio feito!',
    sub: `${acertos} de ${respostas}`,
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaPasseio,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(passeioSessao.fim);
}

function escutarPasseio(geracao, entrada) {
  if (geracao !== passeioGeracao || telaAtiva !== 'passeio') return;
  if (!passeioSessao || passeioSessao.fase !== 'esperando') return;
  const Reconhecedor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Reconhecedor) {
    pararReconhecimento();
    let rec = null;
    try {
      rec = new Reconhecedor();
    } catch {
      rec = null;
    }
    if (rec) {
      recAtivo = rec;
      rec.lang = 'en-US';
      rec.maxAlternatives = 1;
      rec.interimResults = false;
      rec.onresult = ev => {
        if (geracao !== passeioGeracao || telaAtiva !== 'passeio') return;
        if (!passeioSessao || passeioSessao.fase !== 'esperando') return;
        const ouvido = ev.results?.[0]?.[0]?.transcript || '';
        if (!String(ouvido).trim()) return;
        entregarPasseio(geracao, ouvido);
      };
      rec.onerror = () => {
        if (recAtivo === rec) recAtivo = null;
      };
      rec.onend = () => {
        if (recAtivo === rec) recAtivo = null;
      };
      try {
        rec.start();
      } catch {
        if (recAtivo === rec) recAtivo = null;
      }
    }
  }
  timerDeTela(() => {
    if (geracao !== passeioGeracao || telaAtiva !== 'passeio') return;
    if (!passeioSessao || passeioSessao.fase !== 'esperando') return;
    entregarPasseio(geracao, entrada.value.trim());
  }, ESPERA_RESPOSTA_MS);
}

function lerPergunta(geracao, rodada) {
  const seguir = () => {
    timerDeTela(() => {
      if (geracao !== passeioGeracao || telaAtiva !== 'passeio') return;
      if (!passeioSessao || passeioSessao.fase !== 'lendo') return;
      passeioSessao.fase = 'esperando';
      pintarPasseio();
    }, 0);
  };
  const falou = falarTrechos(falasDaPergunta(rodada), seguir);
  timerDeTela(() => {
    if (geracao !== passeioGeracao || telaAtiva !== 'passeio') return;
    if (!passeioSessao || passeioSessao.fase !== 'lendo') return;
    passeioSessao.fase = 'esperando';
    pintarPasseio();
  }, falou ? 4000 : 0);
}

function pintarPasseio() {
  const sessao = passeioSessao;
  if (!sessao || sessao.concluido) return telaPasseio();
  passeioGeracao += 1;
  const geracao = passeioGeracao;
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'passeio';
  registrarRota('passeio');
  const cena = sessao.cena;
  const rodada = cena.rodadas[sessao.i];
  const campo = campoResposta('Escreva em inglês...');
  campo.status.textContent = 'Escreva se quiser. Enviar corrige na hora.';
  app.innerHTML = '';
  const miolo = [
    topoVoltar(cena.emoji + ' ' + cena.titulo, sairPasseio),
    h('p', { class: 'passeio-status', role: 'status' }, textoPasseio(sessao)),
    h('div', { class: 'revisao-sub' }, `Frase ${sessao.i + 1} de ${cena.rodadas.length}`),
    h('p', { class: 'sombra-frase', lang: 'en' }, rodada.npc.en),
    h('p', {}, rodada.missao)
  ];
  if (sessao.fase === 'feedback') {
    if (sessao.feedback) miolo.push(cartaoTutor(sessao.feedback));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick: () => avancarPasseio(geracao)
    }, sessao.i + 1 >= cena.rodadas.length ? 'CONCLUIR' : 'PRÓXIMA'));
    timerDeTela(() => {
      falarTrechos([{ texto: sessao.falaRetorno, lang: sessao.falaLang }], () => {});
    }, 280);
    timerDeTela(() => avancarPasseio(geracao), 2500);
  } else {
    miolo.push(campo.status, campo.entrada);
    const enviar = h('button', { class: 'btn btn-verde', disabled: true }, 'ENVIAR');
    campo.entrada.addEventListener('input', () => {
      enviar.disabled = !campo.entrada.value.trim();
    });
    const mandar = () => {
      const texto = campo.entrada.value.trim();
      if (!texto || sessao.fase === 'feedback') return;
      entregarPasseio(geracao, texto);
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') mandar();
    });
    enviar.addEventListener('click', mandar);
    miolo.push(enviar);
    if (sessao.fase === 'lendo') timerDeTela(() => lerPergunta(geracao, rodada), 280);
    else timerDeTela(() => escutarPasseio(geracao, campo.entrada), 280);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
}

function telaSistemas() {
  listarCena(
    'sistema',
    '🏗️ Sistema',
    'Duas falas: o pedido e o limite. Feed, escala e gargalo. A frase modelo só aparece depois.',
    SISTEMAS,
    abrirSistema,
    valor => { sistemaSessao = valor; }
  );
}

function abrirSistema(id) {
  abrirCenaLista(id, sistemaPorId, cena => { sistemaSessao = cena; }, pintarSistema, telaSistemas);
}

function pintarSistema() {
  pintarCenaLista(sistemaSessao, {
    rota: 'sistema',
    aoLista: telaSistemas,
    repintar: pintarSistema,
    avaliar: avaliarSistema,
    registrar: registrarSistema,
    tituloFim: 'Sistema desenhado!'
  });
}

function telaCodigos() {
  listarCena(
    'codigo',
    '💻 Em voz alta',
    'Duas falas: o que você pensa e o passo seguinte. A frase modelo só aparece depois.',
    CODIGOS,
    abrirCodigo,
    valor => { codigoSessao = valor; }
  );
}

function abrirCodigo(id) {
  abrirCenaLista(id, codigoPorId, cena => { codigoSessao = cena; }, pintarCodigo, telaCodigos);
}

function pintarCodigo() {
  pintarCenaLista(codigoSessao, {
    rota: 'codigo',
    aoLista: telaCodigos,
    repintar: pintarCodigo,
    avaliar: avaliarCodigo,
    registrar: registrarCodigo,
    tituloFim: 'Código falado!'
  });
}

function telaColegas() {
  listarCena(
    'colega',
    '🤝 Outra área',
    'Duas falas: o pedido e a oferta. Design, QA e produto. A frase modelo só aparece depois.',
    COLEGAS,
    abrirColega,
    valor => { colegaSessao = valor; }
  );
}

function abrirColega(id) {
  abrirCenaLista(id, colegaPorId, cena => { colegaSessao = cena; }, pintarColega, telaColegas);
}

function pintarColega() {
  pintarCenaLista(colegaSessao, {
    rota: 'colega',
    aoLista: telaColegas,
    repintar: pintarColega,
    avaliar: avaliarColega,
    registrar: registrarColega,
    tituloFim: 'Ajuda combinada!'
  });
}

function telaModelos() {
  listarCena(
    'modelo',
    '🤖 Para leigos',
    'Duas falas: a ideia e um exemplo. Prompt, alucinação e notas. A frase modelo só aparece depois.',
    MODELOS,
    abrirModelo,
    valor => { modeloSessao = valor; }
  );
}

function abrirModelo(id) {
  abrirCenaLista(id, modeloPorId, cena => { modeloSessao = cena; }, pintarModelo, telaModelos);
}

function pintarModelo() {
  pintarCenaLista(modeloSessao, {
    rota: 'modelo',
    aoLista: telaModelos,
    repintar: pintarModelo,
    avaliar: avaliarModelo,
    registrar: registrarModelo,
    tituloFim: 'Ideia explicada!'
  });
}

function telaFuros() {
  listarCena(
    'furo',
    '🛡️ O furo',
    'Duas falas: o aviso e o plano. CVE, patch e dependência. A frase modelo só aparece depois.',
    FUROS,
    abrirFuro,
    valor => { furoSessao = valor; }
  );
}

function abrirFuro(id) {
  abrirCenaLista(id, furoPorId, cena => { furoSessao = cena; }, pintarFuro, telaFuros);
}

function pintarFuro() {
  pintarCenaLista(furoSessao, {
    rota: 'furo',
    aoLista: telaFuros,
    repintar: pintarFuro,
    avaliar: avaliarFuro,
    registrar: registrarFuro,
    tituloFim: 'Furo fechado!'
  });
}

function telaRotinas() {
  listarCena(
    'rotina',
    '🏠 Em casa',
    'Duas falas: a casa e a família. Manhã, jantar e noite. A frase modelo só aparece depois.',
    ROTINAS,
    abrirRotina,
    valor => { rotinaSessao = valor; }
  );
}

function abrirRotina(id) {
  abrirCenaLista(id, rotinaPorId, cena => { rotinaSessao = cena; }, pintarRotina, telaRotinas);
}

function pintarRotina() {
  pintarCenaLista(rotinaSessao, {
    rota: 'rotina',
    aoLista: telaRotinas,
    repintar: pintarRotina,
    avaliar: avaliarRotina,
    registrar: registrarRotina,
    tituloFim: 'Casa contada!'
  });
}

function telaPalestras() {
  listarCena(
    'palestra',
    '🎤 Palestra',
    'Duas falas: a abertura, a troca de slide ou o convite às perguntas. A frase modelo só aparece depois.',
    PALESTRAS,
    abrirPalestra,
    valor => { palestraSessao = valor; }
  );
}

function abrirPalestra(id) {
  abrirCenaLista(id, palestraPorId, cena => { palestraSessao = cena; }, pintarPalestra, telaPalestras);
}

function pintarPalestra() {
  pintarCenaLista(palestraSessao, {
    rota: 'palestra',
    aoLista: telaPalestras,
    repintar: pintarPalestra,
    avaliar: avaliarPalestra,
    registrar: registrarPalestra,
    tituloFim: 'Palestra feita!'
  });
}

function telaDuvidas() {
  listarCena(
    'duvida',
    '🙋 Sem a resposta',
    'Duas falas: ganhe tempo e diga quando volta. A frase modelo só aparece depois.',
    DUVIDAS,
    abrirDuvida,
    valor => { duvidaSessao = valor; }
  );
}

function abrirDuvida(id) {
  abrirCenaLista(id, duvidaPorId, cena => { duvidaSessao = cena; }, pintarDuvida, telaDuvidas);
}

function pintarDuvida() {
  pintarCenaLista(duvidaSessao, {
    rota: 'duvida',
    aoLista: telaDuvidas,
    repintar: pintarDuvida,
    avaliar: avaliarDuvida,
    registrar: registrarDuvida,
    tituloFim: 'Resposta adiada!'
  });
}

function telaSinais() {
  listarCena(
    'sinal',
    '📶 Sinal ruim',
    'Duas falas: o que falhou na chamada e o que você pede. A frase modelo só aparece depois.',
    SINAIS,
    abrirSinal,
    valor => { sinalSessao = valor; }
  );
}

function abrirSinal(id) {
  abrirCenaLista(id, sinalPorId, cena => { sinalSessao = cena; }, pintarSinal, telaSinais);
}

function pintarSinal() {
  pintarCenaLista(sinalSessao, {
    rota: 'sinal',
    aoLista: telaSinais,
    repintar: pintarSinal,
    avaliar: avaliarSinal,
    registrar: registrarSinal,
    tituloFim: 'Chamada salva!'
  });
}

function telaFalhas() {
  listarCena(
    'falha',
    '🛠️ Por que falhou',
    'Duas falas: o que quebrou e a causa. Deploy, CI e permissão. A frase modelo só aparece depois.',
    FALHAS,
    abrirFalha,
    valor => { falhaSessao = valor; }
  );
}

function abrirFalha(id) {
  abrirCenaLista(id, falhaPorId, cena => { falhaSessao = cena; }, pintarFalha, telaFalhas);
}

function pintarFalha() {
  pintarCenaLista(falhaSessao, {
    rota: 'falha',
    aoLista: telaFalhas,
    repintar: pintarFalha,
    avaliar: avaliarFalha,
    registrar: registrarFalha,
    tituloFim: 'Causa dita!'
  });
}

function telaMentorias() {
  listarCena(
    'mentoria',
    '🌱 Mentoria',
    'Duas falas: a dica e a ideia por trás. A frase modelo só aparece depois.',
    MENTORIAS,
    abrirMentoria,
    valor => { mentoriaSessao = valor; }
  );
}

function abrirMentoria(id) {
  abrirCenaLista(id, mentoriaPorId, cena => { mentoriaSessao = cena; }, pintarMentoria, telaMentorias);
}

function pintarMentoria() {
  pintarCenaLista(mentoriaSessao, {
    rota: 'mentoria',
    aoLista: telaMentorias,
    repintar: pintarMentoria,
    avaliar: avaliarMentoria,
    registrar: registrarMentoria,
    tituloFim: 'Dica dada!'
  });
}

function telaSocorros() {
  listarCena(
    'socorro',
    '🩺 No exterior',
    'Duas falas: o pedido e o detalhe. Farmácia, médico e emergência. A frase modelo só aparece depois.',
    SOCORROS,
    abrirSocorro,
    valor => { socorroSessao = valor; }
  );
}

function abrirSocorro(id) {
  abrirCenaLista(id, socorroPorId, cena => { socorroSessao = cena; }, pintarSocorro, telaSocorros);
}

function pintarSocorro() {
  pintarCenaLista(socorroSessao, {
    rota: 'socorro',
    aoLista: telaSocorros,
    repintar: pintarSocorro,
    avaliar: avaliarSocorro,
    registrar: registrarSocorro,
    tituloFim: 'Socorro dito!'
  });
}

function telaSalarios() {
  listarCena(
    'salario',
    '💰 Salário',
    'Duas falas: o pedido e a troca. Faixa, plano de saúde e ações. A frase modelo só aparece depois.',
    SALARIOS,
    abrirSalario,
    valor => { salarioSessao = valor; }
  );
}

function abrirSalario(id) {
  abrirCenaLista(id, salarioPorId, cena => { salarioSessao = cena; }, pintarSalario, telaSalarios);
}

function pintarSalario() {
  pintarCenaLista(salarioSessao, {
    rota: 'salario',
    aoLista: telaSalarios,
    repintar: pintarSalario,
    avaliar: avaliarSalario,
    registrar: registrarSalario,
    tituloFim: 'Oferta falada!'
  });
}

function telaProjetos() {
  listarCena(
    'projeto',
    '🧰 Portfólio',
    'Três falas: o problema, a stack e o resultado. A frase modelo só aparece depois.',
    PROJETOS,
    abrirProjeto,
    valor => { projetoSessao = valor; }
  );
}

function abrirProjeto(id) {
  abrirCenaLista(id, projetoPorId, cena => { projetoSessao = cena; }, pintarProjeto, telaProjetos);
}

function pintarProjeto() {
  pintarCenaLista(projetoSessao, {
    rota: 'projeto',
    aoLista: telaProjetos,
    repintar: pintarProjeto,
    avaliar: avaliarProjeto,
    registrar: registrarProjeto,
    tituloFim: 'Projeto contado!'
  });
}

function telaSotaques() {
  listarCena(
    'sotaque',
    '🎧 Sotaques',
    'Ouça a voz do aparelho e escreva a frase. Americano, britânico e indiano. A frase modelo só aparece depois.',
    CENAS_SOTAQUE,
    abrirSotaque,
    valor => { sotaqueSessao = valor; }
  );
}

function abrirSotaque(id) {
  const cena = sotaquePorId(id);
  if (!cena) return telaSotaques();
  descartarVoz();
  sotaqueSessao = novaCena(cena);
  pintarSotaque();
}

function pintarSotaque() {
  const sessao = sotaqueSessao;
  if (!sessao || sessao.concluido) return telaSotaques();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'sotaque';
  registrarRota('sotaque');
  const cena = sessao.cena;
  const rodada = cena.rodadas[sessao.i];
  const campo = campoResposta('Escreva em inglês...');
  const statusVoz = h('p', { class: 'ia-aviso', role: 'status' }, '');
  const ouvir = () => {
    const resultado = falarComLocale(rodada.melhor, cena.locale);
    statusVoz.textContent = rotuloVoz(resultado, cena.locale);
  };
  app.innerHTML = '';
  const miolo = [
    topoVoltar(cena.emoji + ' ' + cena.titulo, telaSotaques),
    h('div', { class: 'revisao-sub' }, rotuloCall(sessao)),
    h('p', { class: 'sombra-frase' }, rodada.missao),
    h('div', { class: 'pilula' }, cena.locale),
    statusVoz
  ];
  if (sessao.feedback) {
    miolo.push(cartaoTutor(sessao.feedback));
    miolo.push(barraModelo(sessao.feedback.melhor, campo.status));
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (sessao.i + 1 >= cena.rodadas.length) {
          concluirCena(sessao, registrarSotaque, {
            xpBase: 10,
            xpAcerto: 8,
            titulo: 'Sotaque ouvido!',
            destino: telaSotaques
          });
        } else {
          descartarVoz();
          sessao.i++;
          sessao.feedback = null;
          pintarSotaque();
        }
      }
    }, sessao.i + 1 >= cena.rodadas.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(h('button', { class: 'btn btn-branco', type: 'button', onclick: ouvir }, 'OUVIR'));
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || sessao.feedback) return;
      await finalizarGravacao();
      const aval = avaliarSotaque(rodada, campo.entrada.value);
      sessao.notas.push(aval.nota);
      if (aval.ok) {
        sessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        sessao.erros.push({ en: aval.melhor, pt: rodada.missao });
      }
      sessao.feedback = aval;
      pintarSotaque();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', () => { enviar(); });
    miolo.push(verificar);
    timerDeTela(ouvir, 280);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (!sessao.feedback) campo.entrada.focus();
}

function telaDesafio() {
  desafioSessao = null;
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'desafio';
  registrarRota('desafio');
  const resumo = resumoDesafio(diaLocalAgora());
  app.innerHTML = '';
  app.append(
    topoVoltar('📅 Desafio do dia', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, textoDesafio(resumo) + ' A frase modelo só aparece depois. Recorde: ' + resumo.recorde + '.'),
    h('button', { class: 'btn btn-verde', onclick: abrirDesafio }, resumo.feito ? 'REPETIR' : 'COMEÇAR')
  );
  focarTela();
}

function abrirDesafio() {
  const resumo = resumoDesafio(diaLocalAgora());
  const cena = montarDesafio(diaLocalAgora(), resumo.entrando);
  if (!cena) return telaDesafio();
  descartarVoz();
  desafioSessao = novaCena(cena);
  pintarDesafio();
}

function pintarDesafio() {
  pintarCenaFala(desafioSessao, {
    rota: 'desafio',
    aoLista: telaDesafio,
    repintar: pintarDesafio,
    avaliar: avaliarDesafio,
    rotulo: rotuloCall,
    aoConcluir: () => concluirCena(desafioSessao, registrarDesafioDia, {
      xpBase: 10,
      xpAcerto: 8,
      titulo: 'Dia feito!',
      destino: telaDesafio
    })
  });
}

function telaLinhas() {
  listarCena(
    'linha',
    '💻 Linha a linha',
    'Duas falas: o que a linha faz e o nome. Loop, callback, null check e edge case. A frase modelo só aparece depois.',
    LINHAS,
    abrirLinha,
    valor => { linhaSessao = valor; }
  );
}

function abrirLinha(id) {
  abrirCenaLista(id, linhaPorId, cena => { linhaSessao = cena; }, pintarLinha, telaLinhas);
}

function pintarLinha() {
  pintarCenaLista(linhaSessao, {
    rota: 'linha',
    aoLista: telaLinhas,
    repintar: pintarLinha,
    avaliar: avaliarLinha,
    registrar: registrarLinha,
    tituloFim: 'Linha dita!'
  });
}

function telaSlacks() {
  listarCena(
    'slack',
    '💬 Slack',
    'Duas falas curtas. Você escreve ou fala. Pedir review ou avisar atraso. A frase modelo só aparece depois.',
    SLACKS,
    abrirSlack,
    valor => { slackSessao = valor; }
  );
}

function abrirSlack(id) {
  abrirCenaLista(id, slackPorId, cena => { slackSessao = cena; }, pintarSlack, telaSlacks);
}

function pintarSlack() {
  pintarCenaLista(slackSessao, {
    rota: 'slack',
    aoLista: telaSlacks,
    repintar: pintarSlack,
    avaliar: avaliarSlack,
    registrar: registrarSlack,
    tituloFim: 'Recado enviado!'
  });
}

function telaSociais() {
  listarCena(
    'social',
    '🍻 Happy hour',
    'Duas falas: o papo e um detalhe. Happy hour, hobby e o Brasil. A frase modelo só aparece depois.',
    SOCIAIS,
    abrirSocial,
    valor => { socialSessao = valor; }
  );
}

function abrirSocial(id) {
  abrirCenaLista(id, socialPorId, cena => { socialSessao = cena; }, pintarSocial, telaSociais);
}

function pintarSocial() {
  pintarCenaLista(socialSessao, {
    rota: 'social',
    aoLista: telaSociais,
    repintar: pintarSocial,
    avaliar: avaliarSocial,
    registrar: registrarSocial,
    tituloFim: 'Papo feito!'
  });
}

function telaTermos() {
  listarCena(
    'termo',
    '🔤 Termos técnicos',
    'Duas falas: o som e uma frase. Cache, queue, SQL, GUI, height e width. A frase modelo só aparece depois.',
    TERMOS,
    abrirTermo,
    valor => { termoSessao = valor; }
  );
}

function abrirTermo(id) {
  abrirCenaLista(id, termoPorId, cena => { termoSessao = cena; }, pintarTermo, telaTermos);
}

function pintarTermo() {
  pintarCenaLista(termoSessao, {
    rota: 'termo',
    aoLista: telaTermos,
    repintar: pintarTermo,
    avaliar: avaliarTermo,
    registrar: registrarTermo,
    tituloFim: 'Som dito!'
  });
}

function telaGestores() {
  listarCena(
    'gestor',
    '🗣️ Feedback 1:1',
    'Duas falas com o gestor: ouça o ponto e devolva um pedido. A frase modelo só aparece depois.',
    GESTORES,
    abrirGestor,
    valor => { gestorSessao = valor; }
  );
}

function abrirGestor(id) {
  abrirCenaLista(id, gestorPorId, cena => { gestorSessao = cena; }, pintarGestor, telaGestores);
}

function pintarGestor() {
  pintarCenaLista(gestorSessao, {
    rota: 'gestor',
    aoLista: telaGestores,
    repintar: pintarGestor,
    avaliar: avaliarGestor,
    registrar: registrarGestor,
    tituloFim: 'Feedback feito!'
  });
}

function telaFinais() {
  listarCena(
    'final',
    '❓ Pergunta final',
    'Duas falas no fim da entrevista: a pergunta e um detalhe. A frase modelo só aparece depois.',
    FINAIS,
    abrirFinal,
    valor => { finalSessao = valor; }
  );
}

function abrirFinal(id) {
  abrirCenaLista(id, finalPorId, cena => { finalSessao = cena; }, pintarFinal, telaFinais);
}

function pintarFinal() {
  pintarCenaLista(finalSessao, {
    rota: 'final',
    aoLista: telaFinais,
    repintar: pintarFinal,
    avaliar: avaliarFinal,
    registrar: registrarFinal,
    tituloFim: 'Pergunta feita!'
  });
}

function telaViagens() {
  listarCena(
    'viagem',
    '🛫 Viagem a trabalho',
    'Duas falas: a situação e o pedido. Conexão, imigração ou táxi. A frase modelo só aparece depois.',
    VIAGENS,
    abrirViagem,
    valor => { viagemSessao = valor; }
  );
}

function abrirViagem(id) {
  abrirCenaLista(id, viagemPorId, cena => { viagemSessao = cena; }, pintarViagem, telaViagens);
}

function pintarViagem() {
  pintarCenaLista(viagemSessao, {
    rota: 'viagem',
    aoLista: telaViagens,
    repintar: pintarViagem,
    avaliar: avaliarViagem,
    registrar: registrarViagem,
    tituloFim: 'Viagem feita!'
  });
}

function telaMisturas() {
  misturaSessao = null;
  revisaoPrazo = 0;
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'mistura';
  registrarRota('mistura');
  const n = catalogoFaladas().length;
  app.innerHTML = '';
  app.append(
    topoVoltar('⏱️ Três minutos', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, `Um relógio de 3 minutos mistura ${n} frases dos treinos. A frase modelo só aparece depois. O tempo não envia sozinho.`),
    h('button', { class: 'btn btn-verde', onclick: abrirMistura }, 'COMEÇAR')
  );
  focarTela();
}

function abrirMistura() {
  const passos = montarRevisao(catalogoFaladas(), diaLocalAgora(), 8);
  if (!passos.length) return telaMisturas();
  descartarVoz();
  misturaSessao = novaCena({
    id: 'misto',
    titulo: 'Três minutos',
    emoji: '⏱️',
    nivel: 'misto',
    onde: 'Frases dos treinos',
    rodadas: passos
  });
  revisaoPrazo = Date.now() + SEGUNDOS_REVISAO * 1000;
  pintarMistura();
}

function fecharRevisao() {
  if (!misturaSessao || misturaSessao.concluido) return;
  clearInterval(intervaloRevisao);
  intervaloRevisao = null;
  const respostas = misturaSessao.notas.length;
  const acertos = misturaSessao.acertos;
  if (!respostas) {
    misturaSessao.concluido = true;
    misturaSessao.fim = {
      titulo: 'O tempo acabou',
      sub: 'Nenhuma frase enviada.',
      nota: 0,
      xp: 0,
      evento: { badges: [], bonusMissoes: 0 },
      destino: telaMisturas,
      painel: false,
      resumo: false
    };
    descartarVoz();
    pintarFim(misturaSessao.fim);
    return;
  }
  const nota = fecharNota(misturaSessao.notas);
  const xp = 6 + acertos * 4;
  const evento = registrarMistura({
    xp,
    acertos,
    respostas,
    nota,
    errosFala: misturaSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  misturaSessao.concluido = true;
  misturaSessao.fim = {
    titulo: 'Três minutos feitos!',
    sub: `${acertos} de ${respostas}`,
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaMisturas,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(misturaSessao.fim);
}

function ligarCronometroRevisao() {
  clearInterval(intervaloRevisao);
  intervaloRevisao = null;
  const el = document.querySelector('[data-cronometro-revisao]');
  const restaDe = () => Math.max(0, Math.ceil((revisaoPrazo - Date.now()) / 1000));
  const pintar = () => {
    if (el) el.textContent = formatarMinuto(restaDe());
  };
  pintar();
  if (restaDe() <= 0) {
    if (misturaSessao && !misturaSessao.feedback && !misturaSessao.concluido) fecharRevisao();
    return;
  }
  intervaloRevisao = setInterval(() => {
    if (restaDe() > 0) {
      pintar();
      return;
    }
    clearInterval(intervaloRevisao);
    intervaloRevisao = null;
    pintar();
    if (!misturaSessao || misturaSessao.concluido || misturaSessao.feedback) return;
    fecharRevisao();
  }, 1000);
}

function pintarMistura() {
  pintarCenaFala(misturaSessao, {
    rota: 'mistura',
    aoLista: telaMisturas,
    repintar: pintarMistura,
    avaliar: avaliarRevisao,
    rotulo: rotuloCall,
    aoConcluir: fecharRevisao
  });
  if (!misturaSessao || misturaSessao.concluido) return;
  const ancora = app.querySelector('.revisao-sub');
  if (ancora) {
    const relogio = h('div', {
      class: 'cronometro-demo',
      'data-cronometro-revisao': '1',
      role: 'timer',
      'aria-label': 'Tempo da revisão',
      'aria-live': 'off'
    }, '');
    ancora.after(
      relogio,
      h('p', { class: 'ia-aviso' }, 'Quando zerar, o que está no campo não é enviado.')
    );
  }
  ligarCronometroRevisao();
}

function telaRetros() {
  listarCena(
    'retro',
    '🔄 Retrospectiva',
    'Três falas: o que foi bem, o que melhorar e a ação. A frase modelo só aparece depois.',
    RETROS,
    abrirRetro,
    valor => { retroSessao = valor; }
  );
}

function abrirRetro(id) {
  abrirCenaLista(id, retroPorId, cena => { retroSessao = cena; }, pintarRetro, telaRetros);
}

function pintarRetro() {
  pintarCenaLista(retroSessao, {
    rota: 'retro',
    aoLista: telaRetros,
    repintar: pintarRetro,
    avaliar: avaliarRetro,
    registrar: registrarRetro,
    tituloFim: 'Retro fechada!'
  });
}

function telaChegadas() {
  listarCena(
    'chegada',
    '🧭 Onboarding',
    'Três falas: o projeto, o fluxo e a primeira tarefa. A frase modelo só aparece depois.',
    CHEGADAS,
    abrirChegada,
    valor => { chegadaSessao = valor; }
  );
}

function abrirChegada(id) {
  abrirCenaLista(id, chegadaPorId, cena => { chegadaSessao = cena; }, pintarChegada, telaChegadas);
}

function pintarChegada() {
  pintarCenaLista(chegadaSessao, {
    rota: 'chegada',
    aoLista: telaChegadas,
    repintar: pintarChegada,
    avaliar: avaliarChegada,
    registrar: registrarChegada,
    tituloFim: 'Boas-vindas feitas!'
  });
}

function telaLigacoes() {
  listarCena(
    'ligacao',
    '🔗 Conectores',
    'Duas falas: o fato e a ligação. However, on the other hand ou that said. A frase modelo só aparece depois.',
    LIGACOES,
    abrirLigacao,
    valor => { ligacaoSessao = valor; }
  );
}

function abrirLigacao(id) {
  abrirCenaLista(id, ligacaoPorId, cena => { ligacaoSessao = cena; }, pintarLigacao, telaLigacoes);
}

function pintarLigacao() {
  pintarCenaLista(ligacaoSessao, {
    rota: 'ligacao',
    aoLista: telaLigacoes,
    repintar: pintarLigacao,
    avaliar: avaliarLigacao,
    registrar: registrarLigacao,
    tituloFim: 'Ideias ligadas!'
  });
}

function telaDemos() {
  listarCena(
    'demo',
    '🎬 Demo de produto',
    'Um minuto para apresentar a feature. Depois, duas perguntas da plateia. A frase modelo só aparece depois.',
    DEMOS,
    abrirDemo,
    valor => { demoSessao = valor; }
  );
}

function abrirDemo(id) {
  abrirCenaLista(id, demoPorId, cena => { demoSessao = cena; }, pintarDemo, telaDemos);
}

function pintarDemo() {
  pintarCenaLista(demoSessao, {
    rota: 'demo',
    aoLista: telaDemos,
    repintar: pintarDemo,
    avaliar: avaliarDemo,
    registrar: registrarDemo,
    tituloFim: 'Demo feita!'
  });
}

function telaPrazos() {
  prazoSessao = null;
  telaListaFala(
    'prazo',
    '📌 Prazo e escopo',
    "Sugira um corte e peça outra data. I'd suggest e Could we. A frase modelo só aparece depois.",
    preferirNivel(PRAZOS, estado.nivelFala),
    abrirPrazo
  );
}

function abrirPrazo(id) {
  abrirCenaLista(id, prazoPorId, cena => { prazoSessao = cena; }, pintarPrazo, telaPrazos);
}

function pintarPrazo() {
  pintarCenaLista(prazoSessao, {
    rota: 'prazo',
    aoLista: telaPrazos,
    repintar: pintarPrazo,
    avaliar: avaliarPrazo,
    registrar: registrarPrazo,
    tituloFim: 'Prazo combinado!'
  });
}

function telaStars() {
  listarCena(
    'star',
    '⭐ Entrevista STAR',
    'Quatro falas: situação, tarefa, ação e resultado. A frase modelo só aparece depois.',
    STARS,
    abrirStar,
    valor => { starSessao = valor; }
  );
}

function abrirStar(id) {
  abrirCenaLista(id, starPorId, cena => { starSessao = cena; }, pintarStar, telaStars);
}

function pintarStar() {
  pintarCenaLista(starSessao, {
    rota: 'star',
    aoLista: telaStars,
    repintar: pintarStar,
    avaliar: avaliarStar,
    registrar: registrarStar,
    tituloFim: 'Caso contado!'
  });
}

function telaEnfases() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'enfase';
  registrarRota('enfase');
  enfaseSessao = null;
  const lista = preferirNivel(ENFASES, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('🎵 Ênfase', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Marque a palavra forte, ou se a pergunta sobe ou desce. Depois diga a frase. O modelo só aparece depois.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirEnfase() }, 'TREINAR 4'),
    ...lista.map(item => cartaoComNivel(item, item.pt, () => abrirEnfase(item.id)))
  );
  focarTela();
}

function abrirEnfase(id) {
  const fila = filaAdaptada(ENFASES, id, enfasePorId);
  if (!fila.length) return telaEnfases();
  descartarVoz();
  enfaseSessao = {
    fila,
    i: 0,
    acertos: 0,
    toques: 0,
    notas: [],
    erros: [],
    escolha: null,
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarEnfase();
}

function pintarEnfase() {
  if (!enfaseSessao || enfaseSessao.concluido) return telaEnfases();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'enfase';
  registrarRota('enfase');
  const item = enfaseSessao.fila[enfaseSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  app.innerHTML = '';
  const miolo = [
    topoVoltar(item.emoji + ' ' + item.titulo, () => telaEnfases()),
    h('div', { class: 'revisao-sub' }, `Frase ${enfaseSessao.i + 1} de ${enfaseSessao.fila.length} · ${item.nivel}`),
    h('p', { class: 'sombra-frase', 'data-foco': '1' }, item.pt),
    h('p', { class: 'ia-aviso' }, item.uso)
  ];
  if (enfaseSessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(enfaseSessao.feedback));
    miolo.push(h('p', { class: 'fala-en', lang: 'en' }, enfaseSessao.feedback.melhor));
    miolo.push(barraModelo(enfaseSessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (enfaseSessao.i + 1 >= enfaseSessao.fila.length) concluirEnfase();
        else {
          descartarVoz();
          enfaseSessao.i++;
          enfaseSessao.feedback = null;
          enfaseSessao.escolha = null;
          pintarEnfase();
        }
      }
    }, enfaseSessao.i + 1 >= enfaseSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else if (!enfaseSessao.escolha) {
    const opcoes = item.tipo === 'curva'
      ? [{ valor: 'sobe', rotulo: 'SOBE' }, { valor: 'desce', rotulo: 'DESCE' }]
      : item.palavras.map(p => ({ valor: p, rotulo: p }));
    miolo.push(h('div', { class: 'opcoes' }, opcoes.map(op => h('button', {
      class: 'opcao',
      type: 'button',
      lang: item.tipo === 'curva' ? 'pt' : 'en',
      onclick() {
        const toque = avaliarToque(item, op.valor);
        if (toque.ok) enfaseSessao.toques++;
        enfaseSessao.escolha = { ok: toque.ok };
        pintarEnfase();
      }
    }, op.rotulo))));
  } else {
    miolo.push(h('p', { class: 'ia-aviso' }, item.porque));
    if (item.tipo === 'palavra') miolo.push(fraseComFoco(item));
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async () => {
      if (!campo.entrada.value.trim() || enfaseSessao.feedback) return;
      await finalizarGravacao();
      const aval = avaliarEnfase(item, campo.entrada.value);
      enfaseSessao.notas.push(aval.nota);
      if (aval.ok) {
        enfaseSessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        if (aval.melhor) enfaseSessao.erros.push({ en: aval.melhor, pt: item.pt });
      }
      enfaseSessao.feedback = aval;
      pintarEnfase();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter') enviar();
    });
    verificar.addEventListener('click', () => { enviar(); });
    miolo.push(verificar);
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (!enfaseSessao.feedback && enfaseSessao.escolha) campo.entrada.focus();
}

function concluirEnfase() {
  if (!enfaseSessao || enfaseSessao.concluido) return pintarFim(enfaseSessao?.fim);
  const total = enfaseSessao.fila.length;
  const nota = fecharNota(enfaseSessao.notas);
  const xp = 8 + enfaseSessao.acertos * 4 + enfaseSessao.toques * 2;
  const evento = registrarEnfase({
    xp,
    acertos: enfaseSessao.acertos,
    respostas: total,
    nota,
    errosFala: enfaseSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  enfaseSessao.concluido = true;
  enfaseSessao.fim = {
    titulo: 'Ênfase no lugar!',
    sub: 'Ênfase',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaEnfases,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(enfaseSessao.fim);
}

function telaOpinioes() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'opiniao';
  registrarRota('opiniao');
  opiniaoSessao = null;
  const lista = preferirNivel(OPINIOES, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('💬 Opinião', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Dê um motivo e, na segunda fala, concorde ou discorde com educação. A frase modelo só aparece depois.'),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrirOpiniao(c.id)))
  );
  focarTela();
}

function abrirOpiniao(id) {
  const cena = opiniaoPorId(id);
  if (!cena) return telaOpinioes();
  descartarVoz();
  opiniaoSessao = novaCena(cena);
  pintarOpiniao();
}

function pintarOpiniao() {
  pintarCenaFala(opiniaoSessao, {
    rota: 'opiniao',
    aoLista: telaOpinioes,
    repintar: pintarOpiniao,
    avaliar: avaliarOpiniao,
    rotulo: s => `Fala ${s.i + 1} de ${s.cena.rodadas.length} · ${s.cena.nivel}`,
    aoConcluir: () => concluirCena(opiniaoSessao, registrarOpiniao, {
      xpBase: 10,
      xpAcerto: 8,
      titulo: 'Opinião dada!',
      destino: telaOpinioes
    })
  });
}

function telaDescricoes() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'descrever';
  registrarRota('descrever');
  descreverSessao = null;
  const lista = preferirNivel(CENAS_FALA, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('👀 Descrever a cena', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Diga o que acontece e depois um detalhe. A frase modelo só aparece depois da tentativa.'),
    ...lista.map(c => cartaoComNivel(c, c.onde, () => abrirDescrever(c.id)))
  );
  focarTela();
}

function abrirDescrever(id) {
  const cena = cenaPorId(id);
  if (!cena) return telaDescricoes();
  descartarVoz();
  descreverSessao = novaCena(cena);
  pintarDescrever();
}

function pintarDescrever() {
  pintarCenaFala(descreverSessao, {
    rota: 'descrever',
    aoLista: telaDescricoes,
    repintar: pintarDescrever,
    avaliar: avaliarCena,
    rotulo: s => `Fala ${s.i + 1} de ${s.cena.rodadas.length} · ${s.cena.nivel}`,
    aoConcluir: () => concluirCena(descreverSessao, registrarCena, {
      xpBase: 10,
      xpAcerto: 8,
      titulo: 'Cena descrita!',
      destino: telaDescricoes
    })
  });
}

function telaRapidos() {
  calar();
  limparTela();
  descartarVoz();
  window.scrollTo(0, 0);
  telaAtiva = 'rapido';
  registrarRota('rapido');
  rapidoSessao = null;
  const lista = preferirNivel(RAPIDOS, estado.nivelFala);
  app.innerHTML = '';
  app.append(
    topoVoltar('⚡ Pensa em inglês', () => voltarTela(telaConversa)),
    h('p', { class: 'ia-aviso' }, 'Quatro perguntas em português. Vinte segundos cada. A frase em inglês só aparece depois, ou quando o tempo acaba.'),
    h('button', { class: 'btn btn-verde', onclick: () => abrirRapido() }, 'TREINAR 4'),
    ...lista.map(item => cartaoComNivel(item, item.pergunta, () => abrirRapido(item.id)))
  );
  focarTela();
}

function abrirRapido(id) {
  const fila = filaAdaptada(RAPIDOS, id, rapidoPorId);
  if (!fila.length) return telaRapidos();
  descartarVoz();
  rapidoSessao = {
    fila,
    i: 0,
    acertos: 0,
    notas: [],
    erros: [],
    feedback: null,
    concluido: false,
    fim: null
  };
  pintarRapido();
}

function formatarMinuto(total) {
  const n = Math.max(0, Number(total) || 0);
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
}

function ligarCronometroDemo(segundos) {
  clearInterval(intervaloDemo);
  let resta = Math.max(0, Number(segundos) || 0);
  const el = document.querySelector('[data-cronometro-demo]');
  const pintar = () => {
    if (el) el.textContent = formatarMinuto(resta);
  };
  pintar();
  if (resta <= 0) return;
  intervaloDemo = setInterval(() => {
    resta -= 1;
    if (resta <= 0) {
      clearInterval(intervaloDemo);
      intervaloDemo = null;
      if (el) el.textContent = '0:00';
      return;
    }
    pintar();
  }, 1000);
}

function ligarCronometroRapido(aoZero) {
  clearInterval(intervaloRapido);
  let resta = SEGUNDOS_RAPIDO;
  const el = document.querySelector('[data-cronometro-rapido]');
  const pintar = () => {
    if (!el) return;
    el.textContent = `0:${String(resta).padStart(2, '0')}`;
  };
  pintar();
  intervaloRapido = setInterval(() => {
    resta -= 1;
    if (resta <= 0) {
      clearInterval(intervaloRapido);
      intervaloRapido = null;
      if (el) el.textContent = '0:00';
      aoZero();
      return;
    }
    pintar();
  }, 1000);
}

function pintarRapido() {
  if (!rapidoSessao || rapidoSessao.concluido) return telaRapidos();
  calar();
  limparTela();
  window.scrollTo(0, 0);
  telaAtiva = 'rapido';
  registrarRota('rapido');
  const item = rapidoSessao.fila[rapidoSessao.i];
  const campo = campoResposta('Escreva em inglês...');
  app.innerHTML = '';
  const miolo = [
    topoVoltar('⚡ Pensa em inglês', () => telaRapidos()),
    h('div', { class: 'revisao-sub' }, `Frase ${rapidoSessao.i + 1} de ${rapidoSessao.fila.length} · ${item.nivel}`),
    h('p', { class: 'sombra-frase' }, item.pergunta)
  ];
  let aoEstourar = null;
  if (rapidoSessao.feedback) {
    campo.status.textContent = '';
    miolo.push(cartaoTutor(rapidoSessao.feedback));
    miolo.push(h('p', { class: 'fala-en', lang: 'en' }, rapidoSessao.feedback.melhor));
    miolo.push(barraModelo(rapidoSessao.feedback.melhor, campo.status));
    miolo.push(campo.status);
    miolo.push(h('button', {
      class: 'btn btn-verde',
      onclick() {
        if (rapidoSessao.i + 1 >= rapidoSessao.fila.length) concluirRapido();
        else {
          descartarVoz();
          rapidoSessao.i++;
          rapidoSessao.feedback = null;
          pintarRapido();
        }
      }
    }, rapidoSessao.i + 1 >= rapidoSessao.fila.length ? 'CONCLUIR' : 'PRÓXIMA'));
  } else {
    miolo.push(h('div', {
      class: 'cronometro-rapido',
      'data-cronometro-rapido': '1',
      role: 'timer',
      'aria-label': 'Tempo restante'
    }, `0:${String(SEGUNDOS_RAPIDO).padStart(2, '0')}`));
    miolo.push(h('p', { class: 'ia-aviso' }, 'Vinte segundos. A frase modelo só aparece depois.'));
    miolo.push(barraGravar(campo.status));
    miolo.push(campo.status, campo.mic, campo.entrada);
    const verificar = h('button', { class: 'btn btn-verde', disabled: true }, 'VERIFICAR');
    campo.entrada.addEventListener('input', () => {
      verificar.disabled = !campo.entrada.value.trim();
    });
    const enviar = async texto => {
      if (!rapidoSessao || rapidoSessao.feedback) return;
      rapidoSessao.feedback = { pendente: true };
      clearInterval(intervaloRapido);
      intervaloRapido = null;
      await finalizarGravacao();
      if (telaAtiva !== 'rapido' || !rapidoSessao) {
        if (rapidoSessao?.feedback?.pendente) rapidoSessao.feedback = null;
        return;
      }
      const aval = avaliarRapido(item, texto);
      rapidoSessao.notas.push(aval.nota);
      if (aval.ok) {
        rapidoSessao.acertos++;
        sons.acerto();
      } else {
        sons.erro();
        if (aval.melhor) rapidoSessao.erros.push({ en: aval.melhor, pt: item.pergunta });
      }
      rapidoSessao.feedback = aval;
      pintarRapido();
    };
    campo.entrada.addEventListener('keydown', e => {
      if (e.key === 'Enter' && campo.entrada.value.trim()) enviar(campo.entrada.value);
    });
    verificar.addEventListener('click', () => {
      if (!campo.entrada.value.trim()) return;
      enviar(campo.entrada.value);
    });
    miolo.push(verificar);
    aoEstourar = () => {
      if (telaAtiva !== 'rapido' || !rapidoSessao || rapidoSessao.feedback) return;
      enviar(campo.entrada.value);
    };
  }
  app.append(h('div', {}, miolo));
  ligarTeclasDaFala();
  focarTela();
  if (aoEstourar) {
    campo.entrada.focus();
    ligarCronometroRapido(aoEstourar);
  }
}

function concluirRapido() {
  if (!rapidoSessao || rapidoSessao.concluido) return pintarFim(rapidoSessao?.fim);
  const total = rapidoSessao.fila.length;
  const nota = fecharNota(rapidoSessao.notas);
  const xp = 8 + rapidoSessao.acertos * 4;
  const evento = registrarRapido({
    xp,
    acertos: rapidoSessao.acertos,
    respostas: total,
    nota,
    errosFala: rapidoSessao.erros,
    perfeita: false,
    comboMax: 0
  });
  rapidoSessao.concluido = true;
  rapidoSessao.fim = {
    titulo: 'Respondeu no tempo!',
    sub: 'Pensa em inglês',
    nota,
    xp: xp + (evento.bonusMissoes ?? 0),
    evento,
    destino: telaRapidos,
    painel: true,
    resumo: true
  };
  descartarVoz();
  pintarFim(rapidoSessao.fim);
}

async function iniciar() {
  aplicarFonte(localStorage.getItem('gringolingo:fonte'));
  contextoDoLog(() => telaAtiva);
  Object.assign(TELAS_POR_NOME, {
    inicial: telaInicial,
    perfil: telaPerfil,
    dicionario: telaDicionario,
    vocabulario: telaVocabulario,
    login: telaLogin,
    privacidade: telaPrivacidade,
    novidades: telaNovidades,
    debug: telaDebug,
    conversa: telaConversa,
    dialogo: () => (dialogo?.ramo ? pintarRamo() : (dialogo ? pintarDialogo() : telaConversa())),
    sombra: () => (sombraSessao ? pintarSombra() : telaConversa()),
    parceiro: telaParceiro,
    frases: telaFrases,
    categoria: () => (categoriaAtual ? telaCategoria(categoriaAtual) : telaFrases()),
    pratica: () => (pratica ? pintarPratica() : telaFrases()),
    fala: () => (falaSessao && !falaSessao.concluido ? pintarFala() : telaInicial()),
    pronuncia: () => (pronunciaSessao && !pronunciaSessao.concluido ? pintarPronuncia() : telaPronuncia()),
    ouvido: () => (ouvidoSessao && !ouvidoSessao.concluido ? pintarOuvido() : telaOuvido()),
    painel: telaPainel,
    tecnico: () => (tecnicoSessao && !tecnicoSessao.concluido ? pintarTecnico() : telaTecnicos()),
    idioma: () => (idiomaSessao && !idiomaSessao.concluido ? pintarIdioma() : telaIdiomas()),
    dia: () => (diaSessao && !diaSessao.concluido ? pintarPerguntaDia() : telaPerguntaDia()),
    deslize: () => (deslizeSessao && !deslizeSessao.concluido ? pintarDeslize() : telaDeslizes()),
    remoto: () => (remotoSessao && !remotoSessao.concluido ? pintarRemoto() : telaRemoto()),
    conto: () => (contoSessao && !contoSessao.concluido ? pintarConto() : telaContos()),
    numero: () => (numeroSessao && !numeroSessao.concluido ? pintarNumero() : telaNumeros()),
    opiniao: () => (opiniaoSessao && !opiniaoSessao.concluido ? pintarOpiniao() : telaOpinioes()),
    descrever: () => (descreverSessao && !descreverSessao.concluido ? pintarDescrever() : telaDescricoes()),
    rapido: () => (rapidoSessao && !rapidoSessao.concluido ? pintarRapido() : telaRapidos()),
    relato: () => (relatoSessao && !relatoSessao.concluido ? pintarRelato() : telaRelatos()),
    cortesia: () => (cortesiaSessao && !cortesiaSessao.concluido ? pintarCortesia() : telaCortesias()),
    aquecer: () => (aquecerSessao && !aquecerSessao.concluido ? pintarAquecer() : telaAquecer()),
    claro: () => (claroSessao && !claroSessao.concluido ? pintarClaro() : telaClaros()),
    demo: () => (demoSessao && !demoSessao.concluido ? pintarDemo() : telaDemos()),
    prazo: () => (prazoSessao && !prazoSessao.concluido ? pintarPrazo() : telaPrazos()),
    star: () => (starSessao && !starSessao.concluido ? pintarStar() : telaStars()),
    enfase: () => (enfaseSessao && !enfaseSessao.concluido ? pintarEnfase() : telaEnfases()),
    decisao: () => (decisaoSessao && !decisaoSessao.concluido ? pintarDecisao() : telaDecisoes()),
    par: () => (parSessao && !parSessao.concluido ? pintarPar() : telaPares()),
    plantao: () => (plantaoSessao && !plantaoSessao.concluido ? pintarPlantao() : telaPlantoes()),
    retro: () => (retroSessao && !retroSessao.concluido ? pintarRetro() : telaRetros()),
    chegada: () => (chegadaSessao && !chegadaSessao.concluido ? pintarChegada() : telaChegadas()),
    ligacao: () => (ligacaoSessao && !ligacaoSessao.concluido ? pintarLigacao() : telaLigacoes()),
    estimativa: () => (estimativaSessao && !estimativaSessao.concluido ? pintarEstimativa() : telaEstimativas()),
    consenso: () => (consensoSessao && !consensoSessao.concluido ? pintarConsenso() : telaConsensos()),
    atendimento: () => (atendimentoSessao && !atendimentoSessao.concluido ? pintarAtendimento() : telaAtendimentos()),
    gestor: () => (gestorSessao && !gestorSessao.concluido ? pintarGestor() : telaGestores()),
    final: () => (finalSessao && !finalSessao.concluido ? pintarFinal() : telaFinais()),
    viagem: () => (viagemSessao && !viagemSessao.concluido ? pintarViagem() : telaViagens()),
    mistura: () => (misturaSessao && !misturaSessao.concluido ? pintarMistura() : telaMisturas()),
    linha: () => (linhaSessao && !linhaSessao.concluido ? pintarLinha() : telaLinhas()),
    slack: () => (slackSessao && !slackSessao.concluido ? pintarSlack() : telaSlacks()),
    social: () => (socialSessao && !socialSessao.concluido ? pintarSocial() : telaSociais()),
    termo: () => (termoSessao && !termoSessao.concluido ? pintarTermo() : telaTermos()),
    salario: () => (salarioSessao && !salarioSessao.concluido ? pintarSalario() : telaSalarios()),
    projeto: () => (projetoSessao && !projetoSessao.concluido ? pintarProjeto() : telaProjetos()),
    sotaque: () => (sotaqueSessao && !sotaqueSessao.concluido ? pintarSotaque() : telaSotaques()),
    desafio: () => (desafioSessao && !desafioSessao.concluido ? pintarDesafio() : telaDesafio()),
    requisito: () => (requisitoSessao && !requisitoSessao.concluido ? pintarRequisito() : telaRequisitos()),
    metrica: () => (metricaSessao && !metricaSessao.concluido ? pintarMetrica() : telaMetricas()),
    aprendizado: () => (aprendizadoSessao && !aprendizadoSessao.concluido ? pintarAprendizado() : telaAprendizados()),
    passeio: () => (passeioSessao && !passeioSessao.concluido ? pintarPasseio() : telaPasseio()),
    falha: () => (falhaSessao && !falhaSessao.concluido ? pintarFalha() : telaFalhas()),
    mentoria: () => (mentoriaSessao && !mentoriaSessao.concluido ? pintarMentoria() : telaMentorias()),
    socorro: () => (socorroSessao && !socorroSessao.concluido ? pintarSocorro() : telaSocorros()),
    palestra: () => (palestraSessao && !palestraSessao.concluido ? pintarPalestra() : telaPalestras()),
    duvida: () => (duvidaSessao && !duvidaSessao.concluido ? pintarDuvida() : telaDuvidas()),
    sinal: () => (sinalSessao && !sinalSessao.concluido ? pintarSinal() : telaSinais()),
    sistema: () => (sistemaSessao && !sistemaSessao.concluido ? pintarSistema() : telaSistemas()),
    codigo: () => (codigoSessao && !codigoSessao.concluido ? pintarCodigo() : telaCodigos()),
    colega: () => (colegaSessao && !colegaSessao.concluido ? pintarColega() : telaColegas()),
    simulado: () => (simuladoSessao && !simuladoSessao.concluido ? pintarSimulado() : telaSimulado()),
    modelo: () => (modeloSessao && !modeloSessao.concluido ? pintarModelo() : telaModelos()),
    furo: () => (furoSessao && !furoSessao.concluido ? pintarFuro() : telaFuros()),
    rotina: () => (rotinaSessao && !rotinaSessao.concluido ? pintarRotina() : telaRotinas()),
    papo: () => (papoSessao && !papoSessao.concluido ? pintarPapo() : telaPapo()),
    futuro: () => (futuroSessao && !futuroSessao.concluido ? pintarFuturo() : telaFuturos()),
    cultura: () => (culturaSessao && !culturaSessao.concluido ? pintarCultura() : telaCulturas()),
    aumento: () => (aumentoSessao && !aumentoSessao.concluido ? pintarAumento() : telaAumentos()),
    rota: () => (rotaSessao && !rotaSessao.concluido ? pintarRota() : telaRotas()),
    vivo: () => (vivoSessao && !vivoSessao.concluido ? pintarVivo() : telaVivos()),
    produto: () => (produtoSessao && !produtoSessao.concluido ? pintarProduto() : telaProdutos()),
    fecho: () => (fechoSessao && !fechoSessao.concluido ? pintarFecho() : telaFechos()),
    espaco: () => (espacoSessao && !espacoSessao.concluido ? pintarEspaco() : telaEspacos()),
    mapa: () => (mapaSessao && !mapaSessao.concluido ? pintarMapa() : telaMapas()),
    duro: () => (duroSessao && !duroSessao.concluido ? pintarDuro() : telaDuros()),
    proposta: () => (propostaSessao && !propostaSessao.concluido ? pintarProposta() : telaPropostas()),
    semana: telaPainel,
    narrar: () => (narraSessao && !narraSessao.concluido ? pintarNarra() : telaNarras()),
    banco: () => (bancoSessao && !bancoSessao.concluido ? pintarBanco() : telaBancos()),
    recusa: () => (recusaSessao && !recusaSessao.concluido ? pintarRecusa() : telaRecusas()),
    sprint: () => (sprintSessao && !sprintSessao.concluido ? pintarSprint() : telaSprints()),
    seguro: () => (seguroSessao && !seguroSessao.concluido ? pintarSeguro() : telaSeguros()),
    meetup: () => (meetupSessao && !meetupSessao.concluido ? pintarMeetup() : telaMeetups()),
    completa: () => (completaSessao && !completaSessao.concluido ? pintarCompleta() : telaCompleta()),
    rodada: () => (rodadaSessao && !rodadaSessao.concluido ? pintarRodada() : telaRodadas()),
    migra: () => (migraSessao && !migraSessao.concluido ? pintarMigra() : telaMigras()),
    estreia: () => (estreiaSessao && !estreiaSessao.concluido ? pintarEstreia() : telaEstreias()),
    foco: () => (focoSessao && !focoSessao.concluido ? pintarFoco() : telaFoco()),
    poker: () => (pokerSessao && !pokerSessao.concluido ? pintarPoker() : telaPokers()),
    leigo: () => (leigoSessao && !leigoSessao.concluido ? pintarLeigo() : telaLeigos()),
    recruta: () => (recrutaSessao && !recrutaSessao.concluido ? pintarRecruta() : telaRecrutas()),
    culpa: () => (culpaSessao && !culpaSessao.concluido ? pintarCulpa() : telaCulpas()),
    raio: () => (raioSessao && !raioSessao.concluido ? pintarRaio() : telaRaios()),
    oferta: () => (ofertaSessao && !ofertaSessao.concluido ? pintarOferta() : telaOfertas()),
    pedido: () => (pedidoSessao && !pedidoSessao.concluido ? pintarPedido() : telaPedidos()),
    cobertura: () => (coberturaSessao && !coberturaSessao.concluido ? pintarCobertura() : telaCoberturas()),
    loom: () => (loomSessao && !loomSessao.concluido ? pintarLoom() : telaLooms()),
    caderno: () => pintarCaderno(),
    grafico: () => (graficoSessao && !graficoSessao.concluido ? pintarGrafico() : telaGraficos()),
    handoff: () => (handoffSessao && !handoffSessao.concluido ? pintarHandoff() : telaHandoffs()),
    elevador: () => (elevadorSessao && !elevadorSessao.concluido ? pintarElevador() : telaElevadores()),
    junta: () => pintarJunta(),
    pista: () => (pistaSessao && !pistaSessao.concluido ? pintarPista() : telaPistas()),
    calma: () => (calmaSessao && !calmaSessao.concluido ? pintarCalma() : telaCalmas()),
    folga: () => (folgaSessao && !folgaSessao.concluido ? pintarFolga() : telaFolgas()),
    abertas: () => pintarAberta(),
    respeito: () => (respeitoSessao && !respeitoSessao.concluido ? pintarRespeito() : telaRespeitos()),
    debito: () => (debitoSessao && !debitoSessao.concluido ? pintarDebito() : telaDebitos()),
    indicacao: () => (indicacaoSessao && !indicacaoSessao.concluido ? pintarIndicacao() : telaIndicacoes()),
    ux: () => (uxSessao && !uxSessao.concluido ? pintarUx() : telaUx()),
    forum: () => (forumSessao && !forumSessao.concluido ? pintarForum() : telaForum()),
    visto: () => (vistoSessao && !vistoSessao.concluido ? pintarVisto() : telaVisto()),
    mes: () => telaMes(),
    facil: () => (facilSessao && !facilSessao.concluido ? pintarFacil() : telaFacils()),
    stack: () => (stackSessao && !stackSessao.concluido ? pintarStack() : telaStacks()),
    sabado: () => (sabadoSessao && !sabadoSessao.concluido ? pintarSabado() : telaSabados()),
    surpresa: () => telaSurpresa(),
    brecha: () => (brechaSessao && !brechaSessao.concluido ? pintarBrecha() : telaBrechas()),
    muda: () => (mudaSessao && !mudaSessao.concluido ? pintarMuda() : telaMudas()),
    gaucho: () => (gauchoSessao && !gauchoSessao.concluido ? pintarGaucho() : telaGauchos()),
    radar: () => (radarSessao && !radarSessao.concluido ? pintarRadar() : telaRadares()),
    aplauso: () => (aplausoSessao && !aplausoSessao.concluido ? pintarAplauso() : telaAplausos()),
    gripe: () => (gripeSessao && !gripeSessao.concluido ? pintarGripe() : telaGripes()),
    pm: () => (pmSessao && !pmSessao.concluido ? pintarPm() : telaPms()),
    laudo: () => (laudoSessao && !laudoSessao.concluido ? pintarLaudo() : telaLaudos()),
    rumo: () => (rumoSessao && !rumoSessao.concluido ? pintarRumo() : telaRumos()),
    acesso: () => (acessoSessao && !acessoSessao.concluido ? pintarAcesso() : telaAcessos()),
    licenca: () => (licencaSessao && !licencaSessao.concluido ? pintarLicenca() : telaLicencas()),
    jargao: () => (jargaoSessao && !jargaoSessao.concluido ? pintarJargao() : telaJargoes()),
    bandeira: () => (bandeiraSessao && !bandeiraSessao.concluido ? pintarBandeira() : telaBandeiras()),
    gelo: () => (geloSessao && !geloSessao.concluido ? pintarGelo() : telaGelos()),
    limite: () => (limiteSessao && !limiteSessao.concluido ? pintarLimite() : telaLimites()),
    canario: () => (canarioSessao && !canarioSessao.concluido ? pintarCanario() : telaCanarios()),
    despedida: () => (despedidaSessao && !despedidaSessao.concluido ? pintarDespedida() : telaDespedidas()),
    repeticao: () => (repeticaoSessao && !repeticaoSessao.concluido ? pintarRepeticao() : telaRepeticoes()),
    carga: () => (cargaSessao && !cargaSessao.concluido ? pintarCarga() : telaCargas()),
    boletim: () => (boletimSessao && !boletimSessao.concluido ? pintarBoletim() : telaBoletins()),
    dono: () => (donoSessao && !donoSessao.concluido ? pintarDono() : telaDonos()),
    manual: () => (manualSessao && !manualSessao.concluido ? pintarManual() : telaManuais()),
    verde: () => (verdeSessao && !verdeSessao.concluido ? pintarVerde() : telaVerdes()),
    certificado: () => (certificadoSessao && !certificadoSessao.concluido ? pintarCertificado() : telaCertificados()),
    rebase: () => (rebaseSessao && !rebaseSessao.concluido ? pintarRebase() : telaRebases()),
    consulta: () => (consultaSessao && !consultaSessao.concluido ? pintarConsulta() : telaConsultas()),
    replica: () => (replicaSessao && !replicaSessao.concluido ? pintarReplica() : telaReplicas()),
    ensaio: () => (ensaioSessao && !ensaioSessao.concluido ? pintarEnsaio() : telaEnsaios()),
    disco: () => (discoSessao && !discoSessao.concluido ? pintarDisco() : telaDiscos()),
    pagina: () => (paginaSessao && !paginaSessao.concluido ? pintarPagina() : telaPaginas()),
    squash: () => (squashSessao && !squashSessao.concluido ? pintarSquash() : telaSquashes()),
    circuito: () => (circuitoSessao && !circuitoSessao.concluido ? pintarCircuito() : telaCircuitos()),
    job: () => (jobSessao && !jobSessao.concluido ? pintarJob() : telaJobs()),
    colheita: () => (colheitaSessao && !colheitaSessao.concluido ? pintarColheita() : telaColheitas()),
    sessao: () => (sessaoFala && !sessaoFala.concluido ? pintarSessao() : telaSessoes()),
    tanque: () => (tanqueSessao && !tanqueSessao.concluido ? pintarTanque() : telaTanques()),
    sonda: () => (sondaSessao && !sondaSessao.concluido ? pintarSonda() : telaSondas()),
    semente: () => (sementeSessao && !sementeSessao.concluido ? pintarSemente() : telaSementes()),
    registro: () => (registroSessao && !registroSessao.concluido ? pintarRegistro() : telaRegistros()),
    rastro: () => (rastroSessao && !rastroSessao.concluido ? pintarRastro() : telaRastros()),
    parada: () => (paradaSessao && !paradaSessao.concluido ? pintarParada() : telaParadas()),
    pod: () => (podSessao && !podSessao.concluido ? pintarPod() : telaPods()),
    lint: () => (lintSessao && !lintSessao.concluido ? pintarLint() : telaLints()),
    origem: () => (origemSessao && !origemSessao.concluido ? pintarOrigem() : telaOrigens()),
    link: () => (linkSessao && !linkSessao.concluido ? pintarLink() : telaLinks()),
    cpu: () => (cpuSessao && !cpuSessao.concluido ? pintarCpu() : telaCpus()),
    copia: () => (copiaSessao && !copiaSessao.concluido ? pintarCopia() : telaCopias()),
    estouro: () => (estouroSessao && !estouroSessao.concluido ? pintarEstouro() : telaEstouros()),
    impasse: () => (impasseSessao && !impasseSessao.concluido ? pintarImpasse() : telaImpasses()),
    dominio: () => (dominioSessao && !dominioSessao.concluido ? pintarDominio() : telaDominios()),
    morta: () => (mortaSessao && !mortaSessao.concluido ? pintarMorta() : telaMortas()),
    ponteiro: () => (ponteiroSessao && !ponteiroSessao.concluido ? pintarPonteiro() : telaPonteiros()),
    eleicao: () => (eleicaoSessao && !eleicaoSessao.concluido ? pintarEleicao() : telaEleicoes()),
    freio: () => (freioSessao && !freioSessao.concluido ? pintarFreio() : telaFreios()),
    pausa: () => (pausaSessao && !pausaSessao.concluido ? pintarPausa() : telaPausas()),
    deriva: () => (derivaSessao && !derivaSessao.concluido ? pintarDeriva() : telaDerivas()),
    descritor: () => (descritorSessao && !descritorSessao.concluido ? pintarDescritor() : telaDescritores()),
    reserva: () => (reservaSessao && !reservaSessao.concluido ? pintarReserva() : telaReservas()),
    varredura: () => (varreduraSessao && !varreduraSessao.concluido ? pintarVarredura() : telaVarreduras()),
    porta: () => (portaSessao && !portaSessao.concluido ? pintarPorta() : telaPortas()),
    inodo: () => (inodoSessao && !inodoSessao.concluido ? pintarInodo() : telaInodos()),
    saida: () => (saidaSessao && !saidaSessao.concluido ? pintarSaida() : telaSaidas()),
    manada: () => (manadaSessao && !manadaSessao.concluido ? pintarManada() : telaManadas()),
    gotejo: () => (gotejoSessao && !gotejoSessao.concluido ? pintarGotejo() : telaGotejos()),
    frio: () => (frioSessao && !frioSessao.concluido ? pintarFrio() : telaFrios()),
    cadeado: () => (cadeadoSessao && !cadeadoSessao.concluido ? pintarCadeado() : telaCadeados()),
    fracos: telaPontosFracos,
    nivel: () => (nivelSessao && !nivelSessao.concluido ? pintarNivel() : telaNivel()),
    pergunta: () => (perguntaSessao && !perguntaSessao.concluido ? pintarPergunta() : telaPerguntas()),
    reducao: () => (reducaoSessao && !reducaoSessao.concluido ? pintarReducao() : telaReducoes()),
    verbo: () => (frasalSessao && !frasalSessao.concluido ? pintarFrasal() : telaFrasais()),
    livre: () => (livreSessao && !livreSessao.concluido ? pintarLivre() : telaLivres()),
    resumo: telaResumo,
    resultado: () => (resultadoAtual ? pintarFim(resultadoAtual) : telaConversa())
  });
  window.addEventListener('popstate', aoVoltarDoNavegador);
  desafioAtivo = lerDesafio();
  avisoPendente = nuvemConfigurada ? erroNaUrl() : null;
  authCarregando = nuvemConfigurada;
  if (modoDebug()) {
    telaDebug();
    return;
  }
  telaInicial();
  registrarServiceWorker();
  pintarBarraDoSistema();
  registrarAberturaDoDia();
  avisarMetricas();
  atualizarItensExtras();
  window.addEventListener('appinstalled', () => registrarEvento('instalou'));
  agendarLembrete();
  aoCarregarVozes(() => {
    if (telaAtiva === 'perfil') repintarCartaoVoz();
  });
  window.addEventListener('online', () => {
    semRede = false;
    tentarReenviar();
    if (telaAtiva === 'inicial') telaInicial();
  });
  window.addEventListener('offline', () => {
    semRede = true;
    if (telaAtiva === 'inicial') telaInicial();
  });
  window.addEventListener('beforeinstallprompt', evento => {
    evento.preventDefault();
    pedidoInstalar = evento;
    if (telaAtiva === 'inicial' && !jaInstalado()) telaInicial();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tentarReenviar();
  });
  observarPendencia(pendente => {
    if (telaAtiva === 'inicial' && syncPendente !== pendente) {
      syncPendente = pendente;
      telaInicial();
    }
  });
  if (!nuvemConfigurada) return;
  checarGoogle();
  try {
    window.addEventListener('storage', e => {
      if (e.key !== 'gringolingo') return;
      if (e.newValue === null) {
        geracaoAuth++;
        limparEstadoMemoria();
        ativarSync(false);
        usuarioEmail = null;
        syncPendente = false;
        authCarregando = false;
        repintarTelaAtual();
        return;
      }
      // Outra aba salvou progresso: mesclar aqui em vez de deixar o próximo
      // salvar() desta aba sobrescrever o que ela fez. mesclarDeOutraAba só
      // regrava quando ganhou algo. Sem eco infinito entre as abas.
      try {
        if (mesclarDeOutraAba(e.newValue)) {
          atualizarItensExtras();
          if (telaAtiva === 'inicial' || telaAtiva === 'perfil') repintarTelaAtual();
        }
      } catch {}
    });
    await aoMudarAuth(evento => {
      if (evento === 'SIGNED_OUT' && usuarioEmail) {
        geracaoAuth++;
        usuarioEmail = null;
        ativarSync(false);
        syncPendente = false;
        authCarregando = false;
        repintarTelaAtual();
      }
    });
    const s = await sessaoAtual();
    if (s) {
      await aposLogin(false);
      return;
    }
  } catch {}
  authCarregando = false;
  finalizarAuth(false);
}

iniciar();
