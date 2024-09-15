const mongoose = require('mongoose');
const app = require('./application')

const desiredPORT = 3000 ?? process.env.PORT;

// pc: mongodb://127.0.0.1:27017/moviespage 
// laptop: mongodb://localhost:27017/moviespage
mongoose.connect('mongodb://127.0.0.1:27017/moviespage', { useNewUrlParser: true })
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