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
            default: null // Opcional, para categorías principales
        },
        // Alias amigable para URLs (ej: "anillos-de-oro")
        slug: {
            type: String,
            required: false,
            trim: true,
            unique: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);


const categoryModel = model(
    'category',
    categorySchema
);

export default categoryModel;