#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { readdir, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const PACOTE = '@supabase/supabase-js';
const VERSAO = '2.112.0';
const URL_RAIZ = `https://cdn.jsdelivr.net/npm/${PACOTE}@${VERSAO}/+esm`;
const CDN = 'https://cdn.jsdelivr.net/';
const ARQUIVO_RAIZ = 'supabase.js';
const DESTINO = dirname(fileURLToPath(import.meta.url));

const RE_FROM = /\bfrom\s*(["'])([^"'\n]+)\1/g;
const RE_IMPORT_SIMPLES = /\bimport\s*(["'])([^"'\n]+)\1/g;
const RE_IMPORT_DINAMICO = /\bimport\s*\(\s*(["'])([^"'\n]+)\1\s*\)/g;

const nomesUsados = new Set([ARQUIVO_RAIZ]);
const nomeLocal = new Map();
const brutos = new Map();
const bareEncontrados = new Set();
const ignorados = new Set();

function ehCaminho(especificador) {
  return (
    especificador.startsWith('./') ||
    especificador.startsWith('../') ||
    especificador.startsWith('/') ||
    especificador.startsWith('//') ||
    /^[a-z][a-z0-9+.-]*:\/\//i.test(especificador)
  );
}

function nomeArquivo(url) {
  let nome = new URL(url).pathname
    .replace(/^\/npm\//, '')
    .replace(/\/\+esm$/, '')
    .replace(/\.m?js$/, '')
    .replace(/^@/, '')
    .replace(/[@/]/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-');
  nome = `${nome}.js`;
  if (!nomesUsados.has(nome)) {
    nomesUsados.add(nome);
    return nome;
  }
  let n = 2;
  while (nomesUsados.has(`${nome.slice(0, -3)}-${n}.js`)) n++;
  const unico = `${nome.slice(0, -3)}-${n}.js`;
  nomesUsados.add(unico);
  return unico;
}

async function baixar(url) {
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    return await resposta.text();
  } catch (erro) {
    const { stdout } = await execFileAsync('curl', ['-sL', '--fail', url], {
      maxBuffer: 512 * 1024 * 1024,
    });
    if (!stdout) throw erro;
    return stdout;
  }
}

function coletarEspecificadores(conteudo) {
  const encontrados = new Set();
  for (const regex of [RE_FROM, RE_IMPORT_SIMPLES, RE_IMPORT_DINAMICO]) {
    for (const [, , especificador] of conteudo.matchAll(regex)) {
      encontrados.add(especificador);
    }
  }
  return encontrados;
}

function reescrever(conteudo, validos) {
  const trocar = (completo, aspas, especificador) => {
    const local = validos.get(especificador);
    if (!local) return completo;
    return completo.replace(`${aspas}${especificador}${aspas}`, `${aspas}./${local}${aspas}`);
  };

  return conteudo
    .replace(RE_FROM, trocar)
    .replace(RE_IMPORT_SIMPLES, trocar)
    .replace(RE_IMPORT_DINAMICO, trocar);
}

async function main() {
  for (const arquivo of await readdir(DESTINO)) {
    if (arquivo.endsWith('.js')) await rm(`${DESTINO}/${arquivo}`);
  }

  nomeLocal.set(URL_RAIZ, ARQUIVO_RAIZ);
  brutos.set(URL_RAIZ, await baixar(URL_RAIZ));

  const fila = [URL_RAIZ];
  let processados = 0;

  while (fila.length > 0) {
    const url = fila.shift();
    const bruto = brutos.get(url);
    const validos = new Map();

    for (const especificador of coletarEspecificadores(bruto)) {
      if (!ehCaminho(especificador)) {
        bareEncontrados.add(especificador);
        continue;
      }

      let absoluto;
      try {
        absoluto = new URL(especificador, url).href;
      } catch {
        continue;
      }
      if (!absoluto.startsWith(CDN)) {
        ignorados.add(especificador);
        continue;
      }
      if (nomeLocal.has(absoluto)) {
        validos.set(especificador, nomeLocal.get(absoluto));
        continue;
      }

      let conteudo;
      try {
        conteudo = await baixar(absoluto);
      } catch {
        ignorados.add(especificador);
        continue;
      }

      nomeLocal.set(absoluto, nomeArquivo(absoluto));
      brutos.set(absoluto, conteudo);
      fila.push(absoluto);
      validos.set(especificador, nomeLocal.get(absoluto));
    }

    await writeFile(`${DESTINO}/${nomeLocal.get(url)}`, reescrever(bruto, validos), 'utf8');
    processados++;
    console.log(`[${processados}] ${nomeLocal.get(url)}  <-  ${url}`);
  }

  if (bareEncontrados.size > 0) {
    console.log(`\nEspecificadores bare (nao localizados): ${[...bareEncontrados].join(', ')}`);
  }
  if (ignorados.size > 0) {
    console.log(`Especificadores ignorados: ${[...ignorados].join(', ')}`);
  }
  console.log(`\n${processados} arquivo(s) gravado(s) em ${DESTINO}`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
