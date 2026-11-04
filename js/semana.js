// Minutos de fala e treinos por grupo, na semana corrente.
// A conta é determinística. Nada sai do aparelho.

import { TREINOS, CATEGORIAS } from './hub.js';
import { diasDaSemana } from './fluencia.js';

export const SEGUNDOS_POR_RESPOSTA = 12;
export const TETO_SESSAO = 1800;
export const METAS_MINUTOS = [10, 20, 30, 45];
export const GRUPOS = CATEGORIAS.map(c => c.id);

const ALIAS = { perguntaDia: 'dia', verbo: 'frasal' };
const POR_ID = new Map(TREINOS.map(t => [t.id, t.categoria]));

export function grupoDoTipo(tipo) {
  const id = ALIAS[tipo] || String(tipo || '');
  return POR_ID.get(id) || '';
}

export function segundosDaFala(respostas, segundos) {
  if (Number.isFinite(Number(segundos))) {
    return Math.max(0, Math.min(Math.round(Number(segundos)), TETO_SESSAO));
  }
  const n = Math.max(0, Number(respostas) || 0);
  return Math.min(TETO_SESSAO, n * SEGUNDOS_POR_RESPOSTA);
}

export function somarSemana(painel, diaIso) {
  const grupos = Object.fromEntries(GRUPOS.map(id => [id, 0]));
  let segundos = 0;
  let treinos = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const row = painel?.[data];
    if (!row) continue;
    segundos += Math.max(0, Number(row.segundos) || 0);
    treinos += Math.max(0, Number(row.n) || 0);
    for (const id of GRUPOS) grupos[id] += Math.max(0, Number(row.grupos?.[id]) || 0);
  }
  return {
    segundos,
    minutos: Math.floor(segundos / 60),
    treinos,
    grupos
  };
}

export function textoMinutos(segundos) {
  const min = Math.floor(Math.max(0, Number(segundos) || 0) / 60);
  if (min === 1) return '1 minuto de fala nesta semana.';
  return `${min} minutos de fala nesta semana.`;
}

export function textoGrupo(n, titulo) {
  const q = Math.max(0, Number(n) || 0);
  const nome = q === 1 ? '1 treino' : `${q} treinos`;
  return `${nome} em ${titulo}`;
}

function deslocarIso(iso, dias) {
  const partes = String(iso || '').split('-').map(Number);
  if (partes.length !== 3 || partes.some(n => !Number.isFinite(n))) return '';
  const data = new Date(partes[0], partes[1] - 1, partes[2]);
  data.setDate(data.getDate() + dias);
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function diaAnterior(iso) {
  return deslocarIso(iso, -1);
}

function minutosDosDias(painel, dias) {
  let segundos = 0;
  for (const data of dias) segundos += Math.max(0, Number(painel?.[data]?.segundos) || 0);
  return Math.floor(segundos / 60);
}

function textoMinutosCurtos(n) {
  const min = Math.max(0, Math.floor(Number(n) || 0));
  return min === 1 ? '1 minuto' : `${min} minutos`;
}

function teveFala(painel, iso) {
  return Math.floor(Number(painel?.[iso]?.n) || 0) > 0;
}

export function textoDaSequencia(painel, diaIso) {
  if (!teveFala(painel, diaIso)) {
    if (teveFala(painel, diaAnterior(diaIso))) {
      return { dias: 0, emRisco: true, texto: 'A sequência de ontem ainda vale. Fale hoje para continuar.' };
    }
    return { dias: 0, emRisco: false, texto: 'A sequência de fala ainda não começou.' };
  }
  let dias = 0;
  let cursor = diaIso;
  while (teveFala(painel, cursor) && dias < 400) {
    dias += 1;
    cursor = diaAnterior(cursor);
  }
  const texto = dias === 1 ? '1 dia seguido de fala.' : `${dias} dias seguidos de fala.`;
  return { dias, emRisco: false, texto };
}

export function textoDaComparacao(painel, diaIso) {
  const semana = diasDaSemana(diaIso);
  const indice = semana.indexOf(diaIso);
  if (indice < 0) {
    return { minutos: 0, anterior: 0, delta: 0, atras: false, texto: 'Ainda não há minutos para comparar.' };
  }
  const atuais = semana.slice(0, indice + 1);
  const passados = atuais.map(dia => deslocarIso(dia, -7)).filter(Boolean);
  const minutos = minutosDosDias(painel, atuais);
  const anterior = minutosDosDias(painel, passados);
  const delta = minutos - anterior;
  if (minutos === 0 && anterior === 0) {
    return {
      minutos,
      anterior,
      delta: 0,
      atras: false,
      texto: 'Ainda não há minutos para comparar com a semana anterior.'
    };
  }
  const agora = textoMinutosCurtos(minutos);
  if (delta === 0) {
    return { minutos, anterior, delta, atras: false, texto: `${agora} até aqui, o mesmo da semana anterior.` };
  }
  const n = Math.abs(delta);
  const verbo = n === 1 ? 'É 1' : `São ${n}`;
  const sentido = delta > 0 ? 'a mais' : 'a menos';
  return {
    minutos,
    anterior,
    delta,
    atras: delta < 0,
    texto: `${agora} até aqui. ${verbo} ${sentido} que a semana anterior.`
  };
}

function inteiroNaoNegativo(n) {
  const v = Number(n);
  if (!Number.isFinite(v) || v <= 0) return 0;
  return Math.floor(v);
}

export function textoDoAcerto(painel, diaIso) {
  let acertos = 0;
  let respostas = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    if (!linha) continue;
    acertos += inteiroNaoNegativo(linha.acertos);
    respostas += inteiroNaoNegativo(linha.respostas);
  }
  if (!respostas) {
    return { acertos: 0, respostas: 0, pct: 0, texto: 'Ainda não há respostas nesta semana.' };
  }
  const certos = Math.min(acertos, respostas);
  const pct = Math.round((certos / respostas) * 100);
  return {
    acertos: certos,
    respostas,
    pct,
    texto: `${pct}% de acerto nesta semana. ${certos} de ${respostas}.`
  };
}

const NOMES_DIA = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];

function minutosDoDia(linha) {
  const segundos = Number(linha?.segundos);
  if (!Number.isFinite(segundos) || segundos <= 0) return 0;
  return Math.floor(segundos / 60);
}

