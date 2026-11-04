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
