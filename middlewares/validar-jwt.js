const { response } = require('express');

const jwt = require('jsonwebtoken');

const validarJWT = async (req, res= response, next) =>{

    const token = req.header('x-auth-token');

    // Validación si existe un token:
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No Hay Token, permiso no válido'
        })
    }
    
    try {

        const { uid } = await jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}