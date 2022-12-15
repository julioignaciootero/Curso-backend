import express, { Request, Response, NextFunction } from "express";
import fs from "fs"
import path from "path"
import { normalize, schema, denormalize} from "normalizr"
const ruta = path.join(__dirname, '../mensajes.json');
const rutaNormalizada = path.join(__dirname, '../mensajesnormalizados.json');



const router = express.Router()



router.get("/original",async (req:Request, res:Response) => {
    
    try {
        
        const data = JSON.parse(fs.readFileSync(ruta, 'utf8'))
        res.status(200).json({
            data
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error al mostrar mensajes"
        })
    }

})


const authorSchema = new schema.Entity('author', {},
    { idAttribute : "id"}
    )

const mensaje = new schema.Entity('mensaje', 
    { author : authorSchema}, { idAttribute : "_id"}
)

const finalSchema = new schema.Array(mensaje)

router.get("/normalizada",async (req:Request, res:Response) => {
    
    try {
        
        const data = JSON.parse(fs.readFileSync(ruta, 'utf8'))

        const normalizada = normalize(data, finalSchema)
        fs.writeFileSync(rutaNormalizada, JSON.stringify(normalizada, null, "\t"))
        res.status(200).json({
            normalizada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error al mostrar mensajes"
        })
    }

})

router.get("/desnormalizada",async (req:Request, res:Response) => {
    
    try {
        
        const data = JSON.parse(fs.readFileSync(rutaNormalizada, 'utf8'))

        const desrnormalizada = denormalize( data.result, finalSchema, data.entities)
        // fs.writeFileSync(rutaNormalizada, JSON.stringify(normalizada, null, "\t"))
        res.status(200).json({
            desrnormalizada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error al mostrar mensajes"
        })
    }

})

export default router