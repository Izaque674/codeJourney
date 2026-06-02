import { Request, Response } from 'express';
import { buscarDesafio, listarDesafios} from '../services/desafioService';

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


export const buscar = async (req : Request, res: Response) =>{
   const {id} = req.params;
   if (!id){
      return res.status(400).json({erro: ' Desafio indisponivel'})
   }
   const idNumero = Number(id)

   try{
      const desafio = await buscarDesafio(idNumero)
      res.status(200).json(desafio);
         
      
   }catch(error){
      console.error('erro ao buscar desafio',error)
      res.status(500).json({erro:'erro interno'});
   }

}

