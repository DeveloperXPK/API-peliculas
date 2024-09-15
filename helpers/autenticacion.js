const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET = 'HUISDFHENWVAXV--jkasdvbadjkfs/.';

function generarTokenUsuario(usuario){
    const payload = {
        sub: usuario._id,
        name: usuario.nombre,
        email: usuario.email,
        iat: moment.unix(),
        exp: moment().add(5, 'minutes').unix()
    }
    return jwt.encode(payload, SECRET);
}

function validarToken(req, res, nextStep){
    try{
        const tokenEnviadoPorUsuario =
        req.headers.authorization.split(' ')[1];

        const payload = jwt.decode(tokenEnviadoPorUsuario, SECRET);

        req.header.UserId = payload.sub;

        nextStep();
    } catch (err) {
        res.status(403)
        .send({message: 'Token invalido'});
    }
}

module.exports = {
    generarTokenUsuario,
    validarToken
}