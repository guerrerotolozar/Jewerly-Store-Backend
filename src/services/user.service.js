import userModel from "../models/User.model.js"
// El servicio: se debe encargar solo de la comunicacion directa con la base de datos 
const dbRegisterUser = async (newUser) => {
  return await userModel.create(newUser);   // async/await porque el modelo retorna una promesa
}

const dbGetAllUsers = async () => {
  return await userModel.find({ isActive: true });
}

const dbGetUserById = async (_id) => {
  return await userModel.findOne({ _id, isActive: true });
}

const dbGetUserByEmail = async (email) => {
  return await userModel.findOne({ email, isActive: true });
}

const dbDeleteUserById = async (_id) => {
  return await userModel.findByIdAndDelete({ _id })
}

export {
  dbRegisterUser,
  dbGetAllUsers,
  dbGetUserById,
  dbGetUserByEmail,
  dbDeleteUserById
}