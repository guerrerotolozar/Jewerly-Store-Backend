// =============================================
// Modelo de Carrito de Compras (Cart)
// =============================================
// Cada usuario tiene UN SOLO carrito (campo 'user' es unique).
// El carrito contiene un array de items, donde cada item
// referencia a un producto y tiene una cantidad.
// =============================================

import { Schema, model } from 'mongoose';

// Sub-esquema para cada item dentro del carrito
const cartItemSchema = new Schema({
    // Referencia al producto que se agrega al carrito
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',         // Debe coincidir con el nombre del modelo de Product
        required: true
    },
    // Cantidad de unidades de ese producto
    quantity: {
        type: Number,
        required: true,
        min: 1,                 // No se permiten cantidades menores a 1
        default: 1
    }
}, {
    _id: false                  // No necesitamos un _id individual por cada item
});

// Esquema principal del carrito
const cartSchema = new Schema({
    // El usuario dueño del carrito (relación 1:1)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',           // Debe coincidir con el nombre del modelo de User
        required: true,
        unique: true            // Un solo carrito por usuario
    },
    // Array de productos con sus cantidades
    items: [cartItemSchema]
}, {
    versionKey: false,
    timestamps: true            // createdAt y updatedAt automáticos
});

const cartModel = model(
    'cart',                     // Nombre de la colección en MongoDB
    cartSchema
);

export default cartModel;
