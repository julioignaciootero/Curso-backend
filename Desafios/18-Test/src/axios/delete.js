import axios from "axios";
const url = "http://localhost:8080/api/productos/63f7c0270ac8ef379cf13e22";
export const deleteProducto = async () => {
  console.log("Ejecutar DELETE");

  try {
    const response = await axios.delete(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
