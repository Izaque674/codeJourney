import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'
import Desafio from './pages/Desafio'
import RotaProtegida from './components/RotaProtegida'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
        <Route path="/desafio/:id" element={<RotaProtegida><Desafio /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App