import { UNIDADES, MASCOTE, BADGES } from './data.js';
import { estado, streakAtual, nivelInfo, itensAprendidos, registrarLicao, registrarRevisao, ativarSync, mesclarEstado, resetarEstado, limparEstadoMemoria, contaLocal, definirContaLocal, enviarAgora } from './game.js';
import { sons, falar, temTts, destravarAudio } from './audio.js';
import { gerarExercicios, exercicioFacil, montarExercicio } from './exercises.js';
import { h, aleatorio } from './util.js';
import { nuvemConfigurada, sessaoAtual, entrar, criarConta, sair, baixarProgresso, aoMudarAuth } from './nuvem.js';

const app = document.getElementById('app');
let sessao = null;
let usuarioEmail = null;
let telaAtiva = 'inicial';
let syncPendente = false;
let authCarregando = false;
let geracaoAuth = 0;

document.addEventListener('pointerdown', destravarAudio, { once: true });

function licaoFeita(l) {
  return !!estado.licoes[l.id];
}

function unidadeDesbloqueada(u) {
  const i = UNIDADES.indexOf(u);
  return i === 0 || UNIDADES[i - 1].licoes.every(licaoFeita);
}

function licaoDesbloqueada(u, idx) {
  return idx === 0 || licaoFeita(u.licoes[idx - 1]);
}

function telaInicial() {
  window.scrollTo(0, 0);
  telaAtiva = 'inicial';
  sessao = null;
  const nv = nivelInfo();
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('div', { class: 'logo' }, '🦜 GringoLingo'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'pilula', title: 'Dias seguidos' }, '🔥 ' + streakAtual()),
      h('div', { class: 'pilula', title: 'XP total' }, '⭐ ' + estado.xp),
      !nuvemConfigurada ? '' : authCarregando
        ? h('div', { class: 'pilula', title: 'Conectando na nuvem…' }, '☁️ …')
        : usuarioEmail
          ? (syncPendente
            ? h('button', { class: 'pilula btn-perfil', title: 'Não consegui baixar seu progresso — clique para tentar de novo', onclick: () => aposLogin(true) }, '☁️⚠️')
            : h('button', { class: 'pilula btn-perfil', title: usuarioEmail, onclick: telaPerfil }, '☁️ ' + usuarioEmail.split('@')[0]))
          : h('button', { class: 'pilula btn-perfil', onclick: () => telaLogin() }, '🔑 Entrar'),
      h('button', { class: 'pilula btn-perfil', 'aria-label': 'Perfil', onclick: telaPerfil }, '👤')
    ),
    h('div', { class: 'card nivel-card' },
      h('span', { class: 'nivel-emoji' }, nv.emoji),
      h('div', { class: 'nivel-info' },
        h('div', { class: 'nivel-titulo' }, `Nível ${nv.numero} · ${nv.titulo}`),
        h('div', { class: 'progresso nivel-prog' }, h('div', { style: `width:${Math.round(nv.progresso * 100)}%` })),
        h('div', { class: 'nivel-xp' }, nv.prox ? `${estado.xp} / ${nv.prox.xp} XP` : 'Nível máximo! 👑')
      )
    ),
    botaoRevisao(),
    ...UNIDADES.map(cartaoUnidade)
  );
}

function botaoRevisao() {
  if (itensAprendidos().length === 0) return '';
  const qtd = estado.erros.length;
  return h('button', { class: 'card revisao', onclick: iniciarRevisao },
    h('span', { class: 'revisao-emoji' }, '🧠'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Revisão Turbo'),
      h('div', { class: 'revisao-sub' }, qtd ? `${qtd} palavra${qtd > 1 ? 's' : ''} esperando revanche 😤` : 'Treino surpresa com o que você já sabe')
    ),
    h('span', { class: 'revisao-seta' }, '⚡')
  );
}

