const express = require('express')


const router = express.Router()


router.get('/' , (req, res) => {

    res.json({ 
        msg : "Hola desde Carrito"
    })

})


module.exports = router