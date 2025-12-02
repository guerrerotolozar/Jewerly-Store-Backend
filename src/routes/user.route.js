import {Router} from 'express' 
import userModel from '../models/User.model.js';

const router = Router();


router.post( '/', async ( req, res ) => {
    const data = req.body;           //extraer el cuerpo de la paeticion


    const dataCreate = await userModel.create(data);

    res.json({
        msg: 'crear usuario',
        dataCreate                        //Nueva forma para evitar poner el valor tambien 
    })

} );

// router.get('/alo', (req, res) => {
//     res.send('<h1>alo</h1>')
// });

export default router;