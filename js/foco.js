// Entrevista por foco: frontend, backend ou IA, e a mesma nota do simulado.
// O histórico das notas fica no aparelho.

import { notaDoSimulado, faixaDoSimulado } from './banca.js';
import { LINHAS, TERMOS } from './oficina.js';
import { PRAZOS } from './palco.js';
import { PALESTRAS } from './plateia.js';
import { FINAIS } from './turno.js';
import { BANCOS } from './narra.js';
import { FALHAS } from './guia.js';
import { REQUISITOS, METRICAS } from './briefing.js';
import { ESTIMATIVAS } from './cotidiano.js';
import { MODELOS } from './lar.js';
import { PROPOSTAS } from './time.js';
import { SEGUROS } from './cliente.js';

export const FOCOS = [
  {
    id: 'frontend',
    nome: 'Frontend',
    passos: [
      { id: 'tela', nome: 'Tela', lista: LINHAS },
      { id: 'termo', nome: 'Termo', lista: TERMOS },
      { id: 'prazo', nome: 'Prazo', lista: PRAZOS },
      { id: 'plateia', nome: 'Plateia', lista: PALESTRAS },
      { id: 'fecho', nome: 'Fecho', lista: FINAIS }
    ]
  },
  {
    id: 'backend',
    nome: 'Backend',
    passos: [
      { id: 'guarda', nome: 'Guarda', lista: BANCOS },
      { id: 'falha', nome: 'Falha', lista: FALHAS },
      { id: 'requisito', nome: 'Requisito', lista: REQUISITOS },
      { id: 'estima', nome: 'Estima', lista: ESTIMATIVAS },
      { id: 'fecho', nome: 'Fecho', lista: FINAIS }
    ]
  },
  {
    id: 'ia',
    nome: 'IA',
    passos: [
      { id: 'modelo', nome: 'Modelo', lista: MODELOS },
      { id: 'metrica', nome: 'Métrica', lista: METRICAS },
      { id: 'proposta', nome: 'Proposta', lista: PROPOSTAS },
      { id: 'risco', nome: 'Risco', lista: SEGUROS },
      { id: 'fecho', nome: 'Fecho', lista: FINAIS }
    ]
  }
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

export function focoPorId(id) {
  return FOCOS.find(f => f.id === id) ?? null;
}

export function montarFoco(dia, focoId) {
  const foco = focoPorId(focoId);
  if (!foco || typeof dia !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dia)) return null;
  const rodadas = [];
  for (const passo of foco.passos) {
    if (!passo.lista.length) return null;
    const cena = passo.lista[indiceDoDia(dia, `${foco.id}:${passo.id}`, passo.lista.length)];
    const rodada = cena?.rodadas?.[0];
    if (!rodada || typeof rodada.melhor !== 'string') return null;
    rodadas.push({ ...rodada, etapa: passo.nome, treino: passo.nome });
  }
  return {
    id: 'porFoco',
    titulo: `Entrevista ${foco.nome}`,
    emoji: '🧩',
    nivel: 'B2',
    onde: `Cinco treinos de ${foco.nome}.`,
    foco: foco.id,
    rodadas
  };
}

export function notaDoFoco(notas) {
  return notaDoSimulado(notas);
}

export function faixaDoFoco(nota) {
  return faixaDoSimulado(nota);
}
