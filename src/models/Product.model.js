import {Schema, model} from 'mongoose';



const productSchema = new Schema(
{
    // Básico
    name: { 
        type: String,
        required: true, 
        trim: true 
    },
    urlImage: { 
        type: String,
        required: false, 
        trim: true 
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: false
    },
    description: { 
        type: String, 
        required: false, 
        trim: true },

    // Precio / estado
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },

    isActive: { 
        type: Boolean, 
        default: true },

    // Material
    material: {
        type: String,
        required: true,
        trim: true,
        enum: ["oro", "plata", "acero", "otro"],
    },
    purity: {
        type: String,
        required: false,
        trim: true, // ej: "18K", "14K", "925"
    },
    color: { 
        type: String, 
        required: false, 
        trim: true 
    }, // ej: "amarillo", "blanco", "rosa"

    // Medidas

    size: { 
        type: String, 
        required: false, 
        trim: true 
    }, // ej: talla anillo "7" o largo collar "45cm"

    weightGrams: { 
        type: Number, 
        required: true, 
        min: 0 
    },

    // Piedras (si tiene)
    gemstone: {
        type: String,
        required: false,
        trim: true, // ej: "diamante", "esmeralda", "circonia"
    },
    gemstoneCarats: { 
        type: Number, 
        required: false, 
        min: 0 },

    // Certificado (si aplica)
    certificate: { 
        type: String, 
        required: false, 
        trim: true }, // ej: "GIA", "IGI", "Interno"
    certificateNumber: { 
        type: String, 
        required: false, 
        trim: true },
},
{
    versionKey: false,
    timestamps: true,
}
);

const productModel = model(
    'product', // nombre de la lista(coleccion) de datos de los ususarios
    productSchema // nombre del esquema asociado al modelo 

);

export default productModel;