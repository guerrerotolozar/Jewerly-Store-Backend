// desesctructura y "saca" unicamente la clase Schema de el programa mongoose
import {Schema, model} from 'mongoose';



const userSchema = new Schema({
    name:/*"Ronald"*/{
        //Reglas
        type : String,
        required : true,
        //Modificador
        trim : true // Esto ayuda a quitar espacios delante y/o detras de lo escrito 
        },
    username:/*"guerrerotolozar"*/{
        type : String,
        required : true,
        trim : true,
        unique : true, //Imposibilita el que exista mas de un "username" con las mismas propiedades
        lowercase: true //Pide que todo sea en minuscula 
    },
    email:/*"guerrerotoloza.ro@gmail.com"*/{
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true
    },
    password:/*"2554"*/{
        type : String,
        required : true,
        trim: true,
        minLength : 6,
    },
    role:/*"admin"*/{
        type : String,
        require : true,
        enum : ['admin','colaborator','registered'], // Crear "predeterminados"
        default: 'registered'
    },
    isActive : {
        type : Boolean,
        default : true
    },
    // code : {
    //     type : String,
    //     trim : true
    // }
},{
    versionKey : false,
    timestamps: true
});

const userModel = model(
    'users', // nombre de la lista(coleccion) de datos de los ususarios
    userSchema // nombre del esquema asociado al modelo 

);


export default userModel;
