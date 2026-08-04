import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const CHAVE_OPTOUT = 'gringolingo:sem-metricas';
const CHAVE_DIA = 'gringolingo:metrica-dia';

export function metricasLigadas() {
  return localStorage.getItem(CHAVE_OPTOUT) !== '1';
}

export function definirMetricas(ligadas) {
  if (ligadas) localStorage.removeItem(CHAVE_OPTOUT);
  else localStorage.setItem(CHAVE_OPTOUT, '1');
}

export function registrarEvento(evento) {
  if (!metricasLigadas() || !SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  const dia = new Date().toISOString().slice(0, 10);
  const corpo = JSON.stringify({ evento, dia });
  try {
    fetch(SUPABASE_URL + '/rest/v1/eventos', {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: corpo,
      keepalive: true
    }).catch(() => {});
  } catch {}
}

export function registrarAberturaDoDia() {
  const dia = new Date().toISOString().slice(0, 10);
  if (localStorage.getItem(CHAVE_DIA) === dia) return;
  localStorage.setItem(CHAVE_DIA, dia);
  registrarEvento('abertura');
}
