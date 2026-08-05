const VERSAO = 'gringolingo-v21';

const ESSENCIAIS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './css/fontes/nunito-latin.woff2',
  './js/app.js',
  './js/audio.js',
  './js/compartilhar.js',
  './js/config.js',
  './js/data.js',
  './js/dicionario.js',
  './js/erros.js',
  './js/exercises.js',
  './js/game.js',
  './js/mascote.js',
  './js/metricas.js',
  './js/nuvem.js',
  './js/util.js'
];

const OPCIONAIS = [
  './js/dicionario-dados.js',
  './js/vendor/iceberg-js-0.8.1.js',
  './js/vendor/supabase-auth-js-2.112.0.js',
  './js/vendor/supabase-functions-js-2.112.0.js',
  './js/vendor/supabase-phoenix-0.4.5.js',
  './js/vendor/supabase-postgrest-js-2.112.0.js',
  './js/vendor/supabase-realtime-js-2.112.0.js',
  './js/vendor/supabase-storage-js-2.112.0.js',
  './js/vendor/supabase.js',
  './js/vendor/tslib-2.8.1.js',
  './icones/icone-192.png',
  './icones/icone-512.png',
  './icones/icone-maskable-512.png',
  './icones/apple-touch-icon.png'
];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(VERSAO).then(async cache => {
      await cache.addAll(ESSENCIAIS);
      await Promise.allSettled(OPCIONAIS.map(u => cache.add(u)));
    })
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

function semConexao() {
  return new Response('<h1>Sem conexão</h1>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

async function navegar(evento) {
  const cache = await caches.open(VERSAO);
  let temporizador;
  try {
    const resposta = await Promise.race([
      fetch(evento.request),
      new Promise((_, rejeitar) => {
        temporizador = setTimeout(() => rejeitar(new Error('rede demorou demais')), 3000);
      })
    ]);
    if (resposta && resposta.status === 200) evento.waitUntil(cache.put(evento.request, resposta.clone()));
    return resposta;
  } catch {
    const salva = await cache.match('./index.html', { ignoreSearch: true });
    return salva || semConexao();
  } finally {
    clearTimeout(temporizador);
  }
}

async function comRede(evento) {
  const cache = await caches.open(VERSAO);
  try {
    const resposta = await fetch(evento.request);
    if (resposta && resposta.status === 200) evento.waitUntil(cache.put(evento.request, resposta.clone()));
    return resposta;
  } catch (erro) {
    const salva = await cache.match(evento.request);
    if (salva) return salva;
    throw erro;
  }
}

async function doCache(evento) {
  const cache = await caches.open(VERSAO);
  const salva = await cache.match(evento.request, { ignoreSearch: true });
  if (salva) {
    evento.waitUntil(
      fetch(evento.request).then(resposta => {
        if (resposta && resposta.status === 200) return cache.put(evento.request, resposta);
      }).catch(() => {})
    );
    return salva;
  }
  return comRede(evento);
}

self.addEventListener('fetch', evento => {
  const requisicao = evento.request;
  if (requisicao.method !== 'GET') return;
  const url = new URL(requisicao.url);
  if (ehDaNuvem(url)) return;
  if (requisicao.mode === 'navigate') {
    evento.respondWith(navegar(evento));
    return;
  }
  if (url.origin === self.location.origin) {
    evento.respondWith(doCache(evento));
  }
});

self.addEventListener('message', evento => {
  if (evento.data === 'atualizar') self.skipWaiting();
});
