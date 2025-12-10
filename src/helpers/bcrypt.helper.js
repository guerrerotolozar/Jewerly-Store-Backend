import bcrypt from'bcrypt';
//encriptar la contrasenia 
const encryptedPassword = (passwordUser) => {
    const salt = bcrypt.genSaltSync(); // Generar un fragmento o una cadena aleatoria 

    console.log ( salt );       

  const hashPassword = bcrypt.hashSync(
        passwordUser,       // La constrasenia del usuario sin encriptar (123456789)
        salt
    );

    return hashPassword;   //devuelve la contrasenia encriptada 
}
//verificar la constrasenia
const verifyEncriptedPassword = () => {}

export {
    encryptedPassword,
    verifyEncriptedPassword
}