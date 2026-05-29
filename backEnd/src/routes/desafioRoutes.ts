import { Router} from 'express'
import { listar } from '../controllers/desafioController'
import {autenticarToken} from '../middleware/authMiddleware'

const router = Router()

router.get('/', autenticarToken, listar);


export default router