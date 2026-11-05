import { UNIDADES, NIVEIS, BADGES, MISSOES } from './data.js';
import { enviarProgresso, baixarProgresso } from './nuvem.js';
import { IDS_CINCO, apagarPapo } from './conversa.js';
import { FRASES, itemDaFrase } from './frases.js';
import { nivelValido, rankNivel, diasDaSemana } from './fluencia.js';
import { contarFaladas } from './opiniao.js';
import { frasesDoDesafio } from './vaga.js';
import { grupoDoTipo, segundosDaFala, somarSemana, GRUPOS, METAS_MINUTOS } from './semana.js';
import { TREINOS } from './hub.js';
import { treinoDoDia } from './facil.js';

const CHAVE = 'gringolingo';
const CHAVE_CONTA = 'gringolingo:conta';
let syncAtivo = false;

export const INTERVALOS = [1, 3, 7, 16, 35];

// Versão do formato enviado à nuvem: um cliente antigo não mescla payload de versão maior.
// 3: deslizes (contagem por palavra) e padroes (contagem por tipo de erro do tutor).
export const VERSAO_DADOS = 3;

// Relógio injetável (testes fixam o "agora"); o dia do app é o dia LOCAL do aparelho,
// nunca UTC. Senão o streak e as missões viram às 21h no Brasil.
let agoraFn = () => new Date();

export function definirAgora(fn) {
  agoraFn = fn ?? (() => new Date());
}

const dia = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export function hoje() {
  return dia(agoraFn());
}

function instanteLocal(data) {
  const d = data instanceof Date && !Number.isNaN(data.getTime()) ? data : agoraFn();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function diasDeDistancia(n) {
  const d = agoraFn();
  d.setDate(d.getDate() + n);
  return dia(d);
}

function diaAnterior(d) {
  const dt = new Date(d + 'T00:00:00');
  dt.setDate(dt.getDate() - 1);
  return dia(dt);
}

const padrao = () => ({
  xp: 0,
  streak: 0,
  ultimoDia: null,
  atualizadoEm: 0,
  licoes: {},
  itens: {},
  erros: [],
  deslizes: [],
  padroes: [],
  badges: [],
  historico: {},
  favoritas: [],
  meta: 100,
  protetores: 1,
  protetoresGanhos: 1,
  protetoresGastos: 0,
  missoes: null,
  lembrete: null,
  conversas: {},
  falaDia: null,
  painel: {},
  errosFala: [],
  nivelFala: null,
  perguntaDia: null,
  trilhaInicio: null,
  agendaFala: {},
  metaFala: 3,
  metaFalaSemana: null,
  metaMinutos: 10,
  notasFoco: [],
  diaDesafio: null,
  sequenciaDesafio: 0,
  recordeDesafio: 0,
  surpresaDia: null,
  surpresaStreak: 0,
  recordeSurpresa: 0,
  surpresaArmada: '',
  surpresaArmadaDia: null,
  estrelas: [],
  treinoAberto: '',
  ordemHub: 'catalogo',
  stats: { licoes: 0, acertos: 0, respostas: 0, comboMax: 0, revisoes: 0, perfeitas: 0, recordeRelampago: 0, metasBatidas: 0, escutas: 0, recordeEscuta: 0, dialogos: 0, sombra: 0, recordeSombra: 0, falas: 0, ramos: 0, pronuncias: 0, ouvidos: 0, perguntas: 0, reduzidas: 0, verbosFala: 0, livres: 0, tecnicos: 0, idiomas: 0, diasPergunta: 0, revisoesFala: 0, entrevistas: 0, contos: 0, numeros: 0, opinioes: 0, cenasFala: 0, rapidos: 0, metasFala: 0, relatos: 0, cortesias: 0, aquecimentos: 0, esclarecimentos: 0, demos: 0, negociacoes: 0, stars: 0, enfases: 0, decisoes: 0, pares: 0, incidentes: 0, retros: 0, chegadas: 0, ligacoes: 0, estimativas: 0, consensos: 0, atendimentos: 0, gestores: 0, finais: 0, viagens: 0, misturas: 0, linhas: 0, slacks: 0, sociais: 0, termos: 0, salarios: 0, projetos: 0, sotaques: 0, desafios: 0, requisitos: 0, metricas: 0, aprendizados: 0, passeios: 0, falhas: 0, mentorias: 0, socorros: 0, palestras: 0, duvidas: 0, sinais: 0, sistemas: 0, codigos: 0, colegas: 0, simulados: 0, modelos: 0, furos: 0, rotinas: 0, papos: 0, futuros: 0, culturas: 0, aumentos: 0, rotas: 0, vivos: 0, produtos: 0, fechos: 0, espacos: 0, mapas: 0, duros: 0, propostas: 0, narras: 0, bancos: 0, recusas: 0, sprints: 0, seguros: 0, meetups: 0, completas: 0, rodadas: 0, migras: 0, estreias: 0, focos: 0, pokers: 0, leigos: 0, recrutas: 0, culpas: 0, raios: 0, ofertas: 0, pedidos: 0, coberturas: 0, looms: 0, cadernos: 0, graficos: 0, handoffs: 0, elevadores: 0, juntas: 0, pistas: 0, calmas: 0, folgas: 0, abertas: 0, respeitos: 0, debitos: 0, indicacoes: 0, uxs: 0, foruns: 0, vistos: 0, meses: 0, facils: 0, stacks: 0, sabados: 0, surpresas: 0, brechas: 0, mudas: 0, gauchos: 0, radares: 0, aplausos: 0, gripes: 0, pms: 0, laudos: 0, rumos: 0, acessos: 0, licencas: 0, jargoes: 0, bandeiras: 0, gelos: 0, limites: 0, canarios: 0, despedidas: 0, repeticoes: 0, cargas: 0, boletins: 0, donos: 0, manuais: 0, verdes: 0, certificados: 0, rebases: 0, consultas: 0, replicas: 0, ensaios: 0, discos: 0, paginas: 0, squashes: 0, circuitos: 0, jobs: 0, colheitas: 0, sessoes: 0, tanques: 0, sondas: 0, sementes: 0, registros: 0, rastros: 0, paradas: 0, pods: 0, lints: 0, origens: 0, links: 0, cpus: 0, copias: 0, estouros: 0, impasses: 0, dominios: 0, mortas: 0, ponteiros: 0, eleicoes: 0, freios: 0, pausas: 0, derivas: 0, descritores: 0, reservas: 0, varreduras: 0, portas: 0, inodos: 0, saidas: 0, manadas: 0, gotejos: 0, frios: 0, cadeados: 0, cotas: 0, ciclos: 0, zumbis: 0, cisoes: 0, rajadas: 0, brasas: 0, datagramas: 0, passes: 0, carimbos: 0, pilhas: 0, canos: 0, giros: 0, compactas: 0, diarios: 0, vagoes: 0, corridas: 0, indices: 0, percentis: 0, segredos: 0, fantasmas: 0, inteiros: 0, filtros: 0, ordens: 0, provas: 0, orfaos: 0, acenos: 0, gastos: 0, instaveis: 0, duplicados: 0, apagoes: 0, replays: 0, ecos: 0, leques: 0, sagas: 0, caixas: 0, apagados: 0, esperas: 0, cursores: 0, filas: 0, disjuntores: 0, alugueis: 0, pulsos: 0, piscinas: 0, baldes: 0, cercas: 0, tremores: 0, portarias: 0, colas: 0, anteparos: 0, descartes: 0, cronometros: 0, amostras: 0, nichos: 0, lacres: 0, semaforos: 0, barreiras: 0, trincos: 0, recuos: 0, vigias: 0, ampulhetas: 0, caronas: 0, venenos: 0, farois: 0, ancoras: 0, malhas: 0, fendas: 0, cofres: 0, audiencias: 0, revogacoes: 0, quoruns: 0, maiorias: 0, arbitros: 0, lideres: 0, mandatos: 0, seguidores: 0, orquestradores: 0, coreografias: 0, compensacoes: 0, primarios: 0, espelhos: 0, ascensoes: 0, travessias: 0, retaguardas: 0, contornos: 0, rumores: 0, reparos: 0, deixas: 0, flocos: 0, epocas: 0, vetores: 0, sujeiras: 0, instantaneos: 0, seriais: 0, fomes: 0, inversoes: 0, idades: 0, sidecars: 0, embaixadores: 0, adaptadores: 0, bizantinos: 0, particoes: 0, generais: 0, wals: 0, lsns: 0, checkpoints: 0, nonces: 0, hmacs: 0, envelopes: 0, leases: 0, renovacoes: 0, vencimentos: 0, outboxes: 0, inboxes: 0, relays: 0, offsets: 0, lags: 0, acks: 0, snapshots: 0, restores: 0, promotes: 0, blooms: 0, cucos: 0, esbocos: 0, merkles: 0, radixes: 0, tries: 0, gossips: 0, phis: 0, accruals: 0, hints: 0, vacuums: 0, freezes: 0, bitmaps: 0, roarings: 0, hypers: 0, crdts: 0, lwws: 0, orsets: 0, vectors: 0, dots: 0, causals: 0, shards: 0, rebalances: 0, splits: 0, watermarks: 0, barriers: 0, aligns: 0, witnesses: 0, voters: 0, learners: 0, checksums: 0, bulkheads: 0, fallbacks: 0, tombstones: 0, purges: 0, reclaims: 0, journals: 0, segments: 0, spills: 0, stripes: 0, parities: 0, rebuilds: 0, epochs: 0, ballots: 0, fences: 0, flushes: 0, memtables: 0, extents: 0, manifests: 0, hedges: 0, debounces: 0, sstables: 0, latches: 0, throttles: 0, iterators: 0, pagers: 0, evicts: 0, histograms: 0, gauges: 0, backfills: 0, skews: 0, hotspots: 0, tails: 0, slos: 0, slis: 0, probes: 0, traces: 0, scrapes: 0, rollups: 0, webhooks: 0, fanouts: 0, ingests: 0, otels: 0, samplers: 0, exemplars: 0, egresses: 0, gateways: 0, failovers: 0, oncalls: 0, severities: 0, incidents: 0 }
});

export const METAS = [50, 100, 200, 350];
export const METAS_FALA = [2, 3, 5, 7];

const num = v => (Number.isFinite(Number(v)) ? Number(v) : 0);
const chaveSegura = k => k !== '__proto__' && k !== 'constructor' && k !== 'prototype';
const diaIso = v => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);

function limparEstrelas(lista) {
  if (!Array.isArray(lista)) return [];
  const ids = new Set(TREINOS.map(t => t.id));
  const vistos = new Set();
  const saida = [];
  for (const item of lista) {
    const id = typeof item === 'string' ? item : '';
    if (!id || id.length > 40 || !chaveSegura(id) || !ids.has(id) || vistos.has(id)) continue;
    vistos.add(id);
    saida.push(id);
    if (saida.length >= 80) break;
  }
  return saida;
}

function deslizeLimpo(d) {
  if (!d || typeof d !== 'object') return null;
  if (typeof d.en !== 'string' || !d.en || d.en.length > 200 || !chaveSegura(d.en)) return null;
  const erros = Math.max(0, Math.min(num(d.erros), 999));
  const acertos = Math.max(0, Math.min(num(d.acertos), 999));
  if (!erros && !acertos) return null;
  return {
    en: d.en,
    pt: typeof d.pt === 'string' ? d.pt.slice(0, 200) : '',
    chave: typeof d.chave === 'string' && d.chave ? d.chave.slice(0, 48) : 'troca',
    tipo: typeof d.tipo === 'string' && d.tipo ? d.tipo.slice(0, 24) : 'troca',
    erros,
    acertos
  };
}

function padraoLimpo(p) {
  if (!p || typeof p !== 'object') return null;
  if (typeof p.chave !== 'string' || !p.chave || p.chave.length > 48 || !chaveSegura(p.chave)) return null;
  const n = Math.max(0, Math.min(num(p.n), 9999));
  if (!n) return null;
  return {
    chave: p.chave,
    tipo: typeof p.tipo === 'string' && p.tipo ? p.tipo.slice(0, 24) : 'troca',
    n
  };
}

function dedupDeslizes(lista) {
  const map = new Map();
  for (const d of lista) {
    const atual = map.get(d.en);
    if (!atual) map.set(d.en, { ...d });
    else {
      if (d.erros > atual.erros) {
        atual.chave = d.chave;
        atual.tipo = d.tipo;
        if (d.pt) atual.pt = d.pt;
      }
      atual.erros = Math.max(atual.erros, d.erros);
      atual.acertos = Math.max(atual.acertos, d.acertos);
    }
  }
  return [...map.values()]
    .sort((a, b) => (b.erros - b.acertos) - (a.erros - a.acertos) || a.en.localeCompare(b.en))
    .slice(0, 80);
}

function limparGrupos(bruto) {
  const saida = {};
  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) return saida;
  for (const id of GRUPOS) {
    const n = Math.max(0, Math.min(num(bruto[id]), 9999));
    if (n) saida[id] = n;
  }
  return saida;
}

function diaDoPainel(v) {
  const grupos = limparGrupos(v?.grupos);
  const dia = {
    soma: Math.max(0, Math.min(num(v?.soma), 100000)),
    n: Math.max(0, Math.min(num(v?.n), 9999)),
    acertos: Math.max(0, Math.min(num(v?.acertos), 9999)),
    respostas: Math.max(0, Math.min(num(v?.respostas), 9999))
  };
  const segundos = Math.max(0, Math.min(num(v?.segundos), 200000));
  if (segundos) dia.segundos = segundos;
  const muletas = Math.max(0, Math.min(num(v?.muletas), 200000));
  if (muletas) dia.muletas = muletas;
  if (Object.keys(grupos).length) dia.grupos = grupos;
  return dia;
}

function unirDiaPainel(a, b) {
  if (!a) return b;
  if (!b) return a;
  const remotoGanha = b.n > a.n || (b.n === a.n && b.soma > a.soma);
  const base = diaDoPainel(remotoGanha ? b : a);
  const segundos = Math.max(num(a.segundos), num(b.segundos));
  if (segundos) base.segundos = Math.min(segundos, 200000);
  const muletas = Math.max(num(a.muletas), num(b.muletas));
  if (muletas) base.muletas = Math.min(muletas, 200000);
  else delete base.muletas;
  const grupos = {};
  for (const id of GRUPOS) {
    const n = Math.max(num(a.grupos?.[id]), num(b.grupos?.[id]));
    if (n) grupos[id] = Math.min(n, 9999);
  }
  if (Object.keys(grupos).length) base.grupos = grupos;
  else delete base.grupos;
  return base;
}

function limparPainel(bruto) {
  const saida = {};
  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) return saida;
  for (const [dia, v] of Object.entries(bruto)) {
    if (!diaIso(dia) || !v || typeof v !== 'object') continue;
    saida[dia] = diaDoPainel(v);
  }
  return Object.fromEntries(Object.entries(saida).sort(([a], [b]) => a < b ? -1 : 1).slice(-90));
}

function limparErrosFala(bruto) {
  if (!Array.isArray(bruto)) return [];
  const map = new Map();
  for (const item of bruto) {
    if (!item || typeof item.en !== 'string' || !item.en || item.en.length > 120 || !chaveSegura(item.en)) continue;
    const n = Math.max(0, Math.min(num(item.n), 9999));
    if (!n) continue;
    const atual = map.get(item.en);
    if (!atual || n > atual.n) {
      map.set(item.en, {
        en: item.en,
        pt: typeof item.pt === 'string' ? item.pt.slice(0, 120) : (atual?.pt || ''),
        n
      });
    } else if (atual && !atual.pt && typeof item.pt === 'string') {
      atual.pt = item.pt.slice(0, 120);
    }
  }
  return [...map.values()].sort((a, b) => b.n - a.n || a.en.localeCompare(b.en)).slice(0, 40);
}

function limparAgendaFala(bruto) {
  const saida = {};
  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) return saida;
  for (const [en, v] of Object.entries(bruto)) {
    if (typeof en !== 'string' || !chaveSegura(en) || en.length > 120 || en.length < 3) continue;
    if (!v || typeof v !== 'object') continue;
    const proxima = diaIso(v.proxima);
    if (!proxima) continue;
    saida[en] = {
      caixa: Math.max(0, Math.min(num(v.caixa), INTERVALOS.length - 1)),
      proxima,
      pt: typeof v.pt === 'string' ? v.pt.slice(0, 120) : ''
    };
  }
  return Object.fromEntries(
    Object.entries(saida)
      .sort((a, b) => (a[1].proxima < b[1].proxima ? -1 : a[1].proxima > b[1].proxima ? 1 : a[0].localeCompare(b[0])))
      .slice(0, 40)
  );
}

