# Primer entrega

Start

npm run dev

Rutas:

Get:

http://localhost:8080/api/productos

http://localhost:8080/api/asdasdasd

http://localhost:8080/api/carrito

http://localhost:8080/api/productos/1



Post:

http://localhost:8080/api/productos

http://localhost:8080/api/productos/1

http://localhost:8080/api/carrito

http://localhost:8080/api/carrito/2/productos


Delete: 

http://localhost:8080/api/productos/1

http://localhost:8080/api/carrito/2

http://localhost:8080/api/carrito/2/productos/2

PUT:

http://localhost:8080/api/productos/



BODIES:

Producto:

    {

        "nombre": "Cuaderno",
        "descripcion" : "asdasd",
        "codigo" : "0987654321",
        "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-48.png",
        "precio" : 9000,
        "stock" : 100

    }
    




Carrito:

    {
        "productos":[    
        {"id": 1, "cantidad": 7},    
        {"id": 2, "cantidad": 7}]
    }  
    

Producto -> Carrito:

{

    "id" : 4,
    "cantidad" : 10

}

