import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const nuvemConfigurada = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

let cliente = null;

export const SENHA_MINIMA = 8;

const MAPA_ERROS = [
  ['manual linking is disabled', 'Vinculação desativada no Supabase — ative "Manual linking" nas configurações de Auth'],
  ['identity is already linked', 'Essa conta do Google já está vinculada a outro usuário 🙈'],
  ['at least 1 identity', 'Você precisa manter pelo menos uma forma de entrar 🔐'],
  ['provider is not enabled', 'Login com Google não está ativado no Supabase'],
  ['invalid login credentials', 'E-mail ou senha incorretos 🙈'],
  ['user already registered', 'Esse e-mail já tem conta — tenta entrar!'],
  ['email not confirmed', 'Confirma teu e-mail primeiro (olha a caixa de entrada) 📬'],
  ['rate limit', 'Calma, gringo! Muitas tentativas — espera um pouco ⏳'],
  ['you can only request this after', 'Calma, gringo! Espera uns segundos e tenta de novo ⏳'],
  ['is invalid', 'E-mail inválido'],
  ['failed to fetch', 'Sem conexão com a nuvem 📡']
];

const CLASSES_SENHA = [
  [/abcdefghijklmnopqrstuvwxyz/, 'uma letra minúscula'],
  [/ABCDEFGHIJKLMNOPQRSTUVWXYZ/, 'uma letra maiúscula'],
  [/0123456789/, 'um número'],
  [/!@#\$%/, 'um símbolo']
];

function listar(itens) {
  if (itens.length === 1) return itens[0];
  return itens.slice(0, -1).join(', ') + ' e ' + itens[itens.length - 1];
}

const PADROES_ERROS = [
  [
    /password should be at least (\d+) character/i,
    (texto, casou) => `A senha precisa ter pelo menos ${casou[1]} caracteres`
  ],
  [
    /password should contain at least one character of each/i,
    texto => {
      const exigidas = CLASSES_SENHA.filter(([classe]) => classe.test(texto)).map(([, rotulo]) => rotulo);
      if (!exigidas.length) return 'A senha precisa misturar tipos diferentes de caractere 🔐';
      return `A senha precisa ter pelo menos ${listar(exigidas)} 🔐`;
    }
  ],
  [
    /pwned|leaked|data breach/i,
    () => 'Essa senha já apareceu em vazamentos públicos — escolhe outra 🔐'
  ]
];

export function traduzirErro(mensagem) {
  const texto = mensagem || '';
  for (const [padrao, montar] of PADROES_ERROS) {
    const casou = texto.match(padrao);
    if (casou) return montar(texto, casou);
  }
  const m = texto.toLowerCase();
  const achado = MAPA_ERROS.find(([chave]) => m.includes(chave));
  return achado ? achado[1] : 'Deu ruim na nuvem: ' + texto;
}

async function obterCliente() {
  if (!nuvemConfigurada) return null;
  if (!cliente) {
    try {
      const { createClient } = await import('./vendor/supabase.js');
      cliente = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { flowType: 'pkce' } });
    } catch {
      throw new Error('Nuvem indisponível no momento 📡');
    }
  }
  return cliente;
}

let cacheGoogle = null;

export async function googleAtivo() {
  if (!nuvemConfigurada) return false;
  if (cacheGoogle !== null) return cacheGoogle;
  try {
    const controle = new AbortController();
    const timer = setTimeout(() => controle.abort(), 5000);
    const r = await fetch(SUPABASE_URL + '/auth/v1/settings', {
      headers: { apikey: SUPABASE_ANON_KEY },
      signal: controle.signal
    });
    clearTimeout(timer);
    const d = await r.json();
    cacheGoogle = !!d?.external?.google;
    return cacheGoogle;
  } catch {
    return false;
  }
}

function urlRetorno() {
  return location.origin + location.pathname;
}

export async function entrarComGoogle() {
  const c = await obterCliente();
  const { error } = await c.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: urlRetorno() }
  });
  if (error) throw new Error(traduzirErro(error.message));
}

