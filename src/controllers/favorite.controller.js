// =============================================
// Controlador de Lista de Favoritos
// =============================================
// Capa de controladores (Controller Layer).
// Manejan la lógica de request/response para
// la funcionalidad de "wishlist" o favoritos.
// =============================================

import {
    dbGetFavoritesByUser,
    dbAddFavorite,
    dbRemoveFavorite,
    dbClearFavorites
} from "../services/favorite.service.js";

/**
 * GET /api/v1/favorite
 * Obtener la lista de favoritos del usuario autenticado.
 * Si el usuario no tiene favoritos, retorna una lista vacía.
 */
const getFavorites = async (req, res) => {
    try {
        const userId = req.payload.id;               // ID del usuario desde el token JWT

        const favorites = await dbGetFavoritesByUser(userId);

        res.json({
            msg: 'Lista de favoritos obtenida correctamente',
            favorites: favorites || { user: userId, products: [] }   // Lista vacía si no existe
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo obtener la lista de favoritos'
        });
    }
};

/**
 * POST /api/v1/favorite
 * Agregar un producto a la lista de favoritos.
 * Body esperado: { productId: "..." }
 * Si el producto ya está en favoritos, no se duplica.
 */
const addFavorite = async (req, res) => {
    try {
        const userId = req.payload.id;
        const { productId } = req.body;              // ID del producto desde el body

        // Validación: el productId es obligatorio
        if (!productId) {
            return res.status(400).json({
                msg: 'Error: El campo productId es obligatorio'
            });
        }

        const favorites = await dbAddFavorite(userId, productId);

        res.json({
            msg: 'Producto agregado a favoritos',
            favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo agregar el producto a favoritos'
        });
    }
};

/**
 * DELETE /api/v1/favorite/:productId
 * Eliminar un producto específico de la lista de favoritos.
 */
const removeFavorite = async (req, res) => {
    try {
        const userId = req.payload.id;
        const { productId } = req.params;            // ID del producto desde la URL

        const favorites = await dbRemoveFavorite(userId, productId);

        res.json({
            msg: 'Producto eliminado de favoritos',
            favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo eliminar el producto de favoritos'
        });
    }
};

/**
 * DELETE /api/v1/favorite
 * Vaciar completamente la lista de favoritos del usuario.
 */
const clearFavorites = async (req, res) => {
    try {
        const userId = req.payload.id;

        const favorites = await dbClearFavorites(userId);

        res.json({
            msg: 'Lista de favoritos vaciada correctamente',
            favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error: No se pudo vaciar la lista de favoritos'
        });
    }
};

export {
    getFavorites,
    addFavorite,
    removeFavorite,
    clearFavorites
};
