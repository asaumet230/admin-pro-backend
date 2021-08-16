/*
    Path: 'api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const  { login } = require('../controllers/authController');
const { validacionCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/',[

    check('email', 'El email es obligatorío').isEmail(),
    check('password', 'El password es incorrecto').not().isEmpty().isLength({min: 6}),
    validacionCampos

], login )









module.exports = router;