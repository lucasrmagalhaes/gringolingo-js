// Gravação local para comparar com a voz do aparelho.
// O áudio não entra no progresso, no backup nem na nuvem.

export const LIMITE_GRAVACAO_MS = 8000;

export function podeGravar(escopo = globalThis) {
  const media = escopo.navigator?.mediaDevices;
  return typeof escopo.MediaRecorder === 'function' && typeof media?.getUserMedia === 'function';
}

export function urlDaGravacao(blob, escopo = globalThis) {
  if (!blob || typeof escopo.URL?.createObjectURL !== 'function') return null;
  return escopo.URL.createObjectURL(blob);
}

export function soltarUrl(url, escopo = globalThis) {
  if (url && typeof escopo.URL?.revokeObjectURL === 'function') escopo.URL.revokeObjectURL(url);
  return null;
}
