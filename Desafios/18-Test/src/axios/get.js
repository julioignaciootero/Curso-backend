import axios from "axios";

const url = "http://localhost:8080/api/productos";

export const getProductos = async () => {
  console.log("Ejecutar GET");

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
