import express from "express";
import  routerProducto  from "./productos"
import  routerCarrito  from "./carritos"

const router = express.Router()

router.use("/api/productos", routerProducto)
router.use("/api/carritos", routerCarrito)


export default router