const serverApp = require('./services/server');

serverApp.listen(8080, () => console.log('Servidor corriendo'));