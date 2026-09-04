"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const desafioController_1 = require("../controllers/desafioController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.autenticarToken, desafioController_1.listar);
router.get('/:id', authMiddleware_1.autenticarToken, desafioController_1.buscar);
exports.default = router;
//# sourceMappingURL=desafioRoutes.js.map