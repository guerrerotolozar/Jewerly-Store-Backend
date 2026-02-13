// desesctructura y "saca" unicamente la clase Schema de el programa mongoose
import {Schema, model} from 'mongoose';
import { ALLOWED_ROLES, ROLES } from '../config/global.config.js';



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
        match : [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ]
        //^ y $ → inicio y fin del string.                                                                                              \
        // [a-zA-Z0-9._%+-]+ // Limita y asegura que estos caracteres esten presentes en la parte inical del correo aun antes de una @   |
            // letras mayúsculas/minúsculas                                                                                              |
            // números                                                                                                                   |
            // . _ % + -                                                                                                                 |
        // @ → literal.                                                                                                                  |
        //                                                                                                                                > Regex
        // [a-zA-Z0-9.-]+ // Limita y asegura la estructura del dominio que puede llevar                                                 |
            // letras mayúsculas/minúsculas                                                                                              |
            // números                                                                                                                   |
            // . - (caso hipotetico puede ser algo como sub.dominio.com (un . extra) )                                                   |
        // \. → el punto antes de com, co, etc.                                                                                          |
        // [a-zA-Z]{2,} → mínimo 2 letras, sin límite superior (com, info, museum, etc).                                                /

    },
    password:/*"2554"*/{
        type : String,
        required : true,
        trim: true,
        minlength : 6,
        // match : [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        // ]
    },
    role:/*"admin"*/{
        type : String,
        require : true,
        enum : ALLOWED_ROLES, // Crear "predeterminados"
        default: ROLES.REGISTERED
    },
    userStatus : {
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
