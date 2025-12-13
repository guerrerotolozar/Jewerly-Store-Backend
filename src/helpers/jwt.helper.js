import jwt from 'jsonwebtoken';

const generateToken = ( payload ) => {

    try {
        return jwt.sign(
            payload,            // Carga util
            'siax%haecn$cfxny', // Semilla (Palabra Secreta) ==> Salt
            { expiresIn: '1h' }                  // Opciones de configuracion del Token
        );

    } catch (error) {
        console.error( error);
        return null
    }

}

const verifyToken = ( token ) => {
    return jwt.verify(
        token,              // Token Valido
        'siax%haecnhcfxny', // Semilla (Palabra Secreta) ==> Salt
    );
}


export {
    generateToken,
    // verifyToken
}