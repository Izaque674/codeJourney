"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarDesafio = exports.listarDesafios = void 0;
const prisma_1 = require("../prisma");
const listarDesafios = async (usuarioId) => {
    const usuario = await prisma_1.prisma.usuario.findUnique({
        where: { id: usuarioId }
    });
    if (!usuario?.nivel) {
        return [];
    }
    const desafios = await prisma_1.prisma.desafio.findMany({
        where: { dificuldade: usuario.nivel }
    });
    return desafios;
};
exports.listarDesafios = listarDesafios;
const buscarDesafio = async (id) => {
    const desafio = await prisma_1.prisma.desafio.findUnique({
        where: { id: id }
    });
    if (!desafio) {
        throw new Error('Desafio não encontrado');
    }
    return desafio;
};
exports.buscarDesafio = buscarDesafio;
//# sourceMappingURL=desafioService.js.map