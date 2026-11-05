// Tutor offline: compara a resposta com o gabarito, explica o porquê em
// português e devolve uma dica curta. Nada de rede. O conjunto de falsos
// amigos e as regras cobrem erros típicos de quem fala português.

const CONTRACOES = new Map([
  ["i'm", 'i am'],
  ["it's", 'it is'],
  ["what's", 'what is'],
  ["that's", 'that is'],
  ["there's", 'there is'],
  ["let's", 'let us'],
  ["don't", 'do not'],
  ["doesn't", 'does not'],
  ["didn't", 'did not'],
  ["isn't", 'is not'],
  ["aren't", 'are not'],
  ["wasn't", 'was not'],
  ["won't", 'will not'],
  ["can't", 'cannot'],
  ["i'll", 'i will'],
  ["you'll", 'you will'],
  ["we'll", 'we will'],
  ["i've", 'i have'],
  ["you're", 'you are'],
  ["she's", 'she is'],
  ["he's", 'he is'],
  ["we're", 'we are'],
  ["they're", 'they are']
]);

const ARTIGOS = new Set(['a', 'an', 'the']);

const PLURAL_IRREGULAR = new Map([
  ['foot', 'feet'],
  ['tooth', 'teeth'],
  ['man', 'men'],
  ['woman', 'women'],
  ['child', 'children'],
  ['person', 'people'],
  ['mouse', 'mice'],
  ['goose', 'geese']
]);

const FAMILIAS = [
  ['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'],
  ['do', 'does', 'did', 'done', 'doing'],
  ['have', 'has', 'had', 'having'],
  ['will', 'would'],
  ['can', 'could'],
  ['go', 'goes', 'went', 'gone', 'going'],
  ['eat', 'eats', 'ate', 'eaten', 'eating'],
  ['see', 'sees', 'saw', 'seen', 'seeing'],
  ['come', 'comes', 'came', 'coming'],
  ['make', 'makes', 'made', 'making'],
  ['take', 'takes', 'took', 'taken', 'taking'],
  ['get', 'gets', 'got', 'gotten', 'getting'],
  ['say', 'says', 'said', 'saying'],
  ['drink', 'drinks', 'drank', 'drunk', 'drinking'],
  ['write', 'writes', 'wrote', 'written', 'writing'],
  ['speak', 'speaks', 'spoke', 'spoken', 'speaking'],
  ['know', 'knows', 'knew', 'known', 'knowing'],
  ['think', 'thinks', 'thought', 'thinking'],
  ['buy', 'buys', 'bought', 'buying'],
  ['give', 'gives', 'gave', 'given', 'giving'],
  ['find', 'finds', 'found', 'finding'],
  ['leave', 'leaves', 'left', 'leaving'],
  ['feel', 'feels', 'felt', 'feeling']
];

const VERBOS = new Set([
  'be', 'do', 'have', 'go', 'eat', 'see', 'come', 'make', 'take', 'get', 'say',
  'drink', 'write', 'speak', 'know', 'think', 'buy', 'give', 'find', 'leave',
  'feel', 'work', 'like', 'live', 'play', 'open', 'start', 'want', 'need',
  'call', 'look', 'use', 'try', 'ask', 'turn', 'help', 'study', 'watch',
  'listen', 'walk', 'cook', 'clean', 'wash', 'read', 'sleep', 'wake', 'drive',
  'wait', 'pay', 'meet', 'love', 'miss', 'close', 'learn', 'understand'
]);

const TERCEIRA = new Set(['he', 'she', 'it', 'this', 'that']);

