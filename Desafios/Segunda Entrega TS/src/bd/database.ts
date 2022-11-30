import mongoose, { mongo } from "mongoose";

const connectionString = 'mongodb://localhost:27017/ecommerce'


export const initMongoDB = async () => {

    try {
        
        await mongoose.connect(connectionString)
        console.log("Conexion con BD exitosa");
        

    } catch (error) {
        console.log(error);
        return error        
    }   

}

