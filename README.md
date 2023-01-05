#Desafio PROXY

pm2 start ./src/index.js --port=8080 --modo=fork


pm2 start ./src/index.js --port=8081 --modo=cluster


pm2 start ./src/index.js --port=8082 --modo=fork


pm2 start ./src/index.js --port=8083 --modo=fork




Archivo NGINX subido al repo.

#Desafio MOCK/Normalizr


Rutas:

localhost:8080/api/productos/productos-test

localhost:8080/api/mensajes/original

localhost:8080/api/mensajes/normalizada

localhost:8080/api/mensajes/desnormalizada




# Segunda entrega

Start

npm run dev

Rutas:

Get:

http://localhost:8080/api/productos

http://localhost:8080/api/carritos

http://localhost:8080/api/productos/6383f209774ebfd0ba0262cb

http://localhost:8080/api/carritos/6387e61d1aa4c4d0d06de89c



Post:

http://localhost:8080/api/productos


    {

        "nombre": "Cuaderno",
        "descripcion" : "asdasd",
        "codigo" : "0987654321",
        "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-48.png",
        "precio" : 9000,
        "stock" : 100

    }


http://localhost:8080/api/carrito

    {

        "productos" : [
            {
                "producto" : "6383f209774ebfd0ba0262cb",
                "cantidad" : 2
            }
        ]
    }
    

Agregar producto al carrito: 
http://localhost:8080/api/carritos/63853c1f130ce2e0e8bfcf11



            {
                "producto" : "6383f98e150ba7bb9a9b60a9",
                "cantidad" : 2
            }
            

Delete: 

http://localhost:8080/api/productos/6383f98e150ba7bb9a9b60a9

http://localhost:8080/api/carritos/63853c1f130ce2e0e8bfcf11



PUT:

http://localhost:8080/api/productos/6383f98e150ba7bb9a9b60a9

    {

        "nombre": "Cuaderno2",
        "descripcion" : "asdasd",
        "codigo" : "0987654321",
        "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-48.png",
        "precio" : 9000,
        "stock" : 100

    }



