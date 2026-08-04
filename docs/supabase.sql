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
--
-- Se aparecer "deadlock detected" ou "canceling statement due to lock timeout":
--   alguem estava lendo/escrevendo na tabela progresso enquanto o script pedia
--   lock exclusivo para alterar a tabela. Nao ha nada de errado com o script -
--   feche o app em outras abas (o PWA sincroniza sozinho ao abrir) e rode de
--   novo. As duas linhas abaixo tornam essa falha rapida e limpa em vez de
--   travar a sessao: o script desiste em 5s e nada fica pela metade.
-- =============================================================================

set lock_timeout = '5s';
set idle_in_transaction_session_timeout = '30s';


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


-- -----------------------------------------------------------------------------
-- 7. Direito ao esquecimento (LGPD): apagar a propria conta
--
-- A LGPD da ao titular o direito de eliminar seus dados pessoais (art. 18, VI).
-- Aqui isso e uma chamada so: com o usuario logado, o app faz
-- supabase.rpc('apagar_minha_conta') e some com tudo - a linha em auth.users e,
-- por cascade da FK declarada na secao 1, o progresso junto.
--
-- Por que "security definer" e necessario:
--   A anon key e publica (esta em js/config.js) e, mesmo depois do login, o
--   token que o app usa e do papel "authenticated". Nenhum dos dois tem - nem
--   pode ter - permissao de delete em auth.users: dar esse grant ao
--   authenticated deixaria qualquer cliente apagar QUALQUER usuario, bastando
--   trocar o id na requisicao. Com security definer a funcao roda com os
--   privilegios do dono (o papel que executa este script no SQL Editor, que
--   enxerga o schema auth) e o alvo do delete nao vem do cliente: vem de
--   auth.uid(), lido do JWT assinado. Ou seja, o usuario so apaga a si mesmo.
--
-- Por que "set search_path = '' ":
--   Em funcao security definer isso e obrigatorio. Sem search_path fixo, quem
--   pudesse criar objetos num schema a frente na busca plantaria uma funcao ou
--   tabela de nome colidente e sequestraria a execucao - com os privilegios do
--   dono. Com o search_path vazio, todo nome aqui dentro precisa vir
--   qualificado (auth.users, auth.uid()), e nao ha o que sequestrar.
--
-- Se a chamada falhar com "permission denied for table users", o problema nao e
-- esta funcao: e o dono dela que nao tem delete em auth.users. Rode o script
-- como postgres no SQL Editor do painel (que e o caso normal) - nao afrouxe as
-- permissoes do schema auth para contornar.
-- -----------------------------------------------------------------------------
create or replace function public.apagar_minha_conta()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  usuario_atual uuid := auth.uid();
begin
  if usuario_atual is null then
    raise exception 'Nenhum usuario autenticado: chame esta funcao com um token valido.'
      using errcode = '28000';
  end if;

  delete from auth.users where id = usuario_atual;
end;
$$;

comment on function public.apagar_minha_conta() is 'LGPD: apaga a conta do usuario autenticado (auth.uid()); o progresso vai junto por cascade.';

-- Funcao nova nasce com execute liberado para PUBLIC, ou seja, ate o anon (sem
-- login) poderia chamar. Revogamos e devolvemos so para authenticated. O revoke
-- em anon e redundante depois do revoke em public, mas fica explicito para o
-- caso de alguem reconceder em massa no schema mais tarde.
revoke all on function public.apagar_minha_conta() from public;
revoke all on function public.apagar_minha_conta() from anon;
grant execute on function public.apagar_minha_conta() to authenticated;


-- -----------------------------------------------------------------------------
-- 8. Defesa em profundidade: nenhum privilegio de tabela para o anon
--
-- A RLS da secao 4 ja barra o anon (nao existe policy alguma para esse papel, e
-- o que nao tem policy fica bloqueado), entao a linha abaixo nao muda o
-- comportamento de hoje - e cinto e suspensorio.
--
-- O motivo de existir sao os default privileges do schema public: instalacoes
-- antigas do Postgres, extensoes e scripts de terceiros costumam conceder em
-- massa (grant ... on all tables in schema public to anon), e o schema public e
-- justamente onde a tabela mora. Se um grant desses voltar e alguem, num
-- debug, rodar "alter table ... disable row level security", a tabela inteira
-- vazaria pela anon key. Sem grant, mesmo sem RLS o anon nao le nada.
-- -----------------------------------------------------------------------------
revoke all on table public.progresso from anon;


