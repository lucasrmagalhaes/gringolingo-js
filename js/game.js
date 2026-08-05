import { UNIDADES, NIVEIS, BADGES, MISSOES } from './data.js';
import { enviarProgresso, baixarProgresso } from './nuvem.js';

const CHAVE = 'gringolingo';
const CHAVE_CONTA = 'gringolingo:conta';
let syncAtivo = false;

export const INTERVALOS = [1, 3, 7, 16, 35];

// Versão do formato enviado à nuvem: um cliente antigo não mescla payload de versão maior.
export const VERSAO_DADOS = 2;

// Relógio injetável (testes fixam o "agora"); o dia do app é o dia LOCAL do aparelho,
// nunca UTC — senão o streak e as missões viram às 21h no Brasil.
let agoraFn = () => new Date();

export function definirAgora(fn) {
  agoraFn = fn ?? (() => new Date());
}

const dia = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const hoje = () => dia(agoraFn());

function diasDeDistancia(n) {
  const d = agoraFn();
  d.setDate(d.getDate() + n);
  return dia(d);
}

function diaAnterior(d) {
  const dt = new Date(d + 'T00:00:00');
  dt.setDate(dt.getDate() - 1);
  return dia(dt);
}

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
  meta: 100,
  protetores: 1,
  protetoresGanhos: 1,
  protetoresGastos: 0,
  missoes: null,
  lembrete: null,
  stats: { licoes: 0, acertos: 0, respostas: 0, comboMax: 0, revisoes: 0, perfeitas: 0, recordeRelampago: 0, metasBatidas: 0 }
});

export const METAS = [50, 100, 200, 350];

const num = v => (Number.isFinite(Number(v)) ? Number(v) : 0);
const chaveSegura = k => k !== '__proto__' && k !== 'constructor' && k !== 'prototype';

// Uma lição perfeita rende ~165 XP, então as metas antigas (20-80) eram batidas
// com uma lição só; os valores migram para a escala nova mantendo a intenção.
const METAS_ANTIGAS = { 20: 50, 30: 100, 50: 200, 80: 350 };

function sanitizar(salvo) {
  const base = padrao();
  const s = { ...base, ...salvo };
  s.xp = num(s.xp);
  s.streak = num(s.streak);
  s.ultimoDia = typeof s.ultimoDia === 'string' ? s.ultimoDia : null;
  s.licoes = s.licoes && typeof s.licoes === 'object' && !Array.isArray(s.licoes) ? { ...s.licoes } : {};
  s.itens = s.itens && typeof s.itens === 'object' && !Array.isArray(s.itens) ? { ...s.itens } : {};
  s.erros = Array.isArray(s.erros) ? s.erros.filter(e => e && typeof e.en === 'string') : [];
  s.badges = Array.isArray(s.badges) ? s.badges.filter(b => typeof b === 'string') : [];
  s.historico = s.historico && typeof s.historico === 'object' && !Array.isArray(s.historico) ? { ...s.historico } : {};
  s.favoritas = Array.isArray(s.favoritas) ? s.favoritas.filter(f => f && typeof f.en === 'string') : [];
  s.meta = METAS.includes(num(s.meta)) ? num(s.meta) : METAS_ANTIGAS[num(s.meta)] ?? base.meta;
  s.protetores = Math.max(0, Math.min(num(s.protetores), 2));
  s.protetoresGanhos = salvo?.protetoresGanhos != null ? num(s.protetoresGanhos) : Math.max(s.protetores, 1);
  s.protetoresGastos = num(s.protetoresGastos);
  s.missoes = s.missoes && typeof s.missoes === 'object' && typeof s.missoes.dia === 'string' && Array.isArray(s.missoes.progresso) ? s.missoes : null;
  s.stats = { ...base.stats, ...(s.stats && typeof s.stats === 'object' ? s.stats : {}) };
  for (const k of Object.keys(s.stats)) s.stats[k] = num(s.stats[k]);
  if (salvo?.stats?.metasBatidas == null) {
    s.stats.metasBatidas = Object.values(s.historico).filter(xp => num(xp) >= s.meta).length;
  }
  return s;
}

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (!salvo || typeof salvo !== 'object') return padrao();
    return sanitizar(salvo);
  } catch {
    return padrao();
  }
}

export const estado = carregar();

