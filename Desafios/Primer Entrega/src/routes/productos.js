const express = require('express')
const {miContenedor} = require('../controllers/contenedorProductos.js')
const { validarAdmin } = require('../middlewares/authcheck.js');


const router = express.Router()



router.get('/', async (req, res, next) => {
  
  try {
        
        
    const obj = await miContenedor.getAll()
    res.status(200).json({
                  
      ok: true,
      msg: `Productos encontrados`,
      productos : obj
    })   
    } catch (err) {
    next(err);
}
  
  });
  
  router.get('/:id' , async (req, res) => {
  
    const id = parseInt(req.params.id)
    if(isNaN(id)) {
      
      return res.status(400).json({
        error: "El ID debe ser un numero",
        ok : false
  
      })
  
    } else {
      
      try {
        
        const prod = await miContenedor.getById(id)
        if (!prod) {
  
          res.status(400).json({
                  
            ok: false,
            msg: `Producto con id ${id} no encontrado`
          })        
  
  
        } else {
  
          res.status(200).json({
            
            producto: prod,
            ok: true,
            msg: `Producto encontrado`,
            producto : prod
          })           
  
        }
  
      } catch (error) {
        res.status(500).json({
          error: error,        
          ok: false,
          msg: "Comuniquese con el Adm"
        })
      }
  
    }
  
  
  
  
  })
  


  router.put('/:id' , async (req, res) => {
  
    if (!req.body.precio || !req.body.nombre || !req.body.descripcion || !req.body.codigo|| !req.body.foto|| !req.body.precio|| !req.body.stock) {
      res.status(400).json({
        ok: false,
        msg: "Error. Complete los datos bien"
      })
  
    } else {
      
    const { nombre , descripcion, codigo, foto, precio, stock } = req.body
  
    const id = parseInt(req.params.id)
    if(isNaN(id)) {
      
      return res.status(400).json({
        error: "El ID debe ser un numero",
        ok : false
  
      })
  
    } else {
      
      try {
        
        const prod = await miContenedor.getById(id)
        if (!prod) {
  
          res.status(400).json({
                  
            ok: false,
            msg: `Producto con id ${id} no encontrado`
          })      
  
  
        } else {
  
          const prod = {
            // timeStamp : Date.now(),
            id: id,
            nombre : nombre,
            descripcion : descripcion,
            codigo : codigo,
            foto : foto,
            precio : precio,
            stock : stock

          }
          
          const ok = await miContenedor.update(prod)

          res.status(200).json({
                  
            ok: ok,
            msg: `Producto modificado ID:  ${id} `
          })                
  
        }
  
      } catch (error) {
        console.log(error)
        res.status(500).json({
          error: error,        
          ok: false,
          msg: "Comuniquese con el Adm"
        })
      }
  
    }
  }
  
  })
  
  
  router.delete('/:id' , validarAdmin,  async (req, res) => {
  
    const id = parseInt(req.params.id)
    if(isNaN(id)) {
      
      return res.status(400).json({
        error: "El ID debe ser un numero",
        ok : false
  
      })
  
    } else {
      
      try {
        
        const resultado = await miContenedor.deleteById(id)
        if (!resultado) {
          res.status(500).json({
            error: error,        
            ok: false,
            msg: "Comuniquese con el Adm"
          })          
        } else {
          res.status(200).json({
            ok: resultado,
            msg: "Registro eliminado"
          })          
        }
  
      } catch (error) {
        res.status(500).json({
          error: error,        
          ok: false,
          msg: "Comuniquese con el Adm"
        })
      }
  
    }
  })
  
  router.post('/', async (req, res) => {
    
   if (!req.body.precio || !req.body.nombre || !req.body.descripcion || !req.body.codigo|| !req.body.foto|| !req.body.precio|| !req.body.stock) {
      res.status(400).json({
        ok: false,
        msg: "Error. Complete los datos bien"
      })
  
    } else {
      
    const { nombre , descripcion, codigo, foto, precio, stock } = req.body


      
      try {
          
          const prod = {
            // timeStamp : Date.now(),
            nombre : nombre,
            descripcion : descripcion,
            codigo : codigo,
            foto : foto,
            precio : precio,
            stock : stock
          }
          
          const nuevoProd = await miContenedor.save(prod)

          res.status(200).json({
                  
            ok: true,
            msg: `Producto insertado con ID:  ${nuevoProd.id} `
          })      
  
      } catch (error) {
        console.log(error)
        res.status(500).json({
          error: error,        
          ok: false,
          msg: "Comuniquese con el Adm"
        })
      }
  
  }
  
  
  
  
  
  });
  
  module.exports = router