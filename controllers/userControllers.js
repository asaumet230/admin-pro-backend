const { response } = require('express'); // Esto ayuda al autocompletado;
const bcrypt = require('bcrypt');

const Usuarios = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



exports.crearUsuario = async (req, res = response) => {


    const { email, password } = req.body;

    try {

        // Validamos si hay un usuario iagual:

        let usuario = await Usuarios.findOne({email});

        if(usuario) {
            return res.status(401).json({
                ok: false,
                msg:'El usuario ya existe'
            });
        }

        // Creamos el usuarios:
        usuario = new Usuarios(req.body);

        // Hasehamos la contraseña:
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hashSync(password, salt);

        // Guardamos el usuario:
        await usuario.save();

        // Generamos JWT:
        const token = await generarJWT(usuario._id);

        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'comuniquese con el administrador'
        });
    }
}


exports.getUsuario = async (req, res = response) => {

    // Metodo para crear paginación:

    const desde = Number(req.query.desde) || 0;

    /* 
        Con skip seleccionas desde donde quieres filtrar, con el limit son el limite de registros que quieres que el usuario vea,
        Con estimatedDocumentCount muestras el total de registros y se hace de la forma siguiente porque esos dos procesos se deben ejecutar a la vez:
    */ 

    const [usuarios, total ] = await Promise.all([
        Usuarios.
                find({}, 'nombre email role google img')
                .skip( desde )
                .limit( 5 ),

        Usuarios.estimatedDocumentCount()
    ]);

    return res.status(200).json({
        ok: true,
        msg: 'Get todos los usuarios',
        usuarios,
        total
    })
}

exports.actualizarUsuario = async(req, res= response) => {

    const _id = req.params.id

    try {
        
        const usuarioDB = await Usuarios.findById({ _id });
        console.log(usuarioDB);

        if(!usuarioDB){
            
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario'
            })
        }

        // Actualizamos lo campos:
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email ){

            const emailExiste = await Usuarios.findOne({ email });

            if( emailExiste ) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        // Si no existe el email se lo agregas al objeto de campos y actualizas el usuario:

        if( !usuarioDB.google ) {

             campos.email = email;

        } else if( usuarioDB.email !== email ) {

            return res.status(500).json({
                    ok: false,
                    msg: 'los usuarios de google no pueden cambiar el correo'
                })

        }
       
        const usuarioActualizado = await Usuarios.findByIdAndUpdate(_id, campos, { new: true });

        // Si existe retornamos:
        return res.status(200).json({
            ok: true,
            msg: 'usuario actualizado',
            usuario: usuarioActualizado
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


exports.eliminarUsuario = async (req, res= response) => {

    const _id = req.params.id;

    try {

        const usuarioDB =  await Usuarios.findById({ _id} );

          if(!usuarioDB){
            
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            })
        }

        //Eliminar usuario:
        await Usuarios.findByIdAndRemove({ _id });

        return res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado exitosamente'
        })
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
        
    }

    

}