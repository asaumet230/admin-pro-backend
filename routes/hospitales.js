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

router.get('/',[ 
    validarJWT 
]
,obtenerHospitales);

router.post('/',[

    validarJWT,  
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validacionCampos
    
],  crearHospital);

router.put('/:id',[ 

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validacionCampos 
    
], actualizarHospital);

router.delete('/:id',[

    validarJWT
    
],  borrarHospital);


module.exports = router;