export function textoDoPico(painel, diaIso) {
  const dias = diasDaSemana(diaIso);
  let melhor = null;
  let empates = 0;
  dias.forEach((data, i) => {
    if (!data || data > diaIso) return;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    const minutos = minutosDoDia(linha);
    if (!melhor || minutos > melhor.minutos) {
      melhor = { i, minutos };
      empates = 1;
    } else if (minutos === melhor.minutos) empates += 1;
  });
  if (!melhor || melhor.minutos <= 0) {
    return { dia: '', minutos: 0, empate: false, texto: 'Ainda não há um dia mais forte nesta semana.' };
  }
  const dia = NOMES_DIA[melhor.i] || '';
  const tempo = melhor.minutos === 1 ? '1 minuto' : `${melhor.minutos} minutos`;
  const empate = empates > 1;
  const titulo = dia ? dia.charAt(0).toUpperCase() + dia.slice(1) : '';
  const acordo = dia === 'sábado' || dia === 'domingo' ? 'o' : 'a';
  const texto = empate
    ? `${titulo} lidera, empatad${acordo} com outro dia. ${tempo}.`
    : `${titulo} foi o dia com mais fala. ${tempo}.`;
  return { dia, minutos: melhor.minutos, empate, texto };
}

export function textoDoApoio(painel, diaIso) {
  let n = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    if (!linha) continue;
    n += inteiroNaoNegativo(linha.muletas);
  }
  if (!n) return { n: 0, texto: 'Nenhum preenchimento nesta semana.' };
  if (n === 1) return { n: 1, texto: '1 preenchimento nesta semana.' };
  return { n, texto: `${n} preenchimentos nesta semana.` };
}

export function textoDaNota(painel, diaIso) {
  let soma = 0;
  let n = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    if (!linha) continue;
    soma += inteiroNaoNegativo(linha.soma);
    n += inteiroNaoNegativo(linha.n);
  }
  if (!n) return { nota: null, n: 0, texto: 'Ainda não há nota nesta semana.' };
  const nota = Math.min(100, Math.round(soma / n));
  return { nota, n, texto: `A nota desta semana é ${nota}.` };
}

export function textoDosDias(painel, diaIso) {
  let n = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    if (!linha) continue;
    const treinos = inteiroNaoNegativo(linha.n);
    const segundos = inteiroNaoNegativo(linha.segundos);
    if (treinos > 0 || segundos > 0) n += 1;
  }
  if (!n) return { n: 0, texto: 'Nenhum dia com fala nesta semana.' };
  if (n === 1) return { n: 1, texto: '1 dia com fala nesta semana.' };
  return { n, texto: `${n} dias com fala nesta semana.` };
}

export function textoDoRitmo(painel, diaIso) {
  let dias = 0;
  let segundos = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    if (!linha) continue;
    const treinos = inteiroNaoNegativo(linha.n);
    const seg = inteiroNaoNegativo(linha.segundos);
    if (treinos > 0 || seg > 0) {
      dias += 1;
      segundos += seg;
    }
  }
  if (!dias) return { dias: 0, ritmo: 0, texto: 'Ainda não há ritmo nesta semana.' };
  const minutos = Math.floor(segundos / 60);
  if (!minutos) return { dias, ritmo: 0, texto: 'Menos de 1 minuto por dia com fala.' };
  const ritmo = Math.max(1, Math.round(minutos / dias));
  const texto = ritmo === 1
    ? '1 minuto por dia com fala.'
    : `${ritmo} minutos por dia com fala.`;
  return { dias, ritmo, texto };
}

export function textoDaLacuna(painel, diaIso) {
  let n = 0;
  let vistos = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    vistos += 1;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    const treinos = inteiroNaoNegativo(linha?.n);
    const segundos = inteiroNaoNegativo(linha?.segundos);
    if (treinos > 0 || segundos > 0) continue;
    n += 1;
  }
  if (!vistos || !n) return { n: 0, texto: 'Nenhum dia em branco nesta semana.' };
  if (n === 1) return { n: 1, texto: '1 dia em branco nesta semana.' };
  return { n, texto: `${n} dias em branco nesta semana.` };
}

export function textoDaMeta(painel, diaIso, meta) {
  const alvo = Math.floor(Number(meta));
  if (!Number.isFinite(alvo) || alvo <= 0) {
    return { falta: 0, minutos: 0, meta: 0, texto: 'A meta de minutos ainda não foi escolhida.' };
  }
  const minutos = somarSemana(painel, diaIso).minutos;
  if (minutos >= alvo) {
    return { falta: 0, minutos, meta: alvo, texto: 'A meta desta semana já foi cumprida.' };
  }
  const falta = alvo - minutos;
  const texto = falta === 1
    ? 'Falta 1 minuto para a meta desta semana.'
    : `Faltam ${falta} minutos para a meta desta semana.`;
  return { falta, minutos, meta: alvo, texto };
}

export function textoDaDuracao(painel, diaIso) {
  let segundos = 0;
  let n = 0;
  for (const data of diasDaSemana(diaIso)) {
    if (!data || data > diaIso) continue;
    const linha = painel && typeof painel === 'object' ? painel[data] : null;
    if (!linha) continue;
    segundos += inteiroNaoNegativo(linha.segundos);
    n += inteiroNaoNegativo(linha.n);
  }
  if (!n || !segundos) return { segundos: 0, n: 0, media: 0, texto: 'Ainda não há duração nesta semana.' };
  const media = Math.floor(segundos / n);
  const minutos = Math.floor(media / 60);
  if (!minutos) {
    return { segundos, n, media, texto: 'Cada treino desta semana durou menos de 1 minuto.' };
  }
  if (minutos === 1) return { segundos, n, media, texto: 'Cada treino desta semana durou 1 minuto.' };
  return { segundos, n, media, texto: `Cada treino desta semana durou ${minutos} minutos.` };
}

export function textoDaUltima(painel, diaIso) {
  const inicio = String(diaIso || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio)) {
    return { dias: null, texto: 'Ainda não há fala registrada.' };
  }
  let cursor = inicio;
  for (let i = 0; i < 400; i++) {
    if (!cursor) break;
    const linha = painel && typeof painel === 'object' ? painel[cursor] : null;
    const treinos = inteiroNaoNegativo(linha?.n);
    const segundos = inteiroNaoNegativo(linha?.segundos);
    if (treinos > 0 || segundos > 0) {
      if (i === 0) return { dias: 0, texto: 'A última fala foi hoje.' };
      if (i === 1) return { dias: 1, texto: 'A última fala foi ontem.' };
      return { dias: i, texto: `A última fala foi há ${i} dias.` };
    }
    cursor = deslocarIso(cursor, -1);
  }
  return { dias: null, texto: 'Ainda não há fala registrada.' };
}

