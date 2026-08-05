import { UNIDADES } from './data.js';

// Expansão de Vocabulário: transforma o banco do dicionário (as ~2.900
// palavras mais frequentes do inglês) em lições jogáveis. O banco é
// alfabético, então a organização honesta é por classe gramatical — quatro
// trilhas com desbloqueio sequencial, sete palavras por lição.
export const POR_LICAO = 7;

export const TRILHAS = [
  { id: 'subst', titulo: 'Substantivos', emoji: '📦', cor: '#1DBFA3', classes: ['subst'], sub: 'As coisas do mundo: de airplane a zoo' },
  { id: 'verbo', titulo: 'Verbos', emoji: '🏃', cor: '#6C5CE7', classes: ['verbo'], sub: 'Toda ação que você vai precisar contar' },
  { id: 'adj', titulo: 'Adjetivos', emoji: '🎨', cor: '#FF9600', classes: ['adj'], sub: 'Como descrever qualquer coisa' },
  { id: 'liga', titulo: 'Palavrinhas de Ligação', emoji: '🧩', cor: '#1CB0F6', classes: ['adv', 'prep', 'pron', 'conj', 'num', 'interj'], sub: 'Advérbios, preposições e o resto que cola as frases' }
];

const doCurso = new Set(UNIDADES.flatMap(u => u.licoes.flatMap(l => l.itens.map(i => i.en.toLowerCase()))));

function itemDeVerbete(p) {
  // pt[0] vira a tradução cobrada; as demais são aceitas ao digitar e todas
  // aparecem no cartão de apresentação da palavra.
  return { en: p.en, pt: p.pt[0], alt: [], traducoes: p.pt, classe: p.classe };
}

// As trilhas são derivadas do banco de forma determinística: o id da lição
// ('vocab:subst:12') sempre aponta para as mesmas palavras, então o progresso
// em estado.licoes reconstitui o vocabulário aprendido em qualquer aparelho.
export function trilhasVocab(banco) {
  return TRILHAS.map(t => {
    const palavras = banco
      .filter(p => t.classes.includes(p.classe) && !doCurso.has(p.en.toLowerCase()))
      .map(itemDeVerbete);
    // Sinônimos com a MESMA tradução ("figure out"/"find out" = descobrir)
    // viram alt (digitar aceita qualquer um) e evitar (nunca são alternativa
    // errada um do outro) — senão a lição fica impossível de gabaritar.
    const porTraducao = new Map();
    palavras.forEach(p => {
      const chave = p.pt.toLowerCase();
      if (!porTraducao.has(chave)) porTraducao.set(chave, []);
      porTraducao.get(chave).push(p.en);
    });
    palavras.forEach(p => {
      const gemeas = porTraducao.get(p.pt.toLowerCase()).filter(en => en !== p.en);
      if (gemeas.length) {
        p.alt = gemeas;
        p.evitar = gemeas;
      }
    });
    const licoes = [];
    for (let i = 0; i * POR_LICAO < palavras.length; i++) {
      const itens = palavras.slice(i * POR_LICAO, (i + 1) * POR_LICAO);
      licoes.push({
        id: `vocab:${t.id}:${i}`,
        titulo: `${itens[0].en} … ${itens[itens.length - 1].en}`,
        itens
      });
    }
    return { ...t, palavras, licoes };
  });
}

export function progressoTrilha(trilha, licoesFeitas) {
  const feitas = trilha.licoes.filter(l => licoesFeitas[l.id]).length;
  return {
    feitas,
    total: trilha.licoes.length,
    palavras: Math.min(feitas * POR_LICAO, trilha.palavras.length),
    proxima: trilha.licoes.find(l => !licoesFeitas[l.id]) ?? null,
    ultimaFeita: [...trilha.licoes].reverse().find(l => licoesFeitas[l.id]) ?? null
  };
}

// Palavras de lições vocab concluídas: entram no pool da Revisão Turbo junto
// com as do curso, para a agenda de Leitner cobrá-las no dia certo.
export function palavrasVocabAprendidas(banco, licoesFeitas) {
  if (!Object.keys(licoesFeitas).some(k => k.startsWith('vocab:'))) return [];
  return trilhasVocab(banco).flatMap(t => t.licoes.filter(l => licoesFeitas[l.id]).flatMap(l => l.itens));
}

export function temLicaoVocab(licoesFeitas) {
  return Object.keys(licoesFeitas).some(k => k.startsWith('vocab:'));
}
