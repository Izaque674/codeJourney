import { Request, Response } from 'express';
import { loginUsuario } from '../services/authService';

export const login = async (req: Request, res: Response) =>{
    const { email, senha, } = req.body;
        if (  !email || !senha ){
        return res.status(400).json({ erro: 'Email ou Senha incorretos'});
    }try{
        const usuario = await loginUsuario(email, senha);
        if(!usuario){
            return res.status(401).json({erro: 'nao autorizado'})
        }
        res.status(200).json(usuario)

    }catch(error){      
        console.error('Erro ao logar:', error);
        res.status(500).json({erro:'erro interno'});

    }
    

}

