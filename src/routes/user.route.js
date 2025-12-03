import express from 'express' 

import { createUser, getAllUser } from '../controllers/user.controller.js';

const router = express.Router();

// DEfinicion de las rutas (Endpoints)
router.post( '/', createUser);
router.get( '/', getAllUser);

export default router;