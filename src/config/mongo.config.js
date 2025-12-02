import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/db-jewerly-store';


const dbConnection = async () => {

    try{
        await mongoose.connect(MONGO_URI, {} );

        console.log('si sirve')
    }
    catch (error){
        //console.log(error);
        console.log('error al inicar la base de datos')
    }

}
'./config/mongo.config.js'
export default dbConnection
