import { Schema, model } from "mongoose";

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
    'collection',
    collectionSchema
);

export default collectionModel;