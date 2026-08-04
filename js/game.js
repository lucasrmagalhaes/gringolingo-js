import { UNIDADES, NIVEIS, BADGES, MISSOES } from './data.js';
import { enviarProgresso } from './nuvem.js';

const CHAVE = 'gringolingo';
const CHAVE_CONTA = 'gringolingo:conta';
let syncAtivo = false;

const INTERVALOS = [1, 3, 7, 16, 35];

const padrao = () => ({
  xp: 0,
  streak: 0,
  ultimoDia: null,
  licoes: {},
  itens: {},
  erros: [],
  badges: [],
  historico: {},
  favoritas: [],
  meta: 30,
  protetores: 1,
  missoes: null,
  lembrete: null,
  stats: { licoes: 0, acertos: 0, respostas: 0, comboMax: 0, revisoes: 0, perfeitas: 0 }
});

export const METAS = [20, 30, 50, 80];

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (!salvo) return padrao();
    return { ...padrao(), ...salvo, itens: { ...salvo.itens }, historico: { ...salvo.historico }, favoritas: [...(salvo.favoritas ?? [])], stats: { ...padrao().stats, ...salvo.stats } };
  } catch {
    return padrao();
  }
}

export const estado = carregar();

const CHAVE_PENDENTE = 'gringolingo:pendente';
let enviando = false;
let reenviar = false;
let aoMudarPendencia = null;

export function observarPendencia(cb) {
  aoMudarPendencia = cb;
}

export function temPendencia() {
  return localStorage.getItem(CHAVE_PENDENTE) === '1';
}

function marcarPendencia(valor) {
  if (valor) localStorage.setItem(CHAVE_PENDENTE, '1');
  else localStorage.removeItem(CHAVE_PENDENTE);
  aoMudarPendencia?.(valor);
}

async function subirEstado() {
  if (enviando) {
    reenviar = true;
    return;
  }
  enviando = true;
  try {
    await enviarProgresso(estado);
    marcarPendencia(false);
  } catch {
    marcarPendencia(true);
  } finally {
    enviando = false;
    if (reenviar) {
      reenviar = false;
      subirEstado();
    }
  }
}

export function tentarReenviar() {
  if (syncAtivo && temPendencia()) subirEstado();
}

export function salvar() {
  localStorage.setItem(CHAVE, JSON.stringify(estado));
  if (syncAtivo) subirEstado();
}

export function ativarSync(valor) {
  syncAtivo = valor;
  if (valor) tentarReenviar();
}

export function limparEstadoMemoria() {
  const novo = padrao();
  Object.keys(estado).forEach(k => delete estado[k]);
  Object.assign(estado, novo);
}

export function resetarEstado() {
  localStorage.removeItem(CHAVE);
  localStorage.removeItem(CHAVE_CONTA);
  limparEstadoMemoria();
}

export function contaLocal() {
  return localStorage.getItem(CHAVE_CONTA);
}

export function definirContaLocal(id) {
  if (id) localStorage.setItem(CHAVE_CONTA, id);
  else localStorage.removeItem(CHAVE_CONTA);
}

export function enviarAgora() {
  return enviarProgresso(estado);
}

export function exportarEstado() {
  return { app: 'gringolingo', versao: 1, quando: new Date().toISOString(), estado: JSON.parse(JSON.stringify(estado)) };
}

export function importarEstado(bruto) {
  const dados = bruto?.estado ?? bruto;
  if (!dados || typeof dados !== 'object' || typeof dados.xp !== 'number' || typeof dados.licoes !== 'object') {
    throw new Error('Arquivo não parece um backup do GringoLingo');
  }
  const antes = estado.xp;
  mesclarEstado(dados);
  return { antes, depois: estado.xp };
}

export function ehFavorita(en) {
  return estado.favoritas.some(f => f.en === en);
}

export function alternarFavorita(item) {
  const idx = estado.favoritas.findIndex(f => f.en === item.en);
  if (idx >= 0) estado.favoritas.splice(idx, 1);
  else estado.favoritas.push({ en: item.en, pt: item.pt, classe: item.classe ?? null });
  salvar();
  return idx < 0;
}

