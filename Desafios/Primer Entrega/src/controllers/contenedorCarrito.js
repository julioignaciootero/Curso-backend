//id, timestamp(carrito), productos: 
//{ id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
const fs  = require("fs");
const path = require('path')
const filePath = path.resolve(__dirname, "../carritos.txt");


class Contenedor {

    constructor(ruta) {
        this.path = ruta
    }

	async getAll() {
		try {
			const data = this.readFileFn();
			return data

		} catch {
			console.log('Error al obtener todos los datos');
		}
	}

    async readFileFn() {
		
        const contenido = await fs.promises.readFile(this.path, 'utf-8');
        if (contenido) {
            return JSON.parse(contenido);
        } else {
            return []
        }
        
    }


    async save(element) {
		
		if (!element) throw new Error('Datos invalidos');
        let data = []
		data = await this.readFileFn();
		let id = 1;

		if (data.length) {
			
			id = data[data.length - 1].id + 1;
		}
       
        const nuevoCarrito = {
            id: id,
            timeStamp : Date.now(),
            productos: element.productos
          }

		data.push(nuevoCarrito);

		await this.writeCarrito(data)
		console.log(`ID nuevo: ${nuevoCarrito.id}`);

		return nuevoCarrito.id;
	}

    async writeCarrito(carritos) {
		
		const data = JSON.stringify(carritos, null, 4)
		await fs.promises.writeFile(this.path, data)
	}    

    async getById(id) {
        
        let carrito = {}

        try {
            const carritos = await this.getAll()             //Obtengo todos los productos
            console.log(carritos)
            carrito = carritos.find(c => c.id == id )     //Me quedo con el del ID del parametro
            if (!carrito) {
                carrito = null
            }
            
        } catch (error) {
            console.log(error)
        }   

        return carrito

    }

	async deleteById(id) {

        const all = await this.getAll()       //Traigo todos los productos

        const newFile = all.filter(carrito => { return carrito.id != id })           //Filtro para hacer deshacerme del producto con ID del parametro
        if (newFile) {
            console.table(newFile);
          
            fs.writeFile(this.path, JSON.stringify(newFile  , null, 4), (err) => { if (err) {console.log(err);}})         //Guardo
            return true
        }
        return false
    }

	async addProduct(id, producto) {

		try {
			const data = await this.getAll()
			if (data) {
				
				data.forEach(d => {
					
					if (d.id == id) {
						d.productos.push(producto)
					}

				});

				await this.writeCarrito(data)

			} else {
				return false
			}
		} catch (error) {
			console.log(error)
			return false
		}

        return true

    }

	async deleteProduct(id, producto) {

		try {
			const data = await this.getAll()
			if (data) {
				
				data.forEach(d => {
					
					if (d.id == id) {
						
						console.log(d.productos.length)
						const index = d.productos.findIndex((p) => p.id == producto)
						if (index) {
							console.log("index ecnontrado")
							d.productos.splice(index, 1)

						} else {
							return false
						}

					}
					console.log(d.productos.length)
				});

				await this.writeCarrito(data)

			} else {
				return false
			}
		} catch (error) {
			console.log(error)
			return false
		}

        return true

    }


}

const container = new Contenedor(filePath)

module.exports = {
	miContenedor: container
} 


