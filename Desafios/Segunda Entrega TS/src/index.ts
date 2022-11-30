import server from './services/server'
import {initMongoDB} from './bd/database'

initMongoDB()

server.listen('8080', ():void => {

    console.log("Servidor corriendo");
    

})