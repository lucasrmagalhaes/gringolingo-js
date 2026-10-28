<div align="center">

# GringoLingo 🦜

**Aprender inglês como quem joga: lições de cinco minutos, XP, streak e uma memória que sabe a hora de te cobrar.**

Um curso de inglês completo, com 9 unidades, 10 tipos de exercício, repetição espaçada, dicionário de
3 mil palavras e sincronização entre aparelhos, escrito em **HTML, CSS e JavaScript puro**.
Sem framework, sem bundler, sem `npm install`. O que está no repositório é exatamente o que roda no
navegador.

### ➡️ [**Abrir o app**](https://lucasrmagalhaes.github.io/gringolingo-js/) ⬅️

[![PWA](https://img.shields.io/badge/PWA-instal%C3%A1vel%20e%20offline-58CC02?style=flat-square)](https://lucasrmagalhaes.github.io/gringolingo-js/)
[![Sem build](https://img.shields.io/badge/build-nenhum-1CB0F6?style=flat-square)](#decisões-técnicas)
[![Sem npm install](https://img.shields.io/badge/npm%20install-desnecess%C3%A1rio-FF9600?style=flat-square)](#decisões-técnicas)
[![Testes](https://img.shields.io/badge/testes-276%20passando-FFC800?style=flat-square)](#testes)
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-6C5CE7?style=flat-square)](https://lucasrmagalhaes.github.io/gringolingo-js/)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES%20modules%20nativos-FF4B4B?style=flat-square)](#arquitetura)

<img src="docs/img/home.png" alt="Tela inicial do GringoLingo: nível, meta do dia, missões e Revisão Turbo" width="760">

</div>

---

## Por dentro

| A trilha | Um exercício |
| --- | --- |
| <img src="docs/img/trilha.png" alt="Trilha de unidades com lições e o nó do Chefão"> | <img src="docs/img/exercicio.png" alt="Exercício de montar frase com peças e o feedback de acerto"> |
| Unidades coloridas, desbloqueio progressivo, até 3 estrelas por lição e o **Chefão** no fim de cada unidade. | Montar frase, digitar, ouvir, falar, ligar pares… com uma correção que explica o erro. |

| O dicionário | Sua jornada |
| --- | --- |
| <img src="docs/img/dicionario.png" alt="Dicionário com a busca por trabalho e o status de memória de cada palavra"> | <img src="docs/img/perfil.png" alt="Perfil com estatísticas, gráfico de 30 dias e saúde da memória"> |
| Uma busca só, aceita português ou inglês, com ou sem acento — e mostra em que pé está a sua memória de cada palavra. | Gráfico de XP dos últimos 30 dias e a distribuição das palavras pelas caixas de revisão. |

<div align="center">

| Tema escuro | Tema claro |
| --- | --- |
| <img src="docs/img/tema-escuro.png" alt="GringoLingo no tema escuro" width="400"> | <img src="docs/img/tema-claro.png" alt="GringoLingo no tema claro" width="400"> |

</div>

---

## O que tem

### Aprendizado

- **9 unidades × 4 lições = 36 lições**, com 247 palavras e frases: Primeiros Passos, Comida Boa,
  Modo Viagem, Modo Trabalho, Família & Amigos, Casa Doce Casa, Corpo São, Rotina de Campeão e Tempo Livre
  (clima, humor, planos e convite). Desbloqueio progressivo e até 3 estrelas por lição.
- **10 tipos de exercício**: múltipla escolha EN→PT e PT→EN, digitar a tradução, montar frase com
  peças, o que você ouviu, o que isso significa, ditado de frase, completar a lacuna, falar em inglês
  (reconhecimento de voz, com botão de pular) e ligar os pares. Todo áudio tem o botão 🐢 para ouvir
  devagar. Se o microfone não existir ou falhar, o exercício de falar abre um campo para escrever a
  frase e corrige com o mesmo tutor.
- **Modo Escuta**: depois de 4 palavras aprendidas, a home abre uma sessão curta. Você ouve a frase
  e escreve. Se o navegador tiver reconhecimento de voz, a cada três rodadas dá para repetir falando.
  Sem microfone, todas as rodadas são escritas e o app avisa. Sem voz em inglês, o card explica e não
  começa. A sessão conta streak, XP e a agenda de Leitner, e não conta como Revisão Turbo. O recorde
  de acertos mescla pelo maior número entre aparelhos.
- **Treinar uma caixa**: no perfil, em Saúde da memória, toque numa faixa que já tem palavras. A
  revisão usa só as palavras daquela caixa, até 8. Palavras ainda sem agenda ficam na caixa de 1 dia.
- **Diálogos guiados**: cinco cenas lineares (pedir comida, check-in, entrevista, papo e caminho) e
  mais cinco em que a conversa muda: médico, aeroporto, loja, telefone e reunião. Você escolhe a
  intenção em português e fala a frase em inglês. O app fala a deixa e você responde no microfone ou
  por escrito. O mesmo tutor explica o erro e mostra um jeito melhor de dizer. Cada cena guarda o
  melhor resultado e conta XP e streak. A conquista das cinco cenas continua só com as primeiras.
- **Sombra**: ouça uma frase, repita e veja a nota. As palavras que faltaram ficam marcadas. Sem
  microfone, dá para escrever. Se o aparelho não tiver voz, um botão mostra a frase. O baralho de
  frases entra nessa fila, e dá para sombrear só ele.
- **Frases de sobrevivência**: pedir para repetir, pedir o sentido, ganhar tempo, concordar,
  discordar e interromper com educação. Praticar (por voz ou por escrito) coloca a frase na agenda
  Leitner. Quando vence, a Revisão Turbo cobra de novo, com a mesma caixa de 1, 3, 7, 16 e 35 dias.
- **Desafio de 5 minutos**: card na home. Mistura um turno de diálogo, sombra e frases. Terminar
  conta sequência e XP. Se o tempo acabar antes do mix completo, a sequência não muda. Sem rede.
- **Ouvir uma cena**: recados curtos de portão, clínica, loja, telefone, reunião e outros. A voz é a
  do aparelho, em velocidade natural ou devagar, sem arquivo de áudio. A pergunta só aparece depois
  que você ouve. Sem voz, o texto em inglês aparece para ler.
- **Pronúncia**: pares mínimos dos sons difíceis para quem fala português: TH, o -ed final, vogal
  curta e longa, e o acento da palavra. Ouça e escolha qual foi. A dica explica o par.
- **Painel da fala**: a nota dos últimos 7 dias e as frases que mais escapam. Diálogo, sombra,
  desafio, pronúncia e escuta alimentam o mesmo painel. O formato da nuvem continua o 3.
- **Teste de nível**: oito perguntas, de A1 a B2. O resultado ordena diálogos, fala rápida,
  phrasal verbs e os temas. Nada fica escondido. Refazer pode baixar o nível neste aparelho.
  Na nuvem, fica o mais alto. A primeira vez conta streak e XP.
- **Você pergunta**: café, loja, aeroporto e reunião. A sua fala é a pergunta. O tutor mostra
  um jeito melhor depois da tentativa.
- **Fala rápida**: gonna, wanna, gotta e palavras que se juntam, como cup of. A voz é a do
  aparelho, normal ou devagar, sem arquivo de áudio. A frase escrita só aparece depois.
- **Phrasal verbs e colocações**: look for, figure out, meet the deadline e outras frases de
  conversa. O treino fica no painel da fala e não entra na Revisão Turbo.
- **Falar de você**: um minuto sobre você, um hobby, o trabalho ou um projeto. O relógio corre
  no aparelho. O tutor olha o tamanho, as pistas e as ligações, sem enviar o texto.
- **Resumo da semana**: a nota de segunda a domingo e uma sugestão. Os contadores de perguntas,
  fala rápida, phrasal verbs e fala livre são do tempo todo.
- **Inglês de trabalho**: standup, explicar um bug, code review, entrevista remota e demo. A ordem
  segue o nível, de A1 a B2, e nada fica trancado. A conquista das cinco cenas não muda.
- **Sua voz ao lado do modelo**: grave até 8 segundos e ouça depois da tentativa, junto com a voz
  do aparelho. O áudio não entra no progresso, no backup nem na nuvem. Sem microfone, dá para escrever.
- **Pergunta do dia**: uma pergunta de trabalho e uma segunda em seguida. A data local escolhe a
  pergunta. Refazer no mesmo dia conta de novo, e a nuvem fica com a data mais nova.
- **Idioms de reunião**: touch base, heads up, circle back e outras frases de call remota. O treino
  fica no painel da fala e não entra na Revisão Turbo.
- **Deslizes de fala**: a frase que escapou em qualquer modo volta na data. Acertar empurra para
  1, 3, 7, 16 ou 35 dias. Errar traz para amanhã. Na nuvem fica a data mais cedo. Não entra na
  Revisão Turbo das palavras.
- **Entrevista longa**: seis falas seguidas para uma vaga full stack e remota. Você se apresenta,
  conta um projeto, um bug, o trabalho remoto, sugere uma mudança e faz uma pergunta.
- **Contar no passado**: histórias curtas em duas falas, como o trem, o almoço e o mercado.
- **Números, datas e preços**: ouça a voz do aparelho e escolha o valor. A frase escrita só aparece
  depois. Sem voz, dá para ler.
- **Por onde começar**: quem ainda não tem XP vê três caminhos na home: a primeira lição, o teste
  de nível ou a pergunta do dia.
- **Parceiro de conversa (opcional, desligado)**: bate-papo em inglês no seu nível, com correção
  depois de cada fala. Liga no perfil com uma chave do Google AI Studio. A chave fica só neste
  aparelho: não entra no backup nem na nuvem. Sem chave e sem rede, diálogos e sombra seguem offline.
- **Chefão de unidade**: liberado quando as 4 lições estão feitas. 12 exercícios difíceis, sem
  múltipla escolha, com 3 vidas.
- **Correção que perdoa o que é para perdoar**: contrações (`don't` = `do not`), traduções
  alternativas por item, pontuação, acento e um errinho de letra (uma a mais, a menos, trocada, ou
  duas vizinhas invertidas), desde que o errinho não forme outra palavra real: `house` nunca vale
  como `mouse`, e `launch` não vale como `lunch`.
- **Tutor que explica o porquê**: ao errar ou quase acertar, o app diz em português o que aconteceu
  (letra, palavra faltando ou sobrando, ordem, artigo, plural, tempo verbal ou falso amigo), destaca
  a diferença e mostra uma dica curta daquele erro. Funciona offline, com regras e um banco local.
  Sem API. Itens com nota de gramática continuam ensinando na hora, e as lições que têm card de
  estrutura abrem com ele na primeira vez.
- **Dica na hora**: botão 💡 na lição (tecla **D**) reabre a explicação da lição e a nota da frase.
  A home mostra a dica do dia, e dá para esconder até amanhã.
- **Pontos fracos**: cada erro entra numa contagem por palavra e por padrão. A Revisão Turbo cobra
  primeiro o que você mais erra. O perfil mostra esse painel ao lado da saúde da memória (caixas de
  Leitner). Acertar de novo abaixa o saldo da palavra.
- **Revisão espaçada de verdade (Leitner)**: cada palavra tem uma caixa e volta a ser cobrada em
  1, 3, 7, 16 e 35 dias. Acertou, sobe de caixa; errou, desce uma caixa e reaparece amanhã (só dois
  erros seguidos zeram — um tropeço não apaga semanas de espaçamento). A home mostra quantas
  palavras vencem hoje. O dia do app é o **dia local do aparelho** — streak e missões viram à
  meia-noite, não às 21h.
- **Expansão de Vocabulário**: as 2.700+ palavras mais frequentes do inglês (o banco inteiro do
  dicionário) viram lições jogáveis de 7 palavras, em quatro trilhas por classe gramatical com
  desbloqueio sequencial. **Toda palavra que você nunca viu é apresentada antes de ser cobrada** —
  grafia, pronúncia, classe e traduções — e depois entra na mesma agenda de revisão espaçada do
  curso. Sinônimos com a mesma tradução se aceitam mutuamente na digitação e nunca competem na
  múltipla escolha.
- **Minha Lista**: favorite palavras no dicionário e treine só elas.
- **Dicionário embutido**: 3.001 verbetes (os 247 do curso mais um banco das palavras mais frequentes do
  inglês), com classe gramatical, áudio e, para as do curso, o status da sua memória (🌱 memorizada,
  📅 vencendo hoje, ⏳ volta em 07/08…). Carregado sob demanda, só quando você abre a tela.

### Hábito e gamificação

- **Meta diária de XP** configurável (50 / 100 / 200 / 350), com o quadro da semana.
- **3 missões que trocam todo dia**, sorteadas de forma determinística a partir da data.
- **Streak com protetor**: perdoa um dia perdido, e você ganha um novo protetor a cada 5 lições
  perfeitas. O app avisa quando a sequência está para vencer.
- **10 níveis** com títulos que vão de *Turista Perdido* a *Rei da Gringa*, **34 conquistas**, XP com
  bônus de combo, confete e efeitos sonoros sintetizados no WebAudio (nenhum arquivo de áudio no
  repositório).
- **Desafio por link**: termine uma lição e mande o link para alguém tentar bater a sua pontuação.
- **Card de progresso**: um PNG 1080×1080 desenhado no canvas, pronto para as redes, via Web Share
  API (ou download, se o aparelho não suportar).
- **Louro 🦜**, o mascote, comenta cada resposta.

### Conta e sincronização

- **Funciona 100% sem conta.** O progresso mora no `localStorage`; login é opcional.
- **Login por e-mail ou Google** (Supabase Auth). O botão do Google só aparece se o provedor estiver
  realmente ativo no projeto — o app detecta sozinho.
- **Merge conservador** entre o aparelho e a nuvem: nada de “o último que salvou ganha”. Veja em
  [decisões técnicas](#decisões-técnicas).
- **Fila de reenvio**: sem rede, a pilha da conta mostra ⚠️ e o envio é retentado quando a conexão
  volta ou a aba fica visível de novo.
- **Backup em arquivo**: exporta e importa o progresso em JSON, sem depender de nuvem nenhuma.
- **LGPD**: dá para apagar a conta inteira pelo perfil — uma RPC `security definer` que só consegue
  apagar o próprio usuário, porque o alvo vem do JWT assinado e não do cliente.

### PWA e offline

- **Instalável** no Android e no iPhone; abre em tela cheia, com ícone próprio. Quando o navegador
  oferece instalar, a home mostra INSTALAR e AGORA NÃO. No iPhone, o card explica Compartilhar e
  depois Adicionar à Tela de Início. Esconder o convite vale só neste aparelho.
- **Funciona offline**: o service worker precacheia o app inteiro e serve o `index.html` como
  fallback de navegação. Sem internet, a home mostra uma faixa: as lições e o progresso continuam
  neste aparelho.
- **Aviso de versão nova** no app já aberto: “✨ Nova versão disponível — tocar para atualizar”.
- **Lembrete diário** opcional por notificação, no horário que você escolher.

### Acessibilidade e detalhes

- Teclado: **1–4** escolhem a opção, **Enter** verifica e avança, **Esc** sai da lição, **D** abre a dica,
  **S** ouve a frase de novo (fora do campo de texto e com o feedback fechado).
- Foco gerenciado a cada troca de tela, `aria-live` no feedback, `aria-pressed` nas opções e rótulos
  descritivos nos botões.
- `prefers-reduced-motion` respeitado — inclusive nas *view transitions* entre telas.
- Tema claro e escuro, com a cor da barra do sistema acompanhando.
- **Texto maior**: no perfil, NORMAL ou MAIOR. Nas telas de fala, as teclas 1, 2 e 3 marcam a opção.
  Enter segue em frente e Esc volta. A preferência fica só neste aparelho.
- **Voz configurável**: sotaque (🇺🇸 🇬🇧 🇦🇺…, conforme as vozes instaladas no aparelho), qual voz usar
  e a velocidade da fala, com botão de testar na hora. E um botão de mudo para o silêncio total.
- **Tela de diagnóstico** em `?debug`: os últimos 30 erros capturados, com a tela de origem. Nada é
  enviado para lugar nenhum.

---

## Arquitetura

Uma SPA sem router: `index.html` é uma casca com `<div id="app">`, e cada tela é uma função que
redesenha esse nó. O helper `h()` — 30 linhas em `js/util.js` — faz as vezes de JSX.

| Módulo | O que faz |
| --- | --- |
| `js/app.js` | Todas as telas e o fluxo entre elas: home, trilha, lição, resultado, dicionário, perfil, login, novidades e diagnóstico. |
| `js/game.js` | O estado do jogador: XP, streak, estrelas, conquistas, missões, agenda de Leitner, escutas, diálogos, frases, desafio de fala, painel da fala, nível de fala, deslizes do tutor, `localStorage`, export/import e o merge com a nuvem. |
| `js/conversa.js` | Diálogos guiados, nota da sombra e o parceiro opcional. A chave da API fica fora do progresso sincronizado. |
| `js/cenas.js` | Cinco diálogos em que a resposta escolhida muda a cena: médico, aeroporto, loja, telefone e reunião. |
| `js/pronuncia.js` | Pares mínimos, clipes de escuta e a conta da semana no painel da fala. |
| `js/fluencia.js` | Teste de nível, cenas em que você pergunta, fala rápida, phrasal verbs, fala livre e o resumo da semana. |
| `js/tecnico.js` | Cenas de trabalho, idioms de reunião e a pergunta do dia. |
| `js/ensaio.js` | Entrevista de seis falas, histórias no passado e a escuta de números, datas e preços. |
| `js/voz.js` | Gravação local para comparar com a voz do aparelho. O áudio não entra no progresso. |
| `js/frases.js` | Baralho de frases de sobrevivência, a fila da sombra e o plano do desafio de 5 minutos. |
| `js/exercises.js` | Sorteia, monta e corrige os 10 tipos de exercício e o modo Escuta, incluindo o diff palavra a palavra e os distratores que nunca entregam a resposta. |
| `js/dicas.js` | Tutor offline: classifica o erro, explica em português e escolhe a dica. Também sorteia a dica do dia. |
| `js/data.js` | O conteúdo: unidades, lições, itens, notas de gramática, níveis, conquistas, missões e as falas do mascote. |
| `js/dicionario.js` | Busca única em português e inglês (normalizada, sem acento), com ranking por tipo de casamento, filtros e status de memória. |
| `js/dicionario-dados.js` | O banco de 2.903 verbetes, importado dinamicamente só quando o dicionário abre. |
| `js/vocabulario.js` | A Expansão de Vocabulário: deriva do banco do dicionário quatro trilhas de lições por classe gramatical (7 palavras cada), com desbloqueio sequencial e ids determinísticos. |
| `js/nuvem.js` | Supabase: sessão, e-mail, Google, vinculação de identidades, download/upload do progresso e a tradução dos erros para português. |
| `js/audio.js` | Efeitos sonoros sintetizados no WebAudio, vibração e a pronúncia via `speechSynthesis` (escolha de voz e velocidade). |
| `js/compartilhar.js` | Desenha o card 1080×1080 de progresso no canvas e dispara a Web Share API. |
| `js/mascote.js` | Desenha o Louro em SVG inline, com poses (neutro, feliz, pensando, dormindo, coroa). |
| `js/metricas.js` | Métricas anônimas de uso: registra só o nome do evento (`abertura`, `licao`, `conta`, `instalou`) e a data na tabela `eventos` do Supabase — com aviso no app e desligável no perfil. |
| `js/erros.js` | Log em anel dos últimos 30 erros no `localStorage`, alimentado por `error` e `unhandledrejection`, exposto em `?debug`. |
| `js/util.js` | `h()`, embaralhar, amostra, aleatório. É só isso. |
| `js/config.js` | URL e anon key do projeto Supabase. |
| `sw.js` | Service worker: precache versionado, network-first na navegação, stale-while-revalidate nos assets. |
| `servidor.js` | Servidor estático mínimo em Node, só para desenvolvimento. |
| `tests/` | A suíte do `node --test`, sem dependências. |
| `docs/supabase.sql` | O schema do backend versionado: tabela, RLS, trigger de carimbo e a RPC de exclusão de conta. |

### Decisões técnicas

**Vanilla JS, sem build.** ES modules nativos servidos como estão. Sem bundler, sem transpiler, sem
`node_modules`, sem lockfile para envelhecer. O arquivo que você lê no repositório é byte a byte o que
o DevTools mostra, o deploy é um `git push` para o GitHub Pages, e daqui a três anos ainda vai abrir.
Para um app pessoal que precisa durar mais que a moda do mês, isso vale mais que qualquer conforto de
dev server.

**Leitner para a revisão espaçada.** Cinco caixas, com intervalos de 1, 3, 7, 16 e 35 dias. Acerto sobe
uma caixa e adia; erro zera e traz para amanhã. É o algoritmo mais simples que entrega o essencial da
repetição espaçada — sem a complexidade (e o estado) de um SM-2 — e cabe inteiro em `agendar()`, cinco
linhas. A distribuição das caixas vira o gráfico de “saúde da memória” no perfil.

**Merge conservador no sync multi-dispositivo.** Dois celulares abertos na mesma conta não podem fazer
você perder XP. Então `mesclarEstado()` nunca sobrescreve: XP e estatísticas entram por `Math.max`,
estrelas por lição ficam com a maior, conquistas / erros / favoritas são união de conjuntos, o
histórico resolve dia a dia, missões do mesmo dia somam o progresso sem pagar bônus duas vezes e os
protetores de streak mesclam por contadores de ganho/gasto — gastar num aparelho não regenera pelo
outro. Antes de reenviar uma pendência, o app baixa e mescla o que estiver na nuvem, para nunca
sobrescrever o progresso feito em outro aparelho; e o payload remoto é validado campo a campo antes
de entrar (tipo, versão do formato e chaves perigosas). A agenda de revisão é o caso mais delicado, e a regra é deliberadamente
pessimista: fica com a **menor** caixa e a **data mais próxima** dos dois lados — na dúvida você revisa
antes, nunca depois. O streak tem quatro ramos explícitos (sem histórico local, remoto mais novo, mesmo
dia, local mais novo) e reconhece dias consecutivos em vez de só comparar números. Os quatro ramos são
testados.

Os deslizes do tutor (contagem por palavra e por padrão de erro) mesclam pelo maior número, no mesmo
espírito das estatísticas. Backup antigo, sem esses campos, abre normal: as listas nascem vazias. O
formato da nuvem está na versão 3; um app antigo não sobrescreve esse payload.

**Service worker versionado à mão.** A constante `VERSAO` no topo do `sw.js` nomeia o cache; o `activate`
apaga todos os outros. Publicar uma versão é incrementar essa constante — e quem já está com o app aberto
vê o aviso de atualização e resolve com um toque. Sem um plugin de build gerando hash, a invalidação fica
explícita e óbvia, que é exatamente o que se quer de um cache offline. Requisições para o Supabase nunca
passam pelo service worker.

**`supabase-js` vendorizado em `js/vendor/`.** Nada de `<script src="cdn…">` no caminho crítico: os
bundles ESM do `@supabase/supabase-js@2.112.0` estão no repositório, baixados por `js/vendor/_baixar.mjs`,
que reescreve os imports *bare* para caminhos relativos. Isso mantém o app instalável e offline, deixa a
versão auditável no diff e tira um terceiro do carregamento. E o import é dinâmico: quem nunca faz login
não baixa um byte de Supabase.

**Testes com `node --test`, sem dependências.** O runner nativo do Node basta. `tests/ambiente.js` stuba
`window`, `document`, `localStorage` e `speechSynthesis` para os módulos do app rodarem fora do navegador
— e é isso que permite testar a lógica de verdade (correção, geração de exercícios, merge, agenda) sem
headless browser, sem framework de mock e sem instalar nada.

---

## Como rodar

```bash
node servidor.js
```

Abra <http://localhost:8123>. Qualquer servidor estático também serve (`python3 -m http.server 8123`).

> É preciso um servidor por causa dos ES modules — abrir o `index.html` direto do disco não funciona.

### Testes

A suíte roda no runner nativo do Node: **276 testes em 59 suítes**, sem instalar nada
(o `package.json` da raiz é só metadado: `"type": "module"`, zero dependências, zero lockfile).
De dentro da pasta do projeto:

```bash
node --test
```

Dá para apontar só para os arquivos de teste (ou para um deles):

```bash
node --test "tests/*.test.js"
node --test tests/jogo.test.js
```

A mesma suíte roda no CI (`.github/workflows/testes.yml`) a cada push, em Node 20 e 22 — uma
regressão não chega mais ao ar sem ser vista.

> **No Windows**, com o projeto aberto pelo caminho UNC do WSL (`\\wsl.localhost\...`), passar a
> **pasta** (`node --test tests/`) pode falhar com `Cannot find module` — use `node --test` sem
> argumento ou o glob acima. Rodando por dentro do WSL a pasta funciona normalmente.

O que a suíte cobre:

- **`tests/exercicios.test.js`** — `diffPalavras` (faltou, sobrou, trocou, tudo diferente),
  `gerarExercicios` (quantidade exata e o exercício de pares) e os distratores, que nunca podem
  entregar uma opção que é pedaço da resposta certa (`take a shower` jamais recebe `shower`).
- **`tests/dicas.test.js`**: o tutor offline (artigo, ordem, plural, tempo verbal, falso amigo, typo
  aceito ou recusado) e a dica do dia.
- **`tests/correcao.test.js`**: a correção de cada tipo: digitar (contrações, campo `alt`, pontuação
  e o errinho de letra perdoado, inclusive letra trocada de lugar), múltipla escolha, montar frase
  com peças, ligar os pares e o exercício de falar quando o microfone não existe.
- **`tests/escuta.test.js`**: a sessão de Escuta sem microfone vira só escrita do que foi ouvido.
- **`tests/conversa.test.js`**: cenas guiadas, nota da sombra, chave do parceiro fora do backup e o merge dos diálogos.
- **`tests/frases.test.js`**: o baralho, a nota da frase, a sombra só com o baralho, o desafio de 5 minutos e a entrada na agenda Leitner.
- **`tests/fala.test.js`**: cenas com dois caminhos, pares mínimos, clipes de escuta, a média da semana e o merge do painel.
- **`tests/fluencia.test.js`**: o teste de nível, as cenas em que você pergunta, a fala livre, as reduções, os phrasal verbs e o resumo da semana.
- **`tests/tecnico.test.js`**: as cenas de trabalho, os idioms de reunião, a pergunta do dia, a gravação local e o merge da data.
- **`tests/ensaio.test.js`**: a entrevista longa, as histórias no passado, os números de ouvido e a agenda dos deslizes.
- **`tests/jogo.test.js`**: `mesclarEstado` (os quatro ramos do streak, XP, estrelas, conquistas,
  erros, histórico e a agenda conservadora dos itens), `itensVencidos`, `nivelInfo`, `streakAtual` e a
  limpeza de estado. `tests/progresso.test.js` cobre a Escuta (recorde, conquista e merge) e as
  palavras de cada caixa de Leitner.
- **`tests/ambiente.js`**: os stubs de navegador. Ficam de fora do teste automatizado: `js/app.js`
  (depende de DOM real), `js/nuvem.js` (Supabase) e o microfone ao vivo (precisa de
  `SpeechRecognition`).

### Instalar no celular

Abra <https://lucasrmagalhaes.github.io/gringolingo-js/> e escolha “Adicionar à tela de início” (o
Android/Chrome mostra o convite sozinho; no iPhone é pelo menu Compartilhar do Safari). O app ganha
ícone próprio, abre em tela cheia e funciona offline — as lições ficam em cache e o progresso sobe
para a nuvem quando a rede volta.

> Ao publicar uma versão nova, incremente `VERSAO` no topo do `sw.js`. Quem já tem o app aberto vê o
> aviso “✨ Nova versão disponível” e atualiza com um toque.

---

## Backend (Supabase)

Sem configurar nada, o app funciona 100% offline com o progresso no `localStorage`. A nuvem só entra
para quem quiser login e sincronização entre aparelhos.

O schema é versionado em **[`docs/supabase.sql`](docs/supabase.sql)** — tabela, constraint de tamanho,
trigger de carimbo no servidor, RLS, grants e a RPC de exclusão de conta, tudo idempotente e não
destrutivo. O arquivo é a fonte da verdade e justifica cada decisão no próprio comentário.

<details>
<summary><b>Configurar do zero</b></summary>

1. Crie um projeto grátis em <https://supabase.com>.
2. No painel, abra **SQL Editor → New query**, cole o conteúdo de `docs/supabase.sql` e rode. Ele pode
   ser executado quantas vezes for preciso — não apaga nem altera dados.
3. Copie a **Project URL** e a **anon public key** (Settings → API) para `js/config.js`. A anon key é
   pública por design: a segurança vem das políticas de RLS do passo 2.
4. (Recomendado para uso pessoal) Em **Authentication → Sign In / Providers → Email**, desative
   *Confirm email* para entrar direto após criar a conta. Com a confirmação ligada, o cadastro exige
   clicar no link do e-mail antes do primeiro login (o app avisa disso, e também avisa quando o link
   expirou). Para conferir como o projeto está, veja `mailer_autoconfirm` em
   `https://<seu-projeto>.supabase.co/auth/v1/settings`: `true` = entra direto, `false` = precisa
   confirmar.
5. Pronto: aparece o botão **🔑 Entrar** no app. O progresso local e o da nuvem são mesclados no login
   e cada lição concluída é enviada automaticamente.

A seção 9 do `docs/supabase.sql` lista os ajustes que **não** dá para versionar e que precisam ser
feitos no painel uma vez por projeto: senha mínima de 8 caracteres, exigência de tipos de caractere
e a limpeza dos *Redirect URLs*. A proteção contra senhas vazadas (HaveIBeenPwned) também está
documentada lá, mas o painel só a libera no **plano Pro** — no free ela fica desabilitada.

O tamanho mínimo aparece em um lugar só do código: `SENHA_MINIMA` em `js/nuvem.js`, usada no
placeholder e na checagem antes do cadastro. A mensagem de erro, porém, não depende dela — o
`traduzirErro` lê o número da própria resposta do servidor, então se o valor do painel mudar o app
não passa a mentir sobre o requisito. Há teste cobrindo isso em `tests/erros-auth.test.js`.

</details>

<details>
<summary><b>Login com Google (opcional)</b></summary>

O app detecta sozinho se o provedor está ativo: quando estiver, o botão **Entrar com Google** aparece
na tela de login e a opção **Vincular Google** aparece no perfil. Sem configurar nada, essa parte fica
invisível e o login por e-mail continua funcionando.

1. No [Google Cloud Console](https://console.cloud.google.com/apis/credentials), crie uma credencial
   **OAuth client ID** do tipo *Web application*. Em *Authorized redirect URIs* coloque
   `https://<seu-projeto>.supabase.co/auth/v1/callback`.
2. No Supabase, em **Authentication → Sign In / Providers → Google**, ative o provedor e cole o
   *Client ID* e o *Client Secret* gerados no passo 1.
3. Em **Authentication → URL Configuration**, inclua em *Redirect URLs* os endereços de onde o app
   roda, por exemplo `https://<usuario>.github.io/gringolingo-js/**` e `http://localhost:8123/**`.
4. Para permitir **vincular o Google a uma conta de e-mail já existente**, ative *Manual linking* em
   **Authentication → Settings** (sem isso, o botão de vincular retorna um erro explicando).

Vinculado, a mesma conta aceita os dois modos de entrada e o progresso é um só. No perfil dá para
desvincular — o app impede remover a última forma de login que sobrou.

</details>

<details>
<summary><b>Manter o projeto free acordado</b></summary>

`.github/workflows/keep-alive.yml` chama a RPC pública `ping()` (via PostgREST) três vezes por
semana — atividade real no Postgres, que é o que conta para a pausa por inatividade do plano
gratuito. Atenção: o GitHub desativa workflows agendados após 60 dias sem commits no repositório.

</details>

---

## Estrutura

```
index.html                        casca da SPA
css/style.css                     tema completo (claro e escuro)
css/fontes/                       Nunito auto-hospedada (offline e sem terceiros no carregamento)
js/                               os módulos da tabela acima
js/vendor/                        supabase-js 2.112.0 vendorizado (+ _baixar.mjs, que o gera)
tests/                            suíte do node --test
docs/supabase.sql                 schema e políticas do backend, versionados
docs/img/                         as capturas de tela deste README
.github/workflows/testes.yml      CI: a suíte inteira a cada push (Node 20 e 22)
.github/workflows/keep-alive.yml  ping 3x/semana para o free tier não pausar
sw.js                             service worker (cache offline)
manifest.webmanifest              metadados do PWA
icones/                           ícones do app (192, 512, maskable, apple-touch e og-image)
servidor.js                       servidor estático mínimo (Node)
package.json                      só metadado ("type": "module") — zero dependências
LICENSE                           MIT
```

## Licença

[MIT](LICENSE).
