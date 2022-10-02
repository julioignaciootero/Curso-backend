const fs = require('fs');
const Contenedor = require("./contenedor");
const Producto = require('./producto');

//Creo un contenedor para el archivo
const miContenedor = new Contenedor('02-Manejo de archivos/.productos.txt')

//Creo tres productos
const producto1 = new Producto("Escuadra", 100 , "url1")
const producto2 = new Producto("Calculadora", 200 , "Calculadora.png")
const producto3 = new Producto("Globo terraqueo", 300 , "urlGlobo")


//Los agrego con el metodo SAVE de contenedor, el cual devuelve el ID generado
// console.log("ID nuevo: " , miContenedor.save(producto1))
// console.log("ID nuevo: " , miContenedor.save(producto2))
// console.log("ID nuevo: " , miContenedor.save(producto3))

//Borraar el contenido del archivo
// miContenedor.deleteAll()

//Obtener todos los productos
console.log(miContenedor.getAll())



//Elimino el producto con el ID 2
// miContenedor.deleteById(2)

//Obtengo por el numero de ID
console.log("ID 2: " ,  miContenedor.getById(2))
