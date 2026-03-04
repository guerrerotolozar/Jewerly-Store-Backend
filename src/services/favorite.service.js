// =============================================
// Servicio de Lista de Favoritos
// =============================================
// Capa de acceso a datos (Data Access Layer).
// Gestiona las operaciones CRUD de favoritos
// directamente contra MongoDB.
// =============================================

import favoriteModel from "../models/Favorite.model.js";

/**
 * Obtener la lista de favoritos de un usuario.
 * Usa populate para traer la información completa de cada producto.
 * Si el usuario no tiene lista, retorna null.
 */
const dbGetFavoritesByUser = async (userId) => {
    return await favoriteModel
        .findOne({ user: userId })
        .populate('products');       // Trae datos completos del producto (nombre, precio, imagen, etc.)
};

/**
 * Agregar un producto a la lista de favoritos.
 * - Si la lista no existe, la crea con el producto.
 * - Si el producto ya está, NO lo duplica (gracias a $addToSet).
 * - $addToSet es un operador de MongoDB que solo agrega si no existe.
 */
const dbAddFavorite = async (userId, productId) => {
    // findOneAndUpdate con upsert: si no existe el documento, lo crea
    const favorites = await favoriteModel.findOneAndUpdate(
        { user: userId },                           // Buscar por usuario
        { $addToSet: { products: productId } },      // Agregar sin duplicar
        { new: true, upsert: true }                  // new: retorna el doc actualizado, upsert: crea si no existe
    ).populate('products');

    return favorites;
};

/**
 * Eliminar un producto específico de la lista de favoritos.
 * Usa $pull para remover el productId del array.
 */
const dbRemoveFavorite = async (userId, productId) => {
    const favorites = await favoriteModel.findOneAndUpdate(
        { user: userId },
        { $pull: { products: productId } },          // $pull remueve del array el valor que coincida
        { new: true }
    ).populate('products');

    return favorites;
};

/**
 * Vaciar completamente la lista de favoritos del usuario.
 * Reemplaza el array de productos con un array vacío.
 */
const dbClearFavorites = async (userId) => {
    return await favoriteModel.findOneAndUpdate(
        { user: userId },
        { $set: { products: [] } },                  // $set reemplaza el array completo
        { new: true }
    );
};

export {
    dbGetFavoritesByUser,
    dbAddFavorite,
    dbRemoveFavorite,
    dbClearFavorites
};
