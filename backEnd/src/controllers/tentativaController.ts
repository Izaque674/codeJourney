import { Request, Response } from 'express';
import { listarTentativas, submeterCodigo} from '../services/tentativaService';

export const  tentar = async (req: Request, res:Response)=>{
     const  usuarioId = req.usuarioId;
     const {desafioId, codigoEnviado} = req.body;
        if(!usuarioId || !desafioId|| !codigoEnviado){
     return res.status(400).json({erro: 'Usuario indisponivel ou Desafio indisponivel'})

   }try{
    const tentativa = await submeterCodigo(usuarioId, desafioId,codigoEnviado )
    res.status(200).json(tentativa);
    

   }catch(error){      
        console.error('Erro ao criar usuario:', error);
        res.status(500).json({erro:'erro interno'});

    }

}

export const listar = async (req:Request, res:Response) =>{
    const  usuarioId = req.usuarioId;
    if(!usuarioId ){
     return res.status(400).json({erro: 'historico nao disponivel'})
    }

    try {
        const historico = await listarTentativas(usuarioId)
        res.status(200).json(historico);
    } catch (error) {
        console.error('Erro ao buscar tentartivas:', error);
        res.status(500).json({erro:'erro interno'});

    }


}