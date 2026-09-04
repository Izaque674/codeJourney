export declare const submeterCodigo: (usuarioId: number, desafioId: number, codigoEnviado: string) => Promise<{
    acertou: boolean;
    tentativa: {
        id: number;
        desafioId: number;
        quantidadeErros: number;
        usuarioId: number;
    };
}>;
export declare const listarTentativas: (usuarioId: number) => Promise<{
    id: number;
    desafioId: number;
    quantidadeErros: number;
    usuarioId: number;
}[]>;
//# sourceMappingURL=tentativaService.d.ts.map