function dataValida(iso) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(iso || ''));
}

function diasEntreIso(inicio, fim) {
  const a = String(inicio).split('-').map(Number);
  const b = String(fim).split('-').map(Number);
  const da = new Date(a[0], a[1] - 1, a[2]);
  const db = new Date(b[0], b[1] - 1, b[2]);
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

export function textoDaPrimeira(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, texto: 'Ainda não há primeira fala.' };
  let primeira = '';
  const fonte = painel && typeof painel === 'object' ? painel : {};
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const segundos = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && segundos <= 0) continue;
    if (!primeira || data < primeira) primeira = data;
  }
  if (!primeira) return { dias: null, texto: 'Ainda não há primeira fala.' };
  const dias = diasEntreIso(primeira, fim);
  if (dias <= 0) return { dias: 0, texto: 'A primeira fala foi hoje.' };
  if (dias === 1) return { dias: 1, texto: 'A primeira fala foi ontem.' };
  return { dias, texto: `A primeira fala foi há ${dias} dias.` };
}

export function textoDoHiato(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, texto: 'Ainda não há hiato entre falas.' };
  const datas = [];
  const fonte = painel && typeof painel === 'object' ? painel : {};
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const segundos = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && segundos <= 0) continue;
    datas.push(data);
  }
  datas.sort();
  if (datas.length < 2) return { dias: null, texto: 'Ainda não há hiato entre falas.' };
  let maior = 0;
  for (let i = 1; i < datas.length; i++) {
    const vazio = diasEntreIso(datas[i - 1], datas[i]) - 1;
    if (vazio > maior) maior = vazio;
  }
  if (maior <= 0) return { dias: 0, texto: 'As falas seguem sem dia no meio.' };
  if (maior === 1) return { dias: 1, texto: 'O maior hiato foi de 1 dia.' };
  return { dias: maior, texto: `O maior hiato foi de ${maior} dias.` };
}

const NOME_GETDAY = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const ARTIGO_GETDAY = ['no', 'na', 'na', 'na', 'na', 'na', 'no'];

function diaDaSemanaLocal(iso) {
  const partes = String(iso).split('-').map(Number);
  return new Date(partes[0], partes[1] - 1, partes[2]).getDay();
}

export function textoDoCostume(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, dia: null, texto: 'Ainda não há costume de fala.' };
  const contagem = [0, 0, 0, 0, 0, 0, 0];
  let total = 0;
  const fonte = painel && typeof painel === 'object' ? painel : {};
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const segundos = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && segundos <= 0) continue;
    contagem[diaDaSemanaLocal(data)] += 1;
    total += 1;
  }
  if (total < 2) return { dias: null, dia: null, texto: 'Ainda não há costume de fala.' };
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  let escolhido = 1;
  for (const indice of ordem) {
    if (contagem[indice] > contagem[escolhido]) escolhido = indice;
  }
  const dias = contagem[escolhido];
  const dia = NOME_GETDAY[escolhido];
  return { dias, dia, texto: `Você fala mais ${ARTIGO_GETDAY[escolhido]} ${dia}.` };
}

export function textoDaMarca(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, texto: 'Ainda não há marca de fala.' };
  const datas = [];
  const fonte = painel && typeof painel === 'object' ? painel : {};
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const segundos = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && segundos <= 0) continue;
    datas.push(data);
  }
  datas.sort();
  if (!datas.length) return { dias: null, texto: 'Ainda não há marca de fala.' };
  let maior = 1;
  let atual = 1;
  for (let i = 1; i < datas.length; i++) {
    if (diasEntreIso(datas[i - 1], datas[i]) === 1) atual += 1;
    else atual = 1;
    if (atual > maior) maior = atual;
  }
  if (maior === 1) return { dias: 1, texto: 'A maior marca foi de 1 dia.' };
  return { dias: maior, texto: `A maior marca foi de ${maior} dias.` };
}

export function textoDoAuge(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, minutos: 0, texto: 'Ainda não há auge de fala.' };
  let melhor = '';
  let segundos = 0;
  const fonte = painel && typeof painel === 'object' ? painel : {};
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const seg = inteiroNaoNegativo(linha?.segundos);
    const treinos = inteiroNaoNegativo(linha?.n);
    if (treinos <= 0 && seg <= 0) continue;
    if (!melhor || seg > segundos || (seg === segundos && data > melhor)) {
      melhor = data;
      segundos = seg;
    }
  }
  if (!melhor) return { dias: null, minutos: 0, texto: 'Ainda não há auge de fala.' };
  const minutos = Math.floor(segundos / 60);
  const dias = diasEntreIso(melhor, fim);
  const tempo = minutos <= 0
    ? 'menos de 1 minuto'
    : minutos === 1
      ? '1 minuto'
      : `${minutos} minutos`;
  if (dias <= 0) return { dias: 0, minutos, texto: `O auge foi hoje, com ${tempo}.` };
  if (dias === 1) return { dias: 1, minutos, texto: `O auge foi ontem, com ${tempo}.` };
  return { dias, minutos, texto: `O auge foi há ${dias} dias, com ${tempo}.` };
}

export function textoDoSete(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, texto: 'Ainda não há conta dos últimos 7 dias.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let cursor = fim;
  for (let i = 0; i < 7; i++) {
    const linha = fonte[cursor];
    const treinos = inteiroNaoNegativo(linha?.n);
    const segundos = inteiroNaoNegativo(linha?.segundos);
    if (treinos > 0 || segundos > 0) dias += 1;
    cursor = deslocarIso(cursor, -1);
  }
  if (dias === 0) return { dias: 0, texto: 'Nenhum dos últimos 7 dias teve fala.' };
  if (dias === 1) return { dias: 1, texto: '1 dos últimos 7 dias teve fala.' };
  return { dias, texto: `${dias} dos últimos 7 dias tiveram fala.` };
}

