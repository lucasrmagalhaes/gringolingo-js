const CHAVE = 'gringolingo:log';
const LIMITE = 30;
const RETENCAO_MS = 7 * 24 * 60 * 60 * 1000;

let contexto = () => '';

export function contextoDoLog(fn) {
  contexto = fn;
}

function ler() {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE)) ?? [];
    const limiar = new Date(Date.now() - RETENCAO_MS).toISOString();
    const recentes = lista.filter(item => item.quando >= limiar);
    if (recentes.length < lista.length) localStorage.setItem(CHAVE, JSON.stringify(recentes));
    return recentes;
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
