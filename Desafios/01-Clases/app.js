class Usuario {

    // nombre string
    // appelido 
    // stringlibros objet[]
    // mascotas string[]
    // pasar a travez de constructor

    // getfullname() : string retorna nombre con template
    // addMascota(string) : void agrega la mascota al array
    //countMascotas() : number
    // addBook(string, string) : voud nombre y autor, y lo agrega
    // getBookNames() : string[] retorna un array con solo los nombres 

    //Constructo con propiedades, parametro Nombre y Apellido
    constructor(nombre, appellido, masc = []) {

        this.nombre = nombre
        this.appelido = appellido
        this.mascotas = masc
        this.books = []
    }

    
    // Funcion que devuelve el nombre completo
    getFullName() {

        return `Nombre: ${this.nombre} , Apellido: ${this.appelido}`

    }
    
    //Agregar una mascota al array de mascotas
    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    //Agregar un libro al array de objs
    addBook(nombre, autor) {

        this.books.push({ nombre : nombre, autor : autor})
        
    }

    //Funcion que devuelve cantidad de mascotas
    countMascotas() { return this.mascotas.length}

    //Funcion que devuelve un array de nombre de libros
    getBookNames() {

        let booksArray = []
        this.books.forEach(book => {
            booksArray.push(book.nombre)
        });
        return booksArray

    }

}


const user = new Usuario('Elon' , 'Musk', ["Perro", "gatito", "loro"])  //Creamos un usuario Elon Musk
user.addBook("El señor de las moscas" , "William Golding")  //Agrego primer libro
user.addBook("Fundacion" , "Isaac Asimov") //Agrego segundo libro
// user.addMascota("Perro")   //Agrego mascota 1
// user.addMascota("Gato")    //Agrego mascota 2



console.log("Cantidad de mascotas ",user.countMascotas())   
console.log(user.getBookNames())
console.log(user.getFullName())




