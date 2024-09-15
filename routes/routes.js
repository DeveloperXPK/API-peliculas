const express = require('express');
const routes = express.Router();

// Importar controladores
const homeController = require('../controllers/home');
const autenticacionController = require('../controllers/autenticacion');
const peliculasController = require('../controllers/peliculas');
const token = require('../helpers/autenticacion');

// Ruta de pagina principal
routes.get('/', homeController.home);

// Rutas de autenticacion

// Registrar un usuario
routes.post('/registrar', autenticacionController.registrarUsuario);

// Iniciar sesion
routes.post('/login', autenticacionController.iniciarSesion);

// Rutas de peliculas
// Crear una pelicula
routes.post('/peliculas',
    // Debemos validar el token antes de verficar el permiso ya que necesitamos el rol del usuario
    token.validarToken,

    // Con el token verificado y el rol enviado en el header, verificamos si el usuario tiene permiso
    token.verificarPermiso(['Admin']),
    peliculasController.crearPelicula
);

// Obtener una pelicula por su id
routes.get('/peliculas/:_id',
    token.validarToken,
    token.verificarPermiso(['Admin', 'Basic']),
    peliculasController.obtenerPelicula
);

// Obtener todas las peliculas
routes.get('/peliculas',
    token.validarToken,
    token.verificarPermiso(['Admin', 'Basic']),
    peliculasController.consultarPeliculas
);

// Obtener peliculas a partir de un rango de precios y lanzamientos
routes.get('/peliculas/:lanzamiento/:precio',
    token.validarToken,
    token.verificarPermiso(['Admin', 'Basic']),
    peliculasController.consultarPeliculasLanzamientoPrecio
);

// Eliminar una pelicula por su id
routes.delete('/peliculas/:_id',
    token.validarToken,
    token.verificarPermiso(['Admin']),
    peliculasController.eliminarPelicula
)

// Actualizar una pelicula por su id
routes.put('/peliculas/:_id',
    token.validarToken,
    token.verificarPermiso(['Admin']),
    peliculasController.editarPelicula
)

module.exports = routes;