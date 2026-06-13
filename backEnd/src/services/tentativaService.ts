import { prisma } from "../prisma"
import vm from 'vm'

export const  submeterCodigo =async(usuarioId: number, desafioId:number , codigoEnviado: string)=>
    {
        const desafio = await prisma.desafio.findUnique({
        where :{id : desafioId},
        include :{casoteste: true}

    });
    if (!desafio) {
        throw new Error('Desafio não encontrado')
    }

    const resultados = desafio.casoteste.map(caso => {
    const codigoCompleto = `${codigoEnviado}\n${caso.input}`
    const saida = vm.runInNewContext(codigoCompleto, {}, { timeout: 3000 })
  return String(saida) === caso.esperado
})

const acertou = resultados.every(r => r === true)

const tentativa = await prisma.tentativa.create({
  data: {
    usuarioId: usuarioId,
    desafioId: desafioId,
    quantidadeErros: acertou ? 0 : 1
  }
})

return { acertou, tentativa }
    
}
export const listarTentativas = async (usuarioId : number)=>{
    const historico = await prisma.tentativa.findMany({
        where: {usuarioId : usuarioId}
    })

return historico
}