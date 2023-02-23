import { prodcutModel } from "../models/productos.js";
import mongoose from "mongoose";
import app from "../index.js";
import request from "supertest";

describe("Test de productos", () => {
  // beforeEach(async() => {
  //     await mongoose.connections.collect
  // }

  xit("CREAR PRODUCTO", async () => {
    const prod = {
      nombre: "Juguete",
      descripcion: "Juguete Azul",
      codigo: "123123123",
      foto: "fotourl",
      precio: 1000,
      stock: 300,
    };

    const response = await request(app).post("/api/productos").send(prod);
    console.log(response);
    expect(response.status).toBe(200);
  });

  xit("MODIFICAR", async () => {
    const prod = {
      nombre: "Juguete a modificar",
      descripcion: "Juguete Azul",
      codigo: "123123123",
      foto: "fotourl",
      precio: 1000,
      stock: 300,
    };

    const responseProd = await prodcutModel.create(prod);
    const upd = {
      nombre: "Juguete MODIFICADO",
      descripcion: "Juguete Azul",
      codigo: "123123123",
      foto: "fotourl",
      precio: 1000,
      stock: 300,
    };
    const response = await request(app)
      .put(`/api/productos/${responseProd._id}`)
      .send(upd);
    expect(response.statusCode).toBe(200);
  });

  it("BORRAR", async () => {
    const prod = {
      nombre: "Juguete a Eliminar",
      descripcion: "Juguete Azul",
      codigo: "123123123",
      foto: "fotourl",
      precio: 1000,
      stock: 300,
    };

    const responseProd = await prodcutModel.create(prod);
    const response = await request(app).delete(
      `/api/productos/${responseProd._id}`
    );
    expect(response.statusCode).toBe(200);
  });
});
