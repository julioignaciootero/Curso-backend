import { buildSchema } from "graphql";
import {
  getAllProductsCtr,
  //   getProductCtr,
  createProductCtr,
} from "../../controllers/graphql/productos.js";

export const graphqlSchema = buildSchema(`
    input InputProduct {
        nombre: String!
        descripcion: String!
        codigo: String!
        foto: String!
        precio: Int
        stock: Int
    }

    type Product{
        id: String!
        nombre: String!
        descripcion: String!
        codigo: String!
        foto: String!
        precio: Int
        stock: Int
    }
    type Query {
        getProductCtr(id: String!): Product
        getAllProductCtr: [Product]
    }
    type Mutation{
        createProductCtr(data: InputProduct): Product
    }
`);

export const graphqlRoot = {
  getAllProductsCtr,
  //   getProductCtr,
  createProductCtr,
};
