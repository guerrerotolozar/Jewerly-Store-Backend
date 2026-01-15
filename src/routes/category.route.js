import { Router } from 'express';

import {
    registercategory,
    getAllcategory,
    getcategoryById,
    deletecategoryById,
} from '../controllers/category.controller.js';

const router = Router();

// Definición de las rutas (Endpoints)
router.post('/', registercategory);
router.get('/', getAllcategory); // el param de ruta sigue igual
router.get(':idcategory/', getcategoryById);
router.delete('/:idcategory', deletecategoryById);

export default router;
