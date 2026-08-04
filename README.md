# GringoLingo 🦜

App divertido para aprender inglês, estilo joguinho. 100% estático — HTML, CSS e JS puro, sem build, sem dependências. Progresso salvo no navegador (localStorage).

## Como rodar

```bash
node servidor.js
```

Abra http://localhost:8123. Qualquer servidor estático também funciona (ex.: `python3 -m http.server 8123`).

> Precisa de um servidor por causa dos ES modules — abrir o `index.html` direto do disco não funciona.

## O que tem

- **8 unidades × 4 lições**: Primeiros Passos, Comida Boa, Modo Viagem, Modo Trabalho, Família & Amigos, Casa Doce Casa, Corpo São e Rotina de Campeão — com desbloqueio progressivo e até 3 estrelas por lição.
- **6 tipos de exercício**: múltipla escolha EN→PT e PT→EN, digitar a tradução (aceita 1 errinho de digitação, traduções alternativas e contrações), montar frase com peças, listening com pronúncia falada e ligar os pares.
- **Feedback que ensina**: ao errar uma frase, a resposta certa aparece com as palavras que faltaram destacadas e o que você escreveu a mais riscado; itens com o campo `nota` ainda mostram uma dica de gramática (💡 "estados usam to be, não have").
- **Gamificação**: XP com bônus de combo, níveis com títulos ("Turista Perdido" → "Netflix Sem Legenda" → "Lenda do Inglês"), streak diário, 10 conquistas, confete e efeitos sonoros.
- **Revisão Turbo**: palavras erradas entram numa fila de revanche; acertou na revisão, sai da fila.
- **Louro 🦜**: o mascote comenta cada resposta.

## Estrutura

```
index.html        casca da SPA
css/style.css     tema completo
js/app.js         telas e fluxo (home, lição, resultado, perfil, login)
js/exercises.js   geração e correção dos 6 tipos de exercício
js/game.js        estado, XP, streak, badges, localStorage e merge com a nuvem
js/data.js        conteúdo das lições, níveis, badges e frases do mascote
js/audio.js       efeitos sonoros (WebAudio) e pronúncia (speechSynthesis)
js/util.js        helpers de DOM e aleatoriedade
js/nuvem.js       autenticação e sincronização (Supabase)
js/config.js      URL e anon key do projeto Supabase
servidor.js       servidor estático mínimo (Node)
```

## Conta e sincronização (Supabase)

Sem configurar nada, o app funciona 100% offline com o progresso no localStorage.
Para habilitar login + sincronização entre dispositivos:

1. Crie um projeto grátis em https://supabase.com.
2. No painel, rode este SQL (**SQL Editor → New query**):

```sql
create table public.progresso (
  user_id uuid primary key references auth.users (id) on delete cascade,
  dados jsonb not null,
  atualizado_em timestamptz not null default now()
);

alter table public.progresso enable row level security;

create policy "ler o proprio progresso" on public.progresso
  for select using (auth.uid() = user_id);

create policy "inserir o proprio progresso" on public.progresso
  for insert with check (auth.uid() = user_id);

create policy "atualizar o proprio progresso" on public.progresso
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

3. (Recomendado p/ uso pessoal) Em **Authentication → Sign In / Providers → Email**,
   desative *Confirm email* para entrar direto após criar a conta. Com a confirmação ligada,
   o cadastro exige clicar no link do e-mail antes do primeiro login (o app avisa disso, e
   também avisa quando o link expirou). Para conferir como o projeto está, veja
   `mailer_autoconfirm` em `https://<seu-projeto>.supabase.co/auth/v1/settings`:
   `true` = entra direto, `false` = precisa confirmar.
4. Copie a **Project URL** e a **anon public key** (Settings → API) para `js/config.js`.
   A anon key é pública por design — a segurança vem das políticas de RLS acima.
5. Pronto: aparece o botão **🔑 Entrar** no app. O progresso local e o da nuvem são
   mesclados no login (maior XP, união de estrelas/badges/erros) e cada lição
   concluída é enviada automaticamente.

### Login com Google (opcional)

O app detecta sozinho se o provedor está ativo: quando estiver, o botão **Entrar com Google**
aparece na tela de login e a opção **Vincular Google** aparece no perfil. Sem configurar nada,
essa parte fica invisível e o login por e-mail continua funcionando.

1. No [Google Cloud Console](https://console.cloud.google.com/apis/credentials), crie uma
   credencial **OAuth client ID** do tipo *Web application*. Em *Authorized redirect URIs*
   coloque `https://<seu-projeto>.supabase.co/auth/v1/callback`.
2. No Supabase, em **Authentication → Sign In / Providers → Google**, ative o provedor e cole
   o *Client ID* e o *Client Secret* gerados no passo 1.
3. Em **Authentication → URL Configuration**, inclua em *Redirect URLs* os endereços de onde o
   app roda, por exemplo `https://<usuario>.github.io/gringolingo-js/**` e `http://localhost:8123/**`.
4. Para permitir **vincular o Google a uma conta de e-mail já existente**, ative *Manual linking*
   em **Authentication → Settings** (sem isso, o botão de vincular retorna erro explicando).

Vinculado, a mesma conta aceita os dois modos de entrada e o progresso é um só. No perfil dá
para desvincular — o app impede remover a última forma de login que sobrou.

