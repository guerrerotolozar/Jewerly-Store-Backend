import {Router} from 'express' 

import { deleteCategoryById, getAllCategory, getCategoryById, registerCategory } from '../controllers/category.controller.js';

const router = Router();

// DEfinicion de las rutas (Endpoints)
router.post( '/', registerCategory );
router.get( '/', getAllCategory );
router.get('/:idcategory', getCategoryById );  //parametrizar la ruta: Crear un parametro en la ruta que funje como variable
router.delete('/:idcategory', deleteCategoryById );


export default router;