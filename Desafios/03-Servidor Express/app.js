const http = require('http')
const express = require('express')
const fs  = require("fs");

const path = require('path') 
const filePath = path.join(__dirname, 'productos.txt');


// const server = http.createServer((req, res) => {
//     res.end("Hola mundo")
// })


// const connectedServer = server.listen(8080 , () => {
//     console.log("Servidor corriendo");
// })


const app = express()

const PORT = 8080

const server = app.listen(PORT , () => {
    console.log("Servidor corriendo")
})

app.get('/productos', (req,res) => {

    try {
        console.log(filePath)
        const data = fs.readFileSync(filePath, 'utf-8')
        res.send(JSON.parse(data))

    } catch (error) {   
        console.log(error)
    }  

})

app.get('/productoRandom', (req,res) => {

    try {
        console.log(filePath)
        const data = fs.readFileSync(filePath, 'utf-8')
        const productos = JSON.parse(data)
        console.log(productos) 
        const num = Math.floor(Math.random() * (productos.length - 1))
        console.log("RANDOMMMMMMM " , num)
        random = productos[num] 
        console.log(random)
        res.send(random)


    } catch (error) {   
        console.log(error)
    }  

})