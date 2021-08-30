/*
    Path: 'api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const  { login, googleSignIn } = require('../controllers/authController');
const { validacionCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/',[

    check('email', 'El email es obligatorío').isEmail(),
    check('password', 'El password es incorrecto').not().isEmpty().isLength({min: 6}),
    validacionCampos

], login )



router.post('/google', [
    check('token', 'El token es obligatorío').not().isEmpty(),
    validacionCampos
], googleSignIn)





module.exports = router;