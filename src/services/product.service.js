import productModel from "../models/Products.models.js";

const dbRegistedProduct = async( newProduct) => {
    return await productModel.create ( newProduct);   // async/await porque el modelo retorna una promesa
}

const dbGetAllProducts = async () => {
    return  await productModel.find();
}

const dbGetProductsById = async ( _id ) => {
    return await productModel.findOne({_id }); 
}

const dbDeletProductById = async (_id ) => {
    return await productModel.findOneAndDelete({_id});
    return await productModel.findByIdAndDelete({_id})
}

export {
    dbRegistedProduct,
    dbGetAllProducts,
    dbGetProductsById,
    dbDeletProductById
}