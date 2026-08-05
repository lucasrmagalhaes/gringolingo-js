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
--   * nao destrutivo - RODAR este script nao apaga nem altera dado nenhum: nao
--     ha drop table, truncate nem update aqui. O unico delete do arquivo vive
--     DENTRO da funcao de retencao da secao 11, que so roda quando chamada (a
--     mao ou pelo cron) e so apaga eventos crus depois de somar tudo no
--     agregado. E seguro rodar em producao com usuarios reais.
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
comment on column public.progresso.dados is 'Progresso serializado (XP, estrelas, badges, erros). Precisa ser objeto JSON e caber em 64 KiB de texto (secao 2).';
comment on column public.progresso.atualizado_em is 'Preenchido pelo trigger no servidor; o valor enviado pelo cliente e ignorado.';


-- -----------------------------------------------------------------------------
-- 2. Sanidade do jsonb: tem que ser objeto e caber em 64 KiB
--
-- Evita que um cliente adulterado (ou um bug de serializacao) encha o banco do
-- plano free ou grave lixo. Duas defesas, ambas condicionais porque a tabela
-- pode ja estar criada em producao:
--
--   a) jsonb_typeof(dados) = 'object': o "not null" da secao 1 sozinho nao
--      basta, porque 'null'::jsonb, um numero ou uma string sao jsonb validos
--      e "nao nulos". O progresso e sempre um objeto; qualquer outra coisa e
--      bug ou abuso, e e melhor o banco recusar do que o app quebrar ao ler.
--
--   b) octet_length(dados::text) <= 65536: limite de tamanho. A versao antiga
--      usava pg_column_size(dados) <= 32768, que mede o datum binario do
--      Postgres (com TOAST e compressao no meio) - um numero que varia por
--      versao/armazenamento e que nao da para explicar ao usuario. O
--      octet_length do texto e deterministico e corresponde, a poucos bytes de
--      espacamento, ao JSON.stringify que o cliente envia. E 64 KiB da folga
--      para o historico de erros crescer sem abrir espaco para abuso. O drop
--      da constraint antiga e "if exists": nao faz nada num projeto novo e e
--      inofensivo de repetir.
--
-- As duas entram como NOT VALID e o script tenta promover a validada logo em
-- seguida, num sub-bloco proprio com exception handler: se alguma linha antiga
-- violar (ou a tabela estiver ocupada), so o VALIDATE falha - fica um "notice"
-- no output, a constraint segue valendo para todo insert/update dali em diante
-- e o script continua. O sub-bloco e separado de proposito: exception capturada
-- em plpgsql desfaz o trabalho do bloco protegido, e nao queremos desfazer a
-- criacao da constraint junto. Para investigar depois de um notice:
--
--   select user_id, octet_length(dados::text), jsonb_typeof(dados)
--     from public.progresso
--    where octet_length(dados::text) > 65536
--       or jsonb_typeof(dados) is distinct from 'object';
--   alter table public.progresso validate constraint progresso_dados_objeto_check;
--   alter table public.progresso validate constraint progresso_dados_tamanho_texto_check;
-- -----------------------------------------------------------------------------
alter table public.progresso
  drop constraint if exists progresso_dados_tamanho_check;

do $$
begin
  if not exists (
    select 1
      from pg_constraint
     where conrelid = 'public.progresso'::regclass
       and conname = 'progresso_dados_objeto_check'
  ) then
    alter table public.progresso
      add constraint progresso_dados_objeto_check
      check (jsonb_typeof(dados) = 'object') not valid;
  end if;

  begin
    alter table public.progresso
      validate constraint progresso_dados_objeto_check;
  exception
    when others then
      raise notice 'progresso_dados_objeto_check criada mas nao validada agora (%). Ela ja vale para escritas novas; investigue e valide na mao (ver secao 2).', sqlerrm;
  end;
end;
$$;

do $$
begin
  if not exists (
    select 1
      from pg_constraint
     where conrelid = 'public.progresso'::regclass
       and conname = 'progresso_dados_tamanho_texto_check'
  ) then
    alter table public.progresso
      add constraint progresso_dados_tamanho_texto_check
      check (octet_length(dados::text) <= 65536) not valid;
  end if;

  begin
    alter table public.progresso
      validate constraint progresso_dados_tamanho_texto_check;
  exception
    when others then
      raise notice 'progresso_dados_tamanho_texto_check criada mas nao validada agora (%). Ela ja vale para escritas novas; investigue e valide na mao (ver secao 2).', sqlerrm;
  end;
end;
$$;