// errado = o que o brasileiro tende a escrever; certos = o que a frase pedia.
const COGNATOS = [
  { errado: 'actual', certos: ['current', 'present'], dica: 'Actual significa real, de verdade. Atual (de agora) é current ou present.' },
  { errado: 'actually', certos: ['currently', 'now'], dica: 'Actually significa na verdade. Atualmente é currently ou nowadays.' },
  { errado: 'parents', certos: ['relatives'], dica: 'Parents são só pai e mãe. Parentes em geral é relatives.' },
  { errado: 'relatives', certos: ['parents'], dica: 'Relatives são parentes. Pai e mãe, só os dois, é parents.' },
  { errado: 'pretend', certos: ['intend', 'plan'], dica: 'Pretend é fingir. Pretender (ter a intenção) é intend ou plan.' },
  { errado: 'push', certos: ['pull'], dica: 'Push é empurrar. Puxar é pull. O som parece, o sentido é o contrário.' },
  { errado: 'pull', certos: ['push'], dica: 'Pull é puxar. Empurrar é push.' },
  { errado: 'library', certos: ['bookstore', 'bookshop'], dica: 'Library é biblioteca. Livraria é bookstore.' },
  { errado: 'college', certos: ['school'], dica: 'College é faculdade. Colégio (escola) é school.' },
  { errado: 'fabric', certos: ['factory'], dica: 'Fabric é tecido. Fábrica é factory.' },
  { errado: 'factory', certos: ['fabric'], dica: 'Factory é fábrica. Tecido é fabric.' },
  { errado: 'exit', certos: ['success'], dica: 'Exit é saída. Êxito (sucesso) é success.' },
  { errado: 'sensible', certos: ['sensitive'], dica: 'Sensible é sensato. Sensível é sensitive.' },
  { errado: 'sensitive', certos: ['sensible'], dica: 'Sensitive é sensível. Sensato é sensible.' },
  { errado: 'eventually', certos: ['occasionally', 'sometimes'], dica: 'Eventually é no fim, mais cedo ou tarde. Eventualmente (de vez em quando) é occasionally.' },
  { errado: 'realize', certos: ['accomplish', 'achieve', 'carry'], dica: 'Realize é perceber. Realizar (concretizar) é accomplish ou carry out.' },
  { errado: 'assist', certos: ['watch', 'see'], dica: 'Assist é ajudar. Assistir a um filme é watch.' },
  { errado: 'lecture', certos: ['reading'], dica: 'Lecture é palestra. Leitura é reading.' },
  { errado: 'costume', certos: ['custom', 'habit'], dica: 'Costume é fantasia. Hábito é custom ou habit.' },
  { errado: 'pasta', certos: ['folder'], dica: 'Pasta em inglês é o macarrão. Pasta de arquivos é folder.' },
  { errado: 'tax', certos: ['fee', 'rate'], dica: 'Tax é imposto. Taxa (de serviço ou de câmbio) é fee ou rate.' },
  { errado: 'sympathetic', certos: ['nice', 'friendly'], dica: 'Sympathetic é solidário. Simpático é nice ou friendly.' },
  { errado: 'balcony', certos: ['counter'], dica: 'Balcony é varanda. Balcão é counter.' },
  { errado: 'notice', certos: ['news'], dica: 'Notice é aviso ou perceber. Notícia é news.' },
  { errado: 'news', certos: ['notice'], dica: 'News é notícia. Aviso é notice.' },
  { errado: 'cigar', certos: ['cigarette'], dica: 'Cigar é charuto. Cigarro é cigarette.' },
  { errado: 'large', certos: ['wide'], dica: 'Large é grande. Largo (de largura) é wide.' },
  { errado: 'assume', certos: ['take'], dica: 'Assume é presumir. Assumir um cargo é take on ou take over.' },
  { errado: 'comprehensive', certos: ['understanding'], dica: 'Comprehensive é completo, abrangente. Compreensivo é understanding.' },
  { errado: 'ingenious', certos: ['naive'], dica: 'Ingenious é genial. Ingênuo é naive.' },
  { errado: 'mayor', certos: ['major'], dica: 'Mayor é prefeito. Major (patente ou importante) é major.' },
  { errado: 'office', certos: ['garage', 'workshop'], dica: 'Office é escritório. Oficina é garage ou workshop.' },
  { errado: 'kitchen', certos: ['chicken'], dica: 'Kitchen é a cozinha. Frango é chicken. Uma letra muda o sentido.' },
  { errado: 'chicken', certos: ['kitchen'], dica: 'Chicken é o frango. Cozinha é kitchen.' },
  { errado: 'lunch', certos: ['launch'], dica: 'Lunch é o almoço. Launch (lançamento) leva um a no meio.' },
  { errado: 'launch', certos: ['lunch'], dica: 'Launch é lançar. Almoço é lunch, sem o a.' }
];

const DICA_TIPO = {
  typo: 'Uma letra trocada ou faltando a gente aceita. Se o deslize formar outra palavra de verdade, aí conta como erro.',
  ordem: 'A ordem padrão é sujeito, verbo e complemento. Em pergunta, o auxiliar (do, does, is, can) vem antes do sujeito.',
  artigo: 'A e an apresentam coisa contável no singular. An vem antes de som de vogal. The marca o que é específico. My e your dispensam the.',
  plural: 'O plural regular ganha -s ou -es. Fuja da regra: foot/feet, tooth/teeth, child/children, person/people.',
  tempo: 'O verbo muda com a pessoa e com o tempo. I am, she is, they are. He, she e it ganham -s no presente. Depois de will e can, o verbo fica puro.',
  cognato: 'Falso amigo parece português e significa outra coisa. Se a palavra parece fácil demais, desconfie.',
  falta: 'Cada pedaço do português precisa de um par: sujeito, verbo e complemento.',
  sobra: 'Palavra que não está no português em geral sobra. Artigo e pronome a mais são os campeões.',
  troca: 'Uma palavra trocada muda o sentido mesmo com o resto certo.',
  escolha: 'Descarte o que você tem certeza que está errado. O que sobrar precisa bater com a frase inteira.',
  vazio: 'Vale chutar. O erro mostra o padrão, e a revisão traz a palavra de volta.'
};

