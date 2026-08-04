const CHAVE = 'gringolingo:log';
const LIMITE = 30;

let contexto = () => '';

export function contextoDoLog(fn) {
  contexto = fn;
}

function ler() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
  } catch {
    return [];
  }
}

export function registrar(erro, origem) {
  try {
    const lista = ler();
    lista.push({
      quando: new Date().toISOString(),
      origem,
      mensagem: String(erro?.message ?? erro).slice(0, 300),
      pilha: String(erro?.stack ?? '').split('\n').slice(0, 3).join(' | ').slice(0, 400),
      tela: contexto()
    });
    localStorage.setItem(CHAVE, JSON.stringify(lista.slice(-LIMITE)));
  } catch {}
}

export function logSalvo() {
  return ler();
}

export function limparLog() {
  localStorage.removeItem(CHAVE);
}

export function modoDebug() {
  return new URLSearchParams(location.search).has('debug');
}

window.addEventListener('error', e => registrar(e.error ?? e.message, 'error'));
window.addEventListener('unhandledrejection', e => registrar(e.reason, 'promise'));
