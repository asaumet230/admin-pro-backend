const { response } = require('express');
const Hospitales = require('../models/Hospital');


const obtenerHospitales = async (req, res = response, next) => {

    try {

        /*
            Con el metodo populate puedes acceder a los datos de la colección usuario 
            que la relacionamos con la colección de hospitales
        */
       
        const hospitales  = await Hospitales.find().populate('usuario', 'nombre img');

        return res.status(200).json({
            ok: true,
            hospitales
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
        
    }
}

const crearHospital = async (req, res = response, next) => {

    const { nombre, imagen } = req.body;

    try {

        let hospital = await Hospitales.findOne({nombre});

        if(hospital) {
            return res.status(409).json({
                ok: false,
                msg: 'El hospital ya existe'
            });
        }

        hospital = new Hospitales(req.body);
        hospital.usuario = req.uid;
        await hospital.save();

        return res.status(200).json({
            ok: true,
            msg: 'Hospital creado exitosamente',
            hospital
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
}

const actualizarHospital = async (req, res = response, next) => {

    const nuevoNombre = req.body.nombre;
    const _id = req.params.id; 
    const uid = req.uid;

    try {

        const hospital = await Hospitales.findById({ _id });

        if( !hospital ) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe hospital por es id'
            });
        }

        hospital.nombre = nuevoNombre;
        hospital.usuario = uid;
        await hospital.save();

        return res.status(200).json({
            ok: true,
            msg: 'Nombre del hospital actualizado correctamente',
            hospital
        });


    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
}

const borrarHospital = async (req, res = response, next) => {

    const _id = req.params.id;

    try {
        
        const hospital = await Hospitales.findById({ _id });

        if(!hospital) {
            return  res.status(400).json({
                ok: false,
                msg:'No existe hospital con ese id'
            });
        }

        await Hospitales.findByIdAndDelete({ _id });

        return res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado exitosamente'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:'Comuniquese con el administrador'
        })
    }


    return res.status(200).json({
        ok: true,
        msg: 'Desde borrar hospitales'
    })
}

module.exports = {
    
    obtenerHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}