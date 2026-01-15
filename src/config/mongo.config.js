import mongoose from 'mongoose';

const MONGO_URI = process.env.DB_URI || 'mongodb://localhost:27017/default';


const dbConnection = async () => {

    try{
        await mongoose.connect(MONGO_URI, {} );

        console.log('si sirve')
    }
    catch (error){
        //console.log(error);
        console.log('error al iniciar la base de datos')
    }

}

export default dbConnection
