const exp = require('constants')
const express = require('express')
const path = require('path')
const router = require('../routes/productos')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true}))


//Config pug
const viewsFolderPath = path.resolve(__dirname, '../../views')
app.set('views', viewsFolderPath)
app.set('view engine', 'pug')

app.use('/', router)



module.exports = app