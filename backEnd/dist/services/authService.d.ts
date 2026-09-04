interface RespostaLogin {
    token: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
    };
}
export declare const loginUsuario: (emailInput: string, senhaInput: string) => Promise<RespostaLogin | null>;
export {};
//# sourceMappingURL=authService.d.ts.map