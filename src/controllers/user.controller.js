// controlador: se debe encargar de recibir las peticiones y responder a ellas
import { encryptedPassword } from "../helpers/bcrypt.helper.js";
import userModel from "../models/User.model.js";
import { dbDeleteUserById, dbGetAllUsers, dbGetUserByEmail, dbGetUserById, dbRegisterUser } from "../services/user.service.js";
const registerUser = async (req, res) => {

    // Se controla la excepcion que ocurre en el paso 2
    try {
        //Paso 1: extraer el cuerpo de la peticion
        const inputData = req.body;
        //Verificar si el usuario existe
        const userFound = await dbGetUserByEmail ( inputData.email );

        if(userFound ) {
          return res.json({msg: 'No se puede registrar. El usuario ya existe' });
        }
        //Encriptar la contraseña que envio el usuario
        inputData.password = encryptedPassword(inputData.password );    //Devuelve el password encriptado 
        console.log('inputData antes de registrar : ', inputData);

        //Paso 2: Registrar el usuario 
        const dataRegistered = await dbRegisterUser(inputData);   //Registrar los datos en la base de datos

        //Paso 3: Responder al cliente
        res.json({
            msg: 'create users',
            //data: data,             // Forma tradicional
            dataRegistered            // ECMAScript 2015 
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No se pudo crear el usuario'
        });
    }
}
const getAllUsers = async (req, res) => {
    //interactuar directamente con la base de datos 
    const users = await dbGetAllUsers();
    try {

        res.json({
            msg: 'Obtiene todos los usuarios',
            users
        });
    }
    catch (error) {
        console.error(error);
        res.json({
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
        console.error(error);
        res.json({
            msg: 'Error: No pudo obtener usuario por ID'
        });

    }
}

const deleteUserById = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const userDeleted = await dbDeleteUserById(idUser)
        res.json({
            userDeleted
        });
    }
    catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: no se pudo eliminar usuario'
        });
    }
}

const updateUserById = async (req, res) => {
    try {
        const inputData = req.body;
        const idUser = req.params.idUser;

        // const userUpdated = await userModel.findByIdAndUpdate(
        //  idUser,                    // ID
        //  inputData,                  // Datos a actualizar 
        //  {new: true}// Configuracion 
        // );
        const userUpdated = await userModel.findOneAndUpdate(
            { _id: idUser },       // Objeto de consulta debe tener el ID
            inputData            // Datos a actualizar 
        );

        res.json({
            userUpdated
        });

    } catch (error) {
        console.error(error);
        res.json({
            msg: 'Error: No pudo actualizar el usuario por ID'
        });
    }
}
export {
    registerUser,
    getUserById,
    getAllUsers,
    deleteUserById,
    updateUserById
}