function limparConversas(bruto) {
  const saida = {};
  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) return saida;
  for (const [id, v] of Object.entries(bruto)) {
    if (!chaveSegura(id) || id.length > 40) continue;
    if (!v || typeof v !== 'object') continue;
    saida[id] = {
      vezes: Math.max(0, Math.min(num(v.vezes), 9999)),
      melhor: Math.max(0, Math.min(num(v.melhor), 100))
    };
  }
  return saida;
}

function dedupPadroes(lista) {
  const map = new Map();
  for (const p of lista) {
    const atual = map.get(p.chave);
    if (!atual || p.n > atual.n) map.set(p.chave, { ...p });
  }
  return [...map.values()].sort((a, b) => b.n - a.n || a.chave.localeCompare(b.chave)).slice(0, 24);
}

function mesclarDeslizes(remoto) {
  const juntos = [...estado.deslizes];
  (Array.isArray(remoto) ? remoto : []).forEach(bruto => {
    const d = deslizeLimpo(bruto);
    if (d) juntos.push(d);
  });
  estado.deslizes = dedupDeslizes(juntos);
}

function mesclarPadroes(remoto) {
  const juntos = [...estado.padroes];
  (Array.isArray(remoto) ? remoto : []).forEach(bruto => {
    const p = padraoLimpo(bruto);
    if (p) juntos.push(p);
  });
  estado.padroes = dedupPadroes(juntos);
}

function aplicarDeslizes(eventos, agendamentos) {
  const errouAgora = new Set();
  (eventos ?? []).forEach(ev => {
    if (!ev || typeof ev.en !== 'string' || !ev.en || ev.ok) return;
    const chave = typeof ev.chave === 'string' && ev.chave ? ev.chave : 'troca';
    const tipo = typeof ev.tipo === 'string' && ev.tipo ? ev.tipo : 'troca';
    let row = estado.deslizes.find(d => d.en === ev.en);
    if (!row) {
      row = { en: ev.en, pt: '', chave, tipo, erros: 0, acertos: 0 };
      estado.deslizes.push(row);
    }
    row.erros += 1;
    row.chave = chave;
    row.tipo = tipo;
    if (typeof ev.pt === 'string' && ev.pt) row.pt = ev.pt;
    errouAgora.add(ev.en);
    let pad = estado.padroes.find(p => p.chave === chave);
    if (!pad) {
      pad = { chave, tipo, n: 0 };
      estado.padroes.push(pad);
    }
    pad.n += 1;
    pad.tipo = tipo;
  });
  (agendamentos ?? []).forEach(r => {
    if (!r?.acertou || typeof r.en !== 'string' || errouAgora.has(r.en)) return;
    const row = estado.deslizes.find(d => d.en === r.en);
    if (row && row.acertos < row.erros) row.acertos += 1;
  });
  estado.deslizes = dedupDeslizes(estado.deslizes);
  estado.padroes = dedupPadroes(estado.padroes);
}

// Uma lição perfeita rende ~165 XP, então as metas antigas (20-80) eram batidas
// com uma lição só; os valores migram para a escala nova mantendo a intenção.
const METAS_ANTIGAS = { 20: 50, 30: 100, 50: 200, 80: 350 };
const FOCOS_NOTA = ['frontend', 'backend', 'ia'];
const TETO_NOTAS_FOCO = 8;

function notaFocoLimpa(item) {
  if (!item || typeof item !== 'object') return null;
  if (!FOCOS_NOTA.includes(item.foco)) return null;
  if (typeof item.dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.dia)) return null;
  const nota = num(item.nota);
  if (!Number.isFinite(nota) || nota < 0 || nota > 100) return null;
  return { dia: item.dia, foco: item.foco, nota: Math.round(nota) };
}

export function limparNotasFoco(lista) {
  if (!Array.isArray(lista)) return [];
  const porChave = new Map();
  for (const item of lista) {
    const limpo = notaFocoLimpa(item);
    if (!limpo) continue;
    const chave = `${limpo.dia}:${limpo.foco}`;
    const anterior = porChave.get(chave);
    if (!anterior || limpo.nota > anterior.nota) porChave.set(chave, limpo);
  }
  return [...porChave.values()]
    .sort((a, b) => b.dia.localeCompare(a.dia) || a.foco.localeCompare(b.foco))
    .slice(0, TETO_NOTAS_FOCO);
}

function anotarFoco(dia, foco, nota) {
  estado.notasFoco = limparNotasFoco([...(estado.notasFoco || []), { dia, foco, nota }]);
}

function sanitizar(salvo) {
  const base = padrao();
  const s = { ...base, ...salvo };
  s.xp = num(s.xp);
  s.atualizadoEm = Math.max(0, Math.floor(num(s.atualizadoEm)));
  s.streak = num(s.streak);
  s.ultimoDia = typeof s.ultimoDia === 'string' ? s.ultimoDia : null;
  s.licoes = s.licoes && typeof s.licoes === 'object' && !Array.isArray(s.licoes) ? { ...s.licoes } : {};
  s.itens = s.itens && typeof s.itens === 'object' && !Array.isArray(s.itens) ? { ...s.itens } : {};
  s.erros = Array.isArray(s.erros) ? s.erros.filter(e => e && typeof e.en === 'string') : [];
  s.deslizes = dedupDeslizes(Array.isArray(s.deslizes) ? s.deslizes.map(deslizeLimpo).filter(Boolean) : []);
  s.padroes = dedupPadroes(Array.isArray(s.padroes) ? s.padroes.map(padraoLimpo).filter(Boolean) : []);
  s.badges = Array.isArray(s.badges) ? s.badges.filter(b => typeof b === 'string') : [];
  s.historico = s.historico && typeof s.historico === 'object' && !Array.isArray(s.historico) ? { ...s.historico } : {};
  s.favoritas = Array.isArray(s.favoritas) ? s.favoritas.filter(f => f && typeof f.en === 'string') : [];
  s.meta = METAS.includes(num(s.meta)) ? num(s.meta) : METAS_ANTIGAS[num(s.meta)] ?? base.meta;
  s.protetores = Math.max(0, Math.min(num(s.protetores), 2));
  s.protetoresGanhos = salvo?.protetoresGanhos != null ? num(s.protetoresGanhos) : Math.max(s.protetores, 1);
  s.protetoresGastos = num(s.protetoresGastos);
  s.missoes = s.missoes && typeof s.missoes === 'object' && typeof s.missoes.dia === 'string' && Array.isArray(s.missoes.progresso) ? s.missoes : null;
  s.conversas = limparConversas(s.conversas);
  s.falaDia = diaIso(s.falaDia);
  s.painel = limparPainel(s.painel);
  s.errosFala = limparErrosFala(s.errosFala);
  s.nivelFala = nivelValido(s.nivelFala);
  s.perguntaDia = diaIso(s.perguntaDia);
  s.trilhaInicio = diaIso(s.trilhaInicio);
  s.agendaFala = limparAgendaFala(s.agendaFala);
  s.metaFala = METAS_FALA.includes(num(s.metaFala)) ? num(s.metaFala) : 3;
  s.metaFalaSemana = diaIso(s.metaFalaSemana);
  s.metaMinutos = METAS_MINUTOS.includes(num(s.metaMinutos)) ? num(s.metaMinutos) : 10;
  s.notasFoco = limparNotasFoco(s.notasFoco);
  s.diaDesafio = diaIso(s.diaDesafio);
  s.sequenciaDesafio = Math.max(0, num(s.sequenciaDesafio));
  s.recordeDesafio = Math.max(s.sequenciaDesafio, num(s.recordeDesafio));
  s.surpresaDia = diaIso(s.surpresaDia);
  s.surpresaStreak = Math.max(0, Math.min(num(s.surpresaStreak), 9999));
  s.recordeSurpresa = Math.max(s.surpresaStreak, Math.min(num(s.recordeSurpresa), 9999));
  s.surpresaArmadaDia = diaIso(s.surpresaArmadaDia);
  s.surpresaArmada = typeof s.surpresaArmada === 'string' && s.surpresaArmada.length <= 40 && chaveSegura(s.surpresaArmada) ? s.surpresaArmada : '';
  if (!s.surpresaArmadaDia) s.surpresaArmada = '';
  s.estrelas = limparEstrelas(s.estrelas);
  s.treinoAberto = typeof s.treinoAberto === 'string' && TREINOS.some(t => t.id === s.treinoAberto) ? s.treinoAberto : '';
  s.ordemHub = s.ordemHub === 'menos' ? 'menos' : 'catalogo';
  s.stats = { ...base.stats, ...(s.stats && typeof s.stats === 'object' ? s.stats : {}) };
  for (const k of Object.keys(s.stats)) s.stats[k] = num(s.stats[k]);
  if (salvo?.stats?.metasBatidas == null) {
    s.stats.metasBatidas = Object.values(s.historico).filter(xp => num(xp) >= s.meta).length;
  }
  return s;
}

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (!salvo || typeof salvo !== 'object') return padrao();
    return sanitizar(salvo);
  } catch {
    return padrao();
  }
}

export const estado = carregar();

const CHAVE_PENDENTE = 'gringolingo:pendente';
const CHAVE_FILA = 'gringolingo:fila';
const TETO_FILA = 40;
let enviando = false;
let reenviar = false;
let aoMudarPendencia = null;
let falhasSeguidas = 0;
let proximaTentativa = 0;
let timerEnvio = null;
let transporte = { enviar: enviarProgresso, baixar: baixarProgresso };

export function definirTransporteSync(parcial) {
  transporte = {
    enviar: parcial?.enviar || enviarProgresso,
    baixar: parcial?.baixar || baixarProgresso
  };
}

export function observarPendencia(cb) {
  aoMudarPendencia = cb;
}

export function temPendencia() {
  return localStorage.getItem(CHAVE_PENDENTE) !== null;
}

// 'grande' = o payload viola a constraint do banco; reenviar nunca vai resolver.
export function motivoPendencia() {
  return localStorage.getItem(CHAVE_PENDENTE);
}

function marcarPendencia(valor) {
  try {
    if (valor) localStorage.setItem(CHAVE_PENDENTE, valor === true ? '1' : valor);
    else localStorage.removeItem(CHAVE_PENDENTE);
  } catch {}
  aoMudarPendencia?.(!!valor);
}

function lerFila() {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE_FILA) || 'null');
    if (!Array.isArray(bruto)) return [];
    return bruto.filter(item => item && typeof item === 'object' && Number.isFinite(num(item.em)));
  } catch {
    return [];
  }
}

function gravarFila(fila) {
  try {
    if (!fila.length) localStorage.removeItem(CHAVE_FILA);
    else localStorage.setItem(CHAVE_FILA, JSON.stringify(fila.slice(-TETO_FILA)));
  } catch {}
}

function limparFila() {
  gravarFila([]);
}

export function filaPendente() {
  return lerFila().map(item => ({ ...item }));
}

function pisoDaFila() {
  let xp = 0;
  let streak = 0;
  let ultimoDia = '';
  for (const item of lerFila()) {
    xp = Math.max(xp, num(item.xp));
    const diaItem = typeof item.ultimoDia === 'string' ? item.ultimoDia : '';
    if (diaItem > ultimoDia) {
      ultimoDia = diaItem;
      streak = num(item.streak);
    } else if (diaItem && diaItem === ultimoDia) {
      streak = Math.max(streak, num(item.streak));
    }
  }
  return { xp, streak, ultimoDia };
}

export function enfileirarMudanca() {
  const fila = lerFila();
  const item = {
    em: num(estado.atualizadoEm) || agoraFn().getTime(),
    xp: num(estado.xp),
    streak: num(estado.streak),
    ultimoDia: estado.ultimoDia || ''
  };
  const ultimo = fila[fila.length - 1];
  if (!ultimo || ultimo.em !== item.em || ultimo.xp !== item.xp || ultimo.streak !== item.streak || ultimo.ultimoDia !== item.ultimoDia) {
    fila.push(item);
    gravarFila(fila);
  }
  const motivo = motivoPendencia();
  if (motivo !== 'versao' && motivo !== 'grande') marcarPendencia('1');
  return filaPendente();
}

export function statusDaSync({ online = true } = {}) {
  if (!online) return 'offline';
  if (lerFila().length || motivoPendencia()) return 'pendente';
  return 'sincronizado';
}

function redeLigada() {
  return typeof navigator === 'undefined' || navigator.onLine !== false;
}

// O que sobe para a nuvem: o estado com o histórico podado (o merge por dia
// preserva o resto em cada aparelho) e a etiqueta de versão do formato.
function payloadNuvem() {
  const historico = {};
  const limite = diasDeDistancia(-180);
  for (const [d, xp] of Object.entries(estado.historico)) {
    if (d >= limite) historico[d] = xp;
  }
  return { ...estado, historico, erros: estado.erros.slice(-200), versaoDados: VERSAO_DADOS };
}

async function subirEstado() {
  if (!syncAtivo) return;
  if (enviando) {
    reenviar = true;
    return;
  }
  if (!redeLigada()) {
    enfileirarMudanca();
    return;
  }
  if (Date.now() < proximaTentativa) return;
  enviando = true;
  try {
    const motivo = motivoPendencia();
    if (motivo === '1' || motivo === 'versao' || lerFila().length) {
      // Havia pendência: outro aparelho pode ter subido progresso nesse meio
      // tempo. Mesclar antes de enviar, senão o reenvio apaga o que ele fez.
      let confirmado = false;
      try {
        const remoto = await transporte.baixar();
        if (remoto && typeof remoto === 'object' && !Array.isArray(remoto)) {
          if (num(remoto.versaoDados) > VERSAO_DADOS) {
            marcarPendencia('versao');
            return;
          }
          mesclar(remoto);
          try {
            localStorage.setItem(CHAVE, JSON.stringify(estado));
          } catch {}
        }
        confirmado = true;
      } catch {}
      // Pendência de versão: sem CONFIRMAR que a nuvem voltou a ser compatível,
      // nenhum envio acontece. Subir aqui apagaria os dados do app mais novo.
      if (motivo === 'versao' && !confirmado) return;
    }
    await transporte.enviar(payloadNuvem());
    falhasSeguidas = 0;
    proximaTentativa = 0;
    limparFila();
    marcarPendencia(false);
  } catch (e) {
    if (e?.permanente) {
      marcarPendencia('grande');
    } else {
      falhasSeguidas++;
      proximaTentativa = Date.now() + Math.min(2000 * 2 ** (falhasSeguidas - 1), 300000);
      marcarPendencia('1');
    }
  } finally {
    enviando = false;
    if (reenviar) {
      reenviar = false;
      subirEstado();
    }
  }
}

export function tentarReenviar() {
  if (!syncAtivo) return;
  if (motivoPendencia() === 'versao' || motivoPendencia() === 'grande') return;
  if (!redeLigada()) {
    enfileirarMudanca();
    return;
  }
  if (motivoPendencia() === '1' || lerFila().length) return subirEstado();
}

export function salvar() {
  estado.atualizadoEm = Math.max(num(estado.atualizadoEm), agoraFn().getTime());
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch {}
  if (syncAtivo) {
    enfileirarMudanca();
    clearTimeout(timerEnvio);
    timerEnvio = setTimeout(subirEstado, 1500);
  }
}

export function ativarSync(valor) {
  syncAtivo = valor;
  if (!valor) {
    clearTimeout(timerEnvio);
    timerEnvio = null;
    return;
  }
  return tentarReenviar();
}

export function syncLigado() {
  return syncAtivo;
}

export function limparEstadoMemoria() {
  const novo = padrao();
  Object.keys(estado).forEach(k => delete estado[k]);
  Object.assign(estado, novo);
  // Vocabulário da Expansão é derivado das lições feitas: zera junto, senão
  // as palavras da conta anterior vazam para o perfil novo.
  itensExtras = [];
}

export function resetarEstado() {
  localStorage.removeItem(CHAVE);
  localStorage.removeItem(CHAVE_CONTA);
  localStorage.removeItem(CHAVE_PENDENTE);
  localStorage.removeItem(CHAVE_FILA);
  apagarPapo();
  limparEstadoMemoria();
}

export function contaLocal() {
  return localStorage.getItem(CHAVE_CONTA);
}