const DICAS_DIA = [
  { titulo: 'A e an não são enfeite', corpo: 'Coisa que se conta, no singular, pede artigo: a coffee, an apple. An entra antes de som de vogal (an hour, an egg). No plural e no incontável, o a sai de cena.' },
  { titulo: 'The não cola em my', corpo: 'My mother, your name, her book. O the antes do possessivo é português vazando: nada de "the my sister".' },
  { titulo: 'Ser e estar são o mesmo verbo', corpo: 'Os dois viram to be, e ele muda: I am, you are, he is, we are. "Eu estou bem" é I am fine, não "I have fine".' },
  { titulo: 'Negativa pede do', corpo: 'I do not understand. She does not like coffee. Sem o do, a frase fica com cara de português: "I not understand" não existe.' },
  { titulo: 'He, she e it ganham -s', corpo: 'I work, you work, she works. O -s é da terceira pessoa no presente, não é plural. Com I, you, we e they o verbo fica pelado.' },
  { titulo: 'Can e will recusam o to', corpo: 'Can you help, I will be late. O to depois desses verbos é um eco do português. Nada de "can to help" nem "will to be".' },
  { titulo: 'Idade usa to be', corpo: 'I am 20. Não é "I have 20 years". Fome, sede e sono, esses sim, usam have em algumas frases, mas a idade é sempre am/is/are.' },
  { titulo: 'Adjetivo vem antes', corpo: 'A red car, a big house. O adjetivo não fica depois do substantivo como em "carro vermelho".' },
  { titulo: 'Parents não são parentes', corpo: 'Parents são só pai e mãe. O resto da família entra em relatives. É o falso amigo que mais escapa.' },
  { titulo: 'Push não é puxar', corpo: 'Push é empurrar. Puxar é pull. A porta do ônibus ensina isso do jeito difícil.' },
  { titulo: 'Plural teimoso', corpo: 'Two brothers leva -s. E alguns plurais não perdoam chute: one foot, two feet; one tooth, two teeth.' },
  { titulo: 'Sujeito obrigatório', corpo: 'Em português cabe "está frio". Em inglês a frase precisa de sujeito: it is cold, she is my sister. Sozinho, o verbo não fica de pé.' },
  { titulo: 'In, on e at', corpo: 'In é dentro (in the kitchen). On é em cima de superfície (on the table). At marca ponto e hora (at home, at 7).' },
  { titulo: 'Rotina é presente simples', corpo: 'I drink coffee every day. O -ing (I am drinking) é o que está acontecendo agora, não o hábito.' },
  { titulo: 'Please no fim fica educado', corpo: 'O pedido em inglês é o verbo direto, sem sujeito: close the door, please. Um please no final muda o tom sem mudar a gramática.' },
  { titulo: 'Much e many', corpo: 'Many para o que se conta: many books. Much para o que não se conta: much water. People confunde porque é contável e pede many.' }
];

export const ROTULOS = {
  typo: 'errinho de letra',
  ordem: 'ordem das palavras',
  artigo: 'artigos (a, an, the)',
  plural: 'plural',
  tempo: 'forma do verbo',
  cognato: 'falsos amigos',
  falta: 'palavra faltando',
  sobra: 'palavra a mais',
  troca: 'palavra trocada',
  escolha: 'opção errada',
  vazio: 'resposta em branco',
  acerto: 'acerto'
};

function semente(texto) {
  let h = 0;
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  return h;
}

function base(s) {
  return String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(s) {
  const bruto = base(s);
  if (!bruto) return [];
  return bruto.split(' ').flatMap(p => {
    const exp = CONTRACOES.get(p);
    return exp ? exp.split(' ') : [p];
  });
}

// O que a pessoa realmente escreveu, com maiúscula e contração intactas.
// A comparação usa tokens() (expande don't). A tela usa isto.
function superficie(s) {
  const limpo = String(s ?? '')
    .replace(/[’]/g, "'")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return limpo ? limpo.split(' ') : [];
}

function cit(texto) {
  return `"${texto}"`;
}

function damerau(a, b) {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + custo);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[m][n];
}

function casar(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const ia = new Set();
  const ib = new Set();
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ia.add(i);
      ib.add(j);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return { ia, ib };
}

function restos(dada, certa) {
  const { ia, ib } = casar(dada, certa);
  return {
    sobras: dada.filter((_, i) => !ia.has(i)),
    faltas: certa.filter((_, i) => !ib.has(i))
  };
}

