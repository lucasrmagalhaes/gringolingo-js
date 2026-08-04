import { UNIDADES, MASCOTE, BADGES, NOVIDADES, VERSAO_APP } from './data.js';
import { estado, streakAtual, streakEmRisco, nivelInfo, itensAprendidos, itensVencidos, registrarLicao, registrarRevisao, ativarSync, mesclarEstado, resetarEstado, limparEstadoMemoria, contaLocal, definirContaLocal, enviarAgora, xpDoDia, metaBatida, definirMeta, semanaAtual, missoesDeHoje, memorizadas, salvar, tentarReenviar, observarPendencia, temPendencia, exportarEstado, importarEstado, distribuicaoDeCaixas, historicoRecente, METAS } from './game.js';
import { sons, falar, temTts, destravarAudio, vozesDisponiveis, vozAtual, definirVoz, aoCarregarVozes, velocidadeAtual, definirVelocidade, mudo, definirMudo, VELOCIDADES } from './audio.js';
import { gerarExercicios, gerarDificeis, exercicioFacil, montarExercicio } from './exercises.js';
import { h, aleatorio } from './util.js';
import { nuvemConfigurada, sessaoAtual, entrar, criarConta, sair, baixarProgresso, aoMudarAuth, googleAtivo, entrarComGoogle, vincularGoogle, desvincularGoogle, provedoresDaConta, traduzirErro, apagarConta } from './nuvem.js';
import { registrar, logSalvo, limparLog, modoDebug, contextoDoLog } from './erros.js';
import { buscar, carregarBanco, bancoCarregado, statusDoItem, totalDoCurso } from './dicionario.js';
import { ehFavorita, alternarFavorita, itensFavoritos } from './game.js';
import { compartilharCard } from './compartilhar.js';

const app = document.getElementById('app');
let sessao = null;
let usuarioEmail = null;
let telaAtiva = 'inicial';
let syncPendente = false;
let authCarregando = false;
let geracaoAuth = 0;
let temGoogle = false;
let provedores = [];
let atalhosAtivos = null;
let timerLembrete = null;
let avisoPendente = null;
let avisoPerfil = null;
let desafioAtivo = null;

const SVG_GOOGLE = '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

function iconeGoogle() {
  const s = h('span', { class: 'icone-google' });
  s.innerHTML = SVG_GOOGLE;
  return s;
}

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
  avisoPerfil = null;
  sessao = null;
  const nv = nivelInfo();
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('div', { class: 'logo' }, '🦜 GringoLingo'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'pilula' + (streakAtual() > 0 ? ' pilula-fogo' : ''), title: 'Dias seguidos' }, '🔥 ' + streakAtual()),
      h('div', { class: 'pilula', title: 'XP total' }, '⭐ ' + estado.xp),
      botaoTema(),
      ...pilulasDeConta()
    ),
    h('div', { class: 'card nivel-card' },
      h('span', { class: 'nivel-emoji' }, nv.emoji),
      h('div', { class: 'nivel-info' },
        h('div', { class: 'nivel-titulo' }, `Nível ${nv.numero} · ${nv.titulo}`),
        h('div', { class: 'progresso nivel-prog' }, h('div', { style: `width:${Math.round(nv.progresso * 100)}%` })),
        h('div', { class: 'nivel-xp' }, nv.prox ? `${estado.xp} / ${nv.prox.xp} XP` : 'Nível máximo! 👑')
      )
    ),
    bannerDesafio(),
    bannerStreak(),
    cartaoBoasVindas(),
    h('div', { class: 'rotulo' }, 'HOJE'),
    cartaoMeta(),
    faixaSemana(),
    cartaoMissoes(),
    botaoRevisao(),
    botaoMinhaLista(),
    botaoDicionario(),
    h('div', { class: 'rotulo' }, 'TRILHA'),
    ...UNIDADES.map(cartaoUnidade)
  );
}

function botaoPerfil() {
  return h('button', { class: 'pilula btn-perfil', 'aria-label': 'Seu perfil', title: 'Seu perfil', onclick: telaPerfil }, '👤');
}

function pilulasDeConta() {
  if (!nuvemConfigurada) return [botaoPerfil()];
  if (authCarregando) return [h('div', { class: 'pilula', title: 'Conectando na nuvem…' }, '☁️ …'), botaoPerfil()];
  if (!usuarioEmail) {
    return [
      h('button', { class: 'pilula btn-perfil', onclick: () => telaLogin() }, '🔑 Entrar'),
      botaoPerfil()
    ];
  }
  const apelido = usuarioEmail.split('@')[0];
  return [h('button', {
    class: 'pilula btn-perfil pilula-conta' + (syncPendente ? ' pendente' : ''),
    'aria-label': `Perfil de ${usuarioEmail}${syncPendente ? ' — progresso não sincronizado' : ''}`,
    title: syncPendente ? 'Progresso ainda não sincronizado — abra o perfil' : usuarioEmail,
    onclick: telaPerfil
  },
    h('span', { 'aria-hidden': 'true' }, syncPendente ? '⚠️' : '☁️'),
    h('span', { class: 'pilula-nome' }, apelido)
  )];
}

function bannerStreak() {
  if (!streakEmRisco()) return '';
  return h('div', { class: 'banner-streak' },
    h('span', {}, '🔥'),
    h('span', {}, `Sua sequência de ${streakAtual()} dia${streakAtual() > 1 ? 's' : ''} vence hoje! Uma lição salva ela.`)
  );
}

function cartaoMeta() {
  const feito = xpDoDia();
  const pct = Math.min(100, Math.round(feito / estado.meta * 100));
  const pronto = metaBatida();
  return h('div', { class: 'card meta-card' + (pronto ? ' meta-pronta' : '') },
    h('span', { class: 'meta-emoji' }, pronto ? '🎉' : '🎯'),
    h('div', { class: 'meta-info' },
      h('div', { class: 'meta-titulo' }, pronto ? 'Meta do dia batida!' : 'Meta do dia'),
      h('div', { class: 'progresso meta-prog' }, h('div', { style: `width:${pct}%` })),
      h('div', { class: 'meta-xp' }, `${feito} / ${estado.meta} XP de hoje`)
    ),
    h('div', { class: 'metas', role: 'group', 'aria-label': 'Escolher meta diária de XP' },
      METAS.map(m => h('button', {
        class: 'meta-opcao' + (m === estado.meta ? ' ativa' : ''),
        'aria-pressed': m === estado.meta ? 'true' : 'false',
        title: `Meta de ${m} XP por dia`,
        onclick() {
          definirMeta(m);
          telaInicial();
        }
      }, String(m)))
    )
  );
}

function faixaSemana() {
  if (!estado.stats.licoes) return '';
  const dias = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  return h('div', { class: 'semana' },
    semanaAtual().map((d, i) => h('div', {
      class: 'semana-dia' + (d.xp ? ' feito' : '') + (d.hoje ? ' hoje' : '') + (d.futuro ? ' futuro' : ''),
      title: `${d.data}: ${d.xp} XP`
    },
      h('span', { class: 'semana-letra' }, dias[i]),
      h('span', { class: 'semana-bolinha' }, d.xp ? '🔥' : '·')
    ))
  );
}

function cartaoMissoes() {
  if (!estado.stats.licoes) return '';
  const missoes = missoesDeHoje();
  return h('div', { class: 'card missoes-card' },
    h('div', { class: 'missoes-titulo' }, '🎯 Missões de hoje'),
    ...missoes.map(m => h('div', { class: 'missao' + (m.concluida ? ' concluida' : '') },
      h('span', { class: 'missao-emoji' }, m.concluida ? '✅' : m.emoji),
      h('div', { class: 'missao-corpo' },
        h('div', { class: 'missao-nome' }, m.titulo),
        h('div', { class: 'progresso missao-prog' }, h('div', { style: `width:${Math.round(m.valor / m.alvo * 100)}%` }))
      ),
      h('span', { class: 'missao-xp' }, '+' + m.xp)
    ))
  );
}

