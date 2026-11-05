import test, { describe, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './ambiente.js';
import { limparArmazenamento } from './ambiente.js';

const {
  estado, limparEstadoMemoria, definirAgora, salvar, ativarSync,
  tentarReenviar, definirTransporteSync, filaPendente, statusDaSync,
  enfileirarMudanca, motivoPendencia
} = await import('../js/game.js');

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const relogio = () => new Date(2026, 10, 5, 15, 0, 0);

beforeEach(() => {
  definirAgora(relogio);
  ativarSync(false);
  definirTransporteSync();
  navigator.onLine = true;
  limparEstadoMemoria();
  limparArmazenamento();
});

after(() => {
  ativarSync(false);
  definirTransporteSync();
  navigator.onLine = true;
  definirAgora(null);
});

function transporteFalso(remotoInicial) {
  const enviados = [];
  let remoto = remotoInicial ?? null;
  let falhar = false;
  definirTransporteSync({
    async enviar(dados) {
      if (falhar) throw new Error('failed to fetch');
      enviados.push(JSON.parse(JSON.stringify(dados)));
      remoto = enviados[enviados.length - 1];
    },
    async baixar() {
      if (falhar) throw new Error('failed to fetch');
      return remoto ? JSON.parse(JSON.stringify(remoto)) : null;
    }
  });
  return {
    enviados,
    ligarFalha(valor) { falhar = valor; }
  };
}

describe('fila offline', () => {
  test('o progresso offline fica na fila e sobe quando a rede volta', async () => {
    const rede = transporteFalso(null);
    estado.xp = 80;
    estado.streak = 5;
    estado.ultimoDia = '2026-11-05';
    navigator.onLine = false;
    ativarSync(true);
    salvar();
    await tentarReenviar();
    assert.equal(rede.enviados.length, 0);
    assert.equal(filaPendente().length, 1);
    assert.equal(filaPendente()[0].xp, 80);
    assert.equal(filaPendente()[0].streak, 5);
    assert.equal(statusDaSync({ online: false }), 'offline');
    assert.equal(localStorage.getItem('gringolingo:fila') !== null, true);
    assert.equal(JSON.parse(localStorage.getItem('gringolingo')).xp, 80);
    ativarSync(false);
    navigator.onLine = true;
    await ativarSync(true);
    assert.equal(rede.enviados.length >= 1, true);
    assert.ok(rede.enviados[rede.enviados.length - 1].xp >= 80);
    assert.equal(filaPendente().length, 0);
    assert.equal(motivoPendencia(), null);
    assert.equal(statusDaSync({ online: true }), 'sincronizado');
  });

  test('o aparelho mais recente não apaga XP nem streak', async () => {
    const rede = transporteFalso(null);
    ativarSync(true);
    estado.xp = 200;
    estado.streak = 6;
    estado.ultimoDia = '2026-11-05';
    salvar();
    const em = estado.atualizadoEm;
    rede.ligarFalha(false);
    definirTransporteSync({
      async enviar(dados) {
        rede.enviados.push(JSON.parse(JSON.stringify(dados)));
      },
      async baixar() {
        return {
          xp: 30,
          streak: 1,
          ultimoDia: '2026-11-05',
          atualizadoEm: em + 10000,
          versaoDados: 3,
          treinoAberto: 'slo'
        };
      }
    });
    await tentarReenviar();
    assert.equal(estado.xp, 200);
    assert.ok(estado.streak >= 6);
    assert.equal(estado.treinoAberto, 'slo');
    assert.equal(rede.enviados.at(-1).xp, 200);
    assert.ok(rede.enviados.at(-1).streak >= 6);
  });

  test('um aparelho mais antigo com mais XP entra sem derrubar o streak', async () => {
    const enviados = [];
    ativarSync(true);
    estado.xp = 40;
    estado.streak = 4;
    estado.ultimoDia = '2026-11-05';
    salvar();
    const em = estado.atualizadoEm;
    definirTransporteSync({
      async enviar(dados) { enviados.push(JSON.parse(JSON.stringify(dados))); },
      async baixar() {
        return {
          xp: 500,
          streak: 2,
          ultimoDia: '2026-11-05',
          atualizadoEm: Math.max(0, em - 1000),
          versaoDados: 3
        };
      }
    });
    await tentarReenviar();
    assert.equal(estado.xp, 500);
    assert.ok(estado.streak >= 4);
    assert.equal(enviados.at(-1).xp, 500);
    assert.equal(statusDaSync({ online: true }), 'sincronizado');
  });

  test('abrir, foco e online chamam o reenvio', () => {
    const app = readFileSync(join(raiz, 'js/app.js'), 'utf8');
    const css = readFileSync(join(raiz, 'css/style.css'), 'utf8');
    const abrir = app.slice(app.indexOf('async function aposLogin'), app.indexOf('function finalizarAuth'));
    assert.match(abrir, /tentarReenviar\(\)/);
    assert.match(abrir, /enfileirarMudanca\(\)/);
    const rede = app.slice(app.indexOf("window.addEventListener('online'"), app.indexOf('window.addEventListener(\'beforeinstallprompt\''));
    assert.match(rede, /tentarReenviar\(\)/);
    assert.match(rede, /enfileirarMudanca\(\)/);
    const foco = app.slice(app.indexOf("document.addEventListener('visibilitychange'"), app.indexOf('observarPendencia(pendente'));
    assert.match(foco, /visibilitychange/);
    assert.match(foco, /addEventListener\('focus'/);
    assert.equal(foco.split('tentarReenviar()').length - 1 >= 2, true);
    const chip = app.slice(app.indexOf('function chipSync'), app.indexOf('function topoVoltar'));
    assert.match(chip, /status-sync/);
    assert.match(chip, /Sincronizado/);
    assert.match(chip, /Pendente/);
    assert.match(chip, /Offline/);
    assert.equal(chip.includes('\u2014'), false);
    assert.equal(chip.includes('\u2013'), false);
    assert.match(css, /\.status-sync \{/);
    assert.match(css, /\.status-sync\.pendente/);
    assert.match(css, /\.status-sync\.offline/);
    assert.equal(enfileirarMudanca().length, 1);
    assert.equal(statusDaSync({ online: false }), 'offline');
    assert.equal(statusDaSync({ online: true }), 'pendente');
  });
});
