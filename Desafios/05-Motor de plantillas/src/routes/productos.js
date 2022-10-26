const { Router } = require('express')
const {miContenedor} = require('../controllers/contenedor')


const router = Router()


router.get('/', (req, res) => {
    res.render('index'); 
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
        await miContenedor.save({ title, price, thumbnail })
        res.redirect('/productos');

    } else {
        res.send('Error de datos');
    }

})

module.exports = router