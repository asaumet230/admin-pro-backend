const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuarios = require('../models/Usuario');

const { generarJWT } = require('../helpers/jwt');

const login = async(req, res= response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuarios.findOne({email});
        
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg:'Email no encontrado'
            });
        }
        
        // Verificar contraseña:
        const validacionPassword = await bcrypt.compareSync(password, usuarioDB.password);

         if(!validacionPassword) {
            return res.status(404).json({
                ok: false,
                msg:"Usuario o password invalidos"
            });
        }

        // Generamos el token:
        const token = await generarJWT(usuarioDB._id);

       return res.status(200).json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'comuniquese con el administrador'
        });
    }


}


module.exports = {
    login
}