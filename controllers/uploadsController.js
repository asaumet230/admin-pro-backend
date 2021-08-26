const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const Medicos = require('../models/Medicos');

const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res= response ) => {

    const { tipo, id } = req.params;

    // Validamos tipo:
   const tiposValidos = ['medicos', 'usuarios', 'hospitales'];

    if(!tiposValidos.includes(tipo)){

        return res.status(400).json({
            ok: false,
            msg: 'El tipo no es valido debe ser medicos, usuarios o hospitales'
        })
    }

    // Validamos que exista un archivo:
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen:
    const file = req.files.imagen;

    // Extraemos la extensión del archivo:
    const extensionArchivo = file.name.substring(file.name.lastIndexOf('.'), file.name.length);
   
  
    // Validar extensiones validas
    const extensionesValidas = ['.jpg', '.png', '.jpeg', '.gif'];
    if(! extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            mgs:'El formato es incorrecto debe de ser jpg, png jpeg o gif'
        })
    }

    // Generamos el nombre del archivo: 
    const nombreArchivo = `${uuidv4()}${extensionArchivo}`;

    // Creamos el path para guardar la imagen:
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover el archivo a la carpeta destino:
    file.mv(path, (err) => {
    
        if (err) {
            
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });
        }

        // Actualizar Imagen:
        actualizarImagen(tipo, id, nombreArchivo);

        return res.status(200).json({
            ok: true,
            msg:'Archivo subido exitosamente',
            nombreArchivo
        });
  });
}

const obtenerImagen = async (req, res= response ) => {

    const { tipo, imagen } = req.params;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

    // Validamos si la imagen existe:
    if( fs.existsSync(pathImg)) {
        
        res.sendFile( pathImg );

    } else {

        const imagenDefecto = path.join(__dirname, `../uploads/no-image-available.png`);
        res.sendFile(imagenDefecto);
    }


}


module.exports = {

    fileUpload,
    obtenerImagen

}