import collectionModel from "../models/collection.model.js"
// El servicio: se debe encargar solo de la comunicacion directa con la base de datos 
const dbRegistercollection = async( newcollection) => {
  return await collectionModel.create ( newcollection);   // async/await porque el modelo retorna una promesa
}

const dbGetAllcollection = async () => {
    // return  await collectionModel.find().populate('parent');

    return await collectionModel
        .find({ isActive: true })          // solo activas (opcional)
        .select('name slug parent isActive') // selecciona solo lo necesario
        .sort({ name: 1 });               // 1 = ascendente
}

const dbGetcollectionById = async ( _id ) => {
    return await collectionModel.findOne({_id }); 
}

const dbDeletcollectionById = async (_id ) => {
    return await collectionModel.findByIdAndDelete({_id})
}

export {
    dbRegistercollection,
    dbGetAllcollection,
    dbGetcollectionById,
    dbDeletcollectionById
}