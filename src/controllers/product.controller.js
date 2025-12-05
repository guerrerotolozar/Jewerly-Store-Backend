import productModel from "../models/Products.models.js";
import { dbDeletProductById, dbGetAllProducts, dbGetProductsById, dbRegistedProduct } from "../services/products.services.js";

const registerProduct = async ( req, res ) => {
    
    try{
        const inputData = req.body;    

        console.log( inputData);
            
       const productRegistered = await dbRegistedProduct ( inputData );   //Registrar los datos en la base de datos
            
        res.json({ 
            msg:'create product',
             //data: data,             // Forma tradicional
             productRegistered           // ECMAScript 2015 
        });
    }   
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No se pudo crear el producto'
        });
    }
}
const getAllProducts = async ( req,res ) => {
    const products = await dbGetAllProducts ();
    try {

    res.json({
        msg: 'Obtiene todos los productos', 
        products
    });
}
catch (error) {
    console.error(error);
    res.json ({
        msg: 'Error: No se pudo obtener el listado de productos'  
    });
}
}

const getProductsById = async (req,res) => {
    try {
        const idProducts = req.params.idProducts;
    
        const productFound = await dbGetProductsById(idProducts);
    
        res.json({
            productFound
        });        
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No pudo obtener producto por ID'
        });    
    }
}

const deleteProductById = async ( req,res ) => {
    try {
        const idProducts = req.params.idProducts;
        const productDeleted = await dbDeletProductById (idProducts)
            res.json({
                productDeleted   
            });
        }    
    catch (error) {
        console.error ( error);
        res.json ({
            msg: 'Error: no se pudo eliminar producto'
        });
    }
}

const updateProductsById = async ( req, res ) => {
    try {
        const inputData = req.body; 
        const idProducts = req.params.idProducts;
        
        // const userUpdated = await userModel.findByIdAndUpdate(
        //  idUser,                    // ID
        //  inputData,                  // Datos a actualizar 
        //  {new: true}// Configuracion 
        // );
        const productsUpdated = await productsModel.findOneAndUpdate(
         {_id: idProducts},       // Objeto de consulta debe tener el ID
          inputData            // Datos a actualizar 
        );
        
        res.json({
            productsUpdated
        });
        } 
    catch (error) {
        console.error( error );
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
    updateProductsById
}