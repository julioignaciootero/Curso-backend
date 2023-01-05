import express from "express";
import  routerUser  from "./users.js"
import { fork } from 'child_process';
import path from 'path'
import {fileURLToPath} from 'url';
import os from 'os';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const scriptPath = path.resolve(__dirname, '../utils/randoms.js');


const router = express.Router()

router.use("/user", routerUser)

router.get("/info", (req, res)=>{              
    const numCPUs = os.cpus().length;

    res.status(200).json({
        
        nucleos: numCPUs,
        argumentos: process.argv,
        plataforma: process.platform,
        version: process.version,
        path: process.execPath,
        carpeta: process.cwd(),
        id_proceso: process.pid,
        memoria : process.memoryUsage()



    })
})


router.get("/randoms", (req, res) => {

    // const cant = parseInt(req.query.cant) || 100000000
    const cant = parseInt(req.query.cant) || 1000000000
    const min = 0
    const max = 1000
    let numeros = {}
    const opt = {
        message: "start",
        max,
        min,
        cant
    }

    const computo = fork(scriptPath )
    // computo.send('message', cant)
    computo.send(opt)
    computo.on('message' , (numeros) => {
        res.status(200).json({
            msg: `Numeros aleatorios generados entre ${min} y ${max}`,
            numeros
        })
    })

    // for(let i = 0; i < cant; i++) {

    //     const random = Math.floor(Math.random() * (max - min) + min)
        
    //     if (numeros[random]) {
            
    //         numeros[random] = numeros[random] + 1

    //     } else {

    //         numeros[random] = 1

    //     }



    // } 



})

export default router