function cartaoUnidade(u) {
  const aberta = unidadeDesbloqueada(u);
  const feitas = u.licoes.filter(licaoFeita).length;
  return h('div', { class: 'unidade' },
    h('div', { class: 'unidade-cab', style: `background:${u.cor}` },
      h('span', { class: 'unidade-emoji' }, u.emoji),
      h('div', {},
        h('div', { class: 'unidade-titulo' }, u.titulo),
        h('div', { class: 'unidade-sub' }, `${feitas}/${u.licoes.length} lições`)
      ),
      aberta ? '' : h('span', { class: 'cadeado' }, '🔒')
    ),
    h('div', { class: 'licoes' },
      u.licoes.map((l, idx) => {
        const liberada = aberta && licaoDesbloqueada(u, idx);
        const prog = estado.licoes[l.id];
        const b = h('button', { class: 'licao' + (liberada ? '' : ' bloqueada') },
          h('div', { class: 'licao-emoji' }, liberada ? l.emoji : '🔒'),
          h('div', { class: 'licao-titulo' }, l.titulo),
          h('div', { class: 'estrelas' }, [1, 2, 3].map(n => h('span', { class: prog && prog.estrelas >= n ? 'ganha' : '' }, '★')))
        );
        if (liberada) b.addEventListener('click', () => iniciarLicao(u, l));
        return b;
      })
    )
  );
}

function iniciarLicao(u, l) {
  const pool = u.licoes.flatMap(x => x.itens);
  const fila = gerarExercicios(l.itens, pool, 8);
  sessao = {
    tipo: 'licao', unidade: u, licao: l, pool, fila, itens: l.itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: []
  };
  telaExercicio();
}

function iniciarRevisao() {
  const aprendidos = itensAprendidos();
  const mapa = new Map(aprendidos.map(i => [i.en, i]));
  const itens = estado.erros.map(e => mapa.get(e.en) || e).slice(0, 8);
  let tentativas = 0;
  while (itens.length < 8 && tentativas < 60) {
    tentativas++;
    const c = aleatorio(aprendidos);
    if (!itens.some(x => x.en === c.en)) itens.push(c);
  }
  const fila = gerarExercicios(itens, aprendidos, Math.min(8, itens.length * 2));
  sessao = {
    tipo: 'revisao', pool: aprendidos, fila, itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: []
  };
  telaExercicio();
}

function telaExercicio() {
  window.scrollTo(0, 0);
  telaAtiva = 'licao';
  const ex = sessao.fila[sessao.idx];
  const barra = h('div', { class: 'progresso barra-licao' },
    h('div', { style: `width:${Math.round(sessao.idx / sessao.fila.length * 100)}%` })
  );
  const comboEl = h('div', { class: 'combo' + (sessao.combo >= 2 ? ' pop' : '') }, sessao.combo >= 2 ? `⚡x${sessao.combo}` : '');
  const btnVerificar = h('button', { class: 'btn btn-verde' }, 'VERIFICAR');
  btnVerificar.disabled = true;
  const rodape = h('div', { class: 'rodape' }, h('div', { class: 'rodape-conteudo' }, btnVerificar));
  const feedback = h('div', { class: 'feedback' });
  const areaEx = h('div', { class: 'area-exercicio' });
  app.innerHTML = '';
  app.append(
    h('div', { class: 'licao-topo' },
      h('button', {
        class: 'fechar', 'aria-label': 'Sair',
        onclick() {
          if (temTts) speechSynthesis.cancel();
          telaInicial();
        }
      }, '✖'),
      barra,
      comboEl
    ),
    areaEx, rodape, feedback
  );
  const ctrl = montarExercicio(ex, {
    aoMudar: v => { btnVerificar.disabled = !v; },
    aoAuto: res => processar(ex, res, feedback, btnVerificar),
    aoEnter: () => { if (!btnVerificar.disabled) btnVerificar.click(); }
  });
  areaEx.append(ctrl.el);
  if (!ctrl.temVerificar) rodape.style.display = 'none';
  btnVerificar.addEventListener('click', () => {
    if (btnVerificar.disabled) return;
    const res = ctrl.corrigir();
    processar(ex, res, feedback, btnVerificar);
  });
}

