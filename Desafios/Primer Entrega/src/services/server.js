const express = require('express')
const path = require('path')
const router = require('../routes/index')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.use('/', router)



module.exports = app