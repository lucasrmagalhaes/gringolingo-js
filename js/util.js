export function h(tag, attrs = {}, ...filhos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'style') el.setAttribute('style', v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v);
  }
  filhos.flat(Infinity).forEach(f => {
    if (f !== '' && f != null) el.append(f);
  });
  return el;
}

export function embaralhar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function amostra(arr, n) {
  return embaralhar(arr).slice(0, n);
}

export function aleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