function processar(ex, res, feedback, btnVerificar) {
  btnVerificar.disabled = true;
  sessao.respostas++;
  if (res.correto) {
    sessao.combo++;
    sessao.comboMax = Math.max(sessao.comboMax, sessao.combo);
    if (ex.repescagem) sessao.xp += 5;
    else {
      sessao.acertos++;
      sessao.xp += 10 + Math.min(sessao.combo - 1, 5) * 2;
    }
    if (sessao.combo >= 3) sons.combo(sessao.combo);
    else sons.acerto();
  } else {
    sessao.combo = 0;
    sons.erro();
    if (ex.item) {
      sessao.erros.push(ex.item);
      if (!ex.repescagem) {
        const rep = exercicioFacil(ex.item, sessao.pool);
        rep.repescagem = true;
        sessao.fila.push(rep);
      }
    }
  }
  if (ex.item && ['escolhaPtEn', 'digitar', 'montar'].includes(ex.tipo)) falar(ex.item.en);
  const frase = aleatorio(res.correto ? MASCOTE.acerto : MASCOTE.erro);
  const linhas = [];
  if (res.correto && res.quase) linhas.push(h('div', { class: 'feedback-frase' }, `O certinho é: ${res.certa}`));
  else if (!res.correto && res.certa) linhas.push(h('div', { class: 'feedback-frase' }, `Resposta certa: ${res.certa}`));
  linhas.push(h('div', { class: 'feedback-frase suave' }, frase));
  feedback.className = 'feedback ' + (res.correto ? 'certo' : 'errado');
  feedback.innerHTML = '';
  feedback.append(
    h('div', { class: 'feedback-conteudo' },
      h('div', { class: 'feedback-textos' },
        h('div', { class: 'feedback-titulo' }, res.correto ? (res.quase ? 'Quase perfeito! ✍️' : 'Muito bem!') : 'Ops!'),
        linhas
      ),
      h('button', { class: 'btn ' + (res.correto ? 'btn-verde' : 'btn-vermelho'), onclick: continuar }, 'CONTINUAR')
    )
  );
  requestAnimationFrame(() => feedback.classList.add('aberta'));
}

function continuar() {
  sessao.idx++;
  if (sessao.idx >= sessao.fila.length) finalizar();
  else telaExercicio();
}

function finalizar() {
  const s = sessao;
  const precisao = s.planejados ? Math.round(s.acertos / s.planejados * 100) : 100;
  const perfeita = s.acertos === s.planejados;
  const estrelas = precisao >= 90 ? 3 : precisao >= 60 ? 2 : 1;
  s.xp += 20 + (perfeita ? 15 : 0);
  let novas;
  if (s.tipo === 'licao') {
    novas = registrarLicao(s.licao.id, {
      estrelas, xp: s.xp, comboMax: s.comboMax, errosItens: s.erros,
      perfeita, acertos: s.acertos, respostas: s.planejados
    });
  } else {
    const errosEn = new Set(s.erros.map(e => e.en));
    novas = registrarRevisao({
      xp: s.xp, comboMax: s.comboMax, perfeita,
      acertos: s.acertos, respostas: s.planejados,
      acertadosEn: s.itens.filter(i => !errosEn.has(i.en)).map(i => i.en)
    });
  }
  telaResultado(estrelas, precisao, novas);
}

