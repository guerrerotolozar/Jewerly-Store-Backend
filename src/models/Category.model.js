import { Schema, model } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        // Para jerarquía: referencia a otra categoría (ej: "anillos de oro" apunta a "anillos")
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'category', // Se refiere a sí mismo (auto-referencia)
            required: false // Opcional, para categorías principales
        },
        // Alias amigable para URLs (ej: "anillos-de-oro")
        slug: {
            type: String,
            required: false,
            trim: true,
            unique: true // Para evitar duplicados en URLs
        },
        // Para activar/desactivar (como en productos)
        isActive: {
            type: Boolean,
            default: true
        },
        // Imagen opcional para la categoría
        image: {
            type: String,
            required: false,
            trim: true
        },
        // Lista de productos en esta categoría (referencias)
        // products: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'product' // Asumiendo que tu modelo de producto se llama 'Product'
        // }]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

// Crear el modelo
const categoryModel = model(
    'category', // Nombre de la colección (puedes cambiarlo si quieres)
    categorySchema
);

export default categoryModel;