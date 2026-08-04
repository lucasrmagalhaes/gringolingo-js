import { POOL_TILES } from './data.js';
import { temTts, falar, sons } from './audio.js';
import { h, embaralhar, amostra, aleatorio } from './util.js';

const CONTRACOES = [
  ["i'm", 'i am'],
  ["it's", 'it is'],
  ["what's", 'what is'],
  ["let's", 'let us'],
  ["don't", 'do not'],
  ["can't", 'cannot'],
  ["i'll", 'i will'],
  ["you're", 'you are'],
  ["she's", 'she is'],
  ["he's", 'he is'],
  ["we're", 'we are']
];

function normalizarBase(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s']/g, '').replace(/\s+/g, ' ').trim();
}

function normalizar(s) {
  let t = normalizarBase(s);
  CONTRACOES.forEach(([contraida, expandida]) => {
    t = t.replaceAll(contraida, expandida);
  });
  return t;
}

export function diffPalavras(dadaTexto, certaTexto) {
  const dada = dadaTexto.trim().split(/\s+/).filter(Boolean);
  const certa = certaTexto.trim().split(/\s+/).filter(Boolean);
  const dn = dada.map(normalizarBase);
  const cn = certa.map(normalizarBase);
  const m = Array.from({ length: dn.length + 1 }, () => new Array(cn.length + 1).fill(0));
  for (let i = dn.length - 1; i >= 0; i--) {
    for (let j = cn.length - 1; j >= 0; j--) {
      m[i][j] = dn[i] === cn[j] ? m[i + 1][j + 1] + 1 : Math.max(m[i + 1][j], m[i][j + 1]);
    }
  }
  const casadasDada = new Set();
  const casadasCerta = new Set();
  let i = 0;
  let j = 0;
  while (i < dn.length && j < cn.length) {
    if (dn[i] === cn[j]) {
      casadasDada.add(i);
      casadasCerta.add(j);
      i++;
      j++;
    } else if (m[i + 1][j] >= m[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return {
    certa: certa.map((palavra, idx) => ({ palavra, falta: !casadasCerta.has(idx) })),
    dada: dada.map((palavra, idx) => ({ palavra, sobra: !casadasDada.has(idx) }))
  };
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
  const alvoEn = normalizar(item.en);
  const alvoCampo = normalizar(String(item[campo]));
  const outros = pool.filter(o => {
    if (o.en === item.en || o[campo] === item[campo]) return false;
    const outroEn = normalizar(o.en);
    if (outroEn.includes(alvoEn) || alvoEn.includes(outroEn)) return false;
    const outroCampo = normalizar(String(o[campo]));
    if (outroCampo.includes(alvoCampo) || alvoCampo.includes(outroCampo)) return false;
    return true;
  });
  return [...new Set(amostra(outros, n).map(o => o[campo]))];
}

function montarDados(tipo, item, pool) {
  if (tipo === 'escolhaEnPt') return { tipo, item, opcoes: embaralhar([item.pt, ...distratores(item, pool, 3, 'pt')]) };
  if (tipo === 'escolhaPtEn') return { tipo, item, opcoes: embaralhar([item.en, ...distratores(item, pool, 3, 'en')]) };
  if (tipo === 'ouvir') return { tipo, item, opcoes: embaralhar([item.en, ...distratores(item, pool, 3, 'en')]) };
  if (tipo === 'ouvirPt') return { tipo, item, opcoes: embaralhar([item.pt, ...distratores(item, pool, 3, 'pt')]) };
  if (tipo === 'digitar' || tipo === 'falar') return { tipo, item };
  if (tipo === 'lacuna') {
    const palavras = item.en.replace(/[.,!?]/g, '').split(' ');
    const candidatas = palavras.filter(p => !POOL_TILES.includes(p.toLowerCase()) && p.length > 2);
    const alvo = aleatorio(candidatas.length ? candidatas : palavras);
    const outras = [...new Set(pool.flatMap(o => o.en.replace(/[.,!?]/g, '').split(' '))
      .filter(p => p.toLowerCase() !== alvo.toLowerCase() && p.length > 2 && !POOL_TILES.includes(p.toLowerCase())))];
    return { tipo, item, alvo, palavras, opcoes: embaralhar([alvo, ...amostra(outras, 3)]) };
  }
  const palavras = item.en.replace(/[.,!?]/g, '').split(' ');
  const baixas = palavras.map(p => p.toLowerCase());
  const extras = amostra(POOL_TILES.filter(t => !baixas.includes(t.toLowerCase())), 3);
  return { tipo: tipo === 'ditado' ? 'ditado' : 'montar', item, tiles: embaralhar([...palavras, ...extras]) };
}

export const temFala = typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

function criar(item, pool) {
  const tipos = [];
  if (ehFrase(item)) {
    tipos.push('montar', 'montar', 'escolhaEnPt', 'escolhaPtEn', 'digitar', 'lacuna');
    if (temTts) tipos.push('ditado');
  } else {
    tipos.push('escolhaEnPt', 'escolhaPtEn', 'digitar');
    if (temTts) tipos.push('ouvir', 'ouvirPt');
  }
  if (temFala) tipos.push('falar');
  return montarDados(tipos[Math.floor(Math.random() * tipos.length)], item, pool);
}

export function gerarVerbos(verbos, sujeitos, qtd = 10) {
  const itens = [];
  const usados = new Set();
  let tentativas = 0;
  while (itens.length < qtd && tentativas < qtd * 20) {
    tentativas++;
    const v = aleatorio(verbos);
    const s = aleatorio(sujeitos);
    const chave = v.en + '|' + s.en;
    if (usados.has(chave)) continue;
    usados.add(chave);
    const forma = s.terceira ? v.en3 : v.en;
    const ptForma = s.terceira ? v.pt3 : conjugarPt(v, s);
    itens.push({
      en: `${s.en} ${forma}`,
      pt: `${s.pt} ${ptForma}`,
      base: v.en,
      terceira: s.terceira
    });
  }
  return itens.map(item => ({
    tipo: 'verbo',
    item,
    opcoes: embaralhar([...new Set([item.en.split(' ').slice(1).join(' '), verbos.find(v => v.en === item.base).en, verbos.find(v => v.en === item.base).en3])]).slice(0, 2)
  }));
}

function conjugarPt(v, s) {
  const irregulares = {
    ir: { eu: 'vou', você: 'vai', nós: 'vamos', eles: 'vão' },
    ter: { eu: 'tenho', você: 'tem', nós: 'temos', eles: 'têm' },
    fazer: { eu: 'faço', você: 'faz', nós: 'fazemos', eles: 'fazem' },
    ler: { eu: 'leio', você: 'lê', nós: 'lemos', eles: 'leem' },
    querer: { eu: 'quero', você: 'quer', nós: 'queremos', eles: 'querem' },
    saber: { eu: 'sei', você: 'sabe', nós: 'sabemos', eles: 'sabem' },
    dormir: { eu: 'durmo', você: 'dorme', nós: 'dormimos', eles: 'dormem' },
    ouvir: { eu: 'ouço', você: 'ouve', nós: 'ouvimos', eles: 'ouvem' },
    dirigir: { eu: 'dirijo', você: 'dirige', nós: 'dirigimos', eles: 'dirigem' }
  };
  const especial = irregulares[v.pt]?.[s.pt];
  if (especial) return especial;
  const raiz = v.pt.slice(0, -2);
  const term = v.pt.slice(-2);
  if (s.pt === 'eu') return raiz + (term === 'ar' ? 'o' : 'o');
  if (s.pt === 'nós') return raiz + (term === 'ar' ? 'amos' : term === 'er' ? 'emos' : 'imos');
  if (s.pt === 'eles') return raiz + (term === 'ar' ? 'am' : 'em');
  return v.pt3;
}

export function gerarDificeis(itens, pool, qtd = 12) {
  if (!itens?.length) return [];
  const fila = embaralhar(itens);
  const exs = [];
  for (let i = 0; exs.length < qtd; i++) {
    const item = fila[i % fila.length];
    const tipos = ehFrase(item) ? ['montar', 'digitar'] : ['digitar'];
    if (temTts) tipos.push(ehFrase(item) ? 'ditado' : 'ouvirDigitar');
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    exs.push(tipo === 'ouvirDigitar' ? { tipo: 'digitar', item, soAudio: true } : montarDados(tipo, item, pool));
  }
  return exs;
}

export function exercicioFacil(item, pool) {
  return montarDados(Math.random() < 0.5 ? 'escolhaEnPt' : 'escolhaPtEn', item, pool);
}

export function gerarExercicios(itens, pool, qtd = 8) {
  if (!itens?.length) return [];
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
    'aria-label': 'Ouvir em inglês',
    onclick(e) {
      e.stopPropagation();
      falar(texto);
    }
  }, '🔊');
}

function botaoLento(texto) {
  return h('button', {
    class: 'btn-som btn-lento',
    'aria-label': 'Ouvir devagar',
    onclick(e) {
      e.stopPropagation();
      falar(texto, 0.6);
    }
  }, '🐢');
}

function montarEscolha(ex, cb) {
  let sel = null;
  let trancado = false;
  const botoes = ex.opcoes.map(op => {
    const b = h('button', { class: 'opcao', 'aria-pressed': 'false' }, op);
    b.addEventListener('click', () => {
      if (trancado) return;
      sel = op;
      botoes.forEach(x => {
        x.classList.remove('sel');
        x.setAttribute('aria-pressed', 'false');
      });
      b.classList.add('sel');
      b.setAttribute('aria-pressed', 'true');
      sons.toque();
      cb.aoMudar(true);
    });
    return b;
  });
  const enunciados = {
    escolhaEnPt: 'Como se diz em português? 🇧🇷',
    escolhaPtEn: 'Como se diz em inglês? 🇺🇸',
    ouvir: 'O que você ouviu? 👂',
    ouvirPt: 'O que isso significa? 👂',
    lacuna: 'Complete a frase 🧩'
  };
  const filhos = [h('div', { class: 'enunciado' }, enunciados[ex.tipo])];
  if (ex.tipo === 'escolhaEnPt') filhos.push(h('div', { class: 'prompt-card' }, botaoSom(ex.item.en), h('span', {}, ex.item.en)));
  if (ex.tipo === 'escolhaPtEn') filhos.push(h('div', { class: 'prompt-card' }, h('span', {}, ex.item.pt)));
  if (ex.tipo === 'ouvir' || ex.tipo === 'ouvirPt') {
    filhos.push(h('div', { class: 'sons-linha' }, botaoSom(ex.item.en, 'grande'), botaoLento(ex.item.en)));
    setTimeout(() => falar(ex.item.en), 350);
  }
  if (ex.tipo === 'lacuna') {
    const frase = ex.palavras.map(p => (p === ex.alvo ? '____' : p)).join(' ');
    filhos.push(h('div', { class: 'prompt-card' }, botaoSom(ex.item.en), h('span', {}, frase)));
    filhos.push(h('div', { class: 'prompt-apoio' }, ex.item.pt));
  }
  filhos.push(h('div', { class: 'opcoes' }, botoes));
  const alvo = ex.tipo === 'escolhaEnPt' || ex.tipo === 'ouvirPt' ? ex.item.pt : ex.tipo === 'lacuna' ? ex.alvo : ex.item.en;
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
  if (ex.soAudio) setTimeout(() => falar(ex.item.en), 350);
  const el = h('div', {},
    h('div', { class: 'enunciado' }, ex.soAudio ? 'Escreva o que você ouvir 👂' : 'Escreva em inglês ✍️'),
    ex.soAudio
      ? h('div', { class: 'sons-linha' }, botaoSom(ex.item.en, 'grande'), botaoLento(ex.item.en))
      : h('div', { class: 'prompt-card' }, h('span', {}, ex.item.pt)),
    input
  );
  setTimeout(() => input.focus(), 100);
  return {
    el,
    temVerificar: true,
    corrigir() {
      input.disabled = true;
      const dada = normalizar(input.value);
      const aceitas = [ex.item.en, ...(ex.item.alt ?? [])].map(normalizar);
      const certa = normalizar(ex.item.en);
      const ok = aceitas.includes(dada);
      const quase = !ok && certa.length >= 5 && levenshtein(dada, certa) <= 1;
      input.classList.add(ok || quase ? 'entrada-certa' : 'entrada-errada');
      return { correto: ok || quase, quase, certa: ex.item.en, diff: ok || quase ? null : diffPalavras(input.value, ex.item.en) };
    }
  };
}

function montarFalar(ex, cb) {
  let ouvido = '';
  let trancado = false;
  const status = h('div', { class: 'fala-status' }, 'Toque no microfone e fale a frase');
  const eco = h('div', { class: 'fala-eco' });
  const botao = h('button', { class: 'btn-mic', 'aria-label': 'Falar' }, '🎤');
  const pular = h('button', { class: 'btn btn-branco', onclick: () => cb.aoPular() }, 'PULAR');
  botao.addEventListener('click', () => {
    if (trancado) return;
    const Reconhecedor = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Reconhecedor();
    rec.lang = 'en-US';
    rec.maxAlternatives = 3;
    rec.interimResults = false;
    botao.classList.add('gravando');
    status.textContent = 'Ouvindo… fale agora 🎙️';
    rec.onresult = evento => {
      const alternativas = [...evento.results[0]].map(r => r.transcript);
      ouvido = alternativas.find(t => normalizar(t) === normalizar(ex.item.en)) ?? alternativas[0];
      eco.textContent = '“' + ouvido + '”';
      status.textContent = 'Peguei! Confira abaixo 👇';
      cb.aoMudar(true);
    };
    rec.onerror = () => {
      status.textContent = 'Não consegui ouvir — tenta de novo ou pula 🙈';
    };
    rec.onend = () => botao.classList.remove('gravando');
    try {
      rec.start();
    } catch {
      botao.classList.remove('gravando');
    }
  });
  return {
    el: h('div', {},
      h('div', { class: 'enunciado' }, 'Fale em inglês 🗣️'),
      h('div', { class: 'prompt-card' }, botaoSom(ex.item.en), h('span', {}, ex.item.en)),
      h('div', { class: 'prompt-apoio' }, ex.item.pt),
      botao, status, eco,
      h('div', { class: 'fala-pular' }, pular)
    ),
    temVerificar: true,
    corrigir() {
      trancado = true;
      const dada = normalizar(ouvido);
      const aceitas = [ex.item.en, ...(ex.item.alt ?? [])].map(normalizar);
      const certa = normalizar(ex.item.en);
      const ok = aceitas.includes(dada) || (certa.length >= 5 && levenshtein(dada, certa) <= 1);
      eco.classList.add(ok ? 'fala-certa' : 'fala-errada');
      return { correto: ok, certa: ex.item.en, diff: ok ? null : diffPalavras(ouvido || '(nada)', ex.item.en) };
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
      sons.toque();
      const a = h('button', { class: 'tile' }, t);
      a.addEventListener('click', () => {
        if (trancado) return;
        a.remove();
        b.classList.remove('usada');
        sons.toque();
        atualiza();
      });
      area.append(a);
      atualiza();
    });
    banco.append(b);
  });
  const ditado = ex.tipo === 'ditado';
  if (ditado) setTimeout(() => falar(ex.item.en), 350);
  const el = h('div', {},
    h('div', { class: 'enunciado' }, ditado ? 'Escreva o que você ouvir 👂' : 'Monte a frase em inglês 🧩'),
    ditado
      ? h('div', { class: 'sons-linha' }, botaoSom(ex.item.en, 'grande'), botaoLento(ex.item.en))
      : h('div', { class: 'prompt-card' }, h('span', {}, ex.item.pt)),
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
      return { correto: ok, certa: ex.item.en, diff: ok ? null : diffPalavras(dada, ex.item.en) };
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

function montarVerbo(ex, cb) {
  let sel = null;
  let trancado = false;
  const alvo = ex.item.en.split(' ').slice(1).join(' ');
  const sujeito = ex.item.en.split(' ')[0];
  const botoes = ex.opcoes.map(op => {
    const b = h('button', { class: 'opcao', 'aria-pressed': 'false' }, op);
    b.addEventListener('click', () => {
      if (trancado) return;
      sel = op;
      botoes.forEach(x => {
        x.classList.remove('sel');
        x.setAttribute('aria-pressed', 'false');
      });
      b.classList.add('sel');
      b.setAttribute('aria-pressed', 'true');
      sons.toque();
      cb.aoMudar(true);
    });
    return b;
  });
  return {
    el: h('div', {},
      h('div', { class: 'enunciado' }, 'Qual forma do verbo? 🔤'),
      h('div', { class: 'prompt-card verbo-frase' },
        h('span', { class: 'verbo-sujeito' }, sujeito),
        h('span', { class: 'verbo-lacuna' }, '____')
      ),
      h('div', { class: 'prompt-apoio' }, ex.item.pt),
      h('div', { class: 'opcoes' }, botoes)
    ),
    temVerificar: true,
    corrigir() {
      trancado = true;
      const ok = sel === alvo;
      botoes.forEach(b => {
        if (b.textContent === alvo) b.classList.add('certa');
        else if (b.textContent === sel && !ok) b.classList.add('errada');
      });
      return {
        correto: ok,
        certa: ex.item.en,
        nota: ok ? null : (ex.item.terceira
          ? 'Com he, she e it o verbo ganha -s (ou -es): ' + alvo
          : 'Com I, you, we e they o verbo fica na forma base: ' + alvo)
      };
    }
  };
}

export function montarExercicio(ex, cb) {
  if (ex.tipo === 'verbo') return montarVerbo(ex, cb);
  if (ex.tipo === 'pares') return montarPares(ex, cb);
  if (ex.tipo === 'digitar') return montarDigitar(ex, cb);
  if (ex.tipo === 'falar') return montarFalar(ex, cb);
  if (ex.tipo === 'montar' || ex.tipo === 'ditado') return montarFrase(ex, cb);
  return montarEscolha(ex, cb);
}