-- -----------------------------------------------------------------------------
-- 10. Metricas anonimas (opcional)
--
-- Uma tabela so de contagem: o app registra que ALGUEM abriu o app ou concluiu
-- uma licao naquele dia, e nada mais. Nao ha user_id, nao ha IP, nao ha sessao,
-- nao ha cookie - e impossivel ligar uma linha a uma pessoa. O objetivo e saber
-- se o app esta sendo usado, nao quem usa.
--
-- A policy e so de INSERT: nem anon nem authenticated conseguem ler de volta.
-- Quem quiser ver os numeros consulta pelo painel (como dono do projeto).
-- O CHECK limita os valores aceitos, entao a tabela nao vira deposito de texto
-- arbitrario vindo de fora.
-- -----------------------------------------------------------------------------
create table if not exists public.eventos (
  id bigint generated always as identity primary key,
  evento text not null,
  dia date not null,
  criado_em timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'eventos_evento_valido'
  ) then
    alter table public.eventos
      add constraint eventos_evento_valido
      check (evento in ('abertura', 'licao', 'conta', 'instalou'));
  end if;
end
$$;

alter table public.eventos enable row level security;

drop policy if exists "qualquer um registra evento" on public.eventos;
create policy "qualquer um registra evento" on public.eventos
  for insert with check (
    dia between (current_date - 1) and (current_date + 1)
  );

grant insert on table public.eventos to anon, authenticated;
revoke select, update, delete on table public.eventos from anon, authenticated;

comment on table public.eventos is 'Contagem anonima de uso: sem user_id, sem IP, sem cookie. Insert-only.';


-- -----------------------------------------------------------------------------
-- 9. Ajustes que NAO dao para versionar (fazer no painel do Supabase)
--
-- Nada nesta secao e SQL executavel: sao configuracoes de autenticacao que
-- ficam fora do banco (no painel/API de management), entao este script nao
-- consegue aplica-las. Precisam ser conferidas na mao, uma vez por projeto -
-- sem elas o schema fica correto mas o login continua frouxo. Os caminhos de
-- menu sao os do painel atual e mudam de nome de tempos em tempos; o que vale e
-- o ajuste, nao o caminho.
--
--   a) Senha minima de 8 caracteres
--      Authentication -> Sign In / Providers -> Email -> Minimum password length
--      O padrao do Supabase e 6. Subir para 8 (no minimo). O app so valida no
--      front, e validacao de front nao vale nada: quem chamar /auth/v1/signup
--      direto passa por cima. Quem manda e este parametro.
--
--   b) Leaked password protection (HaveIBeenPwned)
--      Authentication -> Sign In / Providers -> Password Security ->
--      "Prevent use of leaked passwords"
--      Vem desligado no plano free. Ligado, o Supabase consulta o HaveIBeenPwned
--      (por k-anonymity: so um prefixo do hash sai da maquina, a senha em si
--      nunca trafega) e recusa cadastro/troca com senha ja vazada. E a defesa
--      mais barata que existe contra credential stuffing.
--
--   c) Conferir os Redirect URLs
--      Authentication -> URL Configuration -> Site URL / Redirect URLs
--      Deixar listadas apenas as origens realmente usadas (o servidor local de
--      desenvolvimento e a URL de producao) e apagar entradas antigas. Nada de
--      curinga amplo do tipo http://localhost:* ou https://*.dominio. O token de
--      sessao volta na URL de redirecionamento: uma entrada folgada permite
--      mandar o usuario para um endereco controlado por terceiro e colher a
--      sessao dele.
--
--   d) Conferencia rapida do que a secao 7 criou (opcional, no SQL Editor):
--
--        select proname, prosecdef, proconfig
--          from pg_proc
--         where oid = 'public.apagar_minha_conta()'::regprocedure;
--
--      Deve devolver prosecdef = true e proconfig = {"search_path="}.
-- -----------------------------------------------------------------------------
