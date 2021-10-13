const { model, Schema } = require('mongoose');

const hospitalesSchema = Schema({

    nombre : {
        type: String,
        require : true
    },
    img : {
        type: String
    },
    hospital: {
        type: String,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        require: true
    }
});


// Configuración para quitarle el (_) al id y la versión de mongo "OJO SOLO ES EFECTO VISUAL NO AFECTA LA DB":
hospitalesSchema.method('toJSON', function(){

    const {__v, ...object} = this.toObject();
 
    return object;
});

module.exports = model('Hospitales', hospitalesSchema);