function cartaoBoasVindas() {
  if (estado.stats.licoes) return '';
  return h('div', { class: 'card boas-vindas' },
    h('div', { class: 'boas-emoji' }, '🦜'),
    h('div', { class: 'boas-texto' },
      h('div', { class: 'boas-titulo' }, 'Bem-vindo, gringo!'),
      h('div', { class: 'boas-sub' }, 'Cinco minutinhos por dia já mudam tudo. Bora começar pela primeira lição?')
    ),
    h('button', {
      class: 'btn btn-verde',
      onclick: () => iniciarLicao(UNIDADES[0], UNIDADES[0].licoes[0])
    }, 'COMEÇAR')
  );
}

function botaoMinhaLista() {
  const favoritas = itensFavoritos();
  if (!favoritas.length) return '';
  return h('button', { class: 'card revisao minha-lista', onclick: iniciarMinhaLista },
    h('span', { class: 'revisao-emoji' }, '⭐'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Minha Lista'),
      h('div', { class: 'revisao-sub' }, `${favoritas.length} palavra${favoritas.length > 1 ? 's' : ''} que você separou — bora treinar?`)
    ),
    h('span', { class: 'revisao-seta' }, '⚡')
  );
}

function iniciarMinhaLista() {
  const favoritas = itensFavoritos();
  if (!favoritas.length) return;
  const pool = [...favoritas, ...itensAprendidos()];
  const alvo = favoritas.slice().sort((a, b) => {
    const ax = estado.itens[a.en]?.proxima ?? '';
    const bx = estado.itens[b.en]?.proxima ?? '';
    return ax < bx ? -1 : ax > bx ? 1 : 0;
  }).slice(0, 8);
  const fila = gerarExercicios(alvo, pool, Math.min(8, alvo.length * 2));
  sessao = {
    tipo: 'revisao', pool, fila, itens: alvo,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function botaoDicionario() {
  const extra = bancoCarregado()?.length;
  return h('button', { class: 'card dicionario-atalho', onclick: () => telaDicionario() },
    h('span', { class: 'revisao-emoji' }, '📖'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Dicionário'),
      h('div', { class: 'revisao-sub' }, extra
        ? `Busque em inglês ou português entre ${totalDoCurso() + extra} palavras`
        : 'Busque qualquer palavra em inglês ou português')
    ),
    h('span', { class: 'revisao-seta' }, '🔎')
  );
}

function telaDicionario() {
  window.scrollTo(0, 0);
  telaAtiva = 'dicionario';
  app.innerHTML = '';
  const busca = h('input', {
    class: 'entrada busca-dic',
    type: 'search',
    placeholder: 'Buscar em inglês ou português…',
    autocomplete: 'off',
    autocapitalize: 'off',
    spellcheck: 'false',
    'aria-label': 'Buscar palavra'
  });
  const lista = h('div', { class: 'dic-lista', role: 'list' });
  const contador = h('div', { class: 'dic-contador', role: 'status', 'aria-live': 'polite' });
  const filtros = ['todas', 'curso', 'aprendidas', 'revisar'];
  const nomes = { todas: 'Todas', curso: 'Do curso', aprendidas: 'Aprendidas', revisar: 'Revisar' };
  let filtro = 'todas';
  const chips = h('div', { class: 'metas dic-filtros', role: 'group', 'aria-label': 'Filtrar palavras' },
    filtros.map(f => {
      const b = h('button', {
        class: 'meta-opcao' + (f === filtro ? ' ativa' : ''),
        'aria-pressed': f === filtro ? 'true' : 'false',
        onclick() {
          filtro = f;
          [...chips.children].forEach(c => {
            const ativo = c.textContent === nomes[f];
            c.classList.toggle('ativa', ativo);
            c.setAttribute('aria-pressed', ativo ? 'true' : 'false');
          });
          desenhar();
        }
      }, nomes[f]);
      return b;
    })
  );
  function desenhar() {
    const achados = buscar(busca.value, filtro);
    lista.innerHTML = '';
    contador.textContent = achados.length
      ? `${achados.length}${achados.length === 60 ? '+' : ''} resultado${achados.length > 1 ? 's' : ''}`
      : '';
    if (!achados.length) {
      lista.append(vazio(busca.value, filtro, () => {
        busca.value = '';
        desenhar();
        busca.focus();
      }));
      return;
    }
    achados.forEach((v, i) => {
      const el = verbete(v);
      if (i < 10 && !reduzirMovimento()) el.style.animationDelay = i * 0.03 + 's';
      lista.append(el);
    });
  }
  busca.addEventListener('input', desenhar);
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', onclick: () => telaInicial() }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo' }, '📖 Dicionário')
    ),
    h('div', { class: 'campo-busca' },
      h('span', { class: 'campo-busca-icone', 'aria-hidden': 'true' }, '🔎'),
      busca
    ),
    chips,
    contador,
    lista
  );
  if (!bancoCarregado()) {
    contador.textContent = 'Carregando o banco de palavras…';
    lista.append(...Array.from({ length: 6 }, () => esqueleto()));
    carregarBanco().then(() => {
      if (telaAtiva === 'dicionario') desenhar();
    });
  } else {
    desenhar();
  }
  busca.focus({ preventScroll: true });
}

function esqueleto() {
  return h('div', { class: 'dic-item esqueleto', 'aria-hidden': 'true' },
    h('div', { class: 'esq-bloco esq-som' }),
    h('div', { class: 'dic-corpo' },
      h('div', { class: 'esq-bloco esq-linha1' }),
      h('div', { class: 'esq-bloco esq-linha2' })
    ),
    h('div', { class: 'esq-bloco esq-tag' })
  );
}

const VAZIOS = {
  aprendidas: { emoji: '🌱', titulo: 'Nenhuma palavra aprendida ainda', sub: 'Complete uma lição e elas aparecem aqui com o status da sua memória.' },
  revisar: { emoji: '🎉', titulo: 'Nada para revisar!', sub: 'Sua memória está em dia. Volte amanhã ou avance na trilha.' },
  curso: { emoji: '🔎', titulo: 'Nada no curso com esse termo', sub: 'Tente o filtro "Todas" para procurar no dicionário completo.' },
  todas: { emoji: '🤔', titulo: 'Nada encontrado', sub: 'Confira a grafia ou tente outra palavra — a busca aceita português e inglês.' }
};

function vazio(termo, filtro, aoLimpar) {
  const conf = termo ? (filtro === 'curso' ? VAZIOS.curso : VAZIOS.todas) : VAZIOS[filtro] ?? VAZIOS.todas;
  return h('div', { class: 'estado-vazio' },
    h('div', { class: 'vazio-emoji' }, conf.emoji),
    h('div', { class: 'vazio-titulo' }, conf.titulo),
    h('div', { class: 'vazio-sub' }, conf.sub),
    termo ? h('button', { class: 'btn btn-branco', onclick: aoLimpar }, 'LIMPAR BUSCA') : ''
  );
}

const CLASSES = { verbo: 'verbo', subst: 'substantivo', adj: 'adjetivo', adv: 'advérbio', prep: 'preposição', pron: 'pronome', conj: 'conjunção', num: 'número', interj: 'interjeição' };

