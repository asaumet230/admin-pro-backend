const fs = require('fs');

const Usuarios = require('../models/Usuario');
const Hospitales = require('../models/Hospital');
const Medicos = require('../models/Medicos');

const borrarArchivo = (tipo, nombreArchivo) => {

    const pathViejo = `./uploads/${tipo}/${nombreArchivo}`;

    if(fs.existsSync(pathViejo)){

        fs.unlinkSync(pathViejo);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

   switch (tipo) {
       case 'medicos':
           const medico = await Medicos.findOne({_id:id });
           
           if(!medico) {
               console.log('No exite medico con ese id');
               return false;
           }

          // Se borra el archivo:
          borrarArchivo('medicos', medico.img);

           // Actualizamos la base de datos el path:
           medico.img = nombreArchivo;

           await medico.save();
           return true;

        case 'usuarios':
            const usuario = await Usuarios.findOne({_id:id });
           
           if(!usuario) {
               console.log('No exite usuario con ese id');
               return false;
           }

          // Se borra el archivo:
          borrarArchivo('usuarios', usuario.img);

           // Actualizamos la base de datos el path:
           usuario.img = nombreArchivo;

           await usuario.save();
           return true;
         
        case 'hospitales':

            const hospital = await Hospitales.findOne({_id:id });
            
            if(!hospital) {
                console.log('No exite hospital con ese id');
                return false;
            }

            // Se borra el archivo:
            borrarArchivo('hospitales', hospital.img);

            // Actualizamos la base de datos el path:
            hospital.img = nombreArchivo;

            await hospital.save();
            return true;
            
        default:
            break;
   }

}

module.exports = {

    actualizarImagen

}