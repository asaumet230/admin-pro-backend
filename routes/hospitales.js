/*
    '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validacionCampos } = require('../middlewares/validar-campos');
const  { validarJWT } = require('../middlewares/validar-jwt');

const {
    obtenerHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitalesController');

const router = Router();

router.get('/', obtenerHospitales);

router.post('/',[

    validarJWT,  
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validacionCampos
    
],  crearHospital);

router.put('/:id', actualizarHospital);

router.delete('/:id',  borrarHospital);


module.exports = router;