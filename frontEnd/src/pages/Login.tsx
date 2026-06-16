import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      setCarregando(false);
      return;
    }

    try {
      const dados = await login(email, senha);
      localStorage.setItem('token', dados.token);
      localStorage.setItem('user', JSON.stringify(dados.usuario));
      navigate('/dashboard');
    } catch (error) {
      setErro('Email ou senha inválidos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700/50">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Painel de login
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Faça login para gerenciar seus projetos
          </p>
        </div>

        {/* Mensagem de Erro Dinâmica */}
        {erro && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center animate-fade-in">
            {erro}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campo E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@exemplo.com"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-slate-300 mb-2">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Botão de Enviar */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 text-white font-medium rounded-xl shadow-lg shadow-blue-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {carregando ? (
              <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-4">
  Não tem conta?{' '}
  <span onClick={() => navigate('/cadastro')} className="text-blue-400 cursor-pointer hover:underline">
    Criar conta
  </span>
</p>
      </div>
    </div>
  );
}
