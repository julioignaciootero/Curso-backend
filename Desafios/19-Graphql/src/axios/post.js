import axios from "axios";

const url = "http://localhost:8080/api/productos";
const prod = {
  nombre: "Mochila",
  descripcion: "Mochila grande",
  codigo: "123123123",
  foto: "fotourl",
  precio: 1000,
  stock: 300,
};
export const postProducto = async () => {
  console.log("Ejecutar POST");

  try {
    const response = await axios.post(url, prod);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
