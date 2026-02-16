import { Router } from 'express'

import { registercollection, getAllcollection, getcollectionById, deletecollectionById } from '../controllers/collection.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ALLOWED_ROLES, ROLES } from '../config/global.config.js';

const router = Router();

// Definición de las rutas (Endpoints)
router.post('/', [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR])], registercollection);
router.get('/', [authenticationUser, authorizationUser(ALLOWED_ROLES)], getAllcollection);
router.get('/:idcollection', [authenticationUser, authorizationUser(ALLOWED_ROLES)], getcollectionById);
router.delete('/:idcollection', [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.COLLABORATOR])], deletecollectionById);


export default router;