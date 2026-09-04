"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', usuarioController_1.cadastrar);
router.patch('/nivel', authMiddleware_1.autenticarToken, usuarioController_1.atualizarNivel);
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map