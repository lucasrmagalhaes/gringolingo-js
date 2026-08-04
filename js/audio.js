let ctx = null;

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

export function destravarAudio() {
  try {
    ac().resume();
  } catch {}
}

function tom(freq, dur, atraso = 0, tipo = 'sine', vol = 0.12) {
  try {
    const c = ac();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = tipo;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, c.currentTime + atraso);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + atraso + dur);
    o.connect(g).connect(c.destination);
    o.start(c.currentTime + atraso);
    o.stop(c.currentTime + atraso + dur);
  } catch {}
}

function vibrar(padrao) {
  try {
    navigator.vibrate?.(padrao);
  } catch {}
}

export const sons = {
  clique() {
    tom(880, 0.05, 0, 'sine', 0.04);
  },
  acerto() {
    tom(523.25, 0.12);
    tom(783.99, 0.2, 0.09);
    vibrar(20);
  },
  erro() {
    tom(196, 0.25, 0, 'sawtooth', 0.06);
    tom(146.83, 0.3, 0.12, 'sawtooth', 0.06);
    vibrar([40, 60, 40]);
  },
  combo(n) {
    [523.25, 659.25, 783.99, 1046.5].slice(0, Math.min(4, n)).forEach((f, i) => tom(f, 0.1, i * 0.07, 'sine', 0.1));
  },
  fanfarra() {
    [523.25, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tom(f, 0.16, i * 0.12, 'triangle', 0.1));
  }
};

export const temTts = 'speechSynthesis' in window;

const CHAVE_VOZ = 'gringolingo:voz';
const CHAVE_VELOCIDADE = 'gringolingo:velocidade';

export const VELOCIDADES = [
  { id: 'lenta', rotulo: 'Devagar', valor: 0.75 },
  { id: 'normal', rotulo: 'Normal', valor: 0.92 },
  { id: 'rapida', rotulo: 'Rápida', valor: 1.1 }
];

let vozes = [];
let vozEn = null;
const ouvintes = [];

function normalizarLang(v) {
  return (v.lang || '').replace('_', '-');
}

function escolherPadrao() {
  const salva = localStorage.getItem(CHAVE_VOZ);
  return vozes.find(v => v.voiceURI === salva)
    || vozes.find(v => normalizarLang(v).startsWith('en-US') && v.localService)
    || vozes.find(v => normalizarLang(v).startsWith('en-US'))
    || vozes[0]
    || null;
}

function carregarVoz() {
  vozes = speechSynthesis.getVoices().filter(v => normalizarLang(v).toLowerCase().startsWith('en'));
  vozEn = escolherPadrao();
  ouvintes.forEach(cb => cb(vozes));
}

if (temTts) {
  carregarVoz();
  if (typeof speechSynthesis.addEventListener === 'function') speechSynthesis.addEventListener('voiceschanged', carregarVoz);
  else speechSynthesis.onvoiceschanged = carregarVoz;
}

export function vozesDisponiveis() {
  return vozes.map(v => ({ uri: v.voiceURI, nome: v.name, lang: normalizarLang(v), local: v.localService }));
}

export function vozAtual() {
  return vozEn?.voiceURI ?? null;
}

export function definirVoz(uri) {
  const achada = vozes.find(v => v.voiceURI === uri);
  if (!achada) return;
  vozEn = achada;
  localStorage.setItem(CHAVE_VOZ, uri);
}

export function aoCarregarVozes(cb) {
  ouvintes.push(cb);
}

export function velocidadeAtual() {
  const salva = localStorage.getItem(CHAVE_VELOCIDADE);
  return VELOCIDADES.find(v => v.id === salva) ?? VELOCIDADES[1];
}

export function definirVelocidade(id) {
  if (VELOCIDADES.some(v => v.id === id)) localStorage.setItem(CHAVE_VELOCIDADE, id);
}

export function falar(texto, velocidade) {
  if (!temTts) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = vozEn ? normalizarLang(vozEn) : 'en-US';
    u.rate = velocidade ?? velocidadeAtual().valor;
    if (vozEn) u.voice = vozEn;
    speechSynthesis.speak(u);
  } catch {}
}