function verbete(v) {
  const st = v.doCurso || estado.itens[v.en] ? statusDoItem(v.en) : null;
  const fav = h('button', {
    class: 'dic-fav' + (ehFavorita(v.en) ? ' ativa' : ''),
    'aria-label': (ehFavorita(v.en) ? 'Tirar' : 'Adicionar') + ' ' + v.en + ' da Minha Lista',
    'aria-pressed': ehFavorita(v.en) ? 'true' : 'false',
    title: 'Minha Lista',
    onclick(e) {
      e.stopPropagation();
      const agora = alternarFavorita({ en: v.en, pt: v.pt, classe: v.classe });
      fav.classList.toggle('ativa', agora);
      fav.setAttribute('aria-pressed', agora ? 'true' : 'false');
      sons.toque();
    }
  }, '⭐');
  return h('div', { class: 'dic-item', role: 'listitem' },
    h('button', {
      class: 'btn-som dic-som',
      'aria-label': 'Ouvir ' + v.en,
      onclick: () => falar(v.en)
    }, '🔊'),
    h('div', { class: 'dic-corpo' },
      h('div', { class: 'dic-en' }, v.en),
      h('div', { class: 'dic-pt' }, v.pt.join(' · ')),
      v.nota ? h('div', { class: 'dic-nota' }, '💡 ' + v.nota) : ''
    ),
    h('div', { class: 'dic-tags' },
      v.classe ? h('span', { class: 'dic-tag' }, CLASSES[v.classe] ?? v.classe) : '',
      v.doCurso ? h('span', { class: 'dic-tag dic-unidade', style: `--cor-unidade:${v.cor}` }, v.unidadeEmoji + ' ' + v.unidade) : '',
      st ? h('span', { class: 'dic-tag dic-status ' + st.id, title: st.texto }, st.emoji + ' ' + st.texto) : ''
    ),
    fav
  );
}

function botaoRevisao() {
  if (itensAprendidos().length === 0) return '';
  const vencidas = itensVencidos().length;
  return h('button', { class: 'card revisao' + (vencidas ? ' revisao-vencida' : ''), onclick: iniciarRevisao },
    h('span', { class: 'revisao-emoji' }, '🧠'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Revisão Turbo'),
      h('div', { class: 'revisao-sub' }, vencidas
        ? `${vencidas} palavra${vencidas > 1 ? 's' : ''} vencendo hoje — hora de fixar 📅`
        : 'Tudo em dia! Treino surpresa com o que você já sabe ✅')
    ),
    h('span', { class: 'revisao-seta' }, vencidas ? '⚡' : '✨')
  );
}

function cartaoUnidade(u) {
  const aberta = unidadeDesbloqueada(u);
  const feitas = u.licoes.filter(licaoFeita).length;
  return h('div', { class: 'unidade', style: `--cor-unidade:${u.cor}` },
    h('div', { class: 'unidade-cab', style: `background-color:${u.cor}` },
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
        const estrelas = prog?.estrelas ?? 0;
        const b = h('button', {
          class: 'licao' + (liberada ? '' : ' bloqueada') + (estrelas ? ' feita' : ''),
          'aria-label': `${l.titulo} — ${liberada ? estrelas + ' de 3 estrelas' : 'bloqueada'}`
        },
          h('div', { class: 'licao-emoji', 'aria-hidden': 'true' }, liberada ? l.emoji : '🔒'),
          h('div', { class: 'licao-titulo' }, l.titulo),
          h('div', { class: 'estrelas', 'aria-hidden': 'true' }, [1, 2, 3].map(n => h('span', { class: estrelas >= n ? 'ganha' : '' }, '★')))
        );
        if (liberada) b.addEventListener('click', () => iniciarLicao(u, l));
        else b.disabled = true;
        return b;
      }),
      nodoChefao(u, aberta)
    )
  );
}

function nodoChefao(u, aberta) {
  const completa = u.licoes.every(licaoFeita);
  const vencido = !!estado.licoes['chefao:' + u.id];
  const liberado = aberta && completa;
  const b = h('button', {
    class: 'licao chefao' + (liberado ? '' : ' bloqueada') + (vencido ? ' feita' : ''),
    'aria-label': `Chefão de ${u.titulo} — ${vencido ? 'conquistado' : liberado ? 'liberado' : 'complete as 4 lições para liberar'}`
  },
    h('div', { class: 'licao-emoji', 'aria-hidden': 'true' }, liberado || vencido ? '👑' : '🔒'),
    h('div', { class: 'licao-titulo' }, 'Chefão'),
    h('div', { class: 'estrelas', 'aria-hidden': 'true' }, vencido ? h('span', { class: 'ganha' }, '★') : h('span', {}, '★'))
  );
  if (liberado) b.addEventListener('click', () => iniciarChefao(u));
  else b.disabled = true;
  return b;
}

function iniciarChefao(u) {
  const itens = u.licoes.flatMap(l => l.itens);
  const fila = gerarDificeis(itens, itens, 12);
  sessao = {
    tipo: 'licao', chefao: true, unidade: u, licao: { id: 'chefao:' + u.id, titulo: 'Chefão ' + u.titulo },
    pool: itens, fila, itens, vidas: 3,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}


function iniciarLicao(u, l) {
  if (l.dica && !estado.licoes[l.id]) {
    telaDica(u, l);
    return;
  }
  comecarLicao(u, l);
}

function telaDica(u, l) {
  window.scrollTo(0, 0);
  telaAtiva = 'dica';
  app.innerHTML = '';
  const botao = h('button', { class: 'btn btn-verde', onclick: () => comecarLicao(u, l) }, 'ENTENDI, BORA!');
  app.append(
    h('div', { class: 'dica-tela' },
      h('div', { class: 'dica-emoji' }, '💡'),
      h('h1', {}, l.dica.titulo),
      h('div', { class: 'card dica-corpo' }, l.dica.corpo),
      botao
    )
  );
  botao.focus({ preventScroll: true });
}

function comecarLicao(u, l) {
  const pool = u.licoes.flatMap(x => x.itens);
  const fila = gerarExercicios(l.itens, pool, 8);
  sessao = {
    tipo: 'licao', unidade: u, licao: l, pool, fila, itens: l.itens,
    idx: 0, planejados: fila.length, acertos: 0, respostas: 0,
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function iniciarRevisao() {
  const aprendidos = itensAprendidos();
  const itens = itensVencidos().slice(0, 8);
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
    xp: 0, combo: 0, comboMax: 0, erros: [], resultados: new Map()
  };
  telaExercicio();
}

function telaExercicio() {
  window.scrollTo(0, 0);
  telaAtiva = 'licao';
  const ex = sessao.fila[sessao.idx];
  const pct = Math.round(sessao.idx / sessao.fila.length * 100);
  const barra = h('div', {
    class: 'progresso barra-licao',
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    'aria-valuenow': String(pct),
    'aria-label': 'Progresso da lição'
  }, h('div', { style: `width:${pct}%` }));
  const comboEl = sessao.chefao
    ? h('div', { class: 'combo vidas', title: 'Vidas restantes' }, '❤️'.repeat(Math.max(sessao.vidas, 0)))
    : h('div', { class: 'combo' + (sessao.combo >= 2 ? ' pop' : '') }, sessao.combo >= 2 ? `⚡x${sessao.combo}` : '');
  const btnVerificar = h('button', { class: 'btn btn-verde' }, 'VERIFICAR');
  btnVerificar.disabled = true;
  const rodape = h('div', { class: 'rodape' }, h('div', { class: 'rodape-conteudo' }, btnVerificar));
  const feedback = h('div', { class: 'feedback', role: 'status', 'aria-live': 'polite' });
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
    aoEnter: () => { if (!btnVerificar.disabled) btnVerificar.click(); },
    aoPular: () => {
      sessao.fila.splice(sessao.idx, 1);
      sessao.planejados = Math.max(1, sessao.planejados - 1);
      if (sessao.idx >= sessao.fila.length) finalizar();
      else telaExercicio();
    }
  });
  areaEx.append(ctrl.el);
  if (!ctrl.temVerificar) rodape.style.display = 'none';
  ligarAtalhos(areaEx, btnVerificar, feedback);
  focarTela();
  btnVerificar.addEventListener('click', () => {
    if (btnVerificar.disabled) return;
    const res = ctrl.corrigir();
    processar(ex, res, feedback, btnVerificar);
  });
}

