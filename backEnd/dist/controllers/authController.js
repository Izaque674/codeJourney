"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const authService_1 = require("../services/authService");
const login = async (req, res) => {
    const { email, senha, } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email ou Senha incorretos' });
    }
    try {
        const usuario = await (0, authService_1.loginUsuario)(email, senha);
        if (!usuario) {
            return res.status(401).json({ erro: 'nao autorizado' });
        }
        res.status(200).json(usuario);
    }
    catch (error) {
        console.error('Erro ao logar:', error);
        res.status(500).json({ erro: 'erro interno' });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map