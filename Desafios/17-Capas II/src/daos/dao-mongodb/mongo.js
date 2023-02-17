import mongoose from "mongoose";
import { prodcutModel } from "../../models/productos.js";
import dotenv from "dotenv";
dotenv.config();

// export const initMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGOURL);
//         console.log('Conectado a Mongo!');
//     } catch (error) {
//         console.log(error);
//     }
// };

export const save = async (doc) => {
  try {
    const document = await prodcutModel.create(doc);
    return document;
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async () => {
  try {
    const docs = await ProductsModel.find({});
    return docs;
  } catch (error) {
    console.log(error);
  }
};