function ligarAtalhos(areaEx, btnVerificar, feedback) {
  if (atalhosAtivos) document.removeEventListener('keydown', atalhosAtivos);
  atalhosAtivos = e => {
    if (telaAtiva !== 'licao') return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const digitando = document.activeElement?.classList.contains('entrada');
    const btnFeedback = feedback.querySelector('.btn');
    if (e.key === 'Enter') {
      if (btnFeedback) {
        e.preventDefault();
        btnFeedback.click();
      } else if (!digitando && !btnVerificar.disabled) {
        e.preventDefault();
        btnVerificar.click();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (temTts) speechSynthesis.cancel();
      telaInicial();
      return;
    }
    if (digitando || btnFeedback) return;
    const n = Number(e.key);
    if (n >= 1 && n <= 4) {
      const opcoes = areaEx.querySelectorAll('.opcoes .opcao');
      if (opcoes[n - 1]) {
        e.preventDefault();
        opcoes[n - 1].click();
      }
    }
  };
  document.addEventListener('keydown', atalhosAtivos);
}

function processar(ex, res, feedback, btnVerificar) {
  btnVerificar.disabled = true;
  sessao.respostas++;
  const alvos = ex.tipo === 'pares' ? ex.pares : ex.item ? [ex.item] : [];
  alvos.forEach(it => {
    const anterior = sessao.resultados.get(it.en);
    sessao.resultados.set(it.en, { en: it.en, acertou: (anterior ? anterior.acertou : true) && res.correto });
  });
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
    if (sessao.chefao) sessao.vidas--;
    if (ex.item) {
      sessao.erros.push(ex.item);
      if (!ex.repescagem && !sessao.chefao) {
        const rep = exercicioFacil(ex.item, sessao.pool);
        rep.repescagem = true;
        sessao.fila.push(rep);
      }
    }
  }
  if (ex.item && ['escolhaPtEn', 'digitar', 'montar', 'ditado', 'lacuna', 'ouvirPt'].includes(ex.tipo)) falar(ex.item.en);
  const frase = aleatorio(res.correto ? MASCOTE.acerto : MASCOTE.erro);
  const linhas = [];
  if (res.correto && res.quase) linhas.push(h('div', { class: 'feedback-frase' }, `O certinho é: ${res.certa}`));
  else if (!res.correto && res.diff) linhas.push(linhaDiff(res.diff));
  else if (!res.correto && res.certa) linhas.push(h('div', { class: 'feedback-frase' }, `Resposta certa: ${res.certa}`));
  if (!res.correto && ex.item?.nota) linhas.push(h('div', { class: 'feedback-nota' }, '💡 ' + ex.item.nota));
  linhas.push(h('div', { class: 'feedback-frase suave' }, frase));
  feedback.className = 'feedback ' + (res.correto ? 'certo' : 'errado');
  feedback.innerHTML = '';
  const btnContinuar = h('button', { class: 'btn ' + (res.correto ? 'btn-verde' : 'btn-vermelho'), onclick: continuar }, 'CONTINUAR');
  feedback.append(
    h('div', { class: 'feedback-conteudo' },
      h('div', { class: 'feedback-textos' },
        h('div', { class: 'feedback-titulo' }, res.correto ? (res.quase ? 'Quase perfeito! ✍️' : 'Muito bem!') : 'Ops!'),
        linhas
      ),
      btnContinuar
    )
  );
  requestAnimationFrame(() => feedback.classList.add('aberta'));
  btnContinuar.focus({ preventScroll: true });
}

function linhaDiff(diff) {
  const temSobra = diff.dada.some(p => p.sobra);
  return h('div', { class: 'feedback-diff' },
    h('div', { class: 'feedback-frase' },
      h('span', { class: 'diff-rotulo' }, 'Certo: '),
      diff.certa.map(p => h('span', { class: p.falta ? 'diff-falta' : '' }, p.palavra + ' '))
    ),
    temSobra ? h('div', { class: 'feedback-frase suave' },
      h('span', { class: 'diff-rotulo' }, 'Você: '),
      diff.dada.map(p => h('span', { class: p.sobra ? 'diff-sobra' : '' }, p.palavra + ' '))
    ) : ''
  );
}

function continuar() {
  sessao.idx++;
  if (sessao.chefao && sessao.vidas <= 0) {
    finalizar(true);
    return;
  }
  if (sessao.idx >= sessao.fila.length) finalizar();
  else transicao(telaExercicio, 'avancar');
}

function finalizar(derrotado) {
  const s = sessao;
  if (s.chefao && derrotado) {
    telaChefaoPerdido(s);
    return;
  }
  const precisao = s.planejados ? Math.round(s.acertos / s.planejados * 100) : 100;
  const perfeita = s.acertos === s.planejados;
  const estrelas = precisao >= 90 ? 3 : precisao >= 60 ? 2 : 1;
  s.xp += 20 + (perfeita ? 15 : 0);
  if (s.chefao) s.xp += 60;
  const agendamentos = [...s.resultados.values()];
  let evento;
  if (s.tipo === 'licao') {
    evento = registrarLicao(s.licao.id, {
      estrelas, xp: s.xp, comboMax: s.comboMax, errosItens: s.erros,
      perfeita, acertos: s.acertos, respostas: s.planejados, agendamentos
    });
  } else {
    const errosEn = new Set(s.erros.map(e => e.en));
    evento = registrarRevisao({
      xp: s.xp, comboMax: s.comboMax, perfeita,
      acertos: s.acertos, respostas: s.planejados, agendamentos,
      acertadosEn: s.itens.filter(i => !errosEn.has(i.en)).map(i => i.en)
    });
  }
  s.xp += evento.bonusMissoes;
  telaResultado(estrelas, precisao, evento);
}

function telaResultado(estrelas, precisao, evento) {
  window.scrollTo(0, 0);
  telaAtiva = 'resultado';
  const s = sessao;
  const novasBadges = evento.badges;
  app.innerHTML = '';
  const pilulaXp = h('div', { class: 'pilula' }, `⭐ +0 XP`);
  contarAte(pilulaXp, s.xp, valor => `⭐ +${valor} XP`);
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
        pilulaXp,
        h('div', { class: 'pilula' }, `🎯 ${precisao}% de precisão`),
        h('div', { class: 'pilula' }, `⚡ combo x${s.comboMax}`),
        evento.streakNovo ? h('div', { class: 'pilula pop destaque' }, `🔥 ${evento.streakNovo} dias seguidos!`) : '',
        evento.bateuMeta ? h('div', { class: 'pilula pop destaque' }, '🎯 Meta do dia batida!') : '',
        evento.usouProtetor ? h('div', { class: 'pilula destaque' }, '🧊 Protetor salvou seu fogo!') : ''
      ),
      evento.missoes?.length ? h('div', { class: 'missoes-cumpridas' },
        h('div', { class: 'secao-titulo' }, '🎯 Missão cumprida!'),
        ...evento.missoes.map(m => h('div', { class: 'pilula' }, `${m.emoji} ${m.titulo} +${m.xp} XP`))
      ) : '',
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
        s.tipo === 'licao' && !s.chefao ? botaoDesafiar(s, estrelas) : '',
        estrelas < 3 && s.tipo === 'licao'
          ? h('button', { class: 'btn btn-branco', onclick: () => iniciarLicao(s.unidade, s.licao) }, 'TENTAR DE NOVO')
          : '',
        h('button', { class: 'btn btn-verde', onclick: telaInicial }, 'CONTINUAR')
      )
    )
  );
  coreografiaResultado(estrelas, evento);
}

