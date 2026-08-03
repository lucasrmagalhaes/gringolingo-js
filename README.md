# GringoLingo 🦜

App divertido para aprender inglês, estilo joguinho. 100% estático — HTML, CSS e JS puro, sem build, sem dependências. Progresso salvo no navegador (localStorage).

## Como rodar

```bash
node servidor.js
```

Abra http://localhost:8123. Qualquer servidor estático também funciona (ex.: `python3 -m http.server 8123`).

> Precisa de um servidor por causa dos ES modules — abrir o `index.html` direto do disco não funciona.

## O que tem

- **4 unidades × 4 lições**: Primeiros Passos, Comida Boa, Modo Viagem e Modo Trabalho, com desbloqueio progressivo e até 3 estrelas por lição.
- **6 tipos de exercício**: múltipla escolha EN→PT e PT→EN, digitar a tradução (aceita 1 errinho de digitação), montar frase com peças, listening com pronúncia falada e ligar os pares.
- **Gamificação**: XP com bônus de combo, níveis com títulos ("Turista Perdido" → "Netflix Sem Legenda" → "Lenda do Inglês"), streak diário, 10 conquistas, confete e efeitos sonoros.
- **Revisão Turbo**: palavras erradas entram numa fila de revanche; acertou na revisão, sai da fila.
- **Louro 🦜**: o mascote comenta cada resposta.

## Estrutura

```
index.html        casca da SPA
css/style.css     tema completo
js/app.js         telas e fluxo (home, lição, resultado, perfil)
js/exercises.js   geração e correção dos 6 tipos de exercício
js/game.js        estado, XP, streak, badges, localStorage
js/data.js        conteúdo das lições, níveis, badges e frases do mascote
js/audio.js       efeitos sonoros (WebAudio) e pronúncia (speechSynthesis)
js/util.js        helpers de DOM e aleatoriedade
servidor.js       servidor estático mínimo (Node)
```
