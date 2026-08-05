import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import './ambiente.js';
import { retornoVazio } from './ambiente.js';

const { trilhasVocab, progressoTrilha, palavrasVocabAprendidas, POR_LICAO, TRILHAS } = await import('../js/vocabulario.js');
const jogoExercicios = await import('../js/exercises.js');
const { gerarExercicios, montarExercicio } = jogoExercicios;
const { PALAVRAS } = await import('../js/dicionario-dados.js');
const { UNIDADES } = await import('../js/data.js');

const trilhas = trilhasVocab(PALAVRAS);

describe('trilhas da Expansão de Vocabulário', () => {
  test('cobrem todas as palavras do banco que não estão no curso, sem repetir', () => {
    const doCurso = new Set(UNIDADES.flatMap(u => u.licoes.flatMap(l => l.itens.map(i => i.en.toLowerCase()))));
    const esperadas = PALAVRAS.filter(p => !doCurso.has(p.en.toLowerCase())).length;
    const ens = trilhas.flatMap(t => t.palavras.map(p => p.en));
    assert.equal(ens.length, esperadas, 'nenhuma palavra do banco pode ficar de fora');
    assert.equal(new Set(ens).size, ens.length, 'nenhuma palavra pode aparecer em duas trilhas');
    assert.ok(!ens.some(en => doCurso.has(en.toLowerCase())), 'palavra do curso não entra na Expansão');
  });

  test('lições têm no máximo o tamanho padrão e ids determinísticos', () => {
    trilhas.forEach(t => {
      assert.ok(t.licoes.length >= 1);
      t.licoes.forEach((l, i) => {
        assert.equal(l.id, `vocab:${t.id}:${i}`);
        assert.ok(l.itens.length >= 1 && l.itens.length <= POR_LICAO);
        l.itens.forEach(item => {
          assert.ok(item.en && item.pt && item.classe, `item incompleto em ${l.id}`);
          assert.ok(Array.isArray(item.traducoes) && item.traducoes.length >= 1);
        });
      });
    });
  });

  test('a mesma lição sempre devolve as mesmas palavras (progresso reconstruível)', () => {
    const denovo = trilhasVocab(PALAVRAS);
    assert.deepEqual(
      denovo[0].licoes[3].itens.map(i => i.en),
      trilhas[0].licoes[3].itens.map(i => i.en)
    );
  });

  test('progressoTrilha aponta a próxima lição e as palavras aprendidas', () => {
    const t = trilhas[1];
    const feitas = { [t.licoes[0].id]: { estrelas: 3 }, [t.licoes[1].id]: { estrelas: 2 } };
    const p = progressoTrilha(t, feitas);
    assert.equal(p.feitas, 2);
    assert.equal(p.proxima.id, t.licoes[2].id);
    assert.equal(p.ultimaFeita.id, t.licoes[1].id);
    assert.equal(p.palavras, 2 * POR_LICAO);
    const aprendidas = palavrasVocabAprendidas(PALAVRAS, feitas);
    assert.equal(aprendidas.length, t.licoes[0].itens.length + t.licoes[1].itens.length);
  });

  test('as quatro trilhas cobrem todas as classes do banco', () => {
    const cobertas = new Set(TRILHAS.flatMap(t => t.classes));
    const noBanco = new Set(PALAVRAS.map(p => p.classe));
    for (const c of noBanco) assert.ok(cobertas.has(c), `classe ${c} sem trilha`);
  });
});

