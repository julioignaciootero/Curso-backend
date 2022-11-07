const express = require('express');
const { route } = require('./carrito');
const routerCarrito = require('./carrito');
const routerProductos = require('./productos');

const router = express.Router();

router.use('/api/productos',  routerProductos);
router.use('/api/carrito',  routerCarrito);

router.use((req, res) => {
    res.status(404).json({
        ok: false,
        error : -2,
        descripcion: `Ruta ${req.path} metodo ${req.method} no implementado `


    })
})

module.exports = router;