function coreografiaResultado(estrelas, evento) {
  if (reduzirMovimento()) {
    sons.fanfarra();
    if (estrelas >= 2 || evento.subiuNivel) confete();
    if (evento.subiuNivel) overlayNivel(evento.subiuNivel);
    return;
  }
  const passos = [];
  for (let n = 1; n <= estrelas; n++) passos.push({ ms: 300 + n * 260, fn: () => sons.estrela(n) });
  passos.push({ ms: 300 + estrelas * 260 + 120, fn: () => { sons.fanfarra(); if (estrelas >= 2 || evento.subiuNivel) confete(); } });
  if (evento.subiuNivel) passos.push({ ms: 300 + estrelas * 260 + 900, fn: () => overlayNivel(evento.subiuNivel) });
  passos.forEach(p => setTimeout(p.fn, p.ms));
}

function botaoDesafiar(s, estrelas) {
  const botao = h('button', { class: 'btn btn-branco' }, '🎯 DESAFIAR');
  botao.addEventListener('click', async () => {
    const url = linkDoDesafio(s, estrelas);
    const texto = `Acertei ${s.acertos} de ${s.planejados} em "${s.licao.titulo}" no GringoLingo 🦜 Consegue bater?`;
    try {
      if (navigator.share) await navigator.share({ text: texto, url });
      else {
        await navigator.clipboard.writeText(texto + ' ' + url);
        botao.textContent = '✅ LINK COPIADO';
      }
    } catch (e) {
      if (e?.name !== 'AbortError') botao.textContent = '❌ NÃO ROLOU';
    }
  });
  return botao;
}

function telaChefaoPerdido(s) {
  window.scrollTo(0, 0);
  telaAtiva = 'resultado';
  app.innerHTML = '';
  sons.erro();
  app.append(
    h('div', { class: 'resultado' },
      h('div', { class: 'emojao' }, '💥'),
      h('h1', {}, 'O Chefão venceu dessa vez'),
      h('div', { class: 'resultado-frase' }, 'Suas 3 vidas acabaram — mas nada foi perdido. Revise e volta pra revanche! 👑'),
      h('div', { class: 'pilulas-stats' },
        h('div', { class: 'pilula' }, `🎯 ${s.acertos} acerto${s.acertos === 1 ? '' : 's'}`),
        h('div', { class: 'pilula' }, `💔 ${s.erros.length} erro${s.erros.length === 1 ? '' : 's'}`)
      ),
      h('div', { class: 'resultado-botoes' },
        h('button', { class: 'btn btn-branco', onclick: () => iniciarChefao(s.unidade) }, 'TENTAR DE NOVO'),
        h('button', { class: 'btn btn-verde', onclick: () => telaInicial() }, 'VOLTAR')
      )
    )
  );
}

