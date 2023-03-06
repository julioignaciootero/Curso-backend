import { postProducto } from "./post.js";
import { getProductos } from "./get.js";
import { putProducto } from "./put.js";
import { deleteProducto } from "./delete.js";

//probar el put
//await postProducto();
// Porbar el get

//probar el put
// await putProducto();

//probar delete}
await deleteProducto();

const productos = await getProductos();
console.log(productos);
