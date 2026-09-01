import { Request, Response } from 'express';
import { cadastrarUsuario } from '../services/usuarioService'
import { atualizarNivel as atualizarNivelService } from '../services/usuarioService'

export const cadastrar = async (req: Request, res: Response) =>{
    const {nome, email, senha, nivel} = req.body;
        if (!nome || !email || !senha || !nivel){
        return res.status(400).json({ erro: 'dados incompletos'});
    }
    try{
   const usuario = await cadastrarUsuario(nome, email, senha, nivel)
const { senha: _, ...usuarioSemSenha } = usuario
res.status(201).json(usuarioSemSenha)   
    

    }catch(error: any){
  if(error.code === 'P2002'){
    return res.status(409).json({ erro: 'Email já cadastrado' })
  }
  console.error('Erro ao criar usuario:', error);
  res.status(500).json({ erro: 'erro interno' });
}
 
}

export const atualizarNivel = async (req : Request, res : Response) =>{
  const {novoNivel } = req.body;
  const usuarioId = req.usuarioId

  if(!novoNivel || !usuarioId){
    return res.status(400).json({ erro: 'dados incompletos'});
  }try{
const usuario = await atualizarNivelService(novoNivel, usuarioId!)  
const { senha: _, ...usuarioSemSenha } = usuario  
res.status(200).json(usuarioSemSenha)
    
    
  }catch(error: any){
  if(error.code === 'P2002'){
    return res.status(409).json({ erro: 'Não foi possivel atualizar nivel' })
  }
  console.error('Erro ao atualuzar nivel:', error);
  res.status(500).json({ erro: 'erro interno' });
}


}