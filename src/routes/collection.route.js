import { Router } from 'express'

import { deletecollectionById, getAllcollection, getcollectionById, registercollection } from '../controllers/collection.controller.js';

const router = Router();

// DEfinicion de las rutas (Endpoints)
router.post('/', registercollection);
router.get('/', getAllcollection);
router.get('/:idcollection', getcollectionById);  //parametrizar la ruta: Crear un parametro en la ruta que funje como variable
router.delete('/:idcollection', deletecollectionById);


export default router;