// const socketIo = require('socket.io');
// const { miContenedor } = require('../controllers/contenedor');
import { Server } from 'socket.io'
import miContenedor from '../controllers/contenedor.js'

let io;

const initWsServer = (server) => {
    io = new Server(server)

    io.on('connection' , (socket) => {

        console.log('Nueva conexion')
        console.log(new Date())

        socket.on('allProducts' , async () => {
            
            // console.log(miContenedor)
            const productos = await miContenedor.getAll()
            // console.log(productos)
            productos.forEach(p => {
                console.log(p.title)
                socket.emit('producto', p)
            });
            

        })

        socket.on("enviarmensaje" , async (msg) => {
            console.log("on enviarmensaje")
            io.emit("mensajenuevo", msg)
        })

    })

    return io

}


const socketEmit = (eventName, msg) => {
    io.emit(eventName, msg);
};


// module.exports = {
//     initWsServer,
//     socketEmit,
// }

export { initWsServer, socketEmit}

