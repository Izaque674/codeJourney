import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface tokenPayload{
    id: number;
    iat: number;
    exp : number;
}

export const autenticarToken = (req:Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({erro: ' Acesso negado, sem token'})
    }

    const parts = authHeader.split(' ');
    if(parts.length !== 2 || parts[0] !== 'Bearer'){
        return res.status(401).json({erro: 'token malformatado'})
    }

    const token = parts[1]!;
    const segredo = (process.env.JWT_SECRET ||'chave_padrao_super_secreta') as string;

    try{
        const decoded = jwt.verify(token, segredo) as unknown as tokenPayload;
        req.usuarioId = decoded.id;
        return next();

    }catch(error){
        return res.status(403).json({erro: ' token invalido ou expirado'})
    }

};