export function textoDaSoma(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, minutos: 0, texto: 'Ainda não há soma de fala.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let segundos = 0;
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
  }
  const minutos = Math.floor(segundos / 60);
  if (dias === 0) return { dias: 0, minutos: 0, texto: 'A soma de fala ainda é 0 minutos.' };
  if (minutos <= 0) return { dias, minutos: 0, texto: 'A soma de fala é de menos de 1 minuto.' };
  if (minutos === 1) return { dias, minutos: 1, texto: 'A soma de fala é de 1 minuto.' };
  return { dias, minutos, texto: `A soma de fala é de ${minutos} minutos.` };
}

export function textoDoPorDia(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, minutos: 0, texto: 'Ainda não há média por dia.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let segundos = 0;
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
  }
  if (dias === 0) return { dias: 0, minutos: 0, texto: 'A média por dia ainda é 0 minutos.' };
  const minutos = Math.floor(segundos / 60 / dias);
  if (minutos <= 0) return { dias, minutos: 0, texto: 'A média por dia é de menos de 1 minuto.' };
  if (minutos === 1) return { dias, minutos: 1, texto: 'A média por dia é de 1 minuto.' };
  return { dias, minutos, texto: `A média por dia é de ${minutos} minutos.` };
}

export function textoDaParte(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, minutos: 0, parte: 0, texto: 'Ainda não há parte desta semana.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const naSemana = new Set(diasDaSemana(fim).filter(data => data && data <= fim));
  let segundos = 0;
  let segundosSemana = 0;
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
    if (naSemana.has(data)) segundosSemana += seg;
  }
  if (dias === 0) return { dias: 0, minutos: 0, parte: 0, texto: 'A parte desta semana ainda é 0 minutos.' };
  const total = Math.floor(segundos / 60);
  const parte = Math.floor(segundosSemana / 60);
  if (parte <= 0) return { dias, minutos: 0, parte: 0, texto: 'Nenhum minuto desta semana entra na soma.' };
  if (parte === total) {
    if (total === 1) return { dias, minutos: 1, parte: 1, texto: 'A parte desta semana é o minuto inteiro.' };
    return { dias, minutos: parte, parte: total, texto: `A parte desta semana é a fala inteira, com ${total} minutos.` };
  }
  return { dias, minutos: parte, parte: total, texto: `Esta semana tem ${parte} dos ${total} minutos.` };
}

export function textoDoFora(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, minutos: 0, texto: 'Ainda não há conta fora desta semana.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const naSemana = new Set(diasDaSemana(fim).filter(data => data && data <= fim));
  let segundosFora = 0;
  let dias = 0;
  let diasFora = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (naSemana.has(data)) continue;
    diasFora += 1;
    segundosFora += seg;
  }
  if (dias === 0) return { dias: 0, minutos: 0, texto: 'Fora desta semana ainda há 0 minutos.' };
  if (diasFora === 0) return { dias, minutos: 0, texto: 'Nada ficou fora desta semana.' };
  const minutos = Math.floor(segundosFora / 60);
  if (minutos <= 0) return { dias, minutos: 0, texto: 'Fora desta semana há menos de 1 minuto.' };
  if (minutos === 1) return { dias, minutos: 1, texto: 'Fora desta semana há 1 minuto.' };
  return { dias, minutos, texto: `Fora desta semana há ${minutos} minutos.` };
}

export function textoDoTotal(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, total: 0, texto: 'Ainda não há total de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let total = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    total += treinos;
  }
  if (dias === 0) return { dias: 0, total: 0, texto: 'O total de treinos ainda é 0.' };
  if (total === 0) return { dias, total: 0, texto: 'O total de treinos ainda é 0.' };
  if (total === 1) return { dias, total: 1, texto: 'O total de treinos é 1.' };
  return { dias, total, texto: `O total de treinos é ${total}.` };
}

export function textoDoLote(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, lote: 0, texto: 'Ainda não há lote desta semana.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const naSemana = new Set(diasDaSemana(fim).filter(data => data && data <= fim));
  let dias = 0;
  let lote = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (naSemana.has(data)) lote += treinos;
  }
  if (dias === 0) return { dias: 0, lote: 0, texto: 'O lote desta semana ainda é 0 treinos.' };
  if (lote <= 0) return { dias, lote: 0, texto: 'Nenhum treino entrou nesta semana.' };
  if (lote === 1) return { dias, lote: 1, texto: 'O lote desta semana é 1 treino.' };
  return { dias, lote, texto: `O lote desta semana é ${lote} treinos.` };
}

export function textoDoSaldo(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, saldo: 0, texto: 'Ainda não há saldo de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const naSemana = new Set(diasDaSemana(fim).filter(data => data && data <= fim));
  let dias = 0;
  let saldo = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!naSemana.has(data)) saldo += treinos;
  }
  if (dias === 0) return { dias: 0, saldo: 0, texto: 'O saldo de antes desta semana ainda é 0 treinos.' };
  if (saldo <= 0) return { dias, saldo: 0, texto: 'Nada ficou antes desta semana.' };
  if (saldo === 1) return { dias, saldo: 1, texto: 'Antes desta semana há 1 treino.' };
  return { dias, saldo, texto: `Antes desta semana há ${saldo} treinos.` };
}

export function textoDoPasso(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, passo: 0, texto: 'Ainda não há passo de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let total = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    total += treinos;
  }
  if (dias === 0) return { dias: 0, passo: 0, texto: 'O passo por dia ainda é 0 treinos.' };
  const passo = Math.floor(total / dias);
  if (passo <= 0) return { dias, passo: 0, texto: 'O passo por dia é de menos de 1 treino.' };
  if (passo === 1) return { dias, passo: 1, texto: 'O passo por dia é de 1 treino.' };
  return { dias, passo, texto: `O passo por dia é de ${passo} treinos.` };
}

export function textoDoMaior(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, maior: 0, texto: 'Ainda não há maior dia de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let maior = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (treinos > maior) maior = treinos;
  }
  if (dias === 0) return { dias: 0, maior: 0, texto: 'O maior dia ainda é 0 treinos.' };
  if (maior <= 0) return { dias, maior: 0, texto: 'O maior dia ficou abaixo de 1 treino.' };
  if (maior === 1) return { dias, maior: 1, texto: 'O maior dia teve 1 treino.' };
  return { dias, maior, texto: `O maior dia teve ${maior} treinos.` };
}

