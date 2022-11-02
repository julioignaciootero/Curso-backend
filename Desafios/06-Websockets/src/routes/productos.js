const { Router } = require('express')
const {miContenedor} = require('../controllers/contenedor')
const { socketEmit } = require('../services/socket')


const router = Router()


router.get('/', async (req, res) => {
    // res.render('index'); 

    try {
        
        
        const obj = await miContenedor.getAll()
        
        res.render('index', {
            productos: obj,
            titulo: 'Listado de productos'
        })
    } catch (err) {
        next(err);
    }

});

router.get('/productos', async (req, res, next) => {
    try {
        
        
        const obj = await miContenedor.getAll()
        console.log(obj)
        res.render('productos', {
            productos: obj,
            titulo: 'Listado de productos'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/productos', async (req, res,) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        const prod = await miContenedor.save({ title, price, thumbnail })
        // res.redirect('/productos');

        socketEmit('producto', prod);

    } else {
        res.send('Error de datos');
    }

})

module.exports = router