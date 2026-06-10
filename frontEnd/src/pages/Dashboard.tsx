import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [desafios, setDesafios] = useState<any[]>([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    fetch('http://localhost:3000/desafio', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDesafios(data))
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col p-6">
        {/* Perfil */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white mb-3">
            {user.nome?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-white font-semibold">{user.nome}</h2>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <span className="mt-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium capitalize">
            {user.nivel || 'iniciante'}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-slate-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{desafios.length}</p>
            <p className="text-slate-400 text-xs mt-1">Desafios</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-slate-400 text-xs mt-1">Resolvidos</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => { localStorage.clear(); navigate('/') }}
          className="mt-auto text-slate-400 hover:text-white text-sm transition"
        >
          Sair
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Desafios</h1>
        <p className="text-slate-400 text-sm mb-6">Selecione um desafio para começar</p>

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