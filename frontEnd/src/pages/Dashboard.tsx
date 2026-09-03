import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [desafios, setDesafios] = useState<any[]>([])
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || '{}'))
  const [novoNivel, setNovoNivel] = useState(user.nivel || 'iniciante')
  const [alterandoNivel, setAlterandoNivel] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://localhost:3000/desafio', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDesafios(data))
  }, [refresh])

  const handleAtualizarNivel = async () => {
    setAlterandoNivel(true)
    setMensagem(null)
    try {
      const res = await fetch('http://localhost:3000/usuarios/nivel', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ novoNivel })
      })
      const data = await res.json()
      const userAtualizado = { ...user, nivel: data.nivel }
      localStorage.setItem('user', JSON.stringify(userAtualizado))
      setUser(userAtualizado)
      setRefresh(r => r + 1)
      setMensagem('Nível atualizado com sucesso!')
    } catch {
      setMensagem('Erro ao atualizar nível.')
    } finally {
      setAlterandoNivel(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white mb-3">
            {user.nome?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-white font-semibold">{user.nome}</h2>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium capitalize ${
            user.nivel === 'iniciante' ? 'bg-green-500/20 text-green-400' :
            user.nivel === 'intermediario' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {user.nivel || 'iniciante'}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Alterar nível</p>
          <select
            value={novoNivel}
            onChange={e => setNovoNivel(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
          <button
            onClick={handleAtualizarNivel}
            disabled={alterandoNivel || novoNivel === user.nivel}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm rounded-xl transition"
          >
            {alterandoNivel ? 'Salvando...' : 'Confirmar'}
          </button>
          {mensagem && (
            <p className="text-xs text-center mt-2 text-green-400">{mensagem}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{desafios.length}</p>
            <p className="text-slate-400 text-xs mt-1">Desafios</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-slate-400 text-xs mt-1">Resolvidos</p>
          </div>
        </div>

        <button
          onClick={() => { localStorage.clear(); navigate('/') }}
          className="mt-auto text-slate-400 hover:text-white text-sm transition"
        >
          Sair
        </button>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Desafios</h1>
        <p className="text-slate-400 text-sm mb-6">Nível atual: <span className="capitalize text-white">{user.nivel}</span></p>

        <div className="grid gap-3">
          {desafios.map((desafio, index) => (
            <div
              key={desafio.id}
              onClick={() => navigate(`/desafio/${desafio.id}`)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 p-5 rounded-xl cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-xs mb-1 block">#{index + 1}</span>
                  <h2 className="text-white font-medium group-hover:text-blue-400 transition">{desafio.titulo}</h2>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-1">{desafio.descricao}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ml-4 ${
                  desafio.dificuldade === 'iniciante' ? 'bg-green-500/20 text-green-400' :
                  desafio.dificuldade === 'intermediario' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {desafio.dificuldade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}