-- -----------------------------------------------------------------------------
-- 3. Carimbo de data/hora no servidor
--
-- O carimbo e 100% do servidor: o trigger sobrescreve com now() qualquer valor
-- que chegue no insert/update, entao o campo nao pode ser forjado pelo cliente
-- (relogio errado, payload adulterado, etc). Hoje o app ainda inclui
-- atualizado_em no upsert (js/nuvem.js), mas o valor enviado e simplesmente
-- descartado aqui - e o dia em que o cliente parar de envia-lo, nada muda.
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
-- uma licao naquele dia, e nada mais. A LINHA gravada nao carrega identificador
-- nenhum: nao ha user_id, nao ha sessao, nao ha cookie, e o app nao grava IP
-- junto do evento. Honestidade completa: como em qualquer servico web, o
-- servidor de borda do Supabase ve o IP da requisicao nos logs de acesso DELE -
-- isso fica na infraestrutura do Supabase e nao entra nesta tabela. O objetivo
-- e saber se o app esta sendo usado, nao quem usa.
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

-- Indice para a retencao e para as consultas do dono: a funcao da secao 11
-- filtra e agrupa por dia, e as contagens no painel agrupam por dia/evento.
-- Com a retencao ligada a tabela fica pequena, mas o indice garante que essas
-- consultas continuem baratas mesmo se o cron ficar dias sem rodar e o cru
-- acumular.
create index if not exists eventos_dia_evento on public.eventos (dia, evento);

alter table public.eventos enable row level security;

-- O "to anon, authenticated" e explicito de proposito: sem ele a policy vale
-- para PUBLIC, ou seja, para qualquer papel presente ou futuro. Com a clausula,
-- fica documentado (e imposto) exatamente quem pode registrar evento.
drop policy if exists "qualquer um registra evento" on public.eventos;
create policy "qualquer um registra evento" on public.eventos
  for insert
  to anon, authenticated
  with check (
    dia between (current_date - 1) and (current_date + 1)
  );

grant insert on table public.eventos to anon, authenticated;
revoke select, update, delete on table public.eventos from anon, authenticated;

comment on table public.eventos is 'Contagem anonima de uso: a linha nao guarda user_id, IP nem cookie. Insert-only para clientes; retencao na secao 11.';


-- -----------------------------------------------------------------------------
-- 11. Retencao das metricas: agregar o cru e nao deixar eventos crescer
--
-- A tabela eventos cresce uma linha por evento, e qualquer um com a anon key
-- (que e publica) pode inserir - sem retencao, e o caminho mais curto para
-- encher os 500 MB do plano free. Como o que interessa e "quantos por dia", as
-- linhas cruas com mais de 2 dias viram somas em eventos_dia (uma linha por
-- evento+dia) e sao apagadas. A carencia de 2 dias nao e chute: a policy de
-- insert so aceita dia entre ontem e amanha (fusos), entao nenhum cliente
-- consegue mais inserir num dia que ja passou da carencia - a soma fecha e nao
-- ha corrida entre o agregado e o delete.
--
-- eventos_dia nao tem policy NENHUMA: com RLS ligada e sem policy, anon e
-- authenticated nao leem nem escrevem nada, mesmo que algum grant em massa
-- volte (mesmo racional da secao 8 - e o revoke abaixo e necessario de
-- verdade, porque o Supabase concede privilegios por default privileges a toda
-- tabela nova do schema public). E uma tabela so do dono, lida pelo painel.
-- -----------------------------------------------------------------------------
create table if not exists public.eventos_dia (
  evento text not null,
  dia date not null,
  total bigint not null default 0,
  primary key (evento, dia)
);

comment on table public.eventos_dia is 'Somas diarias dos eventos ja agregados pela retencao. So o dono le (painel); nenhum acesso via anon key.';

alter table public.eventos_dia enable row level security;

revoke all on table public.eventos_dia from anon, authenticated;

-- Security definer + search_path vazio pelos mesmos motivos da secao 7: a
-- funcao mexe em tabelas que o chamador pode nao enxergar e, sem search_path
-- fixo, funcao security definer pode ser sequestrada por objeto homonimo.
-- O advisory lock na primeira linha impede que duas execucoes simultaneas
-- (cron + rodada manual, por exemplo) somem as mesmas linhas duas vezes: a
-- segunda execucao espera a primeira acabar e entao nao encontra mais nada.
create or replace function public.agregar_eventos()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform pg_advisory_xact_lock(hashtext('public.agregar_eventos'));

  insert into public.eventos_dia (evento, dia, total)
  select e.evento, e.dia, count(*)
    from public.eventos as e
   where e.dia < current_date - 2
   group by e.evento, e.dia
  on conflict (evento, dia)
    do update set total = public.eventos_dia.total + excluded.total;

  delete from public.eventos
   where dia < current_date - 2;
end;
$$;

comment on function public.agregar_eventos() is 'Retencao: soma em eventos_dia os eventos crus com mais de 2 dias e apaga o cru. Insert e delete rodam na mesma transacao: ou a soma e a limpeza acontecem juntas, ou nada acontece.';

