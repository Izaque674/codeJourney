import { Router} from 'express'
import { cadastrar, atualizarNivel } from '../controllers/usuarioController'

import {autenticarToken} from '../middleware/authMiddleware'
const router = Router()

router.post('/', cadastrar);
router.patch('/nivel', autenticarToken, atualizarNivel)


export default router