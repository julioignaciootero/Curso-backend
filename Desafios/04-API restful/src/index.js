const express = require("express")
const path = require('path')
const miRouter = require('./routes/index')


const app = express()
const port = 8080
const server = app.listen( port , () => {
    console.log("Servidor corriendo!!")
})

server.on('error', (err) => {
    console.log('Error: ', err);
  });

app.use(express.json())
app.use(express.urlencoded({extended: true}))



const publicPath = path.resolve(__dirname, '../public')
app.use(express.static(publicPath))

app.use('/api', miRouter)

app.use((req, res, next) => {
  console.log(req)
  res.status(404).send(
      "<h1>Pone bien la pagina amigo, no sabes escribir?</h1>")
})