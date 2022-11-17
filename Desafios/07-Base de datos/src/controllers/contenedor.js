// const fs  = require("fs");
// const path = require('path')

import fs from 'fs'
import path from 'path'
import {DBService } from '../services/db.js'

const rutaArchivo = "C:/Curso-backend/Desafios/07-Base de datos/src/productos.txt"



class Contenedor {

    constructor() {
        this.path = rutaArchivo
    }

	async save(element) {
		
		if (!element.title || typeof element.title !== 'string' || !element.price) throw new Error('Datos invalidos');
        const prod = {
            title : element.title,
            price : element.price,
            thumbnail : element.thumbnail
        }
        await DBService.create('productos', { prod})
		// const data = await this.readFileFn();
		// let id = 1;

		// if (data.length) {
			
		// 	id = data[data.length - 1].id + 1;
		// }

		// const nuevoProducto = {
		// 	title: element.title,
		// 	price: parseInt(element.price),
		// 	thumbnail: element.thumbnail,
		// 	id: id,
		// };

		// data.push(nuevoProducto);

		// await this.writeProducts(data)
		// console.log(`ID nuevo: ${nuevoProducto.id}`);

		return prod;
	}

	
	async getAll() {
		try {
			const data = JSON.parse(JSON.stringify(await DBService.getAll("productos")));
			return data

		} catch {
			console.log('Error al obtener todos los datos');
		}
	}

    
      getById(id) {
        
        try {
            prod = DBService.get('productos', id)
            return prod
        } catch (error) {
            console.log(error)
            return false
        }

    }

    async updateById(id, prod) {

        try {
            DBService.updateById('productos', id, prod)
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }
    async deleteById(id) {

        // const all = this.getAll()       //Traigo todos los productos

        // const newFile = all.filter(prod => { return prod.id != id })           //Filtro para hacer deshacerme del producto con ID del parametro
        // if (newFile) {
        //     console.table(newFile);
          
        //     fs.writeFile(this.path, JSON.stringify(newFile), (err) => { if (err) {console.log(err);}})         //Guardo
        
        // }

        try {
            DBService.deleteById(id)
            return true
        } catch (error) {
            console.log(error)  
            return false 
        }
        

    }

}


// const miContenedor = new Contenedor(filePath)

const miContenedor = new Contenedor()

export default miContenedor
// module.exports = {
// 	miContenedor: container
// } 