const CHAVE_PENDENTE = 'gringolingo:pendente';
let enviando = false;
let reenviar = false;
let aoMudarPendencia = null;
let falhasSeguidas = 0;
let proximaTentativa = 0;
let timerEnvio = null;

export function observarPendencia(cb) {
  aoMudarPendencia = cb;
}

export function temPendencia() {
  return localStorage.getItem(CHAVE_PENDENTE) !== null;
}

// 'grande' = o payload viola a constraint do banco; reenviar nunca vai resolver.
export function motivoPendencia() {
  return localStorage.getItem(CHAVE_PENDENTE);
}

function marcarPendencia(valor) {
  try {
    if (valor) localStorage.setItem(CHAVE_PENDENTE, valor === true ? '1' : valor);
    else localStorage.removeItem(CHAVE_PENDENTE);
  } catch {}
  aoMudarPendencia?.(!!valor);
}

// O que sobe para a nuvem: o estado com o histórico podado (o merge por dia
// preserva o resto em cada aparelho) e a etiqueta de versão do formato.
function payloadNuvem() {
  const historico = {};
  const limite = diasDeDistancia(-180);
  for (const [d, xp] of Object.entries(estado.historico)) {
    if (d >= limite) historico[d] = xp;
  }
  return { ...estado, historico, erros: estado.erros.slice(-200), versaoDados: VERSAO_DADOS };
}

async function subirEstado() {
  if (enviando) {
    reenviar = true;
    return;
  }
  if (Date.now() < proximaTentativa) return;
  enviando = true;
  try {
    const motivo = motivoPendencia();
    if (motivo === '1' || motivo === 'versao') {
      // Havia pendência: outro aparelho pode ter subido progresso nesse meio
      // tempo — mesclar antes de enviar, senão o reenvio apaga o que ele fez.
      let confirmado = false;
      try {
        const remoto = await baixarProgresso();
        if (remoto && typeof remoto === 'object' && !Array.isArray(remoto)) {
          if (num(remoto.versaoDados) > VERSAO_DADOS) {
            marcarPendencia('versao');
            return;
          }
          mesclar(remoto);
          try {
            localStorage.setItem(CHAVE, JSON.stringify(estado));
          } catch {}
        }
        confirmado = true;
      } catch {}
      // Pendência de versão: sem CONFIRMAR que a nuvem voltou a ser compatível,
      // nenhum envio acontece — subir aqui apagaria os dados do app mais novo.
      if (motivo === 'versao' && !confirmado) return;
    }
    await enviarProgresso(payloadNuvem());
    falhasSeguidas = 0;
    proximaTentativa = 0;
    marcarPendencia(false);
  } catch (e) {
    if (e?.permanente) {
      marcarPendencia('grande');
    } else {
      falhasSeguidas++;
      proximaTentativa = Date.now() + Math.min(2000 * 2 ** (falhasSeguidas - 1), 300000);
      marcarPendencia('1');
    }
  } finally {
    enviando = false;
    if (reenviar) {
      reenviar = false;
      subirEstado();
    }
  }
}

export function tentarReenviar() {
  if (syncAtivo && motivoPendencia() === '1') subirEstado();
}

export function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch {}
  if (syncAtivo) {
    clearTimeout(timerEnvio);
    timerEnvio = setTimeout(subirEstado, 1500);
  }
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

export async function enviarAgora() {
  // Mesmo caminho protegido do subirEstado: com pendência, baixa e mescla
  // antes (e recusa subir por cima de uma versão mais nova da nuvem).
  if (motivoPendencia()) {
    const remoto = await baixarProgresso();
    if (remoto && typeof remoto === 'object' && !Array.isArray(remoto)) {
      if (num(remoto.versaoDados) > VERSAO_DADOS) {
        throw new Error('Esse progresso na nuvem é de uma versão mais nova do app');
      }
      mesclar(remoto);
      try {
        localStorage.setItem(CHAVE, JSON.stringify(estado));
      } catch {}
    }
  }
  await enviarProgresso(payloadNuvem());
  marcarPendencia(false);
}

export function exportarEstado() {
  return { app: 'gringolingo', versao: 1, quando: new Date().toISOString(), estado: JSON.parse(JSON.stringify(estado)) };
}

