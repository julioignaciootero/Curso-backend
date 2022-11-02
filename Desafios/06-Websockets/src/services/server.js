const http = require('http');
const express = require('express')
const path = require('path')
const router = require('../routes/productos')
const { initWsServer } = require('./socket');

const app = express()
const myHttpServer = http.Server(app);
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended : true}))


//Config pug
const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('views', viewsFolderPath)
app.set('view engine', 'pug')

initWsServer(myHttpServer);


app.use('/', router)

app.get('/', async (req, res) => {
    res.render('main');
  });

module.exports = myHttpServer;