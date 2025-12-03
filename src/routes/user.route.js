import express from 'express' 

import { deleteUserById, getAllUser, getUserById, registerUser, updateUserById } from '../controllers/user.controller.js';

const router = express.Router();

// DEfinicion de las rutas (Endpoints)
router.post( '/', registerUser );
router.get( '/', getAllUser );
router.get('/:idUser', getUserById );  //parametrizar la ruta: Crear un parametro en la ruta que funje como variable
router.delete('/:idUser', deleteUserById );
router.patch('/:idUser', updateUserById );


export default router;