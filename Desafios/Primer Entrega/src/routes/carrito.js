const express = require('express')
const {miContenedor} = require('../controllers/contenedorCarrito')

const router = express.Router()


router.get('/' , async(req, res) => {
  
    try {
          
          
      const obj = await miContenedor.getAll()
      res.status(200).json({
                    
        ok: true,
        msg: `Carritos encontrados`,
        carritos : obj
      })   
      } catch (err) {
      next(err);
  }
    
    });


router.get('/:id/productos' , async(req, res) => {
  
      const id = parseInt(req.params.id)
      if(isNaN(id)) {
        
        return res.status(400).json({
          error: "El ID debe ser un numero",
          ok : false
    
        })
    
      } else {
      
        const carrito = await miContenedor.getById(id)
        if (carrito) {
          
          return res.status(200).json({
            carrito: id,
            productos : carrito.productos,
            ok : true
      
          })

        } else {
          
          return res.status(404).json({
            error: "Carrito no encontrado",
            ok : false
      
          })

        }


      }
      
});    

router.delete('/:id/productos/:id_prod' , async (req,res) => {

  const id = parseInt(req.params.id)
  const idProd = parseInt(req.params.id_prod)
  if(isNaN(id) || isNaN(idProd) ) {
    
    return res.status(400).json({
      error: "Error ID",
      ok : false

    })

  } else {  
    
    const eliminado = await miContenedor.deleteProduct(id, idProd)
    if (eliminado) {
      return res.status(200).json({
        error: `Producto eliminado correctamente del carrito ${id}`,
        ok : eliminado
  
      })
    } else {
      return res.status(500).json({
        error: 'Error comuniquese con el ADM',
        ok : eliminado
  
      })
    }

  }

})

router.post('/:id/productos' , async(req, res) => {

  const idCarrito = parseInt(req.params.id)
  if(isNaN(idCarrito)) {
    
    return res.status(400).json({
      error: "El ID debe ser un numero",
      ok : false

    })

  } else {

    if (!req.body.id || !req.body.cantidad) {
      res.status(400).json({
        ok: false,
        msg: "Error. Datos incompletos"
      })
  
    } else {
      
    const { id, cantidad } = req.body 
    const resultado = await miContenedor.addProduct( idCarrito , {id: id, cantidad : cantidad})  
    if (resultado) {
      return res.status(200).json({
        error: "Producto agregado correctamente",
        ok : resultado
  
      })
    } else {
      
      return res.status(500).json({
        error: "No se pudo elimianr. Comuniquese con el ADM",
        ok : eliminado
  
      })

    }
      

   }

  }
})


router.delete('/:id', async (req, res) => {

  const id = parseInt(req.params.id)
  if(isNaN(id)) {
    
    return res.status(400).json({
      error: "El ID debe ser un numero",
      ok : false

    })

  } else {  

    const carrito = await miContenedor.getById(id)
        if (carrito) {

          const eliminado = await miContenedor.deleteById(id)
          if (eliminado) {
            
            return res.status(200).json({
              error: "Carrito eliminado",
              ok : eliminado
        
            })

          } else {
            
            return res.status(500).json({
              error: "No se pudo elimianr. Comuniquese con el ADM",
              ok : eliminado
        
            })

          }        


        } else {
          
          return res.status(404).json({
            error: "Carrito no encontrado",
            ok : false
      
          })

        }


  }

})

router.post('/' , async (req, res) => {

    if (!req.body.productos ) {
        res.status(400).json({
          ok: false,
          msg: "Error. Complete los datos bien"
        })
    
      } else {
        
      const productos = req.body.productos
      console.log(productos)
        
        try {
            
            const carrito = {
              productos: productos,
            }
            
            const nuevoCarrito = await miContenedor.save(carrito)
  
            res.status(200).json({
                    
              ok: true,
              msg: `Carrito creado con ID:  ${nuevoCarrito} `
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
    

})

module.exports = router