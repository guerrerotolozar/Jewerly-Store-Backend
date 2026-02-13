import { Router } from 'express';

import {
    registercategory,
    getAllcategory,
    getcategoryById,
    deletecategoryById,
} from '../controllers/category.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ALLOWED_ROLES, ROLES } from '../config/global.config.js';

const router = Router();

// Definición de las rutas (Endpoints)
router.post(
    '/',
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR])],
    registercategory
);
router.get('/', [authenticationUser, authorizationUser(ALLOWED_ROLES)], getAllcategory); // el param de ruta sigue igual
router.get('/:idcategory', [authenticationUser, authorizationUser(ALLOWED_ROLES)], getcategoryById);
router.delete('/:idcategory', [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR])], deletecategoryById);

export default router;