export function importarEstado(bruto, modo = 'mesclar') {
  const dados = bruto?.estado ?? bruto;
  if (!dados || typeof dados !== 'object' || typeof dados.xp !== 'number' || typeof dados.licoes !== 'object') {
    throw new Error('Arquivo não parece um backup do GringoLingo');
  }
  const antes = estado.xp;
  if (modo === 'substituir') {
    const novo = sanitizar(dados);
    Object.keys(estado).forEach(k => delete estado[k]);
    Object.assign(estado, novo);
    migrarErros();
    salvar();
  } else {
    mesclarEstado(dados);
  }
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
    const d = diasDeDistancia(-(dias - 1 - i));
    return { data: d, xp: estado.historico[d] ?? 0 };
  });
}

function mesclar(remoto) {
  {
    estado.xp = Math.max(estado.xp, num(remoto.xp));
    if (typeof remoto.ultimoDia === 'string') {
      if (!estado.ultimoDia) {
        estado.ultimoDia = remoto.ultimoDia;
        estado.streak = num(remoto.streak);
      } else if (remoto.ultimoDia > estado.ultimoDia) {
        const continua = estado.ultimoDia === diaAnterior(remoto.ultimoDia);
        estado.streak = Math.max(num(remoto.streak), continua ? estado.streak + 1 : 0);
        estado.ultimoDia = remoto.ultimoDia;
      } else if (remoto.ultimoDia === estado.ultimoDia) {
        estado.streak = Math.max(estado.streak, num(remoto.streak));
      } else {
        const continua = remoto.ultimoDia === diaAnterior(estado.ultimoDia);
        estado.streak = Math.max(estado.streak, continua ? num(remoto.streak) + 1 : 0);
      }
    }
    for (const [id, dados] of Object.entries(remoto.licoes ?? {})) {
      if (!chaveSegura(id)) continue;
      estado.licoes[id] = { estrelas: Math.max(num(estado.licoes[id]?.estrelas), num(dados?.estrelas)) };
    }
    const registrados = new Set(estado.erros.map(e => e.en));
    (Array.isArray(remoto.erros) ? remoto.erros : []).forEach(e => {
      if (typeof e?.en === 'string' && !registrados.has(e.en)) {
        estado.erros.push({ en: e.en, pt: e.pt ?? '' });
        registrados.add(e.en);
      }
    });
    for (const [en, agenda] of Object.entries(remoto.itens ?? {})) {
      if (!chaveSegura(en) || typeof agenda?.proxima !== 'string') continue;
      const local = estado.itens[en];
      const lapsos = Math.max(num(local?.lapsos), num(agenda.lapsos));
      const caixaRemota = Math.max(0, Math.min(num(agenda.caixa), INTERVALOS.length - 1));
      if (!local) {
        estado.itens[en] = { caixa: caixaRemota, proxima: agenda.proxima, lapsos };
      } else {
        estado.itens[en] = {
          caixa: Math.min(Math.max(0, num(local.caixa)), caixaRemota),
          proxima: local.proxima < agenda.proxima ? local.proxima : agenda.proxima,
          lapsos
        };
      }
    }
    estado.badges = [...new Set([...estado.badges, ...(Array.isArray(remoto.badges) ? remoto.badges.filter(b => typeof b === 'string') : [])])];
    const favEn = new Set(estado.favoritas.map(f => f.en));
    (Array.isArray(remoto.favoritas) ? remoto.favoritas : []).forEach(f => {
      if (typeof f?.en === 'string' && !favEn.has(f.en)) {
        estado.favoritas.push({ en: f.en, pt: f.pt ?? [], classe: f.classe ?? null });
        favEn.add(f.en);
      }
    });
    for (const [d, xp] of Object.entries(remoto.historico ?? {})) {
      if (!chaveSegura(d)) continue;
      estado.historico[d] = Math.max(num(estado.historico[d]), num(xp));
    }
    // Protetores mesclam por contadores monotônicos: gasto num aparelho não
    // regenera pelo Math.max do outro (o saldo é derivado de ganhos - gastos).
    estado.protetoresGanhos = Math.max(num(estado.protetoresGanhos), remoto.protetoresGanhos != null ? num(remoto.protetoresGanhos) : num(remoto.protetores));
    estado.protetoresGastos = Math.max(num(estado.protetoresGastos), num(remoto.protetoresGastos));
    estado.protetores = Math.max(0, Math.min(estado.protetoresGanhos - estado.protetoresGastos, 2));
    const rm = remoto.missoes;
    if (rm && typeof rm.dia === 'string' && Array.isArray(rm.progresso)) {
      if (!estado.missoes || estado.missoes.dia < rm.dia) {
        estado.missoes = { dia: rm.dia, progresso: rm.progresso.filter(p => typeof p?.id === 'string').map(p => ({ id: p.id, valor: num(p.valor), pago: !!p.pago })) };
      } else if (estado.missoes.dia === rm.dia) {
        estado.missoes.progresso.forEach(p => {
          const outro = rm.progresso.find(x => x?.id === p.id);
          if (!outro) return;
          p.valor = Math.max(p.valor, num(outro.valor));
          p.pago = p.pago || !!outro.pago;
        });
      }
    }
    if (remoto.meta && !estado.stats.licoes) estado.meta = METAS.includes(num(remoto.meta)) ? num(remoto.meta) : METAS_ANTIGAS[num(remoto.meta)] ?? estado.meta;
    const remotoStats = remoto.stats && typeof remoto.stats === 'object' ? remoto.stats : {};
    for (const k of Object.keys(estado.stats)) {
      estado.stats[k] = Math.max(estado.stats[k], num(remotoStats[k]));
    }
  }
}

