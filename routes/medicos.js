const { Router } = require('express');
const { check } = require('express-validator');

const { validacionCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearMedico,
    obtenerMedicos,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicosController');


const router = Router();



router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser valido').isMongoId,
    validacionCampos
], crearMedico);

router.get('/', obtenerMedicos);

router.put('/:id', actualizarMedico);

router.delete('/:id', borrarMedico);


module.exports = router;