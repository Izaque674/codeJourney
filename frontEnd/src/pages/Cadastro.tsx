import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nivel, setNivel] = useState('iniciante')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    setCarregando(true)

    try {
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, nivel })
      })

      const data = await res.json()

      if (res.status === 409) {
        setErro('Email já cadastrado.')
        return
      }

      if (!res.ok) {
        setErro('Erro ao cadastrar. Tente novamente.')
        return
      }

      navigate('/')
    } catch {
      setErro('Erro interno. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">CodeJourney</h1>
          <p className="text-slate-400 mt-2 text-sm">Crie sua conta e comece a codar</p>
        </div>

        {erro && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleCadastro} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nível</label>
            <select
              value={nivel}
              onChange={e => setNivel(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
          >
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </button>

          <p className="text-center text-slate-400 text-sm">
            Já tem conta?{' '}
            <span onClick={() => navigate('/')} className="text-blue-400 cursor-pointer hover:underline">
              Fazer login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}