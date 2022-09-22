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

    constructor(nombre, appellido) {

        this.nombre = nombre
        this.appelido = appellido
        this.mascotas = []
        this.books = []
    }

    

    getFullName() {

        return `Nombre: ${this.nombre} Apellido: ${this.appelido}`

    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    addBook(nombre, autor) {

        this.books.push({ nombre : nombre, autor : autor})
        
    }

    countMascotas() { return this.mascotas.length}

    getBookNames() {

        let booksArray = []
        this.books.forEach(book => {
            booksArray.push(book.nombre)
        });
        return booksArray

    }

}


const user = new Usuario('Julio' , 'Otero')
user.addBook("Rayuela" , "Cortazar")
user.addBook("Agilmente" , "Bachrach")
user.addMascota("IPA")


console.log(user.getFullName())
console.log("Cantidad de mascotas ",user.countMascotas())
console.table(user.getBookNames())




