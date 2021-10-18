const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

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

const validarAdminRole = async ( req, res = response, next) => {

    const uid = req.uid

    try {
            
        const usuarioDB = await Usuario.findById({ _id: uid });

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        if( usuarioDB.role !== 'USER_ADMIN') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para esta operación'
            })
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


/* 
Este middleware se hace porque se utiliza la misma ruta para que el usuario Administrador
actualice a los usuarios normales del sistema y para que el usuario normal actualice su perfil,
pero lo normal es tener dos rutas diferente una que utilice el administrador para actualizar a sus
usuarios y otra para que los usuarios normales actualicen su perfil.
*/
const validarAdminRoleUsuario = async ( req, res = response, next) => {

    const uid = req.uid
    const id = req.params.id;
    // console.log(uid, id);

    try {
            
        const usuarioDB = await Usuario.findById({ _id: uid });

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        if( usuarioDB.role === 'USER_ADMIN' || uid === id ) {
           
            next();

        } else {
             return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para esta operación'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleUsuario
}