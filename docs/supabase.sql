-- =============================================================================
-- GringoLingo - schema do backend (Supabase / PostgreSQL)
--
-- Este arquivo e a fonte da verdade do backend: rodando ele num projeto Supabase
-- vazio, a sincronizacao de progresso do app volta a funcionar do zero.
--
-- Como aplicar: painel do Supabase -> SQL Editor -> New query -> cole tudo -> Run.
--
-- Garantias deste script:
--   * idempotente  - pode rodar quantas vezes quiser, o resultado e o mesmo;
--   * nao destrutivo - nao existe drop table, delete, truncate nem update de
--     dados aqui. E seguro rodar em producao com usuarios reais.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. Tabela de progresso
--
-- Uma linha por usuario (user_id e a PK), com todo o progresso serializado no
-- jsonb "dados". O app le/escreve via PostgREST em js/nuvem.js
-- (baixarProgresso / enviarProgresso, que faz upsert).
-- Apagar o usuario no auth apaga o progresso junto (on delete cascade).
-- -----------------------------------------------------------------------------
create table if not exists public.progresso (
  user_id uuid primary key references auth.users (id) on delete cascade,
  dados jsonb not null,
  atualizado_em timestamptz not null default now()
);

comment on table public.progresso is 'Progresso do GringoLingo: uma linha por usuario, protegida por RLS.';
comment on column public.progresso.user_id is 'Dono da linha; casa com auth.uid() nas policies.';
comment on column public.progresso.dados is 'Progresso serializado (XP, estrelas, badges, erros). Limitado a 32 KB.';
comment on column public.progresso.atualizado_em is 'Preenchido pelo trigger no servidor; o valor enviado pelo cliente e ignorado.';


-- -----------------------------------------------------------------------------
-- 2. Limite de tamanho do jsonb (~32 KB)
--
-- Evita que um cliente adulterado (ou um bug de serializacao) encha o banco do
-- plano free. A constraint entra so se ainda nao existir, porque a tabela pode
-- ja estar criada em producao.
--
-- Entra como NOT VALID de proposito: assim o Postgres passa a barrar qualquer
-- insert/update acima do limite a partir de agora, mas NAO varre a tabela nem
-- falha caso alguma linha antiga ja esteja acima - o que abortaria o script
-- inteiro. Para conferir se existe linha grande e, se nao houver, promover a
-- constraint a validada, rode depois (fora deste script):
--
--   select user_id, pg_column_size(dados) from public.progresso
--    where pg_column_size(dados) > 32768;
--   alter table public.progresso validate constraint progresso_dados_tamanho_check;
-- -----------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1
      from pg_constraint
     where conrelid = 'public.progresso'::regclass
       and conname = 'progresso_dados_tamanho_check'
  ) then
    alter table public.progresso
      add constraint progresso_dados_tamanho_check
      check (pg_column_size(dados) <= 32768) not valid;
  end if;
end;
$$;


-- -----------------------------------------------------------------------------
-- 3. Carimbo de data/hora no servidor
--
-- O app manda atualizado_em no upsert, mas quem manda e o servidor: o trigger
-- sobrescreve o valor recebido com now(), entao o campo nao pode ser forjado
-- pelo cliente (relogio errado, payload adulterado, etc).
-- -----------------------------------------------------------------------------
create or replace function public.progresso_carimbar_atualizado_em()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

comment on function public.progresso_carimbar_atualizado_em() is 'Forca atualizado_em = now(), ignorando o valor enviado pelo cliente.';

drop trigger if exists progresso_carimbar_atualizado_em on public.progresso;

create trigger progresso_carimbar_atualizado_em
  before insert or update on public.progresso
  for each row
  execute function public.progresso_carimbar_atualizado_em();


-- -----------------------------------------------------------------------------
-- 4. Row Level Security
--
-- Sem RLS a anon key (que e publica por design, esta em js/config.js) leria a
-- tabela inteira. Com RLS ligado e sem policy, ninguem le nada; as policies
-- abaixo liberam exclusivamente a propria linha do usuario autenticado.
--
-- Nao existe policy de delete: o app nunca apaga progresso, e o que nao tem
-- policy fica bloqueado. A limpeza acontece via cascade do auth.users.
--
-- Os nomes das policies sao os mesmos ja usados em producao (e documentados no
-- README), entao o "drop policy if exists" abaixo substitui as antigas em vez
-- de criar policies duplicadas em paralelo.
-- -----------------------------------------------------------------------------
alter table public.progresso enable row level security;

drop policy if exists "ler o proprio progresso" on public.progresso;
create policy "ler o proprio progresso" on public.progresso
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "inserir o proprio progresso" on public.progresso;
create policy "inserir o proprio progresso" on public.progresso
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "atualizar o proprio progresso" on public.progresso;
create policy "atualizar o proprio progresso" on public.progresso
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- -----------------------------------------------------------------------------
-- 5. Permissoes de tabela
--
-- RLS filtra as linhas, o grant diz quais verbos existem. Damos a usuario
-- logado apenas select/insert/update (o app nao apaga nada) e nada para anon,
-- que precisa entrar antes de sincronizar.
-- -----------------------------------------------------------------------------
grant select, insert, update on table public.progresso to authenticated;


-- -----------------------------------------------------------------------------
-- 6. Conferencia rapida (opcional)
--
-- Depois de rodar, isto deve devolver rowsecurity = true e as tres policies:
--
--   select relrowsecurity from pg_class where oid = 'public.progresso'::regclass;
--   select policyname, cmd, roles from pg_policies
--    where schemaname = 'public' and tablename = 'progresso' order by policyname;
-- -----------------------------------------------------------------------------
