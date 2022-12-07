var nuevaPersona = {
    nombre: "julio",
    apellido: "Otero"
};
var saludar = function (p, animo) {
    return "Hola soy ".concat(p.apellido, " y hoy estoy ").concat(animo);
};
var estadoDeAnimo = 'contento';
console.log(saludar(nuevaPersona, estadoDeAnimo));
