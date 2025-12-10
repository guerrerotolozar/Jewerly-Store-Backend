import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js';

const router = Router ();

//Definir las rutas para la autenticacion 
//router.post('/login',);
router.post('/register', registerUser);
//router.get('/renew-token');

export default router
