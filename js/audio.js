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

export const sons = {
  clique() {
    tom(880, 0.05, 0, 'sine', 0.04);
  },
  acerto() {
    tom(523.25, 0.12);
    tom(783.99, 0.2, 0.09);
  },
  erro() {
    tom(196, 0.25, 0, 'sawtooth', 0.06);
    tom(146.83, 0.3, 0.12, 'sawtooth', 0.06);
  },
  combo(n) {
    [523.25, 659.25, 783.99, 1046.5].slice(0, Math.min(4, n)).forEach((f, i) => tom(f, 0.1, i * 0.07, 'sine', 0.1));
  },
  fanfarra() {
    [523.25, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tom(f, 0.16, i * 0.12, 'triangle', 0.1));
  }
};

export const temTts = 'speechSynthesis' in window;

let vozEn = null;

function carregarVoz() {
  const vozes = speechSynthesis.getVoices();
  vozEn = vozes.find(v => v.lang.startsWith('en') && v.localService) || vozes.find(v => v.lang.startsWith('en')) || null;
}

if (temTts) {
  carregarVoz();
  speechSynthesis.onvoiceschanged = carregarVoz;
}

export function falar(texto) {
  if (!temTts) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'en-US';
    u.rate = 0.92;
    if (vozEn) u.voice = vozEn;
    speechSynthesis.speak(u);
  } catch {}
}
