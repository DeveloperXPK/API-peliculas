const Peliculas = require('../models/peliculas');

// Funcion para crear una pelicula
function crearPelicula(req, res) {

    // Obtenemos los datos del body
    const
        {
            titulo,
            director,
            lanzamiento,
            productora,
            precio
        } = req.body;

    // Creamos una nueva instancia de Peliculas y le asignamos los valores
    const pelicula = new Peliculas();
    pelicula.titulo = titulo;
    pelicula.director = director;
    pelicula.lanzamiento = lanzamiento;
    pelicula.productora = productora;
    pelicula.precio = precio;

    // Guardamos la pelicula en la base de datos
    pelicula.save()
        .then(
            (peliculaGuardada) => {
                res.status(200)
                    .send({ pelicula: peliculaGuardada });
            },
            err => {
                res.status(500)
                    .send({ message: 'Error al guardar la pelicula' });
            }
        )
}

// Funcion para obtener una pelicula
function obtenerPelicula(req, res) {

    // Obtenemos el id de la pelicula
    const idPelicula = req.params._id;

    // Buscamos la pelicula en la base de datos por su id
    Peliculas.findById(idPelicula)
        .then(
            (peliculaEncontrada) => {
                res.status(200)
                    .send({ pelicula: peliculaEncontrada });
            },
            err => {
                res.status(500)
                    .send({ message: 'Pelicula no encontrada' });
            }
        )
}

function consultarPeliculas(req, res) {
    Peliculas.find()
        .then(
            (peliculas) => {
                res.status(200)
                    .send({ peliculas: peliculas });
            },
            err => {
                res.status(500)
                    .send({ message: 'Error al consultar las peliculas' });
            }
        )
}

module.exports = {
    crearPelicula,
    obtenerPelicula,
    consultarPeliculas
}