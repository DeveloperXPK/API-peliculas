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
routes.post('/registrar', autenticacionController.registrarUsuario);
routes.post('/login', autenticacionController.iniciarSesion);

// Rutas de peliculas
routes.post('/peliculas',
    // Debemos validar el token antes de verficar el permiso ya que necesitamos el rol del usuario
    token.validarToken,

    // Con el token verificado y el rol enviado en el header, verificamos si el usuario tiene permiso
    token.verificarPermiso(['Admin']),
    peliculasController.crearPelicula
);

routes.get('/peliculas/:_id',
    token.validarToken,
    token.verificarPermiso(['Admin', 'Basic']),
    peliculasController.obtenerPelicula
);

routes.get('/peliculas',
    token.validarToken,
    token.verificarPermiso(['Admin', 'Basic']),
    peliculasController.consultarPeliculas
);

module.exports = routes;