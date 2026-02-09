import { dbGetAllCategories , dbDeleteCategoryById, dbRegisterCategory, dbGetCategoryById } from "../services/category.service.js";
const registercategory =  async ( req, res ) => {

    // Se controla la excepcion que ocurre en el paso 2
    try{
        //Paso 1: extraer el cuerpo de la peticion
        const data = req.body;    

        // paso obtener categoria del padre si existe

        if( !data.parent || data.parent.length <= 23 || data.parent.length >= 25 ) {
            data.parent = null;
        }

        // crea el slug a partir del nombre
        if( data.name ) {
            data.slug = data.name.toLowerCase().replace( ' ', '-' )
        }

        //Mostrar en la consola el cuerpo de la peticion
        console.log( data);
    
        //Paso 2: Registrar los datos usando el categoryModel
       const dataRegistered = await dbRegisterCategory ( data );   //Registrar los datos en la base de datos
    
        //Paso 3: Responder al cliente
        res.json({ 
            msg:'create categories',
             //data: data,             // Forma tradicional
             dataRegistered            // ECMAScript 2015 
        });
    }   
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No se pudo crear la categoría'
        });
    }
}
const getAllcategory = async (req,res ) => {
    //interactuar directamente con la base de datos 
    try {
        const categorys = await dbGetAllCategories();

        res.json({
            msg: 'Obtener todas las categorías', 
            categorys
        });
    }
    catch (error) {
        console.error(error);
        res.json ({
            msg: 'Error: No se pudo obtener el listado de las categorías'  
        });
    }
} 

const getcategoryById = async (req, res) => {
    try {
        const idcategory = req.params.idcategory;
        
        const category = await dbGetCategoryById(idcategory);
        
        res.json({
            category
        });
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No se pudo obtener la categoría por ID'
        });
    }
}

const deletecategoryById = async ( req,res )  => {
    try {
        const idcategory = req.params.idcategory;
        const categoryDeleted = await dbDeleteCategoryById (idcategory);
        
        res.json({
            categoryDeleted   
        });
    }    
    catch (error) {
        console.error ( error);
        res.json ({
            msg: 'Error: no se pudo eliminar la categoría'
        });
    }
}

export {
    registercategory, 
    getcategoryById,
    getAllcategory,
    deletecategoryById,
}