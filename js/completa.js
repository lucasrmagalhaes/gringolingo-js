// Entrevista completa: cinco treinos em sequência e uma nota no fim.
// A nota é a mesma média do simulado. Nada sai do aparelho.

import { SISTEMAS, notaDoSimulado, faixaDoSimulado } from './banca.js';
import { PROJETOS, SALARIOS } from './vaga.js';
import { STARS } from './palco.js';
import { FECHOS } from './vivo.js';

export const PASSOS = [
  { id: 'portfolio', nome: 'Portfólio', lista: PROJETOS },
  { id: 'sistema', nome: 'Sistema', lista: SISTEMAS },
  { id: 'salario', nome: 'Salário', lista: SALARIOS },
  { id: 'star', nome: 'STAR', lista: STARS },
  { id: 'pergunta', nome: 'Pergunta', lista: FECHOS }
];

function indiceDoDia(dia, origem, n) {
  let x = 2166136261;
  const texto = `${dia}:${origem}`;
  for (let i = 0; i < texto.length; i++) {
    x ^= texto.charCodeAt(i);
    x = Math.imul(x, 16777619);
  }
  return (x >>> 0) % n;
}

export function montarCompleta(dia) {
  if (typeof dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return null;
  const rodadas = [];
  for (const passo of PASSOS) {
    if (!passo.lista.length) return null;
    const cena = passo.lista[indiceDoDia(dia, passo.id, passo.lista.length)];
    const rodada = cena?.rodadas?.[0];
    if (!rodada || typeof rodada.melhor !== 'string') return null;
    rodadas.push({ ...rodada, etapa: passo.nome, treino: passo.nome });
  }
  return {
    id: 'completa',
    titulo: 'Entrevista completa',
    emoji: '🎓',
    nivel: 'B2',
    onde: 'Cinco treinos em sequência.',
    rodadas
  };
}

export function notaDaCompleta(notas) {
  return notaDoSimulado(notas);
}

export function faixaDaCompleta(nota) {
  return faixaDoSimulado(nota);
}
