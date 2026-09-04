"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listar = exports.tentar = void 0;
const tentativaService_1 = require("../services/tentativaService");
const tentar = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { desafioId, codigoEnviado } = req.body;
    if (!usuarioId || !desafioId || !codigoEnviado) {
        return res.status(400).json({ erro: 'Usuario indisponivel ou Desafio indisponivel' });
    }
    try {
        const tentativa = await (0, tentativaService_1.submeterCodigo)(usuarioId, desafioId, codigoEnviado);
        res.status(200).json(tentativa);
    }
    catch (error) {
        console.error('Erro ao criar usuario:', error);
        res.status(500).json({ erro: 'erro interno' });
    }
};
exports.tentar = tentar;
const listar = async (req, res) => {
    const usuarioId = req.usuarioId;
    if (!usuarioId) {
        return res.status(400).json({ erro: 'historico nao disponivel' });
    }
    try {
        const historico = await (0, tentativaService_1.listarTentativas)(usuarioId);
        res.status(200).json(historico);
    }
    catch (error) {
        console.error('Erro ao buscar tentartivas:', error);
        res.status(500).json({ erro: 'erro interno' });
    }
};
exports.listar = listar;
//# sourceMappingURL=tentativaController.js.map