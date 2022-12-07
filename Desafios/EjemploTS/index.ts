

interface Persona {

    nombre : string,
    apellido: string

}


let nuevaPersona : Persona = {
    nombre : "julio",
    apellido: "Otero"
}

const saludar = ( p : Persona , animo : string ) : string => {

    return `Hola soy ${p.apellido} y hoy estoy ${animo}`

}

const estadoDeAnimo : string = 'contento'
console.log(saludar(nuevaPersona, estadoDeAnimo))
