// =============================================
// Rutas de Lista de Favoritos (Wishlist)
// =============================================
// Define los endpoints REST para favoritos.
// Todas las rutas están protegidas:
//   1. authenticationUser → Verifica token JWT válido
//   2. authorizationUser([ROLES.CLIENT]) → Verifica rol 'cliente'
// =============================================

import express from 'express';
import { getFavorites, addFavorite, removeFavorite, clearFavorites } from '../controllers/favorite.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ROLES } from '../config/global.config.js';

const router = express.Router();

// Middleware de protección: se aplica a TODAS las rutas de este router
const protect = [authenticationUser, authorizationUser([ROLES.CLIENT])];

// GET    /api/v1/favorite             → Obtener la lista de favoritos del usuario
router.get('/', protect, getFavorites);

// POST   /api/v1/favorite             → Agregar producto a favoritos (body: { productId })
router.post('/', protect, addFavorite);

// DELETE /api/v1/favorite/:productId  → Eliminar un producto de favoritos
router.delete('/:productId', protect, removeFavorite);

// DELETE /api/v1/favorite             → Vaciar toda la lista de favoritos
router.delete('/', protect, clearFavorites);

export default router;
