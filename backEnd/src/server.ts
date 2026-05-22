import express from 'express'
import { prisma } from "./prisma"
import usuarioRoutes from "./routes/usuarioRoutes"


const app = express();
app.use(express.json())

app.use('/usuarios', usuarioRoutes)

const port = 3000;
app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});