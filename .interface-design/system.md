# GringoLingo: Design System v5

Trilha Viva. O hub e um caminho de fala, chapado e pesado. Esta versao substitui a fileira de chips e o card Agora. Os tokens da v4 continuam.

## Direcao

Peso alto em tudo: borda de 3px, sombra solida embaixo do botao, Nunito 700, 800 e 900, emoji como icone. Nada de vidro, nada de lavanda, nada de raio 32 em card.

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

Texto sobre o verde `#58CC02` fica escuro (`#1A1F2E` ou `--sobre-verde`). Branco em cima desse verde nao passa AA.

Banners por categoria, fundo solido:

- Trabalho `#1CB0F6`, sombra `#1899D6`
- Entrevista `#7B61FF`
- Dia a dia `#58CC02`, sombra `#3D9B00`
- Pronuncia `#FF9600`
- Revisao `#FFC800`

O texto do banner e `#1A1F2E` nas cinco cores.

## Tipo

Nunito embutida, offline. Pesos usados: 700, 800 e 900. Nada abaixo de 700.

- Titulo da unidade: `clamp(22px, 4vw, 28px)`, peso 900
- Palavra na licao: `clamp(40px, 8vw, 52px)`, peso 900
- Metrica do perfil: 40px, peso 900
- Botao: 16px, peso 900, caixa alta

## Raio e medida

- Botao 14
- Card 18, padding 18
- Banner e no da trilha 22
- Pilula 999
- `#app` no maximo 680px

## Hub, a trilha viva

Barra de cima, compacta, sem card branco: logo, pilula de XP, streak so se for maior que zero, avatar. Com streak zero a pilula de fogo some.

Banner da unidade, full-bleed na coluna, cerca de 112px no celular. Fundo solido da categoria. Kicker `UNIDADE N` e titulo 22 a 28px, peso 900. Botao Guia e botao Trocar unidade. Sombra `0 6px 0` num tom mais escuro da mesma cor. A busca e um icone no canto do banner, nao uma fileira de chips.

O caminho e um zigue-zague com offset de 48px: esquerda, centro, direita. De cima para baixo: feitos, o no atual, depois bloqueados, bau e trofeu. O trilho tem 8px. O trecho verde `#58CC02` vai ate o no atual. O resto usa `var(--trilho)`. O no atual usa fill de superficie, anel azul de 6px e sombra `0 8px 0 #1899D6`. O verde do convite fica so no balao, com o botao branco `COMEÇAR +XP`.

Nos:

- Bloqueado: 64px, cinza
- Feito: 64px, verde, check, texto `#1A1F2E`
- Atual: 88px, anel azul de 6px, sombra `0 8px 0 #1899D6`
- Bau: 72px, amarelo, a cada 3 ou 4 nos
- Trofeu: 80px, amarelo, no fim da unidade

O no atual tem um balao verde com o titulo do treino e o botao branco `COMEÇAR +XP`, altura minima 48px. O papagaio de 72px fica ao lado desse no.

Trocar unidade abre uma folha com tiles coloridos em duas colunas, uma unidade por tile. A estrela de favorito so aparece em no liberado (atual ou feito). No bloqueado ela some, mesmo se o treino ja estiver salvo. O filtro Favoritos continua achando o treino. Os 368 treinos continuam no catalogo. O banner mostra quantos nos da unidade ja foram feitos. O trilho da barra e rgba(255,255,255,0.28), e #E8E0D4 no tema claro. O fill e #58CC02 com sheen de 28%. O texto fica em #1A1F2E com peso 800. Bau e trofeu nao sao treinos.

O hero branco e o card Agora ficam fora da tela. As funcoes antigas permanecem no codigo para nao perder a saudacao e o `COMEÇAR`.

## Licao, o palco

Topo: fechar, barra de 14px (trilho `var(--trilho)`, preenchimento verde) e dica.

Palavra em `clamp(40px, 8vw, 52px)`. Opcoes com 56px de altura e sombra solida. Botao com raio 14. Mascote de 64px muda com o estado. Card com borda 3px: amarelo na palavra nova, azul na escuta, verde no acerto.

## Perfil, a vitrine

Hero com faixa verde e o avatar sobreposto na faixa. So tres metricas em destaque, numero 40px peso 900 e rotulo 12px em caixa alta. Streak (ou o CTA `Comece hoje` se for zero), precisao e memoria longa. A jornada com XP vira um calendario grosso: quadrados vazios no trilho, amarelo quando houve XP, verde quando bateu a meta. Sem XP, entra o Louro, um calendario, o texto `Complete 1 lição pra começar a jornada` e um CTA. O resto das estatisticas fica atras de `Ver mais`.

Sombras sao so solidas, no formato `0 Npx 0`. Sem raio de desfoque.

## Ilustracao

Louro e um SVG flat e grosso. Contorno de 3px na tela (traco 6 no viewBox 140). Fills verde, laranja e azul. Poses: idle (`neutro`), `fala`, `acerto`, `erro` e `vazio`. No hub, a pose `fala` fica ao lado do no atual, em 72px. Emoji continua sendo o icone dos treinos.

## O que permanece

Estados vazios, skeleton do dicionario, alvos de 44px, contraste AA, saudacao pela hora, foco visivel e `prefers-reduced-motion`.

## Proibido

Lavanda, `backdrop-filter`, `blur`, raio 32 em card, hero branco no hub, fileira de chips na home, card Agora na home, peso abaixo de 700, texto claro sobre `#58CC02`, sombra com desfoque, lista de cards no lugar da trilha.