export function textoDoMenor(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, menor: 0, texto: 'Ainda não há menor dia de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let menor = null;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (menor === null || treinos < menor) menor = treinos;
  }
  if (dias === 0) return { dias: 0, menor: 0, texto: 'O menor dia ainda é 0 treinos.' };
  if (menor <= 0) return { dias, menor: 0, texto: 'O menor dia ficou abaixo de 1 treino.' };
  if (menor === 1) return { dias, menor: 1, texto: 'O menor dia teve 1 treino.' };
  return { dias, menor, texto: `O menor dia teve ${menor} treinos.` };
}

export function textoDaDiferenca(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, diferenca: 0, texto: 'Ainda não há diferença de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let menor = null;
  let maior = null;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (menor === null || treinos < menor) menor = treinos;
    if (maior === null || treinos > maior) maior = treinos;
  }
  if (dias === 0) return { dias: 0, diferenca: 0, texto: 'A diferença entre os dias ainda é 0 treinos.' };
  if (dias === 1) return { dias: 1, diferenca: 0, texto: 'Com um dia só, a diferença é 0 treinos.' };
  const diferenca = maior - menor;
  if (diferenca <= 0) return { dias, diferenca: 0, texto: 'A diferença entre os dias é de 0 treinos.' };
  if (diferenca === 1) return { dias, diferenca: 1, texto: 'A diferença entre os dias é de 1 treino.' };
  return { dias, diferenca, texto: `A diferença entre os dias é de ${diferenca} treinos.` };
}

export function textoDoMeio(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, meio: 0, texto: 'Ainda não há meio de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const valores = [];
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    valores.push(treinos);
  }
  const dias = valores.length;
  if (dias === 0) return { dias: 0, meio: 0, texto: 'O meio dos dias ainda é 0 treinos.' };
  valores.sort((a, b) => a - b);
  const meio = dias % 2 === 1
    ? valores[(dias - 1) / 2]
    : Math.floor((valores[dias / 2 - 1] + valores[dias / 2]) / 2);
  if (meio <= 0) return { dias, meio: 0, texto: 'O meio dos dias ficou abaixo de 1 treino.' };
  if (meio === 1) return { dias, meio: 1, texto: 'O meio dos dias é de 1 treino.' };
  return { dias, meio, texto: `O meio dos dias é de ${meio} treinos.` };
}

export function textoDaVariedade(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, variedade: 0, texto: 'Ainda não há variedade de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const valores = new Set();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    valores.add(treinos);
  }
  const variedade = valores.size;
  if (dias === 0) return { dias: 0, variedade: 0, texto: 'A variedade dos dias ainda é 0 valores.' };
  if (variedade === 1) return { dias, variedade: 1, texto: 'A variedade dos dias é de 1 valor.' };
  return { dias, variedade, texto: `A variedade dos dias é de ${variedade} valores.` };
}

export function textoDaModa(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, moda: 0, texto: 'Ainda não há moda de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const contagem = new Map();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    contagem.set(treinos, (contagem.get(treinos) || 0) + 1);
  }
  if (dias === 0) return { dias: 0, moda: 0, texto: 'A moda dos dias ainda é 0 treinos.' };
  let moda = null;
  let vezes = 0;
  for (const [valor, n] of contagem) {
    if (n > vezes || (n === vezes && (moda === null || valor < moda))) {
      moda = valor;
      vezes = n;
    }
  }
  if (moda <= 0) return { dias, moda: 0, texto: 'A moda dos dias ficou abaixo de 1 treino.' };
  if (moda === 1) return { dias, moda: 1, texto: 'A moda dos dias é de 1 treino.' };
  return { dias, moda, texto: `A moda dos dias é de ${moda} treinos.` };
}

export function textoDaRepeticao(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, repeticao: 0, texto: 'Ainda não há repetição de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const contagem = new Map();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    contagem.set(treinos, (contagem.get(treinos) || 0) + 1);
  }
  if (dias === 0) return { dias: 0, repeticao: 0, texto: 'A repetição dos dias ainda é 0 dias.' };
  let moda = null;
  let vezes = 0;
  for (const [valor, n] of contagem) {
    if (n > vezes || (n === vezes && (moda === null || valor < moda))) {
      moda = valor;
      vezes = n;
    }
  }
  if (vezes === 1) return { dias, repeticao: 1, texto: 'A repetição dos dias é de 1 dia.' };
  return { dias, repeticao: vezes, texto: `A repetição dos dias é de ${vezes} dias.` };
}

export function textoDaExtensao(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, extensao: 0, texto: 'Ainda não há extensão de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!primeira || data < primeira) primeira = data;
  }
  if (dias === 0) return { dias: 0, extensao: 0, texto: 'A extensão dos dias ainda é 0 dias.' };
  const extensao = diasEntreIso(primeira, fim) + 1;
  if (extensao === 1) return { dias, extensao: 1, texto: 'A extensão dos dias é de 1 dia.' };
  return { dias, extensao, texto: `A extensão dos dias é de ${extensao} dias.` };
}

export function textoDoVao(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, vao: 0, texto: 'Ainda não há vão de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!primeira || data < primeira) primeira = data;
  }
  if (dias === 0) return { dias: 0, vao: 0, texto: 'O vão dos dias ainda é 0 dias.' };
  const vao = diasEntreIso(primeira, fim) + 1 - dias;
  if (vao === 0) return { dias, vao: 0, texto: 'O vão dos dias é de 0 dias.' };
  if (vao === 1) return { dias, vao: 1, texto: 'O vão dos dias é de 1 dia.' };
  return { dias, vao, texto: `O vão dos dias é de ${vao} dias.` };
}

export function textoDaProporcao(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, proporcao: 0, texto: 'Ainda não há proporção de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!primeira || data < primeira) primeira = data;
  }
  if (dias === 0) return { dias: 0, proporcao: 0, texto: 'A proporção dos dias ainda é 0 em 0.' };
  const proporcao = diasEntreIso(primeira, fim) + 1;
  return { dias, proporcao, texto: `A proporção dos dias é de ${dias} em ${proporcao}.` };
}

export function textoDaCobertura(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, cobertura: 0, texto: 'Ainda não há cobertura de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!primeira || data < primeira) primeira = data;
  }
  if (dias === 0) return { dias: 0, cobertura: 0, texto: 'A cobertura dos dias ainda é 0 por cento.' };
  const cobertura = Math.round((dias * 100) / (diasEntreIso(primeira, fim) + 1));
  if (cobertura === 1) return { dias, cobertura, texto: 'A cobertura dos dias é de 1 por cento.' };
  return { dias, cobertura, texto: `A cobertura dos dias é de ${cobertura} por cento.` };
}

