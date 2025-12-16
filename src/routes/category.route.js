import { Router } from 'express';
import { deletecategoryById, getAllcategory, getcategoryById, registercategory } from '../controllers/category.controller.js';



const router = Router();

// Definición de las rutas (Endpoints)
router.post('/', registercategory);
router.get('/', getAllcategory);
router.get('/:idcategory', getcategoryById); // el param de ruta sigue igual
router.delete('/:idcategory', deletecategoryById);

export default router;
