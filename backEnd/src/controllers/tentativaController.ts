import { Request, Response } from 'express';
import { submeterCodigo} from '../services/tentativaService';

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