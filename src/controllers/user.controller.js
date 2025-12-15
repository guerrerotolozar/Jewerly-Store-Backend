// controlador: se debe encargar de recibir las peticiones y responder a ellas
import { encryptedPassword } from "../helpers/bcrypt.helper.js";
import validatePassword from "../helpers/password.helper.js";
import userModel from "../models/User.model.js";
import { dbDeleteUserById, dbGetAllUsers, dbGetUserByEmail, dbGetUserById, dbRegisterUser } from "../services/user.service.js";

const registerUser = async (req, res) => {

    try {
        //Paso 1: extraer el cuerpo de la peticion
        const inputData = req.body;

        //paso 2: busqueda de usuario por email
        const userFound = await dbGetUserByEmail(inputData.email)
        if (userFound) {
            return res.json({
                msg : "el usuario ya existe"
            })
        }

        //paso 3: validar contraseña para que cumpla los requerimientos antes de la encriptacion
        const passwordCheck = validatePassword(inputData.password)
        if (!passwordCheck.validacion) {
                return res.json({
                    msg: passwordCheck.msg
                });
            }

        //paso 4 : encriptacion de contraseña
        inputData.password = encryptedPassword(inputData.password)

        //Paso 5: Registrar los datos usando el userModel
        const dataRegistered = await dbRegisterUser(inputData);   //Registrar los datos en la base de datos

        //paso 6: Eliminar la contraseña para que no sea visible en bases de datos
        const jsonUserFound = dataRegistered.toObject();
        delete jsonUserFound.password;

        //Paso 7: Responder al cliente
        res.json({user: jsonUserFound});
    }
    catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            // ¿Tiene error específico en el campo email?
            if (error.errors && error.errors.email) {
                return res.json({
                    msg: 'Formato de email incorrecto'
                });
            }
            return res.json({
                msg: 'Datos inválidos',
                error: error.message
            });
        }
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