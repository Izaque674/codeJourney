"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscar = exports.listar = void 0;
const desafioService_1 = require("../services/desafioService");
const listar = async (req, res) => {
    const usuarioId = req.usuarioId;
    if (!usuarioId) {
        return res.status(400).json({ erro: 'Usuario indisponivel' });
    }
    try {
        const desafios = await (0, desafioService_1.listarDesafios)(usuarioId);
        res.status(200).json(desafios);
    }
    catch (error) {
        console.error('Erro ao listar desafios', error);
        res.status(500).json({ erro: 'erro interno' });
    }
};
exports.listar = listar;
const buscar = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ erro: ' Desafio indisponivel' });
    }
    const idNumero = Number(id);
    try {
        const desafio = await (0, desafioService_1.buscarDesafio)(idNumero);
        res.status(200).json(desafio);
    }
    catch (error) {
        console.error('erro ao buscar desafio', error);
        res.status(500).json({ erro: 'erro interno' });
    }
};
exports.buscar = buscar;
//# sourceMappingURL=desafioController.js.map