function marcasPalavras(dada, certa, fora = false) {
  if (fora) {
    return {
      dada: dada.map((t, i) => ({ t, marca: t === certa[i] ? 'ok' : 'fora' })),
      certa: certa.map((t, i) => ({ t, marca: t === dada[i] ? 'ok' : 'fora' }))
    };
  }
  const { ia, ib } = casar(dada, certa);
  return {
    dada: dada.map((t, i) => ({ t, marca: ia.has(i) ? 'ok' : 'sobra' })),
    certa: certa.map((t, i) => ({ t, marca: ib.has(i) ? 'ok' : 'falta' }))
  };
}

function marcasLetras(dadaTexto, certaTexto) {
  const a = [...base(dadaTexto)];
  const b = [...base(certaTexto)];
  const { ia, ib } = casar(a, b);
  return {
    dada: a.map((t, i) => ({ t, marca: ia.has(i) ? 'ok' : 'sobra' })),
    certa: b.map((t, i) => ({ t, marca: ib.has(i) ? 'ok' : 'falta' }))
  };
}

function mesmaBolsa(a, b) {
  if (a.length !== b.length || a.length < 2) return false;
  if (a.join(' ') === b.join(' ')) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((t, i) => t === sb[i]);
}

function faltaAuxiliar(dada, certa) {
  const aux = ['do', 'does', 'did'];
  for (let i = 0; i < certa.length - 1; i++) {
    if (aux.includes(certa[i]) && certa[i + 1] === 'not') {
      const sem = certa.filter((_, idx) => idx !== i);
      if (sem.join(' ') === dada.join(' ')) return certa[i];
    }
  }
  return null;
}

function sobraToDeModal(dada, certa) {
  const modais = new Set(['can', 'could', 'will', 'would', 'must', 'should']);
  if (dada.length !== certa.length + 1) return false;
  if (!dada.some(t => modais.has(t))) return false;
  for (let i = 0; i < dada.length; i++) {
    if (dada[i] !== 'to') continue;
    const sem = dada.filter((_, idx) => idx !== i);
    if (sem.join(' ') === certa.join(' ')) return true;
  }
  return false;
}

function acharCognato(user, certo) {
  return COGNATOS.find(c => c.errado === user && c.certos.includes(certo)) ?? null;
}

function parIrregular(a, b) {
  if (PLURAL_IRREGULAR.get(a) === b || PLURAL_IRREGULAR.get(b) === a) return true;
  const raiz = x => (x.endsWith('s') ? x.slice(0, -1) : x);
  return PLURAL_IRREGULAR.get(raiz(a)) === b || PLURAL_IRREGULAR.get(raiz(b)) === a;
}

function mesmaFamilia(a, b) {
  return FAMILIAS.some(f => f.includes(a) && f.includes(b));
}

function parS(a, b) {
  const casa = (x, y) => x + 's' === y || x + 'es' === y || (x.endsWith('y') && x.slice(0, -1) + 'ies' === y);
  return casa(a, b) || casa(b, a);
}

function parEd(a, b) {
  const casa = (x, y) => x + 'ed' === y || x + 'd' === y;
  return casa(a, b) || casa(b, a);
}

function baseVerbal(palavra) {
  if (VERBOS.has(palavra)) return true;
  if (palavra.endsWith('ies') && VERBOS.has(palavra.slice(0, -3) + 'y')) return true;
  if (palavra.endsWith('es') && VERBOS.has(palavra.slice(0, -2))) return true;
  if (palavra.endsWith('s') && VERBOS.has(palavra.slice(0, -1))) return true;
  if (palavra.endsWith('ed') && VERBOS.has(palavra.slice(0, -2))) return true;
  if (palavra.endsWith('d') && VERBOS.has(palavra.slice(0, -1))) return true;
  return false;
}

function tipoDoPar(user, certo, contexto) {
  const cog = acharCognato(user, certo);
  if (cog) return { tipo: 'cognato', cog };
  if (ARTIGOS.has(user) && ARTIGOS.has(certo)) return { tipo: 'artigo' };
  if (parIrregular(user, certo)) return { tipo: 'plural' };
  if (mesmaFamilia(user, certo) || parEd(user, certo)) return { tipo: 'tempo' };
  if (parS(user, certo)) {
    const verbo = baseVerbal(user) || baseVerbal(certo);
    const terceira = contexto.some(t => TERCEIRA.has(t));
    return { tipo: verbo || terceira ? 'tempo' : 'plural' };
  }
  return null;
}

function sobraPerigosa(sobras, palavraReal) {
  if (!palavraReal) return false;
  return sobras.some(t => t.length >= 3 && palavraReal(t));
}

function dicaFinal(especifica, tipo, nota, especifico) {
  if (especifico && especifica) return especifica;
  if (!especifico && nota) return nota;
  return especifica || nota || DICA_TIPO[tipo] || DICA_TIPO.troca;
}