export function definirContaLocal(id) {
  if (id) localStorage.setItem(CHAVE_CONTA, id);
  else localStorage.removeItem(CHAVE_CONTA);
}

export async function enviarAgora() {
  // Mesmo caminho protegido do subirEstado: com pendência, baixa e mescla
  // antes (e recusa subir por cima de uma versão mais nova da nuvem).
  if (motivoPendencia() || lerFila().length) {
    const remoto = await transporte.baixar();
    if (remoto && typeof remoto === 'object' && !Array.isArray(remoto)) {
      if (num(remoto.versaoDados) > VERSAO_DADOS) {
        throw new Error('Esse progresso na nuvem é de uma versão mais nova do app');
      }
      mesclar(remoto);
      try {
        localStorage.setItem(CHAVE, JSON.stringify(estado));
      } catch {}
    }
  }
  await transporte.enviar(payloadNuvem());
  limparFila();
  marcarPendencia(false);
}

export const LIMITE_BACKUP = 1_000_000;

export function resumoBackup(bruto) {
  const dados = bruto && typeof bruto === 'object' && !Array.isArray(bruto) ? (bruto.estado ?? bruto) : null;
  const licoes = dados?.licoes;
  if (!dados || typeof dados !== 'object' || Array.isArray(dados) || typeof dados.xp !== 'number' || !licoes || typeof licoes !== 'object' || Array.isArray(licoes)) {
    return null;
  }
  return {
    xp: Math.max(0, Math.floor(dados.xp)),
    licoes: Object.keys(licoes).length,
    streak: Math.max(0, Math.floor(Number(dados.streak) || 0)),
    quando: typeof bruto.quando === 'string' && bruto.quando ? bruto.quando : null,
    versaoApp: typeof bruto.versaoApp === 'string' ? bruto.versaoApp : null
  };
}

export function textoResumoBackup(resumo) {
  if (!resumo) return 'Arquivo não parece um backup do GringoLingo';
  const dia = resumo.quando && /^\d{4}-\d{2}-\d{2}/.test(resumo.quando) ? resumo.quando.slice(0, 10) : 'sem data';
  const licoes = resumo.licoes === 1 ? '1 lição' : `${resumo.licoes} lições`;
  return `Arquivo de ${dia}. ${resumo.xp} XP, ${licoes}, sequência ${resumo.streak}.`;
}

export function nomeArquivoBackup(iso, versao) {
  const dia = String(iso || '').slice(0, 10);
  const data = /^\d{4}-\d{2}-\d{2}$/.test(dia) ? dia : 'sem-data';
  const achado = String(versao || '').match(/\d+\.\d+/);
  return `gringolingo-${achado ? achado[0] : 'app'}-${data}.json`;
}

export function exportarEstado(versaoApp) {
  return {
    app: 'gringolingo',
    versao: 1,
    versaoApp: typeof versaoApp === 'string' ? versaoApp : null,
    quando: instanteLocal(agoraFn()),
    estado: JSON.parse(JSON.stringify(estado))
  };
}

export function importarEstado(bruto, modo = 'mesclar') {
  const resumo = resumoBackup(bruto);
  if (!resumo) throw new Error('Arquivo não parece um backup do GringoLingo');
  const dados = bruto?.estado ?? bruto;
  const antes = estado.xp;
  if (modo === 'substituir') {
    const novo = sanitizar(dados);
    Object.keys(estado).forEach(k => delete estado[k]);
    Object.assign(estado, novo);
    migrarErros();
    salvar();
  } else {
    mesclarEstado(dados);
  }
  return { antes, depois: estado.xp };
}

export function ehFavorita(en) {
  return estado.favoritas.some(f => f.en === en);
}

export function alternarFavorita(item) {
  const idx = estado.favoritas.findIndex(f => f.en === item.en);
  if (idx >= 0) estado.favoritas.splice(idx, 1);
  else estado.favoritas.push({ en: item.en, pt: item.pt, classe: item.classe ?? null });
  salvar();
  return idx < 0;
}

export function itensFavoritos() {
  return estado.favoritas.map(f => ({
    en: f.en,
    pt: Array.isArray(f.pt) ? f.pt[0] : f.pt,
    alt: Array.isArray(f.pt) ? f.pt.slice(1) : [],
    classe: f.classe
  }));
}

export function distribuicaoDeCaixas() {
  const caixas = [0, 0, 0, 0, 0];
  Object.values(estado.itens).forEach(a => {
    const c = Math.min(Math.max(a?.caixa ?? 0, 0), 4);
    caixas[c]++;
  });
  return caixas;
}

// Palavras já vistas da trilha (e da Expansão) que estão numa caixa do Leitner.
// Quem ainda não tem agenda conta na caixa 0, a de 1 dia.
export function itensNaCaixa(indice) {
  const alvo = Math.max(0, Math.min(num(indice), INTERVALOS.length - 1));
  return itensAprendidos().filter(item => (estado.itens[item.en]?.caixa ?? 0) === alvo);
}

export function historicoRecente(dias) {
  return Array.from({ length: dias }, (_, i) => {
    const d = diasDeDistancia(-(dias - 1 - i));
    return { data: d, xp: estado.historico[d] ?? 0 };
  });
}

function mesclar(remoto) {
  {
    estado.xp = Math.max(estado.xp, num(remoto.xp));
    if (typeof remoto.ultimoDia === 'string') {
      if (!estado.ultimoDia) {
        estado.ultimoDia = remoto.ultimoDia;
        estado.streak = num(remoto.streak);
      } else if (remoto.ultimoDia > estado.ultimoDia) {
        const continua = estado.ultimoDia === diaAnterior(remoto.ultimoDia);
        estado.streak = Math.max(num(remoto.streak), continua ? estado.streak + 1 : 0);
        estado.ultimoDia = remoto.ultimoDia;
      } else if (remoto.ultimoDia === estado.ultimoDia) {
        estado.streak = Math.max(estado.streak, num(remoto.streak));
      } else {
        const continua = remoto.ultimoDia === diaAnterior(estado.ultimoDia);
        estado.streak = Math.max(estado.streak, continua ? num(remoto.streak) + 1 : 0);
      }
    }
    for (const [id, dados] of Object.entries(remoto.licoes ?? {})) {
      if (!chaveSegura(id)) continue;
      estado.licoes[id] = { estrelas: Math.max(num(estado.licoes[id]?.estrelas), num(dados?.estrelas)) };
    }
    const registrados = new Set(estado.erros.map(e => e.en));
    (Array.isArray(remoto.erros) ? remoto.erros : []).forEach(e => {
      if (typeof e?.en === 'string' && !registrados.has(e.en)) {
        estado.erros.push({ en: e.en, pt: e.pt ?? '' });
        registrados.add(e.en);
      }
    });
    mesclarDeslizes(remoto.deslizes);
    mesclarPadroes(remoto.padroes);
    for (const [en, agenda] of Object.entries(remoto.itens ?? {})) {
      if (!chaveSegura(en) || typeof agenda?.proxima !== 'string') continue;
      const local = estado.itens[en];
      const lapsos = Math.max(num(local?.lapsos), num(agenda.lapsos));
      const caixaRemota = Math.max(0, Math.min(num(agenda.caixa), INTERVALOS.length - 1));
      if (!local) {
        estado.itens[en] = { caixa: caixaRemota, proxima: agenda.proxima, lapsos };
      } else {
        estado.itens[en] = {
          caixa: Math.min(Math.max(0, num(local.caixa)), caixaRemota),
          proxima: local.proxima < agenda.proxima ? local.proxima : agenda.proxima,
          lapsos
        };
      }
    }
    estado.badges = [...new Set([...estado.badges, ...(Array.isArray(remoto.badges) ? remoto.badges.filter(b => typeof b === 'string') : [])])];
    const favEn = new Set(estado.favoritas.map(f => f.en));
    (Array.isArray(remoto.favoritas) ? remoto.favoritas : []).forEach(f => {
      if (typeof f?.en === 'string' && !favEn.has(f.en)) {
        estado.favoritas.push({ en: f.en, pt: f.pt ?? [], classe: f.classe ?? null });
        favEn.add(f.en);
      }
    });
    for (const [d, xp] of Object.entries(remoto.historico ?? {})) {
      if (!chaveSegura(d)) continue;
      estado.historico[d] = Math.max(num(estado.historico[d]), num(xp));
    }
    // Protetores mesclam por contadores monotônicos: gasto num aparelho não
    // regenera pelo Math.max do outro (o saldo é derivado de ganhos - gastos).
    estado.protetoresGanhos = Math.max(num(estado.protetoresGanhos), remoto.protetoresGanhos != null ? num(remoto.protetoresGanhos) : num(remoto.protetores));
    estado.protetoresGastos = Math.max(num(estado.protetoresGastos), num(remoto.protetoresGastos));
    estado.protetores = Math.max(0, Math.min(estado.protetoresGanhos - estado.protetoresGastos, 2));
    const rm = remoto.missoes;
    if (rm && typeof rm.dia === 'string' && Array.isArray(rm.progresso)) {
      if (!estado.missoes || estado.missoes.dia < rm.dia) {
        estado.missoes = { dia: rm.dia, progresso: rm.progresso.filter(p => typeof p?.id === 'string').map(p => ({ id: p.id, valor: num(p.valor), pago: !!p.pago })) };
      } else if (estado.missoes.dia === rm.dia) {
        estado.missoes.progresso.forEach(p => {
          const outro = rm.progresso.find(x => x?.id === p.id);
          if (!outro) return;
          p.valor = Math.max(p.valor, num(outro.valor));
          p.pago = p.pago || !!outro.pago;
        });
      }
    }
    if (remoto.meta && !estado.stats.licoes) estado.meta = METAS.includes(num(remoto.meta)) ? num(remoto.meta) : METAS_ANTIGAS[num(remoto.meta)] ?? estado.meta;
    const metasLocais = num(estado.stats.metasFala);
    const metaFalaLocal = METAS_FALA.includes(num(estado.metaFala)) ? num(estado.metaFala) : 3;
    const remotoStats = remoto.stats && typeof remoto.stats === 'object' ? remoto.stats : {};
    for (const k of Object.keys(estado.stats)) {
      estado.stats[k] = Math.max(estado.stats[k], num(remotoStats[k]));
    }
    const remotoMetaFala = num(remoto.metaFala);
    if (METAS_FALA.includes(remotoMetaFala) && metaFalaLocal === 3 && !metasLocais) estado.metaFala = remotoMetaFala;
    const remotoMinutos = num(remoto.metaMinutos);
    if (METAS_MINUTOS.includes(remotoMinutos) && estado.metaMinutos === 10) estado.metaMinutos = remotoMinutos;
    const remotoSemanaFala = diaIso(remoto.metaFalaSemana);
    if (remotoSemanaFala && (!estado.metaFalaSemana || remotoSemanaFala > estado.metaFalaSemana)) estado.metaFalaSemana = remotoSemanaFala;
    const remotoFala = diaIso(remoto.falaDia);
    if (remotoFala && (!estado.falaDia || remotoFala > estado.falaDia)) estado.falaDia = remotoFala;
    const remotoNivel = nivelValido(remoto.nivelFala);
    if (rankNivel(remotoNivel) > rankNivel(estado.nivelFala)) estado.nivelFala = remotoNivel;
    const remotoTrilha = diaIso(remoto.trilhaInicio);
    if (remotoTrilha && (!estado.trilhaInicio || remotoTrilha < estado.trilhaInicio)) estado.trilhaInicio = remotoTrilha;
    const remotoPergunta = diaIso(remoto.perguntaDia);
    if (remotoPergunta && (!estado.perguntaDia || remotoPergunta > estado.perguntaDia)) estado.perguntaDia = remotoPergunta;
    const remotoDesafio = diaIso(remoto.diaDesafio);
    if (remotoDesafio) {
      const remotoSeq = num(remoto.sequenciaDesafio);
      if (!estado.diaDesafio) {
        estado.diaDesafio = remotoDesafio;
        estado.sequenciaDesafio = remotoSeq;
      } else if (remotoDesafio > estado.diaDesafio) {
        const continua = estado.diaDesafio === diaAnterior(remotoDesafio);
        estado.sequenciaDesafio = Math.max(remotoSeq, continua ? estado.sequenciaDesafio + 1 : 0);
        estado.diaDesafio = remotoDesafio;
      } else if (remotoDesafio === estado.diaDesafio) {
        estado.sequenciaDesafio = Math.max(estado.sequenciaDesafio, remotoSeq);
      } else {
        const continua = remotoDesafio === diaAnterior(estado.diaDesafio);
        estado.sequenciaDesafio = Math.max(estado.sequenciaDesafio, continua ? remotoSeq + 1 : 0);
      }
    }
    estado.recordeDesafio = Math.max(num(estado.recordeDesafio), num(remoto.recordeDesafio), num(estado.sequenciaDesafio));
    const remotoSurpresa = diaIso(remoto.surpresaDia);
    if (remotoSurpresa) {
      const remotoSeq = Math.min(num(remoto.surpresaStreak), 9999);
      if (!estado.surpresaDia) {
        estado.surpresaDia = remotoSurpresa;
        estado.surpresaStreak = remotoSeq;
      } else if (remotoSurpresa > estado.surpresaDia) {
        const continua = estado.surpresaDia === diaAnterior(remotoSurpresa);
        estado.surpresaStreak = Math.min(9999, Math.max(remotoSeq, continua ? estado.surpresaStreak + 1 : 0));
        estado.surpresaDia = remotoSurpresa;
      } else if (remotoSurpresa === estado.surpresaDia) {
        estado.surpresaStreak = Math.min(9999, Math.max(estado.surpresaStreak, remotoSeq));
      } else {
        const continua = remotoSurpresa === diaAnterior(estado.surpresaDia);
        estado.surpresaStreak = Math.min(9999, Math.max(estado.surpresaStreak, continua ? remotoSeq + 1 : 0));
      }
    }
    estado.recordeSurpresa = Math.min(9999, Math.max(num(estado.recordeSurpresa), num(remoto.recordeSurpresa), num(estado.surpresaStreak)));
    estado.estrelas = limparEstrelas([...(estado.estrelas || []), ...(Array.isArray(remoto.estrelas) ? remoto.estrelas : [])]);
    if (!estado.treinoAberto && typeof remoto.treinoAberto === 'string' && TREINOS.some(t => t.id === remoto.treinoAberto)) {
      estado.treinoAberto = remoto.treinoAberto;
    }
    const remotoEm = num(remoto.atualizadoEm);
    const filaMaisNova = lerFila().some(item => num(item.em) > remotoEm);
    if (remotoEm > num(estado.atualizadoEm) && !filaMaisNova && typeof remoto.treinoAberto === 'string' && TREINOS.some(t => t.id === remoto.treinoAberto)) {
      estado.treinoAberto = remoto.treinoAberto;
    }
    estado.painel = limparPainel(estado.painel);
    for (const [dia, v] of Object.entries(limparPainel(remoto.painel))) {
      estado.painel[dia] = unirDiaPainel(estado.painel[dia], v);
    }
    estado.errosFala = limparErrosFala([...(estado.errosFala ?? []), ...limparErrosFala(remoto.errosFala)]);
    estado.agendaFala = limparAgendaFala(estado.agendaFala);
    for (const [en, v] of Object.entries(limparAgendaFala(remoto.agendaFala))) {
      const local = estado.agendaFala[en];
      if (!local) estado.agendaFala[en] = v;
      else {
        estado.agendaFala[en] = {
          caixa: Math.min(local.caixa, v.caixa),
          proxima: local.proxima < v.proxima ? local.proxima : v.proxima,
          pt: local.pt || v.pt
        };
      }
    }
    estado.agendaFala = limparAgendaFala(estado.agendaFala);
    estado.notasFoco = limparNotasFoco([
      ...(estado.notasFoco || []),
      ...(Array.isArray(remoto.notasFoco) ? remoto.notasFoco : [])
    ]);
    if (!estado.conversas || typeof estado.conversas !== 'object') estado.conversas = {};
    for (const [id, v] of Object.entries(limparConversas(remoto.conversas))) {
      const local = estado.conversas[id] ?? { vezes: 0, melhor: 0 };
      estado.conversas[id] = {
        vezes: Math.max(num(local.vezes), v.vezes),
        melhor: Math.max(num(local.melhor), v.melhor)
      };
    }
    const localEm = num(estado.atualizadoEm);
    const piso = pisoDaFila();
    estado.xp = Math.max(num(estado.xp), piso.xp);
    if (piso.ultimoDia && piso.ultimoDia >= (estado.ultimoDia || '')) {
      estado.streak = Math.max(num(estado.streak), piso.streak);
      estado.ultimoDia = piso.ultimoDia;
    }
    estado.atualizadoEm = Math.max(localEm, num(remoto.atualizadoEm));
  }
}

