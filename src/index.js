import express from "express";

import dbConnection from './config/mongo.config.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import productRoute from './routes/products.route.js';
import categoryRoute from './routes/category.route.js';
import collectionRoute from './routes/collection.route.js';

const app = express();                      // Invocando core Express
const PORT = 3000;   

dbConnection();

// Middleware Express separar las rutas por entidad 
app.use('/api/v1/auth', authRoute ); //login/register/renewToken 


// app.use('/api/v1/user', require('./routes/user.route.js'/*,'./routes/products.route.js' => no se puede meter 2 en una sola*/))
// // app.use('/api/v1', require('./routes/products.route.js'))  => preferible poner la direccion directamente y no en el archivo
// app.use('/api/v1/product', require('./routes/products.route.js'))
app.use( express.json() );
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/collection', collectionRoute);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/v1`)
});