export function textoDoIntervalo(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, intervalo: 0, texto: 'Ainda não há intervalo de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const datas = [];
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    datas.push(data);
  }
  const dias = datas.length;
  if (dias === 0) return { dias: 0, intervalo: 0, texto: 'O intervalo dos dias ainda é 0 dias.' };
  if (dias < 2) return { dias, intervalo: 0, texto: 'O intervalo dos dias é de 0 dias.' };
  datas.sort();
  let soma = 0;
  for (let i = 1; i < datas.length; i++) soma += diasEntreIso(datas[i - 1], datas[i]);
  const intervalo = Math.round(soma / (datas.length - 1));
  if (intervalo === 1) return { dias, intervalo, texto: 'O intervalo dos dias é de 1 dia.' };
  return { dias, intervalo, texto: `O intervalo dos dias é de ${intervalo} dias.` };
}

export function textoDaCadencia(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, cadencia: 0, texto: 'Ainda não há cadência de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!primeira || data < primeira) primeira = data;
  }
  if (dias === 0) return { dias: 0, cadencia: 0, texto: 'A cadência dos dias ainda é 0.' };
  const cadencia = Math.round((dias * 7) / (diasEntreIso(primeira, fim) + 1));
  if (cadencia === 1) return { dias, cadencia, texto: 'A cadência dos dias é de 1 por semana.' };
  return { dias, cadencia, texto: `A cadência dos dias é de ${cadencia} por semana.` };
}

export function textoDaDensidade(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, densidade: 0, texto: 'Ainda não há densidade de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  let segundos = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
    if (!primeira || data < primeira) primeira = data;
  }
  if (dias === 0) return { dias: 0, densidade: 0, texto: 'A densidade dos dias ainda é 0 minutos.' };
  const minutos = Math.floor(segundos / 60);
  const densidade = Math.round((minutos * 7) / (diasEntreIso(primeira, fim) + 1));
  if (densidade === 1) return { dias, densidade, texto: 'A densidade dos dias é de 1 minuto por semana.' };
  return { dias, densidade, texto: `A densidade dos dias é de ${densidade} minutos por semana.` };
}

export function textoDoPeso(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, peso: 0, texto: 'Ainda não há peso de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let segundos = 0;
  let maior = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
    if (seg > maior) maior = seg;
  }
  if (dias === 0) return { dias: 0, peso: 0, texto: 'O peso dos dias ainda é 0 por cento.' };
  if (segundos === 0) return { dias, peso: 0, texto: 'O peso dos dias é de 0 por cento.' };
  const peso = Math.round((maior * 100) / segundos);
  if (peso === 1) return { dias, peso, texto: 'O peso dos dias é de 1 por cento.' };
  return { dias, peso, texto: `O peso dos dias é de ${peso} por cento.` };
}

export function textoDaSobra(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, sobra: 0, texto: 'Ainda não há sobra de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let segundos = 0;
  let maior = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
    if (seg > maior) maior = seg;
  }
  if (dias === 0) return { dias: 0, sobra: 0, texto: 'A sobra dos dias ainda é 0 minutos.' };
  const sobra = Math.floor(Math.max(0, segundos - maior) / 60);
  if (sobra === 1) return { dias, sobra, texto: 'A sobra dos dias é de 1 minuto.' };
  return { dias, sobra, texto: `A sobra dos dias é de ${sobra} minutos.` };
}

export function textoDoResto(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, resto: 0, texto: 'Ainda não há resto de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let segundos = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
  }
  if (dias === 0) return { dias: 0, resto: 0, texto: 'O resto dos dias ainda é 0 segundos.' };
  const resto = segundos % 60;
  if (resto === 1) return { dias, resto, texto: 'O resto dos dias é de 1 segundo.' };
  return { dias, resto, texto: `O resto dos dias é de ${resto} segundos.` };
}

export function textoDoGrao(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, grao: 0, texto: 'Ainda não há grão de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let segundos = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    segundos += seg;
  }
  if (dias === 0) return { dias: 0, grao: 0, texto: 'O grão dos dias ainda é 0 segundos.' };
  const grao = Math.floor(segundos / dias);
  if (grao === 1) return { dias, grao, texto: 'O grão dos dias é de 1 segundo.' };
  return { dias, grao, texto: `O grão dos dias é de ${grao} segundos.` };
}

export function textoDoCurto(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, curto: 0, texto: 'Ainda não há curto de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let curto = 0;
  let viu = false;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!viu || seg < curto) curto = seg;
    viu = true;
  }
  if (dias === 0) return { dias: 0, curto: 0, texto: 'O curto dos dias ainda é 0 segundos.' };
  if (curto === 1) return { dias, curto, texto: 'O curto dos dias é de 1 segundo.' };
  return { dias, curto, texto: `O curto dos dias é de ${curto} segundos.` };
}

export function textoDoLongo(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, longo: 0, texto: 'Ainda não há longo de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let longo = 0;
  let viu = false;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!viu || seg > longo) longo = seg;
    viu = true;
  }
  if (dias === 0) return { dias: 0, longo: 0, texto: 'O longo dos dias ainda é 0 segundos.' };
  if (longo === 1) return { dias, longo, texto: 'O longo dos dias é de 1 segundo.' };
  return { dias, longo, texto: `O longo dos dias é de ${longo} segundos.` };
}

export function textoDoSalto(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, salto: 0, texto: 'Ainda não há salto de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let maior = 0;
  let menor = 0;
  let viu = false;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!viu || seg > maior) maior = seg;
    if (!viu || seg < menor) menor = seg;
    viu = true;
  }
  const salto = viu ? maior - menor : 0;
  if (dias === 0) return { dias: 0, salto: 0, texto: 'O salto dos dias ainda é 0 segundos.' };
  if (salto === 1) return { dias, salto, texto: 'O salto dos dias é de 1 segundo.' };
  return { dias, salto, texto: `O salto dos dias é de ${salto} segundos.` };
}

export function textoDaMediana(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, mediana: 0, texto: 'Ainda não há mediana de treinos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const valores = [];
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    valores.push(seg);
  }
  const dias = valores.length;
  if (dias === 0) return { dias: 0, mediana: 0, texto: 'A mediana dos dias ainda é 0 segundos.' };
  valores.sort((a, b) => a - b);
  const mediana = dias % 2 === 1
    ? valores[(dias - 1) / 2]
    : Math.floor((valores[dias / 2 - 1] + valores[dias / 2]) / 2);
  if (mediana === 1) return { dias, mediana, texto: 'A mediana dos dias é de 1 segundo.' };
  return { dias, mediana, texto: `A mediana dos dias é de ${mediana} segundos.` };
}

