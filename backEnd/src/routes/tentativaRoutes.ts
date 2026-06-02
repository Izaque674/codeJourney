import { Router} from 'express'
import { tentar } from '../controllers/tentativaController'
import {autenticarToken} from '../middleware/authMiddleware'

const router = Router()

router.post('/', autenticarToken, tentar);

export default router

