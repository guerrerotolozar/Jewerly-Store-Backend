// =============================================
// Controlador del Carrito de Compras
// =============================================
// Capa de controladores (Controller Layer).
// Manejan la lógica de request/response.
// Extraen datos del request, llaman al servicio,
// y envían la respuesta al cliente.
// =============================================

import {
    dbGetCartByUser,
    dbAddItemToCart,
    dbUpdateItemQuantity,
    dbRemoveItemFromCart,
    dbClearCart
} from "../services/cart.service.js";

/**
 * GET /api/v1/cart
 * Obtener el carrito del usuario autenticado.
 * El userId viene del middleware de autenticación (req.payload.id).
 */
const getCart = async (req, res) => {
    try {
        const userId = req.payload.id;              // ID del usuario desde el token JWT

        const cart = await dbGetCartByUser(userId);

        res.json({
            msg: 'Carrito obtenido correctamente',
            cart: cart || { user: userId, items: [] }   // Si no tiene carrito, retorna uno vacío
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo obtener el carrito'
        });
    }
};

/**
 * POST /api/v1/cart
 * Agregar un producto al carrito.
 * Body esperado: { productId: "...", quantity: 1 }
 */
const addToCart = async (req, res) => {
    try {
        const userId = req.payload.id;
        const { productId, quantity } = req.body;   // Extraer productId y quantity del body

        // Validación: el productId es obligatorio
        if (!productId) {
            return res.status(400).json({
                msg: 'Error: El campo productId es obligatorio'
            });
        }

        const cart = await dbAddItemToCart(userId, productId, quantity || 1);

        res.json({
            msg: 'Producto agregado al carrito',
            cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo agregar el producto al carrito'
        });
    }
};

/**
 * PATCH /api/v1/cart/:productId
 * Actualizar la cantidad de un producto en el carrito.
 * Body esperado: { quantity: 5 }
 */
const updateCartItem = async (req, res) => {
    try {
        const userId = req.payload.id;
        const { productId } = req.params;           // ID del producto desde la URL
        const { quantity } = req.body;               // Nueva cantidad desde el body

        // Validación: la cantidad debe ser al menos 1
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                msg: 'Error: La cantidad debe ser al menos 1'
            });
        }

        const cart = await dbUpdateItemQuantity(userId, productId, quantity);

        if (!cart) {
            return res.status(404).json({
                msg: 'Error: Producto no encontrado en el carrito'
            });
        }

        res.json({
            msg: 'Cantidad actualizada correctamente',
            cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo actualizar la cantidad del producto'
        });
    }
};

/**
 * DELETE /api/v1/cart/:productId
 * Eliminar un producto específico del carrito.
 */
const removeFromCart = async (req, res) => {
    try {
        const userId = req.payload.id;
        const { productId } = req.params;

        const cart = await dbRemoveItemFromCart(userId, productId);

        res.json({
            msg: 'Producto eliminado del carrito',
            cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo eliminar el producto del carrito'
        });
    }
};

/**
 * DELETE /api/v1/cart
 * Vaciar completamente el carrito del usuario.
 */
const clearCart = async (req, res) => {
    try {
        const userId = req.payload.id;

        const cart = await dbClearCart(userId);

        res.json({
            msg: 'Carrito vaciado correctamente',
            cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo vaciar el carrito'
        });
    }
};

export {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
