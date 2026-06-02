import { prisma } from "../prisma"
import vm from 'vm'

export const  submeterCodigo =async(usuarioId: number, desafioId:number , codigoEnviado: string)=>
    {
        const desafio = await prisma.desafio.findUnique({
        where :{id : desafioId}

    });
    if (!desafio) {
        throw new Error('Desafio não encontrado')
    }
    const resultado = vm.runInNewContext(codigoEnviado,{},{timeout:3000})
    const outputGerado = String(resultado);

    const acertou = outputGerado === desafio.outputEsperado

    const tentativa = await prisma.tentativa.create({
        data:{
            usuarioId: usuarioId,
            desafioId: desafioId,
           quantidadeErros: acertou ? 0 : 1
        }
    }

    )

    return { acertou, tentativa }


    



    
    
}