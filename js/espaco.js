// Revisão espaçada das frases mais erradas nas falas.
// A fila é determinística. Nada sai do aparelho.

const CAIXAS = [1, 3, 7, 16, 35];

export const MINIMO_ERROS = 2;
export const LIMITE_FILA = 6;

function caixasDe(intervalos) {
  return Array.isArray(intervalos) && intervalos.length ? intervalos.map(n => Number(n) || 1) : CAIXAS;
}

function diaValido(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

export function filaEspacada({ erros, agenda, hoje, limite, minimo } = {}) {
  const dia = diaValido(hoje) ? hoje : '';
  const min = Number.isFinite(Number(minimo)) ? Number(minimo) : MINIMO_ERROS;
  const cap = Number.isFinite(Number(limite)) ? Math.max(0, Number(limite)) : LIMITE_FILA;
  const cal = agenda && typeof agenda === 'object' && !Array.isArray(agenda) ? agenda : {};
  const vistos = new Set();
  const rank = [];
  for (const item of Array.isArray(erros) ? erros : []) {
    if (!item || typeof item.en !== 'string' || !item.en || vistos.has(item.en)) continue;
    const n = Number(item.n) || 0;
    if (n < min) continue;
    vistos.add(item.en);
    rank.push({ en: item.en, pt: typeof item.pt === 'string' ? item.pt : '', n });
  }
  rank.sort((a, b) => b.n - a.n || a.en.localeCompare(b.en));
  const fila = [];
  let esperando = 0;
  for (const item of rank) {
    const slot = cal[item.en];
    const proxima = slot && diaValido(slot.proxima) ? slot.proxima : '';
    const due = !proxima || (dia && proxima <= dia);
    if (!due) {
      esperando += 1;
      continue;
    }
    fila.push({
      en: item.en,
      pt: (slot && typeof slot.pt === 'string' && slot.pt) || item.pt,
      n: item.n,
      caixa: slot ? Math.max(0, Number(slot.caixa) || 0) : 0,
      proxima: proxima || dia
    });
  }
  return { fila: fila.slice(0, cap), esperando, total: rank.length };
}

export function diasAoAcertar(caixa, intervalos) {
  const boxes = caixasDe(intervalos);
  const atual = Math.max(0, Number(caixa) || 0);
  const noTopo = atual >= boxes.length - 1;
  return boxes[noTopo ? boxes.length - 1 : Math.min(atual, boxes.length - 1)];
}

export function textoVolta(dias) {
  const n = Math.max(1, Number(dias) || 1);
  return n === 1 ? 'Volta amanhã.' : `Volta em ${n} dias.`;
}
