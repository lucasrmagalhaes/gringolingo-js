import test, { describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  CENARIOS, IDS_CENARIOS, rodadasDo, avaliarResposta, escolherTentativa, pontuarSombra,
  filaSombra, montarRodada, separarResposta, montarCorpoIa, urlDoModelo, mensagemDeErroIa,
  lerIa, salvarIa, apagarIa, iaPronta, lerPapo, salvarPapo, apagarPapo, pedirParceiro, MODELO_PADRAO
} = await import('../js/conversa.js');
const { estado, limparEstadoMemoria, registrarDialogo, registrarSombra, mesclarEstado, exportarEstado, resetarEstado } = await import('../js/game.js');

beforeEach(() => {
  limparEstadoMemoria();
  limparArmazenamento();
});

describe('diálogos guiados', () => {
  test('cinco cenas, cada uma com falas do app e respostas do aluno', () => {
    assert.deepEqual(IDS_CENARIOS, ['restaurante', 'hotel', 'entrevista', 'papo', 'caminho']);
    for (const c of CENARIOS) {
      assert.ok(c.titulo && c.onde && c.emoji);
      const rodadas = rodadasDo(c);
      assert.ok(rodadas.length >= 4, c.id);
      for (const r of rodadas) {
        assert.ok(r.npc.length >= 1);
        assert.equal(r.npc[0].quem, 'npc');
        assert.ok(r.npc[0].en && r.npc[0].pt);
        assert.ok(r.voce.melhor && r.voce.dica && r.voce.pt);
        assert.ok(r.voce.aceitas.length >= 2);
      }
    }
  });

  test('o texto novo não usa travessão', () => {
    const arquivo = readFileSync(new URL('../js/conversa.js', import.meta.url), 'utf8');
    assert.equal(arquivo.includes('\u2014'), false);
  });

  test('aceita a frase modelo, uma alternativa e a contração', () => {
    const passo = rodadasDo(CENARIOS[0])[0].voce;
    assert.equal(avaliarResposta(passo, 'I would like a coffee, please.').ok, true);
    assert.equal(avaliarResposta(passo, 'Can I have a coffee?').nota, 100);
    assert.equal(avaliarResposta(passo, "I'd like a coffee").ok, true);
  });

  test('resposta vazia ou errada traz o tutor e o melhor jeito', () => {
    const passo = rodadasDo(CENARIOS[0])[0].voce;
    const vazia = avaliarResposta(passo, '   ');
    assert.equal(vazia.ok, false);
    assert.equal(vazia.nota, 0);
    assert.ok(vazia.tutor.titulo);
    const errada = avaliarResposta(passo, 'I want a beer');
    assert.equal(errada.ok, false);
    assert.equal(errada.melhor, passo.melhor);
    assert.ok(errada.tutor.porque);
    assert.ok(errada.tutor.dica);
  });

  test('entre alternativas, fica a que mais se aproxima', () => {
    const passo = rodadasDo(CENARIOS[4])[0].voce;
    const escolhida = escolherTentativa(passo, ['hello there', 'where is the station']);
    assert.equal(escolhida.ok, true);
    assert.match(escolhida.dita, /station/);
  });
});

describe('sombra', () => {
  test('nota 100 quando a frase bate, e marca a palavra que faltou', () => {
    const cheia = pontuarSombra('where is the station', 'Where is the station?');
    assert.equal(cheia.nota, 100);
    assert.ok(cheia.partes.every(p => p.ok));
    const falta = pontuarSombra('where is the station', 'where is station');
    assert.equal(falta.nota, 75);
    assert.deepEqual(falta.partes.filter(p => !p.ok).map(p => p.t), ['the']);
  });

  test('palavra a mais abaixa a nota e aparece em sobras', () => {
    const extra = pontuarSombra('where is the station', 'where is the station please');
    assert.ok(extra.nota < 100);
    assert.deepEqual(extra.sobras, ['please']);
  });

  test('a fila usa frases aprendidas e completa com o banco fixo, sem repetir', () => {
    const fila = filaSombra([
      { en: 'where is the station', pt: 'onde fica a estação' },
      { en: 'hi', pt: 'oi' },
      { en: 'where is the station', pt: 'de novo' }
    ]);
    assert.equal(fila[0].en, 'where is the station');
    assert.equal(fila.filter(f => f.en === 'where is the station').length, 1);
    assert.ok(fila.every(f => f.en.includes(' ')));
    assert.equal(montarRodada(fila, 5).length, 5);
  });
});

