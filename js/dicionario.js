import { UNIDADES } from './data.js';
import { estado, hoje } from './game.js';

let bancoGeral = null;
let carregando = null;
let cursoCache = null;
const chavesCache = new WeakMap();

export function normalizarBusca(s) {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function verbetesDoCurso() {
  if (cursoCache) return cursoCache;
  const mapa = new Map();
  UNIDADES.forEach(u => u.licoes.forEach(l => l.itens.forEach(i => {
    if (mapa.has(i.en)) return;
    mapa.set(i.en, {
      en: i.en,
      pt: [i.pt],
      nota: i.nota,
      unidade: u.titulo,
      unidadeEmoji: u.emoji,
      cor: u.cor,
      licao: l.titulo,
      licaoId: l.id,
      doCurso: true
    });
  })));
  cursoCache = [...mapa.values()];
  return cursoCache;
}

export function statusDoItem(en) {
  const agenda = estado.itens[en];
  const aprendido = UNIDADES.some(u => u.licoes.some(l => estado.licoes[l.id] && l.itens.some(i => i.en === en)));
  if (!agenda) return aprendido ? { id: 'novo', emoji: '✨', texto: 'Ainda não praticada' } : { id: 'bloqueado', emoji: '🔒', texto: 'Lição ainda não liberada' };
  const dia = hoje();
  if (agenda.caixa >= 3) return { id: 'memoria', emoji: '🌱', texto: 'Na memória longa' };
  if (agenda.proxima <= dia) return { id: 'vencida', emoji: '📅', texto: 'Vencendo hoje' };
  return { id: 'agendada', emoji: '⏳', texto: 'Volta em ' + agenda.proxima.split('-').reverse().slice(0, 2).join('/') };
}

export async function carregarBanco() {
  if (bancoGeral) return bancoGeral;
  if (!carregando) {
    carregando = import('./dicionario-dados.js')
      .then(m => {
        bancoGeral = m.PALAVRAS.map(p => ({ en: p.en, pt: p.pt, classe: p.classe, doCurso: false }));
        return bancoGeral;
      })
      .catch(() => {
        // Falha de rede não pode ficar cacheada como "banco vazio" para
        // sempre: a próxima chamada tenta importar de novo.
        carregando = null;
        return [];
      });
  }
  return carregando;
}

export function bancoCarregado() {
  return bancoGeral;
}

export function totalDoCurso() {
  return verbetesDoCurso().length;
}

function chaves(verbete) {
  let c = chavesCache.get(verbete);
  if (!c) {
    c = {
      en: normalizarBusca(verbete.en),
      pt: verbete.pt.map(normalizarBusca)
    };
    chavesCache.set(verbete, c);
  }
  return c;
}

function pontuar(verbete, termo) {
  const { en, pt } = chaves(verbete);
  if (en === termo || pt.includes(termo)) return 0;
  if (en.startsWith(termo) || pt.some(p => p.startsWith(termo))) return 1;
  if (en.split(' ').some(p => p.startsWith(termo)) || pt.some(p => p.split(' ').some(x => x.startsWith(termo)))) return 2;
  if (en.includes(termo) || pt.some(p => p.includes(termo))) return 3;
  return -1;
}

function porNome(a, b) {
  return a.en.localeCompare(b.en);
}

function universo(curso, geral) {
  const doCursoEn = new Set(curso.map(v => v.en));
  return [...curso, ...geral.filter(v => !doCursoEn.has(v.en))];
}

function aplicarFiltro(lista, filtro) {
  if (filtro === 'curso') return lista.filter(v => v.doCurso);
  if (filtro === 'aprendidas') return lista.filter(v => v.doCurso && ['memoria', 'agendada', 'vencida'].includes(statusDoItem(v.en).id));
  if (filtro === 'revisar') return lista.filter(v => v.doCurso && ['vencida', 'novo'].includes(statusDoItem(v.en).id));
  return lista;
}

export function buscar(texto, filtro = 'todas', limite = 60) {
  const termo = normalizarBusca(texto);
  const curso = verbetesDoCurso();
  const geral = bancoGeral ?? [];
  if (!termo && filtro === 'todas') {
    const cursoOrd = curso.slice().sort(porNome);
    if (cursoOrd.length >= limite) return cursoOrd.slice(0, limite);
    const doCursoEn = new Set(curso.map(v => v.en));
    const resto = geral.filter(v => !doCursoEn.has(v.en)).sort(porNome);
    return [...cursoOrd, ...resto].slice(0, limite);
  }
  const base = filtro === 'todas' ? universo(curso, geral) : curso;
  const filtrados = aplicarFiltro(base, filtro);
  if (!termo) {
    return filtrados
      .slice()
      .sort((a, b) => (a.doCurso === b.doCurso ? porNome(a, b) : a.doCurso ? -1 : 1))
      .slice(0, limite);
  }
  return filtrados
    .map(v => ({ v, p: pontuar(v, termo) }))
    .filter(x => x.p >= 0)
    .sort((a, b) => (a.p !== b.p ? a.p - b.p : a.v.doCurso === b.v.doCurso ? a.v.en.length - b.v.en.length : a.v.doCurso ? -1 : 1))
    .slice(0, limite)
    .map(x => x.v);
}
