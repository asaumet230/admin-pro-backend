const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuarios = require('../models/Usuario');

const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontend } = require('../helpers/menu-frontend');

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
            token,
            menu: getMenuFrontend( usuarioDB.role )
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'comuniquese con el administrador'
        });
    }
}

const googleSignIn = async (req, res= response ,next) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } =  await googleVerify(googleToken);

        // verificamos si el usuario ya existe:
        const usuarioDB = await Usuarios.findOne({ email });
        let usuario;

        if( !usuarioDB ) {

            // Si el usuario no existe:
            usuario = new Usuarios({
                nombre: name,
                email,
                password: '@@@@@@',
                img: picture,
                google: true
            });

        } else{

            // Si el usuario existe:
            usuario = usuarioDB;
            usuario.google = true
        }

        // Guardamos el usuario:
        await usuario.save();

        // Generamos un nuevo JWT:
        const token = await generarJWT(usuario._id);
       
       return res.status(200).json({
            ok: true,
            token,
            menu: getMenuFrontend( usuario.role )
        });
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        });
    } 
}

const renewToken = async( req, res= response) => {

    const uid = req.uid;

    try {

        const usuario = await Usuarios.findById({_id: uid}).select('nombre google role email img');
        
        const token = await generarJWT(uid);

        return res.status(200).json({
            ok: true,
            token,
            usuario,
            menu: getMenuFrontend ( usuario.role )
        });

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'comuniquese con el administrador'
            
        })
    }

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}