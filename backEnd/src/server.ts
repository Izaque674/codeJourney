import express from 'express'
import { prisma } from "./prisma"
import usuarioRoutes from "./routes/usuarioRoutes"
import authRoutes from "./routes/authRoutes"
import desafioRoutes from "./routes/desafioRoutes"
import tentativaRoutes from "./routes/tentativaRoutes"
import cors from 'cors'
import Docker from 'dockerode'

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

async function pullImageIfNeeded() {
  return new Promise((resolve, reject) => {
    docker.pull('node:20-alpine', (err: any, stream: any) => {
      if (err) return reject(err)
      docker.modem.followProgress(stream, () => {
        console.log('Imagem node:20-alpine pronta')
        resolve(true)
      })
    })
  })
}

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use('/usuarios', usuarioRoutes)
app.use('/auth', authRoutes)
app.use('/desafio', desafioRoutes)
app.use('/tentativa', tentativaRoutes)

const port = 3000

async function iniciar() {
  await pullImageIfNeeded()
  app.listen(port, () => {
    console.log('Servidor rodando na porta 3000')
  })
}

iniciar()