import { UNIDADES } from './data.js';
import { estado } from './game.js';

let bancoGeral = null;
let carregando = null;

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
  return [...mapa.values()];
}

export function statusDoItem(en) {
  const agenda = estado.itens[en];
  const aprendido = UNIDADES.some(u => u.licoes.some(l => estado.licoes[l.id] && l.itens.some(i => i.en === en)));
  if (!agenda) return aprendido ? { id: 'novo', emoji: '✨', texto: 'Ainda não praticada' } : { id: 'bloqueado', emoji: '🔒', texto: 'Lição ainda não liberada' };
  const hoje = new Date().toISOString().slice(0, 10);
  if (agenda.caixa >= 3) return { id: 'memoria', emoji: '🌱', texto: 'Na memória longa' };
  if (agenda.proxima <= hoje) return { id: 'vencida', emoji: '📅', texto: 'Vencendo hoje' };
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
        bancoGeral = [];
        return bancoGeral;
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

function pontuar(verbete, termo) {
  const en = normalizarBusca(verbete.en);
  const pts = verbete.pt.map(normalizarBusca);
  if (en === termo || pts.includes(termo)) return 0;
  if (en.startsWith(termo) || pts.some(p => p.startsWith(termo))) return 1;
  if (en.split(' ').some(p => p.startsWith(termo)) || pts.some(p => p.split(' ').some(x => x.startsWith(termo)))) return 2;
  if (en.includes(termo) || pts.some(p => p.includes(termo))) return 3;
  return -1;
}

export function buscar(texto, filtro = 'todas', limite = 60) {
  const termo = normalizarBusca(texto);
  const curso = verbetesDoCurso();
  const geral = bancoGeral ?? [];
  const doCursoEn = new Set(curso.map(v => v.en));
  const universo = [...curso, ...geral.filter(v => !doCursoEn.has(v.en))];
  const filtrados = universo.filter(v => {
    if (filtro === 'curso') return v.doCurso;
    if (filtro === 'aprendidas') return v.doCurso && ['memoria', 'agendada', 'vencida'].includes(statusDoItem(v.en).id);
    if (filtro === 'revisar') return v.doCurso && ['vencida', 'novo'].includes(statusDoItem(v.en).id);
    return true;
  });
  if (!termo) {
    return filtrados
      .slice()
      .sort((a, b) => (a.doCurso === b.doCurso ? a.en.localeCompare(b.en) : a.doCurso ? -1 : 1))
      .slice(0, limite);
  }
  return filtrados
    .map(v => ({ v, p: pontuar(v, termo) }))
    .filter(x => x.p >= 0)
    .sort((a, b) => (a.p !== b.p ? a.p - b.p : a.v.doCurso === b.v.doCurso ? a.v.en.length - b.v.en.length : a.v.doCurso ? -1 : 1))
    .slice(0, limite)
    .map(x => x.v);
}
