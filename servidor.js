import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const PORTA = process.env.PORT || 8123;
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.png': 'image/png',
  '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const rel = url === '/' ? 'index.html' : url.slice(1);
  const arquivo = path.resolve(RAIZ, rel);
  if (arquivo !== RAIZ && !arquivo.startsWith(RAIZ + path.sep)) {
    res.writeHead(403);
    return res.end();
  }
  fs.readFile(arquivo, (err, dados) => {
    if (err) {
      res.writeHead(404);
      return res.end('404');
    }
    res.writeHead(200, {
      'Content-Type': TIPOS[path.extname(arquivo).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(dados);
  });
}).listen(PORTA, '127.0.0.1', () => console.log(`GringoLingo 🦜 rodando em http://localhost:${PORTA}`));
