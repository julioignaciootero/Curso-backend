const fs  = require("fs");



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

    //Guardar producto
    save(obj) {

        let newId = 0
        const all = this.getAll()  //obtengo todos los productos
        if (all.length > 0) { 
            
            newId = all[all.length - 1].id + 1   //Si hay productos el ID es el ultimo +1

        }else{

            newId++           //Si no hay productos el ID es 1
        }

            obj.id = newId     //Le asigno el id al nuevo producto
            all.push(obj)      //Lo agrego
            console.table(all)

            fs.writeFileSync(this.path, JSON.stringify(all), (err) => { if (err) {console.log(err);}})   //Lo guardamos en el archivo

            return newId

    }

    getAll() {

        // Leo el archivo y lo parseo para mostrar un array 
        try {   
            const data = fs.readFileSync(this.path , 'utf-8' )  
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

    getById(id) {
        
        let prod = {}

        try {
            const productos = this.getAll()             //Obtengo todos los productos
            prod = productos.find(p => p.id == id )     //Me quedo con el del ID del parametro
            if (!prod) {
                prod = null
            }
            
        } catch (error) {
            console.log(error)
        }   

        return prod

    }

    deleteById(id) {

        const all = this.getAll()       //Traigo todos los productos

        const newFile = all.filter(prod => { return prod.id != id })           //Filtro para hacer deshacerme del producto con ID del parametro
        if (newFile) {
            console.table(newFile);
          
            fs.writeFile(this.path, JSON.stringify(newFile), (err) => { if (err) {console.log(err);}})         //Guardo
        
        }

    }

}


module.exports = Contenedor