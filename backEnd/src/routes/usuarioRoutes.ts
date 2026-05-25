import { Router} from 'express'
import { cadastrar } from '../controllers/usuarioController'
const router = Router()

router.post('/', cadastrar);





export default router