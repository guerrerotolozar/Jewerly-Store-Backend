// =============================================
// Modelo de Lista de Favoritos (Wishlist)
// =============================================
// Cada usuario tiene UNA SOLA lista de favoritos (campo 'user' es unique).
// La lista contiene un array de referencias a productos.
// A diferencia del carrito, aquí NO se necesita cantidad,
// solo se marca si un producto es "favorito" o no.
// =============================================

import { Schema, model } from 'mongoose';

const favoriteSchema = new Schema({
    // El usuario dueño de la lista de favoritos (relación 1:1)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',               // Debe coincidir con el nombre del modelo de User
        required: true,
        unique: true                 // Un solo documento de favoritos por usuario
    },
    // Array de productos marcados como favoritos
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'               // Debe coincidir con el nombre del modelo de Product
    }]
}, {
    versionKey: false,
    timestamps: true                 // createdAt y updatedAt automáticos
});

const favoriteModel = model(
    'favorite',                      // Nombre de la colección en MongoDB
    favoriteSchema
);

export default favoriteModel;
