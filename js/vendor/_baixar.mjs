#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const PACOTE = '@supabase/supabase-js';
const VERSAO = '2.112.0';
const URL_RAIZ = `https://cdn.jsdelivr.net/npm/${PACOTE}@${VERSAO}/+esm`;
const CDN = 'https://cdn.jsdelivr.net/';
const ARQUIVO_RAIZ = 'supabase.js';
const ARQUIVO_INTEGRIDADE = 'integridade.json';
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
  let trocas = 0;
  const trocar = (completo, aspas, especificador) => {
    const local = validos.get(especificador);
    if (!local) return completo;
    trocas++;
    return completo.replace(`${aspas}${especificador}${aspas}`, `${aspas}./${local}${aspas}`);
  };

  const reescrito = conteudo
    .replace(RE_FROM, trocar)
    .replace(RE_IMPORT_SIMPLES, trocar)
    .replace(RE_IMPORT_DINAMICO, trocar);
  return { reescrito, trocas };
}

function sha256(conteudo) {
  return createHash('sha256').update(conteudo).digest('hex');
}

async function conferirIntegridade() {
  let registro;
  try {
    registro = JSON.parse(await readFile(`${DESTINO}/${ARQUIVO_INTEGRIDADE}`, 'utf8'));
  } catch {
    return;
  }
  if (registro?.versao !== VERSAO) return;

  const divergentes = [];
  for (const [arquivo, esperado] of Object.entries(registro.arquivos ?? {})) {
    let atual;
    try {
      atual = sha256(await readFile(`${DESTINO}/${arquivo}`));
    } catch {
      divergentes.push(`${arquivo} (ausente)`);
      continue;
    }
    if (atual !== esperado) divergentes.push(arquivo);
  }
  if (divergentes.length > 0) {
    throw new Error(
      `Integridade violada: ${divergentes.join(', ')} nao confere(m) com ${ARQUIVO_INTEGRIDADE} ` +
      `da versao ${VERSAO}. Possivel adulteracao local; investigue antes de rebaixar os bundles.`
    );
  }
}

async function gravarIntegridade() {
  const arquivos = {};
  for (const arquivo of (await readdir(DESTINO)).sort()) {
    if (arquivo.endsWith('.js')) {
      arquivos[arquivo] = sha256(await readFile(`${DESTINO}/${arquivo}`));
    }
  }
  await writeFile(
    `${DESTINO}/${ARQUIVO_INTEGRIDADE}`,
    `${JSON.stringify({ versao: VERSAO, arquivos }, null, 2)}\n`,
    'utf8'
  );
  return Object.keys(arquivos).length;
}

async function main() {
  await conferirIntegridade();

  nomeLocal.set(URL_RAIZ, ARQUIVO_RAIZ);
  brutos.set(URL_RAIZ, await baixar(URL_RAIZ));

  const fila = [URL_RAIZ];
  const prontos = new Map();
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

    const { reescrito, trocas } = reescrever(bruto, validos);
    prontos.set(nomeLocal.get(url), { reescrito, trocas, url });
  }

  // A pasta só é tocada depois de TODOS os downloads darem certo — uma falha
  // no meio não pode deixar o vendor pela metade com integridade velha.
  for (const arquivo of await readdir(DESTINO)) {
    if (arquivo.endsWith('.js')) await rm(`${DESTINO}/${arquivo}`);
  }
  for (const [nome, { reescrito, trocas, url }] of prontos) {
    await writeFile(`${DESTINO}/${nome}`, reescrito, 'utf8');
    processados++;
    console.log(`[${processados}] ${nome}  <-  ${url}  (${trocas} import(s) reescrito(s))`);
  }

  if (bareEncontrados.size > 0) {
    console.log(`\nEspecificadores bare (nao localizados): ${[...bareEncontrados].join(', ')}`);
  }
  if (ignorados.size > 0) {
    console.log(`Especificadores ignorados: ${[...ignorados].join(', ')}`);
  }
  const registrados = await gravarIntegridade();
  console.log(`\n${processados} arquivo(s) gravado(s) em ${DESTINO}`);
  console.log(`${registrados} hash(es) registrado(s) em ${ARQUIVO_INTEGRIDADE}`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
