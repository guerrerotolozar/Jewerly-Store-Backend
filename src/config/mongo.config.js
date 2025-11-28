import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/db-foodz';


const dbConnection = async () => {

    try{
        await mongoose.connect(MONGO_URI, {} );

        console.log('si sirvio')
    }
    catch (error){
        //console.log(error);
        console.log('error al inicar la base de datos')
    }

}
'./config/mongo.config.js'
export default dbConnection
