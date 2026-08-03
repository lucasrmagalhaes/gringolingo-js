import { POOL_TILES } from './data.js';
import { temTts, falar, sons } from './audio.js';
import { h, embaralhar, amostra } from './util.js';

function normalizar(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s']/g, '').replace(/\s+/g, ' ').trim();
}

function levenshtein(a, b) {
  const m = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return m[a.length][b.length];
}

function ehFrase(item) {
  return item.en.includes(' ');
}

function distratores(item, pool, n, campo) {
  const outros = pool.filter(o => o.en !== item.en && o[campo] !== item[campo]);
  return [...new Set(amostra(outros, n).map(o => o[campo]))];
}

function montarDados(tipo, item, pool) {
  if (tipo === 'escolhaEnPt') return { tipo, item, opcoes: embaralhar([item.pt, ...distratores(item, pool, 3, 'pt')]) };
  if (tipo === 'escolhaPtEn') return { tipo, item, opcoes: embaralhar([item.en, ...distratores(item, pool, 3, 'en')]) };
  if (tipo === 'ouvir') return { tipo, item, opcoes: embaralhar([item.en, ...distratores(item, pool, 3, 'en')]) };
  if (tipo === 'digitar') return { tipo, item };
  const palavras = item.en.replace(/[.,!?]/g, '').split(' ');
  const baixas = palavras.map(p => p.toLowerCase());
  const extras = amostra(POOL_TILES.filter(t => !baixas.includes(t.toLowerCase())), 3);
  return { tipo: 'montar', item, tiles: embaralhar([...palavras, ...extras]) };
}

function criar(item, pool) {
  const tipos = [];
  if (ehFrase(item)) tipos.push('montar', 'montar', 'escolhaEnPt', 'escolhaPtEn', 'digitar');
  else {
    tipos.push('escolhaEnPt', 'escolhaPtEn', 'digitar');
    if (temTts) tipos.push('ouvir');
  }
  return montarDados(tipos[Math.floor(Math.random() * tipos.length)], item, pool);
}

export function exercicioFacil(item, pool) {
  return montarDados(Math.random() < 0.5 ? 'escolhaEnPt' : 'escolhaPtEn', item, pool);
}

export function gerarExercicios(itens, pool, qtd = 8) {
  const fila = embaralhar(itens);
  const exs = [];
  for (let i = 0; exs.length < qtd; i++) {
    exs.push(criar(fila[i % fila.length], pool));
  }
  if (itens.length >= 4 && qtd >= 4) {
    exs[Math.min(3, exs.length - 1)] = { tipo: 'pares', pares: amostra(itens, 4) };
  }
  return exs;
}

function botaoSom(texto, extra = '') {
  return h('button', {
    class: 'btn-som' + (extra ? ' ' + extra : ''),
    'aria-label': 'Ouvir',
    onclick(e) {
      e.stopPropagation();
      falar(texto);
    }
  }, '🔊');
}

function montarEscolha(ex, cb) {
  let sel = null;
  let trancado = false;
  const botoes = ex.opcoes.map(op => {
    const b = h('button', { class: 'opcao' }, op);
    b.addEventListener('click', () => {
      if (trancado) return;
      sel = op;
      botoes.forEach(x => x.classList.remove('sel'));
      b.classList.add('sel');
      sons.clique();
      cb.aoMudar(true);
    });
    return b;
  });
  const enunciados = {
    escolhaEnPt: 'Como se diz em português? 🇧🇷',
    escolhaPtEn: 'Como se diz em inglês? 🇺🇸',
    ouvir: 'O que você ouviu? 👂'
  };
  const filhos = [h('div', { class: 'enunciado' }, enunciados[ex.tipo])];
  if (ex.tipo === 'escolhaEnPt') filhos.push(h('div', { class: 'prompt-card' }, botaoSom(ex.item.en), h('span', {}, ex.item.en)));
  if (ex.tipo === 'escolhaPtEn') filhos.push(h('div', { class: 'prompt-card' }, h('span', {}, ex.item.pt)));
  if (ex.tipo === 'ouvir') {
    filhos.push(botaoSom(ex.item.en, 'grande'));
    setTimeout(() => falar(ex.item.en), 350);
  }
  filhos.push(h('div', { class: 'opcoes' }, botoes));
  const alvo = ex.tipo === 'escolhaEnPt' ? ex.item.pt : ex.item.en;
  return {
    el: h('div', {}, filhos),
    temVerificar: true,
    corrigir() {
      trancado = true;
      const ok = sel === alvo;
      botoes.forEach(b => {
        if (b.textContent === alvo) b.classList.add('certa');
        else if (b.textContent === sel && !ok) b.classList.add('errada');
      });
      return { correto: ok, certa: alvo };
    }
  };
}

