const  { response } = require('express');
const Medicos = require('../models/Medicos');


const crearMedico = async (req, res = response, next) => {

    const { nombre, imagen, hospital } = req.body;


    try {

        let medico = await Medicos.findOne({nombre});

        if(medico) {

            return res.status(409).json({
                ok: false,
             msg: 'El medico ya existe'
            });
        }

        medico = new Medicos(req.body);
        medico.usuario = req.uid;
        await medico.save();

        return res.status(200).json({
            ok: true,
            msg: 'Medico creado exitosamente',
            medico
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
 

}


const obtenerMedicos = async (req, res = response, next) => {

    try {

        const medicos = await Medicos.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');

        return  res.status(200).json({
        ok: true,
        medicos
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
        
    }

 

}


const actualizarMedico = (req, res = response, next) => {

    return  res.status(200).json({
        ok: true,
        msg: 'Desde actualizar medico'
    })

}


const borrarMedico = (req, res = response, next) => {

    return  res.status(200).json({
        ok: true,
        msg: 'Desde borrar medico'
    })

}


module.exports = {
    crearMedico,
    obtenerMedicos,
    actualizarMedico,
    borrarMedico
}