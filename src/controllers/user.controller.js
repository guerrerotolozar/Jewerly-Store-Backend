// controlador: se debe encargar de recibir las peticiones y responder a ellas
import userModel from "../models/User.models.js";
import { dbGetAllUser, dbRegisterUser } from "../services/user.services.js";
const createUser =  async ( req, res ) => {

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

    
export {
    createUser, getAllUser
}