import http from 'http';
import express from 'express';
import path from 'path';
import router from '../routes/productos.js';
// const router = require('../routes/productos')
// const { initWsServer } = require('./socket');
import { initWsServer } from './socket.js';
import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express()
const httpServer = http.Server(app);
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended : true}))


//Config pug
const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('views', viewsFolderPath)
app.set('view engine', 'pug')

initWsServer(httpServer);


app.use('/', router)

app.get('/', async (req, res) => {
    res.render('main');
  });

// module.exports = myHttpServer;
export default httpServer;