import express from 'express'
import { prisma } from "./prisma"
import usuarioRoutes from "./routes/usuarioRoutes"
import authRoutes from "./routes/authRoutes"
import desafioRoutes from "./routes/desafioRoutes"
import tentativaRoutes from "./routes/tentativaRoutes"
import cors from 'cors'



const app = express();
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use('/usuarios', usuarioRoutes)
app.use('/auth',authRoutes)
app.use('/desafio', desafioRoutes)
app.use('/tentativa',tentativaRoutes )


const port = 3000;
app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});