-- Funcao nova nasce com execute liberado para PUBLIC (mesmo aviso da secao 7).
-- Esta e de manutencao: nem anon nem authenticated tem por que chama-la - o
-- cron abaixo roda como o dono do job. Se um dia o keep-alive do GitHub
-- Actions virar o "cron dos pobres" para dispara-la (e seguro: ela nao devolve
-- dado nenhum e repetir a chamada nao apaga nada alem do planejado), basta um
-- grant execute on function public.agregar_eventos() to anon.
revoke all on function public.agregar_eventos() from public;
revoke all on function public.agregar_eventos() from anon;
revoke all on function public.agregar_eventos() from authenticated;

-- Agendamento: todo dia as 03:17 UTC (horario "torto" de proposito, para nao
-- disputar recursos com a multidao de jobs agendados em horario cheio). Tudo
-- num bloco unico com exception handler porque pg_cron e uma extensao que pode
-- nao existir ou nao estar liberada no projeto, e este script NAO pode falhar
-- por causa disso. O "if not exists" em cron.job evita agendar o mesmo job em
-- duplicata a cada rodada do script.
do $$
begin
  create extension if not exists pg_cron;

  if not exists (
    select 1 from cron.job where jobname = 'agregar-eventos'
  ) then
    perform cron.schedule('agregar-eventos', '17 3 * * *',
                          'select public.agregar_eventos()');
  end if;
exception
  when others then
    raise notice 'pg_cron indisponivel, agendamento pulado (%). A retencao continua existindo: rode "select public.agregar_eventos();" no SQL Editor de tempos em tempos, ou faca o keep-alive chamar a funcao (ver o comentario sobre grants logo acima).', sqlerrm;
end;
$$;


-- -----------------------------------------------------------------------------
-- 12. RPC ping para o keep-alive
--
-- O plano free pausa projetos sem atividade, e o que conta e atividade no
-- BANCO. O keep-alive (.github/workflows/keep-alive.yml) consulta o endpoint
-- /auth/v1/settings, que e servido pelo GoTrue (o servico de auth) e pode nem
-- encostar no Postgres - ou seja, pode nao contar como atividade. Esta funcao
-- da ao keep-alive um alvo que comprovadamente executa SQL: um POST em
-- /rest/v1/rpc/ping (so com o header apikey da anon key e corpo {}) roda
-- "select now()" dentro do banco.
--
-- "stable" porque now() e constante dentro da transacao; sem security definer
-- porque nao ha privilegio nenhum a elevar - a funcao nao le nem escreve nada.
-- -----------------------------------------------------------------------------
create or replace function public.ping()
returns timestamptz
language sql
stable
as $$ select now() $$;

comment on function public.ping() is 'Keep-alive: devolve now() para gerar atividade real no Postgres via POST /rest/v1/rpc/ping.';

-- Mesmo racional de grants da secao 7, com uma diferenca: aqui o anon PRECISA
-- poder chamar, porque o keep-alive so tem a anon key. Nao ha o que vazar - a
-- resposta e a hora do servidor, que qualquer requisicao HTTP ja recebe no
-- header Date.
revoke all on function public.ping() from public;
grant execute on function public.ping() to anon, authenticated;


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
--   b) Leaked password protection (HaveIBeenPwned) - EXIGE PLANO PRO
--      Authentication -> Sign In / Providers -> Email ->
--      "Prevent use of leaked passwords"
--      ATENCAO: nao e so ligar o botao. O painel marca este item como
--      "Only available on Pro plan and above" - no plano free ele fica
--      desabilitado e nao ha como ativar. Verificado em ago/2026.
--      Se o projeto estiver no Pro, ligue: o Supabase consulta o HaveIBeenPwned
--      por k-anonymity (so um prefixo do hash sai da maquina, a senha em si
--      nunca trafega) e recusa cadastro/troca com senha ja vazada.
--      No plano free, o substituto gratuito e o item (b2) abaixo. Para um app
--      de estudo, cujo dado protegido e o progresso de licoes, assinar o Pro so
--      por causa disto e desproporcional.
--
--   b2) Password requirements (substituto gratuito do item b)
--      Authentication -> Sign In / Providers -> Email -> "Password requirements"
--      Disponivel no plano free. Exigir letras minusculas, maiusculas e digitos
--      derruba a maior parte das senhas de dicionario, que sao o alvo real do
--      credential stuffing. Nao substitui o HaveIBeenPwned (nao pega
--      "Senha@123", que e forte na forma e vazada na pratica), mas eleva o piso
--      sem custo.
--      Se ativar: o servidor passa a devolver "Password should contain at least
--      one character of each: ..." e quem traduz isso para pt-BR e o
--      PADROES_ERROS de js/nuvem.js, que le os conjuntos exigidos da propria
--      resposta. Nao ha nada a mudar no app.
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
