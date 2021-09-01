const  { response } = require('express');
const Medicos = require('../models/Medicos');


const crearMedico = async (req, res = response ) => {

    const { nombre } = req.body;


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


const obtenerMedicos = async (req, res = response ) => {

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


const actualizarMedico = async (req, res = response ) => {
     
    const _id = req.params.id;
    const uid = req.uid;

    try {

        let medico = await Medicos.findById({ _id } ) ;

        if(!medico) {

            return res.status(404).json({
                ok: false,
                msg:'No hay médico con este id'
            });
        }

        const actualizacionMedico = {
            ...req.body,
            usuario: uid
        }

         medico = await Medicos.findByIdAndUpdate(_id, actualizacionMedico, { new: true });

         return res.status(200).json({
             ok: true,
             msg: 'medico actualizado exitosamente',
             medico
         });


    } catch(error) {
        console.log(error);
        return  res.status(500).json({
            ok: false,
            msg: 'Error comuniquese con su adminstrador'
        });
    }

    

}


const borrarMedico = async (req, res = response ) => {

    const _id = req.params.id;

    try {

        const medico = await Medicos.findById({ _id } ) ;

        if(!medico) {

            return res.status(404).json({
                ok: false,
                msg:'No hay medico con este id'
            });
        }

        await Medicos.findByIdAndDelete({_id});

        return res.status(200).json({
            ok: true,
            msg:'El médico fue eliminado exitosamente'
        });


    } catch(error){
        console.log(error);
        return  res.status(500).json({
            ok: false,
            msg: 'Error comuniquese con su adminstrador'
        });

    }
}


module.exports = {
    crearMedico,
    obtenerMedicos,
    actualizarMedico,
    borrarMedico
}