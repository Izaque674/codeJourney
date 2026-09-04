"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarNivel = exports.cadastrar = void 0;
const usuarioService_1 = require("../services/usuarioService");
const usuarioService_2 = require("../services/usuarioService");
const cadastrar = async (req, res) => {
    const { nome, email, senha, nivel } = req.body;
    if (!nome || !email || !senha || !nivel) {
        return res.status(400).json({ erro: 'dados incompletos' });
    }
    try {
        const usuario = await (0, usuarioService_1.cadastrarUsuario)(nome, email, senha, nivel);
        const { senha: _, ...usuarioSemSenha } = usuario;
        res.status(201).json(usuarioSemSenha);
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ erro: 'Email já cadastrado' });
        }
        console.error('Erro ao criar usuario:', error);
        res.status(500).json({ erro: 'erro interno' });
    }
};
exports.cadastrar = cadastrar;
const atualizarNivel = async (req, res) => {
    const { novoNivel } = req.body;
    const usuarioId = req.usuarioId;
    if (!novoNivel || !usuarioId) {
        return res.status(400).json({ erro: 'dados incompletos' });
    }
    try {
        const usuario = await (0, usuarioService_2.atualizarNivel)(novoNivel, usuarioId);
        const { senha: _, ...usuarioSemSenha } = usuario;
        res.status(200).json(usuarioSemSenha);
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ erro: 'Não foi possivel atualizar nivel' });
        }
        console.error('Erro ao atualuzar nivel:', error);
        res.status(500).json({ erro: 'erro interno' });
    }
};
exports.atualizarNivel = atualizarNivel;
//# sourceMappingURL=usuarioController.js.map