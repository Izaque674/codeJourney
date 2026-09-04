"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const desafioRoutes_1 = __importDefault(require("./routes/desafioRoutes"));
const tentativaRoutes_1 = __importDefault(require("./routes/tentativaRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use('/usuarios', usuarioRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/desafio', desafioRoutes_1.default);
app.use('/tentativa', tentativaRoutes_1.default);
const port = 3000;
app.listen(port, () => {
    console.log('Servidor rodando na porta 3000');
});
//# sourceMappingURL=server.js.map