export function mesclarEstado(remoto) {
  if (remoto && (typeof remoto !== 'object' || Array.isArray(remoto))) remoto = null;
  if (remoto && num(remoto.versaoDados) > VERSAO_DADOS) {
    throw new Error('Esse progresso foi salvo por uma versão mais nova do app. Atualize o app para sincronizar');
  }
  if (remoto) mesclar(remoto);
  migrarErros();
  salvar();
}

// Merge vindo do evento de storage de outra aba: só regrava (e ecoa) quando o
// merge realmente trouxe algo novo. Senão duas abas com ordens de chave
// diferentes ficam reescrevendo a mesma informação em ping-pongue.
export function mesclarDeOutraAba(bruto) {
  let remoto;
  try {
    remoto = JSON.parse(bruto);
  } catch {
    return false;
  }
  if (!remoto || typeof remoto !== 'object' || Array.isArray(remoto)) return false;
  if (num(remoto.versaoDados) > VERSAO_DADOS) return false;
  const antes = JSON.stringify(estado);
  mesclar(remoto);
  migrarErros();
  if (JSON.stringify(estado) === antes) return false;
  salvar();
  return true;
}

export function streakAtual() {
  return estado.ultimoDia === hoje() || estado.ultimoDia === diaAnterior(hoje()) ? estado.streak : 0;
}

export function streakEmRisco() {
  return estado.ultimoDia === diaAnterior(hoje()) && estado.streak > 0;
}

function atualizarStreak(d = hoje()) {
  if (estado.ultimoDia === d) return { usouProtetor: false };
  // Relógio do aparelho atrasou (ou o dia veio de outro fuso): não zera nada.
  if (estado.ultimoDia && estado.ultimoDia > d) return { usouProtetor: false };
  const ontem = diaAnterior(d);
  const anteontem = diaAnterior(ontem);
  let usouProtetor = false;
  if (estado.ultimoDia === ontem) {
    estado.streak += 1;
  } else if (estado.ultimoDia === anteontem && estado.protetores > 0 && estado.streak > 0) {
    estado.protetores -= 1;
    estado.protetoresGastos += 1;
    estado.streak += 1;
    usouProtetor = true;
  } else {
    estado.streak = 1;
  }
  estado.ultimoDia = d;
  return { usouProtetor };
}

export function xpDoDia(d = hoje()) {
  return estado.historico[d] ?? 0;
}

export function metaBatida(d = hoje()) {
  return xpDoDia(d) >= estado.meta;
}

export function definirMeta(valor) {
  estado.meta = valor;
  salvar();
}

export function definirMetaFala(valor) {
  if (!METAS_FALA.includes(valor)) return;
  estado.metaFala = valor;
  salvar();
}

export function definirMetaMinutos(valor) {
  if (!METAS_MINUTOS.includes(valor)) return;
  estado.metaMinutos = valor;
  checarBadges();
  salvar();
}

export function semanaAtual() {
  const diaSemana = (agoraFn().getDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => {
    const d = diasDeDistancia(i - diaSemana);
    return { data: d, xp: estado.historico[d] ?? 0, hoje: d === hoje(), futuro: d > hoje() };
  });
}

function registrarDia(xp, d = hoje()) {
  estado.historico[d] = (estado.historico[d] ?? 0) + xp;
  const limite = diasDeDistancia(-400);
  Object.keys(estado.historico).forEach(k => {
    if (k < limite) delete estado.historico[k];
  });
}

export function nivelInfo() {
  let i = 0;
  NIVEIS.forEach((n, idx) => {
    if (estado.xp >= n.xp) i = idx;
  });
  const atual = NIVEIS[i];
  const prox = NIVEIS[i + 1] || null;
  return {
    numero: i + 1,
    titulo: atual.titulo,
    emoji: atual.emoji,
    prox,
    progresso: prox && prox.xp > atual.xp ? (estado.xp - atual.xp) / (prox.xp - atual.xp) : 1
  };
}

function agendar(en, acertou) {
  const atual = estado.itens[en];
  if (acertou) {
    // O clamp inferior segura agendas corrompidas que cheguem pelo merge.
    const caixa = Math.max(0, Math.min((atual?.caixa ?? -1) + 1, INTERVALOS.length - 1));
    estado.itens[en] = { caixa, proxima: diasDeDistancia(INTERVALOS[caixa]), lapsos: 0 };
    return;
  }
  // Errar rebaixa uma caixa (piso 1) e traz o item para amanhã; só dois erros
  // seguidos zeram. Um tropeço não apaga 35 dias de espaçamento conquistado.
  const lapsos = num(atual?.lapsos) + 1;
  const caixa = !atual || lapsos >= 2 ? 0 : Math.max(1, Math.min(num(atual.caixa), INTERVALOS.length - 1) - 1);
  estado.itens[en] = { caixa, proxima: diasDeDistancia(1), lapsos };
}

function aplicarAgendamentos(resultados) {
  (resultados ?? []).forEach(r => agendar(r.en, r.acertou));
}

export function itensVencidos() {
  const aprendidos = itensAprendidos();
  const limite = hoje();
  return aprendidos
    .filter(i => {
      const agenda = estado.itens[i.en];
      return !agenda || agenda.proxima <= limite;
    })
    .map(i => ({ item: i, agenda: estado.itens[i.en] }))
    .sort((a, b) => {
      const proximaA = a.agenda?.proxima ?? '9999-12-31';
      const proximaB = b.agenda?.proxima ?? '9999-12-31';
      if (proximaA !== proximaB) return proximaA < proximaB ? -1 : 1;
      return (a.agenda?.caixa ?? 0) - (b.agenda?.caixa ?? 0);
    })
    .map(x => x.item);
}

function semente(texto) {
  let h = 0;
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  return h;
}

export function missoesDeHoje(d = hoje()) {
  if (estado.missoes?.dia !== d) {
    const escolhidas = MISSOES
      .map(m => ({ id: m.id, chave: semente(d + m.id) }))
      .sort((a, b) => a.chave - b.chave)
      .slice(0, 3);
    estado.missoes = { dia: d, progresso: escolhidas.map(m => ({ id: m.id, valor: 0, pago: false })) };
  }
  return estado.missoes.progresso
    .map(p => {
      const def = MISSOES.find(m => m.id === p.id);
      if (!def) return null;
      return { ...def, valor: Math.min(p.valor, def.alvo), concluida: p.valor >= def.alvo };
    })
    .filter(Boolean);
}

function avancarMissoes(sessao, d = hoje()) {
  missoesDeHoje(d);
  let bonus = 0;
  const novas = [];
  estado.missoes.progresso.forEach(p => {
    const def = MISSOES.find(m => m.id === p.id);
    if (!def || p.pago) return;
    p.valor += def.medir(sessao);
    if (p.valor >= def.alvo) {
      p.pago = true;
      bonus += def.xp;
      novas.push(def);
    }
  });
  return { bonus, novas };
}

function migrarErros() {
  let mudou = false;
  estado.erros.forEach(e => {
    if (e?.en && !estado.itens[e.en]) {
      estado.itens[e.en] = { caixa: 0, proxima: hoje() };
      mudou = true;
    }
  });
  return mudou;
}

// Palavras aprendidas fora do curso (Expansão de Vocabulário): o app registra
// aqui depois de carregar o banco, e elas entram na Revisão Turbo junto com
// as do curso.
let itensExtras = [];

export function definirItensExtras(lista) {
  itensExtras = Array.isArray(lista) ? lista : [];
}

function frasesNaAgenda() {
  return FRASES.filter(f => estado.itens[f.en]).map(itemDaFrase);
}

export function frasesVencidas() {
  const limite = hoje();
  return FRASES.filter(f => {
    const agenda = estado.itens[f.en];
    return !!agenda && typeof agenda.proxima === 'string' && agenda.proxima <= limite;
  }).map(itemDaFrase);
}

export function agendarFrase(en, acertou) {
  if (!FRASES.some(f => f.en === en)) return null;
  agendar(en, !!acertou);
  salvar();
  return { ...estado.itens[en] };
}

export function itensAprendidos() {
  const itens = [];
  UNIDADES.forEach(u => u.licoes.forEach(l => {
    if (estado.licoes[l.id]) itens.push(...l.itens);
  }));
  return [...itens, ...itensExtras, ...frasesNaAgenda()];
}

function unidadeCompleta(u) {
  return u.licoes.every(l => estado.licoes[l.id]);
}

export function palavrasDoPadrao(chave, itens) {
  if (typeof chave !== 'string' || !chave) return [];
  return palavrasFracas(itens).filter(f => f.chave === chave);
}

export function palavrasFracas(itens) {
  const porEn = new Map(estado.deslizes.map(d => [d.en, d]));
  return (itens ?? [])
    .map(item => {
      const row = porEn.get(item.en);
      const saldo = row ? Math.max(0, num(row.erros) - num(row.acertos)) : 0;
      return { item, saldo, tipo: row?.tipo ?? null, chave: row?.chave ?? null };
    })
    .filter(x => x.saldo > 0)
    .sort((a, b) => b.saldo - a.saldo || a.item.en.localeCompare(b.item.en));
}

export function resumoPadroes(limite = 4) {
  return estado.padroes
    .filter(p => num(p.n) >= 2)
    .sort((a, b) => b.n - a.n)
    .slice(0, limite);
}

export function memorizadas() {
  return Object.values(estado.itens).filter(a => (a?.caixa ?? 0) >= 3).length;
}

// Chefões e diálogos entram em estado.licoes com chave 'chefao:'/'historia:';
// o contador de lições e o badge de 25 contam só as lições de verdade.
export function licoesConcluidas() {
  return Object.keys(estado.licoes).filter(k => !k.includes(':')).length;
}

