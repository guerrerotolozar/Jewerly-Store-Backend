import { Router } from 'express';

import {
    registercategory,
    getAllcategory,
    getcategoryById,
    deletecategoryById,
} from '../controllers/category.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = Router();

// Definición de las rutas (Endpoints)
router.post('/', [authenticationUser, authorizationUser], registercategory);
router.get('/', [authenticationUser, authorizationUser], getAllcategory); // el param de ruta sigue igual
router.get('/:idcategory', [authenticationUser, authorizationUser], getcategoryById);
router.delete('/:idcategory', [authenticationUser, authorizationUser], deletecategoryById);

export default router;
