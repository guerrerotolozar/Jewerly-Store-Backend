import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js';
import { loginUser, reNewToken } from '../controllers/auth.controller.js';
// import authenticationUser from '../middlewares/authetication.middleware.js';
// import authorizationUser from '../middlewares/authorization.middleware.js';

const router = Router ();

//Definir las rutas para la autenticacion 
router.post('/login', loginUser);
router.post('/register', registerUser);
//router.get('/renew-token');

router.get( 
    '/renew-token', 
    // [ authenticationUser, authorizationUser ], 
    reNewToken 
);

export default router