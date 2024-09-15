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
    token.validarToken,
    peliculasController.crearPelicula
);

routes.get('/peliculas/:_id',
    token.validarToken,
    peliculasController.obtenerPelicula
);

module.exports = routes;