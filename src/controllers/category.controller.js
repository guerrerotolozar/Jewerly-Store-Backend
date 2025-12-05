// controlador: se debe encargar de recibir las peticiones y responder a ellas
// import categoryModel from "../models/Category.model.js";
import { dbDeletcategoryById, dbGetAllcategory, dbGetcategoryById, dbRegistercategory } from "../services/category.service.js";
const registercategory =  async ( req, res ) => {

    // Se controla la excepcion que ocurre en el paso 2
    try{
        //Paso 1: extraer el cuerpo de la peticion
        const data = req.body;    

        //Mostrar en la consola el cuerpo de la peticion
        console.log( data);
    
        //Paso 2: Registrar los datos usando el categoryModel
       const dataRegistered = await dbRegistercategory ( data );   //Registrar los datos en la base de datos
    
        //Paso 3: Responder al cliente
        res.json({ 
            msg:'create categorys',
             //data: data,             // Forma tradicional
             dataRegistered            // ECMAScript 2015 
        });
    }   
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No se pudo crear el usuario'
        });
    }
}
const getAllcategory = async (req,res ) => {
    //interactuar directamente con la base de datos 
    const categorys = await dbGetAllcategory();
    try {

    res.json({
        msg: 'Obtiene todos los usuarios', 
        categorys
    });
}
catch (error) {
    console.error(error);
    res.json ({
        msg: 'Error: No se pudo obtener el listado de usuarios'  
    });
}
} 

const getcategoryById = async (req, res) => {
    try {
        const idcategory = req.params.idcategory;
    
        const category = await dbGetcategoryById(idcategory);
    
        res.json({
            category
        });
        
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No pudo obtener usuario por ID'
        });
        
    }
}

const deletecategoryById = async ( req,res )  => {
    try {
        const idcategory = req.params.idcategory;
        const categoryDeleted = await dbDeletcategoryById (idcategory)
            res.json({
                categoryDeleted   
            });
        }    
    catch (error) {
        console.error ( error);
        res.json ({
            msg: 'Error: no se pudo eliminar usuario'
        });
    }
}

export {
    registercategory, 
    getcategoryById,
    getAllcategory,
    deletecategoryById,
}