export function itensFavoritos() {
  return estado.favoritas.map(f => ({
    en: f.en,
    pt: Array.isArray(f.pt) ? f.pt[0] : f.pt,
    alt: Array.isArray(f.pt) ? f.pt.slice(1) : [],
    classe: f.classe
  }));
}

export function distribuicaoDeCaixas() {
  const caixas = [0, 0, 0, 0, 0];
  Object.values(estado.itens).forEach(a => {
    const c = Math.min(Math.max(a?.caixa ?? 0, 0), 4);
    caixas[c]++;
  });
  return caixas;
}

export function historicoRecente(dias) {
  return Array.from({ length: dias }, (_, i) => {
    const d = dia(new Date(Date.now() - (dias - 1 - i) * 864e5));
    return { data: d, xp: estado.historico[d] ?? 0 };
  });
}

function diaAnterior(d) {
  return dia(new Date(new Date(d + 'T00:00:00Z').getTime() - 864e5));
}

export function mesclarEstado(remoto) {
  if (remoto) {
    estado.xp = Math.max(estado.xp, remoto.xp ?? 0);
    if (remoto.ultimoDia) {
      if (!estado.ultimoDia) {
        estado.ultimoDia = remoto.ultimoDia;
        estado.streak = remoto.streak ?? 0;
      } else if (remoto.ultimoDia > estado.ultimoDia) {
        const continua = estado.ultimoDia === diaAnterior(remoto.ultimoDia);
        estado.streak = Math.max(remoto.streak ?? 0, continua ? estado.streak + 1 : 0);
        estado.ultimoDia = remoto.ultimoDia;
      } else if (remoto.ultimoDia === estado.ultimoDia) {
        estado.streak = Math.max(estado.streak, remoto.streak ?? 0);
      } else {
        const continua = remoto.ultimoDia === diaAnterior(estado.ultimoDia);
        estado.streak = Math.max(estado.streak, continua ? (remoto.streak ?? 0) + 1 : 0);
      }
    }
    for (const [id, dados] of Object.entries(remoto.licoes ?? {})) {
      estado.licoes[id] = { estrelas: Math.max(estado.licoes[id]?.estrelas ?? 0, dados?.estrelas ?? 0) };
    }
    const registrados = new Set(estado.erros.map(e => e.en));
    (remoto.erros ?? []).forEach(e => {
      if (e?.en && !registrados.has(e.en)) {
        estado.erros.push({ en: e.en, pt: e.pt ?? '' });
        registrados.add(e.en);
      }
    });
    for (const [en, agenda] of Object.entries(remoto.itens ?? {})) {
      const local = estado.itens[en];
      if (!agenda?.proxima) continue;
      if (!local) {
        estado.itens[en] = { caixa: agenda.caixa ?? 0, proxima: agenda.proxima };
      } else {
        estado.itens[en] = {
          caixa: Math.min(local.caixa, agenda.caixa ?? 0),
          proxima: local.proxima < agenda.proxima ? local.proxima : agenda.proxima
        };
      }
    }
    estado.badges = [...new Set([...estado.badges, ...(remoto.badges ?? [])])];
    const favEn = new Set(estado.favoritas.map(f => f.en));
    (remoto.favoritas ?? []).forEach(f => {
      if (f?.en && !favEn.has(f.en)) {
        estado.favoritas.push({ en: f.en, pt: f.pt ?? [], classe: f.classe ?? null });
        favEn.add(f.en);
      }
    });
    for (const [d, xp] of Object.entries(remoto.historico ?? {})) {
      estado.historico[d] = Math.max(estado.historico[d] ?? 0, xp ?? 0);
    }
    estado.protetores = Math.max(estado.protetores, remoto.protetores ?? 0);
    if (remoto.meta && !estado.stats.licoes) estado.meta = remoto.meta;
    const remotoStats = remoto.stats ?? {};
    for (const k of Object.keys(estado.stats)) {
      estado.stats[k] = Math.max(estado.stats[k], remotoStats[k] ?? 0);
    }
  }
  migrarErros();
  salvar();
}

