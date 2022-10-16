const express = require('express');
const productos = require('../../productos')

const router = express.Router();

router.get('/', (req, res) => {
  
  try {
    
    if (productos.length == 0) {
      
      res.status(404).json({
        productos: productos,
        ok: false,
        msg: "No se encontraron productos"
      })

    } else {
      res.status(200).json({
        productos: productos,        
        ok: true,
        msg: "Productos encontrados"
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

});

router.get('/:id' , (req, res) => {

  const id = parseInt(req.params.id)
  if(isNaN(id)) {
    
    return res.status(400).json({
      error: "El ID debe ser un numero",
      ok : false

    })

  } else {
    
    try {
      
      const prod = productos.find(p => p.id == id )
      if (!prod) {

        res.status(400).json({
                
          ok: false,
          msg: `Producto con id ${id} no encontrado`
        })        


      } else {

        res.status(200).json({
          
          producto: prod,
          ok: true,
          msg: `Producto encontrado`
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

router.put('/:id' , (req, res) => {

  if (!req.body.title || !req.body.price || !req.body.url) {
    res.status(400).json({
      ok: false,
      msg: "Datos invalidos o incompletos"
    })

  } else {
    
  const { title , price , url } = req.body

  const id = parseInt(req.params.id)
  if(isNaN(id)) {
    
    return res.status(400).json({
      error: "El ID debe ser un numero",
      ok : false

    })

  } else {
    
    try {
      
      const index = productos.findIndex(p => p.id == id)
      if (index < 0) {

        res.status(400).json({
                
          ok: false,
          msg: `Producto con id ${id} no encontrado`
        })        


      } else {

        productos[index].title = title
        productos[index].price = price
        productos[index].url = url
        res.status(200).json({
          
          producto: productos[index],
          ok: true,
          msg: `Producto actualizado`
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


router.delete('/:id' , (req, res) => {

  const id = parseInt(req.params.id)
  if(isNaN(id)) {
    
    return res.status(400).json({
      error: "El ID debe ser un numero",
      ok : false

    })

  } else {
    
    try {
      
      const index = productos.findIndex(p => p.id == id)
      if (index < 0) {

        res.status(400).json({
                
          ok: false,
          msg: `Producto con id ${id} no encontrado`
        })        


      } else {

        productos.splice(index, 1)

        res.status(200).json({
          
          productos: productos,
          ok: true,
          msg: `Producto eliminado`
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

router.post('/', (req, res) => {
  
  if (!req.body.title || !req.body.price || !req.body.url) {
    res.status(400).json({
      ok: false,
      msg: "Datos invalidos o incompletos"
    })

  } else {
    
    const { title , price , url } = req.body
    try {
      const newId = productos[productos.length -1].id + 1
      productos.push({ title , price, url, id : newId })
      res.status(200).json({
        productos: productos,  
        newid: newId,       
        ok: true,
        msg: "Producto agregado correctamente"
      })
    } catch (error) {
      res.status(500).json({
        error: error,  
        ok: false,
        msg: "Error al agregar producto"
      })
    }
    



  }





});

module.exports = router