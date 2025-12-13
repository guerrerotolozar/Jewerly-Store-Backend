import bcrypt from 'bcrypt';
//encriptar la contrasenia 


const encryptedPassword = (passwordUser) => {
try {
        const salt = bcrypt.genSaltSync(9); // Generar un fragmento o una cadena aleatoria (el numero indica cuantas veces da uelta para encriptar)
        console.log ( salt );       
        const hashPassword = bcrypt.hashSync(
            passwordUser,       // La constrasenia del usuario sin encriptar (123456789)
            salt
        );
        return hashPassword;   //devuelve la contrasenia encriptada 
    }
    catch (error) {
        console.error(error)
        return null;
    }
}

//verificar la constrasenia
const verifyEncriptedPassword = ( originalPassword, hashPassword ) => {
    try {
        return bcrypt.compareSync (
            originalPassword,           //password Original (123456789)
            hashPassword                //pasword Base de Datos (hash password)
        );

    } catch (error) {
        console.error(error)
        return null;
    }
}

export {
    encryptedPassword,
    verifyEncriptedPassword
}