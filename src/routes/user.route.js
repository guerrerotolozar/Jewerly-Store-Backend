import { Router } from 'express'

import { deleteUserById, getAllUsers, getUserById, registerUser, updateUserById } from '../controllers/user.controller.js';
import authenticationUser from '../middlewares/authetication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';

const router = Router();

// DEfinicion de las rutas (Endpoints)
router.post('/',[ authenticationUser, authorizationUser ], registerUser);
router.get('/',[ authenticationUser, authorizationUser ], getAllUsers);
router.get('/:idUser',[ authenticationUser, authorizationUser ], getUserById);  //parametrizar la ruta: Crear un parametro en la ruta que funje como variable
router.delete('/:idUser',[ authenticationUser, authorizationUser ], deleteUserById);
router.patch('/:idUser',[ authenticationUser, authorizationUser ], updateUserById);


export default router;