export function textoDoMosaico(painel, diaIso) {
  const fim = String(diaIso || '');
  const total = GRUPOS.length;
  if (!dataValida(fim)) return { dias: null, grupos: 0, total, texto: 'Ainda não há mosaico de grupos.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const vistos = new Set();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    const grupos = linha?.grupos && typeof linha.grupos === 'object' ? linha.grupos : {};
    for (const id of GRUPOS) {
      if (inteiroNaoNegativo(grupos[id]) > 0) vistos.add(id);
    }
  }
  const grupos = vistos.size;
  if (dias === 0) return { dias: 0, grupos: 0, total, texto: `O mosaico ainda cobre 0 de ${total} grupos.` };
  if (grupos === total) return { dias, grupos, total, texto: `O mosaico cobre os ${total} grupos.` };
  return { dias, grupos, total, texto: `O mosaico cobre ${grupos} de ${total} grupos.` };
}

function diaUtc(iso) {
  const [ano, mes, dia] = String(iso).split('-').map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay();
}

export function textoDoTurno(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, uteis: 0, folgas: 0, texto: 'Ainda não há turno de dias.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let dias = 0;
  let uteis = 0;
  let folgas = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    const indice = diaUtc(data);
    if (indice === 0 || indice === 6) folgas += 1;
    else uteis += 1;
  }
  if (dias === 0) return { dias: 0, uteis: 0, folgas: 0, texto: 'O turno ainda cobre 0 dias úteis.' };
  const textoUtil = uteis === 1 ? '1 dia útil' : `${uteis} dias úteis`;
  const textoFolga = folgas === 1 ? '1 de fim de semana' : `${folgas} de fim de semana`;
  if (uteis === 0) {
    const so = folgas === 1
      ? 'O turno cobre 1 dia de fim de semana.'
      : `O turno cobre ${folgas} dias de fim de semana.`;
    return { dias, uteis, folgas, texto: so };
  }
  if (folgas === 0) return { dias, uteis, folgas, texto: `O turno cobre ${textoUtil}.` };
  return { dias, uteis, folgas, texto: `O turno cobre ${textoUtil} e ${textoFolga}.` };
}

export function textoDaVirada(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, meses: 0, texto: 'Ainda não há virada de meses.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const vistos = new Set();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    vistos.add(data.slice(0, 7));
  }
  const meses = vistos.size;
  if (dias === 0) return { dias: 0, meses: 0, texto: 'A virada ainda cobre 0 meses.' };
  if (meses === 1) return { dias, meses, texto: 'A virada cobre 1 mês.' };
  return { dias, meses, texto: `A virada cobre ${meses} meses.` };
}

function semanaIso(iso) {
  const [ano, mes, dia] = String(iso).split('-').map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  const diaSemana = data.getUTCDay() || 7;
  data.setUTCDate(data.getUTCDate() + 4 - diaSemana);
  const anoIso = data.getUTCFullYear();
  const inicio = new Date(Date.UTC(anoIso, 0, 1));
  const semana = Math.ceil((((data - inicio) / 86400000) + 1) / 7);
  return `${anoIso}-${String(semana).padStart(2, '0')}`;
}

export function textoDaFaixa(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, semanas: 0, texto: 'Ainda não há faixa de semanas.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const vistos = new Set();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    vistos.add(semanaIso(data));
  }
  const semanas = vistos.size;
  if (dias === 0) return { dias: 0, semanas: 0, texto: 'A faixa ainda cobre 0 semanas.' };
  if (semanas === 1) return { dias, semanas, texto: 'A faixa cobre 1 semana.' };
  return { dias, semanas, texto: `A faixa cobre ${semanas} semanas.` };
}

export function textoDaAbertura(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, dia: null, texto: 'Ainda não há abertura de fala.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!primeira || data < primeira) primeira = data;
  }
  if (!primeira) return { dias: 0, dia: null, texto: 'A abertura ainda não tem dia.' };
  const indice = diaDaSemanaLocal(primeira);
  const dia = NOME_GETDAY[indice];
  const artigo = ARTIGO_GETDAY[indice] === 'no' ? 'num' : 'numa';
  return { dias, dia, texto: `A abertura cai ${artigo} ${dia}.` };
}

const ESTACAO_POR_MES = {
  1: ['verão', 'no'],
  2: ['verão', 'no'],
  3: ['outono', 'no'],
  4: ['outono', 'no'],
  5: ['outono', 'no'],
  6: ['inverno', 'no'],
  7: ['inverno', 'no'],
  8: ['inverno', 'no'],
  9: ['primavera', 'na'],
  10: ['primavera', 'na'],
  11: ['primavera', 'na'],
  12: ['verão', 'no']
};

export function textoDaEstacao(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, estacao: null, texto: 'Ainda não há estação de fala.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let primeira = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!primeira || data < primeira) primeira = data;
  }
  if (!primeira) return { dias: 0, estacao: null, texto: 'A estação ainda não tem dia.' };
  const par = ESTACAO_POR_MES[Number(primeira.slice(5, 7))];
  const estacao = par[0];
  const artigo = par[1];
  return { dias, estacao, texto: `A fala abriu ${artigo} ${estacao}.` };
}

export function textoDoFecho(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, dia: null, texto: 'Ainda não há fecho de fala.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  let ultima = '';
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    if (!ultima || data > ultima) ultima = data;
  }
  if (!ultima) return { dias: 0, dia: null, texto: 'O fecho ainda não tem dia.' };
  const indice = diaDaSemanaLocal(ultima);
  const dia = NOME_GETDAY[indice];
  const artigo = ARTIGO_GETDAY[indice] === 'no' ? 'num' : 'numa';
  return { dias, dia, texto: `O fecho cai ${artigo} ${dia}.` };
}

const NOME_AUSENCIA = {
  trabalho: 'trabalho',
  entrevista: 'entrevista',
  cotidiano: 'dia a dia',
  pronuncia: 'pronúncia',
  revisao: 'revisão'
};

