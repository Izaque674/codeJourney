"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarNivel = exports.cadastrarUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../prisma");
const cadastrarUsuario = async (nome, email, senha, nivel) => {
    const senhaHash = await bcrypt_1.default.hash(senha, 10);
    const usuario = await prisma_1.prisma.usuario.create({
        data: {
            nome: nome,
            email: email,
            senha: senhaHash,
            nivel: nivel,
        }
    });
    return usuario;
};
exports.cadastrarUsuario = cadastrarUsuario;
const atualizarNivel = async (novoNivel, usuarioId) => {
    const usuario = await prisma_1.prisma.usuario.update({
        where: { id: usuarioId },
        data: { nivel: novoNivel }
    });
    return usuario;
};
exports.atualizarNivel = atualizarNivel;
//# sourceMappingURL=usuarioService.js.map