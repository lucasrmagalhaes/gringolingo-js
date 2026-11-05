# GringoLingo: Design System v4

Chunky and Playful. Jogo de fala, chapado e pesado. Esta versao substitui vidro, lavanda e raio 32.

## Direcao

Peso alto em tudo: borda de 3px, sombra solida embaixo do botao, Nunito 700, 800 e 900, emoji como icone. Nada de vidro, nada de lavanda, nada de hero verde enorme, nada de raio 32 em card.

## Paleta

Claro:

- Fundo `#FFF8EF`
- Superficie `#FFFFFF`
- Texto `#1A1F2E`
- Suave `#5C6578`
- Verde `#58CC02`, sombra do botao `#3D9B00`
- Azul `#1CB0F6`, azul escuro `#1899D6`
- Laranja `#FF9600`
- Amarelo `#FFC800`
- Vermelho `#FF4B4B`
- Roxo `#7B61FF`
- Borda `#E5E5E5`
- Trilho `#E8E0D4`

Escuro:

- Fundo `#0F1A1E`
- Superficie `#1B2A31`
- Texto `#F1F7FB`
- Suave `#9BB0BA`
- Borda e trilho `#2F4149`

Texto sobre o verde `#58CC02` fica escuro (`--sobre-verde`). Branco em cima desse verde nao passa AA.

Categorias:

- Trabalho azul
- Entrevista roxo
- Dia a dia verde
- Pronuncia laranja
- Revisao amarelo

Chip ativo: fundo da categoria a 18% mais borda cheia. Card de treino: borda 3px da categoria, emoji 36px, sem marca d'agua.

## Tipo

Nunito embutida, offline. Pesos usados: 700, 800 e 900. Nada abaixo de 700.

- Hero do hub: `clamp(28px, 5vw, 36px)`, peso 900
- Palavra na licao: `clamp(32px, 6vw, 44px)`, peso 900
- Botao: 16px, peso 900, caixa alta

## Raio e medida

- Botao 14
- Card 18, padding 18
- Hero e no da trilha 22
- Pilula 999
- `#app` no maximo 680px

## Hub, a trilha

Barra de cima: marca, Conversar e avatar.

Hero compacto, cerca de 140px: papagaio num chip laranja, saudacao, CTA `Continuar: X`, XP e nivel. Streak so aparece se for maior que zero. Com zero, o texto neutro e `Comece hoje`, sem fogo.

Bloco Agora: um card grande e o botao `COMEÇAR` verde, largura cheia, sombra `0 5px 0 #3D9B00`. No `:active` o botao afunda 5px e a sombra some.

Trilha por categoria. Nos de 56px com emoji, ligados por um trilho de 6px. Estados: bloqueado, atual e feito. O favorito fica dentro do card. A busca e um icone que abre o campo. Os filtros sao so as cinco categorias e Favoritos.

## Licao, o palco

Topo: fechar, progresso grosso de 12px, dica.

Mascote de 64px muda com o estado. Pilula de estado. Card com borda 3px: amarelo na palavra nova, azul na escuta, verde no acerto. Alto-falante 64px e tartaruga 44px. CTA do rodape com 52px. O feedback e uma folha solida, nao um toast.

## Perfil, a vitrine

Hero de nivel. So tres metricas em destaque: streak (ou o CTA `Comece hoje` se for zero), precisao e memoria longa. Conquistas numa fila horizontal. Jornada com vazio ilustrado quando o XP e zero. O resto das estatisticas fica atras de `Ver mais`.

## Ilustracao

Louro e um SVG flat e grosso. Contorno de 3px na tela (traco 6 no viewBox 140). Fills verde, laranja e azul. Poses: idle (`neutro`), `fala`, `acerto`, `erro` e `vazio`. Nao misturar com icones de linha. Emoji continua sendo o icone dos treinos.

## O que permanece

Estados vazios, skeleton do dicionario, alvos de 44px, contraste AA, saudacao pela hora, foco visivel e `prefers-reduced-motion`.

## Proibido

Lavanda, `backdrop-filter`, `blur`, raio 32 em card, hero verde enorme, peso abaixo de 700, texto claro sobre `#58CC02`.