export async function vincularGoogle() {
  const c = await obterCliente();
  const { error } = await c.auth.linkIdentity({
    provider: 'google',
    options: { redirectTo: urlRetorno() }
  });
  if (error) throw new Error(traduzirErro(error.message));
}

export async function desvincularGoogle() {
  const c = await obterCliente();
  const { data, error } = await c.auth.getUserIdentities();
  if (error) throw new Error(traduzirErro(error.message));
  const google = data?.identities?.find(i => i.provider === 'google');
  if (!google) throw new Error('Não há Google vinculado nessa conta');
  const { error: erroUnlink } = await c.auth.unlinkIdentity(google);
  if (erroUnlink) throw new Error(traduzirErro(erroUnlink.message));
}

export async function apagarConta() {
  const c = await obterCliente();
  if (!c) throw new Error('Nuvem não configurada');
  const { error } = await c.rpc('apagar_minha_conta');
  if (error) throw new Error(traduzirErro(error.message));
  try {
    await c.auth.signOut();
  } catch {}
}

export async function provedoresDaConta() {
  const c = await obterCliente();
  if (!c) return [];
  const { data, error } = await c.auth.getUserIdentities();
  if (error) return [];
  return (data?.identities ?? []).map(i => i.provider);
}

export async function sessaoAtual() {
  const c = await obterCliente();
  if (!c) return null;
  const { data } = await c.auth.getSession();
  return data.session ?? null;
}

export async function entrar(email, senha) {
  const c = await obterCliente();
  const { data, error } = await c.auth.signInWithPassword({ email, password: senha });
  if (error) throw new Error(traduzirErro(error.message));
  return data.session;
}

export async function criarConta(email, senha) {
  const c = await obterCliente();
  const { data, error } = await c.auth.signUp({ email, password: senha });
  if (error) throw new Error(traduzirErro(error.message));
  if (!data.session && data.user && (data.user.identities?.length ?? 0) === 0) {
    throw new Error('Esse e-mail já tem conta — tenta entrar!');
  }
  return data.session;
}

export async function sair() {
  const c = await obterCliente();
  if (!c) return;
  const { error } = await c.auth.signOut();
  if (error) {
    try {
      await c.auth.signOut({ scope: 'local' });
    } catch {}
    Object.keys(localStorage)
      .filter(k => k.startsWith('sb-') && k.includes('auth-token'))
      .forEach(k => localStorage.removeItem(k));
  }
}

export async function aoMudarAuth(cb) {
  const c = await obterCliente();
  if (c) c.auth.onAuthStateChange((evento, sessao) => cb(evento, sessao));
}

async function usuarioDaSessao(c) {
  // getSession lê do storage local (e renova sozinho) — getUser ia à rede a
  // cada envio e, offline, virava um falso "sessão expirada".
  const { data } = await c.auth.getSession();
  return data?.session?.user ?? null;
}

export async function baixarProgresso() {
  const c = await obterCliente();
  if (!c) return null;
  const user = await usuarioDaSessao(c);
  if (!user) return null;
  const { data, error } = await c.from('progresso').select('dados').eq('user_id', user.id).maybeSingle();
  if (error) throw new Error(traduzirErro(error.message));
  return data?.dados ?? null;
}

// O check de tamanho/shape do banco nunca vai passar reenviando o mesmo
// payload — o chamador usa essa marca para parar de tentar.
function ehErroPermanente(error) {
  return error?.code === '23514' || /check constraint|progresso_dados/i.test(error?.message ?? '');
}

export async function enviarProgresso(dados) {
  const c = await obterCliente();
  if (!c) throw new Error('Nuvem não configurada');
  const user = await usuarioDaSessao(c);
  if (!user) throw new Error('Sessão expirada — entra de novo pra sincronizar 🔑');
  const { error } = await c.from('progresso').upsert({ user_id: user.id, dados });
  if (error) {
    const erro = new Error(traduzirErro(error.message));
    erro.permanente = ehErroPermanente(error);
    throw erro;
  }
}
