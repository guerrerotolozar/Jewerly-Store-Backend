import { verifyEncriptedPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { dbGetUserByEmail } from "../services/user.service.js";

const loginUser = async (req, res) => {
    const inputData = req.body;

    //paso 1: verificar si el usuario NO existe
    const userFound = await dbGetUserByEmail(inputData.email);

    if (!userFound) {
        return res.json({ msg: 'Usuario no existe. Por favor haga su registro' });
    }

    //paso 2: verificar si la contraseña coincide 
    const isMatch = verifyEncriptedPassword(inputData.password, userFound.password);
    if (!isMatch) {
        return res.json({ msg: 'Credenciales inválidas' });
    }

    //paso 3: generar credencial digital (token)
    const payload = {
        id: userFound.id,          // Id 
        name: userFound.name,       // Hola, Fulanito! 
        email: userFound.email,     // Para realizar comunicaciones (anonimas)
        roles: userFound.roles       // Para informar al frontend sobre la autorización que tienen los usuarios para acceder a las diferentes interfaces 
    };

    const token = generateToken(payload);

    // res.json ( {msg: "usuario logueado", token})


    // paso 4: Eliminar propiedades con datos sensibles 

    //userFound es un BSON (JSON Binario)
    const jsonUserFound = userFound.toObject();     // Convertir un BSON a JSON
    delete jsonUserFound.password;                  // Elimina la propiedad 'password' de un JSON

    //paso 5: responder al cliente 
    res.json({ token, user: jsonUserFound });
}

const reNewToken = async (req, res) => {
    // Extrae el payload del objeto requests que hemos asignado desde el Middleware de Autenticación


    //paso 1
    const payload = req.payload;

    //paso 2
    const userFound = await dbGetUserByEmail(payload.email);
    if (!userFound) {
        return res.json({
            msg: "no se renueva el token. El usuario ha sido eliminado o está inactivo"
        })
    }

    //paso 3
    const newPayload = {
        id: userFound._id,          // Id 
        name: userFound.name,       // Hola, Fulanito! 
        email: userFound.email,     // Para realizar comunicaciones (anónimas)
        roles: userFound.roles       // Para informar al frontend sobre la autorización que tienen los usuarios para acceder a las diferentes interfaces 
    }

    //paso 4
    const newToken = generateToken(newPayload)

    //paso 5
    const jsonUserFound = userFound.toObject()
    delete jsonUserFound.password

    //paso 6
    res.json({ token: newToken, user: jsonUserFound });
}

export {
    loginUser,
    reNewToken
}