function pacote(parcial, nota, especifico = true) {
  return {
    aceitar: false,
    letras: null,
    palavras: null,
    distancia: parcial.distancia ?? null,
    ...parcial,
    dica: dicaFinal(parcial.dica, parcial.tipo, nota, especifico)
  };
}

function diagOrdem(dada, certa, nota) {
  return pacote({
    tipo: 'ordem',
    chave: 'ordem',
    titulo: 'Ordem trocada',
    porque: `As palavras são as certas, mas a ordem mudou. Você escreveu ${cit(dada.join(' '))}. O esperado é ${cit(certa.join(' '))}.`,
    dica: DICA_TIPO.ordem,
    palavras: marcasPalavras(dada, certa, true)
  }, nota);
}

function diagTempo(chave, titulo, porque, dica, palavras, nota) {
  return pacote({
    tipo: 'tempo',
    chave,
    titulo,
    porque,
    dica,
    palavras
  }, nota);
}

function diagCognato(cog, user, certo, dada, certa, nota) {
  return pacote({
    tipo: 'cognato',
    chave: `cognato:${cog.errado}`,
    titulo: 'Falso amigo',
    porque: `Você usou ${cit(user)}, que parece português, mas aqui o certo é ${cit(certo)}.`,
    dica: cog.dica,
    palavras: marcasPalavras(dada, certa)
  }, nota);
}

function diagArtigo(dada, certa, sobras, faltas, nota) {
  const falta = faltas[0];
  const sobra = sobras[0];
  let chave = 'artigo';
  let dica = DICA_TIPO.artigo;
  let porque;
  if (falta && !sobra) {
    chave = falta === 'the' ? 'artigo:the' : falta === 'an' ? 'artigo:an' : 'artigo:a';
    porque = `Faltou o artigo ${cit(falta)} em ${cit(certa.join(' '))}.`;
  } else if (sobra && !falta) {
    chave = sobra === 'the' ? 'artigo:the' : 'artigo';
    porque = `O artigo ${cit(sobra)} sobrou. A frase certa é ${cit(certa.join(' '))}.`;
    dica = 'My, your e nomes de refeição dispensam the. Se o artigo não está no sentido, ele sai.';
  } else if ((falta === 'a' && sobra === 'an') || (falta === 'an' && sobra === 'a')) {
    chave = 'artigo:an';
    porque = `Trocou ${cit(sobra)} por ${cit(falta)}. An vem antes de som de vogal (an apple). A vem antes de som de consoante (a coffee).`;
    dica = 'An antes de som de vogal: an apple, an hour. A antes de som de consoante: a coffee, a house.';
  } else {
    porque = `O artigo não bateu. Você escreveu ${cit(dada.join(' '))}. O certo é ${cit(certa.join(' '))}.`;
  }
  return pacote({
    tipo: 'artigo',
    chave,
    titulo: 'Olho no artigo',
    porque,
    dica,
    palavras: marcasPalavras(dada, certa)
  }, nota);
}

function diagPlural(user, certo, dada, certa, nota) {
  const irregular = parIrregular(user, certo);
  return pacote({
    tipo: 'plural',
    chave: irregular ? `plural:${[user, certo].sort().join('/')}` : 'plural',
    titulo: 'Olho no plural',
    porque: irregular
      ? `${cit(user)} não é o plural de ${cit(certo)}. Esse par foge do -s.`
      : `O plural mudou: você usou ${cit(user)} e o certo é ${cit(certo)}.`,
    dica: irregular
      ? `Plural irregular: ${cit(certo)} e ${cit(user)} são o par. Nada de acrescentar -s nesse.`
      : DICA_TIPO.plural,
    palavras: marcasPalavras(dada, certa)
  }, nota);
}

function chaveTempo(user, certo) {
  if (['am', 'is', 'are', 'was', 'were', 'be'].includes(user) || ['am', 'is', 'are', 'was', 'were', 'be'].includes(certo)) return 'tempo:be';
  if (parS(user, certo)) return 'tempo:s';
  if (['do', 'does', 'did'].includes(user) || ['do', 'does', 'did'].includes(certo)) return 'tempo:do';
  return 'tempo';
}

function dicaTempo(chave) {
  if (chave === 'tempo:be') return 'To be muda com a pessoa: I am, you are, he/she/it is, we/they are. No passado, I/he/she/it was e you/we/they were.';
  if (chave === 'tempo:s') return 'No presente, he, she e it ganham -s no verbo: she works. Com I, you, we e they o verbo fica igual.';
  if (chave === 'tempo:do') return 'Pergunta e negativa no presente pedem do ou does. He, she e it usam does.';
  if (chave === 'tempo:to') return 'Depois de can, will, must e should o verbo vem sem to: can help, will be.';
  return DICA_TIPO.tempo;
}

