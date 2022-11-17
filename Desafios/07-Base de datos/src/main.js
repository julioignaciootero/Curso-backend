import serverApp from './services/server.js'
import {DBService } from './services/db.js'

DBService.init()

// const prod = await DBService.getById("productos", 1)

// console.log(prod)
// // const obj = DBService.get("productos" , 1)

// console.log(DBService.create())

// const all = JSON.parse(JSON.stringify(await DBService.getAll("productos")))
// // console.log(all)

// all.forEach(prod => {
    
//     console.log(prod.title)

// });



serverApp.listen(8080, () => console.log('Servidor corriendo'));