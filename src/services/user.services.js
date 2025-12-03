import userModel from "../models/User.models.js"
// El servicio: se debe encargar solo de la comunicacion directa con la base de datos 
const dbRegisterUser = async( newUser) => {
  return await userModel.create ( newUser);   // async/await porque el modelo retorna una promesa
}

const dbGetAllUser = async () => {
     await userModel.find();
}

export {
    dbRegisterUser,
    dbGetAllUser
}