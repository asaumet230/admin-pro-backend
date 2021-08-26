const { response } = require('express');

const Usuarios = require('../models/Usuario');
const Medicos = require('../models/Medicos');
const Hospitales = require('../models/Hospital');


const obtenerBusqueda = async (req, res= response, next) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i'); // Expresión regular para quitar el case sensitive.


    try {

        const [ usuarios, medicos, hospitales ] = await Promise.all([
            Usuarios.find({ nombre: regex }),
            Medicos.find({ nombre: regex }),
            Hospitales.find({ nombre: regex })
        ]);
    
        return res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const obtenerDocmuentosColeccion = async (req, res= response, next) => {

    const tabla    = req.params.tabla; 
    const busqueda = req.params.busqueda;
    const regex    = new RegExp(busqueda, 'i'); // Expresión regular para quitar el case sensitive.
    
    let data = [];

    try {

        switch ( tabla ) {
            case 'medicos':
                data = await  Medicos.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img')
                break;
            
            case 'usuarios':
                data = await Usuarios.find({ nombre: regex })
                break;
            
            case 'hospitales':
                data= await Hospitales.find({ nombre: regex }).populate('usuario', 'nombre img')
                break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Busqueda no valida la tabla debe ser: medicos, usuarios o hospitales'
                })
        }

        return res.status(200).json({
            ok: true,
            resultado: data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    obtenerBusqueda,
    obtenerDocmuentosColeccion
}