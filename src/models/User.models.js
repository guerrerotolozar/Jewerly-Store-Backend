import { Schema, model } from 'mongoose';

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,           //Define el tipo
        required: true,         //Es obligatorio
        // modificador
        unique: true,           // Obliga a que el valor sea unico
        trim: true,             // Elimina los espacios en blanco (inicio/final del string)
        lowercase: true         // Transforma todo a minusculas 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true, 
        trim: true,
        minLenght: 8,
        maxLenght: 12,
    },
    role: {
        type: String, 
        required: true,
        enum: ['super-admin','admin', 'colaborator', 'editor', 'registered'],
        default: 'registered',
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createDate: {
        type: Date,
        default: new Date().now
    },
    // code: {
    //     type: String,
    //     trim: true
    // }
    // isVerified: {
    //     code: String,
    //     trim: true
    // }
},{});
// Crear el modelo User basado en el esquema userSchema 
const userModel = model (
    'users',                        // Nombre de la coleccion en singular 'User'
     userSchema                      //Esquema asociado al modelo 
);

// Exportando el modelo User, paraque sea usado en otras partes de la aplicacion
export default userModel; 