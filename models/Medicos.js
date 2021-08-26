const { model, Schema } = require('mongoose');

const MedicosSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        require: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospitales',
        require: true
    }

});

MedicosSchema.method('toJSON', function(){

    const { _v, ...object } = this.toObject();
    return object;

});


module.exports = model('Medicos', MedicosSchema);