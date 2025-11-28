import express from 'express' 

const router = express.Router();

router.get( '/', ( req, res ) => {
    res.json({ msg: 'Obtiene todos los usuarios' });
} );

router.post( '/', ( req, res ) => {
    res.json({ msg: 'Crear un usuario' });
} );

router.put( '/', ( req, res ) => {
    res.json({ msg: 'Actualiza todos las propiedades del usuario' });
} );

router.patch( '/', ( req, res ) => {
    res.json({ msg: 'Actualiza parcialmente 1 o todas las propiedades del usuario' });
} );

router.delete( '/', ( req, res ) => {
    res.json({ msg: 'Elimina un usuario' });
} );

// router.get('/alo', (req, res) => {
//     res.send('<h1>alo</h1>')
// });

export default router;