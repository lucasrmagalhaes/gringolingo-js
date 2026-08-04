const NS = 'http://www.w3.org/2000/svg';

const POSES = {
  neutro: { asa: 'M62 62 q-16 12 -6 30 q12 10 22 -4 z', olho: 4.6, boca: 'M74 58 q6 5 12 0', topete: -8 },
  feliz: { asa: 'M62 58 q-22 -6 -18 16 q14 14 24 -6 z', olho: 5.2, boca: 'M72 56 q8 12 16 0', topete: -14 },
  pensando: { asa: 'M62 64 q-14 16 2 26 q12 4 18 -10 z', olho: 3.4, boca: 'M74 60 q6 -3 12 1', topete: 2 },
  dormindo: { asa: 'M60 66 q-12 14 4 24 q12 2 18 -10 z', olho: 0, boca: 'M74 60 q6 2 12 0', topete: 8 },
  coroa: { asa: 'M62 58 q-22 -6 -18 16 q14 14 24 -6 z', olho: 5.2, boca: 'M72 56 q8 12 16 0', topete: -14 }
};

function el(nome, atributos) {
  const n = document.createElementNS(NS, nome);
  for (const [k, v] of Object.entries(atributos)) n.setAttribute(k, v);
  return n;
}

export function mascote(pose = 'neutro', tamanho = 96) {
  const p = POSES[pose] ?? POSES.neutro;
  const svg = el('svg', {
    viewBox: '0 0 140 140',
    width: tamanho,
    height: tamanho,
    class: 'mascote mascote-' + pose,
    role: 'img',
    'aria-label': 'Louro, o papagaio do GringoLingo'
  });

  svg.append(el('ellipse', { cx: 70, cy: 122, rx: 34, ry: 6, class: 'm-sombra' }));
  svg.append(el('path', { d: 'M96 60 q26 10 18 40 q-8 22 -26 16 z', class: 'm-cauda' }));
  svg.append(el('ellipse', { cx: 70, cy: 78, rx: 34, ry: 40, class: 'm-corpo' }));
  svg.append(el('ellipse', { cx: 70, cy: 92, rx: 21, ry: 26, class: 'm-barriga' }));
  svg.append(el('path', { d: p.asa, class: 'm-asa' }));

  const topete = el('path', {
    d: `M62 30 q6 ${p.topete - 14} 16 -6 q2 12 -4 18 z`,
    class: 'm-topete'
  });
  svg.append(topete);

  svg.append(el('circle', { cx: 74, cy: 46, r: 26, class: 'm-cabeca' }));
  svg.append(el('circle', { cx: 84, cy: 44, r: 11, class: 'm-face' }));
  svg.append(el('path', { d: 'M92 40 q16 4 14 14 q-10 8 -18 -2 z', class: 'm-bico' }));
  svg.append(el('path', { d: 'M94 50 q10 4 8 10 q-8 3 -12 -4 z', class: 'm-bico-baixo' }));

  if (p.olho > 0) {
    svg.append(el('circle', { cx: 82, cy: 40, r: p.olho + 1.6, class: 'm-olho-fundo' }));
    svg.append(el('circle', { cx: 82, cy: 40, r: p.olho, class: 'm-olho' }));
    svg.append(el('circle', { cx: 83.6, cy: 38.4, r: p.olho * 0.36, class: 'm-brilho' }));
  } else {
    svg.append(el('path', { d: 'M76 40 q6 5 12 0', class: 'm-olho-fechado' }));
  }

  svg.append(el('path', { d: 'M60 108 q4 12 -4 14 M80 108 q-4 12 4 14', class: 'm-pes' }));

  if (pose === 'coroa') {
    svg.append(el('path', { d: 'M56 18 l6 12 l8 -14 l8 14 l6 -12 l2 18 h-32 z', class: 'm-coroa' }));
  }
  if (pose === 'dormindo') {
    const z = el('text', { x: 104, y: 30, class: 'm-z' });
    z.textContent = 'z';
    svg.append(z);
  }
  return svg;
}
