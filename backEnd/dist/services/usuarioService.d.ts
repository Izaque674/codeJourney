export declare const cadastrarUsuario: (nome: string, email: string, senha: string, nivel: string) => Promise<{
    nome: string;
    criadoEm: Date;
    email: string;
    senha: string;
    nivel: string;
    id: number;
}>;
export declare const atualizarNivel: (novoNivel: string, usuarioId: number) => Promise<{
    nome: string;
    criadoEm: Date;
    email: string;
    senha: string;
    nivel: string;
    id: number;
}>;
//# sourceMappingURL=usuarioService.d.ts.map