function checarBadges() {
  const cond = {
    primeira: estado.stats.licoes >= 1,
    perfeita: estado.stats.perfeitas >= 1,
    combo5: estado.stats.comboMax >= 5,
    xp100: estado.xp >= 100,
    xp500: estado.xp >= 500,
    streak3: estado.streak >= 3,
    streak7: estado.streak >= 7,
    revisor: estado.stats.revisoes >= 1,
    unidade: UNIDADES.some(unidadeCompleta),
    streak14: estado.streak >= 14,
    streak30: estado.streak >= 30,
    xp1000: estado.xp >= 1000,
    xp2000: estado.xp >= 2000,
    licoes25: licoesConcluidas() >= 25,
    perfeitas10: estado.stats.perfeitas >= 10,
    memoria50: memorizadas() >= 50,
    metas7: estado.stats.metasBatidas >= 7,
    ouvido: estado.stats.escutas >= 1,
    papo: estado.stats.dialogos >= 1,
    sombra: estado.stats.sombra >= 1,
    ator: IDS_CINCO.every(id => (estado.conversas?.[id]?.vezes ?? 0) >= 1),
    cinco: estado.stats.falas >= 1,
    caminhos: estado.stats.ramos >= 1,
    pares: estado.stats.pronuncias >= 1,
    nivelado: !!estado.nivelFala,
    pergunta: estado.stats.perguntas >= 1,
    standup: estado.stats.tecnicos >= 1,
    reuniao: estado.stats.idiomas >= 1,
    doDia: estado.stats.diasPergunta >= 1,
    volta: estado.stats.revisoesFala >= 1,
    remoto: estado.stats.entrevistas >= 1,
    conto: estado.stats.contos >= 1,
    preco: estado.stats.numeros >= 1,
    opiniao: estado.stats.opinioes >= 1,
    olho: estado.stats.cenasFala >= 1,
    rapido: estado.stats.rapidos >= 1,
    semanaFala: estado.stats.metasFala >= 1,
    relato: estado.stats.relatos >= 1,
    cortesia: estado.stats.cortesias >= 1,
    aquecer: estado.stats.aquecimentos >= 1,
    claro: estado.stats.esclarecimentos >= 1,
    demo: estado.stats.demos >= 1,
    prazo: estado.stats.negociacoes >= 1,
    star: estado.stats.stars >= 1,
    enfase: estado.stats.enfases >= 1,
    decisao: estado.stats.decisoes >= 1,
    par: estado.stats.pares >= 1,
    plantao: estado.stats.incidentes >= 1,
    retro: estado.stats.retros >= 1,
    chegada: estado.stats.chegadas >= 1,
    ligacao: estado.stats.ligacoes >= 1,
    estimativa: estado.stats.estimativas >= 1,
    consenso: estado.stats.consensos >= 1,
    atendimento: estado.stats.atendimentos >= 1,
    gestor: estado.stats.gestores >= 1,
    final: estado.stats.finais >= 1,
    mala: estado.stats.viagens >= 1,
    mistura: estado.stats.misturas >= 1,
    linha: estado.stats.linhas >= 1,
    slack: estado.stats.slacks >= 1,
    social: estado.stats.sociais >= 1,
    termo: estado.stats.termos >= 1,
    salario: estado.stats.salarios >= 1,
    projeto: estado.stats.projetos >= 1,
    sotaque: estado.stats.sotaques >= 1,
    desafio: estado.stats.desafios >= 1,
    requisito: estado.stats.requisitos >= 1,
    metrica: estado.stats.metricas >= 1,
    aprendizado: estado.stats.aprendizados >= 1,
    passeio: estado.stats.passeios >= 1,
    falha: estado.stats.falhas >= 1,
    mentoria: estado.stats.mentorias >= 1,
    socorro: estado.stats.socorros >= 1,
    palestra: estado.stats.palestras >= 1,
    duvida: estado.stats.duvidas >= 1,
    sinal: estado.stats.sinais >= 1,
    sistema: estado.stats.sistemas >= 1,
    codigo: estado.stats.codigos >= 1,
    colega: estado.stats.colegas >= 1,
    simulado: estado.stats.simulados >= 1,
    modelo: estado.stats.modelos >= 1,
    furo: estado.stats.furos >= 1,
    rotina: estado.stats.rotinas >= 1,
    assunto: estado.stats.papos >= 1,
    futuro: estado.stats.futuros >= 1,
    cultura: estado.stats.culturas >= 1,
    aumento: estado.stats.aumentos >= 1,
    rota: estado.stats.rotas >= 1,
    vivo: estado.stats.vivos >= 1,
    produto: estado.stats.produtos >= 1,
    fecho: estado.stats.fechos >= 1,
    espaco: estado.stats.espacos >= 1,
    mapa: estado.stats.mapas >= 1,
    duro: estado.stats.duros >= 1,
    proposta: estado.stats.propostas >= 1,
    semana: somarSemana(estado.painel, hoje()).minutos >= 10,
    narrar: estado.stats.narras >= 1,
    banco: estado.stats.bancos >= 1,
    recusa: estado.stats.recusas >= 1,
    sprint: estado.stats.sprints >= 1,
    seguro: estado.stats.seguros >= 1,
    meetup: estado.stats.meetups >= 1,
    completa: estado.stats.completas >= 1,
    rodada: estado.stats.rodadas >= 1,
    migra: estado.stats.migras >= 1,
    estreia: estado.stats.estreias >= 1,
    foco: estado.stats.focos >= 1,
    poker: estado.stats.pokers >= 1,
    leigo: estado.stats.leigos >= 1,
    recruta: estado.stats.recrutas >= 1,
    culpa: estado.stats.culpas >= 1,
    raio: estado.stats.raios >= 1,
    oferta: estado.stats.ofertas >= 1,
    pedido: estado.stats.pedidos >= 1,
    cobertura: estado.stats.coberturas >= 1,
    loom: estado.stats.looms >= 1,
    caderno: estado.stats.cadernos >= 1,
    grafico: estado.stats.graficos >= 1,
    handoff: estado.stats.handoffs >= 1,
    elevador: estado.stats.elevadores >= 1,
    junta: estado.stats.juntas >= 1,
    pista: estado.stats.pistas >= 1,
    calma: estado.stats.calmas >= 1,
    folga: estado.stats.folgas >= 1,
    abertas: estado.stats.abertas >= 1,
    respeito: estado.stats.respeitos >= 1,
    debito: estado.stats.debitos >= 1,
    indicacao: estado.stats.indicacoes >= 1,
    ux: estado.stats.uxs >= 1,
    forum: estado.stats.foruns >= 1,
    visto: estado.stats.vistos >= 1,
    mes: estado.stats.meses >= 1,
    facil: estado.stats.facils >= 1,
    stack: estado.stats.stacks >= 1,
    sabado: estado.stats.sabados >= 1,
    surpresa: estado.stats.surpresas >= 1,
    brecha: estado.stats.brechas >= 1,
    muda: estado.stats.mudas >= 1,
    gaucho: estado.stats.gauchos >= 1,
    radar: estado.stats.radares >= 1,
    aplauso: estado.stats.aplausos >= 1,
    gripe: estado.stats.gripes >= 1,
    pm: estado.stats.pms >= 1,
    laudo: estado.stats.laudos >= 1,
    rumo: estado.stats.rumos >= 1,
    acesso: estado.stats.acessos >= 1,
    licenca: estado.stats.licencas >= 1,
    jargao: estado.stats.jargoes >= 1,
    bandeira: estado.stats.bandeiras >= 1,
    gelo: estado.stats.gelos >= 1,
    limite: estado.stats.limites >= 1,
    canario: estado.stats.canarios >= 1,
    despedida: estado.stats.despedidas >= 1,
    repeticao: estado.stats.repeticoes >= 1,
    carga: estado.stats.cargas >= 1,
    boletim: estado.stats.boletins >= 1,
    dono: estado.stats.donos >= 1,
    manual: estado.stats.manuais >= 1,
    verde: estado.stats.verdes >= 1,
    certificado: estado.stats.certificados >= 1,
    rebase: estado.stats.rebases >= 1,
    consulta: estado.stats.consultas >= 1,
    replica: estado.stats.replicas >= 1,
    ensaio: estado.stats.ensaios >= 1,
    disco: estado.stats.discos >= 1,
    pagina: estado.stats.paginas >= 1,
    squash: estado.stats.squashes >= 1,
    circuito: estado.stats.circuitos >= 1,
    job: estado.stats.jobs >= 1,
    colheita: estado.stats.colheitas >= 1,
    sessao: estado.stats.sessoes >= 1,
    tanque: estado.stats.tanques >= 1,
    sonda: estado.stats.sondas >= 1,
    semente: estado.stats.sementes >= 1,
    registro: estado.stats.registros >= 1,
    rastro: estado.stats.rastros >= 1,
    parada: estado.stats.paradas >= 1,
    pod: estado.stats.pods >= 1,
    lint: estado.stats.lints >= 1,
    origem: estado.stats.origens >= 1,
    link: estado.stats.links >= 1,
    cpu: estado.stats.cpus >= 1,
    copia: estado.stats.copias >= 1,
    estouro: estado.stats.estouros >= 1,
    impasse: estado.stats.impasses >= 1,
    dominio: estado.stats.dominios >= 1,
    morta: estado.stats.mortas >= 1,
    ponteiro: estado.stats.ponteiros >= 1,
    eleicao: estado.stats.eleicoes >= 1,
    freio: estado.stats.freios >= 1,
    pausa: estado.stats.pausas >= 1,
    deriva: estado.stats.derivas >= 1,
    descritor: estado.stats.descritores >= 1,
    reserva: estado.stats.reservas >= 1,
    varredura: estado.stats.varreduras >= 1,
    porta: estado.stats.portas >= 1,
    inodo: estado.stats.inodos >= 1,
    saida: estado.stats.saidas >= 1,
    manada: estado.stats.manadas >= 1,
    gotejo: estado.stats.gotejos >= 1,
    frio: estado.stats.frios >= 1,
    cadeado: estado.stats.cadeados >= 1,
    cota: estado.stats.cotas >= 1,
    ciclo: estado.stats.ciclos >= 1,
    zumbi: estado.stats.zumbis >= 1,
    cisao: estado.stats.cisoes >= 1,
    rajada: estado.stats.rajadas >= 1,
    brasa: estado.stats.brasas >= 1,
    datagrama: estado.stats.datagramas >= 1,
    passe: estado.stats.passes >= 1,
    carimbo: estado.stats.carimbos >= 1,
    pilha: estado.stats.pilhas >= 1,
    cano: estado.stats.canos >= 1,
    giro: estado.stats.giros >= 1,
    compacta: estado.stats.compactas >= 1,
    diario: estado.stats.diarios >= 1,
    vagao: estado.stats.vagoes >= 1,
    corrida: estado.stats.corridas >= 1,
    indice: estado.stats.indices >= 1,
    percentil: estado.stats.percentis >= 1,
    segredo: estado.stats.segredos >= 1,
    fantasma: estado.stats.fantasmas >= 1,
    inteiro: estado.stats.inteiros >= 1,
    filtro: estado.stats.filtros >= 1,
    ordem: estado.stats.ordens >= 1,
    prova: estado.stats.provas >= 1,
    orfao: estado.stats.orfaos >= 1,
    aceno: estado.stats.acenos >= 1,
    gasto: estado.stats.gastos >= 1,
    instavel: estado.stats.instaveis >= 1,
    duplicado: estado.stats.duplicados >= 1,
    apagao: estado.stats.apagoes >= 1,
    replay: estado.stats.replays >= 1,
    eco: estado.stats.ecos >= 1,
    leque: estado.stats.leques >= 1,
    saga: estado.stats.sagas >= 1,
    caixa: estado.stats.caixas >= 1,
    apagado: estado.stats.apagados >= 1,
    espera: estado.stats.esperas >= 1,
    cursor: estado.stats.cursores >= 1,
    fila: estado.stats.filas >= 1,
    disjuntor: estado.stats.disjuntores >= 1,
    aluguel: estado.stats.alugueis >= 1,
    pulso: estado.stats.pulsos >= 1,
    piscina: estado.stats.piscinas >= 1,
    balde: estado.stats.baldes >= 1,
    cerca: estado.stats.cercas >= 1,
    tremor: estado.stats.tremores >= 1,
    portaria: estado.stats.portarias >= 1,
    cola: estado.stats.colas >= 1,
    anteparo: estado.stats.anteparos >= 1,
    descarte: estado.stats.descartes >= 1,
    cronometro: estado.stats.cronometros >= 1,
    amostra: estado.stats.amostras >= 1,
    nicho: estado.stats.nichos >= 1,
    lacre: estado.stats.lacres >= 1,
    semaforo: estado.stats.semaforos >= 1,
    barreira: estado.stats.barreiras >= 1,
    trinco: estado.stats.trincos >= 1,
    recuo: estado.stats.recuos >= 1,
    vigia: estado.stats.vigias >= 1,
    ampulheta: estado.stats.ampulhetas >= 1,
    carona: estado.stats.caronas >= 1,
    veneno: estado.stats.venenos >= 1,
    farol: estado.stats.farois >= 1,
    ancora: estado.stats.ancoras >= 1,
    malha: estado.stats.malhas >= 1,
    fenda: estado.stats.fendas >= 1,
    cofre: estado.stats.cofres >= 1,
    audiencia: estado.stats.audiencias >= 1,
    revogacao: estado.stats.revogacoes >= 1,
    quorum: estado.stats.quoruns >= 1,
    maioria: estado.stats.maiorias >= 1,
    arbitro: estado.stats.arbitros >= 1,
    lider: estado.stats.lideres >= 1,
    mandato: estado.stats.mandatos >= 1,
    seguidor: estado.stats.seguidores >= 1,
    orquestrador: estado.stats.orquestradores >= 1,
    coreografia: estado.stats.coreografias >= 1,
    compensacao: estado.stats.compensacoes >= 1,
    primario: estado.stats.primarios >= 1,
    espelho: estado.stats.espelhos >= 1,
    ascensao: estado.stats.ascensoes >= 1,
    travessia: estado.stats.travessias >= 1,
    retaguarda: estado.stats.retaguardas >= 1,
    contorno: estado.stats.contornos >= 1,
    rumor: estado.stats.rumores >= 1,
    reparo: estado.stats.reparos >= 1,
    deixa: estado.stats.deixas >= 1,
    floco: estado.stats.flocos >= 1,
    epoca: estado.stats.epocas >= 1,
    vetor: estado.stats.vetores >= 1,
    sujeira: estado.stats.sujeiras >= 1,
    instantaneo: estado.stats.instantaneos >= 1,
    serial: estado.stats.seriais >= 1,
    fome: estado.stats.fomes >= 1,
    inversao: estado.stats.inversoes >= 1,
    idade: estado.stats.idades >= 1,
    sidecar: estado.stats.sidecars >= 1,
    embaixador: estado.stats.embaixadores >= 1,
    adaptador: estado.stats.adaptadores >= 1,
    bizantino: estado.stats.bizantinos >= 1,
    particao: estado.stats.particoes >= 1,
    general: estado.stats.generais >= 1,
    wal: estado.stats.wals >= 1,
    lsn: estado.stats.lsns >= 1,
    checkpoint: estado.stats.checkpoints >= 1,
    nonce: estado.stats.nonces >= 1,
    hmac: estado.stats.hmacs >= 1,
    envelope: estado.stats.envelopes >= 1,
    lease: estado.stats.leases >= 1,
    renovacao: estado.stats.renovacoes >= 1,
    vencimento: estado.stats.vencimentos >= 1,
    outbox: estado.stats.outboxes >= 1,
    inbox: estado.stats.inboxes >= 1,
    relay: estado.stats.relays >= 1,
    offset: estado.stats.offsets >= 1,
    lag: estado.stats.lags >= 1,
    ack: estado.stats.acks >= 1,
    snapshot: estado.stats.snapshots >= 1,
    restore: estado.stats.restores >= 1,
    promote: estado.stats.promotes >= 1,
    bloom: estado.stats.blooms >= 1,
    cuco: estado.stats.cucos >= 1,
    esboco: estado.stats.esbocos >= 1,
    merkle: estado.stats.merkles >= 1,
    radix: estado.stats.radixes >= 1,
    trie: estado.stats.tries >= 1,
    gossip: estado.stats.gossips >= 1,
    phi: estado.stats.phis >= 1,
    accrual: estado.stats.accruals >= 1,
    hint: estado.stats.hints >= 1,
    vacuum: estado.stats.vacuums >= 1,
    freeze: estado.stats.freezes >= 1,
    bitmap: estado.stats.bitmaps >= 1,
    roaring: estado.stats.roarings >= 1,
    hyper: estado.stats.hypers >= 1,
    crdt: estado.stats.crdts >= 1,
    lww: estado.stats.lwws >= 1,
    orset: estado.stats.orsets >= 1,
    vector: estado.stats.vectors >= 1,
    dot: estado.stats.dots >= 1,
    causal: estado.stats.causals >= 1,
    shard: estado.stats.shards >= 1,
    rebalance: estado.stats.rebalances >= 1,
    split: estado.stats.splits >= 1,
    watermark: estado.stats.watermarks >= 1,
    barrier: estado.stats.barriers >= 1,
    align: estado.stats.aligns >= 1,
    witness: estado.stats.witnesses >= 1,
    voter: estado.stats.voters >= 1,
    learner: estado.stats.learners >= 1,
    checksum: estado.stats.checksums >= 1,
    bulkhead: estado.stats.bulkheads >= 1,
    fallback: estado.stats.fallbacks >= 1,
    tombstone: estado.stats.tombstones >= 1,
    purge: estado.stats.purges >= 1,
    reclaim: estado.stats.reclaims >= 1,
    journal: estado.stats.journals >= 1,
    segment: estado.stats.segments >= 1,
    spill: estado.stats.spills >= 1,
    stripe: estado.stats.stripes >= 1,
    parity: estado.stats.parities >= 1,
    rebuild: estado.stats.rebuilds >= 1,
    epoch: estado.stats.epochs >= 1,
    ballot: estado.stats.ballots >= 1,
    fence: estado.stats.fences >= 1,
    flush: estado.stats.flushes >= 1,
    memtable: estado.stats.memtables >= 1,
    extent: estado.stats.extents >= 1,
    manifest: estado.stats.manifests >= 1,
    hedge: estado.stats.hedges >= 1,
    debounce: estado.stats.debounces >= 1,
    sstable: estado.stats.sstables >= 1,
    latch: estado.stats.latches >= 1,
    throttle: estado.stats.throttles >= 1,
    iterator: estado.stats.iterators >= 1,
    pager: estado.stats.pagers >= 1,
    evict: estado.stats.evicts >= 1,
    histogram: estado.stats.histograms >= 1,
    gauge: estado.stats.gauges >= 1,
    backfill: estado.stats.backfills >= 1,
    skew: estado.stats.skews >= 1,
    hotspot: estado.stats.hotspots >= 1,
    tail: estado.stats.tails >= 1,
    slo: estado.stats.slos >= 1,
    sli: estado.stats.slis >= 1,
    probe: estado.stats.probes >= 1,
    trace: estado.stats.traces >= 1,
    scrape: estado.stats.scrapes >= 1,
    rollup: estado.stats.rollups >= 1,
    webhook: estado.stats.webhooks >= 1,
    fanout: estado.stats.fanouts >= 1,
    ingest: estado.stats.ingests >= 1,
    otel: estado.stats.otels >= 1,
    sampler: estado.stats.samplers >= 1,
    exemplar: estado.stats.exemplars >= 1,
    egress: estado.stats.egresses >= 1,
    gateway: estado.stats.gateways >= 1,
    failover: estado.stats.failovers >= 1,
    oncall: estado.stats.oncalls >= 1,
    severity: estado.stats.severities >= 1,
    incident: estado.stats.incidents >= 1,
    estrela: Array.isArray(estado.estrelas) && estado.estrelas.length >= 1,
    minutos: somarSemana(estado.painel, hoje()).minutos >= num(estado.metaMinutos),
    tudo: UNIDADES.every(unidadeCompleta)
  };
  const novas = BADGES.filter(b => cond[b.id] && !estado.badges.includes(b.id));
  novas.forEach(b => estado.badges.push(b.id));
  return novas;
}

function ganharProtetor() {
  if (estado.protetores >= 2) return;
  estado.protetores += 1;
  estado.protetoresGanhos += 1;
}

function contarMetaBatida(metaAntes, diaSessao) {
  if (!metaAntes && metaBatida(diaSessao)) estado.stats.metasBatidas++;
}

export function registrarLicao(licaoId, d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'licao' }, diaSessao);
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus, diaSessao);
  const antes = estado.licoes[licaoId];
  estado.licoes[licaoId] = { estrelas: Math.max(antes?.estrelas ?? 0, d.estrelas) };
  estado.stats.licoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  if (d.perfeita) {
    estado.stats.perfeitas++;
    if (estado.stats.perfeitas % 5 === 0) ganharProtetor();
  }
  aplicarAgendamentos(d.agendamentos);
  aplicarDeslizes(d.deslizes, d.agendamentos);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

export function registrarRelampago(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  // Abrir o Relâmpago e deixar o tempo correr não conta como dia de estudo.
  const { usouProtetor } = d.acertos >= 3 ? atualizarStreak(diaSessao) : { usouProtetor: false };
  const missao = avancarMissoes({ ...d, tipo: 'relampago', perfeita: false }, diaSessao);
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus, diaSessao);
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  estado.stats.recordeRelampago = Math.max(estado.stats.recordeRelampago ?? 0, d.acertos);
  aplicarAgendamentos(d.agendamentos);
  aplicarDeslizes(d.deslizes, d.agendamentos);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

function anotarPainel(nota, acertos, respostas, extra = {}) {
  const d = hoje();
  if (!estado.painel || typeof estado.painel !== 'object') estado.painel = {};
  const atual = estado.painel[d] ?? { soma: 0, n: 0, acertos: 0, respostas: 0 };
  const grupos = { ...(atual.grupos || {}) };
  if (extra.grupo) grupos[extra.grupo] = (Number(grupos[extra.grupo]) || 0) + 1;
  const dia = {
    soma: atual.soma + Math.max(0, Math.min(num(nota), 100)),
    n: atual.n + 1,
    acertos: atual.acertos + Math.max(0, num(acertos)),
    respostas: atual.respostas + Math.max(0, num(respostas)),
    segundos: Math.min(200000, (Number(atual.segundos) || 0) + segundosDaFala(respostas, extra.segundos))
  };
  if (!dia.segundos) delete dia.segundos;
  const muletas = Math.min(200000, (Number(atual.muletas) || 0) + Math.max(0, num(extra.muletas)));
  if (muletas) dia.muletas = muletas;
  if (Object.keys(grupos).length) dia.grupos = grupos;
  estado.painel[d] = dia;
}

