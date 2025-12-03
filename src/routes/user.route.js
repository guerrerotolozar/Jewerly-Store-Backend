import express from 'express' 

import { createUser, getAllUser, getUserById } from '../controllers/user.controller.js';

const router = express.Router();

// DEfinicion de las rutas (Endpoints)
router.post( '/', createUser );
router.get( '/', getAllUser );
router.get('/:idUser', getUserById );  //parametrizar la ruta: Crear un parametro en la ruta que funje como variable

export default router;