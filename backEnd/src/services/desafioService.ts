
import { prisma } from "../prisma"


export const listarDesafios =  async (usuarioId: number) =>{

    const usuario = await prisma.usuario.findUnique({
        where :{id : usuarioId}
    });

    if (!usuario?.nivel) {
        return []
    }

    const desafios = await prisma.desafio.findMany({
        where: { dificuldade: usuario.nivel }
    })
    return desafios
}





    

