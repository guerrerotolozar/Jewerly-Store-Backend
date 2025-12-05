import categoryModel from "../models/category.model.js"
// El servicio: se debe encargar solo de la comunicacion directa con la base de datos 
const dbRegisterCategory = async( newC) => {
  return await categoryModel.create ( newcategory);   // async/await porque el modelo retorna una promesa
}

const dbGetAllCategory = async () => {
    return  await categoryModel.find();
}

const dbGetCategoryById = async ( _id ) => {
    return await categoryModel.findOne({_id }); 
}

const dbDeletCategoryById = async (_id ) => {
    return await categoryModel.findByIdAndDelete({_id})
}

export {
    dbRegisterCategory,
    dbGetAllCategory,
    dbGetCategoryById,
    dbDeletCategoryById
}