function telaResultado(estrelas, precisao, novasBadges) {
  window.scrollTo(0, 0);
  telaAtiva = 'resultado';
  const s = sessao;
  app.innerHTML = '';
  const stars = h('div', { class: 'estrelas-grandes' }, [1, 2, 3].map(n => {
    const sp = h('span', { class: 'anima' + (n <= estrelas ? ' ganha' : ''), style: `animation-delay:${0.3 + n * 0.25}s` }, '★');
    return sp;
  }));
  app.append(
    h('div', { class: 'resultado' },
      h('div', { class: 'emojao' }, estrelas === 3 ? '🤩' : estrelas === 2 ? '😎' : '💪'),
      h('h1', {}, s.tipo === 'revisao' ? 'Revisão concluída!' : 'Lição concluída!'),
      h('div', { class: 'resultado-frase' }, aleatorio(MASCOTE.resultado[estrelas])),
      stars,
      h('div', { class: 'pilulas-stats' },
        h('div', { class: 'pilula' }, `⭐ +${s.xp} XP`),
        h('div', { class: 'pilula' }, `🎯 ${precisao}% de precisão`),
        h('div', { class: 'pilula' }, `⚡ combo x${s.comboMax}`)
      ),
      novasBadges.length ? h('div', { class: 'novas-badges' },
        h('div', { class: 'secao-titulo' }, '🏅 Conquista nova!'),
        h('div', { class: 'badges-grid centrada' },
          novasBadges.map(b => h('div', { class: 'badge-card nova' },
            h('div', { class: 'badge-emoji' }, b.emoji),
            h('div', { class: 'badge-nome' }, b.nome),
            h('div', { class: 'badge-desc' }, b.desc)
          ))
        )
      ) : '',
      h('div', { class: 'resultado-botoes' },
        estrelas < 3 && s.tipo === 'licao'
          ? h('button', { class: 'btn btn-branco', onclick: () => iniciarLicao(s.unidade, s.licao) }, 'TENTAR DE NOVO')
          : '',
        h('button', { class: 'btn btn-verde', onclick: telaInicial }, 'CONTINUAR')
      )
    )
  );
  if (estrelas >= 2) confete();
  sons.fanfarra();
}

function telaLogin(aviso) {
  window.scrollTo(0, 0);
  telaAtiva = 'login';
  app.innerHTML = '';
  const email = h('input', { class: 'entrada', type: 'email', placeholder: 'seu@email.com', autocomplete: 'email' });
  const senha = h('input', { class: 'entrada', type: 'password', placeholder: 'senha (mín. 6 caracteres)', autocomplete: 'current-password' });
  const msg = h('div', { class: 'login-msg' });
  const btnEntrar = h('button', { class: 'btn btn-verde' }, 'ENTRAR');
  const btnCriar = h('button', { class: 'btn btn-azul' }, 'CRIAR CONTA');
  async function agir(criar) {
    msg.textContent = '';
    msg.className = 'login-msg';
    if (!email.value.trim() || !senha.value) {
      msg.textContent = 'Preenche e-mail e senha, gringo 😅';
      msg.classList.add('erro');
      return;
    }
    btnEntrar.disabled = btnCriar.disabled = true;
    try {
      if (criar) {
        const nova = await criarConta(email.value.trim(), senha.value);
        if (!nova) {
          msg.textContent = 'Conta criada! Confirma teu e-mail e depois entra 📬';
          msg.classList.add('ok');
          return;
        }
      } else {
        await entrar(email.value.trim(), senha.value);
      }
      await aposLogin(true);
    } catch (e) {
      msg.textContent = e.message;
      msg.classList.add('erro');
    } finally {
      btnEntrar.disabled = btnCriar.disabled = false;
    }
  }
  btnEntrar.addEventListener('click', () => agir(false));
  btnCriar.addEventListener('click', () => agir(true));
  senha.addEventListener('keydown', e => {
    if (e.key === 'Enter') agir(false);
  });
  app.append(
    h('div', { class: 'login' },
      h('div', { class: 'login-logo' }, '🦜'),
      h('h1', {}, 'Entrar no GringoLingo'),
      h('div', { class: 'login-sub' }, 'Sua evolução sincronizada em qualquer dispositivo ☁️'),
      email, senha, msg,
      h('div', { class: 'login-botoes' }, btnEntrar, btnCriar),
      h('button', { class: 'btn btn-branco', onclick: () => telaInicial() }, 'JOGAR SEM CONTA')
    )
  );
  if (aviso) {
    msg.textContent = aviso;
    msg.classList.add('erro');
  }
}

