import { prisma } from "../prisma"

import { executarCodigo } from './executorService'

export const  submeterCodigo =async(usuarioId: number, desafioId:number , codigoEnviado: string)=>
    {
        const desafio = await prisma.desafio.findUnique({
        where :{id : desafioId},
        include :{casoteste: true}

    });
    if (!desafio) {
        throw new Error('Desafio não encontrado')
    }


    
const resultados = [];

for (const caso of desafio.casoteste) {
  
  const codigoCompleto = `${codigoEnviado}\n${caso.input}`;

  
  const stdout = await executarCodigo(codigoCompleto);

  
  const saidaObtida = stdout.trim();
  const saidaEsperada = caso.esperado.trim();

  
  const passou = saidaObtida === saidaEsperada;

  resultados.push({
    casoTesteId: caso.id,
    passou,
    saidaObtida,
    saidaEsperada,
  });

}


const acertou = resultados.every(r => r.passou === true)

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