const dia = d => d.toISOString().slice(0, 10);
const hoje = () => dia(new Date());
const ontem = () => dia(new Date(Date.now() - 864e5));

export function streakAtual() {
  return estado.ultimoDia === hoje() || estado.ultimoDia === ontem() ? estado.streak : 0;
}

export function streakEmRisco() {
  return estado.ultimoDia === ontem() && estado.streak > 0;
}

function atualizarStreak() {
  if (estado.ultimoDia === hoje()) return { usouProtetor: false };
  const anteontem = dia(new Date(Date.now() - 2 * 864e5));
  let usouProtetor = false;
  if (estado.ultimoDia === ontem()) {
    estado.streak += 1;
  } else if (estado.ultimoDia === anteontem && estado.protetores > 0 && estado.streak > 0) {
    estado.protetores -= 1;
    estado.streak += 1;
    usouProtetor = true;
  } else {
    estado.streak = 1;
  }
  estado.ultimoDia = hoje();
  return { usouProtetor };
}

export function xpDoDia() {
  return estado.historico[hoje()] ?? 0;
}

export function metaBatida() {
  return xpDoDia() >= estado.meta;
}

export function definirMeta(valor) {
  estado.meta = valor;
  salvar();
}

export function semanaAtual() {
  const base = new Date();
  const diaSemana = (base.getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => {
    const d = dia(new Date(base.getTime() + (i - diaSemana) * 864e5));
    return { data: d, xp: estado.historico[d] ?? 0, hoje: d === hoje(), futuro: d > hoje() };
  });
}

function registrarDia(xp) {
  const d = hoje();
  estado.historico[d] = (estado.historico[d] ?? 0) + xp;
  const limite = dia(new Date(Date.now() - 400 * 864e5));
  Object.keys(estado.historico).forEach(k => {
    if (k < limite) delete estado.historico[k];
  });
}

export function nivelInfo() {
  let i = 0;
  NIVEIS.forEach((n, idx) => {
    if (estado.xp >= n.xp) i = idx;
  });
  const atual = NIVEIS[i];
  const prox = NIVEIS[i + 1] || null;
  return {
    numero: i + 1,
    titulo: atual.titulo,
    emoji: atual.emoji,
    prox,
    progresso: prox ? (estado.xp - atual.xp) / (prox.xp - atual.xp) : 1
  };
}

function emDias(n) {
  return dia(new Date(Date.now() + n * 864e5));
}

function agendar(en, acertou) {
  const atual = estado.itens[en];
  const caixa = acertou ? Math.min((atual?.caixa ?? -1) + 1, INTERVALOS.length - 1) : 0;
  estado.itens[en] = { caixa, proxima: emDias(INTERVALOS[caixa]) };
}

function aplicarAgendamentos(resultados) {
  (resultados ?? []).forEach(r => agendar(r.en, r.acertou));
}

export function itensVencidos() {
  const aprendidos = itensAprendidos();
  const limite = hoje();
  return aprendidos
    .filter(i => {
      const agenda = estado.itens[i.en];
      return !agenda || agenda.proxima <= limite;
    })
    .map(i => ({ item: i, agenda: estado.itens[i.en] }))
    .sort((a, b) => {
      const proximaA = a.agenda?.proxima ?? '9999-12-31';
      const proximaB = b.agenda?.proxima ?? '9999-12-31';
      if (proximaA !== proximaB) return proximaA < proximaB ? -1 : 1;
      return (a.agenda?.caixa ?? 0) - (b.agenda?.caixa ?? 0);
    })
    .map(x => x.item);
}

function semente(texto) {
  let h = 0;
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  return h;
}

