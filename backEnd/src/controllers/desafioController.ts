import { Request, Response } from 'express';
import { listarDesafios} from '../services/desafioService';

export const listar = async (req: Request, res: Response) =>{
   const  usuarioId = req.usuarioId
   if(!usuarioId){
    return res.status(400).json({erro: 'Usuario indisponivel'})
   }
   try{
    const desafios = await listarDesafios(usuarioId);
    res.status(200).json(desafios);
   }catch(error){
        console.error('Erro ao listar desafios', error);
        res.status(500).json({erro:'erro interno'});
   }


}

