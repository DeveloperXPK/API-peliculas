const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET = 'HUISDFHENWVAXV--jkasdvbadjkfs/.';

function generarTokenUsuario(usuario) {
    const payload = {
        sub: usuario._id,
        name: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment.unix(),
        exp: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(payload, SECRET);
}

function validarToken(req, res, nextStep) {
    try {
        const tokenEnviadoPorUsuario =
            req.headers.authorization.split(' ')[1];

        const payload = jwt.decode(tokenEnviadoPorUsuario, SECRET);

        req.header.UserId = payload.sub; // Guardamos el id del usuario y lo enviamos en el header
        req.header.UserRol = payload.rol; // Guardamos el rol del usuario y lo enviamos en el header

        nextStep();
    } catch (err) {
        res.status(403)
            .send({ message: 'No se ha iniciado Sesion' });
    }
}

function verificarPermiso(rolesPermitidos) {
    return (req, res, next) => {
        const rolUsuario = req.header.UserRol;

        if (rolesPermitidos.includes(rolUsuario)) {
            next(); // Permitir el acceso
        } else {
            res.status(403)
                .send({ message: 'Permiso denegado' });
        }
    };
}

module.exports = {
    generarTokenUsuario,
    validarToken,
    verificarPermiso
}