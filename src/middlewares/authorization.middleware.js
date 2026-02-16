import { ALLOWED_ROLES } from "../config/global.config.js";

const authorizationUser = (allowedRoles = [ALLOWED_ROLES]) => {
    return (req, res, next) => {
        try {
            const { roles } = req.payload;

            // Verificar si existen roles en el payload
            if (!roles || !Array.isArray(roles) || roles.length === 0) {
                return res.status(403).json({
                    msg: 'Error: No tiene permisos (Roles no definidos)'
                });
            }

            // Validar si al menos uno de los roles del usuario está en la lista de roles permitidos
            const hasPermission = roles.some(role => allowedRoles.includes(role));
            if (!hasPermission) {
                return res.status(403).json({
                    msg: `Error: Los roles '${roles.join(', ')}' no están autorizados para esta acción`
                });
            }

            console.log(`Usuario autorizado con roles: ${roles.join(', ')}`);
            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error de autorización del servidor' });
        }
    }
}


export default authorizationUser;