function montarDigitar(ex, cb) {
  const input = h('input', {
    class: 'entrada',
    type: 'text',
    autocomplete: 'off',
    autocapitalize: 'off',
    spellcheck: 'false',
    placeholder: 'Digite em inglês...'
  });
  input.addEventListener('input', () => cb.aoMudar(input.value.trim().length > 0));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) cb.aoEnter();
  });
  const el = h('div', {},
    h('div', { class: 'enunciado' }, 'Escreva em inglês ✍️'),
    h('div', { class: 'prompt-card' }, h('span', {}, ex.item.pt)),
    input
  );
  setTimeout(() => input.focus(), 100);
  return {
    el,
    temVerificar: true,
    corrigir() {
      input.disabled = true;
      const dada = normalizar(input.value);
      const certa = normalizar(ex.item.en);
      const ok = dada === certa;
      const quase = !ok && certa.length > 3 && levenshtein(dada, certa) <= 1;
      input.classList.add(ok || quase ? 'entrada-certa' : 'entrada-errada');
      return { correto: ok || quase, quase, certa: ex.item.en };
    }
  };
}

function montarFrase(ex, cb) {
  let trancado = false;
  const area = h('div', { class: 'resposta-area' });
  const banco = h('div', { class: 'banco' });
  const atualiza = () => cb.aoMudar(area.children.length > 0);
  ex.tiles.forEach(t => {
    const b = h('button', { class: 'tile' }, t);
    b.addEventListener('click', () => {
      if (trancado || b.classList.contains('usada')) return;
      b.classList.add('usada');
      sons.clique();
      const a = h('button', { class: 'tile' }, t);
      a.addEventListener('click', () => {
        if (trancado) return;
        a.remove();
        b.classList.remove('usada');
        sons.clique();
        atualiza();
      });
      area.append(a);
      atualiza();
    });
    banco.append(b);
  });
  const el = h('div', {},
    h('div', { class: 'enunciado' }, 'Monte a frase em inglês 🧩'),
    h('div', { class: 'prompt-card' }, h('span', {}, ex.item.pt)),
    area,
    banco
  );
  return {
    el,
    temVerificar: true,
    corrigir() {
      trancado = true;
      const dada = [...area.children].map(c => c.textContent).join(' ');
      const ok = normalizar(dada) === normalizar(ex.item.en);
      area.classList.add(ok ? 'area-certa' : 'area-errada');
      return { correto: ok, certa: ex.item.en };
    }
  };
}

function montarPares(ex, cb) {
  let selE = null;
  let selD = null;
  let feitos = 0;
  let erros = 0;
  let trava = false;
  function clicar(b, lado) {
    if (trava || b.classList.contains('ok')) return;
    sons.clique();
    if (lado === 'e') {
      selE?.classList.remove('sel');
      selE = b;
    } else {
      selD?.classList.remove('sel');
      selD = b;
    }
    b.classList.add('sel');
    if (!selE || !selD) return;
    trava = true;
    if (selE.dataset.en === selD.dataset.en) {
      selE.classList.add('ok');
      selD.classList.add('ok');
      selE.classList.remove('sel');
      selD.classList.remove('sel');
      feitos++;
      sons.acerto();
      selE = selD = null;
      trava = false;
      if (feitos === ex.pares.length) cb.aoAuto({ correto: erros === 0, certa: null });
    } else {
      erros++;
      sons.erro();
      const e = selE;
      const d = selD;
      e.classList.add('tremendo');
      d.classList.add('tremendo');
      selE = selD = null;
      setTimeout(() => {
        e.classList.remove('tremendo', 'sel');
        d.classList.remove('tremendo', 'sel');
        trava = false;
      }, 400);
    }
  }
  const colE = h('div', { class: 'par-col' }, embaralhar(ex.pares).map(p => {
    const b = h('button', { class: 'opcao par-btn', 'data-en': p.en }, p.en);
    b.addEventListener('click', () => clicar(b, 'e'));
    return b;
  }));
  const colD = h('div', { class: 'par-col' }, embaralhar(ex.pares).map(p => {
    const b = h('button', { class: 'opcao par-btn', 'data-en': p.en }, p.pt);
    b.addEventListener('click', () => clicar(b, 'd'));
    return b;
  }));
  return {
    el: h('div', {},
      h('div', { class: 'enunciado' }, 'Ligue os pares 🔗'),
      h('div', { class: 'pares' }, colE, colD)
    ),
    temVerificar: false,
    corrigir() {
      return { correto: erros === 0, certa: null };
    }
  };
}

export function montarExercicio(ex, cb) {
  if (ex.tipo === 'pares') return montarPares(ex, cb);
  if (ex.tipo === 'digitar') return montarDigitar(ex, cb);
  if (ex.tipo === 'montar') return montarFrase(ex, cb);
  return montarEscolha(ex, cb);
}
