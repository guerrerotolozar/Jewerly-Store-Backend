import mongoose, { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
    {
        name: {
            type: mongoose.Schema. Types.ObjectId,
            required: true,
            ref: "user"
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
        },  
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,           
            trim: true,
        },
    },{
        timestamps: true
    }
       
);


const ReviewsModel = model(
    'reviews',
    ReviewSchema
);

export default ReviewsModel;