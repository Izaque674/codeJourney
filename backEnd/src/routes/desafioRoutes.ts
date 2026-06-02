import { Router} from 'express'
import { listar, buscar } from '../controllers/desafioController'

import {autenticarToken} from '../middleware/authMiddleware'

const router = Router()

router.get('/', autenticarToken, listar);
router.get('/:id', autenticarToken, buscar)


export default router