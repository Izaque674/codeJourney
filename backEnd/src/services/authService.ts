import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { prisma } from "../prisma"


//tipagem retorno login
interface RespostaLogin {
    token: string;
    usuario: {
        id : number;
        nome : string;
        email : string;
    }
}
//
const gerarTokenAcesso = (usuarioId: number): string =>{
    const segredo = process.env.JWT_SECRET || 'chave_padrao_super_secreta';
    return jwt.sign ({id: usuarioId}, segredo,{expiresIn: '1d'});
};

//função principal do login
export const loginUsuario = async (emailInput:string, senhaInput:string): Promise<RespostaLogin | null> => {
    const usuario = await prisma.usuario.findUnique({
        where: { email: emailInput }
    });

    if (!usuario) {
        return null;
    }

    const senhaValida = await bcrypt.compare(senhaInput, usuario.senha);

    if (!senhaValida) {
        return null;
    }

    const tokenGerado = gerarTokenAcesso(usuario.id);
    return {
        token: tokenGerado,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    };
};


