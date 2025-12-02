import userModel from "../models/User.models.js"
// El servicio: se debe encargar solo de la comunicacion directa con la base de datos 
const registerUser = async( newUser) => {
  return await userModel.create ( newUser);   // async/await porque el modelo retorna una promesa
}

export {
    registerUser
}