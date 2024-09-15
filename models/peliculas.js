const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PeliculaSchema = Schema({
    titulo: String,
    director: String,
    lanzamiento: Number,
    productora: String,
    precio: Number
})

module.exports = mongoose.model('Peliculas', PeliculaSchema);