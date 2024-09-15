const bcrypt = require('bcrypt');
const token = require('../helpers/autenticacion');
const Usuario = require('../models/usuarios');

function registrarUsuario(req, res){
    const { nombre, apellidos, email, password, rol } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.apellidos = apellidos;
    usuario.email = email;
    usuario.password = passwordHash;
    usuario.rol = rol;

    usuario.save()
    .then(
        (usuarioGuardado) => {
            res.status(200)
            .send({usuario: usuarioGuardado});
        },
        err => {
            res.status(500)
            .send({message: 'Error al guardar el usuario'});
        }
    )
}

function iniciarSesion(req, res){
    const { email, password } = req.body;

    Usuario.findOne({email: email})
    .then(
        (usuarioEncontrado) => {
            if(!usuarioEncontrado){
                res.status(404)
                .send({message: 'El usuario no existe'});
            } else {
                if(bcrypt.compareSync(password, usuarioEncontrado.password)){
                    res.status(200)
                    .send({
                        message: 'Inicio de sesion correcto',
                        token: token.generarTokenUsuario(usuarioEncontrado)
                    })
                }
            }
        },
        err => {
            res.status(500)
            .send({message: 'Error al buscar el usuario'});
        }
    )

}

module.exports = {
    registrarUsuario,
    iniciarSesion
}