function diagTypo(dadaTexto, certaTexto, dada, certa, aceitar, nota) {
  const focoDada = dada.find((t, i) => t !== certa[i]) ?? dada[dada.length - 1] ?? '';
  const focoCerta = certa.find((t, i) => t !== dada[i]) ?? certa[certa.length - 1] ?? '';
  const espaco = dada.join('') === certa.join('') && dada.join(' ') !== certa.join(' ');
  return pacote({
    tipo: 'typo',
    chave: 'typo',
    titulo: !aceitar ? 'Quase a grafia' : espaco ? 'Quase! Faltou um espaço' : 'Quase! Só uma letrinha',
    porque: espaco
      ? `Faltou um espaço. As letras batem com ${cit(certa.join(' '))}.`
      : aceitar
        ? `Você escreveu ${cit(focoDada || base(dadaTexto))} e o certo é ${cit(focoCerta || base(certaTexto))}. Foi um deslize de letra, então vale, com este aviso.`
        : `A grafia chegou perto de ${cit(base(certaTexto) || certa.join(' '))}, mas ainda tem mais de um deslize.`,
    dica: espaco
      ? 'As palavras certas estão aí. Falta só o espaço entre elas.'
      : DICA_TIPO.typo,
    letras: marcasLetras(dadaTexto, certaTexto),
    aceitar,
    distancia: damerau(base(dadaTexto), base(certaTexto))
  }, nota);
}

function diagTrocaReal(user, certo, dada, certa, nota) {
  return pacote({
    tipo: 'troca',
    chave: 'troca',
    titulo: 'É outra palavra',
    porque: `${cit(user)} parece ${cit(certo)}, mas é outra palavra de verdade. Errinho de uma letra só vale quando não vira um verbete diferente.`,
    dica: DICA_TIPO.typo,
    palavras: marcasPalavras(dada, certa)
  }, nota, false);
}

function diagFalta(faltas, certa, dada, nota) {
  return pacote({
    tipo: 'falta',
    chave: 'falta',
    titulo: 'Faltou palavra',
    porque: `Faltou ${faltas.map(cit).join(', ')}. A frase certa é ${cit(certa.join(' '))}.`,
    dica: DICA_TIPO.falta,
    palavras: marcasPalavras(dada, certa)
  }, nota, false);
}

function diagSobra(sobras, certa, dada, nota) {
  return pacote({
    tipo: 'sobra',
    chave: 'sobra',
    titulo: 'Palavra a mais',
    porque: `Sobrou ${sobras.map(cit).join(', ')}. Sem isso, o certo é ${cit(certa.join(' '))}.`,
    dica: DICA_TIPO.sobra,
    palavras: marcasPalavras(dada, certa)
  }, nota, false);
}

function diagTroca(sobras, faltas, dada, certa, nota) {
  const a = sobras[0];
  const b = faltas[0];
  const porque = a && b
    ? `Você trocou ${cit(a)} por ${cit(b)}. O resto da frase pode estar certo.`
    : `Não bateu com ${cit(certa.join(' '))}.`;
  return pacote({
    tipo: 'troca',
    chave: 'troca',
    titulo: 'Palavra trocada',
    porque,
    dica: DICA_TIPO.troca,
    palavras: marcasPalavras(dada, certa)
  }, nota, false);
}

function diagEscolha(dadaTexto, certaTexto, dada, certa, nota) {
  const marcou = String(dadaTexto ?? '').trim();
  return pacote({
    tipo: 'escolha',
    chave: 'escolha',
    titulo: 'Não foi essa',
    porque: marcou
      ? `Você marcou ${cit(marcou)}. A certa é ${cit(String(certaTexto).trim())}.`
      : `Você não marcou nenhuma opção. A certa é ${cit(String(certaTexto).trim())}.`,
    dica: DICA_TIPO.escolha,
    palavras: dada.length || certa.length ? marcasPalavras(dada, certa) : null
  }, nota, false);
}

function diagVazio(certaTexto, nota) {
  return pacote({
    tipo: 'vazio',
    chave: 'vazio',
    titulo: 'Sem resposta ainda',
    porque: `Sem uma tentativa eu não comparo letra por letra. A certa é ${cit(String(certaTexto).trim())}.`,
    dica: DICA_TIPO.vazio
  }, nota, false);
}

