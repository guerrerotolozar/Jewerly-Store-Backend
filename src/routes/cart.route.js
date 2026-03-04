// =============================================
// Rutas del Carrito de Compras
// =============================================
// Define los endpoints REST para el carrito.
// Todas las rutas están protegidas:
//   1. authenticationUser → Verifica que el usuario tenga un token JWT válido
//   2. authorizationUser([ROLES.CLIENT]) → Verifica que el usuario tenga el rol 'cliente'
// =============================================

import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller.js';
import authenticationUser from '../middlewares/authentication.middleware.js';
import authorizationUser from '../middlewares/authorization.middleware.js';
import { ROLES } from '../config/global.config.js';

const router = express.Router();

// Middleware de protección: se aplica a TODAS las rutas de este router
// El usuario debe estar autenticado Y tener rol 'cliente'
const protect = [authenticationUser, authorizationUser([ROLES.CLIENT])];

// GET    /api/v1/cart           → Obtener el carrito del usuario
router.get('/', protect, getCart);

// POST   /api/v1/cart           → Agregar producto al carrito (body: { productId, quantity })
router.post('/', protect, addToCart);

// PATCH  /api/v1/cart/:productId → Actualizar cantidad de un producto (body: { quantity })
router.patch('/:productId', protect, updateCartItem);

// DELETE /api/v1/cart/:productId → Eliminar un producto del carrito
router.delete('/:productId', protect, removeFromCart);

// DELETE /api/v1/cart           → Vaciar todo el carrito
router.delete('/', protect, clearCart);

export default router;
