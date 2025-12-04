import { Schema, model } from "mongoose";

const categorySchema = new Schema (
    {
        name: { 
        type: String,
        required: true, 
        trim: true 
    },
     description: { 
        type: String, 
        required: false, 
        trim: true }
     }, 
     {
     versionKey: false,
     timestamps: true
});