function somarErrosFala(lista) {
  if (!Array.isArray(lista) || !lista.length) return;
  const base = (estado.errosFala ?? []).map(e => ({ ...e }));
  for (const e of lista) {
    if (!e || typeof e.en !== 'string' || !e.en) continue;
    const add = Math.max(1, num(e.n) || 1);
    const i = base.findIndex(x => x.en === e.en);
    if (i >= 0) base[i] = { ...base[i], n: base[i].n + add, pt: base[i].pt || e.pt || '' };
    else base.push({ en: e.en, pt: e.pt || '', n: add });
  }
  estado.errosFala = limparErrosFala(base);
  for (const e of lista) {
    if (e && typeof e.en === 'string') puxarDeslize(e.en, e.pt);
  }
}

function fraseDeFala(en) {
  const texto = String(en || '').trim();
  if (texto.length < 8 || texto.length > 120 || !chaveSegura(texto)) return false;
  return texto.split(/\s+/).length >= 2;
}

function puxarDeslize(en, pt) {
  if (!fraseDeFala(en)) return;
  if (!estado.agendaFala || typeof estado.agendaFala !== 'object' || Array.isArray(estado.agendaFala)) estado.agendaFala = {};
  const dia = hoje();
  const atual = estado.agendaFala[en];
  const dica = typeof pt === 'string' ? pt.slice(0, 120) : '';
  if (!atual) {
    estado.agendaFala[en] = { caixa: 0, proxima: dia, pt: dica };
    return;
  }
  if (dica && !atual.pt) atual.pt = dica;
  if (atual.proxima > dia) {
    atual.caixa = Math.max(0, num(atual.caixa) - 1);
    atual.proxima = dia;
  }
}

export function deslizesVencidos(d = hoje()) {
  const agenda = estado.agendaFala && typeof estado.agendaFala === 'object' ? estado.agendaFala : {};
  const freq = new Map((estado.errosFala ?? []).map(e => [e.en, e.n]));
  return Object.entries(agenda)
    .filter(([, v]) => v && v.proxima <= d)
    .map(([en, v]) => ({ en, pt: v.pt || '', caixa: num(v.caixa), proxima: v.proxima, n: freq.get(en) || 0 }))
    .sort((a, b) => b.n - a.n || a.proxima.localeCompare(b.proxima) || a.en.localeCompare(b.en));
}

export function revisarDeslize(en, acertou) {
  if (!estado.agendaFala || !estado.agendaFala[en]) return null;
  const atual = estado.agendaFala[en];
  if (acertou) {
    const noTopo = num(atual.caixa) >= INTERVALOS.length - 1;
    const caixa = Math.min(num(atual.caixa) + 1, INTERVALOS.length - 1);
    const intervalo = INTERVALOS[noTopo ? INTERVALOS.length - 1 : num(atual.caixa)];
    atual.caixa = caixa;
    atual.proxima = diasDeDistancia(intervalo);
  } else {
    atual.caixa = Math.max(0, num(atual.caixa) - 1);
    atual.proxima = diasDeDistancia(1);
  }
  salvar();
  return { caixa: atual.caixa, proxima: atual.proxima };
}

function marcarMetaFala(diaIso) {
  const segunda = diasDaSemana(diaIso)[0];
  if (!segunda) return;
  if (estado.metaFalaSemana && estado.metaFalaSemana >= segunda) return;
  if (contarFaladas(estado.painel, diaIso) < num(estado.metaFala)) return;
  estado.metaFalaSemana = segunda;
  estado.stats.metasFala = num(estado.stats.metasFala) + 1;
}

function limparSurpresaArmada() {
  estado.surpresaArmada = '';
  estado.surpresaArmadaDia = null;
}

function surpresaPronta(tipo, diaSessao) {
  if (!tipo || estado.surpresaArmada !== tipo || estado.surpresaArmadaDia !== diaSessao) return false;
  if (estado.surpresaDia === diaSessao) return false;
  const treino = treinoDoDia(TREINOS, diaSessao);
  return !!treino && treino.id === tipo;
}

function marcarSurpresa(tipo, diaSessao) {
  if (estado.surpresaArmadaDia && estado.surpresaArmadaDia !== diaSessao) limparSurpresaArmada();
  if (!surpresaPronta(tipo, diaSessao)) {
    if (estado.surpresaArmada === tipo && estado.surpresaArmadaDia === diaSessao) limparSurpresaArmada();
    return false;
  }
  limparSurpresaArmada();
  if (estado.surpresaDia === diaAnterior(diaSessao)) estado.surpresaStreak = num(estado.surpresaStreak) + 1;
  else estado.surpresaStreak = 1;
  if (estado.surpresaStreak > 9999) estado.surpresaStreak = 9999;
  estado.surpresaDia = diaSessao;
  estado.recordeSurpresa = Math.max(num(estado.recordeSurpresa), estado.surpresaStreak);
  if (Object.prototype.hasOwnProperty.call(estado.stats, 'surpresas')) estado.stats.surpresas++;
  return true;
}

export function armarSurpresa(id) {
  const texto = String(id || '');
  if (!texto || texto.length > 40 || !chaveSegura(texto)) return false;
  const treino = treinoDoDia(TREINOS, hoje());
  if (!treino || treino.id !== texto) return false;
  estado.surpresaArmada = texto;
  estado.surpresaArmadaDia = hoje();
  salvar();
  return true;
}

export function resumoSurpresa(dia = hoje()) {
  const treino = treinoDoDia(TREINOS, dia);
  const feito = estado.surpresaDia === dia;
  const viva = feito || estado.surpresaDia === diaAnterior(dia);
  return {
    treino,
    feito,
    sequencia: viva ? num(estado.surpresaStreak) : 0,
    recorde: num(estado.recordeSurpresa)
  };
}

function fecharPratica(d, diaSessao, nivelAntes, metaAntes, streakAntes, usouProtetor, missao) {
  if (d.nota != null && d.nota !== '') {
    anotarPainel(d.nota, d.acertos, d.respostas, {
      segundos: d.segundos,
      grupo: grupoDoTipo(d.tipo),
      muletas: d.muletas
    });
    marcarMetaFala(diaSessao);
  }
  somarErrosFala(d.errosFala);
  const bonusSurpresa = marcarSurpresa(d.tipo, diaSessao) ? 10 : 0;
  estado.xp += d.xp + missao.bonus + bonusSurpresa;
  registrarDia(d.xp + missao.bonus + bonusSurpresa, diaSessao);
  estado.stats.acertos += num(d.acertos);
  estado.stats.respostas += num(d.respostas);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

export function registrarDialogo(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'dialogo' }, diaSessao);
  estado.stats.dialogos++;
  if (d.ramo) estado.stats.ramos++;
  if (!estado.conversas || typeof estado.conversas !== 'object') estado.conversas = {};
  const id = typeof d.id === 'string' && chaveSegura(d.id) ? d.id : '';
  if (id) {
    const atual = estado.conversas[id] ?? { vezes: 0, melhor: 0 };
    estado.conversas[id] = {
      vezes: num(atual.vezes) + 1,
      melhor: Math.max(num(atual.melhor), Math.max(0, Math.min(num(d.nota), 100)))
    };
  }
  return fecharPratica(d, diaSessao, nivelAntes, metaAntes, streakAntes, usouProtetor, missao);
}

function registrarTipo(stat, tipo, d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo, surpresa: surpresaPronta(tipo, diaSessao) }, diaSessao);
  if (stat && Object.prototype.hasOwnProperty.call(estado.stats, stat)) estado.stats[stat]++;
  return fecharPratica({ ...d, tipo }, diaSessao, nivelAntes, metaAntes, streakAntes, usouProtetor, missao);
}

export function registrarNivel(d) {
  const anterior = nivelValido(estado.nivelFala);
  const proximo = nivelValido(d?.nivel);
  if (!proximo) return { badges: [], bonusMissoes: 0 };
  estado.nivelFala = proximo;
  if (anterior) {
    checarBadges();
    salvar();
    return { badges: [], bonusMissoes: 0 };
  }
  return registrarTipo(null, 'nivel', d);
}

export function registrarPergunta(d) {
  return registrarTipo('perguntas', 'pergunta', d);
}

export function registrarReducao(d) {
  return registrarTipo('reduzidas', 'reducao', d);
}

export function registrarVerbo(d) {
  return registrarTipo('verbosFala', 'verbo', d);
}

export function registrarLivre(d) {
  return registrarTipo('livres', 'livre', d);
}

export function registrarTecnico(d) {
  return registrarTipo('tecnicos', 'tecnico', d);
}

export function registrarIdioma(d) {
  return registrarTipo('idiomas', 'idioma', d);
}

export function registrarPerguntaDia(d) {
  const diaSessao = hoje();
  if (!estado.perguntaDia || diaSessao > estado.perguntaDia) estado.perguntaDia = diaSessao;
  return registrarTipo('diasPergunta', 'perguntaDia', d);
}

export function registrarDeslize(d) {
  return registrarTipo('revisoesFala', 'deslize', d);
}

export function registrarEntrevista(d) {
  return registrarTipo('entrevistas', 'remoto', d);
}

export function registrarConto(d) {
  return registrarTipo('contos', 'conto', d);
}

export function registrarNumero(d) {
  return registrarTipo('numeros', 'numero', d);
}

export function registrarOpiniao(d) {
  return registrarTipo('opinioes', 'opiniao', d);
}

export function registrarCena(d) {
  return registrarTipo('cenasFala', 'cena', d);
}

export function registrarRapido(d) {
  return registrarTipo('rapidos', 'rapido', d);
}

export function registrarRelato(d) {
  return registrarTipo('relatos', 'relato', d);
}

export function registrarCortesia(d) {
  return registrarTipo('cortesias', 'cortesia', d);
}

export function registrarAquecer(d) {
  return registrarTipo('aquecimentos', 'aquecer', d);
}

export function registrarClaro(d) {
  return registrarTipo('esclarecimentos', 'claro', d);
}

export function registrarDemo(d) {
  return registrarTipo('demos', 'demo', d);
}

export function registrarPrazo(d) {
  return registrarTipo('negociacoes', 'prazo', d);
}

export function registrarStar(d) {
  return registrarTipo('stars', 'star', d);
}

export function registrarEnfase(d) {
  return registrarTipo('enfases', 'enfase', d);
}

export function registrarDecisao(d) {
  return registrarTipo('decisoes', 'decisao', d);
}

export function registrarPar(d) {
  return registrarTipo('pares', 'par', d);
}

export function registrarPlantao(d) {
  return registrarTipo('incidentes', 'plantao', d);
}

export function registrarRetro(d) {
  return registrarTipo('retros', 'retro', d);
}

export function registrarChegada(d) {
  return registrarTipo('chegadas', 'chegada', d);
}

export function registrarLigacao(d) {
  return registrarTipo('ligacoes', 'ligacao', d);
}

export function registrarEstimativa(d) {
  return registrarTipo('estimativas', 'estimativa', d);
}

export function registrarConsenso(d) {
  return registrarTipo('consensos', 'consenso', d);
}

export function registrarAtendimento(d) {
  return registrarTipo('atendimentos', 'atendimento', d);
}

export function registrarGestor(d) {
  return registrarTipo('gestores', 'gestor', d);
}

export function registrarFinal(d) {
  return registrarTipo('finais', 'final', d);
}

export function registrarViagem(d) {
  return registrarTipo('viagens', 'viagem', d);
}

export function registrarMistura(d) {
  return registrarTipo('misturas', 'mistura', d);
}

export function registrarLinha(d) {
  return registrarTipo('linhas', 'linha', d);
}

export function registrarSlack(d) {
  return registrarTipo('slacks', 'slack', d);
}

export function registrarSocial(d) {
  return registrarTipo('sociais', 'social', d);
}

export function registrarTermo(d) {
  return registrarTipo('termos', 'termo', d);
}

export function registrarSalario(d) {
  return registrarTipo('salarios', 'salario', d);
}

export function registrarProjeto(d) {
  return registrarTipo('projetos', 'projeto', d);
}

export function registrarSotaque(d) {
  return registrarTipo('sotaques', 'sotaque', d);
}

export function resumoDesafio(d = hoje()) {
  const feito = estado.diaDesafio === d;
  const viva = feito || estado.diaDesafio === diaAnterior(d);
  const sequencia = viva ? estado.sequenciaDesafio : 0;
  const entrando = feito ? Math.max(0, sequencia - 1) : sequencia;
  return {
    feito,
    sequencia,
    entrando,
    recorde: estado.recordeDesafio,
    frases: frasesDoDesafio(entrando)
  };
}

export function registrarDesafioDia(d) {
  const diaSessao = hoje();
  if (estado.diaDesafio !== diaSessao) {
    if (estado.diaDesafio === diaAnterior(diaSessao)) estado.sequenciaDesafio = num(estado.sequenciaDesafio) + 1;
    else estado.sequenciaDesafio = 1;
    estado.diaDesafio = diaSessao;
    estado.recordeDesafio = Math.max(num(estado.recordeDesafio), estado.sequenciaDesafio);
  }
  return registrarTipo('desafios', 'desafioDia', d);
}

export function registrarRequisito(d) {
  return registrarTipo('requisitos', 'requisito', d);
}

export function registrarMetrica(d) {
  return registrarTipo('metricas', 'metrica', d);
}

export function registrarAprendizado(d) {
  return registrarTipo('aprendizados', 'aprendizado', d);
}

export function registrarPasseio(d) {
  return registrarTipo('passeios', 'passeio', d);
}

export function registrarFalha(d) {
  return registrarTipo('falhas', 'falha', d);
}

export function registrarMentoria(d) {
  return registrarTipo('mentorias', 'mentoria', d);
}

export function registrarSocorro(d) {
  return registrarTipo('socorros', 'socorro', d);
}

export function registrarPalestra(d) {
  return registrarTipo('palestras', 'palestra', d);
}

export function registrarDuvida(d) {
  return registrarTipo('duvidas', 'duvida', d);
}

export function registrarSinal(d) {
  return registrarTipo('sinais', 'sinal', d);
}

export function registrarSistema(d) {
  return registrarTipo('sistemas', 'sistema', d);
}

export function registrarCodigo(d) {
  return registrarTipo('codigos', 'codigo', d);
}

export function registrarColega(d) {
  return registrarTipo('colegas', 'colega', d);
}

export function registrarSimulado(d) {
  return registrarTipo('simulados', 'simulado', d);
}

export function registrarModelo(d) {
  return registrarTipo('modelos', 'modelo', d);
}

export function registrarFuro(d) {
  return registrarTipo('furos', 'furo', d);
}

export function registrarRotina(d) {
  return registrarTipo('rotinas', 'rotina', d);
}

export function registrarPapo(d) {
  return registrarTipo('papos', 'papo', d);
}

export function registrarFuturo(d) {
  return registrarTipo('futuros', 'futuro', d);
}

export function registrarCultura(d) {
  return registrarTipo('culturas', 'cultura', d);
}

export function registrarAumento(d) {
  return registrarTipo('aumentos', 'aumento', d);
}

export function registrarRota(d) {
  return registrarTipo('rotas', 'rota', d);
}

export function registrarVivo(d) {
  return registrarTipo('vivos', 'vivo', d);
}

export function registrarProduto(d) {
  return registrarTipo('produtos', 'produto', d);
}

export function registrarFecho(d) {
  return registrarTipo('fechos', 'fecho', d);
}

export function registrarEspaco(d) {
  return registrarTipo('espacos', 'espaco', d);
}

export function registrarMapa(d) {
  return registrarTipo('mapas', 'mapa', d);
}

export function registrarDuro(d) {
  return registrarTipo('duros', 'duro', d);
}

export function registrarProposta(d) {
  return registrarTipo('propostas', 'proposta', d);
}

export function registrarNarrar(d) {
  return registrarTipo('narras', 'narrar', d);
}

export function registrarBanco(d) {
  return registrarTipo('bancos', 'banco', d);
}

export function registrarRecusa(d) {
  return registrarTipo('recusas', 'recusa', d);
}

export function registrarSprint(d) {
  return registrarTipo('sprints', 'sprint', d);
}

export function registrarSeguro(d) {
  return registrarTipo('seguros', 'seguro', d);
}

export function registrarMeetup(d) {
  return registrarTipo('meetups', 'meetup', d);
}

