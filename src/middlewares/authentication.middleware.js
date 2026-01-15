import { verifyToken } from "../helpers/jwt.helper.js";

const authenticationUser = ( req, res, next ) => {
    try {

        // Paso 1: Obtener el string donde viene el token
        const token = req.header( 'X-Token' );
        
        // Paso 2: Verifica que la cadena no venga vacía
        if( ! token ) {
            return res.json({ msg: 'Error: Cadena del token vacía' });
        }
    
        // Paso 3: Verificar si el token es válido
        const payload = verifyToken( token );

        // paso 4 :  eliminar esas cosas que son inútiles al ojo 
        delete payload.iat
        delete payload.exp
        
        // Paso 5: Enviar a través del Request los datos del payload
        req.payload = payload;

        // Paso 6: Saltar a la siguiente función definida en la ruta
        next();
        
    } catch (error) {
        console.error( error );
        res.json({ msg: 'Error token inválido' });
    }

}


export default authenticationUser;