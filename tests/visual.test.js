import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

function semTravessao(caminho) {
  const arquivo = readFileSync(new URL(caminho, import.meta.url), 'utf8');
  assert.equal(arquivo.includes('\u2014'), false, caminho);
  assert.equal(arquivo.includes('\u2013'), false, caminho);
  return arquivo;
}

describe('sistema visual 3.15', () => {
  test('tokens, modo escuro e movimento reduzido', () => {
    const css = semTravessao('../css/style.css');
    const data = readFileSync(join(raiz, 'js/data.js'), 'utf8');
    const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
    assert.match(data, /VERSAO_APP = '3\.15'/);
    assert.match(data, /versao: '3\.15'/);
    assert.match(data, /versao: '3\.14'/);
    assert.match(sw, /gringolingo-v146/);
    assert.match(sw, /nunito-latin\.woff2/);
    assert.match(css, /font-family: 'Nunito'/);
    assert.match(css, /--fundo: #FFF8EF/);
    assert.match(css, /--fundo: #0F1A1E/);
    assert.match(css, /\.anel-xp \{/);
    assert.match(css, /\.trilha-no \{/);
    assert.match(css, /\.agora-card \{/);
    for (const token of ['--raio-md', '--sombra-card', '--xp-texto', '--icone-fundo', '--foco', '--espaco-4']) {
      assert.equal(css.includes(token), true, token);
    }
    assert.match(css, /:root\[data-tema="escuro"\]/);
    assert.match(css, /--foco: #7AD4FF/);
    assert.match(css, /prefers-reduced-motion: reduce/);
    assert.match(css, /@keyframes subir-card/);
    assert.match(css, /@keyframes brilho-xp/);
    const emoji = css.slice(css.indexOf('\n.revisao-emoji {'), css.indexOf('}', css.indexOf('\n.revisao-emoji {')));
    assert.match(emoji, /border-radius/);
    assert.match(emoji, /flex: 0 0 44px/);
    assert.match(emoji, /height: 44px/);
    const foco = css.slice(css.indexOf('\n:focus-visible {'), css.indexOf('}', css.indexOf('\n:focus-visible {')));
    assert.match(foco, /outline: 3px solid var\(--foco\)/);
    const progresso = css.slice(css.indexOf('\n.progresso {'), css.indexOf('}', css.indexOf('\n.progresso {')));
    assert.match(progresso, /height: 16px/);
    const card = css.slice(css.indexOf('\n.card {'), css.indexOf('}', css.indexOf('\n.card {')));
    assert.match(card, /overflow-wrap: anywhere/);
    assert.match(card, /max-width: 100%/);
    assert.match(card, /box-shadow: var\(--sombra-suave\)/);
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    assert.match(app, /mascote\('feliz'/);
    assert.match(app, /function anelXp/);
    assert.match(app, /class: 'trilha-linha'/);
    assert.match(app, /function heroDoHub/);
    assert.match(app, /class: 'hub-hero'/);
    assert.match(app, /Bora falar hoje\?/);
    assert.match(app, /Comece hoje/);
    assert.match(app, /COMEÇAR/);
    assert.match(css, /\.hub-hero \{/);
    assert.match(css, /\.streak-selo \{/);
    assert.match(css, /data-cat="trabalho"/);
    assert.match(css, /--vidro:/);
    assert.equal(css.includes('backdrop-filter'), false);
    assert.equal(css.includes('blur('), false);
    assert.equal(css.includes('border-radius: 32px'), false);
    assert.equal(css.includes('--raio-lg: 32px'), false);
    assert.match(css, /\.estado-vazio \{/);
    assert.match(css, /\.icone-chip \{/);
    assert.match(css, /\.carregando-anel \{/);
    assert.match(css, /@keyframes girar-anel/);
    assert.match(app, /function vazioDoHub/);
    assert.match(app, /estado-carregando/);
    assert.match(app, /Carregando o banco de palavras/);
    assert.equal(css.includes('\u2014'), false);
    assert.equal(css.includes('\u2013'), false);
  });
});
