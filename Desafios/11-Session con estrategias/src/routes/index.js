import express from "express";
import  routerUser  from "./users.js"


const router = express.Router()

router.use("/user", routerUser)



export default router