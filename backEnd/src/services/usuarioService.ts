import bcrypt from 'bcrypt'
import { prisma } from "../prisma"

export const cadastrarUsuario = async (nome: string, email:string, senha:string, nivel: string) => {
    const senhaHash = await bcrypt.hash(senha, 10)
    
    const usuario = await prisma.usuario.create({
        data: {
            nome: nome,
            email: email,
            senha: senhaHash,
            nivel: nivel,
        }
    })

     
  return usuario;
};

export const atualizarNivel = async (novoNivel: string, usuarioId : number) =>{

    const usuario = await prisma.usuario.update({
        where : {id: usuarioId},
        data: {nivel: novoNivel}

    })

    return usuario
}


