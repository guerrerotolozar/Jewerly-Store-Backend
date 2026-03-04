// =============================================
// Servicio del Carrito de Compras
// =============================================
// Capa de acceso a datos (Data Access Layer).
// Todas las funciones interactúan directamente con el modelo
// de MongoDB y retornan promesas.
// =============================================

import cartModel from "../models/Cart.model.js";

/**
 * Obtener el carrito de un usuario específico.
 * Si no existe, retorna null.
 * Usa populate para traer la info completa de cada producto.
 */
const dbGetCartByUser = async (userId) => {
    return await cartModel
        .findOne({ user: userId })
        .populate('items.product');      // Trae los datos completos del producto (nombre, precio, imagen, etc.)
};

/**
 * Agregar un producto al carrito.
 * - Si el carrito no existe, lo crea.
 * - Si el producto ya está en el carrito, incrementa la cantidad.
 * - Si el producto es nuevo, lo agrega al array de items.
 */
const dbAddItemToCart = async (userId, productId, quantity = 1) => {
    // Buscar si el carrito del usuario ya existe
    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
        // Si no existe, crear un carrito nuevo con el item
        cart = await cartModel.create({
            user: userId,
            items: [{ product: productId, quantity }]
        });
    } else {
        // Buscar si el producto ya está en el carrito
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            // Si ya existe, sumar la cantidad
            existingItem.quantity += quantity;
        } else {
            // Si no existe, agregar nuevo item al array
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();          // Guardar los cambios en la base de datos
    }

    // Retornar el carrito actualizado con los productos populados
    return await dbGetCartByUser(userId);
};

/**
 * Actualizar la cantidad de un producto específico en el carrito.
 * Busca el item por productId y reemplaza su cantidad.
 */
const dbUpdateItemQuantity = async (userId, productId, quantity) => {
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) return null;         // Si no hay carrito, retornar null

    // Buscar el item dentro del array
    const item = cart.items.find(
        item => item.product.toString() === productId
    );

    if (!item) return null;         // Si el producto no está en el carrito

    item.quantity = quantity;        // Actualizar la cantidad
    await cart.save();

    return await dbGetCartByUser(userId);
};

/**
 * Eliminar un producto específico del carrito.
 * Usa el método pull de Mongoose para remover del array.
 */
const dbRemoveItemFromCart = async (userId, productId) => {
    const cart = await cartModel.findOneAndUpdate(
        { user: userId },
        { $pull: { items: { product: productId } } },   // $pull remueve del array el item que coincida
        { new: true }                                     // Retorna el documento actualizado
    ).populate('items.product');

    return cart;
};

/**
 * Vaciar completamente el carrito del usuario.
 * Reemplaza el array de items con un array vacío.
 */
const dbClearCart = async (userId) => {
    return await cartModel.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } },    // $set reemplaza el array completo
        { new: true }
    );
};

export {
    dbGetCartByUser,
    dbAddItemToCart,
    dbUpdateItemQuantity,
    dbRemoveItemFromCart,
    dbClearCart
};