export function registrarCompleta(d) {
  return registrarTipo('completas', 'completa', d);
}

export function registrarRodada(d) {
  return registrarTipo('rodadas', 'rodada', d);
}

export function registrarMigra(d) {
  return registrarTipo('migras', 'migra', d);
}

export function registrarEstreia(d) {
  return registrarTipo('estreias', 'estreia', d);
}

export function registrarFoco(d) {
  const foco = typeof d?.foco === 'string' ? d.foco : '';
  if (FOCOS_NOTA.includes(foco) && d?.nota != null && d.nota !== '') anotarFoco(hoje(), foco, d.nota);
  return registrarTipo('focos', 'foco', d);
}

export function registrarPoker(d) {
  return registrarTipo('pokers', 'poker', d);
}

export function registrarLeigo(d) {
  return registrarTipo('leigos', 'leigo', d);
}

export function registrarRecruta(d) {
  return registrarTipo('recrutas', 'recruta', d);
}

export function registrarCulpa(d) {
  return registrarTipo('culpas', 'culpa', d);
}

export function registrarRaio(d) {
  return registrarTipo('raios', 'raio', d);
}

export function registrarOferta(d) {
  return registrarTipo('ofertas', 'oferta', d);
}

export function registrarPedido(d) {
  return registrarTipo('pedidos', 'pedido', d);
}

export function registrarCobertura(d) {
  return registrarTipo('coberturas', 'cobertura', d);
}

export function registrarLoom(d) {
  return registrarTipo('looms', 'loom', d);
}

export function registrarCaderno(d) {
  return registrarTipo('cadernos', 'caderno', d);
}

export function registrarGrafico(d) {
  return registrarTipo('graficos', 'grafico', d);
}

export function registrarHandoff(d) {
  return registrarTipo('handoffs', 'handoff', d);
}

export function registrarElevador(d) {
  return registrarTipo('elevadores', 'elevador', d);
}

export function registrarJunta(d) {
  return registrarTipo('juntas', 'junta', d);
}

export function registrarPista(d) {
  return registrarTipo('pistas', 'pista', d);
}

export function registrarCalma(d) {
  return registrarTipo('calmas', 'calma', d);
}

export function registrarFolga(d) {
  return registrarTipo('folgas', 'folga', d);
}

export function registrarAberta(d) {
  return registrarTipo('abertas', 'abertas', d);
}

export function registrarRespeito(d) {
  return registrarTipo('respeitos', 'respeito', d);
}

export function registrarDebito(d) {
  return registrarTipo('debitos', 'debito', d);
}

export function registrarIndicacao(d) {
  return registrarTipo('indicacoes', 'indicacao', d);
}

export function registrarUx(d) {
  return registrarTipo('uxs', 'ux', d);
}

export function registrarForum(d) {
  return registrarTipo('foruns', 'forum', d);
}

export function registrarVisto(d) {
  return registrarTipo('vistos', 'visto', d);
}

export function registrarMes(d) {
  return registrarTipo('meses', 'mes', d);
}

export function registrarFacil(d) {
  return registrarTipo('facils', 'facil', d);
}

export function registrarEscolhaStack(d) {
  return registrarTipo('stacks', 'stack', d);
}

export function registrarSabado(d) {
  return registrarTipo('sabados', 'sabado', d);
}

export function registrarTreino(tipo, d) {
  const treino = TREINOS.find(t => t.id === tipo);
  return registrarTipo(treino?.stat || null, tipo, d);
}

export function registrarBrecha(d) {
  return registrarTipo('brechas', 'brecha', d);
}

export function registrarMuda(d) {
  return registrarTipo('mudas', 'muda', d);
}

export function registrarGaucho(d) {
  return registrarTipo('gauchos', 'gaucho', d);
}

export function registrarRadar(d) {
  return registrarTipo('radares', 'radar', d);
}

export function registrarAplauso(d) {
  return registrarTipo('aplausos', 'aplauso', d);
}

export function registrarGripe(d) {
  return registrarTipo('gripes', 'gripe', d);
}

export function registrarPm(d) {
  return registrarTipo('pms', 'pm', d);
}

export function registrarLaudo(d) {
  return registrarTipo('laudos', 'laudo', d);
}

export function registrarRumo(d) {
  return registrarTipo('rumos', 'rumo', d);
}

export function registrarAcesso(d) {
  return registrarTipo('acessos', 'acesso', d);
}

export function registrarLicenca(d) {
  return registrarTipo('licencas', 'licenca', d);
}

export function registrarJargao(d) {
  return registrarTipo('jargoes', 'jargao', d);
}

export function registrarBandeira(d) {
  return registrarTipo('bandeiras', 'bandeira', d);
}

export function registrarGelo(d) {
  return registrarTipo('gelos', 'gelo', d);
}

export function registrarLimite(d) {
  return registrarTipo('limites', 'limite', d);
}

export function registrarCanario(d) {
  return registrarTipo('canarios', 'canario', d);
}

export function registrarDespedida(d) {
  return registrarTipo('despedidas', 'despedida', d);
}

export function registrarRepeticao(d) {
  return registrarTipo('repeticoes', 'repeticao', d);
}

export function registrarCarga(d) {
  return registrarTipo('cargas', 'carga', d);
}

export function registrarBoletim(d) {
  return registrarTipo('boletins', 'boletim', d);
}

export function registrarDono(d) {
  return registrarTipo('donos', 'dono', d);
}

export function registrarManual(d) {
  return registrarTipo('manuais', 'manual', d);
}

export function registrarVerde(d) {
  return registrarTipo('verdes', 'verde', d);
}

export function registrarCertificado(d) {
  return registrarTipo('certificados', 'certificado', d);
}

export function registrarRebase(d) {
  return registrarTipo('rebases', 'rebase', d);
}

export function registrarConsulta(d) {
  return registrarTipo('consultas', 'consulta', d);
}

export function registrarReplica(d) {
  return registrarTipo('replicas', 'replica', d);
}

export function registrarEnsaio(d) {
  return registrarTipo('ensaios', 'ensaio', d);
}

export function registrarDisco(d) {
  return registrarTipo('discos', 'disco', d);
}

export function registrarPagina(d) {
  return registrarTipo('paginas', 'pagina', d);
}

export function registrarSquash(d) {
  return registrarTipo('squashes', 'squash', d);
}

export function registrarCircuito(d) {
  return registrarTipo('circuitos', 'circuito', d);
}

export function registrarJob(d) {
  return registrarTipo('jobs', 'job', d);
}

export function registrarColheita(d) {
  return registrarTipo('colheitas', 'colheita', d);
}

export function registrarSessao(d) {
  return registrarTipo('sessoes', 'sessao', d);
}

export function registrarTanque(d) {
  return registrarTipo('tanques', 'tanque', d);
}

export function registrarSonda(d) {
  return registrarTipo('sondas', 'sonda', d);
}

export function registrarSemente(d) {
  return registrarTipo('sementes', 'semente', d);
}

export function registrarRegistro(d) {
  return registrarTipo('registros', 'registro', d);
}

export function registrarRastro(d) {
  return registrarTipo('rastros', 'rastro', d);
}

export function registrarParada(d) {
  return registrarTipo('paradas', 'parada', d);
}

export function registrarPod(d) {
  return registrarTipo('pods', 'pod', d);
}

export function registrarLint(d) {
  return registrarTipo('lints', 'lint', d);
}

export function registrarOrigem(d) {
  return registrarTipo('origens', 'origem', d);
}

export function registrarLink(d) {
  return registrarTipo('links', 'link', d);
}

export function registrarCpu(d) {
  return registrarTipo('cpus', 'cpu', d);
}

export function registrarCopia(d) {
  return registrarTipo('copias', 'copia', d);
}

export function registrarEstouro(d) {
  return registrarTipo('estouros', 'estouro', d);
}

export function registrarImpasse(d) {
  return registrarTipo('impasses', 'impasse', d);
}

export function registrarDominio(d) {
  return registrarTipo('dominios', 'dominio', d);
}

export function registrarMorta(d) {
  return registrarTipo('mortas', 'morta', d);
}

export function registrarPonteiro(d) {
  return registrarTipo('ponteiros', 'ponteiro', d);
}

export function registrarEleicao(d) {
  return registrarTipo('eleicoes', 'eleicao', d);
}

export function registrarFreio(d) {
  return registrarTipo('freios', 'freio', d);
}

export function registrarPausa(d) {
  return registrarTipo('pausas', 'pausa', d);
}

export function registrarDeriva(d) {
  return registrarTipo('derivas', 'deriva', d);
}

export function registrarDescritor(d) {
  return registrarTipo('descritores', 'descritor', d);
}

export function registrarReserva(d) {
  return registrarTipo('reservas', 'reserva', d);
}

export function registrarVarredura(d) {
  return registrarTipo('varreduras', 'varredura', d);
}

export function registrarPorta(d) {
  return registrarTipo('portas', 'porta', d);
}

export function registrarInodo(d) {
  return registrarTipo('inodos', 'inodo', d);
}

export function registrarSaida(d) {
  return registrarTipo('saidas', 'saida', d);
}

export function registrarManada(d) {
  return registrarTipo('manadas', 'manada', d);
}

export function registrarGotejo(d) {
  return registrarTipo('gotejos', 'gotejo', d);
}

export function registrarFrio(d) {
  return registrarTipo('frios', 'frio', d);
}

export function registrarCadeado(d) {
  return registrarTipo('cadeados', 'cadeado', d);
}

export function registrarCota(d) {
  return registrarTipo('cotas', 'cota', d);
}

export function registrarCiclo(d) {
  return registrarTipo('ciclos', 'ciclo', d);
}

export function registrarZumbi(d) {
  return registrarTipo('zumbis', 'zumbi', d);
}

export function registrarCisao(d) {
  return registrarTipo('cisoes', 'cisao', d);
}

export function registrarRajada(d) {
  return registrarTipo('rajadas', 'rajada', d);
}

export function registrarBrasa(d) {
  return registrarTipo('brasas', 'brasa', d);
}

export function registrarDatagrama(d) {
  return registrarTipo('datagramas', 'datagrama', d);
}

export function registrarPasse(d) {
  return registrarTipo('passes', 'passe', d);
}

export function registrarCarimbo(d) {
  return registrarTipo('carimbos', 'carimbo', d);
}

export function registrarPilha(d) {
  return registrarTipo('pilhas', 'pilha', d);
}

export function registrarCano(d) {
  return registrarTipo('canos', 'cano', d);
}

export function registrarGiro(d) {
  return registrarTipo('giros', 'giro', d);
}

export function registrarCompacta(d) {
  return registrarTipo('compactas', 'compacta', d);
}

export function registrarDiario(d) {
  return registrarTipo('diarios', 'diario', d);
}

export function registrarVagao(d) {
  return registrarTipo('vagoes', 'vagao', d);
}

export function registrarCorrida(d) {
  return registrarTipo('corridas', 'corrida', d);
}

export function registrarIndice(d) {
  return registrarTipo('indices', 'indice', d);
}

export function registrarPercentil(d) {
  return registrarTipo('percentis', 'percentil', d);
}

export function registrarSegredo(d) {
  return registrarTipo('segredos', 'segredo', d);
}

export function registrarFantasma(d) {
  return registrarTipo('fantasmas', 'fantasma', d);
}

export function registrarInteiro(d) {
  return registrarTipo('inteiros', 'inteiro', d);
}

export function registrarFiltro(d) {
  return registrarTipo('filtros', 'filtro', d);
}

export function registrarOrdem(d) {
  return registrarTipo('ordens', 'ordem', d);
}

export function registrarProva(d) {
  return registrarTipo('provas', 'prova', d);
}

export function registrarOrfao(d) {
  return registrarTipo('orfaos', 'orfao', d);
}

export function registrarAceno(d) {
  return registrarTipo('acenos', 'aceno', d);
}

export function registrarGasto(d) {
  return registrarTipo('gastos', 'gasto', d);
}

export function registrarInstavel(d) {
  return registrarTipo('instaveis', 'instavel', d);
}

export function registrarDuplicado(d) {
  return registrarTipo('duplicados', 'duplicado', d);
}

export function registrarApagao(d) {
  return registrarTipo('apagoes', 'apagao', d);
}

export function registrarReplay(d) {
  return registrarTipo('replays', 'replay', d);
}

export function registrarEco(d) {
  return registrarTipo('ecos', 'eco', d);
}

export function registrarLeque(d) {
  return registrarTipo('leques', 'leque', d);
}

export function registrarSaga(d) {
  return registrarTipo('sagas', 'saga', d);
}

export function registrarCaixa(d) {
  return registrarTipo('caixas', 'caixa', d);
}

export function registrarApagado(d) {
  return registrarTipo('apagados', 'apagado', d);
}

export function registrarEspera(d) {
  return registrarTipo('esperas', 'espera', d);
}

export function registrarCursor(d) {
  return registrarTipo('cursores', 'cursor', d);
}

export function registrarFila(d) {
  return registrarTipo('filas', 'fila', d);
}

export function registrarDisjuntor(d) {
  return registrarTipo('disjuntores', 'disjuntor', d);
}

export function registrarAluguel(d) {
  return registrarTipo('alugueis', 'aluguel', d);
}

export function registrarPulso(d) {
  return registrarTipo('pulsos', 'pulso', d);
}

export function registrarPiscina(d) {
  return registrarTipo('piscinas', 'piscina', d);
}

export function registrarBalde(d) {
  return registrarTipo('baldes', 'balde', d);
}

export function registrarCerca(d) {
  return registrarTipo('cercas', 'cerca', d);
}

export function registrarTremor(d) {
  return registrarTipo('tremores', 'tremor', d);
}

export function registrarPortaria(d) {
  return registrarTipo('portarias', 'portaria', d);
}

export function registrarCola(d) {
  return registrarTipo('colas', 'cola', d);
}

export function registrarAnteparo(d) {
  return registrarTipo('anteparos', 'anteparo', d);
}

export function registrarDescarte(d) {
  return registrarTipo('descartes', 'descarte', d);
}

export function registrarCronometro(d) {
  return registrarTipo('cronometros', 'cronometro', d);
}

export function registrarAmostra(d) {
  return registrarTipo('amostras', 'amostra', d);
}

export function registrarNicho(d) {
  return registrarTipo('nichos', 'nicho', d);
}

export function registrarLacre(d) {
  return registrarTipo('lacres', 'lacre', d);
}

export function registrarSemaforo(d) {
  return registrarTipo('semaforos', 'semaforo', d);
}

export function registrarBarreira(d) {
  return registrarTipo('barreiras', 'barreira', d);
}

export function registrarTrinco(d) {
  return registrarTipo('trincos', 'trinco', d);
}

export function registrarRecuo(d) {
  return registrarTipo('recuos', 'recuo', d);
}

export function registrarVigia(d) {
  return registrarTipo('vigias', 'vigia', d);
}

export function registrarAmpulheta(d) {
  return registrarTipo('ampulhetas', 'ampulheta', d);
}

export function registrarCarona(d) {
  return registrarTipo('caronas', 'carona', d);
}

export function registrarVeneno(d) {
  return registrarTipo('venenos', 'veneno', d);
}

export function registrarFarol(d) {
  return registrarTipo('farois', 'farol', d);
}

export function registrarAncora(d) {
  return registrarTipo('ancoras', 'ancora', d);
}

export function registrarMalha(d) {
  return registrarTipo('malhas', 'malha', d);
}

export function registrarFenda(d) {
  return registrarTipo('fendas', 'fenda', d);
}

export function registrarCofre(d) {
  return registrarTipo('cofres', 'cofre', d);
}

export function registrarAudiencia(d) {
  return registrarTipo('audiencias', 'audiencia', d);
}

export function registrarRevogacao(d) {
  return registrarTipo('revogacoes', 'revogacao', d);
}

export function registrarQuorum(d) {
  return registrarTipo('quoruns', 'quorum', d);
}

export function registrarMaioria(d) {
  return registrarTipo('maiorias', 'maioria', d);
}

export function registrarArbitro(d) {
  return registrarTipo('arbitros', 'arbitro', d);
}

export function registrarLider(d) {
  return registrarTipo('lideres', 'lider', d);
}

export function registrarMandato(d) {
  return registrarTipo('mandatos', 'mandato', d);
}

export function registrarSeguidor(d) {
  return registrarTipo('seguidores', 'seguidor', d);
}

export function registrarOrquestrador(d) {
  return registrarTipo('orquestradores', 'orquestrador', d);
}