function erroNaUrl() {
  const hash = location.hash.slice(1);
  if (!hash.includes('error')) return null;
  const p = new URLSearchParams(hash);
  const codigo = p.get('error_code') || '';
  history.replaceState(null, '', location.pathname + location.search);
  if (codigo.includes('expired')) return 'Esse link de confirmação expirou — cria a conta de novo ou pede outro e-mail 📬';
  return 'Não deu pra confirmar: ' + (p.get('error_description') || codigo).replace(/\+/g, ' ');
}

async function aposLogin(interativo) {
  const g = ++geracaoAuth;
  authCarregando = !interativo;
  let s = null;
  try {
    s = await sessaoAtual();
  } catch {}
  if (g !== geracaoAuth) return;
  authCarregando = false;
  usuarioEmail = s?.user?.email ?? null;
  if (!usuarioEmail) {
    ativarSync(false);
    syncPendente = false;
    finalizarAuth(interativo);
    return;
  }
  try {
    const remoto = await baixarProgresso();
    if (g !== geracaoAuth) return;
    if (contaLocal() && contaLocal() !== s.user.id) resetarEstado();
    definirContaLocal(s.user.id);
    ativarSync(true);
    syncPendente = false;
    mesclarEstado(remoto);
  } catch {
    if (g !== geracaoAuth) return;
    ativarSync(false);
    syncPendente = true;
  }
  finalizarAuth(interativo);
}

function finalizarAuth(interativo) {
  if (interativo) telaInicial();
  else repintarTelaAtual();
}

function repintarTelaAtual() {
  if (telaAtiva === 'inicial') telaInicial();
  else if (telaAtiva === 'perfil') telaPerfil();
  else if (telaAtiva === 'login' && usuarioEmail && !document.querySelector('.login .entrada')?.value) telaInicial();
}

function telaPerfil() {
  window.scrollTo(0, 0);
  telaAtiva = 'perfil';
  const nv = nivelInfo();
  const palavras = new Set(itensAprendidos().map(i => i.en)).size;
  const precisao = estado.stats.respostas ? Math.round(estado.stats.acertos / estado.stats.respostas * 100) : 0;
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', onclick: telaInicial }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo' }, '👤 Seu perfil')
    ),
    h('div', { class: 'card nivel-card' },
      h('span', { class: 'nivel-emoji' }, nv.emoji),
      h('div', { class: 'nivel-info' },
        h('div', { class: 'nivel-titulo' }, `Nível ${nv.numero} · ${nv.titulo}`),
        h('div', { class: 'progresso nivel-prog' }, h('div', { style: `width:${Math.round(nv.progresso * 100)}%` })),
        h('div', { class: 'nivel-xp' }, nv.prox ? `${estado.xp} / ${nv.prox.xp} XP` : 'Nível máximo! 👑')
      )
    ),
    h('div', { class: 'stats-grid' },
      statPilula('🔥', streakAtual(), 'dias seguidos'),
      statPilula('📚', Object.keys(estado.licoes).length, 'lições concluídas'),
      statPilula('🗣️', palavras, 'palavras aprendidas'),
      statPilula('🎯', precisao + '%', 'precisão média'),
      statPilula('⚡', 'x' + estado.stats.comboMax, 'combo máximo'),
      statPilula('🧠', estado.stats.revisoes, 'revisões turbo')
    ),
    h('div', { class: 'secao-titulo' }, '🏅 Conquistas'),
    h('div', { class: 'badges-grid' },
      BADGES.map(b => {
        const tem = estado.badges.includes(b.id);
        return h('div', { class: 'badge-card' + (tem ? '' : ' trancada') },
          h('div', { class: 'badge-emoji' }, b.emoji),
          h('div', { class: 'badge-nome' }, b.nome),
          h('div', { class: 'badge-desc' }, b.desc)
        );
      })
    ),
    cartaoConta()
  );
}

