# GringoLingo — Design System

Extraído do código real (css/style.css) em 2026-08-04. Este arquivo descreve o sistema que o app
JÁ pratica; mudanças de UI devem obedecê-lo ou atualizá-lo conscientemente.

## Direction

**Chunky & Playful** — jogo, não ferramenta. Peso alto em tudo: bordas de 2px, sombras sólidas
(nunca difusas), tipografia 800–900, cantos generosos, emojis como iconografia. A referência é
Duolingo. Nada de minimalismo corporativo, nada de glassmorphism, nada de sombra `blur`.

## Foundation

- Fonte: `Nunito` (700 base / 800 destaque / 900 título e botão). Não existe peso < 700.
- Fundo claro `#FCF9F4` (creme), escuro `#131F24`. Superfície `#fff` / `#202F36`.
- Textura: pontinhos `radial-gradient` 24px no body — não cobrir com fundos chapados grandes.
- Container: `#app` max-width 680px, coluna única. Não criar layouts multi-coluna de página.
- Temas via `data-tema` no `<html>` E no `<body>`; todo token tem par em `[data-tema="escuro"]`.

## Depth: chunky solid (NUNCA blur)

- Elevação interativa = sombra sólida embaixo: `box-shadow: 0 4px 0 <cor-escura>` (botões),
  `0 3px 0` (btn-som), `border-bottom-width: 4px` (opções de exercício).
- `:active` = `transform: translateY(4px)` + `box-shadow: none` (o botão "afunda").
- Cards NÃO têm sombra: `border: 2px solid var(--borda-suave)`. No escuro, brilho interno sutil
  `inset 0 1.5px 0 rgba(255,255,255,0.045)`.
- Proibido: `box-shadow` com blur > 0 em componente novo (exceção: overlays/modais existentes).

## Tokens

### Cor (sempre via var, nunca hex cru em componente novo)

| Papel | Token | Regra de uso |
|---|---|---|
| CTA / correto | `--verde` #58CC02 (esc #46A302) | botão primário, acerto, progresso |
| Seleção / info | `--azul` #1CB0F6 (esc #1899D6) | opção selecionada, links, som |
| Erro / destrutivo | `--vermelho` #FF4B4B | resposta errada, apagar |
| Streak / atenção | `--laranja` #FF9600 | fogo, avisos de meta |
| Estrela / moeda | `--amarelo` #FFC800 | estrelas, XP |
| Texto | `--texto`, `--texto-suave` | suave só para apoio, nunca corpo |
| Texto sobre claro | `--laranja-texto`, `--verde-texto` | versões AA sobre fundo claro |
| Estado vivo | `--verde-vivo`, `--azul-vivo`, `--vermelho-vivo` | texto de estado (certo/sel/errado) que precisa brilhar nos DOIS temas — no claro resolvem para `*-esc`, no escuro para as versões claras; NUNCA hardcodar `#8ee05a`/`#62c5f8`/`#ff9ba0` |
| Sobre cor cheia | `--sobre-verde`, `--sobre-amarelo`, `--sobre-cor` | texto em cima de chip de cor sólida |
| Verbos | `--roxo` #6C5CE7 | exclusivo da Oficina de Verbos |
| Estrutura | `--borda`, `--borda-suave`, `--trilho` | borda-suave em card informativo, cheia em interativo |

A semântica é fixa: **verde nunca é decoração, azul nunca é erro, vermelho nunca é destaque
neutro.** O prompt de exercício não leva azul (azul = "selecionado").

### Tipo

`--fonte-xs` 11 · `sm` 13 · `md` 15 · `lg` 17 · `xl` 20 · `2xl` clamp(19px, 5.5vw, 24px).
Herói de exercício: `clamp(24px, 3.4vw, 32px)` weight 900 sem moldura.
Rótulo de seção (`.rotulo`, `.enunciado`): 12–13px, weight 800–900, uppercase,
letter-spacing ≥ 0.1em, cor `--texto-suave`.

### Espaço

Passo de 2px, órbita em 8–18: gaps `8 / 10 / 12 / 14`; padding de card `18`; padding de
controle `13px 26px` (btn) / `14px 16px` (opção) / `6px 14px` (pílula).
Não introduzir valores fora dessa família (ex.: 15px, 22px de gap).

### Raio

- `999px` — pílulas e barras de progresso
- `14px` — botões, opções, inputs
- `18px` — cards
- `22–26px` — cartões-herói (nível, btn-som grande)
- `6–12px` — micro-elementos apenas (chips do diff, thumbs, badges pequenos); legado tolerado,
  componente novo de porte normal usa 14/18
Novo componente escolhe um destes; não inventar raio.

## Patterns

- **Botão** `.btn` + cor: radius 14, padding 13×26, 16px/900, letter-spacing 0.5px, sombra
  0 4px 0, hover `brightness(1.06)`, active afunda. Texto em CAIXA ALTA.
- **Card** `.card`: superfície, borda 2px suave, radius 18, padding 18, margin-bottom 16.
  Interativo (lição, opção) usa `--borda` cheia + hover com borda colorida + translateY(-1px).
- **Pílula** `.pilula`: radius 999, borda 2px, padding 6×14, weight 900,
  números com `tabular-nums`. Unidade dentro da pílula: `.pilula-unidade` 0.7em suave.
- **Barra de progresso** `.progresso`: trilho 999px, preenchimento verde com sheen
  `linear-gradient` branco 28% em cima.
- **Tela de exercício**: `#app:has(.area-exercicio)` flex column 100dvh; conteúdo centrado
  verticalmente; rodapé fixo com o CTA à direita; enunciado = rótulo, palavra = herói.
- **Vazio/erro de dado**: skeleton + empty state com emoji grande (padrão do dicionário).
- **Feedback**: sheet fixa no rodapé (verde/vermelho claro), nunca alert/toast nativo.
- **Emoji é a iconografia** (🦜🔥⭐👑📖) — não introduzir biblioteca de ícones.
  EXCEÇÃO: emoji de bandeira (🇺🇸) não renderiza no Windows (vira "US") — proibido em UI.

## Motion

Curta e física: `transition` 0.1–0.25s; `pop` scale 1.4 em combo; entrada escalonada de pílulas
(`surgir`); confete canvas em acerto. `prefers-reduced-motion` desliga tudo (regra global existente).
View Transitions via `transicao()` (js/app.js) — sempre com catch.

## Acessibilidade (piso já praticado)

Contraste AA nos dois temas (auditado); `:focus-visible` com anel `box-shadow` 4px colorido;
`aria-live` no feedback; `aria-pressed` em opções; alvos ≥ 44px no mobile; atalhos 1-4/Enter.

## Anti-patterns (não fazer)

- Sombra difusa, gradiente de marca, glassmorphism, borda 1px "fina e elegante"
- Texto < 11px; peso < 700; cinza de texto fora de `--texto-suave`
- Hex cru em componente novo (o CSS legado tem ~12 — não aumentar a lista)
- Bandeira-emoji em texto de UI; `alert()`/`confirm()` nativos
- Esconder texto de `.logo` genérico (é o título de 5 telas — só `.logo-marca` colapsa)
