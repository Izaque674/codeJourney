import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'

export default function Desafio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [desafio, setDesafio] = useState<any>(null)
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState<any>(null)
  const [carregando, setCarregando] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch(`http://localhost:3000/desafio/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDesafio(data))
  }, [id])

  const submeter = async () => {
    setCarregando(true)
    setResultado(null)
    const res = await fetch('http://localhost:3000/tentativa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ desafioId: Number(id), codigoEnviado: codigo.trim() })
    })
    const data = await res.json()
    setResultado(data)
    setCarregando(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-white transition text-sm">
          ← Voltar
        </button>
        <span className="text-slate-400 text-sm capitalize">{desafio?.dificuldade}</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Lado esquerdo — descrição */}
        <div className="w-2/5 p-6 border-r border-slate-700 overflow-y-auto">
          <h1 className="text-xl font-bold text-white mb-3">{desafio?.titulo}</h1>
          <p className="text-slate-400 text-sm leading-relaxed">{desafio?.descricao}</p>

          {resultado && (
            <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${resultado.acertou ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {resultado.acertou ? '✅ Resposta correta!' : '❌ Incorreto, tente novamente.'}
            </div>
          )}
        </div>

        {/* Lado direito — editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={codigo}
              onChange={(value) => setCodigo(value || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 }
              }}
            />
          </div>
          <div className="bg-slate-800 border-t border-slate-700 px-6 py-3 flex justify-end">
            <button
              onClick={submeter}
              disabled={carregando}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded-xl text-white font-medium transition text-sm"
            >
              {carregando ? 'Verificando...' : 'Submeter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}