function cartaoConta() {
  if (!nuvemConfigurada) return '';
  if (!usuarioEmail) {
    return h('button', { class: 'card conta-card conta-entrar', onclick: () => telaLogin() },
      h('span', {}, '🔑 Entrar para sincronizar seu progresso'),
      h('span', { class: 'revisao-seta' }, '☁️')
    );
  }
  const btnSair = h('button', { class: 'btn btn-vermelho' }, 'SAIR');
  btnSair.addEventListener('click', async () => {
    btnSair.disabled = true;
    let naNuvem = !syncPendente;
    if (syncPendente) {
      try {
        await enviarAgora();
        naNuvem = true;
      } catch {}
    }
    geracaoAuth++;
    try {
      await sair();
    } catch {}
    ativarSync(false);
    usuarioEmail = null;
    syncPendente = false;
    authCarregando = false;
    if (naNuvem) resetarEstado();
    telaInicial();
  });
  return h('div', { class: 'card conta-card' },
    h('span', { class: 'conta-email' }, syncPendente ? '☁️⚠️ ' + usuarioEmail : '☁️ ' + usuarioEmail),
    syncPendente ? h('span', { class: 'conta-aviso' }, 'Progresso ainda não sincronizado — ele fica salvo aqui no aparelho') : '',
    btnSair
  );
}

function statPilula(emoji, valor, rotulo) {
  return h('div', { class: 'stat' },
    h('div', { class: 'stat-emoji' }, emoji),
    h('div', {},
      h('div', { class: 'stat-valor' }, String(valor)),
      h('div', { class: 'stat-rotulo' }, rotulo)
    )
  );
}

function confete() {
  const cv = document.getElementById('confetti');
  const cx = cv.getContext('2d');
  cv.width = innerWidth;
  cv.height = innerHeight;
  const cores = ['#58CC02', '#1CB0F6', '#FF9600', '#CE82FF', '#FF4B4B', '#FFC800'];
  const parts = Array.from({ length: 140 }, () => ({
    x: Math.random() * cv.width,
    y: -20 - Math.random() * cv.height * 0.5,
    vx: (Math.random() - 0.5) * 3,
    vy: 2 + Math.random() * 4,
    r: 4 + Math.random() * 5,
    cor: cores[Math.floor(Math.random() * cores.length)],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3
  }));
  const t0 = performance.now();
  function tick(t) {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.rot);
      cx.fillStyle = p.cor;
      cx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      cx.restore();
    });
    if (t - t0 < 3200) requestAnimationFrame(tick);
    else cx.clearRect(0, 0, cv.width, cv.height);
  }
  requestAnimationFrame(tick);
}

async function iniciar() {
  const aviso = nuvemConfigurada ? erroNaUrl() : null;
  authCarregando = nuvemConfigurada;
  if (aviso) telaLogin(aviso);
  else telaInicial();
  if (!nuvemConfigurada) return;
  try {
    window.addEventListener('storage', e => {
      if (e.key === 'gringolingo' && e.newValue === null) {
        geracaoAuth++;
        limparEstadoMemoria();
        ativarSync(false);
        usuarioEmail = null;
        syncPendente = false;
        authCarregando = false;
        repintarTelaAtual();
      }
    });
    await aoMudarAuth(evento => {
      if (evento === 'SIGNED_OUT' && usuarioEmail) {
        geracaoAuth++;
        usuarioEmail = null;
        ativarSync(false);
        syncPendente = false;
        authCarregando = false;
        repintarTelaAtual();
      }
    });
    const s = await sessaoAtual();
    if (s) {
      await aposLogin(false);
      return;
    }
  } catch {}
  authCarregando = false;
  repintarTelaAtual();
}

iniciar();