function contarAte(el, alvo, formato) {
  if (reduzirMovimento() || alvo <= 0) {
    el.textContent = formato(alvo);
    return;
  }
  const inicio = performance.now();
  const passo = agora => {
    const t = Math.min(1, (agora - inicio) / 700);
    el.textContent = formato(Math.round(alvo * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

function overlayNivel(nv) {
  const fechar = () => {
    caixa.remove();
    document.removeEventListener('keydown', aoTeclar);
  };
  const aoTeclar = e => {
    if (e.key === 'Escape' || e.key === 'Enter') fechar();
  };
  const botao = h('button', { class: 'btn btn-verde', onclick: fechar }, 'BORA!');
  const caixa = h('div', { class: 'overlay-nivel', role: 'dialog', 'aria-modal': 'true' },
    h('div', { class: 'overlay-caixa' },
      h('div', { class: 'overlay-emoji' }, nv.emoji),
      h('div', { class: 'overlay-titulo' }, 'Nível ' + nv.numero),
      h('div', { class: 'overlay-nome' }, 'Você virou ' + nv.titulo + '!'),
      botao
    )
  );
  document.addEventListener('keydown', aoTeclar);
  document.body.append(caixa);
  botao.focus();
  sons.nivel();
}

function telaLogin(aviso) {
  window.scrollTo(0, 0);
  telaAtiva = 'login';
  avisoPerfil = null;
  checarGoogle();
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
  const btnGoogle = h('button', { class: 'btn btn-google' }, iconeGoogle(), h('span', {}, 'ENTRAR COM GOOGLE'));
  btnGoogle.addEventListener('click', async () => {
    btnGoogle.disabled = true;
    msg.textContent = '';
    msg.className = 'login-msg';
    try {
      await entrarComGoogle();
    } catch (e) {
      msg.textContent = e.message;
      msg.classList.add('erro');
      btnGoogle.disabled = false;
    }
  });
  app.append(
    h('div', { class: 'login' },
      h('div', { class: 'login-logo' }, '🦜'),
      h('h1', {}, 'Entrar no GringoLingo'),
      h('div', { class: 'login-sub' }, 'Sua evolução sincronizada em qualquer dispositivo ☁️'),
      temGoogle ? btnGoogle : '',
      temGoogle ? h('div', { class: 'login-ou' }, h('span', {}, 'ou com e-mail')) : '',
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

function repintarLogin() {
  const valores = [...document.querySelectorAll('.login .entrada')].map(i => i.value);
  const aviso = document.querySelector('.login-msg.erro')?.textContent;
  telaLogin(aviso);
  [...document.querySelectorAll('.login .entrada')].forEach((i, idx) => {
    i.value = valores[idx] ?? '';
  });
}

function lerDesafio() {
  const p = new URLSearchParams(location.search);
  const bruto = p.get('desafio');
  if (!bruto) return null;
  history.replaceState(null, '', location.pathname);
  try {
    const json = decodeURIComponent(escape(atob(bruto.replace(/-/g, '+').replace(/_/g, '/'))));
    const d = JSON.parse(json);
    const unidade = UNIDADES.find(u => u.id === d.u);
    const licao = unidade?.licoes.find(l => l.id === d.l);
    if (!licao || typeof d.a !== 'number' || typeof d.t !== 'number') return null;
    return { unidade, licao, acertos: Math.max(0, Math.min(d.a, 99)), total: Math.max(1, Math.min(d.t, 99)) };
  } catch {
    return null;
  }
}

function linkDoDesafio(s, estrelas) {
  const dados = { u: s.unidade.id, l: s.licao.id, a: s.acertos, t: s.planejados };
  const json = JSON.stringify(dados);
  const b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${location.origin}${location.pathname}?desafio=${b64}`;
}

function bannerDesafio() {
  if (!desafioAtivo) return '';
  const d = desafioAtivo;
  return h('div', { class: 'card banner-desafio' },
    h('span', { class: 'revisao-emoji' }, '🎯'),
    h('div', { class: 'revisao-textos' },
      h('div', { class: 'revisao-titulo' }, 'Você foi desafiado!'),
      h('div', { class: 'revisao-sub' }, `Alguém acertou ${d.acertos} de ${d.total} em "${d.licao.titulo}". Consegue bater?`)
    ),
    h('button', {
      class: 'btn btn-verde',
      onclick() {
        const alvo = d;
        desafioAtivo = null;
        iniciarLicao(alvo.unidade, alvo.licao);
      }
    }, 'ACEITAR')
  );
}

function erroNaUrl() {
  const hash = location.hash.slice(1);
  if (!hash.includes('error')) return null;
  const p = new URLSearchParams(hash);
  const codigo = p.get('error_code') || '';
  const descricao = (p.get('error_description') || codigo || p.get('error') || '').replace(/\+/g, ' ');
  history.replaceState(null, '', location.pathname + location.search);
  if (codigo.includes('expired')) return 'Esse link de confirmação expirou — cria a conta de novo ou pede outro e-mail 📬';
  if (codigo.includes('identity') || /identit/i.test(descricao)) return 'Não deu pra vincular: ' + traduzirErro(descricao);
  if (p.get('error') === 'access_denied' && !codigo) return 'Entrada com Google cancelada — tenta de novo quando quiser 🙂';
  return 'Não deu pra entrar: ' + traduzirErro(descricao);
}

function reduzirMovimento() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function transicao(render, direcao = 'padrao') {
  if (reduzirMovimento() || !document.startViewTransition) {
    render();
    return;
  }
  document.documentElement.dataset.transicao = direcao;
  try {
    const vt = document.startViewTransition(render);
    vt.ready?.catch(() => {});
    vt.finished
      .catch(() => {})
      .finally(() => delete document.documentElement.dataset.transicao);
  } catch {
    delete document.documentElement.dataset.transicao;
    render();
  }
}

function pintarBarraDoSistema() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;
  meta.setAttribute('content', temaAtual() === 'escuro' ? '#131F24' : '#58CC02');
}

function focarTela() {
  const alvo = app.querySelector('h1, .enunciado, .logo, .nivel-titulo');
  if (!alvo) return;
  alvo.setAttribute('tabindex', '-1');
  alvo.focus({ preventScroll: true });
}

function temaAtual() {
  return document.documentElement.dataset.tema === 'escuro' ? 'escuro' : 'claro';
}

function alternarTema() {
  const novo = temaAtual() === 'escuro' ? 'claro' : 'escuro';
  const trocar = () => {
    localStorage.setItem('gringolingo:tema', novo);
    document.documentElement.dataset.tema = novo;
    pintarBarraDoSistema();
    repintarTelaAtual();
  };
  transicao(trocar, 'tema');
}

function botaoTema() {
  return h('button', {
    class: 'pilula btn-perfil',
    'aria-label': 'Alternar tema',
    title: temaAtual() === 'escuro' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro',
    onclick: alternarTema
  }, temaAtual() === 'escuro' ? '☀️' : '🌙');
}

function checarGoogle() {
  if (!nuvemConfigurada || temGoogle) return;
  googleAtivo().then(ativo => {
    if (!ativo || temGoogle) return;
    temGoogle = true;
    if (telaAtiva === 'login') repintarLogin();
    else if (telaAtiva === 'perfil') telaPerfil();
  });
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
    provedores = [];
    finalizarAuth(interativo);
    return;
  }
  provedores = (s.user.identities ?? []).map(i => i.provider);
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
  if (avisoPendente) {
    const a = avisoPendente;
    avisoPendente = null;
    if (usuarioEmail) {
      avisoPerfil = a;
      telaPerfil();
    } else {
      telaLogin(a);
    }
    return;
  }
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
  checarGoogle();
  if (temGoogle && usuarioEmail) {
    provedoresDaConta().then(p => {
      if (telaAtiva !== 'perfil') return;
      if (JSON.stringify(p) !== JSON.stringify(provedores)) {
        provedores = p;
        telaPerfil();
      }
    });
  }
  const nv = nivelInfo();
  const palavras = new Set(itensAprendidos().map(i => i.en)).size;
  const precisao = estado.stats.respostas ? Math.round(estado.stats.acertos / estado.stats.respostas * 100) : 0;
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', onclick: () => telaInicial() }, '← Voltar'),
      h('div', { class: 'espaco' }),
      botaoTema(),
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
      statPilula('🧠', estado.stats.revisoes, 'revisões turbo'),
      statPilula('🌱', memorizadas(), 'na memória longa'),
      statPilula('📅', itensVencidos().length, 'vencendo hoje'),
      statPilula('🧊', estado.protetores, 'protetores de streak')
    ),
    cartaoJornada(),
    cartaoVoz(),
    cartaoLembrete(),
    cartaoBackup(),
    cartaoCompartilhar(),
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
    cartaoConta(),
    cartaoSobre()
  );
}

function cartaoSobre() {
  const novo = localStorage.getItem('gringolingo:versao-vista') !== VERSAO_APP;
  return h('div', { class: 'card sobre-card' },
    h('div', { class: 'sobre-textos' },
      h('div', { class: 'nivel-titulo' }, '🦜 Sobre o GringoLingo'),
      h('div', { class: 'revisao-sub' }, 'Feito em JavaScript puro, sem frameworks: funciona offline, sincroniza na nuvem e é de graça.')
    ),
    h('div', { class: 'sobre-botoes' },
      h('button', {
        class: 'pilula btn-perfil' + (novo ? ' pilula-fogo' : ''),
        onclick: telaNovidades
      }, (novo ? '✨ ' : '') + 'v' + VERSAO_APP),
      h('a', { class: 'pilula btn-perfil sobre-link', href: 'https://github.com/lucasrmagalhaes/gringolingo-js', target: '_blank', rel: 'noopener noreferrer' }, '🐙 Código')
    )
  );
}

function telaNovidades() {
  window.scrollTo(0, 0);
  telaAtiva = 'novidades';
  localStorage.setItem('gringolingo:versao-vista', VERSAO_APP);
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', onclick: telaPerfil }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo' }, '✨ Novidades')
    ),
    ...NOVIDADES.map(n => h('div', { class: 'card' },
      h('div', { class: 'novidade-cab' },
        h('span', { class: 'nivel-titulo' }, n.titulo),
        h('span', { class: 'dic-tag' }, 'v' + n.versao)
      ),
      h('ul', { class: 'novidade-lista' }, n.itens.map(i => h('li', {}, i)))
    ))
  );
}

const SOTAQUES = {
  'en-US': '🇺🇸 EUA',
  'en-GB': '🇬🇧 Reino Unido',
  'en-AU': '🇦🇺 Austrália',
  'en-CA': '🇨🇦 Canadá',
  'en-IE': '🇮🇪 Irlanda',
  'en-IN': '🇮🇳 Índia',
  'en-NZ': '🇳🇿 Nova Zelândia',
  'en-ZA': '🇿🇦 África do Sul',
  'en-SG': '🇸🇬 Singapura',
  'en-PH': '🇵🇭 Filipinas',
  'en-NG': '🇳🇬 Nigéria',
  'en-KE': '🇰🇪 Quênia'
};

function rotuloSotaque(lang) {
  return SOTAQUES[lang] ?? '🌎 ' + lang.toUpperCase();
}

function nomeCurto(nome) {
  return nome
    .replace(/^(Microsoft|Google|Apple)\s+/i, '')
    .replace(/\s*[-–]\s*English.*$/i, '')
    .replace(/\s*\(English[^)]*\)/i, '')
    .replace(/\s*Online\s*/i, ' ')
    .replace(/\s+/g, ' ')
    .trim() || nome;
}

function cartaoVoz() {
  if (!temTts) return '';
  const lista = vozesDisponiveis();
  const velocidade = velocidadeAtual();
  const chipsVelocidade = h('div', { class: 'metas', role: 'group', 'aria-label': 'Velocidade da fala' },
    VELOCIDADES.map(v => h('button', {
      class: 'meta-opcao' + (v.id === velocidade.id ? ' ativa' : ''),
      'aria-pressed': v.id === velocidade.id ? 'true' : 'false',
      onclick() {
        definirVelocidade(v.id);
        falar('Hello! Let us practice English.');
        telaPerfil();
      }
    }, v.rotulo))
  );
  if (!lista.length) {
    return h('div', { class: 'card voz-card' },
      h('div', { class: 'nivel-titulo' }, '🔊 Voz do app'),
      h('div', { class: 'revisao-sub' }, 'Nenhuma voz em inglês instalada neste aparelho — a pronúncia usa a voz padrão do sistema.'),
      h('div', { class: 'voz-linha' }, h('span', { class: 'voz-rotulo' }, 'Velocidade'), chipsVelocidade)
    );
  }
  const atual = lista.find(v => v.uri === vozAtual()) ?? lista[0];
  const langs = [...new Set(lista.map(v => v.lang))].sort();
  const doSotaque = lista.filter(v => v.lang === atual.lang);
  return h('div', { class: 'card voz-card' },
    h('div', { class: 'voz-cab' },
      h('div', {},
        h('div', { class: 'nivel-titulo' }, '🔊 Voz do app'),
        h('div', { class: 'revisao-sub' }, `${rotuloSotaque(atual.lang)} · ${nomeCurto(atual.nome)}`)
      ),
      h('button', {
        class: 'btn btn-azul',
        onclick: () => falar('Hello! Let us practice English together.')
      }, '▶ TESTAR')
    ),
    langs.length > 1 ? h('div', { class: 'voz-linha' },
      h('span', { class: 'voz-rotulo' }, 'Sotaque'),
      h('div', { class: 'voz-chips' }, langs.map(lang => h('button', {
        class: 'voz-chip' + (lang === atual.lang ? ' ativa' : ''),
        'aria-pressed': lang === atual.lang ? 'true' : 'false',
        onclick() {
          const primeira = lista.find(v => v.lang === lang);
          definirVoz(primeira.uri);
          falar('Hello! Let us practice English.');
          telaPerfil();
        }
      }, rotuloSotaque(lang))))
    ) : '',
    doSotaque.length > 1 ? h('div', { class: 'voz-linha' },
      h('span', { class: 'voz-rotulo' }, 'Voz'),
      h('div', { class: 'voz-chips' }, doSotaque.map(v => h('button', {
        class: 'voz-chip' + (v.uri === atual.uri ? ' ativa' : ''),
        'aria-pressed': v.uri === atual.uri ? 'true' : 'false',
        title: v.nome,
        onclick() {
          definirVoz(v.uri);
          falar('Hello! Let us practice English.');
          telaPerfil();
        }
      }, nomeCurto(v.nome))))
    ) : '',
    h('div', { class: 'voz-linha' }, h('span', { class: 'voz-rotulo' }, 'Velocidade'), chipsVelocidade),
    linhaSom()
  );
}

function linhaSom() {
  const botao = h('button', { class: 'voz-chip' + (mudo() ? '' : ' ativa') }, mudo() ? '🔇 Sons desligados' : '🔊 Sons ligados');
  botao.addEventListener('click', () => {
    definirMudo(!mudo());
    if (!mudo()) sons.acerto();
    telaPerfil();
  });
  return h('div', { class: 'voz-linha' },
    h('span', { class: 'voz-rotulo' }, 'Efeitos'),
    h('div', { class: 'voz-chips' }, botao)
  );
}

function cartaoCompartilhar() {
  if (!estado.stats.licoes) return '';
  const msg = h('div', { class: 'revisao-sub' }, 'Gere um card com seu nível, XP e sequência');
  const botao = h('button', { class: 'btn btn-azul' }, '📤 COMPARTILHAR');
  botao.addEventListener('click', async () => {
    botao.disabled = true;
    const nv = nivelInfo();
    const ultima = BADGES.filter(b => estado.badges.includes(b.id)).at(-1);
    try {
      const r = await compartilharCard({
        nivel: nv.numero,
        titulo: nv.titulo,
        emoji: nv.emoji,
        xp: estado.xp,
        streak: streakAtual(),
        palavras: new Set(itensAprendidos().map(i => i.en)).size,
        badge: ultima
      });
      msg.textContent = r === 'baixado' ? 'Imagem baixada! É só postar 🎉' : 'Mandado! 🎉';
    } catch (e) {
      if (e?.name !== 'AbortError') msg.textContent = 'Não rolou compartilhar: ' + e.message;
    }
    botao.disabled = false;
  });
  return h('div', { class: 'card backup-card' },
    h('div', { class: 'backup-textos' },
      h('div', { class: 'nivel-titulo' }, '📤 Mostrar seu progresso'),
      msg
    ),
    botao
  );
}

function cartaoJornada() {
  if (!estado.stats.licoes) return '';
  const dias = historicoRecente(30);
  const maximo = Math.max(...dias.map(d => d.xp), estado.meta);
  const total = dias.reduce((s, d) => s + d.xp, 0);
  const ativos = dias.filter(d => d.xp > 0).length;
  const caixas = distribuicaoDeCaixas();
  const totalItens = caixas.reduce((a, b) => a + b, 0);
  const rotulos = ['Nova', '1 dia', '3 dias', '7 dias', '16+ dias'];
  return h('div', { class: 'card jornada-card' },
    h('div', { class: 'nivel-titulo' }, '📈 Sua jornada'),
    h('div', { class: 'jornada-grafico', role: 'img', 'aria-label': `XP dos últimos 30 dias, total ${total}` },
      dias.map(d => h('div', {
        class: 'jornada-barra' + (d.xp >= estado.meta ? ' bateu' : ''),
        title: `${d.data.split('-').reverse().slice(0, 2).join('/')}: ${d.xp} XP`
      }, h('div', { style: `height:${maximo ? Math.max(d.xp / maximo * 100, d.xp ? 6 : 2) : 2}%` })))
    ),
    h('div', { class: 'jornada-resumo' },
      h('span', {}, `${total} XP em 30 dias`),
      h('span', {}, `${ativos} dia${ativos === 1 ? '' : 's'} ativo${ativos === 1 ? '' : 's'}`),
      h('span', {}, `média ${Math.round(total / 30)} XP/dia`)
    ),
    totalItens ? h('div', { class: 'caixas' },
      h('div', { class: 'caixas-titulo' }, '🧠 Saúde da memória'),
      caixas.map((n, i) => h('div', { class: 'caixa-linha' },
        h('span', { class: 'caixa-rotulo' }, rotulos[i]),
        h('div', { class: 'progresso caixa-prog' }, h('div', { style: `width:${totalItens ? n / totalItens * 100 : 0}%` })),
        h('span', { class: 'caixa-num' }, String(n))
      ))
    ) : ''
  );
}

function cartaoBackup() {
  const msg = h('div', { class: 'revisao-sub' }, 'Baixe uma cópia do seu progresso ou traga de outro aparelho');
  const entrada = h('input', { type: 'file', accept: 'application/json,.json', class: 'arquivo-escondido' });
  entrada.addEventListener('change', async () => {
    const arquivo = entrada.files?.[0];
    if (!arquivo) return;
    try {
      const dados = JSON.parse(await arquivo.text());
      const r = importarEstado(dados);
      msg.textContent = `Importado! XP: ${r.antes} → ${r.depois}`;
      msg.className = 'login-msg ok';
      setTimeout(telaPerfil, 1400);
    } catch (e) {
      msg.textContent = e.message;
      msg.className = 'login-msg erro';
    }
  });
  return h('div', { class: 'card backup-card' },
    h('div', { class: 'backup-textos' },
      h('div', { class: 'nivel-titulo' }, '💾 Backup e dados'),
      msg
    ),
    h('div', { class: 'backup-botoes' },
      h('button', {
        class: 'btn btn-branco',
        onclick() {
          const blob = new Blob([JSON.stringify(exportarEstado(), null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = h('a', { href: url, download: `gringolingo-${new Date().toISOString().slice(0, 10)}.json` });
          document.body.append(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
      }, 'EXPORTAR'),
      h('button', { class: 'btn btn-branco', onclick: () => entrada.click() }, 'IMPORTAR'),
      entrada
    )
  );
}

function cartaoLembrete() {
  if (!('Notification' in window)) return '';
  const ativo = !!estado.lembrete;
  const msg = h('div', { class: 'revisao-sub' }, ativo
    ? `Aviso diário às ${estado.lembrete} enquanto o app estiver aberto`
    : 'Receba um lembrete no horário que você escolher');
  const hora = h('input', { class: 'entrada hora-input', type: 'time', value: estado.lembrete ?? '20:00' });
  const botao = h('button', { class: 'btn ' + (ativo ? 'btn-branco' : 'btn-azul') }, ativo ? 'DESLIGAR' : 'ATIVAR');
  botao.addEventListener('click', async () => {
    if (ativo) {
      estado.lembrete = null;
      salvar();
      telaPerfil();
      return;
    }
    botao.disabled = true;
    const permissao = await Notification.requestPermission();
    if (permissao !== 'granted') {
      msg.textContent = 'Permissão negada — libere as notificações do site para usar 🔕';
      botao.disabled = false;
      return;
    }
    estado.lembrete = hora.value;
    salvar();
    agendarLembrete();
    telaPerfil();
  });
  return h('div', { class: 'card lembrete-card' },
    h('div', { class: 'lembrete-textos' },
      h('div', { class: 'nivel-titulo' }, '🔔 Lembrete diário'),
      msg
    ),
    ativo ? '' : hora,
    botao
  );
}

function agendarLembrete() {
  clearTimeout(timerLembrete);
  if (!estado.lembrete || !('Notification' in window) || Notification.permission !== 'granted') return;
  const [hh, mm] = estado.lembrete.split(':').map(Number);
  const agora = new Date();
  const alvo = new Date();
  alvo.setHours(hh, mm, 0, 0);
  if (alvo <= agora) alvo.setDate(alvo.getDate() + 1);
  timerLembrete = setTimeout(() => {
    try {
      new Notification('GringoLingo 🦜', {
        body: streakEmRisco() ? 'Seu streak vence hoje! Bora salvar 🔥' : 'Hora do inglês! 5 minutinhos 💪',
        icon: 'icones/icone-192.png'
      });
    } catch {}
    agendarLembrete();
  }, alvo - agora);
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
    h('div', { class: 'conta-linha' },
      h('span', { class: 'conta-email' }, syncPendente ? '☁️⚠️ ' + usuarioEmail : '☁️ ' + usuarioEmail),
      btnSair
    ),
    syncPendente ? h('div', { class: 'conta-pendente' },
      h('span', { class: 'conta-aviso' }, '⚠️ Progresso ainda não sincronizado — ele fica salvo aqui no aparelho'),
      h('button', { class: 'btn btn-azul', onclick: () => aposLogin(true) }, 'TENTAR AGORA')
    ) : '',
    avisoPerfil ? h('div', { class: 'login-msg erro' }, avisoPerfil) : '',
    temGoogle ? linhaGoogle() : '',
    linhaApagarConta()
  );
}

function linhaApagarConta() {
  const msg = h('div', { class: 'login-msg' });
  const botao = h('button', { class: 'btn btn-branco perigo' }, 'APAGAR MINHA CONTA');
  let confirmando = false;
  botao.addEventListener('click', async () => {
    if (!confirmando) {
      confirmando = true;
      botao.textContent = 'TEM CERTEZA? TOQUE DE NOVO';
      botao.classList.add('btn-vermelho');
      msg.textContent = 'Isso apaga sua conta e todo o progresso na nuvem, sem volta. Exporte um backup antes se quiser guardar.';
      msg.className = 'login-msg erro';
      setTimeout(() => {
        if (!confirmando) return;
        confirmando = false;
        botao.textContent = 'APAGAR MINHA CONTA';
        botao.classList.remove('btn-vermelho');
        msg.textContent = '';
      }, 6000);
      return;
    }
    botao.disabled = true;
    botao.textContent = 'APAGANDO…';
    try {
      await apagarConta();
      geracaoAuth++;
      ativarSync(false);
      usuarioEmail = null;
      syncPendente = false;
      resetarEstado();
      limparLog();
      telaInicial();
    } catch (e) {
      msg.textContent = e.message;
      botao.disabled = false;
      botao.textContent = 'APAGAR MINHA CONTA';
    }
  });
  return h('div', { class: 'conta-apagar' }, msg, botao);
}

function linhaGoogle() {
  const vinculado = provedores.includes('google');
  const msg = h('div', { class: 'login-msg' });
  const btn = h('button', { class: 'btn ' + (vinculado ? 'btn-branco' : 'btn-google') },
    iconeGoogle(),
    h('span', {}, vinculado ? 'DESVINCULAR' : 'VINCULAR GOOGLE')
  );
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    msg.textContent = '';
    msg.className = 'login-msg';
    try {
      if (vinculado) {
        await desvincularGoogle();
        provedores = await provedoresDaConta();
        telaPerfil();
        return;
      }
      await vincularGoogle();
    } catch (e) {
      msg.textContent = e.message;
      msg.classList.add('erro');
      btn.disabled = false;
    }
  });
  return h('div', { class: 'conta-google' },
    h('div', { class: 'conta-google-texto' },
      h('div', { class: 'conta-google-titulo' }, vinculado ? 'Google vinculado ✅' : 'Vincular com o Google'),
      h('div', { class: 'conta-google-sub' }, vinculado
        ? 'Você pode entrar com um clique, sem digitar senha'
        : 'Depois de vincular, dá pra entrar com um clique na mesma conta')
    ),
    btn,
    msg
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

function avisarAtualizacao(registro) {
  if (document.querySelector('.aviso-versao')) return;
  const btn = h('button', {
    class: 'aviso-versao',
    onclick() {
      btn.disabled = true;
      btn.textContent = 'Atualizando…';
      registro.waiting?.postMessage('atualizar');
      setTimeout(() => location.reload(), 400);
    }
  }, '✨ Nova versão disponível — tocar para atualizar');
  document.body.append(btn);
}

function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js').then(registro => {
    if (registro.waiting && navigator.serviceWorker.controller) avisarAtualizacao(registro);
    registro.addEventListener('updatefound', () => {
      const novo = registro.installing;
      if (!novo) return;
      novo.addEventListener('statechange', () => {
        if (novo.state === 'installed' && navigator.serviceWorker.controller) avisarAtualizacao(registro);
      });
    });
  }).catch(() => {});
}

function telaDebug() {
  window.scrollTo(0, 0);
  telaAtiva = 'debug';
  const log = logSalvo();
  app.innerHTML = '';
  app.append(
    h('div', { class: 'topo' },
      h('button', { class: 'pilula btn-perfil', onclick: () => telaInicial() }, '← Voltar'),
      h('div', { class: 'espaco' }),
      h('div', { class: 'logo' }, '🐛 Diagnóstico')
    ),
    h('div', { class: 'card' },
      h('div', { class: 'nivel-titulo' }, `${log.length} erro${log.length === 1 ? '' : 's'} registrado${log.length === 1 ? '' : 's'}`),
      h('div', { class: 'revisao-sub' }, 'Compartilhe esta tela se algo quebrar. Nada é enviado automaticamente.')
    ),
    ...log.slice().reverse().map(e => h('div', { class: 'card debug-item' },
      h('div', { class: 'debug-quando' }, e.quando + ' · ' + e.origem + ' · tela ' + e.tela),
      h('div', { class: 'debug-msg' }, e.mensagem),
      h('div', { class: 'debug-pilha' }, e.pilha)
    )),
    h('div', { class: 'resultado-botoes' },
      h('button', { class: 'btn btn-vermelho', onclick: () => { limparLog(); telaDebug(); } }, 'LIMPAR LOG')
    )
  );
}

async function iniciar() {
  contextoDoLog(() => telaAtiva);
  desafioAtivo = lerDesafio();
  avisoPendente = nuvemConfigurada ? erroNaUrl() : null;
  authCarregando = nuvemConfigurada;
  if (modoDebug()) {
    telaDebug();
    return;
  }
  telaInicial();
  registrarServiceWorker();
  pintarBarraDoSistema();
  agendarLembrete();
  aoCarregarVozes(() => {
    if (telaAtiva === 'perfil') telaPerfil();
  });
  window.addEventListener('online', tentarReenviar);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tentarReenviar();
  });
  observarPendencia(pendente => {
    if (telaAtiva === 'inicial' && syncPendente !== pendente) {
      syncPendente = pendente;
      telaInicial();
    }
  });
  if (!nuvemConfigurada) return;
  checarGoogle();
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
  finalizarAuth(false);
}

iniciar();