function classificar(dadaTexto, certaTexto, opt) {
  const dada = tokens(dadaTexto);
  const certa = tokens(certaTexto);
  const nota = opt.nota || '';
  const contexto = tokens(opt.contexto || certaTexto);
  if (!certa.length) return diagVazio(certaTexto, nota);
  if (!dada.length) {
    return opt.opcao ? diagEscolha(dadaTexto, certaTexto, dada, certa, nota) : diagVazio(certaTexto, nota);
  }

  if (mesmaBolsa(dada, certa)) {
    const vistaDada = superficie(dadaTexto);
    const vistaCerta = superficie(certaTexto);
    const vista = mesmaBolsa(
      vistaDada.map(t => t.toLowerCase()),
      vistaCerta.map(t => t.toLowerCase())
    );
    return diagOrdem(vista ? vistaDada : dada, vista ? vistaCerta : certa, nota);
  }

  const aux = faltaAuxiliar(dada, certa);
  if (aux) {
    return diagTempo(
      'tempo:do',
      'O verbo mudou',
      `Faltou o ${cit(aux)}. Negativa no presente pede do ou does: ${cit(certa.join(' '))}, nunca sem o auxiliar.`,
      dicaTempo('tempo:do'),
      marcasPalavras(dada, certa),
      nota
    );
  }
  if (sobraToDeModal(dada, certa)) {
    return diagTempo(
      'tempo:to',
      'O verbo mudou',
      'Sobrou um to depois de can, will ou must. Esses verbos pedem o próximo verbo puro, sem to.',
      dicaTempo('tempo:to'),
      marcasPalavras(dada, certa),
      nota
    );
  }

  const { sobras, faltas } = restos(dada, certa);
  const pares = sobras.length === faltas.length && sobras.length > 0
    ? sobras.map((user, i) => ({ user, certo: faltas[i], info: tipoDoPar(user, faltas[i], contexto) }))
    : null;

  if (pares && pares.every(p => p.info?.tipo === 'cognato')) {
    return diagCognato(pares[0].info.cog, pares[0].user, pares[0].certo, dada, certa, nota);
  }
  if ((sobras.length + faltas.length) > 0 && [...sobras, ...faltas].every(t => ARTIGOS.has(t))) {
    return diagArtigo(dada, certa, sobras, faltas, nota);
  }
  if (pares && pares.length === 1 && pares[0].info?.tipo === 'plural') {
    return diagPlural(pares[0].user, pares[0].certo, dada, certa, nota);
  }
  if (pares && pares.every(p => p.info?.tipo === 'tempo')) {
    const chave = chaveTempo(pares[0].user, pares[0].certo);
    return diagTempo(
      chave,
      'O verbo mudou',
      `A forma do verbo mudou: você usou ${cit(pares[0].user)} e o certo é ${cit(pares[0].certo)}.`,
      dicaTempo(chave),
      marcasPalavras(dada, certa),
      nota
    );
  }

  const juntoDada = dada.join('');
  const juntoCerta = certa.join('');
  const fraseCerta = certa.join(' ');
  const proximos = pares && pares.every(p => damerau(p.user, p.certo) <= 2);
  if (juntoDada === juntoCerta && dada.join(' ') !== fraseCerta) {
    const aceitar = !opt.opcao && fraseCerta.length >= 5;
    return diagTypo(dadaTexto, certaTexto, dada, certa, aceitar, nota);
  }
  if (proximos) {
    if (pares.length === 1 && sobraPerigosa(sobras, opt.palavraReal)) {
      return diagTrocaReal(pares[0].user, pares[0].certo, dada, certa, nota);
    }
    const distPares = pares.reduce((acc, p) => acc + damerau(p.user, p.certo), 0);
    const aceitar = !opt.opcao
      && distPares <= 1
      && pares.length === 1
      && fraseCerta.length >= 5
      && !sobraPerigosa(sobras, opt.palavraReal);
    return diagTypo(dadaTexto, certaTexto, dada, certa, aceitar, nota);
  }

  const distFrase = damerau(base(dadaTexto), base(certaTexto));
  if (!opt.opcao && distFrase <= 1 && fraseCerta.length >= 5 && !sobraPerigosa(sobras, opt.palavraReal)) {
    return diagTypo(dadaTexto, certaTexto, dada, certa, true, nota);
  }

  if (!sobras.length && faltas.length) return diagFalta(faltas, certa, dada, nota);
  if (!faltas.length && sobras.length) return diagSobra(sobras, certa, dada, nota);
  if (opt.opcao) return diagEscolha(dadaTexto, certaTexto, dada, certa, nota);
  return diagTroca(sobras, faltas, dada, certa, nota);
}

function rank(diag) {
  if (diag.aceitar) return 0;
  const peso = { cognato: 1, tempo: 2, artigo: 2, plural: 2, ordem: 3, typo: 4, falta: 5, sobra: 5, troca: 6, escolha: 7, vazio: 8 };
  return peso[diag.tipo] ?? 9;
}

