import { Request, Response } from 'express';
import { cadastrarUsuario } from '../services/usuarioService'
export const cadastrar = async (req: Request, res: Response) =>{
    const {nome, email, senha, nivel} = req.body;
        if (!nome || !email || !senha || !nivel){
        return res.status(400).json({ erro: 'dados incompletos'});
    }
    try{
   const usuario = await cadastrarUsuario(nome, email, senha, nivel)
const { senha: _, ...usuarioSemSenha } = usuario
res.status(201).json(usuarioSemSenha)   
    

    }catch(error){      
        console.error('Erro ao criar entregador:', error);
        res.status(500).json({erro:'erro interno'});

    }
 
}