// Trilha de 30 dias. O dia vem da data, sem sorteio.
// O treino do dia continua sendo o recomendado.

export const DIAS_TRILHA = 30;

function instante(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) return null;
  const ano = Number(m[1]);
  const mes = Number(m[2]);
  const dia = Number(m[3]);
  const utc = Date.UTC(ano, mes - 1, dia);
  const checa = new Date(utc);
  if (checa.getUTCFullYear() !== ano || checa.getUTCMonth() !== mes - 1 || checa.getUTCDate() !== dia) return null;
  return utc;
}

export function diaDaTrilha(inicio, hoje) {
  const fim = instante(hoje);
  const comeco = instante(inicio);
  if (fim == null) return { dia: 1, total: DIAS_TRILHA, inicio: '', concluida: false };
  if (comeco == null) return { dia: 1, total: DIAS_TRILHA, inicio: String(hoje), concluida: false };
  const diff = Math.round((fim - comeco) / 86400000);
  if (diff < 0) return { dia: 1, total: DIAS_TRILHA, inicio: String(inicio), concluida: false };
  const bruto = diff + 1;
  return {
    dia: Math.min(DIAS_TRILHA, bruto),
    total: DIAS_TRILHA,
    inicio: String(inicio),
    concluida: bruto > DIAS_TRILHA
  };
}

export function textoDoDia(info) {
  const dia = Number(info?.dia) || 1;
  const total = Number(info?.total) || DIAS_TRILHA;
  if (info?.concluida) return `Dia ${dia} de ${total}. Trilha completa.`;
  return `Dia ${dia} de ${total}.`;
}
