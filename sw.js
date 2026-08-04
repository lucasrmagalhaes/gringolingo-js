const VERSAO = 'gringolingo-v3';

const ESSENCIAIS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/app.js',
  './js/audio.js',
  './js/config.js',
  './js/data.js',
  './js/erros.js',
  './js/exercises.js',
  './js/game.js',
  './js/nuvem.js',
  './js/util.js',
  './icones/icone-192.png',
  './icones/icone-512.png'
];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(VERSAO)
      .then(cache => cache.addAll(ESSENCIAIS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== VERSAO).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

function ehDaNuvem(url) {
  return url.hostname.endsWith('.supabase.co') || url.hostname.endsWith('.supabase.in');
}

function ehFonte(url) {
  return url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
}

async function comRede(requisicao) {
  const cache = await caches.open(VERSAO);
  try {
    const resposta = await fetch(requisicao);
    if (resposta && resposta.status === 200) cache.put(requisicao, resposta.clone());
    return resposta;
  } catch (erro) {
    const salva = await cache.match(requisicao);
    if (salva) return salva;
    throw erro;
  }
}

async function doCache(requisicao) {
  const cache = await caches.open(VERSAO);
  const salva = await cache.match(requisicao, { ignoreSearch: true });
  if (salva) {
    fetch(requisicao).then(resposta => {
      if (resposta && resposta.status === 200) cache.put(requisicao, resposta);
    }).catch(() => {});
    return salva;
  }
  return comRede(requisicao);
}

self.addEventListener('fetch', evento => {
  const requisicao = evento.request;
  if (requisicao.method !== 'GET') return;
  const url = new URL(requisicao.url);
  if (ehDaNuvem(url) || url.hostname === 'cdn.jsdelivr.net') return;
  if (requisicao.mode === 'navigate') {
    evento.respondWith(
      comRede(requisicao).catch(() => caches.match('./index.html', { ignoreSearch: true }))
    );
    return;
  }
  if (ehFonte(url) || url.origin === self.location.origin) {
    evento.respondWith(doCache(requisicao));
  }
});

self.addEventListener('message', evento => {
  if (evento.data === 'atualizar') self.skipWaiting();
});
