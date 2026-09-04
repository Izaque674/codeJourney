"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tentativaController_1 = require("../controllers/tentativaController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.autenticarToken, tentativaController_1.tentar);
router.get('/', authMiddleware_1.autenticarToken, tentativaController_1.listar);
exports.default = router;
//# sourceMappingURL=tentativaRoutes.js.map