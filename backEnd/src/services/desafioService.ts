import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { prisma } from "../prisma"


export const listarDesafios =  async (usuarioId: number) =>{
    const usuario = await prisma.usuario.findUnique({
        where :{id : usuarioId}
    })

    const desafios = await prisma.desafio.findMany({
    where: { dificuldade: usuario?.nivel }
})

return desafios



    

}