export function registrarCoreografia(d) {
  return registrarTipo('coreografias', 'coreografia', d);
}

export function registrarCompensacao(d) {
  return registrarTipo('compensacoes', 'compensacao', d);
}

export function registrarPrimario(d) {
  return registrarTipo('primarios', 'primario', d);
}

export function registrarEspelho(d) {
  return registrarTipo('espelhos', 'espelho', d);
}

export function registrarAscensao(d) {
  return registrarTipo('ascensoes', 'ascensao', d);
}

export function registrarTravessia(d) {
  return registrarTipo('travessias', 'travessia', d);
}

export function registrarRetaguarda(d) {
  return registrarTipo('retaguardas', 'retaguarda', d);
}

export function registrarContorno(d) {
  return registrarTipo('contornos', 'contorno', d);
}

export function registrarRumor(d) {
  return registrarTipo('rumores', 'rumor', d);
}

export function registrarReparo(d) {
  return registrarTipo('reparos', 'reparo', d);
}

export function registrarDeixa(d) {
  return registrarTipo('deixas', 'deixa', d);
}

export function registrarFloco(d) {
  return registrarTipo('flocos', 'floco', d);
}

export function registrarEpoca(d) {
  return registrarTipo('epocas', 'epoca', d);
}

export function registrarVetor(d) {
  return registrarTipo('vetores', 'vetor', d);
}

export function registrarSujeira(d) {
  return registrarTipo('sujeiras', 'sujeira', d);
}

export function registrarInstantaneo(d) {
  return registrarTipo('instantaneos', 'instantaneo', d);
}

export function registrarSerial(d) {
  return registrarTipo('seriais', 'serial', d);
}

export function registrarFome(d) {
  return registrarTipo('fomes', 'fome', d);
}

export function registrarInversao(d) {
  return registrarTipo('inversoes', 'inversao', d);
}

export function registrarIdade(d) {
  return registrarTipo('idades', 'idade', d);
}

export function registrarSidecar(d) {
  return registrarTipo('sidecars', 'sidecar', d);
}

export function registrarEmbaixador(d) {
  return registrarTipo('embaixadores', 'embaixador', d);
}

export function registrarAdaptador(d) {
  return registrarTipo('adaptadores', 'adaptador', d);
}

export function registrarBizantino(d) {
  return registrarTipo('bizantinos', 'bizantino', d);
}

export function registrarParticao(d) {
  return registrarTipo('particoes', 'particao', d);
}

export function registrarGeneral(d) {
  return registrarTipo('generais', 'general', d);
}

export function registrarWal(d) {
  return registrarTipo('wals', 'wal', d);
}

export function registrarLsn(d) {
  return registrarTipo('lsns', 'lsn', d);
}

export function registrarCheckpoint(d) {
  return registrarTipo('checkpoints', 'checkpoint', d);
}

export function registrarNonce(d) {
  return registrarTipo('nonces', 'nonce', d);
}

export function registrarHmac(d) {
  return registrarTipo('hmacs', 'hmac', d);
}

export function registrarEnvelope(d) {
  return registrarTipo('envelopes', 'envelope', d);
}

export function registrarLease(d) {
  return registrarTipo('leases', 'lease', d);
}

export function registrarRenovacao(d) {
  return registrarTipo('renovacoes', 'renovacao', d);
}

export function registrarVencimento(d) {
  return registrarTipo('vencimentos', 'vencimento', d);
}

export function registrarOutbox(d) {
  return registrarTipo('outboxes', 'outbox', d);
}

export function registrarInbox(d) {
  return registrarTipo('inboxes', 'inbox', d);
}

export function registrarRelay(d) {
  return registrarTipo('relays', 'relay', d);
}

export function registrarOffset(d) {
  return registrarTipo('offsets', 'offset', d);
}

export function registrarLag(d) {
  return registrarTipo('lags', 'lag', d);
}

export function registrarAck(d) {
  return registrarTipo('acks', 'ack', d);
}

export function registrarSnapshot(d) {
  return registrarTipo('snapshots', 'snapshot', d);
}

export function registrarRestore(d) {
  return registrarTipo('restores', 'restore', d);
}

export function registrarPromote(d) {
  return registrarTipo('promotes', 'promote', d);
}

export function registrarBloom(d) {
  return registrarTipo('blooms', 'bloom', d);
}

export function registrarCuco(d) {
  return registrarTipo('cucos', 'cuco', d);
}

export function registrarEsboco(d) {
  return registrarTipo('esbocos', 'esboco', d);
}

export function registrarMerkle(d) {
  return registrarTipo('merkles', 'merkle', d);
}

export function registrarRadix(d) {
  return registrarTipo('radixes', 'radix', d);
}

export function registrarTrie(d) {
  return registrarTipo('tries', 'trie', d);
}

export function registrarGossip(d) {
  return registrarTipo('gossips', 'gossip', d);
}

export function registrarPhi(d) {
  return registrarTipo('phis', 'phi', d);
}

export function registrarAccrual(d) {
  return registrarTipo('accruals', 'accrual', d);
}

export function registrarHint(d) {
  return registrarTipo('hints', 'hint', d);
}

export function registrarVacuum(d) {
  return registrarTipo('vacuums', 'vacuum', d);
}

export function registrarFreeze(d) {
  return registrarTipo('freezes', 'freeze', d);
}

export function registrarBitmap(d) {
  return registrarTipo('bitmaps', 'bitmap', d);
}

export function registrarRoaring(d) {
  return registrarTipo('roarings', 'roaring', d);
}

export function registrarHyper(d) {
  return registrarTipo('hypers', 'hyper', d);
}

export function registrarCrdt(d) {
  return registrarTipo('crdts', 'crdt', d);
}

export function registrarLww(d) {
  return registrarTipo('lwws', 'lww', d);
}

export function registrarOrset(d) {
  return registrarTipo('orsets', 'orset', d);
}

export function registrarVector(d) {
  return registrarTipo('vectors', 'vector', d);
}

export function registrarDot(d) {
  return registrarTipo('dots', 'dot', d);
}

export function registrarCausal(d) {
  return registrarTipo('causals', 'causal', d);
}

export function registrarShard(d) {
  return registrarTipo('shards', 'shard', d);
}

export function registrarRebalance(d) {
  return registrarTipo('rebalances', 'rebalance', d);
}

export function registrarSplit(d) {
  return registrarTipo('splits', 'split', d);
}

export function registrarWatermark(d) {
  return registrarTipo('watermarks', 'watermark', d);
}

export function registrarBarrier(d) {
  return registrarTipo('barriers', 'barrier', d);
}

export function registrarAlign(d) {
  return registrarTipo('aligns', 'align', d);
}

export function registrarWitness(d) {
  return registrarTipo('witnesses', 'witness', d);
}

export function registrarVoter(d) {
  return registrarTipo('voters', 'voter', d);
}

export function registrarLearner(d) {
  return registrarTipo('learners', 'learner', d);
}

export function registrarChecksum(d) {
  return registrarTipo('checksums', 'checksum', d);
}

export function registrarBulkhead(d) {
  return registrarTipo('bulkheads', 'bulkhead', d);
}

export function registrarFallback(d) {
  return registrarTipo('fallbacks', 'fallback', d);
}

export function registrarTombstone(d) {
  return registrarTipo('tombstones', 'tombstone', d);
}

export function registrarPurge(d) {
  return registrarTipo('purges', 'purge', d);
}

export function registrarReclaim(d) {
  return registrarTipo('reclaims', 'reclaim', d);
}

export function registrarJournal(d) {
  return registrarTipo('journals', 'journal', d);
}

export function registrarSegment(d) {
  return registrarTipo('segments', 'segment', d);
}

export function registrarSpill(d) {
  return registrarTipo('spills', 'spill', d);
}

export function registrarStripe(d) {
  return registrarTipo('stripes', 'stripe', d);
}

export function registrarParity(d) {
  return registrarTipo('parities', 'parity', d);
}

export function registrarRebuild(d) {
  return registrarTipo('rebuilds', 'rebuild', d);
}

export function registrarEpoch(d) {
  return registrarTipo('epochs', 'epoch', d);
}

export function registrarBallot(d) {
  return registrarTipo('ballots', 'ballot', d);
}

export function registrarFence(d) {
  return registrarTipo('fences', 'fence', d);
}

export function registrarFlush(d) {
  return registrarTipo('flushes', 'flush', d);
}

export function registrarMemtable(d) {
  return registrarTipo('memtables', 'memtable', d);
}

export function registrarExtent(d) {
  return registrarTipo('extents', 'extent', d);
}

export function registrarManifest(d) {
  return registrarTipo('manifests', 'manifest', d);
}

export function registrarHedge(d) {
  return registrarTipo('hedges', 'hedge', d);
}

export function registrarDebounce(d) {
  return registrarTipo('debounces', 'debounce', d);
}

export function registrarSstable(d) {
  return registrarTipo('sstables', 'sstable', d);
}

export function registrarLatch(d) {
  return registrarTipo('latches', 'latch', d);
}

export function registrarThrottle(d) {
  return registrarTipo('throttles', 'throttle', d);
}

export function registrarIterator(d) {
  return registrarTipo('iterators', 'iterator', d);
}

export function registrarPager(d) {
  return registrarTipo('pagers', 'pager', d);
}

export function registrarEvict(d) {
  return registrarTipo('evicts', 'evict', d);
}

export function registrarHistogram(d) {
  return registrarTipo('histograms', 'histogram', d);
}

export function registrarGauge(d) {
  return registrarTipo('gauges', 'gauge', d);
}

export function registrarBackfill(d) {
  return registrarTipo('backfills', 'backfill', d);
}

export function registrarSkew(d) {
  return registrarTipo('skews', 'skew', d);
}

export function registrarHotspot(d) {
  return registrarTipo('hotspots', 'hotspot', d);
}

export function registrarTail(d) {
  return registrarTipo('tails', 'tail', d);
}

export function registrarSlo(d) {
  return registrarTipo('slos', 'slo', d);
}

export function registrarSli(d) {
  return registrarTipo('slis', 'sli', d);
}

export function registrarProbe(d) {
  return registrarTipo('probes', 'probe', d);
}

export function registrarTrace(d) {
  return registrarTipo('traces', 'trace', d);
}

export function registrarScrape(d) {
  return registrarTipo('scrapes', 'scrape', d);
}

export function registrarRollup(d) {
  return registrarTipo('rollups', 'rollup', d);
}

export function registrarWebhook(d) {
  return registrarTipo('webhooks', 'webhook', d);
}

export function registrarFanout(d) {
  return registrarTipo('fanouts', 'fanout', d);
}

export function registrarIngest(d) {
  return registrarTipo('ingests', 'ingest', d);
}

export function registrarOtel(d) {
  return registrarTipo('otels', 'otel', d);
}

export function registrarSampler(d) {
  return registrarTipo('samplers', 'sampler', d);
}

export function registrarExemplar(d) {
  return registrarTipo('exemplars', 'exemplar', d);
}

export function registrarEgress(d) {
  return registrarTipo('egresses', 'egress', d);
}

export function registrarGateway(d) {
  return registrarTipo('gateways', 'gateway', d);
}

export function registrarFailover(d) {
  return registrarTipo('failovers', 'failover', d);
}

export function registrarOncall(d) {
  return registrarTipo('oncalls', 'oncall', d);
}

export function registrarSeverity(d) {
  return registrarTipo('severities', 'severity', d);
}

export function registrarIncident(d) {
  return registrarTipo('incidents', 'incident', d);
}

export function estrelaLigada(id) {
  return Array.isArray(estado.estrelas) && estado.estrelas.includes(id);
}

export function alternarEstrela(id) {
  const texto = String(id || '');
  if (!texto || texto.length > 40 || !chaveSegura(texto)) return false;
  if (!TREINOS.some(t => t.id === texto)) return false;
  if (!Array.isArray(estado.estrelas)) estado.estrelas = [];
  const i = estado.estrelas.indexOf(texto);
  if (i >= 0) estado.estrelas.splice(i, 1);
  else if (estado.estrelas.length >= 80) return false;
  else estado.estrelas.push(texto);
  checarBadges();
  salvar();
  return true;
}

export function marcarTreinoAberto(id) {
  const texto = String(id || '');
  if (!TREINOS.some(t => t.id === texto)) return false;
  if (estado.treinoAberto === texto) return true;
  estado.treinoAberto = texto;
  salvar();
  return true;
}

export function definirOrdemHub(modo) {
  const prox = modo === 'menos' ? 'menos' : 'catalogo';
  if (estado.ordemHub === prox) return prox;
  estado.ordemHub = prox;
  salvar();
  return prox;
}

export function marcarEspaco(en, pt) {
  const texto = String(en || '').trim();
  if (texto.length < 8 || texto.length > 120 || !chaveSegura(texto) || texto.split(/\s+/).length < 2) return null;
  if (!estado.agendaFala || typeof estado.agendaFala !== 'object' || Array.isArray(estado.agendaFala)) estado.agendaFala = {};
  if (!estado.agendaFala[texto]) {
    estado.agendaFala[texto] = {
      caixa: 0,
      proxima: hoje(),
      pt: typeof pt === 'string' ? pt.slice(0, 120) : ''
    };
    salvar();
  }
  return { ...estado.agendaFala[texto] };
}

export function registrarPronuncia(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'pronuncia' }, diaSessao);
  estado.stats.pronuncias++;
  return fecharPratica(d, diaSessao, nivelAntes, metaAntes, streakAntes, usouProtetor, missao);
}

export function registrarOuvido(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'ouvido' }, diaSessao);
  estado.stats.ouvidos++;
  return fecharPratica(d, diaSessao, nivelAntes, metaAntes, streakAntes, usouProtetor, missao);
}

export function errosMaisComuns(limite = 5) {
  return (estado.errosFala ?? []).slice(0, limite);
}

export function registrarFala(d) {
  if (!d?.completo) return null;
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'fala' }, diaSessao);
  estado.stats.falas++;
  estado.falaDia = diaSessao;
  aplicarAgendamentos(d.agendamentos);
  return fecharPratica(d, diaSessao, nivelAntes, metaAntes, streakAntes, usouProtetor, missao);
}

export function registrarSombra(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'sombra' }, diaSessao);
  estado.stats.sombra++;
  estado.stats.recordeSombra = Math.max(estado.stats.recordeSombra ?? 0, num(d.nota));
  return fecharPratica(d, diaSessao, nivelAntes, metaAntes, streakAntes, usouProtetor, missao);
}

export function registrarEscuta(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'escuta' }, diaSessao);
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus, diaSessao);
  estado.stats.escutas++;
  estado.stats.recordeEscuta = Math.max(estado.stats.recordeEscuta ?? 0, num(d.acertos));
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  const acertadas = new Set(d.acertadosEn);
  estado.erros = estado.erros.filter(e => !acertadas.has(e.en));
  aplicarAgendamentos(d.agendamentos);
  aplicarDeslizes(d.deslizes, d.agendamentos);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

export function registrarRevisao(d) {
  const diaSessao = hoje();
  const nivelAntes = nivelInfo().numero;
  const metaAntes = metaBatida(diaSessao);
  const streakAntes = streakAtual();
  const { usouProtetor } = atualizarStreak(diaSessao);
  const missao = avancarMissoes({ ...d, tipo: 'revisao' }, diaSessao);
  estado.xp += d.xp + missao.bonus;
  registrarDia(d.xp + missao.bonus, diaSessao);
  estado.stats.revisoes++;
  estado.stats.acertos += d.acertos;
  estado.stats.respostas += d.respostas;
  estado.stats.comboMax = Math.max(estado.stats.comboMax, d.comboMax);
  const acertadas = new Set(d.acertadosEn);
  estado.erros = estado.erros.filter(e => !acertadas.has(e.en));
  aplicarAgendamentos(d.agendamentos);
  aplicarDeslizes(d.deslizes, d.agendamentos);
  contarMetaBatida(metaAntes, diaSessao);
  const novas = checarBadges();
  salvar();
  return {
    badges: novas,
    subiuNivel: nivelInfo().numero > nivelAntes ? nivelInfo() : null,
    bateuMeta: !metaAntes && metaBatida(diaSessao),
    streakNovo: streakAtual() > streakAntes ? streakAtual() : 0,
    usouProtetor,
    missoes: missao.novas,
    bonusMissoes: missao.bonus
  };
}

try {
  if (migrarErros()) salvar();
} catch {}
