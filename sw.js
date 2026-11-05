const VERSAO = 'gringolingo-v155';

const ESSENCIAIS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './css/fontes/nunito-latin.woff2',
  './js/app.js',
  './js/audio.js',
  './js/call.js',
  './js/cenas.js',
  './js/compartilhar.js',
  './js/conversa.js',
  './js/config.js',
  './js/cotidiano.js',
  './js/data.js',
  './js/dicas.js',
  './js/dicionario.js',
  './js/discurso.js',
  './js/ensaio.js',
  './js/erros.js',
  './js/exercises.js',
  './js/frases.js',
  './js/fluencia.js',
  './js/game.js',
  './js/mascote.js',
  './js/metricas.js',
  './js/nuvem.js',
  './js/oficina.js',
  './js/opiniao.js',
  './js/palco.js',
  './js/plantao.js',
  './js/pronuncia.js',
  './js/tecnico.js',
  './js/turno.js',
  './js/vaga.js',
  './js/briefing.js',
  './js/guia.js',
  './js/plateia.js',
  './js/banca.js',
  './js/lar.js',
  './js/hub.js',
  './js/futuro.js',
  './js/trilha.js',
  './js/cultura.js',
  './js/vivo.js',
  './js/espaco.js',
  './js/time.js',
  './js/semana.js',
  './js/narra.js',
  './js/cliente.js',
  './js/completa.js',
  './js/rodada.js',
  './js/foco.js',
  './js/carta.js',
  './js/raio.js',
  './js/caderno.js',
  './js/grafico.js',
  './js/pista.js',
  './js/respeito.js',
  './js/visto.js',
  './js/facil.js',
  './js/brecha.js',
  './js/radar.js',
  './js/remoto.js',
  './js/equipe.js',
  './js/rollout.js',
  './js/entrega.js',
  './js/carga.js',
  './js/manual.js',
  './js/atraso.js',
  './js/lote.js',
  './js/corte.js',
  './js/folha.js',
  './js/pulso.js',
  './js/guarda.js',
  './js/cerca.js',
  './js/maquina.js',
  './js/impasse.js',
  './js/ponteiro.js',
  './js/pausa.js',
  './js/reserva.js',
  './js/inodo.js',
  './js/gotejo.js',
  './js/cota.js',
  './js/cisao.js',
  './js/datagrama.js',
  './js/pilha.js',
  './js/compacta.js',
  './js/corrida.js',
  './js/segredo.js',
  './js/filtro.js',
  './js/orfao.js',
  './js/instavel.js',
  './js/replay.js',
  './js/saga.js',
  './js/espera.js',
  './js/disjuntor.js',
  './js/piscina.js',
  './js/tremor.js',
  './js/anteparo.js',
  './js/amostra.js',
  './js/semaforo.js',
  './js/recuo.js',
  './js/carona.js',
  './js/ancora.js',
  './js/cofre.js',
  './js/quorum.js',
  './js/lider.js',
  './js/orquestra.js',
  './js/primario.js',
  './js/travessia.js',
  './js/rumor.js',
  './js/floco.js',
  './js/sujeira.js',
  './js/fome.js',
  './js/sidecar.js',
  './js/bizantino.js',
  './js/wal.js',
  './js/nonce.js',
  './js/lease.js',
  './js/outbox.js',
  './js/offset.js',
  './js/snapshot.js',
  './js/bloom.js',
  './js/merkle.js',
  './js/gossip.js',
  './js/hint.js',
  './js/bitmap.js',
  './js/crdt.js',
  './js/vector.js',
  './js/shard.js',
  './js/watermark.js',
  './js/witness.js',
  './js/checksum.js',
  './js/tombstone.js',
  './js/journal.js',
  './js/stripe.js',
  './js/epoch.js',
  './js/flush.js',
  './js/manifest.js',
  './js/sstable.js',
  './js/iterator.js',
  './js/histogram.js',
  './js/skew.js',
  './js/slo.js',
  './js/trace.js',
  './js/webhook.js',
  './js/otel.js',
  './js/util.js',
  './js/vocabulario.js',
  './js/voz.js'
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
