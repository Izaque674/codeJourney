export declare const listarDesafios: (usuarioId: number) => Promise<{
    id: number;
    titulo: string;
    descricao: string;
    dificuldade: string;
    outputEsperado: string;
    exemplo: string;
}[]>;
export declare const buscarDesafio: (id: number) => Promise<{
    id: number;
    titulo: string;
    descricao: string;
    dificuldade: string;
    outputEsperado: string;
    exemplo: string;
}>;
//# sourceMappingURL=desafioService.d.ts.map