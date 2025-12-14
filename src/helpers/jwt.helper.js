import jwt from 'jsonwebtoken';

const generateToken = ( payload ) => {

    try {
        return jwt.sign(
            payload,            // Carga util
            process.env.JWT_SEED, // Semilla (Palabra Secreta) ==> Salt
            { expiresIn: '1h' }                  // Opciones de configuracion del Token
        );

    } catch (error) {
        console.error( error);
        return null
    }

}

const verifyToken = ( token ) => {
    try {
        
        return jwt.verify(
            token,              // Token Valido
            process.env.JWT_SEED // Semilla (Palabra Secreta) ==> Salt
        );
    } catch (error) {
        console.error( error);
        return null
    }
    
}


export {
    generateToken,
    verifyToken
}