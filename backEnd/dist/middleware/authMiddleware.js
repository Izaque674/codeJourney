"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ erro: ' Acesso negado, sem token' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ erro: 'token malformatado' });
    }
    const token = parts[1];
    const segredo = (process.env.JWT_SECRET || 'chave_padrao_super_secreta');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, segredo);
        req.usuarioId = decoded.id;
        return next();
    }
    catch (error) {
        return res.status(403).json({ erro: ' token invalido ou expirado' });
    }
};
exports.autenticarToken = autenticarToken;
//# sourceMappingURL=authMiddleware.js.map