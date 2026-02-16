import { Router } from 'express'

import { deleteUserById, getAllUsers, getUserById, registerUser, updateUserById } from '../controllers/user.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ROLES } from '../config/global.config.js';

const router = Router();

// Definición de las rutas (Endpoints) — Solo administradores
// El registro público de usuarios se hace por /api/v1/auth/register
router.post('/', [authenticationUser, authorizationUser([ROLES.ADMIN])], registerUser);
router.get('/', [authenticationUser, authorizationUser([ROLES.ADMIN])], getAllUsers);
router.get('/:idUser', [authenticationUser, authorizationUser([ROLES.ADMIN])], getUserById);
router.delete('/:idUser', [authenticationUser, authorizationUser([ROLES.ADMIN])], deleteUserById);
router.patch('/:idUser', [authenticationUser, authorizationUser([ROLES.ADMIN])], updateUserById);


export default router;