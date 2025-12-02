import express from 'express' 
import userModel from '../models/User.models.js';

const router = express.Router();



router.post( '/', async ( req, res ) => {
    const data = req.body;

    console.log( data);

    //Registrar los datos usando el userModel
   const dataRegistered = await userModel.create( data );   //Registrar los datos en la base de datos

    // Responder al cliente
    res.json({ msg:'create users',
         //data: data,             // Forma tradicional
         dataRegistered            // ECMAScript 2015 
    });
});

export default router;