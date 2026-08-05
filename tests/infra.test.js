import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('service worker', () => {
  const sw = readFileSync(join(RAIZ, 'sw.js'), 'utf8');

  test('a VERSAO segue o padrão gringolingo-vN', () => {
    assert.match(sw, /const VERSAO = 'gringolingo-v\d+'/);
  });

  test('todo caminho listado para cache existe no disco', () => {
    const caminhos = [...sw.matchAll(/'(\.\/[^']+)'/g)].map(m => m[1]);
    assert.ok(caminhos.length >= 20, 'a lista de precache sumiu do sw.js?');
    for (const c of caminhos) {
      const arquivo = c === './' ? 'index.html' : c.slice(2);
      assert.ok(existsSync(join(RAIZ, arquivo)), `sw.js lista ${c}, que não existe no disco`);
    }
  });

  test('todo módulo js/ de primeiro nível está no precache (ou é sabidamente tardio)', () => {
    const tardios = new Set(['dicionario-dados.js']);
    const modulos = readdirSync(join(RAIZ, 'js')).filter(f => f.endsWith('.js'));
    for (const m of modulos) {
      if (tardios.has(m)) continue;
      assert.ok(sw.includes(`'./js/${m}'`), `js/${m} não está no precache do sw.js`);
    }
  });
});

describe('CSP do index.html', () => {
  const html = readFileSync(join(RAIZ, 'index.html'), 'utf8');

  test('o hash do script inline bate com o declarado na CSP', () => {
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
    assert.equal(scripts.length, 1, 'esperava exatamente um script inline sem atributos');
    const hash = createHash('sha256').update(scripts[0]).digest('base64');
    assert.ok(
      html.includes(`'sha256-${hash}'`),
      `a CSP não contém o hash do script inline ('sha256-${hash}') — recalcule após editar o script`
    );
  });

  test('a CSP não permite unsafe-inline em script-src', () => {
    const csp = html.match(/Content-Security-Policy" content="([^"]+)"/)[1];
    const scriptSrc = csp.split(';').find(p => p.trim().startsWith('script-src'));
    assert.ok(!scriptSrc.includes('unsafe-inline'));
  });
});
