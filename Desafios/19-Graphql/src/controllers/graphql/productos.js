import { getAllProducts, saveProduct } from "../../services/products.js";

export async function getAllProductsCtr() {
  const allProduct = await getAllProducts();
  return allProduct;
}

// export async function getNewCtr(args) {
//     const { id } = args;
//     const news = await getNew(id);
//     return news
// }

export async function createProductCtr({ data }) {
  const prodObj = { ...data };
  const newProd = await saveProduct(prodObj);
  return newProd;
}