export function diagnosticar({ dada, certa, alternativas, nota, opcao, palavraReal, contexto } = {}) {
  const candidatos = [certa, ...(alternativas ?? [])].filter(c => typeof c === 'string' && c.trim());
  if (!candidatos.length) return diagVazio('', nota);
  let melhor = null;
  for (const c of candidatos) {
    const diag = classificar(dada ?? '', c, {
      opcao: !!opcao,
      palavraReal,
      nota: nota || '',
      contexto: contexto || c
    });
    if (!melhor || rank(diag) < rank(melhor)) melhor = diag;
  }
  return melhor;
}

export function dicaDoDia(dia) {
  const i = semente(String(dia ?? '')) % DICAS_DIA.length;
  return DICAS_DIA[i];
}

function regraDaFrase(en) {
  const t = tokens(en);
  if (!t.length) return null;
  if ((t.includes('do') || t.includes('does') || t.includes('did')) && t.includes('not')) {
    return { titulo: 'Negativa com do', corpo: dicaTempo('tempo:do') };
  }
  if (t.includes('can') || t.includes('will') || t.includes('must')) {
    return { titulo: 'Verbo puro depois de can e will', corpo: dicaTempo('tempo:to') };
  }
  if (t.some(p => ['am', 'is', 'are', 'was', 'were'].includes(p))) {
    return { titulo: 'To be muda com a pessoa', corpo: dicaTempo('tempo:be') };
  }
  if (t.includes('an')) {
    return { titulo: 'An antes de som de vogal', corpo: 'An entra antes de som de vogal: an apple, an hour. A entra antes de som de consoante: a coffee.' };
  }
  if (t.includes('a') || t.includes('the')) {
    return { titulo: 'Artigo em inglês', corpo: DICA_TIPO.artigo };
  }
  if (t.some(p => TERCEIRA.has(p))) {
    return { titulo: 'Terceira pessoa', corpo: dicaTempo('tempo:s') };
  }
  if (t.includes('my') || t.includes('your') || t.includes('her') || t.includes('his')) {
    return { titulo: 'Possessivo sem the', corpo: 'My, your, his e her já dizem de quem é. Não coloque the na frente: my mother, nunca "the my mother".' };
  }
  if (t.some(p => PLURAL_IRREGULAR.has(p) || [...PLURAL_IRREGULAR.values()].includes(p))) {
    return { titulo: 'Plural irregular', corpo: DICA_TIPO.plural };
  }
  return null;
}

export function dicaContextual(item, licao) {
  const blocos = [];
  if (licao?.dica?.titulo && licao?.dica?.corpo) {
    blocos.push({ titulo: licao.dica.titulo, corpo: licao.dica.corpo });
  }
  if (item?.nota) blocos.push({ titulo: 'Nesta frase', corpo: item.nota });
  const regra = regraDaFrase(item?.en);
  if (regra && !blocos.some(b => b.corpo === regra.corpo)) blocos.push(regra);
  if (!blocos.length) {
    blocos.push({
      titulo: 'Ordem da frase',
      corpo: 'Sujeito, verbo e complemento, nessa ordem. Se for pergunta, o auxiliar (do, does, is, can) vem na frente.'
    });
  }
  return blocos;
}

export function rotuloChave(chave, tipo) {
  if (typeof chave === 'string' && chave.startsWith('cognato:')) return `falso amigo (${chave.slice(8)})`;
  if (chave === 'artigo:an') return 'a ou an';
  if (chave === 'artigo:the') return 'artigo the';
  if (chave === 'artigo:a') return 'artigo a';
  if (chave === 'tempo:s') return 'o -s da terceira pessoa';
  if (chave === 'tempo:do') return 'do ou does na negativa';
  if (chave === 'tempo:be') return 'verbo to be';
  if (chave === 'tempo:to') return 'verbo sem to';
  if (typeof chave === 'string' && chave.startsWith('plural:')) return 'plural irregular';
  return ROTULOS[tipo] ?? ROTULOS[chave] ?? 'erro';
}

export function textoDoPadrao(chave, tipo) {
  if (chave === 'artigo:an') return 'An antes de som de vogal (an apple). A antes de som de consoante (a coffee).';
  if (chave === 'artigo:the') return 'The marca algo específico, que os dois já sabem qual é. My e your não levam the.';
  if (chave === 'artigo:a') return 'Coisa contável no singular pede a ou an: a cat, an egg.';
  if (typeof chave === 'string' && chave.startsWith('cognato:')) {
    const palavra = chave.slice(8);
    const cog = COGNATOS.find(c => c.errado === palavra);
    return cog?.dica ?? DICA_TIPO.cognato;
  }
  if (typeof chave === 'string' && chave.startsWith('tempo:')) return dicaTempo(chave);
  if (chave === 'ordem') return DICA_TIPO.ordem;
  if (chave === 'typo') return DICA_TIPO.typo;
  return DICA_TIPO[tipo] ?? DICA_TIPO.troca;
}
