import express from 'express'
import { prisma } from "./prisma"
import usuarioRoutes from "./routes/usuarioRoutes"
import authRoutes from "./routes/authRoutes"


const app = express();
app.use(express.json())

app.use('/usuarios', usuarioRoutes)
app.use('/auth',authRoutes)


const port = 3000;
app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});