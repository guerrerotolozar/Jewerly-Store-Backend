import { Schema, model } from "mongoose";


// 🔥 Sub-schema para productos dentro de colección
const collectionProductSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true
        },
        order: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        _id: false // evita crear _id extra para cada item
    }
);


const collectionSchema = new Schema(
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

        slug: {
            type: String,
            required: false,
            trim: true,
            unique: true
        },

        // 🔥 Productos con orden
        products: [collectionProductSchema],

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

const collectionModel = model(
    "collection",
    collectionSchema
);

export default collectionModel;
