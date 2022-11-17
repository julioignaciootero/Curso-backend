// const { Router } = require('express')
import { Router } from 'express';
// const {miContenedor} = require('../controllers/contenedor')
// const { socketEmit } = require('../services/socket')
import miContenedor  from '../controllers/contenedor.js';
import { DBService } from '../services/db.js';
import { socketEmit } from '../services/socket.js';


const router = Router()


router.get('/', async (req, res, next) => {
    // res.render('index'); 

    try {
        
        
        const obj = await miContenedor.getAll()
        console.log(obj)
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

router.get('/productos/:id', async (req, res) => {
    
    
    if (isNaN(req.params.id)) {
        
        console.log(req.params.id)
        return res.status(400).json({
            error: "El ID debe ser un numero",
            ok : false
      
          })

    } else {
    try {
        
        
        const obj = await miContenedor.getById(req.params.id)
        console.log(obj)
        return res.status(200).json({
            msg: "Producto encontrado",
            producto : obj,
            ok : true

      
          })
    } catch (err) {
        console.log(err);
    }
}   
})


router.post('/productos', async (req, res,) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        const prod = await miContenedor.save({ title, price, thumbnail })
        socketEmit('producto', prod);

    } else {
        res.send('Error de datos');
    }

})


router.put("/productos/:id" , async(req, res) => {

    if (isNaN(req.params.id)) {
        
        console.log(req.params.id)
        return res.status(400).json({
            error: "El ID debe ser un numero",
            ok : false
      
          })

    } else {
        console.log("modificar producto")
        try {
            const { title, price, thumbnail } = req.body;

            if (title && price && thumbnail) {
            const prod = { title: title, price : price, thumbnail : thumbnail}  

            const ok = await miContenedor.updateById(req.params.id, prod )

            return res.status(200).json({
                msg: "Actualizado",
                ok : true
          
              })

            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: "Erorr",
                ok : false
          
              })
        }

    }

})

router.delete('/productos/:id', async (req, res) => {
    console.log(req.params.id)
    if (isNaN(req.params.id)) {
        
        return res.status(400).json({
            error: "El ID debe ser un numero",
            ok : false
      
          })

    } else {
        
        try {
            
            const ok = await miContenedor.deleteById(req.params.id)
            return res.status(200).json({
                msg: "Eliminado",
                ok : true
          
              })

        } catch (error) {
            console.log(error)
        }

    }

})

// module.exports = router
export default router