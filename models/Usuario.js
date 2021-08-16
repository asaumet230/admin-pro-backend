const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    img: {
        type: String // Ya que es un path    
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'

    },
    google: {
        type: Boolean,
        default: false
    }
});


// Configuración para quitarle el (_) al id y la versión de mongo "OJO SOLO ES EFECTO VISUAL NO AFECTA LA DB":
UsuarioSchema.method('toJSON', function(){

    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuarios', UsuarioSchema);