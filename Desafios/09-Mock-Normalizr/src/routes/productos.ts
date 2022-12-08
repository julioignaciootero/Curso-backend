import express, { Request, Response, NextFunction } from "express";
import { faker } from '@faker-js/faker';
faker.setLocale("es")

const router = express.Router()



router.get('/productos-test' ,async (req:Request, res:Response) => {
    
    let productos = []

    try {

        for (let i = 0; i < 5; i++) {
        
            productos.push({
                nombre: faker.commerce.product(),
                precio: faker.commerce.price(),
                foto : faker.image.imageUrl()
            })
            
        }

        res.status(200).json({
            ok: true,
            productos
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error al mostrar productos"
        })
    }


    

})

export default router