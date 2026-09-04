"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsuario = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../prisma");
//
const gerarTokenAcesso = (usuarioId) => {
    const segredo = process.env.JWT_SECRET || 'chave_padrao_super_secreta';
    return jsonwebtoken_1.default.sign({ id: usuarioId }, segredo, { expiresIn: '1d' });
};
//função principal do login
const loginUsuario = async (emailInput, senhaInput) => {
    const usuario = await prisma_1.prisma.usuario.findUnique({
        where: { email: emailInput }
    });
    if (!usuario) {
        return null;
    }
    const senhaValida = await bcrypt_1.default.compare(senhaInput, usuario.senha);
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
exports.loginUsuario = loginUsuario;
//# sourceMappingURL=authService.js.map