describe('apresentação de palavra nova', () => {
  const itens = trilhas[0].licoes[0].itens;

  test('palavra nova ganha cartão de apresentação antes da primeira cobrança', () => {
    for (let i = 0; i < 30; i++) {
      const novos = new Set(itens.map(x => x.en));
      const fila = gerarExercicios(itens, itens, 9, novos);
      const vistos = new Set();
      for (const ex of fila) {
        const envolvidos = ex.tipo === 'pares' ? ex.pares : ex.item ? [ex.item] : [];
        if (ex.tipo === 'apresentacao') {
          assert.ok(!vistos.has(ex.item.en), 'apresentação não pode repetir');
          vistos.add(ex.item.en);
        } else {
          envolvidos.forEach(it => {
            assert.ok(vistos.has(it.en), `"${it.en}" foi cobrada antes de ser apresentada`);
          });
        }
      }
      assert.equal(fila.filter(e => e.tipo !== 'apresentacao').length, 9, 'apresentações não roubam exercícios');
    }
  });

  test('sem palavras novas a fila fica igual à de sempre', () => {
    const fila = gerarExercicios(itens, itens, 8, new Set());
    assert.equal(fila.filter(e => e.tipo === 'apresentacao').length, 0);
    assert.equal(fila.length, 8);
  });

  test('o cartão mostra a palavra, as traduções e um botão de continuar', () => {
    const item = { en: 'able', pt: 'capaz', traducoes: ['capaz', 'apto'], classe: 'adj' };
    let continuou = false;
    const visao = montarExercicio({ tipo: 'apresentacao', item }, { ...retornoVazio(), aoContinuar: () => { continuou = true; } });
    assert.equal(visao.temVerificar, false);
    assert.equal(visao.apresentacao, true);
    assert.ok(visao.el.textContent.includes('able'));
    assert.ok(visao.el.textContent.includes('capaz · apto'));
    visao.focoInicial.click();
    assert.equal(continuou, true);
  });
});

describe('correções da revisão da Expansão', () => {
  test('sinônimos com a mesma tradução viram alt e evitar mútuos', () => {
    const verbos = trilhas.find(t => t.id === 'verbo');
    const figureOut = verbos.palavras.find(p => p.en === 'figure out');
    const findOut = verbos.palavras.find(p => p.en === 'find out');
    if (figureOut && findOut && figureOut.pt === findOut.pt) {
      assert.ok(figureOut.alt.includes('find out'), 'digitar o sinônimo precisa valer');
      assert.ok(figureOut.evitar.includes('find out'), 'o sinônimo não pode virar alternativa errada');
      assert.ok(findOut.alt.includes('figure out'));
    }
    trilhas.forEach(t => {
      const porPt = new Map();
      t.palavras.forEach(p => {
        const chave = p.pt.toLowerCase();
        porPt.set(chave, (porPt.get(chave) ?? 0) + 1);
      });
      t.palavras.forEach(p => {
        if ((porPt.get(p.pt.toLowerCase()) ?? 0) > 1) {
          assert.ok(p.alt.length >= 1, `${p.en} tem gêmea de tradução mas alt vazio`);
        }
      });
    });
  });

  test('pares nunca saem com duas traduções iguais', () => {
    const gemeos = [
      { en: 'figure out', pt: 'descobrir' }, { en: 'find out', pt: 'descobrir' },
      { en: 'bike', pt: 'bicicleta' }, { en: 'bicycle', pt: 'bicicleta' },
      { en: 'water', pt: 'água' }, { en: 'bread', pt: 'pão' }, { en: 'cheese', pt: 'queijo' }
    ];
    for (let i = 0; i < 200; i++) {
      const fila = gerarExercicios(gemeos, gemeos, 9);
      const pares = fila.find(e => e.tipo === 'pares');
      if (!pares) continue;
      const pts = pares.pares.map(p => p.pt);
      assert.equal(new Set(pts).size, pts.length, `pares com tradução repetida: ${pts}`);
    }
  });

  test('distratores não oferecem palavra com a mesma tradução do alvo', () => {
    const alvo = { en: 'figure out', pt: 'descobrir' };
    const pool = [alvo, { en: 'find out', pt: 'descobrir' }, { en: 'melt', pt: 'derreter' }, { en: 'acquire', pt: 'adquirir' }, { en: 'bake', pt: 'assar' }, { en: 'boil', pt: 'ferver' }];
    const { exercicioFacil } = jogoExercicios;
    for (let i = 0; i < 200; i++) {
      const ex = exercicioFacil(alvo, pool);
      if (ex.tipo === 'escolhaPtEn') assert.ok(!ex.opcoes.includes('find out'), 'duas opções corretas na múltipla escolha');
      if (ex.tipo === 'escolhaEnPt') assert.equal(ex.opcoes.filter(o => o === 'descobrir').length, 1);
    }
  });
});
