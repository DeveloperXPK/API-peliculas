const mongoose = require('mongoose');
const app = require('./application')

const desiredPORT = 3000 ?? process.env.PORT;

mongoose.connect('mongodb://localhost:27017/moviespage')
.then(
    () => {
        console.log('Conexion con la base de datos establecida');
        app.listen(desiredPORT, () => {
            console.log(`Servidor corriendo en el puerto http://localhost:${desiredPORT}`);
        })
    },
    err => {
        console.log('Error al conectar con la base de datos');
    }
)