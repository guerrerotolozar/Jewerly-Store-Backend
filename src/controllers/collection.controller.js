import collectionModel from "../models/collection.model.js";
import { dbDeleteCollectionById, dbGetAllCollections, dbGetCollectionById, dbRegisterCollection } from "../services/collection.services.js";

const registercollection = async ( req, res ) => {
    
    try{
        const inputData = req.body;    

        console.log( inputData);
            
       const collectionRegistered = await dbRegisterCollection ( inputData );   //Registrar los datos en la base de datos
            
        res.json({ 
            msg:'create collection',
             //data: data,             // Forma tradicional
             collectionRegistered           // ECMAScript 2015 
        });
    }   
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No se pudo crear el collection'
        });
    }
}
const getAllcollection = async ( req,res ) => {
    const collections = await dbGetAllCollections ();
    try {

    res.json({
        msg: 'Obtiene todos los collection', 
        collections
    });
}
catch (error) {
    console.error(error);
    res.json ({
        msg: 'Error: No se pudo obtener el listado de collection'  
    });
}
}

const getcollectionById = async (req,res) => {
    try {
        const idcollections = req.params.idcollections;
    
        const collectionFound = await dbGetCollectionById(idcollections);
    
        res.json({
            collectionFound
        });        
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No pudo obtener collectiono por ID'
        });    
    }
}

const deletecollectionById = async ( req,res ) => {
    try {
        const idcollections = req.params.idcollections;
        const collectionDeleted = await dbDeleteCollectionById (idcollections)
            res.json({
                collectionDeleted   
            });
        }    
    catch (error) {
        console.error ( error);
        res.json ({
            msg: 'Error: no se pudo eliminar collection'
        });
    }
}

const updatecollectionById = async ( req, res ) => {
    try {
        const inputData = req.body; 
        const idcollections = req.params.idcollections;
        
        // const userUpdated = await userModel.findByIdAndUpdate(
        //  idUser,                    // ID
        //  inputData,                  // Datos a actualizar 
        //  {new: true}// Configuracion 
        // );
        const collectionsUpdated = await collectionModel.findOneAndUpdate(
         {_id: idcollections},       // Objeto de consulta debe tener el ID
          inputData            // Datos a actualizar 
        );
        
        res.json({
            collectionsUpdated
        });
        } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No pudo actualizar el collectiono por ID'
        });    
        }
    }   




export {
    registercollection,
    getAllcollection,
    getcollectionById,
    deletecollectionById,
    updatecollectionById
}