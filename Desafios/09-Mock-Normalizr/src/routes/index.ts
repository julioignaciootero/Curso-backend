import express from "express";
import  routerProducto  from "./productos"
import  routerMensajes  from "./mensajes"


const router = express.Router()

router.use("/api/productos", routerProducto)
router.use("/api/mensajes", routerMensajes)



export default router