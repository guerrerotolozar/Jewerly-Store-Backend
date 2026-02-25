import productModel from "../models/Product.model.js";
import { dbDeleteProductById, dbGetAllProducts, dbGetProductsById, dbGetProductsGroupedByCategory, dbRegisterProduct } from "../services/product.service.js";

const registerProduct = async (req, res) => {

    try {
        const inputData = req.body;

        console.log(inputData);

        const productRegistered = await dbRegisterProduct(inputData);   //Registrar los datos en la base de datos

        res.json({
            msg: 'create product',
            //data: data,             // Forma tradicional
            productRegistered           // ECMAScript 2015 
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No se pudo crear el producto'
        });
    }
}
const getAllProducts = async (req, res) => {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await dbGetAllProducts(query);
    try {

        res.json({
            msg: 'Obtiene todos los productos',
            products
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No se pudo obtener el listado de productos'
        });
    }
}

const getProductsGroupedByCategory = async (req, res) => {
    const products = await dbGetProductsGroupedByCategory();
    try {

        res.json({
            msg: 'Obtiene todos los productos agrupados por categoria',
            products
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No se pudo obtener el listado de productos agrupados por categoria'
        });
    }
}

const getProductsById = async (req, res) => {
    try {
        const idProducts = req.params.idProducts;

        const productFound = await dbGetProductsById(idProducts);

        res.json({
            productFound
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No pudo obtener producto por ID'
        });
    }
}

const deleteProductById = async (req, res) => {
    try {
        const idProducts = req.params.idProducts;
        const productDeleted = await dbDeleteProductById(idProducts)
        res.json({
            productDeleted
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: no se pudo eliminar producto'
        });
    }
}

const updateProductsById = async (req, res) => {
    try {
        const inputData = req.body;
        const idProducts = req.params.idProducts;

        // const userUpdated = await userModel.findByIdAndUpdate(
        //  idUser,                    // ID
        //  inputData,                  // Datos a actualizar 
        //  {new: true}// Configuracion 
        // );
        const productsUpdated = await productModel.findOneAndUpdate(
            { _id: idProducts },       // Objeto de consulta debe tener el ID
            inputData            // Datos a actualizar 
        );

        res.json({
            productsUpdated
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No pudo actualizar el producto por ID'
        });
    }
}




export {
    registerProduct,
    getAllProducts,
    getProductsById,
    deleteProductById,
    updateProductsById,
    getProductsGroupedByCategory
}