describe('parceiro opcional', () => {
  test('vem desligado e a chave não entra no progresso', () => {
    assert.equal(iaPronta(), false);
    assert.equal(lerIa().ligada, false);
    assert.equal(lerIa().modelo, MODELO_PADRAO);
    salvarIa({ ligada: true, chave: 'chave-de-teste-com-20+', modelo: 'gemini-2.5-flash' });
    assert.equal(iaPronta(), true);
    registrarDialogo({ id: 'restaurante', xp: 10, acertos: 1, respostas: 1, nota: 100, perfeita: false, comboMax: 0 });
    const bruto = JSON.stringify(exportarEstado());
    assert.equal(bruto.includes('chave-de-teste-com-20+'), false);
    assert.equal(JSON.stringify(estado).includes('chave-de-teste-com-20+'), false);
  });

  test('chave curta não liga, e apagar remove tudo', () => {
    const salva = salvarIa({ ligada: true, chave: 'curta' });
    assert.equal(salva.ligada, false);
    assert.equal(iaPronta(), false);
    salvarIa({ ligada: true, chave: 'chave-de-teste-com-20+' });
    apagarIa();
    assert.equal(lerIa().chave, '');
    assert.equal(iaPronta(), false);
  });

  test('o papo local não vai para o backup e some no reset', () => {
    salvarPapo([{ papel: 'voce', texto: 'segredo do papo', correcao: '', melhor: '' }]);
    assert.equal(lerPapo()[0].texto, 'segredo do papo');
    assert.equal(JSON.stringify(exportarEstado()).includes('segredo do papo'), false);
    resetarEstado();
    assert.deepEqual(lerPapo(), []);
  });

  test('separa a fala, a correção e o melhor jeito', () => {
    const resp = separarResposta('Hi there!\nCORRECAO: Faltou o please.\nMELHOR: I would like a coffee, please.');
    assert.equal(resp.fala, 'Hi there!');
    assert.match(resp.correcao, /please/);
    assert.match(resp.melhor, /coffee/);
  });

  test('o pedido manda o nível e não coloca a chave no corpo', () => {
    const corpo = montarCorpoIa({
      nivel: 2,
      titulo: 'Hello Hello',
      historico: [{ papel: 'louro', texto: 'Hi!' }],
      mensagem: 'I am fine'
    });
    const json = JSON.stringify(corpo);
    assert.match(json, /level 2/);
    assert.match(json, /Hello Hello/);
    assert.equal(json.includes('chave'), false);
    assert.equal(corpo.contents.at(-1).parts[0].text, 'I am fine');
    assert.equal(urlDoModelo('gemini-2.5-flash'), 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent');
    assert.equal(urlDoModelo('ruim/../x'), 'https://generativelanguage.googleapis.com/v1beta/models/ruim..x:generateContent');
  });

  test('traduz falha de chave e de rede', () => {
    assert.match(mensagemDeErroIa(401), /chave/);
    assert.match(mensagemDeErroIa(0), /Sem rede/);
  });

  test('pedirParceiro usa a chave no cabeçalho e lê a resposta', async () => {
    let visto = null;
    const fetchImpl = async (url, opt) => {
      visto = { url, opt };
      return {
        ok: true,
        json: async () => ({ candidates: [{ content: { parts: [{ text: 'Nice.\nCORRECAO: Boa frase.\nMELHOR: I am fine.' }] } }] })
      };
    };
    const resp = await pedirParceiro({
      chave: 'chave-de-teste-com-20+',
      modelo: 'gemini-2.5-flash',
      nivel: 1,
      titulo: 'Turista Perdido',
      historico: [],
      mensagem: 'I am fine',
      fetchImpl
    });
    assert.equal(visto.opt.headers['x-goog-api-key'], 'chave-de-teste-com-20+');
    assert.equal(JSON.parse(visto.opt.body).contents[0].parts[0].text, 'I am fine');
    assert.equal(resp.fala, 'Nice.');
    assert.equal(resp.melhor, 'I am fine.');
  });
});

describe('progresso da conversa', () => {
  test('diálogo e sombra entram no XP, no streak e nas conquistas', () => {
    const d = registrarDialogo({ id: 'restaurante', xp: 18, acertos: 4, respostas: 4, nota: 90, perfeita: true, comboMax: 0 });
    assert.equal(estado.stats.dialogos, 1);
    assert.equal(estado.conversas.restaurante.melhor, 90);
    assert.equal(estado.conversas.restaurante.vezes, 1);
    assert.ok(estado.badges.includes('papo'));
    assert.equal(estado.xp, 18 + d.bonusMissoes);
    registrarSombra({ xp: 12, acertos: 3, respostas: 5, nota: 77, perfeita: false, comboMax: 0 });
    assert.equal(estado.stats.sombra, 1);
    assert.equal(estado.stats.recordeSombra, 77);
    assert.ok(estado.badges.includes('sombra'));
    assert.equal(estado.stats.revisoes, 0);
    assert.equal(estado.stats.escutas, 0);
  });

  test('o merge fica com o maior recorde de cada cena', () => {
    estado.conversas.hotel = { vezes: 1, melhor: 40 };
    estado.stats.dialogos = 1;
    estado.stats.recordeSombra = 30;
    mesclarEstado({
      versaoDados: 3,
      xp: 0,
      conversas: { hotel: { vezes: 2, melhor: 20 }, caminho: { vezes: 1, melhor: 80 } },
      stats: { dialogos: 0, sombra: 3, recordeSombra: 55 }
    });
    assert.equal(estado.conversas.hotel.vezes, 2);
    assert.equal(estado.conversas.hotel.melhor, 40);
    assert.equal(estado.conversas.caminho.melhor, 80);
    assert.equal(estado.stats.dialogos, 1);
    assert.equal(estado.stats.sombra, 3);
    assert.equal(estado.stats.recordeSombra, 55);
  });
});
