import { Router } from 'express'

import {
  registercategory,
  getAllcategory,
  getcategoryById,
  deletecategoryById,
} from '../controllers/category.controller.js'

import authenticationUser from '../middlewares/authentication.middleware.js'
import authorizationUser from '../middlewares/authorization.middleware.js'

const router = Router()

// CREAR categoría (protegido)
router.post(
  '/',
 // [authenticationUser, authorizationUser],
  registercategory
)

// LISTAR categorías (abierto para frontend en desarrollo)
router.get(
  '/',
  getAllcategory
)

// OBTENER categoría por ID (protegido)
router.get(
  '/:idcategory',
  [authenticationUser, authorizationUser],
  getcategoryById
)

// ELIMINAR categoría (protegido)
router.delete(
  '/:idcategory',
  [authenticationUser, authorizationUser],
  deletecategoryById
)

export default router