export function mesclarEstado(remoto) {
  if (remoto && (typeof remoto !== 'object' || Array.isArray(remoto))) remoto = null;
  if (remoto && num(remoto.versaoDados) > VERSAO_DADOS) {
    throw new Error('Esse progresso foi salvo por uma versão mais nova do app — atualize o app para sincronizar');
  }
  if (remoto) mesclar(remoto);
  migrarErros();
  salvar();
}

// Merge vindo do evento de storage de outra aba: só regrava (e ecoa) quando o
// merge realmente trouxe algo novo — senão duas abas com ordens de chave
// diferentes ficam reescrevendo a mesma informação em ping-pongue.
export function mesclarDeOutraAba(bruto) {
  let remoto;
  try {
    remoto = JSON.parse(bruto);
  } catch {
    return false;
  }
  if (!remoto || typeof remoto !== 'object' || Array.isArray(remoto)) return false;
  if (num(remoto.versaoDados) > VERSAO_DADOS) return false;
  const antes = JSON.stringify(estado);
  mesclar(remoto);
  migrarErros();
  if (JSON.stringify(estado) === antes) return false;
  salvar();
  return true;
}

export function streakAtual() {
  return estado.ultimoDia === hoje() || estado.ultimoDia === diaAnterior(hoje()) ? estado.streak : 0;
}

export function streakEmRisco() {
  return estado.ultimoDia === diaAnterior(hoje()) && estado.streak > 0;
}

function atualizarStreak(d = hoje()) {
  if (estado.ultimoDia === d) return { usouProtetor: false };
  // Relógio do aparelho atrasou (ou o dia veio de outro fuso): não zera nada.
  if (estado.ultimoDia && estado.ultimoDia > d) return { usouProtetor: false };
  const ontem = diaAnterior(d);
  const anteontem = diaAnterior(ontem);
  let usouProtetor = false;
  if (estado.ultimoDia === ontem) {
    estado.streak += 1;
  } else if (estado.ultimoDia === anteontem && estado.protetores > 0 && estado.streak > 0) {
    estado.protetores -= 1;
    estado.protetoresGastos += 1;
    estado.streak += 1;
    usouProtetor = true;
  } else {
    estado.streak = 1;
  }
  estado.ultimoDia = d;
  return { usouProtetor };
}

export function xpDoDia(d = hoje()) {
  return estado.historico[d] ?? 0;
}

export function metaBatida(d = hoje()) {
  return xpDoDia(d) >= estado.meta;
}

export function definirMeta(valor) {
  estado.meta = valor;
  salvar();
}

export function semanaAtual() {
  const diaSemana = (agoraFn().getDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => {
    const d = diasDeDistancia(i - diaSemana);
    return { data: d, xp: estado.historico[d] ?? 0, hoje: d === hoje(), futuro: d > hoje() };
  });
}

function registrarDia(xp, d = hoje()) {
  estado.historico[d] = (estado.historico[d] ?? 0) + xp;
  const limite = diasDeDistancia(-400);
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
    progresso: prox && prox.xp > atual.xp ? (estado.xp - atual.xp) / (prox.xp - atual.xp) : 1
  };
}

