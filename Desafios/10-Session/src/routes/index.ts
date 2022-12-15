import express, { Request, Response, NextFunction } from "express";
import  routerProducto  from "./productos"
import  routerMensajes  from "./mensajes"
import  routerLogin  from "./login"


const router = express.Router()

router.use("/api/productos", routerProducto)
router.use("/api/mensajes", routerMensajes)
router.use("/api/login", routerLogin)



export default router