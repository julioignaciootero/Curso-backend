const express = require('express');
const routerProductos = require('./productos');


const router = express.Router();

router.use('/productos', routerProductos);
router.use('/saludo', async (req, res) => {
    res.status(200).json({
        msg: "Hola mundo"
    })
});


module.exports = router;