function agendar(en, acertou) {
  const atual = estado.itens[en];
  if (acertou) {
    // O clamp inferior segura agendas corrompidas que cheguem pelo merge.
    const caixa = Math.max(0, Math.min((atual?.caixa ?? -1) + 1, INTERVALOS.length - 1));
    estado.itens[en] = { caixa, proxima: diasDeDistancia(INTERVALOS[caixa]), lapsos: 0 };
    return;
  }
  // Errar rebaixa uma caixa (piso 1) e traz o item para amanhã; só dois erros
  // seguidos zeram — um tropeço não apaga 35 dias de espaçamento conquistado.
  const lapsos = num(atual?.lapsos) + 1;
  const caixa = !atual || lapsos >= 2 ? 0 : Math.max(1, Math.min(num(atual.caixa), INTERVALOS.length - 1) - 1);
  estado.itens[en] = { caixa, proxima: diasDeDistancia(1), lapsos };
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

export function missoesDeHoje(d = hoje()) {
  if (estado.missoes?.dia !== d) {
    const escolhidas = MISSOES
      .map(m => ({ id: m.id, chave: semente(d + m.id) }))
      .sort((a, b) => a.chave - b.chave)
      .slice(0, 3);
    estado.missoes = { dia: d, progresso: escolhidas.map(m => ({ id: m.id, valor: 0, pago: false })) };
  }
  return estado.missoes.progresso
    .map(p => {
      const def = MISSOES.find(m => m.id === p.id);
      if (!def) return null;
      return { ...def, valor: Math.min(p.valor, def.alvo), concluida: p.valor >= def.alvo };
    })
    .filter(Boolean);
}

function avancarMissoes(sessao, d = hoje()) {
  missoesDeHoje(d);
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

// Chefões e diálogos entram em estado.licoes com chave 'chefao:'/'historia:';
// o contador de lições e o badge de 25 contam só as lições de verdade.
export function licoesConcluidas() {
  return Object.keys(estado.licoes).filter(k => !k.includes(':')).length;
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
    licoes25: licoesConcluidas() >= 25,
    perfeitas10: estado.stats.perfeitas >= 10,
    memoria50: memorizadas() >= 50,
    metas7: estado.stats.metasBatidas >= 7,
    tudo: UNIDADES.every(unidadeCompleta)
  };
  const novas = BADGES.filter(b => cond[b.id] && !estado.badges.includes(b.id));
  novas.forEach(b => estado.badges.push(b.id));
  return novas;
}

function ganharProtetor() {
  if (estado.protetores >= 2) return;
  estado.protetores += 1;
  estado.protetoresGanhos += 1;
}

function contarMetaBatida(metaAntes, diaSessao) {
  if (!metaAntes && metaBatida(diaSessao)) estado.stats.metasBatidas++;
}

export function registrarLicao(licaoId, d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'licao' }, diaSessao);
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus, diaSessao);
  const antes = estado.licoes[licaoId];
  estado.licoes[licaoId] = { estrelas: Math.max(antes?.estrelas ?? 0, d.estrelas) };
  estado.stats.licoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  if (d.perfeita) {
    estado.stats.perfeitas++;
    if (estado.stats.perfeitas % 5 === 0) ganharProtetor();
  }
  aplicarAgendamentos(d.agendamentos);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

export function registrarRelampago(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  // Abrir o Relâmpago e deixar o tempo correr não conta como dia de estudo.
  const { usouProtetor } = d.acertos >= 3 ? atualizarStreak(diaSessao) : { usouProtetor: false };
  const missao = avancarMissoes({ ...d, tipo: 'relampago', perfeita: false }, diaSessao);
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus, diaSessao);
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  estado.stats.recordeRelampago = Math.max(estado.stats.recordeRelampago ?? 0, d.acertos);
  aplicarAgendamentos(d.agendamentos);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

export function registrarRevisao(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'revisao' }, diaSessao);
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus, diaSessao);
  estado.stats.revisoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  const acertadas = new Set(d.acertadosEn);
  estado.erros = estado.erros.filter(e => !acertadas.has(e.en));
  aplicarAgendamentos(d.agendamentos);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

try {
  if (migrarErros()) salvar();
} catch {}
