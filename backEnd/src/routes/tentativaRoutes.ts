import { Router} from 'express'
import { tentar,listar } from '../controllers/tentativaController'
import {autenticarToken} from '../middleware/authMiddleware'

const router = Router()

router.post('/', autenticarToken, tentar);
router.get('/', autenticarToken, listar);

export default router

