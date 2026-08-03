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

3. (Opcional, recomendado p/ uso pessoal) Em **Authentication → Sign In / Providers → Email**,
   desative *Confirm email* para entrar direto após criar a conta.
4. Copie a **Project URL** e a **anon public key** (Settings → API) para `js/config.js`.
   A anon key é pública por design — a segurança vem das políticas de RLS acima.
5. Pronto: aparece o botão **🔑 Entrar** no app. O progresso local e o da nuvem são
   mesclados no login (maior XP, união de estrelas/badges/erros) e cada lição
   concluída é enviada automaticamente.

