const fs  = require("fs");
const path = require('path')
const filePath = path.resolve(__dirname, "../productos.txt");


class Contenedor {

    constructor(ruta) {
        this.path = ruta
    }

    //Limpio todo el contenido del archivo usando Async Await
    async deleteAll() {

        try {
            await fs.promises.writeFile(this.path , '')
            console.log("Contenido eliminado")
        } catch (err) {
            console.log(err)
        }

    }


	async update(element) {

		if (!element.id || !element.nombre || typeof element.nombre !== 'string' || !element.precio) throw new Error('Datos invalidos');
 
        const data = await this.readFileFn();

        const nuevoProducto = {
            id: element.id,
            timeStamp : Date.now(),
            nombre : element.nombre,
            descripcion : element.descripcion,
            codigo : element.codigo,
            foto : element.foto,
            precio : element.precio,
            stock : element.stock
          }
        

		const index = data.findIndex((d) => d.id == element.id)

        if (index) {
            console.log(data)
            data[index] = nuevoProducto
            console.log(nuevoProducto)
            console.log(data)

            await this.writeProducts(data)
            return true;
            
        } else {
            return false
        }

	}

	async save(element) {
		
		if (!element.nombre || typeof element.nombre !== 'string' || !element.precio) throw new Error('Datos invalidos');

		const data = await this.readFileFn();
		let id = 1;

		if (data.length) {
			
			id = data[data.length - 1].id + 1;
		}

        
		// const nuevoProducto = {
		// 	title: element.title,
		// 	price: parseInt(element.price),
		// 	thumbnail: element.thumbnail,
		// 	id: id,
		// };
        
        const nuevoProducto = {
            id: id,
            timeStamp : Date.now(),
            nombre : element.nombre,
            descripcion : element.descripcion,
            codigo : element.codigo,
            foto : element.foto,
            precio : element.precio,
            stock : element.stock
          }

		data.push(nuevoProducto);

		await this.writeProducts(data)
		console.log(`ID nuevo: ${nuevoProducto.id}`);

		return nuevoProducto;
	}

	
	async getAll() {
		try {
			const data = this.readFileFn();
			return data

		} catch {
			console.log('Error al obtener todos los datos');
		}
	}

    
    async getAllAsync() {
        
        //Mismo anterior pero async
        try {
            const data = await fs.promises.readFile(this.path , 'utf-8')
            if (data) {
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
            return []
        }

    }

	async readFileFn() {
		
		const contenido = await fs.promises.readFile(this.path, 'utf-8');
        
		return JSON.parse(contenido);
	}

	async writeProducts(productos) {
		
		const data = JSON.stringify(productos, null, 4)
		await fs.promises.writeFile(this.path, data)
	}    

    async getById(id) {
        
        let prod = {}

        try {
            const productos = await this.getAll()             //Obtengo todos los productos
            console.log(productos)
            prod = productos.find(p => p.id == id )     //Me quedo con el del ID del parametro
            if (!prod) {
                prod = null
            }
            
        } catch (error) {
            console.log(error)
        }   

        return prod

    }

    async deleteById(id) {

        const all = await this.getAll()       //Traigo todos los productos

        const newFile = all.filter(prod => { return prod.id != id })           //Filtro para hacer deshacerme del producto con ID del parametro
        if (newFile) {
            console.table(newFile);
          
            fs.writeFile(this.path, JSON.stringify(newFile  , null, 4), (err) => { if (err) {console.log(err);}})         //Guardo
            return true
        }
        return false
    }

}


const container = new Contenedor(filePath)

module.exports = {
	miContenedor: container
} 