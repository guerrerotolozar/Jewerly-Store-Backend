const withoutRole = (req, res, next) => {
    console.log('Middleware que elimina la propiedad role/roles del body');
    //paso 1: Eliminar ambas propiedades para evitar inyección de roles

    delete req.body.role;
    delete req.body.roles;
    next();
}


export default withoutRole;