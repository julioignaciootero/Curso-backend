const socketIo = require('socket.io');
const { miContenedor } = require('../controllers/contenedor');

let io;

const initWsServer = (server) => {
    io = socketIo(server)

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

    })

    return io

}


const socketEmit = (eventName, msg) => {
    io.emit(eventName, msg);
};


module.exports = {
    initWsServer,
    socketEmit,
}