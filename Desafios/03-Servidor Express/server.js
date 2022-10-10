const http = require('http')
const express = require('express')
const fs  = require("fs");
const Contenedor = require("./contenedor");

const path = require('path') 
const filePath = path.join(__dirname, 'productos.txt');




const app = express()

const PORT = process.env.PORT || 8000

const server = app.listen(PORT , () => {
    console.log("Servidor corriendo")
})

const miContenedor = new Contenedor(filePath)

app.get('/productos', (req,res) => {

    try {
        
        const productos = miContenedor.getAll()
        // const data = fs.readFileSync(miContenedor, 'utf-8')
        console.log(productos)
        // res.send(JSON.parse(productos))
        res.send(productos)

    } catch (error) {   
        console.log(error)
    }  

})

app.get('/productoRandom', (req,res) => {

    try {  
        // console.log(filePath)
        const productos = miContenedor.getAll()
        // const data = fs.readFileSync(filePath, 'utf-8')
        // const productos = JSON.parse(data)
        // console.log(productos) 
        const num = Math.floor(Math.random() * (productos.length - 1))
        console.log("RANDOMMMMMMM " , num)
        const random = productos[num] 
        console.log(random)
        res.send(random)


    } catch (error) {   
        console.log(error)
    }  

})