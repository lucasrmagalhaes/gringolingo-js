import { UNIDADES, NIVEIS, BADGES } from './data.js';
import { enviarProgresso } from './nuvem.js';

const CHAVE = 'gringolingo';
const CHAVE_CONTA = 'gringolingo:conta';
let syncAtivo = false;

const padrao = () => ({
  xp: 0,
  streak: 0,
  ultimoDia: null,
  licoes: {},
  erros: [],
  badges: [],
  stats: { licoes: 0, acertos: 0, respostas: 0, comboMax: 0, revisoes: 0, perfeitas: 0 }
});

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (!salvo) return padrao();
    return { ...padrao(), ...salvo, stats: { ...padrao().stats, ...salvo.stats } };
  } catch {
    return padrao();
  }
}

export const estado = carregar();

export function salvar() {
  localStorage.setItem(CHAVE, JSON.stringify(estado));
  if (syncAtivo) enviarProgresso(estado).catch(() => {});
}

export function ativarSync(valor) {
  syncAtivo = valor;
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
    estado.badges = [...new Set([...estado.badges, ...(remoto.badges ?? [])])];
    const remotoStats = remoto.stats ?? {};
    for (const k of Object.keys(estado.stats)) {
      estado.stats[k] = Math.max(estado.stats[k], remotoStats[k] ?? 0);
    }
  }
  salvar();
}

const dia = d => d.toISOString().slice(0, 10);
const hoje = () => dia(new Date());
const ontem = () => dia(new Date(Date.now() - 864e5));

export function streakAtual() {
  return estado.ultimoDia === hoje() || estado.ultimoDia === ontem() ? estado.streak : 0;
}

function atualizarStreak() {
  if (estado.ultimoDia === hoje()) return;
  estado.streak = estado.ultimoDia === ontem() ? estado.streak + 1 : 1;
  estado.ultimoDia = hoje();
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
    tudo: UNIDADES.every(unidadeCompleta)
  };
  const novas = BADGES.filter(b => cond[b.id] && !estado.badges.includes(b.id));
  novas.forEach(b => estado.badges.push(b.id));
  return novas;
}

export function registrarLicao(licaoId, d) {
  atualizarStreak();
  estado.xp += d.xp;
  const antes = estado.licoes[licaoId];
  estado.licoes[licaoId] = { estrelas: Math.max(antes?.estrelas ?? 0, d.estrelas) };
  estado.stats.licoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  if (d.perfeita) estado.stats.perfeitas++;
  const registrados = new Set(estado.erros.map(e => e.en));
  d.errosItens.forEach(it => {
    if (!registrados.has(it.en)) {
      estado.erros.push({ en: it.en, pt: it.pt });
      registrados.add(it.en);
    }
  });
  const novas = checarBadges();
  salvar();
  return novas;
}

export function registrarRevisao(d) {
  atualizarStreak();
  estado.xp += d.xp;
  estado.stats.revisoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  const acertadas = new Set(d.acertadosEn);
  estado.erros = estado.erros.filter(e => !acertadas.has(e.en));
  const novas = checarBadges();
  salvar();
  return novas;
}
