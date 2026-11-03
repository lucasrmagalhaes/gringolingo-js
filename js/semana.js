// Minutos de fala e treinos por grupo, na semana corrente.
// A conta é determinística. Nada sai do aparelho.

import { TREINOS, CATEGORIAS } from './hub.js';
import { diasDaSemana } from './fluencia.js';

export const SEGUNDOS_POR_RESPOSTA = 12;
export const TETO_SESSAO = 1800;
export const METAS_MINUTOS = [10, 20, 30, 45];
export const GRUPOS = CATEGORIAS.map(c => c.id);

const ALIAS = { perguntaDia: 'dia', verbo: 'frasal' };
const POR_ID = new Map(TREINOS.map(t => [t.id, t.categoria]));

export function grupoDoTipo(tipo) {
  const id = ALIAS[tipo] || String(tipo || '');
  return POR_ID.get(id) || '';
}

export function segundosDaFala(respostas, segundos) {
  if (Number.isFinite(Number(segundos))) {
    return Math.max(0, Math.min(Math.round(Number(segundos)), TETO_SESSAO));
  }
  const n = Math.max(0, Number(respostas) || 0);
  return Math.min(TETO_SESSAO, n * SEGUNDOS_POR_RESPOSTA);
}

export function somarSemana(painel, diaIso) {
  const grupos = Object.fromEntries(GRUPOS.map(id => [id, 0]));
  let segundos = 0;
  let treinos = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const row = painel?.[data];
    if (!row) continue;
    segundos += Math.max(0, Number(row.segundos) || 0);
    treinos += Math.max(0, Number(row.n) || 0);
    for (const id of GRUPOS) grupos[id] += Math.max(0, Number(row.grupos?.[id]) || 0);
  }
  return {
    segundos,
    minutos: Math.floor(segundos / 60),
    treinos,
    grupos
  };
}

export function textoMinutos(segundos) {
  const min = Math.floor(Math.max(0, Number(segundos) || 0) / 60);
  if (min === 1) return '1 minuto de fala nesta semana.';
  return `${min} minutos de fala nesta semana.`;
}

export function textoGrupo(n, titulo) {
  const q = Math.max(0, Number(n) || 0);
  const nome = q === 1 ? '1 treino' : `${q} treinos`;
  return `${nome} em ${titulo}`;
}

function diaAnterior(iso) {
  const partes = String(iso || '').split('-').map(Number);
  if (partes.length !== 3 || partes.some(n => !Number.isFinite(n))) return '';
  const data = new Date(partes[0], partes[1] - 1, partes[2]);
  data.setDate(data.getDate() - 1);
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function teveFala(painel, iso) {
  return Math.floor(Number(painel?.[iso]?.n) || 0) > 0;
}

export function textoDaSequencia(painel, diaIso) {
  if (!teveFala(painel, diaIso)) {
    if (teveFala(painel, diaAnterior(diaIso))) {
      return { dias: 0, emRisco: true, texto: 'A sequência de ontem ainda vale. Fale hoje para continuar.' };
    }
    return { dias: 0, emRisco: false, texto: 'A sequência de fala ainda não começou.' };
  }
  let dias = 0;
  let cursor = diaIso;
  while (teveFala(painel, cursor) && dias < 400) {
    dias += 1;
    cursor = diaAnterior(cursor);
  }
  const texto = dias === 1 ? '1 dia seguido de fala.' : `${dias} dias seguidos de fala.`;
  return { dias, emRisco: false, texto };
}

export function textoDeHoje(painel, diaIso) {
  const linha = painel && typeof painel === 'object' ? painel[diaIso] : null;
  const segundos = Math.max(0, Number(linha?.segundos) || 0);
  const n = Math.max(0, Math.floor(Number(linha?.n) || 0));
  const min = Math.floor(segundos / 60);
  if (!n && segundos === 0) return { minutos: 0, treinos: 0, texto: 'Ainda não houve fala hoje.' };
  if (min === 0) {
    const feito = n === 1 ? '1 treino' : `${n} treinos`;
    return { minutos: 0, treinos: n, texto: `Menos de 1 minuto hoje. ${feito}.` };
  }
  const tempo = min === 1 ? '1 minuto' : `${min} minutos`;
  const feito = n === 1 ? '1 treino' : `${n} treinos`;
  return { minutos: min, treinos: n, texto: `${tempo} hoje. ${feito}.` };
}

export function textoDoBalanco({ minutos, meta, treinos, menorTitulo } = {}) {
  const min = Math.max(0, Math.floor(Number(minutos) || 0));
  const alvo = Math.max(0, Math.floor(Number(meta) || 0));
  const n = Math.max(0, Math.floor(Number(treinos) || 0));
  const tempo = alvo > 0
    ? `${min} de ${alvo} ${alvo === 1 ? 'minuto' : 'minutos'}`
    : `${min} ${min === 1 ? 'minuto' : 'minutos'}`;
  const feito = n === 1 ? '1 treino' : `${n} treinos`;
  const grupo = menorTitulo ? ` Menos prática em ${menorTitulo}.` : '';
  return `${tempo}. ${feito} nesta semana.${grupo}`;
}

export function balancoDaSemana(painel, diaIso, meta) {
  const soma = somarSemana(painel, diaIso);
  const alvo = Math.max(0, Math.floor(Number(meta) || 0));
  let menor = null;
  for (const id of GRUPOS) {
    const n = soma.grupos[id] || 0;
    const titulo = CATEGORIAS.find(c => c.id === id)?.titulo || id;
    if (!menor || n < menor.n) menor = { id, n, titulo };
  }
  const pct = alvo ? Math.min(100, Math.round((soma.minutos / alvo) * 100)) : 0;
  const texto = textoDoBalanco({
    minutos: soma.minutos,
    meta: alvo,
    treinos: soma.treinos,
    menorTitulo: menor?.titulo || ''
  });
  return { ...soma, meta: alvo, menor, pct, texto };
}

export function lembreteMinutos(minutos, meta, diaIso) {
  const feito = Math.max(0, Math.floor(Number(minutos) || 0));
  const alvo = Math.max(0, Number(meta) || 0);
  if (alvo > 0 && feito >= alvo) return `Meta de minutos batida: ${feito} de ${alvo}.`;
  const base = new Date(`${diaIso}T12:00:00`);
  const tarde = !Number.isNaN(base.getTime()) && ((base.getDay() + 6) % 7) >= 3;
  const falta = Math.max(0, alvo - feito);
  if (tarde) {
    if (falta === 1) return 'Ainda dá tempo. Falta 1 minuto.';
    return `Ainda dá tempo. Faltam ${falta} minutos.`;
  }
  return `${feito} de ${alvo} minutos nesta semana.`;
}
