import express from "express"
import cors from "cors"

import dbConnection from './config/mongo.config.js'
import userRoute from './routes/user.route.js'
import productRoute from './routes/products.route.js'
import categoryRoute from './routes/category.route.js'
import collectionRoute from './routes/collection.route.js'
import authRoute from './routes/auth.route.js'

const app = express()
const PORT = process.env.PORT || 3030

// Middlewares
app.use(cors()) // Permite peticiones desde Angular
app.use(express.json())

// Rutas
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/collection', collectionRoute)

// DB
dbConnection()

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/v1`)
})
