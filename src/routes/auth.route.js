import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js';
import { loginUser, reNewToken } from '../controllers/auth.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import withoutRole from '../middlewares/without-role.middleware.js';

const router = Router ();

//Definir las rutas para la autenticación 
router.post('/login', loginUser);
router.post('/register',withoutRole, registerUser);
//router.get('/renew-token');

router.get( 
    '/renew-token', 
    [ authenticationUser, authorizationUser ], 
    reNewToken 
);

export default router