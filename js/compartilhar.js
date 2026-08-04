const LARGURA = 1080;
const ALTURA = 1080;

function arredondado(x, largura, altura, raio, y) {
  const c = document.createElement('canvas').getContext('2d');
  return { c, largura, altura, raio, x, y };
}

function caixa(ctx, x, y, largura, altura, raio) {
  ctx.beginPath();
  ctx.moveTo(x + raio, y);
  ctx.arcTo(x + largura, y, x + largura, y + altura, raio);
  ctx.arcTo(x + largura, y + altura, x, y + altura, raio);
  ctx.arcTo(x, y + altura, x, y, raio);
  ctx.arcTo(x, y, x + largura, y, raio);
  ctx.closePath();
}

export function desenharCard({ nivel, titulo, emoji, xp, streak, palavras, badge }) {
  const cv = document.createElement('canvas');
  cv.width = LARGURA;
  cv.height = ALTURA;
  const ctx = cv.getContext('2d');

  ctx.fillStyle = '#131F24';
  ctx.fillRect(0, 0, LARGURA, ALTURA);
  const brilho = ctx.createRadialGradient(LARGURA / 2, 300, 60, LARGURA / 2, 300, 700);
  brilho.addColorStop(0, 'rgba(88, 204, 2, 0.28)');
  brilho.addColorStop(1, 'rgba(88, 204, 2, 0)');
  ctx.fillStyle = brilho;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#F1F7FB';
  ctx.font = '900 44px Nunito, system-ui, sans-serif';
  ctx.fillText('GringoLingo 🦜', LARGURA / 2, 110);

  ctx.font = '150px "Noto Color Emoji", "Segoe UI Emoji", sans-serif';
  ctx.fillText(emoji, LARGURA / 2, 330);

  ctx.fillStyle = '#58CC02';
  ctx.font = '900 38px Nunito, system-ui, sans-serif';
  ctx.fillText('NÍVEL ' + nivel, LARGURA / 2, 400);

  ctx.fillStyle = '#F1F7FB';
  ctx.font = '900 66px Nunito, system-ui, sans-serif';
  ctx.fillText(titulo, LARGURA / 2, 480);

  const cartoes = [
    { rotulo: 'XP TOTAL', valor: String(xp), cor: '#FFC800' },
    { rotulo: 'SEQUÊNCIA', valor: streak + (streak === 1 ? ' dia' : ' dias'), cor: '#FF9600' },
    { rotulo: 'PALAVRAS', valor: String(palavras), cor: '#1CB0F6' }
  ];
  const larguraCartao = 300;
  const espaco = 24;
  const totalLargura = cartoes.length * larguraCartao + (cartoes.length - 1) * espaco;
  let x = (LARGURA - totalLargura) / 2;
  cartoes.forEach(c => {
    ctx.fillStyle = '#202F36';
    caixa(ctx, x, 560, larguraCartao, 170, 26);
    ctx.fill();
    ctx.fillStyle = '#93a6b0';
    ctx.font = '900 24px Nunito, system-ui, sans-serif';
    ctx.fillText(c.rotulo, x + larguraCartao / 2, 612);
    ctx.fillStyle = c.cor;
    ctx.font = '900 58px Nunito, system-ui, sans-serif';
    ctx.fillText(c.valor, x + larguraCartao / 2, 686);
    x += larguraCartao + espaco;
  });

  if (badge) {
    ctx.fillStyle = '#202F36';
    caixa(ctx, 190, 780, 700, 120, 26);
    ctx.fill();
    ctx.textAlign = 'left';
    ctx.font = '64px "Noto Color Emoji", "Segoe UI Emoji", sans-serif';
    ctx.fillText(badge.emoji, 230, 862);
    ctx.fillStyle = '#F1F7FB';
    ctx.font = '900 36px Nunito, system-ui, sans-serif';
    ctx.fillText(badge.nome, 320, 838);
    ctx.fillStyle = '#93a6b0';
    ctx.font = '800 24px Nunito, system-ui, sans-serif';
    ctx.fillText(badge.desc, 320, 876);
    ctx.textAlign = 'center';
  }

  ctx.fillStyle = '#93a6b0';
  ctx.font = '800 30px Nunito, system-ui, sans-serif';
  ctx.fillText('lucasrmagalhaes.github.io/gringolingo-js', LARGURA / 2, 990);
  return cv;
}

export async function compartilharCard(dados) {
  const cv = desenharCard(dados);
  const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
  if (!blob) throw new Error('Não consegui gerar a imagem');
  const arquivo = new File([blob], 'gringolingo.png', { type: 'image/png' });
  const texto = `Já são ${dados.xp} XP e ${dados.streak} dia${dados.streak === 1 ? '' : 's'} de inglês no GringoLingo! 🦜`;
  if (navigator.canShare?.({ files: [arquivo] })) {
    await navigator.share({ files: [arquivo], text: texto });
    return 'compartilhado';
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gringolingo.png';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'baixado';
}
