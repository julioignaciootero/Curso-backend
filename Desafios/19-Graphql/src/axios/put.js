import axios from "axios";

const url = "http://localhost:8080/api/productos/63f7c0270ac8ef379cf13e22";
const prod = {
  nombre: "Mochilita",
  descripcion: "Mochilita",
  codigo: "123123123",
  foto: "fotourl",
  precio: 1000,
  stock: 300,
};
export const putProducto = async () => {
  console.log("Ejecutar PUT");

  try {
    const response = await axios.put(url, prod);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
