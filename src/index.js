import express from "express";
import cors from "cors"

import dbConnection from './config/mongo.config.js'
import userRoute from './routes/user.route.js'
import productRoute from './routes/products.route.js'
import categoryRoute from './routes/category.route.js'
import collectionRoute from './routes/collection.route.js'
import authRoute from './routes/auth.route.js'
import cartRoute from './routes/cart.route.js'               // Rutas del carrito de compras
import favoriteRoute from './routes/favorite.route.js'       // Rutas de la lista de favoritos


const app = express();                      // Invocando core Express
const PORT = process.env.PORT || 3030;

// Middlewares
app.use(cors()) // Permite peticiones desde Angular
app.use(express.json())
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/collection', collectionRoute);
app.use('/api/v1/cart', cartRoute);                          // Endpoints del carrito de compras
app.use('/api/v1/favorite', favoriteRoute);                  // Endpoints de la lista de favoritos


dbConnection();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/v1`)
})
