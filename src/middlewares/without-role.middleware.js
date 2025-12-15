const withoutRole = ( req, res, next ) => {
    console.log( 'Middleware que elimina la propierdad role del boddy' );
    //paso 1

    delete req.body.role
    next();
}


export default withoutRole;