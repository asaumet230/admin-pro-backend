const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {


    return new Promise((resolve, reject) => {

        // Definimos el payload:
        const payload = {
            uid
        };

        // Generamos el Token:
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {expiresIn: '12h'}
            ,(error,token) => {

            if(error) {
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}