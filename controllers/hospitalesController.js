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

const actualizarHospital = (req, res = response, next) => {


    return res.status(200).json({
        ok: true,
        msg: 'Desde actualizar hospitales'
    })
}

const borrarHospital = (req, res = response, next) => {


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