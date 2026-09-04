"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarTentativas = exports.submeterCodigo = void 0;
const prisma_1 = require("../prisma");
const vm_1 = __importDefault(require("vm"));
const submeterCodigo = async (usuarioId, desafioId, codigoEnviado) => {
    const desafio = await prisma_1.prisma.desafio.findUnique({
        where: { id: desafioId },
        include: { casoteste: true }
    });
    if (!desafio) {
        throw new Error('Desafio não encontrado');
    }
    const resultados = desafio.casoteste.map(caso => {
        const codigoCompleto = `${codigoEnviado}\n${caso.input}`;
        const saida = vm_1.default.runInNewContext(codigoCompleto, {}, { timeout: 3000 });
        return String(saida) === caso.esperado;
    });
    const acertou = resultados.every(r => r === true);
    const tentativa = await prisma_1.prisma.tentativa.create({
        data: {
            usuarioId: usuarioId,
            desafioId: desafioId,
            quantidadeErros: acertou ? 0 : 1
        }
    });
    return { acertou, tentativa };
};
exports.submeterCodigo = submeterCodigo;
const listarTentativas = async (usuarioId) => {
    const historico = await prisma_1.prisma.tentativa.findMany({
        where: { usuarioId: usuarioId }
    });
    return historico;
};
exports.listarTentativas = listarTentativas;
//# sourceMappingURL=tentativaService.js.map