export function missoesDeHoje() {
  const d = hoje();
  if (estado.missoes?.dia !== d) {
    const escolhidas = MISSOES
      .map(m => ({ id: m.id, chave: semente(d + m.id) }))
      .sort((a, b) => a.chave - b.chave)
      .slice(0, 3);
    estado.missoes = { dia: d, progresso: escolhidas.map(m => ({ id: m.id, valor: 0, pago: false })) };
  }
  return estado.missoes.progresso.map(p => {
    const def = MISSOES.find(m => m.id === p.id);
    return { ...def, valor: Math.min(p.valor, def.alvo), concluida: p.valor >= def.alvo };
  });
}

function avancarMissoes(sessao) {
  missoesDeHoje();
  let bonus = 0;
  const novas = [];
  estado.missoes.progresso.forEach(p => {
    const def = MISSOES.find(m => m.id === p.id);
    if (!def || p.pago) return;
    p.valor += def.medir(sessao);
    if (p.valor >= def.alvo) {
      p.pago = true;
      bonus += def.xp;
      novas.push(def);
    }
  });
  return { bonus, novas };
}

function migrarErros() {
  let mudou = false;
  estado.erros.forEach(e => {
    if (e?.en && !estado.itens[e.en]) {
      estado.itens[e.en] = { caixa: 0, proxima: hoje() };
      mudou = true;
    }
  });
  return mudou;
}

export function itensAprendidos() {
  const itens = [];
  UNIDADES.forEach(u => u.licoes.forEach(l => {
    if (estado.licoes[l.id]) itens.push(...l.itens);
  }));
  return itens;
}

function unidadeCompleta(u) {
  return u.licoes.every(l => estado.licoes[l.id]);
}

export function memorizadas() {
  return Object.values(estado.itens).filter(a => (a?.caixa ?? 0) >= 3).length;
}

function metasBatidas() {
  return Object.entries(estado.historico).filter(([, xp]) => xp >= estado.meta).length;
}

function checarBadges() {
  const cond = {
    primeira: estado.stats.licoes >= 1,
    perfeita: estado.stats.perfeitas >= 1,
    combo5: estado.stats.comboMax >= 5,
    xp100: estado.xp >= 100,
    xp500: estado.xp >= 500,
    streak3: estado.streak >= 3,
    streak7: estado.streak >= 7,
    revisor: estado.stats.revisoes >= 1,
    unidade: UNIDADES.some(unidadeCompleta),
    streak14: estado.streak >= 14,
    streak30: estado.streak >= 30,
    xp1000: estado.xp >= 1000,
    xp2000: estado.xp >= 2000,
    licoes25: Object.keys(estado.licoes).length >= 25,
    perfeitas10: estado.stats.perfeitas >= 10,
    memoria50: memorizadas() >= 50,
    metas7: metasBatidas() >= 7,
    tudo: UNIDADES.every(unidadeCompleta)
  };
  const novas = BADGES.filter(b => cond[b.id] && !estado.badges.includes(b.id));
  novas.forEach(b => estado.badges.push(b.id));
  return novas;
}

export function registrarLicao(licaoId, d) {
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida();
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak();
  const missao = avancarMissoes({ ...d, tipo: 'licao' });
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus);
  const antes = estado.licoes[licaoId];
  estado.licoes[licaoId] = { estrelas: Math.max(antes?.estrelas ?? 0, d.estrelas) };
  estado.stats.licoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  if (d.perfeita) {
    estado.stats.perfeitas++;
    if (estado.stats.perfeitas % 5 === 0) estado.protetores = Math.min(estado.protetores + 1, 2);
  }
  const registrados = new Set(estado.erros.map(e => e.en));
  d.errosItens.forEach(it => {
    if (!registrados.has(it.en)) {
      estado.erros.push({ en: it.en, pt: it.pt });
      registrados.add(it.en);
    }
  });
  aplicarAgendamentos(d.agendamentos);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

export function registrarRevisao(d) {
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida();
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak();
  const missao = avancarMissoes({ ...d, tipo: 'revisao' });
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus);
  estado.stats.revisoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  const acertadas = new Set(d.acertadosEn);
  estado.erros = estado.erros.filter(e => !acertadas.has(e.en));
  aplicarAgendamentos(d.agendamentos);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

if (migrarErros()) salvar();
