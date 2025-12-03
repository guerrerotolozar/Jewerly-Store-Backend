// controlador: se debe encargar de recibir las peticiones y responder a ellas
import userModel from "../models/User.models.js";
import { dbDeletUserById, dbGetAllUser, dbGetUserById, dbRegisterUser } from "../services/user.services.js";
const registerUser =  async ( req, res ) => {

    // Se controla la excepcion que ocurre en el paso 2
    try{
        //Paso 1: extraer el cuerpo de la peticion
        const data = req.body;    

        //Mostrar en la consola el cuerpo de la peticion
        console.log( data);
    
        //Paso 2: Registrar los datos usando el userModel
       const dataRegistered = await dbRegisterUser ( data );   //Registrar los datos en la base de datos
    
        //Paso 3: Responder al cliente
        res.json({ 
            msg:'create users',
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
const getAllUser = async (req,res ) => {
    //interactuar directamente con la base de datos 
    const users = await dbGetAllUser();
    try {

    res.json({
        msg: 'Obtiene todos los usuarios', 
        users
    });
}
catch (error) {
    console.error(error);
    res.json ({
      msg: 'Error: No se pudo obtener el listado de usuarios'  
    });
  }
} 

const getUserById = async (req, res) => {
    try {
        const idUser = req.params.idUser;
    
       const user = await dbGetUserById(idUser);
    
        res.json({
            user
        });
        
    } 
    catch (error) {
        console.error( error );
        res.json({
            msg: 'Error: No pudo obtener usuario por ID'
        });
        
    }
}

const deleteUserById = async ( req,res )  => {
    try {
        const idUser = req.params.idUser;
        const userDeleted = await dbDeletUserById (idUser)
            res.json({
                userDeleted   
            });
        }    
     catch (error) {
        console.error ( error);
        res.json ({
            msg: 'Error: no se pudo eliminar usuario'
        });
    }
}

 const updateUserById = async (req, res ) => {
try {
    const inputData = req.body; 
    const idUser = req.params.idUser;
    
    // const userUpdated = await userModel.findByIdAndUpdate(
    //  idUser,                    // ID
    //  inputData,                  // Datos a actualizar 
    //  {new: true}// Configuracion 
    // );
     const userUpdated = await userModel.findOneAndUpdate(
     {_id: idUser},       // Objeto de consulta debe tener el ID
      inputData            // Datos a actualizar 
     );
    
    res.json({
        userUpdated
    });
    
} catch (error) {
    console.error( error );
    res.json({
        msg: 'Error: No pudo actualizar el usuario por ID'
    });    
  }
}   
export {
    registerUser, 
    getUserById,
    getAllUser,
    deleteUserById,
    updateUserById
}