const ARTIGO_AUSENCIA = {
  trabalho: 'no',
  entrevista: 'na',
  cotidiano: 'no',
  pronuncia: 'na',
  revisao: 'na'
};

export function textoDaAusencia(painel, diaIso) {
  const fim = String(diaIso || '');
  if (!dataValida(fim)) return { dias: null, id: '', titulo: '', texto: 'Ainda não há ausência de fala.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const vistos = new Set();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const treinos = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (treinos <= 0 && seg <= 0) continue;
    dias += 1;
    const grupos = linha?.grupos && typeof linha.grupos === 'object' ? linha.grupos : {};
    for (const id of GRUPOS) {
      if (inteiroNaoNegativo(grupos[id]) > 0) vistos.add(id);
    }
  }
  if (!dias) return { dias: 0, id: '', titulo: '', texto: 'A ausência ainda não tem fala.' };
  const falta = GRUPOS.find(id => !vistos.has(id)) || '';
  if (!falta) return { dias, id: '', titulo: '', texto: 'A ausência não sobrou em grupo nenhum.' };
  const titulo = CATEGORIAS.find(c => c.id === falta)?.titulo || falta;
  const nome = NOME_AUSENCIA[falta] || falta;
  const artigo = ARTIGO_AUSENCIA[falta] || 'em';
  return { dias, id: falta, titulo, texto: `A ausência ficou ${artigo} ${nome}.` };
}

export function textoDaPratica(painel, diaIso, treinos, stats) {
  const fim = String(diaIso || '');
  const lista = (Array.isArray(treinos) ? treinos : []).filter(t => t && t.id && t.stat && t.titulo);
  const livre = t => (Number(stats?.[t.stat]) || 0) <= 0;
  if (!dataValida(fim)) return { dias: null, id: '', titulo: '', texto: 'Ainda não há prática de fala.' };
  const fonte = painel && typeof painel === 'object' ? painel : {};
  const vistos = new Set();
  let dias = 0;
  for (const data of Object.keys(fonte)) {
    if (!dataValida(data) || data > fim) continue;
    const linha = fonte[data];
    const n = inteiroNaoNegativo(linha?.n);
    const seg = inteiroNaoNegativo(linha?.segundos);
    if (n <= 0 && seg <= 0) continue;
    dias += 1;
    const grupos = linha?.grupos && typeof linha.grupos === 'object' ? linha.grupos : {};
    for (const id of GRUPOS) {
      if (inteiroNaoNegativo(grupos[id]) > 0) vistos.add(id);
    }
  }
  const faltam = GRUPOS.filter(id => !vistos.has(id));
  const ordem = faltam.length ? faltam : GRUPOS;
  let escolhido = null;
  for (const cat of ordem) {
    escolhido = lista.find(t => t.categoria === cat && livre(t));
    if (escolhido) break;
  }
  if (!escolhido) escolhido = lista.find(livre);
  if (!escolhido) return { dias, id: '', titulo: '', texto: 'A prática já passou pelos treinos.' };
  const subtitulo = String(escolhido.sub || '').replace(/\.$/, '');
  return { dias, id: escolhido.id, titulo: escolhido.titulo, texto: `Pratique ${escolhido.titulo}. ${subtitulo}.` };
}

export function textoDeHoje(painel, diaIso) {
  const linha = painel && typeof painel === 'object' ? painel[diaIso] : null;
  const segundos = Math.max(0, Number(linha?.segundos) || 0);
  const n = Math.max(0, Math.floor(Number(linha?.n) || 0));
  const min = Math.floor(segundos / 60);
  if (!n && segundos === 0) return { minutos: 0, treinos: 0, texto: 'Ainda não houve fala hoje.' };
  if (min === 0) {
    const feito = n === 1 ? '1 treino' : `${n} treinos`;
    return { minutos: 0, treinos: n, texto: `Menos de 1 minuto hoje. ${feito}.` };
  }
  const tempo = min === 1 ? '1 minuto' : `${min} minutos`;
  const feito = n === 1 ? '1 treino' : `${n} treinos`;
  return { minutos: min, treinos: n, texto: `${tempo} hoje. ${feito}.` };
}

export function textoDoBalanco({ minutos, meta, treinos, menorTitulo } = {}) {
  const min = Math.max(0, Math.floor(Number(minutos) || 0));
  const alvo = Math.max(0, Math.floor(Number(meta) || 0));
  const n = Math.max(0, Math.floor(Number(treinos) || 0));
  const tempo = alvo > 0
    ? `${min} de ${alvo} ${alvo === 1 ? 'minuto' : 'minutos'}`
    : `${min} ${min === 1 ? 'minuto' : 'minutos'}`;
  const feito = n === 1 ? '1 treino' : `${n} treinos`;
  const grupo = menorTitulo ? ` Menos prática em ${menorTitulo}.` : '';
  return `${tempo}. ${feito} nesta semana.${grupo}`;
}

export function balancoDaSemana(painel, diaIso, meta) {
  const soma = somarSemana(painel, diaIso);
  const alvo = Math.max(0, Math.floor(Number(meta) || 0));
  let menor = null;
  for (const id of GRUPOS) {
    const n = soma.grupos[id] || 0;
    const titulo = CATEGORIAS.find(c => c.id === id)?.titulo || id;
    if (!menor || n < menor.n) menor = { id, n, titulo };
  }
  const pct = alvo ? Math.min(100, Math.round((soma.minutos / alvo) * 100)) : 0;
  const texto = textoDoBalanco({
    minutos: soma.minutos,
    meta: alvo,
    treinos: soma.treinos,
    menorTitulo: menor?.titulo || ''
  });
  return { ...soma, meta: alvo, menor, pct, texto };
}

export function lembreteMinutos(minutos, meta, diaIso) {
  const feito = Math.max(0, Math.floor(Number(minutos) || 0));
  const alvo = Math.max(0, Number(meta) || 0);
  if (alvo > 0 && feito >= alvo) return `Meta de minutos batida: ${feito} de ${alvo}.`;
  const base = new Date(`${diaIso}T12:00:00`);
  const tarde = !Number.isNaN(base.getTime()) && ((base.getDay() + 6) % 7) >= 3;
  const falta = Math.max(0, alvo - feito);
  if (tarde) {
    if (falta === 1) return 'Ainda dá tempo. Falta 1 minuto.';
    return `Ainda dá tempo. Faltam ${falta} minutos.`;
  }
  return `${feito} de ${alvo} minutos nesta semana.`;
}
