import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const nuvemConfigurada = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

let cliente = null;

const MAPA_ERROS = [
  ['invalid login credentials', 'E-mail ou senha incorretos 🙈'],
  ['user already registered', 'Esse e-mail já tem conta — tenta entrar!'],
  ['password should be at least', 'A senha precisa ter pelo menos 6 caracteres'],
  ['email not confirmed', 'Confirma teu e-mail primeiro (olha a caixa de entrada) 📬'],
  ['rate limit', 'Calma, gringo! Muitas tentativas — espera um pouco ⏳'],
  ['is invalid', 'E-mail inválido'],
  ['failed to fetch', 'Sem conexão com a nuvem 📡']
];

function traduzirErro(mensagem) {
  const m = (mensagem || '').toLowerCase();
  const achado = MAPA_ERROS.find(([chave]) => m.includes(chave));
  return achado ? achado[1] : 'Deu ruim na nuvem: ' + mensagem;
}

async function obterCliente() {
  if (!nuvemConfigurada) return null;
  if (!cliente) {
    try {
      const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
      cliente = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch {
      throw new Error('Nuvem indisponível no momento 📡');
    }
  }
  return cliente;
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

export async function baixarProgresso() {
  const c = await obterCliente();
  if (!c) return null;
  const { data, error } = await c.from('progresso').select('dados').maybeSingle();
  if (error) throw new Error(traduzirErro(error.message));
  return data?.dados ?? null;
}

export async function enviarProgresso(dados) {
  const c = await obterCliente();
  if (!c) return;
  const { data: { user } } = await c.auth.getUser();
  if (!user) return;
  const { error } = await c.from('progresso').upsert({
    user_id: user.id,
    dados,
    atualizado_em: new Date().toISOString()
  });
  if (error) throw new Error(traduzirErro(error.message));
}
