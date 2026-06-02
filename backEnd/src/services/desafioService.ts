
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

export const buscarDesafio = async (id : number) =>{
    const desafio = await prisma.desafio.findUnique ({
        where :{id : id}

    })
        if (!desafio) {
        throw new Error('Desafio não encontrado')
    }
    return desafio
}





    

